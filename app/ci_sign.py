# 雲端打包用：用 App Store Connect API 金鑰，自動準備「上架用」的簽名憑證和描述檔（不需要登記 iPhone 裝置）
# 用法：python3 ci_sign.py <輸出資料夾>
# 需要環境變數：ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_P8
import os, sys, json, time, base64, secrets, urllib.request, urllib.error
import jwt
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.serialization import pkcs12

BUNDLE = 'tw.starlight.adventure'
PROFILE_NAME = 'Starlight AppStore CI'
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
API = 'https://api.appstoreconnect.apple.com/v1'


def token():
    now = int(time.time())
    return jwt.encode({'iss': os.environ['ASC_ISSUER_ID'], 'iat': now, 'exp': now + 900, 'aud': 'appstoreconnect-v1'},
                      os.environ['ASC_KEY_P8'], algorithm='ES256',
                      headers={'kid': os.environ['ASC_KEY_ID'], 'typ': 'JWT'})


class ApiError(Exception):
    def __init__(self, code, msg):
        super().__init__(msg); self.code = code; self.msg = msg


def call(method, path, body=None, soft=False):
    req = urllib.request.Request(API + path, method=method, data=json.dumps(body).encode() if body else None,
                                 headers={'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r:
            t = r.read()
            return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors='replace')
        if soft:
            raise ApiError(e.code, msg)
        print(f'::error::App Store Connect API {method} {path.split("?")[0]} {e.code}: {msg[:700]}')
        raise SystemExit(1)


def _created_days_ago(c):
    # API 沒有建立日期；上架憑證有效期 1 年，用到期日反推
    import datetime as dt
    exp = c['attributes'].get('expirationDate') or ''
    try:
        e = dt.datetime.fromisoformat(exp.replace('Z', '+00:00'))
    except ValueError:
        return 0
    return 365 - (e - dt.datetime.now(dt.timezone.utc)).days


def create_dist_cert(body):
    """建立上架憑證。不主動刪舊憑證：同一個 Apple 帳號的其他 App（日本自駕道場、星光小冒險、冰箱美術館…）
    可能有 build 還在審查或 TestFlight，刪掉簽它的憑證會讓那個 build 變成「無效簽章」（ITMS-90035，2026-10-22 發生過）。
    只有 Apple 回報憑證數已滿（409）時，才刪「最舊、而且至少 CERT_MIN_AGE_DAYS（預設 14）天前建立」的一張再重試。"""
    min_age = int(os.environ.get('CERT_MIN_AGE_DAYS', '14'))
    try:
        return call('POST', '/certificates', body, soft=True)['data']
    except ApiError as e:
        if e.code != 409:
            print(f'::error::App Store Connect API POST /certificates {e.code}: {e.msg[:700]}')
            raise SystemExit(1)
        certs = call('GET', '/certificates?filter[certificateType]=DISTRIBUTION,IOS_DISTRIBUTION&limit=200')['data']
        certs.sort(key=lambda c: c['attributes'].get('expirationDate') or '')
        old = [c for c in certs if _created_days_ago(c) >= min_age]
        if not old:
            print('::error::上架憑證數量已達 Apple 上限，而且每一張都是 ' + str(min_age) + ' 天內建立的（可能有 App 正在審查或測試中），'
                  '為了不讓那些 build 變成無效簽章，這次先不刪。請過幾天再上傳。 Apple 訊息：' + e.msg[:300])
            raise SystemExit(1)
        print('憑證已滿，刪除最舊的一張（約 ' + str(_created_days_ago(old[0])) + ' 天前建立）：' + old[0]['id'])
        call('DELETE', '/certificates/' + old[0]['id'])
        return call('POST', '/certificates', body)['data']


# 1. App 識別碼
b = call('GET', f'/bundleIds?filter[identifier]={BUNDLE}&limit=20')['data']
b = [x for x in b if x['attributes']['identifier'] == BUNDLE]
if not b:
    print('::error::找不到 App 識別碼 ' + BUNDLE + '（請先在 developer.apple.com 的 Identifiers 建立）')
    raise SystemExit(1)
bid = b[0]['id']

# 2. 清掉以前雲端建立的描述檔
for p in call('GET', '/profiles?limit=200')['data']:
    if p['attributes']['name'] == PROFILE_NAME:
        call('DELETE', '/profiles/' + p['id'])

# 3. 上架用憑證：每次新做一張（私鑰只在這台雲端電腦）；不主動刪舊憑證，見 create_dist_cert()
key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
csr = x509.CertificateSigningRequestBuilder().subject_name(x509.Name([
    x509.NameAttribute(NameOID.COMMON_NAME, 'Starlight CI'), x509.NameAttribute(NameOID.COUNTRY_NAME, 'TW')])).sign(key, hashes.SHA256())
csr_b64 = base64.b64encode(csr.public_bytes(serialization.Encoding.DER)).decode()
cert = create_dist_cert({'data': {'type': 'certificates', 'attributes': {'certificateType': 'DISTRIBUTION', 'csrContent': csr_b64}}})
der = base64.b64decode(cert['attributes']['certificateContent'])
crt = x509.load_der_x509_certificate(der)
pw = secrets.token_hex(12)
enc = (serialization.PrivateFormat.PKCS12.encryption_builder().kdf_rounds(50000)
       .key_cert_algorithm(pkcs12.PBES.PBESv1SHA1And3KeyTripleDESCBC).hmac_hash(hashes.SHA1()).build(pw.encode()))
open(f'{OUT}/dist.p12', 'wb').write(pkcs12.serialize_key_and_certificates(b'Starlight CI', key, crt, None, enc))
open(f'{OUT}/p12pass', 'w').write(pw)

# 4. 上架用描述檔（App Store）
prof = call('POST', '/profiles', {'data': {'type': 'profiles', 'attributes': {'name': PROFILE_NAME, 'profileType': 'IOS_APP_STORE'},
            'relationships': {'bundleId': {'data': {'type': 'bundleIds', 'id': bid}},
                              'certificates': {'data': [{'type': 'certificates', 'id': cert['id']}]}}}})['data']
uuid = prof['attributes']['uuid']
data = base64.b64decode(prof['attributes']['profileContent'])
for d in ['~/Library/MobileDevice/Provisioning Profiles', '~/Library/Developer/Xcode/UserData/Provisioning Profiles']:
    d = os.path.expanduser(d); os.makedirs(d, exist_ok=True)
    open(f'{d}/{uuid}.mobileprovision', 'wb').write(data)
print('signing ready: certificate', cert['id'], 'profile', uuid)

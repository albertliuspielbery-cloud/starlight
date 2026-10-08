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


def call(method, path, body=None):
    req = urllib.request.Request(API + path, method=method, data=json.dumps(body).encode() if body else None,
                                 headers={'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r:
            t = r.read()
            return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors='replace')
        print(f'::error::App Store Connect API {method} {path.split("?")[0]} {e.code}: {msg[:700]}')
        raise SystemExit(1)


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

# 3. 上架用憑證：每次新做一張（私鑰只在這台雲端電腦），舊的只留最新一張，避免超過 Apple 的數量上限
certs = [c for c in call('GET', '/certificates?filter[certificateType]=DISTRIBUTION,IOS_DISTRIBUTION&limit=200')['data']]
certs.sort(key=lambda c: c['attributes'].get('expirationDate') or '')
for c in certs[:-1] if len(certs) >= 2 else []:
    call('DELETE', '/certificates/' + c['id'])
key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
csr = x509.CertificateSigningRequestBuilder().subject_name(x509.Name([
    x509.NameAttribute(NameOID.COMMON_NAME, 'Starlight CI'), x509.NameAttribute(NameOID.COUNTRY_NAME, 'TW')])).sign(key, hashes.SHA256())
csr_b64 = base64.b64encode(csr.public_bytes(serialization.Encoding.DER)).decode()
cert = call('POST', '/certificates', {'data': {'type': 'certificates', 'attributes': {'certificateType': 'DISTRIBUTION', 'csrContent': csr_b64}}})['data']
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

# 雲端用：把宣傳影片（App 預覽）傳到指定版本的繁體中文頁面（6.9 吋 iPhone）
# 同一格原本的影片會先刪掉再傳新的
# 用法：python3 ci_appreview.py <版本 例如 1.2> <影片.mp4> [封面時間碼 例如 00:00:01:12]
# 需要環境變數：ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_P8
import os, sys, json, time, hashlib, urllib.request, urllib.error
import jwt

BUNDLE = 'tw.starlight.adventure'
VER, VIDEO = sys.argv[1], sys.argv[2]
TC = sys.argv[3] if len(sys.argv) > 3 else '00:00:01:12'
OUT = os.environ.get('GITHUB_STEP_SUMMARY')
API = 'https://api.appstoreconnect.apple.com'
OUT = os.environ.get('GITHUB_STEP_SUMMARY')


def say(t):
    print(t)
    if OUT:
        open(OUT, 'a', encoding='utf-8').write(t + '\n')


def token():
    now = int(time.time())
    return jwt.encode({'iss': os.environ['ASC_ISSUER_ID'], 'iat': now, 'exp': now + 900, 'aud': 'appstoreconnect-v1'},
                      os.environ['ASC_KEY_P8'], algorithm='ES256', headers={'kid': os.environ['ASC_KEY_ID'], 'typ': 'JWT'})


def call(method, path, body=None):
    url = path if path.startswith('http') else API + path
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json'})
    for k in range(6):
        try:
            with urllib.request.urlopen(req) as r:
                t = r.read()
                return json.loads(t) if t else {}
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='replace'); code = e.code
            if e.code >= 500 and k < 5:  # Apple 偶爾忙線，等一下再試
                print(f'  Apple 回 {e.code}，{5 + k * 5} 秒後重試'); time.sleep(5 + k * 5)
                req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body is not None else None,
                                             headers={'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json'})
                continue
            break
    if True:
        print(f'::error::App Store Connect API {method} {url.split("?")[0].replace(API, "")} {code}: {msg[:1500]}')
        raise SystemExit(1)


def all_pages(path):
    out, url = [], path
    while url:
        r = call('GET', url)
        out += r.get('data', [])
        url = (r.get('links') or {}).get('next')
    return out



app = [a for a in call('GET', f'/v1/apps?filter[bundleId]={BUNDLE}')['data'] if a['attributes']['bundleId'] == BUNDLE][0]
vers = all_pages(f'/v1/apps/{app["id"]}/appStoreVersions?filter[versionString]={VER}&filter[platform]=IOS&limit=10')
if not vers:
    print(f'::error::App Store Connect 上還沒有 {VER} 版（要先跑「App Store 上架資料」建立版本）'); raise SystemExit(1)
v = vers[0]
print('版本', VER, v['attributes'].get('appStoreState') or v['attributes'].get('appVersionState'))
locs = all_pages(f'/v1/appStoreVersions/{v["id"]}/appStoreVersionLocalizations?limit=50')
loc = next((l for l in locs if l['attributes']['locale'] == 'zh-Hant'), None)
if not loc:
    print('::error::找不到繁體中文頁面'); raise SystemExit(1)
sets = all_pages(f'/v1/appStoreVersionLocalizations/{loc["id"]}/appPreviewSets?limit=50')
ps = next((x for x in sets if x['attributes']['previewType'] == 'IPHONE_67'), None)
if not ps:
    ps = call('POST', '/v1/appPreviewSets', {'data': {'type': 'appPreviewSets', 'attributes': {'previewType': 'IPHONE_67'},
              'relationships': {'appStoreVersionLocalization': {'data': {'type': 'appStoreVersionLocalizations', 'id': loc['id']}}}}})['data']
for old in all_pages(f'/v1/appPreviewSets/{ps["id"]}/appPreviews?limit=10'):
    print('刪掉舊的影片', old['id']); call('DELETE', f'/v1/appPreviews/{old["id"]}')
b = open(VIDEO, 'rb').read()
r = call('POST', '/v1/appPreviews', {'data': {'type': 'appPreviews',
         'attributes': {'fileName': os.path.basename(VIDEO), 'fileSize': len(b), 'mimeType': 'video/mp4', 'previewFrameTimeCode': TC},
         'relationships': {'appPreviewSet': {'data': {'type': 'appPreviewSets', 'id': ps['id']}}}}})['data']
for op in r['attributes']['uploadOperations']:
    part = b[op['offset']:op['offset'] + op['length']]
    req = urllib.request.Request(op['url'], method=op['method'], data=part, headers={h['name']: h['value'] for h in op['requestHeaders']})
    urllib.request.urlopen(req).read()
call('PATCH', f'/v1/appPreviews/{r["id"]}', {'data': {'type': 'appPreviews', 'id': r['id'],
     'attributes': {'uploaded': True, 'sourceFileChecksum': hashlib.md5(b).hexdigest(), 'previewFrameTimeCode': TC}}})
for k in range(40):
    st = call('GET', f'/v1/appPreviews/{r["id"]}')['data']['attributes'].get('assetDeliveryState') or {}
    print('處理中', st.get('state'))
    if st.get('state') in ('COMPLETE', 'FAILED'):
        break
    time.sleep(15)
if st.get('state') == 'FAILED':
    print('::error::Apple 處理影片失敗：' + json.dumps(st.get('errors'), ensure_ascii=False)[:800]); raise SystemExit(1)
say(f'## 宣傳影片已上傳到 {VER} 版（6.9 吋 iPhone，繁體中文），狀態 {st.get("state")}')

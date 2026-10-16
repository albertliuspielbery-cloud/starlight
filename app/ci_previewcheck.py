# 雲端用：只讀取、不修改——查看指定版本的宣傳影片（App 預覽）狀態
# 用法：python3 ci_previewcheck.py <版本>
# 需要環境變數：ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_P8
import os, sys, json, time, hashlib, urllib.request, urllib.error
import jwt

BUNDLE = 'tw.starlight.adventure'
VER = sys.argv[1]
OUT = os.environ.get('GITHUB_STEP_SUMMARY')
API = 'https://api.appstoreconnect.apple.com'
OUT = os.environ.get('GITHUB_STEP_SUMMARY')


def say(t):
    print('::notice::' + t)
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
v = all_pages(f'/v1/apps/{app["id"]}/appStoreVersions?filter[versionString]={VER}&filter[platform]=IOS&limit=10')[0]
say(f'## {VER} 版：{v["attributes"].get("appStoreState")}')
for loc in all_pages(f'/v1/appStoreVersions/{v["id"]}/appStoreVersionLocalizations?limit=50'):
    for ps in all_pages(f'/v1/appStoreVersionLocalizations/{loc["id"]}/appPreviewSets?limit=50'):
        for pv in all_pages(f'/v1/appPreviewSets/{ps["id"]}/appPreviews?limit=10'):
            a = pv['attributes']; st = a.get('assetDeliveryState') or {}
            say(f'- {loc["attributes"]["locale"]} {ps["attributes"]["previewType"]}：{a.get("fileName")} {round((a.get("fileSize") or 0)/1048576,1)}MB 狀態 {st.get("state")} 封面 {a.get("previewFrameTimeCode")} {json.dumps(st.get("errors") or [], ensure_ascii=False)[:300]}')

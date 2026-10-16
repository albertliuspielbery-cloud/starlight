# 雲端用：在 App Store Connect 建好 App 內購買項目（非消耗型、一次買斷）
# 已經建過的不會重複建；會補上沒填的部分（名稱說明、價格、地區、家人共享、審查截圖）
# 用法：python3 ci_iap.py <審查截圖.png>
# 需要環境變數：ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_P8
import os, sys, json, time, hashlib, urllib.request, urllib.error
import jwt

BUNDLE = 'tw.starlight.adventure'
P = BUNDLE + '.'
SHOT = sys.argv[1] if len(sys.argv) > 1 else ''
# 商品：(代號, 參考名稱, 顯示名稱, 說明, 台幣價格)
ITEMS = [
    ('stage2', 'Chapters 6-10', '第六～十章', '解鎖第六章到第十章的冒險，一次購買永久使用', 120),
    ('stage3', 'Chapters 11-15', '第十一～十五章', '解鎖第十一章到第十五章的冒險，一次購買永久使用', 120),
    ('stage4', 'Chapters 16-20', '第十六～二十章', '解鎖第十六章到第二十章的冒險，一次購買永久使用', 120),
    ('full', 'Chapters 6-20 Bundle', '第六～二十章合購', '一次解鎖第六章到第二十章（三段合購）', 290),
]
NOTE = ('Non-consumable unlock for story chapters. The purchase screen is only reachable from Parent Settings, '
        'which is behind a parental gate (multiplication question). Children tapping a locked chapter only hear '
        '"Ask mom or dad to open new adventures" and no store is shown.')
API = 'https://api.appstoreconnect.apple.com'


def token():
    now = int(time.time())
    return jwt.encode({'iss': os.environ['ASC_ISSUER_ID'], 'iat': now, 'exp': now + 900, 'aud': 'appstoreconnect-v1'},
                      os.environ['ASC_KEY_P8'], algorithm='ES256', headers={'kid': os.environ['ASC_KEY_ID'], 'typ': 'JWT'})


def call(method, path, body=None, ok404=False):
    url = path if path.startswith('http') else API + path
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r:
            t = r.read()
            return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors='replace')
        if ok404 and e.code == 404:
            return None
        print(f'::error::App Store Connect API {method} {url.split("?")[0].replace(API, "")} {e.code}: {msg[:900]}')
        raise SystemExit(1)


def all_pages(path):
    out, url = [], path
    while url:
        r = call('GET', url)
        out += r.get('data', [])
        url = (r.get('links') or {}).get('next')
    return out


app = [a for a in call('GET', f'/v1/apps?filter[bundleId]={BUNDLE}')['data'] if a['attributes']['bundleId'] == BUNDLE]
if not app:
    print('::error::找不到 App ' + BUNDLE); raise SystemExit(1)
app_id = app[0]['id']
have = {x['attributes']['productId']: x for x in all_pages(f'/v1/apps/{app_id}/inAppPurchasesV2?limit=200')}
# 不上架的地區：中國大陸、歐盟 27 國（歐盟收費要公開地址，先不上）
EU = ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU',
      'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE']
SKIP = set(['CHN'] + EU)
terr = [t['id'] for t in all_pages('/v1/territories?limit=200') if t['id'] not in SKIP]

# App 本身也從歐盟、中國大陸拿掉（失敗的話只提醒，請到 App Store Connect 手動取消勾選）
eu_note = ''
try:
    av = call('GET', f'/v1/apps/{app_id}/appAvailabilityV2', ok404=True)
    if av and av.get('data'):
        tas = all_pages(f'/v2/appAvailabilities/{av["data"]["id"]}/territoryAvailabilities?include=territory&limit=200')
        off = 0
        for ta in tas:
            tid = ((ta.get('relationships') or {}).get('territory') or {}).get('data', {}).get('id')
            if tid in SKIP and (ta.get('attributes') or {}).get('available'):
                call('PATCH', f'/v1/territoryAvailabilities/{ta["id"]}', {'data': {'type': 'territoryAvailabilities', 'id': ta['id'], 'attributes': {'available': False}}})
                off += 1
        eu_note = f'App 已從歐盟、中國大陸拿掉 {off} 個地區（原本就沒上的不算）'
except (SystemExit, Exception):
    eu_note = '歐盟、中國大陸可能沒有全部拿掉，請到 App Store Connect →「價格與供應狀況」確認都沒有勾選'

report = []

for code, ref, name, desc, price in ITEMS:
    pid = P + code
    # 1. 商品本身
    if pid in have:
        iap = have[pid]
    else:
        iap = call('POST', '/v2/inAppPurchases', {'data': {'type': 'inAppPurchases', 'attributes': {
            'name': ref, 'productId': pid, 'inAppPurchaseType': 'NON_CONSUMABLE', 'reviewNote': NOTE, 'familySharable': True},
            'relationships': {'app': {'data': {'type': 'apps', 'id': app_id}}}}})['data']
    iid = iap['id']
    a = iap['attributes']
    # 已經送審／審查中／上架的商品不能再改，只回報狀態（重跑不會失敗）
    st0 = a.get('state')
    if st0 in ('WAITING_FOR_REVIEW', 'IN_REVIEW', 'APPROVED', 'PENDING_BINARY_APPROVAL', 'READY_FOR_SALE'):
        report.append(f'{name}：狀態 {st0}（不用再改）')
        print(pid, 'skip', st0)
        continue
    if not a.get('familySharable') or not a.get('reviewNote'):
        call('PATCH', f'/v2/inAppPurchases/{iid}', {'data': {'type': 'inAppPurchases', 'id': iid,
             'attributes': {'familySharable': True, 'reviewNote': NOTE}}})
    # 2. 中文名稱、說明
    locs = call('GET', f'/v2/inAppPurchases/{iid}/inAppPurchaseLocalizations')['data']
    zh = [l for l in locs if l['attributes']['locale'] == 'zh-Hant']
    if zh and (zh[0]['attributes'].get('name'), zh[0]['attributes'].get('description')) == (name, desc):
        pass
    elif zh:
        call('PATCH', f'/v1/inAppPurchaseLocalizations/{zh[0]["id"]}', {'data': {'type': 'inAppPurchaseLocalizations',
             'id': zh[0]['id'], 'attributes': {'name': name, 'description': desc}}})
    else:
        call('POST', '/v1/inAppPurchaseLocalizations', {'data': {'type': 'inAppPurchaseLocalizations',
             'attributes': {'locale': 'zh-Hant', 'name': name, 'description': desc},
             'relationships': {'inAppPurchaseV2': {'data': {'type': 'inAppPurchases', 'id': iid}}}}})
    # 3. 價格（台灣為基準，其他國家 Apple 自動換算）
    pts = all_pages(f'/v2/inAppPurchases/{iid}/pricePoints?filter[territory]=TWN&limit=200')
    pts.sort(key=lambda x: abs(float(x['attributes']['customerPrice']) - price))
    pp = pts[0]
    got = float(pp['attributes']['customerPrice'])
    if got != price:
        print(f'::error::找不到 NT${price} 的價格（最接近 NT${got:g}）'); raise SystemExit(1)
    sched = call('GET', f'/v2/inAppPurchases/{iid}/iapPriceSchedule', ok404=True)
    has_price = False
    if sched and sched.get('data'):
        mp = call('GET', f'/v1/inAppPurchasePriceSchedules/{sched["data"]["id"]}/manualPrices?include=inAppPurchasePricePoint&limit=50', ok404=True)
        has_price = bool(mp and mp.get('data'))
    if not has_price:
      call('POST', '/v1/inAppPurchasePriceSchedules', {'data': {'type': 'inAppPurchasePriceSchedules', 'relationships': {
        'inAppPurchase': {'data': {'type': 'inAppPurchases', 'id': iid}},
        'baseTerritory': {'data': {'type': 'territories', 'id': 'TWN'}},
        'manualPrices': {'data': [{'type': 'inAppPurchasePrices', 'id': '${p1}'}]}}},
        'included': [{'type': 'inAppPurchasePrices', 'id': '${p1}', 'attributes': {'startDate': None},
                      'relationships': {'inAppPurchaseV2': {'data': {'type': 'inAppPurchases', 'id': iid}},
                                        'inAppPurchasePricePoint': {'data': {'type': 'inAppPurchasePricePoints', 'id': pp['id']}}}}]})
    # 4. 地區：跟 App 一樣（中國大陸、歐盟以外）
    # 每次都重新設定（POST 會取代原本的地區設定，確保歐盟、中國大陸不在裡面）
    if True:
        call('POST', '/v1/inAppPurchaseAvailabilities', {'data': {'type': 'inAppPurchaseAvailabilities',
             'attributes': {'availableInNewTerritories': True}, 'relationships': {
                 'inAppPurchase': {'data': {'type': 'inAppPurchases', 'id': iid}},
                 'availableTerritories': {'data': [{'type': 'territories', 'id': t} for t in terr]}}}})
    # 5. 給審查人員看的截圖（購買畫面）
    shot = call('GET', f'/v2/inAppPurchases/{iid}/appStoreReviewScreenshot', ok404=True)
    sd = shot and shot.get('data')
    if sd and ((sd.get('attributes') or {}).get('assetDeliveryState') or {}).get('state') not in ('COMPLETE', 'UPLOAD_COMPLETE'):
        call('DELETE', f'/v1/inAppPurchaseAppStoreReviewScreenshots/{sd["id"]}'); sd = None
    if SHOT and not sd:
        b = open(SHOT, 'rb').read()
        r = call('POST', '/v1/inAppPurchaseAppStoreReviewScreenshots', {'data': {'type': 'inAppPurchaseAppStoreReviewScreenshots',
                 'attributes': {'fileName': 'store.png', 'fileSize': len(b)},
                 'relationships': {'inAppPurchaseV2': {'data': {'type': 'inAppPurchases', 'id': iid}}}}})['data']
        for op in r['attributes']['uploadOperations']:
            part = b[op['offset']:op['offset'] + op['length']]
            req = urllib.request.Request(op['url'], method=op['method'], data=part,
                                         headers={h['name']: h['value'] for h in op['requestHeaders']})
            urllib.request.urlopen(req).read()
        call('PATCH', f'/v1/inAppPurchaseAppStoreReviewScreenshots/{r["id"]}', {'data': {
            'type': 'inAppPurchaseAppStoreReviewScreenshots', 'id': r['id'],
            'attributes': {'uploaded': True, 'sourceFileChecksum': hashlib.md5(b).hexdigest()}}})
    st = call('GET', f'/v2/inAppPurchases/{iid}')['data']['attributes'].get('state')
    report.append(f'{name}：NT${got:g}，狀態 {st}')
    print(pid, 'ok', got, st)

if eu_note:
    report.append(eu_note)
print('::notice title=App 內購買項目::' + '%0A'.join(report))

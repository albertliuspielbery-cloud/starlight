# 雲端用：幫「第六～二十章合購」建立免費優惠代碼（給親友兌換）
# 已經建過的優惠、代碼不會重複建
# 用法：python3 ci_offer.py <代碼> <可兌換次數>
# 需要環境變數：ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_P8
import os, sys, json, time, urllib.request, urllib.error
import jwt

BUNDLE = 'tw.starlight.adventure'
PRODUCT = BUNDLE + '.full'
OFFER = 'Friends free bundle'
CODE = (sys.argv[1] if len(sys.argv) > 1 else 'STARLIGHT2026').strip().upper()
COUNT = int(sys.argv[2]) if len(sys.argv) > 2 else 20
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
    try:
        with urllib.request.urlopen(req) as r:
            t = r.read()
            return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors='replace')
        print(f'::error::App Store Connect API {method} {url.split("?")[0].replace(API, "")} {e.code}: {msg[:1500]}')
        raise SystemExit(1)


def all_pages(path):
    out, url = [], path
    while url:
        r = call('GET', url)
        out += r.get('data', [])
        url = (r.get('links') or {}).get('next')
    return out


app = [a for a in call('GET', f'/v1/apps?filter[bundleId]={BUNDLE}')['data'] if a['attributes']['bundleId'] == BUNDLE][0]
iap = [x for x in all_pages(f'/v1/apps/{app["id"]}/inAppPurchasesV2?limit=200') if x['attributes']['productId'] == PRODUCT]
if not iap:
    print('::error::找不到 ' + PRODUCT); raise SystemExit(1)
iap = iap[0]
print('商品', iap['attributes'].get('name'), iap['attributes'].get('state'))

offers = all_pages(f'/v2/inAppPurchases/{iap["id"]}/offerCodes?limit=200')
offer = next((o for o in offers if o['attributes']['name'] == OFFER), None)
if offer:
    print('優惠已經有了', offer['id'])
else:
    av = call('GET', f'/v2/inAppPurchases/{iap["id"]}/inAppPurchaseAvailability')
    terr = [t['id'] for t in all_pages(f'/v1/inAppPurchaseAvailabilities/{av["data"]["id"]}/availableTerritories?limit=200')]
    print('上架地區', len(terr))
    inc, refs, miss = [], [], []
    for i, t in enumerate(terr):
        pts = all_pages(f'/v2/inAppPurchases/{iap["id"]}/pricePoints?filter[territory]={t}&limit=200')
        free = [p for p in pts if float(p['attributes'].get('customerPrice') or 0) == 0]
        if i == 0:
            print('第一個地區的最低價：', sorted(float(p['attributes'].get('customerPrice') or 0) for p in pts)[:3])
        if not free:
            miss.append(t); continue
        rid = '${p%d}' % i
        refs.append({'type': 'inAppPurchaseOfferPrices', 'id': rid})
        inc.append({'type': 'inAppPurchaseOfferPrices', 'id': rid, 'relationships': {
            'territory': {'data': {'type': 'territories', 'id': t}},
            'pricePoint': {'data': {'type': 'inAppPurchasePricePoints', 'id': free[0]['id']}}}})
    if miss:
        print('::warning::這些地區找不到免費價格，先略過：' + ','.join(miss))
    if not refs:
        print('::error::找不到免費價格點'); raise SystemExit(1)
    r = call('POST', '/v1/inAppPurchaseOfferCodes', {'data': {'type': 'inAppPurchaseOfferCodes',
        'attributes': {'name': OFFER, 'customerEligibilities': ['NON_SPENDER', 'ACTIVE_SPENDER', 'CHURNED_SPENDER']},
        'relationships': {'inAppPurchase': {'data': {'type': 'inAppPurchases', 'id': iap['id']}}, 'prices': {'data': refs}}},
        'included': inc})
    offer = r['data']
    print('建好優惠', offer['id'], '地區', len(refs))

codes = all_pages(f'/v1/inAppPurchaseOfferCodes/{offer["id"]}/customCodes?limit=200')
if any(c['attributes'].get('customCode', '').upper() == CODE for c in codes):
    print('代碼已經有了')
else:
    call('POST', '/v1/inAppPurchaseOfferCodeCustomCodes', {'data': {'type': 'inAppPurchaseOfferCodeCustomCodes',
        'attributes': {'customCode': CODE, 'numberOfCodes': COUNT},
        'relationships': {'offerCode': {'data': {'type': 'inAppPurchaseOfferCodes', 'id': offer['id']}}}}})
say(f'## 兌換碼：{CODE}')
say(f'- 可以兌換 {COUNT} 次，不會過期；建好後最多要等 1 小時才能用')
say(f'- 兌換網址：https://apps.apple.com/redeem?ctx=offercodes&id={app["id"]}&code={CODE}')
say('- 兌換完回遊戲按「恢復購買」，第 6～20 章就會打開')

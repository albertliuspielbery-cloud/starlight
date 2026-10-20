# 雲端用：幫購買項目建立免費（或折扣）優惠代碼（給親友兌換）
# 預設是「第六～二十章合購」(full)；第三季用 stage5（第二十一～二十五章）
# 已經建過的優惠、代碼不會重複建
# 用法：python3 ci_offer.py <代碼> <可兌換次數> [價格] [商品 full／stage5]
# 需要環境變數：ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_P8
import os, sys, json, time, urllib.request, urllib.error
import jwt

BUNDLE = 'tw.starlight.adventure'
ITEM = (sys.argv[4] if len(sys.argv) > 4 and sys.argv[4].strip() else 'full').strip()
NAMES = {'full': ('第六～二十章合購', '第 6～20 章', 290), 'stage2': ('第六～十章', '第 6～10 章', 120),
         'stage3': ('第十一～十五章', '第 11～15 章', 120), 'stage4': ('第十六～二十章', '第 16～20 章', 120),
         'stage5': ('第二十一～二十五章', '第 21～25 章', 120)}
if ITEM not in NAMES:
    print('::error::不認得的商品 ' + ITEM + '（可以用 ' + '、'.join(NAMES) + '）'); raise SystemExit(1)
PRODUCT = BUNDLE + '.' + ITEM
INAME, ICH, IPRICE = NAMES[ITEM]
CODE = (sys.argv[1] if len(sys.argv) > 1 else 'STARLIGHT2026').strip().upper()
COUNT = int(sys.argv[2]) if len(sys.argv) > 2 else 500
OK_N = [500, 1000, 1500, 2000, 2500, 5000, 7500, 10000, 15000, 20000, 25000]  # Apple 只接受這些次數
COUNT = next((n for n in OK_N if n >= COUNT), OK_N[-1])
PRICE = float(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3].strip() else 0
# 合購沿用原本的優惠名稱（已經建過的 RAIN90、STAR160 等不受影響）
OFFER = ('Friends free bundle' if PRICE == 0 else 'Discount NT%g' % PRICE) if ITEM == 'full' else \
        (('Friends free ' if PRICE == 0 else 'Discount NT%g ' % PRICE) + ITEM)
API = 'https://api.appstoreconnect.apple.com'
OUT = os.environ.get('GITHUB_STEP_SUMMARY')
import traceback
def _hook(t, v, tb):
    msg = ''.join(traceback.format_exception(t, v, tb))[-900:]
    print('::error title=兌換碼流程出錯::' + msg.replace('\n', '%0A'))
sys.excepthook = _hook


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
        print(f'::error::App Store Connect API {method} {url.split("?")[0].replace(API, "")} {code}: ' + msg[:1500].replace('\n', ' ').replace('\r', ''))
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
    # 先找台灣的免費價格點，再用「同等價格」一次拿到其他地區的（比一個一個地區查快很多）
    tw = all_pages(f'/v2/inAppPurchases/{iap["id"]}/pricePoints?filter[territory]=TWN&limit=200')
    tw.sort(key=lambda p: abs(float(p['attributes'].get('customerPrice') or 0) - PRICE))
    free_tw = tw[:1]
    if not free_tw:
        print('::error::台灣沒有價格點'); raise SystemExit(1)
    GOT = float(free_tw[0]['attributes'].get('customerPrice') or 0)
    print('台灣價格：NT$%g（想要 NT$%g）' % (GOT, PRICE))
    if abs(GOT - PRICE) > 15:
        print('::error::找不到接近 NT$%g 的價格，最接近 NT$%g' % (PRICE, GOT)); raise SystemExit(1)
    pp = {'TWN': free_tw[0]['id']}
    for q in all_pages(f'/v1/inAppPurchasePricePoints/{free_tw[0]["id"]}/equalizations?include=territory&limit=200'):
        t = ((q.get('relationships') or {}).get('territory') or {}).get('data', {}).get('id')
        if t:
            pp[t] = q['id']
    for i, t in enumerate(terr):
        if t not in pp:
            miss.append(t); continue
        rid = '${p%d}' % i
        refs.append({'type': 'inAppPurchaseOfferPrices', 'id': rid})
        inc.append({'type': 'inAppPurchaseOfferPrices', 'id': rid, 'relationships': {
            'territory': {'data': {'type': 'territories', 'id': t}},
            'pricePoint': {'data': {'type': 'inAppPurchasePricePoints', 'id': pp[t]}}}})
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
    print('現有代碼：', [(c['attributes'].get('customCode'), c['attributes'].get('numberOfCodes'), c['attributes'].get('active')) for c in codes])
else:
    call('POST', '/v1/inAppPurchaseOfferCodeCustomCodes', {'data': {'type': 'inAppPurchaseOfferCodeCustomCodes',
        'attributes': {'customCode': CODE, 'numberOfCodes': COUNT},
        'relationships': {'offerCode': {'data': {'type': 'inAppPurchaseOfferCodes', 'id': offer['id']}}}}})
say(f'## 兌換碼：{CODE}（{INAME}）')
say('- 價格：免費' if PRICE == 0 else '- 價格：NT$%g（原價 NT$%g）' % (PRICE, IPRICE))
say(f'- 可以兌換 {COUNT} 次，不會過期；建好後最多要等 1 小時才能用')
say(f'- 兌換網址：https://apps.apple.com/redeem?ctx=offercodes&id={app["id"]}&code={CODE}')
say(f'- 兌換完回遊戲按「恢復購買」，{ICH}就會打開' if PRICE == 0 else f'- 兌換時用折扣價付款，付完{ICH}就會打開')
if ITEM == 'full':
    say('- 注意：合購只包含第 6～20 章；第 21～25 章要另外用 stage5 的兌換碼')

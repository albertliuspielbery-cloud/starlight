# 地球儀模組組裝：src.js ＋ art.js ＋ geo.json → mods/m8_globe.js；LINES → lines/globe.tsv（只列還沒錄音的句子）
# 2026-11-22 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）
# 用法：python3 /home/claude/w/s7/qa/globe/assemble.py
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent
S7 = H.parent.parent
src = (H / 'src.js').read_text(encoding='utf-8')
art = (H / 'art.js').read_text(encoding='utf-8')
geo = json.loads((H / 'geo.json').read_text(encoding='utf-8'))
geo.pop('stat', None)
# 介紹國家的輪廓：每一條邊事先分類，存在 ctry[k]['e']（每個環一串，每個字元一條邊）
#   0＝海岸（實線）
#   1＝跟別的陸地相接的國界（白色虛線，平常就看得到；2026-11-25 Albert 12:20）
#   2＝幾乎看不見（有爭議的國界：印度–中國、印度–巴基斯坦、中國–巴基斯坦、摩洛哥–西撒哈拉）
#   3＝兩個介紹國家共用的國界，由另一國畫（避免兩條虛線疊在一起）；點到這一國時照樣會亮起來
#   判斷：邊的中點往兩邊各 0.2 度、0.45 度，落在哪一國（Natural Earth 1:110m，nb110.json 由 mkgeo.js 產生）。
import math
AL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
def dec(st, q):
    out = []
    for part in (st or '').split(' '):
        v = []; n = 0; sh = 0
        for ch in part:
            c = AL.index(ch); n += (c & 31) * (2 ** sh); sh += 5
            if not (c & 32):
                v.append(-(n + 1) / 2 if n % 2 else n / 2); n = 0; sh = 0
        x = y = 0; pts = []
        for i in range(len(v) // 2):
            x += v[2 * i]; y += v[2 * i + 1]; pts.append((x / q, y / q))
        out.append(pts)
    return out
NB = json.loads((H / 'nb110.json').read_text(encoding='utf-8'))
NAME = NB['names']; CODE = {v: k for k, v in NAME.items()}
POLYS = []
for n, r in NB['polys']:
    xs = [p[0] for p in r]; ys = [p[1] for p in r]
    POLYS.append((n, r, min(xs), max(xs), min(ys), max(ys)))
def inring(r, x, y):
    c = False; n = len(r); j = n - 1
    for i in range(n):
        xi, yi = r[i]; xj, yj = r[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            c = not c
        j = i
    return c
def country(x, y):
    x = ((x + 540) % 360) - 180
    for n, r, a, b, c, d in POLYS:
        if a <= x <= b and c <= y <= d and inring(r, x, y):
            return n
    return None
FAINT = {('in', 'China'), ('in', 'Pakistan'), ('cn', 'India'), ('cn', 'Pakistan'), ('ma', 'W. Sahara')}  # 中國–巴基斯坦也在喀什米爾（11-25 加）
R50 = {'tw', 'sg', 'nl', 'ch'}
LANDLOCKED = ('ch', 'mn')   # 內陸國：沒有海岸（1:50m 的瑞士跟 1:110m 的鄰國對不太齊，找不到鄰國的邊也算國界）
ISLAND = ('tw', 'sg', 'jp', 'ph', 'is', 'nz', 'au')   # 島國：全部算海岸（窄海峽兩邊都是陸地，會被誤判）
def owner(a, b):  # 兩個介紹國家共用的國界由誰畫：1:50m 的那國優先，不然代號字母小的
    if (a in R50) != (b in R50): return a if a in R50 else b
    return min(a, b)
estat = {}
for k, g in geo['ctry'].items():
    kk = 'ar2' if k == 'ar' else k
    me = NAME.get(k)
    parts = dec(g['r'], g['q']); es = []; st = [0, 0, 0, 0]
    for r in parts:
        m = len(r); e = []
        for i in range(m):
            (x1, y1), (x2, y2) = r[i], r[(i + 1) % m]
            if k in ISLAND or m < 3:
                e.append('0'); continue
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2; cl = max(.2, math.cos(math.radians(my)))
            dx, dy = (x2 - x1) * cl, (y2 - y1); L = math.hypot(dx, dy) or 1
            nx, ny = -dy / L / cl, dx / L   # 法線（經度方向要除 cos 緯度）
            nb = None
            for sgn in (1, -1):
                c1 = country(mx + sgn * nx * .2, my + sgn * ny * .2); c2 = country(mx + sgn * nx * .45, my + sgn * ny * .45)
                if c1 and c1 != me and (c2 == c1 or c2 is None or c2 != me):
                    nb = c1; break
            if not nb:
                e.append('1' if k in LANDLOCKED else '0')
            elif (k, nb) in FAINT:
                e.append('2')
            elif nb in CODE and CODE[nb] != k:
                e.append('1' if owner(k, CODE[nb]) == k else '3')
            else:
                e.append('1')
        es.append(''.join(e))
        for ch in e: st[int(ch)] += 1
    g['e'] = ' '.join(es)
    estat[k] = tuple(st)
g = json.dumps(geo, ensure_ascii=False, separators=(',', ':'))
assert src.count('/*ART*/') == 1 and src.count('/*GEO*/null/*GEOEND*/') == 1
out = src.replace('/*ART*/', art).replace('/*GEO*/null/*GEOEND*/', '/*GEO*/' + g + '/*GEOEND*/')
(S7 / 'mods' / 'm8_globe.js').write_text(out, encoding='utf-8')
# 台詞
m = re.search(r'/\*LINES\*/\s*const T=(\{.*?\});\s*/\*END\*/', src, re.S)
T = json.loads(m.group(1))
vi = json.load(open('/home/claude/w/s7/out/web/voice/'+json.load(open('/home/claude/w/s7/cfg.json'))['voice_index'], encoding='utf-8'))['clips']
def rec(t):
    t = t.strip()
    return ('z|' + t) in vi or ('z|' + re.sub(r'[，、,]+$', '', t)) in vi
rows, reuse, done = [], [], set()
# lines/fixG.tsv（2026-11-25 新加 6 國的句子，交給錄音的人）已經列過的，這裡不重複列
_fx = S7 / 'lines' / 'fixG.tsv'
if _fx.exists():
    for _l in _fx.read_text(encoding='utf-8').splitlines():
        _p = _l.split('\t')
        if len(_p) == 3: done.add(_p[2])
for k, t in T.items():
    if t in done:
        continue
    done.add(t)
    if rec(t):
        reuse.append(t); continue
    # 破音字、「角」照規則（這批沒有）
    rows.append(f'GL8_{k}\tzh-TW-HsiaoChenNeural\t{t}')
(S7 / 'lines').mkdir(exist_ok=True)
(S7 / 'lines' / 'globe.tsv').write_text('\n'.join(rows) + '\n', encoding='utf-8')
print('module', len(out.encode('utf-8')), 'bytes; geo', len(g.encode('utf-8')), 'bytes')
print('outline edges [coast, dashed, faint, drawn-by-neighbor]:', estat)
print('lines new', len(rows), 'reused', len(reuse), reuse)

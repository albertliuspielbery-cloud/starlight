# -*- coding: utf-8 -*-
# 第八季台詞：從 s8_data.py 自動抽出所有要念的句子 → 去重 → 跟語音索引（主工作區 cfg.json 的 voice_index）比對 → 只列還沒錄過的
# 2026-11-28　星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）　照 lines_s7.py 的方法
# 輸出：
#   lines/s8_content.tsv        id<TAB>文字（只有新錄的；文字＝錄音文字，「角」寫「腳」；id：S8_ 遊戲台詞、S8B_ 故事屋、S8_P 王子版換字後不一樣的句子）
#   lines/s8_ssml.json          {id: 把破音字換成 <sub alias="同音字">字</sub> 的整句}（只列有破音字的）
#   lines/s8_content_keys.tsv   id<TAB>語音 key（z|、pz|、dz|、e1|）<TAB>聲音<TAB>來源 —— 給打包語音索引用
#   qa/v23/s8data/lines_all.tsv 全部要念的句子（含已經錄過的）
# 規則同第七季：旁白 z|（HsiaoChen）整句一個 key，故事頁每一句也錄；選項照 orList 切段；王子的信 pz|（YunJhe）；王子版火花 dz|（HsiaoYu）。
import json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import s8_data as d

ROOT = os.path.dirname(H)
VI = '/home/claude/w/s7/voice/' + json.load(open('/home/claude/w/s7/cfg.json', encoding='utf-8'))['voice_index']
BASE = os.path.join(ROOT, 'base/index.html')
OUT = os.path.join(ROOT, 'lines/s8_content.tsv')
KEYS = os.path.join(ROOT, 'lines/s8_content_keys.tsv')
SSML = os.path.join(ROOT, 'lines/s8_ssml.json')
ALL = os.path.join(ROOT, 'qa/v23/s8data/lines_all.tsv')
NARR, PRINCE, DRAGON, EN = 'zh-TW-HsiaoChenNeural', 'zh-TW-YunJheNeural', 'zh-TW-HsiaoYuNeural', 'en-US-JennyNeural'
VOICE = {'zd': DRAGON, 'z': NARR, 'p': NARR, 'pz': PRINCE, 'dz': DRAGON, 'e1': EN}

idx = json.load(open(VI, encoding='utf-8'))['clips']
SENT = re.compile(r'[^。！？!?]+[。！？!?」』）)～…]*')
sents = lambda t: [x.strip() for x in SENT.findall(str(t)) if x.strip()]
voCk = lambda t: re.sub(r'[，、,]+$', '', t.strip())

# ---- heroT（王子版文字）：從 base 抓 BOYMAP、BOYRULES ----
src = open(BASE, encoding='utf-8').read()
i0 = src.index('const BOYMAP=['); i1 = src.index('].sort((a,b)=>b[0].length-a[0].length);', i0)
NPCP = '公\u2060主'
pairs = []
for m in re.finditer(r"\[(['`])((?:(?!\1).)*)\1,(['`])((?:(?!\3).)*)\3\]", src[i0:i1]):
    a, b = m.group(2).replace('${NPCP}', NPCP), m.group(4).replace('${NPCP}', NPCP)
    pairs.append((a, b))
pairs.sort(key=lambda x: -len(x[0]))
j0 = src.index('const BOYRULES=['); j1 = src.index('];', j0)
rules = [(m.group(1), m.group(2)) for m in re.finditer(r"\[/([^/]+)/g,'([^']*)'\]", src[j0:j1])]
HTRE = re.compile(r'公主|王子|裙|漂亮|她|城堡舞會|封信|舞會|美的衣服|蝴蝶結|芭蕾|STARLIGHT PRINCESS')
def heroT(t):
    if not HTRE.search(t): return t
    for a, b in pairs:
        if a in t: t = t.replace(a, b)
    for r, b in rules: t = re.sub(r, b, t)
    return t

# ---- 錄音文字：角→腳、破音字 ----
# 破音字：(正規式, 要標的字在比對結果裡的位置(起,長度), alias)。同一個字只標一次，先比對到的優先。
ALIAS = [
 (r'還書|準時還|還回|還給|要還|先還|去還|不還', '還', '環'),
 (r'往上長|長出來|長大|長得|長到', '長', '漲'),
 (r'館長', '館長', '館掌'),
 (r'長長', '長長', '常常'),
 (r'背好|背上新|背包', '背', '杯'),
 (r'調到|調好', '調', '條'),
 (r'盛好', '盛', '成'),
 (r'泳將', '將', '匠'),
 (r'點點縫|一點縫', '縫', '鳳'),
 (r'調色盤', '調', '條'),
 (r'午覺', '覺', '叫'),
 (r'空隙', '空', '控'),
 (r'數(?![字表])', '數', '署'),          # 動詞「數」ㄕㄨˇ；「數字」「百數表」不標
 (r'量', '量', '良'),                     # 量身高、量體重、量一量 ㄌㄧㄤˊ
 (r'音樂', '樂', '月'),
 (r'倒過來', '倒', '到'),
 (r'門縫|小縫', '縫', '鳳'),
]
def rec_text(t):
    t = t.replace('主角', '主腳').replace('角色', '腳色')
    mark = {}   # 起點 → (長度, alias)
    used = set()
    for pat, ch, al in ALIAS:
        for m in re.finditer(pat, t):
            k = m.group(0).find(ch)
            if k < 0: continue
            a = m.start() + k; L = len(ch)
            if any(x in used for x in range(a, a + L)): continue
            mark[a] = (L, al); used.update(range(a, a + L))
    out = []; i = 0
    while i < len(t):
        if i in mark:
            L, al = mark[i]; out.append(f'<sub alias="{al}">{t[i:i+L]}</sub>'); i += L
        else: out.append(t[i]); i += 1
    return ''.join(out)

rows = []  # (key, 畫面文字, 來源)
def add(prefix, text, srcname):
    text = str(text).replace('<br>', '').strip()
    if not text: return
    rows.append((prefix, text, srcname))
def add_sents(prefix, text, srcname):
    for s in sents(str(text).replace('<br>', '')): add(prefix, s, srcname)
def add_z(text, srcname, sent=False):
    add('z', text, srcname)
    if sent and len(sents(text)) > 1: add_sents('z', text, srcname + '/句')
    b = heroT(text)
    if b != text:
        add('z', b, srcname + '/王子版')
        if sent and len(sents(b)) > 1: add_sents('z', b, srcname + '/王子版句')

def orList(l):
    return f'是{l[0]}，還是{l[1]}？' if len(l) == 2 else f'是{l[0]}、{l[1]}，還是{l[2]}？'
def chunks(s):
    return [voCk(x) for x in re.sub(r'([，、])', '\\1\x01', s).split('\x01') if x.strip()]
def add_opts(labels, srcname, ans=None):
    from itertools import permutations
    seen = set()
    sets = []
    a = ans if ans is not None else labels[0]
    others = [x for x in labels if x != a]
    for w in others: sets.append([a, w])        # 簡單：2 個選項
    sets.append([a] + others)                  # 普通、困難：3 個選項
    for st in sets:
        for p in permutations(st):
            for c in chunks(orList(list(p))):
                if c not in seen: seen.add(c); add('z', c, srcname + '/選項')


NAMES8 = '火花|斑斑|黑熊警察|浪浪|小橘'
def talk(t, src_):
    seg = [x for x in re.split(f'(?=(?:{NAMES8})說：)', t) if x]
    for s in seg:
        if s.startswith('火花說：'): add_sents('dz', s[4:], src_ + '/火花')
        else:
            add('zd', s, src_ + '/接話'); [add('zd', x, src_ + '/接話句') for x in sents(s)] if len(sents(s)) > 1 else None

BOOK = set()   # 故事屋的 key（id 用 S8B_）
def addb(text, srcn):
    n0 = len(rows); add_z(text, srcn)
    for r in rows[n0:]: BOOK.add(r[1])

# ---- 1. 各章 ----
for c in d.CH:
    D = d.S8D[c]
    for k in ['firstSay', 'endText', 'theater', 'gift']:
        if D.get(k): add_z(D[k], f'{c}.{k}')
    for i, t in enumerate(D['story']): add_z(t, f'{c}.story{i}', sent=True)
    add_z(D['story_p'], f'{c}.story_p', sent=True)
    talk(D['story_b'], f'{c}.story_b')
    add_sents('pz', D['letter_p'], f'{c}.letter_p')
    add_sents('dz', D['letter_b'], f'{c}.letter_b')
    for i, L in enumerate(D['levels']): add_z(L[5], f'{c}.L{i+1}')
for c in d.CH:
    for ver in ['p', 'b']:
        P = d.S8SEG[c][ver]
        if P['hook'] and not P['hook'].startswith('火花說'): add('z', P['hook'], f'{c}.hook')
        for sg in P['segs']:
            for pg in sg['pages']:
                if not pg.startswith('火花說'): add_z(pg, f'{c}.seg')
# 得到禮物（m8sc：名稱用「、」和「和」連起來）
def joinN(ns): return ns[0] if len(ns) == 1 else '、'.join(ns[:-1]) + '和' + ns[-1]
GN = {46: [['小斑點狗', '小消防員外套', '小消防員帽子'], ['小斑點狗', '小消防員外套']], 47: [['小手電筒和哨子']], 49: [['反光背心', '腳踏車安全帽'], ['反光背心']], 50: [['我家的逃生路線圖']]}
for c, L in GN.items():
    for ns in L: add_z(f'得到{joinN(ns)}了！', f'{c}.得到')
add_z('好棒！', '章末'); add_z('還有十顆寶石！', '章末')

# ---- 2. 題庫 ----
for i, (tag, q, a, w, why) in enumerate(d.S8Q):
    add_z(q, f'Q{i}.題目'); add_z(why, f'Q{i}.說明')
    add_opts([a[1], w[0][1], w[1][1]], f'Q{i}', ans=a[1])

# ---- 3. 寫字（m99x 的固定句；注音用同音字、小寫念「小寫的E」） ----
ZY = {'ㄚ': '阿', 'ㄛ': '喔', 'ㄜ': '鵝', 'ㄝ': '欸'}
WROWS = []
for ch in list('ㄚㄛㄜㄝ') + list('efghijk'):
    for t in [f'還記得怎麼寫{ch}嗎？', f'你會寫{ch}了！']:
        al = ZY.get(ch) or ('小寫的' + ch.upper())
        WROWS.append(('z', t, 'write8', t.replace(ch, f'<sub alias="{al}">{ch}</sub>')))

# ---- 4. 季完結、獎狀、徽章 ----
F = d.S8FIN
for k in ['h', 'p', 'c1', 'c2', 'c3', 'next', 'arc', 'badge_no']: add_z(F[k], 'FIN.' + k)
for k, t in F['f']: add_z(t, 'FIN.f')
for t in F['badge']: add_z(t, 'FIN.badge')
add_sents('pz', F['pr'], 'FIN.pr'); add_sents('dz', F['dr'], 'FIN.dr')
add_z('下一站：第八季「星光安全小隊」！', '第四十五章接第八季')
add_z('謝謝你當了這麼棒的城市小旅行家！下一站：第八季「星光安全小隊」！', '第四十五章大結局最後一句')
add_z('這是第八季的冒險內容，請爸爸媽媽到家長專區看看喔！', 'App 還沒買')

# ---- 5. 故事屋新書 ----
for b in d.S8BOOKS:
    addb(b['t'], f"book.{b['id']}.書名")
    for i, p in enumerate(b["p"]): addb(p[2], f"book.{b['id']}.p{i+1}")
    for j, (q, opts) in enumerate(b['q']):
        addb(q, f"book.{b['id']}.q{j+1}")
        n0 = len(rows); add_opts([heroT(x) for x in opts], f"book.{b['id']}.q{j+1}", ans=heroT(opts[0]))
        for r in rows[n0:]: BOOK.add(r[1])

# ---- 6. 名稱：朋友、圖鑑（中英）、自由練習、房間 ----
for n in d.S8FRIENDS: add_z(n, '朋友名字')
for k, zh, en in d.S8DEX: add_z(zh, '圖鑑'); add('e1', en + '.', '圖鑑英文')
for p in d.S8PT: add_z(p[1], '自由練習')
for t in ['來換換看安全角落吧！', '換上小手電筒和哨子了！', '換上我家的逃生路線圖了！', '換上手電筒和逃生路線圖了！', '換上空空的角落了！']: add_z(t, '房間')
for n in ['安全角落', '空空的角落', '手電筒和逃生路線圖', '小手電筒和哨子', '我家的逃生路線圖', '小斑點狗', '小消防員外套', '小消防員帽子', '反光背心', '腳踏車安全帽', '安全小隊徽章', '星光安全小隊員']: add_z(n, '名稱')

# ---- 去重、比對語音索引 ----
for pre, t, srcn, ss in WROWS: rows.append((pre, t, srcn))
WSS = {t: ss for pre, t, srcn, ss in WROWS}
seen = {}; allrows = []
for pre, text, srcn in rows:
    key = f"{'z' if pre == 'zd' else pre}|{text}"
    if key in seen: continue
    seen[key] = srcn
    have = key in idx or (pre in ('z', 'zd') and f'z|{voCk(text)}' in idx)
    allrows.append((pre, text, srcn, have))
new = [r for r in allrows if not r[3]]
os.makedirs(os.path.dirname(OUT), exist_ok=True); os.makedirs(os.path.dirname(ALL), exist_ok=True)
OLDID = {}
if os.path.exists(KEYS):
    for ln in open(KEYS, encoding='utf-8'):
        p_ = ln.rstrip('\n').split('\t')
        if len(p_) >= 2: OLDID.setdefault(p_[1], p_[0])
def nextid(pfx):
    ns = [int(re.sub(r'\D', '', x[len(pfx):]) or 0) for x in OLDID.values() if x.startswith(pfx) and re.fullmatch(r'\d+', x[len(pfx):])]
    return max(ns + [0]) + 1
SS = {}
with open(OUT, 'w', encoding='utf-8', newline='\n') as f, open(KEYS, 'w', encoding='utf-8', newline='\n') as g:
    for pre, text, srcn, _ in new:
        k_ = f"{'z' if pre == 'zd' else pre}|{text}"
        if k_ in OLDID: i = OLDID[k_]
        else:
            pfx = 'S8B_' if text in BOOK else ('S8_P' if '王子版' in srcn else 'S8_')
            i = f'{pfx}{nextid(pfx):04d}'; OLDID[k_] = i
        if pre == 'e1': body = text
        else:
            body = WSS.get(text) or rec_text(text)
        plain = re.sub(r'<sub alias="[^"]*">([^<]*)</sub>', r'\1', body).replace('主角', '主腳').replace('角色', '腳色')
        if body != plain: SS[i] = body
        f.write(f'{i}\t{plain}\n')
        g.write(f"{i}\t{k_}\t{VOICE[pre]}\t{srcn}\n")
json.dump(SS, open(SSML, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
# 王子版：畫面文字經過 heroT 換字後不一樣的句子，另外列一份（id 跟 s8_content.tsv 同一個）
with open(os.path.join(ROOT, 'lines/s8_prince.tsv'), 'w', encoding='utf-8', newline='\n') as f:
    for ln in open(KEYS, encoding='utf-8'):
        p_ = ln.rstrip('\n').split('\t')
        if '王子版' in p_[3]: f.write(p_[0] + '\t' + p_[1].split('|', 1)[1] + '\n')
with open(ALL, 'w', encoding='utf-8', newline='\n') as f:
    f.write('key\t已錄\t來源\n')
    for pre, text, srcn, have in allrows: f.write(f"{'z' if pre == 'zd' else pre}|{text}" + f'\t{"有" if have else "新"}\t{srcn}\n')
from collections import Counter
cnt = Counter(VOICE[r[0]] for r in new)
print('要念的句子（去重）', len(allrows), '已經錄過', len(allrows) - len(new), '新錄', len(new))
print(dict(cnt), '故事屋', sum(1 for r in new if r[1] in BOOK), '王子版', sum(1 for r in new if '王子版' in r[2]), '破音字', len(SS))
print(OUT); print(SSML); print(KEYS)

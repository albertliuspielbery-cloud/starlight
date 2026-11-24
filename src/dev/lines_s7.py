# -*- coding: utf-8 -*-
# 第七季台詞：從 S7D 等資料自動抽出所有要念的句子 → 去重 → 跟語音索引比對 → 只列還沒錄過的
# 2026-11-22　星光工作室 Starlight Studio
# 輸出：
#   /home/claude/w/s7/lines/s7_content.tsv        id<TAB>聲音<TAB>文字（格式照 lines_72.tsv；只有新錄的）
#   /home/claude/w/s7/lines/s7_content_keys.tsv   id<TAB>語音 key（z|、pz|、dz|、p|、e1|）<TAB>畫面文字<TAB>來源 —— 給打包語音索引用
#   /home/claude/w/s7/qa/content7/lines_all.tsv   全部要念的句子（含已經錄過的），給對照
# 規則（照遊戲現有做法，見 base 的 voResolve、say、voSpeak，和 season6 的 talk6）：
#   旁白 z|（HsiaoChen）：整句一個 key；故事頁另外每一句都錄（拆段故事 story19 要一句一句找錄音）。
#   題目：題目整句；選項照 orList「是A、B，還是C？」用 ，、 切開以後的每一段（是A／A／還是A？…）；說明整句。
#   王子寫給公主的信、季完結的王子那句：pz|（YunJhe），一句一個。
#   王子版（ISBOY）火花說的話：dz|（HsiaoYu），一句一個；「火花說：」後面接別人說的那一段是旁白 z|。
#   王子版畫面文字會先經過 heroT（公主→王子…）；轉換後不一樣的句子另外錄一句。
#   錄音文字：「角色」「主角」寫成「腳色」「主腳」；破音字用 <sub alias="…">字</sub>；畫面文字不變。
import json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import s7_data as d

VI = '/home/claude/w/repo/voice/index-b4e8814c.json'
BASE = '/home/claude/w/s7/base/index.html'
OUT = '/home/claude/w/s7/lines/s7_content.tsv'
KEYS = '/home/claude/w/s7/lines/s7_content_keys.tsv'
ALL = '/home/claude/w/s7/qa/content7/lines_all.tsv'
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
 (r'背好|背上新', '背', '杯'),
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

def talk(t):
    """王子版故事頁：「火花說：…」用火花的聲音，後面別人說的話是旁白。"""
    names = '火花|嚕嚕|書書|翻翻|波波|兔兔|咔咔|阿森|環環|羽羽|變變'
    seg = [x for x in re.split(f'(?=(?:{names})說：)', t) if x]
    for s in seg:
        if s.startswith('火花說：'): add_sents('dz', s[4:], 'story_b/火花')
        else:   # 照第六季實際錄法：火花說完後別人接話的那一段也用火花的聲音（key 仍是 z|）
            add('zd', s, 'story_b/接話'); [add('zd', x, 'story_b/接話句') for x in sents(s)] if len(sents(s)) > 1 else None

# ---- 1. 各章 ----
for c in d.CH:
    D = d.S7D[c]
    for k in ['firstSay', 'endText', 'theater', 'gift']:
        if D.get(k): add_z(D[k], f'{c}.{k}')
    for i, t in enumerate(D['story']): add_z(t, f'{c}.story{i}', sent=True)
    add_z(D['story_p'], f'{c}.story_p', sent=True)
    talk(D['story_b'])
    add_sents('pz', D['letter_p'], f'{c}.letter_p')
    add_sents('dz', D['letter_b'], f'{c}.letter_b')
    for i, L in enumerate(D['levels']): add_z(L[5], f'{c}.L{i+1}')
# 拆段故事：鉤子、每一段（S7SEG 算好的；一般都已經在上面每一句裡）
for c in d.CH:
    for ver in ['p', 'b']:
        P = d.S7SEG[c][ver]
        if P['hook'] and not P['hook'].startswith('火花說'): add('z', P['hook'], f'{c}.hook')
# 得到禮物（照第六季：每一樣一句，加上合起來一句）
gift_names = {41: ['小導遊背包'], 42: ['小書架'], 43: ['小畫家罩衫', '貝雷帽'], 44: ['小貓熊'], 45: ['我的畫']}
for c, ns in gift_names.items():
    for n in ns: add_z(f'得到{n}了！', f'{c}.得到')
    if len(ns) > 1: add_z(f"得到{'和'.join(ns)}了！", f'{c}.得到')

# ---- 2. 題庫 ----
for i, (tag, q, a, w, why) in enumerate(d.S7Q):
    add_z(q, f'Q{i}.題目'); add_z(why, f'Q{i}.說明')
    add_opts([a[1], w[0][1], w[1][1]], f'Q{i}', ans=a[1])

# ---- 3. 聽音找注音的詞卡、第 44 章看整個詞 ----
for z, ws in d.S7HEAR.items():
    for e, w in ws: add_z(f'{w}，{w}，開頭是哪一個注音呢？', f'hear.{z}')
for e, w, zy in d.S7SEE: add_z(w, 'see44')

# ---- 4. 新題型（S7NQ、S7GRID）----
N = d.S7NQ
for st in N['five']['sets']: add_z(st['line'], 'five')
add_z(N['five']['hint1'], 'five'); add_z(N['five']['hint2'], 'five')
for k in ['queue', 'shelf']:
    O = N['ord'][k]
    for t in O['lines'] + O['right']: add_z(t, 'ord.' + k)
    add_z(O['hint1'], 'ord.' + k)
add_z(N['ord']['shelf']['ask'], 'ord.shelf')
H_ = N['hun']; add_z(H_['find'][0], 'hun'); add('p', '在哪裡？', 'hun/數字後面'); add('p', '的下一個是幾？', 'hun/數字後面')
for k in ['gap', 'book', 'hint1', 'hint1b', 'right']: add_z(H_[k], 'hun')
C_ = N['call']; add('p', '現在叫到', 'call/數字前面'); add('p', '號', 'call/數字後面'); add('p', '你是', 'call/數字前面'); add('p', '號。', 'call/數字後面')
add_z(C_['parts'][2], 'call'); add_z(C_['hint1'], 'call'); add_z(C_['hint1b'], 'call')   # 「{k}個人！」用 n| ＋ 現有 p|個人！
B_ = N['blk']
for k, nm in B_['who']: add_z(B_['measure'].format(who=nm), 'blk')
for k in ['taller', 'shorter', 'diff', 'hint1', 'hint1b', 'right_tall', 'right_short']: add_z(B_[k], 'blk')
CNUM = ['零', '一', '兩', '三', '四', '五', '六', '七', '八', '九', '十']
for n in range(1, 9): add_z(B_['right_n'].format(n=CNUM[n]), 'blk')
for k in range(1, 5): add_z(B_['right_diff'].format(k=CNUM[k]), 'blk')
CK = N['clock']; add_z(CK['read'], 'clock'); add_z(CK['hint1'], 'clock'); add('p', '哪一個時鐘是', 'clock/數字前面')   # 後面接 n| ＋ 現有 p|點？／p|點半？
F_ = N['floor']; add_z(F_['intro'], 'floor'); add_z(F_['ask'][0], 'floor'); add_z(F_['ask'][2], 'floor'); add_z(F_['hint1'], 'floor'); add_z(F_['sort'], 'floor')
for v in F_['right'].values(): add_z(v, 'floor')
add_opts(F_['opts'], 'floor', ans=F_['opts'][0]); add_opts(F_['opts'], 'floor', ans=F_['opts'][1]); add_opts(F_['opts'], 'floor', ans=F_['opts'][2])
K_ = N['case']; add_z(K_['pair'], 'case'); add_z(K_['find'][0], 'case'); add_z(K_['find'][2], 'case'); add_z(K_['bd'][0], 'case'); add_z(K_['bd'][2], 'case')
for v in K_['bdHint'].values(): add_z(v, 'case')
add_z(K_['right'], 'case'); add_z(K_['right2'], 'case')
add_z('唸唸看，大寫和小寫的名字是一樣的喔！', 'case'); add_z('超過了！拿回來一個。', 'blk')
for L in 'abcd': add('e1', L, 'case/字母')   # 小寫字母名（e1|a 這類，應該都已經有）
for k, M in d.S7GRID.items():
    for lv in ['easy', 'mid', 'hard', 'lead']:
        for t in M['tasks'][lv]: add_z(t['line'], f'grid.{k}.{lv}')
    for v in M['places'].values(): add_z(f'走到{v[2]}那裡了！', f'grid.{k}')
for a in ['上面', '下面', '左邊', '右邊']: pass
add_opts(['上面', '下面', '左邊', '右邊'][:3], 'grid.dir', ans='上面'); add_opts(['右邊', '左邊', '下面'], 'grid.dir', ans='右邊')
add_z('你走了幾格呢？', 'grid'); add_z('一格一格走，邊走邊數！', 'grid')
for n in range(1, 6): add_z(f'走{CNUM[n]}格！', 'grid')
for v in N['grid']['dirOK'].values(): add_z(v, 'grid')

# ---- 5. 季完結、獎狀、徽章 ----
F = d.S7FIN
for k in ['h', 'p', 'c1', 'c2', 'c3', 'next', 'arc', 'badge_no']: add_z(F[k], 'FIN.' + k)
for k, t in F['f']: add_z(t, 'FIN.f')
for t in F['badge']: add_z(t, 'FIN.badge')
add_sents('pz', F['pr'], 'FIN.pr'); add_sents('dz', F['dr'], 'FIN.dr')
add_z('下一站：第七季「星光城市小旅行」！', '第四十章接第七季')
add_z('這是第七季的冒險內容，請爸爸媽媽到家長專區看看喔！', 'App 還沒買')

# ---- 6. 故事屋新書 ----
for b in d.S7BOOKS:
    add_z(b['t'], f"book.{b['id']}.書名")
    for i, p in enumerate(b["p"]): add_z(p[2], f"book.{b['id']}.p{i+1}")
    for j, (q, opts) in enumerate(b['q']):
        add_z(q, f"book.{b['id']}.q{j+1}")
        add_z(heroT(q), f"book.{b['id']}.q{j+1}")
        add_opts([heroT(x) for x in opts], f"book.{b['id']}.q{j+1}", ans=heroT(opts[0]))

# ---- 7. 名稱：朋友、圖鑑（中英）、自由練習 ----
for n in d.S7FRIENDS: add_z(n, '朋友名字')
for k, zh, en in d.S7DEX: add_z(zh, '圖鑑'); add('e1', en + '.', '圖鑑英文')
for p in d.S7PT: add_z(p[1], '自由練習')

# ---- 去重、比對語音索引 ----
seen = {}; allrows = []
for pre, text, srcn in rows:
    key = f"{'z' if pre == 'zd' else pre}|{text}"
    if key in seen: continue
    seen[key] = srcn
    have = key in idx or (pre in ('z', 'zd') and f'z|{voCk(text)}' in idx)
    allrows.append((pre, text, srcn, have))
new = [r for r in allrows if not r[3]]
os.makedirs(os.path.dirname(OUT), exist_ok=True); os.makedirs(os.path.dirname(ALL), exist_ok=True)
import shutil
if os.path.exists(KEYS): shutil.copy(KEYS, KEYS + '.prev')
with open(OUT, 'w', encoding='utf-8', newline='\n') as f, open(KEYS, 'w', encoding='utf-8', newline='\n') as g:
    OLDID = {}
    for fn in [KEYS + '.prev', KEYS]:
        if os.path.exists(fn):
            for ln in open(fn, encoding='utf-8'):
                p_ = ln.rstrip('\n').split('\t')
                if len(p_) >= 2: OLDID.setdefault(p_[1], p_[0])
    nxt = max([int(x[3:]) for x in OLDID.values() if x.startswith('S7_')] + [0]) + 1
    for pre, text, srcn, _ in new:
        k_ = f"{'z' if pre == 'zd' else pre}|{text}"
        if k_ in OLDID: i = OLDID[k_]
        else: i = f'S7_{nxt:04d}'; OLDID[k_] = i; nxt += 1
        body = text if pre == 'e1' else rec_text(text)
        f.write(f'{i}\t{VOICE[pre]}\t{body}\n')
        g.write(f"{i}\t{'z' if pre == 'zd' else pre}|{text}\t{srcn}\n")
with open(ALL, 'w', encoding='utf-8', newline='\n') as f:
    f.write('key\t已錄\t來源\n')
    for pre, text, srcn, have in allrows: f.write(f"{'z' if pre == 'zd' else pre}|{text}" + f'\t{"有" if have else "新"}\t{srcn}\n')
from collections import Counter
cnt = Counter(VOICE[r[0]] for r in new)
print('要念的句子（去重）', len(allrows), '已經錄過', len(allrows) - len(new), '新錄', len(new))
print(dict(cnt))
print('破音字處理', sum(1 for r in new if r[0] != 'e1' and rec_text(r[1]) != r[1]))
print(OUT); print(KEYS); print(ALL)

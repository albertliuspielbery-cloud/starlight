# -*- coding: utf-8 -*-
# 第八季內容自我檢查（2026-11-28 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）
# 拼讀（46～48 只用一聲、沒有不存在的拼法）、題庫不重複舊題（base＋第七季＋C2 的 okno8）、每關有動手題、相鄰關不同動手題、
# id 不重複、沒有禁用字、選項／說明格式、寫字三階段、學過才複習、故事屋頁數。
# 用法：python3 dev/check_s8.py（結果也寫到 qa/v23/s8data/check_s8.txt）
import json, os, re, sys, difflib, glob
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import s8_data as d
ROOT = os.path.dirname(H)
BASE = os.path.join(ROOT, 'base/index.html')
OUTD = os.path.join(ROOT, 'qa/v23/s8data'); os.makedirs(OUTD, exist_ok=True)

out = []; bad = 0
def warn(*a):
    global bad; bad += 1; out.append('⚠ ' + ' '.join(str(x) for x in a))
def note(*a): out.append('・' + ' '.join(str(x) for x in a))
core = lambda t: re.sub(r'[，。！？、「」：；～…\s]', '', t)

# ---------- 1. 舊題庫：base 裡所有問句＋第七季 S7Q ----------
s = open(BASE, encoding='utf-8').read()
strs = set()
for t in re.findall(r'"((?:[^"\\\n]|\\.){3,200})"|\'((?:[^\'\\\n]|\\.){3,200})\'|`([^`\n]{3,200})`', s):
    x = next(a for a in t if a)
    if re.search(r'[一-鿿]', x): strs.add(x)
oldQ = [x for x in strs if x.endswith('？')]
try:
    import s7_data as d7
    oldQ += [q[1] for q in d7.S7Q]
except Exception as e:
    note('第七季題庫讀不到', e)
note('舊題', len(oldQ), '題')
for i, (tag, q, a, w, why) in enumerate(d.S8Q):
    cq = core(q)
    for o in oldQ:
        r = difflib.SequenceMatcher(None, cq, core(o)).ratio()
        if cq == core(o): warn('同題', i, q, '｜舊：', o)
        elif r >= 0.72: warn(f'太像舊題（{r:.2f}）', i, q, '｜舊：', o)
        elif r >= 0.62: note(f'有點像（{r:.2f}）', i, q, '｜舊：', o)
    labs = [a[1]] + [x[1] for x in w]
    if len(set(labs)) != 3: warn('選項重複', i, labs)
    if len(set([a[0]] + [x[0] for x in w])) != 3: note('圖示重複', i)
    if len(w) != 2: warn('錯的選項不是 2 個', i)
    if len(d.sents(why)) != 1: warn('說明不只一句', i, why)
    if not why.endswith(('。', '！')): warn('說明結尾', i, why)
    if not q.endswith('？'): warn('題目結尾', i, q)
    for l in labs:
        if re.search(r'[。！？]', l): warn('選項有句號', i, l)
qs = [q[1] for q in d.S8Q]
for q in set(qs):
    if qs.count(q) > 1: warn('第八季內重複', q)

# ---------- 1b. C2 的 okno8 情境（同一個情境不要兩邊都出） ----------
C2 = [p for p in ['/home/claude/w/s7_s8safe/mods/m8sf_safe8.js', os.path.join(ROOT, 'mods/m8sf_safe8.js')] if os.path.exists(p)]
if C2:
    t = open(C2[0], encoding='utf-8').read()
    i = t.find('const OKNO8={'); j = t.find('};', i)
    ok8 = re.findall(r"\['([^']+)',[01],'([^']*)'", t[i:j]) if i >= 0 else []
    note('C2 okno8 情境', len(ok8), '則（', C2[0], '）')
    for k, (tag, q, a, w, why) in enumerate(d.S8Q):
        mine = core(q + a[1])
        for sit, ex in ok8:
            r = difflib.SequenceMatcher(None, mine, core(sit)).ratio()
            if r >= 0.6: warn(f'跟 C2 okno8 很像（{r:.2f}）', k, q, '｜C2：', sit)
            elif r >= 0.5: note(f'跟 C2 okno8 有點像（{r:.2f}）', k, q, '｜C2：', sit)
else:
    note('沒有 C2 的 m8sf_safe8.js，okno8 沒比對')

# ---------- 2. 禁用詞 ----------
BAN = ['星光少女', '星光樂團', '星光樂園', '毒品', '毒', '主角', '角色', 'Albert', '價格', '購買', '買', '死', '血', '受傷', '流血', '綁架', '壞人',
       '7-11', '7-ELEVEN', '全家便利', '統一', '消防署', '警政署', '分鐘後', '倒數']
def texts():
    for c in d.CH:
        D = d.S8D[c]
        for k in ['name', 'firstSay', 'endText', 'story_p', 'story_b', 'letter_p', 'letter_b', 'theater', 'gift']:
            if D.get(k): yield f'{c}.{k}', D[k]
        for i, t in enumerate(D['story']): yield f'{c}.story{i}', t
        for i, L in enumerate(D['levels']): yield f'{c}.L{i+1}', L[0] + '｜' + L[2] + '｜' + L[5]
    for i, q in enumerate(d.S8Q): yield f'Q{i}', '｜'.join([q[1], q[2][1], q[3][0][1], q[3][1][1], q[4]])
    for k, v in d.S8FIN.items():
        yield 'FIN.' + k, v if isinstance(v, str) else json.dumps(v, ensure_ascii=False)
    for b in d.S8BOOKS:
        yield b['id'] + '.t', b['t']
        for i, p in enumerate(b['p']): yield f"{b['id']}.{i}", p[2]
        for q in b['q']: yield b['id'] + '.q', q[0] + '｜' + '｜'.join(q[1])
    for p in d.S8PT: yield 'PT.' + p[0], p[1]
    yield 'SEG8', json.dumps(d.SEG8, ensure_ascii=False)
for k, t in texts():
    for b in BAN:
        if b in t:
            if k in ('SEG8',) and b in ('消防署', '警政署'): continue
            warn('禁用詞', b, k, t[:60])
    if re.search(r'\d+點\d+分|幾點幾分', t): warn('出現幾點幾分', k, t)
    if re.search(r'\d', t) and not k.startswith(('SEG8',)) and not re.search(r'\.L\d+$', k): note('文字裡有阿拉伯數字（要念的請寫國字）', k, t[:50])
# 家長說明可以提消防署（來源），兒童畫面不行
for k in ['note']:
    pass

# ---------- 3. 關卡：題型、題數、動手題、相鄰不同、寫字、學過才複習 ----------
HANDS = set(d.HANDS); FB = d.FALLBACK
KN = re.compile(r'^(quiz:[^:]+|write:[^:]+:[123]|R:[^:]+:3|pin8:(auto|[ㄅ-ㄩˊˇˋ˙|]+)|tone8:[^:]+|floor8:(ord|\d+-\d+)|route8:r[1-6]|money8:\d+(\|[\d,]+)?|change8:\d+-\d+|'
                r'locker8:\d+|deep8:(knee|belly|neck|order|safe|auto)|chart8:[abc]|wheel8:\d+|clock8:\d+:(00|30)(\+30)?|low8:[a-z|]+|case8:[A-Z|]+|'
                r'danger8:(fire46|police47|pool48|park49|home50[abcd])|phone8:(119|110)|okno8:(4[6-9]|50)|quest8:(4[6-9]|50))$')
REW = ['pick', 'box', 'chest', 'petgift', 'pick', 'rain', 'box', 'chest', 'petgift', 'chapter']
SAFE = ('quiz:', 'okno8:', 'danger8:', 'phone8:')
learned = set('ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcd')
cnt = {}
for c in d.CH:
    D = d.S8D[c]; now = learned | set(D['learn'])
    if [L[4] for L in D['levels']] != REW: warn('獎勵順序跟第七季不同', c)
    prevH = set()
    for i, L in enumerate(D['levels']):
        qs = L[3]
        for k in qs:
            if not KN.match(k): warn('題型寫法', c, i + 1, k)
            t = k.split(':')[0]; cnt[t] = cnt.get(t, 0) + 1
        h = set(k.split(':')[0] for k in qs if k.split(':')[0] in HANDS)
        if i < 9:
            if len(qs) != 3: warn('題數', c, i + 1, len(qs))
            if not h: warn('沒有動手題', c, i + 1, qs)
            if not any(k.startswith(SAFE) for k in qs): warn('沒有安全題', c, i + 1)
            if sum(k.startswith(SAFE) for k in qs) > 1: note('安全題不只一題', c, i + 1)
        else:
            if qs[-1] != f'quest8:{c}': warn('第 10 關最後要是 quest8', c, qs)
        if h & prevH: warn('相鄰兩關同一種動手題', c, i, i + 1, h & prevH)
        prevH = h
        # 學過才複習／拼讀
        for k in qs:
            p = k.split(':')
            if p[0] == 'R':
                for ch in p[1].split('|'):
                    if ch and ch not in now: warn('還沒學就複習', c, i + 1, k, ch)
            if p[0] == 'pin8' and p[1] != 'auto':
                for sy in p[1].split('|'):
                    if c <= 48 and re.search('[ˊˇˋ˙]', sy): warn('第 46～48 章拼讀要一聲', c, i + 1, sy)
                    ini, fin = sy[0], sy[1:].strip('ˊˇˋ˙')
                    if ini in 'ㄐㄑㄒ' and fin[:1] not in ('ㄧ', 'ㄩ'): warn('不存在的拼法', sy)
                    if ini in 'ㄓㄔㄕㄖㄗㄘㄙㄍㄎㄏ' and fin[:1] in ('ㄧ', 'ㄩ'): warn('不存在的拼法', sy)
                    if ini in 'ㄅㄆㄇㄈㄉㄊㄋㄌ' and fin[:1] == 'ㄩ' and ini not in 'ㄋㄌ': warn('不存在的拼法', sy)
                    if ini not in now or any(x not in now for x in fin): warn('拼讀用到還沒學的符號', c, sy)
            if p[0] == 'tone8' and c < 49: warn('四聲第 49 章才開始', c, i + 1)
            if p[0] in ('low8', 'case8'):
                for ch in p[1].split('|'):
                    if ch.lower() not in now: warn('還沒學的小寫', c, i + 1, k, ch)
            if p[0] == 'change8':
                a, b = map(int, p[1].split('-'))
                if a - b > 10 or a - b < 0 or a > 100: warn('找錢超過 10 元內', k)
            if p[0] == 'money8' and int(p[1].split('|')[0]) > 100: warn('錢超過 100 元', k)
            if p[0] == 'locker8' and not 1 <= int(p[1]) <= 100: warn('置物櫃超過 100', k)
            if p[0] == 'clock8' and p[2][:2] not in ('00', '30'): warn('時鐘只整點半點', k)
    # 寫字：這章新學的字 1、2、3 階段都有
    for ch in D['learn']:
        st = sorted(int(k.split(':')[2]) for L in D['levels'] for k in L[3] if k.startswith('write:' + ch + ':'))
        if st != [1, 2, 3]: warn('寫字階段', c, ch, st)
    learned = now
    # 題庫的每一題都排進某一關
    if len(d.Q[c]) < 13: warn('題庫太少', c, len(d.Q[c]))
note('題型次數', json.dumps(cnt, ensure_ascii=False))
rot = {c: [next((k.split(':')[0] for k in L[3] if k.startswith(SAFE)), '-') for L in d.S8D[c]['levels'][:9]] for c in d.CH}
note('安全題輪流', json.dumps(rot, ensure_ascii=False))
for c, r in rot.items():
    if r.count('quiz') > 6: warn('三選一太多', c, r)

# ---------- 4. id 不重複：獎品、場景、TSV ----------
ids = []
for c in d.CH:
    P = d.S8D[c]['prize']
    for k in ('pet', 'dress', 'boy'):
        if P.get(k): ids.append(P[k][0])
    for x in P.get('items', []): ids.append(x[1])
    if P.get('room'): ids.append(P['room'][1])
for x in set(ids):
    if ids.count(x) > 1: warn('獎品 id 重複', x)
    if re.search(r"['\"]%s['\"]" % re.escape(x), s): warn('獎品 id 跟舊的一樣', x)
pt = [p[0] for p in d.S8PT]
for x in set(pt):
    if pt.count(x) > 1: warn('自由練習 id 重複', x)
for f in glob.glob(os.path.join(ROOT, 'lines', 's8_*.tsv')):
    L = [l.split('\t')[0] for l in open(f, encoding='utf-8').read().splitlines() if l.strip()]
    for x in set(L):
        if L.count(x) > 1: warn('TSV id 重複', os.path.basename(f), x)
    for x in L:
        if not re.match(r'^S8B?_', x): warn('TSV id 前綴', os.path.basename(f), x)
    note('TSV', os.path.basename(f), len(L), '句')

# ---------- 5. 故事屋 ----------
for b in d.S8BOOKS:
    if not 8 <= len(b['p']) <= 10: warn('故事屋頁數', b['id'], len(b['p']))
    for q in b['q']:
        if len(set(q[1])) != 3: warn('故事屋選項重複', q)

open(os.path.join(OUTD, 'check_s8.txt'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('\n'.join(out))
print('問題', bad, '（⚠ 要改；・ 看一下）')

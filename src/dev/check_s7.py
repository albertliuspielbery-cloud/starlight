# -*- coding: utf-8 -*-
# 第七季內容自我檢查：題目和舊題庫比對、選項重複、答案唯一、禁用詞、說明一句話、關卡格式
# 用法：python3 /home/claude/w/s7/dev/check_s7.py
import json, os, re, sys, difflib
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import s7_data as d
BASE = '/home/claude/w/s7/base/index.html'
QA = '/home/claude/w/s7/qa/content7'
os.makedirs(QA, exist_ok=True)

s = open(BASE, encoding='utf-8').read()
strs = set()
for t in re.findall(r'"((?:[^"\\\n]|\\.){3,200})"|\'((?:[^\'\\\n]|\\.){3,200})\'|`([^`\n]{3,200})`', s):
    x = next(a for a in t if a)
    if re.search(r'[一-鿿]', x): strs.add(x)
oldQ = [x for x in strs if x.endswith('？')]
core = lambda t: re.sub(r'[，。！？、「」：；～…\s]', '', t)

out = []; bad = 0
def warn(*a):
    global bad; bad += 1; out.append('⚠ ' + ' '.join(str(x) for x in a))
def note(*a): out.append('・' + ' '.join(str(x) for x in a))

# 1. 題目：跟舊題比對（完全一樣、去標點一樣、很像）
for i, (tag, q, a, w, why) in enumerate(d.S7Q):
    cq = core(q)
    for o in oldQ:
        r = difflib.SequenceMatcher(None, cq, core(o)).ratio()
        if cq == core(o): warn('同題', i, q, '｜舊：', o)
        elif r >= 0.72: note(f'像（{r:.2f}）', i, q, '｜舊：', o)
    # 選項
    labs = [a[1]] + [x[1] for x in w]
    if len(set(labs)) != 3: warn('選項重複', i, labs)
    icons = [a[0]] + [x[0] for x in w]
    if len(set(icons)) != 3: note('圖示重複', i, icons)
    if len(w) != 2: warn('錯的選項不是 2 個', i)
    # 說明一句話（答對後 praise＋說明會黏成一串再切句，每一句都要有錄音）
    if len(d.sents(why)) != 1: warn('說明不只一句', i, why)
    if not why.endswith(('。', '！')): warn('說明結尾', i, why)
    if not q.endswith('？'): warn('題目結尾', i, q)
    # 選項不要有逗號以外會被切斷的標點
    for l in labs:
        if re.search(r'[。！？]', l): warn('選項有句號', i, l)
# 題目重複
qs = [q[1] for q in d.S7Q]
for q in set(qs):
    if qs.count(q) > 1: warn('第七季內重複', q)

# 2. 禁用詞、品牌、真實場館
BAN = ['星光少女', '星光樂團', '星光樂園', '悠遊卡', '一卡通', '台北捷運', '北捷', '臺北市立動物園', '木柵', '圓仔', '故宮', '國美館', '北美館', '美術館大道', '健保卡',
       '價格', '購買', '買', '元', '主角', '角色', 'Albert', '陌生人', '不認識的人', '死', '血', '打針', '溫度計', '度C', '分鐘後']
ALLOW = {'元': ['單元'], '買': []}
def texts():
    for c in d.CH:
        D = d.S7D[c]
        for k in ['name', 'firstSay', 'endText', 'story_p', 'story_b', 'letter_p', 'letter_b', 'theater', 'gift']:
            if D.get(k): yield f'{c}.{k}', D[k]
        for i, t in enumerate(D['story']): yield f'{c}.story{i}', t
        for i, L in enumerate(D['levels']): yield f'{c}.L{i+1}', L[0] + '｜' + L[2] + '｜' + L[5]
    for i, q in enumerate(d.S7Q): yield f'Q{i}', '｜'.join([q[1], q[2][1], q[3][0][1], q[3][1][1], q[4]])
    for k, v in d.S7FIN.items():
        if isinstance(v, str): yield 'FIN.' + k, v
        elif isinstance(v, list): yield 'FIN.' + k, json.dumps(v, ensure_ascii=False)
    for b in d.S7BOOKS:
        for i, p in enumerate(b['p']): yield f"{b['id']}.{i}", p[2]
        for q in b['q']: yield b['id'] + '.q', q[0] + '｜' + '｜'.join(q[1])
    yield 'PARENT', json.dumps(d.S7PARENT, ensure_ascii=False)
    yield 'NQ', json.dumps(d.S7NQ, ensure_ascii=False)
    for k, M in d.S7GRID.items():
        for lv, T in M['tasks'].items():
            for t in T: yield f'grid.{k}.{lv}', t['line']
for k, t in texts():
    for b in BAN:
        if b in t:
            if b == '元' and '元' not in re.sub(r'單元', '', t): continue
            warn('禁用詞', b, k, t[:60])
    if re.search(r'\d+點\d+分|幾點幾分', t): warn('出現幾點幾分', k, t)
    if re.search(r'[a-zA-Z]', t) and not k.startswith(('NQ', 'PARENT')) and not re.search(r'^(4[1-5]\.(letter|L)|Q|FIN)', k):
        note('文字裡有英文字母（要確認念法）', k, t[:50])

# 3. 關卡格式
KINDS = re.compile(r'^(quiz:[^:]+|write:[^:]+:[123]|R:[^:]+:3|zhuyin:hear7:[^:]+|letter:k7:[A-Z|]+|letter:k7lo:[a-z|]+|letter:s7case:[a-z|]+|letter:s7floor:[a-z|]+|'
                   r'shape:s7grid:[zm][1-6]|count:s7ord:10|count:s7hund:100|count:s7queue|measure:s7blk|clock:s7|count:s7five:30)$')
REW = ['pick', 'box', 'chest', 'petgift', 'pick', 'rain', 'box', 'chest', 'petgift', 'chapter']
for c in d.CH:
    D = d.S7D[c]
    if len(D['levels']) != 10: warn('關數', c)
    if [L[4] for L in D['levels']] != REW: warn('獎勵順序跟第六季不同', c, [L[4] for L in D['levels']])
    for i, L in enumerate(D['levels']):
        if L[3][0] != 'quiz:' + D['tag']: warn('第一題不是本章 quiz', c, i)
        for k in L[3]:
            if not KINDS.match(k): warn('題型寫法', c, i + 1, k)
            m = re.match(r'shape:s7grid:(\w+)', k)
            if m and m.group(1) not in d.S7GRID: warn('沒有這張地圖', k)
        if len(L[3]) != (4 if i == 9 else 3): warn('題數', c, i + 1, len(L[3]))
    # 寫字：每個新字 1、2、3 階段都有（c 跳過 1）
    want = [x for x in D['learn']]
    for ch in want:
        st = sorted(int(k.split(':')[2]) for L in D['levels'] for k in L[3] if k.startswith('write:' + ch + ':'))
        exp = [2, 3] if ch == 'c' else [1, 2, 3]
        if st != exp: warn('寫字階段', c, ch, st)
# 學過才複習：R／hear7／k7 用到的字，要在這一章以前（含）學過
learned = set('ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘABCDEFGHIJKLMNOPQRSTUV')
for c in d.CH:
    D = d.S7D[c]; now = learned | set(D['learn'])
    for i, L in enumerate(D['levels']):
        for k in L[3]:
            p = k.split(':')
            if p[0] in ('R',) or (p[0] in ('zhuyin', 'letter') and len(p) > 2 and p[2] not in ('auto',)):
                arg = p[1] if p[0] == 'R' else p[2]
                for ch in arg.split('|'):
                    if ch and ch not in now: warn('還沒學就出現', c, i + 1, k, ch)
    learned = now

# 4. 數學範圍：一年級（數到 100、五個一數到 30、整點半點）
for c in d.CH:
    for L in d.S7D[c]['levels']:
        for k in L[3]:
            if k.startswith('count:s7five:') and int(k.split(':')[2]) > 30: warn('五個一數超過 30', k)

# 5. 故事屋：頁數 8～10、每頁一到兩句
for b in d.S7BOOKS:
    if not 8 <= len(b['p']) <= 10: warn('故事屋頁數', b['id'], len(b['p']))
    for p in b['p']:
        if len(d.sents(p[2])) > 3: note('故事頁句子多', b['id'], p[2])
    for q in b['q']:
        if len(set(q[1])) != 3: warn('故事屋選項重複', q)

# 6. 方格地圖：答案唯一（同一題的答案只有一個地點）
for k, M in d.S7GRID.items():
    lines = [t['line'] for lv in ['easy', 'mid', 'hard'] for t in M['tasks'][lv]]
    if len(lines) != len(set(lines)): warn('地圖題目重複', k)

open(os.path.join(QA, 'check_s7.txt'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('\n'.join(out))
print('問題', bad, '（⚠ 要改；・ 看一下）')

# 測試時程式要念的句子（said_*.json），逐句檢查：在語音索引或 lines/s7_content_keys.tsv 裡找得到（照 voResolve 的切法）
import json,glob,re,sys
I=set(json.load(open('/home/claude/w/s7/out/web/voice/'+json.load(open('/home/claude/w/s7/cfg.json'))['voice_index'], encoding='utf-8'))['clips'])
for l in open('/home/claude/w/s7/lines/s7_content_keys.tsv',encoding='utf-8'):
    p=l.rstrip('\n').split('\t')
    if len(p)>1:I.add(p[1])
has=lambda k:k in I
ck=lambda t:re.sub(r'[，、,]+$','',t.strip())
def sents(t):return [x.strip() for x in re.findall(r'[^。！？!?]+[。！？!?」』）)～…]*',t) if x.strip()]
def digits(c):
    x=ck(c)
    if not re.search(r'\d',x):return False
    for t in [t.strip() for t in re.split(r'(\d+)',x) if t.strip()]:
        if re.fullmatch(r'[，、。！？!?：:\s]+',t):continue
        if re.fullmatch(r'\d+',t):
            if not has('n|%d'%int(t)):return False
        elif not has('p|'+t):return False
    return True
def ok(s):
    if has('z|'+s) or has('z|'+ck(s)):return True
    ch=[x.strip() for x in re.sub(r'([，、])',lambda m:m.group(1)+'\x01',s).split('\x01') if x.strip()]
    if len(ch)==1:return digits(ch[0])
    return all(has('z|'+ck(c)) or digits(c) for c in ch)
miss=set();tot=set()
for f in glob.glob('/home/claude/w/s7/qa/s7/said_*.json'):
    for t in json.load(open(f)):
        tot.add(t)
        if has('z|'+t.strip()):continue
        for s in sents(t) or [t]:
            if not ok(s):miss.add(s)
print('句子',len(tot),'找不到',len(miss))
for m in sorted(miss):print(' ',m)

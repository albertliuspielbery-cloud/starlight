# 小小攝影師台詞表：從 mods/m8_photo.js 的 LINES、QS 和 m8_photo_art.js 的名字產生 lines/photo.tsv
# 已經有錄音的句子（目前語音索引裡找得到）不再列。格式：id<TAB>聲音<TAB>文字
import re,json,sys
H='/home/claude/w/s7'
js=open(H+'/mods/m8_photo.js',encoding='utf-8').read()
T=json.loads('{'+re.search(r'/\*LINES\*/\s*const T=\{(.*?)\};\s*/\*END\*/',js,re.S).group(1)+'}')
QS=json.loads(re.search(r'/\*QS\*/\s*const QS=(\[.*?\]);\s*/\*END\*/',js,re.S).group(1))
art=open(H+'/mods/m8_photo_art.js',encoding='utf-8').read()
L=re.findall(r"\['(\w+)','([^']+)','([^']+)'\]",re.search(r'const LIST=\[(.*?)\]\s*\.map',art,re.S).group(1))
idx={}
try:
    vi=re.search(r"VOICE_INDEX='([^']+)'",open('/home/claude/w/repo/index.html',encoding='utf-8').read()).group(1)
    idx=json.load(open('/home/claude/w/repo/voice/'+vi,encoding='utf-8'))['clips']
except Exception as e: print('no index',e)
zh=lambda t:('z|'+t) in idx or ('z|'+t.rstrip('，、,')) in idx
rows=[];seen=set()
def add(i,v,t):
    if t in seen: return
    seen.add(t);rows.append((i,v,t))
N='zh-TW-HsiaoChenNeural';EN='en-US-JennyNeural'
skip={'d_easy','d_mid','d_hard','gem3','gem1','again','lockApp'}  # 這幾句跟雨林盪藤蔓同一句，已經在 lines_park6
for k,t in T.items():
    if k in skip or zh(t): continue
    add('PH8_'+k,N,t)
for q in QS:
    if zh(q['t']): continue
    add('PH8_q'+q['id'],N,q['t'])
for k,c,e in L:
    if not (zh(c+'。') or zh(c)): add('PH8_n_'+k,N,c+'。')
    if not any(('e1|'+x) in idx for x in (e+'.',e.lower(),e.lower()+'.')): add('PH8_e_'+k,EN,e+'.')
with open(H+'/lines/photo.tsv','w',encoding='utf-8') as f:
    for r in rows: f.write('\t'.join(r)+'\n')
print('lines',len(rows),'questions',len(QS),'skipped existing',len(T)+len(QS)+len(L)*2-len(rows))

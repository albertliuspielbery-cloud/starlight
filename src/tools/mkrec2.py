# 用法：python3 tools/mkrec2.py NN
# 把 lines/ 裡 2.2、2.3 的新台詞整理成 Albert 電腦錄音用的 rec/rNN/lines_NN.tsv、recNN.bat，以及 lines/voNN_ids.json。
# 支援：兩欄 id<TAB>文字（id 是 e1|xxx 的當英文）、四欄 id<TAB>key<TAB>聲音<TAB>來源（s8_content_keys.tsv）、s8_prince.tsv（王子版書，id 加 P）。
# 已經有錄音（目前語音索引有同一個 key）或重複的 key 跳過；破音字用 lines/*ssml*.json（id→SSML 文字）；主角／角色的角換成腳。
import json,sys,os,re,glob
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));nn=sys.argv[1]
cfg=json.load(open(H+'/cfg.json',encoding='utf-8'));idx=json.load(open(H+'/voice/'+cfg['voice_index'],encoding='utf-8'))['clips']
SS={}
for f in sorted(glob.glob(H+'/lines/*ssml*.json')):
  try:SS.update(json.load(open(f,encoding='utf-8')))
  except Exception as e:print('ssml 讀不到',f,e)
VO={'z':'zh-TW-HsiaoChenNeural','dz':'zh-TW-HsiaoYuNeural','pz':'zh-TW-YunJheNeural','e1':'en-US-JennyNeural','e0':'en-US-JennyNeural','z1':'zh-TW-HsiaoChenNeural'}
FILES=['v22_misc','v22_giftcore','v22_giftitems','v22_hands','s8_content_keys','s8_prince','s8_learn','s8_safe','p23','h23','b23','g23']
out=[];ids={};seen=set();skip=0;nid=set()
def jiao(t):return t.replace('主角','主腳').replace('角色','腳色')
for b in FILES:
  f=f'{H}/lines/{b}.tsv'
  if not os.path.exists(f):print('沒有',b);continue
  for ln in open(f,encoding='utf-8'):
    ln=ln.rstrip('\n')
    if not ln.strip() or ln.startswith('#'):continue
    p=ln.split('\t')
    if b=='s8_content_keys':
      i,key,voice=p[0],p[1],p[2]
    else:
      i,t=p[0],p[-1]
      if b=='s8_prince':i=i.replace('S8B_','S8BP_')
      if i.startswith('e1|'):key=i;i='E1_'+re.sub(r'[^A-Za-z0-9]','_',i[3:])
      else:key='z|'+t
      voice=VO[key.split('|')[0]]
    pre,txt=key.split('|',1)
    if key in idx or key in seen:skip+=1;continue
    if i in nid:i=i+'_x'
    seen.add(key);nid.add(i);ids[i]=key
    sp=SS.get(p[0],SS.get(i,txt))
    if pre in ('z','dz','pz','z1'):sp=jiao(sp)
    if pre=='z1':sp="<prosody rate='-35%'>"+sp+"</prosody>"
    out.append(f'{i}\t{voice}\t{sp}')
d=f'{H}/rec/r{nn}';os.makedirs(d,exist_ok=True)
open(f'{d}/lines_{nn}.tsv','w',encoding='utf-8').write('\n'.join(out)+'\n')
open(f'{d}/rec{nn}.bat','w',encoding='utf-8',newline='\r\n').write(f'@echo off\ncd /d "%~dp0"\npowershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run.ps1" lines_{nn}.tsv\n')
json.dump(ids,open(f'{H}/lines/vo{nn}_ids.json','w',encoding='utf-8'),ensure_ascii=False)
print('lines',len(out),'skipped',skip,'->',d)

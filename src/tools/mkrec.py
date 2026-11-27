# 用法：python3 tools/mkrec.py NN 檔1.tsv 檔2.tsv …
# 把新台詞（id<TAB>文字，或 e1|英文<TAB>英文）整理成 Albert 電腦錄音用的 rec/rNN/lines_NN.tsv、recNN.bat，以及 lines/voNN_ids.json。
# 已經有錄音（目前語音索引裡有同一個 key）或重複的句子會跳過。破音字要自己先在 SSML 欄處理（見 SSML 表）。
import json,sys,os,re
H='/home/claude/w/s7';nn=sys.argv[1];fs=sys.argv[2:]
cfg=json.load(open(H+'/cfg.json',encoding='utf-8'));idx=json.load(open(H+'/voice/'+cfg['voice_index'],encoding='utf-8'))['clips']
SSML=json.load(open(H+'/lines/ssml_fix.json',encoding='utf-8')) if os.path.exists(H+'/lines/ssml_fix.json') else {}
out=[];ids={};seen=set();skip=0
for f in fs:
  for ln in open(f,encoding='utf-8'):
    ln=ln.rstrip('\n')
    if not ln.strip() or ln.startswith('#'):continue
    p=ln.split('\t');i,t=p[0],p[-1]
    if i.startswith('e1|'):
      key=i;rid='E1_'+re.sub(r'[^A-Za-z0-9]','_',i[3:]);voice='en-US-JennyNeural';sp=t
    else:
      key='z|'+t;rid=i;voice='zh-TW-HsiaoChenNeural';sp=SSML.get(rid,t)
    if key in idx or key in seen:skip+=1;continue
    seen.add(key);ids[rid]=key;out.append(f'{rid}\t{voice}\t{sp}')
d=f'{H}/rec/r{nn}';os.makedirs(d,exist_ok=True)
open(f'{d}/lines_{nn}.tsv','w',encoding='utf-8').write('\n'.join(out)+'\n')
open(f'{d}/rec{nn}.bat','w',encoding='utf-8',newline='\r\n').write(f'@echo off\ncd /d "%~dp0"\npowershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run.ps1" lines_{nn}.tsv\n')
json.dump(ids,open(f'{H}/lines/vo{nn}_ids.json','w',encoding='utf-8'),ensure_ascii=False)
print('lines',len(out),'skipped',skip,'->',d)

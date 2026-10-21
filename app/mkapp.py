# 把網頁版做成 App 用的檔案（starlight-app/www）：加上 App 標記、拿掉 service worker、語音拆成一句一個檔
import os,re,json,shutil,sys
import pathlib
HERE=pathlib.Path(__file__).resolve().parent
SRC=str(HERE.parent);DST=str(HERE/'www')
h=open(SRC+'/index.html',encoding='utf-8').read()
inj="<script>window.__APP=1;try{Object.defineProperty(window,'caches',{value:undefined,configurable:true})}catch(e){}</script>"
assert h.count('<head>')==1;h=h.replace('<head>','<head>'+inj,1)
# App 1.3：第二十一～二十五章由 stage5 購買解鎖（不包含在第六～二十章合購裡）
# 網頁版 4.2 還沒有 stage5（之後的網頁版從 v5/m67_iap.js 建置就會有）；沒有的話在這裡補上
S4="['stage4','第十六～二十章',15,20]];"
S5="['stage4','第十六～二十章',15,20],['stage5','第二十一～二十五章',20,25]];"
if S5 not in h:
  assert h.count(S4)==1,'找不到網頁版的 STAGES'
  h=h.replace(S4,S5,1)
  h=h.replace('解鎖第六～二十章</button><small class="iapppn">','解鎖新的章節</button><small class="iapppn">',1)
assert h.count(S5)==1 and "const FULLSET=['stage2','stage3','stage4'];" in h,'stage5／合購設定不對'
assert "const s3Ok=()=>IS_APP||" in h,'App 版不能出現網頁版的第三季密碼'

h2=re.sub(r"<script>if\('serviceWorker' in navigator\)\{[^<]*</script>\n?",'',h)
assert h2!=h,'sw register not found';h=h2
# App 版不放孩子的真名（版本紀錄、王子版替換表裡的舊字串）
h=h.replace('、Anita、','、').replace('Anita','小公主');assert 'Anita' not in h and '安妮塔' not in h
if os.path.exists(DST):shutil.rmtree(DST)
os.makedirs(DST+'/voice/c')
if os.environ.get('DEMO'):
  di=open(str(HERE/'demo_init.js'),encoding='utf-8').read();dm=open(str(HERE/'demo.js'),encoding='utf-8').read()
  h=h.replace('<head>','<head><script>'+di+'</script>',1)
  assert h.count('</body>')==1;h=h.replace('</body>','<script>'+dm+'</script></body>',1)
if os.environ.get('SELFTEST'):
  st=open(str(HERE/'selftest.js'),encoding='utf-8').read()
  assert h.count('</body>')==1;h=h.replace('</body>','<script>'+st+'</script></body>',1)
# 「關於」裡的版本號：自動用 Xcode 專案的版本（MARKETING_VERSION），不用手動改
import re as _re
_mv=_re.search(r'MARKETING_VERSION = ([0-9.]+);',open(HERE/'ios/App/App.xcodeproj/project.pbxproj',encoding='utf-8').read()).group(1)
assert h.count("const APP_STORE_VER='")==1,'APP_STORE_VER 不見了'
h=_re.sub(r"const APP_STORE_VER='[^']*'",f"const APP_STORE_VER='{_mv}'",h)
open(DST+'/index.html','w',encoding='utf-8').write(h)
for f in os.listdir(SRC):
  if (f.endswith('.woff2') and f in h) or f.endswith(('.png','.webmanifest')):shutil.copy(SRC+'/'+f,DST+'/'+f)
vi=re.search(r"const VOICE_INDEX='([^']+)'",h).group(1)
j=json.load(open(SRC+'/voice/'+vi,encoding='utf-8'))
shutil.copy(SRC+'/voice/'+vi,DST+'/voice/'+vi)
packs={}
n=0;tot=0;seen=set()
for k,e in j['clips'].items():
  fi,off,ln=(e[3],e[4],e[2]) if len(e)>=5 else (e[0],e[1],e[2])
  name=f'{fi}-{off}.mp3'
  if name in seen:continue
  seen.add(name)
  if fi not in packs:packs[fi]=open(SRC+'/voice/'+j['files'][fi],'rb').read()
  b=packs[fi][off:off+ln];assert len(b)==ln
  open(DST+'/voice/c/'+name,'wb').write(b);n+=1;tot+=ln
print('app www ok: clips',n,'MB',round(tot/1048576,1),'index',vi)

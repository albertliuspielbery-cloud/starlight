# 把網頁版做成 App 用的檔案（starlight-app/www）：加上 App 標記、拿掉 service worker、語音拆成一句一個檔
import os,re,json,shutil,sys
import pathlib
HERE=pathlib.Path(__file__).resolve().parent
SRC=str(HERE.parent);DST=str(HERE/'www')
h=open(SRC+'/index.html',encoding='utf-8').read()
inj="<script>window.__APP=1;try{Object.defineProperty(window,'caches',{value:undefined,configurable:true})}catch(e){}</script>"
assert h.count('<head>')==1;h=h.replace('<head>','<head>'+inj,1)
h2=re.sub(r"<script>if\('serviceWorker' in navigator\)\{[^<]*</script>\n?",'',h)
assert h2!=h,'sw register not found';h=h2
if os.path.exists(DST):shutil.rmtree(DST)
os.makedirs(DST+'/voice/c')
if os.environ.get('SELFTEST'):
  st=open(str(HERE/'selftest.js'),encoding='utf-8').read()
  assert h.count('</body>')==1;h=h.replace('</body>','<script>'+st+'</script></body>',1)
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

# 星光小冒險 第七季開發用建置（2026-11-22 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）
# 底：base/index.html（= 已上架 5.3.1 的建好檔）＋ patches/*.py（依檔名順序，對底做文字取代）＋ mods/*.js（依檔名順序接在主程式最後）
# 輸出：out/web（網頁版，8981）、out/app/www（App 版，8982）
# 用法：python3 build.py [版本號] ；環境變數 VI=index-xxxx.json 換語音索引
import os,re,sys,glob,json,hashlib,shutil,subprocess,pathlib
import fcntl
_LK=open('/home/claude/w/s7/.build.lock','w');fcntl.flock(_LK,fcntl.LOCK_EX)  # 同時只跑一個建置，避免 out/app 被互相清掉
H=pathlib.Path(__file__).resolve().parent;REPO=pathlib.Path('/home/claude/w/repo')
cfg=json.load(open(H/'cfg.json',encoding='utf-8')) if (H/'cfg.json').exists() else {}
s=open(H/'base/index.html',encoding='utf-8').read()
# 1. patches
for p in sorted(glob.glob(str(H/'patches/*.py'))):
    ns={'s':s};exec(open(p,encoding='utf-8').read(),ns);s=ns['s']
# 2. mods：接在主程式 <script> 的結尾
mods=sorted(glob.glob(str(H/'mods/*.js')))
body=''.join(f"\n/* ---- {os.path.basename(m)} ---- */\n"+open(m,encoding='utf-8').read()+'\n' for m in mods)
k=s.index("<script>if('serviceWorker' in navigator)")
j=s.rindex('</script>',0,k)
s=s[:j]+body+s[j:]
# 3. 版本號、版本紀錄、語音索引
ver=cfg.get('version');vlog=cfg.get('vlog')
if ver:
    assert s.count("const APP_VERSION='")>=1
    s=re.sub(r"const APP_VERSION='[^']*';\nconst VLOG=\[",lambda m:f"const APP_VERSION='{ver}';\nconst VLOG=["+(json.dumps([ver,cfg.get('date',''),vlog],ensure_ascii=False)+',' if vlog else ''),s,count=1)
vi=os.environ.get('VI') or cfg.get('voice_index')
if vi:
    n0=s.count("VOICE_INDEX='index-");s=re.sub(r"VOICE_INDEX='index-[0-9a-f]+\.json'",f"VOICE_INDEX='{vi}'",s);assert n0>=1
# 4. 字型：出現新字才重做
dep=set(open(H/'font/deployed.txt',encoding='utf-8').read())
ch=set(c for c in s if ord(c)>=0x2000 and not (0x1F000<=ord(c)<=0x1FFFF) and ord(c) not in range(0x2600,0x27C0) and ord(c)!=0xFE0F)
ch|=set(chr(c) for c in range(0x20,0x7F))|set(chr(c) for c in range(0x3100,0x3130))|set('ˊˇˋ˙，。！？、：；「」『』（）～…—．·')
old=re.search(r'font-hun-([0-9a-f]{8})\.woff2',s).group(0)
W=H/'out/web';W.mkdir(parents=True,exist_ok=True)
if ch<=dep:
    hun=old;shutil.copy(REPO/old,W/old)
else:
    allc=''.join(sorted(ch|dep));open(H/'font/chars.txt','w',encoding='utf-8').write(allc)
    subprocess.run(['pyftsubset',str(H/'font/Huninn.ttf'),f'--text-file={H}/font/chars.txt','--flavor=woff2',f'--output-file={H}/font/hun.woff2','--layout-features=*'],check=True)
    hh=hashlib.md5(open(H/'font/hun.woff2','rb').read()).hexdigest()[:8];hun=f'font-hun-{hh}.woff2'
    shutil.copy(H/'font/hun.woff2',W/hun);print('新字',len(ch-dep),'→',hun)
s=s.replace(old,hun)
# 5. 網頁版輸出
for f in os.listdir(REPO):
    if f.endswith(('.png','.webmanifest','.html')) and f!='index.html':shutil.copy(REPO/f,W/f)
shutil.copy(REPO/'font-baloo-abc191e4.woff2',W/'font-baloo-abc191e4.woff2')
sw=open(H/'base/sw.js',encoding='utf-8').read().replace(old,hun)
if cfg.get('sw'):sw=re.sub(r"const VERSION='[^']*';",f"const VERSION='{cfg['sw']}';",sw,count=1)
open(W/'sw.js','w',encoding='utf-8').write(sw)
open(W/'index.html','w',encoding='utf-8').write(s)
vd=W/'voice'
if not vd.exists():vd.mkdir()
for d in [REPO/'voice',H/'voice']:
    if d.exists():
        for f in os.listdir(d):
            t=vd/f
            if not t.exists():os.link(d/f,t)
# 6. App 版：用 repo 的 app/mkapp.py
A=H/'out/app';
if A.exists():shutil.rmtree(A)
A.mkdir(parents=True);shutil.copytree(REPO/'app',A/'app',ignore=shutil.ignore_patterns('www','node_modules','Pods','build'))
for f in os.listdir(W):
    if f!='voice':shutil.copy(W/f,A/f)
os.symlink(vd,A/'voice')
r=subprocess.run([sys.executable,str(A/'app/mkapp.py')],cwd=A,capture_output=True,text=True);print(r.stdout[-400:],r.stderr[-800:])
print('ok',ver or '', 'mods',len(mods),'font',hun)

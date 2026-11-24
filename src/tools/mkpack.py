# 用法：python3 mkpack.py 舊索引路徑 ids.json mp3資料夾 packNN
# ids.json：{id: key}；同 key 已存在就用新錄音蓋過（重錄），沒有就新增。輸出到 /home/claude/w/s7/voice/
import json,hashlib,subprocess,os,sys
old_p,ids_p,mp3d,pk=sys.argv[1:5]
OUT='/home/claude/w/s7/voice';os.makedirs(OUT,exist_ok=True)
old=json.load(open(old_p,encoding='utf-8'));ids=json.load(open(ids_p,encoding='utf-8'))
md=lambda b:hashlib.md5(b).hexdigest()
HDR=b'STARLIGHT-VOICE\n';idx=dict(old['clips']);files=list(old['files']);sizes=list(old['sizes'])
cur=bytearray(HDR);fi=len(files);n_new=n_rep=0;miss=[]
tmp='/home/claude/w/s7/rec/_clean';os.makedirs(tmp,exist_ok=True)
for i,k in sorted(ids.items()):
  src=f'{mp3d}/{i}.mp3'
  if not os.path.exists(src):miss.append(i);continue
  o=f'{tmp}/{i}.mp3'
  subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-c','copy','-map_metadata','-1','-id3v2_version','0','-write_id3v1','0',o],check=True)
  b=open(o,'rb').read()
  if k in idx:n_rep+=1
  else:n_new+=1
  idx[k]=[fi,len(cur),len(b)];cur+=b
name=f'{pk}-{md(cur)[:8]}.bin';open(f'{OUT}/{name}','wb').write(cur);files.append(name);sizes.append(len(cur))
o={'files':files,'sizes':sizes,'clips':idx}
if old.get('early'):o['early']=old['early']
j=json.dumps(o,ensure_ascii=False,separators=(',',':'))
iname=f'index-{md(j.encode())[:8]}.json';open(f'{OUT}/{iname}','w',encoding='utf-8').write(j)
print(name,'new',n_new,'replaced',n_rep,'missing',len(miss),miss[:5]);print(iname)

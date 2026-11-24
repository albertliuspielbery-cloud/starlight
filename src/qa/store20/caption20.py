# App 2.0 商店截圖：照 1.3 起的 caption13.py 版型（紫色漸層、金色標題、白色小字副標、圓角金框＋陰影）
# 新做 3 張 × iPhone/iPad，換掉 1、3、5 號；另出 8 張總覽圖（新 3 張＋repo 現有 5 張）
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os,re
D=os.path.dirname(os.path.abspath(__file__))
FONT='/home/claude/w/src511/src_x95/font/Huninn.ttf'
OUT='/mnt/user-data/outputs/s7預覽/商店截圖'
REPO='/home/claude/w/repo/appstore/screenshots/zh-Hant'
NEW={1:('s7q','第七季：搭捷運去城市小旅行','第四十一～四十五章包含在完整版・新寵物小貓熊'),
     3:('globe','地球儀：轉一轉，認識世界','遊樂園新遊戲・完成第四十一章後開放（包含在完整版）'),
     5:('photo','小小攝影師：找到動物按快門','遊樂園新遊戲・完成第四十四章後開放（包含在完整版）')}
BAD=re.compile('[ㄅ-ㄯˇˊˋ˙]|免費|NT\\$|\\$|元|星光少女|星光樂團|星光樂園')
for k,(r,c,s) in NEW.items(): assert not BAD.search(c+s),(c,s)
SIZE={'iphone':(1320,2868),'ipad':(2064,2752)}
def grad(w,h):
    im=Image.new('RGB',(w,h));dr=ImageDraw.Draw(im)
    a=(58,40,138);b=(122,62,170)
    for y in range(h):
        t=y/(h-1);dr.line([(0,y),(w,y)],fill=tuple(int(a[i]+(b[i]-a[i])*t) for i in range(3)))
    return im
def rounded(im,r):
    m=Image.new('L',im.size,0);ImageDraw.Draw(m).rounded_rectangle([0,0,im.size[0]-1,im.size[1]-1],r,fill=255);return m
os.makedirs(OUT,exist_ok=True);allim=[]
for dev,(W,H) in SIZE.items():
    bg=grad(W,H)
    for i in range(1,9):
        if i not in NEW:
            allim.append((dev,i,Image.open(f'{REPO}/{dev}-{i}.png').convert('RGB')));continue
        k,cap,sub=NEW[i]
        src=Image.open(f'{D}/raw/{dev}-{k}.png').convert('RGB')
        im=bg.copy();dr=ImageDraw.Draw(im)
        fs=int(W*(0.072 if dev=='iphone' else 0.05));f=ImageFont.truetype(FONT,fs)
        while dr.textlength(cap,font=f)>W*0.9:fs-=4;f=ImageFont.truetype(FONT,fs)
        top=int(H*0.045);tw=dr.textlength(cap,font=f)
        dr.text(((W-tw)/2+3,top+4),cap,font=f,fill=(30,16,70))
        dr.text(((W-tw)/2,top),cap,font=f,fill=(255,236,170))
        y0=top+fs+int(H*0.035)
        if sub:
            ss=int(fs*0.5);f2=ImageFont.truetype(FONT,ss)
            while dr.textlength(sub,font=f2)>W*0.92:ss-=2;f2=ImageFont.truetype(FONT,ss)
            sw2=dr.textlength(sub,font=f2)
            sy=top+fs+int(H*0.012);dr.text(((W-sw2)/2,sy),sub,font=f2,fill=(236,226,255))
            y0=sy+ss+int(H*0.022)
        avail=H-y0-int(H*0.03)
        sc=min(W*0.86/src.width,avail/src.height);sw,sh=int(src.width*sc),int(src.height*sc)
        s2=src.resize((sw,sh),Image.LANCZOS);x0=(W-sw)//2;r=int(W*0.05)
        sh_=Image.new('L',(W,H),0);ImageDraw.Draw(sh_).rounded_rectangle([x0,y0+18,x0+sw,y0+sh+18],r,fill=150)
        im.paste((20,10,50),(0,0),sh_.filter(ImageFilter.GaussianBlur(28)))
        im.paste(s2,(x0,y0),rounded(s2,r))
        ImageDraw.Draw(im).rounded_rectangle([x0,y0,x0+sw,y0+sh],r,outline=(255,220,140),width=max(3,W//300))
        im.save(f'{OUT}/{dev}-{i}.png',optimize=True);allim.append((dev,i,im));print(dev,i,im.size,fs,ss)
TH=640;rows=[]
for dev in ('iphone','ipad'):
    rows.append([(i,x.resize((x.width*TH//x.height,TH),Image.LANCZOS)) for d,i,x in allim if d==dev])
LW=max(sum(t.width for i,t in r)+16*(len(r)+1) for r in rows)
sheet=Image.new('RGB',(LW,(TH+80)*2+20),(40,28,90));dr=ImageDraw.Draw(sheet);fl=ImageFont.truetype(FONT,28)
for ri,(lab,r) in enumerate(zip(('iPhone 6.9 吋 1320×2868','iPad 13 吋 2064×2752'),rows)):
    y=10+ri*(TH+80);dr.text((16,y),lab+'（★＝新做，其餘沿用現有）',font=fl,fill=(255,236,170));xx=16
    for n,t in r:
        sheet.paste(t,(xx,y+40));dr.text((xx+4,y+40+TH+4),('★' if n in NEW else '')+str(n),font=ImageFont.truetype(FONT,26),fill=(255,236,170) if n in NEW else (236,226,255));xx+=t.width+16
sheet.save(OUT+'/總覽_8張.png',optimize=True)
print('ok')

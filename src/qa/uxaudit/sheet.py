import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
def sheet(files,out,cols,tw,label=True):
    ims=[Image.open(f).convert('RGB') for f in files]
    th=int(ims[0].height*tw/ims[0].width)
    rows=(len(ims)+cols-1)//cols
    S=Image.new('RGB',(cols*tw+(cols+1)*8,rows*(th+30)+8),(30,30,40))
    try:F=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',20)
    except:F=ImageFont.load_default()
    d=ImageDraw.Draw(S)
    for i,(f,im) in enumerate(zip(files,ims)):
        im=im.resize((tw,int(im.height*tw/im.width)))
        x=8+(i%cols)*(tw+8);y=8+(i//cols)*(th+30)
        S.paste(im,(x,y+24))
        if label:d.text((x,y),os.path.basename(f)[:-4],fill=(255,230,150),font=F)
    S.save(out,quality=85);print(out,S.size)
D='shots/padL/';os.makedirs('sheets',exist_ok=True)
q=sorted(glob.glob(D+'A_ch*_q.png'))
sheet(q[0:15],'sheets/scenes_01-15.jpg',5,440)
sheet(q[15:30],'sheets/scenes_16-30.jpg',5,440)
sheet(q[30:45],'sheets/scenes_31-45.jpg',5,440)
sheet(sorted(glob.glob(D+'A_ch*_intro.png')),'sheets/intro_helpers.jpg',3,600)
sheet(sorted(glob.glob(D+'B*.png')),'sheets/flow.jpg',4,520)
c=sorted(glob.glob(D+'C*.png'))
sheet(c[:14],'sheets/park_1.jpg',4,520)
sheet(c[14:],'sheets/park_2.jpg',4,520)
P='shots/ip/'
sheet(sorted(glob.glob(P+'A*_q.png')),'sheets/phone_scenes.jpg',6,260)
sheet(sorted(glob.glob(P+'B*.png')),'sheets/phone_flow.jpg',6,260)
sheet(sorted(glob.glob(P+'C*.png')),'sheets/phone_park.jpg',8,230)

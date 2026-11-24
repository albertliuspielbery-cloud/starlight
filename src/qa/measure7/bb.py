import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB');ks=sys.argv[2].split(',');S=int(sys.argv[3]) if len(sys.argv)>3 else 300
for i,k in enumerate(ks):
  c=im.crop((i*S,0,i*S+S,S));px=c.load();xs=[];ys=[]
  for y in range(S):
    for x in range(S):
      r,g,b=px[x,y]
      if not (g>200 and r<60 and b<60): xs.append(x);ys.append(y)
  print(k,'x',round(min(xs)*100/S,2),round((max(xs)+1)*100/S,2),'y',round(min(ys)*100/S,2),round((max(ys)+1)*100/S,2))

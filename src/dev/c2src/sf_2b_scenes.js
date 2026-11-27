/* ===== park49 河濱自行車道和路口 ===== */
const tree=(K,x,y,s=1)=>G(x,y,`<g transform="scale(${s})">${R(-5,-30,10,30,'#B8865A',3)+C(0,-44,22,K.lg('#8FE08A','#5ABF6A'))+C(-14,-36,14,'#6FCF7A')+C(14,-36,14,'#6FCF7A')+HI(-6,-54,7,4,.45)}</g>`);
SC.park49={nm:'河濱自行車道和路口',
 bg:K=>{let s=R(0,0,800,120,K.lg('#BFEBFF','#E9F9FF'))+C(700,46,22,'#FFE27A');
  s+=P('M0 80 Q60 60 120 78 Q180 58 250 80 L250 120 L0 120Z','#B8E0C8')+P('M500 84 Q580 56 660 82 Q720 64 800 86 L800 120 L500 120Z','#B8E0C8');
  s+=R(0,110,800,40,K.lg('#8FD8F8','#5FC0EC'))+PL('M30 128 q16 -6 32 0 M200 136 q16 -6 32 0 M420 126 q16 -6 32 0 M640 134 q16 -6 32 0','#fff',2.4,'opacity=".7"');
  s+=R(0,150,800,44,'#A8E09A')+R(0,194,800,96,K.lg('#F6B8A0','#EDA48A'))+PL('M0 242 L800 242','#fff',3,'stroke-dasharray="22 18"');
  s+=G(460,236,PL('M-14 0 a7 7 0 1 0 0.1 0 M14 0 a7 7 0 1 0 0.1 0 M-14 0 L-4 0 L4 -12 L-8 -12 M4 -12 L14 0','#fff',2.2,'opacity=".75"'));
  s+=R(0,290,800,34,'#A8E09A')+tree(K,40,300,.9)+tree(K,250,300,.8)+tree(K,770,300,.9);
  s+=R(0,322,800,26,'#E8E2F0')+R(0,348,800,120,K.lg('#8A8AA8','#77779A'))+R(0,468,800,32,'#E8E2F0');
  for(let y=356;y<462;y+=18)s+=R(420,y,120,10,'#FFFFFF',2,'opacity=".92"');
  s+=PL('M0 408 L380 408 M580 408 L800 408','#FFE27A',4,'stroke-dasharray="26 20"');
  s+=G(600,322,R(-4,-80,8,80,'#6A6A8A',3)+R(-12,-112,24,40,'#4A4A6A',6)+C(0,-102,7,'#8A3A4A')+C(0,-84,7,'#6FE3A8'));
  s+=car(K,130,440,'#9AC8FF');
  return s},
 items:[
  {id:'helmet',k:'bad',x:160,y:236,r:56,nm:'安全帽沒扣',why:'安全帽要戴正，扣好扣環。鬆鬆的不算喔！',
   bad:K=>kidBike(K,160,286,{hat:'helmet',strap:false,shirt:'#FFB0D0'}),good:K=>kidBike(K,160,286,{hat:'helmet',strap:true,shirt:'#FFB0D0'})},
  {id:'zebra',k:'bad',x:480,y:412,r:58,nm:'騎車過斑馬線',why:'過馬路要下車，牽著腳踏車走。',
   bad:K=>kidBike(K,480,446,{hat:'helmet',girl:false,shirt:'#8FD0FF',bc:'#7ACF9A'}),
   good:K=>bike(K,500,446,'#7ACF9A')+person(K,462,448,{s:.8,pose:'walk',girl:false,shirt:'#8FD0FF',hat:'helmet',hc:'#7ACF9A'})},
  {id:'phone',k:'bad',x:660,y:440,r:56,nm:'邊過馬路邊滑手機',why:'過馬路不滑手機，頭抬起來，眼睛看車子。',
   bad:K=>person(K,660,492,{s:.8,pose:'phone',shirt:'#FFD06A',mouth:'o',hand:phoneS()}),
   good:K=>person(K,660,492,{s:.8,pose:'point',shirt:'#FFD06A',flip:true})},
  {id:'ear',k:'bad',x:300,y:440,r:56,nm:'戴耳機過馬路',why:'過馬路不戴耳機聽音樂，耳朵要聽車子的聲音。',
   bad:K=>person(K,300,492,{s:.8,pose:'walk',girl:false,shirt:'#B8A8FF',ear:true}),
   good:K=>person(K,300,492,{s:.8,pose:'stand',girl:false,shirt:'#B8A8FF',earNeck:true})},
  {id:'nohand',k:'bad',hard:1,x:580,y:236,r:54,nm:'放手騎車',why:'騎車兩手要握好，不放手騎。',
   bad:K=>G(580,286,bike(K,0,0,'#FFB86A')+person(K,-8,-12,{s:.82,pose:'up',shirt:'#9FE0A0',hat:'helmet',hc:'#FFB86A'})),
   good:K=>kidBike(K,580,286,{hat:'helmet',hc:'#FFB86A',shirt:'#9FE0A0',bc:'#FFB86A'})},
  {id:'bell',k:'ok',x:370,y:236,r:52,why:'按鈴說「借過」，讓走路的人先走，這樣很好喔！',art:K=>kidBike(K,370,286,{hat:'helmet',hc:'#B88AFF',shirt:'#FFE07A',bc:'#B88AFF',bell:true})+TX(408,214,'叮！','16','#B86A00')},
  {id:'adult',k:'ok',x:720,y:230,r:56,why:'大人陪著，在自行車道上騎車，這樣很好喔！',art:K=>G(720,286,bike(K,0,0,'#7FB8FF')+person(K,-8,-12,{adult:true,s:.62,pose:'bike',girl:false,shirt:'#7FB8FF',hat:'helmet',hc:'#7FB8FF'}))}
 ]};
/* ===== 第 50 章：主角的家（客廳、廚房、浴室、陽台） ===== */
const wallFloor=(K,c1,c2,f1,f2,fy=380)=>R(0,0,800,fy,K.lg(c1,c2))+R(0,fy,800,500-fy,K.lg(f1,f2))+R(0,fy-6,800,8,dk(c2,.1));
const windowW=(K,x,y,w,h)=>R(x-8,y-8,w+16,h+16,'#FFFFFF',8)+R(x,y,w,h,K.lg('#BFE9FF','#E6F7FF'),4)+Ln(x+w/2,y,x+w/2,y+h,'#fff',5)+Ln(x,y+h/2,x+w,y+h/2,'#fff',5)+HI(x+w*.25,y+h*.2,w*.12,h*.06,.7);
SC.home50a={nm:'客廳',
 bg:K=>{let s=wallFloor(K,'#FFF4E4','#FCE6CC','#E8C8A0','#D8B088');
  s+=windowW(K,48,70,150,190)+P('M30 56 L76 56 L66 280 L26 280Z','#FF9EC4')+P('M170 56 L216 56 L222 280 L180 280Z','#FF9EC4')+R(22,50,200,10,'#C88A9A',4);
  s+=R(300,300,240,62,K.lg('#A8C8FF','#88A8F0'),18)+R(290,272,260,46,K.lg('#B8D4FF','#98B8F8'),20)+R(286,300,26,80,'#88A8F0',12)+R(528,300,26,80,'#88A8F0',12)+E(360,296,24,10,'#FFE07A')+E(470,296,24,10,'#FFB0D0');
  s+=R(310,380,10,14,'#8A6A9A',2)+R(520,380,10,14,'#8A6A9A',2);
  s+=R(690,170,86,210,K.lg('#D8A878','#C08A58'),6)+R(698,178,70,196,'#E8B888',4)+C(756,280,5,'#FFD24D')+TX(733,160,'大門','14','#8A5A3A');
  s+=R(612,318,22,30,'#FFFFFF',4)+C(619,328,2,'#8A8AA8')+C(627,328,2,'#8A8AA8')+R(621,336,2,5,'#8A8AA8');
  s+=E(600,440,60,10,'#000','opacity=".05"');
  return s},
 items:[
  {id:'chair',k:'bad',x:124,y:300,r:62,nm:'窗邊的椅子',why:'窗戶旁邊不放椅子，也不爬窗戶。',
   bad:K=>chair(K,124,392,'#F2B880')+person(K,126,336,{s:.74,pose:'reach',shirt:'#FFD06A',flip:true}),
   good:K=>R(110,252,30,10,'#8A8AA8',3)+TX(124,248,'鎖','12','#5A5A7A')},
  {id:'cord',k:'bad',x:246,y:290,r:56,nm:'拉著窗簾繩子玩',why:'窗簾的繩子要綁高高的，不拿來玩，也不繞在脖子上。',
   bad:K=>PL('M214 70 L216 250 Q222 276 238 290','#C88A9A',3)+person(K,256,380,{s:.74,pose:'reach',girl:false,shirt:'#8FD0FF',flip:true}),
   good:K=>PL('M214 70 L216 120 Q226 132 216 140 Q206 132 216 120','#C88A9A',3)+C(216,118,4,'#FFD24D')},
  {id:'bag',k:'bad',x:420,y:296,r:58,nm:'拿塑膠袋要套頭玩',why:'塑膠袋不套在頭上玩，用完交給大人收好。',
   bad:K=>person(K,420,350,{s:.72,pose:'up',shirt:'#FFB0D0',mouth:'open'})+G(420,276,P('M-20 -14 Q-22 -34 0 -36 Q22 -34 20 -14 L16 8 H-16Z','#E8F4FF','opacity=".85"')+PL('M-16 8 L16 8','#BFD8F0',2)+HI(-8,-22,3,7,.8)),
   good:K=>person(K,420,350,{s:.72,pose:'sit',shirt:'#FFB0D0'})},
  {id:'plug',k:'bad',x:604,y:370,r:58,nm:'濕的手要碰插座',why:'插座不碰；手濕濕的，也不碰電器。',
   bad:K=>person(K,592,440,{s:.8,pose:'reach',shirt:'#9FE0A0',wet:true})+cup(560,440,'#7FD0FF'),
   good:K=>R(611,318,24,32,'#FFE07A',5)+person(K,592,440,{s:.8,pose:'hold',shirt:'#9FE0A0'})+R(578,384,28,16,'#FFFFFF',4)},
  {id:'door',k:'bad',hard:1,x:730,y:290,r:58,nm:'自己去開門',why:'有人按門鈴，小朋友不自己開門，先叫大人來。',
   bad:K=>P('M698 178 L740 190 L740 366 L698 374Z','#E8B888')+R(740,186,30,190,'#FFF6E0')+person(K,722,440,{s:.78,pose:'reach',girl:false,shirt:'#FFB86A'})+TX(650,200,'叮咚！','15','#C85A8A'),
   good:K=>R(698,178,70,196,'#E8B888',4)+C(756,280,5,'#FFD24D')+R(744,240,20,4,'#8A8AA8',2)+person(K,690,440,{s:.78,pose:'phone',girl:false,shirt:'#FFB86A',hand:phoneS()})},
  {id:'map',k:'ok',x:420,y:150,r:58,why:'牆上貼著我家的逃生路線圖，全家一起看過，這樣很好喔！',
   art:K=>G(420,150,R(-60,-46,120,92,'#FFFFFF',6)+R(-52,-38,104,76,'#F4F8FF',3)+PL('M-48 -30 H48 V30 H-48Z M-4 -30 V0 H48 M-48 6 H-10','#9AA8C8',2.5)+PL('M-26 -14 L-26 18 L-44 18','#3FCB84',4)+P('M-44 18 l8 -6 v12Z','#3FCB84')+C(-26,-14,5,'#FF6A8A')+R(-58,-56,116,14,'#FFD24D',4)+TX(0,-45,'我家的逃生路線','11','#8A5A00'))},
  {id:'toys',k:'ok',x:480,y:450,r:46,why:'玩具收好了，走路不會絆倒，這樣很好喔！',art:K=>box(K,480,478,72,40,'#B8E0FF')+teddy(470,446,.7)+C(496,440,8,'#FF8A8A')}
 ]};
SC.home50b={nm:'廚房',
 bg:K=>{let s=wallFloor(K,'#EFFFF6','#DDF6EA','#F2E6D2','#E2D2B8',470);
  for(let x=0;x<800;x+=40)for(let y=150;y<290;y+=40)s+=R(x+2,y+2,36,36,'#FFFFFF',4,'opacity=".35"');
  s+=R(40,30,340,104,K.lg('#FFD8A8','#F2BE88'),8)+[60,170,280].map(x=>R(x,40,90,84,'#FFE4C0',6)+C(x+78,84,3.4,'#B8865A')).join('');
  s+=R(30,290,630,12,'#E8E8F4',4)+R(36,302,618,168,K.lg('#FFE0B8','#F2C898'),6)+[50,200,350,500].map(x=>R(x,314,136,146,'#FFEACC',6)+C(x+68,330,3.4,'#B8865A')).join('');
  s+=R(180,272,120,22,'#C8D8F0',8)+Ln(240,250,240,272,'#A8B8D8',5)+PL('M240 250 Q240 240 252 240','#A8B8D8',5);
  s+=R(420,270,150,22,'#5A5A7A',6)+E(460,272,22,5,'#3A3A4A')+E(530,272,22,5,'#3A3A4A')+C(570,320,7,'#E0E0EC')+C(590,320,7,'#E0E0EC');
  s+=R(676,110,110,360,K.lg('#F4F8FF','#DCE4F4'),12)+Ln(676,220,786,220,'#C8D0E4',3)+R(690,160,8,40,'#B8C0D8',3)+R(690,240,8,60,'#B8C0D8',3);
  s+=R(60,404,150,10,'#C8A0E0',3)+R(68,414,8,56,'#A880C8',2)+R(194,414,8,56,'#A880C8',2);
  return s},
 items:[
  {id:'cleaner',k:'bad',x:136,y:376,r:58,nm:'清潔劑放在飲料旁',why:'清潔劑不是飲料，要放在高高的櫃子裡，不碰。',
   bad:K=>bottle(K,96,404,'#FFB86A')+cup(126,404,'#FF9EC4')+spray(K,160,404,'#B88AFF')+person(K,232,470,{s:.78,pose:'reach',shirt:'#FFD06A',flip:true}),
   good:K=>bottle(K,110,404,'#FFB86A')+cup(146,404,'#FF9EC4')+G(105,116,spray(K,0,0,'#B88AFF'))+R(88,60,50,4,'#B8865A',2)},
  {id:'pot',k:'bad',x:452,y:262,r:56,nm:'鍋柄朝外',why:'熱鍋、熱湯不碰！鍋柄要轉到裡面。',
   bad:K=>P('M440 268 h60 v-30 q0 -8 -8 -8 h-44 q-8 0 -8 8Z',K.lg('#E8E8F4','#B8C0D8'))+R(386,240,56,8,'#6A6A8A',4)+PL('M456 222 q-6 -10 0 -18 M472 222 q-6 -10 0 -18','#fff',3,'opacity=".8"')+person(K,392,470,{s:.8,pose:'up',girl:false,shirt:'#8FD0FF'}),
   good:K=>P('M440 268 h60 v-30 q0 -8 -8 -8 h-44 q-8 0 -8 8Z',K.lg('#E8E8F4','#B8C0D8'))+R(498,240,40,8,'#6A6A8A',4)+PL('M456 222 q-6 -10 0 -18 M472 222 q-6 -10 0 -18','#fff',3,'opacity=".8"')},
  {id:'pills',k:'bad',x:330,y:266,r:50,nm:'藥放在桌上像糖果',why:'藥不是糖果，顏色再漂亮也不吃，交給大人收好。',
   bad:K=>R(318,262,20,28,'#FFFFFF',5)+R(316,256,24,8,'#FF8AB8',3)+['#FF8A8A','#FFD24D','#7FD0FF','#9FE0A0','#B88AFF'].map((c,i)=>E(296+i*16+(i%2)*4,286-(i%2)*4,6,4,c)).join(''),
   good:K=>G(330,286,R(-22,-26,44,26,'#FFFFFF',5)+R(-4,-22,8,18,'#FF6A8A',1)+R(-9,-17,18,8,'#FF6A8A',1))},
  {id:'gas',k:'bad',x:624,y:390,r:56,nm:'聞到瓦斯味',why:'聞到怪怪的瓦斯味，不碰開關，馬上告訴大人。',
   bad:K=>PL('M580 326 q10 -10 20 0 q10 10 20 0 M584 344 q10 -10 20 0 q10 10 20 0','#9AD07A',3,'opacity=".9"')+person(K,630,470,{s:.8,pose:'cover',shirt:'#FFB0D0',flip:true}),
   good:K=>person(K,630,470,{s:.8,pose:'wave',shirt:'#FFB0D0',flip:true})+G(600,362,R(-40,-18,80,26,'#FFFFFF',10)+TX(0,0,'告訴大人！','13','#C8506A'))},
  {id:'sos',k:'ok',x:730,y:170,r:44,why:'冰箱上貼著緊急電話，這樣很好喔！',art:K=>G(730,168,R(-30,-34,60,64,'#FFFBE0',4)+C(0,-36,5,'#FF6A8A')+TX(0,-10,'119','17','#E04A4A','font-family="var(--latin,sans-serif)"')+TX(0,16,'110','17','#3A5AB8','font-family="var(--latin,sans-serif)"'))},
  {id:'sink',k:'ok',x:240,y:256,r:40,why:'用完的水龍頭關好了，這樣很好喔！',art:K=>''}
 ]};

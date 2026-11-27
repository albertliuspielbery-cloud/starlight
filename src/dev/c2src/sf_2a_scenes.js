/* ---------- 找危險大圖：場景（800×500） ---------- */
// item：{id,k:'bad'|'ok',x,y,r（點擊範圍）,bad(K),good(K),art(K),why,nm,hard}
const bike=(K,x,y,c='#FF7AA8',o={})=>G(x,y,(()=>{const w=(cx)=>C(cx,-17,17,'none','stroke="#4A4A6A" stroke-width="4"')+C(cx,-17,4,'#9A9AB8')+Ln(cx,-31,cx,-3,'#B8B8D0',1.4)+Ln(cx-14,-17,cx+14,-17,'#B8B8D0',1.4);
 return w(-28)+w(28)+PL('M-28 -17 L-6 -17 L12 -44 L-14 -44 Z M-6 -17 L-14 -48 M12 -44 L28 -17',c,4.6)+R(-22,-54,18,6,'#5A4A6A',3)+PL('M12 -44 L14 -56 L24 -58',dk(c,.2),4)+(o.bell?C(22,-60,4.5,'#FFD24D')+HI(21,-62,1.5,1,.7):'')})());
const car=(K,x,y,c='#7FB8FF',o={})=>G(x,y,P('M-70 -18 Q-72 -44 -50 -46 L-34 -72 Q-30 -78 -20 -78 L28 -78 Q38 -78 44 -70 L58 -46 Q74 -44 72 -18Z',K.lg(lt(c,.3),c))+P('M-28 -70 L-40 -48 L-4 -48 L-4 -70Z M4 -70 L4 -48 L48 -48 L36 -70Z','#DFF4FF')+HI(-20,-64,8,3,.7)+C(-40,-14,14,'#4A4A6A')+C(-40,-14,6,'#B8B8D0')+C(40,-14,14,'#4A4A6A')+C(40,-14,6,'#B8B8D0')+E(66,-34,5,4,'#FFF2A8')+(o.open?P('M-4 -70 L-4 -20 L-36 -14 L-34 -64Z',lt(c,.15)):''));
const kidBike=(K,x,y,o={})=>{const kb=Object.assign({pose:'bike',s:.82},o);return G(x,y,bike(K,0,0,o.bc||'#FF7AA8',{bell:o.bell})+person(K,-8,-12,kb))};
const exitSign=(x,y)=>G(x,y,R(-26,-14,52,28,'#2FB86A',5)+C(-11,-4,3.4,'#fff')+PL('M-11 0 L-13 7 M-12 2 L-6 5 M-12 2 L-17 5 M-13 7 L-9 11 M-13 7 L-17 11','#fff',2.2)+P('M2 -6 h12 v-4 l8 10 l-8 10 v-4 h-12Z','#fff'));
const SC={};
/* ===== fire46 消防局的逃生演練屋 ===== */
SC.fire46={nm:'消防局的逃生演練屋',
 bg:K=>{let s=R(0,0,800,500,K.lg('#FFE9DC','#F7D3C3'))+R(0,0,800,40,'#E86A6A')+R(0,40,800,6,'#FFD24D');
  s+=R(0,410,800,90,K.lg('#D8C8E8','#C4B0DA'));
  // 房子
  s+=P('M140 74 L430 26 L730 74Z',K.lg('#FFB28A','#F28A6A'))+R(150,70,572,342,'#E8D8F4',6);
  s+=R(160,80,552,152,K.lg('#FBF6FF','#F0E6FF'),4)+R(160,242,552,166,K.lg('#FFFBF2','#FFF0DA'),4)+R(150,232,572,10,'#C9A0D8',2);
  // 樓梯（右邊）
  for(let i=0;i<8;i++)s+=R(600+i*14,400-i*21,122-i*14,21,i%2?'#E2C8A0':'#EBD4AE');
  s+=PL('M596 400 L712 236','#B8906A',4)+TX(650,226,'樓梯','15','#8A5A3A');
  // 二樓：牆上指示燈、窗
  s+=exitSign(640,110)+R(420,98,70,50,'#CFEFFF',6)+Ln(455,98,455,148,'#fff',3)+HI(436,110,8,4,.7);
  // 小小的火和一點煙（演練）
  s+=R(560,206,26,26,'#B8B8D0',4)+flame(566,208,.7)+smoke(390,96,.9,.45)+smoke(470,112,.8,.4)+smoke(520,92,.7,.35);
  // 一樓：門、桌子
  s+=R(160,318,58,90,'#8FD0A8',4)+R(166,324,46,84,'#BFEBD0',3)+C(204,366,3,'#5A8A6A')+TX(189,312,'出口','14','#2F8A5A');
  s+=R(290,350,90,10,'#D8A06A',3)+R(296,360,8,48,'#C08A58',2)+R(366,360,8,48,'#C08A58',2);
  // 外面：消防車的頭
  s+=P('M0 300 L60 300 Q80 300 84 320 L90 400 L0 400Z',K.lg('#FF6A6A','#E04040'))+R(4,312,50,34,'#CFEFFF',4)+C(40,404,16,'#4A4A6A')+C(40,404,6,'#B8B8D0')+R(0,286,40,14,'#FFD24D',3);
  return s},
 items:[
  {id:'closet',k:'bad',x:335,y:170,r:60,nm:'躲在衣櫃裡',why:'不可以躲在衣櫃裡！要趕快往外、往下逃。',
   bad:K=>R(298,108,76,124,K.lg('#E8B888','#D49A68'),6)+R(304,114,32,112,'#3A2A4A',3)+person(K,322,226,{s:.78,pose:'hold',shirt:'#FFB0D0'})+R(338,114,32,112,'#E2AE7E',3)+P('M304 114 L282 120 L282 226 L304 226Z','#E2AE7E')+C(344,170,3,'#8A5A3A'),
   good:K=>R(298,108,76,124,K.lg('#E8B888','#D49A68'),6)+R(304,114,32,112,'#E2AE7E',3)+R(338,114,32,112,'#E2AE7E',3)+C(330,170,3,'#8A5A3A')+C(342,170,3,'#8A5A3A')+HI(316,124,6,3,.5)},
  {id:'lift',k:'bad',x:212,y:172,r:58,nm:'搭電梯',why:'失火了不搭電梯，要走樓梯往下逃。',
   bad:K=>R(172,104,74,128,'#C8D4E8',4)+R(176,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(210,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(250,150,14,26,'#9AA8C8',3)+C(257,157,3.4,'#FFD24D')+C(257,169,3.4,'#FFE9A0')+person(K,232,228,{s:.78,pose:'reach',girl:false,shirt:'#8FD0FF'}),
   good:K=>R(172,104,74,128,'#C8D4E8',4)+R(176,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(210,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(250,150,14,26,'#9AA8C8',3)+R(182,140,56,34,'#FFF',4)+TX(210,154,'失火','12','#E04A4A')+TX(210,168,'不搭電梯','11','#E04A4A')},
  {id:'smoke',k:'bad',x:500,y:180,r:60,nm:'站著走進煙裡',why:'有煙的時候，壓低身體、沿著牆走，不要站直。',
   bad:K=>person(K,500,230,{s:.8,pose:'walk',shirt:'#FFD06A'})+smoke(470,150,.9,.6),
   good:K=>person(K,520,230,{s:.8,pose:'low',shirt:'#FFD06A',flip:true})+smoke(470,150,.9,.45)},
  {id:'teddy',k:'bad',x:470,y:350,r:58,nm:'回去拿玩具',why:'不回去拿玩具！人先逃出去，最重要。',
   bad:K=>teddy(430,404,1.1)+person(K,480,404,{s:.8,pose:'reach',shirt:'#B8A8FF',flip:true}),
   good:K=>teddy(430,404,1.1)+P('M452 360 q6 -8 12 0 q6 -8 12 0 q0 10 -12 16 q-12 -6 -12 -16Z','#FF9EC4','opacity=".8"')},
  {id:'lighter',k:'bad',hard:1,x:336,y:322,r:52,nm:'玩打火機',why:'打火機、火柴不是玩具，不玩，交給大人。',
   bad:K=>person(K,336,404,{s:.72,pose:'hold',girl:false,shirt:'#7FE0C0'})+G(336,360,R(-5,-10,10,16,'#FF6A8A',2)+R(-4,-14,8,5,'#C8C8D8',1)),
   good:K=>G(336,342,R(-26,-8,52,10,'#C8A0E0',3)+TX(0,-12,'交給大人','12','#8A5AAA'))},
  {id:'fireman',k:'ok',x:96,y:368,r:62,why:'消防員戴著面罩，不可怕。看到他，要走向他喔！',art:K=>person(K,100,452,{adult:true,s:.82,fire:true,hat:'fire',mask:true,shirt:'#E0A848',pants:'#C08A3A',girl:false,pose:'wave'})},
  {id:'exit',k:'ok',x:640,y:110,r:44,why:'綠色的逃生指示燈，照著它走就對了！',art:K=>''}
 ]};
/* ===== pool48 社區游泳池 ===== */
SC.pool48={nm:'社區游泳池',
 bg:K=>{let s=R(0,0,800,140,K.lg('#BFEFFF','#E8FAFF'))+C(90,50,26,'#FFE27A')+HI(84,44,8,5,.6);
  s+=R(0,120,800,40,'#FFFFFF')+(()=>{let f='';for(let x=10;x<800;x+=26)f+=R(x,104,8,40,'#F0F4FF',3);return f})();
  s+=R(0,150,800,350,K.lg('#FBEFDF','#F2E0C8'));
  s+=R(140,232,560,214,K.lg('#9FE6FF','#4FB8EC',true),18)+R(140,232,560,214,K.lg('#ffffff00','#2A88C833'),18);
  s+=R(146,238,548,8,'#fff',4,'opacity=".45"');
  for(let x=160;x<690;x+=22){s+=C(x,300,4,(x/22|0)%2?'#FF7A7A':'#fff')+C(x,375,4,(x/22|0)%2?'#FFD24D':'#fff')}
  s+=G(196,214,R(-36,-14,72,24,'#fff',6)+TX(0,4,'淺水區','15','#3A8ACA'))+G(640,214,R(-36,-14,72,24,'#fff',6)+TX(0,4,'深水區','15','#2A5A9A'));
  // 救生員高椅
  s+=PL('M716 236 L726 120 M770 236 L760 120 M720 190 L766 190','#FFFFFF',6)+R(712,112,64,12,'#FF8A8A',4);
  // 蓮蓬頭
  s+=PL('M40 300 L40 150 Q40 136 56 136 L70 136','#B8C0D8',6)+E(72,142,12,6,'#C8D0E4');
  s+=E(400,494,120,8,'#7FD0FF','opacity=".25"');
  return s},
 items:[
  {id:'run',k:'bad',x:420,y:440,r:56,nm:'池邊奔跑',why:'池邊地板滑滑的，不奔跑，慢慢走。',
   bad:K=>E(380,488,22,5,'#7FD0FF','opacity=".7"')+E(456,492,18,4,'#7FD0FF','opacity=".7"')+person(K,420,486,{s:.78,pose:'run',shirt:'#FF8AB8',hat:'cap'}),
   good:K=>E(380,488,22,5,'#7FD0FF','opacity=".5"')+person(K,420,486,{s:.78,pose:'stand',shirt:'#FF8AB8',hat:'cap'})},
  {id:'push',k:'bad',x:330,y:182,r:58,nm:'推人',why:'不推人！在池邊推人，很危險。',
   bad:K=>person(K,306,228,{s:.74,pose:'push',girl:false,shirt:'#7FE0C0',hat:'cap',hc:'#FFB86A'})+person(K,350,226,{s:.74,pose:'up',shirt:'#FFB0D0',hat:'cap',mouth:'o',flip:true}),
   good:K=>person(K,306,228,{s:.74,pose:'stand',girl:false,shirt:'#7FE0C0',hat:'cap',hc:'#FFB86A'})+person(K,350,228,{s:.74,pose:'wave',shirt:'#FFB0D0',hat:'cap',flip:true})},
  {id:'jump',k:'bad',x:540,y:186,r:58,nm:'跳水',why:'不跳水！從樓梯慢慢下水。',
   bad:K=>person(K,540,196,{s:.74,pose:'up',girl:false,shirt:'#FFD06A',hat:'cap',hc:'#8AE07A'})+E(540,246,26,6,'#fff','opacity=".7"'),
   good:K=>PL('M566 228 L566 270 M590 228 L590 270 M566 242 L590 242 M566 258 L590 258','#E8EEF8',4.5)+person(K,540,228,{s:.74,pose:'point',girl:false,shirt:'#FFD06A',hat:'cap',hc:'#8AE07A'})},
  {id:'deep',k:'bad',x:620,y:350,r:62,nm:'一個人在深水區',why:'只在站得到的淺水區，大人要在旁邊。游泳圈是玩具，不能代替大人。',
   bad:K=>G(620,360,person(K,0,30,{s:.66,pose:'up',shirt:'#B8A8FF',hat:'cap',hc:'#FF8AB8'})+R(-30,10,60,26,'#4FB8EC',12)+E(0,10,32,10,'#FF9A6A')+E(0,9,19,5,'#4FB8EC')+HI(-16,6,6,2,.6)),
   good:K=>G(232,348,person(K,0,24,{s:.62,pose:'wave',shirt:'#B8A8FF',hat:'cap',hc:'#FF8AB8'})+R(-24,8,48,22,'#8EDCFA',10))+G(290,350,person(K,0,48,{adult:true,s:.62,pose:'wave',shirt:'#7FB8FF',girl:false})+R(-30,16,60,40,'#8EDCFA',12))},
  {id:'guard',k:'ok',x:744,y:124,r:56,why:'救生員吹哨子的時候，大家停下來聽，這樣很好喔！',art:K=>an('otter48',744,114,70)+C(760,92,4,'#FFD24D')},
  {id:'shower',k:'ok',x:60,y:250,r:56,why:'下水前先沖水、做暖身，這樣很好喔！',art:K=>PL('M66 150 l-6 20 M72 150 l0 22 M78 150 l6 20','#7FD0FF',2.4)+person(K,64,300,{s:.72,pose:'up',girl:false,shirt:'#FFB86A',hat:'cap',hc:'#7FD0FF'})}
 ]};

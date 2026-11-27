/* ================= 第八季第 10 關大冒險關（m8si_quest8.js）—— 2026-11-28 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 題型 quest8:<章>（46～50）：一題就是一整關，4～6 步，一步一個動作（選一個、點畫面上的地方、照順序點），2～3 分鐘。
 * 完成時呼叫 right() → 原本第 10 關流程（過關 → 王子的信／章節獎品 → 破關小劇場 → chend；第 50 章接季完結）。這裡不改那些流程。
 * 沒有輸、不扣分、不計時：選錯彈回、說明，再試；第二次錯發光。角色只淡入、上下輕彈，不放大縮小。
 * 美術、台詞工具來自 m8sf_safe8.js（window.__s8s）；B 的角色（CH46…）有就用（AN 裡有 firedog46 等），沒有用現有動物。
 * 台詞在 lines/s8_safe.tsv（S8S_q…）。說明檔 dev/types8_safe.md。 */
(function(){if(typeof window.__ev!=='function'){console.log('m8si: 找不到 __ev');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined'||!window.__s8s){console.log('m8si: 沒有 m8sf');return}
const X=window.__s8s;const {LN,L,SC,kit,person,an,smoke,flame,okSticker,box,teddy,tree,bike,car,exitSign,phoneS,R,C,E,P,Ln,PL,G,HI,TX,lt,dk,avail,SAY,PS2,readOpts,okSfx,popSfx,esc,RM,byD,mountDanger}=X;const PS=PS2;
Object.assign(LN,{
 q_done:'大冒險完成！你好勇敢、好聰明！',q_badge:'安全小隊員',q_fin_hd:'大冒險完成！',q_glow:'我幫你，看發光的地方！',q_again:'再想一想喔！',
 // 46
 q46_1:'鈴鈴鈴！警鈴響了！你要怎麼做？',q46_1o1:'大聲喊「失火了！」',q46_1o2:'躲進衣櫃',q46_1o3:'先收玩具',q46_1a:'對！大聲喊「失火了！」，讓大家都知道。',q46_1w:'不躲起來，也不收玩具，先大聲喊「失火了！」',
 q46_2:'走廊有一點煙了，要怎麼走？',q46_2o1:'壓低身體，沿著牆走',q46_2o2:'站直直跑過去',q46_2a:'對！有煙才壓低身體，沿著牆走。',q46_2w:'煙會往上飄，要壓低身體、沿著牆走。',
 q46_3:'要下樓了！點一點，要走哪裡？',q46_3a:'對！失火不搭電梯，走樓梯往下。',q46_3w:'失火的時候電梯可能會停，不搭電梯！',
 q46_4:'一層一層往下走！點樓梯三下。',q46_4a:'到一樓了！從出口出去！',
 q46_5:'逃出來了！要去哪裡？',q46_5o1:'全家約好的集合點',q46_5o2:'回去拿玩具',q46_5a:'對！到約好的地方集合，不回去拿東西。',q46_5w:'逃出來就不回去，玩具沒關係。',
 q46_6:'大家都到了嗎？點一點，數一數！',q46_6a:'大家都到了！逃生演練成功！',
 q46_7:'大人在打一一九，你也練習說說看！照順序點：在哪裡、什麼事、我是誰。',q46_7o1:'在我家',q46_7o2:'失火了！',q46_7o3:'我是小朋友',q46_7a:'說得好！等對方說「好，我們馬上到」，才掛電話。',q46_7w:'先說在哪裡，再說什麼事，最後說我是誰。',
 q46_fin:'逃生演練全部做對了！你是小小逃生高手！',
 // 47
 q47_1:'路上有一個錢包，怎麼辦？',q47_1o1:'交給黑熊警察',q47_1o2:'放進自己的口袋',q47_1a:'對！撿到東西交給警察。黑熊警察說：謝謝你！',q47_1w:'撿到的東西不是我們的，要交給警察或大人。',
 q47_2:'一位很親切的叔叔說：「我認識你爸媽，上車，我載你回家。」',q47_2o1:'說「不要」，問通關密語',q47_2o2:'上車',q47_2a:'他說不出通關密語，所以不跟他走！',q47_2w:'說認識爸媽也不行！爸媽沒說可以，就不上車。',
 q47_3:'他還在叫你，快跑！點一點，要跑去哪裡？',q47_3a:'對！跑到人多、明亮的店裡，請店員幫忙。',q47_3w:'沒有人的小巷子不去，要跑到人多、明亮的地方。',
 q47_4:'有個不熟的人說：「給你糖果，很好吃喔！」',q47_4o1:'說「不要，謝謝」',q47_4o2:'拿來吃',q47_4a:'對！不熟的人給的糖果，不拿、不吃。',q47_4w:'不熟的人給的東西，不拿、不吃。',
 q47_5:'到家了，媽媽在洗澡，不能來開門。叮咚！有人按門鈴：「送東西來了，開門喔！」',q47_5o1:'不開門，告訴媽媽',q47_5o2:'自己開門',q47_5a:'對！小朋友不自己開門，先告訴媽媽。',q47_5w:'有人按門鈴，小朋友不自己開門，先告訴媽媽。',
 q47_fin:'你平平安安回到家了！你會分辨誰可以相信！',
 // 48
 q48_1:'下水前先暖身！三個動作都點一點，跟著動一動。',q48_1o1:'手臂轉一轉',q48_1o2:'腰扭一扭',q48_1o3:'腳踢一踢',q48_1a:'暖身好了！',
 q48_2:'再來，先沖水！點一下蓮蓬頭。',q48_2a:'沖好水了，身體準備好了！',
 q48_3:'要去哪裡玩水呢？點一點。',q48_3a:'對！在站得到的淺水區，大人在旁邊。',q48_3w:'深水區站不到，小朋友不去。',
 q48_4:'嗶——救生員吹哨子了！',q48_4o1:'停下來聽',q48_4o2:'繼續玩',q48_4a:'對！哨子響了，停下來聽救生員說。',q48_4w:'聽到哨子，要停下來聽喔。',
 q48_5:'好朋友說：「我們來跳水、推來推去！」',q48_5o1:'不跳水、不推人',q48_5o2:'好啊，一起跳',q48_5a:'對！不跳水、不推人，大家都安全。',q48_5w:'跳水、推人都很危險，不可以。',
 q48_6:'轟隆隆！打雷了！',q48_6o1:'馬上上岸',q48_6o2:'繼續游',q48_6a:'對！打雷了，馬上上岸。',q48_6w:'打雷的時候不待在水裡，要馬上上岸。',
 q48_fin:'游泳池的規矩，你全部都會了！',
 // 49
 q49_1:'戴上安全帽！點一下扣環，扣好它。',q49_1a:'扣好了！安全帽戴正、扣好，鬆鬆的不算。',
 q49_2:'騎之前先檢查！煞車、鈴鐺、輪胎，都點一點。',q49_2a:'都檢查好了，出發！',
 q49_3:'要騎在哪裡呢？點一點。',q49_3a:'對！騎在自行車道，大人陪著。',q49_3w:'大馬路車子很多，小朋友不騎上去。',
 q49_4:'前面有人在走路，怎麼辦？',q49_4o1:'按鈴說「借過」',q49_4o2:'衝過去',q49_4a:'叮叮！借過！讓走路的人先走。',q49_4w:'不衝過去，按鈴說「借過」。',
 q49_5:'到路口了！要怎麼過馬路？',q49_5o1:'下車，牽著腳踏車走',q49_5o2:'直接騎過去',q49_5a:'對！過馬路下車牽著走。',q49_5w:'過馬路要下車，牽著腳踏車走。',
 q49_6:'過馬路前，把手機收起來、耳機拿下來！都點一點。',q49_6a:'頭抬起來，眼睛看車、耳朵聽聲音！',
 q49_fin:'平平安安騎到家了！你是騎車小高手！',
 // 50
 q50_1:'這是你的房間！點一下放大鏡，當居家安全小偵探！',q50_1a:'小偵探出發！',q50_2:'房間裡哪裡有危險？點一下，貼上小貼紙！',q50_ok:'房間檢查好了！',
 q50_3:'晚上停電了！床邊放什麼，才看得到路？',q50_3o1:'手電筒',q50_3o2:'糖果',q50_3a:'對！床邊放手電筒，停電也看得到路。',q50_3w:'糖果不會發光喔！要放手電筒。',
 q50_5:'黑熊警察來了！點一下徽章，把它接過來！',q50_5a:'黑熊警察說：「你是星光安全小隊員了！」',
 q50_fin:'你的房間檢查好了！你是居家安全小偵探，也是星光安全小隊員！'});
const QL=k=>L(k)||k;
// 小圖：'B 的物件鍵|emoji'，有 B 的 ICONART['i:s46…'] 就用，沒有用 emoji
const ic8=sp=>{const [k,e]=String(sp).includes('|')?String(sp).split('|'):['',sp];try{if(k&&typeof ICONART!=='undefined'&&ICONART['i:s46'+k])return `<span class="q8ois">${ICONART['i:s46'+k]}</span>`;const q=window.S46&&S46.QI&&S46.QI[e];if(q&&ICONART['i:s46'+q])return `<span class="q8ois">${ICONART['i:s46'+q]}</span>`}catch(_){}return e};
/* ---------- 場景小工具 ---------- */
const nest=(svg,x,y,w,h)=>String(svg||'').replace(/^<svg /,`<svg x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMax meet" `);
const hero=(x,y,h=118)=>{try{return `<g class="q8hero">${nest(princess(S.look),x-h*120/172/2,y-h,h*120/172,h)}</g>`}catch(e){return person(kit(),x,y,{s:h/100})}};
const pet=(x,y,h=56)=>{try{return `<g class="q8pet">${nest(myPet(),x-h*.55,y-h,h*1.1,h)}</g>`}catch(e){return ''}};
const FR={46:'firedog46',47:'bearcop47',48:'otter48',49:'cat49',50:'bearcop47'};
const fr=(c,x,y,sz=90)=>`<g class="q8fr">${an(FR[c],x,y,sz)}</g>`;
const outdoor=K=>R(0,0,800,320,K.lg('#BFEBFF','#EAF9FF'))+C(680,70,26,'#FFE27A')+R(0,300,800,200,K.lg('#A8E09A','#8FD08A'))+P('M0 300 Q200 270 400 300 T800 296 L800 320 L0 320Z','#B8E8A8');
const bubble=(x,y,t,w)=>{w=w||Math.max(90,t.length*17+24);return G(x,y,R(-w/2,-22,w,36,'#FFFFFF',14)+P('M-8 14 L0 26 L8 14Z','#FFFFFF')+TX(0,2,esc(t),'16','#5A3A8A'))};
const bell=(x,y)=>G(x,y,P('M-16 8 Q-16 -18 0 -20 Q16 -18 16 8 L20 12 H-20Z','#FF6A6A')+C(0,14,4,'#FFD24D')+PL('M-28 -14 q-6 10 0 20 M28 -14 q6 10 0 20 M-36 -20 q-8 16 0 30 M36 -20 q8 16 0 30','#FF8A8A',3)+HI(-6,-10,4,6,.6));
const lift=K=>R(172,104,74,128,'#C8D4E8',4)+R(176,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(210,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(250,150,14,26,'#9AA8C8',3)+C(257,157,3.4,'#FFE9A0')+C(257,169,3.4,'#FFE9A0')+TX(210,98,'電梯','14','#5A6A8A');
const closet=K=>R(298,108,76,124,K.lg('#E8B888','#D49A68'),6)+R(304,114,32,112,'#E2AE7E',3)+R(338,114,32,112,'#E2AE7E',3)+C(330,170,3,'#8A5A3A')+C(342,170,3,'#8A5A3A');
const helmetBig=(K,on)=>G(560,300,P('M-80 0 Q-80 -96 0 -100 Q80 -96 80 0Z',K.lg('#FFB0D0','#FF7AA8'))+R(-86,-8,172,16,'#E8608A',8)+HI(-30,-70,26,10,.5)+PL('M-30 -96 Q-40 -40 -60 -6 M30 -96 Q40 -40 60 -6','#FFFFFF',5,'opacity=".6"')
 +(on?PL('M-64 6 Q-60 60 0 66 Q60 60 64 6','#5A5A7A',6)+R(-14,58,28,16,'#FFD24D',5):PL('M-64 6 Q-74 50 -62 92','#5A5A7A',6)+PL('M64 6 Q70 40 40 70','#5A5A7A',6)+R(28,66,24,14,'#FFD24D',5)));
const bigBike=K=>G(420,430,`<g transform="scale(2.6)">${bike(K,0,0,'#FF7AA8',{bell:true})}</g>`);
const cloud=(x,y,c='#9A9AB8')=>G(x,y,C(0,0,26,c)+C(28,-10,30,c)+C(58,0,24,c)+R(-20,0,96,22,c,11));
const magnifierBig=()=>G(620,200,C(0,0,58,'#FFFFFF','opacity=".85"')+PL('M18 18 L44 44','#B8865A',12)+C(0,0,30,'#DFF4FF','stroke="#FFD24D" stroke-width="9"')+HI(-9,-9,9,5,.8));
const bolt=(x,y)=>P(`M${x} ${y} l-14 30 h12 l-8 26 l26 -36 h-12 l10 -20Z`,'#FFE27A');
/* ---------- 五個大冒險 ---------- */
// step：t 說明、sc(K,st) 畫面、opts [[小圖, 字, 對不對]]、hot [{id,x,y,r,ok,lab}]、multi 全部對的都要點、order 照順序、after 做對後、w 做錯說明、danger 找危險
const QS={
 46:{bg:'fire46',steps:[
  {t:'q46_1',sc:K=>SC.fire46.bg(K)+lift(K)+closet(K)+bell(256,120)+hero(440,232,120)+pet(500,232,50),opts:[['alarm|📣','q46_1o1',1],['🙈','q46_1o2',0],['🧸','q46_1o3',0]],after:'q46_1a',w:'q46_1w'},
  {t:'q46_2',sc:K=>SC.fire46.bg(K)+lift(K)+closet(K)+smoke(380,110,1.1,.6)+smoke(480,116,1,.55)+hero(440,232,120)+pet(500,232,50),opts:[['smoke|🧎','q46_2o1',1],['exitsign|🏃','q46_2o2',0]],after:'q46_2a',w:'q46_2w'},
  {t:'q46_3',sc:K=>SC.fire46.bg(K)+lift(K)+closet(K)+smoke(380,110,1.1,.5)+hero(440,232,110)+pet(496,232,48),hot:[{id:'lift',x:212,y:168,r:62,ok:0},{id:'stair',x:668,y:300,r:72,ok:1}],after:'q46_3a',w:'q46_3w'},
  {t:'q46_4',sc:(K,st)=>{const P3=[[700,240],[662,300],[628,350],[596,404]];const k=st.n||0;const [hx,hy]=P3[Math.min(k,3)];return SC.fire46.bg(K)+lift(K)+closet(K)+hero(hx-10,hy,100)+pet(hx+34,hy,42)},
   hot:[{id:'st',x:650,y:320,r:84,ok:1,rep:3}],after:'q46_4a',move:1},
  {t:'q46_5',sc:K=>outdoor(K)+G(160,340,R(-100,-150,200,150,'#F4E6FF',8)+P('M-112 -150 L0 -210 L112 -150Z','#F28A8A')+R(-24,-70,48,70,'#BFEBD0',4))+tree(K,600,330,2.2)+G(600,210,R(-40,-16,80,28,'#FFFFFF',8)+TX(0,4,'集合點','16','#2F8A5A'))+hero(380,440,120)+pet(440,440,50),
   opts:[['meet|🌳','q46_5o1',1],['🧸','q46_5o2',0]],after:'q46_5a',w:'q46_5w'},
  {t:'q46_6',sc:K=>outdoor(K)+tree(K,600,330,2.2)+G(600,210,R(-40,-16,80,28,'#FFFFFF',8)+TX(0,4,'集合點','16','#2F8A5A'))+person(K,250,440,{adult:true,s:.7,pose:'wave',girl:false,shirt:'#7FB8FF'})+person(K,330,440,{adult:true,s:.68,pose:'stand',shirt:'#FF9EC4'})+person(K,410,440,{s:.8,pose:'wave',girl:false,shirt:'#FFD06A'})+fr(46,500,446,90)+hero(620,450,110),
   hot:[{id:'f1',x:250,y:380,r:54,ok:1},{id:'f2',x:330,y:382,r:54,ok:1},{id:'f3',x:410,y:394,r:54,ok:1},{id:'f4',x:500,y:402,r:54,ok:1}],multi:1,count:1,after:'q46_6a'},
  {t:'q46_7',hard:1,sub:1,sc:K=>outdoor(K)+tree(K,600,330,2.2)+person(K,300,440,{adult:true,s:.72,pose:'phone',girl:false,shirt:'#7FB8FF',hand:phoneS()})+bubble(300,300,'一一九')+hero(430,450,120)+pet(490,450,50),
   opts:[['door|🏠','q46_7o1',1],['fire|🔥','q46_7o2',1],['🙋','q46_7o3',1]],multi:1,order:1,shuf:1,after:'q46_7a',w:'q46_7w'}],fin:'q46_fin'},
 47:{bg:'police47',steps:[
  {t:'q47_1',sc:K=>SC.police47.bg(K)+an('bearcop47',540,470,90)+G(300,450,R(-14,-9,28,18,'#B8865A',4)+R(-14,-9,28,6,'#9A6A40',3))+hero(220,476,120)+pet(150,476,50),opts:[['policehat|👮','q47_1o1',1],['wallet|👛','q47_1o2',0]],after:'q47_1a',w:'q47_1w'},
  {t:'q47_2',sc:K=>SC.police47.bg(K)+car(K,170,500,'#C8B8FF',{open:true})+person(K,160,470,{adult:true,s:.6,pose:'wave',girl:false,shirt:'#9FD8C0'})+bubble(170,330,'上車吧！')+hero(330,476,120)+pet(390,476,50),opts:[['🙅','q47_2o1',1],['car|🚗','q47_2o2',0]],after:'q47_2a',w:'q47_2w'},
  {t:'q47_3',sc:K=>SC.police47.bg(K)+R(206,150,30,230,'#8A80A8')+TX(221,140,'小巷','13','#5A4A7A')+person(K,90,470,{adult:true,s:.55,pose:'stand',shirt:'#FFC8A0'})+person(K,140,470,{s:.6,pose:'wave',shirt:'#9FE0A0'})+hero(330,476,110)+pet(390,476,46),
   hot:[{id:'shop',x:110,y:270,r:80,ok:1},{id:'lane',x:221,y:300,r:54,ok:0},{id:'shop2',x:325,y:270,r:70,ok:1}],after:'q47_3a',w:'q47_3w'},
  {t:'q47_4',sc:K=>SC.police47.bg(K)+person(K,180,470,{adult:true,s:.58,pose:'reach',shirt:'#FFC8A0'})+G(208,398,E(0,0,9,7,'#FF8AB8')+P('M-9 0 l-7 -6 v12Z M9 0 l7 -6 v12Z','#FF8AB8'))+hero(320,476,120)+pet(380,476,50),opts:[['🙅','q47_4o1',1],['candy|🍬','q47_4o2',0]],after:'q47_4a',w:'q47_4w'},
  {t:'q47_5',sc:K=>SC.home50a.bg(K)+TX(650,200,'叮咚！','18','#C85A8A')+hero(520,440,120)+pet(450,440,50),opts:[['🙅','q47_5o1',1],['doorbell|🚪','q47_5o2',0]],after:'q47_5a',w:'q47_5w'}],fin:'q47_fin'},
 48:{bg:'pool48',steps:[
  {t:'q48_1',sc:(K,st)=>SC.pool48.bg(K)+fr(48,744,114,70)+hero(420,240+(st.bob?-6:0),110)+pet(480,240,46),opts:[['💪','q48_1o1',1],['🙆','q48_1o2',1],['🦵','q48_1o3',1]],multi:1,after:'q48_1a'},
  {t:'q48_2',sc:K=>SC.pool48.bg(K)+fr(48,744,114,70)+hero(150,236,110)+pet(200,236,46),hot:[{id:'shower',x:66,y:190,r:62,ok:1}],after:'q48_2a'},
  {t:'q48_3',sc:K=>SC.pool48.bg(K)+fr(48,744,114,70)+person(K,280,330,{adult:true,s:.6,pose:'wave',shirt:'#7FB8FF',girl:false})+R(250,300,60,44,'#8EDCFA',12)+hero(110,236,100)+pet(150,236,42),hot:[{id:'low',x:240,y:340,r:80,ok:1},{id:'deep',x:600,y:340,r:80,ok:0}],after:'q48_3a',w:'q48_3w'},
  {t:'q48_4',sc:K=>SC.pool48.bg(K)+fr(48,744,114,70)+bubble(690,70,'嗶——')+G(240,330,hero(0,40,100)+R(-40,10,80,34,'#8EDCFA',14)),opts:[['whistle|👂','q48_4o1',1],['💦','q48_4o2',0]],after:'q48_4a',w:'q48_4w'},
  {t:'q48_5',sc:K=>SC.pool48.bg(K)+fr(48,744,114,70)+person(K,330,228,{s:.78,pose:'up',girl:false,shirt:'#FFD06A',hat:'cap',hc:'#8AE07A'})+bubble(330,110,'一起跳！')+hero(430,236,110)+pet(490,236,46),opts:[['🙅','q48_5o1',1],['🤸','q48_5o2',0]],after:'q48_5a',w:'q48_5w'},
  {t:'q48_6',sc:K=>SC.pool48.bg(K)+R(0,0,800,150,'#8A8AB0',0,'opacity=".55"')+cloud(300,60)+cloud(520,50)+bolt(420,80)+G(240,330,hero(0,40,100)+R(-40,10,80,34,'#8EDCFA',14)),opts:[['thunder|🏃','q48_6o1',1],['🏊','q48_6o2',0]],after:'q48_6a',w:'q48_6w'}],fin:'q48_fin'},
 49:{bg:'park49',steps:[
  {t:'q49_1',sc:(K,st)=>SC.park49.bg(K)+R(380,150,360,300,'#FFFFFF',24,'opacity=".86"')+helmetBig(K,!!st.done)+hero(170,496,140)+pet(250,496,56),hot:[{id:'buckle',x:600,y:372,r:56,ok:1}],after:'q49_1a',keep:1},
  {t:'q49_2',sc:K=>SC.park49.bg(K)+R(200,140,460,340,'#FFFFFF',24,'opacity=".88"')+G(430,440,`<g transform="scale(2.8)">${bike(K,0,0,'#FF7AA8',{bell:true})}</g>`)+PL('M330 240 L470 268','#C8B8E8',3,'stroke-dasharray="6 6"')+PL('M560 240 L498 278','#C8B8E8',3,'stroke-dasharray="6 6"')+PL('M560 400 L515 402','#C8B8E8',3,'stroke-dasharray="6 6"')
    +G(296,230,C(0,0,46,'#FFF8E0')+P('M-16 10 Q-16 -18 0 -20 Q16 -18 16 10 L20 14 H-20Z','#FFD24D')+C(0,18,4,'#E0A020'))+G(584,212,C(0,0,46,'#FFF8E0')+PL('M-22 -6 Q0 -18 22 -6','#6A6A8A',7)+PL('M-14 4 Q2 -4 18 4','#FF7AA8',6))+G(600,390,C(0,0,46,'#FFF8E0')+C(0,0,26,'none','stroke="#4A4A6A" stroke-width="7"')+C(0,0,6,'#9A9AB8'))+hero(110,470,120),
   hot:[{id:'bell',x:296,y:230,r:52,ok:1,lab:'鈴鐺'},{id:'brake',x:584,y:212,r:52,ok:1,lab:'煞車'},{id:'tire',x:600,y:390,r:52,ok:1,lab:'輪胎'}],multi:1,after:'q49_2a'},
  {t:'q49_3',sc:K=>SC.park49.bg(K)+fr(49,90,290,70)+hero(160,470,110)+pet(220,470,46),hot:[{id:'path',x:420,y:242,r:70,ok:1},{id:'road',x:300,y:408,r:70,ok:0}],after:'q49_3a',w:'q49_3w'},
  {t:'q49_4',sc:K=>SC.park49.bg(K)+person(K,520,290,{adult:true,s:.6,pose:'walk',shirt:'#FFC8A0',flip:true})+G(380,286,bike(K,0,0,'#FF7AA8',{bell:true}))+hero(372,270,100),opts:[['bell|🔔','q49_4o1',1],['💨','q49_4o2',0]],after:'q49_4a',w:'q49_4w'},
  {t:'q49_5',sc:K=>SC.park49.bg(K)+G(520,492,bike(K,0,0,'#FF7AA8'))+hero(460,496,110)+pet(400,496,46),opts:[['zebra|🚶','q49_5o1',1],['bike|🚲','q49_5o2',0]],after:'q49_5a',w:'q49_5w'},
  {t:'q49_6',sc:(K,st)=>SC.park49.bg(K)+R(300,140,380,250,'#FFFFFF',24,'opacity=".86"')+(st.got&&st.got.has('ph')?G(400,262,R(-50,-22,100,44,'#E8D8F4',12)+TX(0,10,'收好了','24','#7A5AAA')):G(400,262,`<g transform="scale(4)">${phoneS()}</g>`))+(st.got&&st.got.has('ea')?G(580,262,R(-50,-22,100,44,'#E8D8F4',12)+TX(0,10,'拿下了','24','#7A5AAA')):G(580,262,PL('M-44 10 Q0 -70 44 10','#7A6AD8',10)+R(-56,-4,24,40,'#9A8AF0',10)+R(32,-4,24,40,'#9A8AF0',10)))+hero(170,490,130),
   hot:[{id:'ph',x:400,y:262,r:58,ok:1,lab:'手機'},{id:'ea',x:580,y:262,r:62,ok:1,lab:'耳機'}],multi:1,after:'q49_6a',redraw:1}],fin:'q49_fin'},
 50:{bg:'home50r',steps:[
  {t:'q50_1',sc:K=>SC.home50r.bg(K).replace(/<g transform="translate\(500 370\)">/,'<g transform="translate(9999 0)">')+SC.home50r.items.filter(x=>x.k==='bad'&&!x.hard).map(x=>x.bad(K)).join('')+magnifierBig(),hot:[{id:'mag',x:620,y:200,r:62,ok:1}],after:'q50_1a'},
  {t:'q50_2',danger:'home50r'},
  {t:'q50_3',sc:K=>SC.home50r.bg(K)+R(0,0,800,500,'#1A1440',0,'opacity=".55"')+C(660,60,22,'#FFF4C8'),opts:[['flashlight|🔦','q50_3o1',1],['candy|🍬','q50_3o2',0]],after:'q50_3a',w:'q50_3w'},
  {t:'q50_5',sc:K=>SC.home50r.bg(K)+an('bearcop47',620,470,150)+G(640,280,C(0,0,40,'#FFD24D')+C(0,0,32,'#FFE89A')+P('M0 -22 L6 -7 L22 -7 L9 3 L14 19 L0 9 L-14 19 L-9 3 L-22 -7 L-6 -7Z','#FF8A3C')+P('M-26 30 L-14 60 L0 44 L14 60 L26 30Z','#5A8AE8')),hot:[{id:'badge',x:640,y:290,r:60,ok:1}],after:'q50_5a'}],fin:'q50_fin'}};
/* ---------- 徽章（結尾卡） ---------- */
function badgeSVG(){try{if(window.S46&&typeof S46.BADGE==='function'){const b=S46.BADGE();if(b&&/<svg/.test(b))return b}}catch(e){}const K=kit();return `<svg viewBox="0 0 120 140" aria-hidden="true">${K.out()}${P('M30 92 L18 136 L42 122 L54 138 L60 96Z','#5A8AE8')+P('M90 92 L102 136 L78 122 L66 138 L60 96Z','#4A72D0')}${C(60,60,50,K.lg('#FFE27A','#F2B23B'))}${C(60,60,40,K.lg('#FFF4C8','#FFE07A'))}${P('M60 28 L69 50 L93 50 L74 64 L81 88 L60 74 L39 88 L46 64 L27 50 L51 50Z','#FF8A5C')}${HI(44,36,10,5,.7)}</svg>`}
/* ---------- 引擎 ---------- */
BUILD.quest8=function(play,sp,arg){
 const ch=QS[arg]?+arg:46;const Q0=QS[ch];const Q=Object.assign({},Q0,{steps:Q0.steps.filter(x=>!x.hard||S.diff==='hard')});S.ans=null;S.revKey=null;
 let i=0,miss=0,busy=false,fast=false,alive=true,dm=null,readTk=0;const st={};
 play.innerHTML=`<div class="q8wrap"><div class="q8dots">${Q.steps.filter(x=>!x.sub).map(()=>'<i></i>').join('')}</div><div class="q8main"><div class="q8scene"></div><div class="q8act"></div></div></div>`;
 const wrap=play.querySelector('.q8wrap'),scn=play.querySelector('.q8scene'),act=play.querySelector('.q8act'),dots=[...play.querySelectorAll('.q8dots i')];
 const cur=()=>Q.steps[i];const dotOf=k=>Q.steps.slice(0,k+1).filter(x=>!x.sub).length-1;
 const draw=()=>{const s=cur();if(s.danger)return;const K=kit();let hs='';
  (s.hot||[]).forEach(h=>{const got=st.got&&st.got.has(h.id);hs+=`${got?okSticker(h.x+h.r*.5,h.y-h.r*.5):`<circle class="q8mark" cx="${h.x}" cy="${h.y}" r="${h.r-6}" fill="#FFFFFF" fill-opacity=".12" stroke="#FFFFFF" stroke-width="3.5" stroke-dasharray="10 8" pointer-events="none"/>`}<circle class="q8ring" data-id="${h.id}" cx="${h.x}" cy="${h.y}" r="${h.r-4}" fill="none" stroke="#FFE27A" stroke-width="10"/>${h.lab&&!got?G(h.x,h.y+h.r+14,R(-44,-24,88,40,'#FFFFFF',14,'opacity=".94"')+TX(0,6,h.lab,'28','#5A3A8A')):''}`});
  const inner=s.sc(K,st);
  scn.innerHTML=`<svg class="q8svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">${K.out()}${inner}${hs}<g>${(s.hot||[]).map(h=>`<circle class="q8hit" data-id="${h.id}" cx="${h.x}" cy="${h.y}" r="${h.r}" fill="#000" fill-opacity="0"/>`).join('')}</g></svg>`;
  scn.querySelectorAll('.q8hit').forEach(c=>c.addEventListener('click',()=>tapHot(c.dataset.id)));fitNow()};
 const ring=id=>{const r=scn.querySelector(`.q8ring[data-id="${id}"]`);if(r){r.classList.remove('on');void r.getBBox;r.classList.add('on')}};
 const okOpt=()=>{const s=cur();return (s.opts||[]).findIndex(o=>o[2]&&!(st.got&&st.got.has('o'+(s.opts.indexOf(o)))))};
 const nextHot=()=>{const s=cur();const ok=(s.hot||[]).filter(h=>h.ok&&!(st.got&&st.got.has(h.id)));return ok[0]};
 S.hint=m=>{if(!alive)return;const s=cur();if(!s)return;if(s.danger){dm&&dm.hint(2);return}
  if(miss<=1&&s.w){PS(QL(s.w));return}PS(QL('q_glow'));
  if(s.opts){const k=okOpt();const b=act.querySelector(`.q8opt[data-k="${k}"]`);if(b)glow(b)}else{const h=nextHot();if(h)ring(h.id)}};
 const success=async()=>{const s=cur();busy=true;const nx=Q.steps[i+1];if(!(nx&&nx.sub)&&dots[dotOf(i)])dots[dotOf(i)].classList.add('on');
  if(s.after){setPrompt(`<span class="qtag" style="--tagc:#FFE27A">大冒險</span>${esc(QL(s.after))}`,[],false);await Promise.race([SAY([QL(s.after)]),wait(fast?40:3600)])}
  await wait(fast?20:350);if(!alive||!play.isConnected)return;i++;busy=false;if(i<Q.steps.length)run();else fin()};
 const tapHot=async id=>{if(busy||S.lock||!alive)return;const s=cur();const h=(s.hot||[]).find(x=>x.id===id);if(!h)return;
  const el=scn.querySelector(`.q8hit[data-id="${id}"]`);
  if(!h.ok){miss++;wrong(el);return}
  st.got=st.got||new Set();if(st.got.has(id))return;
  if(h.rep){st.n=(st.n||0)+1;okSfx();try{if(!RM())burstEl(el,6)}catch(e){}if(st.n<h.rep){draw();return}st.got.add(id);draw();await wait(fast?20:500);success();return}
  if(s.order){const nh=nextHot();if(nh&&nh.id!==id){miss++;wrong(el);return}}
  st.got.add(id);okSfx();if(s.move)st.n=(st.n||0)+1;if(s.keep&&!s.multi)st.done=1;
  try{if(!RM())burstEl(el,6)}catch(e){}
  if(s.count){try{SAY([String(st.got.size)])}catch(e){}}
  draw();
  const left=(s.hot||[]).filter(x=>x.ok&&!st.got.has(x.id)).length;
  if(!s.multi||!left){await wait(fast?20:500);success()}};
 const tapOpt=async b=>{if(busy||S.lock||!alive)return;const s=cur();const k=+b.dataset.k;const o=s.opts[k];if(!window.__s8fast){readTk++;try{hush()}catch(e){}act.querySelectorAll('.q8opt.reading').forEach(x=>x.classList.remove('reading'))}
  if(!o[2]){miss++;wrong(b);return}
  st.got=st.got||new Set();if(st.got.has('o'+k))return;
  if(s.order){const exp=s.opts.findIndex((x,j)=>x[2]&&!st.got.has('o'+j));if(k!==exp){miss++;wrong(b);return}}st.got.add('o'+k);okSfx();b.classList.add('ok22');b.disabled=true;
  if(s.multi){st.bob=!st.bob;draw();try{SAY([QL(o[1])])}catch(e){}if(s.opts.some((x,j)=>x[2]&&!st.got.has('o'+j)))return;await wait(fast?20:700)}
  success()};
 function fitNow(){try{const A=avail(play,true);wrap.classList.toggle('land',!!A.land);const svg=play.querySelector('.q8svg,.d8svg');if(!svg)return;
  const hasAct=!!act.children.length;let w,h;
  const side=A.land||A.w>A.h*1.9;wrap.classList.toggle('side',side);
  if(side){const aw=hasAct?Math.min(A.land?200:280,A.w*.32):0;w=Math.min(A.w-aw-10,(A.h-30)*1.6)}else{const nOpt=act.querySelectorAll('.q8opt').length;const ah=hasAct?(innerWidth<700?(nOpt>2?190:130):120):(cur()&&cur().danger?64:0);w=Math.min(A.w,(A.h-36-ah)*1.6)}
  w=Math.max(140,w);svg.style.width=Math.floor(w)+'px';svg.style.height=Math.floor(w/1.6)+'px'}catch(e){}}
 const run=()=>{const s=cur();miss=0;st.got=new Set();st.n=0;st.done=0;busy=false;
  dots.forEach((d,j)=>{d.classList.toggle('on',j<dotOf(i));d.classList.toggle('now',j===dotOf(i))});
  setPrompt(`<span class="qtag" style="--tagc:#FFE27A">大冒險</span>${esc(QL(s.t))}`,[QL(s.t)],false);const tk=++readTk;
  SAY([QL(s.t)]).then(()=>{if(tk!==readTk||cur()!==s||!s.opts)return;readOpts([...act.querySelectorAll('.q8opt')],b=>QL(s.opts[+b.dataset.k][1]),()=>tk===readTk&&cur()===s&&!busy)});
  act.innerHTML='';dm=null;
  if(s.danger){scn.innerHTML='';const box=document.createElement('div');box.className='d8box';scn.appendChild(box);const swp=document.createElement('div');swp.className='d8swipe';swp.hidden=true;swp.textContent='← 左右滑一滑，看整張圖 →';act.appendChild(swp);const bar=document.createElement('div');bar.className='d8bar';act.appendChild(bar);
   dm=mountDanger(box,s.danger,{need:s.need||0,hard:S.diff==='hard',bar,idle:18000,onDone:()=>{SAY([QL('q50_ok')]);success()}});
   const f=()=>{const A=avail(play,true);wrap.classList.toggle('land',!!A.land);const side=A.land||A.w>A.h*1.9;wrap.classList.toggle('side',side);if(side)dm.fit(A.w-Math.min(A.land?200:260,A.w*.32)-10,A.h-30);else{const sc=dm.fit(A.w,A.h-36-64-24,X.panH(A,36+64+30));swp.hidden=!sc}};X.setFit(f);X.refit();return}
  if(s.opts){const ord=s.opts.map((o,k)=>k);const ks=s.shuf?shuffle(ord):ord;act.innerHTML=`<div class="q8opts">${ks.map(k=>{const o=s.opts[k];return `<button class="q8opt" data-k="${k}"><span class="q8oi">${ic8(o[0])}</span><span class="q8ol">${esc(QL(o[1]))}</span></button>`}).join('')}</div>`}
  act.querySelectorAll('.q8opt').forEach(b=>b.onclick=()=>tapOpt(b));
  draw();X.setFit(fitNow);X.refit()};
 const fin=()=>{dots.forEach(d=>d.classList.add('on'));act.innerHTML='';
  scn.innerHTML=`<div class="q8fin"><div class="q8badge">${badgeSVG()}</div><div class="q8fint"><b>${QL('q_fin_hd')}</b><span>${esc(QL(Q.fin))}</span></div><div class="q8fhero">${(()=>{try{return princess(S.look)}catch(e){return ''}})()}</div></div>`;
  setPrompt(`<span class="qtag" style="--tagc:#FFE27A">大冒險</span>${esc(QL(Q.fin))}`,[],false);
  try{if(!RM())confetti()}catch(e){}X.setFit(null);
  right(scn.querySelector('.q8badge')||scn,[QL(Q.fin)],1200)};
 const doStep=async()=>{const s=cur();if(!s)return;
  if(s.danger){if(dm){await dm.auto();await wait(80)}return}
  if(s.opts){for(let g=0;g<6&&cur()===s&&!S.lock;g++){while(busy&&alive)await wait(30);if(cur()!==s)break;const k=okOpt();const b=act.querySelector(`.q8opt[data-k="${k}"]`);if(!b)break;await tapOpt(b);await wait(40)}return}
  for(let g=0;g<8&&cur()===s&&!S.lock;g++){while(busy&&alive)await wait(30);if(cur()!==s)break;const h=nextHot();if(!h)break;await tapHot(h.id);await wait(40)}};
 window.__q8step=doStep;
 S.__auto=async()=>{fast=true;window.__s8fast=1;try{for(let g=0;g<40&&alive&&!S.lock&&play.isConnected;g++){while(busy&&alive)await wait(30);if(S.lock||i>=Q.steps.length)break;await doStep();await wait(40)}}finally{window.__s8fast=0}};
 run()};
/* ---------- 樣式 ---------- */
const st9=document.createElement('style');st9.id='m8si-css';st9.textContent=`
.q8wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:100%;height:100%;min-height:0}
.q8main{display:flex;flex-direction:column;align-items:center;gap:8px;min-height:0}
.q8wrap.land{gap:2px}.q8wrap.side .q8main{flex-direction:row;gap:14px}.q8wrap.side .q8opts{flex-direction:column;gap:10px}.q8wrap.side .d8bar{flex-direction:column;width:min(240px,30vw)}
.q8scene{display:flex;align-items:center;justify-content:center;min-height:0}
.q8svg{display:block;border-radius:18px;box-shadow:0 4px 18px rgba(20,10,60,.35);background:#fff;touch-action:manipulation;max-width:100%}
.q8svg .q8hit{cursor:pointer;pointer-events:all}.q8svg .q8mark{animation:q8mk 2.2s ease-in-out infinite}@keyframes q8mk{0%,100%{opacity:.55}50%{opacity:1}}
.q8svg .q8ring{opacity:0;pointer-events:none}.q8svg .q8ring.on{animation:d8ring 1.1s ease-in-out 4}
.q8svg .q8hero,.q8svg .q8pet{animation:q8bob 2.4s ease-in-out infinite}
@keyframes q8bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.q8opts{display:flex;gap:clamp(8px,1.6vw,16px);flex-wrap:wrap;justify-content:center}
.q8opt{display:flex;align-items:center;gap:8px;min-height:60px;min-width:140px;max-width:260px;padding:8px 16px;border-radius:20px;border:3px solid #FFE27A;background:#FFFFFF;color:#4A2A7A;font-size:19px;font-weight:800;line-height:1.25;cursor:pointer;box-shadow:0 3px 0 rgba(20,10,60,.25);text-align:left}
.q8opt .q8oi{font-size:30px;line-height:1;flex:none;display:grid;place-items:center;min-width:34px}.q8ois{display:block;width:40px;height:40px}.q8ois svg{width:100%;height:100%;display:block}
.q8opt.ok22{border-color:#6FE3A8;box-shadow:0 0 0 3px #6FE3A8,0 0 14px #6FE3A8}.q8opt[disabled]{opacity:.8}
.q8wrap.land .q8opts{flex-direction:column;gap:6px}.q8wrap.land .q8opt{min-height:46px;min-width:150px;font-size:15px;padding:4px 10px}.q8wrap.land .q8opt .q8oi{font-size:24px}
@media (max-width:600px){.q8opt{min-width:130px;font-size:16px;padding:6px 10px;min-height:54px}.q8opt .q8oi{font-size:24px}}
.q8fin{display:flex;align-items:center;justify-content:center;gap:16px;background:linear-gradient(180deg,#3A2E7A,#5A3E9A);border:3px solid #FFE27A;border-radius:24px;padding:16px 22px;color:#fff;box-shadow:0 0 30px rgba(255,226,122,.5);animation:d8in .5s ease;flex-wrap:wrap;max-width:96%}
.q8badge{width:clamp(80px,16vh,140px)}.q8badge svg{width:100%;height:auto;display:block}
.q8fint{display:flex;flex-direction:column;gap:6px;max-width:340px}.q8fint b{font-size:clamp(24px,4vh,34px);color:#FFE27A}.q8fint span{font-size:clamp(16px,2.4vh,20px);line-height:1.4}
.q8fhero{width:clamp(60px,12vh,110px)}.q8fhero svg{width:100%;height:auto}
.q8wrap.land .q8fin{padding:8px 12px;gap:10px}.q8wrap.land .q8badge{width:70px}.q8wrap.land .q8fhero{width:56px}.q8wrap.land .q8fint b{font-size:20px}.q8wrap.land .q8fint span{font-size:14px}
@media (prefers-reduced-motion:reduce){.q8svg .q8hero,.q8svg .q8pet,.q8svg .q8mark{animation:none}.q8svg .q8ring.on{animation:none;opacity:1}}
body.lite .q8svg .q8hero,body.lite .q8svg .q8pet{animation:none}
`;document.head.appendChild(st9);
// 大冒險關不進錯題本（不然之後會在別的關卡跳出整個大冒險當複習題）
try{const _ra=revAdd;revAdd=function(){try{if(curType()==='quest8')return}catch(e){}return _ra.apply(this,arguments)}}catch(e){console.log('m8si rev',e)}
window.__quest8={QS};
}catch(e){console.log('m8si',e)}
}).toString()+')()')})();

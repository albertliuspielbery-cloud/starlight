/* ================= m8_globe 地球儀（畫面 globe8；遊樂園「小遊戲」區、「大自然」頁）=================
 * 2026-11-22 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室。
 * 這個檔案由 qa/globe/assemble.py 產生（src.js＋art.js＋geo.json），要改請改原始檔再組一次。
 *
 * 地圖資料授權：
 *   陸地、國家輪廓取自 Natural Earth（https://www.naturalearthdata.com）1:110m（台灣、新加坡、荷蘭、瑞士用 1:50m），
 *   經 npm 套件 world-atlas@2.0.2（TopoJSON）轉出。Natural Earth 是 public domain（公有領域），可自由使用，不需標示。
 *   處理：同一洲的國家合併成洲的輪廓（俄羅斯以東經 60 度切成歐洲、亞洲兩塊），只留介紹國家的輪廓；
 *   座標取到 0.1 度（台灣、新加坡 0.01 度）並簡化；五大洋分界用 1 度格子事先算好（qa/globe/mkgeo.js）。
 *   北極海冰是自己畫的示意形狀（不是即時資料）。
 *
 * 玩法：手指轉地球（放開有慣性），點一下念名字。
 *   點陸地念洲名；點到選定的 38 國（含台灣）念國名、跳出小卡（原創小圖＋一句話）；點海念洋名；點北極白色海冰念「北極」。
 *   中國、俄羅斯、芬蘭、土耳其、阿聯酋、坦尚尼亞、蒙古是 2026-11-25 Albert 加的（取代原本「不標中國、俄羅斯」）；中國的輪廓和點擊範圍不含台灣。
 *   南極洲、北極也有小卡。其他國家不標名字、不畫國界，點了只念洲名。不畫任何國界線；點到介紹的國家時，只有那一國的範圍淡淡亮起。
 *   國家輪廓（2026-11-25 Albert）：介紹的國家描細細的白色海岸線（約 1.1～1.5px）。
 *     13:21 Albert 定案：全世界的陸地國界都畫白色細實線，相鄰國家底色亮暗交替一點點（同洲色系不變）；
 *     有爭議的國界（印度–中國、印度–巴基斯坦、中國–巴基斯坦、摩洛哥–西撒哈拉）幾乎看不見，克里米亞那段不畫。點到／提示時那國國界變成金黃色、變粗。
 *     邊的分類在 assemble.py 事先算好；window.__GL8_OUTLINE=false 可以關掉。
 *   台灣用 1:50m 的島形＋一顆小星星標示，不放國旗；點擊範圍只在海上放大（中心 1.2 度內、海岸 0.5 度內），點在其他陸地不算台灣。開場地球轉到台灣。
 *   「找找看」：寵物說「幫我找到太平洋！」，孩子轉地球去點。一輪 5 題，不扣分、不倒數。
 *     點錯念出那裡的名字＋「再找找看！」；同一題第二次錯：鏡頭自動轉到目標、目標發光（國家在畫面上太小時鏡頭一起拉近，下一題拉回）。
 *     小國家（2026-11-24 UX 審查）：找題時以題目為優先，點在題目國家中心約 22px（台灣海上 30px）內就算對；自由轉時小國用「離誰最近」分，見下面「點到哪裡」。
 *     題目是北極、南極洲、北極海、南極海時，地球會先自動上下轉，讓孩子看得到。
 *     簡單：七大洲、台灣、北極；中等：再加五大洋；高難度：再加 37 國（台灣以外）。
 * 寶石：找找看玩完一輪，每天第一次 3 顆、之後 1 顆（V2.globe8Day；大門每日上限用 __gateExt.gemDay 接）。自由轉不給寶石。
 * 開放：完成第 41 章；App 版還要有完整版 full（或以前的 stage9；5.4.0 起不賣 stage9）；網頁版跟章節同一個季密碼（照雨林盪藤蔓）。
 * 收集冊：點過的國家、南極洲、北極記在 V2.gl8seen，收集冊多一頁「地球儀」（window.__book19.add）。
 * 語音只念有真人錄音的句子（沒錄好以前只出字幕）；台詞表 lines/globe.tsv 由 qa/globe/assemble.py 從下面 LINES 產生。
 * 動畫：只有地球轉動（鏡頭）、淡入淡出、發光，沒有角色放大縮小。 */
/* 主程式在 (()=>{…})() 裡面，mods 接在它後面：用主程式留的 window.__ev（直接 eval）把這一段放進主程式的範圍執行（跟 m7c 同一個做法）。 */
(function(){if(typeof window.__ev!=='function'){console.log('globe8: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined')return;
/*LINES*/
const T={
"card":"地球儀，轉一轉，認識世界！",
"lock41":"完成第四十一章，就會打開喔！",
"again":"再點一下，就可以進去喔！",
"lockApp":"爸爸媽媽可以幫你打開新的冒險喔！",
"hi_tw":"我們住在這裡，台灣！",
"tip":"用手指轉一轉地球，點一下，就會告訴你名字！",
"f_menu":"找找看！要玩哪一種呢？",
"d_easy":"簡單","d_mid":"中等","d_hard":"高難度",
"f_start":"我說一個地方，你轉地球找一找，點一下！",
"f_again":"再找找看！",
"f_hint":"看，發亮的地方！",
"f_ok1":"找到了！你好厲害！","f_ok2":"答對了，就是這裡！","f_ok3":"哇，你找到了！",
"f_top":"地球轉一轉，看看最上面！","f_bottom":"地球轉一轉，看看最下面！",
"f_end":"全部找到了！你是地球小專家！",
"gem3":"送你三顆寶石！","gem1":"送你一顆寶石！",
"b_sec":"地球儀！",
"b_lock":"去地球儀點一點，就會收集到喔！",
"fact_pole":"北極熊住在北極，企鵝住在地球的南邊，牠們不會碰面喔！",
"n_as":"亞洲","n_eu":"歐洲","n_af":"非洲","n_na":"北美洲","n_sa":"南美洲","n_oc":"大洋洲","n_an":"南極洲",
"n_pa":"太平洋","n_at":"大西洋","n_io":"印度洋","n_ar":"北極海","n_so":"南極海","n_arc":"北極",
"n_tw":"台灣","n_jp":"日本","n_kr":"韓國","n_th":"泰國","n_vn":"越南","n_sg":"新加坡","n_my":"馬來西亞","n_id":"印尼","n_ph":"菲律賓","n_in":"印度",
"n_gb":"英國","n_fr":"法國","n_de":"德國","n_it":"義大利","n_es":"西班牙","n_nl":"荷蘭","n_ch":"瑞士","n_gr":"希臘","n_is":"冰島",
"n_us":"美國","n_ca":"加拿大","n_mx":"墨西哥","n_br":"巴西","n_ar2":"阿根廷","n_pe":"秘魯",
"n_eg":"埃及","n_ke":"肯亞","n_za":"南非","n_ma":"摩洛哥","n_au":"澳洲","n_nz":"紐西蘭",
"s_tw":"台灣，我們住在這裡，有可愛的台灣黑熊！",
"s_jp":"日本，有很漂亮的富士山！",
"s_kr":"韓國，有辣辣的泡菜！",
"s_th":"泰國，有溫和的大象！",
"s_vn":"越南，有香噴噴的河粉！",
"s_sg":"新加坡，有美麗的蘭花！",
"s_my":"馬來西亞，森林裡住著犀鳥！",
"s_id":"印尼，住著好大的科摩多龍！",
"s_ph":"菲律賓，有大眼睛的眼鏡猴！",
"s_in":"印度，有羽毛漂亮的孔雀！",
"s_gb":"英國，有紅色的雙層巴士！",
"s_fr":"法國，有一座高高的鐵塔！",
"s_de":"德國，有像童話故事一樣的城堡！",
"s_it":"義大利，有香香的披薩！",
"s_es":"西班牙，有一大鍋的海鮮飯！",
"s_nl":"荷蘭，有風車和鬱金香！",
"s_ch":"瑞士，山上的乳牛掛著鈴鐺！",
"s_gr":"希臘，海邊有藍白色的房子！",
"s_is":"冰島，有冰也有火山！",
"s_us":"美國，有舉著火炬的自由女神像！",
"s_ca":"加拿大，秋天有紅紅黃黃的楓葉！",
"s_mx":"墨西哥，有高高的仙人掌！",
"s_br":"巴西，雨林裡有大嘴巴的巨嘴鳥！",
"s_ar2":"阿根廷，有好大好大的瀑布！",
"s_pe":"秘魯，高山上有毛茸茸的羊駝！",
"s_eg":"埃及，沙漠裡有大大的金字塔！",
"s_ke":"肯亞，大草原上有長頸鹿和斑馬！",
"s_za":"南非，海邊住著小企鵝！",
"s_ma":"摩洛哥，有尖尖蓋子的塔吉鍋！",
"s_au":"澳洲，有跳得好遠的袋鼠！",
"s_nz":"紐西蘭，有不會飛的奇異鳥！",
"s_an":"南極洲好冷好冷，沒有國家，科學家在那裡做研究！",
"s_arc":"北極是結冰的大海，北極熊住在這裡！",
"q_as":"幫我找到亞洲！","q_eu":"幫我找到歐洲！","q_af":"幫我找到非洲！","q_na":"幫我找到北美洲！","q_sa":"幫我找到南美洲！","q_oc":"幫我找到大洋洲！","q_an":"幫我找到南極洲！",
"q_pa":"幫我找到太平洋！","q_at":"幫我找到大西洋！","q_io":"幫我找到印度洋！","q_ar":"幫我找到北極海！","q_so":"幫我找到南極海！","q_arc":"幫我找到北極！",
"q_tw":"幫我找到台灣！","q_jp":"幫我找到日本！","q_kr":"幫我找到韓國！","q_th":"幫我找到泰國！","q_vn":"幫我找到越南！","q_sg":"幫我找到新加坡！","q_my":"幫我找到馬來西亞！","q_id":"幫我找到印尼！","q_ph":"幫我找到菲律賓！","q_in":"幫我找到印度！",
"q_gb":"幫我找到英國！","q_fr":"幫我找到法國！","q_de":"幫我找到德國！","q_it":"幫我找到義大利！","q_es":"幫我找到西班牙！","q_nl":"幫我找到荷蘭！","q_ch":"幫我找到瑞士！","q_gr":"幫我找到希臘！","q_is":"幫我找到冰島！",
"q_us":"幫我找到美國！","q_ca":"幫我找到加拿大！","q_mx":"幫我找到墨西哥！","q_br":"幫我找到巴西！","q_ar2":"幫我找到阿根廷！","q_pe":"幫我找到秘魯！",
"q_eg":"幫我找到埃及！","q_ke":"幫我找到肯亞！","q_za":"幫我找到南非！","q_ma":"幫我找到摩洛哥！","q_au":"幫我找到澳洲！","q_nz":"幫我找到紐西蘭！",
"n_cn":"中國","n_ru":"俄羅斯","n_fi":"芬蘭","n_tr":"土耳其","n_ae":"阿聯酋","n_tz":"坦尚尼亞","n_mn":"蒙古",
"s_cn":"中國，有長長的長城，還有大貓熊！",
"s_ru":"俄羅斯，是世界上最大的國家！",
"s_fi":"芬蘭，有聖誕老人村，冬天看得到極光！",
"s_tr":"土耳其，一邊在亞洲，一邊在歐洲！",
"s_ae":"阿聯酋，這裡有杜拜，有世界最高的大樓，還有沙漠！",
"s_tz":"坦尚尼亞，有非洲最高的吉力馬札羅山，草原上有好多動物！",
"s_mn":"蒙古，有圓圓的蒙古包，還有好大的草原可以騎馬！",
"q_cn":"幫我找到中國！","q_ru":"幫我找到俄羅斯！","q_fi":"幫我找到芬蘭！","q_tr":"幫我找到土耳其！","q_ae":"幫我找到阿聯酋！","q_tz":"幫我找到坦尚尼亞！","q_mn":"幫我找到蒙古！"
};
/*END*/
/* ---------- 地點 ---------- */
// 洲：代號、顏色、中心（經、緯；鏡頭轉過去用）
const CONT={as:['#F7C873',95,40],eu:['#B9A2F0',18,52],af:['#F5A66E',20,4],na:['#8FD68A',-100,45],sa:['#F49AC1',-60,-16],oc:['#FF9C8A',138,-25],an:['#F2F8FF',0,-82]};
// 洋：格子代號 0～4 → 代號、中心
const OCN=[['pa',-160,4],['at',-35,18],['io',78,-22],['ar',null,76],['so',null,-63]];
// 介紹的 38 國（含台灣）：代號（T 的 key 用 n_／s_／q_ 加代號；阿根廷 ar2，避免跟北極海 ar 撞名）、所屬洲
const CT=[['tw','as'],['jp','as'],['kr','as'],['th','as'],['vn','as'],['sg','as'],['my','as'],['id','as'],['ph','as'],['in','as'],
 ['gb','eu'],['fr','eu'],['de','eu'],['it','eu'],['es','eu'],['nl','eu'],['ch','eu'],['gr','eu'],['is','eu'],
 ['us','na'],['ca','na'],['mx','na'],['br','sa'],['ar2','sa'],['pe','sa'],['eg','af'],['ke','af'],['za','af'],['ma','af'],['au','oc'],['nz','oc'],
 // 2026-11-25 Albert 加（取代原本「不標中國、俄羅斯」）：俄羅斯收集冊放歐洲、土耳其放亞洲；找洲的題目時，俄羅斯看點的位置在哪一洲，土耳其亞洲、歐洲都算
 ['cn','as'],['ru','eu'],['fi','eu'],['tr','as'],['ae','as'],['tz','af'],
 ['mn','as']];// 蒙古：2026-11-25 Albert 12:20 加
const CTOF={};CT.forEach(([k,c])=>CTOF[k]=c);
const NAME=k=>T['n_'+k]||'';
const KIND=k=>CONT[k]?'cont':CTOF[k]?'ctry':k==='arc'?'arc':'ocean';
// 有小卡的：38 國＋南極洲＋北極
const HASCARD=k=>!!CTOF[k]||k==='an'||k==='arc';
const POLAR={an:-1,so:-1,arc:1,ar:1};

/*ART*/

/* ---------- 地圖資料 ---------- */
const GEO=/*GEO*/null/*GEOEND*/;
const AL='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const D2R=Math.PI/180;
// eb：每個環的邊分類字串（輪廓用：0 海岸、1 陸地相接、2 幾乎看不見），見 assemble.py
function decode(str,q,eb){const out=[];if(!str)return out;eb=eb?eb.split(' '):null;str.split(' ').forEach((part,pi)=>{const v=[];let n=0,sh=0;
  for(let i=0;i<part.length;i++){const c=AL.indexOf(part[i]);n+=(c&31)*Math.pow(2,sh);sh+=5;if(!(c&32)){v.push(n%2?-(n+1)/2:n/2);n=0;sh=0}}
  const m=v.length>>1;const P=new Float32Array(m*4),NS=new Uint8Array(m),LL=new Float32Array(m*2);let x=0,y=0;
  for(let i=0;i<m;i++){x+=v[2*i];y+=v[2*i+1];const lon=x/q,lat=y/q;LL[2*i]=lon;LL[2*i+1]=lat;P[4*i]=Math.cos(lat*D2R);P[4*i+1]=Math.sin(lat*D2R);P[4*i+2]=Math.cos(lon*D2R);P[4*i+3]=Math.sin(lon*D2R)}
  // 不描邊的邊：沿著換日線切開的邊、南極點封口的邊
  const at180=l=>Math.abs(((l%360)+540)%360-180)>179.85;
  for(let i=0;i<m;i++){const j=(i+1)%m;if((at180(LL[2*i])&&at180(LL[2*j]))||(LL[2*i+1]<-89.5&&LL[2*j+1]<-89.5)||(LL[2*i+1]<-84&&LL[2*j+1]<-84&&at180(LL[2*i])!==at180(LL[2*j])&&Math.abs(LL[2*i]-LL[2*j])>90))NS[i]=1}
  let EB=null;if(eb&&eb[pi]&&eb[pi].length===m){EB=new Uint8Array(m);for(let i=0;i<m;i++)EB[i]=eb[pi].charCodeAt(i)-48}
  if(m>=3)out.push({n:m,P,NS,LL,EB})});return out}
function ringFromLL(pts){const m=pts.length;const P=new Float32Array(m*4),NS=new Uint8Array(m),LL=new Float32Array(m*2);pts.forEach(([lon,lat],i)=>{LL[2*i]=lon;LL[2*i+1]=lat;P[4*i]=Math.cos(lat*D2R);P[4*i+1]=Math.sin(lat*D2R);P[4*i+2]=Math.cos(lon*D2R);P[4*i+3]=Math.sin(lon*D2R)});return {n:m,P,NS,LL}}
// 國家的「等面積半徑」（度）：點擊判定用來比大小（小國才吸附）
function radOf(rings,c){let A=0;const k=Math.cos(c[1]*D2R);rings.forEach(r=>{let a=0,x0=null;const L=r.LL;const xs=[];for(let i=0;i<r.n;i++){let x=L[2*i];if(x0!=null){while(x-x0>180)x-=360;while(x-x0<-180)x+=360}x0=x;xs.push(x)}
  for(let i=0;i<r.n;i++){const j=(i+1)%r.n;a+=xs[i]*k*L[2*j+1]-xs[j]*k*L[2*i+1]}A+=Math.abs(a)/2});return Math.sqrt(A/Math.PI)}
let MAP=null;
function loadMap(){if(MAP)return MAP;MAP={cont:{},ctry:{},grat:[],ice:null,ocean:null,maxN:0};
 for(const k in CONT)MAP.cont[k]=decode(GEO.cont[k],GEO.q);
 for(const [k] of CT){const g=GEO.ctry[k==='ar2'?'ar':k];MAP.ctry[k]={rings:decode(g.r,g.q,g.e),c:g.c};MAP.ctry[k].rad=radOf(MAP.ctry[k].rings,g.c);
  // 離中心最遠的點（度）：畫輪廓時，整國都在地球背面就跳過
  let far=0;MAP.ctry[k].rings.forEach(r=>{for(let i=0;i<r.n;i++){const d=angD([r.LL[2*i],r.LL[2*i+1]],g.c);if(d>far)far=d}});MAP.ctry[k].far=far}
 // 經緯線（淡淡的）
 for(let lon=-180;lon<180;lon+=30){const a=[];for(let lat=-80;lat<=80;lat+=5)a.push([lon,lat]);MAP.grat.push(ringFromLL(a))}
 for(const lat of [-60,-30,0,30,60]){const a=[];for(let lon=-180;lon<=180;lon+=5)a.push([lon,lat]);MAP.grat.push(ringFromLL(a))}
 // 北極海冰（示意形狀）
 const ice=[];for(let lon=-180;lon<180;lon+=4){const r=lon*D2R;ice.push([lon,80.2+2.6*Math.sin(3*r+.7)+1.3*Math.sin(7*r+2.1)+.6*Math.sin(13*r)])}MAP.ice=ringFromLL(ice);
 // 洋的格子
 const rows=GEO.ocean.split('|');const g=new Int8Array(360*180);rows.forEach((row,j)=>{let i=0;row.split(',').forEach(run=>{const [n,l]=run.split('.');const nn=parseInt(n,36),ll=+l;for(let k=0;k<nn;k++)g[j*360+i+k]=ll;i+=nn})});MAP.ocean=g;
 // 洲和洲相接的邊（例如東經 60 度切開的歐亞、蘇伊士、巴拿馬）：不描海岸；畫的時候用一條同色細線蓋住接縫
 // 全世界的陸地國界（13:18 Albert）、E 樣式的國家深淺分組
 MAP.bord=decode(GEO.bord,GEO.q);MAP.bordF=decode(GEO.bordF,GEO.q);MAP.shade=(GEO.shade||[]).map(st=>decode(st,GEO.q));
 MAP.seam={};{const E=new Map(),ks=Object.keys(MAP.cont);const q=(r,i)=>Math.round(r.LL[2*i]*100)+','+Math.round(r.LL[2*i+1]*100);
  ks.forEach((k,ki)=>MAP.cont[k].forEach(r=>{for(let i=0;i<r.n;i++){const j=(i+1)%r.n,a=q(r,i),b=q(r,j);if(a===b)continue;const key=a<b?a+'|'+b:b+'|'+a;const o=E.get(key);
   if(!o){E.set(key,{ki,r,i});continue}if(o.ki===ki)continue;r.NS[i]=1;o.r.NS[o.i]=1;(MAP.seam[k]=MAP.seam[k]||[]).push(ringFromLL([[r.LL[2*i],r.LL[2*i+1]],[r.LL[2*j],r.LL[2*j+1]]]))}}))}
 const all=[];for(const k in MAP.cont)all.push(...MAP.cont[k]);for(const k in MAP.ctry)all.push(...MAP.ctry[k].rings);all.push(...MAP.grat,MAP.ice);all.forEach(r=>{if(r.n>MAP.maxN)MAP.maxN=r.n});
 return MAP}

/* ---------- 正射投影 ---------- */
const VW={lam:121,phi:22,zoom:1,cx:0,cy:0,R:100,w:0,h:0,dpr:1,cl:1,sl:0,cp:1,sp:0};
function setRot(){const l=VW.lam*D2R,p=VW.phi*D2R;VW.cl=Math.cos(l);VW.sl=Math.sin(l);VW.cp=Math.cos(p);VW.sp=Math.sin(p)}
function projLL(lon,lat){const cf=Math.cos(lat*D2R),sf=Math.sin(lat*D2R),cl=Math.cos(lon*D2R),sl=Math.sin(lon*D2R);
 const cd=cl*VW.cl+sl*VW.sl,sd=sl*VW.cl-cl*VW.sl;const x=cf*sd,y=VW.cp*sf-VW.sp*cf*cd,z=VW.sp*sf+VW.cp*cf*cd;return {X:VW.cx+VW.R*x,Y:VW.cy-VW.R*y,z}}
function unproj(px,py){const x=(px-VW.cx)/VW.R,y=(VW.cy-py)/VW.R;const rho=Math.hypot(x,y);if(rho>1)return null;if(rho<1e-9)return [VW.lam,VW.phi];
 const c=Math.asin(rho),sc=Math.sin(c),cc=Math.cos(c);const p0=VW.phi*D2R;
 const lat=Math.asin(cc*Math.sin(p0)+y*sc*Math.cos(p0)/rho);const lon=VW.lam*D2R+Math.atan2(x*sc,rho*cc*Math.cos(p0)-y*sc*Math.sin(p0));
 let L=lon/D2R;L=((L+540)%360)-180;return [L,lat/D2R]}
let SX=new Float32Array(16),SY=new Float32Array(16),SZ=new Float32Array(16);
function projRing(r){if(SX.length<r.n){SX=new Float32Array(r.n);SY=new Float32Array(r.n);SZ=new Float32Array(r.n)}
 const P=r.P,{cl,sl,cp,sp}=VW;let any=false,all=true;
 for(let i=0,k=0;i<r.n;i++,k+=4){const cf=P[k],sf=P[k+1],c=P[k+2],s=P[k+3];const cd=c*cl+s*sl,sd=s*cl-c*sl;SX[i]=cf*sd;SY[i]=cp*sf-sp*cf*cd;const z=sp*sf+cp*cf*cd;SZ[i]=z;if(z>0)any=true;else all=false}
 return any?(all?2:1):0}
// 把一個環畫進 fp（填色，含地平線上的弧）和 sp（描邊，不畫地平線、不畫切開的邊）
// tol（像素）：跟上一個畫出的點距離小於 tol 的點略過（效能：1:110m 的海岸點在小地球上很密；描邊是最花時間的一步）
function trace(r,fp,sp,tol){const st=projRing(r);if(!st)return;const n=r.n,cx=VW.cx,cy=VW.cy,R=VW.R,NS=r.NS;tol=tol||0;
 const X=i=>cx+R*SX[i],Y=i=>cy-R*SY[i];let lx=0,ly=0;
 if(st===2){lx=X(0);ly=Y(0);fp&&fp.moveTo(lx,ly);sp&&sp.moveTo(lx,ly);for(let i=1;i<=n;i++){const j=i%n,x=X(j),y=Y(j);
   if(tol&&i<n&&!NS[i-1]&&!NS[j]&&Math.abs(x-lx)<tol&&Math.abs(y-ly)<tol)continue;lx=x;ly=y;
   fp&&i<n&&fp.lineTo(x,y);if(sp){if(NS[i-1])sp.moveTo(x,y);else sp.lineTo(x,y)}}fp&&fp.closePath();return}
 let s=0;while(SZ[s]<=0)s++;lx=X(s);ly=Y(s);fp&&fp.moveTo(lx,ly);sp&&sp.moveTo(lx,ly);let ea=0;
 for(let k=1;k<=n;k++){const i=(s+k)%n,j=(s+k-1)%n;const zi=SZ[i],zj=SZ[j];
  if(zj>0&&zi>0){const x=X(i),y=Y(i);if(tol&&k<n&&!NS[j]&&!NS[i]&&SZ[(i+1)%n]>0&&Math.abs(x-lx)<tol&&Math.abs(y-ly)<tol)continue;lx=x;ly=y;
   fp&&fp.lineTo(x,y);if(sp){if(NS[j])sp.moveTo(x,y);else sp.lineTo(x,y)}}
  else if(zj>0||zi>0){const t=zj/(zj-zi);let x=SX[j]+(SX[i]-SX[j])*t,y=SY[j]+(SY[i]-SY[j])*t;const l=Math.hypot(x,y)||1;x/=l;y/=l;const hx=cx+R*x,hy=cy-R*y;
   if(zj>0){fp&&fp.lineTo(hx,hy);if(sp&&!NS[j])sp.lineTo(hx,hy);ea=Math.atan2(-y,x);lx=hx;ly=hy}
   else{const a=Math.atan2(-y,x);let d=a-ea;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;fp&&fp.arc(cx,cy,R,ea,ea+d,d<0);fp&&fp.lineTo(X(i),Y(i));lx=X(i);ly=Y(i);if(sp){sp.moveTo(hx,hy);if(NS[j])sp.moveTo(X(i),Y(i));else sp.lineTo(X(i),Y(i))}}}}
 fp&&fp.closePath()}
// 國家輪廓（2026-11-25）：把一個環看得到的邊，照分類分別畫進 ps[0]（海岸）、ps[1]（陸地相接）、ps[2]（幾乎看不見）。
// 跨過地平線的邊不畫；tol（像素）內太密的點略過（同一段最後一點一定畫到）
function outlineRing(r,ps,tol){if(!projRing(r))return;const n=r.n,cx=VW.cx,cy=VW.cy,R=VW.R,NS=r.NS,EB=r.EB;tol=tol||0;
 let cur=-1,lx=0,ly=0,px=0,py=0,pend=false;
 const flush=()=>{if(pend){ps[cur].lineTo(px,py);pend=false}};
 for(let i=0;i<n;i++){const j=i+1<n?i+1:0;const cls=EB?EB[i]:0;
  if(NS[i]||SZ[i]<=0||SZ[j]<=0||!ps[cls]){if(cur>=0)flush();cur=-1;continue}
  const x=cx+R*SX[j],y=cy-R*SY[j];
  if(cls!==cur){if(cur>=0)flush();cur=cls;lx=cx+R*SX[i];ly=cy-R*SY[i];ps[cls].moveTo(lx,ly)}
  if(tol&&Math.abs(x-lx)<tol&&Math.abs(y-ly)<tol){px=x;py=y;pend=true;continue}
  ps[cls].lineTo(x,y);lx=x;ly=y;pend=false}
 if(cur>=0)flush()}
function polyline(r,p){projRing(r);const cx=VW.cx,cy=VW.cy,R=VW.R;let on=false;for(let i=0;i<r.n;i++){if(SZ[i]>0.02){const x=cx+R*SX[i],y=cy-R*SY[i];if(on)p.lineTo(x,y);else p.moveTo(x,y);on=true}else on=false}}
const angD=(a,b)=>{const f1=a[1]*D2R,f2=b[1]*D2R,dl=(a[0]-b[0])*D2R;return Math.acos(Math.max(-1,Math.min(1,Math.sin(f1)*Math.sin(f2)+Math.cos(f1)*Math.cos(f2)*Math.cos(dl))))/D2R};
function twNear(ll){if(angD(ll,[121,23.7])<=1.2)return true;const r=MAP.ctry.tw.rings;for(const g of r){for(let i=0;i<g.n;i++){if(angD(ll,[g.LL[2*i],g.LL[2*i+1]])<=0.5)return true}}return false}
function pathOf(rings){const p=new Path2D();rings.forEach(r=>trace(r,p,null));return p}

/* ---------- 語音：只念有錄音的 ---------- */
const P5=window.__P5||null;
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const ht=t=>{try{return typeof heroT==='function'?heroT(t):t}catch(e){return t}};
const has=p=>{try{if(typeof VO==='undefined'||!VO.idx)return false;const u=ht(String(p)).trim();return voHas('z|'+u)||voHas('z|'+voCk(u))}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&has(p));if(!a.length)return Promise.resolve(false);const q=[];a.forEach((t,i)=>{if(i)q.push({pause:200});q.push(t)});
 try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
function gems(key){if(P5&&typeof P5.gems==='function')return P5.gems(key);const first=V2[key]!==today();V2[key]=today();try{save2()}catch(e){}const n=first?3:1;S.wallet+=n;save();try{renderBar()}catch(e){}sfx('gem');return n}
const sv=()=>{try{save2()}catch(e){}};
const seen=()=>{const o=V2.gl8seen;return o&&typeof o==='object'?o:(V2.gl8seen={})};

/* ---------- 開放條件 ---------- */
const STAGE7=()=>window.__S7STAGE||'stage9';
const NEED=41;
// 5.4.0（Albert 11/24）：不再賣 stage9；App 有「完整版」full 就開，stage9 只是以防萬一（例如兌換碼）還認得。不向商店查 stage9
const appOK=()=>{try{if(typeof IS_APP==='undefined'||!IS_APP)return true;if(typeof iapOwned==='function'&&iapOwned().includes('full'))return true;return typeof stageOpen==='function'&&!!stageOpen(STAGE7())}catch(e){return false}};
const webOK=()=>{try{return typeof s3Ok==='function'?!!s3Ok():true}catch(e){return true}};
function gate(){if(!((S.chDone||0)>=NEED))return 'ch';if(!appOK())return 'app';if(!webOK())return 'pw';return ''}

/* ---------- 卡片圖示（64×64）：放在架子上的小地球，台灣一顆星 ---------- */
const ICON8=`<circle cx="32" cy="32" r="28" fill="#E4F1FF"/><path d="M20 56 H44 M32 50 V56" stroke="#B5793F" stroke-width="4" stroke-linecap="round"/><path d="M12 30 A20 20 0 0 0 50 40" stroke="#C8962E" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="31" cy="29" r="17" fill="#4E9BE8"/><path d="M20 20 Q26 14 32 18 Q30 24 24 26 Q19 25 20 20Z" fill="#F7C873"/><path d="M34 30 Q42 28 44 34 Q40 42 34 40 Q31 35 34 30Z" fill="#8FD68A"/><path d="M22 34 Q26 32 27 37 Q24 41 21 38Z" fill="#F5A66E"/>
<circle cx="31" cy="29" r="17" fill="url(#gl8ic)"/><path d="M39 18 l1.6 3.4 3.6 .4 -2.7 2.4 .8 3.6 -3.3 -1.9 -3.3 1.9 .8 -3.6 -2.7 -2.4 3.6 -.4Z" fill="#FFE27A" stroke="#fff" stroke-width="1"/>
<defs><radialGradient id="gl8ic" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#14306A" stop-opacity=".35"/></radialGradient></defs>`;
try{ICONART['i:globe8']=`<svg viewBox="0 0 64 64" aria-hidden="true">${ICON8}</svg>`}catch(e){console.log('icon globe8',e)}
try{UXPD.globe8='轉地球，認識世界'}catch(e){}
const PICSVG=k=>{try{return `<svg viewBox="0 0 100 100" aria-hidden="true">${PIC[k]()}</svg>`}catch(e){return ''}};

/* ---------- 遊樂園：卡片、分區、寶石上限 ---------- */
const SUB_OK='轉地球，認識世界',SUB_CH='完成第四十一章就會打開';
function mkCard(g){if(!g||g.querySelector('[data-k="globe8"]'))return;const st=gate(),lk=st==='ch'||st==='app';
 const after=g.querySelector('[data-k="vine6"]')||g.querySelector('[data-k="chef5"]')||g.querySelector('[data-k="fossil26"]');
 const b=document.createElement('button');b.className='pcard'+(lk?' lockd':'');b.dataset.k='globe8';b.dataset.page='nature';b.style.setProperty('--dl','.84s');
 b.innerHTML=`<span class="pic">${art('i:globe8')}</span><b>地球儀</b><span>${st==='ch'?SUB_CH:SUB_OK}</span>${lk?`<span class="lk">${ICON.lock('#FFD98A')}</span>`:''}`;
 // 大門（m99zx4）已經分好區了：自己標上「小遊戲」，不在那一區就先藏起來
 b.dataset.gz='games';try{const gz=window.__gate;if(gz&&document.querySelector('#screen>.park.gzon')&&gz.cur!=='games')b.classList.add('gzoff')}catch(e){}
 g.insertBefore(b,after?after.nextSibling:null)}
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{globe8:'games'});X.gemDay=Object.assign(X.gemDay||{},{globe8:'globe8Day'});X.newest=['globe8'].concat(X.newest||[]);
 // 遊樂園分頁（小遊戲區的「大自然」頁）：5.3.1 還沒有分頁，先記下來給之後的分頁用
 X.pages=Object.assign(X.pages||{},{globe8:'nature'})}catch(e){}
// 大門每次排卡片前會讀 __gateExt：在那個時間點先把卡片放進去，「繼續玩」的「新」才看得到（跟收集冊 book19 同一招，包在外面）
try{const d=Object.getOwnPropertyDescriptor(window,'__gateExt');const fix=()=>{try{if(S.screen==='park')mkCard(document.querySelector('#screen>.park>.pgrid'))}catch(e){}};
 if(d&&d.get){Object.defineProperty(window,'__gateExt',{configurable:true,get(){fix();return d.get.call(window)},set(v){d.set&&d.set.call(window,v)}})}
 else{let X=window.__gateExt;Object.defineProperty(window,'__gateExt',{configurable:true,get(){fix();return X},set(v){X=v}})}}catch(e){console.log('gl8 ext',e)}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{mkCard($('#screen>.park>.pgrid')||$('.pgrid'));try{window.__parklock&&__parklock.fixCards()}catch(_){}}catch(e){console.log('park globe8',e)}return r}}
try{PARKS.push('globe8')}catch(e){}
let pick8=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="globe8"]');if(!c)return;if(c.dataset.applk==='1')return;
 e.stopImmediatePropagation();e.preventDefault();const st=gate();const shake=()=>{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')};
 if(st==='ch'){hush();sayR([T.lock41]);shake();return}
 if(st==='app'){hush();sayR([T.lockApp]);shake();return}
 V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen.globe8=(V2.parkSeen.globe8||0)+1;sv();sfx('pop');S.from='park';hush();go('globe8')};
 const tryEnter=()=>{if(st==='pw'&&typeof window.__s3Gate==='function')return window.__s3Gate(enter);enter()};
 if((V2.parkSeen.globe8||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pick8<8000))return tryEnter();
 const g=c.parentNode;$$('.pcard.uxsel',g).forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pick8=Date.now();sfx('pop');hush();sayR([T.card,T.again])}catch(_){}},true);

/* ---------- 收集冊「地球儀」一頁（book19 的 add 介面） ---------- */
function bookReg(){try{const B=window.__book19;if(!B||typeof B.add!=='function')return false;
 const item=k=>{const got=!!seen()[k];return {k:'gl8_'+k,got,name:NAME(k),pic:PICSVG(k),hint:['g8'],lockV:T.b_lock,voice:[T['s_'+k]||NAME(k)]}};
 const GR=[['亞洲','as'],['歐洲','eu'],['美洲',['na','sa']],['非洲','af'],['大洋洲','oc']];
 B.add({id:'globe8',n:'地球儀',ic:()=>`<svg viewBox="3 2 58 58" aria-hidden="true">${ICON8}</svg>`,line:T.b_sec,groups:()=>{
  const gs=GR.map(([t,c])=>({title:t,items:CT.filter(([,cc])=>Array.isArray(c)?c.includes(cc):cc===c).map(([k])=>item(k))}));
  gs.push({title:'南極和北極',items:['an','arc'].map(item)});return gs}});return true}catch(e){console.log('gl8 book',e);return false}}
if(!bookReg()){let n=0;const iv=setInterval(()=>{if(bookReg()||++n>40)clearInterval(iv)},250)}

/* ---------- 畫面 ---------- */
const DN={easy:'簡單',mid:'中等',hard:'高難度'};
const GS={diff:null,mode:'free',opened:false};
let gTok=0;
SCREENS.globe8=function(){const g0=gate();if(g0==='ch'||g0==='app'){setTimeout(()=>{try{go('park')}catch(e){}},0);return}const tok=++gTok;const live=()=>tok===gTok&&S.screen==='globe8';const calm=RM();loadMap();
 if(!GS.diff)GS.diff=DN[S.diff]?S.diff:'mid';GS.mode='free';
 let pet='';try{pet=petSVG(S.look.pet,S.look.petacc)}catch(e){}
 screen.innerHTML=`<div class="gl8${calm?' calm':''}"><div class="phead"><button class="btn2 small" id="pback">回遊樂園</button><h2 class="gtitle">地球儀</h2><span class="phsp"></span></div>
  <div class="gl8st" id="gl8st"><canvas id="gl8cv" aria-label="地球儀：用手指轉一轉，點一下聽名字"></canvas>
   <p class="gl8bub" id="gl8bub" aria-live="polite"></p>
   <div class="gl8pet" id="gl8pet" aria-hidden="true">${pet}</div>
   <div class="gl8dots" id="gl8dots" hidden></div>
   <button class="gl8find" id="gl8find" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="#BFE6FF" stroke="#2C2674" stroke-width="2.4"/><path d="M15 15 L21 21" stroke="#2C2674" stroke-width="3" stroke-linecap="round"/></svg><b>找找看</b></button>
   <div class="gl8ctl"><button type="button" id="gl8tw" aria-label="回到台灣"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 l2.7 5.6 6.1 .8 -4.5 4.2 1.1 6 -5.4 -2.9 -5.4 2.9 1.1 -6 -4.5 -4.2 6.1 -.8Z" fill="#FFD84A" stroke="#C8901E" stroke-width="1.4" stroke-linejoin="round"/></svg></button>
    <button type="button" id="gl8in" aria-label="放大">＋</button><button type="button" id="gl8out" aria-label="縮小">－</button></div>
   <div class="gl8card" id="gl8card" hidden></div><div class="gl8tags" id="gl8tags"></div></div>
  <div class="gl8menu" id="gl8menu" hidden><div class="gl8mc">
   <div class="gl8mh"><span class="gl8mi">${art('i:globe8')}</span><div><b>找找看</b><small>聽一聽，在地球上找一找！</small></div></div>
   <div class="gl8lab">難度</div><div class="gl8row" id="gl8diffs"><button class="gl8opt" data-v="easy"><b>簡單</b><small>七大洲、台灣</small></button><button class="gl8opt" data-v="mid"><b>中等</b><small>再加五大洋</small></button><button class="gl8opt" data-v="hard"><b>高難度</b><small>再加 ${CT.length-1} 個國家</small></button></div>
   <div class="gl8mb"><button class="btn2" id="gl8cancel">自由轉</button><button class="btn" id="gl8go">出發！</button></div></div></div></div>`;
 const root=$('.gl8'),st=$('#gl8st'),cv=$('#gl8cv'),bub=$('#gl8bub'),petEl=$('#gl8pet'),dots=$('#gl8dots'),card=$('#gl8card'),tags=$('#gl8tags'),menu=$('#gl8menu'),findB=$('#gl8find');
 const ctx=cv.getContext('2d');
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const tell=(t,parts)=>{bub.textContent=ht(t);bub.classList.remove('off');petHop();return sayR(parts||[t])};
 const petHop=()=>{if(calm)return;petEl.classList.remove('hop');void petEl.offsetWidth;petEl.classList.add('hop')};
 /* ---- 版面 ---- */
 let land=false,raf=0,dirty=true;const FX={sel:null,hint:null,anim:null,vel:null,ripple:null};
 function layout(){const w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;const dpr=Math.min(window.devicePixelRatio||1,S.lite?1:2);
  cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);cv.style.width=w+'px';cv.style.height=h+'px';
  land=w>h*1.15;root.classList.toggle('land',land);
  const base=land?Math.min(h*.43,w*.31):Math.min(w*.47,h*.36);
  VW.w=w;VW.h=h;VW.dpr=dpr;VW.base=base;VW.R=base*VW.zoom;VW.cx=w/2;VW.cy=land?h*.53:h*.47;
  root.style.setProperty('--gm',Math.max(0,(w-2*base)/2)+'px');root.classList.remove('gl8shift');GRD=null;if(!card.hidden)fitCard(true);need()}
 const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>{if(!live()){ro.disconnect();return}layout()}):null;if(ro)ro.observe(st);else addEventListener('resize',()=>{if(live())layout()});
 /* ---- 畫 ----
  * 效能（5.4.0 UX 審查「建議 1」，2026-11-24）：
  *  - 地球沒動（只有發光、點一下的漣漪、提示在閃）時，底圖（海、陸地、台灣）用快取的圖，不重新投影、不重新描海岸；
  *  - 在動時直接畫在畫面上，不多一次搬圖；
  *  - 海岸線在小地球上很密：跟上一個點不到 TOL 像素的點略過（描邊是最花時間的一步）；
  *  - 拿掉每一洲各描一次的細邊（改成只描洲和洲相接的那幾段，避免接縫）；大氣光暈只畫外圈；
  *  - 不用 shadowBlur：台灣星星做成小圖重用，發光改成寬的半透明線。 */
 const TOL=.8,TOLM=1.6,SMALL=16;

 // 國家輪廓開關（預設開）：window.__GL8_OUTLINE=false 關掉
 const OLON=()=>window.__GL8_OUTLINE!==false;
 const OLW=()=>1.1+.25*(VW.zoom-1);// 線寬：原尺寸 1.1px，放大到 2.6 倍時 1.5px
 // 只要海岸（國界改由全世界的國界線畫）
 function outlines(tol){const ps=[new Path2D(),null,null,null];const vc=[VW.lam,VW.phi];
  for(const [k] of CT){if(k==='tw')continue;const m=MAP.ctry[k];if(angD(vc,m.c)>90+m.far)continue;m.rings.forEach(r=>outlineRing(r,ps,tol))}return ps}
 let GRD=null,SPR=null,LY=null,prevLK='';const BC={cv:null,c:null,key:''};
 // 漸層（大氣光暈＋海、左上亮右下暗＋地球外框）先畫成圖，之後每幀只搬圖；大小只取地球跟畫面重疊的那塊。縮放中（大小一直變）就直接畫
 function lyKey(){return [VW.R.toFixed(3),VW.cx,VW.cy,VW.w,VW.h,VW.dpr].join()}
 function layers(){const key=lyKey();if(LY&&LY.key===key)return LY;dropLayers();const {cx,cy,R,dpr,w,h}=VW;const G=grads(),TAU=Math.PI*2;
  const mk=r=>{const x0=Math.max(0,Math.floor(cx-r)),y0=Math.max(0,Math.floor(cy-r)),x1=Math.min(w,Math.ceil(cx+r)),y1=Math.min(h,Math.ceil(cy+r));
   const c=document.createElement('canvas');c.width=Math.max(1,Math.round((x1-x0)*dpr));c.height=Math.max(1,Math.round((y1-y0)*dpr));const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,-x0*dpr,-y0*dpr);return {c,x,x0,y0,w:Math.max(1,x1-x0),h:Math.max(1,y1-y0)}};
  const U=mk(R*1.12+2);paintUnder(U.x);const O=mk(R+2);paintOver(O.x);return LY={key,U,O}}
 function dropLayers(){if(LY){LY.U.c.width=LY.O.c.width=0}LY=null}
 function paintUnder(c){const {cx,cy,R}=VW,G=grads(),TAU=Math.PI*2;
  // 大氣光暈：只畫海外面那一圈（裡面會被海蓋住）
  c.fillStyle=G.atm;c.beginPath();c.arc(cx,cy,R*1.12,0,TAU);c.moveTo(cx+R*.97,cy);c.arc(cx,cy,R*.97,0,TAU);c.fill('evenodd');
  c.fillStyle=G.sea;c.beginPath();c.arc(cx,cy,R,0,TAU);c.fill()}
 function paintOver(c){const {cx,cy,R}=VW,G=grads(),TAU=Math.PI*2;
  // 光影（左上亮、右下暗）＋外框
  c.fillStyle=G.lit;c.beginPath();c.arc(cx,cy,R,0,TAU);c.fill();
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=2;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke()}
 function useLayers(){const k=lyKey(),ok=(LY&&LY.key===k)||k===prevLK;prevLK=k;return ok?layers():null}
 function grads(){if(GRD)return GRD;const {cx,cy,R}=VW;const g={};
  g.sea=ctx.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);g.sea.addColorStop(0,'#7FD0FF');g.sea.addColorStop(.6,'#3F92E2');g.sea.addColorStop(1,'#2563BE');
  g.atm=ctx.createRadialGradient(cx,cy,R*.96,cx,cy,R*1.12);g.atm.addColorStop(0,'rgba(170,225,255,.65)');g.atm.addColorStop(1,'rgba(170,225,255,0)');
  g.lit=ctx.createRadialGradient(cx-R*.38,cy-R*.42,0,cx-R*.1,cy-R*.1,R*1.35);g.lit.addColorStop(0,'rgba(255,255,255,.32)');g.lit.addColorStop(.42,'rgba(255,255,255,0)');g.lit.addColorStop(.78,'rgba(12,24,80,.10)');g.lit.addColorStop(1,'rgba(12,24,80,.42)');
  return GRD=g}
 const t0=performance.now();
 // 底圖：大氣光暈、海、經緯線、北極海冰、陸地、台灣（每一個都在地球圓裡，不用 clip）
 function drawBase(c,L,tol){const {cx,cy,R,dpr}=VW;const G=grads();c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,VW.w,VW.h);const TAU=Math.PI*2;
  // 大氣光暈＋海（先畫好的圖）
  if(L)c.drawImage(L.U.c,L.U.x0,L.U.y0,L.U.w,L.U.h);else paintUnder(c);
  if(!S.lite){const gp=new Path2D();MAP.grat.forEach(r=>polyline(r,gp));c.strokeStyle='rgba(255,255,255,.14)';c.lineWidth=1;c.stroke(gp)}
  const ip=new Path2D();trace(MAP.ice,ip,null,tol);c.fillStyle='rgba(238,248,255,.94)';c.fill(ip);c.strokeStyle='rgba(190,222,248,.9)';c.lineWidth=1.4;c.stroke(ip);
  // 陸地：先描一圈淡白色海岸（洲和洲相接的邊不描），再填洲的顏色
  const shore=new Path2D(),seam=new Path2D(),fills={};for(const k in MAP.cont){const fp=new Path2D();MAP.cont[k].forEach(r=>trace(r,fp,shore,tol));fills[k]=fp}
  c.lineJoin='round';c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=Math.max(1.2,R*.012-.8);c.stroke(shore);
  for(const k in fills){c.fillStyle=CONT[k][0];c.fill(fills[k],'evenodd')}
  // 相鄰國家亮度差一點點（約 ±6%），洲的色系不變：國家分成 5 組（相鄰的一定不同組），一組用原色、其他 4 組各蓋一層淡淡的亮或暗
  if(OLON()){const OV=['rgba(255,255,255,.12)','rgba(40,20,60,.06)','rgba(255,255,255,.06)','rgba(40,20,60,.10)'];MAP.shade.forEach((rs,i)=>{const p=new Path2D();rs.forEach(r=>trace(r,p,null,tol));c.fillStyle=OV[i];c.fill(p)})}
  // 洲和洲相接的地方：用後畫那一洲的顏色描一條細線蓋住接縫（不是國界）
  for(const k in MAP.seam){const p=new Path2D();MAP.seam[k].forEach(r=>polyline(r,p,0));c.strokeStyle=CONT[k][0];c.lineWidth=1;c.stroke(p)}
  c.strokeStyle='rgba(170,200,230,.9)';c.lineWidth=1;c.stroke(fills.an);
  // 國家輪廓和國界（2026-11-25 Albert 13:21 定案「E」）：
  //  - 全世界的陸地國界：白色細實線（0.6 透明、1px，放大時跟著變粗）；有爭議的（喀什米爾三段、摩洛哥–西撒哈拉）幾乎看不見；克里米亞那段不畫
  //  - 介紹國家的海岸：白色實線（地球在轉的時候不另外描，海岸本來就有一圈白色岸邊）
  //  - 相鄰國家的底色亮暗交替（上面填色那一段）
  if(OLON()){const mv=tol>TOL,z=Math.sqrt(VW.zoom);c.lineJoin='round';c.lineWidth=OLW();
   if(!mv){c.strokeStyle='rgba(255,255,255,.5)';c.stroke(outlines(tol)[0])}
   const bp=new Path2D(),fp=new Path2D();MAP.bord.forEach(r=>polyline(r,bp));MAP.bordF.forEach(r=>polyline(r,fp));
   c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=1;c.stroke(fp);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=z;c.stroke(bp)}
  // 台灣：1:50m 島形＋光圈
  const tw=projLL(121,23.7);
  if(tw.z>0){const tp=pathOf(MAP.ctry.tw.rings);const hr=Math.max(9,R*.05);c.save();c.beginPath();c.arc(cx,cy,R,0,TAU);c.clip();c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.arc(tw.X,tw.Y,hr*tw.z,0,TAU);c.fill();c.restore();
   c.fillStyle='#FFD36A';c.fill(tp);c.strokeStyle='#D8742A';c.lineWidth=1.3;c.stroke(tp)}}
 // 台灣的星星（＋自由轉時的「台灣」兩個字）：做成小圖重用，不每次算 shadowBlur
 function starSpr(s,lab){const fs=Math.round(Math.max(13,Math.min(18,VW.R*.06)));let fk='';try{fk=document.fonts?document.fonts.status+document.fonts.size:''}catch(e){}
  const key=[s.toFixed(2),lab?1:0,fs,VW.dpr,fk].join();if(SPR&&SPR.key===key)return SPR;
  const d=VW.dpr,pad=12,font=`bold ${fs}px 'Huninn',sans-serif`;const c0=document.createElement('canvas');let x=c0.getContext('2d');x.font=font;const tw=lab?x.measureText('台灣').width+6:0;
  const W=Math.ceil(pad+2*s+(lab?s*.1+tw:0)+pad),H=Math.ceil(2*Math.max(s,fs*.75)+2*pad);c0.width=Math.ceil(W*d);c0.height=Math.ceil(H*d);x=c0.getContext('2d');x.setTransform(d,0,0,d,0,0);
  const sx=pad+s,sy=H/2;x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?s*.45:s;x.lineTo(sx+Math.cos(a)*rr,sy+Math.sin(a)*rr)}x.closePath();
  x.fillStyle='#FFD84A';x.shadowColor='rgba(255,230,120,.9)';x.shadowBlur=8*d;x.fill();x.shadowBlur=0;x.strokeStyle='#fff';x.lineWidth=1.6;x.stroke();
  if(lab){x.font=font;x.textBaseline='middle';x.lineWidth=4;x.lineJoin='miter';x.strokeStyle='rgba(40,30,100,.85)';x.strokeText('台灣',sx+s*1.1,sy);x.fillStyle='#FFF6D0';x.fillText('台灣',sx+s*1.1,sy)}
  return SPR={key,cv:c0,ox:sx,oy:sy,w:W,h:H}}
 function baseKey(){return [VW.lam.toFixed(4),VW.phi.toFixed(4),VW.R.toFixed(3),VW.cx,VW.cy,VW.w,VW.h,VW.dpr,S.lite?1:0,OLON()?1:0].join()}
 function dropCache(){if(BC.cv){BC.cv.width=0;BC.cv.height=0}BC.cv=null;BC.c=null;BC.key='';dropLayers();SPR=null}
 function draw(now){const {cx,cy,R,dpr}=VW;setRot();const G=grads();const TAU=Math.PI*2;
  const moving=!!(FX.anim||FX.vel||drag||pinch),key=baseKey(),L=useLayers();let direct=false;
  if(BC.key!==key){
   if(moving){drawBase(ctx,L,TOLM);BC.key='';direct=true}
   else{if(!BC.cv||BC.cv.width!==cv.width||BC.cv.height!==cv.height){if(!BC.cv)BC.cv=document.createElement('canvas');BC.cv.width=cv.width;BC.cv.height=cv.height;BC.c=BC.cv.getContext('2d')}drawBase(BC.c,L,TOL);BC.key=key}}
  if(!direct){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(BC.cv,0,0)}
  ctx.setTransform(dpr,0,0,dpr,0,0);
  // 點到的、提示的：發光（不用 shadowBlur）
  const glow=(fx,a)=>{if(!fx)return;const k=fx.k,kind=KIND(k);ctx.save();ctx.globalAlpha=a;
   if(kind==='ctry'||kind==='cont'||kind==='arc'){const rings=kind==='ctry'?MAP.ctry[k].rings:kind==='cont'?MAP.cont[k]:[MAP.ice];const p=new Path2D();let b=new Path2D(),b1=null;
    // 國家：輪廓變亮、變粗；陸地相接的國界也亮但淡一些；有爭議的國界不描（範圍看底色就好）
    if(kind==='ctry'){rings.forEach(r=>trace(r,p,null,TOL));const ps=[b,b1=new Path2D(),null,b1];rings.forEach(r=>outlineRing(r,ps,TOL))}else rings.forEach(r=>trace(r,p,b,TOL));
    ctx.fillStyle='rgba(255,255,255,.42)';ctx.fill(p,'evenodd');ctx.lineJoin='round';ctx.strokeStyle='rgba(255,242,160,.5)';ctx.lineWidth=kind==='ctry'?7:8;ctx.stroke(b);ctx.strokeStyle='#FFFFFF';ctx.lineWidth=kind==='ctry'?2.2:2.6;ctx.stroke(b);
    // 國界亮起：金黃色、比平常的虛線粗，一看就知道是這一國
    if(b1){ctx.strokeStyle='rgba(255,242,160,.55)';ctx.lineWidth=7;ctx.stroke(b1);ctx.strokeStyle='#FFD84A';ctx.lineWidth=3;ctx.stroke(b1)}
    // 台灣、新加坡、在畫面上很小的國家：外面再畫一圈，才看得到
    if(kind==='ctry'){const I=ctrInfo(k);if(I.p.z>0&&(k==='tw'||k==='sg'||I.rad<SMALL)){ctx.strokeStyle='#FFF2A0';ctx.lineWidth=3;ctx.beginPath();ctx.arc(I.p.X,I.p.Y,Math.max(14,R*.06,I.rad+8),0,TAU);ctx.stroke()}}}
   else{const c=fx.at||oceanAt(k);const p=c&&projLL(c[0],c[1]);if(p&&p.z>0){const rr=R*.22;const g=ctx.createRadialGradient(p.X,p.Y,0,p.X,p.Y,rr);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.X,p.Y,rr,0,TAU);ctx.fill();
     ctx.strokeStyle='rgba(255,246,190,.95)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.X,p.Y,rr*.55,0,TAU);ctx.stroke()}}
   ctx.restore()};
  let live2=false;
  if(FX.sel||FX.hint||FX.ripple){ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.clip();
   if(FX.sel){const age=(now-FX.sel.t)/1000;const a=age<2.4?1:Math.max(0,1-(age-2.4)/.8);if(a<=0)FX.sel=null;else{glow(FX.sel,a*.9);live2=true}}
   if(FX.hint){const a=.55+.45*Math.sin((now-t0)/260);glow(FX.hint,a);live2=true}
   if(FX.ripple){const age=Math.max(0,(now-FX.ripple.t)/700);if(age>=1)FX.ripple=null;else{ctx.strokeStyle=`rgba(255,255,255,${(1-age).toFixed(2)})`;ctx.lineWidth=3;ctx.beginPath();ctx.arc(FX.ripple.x,FX.ripple.y,8+age*26,0,TAU);ctx.stroke();live2=true}}
   ctx.restore()}
  // 光影＋外框（先畫好的圖）
  if(L)ctx.drawImage(L.O.c,L.O.x0,L.O.y0,L.O.w,L.O.h);else paintOver(ctx);
  // 台灣的星星（畫在光影上面，才亮）；星星和字只畫在地球裡面（台灣轉到邊邊時不會跑出地球外）
  const tw=projLL(121,23.7);const s=Math.max(8,Math.min(15,R*.045)),sx=tw.X+s*1.25,sy=tw.Y-s*1.05;
  if(tw.z>0.2&&Math.hypot(sx-cx,sy-cy)<R-s){const sp=starSpr(s,GS.mode==='free');ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.clip();ctx.globalAlpha=Math.min(1,(tw.z-.2)*4);
   ctx.drawImage(sp.cv,sx-sp.ox,sy-sp.oy,sp.w,sp.h);ctx.restore()}
  return live2}
 let lastD=0;
 function loop(now){raf=0;if(!live()){dropCache();return}let more=false;
  // C2：只有提示在閃時，每秒畫 15 次就夠
  if(!dirty&&FX.hint&&!FX.anim&&!FX.vel&&!FX.sel&&!FX.ripple&&now-lastD<66){raf=requestAnimationFrame(loop);return}
  const A=FX.anim;if(A){const t=Math.min(1,(now-A.t)/A.d);const e=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;if(!A.cxOnly){VW.lam=A.l0+A.dl*e;VW.phi=A.p0+(A.p1-A.p0)*e}if(A.z1!=null){VW.zoom=A.z0+(A.z1-A.z0)*e;VW.R=VW.base*VW.zoom;GRD=null}if(A.cx1!=null){VW.cx=A.cx0+(A.cx1-A.cx0)*e;GRD=null}if(t>=1){FX.anim=null;A.done&&A.done()}else more=true}
  const V=FX.vel;if(V&&!drag){const dt=Math.min(50,now-V.t);V.t=now;VW.lam-=V.x*dt;VW.phi=clampP(VW.phi+V.y*dt);const k=Math.exp(-dt/420);V.x*=k;V.y*=k;if(Math.hypot(V.x,V.y)<.0025)FX.vel=null;else more=true}
  VW.lam=((VW.lam+540)%360)-180;
  if(dirty||more||FX.sel||FX.hint||FX.ripple){dirty=false;lastD=now;const g=draw(now);if(g)more=true}
  if(more&&!raf)raf=requestAnimationFrame(loop)}
 function need(){dirty=true;if(!raf)raf=requestAnimationFrame(loop)}
 const clampP=p=>Math.max(-82,Math.min(82,p));
 function panTo(lon,lat,ms,done,z){FX.vel=null;let dl=((lon-VW.lam+540)%360)-180;const p1=clampP(lat);const z1=z==null?null:Math.max(1,Math.min(2.6,z));
  if(calm||!ms){VW.lam+=dl;VW.phi=p1;if(z1!=null)setZoom(z1);need();done&&done();return}
  const ca=FX.anim&&FX.anim.cx1!=null?FX.anim.cx1:null;// 小卡造成的地球平移還沒走完：一起帶著走
  FX.anim={t:performance.now(),d:ms,l0:VW.lam,dl,p0:VW.phi,p1,z0:VW.zoom,z1,done,cx0:VW.cx,cx1:ca};need()}
 /* ---- 點到哪裡 ----
  * 2026-11-24（UX 審查 必修 3：小國家點不到）：
  *  - baseHit：照輪廓判定（台灣 M2 規則不變：點在其他陸地上不算台灣）。
  *  - hitAt（自由轉，也是點錯時念的名字）：在畫面上大的國家照輪廓；畫面上小的國家（等面積半徑 < SMALL 像素）用「離誰最近」分，
  *    不再用固定的圓互相蓋住。點在海上、離小國海岸 MSEA 像素內，或點在沒標名字的陸地上、離小國 MLAND 像素內，念最近的那一國。
  *    台灣只在海上吸附（M2：點在廈門、福州等陸地上念「亞洲」）。
  *  - judge（找找看）：題目優先。點在題目國家中心 max(22×√放大倍數, 國家半徑＋12) 像素內、或離它的海岸 EDGE 像素內，就算找到。
  *    台灣題只有點在海上或台灣島上才放寬（點在其他陸地上還是不算），海上的範圍放大到 30×√放大倍數 像素。 */
 function oceanAt(k){const o=OCN.find(x=>x[0]===k);if(!o)return null;return [o[1]==null?VW.lam:o[1],o[2]]}
 const MSEA=14,MLAND=8;
 function ctrInfo(k){const m=MAP.ctry[k],c=m.c;const p=projLL(c[0],c[1]);return {p,rad:m.rad*D2R*VW.R*Math.max(.25,p.z)}}
 function baseHit(x,y){const dx=x-VW.cx,dy=y-VW.cy;if(dx*dx+dy*dy>VW.R*VW.R)return null;setRot();
  ctx.setTransform(VW.dpr,0,0,VW.dpr,0,0);const px=x*VW.dpr,py=y*VW.dpr;
  // 台灣（2026-11-23 內容審查 M2）：點到台灣島本身＝台灣；放大的範圍只算海上，離台灣中心 1.2 度內、或離台灣海岸 0.5 度內。
  // 點到的地方如果在其他陸地裡（例如福建沿海），就不算台灣。
  const ll0=unproj(x,y);
  if(ll0&&angD(ll0,[121,23.7])<3.5){
   if(ctx.isPointInPath(pathOf(MAP.ctry.tw.rings),px,py,'evenodd'))return 'tw';
   const onLand=ctx.isPointInPath(pathOf(MAP.cont.as),px,py,'evenodd');
   // 1:110m 的亞洲輪廓裡也有一塊粗略的台灣：落在台灣島附近的小框裡就還是台灣（框內沒有大陸海岸）
   const twBox=ll0[0]>120.05&&ll0[0]<122.1&&ll0[1]>21.8&&ll0[1]<25.35;
   if((!onLand||twBox)&&twNear(ll0))return 'tw'}
  for(const [k] of CT){if(ctx.isPointInPath(pathOf(MAP.ctry[k].rings),px,py,'evenodd'))return k}
  for(const k in MAP.cont){if(ctx.isPointInPath(pathOf(MAP.cont[k]),px,py,'evenodd'))return k}
  const ll=unproj(x,y);if(!ll)return null;
  if(ctx.isPointInPath(pathOf([MAP.ice]),px,py))return 'arc';
  // 裏海（湖）：算亞洲
  if(ll[0]>46&&ll[0]<55.5&&ll[1]>36.5&&ll[1]<47.5)return 'as';
  const i=Math.min(359,Math.max(0,Math.floor(ll[0]+180))),j=Math.min(179,Math.max(0,Math.floor(90-ll[1])));const o=MAP.ocean[j*360+i];
  return OCN[o]?OCN[o][0]:'pa'}
 const isSea=k=>k==='pa'||k==='at'||k==='io'||k==='ar'||k==='so';
 function hitAt(x,y){const k0=baseHit(x,y);if(!k0)return null;
  if(CTOF[k0]&&k0!=='tw'&&ctrInfo(k0).rad>=SMALL)return k0;
  // 分數＝離那一國海岸幾像素（點在輪廓裡面＝-1）；特別小的（半徑不到 4px，例如新加坡、荷蘭）再減 4，旁邊的大國才不會把它吃掉
  const sea=isSea(k0)||k0==='arc',land=!!CONT[k0];let best=null,bs=1e9;
  for(const [k] of CT){const I=ctrInfo(k);if(I.p.z<.1)continue;let s;
   if(k===k0)s=-1;
   else{if(k==='tw'&&!sea)continue;const M=sea?MSEA:land?MLAND:0;
    // 大國不吸附（點海就念海），但要拿來比：離大國海岸比離小國近，就不吸附到小國（例如婆羅洲南邊的海不會變成馬來西亞）
    if(I.rad>=SMALL){if(!(sea||land)||Math.hypot(I.p.X-x,I.p.Y-y)-MAP.ctry[k].far*D2R*VW.R>M)continue;const e=edgeDist(MAP.ctry[k].rings,x,y);if(e>M)continue;s=e+.5;if(s<bs){bs=s;best=null}continue}
    if(Math.hypot(I.p.X-x,I.p.Y-y)-I.rad>M+40)continue;
    const e=Math.min(edgeDist(MAP.ctry[k].rings,x,y),Math.hypot(I.p.X-x,I.p.Y-y));if(e>M)continue;s=e-(I.rad<4?4:0)}
   if(s<bs){bs=s;best=k}}
  return best||k0}
 // 離一個地方的海岸（只算看得到的邊）最近幾像素
 function edgeDist(rings,x,y){let best=1e9;const cx=VW.cx,cy=VW.cy,R=VW.R;for(const r of rings){if(!projRing(r))continue;const n=r.n,NS=r.NS;
   for(let i=0;i<n;i++){const j=(i+1)%n;if(NS[i]||SZ[i]<=0||SZ[j]<=0)continue;const ax=cx+R*SX[i],ay=cy-R*SY[i],bx=cx+R*SX[j],by=cy-R*SY[j];
    const vx=bx-ax,vy=by-ay,l2=vx*vx+vy*vy;let t=l2?((x-ax)*vx+(y-ay)*vy)/l2:0;t=t<0?0:t>1?1:t;const d=Math.hypot(ax+vx*t-x,ay+vy*t-y);if(d<best)best=d}}return best}
 const EDGE=()=>Math.max(12,10*Math.sqrt(VW.zoom));
 function judge(x,y,want){const k=hitAt(x,y);if(!k)return {ok:false,k};if(!want||okHit(want,k,x,y))return {ok:okHit(want,k,x,y),k};
  // 點在另一個介紹的國家上：題目國家在畫面上夠大時不放寬；點在台灣島或台灣近海（M2 範圍）絕不算別的國家（例如中國題點台灣不算對）
  // 但題目國家不大（半徑 24px 以下，例如被中國、俄羅斯包住的蒙古）時，點在國界外 6px 內還算對（手指點歪一點點）
  if(CTOF[want]&&CTOF[k]&&k!==want&&(ctrInfo(want).rad>=SMALL||k==='tw'&&baseHit(x,y)==='tw')){
   if(k!=='tw'&&ctrInfo(want).rad<24&&edgeDist(MAP.ctry[want].rings,x,y)<=6)return {ok:true,k};return {ok:false,k}}
  if(CTOF[want]){const k0=want==='tw'?baseHit(x,y):k;
   if(want!=='tw'||isSea(k0)||k0==='tw'){const I=ctrInfo(want);
    if(I.p.z>.1&&Math.hypot(I.p.X-x,I.p.Y-y)<=Math.max((want==='tw'?30:22)*Math.sqrt(VW.zoom),I.rad+12))return {ok:true,k};
    if(edgeDist(MAP.ctry[want].rings,x,y)<=EDGE())return {ok:true,k}}}
  else if((CONT[want]||want==='arc')&&(isSea(k)||k==='arc')){if(edgeDist(want==='arc'?[MAP.ice]:MAP.cont[want],x,y)<=EDGE())return {ok:true,k}}
  return {ok:false,k}}
 /* ---- 手指：轉、甩、捏合、點 ---- */
 const ptr=new Map();let drag=false,down=null,pinch=null,hist=[];
 cv.addEventListener('pointerdown',e=>{if(!live())return;try{cv.setPointerCapture(e.pointerId)}catch(_){}ptr.set(e.pointerId,{x:e.offsetX,y:e.offsetY});FX.vel=null;if(FX.anim&&!FX.anim.lock){if(FX.anim.cx1!=null){VW.cx=FX.anim.cx1;GRD=null}FX.anim=null}
  if(ptr.size===1){down={x:e.offsetX,y:e.offsetY,t:performance.now(),lam:VW.lam,phi:VW.phi};drag=false;hist=[[performance.now(),e.offsetX,e.offsetY]]}
  else if(ptr.size===2){const [a,b]=[...ptr.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:VW.zoom};drag=true}});
 cv.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId)||!live())return;ptr.set(e.pointerId,{x:e.offsetX,y:e.offsetY});
  if(pinch&&ptr.size>=2){const [a,b]=[...ptr.values()];setZoom(pinch.z*(Math.hypot(a.x-b.x,a.y-b.y)||1)/pinch.d);return}
  if(!down)return;const dx=e.offsetX-down.x,dy=e.offsetY-down.y;if(!drag&&Math.hypot(dx,dy)>7)drag=true;
  if(drag){const k=57.3/VW.R;VW.lam=down.lam-dx*k;VW.phi=clampP(down.phi+dy*k);hist.push([performance.now(),e.offsetX,e.offsetY]);if(hist.length>8)hist.shift();need()}});
 const up=e=>{try{if(cv.hasPointerCapture&&cv.hasPointerCapture(e.pointerId))cv.releasePointerCapture(e.pointerId)}catch(_){}if(!ptr.has(e.pointerId))return;ptr.delete(e.pointerId);if(pinch){if(ptr.size<2)pinch=null;down=null;return}
  if(!down)return;const d=down;down=null;
  if(!drag){if(performance.now()-d.t<700)tap(d.x,d.y);return}
  const now=performance.now();let h=hist.filter(q=>now-q[0]<120);if(h.length<2&&hist.length>=2&&now-hist[hist.length-1][0]<350)h=hist.slice(-2);if(h.length>=2){const a=h[0],b=h[h.length-1],dt=Math.max(16,b[0]-a[0]);const k=57.3/VW.R;
   FX.vel={x:(b[1]-a[1])/dt*k,y:(b[2]-a[2])/dt*k,t:now};if(calm){FX.vel.x*=.5;FX.vel.y*=.5}need()}drag=false};
 cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 function setZoom(z){VW.zoom=Math.max(1,Math.min(2.6,z));VW.R=VW.base*VW.zoom;GRD=null;need()}
 $('#gl8in').onclick=()=>{sfx('pop');setZoom(VW.zoom*1.35)};$('#gl8out').onclick=()=>{sfx('pop');setZoom(VW.zoom/1.35)};
 $('#gl8tw').onclick=()=>{sfx('pop');hush();panTo(121,22,900);FX.sel={k:'tw',t:performance.now()+600};tell(T.hi_tw)};
 /* ---- 標籤、小卡 ---- */
 function tag(x,y,txt){const el=document.createElement('span');el.className='gl8tag';el.textContent=txt;el.style.left=x+'px';el.style.top=y+'px';tags.appendChild(el);
  while(tags.children.length>3)tags.firstChild.remove();setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),500)},1800)}
 function showCard(k){const sents=[T['s_'+k]];if(k==='an'||k==='arc')sents.push(T.fact_pole);
  card.innerHTML=`<button class="gl8x" type="button" aria-label="關閉">✕</button><div class="gl8pic">${PICSVG(k)}</div><div class="gl8txt"><b>${NAME(k)}</b>${sents.map((s,i)=>`<p${i?' class="gl8fact"':''}>${s}</p>`).join('')}${has(sents[0])?'<button class="gl8hear" type="button">再聽一次</button>':''}</div>`;
  card.hidden=false;root.classList.add('carded');card.classList.remove('in');void card.offsetWidth;card.classList.add('in');fitCard();
  card.querySelector('.gl8x').onclick=e=>{e.stopPropagation();closeCard()};const hb=card.querySelector('.gl8hear');if(hb)hb.onclick=()=>{hush();sayR(sents)};
  return sents}
 function closeCard(){card.hidden=true;root.classList.remove('carded');fitCard()}
 // 橫放時小卡在右邊：放不下（例如 iPhone SE 橫放，小卡 300px 寬）就把地球往左平移（鏡頭平移，不是縮放），小卡不蓋住地球；關掉小卡再移回中間。
 // 移的時候寵物先隱藏（不然會疊在地球上）
 function fitCard(now){if(!VW.w)return;let to=VW.w/2;
  if(root.classList.contains('land')&&!card.hidden){const left=card.offsetLeft;const R=VW.R;if(left>0&&VW.w/2+R+8>left)to=Math.max(R*.55,left-8-R)}
  root.classList.toggle('gl8shift',to<VW.w/2-1);if(Math.abs(to-VW.cx)<.5)return;
  if(now||calm){VW.cx=to;GRD=null;need();return}
  const A0=FX.anim;if(A0&&!A0.cx1){A0.cx0=VW.cx;A0.cx1=to;return}
  FX.anim={t:performance.now(),d:350,cxOnly:1,cx0:VW.cx,cx1:to};need()}
 /* ---- 點一下 ---- */
 function tap(x,y){if(!live())return;
  // 找找看：題目優先的寬鬆判定（judge）；點錯時念的是 hitAt 的結果
  if(GS.mode==='find'&&F){const want=F.q[F.i],j=judge(x,y,want);if(!j.k)return;FX.ripple={x,y,t:performance.now()};return findTap(j.ok?want:j.k,x,y)}
  const k=hitAt(x,y);if(!k)return;FX.ripple={x,y,t:performance.now()};
  if(GS.mode==='find')return findTap(k,x,y);
  hush();sfx('pop');FX.sel={k,t:performance.now(),at:unproj(x,y)};need();
  const nm=NAME(k);bub.textContent=nm;bub.classList.remove('off');petHop();tag(x,y,nm);
  if(HASCARD(k)){const fresh=!seen()[k];seen()[k]=1;sv();const s=showCard(k);if(fresh){try{burst(x+st.getBoundingClientRect().left,y+st.getBoundingClientRect().top,10,true)}catch(_){}}sayR(s)}
  else{closeCard();sayR([nm])}}
 /* ---- 找找看 ---- */
 let F=null;
 const POOL={easy:['as','eu','af','na','sa','oc','an','tw','arc'],oce:['pa','at','io','ar','so'],ctry:CT.map(c=>c[0]).filter(k=>k!=='tw')};
 function pickRound(diff){const sh=a=>shuffle(a);let q;
  if(diff==='easy')q=sh(POOL.easy).slice(0,5);
  else if(diff==='mid')q=sh(sh(POOL.oce).slice(0,2).concat(sh(POOL.easy).slice(0,3)));
  else q=sh(sh(POOL.ctry).slice(0,3).concat(sh(POOL.oce).slice(0,1),sh(POOL.easy).slice(0,1)));
  return q}
 // 俄羅斯橫跨歐亞：看點的地方在哪一洲；土耳其亞洲、歐洲都算
 const contHas=(c,x,y)=>{if(x==null)return false;ctx.setTransform(VW.dpr,0,0,VW.dpr,0,0);return ctx.isPointInPath(pathOf(MAP.cont[c]),x*VW.dpr,y*VW.dpr,'evenodd')};
 const okHit=(want,k,x,y)=>want===k||(want==='ar'&&k==='arc')||(!!CONT[want]&&!!CTOF[k]&&(k==='ru'?contHas(want,x,y):k==='tr'?(want==='as'||want==='eu'):CTOF[k]===want));
 function openMenu(){closeCard();menu.hidden=false;selD();hush();sayR([T.f_menu])}
 const selD=()=>$$('#gl8diffs .gl8opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===GS.diff));
 $$('#gl8diffs .gl8opt').forEach(b=>b.onclick=()=>{GS.diff=b.dataset.v;selD();sfx('pop');hush();sayR([T['d_'+GS.diff]]);need()});
 $('#gl8cancel').onclick=()=>{sfx('pop');menu.hidden=true;hush();if(GS.mode==='find')stopFind()};
 $('#gl8go').onclick=()=>{sfx('pop');menu.hidden=true;hush();startFind()};
 findB.onclick=()=>{sfx('pop');if(GS.mode==='find'){stopFind();return}openMenu()};
 function setFindBtn(){findB.querySelector('b').textContent=GS.mode==='find'?'自由轉':'找找看';findB.classList.toggle('on',GS.mode==='find')}
 function startFind(){GS.mode='find';closeCard();FX.sel=null;F={q:pickRound(GS.diff),i:0,miss:0,busy:false};dots.hidden=false;
  dots.innerHTML=F.q.map(()=>'<i></i>').join('');setFindBtn();need();tell(T.f_start,[T.f_start]).then(()=>later(ask,250))}
 function stopFind(){if(F&&F.zBack!=null)panTo(VW.lam,VW.phi,500,null,F.zBack);GS.mode='free';F=null;FX.hint=null;dots.hidden=true;setFindBtn();bub.textContent='';bub.classList.add('off');need()}
 function ask(){if(!F||!live())return;const k=F.q[F.i];F.miss=0;F.busy=false;FX.hint=null;$$('#gl8dots i').forEach((d,i)=>d.classList.toggle('now',i===F.i));
  const pol=POLAR[k];const q=T['q_'+k];const zb=F.zBack;F.zBack=null;// 上一題提示時鏡頭拉近了：拉回原來的大小
  if(pol){F.busy=true;bub.textContent=ht(q);bub.classList.remove('off');petHop();const lat=pol>0?58:-55;
   panTo(VW.lam,lat,1300,()=>{if(F)F.busy=false},zb);sayR([q,pol>0?T.f_top:T.f_bottom]);return}
  if(zb!=null)panTo(VW.lam,VW.phi,700,null,zb);
  tell(q)}
 function findTap(k,x,y){if(!F||F.busy)return;const want=F.q[F.i];hush();
  if(okHit(want,k,x,y)){F.busy=true;sfx('pop');try{tone(620+F.i*60,0,.16,'triangle',.08)}catch(_){}FX.hint=null;FX.sel={k:want,t:performance.now(),at:unproj(x,y)};need();
   if(HASCARD(want)){seen()[want]=1;sv()}
   const d=$$('#gl8dots i')[F.i];if(d){d.classList.add('on');try{burstEl(d,10)}catch(_){}}
   tag(x,y,NAME(want));const ok=[T.f_ok1,T.f_ok2,T.f_ok3][F.i%3];bub.textContent=ht(NAME(want)+'，'+ok);petHop();
   const extra=(want==='an'||want==='arc')?[T.fact_pole]:[];if(extra.length)bub.textContent=ht(NAME(want)+'，'+ok+' '+T.fact_pole);
   sayR([NAME(want),ok,...extra]).then(spoke=>later(next,spoke?400:(extra.length?2600:1500)));return}
  // 點錯：念出那裡的名字＋再找找看；第二次錯：轉過去、發光
  F.miss++;sfx('wrong');FX.sel={k,t:performance.now(),at:unproj(x,y)};need();tag(x,y,NAME(k));
  if(F.miss>=2){const c=CONT[want]?[CONT[want][1],CONT[want][2]]:CTOF[want]?MAP.ctry[want].c:want==='arc'?[VW.lam,84]:oceanAt(want);
   const lat=want==='an'||want==='so'?-58:want==='arc'||want==='ar'?60:c[1];F.busy=true;
   // 國家在畫面上太小：鏡頭一起拉近（等面積半徑放大到約 28 像素，最多 2.6 倍）；下一題再拉回來
   let z=null;if(CTOF[want]){const nz=28/(MAP.ctry[want].rad*D2R*VW.base);if(nz>VW.zoom*1.05){z=Math.min(2.6,nz);if(F.zBack==null)F.zBack=VW.zoom}}
   panTo(c[0],lat,1100,()=>{if(F)F.busy=false;FX.hint={k:want,at:want==='arc'?[c[0],86]:oceanAt(want)};need()},z);
   bub.textContent=ht(NAME(k)+'，'+T.f_hint);petHop();sayR([NAME(k),T.f_hint]);return}
  bub.textContent=ht(NAME(k)+'，'+T.f_again);petHop();sayR([NAME(k),T.f_again])}
 function next(){if(!F)return;F.i++;if(F.i>=F.q.length)return finish();ask()}
 async function finish(){const n=gems('globe8Day');try{confetti()}catch(e){}FX.hint=null;$$('#gl8dots i').forEach(d=>d.classList.remove('now'));
  bub.textContent=ht(T.f_end);petHop();await sayR([T.f_end,n>=3?T.gem3:T.gem1]);if(!live())return;
  later(()=>{stopFind();findB.querySelector('b').textContent='再找一次';bub.textContent=ht(n>=3?T.gem3:T.gem1);bub.classList.remove('off')},1200)}
 /* ---- 開場：轉到台灣 ---- */
 $('#pback').onclick=()=>{gTok++;cancelAnimationFrame(raf);raf=0;dropCache();hush();try{ro&&ro.disconnect()}catch(e){}go('park')};
 VW.zoom=1;VW.lam=GS.opened?121:1;VW.phi=GS.opened?22:8;layout();
 const opening=()=>{if(!live())return;if(!VW.R||!VW.w){layout()}panTo(121,22,calm?0:2400,()=>{FX.sel={k:'tw',t:performance.now()+1200};need()});
  later(()=>{tell(T.hi_tw).then(spoke=>later(()=>{if(GS.mode==='free'&&card.hidden&&menu.hidden)tell(T.tip)},spoke?300:2600))},calm?0:1300);GS.opened=true};
 later(opening,calm?0:350);need();
 window.__gl8={VW,FX,hitAt,tap:(x,y)=>tap(x,y),panTo,startFind,F:()=>F,menu:openMenu,need,setZoom,diff:d=>{GS.diff=d;need()},proj:(lon,lat)=>{setRot();return projLL(lon,lat)},judge,baseHit,ctr:k=>{setRot();const I=ctrInfo(k);return {X:I.p.X,Y:I.p.Y,z:I.p.z,rad:I.rad,c:MAP.ctry[k].c}},
  // 量效能用：連畫 n 幀（每幀換一個角度、強制畫完），回傳每幀毫秒
  bench:(n,hint,mv)=>{FX.hint=hint?{k:hint}:null;const a0=FX.anim;if(mv)FX.anim={bench:1};const t=performance.now();for(let i=0;i<n;i++){if(mv)VW.lam+=2.7;draw(performance.now());ctx.getImageData(0,0,1,1)}const ms=(performance.now()-t)/n;FX.anim=a0;FX.hint=null;need();return ms}};
};
const st=document.createElement('style');st.textContent=`
.gl8{position:relative;display:flex;flex-direction:column;height:100%;gap:6px;box-sizing:border-box;min-height:0}
.gl8st{position:relative;flex:1;min-height:280px;border-radius:22px;overflow:hidden;margin:0 6px;touch-action:none;user-select:none;-webkit-user-select:none;
 background:radial-gradient(120% 90% at 50% 40%,#3B3A9A 0%,#24205E 60%,#17143E 100%);box-shadow:0 4px 0 rgba(40,30,80,.18)}
.gl8st::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.8;background-image:radial-gradient(1.6px 1.6px at 12% 18%,#fff,transparent),radial-gradient(1.2px 1.2px at 82% 12%,#fff,transparent),radial-gradient(1.4px 1.4px at 70% 78%,#fff,transparent),radial-gradient(1.2px 1.2px at 24% 84%,#fff,transparent),radial-gradient(1.6px 1.6px at 92% 52%,#FFF3B0,transparent),radial-gradient(1.2px 1.2px at 6% 56%,#fff,transparent),radial-gradient(1.2px 1.2px at 46% 6%,#fff,transparent)}
#gl8cv{position:absolute;inset:0;display:block;touch-action:none;cursor:grab}
.gl8bub{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:max-content;max-width:min(calc(100% - 20px),560px);box-sizing:border-box;margin:0;padding:6px 16px;border-radius:18px;background:rgba(255,255,255,.94);color:#3A2A5A;font-size:clamp(16px,3.8vmin,22px);line-height:1.35;text-align:center;z-index:3;pointer-events:none;transition:opacity .3s}
.gl8bub:empty,.gl8bub.off{opacity:0}
.gl8pet{position:absolute;left:6px;bottom:4px;width:clamp(84px,21vmin,150px);z-index:2;pointer-events:none;transition:opacity .3s}
.gl8pet svg{width:100%;height:auto;display:block}
.gl8pet.hop{animation:gl8hop .5s ease-out}
@keyframes gl8hop{30%{transform:translateY(-12px)}60%{transform:translateY(0)}80%{transform:translateY(-4px)}}
.gl8find{position:absolute;left:0;right:0;margin:0 auto;width:max-content;bottom:10px;z-index:4;display:flex;align-items:center;gap:6px;min-height:48px;padding:4px 14px 4px 8px;border-radius:999px;border:3px solid #fff;background:linear-gradient(170deg,#FFE27A,#F7B43A);color:#3A2A55;font:inherit;font-size:17px;box-shadow:0 4px 0 rgba(0,0,0,.25);cursor:pointer}
.gl8find svg{width:28px;height:28px}.gl8find b{font-weight:400;white-space:nowrap}
.gl8find.on{background:linear-gradient(170deg,#BFE6FF,#7CB8F2)}
.gl8ctl{position:absolute;right:8px;bottom:8px;z-index:4;display:flex;flex-direction:column;gap:8px}
.gl8ctl button{width:48px;height:48px;border-radius:50%;border:3px solid rgba(255,255,255,.85);background:rgba(40,30,100,.78);color:#fff;font:inherit;font-size:24px;line-height:1;display:grid;place-items:center;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.25)}
.gl8ctl button svg{width:28px;height:28px}
.gl8dots{position:absolute;left:50%;bottom:72px;transform:translateX(-50%);display:flex;gap:6px;z-index:3;padding:5px 10px;border-radius:999px;background:rgba(20,16,60,.5)}
.gl8dots[hidden]{display:none}
.gl8dots i{width:22px;height:22px;border-radius:50%;border:2px dashed rgba(255,255,255,.7);box-sizing:border-box}
.gl8dots i.now{border-style:solid;border-color:#FFE27A;box-shadow:0 0 10px rgba(255,226,122,.8)}
.gl8dots i.on{border:0;background:radial-gradient(circle at 35% 30%,#FFF6C0,#FFC83A);box-shadow:0 0 8px rgba(255,214,90,.8)}
.gl8tags{position:absolute;inset:0;pointer-events:none;z-index:3}
.gl8tag{position:absolute;transform:translate(-50%,-140%);padding:3px 12px;border-radius:14px;background:#FFFDF2;color:#3A2A5A;font-size:clamp(15px,3.4vmin,20px);white-space:nowrap;box-shadow:0 3px 0 rgba(0,0,0,.25);transition:opacity .5s}
.gl8tag::after{content:'';position:absolute;left:50%;bottom:-7px;margin-left:-7px;border:7px solid transparent;border-top-color:#FFFDF2;border-bottom:0}
.gl8tag.out{opacity:0}
.gl8card{position:absolute;z-index:5;left:50%;bottom:10px;transform:translateX(-50%);width:min(94%,460px);box-sizing:border-box;display:flex;gap:10px;align-items:center;padding:10px 40px 10px 10px;border-radius:20px;background:#FFFDF6;color:#3A2A55;box-shadow:0 6px 0 rgba(0,0,0,.22)}
.gl8card[hidden]{display:none}
.gl8card.in{animation:gl8in .35s ease-out}
@keyframes gl8in{from{opacity:0;margin-bottom:-14px}to{opacity:1;margin-bottom:0}}
.gl8pic{flex:0 0 auto;width:clamp(84px,22vmin,120px);aspect-ratio:1}.gl8pic svg{width:100%;height:100%;display:block}
.gl8txt{min-width:0}.gl8txt b{display:block;font-weight:400;font-size:clamp(20px,4.6vmin,26px);line-height:1.2}
.gl8txt p{margin:3px 0 0;font-size:clamp(15px,3.4vmin,19px);line-height:1.4}.gl8txt p.gl8fact{font-size:clamp(13px,3vmin,16px);color:#6A5A8A}
.gl8hear{margin-top:6px;min-height:36px;padding:0 12px;border-radius:999px;border:2px solid #C8B8E8;background:#F4EEFF;color:#4A3A7A;font:inherit;font-size:14px;cursor:pointer}
.gl8x{position:absolute;right:6px;top:6px;width:34px;height:34px;border-radius:50%;border:0;background:#EEE6F8;color:#5A4A86;font-size:16px;cursor:pointer}
.gl8.carded:not(.land) .gl8pet,.gl8.carded:not(.land) .gl8ctl{opacity:0;pointer-events:none}
.gl8:not(.land) .gl8card{bottom:68px}
.gl8.land .gl8find{left:auto;right:8px;margin:0;bottom:auto;top:8px}.gl8.land .gl8dots{bottom:10px}
/* 橫放：小卡放右邊空白處，寵物在左邊（transform:none：2026-11-25 修正，原本沿用直式的 translateX(-50%)，小卡會往左偏半張、蓋到地球） */
.gl8.land .gl8card{left:auto;transform:none;right:64px;bottom:auto;top:max(66px,calc(50% - 150px));max-height:calc(100% - 74px);overflow:auto;width:clamp(150px,calc(var(--gm) - 70px),300px);flex-direction:column;align-items:stretch;text-align:center;padding:12px}
.gl8.land .gl8card.in{animation:gl8inr .35s ease-out}
@keyframes gl8inr{from{opacity:0;margin-right:-14px}to{opacity:1;margin-right:0}}
.gl8.land .gl8pic{width:100%;max-width:150px;margin:0 auto}
.gl8.land .gl8bub{left:10px;transform:none;max-width:max(150px,calc(var(--gm) - 24px));text-align:left}
.gl8.gl8shift .gl8pet{opacity:0}
.gl8.land .gl8card{padding-top:40px}.gl8.land .gl8x{right:8px;top:6px}
@media (orientation:landscape) and (max-height:500px){.gl8st{min-height:0}body[data-scr="globe8"] #btnMap{display:none}}
@media (max-height:460px){.gl8.land .gl8card{top:auto;bottom:8px;right:62px;width:min(300px,calc(var(--gm) - 70px));min-width:200px;flex-direction:row;align-items:center;text-align:left;padding:8px 36px 8px 8px}.gl8.land .gl8pic{width:72px;max-width:72px;margin:0}.gl8.land .gl8txt p.gl8fact{display:none}.gl8ctl{gap:5px}.gl8ctl button{width:42px;height:42px}.gl8find{min-height:42px}}
.gl8menu{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,16,60,.55);z-index:8;padding:12px;box-sizing:border-box}
.gl8menu[hidden]{display:none}
.gl8mc{background:#fff;color:#3A2A55;border-radius:22px;padding:14px 16px;max-width:520px;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}
.gl8mh{display:flex;gap:10px;align-items:center}.gl8mi{width:64px;height:64px;flex:none}.gl8mi svg{width:100%;height:100%}
.gl8mh b{font-size:22px;display:block;font-weight:400}.gl8mh small{font-size:15px}
.gl8lab{margin:10px 0 4px}.gl8row{display:flex;gap:8px}
.gl8opt{flex:1;min-height:64px;border:3px solid #EEE6F8;border-radius:16px;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;color:#3A2A55;font:inherit;cursor:pointer}
.gl8opt b{font-weight:400;font-size:18px}.gl8opt small{font-size:12.5px}.gl8opt.sel{border-color:#7A5CE0;background:#F0EAFF}
.gl8mb{display:flex;gap:10px;justify-content:center;margin-top:12px}.gl8mb .btn{min-width:8em;min-height:56px}.gl8mb .btn2{min-height:56px;white-space:nowrap;flex:none}
.gl8opt b,.gl8opt small{white-space:nowrap}
/* iPhone SE 這種窄的直式（QA 11/24）：「自由轉」「再加 37 個國家」不斷成兩行：選單邊距、按鈕內距縮小，小字跟著寬度縮 */
@media (max-width:420px){.gl8menu{padding:8px}.gl8mc{padding:12px 10px}.gl8row{gap:6px}.gl8opt{padding:4px 2px}.gl8opt small{font-size:min(12.5px,2.95vw);letter-spacing:-.02em}.gl8mb .btn{min-width:0;flex:1 1 auto}.gl8mb .btn2{padding-left:14px;padding-right:14px}}
.gl8.calm .gl8pet.hop,.gl8.calm .gl8card.in{animation:none}
@media (prefers-reduced-motion:reduce){.gl8pet.hop,.gl8card.in{animation:none}}`;document.head.appendChild(st);
window.__G8={T,gate,PIC,PICSVG,CT,ver:'2026-11-22'};
}catch(e){console.log('globe8',e)}}).toString()+')()')})();

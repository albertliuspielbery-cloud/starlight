/* ================= 第七季「星光城市小旅行」第四十一～四十五章（m7c_s7logic.js，接進遊戲） =================
   2026-11-22　星光工作室 Starlight Studio　｜　著作權與 IP 屬於星光工作室。
   接法照第六季（ref/season6.js「第六季…接進遊戲」）：同一套步驟，章號、季名、購買項目、獎狀都從 SZ 這一份設定來，沒有寫死 36～40。
   資料：S7D、S7Q、S7FIN、S7HEAR、S7LIKE、S7QTAG、S7PT（m7a_s7data.js，同事寫）；沒有的時候用 window.__S7FAKE（只有測試會注入，不在 mods）。
         兩個都沒有：第七季不接（遊戲照第六季為止）。
   美術：S41、BG41、OBJ41、CH41、PET41（m7b_s7art.js，同事寫，要等 Albert 看過）；S41.LIVE 不是 true（預設關）、沒有檔案、或 window.S7ART===false 時用暫代圖
         寵物小貓熊用 PET41.redpanda41(a,acc,2)（長大的樣子），寶寶／小時候照全遊戲一樣由寵物成長 pet19 處理。
         （背景用現有的街道、小鎮、農場、城堡；朋友用現有動物；寵物小貓熊、徽章用簡單色塊）。
   新題型在 m7e_newq7.js；寫字在 m7d_write7.js。
   動畫：只用淡入、移動、亮光；沒有整體放大縮小。 */
/* 主程式在 (()=>{…})() 裡面，mods 接在它後面：用主程式留的 window.__ev（直接 eval）把這一段放進主程式的範圍執行，才看得到 CHAPTERS、S、BUILD… */
(function(){if(typeof window.__ev!=='function'){console.log('s7: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
'use strict';
const GV=n=>{try{if(window[n]!==undefined)return window[n]}catch(e){}try{return (0,eval)(`typeof ${n}!=='undefined'?${n}:undefined`)}catch(e){return undefined}};
const FK=window.__S7FAKE||{};
const DATA={D:GV('S7D')||FK.S7D,Q:GV('S7Q')||FK.S7Q||[],FIN:GV('S7FIN')||FK.S7FIN,HEAR:GV('S7HEAR')||FK.S7HEAR||{},LIKE:GV('S7LIKE')||FK.S7LIKE||{z:{},l:{}},
 QTAG:GV('S7QTAG')||FK.S7QTAG||{},PT:GV('S7PT')||FK.S7PT||[],DEX:GV('S7DEX')||FK.S7DEX||[],SEG:GV('SEG7')||FK.SEG7||null,
 NQ:GV('S7NQ')||FK.S7NQ||null,GRID:GV('S7GRID')||FK.S7GRID||null,TH:GV('S7TH')||FK.S7TH||null,PARENT:GV('S7PARENT')||FK.S7PARENT||null};
const REAL=!!GV('S7D');
if(!DATA.D||!DATA.FIN){console.log('s7: 還沒有 S7D／S7FIN，第七季先不接');window.__s7={off:1};return}
/* ---------- 0. 這一季的設定（下一季照抄改這裡） ---------- */
const SZ={n:7,cn:'七',arc:'第九段',arcT:'星光城市小旅行',c0:41,stage:'stage9',stageName:'第四十一～四十五章',prevFin:'.fin6',prevP:'p.s6',
 cert:'城市小旅行家',certKey:'cert7_',artNS:'S41',ic:'🏙️',
 arcSay:'',
 icons:['🚇','📚','🩺','🦁','🖼️'],fallbackBG:{metro41:'street',library42:'town',clinic43:'town',zoo44:'farm',museum45:'castle'}};
const CH7=[0,1,2,3,4].map(k=>SZ.c0+k);           // 第幾章（1 起算）
const CI0=SZ.c0-1,CIL=SZ.c0+3;                   // CHAPTERS 的 index：40～44
const D7=DATA.D,Q7=DATA.Q,FIN7=DATA.FIN;
SZ.arcSay=FIN7.arc||'第七季，星光城市小旅行！跟大人一起進城，學會公共場所的禮貌和安全！';
const inS7=i=>i>=CI0&&i<=CIL;
if(CHAPTERS.length!==CI0){console.log('s7: CHAPTERS.length='+CHAPTERS.length+'（第七季要接在第四十章後面）');if(CHAPTERS.length>CI0){window.__s7={off:1};return}}
window.__s7on=1;
const RM=()=>{try{return !!reduced}catch(e){return false}};
const IS_APPX=()=>{try{return typeof IS_APP!=='undefined'&&!!IS_APP}catch(e){return false}};
const esc7=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CNUM=n=>{const d='零一二三四五六七八九';if(n<=10)return n===10?'十':d[n];if(n<20)return '十'+(n%10?d[n%10]:'');return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'')};
const chCN=c=>(D7[c]&&D7[c].cn)||CNUM(c);
/* ---------- 美術：真的或暫代 ---------- */
const ARTNS=window[SZ.artNS];
const ART_ON=!!ARTNS&&ARTNS.LIVE===true&&ARTNS.off!==true&&window.S7ART!==false;   // m7b 的開關 S41.LIVE（預設關；Albert 看過才打開）
const A7=ART_ON?ARTNS:{};
const BG7=ART_ON&&window.BG41||{};
const CHX=ART_ON&&window.CH41||{};
const PET7=ART_ON&&window.PET41||null;
const OB7=ART_ON&&window.OBJ41||{};
window.__s7art={on:ART_ON,real:REAL,missing:['S41','BG41','CH41','PET41','OBJ41'].filter(k=>!(ART_ON&&window[k]))};

/* ---------- 1. 新朋友（AN）和背景 ---------- */
Object.keys(CHX).forEach(k=>{if(Object.prototype.hasOwnProperty.call(AN,k))return;try{Object.defineProperty(AN,k,{configurable:true,enumerable:true,get(){return CHX[k].f()}})}catch(e){console.log('an41',k,e)}});
// 資料裡用到、但還沒有圖的朋友：暫代圖（圓圓的色塊＋眼睛）
const PH_AN=(c1,c2)=>`<ellipse cx="50" cy="90" rx="26" ry="5" fill="#000" opacity=".12"/><ellipse cx="50" cy="66" rx="26" ry="24" fill="${c1}"/><circle cx="50" cy="40" r="22" fill="${c1}"/><circle cx="34" cy="22" r="8" fill="${c2}"/><circle cx="66" cy="22" r="8" fill="${c2}"/>@E(42,58,40)<ellipse cx="50" cy="50" rx="6" ry="4" fill="${c2}"/><ellipse cx="38" cy="50" rx="4" ry="2.4" fill="#FF9AAE" opacity=".6"/><ellipse cx="62" cy="50" rx="4" ry="2.4" fill="#FF9AAE" opacity=".6"/>`;
const helpers=new Set();CH7.forEach(c=>{const D=D7[c];helpers.add(D.helper0);D.levels.forEach(L=>helpers.add(L[1]))});(FIN7.f||[]).forEach(([k])=>helpers.add(k));
let phN=0;helpers.forEach(k=>{if(!k||Object.prototype.hasOwnProperty.call(AN,k))return;const cs=[['#F2B48A','#A8643A'],['#B8D8F0','#4A7AA8'],['#F4C8E0','#B85A8A'],['#CDE8B0','#5A8A3A']][phN++%4];try{AN[k]=PH_AN(cs[0],cs[1])}catch(e){}});
const DARK=[];
const veil=(k,fn)=>function(W,H){let d='';try{d=fn(W,H)}catch(e){console.log('bg41',k,e)}
 if(window.__mkVeil){const dark=DARK.includes(k);d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="${dark?'#141A44':'#FFFFFF'}" opacity="${dark?'.18':'.22'}"/>`}return d};
const BGKEYS=[...new Set(CH7.map(c=>D7[c].bg).concat(Object.keys(BG7)))];
BGKEYS.forEach(k=>{if(BG7[k])CHBG[k]=veil(k,BG7[k]);else{const fb=SZ.fallbackBG[k]||'street';if(!CHBG[k]&&CHBG[fb])CHBG[k]=(W,H)=>CHBG[fb](W,H)}});
try{if(window.RD40BG)BGKEYS.forEach(k=>{if(CHBG[k])RD40BG[k]=(W,H)=>CHBG[k](W,H)})}catch(e){}
try{const _d7=decor2;decor2=function(id){if(BGKEYS.includes(id)&&CHBG[id]){let own=false;try{own=CHAPTERS[S.ch].bg===id&&!S.pmode}catch(e){}
  if(!own){const fn=CHBG[id];delete CHBG[id];try{return _d7(id)}finally{CHBG[id]=fn}}}return _d7(id)}}catch(e){}
// 題目物件（64×64）
try{const IA=c=>`<svg viewBox="0 0 64 64" aria-hidden="true">${c}</svg>`;Object.keys(OB7).forEach(k=>{ICONART['i:s41'+k]=IA(OB7[k])})}catch(e){}

/* ---------- 2. 題庫和標籤顏色 ---------- */
Object.assign(QTAG,DATA.QTAG);
const Q7_0=QUIZ.length;Q7.forEach(q=>QUIZ.push(q));window.__s7Q0=Q7_0;

/* ---------- 3. 獎品（從 S7D[c].prize 來：pet、dress／boy、petacc、prop、room、pic、items） ---------- */
const PZ=c=>D7[c].prize||{};
const GIFT={};const ROOM7=[],PIC7=[];
const NAME7=id=>(ITEM[id]||{}).name||'';
// 暫代圖：寵物小貓熊（紅褐色、尾巴一圈一圈）
const PH_PET=a=>`<svg viewBox="0 0 120 120" ${a||''} aria-hidden="true"><ellipse cx="60" cy="108" rx="34" ry="5" fill="#000" opacity=".12"/>
 <path d="M84 92 Q112 86 108 58 Q106 44 96 46 Q104 60 96 74 Q90 84 80 84Z" fill="#C8582A"/><path d="M100 50 l6 2 M102 62 l7 1 M99 74 l6 4" stroke="#F2E2C8" stroke-width="5" stroke-linecap="round"/>
 <ellipse cx="58" cy="82" rx="28" ry="22" fill="#C8582A"/><ellipse cx="58" cy="90" rx="18" ry="12" fill="#5A2A1A"/>
 <rect x="38" y="92" width="10" height="14" rx="5" fill="#4A2214"/><rect x="66" y="92" width="10" height="14" rx="5" fill="#4A2214"/>
 <g class="pbhead"><circle cx="56" cy="48" r="24" fill="#D8682E"/><path d="M34 34 L36 18 L50 28Z M78 34 L76 18 L62 28Z" fill="#D8682E"/><path d="M38 30 L39 22 L46 28Z M74 30 L73 22 L66 28Z" fill="#F2E2C8"/>
  <ellipse cx="44" cy="54" rx="9" ry="7" fill="#FFF4E4"/><ellipse cx="68" cy="54" rx="9" ry="7" fill="#FFF4E4"/><ellipse cx="56" cy="58" rx="8" ry="6" fill="#FFF4E4"/>
  <circle cx="46" cy="46" r="3.4" fill="#2A1A14"/><circle cx="66" cy="46" r="3.4" fill="#2A1A14"/><circle cx="47" cy="45" r="1.1" fill="#fff"/><circle cx="67" cy="45" r="1.1" fill="#fff"/>
  <ellipse cx="56" cy="55" rx="3" ry="2.2" fill="#2A1A14"/><path d="M52 60 Q56 63 60 60" stroke="#2A1A14" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></svg>`;
const PH_BADGE=(a='')=>`<svg ${a} viewBox="0 0 200 200" aria-hidden="true"><path d="M70 150 L56 196 L76 186 L86 200 L96 156Z" fill="#4A7AC8"/><path d="M130 150 L144 196 L124 186 L114 200 L104 156Z" fill="#E86A8A"/>
 <circle cx="100" cy="96" r="84" fill="#FFD24D" stroke="#C8962A" stroke-width="4"/><circle cx="100" cy="96" r="74" fill="#E8F2FF"/>
 <path d="M48 130 V92 H66 V130 M70 130 V70 H92 V130 M96 130 V82 H112 V130 M116 130 V60 H136 V130 M140 130 V96 H154 V130" fill="#7A9AD8" stroke="#4A6AA8" stroke-width="3"/>
 <path d="M44 130 H158" stroke="#4A6AA8" stroke-width="4"/><circle cx="100" cy="46" r="10" fill="#FFB84A"/></svg>`;
const PH_MINI=(k,a='')=>{const c=['#C8E0F8','#FFE0B0','#FFD0D0','#D0F0C0','#E8D8FF'][k]||'#E8F2FF';return `<svg ${a} viewBox="0 0 100 100" aria-hidden="true"><path d="M34 76 L26 98 L38 92 L44 100 L50 80Z M66 76 L74 98 L62 92 L56 100 L50 80Z" fill="#4A7AC8"/><circle cx="50" cy="46" r="40" fill="#FFD24D" stroke="#C8962A" stroke-width="3"/><circle cx="50" cy="46" r="33" fill="${c}"/><text x="50" y="58" font-size="34" text-anchor="middle">${SZ.icons[k]||'⭐'}</text></svg>`};
const PH_TOY=()=>{try{return S36.TOY.bugbox37}catch(e){return ''}};
CH7.forEach(c=>{const P=PZ(c);const g=[];
 if(P.pet){ITEMS.push({id:P.pet[0],slot:'pet',name:P.pet[1],price:0,chapter:c});g.push(P.pet[0])}
 if(P.petacc){ITEMS.push({id:P.petacc[0],slot:'petacc',name:P.petacc[1],price:0,chapter:c});g.push(P.petacc[0])}
 if(P.prop){ITEMS.push({id:P.prop[0],slot:'prop',name:P.prop[1],price:0,chapter:c});g.push(P.prop[0]);if(ISBOY){try{NEUTRAL_PROPS.push(P.prop[0])}catch(e){}}}
 if(P.dress||P.boy){const it=ISBOY?(P.boy||P.dress):(P.dress||P.boy);ITEMS.push({id:it[0],slot:'dress',name:it[1],price:0,chapter:c});g.push(it[0])}
 (P.items||[]).forEach(x=>{ITEMS.push({id:x[1],slot:x[0],name:x[2],price:0,chapter:c});g.push(x[1])});
 if(P.room)ROOM7.push([P.room[0],P.room[1],P.room[2],c]);
 if(P.pic)PIC7.push([c,P.pic]);
 GIFT[c]=g});
// 衣服：有美術就用，沒有就借第六季的（暫代）
CH7.forEach(c=>{const P=PZ(c);try{if(P.dress){const d=P.dress[0];if(A7.DRESS&&A7.DRESS[d])DRESS[d]=Object.assign({},A7.DRESS[d]);else if(!DRESS[d]&&DRESS.dress37)DRESS[d]=Object.assign({},DRESS.dress37)}
  if(P.boy){const b=P.boy[0];if(A7.BOY&&A7.BOY[b])BFIT[b]=Object.assign({},A7.BOY[b],{n:P.boy[1],chapter:c});else if(!BFIT[b]&&BFIT.b_vest37)BFIT[b]=Object.assign({},BFIT.b_vest37,{n:P.boy[1],chapter:c})}}catch(e){console.log('dress41',e)}});
ITEMS.forEach(i=>{ITEM[i.id]=i});
try{if(ART_ON&&typeof A7.hook==='function'&&window['__'+SZ.artNS.toLowerCase()+'hooked']!==1)A7.hook()}catch(e){console.log('s41hook',e)}
// 道具
{const props=CH7.map(c=>PZ(c).prop).filter(Boolean).map(p=>p[0]);if(props.length){const _pr7=IDOL.PR;IDOL.PR=g=>{const o=_pr7(g);props.forEach(id=>{try{if(A7.PR&&A7.PR[id])o[id]=A7.PR[id];else if(!o[id]&&o.prop40)o[id]=o.prop40}catch(e){}});return o}}}
// 寵物：走 ICONPET → ICONART 這一條（在 accOverlay、寵物成長 pet19 裡面），配件、長大都自動對
const PETS7=CH7.map(c=>PZ(c).pet).filter(Boolean).map(p=>p[0]);
PETS7.forEach(id=>{try{const key='i:s7pet_'+id;
  Object.defineProperty(ICONART,key,{configurable:true,get(){try{if(PET7&&typeof PET7[id]==='function')return PET7[id]('','',2)}catch(e){console.log('pet41',e)}return PH_PET('')}});
  ICONPET[id]=key;
  ACCANCH[id]=Object.assign({h:[58,26],n:[58,70],s:1},(PET7&&PET7.anchor)||{});
  if(window.__p19&&__p19.K&&!__p19.K[id])__p19.K[id]=(PET7&&PET7.p19)||{hd:'pb',pv:[56,66]}}catch(e){console.log('pet7reg',e)}});
// 寵物配件
{const accs=CH7.map(c=>PZ(c).petacc).filter(Boolean).map(p=>p[0]);if(accs.length){try{accs.forEach(id=>{if(!(A7.PACCNECK&&A7.PACCNECK.includes(id)))ACCHEAD.push(id)})}catch(e){}
 const _pa7=petAcc;petAcc=function(acc,g){if(accs.includes(acc)){try{if(A7.PACC&&A7.PACC[acc])return A7.PACC[acc](g)}catch(e){}
   return `<g><ellipse cx="85" cy="20" rx="13" ry="6" fill="#C83A4A"/><circle cx="85" cy="13" r="2.4" fill="#C83A4A"/></g>`}return _pa7.apply(this,arguments)}}}
// 房間
// 新的房間格「牆上的畫」pic：第 45 章「我的畫」，掛自己塗過的塗色本作品（V2.wallPic7 記選哪一張）
if(ROOM7.some(r=>r[0]==='pic')&&!ROOMITEMS.pic){ROOMSLOTS.push(['pic','牆上的畫']);ROOMITEMS.pic=[['none','空白牆',0]]}
ROOM7.forEach(r=>{if(!ROOMITEMS[r[0]])r[0]='toy'});
const painted7=()=>{let P={};try{P=paintGet()||{}}catch(e){}return PICS.map((p,i)=>i).filter(i=>PICS[i]&&PICS[i].r&&(!!P[i]||Object.keys((S.colors||{})[i]||{}).length>0))};
const wallPic7=()=>{const L=painted7();const k=V2.wallPic7;return L.includes(k)?k:L.length?L[L.length-1]:-1};
function wallSVG7(v){const x=66,y=10,w=124,h=86;let inner='';const i=wallPic7();
 try{if(i>=0)inner=picSVG(i,true).replace('<svg ',`<svg x="${x+10}" y="${y+10}" width="${w-20}" height="${h-20}" preserveAspectRatio="xMidYMid slice" `)}catch(e){}
 // 美術 m7b 的畫框（花邊、四角小花）：框裡放自己塗的那一張（沒有就放主角的畫）
 try{if(typeof A7.FRAME==='function'){const pic=inner?inner.replace(/<svg x="[^"]*" y="[^"]*" width="[^"]*" height="[^"]*" /,'<svg width="200" height="200" '):'';return `<svg x="192" y="40" width="88" height="88" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">${A7.FRAME(pic).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`}}catch(e){console.log('frame45',e)}
 if(!inner){inner=`<rect x="${x+10}" y="${y+10}" width="${w-20}" height="${h-20}" fill="#FFFDF4"/><circle cx="${x+48}" cy="${y+44}" r="16" fill="#FFD24D"/><path d="M${x+10} ${y+h-10} L${x+60} ${y+64} L${x+92} ${y+92} L${x+112} ${y+76} L${x+w-10} ${y+h-10}Z" fill="#8FD08A"/>`}
 return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#C8902E" stroke="#8A5A1E" stroke-width="4"/>${inner}<rect x="${x+8}" y="${y+8}" width="${w-16}" height="${h-16}" fill="none" stroke="#FFE7A0" stroke-width="3"/><path d="M${x+w/2-18} ${y} L${x+w/2} ${y-18} L${x+w/2+18} ${y}" stroke="#8A5A1E" stroke-width="2.4" fill="none"/>`}
ROOM7.forEach(([s,v,nm,c])=>{RMPRIZE.push([s,v,nm,c]);if(ROOMITEMS[s])ROOMITEMS[s].push([v,nm,999])});
if(ROOM7.length){const _rs7=roomSVG;roomSVG=function(){const R=_rs7.apply(this,arguments);try{ROOM7.forEach(([s,v])=>{if(s==='pic'){if(roomGet('pic')===v)R.bg+=wallSVG7(v);return}if(roomGet(s)===v){const art=(A7.ROOM&&A7.ROOM[v])||(A7.TOY&&A7.TOY[v])||PH_TOY();if(art)R[s]=art}})}catch(e){console.log('room41',e)}return R}}
// 房間「牆上的畫」分頁：換一張畫（只列自己塗過的）
{const _rm7=SCREENS.room;SCREENS.room=function(sel){const r=_rm7.apply(this,arguments);try{if((sel||'bed')==='pic'&&roomGet('pic')!=='none'){const L=painted7();const side=$('.rside');if(side&&!$('#wallpic7',side)){const b=document.createElement('button');b.className='btn2 small';b.id='wallpic7';b.textContent=L.length>1?'換一張畫':'去塗色本畫一張';side.appendChild(b);
   b.onclick=()=>{sfx('pop');if(L.length<2){go('coloring');return}const k=L.indexOf(wallPic7());V2.wallPic7=L[(k+1)%L.length];save2();SCREENS.room('pic')}}}}catch(e){console.log('wallpic7',e)}return r}}
// 塗色本：有美術才加（暫代時不加，免得出現空白圖）
PIC7.forEach(([c,nm],k)=>{const P=(A7.PICS||[])[k];if(!P)return;try{PICS.push({n:nm,ch:c,cat47:P.cat||'adv',lv47:P.lv||1,r:P.r||[],deco43:typeof P.deco==='function'?P.deco():'',lw43:5})}catch(e){console.log('pic41',e)}});
window.__s7GIFT=GIFT;

/* ---------- 4. 大地圖第九段、章節 ---------- */
CH7.forEach((c,k)=>{const D=D7[c];const pt=DATA.PT.find(x=>x[6]===c);const ic=D.ic||(pt&&pt[2])||SZ.icons[k];const col=DATA.QTAG[D.tag]||'#B8C8F0';
 WORLD.push({i:c-1,ic:()=>art(ic),c:D.wc||[col,'#2A3A7A'],name:D.name})});
ARCS.push({t:SZ.arcT,n:SZ.arc,from:CI0,ic:()=>art(SZ.ic),say:SZ.arcSay});
const LETTER_P={},LETTER_B={};
CH7.forEach(c=>{const D=D7[c];
 const lv=D.levels.map(L=>L_(L[0],L[1],D.bg,L[3].slice(),L[4],L[5]));
 CHAPTERS.push({name:D.name,title:D.title,levels:lv,bg:D.bg,mix:[...S2MIX,'quiz:'+D.tag,'pin','m20','eword'],
  firstSay:D.firstSay,letter:D.letter_p,prize:PZ(c).pet?[PZ(c).pet[0]]:[],gems:10,prizeName:'',endText:D.endText,s7:c});
 const C=CHAPTERS[CHAPTERS.length-1];const P=PZ(c);
 const on=P.dress||P.boy?(ISBOY?(P.boy||P.dress):(P.dress||P.boy)):P.prop||P.petacc;if(on&&!P.pet)C.outfitName=on[1];
 if(ISBOY){C.letter=D.letter_b;C.boyLetter=1;DRAGON_SAY.add(voiceT(C.letter.replace(/<br>/g,'')))}
 else PRINCE_LETTERS.add(C.letter.replace(/<br>/g,''));
 LETTER_P[c]=D.letter_p.replace(/<br>/g,'');LETTER_B[c]=D.letter_b.replace(/<br>/g,'')});
const S7NEXT=`下一站：第${SZ.cn}季「${SZ.arcT}」！`;
const S7AD=`這是第${SZ.cn}季的冒險內容，請爸爸媽媽到家長專區看看喔！`;

/* ---------- 5. 開場故事頁（故事拆段 story19 包在這一層外面，所以第 41～45 章也會拆段） ---------- */
// 第七季朋友（spec 第 11 節）：故事頭像、王子版名字切分
const FRIEND7={'嚕嚕':'pigeon41','書書':'owl42','翻翻':'bookworm42','波波':'hippo43','兔兔':'bunny','咔咔':'croc43','阿森':'keeper44','環環':'redpanda44','羽羽':'peacock45','變變':'chameleon45'};
try{if(window.__ST19SPK)Object.assign(__ST19SPK,FRIEND7)}catch(e){}
const SAYERS=(()=>{const s=new Set(['火花',...Object.keys(FRIEND7)]);CH7.forEach(c=>{String(D7[c].story_b||'').replace(/([一-鿿]{1,4})說：/g,(_,n)=>{if(!/^[他她它]$/.test(n))s.add(n)})});return [...s]})();
const SAYRE=new RegExp(`(?=(?:${SAYERS.join('|')})說：)`);
function talk7(t){if(!ISBOY||!/火花說：/.test(t))return [t];const seg=t.split(SAYRE).filter(Boolean);const o=[];
 seg.forEach(s=>{if(o.length)o.push({pause:200});o.push(s.startsWith('火花說：')?{zh:s.slice(4),who:'dragon'}:s)});return o}
// 開場故事每一頁換場景（美術 m7b：第一頁＝章節開場圖、中間＝拆段故事的場景變化、最後一頁＝這一章的主場景）；沒有美術就都用主場景
const pgBg7=(c,i,n,main)=>{try{if(!ART_ON||!window.BG41_OPEN)return main;if(i===0&&BG7[BG41_OPEN[c]])return BG41_OPEN[c];if(i>=n-1)return main;const L=(window.BG41_STORY||{})[c]||[];const k=L.length?L[(i-1)%L.length]:'';return BG7[k]?k:main}catch(e){return main}};
const _story7=SCREENS.story;
SCREENS.story=function(){if(!inS7(S.ch))return _story7.apply(this,arguments);
 const c=S.ch+1,D=D7[c];const bg=k=>`<svg class="bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice">${sbg(k)}</svg>`;
 const ver=ISBOY?D.story_b:D.story_p;const T=D.story.slice();T.splice(D.storyAt,0,ver);const hp=D.helper0||'robot';
 const fireB=()=>{try{if(S.look.pet==='dragon')return myPet();return petSVG('dragon','','')}catch(e){return myPet()}};
 const P=T.map((t,k)=>({t,a:()=>k===D.storyAt?`${princess(S.look)}<span class="bob">${ISBOY?fireB():prince()}</span>`:k===T.length-1?`${myPet('class="small"')}${princess(S.look)}<span class="bob">${animal(hp)}</span>`:`${princess(S.look)}<span class="bob">${animal(hp)}</span>`}));
 let i=0;
 function render(){const p=P[i];
  screen.innerHTML=`<div class="story s4story s5story s6story s7story"><button class="skip" id="skip">跳過</button><div class="scard">
   <div class="scene">${bg(pgBg7(c,i,P.length,D.bg))}<div class="actors">${p.a()}</div></div><p class="stext">${p.t}</p>
   <div class="sdots">${P.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
   <button class="btn" id="next">${i<P.length-1?'下一頁':'去換裝'}</button></div></div>`;
  say(talk7(p.t));
  $('#next').onclick=()=>{if(i<P.length-1){i++;sfx('pop');render()}else go('guide')};
  $('#skip').onclick=()=>go('guide')}
 render()};

/* ---------- 6. 每一關先從那一關主題的題目抽；還沒玩到第七季的，一般問答不抽第七季的題目 ---------- */
{const _qz7=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{const c=S.ch+1;const D=inS7(S.ch)?D7[c]:null;
   if(D&&fcat===D.tag&&S.qs&&S.qs.__lv!==undefined&&D.lv&&D.lv[S.level]&&!S.pmode){
    const base=D.lv[S.level].map(k=>k+Q7_0).filter(k=>QUIZ[k]&&QUIZ[k][0]===D.tag);
    const seen=S.qs.__u7||(S.qs.__u7=[]);let i;const F=(D.first||{})[String(S.level)];
    if(S.qs.indexOf('quiz:'+D.tag)===S.q&&F!=null&&!seen.length)i=F+Q7_0;
    else{let pool=base.filter(x=>!S.usedQ.includes(x)&&!seen.includes(x));
     if(!pool.length){S.usedQ=S.usedQ.filter(x=>!base.includes(x));pool=base.filter(x=>!seen.includes(x))}
     if(!pool.length)pool=base;i=pick(pool)}
    if(i!=null&&QUIZ[i]){seen.push(i);
     const keep=S.usedQ.filter(x=>x!==i);S.usedQ=keep.concat(QUIZ.map((q,k)=>k).filter(k=>k!==i&&QUIZ[k][0]===D.tag&&!keep.includes(k)));
     try{return _qz7.apply(this,arguments)}finally{S.usedQ=keep.concat([i])}}}}catch(e){console.log('q41lv',e)}
  return _qz7.apply(this,arguments)}}
const appOk=i=>{try{return typeof window.__appOpen==='function'?!!window.__appOpen(i):true}catch(e){return false}};
const s7Open=i=>{try{return appOk(i)&&(IS_APPX()||(typeof s3Ok==='function'?!!s3Ok():!!V2.s3pw))}catch(e){return false}};
const s7QOk=()=>{try{if(inS7(S.ch)&&!S.pmode)return true;if(IS_APPX())return s7Open(CI0)&&S.chDone>=CI0;return S.chDone>=CI0}catch(e){return false}};
window.__s7QOk=s7QOk;window.__s7Open=s7Open;
{const _qz7g=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{if(!fcat&&!s7QOk()&&Array.isArray(S.usedQ)&&Q7.length){const s7=[];for(let k=Q7_0;k<Q7_0+Q7.length;k++)s7.push(k);const SS=new Set(s7);
    let keep=S.usedQ.filter(x=>!SS.has(x));
    if(!QUIZ.some((q,k)=>!SS.has(k)&&!keep.includes(k)))keep=[];
    S.usedQ=keep.concat(s7);
    try{return _qz7g.apply(this,arguments)}finally{const add=S.usedQ.filter(x=>!SS.has(x)&&!keep.includes(x));S.usedQ=keep.concat(add)}}}catch(e){console.log('q41gen',e)}
  return _qz7g.apply(this,arguments)}}

/* ---------- 9. 破關小劇場（第 41～44 章各一句；第 45 章用季完結大結局） ---------- */
try{const A=k=>()=>animal(k),I=e=>()=>art(e);const TH=window.TH93;
 const isAN=k=>{try{return !!k&&Object.prototype.hasOwnProperty.call(AN,k)}catch(e){return false}};
 CH7.slice(0,4).forEach((c,k)=>{const D=D7[c];if(!D.theater)return;const h=D.helper0||'robot';const h2=(D.levels[2]||[])[1]||h;const X=(DATA.TH||{})[c];
  TH.T93[c-1]=X?{line:D.theater,o:X.o||'50% 60%',tint:X.tint||'day',deco:(X.deco||[]).map(([k2,an,x,y,sz])=>[isAN(k2)?A(k2):I(k2),an,x,y,sz])}:{line:D.theater,o:'50% 60%',tint:'day',deco:[[A(h),'bob',84,56,14],[I(SZ.icons[k]),'pop',16,16,8],[A(h2),'hop',12,60,12]]}});
 TH.BIG[CIL]='chend'}catch(e){console.log('th41',e)}

/* ---------- 10. 第四十章大結局：接到第七季 ---------- */
{const _ce40=SCREENS.chend;SCREENS.chend=function(){const r=_ce40.apply(this,arguments);
 try{if(S.ch===CI0-1&&$(SZ.prevFin)&&CHAPTERS[CI0]){const ln=$(`${SZ.prevFin} ${SZ.prevP}`);
   if(appOk(CI0)){if(ln)ln.textContent=S7NEXT;const eb=$(`${SZ.prevFin} .endbtns`);
    if(eb&&!$('#nextch7')){const b=document.createElement('button');b.className='btn';b.id='nextch7';b.textContent=`前往第${SZ.cn}季`;eb.insertBefore(b,eb.firstChild);
     const gc=$('#gcert');if(gc)gc.className='btn2';
     b.onclick=()=>{clearEnd();hush();setCh(CI0);if(S.prog>=NL)S.prog=0;S.walkFrom=null;save();go(S.prog===0?'story':'guide')}}}
   else if(ln)ln.textContent=S7AD}}catch(e){console.log('fin6to7',e)}
 return r}}

/* ---------- 11. 章末禮物（第 41～44 章；第 45 章是季完結） ---------- */
/* ---------- 11a. 第 42 章章末：字母歌（A～Z 一個一個亮、念 e1| 字母；旋律是星光工作室原創 8 小節，不用任何現成兒歌） ---------- */
// 一拍一個音；'-' 是空拍。G 大調、五聲音階為主：G B D B｜C E D -｜B D G E｜D A - -｜A C E C｜D F# E D｜B D C A｜G - - -（26 個音，剛好 A～Z）
const ABC7='G4 B4 D5 B4 C5 E5 D5 - B4 D5 G5 E5 D5 A4 - - A4 C5 E5 C5 D5 F#5 E5 D5 B4 D5 C5 A4 G4 - - -'.split(' ');
window.__ABC7=ABC7;
function abcSong(after){const L='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');let tok=1;const calm=RM();
 const ov=overlay(screen,`<div class="card abc7"><h2>ABC</h2><div class="abc7g">${L.map(x=>`<span data-l="${x}">${x}<small>${x.toLowerCase()}</small></span>`).join('')}</div><div class="row"><button class="btn2 small" id="abc7x">跳過</button></div></div>`);
 const end=()=>{if(!tok)return;tok=0;hush();ov.remove();after()};$('#abc7x',ov).onclick=()=>{sfx('pop');end()};
 const beat=calm?520:560;let i=0,li=0;
 const step=()=>{if(!tok)return;if(i>=ABC7.length){setTimeout(()=>{if(tok){confetti();setTimeout(end,1400)}},300);return}const n=ABC7[i++];
  if(n!=='-'){const x=L[li++];try{mtone(NOTE(n),0,beat/1000*.9,'triangle',.16);mtone(NOTE(n)/2,0,beat/1000*.9,'sine',.07)}catch(e){try{tone(NOTE(n),0,.4,'triangle',.1)}catch(_){}}
   const el=$(`.abc7g [data-l="${x}"]`,ov);if(el){el.classList.add('on');if(!calm)try{burstEl(el,6)}catch(e){}}
   try{if(VO.idx&&voHas('e1|'+x))say([{en:x,slow:1}])}catch(e){}}
  setTimeout(step,beat)};
 try{audio()}catch(e){}setTimeout(step,500)}
window.__abcSong7=abcSong;
{const _rw7=REWARD.chapter;REWARD.chapter=function(card,finish){if(!inS7(S.ch))return _rw7.apply(this,arguments);
 const c=S.ch+1,C=CHAPTERS[S.ch],ids=GIFT[c]||[];
 if(c===SZ.c0+1&&!card.__abc7){card.__abc7=1;const args=arguments,self=this;card.innerHTML='';return abcSong(()=>REWARD.chapter.apply(self,args))}
 card.innerHTML=`<div class="scroll">${C.letter}<span class="sign">—— 王子</span>${sealSVG()}</div><button class="btn" id="next">看看禮物</button>`;
 say([{zh:C.letter.replace(/<br>/g,''),who:'prince'}]);
 $('#next',card).onclick=()=>{ids.forEach(id=>{if(!owns(id))S.owned.push(id)});S.newPrize=ids.slice();
  ids.forEach(id=>{const it=ITEM[id];if(!it)return;if(it.slot==='dress')S.look.dress=id;if(it.slot==='prop')S.look.prop=id;if(it.slot==='petacc')S.look.petacc=id});
  const n=C.gems||10;S.wallet+=n;save();try{renderBar()}catch(e){}
  const names=ids.map(NAME7).filter(Boolean).join('和');const it0=ITEM[ids[0]]||{};
  const pic=it0.slot==='pet'?`<span class="bob">${petSVG(ids[0],'')}</span>${princess(S.look)}`:it0.slot==='petacc'?`${princess(S.look)}<span class="bob">${petSVG(S.look.pet,ids[0])}</span>`:`${princess(S.look)}<span class="bob">${myPet('class="small"')}</span>`;
  card.innerHTML=`<div class="petshow">${pic}</div><h2>${names?`得到${names}！`:'好棒！'}</h2><p class="small">還有 ${n} 顆寶石！</p><button class="btn" id="cont">太棒了！</button>`;
  sfx('gem');confetti();say([names?`得到${names}了！`:'好棒！','還有十顆寶石！']);$('#cont',card).onclick=finish}}}
const NEWPET='你得到新的衣服和寵物了！點「換裝間」，可以換上新衣服喔！';
function s7CatchUp(){let ch=false;CH7.forEach(c=>{if(S.chDone>=c)(GIFT[c]||[]).forEach(id=>{if(!owns(id)){S.owned.push(id);ch=true}})});if(ch)save()}
window.__s7CatchUp=s7CatchUp;

/* ---------- 12. 第七季完結：頒獎典禮＋獎狀「城市小旅行家」 ---------- */
const CERT7K=()=>SZ.certKey+(window.HERO||'princess');window.CERT7K=CERT7K;
const cert7Date=()=>{const c=V2[CERT7K()];if(!c||!c.d)return '';const [y,m,d]=c.d.split('-');return `${y} 年 ${+m} 月 ${+d} 日`};
const cert7Give=()=>{if(V2[CERT7K()])return false;const n=new Date();V2[CERT7K()]={d:`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`};save2();return true};
const FIN7_END=D7[SZ.c0+4].endText;
const S7BADGE=(a='')=>{try{if(typeof A7.BADGE==='function')return A7.BADGE(a)}catch(e){}return PH_BADGE(a)};window.S7BADGE=S7BADGE;
if(GV('S7FIN')===undefined)window.S7FIN=FIN7;
function certHTML7(o){if(typeof A7.certHTML==='function')return A7.certHTML(o);const nm=(o.name||'').trim();const F=FIN7;
 return `<div class="card certcard cert3 cert7" role="dialog" aria-label="${esc7(F.cert_title)}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${esc7(F.cert_title)}</div><div class="certto">頒給：<b>${nm?esc7(nm):esc7(F.cert_to)}</b></div>
  <div class="certbody">${(F.cert_body||[]).map(s=>s==='<br>'?'<br>':`<span>${esc7(s)}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero}</span><span class="c3badge">${S7BADGE()}</span><span class="u">${o.pet}</span></div>
  <div class="certfoot"><div><div class="certsig">${esc7(F.cert_sign)}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${S7BADGE()}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`}
function cert7Show(after){const old=$('.certov');if(old)old.remove();
 const ov=overlay(screen,certHTML7({name:S.name||'',hero:princess(S.look),pet:myPet(),date:cert7Date()}));ov.classList.add('certov');
 $('#certok',ov).onclick=()=>{hush();ov.remove();if(after)after()};
 say([FIN7.c1,{pause:200},FIN7.c2,{pause:200},FIN7.c3]);return ov}
window.cert7Show=cert7Show;
const capOK=n=>{try{if(IS_APPX()&&typeof window.__bkCap==='function')return __bkCap()>=n;return true}catch(e){return false}};
const cert7Visible=()=>{try{return !!V2[CERT7K()]&&capOK(SZ.c0+4)}catch(e){return false}};
window.__cert7Visible=cert7Visible;
{const _cp6=certPick;certPick=function(){if(!cert7Visible())return _cp6.apply(this,arguments);
 const K=f=>{try{const k=typeof f==='function'?f():null;return !!(k&&V2[k])}catch(e){return false}};
 const L=[[K(typeof CERTK==='function'?CERTK:null),'2','星光小勇士','第二季'],[K(typeof CERT3K==='function'?CERT3K:null),'3','星光小幫手','第三季'],
  [K(window.CERT4K),'4','星光太空探險隊','第四季'],[K(window.CERT5K)&&capOK(35),'5','星光小管家','第五季'],[K(window.CERT6K)&&capOK(40),'6','大自然小守護者','第六季'],[true,'7',FIN7.cert_title,`第${SZ.cn}季`]].filter(x=>x[0]);
 const open=s=>s==='7'?cert7Show():s==='6'?cert6Show():s==='5'?cert5Show():s==='4'?cert4Show():s==='3'?cert3Show():certShow();
 if(L.length<=1){hush();return open('7')}
 const seal=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#E8505A"/><circle cx="50" cy="50" r="36" fill="none" stroke="#FFE7B0" stroke-width="3" stroke-dasharray="4 4"/><path d="${certStarD(50,50,22,10)}" fill="#FFE27A"/></svg>`;
 const bd=f=>{try{return f()||seal}catch(e){return seal}};
 const ic={'2':seal,'3':bd(()=>S25BADGE()),'4':bd(()=>S4BADGE()),'5':bd(()=>S5BADGE()),'6':bd(()=>window.S6BADGE()),'7':S7BADGE()};
 const ov=overlay(screen,`<div class="card certpick${L.length>2?' cp3':''}${L.length>3?' cp4':''}${L.length>4?' cp5':''}${L.length>5?' cp6':''}"><h2>想看哪一張？</h2><div class="cprow">
  ${L.map(([,s,t,n])=>`<button class="cpbtn" data-s="${s}"><span class="cpic">${ic[s]}</span><b>${esc7(t)}</b><small>${n}</small></button>`).join('')}</div>
  <button class="btn2" id="cpno">關閉</button></div>`);
 say(['你想看哪一張？']);
 $$('.cpbtn',ov).forEach(b=>b.onclick=()=>{sfx('pop');hush();ov.remove();open(b.dataset.s)});
 $('#cpno',ov).onclick=()=>{hush();ov.remove();sfx('pop')}}}
{const _w7=SCREENS.world;SCREENS.world=function(){const r=_w7.apply(this,arguments);try{if(cert7Visible()){let b=$('#wcert');
 if(!b){const sp=$('.whead .phsp');if(sp){b=document.createElement('button');b.className='btn2 small';b.id='wcert';b.textContent='🏅 獎狀';sp.replaceWith(b)}}
 if(b)b.onclick=()=>{sfx('pop');certPick()}}}catch(e){console.log('cert7',e)}return r}}
let fin7Tok=0,fin7Cert=0;
function grandFinale7(){clearEnd();const tok=++fin7Tok;const live=()=>tok===fin7Tok&&S.screen==='chend';
 const calm=RM()||!!S.lite;const first=cert7Give();fin7Cert=0;
 screen.innerHTML=`<div class="ending grand fin4 fin7"><svg class="fin7bg" aria-hidden="true"></svg>
  <div class="gparade">${(FIN7.f||[]).map(([k],j)=>`<span class="gfr" data-k="${k}" style="animation-delay:${(1.2+j*.22).toFixed(2)}s">${animal(k)}</span>`).join('')}</div>
  <div class="trio"><div class="walkin">${princess(S.look)}</div><div class="fromdoor">${prince()}</div><div class="walkin u" style="animation-delay:.3s">${myPet()}</div></div>
  <h2 class="endh">${esc7(FIN7.h)}</h2><p class="endp">${esc7(FIN7.p)}</p>
  <div class="endbtns"><button class="btn" id="gcert">看獎狀</button><button class="btn2" id="again">再玩一次</button><button class="btn2" id="endworld">大地圖</button><button class="btn2" id="home">回首頁</button></div>
  <p class="s7">${esc7(FIN7.next||FIN7_END)}</p></div>`;
 fin7Bg();
 const T=(ms,f)=>endTimers.push(setTimeout(f,calm?0:ms));
 if(!calm){for(let k=0;k<10;k++)T(1800+k*900,()=>{if(!live()||fin7Cert)return;burst(innerWidth*(.12+Math.random()*.76),innerHeight*(.06+Math.random()*.28),46);if(k%3===0)sfx('gem')});
  T(3000,()=>{if(live()&&!fin7Cert)confetti()});T(3400,()=>$$('.fin7 .trio > div,.fin7 .gfr').forEach(d=>{const s=d.firstElementChild||d;s.classList.add('jig')}))}
 const cert=()=>{if(!live())return;fin7Cert=1;clearEnd();hush();cert7Show(()=>{if(live())say([FIN7_END])})};
 $('#gcert').onclick=cert;
 $('#again').onclick=()=>{fin7Tok++;clearEnd();hush();S.prog=0;S.walkFrom=null;save();go('guide')};
 $('#endworld').onclick=()=>{fin7Tok++;clearEnd();hush();go('world')};
 $('#home').onclick=()=>{fin7Tok++;clearEnd();hush();go('title')};
 (async()=>{const sw=a=>Promise.all([say(a),wait(calm?300:1800)]);const stop=()=>!live()||fin7Cert;
  const talk=async(sel,a)=>{const el=$(sel);if(el){el.classList.add('gtalk');if(!calm)burstEl(el,14)}await sw(a);if(el)el.classList.remove('gtalk')};
  await sw([FIN7.h,{pause:200},FIN7.p]);if(stop())return;
  for(const [k,t] of (FIN7.f||[])){if(stop())return;await talk(`.fin7 .gfr[data-k="${k}"]`,[t])}
  if(stop())return;await talk('.fin7 .fromdoor',[ISBOY?{zh:FIN7.dr,who:'dragon'}:{zh:FIN7.pr,who:'prince'}]);
  if(stop())return;if(!first){await sw([FIN7_END]);return}
  if($('.certov'))return;cert()})()}
window.grandFinale7=grandFinale7;
function fin7Bg(){const fe=$('.fin7'),g=fe&&$('.fin7bg',fe);if(!g)return;const r=fe.getBoundingClientRect();if(!r.width||!r.height)return;
 let W=Math.round(500*r.width/r.height),H=500;if(r.height>r.width){W=400;H=Math.round(400*r.height/r.width)}const key=W+'x'+H;if(g.dataset.k===key)return;
 g.dataset.k=key;g.setAttribute('viewBox',`0 0 ${W} ${H}`);g.setAttribute('preserveAspectRatio','xMidYMax slice');
 try{const k=D7[SZ.c0+4].bg;const f=(window.BG41_FIN&&BG7[BG41_FIN])||BG7[k+'night']||BG7[k]||CHBG[k];g.innerHTML=f?f(W,H):''}catch(e){}}
{let t7=0;addEventListener('resize',()=>{clearTimeout(t7);t7=setTimeout(()=>{try{if($('.fin7'))fin7Bg()}catch(e){}},150)})}
{const _ce7=SCREENS.chend;SCREENS.chend=function(){if(S.ch===CIL)return grandFinale7();return _ce7.apply(this,arguments)}}

/* ---------- 13. 自由練習 ---------- */
DATA.PT.forEach(([k,n,e,h,bg,qs])=>PTOPICS.push([k,n,e,h,bg,qs.slice()]));
const PT7=Object.fromEntries(DATA.PT.map(x=>[x[0],x[6]]));
// 分類選單（v5.1）：照章節排序、還沒到的顯示鎖頭；放到對的分類（注音／英文／數學，其他放生活）
try{if(window.__PCHN)Object.assign(__PCHN,PT7);const CT=window.__PCATS;if(CT){DATA.PT.forEach(([k,,,,,qs])=>{const t=String(qs[0]||'').split(':')[0];const id=t==='zhuyin'?'zy':t==='letter'?'en':['count','measure','shape','clock','add','sub','compare'].includes(t)?'ma':'li';const c=CT.find(x=>x.id===id);if(c&&!c.ks.includes(k))c.ks.push(k)})}}catch(e){console.log('pcat7',e)}
{const _pp7=SCREENS.practice;SCREENS.practice=function(){const r=_pp7.apply(this,arguments);try{Object.entries(PT7).forEach(([k,c])=>{const i=c-1;
  const ok=s7Open(i)&&S.chDone>i;
  if(!ok){const b=document.querySelector(`.tcard[data-k="${k}"]`);if(b)b.remove()}})}catch(e){console.log('pt7',e)}return r}}

/* ---------- 14. 圖鑑：第七季的朋友；寶物「城市小旅行徽章」一排（收集冊 book19 自動拿去「徽章」頁） ---------- */
try{DATA.DEX.forEach(d=>{if(!DEX.some(x=>x[0]===d[0]))DEX.push(d)})}catch(e){}
const BADGE_ROW=FIN7.badge_row||'城市小旅行徽章';
{const _dx7=SCREENS.dex;SCREENS.dex=function(tab){const r=_dx7.apply(this,arguments);try{if((tab||'ani')!=='tre')return r;const body=$('#dbody');if(!body||$('.trow.s7b',body))return r;
  const B=CH7.map(c=>({c:c-1,ok:S.chDone>c-1&&s7Open(c-1)}));if(!B.some(x=>x.ok)&&S.chDone<CI0)return r;
  const mini=k=>{try{if(typeof A7.MINI==='function')return A7.MINI(k)}catch(e){}return PH_MINI(k)};
  const row=document.createElement('div');row.className='trow s7b';row.innerHTML=`<h3>${art(SZ.ic)}${BADGE_ROW}</h3><div class="titems">${B.map((x,k)=>`<button class="titem${x.ok?'':' unk'}" data-c="${x.c}"><span class="tpic">${x.ok?`<span class="s7mini">${mini(k)}</span>`:WICON.stamp}</span><small>${x.ok?wName(x.c):'？'}</small></button>`).join('')}</div>`;
  body.appendChild(row);
  $$('.titem',row).forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(b.classList.contains('unk')){say([FIN7.badge_no||'這個徽章還沒拿到喔！']);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
   b.classList.remove('jig');void b.offsetWidth;b.classList.add('jig');sfx('gem');burstEl(b,16);say([(FIN7.badge||[])[c-CI0]||`這是${wName(c)}的${BADGE_ROW}！`])})}catch(e){console.log('dex7',e)}return r}}

/* ---------- 15. 網頁版密碼（同一個開關）：標題「第七季搶先玩」；App：stage9「第四十一～四十五章」 ---------- */
{let want=-1;const _sh7=show;show=function(name,arg){try{want=S.ch;if(name==='title'||name==='chend')s7CatchUp()}catch(e){}return _sh7.apply(this,arguments)};
 const _g7=s3Gate;s3Gate=function(then){const r=_g7.apply(this,arguments);try{if(want>=CI0){const h=$('.s3gate h2');if(h)h.textContent=`第${SZ.cn}季搶先玩`}}catch(e){}return r};window.__s3Gate=s3Gate}
// App：第四十一～四十五章算在 STAGES 的 stage9 這一段（用 push 加，照第六季 stage8）。5.4.0（Albert 11/24）起不賣 stage9、也不向商店查：
// 有「完整版」full 就打開（mods/m9_pay290.js 讓 full 等於 STAGES 裡全部的段），stage9 只是以防萬一還認得
try{if(typeof STAGES!=='undefined'&&!STAGES.some(s=>s[0]===SZ.stage))STAGES.push([SZ.stage,SZ.stageName,CI0,CI0+5])}catch(e){console.log(SZ.stage,e)}
const SEG7=Object.assign({id:SZ.stage,r:SZ.stageName,arc:`第${SZ.cn}季・${SZ.arcT}`,from:SZ.c0,
 learn:['注音：ㄙ，聲母全部學完；ㄧ、ㄨ、ㄩ（直式的ㄧ寫成橫的）；英文大寫 W～Z（26 個到齊），小寫 a、b、c、d 和「三層樓」、大小寫配對；跟著筆順寫',
  '看時鐘整點、半點；五個五個數到 30；第一到第十；百數表找數字；看叫號算還要等幾個人；用積木量身高；方格地圖走幾步',
  '搭捷運、去圖書館、看醫生、逛動物園、看展覽的禮貌和安全：手扶梯站穩扶好、注意月台空隙；藥要大人給；跟大人走散了站在原地，找穿制服的工作人員'],
 extra:'新寵物小貓熊，新衣服和房間佈置。完成第四十五章，拿到「城市小旅行家」獎狀。',park:[]},DATA.SEG||{});
window.__S7SEG=SEG7;
{const _ih7=window.__iapShopHook;window.__iapShopHook=function(ov,price){const r=_ih7?_ih7.apply(this,arguments):undefined;try{const d=$('.f3intro',ov);if(!d||$('.f3seg[data-seg="s7"]',d))return r;
  const lead=$('.f3lead',d);if(lead)lead.textContent='第一～五章免費。後面還有八段、四十章，每段五章，要照順序打開。';
  let own=false;try{own=!!stageOpen(SZ.stage)}catch(e){}const p=price(SZ.stage);const g=SEG7;
  const items=ITEMS.filter(x=>x.chapter>=SZ.c0&&x.chapter<=SZ.c0+4&&['pet','dress','prop'].includes(x.slot));
  const sec=document.createElement('section');sec.className='f3seg'+(own?' own':'');sec.dataset.seg='s7';
  sec.innerHTML=`<div class="f3sh"><div><small>${g.r}</small><b>${g.arc}</b></div>${own?'<span class="f3tag">已解鎖 ✓</span>':p?`<span class="f3tag">${esc7(p)}</span>`:''}</div>
   <div class="f3scs">${[0,1,2,3,4].map(i=>{const C=CHAPTERS[g.from-1+i];let bg='';try{bg=sbg(C.bg)}catch(e){}return `<figure class="f3sc" data-c="${g.from+i}"><span class="f3sv"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${bg}</svg></span><figcaption>${esc7(C.name)}</figcaption></figure>`}).join('')}</div>
   <div class="f3sub">學什麼</div><ul class="f3ul">${g.learn.map(t=>`<li>${t}</li>`).join('')}</ul>
   <div class="f3sub">新的寵物、衣服和道具</div><div class="f3its">${items.map(it=>`<figure class="f3it"><span class="f3iv">${(()=>{try{return still(it.slot==='pet'?petSVG(it.id,''):princess({...S.look,[it.slot]:it.id},'',VB[it.slot]))}catch(e){return ''}})()}</span><figcaption>${esc7(it.name)}</figcaption></figure>`).join('')}</div>
   ${g.park&&g.park.length?`<div class="f3sub">遊樂園新遊戲</div><div class="f3pks">${g.park.map(([e,n,fb])=>`<span class="f3pk"><span class="pic">${art(typeof ICONART!=='undefined'&&ICONART[e]?e:fb)}</span>${n}</span>`).join('')}</div>`:''}<p class="f3ex">${g.extra}</p>`;
  const how=$('.f3how',d);if(how)d.insertBefore(sec,how);else d.appendChild(sec);
  // 購買說明裡的第四十一～四十五章：patches/71_s7_totals.py
  }catch(e){console.log('intro7',e)}return r}}
// App：還沒打開的第四十一～四十五章，「完成第四十一章…」這類字樣不顯示
if(IS_APPX()){try{const CN7={};CH7.forEach(c=>{CN7[chCN(c)]=c});const RE7=new RegExp(`第(${Object.keys(CN7).join('|')})章`);
 const lockT=t=>{const m=String(t).match(RE7);return !!(m&&!appOk(CN7[m[1]]-1))};
 const sweep=()=>{try{$$('.opt[data-id]').forEach(b=>{if(b.style.display==='none')return;const it=ITEM[b.dataset.id];if(it&&it.chapter>=SZ.c0&&!appOk(it.chapter-1)&&!owns(it.id))b.style.display='none'});
  $$('button,[role="button"],.pbtn,.rmitem,.citem,li').forEach(b=>{if(b.style.display==='none'||b.classList.contains('wnode')||b.closest('.overlay .card.left')||b.classList.contains('pcard')||b.classList.contains('gzci'))return;const t=b.textContent||'';if(t.length<80&&lockT(t))b.style.display='none'})}catch(e){}};
 let sw7=0;new MutationObserver(()=>{if(sw7)return;sw7=requestAnimationFrame(()=>{sw7=0;sweep()})}).observe(document.body,{childList:true,subtree:true});
 const RE7S=new RegExp(`完成第(${Object.keys(CN7).join('|')})章`);
 const _sl7=say;say=function(parts,opt){try{if(Array.isArray(parts)&&parts.some(p=>typeof p==='string'&&RE7S.test(p)&&lockT(p)))return Promise.resolve()}catch(e){}return _sl7.call(this,parts,opt)}}catch(e){console.log('applock7',e)}}

/* ---------- 16. 學習報告、家長說明的字數 ---------- */
{const _pp7b=parentPanel;parentPanel=function(){const r=_pp7b.apply(this,arguments);try{const has7=window.__WR7&&__WR7.ready;if(has7){const ov=$$('.overlay').pop();if(ov)$$('p.small',ov).forEach(p=>{p.textContent=p.textContent.replace('ㄅ～ㄘ、A～V','ㄅ～ㄘ、ㄙ、ㄧㄨㄩ、A～Z、a～d')})}}catch(e){}return r}}

/* ---------- 16a. 給爸爸媽媽（S7PARENT）：完成第四十五章以後，家長專區多一列 ---------- */
if(DATA.PARENT&&typeof homeHub==='function'){const PA=DATA.PARENT;const _hb7=homeHub;homeHub=function(){const r=_hb7.apply(this,arguments);try{if(!V2[CERT7K()])return r;const ov=$$('.overlay').pop();const card=ov&&$('.card.hub',ov);if(!card||$('.hrow[data-k="s7parent"]',card))return r;
  const b=document.createElement('button');b.className='hrow';b.dataset.k='s7parent';b.innerHTML=`<span class="hic">${art('📮')}</span><span class="htx"><b>${esc7(PA.t)}</b><small>這一季學了什麼、在家可以一起做</small></span><i>›</i>`;
  const ref=$('.hrow[data-k="guide"]',card)||$('.hrow',card);ref?ref.after(b):card.appendChild(b);
  b.onclick=()=>{try{sfx('pop')}catch(e){}ov.remove();const o2=overlay(screen,`<div class="card left s7pa"><h2>${esc7(PA.t)}</h2>${(PA.p||[]).map(t=>`<p>${esc7(t)}</p>`).join('')}${PA.note?`<p class="small">${esc7(PA.note)}</p>`:''}<button class="btn" id="s7pax">回家長專區</button></div>`);$('#s7pax',o2).onclick=()=>{o2.remove();homeHub()}}}catch(e){console.log('parent7',e)}return r}}

/* ---------- 16b. 遊樂園接口：購買項目代號、季號（m8_ 的地球儀、攝影師讀這裡）；火箭飛行聽注音／字母加進第七季學過的字 ---------- */
window.__S7STAGE=SZ.stage;window.__S7C0=SZ.c0;
const isZ7=x=>/^[ㄅ-ㄩ]$/.test(x);
{const _r27=window.__r26extra;window.__r26extra=kind=>{const o=typeof _r27==='function'?_r27(kind):[];try{CH7.forEach(c=>{if(S.chDone>c-1)String(D7[c].learn||'').split('').forEach(x=>{if(kind==='zy'?isZ7(x):/^[A-Z]$/.test(x))o.push(x)})})}catch(e){}return o}}

/* ---------- 17. 還沒錄音的第七季台詞：只出字幕，不用裝置內建聲音 ---------- */
const S7TXT=window.__S7TXT=window.__S7TXT||new Set(),S7OPT=new Set();
const add7=t=>{if(!t)return;String(t).replace(/<br>/g,'').split(/(?<=[。！？!?])/).map(x=>x.trim()).filter(Boolean).forEach(x=>S7TXT.add(x))};
window.__s7add=add7;
CH7.forEach(c=>{const D=D7[c];[D.firstSay,D.endText,D.story_p,D.story_b,D.letter_p,D.letter_b,D.theater,D.gift,...D.story,...D.levels.map(L=>L[5])].forEach(add7)});
Q7.forEach(([,q,a,w,why])=>{add7(q);add7(why);[a,...w].forEach(o=>S7OPT.add(o[1]))});
[FIN7.h,FIN7.p,FIN7.pr,FIN7.dr,FIN7.c1,FIN7.c2,FIN7.c3,FIN7.next,...(FIN7.f||[]).map(x=>x[1]),FIN7_END,S7AD,S7NEXT,SZ.arcSay,'你想看哪一張？',FIN7.badge_no||'這個徽章還沒拿到喔！',...CH7.map((c,k)=>(FIN7.badge||[])[k]||`這是${D7[c].name}的${BADGE_ROW}！`)].forEach(add7);
CH7.forEach(c=>{(GIFT[c]||[]).forEach(id=>add7(`得到${NAME7(id)}了！`));const nm=(GIFT[c]||[]).map(NAME7).filter(Boolean).join('和');if(nm)add7(`得到${nm}了！`)});
const S7NAMES=[];CH7.forEach(c=>{S7NAMES.push(D7[c].name,'第'+chCN(c)+'章')});CH7.forEach(c=>(GIFT[c]||[]).forEach(id=>S7NAMES.push(NAME7(id))));
ROOM7.forEach(r=>S7NAMES.push(r[2]));PIC7.forEach(p=>S7NAMES.push(p[1]));S7NAMES.push(FIN7.cert_title,BADGE_ROW);
const S7EN=DATA.DEX.map(d=>d[2]+'.');
const _isS7b=t=>{const u=String(t);return S7NAMES.some(n=>n&&u.includes(n))};
const vt=t=>{try{return voiceT(typeof heroT==='function'?heroT(t):t)}catch(e){return t}};
function recOK(t,who){try{const u=vt(t).replace(/⁠/g,'');const pre=who==='prince'?'pz|':who==='dragon'?'dz|':'';
  if(!pre&&(voHas('z|'+u.trim())||voHas('z|'+voCk(u))))return true;
  return voSents(u).every(s=>pre?voHas(pre+s.trim()):voResolve(s).every(g=>typeof g==='string'))}catch(e){return false}}
function isS7(t){const u=String(t).replace(/<br>/g,'');if(S7TXT.has(u.trim())||_isS7b(u))return true;
 const ss=voSents(u);if(ss.some(s=>S7TXT.has(s)))return true;
 return u.split(/[，、？]/).some(x=>{const y=x.replace(/^(是|還是)/,'').trim();return y&&S7OPT.has(y)})}
const isWhole7=t=>typeof t==='string'&&/！(?=\S)/.test(t.trim())&&isS7(t);
const _say7=say;say=function(parts,opt){
 try{if(Array.isArray(parts)&&inS7(S.ch)&&S.ch<CIL&&parts.includes(NEWPET)){const g=D7[S.ch+1].gift;const k=parts.indexOf(NEWPET);parts=parts.slice(0,k).concat(g?[g]:[],parts.slice(k+1))}}catch(e){}
 try{if(Array.isArray(parts)&&(inS7(S.ch)||parts.some(p=>typeof p==='string'&&isS7(p)))){
  const inCh=inS7(S.ch)&&!S.pmode;let changed=false;let out=parts;
  // 第七季：不管有沒有打開語音包，沒錄音的一律不念（不用裝置內建聲音）
  out=parts.filter(p=>{if(typeof p==='string'){if(!p.trim())return true;
    let q=p;const who=(()=>{const u=p.replace(/<br>/g,'');if(!ISBOY&&Object.values(LETTER_P).includes(u))return 'prince';if(ISBOY&&Object.values(LETTER_B).includes(u))return 'dragon';
     if(!ISBOY&&u.startsWith('王子說：')){q=u.slice(4);return 'prince'}if(ISBOY&&vt(u).startsWith('火花說：')){q=vt(u).slice(4);return 'dragon'}return ''})();
    if((inCh||isS7(p))&&!recOK(q,who)){changed=true;return false}return true}
   if(p&&typeof p==='object'&&p.zh!=null&&!p.en&&!p.slow&&(p.who==='prince'||p.who==='dragon'||isS7(p.zh)||inCh)){const w=ISBOY&&(p.who==='prince'||(!p.who&&DRAGON_SAY.has(vt(String(p.zh)))))?'dragon':p.who;if(!recOK(p.zh,w)){changed=true;return false}}
   if(p&&typeof p==='object'&&p.en!=null&&S7EN.includes(String(p.en))){const k='e'+(p.slow||0)+'|'+p.en;if(!voHas(k)&&!voHas('e0|'+p.en)&&!voHas('e1|'+p.en)){changed=true;return false}}
   return true});
  const sep=(a,b)=>{try{return !!(S.vo&&VO.idx)&&recOK(a,'')&&recOK(b,'')&&!recOK(a+b,'')}catch(e){return false}};
  const o=[];out.forEach(p=>{const prev=o[o.length-1];if(typeof p==='string'&&typeof prev==='string'){if(isWhole7(p)||isWhole7(prev)){o.push({pause:150});changed=true}else if(sep(prev,p)){o.push({pause:60});changed=true}}o.push(p)});
  if(changed){const isCur=parts===S.cur;const o2=o.filter((p,k)=>!(p&&p.pause&&(k===0||o[k-1]&&o[k-1].pause)));if(isCur)S.cur=o2;return _say7.call(this,o2,opt)}}}catch(e){console.log('say7',e)}
 return _say7.apply(this,arguments)};
{const _vs7=voSpeak;voSpeak=async function(p,opt,gen){try{const txt=String(p&&typeof p==='object'?(p.en!=null?'':p.zh):p).trim();
  // 整句錄的（中間有句號、驚嘆號的兩句話）：有整句錄音就整句播
  if(txt&&voSents(txt).length>1&&!(typeof p==='object'&&(p.who||p.slow))&&S.vo&&VO.idx&&voHas('z|'+txt)){const b=await voBuf('z|'+txt);
   if(b&&gen===sayGen){const ok=await voPlay(b);if(ok!==false||gen!==sayGen)return}}}catch(e){}
  return _vs7.apply(this,arguments)}}

/* ---------- 18. 樣式（淡入、移動、亮光；沒有放大縮小） ---------- */
const st=document.createElement('style');st.textContent=`
.fin7{background:#1A2250}
.fin7 .fin7bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.fin7 .gfr.gtalk,.fin7 .fromdoor.gtalk{transform:translateY(-8px);filter:drop-shadow(0 0 10px rgba(255,230,140,.95));transition:transform .3s}
.fin7 .gparade{order:1}.fin7 .trio{order:2}.fin7 .endh{order:3}.fin7 .endp{order:4}.fin7 .endbtns{order:5}.fin7 .s7{order:6}
.cert7 .certin{background:linear-gradient(180deg,#F6FAFF,#E4EEFF)}.cert7 .certrib{background:linear-gradient(90deg,#4A6AC8,#8AAAF0)}.cert7 .certtt{color:#2A3A8A;text-shadow:0 2px 0 #DCE6FF}.cert7 .c3badge svg{height:100%;width:auto}
.certpick.cp6 .cprow{display:grid;grid-template-columns:repeat(3,auto);justify-content:center;gap:10px}
@media (min-width:760px){.certpick.cp6 .cprow{grid-template-columns:repeat(6,auto)}}
.s7pa p{margin:6px 0;line-height:1.6}
.abc7{max-width:640px;text-align:center}.abc7g{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin:8px 0 12px}
.abc7g span{display:flex;flex-direction:column;align-items:center;padding:4px 0;border-radius:12px;background:rgba(255,255,255,.12);font:700 clamp(22px,5vmin,34px)/1.1 var(--latin,'Baloo 2',sans-serif);color:rgba(255,255,255,.45);transition:background .25s,color .25s}
.abc7g span small{font-size:.6em}.abc7g span.on{background:#FFE27A;color:#5A2E8A;box-shadow:0 0 12px rgba(255,226,122,.8)}.s7pa{max-width:560px}
.s7b .s7mini{display:block;width:100%;height:100%}.s7b .s7mini svg{width:100%;height:100%;display:block;filter:drop-shadow(0 2px 3px rgba(20,10,60,.35))}
@media (prefers-reduced-motion:reduce){.fin7 .gfr.gtalk{transition:none}}`;document.head.appendChild(st);

/* ---------- 19. 重新打開時回到第四十一～四十五章 ---------- */
try{const c=window.__svCh41;
 if(typeof c==='number'&&c>=CI0&&c<CHAPTERS.length&&c!==S.ch&&c<=Math.max(S.chDone||0,0)&&s7Open(c)
  &&(typeof window.__chOpen!=='function'||window.__chOpen(c))){setCh(c);try{save()}catch(e){}}}catch(e){console.log('ch41restore',e)}
{const _rq7=renderQ;renderQ=function(){S.__auto=null;return _rq7.apply(this,arguments)}}
function autoAnswer(){try{if(typeof S.__auto==='function'){S.__auto();return true}const el=$(`.play [data-v="${String(S.ans).replace(/"/g,'\\"')}"]`);if(el){el.click();return true}}catch(e){}return false}
// 主程式已經先畫好首頁（mods 在 show('title') 之後才跑）：重畫一次，App 首頁「家長購買新章節」才會算到 stage9
try{if(S.screen==='title'&&!document.querySelector('.overlay'))setTimeout(()=>{try{if(S.screen==='title'&&!document.querySelector('.overlay'))show('title')}catch(e){}},0)}catch(e){}
window.__s7={SZ,CI0,CIL,CH7,D7,Q7_0,GIFT,grandFinale7,cert7Show,isS7,recOK,autoAnswer,inS7,art:window.__s7art,DATA,LEARN:()=>CH7.map(c=>D7[c].learn||'').join('')};

}).toString()+')()')})();

/* ================= 2.3 第八季「星光安全小隊」第四十六～五十章（m8sc_s8logic.js，接進遊戲） =================
   2026-11-28　星光工作室 Starlight Studio　｜　著作權與 IP 屬於星光工作室。
   接法照第七季 m7c_s7logic.js（同一套步驟，章號、季名、購買項目、獎狀都從 SZ 這一份設定來）。
   資料：window.__s8data（m8sa_s8data.js，dev/gen_s8.py 從 dev/s8_data.py 產生）。沒有資料：第八季不接（遊戲照第七季為止）。
   美術：S46、BG46、CH46、PET46、OBJ46（m8sb_s8art.js，B 寫）；沒有檔案、S46.LIVE 不是 true、或 window.S8ART===false 時用暫代圖（現有背景、色塊朋友、簡單小狗）。
   新題型：C1 的 m8se_learn8.js（pin8…case8）、C2 的 m8sf_safe8.js（danger8、phone8、okno8）、m8si_quest8.js（quest8）。
     這些檔排在 m8sc 後面；出題的時候（renderQ）才看 BUILD 裡有沒有那個題型，沒有就換成 S8FB 的備用題型（整合後自動用真的）。
   寫字：m8sd_write8.js（ㄚㄛㄜㄝ、e～k）。故事屋新書：m8sh_books8.js。
   動畫：只用淡入、移動、亮光；沒有整體放大縮小。 */
(function(){if(typeof window.__ev!=='function'){console.log('s8: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
'use strict';
try{
const X=window.__s8data||{};
const DATA={D:X.S8D,Q:X.S8Q||[],FIN:X.S8FIN,QTAG:X.S8QTAG||{},PT:X.S8PT||[],DEX:X.S8DEX||[],SEG:X.SEG8||null,TH:X.S8TH||null,PARENT:X.S8PARENT||null,FB:X.S8FB||{},HANDS:X.S8HANDS||[]};
if(!DATA.D||!DATA.FIN){console.log('s8: 還沒有 S8D／S8FIN，第八季先不接');window.__s8={off:1};return}
if(!window.__s7||window.__s7.off){console.log('s8: 第七季沒有接上，第八季先不接');window.__s8={off:1};return}
/* ---------- 0. 這一季的設定 ---------- */
const SZ={n:8,cn:'八',arc:'第十段',arcT:'星光安全小隊',c0:46,stage:'stage10',stageName:'第四十六～五十章',prevFin:'.fin7',prevP:'p.s7',
 cert:'星光安全小隊員',certKey:'cert8_',artNS:'S46',ic:'i:s46arc',icFB:'🛡️',
 icons:['🚒','👮','🛟','🚲','🔍'],chic:['i:s46c46','i:s46c47','i:s46c48','i:s46c49','i:s46c50'],
 fallbackBG:{fire46:'town',police47:'street',pool48:'farm',park49:'farm',home50:'castle'}};
const CH8=[0,1,2,3,4].map(k=>SZ.c0+k);
const CI0=SZ.c0-1,CIL=SZ.c0+3;                   // CHAPTERS 的 index：45～49
const D8=DATA.D,Q8=DATA.Q,FIN8=DATA.FIN;
SZ.arcSay=FIN8.arc||'第八季，星光安全小隊！';
const inS8=i=>i>=CI0&&i<=CIL;
if(CHAPTERS.length!==CI0){console.log('s8: CHAPTERS.length='+CHAPTERS.length+'（第八季要接在第四十五章後面）');if(CHAPTERS.length>CI0){window.__s8={off:1};return}}
window.__s8on=1;
const RM=()=>{try{return !!reduced}catch(e){return false}};
const IS_APPX=()=>{try{return typeof IS_APP!=='undefined'&&!!IS_APP}catch(e){return false}};
const esc8=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CNUM=n=>{const d='零一二三四五六七八九';if(n<=10)return n===10?'十':d[n];if(n<20)return '十'+(n%10?d[n%10]:'');return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'')};
const chCN=c=>(D8[c]&&D8[c].cn)||CNUM(c);
const hasIA=k=>{try{return !!k&&typeof ICONART!=='undefined'&&!!ICONART[k]}catch(e){return false}};
const icOr=(k,fb)=>hasIA(k)?k:fb;
/* ---------- 美術：真的或暫代 ---------- */
const ARTNS=window[SZ.artNS];
const ART_ON=!!ARTNS&&ARTNS.LIVE===true&&ARTNS.off!==true&&window.S8ART!==false;
const A8=ART_ON?ARTNS:{};
const BG8=ART_ON&&window.BG46||{};
const CHX=ART_ON&&window.CH46||{};
const PET8=ART_ON&&window.PET46||null;
window.__s8art={on:ART_ON,missing:['S46','BG46','CH46','PET46','OBJ46'].filter(k=>!(ART_ON&&window[k]))};

/* ---------- 1. 新朋友（AN）和背景 ---------- */
Object.keys(CHX).forEach(k=>{if(Object.prototype.hasOwnProperty.call(AN,k))return;try{Object.defineProperty(AN,k,{configurable:true,enumerable:true,get(){return CHX[k].f()}})}catch(e){console.log('an46',k,e)}});
// 還沒有圖的朋友：暫代（bearcop47 用現有的黑熊警察 blackbear；其他用圓圓的色塊＋眼睛）
const PH_AN=(c1,c2)=>`<ellipse cx="50" cy="90" rx="26" ry="5" fill="#000" opacity=".12"/><ellipse cx="50" cy="66" rx="26" ry="24" fill="${c1}"/><circle cx="50" cy="40" r="22" fill="${c1}"/><circle cx="34" cy="22" r="8" fill="${c2}"/><circle cx="66" cy="22" r="8" fill="${c2}"/>@E(42,58,40)<ellipse cx="50" cy="50" rx="6" ry="4" fill="${c2}"/><ellipse cx="38" cy="50" rx="4" ry="2.4" fill="#FF9AAE" opacity=".6"/><ellipse cx="62" cy="50" rx="4" ry="2.4" fill="#FF9AAE" opacity=".6"/>`;
const helpers=new Set();CH8.forEach(c=>{const D=D8[c];helpers.add(D.helper0);D.levels.forEach(L=>helpers.add(L[1]))});(FIN8.f||[]).forEach(([k])=>helpers.add(k));(DATA.PT||[]).forEach(p=>helpers.add(p[3]));
const PHC={firedog46:['#FFFFFF','#8A5A3A'],otter48:['#B8845A','#6A4428'],cat49:['#F4A04A','#C8682A']};
let phN=0;helpers.forEach(k=>{if(!k||Object.prototype.hasOwnProperty.call(AN,k))return;
 if(k==='bearcop47'&&Object.prototype.hasOwnProperty.call(AN,'blackbear')){try{Object.defineProperty(AN,k,{configurable:true,enumerable:true,get(){return AN.blackbear}})}catch(e){}return}
 const cs=PHC[k]||[['#F2B48A','#A8643A'],['#B8D8F0','#4A7AA8'],['#F4C8E0','#B85A8A'],['#CDE8B0','#5A8A3A']][phN++%4];try{AN[k]=PH_AN(cs[0],cs[1])}catch(e){}});
const veil=(k,fn)=>function(W,H){let d='';try{d=fn(W,H)}catch(e){console.log('bg46',k,e)}
 if(window.__mkVeil){d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="#FFFFFF" opacity=".22"/>`}return d};
const BGKEYS=[...new Set(CH8.map(c=>D8[c].bg).concat(Object.keys(BG8)))];
BGKEYS.forEach(k=>{if(BG8[k])CHBG[k]=veil(k,BG8[k]);else{const fb=SZ.fallbackBG[k]||'street';if(!CHBG[k]&&CHBG[fb])CHBG[k]=(W,H)=>CHBG[fb](W,H)}});
try{if(window.RD40BG)BGKEYS.forEach(k=>{if(CHBG[k])RD40BG[k]=(W,H)=>CHBG[k](W,H)})}catch(e){}
try{const _d8=decor2;decor2=function(id){if(BGKEYS.includes(id)&&CHBG[id]){let own=false;try{own=CHAPTERS[S.ch].bg===id&&!S.pmode}catch(e){}
  if(!own){const fn=CHBG[id];delete CHBG[id];try{return _d8(id)}finally{CHBG[id]=fn}}}return _d8(id)}}catch(e){}

/* ---------- 2. 題庫和標籤顏色（題目上的 emoji 有美術就換成第八季的物件圖） ---------- */
Object.assign(QTAG,DATA.QTAG);
let Q8use=Q8.map(q=>JSON.parse(JSON.stringify(q)));
try{if(typeof A8.quizIcons==='function'){const r=A8.quizIcons(Q8use);if(Array.isArray(r))Q8use=r}}catch(e){console.log('s8 quizIcons',e)}
const Q8_0=QUIZ.length;Q8use.forEach(q=>QUIZ.push(q));window.__s8Q0=Q8_0;

/* ---------- 3. 獎品（S8D[c].prize：pet、dress／boy、items、room） ---------- */
const PZ=c=>D8[c].prize||{};
const GIFT={};const ROOM8=[];
const NAME8=id=>(ITEM[id]||{}).name||'';
// 暫代圖：寵物小斑點狗（白底咖啡斑點）
const PH_PET=a=>`<svg viewBox="0 0 120 120" ${a||''} aria-hidden="true"><ellipse cx="60" cy="108" rx="34" ry="5" fill="#000" opacity=".12"/>
 <path d="M86 88 Q104 80 100 64" stroke="#FFFFFF" stroke-width="9" fill="none" stroke-linecap="round"/>
 <ellipse cx="60" cy="84" rx="28" ry="22" fill="#FFFFFF"/><circle cx="48" cy="80" r="6" fill="#6A4A3A"/><circle cx="72" cy="90" r="5" fill="#6A4A3A"/>
 <rect x="40" y="92" width="10" height="14" rx="5" fill="#F4F0EA"/><rect x="68" y="92" width="10" height="14" rx="5" fill="#F4F0EA"/>
 <g class="pbhead"><ellipse cx="34" cy="44" rx="9" ry="16" fill="#6A4A3A"/><ellipse cx="86" cy="44" rx="9" ry="16" fill="#6A4A3A"/><circle cx="60" cy="48" r="25" fill="#FFFFFF"/><circle cx="70" cy="36" r="6" fill="#8A6A5A"/>
  <circle cx="50" cy="48" r="3.6" fill="#2A1A14"/><circle cx="70" cy="48" r="3.6" fill="#2A1A14"/><circle cx="51" cy="47" r="1.2" fill="#fff"/><circle cx="71" cy="47" r="1.2" fill="#fff"/>
  <ellipse cx="60" cy="58" rx="4" ry="3" fill="#2A1A14"/><path d="M55 63 Q60 67 65 63" stroke="#2A1A14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="44" cy="58" rx="5" ry="3" fill="#FF9AAE" opacity=".6"/><ellipse cx="76" cy="58" rx="5" ry="3" fill="#FF9AAE" opacity=".6"/></g></svg>`;
const PH_BADGE=(a='')=>`<svg ${a} viewBox="0 0 200 200" aria-hidden="true"><path d="M70 150 L56 196 L76 186 L86 200 L96 156Z" fill="#4A7AC8"/><path d="M130 150 L144 196 L124 186 L114 200 L104 156Z" fill="#E86A8A"/>
 <path d="M100 14 L170 40 Q172 120 100 176 Q28 120 30 40Z" fill="#FFD24D"/><path d="M100 28 L158 50 Q158 116 100 160 Q42 116 42 50Z" fill="#4A6AC8"/>
 <path d="M100 58 L110 84 L138 84 L116 100 L124 126 L100 110 L76 126 L84 100 L62 84 L90 84Z" fill="#FFE27A"/><circle cx="84" cy="70" r="5" fill="#FFFFFF" opacity=".7"/></svg>`;
const PH_MINI=(k,a='')=>{const c=['#FFD0C8','#C8DCFF','#C8F0FF','#D8F0C0','#FFE0C8'][k]||'#E8F2FF';return `<svg ${a} viewBox="0 0 100 100" aria-hidden="true"><path d="M34 76 L26 98 L38 92 L44 100 L50 80Z M66 76 L74 98 L62 92 L56 100 L50 80Z" fill="#4A7AC8"/><circle cx="50" cy="46" r="40" fill="#FFD24D"/><circle cx="50" cy="46" r="33" fill="${c}"/><text x="50" y="58" font-size="34" text-anchor="middle">${SZ.icons[k]||'⭐'}</text></svg>`};
CH8.forEach(c=>{const P=PZ(c);const g=[];
 if(P.pet){ITEMS.push({id:P.pet[0],slot:'pet',name:P.pet[1],price:0,chapter:c});g.push(P.pet[0])}
 if(P.dress||P.boy){const it=ISBOY?(P.boy||P.dress):(P.dress||P.boy);ITEMS.push({id:it[0],slot:'dress',name:it[1],price:0,chapter:c});g.push(it[0])}
 (P.items||[]).forEach(x=>{if(x[0]==='head'&&ART_ON&&!(A8.HEAD&&A8.HEAD[x[1]]))return;if(x[0]==='head'&&!ART_ON)return;ITEMS.push({id:x[1],slot:x[0],name:x[2],price:0,chapter:c});g.push(x[1])});
 if(P.room)ROOM8.push([P.room[0],P.room[1],P.room[2],c]);
 GIFT[c]=g});
// 衣服：有美術就用，沒有就借第六季的（暫代）
CH8.forEach(c=>{const P=PZ(c);try{if(P.dress){const d=P.dress[0];if(A8.DRESS&&A8.DRESS[d])DRESS[d]=Object.assign({},A8.DRESS[d]);else if(!DRESS[d]&&DRESS.dress37)DRESS[d]=Object.assign({},DRESS.dress37)}
  if(P.boy){const b=P.boy[0];if(A8.BOY&&A8.BOY[b])BFIT[b]=Object.assign({},A8.BOY[b],{n:P.boy[1],chapter:c});else if(!BFIT[b]&&BFIT.b_vest37)BFIT[b]=Object.assign({},BFIT.b_vest37,{n:P.boy[1],chapter:c})}}catch(e){console.log('dress46',e)}});
ITEMS.forEach(i=>{ITEM[i.id]=i});
try{if(ART_ON&&typeof A8.hook==='function'&&window['__'+SZ.artNS.toLowerCase()+'hooked']!==1)A8.hook()}catch(e){console.log('s46hook',e)}
// 寵物：走 ICONPET → ICONART（accOverlay、寵物成長 pet19 都自動對）
const PETS8=CH8.map(c=>PZ(c).pet).filter(Boolean).map(p=>p[0]);
PETS8.forEach(id=>{try{const key='i:s8pet_'+id;
  Object.defineProperty(ICONART,key,{configurable:true,get(){try{if(PET8&&typeof PET8[id]==='function')return PET8[id]('','',2)}catch(e){console.log('pet46',e)}return PH_PET('')}});
  ICONPET[id]=key;
  if(!ACCANCH[id])ACCANCH[id]=Object.assign({h:[60,24],n:[60,70],s:1},(PET8&&PET8.anchor)||{});
  if(window.__p19&&__p19.K&&!__p19.K[id])__p19.K[id]=(PET8&&PET8.p19)||{hd:'pb',pv:[60,66]}}catch(e){console.log('pet8reg',e)}});
// 房間：新的一格「安全角落」safe8（第 47 章小手電筒和哨子、第 50 章我家的逃生路線圖；兩個都有就可以選「手電筒和逃生路線圖」兩個一起放）
// 分類標籤只在第八季打開時才加（App 沒打開第 46 章就不加；在 SCREENS.room 那一刻判斷，買了以後就出現）
const SAFE8=['safe8','安全角落'];
if(ROOM8.length&&!ROOMITEMS.safe8)ROOMITEMS.safe8=[['none','空空的角落',0]];
ROOM8.forEach(r=>{if(!ROOMITEMS[r[0]])r[0]='toy'});
ROOM8.forEach(([s,v,nm,c])=>{RMPRIZE.push([s,v,nm,c]);if(ROOMITEMS[s])ROOMITEMS[s].push([v,nm,999])});
if(ROOM8.length>=2&&ROOMITEMS.safe8){const lastC=Math.max(...ROOM8.map(r=>r[3]));RMPRIZE.push(['safe8','safe8both','手電筒和逃生路線圖',lastC]);ROOMITEMS.safe8.push(['safe8both','手電筒和逃生路線圖',999])}
// 位置照 E 的房間分配表（home23.md：H2 右牆上、H3 門邊）；B 的 roomPlace 沒給座標時也會讀 E 的 __H23.spot
const RPOS={escmap50:[746,177,52],kit47:[751,238,46]};
const PH_ROOM={kit47:`<svg viewBox="0 0 100 100"><rect x="18" y="10" width="64" height="12" rx="6" fill="#C8A070"/><path d="M34 22 V40 M66 22 V40" stroke="#8A6A4A" stroke-width="3"/><rect x="24" y="40" width="20" height="40" rx="6" fill="#FFB84A"/><circle cx="34" cy="44" r="7" fill="#FFF4C0"/><path d="M58 44 h18 a8 8 0 0 1 0 16 h-18z" fill="#6FB8F0"/><circle cx="62" cy="52" r="4" fill="#FFFFFF" opacity=".7"/></svg>`,
 escmap50:`<svg viewBox="0 0 100 100"><rect x="6" y="10" width="88" height="78" rx="6" fill="#FFFDF4"/><rect x="14" y="18" width="72" height="54" fill="none" stroke="#B8C8E0" stroke-width="3"/><path d="M14 46 H86 M50 18 V72" stroke="#B8C8E0" stroke-width="3"/><path d="M30 34 L42 34 L42 60 L66 60 L80 80" stroke="#4FC87A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M76 84 L84 78 L74 74Z" fill="#4FC87A"/><path d="M86 70 V92 M86 70 L96 74 L86 78" stroke="#E8505A" stroke-width="3" fill="#E8505A"/></svg>`};
const roomArt8=id=>{try{if(typeof A8.roomPlace==='function'){const r=A8.roomPlace(id);if(r)return r;const p=RPOS[id];return A8.roomPlace(id,p[0],p[1],p[2])}}catch(e){console.log('room46',e)}
 const p=RPOS[id];const svg=PH_ROOM[id]||'';return svg.replace('<svg ',`<svg x="${p[0]}" y="${p[1]}" width="${p[2]}" height="${p[2]}" `)};
// 預覽：p88 的「點一下先預覽」在裡面那層 roomSVG 換值又還原，這一層讀不到 → 安全角落分頁裡選到的那一張（.ropt.p88sel）就照它畫
const safeTabOn=()=>{try{return S.screen==='room'&&!!document.querySelector('.tab[data-s="safe8"][aria-selected="true"]')}catch(e){return false}};
const safeVal=()=>{try{if(safeTabOn()){const o=document.querySelector('.ropts .ropt.p88sel[data-v]');if(o)return o.dataset.v}}catch(e){}return roomGet('safe8')};
if(ROOM8.length){const _rs8=roomSVG;roomSVG=function(){const R=_rs8.apply(this,arguments);try{const v=safeVal();
  if(v==='safe8both'){ROOM8.forEach(r=>{R.bg=(R.bg||'')+roomArt8(r[1])})}else if(v&&v!=='none'&&ROOM8.some(r=>r[1]===v))R.bg=(R.bg||'')+roomArt8(v)}catch(e){console.log('room8',e)}return R}}
// 縮圖（選項卡、分類標籤）：base 的縮圖只裁得出它認得的格位，安全角落自己畫
const XS='xmlns="http://www.w3.org/2000/svg"';
const thumb8one=id=>{try{if(typeof A8.roomThumb==='function'){const t=A8.roomThumb(id);if(t)return t}}catch(e){}return (PH_ROOM[id]||'').replace('<svg ',`<svg ${XS} `)};
const inner8=svg=>String(svg||'').replace(/^\s*<svg\b[^>]*>/,'').replace(/<\/svg>\s*$/,'');
const vb8=svg=>(String(svg||'').match(/viewBox="([^"]+)"/)||[0,'0 0 100 100'])[1];
const EMPTY8=`<svg ${XS} viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" rx="14" fill="#FFE8F2"/><path d="M0 74 H100" stroke="#E8C8D8" stroke-width="3"/><rect x="26" y="20" width="48" height="10" rx="5" fill="#E6CDA8"/><circle cx="40" cy="25" r="2.5" fill="#B89870"/><circle cx="60" cy="25" r="2.5" fill="#B89870"/><path d="M38 52 h24" stroke="#E0B8CC" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 7"/></svg>`;
function thumb8(v){if(v==='safe8both'){const a=thumb8one('kit47'),b=thumb8one('escmap50');
  return `<svg ${XS} viewBox="0 0 200 100"><svg x="0" y="0" width="100" height="100" viewBox="${vb8(a)}">${inner8(a)}</svg><svg x="100" y="0" width="100" height="100" viewBox="${vb8(b)}">${inner8(b)}</svg></svg>`}
 if(v==='kit47'||v==='escmap50')return thumb8one(v);return EMPTY8}
const fill8=(host,v,wide)=>{if(!host)return;host.innerHTML=`<span class="s8th${wide?' s8w':''}">${thumb8(v)}</span>`};
function scrollRight8(){try{const scr=document.querySelector('.rmscroll');if(!scr||scr.scrollWidth<=scr.clientWidth+4)return;const x=scr.scrollWidth-scr.clientWidth;try{scr.scrollTo({left:x,behavior:RM()?'auto':'smooth'})}catch(e){scr.scrollLeft=x}}catch(e){}}
if(ROOM8.length){const _rm8=SCREENS.room;SCREENS.room=function(sel){
  // 分類標籤：第八季打開才有
  try{const want=s8Open(CI0);const k=ROOMSLOTS.findIndex(x=>x[0]==='safe8');if(want&&k<0)ROOMSLOTS.push(SAFE8);else if(!want&&k>=0)ROOMSLOTS.splice(k,1);if(!want&&sel==='safe8')sel='bed'}catch(e){}
  const r=_rm8.call(this,sel);
  try{const tab=document.querySelector('.tab[data-s="safe8"]');if(tab){const ti=tab.querySelector('.p88ti');if(ti)fill8(ti,roomGet('safe8'),roomGet('safe8')==='safe8both')}
   if(sel==='safe8'){document.querySelectorAll('.ropts .ropt[data-v]').forEach(b=>{const v=b.dataset.v;const th=b.querySelector('.p88th');if(th)fill8(th,v,v==='safe8both');else if(!b.querySelector('.s8th'))b.insertAdjacentHTML('afterbegin',`<span class="s8th s8sm">${thumb8(v)}</span>`);
     b.addEventListener('click',()=>{requestAnimationFrame(()=>requestAnimationFrame(scrollRight8))})});
    requestAnimationFrame(()=>requestAnimationFrame(scrollRight8));setTimeout(scrollRight8,400)}}catch(e){console.log('room8thumb',e)}
  return r}}
window.__s8GIFT=GIFT;

/* ---------- 4. 大地圖第十段、章節 ---------- */
CH8.forEach((c,k)=>{const D=D8[c];const col=DATA.QTAG[D.tag]||'#B8C8F0';
 WORLD.push({i:c-1,ic:()=>art(icOr(SZ.chic[k],SZ.icons[k])),c:D.wc||[col,'#2A3A7A'],name:D.name})});
ARCS.push({t:SZ.arcT,n:SZ.arc,from:CI0,ic:()=>art(icOr(SZ.ic,SZ.icFB)),say:SZ.arcSay});
const LETTER_P={},LETTER_B={};
CH8.forEach(c=>{const D=D8[c];
 const lv=D.levels.map(L=>L_(L[0],L[1],D.bg,L[3].slice(),L[4],L[5]));
 CHAPTERS.push({name:D.name,title:D.title,levels:lv,bg:D.bg,mix:[...S2MIX,'quiz:'+D.tag,'pin','m20','eword'],
  firstSay:D.firstSay,letter:D.letter_p,prize:PZ(c).pet?[PZ(c).pet[0]]:[],gems:10,prizeName:'',endText:D.endText,s8:c});
 const C=CHAPTERS[CHAPTERS.length-1];const P=PZ(c);
 const on=P.dress||P.boy?(ISBOY?(P.boy||P.dress):(P.dress||P.boy)):null;if(on&&!P.pet)C.outfitName=on[1];
 if(ISBOY){C.letter=D.letter_b;C.boyLetter=1;try{DRAGON_SAY.add(voiceT(C.letter.replace(/<br>/g,'')))}catch(e){}}
 else{try{PRINCE_LETTERS.add(C.letter.replace(/<br>/g,''))}catch(e){}}
 LETTER_P[c]=D.letter_p.replace(/<br>/g,'');LETTER_B[c]=D.letter_b.replace(/<br>/g,'')});
const S8NEXT=`下一站：第${SZ.cn}季「${SZ.arcT}」！`;
const S8AD=`這是第${SZ.cn}季的冒險內容，請爸爸媽媽到家長專區看看喔！`;

/* ---------- 4a. 題型保險：C1／C2 的題型還沒進來時，換成現有題型（出題那一刻才判斷） ---------- */
const FBK=new Set(Object.keys(DATA.FB||{}));
function fb8(code){const t=String(code||'').split(':')[0];if(!FBK.has(t))return null;
 // 題型在，但找危險的場景沒有（例如 police47）：也換掉
 let ok=typeof BUILD[t]==='function';
 try{if(ok&&t==='danger8'){const sc=String(code).split(':')[1];const H=window.__danger8;const L=H&&(H.list||H.scenes);if(L&&(Array.isArray(L)?!L.includes(sc):!L[sc]))ok=false}}catch(e){}
 if(ok)return null;
 let tag='';try{const c=S.ch+1;tag=(D8[c]&&D8[c].tag)||''}catch(e){}
 if(!tag){try{const m=String(code).match(/:(4[6-9]|50)\b/);tag=m?D8[+m[1]].tag:D8[SZ.c0].tag}catch(e){tag=D8[SZ.c0].tag}}
 const f=String(DATA.FB[t]||'quiz:{tag}').replace('{tag}',tag);const ft=f.split(':')[0];
 return typeof BUILD[ft]==='function'?f:'quiz:'+tag}
window.__s8fb=fb8;
{const _rq8=renderQ;renderQ=function(){try{if(Array.isArray(S.qs)){const cur=S.qs[S.q];const f=typeof cur==='string'?fb8(cur):null;if(f){console.log('s8: 題型還沒有，先用',cur,'→',f);S.qs[S.q]=f}}}catch(e){console.log('s8fb',e)}return _rq8.apply(this,arguments)}}

/* ---------- 5. 開場故事頁 ---------- */
const FRIEND8={'斑斑':'firedog46','黑熊警察':'bearcop47','浪浪':'otter48','小橘':'cat49'};
try{if(window.__ST19SPK)Object.assign(__ST19SPK,FRIEND8)}catch(e){}
const pgBg8=(c,i,n,main)=>{try{if(!ART_ON||!window.BG46_OPEN)return main;if(i===0&&BG8[BG46_OPEN[c]])return BG46_OPEN[c];if(i>=n-1)return main;const L=(window.BG46_STORY||{})[c]||[];const k=L.length?L[(i-1)%L.length]:'';return BG8[k]?k:main}catch(e){return main}};
const SAYERS=(()=>{const s=new Set(['火花',...Object.keys(FRIEND8)]);CH8.forEach(c=>{String(D8[c].story_b||'').replace(/([一-鿿]{1,4})說：/g,(_,n)=>{if(!/^[他她它]$/.test(n))s.add(n)})});return [...s]})();
const SAYRE=new RegExp(`(?=(?:${SAYERS.join('|')})說：)`);
function talk8(t){if(!ISBOY||!/火花說：/.test(t))return [t];const seg=t.split(SAYRE).filter(Boolean);const o=[];
 seg.forEach(s=>{if(o.length)o.push({pause:200});o.push(s.startsWith('火花說：')?{zh:s.slice(4),who:'dragon'}:s)});return o}
const _story8=SCREENS.story;
SCREENS.story=function(){if(!inS8(S.ch))return _story8.apply(this,arguments);
 const c=S.ch+1,D=D8[c];const bg=k=>`<svg class="bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice">${sbg(k)}</svg>`;
 const ver=ISBOY?D.story_b:D.story_p;const T=D.story.slice();T.splice(D.storyAt,0,ver);const hp=D.helper0||'robot';
 const fireB=()=>{try{if(S.look.pet==='dragon')return myPet();return petSVG('dragon','','')}catch(e){return myPet()}};
 const P=T.map((t,k)=>({t,a:()=>k===D.storyAt?`${princess(S.look)}<span class="bob">${ISBOY?fireB():prince()}</span>`:k===T.length-1?`${myPet('class="small"')}${princess(S.look)}<span class="bob">${animal(hp)}</span>`:`${princess(S.look)}<span class="bob">${animal(hp)}</span>`}));
 let i=0;
 function render(){const p=P[i];
  screen.innerHTML=`<div class="story s4story s5story s6story s7story s8story"><button class="skip" id="skip">跳過</button><div class="scard">
   <div class="scene">${bg(pgBg8(c,i,P.length,D.bg))}<div class="actors">${p.a()}</div></div><p class="stext">${p.t}</p>
   <div class="sdots">${P.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
   <button class="btn" id="next">${i<P.length-1?'下一頁':'去換裝'}</button></div></div>`;
  say(talk8(p.t));
  $('#next').onclick=()=>{if(i<P.length-1){i++;sfx('pop');render()}else go('guide')};
  $('#skip').onclick=()=>go('guide')}
 render()};

/* ---------- 6. 每一關先從那一關主題的題目抽；還沒玩到第八季的，一般問答不抽第八季的題目 ---------- */
{const _qz8=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{const c=S.ch+1;const D=inS8(S.ch)?D8[c]:null;
   if(D&&fcat===D.tag&&S.qs&&S.qs.__lv!==undefined&&D.lv&&D.lv[S.level]&&D.lv[S.level].length&&!S.pmode){
    const base=D.lv[S.level].map(k=>k+Q8_0).filter(k=>QUIZ[k]&&QUIZ[k][0]===D.tag);
    const seen=S.qs.__u8||(S.qs.__u8=[]);let i;const F=(D.first||{})[String(S.level)];
    if(S.qs.indexOf('quiz:'+D.tag)===S.q&&F!=null&&!seen.length)i=F+Q8_0;
    else{let pool=base.filter(x=>!S.usedQ.includes(x)&&!seen.includes(x));
     if(!pool.length){S.usedQ=S.usedQ.filter(x=>!base.includes(x));pool=base.filter(x=>!seen.includes(x))}
     if(!pool.length)pool=base;i=pick(pool)}
    if(i!=null&&QUIZ[i]){seen.push(i);
     const keep=S.usedQ.filter(x=>x!==i);S.usedQ=keep.concat(QUIZ.map((q,k)=>k).filter(k=>k!==i&&QUIZ[k][0]===D.tag&&!keep.includes(k)));
     try{return _qz8.apply(this,arguments)}finally{S.usedQ=keep.concat([i])}}}}catch(e){console.log('q46lv',e)}
  return _qz8.apply(this,arguments)}}
const appOk=i=>{try{return typeof window.__appOpen==='function'?!!window.__appOpen(i):true}catch(e){return false}};
const s8Open=i=>{try{return appOk(i)&&(IS_APPX()||(typeof s3Ok==='function'?!!s3Ok():!!V2.s3pw))}catch(e){return false}};
const s8QOk=()=>{try{if(inS8(S.ch)&&!S.pmode)return true;if(IS_APPX())return s8Open(CI0)&&S.chDone>=CI0;return S.chDone>=CI0}catch(e){return false}};
window.__s8QOk=s8QOk;window.__s8Open=s8Open;
{const _qz8g=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{if(!fcat&&!s8QOk()&&Array.isArray(S.usedQ)&&Q8.length){const SS=new Set();for(let k=Q8_0;k<Q8_0+Q8.length;k++)SS.add(k);
    let keep=S.usedQ.filter(x=>!SS.has(x));
    if(!QUIZ.some((q,k)=>!SS.has(k)&&!keep.includes(k)))keep=[];
    S.usedQ=keep.concat([...SS]);
    try{return _qz8g.apply(this,arguments)}finally{const add=S.usedQ.filter(x=>!SS.has(x)&&!keep.includes(x));S.usedQ=keep.concat(add)}}}catch(e){console.log('q46gen',e)}
  return _qz8g.apply(this,arguments)}}

/* ---------- 9. 破關小劇場（第 46～49 章各一句；第 50 章用季完結大結局） ---------- */
try{const A=k=>()=>animal(k),I=e=>()=>art(e);const TH=window.TH93;
 const isAN=k=>{try{return !!k&&Object.prototype.hasOwnProperty.call(AN,k)}catch(e){return false}};
 const OBK={'🚒':'i:s46firetruck','👛':'i:s46wallet','🛟':'i:s46ring','🔔':'i:s46bell'};
 if(TH&&TH.T93){CH8.slice(0,4).forEach((c,k)=>{const D=D8[c];if(!D.theater)return;const h=D.helper0||'robot';const X=(DATA.TH||{})[c];
  TH.T93[c-1]=X?{line:D.theater,o:X.o||'50% 60%',tint:X.tint||'day',deco:(X.deco||[]).map(([k2,an,x,y,sz])=>[isAN(k2)?A(k2):I(icOr(OBK[k2],k2)),an,x,y,sz])}:{line:D.theater,o:'50% 60%',tint:'day',deco:[[A(h),'bob',84,56,14],[I(SZ.icons[k]),'pop',16,16,8]]}});
 TH.BIG[CIL]='chend'}}catch(e){console.log('th46',e)}

/* ---------- 10. 第四十五章大結局：接到第八季 ---------- */
{const _ce45=SCREENS.chend;SCREENS.chend=function(){const r=_ce45.apply(this,arguments);
 try{if(S.ch===CI0-1&&$(SZ.prevFin)&&CHAPTERS[CI0]){const ln=$(`${SZ.prevFin} ${SZ.prevP}`);
   if(appOk(CI0)){if(ln)ln.textContent=S8NEXT;const eb=$(`${SZ.prevFin} .endbtns`);
    if(eb&&!$('#nextch8')){const b=document.createElement('button');b.className='btn';b.id='nextch8';b.textContent=`前往第${SZ.cn}季`;eb.insertBefore(b,eb.firstChild);
     const gc=$('#gcert');if(gc)gc.className='btn2';
     b.onclick=()=>{clearEnd();hush();setCh(CI0);if(S.prog>=NL)S.prog=0;S.walkFrom=null;save();go(S.prog===0?'story':'guide')}}}
   else if(ln)ln.textContent=S8AD}}catch(e){console.log('fin7to8',e)}
 return r}}

// 第七季大結局最後念的那一句（「…第八季…敬請期待！」）：第八季打開了就改成「下一站」
{const E7=(()=>{try{return window.__s7.D7[SZ.c0-1].endText}catch(e){return ''}})();const E7N='謝謝你當了這麼棒的城市小旅行家！下一站：第八季「星光安全小隊」！';
 if(E7){const _say7e=say;say=function(parts,opt){try{if(Array.isArray(parts)&&parts.includes(E7)&&appOk(CI0)&&S.ch===CI0-1)parts=parts.map(p=>p===E7?E7N:p)}catch(e){}return _say7e.call(this,parts,opt)}}}

/* ---------- 11. 章末禮物（第 46～49 章；第 50 章的信和禮物之後接季完結） ---------- */
{const _rw8=REWARD.chapter;REWARD.chapter=function(card,finish){if(!inS8(S.ch))return _rw8.apply(this,arguments);
 const c=S.ch+1,C=CHAPTERS[S.ch],ids=GIFT[c]||[];
 card.innerHTML=`<div class="scroll">${C.letter}<span class="sign">—— 王子</span>${sealSVG()}</div><button class="btn" id="next">看看禮物</button>`;
 say([{zh:C.letter.replace(/<br>/g,''),who:'prince'}]);
 $('#next',card).onclick=()=>{ids.forEach(id=>{if(!owns(id))S.owned.push(id)});S.newPrize=ids.slice();
  ids.forEach(id=>{const it=ITEM[id];if(!it)return;if(it.slot==='dress')S.look.dress=id;if(it.slot==='prop')S.look.prop=id;if(it.slot==='petacc')S.look.petacc=id});
  const n=C.gems||10;S.wallet+=n;save();try{renderBar()}catch(e){}
  const room=ROOM8.filter(r=>r[3]===c);
  const nl=ids.map(NAME8).filter(Boolean).concat(room.map(r=>r[2]));const names=nl.length>1?nl.slice(0,-1).join('、')+'和'+nl[nl.length-1]:(nl[0]||'');const it0=ITEM[ids[0]]||{};
  const roomPic=room.length?`<span class="s8rm">${(()=>{try{if(typeof A8.roomThumb==='function')return A8.roomThumb(room[0][1])}catch(e){}return PH_ROOM[room[0][1]]||''})()}</span>`:'';
  const pic=it0.slot==='pet'?`<span class="bob">${petSVG(ids[0],'')}</span>${princess(S.look)}`:roomPic?`${princess(S.look)}${roomPic}`:`${princess(S.look)}<span class="bob">${myPet('class="small"')}</span>`;
  card.innerHTML=`<div class="petshow">${pic}</div><h2>${names?`得到${names}！`:'好棒！'}</h2><p class="small">還有 ${n} 顆寶石！</p><button class="btn" id="cont">太棒了！</button>`;
  sfx('gem');confetti();say([names?`得到${names}了！`:'好棒！','還有十顆寶石！']);$('#cont',card).onclick=finish}}}
const NEWPET='你得到新的衣服和寵物了！點「換裝間」，可以換上新衣服喔！';
function s8CatchUp(){let ch=false;CH8.forEach(c=>{if(S.chDone>=c)(GIFT[c]||[]).forEach(id=>{if(!owns(id)){S.owned.push(id);ch=true}})});if(ch)save()}
window.__s8CatchUp=s8CatchUp;
{const _say8=say;say=function(parts,opt){try{if(Array.isArray(parts)&&inS8(S.ch)&&parts.includes(NEWPET)){const g=D8[S.ch+1].gift;const k=parts.indexOf(NEWPET);parts=parts.slice(0,k).concat(g?[g]:[],parts.slice(k+1));if(!parts.length)return Promise.resolve()}}catch(e){}return _say8.call(this,parts,opt)}}

/* ---------- 12. 第八季完結：頒獎典禮＋獎狀「星光安全小隊員」 ---------- */
const CERT8K=()=>SZ.certKey+(window.HERO||'princess');window.CERT8K=CERT8K;
const cert8Date=()=>{const c=V2[CERT8K()];if(!c||!c.d)return '';const [y,m,d]=c.d.split('-');return `${y} 年 ${+m} 月 ${+d} 日`};
const cert8Give=()=>{if(V2[CERT8K()])return false;const n=new Date();V2[CERT8K()]={d:`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`};save2();return true};
const FIN8_END=D8[SZ.c0+4].endText;
const S8BADGE=(a='')=>{try{if(typeof A8.BADGE==='function')return A8.BADGE(a)}catch(e){}return PH_BADGE(a)};window.S8BADGE=S8BADGE;
function certHTML8(o){try{if(typeof A8.certHTML==='function')return A8.certHTML(o)}catch(e){console.log('cert46',e)}const nm=(o.name||'').trim();const F=FIN8;
 return `<div class="card certcard cert3 cert8 cert8ph" role="dialog" aria-label="${esc8(F.cert_title)}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${esc8(F.cert_title)}</div><div class="certto">頒給：<b>${nm?esc8(nm):esc8(F.cert_to)}</b></div>
  <div class="certbody">${(F.cert_body||[]).map(s=>s==='<br>'?'<br>':`<span>${esc8(s)}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero}</span><span class="c3badge">${S8BADGE()}</span><span class="u">${o.pet}</span></div>
  <div class="certfoot"><div><div class="certsig">${esc8(F.cert_sign)}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${S8BADGE()}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`}
function cert8Show(after){const old=$('.certov');if(old)old.remove();
 const ov=overlay(screen,certHTML8({name:S.name||'',hero:princess(S.look),pet:myPet(),date:cert8Date()}));ov.classList.add('certov');
 const ok=$('#certok',ov);if(ok)ok.onclick=()=>{hush();ov.remove();if(after)after()};
 say([FIN8.c1,{pause:200},FIN8.c2,{pause:200},FIN8.c3]);return ov}
window.cert8Show=cert8Show;
const capOK=n=>{try{if(IS_APPX()&&typeof window.__bkCap==='function')return __bkCap()>=n;return true}catch(e){return false}};
const cert8Visible=()=>{try{return !!V2[CERT8K()]&&capOK(SZ.c0+4)}catch(e){return false}};
window.__cert8Visible=cert8Visible;
{const _cp7=certPick;certPick=function(){if(!cert8Visible())return _cp7.apply(this,arguments);
 const K=f=>{try{const k=typeof f==='function'?f():null;return !!(k&&V2[k])}catch(e){return false}};
 const v7=()=>{try{return typeof window.__cert7Visible==='function'&&window.__cert7Visible()}catch(e){return false}};
 const T7=(window.S7FIN&&window.S7FIN.cert_title)||'城市小旅行家';
 const L=[[K(typeof CERTK==='function'?CERTK:null),'2','星光小勇士','第二季'],[K(typeof CERT3K==='function'?CERT3K:null),'3','星光小幫手','第三季'],
  [K(window.CERT4K),'4','星光太空探險隊','第四季'],[K(window.CERT5K)&&capOK(35),'5','星光小管家','第五季'],[K(window.CERT6K)&&capOK(40),'6','大自然小守護者','第六季'],[v7(),'7',T7,'第七季'],[true,'8',FIN8.cert_title,`第${SZ.cn}季`]].filter(x=>x[0]);
 const open=s=>s==='8'?cert8Show():s==='7'?window.cert7Show():s==='6'?cert6Show():s==='5'?cert5Show():s==='4'?cert4Show():s==='3'?cert3Show():certShow();
 if(L.length<=1){hush();return open('8')}
 const seal=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#E8505A"/><circle cx="50" cy="50" r="36" fill="none" stroke="#FFE7B0" stroke-width="3" stroke-dasharray="4 4"/><path d="${certStarD(50,50,22,10)}" fill="#FFE27A"/></svg>`;
 const bd=f=>{try{return f()||seal}catch(e){return seal}};
 const ic={'2':seal,'3':bd(()=>S25BADGE()),'4':bd(()=>S4BADGE()),'5':bd(()=>S5BADGE()),'6':bd(()=>window.S6BADGE()),'7':bd(()=>window.S7BADGE()),'8':S8BADGE()};
 const n=L.length;
 const ov=overlay(screen,`<div class="card certpick${n>2?' cp3':''}${n>3?' cp4':''}${n>4?' cp5':''}${n>5?' cp6':''}${n>6?' cp7':''}"><h2>想看哪一張？</h2><div class="cprow">
  ${L.map(([,s,t,nn])=>`<button class="cpbtn" data-s="${s}"><span class="cpic">${ic[s]}</span><b>${esc8(t)}</b><small>${nn}</small></button>`).join('')}</div>
  <button class="btn2" id="cpno">關閉</button></div>`);
 say(['你想看哪一張？']);
 $$('.cpbtn',ov).forEach(b=>b.onclick=()=>{sfx('pop');hush();ov.remove();open(b.dataset.s)});
 $('#cpno',ov).onclick=()=>{hush();ov.remove();sfx('pop')}}}
{const _w8=SCREENS.world;SCREENS.world=function(){const r=_w8.apply(this,arguments);try{if(cert8Visible()){let b=$('#wcert');
 if(!b){const sp=$('.whead .phsp');if(sp){b=document.createElement('button');b.className='btn2 small';b.id='wcert';b.textContent='🏅 獎狀';sp.replaceWith(b)}}
 if(b)b.onclick=()=>{sfx('pop');certPick()}}}catch(e){console.log('cert8',e)}return r}}
let fin8Tok=0,fin8Cert=0;
function grandFinale8(){clearEnd();const tok=++fin8Tok;const live=()=>tok===fin8Tok&&S.screen==='chend';
 const calm=RM()||!!S.lite;const first=cert8Give();fin8Cert=0;
 screen.innerHTML=`<div class="ending grand fin4 fin8"><svg class="fin8bg" aria-hidden="true"></svg>
  <div class="gparade">${(FIN8.f||[]).map(([k],j)=>`<span class="gfr" data-k="${k}" style="animation-delay:${(1.2+j*.22).toFixed(2)}s">${animal(k)}</span>`).join('')}</div>
  <div class="trio"><div class="walkin">${princess(S.look)}</div><div class="fromdoor">${prince()}</div><div class="walkin u" style="animation-delay:.3s">${myPet()}</div></div>
  <h2 class="endh">${esc8(FIN8.h)}</h2><p class="endp">${esc8(FIN8.p)}</p>
  <div class="endbtns"><button class="btn" id="gcert">看獎狀</button><button class="btn2" id="again">再玩一次</button><button class="btn2" id="endworld">大地圖</button><button class="btn2" id="home">回首頁</button></div>
  <p class="s8">${esc8(FIN8.next||FIN8_END)}</p></div>`;
 fin8Bg();
 const T=(ms,f)=>endTimers.push(setTimeout(f,calm?0:ms));
 if(!calm){for(let k=0;k<10;k++)T(1800+k*900,()=>{if(!live()||fin8Cert)return;burst(innerWidth*(.12+Math.random()*.76),innerHeight*(.06+Math.random()*.28),46);if(k%3===0)sfx('gem')});
  T(3000,()=>{if(live()&&!fin8Cert)confetti()});T(3400,()=>$$('.fin8 .trio > div,.fin8 .gfr').forEach(d=>{const s=d.firstElementChild||d;s.classList.add('jig')}))}
 const cert=()=>{if(!live())return;fin8Cert=1;clearEnd();hush();cert8Show(()=>{if(live())say([FIN8_END])})};
 $('#gcert').onclick=cert;
 $('#again').onclick=()=>{fin8Tok++;clearEnd();hush();S.prog=0;S.walkFrom=null;save();go('guide')};
 $('#endworld').onclick=()=>{fin8Tok++;clearEnd();hush();go('world')};
 $('#home').onclick=()=>{fin8Tok++;clearEnd();hush();go('title')};
 (async()=>{const sw=a=>Promise.all([say(a),wait(calm?300:1800)]);const stop=()=>!live()||fin8Cert;
  const talk=async(sel,a)=>{const el=$(sel);if(el){el.classList.add('gtalk');if(!calm)burstEl(el,14)}await sw(a);if(el)el.classList.remove('gtalk')};
  await sw([FIN8.h,{pause:200},FIN8.p]);if(stop())return;
  for(const [k,t] of (FIN8.f||[])){if(stop())return;await talk(`.fin8 .gfr[data-k="${k}"]`,[t])}
  if(stop())return;await talk('.fin8 .fromdoor',[ISBOY?{zh:FIN8.dr,who:'dragon'}:{zh:FIN8.pr,who:'prince'}]);
  if(stop())return;if(!first){await sw([FIN8_END]);return}
  if($('.certov'))return;cert()})()}
window.grandFinale8=grandFinale8;
function fin8Bg(){const fe=$('.fin8'),g=fe&&$('.fin8bg',fe);if(!g)return;const r=fe.getBoundingClientRect();if(!r.width||!r.height)return;
 let W=Math.round(500*r.width/r.height),H=500;if(r.height>r.width){W=400;H=Math.round(400*r.height/r.width)}const key=W+'x'+H;if(g.dataset.k===key)return;
 g.dataset.k=key;g.setAttribute('viewBox',`0 0 ${W} ${H}`);g.setAttribute('preserveAspectRatio','xMidYMax slice');
 try{const k=D8[SZ.c0+4].bg;const f=(window.BG46_FIN&&BG8[BG46_FIN])||BG8[k]||CHBG[k];g.innerHTML=f?f(W,H):''}catch(e){}}
{let t8=0;addEventListener('resize',()=>{clearTimeout(t8);t8=setTimeout(()=>{try{if($('.fin8'))fin8Bg()}catch(e){}},150)})}
{const _ce8=SCREENS.chend;SCREENS.chend=function(){if(S.ch===CIL)return grandFinale8();return _ce8.apply(this,arguments)}}

/* ---------- 13. 自由練習 ---------- */
DATA.PT.forEach(([k,n,e,h,bg,qs])=>PTOPICS.push([k,n,e,h,bg,qs.slice()]));
const PT8=Object.fromEntries(DATA.PT.map(x=>[x[0],x[6]]));
const CLS8=t=>['pin8','tone8','zhuyin'].includes(t)?'zy':['low8','case8','letter'].includes(t)?'en':['floor8','route8','money8','change8','locker8','deep8','chart8','wheel8','clock8','count','measure','shape','clock','add','sub','compare'].includes(t)?'ma':'li';
try{if(window.__PCHN)Object.assign(__PCHN,PT8);const CT=window.__PCATS;if(CT){DATA.PT.forEach(([k,,,,,qs])=>{const t=String(qs[0]||'').split(':')[0];const id=CLS8(t);const c=CT.find(x=>x.id===id);if(c&&!c.ks.includes(k))c.ks.push(k)})}}catch(e){console.log('pcat8',e)}
{const _pp8=SCREENS.practice;SCREENS.practice=function(){const r=_pp8.apply(this,arguments);try{Object.entries(PT8).forEach(([k,c])=>{const i=c-1;
  const ok=s8Open(i)&&S.chDone>i;
  if(!ok){const b=document.querySelector(`.tcard[data-k="${k}"]`);if(b)b.remove()}})}catch(e){console.log('pt8',e)}return r}}
// 學習報告分類：C1 的 m8se_learn8.js 掛 window.__s8cls（接在 __h22.cls 前面），這裡不另外做

/* ---------- 14. 圖鑑：第八季的朋友；寶物「安全小隊徽章」一排 ---------- */
try{DATA.DEX.forEach(d=>{if(!DEX.some(x=>x[0]===d[0]))DEX.push(d)})}catch(e){}
const BADGE_ROW=FIN8.badge_row||'安全小隊徽章';
{const _dx8=SCREENS.dex;SCREENS.dex=function(tab){const r=_dx8.apply(this,arguments);try{if((tab||'ani')!=='tre')return r;const body=$('#dbody');if(!body||$('.trow.s8b',body))return r;
  const B=CH8.map(c=>({c:c-1,ok:S.chDone>c-1&&s8Open(c-1)}));if(!B.some(x=>x.ok)&&S.chDone<CI0)return r;
  const mini=k=>{try{if(typeof A8.MINI==='function')return A8.MINI(k)}catch(e){}return PH_MINI(k)};
  const row=document.createElement('div');row.className='trow s8b';row.innerHTML=`<h3>${art(icOr(SZ.ic,SZ.icFB))}${BADGE_ROW}</h3><div class="titems">${B.map((x,k)=>`<button class="titem${x.ok?'':' unk'}" data-c="${x.c}"><span class="tpic">${x.ok?`<span class="s8mini">${mini(k)}</span>`:WICON.stamp}</span><small>${x.ok?wName(x.c):'？'}</small></button>`).join('')}</div>`;
  body.appendChild(row);
  $$('.titem',row).forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(b.classList.contains('unk')){say([FIN8.badge_no||'這個徽章還沒拿到喔！']);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
   b.classList.remove('jig');void b.offsetWidth;b.classList.add('jig');sfx('gem');burstEl(b,16);say([(FIN8.badge||[])[c-CI0]||`這是${wName(c)}的${BADGE_ROW}！`])})}catch(e){console.log('dex8',e)}return r}}

/* ---------- 15. 網頁版密碼標題；App：stage10「第四十六～五十章」（完整版 full＝STAGES 全部的段，m9_pay290） ---------- */
{let want=-1;const _sh8=show;show=function(name,arg){try{want=S.ch;if(name==='title'||name==='chend')s8CatchUp()}catch(e){}return _sh8.apply(this,arguments)};
 const _g8=s3Gate;s3Gate=function(then){const r=_g8.apply(this,arguments);try{if(want>=CI0){const h=$('.s3gate h2');if(h)h.textContent=`第${SZ.cn}季搶先玩`}}catch(e){}return r};window.__s3Gate=s3Gate}
try{if(typeof STAGES!=='undefined'&&!STAGES.some(s=>s[0]===SZ.stage))STAGES.push([SZ.stage,SZ.stageName,CI0,CI0+5])}catch(e){console.log(SZ.stage,e)}
const SEG8=Object.assign({id:SZ.stage,r:SZ.stageName,arc:`第${SZ.cn}季・${SZ.arcT}`,from:SZ.c0,learn:[],extra:'',park:[]},DATA.SEG||{});
window.__S8SEG=SEG8;
{const _ih8=window.__iapShopHook;window.__iapShopHook=function(ov,price){const r=_ih8?_ih8.apply(this,arguments):undefined;try{const d=$('.f3intro',ov);if(!d||$('.f3seg[data-seg="s8"]',d))return r;
  let own=false;try{own=!!stageOpen(SZ.stage)}catch(e){}const g=SEG8;
  const items=ITEMS.filter(x=>x.chapter>=SZ.c0&&x.chapter<=SZ.c0+4&&['pet','dress','prop'].includes(x.slot));
  const sec=document.createElement('section');sec.className='f3seg'+(own?' own':'');sec.dataset.seg='s8';
  sec.innerHTML=`<div class="f3sh"><div><small>${g.r}</small><b>${g.arc}</b></div>${own?'<span class="f3tag">已解鎖 ✓</span>':''}</div>
   <div class="f3scs">${[0,1,2,3,4].map(i=>{const C=CHAPTERS[g.from-1+i];let bg='';try{bg=sbg(C.bg)}catch(e){}return `<figure class="f3sc" data-c="${g.from+i}"><span class="f3sv"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${bg}</svg></span><figcaption>${esc8(C.name)}</figcaption></figure>`}).join('')}</div>
   <div class="f3sub">學什麼</div><ul class="f3ul">${g.learn.map(t=>`<li>${esc8(t)}</li>`).join('')}</ul>
   <div class="f3sub">新的寵物、衣服和道具</div><div class="f3its">${items.map(it=>`<figure class="f3it"><span class="f3iv">${(()=>{try{return still(it.slot==='pet'?petSVG(it.id,''):princess({...S.look,[it.slot]:it.id},'',VB[it.slot]))}catch(e){return ''}})()}</span><figcaption>${esc8(it.name)}</figcaption></figure>`).join('')}</div>
   ${g.park&&g.park.length?`<div class="f3sub">遊樂園新遊戲</div><div class="f3pks">${g.park.map(([e,n,fb])=>`<span class="f3pk"><span class="pic">${art(hasIA(e)?e:fb)}</span>${esc8(n)}</span>`).join('')}</div>`:''}<p class="f3ex">${esc8(g.extra)}</p>`;
  const s7=$('.f3seg[data-seg="s7"]',d);const how=$('.f3how',d);if(s7&&s7.nextSibling)d.insertBefore(sec,s7.nextSibling);else if(how)d.insertBefore(sec,how);else d.appendChild(sec);
  }catch(e){console.log('intro8',e)}return r}}
// App：還沒打開的第四十六～五十章，「完成第四十六章…」這類字樣不顯示
if(IS_APPX()){try{const CN8={};CH8.forEach(c=>{CN8[chCN(c)]=c});const RE8=new RegExp(`第(${Object.keys(CN8).join('|')})章`);
 const lockT=t=>{const m=String(t).match(RE8);return !!(m&&!appOk(CN8[m[1]]-1))};
 const sweep=()=>{try{$$('.opt[data-id]').forEach(b=>{if(b.style.display==='none')return;const it=ITEM[b.dataset.id];if(it&&it.chapter>=SZ.c0&&!appOk(it.chapter-1)&&!owns(it.id))b.style.display='none'});
  $$('button,[role="button"],.pbtn,.rmitem,.citem,li').forEach(b=>{if(b.style.display==='none'||b.classList.contains('wnode')||b.closest('.overlay .card.left')||b.classList.contains('pcard')||b.classList.contains('gzci'))return;const t=b.textContent||'';if(t.length<80&&lockT(t))b.style.display='none'})}catch(e){}};
 let sw8=0;new MutationObserver(()=>{if(sw8)return;sw8=requestAnimationFrame(()=>{sw8=0;sweep()})}).observe(document.body,{childList:true,subtree:true});
 const RE8S=new RegExp(`完成第(${Object.keys(CN8).join('|')})章`);
 const _sl8=say;say=function(parts,opt){try{if(Array.isArray(parts)&&parts.some(p=>typeof p==='string'&&RE8S.test(p)&&lockT(p)))return Promise.resolve()}catch(e){}return _sl8.call(this,parts,opt)}}catch(e){console.log('applock8',e)}}

/* ---------- 16. 家長說明的字數；給爸爸媽媽（S8PARENT，完成第五十章以後家長專區多一列） ---------- */
{const _pp8b=parentPanel;parentPanel=function(){const r=_pp8b.apply(this,arguments);try{if(window.__WR8&&__WR8.ready){const ov=$$('.overlay').pop();if(ov)$$('p.small',ov).forEach(p=>{p.textContent=p.textContent.replace('ㄅ～ㄘ、ㄙ、ㄧㄨㄩ、A～Z、a～d','ㄅ～ㄘ、ㄙ、ㄧㄨㄩ、ㄚㄛㄜㄝ、A～Z、a～k')})}}catch(e){}return r}}
if(DATA.PARENT&&typeof homeHub==='function'){const PA=DATA.PARENT;const _hb8=homeHub;homeHub=function(){const r=_hb8.apply(this,arguments);try{if(!V2[CERT8K()])return r;const ov=$$('.overlay').pop();const card=ov&&$('.card.hub',ov);if(!card||$('.hrow[data-k="s8parent"]',card))return r;
  const b=document.createElement('button');b.className='hrow';b.dataset.k='s8parent';b.innerHTML=`<span class="hic">${art('📮')}</span><span class="htx"><b>${esc8(PA.t)}</b><small>這一季學了什麼、在家可以一起做</small></span><i>›</i>`;
  const ref=$('.hrow[data-k="s7parent"]',card)||$('.hrow[data-k="guide"]',card)||$('.hrow',card);ref?ref.after(b):card.appendChild(b);
  b.onclick=()=>{try{sfx('pop')}catch(e){}ov.remove();const o2=overlay(screen,`<div class="card left s8pa"><h2>${esc8(PA.t)}</h2>${(PA.p||[]).map(t=>`<p>${esc8(t)}</p>`).join('')}${PA.note?`<p class="small">${esc8(PA.note)}</p>`:''}<button class="btn" id="s8pax">回家長專區</button></div>`);$('#s8pax',o2).onclick=()=>{o2.remove();homeHub()}}}catch(e){console.log('parent8',e)}return r}}
// 遊樂園接口：購買項目代號、季號；火箭飛行聽注音加進第八季學過的韻母
window.__S8STAGE=SZ.stage;window.__S8C0=SZ.c0;
{const _r28=window.__r26extra;window.__r26extra=kind=>{const o=typeof _r28==='function'?_r28(kind):[];try{if(kind==='zy')CH8.forEach(c=>{if(S.chDone>c-1)String(D8[c].learn||'').split('').forEach(x=>{if(/^[ㄅ-ㄩ]$/.test(x))o.push(x)})})}catch(e){}return o}}

/* ---------- 17. 樣式（淡入、移動、亮光；沒有放大縮小） ---------- */
const st=document.createElement('style');st.textContent=`
.fin8{background:#1A2A50}
.fin8 .fin8bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.fin8 .gfr.gtalk,.fin8 .fromdoor.gtalk{transform:translateY(-8px);filter:drop-shadow(0 0 10px rgba(255,230,140,.95));transition:transform .3s}
.fin8 .gparade{order:1}.fin8 .trio{order:2}.fin8 .endh{order:3}.fin8 .endp{order:4}.fin8 .endbtns{order:5}.fin8 .s8{order:6}
.cert8ph .certin{background:linear-gradient(180deg,#FFF8F0,#FFE8D8)}.cert8ph .certrib{background:linear-gradient(90deg,#E8604A,#FFA060)}.cert8ph .certtt{color:#8A2A1A;text-shadow:0 2px 0 #FFE0D0}.cert8ph .c3badge svg{height:100%;width:auto}
.certpick.cp7 .cprow{display:grid;grid-template-columns:repeat(4,auto);justify-content:center;gap:10px}
@media (min-width:900px){.certpick.cp7 .cprow{grid-template-columns:repeat(7,auto)}}
.s8pa p{margin:6px 0;line-height:1.6}.s8pa{max-width:560px}
.s8th{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.s8th svg{width:100%;height:100%;display:block}.s8th.s8sm{width:44px;height:44px;margin-right:6px;flex:0 0 auto}
/* 窄螢幕（iPhone 390、SE 375）：獎狀卡不要超出畫面（每一季的獎狀都套用） */
@media (max-width:440px){.overlay.certov{padding:8px}.overlay.certov>.card.certcard{width:100%;max-width:560px;min-width:0;box-sizing:border-box;padding:8px}
 .overlay.certov .certin{min-width:0;max-width:100%;box-sizing:border-box}.overlay.certov .certtt{letter-spacing:1px}
 .overlay.certov .certart{gap:4px;min-width:0}.overlay.certov .certart>*{flex:0 1 auto;min-width:0}.overlay.certov .certart svg{max-width:100%}.overlay.certov .certfoot{min-width:0;gap:4px}}
.petshow .s8rm{display:inline-block;width:clamp(80px,22vmin,150px);height:clamp(80px,22vmin,150px)}.petshow .s8rm svg{width:100%;height:100%}
.s8b .s8mini{display:block;width:100%;height:100%}.s8b .s8mini svg{width:100%;height:100%;display:block;filter:drop-shadow(0 2px 3px rgba(20,10,60,.35))}
@media (prefers-reduced-motion:reduce){.fin8 .gfr.gtalk{transition:none}}`;document.head.appendChild(st);

/* ---------- 18. 重新打開時回到第四十六～五十章 ---------- */
try{const c=window.__svCh41;
 if(typeof c==='number'&&c>=CI0&&c<CHAPTERS.length&&c!==S.ch&&c<=Math.max(S.chDone||0,0)&&s8Open(c)
  &&(typeof window.__chOpen!=='function'||window.__chOpen(c))){setCh(c);try{save()}catch(e){}}}catch(e){console.log('ch46restore',e)}
try{if(S.screen==='title'&&!document.querySelector('.overlay'))setTimeout(()=>{try{if(S.screen==='title'&&!document.querySelector('.overlay'))show('title')}catch(e){}},0)}catch(e){}
window.__s8={SZ,CI0,CIL,CH8,D8,Q8_0,GIFT,ROOM8,grandFinale8,cert8Show,inS8,fb8,art:window.__s8art,DATA,PH:{pet:PH_PET,badge:PH_BADGE,mini:PH_MINI,room:PH_ROOM}};
}catch(e){console.log('m8sc',e);window.__s8err=String(e&&e.stack||e)}
}).toString()+')()')})();

/* ================= 5.4.0 介面修正 B（m9y_fixB.js）—— 2026-11-24 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 照 qa/review/B_ux.md（審查員 B）修版面和點擊目標。只改排法、大小、提示字，不改題目內容和圖案。
 * 1. 第七季新題型（m7e 的 window.__s7q.B7 外面包一層）：
 *    - 百數表「找一找」：手機直放整排拉到螢幕邊，一格至少約 36px；手機橫放拆成左右兩半（1～50｜51～100，每排還是十格），格子約 37px。
 *    - 百數表「哪一格不見了」：手機橫放表拆兩半、答案按鈕放右邊，全部看得到、點得到。
 *    - 照號碼排書：書和空格放大（空格至少 44px 寬），手機橫放書和書架左右排。
 *    - 方格地圖：地圖依畫面大小算格子大小（iPhone 直放變大），方位鈕縮成一排；手機橫放「說明在左、地圖和按鈕在右」。
 *    - 積木量身高：積木單位依畫面算到最大；盒子裡的積木點擊範圍至少 44px；加上「點積木，一個一個疊上去！」字和語音（S7G_0001，錄好才念）。
 *    - 排隊／書架序數 8 個以上：手機直放整排拉到螢幕邊，櫃台移到上面。
 *    以上版面都放得下，就不讓舊的整塊縮小（fitNow 的 zoom）把按鈕縮小。
 * 2. 第 41 章拆段故事 6 顆線索：窄螢幕線索變小，「跳過」一定在畫面裡。
 * 3. 手機橫放：關卡開場卡左圖右字、字母歌兩排、攝影師大照片左圖右字。
 * 4. 換裝間：已拿到的章節獎品排在分頁最前面（新章節在前）；章節地圖第 1 關名牌下緣不被切；相簿面板在窄螢幕不超出畫面；收集冊分頁 7 個以上在手機直放排兩排、名字不切；寵物小屋自動捲到選中的寵物；破關小劇場標題加深色底。
 * 動畫：只有透明度和亮光，沒有放大縮小。 */
(function(){if(typeof window.__ev!=='function'){console.log('fixB: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){try{
if(typeof BUILD==='undefined')return;
const Q7=window.__s7q||null;
const TIP_BLK='點積木，一個一個疊上去！';   // 新句子（lines/fixB.tsv S7G_0001）
const rec=t=>{try{return !!(Q7&&Q7.rec&&Q7.rec(t))}catch(e){return false}};
const vis=e=>{if(!e)return false;const s=getComputedStyle(e);if(s.display==='none'||s.position==='absolute'||s.position==='fixed')return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0};

/* ---------- 量一量：題目區放得下最大是多少 ---------- */
// 依目前排法量「需要的寬高」和「可以用的寬高」：直排看最低的東西到畫面底，橫排把寬度加起來
function measure(play){const kids=[...play.children].filter(vis);if(!kids.length)return null;
 const sc=document.getElementById('screen');const lim=Math.min(sc?sc.getBoundingClientRect().bottom:innerHeight,innerHeight)-6;
 const pr=play.getBoundingClientRect();const row=getComputedStyle(play).flexDirection==='row';const rs=kids.map(k=>{const r=k.getBoundingClientRect();return {top:r.top,bottom:Math.max(r.bottom,r.top+k.scrollHeight),width:Math.max(r.width,k.scrollWidth)}});
 const top=Math.min(...rs.map(r=>r.top)),bot=Math.max(...rs.map(r=>r.bottom));const gap=parseFloat(getComputedStyle(play).columnGap)||0;
 const needW=row?rs.reduce((a,r)=>a+r.width,0)+gap*(rs.length-1):Math.max(...rs.map(r=>r.width));
 // 直放時，地圖、表格可以用到題目區兩邊；橫放時可以用到題目區的寬
 return {needH:bot-top,availH:lim-Math.max(top,pr.top),needW,availW:pr.width}}
// 把一個 CSS 變數（px）調到放得下的最大值：先放最大，再照超出的比例縮
function fitVar(play,el,name,max,min){if(!el||!el.isConnected)return;let v=max;el.style.setProperty(name,v+'px');
 for(let i=0;i<7;i++){const m=measure(play);if(!m)break;const k=Math.min(1,m.availW/m.needW,m.availH/m.needH);if(k>=.997)break;
  const nv=Math.max(min,Math.floor(v*Math.min(.985,k)));if(nv>=v)break;v=nv;el.style.setProperty(name,v+'px')}return v}

/* ---------- 方格地圖：換大小之後，主角（寵物）放回原來那一格 ---------- */
function meCell(g){const me=g.querySelector('.g7me');if(!me)return null;const t=me.style.transform||'';const m=t.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);if(!m)return null;
 const gr=g.getBoundingClientRect();let best=null,bd=1e9;g.querySelectorAll('.g7c').forEach(c=>{const r=c.getBoundingClientRect();const d=Math.abs(r.left-gr.left-+m[1])+Math.abs(r.top-gr.top-+m[2]);if(d<bd){bd=d;best=c}});return best}
function mePut(g,c){const me=g.querySelector('.g7me');if(!me||!c)return;const gr=g.getBoundingClientRect(),r=c.getBoundingClientRect();
 const tr=me.style.transition;me.style.transition='none';me.style.transform=`translate(${r.left-gr.left}px,${r.top-gr.top}px)`;me.style.width=r.width+'px';me.style.height=r.height+'px';void me.offsetWidth;me.style.transition=tr}

/* ---------- 版面：每一種題目放好之後量一次 ---------- */
function fitFx(){try{const play=document.querySelector('.stage > .play');if(!play||!play.isConnected)return false;
 const box=play.querySelector('.fxbM');if(!box)return false;play.style.zoom='';
 if(box.classList.contains('fxbG')){const g=box.querySelector('.g7grid');const c=meCell(g);fitVar(play,g,'--g7s',76,30);if(c)mePut(g,c)}
 else if(box.classList.contains('fxbB'))fitVar(play,box,'--u',48,14);
 else if(box.classList.contains('fxbHF'))fitVar(play,box,'--h7h',48,26);
 else if(box.classList.contains('fxbHG'))fitVar(play,box,'--h7h',40,14);
 return true}catch(e){console.log('fixB fit',e);return false}}
window.__fitFxB=fitFx;
// 舊的整塊縮小：第七季這幾種題目由上面自己排，不用 zoom（zoom 會把按鈕縮小）
try{if(typeof fitNow==='function'){const _fn=fitNow;fitNow=function(){if(fitFx())return;return _fn.apply(this,arguments)}}}catch(e){console.log('fixB fitNow',e)}
let rzT=0;addEventListener('resize',()=>{clearTimeout(rzT);rzT=setTimeout(fitFx,140)});
const soon=()=>{fitFx();requestAnimationFrame(fitFx);setTimeout(fitFx,350);setTimeout(fitFx,900)};

/* ---------- 包第七季題型 ---------- */
if(Q7&&Q7.B7){const B7=Q7.B7;
 const after=(k,post)=>{const o=B7[k];if(typeof o!=='function')return;B7[k]=function(play){const r=o.apply(this,arguments);try{post.apply(this,arguments)}catch(e){console.log('fixB',k,e)}return r}};
 // 百數表
 after('s7hund',play=>{const t=play.querySelector('.h7tab');
  if(t){const find=!!t.querySelector('.h7c[data-v]');t.classList.add('fxbM',find?'fxbHF':'fxbHG');
   const cs=[...t.children];if(cs.length>50){t.classList.add('fxbSp');cs.forEach((c,i)=>{const r=Math.floor(i/10),col=i%10;c.style.setProperty('--sr',String(r%5+1));c.style.setProperty('--sc',String(col+1+(r>=5?11:0)))})}
   soon();return}
  const sh=play.querySelector('.h7shelf');if(sh){sh.classList.add('fxbBK');const bk=play.querySelector('.h7book');if(bk)bk.classList.add('fxbBK')}});
 // 方格地圖
 after('s7grid',play=>{const w=play.querySelector('.g7wrap');if(!w)return;w.classList.add('fxbM','fxbG');soon()});
 // 序數：8 個以上
 after('s7ord',play=>{const w=play.querySelector('.o7wrap');if(!w)return;w.classList.add('fxbO');if(play.querySelectorAll('.o7it').length>=8)w.classList.add('fxbO8')});
 // 積木量身高：念完題目接著念操作提示（錄好才念），畫面上也寫
 {const o=B7.s7blk;if(typeof o==='function')B7.s7blk=function(play){let pa=null;const sp0=setPrompt;setPrompt=function(){pa=[...arguments]};let r;
   try{r=o.apply(this,arguments)}finally{setPrompt=sp0}
   try{const w=play.querySelector('.b7wrap');const tray=play.querySelector('.b7tray');
    if(w){w.classList.add('fxbM','fxbB');if(tray){w.classList.add('fxbBm');
      const col=document.createElement('div');col.className='fxbtcol';tray.parentNode.insertBefore(col,tray);
      col.innerHTML=`<p class="fxbtip"><span aria-hidden="true">👆</span>${TIP_BLK}</p>`;col.appendChild(tray);col.classList.add('fxbnew');
      tray.addEventListener('click',()=>col.classList.remove('fxbnew'),{once:true});
      if(pa&&Array.isArray(pa[1])&&rec(TIP_BLK)){const np=[...pa[1],{pause:200},TIP_BLK];['__rev','__warm'].forEach(k=>{if(pa[1][k])np[k]=pa[1][k]});pa[1]=np}}}}catch(e){console.log('fixB blk',e)}
   if(pa)sp0.apply(this,pa);soon();return r}}
}

/* ---------- 寵物小屋：下面的寵物列自動捲到選中的寵物 ---------- */
function petRow(){try{const sw=document.querySelector('.pswitch');const on=sw&&sw.querySelector('.psw.on');if(!on)return;
 const l=on.getBoundingClientRect().left-sw.getBoundingClientRect().left+sw.scrollLeft,w=on.offsetWidth;if(l<sw.scrollLeft+4||l+w>sw.scrollLeft+sw.clientWidth-4)sw.scrollLeft=Math.max(0,l-(sw.clientWidth-w)/2)}catch(e){}}
try{if(SCREENS.pethouse){const _ph=SCREENS.pethouse;SCREENS.pethouse=function(){const r=_ph.apply(this,arguments);[0,80,450].forEach(t=>setTimeout(petRow,t));return r}}}catch(e){console.log('fixB pet',e)}

/* ---------- 章節地圖：最下面一關（第 1 關）的名牌貼著地圖底邊（y=1000），字的下緣被切掉 → 往上移一點 ---------- */
function mapLab(){try{document.querySelectorAll('.map svg.mapsvg text.nlab').forEach(t=>{const y=+t.getAttribute('y');if(y>=994&&!t.dataset.fxby){t.dataset.fxby=y;t.setAttribute('y',String(y-9))}})}catch(e){}}
try{if(SCREENS.map){const _mp=SCREENS.map;SCREENS.map=function(){const r=_mp.apply(this,arguments);mapLab();[60,400,1200].forEach(t=>setTimeout(mapLab,t));return r}}}catch(e){console.log('fixB map',e)}
addEventListener('resize',()=>setTimeout(mapLab,300));

/* ---------- 換裝間：每個分頁裡，已經拿到的章節獎品排最前面（章節新的在前）（Albert 11/24 同意） ----------
 * 通用規則：ITEMS 有 chapter、而且已經拿到（沒有鎖頭）的選項，依章節由新到舊排到最前面；其他照原本順序。
 * 只搬畫面上的按鈕，不改資料、存檔和目前穿著的選擇。 */
function wardSort(){try{const o=document.querySelector('.ward #opts');if(!o||typeof ITEMS==='undefined')return;
 const ch={};ITEMS.forEach(i=>{if(i&&i.id&&+i.chapter>0)ch[i.id]=+i.chapter});
 const kids=[...o.children];const pr=kids.filter(b=>b.classList.contains('opt')&&!b.classList.contains('locked')&&ch[b.dataset.id]);if(!pr.length)return;
 pr.sort((a,b)=>ch[b.dataset.id]-ch[a.dataset.id]||kids.indexOf(a)-kids.indexOf(b));
 if(pr.every((k,i)=>kids[i]===k))return;
 for(let i=pr.length-1;i>=0;i--)o.insertBefore(pr[i],o.firstChild)}catch(e){console.log('fixB ward',e)}}
window.__wardSortB=wardSort;
{let wr=0;try{new MutationObserver(()=>{if(wr||!document.querySelector('.ward #opts'))return;wr=requestAnimationFrame(()=>{wr=0;wardSort()})}).observe(document.body,{childList:true,subtree:true})}catch(e){}}
try{if(SCREENS.wardrobe){const _wd=SCREENS.wardrobe;SCREENS.wardrobe=function(){const r=_wd.apply(this,arguments);wardSort();return r}}}catch(e){}

/* ---------- 樣式 ---------- */
const st=document.createElement('style');st.id='fixBcss';st.textContent=`
/* 共用：第七季自己排的題目，按鈕在主角上面；放不下時往下用到主角那一區（主角只是裝飾） */
.stage:has(.fxbM,.fxbBK,.fxbO8)>.play{z-index:2;justify-content:flex-start}
/* 主角、寵物在題目下面；寵物說的提示泡泡在題目上面 */
.stage:has(.fxbM,.fxbBK,.fxbO8)>.cast{z-index:auto}.stage:has(.fxbM,.fxbBK,.fxbO8)>.cast .petbub{z-index:6}
.stage:has(.fxbM,.fxbBK,.fxbO8)>.play>:first-child{margin-top:auto}.stage:has(.fxbM,.fxbBK,.fxbO8)>.play>:last-child{margin-bottom:auto}

/* ---- 百數表 ---- */
.h7tab.fxbM{box-sizing:border-box}
.h7tab.fxbM .h7c{aspect-ratio:auto;height:var(--h7h,40px);box-sizing:border-box}
.h7tab.fxbHF{width:min(100%,640px);gap:2px}
.h7tab.fxbHF .h7c{font-size:clamp(14px,calc(var(--h7h,40px)*.46),22px)}
.h7tab.fxbHG .h7c{font-size:clamp(10px,calc(var(--h7h,30px)*.5),20px)}
@media (orientation:portrait) and (max-width:600px){
 .stage:has(.h7tab.fxbHF,.o7wrap.fxbO8){margin-inline:-14px;padding-inline:2px}
 .h7tab.fxbHF{width:100%;padding:2px;gap:0;border-radius:10px}
 .h7tab.fxbHF .h7c{border-radius:3px;border-width:1px}
}
@media (orientation:landscape) and (max-height:500px){
 .stage:has(.h7tab.fxbM){margin-inline:-14px;padding:6px 4px 4px;gap:4px}
 .stage:has(.h7tab.fxbM)>.talk{gap:10px;padding-inline:8px}
 .stage:has(.h7tab.fxbM)>.talk .helper{width:52px}
 .stage:has(.h7tab.fxbM)>.talk .bubble{min-height:0;padding:3px 8px 3px 14px}
 .stage:has(.h7tab.fxbM)>.talk .prompt{font-size:20px;line-height:1.3}
 .stage:has(.h7tab.fxbM)>.cast .team>:not(.petbub){visibility:hidden}
 .h7tab.fxbSp{grid-template-columns:repeat(10,minmax(0,1fr)) 8px repeat(10,minmax(0,1fr));width:100%;max-width:none;padding:2px;gap:0;margin:0}
 .h7tab.fxbSp>.h7c{grid-row:var(--sr);grid-column:var(--sc);border-radius:3px;border-width:1px}
 .stage:has(.h7tab.fxbHG)>.play{flex-direction:row;align-items:flex-start;gap:10px}
 .stage:has(.h7tab.fxbHG)>.play>.h7tab{flex:1 1 auto;width:auto;min-width:0}
 .stage:has(.h7tab.fxbHG)>.play>.tiles{flex:none;display:flex;flex-direction:column;gap:7px;margin:0!important}
 .stage:has(.h7tab.fxbHG)>.play>.tiles .tile{width:54px;font-size:28px;border-radius:16px}
}

/* ---- 照號碼排書 ---- */
.h7shelf.fxbBK{gap:3px;padding:6px 6px 10px;max-width:100%;box-sizing:border-box}
.fxbBK .h7bk{width:clamp(34px,9.4vw,64px);height:clamp(84px,24vmin,150px)}
.h7shelf.fxbBK .h7slot{width:clamp(44px,11vw,72px);height:clamp(84px,24vmin,150px);flex:none;border-width:3px}
.fxbBK .h7bk b{font-size:clamp(13px,3.4vw,22px);padding:0 2px}
@media (orientation:landscape) and (max-height:500px){
 .stage:has(.h7shelf.fxbBK)>.play{flex-direction:row;align-items:center;gap:14px}
 .fxbBK .h7bk,.h7shelf.fxbBK .h7slot{height:clamp(80px,26vh,120px)}
 .h7book.fxbBK{margin:0}
}

/* ---- 方格地圖 ---- */
.g7wrap.fxbG .g7grid{grid-template-columns:repeat(var(--c),var(--g7s,44px));grid-template-rows:repeat(var(--r),var(--g7s,44px))}
.g7wrap.fxbG .g7c{font-size:calc(var(--g7s,44px)*.55)}
.g7wrap.fxbG .g7nm{font-size:clamp(9px,calc(var(--g7s,44px)*.19),14px)}
.stage:has(.g7wrap.fxbG)>.play{gap:10px}
.stage:has(.g7wrap.fxbG) .g7dirs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:min(100%,560px)}
.stage:has(.g7wrap.fxbG) .g7dirs .g7d{width:auto;min-width:0;aspect-ratio:auto;height:clamp(56px,8vh,88px);font-size:clamp(18px,4.6vw,28px)!important;padding:4px 0 0;line-height:1.1;align-content:center;gap:2px}
.stage:has(.g7wrap.fxbG) .g7dirs .g7da{margin:0}
.stage:has(.g7wrap.fxbG) .g7opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;width:min(100%,520px)}
.stage:has(.g7wrap.fxbG) .g7opts .g7o{width:auto;min-width:0;aspect-ratio:auto;height:clamp(52px,7vh,76px);justify-content:center;white-space:nowrap}
@media (orientation:landscape) and (max-height:500px){
 .stage:has(.g7wrap.fxbG)>.play>.tiles{flex:none}
 .stage:has(.g7wrap.fxbG) .g7dirs{grid-template-columns:repeat(2,104px);width:auto}
 .stage:has(.g7wrap.fxbG) .g7dirs .g7d{width:104px;height:66px;font-size:20px!important}
 .stage:has(.g7wrap.fxbG) .g7opts{grid-template-columns:1fr;width:auto}
 .stage:has(.g7wrap.fxbG) .g7opts .g7o{width:170px;height:54px;font-size:19px!important}
}

/* ---- 積木量身高 ---- */
.b7wrap.fxbB{max-width:100%;box-sizing:border-box}
.fxbtcol{display:flex;flex-direction:column;align-items:center;gap:6px;align-self:center;margin-left:4px;flex:none;width:calc(3 * 46px + 16px)}
.fxbtip{margin:0;box-sizing:border-box;width:100%;padding:4px 10px;border-radius:12px;background:#FFF4C8;border:2px solid #FFC24D;color:#6A3A1A;font-size:clamp(14px,2.2vmin + 6px,19px);line-height:1.3;text-align:center}
.fxbtip span{margin-right:2px}
.b7wrap.fxbBm .b7tray{margin-left:0;max-width:calc(3 * 46px + 8px);gap:4px;padding:4px;border-radius:12px;background:rgba(200,134,42,.14);justify-content:center}
.b7wrap.fxbBm .b7tray .b7t{width:46px;height:46px;border:0;background:none;display:grid;place-items:center;position:relative}
.b7wrap.fxbBm .b7tray .b7t::before{content:'';width:min(var(--u),40px);height:min(var(--u),40px);box-sizing:border-box;border:2px solid #C8862A;background:#FFC86A;border-radius:4px}
.b7wrap.fxbBm .b7tray .b7t:nth-child(2n)::before{background:#FFB84A}
.fxbtcol.fxbnew .b7tray{animation:fxbglow 1.4s ease-in-out infinite}
@keyframes fxbglow{50%{box-shadow:0 0 0 4px #FFE27A,0 0 14px #FFD24D}}
@media (orientation:portrait) and (max-width:600px){.b7wrap.fxbB{padding:8px 8px 6px;gap:10px}}

/* ---- 手機橫放：說明在左、題目在右（方格地圖、積木） ---- */
@media (orientation:landscape) and (max-height:500px){
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB){display:grid;grid-template-columns:clamp(170px,27%,250px) minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;column-gap:12px;row-gap:4px;padding:8px 10px}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.talk{grid-column:1;grid-row:1;flex-direction:column;align-items:stretch;justify-content:center;gap:6px;min-height:0}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.talk .helper{width:54px;align-self:flex-start}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.talk .bubble{flex:none;padding:6px 8px 6px 12px;min-height:0}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.talk .prompt{font-size:19px;line-height:1.35}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.talk .speak{width:48px;height:48px;flex:none}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.play{grid-column:2;grid-row:1 / 3;flex-direction:row;align-items:center;justify-content:center;gap:12px;min-width:0}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.play>*{margin:0!important}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.cast{grid-column:1;grid-row:2;height:auto;min-height:0;flex-direction:column-reverse;align-items:stretch;gap:2px}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.cast .team{height:clamp(56px,17vh,72px);justify-content:center}
 .stage:has(.g7wrap.fxbG,.b7wrap.fxbB)>.cast .petbub{left:0;right:auto;max-width:100%;box-sizing:border-box;font-size:16px;padding:8px 12px}
 .stage:has(.b7wrap.fxbB)>.play>.tiles,.stage:has(.g7wrap.fxbG)>.play>.tiles:not(.g7dirs):not(.g7opts){display:grid;grid-template-columns:auto;gap:8px;flex:none}
 .stage:has(.b7wrap.fxbB)>.play>.tiles:has(>:nth-child(4)),.stage:has(.g7wrap.fxbG)>.play>.tiles:not(.g7dirs):not(.g7opts):has(>:nth-child(4)){grid-template-columns:auto auto}
 .stage:has(.b7wrap.fxbB)>.play>.tiles .tile,.stage:has(.g7wrap.fxbG)>.play>.tiles:not(.g7dirs):not(.g7opts) .tile{width:60px;font-size:32px;border-radius:18px}
 .stage:has(.b7wrap.fxbB) .b7more{flex:none}
 .stage:has(.b7wrap.fxbB) .b7more .tiles{display:grid;grid-template-columns:auto auto;gap:8px}
 .stage:has(.b7wrap.fxbB) .b7more .tile{width:60px;font-size:32px;border-radius:18px}
 .stage:has(.g7wrap.fxbG) .g7pad{margin:0}
}

/* ---- 序數（排隊、書架）：手機直放整排不超出畫面，櫃台移到上面；8 個以上再拉到螢幕邊 ---- */
@media (orientation:portrait) and (max-width:600px){
 .o7wrap.fxbO{max-width:100%;width:100%;box-sizing:border-box}
 .o7wrap.fxbO .o7row{width:100%;max-width:100%;flex-wrap:wrap;gap:2px;padding:4px 4px 8px;border-radius:12px}
 .o7wrap.fxbO8 .o7row{gap:0;padding:4px 2px 8px}
 .o7wrap.fxbO .o7desk{flex:0 0 100%;flex-direction:row;align-items:center;justify-content:flex-start;gap:6px;margin:0 0 2px 6px;font-size:26px}
 .o7wrap.fxbO .o7it{flex:1 1 0;min-width:0;max-width:64px;height:clamp(48px,7vh,64px)}
 .o7wrap.fxbO8 .o7it{max-width:none}
}

/* ---- 第 41 章拆段故事：線索 6 顆時，窄螢幕縮小線索，「跳過」一定在畫面裡 ---- */
.st19top>.st19clue{min-width:0;flex:0 1 auto}.st19top>.st19skip,.st19top>#st19skip{flex:none}
.st19clue .st19slot{flex:0 1 auto;min-width:18px}
@media (max-width:440px){
 .st19clue:has(.st19slot:nth-of-type(6)){padding:4px 8px 4px 10px;gap:2px}
 .st19clue:has(.st19slot:nth-of-type(6)) .st19slot{width:26px;height:26px}
 .st19clue:has(.st19slot:nth-of-type(6)) .st19clt{font-size:15px;margin-right:2px}
}

/* ---- 手機橫放：關卡開場卡（左圖右字） ---- */
@media (orientation:landscape) and (max-height:500px){
 .stage>.overlay{padding:6px}
 .stage>.overlay>.card:has(>.face+h2){display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:18px;row-gap:6px;align-items:center;justify-items:center;align-content:center;max-width:min(720px,100%);padding:10px 18px;overflow:auto}
 .stage>.overlay>.card:has(>.face+h2)>*{grid-column:2;margin:0}
 .stage>.overlay>.card:has(>.face+h2)>.face{grid-column:1;grid-row:1 / span 6;width:min(120px,26vh)}
 .stage>.overlay>.card:has(>.face+h2)>h2{font-size:clamp(22px,6vh,28px)}
 .stage>.overlay>.card:has(>.face+h2)>p{font-size:clamp(15px,4.4vh,18px);line-height:1.4}
 .stage>.overlay>.card:has(>.face+h2)>.btn{margin-top:2px}
}

/* ---- 字母歌：手機橫放排兩排 ---- */
@media (orientation:landscape) and (max-height:500px){
 .card.abc7{max-width:min(760px,100%);padding:10px 14px;gap:6px}
 .card.abc7 h2{margin:0;font-size:24px}
 .card.abc7 .abc7g{grid-template-columns:repeat(13,minmax(0,1fr));gap:4px;margin:4px 0 6px;width:100%}
 .card.abc7 .abc7g span{font-size:22px;padding:2px 0;border-radius:10px}
}

/* ---- 小小攝影師：相簿、全部照片、大照片不超出畫面 ---- */
.ph8ov .card.ph8end{width:min(900px,100%);max-width:100%;max-height:100%}
.ph8ov .card.ph8all{width:min(760px,100%);max-width:100%;max-height:100%}
.ph8ov .card.ph8big{width:min(420px,100%);max-width:100%;max-height:100%;overflow:auto}
@media (max-width:420px){.ph8ov .card.ph8end{padding:8px}.ph8end .ph8book{padding:8px 4px}.ph8end .ph8pics{gap:6px;padding:4px 2px 8px}.ph8end .ph8pol{width:clamp(78px,calc((100vw - 112px) / 3),150px)}.ph8end .ph8pol b{font-size:15px}.ph8end .ph8pol small{font-size:12px}.ph8end .row .btn,.ph8end .row .btn2{font-size:18px;padding:.35em .9em}}
@media (orientation:landscape) and (max-height:500px){
 .ph8ov .card.ph8end{padding:8px 12px}.ph8end .ph8book{padding:6px 10px}.ph8end .ph8book h2{margin:0 0 2px;font-size:22px}
 .ph8end .ph8pics{padding:4px 4px 6px;gap:10px}.ph8end .ph8pol{width:clamp(64px,calc((100vh - 300px) * 1.1),150px)}.ph8end .ph8pol b{font-size:14px}.ph8end .ph8pol small{font-size:11px}
 .ph8end .ph8gem{margin:2px 0 0}.ph8end .row{margin-top:6px}.ph8end .row .btn,.ph8end .row .btn2{font-size:18px;padding:.3em .9em;min-height:44px}
 .ph8ov .card.ph8big{display:grid;grid-template-columns:auto auto;align-items:center;justify-items:center;column-gap:16px;width:auto;padding:12px 16px}
 .ph8ov .card.ph8big img{grid-row:1 / span 3;width:auto;height:min(62vh,calc(100vh - 140px));max-width:52vw}
 .ph8ov .card.ph8big h2,.ph8ov .card.ph8big .ph8en,.ph8ov .card.ph8big .row{grid-column:2}
}

/* ---- 收集冊：分頁 7 個以上，手機直放排兩排，名字不切 ---- */
@media (orientation:portrait) and (max-width:560px){
 .cbtabs:has(>.cbtab:nth-child(7)){flex-wrap:wrap;row-gap:9px;column-gap:6px}
 .cbtabs:has(>.cbtab:nth-child(7))>.cbtab{flex:1 1 calc(25% - 6px);max-width:none;padding:4px 2px 5px}
 .cbtabs:has(>.cbtab:nth-child(7))>.cbtab .cbti{width:28px;height:28px}
 .cbtabs:has(>.cbtab:nth-child(7))>.cbtab b{font-size:13px;overflow:visible;text-overflow:clip}
}

/* ---- 小小攝影師：矮的橫放手機（667×375）快門鈕不超出畫面 ---- */
@media (max-height:400px){.ph8 .ph8stage{min-height:160px}.ph8 .ph8bar{padding-bottom:4px}}

/* ---- 地球儀國家小卡：關閉鈕 44px；矮的橫放手機小卡加寬，「再聽一次」不斷行 ---- */
.gl8 .gl8card .gl8x{width:44px;height:44px;font-size:18px;right:4px;top:4px}
.gl8:not(.land) .gl8card{padding-right:52px}
.gl8.land .gl8card{padding-top:52px}
.gl8 .gl8hear{white-space:nowrap;min-height:44px}
@media (max-height:460px){
 .gl8.land .gl8card{padding:8px 52px 8px 8px}
 .gl8.land .gl8txt p{font-size:15px}
}
@media (max-height:460px) and (max-width:700px){.gl8.land .gl8card{width:300px;min-width:300px}}

/* ---- 故事屋閱讀頁：手機直放書名一行（420 寬以下舊規則已經一行；這裡補 421～600 寬） ---- */
@media (orientation:portrait) and (max-width:600px){
 .reader.r99>.phead .gtitle{white-space:nowrap;min-width:0;overflow:hidden;text-overflow:ellipsis;font-size:clamp(17px,5.2vw,24px)}
 .reader.r99>.phead .phsp{min-width:0}
}

/* ---- 破關小劇場：標題加深色底，淺色背景上也看得清楚 ---- */
.th93title{right:auto;max-width:calc(100% - 130px);box-sizing:border-box;padding:3px 14px;border-radius:999px;background:rgba(36,24,84,.66)}
@media (prefers-reduced-motion:reduce){.fxbtcol.fxbnew .b7tray{animation:none;box-shadow:0 0 0 4px #FFE27A}}
`;document.head.appendChild(st);
}catch(e){console.log('fixB',e)}}).toString()+')()')})();

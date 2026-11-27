/* ================= 2.2 介面統一（m9zf_ui22.js）—— 2026-11-27 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 依 qa/uxaudit/report_ui.md 第 6、7 節（設計規範草案）。不用新美術、不用新錄音（沒有新台詞）。
 * 1. 共用返回鍵（.ub22）：每個畫面左上角同一顆紫底金箭頭圓鈕（iPad 64、手機看得到 52 可點 60），下面一行小字寫要回哪裡，一律回上一層。
 *    做法：各畫面原本的返回鍵（.p88back、塗色畫布 .c87back、章節列表 #wback）留著當「來源」，只是看不見、不能點；
 *    左上角的共用鈕按下去就幫它按（所以每個畫面原本回哪裡、要收什麼，都照舊）。
 *    沒有返回鍵的補上：章節地圖（回大地圖）、換裝間（回原本來的地方，跟「穿好了！」去同一個地方）。
 *    拿掉：章節地圖底部「大地圖」小字鍵；大地圖、遊樂園大門重複的「回首頁」長條（右上已有房子鍵）。
 *    闖關題目、過關、片尾、故事不加（題目畫面照舊長按地圖／房子才離開）。小遊戲的開始選單、結束卡上面也按得到返回鍵。
 *    例外：塗色畫布在手機橫放時，左邊整排是工具，返回鍵留在右欄最上面原本的位置（同一款，不放小字）。
 * 2. 上方圓鈕：iPad 看得到 52、可點 64；手機看得到 52、可點 60（透明擴大）；間距 12 以上；
 *    排法改成「聲音、音樂」｜「地圖、房子」兩組，中間多空一格，房子不再緊貼聲音。版面高度不變（用負邊界）。
 * 3. 兒童畫面最小字 iPad 16、手機 14：大地圖每章（「第Ｘ章」改成圓圈上的數字、星星只寫拿到幾顆）、遊樂園分區說明、
 *    遊戲選單說明、故事屋／塗色本的寶石數字和「新」、英文動一動、換裝間衣服名稱、圖鑑英文、寵物小屋、存錢小豬等。
 * 4. 答對固定信號：每次答對先「叮咚」（sfx 新增 ding22，合成音）＋選到的卡片綠光（#6FE3A8 光框，不放大縮小），0.24 秒後照舊隨機慶祝。
 * 5. 「再聽一次」喇叭：同一款金色（iPad 64、手機看得到 52 可點 60），放在字幕框右邊：小小廚師、收銀台、化石、火箭、攝影師、
 *    星星小考、存錢小豬、水盆／農場／舞會；盪藤蔓、地球儀原本沒有喇叭，補上（按了重念字幕框那一句）。
 * 6. 通知精簡：「房間有新東西！」「新禮物送到了！」「寵物有新玩具！」改成最多 6 個小圖＋「還有 N 個」（名字照舊用語音念）。
 * 7. 遊樂園小遊戲：開始選單一律深紫卡＋白色選項、選中金框；結束卡一律左「再玩一次」金色大鈕、右「回遊樂園」紫色鈕
 *    （攝影師順序改過來；盪藤蔓補結束卡；「離開收銀台」等改成「回遊樂園」）；進度點同一款星星。手機橫放選單放得下。
 * 8. 從換裝間去存錢小豬：回來的鈕改成「回換裝間」，回到換裝間後「穿好了！」和返回鍵照樣回原本的地方。
 * 9. 音樂、聲音關掉：圖示加一條斜線，不再整顆變淡。天空的月亮在有返回鍵的畫面淡掉，不壓在返回鍵後面。
 * 不加新台詞、不用裝置語音；新加的動畫只用淡入、移動、亮光，不用 scale（喇叭外圈沿用闖關喇叭原本的光圈）。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
const UB={on:false,src:null,act:null,lab:'',tick:0,wardFrom:null,wardR19:0,pigWard:false};window.__ub22=UB;
const PHONE=()=>Math.min(innerWidth,innerHeight)<=500;
/* ---------- 共用返回鍵 ---------- */
const AR22=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M23.5 9.5 L13 20 L23.5 30.5" stroke="#8A5A14" stroke-width="8.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6 20 H30" stroke="#8A5A14" stroke-width="8.4" stroke-linecap="round"/><path d="M23.5 9.5 L13 20 L23.5 30.5" stroke="#FFD98A" stroke-width="5.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6 20 H30" stroke="#FFD98A" stroke-width="5.6" stroke-linecap="round"/><path d="M21.6 11.6 L16.4 16.8" stroke="#FFF6D8" stroke-width="1.6" stroke-linecap="round" opacity=".85"/></svg>`;
let ub=null;
function mkUB(){const b=document.createElement('button');b.type='button';b.className='ub22';b.hidden=true;b.innerHTML=`<span class="ub22c">${AR22}</span><span class="ub22l"></span>`;return b}
const scr=()=>document.getElementById('screen');
const labOf=t=>{t=String(t||'').replace(/\s+/g,'').trim();const m=/^(?:回到|回|返回)(.+)$/.exec(t);return m?m[1]:t||'返回'};
// 每個畫面：找來源返回鍵，或特別規則
const HIDE_HOME=['world','park'];       // 這兩個畫面的「回首頁」長條拿掉（右上有房子鍵）
const NONE=['title','stage','chend','finale','story','story19','theater93','guide','rest','limit','r99play'];
function inOv(e){return !!e.closest('.overlay,.card,[role=dialog],.s8dlg,.coach')}
function findSrc(root){const c=[...root.querySelectorAll('#eaback,.p88back,.c87back,#wback')].filter(e=>e.tagName==='BUTTON'&&!e.classList.contains('ub22')&&!inOv(e));
 // 自己這個畫面還看得到的（被畫面本身收起來的不算）
 for(const e of c){if(e.getClientRects().length)return e}return null}
function wardTarget(){try{if(window.__r19ward)return ['房間','回房間'];if(S.from==='map')return ['地圖','回地圖'];return ['首頁','回首頁']}catch(e){return ['返回','返回']}}
function decide(){const sc=S.screen,root=scr();if(!root)return null;
 if(NONE.includes(sc))return null;
 if(sc==='map')return {lab:'大地圖',aria:'回大地圖',act:()=>{try{hush()}catch(e){}go('world')}};
 if(sc==='wardrobe'){const d=document.getElementById('done');if(!d)return null;const [l,a]=wardTarget();return {lab:l,aria:a,act:()=>{const x=document.getElementById('done');if(x)x.click()}}}
 // 同一顆鈕可能換字（遊樂園大門「回首頁」→ 分區裡「回遊樂園大門」）：不是「回首頁」了就放回來
 root.querySelectorAll('.ub22gone').forEach(e=>{if(!HIDE_HOME.includes(sc)||!/^回首頁$/.test((e.textContent||'').replace(/\s+/g,'')))e.classList.remove('ub22gone')});
 const s=findSrc(root);if(!s)return null;
 let t=(s.textContent||'').trim()||s.getAttribute('aria-label')||'';if(s.classList.contains('c87back')&&sc==='coloring')t='回塗色本';if(s.id==='eaback')t='回英文動一動';
 if(HIDE_HOME.includes(sc)&&/^回首頁$/.test(t.replace(/\s+/g,''))){if(!s.classList.contains('ub22gone'))s.classList.add('ub22gone');return null}
 const anchor=s.classList.contains('c87back')&&document.body.classList.contains('c87L')&&!document.body.classList.contains('c87Lt');
 return {src:s,anchor,lab:labOf(t),aria:t.replace(/\s+/g,'')||'返回',act:()=>{if(s.isConnected)s.click()}}}
function place(){if(!ub)return;try{
  // 塗色畫布（手機橫放）：左邊整排是工具，返回鍵留在右邊那一欄最上面（原本的位置），只是換成同一款（不放小字）
  ub.classList.toggle('ub22a',!!UB.anchor);
  if(UB.anchor&&UB.src){const r=UB.src.getBoundingClientRect(),w=ub.offsetWidth||64,cw=52;setXY(ub,Math.round(r.left+r.width/2-w/2+6),Math.round(Math.max(2,r.top+r.height/2-cw/2)));return}
  const app=document.getElementById('app'),bar=document.getElementById('bar');const a=app.getBoundingClientRect(),cs=getComputedStyle(app);
  const ph=PHONE(),cw=ph?52:64;let x=a.left+parseFloat(cs.paddingLeft)-(ph?4:4);let y=a.top+parseFloat(cs.paddingTop);
  const br=bar&&!bar.hidden&&getComputedStyle(bar).display!=='none'?bar.getBoundingClientRect():null;
  if(br&&br.height>10){y=br.top+br.height/2-cw/2}
  const sat=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ub22sat'))||0;
  y=Math.max(y,sat+3);x=Math.max(x,2);
  setXY(ub,Math.round(x),Math.round(y))}catch(e){}}
function setXY(e,x,y){if(e.style.left!==x+'px')e.style.left=x+'px';if(e.style.top!==y+'px')e.style.top=y+'px'}
const cls=(e,c,on)=>{if(e&&e.classList.contains(c)!==!!on)e.classList.toggle(c,!!on)};
let lastKey='';
function scan(){UB.tick++;try{const root=scr();if(!root)return;
 if(!ub||!ub.isConnected||ub.parentNode!==root){root.querySelectorAll(':scope > .ub22').forEach(x=>x.remove());ub=ub||mkUB();root.appendChild(ub)}
 // 上一次的來源：還原（換畫面、換子畫面時）
 const d=decide();
 if(UB.src&&(!d||d.src!==UB.src)&&UB.src.classList.contains('ub22src')){UB.src.classList.remove('ub22src')}
 UB.src=d&&d.src||null;UB.act=d&&d.act||null;UB.anchor=!!(d&&d.anchor);
 if(UB.src&&!UB.src.classList.contains('ub22src'))UB.src.classList.add('ub22src');
 const on=!!d;const key=on?(d.lab+'|'+d.aria):'';
 if(key!==lastKey){lastKey=key;if(on){ub.querySelector('.ub22l').textContent=d.lab;ub.setAttribute('aria-label',d.aria)}}
 if(ub.hidden===on)ub.hidden=!on;
 if(UB.on!==on){UB.on=on;document.body.classList.toggle('ub22on',on)}
 if(on)place();
}catch(e){console.log('ub22 scan',e)}}
let scT=0,scPend=false;
function soon(){if(scPend)return;scPend=true;const dt=performance.now()-scT;setTimeout(()=>{scPend=false;scT=performance.now();scan()},dt>220?0:220-dt)}
// 保險：每秒看一次（漏掉的變化、很忙的時候）
setInterval(()=>{try{if(!document.hidden&&performance.now()-scT>900)soon()}catch(e){}},1000);
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('.ub22');if(!b)return;e.preventDefault();e.stopPropagation();
 if(typeof going!=='undefined'&&going)return;try{scan()}catch(_){}const f=UB.act;if(!f)return;try{sfx('pop')}catch(_){}try{f()}catch(err){console.log('ub22 act',err)}},true);
{const _sh=show;show=function(name){
  // 8. 從存錢小豬回換裝間：還原換裝間原本是從哪裡來的
  try{if(name==='wardrobe'){if(UB.pigWard){UB.pigWard=false;S.from=UB.wardFrom;if(UB.wardR19)window.__r19ward=1}else{UB.wardFrom=S.from;UB.wardR19=window.__r19ward?1:0}}else if(name!=='piggy5')UB.pigWard=false}catch(e){}
  const r=_sh.apply(this,arguments);try{scan();setTimeout(scan,60);setTimeout(scan,450)}catch(e){}return r}}
try{const r=scr();if(r)new MutationObserver(soon).observe(r,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']})}catch(e){}
addEventListener('resize',()=>{place();setTimeout(place,200);soon()});
// 星星小考在 body 下面：出現時也要套喇叭樣子
try{let rvo=null;new MutationObserver(()=>{const rv=document.getElementById('rv181');if(rv&&(!rvo||rvo.__el!==rv)){if(rvo)rvo.disconnect();rvo=new MutationObserver(soon);rvo.__el=rv;rvo.observe(rv,{childList:true,subtree:true});soon()}}).observe(document.body,{childList:true})}catch(e){}
/* ---------- 章節地圖：拿掉「大地圖」小字鍵（返回鍵取代）、換裝間小鍵加大可點範圍：在樣式裡 ---------- */
/* ---------- 8. 存錢小豬：從換裝間來的，回換裝間 ---------- */
if(SCREENS.piggy5){const _pg=SCREENS.piggy5;SCREENS.piggy5=function(){const fromW=S.from==='wardrobe';const r=_pg.apply(this,arguments);
  try{if(fromW){const b=document.getElementById('pback');if(b){b.textContent='回換裝間';b.onclick=()=>{try{hush()}catch(e){}UB.pigWard=true;go('wardrobe')}}}}catch(e){console.log('ub22 pig',e)}return r}}
/* ---------- 9. 音樂、聲音關掉：加斜線 ---------- */
{const _rb=renderBar;renderBar=function(){const r=_rb.apply(this,arguments);try{
  ['btnMusic','btnSound'].forEach(id=>{const b=document.getElementById(id);if(!b)return;if(!b.querySelector('.sl22'))b.insertAdjacentHTML('beforeend','<i class="sl22" aria-hidden="true"></i>')});
  soon()}catch(e){}return r}}
/* ---------- 天空的月亮：有返回鍵的畫面淡掉：在樣式裡 ---------- */
/* ---------- 4. 答對固定信號：先「叮咚」＋選到的卡片綠光，再照舊隨機慶祝 ---------- */
{const _sf=sfx;sfx=function(k){if(k==='ding22'){try{if(!S.sound)return;tone(1318.5,0,.34,'sine',.13);tone(2637,0,.16,'triangle',.025);tone(1046.5,.16,.6,'sine',.13);tone(2093,.16,.22,'triangle',.025)}catch(e){}return}return _sf.apply(this,arguments)}}
function glow22(el){try{if(!el||el===document.body||!el.isConnected)return;if(el.matches&&el.matches('.stage,.play,.talk,#screen'))return;
 const r=el.getBoundingClientRect();if(!r.width||r.width*r.height>innerWidth*innerHeight*.45)return;
 el.classList.add(el instanceof SVGElement?'ok22s':'ok22')}catch(e){}}
{const _cel=celebrate;celebrate=async function(el){try{if(S.screen==='stage'){sfx('ding22');glow22(el)}}catch(e){}await wait(reduced?60:240);return _cel.apply(this,arguments)}}
/* ---------- 5. 「再聽一次」喇叭：同一款（金色 64，手機看得到 52 可點 60）、放在字幕框右邊 ---------- */
// 記下每個畫面最近念的句子（補上的喇叭按了，重念字幕框那一句；找不到就念最後一句）
const SAYH=[];{const _s=say;say=function(parts,opt){try{if(parts!=null&&!(opt&&opt.__ub22)){const a=(Array.isArray(parts)?parts:[parts]).filter(x=>x!=null&&x!=='');if(a.length){SAYH.push({scr:S.screen,parts:a,opt});if(SAYH.length>16)SAYH.shift()}}}catch(e){}return _s.apply(this,arguments)}}
const nrm=t=>String(t||'').replace(/<[^>]+>/g,'').replace(/[\s，。！？、：；「」『』（）～…,.!?:;"'“”‘’]/g,'');
const ptxt=p=>typeof p==='string'?p:p&&(p.zh!=null?p.zh:p.en!=null?p.en:'')||'';
function replay22(capText){try{const c=nrm(capText);const mine=SAYH.filter(h=>h.scr===S.screen);if(!mine.length){if(c)say([capText],{__ub22:1});return}
 let pick=null;if(c){for(let i=mine.length-1;i>=0&&!pick;i--){const h=mine[i];const j=nrm(h.parts.map(ptxt).join(''));if(j&&(j===c||j.includes(c)||c.includes(j)))pick=h;else{const one=h.parts.find(p=>{const q=nrm(ptxt(p));return q&&(q===c||c.includes(q)||q.includes(c))});if(one)pick={parts:[one],opt:h.opt}}}}
 pick=pick||mine[mine.length-1];try{hush()}catch(_){}say(pick.parts,Object.assign({},pick.opt||{},{__ub22:1}))}catch(e){console.log('ub22 replay',e)}}
const SPKICON=()=>{try{return ICON.speaker('#2A2266')}catch(e){return ''}};
const SPK_SEL='#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,.c90speak,.dspeak,.fspeak,.fmspeak,#pg5say';
// 字幕框和喇叭的對應：pin＝把喇叭放在字幕框右邊（out＝框外右邊，in＝框內右端）
const PINS={chef5:{cap:'#ch5bub',spk:'#ch5ag',mode:'out'},cashier:{cap:'#cbill',spk:'.c90speak',mode:'in'},vine6:{cap:'#vn6bub',mode:'out',add:1},globe8:{cap:'#gl8bub',mode:'out',add:1}};
function spkScan(){try{
 document.querySelectorAll(SPK_SEL).forEach(b=>{if(b.dataset.spk22)return;b.dataset.spk22=1;b.classList.add('spk22');const ic=SPKICON();if(ic)b.innerHTML=ic});
 const P=PINS[S.screen];document.querySelectorAll('.spk22new').forEach(b=>{if(!P||!P.add||!b.isConnected||b.dataset.scr!==S.screen)b.remove()});
 if(!P)return;const cap=document.querySelector(P.cap);if(!cap)return;
 let spk=P.spk?document.querySelector(P.spk):document.querySelector('.spk22new[data-scr="'+S.screen+'"]');
 if(!spk&&P.add){spk=document.createElement('button');spk.type='button';spk.className='spk22 spk22new';spk.dataset.scr=S.screen;spk.dataset.spk22=1;spk.setAttribute('aria-label','再聽一次');spk.innerHTML=SPKICON();
  spk.addEventListener('click',e=>{e.stopPropagation();const c=document.querySelector(P.cap);replay22(c?c.textContent:'')})}
 if(!spk)return;const host=cap.offsetParent||cap.parentElement;if(!host)return;
 if(spk.parentElement!==host)host.appendChild(spk);
 if(getComputedStyle(host).position==='static')host.style.position='relative';
 const cr=cap.getBoundingClientRect(),hr=host.getBoundingClientRect();const show=cr.width>4&&cr.height>4&&getComputedStyle(cap).visibility!=='hidden'&&(!P.add||nrm(cap.textContent).length>0);
 cls(spk,'spk22pin',1);const dsp=show?'':'none';if(spk.style.display!==dsp)spk.style.display=dsp;if(!show)return;
 const w=spk.offsetWidth||64,h=spk.offsetHeight||64;
 let x=P.mode==='in'?cr.right-hr.left-w-12:cr.right-hr.left+10;let y=cr.top-hr.top+cr.height/2-h/2;
 // 框外放不下：改放框內右端
 if(P.mode==='out'&&cr.right+10+w>Math.min(hr.right,innerWidth)-4){x=cr.right-hr.left-w-6;cls(cap,'spk22padr',1)}else cls(cap,'spk22padr',0);
 x=Math.round(x+host.scrollLeft);y=Math.round(Math.max(-h/2+cr.height/2+cr.top-hr.top,y)+host.scrollTop);
 if(spk.style.left!==x+'px')spk.style.left=x+'px';if(spk.style.top!==y+'px')spk.style.top=y+'px';
}catch(e){console.log('spk22',e)}}
/* ---------- 6. 通知精簡：最多 6 個小圖＋「還有 N 個」 ---------- */
const svgImg=(svg,cls)=>{try{let t=String(svg||'').trim();if(!t.startsWith('<svg'))return '';if(!/xmlns=/.test(t.slice(0,200)))t=t.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');return `<img class="${cls||''}" alt="" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}">`}catch(e){return ''}};
const ROOMCROP={wall:[330,30,174,120],bed:[8,112,246,170],rug:[196,286,408,112],lamp:[196,162,192,132],curtain:[500,28,260,180]};
const SLOTEMO={wall:'🌈',bed:'🛏️',rug:'🌸',lamp:'⭐',curtain:'🌙',toy:'🧸',clock:'⏰',pic:'🎨'};
function roomIcon(n){try{for(const k of Object.keys(ROOMITEMS)){const it=(ROOMITEMS[k]||[]).find(x=>x[1]===n);if(!it)continue;const v=it[0];
  const had=Object.prototype.hasOwnProperty.call(S.room,k),old=S.room[k];S.room[k]=v;let h='';
  try{if(k==='toy'){h=svgImg(roomSVG().toy)}else if(k==='clock'&&typeof rtClockSVG==='function'){h=svgImg(rtClockSVG(new Date(2020,0,1,10,10)))}
   else if(k==='pic'&&typeof window.__s41picThumb==='function'){const t=window.__s41picThumb(v);h=/^<svg/.test(String(t).trim())?svgImg(t):String(t)}
   else if(ROOMCROP[k]){h=svgImg(`<svg viewBox="${ROOMCROP[k].join(' ')}" preserveAspectRatio="xMidYMid ${k==='rug'?'meet':'slice'}">${roomSVG().bg}</svg>`)}}
  finally{if(had)S.room[k]=old;else delete S.room[k]}
  return h||art(SLOTEMO[k]||'🎁')}}catch(e){console.log('n22 room',e)}return ''}
function wearIcon(n){try{const it=ITEMS.find(x=>x.name===n);if(!it)return '';const sl=it.slot;
  return still(sl==='pet'?petSVG(it.id,''):princess({...S.look,[sl]:it.id},'',VB[sl]))}catch(e){console.log('n22 wear',e)}return ''}
function toyIcon(n){try{const t=PTOYS.find(x=>x[1]===n);if(t&&PTART[t[0]])return PTART[t[0]]}catch(e){}return ''}
function notifyFix(ov,html){try{const h=String(html);let kind=null;
 if(h.includes('<h2>房間有新東西！</h2>'))kind=roomIcon;else if(h.includes('<h2>新禮物送到了！</h2>'))kind=wearIcon;else if(h.includes('<h2>寵物有新玩具！</h2>'))kind=toyIcon;if(!kind)return;
 const g=ov.querySelector('.card .gold');if(!g)return;const names=g.textContent.split('、').map(x=>x.trim()).filter(Boolean);if(!names.length)return;
 const show=names.slice(0,6),more=names.length-show.length;
 const tiles=show.map(n=>{let ic='';try{ic=kind(n)}catch(e){}if(!ic)try{ic=art('🎁')}catch(e){}return `<span class="n22t" title="${n.replace(/"/g,'')}" aria-label="${n.replace(/"/g,'')}">${ic}</span>`}).join('');
 const box=document.createElement('div');box.className='n22';box.innerHTML=`<div class="n22row">${tiles}</div>${more>0?`<p class="n22more">還有 ${more} 個</p>`:''}`;
 // 「之前完成的章節，有新的禮物：」那行說明留著，名字那串換成小圖
 const holder=g.tagName==='B'?g.parentElement:g;if(g.tagName==='B'){const br=g.previousElementSibling;if(br&&br.tagName==='BR')br.remove();g.remove();holder.after(box)}else holder.replaceWith(box);
 ov.classList.add('n22ov')}catch(e){console.log('n22',e)}}
/* ---------- 7. 遊樂園小遊戲結束卡：左「再玩一次」金色大鈕、右「回遊樂園」紫色鈕 ---------- */
const AGAIN_RE=/^(再玩一次|再做一次|再飛一次|再挖一次)$/,OUT_RE=/^(離開.{0,4}|回遊樂園)$/;
const tx=b=>(b.textContent||'').replace(/\s+/g,'').trim();
function endFix(ov){try{if(['stage','title','map','world','chend','finale','story','story19','wardrobe','guide'].includes(S.screen))return;
 ov.querySelectorAll('.card .row').forEach(row=>{const bs=[...row.children].filter(b=>b.tagName==='BUTTON');const ag=bs.find(b=>AGAIN_RE.test(tx(b))),out=bs.find(b=>OUT_RE.test(tx(b)));if(!ag||!out)return;
  ag.textContent='再玩一次';ag.classList.remove('btn2');ag.classList.add('btn');out.classList.remove('btn');out.classList.add('btn2');
  if(/^離開/.test(tx(out))){const t=(S.screen==='dance'&&S.from==='finale')?'回首頁':'回遊樂園';out.textContent=t;out.setAttribute('aria-label',t)}
  row.insertBefore(ag,row.firstChild);row.appendChild(out);row.classList.add('end22');ov.classList.add('ov22end')})}catch(e){console.log('end22',e)}}
{const _ov=overlay;overlay=function(host,html){const ov=_ov.apply(this,arguments);try{notifyFix(ov,html);endFix(ov)}catch(e){}return ov}}
// 盪藤蔓：原本玩完直接回到選單（按鈕變「再玩一次」），補一張跟別的遊戲一樣的結束卡
function vineEnd(){try{if(S.screen!=='vine6')return;const m=document.getElementById('vn6menu'),g=document.getElementById('vn6go');if(!m||!g||m.dataset.e22)return;
 if(m.style.display==='none'||getComputedStyle(m).display==='none'||tx(g)!=='再玩一次')return;
 m.dataset.e22='1';m.style.display='none';const bub=document.getElementById('vn6bub');const t=bub?(bub.textContent||'').trim():'';
 let pic='';try{const mi=m.querySelector('.ch5mi');pic=mi?mi.innerHTML:art('i:vine6')}catch(e){}
 const ov=overlay(scr(),`<div class="card vn22end"><div class="vn22pic">${pic}</div>${t?`<h2>${t}</h2>`:''}<div class="row"><button class="btn" id="vn22again">再玩一次</button><button class="btn2" id="vn22out">回遊樂園</button></div></div>`);
 ov.querySelector('#vn22again').onclick=()=>{try{sfx('pop')}catch(_){}ov.remove();m.style.display=''};
 ov.querySelector('#vn22out').onclick=()=>{try{sfx('pop')}catch(_){}ov.remove();const b=document.getElementById('pback');if(b)b.click();else{try{hush()}catch(_){}go('park')}}}catch(e){console.log('vine22',e)}}
document.addEventListener('click',e=>{try{const g=e.target&&e.target.closest&&e.target.closest('#vn6go');if(g){const m=document.getElementById('vn6menu');if(m)delete m.dataset.e22}}catch(_){}},true);
/* ---------- 7. 進度點：同一款星點（舞會的音符也換成星星） ---------- */
function dotsFix(){try{const d=document.getElementById('dnotes');if(d)d.querySelectorAll('i').forEach(i=>{if(i.textContent!=='★')i.textContent='★'})}catch(e){}}
/* ---------- 3. 大地圖每章：「第Ｘ章」改成圓圈上的數字，星星只寫拿到幾顆（字放大，不用三行小字） ---------- */
function worldFix(){try{if(S.screen!=='world'&&S.screen!=='chapters')return;document.querySelectorAll('.wnode:not([data-w22])').forEach(n=>{n.dataset.w22=1;const i=+n.dataset.i;const b=n.querySelector('.wbadge');
  if(b&&!isNaN(i)&&!b.querySelector('.wn22')){const k=document.createElement('i');k.className='wn22';k.setAttribute('aria-hidden','true');k.textContent=String(i+1);b.appendChild(k)}
  const sb=n.querySelector('.wsub');if(sb){const m=/^\s*★\s*(\d+)\s*\/\s*\d+\s*$/.exec(sb.textContent||'');if(m)sb.innerHTML=`<span class="wstar">★</span> ${m[1]}`}})}catch(e){console.log('w22',e)}}
{const _sc=scan;scan=function(){_sc();spkScan();vineEnd();dotsFix();worldFix()}}
/* ---------- 樣式 ---------- */
const st=document.createElement('style');st.id='ui22css';st.textContent=`
:root{--ub22sat:env(safe-area-inset-top,0px)}
.ub22{position:fixed;left:16px;top:8px;z-index:9;width:76px;margin:0 0 0 -6px;padding:0;border:0;background:none;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;-webkit-tap-highlight-color:transparent;font:inherit;color:#FFE7B0;touch-action:manipulation}
.ub22[hidden]{display:none!important}
.ub22 .ub22c{width:64px;height:64px;border-radius:50%;box-sizing:border-box;display:grid;place-items:center;background:linear-gradient(180deg,#6050BE 0%,#3C3290 60%,#28226A 100%);border:2px solid #FFD98A;box-shadow:0 3px 0 rgba(16,10,56,.6),0 6px 14px rgba(0,0,0,.32),inset 0 2px 0 rgba(255,255,255,.22);transition:transform .12s ease,box-shadow .12s ease}
.ub22 .ub22c svg{width:38px;height:38px;margin-left:-2px}
.ub22 .ub22l{font-size:16px;line-height:1.15;font-weight:700;color:#FFE7B0;white-space:nowrap;text-shadow:0 1px 0 #1A1446,0 0 6px rgba(20,14,60,.9),0 0 2px rgba(20,14,60,.9);letter-spacing:.5px}
.ub22:active .ub22c{transform:translateY(2px);box-shadow:0 1px 0 rgba(16,10,56,.6),0 3px 8px rgba(0,0,0,.3),inset 0 2px 0 rgba(255,255,255,.2)}
.ub22src{visibility:hidden!important;pointer-events:none!important}
.ub22gone{display:none!important}
body.ub22on #bar{pointer-events:none}body.ub22on #bar>*{pointer-events:auto}
body.ub22on:not(.c87on) #bar .lefty{margin-left:84px!important}
body.ub22on.bar21park #bar #prog{display:none!important}
.ub22src.c87back{width:66px!important;flex-basis:66px!important}
body[data-scr="map"] #toWorld{display:none!important}
#toWard{position:relative}#toWard::before{content:'';position:absolute;left:-6px;right:-6px;top:50%;height:60px;transform:translateY(-50%)}
@media (max-width:600px),(max-height:500px){
 .ub22{width:64px;margin-left:-6px;gap:2px}
 .ub22 .ub22c{width:52px;height:52px}
 .ub22 .ub22c svg{width:31px;height:31px}
 .ub22 .ub22l{font-size:14px}
 body.ub22on:not(.c87on) #bar .lefty{margin-left:66px!important}
 .ub22src.c87back{width:54px!important;flex-basis:54px!important}
}
/* 2. 上方圓鈕 */
#bar .icons{gap:12px!important}
#bar .ibtn{width:52px!important;height:52px!important;margin:-3px 0!important;position:relative}
#bar .ibtn svg{width:25px;height:25px}
#bar .ibtn::before{content:"";position:absolute;inset:-6px;border-radius:50%}
#bar #btnSound{order:1}#bar #btnMusic{order:2}#bar #btnMap{order:3;margin-left:12px!important}#bar #btnHome{order:4;margin-left:12px!important}
@media (max-width:600px),(max-height:500px){
 #bar .ibtn{margin:-6px 0!important}
 #bar #btnMap{margin-left:0!important}
 #bar .ibtn::before{inset:-4px}
 #bar #prog .pbar{display:none!important}
 #bar #prog,#bar #wallet{padding-left:8px!important;padding-right:9px!important}
 #bar .ibtn svg{width:24px;height:24px}
}
/* 9. 月亮：有返回鍵時往下移，不壓在返回鍵後面 */
body.ub22on #sky>svg circle[cx="9%"][cy="12%"]{opacity:0}
/* 9. 關掉：斜線，不變淡 */
#bar .ibtn.off,#bar .ibtn.off svg.z7t{opacity:1!important;filter:none!important}
#bar .ibtn .sl22{display:none;position:absolute;left:50%;top:50%;width:34px;height:5px;margin:-2.5px 0 0 -17px;border-radius:3px;background:#FFD98A;box-shadow:0 0 0 1.6px #5A3A12;transform:rotate(45deg);pointer-events:none}
#bar .ibtn.off svg{opacity:.72}
#bar .ibtn.off .sl22{display:block}
/* 4. 答對綠光（不放大縮小） */
.ok22{box-shadow:0 0 0 4px #6FE3A8,0 0 24px 8px rgba(111,227,168,.75)!important;transition:box-shadow .18s ease}
.ok22s{filter:drop-shadow(0 0 5px #6FE3A8) drop-shadow(0 0 10px rgba(111,227,168,.8))}
/* 5. 再聽一次：同一款金色喇叭 */
:is(#app,#rv181) :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,.c90speak,.dspeak,.fspeak,.fmspeak,#pg5say){width:64px!important;height:64px!important;min-width:64px;min-height:64px;flex:0 0 64px!important;padding:0!important;border-radius:50%!important;border:0!important;background:linear-gradient(180deg,#FFF0B8,#FFC24D)!important;box-shadow:0 0 16px rgba(255,200,80,.5),0 3px 0 rgba(185,122,26,.55)!important;display:grid!important;place-items:center;cursor:pointer;position:relative;color:#2A2266}
:is(#app,#rv181) :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,.c90speak,.dspeak,.fspeak,.fmspeak,#pg5say) svg{width:30px!important;height:30px!important}
:is(#app,#rv181) :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,#pg5say)::before{content:'';position:absolute;inset:-4px;border-radius:50%}
:is(#app,#rv181) :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,#pg5say)::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:3px solid rgba(255,217,138,.6);pointer-events:none;animation:ring 2.2s ease-out infinite}
.lite :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,#pg5say)::after{animation:none}
@media (prefers-reduced-motion:reduce){:is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,#pg5say)::after{animation:none}.ok22{transition:none}}
.spk22:active,.rvspk:active{transform:translateY(2px)}
.spk22pin{position:absolute!important;margin:0!important;z-index:4}
.spk22padr{padding-right:80px!important;box-sizing:border-box}
#app :is(#f26ag,#ph8rep,#r26ag){margin:-10px 0!important}
#rv181 .rvbub .rvspk{margin:-8px -6px -8px 6px!important}
@media (max-width:600px),(max-height:500px){
 :is(#app,#rv181) :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,.c90speak,.dspeak,.fspeak,.fmspeak,#pg5say){width:52px!important;height:52px!important;min-width:52px;min-height:52px;flex-basis:52px!important}
 :is(#app,#rv181) :is(.spk22,#ch5ag,#f26ag,#r26ag,.rvspk,#ph8rep,.c90speak,.dspeak,.fspeak,.fmspeak,#pg5say) svg{width:26px!important;height:26px!important}
 .spk22padr{padding-right:64px!important}
 #app :is(#f26ag,#ph8rep,#r26ag){margin:-6px 0!important}
}
/* 6. 通知：小圖 */
.n22{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px 0 8px}
.n22row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:440px}
.n22t{width:64px;height:64px;border-radius:18px;background:#FFFFFF;box-shadow:0 3px 0 rgba(20,14,60,.35),inset 0 0 0 2px rgba(255,217,138,.8);display:grid;place-items:center;overflow:hidden}
.n22t>svg,.n22t>img{width:56px;height:56px;object-fit:contain;display:block}
.n22more{margin:2px 0 0;font-size:18px;color:#FFE7B0;font-weight:700}
@media (max-width:600px),(max-height:500px){.n22row{gap:8px;max-width:300px}.n22t{width:56px;height:56px;border-radius:14px}.n22t>svg,.n22t>img{width:48px;height:48px}.n22more{font-size:16px}}
/* 7. 小遊戲開始選單：深紫卡＋白色選項、選中金框 */
.r26menu .r26mc,.ch5menu .ch5mc,.ph8mc,.gl8mc{background:linear-gradient(180deg,rgba(60,50,140,.97),rgba(34,28,94,.97))!important;border:2px solid #FFD98A!important;border-radius:32px!important;color:#FFF8EC!important;box-shadow:0 10px 30px rgba(0,0,0,.38)!important}
.r26menu .r26mc .r26mh b,.ch5mc .ch5mh b,.ph8mc .ph8mh b,.gl8mc .gl8mh b{color:#FFF8EC!important}
.r26menu .r26mc .r26mh small,.ch5mc .ch5mh small,.ph8mc .ph8mh small,.gl8mc .gl8mh small{color:#D4CCF4!important;font-size:16px!important}
.r26menu .r26lab,.ch5mc .ch5lab,.ph8mc .ph8lab,.gl8mc .gl8lab,.r26calm{color:#D4CCF4!important;font-size:16px!important}
.r26menu .r26opt,.ch5mc .ch5opt,.ph8mc .ph8opt,.gl8mc .gl8opt{background:#FFFFFF!important;color:#3A2A55!important;border:3px solid #FFFFFF!important;border-radius:22px!important;box-shadow:0 3px 0 rgba(16,10,56,.45)!important}
.r26menu .r26opt b,.ch5mc .ch5opt b,.ph8mc .ph8opt b,.gl8mc .gl8opt b{color:#3A2A55!important}
.r26menu .r26opt small,.ch5mc .ch5opt small,.ph8mc .ph8opt small,.gl8mc .gl8opt small{color:#6A5A8A!important;font-size:16px!important;line-height:1.2}
.r26menu .r26opt.sel,.ch5mc .ch5opt.sel,.ph8mc .ph8opt.sel,.gl8mc .gl8opt.sel{border-color:#FFC24D!important;background:#FFF6DA!important;box-shadow:0 0 0 2px #FFC24D,0 0 14px rgba(255,194,77,.6),0 3px 0 rgba(16,10,56,.45)!important}
#r26pzy,#r26pab{display:block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ph8mc .ph8zoo{color:#D4CCF4!important;font-size:16px!important}
@media (max-width:600px),(max-height:500px){.r26menu .r26opt small,.ch5mc .ch5opt small,.ph8mc .ph8opt small,.gl8mc .gl8opt small,.r26menu .r26mc .r26mh small,.ch5mc .ch5mh small,.ph8mc .ph8mh small,.r26menu .r26lab,.ch5mc .ch5lab,.ph8mc .ph8lab,.ph8mc .ph8zoo{font-size:14px!important}}
/* 7. 結束卡 */
.ov22end .row.end22{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:14px}
.ov22end .row.end22>.btn{min-height:72px;min-width:220px;font-size:28px;padding:0 26px}
.ov22end .row.end22>.btn2{min-height:60px;min-width:150px;font-size:22px;padding:0 22px}
@media (max-width:600px),(max-height:500px){.ov22end .row.end22{gap:12px}.ov22end .row.end22>.btn{min-height:60px;min-width:180px;font-size:24px}.ov22end .row.end22>.btn2{min-height:56px;min-width:130px;font-size:20px}}
.vn22end .vn22pic{width:120px;height:120px;margin:0 auto 4px}.vn22end .vn22pic svg{width:100%;height:100%}
/* 7. 進度點：同一款星點 */
.ch5dots,.f26dots,.gl8dots{gap:6px!important;align-items:center}
.ch5dots i,.f26dots i,.gl8dots i{width:auto!important;height:auto!important;border:0!important;background:none!important;border-radius:0!important;box-shadow:none!important;font-style:normal;line-height:1;display:inline-block}
.ch5dots i::before,.f26dots i::before,.gl8dots i::before{content:'★';font-size:24px;color:rgba(255,255,255,.3);transition:color .3s,text-shadow .3s}
.ch5dots i.on::before,.f26dots i.on::before,.gl8dots i.on::before{color:#FFE27A;text-shadow:0 0 10px #FFE27A}
.gl8dots i.now:not(.on)::before{color:rgba(255,226,122,.6)}
@media (max-width:600px),(max-height:500px){.ch5dots i::before,.f26dots i::before,.gl8dots i::before{font-size:20px}}
/* 3. 兒童畫面最小字：iPad 16、手機 14 */
.arch .arcn,.world p.wtip,#bar #prog .nm,#toWard,.gzcl,.pgrid .pcard span:not(.pic):not(.lk),.pcard span:last-child,#wardhelp,.ward .opt span,.ward .opt>span,
.scover .sg,.scover .new99,.ccard .sg,.c47tab b,.c47tab .nw,.c47new,.c47pl,.ccard b,.rmdeco,.rmdeco span,.p19tag b,.p88ni .emoji,.dcard small,.pmcat small,.cbtab b,.cbc small,.cbcnt,
#pg5cnt,#pg5out,.pg5e,.pg5 small,.revtag,.eacard .en,.eacard .tx .en,.n22ov .card p.small,#easkip,.easteps span,.stage>.overlay .card p.small,.questbtn .badge,.wrtag,.wrside .btn2,.pname .plv{font-size:16px!important}
.wnode .wname{font-size:16px!important}
.wnode .wsub,.wnode .wsub .wstar{font-size:16px!important}
.wnode .wnum{display:none!important}
.wnode .wok,.wnode .wsos,.wnode .wquest{font-size:16px!important}
.wbadge .wn22{position:absolute;left:-6px;top:-6px;min-width:26px;height:26px;padding:0 4px;box-sizing:border-box;border-radius:13px;background:linear-gradient(180deg,#FFF0B8,#FFC24D);color:#3A2410;font:800 16px/26px 'Baloo 2',sans-serif;font-style:normal;text-align:center;box-shadow:0 2px 0 #B97A1A;z-index:2}
.c47tab .nw{padding:1px 6px!important;top:-10px!important}
@media (max-width:600px),(max-height:500px){
 .arch .arcn,.world p.wtip,#bar #prog .nm,#toWard,.gzcl,.pgrid .pcard span:not(.pic):not(.lk),.pcard span:last-child,#wardhelp,.ward .opt span,.ward .opt>span,
 .scover .sg,.scover .new99,.ccard .sg,.c47tab b,.c47tab .nw,.c47new,.c47pl,.ccard b,.rmdeco,.rmdeco span,.p19tag b,.p88ni .emoji,.dcard small,.pmcat small,.cbtab b,.cbc small,.cbcnt,
 #pg5cnt,#pg5out,.pg5e,.pg5 small,.revtag,.eacard .en,.eacard .tx .en,.n22ov .card p.small,#easkip,.easteps span,.stage>.overlay .card p.small,.questbtn .badge,.wrtag,.wrside .btn2,.pname .plv{font-size:14px!important}
 .wnode .wname{font-size:14px!important;white-space:normal!important;line-height:1.12!important;letter-spacing:0!important;overflow-wrap:anywhere!important}
 .wnode .wsub,.wnode .wsub .wstar{font-size:14px!important}
 .wnode .wok,.wnode .wsos,.wnode .wquest{font-size:14px!important;min-width:22px!important;min-height:22px!important}
 .wbadge .wn22{min-width:22px;height:22px;border-radius:11px;font-size:14px;line-height:22px;left:-5px;top:-5px}
}
/* 手機橫放：小廚師／盪藤蔓／攝影師選單放得下（原本「開始做！」被切掉） */
@media (max-height:500px){
 .ch5menu{overflow-y:auto!important;align-items:flex-start!important;padding-top:2px!important;padding-bottom:6px!important}
 .ch5menu .ch5mc,.ph8menu .ph8mc{padding:8px 14px 10px!important;margin:auto 0!important}
 .ch5mc .ch5mh,.ph8mc .ph8mh{min-height:0!important;margin-bottom:2px!important}
 .ch5mc .ch5mh .ch5mi,.ph8mc .ph8mh .ph8mi{width:44px!important;height:44px!important}.ch5mc .ch5mh .ch5mi svg,.ph8mc .ph8mh .ph8mi svg{width:44px!important;height:44px!important}
 .ch5mc .ch5opt,.ph8mc .ph8opt{min-height:0!important;height:auto!important;padding:5px 6px!important}
 .ch5mc #ch5modes .ch5opt{flex-direction:row!important;gap:8px!important;justify-content:center}
 .ch5mc .ch5oi{width:30px!important;height:30px!important}.ch5mc .ch5oi svg{width:30px!important;height:30px!important}
 .ch5mc .ch5go,.ph8mc .ph8go{height:50px!important;min-height:0!important;margin-top:6px!important;font-size:24px!important}
 .ch5mc .ch5lab,.ph8mc .ph8lab{margin:2px 0!important}
}
.ub22.ub22a .ub22l{display:none}
`;document.head.appendChild(st);
try{scan()}catch(e){}
}catch(e){console.log('m9zf_ui22',e)}}).toString()+')()')})();


/* ================= m99zzzzzz_pet19 寵物優化（1.9）—— 星光工作室 Starlight Studio 2026-11-17（全部原創，著作權與 IP 屬於星光工作室） =================
 * 1. 關卡裡寵物幫忙：每一關一次。孩子答錯一次、或題目出來 8 秒還沒作答，寵物發亮（金色光暈＋小腳印），點寵物 → 寵物聞一聞、走過去，
 *    把一個「錯的」選項帶走（淡出），再走回來，讓孩子自己找答案。用過這一關就不再亮。
 *    只用在 3 個以上選項、而且能確定哪一個是答案的點選題（選項 data-v 剛好有一個等於這一題的 S.ans；看不出來就不出現，絕不會拿走正確答案）；
 *    寫字、描字、拖曳分類、跟著唸、接東西、走迷宮、翻牌等題型不用。小考試（m50）不用。家長專區「遊戲設定 → 學習 → 寵物幫忙」可關（V2.pet19HintOff）。
 *    統計公平：用了提示的那一題，S.miss 至少算 1（等於「不是一次答對」）：題型統計、每週報告的一次答對率、字母注音數字的「會了」判斷、
 *    考試以外的連續答對都照這個算；不算答錯（不進複習清單、不扣星星，S.lvMiss 不變）。
 * 2. 寵物會長大：寶寶 → 小時候 → 長大。成長點數存在 V2['pgrow_'+主角]（pgrow_princess／pgrow_prince，每隻寵物一筆 {p,d,c,a,n,st}），
 *    陪玩、餵食、照顧（寵物小屋每完成一件 +1，每天最多 12）、點心獎勵 +2、答題（目前帶著的寵物每答對 4 題 +1，每天最多 6）、
 *    首頁摸摸（每天最多 2）。只會增加，不會因為沒來玩而退步。小時候 6 點、長大 30 點（和好感度 Lv.2、Lv.4 的門檻一樣）。
 *    舊存檔（2026-11-17 家長確認）：升級時已經擁有的寵物用好感度換算，但最少從「小時候」開始（Lv.4～5 直接長大），不會變回寶寶、不跳慶祝；
 *    之後新得到的寵物從寶寶開始。新玩家（chDone=0 且沒照顧過寵物）起始寵物也從寶寶開始。
 *    外型：寶寶身體小（0.68）、頭比例大（1.24 倍）、頭上一撮捲毛、圍兜；小時候中等（0.84）、頭 1.1 倍、頭上星星小髮夾；長大是原本的圖＋金色星星徽章。
 *    做法：包 petSVG（最外層）：只有已經擁有的寵物才變；用寵物自己的配件系統放細節（假配件 p19tuft／p19clip／p19bib／p19medal，
 *    跟真的配件走同一套 ACCANCH／PADJX 位置），頭放大時連頭上的配件一起放大，所以帽子、蝴蝶結位置跟著對；整體大小用 viewBox 調（下緣對齊），
 *    不改 svg 第一層的結構（m99zx 的眨眼、翅膀、尾巴照常）。戴頭上配件時不畫捲毛／髮夾；戴脖子配件時不畫圍兜／徽章。
 *    塗色本（petLineArt）用原本的圖，不受影響。所有用 petSVG／myPet 的地方（首頁、寵物小屋、換裝、關卡、故事、房間）都自動是對的階段。
 *    長大時：亮光（旋轉光芒）＋星星閃爍＋新舊樣子淡入淡出的慶祝卡（不用整體 scale）。在關卡裡長大先記著，回到首頁／地圖／寵物小屋／換裝間再慶祝。
 * 3. 寵物小屋多隻一起玩：有兩隻以上時，另外最多兩隻在旁邊陪玩，輪流：追來追去、一起玩球、靠在一起睡覺（只用移動、局部旋轉、淡入淡出）。
 *    照顧動作進行中、有對話框、減少動態、流暢模式時不動（減少動態時靜靜坐在旁邊）。
 * 語音：新台詞在 s52/lines_pet19.tsv；還沒錄好就不念（不用裝置內建語音）。 */
(function(){try{
if(typeof petSVG!=='function'||typeof SCREENS!=='object')return;
const NS='http://www.w3.org/2000/svg';
const BOY=()=>window.HERO==='prince';
const calm=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const sv2=()=>{try{save2()}catch(e){}};
const today0=()=>{try{return today()}catch(e){return new Date().toDateString()}};
const recZ=t=>{try{return typeof voSents==='function'&&typeof voResolve==='function'&&voSents(t).every(x=>voResolve(x).every(g=>typeof g==='string'))}catch(e){return false}};
let sayT=0;
function talk(lines,force){try{if(!S.vo||(!force&&Date.now()-sayT<3000))return;const L=lines.filter(t=>t&&recZ(t));if(!L.length)return;sayT=Date.now();say(L)}catch(e){}}
const ownsP=k=>{try{return !!k&&owns(k)}catch(e){return false}};
const petNm=k=>{try{return (ITEM[k]&&ITEM[k].name)||'寵物'}catch(e){return '寵物'}};

/* ================= 2. 成長 ================= */
const TH=[0,6,30];const STN=['寶寶','小時候','長大'];
const stageOfP=p=>p>=TH[2]?2:p>=TH[1]?1:0;
const GK=()=>'pgrow_'+(BOY()?'prince':'princess');
function gStore(){let o=V2[GK()];if(!o||typeof o!=='object'||Array.isArray(o)){o={};V2[GK()]=o}if(!o.__m)migrate(o);return o}
// 舊存檔（升級前已經玩過）：當時已經擁有的寵物最少從「小時候」開始，好感度高的照換算直接長大；之後新得到的寵物照樣從寶寶開始。
// 新玩家（還沒完成任何一章、也沒照顧過寵物）不加，起始寵物從寶寶開始。做一次就記 __m（各主角各一次）。
function migrate(o){try{o.__m=1;let old=false;try{old=(+S.chDone||0)>0||Object.keys(S.pcare||{}).length>0}catch(e){}
 if(old){(ITEMS||[]).filter(x=>x.slot==='pet'&&ownsP(x.id)).forEach(x=>{const k=x.id;if(o[k]&&Number.isFinite(+o[k].p))return;
  let love=0;try{love=+((S.pcare&&S.pcare[k]&&S.pcare[k].love)||0)||0}catch(_){}const p0=Math.max(TH[1],Math.round(love));o[k]={p:p0,d:'',c:0,a:0,n:0,ac:0,st:stageOfP(p0)}})}
 sv2()}catch(e){console.log('p19 mig',e)}}
function gEnt(k,create){const o=gStore();let e=o[k];if(e&&typeof e==='object'&&Number.isFinite(+e.p))return e;if(!create)return null;
 let love=0;try{love=+((S.pcare&&S.pcare[k]&&S.pcare[k].love)||0)||0}catch(_){}
 e={p:Math.max(0,Math.round(love)),d:'',c:0,a:0,n:0,ac:0};e.st=stageOfP(e.p);o[k]=e;sv2();return e}
function stageOf(k){if(!ownsP(k))return null;const e=gEnt(k,true);return stageOfP(e.p)}
const CAP={care:12,ans:6,poke:2};
function gain(k,n,src){try{if(!ownsP(k))return;const e=gEnt(k,true);const d=today0();if(e.d!==d){e.d=d;e.c=0;e.a=0;e.n=0}
 const f=src==='ans'?'a':src==='poke'?'n':'c';const cap=CAP[src]||12;const add=Math.max(0,Math.min(n,cap-(e[f]||0)));if(!add)return;
 e[f]=(e[f]||0)+add;e.p+=add;const ns=stageOfP(e.p);if(ns>(e.st||0)){e.up=Math.max(e.up||0,ns)}sv2();if(e.up)setTimeout(()=>celebrateSoon(),50)}catch(err){console.log('p19 gain',err)}}
// 照顧（寵物小屋：餵食、洗澡、梳毛、玩球、玩具、才藝）
if(typeof petGain==='function'){const _pg=petGain;petGain=function(){const k=S.look&&S.look.pet;const r=_pg.apply(this,arguments);gain(k,1,'care');return r}}
// 點心獎勵
try{if(typeof REWARD==='object'&&typeof REWARD.treat==='function'){const _tr=REWARD.treat;REWARD.treat=function(card){const r=_tr.apply(this,arguments);
 try{const ck=card&&card.querySelector('#ck');if(ck)ck.addEventListener('click',()=>gain(S.look.pet,2,'care'),{once:true})}catch(e){}return r}}}catch(e){}
// 答題：帶著的寵物，每答對 4 題 +1
if(typeof statRight==='function'){const _sr=statRight;statRight=function(){const r=_sr.apply(this,arguments);try{const k=S.look&&S.look.pet;if(ownsP(k)){const e=gEnt(k,true);e.ac=(e.ac||0)+1;if(e.ac>=4){e.ac=0;gain(k,1,'ans')}else sv2()}}catch(e){}return r}}
// 首頁摸摸
document.addEventListener('click',e=>{try{if(S.screen!=='title')return;const t=e.target;if(t&&t.closest&&t.closest('.title .art .petw'))gain(S.look.pet,1,'poke')}catch(_){}},true);

/* ---------- 外型 ---------- */
// f：整體大小（寶寶、小時候）；hk：頭放大（寶寶、小時候）；pv：頭放大的支點（脖子）；hd：頭怎麼找（nod＝.nod 群組、pb＝.pbhead）
const PB={hd:'pb',pv:[50,62]};
const K={
 unicorn:{hd:'nod',pv:[76,66]},fox:{hd:'nod',pv:[80,62]},moonrabbit:{hd:'nod',pv:[86,66]},swan:{hd:'nod',pv:[90,78],hk:[1.14,1.06]},
 dino:{hd:'nod',pv:[78,64]},dragon:{hd:'nod',pv:[78,64]},squirrel31:{hd:'nod',pv:[86,64]},
 kitty:PB,puppy:PB,owlet:PB,piggy:PB,fawn:PB,teddy:PB,frogprince:PB,pupshiba:PB,leopardcat:PB,
 penguin:{},dolphin:{},bluebird:{},pigeon:{},cloudy:{},stardrake:{}};
const FS=[.68,.84,1],HK0=[1.24,1.1,1];
// 假配件（座標跟獨角獸的配件一樣：頭頂 85,24、脖子 73,63）
const FAKE={
 p19tuft:()=>`<g class="p19m"><path d="M86 24.5 Q81 15 86.5 10.5 Q92.5 7.5 93.5 13 Q94 17 89.6 16.6 Q87.4 16 88.6 13.8" stroke="#6E4C86" stroke-width="2.3" fill="none" stroke-linecap="round" opacity=".85"/><path d="M83 24 Q81.5 19 84 15.5" stroke="#6E4C86" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/></g>`,
 p19clip:()=>`<g class="p19m"><path d="${starD(78,21,5.2)}" fill="#FFD84A" stroke="#FFFFFF" stroke-width="1.3" stroke-linejoin="round"/><circle cx="78" cy="21" r="1.4" fill="#FF8FB8"/></g>`,
 p19bib:()=>`<g class="p19m"><path d="M62.5 59.5 Q73 66 83.5 59.5 Q85 71.5 73 77 Q61 71.5 62.5 59.5Z" fill="#FFFFFF" stroke="#F4AECB" stroke-width="1.4" stroke-linejoin="round"/><path d="M65.5 62.6 Q73 67.6 80.5 62.6" stroke="#FF9FC4" stroke-width="1.5" fill="none" stroke-dasharray="2.2 2.2" stroke-linecap="round"/><path d="${heartD(73,70.5,3.4)}" fill="#FF8FB8"/></g>`,
 p19medal:()=>`<g class="p19m"><path d="M65 59 L71 70 L75 70 L81 59" stroke="#5C7CE8" stroke-width="3.2" fill="none" stroke-linejoin="round"/><path d="M68 59 L72.4 67 M78 59 L73.6 67" stroke="#FF8FB8" stroke-width="1.3" fill="none"/><circle cx="73" cy="73" r="6.2" fill="#F2B23A" stroke="#FFF2B8" stroke-width="1.4"/><path d="${starD(73,73,4)}" fill="#FFF6C8"/></g>`};
try{ACCHEAD.push('p19tuft','p19clip')}catch(e){}
{const _pa=petAcc;petAcc=function(acc){if(FAKE[acc])return FAKE[acc]();return _pa.apply(this,arguments)}}
let NOST=0;
const isHeadAcc=a=>{try{return !!a&&ACCHEAD.includes(a)}catch(e){return false}};
const isNeckAcc=a=>!!a&&a!=='pcape'&&!isHeadAcc(a);
const P=s=>new DOMParser().parseFromString(s,'image/svg+xml').documentElement;
const XS=new XMLSerializer();
const _ps=petSVG;
// 用寵物自己的配件位置，拿出假配件那一層（含外面的 transform）；回傳 {el, inNod}
function fakePart(kind,fk,a){NOST++;let s='';try{s=_ps(kind,fk,a)}catch(e){}finally{NOST--}if(!s)return null;
 let d;try{d=P(s)}catch(e){return null}const m=d.querySelector('.p19m');if(!m)return null;
 let n=m;while(n.parentNode&&n.parentNode!==d&&!(n.parentNode.getAttribute&&/\bnod\b/.test(n.parentNode.getAttribute('class')||'')))n=n.parentNode;
 const inNod=n.parentNode!==d;const defs=[...d.children].filter(x=>x.tagName==='defs');return {el:n,inNod,defs}}
const HEADTR=/translate\(\s*-85[ ,]+-24\s*\)\s*$/;
function stageSVG(s,kind,acc,st,a){const cfg=K[kind]||{};const doc=P(s);if(!doc||doc.tagName!=='svg'||doc.querySelector('parsererror'))return s;
 const nod=[...doc.children].find(n=>/\bnod\b/.test(n.getAttribute('class')||''));
 const add=fk=>{const f=fakePart(kind,fk,a);if(!f)return;const el=doc.ownerDocument.importNode(f.el,true);
  f.defs.forEach(dd=>{if(dd.querySelector('[id]'))doc.insertBefore(doc.ownerDocument.importNode(dd,true),doc.firstChild)});
  if(f.inNod&&nod)nod.appendChild(el);else doc.appendChild(el)};
 if(st===0){if(!isHeadAcc(acc))add('p19tuft');if(!isNeckAcc(acc))add('p19bib')}
 else if(st===1){if(!isHeadAcc(acc))add('p19clip')}
 else if(!isNeckAcc(acc))add('p19medal');
 // 頭放大（連頭上的配件）
 const hk=(cfg.hk||HK0)[st]||1;
 if(hk!==1&&cfg.pv){const [px,py]=cfg.pv;const pre=`translate(${px} ${py}) scale(${hk}) translate(${-px} ${-py})`;
  if(cfg.hd==='nod'&&nod){const g=doc.ownerDocument.createElementNS(NS,'g');g.setAttribute('class','p19hd');g.setAttribute('transform',pre);doc.insertBefore(g,nod);g.appendChild(nod)}
  if(cfg.hd==='pb'){const h=doc.querySelector('.pbhead');if(h)h.setAttribute('transform',(pre+' '+(h.getAttribute('transform')||'')).trim())}
  if(cfg.hd){[...doc.children].forEach(n=>{if(n.tagName==='g'&&HEADTR.test(n.getAttribute('transform')||''))n.setAttribute('transform',pre+' '+n.getAttribute('transform'))})}}
 // 整體大小：viewBox 放大（下緣、左右置中對齊）
 const f=FS[st]||1;if(f!==1){const vb=(doc.getAttribute('viewBox')||'0 0 100 100').split(/[\s,]+/).map(Number);if(vb.length===4&&vb.every(Number.isFinite)){
  const w=vb[2]/f,h=vb[3]/f,x=vb[0]+vb[2]/2-w/2,y=vb[1]+vb[3]-h;doc.setAttribute('viewBox',[x,y,w,h].map(v=>+v.toFixed(2)).join(' '))}}
 doc.setAttribute('data-p19s',st);
 return XS.serializeToString(doc)}
petSVG=function(kind,acc,a){const s=_ps.apply(this,arguments);if(NOST||!kind||typeof s!=='string'||s.indexOf('<svg')!==0)return s;
 let st;try{st=FORCE[kind]!=null?FORCE[kind]:stageOf(kind)}catch(e){return s}if(st==null)return s;
 try{return stageSVG(s,kind,acc||'',st,a||'')}catch(e){console.log('p19 stage',kind,e&&e.message);return s}};
const FORCE={};
// 塗色本用原本的圖
if(typeof petLineArt==='function'){const _pl=petLineArt;petLineArt=function(){NOST++;try{return _pl.apply(this,arguments)}finally{NOST--}}}
// 畫特定階段（總表、慶祝卡用）
function petAt(kind,st,acc,a){const o=FORCE[kind];FORCE[kind]=st;try{return petSVG(kind,acc||'',a||'')}finally{if(o==null)delete FORCE[kind];else FORCE[kind]=o}}

/* ---------- 長大慶祝 ---------- */
const CCSS=`
.p19cel .card{position:relative;overflow:hidden;text-align:center}
.p19stage{position:relative;width:min(62vw,260px);height:min(52vw,220px);margin:6px auto 4px}
.p19rays{position:absolute;left:50%;top:50%;width:150%;aspect-ratio:1;translate:-50% -50%;opacity:.0;animation:p19rin .8s ease .2s forwards,p19spin 14s linear infinite;pointer-events:none}
@keyframes p19rin{to{opacity:.85}}@keyframes p19spin{to{rotate:360deg}}
.p19glow{position:absolute;left:50%;top:56%;width:70%;aspect-ratio:1;translate:-50% -50%;border-radius:50%;background:radial-gradient(circle,rgba(255,240,170,.95),rgba(255,214,110,.35) 45%,rgba(255,214,110,0) 70%);opacity:0;animation:p19gl 1.6s ease .5s forwards}
@keyframes p19gl{0%{opacity:0}45%{opacity:1}100%{opacity:.6}}
.p19old,.p19new{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center}
.p19old svg,.p19new svg{height:100%;width:auto;max-width:100%}
.p19old{animation:p19out .9s ease .9s forwards}.p19new{opacity:0;animation:p19in 1s ease 1.3s forwards}
@keyframes p19out{to{opacity:0}}@keyframes p19in{to{opacity:1}}
.p19st{position:absolute;width:22px;height:22px;opacity:0;animation:p19tw 1.6s ease-in-out infinite}
@keyframes p19tw{0%,100%{opacity:0}50%{opacity:1}}
.p19tag{display:inline-flex;gap:6px;align-items:center;justify-content:center;margin:2px 0 6px;font-size:15px}
.p19tag b{padding:2px 10px;border-radius:999px;background:rgba(255,255,255,.1);color:#CFC6F2}.p19tag b.on{background:#FFD24D;color:#3A2A6A}
@media (prefers-reduced-motion:reduce){.p19rays,.p19glow,.p19old,.p19new,.p19st{animation:none!important}.p19old{display:none}.p19new,.p19glow{opacity:1}.p19rays{opacity:.6}.p19st{opacity:1}}
body.lite .p19rays{animation:p19rin .8s ease .2s forwards!important}
`;
const RAYS=`<svg class="p19rays" viewBox="-100 -100 200 200" aria-hidden="true">${Array.from({length:12},(_,i)=>`<path d="M0 0 L${(100*Math.cos((i*30-6)*Math.PI/180)).toFixed(1)} ${(100*Math.sin((i*30-6)*Math.PI/180)).toFixed(1)} L${(100*Math.cos((i*30+6)*Math.PI/180)).toFixed(1)} ${(100*Math.sin((i*30+6)*Math.PI/180)).toFixed(1)}Z" fill="${i%2?'#FFE9A8':'#FFF6D8'}" opacity=".55"/>`).join('')}</svg>`;
const STAR=c=>`<svg viewBox="0 0 24 24"><path d="M12 1.8l3 6.4 7 .9-5.1 4.8 1.3 6.9L12 17.4l-6.2 3.4 1.3-6.9L2 9.1l7-.9Z" fill="${c}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
function stageTag(st){return `<div class="p19tag" aria-label="現在是${STN[st]}">${STN.map((n,i)=>`<b class="${i===st?'on':''}">${n}</b>`).join('<span aria-hidden="true">›</span>')}</div>`}
let celOn=0;
function pendingKind(){const o=gStore();return Object.keys(o).find(k=>k!=='__m'&&o[k]&&o[k].up&&ownsP(k))}
function celebrateSoon(){try{if(celOn)return;const k=pendingKind();if(!k)return;const sc=S.screen;if(!['title','pethouse','map','wardrobe','park'].includes(sc))return;
 if(document.querySelector('.overlay')||document.querySelector('.coach'))return setTimeout(celebrateSoon,1500);celebrate(k)}catch(e){console.log('p19 cel',e)}}
function celebrate(k){const e=gEnt(k,true);const to=Math.min(2,e.up||stageOfP(e.p)),from=Math.max(0,Math.min(to-1,e.st||0));celOn=1;
 const host=document.querySelector('#screen')||screen;const nm=petNm(k);const acc=k===S.look.pet?S.look.petacc:'';
 const stars=Array.from({length:9},(_,i)=>`<span class="p19st" style="left:${(6+((i*37)%88))}%;top:${(4+((i*53)%70))}%;animation-delay:${(i*.23).toFixed(2)}s">${STAR(['#FFD24D','#FFF2A8','#FF9FC8'][i%3])}</span>`).join('');
 const ov=overlay(host,`<div class="card p19cc"><h2>${nm}長大了！</h2><div class="p19stage">${RAYS}<div class="p19glow"></div><div class="p19old">${petAt(k,from,acc)}</div><div class="p19new">${petAt(k,to,acc)}</div>${stars}</div>
  ${stageTag(to)}<p class="small">${to===2?'謝謝你一直好好照顧牠，牠已經長大囉！':'你常常陪牠玩、照顧牠，牠長大一點了！'}</p><button class="btn" id="p19ok">好棒！</button></div>`);
 ov.classList.add('p19cel');try{sfx('gem')}catch(_){}try{if(!calm())setTimeout(()=>{try{confetti()}catch(_){}},1200)}catch(_){}
 talk(['哇！你的寵物長大了！',to===2?'謝謝你好好照顧牠！':'牠長大一點了！'],true);
 const done=()=>{e.st=Math.max(e.st||0,to);if((e.up||0)<=e.st)delete e.up;sv2();ov.remove();celOn=0;
  try{if(S.screen==='pethouse')SCREENS.pethouse();else if(S.screen==='title')SCREENS.title()}catch(_){}setTimeout(celebrateSoon,600)};
 ov.querySelector('#p19ok').onclick=done}
for(const sc of ['title','pethouse','map','wardrobe','park']){const f0=SCREENS[sc];if(typeof f0!=='function')continue;SCREENS[sc]=function(){const r=f0.apply(this,arguments);try{setTimeout(celebrateSoon,1900)}catch(e){}return r}}

/* ================= 3. 寵物小屋 ================= */
const HCSS=`
.p19grow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:2px 0 4px}
.p19grow .p19tag{margin:0;font-size:14px}
.p19bar{flex:1 1 90px;min-width:80px;height:10px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden}.p19bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#FFB3D9,#FFD24D)}
.p19pals{position:absolute;inset:0;pointer-events:none;z-index:1}
.p19pal{position:absolute;bottom:11%;width:min(28%,170px);pointer-events:auto;cursor:pointer;-webkit-tap-highlight-color:transparent;transform-origin:50% 100%}
.p19pal svg{width:100%;height:auto;display:block}
.p19pal.l{left:3%}.p19pal.r{right:3%}
.p19ball{position:absolute;width:30px;height:30px;left:0;bottom:12%;pointer-events:none;opacity:0;z-index:2}
.p19z{position:absolute;font:700 18px/1 'Baloo 2',sans-serif;color:#B9A8FF;opacity:0;pointer-events:none;animation:p19z 2.2s ease-out forwards;z-index:2}
@keyframes p19z{0%{opacity:0;translate:0 0}25%{opacity:1}100%{opacity:0;translate:14px -40px}}
.p19sleep .blink{animation:none!important;transform:scaleY(.18)!important}
`;
{const st=document.createElement('style');st.id='p19css';st.textContent=CCSS+HCSS+HINTCSS();document.head.appendChild(st)}
function petsOwned(){try{return ITEMS.filter(x=>x.slot==='pet'&&owns(x.id)).map(x=>x.id)}catch(e){return []}}
function palsFor(cur){const all=petsOwned().filter(k=>k!==cur);if(!all.length)return [];const d=new Date();const off=(d.getDate()+d.getMonth()*31)%all.length;const r=[];for(let i=0;i<Math.min(2,all.length);i++)r.push(all[(off+i)%all.length]);return r}
let palT=0,palGen=0;
function phouse(){clearTimeout(palT);palGen++;const sc=document.getElementById('pscene');if(!sc)return;const k=S.look.pet;
 // 成長列
 try{const side=document.querySelector('.pside');if(side&&!side.querySelector('.p19grow')&&ownsP(k)){const e=gEnt(k,true);const st=stageOfP(e.p);
  const pct=st>=2?100:Math.round(100*(e.p-TH[st])/(TH[st+1]-TH[st]));const g=document.createElement('div');g.className='p19grow';
  g.innerHTML=`${stageTag(st)}<span class="p19bar" role="img" aria-label="${st>=2?'已經長大了':'成長進度'}"><i style="width:${Math.max(4,pct)}%"></i></span>`;
  const nm=side.querySelector('.pname');if(nm)nm.after(g);else side.prepend(g)}}catch(e){}
 const pals=palsFor(k);if(!pals.length)return;let L=sc.querySelector('.p19pals');if(L)L.remove();L=document.createElement('div');L.className='p19pals';
 L.innerHTML=pals.map((p,i)=>`<span class="p19pal ${i?'r':'l'}" data-k="${p}" role="button" tabindex="0" aria-label="${petNm(p)}">${petSVG(p,'')}</span>`).join('')+`<span class="p19ball" aria-hidden="true"><svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="#FF8FB8" stroke="#fff" stroke-width="2"/><path d="M3 13 Q15 19 27 13 M15 2 Q10 15 15 28" stroke="#fff" stroke-width="2" fill="none"/></svg></span>`;
 const pb=document.getElementById('pbig');sc.insertBefore(L,pb&&pb.nextSibling);
 L.querySelectorAll('.p19pal').forEach(el=>el.onclick=()=>{try{sfx('pop')}catch(_){}if(calm())return;el.animate([{translate:'0 0'},{translate:'0 -18%'},{translate:'0 0'}],{duration:520,easing:'ease-out'})});
 const g=palGen;palT=setTimeout(()=>palLoop(g,0),2600)}
function palBusy(){const fx=document.getElementById('pfx');return !!(document.querySelector('.overlay')||(fx&&fx.children.length)||document.querySelector('.pacts button:disabled')||calm()||document.hidden)}
const PLAYS=['chase','ball','sleep'];
async function palLoop(g,i){if(g!==palGen||S.screen!=='pethouse')return;const sc=document.getElementById('pscene');if(!sc||!sc.querySelector('.p19pals'))return;
 if(!palBusy()){try{await PLAY[PLAYS[i%3]](sc,g)}catch(e){console.log('p19 play',e)}i++}
 if(g===palGen)palT=setTimeout(()=>palLoop(g,i),palBusy()?2000:4200)}
const A=(el,kf,o)=>new Promise(r=>{if(!el||!el.isConnected)return r();const an=el.animate(kf,o);an.onfinish=r;an.oncancel=r});
const sleepMs=ms=>new Promise(r=>setTimeout(r,ms));
function rects(sc){const R=sc.getBoundingClientRect();const pb=document.getElementById('pbig');const P1=sc.querySelector('.p19pal.l'),P2=sc.querySelector('.p19pal.r');
 const c=el=>{if(!el)return null;const r=el.getBoundingClientRect();return {x:r.left+r.width/2-R.left,w:r.width,el}};return {R,m:c(pb),a:c(P1),b:c(P2)}}
const PLAY={
 // 追來追去：旁邊的寵物跑去找主角，主角跑開，再追回來
 async chase(sc,g){const {R,m,a,b}=rects(sc);const run=a||b;if(!run||!m)return;const dir=run===a?1:-1;
  const away=dir*Math.min(R.width*.1,70);const d=(m.x+away)-run.x+dir*m.w*.5;
  const fa=dir>0?'y 0deg':'y 180deg',fb=dir>0?'y 180deg':'y 0deg';
  const hops=(x0,x1,n,face)=>Array.from({length:n*2+1},(_,i)=>({translate:`${(x0+(x1-x0)*i/(n*2)).toFixed(1)}px ${i%2?'-12%':'0%'}`,rotate:face}));
  // 旁邊的寵物跑過來追，主角往前跑開
  await Promise.all([A(run.el,hops(0,d,4,fa),{duration:1300,easing:'linear',fill:'forwards'}),
   sleepMs(350).then(()=>A(m.el,[{translate:'0 0'},{translate:`${away*.5}px -8%`},{translate:`${away}px 0`}],{duration:800,easing:'ease-out',fill:'forwards'}))]);
  if(g!==palGen)return;
  // 換主角追回來：大家跑回原位
  await Promise.all([A(run.el,hops(d,0,4,fb),{duration:1300,easing:'linear',fill:'forwards'}),
   sleepMs(300).then(()=>A(m.el,[{translate:`${away}px 0`},{translate:`${away*.5}px -8%`},{translate:'0 0'}],{duration:1000,easing:'ease-in-out',fill:'forwards'}))]);
  await A(run.el,[{translate:'0 0',rotate:fb},{translate:'0 0',rotate:'y 0deg'}],{duration:250,fill:'forwards'});
  [run.el,m.el].forEach(el=>el&&el.getAnimations().forEach(x=>{try{x.cancel()}catch(_){}}))},
 // 一起玩球：球在兩隻之間彈來彈去
 async ball(sc,g){const {m,a,b}=rects(sc);const p=[a,m,b].filter(Boolean);if(p.length<2)return;const ball=sc.querySelector('.p19ball');if(!ball)return;
  const xs=p.map(q=>q.x-15);let cur=0;ball.style.left='0px';await A(ball,[{opacity:0,translate:`${xs[0]}px 0`},{opacity:1,translate:`${xs[0]}px -40px`}],{duration:400,fill:'forwards'});
  for(let n=0;n<5&&g===palGen;n++){const nx=(cur+1+(n%2&&p.length>2?1:0))%p.length;const x0=xs[cur],x1=xs[nx];
   const hit=p[nx].el;try{sfx('hop')}catch(_){}
   await Promise.all([A(ball,[{translate:`${x0}px -40px`,rotate:'0deg'},{translate:`${(x0+x1)/2}px -110px`,rotate:'200deg'},{translate:`${x1}px -40px`,rotate:'400deg'}],{duration:780,easing:'ease-in-out',fill:'forwards'}),
    sleepMs(520).then(()=>A(hit,[{translate:'0 0'},{translate:'0 -12%'},{translate:'0 0'}],{duration:420,easing:'ease-out'}))]);cur=nx}
  await A(ball,[{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});ball.getAnimations().forEach(x=>{try{x.cancel()}catch(_){}});ball.style.opacity='0'},
 // 靠在一起睡覺：旁邊的寵物靠過來，頭歪一邊、閉眼，冒出 Z
 async sleep(sc,g){const {R,m,a,b}=rects(sc);const ps=[a,b].filter(Boolean);if(!m||!ps.length)return;
  const moves=ps.map(q=>{const dir=q===a?1:-1;const d=(m.x-q.x)-dir*(m.w*.36+q.w*.3);return {q,d,dir}});
  await Promise.all(moves.map(({q,d,dir})=>A(q.el,[{translate:'0 0',rotate:'0deg'},{translate:`${d}px 0`,rotate:`${dir*7}deg`}],{duration:1100,easing:'ease-in-out',fill:'forwards'})).concat([A(m.el,[{rotate:'0deg'},{rotate:'-4deg'}],{duration:1100,fill:'forwards'})]));
  if(g!==palGen)return;const els=[m.el,...ps.map(x=>x.q.el)];els.forEach(el=>el.classList.add('p19sleep'));
  for(let i=0;i<4&&g===palGen;i++){const z=document.createElement('span');z.className='p19z';z.textContent=i%2?'z':'Z';const at=els[i%els.length].getBoundingClientRect();z.style.left=(at.left-R.left+at.width*.6)+'px';z.style.top=(at.top-R.top+at.height*.1)+'px';sc.appendChild(z);setTimeout(()=>z.remove(),2400);await sleepMs(700)}
  await sleepMs(900);els.forEach(el=>el.classList.remove('p19sleep'));if(g!==palGen)return;
  await Promise.all(moves.map(({q,d,dir})=>A(q.el,[{translate:`${d}px 0`,rotate:`${dir*7}deg`},{translate:'0 0',rotate:'0deg'}],{duration:1000,easing:'ease-in-out',fill:'forwards'})).concat([A(m.el,[{rotate:'-4deg'},{rotate:'0deg'}],{duration:900,fill:'forwards'})]));
  els.forEach(el=>el&&el.getAnimations().forEach(x=>{try{x.cancel()}catch(_){}}))}};
{const _ph=SCREENS.pethouse;if(typeof _ph==='function')SCREENS.pethouse=function(){const r=_ph.apply(this,arguments);try{phouse()}catch(e){console.log('p19 house',e)}return r}}

/* ================= 1. 關卡裡寵物幫忙 ================= */
function HINTCSS(){return `
#pet.p19rdy{cursor:pointer;filter:drop-shadow(0 0 6px rgba(255,226,122,.95)) drop-shadow(0 0 14px rgba(255,200,90,.7));animation:p19rdy 1.6s ease-in-out infinite}
@keyframes p19rdy{0%,100%{filter:drop-shadow(0 0 4px rgba(255,226,122,.7)) drop-shadow(0 0 8px rgba(255,200,90,.4))}50%{filter:drop-shadow(0 0 9px rgba(255,236,150,1)) drop-shadow(0 0 20px rgba(255,200,90,.85))}}
#pet .p19paw{position:absolute;right:-6%;top:-14%;width:34%;max-width:40px;aspect-ratio:1;pointer-events:none;animation:p19paw 1.6s ease-in-out infinite}
@keyframes p19paw{0%,100%{opacity:.55;translate:0 0}50%{opacity:1;translate:0 -5px}}
.p19walk{position:fixed;z-index:60;pointer-events:none;transform-origin:50% 100%}
.p19walk svg{width:100%;height:100%;display:block}
.p19sniff{position:fixed;z-index:61;pointer-events:none;font:700 15px/1 sans-serif;color:#fff;opacity:0}
.p19gone{pointer-events:none!important}
@media (prefers-reduced-motion:reduce){#pet.p19rdy,#pet .p19paw{animation:none!important}}
body.lite #pet.p19rdy,body.lite #pet .p19paw{animation:none!important}`}
const PAW=`<svg class="p19paw" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#FFF6D8" stroke="#E8B84A" stroke-width="2"/><ellipse cx="20" cy="25" rx="7.5" ry="6.2" fill="#E89A4A"/><circle cx="11.5" cy="16.5" r="3.2" fill="#E89A4A"/><circle cx="17" cy="11.5" r="3.2" fill="#E89A4A"/><circle cx="23" cy="11.5" r="3.2" fill="#E89A4A"/><circle cx="28.5" cy="16.5" r="3.2" fill="#E89A4A"/></svg>`;
const NOHINT=/^(write|wfree|wp|trace|stroke|sort|drag|read|recall|routine|catch|maze|flip|memo|pair|order|seq|speak|say|sing|paint|color|draw|dance|eact|R$)/i;
let lvSeq=0,ansSeq=0,qSeq=0,seqAt=-1,usedKey='',hintT=0,ready=false,busy=false;
function track(){try{if(!S||Object.prototype.hasOwnProperty.call(S,'__p19t'))return;let v=S.ans;
 Object.defineProperty(S,'ans',{get(){return v},set(x){v=x;ansSeq++},enumerable:true,configurable:true});Object.defineProperty(S,'__p19t',{value:1,enumerable:false,configurable:true})}catch(e){}}
const hintOff=()=>{try{return V2.pet19HintOff===true}catch(e){return false}};
const lvKey=()=>{try{return [S.screen,S.ch,S.level,(S.pmode&&S.pmode.k)||'',lvSeq].join('|')}catch(e){return ''}};
const curT=()=>{try{return String(S.qs[S.q]||'').split(':')[0]}catch(e){return ''}};
function cands(){try{if(S.screen!=='stage'||S.lock)return null;if(typeof exOn==='function'&&exOn())return null;if(NOHINT.test(curT()))return null;
 if(seqAt!==qSeq)return null;const ans=S.ans;if(ans==null||typeof ans==='object')return null;const A0=String(ans);
 const play=document.querySelector('.stage .play');if(!play)return null;
 const bs=[...play.querySelectorAll('[data-v]')].filter(b=>(b.tagName==='BUTTON'||b.getAttribute('role')==='button'||typeof b.onclick==='function')&&!b.disabled&&!b.classList.contains('p19gone')&&b.getAttribute('aria-hidden')!=='true'&&b.offsetParent!==null);
 const groups={};bs.forEach(b=>{const c=(b.className||'').toString().split(/\s+/)[0]||'_';(groups[c]=groups[c]||[]).push(b)});
 for(const c of Object.keys(groups)){const G=groups[c];if(G.length<3)continue;const hit=G.filter(b=>b.dataset.v===A0);if(hit.length!==1)continue;const wrong=G.filter(b=>b!==hit[0]);if(wrong.length>=2)return {right:hit[0],wrong}}
 return null}catch(e){return null}}
function petEl(){return document.getElementById('pet')}
function unready(){ready=false;const p=petEl();if(p){p.classList.remove('p19rdy');const w=p.querySelector('.p19paw');if(w)w.remove();p.removeAttribute('role');p.removeAttribute('aria-label')}}
function arm(src){try{clearTimeout(hintT);if(ready||busy||hintOff()||usedKey===lvKey())return;if(!cands())return;const p=petEl();if(!p)return;
 ready=true;p.classList.add('p19rdy');if(getComputedStyle(p).position==='static')p.style.position='relative';if(!p.querySelector('.p19paw'))p.insertAdjacentHTML('beforeend',PAW);
 p.setAttribute('role','button');p.setAttribute('aria-label','點寵物幫忙');
 if(src==='idle')talk(['需要幫忙嗎？點我一下！'])}catch(e){}}
if(typeof renderQ==='function'){const _rq=renderQ;renderQ=function(){track();unready();clearTimeout(hintT);const a0=ansSeq;const r=_rq.apply(this,arguments);
 qSeq++;const q=qSeq;const chk=()=>{if(ansSeq!==a0)seqAt=q};chk();setTimeout(chk,0);
 hintT=setTimeout(()=>{if(q===qSeq&&!S.lock)arm('idle')},8000);return r}}
if(typeof wrong==='function'){const _w=wrong;wrong=function(){const lk=S.lock;const r=_w.apply(this,arguments);if(!lk)setTimeout(()=>{if(!S.lock)arm('wrong')},700);return r}}
{const _st=SCREENS.stage;if(typeof _st==='function')SCREENS.stage=function(){lvSeq++;ready=false;busy=false;clearTimeout(hintT);return _st.apply(this,arguments)}}
function fade(el){try{el.classList.add('p19gone');el.setAttribute('aria-hidden','true');if('disabled' in el)el.disabled=true;el.tabIndex=-1;
 const an=el.animate([{opacity:1,translate:'0 0'},{opacity:0,translate:'0 10px'}],{duration:calm()?400:700,easing:'ease-in',fill:'forwards'});an.onfinish=()=>{el.style.visibility='hidden'}}catch(e){el.style.visibility='hidden'}}
async function useHint(){if(!ready||busy)return;const c=cands();if(!c){unready();return}busy=true;unready();usedKey=lvKey();
 try{S.miss=Math.max(S.miss||0,1)}catch(e){}
 const target=c.wrong[Math.floor(Math.random()*c.wrong.length)];target.classList.add('p19gone');
 try{audio()}catch(_){}try{sfx('hint')}catch(_){}
 const p=petEl();const sv=p&&p.querySelector('svg');
 if(calm()||!p||!sv){fade(target);await sleepMs(500)}
 else{try{const R=p.getBoundingClientRect(),T=target.getBoundingClientRect();
   const w=document.createElement('div');w.className='p19walk';w.style.cssText=`left:${R.left}px;top:${R.top}px;width:${R.width}px;height:${R.height}px`;w.appendChild(sv.cloneNode(true));document.body.appendChild(w);
   p.style.visibility='hidden';
   // 聞一聞
   const sn=document.createElement('div');sn.className='p19sniff';sn.textContent='…';sn.style.left=(R.left+R.width*.78)+'px';sn.style.top=(R.top+R.height*.18)+'px';document.body.appendChild(sn);
   sn.animate([{opacity:0},{opacity:1},{opacity:0}],{duration:900});
   await A(w,[{rotate:'0deg'},{rotate:'-6deg'},{rotate:'4deg'},{rotate:'-6deg'},{rotate:'0deg'}],{duration:800,easing:'ease-in-out'});sn.remove();
   const dx=(T.left+T.width/2)-(R.left+R.width/2)+(T.left+T.width/2<R.left+R.width/2?T.width*.55:-T.width*.55),dy=(T.bottom-R.height*.15)-(R.bottom);
   const face=dx<0?'y 180deg':'y 0deg';const hop=6;const kf=Array.from({length:hop+1},(_,i)=>({translate:`${(dx*i/hop).toFixed(1)}px ${(dy*i/hop+(i%2?-10:0)).toFixed(1)}px`,rotate:face}));
   await A(w,kf,{duration:950,easing:'linear',fill:'forwards'});
   if(!S.lock)fade(target);else target.classList.remove('p19gone');
   await sleepMs(650);
   const back=Array.from({length:hop+1},(_,i)=>({translate:`${(dx*(1-i/hop)).toFixed(1)}px ${(dy*(1-i/hop)+(i%2?-10:0)).toFixed(1)}px`,rotate:dx<0?'y 0deg':'y 180deg'}));
   await A(w,back,{duration:900,easing:'linear',fill:'forwards'});w.remove();p.style.visibility=''}
  catch(e){console.log('p19 walk',e);fade(target);const p2=petEl();if(p2)p2.style.visibility='';document.querySelectorAll('.p19walk,.p19sniff').forEach(x=>x.remove())}}
 busy=false;if(!S.lock){try{const bb=document.getElementById('petbub');if(bb){bb.textContent='我拿走一個了，你自己找找看！';bb.hidden=false;bb.style.animation='none';void bb.offsetWidth;bb.style.animation='';setTimeout(()=>{try{bb.hidden=true}catch(_){}},4200)}}catch(_){}
  talk(['我幫你拿走一個了！','你自己找找看！'],true)}}
// 主角的 svg 方框可能蓋住寵物：用點的位置判斷（點在寵物圖上就算）
const onPet=e=>{const t=e.target;if(t&&t.closest&&t.closest('#pet'))return true;const p=petEl();if(!p||e.clientX==null)return false;const r=p.getBoundingClientRect();
 if(t&&t.closest&&t.closest('.play,.bubble,.overlay,button:not(#pet)'))return false;return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom};
document.addEventListener('click',e=>{try{if(S.screen!=='stage'||!ready)return;if(!onPet(e))return;e.stopPropagation();e.preventDefault();useHint()}catch(_){}},true);
document.addEventListener('keydown',e=>{try{if(ready&&(e.key==='Enter'||e.key===' ')&&document.activeElement===petEl()){e.preventDefault();useHint()}}catch(_){}});
// 離開關卡：收掉走路的寵物
for(const sc of Object.keys(SCREENS)){if(sc==='stage')continue;const f0=SCREENS[sc];if(typeof f0!=='function')continue;SCREENS[sc]=function(){try{clearTimeout(hintT);ready=false;document.querySelectorAll('.p19walk,.p19sniff').forEach(x=>x.remove())}catch(e){}return f0.apply(this,arguments)}}

/* ---------- 家長專區：寵物幫忙開關（遊戲設定 → 學習） ---------- */
if(typeof parentPanel==='function'){const _pp=parentPanel;parentPanel=function(){const r=_pp.apply(this,arguments);try{const ov=[...document.querySelectorAll('.overlay')].pop();const card=ov&&ov.querySelector('.card');
 if(card&&card.querySelector('#pdone')&&!card.querySelector('.p19set')){const off=hintOff();const d=document.createElement('div');d.className='s8blk p19set';d.dataset.s8own='1';d.dataset.s8='learn';d.style.order='25';
  d.innerHTML=`<span class="lab">寵物幫忙</span><div class="seg"><button type="button" data-p19h="0" aria-pressed="${!off}">開</button><button type="button" data-p19h="1" aria-pressed="${off}">關</button></div><p class="small">孩子答錯一次、或停下來 8 秒，寵物會發亮；點寵物，牠會拿走一個錯的選項（每一關一次，只用在 3 個以上選項的題目）。用了提示的那一題不算「一次答對」。</p>`;
  const pd=card.querySelector('#pdone');const host=pd&&pd.closest('.card > *');if(host&&host.parentNode===card)card.insertBefore(d,host);else card.appendChild(d);
  d.querySelectorAll('[data-p19h]').forEach(b=>b.onclick=()=>{V2.pet19HintOff=b.dataset.p19h==='1';sv2();d.querySelectorAll('[data-p19h]').forEach(x=>x.setAttribute('aria-pressed',x===b))})}}catch(e){console.log('p19 set',e)}return r}}

window.__p19={stopPals:()=>{palGen++;clearTimeout(palT);return palGen},stageOf,gain,gEnt,petAt,celebrate,cands,arm,useHint,phouse,PLAY,K,FS,TH,palsFor,state:()=>({ready,busy,usedKey,lv:lvKey(),seqAt,qSeq})};
}catch(e){try{console.log('p19 off',e&&e.message)}catch(_){}}})();

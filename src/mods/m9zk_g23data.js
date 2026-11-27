/* ================= 2.3 遊樂園大禮物：第 46～50 章資料（m9zk_g23data.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 接在 m9zb（資料）、m9zd（核心）之後。說明給別的代理看：dev/g23.md。
 * 1. 15 樣 push 進 G22.ITEMS（照 brief/contract.md 的表），G22.GAMENAME 補挖化石、雨林盪藤蔓、手作小工坊、腳踏車小路。
 * 2. G22.SCR 補 fossil／vine／craft／bike：寫成「讀的時候才判斷」的 getter——章節還沒完成（化石第 29 章、盪藤蔓第 36 章、腳踏車第 49 章；
 *    App 還要 __appOpen(章-1)）、遊戲自己的 gate 不是 ''、或畫面 SCREENS[名字] 還不存在（例如 craft23 還沒合進來），就讀到 undefined，
 *    核心的 gameOpen() 就當成沒開 → resolve() 改送備用擺飾（核心原本的規則）。核心的 NEEDCH 是區域變數改不到，所以用這個方法，不改 m9zd。
 * 3. 備用擺飾多 3 樣（2.2 的 3 樣用完才輪到；圖和房間玩具格在 m9zl）：彩色小風箏、黃色小鴨、月亮小夜燈。
 * 4. 退路圖：核心只畫得出自己那 18 樣，新的 15 樣在「大禮物卡」「章節地圖禮物牌」「遊樂園有新東西小卡」會是空白的圖。
 *    這裡把空白的 64×64 圖換成 G22.ART[id]（各代理放的；剪影沒有就從 ART 自動做），還沒有就用「禮物盒＋小星星」退路圖。
 *    大禮物卡：包 REWARD.g22（呼叫前先用 G22.core.pendingNow() 知道是哪一樣）；地圖禮物牌、補發小卡：看到空白圖就補（MutationObserver，只找 g22 的東西）。
 * 不加新台詞（核心的台詞照舊）。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(!window.G22||!Array.isArray(G22.ITEMS))return;
/* ---------- 1. 資料 ---------- */
const NEW=[
 {id:'col_firetruck',ch:46,lv:3,game:'coloring',name:'消防車的塗色圖'},
 {id:'cr_windmill',  ch:46,lv:6,game:'craft',   name:'彩色小風車'},
 {id:'fs_beach',     ch:46,lv:9,game:'fossil',  name:'海邊的化石場'},
 {id:'col_bearcop',  ch:47,lv:3,game:'coloring',name:'黑熊警察的塗色圖'},
 {id:'vn_falls',     ch:47,lv:6,game:'vine',    name:'雨林大瀑布'},
 {id:'rm_policecar', ch:47,lv:9,game:'room',    name:'小警車玩具'},
 {id:'cr_fishcup',   ch:48,lv:3,game:'craft',   name:'紙杯小魚'},
 {id:'pt_ring',      ch:48,lv:6,game:'pet',     name:'寵物游泳圈'},
 {id:'col_pool',     ch:48,lv:9,game:'coloring',name:'游泳池的塗色圖'},
 {id:'fs_tri',       ch:49,lv:3,game:'fossil',  name:'劍龍化石'},
 {id:'cr_wreath',    ch:49,lv:6,game:'craft',   name:'小花圈'},
 {id:'vn_frog',      ch:49,lv:9,game:'vine',    name:'雨林的新朋友：小樹蛙'},
 {id:'col_bike',     ch:50,lv:3,game:'coloring',name:'腳踏車的塗色圖'},
 {id:'bk_bell',      ch:50,lv:6,game:'bike',    name:'彩虹腳踏車鈴'},
 {id:'cr_frame',     ch:50,lv:9,game:'craft',   name:'手作相框'}];
NEW.forEach(x=>{if(!G22.ITEMS.some(y=>y.id===x.id||(y.ch===x.ch&&y.lv===x.lv)))G22.ITEMS.push(x)});
const SP23=[{id:'sp_kite',game:'room',name:'彩色小風箏'},{id:'sp_duck',game:'room',name:'黃色小鴨'},{id:'sp_lamp',game:'room',name:'月亮小夜燈'}];
try{if(Array.isArray(G22.SPARE))SP23.forEach(x=>{if(!G22.SPARE.some(y=>y.id===x.id))G22.SPARE.push(x)})}catch(e){}
G22.GAMENAME=Object.assign(G22.GAMENAME||{},{fossil:'挖化石',vine:'雨林盪藤蔓',craft:'手作小工坊',bike:'腳踏車小路'});
G22.ITEMS23=NEW.map(x=>x.id);

/* ---------- 2. 遊戲開了沒（章節＋App＋遊戲自己的 gate＋畫面在不在） ---------- */
const SCR23={fossil:'fossil26',vine:'vine6',craft:'craft23',bike:'bike8'};
G22.SCR23=SCR23;
G22.NEEDCH23=Object.assign({fossil:29,vine:36,bike:49,craft:0},G22.NEEDCH23||{});
const appCh=n=>{try{return typeof window.__appOpen==='function'?!!window.__appOpen(n-1):true}catch(e){return true}};
const GATE={fossil:()=>typeof window.__gate26==='function'?window.__gate26('fossil26'):'',
 vine:()=>window.__V6&&typeof __V6.gate==='function'?__V6.gate():'',
 craft:()=>window.__CR23&&typeof __CR23.gate==='function'?__CR23.gate():'',
 bike:()=>window.__BK8&&typeof __BK8.gate==='function'?__BK8.gate():''};
function open23(g){try{const scr=SCR23[g];if(!scr||typeof SCREENS[scr]!=='function')return false;
 const n=+(G22.NEEDCH23&&G22.NEEDCH23[g])||0;if(n&&((S.chDone||0)<n||!appCh(n)))return false;
 const st=GATE[g]?GATE[g]():'';if(st)return false;return true}catch(e){return false}}
G22.open23=open23;
try{if(G22.SCR)Object.keys(SCR23).forEach(g=>{Object.defineProperty(G22.SCR,g,{enumerable:true,configurable:true,get:()=>open23(g)?SCR23[g]:undefined})})}catch(e){console.log('g23 scr',e)}

/* ---------- 3. 圖：ART／SIL、退路圖 ---------- */
let K=0;const uid=()=>'g23d'+(++K).toString(36)+Math.random().toString(36).slice(2,5);
const CORE=['tulip','tunnel','mango','bookworm','starlamp','penguin','giraffe','cucumber','bone','elecan','pawrug','morning','frame','chameleon','rcamera','sp_cushion','sp_mobile','sp_plant'];
const isCore=id=>{try{return CORE.includes(id)&&!!Object.getOwnPropertyDescriptor(G22.ART,id)}catch(e){return false}};
const wrap=s=>/^\s*<svg/.test(s)?s:`<svg viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`;
const star=(cx,cy,R,k=.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1)}return d+'Z'};
// 退路圖：紫色禮物盒＋金色緞帶＋小星星（同一套畫法，沒有黑邊）
function fallback(){const u=uid();return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A6FF"/><stop offset="1" stop-color="#8A5CE6"/></linearGradient><linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE9A0"/><stop offset=".5" stop-color="#FFD24D"/><stop offset="1" stop-color="#F0B030"/></linearGradient></defs>
 <ellipse cx="32" cy="60.5" rx="22" ry="2.6" fill="#3A2A5A" opacity=".16"/>
 <rect x="12" y="28" width="40" height="30" rx="4" fill="url(#${u}a)"/><rect x="9" y="22" width="46" height="10" rx="3" fill="#D8C0FF"/>
 <rect x="28" y="22" width="8" height="36" fill="url(#${u}r)"/><path d="M32 22 Q22 8 17 13 Q15 19 32 22Z M32 22 Q42 8 47 13 Q49 19 32 22Z" fill="url(#${u}r)"/>
 <path d="M14 34 Q13 44 15 54" stroke="#fff" stroke-width="2.4" fill="none" opacity=".35" stroke-linecap="round"/><ellipse cx="17" cy="25" rx="3" ry="1.4" fill="#fff" opacity=".6"/>
 <g class="g22fx"><path d="${star(52,12,4.6)}" fill="#FFE27A"/><path d="${star(10,14,3)}" fill="#FFF3C4"/></g></svg>`}
function artStr(id){try{if(G22.ART){const a=G22.ART[id];const s=typeof a==='function'?a():a;if(typeof s==='string'&&s.length>20)return wrap(s)}}catch(e){}return fallback()}
function stripFx(s){let i,guard=0;while((i=s.indexOf('<g class="g22fx">'))>=0&&guard++<20){let d=0,j=-1;const re=/<g[\s>]|<\/g>/g;re.lastIndex=i;let m;
  while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0){j=m.index+4;break}}else d++}
  if(j<0){s=s.slice(0,i);break}s=s.slice(0,i)+s.slice(j)}return s}
function silStr(id,c){c=c||'#8C7CE6';try{if(G22.SIL){const a=G22.SIL[id];const s=typeof a==='function'?a(c):a;if(typeof s==='string'&&s.length>20){const w=wrap(s);return c==='#8C7CE6'?w:w.replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,k)=>k+'="'+c+'"')}}}catch(e){}
 let s=artStr(id);s=s.replace(/<ellipse cx="[\d.]+" cy="60\.5"[^>]*\/>/g,'');s=stripFx(s);
 return s.replace(/<defs>[\s\S]*?<\/defs>/g,'').replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,k)=>k+'="'+c+'"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'')}
G22.art23=artStr;G22.sil23=silStr;G22.fallback23=fallback;
const blank=sv=>!!sv&&sv.tagName&&sv.tagName.toLowerCase()==='svg'&&!sv.firstElementChild;
function put(sv,html){try{const t=document.createElement('template');t.innerHTML=html.trim();const n=t.content.firstElementChild;if(!n)return;
  const cls=sv.getAttribute('class');if(cls&&!n.getAttribute('class'))n.setAttribute('class',cls);sv.replaceWith(n)}catch(e){console.log('g23 put',e)}}
const byName=nm=>G22.ITEMS.concat(G22.SPARE||[]).find(x=>x.name===nm)||null;

// 遊戲小圖示：核心先問 __z7.parkIcon(畫面)，沒有就用它自己的表（沒有新遊戲 → 會變成「undefined」字樣）。
// 這裡包 __z7.parkIcon：新遊戲用卡片圖示 ICONART['i:畫面']，手作小工坊還沒有圖示時用一張小剪刀紙星星。
const ICO23={fossil:'i:fossil26',vine:'i:vine6',craft:'i:craft23',bike:'i:bike8'};
const CRAFTICO=()=>`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="#FFE9F2"/><path d="${star(28,30,15)}" fill="#FFD24D"/><path d="${star(28,30,8)}" fill="#FFF3B0"/><g transform="rotate(-30 46 44)"><ellipse cx="40" cy="52" rx="5" ry="4" fill="none" stroke="#B99CFF" stroke-width="3"/><ellipse cx="52" cy="52" rx="5" ry="4" fill="none" stroke="#B99CFF" stroke-width="3"/><path d="M42 48 L50 30 M50 48 L42 30" stroke="#8C7CA8" stroke-width="3" stroke-linecap="round"/></g></svg>`;
function gameIco(game){try{const k=ICO23[game];if(k&&typeof ICONART==='object'&&ICONART[k])return art(k);if(game==='craft')return CRAFTICO()}catch(e){}return ''}
try{const Z=window.__z7;if(Z&&typeof Z.parkIcon==='function'){const _pi=Z.parkIcon;Z.parkIcon=function(k){let r='';try{r=_pi.apply(this,arguments)}catch(e){}
  if(r)return r;try{const g=Object.keys(SCR23).find(x=>SCR23[x]===k);if(g)return gameIco(g)}catch(e){}return r}}}catch(e){console.log('g23 parkIcon',e)}
const badGi=gi=>!!gi&&(!gi.firstElementChild&&!gi.textContent.trim()||/undefined/.test(gi.textContent||''));
function fixCard(card,id,game){if(!card||!id)return;const sv=card.querySelector('.g22item svg');if(blank(sv))put(sv,artStr(id));
 const gi=card.querySelector('.g22where .gi');if(badGi(gi)){const s=gameIco(game);gi.innerHTML=s||''}}
try{if(typeof REWARD==='object'&&typeof REWARD.g22==='function'){const _rg=REWARD.g22;REWARD.g22=function(card,finish){let it=null;try{const p=G22.core&&G22.core.pendingNow&&G22.core.pendingNow();it=p&&p.it}catch(e){}
  const r=_rg.apply(this,arguments);
  try{if(it&&card){fixCard(card,it.id,it.game);
   // 打開以後右邊那欄才畫出來（遊戲小圖示），再補一次
   const mo=new MutationObserver(()=>{try{fixCard(card,it.id,it.game)}catch(e){}});mo.observe(card,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),15000)}}catch(e){console.log('g23 card',e)}
  return r}}}catch(e){console.log('g23 reward',e)}

// 章節地圖禮物牌
function fixPlaque(pq){try{const ch=S.ch+1;const st=G22.core.chState(ch);
 const mid=pq.querySelector('.nx .sl svg');if(blank(mid)){if(st.nx&&st.nx.it)put(mid,silStr(st.nx.it.id));else{const last=[...st.slots].reverse().find(s=>s.got&&s.it);if(last)put(mid,artStr(last.it.id))}}
 [...pq.querySelectorAll('.row>span')].forEach((sp,i)=>{const s=st.slots[i];const sv=sp.querySelector('svg');if(s&&s.it&&blank(sv))put(sv,s.got?artStr(s.it.id):silStr(s.it.id))})}catch(e){console.log('g23 plaque',e)}}
// 補發小卡
function fixBf(ov){ov.querySelectorAll('.g22bfi').forEach(b=>{const sv=b.querySelector('.pic svg');if(!blank(sv))return;const nm=(b.querySelector('b')||{}).textContent||'';const it=byName(nm.trim());put(sv,artStr(it?it.id:''));
 const gi=b.querySelector('small .gi');if(it&&badGi(gi)){gi.innerHTML=gameIco(it.game)||''}})}
let qd=0;function scan(){qd=0;try{const pq=document.getElementById('g22plq');if(pq&&pq.querySelector('svg:empty'))fixPlaque(pq);
 document.querySelectorAll('.g22bf').forEach(ov=>{if(ov.querySelector('svg:empty')||/undefined/.test(ov.textContent||''))fixBf(ov)})}catch(e){console.log('g23 scan',e)}}
try{new MutationObserver(()=>{if(!qd){qd=1;requestAnimationFrame(scan)}}).observe(document.body,{childList:true,subtree:true})}catch(e){console.log('g23 mo',e)}

G22.g23={ver:'2026-11-28',NEW,SP23,open23,artStr,silStr,fallback,scan};
}catch(e){console.log('m9zk_g23data',e)}}).toString()+')()')})();

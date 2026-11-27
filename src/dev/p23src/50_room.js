/* ---------- 房間：小化石展示架（博物館有恐龍才出現；點了在房間裡開博物館） ---------- */
// 位置：E（mods/m9zj_home23.js）若提供 window.__H23.spot('fossilshelf') → {x,y,w}（房間 800×400 座標）就用它；沒有就用預設
// 左邊讓給玩具格（F 的小警車、2.2 長頸鹿身高尺最右到 x≈599）：架子從 x602 開始，右邊不超過 E 給的 H4（到 656），腳踩在 y≈396
const SHELF_L=602;
function fitShelf(z){const x2=z.x+z.w,bot=z.y+z.h;const x=Math.max(z.x,SHELF_L);const w=Math.max(40,Math.min(z.w,x2-x));return {x,y:bot-2-w*108/68,w}}
const SHELF0=fitShelf({x:588,y:288,w:68,h:110});
function shelfSpot(){try{const h=window.__H23;if(h&&typeof h.spot==='function'){const s=h.spot('fossilshelf');if(s&&isFinite(s.x)&&isFinite(s.y))return fitShelf({x:+s.x,y:+s.y,w:+s.w||68,h:+s.h||110})}}catch(e){}return SHELF0}
function addShelf(){try{if(S.screen!=='room')return;const fm=ST().fm;const ks=Object.keys(fm).filter(k=>DINO[k]).sort((a,b)=>(fm[b].t||0)-(fm[a].t||0));if(!ks.length)return;
 const sv=document.querySelector('#screen .rscene2 svg.bg');if(!sv)return;const old=sv.querySelector('.p23shelf');if(old)old.remove();
 const sp=shelfSpot(),sc=sp.w/68;const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','p23shelf');g.setAttribute('transform',`translate(${sp.x} ${sp.y}) scale(${f1(sc)})`);
 g.setAttribute('role','button');g.setAttribute('aria-label',TP.m_title);g.innerHTML=`<rect x="-4" y="-4" width="76" height="116" fill="#fff" opacity="0"/>`+shelfArt(ks);
 g.addEventListener('click',e=>{e.stopPropagation();sfx('pop');try{hush()}catch(_){}sayR([TP.m_shelf]);openMuseum({})});sv.appendChild(g);
 // 房間的 svg 若被別的圖層蓋住：放一顆透明按鈕在展示架上（跟著房間捲動）
 requestAnimationFrame(()=>{try{const r=g.getBoundingClientRect();if(!r.width)return;const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height*.6);if(hit&&(hit===g||g.contains(hit)))return;
  const host=sv.parentElement;if(!host)return;const hr=host.getBoundingClientRect();let b=host.querySelector('.p23shelfb');if(!b){b=document.createElement('button');b.className='p23shelfb';b.setAttribute('aria-label',TP.m_title);b.onclick=e=>{e.stopPropagation();sfx('pop');try{hush()}catch(_){}sayR([TP.m_shelf]);openMuseum({})};host.appendChild(b)}
  if(getComputedStyle(host).position==='static')host.style.position='relative';
  Object.assign(b.style,{left:(r.left-hr.left+host.scrollLeft)+'px',top:(r.top-hr.top+host.scrollTop)+'px',width:Math.max(44,r.width)+'px',height:Math.max(44,r.height)+'px'})}catch(e){}})}catch(e){console.log('p23 shelf',e)}}
{const _rm=SCREENS.room;if(typeof _rm==='function'){SCREENS.room=function(){const r=_rm.apply(this,arguments);try{setTimeout(addShelf,60);setTimeout(addShelf,700)}catch(e){}return r}}}
/* ---------- 給 F（禮物核心）：挖化石開不開 ---------- */
window.__F26=Object.assign(window.__F26||{},{gate:()=>{try{return typeof window.__gate26==='function'?window.__gate26('fossil26')||'':''}catch(e){return ''}}});
/* ---------- 遊樂園卡片的說明字跟著新玩法 ---------- */
try{if(typeof UXPD!=='undefined'){UXPD.fossil26='挖恐龍、塗顏色';UXPD.vine6='接香蕉、交朋友'}}catch(e){}
{const _pk=SCREENS.park;if(typeof _pk==='function'){SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const fix=()=>{[['fossil26','刷開沙子，拼回恐龍','挖恐龍、拼骨頭、塗顏色'],['vine6','照順序接香蕉','接香蕉、交朋友']].forEach(([k,a,b])=>{document.querySelectorAll(`.pcard[data-k="${k}"] span`).forEach(s=>{if(s.textContent===a)s.textContent=b})})};fix();setTimeout(fix,300)}catch(e){}return r}}}

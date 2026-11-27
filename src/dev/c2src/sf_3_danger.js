/* ---------- 台詞（id＝S8S_＋key；TSV 由 dev/c2src/lines.js 產生） ---------- */
const LN={
 d_done:'全部找到了！你是安全小偵探！',d_ok:'這樣很好喔！',d_tip1:'仔細看看，誰做得不對呢？',d_tip2:'我幫你，看發光的地方！',d_more:'還有喔，再找找看！',
 d_in_fire46:'逃生演練屋：誰做得不對？點一下，幫他改過來！',
 d_in_police47:'回家的路上：誰做得不對？點一下，幫他改過來！',
 d_in_pool48:'社區游泳池：誰做得不對？點一下，幫他改過來！',
 d_in_park49:'自行車道：誰做得不對？點一下，幫他改過來！',
 d_in_home50a:'客廳：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50b:'廚房：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50c:'浴室：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50r:'我的房間：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50d:'陽台：哪裡有危險？點一下，貼上小貼紙！'};
const L=k=>LN[k]||'';
/* 選項念出來：題目念完，一張一張亮起來、念它的字（不識字也聽得懂）；小朋友點了就停 */
async function readOpts(els,txt,ok){try{for(const el of els){if(!el.isConnected||(ok&&!ok()))return;el.classList.add('reading');await Promise.race([SAY([txt(el)]),wait(window.__s8fast?20:2600)]);el.classList.remove('reading');if(!el.isConnected||(ok&&!ok()))return;await wait(window.__s8fast?5:120)}}catch(e){}}
/* 手機橫放時寵物泡泡會蓋住題目：改成只念＋放在自己的說明格 */
const PS2=(text,box)=>{if(shortLand2()||document.querySelector('.stage.q8full')){if(box){box.textContent=text;box.hidden=false}return SAY([text])}return PS(text)};
function shortLand2(){return innerHeight<=500&&innerWidth>innerHeight}
const D8LIST=['fire46','police47','pool48','park49','home50a','home50b','home50c','home50d','home50r'];
D8LIST.forEach(sc=>SC[sc].items.forEach(it=>{LN['d_'+sc+'_'+it.id]=it.why;it.r=Math.max(it.r,it.k==='bad'?58:52)}));  // 手機上點擊範圍至少約 44pt
/* ---------- 版面：手機橫放時題目區太矮，改用泡泡下面到舞台底的整塊空間 ---------- */
let curFit=null;
const refit=()=>{[0,160,520].forEach(t=>setTimeout(()=>{try{curFit&&curFit()}catch(e){}},t))};
const shortLand=()=>innerHeight<=500&&innerWidth>innerHeight;
function avail(play,full){
 try{if(play.dataset.s8s){play.style.cssText='';delete play.dataset.s8s}
  const st=play.closest('.stage');if(st)st.classList.remove('q8full');
  if(full&&st&&!shortLand()&&innerWidth<700&&innerHeight>innerWidth){const sr=st.getBoundingClientRect(),b=st.querySelector('.bubble'),br=b?b.getBoundingClientRect():null;
   const top=(br&&br.height?br.bottom:sr.top+120)+6,left=sr.left+10,right=sr.right-10,bottom=sr.bottom-10;play.dataset.s8s=1;st.classList.add('q8full');
   play.style.cssText=`position:absolute;left:${left-sr.left}px;top:${top-sr.top}px;width:${right-left}px;height:${Math.max(160,bottom-top)}px;flex:none;justify-content:center;gap:4px;margin:0;z-index:2`;
   return {w:right-left,h:Math.max(160,bottom-top),land:false,full:true}}
  if(shortLand()&&st){const sr=st.getBoundingClientRect(),b=st.querySelector('.bubble'),br=b?b.getBoundingClientRect():null,tm=document.getElementById('team'),trc=tm?tm.getBoundingClientRect():null;
   const top=(br&&br.height?br.bottom:sr.top+90)+6,left=sr.left+12;let right=sr.right-10;if(trc&&trc.width&&trc.left>sr.left+sr.width*.6)right=Math.min(right,trc.left-4);
   const bottom=sr.bottom-8;play.dataset.s8s=1;
   play.style.cssText=`position:absolute;left:${left-sr.left}px;top:${top-sr.top}px;width:${Math.max(200,right-left)}px;height:${Math.max(120,bottom-top)}px;flex:none;justify-content:center;gap:4px;margin:0`;
   return {w:Math.max(200,right-left),h:Math.max(120,bottom-top),land:true}}
  const r=play.getBoundingClientRect();return {w:r.width,h:r.height,land:false}}catch(e){return {w:320,h:240,land:false}}}
addEventListener('resize',()=>{try{if(curFit&&S.screen==='stage')setTimeout(()=>{try{curFit&&curFit()}catch(e){}},60)}catch(e){}});
{const _rq=renderQ;renderQ=function(){try{curFit=null;const p=document.querySelector('.stage .play');if(p&&p.dataset.s8s){p.style.cssText='';delete p.dataset.s8s}document.querySelectorAll('.stage.q8full').forEach(x=>x.classList.remove('q8full'));document.querySelectorAll('.d8hold').forEach(x=>x.remove())}catch(e){}return _rq.apply(this,arguments)}}
/* ---------- 找危險：可以放進任何容器（大冒險關第 50 章也用） ---------- */
function d8svg(sc,o={}){const D=SC[sc]||SC.home50a;const K=kit();const fixed=o.fixed||new Set();const hard=!!o.hard;
 let body=D.bg(K),top='',hits='';
 const act=D.items.filter(it=>it.k==='bad'&&(!it.hard||hard)&&(!o.only||o.only.includes(it.id)));
 D.items.forEach(it=>{
  if(it.k==='ok'){body+=`<g class="d8i d8okit" data-id="${it.id}">${it.art(K)}</g>`;hits+=`<circle class="d8hit" data-id="${it.id}" data-k="ok" cx="${it.x}" cy="${it.y}" r="${it.r}" fill="#000" fill-opacity="0"/>`;return}
  if(!act.includes(it))return;  // 困難才出的那一個：其他難度整個不畫
  const f=fixed.has(it.id);
  body+=`<g class="d8i d8bad${f?' fixed':''}" data-id="${it.id}"><g class="d8b">${it.bad(K)}</g><g class="d8g">${it.good(K)}</g></g>`;
  top+=`<g class="d8st${f?' on':''}" data-id="${it.id}">${okSticker(it.x+it.r*.55,it.y-it.r*.55)}</g><circle class="d8ring" data-id="${it.id}" cx="${it.x}" cy="${it.y}" r="${it.r-4}" fill="none" stroke="#FFE27A" stroke-width="10"/>`;
  hits+=`<circle class="d8hit" data-id="${it.id}" data-k="bad" cx="${it.x}" cy="${it.y}" r="${it.r}" fill="#000" fill-opacity="0"/>`});
 return {svg:`<svg class="d8svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(D.nm)}">${K.out()}<rect class="d8bgk" x="0" y="0" width="800" height="500" fill="#000" fill-opacity="0"/>${body}${top}<g class="d8hits">${hits}</g></svg>`,act}}
function mountDanger(host,sc,o={}){
 const D=SC[sc]||SC.home50a;sc=SC[sc]?sc:'home50a';const fixed=new Set();
 const built=d8svg(sc,{hard:o.hard,only:o.only});const act=built.act;const need=Math.min(o.need||act.length,act.length);
 host.innerHTML=built.svg;const svg=host.querySelector('svg');
 const bar=o.bar;let busy=false,miss=0,done=false,idleT=0;
 const drawBar=(msg)=>{if(!bar)return;bar.innerHTML=`<div class="d8slots">${Array.from({length:need},(_,i)=>`<i class="${i<fixed.size?'on':''}">${i<fixed.size?'✓':''}</i>`).join('')}</div>${msg?`<div class="d8why">${esc(msg)}</div>`:''}`};
 drawBar('');
 const ring=id=>{const r=svg.querySelector(`.d8ring[data-id="${id}"]`);if(r){r.classList.remove('on');void r.getBBox;r.classList.add('on')}};
 const left=()=>act.filter(it=>!fixed.has(it.id));
 const hint=m=>{if(done)return;if(m===1){PS2(L('d_tip1'))}else{const it=left()[0];if(it){PS2(L('d_tip2'));ring(it.id);show(it);if(o.onHint)try{o.onHint(it)}catch(e){}}}};
 const arm=()=>{clearTimeout(idleT);idleT=setTimeout(()=>{if(!done&&host.isConnected&&!busy){hint(2);arm()}},o.idle||22000)};arm();
 const fix=async id=>{if(done||busy||fixed.has(id))return;const it=act.find(x=>x.id===id);if(!it)return;
  fixed.add(id);busy=true;arm();
  const g=svg.querySelector(`.d8bad[data-id="${id}"]`);if(g)g.classList.add('fixed');const st=svg.querySelector(`.d8st[data-id="${id}"]`);if(st)st.classList.add('on');
  const r=svg.querySelector(`.d8ring[data-id="${id}"]`);if(r)r.classList.remove('on');
  okSfx();try{if(!RM())burstEl(svg.querySelector(`.d8hit[data-id="${id}"]`),8)}catch(e){}
  drawBar(it.why);if(o.onItem)try{o.onItem(it,fixed.size)}catch(e){}
  const last=fixed.size>=need;
  const p=SAY([it.why]);
  if(last){done=true;clearTimeout(idleT);await Promise.race([p,wait(window.__s8fast?50:5200)]);busy=false;if(host.isConnected&&o.onDone)o.onDone(svg);return}
  await Promise.race([p,wait(window.__s8fast?50:900)]);busy=false};
 const okTap=id=>{const it=D.items.find(x=>x.id===id);if(!it||busy)return;popSfx();drawBar(it.why);SAY([it.why]);
  try{const h=svg.querySelector(`.d8hit[data-id="${id}"]`);if(h&&!RM())burstEl(h,5)}catch(e){}};
 svg.addEventListener('click',e=>{if(done)return;const h=e.target.closest&&e.target.closest('.d8hit');
  if(h){if(h.dataset.k==='bad'){if(!fixed.has(h.dataset.id))fix(h.dataset.id);return}okTap(h.dataset.id);return}
  miss++;if(miss%3===0)hint(miss>=6?2:1)});
 const auto=async()=>{for(const it of left()){if(done)break;while(busy)await wait(40);fix(it.id);await wait(60)}};
 // 直式手機：大圖用螢幕高度的 55～60%，比畫面寬，左右滑著看（點擊圈跟著變大）；iPad、橫放照原本整張放進去
 const fit=(w,h,panH)=>{if(panH){const H=Math.floor(panH),W=Math.floor(H*1.6);svg.style.width=W+'px';svg.style.height=H+'px';host.classList.add('pan');host.style.width=Math.floor(w)+'px';host.style.height=H+'px';
   if(!host.dataset.sx){host.dataset.sx=1;host.scrollLeft=0}return W>w+4}
  host.classList.remove('pan');host.style.width='';host.style.height='';const W=Math.max(120,Math.min(w,h*1.6));svg.style.width=Math.floor(W)+'px';svg.style.height=Math.floor(W/1.6)+'px';return false};
 const show=it=>{try{if(!host.classList.contains('pan'))return;const W=svg.getBoundingClientRect().width,w=host.clientWidth;host.scrollTo({left:Math.max(0,it.x/800*W-w/2),behavior:RM()?'auto':'smooth'})}catch(e){}};
 return {svg,hint,auto,fit,need,act,fixed,host,stop:()=>{done=true;clearTimeout(idleT)}}}
// 直式手機用全舞台（藏起舞台下方的主角寵物）＋左右滑；回傳大圖高度（不用滑時回 0）
const portraitPhone=()=>!shortLand()&&innerWidth<700&&innerHeight>innerWidth;
const panH=(A,reserve)=>portraitPhone()?Math.max(220,Math.min(A.h-reserve,innerHeight*.58)):0;
BUILD.danger8=function(play,sp,arg){
 const sc=SC[arg]?arg:'home50a';S.ans=null;S.revKey=null;
 setPrompt(`<span class="qtag" style="--tagc:#FFB86A">找危險</span>${esc(L('d_in_'+sc))}`,LOG([L('d_in_'+sc)]),sp);
 play.innerHTML=`<div class="d8wrap"><div class="d8box"></div><div class="d8swipe" hidden>← 左右滑一滑，看整張圖 →</div><div class="d8bar"></div></div>`;
 const wrap=play.querySelector('.d8wrap'),bar=play.querySelector('.d8bar'),sw=play.querySelector('.d8swipe');
 const M=mountDanger(play.querySelector('.d8box'),sc,{hard:S.diff==='hard',bar,onDone:el=>{right(el,[praise(),L('d_done')])}});
 S.hint=M.hint;S.__auto=M.auto;
 curFit=()=>{const A=avail(play,portraitPhone());wrap.classList.toggle('land',!!A.land);const side=A.land||A.w>A.h*1.9;wrap.classList.toggle('side',side);
  if(side){M.fit(A.w-Math.min(A.land?190:250,A.w*.3)-8,A.h);sw.hidden=true}else{const ph=panH(A,64+28);const sc=M.fit(A.w,A.h-(innerWidth<700?64:70),ph);sw.hidden=!sc}};
 M.host.addEventListener('scroll',()=>{if(!sw.hidden)sw.classList.add('seen')},{passive:true});
 refit()};

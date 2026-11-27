/* =====================================================================
 * 挖化石（新版）：挖掘地、隨機恐龍、小鏟子＋刷子、拼回去、數一數、塗顏色、恐龍博物館
 * ===================================================================== */
const FLV={easy:{brush:44,tol:90,outline:1,shovel:68},mid:{brush:36,tol:68,outline:1,shovel:60},hard:{brush:28,tol:50,outline:0,shovel:52}};
const sitePic=k=>{const u=uid('p');
 if(k==='forest')return `<svg viewBox="0 0 120 64" aria-hidden="true"><defs>${lg(u+'a','#BFE8C8','#E8F8E8')}${lg(u+'b','#C8A47C','#A98460')}</defs><rect width="120" height="64" rx="12" fill="url(#${u}a)"/><circle cx="20" cy="24" r="16" fill="#7CC46A"/><circle cx="100" cy="20" r="18" fill="#5FAE4A"/><path d="M0 40 Q40 24 80 34 Q100 38 120 30 V52 Q120 64 108 64 H12 Q0 64 0 52Z" fill="url(#${u}b)"/><path d="M50 50 Q60 44 70 50" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="48" cy="51" r="3" fill="#FFF4E0"/><circle cx="72" cy="51" r="3" fill="#FFF4E0"/></svg>`;
 if(k==='beach')return `<svg viewBox="0 0 120 64" aria-hidden="true"><defs>${lg(u+'a','#BFE8FF','#E6F7FF')}${lg(u+'w','#7FD0F0','#4FB0E0')}${lg(u+'b','#FCEBC4','#F2D49A')}</defs><rect width="120" height="64" rx="12" fill="url(#${u}a)"/><circle cx="98" cy="16" r="8" fill="#FFE27A"/><path d="M0 28 Q30 22 60 28 Q90 34 120 26 V40 H0Z" fill="url(#${u}w)"/><path d="M0 40 Q40 32 80 38 Q100 42 120 36 V52 Q120 64 108 64 H12 Q0 64 0 52Z" fill="url(#${u}b)"/><g transform="translate(40 50)"><circle r="7" fill="#FFF4E0"/><path d="M0 0 m-1.4 0 a1.4 1.4 0 1 1 2.8 0 a3 3 0 1 1 -6 0" fill="none" stroke="#D9B27A" stroke-width="1.4"/></g><path d="M78 56 L72 48 Q74 42 78 42 Q82 42 84 48Z" fill="#FFC8D8"/></svg>`;
 return `<svg viewBox="0 0 120 64" aria-hidden="true"><defs>${lg(u+'a','#FFE8C0','#FFF6E0')}${lg(u+'b','#F2D6A4','#E0BA80')}</defs><rect width="120" height="64" rx="12" fill="url(#${u}a)"/><circle cx="96" cy="16" r="9" fill="#FFD24D"/><path d="M0 34 Q30 18 60 30 Q90 40 120 26 V52 Q120 64 108 64 H12 Q0 64 0 52Z" fill="url(#${u}b)"/><path d="M14 30 L22 14 L30 30Z M90 32 L100 18 L110 32Z" fill="#E8B878"/><path d="M44 50 Q58 42 72 50" stroke="#FFF4E0" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="42" cy="51" r="3.6" fill="#FFF4E0"/><circle cx="74" cy="51" r="3.6" fill="#FFF4E0"/></svg>`};
function chooseDino(site){const fm=ST().fm,last=ST().fl;let pool=SITES[site].pool.filter(dinoOpen);if(!pool.length)pool=['brachio'];
 // 有禮物劍龍、還沒挖過：這一次一定是牠
 if(gHas('fs_tri')&&pool.includes('stego')&&!fm.stego)return 'stego';
 let c=pool.filter(k=>!fm[k]&&k!==last);if(!c.length)c=pool.filter(k=>k!==last);if(!c.length)c=pool;return pick(c)}
let fTok=0,FS=null,FX={site:null,diff:null};
SCREENS.fossil26=function(){const tok=++fTok;const live=()=>tok===fTok&&S.screen==='fossil26';
 const P=ST();if(!FX.site)FX.site=P.fs&&SITES[P.fs]&&siteOpen(P.fs)?P.fs:'valley';if(!siteOpen(FX.site))FX.site='valley';if(!FX.diff)FX.diff=FLV[S.diff]?S.diff:'mid';
 const calm0=RMo();
 screen.innerHTML=`<div class="dball f26 p23f${calm0?' calm':''}"><div class="phead"><button class="btn2 small p88back" id="pback">回遊樂園</button><h2 class="gtitle">挖化石</h2><span class="phsp"></span></div>
  <div class="f26say"><p id="f26say"></p><button class="r26ib f26ag" id="f26ag" aria-label="再聽一次">${ICON.speaker('#FFE6A8')}</button></div>
  <div class="f26main"><div class="f26bw" id="f26bw"><div class="f26board" id="f26board"><svg id="f26sv" viewBox="0 0 600 340"></svg><canvas id="f26sand" width="1200" height="680"></canvas></div></div>
   <div class="f26side"><div class="p23tools" id="p23tools"><button class="p23tool" data-t="shovel" aria-label="${TP.t_shovel}">${ico('shovel')}<span>${TP.t_shovel}</span></button><button class="p23tool" data-t="brush" aria-label="${TP.t_brush}">${ico('brush')}<span>${TP.t_brush}</span></button></div>
    <div class="f26count"><span id="f26cl">找到化石</span><b id="f26cn">0</b><div class="f26dots" id="f26dots"></div></div><div class="f26tray" id="f26tray"></div></div></div>
  <div class="r26menu f26menu" id="f26menu"><div class="r26mc">
   <div class="r26mh"><span class="r26mi">${art('i:fossil26')}</span><div><b>挖化石</b><small>挖出恐龍、拼回去、塗上顏色，放進我的恐龍博物館！</small></div></div>
   <div class="r26lab">挖掘地</div><div class="f26opts p23sites" id="p23sites">${SORD.filter(siteOpen).map(k=>`<button class="r26opt f26opt" data-k="${k}"><span class="f26mp">${sitePic(k)}</span><b>${TP['f_site_'+k]}</b></button>`).join('')}</div>
   <div class="r26lab">難度</div><div class="r26row" id="p23fdiff"><button class="r26opt" data-v="easy"><b>簡單</b></button><button class="r26opt" data-v="mid"><b>中等</b></button><button class="r26opt" data-v="hard"><b>高難度</b></button></div>
   <div class="p23mrow"><button class="btn r26go" id="f26go">開始挖！</button><button class="btn2 p23mbtn" id="p23mus">${ico('museum')}<span>${TP.m_btn}</span></button></div></div></div></div>`;
 const root=$('.f26'),sv=$('#f26sv'),cv=$('#f26sand'),cx=cv.getContext('2d',{willReadFrequently:true}),board=$('#f26board'),bw=$('#f26bw'),menu=$('#f26menu'),tray=$('#f26tray');
 const SK=2;let calm=calm0,tool='shovel';const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const sayEl=$('#f26say');let curSay=null;
 const tell=(txt,parts)=>{sayEl.textContent=txt;curSay=parts||[txt];return sayR(curSay)};
 $('#pback').onclick=()=>{fTok++;hush();go('park')};
 $('#f26ag').onclick=()=>{if(curSay){sfx('pop');hush();sayR(curSay)}};
 const mTop=()=>{try{const h=root.querySelector('.phead');const t=h.getBoundingClientRect().bottom-root.getBoundingClientRect().top;menu.style.setProperty('--mt',Math.max(0,Math.round(t+6))+'px')}catch(e){}};
 const selS=()=>$$('#p23sites .f26opt').forEach(b=>b.classList.toggle('sel',b.dataset.k===FX.site));selS();
 const selD=()=>$$('#p23fdiff .r26opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===FX.diff));selD();
 $$('#p23sites .f26opt').forEach(b=>b.onclick=()=>{FX.site=b.dataset.k;selS();sfx('pop');hush();sayR([TP['f_site_'+FX.site]])});
 $$('#p23fdiff .r26opt').forEach(b=>b.onclick=()=>{FX.diff=b.dataset.v;selD();sfx('pop');hush();sayR([T26['d_'+FX.diff]])});
 $('#f26go').onclick=()=>{sfx('pop');hush();menu.style.display='none';requestAnimationFrame(()=>{if(live())startDig()})};
 $('#p23mus').onclick=()=>{sfx('pop');hush();openMuseum({})};
 $$('#p23tools .p23tool').forEach(b=>b.onclick=()=>{setTool(b.dataset.t);sfx('pop')});
 function setTool(t){tool=t;$$('#p23tools .p23tool').forEach(b=>{b.classList.toggle('sel',b.dataset.t===t);if(b.dataset.t===t)b.classList.remove('want')});cv.classList.toggle('shov',t==='shovel')}
 function showMenu(){menu.style.display='';mTop();root.classList.remove('digging','building');tell(TP.f_menu)}
 function fitBoard(){board.style.width=board.style.height='';if(matchMedia('(orientation:portrait)').matches)return;const r=bw.getBoundingClientRect();if(!r.width||!r.height)return;const w=Math.min(r.width,r.height*600/340);board.style.width=Math.floor(w)+'px';board.style.height=Math.floor(w*340/600)+'px'}
 const onRs=()=>{if(!live())return removeEventListener('resize',onRs);fitBoard();mTop()};addEventListener('resize',onRs);
 let ro=null;try{ro=new ResizeObserver(()=>{if(!live()){ro.disconnect();return}fitBoard()});ro.observe(bw)}catch(e){}
 const L=()=>FLV[FX.diff]||FLV.mid;
 const DL=()=>FS.list;
 function frame(){const s=SITES[FS.site],u=uid('f');return `<defs><linearGradient id="${u}sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.deep[0]}"/><stop offset="1" stop-color="${s.deep[1]}"/></linearGradient><pattern id="${u}pat" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="5" cy="6" r="2" fill="#5E4232" opacity=".3"/><circle cx="15" cy="16" r="1.6" fill="#FFF0D0" opacity=".4"/></pattern></defs><rect width="600" height="340" rx="22" fill="url(#${u}sb)"/><rect width="600" height="340" rx="22" fill="url(#${u}pat)"/>`}
 function dots(n){$('#f26dots').innerHTML=Array.from({length:n},()=>'<i></i>').join('')}
 function setCount(n){$('#f26cn').textContent=n;[...$('#f26dots').children].forEach((x,j)=>x.classList.toggle('on',j<n))}
 function startDig(){hush();const site=FX.site,k=chooseDino(site),d=DINO[k];P.fs=site;SV2();calm=RMo();root.classList.toggle('calm',calm);root.classList.add('digging');root.classList.remove('building');fitBoard();
  const bk=k==='ammo'?null:pick(site==='beach'?['b_ammo','b_fish','b_shell','b_trilo']:site==='forest'?['b_leaf','b_trilo','b_ammo','b_fish']:['b_ammo','b_fish','b_trilo','b_shell','b_leaf']);
  const list=d.parts.concat(bk?[{bonus:1,v:bk,n:BONUS[bk].n,g:BONUS[bk].g}]:[]);
  const n=list.length,cols=3,rows=Math.ceil(n/cols),cl=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)cl.push([c,r]);const cs=shuffle(cl);
  FS={k,site,list,phase:'dig',found:[],placed:[],idle:0,miss:{},fast:0,lastWarn:0,hits:0,lastHit:0,
   pos:list.map((p,i)=>{const [c,r]=cs[i];return {x:(c+.5)*600/cols+(Math.random()-.5)*20,y:(r+.5)*340/rows+(Math.random()-.5)*14,s:(p.vb?.5:1)*(n<=6?.62:.5),rot:Math.round((Math.random()-.5)*30)}})};
  sv.innerHTML=frame()+list.map((p,i)=>`<g id="f26b${i}" transform="translate(${FS.pos[i].x} ${FS.pos[i].y}) rotate(${FS.pos[i].rot}) scale(${FS.pos[i].s})">${pg(p)}</g>`).join('');
  FS.rad=list.map((p,i)=>{try{const bb=document.getElementById('f26b'+i).getBBox();return Math.max(bb.width,bb.height)/2*FS.pos[i].s*.72}catch(e){return 36}});
  paintSand();cv.style.display='block';setCount(0);dots(list.length);tray.innerHTML='';$('#f26cl').textContent='找到化石';setTool('shovel');
  tell(TP['f_in_'+site])}
 function paintSand(){const s=SITES[FS.site];cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;cx.clearRect(0,0,600,340);const g=cx.createLinearGradient(0,0,0,340);g.addColorStop(0,s.sand[0]);g.addColorStop(1,s.sand[1]);cx.fillStyle=g;cx.beginPath();if(cx.roundRect)cx.roundRect(0,0,600,340,22);else cx.rect(0,0,600,340);cx.fill();
  for(let i=0;i<500;i++){cx.fillStyle=s.dots[i%3];cx.globalAlpha=.5;cx.beginPath();cx.arc(Math.random()*600,Math.random()*340,Math.random()*2+.6,0,7);cx.fill()}
  cx.globalAlpha=.35;cx.strokeStyle=s.line;cx.lineWidth=2;for(let y=30;y<340;y+=36){cx.beginPath();cx.moveTo(10,y);for(let x=10;x<=590;x+=30)cx.quadraticCurveTo(x+15,y+(x%60?6:-6),x+30,y);cx.stroke()}
  // 各挖掘地的小東西：海邊＝小貝殼、森林＝小葉子、恐龍谷＝小石頭
  for(let i=0;i<9;i++){const x=30+Math.random()*540,y=20+Math.random()*300;cx.globalAlpha=.75;
   if(FS.site==='beach'){cx.fillStyle=i%2?'#FFD0DC':'#FFFFFF';cx.beginPath();cx.moveTo(x,y+6);cx.lineTo(x-6,y-2);cx.quadraticCurveTo(x,y-8,x+6,y-2);cx.closePath();cx.fill()}
   else if(FS.site==='forest'){cx.fillStyle=i%2?'#7FA05A':'#9AC070';cx.beginPath();cx.ellipse(x,y,7,3.4,i,0,7);cx.fill()}
   else{cx.fillStyle=i%2?'#D2A870':'#C49460';cx.beginPath();cx.ellipse(x,y,5,3.4,i,0,7);cx.fill()}}
  cx.globalAlpha=1}
 function brushAt(px,py,fast){const r=L().brush,stg=fast?.18:.9;cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='destination-out';const g=cx.createRadialGradient(px,py,r*.3,px,py,r);g.addColorStop(0,`rgba(0,0,0,${stg})`);g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.beginPath();cx.arc(px,py,r,0,7);cx.fill();cx.restore();
  if(!calm){cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.fillStyle=SITES[FS.site].sand[1];for(let i=0;i<3;i++){cx.globalAlpha=.6;cx.beginPath();cx.arc(px+(Math.random()-.5)*r*2.4,py+(Math.random()-.5)*r*2.4,1.6,0,7);cx.fill()}cx.restore()}}
 // 小鏟子：一下挖掉一大片；碰到化石就停（化石只能用刷子刷出來）
 function scoop(px,py){if(!FS||FS.phase!=='dig')return;let dm=1e9;DL().forEach((p,i)=>{if(FS.found.includes(i))return;const Q=FS.pos[i];const d=Math.hypot(px-Q.x,py-Q.y)-FS.rad[i];if(d<dm)dm=d});
  const rad=Math.min(L().shovel,dm);
  if(rad<16){const now=performance.now();if(now-FS.lastHit<600)return;FS.lastHit=now;FS.hits++;tone(1568,0,.12,'triangle',.07);tone(2093,.06,.1,'triangle',.05);
   const bb=$('#p23tools .p23tool[data-t="brush"]');if(bb){bb.classList.remove('want');void bb.offsetWidth;bb.classList.add('want')}
   if(FS.hits>=2&&tool==='shovel'){setTool('brush')}tell(TP.f_hit);return}
  cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='destination-out';const g=cx.createRadialGradient(px,py,rad*.55,px,py,rad);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.beginPath();cx.arc(px,py,rad,0,7);cx.fill();cx.restore();
  tone(180+Math.random()*60,0,.08,'triangle',.05);FS.idle=0;
  if(!calm){cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.fillStyle=SITES[FS.site].sand[1];for(let i=0;i<8;i++){const a=Math.random()*7,rr=rad*(1+Math.random()*.25);cx.globalAlpha=.7;cx.beginPath();cx.arc(px+Math.cos(a)*rr,py+Math.sin(a)*rr,2+Math.random()*2,0,7);cx.fill()}cx.restore()}}
 function checkFound(){if(!FS||FS.phase!=='dig')return;const list=DL();let img;try{img=cx.getImageData(0,0,cv.width,cv.height).data}catch(e){return}
  list.forEach((p,i)=>{if(FS.found.includes(i)||FS.phase!=='dig')return;const el=document.getElementById('f26b'+i);if(!el)return;let bb;try{bb=el.getBBox()}catch(e){return}const Q=FS.pos[i];
   let tot=0,clr=0;const ang=Q.rot*Math.PI/180;
   for(let a=0;a<9;a++)for(let b=0;b<7;b++){const lx=bb.x+bb.width*(a+.5)/9,ly=bb.y+bb.height*(b+.5)/7,sx=Q.x+Q.s*(lx*Math.cos(ang)-ly*Math.sin(ang)),sy=Q.y+Q.s*(lx*Math.sin(ang)+ly*Math.cos(ang));
    const X=Math.round(sx*SK),Y=Math.round(sy*SK);if(X<0||Y<0||X>=cv.width||Y>=cv.height)continue;tot++;if(img[(Y*cv.width+X)*4+3]<90)clr++}
   if(tot&&clr/tot>.58)found(i)})}
 const bline=v=>T26[v]||TP[v]||'';
 function found(i){const list=DL(),p=list[i];if(FS.found.includes(i))return;FS.found.push(i);FS.idle=0;const n=FS.found.length,Q=FS.pos[i];
  cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='destination-out';cx.beginPath();cx.arc(Q.x,Q.y,70*Q.s/.62,0,7);cx.fill();cx.restore();
  const el=document.getElementById('f26b'+i);if(el)el.insertAdjacentHTML('afterbegin',`<circle r="${p.vb?140:70}" fill="#FFF3B0" opacity=".5"/>`);$$('#f26sv .f26hint').forEach(x=>x.remove());cv.classList.remove('hinting');
  setCount(n);sfx(p.bonus?'gem':'right');
  const t=document.createElement('div');t.className='f26bn'+(p.bonus?' bonus':'')+(calm?'':' pop');t.dataset.i=i;t.innerHTML=`<svg viewBox="${VBp(p)}" aria-hidden="true">${pg(p)}</svg>${p.bonus?'<b>寶物</b>':''}`;t.setAttribute('aria-label',p.n);tray.appendChild(t);
  const left=list.length-n;
  if(!left){const a=T26['a_'+FS.k]||TP['a_'+FS.k];tell(a);later(startBuild,calm?2200:3000);return}
  if(n===1&&tool==='shovel')setTool('brush');
  if(p.bonus)tell(`${bline(p.v)} 還有 ${left} 塊。`,[bline(p.v),T26['l'+left]]);
  else tell(`找到第${CN(n)}塊化石，${p.n}！還有 ${left} 塊。`,[T26['k'+n],T26[p.v]||TP[p.v],T26['l'+left]])}
 let drawing=false,lastP=null,lastT=0,ct=0,lastS=null;
 const toB=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)/r.width*600,(e.clientY-r.top)/r.height*340]};
 cv.addEventListener('pointerdown',e=>{if(!FS||FS.phase!=='dig')return;e.preventDefault();drawing=true;try{cv.setPointerCapture(e.pointerId)}catch(_){}lastP=toB(e);lastT=performance.now();FS.idle=0;
  if(tool==='shovel'){lastS=lastP;scoop(...lastP);if(!ct)ct=setTimeout(()=>{ct=0;if(live())checkFound()},120)}else brushAt(...lastP)});
 cv.addEventListener('pointermove',e=>{if(!drawing||!FS||FS.phase!=='dig')return;const p=toB(e),now=performance.now();
  if(tool==='shovel'){if(Math.hypot(p[0]-lastS[0],p[1]-lastS[1])>30){lastS=p;scoop(...p)}lastP=p;FS.idle=0;return}
  const dt=Math.max(8,now-lastT);const dx=p[0]-lastP[0],dy=p[1]-lastP[1],dist=Math.hypot(dx,dy),spd=dist/dt*1000;lastT=now;
  const fast=spd>900;FS.fast=fast?FS.fast+dt:Math.max(0,FS.fast-dt*2);
  if(FS.fast>500&&now-FS.lastWarn>6000){FS.lastWarn=now;tell(T26.f_slow)}
  const stp=Math.max(1,dist/8);for(let i=1;i<=stp;i++)brushAt(lastP[0]+dx*i/stp,lastP[1]+dy*i/stp,fast);lastP=p;FS.idle=0;if(!ct)ct=setTimeout(()=>{ct=0;if(live())checkFound()},120)});
 const endB=()=>{if(drawing){drawing=false;if(live())checkFound()}};cv.addEventListener('pointerup',endB);cv.addEventListener('pointercancel',endB);
 const iv=setInterval(()=>{if(!live()){clearInterval(iv);return}if(!FS||FS.phase!=='dig'||drawing||document.hidden||$('.overlay'))return;FS.idle++;
  if(FS.idle>=8){FS.idle=0;const left=DL().map((p,i)=>i).filter(i=>!FS.found.includes(i));if(left.length){const Q=FS.pos[left[0]];$$('#f26sv .f26hint').forEach(x=>x.remove());
   sv.insertAdjacentHTML('beforeend',`<g class="f26hint" transform="translate(${Q.x} ${Q.y})"><circle r="34" fill="none" stroke="#FFF3B0" stroke-width="6" class="f26glow"/></g>`);cv.classList.add('hinting');tell(T26.f_idle)}}},1000);
 // ── 拼回去（寶物不用拼）
 function startBuild(){if(!FS||FS.phase!=='dig')return;const d=DINO[FS.k];FS.phase='build';cv.style.display='none';root.classList.remove('digging');root.classList.add('building');
  sv.innerHTML=frame()+`<path d="${d.sil}" fill="#FFF4E0" opacity=".16"/>`+(d.sea?'':`<path d="M0 300 H600" stroke="#5E4232" stroke-width="3" opacity=".45"/>`)+
   d.parts.map((p,i)=>`<g id="f26s${i}" opacity="${L().outline?.42:0}" transform="translate(${p.x} ${p.y})" style="filter:grayscale(1) brightness(.5)">${pg(p)}</g>`).join('')+`<g>${d.parts.map((p,i)=>({i,z:p.z||0})).sort((a,b)=>a.z-b.z).map(o=>`<g id="f26p${o.i}"></g>`).join('')}</g><g id="f26glow"></g>`;
  $('#f26cl').textContent='拼好了';dots(d.parts.length);setCount(0);
  [...tray.children].sort((a,b)=>a.classList.contains('bonus')-b.classList.contains('bonus')||Math.random()-.5).forEach(x=>{x.classList.remove('pop');tray.appendChild(x)});
  tell(L().outline?T26.f_build:T26.f_build2)}
 let drag=null;
 tray.addEventListener('pointerdown',e=>{const t=e.target.closest('.f26bn');if(!t||t.classList.contains('bonus')||t.classList.contains('used')||!FS||FS.phase!=='build')return;e.preventDefault();
  const i=+t.dataset.i,p=DINO[FS.k].parts[i];const el=document.createElement('div');el.className='f26drag';const sc=sv.getBoundingClientRect().width/600,vw=+VBp(p).split(' ')[2];
  el.style.width=el.style.height=Math.max(60,vw*sc)+'px';el.innerHTML=`<svg viewBox="${VBp(p)}" width="100%" height="100%" aria-hidden="true">${pg(p)}</svg>`;document.body.appendChild(el);
  drag={i,el,t,id:e.pointerId};try{tray.setPointerCapture(e.pointerId)}catch(_){}mv(e);t.style.opacity=.3});
 const mv=e=>{if(!drag||e.pointerId!==drag.id)return;drag.el.style.left=e.clientX+'px';drag.el.style.top=e.clientY+'px'};
 tray.addEventListener('pointermove',mv);
 const drop=e=>{if(!drag||e.pointerId!==drag.id)return;const {i,el,t}=drag;drag=null;el.remove();if(!live()||!FS||FS.phase!=='build')return;const d=DINO[FS.k],p=d.parts[i],r=sv.getBoundingClientRect();
  const bx=(e.clientX-r.left)/r.width*600,by=(e.clientY-r.top)/r.height*340,dist=Math.hypot(bx-p.x,by-p.y);
  if(e.type==='pointerup'&&dist<L().tol){t.classList.add('used');t.style.opacity='';$('#f26p'+i).innerHTML=`<g transform="translate(${p.x} ${p.y})">${pg(p)}</g>`;$('#f26s'+i).setAttribute('opacity',0);$('#f26glow').innerHTML='';
   FS.placed.push(i);const n=FS.placed.length;setCount(n);sfx('pop');
   if(n===d.parts.length){tell(T26.f_okall);FS.phase='done';later(done,1400)}else tell(T26[['f_ok1','f_ok2','f_ok3'][n%3]])}
  else{t.style.opacity='';if(e.type!=='pointerup')return;FS.miss[i]=(FS.miss[i]||0)+1;sfx('hint');
   if(FS.miss[i]>=2||!L().outline){$('#f26glow').innerHTML=`<g transform="translate(${p.x} ${p.y})" class="f26glow"><circle r="46" fill="#FFF3B0" opacity=".55"/></g>`;tell(`${p.n}放在這裡，發亮的地方！`,[T26.f_here])}
   else tell(`再試試看，${p.n}要放哪裡呢？`,[T26.f_try])}};
 tray.addEventListener('pointerup',drop);tray.addEventListener('pointercancel',drop);
 // 拼好：數一數（寶物也算一塊）→ 塗顏色 → 博物館
 function done(){const k=FS.k,d=DINO[k],n=DL().length;FS.phase='end';
  const pic=`<svg viewBox="0 0 600 340" aria-hidden="true"><path d="${d.sil}" fill="${d.body}" opacity=".9"/>${d.parts.slice().sort((a,b)=>(a.z||0)-(b.z||0)).map(p=>`<g transform="translate(${p.x} ${p.y})" opacity=".6">${pg(p)}</g>`).join('')}</svg>`;
  const opts=shuffle([n-1,n,n+1]);let first=true,paid=0;
  const ov=overlay(screen,`<div class="card f26end"><div class="f26pic">${pic}</div><div class="f26er"><h2>${DNAME(k)}拼好了！</h2><p id="f26q">數一數，我們找到了幾塊化石？</p>
   <div class="f26row" id="f26row" aria-hidden="true">${DL().map((p,i)=>`<span class="f26ri${p.bonus?' bonus':''}"><svg viewBox="${VBp(p)}">${pg(p)}</svg><i>${i+1}</i></span>`).join('')}</div>
   <div class="f26nums" id="f26nums">${opts.map((v,j)=>`<button style="--c:${['#FF7FB8','#4FC0C0','#A98BF0'][j]}" data-v="${v}">${v}</button>`).join('')}</div>
   <p class="small" id="f26got"></p><div class="p23cgo" id="p23cgo" style="display:none"><button class="btn p23gold" id="p23paint">${TP.c_go}</button><button class="btn2 small" id="p23skip">${TP.c_skip}</button></div></div></div>`);
  ov.classList.add('r26ov');const nums=$('#f26nums',ov);
  sayR([T26['q_'+k]||TP['q_'+k]]);
  const cnt=()=>{const a=[];for(let i=1;i<=n;i++)a.push(String(i));return a};
  nums.onclick=e=>{const b=e.target.closest('button');if(!b||paid)return;const v=+b.dataset.v;
   if(v===n){if(first)try{markN(n,true)}catch(_){}first=false;paid=1;sfx('right');[...nums.children].forEach(x=>x.classList.toggle('dim',x!==b));b.classList.add('win');
    const g=gems('f26Day');try{confetti()}catch(_){}$('#f26q',ov).textContent=`對！${cnt().join('、')}，一共找到 ${n} 塊化石！`;$('#f26row',ov).classList.add('cnt');$('#f26got',ov).textContent=`得到 ${g} 顆寶石！`;
    $('#p23cgo',ov).style.display='';sayR([T26.yes,...cnt(),T26['c'+n],g===3?T26.gem3:T26.gem1])}
   else{if(first){try{markN(n,false)}catch(_){}first=false}sfx('hint');$('#f26q',ov).textContent=`我們一起數一數：${cnt().join('、')}。`;$('#f26row',ov).classList.add('cnt');sayR([T26.count,...cnt()])}};
  const toMus=(e)=>{const P=ST();const o=P.fm[k]||{};o.n=(o.n||0)+1;o.t=Date.now();o.s=FS.site;if(e){o.c=e.c;o.p=e.p||''}P.fm[k]=o;P.fl=k;SV2();
   const first1=Object.keys(P.fm).length===1&&o.n===1;
   openMuseum({hl:k,first:first1,onClose:()=>{if(live())endCard(k)}})};
  $('#p23paint',ov).onclick=()=>{sfx('pop');hush();ov.remove();openPaint(k,{},e=>toMus(e))};
  $('#p23skip',ov).onclick=()=>{sfx('pop');hush();ov.remove();toMus(null)}}
 function endCard(k){const e=ST().fm[k]||{};const ov=overlay(screen,`<div class="card f26end p23end"><div class="f26pic">${dinoSVG(k,e)}</div><div class="f26er"><h2>${DNAME(k)}${TP.m_in.replace(/！$/,'')}！</h2>
   <div class="row"><button class="btn" id="f26re">再玩一次</button><button class="btn2" id="f26out">回遊樂園</button></div><button class="btn2 small" id="f26chg">${TP.e_site}</button></div></div>`);
  ov.classList.add('r26ov');
  $('#f26re',ov).onclick=()=>{ov.remove();sfx('pop');startDig()};
  $('#f26chg',ov).onclick=()=>{ov.remove();sfx('pop');FS=null;showMenu()};
  $('#f26out',ov).onclick=()=>{ov.remove();fTok++;hush();go('park')}}
 fitBoard();showMenu();
 {const fr=['fs_beach','fs_tri'].filter(id=>gHas(id)&&gFresh(id));if(fr.length){const t=fr.map(id=>TP['g_'+id]).join('');sayEl.textContent=t;curSay=fr.map(id=>TP['g_'+id]);hush();sayR(curSay)}}
 try{const V=window.__v22vis;if(V&&typeof V.addBg==='function'){V.addBg('fossil26');requestAnimationFrame(()=>{if(live())V.addBg('fossil26')});setTimeout(()=>{if(live())V.addBg('fossil26')},400)}}catch(e){}
 ['fs_beach','fs_tri'].forEach(gSeen);
 window.__P23=Object.assign(window.__P23||{},{f:{start:(k,site)=>{if(site)FX.site=site;menu.style.display='none';chooseDinoOverride=k||null;try{startDig()}finally{chooseDinoOverride=null}return FS},S:()=>FS,scoop:(x,y)=>scoop(x,y),brush:(x,y)=>brushAt(x,y),check:()=>checkFound(),found:i=>found(i),build:()=>startBuild(),tool:t=>setTool(t),
  place:i=>{const p=DINO[FS.k].parts[i],t=tray.querySelector(`.f26bn[data-i="${i}"]`);if(!p)return false;const r=sv.getBoundingClientRect();if(!t)return false;const tr=t.getBoundingClientRect();
   const ev=(type,x,y)=>new PointerEvent(type,{bubbles:true,clientX:x,clientY:y,pointerId:7,button:0,buttons:type==='pointerup'?0:1});
   t.dispatchEvent(ev('pointerdown',tr.left+tr.width/2,tr.top+tr.height/2));const X=r.left+p.x/600*r.width,Y=r.top+p.y/340*r.height;tray.dispatchEvent(ev('pointermove',X,Y));tray.dispatchEvent(ev('pointerup',X,Y));return true},
  parts:()=>DINO[FS.k].parts.length,all:()=>DL().length}});
};
let chooseDinoOverride=null;
{const _cd=chooseDino;chooseDino=function(site){if(chooseDinoOverride)return chooseDinoOverride;return _cd(site)}}
/* ---------- 塗顏色 ---------- */
const PAL=['#FF8FB8','#FF7A7A','#FFB35C','#FFE066','#8EDB7A','#5FC8A8','#7FC4FF','#6A8AF0','#B99CFF','#C99A6A','#FFFFFF','#8A8AA8'];
function openPaint(k,o,cb){const d=DINO[k];const n=NREG(d);const c=(o.c||[]).slice();let col=PAL[0],mode='tap',drew=false;const calm=RMo();
 const host=document.getElementById('screen')||document.body;
 const ov=overlay(host,`<div class="card p23paint"><h2>${TP.c_go.replace('恐龍',DNAME(k))}</h2>
  <div class="p23pbody"><div class="p23pv" id="p23pv"><svg viewBox="0 0 600 340" id="p23psv" aria-hidden="true"></svg><canvas id="p23pc" width="1200" height="680"></canvas></div>
  <div class="p23pside"><div class="p23pal" id="p23pal">${PAL.map((x,i)=>`<button style="--c:${x}" data-c="${x}" aria-label="顏色 ${i+1}"${i?'':' class="sel"'}></button>`).join('')}</div>
  <div class="p23pm"><button class="p23mode sel" data-m="tap">${TP.c_tap}</button><button class="p23mode" data-m="draw">${TP.c_draw}</button><button class="p23mode" id="p23pclr">${TP.c_clear}</button></div></div></div>
  <div class="row"><button class="btn p23gold" id="p23pdone">${TP.c_done}</button></div></div>`);
 ov.classList.add('p23ov');
 const svg=$('#p23psv',ov),cvs=$('#p23pc',ov),g=cvs.getContext('2d');let clip=null;try{clip=new Path2D(d.sil)}catch(e){}
 const draw=()=>{svg.innerHTML=dinoPaint(k,c.length?c:null,null,{blank:true})};draw();
 if(o.p){const im=new Image();im.onload=()=>{g.drawImage(im,0,0,1200,680);drew=true};im.src=o.p}
 const say1=t=>{try{hush()}catch(e){}sayR([t])};
 sayR([TP.c_hi]);
 $('#p23pal',ov).onclick=e=>{const b=e.target.closest('button');if(!b)return;col=b.dataset.c;$$('#p23pal button',ov).forEach(x=>x.classList.toggle('sel',x===b));sfx('pop')};
 $$('.p23mode[data-m]',ov).forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('.p23mode[data-m]',ov).forEach(x=>x.classList.toggle('sel',x===b));cvs.classList.toggle('on',mode==='draw');sfx('pop');if(mode==='draw')say1(TP.c_finger)});
 $('#p23pclr',ov).onclick=()=>{c.length=0;g.clearRect(0,0,1200,680);drew=false;draw();sfx('pop')};
 svg.addEventListener('pointerdown',e=>{if(mode!=='tap')return;const r=e.target.closest&&e.target.closest('.p23reg');if(!r)return;e.preventDefault();const i=+r.dataset.r;
  for(let j=0;j<n;j++)if(c[j]==null)c[j]='#FFFFFF';c[i]=col;r.setAttribute('fill',col);tone(660+i*40,0,.1,'triangle',.06)});
 let dn=false,lp=null;const toC=e=>{const r=cvs.getBoundingClientRect();return [(e.clientX-r.left)/r.width*600,(e.clientY-r.top)/r.height*340]};
 const stroke=(a,b)=>{g.save();g.setTransform(2,0,0,2,0,0);if(clip)g.clip(clip);g.strokeStyle=col;g.lineWidth=18;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();g.restore();drew=true};
 cvs.addEventListener('pointerdown',e=>{if(mode!=='draw')return;e.preventDefault();dn=true;try{cvs.setPointerCapture(e.pointerId)}catch(_){}lp=toC(e);stroke(lp,[lp[0]+.1,lp[1]+.1])});
 cvs.addEventListener('pointermove',e=>{if(!dn)return;const p=toC(e);stroke(lp,p);lp=p});
 const up=()=>{dn=false};cvs.addEventListener('pointerup',up);cvs.addEventListener('pointercancel',up);
 $('#p23pdone',ov).onclick=()=>{sfx('pop');let p='';if(drew){try{const t=document.createElement('canvas');t.width=300;t.height=170;t.getContext('2d').drawImage(cvs,0,0,300,170);p=t.toDataURL('image/png')}catch(e){}}
  ov.remove();sayR([TP.c_nice]);cb&&cb({c:c.length?c.slice(0,n):null,p})};
 if(window.__P23)window.__P23.paint={ov,tap:(i,cc)=>{if(cc)col=cc;const r=svg.querySelector(`.p23reg[data-r="${i}"]`);if(!r)return false;r.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:0,clientY:0}));return true},
  draw:(pts,cc)=>{if(cc)col=cc;for(let i=1;i<pts.length;i++)stroke(pts[i-1],pts[i])}};
 return ov}
/* ---------- 我的恐龍博物館 ---------- */
function museumList(){const fm=ST().fm;return DORD.filter(k=>!DGIFT[k]||gHas(DGIFT[k])||fm[k])}
function openMuseum(o){o=o||{};const host=document.getElementById('screen')||document.body;const fm=ST().fm;const list=museumList();const got=list.filter(k=>fm[k]).length;
 const ov=overlay(host,`<div class="card p23mus"><div class="p23mh"><span class="p23mi">${ico('museum')}</span><div><h2>${TP.m_title}</h2><small>收集了 ${got}／${list.length} 種</small></div></div>
  <div class="p23mg" id="p23mg">${list.map(k=>{const e=fm[k];return `<button class="p23ms${e?' got':''}${o.hl===k?' hl':''}" data-k="${k}" aria-label="${e?DNAME(k):TP.m_what}"><span class="p23mp">${e?dinoSVG(k,e):dinoSil(k)}</span><b>${e?DNAME(k):'？'}</b>${o.hl===k?`<i class="p23new">${TP.m_new}</i>`:''}</button>`}).join('')}</div>
  <div class="p23md" id="p23md" hidden></div>
  <div class="row"><button class="btn2" id="p23mclose">${TP.m_close}</button></div></div>`);
 ov.classList.add('p23ov');
 const md=$('#p23md',ov),mg=$('#p23mg',ov);
 if(o.hl){sayR([TP.m_in]);const t=o.first?TP.m_room:'';if(t)setTimeout(()=>{try{toast(t)}catch(e){}},600)}else sayR([TP.m_hi]);
 mg.onclick=e=>{const b=e.target.closest('.p23ms');if(!b)return;const k=b.dataset.k;sfx('pop');hush();
  if(!fm[k]){sayR([TP.m_what]);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
  md.hidden=false;mg.hidden=true;md.innerHTML=`<div class="p23mbig">${dinoSVG(k,fm[k])}</div><h3>${DNAME(k)}</h3><p>${TP['x_'+k]||''}</p><div class="p23mdb"><button class="btn2 small" id="p23rp">${TP.m_paint}</button><button class="btn2 small" id="p23bk">${TP.m_title}</button></div>`;
  sayR([TP['x_'+k]]);
  $('#p23bk',ov).onclick=()=>{sfx('pop');md.hidden=true;mg.hidden=false};
  $('#p23rp',ov).onclick=()=>{sfx('pop');hush();ov.style.display='none';openPaint(k,{c:fm[k].c,p:fm[k].p},r=>{const P=ST();P.fm[k].c=r.c;P.fm[k].p=r.p||'';SV2();ov.remove();openMuseum({onClose:o.onClose})})}};
 $('#p23mclose',ov).onclick=()=>{sfx('pop');hush();ov.remove();o.onClose&&o.onClose()};
 return ov}

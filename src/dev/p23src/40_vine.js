/* =====================================================================
 * 雨林盪藤蔓（新版）：路線每次不同、岔路自己選、動物朋友貼紙簿、撿花和葉子佈置小樹屋、開心的終點
 * 照順序接香蕉照舊（簡單 1～10、中等 10～100、高難度 2～20＋看時機）；不倒數、不會掉下去
 * ===================================================================== */
const VDN={easy:'簡單',mid:'中等',hard:'高難度'};
const MKY=()=>{try{return CH36.monkey.f()}catch(e){return ''}};
const BAN=()=>`<path d="M14 20 Q20 52 52 46 Q56 44 52 40 Q28 40 22 16 Q18 12 14 20Z" fill="#FFD84D"/><path d="M18 22 Q24 44 48 43" stroke="#FFF2A8" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M14 20 L12 14" stroke="#7A5A2A" stroke-width="3" stroke-linecap="round"/>`;
function vSeq(diff){if(diff==='easy')return {step:1,start:1,rule:'v_r1'};if(diff==='mid')return {step:10,start:10,rule:'v_r10'};return S.chDone>=37?{step:2,start:2,rule:'v_r2'}:{step:10,start:10,rule:'v_r10'}}
function vChoices(diff,want,step){if(diff==='easy')return [want];const o=new Set([want]);const cand=(step===10?[want+10,want+20,want-10,want+5]:[want+2,want-2,want+4,want+1]).filter(v=>v>0&&v!==want);
 for(const c of shuffle(cand)){if(o.size>=3)break;o.add(c)}return shuffle([...o])}
const T6=()=>{try{return (window.__V6&&__V6.T)||{}}catch(e){return {}}};
const aOpen=k=>!AGIFT[k]||gHas(AGIFT[k]);
let vTok=0,VX={diff:null,dest:'house'},G=null;
SCREENS.vine6=function(){const tok=++vTok;const live=()=>tok===vTok&&S.screen==='vine6';const calm=RMo();const T=T6();const P=ST();
 if(!VX.diff)VX.diff=VDN[S.diff]?S.diff:'mid';if(VX.dest==='falls'&&!gHas('vn_falls'))VX.dest='house';
 let bg='';try{bg=(window.BG36&&BG36.rainforest36)?BG36.rainforest36(800,450):''}catch(e){}
 const falls=gHas('vn_falls');
 screen.innerHTML=`<div class="dball vn6 p23v${calm?' calm':''}"><div class="phead"><button class="btn2 small p88back" id="pback">回遊樂園</button><h2 class="gtitle">雨林盪藤蔓</h2><span class="phsp"></span></div>
  <div class="vn6stage" id="vn6st"><svg class="vn6bg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg}</svg><svg class="vn6bg p23zd" id="p23zd" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true"></svg>
   <p class="vn6bub" id="vn6bub"></p><div class="p23gr" id="p23gr"></div><div class="vn6vines" id="vn6v"></div><div class="vn6mk" id="vn6mk" style="left:14%;top:46%"><svg viewBox="0 0 100 100" aria-hidden="true">${MKY()}</svg></div><div class="p23fork" id="p23fork" hidden></div></div>
  <div class="p23hud"><div class="vn6got" id="vn6got"></div><div class="p23cnt"><span class="p23cc" id="p23cf" aria-label="${TP.v_friends}"></span><span class="p23cc" id="p23ci" aria-label="${TP.v_flowers}"></span></div></div>
  <div class="ch5menu vn6menu" id="vn6menu"><div class="ch5mc">
   <div class="ch5mh"><span class="ch5mi">${art('i:vine6')}</span><div><b>雨林盪藤蔓</b><small>照順序接香蕉，認識雨林的朋友！</small></div></div>
   <div class="ch5lab">難度</div><div class="ch5row" id="vn6diffs"><button class="ch5opt" data-v="easy"><b>簡單</b><small>1、2、3…</small></button><button class="ch5opt" data-v="mid"><b>中等</b><small>10、20、30…</small></button><button class="ch5opt" data-v="hard"><b>高難度</b><small>${S.chDone>=37?'2、4、6，':''}看時機</small></button></div>
   <div class="ch5lab">${TP.v_to}</div><div class="ch5row" id="p23dest"><button class="ch5opt p23dopt" data-v="house"><span class="p23dp">${ico('house')}</span><b>${TP.v_dest_house}</b></button>${falls?`<button class="ch5opt p23dopt" data-v="falls"><span class="p23dp">${gSvg('vn_falls')}</span><b>${TP.v_dest_falls}</b></button>`:''}</div>
   <div class="p23gorow"><button class="btn ch5go" id="vn6go">出發！</button>
   <div class="p23vbtn"><button class="btn2 small" id="p23book">${ico('book')}<span>${TP.v_book}</span></button><button class="btn2 small" id="p23house">${ico('house')}<span>${TP.v_house}</span></button></div></div></div></div></div>`;
 const bub=$('#vn6bub'),vv=$('#vn6v'),mk=$('#vn6mk'),got=$('#vn6got'),gr=$('#p23gr'),zd=$('#p23zd'),fk=$('#p23fork');let raf=0;
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const tell=(t,parts)=>{bub.textContent=t;return sayR(parts||[t])};
 $('#pback').onclick=()=>{vTok++;cancelAnimationFrame(raf);hush();go('park')};
 const sel=()=>{$$('#vn6diffs .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===VX.diff));$$('#p23dest .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===VX.dest))};sel();
 $$('#vn6diffs .ch5opt').forEach(b=>b.onclick=()=>{VX.diff=b.dataset.v;sel();sfx('pop');hush();sayR([T['d_'+VX.diff]])});
 $$('#p23dest .ch5opt').forEach(b=>b.onclick=()=>{VX.dest=b.dataset.v;sel();sfx('pop');hush();sayR([TP['v_dest_'+VX.dest]])});
 $('#vn6go').onclick=()=>{sfx('pop');hush();$('#vn6menu').style.display='none';start()};
 $('#p23book').onclick=()=>{sfx('pop');hush();openBook()};
 $('#p23house').onclick=()=>{sfx('pop');hush();openHouse()};
 {const fr=['vn_falls','vn_frog'].filter(id=>gHas(id)&&gFresh(id));if(fr.length)tell(fr.map(id=>TP['g_'+id]).join(''),fr.map(id=>TP['g_'+id]));else tell(TP.v_menu)}['vn_falls','vn_frog'].forEach(gSeen);
 const hud=()=>{$('#p23cf').innerHTML=`${ico('book')}<b>${G?G.friends.length:0}</b>`;$('#p23ci').innerHTML=`${itmSVG('f_pink')}<b>${G?G.items.length:0}</b>`};
 function start(){const sq=vSeq(VX.diff);cancelAnimationFrame(raf);
  const z0=gHas('vn_frog')&&!P.vs.frog?'creek':pick(ZONES);
  G={diff:VX.diff,step:sq.step,next:sq.start,n:0,total:10,miss:0,busy:false,timing:VX.diff==='hard'&&!calm,dest:VX.dest,zone:z0,seen:[z0],friends:[],items:[],frogDone:false};
  got.innerHTML=Array.from({length:G.total},()=>'<i></i>').join('');hud();
  mk.style.left='14%';mk.style.top='46%';setZone(z0,true);
  tell(T[sq.rule]||'',[TP['v_hi_'+G.dest],T[sq.rule],...(G.timing?[T.v_time]:[])]);round()}
 // 換一個地方：背景裝飾、一位動物朋友、兩樣花葉
 function setZone(z,first){G.zone=z;zd.innerHTML=zoneDeco(z);zd.classList.remove('in');void zd.getBoundingClientRect();zd.classList.add('in');
  gr.innerHTML='';const fr=pickFriend(z);const side=Math.random()<.5;const fx=side?30+Math.random()*8:66+Math.random()*16;
  if(fr){const b=document.createElement('button');b.className='p23fr';b.dataset.k=fr;b.style.left=fx+'%';b.setAttribute('aria-label',TP['nm_'+fr]);b.innerHTML=aniSVG(fr);b.onclick=()=>meet(b);gr.appendChild(b)}
  const xs=[];for(let i=0;i<2;i++){let x;let t=0;do{x=8+Math.random()*84;t++}while(t<30&&(Math.abs(x-fx)<12||Math.abs(x-14)<8||xs.some(q=>Math.abs(q-x)<12)));xs.push(x)}
  xs.forEach(x=>{const k=pick(IORD);const b=document.createElement('button');b.className='p23it';b.dataset.k=k;b.style.left=x+'%';b.setAttribute('aria-label',TP['it_'+k]);b.innerHTML=itmSVG(k);b.onclick=()=>pickUp(b);gr.appendChild(b)});
  if(!first)later(()=>{if(!G||G.n>=G.total)return;bub.textContent=TP['z_'+z]+'！'+TP.v_friend;sayR([TP['z_'+z]])},200)}
 function pickFriend(z){let pool=(ZFR[z]||AORD).filter(aOpen);if(gHas('vn_frog')&&!G.frogDone&&(G.seen.length===1||z==='creek'||z==='ferns'))return 'frog';
  let c=pool.filter(k=>!G.friends.includes(k)&&!P.vs[k]);if(!c.length)c=pool.filter(k=>!G.friends.includes(k));if(!c.length)c=pool;return c.length?pick(c):null}
 function meet(b){if(!G||!live())return;const k=b.dataset.k;hush();if(k==='frog')G.frogDone=true;
  const firstEver=!P.vs[k];if(!b.classList.contains('met')){P.vs[k]=(P.vs[k]||0)+1;SV2();if(!G.friends.includes(k))G.friends.push(k);hud();sfx('gem')}else sfx('pop');
  b.classList.remove('met');void b.offsetWidth;b.classList.add('met');
  const t=TP.v_hello+TP['a_'+k];bub.textContent=t;sayR([TP.v_hello,TP['a_'+k]]);if(firstEver){const lab=document.createElement('span');lab.className='p23lab st';lab.textContent=TP.v_sticker;lab.style.left=b.style.left;gr.appendChild(lab);later(()=>lab.remove(),2200)}}
 function pickUp(b){if(!G||!live()||b.classList.contains('got'))return;const k=b.dataset.k;b.classList.add('got');P.vb[k]=(P.vb[k]||0)+1;SV2();G.items.push(k);hud();
  tone(880,0,.1,'triangle',.08);tone(1175,.08,.12,'triangle',.07);const lab=document.createElement('span');lab.className='p23lab';lab.textContent='＋'+TP['it_'+k];lab.style.left=b.style.left;gr.appendChild(lab);
  later(()=>{b.remove();lab.remove()},calm?600:1100)}
 function round(){if(!live())return;G.miss=0;G.busy=false;const ch=vChoices(G.diff,G.next,G.step);const xs=ch.length===1?[58]:innerWidth<700?[40,63,86]:[46,66,86];
  vv.innerHTML=`<div class="vn6vine home" style="left:14%"><i class="vn6rope"></i></div>`+ch.map((v,i)=>`<button class="vn6vine c" data-v="${v}" style="left:${xs[i]}%;--ph:${(i*.25).toFixed(2)};--dl:${(i*.12).toFixed(2)}s" aria-label="香蕉 ${v}"><i class="vn6rope"></i><span class="vn6ban"><svg viewBox="0 0 64 64" aria-hidden="true">${BAN()}</svg><b>${v}</b></span></button>`).join('');
  $$('.vn6vine.c',vv).forEach(b=>b.onclick=()=>tap(b));if(G.timing)sway()}
 function sway(){cancelAnimationFrame(raf);const t0=performance.now();const step=t=>{if(!live()||!G)return;const ss=(t-t0)/1000;
   $$('.vn6vine.c',vv).forEach(b=>{if(b.dataset.lock)return;const ph=+getComputedStyle(b).getPropertyValue('--ph')||0;const amp=innerWidth<700?5:10;const a=amp*Math.sin(ss*1.6+ph);b.style.transform=`rotate(${a.toFixed(1)}deg)`;b.classList.toggle('near',a>amp*.35)});
   raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)}
 const pos=b=>{const R=$('#vn6st').getBoundingClientRect();const ban=$('.vn6ban',b).getBoundingClientRect();return {x:(ban.left+ban.width/2-R.left)/R.width*100,y:(ban.top-R.top)/R.height*100}};
 function tap(b){if(!G||G.busy||!live()||G.n>=G.total)return;hush();const v=+b.dataset.v;const p=pos(b);
  if(G.timing&&!b.classList.contains('near')){G.busy=true;swingTry(p,()=>{G.busy=false;tell(T.v_miss)});return}
  if(v!==G.next){G.busy=true;G.miss++;sfx('wrong');swingTry(p,()=>{G.busy=false;tell(T.v_oops);if(G.miss>=2){const ok=$$('.vn6vine.c',vv).find(x=>+x.dataset.v===G.next);if(ok){ok.classList.remove('hintglow');void ok.offsetWidth;ok.classList.add('hintglow')}}});return}
  G.busy=true;b.dataset.lock=1;b.style.transform='';sfx('pop');
  const mid={x:(parseFloat(mk.style.left)+p.x)/2,y:Math.max(8,Math.min(parseFloat(mk.style.top),p.y)-18)};
  mk.style.left=mid.x+'%';mk.style.top=mid.y+'%';mk.classList.add('swing');
  later(()=>{mk.style.left=(p.x-4)+'%';mk.style.top=(p.y-6)+'%'},calm?0:380);
  later(()=>{mk.classList.remove('swing');const bn=$('.vn6ban',b);if(bn)bn.classList.add('got');const cell=got.children[G.n];if(cell){cell.textContent=v;cell.classList.add('on')}
   tone(560+G.n*40,0,.14,'triangle',.08);try{burstEl(b,10)}catch(_){}sayR([String(v)]);G.n++;G.next+=G.step;
   if(G.n>=G.total){later(finish,700);return}
   later(()=>{$$('.vn6vine',vv).forEach(x=>{if(x!==b)x.classList.add('out')});mk.style.left='14%';mk.style.top='46%';b.style.left='14%';$('.vn6ban',b)&&$('.vn6ban',b).remove();b.classList.remove('c');b.classList.add('home')},calm?100:700);
   if(G.n===3||G.n===6)later(fork,calm?300:1300);else later(round,calm?250:1300)},calm?50:800)}
 function swingTry(p,done){const x0=parseFloat(mk.style.left),y0=parseFloat(mk.style.top);mk.style.left=(x0+(p.x-x0)*.4)+'%';mk.style.top=(y0-8)+'%';
  later(()=>{mk.style.left=x0+'%';mk.style.top=y0+'%';later(done,350)},calm?50:420)}
 // 岔路：兩個路牌，自己選
 function fork(){if(!live())return;cancelAnimationFrame(raf);vv.innerHTML='';let c=ZONES.filter(z=>!G.seen.includes(z));if(falls&&G.dest!=='falls'&&!G.seen.includes('falls'))c.push('falls');if(c.length<2)c=ZONES.filter(z=>z!==G.zone);
  const two=shuffle(c).slice(0,2);G.busy=true;
  fk.innerHTML=two.map((z,i)=>`<button class="p23sign ${i?'r':'l'}" data-z="${z}" aria-label="${TP['z_'+z]}"><span class="p23sp"><svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${zoneThumb(z)}</svg></span><b>${TP['z_'+z]}</b><i class="p23arw"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${i?'M10 20 H28 M20 11 L29 20 L20 29':'M30 20 H12 M20 11 L11 20 L20 29'}" stroke="#6A3A1A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></i></button>`).join('');
  fk.hidden=false;tell(TP.v_fork);
  $$('.p23sign',fk).forEach(b=>b.onclick=()=>{if(!G.busy)return;const z=b.dataset.z;sfx('pop');hush();fk.hidden=true;fk.innerHTML='';G.seen.push(z);
   mk.style.left=(b.classList.contains('r')?70:30)+'%';mk.style.top='30%';tell(TP.v_go);
   later(()=>{mk.style.left='14%';mk.style.top='46%';setZone(z);round()},calm?150:800)})}
 async function finish(){cancelAnimationFrame(raf);const n=gems('vine6Day');try{confetti()}catch(e){}vv.innerHTML='';gr.innerHTML='';
  zd.innerHTML=G.dest==='falls'?bigFalls():`<rect width="800" height="450" fill="#BFE8FF" opacity=".35"/><g transform="translate(150 20) scale(.64)">${treeHouse()}</g>`;
  const fr=G.friends.slice(0,5);gr.innerHTML=fr.map((k,i)=>`<span class="p23fr end" style="left:${(50+(i-(fr.length-1)/2)*15).toFixed(1)}%">${aniSVG(k)}</span>`).join('');
  mk.style.left='50%';mk.style.top=G.dest==='falls'?'40%':'34%';mk.classList.add('happy');
  const t=TP['v_arrive_'+G.dest];bub.textContent=t;await sayR([t,n>=3?T.gem3:T.gem1]);if(!live())return;await wait(calm?200:900);if(!live())return;mk.classList.remove('happy');endCard(n)}
 function endCard(n){const g=G;const ov=overlay(screen,`<div class="card p23vend"><h2>${TP.v_sum}</h2>
   <div class="p23sum"><div class="p23sr"><b>${TP.v_ban}</b><span class="p23si"><i class="p23ban"><svg viewBox="0 0 64 64">${BAN()}</svg></i><em>× ${g.total}</em></span></div>
   <div class="p23sr"><b>${TP.v_friends}</b><span class="p23si">${g.friends.length?g.friends.map(k=>`<i>${aniSVG(k)}</i>`).join(''):`<small>${TP.v_none}</small>`}</span></div>
   <div class="p23sr"><b>${TP.v_flowers}</b><span class="p23si">${g.items.length?g.items.map(k=>`<i>${itmSVG(k)}</i>`).join(''):`<small>${TP.v_none}</small>`}</span></div></div>
   <p class="small">得到 ${n} 顆寶石！</p>
   <div class="p23vb2"><button class="btn2 small" id="p23deco">${ico('house')}<span>${TP.v_deco}</span></button><button class="btn2 small" id="p23bk2">${ico('book')}<span>${TP.v_book}</span></button></div>
   <div class="row"><button class="btn" id="vn23again">再玩一次</button><button class="btn2" id="vn23out">回遊樂園</button></div></div>`);
  ov.classList.add('r26ov','p23ov');
  $('#vn23again',ov).onclick=()=>{sfx('pop');ov.remove();resetStage();$('#vn6menu').style.display='';tell(TP.v_menu)};
  $('#vn23out',ov).onclick=()=>{sfx('pop');ov.remove();vTok++;hush();go('park')};
  $('#p23deco',ov).onclick=()=>{sfx('pop');hush();ov.style.display='none';openHouse(()=>{if(ov.isConnected)ov.style.display=''})};
  $('#p23bk2',ov).onclick=()=>{sfx('pop');hush();ov.style.display='none';openBook(()=>{if(ov.isConnected)ov.style.display=''})}}
 function resetStage(){zd.innerHTML='';gr.innerHTML='';vv.innerHTML='';fk.hidden=true;mk.style.left='14%';mk.style.top='46%';G=null;hud()}
 hud();
 window.__P23=Object.assign(window.__P23||{},{v:{start:()=>{$('#vn6menu').style.display='none';start();return G},G:()=>G,
  tapNext:()=>{const b=$$('.vn6vine.c',vv).find(x=>+x.dataset.v===G.next&&!x.dataset.lock);if(!b)return false;if(G.timing)b.classList.add('near');b.click();return true},
  tapWrong:()=>{const b=$$('.vn6vine.c',vv).find(x=>+x.dataset.v!==G.next);if(!b)return false;if(G.timing)b.classList.add('near');b.click();return true},
  fork:i=>{const b=$$('.p23sign',fk)[i||0];if(!b)return false;b.click();return true},
  friend:()=>{const b=$('.p23fr',gr);if(!b)return false;b.click();return true},item:()=>{const b=$('.p23it:not(.got)',gr);if(!b)return false;b.click();return true}}});
};
/* ---------- 雨林貼紙簿 ---------- */
function openBook(onClose){const host=document.getElementById('screen')||document.body;const P=ST();const list=AORD.filter(k=>aOpen(k)||P.vs[k]);const got=list.filter(k=>P.vs[k]).length;
 const ov=overlay(host,`<div class="card p23book"><div class="p23mh"><span class="p23mi">${ico('book')}</span><div><h2>${TP.b_title}</h2><small>收集了 ${got}／${list.length} 張</small></div></div>
  <div class="p23bg" id="p23bg">${list.map(k=>`<button class="p23bs${P.vs[k]?' got':''}" data-k="${k}" aria-label="${P.vs[k]?TP['nm_'+k]:TP.b_what}"><span class="p23bp">${P.vs[k]?aniSVG(k):aniSil(k)}</span><b>${P.vs[k]?TP['nm_'+k]:'？'}</b></button>`).join('')}</div>
  <p class="p23bt" id="p23bt">${TP.b_hi}</p><div class="row"><button class="btn2" id="p23bclose">${TP.m_close}</button></div></div>`);
 ov.classList.add('p23ov');sayR([TP.b_hi]);
 $('#p23bg',ov).onclick=e=>{const b=e.target.closest('.p23bs');if(!b)return;const k=b.dataset.k;sfx('pop');hush();
  if(!P.vs[k]){$('#p23bt',ov).textContent=TP.b_what;sayR([TP.b_what]);return}
  $('#p23bt',ov).textContent=TP['a_'+k];sayR([TP['a_'+k]]);b.classList.remove('met');void b.offsetWidth;b.classList.add('met')};
 $('#p23bclose',ov).onclick=()=>{sfx('pop');hush();ov.remove();onClose&&onClose()};return ov}
/* ---------- 佈置小樹屋 ---------- */
function openHouse(onClose){const host=document.getElementById('screen')||document.body;const P=ST();let selK=null;
 const ov=overlay(host,`<div class="card p23house"><h2>${TP.h_title}</h2><div class="p23hv"><svg viewBox="0 0 800 500" id="p23hsv" aria-hidden="false"></svg></div>
  <p class="p23bt" id="p23ht"></p><div class="p23bag" id="p23bag"></div><div class="row"><button class="btn p23gold" id="p23hdone">${TP.h_done}</button></div></div>`);
 ov.classList.add('p23ov');const svg=$('#p23hsv',ov),bag=$('#p23bag',ov),ht=$('#p23ht',ov);
 const occ=()=>{const m={};P.th.forEach(([i,k])=>{m[i]=k});return m};
 function draw(){const m=occ();svg.innerHTML=treeHouse()+HSLOT.map(([x,y],i)=>m[i]?`<g class="p23hs full" data-i="${i}"><circle cx="${x}" cy="${y}" r="42" fill="#fff" opacity=".01"/><svg x="${x-44}" y="${y-44}" width="88" height="88" viewBox="0 0 64 64">${ITM[m[i]]?ITM[m[i]](uid('h')):''}</svg></g>`:`<g class="p23hs${selK?' on':''}" data-i="${i}"><circle cx="${x}" cy="${y}" r="30" fill="#fff" opacity=".35"/><circle cx="${x}" cy="${y}" r="30" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="8 7"/></g>`).join('');
  const ks=IORD.filter(k=>(P.vb[k]||0)>0);
  bag.innerHTML=ks.length?ks.map(k=>`<button class="p23bi${selK===k?' sel':''}" data-k="${k}" aria-label="${TP['it_'+k]}">${itmSVG(k)}<b>${P.vb[k]}</b></button>`).join(''):`<small>${TP.h_none}</small>`;
  if(selK&&!(P.vb[selK]>0))selK=null}
 draw();const first=Object.values(P.vb).some(v=>v>0)?TP.h_hi:TP.h_none;ht.textContent=first;sayR([first]);
 bag.onclick=e=>{const b=e.target.closest('.p23bi');if(!b)return;selK=b.dataset.k;sfx('pop');draw()};
 svg.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('.p23hs');if(!g)return;const i=+g.dataset.i;const m=occ();
  if(m[i]){P.th=P.th.filter(([j])=>j!==i);P.vb[m[i]]=(P.vb[m[i]]||0)+1;SV2();sfx('pop');ht.textContent=TP.h_take;draw();return}
  if(!selK||!(P.vb[selK]>0)){ht.textContent=Object.values(P.vb).some(v=>v>0)?TP.h_hi:TP.h_none;return}
  P.th.push([i,selK]);P.vb[selK]--;SV2();tone(880,0,.1,'triangle',.08);ht.textContent=TP.h_put;draw()});
 $('#p23hdone',ov).onclick=()=>{sfx('pop');hush();ov.remove();onClose&&onClose()};
 if(window.__P23)window.__P23.house={sel:k=>{selK=k;draw()},put:i=>{const g=svg.querySelector(`.p23hs[data-i="${i}"]`);if(!g)return false;g.dispatchEvent(new MouseEvent('click',{bubbles:true}));return true}};
 return ov}

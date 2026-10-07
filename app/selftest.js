// 只在雲端模擬器自我測試時放進 App（mkapp.py 有 SELFTEST=1 才會加）：自動走過主要畫面，結果用 console 印出來
(function(){
 // 雲端測試機上有一個小伺服器（127.0.0.1:8765）：收紀錄、在對的時間截圖；連不上就只用 console
 const SRV='http://127.0.0.1:8765';let srvOk=true;
 const post=(path)=>srvOk?fetch(SRV+path,{mode:'cors'}).then(r=>r.ok).catch(()=>{srvOk=false;return false}):Promise.resolve(false);
 const L=(...a)=>{const m='SELFTEST '+a.join(' ');console.log(m);post('/log?m='+encodeURIComponent(m))};
 window.addEventListener('error',e=>L('PAGEERR',e.message,e.filename?e.filename.split('/').pop():'',e.lineno||''));
 window.addEventListener('unhandledrejection',e=>L('PAGEERR','promise',String(e.reason&&e.reason.message||e.reason)));
 const W=ms=>new Promise(r=>setTimeout(r,ms));
 const shot=async(n,hold=4500)=>{await W(600);const done=await post('/shot?n='+encodeURIComponent(n));if(done){await W(400);return}L('SHOT',n);await W(hold)};
 const clr=()=>document.querySelectorAll('.overlay,.coach,#toast').forEach(o=>o.remove());
 const phase=localStorage.getItem('selftest_phase')||'1';
 const T0=Date.now(),loads=+(localStorage.getItem('selftest_loads_'+phase)||0)+1;localStorage.setItem('selftest_loads_'+phase,loads);
 const step=n=>{try{localStorage.setItem('selftest_step',n)}catch(e){}L('STEP',n,((Date.now()-T0)/1000).toFixed(1)+'s')};
 async function audioCheck(){
  try{const AC=window.AudioContext||window.webkitAudioContext;const ctx=new AC();try{await ctx.resume()}catch(e){}
   const idx=__ev('VO.idx');const k=Object.keys(idx).find(x=>x.startsWith('z|'));const e=idx[k];
   const fi=e.length>=5?e[3]:e[0],off=e.length>=5?e[4]:e[1];
   const r=await fetch(`voice/c/${fi}-${off}.mp3`);const buf=await r.arrayBuffer();
   const ab=await ctx.decodeAudioData(buf);
   const src=ctx.createBufferSource();src.buffer=ab;const g=ctx.createGain();g.gain.value=0.001;src.connect(g);g.connect(ctx.destination);src.start();
   const t0=ctx.currentTime;await W(700);
   L('AUDIO',ctx.state,'clip',k.slice(0,20),'dur',ab.duration.toFixed(2),'advanced',(ctx.currentTime-t0).toFixed(2));
   L(ctx.currentTime-t0>0.3&&ab.duration>0.2?'PASS':'FAIL','audio')}catch(e){L('FAIL','audio',e.message)}}
 async function run1(){
  if(loads>1)L('NOTE reloaded during phase 1, last step was',localStorage.getItem('selftest_step'),'load',loads);
  await W(5000);clr();await shot('01title');
  L(__game&&__ev?'PASS':'FAIL','game loaded',window.__APP?'app':'web');
  L(typeof caches==='undefined'?'PASS':'FAIL','no service worker cache in app');
  {const t=document.createElement('div');t.style.cssText='position:fixed;top:0;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)';document.body.appendChild(t);const cs=getComputedStyle(t),it=parseFloat(cs.paddingTop)||0,ib=parseFloat(cs.paddingBottom)||0;t.remove();
   const sc=document.querySelector('#screen');const bt=sc?sc.getBoundingClientRect().top:-1;const sb=sc?innerHeight-sc.getBoundingClientRect().bottom:-1;
   L(bt>=it-1&&sb>=ib-1?'PASS':'FAIL','safe area respected','insetTop',it,'screenTop',Math.round(bt),'insetBottom',ib,'screenBottomGap',Math.round(sb))}
  try{await __ev('VO.ready');L('PASS','voice index',Object.keys(__ev('VO.idx')).length)}catch(e){L('FAIL','voice index',e.message)}
  await audioCheck();
  const S=__game.S;S.name='小星';S.chDone=4;S.progs=[10,10,10,10,4];S.wallet=77;__game.setCh(4);__game.save&&__game.save();try{__ev('save')()}catch(e){}
  __game.go('world');await W(1200);clr();await shot('02world');
  // 第六章以後：App 第一版顯示「即將推出」
  {const n=document.querySelectorAll('.wnode').length,more=!!document.querySelector('.moresoon');L(n===5&&!more?'PASS':'FAIL','map shows only chapters 1-5, no coming-soon',n,more)}
  // 闖關：答對一題
  __game.setCh(0);S.level=0;S.q=0;S.qs=['letter','letter','letter'];__game.go('stage');await W(1500);clr();S.q=0;__game.rq();await W(1500);
  await shot('03stage',1500);
  const ans=String(S.ans);const b=document.querySelector(`.play [data-v="${ans}"]`);
  if(b){const r=b.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);L(hit&&(hit===b||b.contains(hit))?'PASS':'FAIL','answer button tappable');b.click();let k=0;while(S.q<1&&k<20){await W(500);k++}L(S.q>=1?'PASS':'FAIL','correct answer advances',S.q,(k/2)+'s')}else L('FAIL','no answer button');
  clr();await shot('04right',2000);
  for(const s of ['room','pethouse','coloring','wardrobe','park']){try{step(s);clr();__game.go(s);await W(1500);clr();await shot('05'+s,3000)}catch(e){L('FAIL',s,e.message)}}
  step('chend');try{__game.setCh(0);S.prog=10;__game.go('chend');await W(3500);await shot('06chend')}catch(e){L('FAIL','chend',e.message)}
  step('finale');try{__game.setCh(4);S.prog=10;__game.go('finale');await W(6000);L(!document.querySelector('#nextch2')?'PASS':'FAIL','finale has no go-to-chapter-6 button');await shot('07finale')}catch(e){L('FAIL','finale',e.message)}
  try{__game.show('title');await W(1500);clr();document.querySelector('#parent').click();await W(700);L(document.querySelector('#pg')?'PASS':'FAIL','parent settings ask the grown-up question');clr();__ev('parentPanel')();await W(1200);await shot('08parent');clr()}catch(e){L('FAIL','parent',e.message)}
  // 存檔：寫一個記號，下次開 App 檢查
  S.wallet=77;try{__ev('save')()}catch(e){};localStorage.setItem('selftest_phase','2');localStorage.setItem('selftest_mark','m'+Date.now());
  L(loads===1?'PASS':'FAIL','page loaded only once in phase 1',loads);L('PHASE1 DONE')}
 async function run2(){
  await W(5000);clr();
  const S=__game.S;L(localStorage.getItem('selftest_mark')?'PASS':'FAIL','localStorage survives relaunch');
  L(S.wallet===77&&S.name==='小星'?'PASS':'FAIL','game save survives relaunch','wallet',S.wallet,'name',S.name);
  await shot('09relaunch');localStorage.setItem('selftest_phase','done');L('PHASE2 DONE')}
 window.addEventListener('load',()=>{(phase==='1'?run1:phase==='2'?run2:()=>L('IDLE'))().catch(e=>L('FAIL','runner',e.message))});
})();

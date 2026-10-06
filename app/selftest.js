// 只在雲端模擬器自我測試時放進 App（mkapp.py 有 SELFTEST=1 才會加）：自動走過主要畫面，結果用 console 印出來
(function(){
 const L=(...a)=>console.log('SELFTEST '+a.join(' '));
 window.addEventListener('error',e=>L('PAGEERR',e.message,e.filename?e.filename.split('/').pop():'',e.lineno||''));
 window.addEventListener('unhandledrejection',e=>L('PAGEERR','promise',String(e.reason&&e.reason.message||e.reason)));
 const W=ms=>new Promise(r=>setTimeout(r,ms));
 const shot=async(n,hold=4500)=>{L('SHOT',n);await W(hold)};
 const clr=()=>document.querySelectorAll('.overlay,.coach,#toast').forEach(o=>o.remove());
 const phase=localStorage.getItem('selftest_phase')||'1';
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
  await W(5000);clr();await shot('01title');
  L(__game&&__ev?'PASS':'FAIL','game loaded',window.__APP?'app':'web');
  L(typeof caches==='undefined'?'PASS':'FAIL','no service worker cache in app');
  try{await __ev('VO.ready');L('PASS','voice index',Object.keys(__ev('VO.idx')).length)}catch(e){L('FAIL','voice index',e.message)}
  await audioCheck();
  const S=__game.S;S.name='小星';S.chDone=4;S.progs=[10,10,10,10,4];S.wallet=77;__game.setCh(4);__game.save&&__game.save();try{__ev('save')()}catch(e){}
  __game.go('world');await W(1200);clr();await shot('02world');
  // 第六章以後：App 第一版顯示「即將推出」
  const st=[...document.querySelectorAll('.wnode')].map(b=>b.className);L(st[5]&&/soon/.test(st[5])?'PASS':'FAIL','chapter 6 coming soon',st[5]||'');
  // 闖關：答對一題
  __game.setCh(0);S.level=0;S.q=0;S.qs=['letter','letter','letter'];__game.go('stage');await W(1500);clr();S.q=0;__game.rq();await W(1500);
  await shot('03stage',1500);
  const ans=String(S.ans);const b=document.querySelector(`.play [data-v="${ans}"]`);
  if(b){const r=b.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);L(hit&&(hit===b||b.contains(hit))?'PASS':'FAIL','answer button tappable');b.click();let k=0;while(S.q<1&&k<20){await W(500);k++}L(S.q>=1?'PASS':'FAIL','correct answer advances',S.q,(k/2)+'s')}else L('FAIL','no answer button');
  clr();await shot('04right',2000);
  for(const s of ['room','pethouse','coloring','wardrobe','park']){try{clr();__game.go(s);await W(1500);clr();await shot('05'+s,3000)}catch(e){L('FAIL',s,e.message)}}
  try{__game.setCh(0);S.prog=10;__game.go('chend');await W(3500);await shot('06chend')}catch(e){L('FAIL','chend',e.message)}
  try{__game.setCh(4);S.prog=10;__game.go('finale');await W(6000);await shot('07finale')}catch(e){L('FAIL','finale',e.message)}
  try{__game.show('title');await W(1500);clr();__ev('parentPanel')();await W(1200);await shot('08parent');clr()}catch(e){L('FAIL','parent',e.message)}
  // 存檔：寫一個記號，下次開 App 檢查
  S.wallet=77;try{__ev('save')()}catch(e){};localStorage.setItem('selftest_phase','2');localStorage.setItem('selftest_mark','m'+Date.now());
  L('PHASE1 DONE')}
 async function run2(){
  await W(5000);clr();
  const S=__game.S;L(localStorage.getItem('selftest_mark')?'PASS':'FAIL','localStorage survives relaunch');
  L(S.wallet===77&&S.name==='小星'?'PASS':'FAIL','game save survives relaunch','wallet',S.wallet,'name',S.name);
  await shot('09relaunch');localStorage.setItem('selftest_phase','done');L('PHASE2 DONE')}
 window.addEventListener('load',()=>{(phase==='1'?run1:phase==='2'?run2:()=>L('IDLE'))().catch(e=>L('FAIL','runner',e.message))});
})();

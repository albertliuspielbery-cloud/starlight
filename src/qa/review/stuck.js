// 卡住測試：連點正解、連點錯答、大小寫配對亂點、中途回首頁再進來、題目中轉向。node stuck.js vp
const R=require('./rlib');const Q=require('../s7/qtest');const vp=process.argv[2]||'se';
(async()=>{const b=await R.chromium.launch();const {page,errs}=await R.open(b,{vp});const ev=c=>R.ev(page,c);const w=ms=>page.waitForTimeout(ms);
 const codes=[['letter:s7floor:a|b|c|d',42],['count:s7hund:100',41],['shape:s7grid:z4',43],['count:s7queue',42],['letter:s7floor:a|b|c|d',42],['clock:s7',40],['count:s7five:30',40],['letter:k7lo:b|d',43],['measure:s7blk',42],['count:s7ord:10',41]];
 for(const [code,ch] of codes){const info=await Q.playQ(page,code,'mid',ch);await w(1200);
  // 連點：正解 6 下
  const r=await page.evaluate(()=>__ev(`(()=>{const play=document.querySelector('.stage .play');const el=[...play.querySelectorAll('[data-v]')].find(b=>b.dataset.v===String(S.ans));if(!el)return 'noans';const q0=S.q;const gm0=S.gems;for(let i=0;i<6;i++)el.click();return {q0,gm0}})()`));
  for(let k=0;k<20;k++){await w(500);if(await ev('S.q')>0)break}const after=await ev(`({q:S.q,gems:S.gems,scr:S.screen,lock:S.lock,miss:S.miss})`);console.log(code,JSON.stringify(r),'->',JSON.stringify(after))}
 // 大小寫配對：連點大寫、亂點
 await Q.playQ(page,'letter:s7case:a|b|c|d','mid',42);await w(1200);
 const pr=await page.evaluate(()=>__ev(`(()=>{const play=document.querySelector('.stage .play');const ups=[...play.querySelectorAll('.c7b.up')],los=[...play.querySelectorAll('.c7b.lo')];ups.forEach(u=>u.click());los.forEach(l=>l.click());ups.forEach(u=>u.click());for(const u of ups){u.click();const l=los.find(x=>x.dataset.l===u.dataset.u);l&&l.click()}return {n:ups.length,q:S.q,miss:S.miss}})()`));
 await w(3000);console.log('case rapid',JSON.stringify(pr),'->',JSON.stringify(await ev(`({q:S.q,scr:S.screen,lock:S.lock,miss:S.miss})`)));
 // 中途回首頁再進第 43 章
 await Q.playQ(page,'measure:s7blk','mid',42);await w(800);await page.evaluate(()=>{const h=document.querySelector('#home,.hbtn.home,[aria-label*="首頁"]');h&&h.click()});await w(1500);console.log('after home',await ev('S.screen'));
 await ev(`(()=>{setCh(42);going=false;go('map')})()`);await w(1500);console.log('map',await ev('S.screen'));await ev(`(()=>{going=false;startLevel(2)})()`);await w(1500);await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});await w(1200);
 console.log('re-enter',await ev(`({scr:S.screen,q:S.q,code:S.qs[S.q]})`));
 // 轉向：百數表找數字
 await Q.playQ(page,'count:s7hund:100','mid',41);await w(1200);await page.setViewportSize(R.VPS.land);await w(1200);await page.screenshot({path:__dirname+`/B_shots/stuck_${vp}_rot_land.png`});
 const l=await R.layout(page,'.stage');console.log('rot land off',JSON.stringify(l.off.slice(0,4)));await page.setViewportSize(R.VPS[vp]);await w(1200);await page.screenshot({path:__dirname+`/B_shots/stuck_${vp}_rot_back.png`});
 console.log('ERRS',JSON.stringify(errs.filter(e=>!/favicon|Failed to load/.test(e)).slice(0,10)));await b.close()})();

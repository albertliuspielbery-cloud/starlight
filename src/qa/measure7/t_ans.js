const L=require('../s7/lib');const Q=require('../s7/qtest');
(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{errs});
 for(const d of ['easy','mid','hard','hard']){const i=await Q.playQ(page,'measure:s7blk',d,42);await page.waitForTimeout(800);
  const f=await page.evaluate(()=>[...document.querySelectorAll('.b7an svg')].map(s=>s.getAttribute('data-m7f')||'HEAD:'+s.getAttribute('data-an')));
  const w=await Q.wrongOnce(page);await page.waitForTimeout(1200);const a=await Q.answer(page);console.log(d,f,'wrong',w,'answer',a)}
 await page.evaluate(()=>{window.__S7MEASURE_LIVE=false});await Q.playQ(page,'measure:s7blk','hard',42);await page.waitForTimeout(800);
 console.log('LIVE=false',await page.evaluate(()=>[...document.querySelectorAll('.b7an svg')].map(s=>s.getAttribute('data-m7f')||'HEAD:'+s.getAttribute('data-an'))));
 console.log('errs',errs.filter(e=>!/favicon|Failed to load/.test(e)).slice(0,6));await b.close()})();

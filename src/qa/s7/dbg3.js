const L=require('./lib');
(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{ver:'web',errs});
 await page.evaluate(()=>__ev(`(()=>{hush();setCh(42);S.diff='mid';S.prog=0;save();going=false;startLevel(0)})()`));
 for(let i=0;i<5;i++){await page.waitForTimeout(800);console.log(await page.evaluate(()=>__ev(`JSON.stringify({scr:S.screen,going,qs:S.qs,ov:[...document.querySelectorAll('.overlay')].map(o=>o.textContent.slice(0,80))})`)))}
 await page.screenshot({path:'shots/dbg43.png'});console.log(errs.join('\n'));await b.close()})();

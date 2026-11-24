const L=require('./lib');
(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{ver:'web',errs});
 await page.evaluate(()=>document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})));await page.waitForTimeout(300);console.log('body:',errs.filter(e=>/closest/.test(e)).length);
 await page.evaluate(()=>document.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})));await page.waitForTimeout(300);console.log('document:',errs.filter(e=>/closest/.test(e)).length);await b.close()})();

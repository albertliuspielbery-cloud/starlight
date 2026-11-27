const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs});
 page.on('console',m=>{if(/v21|m9za/.test(m.text()))console.log('CONSOLE',m.text())});
 console.log(await page.evaluate(()=>{const h=document.documentElement.innerHTML;return [h.indexOf('m9za_v21'),h.indexOf('bar21park'),!!window.__ev, __ev('typeof armIntro'), __ev('document.body.className')]}));
 await page.reload();await page.waitForTimeout(4000);
 await b.close()})();

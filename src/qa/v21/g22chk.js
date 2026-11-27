const L=require('../s7/lib');(async()=>{const b=await L.chromium.launch();const errs=[];const {page}=await L.open(b,{ver:'app',owned:['full'],errs});
console.log(await page.evaluate(()=>__ev('JSON.stringify([G22.ITEMS.length,G22.has("tulip"),G22.forLevel(41,3).id])')),errs.filter(e=>!/promo|Failed/.test(e)));await b.close()})();

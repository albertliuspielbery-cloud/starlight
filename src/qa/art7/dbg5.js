const L=require('/home/claude/w/s7/qa/s7/lib.js');
(async()=>{const b=await L.chromium.launch();const errs=[];
const {page}=await L.open(b,{ver:'web',hero:'princess',errs,fake:false});
await page.evaluate(()=>__ev(`(()=>{['dress43','beret43'].forEach(i=>{if(!S.owned.includes(i))S.owned.push(i)});S.look.dress='dress43';S.look.head='beret43';window.__lg=[];const o=RIG.svgOf.g;RIG.svgOf.g=function(l,a){__lg.push('svgOf:'+(l&&l.head)+':'+new Error().stack.split('\\n').slice(2,7).join('|').replace(/http[^ ]*index.html/g,''));return o.apply(this,arguments)};const og=RIG.girl;RIG.girl=function(l){__lg.push('girl:'+(l&&l.head)+':'+new Error().stack.split('\\n').slice(2,5).join('|').replace(/http[^ ]*index.html/g,''));return og.apply(this,arguments)};setCh(44);S.prog=1;startLevel(1)})()`));
await page.waitForTimeout(2500);
console.log(await page.evaluate(()=>window.__lg.slice(0,8)));
await b.close()})();

const L=require('/home/claude/w/s7/qa/s7/lib.js');
(async()=>{const b=await L.chromium.launch();const errs=[];
const {page}=await L.open(b,{ver:'web',hero:'princess',errs,fake:false});
const r=await page.evaluate(()=>__ev(`(()=>{['dress43','beret43'].forEach(i=>{if(!S.owned.includes(i))S.owned.push(i)});S.look.dress='dress43';S.look.head='beret43';setCh(44);S.prog=1;startLevel(1);return 1})()`));
await page.waitForTimeout(2000);
console.log(await page.evaluate(()=>{const t=document.querySelector('#team');return t?[t.innerHTML.includes('s41hat'),t.innerHTML.length, (t.innerHTML.match(/data-rs="[a-z]+"/g)||[]).join(',')]:'no team'}));
console.log(await page.evaluate(()=>__ev('S.look.head')));console.log(await page.evaluate(()=>__ev(`typeof RIG.girl+' '+RIG.ok+' '+String(RIG.girl).slice(0,200)`)));
await b.close()})();

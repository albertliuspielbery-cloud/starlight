const L=require('/home/claude/w/s7/qa/s7/lib.js');
(async()=>{const b=await L.chromium.launch();const errs=[];
const sv=L.save40('prince',{chDone:45,progs:Array(45).fill(10),owned:['redpanda44','bag41','beret43','b_paint43'],look:{dress:'b_paint43',head:'beret43',pet:'redpanda44',back:'bag41'}});
const {page}=await L.open(b,{ver:'web',hero:'prince',errs,fake:false,save:sv});
console.log(await page.evaluate(()=>__ev(`JSON.stringify({look:S.look,it:ITEM.b_paint43,ib:ITEM.beret43,bf:!!BFIT.b_paint43,owned:S.owned.slice(-6)})`)));
const s=await page.evaluate(()=>__ev(`princess(Object.assign({},S.look,{dress:'b_paint43',head:'beret43',back:'bag41'}))`));console.log(s.includes('s41hat'),s.includes('s41pack'));
await b.close()})();

const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();const fs=require('fs');const out=[];const log=(...a)=>{out.push(a.join(' '));fs.writeFileSync(__dirname+'/mem.log',out.join('\n'))};
 const {ctx,page}=await L.open(b,{ver:'web',fake:false,save:S45('princess')});
 const cdp=await ctx.newCDPSession(page);await cdp.send('Performance.enable');
 const m=async t=>{await cdp.send('HeapProfiler.collectGarbage');const r=(await cdp.send('Performance.getMetrics')).metrics;const g=k=>(r.find(x=>x.name===k)||{}).value;log(t,'heapMB',(g('JSHeapUsedSize')/1e6).toFixed(1),'nodes',g('Nodes'),'docs',g('Documents'),'listeners',g('JSEventListeners'))};
 await m('start');
 for(let round=0;round<2;round++){for(const c of [40,41,42,43,44])for(const sc of ['story','guide','map']){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());hush();setCh(${c});S.prog=0;going=false;go('${sc}')})()`);await page.waitForTimeout(1200)}
  for(const sc of ['world','park','globe8','photo8','cbook','room','wardrobe','title']){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('${sc}')})()`);await page.waitForTimeout(1200)}
  await m('round'+round)}
 await ctx.close();await b.close()})();

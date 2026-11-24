const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);const fs=require('fs');
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
const out=[];const log=(...a)=>{out.push(a.join(' '));fs.writeFileSync(__dirname+'/fin.log',out.join('\n'))};
(async()=>{const b=await L.chromium.launch();
 for(const c of [39,44]){
 const {ctx,page}=await L.open(b,{ver:'web',fake:false,save:S45('princess')});
 const cdp=await ctx.newCDPSession(page);await cdp.send('Performance.enable');
 const m=async t=>{const r=(await cdp.send('Performance.getMetrics')).metrics;const g=k=>(r.find(x=>x.name===k)||{}).value;const pm=await cdp.send('SystemInfo.getProcessInfo').catch(()=>null);log(c,t,'heapMB',(g('JSHeapUsedSize')/1e6).toFixed(1),'nodes',g('Nodes'),'layout',g('LayoutCount'))};
 await m('before');
 await ev(page,`(()=>{hush();setCh(${c});S.prog=NL;going=false;go('chend')})()`);
 for(let i=0;i<8;i++){await page.waitForTimeout(2500);await m('t'+(i*2.5))}
 await ev(page,`(()=>{going=false;go('world')})()`);await page.waitForTimeout(2000);await m('world');
 await ctx.close()}
 await b.close()})().catch(e=>log('ERR',e.message.slice(0,200)));

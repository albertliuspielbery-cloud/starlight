const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);const fs=require('fs');
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
const out=[];const log=(...a)=>{out.push(a.join(' '));fs.writeFileSync(__dirname+'/lay.log',out.join('\n'))};
(async()=>{const b=await L.chromium.launch();
 for(const [ver,c,fin] of [['web',39,0],['web',44,0],['web',44,1],['app',44,1]]){
 const {ctx,page}=await L.open(b,{ver,fake:false,save:S45('princess'),owned:['full','s5to8','stage9']});
 const cdp=await ctx.newCDPSession(page);await cdp.send('Performance.enable');
 const g=async()=>{const r=(await cdp.send('Performance.getMetrics')).metrics;const f=k=>(r.find(x=>x.name===k)||{}).value;return {lay:f('LayoutCount'),rs:f('RecalcStyleCount'),heap:+(f('JSHeapUsedSize')/1e6).toFixed(1),nodes:f('Nodes')}};
 if(fin){await ev(page,`(()=>{hush();setCh(${c});S.prog=NL;going=false;go('chend')})()`);await page.waitForTimeout(6000)}
 await ev(page,`(()=>{hush();setCh(${c});going=false;go('world')})()`);await page.waitForTimeout(3000);
 const a=await g();await page.waitForTimeout(5000);const z=await g();
 const ws=await page.evaluate(()=>({ov:document.querySelectorAll('.overlay').length,cls:[...document.querySelectorAll('.overlay')].map(o=>o.className+' '+(o.textContent||'').slice(0,40))}));
 log(ver,'ch',c,'fin',fin,'5s idle on world: layouts',z.lay-a.lay,'styles',z.rs-a.rs,'heap',a.heap,'->',z.heap,'nodes',a.nodes,'->',z.nodes,JSON.stringify(ws));
 await ctx.close()}
 await b.close()})().catch(e=>log('ERR',e.message.slice(0,200)));

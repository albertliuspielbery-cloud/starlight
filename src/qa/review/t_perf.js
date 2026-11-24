const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();
 const {ctx,page}=await L.open(b,{ver:'web',fake:false,save:S45('princess'),vp:{width:390,height:844},v2:{parkSeen:{globe8:5}}});
 await ev(page,`(()=>{going=false;go('globe8')})()`);await page.waitForTimeout(5000);
 const cdp=await ctx.newCDPSession(page);
 const pts=await page.evaluate(()=>({cv:[document.querySelector('#gl8cv').width,document.querySelector('#gl8cv').height]}));console.log(pts);
 for(const [rate,lite] of [[1,false],[4,false],[4,true],[6,false]]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});await ev(page,`S.lite=${lite}`);
  const ft=await page.evaluate(async()=>{const G=window.__gl8;const ts=[];let last=performance.now();for(let i=0;i<40;i++){G.VW.lam+=3;G.need();await new Promise(r=>requestAnimationFrame(r));const n=performance.now();ts.push(n-last);last=n}ts.sort((a,b)=>a-b);return {med:Math.round(ts[20]),p90:Math.round(ts[36])}});
  console.log('rate',rate,'lite',lite,ft)}
 await ctx.close();await b.close()})();

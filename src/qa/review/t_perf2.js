const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();
 for(const dsf of [2,3]){
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:dsf});const page=await ctx.newPage();
 await page.addInitScript(([sv])=>{if(sessionStorage.getItem('__i'))return;sessionStorage.setItem('__i',1);const S=Storage.prototype.setItem;S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero:'princess',chosen:1}]}));S.call(localStorage,'pp4',JSON.stringify(sv));S.call(localStorage,'pp4v2',JSON.stringify({s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1,parkSeen:{globe8:5}}))},[S45('princess')]);
 await page.addInitScript(()=>{window.__cb=[];const r=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=f=>r(t=>{const a=performance.now();f(t);window.__cb.push(performance.now()-a)})});
 await page.goto(L.URL.web);await page.waitForTimeout(4000);
 await ev(page,`(()=>{going=false;go('globe8')})()`);await page.waitForTimeout(5000);
 const cdp=await ctx.newCDPSession(page);
 for(const rate of [1,4]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});
  for(const mode of ['free','hard']){await ev(page,`__gl8.diff('${mode==='hard'?'hard':'mid'}')`);
  const ft=await page.evaluate(async()=>{window.__cb=[];const G=window.__gl8;for(let i=0;i<40;i++){G.VW.lam+=3;G.need();await new Promise(r=>setTimeout(r,20))}const ts=window.__cb.slice().sort((a,b)=>a-b);return {n:ts.length,med:+ts[ts.length>>1].toFixed(1),p90:+ts[Math.floor(ts.length*.9)].toFixed(1),cv:document.querySelector('#gl8cv').width}});
  console.log('dsf',dsf,'rate',rate,mode,JSON.stringify(ft))}}
 await ctx.close()}
 await b.close()})();

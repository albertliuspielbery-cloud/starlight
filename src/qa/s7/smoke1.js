const L=require('./lib');
(async()=>{const b=await L.chromium.launch();
for(const ver of ['web','app'])for(const hero of ['princess','prince']){const errs=[];const {ctx,page}=await L.open(b,{ver,hero,errs});
 const r=await page.evaluate(()=>__ev(`({n:CHAPTERS.length,ch:S.ch,done:S.chDone,s7:window.__s7&&!window.__s7.off,arcs:ARCS.length,stages:STAGES.map(s=>s[0]).join(','),scr:S.screen,art:window.__s7art,wr:!!(window.__WR7&&__WR7.ready),q:!!window.__s7q,iap:IAP_ON,open40:window.__appOpen?window.__appOpen(40):"-",hero:window.HERO})`));
 console.log(ver,hero,JSON.stringify(r));console.log(errs.slice(0,8).join('\n'));await ctx.close()}
await b.close()})();

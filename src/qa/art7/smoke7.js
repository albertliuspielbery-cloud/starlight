const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8981/index.html');await p.waitForTimeout(5000);
const r=await p.evaluate(()=>({live:S41.LIVE,bg:Object.keys(BG41).length,ch:Object.keys(CH41).length,art:window.__s7art}));console.log(JSON.stringify(r),errs.slice(0,5));await b.close()})();

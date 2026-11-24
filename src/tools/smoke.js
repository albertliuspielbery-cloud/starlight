const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();for(const u of ['http://127.0.0.1:8981/index.html','http://127.0.0.1:8982/index.html']){const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(u);await p.waitForTimeout(5000);
console.log(u,await p.evaluate("typeof APP_VERSION!=='undefined'?APP_VERSION:(window.__ev?__ev('APP_VERSION'):'?')"),errs.slice(0,3));await p.screenshot({path:'out/smoke_'+u.slice(-16,-11)+'.png'});await p.close()}await b.close()})();

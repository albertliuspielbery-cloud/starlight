const L=require('./lib');
(async()=>{const b=await L.chromium.launch();const ctx=await b.newContext();const page=await ctx.newPage();page.on('pageerror',e=>console.log('ERR',e.stack.slice(0,600)));
await page.goto(L.URL.web);await page.waitForTimeout(4000);console.log(await page.evaluate(()=>typeof CHAPTERS));await b.close()})();

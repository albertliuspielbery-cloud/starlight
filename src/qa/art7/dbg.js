const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://127.0.0.1:8993/base/index.html');await p.waitForTimeout(3500);
await p.addScriptTag({url:'/mods/m7b_s7art.js'});
const r=await p.evaluate(()=>{const s=CH41.keeper44.f();return [s.length,s.indexOf('#D8BE84'),s.slice(0,300)]});console.log(r);await b.close()})();

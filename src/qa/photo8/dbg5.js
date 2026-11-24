const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});
await p.goto('http://127.0.0.1:8982/index.html');await p.waitForTimeout(3500);
console.log(await p.evaluate(c=>__ev(c),fs.readFileSync('dbg_in.js','utf8')));await p.waitForTimeout(2000);
await p.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await p.waitForTimeout(800);
console.log(await p.evaluate(c=>__ev(c),fs.readFileSync('dbg_in2.js','utf8')));await b.close()})();

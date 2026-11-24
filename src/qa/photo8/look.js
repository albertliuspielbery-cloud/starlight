const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8981/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(c=>__ev(c),fs.readFileSync(process.argv[2]||'look_in.js','utf8')));
await p.waitForTimeout(500);await p.screenshot({path:process.argv[3]||'look.png'});console.log(errs);await b.close()})();

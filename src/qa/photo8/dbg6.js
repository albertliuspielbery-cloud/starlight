const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('PE',e.message));
await p.goto('http://127.0.0.1:8991/index.html');await p.waitForTimeout(3500);
console.log(await p.evaluate(c=>__ev(c),fs.readFileSync('dbg_in.js','utf8')));await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const el=[...document.querySelectorAll('h2,h3,b,p')].find(x=>x.textContent.includes('刪除「'));let c=el;for(let i=0;i<4&&c;i++)c=c.parentElement;return c?c.outerHTML.slice(0,700):''}));await b.close()})();

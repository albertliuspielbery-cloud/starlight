const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8982/index.html');await p.waitForTimeout(3500);
console.log(await p.evaluate(c=>__ev(c),fs.readFileSync('dbg_in.js','utf8')));await p.waitForTimeout(2000);
await p.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const c=document.querySelector('.pcard[data-k="photo8"]');return c?c.outerHTML.slice(0,300)+' disp:'+getComputedStyle(c).display:'none'}));
await p.click('.pcard[data-k="photo8"]');await p.waitForTimeout(500);await p.click('.pcard[data-k="photo8"]');await p.waitForTimeout(2000);
console.log(await p.evaluate(()=>__ev('S.screen')),await p.evaluate(()=>{const o=document.querySelector('.overlay');return o?o.textContent.slice(0,200):'no overlay'}));
await p.screenshot({path:'dbg4.png'});console.log(errs);await b.close()})();

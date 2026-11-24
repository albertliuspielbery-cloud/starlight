const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(/photo|zoo|park/i.test(m.text()))errs.push(m.text())});
await p.goto('http://127.0.0.1:'+(process.argv[2]||8981)+'/index.html');await p.waitForTimeout(3500);
console.log(await p.evaluate(c=>__ev(c),fs.readFileSync('dbg_in.js','utf8')));await p.waitForTimeout(2000);
console.log(await p.evaluate(()=>[...document.querySelectorAll('.pcard')].map(c=>c.dataset.k+(c.classList.contains('lockd')?'*':'')).join(' ')), await p.evaluate(()=>__ev('S.screen')));
await p.screenshot({path:'dbg.png'});console.log(errs);await b.close()})();

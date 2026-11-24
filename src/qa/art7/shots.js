// 截圖：每一張 .sheet 存成 s7art_N.png（1600 寬）
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errs.push(m.text())});
await p.goto('http://127.0.0.1:8993/preview/s7art.html');await p.waitForFunction(()=>document.title==='ready',null,{timeout:90000});await p.waitForTimeout(800);
const n=await p.$$eval('.sheet',a=>a.length);const only=process.argv[2]?process.argv[2].split(',').map(Number):null;
for(let i=0;i<n;i++){if(only&&!only.includes(i+1))continue;const el=(await p.$$('.sheet'))[i];await el.screenshot({path:`/home/claude/w/s7/preview/s7art_${i+1}.png`});}
console.log('sheets',n,errs.slice(0,6));await b.close()})();

// 國界五種樣式（給 Albert 選）：iPhone 390×844，亞洲面、歐洲面 × A～E。node bstyle_shots.js
const { chromium } = require('playwright');const fs=require('fs');
const OUT='/mnt/user-data/outputs/s7預覽/國界樣式/';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(fs.readFileSync(__dirname+'/../iapmock.js','utf8'));
 await p.goto('http://127.0.0.1:8982/index.html');await p.waitForFunction(()=>typeof window.__ev==='function',null,{timeout:90000});await p.waitForTimeout(2000);
 const ev=x=>p.evaluate(s=>__ev(s),x);
 await ev("iapSave(['full','stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']);S.chDone=45;V2.s3pw=1;save();go('globe8')");await p.waitForTimeout(6500);
 await ev("(()=>{const b=document.querySelector('#gl8bub');b.textContent='';b.classList.add('off');__gl8.FX.sel=null})()");
 for(const st of 'ABCDE')for(const [nm,lon,lat] of [['亞洲',100,32],['歐洲',15,48]]){
  await p.evaluate(st=>{window.__GL8_BSTYLE=st},st);await ev(`(()=>{const b=document.querySelector('#gl8bub');b.textContent='';b.classList.add('off');__gl8.FX.sel=null;__gl8.panTo(${lon},${lat},0);__gl8.need()})()`);
  await p.waitForTimeout(450);await p.screenshot({path:OUT+`${st}_${nm}.png`})}
 console.log(errs.length?errs.join('\n'):'ok');await b.close()})();

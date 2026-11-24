// 章末畫面：第七季 vs 舊章，連續截圖。node chend.js vp ch,ch
const R=require('./rlib');const vp=process.argv[2]||'se';const CHS=(process.argv[3]||'41,40').split(',').map(Number);
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp,extra:{chDone:45,progs:Array(45).fill(10)}});const ev=c=>R.ev(page,c);
 for(const ch of CHS){await ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(${ch-1});S.prog=10;going=false;go('chend')})()`);
  for(let i=0;i<40&&await ev('S.screen')!=='chend';i++){await page.evaluate(()=>{const s=[...document.querySelectorAll('button')].find(b=>/跳過/.test(b.textContent)&&b.offsetParent);if(s)s.click()});await page.waitForTimeout(500)}
  for(let i=0;i<7;i++){await page.waitForTimeout(600);await page.screenshot({path:__dirname+`/B_tmp/ce_${vp}_${ch}_${i}.png`})}
  const l=await R.layout(page);console.log(ch,await ev('S.screen'),JSON.stringify(l.small),JSON.stringify(l.off))}
 await b.close()})();

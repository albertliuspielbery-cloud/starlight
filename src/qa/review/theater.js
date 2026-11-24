// 破關小劇場：每 0.6 秒截一張，比較第七季和舊章節。也量人物有沒有 scale 動畫。node theater.js vp ch1,ch2
const R=require('./rlib');const vp=process.argv[2]||'se';const CHS=(process.argv[3]||'41,38').split(',').map(Number);
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp,extra:{chDone:45,progs:Array(45).fill(10)}});const ev=c=>R.ev(page,c);
 for(const ch of CHS){await ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(${ch-1});going=false;go('theater93',{ch:${ch-1},mode:'replay'})})()`);
  // 監看 transform 有 scale 的人物元素
  await page.evaluate(()=>{window.__sc=new Set();const chk=()=>{document.querySelectorAll('svg,img,[class*=char],[class*=hero],[class*=pet],[class*=fr]').forEach(e=>{const t=getComputedStyle(e).transform;if(t&&t!=='none'){const m=t.match(/matrix\(([^)]+)\)/);if(m){const v=m[1].split(',').map(Number);const sx=Math.hypot(v[0],v[1]);if(Math.abs(sx-1)>.03&&e.getBoundingClientRect().width>40)__sc.add((e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)+' sx='+sx.toFixed(2))}}})};window.__scI=setInterval(chk,100)});
  for(let i=0;i<14;i++){await page.waitForTimeout(650);await page.screenshot({path:__dirname+`/B_tmp/th_${vp}_${ch}_${String(i).padStart(2,'0')}.png`});if(await ev('S.screen')!=='theater93'){console.log(ch,'ended at',i,await ev('S.screen'));break}}
  console.log(ch,'scale elems',JSON.stringify([...await page.evaluate(()=>[...__sc])].slice(0,10)));await page.evaluate(()=>clearInterval(__scI))}
 await b.close()})();

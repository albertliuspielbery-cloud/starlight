// 拆段故事線索條：各章段數、跳過按鈕位置（第七季 vs 舊章）。node seg.js vp
const R=require('./rlib');const vp=process.argv[2]||'se';
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp,extra:{chDone:45,progs:Array(45).fill(10)}});const ev=c=>R.ev(page,c);
 for(const c of [35,37,39,40,41,42,43,44]){await ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(${c});going=false;go('story19',{mode:'seg',c:${c},k:0})})()`);await page.waitForTimeout(1500);
  const r=await page.evaluate(()=>{const s=document.querySelector('#st19skip'),cl=document.querySelector('.st19clue');return {slots:document.querySelectorAll('.st19slot').length,skip:s&&[Math.round(s.getBoundingClientRect().left),Math.round(s.getBoundingClientRect().right)],clue:cl&&Math.round(cl.getBoundingClientRect().width),W:innerWidth}});
  console.log('ch',c+1,JSON.stringify(r));if(c===39||c===40)await page.screenshot({path:__dirname+`/B_shots/seg_${vp}_ch${c+1}.png`})}
 await b.close()})();

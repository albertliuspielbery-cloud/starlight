// 大地圖第九段：節點有沒有全部畫出來（等久一點再截圖）。node probe_world.js [vp]
const L=require('../s7/lib');
const VPS={se:{width:375,height:667},ip:{width:390,height:844},landse:{width:667,height:375},padL:{width:1180,height:820}};
(async()=>{const b=await L.chromium.launch();const vn=process.argv[2]||'se';const errs=[];
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),tutWard:1});
 const {page}=await L.open(b,{ver:'app',hero:'princess',errs,owned:['full'],vp:VPS[vn],save:sv,v2:{gateTour:1}});
 await page.evaluate(()=>__ev(`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('world')})()`));await page.waitForTimeout(1500);
 await page.evaluate(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));a&&a.scrollIntoView()});
 for(const t of [700,3000]){await page.waitForTimeout(t);
  const r=await page.evaluate(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));return [...a.querySelectorAll('.wnode')].map(n=>{const s=getComputedStyle(n);const r=n.getBoundingClientRect();return {i:n.dataset.i,c:n.className,op:s.opacity,vis:s.visibility,r:[r.left|0,r.top|0,r.width|0,r.height|0],t:n.textContent.trim().replace(/\s+/g,' ').slice(0,20)}})});
  console.log(t,JSON.stringify(r));await page.screenshot({path:__dirname+`/shots/probe_world_${vn}_${t}.png`})}
 console.log('errs',errs);await b.close()})();

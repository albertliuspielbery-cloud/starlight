// 地球儀小卡的 ✕ 和「回到台灣」星星按鈕重疊：點 ✕ 的各個位置，實際點到誰。node probe_gtap.js
const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();
 for(const vp of [{width:375,height:667},{width:390,height:844}]){const errs=[];
 const {page}=await L.open(b,{ver:'app',hero:'princess',errs,owned:['full'],vp,save:L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10)}),v2:{gateTour:1}});
 await page.evaluate(()=>__ev(`go('globe8')`));await page.waitForTimeout(4500);
 await page.evaluate(()=>{__gl8.tap(__gl8.VW.cx,__gl8.VW.cy)});await page.waitForTimeout(1500);
 const r=await page.evaluate(()=>{const x=document.querySelector('#gl8card .gl8x'),t=document.querySelector('#gl8tw');const a=x.getBoundingClientRect(),c=t.getBoundingClientRect();
  const pts=[];for(let i=0;i<=4;i++)for(let j=0;j<=4;j++){const px=a.left+a.width*i/4,py=a.top+a.height*j/4;const e=document.elementFromPoint(px,py);pts.push((e&&(e.closest('#gl8tw')?'TW':e.closest('.gl8x')?'X':e.tagName)))}
  return {x:[a.left,a.top,a.width,a.height].map(Math.round),tw:[c.left,c.top,c.width,c.height].map(Math.round),pts:pts.join(',')}});
 console.log(vp.width,JSON.stringify(r));}
 await b.close()})();

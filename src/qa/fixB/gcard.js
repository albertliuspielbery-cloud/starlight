const L=require('../s7/lib');const vps=(process.argv[2]||'landse').split(',');const VP={padL:[1180,820],padP:[820,1180],ip:[390,844],se:[375,667],land:[844,390],landse:[667,375]};const tag=process.argv[3]||'gcard';
(async()=>{const b=await L.chromium.launch();
 for(const v of vps){const errs=[];const vp={width:VP[v][0],height:VP[v][1]};
 const {page,ctx}=await L.open(b,{ver:'app',hero:'princess',errs,owned:['full'],vp,save:L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10)}),v2:{gateTour:1}});
 await page.evaluate(()=>__ev(`go('globe8')`));await page.waitForTimeout(4500);
 await page.evaluate(()=>{__gl8.tap(__gl8.VW.cx,__gl8.VW.cy)});await page.waitForTimeout(1500);
 const r=await page.evaluate(()=>{const c=document.querySelector('#gl8card');const W=innerWidth,H=innerHeight;const q=s=>{const e=c.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.left,r.top,r.width,r.height].map(Math.round)};
  const btns=[...c.querySelectorAll('button')].map(b=>{const r=b.getBoundingClientRect();return b.className+':'+b.textContent.trim()+`[${r.width|0}x${r.height|0}${(r.right>W||r.bottom>H||r.left<0||r.top<0)?' OFF':''}]`});
  const t=document.querySelector('#gl8tw');const x=c.querySelector('.gl8x');const xr=x.getBoundingClientRect();const hit=document.elementFromPoint(xr.left+xr.width/2,xr.top+xr.height/2);
  const cs=getComputedStyle(c);const pr=c.offsetParent.getBoundingClientRect();return {pos:[cs.left,cs.right,cs.width,cs.transform,(pr.left|0)+"-"+(pr.right|0),c.parentElement.className],btns,html:c.innerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'').slice(0,500),xHit:hit&&(hit.closest('.gl8x')?'X':hit.className)}});
 console.log(v,JSON.stringify(r));await page.screenshot({path:`${__dirname}/shots/${tag}_app_${v}.png`});await ctx.close()}
 await b.close()})();

const {R,Q,VP,open,ev,rects}=require('./lib');
const vp=process.argv[2]||'land',code=process.argv[3]||'shape:s7grid:z4',diff=process.argv[4]||'mid',ch=+(process.argv[5]||43),sel=process.argv[6]||'.g7c';
(async()=>{const b=await R.chromium.launch();const {page,errs}=await open(b,vp);
 await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1500);
 console.log(await page.evaluate(sel=>{let e=document.querySelector(sel);const o=[];while(e&&e!==document.documentElement){const c=getComputedStyle(e);o.push(e.tagName+'.'+String(e.className).slice(0,40)+' zoom='+c.zoom+' tr='+c.transform+' w='+c.width+' st='+(e.getAttribute('style')||'').slice(0,80));e=e.parentElement}return o.join('\n')},sel));
 await b.close()})();

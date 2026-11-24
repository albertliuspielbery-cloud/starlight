const {R,Q,VP,open,ev,rects}=require('./lib');
const vp=process.argv[2]||'land',code=process.argv[3]||'shape:s7grid:z4',diff=process.argv[4]||'mid',ch=+(process.argv[5]||43),sel=(process.argv[6]||'.g7grid,.g7c').split(',');
(async()=>{const b=await R.chromium.launch();const {page,errs}=await open(b,vp);
 await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1500);
 console.log(JSON.stringify(await rects(page,['.stage','.talk','.play','.cast',...sel])));
 console.log(await page.evaluate(sel=>sel.map(s=>{const e=document.querySelector(s);if(!e)return s+' none';const c=getComputedStyle(e);return s+' gtc='+c.gridTemplateColumns+' w='+c.width+' zoom='+c.zoom+' tr='+c.transform}).join('\n'),sel));
 await page.screenshot({path:__dirname+'/shots/p3_'+vp+'.png'});await b.close()})();

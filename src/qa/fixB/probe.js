const {R,Q,VP,open,ev,rects}=require('./lib');
const vp=process.argv[2]||'land',code=process.argv[3]||'count:s7hund:100',diff=process.argv[4]||'mid',ch=+(process.argv[5]||41);
(async()=>{const b=await R.chromium.launch();const {page,errs}=await open(b,vp);
 await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1500);
 console.log(JSON.stringify(await rects(page,['#app','.stage','.stage .prompt','.stage .play','.stage .cast','#hud','.topbar','.play > *'])));
 console.log(await page.evaluate(()=>{const p=document.querySelector('.stage');return p.outerHTML.slice(0,600)}));
 await page.screenshot({path:__dirname+'/shots/probe_'+vp+'.png'});await b.close()})();

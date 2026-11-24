const {R,Q,VP,open,ev}=require('./lib');const vp=process.argv[2]||'land';
(async()=>{const b=await R.chromium.launch();const {page}=await open(b,vp,{extra:{chDone:44,progs:Array(44).fill(10).concat([3])}});
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(44);S.diff='mid';going=false;startLevel(3)})()`);await page.waitForTimeout(1500);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay button');if(o)o.click()});await page.waitForTimeout(800);
 await ev(page,`(()=>{S.q=S.qs.length-1;S.lock=false;right(document.querySelector('.stage .play')||document.body,[])})()`);await page.waitForTimeout(9000);
 console.log(await page.evaluate(()=>[...document.querySelectorAll('.overlay .card, .overlay .card button')].map(e=>{const r=e.getBoundingClientRect();return e.tagName+'.'+e.className+'#'+e.id+` [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}] `+(e.tagName==='BUTTON'?e.textContent.trim():'')}).join('\n')));
 await page.screenshot({path:__dirname+'/shots/lvdone_'+vp+'.png'});await b.close()})();

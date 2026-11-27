// 寫字板上每一點最上層是誰（擋到就畫不出來）；再用滑鼠畫一筆看有沒有墨水
const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const [w,h]=(process.argv[2]||'1133x744').split('x').map(Number);
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,vp:{width:w,height:h}});
 await page.evaluate(()=>__ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(35);S.level=8;S.q=0;S.diff='mid';S.qs=['write:ㄓ:3','quiz'];going=false;show('stage')})()`));
 await page.waitForTimeout(1500);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});
 await page.waitForTimeout(2500);
 const r=await page.evaluate(()=>{const s=document.querySelector('svg.wrb').getBoundingClientRect();const out={};for(let y=.05;y<1;y+=.15)for(let x=.05;x<1;x+=.15){const e=document.elementFromPoint(s.left+s.width*x,s.top+s.height*y);const k=e?(e.closest('svg.wrb')?'ok':(e.tagName+'.'+(e.className.baseVal!=null?e.className.baseVal:e.className))):'none';out[k]=(out[k]||0)+1}return {box:[s.left,s.top,s.width,s.height].map(Math.round),out,lock:__ev('S.lock'),st:__WR.state().phase}});
 console.log(w+'x'+h,JSON.stringify(r));
 const s=r.box;await page.mouse.move(s[0]+s[2]*.5,s[1]+s[3]*.2);await page.mouse.down();for(let i=1;i<=10;i++)await page.mouse.move(s[0]+s[2]*.5,s[1]+s[3]*(.2+i*.04));
 const ink=await page.evaluate(()=>document.querySelectorAll('svg.wrb polyline').length);await page.mouse.up();await page.waitForTimeout(500);
 console.log('ink while drawing',ink,'after',JSON.stringify(await page.evaluate(()=>{const s=__WR.state();return {ph:s.phase,k:s.k,say:s.say,log:__WR.log().slice(-1)}})));
 await page.screenshot({path:__dirname+'/hit_'+w+'.png'});
 await b.close()})();

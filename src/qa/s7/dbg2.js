const L=require('./lib');const Q=require('./qtest');
(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{ver:'web',errs});
 await page.evaluate(()=>__ev(`(()=>{setCh(40);S.prog=0;S.diff='mid';going=false;startLevel(0)})()`));await page.waitForTimeout(1200);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});await page.waitForTimeout(700);
 const n=await page.evaluate(()=>__ev('S.qs.length'));for(let q=0;q<n;q++){console.log(await Q.answer(page))}
 for(let i=0;i<12;i++){await page.waitForTimeout(800);const st=await page.evaluate(()=>__ev(`JSON.stringify({scr:S.screen,prog:S.prog,ov:[...document.querySelectorAll('.overlay')].map(o=>o.innerHTML.replace(/<svg[\\s\\S]*?<\\/svg>/g,'').replace(/\\s+/g,' ').slice(0,300))})`));console.log(st);
  await page.screenshot({path:'shots/dbg_lv'+i+'.png'});
  await page.evaluate(()=>{const vis=e=>e&&e.offsetParent!==null&&!e.disabled;const ov=[...document.querySelectorAll('.overlay')].pop();let b=ov&&([...ov.querySelectorAll('#next,#cont,#ok,.btn')].find(vis)||[...ov.querySelectorAll('button,[role=button]')].find(vis)||[...ov.querySelectorAll('.rbody *')].find(e=>vis(e)&&typeof e.onclick==='function')||[...ov.querySelectorAll('.rbody *')].find(e=>vis(e)&&getComputedStyle(e).cursor==='pointer'));if(b){b.click()}else if(!ov){const x=[...document.querySelectorAll('#st19skip,.st19next')].find(vis);x&&x.click()}})}
 console.log(errs.join('\n'));await b.close()})();

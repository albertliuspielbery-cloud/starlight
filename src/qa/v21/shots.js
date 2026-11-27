// 2.1 截圖：node shots.js 寬x高
const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const [w,h]=(process.argv[2]||'1180x820').split('x').map(Number);const tag=w+'x'+h;
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1});
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,vp:{width:w,height:h},save:sv,v2:{s3pw:1,gateTour:1}});
 const ev=c=>page.evaluate(x=>__ev(x),c);await ev(`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0})()`).catch(()=>{});
 const clean=()=>ev(`(()=>{hush();document.querySelectorAll('.overlay,#rv181').forEach(o=>o.remove());going=false;S.pmode=null})()`);
 const shot=n=>page.screenshot({path:`${__dirname}/sh/${tag}_${n}.png`});require('fs').mkdirSync(__dirname+'/sh',{recursive:true});
 for(const [n,code,ch] of [['quiz','quiz',41],['clock','clock:s7',41],['write','write:ㄙ:2',41],['hund','count:s7hund:100',41]]){
  await clean();await ev(`(()=>{setCh(${ch-1});S.diff='mid';S.level=2;S.q=0;S.qs=['${code}','quiz'];going=false;show('stage')})()`);await page.waitForTimeout(900);
  await page.evaluate(()=>{const o=document.querySelector('.stage .overlay button');o&&o.click()});await page.waitForTimeout(900);
  await ev(`(()=>{S.lock=false;right(document.querySelector('.stage .play')||document.body,['好棒'])})()`);await page.waitForTimeout(950);await shot('next_'+n)}
 await clean();await ev(`(()=>{setCh(40);S.prog=3;S.diff='mid';startLevel(3)})()`);await page.waitForTimeout(1000);await page.screenshot({path:`${__dirname}/sh/${tag}_intro.png`});
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay button');o&&o.click()});await page.waitForTimeout(600);
 await ev(`(()=>{S.lvMiss=0;S.q=S.qs.length-1;S.lock=false;right(document.querySelector('.stage .play')||document.body,[])})()`);await page.waitForTimeout(3600);await shot('lvdone');
 await clean();await ev(`(()=>{S.from='park';go('chef5')})()`);await page.waitForTimeout(2500);await shot('chef5');
 await clean();await ev(`(()=>{S.from='park';go('cashier')})()`);await page.waitForTimeout(2000);await ev(`(()=>{going=false;go('park')})()`);await page.waitForTimeout(2600);await shot('rv');
 console.log(tag,'errs',JSON.stringify(errs.filter(e=>!/promo\.json|Failed to load/.test(e)).slice(0,3)));await b.close()})();

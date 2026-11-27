const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1});
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,save:sv,v2:{s3pw:1,gateTour:1}});
 const ev=c=>page.evaluate(x=>__ev(x),c);
 await ev(`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0;hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;setCh(40);S.prog=10;S.diff='mid';startLevel(2)})()`);
 for(let i=0;i<8;i++){await page.waitForTimeout(800);console.log(await ev(`JSON.stringify({scr:S.screen,sound:S.sound,spk:SPK,hid:document.hidden,ov:[...document.querySelectorAll('#rv181,.gztour,body>.overlay')].map(e=>e.id+'.'+e.className),intro:!!document.querySelector('.stage > .overlay .card > button.btn'),in21:!!document.querySelector('.in21')})`))}
 await ev(`(()=>{going=false;go('cashier')})()`);await page.waitForTimeout(2000);await ev(`(()=>{going=false;go('park')})()`);await page.waitForTimeout(2500);
 console.log(await page.evaluate(()=>{const e=document.querySelector('#rv181');return e?e.outerHTML.slice(0,400):'none'}));
 await page.evaluate(()=>{const e=document.querySelector('#rv181');e&&e.click()});await page.waitForTimeout(800);
 console.log(await page.evaluate(()=>{const e=document.querySelector('#rv181');return e?e.className+' '+e.dataset.mode:'gone'}));
 await b.close()})();

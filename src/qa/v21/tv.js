// 有聲音：開場卡念完自動開始
const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1,sound:true});
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,save:sv,voice:true});
 const ev=c=>page.evaluate(x=>__ev(x),c);
 await ev(`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0;S.sound=true;hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;setCh(40);S.prog=10;S.diff='mid';startLevel(2)})()`);
 const t0=Date.now();let last='';
 for(let i=0;i<60;i++){const s=await ev(`JSON.stringify({spk:SPK,intro:!!document.querySelector('.stage > .overlay .card > button.btn')})`);if(s!==last){console.log(((Date.now()-t0)/1000).toFixed(1),s);last=s}if(!JSON.parse(s).intro&&i>12)break;await page.waitForTimeout(250)}
 console.log(JSON.stringify(await page.evaluate(()=>(window.__V&&__V.said||[]).slice(-6).map(x=>x.t))));console.log(await ev('String(voPlaying&&voPlaying())').catch(e=>'x'));
 await b.close()})();

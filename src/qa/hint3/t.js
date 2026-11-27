// 重現：第三步（只有小星星）閒置提示「看我再寫一次這一筆」時，提示筆畫有沒有畫出來
const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const vp=process.argv[2]?{width:+process.argv[2].split('x')[0],height:+process.argv[2].split('x')[1]}:{width:1180,height:820};
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,vp});
 const c=process.argv[3]||'ㄓ';const stg=+(process.argv[4]||2);
 await page.evaluate(([c,stg])=>__ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(36);S.level=8;S.q=0;S.diff='mid';S.qs=['write:${c}:${stg+1}','quiz'];going=false;show('stage')})()`),[c,stg]);
 await page.waitForTimeout(1500);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});
 let last='';const t0=Date.now();
 for(let i=0;i<120;i++){const s=await page.evaluate(()=>{const s=__WR.state();const svg=document.querySelector('.stage svg polyline');const pl=[...document.querySelectorAll('.stage .play svg polyline')].map(p=>(p.getAttribute('stroke')||'')+':'+(p.getAttribute('points')||'').split(' ').length+':'+getComputedStyle(p).opacity+':'+(p.parentNode.getAttribute('class')||p.parentNode.id||'')+':'+getComputedStyle(p.parentNode).opacity+':'+getComputedStyle(p.parentNode).display);return s&&{st:s.stage,ph:s.phase,say:s.say,pl}});
  const k=JSON.stringify(s);if(k!==last){console.log(((Date.now()-t0)/1000).toFixed(1),k);last=k;if(s&&s.ph==='assist')await page.screenshot({path:__dirname+'/assist_'+i+'.png'})}
  await page.waitForTimeout(250)}
 console.log('errs',errs.slice(0,5));await b.close()})();

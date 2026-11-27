// 給家長看的重點截圖（2026-11-28 星光工作室）：node pshots.js [寬x高] [hero]
const L=require('../s7/lib');
const [W,H]=(process.argv[2]||'1180x820').split('x').map(Number);const hero=process.argv[3]||'princess';
const OUT='/home/claude/w/present/p_';
(async()=>{const b=await L.chromium.launch();const errs=[];
 const sv=L.save40(hero,{chDone:50,ch:49,progs:Array(50).fill(10),wallet:300,tutWard:1});
 const {page}=await L.open(b,{ver:'app',hero,owned:['full'],errs,vp:{width:W,height:H},save:sv,v2:{s3pw:1,gateTour:1,g22:{own:{},got:Object.fromEntries([41,42,43,44,45,46,47,48,49,50].flatMap(c=>[3,6,9].map(l=>[c+'-'+l,'x']))),fresh:{}}}});
 const ev=c=>page.evaluate(x=>__ev(x),c);
 await ev(`(()=>{S.rest=0;try{TM.since=0;TM.restUntil=0;V2.dayLimit=0;window.__rtNow=()=>new Date(2026,10,28,10,0)}catch(e){}})()`).catch(()=>{});
 const clean=`hush();document.querySelectorAll('.overlay,#rv181').forEach(o=>o.remove());going=false;S.pmode=null;`;
 const Q=[['46','pin8:ㄅㄚ','a_pin'],['46','floor8:5-1','b_floor'],['46','danger8:fire46','c_danger'],['46','phone8:119','d_phone'],['47','money8:100|100','e_money'],['47','okno8:47','f_okno'],['48','deep8:safe','g_deep'],['49','tone8:ㄇㄚ','h_tone'],['49','chart8:a','i_chart'],['50','quest8:50','j_quest'],['46','write:ㄚ:1','k_write']];
 for(const [c,q,n] of Q){
  await ev(`(()=>{${clean}setCh(${+c-1});S.level=1;S.q=0;S.diff='mid';S.qs=['${q}','quiz:消防局'];S.qs.__lv=1;show('stage')})()`);
  await page.waitForTimeout(900);await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});
  await page.waitForTimeout(n==='j_quest'?5000:3200);await page.screenshot({path:OUT+n+'_'+W+'.png'})}
 await ev(`(()=>{${clean}go('world')})()`);await page.waitForTimeout(1500);await ev(`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第十段/.test(x.textContent));a&&a.scrollIntoView()})()`);await page.waitForTimeout(800);await page.screenshot({path:OUT+'w_world_'+W+'.png'});
 await ev(`(()=>{${clean}setCh(45);go('map')})()`);await page.waitForTimeout(2200);await ev(clean);await page.screenshot({path:OUT+'m_map46_'+W+'.png'});
 console.log(errs.filter(e=>!/promo|TUNNEL/.test(e)).slice(0,5).join('\n')||'no errors');await b.close()})();

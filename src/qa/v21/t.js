// 2.1 第一批測試（2026-11-27 星光工作室 Starlight Studio）：node t.js [寬x高]
const L=require('../s7/lib');
const R=[];const ok=(n,c,d='')=>{R.push([c?'ok ':'BAD',n,d]);console.log(c?'ok ':'BAD',n,d)};
(async()=>{const b=await L.chromium.launch();const errs=[];
 const [w,h]=(process.argv[2]||'1180x820').split('x').map(Number);
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1});
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,vp:{width:w,height:h},save:sv,v2:{s3pw:1,gateTour:1}});
 const ev=c=>page.evaluate(x=>__ev(x),c);
 await ev(`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0})()`).catch(()=>{});
 const clean=()=>ev(`(()=>{hush();document.querySelectorAll('.overlay,#rv181').forEach(o=>o.remove());going=false;S.pmode=null})()`);
 const intro=()=>page.evaluate(()=>!!document.querySelector('.stage > .overlay .card > button.btn'));
 // ---- 3. 開場卡：沒聲音 3.5 秒自動開始 ----
 await clean();await ev(`(()=>{S.sound=false;setCh(40);S.prog=10;S.diff='mid';startLevel(2)})()`);await page.waitForTimeout(1200);
 ok('開場卡出現',await intro());await page.waitForTimeout(1500);ok('2.7 秒時還在（沒聲音要等 3.5 秒）',await intro());
 await page.waitForTimeout(1600);ok('約 4.3 秒自動開始',!(await intro()));
 // 點卡片任何地方開始
 await clean();await ev(`(()=>{startLevel(3)})()`);await page.waitForTimeout(1200);
 await page.evaluate(()=>{const c=document.querySelector('.stage > .overlay .card h2');c&&c.click()});await page.waitForTimeout(300);ok('點卡片標題就開始',!(await intro()));await ev(`S.sound=true`);
 // ---- 2. 題數 ----
 const qn=await ev(`(()=>{const o={};for(const d of ['easy','mid','hard']){S.diff=d;const a=[];for(let i=0;i<40;i++){setCh(40+(i%5));S.level=i%9;const mp=CHAPTERS[S.ch].mix;startLevel.call(null,i%9);a.push(S.qs.filter(q=>!/^warm:/.test(q)).length);going=false}o[d]=(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2)+' max'+Math.max(...a)}return o})()`).catch(e=>String(e));
 await clean();console.log('題數',JSON.stringify(qn));
 ok('中等平均 ≤4.1、困難 ≤5.1',qn&&parseFloat(qn.mid)<=4.1&&parseFloat(qn.hard)<=5.1,JSON.stringify(qn));
 // ---- 4. 答對箭頭 0.7 秒 ----
 await clean();await ev(`(()=>{setCh(40);S.prog=10;S.diff='mid';startLevel(2)})()`);await page.waitForTimeout(1000);await page.evaluate(()=>{const o=document.querySelector('.stage .overlay button');o&&o.click()});await page.waitForTimeout(800);
 await ev(`(()=>{S.q=0;S.lock=false;right(document.querySelector('.stage .play')||document.body,['好棒'])})()`);
 let t0=Date.now(),seen=0;for(let i=0;i<30;i++){if(await page.evaluate(()=>!!document.querySelector('.nexthint'))){seen=Date.now()-t0;break}await page.waitForTimeout(100)}
 ok('答對後箭頭 0.7～1.6 秒內出現（含慶祝動畫）',seen>0&&seen<2200,seen+'ms');
 await page.screenshot({path:__dirname+`/s_nexthint_${w}.png`});
 // ---- 1. 過關卡 ----
 const ld=async(tap)=>{await clean();await ev(`(()=>{setCh(40);S.prog=3;S.diff='mid';startLevel(3)})()`);await page.waitForTimeout(1000);await page.evaluate(()=>{const o=document.querySelector('.stage .overlay button');o&&o.click()});await page.waitForTimeout(600);
  await ev(`(()=>{S.lvMiss=0;S.q=S.qs.length-1;S.lock=false;right(document.querySelector('.stage .play')||document.body,[])})()`);
  let tc=0;for(let i=0;i<60;i++){if(await page.evaluate(()=>!!document.querySelector('.stage .overlay .rhead'))){tc=Date.now();break}await page.waitForTimeout(100)}
  if(!tc)return -1;
  if(tap){await page.waitForTimeout(1900);await page.screenshot({path:__dirname+`/s_ld_arrow_${w}.png`});await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');o&&o.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}))})}
  for(let i=0;i<100;i++){const g=await page.evaluate(()=>{const c=document.querySelector('.stage .overlay .rbody');return !!(c&&!c.querySelector('.gembig'))||!!document.querySelector('#cont')});if(g)return Date.now()-tc;await page.waitForTimeout(100)}return 99999};
 const a=await ld(false);ok('過關卡不點：5 秒內出獎勵',a>0&&a<5200,a+'ms');
 const c=await ld(true);ok('過關卡 1.9 秒點一下：2.5 秒內出獎勵',c>0&&c<2600,c+'ms');
 // ---- 5. 描字示範 ----
 await clean();await ev(`(()=>{window.__wr21seen=new Set();setCh(40);S.diff='mid';S.level=1;S.q=0;S.qs=['write:ㄓ:1','write:ㄓ:1','quiz'];going=false;show('stage')})()`);await page.waitForTimeout(1000);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay button');o&&o.click()});await page.waitForTimeout(600);
 const p1=await page.evaluate(()=>__WR.state()&&__WR.state().phase);for(let i=0;i<40&&(await page.evaluate(()=>__WR.state()&&__WR.state().phase))!=='write';i++)await page.waitForTimeout(250);
 await ev(`(()=>{S.q=1;S.lock=false;renderQ()})()`);await page.waitForTimeout(500);const p2=await page.evaluate(()=>__WR.state()&&__WR.state().phase);
 ok('描字：第一次示範、第二次直接寫',p1==='demo'&&p2==='write',p1+' / '+p2);
 // ---- 9. 寫字板舊手指卡住 ----
 await ev(`(()=>{S.q=1;S.lock=false;renderQ()})()`);for(let i=0;i<40&&(await page.evaluate(()=>__WR.state()&&__WR.state().phase))!=='write';i++)await page.waitForTimeout(250);
 const wb=await page.evaluate(async()=>{const s=document.querySelector('svg.wrb');const r=s.getBoundingClientRect();const P=(t,id,x,y)=>s.dispatchEvent(new PointerEvent(t,{pointerId:id,bubbles:true,cancelable:true,clientX:r.left+r.width*x,clientY:r.top+r.height*y,pointerType:'touch',isPrimary:id===1}));
  const n0=__WR.log().length;P('pointerdown',1,.1,.9);await new Promise(z=>setTimeout(z,700));
  P('pointerdown',2,.5,.2);for(let i=1;i<=12;i++)P('pointermove',2,.5,.2+i*.04);const ink=document.querySelectorAll('svg.wrb polyline').length;P('pointerup',2,.5,.68);await new Promise(z=>setTimeout(z,300));return {ink,judged:__WR.log().length-n0}});
 ok('寫字板：舊手指卡住 0.7 秒後新手指能寫',wb.judged>=1,JSON.stringify(wb));
 // ---- 10. 公主不放大 ----
 const sp=await page.evaluate(()=>{for(const ss of document.styleSheets){try{for(const r of ss.cssRules){if(r.type===7&&r.name==='spin')return r.cssText}}catch(e){}}return ''});
 ok('spin 動畫沒有 scale',sp&&!/scale/.test(sp),sp.slice(0,120));
 // ---- 6. 遊樂園上方列 ----
 const bar=async()=>page.evaluate(()=>{const v=id=>{const e=document.getElementById(id);if(!e)return 0;const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&!e.hidden&&!document.getElementById('bar').hidden?1:0};return 'prog'+v('prog')+' map'+v('btnMap')+' home'+v('btnHome')});
 const backBtn=()=>page.evaluate(()=>{const c=[...document.querySelectorAll('#screen button, #screen [role=button]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>10&&r.top<innerHeight*.3&&r.left<innerWidth*.5&&/回|返回|離開/.test((e.textContent||'')+(e.getAttribute('aria-label')||''))});return c.length?c[0].textContent.trim().slice(0,8)||c[0].getAttribute('aria-label'):''});
 for(const g of ['park','cashier','chef5','piggy5','vine6','photo8','globe8','storyhouse','coloring','room','pethouse','practice','dex','album','rocket26','fossil26','dance','idolstage','eact','farm','recyclesort','floatsink']){
  await clean();await ev(`(()=>{S.from='park';go('${g}')})()`);await page.waitForTimeout(2200);await page.evaluate(()=>document.querySelectorAll('#rv181').forEach(x=>x.remove()));
  const s=await bar();const bk=await backBtn();const want=g==='park'?'prog0 map0 home1':'prog0 map0 home0';ok('上方列 '+g,s===want&&(g==='park'||!!bk),s+' 返回:'+bk)}
 for(const g of ['map','world']){await clean();await ev(`go('${g}')`);await page.waitForTimeout(1800);ok('上方列 '+g,(await bar()).startsWith('prog1'),await bar())}
 await clean();await ev(`(()=>{setCh(40);S.diff='mid';startLevel(2)})()`);await page.waitForTimeout(1500);ok('上方列 stage',(await bar())==='prog1 map1 home1',await bar());
 // ---- 7. 星星小考時機 ----
 await clean();await ev(`(()=>{V2.rv181=undefined;try{localStorage.removeItem('x')}catch(e){};go('title')})()`);await page.waitForTimeout(1500);
 await ev(`go('park')`);await page.waitForTimeout(2500);ok('進遊樂園不先跳星星小考',!(await page.evaluate(()=>!!document.querySelector('#rv181'))));
 await ev(`(()=>{going=false;go('cashier')})()`);await page.waitForTimeout(2000);await ev(`(()=>{going=false;go('park')})()`);await page.waitForTimeout(2500);
 const rv=await page.evaluate(()=>{const e=document.querySelector('#rv181');if(!e)return null;const l=e.querySelector('.rvlater');return l?Math.round(l.getBoundingClientRect().height):0});
 ok('從小遊戲回來才出星星小考，「等一下」≥60 高',rv>=58,String(rv));await page.screenshot({path:__dirname+`/s_rv_${w}.png`});
 await page.evaluate(()=>{const e=document.querySelector('#rv181');e&&e.click()});await page.waitForTimeout(800);ok('每日小考：點暗處不會關掉（要按按鈕）',await page.evaluate(()=>!!document.querySelector('#rv181:not(.out)')));
 const E=errs.filter(e=>!/promo\.json|Failed to load/.test(e));ok('沒有錯誤',!E.length,JSON.stringify(E.slice(0,4)));
 console.log('BAD 數',R.filter(r=>r[0]==='BAD').length);await b.close()})();

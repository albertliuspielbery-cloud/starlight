const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=39;return s};
(async()=>{const b=await L.chromium.launch();
 const errs=[];const {ctx,page}=await L.open(b,{ver:'web',fake:false,errs,save:S45('princess'),v2:{s3pw:0,parkSeen:{globe8:5,photo8:5}}});
 console.log(await ev(page,`({s3:s3Ok(),o40:__s7Open(40),ch:S.ch})`));
 await ev(page,`(()=>{going=false;go('world')})()`);await page.waitForTimeout(1500);
 await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="40"]');n&&n.click()})()`);await page.waitForTimeout(1500);
 console.log('click ch41:',await ev(page,`({scr:S.screen,ch:S.ch,gate:!!document.querySelector('.s3gate'),h:(document.querySelector('.s3gate h2')||{}).textContent})`));
 await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('park')})()`);await page.waitForTimeout(1500);
 for(const k of ['globe8','photo8']){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());const c=document.querySelector('.pcard[data-k="${k}"]');c.classList.remove('gzoff');c.click()})()`);await page.waitForTimeout(1200);
  console.log(k,await ev(page,`({scr:S.screen,gate:!!document.querySelector('.s3gate'),h:(document.querySelector('.s3gate h2')||{}).textContent})`))}
 // 直接 go('globe8')：畫面本身有沒有檢查
 await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('globe8')})()`);await page.waitForTimeout(1500);console.log('direct go globe8',await ev(page,'S.screen'));
 // 自由練習：第七季卡片
 await ev(page,`(()=>{going=false;go('practice')})()`);await page.waitForTimeout(1500);console.log('practice s7 cards',await ev(page,`[...document.querySelectorAll('.tcard')].filter(c=>/41|42|43|44|45|7/.test(c.dataset.k||'')).map(c=>c.dataset.k).slice(0,20)`));
 console.log('errs',errs);await ctx.close();await b.close()})();

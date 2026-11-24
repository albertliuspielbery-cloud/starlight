const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=39;return s};
(async()=>{const b=await L.chromium.launch();
 const errs=[];const {ctx,page}=await L.open(b,{ver:'web',fake:false,errs,save:S45('princess'),v2:{s3pw:0,parkSeen:{globe8:5,photo8:5,vine6:5}}});
 for(const i of [20,35,40,42]){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('world')})()`);await page.waitForTimeout(1300);
  const n=await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="${i}"]');return n&&n.className})()`);
  await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="${i}"]');n&&n.click()})()`);await page.waitForTimeout(1500);
  console.log(i,n,await ev(page,`({scr:S.screen,ch:S.ch,gate:!!document.querySelector('.s3gate'),h:(document.querySelector('.s3gate h2')||{}).textContent})`))}
 await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('park')})()`);await page.waitForTimeout(1500);
 await ev(page,`(()=>{const c=document.querySelector('.pcard[data-k="vine6"]');c.classList.remove('gzoff');c.click()})()`);await page.waitForTimeout(1200);
 console.log('vine6',await ev(page,`({scr:S.screen,gate:!!document.querySelector('.s3gate'),h:(document.querySelector('.s3gate h2')||{}).textContent})`));
 await ctx.close();await b.close()})();

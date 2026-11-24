const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();
 {const errs=[];const {ctx,page}=await L.open(b,{ver:'app',fake:false,errs,save:S45('princess'),owned:['full','s5to8','stage9']});
  await page.waitForTimeout(1500);
  console.log(await ev(page,`({all:STAGES.every(([id])=>stageOpen(id)),own:iapOwned(),btn:!!document.querySelector('#iaptitle')})`));
  await ev(page,`(()=>{going=false;go('world');setTimeout(()=>{going=false;go('title')},800)})()`);await page.waitForTimeout(2500);
  console.log('after re-render',await ev(page,`({btn:!!document.querySelector('#iaptitle')})`));
  for(const sc of ['park']){await ev(page,`(()=>{going=false;go('${sc}')})()`);await page.waitForTimeout(1500);console.log(sc,await ev(page,`(document.querySelector('#screen').innerText.match(/.{0,20}(NT\\$|\\$\\s?\\d).{0,10}/g)||[])`))}
  console.log(Object.keys(await ev(page,`Object.fromEntries(Object.keys(SCREENS).map(k=>[k,1]))`)).join(','));
  await ctx.close()}
 await b.close()})();

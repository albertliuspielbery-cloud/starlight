// 第七季美術接進遊戲後的截圖：8981 網頁版、8982 App 版；iPhone 直式、iPad 橫式；每章一張關卡畫面＋開場故事、房間、換裝、大結局
const L=require('/home/claude/w/s7/qa/s7/lib.js');const OUT='/home/claude/w/s7/qa/art7/live/';
const VP={iphone:{width:390,height:844},ipad:{width:1180,height:820}};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const clean=async p=>{await p.waitForTimeout(1800);for(let k=0;k<3;k++){await p.evaluate(()=>{document.querySelectorAll('.coach,.coachmark,[class*="tour"],[class*="coach"]').forEach(e=>e.remove());document.querySelectorAll('.overlay').forEach(o=>{if(!o.classList.contains('certov'))o.remove()})});await p.waitForTimeout(400)}};
(async()=>{const b=await L.chromium.launch();const errs=[];
for(const ver of ['web','app'])for(const [dn,vp] of Object.entries(VP)){const hero=dn==='iphone'?'princess':'prince';
 const owned=ver==='app'?['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']:[];
 const sv=L.save40(hero,{chDone:45,progs:Array(45).fill(10),owned:['redpanda44','bag41','beret43',hero==='prince'?'b_paint43':'dress43','shelf42','mypic45'],look:{dress:hero==='prince'?'b_paint43':'dress43',head:'beret43',pet:'redpanda44',back:''}});
 const {ctx,page}=await L.open(b,{ver,hero,errs,owned,vp,fake:false,save:sv});
 const tag=`${ver}_${dn}`;
 await ev(page,`(()=>{['redpanda44','bag41','beret43','${hero==='prince'?'b_paint43':'dress43'}'].forEach(i=>{if(!S.owned.includes(i))S.owned.push(i)});S.look.dress='${hero==='prince'?'b_paint43':'dress43'}';S.look.head='beret43';S.look.pet='redpanda44';save()})()`);
 for(const ch of [41,42,43,44,45]){
  await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(${ch-1});S.prog=1;save();going=false;startLevel(1)})()`);
  await page.waitForTimeout(1600);await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const bb=o.querySelector('button');if(bb)bb.click()}});await page.waitForTimeout(1200);
  await page.screenshot({path:`${OUT}${tag}_ch${ch}.png`})}
 // 開場故事（完整故事頁，第 1 頁、第 2 頁）
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());V2.st19off=1;setCh(40);go('story')})()`);await page.waitForTimeout(1500);
 await page.screenshot({path:`${OUT}${tag}_story41a.png`});
 await page.evaluate(()=>{const n=document.querySelector('#next');if(n)n.click()});await page.waitForTimeout(1200);await page.screenshot({path:`${OUT}${tag}_story41b.png`});
 // 房間：牆上的畫、書架
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.room=S.room||{};S.room.pic='mypic45';S.room.toy='shelf42';(S.roomOwned=S.roomOwned||[]).push('pic:mypic45','toy:shelf42');save();V2.st19off=0;go('room')})()`);await clean(page);
 await page.screenshot({path:`${OUT}${tag}_room.png`});
 await page.evaluate(()=>{const b=document.querySelector('.rmdeco');if(b)b.click()});await page.waitForTimeout(400);await ev(page,`SCREENS.room('pic')`);await clean(page);await page.screenshot({path:`${OUT}${tag}_roompic.png`});
 // 換裝間：背包
 await ev(page,`(()=>{S.look.back='bag41';S.look.head='beret43';save();go('wardrobe')})()`);await clean(page);await page.screenshot({path:`${OUT}${tag}_wardrobe.png`});
 // 寵物小屋
 await ev(page,`go('pethouse')`);await clean(page);await page.screenshot({path:`${OUT}${tag}_pet.png`});
 // 大結局
 await ev(page,`(()=>{hush();setCh(44);S.screen='chend';SCREENS.chend()})()`);await page.waitForTimeout(2500);await page.screenshot({path:`${OUT}${tag}_cert.png`});await page.evaluate(()=>document.querySelectorAll('.overlay').forEach(o=>o.remove()));await page.waitForTimeout(500);await page.screenshot({path:`${OUT}${tag}_finale.png`});
 await ctx.close()}
console.log('errs',errs.filter(e=>!/404|favicon/.test(e)).slice(0,15));await b.close()})();

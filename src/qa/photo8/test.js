// 小小攝影師自動測試：開放條件、一輪 5 張（每題先拍錯兩次再拍對）、返回、相簿；8981 網頁版、8982 App 版
const {chromium}=require('playwright');
const base=process.argv[2]||'8981';const vp=process.argv[3]||'1180x820';const lvl=process.argv[4]||'easy';
const [W,H]=vp.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push('pageerror '+e.message));p.on('console',m=>{const t=m.text();if(m.type()==='error'&&!/favicon|Failed to load resource/.test(t))errs.push('console '+t);if(/photo8|zoo8/i.test(t))errs.push('log '+t)});
 const ev=c=>p.evaluate(c=>__ev(c),c);const wait=ms=>p.waitForTimeout(ms);const log=(...a)=>console.log(base,vp,lvl,...a);
 await p.goto(`http://127.0.0.1:${base}/index.html`);await wait(3500);
 const isApp=await ev('IS_APP');if(isApp){await ev(`window.__chOpen=window.__chOpen||chOpenApp`);await ev(`iapSave(['stage2','stage3','stage4','stage5','stage6','stage7','stage8'])`)}
 // 準備存檔：完成第 43 章（還沒開）、關掉每日複習、看過大門導覽
 await ev(`S.chDone=43;V2.rvDaily=false;V2.rvMid=false;V2.gateTour=1;V2.s3pw=V2.s3pw||1;V2.parkSeen={};V2.z8got={};save();save2();try{__rawLS.del('pp4photo8')}catch(e){}`);
 await ev(`go('park')`);await wait(1500);await p.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await wait(800);
 const lock1=await p.evaluate(()=>{const c=document.querySelector('.pcard[data-k="photo8"]');return c?{lk:c.classList.contains('lockd'),txt:c.textContent}:null});log('card@43',JSON.stringify(lock1));
 await ev(`S.chDone=44;save()`);
 if(isApp){await ev(`go('title')`);await wait(1200);await ev(`go('park')`);await wait(1500);await p.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await wait(800);
  const l2=await p.evaluate(()=>{const c=document.querySelector('.pcard[data-k="photo8"]');return c?c.classList.contains('lockd'):null});log('app no stage9 locked:',l2);
  await ev(`iapSave(iapOwned().concat(['stage9']));S.chDone=44;save()`)}
 await ev(`go('title')`);await wait(1200);await ev(`go('park')`);await wait(1500);await p.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await wait(800);
 const lock2=await p.evaluate(()=>{const c=document.querySelector('.pcard[data-k="photo8"]');return c?{lk:c.classList.contains('lockd'),txt:c.textContent,vis:getComputedStyle(c).display}:null});log('card@44',JSON.stringify(lock2));
 await p.click('.pcard[data-k="photo8"]');await wait(400);await p.click('.pcard[data-k="photo8"]');await wait(1800);
 let scr=await ev('S.screen');if(scr!=='photo8'){// 網頁版季密碼
  log('screen after click',scr,await p.evaluate(()=>document.querySelector('.overlay')?document.querySelector('.overlay').textContent.slice(0,80):''));}
 log('screen',await ev('S.screen'));
 await p.screenshot({path:`shot_${base}_${vp}_menu.png`});
 await p.click(`#ph8diffs .ph8opt[data-v="${lvl}"]`);await wait(200);await p.click('#ph8go');await wait(1500);
 const G=()=>p.evaluate(()=>{const g=__p8.G();return g&&{i:g.i,q:g.q&&g.q.t,busy:g.busy,n:g.qs.length}});
 for(let r=0;r<5;r++){let g=await G();log('Q',r,g.q);
  const q=await p.evaluate(()=>{const g=__p8.G();return {sp:g.q.sp,slot:g.q._slot}});
  // 第一次：拍別的動物（找一隻不同種的、附近的）
  const wrong=await p.evaluate(()=>{const g=__p8.G();const m=g.M.find(m=>m.sp!==g.q.sp&&Math.abs(m.cx-g.M.find(x=>x.slot===g.q._slot).cx)<1600);return m&&{x:m.cx-180,y:Math.max(200,m.cy-150),w:360,h:300}});
  if(wrong){await p.evaluate(fr=>__p8.aim(fr),wrong);await wait(200);await p.click('#ph8shut');await wait(900);
   const t1=await p.textContent('#ph8tip');log(' wrong1 tip:',t1);if(r===0)await p.screenshot({path:`shot_${base}_${vp}_wrong.png`})}
  // 第二次：對著天空沒有動物的地方
  await p.evaluate(()=>__p8.aim({x:2690,y:200,w:360,h:300}));await wait(150);
  await p.click('#ph8shut');await wait(900);const t2=await p.textContent('#ph8tip');const nglow=await p.evaluate(()=>document.querySelectorAll('.z8a.glow').length);log(' wrong2 tip:',t2,'glow',nglow);
  if(r===0){await wait(700);await p.screenshot({path:`shot_${base}_${vp}_glow.png`})}
  // 拍對
  const fr=await p.evaluate(()=>{const g=__p8.G();return __p8.solve(g.M,g.q)});
  await p.evaluate(fr=>__p8.aim(fr),fr);await wait(250);
  const j=await p.evaluate(()=>{const g=__p8.G();return __p8.judge(g.M,g.q,__p8.frame())});
  if(r===1)await p.screenshot({path:`shot_${base}_${vp}_aim.png`});
  await p.click('#ph8shut');await wait(1300);
  if(r===1)await p.screenshot({path:`shot_${base}_${vp}_found.png`});
  await p.waitForFunction(i=>{const g=__p8.G();return !g||g.i>i},r,{timeout:15000}).catch(()=>log(' timeout waiting next'));
  log(' right judge ok:',!!j.ok,'strip on:',await p.evaluate(()=>document.querySelectorAll('.ph8slot.on').length));
 }
 await wait(1500);
 const end=await p.evaluate(()=>({pol:document.querySelectorAll('.ph8pol').length,img:document.querySelectorAll('.ph8pol img').length}));log('end album',JSON.stringify(end));
 await p.screenshot({path:`shot_${base}_${vp}_album.png`});
 const nA=await p.evaluate(()=>__PH8.albumGet().length);const bytes=await p.evaluate(()=>{let n=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/photo8/.test(k))n+=(localStorage.getItem(k)||'').length}return n});
 log('stored photos',nA,'bytes',bytes,'got',await ev('JSON.stringify(V2.z8got)'),'gemday',await ev('V2.photo8Day'));
 await p.click('#ph8all');await wait(900);await p.screenshot({path:`shot_${base}_${vp}_allphotos.png`});
 const nth=await p.evaluate(()=>document.querySelectorAll('.ph8th').length);log('all photos thumbs',nth);
 await p.click('.ph8th');await wait(600);await p.click('.ph8big .btn');await wait(300);await p.click('.ph8all .xclose');await wait(300);
 await p.click('#ph8again');await wait(600);log('menu again visible',await p.evaluate(()=>getComputedStyle(document.querySelector('#ph8menu')).display));
 // 再開一局，玩到一半按返回
 await p.click('#ph8go');await wait(1200);await p.click('#pback');await wait(2000);log('after back screen',await ev('S.screen'),'zone',await p.evaluate(()=>window.__gate&&__gate.cur));
 // 收集冊「我的動物園」
 await ev(`go('cbook')`);await wait(1500);
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('.cbtab b')].map(b=>b.textContent));log('book tabs',tabs.join(','));
 await p.evaluate(()=>{const t=[...document.querySelectorAll('.cbtab')].find(t=>/動物園/.test(t.textContent));if(t)t.click()});await wait(900);
 await p.screenshot({path:`shot_${base}_${vp}_book.png`});
 log('book cards',await p.evaluate(()=>{const pg=document.querySelector('.cbview .cbpg');return pg?pg.querySelector('.cbcnt').textContent+' / no:'+pg.querySelectorAll('.cbc.no').length:''}));
 await p.evaluate(()=>{const c=document.querySelector('.cbview .cbc.no');if(c)c.click()});await wait(300);
 log('locked card text',await p.evaluate(()=>{const c=document.querySelector('.cbview .cbc.no small');return c?c.textContent:''}));
 console.log('ERRORS',base,vp,errs.length?errs:'none');await b.close()})();

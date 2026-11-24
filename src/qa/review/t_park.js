// 獨立審查：地球儀、攝影師：內建語音、rAF 停止、記憶體、照片大小
const L=require('/home/claude/w/s7/qa/s7/lib.js');const fs=require('fs');
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,typeof d==='string'?d.slice(0,500):JSON.stringify(d).slice(0,500))};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const TTS=`(()=>{window.__tts=[];const U=window.SpeechSynthesisUtterance;if(U){window.SpeechSynthesisUtterance=function(t){window.__tts.push(String(t));return new U(t)};window.SpeechSynthesisUtterance.prototype=U.prototype}
 window.__raf=0;const r=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=f=>{window.__raf++;return r(f)}})()`;
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();
 for(const ver of ['web','app']){const errs=[];
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true});const page=await ctx.newPage();
  page.on('pageerror',e=>errs.push('pageerror: '+e.message));page.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
  await page.addInitScript(([sv])=>{if(sessionStorage.getItem('__i'))return;sessionStorage.setItem('__i',1);const S=Storage.prototype.setItem;
   S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero:'princess',chosen:1}]}));S.call(localStorage,'pp4',JSON.stringify(sv));
   S.call(localStorage,'pp4v2',JSON.stringify({s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1,listenFirst:false,parkSeen:{globe8:5,photo8:5}}));S.call(localStorage,'__iapmock_owned','["full","s5to8","stage9"]');S.call(localStorage,'pp4iap','["full","s5to8","stage9"]')},[S45('princess')]);
  await page.addInitScript(TTS);if(ver==='app')await page.addInitScript(fs.readFileSync('/home/claude/w/s7/qa/iapmock.js','utf8'));
  await page.goto(L.URL[ver]);await page.waitForTimeout(5000);
  console.log(ver,'VO',await ev(page,`({idx:!!VO.idx,vo:S.vo,sound:S.sound})`));
  await ev(page,`(()=>{S.sound=true;going=false;go('park')})()`);await page.waitForTimeout(1500);
  await page.mouse.click(5,5);
  await ev(page,`(()=>{const c=document.querySelector('.pcard[data-k="globe8"]');c.classList.remove('gzoff');c.click()})()`);await page.waitForTimeout(3500);
  ok(`${ver} 進得去地球儀`,(await ev(page,'S.screen'))==='globe8');
  await page.waitForTimeout(4000);
  // 閒置時 rAF 有沒有停
  let r0=await page.evaluate(()=>window.__raf);await page.waitForTimeout(2000);let r1=await page.evaluate(()=>window.__raf);
  ok(`${ver} 地球儀閒置 rAF 停下`,r1-r0<5,[r0,r1]);
  // 拖動、點幾個地方
  const box=await page.locator('#gl8cv').boundingBox();const cx=box.x+box.width/2,cy=box.y+box.height/2;
  const t0=Date.now();
  for(let i=0;i<6;i++){await page.mouse.move(cx,cy);await page.mouse.down();for(let j=0;j<12;j++){await page.mouse.move(cx-j*12,cy+j*3)}await page.mouse.up();await page.waitForTimeout(250)}
  for(const [dx,dy] of [[0,0],[30,-20],[-40,30],[60,10],[-10,-60]]){await page.mouse.click(cx+dx,cy+dy);await page.waitForTimeout(700)}
  // 測 draw 一次多久（CPU 4 倍降速模擬低階機）
  const cdp=await ctx.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});
  const ft=await page.evaluate(async()=>{const G=window.__gl8;const ts=[];let last=performance.now();for(let i=0;i<60;i++){G.VW.lam+=3;G.need();await new Promise(r=>requestAnimationFrame(r));const n=performance.now();ts.push(n-last);last=n}ts.sort((a,b)=>a-b);return {med:ts[30],p90:ts[54]}});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
  console.log(ver,'globe frame ms @6x CPU, 390x844@3x',JSON.stringify(ft));
  // 找找看高難度一輪，故意點錯兩次
  await ev(page,`(()=>{__gl8.diff('hard');__gl8.startFind();return 1})()`);await page.waitForTimeout(3000);
  for(let k=0;k<2;k++){await page.mouse.click(cx+5,cy+5);await page.waitForTimeout(1600)}
  await page.waitForTimeout(3000);
  r0=await page.evaluate(()=>window.__raf);await page.waitForTimeout(2000);r1=await page.evaluate(()=>window.__raf);
  console.log(ver,'hint 狀態下 rAF/2s',r1-r0,'F',JSON.stringify(await ev(page,`(()=>{const F=__gl8.F();return F&&{i:F.i,miss:F.miss,q:F.q}})()`)));
  // 離開：rAF 停
  await ev(page,`document.querySelector('#pback').click()`);await page.waitForTimeout(1500);
  r0=await page.evaluate(()=>window.__raf);await page.waitForTimeout(2000);r1=await page.evaluate(()=>window.__raf);
  ok(`${ver} 離開地球儀後 rAF 停`,r1-r0<5&&(await ev(page,'S.screen'))==='park',[r0,r1]);
  // 反覆進出 10 次看 heap
  const heap=async()=>{await cdp.send('HeapProfiler.collectGarbage');const m=await cdp.send('Runtime.getHeapUsage');return Math.round(m.usedSize/1e5)/10};
  const h0=await heap();
  for(let i=0;i<10;i++){await ev(page,`(()=>{going=false;go('globe8')})()`);await page.waitForTimeout(900);await ev(page,`(()=>{const b=document.querySelector('#pback');b&&b.click()})()`);await page.waitForTimeout(500)}
  await page.waitForTimeout(1500);const h1=await heap();
  for(let i=0;i<10;i++){await ev(page,`(()=>{going=false;go('globe8')})()`);await page.waitForTimeout(900);await ev(page,`(()=>{going=false;go('title')})()`);await page.waitForTimeout(500)}
  await page.waitForTimeout(1500);const h2=await heap();
  console.log(ver,'heap MB',h0,h1,h2);ok(`${ver} 地球儀進出 20 次 heap 沒有一直長`,h2-h0<8,[h0,h1,h2]);
  // 攝影師：玩一輪
  await ev(page,`(()=>{going=false;go('park')})()`);await page.waitForTimeout(1200);
  await ev(page,`(()=>{const c=document.querySelector('.pcard[data-k="photo8"]');c.classList.remove('gzoff');c.click()})()`);await page.waitForTimeout(2500);
  ok(`${ver} 進得去攝影師`,(await ev(page,'S.screen'))==='photo8');
  await page.click('#ph8diffs .ph8opt[data-v="hard"]').catch(()=>{});await page.waitForTimeout(200);await page.click('#ph8go');await page.waitForTimeout(2500);
  for(let r=0;r<5;r++){const fr=await page.evaluate(()=>{const g=__p8.G();return g&&g.q?__p8.solve(g.M,g.q):null});if(!fr)break;
   if(r===0){await page.evaluate(()=>__p8.aim({x:2690,y:200,w:360,h:300}));await page.waitForTimeout(150);await page.click('#ph8shut');await page.waitForTimeout(1500)}
   await page.evaluate(fr=>__p8.aim(fr),fr);await page.waitForTimeout(250);await page.click('#ph8shut');await page.waitForTimeout(6500)}
  await page.waitForTimeout(3000);
  const al=await ev(page,`(()=>{const a=__PH8.albumGet();return {n:a.length,sizes:a.map(p=>p.d.length),keys:Object.keys(a[0]||{})}})()`);
  console.log(ver,'album',JSON.stringify(al));ok(`${ver} 拍了照片存進相簿`,al.n>=5,al);
  // 灌到 60 張（用最大那張）→ 最多 40；算總用量
  const fill=await ev(page,`(()=>{const a=__PH8.albumGet();const big=a.reduce((m,p)=>p.d.length>m.d.length?p:m,a[0]);const k='pp4photo8';const arr=[];for(let i=0;i<60;i++)arr.push(Object.assign({},big,{t:i}));__rawLS.set(k,JSON.stringify(arr.slice(-40)));let t=0;for(let i=0;i<localStorage.length;i++){const kk=localStorage.key(i);t+=kk.length+(Storage.prototype.getItem.call(localStorage,kk)||'').length}return {photoKB:Math.round(__rawLS.get(k).length/1024),totalKB:Math.round(t/1024),max:big.d.length}})()`);
  console.log(ver,'40 張最大照片',JSON.stringify(fill));
  const tts=await ev(page,`window.__tts`);ok(`${ver} 地球儀＋攝影師沒有用到內建語音`,!tts.length,tts.slice(0,20));
  const E=errs.filter(e=>!/TUNNEL|ERR_|Failed to load resource/.test(e));ok(`${ver} 沒有 console 錯誤`,!E.length,E.slice(0,6).join(' | '));
  await ctx.close()}
 fs.writeFileSync(__dirname+'/r_park.json',JSON.stringify(R,null,1));console.log('SUMMARY',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

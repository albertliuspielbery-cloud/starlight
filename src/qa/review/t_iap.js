// 獨立審查：App 內購 stage9（不改程式，只讀）
const L=require('/home/claude/w/s7/qa/s7/lib.js');
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,typeof d==='string'?d.slice(0,400):JSON.stringify(d).slice(0,400))};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();
 // 1. 買了 stage2～8、沒買 stage9
 {const errs=[];const {ctx,page}=await L.open(b,{ver:'app',fake:false,errs,save:S45('princess'),owned:['stage2','stage3','stage4','stage5','stage6','stage7','stage8']});
  const t=await ev(page,`({st:JSON.stringify(STAGES),bu:JSON.stringify(BUNDLES.map(b=>[b[0],b[2]])),full:JSON.stringify(FULLSET),o40:__appOpen(40),o44:__appOpen(44),o39:__appOpen(39),s9:stageOpen('stage9'),iap:JSON.stringify(iapOwned()),s7on:window.__s7on,chLen:CHAPTERS.length})`);
  ok('STAGES 有 stage9 [40,45]',/\["stage9","第四十一～四十五章",40,45\]/.test(t.st),t);
  ok('s5to8 不含 stage9',!/stage9/.test(t.bu),t.bu);
  ok('沒買：41～45 章鎖',!t.o40&&!t.o44&&t.o39,t);
  await ev(page,`(()=>{going=false;go('park')})()`);await page.waitForTimeout(2000);
  const pk=await ev(page,`(()=>{const g=[...document.querySelectorAll('.pcard')].filter(c=>/globe8|photo8/.test(c.dataset.k));return g.map(c=>[c.dataset.k,c.className,c.textContent.trim().slice(0,30)])})()`);
  ok('遊樂園卡片地球儀、攝影師鎖住',pk.length===2&&pk.every(c=>/lockd/.test(c[1])),pk);
  for(const k of ['globe8','photo8']){for(let i=0;i<3;i++){await ev(page,`(()=>{const c=document.querySelector('.pcard[data-k="${k}"]');if(c){c.classList.remove('gzoff');c.click()}})()`);await page.waitForTimeout(400)}
   ok(`沒買：點 ${k} 三次不會進去`,(await ev(page,'S.screen'))==='park')}
  // 直接 go 也進不去？（記錄用）
  const priceTxt=await ev(page,`/NT\\$|\\$\\s?\\d|新台幣/.test(document.body.textContent)`);ok('遊樂園沒有價格',!priceTxt);
  for(const sc of ['world','title','wardrobe','room','book19','dex']){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;try{go('${sc}')}catch(e){}})()`);await page.waitForTimeout(1500);
   const p=await ev(page,`(()=>{const t=document.body.innerText;return {scr:S.screen,price:(t.match(/.{0,20}(NT\\$|＄|\\$\\s?\\d+|元).{0,10}/g)||[]).slice(0,4)}})()`);ok(`兒童畫面 ${sc} 沒有價格`,!p.price.some(x=>/NT\$|\$/.test(x)),p)}
  // 點地圖第 41 章
  await ev(page,`(()=>{going=false;go('world')})()`);await page.waitForTimeout(1500);
  await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="40"]');n&&n.click()})()`);await page.waitForTimeout(1500);
  ok('點第 41 章不進去、不跳商店',await ev(page,`S.screen==='world'&&!document.querySelector('.iapcard')`));
  // 商店：請求的商品 ID
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());__iapShopRaw()})()`);await page.waitForTimeout(2500);
  const sh=await ev(page,`(()=>{const c=document.querySelector('.iapcard');const gp=__iapMock.calls.filter(x=>x[0]==='getProducts').pop();return {ids:gp&&gp[1],rows:c&&[...c.querySelectorAll('.iaprow')].map(r=>r.textContent.replace(/\\s+/g,' ').trim())}})()`);
  ok('getProducts 有 tw.starlight.adventure.stage9',sh.ids&&sh.ids.includes('tw.starlight.adventure.stage9'),sh.ids);
  ok('商店 stage9 列 NT$120 可買',sh.rows&&sh.rows.some(r=>/第四十一～四十五章/.test(r)&&/NT\$120/.test(r)),sh.rows);
  // 再開一次商店：產品快取有沒有算到 stage9
  const nGP0=await ev(page,`__iapMock.calls.filter(x=>x[0]==='getProducts').length`);
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());__iapShopRaw()})()`);await page.waitForTimeout(1500);
  const nGP1=await ev(page,`__iapMock.calls.filter(x=>x[0]==='getProducts').length`);ok('商品快取（第二次不再要）',nGP1===nGP0,[nGP0,nGP1]);
  // 買
  await ev(page,`(()=>{const b=document.querySelector('[data-buy="stage9"]');b&&b.click()})()`);await page.waitForTimeout(2500);
  ok('買了 stage9 → 41 章打開',await ev(page,`stageOpen('stage9')&&__appOpen(40)&&__appOpen(44)`));
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('park')})()`);await page.waitForTimeout(1800);
  const pk2=await ev(page,`[...document.querySelectorAll('.pcard')].filter(c=>/globe8|photo8/.test(c.dataset.k)).map(c=>[c.dataset.k,c.className])`);ok('買了：卡片解鎖',pk2.every(c=>!/lockd/.test(c[1])),pk2);
  // 退款（transactionUpdated revocation）
  await ev(page,`__iapMock.setOwn(__iapMock.own().filter(x=>x!=='stage9'));__iapMock.fire('stage9',true)`);await page.waitForTimeout(500);
  ok('退款事件 → stage9 關掉',await ev(page,`!stageOpen('stage9')&&!__appOpen(40)`),await ev(page,`iapOwned()`));
  // 開 App 對帳：本機寫 stage9，App Store 沒有 → 拿掉
  await ev(page,`__rawLS.set('pp4iap',JSON.stringify(iapOwned().concat(['stage9'])))`);
  await page.reload();await page.waitForTimeout(4000);
  ok('開 App 對帳：App Store 沒有 stage9 就拿掉',await ev(page,`!stageOpen('stage9')`),await ev(page,`iapOwned()`));
  // 恢復購買
  await ev(page,`__iapMock.setOwn(__iapMock.own().concat(['stage9']));__rawLS.set('pp4iap','[]')`);
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());__iapShopRaw()})()`);await page.waitForTimeout(2000);
  await ev(page,`document.querySelector('#iaprs').click()`);await page.waitForTimeout(2500);
  ok('恢復購買 stage9',await ev(page,`stageOpen('stage9')&&stageOpen('stage5')`),await ev(page,`iapOwned()`));
  const E=errs.filter(e=>!/TUNNEL|ERR_|Failed to load resource/.test(e));ok('沒有 console 錯誤(1)',!E.length,E.slice(0,6).join(' | '));
  await ctx.close()}
 // 2. 只買合購 full＋s5to8：stage9 不能開
 {const errs=[];const {ctx,page}=await L.open(b,{ver:'app',fake:false,errs,save:S45('prince'),hero:'prince',owned:['full','s5to8']});
  const t=await ev(page,`({s8:stageOpen('stage8'),s9:stageOpen('stage9'),o40:__appOpen(40),o39:__appOpen(39),own:iapOwned()})`);
  ok('full+s5to8：stage8 開、stage9 鎖',t.s8&&!t.s9&&!t.o40&&t.o39,t);
  await ev(page,`(()=>{going=false;go('park')})()`);await page.waitForTimeout(2000);
  const pk=await ev(page,`[...document.querySelectorAll('.pcard')].filter(c=>/globe8|photo8/.test(c.dataset.k)).map(c=>[c.dataset.k,c.className])`);ok('full+s5to8：卡片鎖住',pk.length===2&&pk.every(c=>/lockd/.test(c[1])),pk);
  await ev(page,`(()=>{going=false;go('title');setTimeout(()=>__iapShopRaw(),300)})()`);await page.waitForTimeout(2500);
  const rows=await ev(page,`[...document.querySelectorAll('.iapcard .iaprow')].map(r=>r.textContent.replace(/\\s+/g,' ').trim())`);
  ok('full+s5to8 商店：s5to8 不再顯示、stage9 可買',!rows.some(r=>/二十一～四十章合購/.test(r))&&rows.some(r=>/四十一～四十五/.test(r)&&/NT\$120/.test(r)),rows);
  const tt=await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('title');return 1})()`);await page.waitForTimeout(1500);
  ok('首頁還有「家長購買新章節」',await ev(page,`!!document.querySelector('#iaptitle')`));
  const E=errs.filter(e=>!/TUNNEL|ERR_|Failed to load resource/.test(e));ok('沒有 console 錯誤(2)',!E.length,E.slice(0,6).join(' | '));
  await ctx.close()}
 // 3. 全部買齊：首頁不顯示購買按鈕；家長專區顯示已解鎖
 {const errs=[];const {ctx,page}=await L.open(b,{ver:'app',fake:false,errs,save:S45('princess'),owned:['full','s5to8','stage9']});
  await page.waitForTimeout(1500);
  ok('全買：首頁沒有「家長購買新章節」',await ev(page,`STAGES.every(([id])=>stageOpen(id))&&!document.querySelector('#iaptitle')`),await ev(page,`({btn:!!document.querySelector('#iaptitle'),scr:S.screen})`));
  await ctx.close()}
 // 4. 只買 stage9（跳段）：stage9 先解鎖上一段？41 章能不能玩
 {const errs=[];const {ctx,page}=await L.open(b,{ver:'app',fake:false,errs,save:S45('princess'),owned:['stage9']});
  const t=await ev(page,`({o40:__appOpen(40),o39:__appOpen(39)})`);console.log('only stage9',JSON.stringify(t));
  await ctx.close()}
 require('fs').writeFileSync(__dirname+'/r_iap.json',JSON.stringify(R,null,1));console.log('SUMMARY',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

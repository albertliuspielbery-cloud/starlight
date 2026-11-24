// App 付費鎖：沒買 stage9 時第 41～45 章鎖住、兒童畫面不出現價格；家長頁買了就開；恢復購買。另外拍手機直式、iPad 橫式版面。
const L=require('./lib');const fs=require('fs');
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,d)};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);const SH=__dirname+'/shots/';
(async()=>{const b=await L.chromium.launch();
 for(const hero of ['princess','prince']){const errs=[];
  const {ctx,page}=await L.open(b,{ver:'app',hero,errs,owned:['stage2','stage3','stage4','stage5','stage6','stage7','stage8']});
  const t=await ev(page,`({open40:window.__appOpen(40),open39:window.__appOpen(39),done:S.chDone,iapBtn:!!document.querySelector('#iaptitle')})`);
  ok(`${hero} 沒買 stage9：第41章鎖住`,t.open40===false&&t.open39===true,JSON.stringify(t));ok(`${hero} 首頁有「家長購買新章節」`,t.iapBtn);
  await ev(page,`go('world')`);await page.waitForTimeout(1500);
  const w=await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));if(a)a.scrollIntoView();const txt=document.querySelector('.world').textContent;return {lock:a&&[...a.querySelectorAll('.wnode')].every(n=>n.classList.contains('paidlock')),price:/NT\\$|\\$\\d|元/.test(txt)}})()`);
  ok(`${hero} 地圖第九段是付費鎖、沒有價格`,w.lock&&!w.price,JSON.stringify(w));await page.screenshot({path:SH+`app_${hero}_locked_world.png`});
  await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="40"]');n&&n.click()})()`);await page.waitForTimeout(1200);
  const k=await ev(page,`({scr:S.screen,ch:S.ch})`);ok(`${hero} 點鎖住的第41章不會進去`,k.scr==='world'&&k.ch!==40,JSON.stringify(k));
  // 兒童畫面：換裝間、遊樂園不出現價格
  for(const sc of ['wardrobe','park']){await ev(page,`(()=>{going=false;go('${sc}')})()`);await page.waitForTimeout(1500);const p=await ev(page,`/NT\\$/.test(document.getElementById('screen').textContent)`);ok(`${hero} ${sc} 沒有價格`,!p)}
  // 家長購買頁
  await ev(page,`(()=>{going=false;go('title');setTimeout(()=>__iapShopRaw(),600)})()`);await page.waitForTimeout(3500);
  const sp=await ev(page,`(()=>{const c=document.querySelector('.iapcard');if(!c)return null;const row=[...c.querySelectorAll('.iaprow')].find(r=>/第四十一～四十五章/.test(r.textContent));const b58=[...c.querySelectorAll('.iaprow')].find(r=>/第二十一～四十章合購/.test(r.textContent));
   return {row:row&&row.textContent.replace(/\\s+/g,' '),btn:!!(row&&row.querySelector('[data-buy="stage9"]')),b58:b58?b58.textContent.replace(/\\s+/g,' '):'(不顯示)',lead:(c.querySelector('.f3lead')||{}).textContent,how:[...c.querySelectorAll('.f3how li')].map(x=>x.textContent).join('｜'),seg7:!!c.querySelector('.f3seg[data-seg="s7"]')}})()`);
  ok(`${hero} 購買頁有 stage9 NT$120`,sp&&sp.btn&&/NT\$120/.test(sp.row),JSON.stringify(sp));
  await page.screenshot({path:SH+`app_${hero}_shop.png`});
  await ev(page,`(()=>{const b=document.querySelector('[data-buy="stage9"]');b&&b.click()})()`);await page.waitForTimeout(3000);
  const bo=await ev(page,`({own:stageOpen('stage9'),open40:window.__appOpen(40),mock:window.__iapMock.own()})`);ok(`${hero} 買了 stage9 就打開`,bo.own&&bo.open40,JSON.stringify(bo));
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('world')})()`);await page.waitForTimeout(1500);
  const w2=await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));return a&&[...a.querySelectorAll('.wnode')].map(n=>n.className.replace('wnode ',''))})()`);ok(`${hero} 買了以後地圖第41章可以玩`,w2&&!/paidlock/.test(w2[0]),JSON.stringify(w2));
  // 恢復購買：清掉本機紀錄再恢復
  await ev(page,`(()=>{__rawLS.set('pp4iap','[]');going=false;go('title');setTimeout(()=>__iapShopRaw(),600)})()`);await page.waitForTimeout(3000);
  await ev(page,`(()=>{const b=document.querySelector('#iaprs');b&&b.click()})()`);await page.waitForTimeout(3000);
  ok(`${hero} 恢復購買`,await ev(page,`stageOpen('stage9')&&stageOpen('stage8')`));
  const E=errs.filter(e=>!/TUNNEL|ERR_|Failed to load resource/.test(e));ok(`${hero} 沒有 console 錯誤`,!E.length,E.slice(0,5).join(' | '));await ctx.close()}
 // 版面：手機直式、iPad 橫式（網頁版，第 41～45 章各一題新題型＋地圖＋獎狀）
 const Q=require('./qtest');
 for(const [nm,vp] of [['phone',{width:395,height:859}],['ipad',{width:1180,height:820}]]){const errs=[];const {ctx,page}=await L.open(b,{ver:'web',errs,vp});
  await ev(page,`go('world')`);await page.waitForTimeout(1500);await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));a&&a.scrollIntoView()})()`);await page.waitForTimeout(500);await page.screenshot({path:SH+`${nm}_world.png`});
  for(const [c,d,ch] of [['shape:s7grid:z4','hard',44],['shape:s7grid:z1','easy',44],['letter:s7floor:a|b|c|d','hard',43],['letter:s7floor:a|b','easy',43],['letter:s7case:a|b|c|d','hard',44],['count:s7hund:100','mid',42],['count:s7ord:10','hard',42],['count:s7queue','mid',43],['measure:s7blk','easy',43],['measure:s7blk','hard',43],['count:s7five:30','hard',41],['letter:k7lo:b|d','hard',44],['clock:s7','hard',41],['zhuyin:hear7:ㄩ','mid',44]]){
   await Q.playQ(page,c,d,ch);await page.waitForTimeout(600);const of=await page.evaluate(()=>{const p=document.querySelector('.stage .play');if(!p)return null;const r=p.getBoundingClientRect();const over=[...p.querySelectorAll('button')].filter(b=>{const q=b.getBoundingClientRect();return q.width&&(q.right>innerWidth+2||q.left<-2||q.bottom>innerHeight+2)}).length;return {over,sw:document.documentElement.scrollWidth>innerWidth}});
   ok(`${nm} 版面 ${c} ${d}`,of&&!of.over&&!of.sw,JSON.stringify(of));await page.screenshot({path:SH+`${nm}_${c.replace(/[:|]/g,'_')}_${d}.png`})}
  await ev(page,`(()=>{V2[CERT7K()]={d:'2026-11-23'};cert7Show()})()`);await page.waitForTimeout(800);await page.screenshot({path:SH+`${nm}_cert7.png`});
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());window.__abcSong7(()=>{})})()`);await page.waitForTimeout(6000);await page.screenshot({path:SH+`${nm}_abc.png`});
  await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());S.owned.push('dress43','b_paint43','redpanda44','beret43','bag41');S.roomOwned.push('pic:mypic45');S.room.pic='mypic45';going=false;go('room','pic')})()`);await page.waitForTimeout(1500);await page.screenshot({path:SH+`${nm}_room_pic.png`});
  const E=errs.filter(e=>!/TUNNEL|ERR_|Failed to load resource/.test(e));ok(`${nm} 沒有 console 錯誤`,!E.length,E.slice(0,5).join(' | '));await ctx.close()}
 fs.writeFileSync(__dirname+'/result_lock.json',JSON.stringify(R,null,1));console.log('SUMMARY lock',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

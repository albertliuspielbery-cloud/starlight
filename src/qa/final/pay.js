// 5.4.0 付費測試（App 版 8982，假商店 iapmock.js）。node pay.js
// A 沒買 stage9：第 41～45 章、地球儀、攝影師都鎖；兒童畫面沒有價格
// B 在家長購買頁買 stage9：全開
// C 只有「第二十一～四十章合購」s5to8：第 21～40 章開、第 41～45 章不開
// D 恢復購買：清掉本機購買紀錄後恢復，stage9 回來；只買 s5to8 的人恢復後 stage9 仍鎖
const L=require('../s7/lib');const fs=require('fs');
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,d)};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);const SH=__dirname+'/shots/pay_';
const PRICE=/NT\$|US\$|＄|\$\s?\d|\d+\s?元/;
const reload=async p=>{await p.reload();await p.waitForFunction(()=>typeof window.__ev==='function',null,{timeout:90000});await p.waitForTimeout(3000)};
const S28=['stage2','stage3','stage4','stage5','stage6','stage7','stage8'];
async function parkCards(page){await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('park')})()`);await page.waitForTimeout(1800);
 await page.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await page.waitForTimeout(900);
 return page.evaluate(()=>{const g=k=>{const c=document.querySelector(`.pcard[data-k="${k}"]`);return c?{lk:c.classList.contains('lockd'),t:c.textContent.trim().replace(/\s+/g,' ')}:null};return {globe:g('globe8'),photo:g('photo8')}})}
async function tryEnter(page,k){for(let i=0;i<3;i++){await page.evaluate(k=>{const c=document.querySelector(`.pcard[data-k="${k}"]`);if(c)c.click()},k);await page.waitForTimeout(900)}
 const r=await ev(page,`({scr:S.screen,ov:[...document.querySelectorAll('.overlay')].map(o=>o.textContent.replace(/\\s+/g,' ').slice(0,120))})`);
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false})()`);return r}
async function kidScreensNoPrice(page,hero,tag){const bad=[];
 for(const sc of ['title','world','map','park','wardrobe','room','pethouse','cbook','storyhouse','chapters']){
  const okGo=await ev(page,`(()=>{try{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;if(!SCREENS['${sc}'])return false;go('${sc}');return true}catch(e){return 'ERR '+e.message}})()`);if(okGo!==true)continue;
  await page.waitForTimeout(1500);
  const t=await page.evaluate(()=>{const s=document.getElementById('screen');return s?s.innerText:''});const m=t.match(PRICE);if(m)bad.push(sc+':'+t.slice(Math.max(0,m.index-20),m.index+20).replace(/\s+/g,' '));
  const buy=await page.evaluate(()=>[...document.querySelectorAll('#screen button,#screen [role=button]')].filter(b=>b.offsetParent&&/購買|買下|付費|\bbuy\b/i.test(b.textContent)).map(b=>b.id+':'+b.textContent.trim().slice(0,20)));
  if(buy.length)bad.push(sc+' 購買鈕:'+buy.join(','));
  if(sc==='world'||sc==='park')await page.screenshot({path:SH+`${tag}_${hero}_${sc}.png`})}
 return bad}
(async()=>{const b=await L.chromium.launch();
 for(const hero of ['princess','prince']){
  // ---------- A：沒買 stage9（第 45 章都完成的存檔，只看付費鎖） ----------
  {const errs=[];const sv=L.save40(hero,{chDone:45,ch:44,progs:Array(45).fill(10)});
   const {ctx,page}=await L.open(b,{ver:'app',hero,errs,owned:S28,save:sv});
   const o=await ev(page,`[39,40,41,42,43,44].map(i=>window.__appOpen(i))`);ok(`${hero} A 沒買 stage9：__appOpen 第40～45章`,o[0]===true&&o.slice(1).every(x=>x===false),JSON.stringify(o));
   ok(`${hero} A stageOpen('stage9')=false`,await ev(page,`!stageOpen('stage9')&&stageOpen('stage8')`));
   await ev(page,`(()=>{going=false;go('world')})()`);await page.waitForTimeout(1500);
   const w=await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));if(a)a.scrollIntoView();return a?[...a.querySelectorAll('.wnode')].map(n=>n.className.replace('wnode ','')):null})()`);
   ok(`${hero} A 地圖第九段五章都是付費鎖`,!!w&&w.length===5&&w.every(c=>/paidlock/.test(c)),JSON.stringify(w));
   for(const i of [40,44]){await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="${i}"]');n&&n.click()})()`);await page.waitForTimeout(1500);
    const k=await ev(page,`({scr:S.screen,ov:[...document.querySelectorAll('.overlay')].map(o=>o.innerText.replace(/\\s+/g,' ').slice(0,150))})`);
    ok(`${hero} A 點第${i+1}章不會進去、沒有價格`,k.scr==='world'&&!k.ov.some(t=>PRICE.test(t)),JSON.stringify(k));if(i===40)await page.screenshot({path:SH+`A_${hero}_tap41.png`});
    await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove())})()`)}
   // 直接叫 startLevel 也不能玩（防止從別的入口進去）
   const pc=await parkCards(page);ok(`${hero} A 遊樂園地球儀、攝影師上鎖`,pc.globe&&pc.globe.lk&&pc.photo&&pc.photo.lk&&!PRICE.test(pc.globe.t+pc.photo.t),JSON.stringify(pc));
   await page.screenshot({path:SH+`A_${hero}_park_games.png`});
   for(const k of ['globe8','photo8']){await parkCards(page);const r=await tryEnter(page,k);ok(`${hero} A 點${k}不會進去、沒有價格`,r.scr==='park'&&!r.ov.some(t=>PRICE.test(t)),JSON.stringify(r))}
   const bad=await kidScreensNoPrice(page,hero,'A');ok(`${hero} A 兒童畫面沒有價格、購買鈕`,!bad.length,bad.join(' | '));
   // ---------- B：家長購買頁買 stage9 ----------
   await ev(page,`(()=>{going=false;go('title');setTimeout(()=>__iapShopRaw(),600)})()`);await page.waitForTimeout(3500);
   const sp=await ev(page,`(()=>{const c=document.querySelector('.iapcard');if(!c)return null;const row=[...c.querySelectorAll('.iaprow')].find(r=>/第四十一～四十五章/.test(r.textContent));const b58=[...c.querySelectorAll('.iaprow')].find(r=>/第二十一～四十章合購/.test(r.textContent));return {row:row&&row.textContent.replace(/\\s+/g,' '),btn:!!(row&&row.querySelector('[data-buy="stage9"]')),b58:b58?b58.textContent.replace(/\\s+/g,' '):null}})()`);
   const rowsAll=await ev(page,`[...document.querySelectorAll('.iapcard .iaprow')].map(r=>r.textContent.replace(/\\s+/g,' ').slice(0,60)+' ['+[...r.querySelectorAll('[data-buy]')].map(x=>x.dataset.buy).join(',')+']')`);
   ok(`${hero} B 購買頁有「第四十一～四十五章」stage9 NT$120（照 brief）`,sp&&sp.btn&&/NT\$120/.test(sp.row),JSON.stringify(sp)+' 購買列='+JSON.stringify(rowsAll));
   ok(`${hero} B 購買頁合購 s5to8 沒寫包含第四十一章`,!sp||!sp.b58||!/四十一|四十五/.test(sp.b58),JSON.stringify(sp&&sp.b58));
   await page.screenshot({path:SH+`B_${hero}_shop.png`});
   const buyId=sp&&sp.btn?'stage9':'full';
   await ev(page,`(()=>{const b=document.querySelector('[data-buy="${buyId}"]');b&&b.click()})()`);await page.waitForTimeout(3500);
   ok(`${hero} B 買了 ${buyId}`,await ev(page,`__iapMock.own().includes('${buyId}')`),buyId);
   const bo=await ev(page,`({own:stageOpen('stage9'),open:[40,41,42,43,44].map(i=>window.__appOpen(i)),mock:window.__iapMock.own()})`);ok(`${hero} B 買了 stage9：第41～45章全開`,bo.own&&bo.open.every(Boolean),JSON.stringify(bo));
   await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('world')})()`);await page.waitForTimeout(1500);
   const w2=await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));return a&&[...a.querySelectorAll('.wnode')].map(n=>n.className.replace('wnode ',''))})()`);ok(`${hero} B 地圖第九段沒有付費鎖`,w2&&w2.every(c=>!/paidlock|lock/.test(c)),JSON.stringify(w2));
   const pc2=await parkCards(page);ok(`${hero} B 地球儀、攝影師打開`,pc2.globe&&!pc2.globe.lk&&pc2.photo&&!pc2.photo.lk,JSON.stringify(pc2));
   const g=await tryEnter(page,'globe8');ok(`${hero} B 進得去地球儀`,g.scr==='globe8',JSON.stringify(g));await ev(page,`(()=>{going=false;go('park')})()`);await page.waitForTimeout(1500);
   await parkCards(page);const ph=await tryEnter(page,'photo8');ok(`${hero} B 進得去攝影師`,ph.scr==='photo8',JSON.stringify(ph));
   await ev(page,`(()=>{going=false;go('title')})()`);await page.waitForTimeout(800);
   await ev(page,`(()=>{hush();setCh(40);S.prog=0;going=false;startLevel(0)})()`);await page.waitForTimeout(1500);ok(`${hero} B 第41章第1關進得去`,await ev(page,`S.screen==='stage'&&S.ch===40`));
   // ---------- D：恢復購買 ----------
   await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());__rawLS.set('pp4iap','[]');__iapMock.setOwn([]);going=false;go('title')})()`);await reload(page);
   await ev(page,`__iapMock.setOwn(${JSON.stringify(S28.concat(['stage9']))})`);
   const cl=await ev(page,`({s9:stageOpen('stage9'),s8:stageOpen('stage8'),o40:window.__appOpen(40)})`);
   await ev(page,`(()=>{going=false;go('title');setTimeout(()=>__iapShopRaw(),600)})()`);await page.waitForTimeout(3500);
   await ev(page,`(()=>{const b=document.querySelector('#iaprs');b&&b.click()})()`);await page.waitForTimeout(3500);
   const rs=await ev(page,`({s9:stageOpen('stage9'),s8:stageOpen('stage8'),o40:window.__appOpen(40),o44:window.__appOpen(44),txt:(document.querySelector('.iapcard')||document.body).innerText.replace(/\\s+/g,' ').slice(0,200)})`);
   ok(`${hero} D 清掉本機紀錄再恢復購買：stage9、stage8 回來`,!cl.s9&&!cl.s8&&rs.s9&&rs.s8&&rs.o40&&rs.o44,'清掉後 '+JSON.stringify(cl)+' 恢復後 '+JSON.stringify(rs));
   const E=errs.filter(e=>!/promo\.json/.test(e));ok(`${hero} A/B/D 沒有 console 錯誤`,!E.length,E.slice(0,6).join(' | '));await ctx.close()}
  // ---------- E：商店紀錄只有 stage2～9（單段買齊）／F：只有 full ----------
  for(const [nm,own] of [['E 單段 stage2～9',S28.concat(['stage9'])],['F 只有 full',['full']],['G 只有 stage9（沒買前面）',['stage9']]]){const errs=[];const sv=L.save40(hero,{chDone:45,ch:44,progs:Array(45).fill(10)});
   const {ctx,page}=await L.open(b,{ver:'app',hero,errs,owned:own,save:sv});
   const o=await ev(page,`({o:[5,20,39,40,44].map(i=>window.__appOpen(i)),s9:stageOpen('stage9')})`);const pc=await parkCards(page);
   R.push(['INFO',`${hero} ${nm}：__appOpen 第6/21/40/41/45章、stage9、遊樂園`,JSON.stringify(o)+' '+JSON.stringify(pc)]);console.log('INFO',R[R.length-1][1],R[R.length-1][2]);
   if(nm[0]!=='G')ok(`${hero} ${nm}：第41～45章、地球儀、攝影師都開`,o.o[3]&&o.o[4]&&o.s9&&!pc.globe.lk&&!pc.photo.lk,JSON.stringify(o)+JSON.stringify(pc));
   const E=errs.filter(e=>!/promo\.json/.test(e));ok(`${hero} ${nm} 沒有 console 錯誤`,!E.length,E.slice(0,6).join(' | '));await ctx.close()}
  // ---------- C：只有合購 s5to8 ----------
  {const errs=[];const sv=L.save40(hero,{chDone:45,ch:44,progs:Array(45).fill(10)});
   const {ctx,page}=await L.open(b,{ver:'app',hero,errs,owned:['stage2','stage3','stage4','s5to8'],save:sv});
   const o=await ev(page,`({open:[20,25,30,35,39].map(i=>window.__appOpen(i)),s7:[40,41,42,43,44].map(i=>window.__appOpen(i)),s9:stageOpen('stage9'),st:['stage5','stage6','stage7','stage8'].map(stageOpen)})`);
   ok(`${hero} C 合購 s5to8：第21～40章開`,o.open.every(Boolean)&&o.st.every(Boolean),JSON.stringify(o));
   ok(`${hero} C 合購 s5to8：第41～45章不開`,o.s7.every(x=>!x)&&!o.s9,JSON.stringify(o));
   const pc=await parkCards(page);ok(`${hero} C 合購 s5to8：地球儀、攝影師仍鎖`,pc.globe&&pc.globe.lk&&pc.photo&&pc.photo.lk,JSON.stringify(pc));
   // 恢復購買：只會回來 s5to8 的內容
   await ev(page,`(()=>{__rawLS.set('pp4iap','[]');__iapMock.setOwn([])})()`);await reload(page);
   const cl=await ev(page,`({s5:stageOpen('stage5'),s8:stageOpen('stage8')})`);await ev(page,`__iapMock.setOwn(['stage2','stage3','stage4','s5to8'])`);
   await ev(page,`(()=>{going=false;go('title');setTimeout(()=>__iapShopRaw(),600)})()`);await page.waitForTimeout(3500);
   const sp=await ev(page,`(()=>{const c=document.querySelector('.iapcard');const row=c&&[...c.querySelectorAll('.iaprow')].find(r=>/第四十一～四十五章/.test(r.textContent));return {btn9:!!(row&&row.querySelector('[data-buy="stage9"]')),full:!!(c&&c.querySelector('[data-buy="full"]'))}})()`);
   await ev(page,`(()=>{const b=document.querySelector('#iaprs');b&&b.click()})()`);await page.waitForTimeout(3500);
   const rs=await ev(page,`({s8:stageOpen('stage8'),s5:stageOpen('stage5'),s9:stageOpen('stage9'),o40:window.__appOpen(40)})`);
   ok(`${hero} C 恢復購買（只買合購）：stage5～8 回來、stage9 仍鎖`,!cl.s5&&!cl.s8&&rs.s8&&rs.s5&&!rs.s9&&!rs.o40,'清掉後 '+JSON.stringify(cl)+' 恢復後 '+JSON.stringify(rs));
   ok(`${hero} C 購買頁還買得到第41～45章（stage9 或 full）`,sp.btn9||sp.full,JSON.stringify(sp));await page.screenshot({path:SH+`C_${hero}_shop.png`});
   const E=errs.filter(e=>!/promo\.json/.test(e));ok(`${hero} C 沒有 console 錯誤`,!E.length,E.slice(0,6).join(' | '));await ctx.close()}}
 fs.writeFileSync(__dirname+'/logs/pay_result.json',JSON.stringify(R,null,1));console.log('SUMMARY pay',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

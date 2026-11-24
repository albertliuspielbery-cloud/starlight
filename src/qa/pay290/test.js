// 5.4.0 只賣「完整版」full NT$290 測試（App 8982＋網頁版 8981）。2026-11-24 星光工作室 Starlight Studio
// 用法：NODE_PATH=$(npm root -g) node /home/claude/w/s7/qa/pay290/test.js
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const MOCK=fs.readFileSync(path.join(__dirname,'../iapmock.js'),'utf8');
const URL={web:'http://127.0.0.1:8981/index.html',app:'http://127.0.0.1:8982/index.html'};
const SH=__dirname+'/shots/';fs.mkdirSync(SH,{recursive:true});
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,v?'':d)};
const PRICE=/NT\$|US\$|＄|\$\s?\d|\d+\s?元/;
const ALL=Array.from({length:45},(_,i)=>i);
const EXPIRED=JSON.stringify({start:'2026-01-01',days:30});   // 限時活動已結束（不然沒設定時會自動送第六～十五章）
function save45(hero,extra={}){return Object.assign({look:{dress:hero==='prince'?'b_basic':'basic',pet:'unicorn'},owned:[],wallet:200,progs:Array(45).fill(10),ch:44,chDone:45,diff:'mid',sound:false,music:false,voice:true,name:'',vo:true,rest:0},extra)}
async function open(b,{ver='app',hero,owned=[],local=null,v2={},promoCfg=EXPIRED,errs=[],vp={width:1180,height:820}}){
 const ctx=await b.newContext({viewport:vp,deviceScaleFactor:1});const page=await ctx.newPage();
 await page.route(/promo\.json/,r=>r.fulfill({status:404,body:''}));
 page.on('pageerror',e=>errs.push('pageerror: '+e.message));
 page.on('console',m=>{const t=m.text();if(m.type()==='error'&&!/promo\.json|Failed to load resource/.test(t))errs.push('console: '+t);if(/^pay290/.test(t))errs.push('log: '+t)});
 await page.addInitScript(([hero,sv,v2,owned,local,pc])=>{try{const S=Storage.prototype.setItem;if(!sessionStorage.getItem('__init')){sessionStorage.setItem('__init','1');
   S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero,chosen:1}]}));
   S.call(localStorage,hero==='prince'?'pp4:prince':'pp4',JSON.stringify(sv));
   S.call(localStorage,'pp4v2',JSON.stringify(Object.assign({listenFirst:false,s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1},v2)));
   S.call(localStorage,'__iapmock_owned',JSON.stringify(owned));
   S.call(localStorage,'pp4iap',JSON.stringify(local||owned));
   if(pc)S.call(localStorage,'pp4promoCfg',pc)}}catch(e){}},[hero,save45(hero),v2,owned,local,promoCfg]);
 if(ver==='app')await page.addInitScript(MOCK);
 await page.goto(URL[ver]);
 await page.waitForFunction(()=>typeof window.__ev==='function'&&document.querySelector('#screen'),null,{timeout:90000});
 await page.waitForTimeout(3000);return {ctx,page,errs}}
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const clr=p=>ev(p,`(()=>{try{hush()}catch(e){}document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false})()`);
const opens=p=>ev(p,`${JSON.stringify(ALL)}.map(i=>!!window.__appOpen(i))`);
const range=(o,a,z)=>o.slice(a,z+1);
async function shopInfo(p){await clr(p);await ev(p,`(()=>{go('title');setTimeout(()=>__iapShopRaw(),500)})()`);await p.waitForTimeout(3000);
 return ev(p,`(()=>{const c=document.querySelector('.iapcard');if(!c)return null;const rows=[...c.querySelectorAll('.iaprow')];const how=c.querySelector('.f3how');
  return {n:rows.length,row:rows.map(r=>r.innerText.replace(/\\s+/g,' ')).join(' / '),buy:[...c.querySelectorAll('[data-buy]')].map(b=>b.dataset.buy+':'+b.textContent),
   how:how?how.innerText.replace(/\\s+/g,' '):'',lead:(c.querySelector('.f3lead')||{}).textContent||'',all:c.innerText.replace(/\\s+/g,' '),
   tags:[...c.querySelectorAll('.f3seg .f3tag')].map(t=>t.textContent),prm:(c.querySelector('.prm52line')||{}).textContent||'',rec:!!c.querySelector('.prm52rec'),
   calls:__iapMock.calls.filter(x=>x[0]==='getProducts').map(x=>x[1])}})()`)}
const BAD=/合購|分段|每段|一段一段|先解鎖上一段|第四十一～四十五章 NT|NT\$120|NT\$390/;
async function parkCards(p){await clr(p);await ev(p,`go('park')`);await p.waitForTimeout(1800);
 await p.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await p.waitForTimeout(900);
 return p.evaluate(()=>{const g=k=>{const c=document.querySelector(`.pcard[data-k="${k}"]`);return c?{lk:c.classList.contains('lockd'),t:c.textContent.trim().replace(/\s+/g,' ')}:null};return {globe:g('globe8'),photo:g('photo8')}})}
async function tryEnter(p,k){for(let i=0;i<3;i++){await p.evaluate(k=>{const c=document.querySelector(`.pcard[data-k="${k}"]`);if(c)c.click()},k);await p.waitForTimeout(900)}
 const r=await ev(p,`({scr:S.screen,ov:[...document.querySelectorAll('.overlay')].map(o=>o.textContent.replace(/\\s+/g,' ').slice(0,120))})`);await clr(p);return r}
async function kidNoPrice(p,tag){const bad=[];
 for(const sc of ['title','world','park','wardrobe','room','pethouse','cbook','storyhouse','chapters']){
  const g=await ev(p,`(()=>{try{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;if(!SCREENS['${sc}'])return false;go('${sc}');return true}catch(e){return 'ERR '+e.message}})()`);if(g!==true)continue;
  await p.waitForTimeout(1300);
  const t=await p.evaluate(()=>{const s=document.getElementById('screen');return s?s.innerText:''});const m=t.match(PRICE);if(m)bad.push(sc+':'+t.slice(Math.max(0,m.index-20),m.index+20).replace(/\s+/g,' '));
  const ov=await p.evaluate(()=>[...document.querySelectorAll('.overlay')].map(o=>o.innerText).join(' '));const m2=ov.match(PRICE);if(m2)bad.push(sc+' overlay:'+ov.slice(Math.max(0,m2.index-20),m2.index+20));
  if(sc==='world'||sc==='park')await p.screenshot({path:SH+`${tag}_${sc}.png`})}
 // 點鎖住的章節：只說請爸爸媽媽，不跳商店
 await ev(p,`(()=>{going=false;go('world')})()`);await p.waitForTimeout(1300);
 const i=await ev(p,`(()=>{const n=[...document.querySelectorAll('.wnode.paidlock')][0];if(!n)return -1;n.click();return +n.dataset.i})()`);await p.waitForTimeout(1300);
 if(i>=0){const k=await ev(p,`({scr:S.screen,ov:[...document.querySelectorAll('.overlay')].map(o=>o.innerText.replace(/\\s+/g,' ').slice(0,150))})`);if(k.scr!=='world'||k.ov.some(t=>PRICE.test(t)))bad.push('點鎖住第'+(i+1)+'章:'+JSON.stringify(k))}
 await clr(p);return bad}
const noErr=(k,errs)=>ok(k+' 沒有 console 錯誤',!errs.length,errs.slice(0,5).join(' | '));
(async()=>{const b=await chromium.launch();
 try{
 for(const hero of ['princess','prince']){const H=hero==='prince'?'王子':'公主';
  // ---------- A 沒買任何東西 → B 在購買頁買 full ----------
  {const errs=[];const {ctx,page:p}=await open(b,{hero,errs});
   const o=await opens(p);ok(`${H} A 沒買：第1～5章開、第6～45章鎖`,range(o,0,4).every(Boolean)&&range(o,5,44).every(x=>!x),JSON.stringify(o));
   const pc=await parkCards(p);ok(`${H} A 地球儀、攝影師上鎖`,pc.globe&&pc.globe.lk&&pc.photo&&pc.photo.lk,JSON.stringify(pc));
   for(const k of ['globe8','photo8']){await parkCards(p);const r=await tryEnter(p,k);ok(`${H} A 點${k}進不去、沒有價格`,r.scr==='park'&&!r.ov.some(t=>PRICE.test(t)),JSON.stringify(r))}
   await clr(p);await ev(p,`go('title')`);await p.waitForTimeout(1200);ok(`${H} A 首頁有「家長購買新章節」`,await ev(p,`!!document.querySelector('#iaptitle')`));
   const bad=await kidNoPrice(p,`A_${hero}`);ok(`${H} A 兒童畫面沒有價格、點鎖住章節不跳商店`,!bad.length,bad.join(' | '));
   const s=await shopInfo(p);await p.screenshot({path:SH+`A_${hero}_shop.png`,fullPage:false});
   await p.evaluate(()=>{const c=document.querySelector('.f3buyh');c&&c.scrollIntoView()});await p.waitForTimeout(300);await p.screenshot({path:SH+`A_${hero}_shop_buy.png`});
   ok(`${H} A 購買頁只有一列「完整版」NT$290`,s&&s.n===1&&/完整版：第六章以後全部章節/.test(s.row)&&/一次購買永久使用，之後新增的章節也包含。/.test(s.row)&&s.buy.length===1&&s.buy[0]==='full:NT$290',JSON.stringify(s&&{n:s.n,row:s.row,buy:s.buy}));
   ok(`${H} A 購買頁沒有分段價格、合購字樣`,s&&!BAD.test(s.all),s&&(s.all.match(new RegExp('.{0,30}('+BAD.source+').{0,30}'))||[''])[0]);
   ok(`${H} A 只向商店查 full（沒查 stage9）`,s&&s.calls.length>=1&&s.calls.every(c=>JSON.stringify(c)==='["tw.starlight.adventure.full"]'),JSON.stringify(s&&s.calls));
   ok(`${H} A 各段介紹沒有價格`,s&&s.tags.every(t=>!PRICE.test(t)),JSON.stringify(s&&s.tags));
   ok(`${H} A 說明文字：完整版、之後新增也包含`,s&&/第六～四十五章全部打開/.test(s.lead)&&/「完整版」NT\$290，一次購買永久使用/.test(s.how),JSON.stringify(s&&{lead:s.lead,how:s.how}));
   ok(`${H} A 恢復購買、兌換碼還在`,await ev(p,`!!document.querySelector('#iaprs')&&!!document.querySelector('#iapcode')`));
   // B 買 full
   await ev(p,`(()=>{const b=document.querySelector('[data-buy="full"]');b&&b.click()})()`);await p.waitForTimeout(3500);
   const o2=await opens(p);ok(`${H} B 買了 full：第1～45章全開`,o2.every(Boolean),JSON.stringify(o2));
   const s2=await ev(p,`(()=>{const c=document.querySelector('.iapcard');return c?{row:[...c.querySelectorAll('.iaprow')].map(r=>r.innerText.replace(/\\s+/g,' ')).join('/'),buy:c.querySelectorAll('[data-buy]').length,how:(c.querySelector('.f3how')||{}).innerText||''}:null})()`);
   ok(`${H} B 購買頁顯示「已解鎖全部章節」`,s2&&/已解鎖全部章節/.test(s2.row)&&s2.buy===0,JSON.stringify(s2));await p.screenshot({path:SH+`B_${hero}_shop_after.png`});
   ok(`${H} B stageOpen stage9＝true（full 動態包含）`,await ev(p,`stageOpen('stage9')&&STAGES.every(s=>stageOpen(s[0]))`));
   const pc2=await parkCards(p);ok(`${H} B 地球儀、攝影師打開`,pc2.globe&&!pc2.globe.lk&&pc2.photo&&!pc2.photo.lk,JSON.stringify(pc2));
   const g=await tryEnter(p,'globe8');ok(`${H} B 進得去地球儀`,g.scr==='globe8',JSON.stringify(g));
   await parkCards(p);const ph=await tryEnter(p,'photo8');ok(`${H} B 進得去攝影師`,ph.scr==='photo8',JSON.stringify(ph));
   await clr(p);await ev(p,`(()=>{setCh(40);S.prog=0;startLevel(0)})()`);await p.waitForTimeout(1500);ok(`${H} B 第41章第1關進得去`,await ev(p,`S.screen==='stage'&&S.ch===40`));
   await clr(p);await ev(p,`go('title')`);await p.waitForTimeout(800);ok(`${H} B 首頁沒有「家長購買新章節」`,await ev(p,`!document.querySelector('#iaptitle')`));
   const bad2=await kidNoPrice(p,`B_${hero}`);ok(`${H} B 兒童畫面沒有價格`,!bad2.length,bad2.join(' | '));
   noErr(`${H} A/B`,errs);await ctx.close()}
  // ---------- C 舊存檔只有 full（5.3.1 買過第六～二十章合購） ----------
  {const errs=[];const {ctx,page:p}=await open(b,{hero,errs,owned:['full']});
   const o=await opens(p);ok(`${H} C 舊存檔只有 full：第1～45章全開`,o.every(Boolean),JSON.stringify(o));
   const pc=await parkCards(p);ok(`${H} C 地球儀、攝影師打開`,pc.globe&&!pc.globe.lk&&pc.photo&&!pc.photo.lk,JSON.stringify(pc));
   const s=await shopInfo(p);ok(`${H} C 購買頁「已解鎖全部章節」`,s&&s.n===1&&/已解鎖全部章節/.test(s.row)&&!s.buy.length&&/已經買了「完整版」/.test(s.how),JSON.stringify(s&&{row:s.row,how:s.how}));
   await clr(p);const hub=await ev(p,`(()=>{homeHub();const r=document.querySelector('.hrow[data-k="intro"]');const t=r?r.innerText.replace(/\\s+/g,' '):'';document.querySelectorAll('.overlay').forEach(o=>o.remove());return t})()`);
   ok(`${H} C 家長專區那一列寫已全部解鎖`,/購買紀錄/.test(hub)&&/已全部解鎖/.test(hub),hub);
   noErr(`${H} C`,errs);await ctx.close()}
  // ---------- D 只有 stage5（兌換碼）→ 買 full ----------
  {const errs=[];const {ctx,page:p}=await open(b,{hero,errs,owned:['stage5']});
   const o=await opens(p);ok(`${H} D 只有 stage5：第21～25章開、第6～20、26～45章鎖`,range(o,20,24).every(Boolean)&&range(o,5,19).every(x=>!x)&&range(o,25,44).every(x=>!x),JSON.stringify(o));
   const s=await shopInfo(p);await p.evaluate(()=>{const c=document.querySelector('.f3how');c&&c.scrollIntoView()});await p.waitForTimeout(300);await p.screenshot({path:SH+`D_${hero}_shop.png`});
   ok(`${H} D 購買頁有完整版可以買`,s&&s.n===1&&s.buy.length===1&&s.buy[0]==='full:NT$290',JSON.stringify(s&&{n:s.n,row:s.row,buy:s.buy}));
   ok(`${H} D 說明：已打開的會保留`,s&&/會一直保留/.test(s.how)&&!BAD.test(s.all),s&&s.how);
   ok(`${H} D 第二十一～二十五章那一段標已解鎖`,s&&s.tags.includes('已解鎖 ✓'),JSON.stringify(s&&s.tags));
   await clr(p);const pp=await ev(p,`(()=>{parentPanel();const b=[...document.querySelectorAll('.iappp')].pop();const t=b?b.innerText.replace(/\\s+/g,' '):'';return t})()`);
   await p.screenshot({path:SH+`D_${hero}_settings.png`});
   ok(`${H} D 遊戲設定購買區：沒有「先解鎖第六～二十章」`,/買「完整版」/.test(pp)&&!/先解鎖/.test(pp),pp);
   await shopInfo(p);await ev(p,`(()=>{const b=document.querySelector('[data-buy="full"]');b&&b.click()})()`);await p.waitForTimeout(3500);
   const o2=await opens(p);ok(`${H} D 買了 full：全開`,o2.every(Boolean),JSON.stringify(o2));
   ok(`${H} D 買了以後 stage5 還在`,await ev(p,`iapOwned().includes('stage5')&&iapOwned().includes('full')`));
   noErr(`${H} D`,errs);await ctx.close()}
  // ---------- E 恢復購買只回傳 full ----------
  {const errs=[];const {ctx,page:p}=await open(b,{hero,errs,owned:[]});
   const o0=await opens(p);await ev(p,`__iapMock.setOwn(['full'])`);await shopInfo(p);
   await ev(p,`(()=>{const b=document.querySelector('#iaprs');b&&b.click()})()`);await p.waitForTimeout(3500);
   const o=await opens(p);ok(`${H} E 恢復購買只回傳 full：全開`,range(o0,5,44).every(x=>!x)&&o.every(Boolean),'前 '+JSON.stringify(o0)+' 後 '+JSON.stringify(o));
   ok(`${H} E 恢復後購買頁顯示已解鎖`,await ev(p,`(()=>{const c=document.querySelector('.iapcard');return !!c&&/已解鎖全部章節/.test(c.innerText)})()`));
   noErr(`${H} E`,errs);await ctx.close()}
  // ---------- F 退款 full（還有 stage5） ----------
  {const errs=[];const {ctx,page:p}=await open(b,{hero,errs,owned:['stage5','full']});
   const o0=await opens(p);
   await ev(p,`__iapMock.setOwn(['stage5']);__iapMock.fire('full',true)`);await p.waitForTimeout(800);
   const o=await opens(p);const own=await ev(p,`iapOwned()`);
   ok(`${H} F 退款 full（交易通知）：鎖回去，stage5 保留`,o0.every(Boolean)&&range(o,20,24).every(Boolean)&&range(o,5,19).every(x=>!x)&&range(o,25,44).every(x=>!x)&&JSON.stringify(own)==='["stage5"]',JSON.stringify({o,own}));
   // 開 App 對帳那一條路（sync）也一樣
   await ev(p,`__rawLS.set('pp4iap',JSON.stringify(['stage5','full']))`);await p.reload();await p.waitForFunction(()=>typeof window.__ev==='function',null,{timeout:90000});await p.waitForTimeout(3500);
   const o2=await opens(p);ok(`${H} F 退款 full（開 App 對帳）：鎖回去，stage5 保留`,range(o2,20,24).every(Boolean)&&range(o2,5,19).every(x=>!x)&&range(o2,25,44).every(x=>!x),JSON.stringify({o2,own:await ev(p,`iapOwned()`)}));
   const pc=await parkCards(p);ok(`${H} F 退款後地球儀、攝影師上鎖`,pc.globe&&pc.globe.lk&&pc.photo&&pc.photo.lk,JSON.stringify(pc));
   noErr(`${H} F`,errs);await ctx.close()}
  // ---------- G 限時送第六～十五章 ----------
  {const errs=[];const {ctx,page:p}=await open(b,{hero,errs,owned:[],v2:{promo615:true,promo615At:'2026-11-20'},promoCfg:JSON.stringify({start:'2026-11-20',days:30})});
   const o=await opens(p);ok(`${H} G promo：第1～15章開、第16～45章鎖`,range(o,0,14).every(Boolean)&&range(o,15,44).every(x=>!x),JSON.stringify(o));
   const s=await shopInfo(p);await p.screenshot({path:SH+`G_${hero}_shop.png`});
   ok(`${H} G promo 說明照舊、購買頁只有完整版`,s&&/第六～十五章/.test(s.prm)&&s.n===1&&s.buy[0]==='full:NT$290'&&!s.rec&&!BAD.test(s.all),JSON.stringify(s&&{prm:s.prm,n:s.n,buy:s.buy,rec:s.rec,bad:(s.all.match(BAD)||[])[0]}));
   ok(`${H} G 第六～十章、第十一～十五章標「已領取」`,s&&s.tags.filter(t=>/已領取/.test(t)).length===2,JSON.stringify(s&&s.tags));
   const bad=await kidNoPrice(p,`G_${hero}`);ok(`${H} G 兒童畫面沒有價格`,!bad.length,bad.join(' | '));
   await shopInfo(p);await ev(p,`(()=>{const b=document.querySelector('[data-buy="full"]');b&&b.click()})()`);await p.waitForTimeout(3500);
   ok(`${H} G promo＋買 full：全開`,(await opens(p)).every(Boolean));
   noErr(`${H} G`,errs);await ctx.close()}
  // ---------- W 網頁版 8981 ----------
  {const errs=[];const {ctx,page:p}=await open(b,{ver:'web',hero,errs});
   const w=await ev(p,`({app:typeof IS_APP!=='undefined'&&IS_APP,p290:!!window.__pay290,inc:FULLSET.includes===Array.prototype.includes,fs:FULLSET.slice(),ch:typeof window.__chOpen,vlog:VLOG[0][2].slice(0,20)})`);
   ok(`${H} W 網頁版不受影響`,!w.app&&!w.p290&&w.inc&&JSON.stringify(w.fs)==='["stage2","stage3","stage4"]'&&/合購/.test(w.vlog),JSON.stringify(w));
   await clr(p);await ev(p,`go('world')`);await p.waitForTimeout(1500);
   const t=await p.evaluate(()=>document.getElementById('screen').innerText);ok(`${H} W 網頁版大地圖沒有價格、購買`,!PRICE.test(t)&&!/購買/.test(t));
   await p.screenshot({path:SH+`W_${hero}_world.png`});
   noErr(`${H} W`,errs);await ctx.close()}
 }}catch(e){ok('測試程式例外',false,String(e&&e.stack||e))}
 fs.writeFileSync(__dirname+'/result.json',JSON.stringify(R,null,1));
 console.log('SUMMARY',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

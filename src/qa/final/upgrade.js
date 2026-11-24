// 存檔升級：用 5.3.1（base，8991 網頁版／8992 App 版）玩出存檔 → 整包 localStorage 搬到 5.4.0（8981／8982）打開。node upgrade.js
const {chromium}=require('playwright');const fs=require('fs');
const MOCK=fs.readFileSync('/home/claude/w/s7/qa/iapmock.js','utf8');
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,d)};
const SH=__dirname+'/shots/upg_';
async function page0(b,url,app,ls,errs){const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();
 p.on('pageerror',e=>errs.push('pageerror: '+e.message));p.on('console',m=>{if(m.type()==='error'){let u='';try{u=m.location().url}catch(e){}errs.push('console: '+m.text()+' @ '+u)}});
 await p.addInitScript(ls=>{try{if(!sessionStorage.getItem('__init')){sessionStorage.setItem('__init','1');for(const [k,v] of Object.entries(ls))Storage.prototype.setItem.call(localStorage,k,v)}}catch(e){}},ls);
 if(app)await p.addInitScript(MOCK);
 await p.goto(url);await p.waitForFunction(()=>typeof window.__ev==='function',null,{timeout:90000});await p.waitForTimeout(3500);return {ctx,p}}
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const dump=p=>p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});
const core=p=>ev(p,`JSON.stringify({chDone:S.chDone,prog:S.prog,ch:S.ch,wallet:S.wallet,owned:S.owned.slice().sort(),look:S.look,progs:S.progs,diff:S.diff,name:S.name,pet:S.look&&S.look.pet,room:S.room,kids:(window.PROF||{}).kids&&PROF.kids.map(k=>k.id+':'+k.hero),stats:S.stats&&Object.keys(S.stats.types||{}).length})`);
(async()=>{const b=await chromium.launch();
 for(const [nm,oldU,newU,app] of [['web','http://127.0.0.1:8991/index.html','http://127.0.0.1:8981/index.html',false],['app','http://127.0.0.1:8992/index.html','http://127.0.0.1:8982/index.html',true]])for(const hero of ['princess','prince']){
  // 1. 5.3.1：照一般玩家的狀態做存檔（兩位小朋友；第 40 章完成；有衣服、寵物、房間、寶石、學習紀录）
  const errs0=[];const progs=Array(40).fill(10);
  const seed={'pp4prof':JSON.stringify({cur:'c1',next:3,kids:[{id:'c1',hero,chosen:1},{id:'c2',hero:hero==='prince'?'princess':'prince',chosen:1}]}),
   [hero==='prince'?'pp4:prince':'pp4']:JSON.stringify({look:{dress:hero==='prince'?'b_basic':'basic',pet:'unicorn'},owned:[],wallet:321,progs,ch:39,chDone:40,diff:'mid',sound:false,music:false,voice:true,name:'小花',vo:true,rest:0}),
   'pp4v2':JSON.stringify({listenFirst:false,s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1})};
  if(app)seed['__iapmock_owned']=JSON.stringify(['stage2','stage3','stage4','stage5','stage6','stage7','stage8']);
  const A=await page0(b,oldU,app,seed,errs0);
  const v0=await ev(A.p,'APP_VERSION');
  // 在 5.3.1 裡玩：換衣服、房間、第 40 章第 10 關開始、遊樂園、寵物小屋，讓遊戲自己存檔
  await ev(A.p,`(()=>{const it=ITEMS.filter(x=>x.slot==='dress'&&!x.boy).slice(0,3).map(x=>x.id);it.forEach(i=>S.owned.includes(i)||S.owned.push(i));save()})()`);
  for(const sc of ['wardrobe','room','pethouse','park','cbook','world']){await ev(A.p,`(()=>{going=false;document.querySelectorAll('.overlay').forEach(o=>o.remove());go('${sc}')})()`);await A.p.waitForTimeout(1200)}
  await ev(A.p,`(()=>{hush();setCh(39);going=false;startLevel(9)})()`);await A.p.waitForTimeout(2000);await ev(A.p,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('title');save();try{save2()}catch(e){}})()`);await A.p.waitForTimeout(1500);
  const before=JSON.parse(await core(A.p));const ls=await dump(A.p);await A.ctx.close();
  ok(`${nm} ${hero} 5.3.1 存檔做好（版本 ${v0}）`,v0==='5.3.1'&&before.chDone===40,JSON.stringify(before).slice(0,200)+' keys='+Object.keys(ls).length);
  // 2. 5.4.0 打開同一包
  const errs=[];const B=await page0(b,newU,app,ls,errs);
  const v1=await ev(B.p,'APP_VERSION');const after=JSON.parse(await core(B.p));
  const same=['chDone','wallet','owned','progs','name','diff','kids'].filter(k=>JSON.stringify(before[k])!==JSON.stringify(after[k]));
  ok(`${nm} ${hero} 5.4.0（${v1}）讀進舊存檔：進度、寶石、衣服、名字、小朋友都在`,v1==='5.4.0'&&!same.length,same.length?same.map(k=>k+': '+JSON.stringify(before[k]).slice(0,80)+' → '+JSON.stringify(after[k]).slice(0,80)).join(' ; '):'');
  ok(`${nm} ${hero} 首頁正常`,await ev(B.p,`S.screen==='title'||S.screen==='world'`),await ev(B.p,'S.screen'));
  await ev(B.p,`(()=>{going=false;go('world')})()`);await B.p.waitForTimeout(1800);
  const w=await ev(B.p,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));if(a)a.scrollIntoView();return {arcs:document.querySelectorAll('.arc').length,s9:a?[...a.querySelectorAll('.wnode')].map(n=>n.className.replace('wnode ','')):null,open40:window.__appOpen?window.__appOpen(40):null}})()`);
  await B.p.screenshot({path:SH+`${nm}_${hero}_world.png`});
  if(app)ok(`${nm} ${hero} 大地圖第九段：沒買是付費鎖`,w.arcs===9&&w.s9&&w.s9.every(c=>/paidlock/.test(c)),JSON.stringify(w));
  else ok(`${nm} ${hero} 大地圖第九段：第41章可以玩`,w.arcs===9&&w.s9&&!/lock/.test(w.s9[0]),JSON.stringify(w));
  if(!app){await ev(B.p,`(()=>{const n=document.querySelector('.wnode[data-i="40"]');n&&n.click()})()`);await B.p.waitForTimeout(2500);ok(`${nm} ${hero} 點第41章進得去`,await ev(B.p,`['story19','map','story'].includes(S.screen)&&S.ch===40`),await ev(B.p,`S.screen+' '+S.ch`))}
  for(const sc of ['wardrobe','room','pethouse','cbook','park']){const e0=errs.length;await ev(B.p,`(()=>{hush();going=false;document.querySelectorAll('.overlay').forEach(o=>o.remove());go('${sc}')})()`);await B.p.waitForTimeout(1500);ok(`${nm} ${hero} 升級後 ${sc}`,(await ev(B.p,'S.screen'))===sc&&errs.length===e0,errs.slice(e0).join('|').slice(0,200))}
  // 3. 新版存一次再重開，資料不壞
  await ev(B.p,`(()=>{going=false;go('title');save();try{save2()}catch(e){}})()`);await B.p.waitForTimeout(800);const ls2=await dump(B.p);
  const bad=Object.entries(ls2).filter(([k,v])=>/^pp4/.test(k)&&/^[\[{]/.test(v)).filter(([k,v])=>{try{JSON.parse(v);return false}catch(e){return true}}).map(x=>x[0]);
  ok(`${nm} ${hero} 新版存檔都是合法 JSON`,!bad.length,bad.join(','));
  await B.ctx.close();const errs2=[];const C=await page0(b,newU,app,ls2,errs2);const again=JSON.parse(await core(C.p));
  const same2=['chDone','wallet','owned','progs','name','kids'].filter(k=>JSON.stringify(before[k])!==JSON.stringify(again[k]));ok(`${nm} ${hero} 新版存檔重開還是一樣`,!same2.length,same2.join(','));await C.ctx.close();
  const E=errs.concat(errs2).filter(e=>!/promo\.json/.test(e));ok(`${nm} ${hero} 5.4.0 沒有 console 錯誤`,!E.length,E.slice(0,6).join(' | '));
  const E0=errs0.filter(e=>!/promo\.json/.test(e));if(E0.length)console.log('INFO 5.3.1 本身的錯誤',E0.slice(0,4).join(' | '))}
 fs.writeFileSync(__dirname+'/logs/upgrade_result.json',JSON.stringify(R,null,1));console.log('SUMMARY upgrade',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

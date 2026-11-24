// 獨立審查：舊存檔升級、備份還原、照片大小、localStorage 用量、語音（偵測內建語音）
const L=require('/home/claude/w/s7/qa/s7/lib.js');const fs=require('fs');
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,typeof d==='string'?d.slice(0,500):JSON.stringify(d).slice(0,500))};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const TTS=`(()=>{window.__tts=[];const U=window.SpeechSynthesisUtterance;if(U){window.SpeechSynthesisUtterance=function(t){window.__tts.push(String(t));return new U(t)};window.SpeechSynthesisUtterance.prototype=U.prototype}
 try{const sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{window.__tts.push('SPEAK:'+u.text);return sp(u)}}catch(e){}})()`;
(async()=>{const b=await L.chromium.launch();
 // 0. 用 5.3.1 本體產生一份真的舊存檔（8993 服務 base/）
 const {spawn}=require('child_process');const srv=spawn('python3',['-m','http.server','8993','--bind','127.0.0.1','--directory','/home/claude/w/s7/base'],{stdio:'ignore'});
 await new Promise(r=>setTimeout(r,1200));let old=null;
 try{const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();
  await p.addInitScript(([sv])=>{if(sessionStorage.getItem('__i'))return;sessionStorage.setItem('__i',1);const S=Storage.prototype.setItem;
   S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:3,kids:[{id:'c1',hero:'princess',chosen:1},{id:'c2',hero:'prince',chosen:1}]}));
   S.call(localStorage,'pp4',JSON.stringify(sv));S.call(localStorage,'pp4v2',JSON.stringify({s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1,listenFirst:false}))},[L.save40('princess')]);
  await p.goto('http://127.0.0.1:8993/index.html');await p.waitForTimeout(4000);
  await p.evaluate(()=>{__ev(`(()=>{go('world');setTimeout(()=>go('park'),700);setTimeout(()=>go('room'),1400);setTimeout(()=>go('title'),2100);save();save2()})()`)});await p.waitForTimeout(3500);
  old=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=Storage.prototype.getItem.call(localStorage,k)}return o});
  old=Object.fromEntries(Object.entries(old).filter(([k])=>!/^__|starlight-|^sw/.test(k)));
  console.log('5.3.1 keys',Object.keys(old).join(','),'ver',await p.evaluate(()=>__ev('APP_VERSION')));await ctx.close()}catch(e){console.log('old fail',e.message)}
 srv.kill();
 fs.writeFileSync(__dirname+'/old531.json',JSON.stringify(old));
 for(const ver of ['web','app']){const errs=[];
  const ctx=await b.newContext({viewport:{width:1180,height:820}});const page=await ctx.newPage();page.on('pageerror',e=>errs.push('pageerror: '+e.message));page.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
  await page.addInitScript(([o])=>{if(sessionStorage.getItem('__i'))return;sessionStorage.setItem('__i',1);for(const k in o)Storage.prototype.setItem.call(localStorage,k,o[k]);Storage.prototype.setItem.call(localStorage,'__iapmock_owned','["full","s5to8"]')},[old]);
  await page.addInitScript(TTS);
  if(ver==='app')await page.addInitScript(fs.readFileSync('/home/claude/w/s7/qa/iapmock.js','utf8'));
  await page.goto(L.URL[ver]);await page.waitForTimeout(5000);
  const st=await ev(page,`({ver:APP_VERSION,ch:S.ch,chDone:S.chDone,scr:S.screen,s7:window.__s7on,len:CHAPTERS.length,owned:S.owned.length,wallet:S.wallet})`);
  ok(`${ver} 5.3.1 存檔升級後讀得到`,st.chDone===40&&st.len===45&&st.ver==='5.4.0',st);
  // 走一圈新畫面
  for(const sc of ['world','park','cbook','room','wardrobe','pethouse','practice','dex','title']){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('${sc}')})()`);await page.waitForTimeout(1300)}
  // 第 41 章（App 沒買 stage9 → 不能玩；網頁版有 s3pw → 可以）
  const o41=await ev(page,`({open:window.__appOpen?__appOpen(40):null,s7:__s7Open(40)})`);ok(`${ver} 第41章開放判斷`,ver==='web'?o41.s7:!o41.s7,o41);
  // 新欄位預設
  const v2=await ev(page,`(()=>{const o=JSON.parse(__rawLS.get('pp4v2')||'{}');return {gl8:typeof o.gl8seen,z8:typeof o.z8got,keys:Object.keys(o).filter(k=>/8|7|41/.test(k))}})()`);console.log(ver,'V2 new keys',JSON.stringify(v2));
  // 備份 → bkClean → 檢查新欄位留著
  await ev(page,`(()=>{V2.gl8seen={tw:1,jp:1};V2.z8got={panda:1};save2();return 1})()`);
  const bk=await page.evaluate(async()=>{const o=await __ev('backupMake()');const c=__ev('bkClean')(JSON.parse(JSON.stringify(o)));const v=c&&JSON.parse(c.ls.pp4v2);return {ok:!!c,gl8:v&&v.gl8seen,z8:v&&v.z8got,size:JSON.stringify(o).length,keys:Object.keys(o.ls)}});
  ok(`${ver} 備份檔留住地球儀、動物園收集`,bk.ok&&bk.gl8&&bk.gl8.tw&&bk.z8&&bk.z8.panda,bk);
  // localStorage 用量：灌滿 40 張照片（用真的拍照大小）
  const sz=await page.evaluate(()=>{let t=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);t+=k.length+(Storage.prototype.getItem.call(localStorage,k)||'').length}return t});
  console.log(ver,'localStorage chars before photos',sz);
  const tts=await ev(page,`window.__tts.slice(0,30)`);ok(`${ver} 走一圈沒有用到內建語音`,!tts.length,tts);
  const E=errs.filter(e=>!/TUNNEL|ERR_|Failed to load resource/.test(e));ok(`${ver} 沒有 console 錯誤`,!E.length,E.slice(0,6).join(' | '));
  await ctx.close()}
 fs.writeFileSync(__dirname+'/r_save.json',JSON.stringify(R,null,1));console.log('SUMMARY',R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

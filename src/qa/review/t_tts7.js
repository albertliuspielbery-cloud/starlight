const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const S45=h=>{const s=L.save40(h);s.progs=Array(45).fill(10);s.chDone=45;s.ch=44;return s};
(async()=>{const b=await L.chromium.launch();
 for(const [ver,hero] of (process.argv[2]==='app'?[['app','prince']]:[['web','princess']])){
 const ctx=await b.newContext({viewport:{width:1180,height:820}});const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.addInitScript(([sv,hero])=>{if(sessionStorage.getItem('__i'))return;sessionStorage.setItem('__i',1);const S=Storage.prototype.setItem;S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero,chosen:1}]}));S.call(localStorage,hero==='prince'?'pp4:prince':'pp4',JSON.stringify(sv));S.call(localStorage,'pp4v2',JSON.stringify({s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1,listenFirst:false}));S.call(localStorage,'__iapmock_owned','["full","s5to8","stage9"]');S.call(localStorage,'pp4iap','["full","s5to8","stage9"]')},[S45(hero),hero]);
 await page.addInitScript(()=>{window.__tts=[];const U=window.SpeechSynthesisUtterance;window.SpeechSynthesisUtterance=function(t){window.__tts.push(String(t));return new U(t)};window.SpeechSynthesisUtterance.prototype=U.prototype});
 if(ver==='app')await page.addInitScript(require('fs').readFileSync('/home/claude/w/s7/qa/iapmock.js','utf8'));
 await page.goto(L.URL[ver]);await page.waitForTimeout(5000);await page.mouse.click(3,3);
 const said=[];
 for(const c of [40,41,42,43,44]){
  for(const sc of ['story','guide','map']){console.log('step',ver,c,sc,new Date().toISOString().slice(11,19));await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());hush();setCh(${c});S.prog=${sc==='chend'?'NL':'0'};going=false;try{go('${sc}')}catch(e){console.log(e)}})()`);await page.waitForTimeout(2500);
   said.push(...await ev(page,`(()=>{const a=window.__tts.splice(0);return a.map(x=>'${c}/${sc}: '+x)})()`))}}
 for(const sc of ['world','practice','dex','cbook','storyhouse','room','wardrobe','pethouse']){await ev(page,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('${sc}')})()`);await page.waitForTimeout(2000);said.push(...await ev(page,`window.__tts.splice(0).map(x=>'${sc}: '+x)`))}
 console.log(ver,hero,'TTS',said.length,JSON.stringify(said.slice(0,15)),'errs',errs.slice(0,3));await ctx.close()}
 await b.close()})();

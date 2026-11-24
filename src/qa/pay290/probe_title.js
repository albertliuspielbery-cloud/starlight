const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1180,height:820}});const p=await c.newPage();
await p.route(/promo\.json/,r=>r.fulfill({status:404,body:''}));
await p.addInitScript(()=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i',1);localStorage.setItem('pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero:'princess',chosen:1}]}));localStorage.setItem('pp4v2',JSON.stringify({s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1}));localStorage.setItem('pp4promoCfg',JSON.stringify({start:'2026-01-01',days:30}));localStorage.setItem('__iapmock_owned','[]')}});
await p.addInitScript(fs.readFileSync('../iapmock.js','utf8'));
for(const u of ['http://127.0.0.1:8982/index.html']){await p.goto(u);await p.waitForTimeout(5000);
console.log(await p.evaluate(()=>__ev(`({scr:S.screen,iapt:!!document.querySelector('#iaptitle'),parent:!!document.querySelector('#parent'),pzone:!!document.querySelector('#pzone'),txt:document.getElementById('screen').innerText.replace(/\\s+/g,' ').slice(0,200)})`)))}
await b.close()})();

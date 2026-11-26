// 5.4.1 頁首購買鈕／重試鈕測試（App 8982）
const fs=require('fs');const {chromium}=require('playwright');
const MOCK=fs.readFileSync(__dirname+'/../../iapmock.js','utf8');const O=__dirname+'/';
const [W,H]=process.argv[2].split('x').map(Number);const MODE=process.argv[3]||'ok';
const log=(...a)=>console.log(`[${MODE} ${W}x${H}]`,...a);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/promo\.json/,r=>r.fulfill({status:404,body:''}));
 if(MODE==='owned')await p.addInitScript(()=>{try{Storage.prototype.setItem.call(localStorage,'__iapmock_owned','["full"]')}catch(e){}});
 await p.addInitScript(MOCK);
 await p.addInitScript(m=>{window.__PMODE=m;window.__GPN=0;const iv=setInterval(()=>{const NP=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.NativePurchases;if(!NP||NP.__w)return;NP.__w=1;clearInterval(iv);const orig=NP.getProducts.bind(NP);
  NP.getProducts=async a=>{window.__GPN++;if(window.__PMODE==='empty'&&window.__GPN===1)return {products:[]};return orig(a)}},5)},MODE);
 await p.goto('http://127.0.0.1:8982/index.html');
 await p.waitForFunction(()=>typeof window.__ev==='function'&&document.querySelector('#screen'),null,{timeout:90000});await p.waitForTimeout(4000);
 await p.getByText('小公⁠主').first().click();await p.waitForTimeout(1500);await p.click('#nmno');await p.waitForTimeout(3000);
 await p.click('#pzone');await p.waitForTimeout(1200);
 const qq=await p.evaluate(()=>document.querySelector('.overlay').innerText.match(/(\d+)\s*×\s*(\d+)/));await p.fill('#pg',String(+qq[1]*+qq[2]));await p.click('#pgok');await p.waitForTimeout(1500);
 await p.locator('.hrow.gold').filter({hasText:/完整版介紹|購買紀錄/}).first().click();await p.waitForTimeout(3500);
 const st=()=>p.evaluate(()=>{const c=document.querySelector('.iapcard');const t=c&&c.querySelector('.pay290top');const r=t&&t.getBoundingClientRect();return {top:t?t.innerText.replace(/\s+/g,' '):null,topY:r?Math.round(r.top):null,inView:r?r.bottom<=innerHeight:null,buyBtns:c?c.querySelectorAll('[data-buy="full"]').length:0,retry:c?c.querySelectorAll('.pay290retry').length:0,na:c?!!c.querySelector('.iaprow .na'):null}});
 log('open',JSON.stringify(await st()),'gp',await p.evaluate(()=>window.__GPN));
 await p.screenshot({path:O+`${MODE}_${W}x${H}_top.png`});
 if(MODE==='empty'){await p.locator('.pay290top .pay290retry').click();await p.waitForTimeout(3500);log('after retry',JSON.stringify(await st()),'gp',await p.evaluate(()=>window.__GPN));await p.screenshot({path:O+`${MODE}_${W}x${H}_retry.png`})}
 if(MODE==='ok'||MODE==='empty'){await p.locator('.pay290top [data-buy="full"]').click();await p.waitForTimeout(3500);
  log('after buy',JSON.stringify(await st()),'iap',await p.evaluate(()=>localStorage.getItem('pp4iap')),'allOpen',await p.evaluate(()=>window.__pay290&&window.__pay290.allOpen()));await p.screenshot({path:O+`${MODE}_${W}x${H}_bought.png`})}
 log('errs',JSON.stringify(errs.filter(e=>!/promo/.test(e))));await b.close()})();

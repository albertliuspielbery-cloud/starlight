const fs=require('fs');const {chromium}=require('playwright');
const MOCK=fs.readFileSync(__dirname+'/../iapmock.js','utf8');
const [W,H]=(process.argv[2]||'820x1180').split('x').map(Number);const O=__dirname+'/';
const vis=p=>p.evaluate(()=>[...document.querySelectorAll('button,a,input,[role=button]')].filter(e=>e.offsetParent).map(e=>(e.id||e.className)+'|'+(e.innerText||e.placeholder||'').replace(/\s+/g,' ').slice(0,30)));
const hl=(p,sel,txt)=>p.evaluate(([sel,txt])=>{document.querySelectorAll('.__hl').forEach(x=>x.remove());let el=txt?[...document.querySelectorAll(sel)].find(e=>e.offsetParent&&e.innerText.includes(txt)):document.querySelector(sel);if(!el)return 'nf';const r=el.getBoundingClientRect();const d=document.createElement('div');d.className='__hl';d.style.cssText=`position:fixed;left:${r.left-8}px;top:${r.top-8}px;width:${r.width+16}px;height:${r.height+16}px;border:5px solid #FF2D2D;border-radius:14px;z-index:2147483647;pointer-events:none;box-shadow:0 0 0 3px #fff`;document.body.appendChild(d);return 'ok'},[sel,txt]);
const unhl=p=>p.evaluate(()=>document.querySelectorAll('.__hl').forEach(x=>x.remove()));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,serviceWorkers:'block'});
 const p=await ctx.newPage();await p.route(/promo\.json/,r=>r.fulfill({status:404,body:''}));
 await p.addInitScript(MOCK);await p.goto('http://127.0.0.1:8982/index.html');
 await p.waitForFunction(()=>typeof window.__ev==='function'&&document.querySelector('#screen'),null,{timeout:90000});await p.waitForTimeout(4000);
 await p.screenshot({path:O+`1_title_${W}.png`});
 await p.getByText('小公⁠主').first().click().catch(async()=>{await p.locator('.overlay button').first().click()});await p.waitForTimeout(2000);await p.screenshot({path:O+`1b_title_${W}.png`});console.log('after hero',JSON.stringify(await vis(p)));await p.click('#nmno');await p.waitForTimeout(1500);await hl(p,'#pzone');await p.screenshot({path:O+`A1_${W}.png`});await unhl(p);await p.click('#pzone');await p.waitForTimeout(1500);await p.screenshot({path:O+`2_gate_${W}.png`});
 const q=await p.evaluate(()=>document.querySelector('.overlay')?.innerText.replace(/\s+/g,' ').slice(0,200));console.log('gate:',q);console.log(JSON.stringify(await vis(p)));

 const qq=await p.evaluate(()=>document.querySelector('.overlay').innerText.match(/(\d+)\s*×\s*(\d+)/));const ans=String(+qq[1]*+qq[2]);
 await p.fill('#pg',ans);await hl(p,'#pgok');await p.screenshot({path:O+`A2_${W}.png`});await unhl(p);await p.click('#pgok');await p.waitForTimeout(2000);
 await hl(p,'.hrow','完整版介紹');await p.screenshot({path:O+`A3_${W}.png`});await unhl(p);console.log('parent:',(await p.evaluate(()=>document.querySelector('.overlay:last-of-type')?.innerText||document.body.innerText)).replace(/\s+/g,' ').slice(0,600));
 console.log(JSON.stringify(await vis(p)));

 await p.getByText('完整版介紹').click();await p.waitForTimeout(4000);
 await p.screenshot({path:O+`4_shop_top_${W}.png`});
 const info=await p.evaluate(()=>{const c=document.querySelector('.iapcard');return c?[...c.querySelectorAll('.iaprow')].map(r=>r.innerText.replace(/\s+/g,' ')):document.body.innerText.slice(0,300)});console.log('shop rows',JSON.stringify(info));
 await p.waitForTimeout(800);await hl(p,'.pay290top [data-buy="full"]');await p.screenshot({path:O+`A4_${W}.png`});
 await b.close()})();

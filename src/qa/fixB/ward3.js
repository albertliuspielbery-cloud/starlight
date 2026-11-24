// 換裝間：已拿到的章節獎品排最前面（App 版）。node ward3.js vp hero
const {R,VP,open,ev}=require('./lib');const vp=process.argv[2]||'ip',hero=process.argv[3]||'princess';
(async()=>{const b=await R.chromium.launch();
 const owned=['bag41','dress43','b_paint43','beret43','redpanda44','dress39','b_rain39','prop35','sloth36','forest','b_forest','fox','squirrel31'];
 const extra={chDone:45,progs:Array(45).fill(10),owned,look:{dress:hero==='prince'?'b_royal':'star',pet:'unicorn',head:hero==='prince'?'b_crown':'crown'}};
 const {page,errs}=await open(b,vp,{ver:'app',hero,extra});
 await ev(page,"go('wardrobe')");await page.waitForTimeout(2200);const look0=await ev(page,'JSON.stringify(S.look)');
 for(const t of ['dress','head','acc','prop','pets']){await page.evaluate(t=>{document.querySelectorAll('.coach').forEach(c=>c.remove());document.querySelector(`.w90tab[data-t="${t}"]`).click()},t);await page.waitForTimeout(900);
  const first=await page.evaluate(()=>[...document.querySelectorAll('#opts .opt')].slice(0,5).map(o=>o.dataset.id+(o.getAttribute('aria-pressed')==='true'?'*':'')+(o.classList.contains('locked')?'(鎖)':'')).join(', '));
  console.log(hero,t,first);await page.screenshot({path:`${__dirname}/shots/ward_app_${hero}_${vp}_${t}.png`})}
 // 點最前面的新獎品穿上，再確認存檔和選擇
 await page.evaluate(()=>{document.querySelector('.w90tab[data-t="head"]').click()});await page.waitForTimeout(700);
 await page.evaluate(()=>{document.querySelector('#opts .opt').click()});await page.waitForTimeout(900);
 const look1=await ev(page,'JSON.stringify({head:S.look.head,dress:S.look.dress})');const pressed=await page.evaluate(()=>[...document.querySelectorAll('#opts .opt[aria-pressed=true]')].map(o=>o.dataset.id).join(','));
 await page.screenshot({path:`${__dirname}/shots/ward_app_${hero}_${vp}_wear.png`});
 console.log(hero,'look before',look0.slice(0,60),'→ after tap first head',look1,'pressed',pressed);
 const e=errs.filter(x=>!/favicon|Failed to load|^log:/.test(x));if(e.length)console.log('ERRS',e.slice(0,5));await b.close()})();

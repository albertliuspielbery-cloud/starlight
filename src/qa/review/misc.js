// 小貓熊（首頁、寵物小屋）、換裝間新衣服、房間牆上的畫和小書架。node misc.js vp hero
const R=require('./rlib');const vp=process.argv[2]||'se';const hero=process.argv[3]||'princess';const tag=`m_${hero}_${vp}`;
(async()=>{const b=await R.chromium.launch();
 const extra={chDone:45,progs:Array(45).fill(10),owned:['bag41','dress43','beret43','redpanda44','mypic45','shelf42'],look:{dress:hero==='prince'?'b_basic':'basic',pet:'redpanda44'}};
 const {page,errs}=await R.open(b,{vp,hero,extra});const ev=c=>R.ev(page,c);const w=ms=>page.waitForTimeout(ms);
 const dis=async()=>{for(let i=0;i<4;i++){const c=await page.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^(跳過|好棒！|好棒 ！|知道了|好)$/.test(b.textContent.replace(/\s/g,'').replace('好棒！','好棒！')));if(b){b.click();return 1}return 0});if(!c)break;await w(600)}};
 const shot=async n=>{await dis();await page.screenshot({path:__dirname+`/B_shots/${tag}_${n}.png`});const l=await R.layout(page);console.log('SHOT',n,JSON.stringify({off:l.off.slice(0,4),clip:l.clip.slice(0,4),small:l.small.slice(0,4)}))};
 await ev("go('title')");await w(2500);await shot('home');
 await ev("go('pethouse')");await w(2500);await shot('pethouse');
 // 點小貓熊（摸摸）
 await page.evaluate(()=>{const p=document.querySelector('.pethouse .petbig,.ph19pet,#phpet,.phpet');if(p)p.click()});await w(1200);await shot('pethouse_tap');
 await ev("go('wardrobe')");await w(2000);
 await page.evaluate(()=>{const o=[...document.querySelectorAll('.opt,[data-id]')].find(e=>/dress43|小畫家/.test((e.dataset.id||'')+e.textContent));if(o){o.scrollIntoView({block:'center'});o.click()}});await w(1500);await shot('ward_dress43');
 await page.evaluate(()=>{const o=[...document.querySelectorAll('.opt,[data-id]')].find(e=>/beret43|貝雷/.test((e.dataset.id||'')+e.textContent));if(o){o.scrollIntoView({block:'center'});o.click()}});await w(1500);await shot('ward_beret');
 await page.evaluate(()=>{const o=[...document.querySelectorAll('.opt,[data-id]')].find(e=>/bag41|導遊/.test((e.dataset.id||'')+e.textContent));if(o){o.scrollIntoView({block:'center'});o.click()}});await w(1500);await shot('ward_bag');
 console.log('ward items',await page.evaluate(()=>[...document.querySelectorAll('.opt')].map(e=>e.textContent.trim()).filter(t=>/畫家|貝雷|導遊|小貓熊/.test(t))));
 await ev("go('room','pic')");await w(2000);await shot('room_pic');
 await page.evaluate(()=>{const o=[...document.querySelectorAll('.ropt,.opt,[data-v]')].find(e=>/我的畫/.test(e.textContent));if(o)o.click()});await w(1500);await shot('room_pic_on');
 await ev("go('room','toy')");await w(1500);await page.evaluate(()=>{const o=[...document.querySelectorAll('.ropt,.opt,[data-v]')].find(e=>/小書架/.test(e.textContent));if(o){o.scrollIntoView({block:'center'});o.click()}});await w(1500);await shot('room_shelf');
 await ev("go('title')");await w(2500);await shot('home_after');
 console.log('ERRS',JSON.stringify(errs.slice(0,8)));await b.close()})();

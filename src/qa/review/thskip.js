// 破關小劇場：按一次跳過、連按跳過，會不會卡住。node thskip.js vp ch mode(once|rapid|none)
const R=require('./rlib');const [vp,ch,mode]=[process.argv[2]||'padL',+(process.argv[3]||41),process.argv[4]||'once'];
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp,extra:{chDone:45,progs:Array(45).fill(10)}});const ev=c=>R.ev(page,c);
 await ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(${ch-1});S.prog=10;going=false;go('chend')})()`);
 const st=async t=>console.log(t,await ev('S.screen'),await page.evaluate(()=>{const s=[...document.querySelectorAll('button')].filter(b=>/跳過/.test(b.textContent)&&b.offsetParent).map(b=>b.id||b.className);return JSON.stringify(s)}));
 await page.waitForTimeout(1200);await st('t1.2');await page.screenshot({path:__dirname+`/B_tmp/ths_${mode}_${ch}_a.png`});
 const sk=async()=>page.evaluate(()=>{const s=[...document.querySelectorAll('button')].find(b=>/跳過/.test(b.textContent)&&b.offsetParent);if(s){const r=s.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}return null});
 if(mode==='once'){const p=await sk();if(p)await page.mouse.click(p[0],p[1])}
 if(mode==='rapid'){for(let i=0;i<6;i++){const p=await sk();if(p)await page.mouse.click(p[0],p[1]);await page.waitForTimeout(150)}}
 for(let i=0;i<8;i++){await page.waitForTimeout(1500);await st('t+'+(i*1.5+1.5));}
 await page.screenshot({path:__dirname+`/B_tmp/ths_${mode}_${ch}_b.png`});await b.close()})();

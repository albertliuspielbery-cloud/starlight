// 地球儀 fps：CDP 4 倍降速，拖 4 秒＋慣性 1.5 秒；也量 1 倍。node gfps.js vp
const R=require('./rlib');const vp=process.argv[2]||'se';
(async()=>{const b=await R.chromium.launch();const {page,ctx}=await R.open(b,{vp,extra:{chDone:45}});const ev=c=>R.ev(page,c);
 await ev("go('globe8')");await page.waitForTimeout(5000);const cdp=await ctx.newCDPSession(page);
 for(const rate of [1,4]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});const bx=await (await page.$('#gl8cv')).boundingBox();const cx=bx.x+bx.width/2,cy=bx.y+bx.height/2;
  await page.evaluate(()=>{window.__fr=[];window.__frStop=0;let last=performance.now();const f=t=>{__fr.push(t-last);last=t;if(!window.__frStop)requestAnimationFrame(f)};requestAnimationFrame(f)});
  await page.mouse.move(cx,cy);await page.mouse.down();const t0=Date.now();let i=0;while(Date.now()-t0<4000){i++;await page.mouse.move(cx+Math.sin(i/6)*bx.width*.3,cy+Math.cos(i/9)*30);await page.waitForTimeout(16)}await page.mouse.up();await page.waitForTimeout(1500);
  const fr=await page.evaluate(()=>{window.__frStop=1;const a=__fr.slice(3);const s=a.slice().sort((x,y)=>x-y);return {frames:a.length,avgfps:+(1000/(a.reduce((x,y)=>x+y,0)/a.length)).toFixed(1),p50ms:+s[s.length>>1].toFixed(1),p95ms:+s[Math.floor(s.length*.95)].toFixed(1),maxms:+s[s.length-1].toFixed(1),over50ms:a.filter(x=>x>50).length}});
  console.log(vp,'cpu x'+rate,'R',Math.round(await ev('__gl8.VW.R')),JSON.stringify(fr))}
 // 放大到最大後 4 倍降速再量
 await ev('__gl8.setZoom(2.6)');await page.waitForTimeout(500);
 const bx=await (await page.$('#gl8cv')).boundingBox();const cx=bx.x+bx.width/2,cy=bx.y+bx.height/2;
 await page.evaluate(()=>{window.__fr=[];window.__frStop=0;let last=performance.now();const f=t=>{__fr.push(t-last);last=t;if(!window.__frStop)requestAnimationFrame(f)};requestAnimationFrame(f)});
 await page.mouse.move(cx,cy);await page.mouse.down();const t0=Date.now();let i=0;while(Date.now()-t0<4000){i++;await page.mouse.move(cx+Math.sin(i/6)*bx.width*.3,cy+Math.cos(i/9)*30);await page.waitForTimeout(16)}await page.mouse.up();await page.waitForTimeout(1500);
 const fr=await page.evaluate(()=>{window.__frStop=1;const a=__fr.slice(3);const s=a.slice().sort((x,y)=>x-y);return {frames:a.length,avgfps:+(1000/(a.reduce((x,y)=>x+y,0)/a.length)).toFixed(1),p95ms:+s[Math.floor(s.length*.95)].toFixed(1),over50ms:a.filter(x=>x>50).length}});
 console.log(vp,'cpu x4 zoom2.6',JSON.stringify(fr));await b.close()})();

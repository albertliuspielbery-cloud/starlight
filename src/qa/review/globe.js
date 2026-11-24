// 地球儀：畫面、點選、找找看、南北極、4 倍降速 fps、轉向。node globe.js <vp> [web|app]
const R=require('./rlib');const fs=require('fs');
const vp=process.argv[2]||'se';const ver=process.argv[3]||'web';const SH=__dirname+'/B_shots/';const tag=`g_${ver}_${vp}`;
(async()=>{const b=await R.chromium.launch();const {ctx,page,errs}=await R.open(b,{vp,ver,extra:{chDone:45,progs:Array(45).fill(10)}});
 const ev=c=>R.ev(page,c);const shot=async n=>{await page.screenshot({path:SH+`${tag}_${n}.png`});const l=await R.layout(page);console.log('SHOT',n,JSON.stringify({off:l.off,clip:l.clip,scroll:l.scroll.doc,small:l.small}))};
 await ev("go('park')");await page.waitForTimeout(1800);await page.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await page.waitForTimeout(900);
 await page.evaluate(()=>{const c=document.querySelector('.pcard[data-k="globe8"]');c&&c.scrollIntoView({block:'center'})});await page.waitForTimeout(500);await shot('park');
 await page.click('.pcard[data-k="globe8"]').catch(e=>console.log('click card fail',e.message));await page.waitForTimeout(600);
 if(await ev("S.screen")!=='globe8'){await page.click('.pcard[data-k="globe8"]').catch(()=>{});await page.waitForTimeout(600)}
 console.log('screen',await ev('S.screen'),await page.evaluate(()=>{const o=document.querySelector('.overlay');return o?o.textContent.slice(0,80):''}));
 if(await ev("S.screen")!=='globe8'){await ev("go('globe8')")}
 await page.waitForTimeout(4500);await shot('open');
 const box=await (await page.$('#gl8cv')).boundingBox();console.log('canvas',JSON.stringify(box));
 // 點台灣
 const find=async okf=>ev(`(()=>{const G=__gl8;const ok=${okf};for(let r=0;r<=G.VW.R;r+=4)for(let a=0;a<6.28;a+=r?4/r:7){const x=G.VW.cx+r*Math.cos(a),y=G.VW.cy+r*Math.sin(a);if(ok(G.hitAt(x,y)))return [x,y]}return null})()`);
 const tap=async xy=>{await page.mouse.click(box.x+xy[0],box.y+xy[1])};
 await ev("__gl8.panTo(121,23.5,0)");await page.waitForTimeout(300);
 const tw=await find("k=>k==='tw'");console.log('tw xy',tw);
 // 台灣可點面積：數有幾個點
 const twA=await ev(`(()=>{const G=__gl8;let n=0;for(let y=G.VW.cy-G.VW.R;y<G.VW.cy+G.VW.R;y+=2)for(let x=G.VW.cx-G.VW.R;x<G.VW.cx+G.VW.R;x+=2)if(G.hitAt(x,y)==='tw')n++;return n*4})()`);console.log('taiwan hit area px2',twA,'R',await ev('__gl8.VW.R'));
 if(tw){await tap(tw);await page.waitForTimeout(900);await shot('taiwan')}
 // 小國家：新加坡、韓國等可點面積
 for(const [k,lo,la] of [['sg',104,1.3],['kr',127,36.5],['jp',138,36],['nz',172,-41]]){await ev(`__gl8.panTo(${lo},${la},0)`);await page.waitForTimeout(200);
  const a=await ev(`(()=>{const G=__gl8;let n=0;for(let y=G.VW.cy-G.VW.R;y<G.VW.cy+G.VW.R;y+=2)for(let x=G.VW.cx-G.VW.R;x<G.VW.cx+G.VW.R;x+=2)if(G.hitAt(x,y)==='${k}')n++;return n*4})()`);console.log('hit area',k,a)}
 const codes=await ev("JSON.stringify((window.__G8&&__G8.CT||[]).map(c=>c[0]))");console.log('CT',codes.slice(0,400));
 // 南北極
 await page.evaluate(()=>{const c=document.querySelector('#gl8card .gl8x');if(c&&c.offsetParent)c.click()});
 await ev("__gl8.panTo(0,-70,0)");await page.waitForTimeout(300);let xy=await find("k=>k==='an'");if(xy){await tap(xy);await page.waitForTimeout(900);await shot('antarctica')}
 await page.evaluate(()=>{const c=document.querySelector('#gl8card .gl8x');if(c&&c.offsetParent)c.click()});
 await ev("__gl8.panTo(0,75,0)");await page.waitForTimeout(300);xy=await find("k=>k==='arc'");if(xy){await tap(xy);await page.waitForTimeout(900);await shot('arctic')}
 await page.evaluate(()=>{const c=document.querySelector('#gl8card .gl8x');if(c&&c.offsetParent)c.click()});
 // 找找看
 await page.click('#gl8find');await page.waitForTimeout(700);await shot('findmenu');
 await page.click('#gl8diffs [data-v="mid"]').catch(()=>{});await page.click('#gl8go');await page.waitForTimeout(3800);await shot('find_q1');
 await page.waitForFunction(()=>__ev("__gl8.F()&&!__gl8.F().busy"),null,{timeout:15000}).catch(()=>{});
 const want=await ev("__gl8.F()&&__gl8.F().q[__gl8.F().i]");console.log('want',want,await page.evaluate(()=>(document.querySelector('#gl8q,#gl8bub,.gl8q')||{}).textContent));
 for(let k=0;k<2;k++){const w=await find(`k=>k&&k!==${JSON.stringify(want)}&&k.length<=3`);if(w){await tap(w);await page.waitForTimeout(1000)}}
 await page.waitForTimeout(600);await shot('find_hint');
 // 點太快：同一點連點 6 下
 const t=await find(`k=>k===${JSON.stringify(want)}`);if(t){for(let i=0;i<6;i++){await tap(t);await page.waitForTimeout(40)}}await page.waitForTimeout(1500);
 console.log('after rapid taps dots',await page.evaluate(()=>document.querySelectorAll('#gl8dots i.on').length));await shot('rapid');
 // 中途轉向
 const vps=R.VPS;const alt=vp==='land'?vps.ip:vp==='padL'?vps.padP:vp==='padP'?vps.padL:vps.land;await page.setViewportSize(alt);await page.waitForTimeout(1500);await shot('rotated');
 console.log('after rotate R',await ev('__gl8.VW.R'),'cv',JSON.stringify(await (await page.$('#gl8cv')).boundingBox()));
 await page.setViewportSize(vps[vp]||vps.se);await page.waitForTimeout(1200);
 // 中途返回
 await page.click('#pback').catch(e=>console.log('pback',e.message));await page.waitForTimeout(1800);console.log('after back',await ev('S.screen'));
 await ev("go('globe8')");await page.waitForTimeout(4000);console.log('reenter',await ev('S.screen'),await ev('!!__gl8.F()'));
 // fps：4 倍降速，持續拖 4 秒＋慣性
 const cdp=await ctx.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 const box2=await (await page.$('#gl8cv')).boundingBox();const cx=box2.x+box2.width/2,cy=box2.y+box2.height/2;
 await page.evaluate(()=>{window.__fr=[];let last=performance.now();const f=t=>{__fr.push(t-last);last=t;if(!window.__frStop)requestAnimationFrame(f)};requestAnimationFrame(f)});
 await page.mouse.move(cx,cy);await page.mouse.down();const t0=Date.now();let i=0;while(Date.now()-t0<4000){i++;await page.mouse.move(cx+Math.sin(i/6)*box2.width*.3,cy+Math.cos(i/9)*30);await page.waitForTimeout(16)}
 await page.mouse.up();await page.waitForTimeout(1500);
 const fr=await page.evaluate(()=>{window.__frStop=1;const a=__fr.slice(3);const s=a.slice().sort((x,y)=>x-y);return {n:a.length,avgfps:+(1000/(a.reduce((x,y)=>x+y,0)/a.length)).toFixed(1),p50:+s[s.length>>1].toFixed(1),p95:+s[Math.floor(s.length*.95)].toFixed(1),max:+s[s.length-1].toFixed(1),long:a.filter(x=>x>50).length}});
 console.log('FPS 4x',JSON.stringify(fr));
 // 自由轉放大（如有）
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 console.log('ERRS',JSON.stringify(errs.filter(e=>!/favicon|Failed to load/.test(e)).slice(0,10)),'TTS',JSON.stringify(await page.evaluate(()=>__tts)),'MISS',JSON.stringify(await page.evaluate(()=>[...new Set(__miss)])));
 await b.close()})();

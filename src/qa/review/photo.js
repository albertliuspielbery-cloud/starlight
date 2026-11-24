// 小小攝影師：畫面、真的拖取景框、拍錯／提示／拍對、連按快門、相簿、收集冊、轉向、中途返回。node photo.js vp [web|app] [easy|mid|hard]
const R=require('./rlib');const vp=process.argv[2]||'se';const ver=process.argv[3]||'web';const lvl=process.argv[4]||'mid';const tag=`p_${ver}_${vp}_${lvl}`;const SH=__dirname+'/B_shots/';
(async()=>{const b=await R.chromium.launch();const {page,errs}=await R.open(b,{vp,ver,extra:{chDone:45,progs:Array(45).fill(10)},v2:{rvDaily:false,rvMid:false,gateTour:1}});const ev=c=>R.ev(page,c);const w=ms=>page.waitForTimeout(ms);
 const shot=async n=>{await page.screenshot({path:SH+`${tag}_${n}.png`});const l=await R.layout(page);console.log('SHOT',n,JSON.stringify({off:l.off,clip:l.clip,scroll:l.scroll.doc,small:l.small}))};
 await ev("try{__rawLS.del('pp4photo8')}catch(e){}");
 await ev("go('park')");await w(1600);await page.evaluate(()=>{const z=document.querySelector('.gzt[data-z="games"]');if(z)z.click()});await w(800);
 await page.click('.pcard[data-k="photo8"]').catch(e=>console.log('card',e.message));await w(500);if(await ev('S.screen')!=='photo8'){await page.click('.pcard[data-k="photo8"]').catch(()=>{});await w(1500)}
 if(await ev('S.screen')!=='photo8'){console.log('not entered',await ev('S.screen'));await ev("go('photo8')");}
 await w(2200);await shot('menu');
 await page.click(`#ph8diffs .ph8opt[data-v="${lvl}"]`);await w(200);await page.click('#ph8go');await w(2500);await shot('q1');
 console.log('Q1',await page.evaluate(()=>{const g=__p8.G();return g.q.t}),'tip',await page.textContent('#ph8tip').catch(()=>''));
 // 真的拖：取景框拖到別處
 const vfb=await (await page.$('#ph8vf')).boundingBox();const stb=await (await page.$('#ph8st')).boundingBox();console.log('vf',JSON.stringify(vfb),'stage',JSON.stringify(stb));
 await page.mouse.move(vfb.x+vfb.width/2,vfb.y+vfb.height/2);await page.mouse.down();for(let i=1;i<=10;i++){await page.mouse.move(vfb.x+vfb.width/2-i*8,vfb.y+vfb.height/2+i*3);await w(16)}await page.mouse.up();await w(300);
 const vfb2=await (await page.$('#ph8vf')).boundingBox();console.log('vf moved',Math.round(vfb2.x-vfb.x),Math.round(vfb2.y-vfb.y));
 // 背景拖（平移）
 const p0=await page.evaluate(()=>__p8.pan());await page.mouse.move(stb.x+20,stb.y+stb.height-60);await page.mouse.down();for(let i=1;i<=10;i++){await page.mouse.move(stb.x+20+i*12,stb.y+stb.height-60);await w(16)}await page.mouse.up();
 console.log('bg pan delta',Math.round(await page.evaluate(()=>__p8.pan())-p0));
 // 拍錯（天空）
 await page.evaluate(()=>__p8.aim({x:2690,y:200,w:360,h:300}));await w(200);await page.click('#ph8shut');await w(1000);await shot('wrong1');console.log('tip1',await page.textContent('#ph8tip'));
 await page.click('#ph8shut');await w(1600);await shot('hint');console.log('tip2',await page.textContent('#ph8tip'),'glow',await page.evaluate(()=>document.querySelectorAll('.z8a.glow').length));
 // 拍對＋快門連按
 for(let r=0;r<5;r++){const g=await page.evaluate(()=>{const g=__p8.G();return g&&{i:g.i,t:g.q.t}});if(!g)break;
  await page.waitForFunction(()=>{const g=__p8.G();return g&&(!g.busy||g.busy==='wait')},null,{timeout:8000}).catch(()=>{});
  const fr=await page.evaluate(()=>{const g=__p8.G();return __p8.solve(g.M,g.q)});await page.evaluate(fr=>__p8.aim(fr),fr);await w(300);
  if(r===1)await shot('aim');
  if(r===0){for(let k=0;k<5;k++){await page.click('#ph8shut',{force:true}).catch(()=>{});await w(60)}}else await page.click('#ph8shut');
  await w(1400);if(r===0)await shot('found');
  await page.waitForFunction(i=>{const g=__p8.G();return !g||g.i>i},g.i,{timeout:15000}).catch(()=>console.log('stuck at',r));
  console.log('Q',r,g.t,'strip on',await page.evaluate(()=>document.querySelectorAll('.ph8slot.on').length))}
 await w(2500);await shot('album');
 await page.click('#ph8all').catch(e=>console.log('all',e.message));await w(900);await shot('allphotos');
 await page.click('.ph8th').catch(()=>{});await w(700);await shot('big');await page.click('.ph8big .btn').catch(()=>{});await w(300);await page.click('.ph8all .xclose').catch(()=>{});await w(300);
 await page.click('#ph8again').catch(()=>{});await w(600);await page.click('#ph8go').catch(()=>{});await w(1500);
 // 轉向
 const alt=vp==='land'?R.VPS.ip:vp==='padL'?R.VPS.padP:vp==='padP'?R.VPS.padL:R.VPS.land;await page.setViewportSize(alt);await w(1500);await shot('rotated');
 const fr=await page.evaluate(()=>{const g=__p8.G();return g&&__p8.solve(g.M,g.q)});if(fr){await page.evaluate(fr=>__p8.aim(fr),fr);await w(300);await page.click('#ph8shut');await w(1500);console.log('after rotate shoot strip',await page.evaluate(()=>document.querySelectorAll('.ph8slot.on').length))}
 await page.setViewportSize(R.VPS[vp]);await w(1000);
 await page.click('#pback');await w(1800);console.log('after back',await ev('S.screen'));
 await ev(`go('cbook')`);await w(1500);await page.evaluate(()=>{const t=[...document.querySelectorAll('.cbtab')].find(t=>/動物園/.test(t.textContent));if(t)t.click()});await w(900);await shot('book');
 console.log('ERRS',JSON.stringify(errs.filter(e=>!/favicon|Failed to load/.test(e)).slice(0,10)),'TTS',JSON.stringify(await page.evaluate(()=>__tts)),'MISS',JSON.stringify(await page.evaluate(()=>[...new Set(__miss)])));
 await b.close()})();

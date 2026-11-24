const L=require('./lib');const OUT=__dirname+'/try/';const DEV=process.env.DEV||'iphone';const hero=process.env.HERO||'princess';
(async()=>{const b=await L.chromium.launch();
 const look=hero==='prince'?{dress:'b_paint43',head:'beret43',pet:'redpanda44',back:'bag41'}:{dress:'dress43',head:'beret43',pet:'redpanda44',back:'bag41'};
 const p=await L.open(b,{dev:DEV,scale:1,hero,save:L.save45(hero,{look,owned:['dress43','b_paint43','beret43','bag41','redpanda44']})});
 const shot=async k=>{await p.waitForTimeout(500);await p.screenshot({path:`${OUT}${DEV}_${hero}_${k}.png`});console.log('shot',k,await L.ev(p,'S.screen'))};
 console.log(await L.ev(p,'JSON.stringify(S.look)'));
 await L.clean(p);await L.ev(p,`(()=>{S.pmode=null;setCh(40);S.prog=10;startLevel(2);S.qs[0]='quiz:捷運'})()`);await p.waitForTimeout(1500);
 await p.evaluate(()=>{const o=document.querySelector('.overlay');if(o){const x=o.querySelector('button');if(x)x.click()}});await p.waitForTimeout(2500);await L.ev(p,'hush()');await shot('q41');
 // 地球儀
 await L.clean(p);await L.ev(p,`go('globe8')`);await p.waitForTimeout(4500);await shot('globe_free');
 for(const [k,lo,la] of [['jp',138,36],['eg',30,27],['tw',121,23.7],['au',134,-25],['fr',2,46.5]]){
  await L.ev(p,`(()=>{const x=document.querySelector('#gl8card .gl8x');if(x&&x.offsetParent)x.click();__gl8.panTo(${lo},${la-8},0)})()`);await p.waitForTimeout(600);
  const r=await p.evaluate(([lo,la])=>__ev(`(()=>{const q=__gl8.proj(${lo},${la});return [q.X,q.Y,__gl8.hitAt(q.X,q.Y)]})()`),[lo,la]);
  const box=await (await p.$('#gl8cv')).boundingBox();await p.mouse.click(box.x+r[0],box.y+r[1]);await p.waitForTimeout(1500);await L.ev(p,'hush()');await shot('globe_'+k+'_'+r[2])}
 await p.evaluate(()=>{const x=document.querySelector('#gl8card .gl8x');if(x&&x.offsetParent)x.click();const f=document.querySelector('#gl8find');f&&f.click()});await p.waitForTimeout(900);await shot('globe_menu');
 await p.evaluate(()=>{const d=document.querySelector('#gl8diffs [data-v="mid"]');d&&d.click();const g=document.querySelector('#gl8go');g&&g.click()});await p.waitForTimeout(3500);await L.ev(p,'hush()');await shot('globe_find');
 // 攝影師
 await L.clean(p);await L.ev(p,`(()=>{V2.parkSeen=Object.assign(V2.parkSeen||{},{photo8:3});go('photo8')})()`);await p.waitForTimeout(3000);await shot('photo_menu');
 for(const d of ['easy','mid','hard']){
 await L.clean(p);await L.ev(p,`go('photo8')`);await p.waitForTimeout(2500);
 await p.evaluate(d=>{const x=document.querySelector(`#ph8diffs .ph8opt[data-v="${d}"]`);x&&x.click();const g=document.querySelector('#ph8go');g&&g.click()},d);await p.waitForTimeout(3000);await L.ev(p,'hush()');await shot('photo_play_'+d);
 await p.evaluate(()=>{try{const g=__p8.G();const fr=__p8.solve(g.M,g.q);__p8.aim(fr)}catch(e){console.log(e)}});await p.waitForTimeout(800);await L.ev(p,'hush()');await shot('photo_aim_'+d);
 await p.evaluate(()=>{const s=document.querySelector('#ph8shut');s&&s.click()});await p.waitForTimeout(1300);await shot('photo_snap_'+d);await p.waitForTimeout(2500);await shot('photo_snap2_'+d)}
 // 故事屋
 await L.clean(p);await L.ev(p,`(()=>{S.from='park';go('storyhouse')})()`);await p.waitForTimeout(1800);
 const cv=await p.evaluate(()=>[...document.querySelectorAll('#screen .scover[data-i]')].map(c=>[+c.dataset.i,(c.querySelector('b')||c).textContent.trim()]));console.log(JSON.stringify(cv));
 await p.evaluate(()=>{const c=[...document.querySelectorAll('#screen .scover[data-i]')].pop();c&&c.scrollIntoView({block:'end'})});await p.waitForTimeout(600);await shot('house_end');
 for(const T of ['圖書館的小聲音','我的畫掛在牆上']){const c=cv.find(x=>x[1]===T);await L.clean(p);await L.ev(p,`(()=>{S.from='park';go('storyhouse')})()`);await p.waitForTimeout(1500);
  await p.evaluate(i=>document.querySelector(`#screen .scover[data-i="${i}"]`).click(),c[0]);await p.waitForTimeout(1500);
  for(let pg=1;pg<=9;pg++){await L.ev(p,'hush()');await shot(`book_${T}_${pg}`);await p.evaluate(()=>{const n=document.querySelector('#rnext');n&&n.click()});await p.waitForTimeout(700)}}
 console.log(p.errs);await b.close()})();

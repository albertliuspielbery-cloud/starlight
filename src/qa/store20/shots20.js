// App 2.0 商店截圖原始畫面＋審查附件。iPhone 440x956@3、iPad 1032x1376@2。存 raw/<dev>-<key>.png
// DEVS=iphone,ipad ONLY=key,...  SCALE=1（試拍）
const L=require('./lib');const OUT=__dirname+'/raw/';
const DEVS=(process.env.DEVS||'iphone,ipad').split(','),ONLY=process.env.ONLY?process.env.ONLY.split(','):null;const want=k=>!ONLY||ONLY.includes(k);
const look={dress:'dress43',head:'beret43',pet:'redpanda44',back:'bag41'};
(async()=>{const b=await L.chromium.launch();
for(const dev of DEVS){
 const p=await L.open(b,{dev,scale:process.env.SCALE?+process.env.SCALE:undefined,save:L.save45('princess',{look,owned:['dress43','beret43','bag41','redpanda44']})});
 const shot=async k=>{await p.waitForTimeout(400);await p.screenshot({path:`${OUT}${dev}-${k}.png`});console.log(dev,k,await L.ev(p,'S.screen'))};
 // 關卡題目：題目文字符合 re 為止（最多 25 次）
 const level=async(ch,lv,t,re)=>{let txt='';for(let i=0;i<25;i++){await L.clean(p);await L.ev(p,`(()=>{S.pmode=null;setCh(${ch-1});S.prog=10;startLevel(${lv});S.qs[0]=${JSON.stringify(t)}})()`);await p.waitForTimeout(1300);
   await p.evaluate(()=>{const o=document.querySelector('.overlay');if(o){const x=o.querySelector('button');if(x)x.click()}});await p.waitForTimeout(1800);
   txt=await p.evaluate(()=>{const e=document.querySelector('.stage .qtext,.stage .bubble,.qbox,.stage');return e?e.innerText.replace(/\s+/g,' ').slice(0,80):''});if(!re||re.test(txt))break}
  await L.ev(p,'hush()');await p.waitForTimeout(1500);await L.ev(p,`(()=>{try{hush()}catch(e){}document.querySelectorAll('#toast,.toast,.coach').forEach(o=>o.remove())})()`);console.log(' q:',txt.slice(0,50))};
 if(want('s7q')){await level(41,2,'quiz:捷運',/手扶梯.*伸/);await shot('s7q')}
 if(want('r41')){await level(41,3,'quiz:捷運',/空隙/);await shot('r41')}
 if(want('r42')){await level(42,1,'count:s7ord:10',null);await shot('r42')}
 if(want('r43')){await level(43,5,'quiz:看醫生',/藥/);await shot('r43')}
 if(want('r44')){await level(44,1,'shape:s7grid:z1',null);await shot('r44')}
 if(want('r45')){await level(45,0,'quiz:美術館',/摸|拍照|閃光/);await shot('r45')}
 // 地球儀：點台灣跳小卡
 if(want('globe')){await L.clean(p);await L.ev(p,`go('globe8')`);await p.waitForTimeout(4500);
  for(const [k,lo,la,dy] of [['tw',120.95,23.7,6]]){await L.ev(p,`__gl8.panTo(${lo},${la-dy},0)`);await p.waitForTimeout(700);
   const r=await L.ev(p,`(()=>{const q=__gl8.proj(${lo},${la});return [q.X,q.Y,__gl8.hitAt(q.X,q.Y)]})()`);const box=await (await p.$('#gl8cv')).boundingBox();
   await p.mouse.click(box.x+r[0],box.y+r[1]);await p.waitForTimeout(1600);await L.ev(p,'hush()');console.log(' hit',r[2])}
  await shot('globe')}
 if(want('globe2')){await L.clean(p);await L.ev(p,`go('globe8')`);await p.waitForTimeout(4500);
  await L.ev(p,`__gl8.panTo(138,28,0)`);await p.waitForTimeout(700);const r=await L.ev(p,`(()=>{const q=__gl8.proj(138.5,35.8);return [q.X,q.Y,__gl8.hitAt(q.X,q.Y)]})()`);const box=await (await p.$('#gl8cv')).boundingBox();
  await p.mouse.click(box.x+r[0],box.y+r[1]);await p.waitForTimeout(1600);await L.ev(p,'hush()');console.log(' hit',r[2]);await shot('globe2')}
 if(want('globefind')){await L.clean(p);await L.ev(p,`go('globe8')`);await p.waitForTimeout(4000);await p.evaluate(()=>{const f=document.querySelector('#gl8find');f&&f.click()});await p.waitForTimeout(900);
  await p.evaluate(()=>{const d=document.querySelector('#gl8diffs [data-v="hard"]');d&&d.click();const g=document.querySelector('#gl8go');g&&g.click()});await p.waitForTimeout(3500);await L.ev(p,'hush()');await shot('globefind')}
 // 小小攝影師：中等「在吃東西的台灣黑熊」，對準、按快門
 if(want('photo')){let q='';for(let i=0;i<60;i++){await L.clean(p);await L.ev(p,`(()=>{V2.parkSeen=Object.assign(V2.parkSeen||{},{photo8:3});go('photo8')})()`);await p.waitForTimeout(2200);
   await p.evaluate(()=>{const x=document.querySelector('#ph8diffs .ph8opt[data-v="mid"]');x&&x.click();const g=document.querySelector('#ph8go');g&&g.click()});await p.waitForTimeout(2200);
   q=await p.evaluate(()=>{const e=document.querySelector('#screen');return e.innerText.replace(/\s+/g,' ')});if(/吃東西的台灣黑熊|小貓熊|台灣黑熊/.test(q))break}
  console.log(' photo q',q.slice(0,60));await L.ev(p,'hush()');
  await p.evaluate(()=>{try{const g=__p8.G();const fr=__p8.solve(g.M,g.q);__p8.aim(fr)}catch(e){console.log(e)}});await p.waitForTimeout(900);
  await p.evaluate(()=>{const o=window.setTimeout;window.setTimeout=function(f,ms,...a){return o(f,([200,700,3600].includes(ms))?1e7:ms,...a)};const s=document.querySelector('#ph8shut');s&&s.click()});await p.waitForFunction(()=>/拍到了/.test(document.querySelector('#screen').innerText),null,{timeout:5000}).catch(()=>console.log(' no 拍到了'));await p.waitForTimeout(1500);await L.ev(p,'hush()');await p.screenshot({path:`${OUT}${dev}-photo.png`});console.log(dev,'photo',await p.evaluate(()=>document.querySelector('#screen').innerText.replace(/\s+/g,' ').slice(0,120)))}
 // 故事屋新書
 for(const [k,T,pg] of [['book1','圖書館的小聲音',2],['book2','我的畫掛在牆上',6]]){if(!want(k))continue;
  await L.clean(p);await L.ev(p,`(()=>{S.from='park';go('storyhouse')})()`);await p.waitForTimeout(1600);
  await p.evaluate(T=>{const c=[...document.querySelectorAll('#screen .scover[data-i]')].find(c=>(c.querySelector('b')||c).textContent.trim()===T);c&&c.click()},T);await p.waitForTimeout(1500);
  for(let i=1;i<pg;i++){await p.evaluate(()=>{const n=document.querySelector('#rnext');n&&n.click()});await p.waitForTimeout(700)}
  await p.waitForTimeout(1200);await L.ev(p,'hush()');await shot(k)}
 console.log(dev,'errs',p.errs);await p.ctx.close()}
await b.close()})();

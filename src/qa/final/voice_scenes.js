// 語音：地球儀（點遍 30 國、七大洲、五大洋，玩一輪找找看）、小小攝影師（簡單／中等／高難度各一輪）。VOICE=1 才有記錄。
// node voice_scenes.js <princess|prince> → voice/scenes_<hero>.json
const L=require('../s7/lib');const fs=require('fs');const hero=process.argv[2]||'princess';
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
(async()=>{const b=await L.chromium.launch();const errs=[];
 const {ctx,page}=await L.open(b,{ver:'web',hero,errs,voice:true,save:L.save40(hero,{chDone:45,progs:Array(45).fill(10)})});
 await ev(page,`(()=>{S.rest=0;TM.since=0;V2.parkSeen=Object.assign(V2.parkSeen||{},{globe8:3,photo8:3})})()`);
 // ---- 地球儀 ----
 await ev(page,`go('globe8')`);await page.waitForTimeout(6000);
 const keys=await ev(page,`(()=>{const G=window.__G8;return G.CT.map(c=>c[0]).concat(['as','eu','af','na','sa','oc','an','pa','at','io','ar','so','arc'])})()`);
 const find=k=>ev(page,`(()=>{const G=__gl8;for(let r=0;r<=G.VW.R;r+=5)for(let a=0;a<6.28;a+=r?5/r:7){const x=G.VW.cx+r*Math.cos(a),y=G.VW.cy+r*Math.sin(a);if(G.hitAt(x,y)==='${k}')return [x,y]}return null})()`);
 let tapped=0;
 for(const k of keys){let xy=null;for(const [lo,la] of [[0,0],[60,20],[120,20],[-60,0],[-100,40],[20,50],[30,-20],[140,-25],[-60,-20],[0,-70],[0,70],[78,-22],[-160,4],[-35,18],[100,35],[121,23]]){await ev(page,`__gl8.panTo(${lo},${la},0)`);await page.waitForTimeout(120);xy=await find(k);if(xy)break}
  if(!xy){console.log('globe 找不到',k);continue}await ev(page,`__gl8.tap(${xy[0]},${xy[1]})`);tapped++;await page.waitForTimeout(900);
  await page.evaluate(()=>{const h=document.querySelector('#gl8card .gl8hear');if(h&&h.offsetParent)h.click()});await page.waitForTimeout(400);
  await page.evaluate(()=>{const x=document.querySelector('#gl8card .gl8x');if(x&&x.offsetParent)x.click()})}
 console.log('globe 點了',tapped,'/',keys.length);
 for(const d of ['easy','mid','hard']){await page.evaluate(()=>{const f=document.querySelector('#gl8find');f&&f.click()});await page.waitForTimeout(700);await page.evaluate(d=>{const x=document.querySelector(`#gl8diffs [data-v="${d}"]`);x&&x.click();const g=document.querySelector('#gl8go');g&&g.click()},d);await page.waitForTimeout(3500);
  for(let i=0;i<6;i++){await page.waitForFunction(()=>__ev('!__gl8.F()||!__gl8.F().busy'),null,{timeout:20000}).catch(()=>{});const want=await ev(page,`__gl8.F()?__gl8.F().q[__gl8.F().i]:null`);if(!want)break;
   if(i===0){for(const w of ['eu','sa']){if(w===want)continue;let xy=null;for(const [lo,la] of [[20,50],[-60,-20]]){await ev(page,`__gl8.panTo(${lo},${la},0)`);xy=await find(w);if(xy)break}if(xy){await ev(page,`__gl8.tap(${xy[0]},${xy[1]})`);await page.waitForTimeout(1500)}}await page.waitForFunction(()=>__ev('!__gl8.F()||!__gl8.F().busy'),null,{timeout:20000}).catch(()=>{})}
   let xy=null;for(const [lo,la] of [[0,0],[60,20],[120,20],[-60,0],[-100,40],[20,50],[30,-20],[140,-25],[-60,-20],[0,-70],[0,70],[78,-22],[-160,4],[-35,18],[100,35],[121,23]]){await ev(page,`__gl8.panTo(${lo},${la},0)`);xy=await find(want);if(xy)break}
   if(xy){await ev(page,`__gl8.tap(${xy[0]},${xy[1]})`)}await page.waitForTimeout(2500)}
  await page.waitForTimeout(5000)}
 await ev(page,`(()=>{hush();going=false;go('park')})()`);await page.waitForTimeout(1500);
 // ---- 小小攝影師 ----
 for(const d of ['easy','mid','hard']){await ev(page,`(()=>{hush();going=false;go('photo8')})()`);await page.waitForTimeout(3000);
  await page.evaluate(d=>{const x=document.querySelector(`#ph8diffs .ph8opt[data-v="${d}"]`);x&&x.click();const g=document.querySelector('#ph8go');g&&g.click()},d);await page.waitForTimeout(2500);
  for(let r=0;r<5;r++){const ok=await page.evaluate(()=>!!(window.__p8&&__p8.G()));if(!ok)break;
   const wrong=await page.evaluate(()=>{const g=__p8.G();const m=g.M.find(m=>m.sp!==g.q.sp);return m&&{x:m.cx-180,y:Math.max(200,m.cy-150),w:360,h:300}});
   if(wrong){await page.evaluate(fr=>__p8.aim(fr),wrong);await page.waitForTimeout(200);await page.click('#ph8shut').catch(()=>{});await page.waitForTimeout(1500)}
   await page.evaluate(()=>__p8.aim({x:2690,y:200,w:360,h:300}));await page.waitForTimeout(200);await page.click('#ph8shut').catch(()=>{});await page.waitForTimeout(1500);
   await page.evaluate(()=>{const g=__p8.G();__p8.aim(__p8.solve(g.M,g.q))});await page.waitForTimeout(300);await page.click('#ph8shut').catch(()=>{});
   await page.waitForFunction(r=>{const g=__p8.G();return !g||g.i>r},r,{timeout:20000}).catch(()=>{})}
  await page.waitForTimeout(3000);await page.evaluate(()=>{const a=document.querySelector('#ph8all');a&&a.click()});await page.waitForTimeout(800)}
 await ev(page,`(()=>{hush();going=false;go('cbook')})()`);await page.waitForTimeout(1500);
 for(const t of ['動物園','地球儀']){await page.evaluate(t=>{const x=[...document.querySelectorAll('.cbtab')].find(e=>e.textContent.includes(t));x&&x.click()},t);await page.waitForTimeout(800);
  await page.evaluate(()=>{[...document.querySelectorAll('.cbview .cbc')].slice(0,6).forEach((c,i)=>setTimeout(()=>c.click(),i*700))});await page.waitForTimeout(5000)}
 fs.writeFileSync(__dirname+`/voice/scenes_${hero}.json`,JSON.stringify(await L.voiceDump(page)));
 console.log('errs',errs.filter(e=>!/promo/.test(e)).slice(0,5));await b.close()})();

const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2800,height:500}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>console.log('c:',m.text()));
await p.setContent('<html><body style="margin:0"></body></html>');
await p.addScriptTag({path:'/home/claude/w/s7/mods/m8_photo_art.js'});
await p.evaluate(()=>{const Z=ZOO8;let a='';const pick=['stand','sleep','eat','play'];let i=0;
 Z.SLOTS.forEach(sl=>{const n=Math.min(sl.cap,2);Z.members(sl,n).forEach(m=>{const st=(sl.st||pick)[(i++)%(sl.st||pick).length];
  let inner=Z.draw(sl.sp,st);if(sl.wl){inner=`<defs><clipPath id="wc${i}"><rect x="-10" y="-10" width="120" height="${sl.wl+10}"/></clipPath></defs><g clip-path="url(#wc${i})">${inner}</g><path d="M4 ${sl.wl} q12 -4 24 0 q12 4 24 0 q12 -4 24 0 q12 4 24 0" stroke="#fff" stroke-width="2.4" fill="none" opacity=".7"/>`}
  a+=`<g transform="translate(${m.x-m.size/2} ${m.y-m.size*.95}) scale(${m.size/100})">${inner}</g>`})});
 a+=`<g transform="translate(${Z.KEEP.x-75} ${Z.KEEP.y-142}) scale(1.5)">${Z.keeper()}</g>`;
 document.body.innerHTML=`<svg viewBox="0 0 ${Z.W} ${Z.H}" width="2800" height="500">${Z.bg()}${a}${Z.front()}${Z.SLOTS.map(s=>`<circle cx="${s.x}" cy="${s.y}" r="5" fill="red"/>`).join('')}</svg>`});
await p.screenshot({path:'scene.png'});
await p.setViewportSize({width:1400,height:500});
await p.evaluate(()=>{const s=document.querySelector('svg');s.setAttribute('viewBox',`0 0 2800 1000`);s.setAttribute('width',1400)});await p.screenshot({path:'scene_a.png'});
await p.evaluate(()=>{const s=document.querySelector('svg');s.setAttribute('viewBox',`2800 0 2800 1000`)});await p.screenshot({path:'scene_b.png'});
console.log(errs);await b.close()})();

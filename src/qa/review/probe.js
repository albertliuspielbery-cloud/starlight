// 點擊目標：大小、中心點是不是被別的東西蓋住。node probe.js vp code ch diff
const R=require('./rlib');const Q=require('../s7/qtest');
const [vp,code,ch,diff]=[process.argv[2]||'se',process.argv[3],+(process.argv[4]||42),process.argv[5]||'mid'];
(async()=>{const b=await R.chromium.launch();const {ctx,page}=await R.open(b,{vp});
 await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1800);
 const r=await page.evaluate(()=>[...document.querySelectorAll('.stage .play [data-v],.stage .play button,.stage .play .c7b,.stage .play .f7card')].filter(e=>e.offsetParent).map(e=>{const r=e.getBoundingClientRect();
  const pts=[[.5,.5],[.8,.8],[.2,.8],[.8,.3]].map(([a,c])=>{const x=r.left+r.width*a,y=r.top+r.height*c;const h=document.elementFromPoint(x,y);return h&&(e.contains(h)||h===e)?'ok':(h?(h.id||h.className&&String(h.className).slice(0,20)||h.tagName):'none')});
  return [(e.dataset.v||e.textContent||'').trim().slice(0,6),Math.round(r.width)+'x'+Math.round(r.height),pts.join('/')]}));
 console.log(vp,code,JSON.stringify(r));
 const hero=await page.evaluate(()=>{const h=document.querySelector('#hero,.hero,#pet');return h?[getComputedStyle(h).pointerEvents,JSON.stringify(h.getBoundingClientRect())]:null});console.log('hero',hero);
 await b.close()})();

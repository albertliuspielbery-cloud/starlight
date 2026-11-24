const L=require('../s7/lib');
(async()=>{const b=await L.chromium.launch();const {ctx,page}=await L.open(b,{});
 const r=await page.evaluate(()=>__ev(`(()=>{const out={};for(const k of ['bunny','kitten','penguin','duck','hedgehog','dog']){
  const has=window.fullBodyHas&&fullBodyHas(k);let s=has?fullBody(k,{pose:'down'}):animal(k);
  const d=document.createElement('div');d.style.cssText='position:fixed;left:0;top:0;width:400px;height:400px';d.innerHTML=s;document.body.appendChild(d);const svg=d.querySelector('svg');svg.setAttribute('width',400);svg.setAttribute('height',400);
  const els=[...svg.querySelectorAll('path,ellipse,circle,rect,polygon')];const sr=svg.getBoundingClientRect();
  const bb=els.map(e=>{const r=e.getBoundingClientRect();return [e.tagName,e.getAttribute('fill'),+(r.top/4).toFixed(1),+(r.bottom/4).toFixed(1),+(r.left/4).toFixed(1),+(r.right/4).toFixed(1),e.getAttribute('opacity')]});
  out[k]={has,vb:svg.getAttribute('viewBox'),top:Math.min(...bb.map(x=>x[2])),bot:Math.max(...bb.map(x=>x[3])),l:Math.min(...bb.map(x=>x[4])),r:Math.max(...bb.map(x=>x[5])),low:bb.filter(x=>x[3]>90)};d.remove()}return out})()`));
 console.log(JSON.stringify(r,null,0).replace(/\],\[/g,'],\n['));await b.close()})();

const {R,Q,VP,open,ev,rects}=require('./lib');
const vp=process.argv[2]||'land',code=process.argv[3]||'count:s7hund:100',diff=process.argv[4]||'mid',ch=+(process.argv[5]||41);
(async()=>{const b=await R.chromium.launch();const {page,errs}=await open(b,vp);
 await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1500);
 console.log(await page.evaluate(()=>{const out=[];const walk=(e,d)=>{if(d>3)return;for(const c of e.children){if(c.tagName==='svg'||c.tagName==='STYLE')continue;const r=c.getBoundingClientRect();const s=getComputedStyle(c);out.push(' '.repeat(d*2)+c.tagName.toLowerCase()+(c.id?'#'+c.id:'')+'.'+String(c.className).replace(/ /g,'.')+` [${r.left|0},${r.top|0},${r.width|0}x${r.height|0}] ${s.display} ${s.position} ov=${s.overflow}`);walk(c,d+1)}};walk(document.querySelector('#app')||document.body,0);return out.join('\n')}));
 await b.close()})();

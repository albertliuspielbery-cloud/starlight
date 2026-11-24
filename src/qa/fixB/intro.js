const {R,VP,open,ev}=require('./lib');const vp=process.argv[2]||'land';
(async()=>{const b=await R.chromium.launch();const {page}=await open(b,vp,{extra:{chDone:45,progs:Array(45).fill(0)}});
 for(const [ch,lv] of [[45,0],[40,0]]){await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(${ch-1});S.diff='mid';going=false;startLevel(${lv})})()`);await page.waitForTimeout(1800);
  console.log(await page.evaluate(()=>{const o=document.querySelector('.stage .overlay')||document.querySelector('.overlay');if(!o)return 'no overlay';const out=[];const walk=(e,d)=>{for(const c of e.children){if(c.tagName==='svg')continue;const r=c.getBoundingClientRect();const s=getComputedStyle(c);out.push(' '.repeat(d*2)+c.tagName.toLowerCase()+'.'+String(c.className).replace(/ /g,'.')+` [${r.left|0},${r.top|0},${r.width|0}x${r.height|0}] ${s.display} fs=${s.fontSize} ov=${s.overflowY}`);if(d<3)walk(c,d+1)}};out.push('overlay '+o.className+' '+JSON.stringify(o.getBoundingClientRect()));walk(o,0);return out.join('\n')}));
  await page.screenshot({path:__dirname+`/shots/intro0_${vp}_c${ch}.png`})}
 await b.close()})();

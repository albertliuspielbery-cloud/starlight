// 同一題型抽多次：題目、可點目標大小。node probe2.js vp code ch diff n
const R=require('./rlib');const Q=require('../s7/qtest');
const [vp,code,ch,diff,n]=[process.argv[2],process.argv[3],+process.argv[4],process.argv[5]||'mid',+(process.argv[6]||6)];
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp});const seen=new Set();
 for(let i=0;i<n;i++){const info=await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1500);
  const r=await page.evaluate(()=>{const els=[...document.querySelectorAll('.stage .play *')].filter(e=>{const s=getComputedStyle(e);return e.offsetParent&&(s.cursor==='pointer'||e.dataset.v!=null||e.tagName==='BUTTON')});
   const sz=els.map(e=>{const r=e.getBoundingClientRect();return [e.className&&String(e.className).split(' ')[0],Math.round(r.width),Math.round(r.height)]});
   const m={};sz.forEach(([c,w,h])=>{const k=c+' '+w+'x'+h;m[k]=(m[k]||0)+1});return m});
  const key=info.prompt.replace(/\d+/g,'#');if(seen.has(key))continue;seen.add(key);
  await page.screenshot({path:__dirname+`/B_shots/p2_${vp}_${code.replace(/[^\w]+/g,'_')}_${i}.png`});
  console.log(vp,i,info.prompt,JSON.stringify(r))}
 await b.close()})();

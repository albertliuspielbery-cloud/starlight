// 答錯兩次：提示泡泡看得到、發光答案看得到。node hint.js vps codes
const {R,Q,VP,open,ev}=require('./lib');const vps=(process.argv[2]||'se,land').split(',');const codes=(process.argv[3]||'count:s7hund:100;shape:s7grid:z4;measure:s7blk').split(';');
(async()=>{const b=await R.chromium.launch();for(const vp of vps){const {page,ctx}=await open(b,vp);
 for(const code of codes){await Q.playQ(page,code,'mid',/grid/.test(code)?43:/blk/.test(code)?42:41);await page.waitForTimeout(900);
  await Q.wrongOnce(page);await page.waitForTimeout(1200);
  const r1=await page.evaluate(()=>{const p=document.getElementById('petbub');if(!p||p.hidden)return 'nobub';const r=p.getBoundingClientRect();const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return (top&&(top===p||p.contains(top))?'bubble-on-top':'covered-by '+(top&&top.className))+` [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}] `+p.textContent});
  await page.screenshot({path:`${__dirname}/shots/h_${vp}_${code.replace(/[^\w]+/g,'_')}_1.png`});
  await Q.wrongOnce(page);await page.waitForTimeout(2500);await page.screenshot({path:`${__dirname}/shots/h_${vp}_${code.replace(/[^\w]+/g,'_')}_2.png`});
  console.log(vp,code,r1)}
 await ctx.close()}await b.close()})();

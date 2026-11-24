// 地球儀找找看：題目是小國家（德國），點錯兩次後的提示畫面；提示後點發光處能不能答對。node ghint.js vp code
const R=require('./rlib');const vp=process.argv[2]||'se';const K=process.argv[3]||'de';
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp,extra:{chDone:45}});const ev=c=>R.ev(page,c);
 await ev("go('globe8')");await page.waitForTimeout(5000);
 await ev(`(()=>{__gl8.diff('hard');__gl8.startFind();__gl8.F().q[0]='${K}'})()`);await page.waitForTimeout(4500);
 await page.waitForFunction(()=>__ev("__gl8.F()&&!__gl8.F().busy"),null,{timeout:15000}).catch(()=>{});
 console.log('q',await ev('__gl8.F().q[0]'),await page.textContent('#gl8bub'));await page.screenshot({path:__dirname+`/B_shots/gh_${vp}_${K}_q.png`});
 const box=await (await page.$('#gl8cv')).boundingBox();
 for(let i=0;i<2;i++){const c=await ev('[__gl8.VW.cx,__gl8.VW.cy-__gl8.VW.R*0.7]');await page.mouse.click(box.x+c[0],box.y+c[1]);await page.waitForTimeout(1600)}
 await page.waitForTimeout(800);await page.screenshot({path:__dirname+`/B_shots/gh_${vp}_${K}_hint.png`});
 // 數提示後中心附近 60px 內點得到 K 的面積
 const n=await ev(`(()=>{const G=__gl8;let n=0;for(let y=0;y<G.VW.h;y+=2)for(let x=0;x<G.VW.w;x+=2)if(G.hitAt(x,y)==='${K}')n++;return n*4})()`);console.log('area after hint',n,'hint',JSON.stringify(await ev('__gl8.FX.hint')));
 // 小朋友手指點在國家的大概位置（偏 6px）
 const pts=await ev(`(()=>{const G=__gl8;const a=[];for(let y=0;y<G.VW.h;y+=2)for(let x=0;x<G.VW.w;x+=2)if(G.hitAt(x,y)==='${K}')a.push([x,y]);if(!a.length)return null;const cx=a.reduce((s,p)=>s+p[0],0)/a.length,cy=a.reduce((s,p)=>s+p[1],0)/a.length;return [cx,cy]})()`);
 let ok=0;if(pts)for(const [dx,dy] of [[6,0],[-6,0],[0,6],[0,-6],[5,5],[-5,-5],[8,0],[0,8]]){const h=await ev(`__gl8.hitAt(${pts[0]+dx},${pts[1]+dy})`);if(h==='${K}'||h===K)ok++}
 console.log('centroid',pts,'taps within 6-8px that hit:',ok,'/8');await b.close()})();

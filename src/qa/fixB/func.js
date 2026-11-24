// 功能：真的用滑鼠點（不是程式點）。積木疊上去／拿回來、百數表點格子、排書點空格、方格地圖轉向後寵物位置、序數點第 n 個。node func.js vp [ver]
const {R,Q,VP,open,ev}=require('./lib');const vp=process.argv[2]||'se',ver=process.argv[3]||'web';
const W=(p,ms)=>p.waitForTimeout(ms);
const tap=async(page,el)=>{const b=await el.boundingBox();await page.mouse.click(b.x+b.width/2,b.y+b.height/2)};
const adv=async(page,q0)=>{for(let i=0;i<45;i++){await W(page,300);const q=await ev(page,'S.q');if(q>q0)return true}return false};
(async()=>{const b=await R.chromium.launch();const {page,errs}=await open(b,vp,{ver});const res=[];
 // 積木
 for(let t=0;t<6;t++){await Q.playQ(page,'measure:s7blk','mid',42);await W(page,900);if(await page.$('.b7tray'))break}
 const n=+await ev(page,'S.ans');const tip=await page.evaluate(()=>{const t=document.querySelector('.fxbtip');return t?t.textContent:''});
 for(let i=0;i<n;i++){const bt=await page.$('.b7tray .b7t');await tap(page,bt);await W(page,150)}
 const st1=await page.evaluate(()=>document.querySelectorAll('.b7stack .b7b').length);
 await tap(page,await page.$('.b7stack'));await W(page,200);const st2=await page.evaluate(()=>document.querySelectorAll('.b7stack .b7b').length);
 const cur=await ev(page,'S.cur?JSON.stringify(S.cur):""');
 await page.screenshot({path:`${__dirname}/shots/f_${ver}_${vp}_blk.png`});
 let q0=await ev(page,'S.q');const right=(await page.$$('.tiles .tile')).length?await page.$(`.tiles .tile[data-v="${n}"]`):null;if(right)await tap(page,right);
 res.push(`blk n=${n} tip="${tip}" stack=${st1} afterRemove=${st2} prompt=${cur} advanced=${await adv(page,q0)}`);
 // 百數表找數字
 for(let t=0;t<8;t++){await Q.playQ(page,'count:s7hund:100','mid',41);await W(page,900);if(await page.$('.h7c[data-v]'))break}
 const a=await ev(page,'S.ans');q0=await ev(page,'S.q');await tap(page,await page.$(`.h7c[data-v="${a}"]`));res.push(`hund find ${a} advanced=${await adv(page,q0)}`);
 // 百數表空格
 for(let t=0;t<8;t++){await Q.playQ(page,'count:s7hund:100','mid',41);await W(page,900);if(await page.$('.h7c.q'))break}
 if(await page.$('.h7c.q')){const a2=await ev(page,'S.ans');q0=await ev(page,'S.q');await page.screenshot({path:`${__dirname}/shots/f_${ver}_${vp}_hundgap.png`});await tap(page,await page.$(`.tiles .tile[data-v="${a2}"]`));res.push(`hund gap ${a2} advanced=${await adv(page,q0)}`)}
 // 排書
 for(let t=0;t<8;t++){await Q.playQ(page,'count:s7hund:100','hard',41);await W(page,900);if(await page.$('.h7slot'))break}
 if(await page.$('.h7slot')){const a3=await ev(page,'S.ans');q0=await ev(page,'S.q');const wr=await page.$('.h7slot[data-v="L"]');await tap(page,wr);await W(page,700);await tap(page,await page.$(`.h7slot[data-v="${a3}"]`));res.push(`book wrong-then-right advanced=${await adv(page,q0)}`)}
 // 方格地圖：方位題，轉向後寵物還在入口
 for(let t=0;t<10;t++){await Q.playQ(page,'shape:s7grid:z4','mid',43);await W(page,900);if(await page.$('.g7dirs'))break}
 const pos=async()=>page.evaluate(()=>{const me=document.querySelector('.g7me').getBoundingClientRect();const s=document.querySelector('.g7c.g7s').getBoundingClientRect();return Math.round(Math.abs(me.left-s.left)+Math.abs(me.top-s.top)+Math.abs(me.width-s.width))});
 const p1=await pos();const alt=vp==='land'||vp==='landse'?VP.ip:VP.land;await page.setViewportSize(alt);await W(page,900);const p2=await pos();
 await page.screenshot({path:`${__dirname}/shots/f_${ver}_${vp}_grid_rotated.png`});
 const a4=await ev(page,'S.ans');q0=await ev(page,'S.q');const d=await page.$(`.g7d[data-v="${a4}"]`);if(d)await tap(page,d);res.push(`grid dir meOffset before=${p1} afterRotate=${p2} advanced=${await adv(page,q0)}`);
 await page.setViewportSize(VP[vp]);await W(page,600);
 // 序數 10 個
 for(let t=0;t<8;t++){await Q.playQ(page,'count:s7ord:10','hard',41);await W(page,900);if((await page.$$('button.o7it')).length===10)break}
 if((await page.$$('button.o7it')).length===10){const a5=await ev(page,'S.ans');q0=await ev(page,'S.q');await tap(page,await page.$(`.o7it[data-v="${a5}"]`));res.push(`ord10 ${a5} advanced=${await adv(page,q0)}`)}
 console.log(vp,ver,'\n '+res.join('\n '));const e=errs.filter(x=>!/favicon|Failed to load|^log:/.test(x));if(e.length)console.log('ERRS',e.slice(0,6));await b.close()})();

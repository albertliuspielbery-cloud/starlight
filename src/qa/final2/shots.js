// 上架前最終驗收截圖（App 版 8982）：6 種尺寸 × 第 41～45 章各一關題目、百數表、方格地圖、量身高、地球儀、攝影師、故事屋、換裝間、家長購買頁。
// 自動檢查：按鈕出畫面、文字被切、按鈕重疊、橫向捲動、兒童畫面出現價格（NT$／$／價格字樣）。
// node shots.js [vps=se,ip,landip,landse,padP,padL] [hero=princess]  → final2/shots/<尺寸>_<場景>.png、logs/shots_<hero>.json
const L=require('../s7/lib');const Q=require('../s7/qtest');const fs=require('fs');
const VPS={se:{width:375,height:667},ip:{width:390,height:844},landip:{width:844,height:390},landse:{width:667,height:375},padP:{width:820,height:1180},padL:{width:1180,height:820}};
const want=(process.argv[2]||Object.keys(VPS).join(',')).split(',');const hero=process.argv[3]||'princess';
const OUT=__dirname+'/shots/';const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const CHECK=(kid)=>{const W=innerWidth,H=innerHeight;const vis=e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>2&&r.height>2&&s.visibility!=='hidden'&&s.display!=='none'&&+s.opacity>0.05};
 const name=e=>(e.id?'#'+e.id:e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):''))+'「'+(e.textContent||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,14)+'」';
 const inScroll=e=>{let p=e.parentElement;while(p&&p!==document.body){const s=getComputedStyle(p);if(/(auto|scroll)/.test(s.overflowY+s.overflowX)&&(p.scrollHeight>p.clientHeight+2||p.scrollWidth>p.clientWidth+2))return true;p=p.parentElement}return false};
 const out=[],clip=[],lap=[];
 const btns=[...document.querySelectorAll('button,[role=button],.btn,.btn2')].filter(vis).filter(e=>!e.closest('[hidden],.gzoff'));
 btns.forEach(b=>{const r=b.getBoundingClientRect();if((r.right>W+1||r.bottom>H+1||r.left<-1||r.top<-1)&&!inScroll(b))out.push(name(b)+` [${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)}]`)});
 const txt=[...document.querySelectorAll('#screen *, .overlay *')].filter(e=>vis(e)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>0));
 txt.forEach(e=>{const s=getComputedStyle(e);const hid=/(hidden|clip)/.test(s.overflowX+s.overflowY)||s.textOverflow==='ellipsis';
  if(hid&&(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+3))clip.push(name(e)+` sw${e.scrollWidth}/cw${e.clientWidth} sh${e.scrollHeight}/ch${e.clientHeight}`);
  const r=e.getBoundingClientRect();if((r.right>W+2||r.left<-2||r.bottom>H+2)&&s.position!=='fixed'&&!inScroll(e))clip.push(name(e)+' 超出畫面')});
 for(let i=0;i<btns.length;i++)for(let j=i+1;j<btns.length;j++){const a=btns[i],b=btns[j];if(a.contains(b)||b.contains(a))continue;const r=a.getBoundingClientRect(),q=b.getBoundingClientRect();
  const ix=Math.max(0,Math.min(r.right,q.right)-Math.max(r.left,q.left)),iy=Math.max(0,Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top));const ar=ix*iy,mn=Math.min(r.width*r.height,q.width*q.height);
  if(mn>0&&ar/mn>.25)lap.push(name(a)+' × '+name(b)+` ${Math.round(ar/mn*100)}%`)}
 const vt=[...document.querySelectorAll('body *')].filter(e=>vis(e)&&[...e.childNodes].some(n=>n.nodeType===3)).map(e=>[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('')).join(' ');
 const price=kid?(vt.match(/NT\$\s*\d+|\$\s*\d+|US\$|價格|購買|買「完整版」|付費/g)||[]):[];
 return {out,clip:[...new Set(clip)].slice(0,12),lap:lap.slice(0,12),hscroll:document.documentElement.scrollWidth>W+1,price}};
(async()=>{const b=await L.chromium.launch();const RES={};const errsAll=[];
 for(const vn of want){const vp=VPS[vn];const errs=[];
  const sv=L.save40(hero,{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1});
  const {ctx,page}=await L.open(b,{ver:'app',hero,errs,owned:['full'],vp,save:sv,v2:{s3pw:1,gateTour:1}});
  await ev(page,`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0})()`);
  const shot=async(scene,kid=true)=>{await page.waitForTimeout(700);const f=`${OUT}${hero==='prince'?'p_':''}${vn}_${scene}.png`;await page.screenshot({path:f});const c=await page.evaluate(CHECK,kid);RES[`${vn}_${scene}`]=c;
   const bad=c.out.length||c.clip.length||c.lap.length||c.hscroll||c.price.length;console.log(bad?'CHECK':'ok   ',vn,scene,bad?JSON.stringify(c).slice(0,700):'')};
  const clean=()=>ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;S.pmode=null})()`);
  // 1. 第 41～45 章各一關（第 3 關）第一題
  for(const ch of [41,42,43,44,45]){await clean();await ev(page,`(()=>{setCh(${ch-1});S.prog=10;S.diff='mid';startLevel(2)})()`);await page.waitForTimeout(1500);
   await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const x=o.querySelector('button');if(x)x.click()}});await page.waitForTimeout(1800);
   const code=await ev(page,`String(S.qs[S.q])`);await shot(`ch${ch}_q`);RES[`${vn}_ch${ch}_q`].code=code}
  // 2. 新題型：百數表、方格地圖（簡單／高難度）、量身高
  for(const [nm,code,diff,ch] of [['hund','count:s7hund:100','mid',41],['grid','shape:s7grid:z4','mid',43],['gridhard','shape:s7grid:m2','hard',44],['measure','measure:s7blk','mid',42]]){
   await clean();await Q.playQ(page,code,diff,ch);await page.waitForTimeout(800);await shot(nm)}
  // 3. 地球儀（自由轉、點一下、找找看）
  await clean();await ev(page,`go('globe8')`);await page.waitForTimeout(4500);await shot('globe');
  await page.evaluate(()=>{try{__gl8.tap(__gl8.VW.cx,__gl8.VW.cy)}catch(e){}});await page.waitForTimeout(1500);await shot('globe_tap');
  await page.evaluate(()=>{const x=document.querySelector('#gl8card .gl8x');if(x&&x.offsetParent)x.click();const f=document.querySelector('#gl8find');f&&f.click()});await page.waitForTimeout(900);
  await page.evaluate(()=>{const d=document.querySelector('#gl8diffs [data-v="hard"]');d&&d.click();const g=document.querySelector('#gl8go');g&&g.click()});await page.waitForTimeout(3500);await shot('globe_find');
  // 4. 小小攝影師
  await clean();await ev(page,`(()=>{V2.parkSeen=Object.assign(V2.parkSeen||{},{photo8:3});go('photo8')})()`);await page.waitForTimeout(3000);await shot('photo_menu');
  await page.evaluate(()=>{const d=document.querySelector('#ph8diffs .ph8opt[data-v="mid"]');d&&d.click();const g=document.querySelector('#ph8go');g&&g.click()});await page.waitForTimeout(3500);await shot('photo_play');
  await page.evaluate(()=>{try{const g=__p8.G();const fr=__p8.solve(g.M,g.q);__p8.aim(fr)}catch(e){}});await page.waitForTimeout(700);
  await page.evaluate(()=>{const s=document.querySelector('#ph8shut');s&&s.click()});await page.waitForTimeout(1800);await shot('photo_snap');
  // 5. 故事屋（捲到最後的新書）、換裝間
  await clean();await ev(page,`(()=>{S.from='park';go('storyhouse')})()`);await page.waitForTimeout(1800);await shot('storyhouse');
  await page.evaluate(()=>{const c=[...document.querySelectorAll('#screen .scover[data-i]')].pop();c&&c.scrollIntoView({block:'end'})});await page.waitForTimeout(600);await shot('storyhouse_end');
  await clean();await ev(page,`go('wardrobe')`);await page.waitForTimeout(2200);await shot('wardrobe');
  // 6. 大地圖第九段、遊樂園大門（兒童畫面，不能有價格）
  await clean();await ev(page,`go('world')`);await page.waitForTimeout(1500);await page.evaluate(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));a&&a.scrollIntoView()});await shot('world');
  await clean();await ev(page,`go('park')`);await page.waitForTimeout(2000);await shot('park');
  errsAll.push(...errs.filter(e=>!/promo\.json|Failed to load resource/.test(e)).map(e=>vn+' '+e));await ctx.close();
  // 7. 家長專區購買頁（沒買：完整版一列＋價格；這是家長畫面）＋沒買時的兒童鎖畫面
  {const e2=[];const sv2=L.save40(hero,{chDone:15,ch:15,progs:Array(15).fill(10).concat(Array(30).fill(0)),tutWard:1});
   const {ctx,page:p2}=await L.open(b,{ver:'app',hero,errs:e2,owned:[],vp,save:sv2,v2:{gateTour:1}});
   const sh2=async(scene,kid)=>{await p2.waitForTimeout(700);await p2.screenshot({path:`${OUT}${hero==='prince'?'p_':''}${vn}_${scene}.png`});const c=await p2.evaluate(CHECK,kid);RES[`${vn}_${scene}`]=c;const bad=c.out.length||c.clip.length||c.lap.length||c.hscroll||c.price.length;console.log(bad?'CHECK':'ok   ',vn,scene,bad?JSON.stringify(c).slice(0,700):'')};
   await ev(p2,`(()=>{going=false;go('world')})()`);await p2.waitForTimeout(1500);await p2.evaluate(()=>{const n=document.querySelector('.wnode[data-i="15"]');n&&n.scrollIntoView({block:'center'})});await sh2('world_locked',true);
   await ev(p2,`(()=>{const n=document.querySelector('.wnode[data-i="15"]');n&&n.click()})()`);await p2.waitForTimeout(1500);await sh2('locked_tap',true);
   await ev(p2,`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('title');setTimeout(()=>window.__iapShopRaw&&__iapShopRaw(),600)})()`);await p2.waitForTimeout(4000);
   const sp=await p2.evaluate(()=>{const c=document.querySelector('.iapcard');return c?c.innerText.replace(/\s+/g,' ').slice(0,600):null});RES[`${vn}_shop`]={text:sp};
   await sh2('shop',false);await p2.evaluate(()=>{const c=document.querySelector('.iapcard')||document.querySelector('.overlay .card');if(c){c.scrollTop=c.scrollHeight;const s=c.closest('.overlay');if(s)s.scrollTop=s.scrollHeight}});await sh2('shop_end',false);
   errsAll.push(...e2.filter(e=>!/promo\.json|Failed to load resource/.test(e)).map(e=>vn+' shop '+e));await ctx.close()}}
 fs.writeFileSync(__dirname+`/logs/shots_${hero}_${want.join('-')}.json`,JSON.stringify(RES,null,1));console.log('errors',JSON.stringify(errsAll.slice(0,12)));await b.close()})();

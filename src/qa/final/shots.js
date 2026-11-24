// 版面截圖＋自動檢查：iPhone SE 375×667、iPhone 395×859、iPad 820×1180、iPad 橫 1180×820。
// 第 41～45 章（地圖、開場故事、兩關題目畫面）、地球儀、小小攝影師。存 shots/<場景>_<尺寸>.png，檢查結果 logs/shots_check.json。
// node shots.js [web|app]
const L=require('../s7/lib');const fs=require('fs');
const ver=process.argv[2]||'web';const OUT=__dirname+'/shots/';
const VPS={se:{width:375,height:667},iphone:{width:395,height:859},ipadP:{width:820,height:1180},ipadL:{width:1180,height:820}};
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
// 版面檢查：按鈕超出畫面、文字被切、按鈕互相蓋到、橫向捲動
const CHECK=()=>{const W=innerWidth,H=innerHeight;const vis=e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>2&&r.height>2&&s.visibility!=='hidden'&&s.display!=='none'&&+s.opacity>0.05};
 const name=e=>(e.id?'#'+e.id:e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):''))+'「'+(e.textContent||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,14)+'」';
 const out=[],clip=[],lap=[];
 const btns=[...document.querySelectorAll('button,[role=button],.btn,.btn2')].filter(vis).filter(e=>!e.closest('[hidden],.gzoff'));
 btns.forEach(b=>{const r=b.getBoundingClientRect();if(r.right>W+1||r.bottom>H+1||r.left<-1||r.top<-1){
   // 在可以捲動的容器裡、只是還沒捲到的，不算
   let p=b.parentElement,sc=false;while(p&&p!==document.body){const s=getComputedStyle(p);if(/(auto|scroll)/.test(s.overflowY+s.overflowX)&&(p.scrollHeight>p.clientHeight+2||p.scrollWidth>p.clientWidth+2)){sc=true;break}p=p.parentElement}
   if(!sc)out.push(name(b)+` [${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)}]`)}});
 const txt=[...document.querySelectorAll('#screen *, .overlay *')].filter(e=>vis(e)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>0));
 txt.forEach(e=>{const s=getComputedStyle(e);const hid=/(hidden|clip)/.test(s.overflowX+s.overflowY)||s.textOverflow==='ellipsis';
  if(hid&&(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+3))clip.push(name(e)+` sw${e.scrollWidth}/cw${e.clientWidth} sh${e.scrollHeight}/ch${e.clientHeight}`);
  const r=e.getBoundingClientRect();if((r.right>W+2||r.left<-2)&&s.position!=='fixed'){let p=e.parentElement,sc=false;while(p&&p!==document.body){const q=getComputedStyle(p);if(/(auto|scroll)/.test(q.overflowY+q.overflowX)){sc=true;break}p=p.parentElement}if(!sc)clip.push(name(e)+' 超出畫面左右')}});
 for(let i=0;i<btns.length;i++)for(let j=i+1;j<btns.length;j++){const a=btns[i],b=btns[j];if(a.contains(b)||b.contains(a))continue;const r=a.getBoundingClientRect(),q=b.getBoundingClientRect();
  const ix=Math.max(0,Math.min(r.right,q.right)-Math.max(r.left,q.left)),iy=Math.max(0,Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top));const ar=ix*iy,mn=Math.min(r.width*r.height,q.width*q.height);
  if(mn>0&&ar/mn>.25){const pt=document.elementFromPoint((Math.max(r.left,q.left)+Math.min(r.right,q.right))/2,(Math.max(r.top,q.top)+Math.min(r.bottom,q.bottom))/2);lap.push(name(a)+' × '+name(b)+` ${Math.round(ar/mn*100)}% 上面=${pt?name(pt):'?'}`)}}
 return {out,clip:[...new Set(clip)].slice(0,12),lap:lap.slice(0,12),hscroll:document.documentElement.scrollWidth>W+1}};
(async()=>{const b=await L.chromium.launch();const RES={};const errsAll=[];
 for(const [vn,vp] of Object.entries(VPS)){const errs=[];
  const owned=ver==='app'?['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']:[];
  const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10)});
  const {ctx,page}=await L.open(b,{ver,hero:'princess',errs,owned,vp,save:sv});
  await ev(page,`(()=>{S.rest=0;TM.since=0;V2.dayLimit=0})()`);
  const shot=async scene=>{await page.waitForTimeout(600);const f=`${OUT}${scene}_${ver}_${vn}.png`;await page.screenshot({path:f});const c=await page.evaluate(CHECK);RES[`${scene}_${ver}_${vn}`]=c;
   const bad=c.out.length||c.clip.length||c.lap.length||c.hscroll;console.log(bad?'CHECK':'ok   ',scene,vn,bad?JSON.stringify(c).slice(0,600):'')};
  const clean=()=>ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false})()`);
  for(const ch of [41,42,43,44,45]){
   // 章節地圖
   await clean();await ev(page,`(()=>{setCh(${ch-1});S.prog=10;go('map')})()`);await page.waitForTimeout(2200);await clean();await shot(`ch${ch}_map`);
   // 開場故事（拆段故事的鉤子頁）
   if(ch===41||ch===45){await clean();await ev(page,`(()=>{V2.st19off=0;go('world')})()`);await page.waitForTimeout(1500);await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="${ch-1}"]');n&&n.click()})()`);await page.waitForTimeout(2500);await shot(`ch${ch}_story`)}
   // 兩關的題目畫面
   for(const lv of [2,7]){await clean();await ev(page,`(()=>{S.pmode=null;setCh(${ch-1});S.prog=10;startLevel(${lv})})()`);await page.waitForTimeout(1500);
    await shot(`ch${ch}_lv${lv+1}_intro`);
    await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const x=o.querySelector('button');if(x)x.click()}});await page.waitForTimeout(1500);await shot(`ch${ch}_lv${lv+1}_q1`)}}
  // 地球儀
  await clean();await ev(page,`go('globe8')`);await page.waitForTimeout(4500);await shot('globe_free');
  await page.evaluate(()=>{const c=document.querySelector('#gl8cv');if(c){const r=c.getBoundingClientRect();__gl8.tap(__gl8.VW.cx,__gl8.VW.cy)}});await page.waitForTimeout(1200);await shot('globe_tap');
  await page.evaluate(()=>{const x=document.querySelector('#gl8card .gl8x');if(x&&x.offsetParent)x.click();const f=document.querySelector('#gl8find');f&&f.click()});await page.waitForTimeout(900);await shot('globe_menu');
  await page.evaluate(()=>{const d=document.querySelector('#gl8diffs [data-v="mid"]');d&&d.click();const g=document.querySelector('#gl8go');g&&g.click()});await page.waitForTimeout(3500);await shot('globe_find');
  // 小小攝影師
  await clean();await ev(page,`(()=>{V2.parkSeen=Object.assign(V2.parkSeen||{},{photo8:3});go('photo8')})()`);await page.waitForTimeout(3000);await shot('photo_menu');
  await page.evaluate(()=>{const d=document.querySelector('#ph8diffs .ph8opt[data-v="hard"]');d&&d.click();const g=document.querySelector('#ph8go');g&&g.click()});await page.waitForTimeout(3000);await shot('photo_play');
  await page.evaluate(()=>{try{const g=__p8.G();const fr=__p8.solve(g.M,g.q);__p8.aim(fr)}catch(e){}});await page.waitForTimeout(600);await shot('photo_aim');
  await page.evaluate(()=>{const s=document.querySelector('#ph8shut');s&&s.click()});await page.waitForTimeout(1500);await shot('photo_snap');
  errsAll.push(...errs.filter(e=>!/promo\.json/.test(e)).map(e=>vn+' '+e));await ctx.close()}
 fs.writeFileSync(__dirname+`/logs/shots_check_${ver}.json`,JSON.stringify(RES,null,1));console.log('errors',errsAll.slice(0,10));await b.close()})();

// UI/UX 總檢截圖（2026-11-27 星光工作室 Starlight Studio）：node tour.js padL|ip  [part=A,B,C]
const L=require('../s7/lib');const fs=require('fs');
const VPS={padL:{width:1180,height:820},ip:{width:390,height:844},padP:{width:820,height:1180}};
const vn=process.argv[2]||'padL';const parts=(process.argv[3]||'A,B,C').split(',');const vp=VPS[vn];
const OUT=__dirname+'/shots/'+vn+'/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await L.chromium.launch();const errs=[];
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1});
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,vp,save:sv,v2:{s3pw:1,gateTour:1}});
 const ev=c=>page.evaluate(x=>__ev(x),c);
 await ev(`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0})()`).catch(()=>{});
 const shot=async(n,w=700)=>{await page.waitForTimeout(w);await page.screenshot({path:OUT+n+'.png'});console.log('shot',n,await ev('S.screen').catch(()=>'?'))};
 const clean=()=>ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;S.pmode=null})()`).catch(()=>{});
 const ovClick=()=>page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const x=o.querySelector('button');if(x)x.click()}});
 const T=async(n,f)=>{try{await f()}catch(e){console.log('FAIL',n,String(e).slice(0,160))}};
 if(parts.includes('A')){ // 每章關卡畫面
  const chs=vn==='padL'?[...Array(45).keys()].map(i=>i+1):[1,5,10,12,16,21,26,31,36,41,44];
  for(const ch of chs)await T('ch'+ch,async()=>{await clean();await ev(`(()=>{setCh(${ch-1});S.prog=10;S.diff='mid';startLevel(2)})()`);await page.waitForTimeout(1300);
   if(ch%5===1||vn!=='padL')await shot(`A_ch${String(ch).padStart(2,'0')}_intro`,200);
   await ovClick();await shot(`A_ch${String(ch).padStart(2,'0')}_q`,1600)})}
 if(parts.includes('B')){ // 流程畫面
  await T('title',async()=>{await clean();await ev(`go('title')`);await shot('B01_title',1800)});
  await T('world',async()=>{await clean();await ev(`go('world')`);await shot('B02_world_top',1500);
   await page.evaluate(()=>{const a=[...document.querySelectorAll('.arc')];const m=a[Math.floor(a.length/2)];m&&m.scrollIntoView()});await shot('B03_world_mid');
   await page.evaluate(()=>{const a=[...document.querySelectorAll('.arc')].pop();a&&a.scrollIntoView()});await shot('B04_world_end')});
  for(const ch of [5,41])await T('map'+ch,async()=>{await clean();await ev(`(()=>{setCh(${ch-1});S.prog=6;go('map')})()`);await shot(`B05_map_ch${ch}`,1800)});
  for(const ch of [5,41])await T('lvdone'+ch,async()=>{await clean();await ev(`(()=>{setCh(${ch-1});S.prog=3;S.diff='mid';startLevel(3)})()`);await page.waitForTimeout(1300);await ovClick();await page.waitForTimeout(800);
   await ev(`(()=>{S.q=S.qs.length-1;S.lock=false;right(document.querySelector('.stage .play')||document.body,[])})()`);await shot(`B06_correct_ch${ch}`,500);await shot(`B07_lvdone_ch${ch}`,6000)});
  for(const ch of [36,41])await T('seg'+ch,async()=>{await clean();await ev(`(()=>{setCh(${ch-1});go('story19',{mode:'seg',c:${ch-1},k:0})})()`);await shot(`B08_storyseg_ch${ch}`,1800)});
  await T('story5',async()=>{await clean();await ev(`(()=>{setCh(4);go('story')})()`);await shot('B09_story_ch5',2000)});
  for(const ch of [10,41])await T('chend'+ch,async()=>{await clean();await ev(`(()=>{setCh(${ch-1});S.prog=10;go('chend')})()`);
   for(let i=0;i<30&&await ev('S.screen')!=='chend';i++){await page.evaluate(()=>{const s=[...document.querySelectorAll('button')].find(b=>/跳過/.test(b.textContent)&&b.offsetParent);if(s)s.click()});await page.waitForTimeout(400)}
   await shot(`B10_chend_ch${ch}_a`,1500);await shot(`B10_chend_ch${ch}_b`,3500)});
 }
 if(parts.includes('C')){ // 遊樂園、家、創作
  const go1=async(n,code,w=2200)=>T(n,async()=>{await clean();await ev(`(()=>{S.from='park';${code}})()`);await shot(n,w)});
  await go1('C01_park',`go('park')`);
  await T('park_scroll',async()=>{await page.evaluate(()=>{const s=document.querySelector('#screen');const el=[...document.querySelectorAll('#screen *')].find(e=>e.scrollHeight>e.clientHeight+50&&/(auto|scroll)/.test(getComputedStyle(e).overflowY));if(el)el.scrollTop=el.scrollHeight;else window.scrollTo(0,99999)});await shot('C02_park_end')});
  const games=['cashier','floatsink','farm','recyclesort','dance','idolstage','eact','rocket26','fossil26','chef5','piggy5','vine6','photo8','globe8','storyhouse','coloring','album','dex','pethouse','room','wardrobe','practice'];
  let i=3;for(const g of games){await go1(`C${String(i++).padStart(2,'0')}_${g}`,`go('${g}')`,3500)}
  await T('book',async()=>{await clean();await ev(`(()=>{S.from='park';go('storyhouse')})()`);await page.waitForTimeout(1500);await page.evaluate(()=>{const c=document.querySelector('#screen .scover[data-i]');c&&c.click()});await page.waitForTimeout(1200);await page.evaluate(()=>{const c=document.querySelector('#screen .scover[data-i]');c&&c.click()});await shot('C40_book_open',2500)});
  await T('color1',async()=>{await clean();await ev(`(()=>{S.from='park';go('coloring')})()`);await page.waitForTimeout(1500);await page.evaluate(()=>{const c=document.querySelector('#screen .cpick, #screen [data-pic], #screen .ccard');c&&c.click()});await shot('C41_coloring_open',2000)});
  await T('parent',async()=>{await clean();await ev(`(()=>{go('title');setTimeout(()=>{try{parentPanel()}catch(e){}},500)})()`);await shot('C42_parent',2500)});
 }
 console.log('errs',JSON.stringify(errs.filter(e=>!/promo\.json|Failed to load/.test(e)).slice(0,8)));await b.close()})();

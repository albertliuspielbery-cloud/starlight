// 地球儀國家輪廓預覽（給 Albert）：App 版 8982，deviceScaleFactor 2。node outline_shots.js
const { chromium } = require('playwright');const fs=require('fs');
const OUT='/mnt/user-data/outputs/s7預覽/地球儀輪廓/';
const VPS=[['iphone',390,844],['ipad',1180,820]];
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [nm,W,H] of VPS){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(nm+' '+e.message));
  await p.addInitScript(fs.readFileSync(__dirname+'/../iapmock.js','utf8'));
  await p.goto('http://127.0.0.1:8982/index.html');await p.waitForFunction(()=>typeof window.__ev==='function',null,{timeout:90000});await p.waitForTimeout(2500);
  const ev=x=>p.evaluate(s=>__ev(s),x);
  await ev("iapSave(['full','stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']);S.chDone=45;V2.s3pw=1;save();go('globe8')");await p.waitForTimeout(6500);
  if(await ev('S.screen')!=='globe8')throw new Error('not in globe8');
  const hide=()=>ev("(()=>{const b=document.querySelector('#gl8bub');b.textContent='';b.classList.add('off');document.querySelector('#gl8tags').innerHTML='';const c=document.querySelector('#gl8card');c.hidden=true;document.querySelector('.gl8').classList.remove('carded');__gl8.FX.sel=null;__gl8.need()})()");
  const shot=async f=>{await p.waitForTimeout(500);await p.screenshot({path:OUT+f})};
  await hide();await ev("__gl8.panTo(100,28,0)");await shot(`${nm}_1_亞洲面.png`);
  await ev("__gl8.panTo(12,47,0)");await shot(`${nm}_2_歐洲面.png`);
  await ev("window.__GL8_OUTLINE=false;__gl8.need()");await shot(`${nm}_2b_歐洲面_對照沒有輪廓.png`);await ev("window.__GL8_OUTLINE=true;__gl8.need()");
  // 點台灣（真的點）
  await ev("__gl8.setZoom(1.35);__gl8.panTo(121,22,0)");await p.waitForTimeout(300);
  const box=await (await p.$('#gl8cv')).boundingBox();let q=await ev("__gl8.proj(120.95,23.7)");await p.mouse.click(box.x+q.X,box.y+q.Y);await shot(`${nm}_3_點台灣.png`);
  // 點歐洲小國：瑞士（放大一點，像孩子按了一次＋）
  await hide();await ev("__gl8.setZoom(1.8);__gl8.panTo(8.2,47,0)");await p.waitForTimeout(300);q=await ev("__gl8.ctr('ch')");await p.mouse.click(box.x+q.X,box.y+q.Y);await shot(`${nm}_4_點瑞士.png`);
  const got=await ev("document.querySelector('#gl8card').textContent");if(!/瑞士/.test(got))errs.push(nm+' 點瑞士沒跳小卡 '+got.slice(0,20));
  // 2026-11-25 加的國家：點中國、俄羅斯、芬蘭、阿聯酋
  for(const [k,zm,nmz,re] of [['cn',1,'5_點中國',/長城/],['ru',1,'6_點俄羅斯',/最大/],['fi',1.35,'7_點芬蘭',/極光/],['ae',1.8,'8_點阿聯酋',/杜拜/],['mn',1.35,'9_點蒙古',/蒙古包/]]){
   await hide();await ev(`(()=>{const c=__gl8.ctr('${k}').c;__gl8.setZoom(${zm});__gl8.panTo(c[0],c[1]-(${zm}>1.5?0:6),0)})()`);await p.waitForTimeout(300);
   q=await ev(`__gl8.ctr('${k}')`);await p.mouse.click(box.x+q.X,box.y+q.Y);await shot(`${nm}_${nmz}.png`);
   const t=await ev("document.querySelector('#gl8card').textContent");if(!re.test(t))errs.push(nm+' '+k+' 沒跳對的小卡 '+t.slice(0,20))}
  await ctx.close()}
 console.log(errs.length?errs.join('\n'):'shots ok');await b.close()})();

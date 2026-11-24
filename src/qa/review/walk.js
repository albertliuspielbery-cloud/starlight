// 第 41～45 章走一遍：開場故事、每關開頭、拆段故事、過關、章末、季完結、獎狀。每個新畫面截圖＋版面檢查＋語音缺漏。
// node walk.js <vp> [chs] [web|app] [hero]
const R=require('./rlib');const Q=require('../s7/qtest');const fs=require('fs');
const vp=process.argv[2]||'se';const CHS=(process.argv[3]||'41,42,43,44,45').split(',').map(Number);const ver=process.argv[4]||'web';const hero=process.argv[5]||'princess';
const SH=__dirname+'/B_shots/';const tag=`w_${ver}_${hero}_${vp}${process.env.NOVO?'_novo':''}`;const LOG=[];const log=(...a)=>{const s=a.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' ');LOG.push(s);console.log(s)};
const ev=R.ev;let shotN=0;const seen=new Set();
async function snap(page,name,force){const sig=await page.evaluate(()=>{const ov=[...document.querySelectorAll('.overlay')].pop();const t=(ov?ov.textContent:(document.querySelector('.st19text,.prompt')||{}).textContent)||'';return __ev('S.screen')+'|'+t.trim().slice(0,40)});
 if(!force&&seen.has(sig))return;seen.add(sig);const f=`${tag}_${String(++shotN).padStart(3,'0')}_${name}.png`;await page.screenshot({path:SH+f});
 const lay=await R.layout(page);const bad=lay.off.length||lay.clip.length||lay.scroll.doc;log('SHOT',f,sig.slice(0,60),bad?JSON.stringify({off:lay.off,clip:lay.clip,scroll:lay.scroll.doc}):'',lay.small.length?'small:'+lay.small.join('|'):'')}
async function clickThrough(page,until,label,max=70){
 for(let i=0;i<max;i++){const st=await ev(page,`({scr:S.screen,ov:!!document.querySelector('.overlay'),prog:S.prog,ch:S.ch})`);if(await until(st))return true;
  await page.waitForTimeout(500);await snap(page,label+'_'+st.scr);
  await page.evaluate(()=>{const vis=e=>e&&e.offsetParent!==null&&!e.disabled;
   const ov=[...document.querySelectorAll('.overlay')].pop();let b=null;
   if(ov){b=[...ov.querySelectorAll('#next,#cont,#ok,#certok,#ck,.btn')].find(vis)||[...ov.querySelectorAll('button,[role=button]')].find(vis)||[...ov.querySelectorAll('.rbody *')].find(e=>vis(e)&&typeof e.onclick==='function')||[...ov.querySelectorAll('.rbody *')].find(e=>vis(e)&&getComputedStyle(e).cursor==='pointer')}
   if(!b){b=[...document.querySelectorAll('#st19skip,#next,#go,.st19next,.btn')].find(vis)}
   if(b){if(typeof b.click==='function')b.click();else b.dispatchEvent(new MouseEvent('click',{bubbles:true}));b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))}else document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});
  await page.waitForTimeout(900)}return false}
async function playLevel(page,ch,lv){
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(${ch-1});S.diff='mid';S.prog=Math.max(S.prog,${lv});save();going=false;startLevel(${lv})})()`);
 await page.waitForTimeout(1600);await snap(page,`c${ch}l${lv+1}_intro`,true);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});await page.waitForTimeout(900);
 const n=await ev(page,`S.qs.length`);const info=[];
 for(let q=0;q<n;q++){await page.waitForTimeout(500);const cur=await ev(page,`({q:S.q,code:S.qs[S.q],scr:S.screen})`);if(cur.scr!=='stage')break;
  await snap(page,`c${ch}l${lv+1}q${q}`,true);
  if(q===0&&lv===0){await Q.wrongOnce(page);await page.waitForTimeout(400);await snap(page,`c${ch}l${lv+1}_wrong`,true);const p=await Q.petHelp(page);await snap(page,`c${ch}l${lv+1}_pethelp`,true);info.push('pet:'+p)}
  const a=await Q.answer(page);info.push(`${cur.code}=${a}`);if(/NO$/.test(a))break}
 return info}
(async()=>{const b=await R.chromium.launch();const {ctx,page,errs}=await R.open(b,{vp,ver,hero});if(process.env.NOVO){await page.route(/\/voice\/(pack|index)/,r=>r.abort());await page.reload();await page.waitForTimeout(3000);await page.evaluate(()=>{window.__miss=[];window.__tts=[]})}
 await ev(page,`go('world')`);await page.waitForTimeout(1500);
 await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));if(a)a.scrollIntoView({block:'center'})})()`);await page.waitForTimeout(800);await snap(page,'world',true);
 if(CHS[0]===41){await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="40"]');n&&n.click()})()`);await page.waitForTimeout(2500);
  await clickThrough(page,async st=>st.scr==='map'&&!st.ov||st.scr==='stage','open41',40)}
 for(const ch of CHS){for(let lv=0;lv<(+process.env.NLV||10);lv++){await page.evaluate(()=>{__miss.length=0});const info=await playLevel(page,ch,lv);
   await clickThrough(page,async st=>lv===9?st.scr==='chend'||(st.scr==='map'&&!st.ov&&ch!==45):(st.scr==='map'&&!st.ov),`c${ch}l${lv+1}_end`);
   const miss=await page.evaluate(()=>[...new Set(__miss)]);log('LV',ch,lv+1,info.join(' ; '),miss.length?'MISSVO:'+JSON.stringify(miss):'')}
  if(ch===45){await page.waitForTimeout(2000);await snap(page,'fin7',true);await ev(page,`(()=>{const g=document.querySelector('#gcert');g&&g.click()})()`);await page.waitForTimeout(2000);await snap(page,'cert7',true);
   await clickThrough(page,async st=>st.scr==='map'||st.scr==='world'||st.scr==='title','after45',30);await snap(page,'after45',true)}
  else await clickThrough(page,async st=>st.scr==='map'||st.scr==='world'||st.scr==='title',`c${ch}_chend`,30)}
 const tts=await page.evaluate(()=>__tts);log('DEVICE_TTS',JSON.stringify(tts));
 log('ERRS',JSON.stringify(errs.filter(e=>!/favicon|Failed to load/.test(e)).slice(0,15)));
 fs.writeFileSync(__dirname+`/B_tmp/${tag}_${CHS.join('')}.log`,LOG.join('\n'));await b.close()})();

// 量身高預覽：node shots.js [web|app] [outdir]
const L=require('../s7/lib');const Q=require('../s7/qtest');const fs=require('fs');
const ver=process.argv[2]||'web';const OUT=process.argv[3]||'/mnt/user-data/outputs/s7預覽/量身高/';fs.mkdirSync(OUT,{recursive:true});
const VPS={padL:{width:1180,height:820},se:{width:375,height:667},land:{width:844,height:390}};
async function openP(b,vp){const ctx=await b.newContext({viewport:vp,deviceScaleFactor:2,hasTouch:vp.width<700});const page=await ctx.newPage();const errs=[];
 page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{if(/measure7|m7f|b7 /.test(m.text()))errs.push(m.text())});
 const sv=L.save40('princess');
 await page.addInitScript(([sv])=>{try{if(!sessionStorage.getItem('__init')){sessionStorage.setItem('__init','1');localStorage.setItem('pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero:'princess',chosen:1}]}));localStorage.setItem('pp4',JSON.stringify(sv));localStorage.setItem('pp4v2',JSON.stringify({listenFirst:false,s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1}))}}catch(e){}},[sv]);
 await page.goto(L.URL[ver]);await page.waitForFunction(()=>typeof window.__ev==='function'&&document.querySelector('#screen'),null,{timeout:90000}).catch(()=>{});await page.waitForTimeout(2500);return {ctx,page,errs}}
async function q(page,diff,who,tag,fillAll){
 await page.evaluate(w=>{const B=window.__s7q.NQ.blk;B.__who0=B.__who0||B.who.slice();B.who=w.map(k=>B.__who0.find(x=>x[0]===k))},who);
 const info=await Q.playQ(page,'measure:s7blk',diff,42);await page.waitForTimeout(1400);
 if(fillAll)await page.evaluate(()=>__ev(`(()=>{for(let i=0;i<20;i++){const t=document.querySelector('.b7tray .b7t');const st=document.querySelector('.b7stack .b7col');if(!t||st.children.length>=S.ans)break;t.click()}})()`));
 await page.waitForTimeout(700);
 const m=await page.evaluate(()=>[...document.querySelectorAll('.b7fig')].map(f=>{const an=f.querySelector('.b7an'),svg=an&&an.querySelector('svg'),col=f.querySelector('.b7col');const r=svg.getBoundingClientRect(),c=col.getBoundingClientRect(),stk=f.querySelector('.b7stack').getBoundingClientRect(),ar=an.getBoundingClientRect();const u=parseFloat(getComputedStyle(document.querySelector('.b7wrap')).getPropertyValue('--u'))||col.firstElementChild&&col.firstElementChild.getBoundingClientRect().height;
  return {k:svg.getAttribute('data-m7f')||svg.getAttribute('data-an'),h:+getComputedStyle(f).getPropertyValue('--h'),figH:+(r.height).toFixed(1),u:col.children.length?+(c.height/col.children.length).toFixed(2):null,blocksH:+c.height.toFixed(1),feet:+r.bottom.toFixed(1),colBottom:+c.bottom.toFixed(1),stackBottom:+stk.bottom.toFixed(1),anBottom:+ar.bottom.toFixed(1),figTop:+r.top.toFixed(1),colTop:+c.top.toFixed(1),line:f.closest('.m7fline')?+f.getBoundingClientRect().top.toFixed(1):null}}));
 await page.screenshot({path:OUT+tag+'.png'});return {tag,prompt:info.prompt,m}}
(async()=>{const b=await L.chromium.launch();const res=[];
 for(const [vk,vp] of Object.entries(VPS)){const {ctx,page,errs}=await openP(b,vp);
  if(vk==='padL'){
   res.push(await q(page,'easy',['dog'],`題目_${ver}_iPad橫_量身高_小狗_疊好`,true));
   res.push(await q(page,'easy',['bunny'],`題目_${ver}_iPad橫_量身高_小兔_剛出題`,false));
   res.push(await q(page,'hard',['hedgehog','bunny'],`題目_${ver}_iPad橫_比高矮_刺蝟和小兔`,false));
   res.push(await q(page,'hard',['dog','penguin'],`題目_${ver}_iPad橫_比高矮_小狗和企鵝`,false));
   res.push(await q(page,'hard',['kitten','duck'],`題目_${ver}_iPad橫_比高矮_小貓和小鴨`,false));
  }else{
   res.push(await q(page,'easy',['hedgehog'],`題目_${ver}_${vk}_量身高_刺蝟_疊好`,true));
   res.push(await q(page,'hard',['dog','bunny'],`題目_${ver}_${vk}_比高矮_小狗和小兔`,false));}
  if(errs.length)console.log('ERRS',vk,errs.slice(0,5));await ctx.close()}
 for(const r of res){console.log(r.tag,'|',r.prompt.slice(0,20));for(const m of r.m)console.log('  ',JSON.stringify(m))}
 await b.close()})();

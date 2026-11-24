// 第七季整合測試（2026-11-22 星光工作室 Starlight Studio）
// node test_s7.js <web|app> <princess|prince> [chapters=41,42,43,44,45] [diff=mid]
// 從第 40 章完成的存檔開始：大地圖第九段 → 第 41～45 章每一關（每關第一題先答錯、點寵物幫忙，再答對）→ 季完結獎狀；
// 拆段故事、App 付費鎖、回歸（36～40 抽測、大地圖、遊樂園、家長購買頁）。截圖存 shots/。
const L=require('./lib');const fs=require('fs');const Q=require('./qtest');
const ver=process.argv[2]||'web',hero=process.argv[3]||'princess';
const CHS=(process.argv[4]||'41,42,43,44,45').split(',').map(Number);const DIFF=process.argv[5]||'mid';
const SH=__dirname+'/shots/';const tag=`${ver}_${hero}`;
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,d)};
const ev=(p,code)=>p.evaluate(c=>__ev(c),code);
async function clickThrough(page,until,max=60){
 for(let i=0;i<max;i++){const st=await ev(page,`({scr:S.screen,ov:!!document.querySelector('.overlay'),prog:S.prog,ch:S.ch})`);if(await until(st))return true;
  await page.evaluate(()=>{const vis=e=>e&&e.offsetParent!==null&&!e.disabled;
   const ov=[...document.querySelectorAll('.overlay')].pop();let b=null;
   if(ov){b=[...ov.querySelectorAll('#next,#cont,#ok,#certok,#ck,.btn')].find(vis)||[...ov.querySelectorAll('button,[role=button]')].find(vis)||[...ov.querySelectorAll('.rbody *')].find(e=>vis(e)&&typeof e.onclick==='function')||[...ov.querySelectorAll('.rbody *')].find(e=>vis(e)&&getComputedStyle(e).cursor==='pointer')}
   if(!b){b=[...document.querySelectorAll('#st19skip,#next,#go,.st19next,.btn')].find(vis)}
   if(b){if(typeof b.click==='function')b.click();else b.dispatchEvent(new MouseEvent('click',{bubbles:true}));b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))}else document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});
  await page.waitForTimeout(700)}return false}
async function playLevel(page,ch,lv){
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(${ch-1});S.diff='${DIFF}';S.prog=Math.max(S.prog,${lv});save();going=false;startLevel(${lv})})()`);
 await page.waitForTimeout(900);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});await page.waitForTimeout(700);
 const n=await ev(page,`S.qs.length`);const info=[];
 for(let q=0;q<n;q++){await page.waitForTimeout(400);
  const cur=await ev(page,`({q:S.q,code:S.qs[S.q],scr:S.screen})`);if(cur.scr!=='stage')break;
  let pet='-',wr='-';
  if(q===0){wr=await Q.wrongOnce(page);pet=await Q.petHelp(page)}
  const a=await Q.answer(page);info.push(`${cur.code}${q===0?`[wrong:${wr},pet:${pet}]`:''}=${a}`);
  if(/NO$/.test(a))break}
 return info}
(async()=>{const b=await L.chromium.launch();const errs=[];
 const owned=ver==='app'?['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']:[];
 const {ctx,page}=await L.open(b,{ver,hero,errs,owned});
 await page.evaluate(()=>{window.__s7log=[]});
 // 1. 大地圖第九段
 await ev(page,`go('world')`);await page.waitForTimeout(1500);
 const w=await ev(page,`(()=>{const a=[...document.querySelectorAll('.arc')].find(x=>/第九段/.test(x.textContent));if(a)a.scrollIntoView();return a?{t:a.textContent.slice(0,60),nodes:[...a.querySelectorAll('.wnode')].map(n=>n.className.replace('wnode ',''))}:null})()`);
 ok('地圖第九段',!!w&&w.nodes.length===5&&!/lock/.test(w.nodes[0]),JSON.stringify(w));await page.waitForTimeout(500);await page.screenshot({path:SH+`${tag}_world.png`});
 // 2. 第 41 章開場（拆段故事的鉤子）
 await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="40"]');n&&n.click()})()`);await page.waitForTimeout(2500);
 const s1=await ev(page,`({scr:S.screen,ch:S.ch,hook:!!document.querySelector('.st19.hook'),text:(document.querySelector('.st19text')||{}).textContent||''})`);
 ok('第41章開場拆段故事',s1.scr==='story19'&&s1.hook&&s1.ch===40,JSON.stringify(s1));await page.screenshot({path:SH+`${tag}_story41.png`});
 // 3. 每章每關
 let segN=0;
 for(const ch of CHS){
  for(let lv=0;lv<10;lv++){const info=await playLevel(page,ch,lv);const bad=info.filter(x=>/NO$|REMOVED-RIGHT/.test(x));
   ok(`第${ch}章第${lv+1}關`,!bad.length&&info.length>0,info.join(' ; '));
   if(lv===0)await page.screenshot({path:SH+`${tag}_ch${ch}_play.png`});
   // 過關、獎勵、拆段故事 → 回到地圖（第 10 關是章末）
   let seg=0;const okEnd=await clickThrough(page,async st=>{if(st.scr==='story19')seg++;return lv===9?st.scr==='chend'||(st.scr==='map'&&!st.ov&&ch!==45):(st.scr==='map'&&!st.ov)});if(seg)segN++;
   const st=await ev(page,`({scr:S.screen,prog:S.prog,done:S.chDone,seg:!!document.querySelector('.st19.m-seg')})`);
   if(!okEnd)ok(`第${ch}章第${lv+1}關 過關流程`,false,JSON.stringify(st))}
  ok(`第${ch}章 拆段故事有出現`,segN>0,'段數 '+segN);segN=0;
  const d=await ev(page,`({done:S.chDone,owned:S.owned.slice(-4)})`);ok(`第${ch}章完成`,d.done>=ch,JSON.stringify(d));
  if(ch===45){await page.waitForTimeout(1500);const f=await ev(page,`({fin:!!document.querySelector('.fin7'),h:(document.querySelector('.fin7 .endh')||{}).textContent})`);ok('季完結頒獎典禮',f.fin,JSON.stringify(f));
   await page.screenshot({path:SH+`${tag}_fin7.png`});await ev(page,`(()=>{const g=document.querySelector('#gcert');g&&g.click()})()`);await page.waitForTimeout(1500);
   const c=await ev(page,`({cert:!!document.querySelector('.cert7'),t:(document.querySelector('.cert7 .certtt')||{}).textContent,k:!!V2[CERT7K()]})`);ok('獎狀「城市小旅行家」',c.cert&&c.t==='城市小旅行家'&&c.k,JSON.stringify(c));
   await page.screenshot({path:SH+`${tag}_cert7.png`})}
  else{await clickThrough(page,async st=>st.scr==='map'||st.scr==='world'||st.scr==='title',30)}}
 // 4. 回歸：36、40 章各抽一關、大地圖、遊樂園、家長購買頁
 for(const [ch,lv] of [[36,2],[40,5]]){const info=await playLevel(page,ch,lv);ok(`回歸 第${ch}章第${lv+1}關`,!info.some(x=>/NO$/.test(x)),info.join(' ; '));await clickThrough(page,async st=>st.scr==='map'&&!st.ov,40)}
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false;go('world')})()`);await page.waitForTimeout(1500);ok('回歸 大地圖',await ev(page,`document.querySelectorAll('.arc').length===9&&!!document.querySelector('#wcert')`));
 await ev(page,`(()=>{going=false;go('park')})()`);await page.waitForTimeout(2000);const pk=await ev(page,`({scr:S.screen,cards:document.querySelectorAll('.pcard').length})`);ok('回歸 遊樂園大門',pk.scr==='park'&&pk.cards>0,JSON.stringify(pk));await page.screenshot({path:SH+`${tag}_park.png`});
 if(ver==='app'){await ev(page,`(()=>{going=false;go('title');setTimeout(()=>window.__iapShopRaw&&__iapShopRaw(),800)})()`);await page.waitForTimeout(4000);
  const sp=await ev(page,`(()=>{const c=document.querySelector('.iapcard');return c?{seg7:!!c.querySelector('.f3seg[data-seg="s7"]'),rows:[...c.querySelectorAll('.iaprow')].map(r=>r.textContent.replace(/\\s+/g,' ').slice(0,40))}:null})()`);
  ok('回歸 家長購買頁',!!sp&&sp.seg7&&sp.rows.some(r=>/第四十一～四十五章/.test(r)),JSON.stringify(sp));await page.screenshot({path:SH+`${tag}_shop.png`,fullPage:false})}
 // 念的句子都要在 TSV 或語音索引
 const said=await page.evaluate(()=>[...new Set(window.__s7log||[])]);fs.writeFileSync(__dirname+`/said_${tag}.json`,JSON.stringify(said,null,1));
 const E=errs.filter(e=>!/TUNNEL|ERR_|favicon|Failed to load resource/.test(e));ok('沒有 console 錯誤',!E.length,E.slice(0,10).join(' | '));
 fs.writeFileSync(__dirname+`/result_${tag}.json`,JSON.stringify(R,null,1));
 console.log('SUMMARY',tag,R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

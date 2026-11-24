// 5.4.0 回歸測試：舊章抽關、大地圖、遊樂園大門和各小遊戲進出、換裝間、房間、寵物小屋、收集冊、家長專區、故事屋。node regress.js <web|app> <princess|prince>
const L=require('../s7/lib');const Q=require('../s7/qtest');const fs=require('fs');
const ver=process.argv[2]||'web',hero=process.argv[3]||'princess';const tag=`${ver}_${hero}`;const SH=__dirname+'/shots/reg_'+tag+'_';
const T0=Date.now();const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',k,d,'@'+Math.round((Date.now()-T0)/1000)+'s')};
const ev=(p,code)=>p.evaluate(c=>__ev(c),code);
async function clickThrough(page,until,max=60){
 for(let i=0;i<max;i++){const st=await ev(page,`({scr:S.screen,ov:!!document.querySelector('.overlay'),prog:S.prog,ch:S.ch})`);if(await until(st))return true;
  await page.evaluate(()=>{const vis=e=>e&&e.offsetParent!==null&&!e.disabled;const CK=window.__ctClicked=window.__ctClicked||new WeakSet();const fresh=e=>vis(e)&&!CK.has(e)&&!e.classList.contains('popd')&&!(e.dataset&&e.dataset.p);const pick=l=>l.find(fresh)||l.find(vis);
   const ov=[...document.querySelectorAll('.overlay')].pop();let b=null;
   if(ov){b=pick([...ov.querySelectorAll('#next,#cont,#ok,#certok,#ck,.btn')])||pick([...ov.querySelectorAll('button,[role=button]')])||[...ov.querySelectorAll('.rbody *')].find(e=>fresh(e)&&typeof e.onclick==='function')}
   if(!b){b=[...document.querySelectorAll('#st19skip,#next,#go,.st19next,.btn')].find(vis)}
   if(b){CK.add(b);b.click()}else document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});
  await page.waitForTimeout(700)}return false}
async function playLevel(page,ch,lv){
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;S.rest=0;TM.since=0;setCh(${ch-1});S.prog=Math.max(S.prog,${lv});save();going=false;startLevel(${lv})})()`);
 await page.waitForTimeout(1200);await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});await page.waitForTimeout(800);
 const info=[];for(let q=0;q<14;q++){await page.waitForTimeout(400);const cur=await ev(page,`({q:S.q,code:String(S.qs[S.q]),scr:S.screen,n:S.qs.length})`);if(cur.scr!=='stage'||cur.q>=cur.n)break;
  const a=await Q.answer(page);info.push(`${cur.code}=${a}`);if(/NO$/.test(a))break}
 const done=await clickThrough(page,async st=>st.scr==='map'&&!st.ov);let dd='';if(!done)dd=await ev(page,`JSON.stringify({scr:S.screen,q:S.q,n:S.qs.length,lock:S.lock,ov:[...document.querySelectorAll('.overlay')].map(o=>o.innerText.replace(/\\s+/g,' ').slice(0,120))})`);return {info,done,dd}}
const clean=async page=>ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());going=false})()`);
(async()=>{const b=await L.chromium.launch();const errs=[];
 const owned=ver==='app'?['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']:[];
 const sv=L.save40(hero,{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500});
 const {ctx,page}=await L.open(b,{ver,hero,errs,owned,save:sv,v2:{s3pw:1}});
 await ev(page,`(()=>{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0;save()})()`);
 // 1. 舊章各抽一關
 const LV=process.env.LEVELS?JSON.parse(process.env.LEVELS):[[1,1],[6,3],[21,2],[31,4],[36,6],[40,8]];const ONLY=!!process.env.LEVELS;
 for(const [ch,lv] of LV){const r=await playLevel(page,ch,lv);
  ok(`第${ch}章第${lv+1}關`,r.done&&r.info.length>0&&!r.info.some(x=>/NO$/.test(x)),r.info.join(' ; ')+(r.done?'':' 沒回到地圖 '+r.dd));
  if(ch===1)await page.screenshot({path:SH+'ch1map.png'})}
 if(ONLY){console.log(errs.slice(0,5));await b.close();return}
 // 2. 大地圖
 await clean(page);await ev(page,`go('world')`);await page.waitForTimeout(1800);
 const w=await ev(page,`({arcs:document.querySelectorAll('.arc').length,nodes:document.querySelectorAll('.wnode').length,lock:document.querySelectorAll('.wnode.lock,.wnode.paidlock').length})`);
 ok('大地圖九段 45 章都開',w.arcs===9&&w.nodes===45&&w.lock===0,JSON.stringify(w));await page.screenshot({path:SH+'world.png'});
 for(const i of [0,20,44]){await clean(page);await ev(page,`go('world')`);await page.waitForTimeout(1200);await ev(page,`(()=>{const n=document.querySelector('.wnode[data-i="${i}"]');n&&n.click()})()`);await page.waitForTimeout(2200);
  const s=await ev(page,`({scr:S.screen,ch:S.ch})`);ok(`大地圖點第${i+1}章進得去`,['map','story19','story','chapters'].includes(s.scr)&&s.ch===i,JSON.stringify(s))}
 // 3. 遊樂園大門、各小遊戲進出
 await clean(page);await ev(page,`go('park')`);await page.waitForTimeout(2000);
 const zones=await page.evaluate(()=>[...document.querySelectorAll('.gzt')].map(z=>z.dataset.z));ok('遊樂園大門四區',zones.length===4,zones.join(','));await page.screenshot({path:SH+'park.png'});
 const cards=await page.evaluate(()=>[...document.querySelectorAll('.pcard')].map(c=>({k:c.dataset.k,lk:c.classList.contains('lockd')})));
 ok('遊樂園沒有上鎖的卡（第45章完成）',!cards.some(c=>c.lk),JSON.stringify(cards.filter(c=>c.lk)));
 for(const z of zones){await page.evaluate(z=>{const t=document.querySelector(`.gzt[data-z="${z}"]`);t&&t.click()},z);await page.waitForTimeout(700);
  const vis=await page.evaluate(()=>[...document.querySelectorAll('.pcard')].filter(c=>c.offsetParent).map(c=>c.dataset.k));R.push(['INFO','大門分區 '+z,vis.join(',')]);console.log('INFO 分區',z,vis.join(','))}
 for(const c of cards){if(c.k==='practice')continue;const e0=errs.length;
  await clean(page);await ev(page,`(()=>{S.screen==='park'||go('park')})()`);await page.waitForTimeout(900);
  await ev(page,`(()=>{try{S.from='park';go('${c.k}')}catch(e){console.error('go ${c.k} '+e.message)}})()`);await page.waitForTimeout(2600);
  const s1=await ev(page,`S.screen`);if(['globe8','photo8','storyhouse','room','cbook','pethouse'].includes(c.k))await page.screenshot({path:SH+'game_'+c.k+'.png'});
  // 離開：返回鍵
  await page.evaluate(()=>{const b=document.querySelector('#pback,.pback,#back,.backbtn,[aria-label="回遊樂園"]');if(b)b.click()});await page.waitForTimeout(1800);
  let s2=await ev(page,`S.screen`);if(s2!=='park'){await clean(page);await ev(page,`go('park')`);await page.waitForTimeout(1200);s2=await ev(page,`S.screen`)+'(強制)'}
  ok(`小遊戲 ${c.k} 進出`,s1===c.k&&/^park/.test(s2)&&errs.length===e0,`進=${s1} 出=${s2} ${errs.slice(e0).join('|').slice(0,200)}`)}
 // 4. 換裝間、房間、寵物小屋、收集冊
 for(const sc of ['wardrobe','room','pethouse','cbook']){await clean(page);const e0=errs.length;await ev(page,`go('${sc}')`);await page.waitForTimeout(2200);
  const s=await ev(page,`({scr:S.screen,n:document.getElementById('screen').querySelectorAll('button').length})`);await page.screenshot({path:SH+sc+'.png'});
  if(sc==='wardrobe'){const t=await page.evaluate(()=>{const tabs=[...document.querySelectorAll('#screen .tab,#screen [data-slot],#screen .wtab')].filter(x=>x.offsetParent);tabs.slice(0,6).forEach(x=>x.click());return tabs.length});s.tabs=t}
  if(sc==='cbook'){s.tabs=await page.evaluate(()=>[...document.querySelectorAll('.cbtab b')].map(b=>b.textContent));for(let i=0;i<s.tabs.length;i++){await page.evaluate(i=>{const t=document.querySelectorAll('.cbtab')[i];t&&t.click()},i);await page.waitForTimeout(400)}}
  ok(`${sc} 打開`,s.scr===sc&&s.n>0&&errs.length===e0,JSON.stringify(s)+' '+errs.slice(e0).join('|').slice(0,200))}
 // 5. 家長專區：首頁、設定、學習報告、購買頁（App）
 await clean(page);await ev(page,`go('title')`);await page.waitForTimeout(1200);
 const e5=errs.length;await ev(page,`homeHub()`);await page.waitForTimeout(1200);
 const rows=await page.evaluate(()=>[...document.querySelectorAll('.card.hub .hrow')].map(r=>r.dataset.k+':'+(r.querySelector('b')||r).textContent.trim()));ok('家長專區打開',rows.length>3,rows.join(' | '));await page.screenshot({path:SH+'parent.png'});
 for(const k of ['lrep','set']){await clean(page);await ev(page,`homeHub()`);await page.waitForTimeout(800);await page.evaluate(k=>{const r=document.querySelector(`.card.hub .hrow[data-k="${k}"]`);r&&r.click()},k);await page.waitForTimeout(2000);
  const t=await page.evaluate(()=>{const o=[...document.querySelectorAll('.overlay')].pop();return o?o.innerText.replace(/\s+/g,' ').slice(0,160):''});await page.screenshot({path:SH+'parent_'+k+'.png'});ok(`家長專區 ${k}`,t.length>20,t)}
 if(ver==='app'){await clean(page);await ev(page,`setTimeout(()=>__iapShopRaw(),300)`);await page.waitForTimeout(3000);const t=await page.evaluate(()=>{const c=document.querySelector('.iapcard');return c?c.innerText.replace(/\s+/g,' ').slice(0,200):''});await page.screenshot({path:SH+'shop.png'});ok('家長購買頁',t.length>20,t)}
 ok('家長專區沒有錯誤',errs.length===e5,errs.slice(e5).join('|').slice(0,300));
 // 6. 故事屋：舊書一本讀完、新書（第七季兩本）
 await clean(page);await ev(page,`go('storyhouse')`);await page.waitForTimeout(2000);
 const books=await page.evaluate(()=>document.getElementById('screen').innerText);
 ok('故事屋有新書《圖書館的小聲音》《我的畫掛在牆上》（完成第45章）',/圖書館的小聲音/.test(books)&&/我的畫掛在牆上/.test(books),books.replace(/\s+/g,' ').slice(0,400));
 const bk=await page.evaluate(()=>{const c=[...document.querySelectorAll('#screen .scover')].find(e=>/小兔子的大紅蘿蔔/.test(e.textContent));if(c){c.click();return true}return false});await page.waitForTimeout(2500);
 let pages=0,lastPg='';for(let i=0;i<20;i++){const pg=await page.evaluate(()=>{const t=document.getElementById('screen').innerText.match(/(\d+) \/ (\d+)/);return t?t[0]:''});if(pg)lastPg=pg;
  const nx=await page.evaluate(()=>{const b=document.querySelector('#rnext');if(b&&b.offsetParent&&!b.disabled){b.click();return 1}const ov=[...document.querySelectorAll('.overlay')].pop();if(ov){const x=[...ov.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(x){x.click();return 2}}return 0});if(!nx)break;pages++;await page.waitForTimeout(1100);if(await ev(page,`S.screen`)!=='storyhouse')break}
 await page.screenshot({path:SH+'storybook.png'});ok('故事屋舊書《小兔子的大紅蘿蔔》打開、翻到最後',bk&&pages>3&&/5 \/ 5/.test(lastPg),`按了 ${pages} 次，最後頁碼 ${lastPg}`);
 // 7. 沒有 console 錯誤
 const E=errs.filter(e=>!/promo\.json/.test(e));ok('全程沒有 console 錯誤',!E.length,E.slice(0,8).join(' | '));
 fs.writeFileSync(__dirname+`/logs/reg_${tag}.json`,JSON.stringify(R,null,1));console.log('SUMMARY reg',tag,R.filter(r=>r[0]==='PASS').length,'/',R.filter(r=>r[0]!=='INFO').length);await b.close()})();

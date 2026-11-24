// 第七季故事屋新書測試（2026-11-24 星光工作室 Starlight Studio）
// node test.js <web|app> <princess|prince>
// 1. 完成第 45 章：故事屋出現《圖書館的小聲音》《我的畫掛在牆上》，從頭讀到尾（每頁截圖、記下背景與念的句子），答完小問題回到故事屋。
// 2. 完成第 41 章（沒完成第 42 章）：兩本都鎖住、點了不會打開。
// 3. 沒有 console 錯誤。
const L=require('../s7/lib');const fs=require('fs');
const ver=process.argv[2]||'web',hero=process.argv[3]||'princess';const tag=`${ver}_${hero}`;const SH=__dirname+'/'+tag+'_';
const R=[];const ok=(k,v,d='')=>{R.push([v?'PASS':'FAIL',k,d]);console.log(v?'PASS':'FAIL',tag,k,String(d).slice(0,300))};
const ev=(p,code)=>p.evaluate(c=>__ev(c),code);
const TITLES=['圖書館的小聲音','我的畫掛在牆上'];
const owned=ver==='app'?['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']:[];
async function toHouse(page){await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0;S.from='park';go('storyhouse')})()`);await page.waitForTimeout(1800)}
const covers=page=>page.evaluate(T=>[...document.querySelectorAll('#screen .sgrid:not(.advgrid) .scover[data-i]')].map(c=>({i:+c.dataset.i,t:(c.querySelector('b')||c).textContent.trim(),lk:c.classList.contains('lk99'),tag:(c.querySelector('i,.lk99t')||{}).textContent||''})),TITLES);
(async()=>{const b=await L.chromium.launch();
 // ---------- 1. 完成第 45 章 ----------
 {const errs=[];const sv=L.save40(hero,{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500});
  const {ctx,page}=await L.open(b,{ver,hero,errs,owned,save:sv,v2:{s3pw:1}});
  const info=await page.evaluate(()=>window.__books7||null);ok('m7g 接上',info&&info.idx.length===2,JSON.stringify(info));
  await toHouse(page);const cv=await covers(page);await page.screenshot({path:SH+'45_list.png'});await page.evaluate(()=>{const c=[...document.querySelectorAll('#screen .scover[data-i]')].pop();c&&c.scrollIntoView({block:'end'})});await page.waitForTimeout(600);await page.screenshot({path:SH+'45_list_end.png'});
  ok('完成第45章：書單 19 本',cv.length===19,cv.length+' 本');
  for(const T of TITLES){const c=cv.find(x=>x.t===T);ok(`完成第45章：《${T}》出現且沒鎖`,c&&!c.lk,JSON.stringify(c))}
  for(const [bi,T] of TITLES.entries()){const c=cv.find(x=>x.t===T);if(!c)continue;const e0=errs.length;
   await toHouse(page);await page.evaluate(i=>document.querySelector(`#screen .scover[data-i="${i}"]`).click(),c.i);await page.waitForTimeout(1500);
   // payPark 確認（如果有）
   if(!(await page.$('.reader.r99'))){await page.evaluate(()=>{const o=[...document.querySelectorAll('.overlay')].pop();const x=o&&[...o.querySelectorAll('button')].find(b=>b.offsetParent);x&&x.click()});await page.waitForTimeout(1200)}
   const B=await ev(page,`(()=>{const B=STORYBOOK[${c.i}];return {n:B.p.length,bg:B.p.map(p=>p[0]),q:B.q.length}})()`);
   const seen=[];let last='';
   for(let pg=0;pg<B.n;pg++){const st=await page.evaluate(()=>{const r=document.querySelector('.reader.r99');if(!r)return null;const sv=r.querySelector('.rscene svg.bg');return {txt:r.querySelector('.rtext').textContent,pg:r.querySelector('.rpg').textContent,svg:sv?sv.innerHTML.length:0,acts:r.querySelectorAll('.ractors .ra').length,title:(r.querySelector('.phead')||r).textContent.slice(0,30)}});
    if(!st){ok(`《${T}》第${pg+1}頁`,false,'沒有閱讀頁');break}seen.push(st);last=st.pg;
    await page.screenshot({path:`${SH}45_b${bi+1}_p${pg+1}.png`});
    await page.evaluate(()=>document.querySelector('#rnext').click());await page.waitForTimeout(500)}
   const said=await ev(page,`0`);
   ok(`《${T}》每頁有背景、有朋友、有字`,seen.length===B.n&&seen.every(s=>s.svg>500&&s.acts>0&&s.txt.length>5),seen.map(s=>s.pg+':svg'+s.svg+'/a'+s.acts).join(' '));
   ok(`《${T}》翻到最後一頁 ${B.n}/${B.n}`,last===`${B.n} / ${B.n}`,last);
   const heroOK=hero==='prince'?seen.every(s=>!/公主/.test(s.txt))&&seen.some(s=>/王子/.test(s.txt)):seen.some(s=>/公主/.test(s.txt));
   ok(`《${T}》${hero==='prince'?'王子版字幕都換成王子':'公主版字幕'}`,heroOK,seen.map(s=>s.txt).join('｜').slice(0,200));
   // 小問題：按對的答案
   let qn=0;for(let k=0;k<6;k++){await page.waitForTimeout(700);const q=await page.evaluate(()=>{const o=document.querySelector('.overlay.q99ov');if(!o)return null;return {h:o.querySelector('h2').textContent,n:o.querySelector('.q99n').textContent}});
    if(!q)break;if(qn===0)await page.screenshot({path:`${SH}45_b${bi+1}_quiz.png`});qn++;
    await page.evaluate(()=>{const b=document.querySelector('.overlay.q99ov .q99o[data-o="0"]');b&&b.click()});await page.waitForTimeout(1700)}
   ok(`《${T}》聽完故事的小問題 ${B.q} 題`,qn===B.q,'答了 '+qn);
   const fin=await page.evaluate(()=>{const o=[...document.querySelectorAll('.overlay')].pop();return o?o.innerText.replace(/\s+/g,' '):''});await page.screenshot({path:`${SH}45_b${bi+1}_end.png`});
   ok(`《${T}》故事說完了`,/故事說完了/.test(fin),fin.slice(0,80));
   await page.evaluate(()=>{const b=document.querySelector('#sok');b&&b.click()});await page.waitForTimeout(1500);
   const scr=await ev(page,`S.screen`);ok(`《${T}》讀完回到故事屋`,scr==='storyhouse',scr);
   ok(`《${T}》沒有 console 錯誤`,errs.length===e0,errs.slice(e0).join(' | '))}
  // 王子版／公主版的念法 key（給語音清單）
  const keys=await ev(page,`(()=>{const vt=t=>{t=String(t||'');try{if(typeof ISBOY!=='undefined'&&ISBOY)return voiceT(t)}catch(e){}return t.replace(/⁠/g,'')};const out=[];
   STORYBOOK.filter(B=>B.s7).forEach(B=>{B.p.forEach((p,i)=>out.push({b:B.id,k:'p'+(i+1),t:vt(p[2]).trim()}));B.q.forEach(([qt,o],i)=>{out.push({b:B.id,k:'q'+(i+1),t:vt(qt).trim()});o.forEach((x,j)=>out.push({b:B.id,k:'q'+(i+1)+'o'+(j+1),t:vt(x).trim()}))});
    out.push({b:B.id,k:'lock',t:vt(SB99.lockLine(B.g)).trim()})});
   ['聽完故事，來回答小問題！','故事說完了！送你一顆寶石！','故事說完了！','答對了！','不是喔，再想一想！'].forEach(t=>out.push({b:'common',k:'',t}));return out})()`);
  fs.writeFileSync(`${__dirname}/keys_${tag}.json`,JSON.stringify(keys,null,1));
  ok('完成第45章：全程沒有 console 錯誤',!errs.filter(e=>!/promo\.json/.test(e)).length,errs.join(' | ').slice(0,400));
  await ctx.close()}
 // ---------- 2. 完成第 41 章、沒完成第 42 章 ----------
 {const errs=[];const sv=L.save40(hero,{chDone:41,ch:41,progs:Array(41).fill(10).concat([0,0,0,0]),wallet:500});
  const {ctx,page}=await L.open(b,{ver,hero,errs,owned,save:sv,v2:{s3pw:1}});
  await toHouse(page);const cv=await covers(page);await page.evaluate(()=>{const c=[...document.querySelectorAll('#screen .scover[data-i]')].pop();c&&c.scrollIntoView({block:'end'})});await page.waitForTimeout(600);await page.screenshot({path:SH+'41_list.png'});
  const nb=cv.filter(c=>TITLES.includes(c.t));
  ok('完成第41章：兩本新書都鎖住（不能看）',nb.length===2&&nb.every(c=>c.lk),JSON.stringify(nb));
  for(const c of nb){await page.evaluate(i=>document.querySelector(`#screen .scover[data-i="${i}"]`).click(),c.i);await page.waitForTimeout(1200);
   const st=await page.evaluate(()=>({reader:!!document.querySelector('.reader'),toast:(document.querySelector('.toast,#toast')||{}).textContent||''}));await page.screenshot({path:`${SH}41_tap_${c.i}.png`});
   ok(`完成第41章：點《${c.t}》不會打開`,!st.reader,JSON.stringify(st)+' '+c.tag)}
  ok('完成第41章：沒有 console 錯誤',!errs.filter(e=>!/promo\.json/.test(e)).length,errs.join(' | ').slice(0,400));
  await ctx.close()}
 fs.writeFileSync(`${__dirname}/log_${tag}.json`,JSON.stringify(R,null,1));
 console.log('SUMMARY',tag,R.filter(r=>r[0]==='PASS').length,'/',R.length);await b.close()})();

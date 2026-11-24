// 閱讀頁書名：一行放得下嗎（App）。node book7.js vps
const L=require('../s7/lib');const VP={padL:[1180,820],padP:[820,1180],ip:[390,844],ipmax:[440,956],se:[375,667],land:[844,390],landse:[667,375]};
const vps=(process.argv[2]||'ip,ipmax').split(',');const tag=process.argv[3]||'book';const owned=['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9'];
(async()=>{const b=await L.chromium.launch();
 for(const v of vps){const errs=[];const {ctx,page}=await L.open(b,{ver:'app',hero:process.env.HERO||'princess',errs,owned,vp:{width:VP[v][0],height:VP[v][1]},save:L.save40(process.env.HERO||'princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500}),v2:{s3pw:1}});
  const out=[];
  for(const T of ['圖書館的小聲音','我的畫掛在牆上','*first','*long']){
   await page.evaluate(()=>__ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0;S.from='park';go('storyhouse')})()`));await page.waitForTimeout(1500);
   const i=await page.evaluate(T=>{const cs=[...document.querySelectorAll('#screen .sgrid:not(.advgrid) .scover[data-i]')];let c;if(T==='*first')c=cs[0];else if(T==='*long'){c=cs.filter(x=>!x.classList.contains('lk99')).sort((a,b)=>(b.querySelector('b')||b).textContent.trim().length-(a.querySelector('b')||a).textContent.trim().length)[0]}else c=cs.find(x=>(x.querySelector('b')||x).textContent.trim()===T);return c?+c.dataset.i:-1},T);
   if(i<0){out.push(T+':none');continue}
   await page.evaluate(i=>document.querySelector(`#screen .scover[data-i="${i}"]`).click(),i);await page.waitForTimeout(1500);
   if(!(await page.$('.reader.r99'))){await page.evaluate(()=>{const o=[...document.querySelectorAll('.overlay')].pop();const x=o&&[...o.querySelectorAll('button')].find(b=>b.offsetParent);x&&x.click()});await page.waitForTimeout(1200)}
   const r=await page.evaluate(()=>{const R=document.querySelector('.reader.r99');if(!R)return 'noreader';const els=[...R.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim().length>=3&&e.offsetParent);const t=els.find(e=>/^《?.+》?$/.test(e.textContent.trim())&&!e.closest('.rtext'));
    const ti=R.querySelector('.rtitle,.r99t,h2,.rhead b,.rbook');const e=ti||t;if(!e)return 'notitle';const r=e.getBoundingClientRect();const lh=parseFloat(getComputedStyle(e).lineHeight)||parseFloat(getComputedStyle(e).fontSize)*1.3;return {cls:e.className,tag:e.tagName,txt:e.textContent.trim(),h:Math.round(r.height),lines:Math.round(r.height/lh),fs:getComputedStyle(e).fontSize,w:Math.round(r.width),sw:e.scrollWidth,cw:e.clientWidth,par:e.parentElement.className}});
   out.push(T+':'+JSON.stringify(r));await page.screenshot({path:`${__dirname}/shots/${tag}_app_${v}_${T.replace('*','')}.png`})}
  console.log(v,'\n '+out.join('\n '));await ctx.close()}
 await b.close()})();

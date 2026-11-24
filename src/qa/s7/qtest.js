// 每個新題型 × 三個難度：答錯一次、寵物幫忙、答對（網頁版）。node qtest.js [codes] [hero]
const L=require('./lib');const fs=require('fs');
const CODES=process.argv[2]&&process.argv[2]!=='all'?process.argv[2].split(','):['zhuyin:hear7:ㄙ|ㄕ|ㄘ','letter:k7:W|M','letter:k7lo:b|d','letter:s7case:a|b|c|d','letter:s7floor:a|b|c|d','shape:s7grid:z1','shape:s7grid:z4','shape:s7grid:m2','count:s7ord:10','count:s7hund:100','count:s7queue','count:s7five:30','measure:s7blk','clock:s7'];
const hero=process.argv[3]||'princess';
async function playQ(page,code,diff,ch,level=1){
 await page.evaluate(([code,diff,ch,level])=>__ev(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(${ch});S.level=${level};S.q=0;S.diff='${diff}';S.qs=['${code}','quiz'];S.qs.__lv=${level};S.lvMiss=0;going=false;show('stage')})()`),[code,diff,ch,level]);
 await page.waitForTimeout(400);
 await page.evaluate(()=>{const o=document.querySelector('.stage .overlay');if(o){const b=o.querySelector('button');if(b)b.click()}});
 await page.waitForTimeout(900);
 return page.evaluate(()=>__ev(`(()=>{const play=document.querySelector('.stage .play');const btns=play?[...play.querySelectorAll('[data-v]')]:[];return {scr:S.screen,q:S.qs[S.q],ans:S.ans==null?null:String(S.ans),n:btns.length,auto:typeof S.__auto==='function',prompt:(document.querySelector('.prompt')||{}).textContent||''}})()`));}
async function wrongOnce(page){return page.evaluate(()=>__ev(`(()=>{const play=document.querySelector('.stage .play');let w=[...play.querySelectorAll('[data-v]')].find(b=>S.ans!=null&&b.dataset.v!==String(S.ans)&&!b.disabled&&b.offsetParent);
  if(!w){const u=play.querySelector('.c7b.up:not([disabled])');const l=u&&[...play.querySelectorAll('.c7b.lo:not([disabled])')].find(x=>x.dataset.l!==u.dataset.u);if(u&&l){u.click();l.click();return S.miss}
   const c=play.querySelector('.f7card:not([disabled])');if(c){const f=window.__s7q.FLOOR()[c.dataset.c];c.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));c.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));const hs=play.querySelector('.f7house svg').getBoundingClientRect();const yy=f==='down'?hs.top+hs.height*.2:hs.top+hs.height*.9;hs&&play.querySelector('.f7house svg').dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:hs.left+hs.width/2,clientY:yy}));return S.miss}
   return -1}w.click();return S.miss})()`));}
async function petHelp(page){await page.waitForTimeout(1000);
 const rdy=await page.evaluate(()=>{const p=document.getElementById('pet');return !!(p&&p.classList.contains('p19rdy'))});
 if(!rdy)return 'n/a';await page.evaluate(()=>{const p=document.getElementById('pet');const r=p.getBoundingClientRect();p.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2}))});
 await page.waitForTimeout(3200);return page.evaluate(()=>__ev(`(()=>{const g=[...document.querySelectorAll('.stage .play .p19gone')];return g.length?(g.some(x=>x.dataset.v===String(S.ans))?'REMOVED-RIGHT!':'ok'):'none'})()`));}
async function writeAuto(page){
 for(let n=0;n<40;n++){const st=await page.evaluate(()=>__ev(`(()=>{const s=__WR.state();if(!s||!s.live)return null;const C=__WR.CH[s.ch];return {s,P:(C.forms[s.forms&&s.forms[0]||0]||C.forms[0]).map(e=>e.points),q:S.q,lock:S.lock}})()`));
  if(!st){if(n<16){await page.waitForTimeout(500);continue}return 'nowrite'}if(st.lock){if(n<16){await page.waitForTimeout(500);continue}return 'locked'}  // 主機忙的時候寫字板比較晚出來：等一下再判斷if(st.s.phase!=='write'){await page.waitForTimeout(500);continue}
  const [bx,by,bs]=st.s.lay.box;const pts=st.P[st.s.k]||st.P[0];const m=p=>[bx+p[0]/100*bs,by+p[1]/100*bs];
  const a=m(pts[0]);await page.mouse.move(a[0],a[1]);await page.mouse.down();
  for(let i=1;i<pts.length;i++){const p0=pts[i-1],p1=pts[i];for(let t=1;t<=4;t++){const q=m([p0[0]+(p1[0]-p0[0])*t/4,p0[1]+(p1[1]-p0[1])*t/4]);await page.mouse.move(q[0],q[1])}}
  await page.mouse.up();await page.waitForTimeout(700)}return 'gaveup'}
async function answer(page){
 const code=await page.evaluate(()=>__ev(`String(S.qs[S.q])`));const q0=await page.evaluate(()=>__ev(`S.q`));
 if(/^(write|R|wp|wfree)/.test(code)||await page.evaluate(()=>{try{return !!(__WR.state()&&__WR.state().live)}catch(e){return false}})){const r=await writeAuto(page);
  for(let i=0;i<15;i++){await page.waitForTimeout(400);const st=await page.evaluate(()=>__ev(`({q:S.q,scr:S.screen})`));if(st.q>q0||st.scr!=='stage'){await page.waitForTimeout(700);return 'write:OK'}}return 'write:'+r+':NO'}const how=await page.evaluate(()=>__ev(`(()=>{if(typeof S.__auto==='function'){S.__auto();return 'auto'}const play=document.querySelector('.stage .play');const r=[...play.querySelectorAll('[data-v]')].find(b=>b.dataset.v===String(S.ans));if(r){r.click();return 'click'}return 'none'})()`));
 for(let i=0;i<32;i++){await page.waitForTimeout(400);const st=await page.evaluate(()=>__ev(`({lock:S.lock,q:S.q,scr:S.screen})`));if(st.q>q0||st.scr!=='stage'){await page.waitForTimeout(700);return how+':OK'}
  // 兩步題（積木 hard、帶路後問幾格）：再答一次
  if(!st.lock&&i>3&&i%4===0)await page.evaluate(()=>__ev(`(()=>{if(typeof S.__auto==='function')return S.__auto();const r=[...document.querySelectorAll('.stage .play [data-v]')].find(b=>b.dataset.v===String(S.ans)&&!b.disabled);if(r)r.click()})()`))}
 // 不是第七季的題型（關卡裡混出來的舊題型）答不出來時，直接過（這裡只測第七季）
 if(!/hear7|:k7|k7lo|s7|clock/.test(code)){await page.evaluate(()=>__ev(`(()=>{S.lock=false;right(document.querySelector('.stage .play')||document.body,[])})()`));for(let i=0;i<10;i++){await page.waitForTimeout(400);const st=await page.evaluate(()=>__ev(`({q:S.q,scr:S.screen})`));if(st.q>q0||st.scr!=='stage')return how+':forced'}}
 return how+':NO'}
module.exports={playQ,wrongOnce,petHelp,answer,writeAuto};
if(require.main===module)(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{ver:'web',hero,errs});
 await page.evaluate(()=>{window.__s7log=[]});const res=[];
 for(const code of CODES)for(const diff of ['easy','mid','hard'])for(let rep=0;rep<1;rep++){
  const ch=code.includes('s7grid:m')?44:/k7lo|case|floor|queue|blk/.test(code)?42:/ord|hund/.test(code)?41:43;
  const info=await playQ(page,code,diff,ch);const wr=await wrongOnce(page);const pet=await petHelp(page);const ok=await answer(page);
  console.log([code,diff,info.n,info.ans,info.auto?'auto':'',wr,pet,ok,info.prompt.slice(0,30)].join(' | '));res.push([code,diff,info.n,info.ans,info.auto?'auto':'',wr,pet,ok,info.prompt.slice(0,30)].join(' | '))}
 console.log(res.join('\n'));
 const said=await page.evaluate(()=>[...new Set(window.__s7log)]);fs.writeFileSync(__dirname+'/said_q.json',JSON.stringify(said,null,1));
 console.log('errs',errs.filter(e=>!/TUNNEL/.test(e)).slice(0,20).join('\n'));await b.close()})();

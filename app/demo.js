// 宣傳影片專用（mkapp.py 有 DEMO=1 才會放進 App）：照分鏡自動演一次，雲端模擬器同時錄影
(function(){
const SRV='http://127.0.0.1:8765';const L=m=>{console.log('DEMO '+m);try{fetch(SRV+'/log?m='+encodeURIComponent('DEMO '+m),{mode:'cors'}).catch(()=>{})}catch(e){}};
const W=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){await W(7000);
const st=document.createElement('style');st.textContent='#wipe,#toast,.coach,.nexthint,.nmhand{display:none!important}.title #parent,.title #restart,.title #nameit,.title #about,.title #quest,.title #iaptitle{visibility:hidden!important}';document.head.appendChild(st);
 // promo4: prototype of the DEMO-build scene helpers (runs inside the game page, after the game script).
 // Each scene returns nothing; taps are scheduled with setTimeout relative to the scene start.
 window.DEMO=(()=>{
  const G=__game,S=G.S,ev=__ev,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const T=(ms,f)=>setTimeout(()=>{try{f()}catch(e){console.log('DEMO err',e&&e.message)}},ms);
  const clr=()=>$$('.overlay,.coach,#toast,.nexthint,.flygem').forEach(o=>o.remove());
  const hush=()=>{try{ev('hush')()}catch(e){}};
  // 指定這次答對的慶祝動畫（CELE: spell confetti hearts rainbow petdance shoot bubbles twirl）
  const cele=(name,fn)=>{const C=ev('CELE'),b=C.slice();C.splice(0,C.length,name);S.lastCele=null;try{fn()}finally{T(0,()=>C.splice(0,C.length,...b))}};
  // 每段只演到「答對慶祝」為止：擋掉答對後自動跳下一題／過關（不然會跑進下一段畫面）
  window.__demoAllow=false;
  ev("renderQ=(o=>function(){if(!window.__demoAllow)return;return o.apply(this,arguments)})(renderQ)");
  // 進畫面時的開場白（關卡介紹、塗色本…）不要念，只留題目和回饋語音
  window.__demoMuteSay=false;
  ev("say=(o=>function(){if(window.__demoMuteSay)return Promise.resolve();return o.apply(this,arguments)})(say)");
  const quietShow=(n,arg)=>{window.__demoMuteSay=true;try{G.show(n,arg)}finally{window.__demoMuteSay=false}};
  ev("levelDone=(o=>function(){if(!window.__demoAllow)return;return o.apply(this,arguments)})(levelDone)");
  // 先把「補發禮物」「寵物有新玩具」的提示消化掉，錄影時才不會跳出來
  const quiet=()=>{try{ev('outfitCatchUp')()}catch(e){}try{ev('ptCatchUp')();ev('V2')[ev('PTN')()]=[];ev('save2')()}catch(e){}};quiet();
  const unbuy=()=>{const v='[]';try{window.__rawLS?__rawLS.set('pp4iap',v):localStorage.setItem('pp4iap',v)}catch(e){}S.chDone=4;G.setCh(4);S.prog=3;quiet()};
  const tapAns=name=>cele(name,()=>{const el=$(`.play [data-v="${CSS.escape(String(S.ans))}"]`);if(el)el.click();else console.log('DEMO no answer el',S.ans)});
  // 進關卡並畫出指定題目（先安靜畫一次，再用 S.force 畫指定的那題，題目語音照常念）
  const stageQ=(ch,type,force,opt={})=>{clr();hush();G.setCh(ch);S.level=opt.level??2;S.q=opt.q??0;S.lvMiss=0;S.qs=[type,type,type];quietShow('stage');clr();hush();
   G.rq(false);const play=$('.play');play.innerHTML='';S.lock=false;S.force=force||null;
   const r0=Math.random;if(opt.rnd!=null)Math.random=()=>opt.rnd;
   try{ev('BUILD')[type](play,!opt.silent)}finally{Math.random=r0;S.force=null}};
  const scenes={
   // 1 注音（開場＋封面）
   zhuyin(){stageQ(0,'zhuyin',{k:'g',i:'ㄇ'});T(1100,()=>tapAns('confetti'))},
   // 2 英文字母
   letter(){const pool=ev('letterPool')();stageQ(0,'letter',{k:'g',i:pool.includes('A')?'A':pool[0]});T(1000,()=>tapAns('petdance'))},
   // 3 生活常識（QUIZ[9] 過馬路要等綠燈）
   quiz(){stageQ(1,'quiz',{k:'quiz',i:9});T(1400,()=>tapAns('hearts'))},
   // 4 跟著唸（rnd=0 → 第一個字母 A；只按「我唸好了！」，不開麥克風）
   read(){stageQ(0,'read',null,{rnd:0});T(1900,()=>cele('hearts',()=>$('.play .rdok').click()))},
   // 5 王子的信：真的 levelDone 卡片，跳過等待直接出信
   prince(){stageQ(0,'count',null,{level:9,silent:1});hush();const ov=ev('overlay')($('.stage'),'<div class="card"><div class="rbody"></div></div>');G.REWARD.chapter(ov.querySelector('.rbody'),()=>{})},
   // 6 大地圖：已購買＋全部走完（畫面要配「第6～20章需另外購買」）
   map(){clr();hush();const v=JSON.stringify(['full']);try{window.__rawLS?__rawLS.set('pp4iap',v):localStorage.setItem('pp4iap',v)}catch(e){}
    S.chDone=19;for(let c=0;c<19;c++)for(let l=0;l<10;l++)S.stars[c+'-'+l]=Math.max(S.stars[c+'-'+l]||0,(c*7+l*3)%4?3:2);G.setCh(19);S.prog=4;G.show('world')},
   // 7 換裝間：點「玫瑰蓬蓬裙」
   ward(){clr();hush();unbuy();quietShow('wardrobe');T(900,()=>{const el=$('#opts .opt[data-id="rose"]')||$$('#opts .opt').find(x=>/玫瑰/.test(x.textContent));el&&el.click()})},
   // 8 寵物洗澡：點「洗澡」，再一顆一顆點破泡泡
   pet(){clr();hush();quietShow('pethouse');T(700,()=>$('[data-a="bath"]').click());for(let k=0;k<6;k++)T(1250+k*230,()=>{const b=$('.bub');b&&b.click()})},
   // 9 塗色：小狗，用「倒顏料」塗三塊
   color(){clr();hush();quietShow('coloring');ev('V2').parkCost=false;const P=ev('PICS');ev('colorPic')(P.findIndex(x=>x.n==='小狗'));clr();
    T(300,()=>$('.ctool[data-t="fill"]').click());
    const fill=(k,col)=>{const regs=$$('.cr').map(c=>{const q=c.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+q.height/2,a:q.width*q.height,k:c.dataset.k}});const g=regs.find(r=>r.k===k);if(!g)return;
     const pc=$(`.pal .pc[data-c="${col}"]`);pc&&pc.click();const cv=$('.cpaint');['pointerdown','pointerup'].forEach(t=>cv.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:g.x,clientY:g.y,pointerId:1,isPrimary:true})))};
    T(700,()=>fill('12','#FFD24D'));T(1250,()=>fill('4','#FF8FC8'));T(1800,()=>fill('0','#B99CFF'))},
   // 10 結尾：首頁（字卡由 ffmpeg 疊上）
   end(){clr();hush();quiet();G.show('title')}
  };
  return {scenes,clr,hush};
 })();
 const D=window.DEMO;D.clr();D.hush();
 const PLAN=['zhuyin','letter','quiz','read','prince','map','ward','pet','color','end'];const MS=4200;
 // 同步用：全白 0.6 秒
 const f=document.createElement('div');f.style.cssText='position:fixed;inset:0;background:#fff;z-index:99999';document.body.appendChild(f);
 const t0=performance.now();L('FLASH 0 abs '+Math.round(t0));await W(600);f.remove();
 for(let i=0;i<PLAN.length;i++){const at=600+i*MS;const w=at-(performance.now()-t0);if(w>0)await W(w);
  L('SCENE '+PLAN[i]+' '+Math.round(performance.now()-t0));try{D.scenes[PLAN[i]]()}catch(e){L('ERR '+PLAN[i]+' '+e.message)}}
 await W(MS);L('DONE '+Math.round(performance.now()-t0));}
window.addEventListener('error',e=>L('PAGEERR '+e.message));
main().catch(e=>L('ERR main '+e.message));
})();

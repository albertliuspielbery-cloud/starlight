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
  // 點擊時畫一圈金色光圈，並記下位置（後製放大用）
  const ripple=el=>{if(!el)return;const q=el.getBoundingClientRect(),x=q.x+q.width/2,y=q.y+q.height/2;L('TAP '+Math.round(x)+' '+Math.round(y)+' '+Math.round(q.width)+' '+Math.round(q.height)+' '+Math.round(performance.now()-window.__t0)+' '+innerWidth+' '+innerHeight);
   const r=document.createElement('div');r.style.cssText=`position:fixed;left:${x-40}px;top:${y-40}px;width:80px;height:80px;border-radius:50%;border:5px solid #FFD86B;box-shadow:0 0 18px #FFD86B;pointer-events:none;z-index:99998;transition:transform .45s ease-out,opacity .45s ease-out;transform:scale(.3);opacity:1`;document.body.appendChild(r);requestAnimationFrame(()=>requestAnimationFrame(()=>{r.style.transform='scale(1.6)';r.style.opacity='0'}));setTimeout(()=>r.remove(),600)};
  const tap=el=>{if(!el)return;ripple(el);el.click()};
  const ready=n=>requestAnimationFrame(()=>requestAnimationFrame(()=>L('READY '+n+' '+Math.round(performance.now()-window.__t0))));
  const tapAns=name=>cele(name,()=>{const el=$(`.play [data-v="${CSS.escape(String(S.ans))}"]`);if(el)tap(el);else console.log('DEMO no answer el',S.ans)});
  // 進關卡並畫出指定題目（先安靜畫一次，再用 S.force 畫指定的那題，題目語音照常念）
  const stageQ=(ch,type,force,opt={})=>{clr();hush();G.setCh(ch);S.level=opt.level??2;S.q=opt.q??0;S.lvMiss=0;S.qs=[type,type,type];quietShow('stage');clr();hush();
   G.rq(false);const play=$('.play');play.innerHTML='';S.lock=false;S.force=force||null;
   const r0=Math.random;if(opt.rnd!=null)Math.random=()=>opt.rnd;
   try{ev('BUILD')[type](play,!opt.silent)}finally{Math.random=r0;S.force=null}};
  const scenes={
   // 0 開場：首頁（公主城堡）
   title(){clr();hush();quiet();quietShow('title');ready('title')},
   // 1 注音
   zhuyin(){stageQ(0,'zhuyin',{k:'g',i:'ㄇ'});ready('zhuyin');T(700,()=>tapAns('confetti'))},
   // 2 英文字母
   letter(){const pool=ev('letterPool')();stageQ(0,'letter',{k:'g',i:pool.includes('A')?'A':pool[0]});ready('letter');T(700,()=>tapAns('petdance'))},
   // 3 生活常識（過馬路要等綠燈）
   quiz(){stageQ(1,'quiz',{k:'quiz',i:9});ready('quiz');T(800,()=>tapAns('hearts'))},
   // 4 王子的信：信先出現，再按「看看禮物」
   prince(){stageQ(0,'count',null,{level:9,silent:1});hush();T(400,()=>{const ov=ev('overlay')($('.stage'),'<div class="card"><div class="rbody"></div></div>');G.REWARD.chapter(ov.querySelector('.rbody'),()=>{});ready('prince');T(2300,()=>{hush();tap($('#next'))})})},
   // 5 換裝：先穿星光禮服，再換玫瑰蓬蓬裙、森林精靈裙
   ward(){clr();hush();unbuy();S.look.dress='star';quietShow('wardrobe');ready('ward');
    const pick=id=>$(`#opts .opt[data-id="${id}"]`);T(800,()=>tap(pick('rose')));T(2000,()=>tap(pick('forest')||pick('star')))},
   // 6 寵物洗澡
   pet(){clr();hush();quietShow('pethouse');ready('pet');T(600,()=>tap($('[data-a="bath"]')));for(let k=0;k<6;k++)T(1150+k*230,()=>{const b=$('.bub');b&&tap(b)})},
   // 7 塗色：小狗
   color(){clr();hush();quietShow('coloring');ev('V2').parkCost=false;const P=ev('PICS');ev('colorPic')(P.findIndex(x=>x.n==='小狗'));clr();ready('color');
    T(300,()=>$('.ctool[data-t="fill"]').click());
    const fill=(k,col)=>{const regs=$$('.cr').map(c=>{const q=c.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+q.height/2,a:q.width*q.height,k:c.dataset.k}});const g=regs.find(r=>r.k===k);if(!g)return;
     const pc=$(`.pal .pc[data-c="${col}"]`);pc&&pc.click();const cv=$('.cpaint');ripple({getBoundingClientRect:()=>({x:g.x-30,y:g.y-30,width:60,height:60})});['pointerdown','pointerup'].forEach(t=>cv.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:g.x,clientY:g.y,pointerId:1,isPrimary:true})))};
    T(600,()=>fill('12','#FFD24D'));T(1100,()=>fill('4','#FF8FC8'));T(1600,()=>fill('0','#B99CFF'))},
   // 8 大地圖：沒購買的樣子（第6章以後上鎖），慢慢往下捲
   map(){clr();hush();unbuy();G.show('world');ready('map');
    T(600,()=>{const sc=[document.scrollingElement,...$$('*')].find(e=>e&&e.scrollHeight>e.clientHeight+40&&getComputedStyle(e).overflowY!=='hidden');if(!sc)return;const max=sc.scrollHeight-sc.clientHeight,t1=performance.now(),D=3200;
     const step=()=>{const k=Math.min(1,(performance.now()-t1)/D);sc.scrollTop=max*(1-Math.cos(Math.PI*k))/2;if(k<1)requestAnimationFrame(step)};step()})},
   // 9 結尾：首頁
   end(){clr();hush();quiet();G.show('title');ready('end')}
  };
  return {scenes,clr,hush};
 })();
 const D=window.DEMO;D.clr();D.hush();
 // 每段 5 秒（模擬器換畫面會慢一點，後製再照 READY／TAP 時間剪）
 const PLAN=['title','zhuyin','letter','quiz','prince','ward','pet','color','map','end'];const MS=5000;
 // 同步用：全白 0.6 秒
 const f=document.createElement('div');f.style.cssText='position:fixed;inset:0;background:#fff;z-index:99999';document.body.appendChild(f);
 const t0=performance.now();window.__t0=t0;L('FLASH 0 abs '+Math.round(t0));await W(600);f.remove();
 for(let i=0;i<PLAN.length;i++){const at=600+i*MS;const w=at-(performance.now()-t0);if(w>0)await W(w);
  L('SCENE '+PLAN[i]+' '+Math.round(performance.now()-t0));try{D.scenes[PLAN[i]]()}catch(e){L('ERR '+PLAN[i]+' '+e.message)}}
 await W(MS);L('DONE '+Math.round(performance.now()-t0));}
window.addEventListener('error',e=>L('PAGEERR '+e.message));
main().catch(e=>L('ERR main '+e.message));
})();

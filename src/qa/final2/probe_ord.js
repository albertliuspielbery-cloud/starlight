// 排隊序數題（count:s7ord）：最後一隻、櫃台箭頭有沒有被外框切到。node probe_ord.js
const L=require('../s7/lib');const Q=require('../s7/qtest');
(async()=>{const b=await L.chromium.launch();
 for(const [vn,vp] of [['se',{width:375,height:667}],['ip',{width:390,height:844}]])for(const hero of ['princess','prince']){const errs=[];
  const {page}=await L.open(b,{ver:'app',hero,errs,owned:['full'],vp});
  for(const d of ['easy','mid','hard']){await Q.playQ(page,'count:s7ord:10',d,41);await page.waitForTimeout(1200);
   const r=await page.evaluate(()=>{const w=document.querySelector('.o7wrap')||document.querySelector('[class*="o7"]');if(!w)return null;
    // 找會裁切的祖先
    let clip=w;while(clip&&clip!==document.body){const s=getComputedStyle(clip);if(/(hidden|clip|auto|scroll)/.test(s.overflowX))break;clip=clip.parentElement}
    const cr=clip.getBoundingClientRect();const items=[...w.querySelectorAll('[data-v]')];
    const cut=items.map((e,i)=>{const r=e.getBoundingClientRect();return {i,l:Math.round(r.left),r:Math.round(r.right),w:Math.round(r.width)}}).filter(x=>x.r>cr.right+1||x.l<cr.left-1);
    const all=[...w.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>cr.right+1||r.left<cr.left-1)}).map(e=>e.className&&e.className.baseVal===undefined?e.className:e.tagName).slice(0,6);
    return {clip:(clip.className||clip.tagName)+'',cl:[Math.round(cr.left),Math.round(cr.right)],n:items.length,cut,other:all,sw:clip.scrollWidth,cw:clip.clientWidth}});
   await page.screenshot({path:__dirname+`/shots/ord_${vn}_${hero}_${d}.png`});console.log(vn,hero,d,JSON.stringify(r))}}
 await b.close()})();

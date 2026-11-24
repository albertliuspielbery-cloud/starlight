// 第七季題型 × 尺寸：所有可點答案的大小、有沒有出畫面。node chk.js vps codes diffs reps [ver]
const {R,Q,VP,open,ev}=require('./lib');const fs=require('fs');
const vps=(process.argv[2]||'padL,padP,ip,se,land,landse').split(',');
const codes=(process.argv[3]&&process.argv[3]!=='all'?process.argv[3]:'count:s7hund:100;shape:s7grid:z4;shape:s7grid:z6;shape:s7grid:m2;shape:s7grid:m3;count:s7ord:10;measure:s7blk;count:s7queue;count:s7five:30;letter:s7case:a|b|c|d;letter:s7floor:a|b|c|d;letter:k7lo:b|d;letter:k7:W|M;zhuyin:hear7:ㄙ|ㄕ|ㄘ;clock:s7').split(';');
const diffs=(process.argv[4]||'easy,mid,hard').split(',');const reps=+(process.argv[5]||3);const ver=process.argv[6]||'web';const shot=process.env.SHOT;
const SEL='.stage .play [data-v]:not(span),.stage .play .b7t,.stage .play .h7slot,.stage .play [data-d],.stage .play .c7b,.stage .play .f7card,.stage .play .f7house svg';
(async()=>{const b=await R.chromium.launch();const out=[];
 for(const vp of vps){const {page,ctx,errs}=await open(b,vp,{ver});
  for(const code of codes)for(const diff of diffs)for(let r=0;r<reps;r++){
   const ch=/s7grid:m/.test(code)?45:/k7lo|s7grid:z/.test(code)?44:/case|floor|queue|blk/.test(code)?43:/ord|hund/.test(code)?42:41;
   await Q.playQ(page,code,diff,ch);await page.waitForTimeout(1300);
   const info=await page.evaluate(SEL=>{const W=innerWidth,H=innerHeight;const els=[...document.querySelectorAll(SEL)].filter(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();return s.visibility!=='hidden'&&s.display!=='none'&&r.width>0&&!e.disabled});
    const m=[...document.querySelector('.stage .play').children].map(c=>c.className.split(' ')[0]).join('+');
    const z=document.querySelector('.stage .play').style.zoom||'1';
    const rs=els.map(e=>{const r=e.getBoundingClientRect();return {w:r.width,h:r.height,off:r.left<-1||r.top<-1||r.right>W+1||r.bottom>H+1}});
    const ch=[...document.querySelectorAll('.stage .play *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>W+1||r.bottom>H+1||r.left<-1)}).length;
    return {m,z,n:rs.length,min:rs.length?Math.round(Math.min(...rs.map(x=>Math.min(x.w,x.h)))):0,minW:rs.length?Math.round(Math.min(...rs.map(x=>x.w))):0,minH:rs.length?Math.round(Math.min(...rs.map(x=>x.h))):0,off:rs.filter(x=>x.off).length,anyOff:ch}},SEL);
   const line=`${vp}\t${code}\t${diff}\t${info.m}\tz=${info.z}\tn=${info.n}\tmin=${info.min}(${info.minW}x${info.minH})\toff=${info.off}\tchildOff=${info.anyOff}`;console.log(line);out.push(line);
   if(shot)await page.screenshot({path:`${__dirname}/shots/${shot}_${ver}_${vp}_${code.replace(/[^\w]+/g,'_')}_${diff}_${r}.png`})}
  const e=errs.filter(e=>!/favicon|Failed to load|^log:/.test(e));if(e.length)console.log('ERRS',vp,e.slice(0,5));await ctx.close()}
 await b.close()})();

// 新題型 × 尺寸：畫面、版面檢查、答錯兩次（提示）、語音缺漏。node q.js <vp,vp> [codes] [diff]
const R=require('./rlib');const Q=require('../s7/qtest');const fs=require('fs');
const VPS=(process.argv[2]||'se,ip,land,padP,padL').split(',');
const CODES=process.argv[3]&&process.argv[3]!=='all'?process.argv[3].split(';'):['zhuyin:hear7:ㄙ|ㄕ|ㄘ','letter:k7:W|M','letter:k7lo:b|d','letter:s7case:a|b|c|d','letter:s7floor:a|b|c|d','shape:s7grid:z4','shape:s7grid:m2','count:s7ord:10','count:s7hund:100','count:s7queue','count:s7five:30','measure:s7blk','clock:s7','write:ㄩ:1','write:Z:2','write:d:1','write:a:3'];
const DIFF=process.argv[4]||'mid';const SH=__dirname+'/B_shots/';const out=[];
(async()=>{const b=await R.chromium.launch();
 for(const vp of VPS){const {ctx,page,errs}=await R.open(b,{vp});
  for(const code of CODES){const ch=code.includes('s7grid:m')||/k7lo|ㄩ|:d:|:c:/.test(code)?43:/s7case|s7floor|s7queue|s7blk|:a:|:b:|ㄨ/.test(code)?42:/ord|hund|Z|Y|ㄧ/.test(code)?41:40;
   const tag=`q_${vp}_${code.replace(/[^\w]+/g,'_')}_${DIFF}`;
   await page.evaluate(()=>{__miss.length=0});
   const info=await Q.playQ(page,code,DIFF,ch);await page.waitForTimeout(1800);
   await page.screenshot({path:SH+tag+'.png'});const lay=await R.layout(page,'.stage');
   let w1='-',w2='-';if(!/^write/.test(code)){w1=await Q.wrongOnce(page);await page.waitForTimeout(1300);w2=await Q.wrongOnce(page);await page.waitForTimeout(1500);await page.screenshot({path:SH+tag+'_hint.png'})}
   const glow=await page.evaluate(()=>document.querySelectorAll('.stage .glow,.stage .hint,.stage [class*=glow],.stage [class*=hint]').length);
   const miss=await page.evaluate(()=>[...new Set(__miss)]);
   const r={vp,code,n:info.n,prompt:info.prompt.slice(0,40),w1,w2,glow,lay,miss};out.push(r);console.log(JSON.stringify(r))}
  console.log('ERRS',vp,errs.filter(e=>!/favicon|Failed to load/.test(e)).slice(0,8));await ctx.close()}
 fs.writeFileSync(__dirname+'/B_tmp/q_'+VPS.join('_')+'_'+DIFF+'.json',JSON.stringify(out,null,1));await b.close()})();

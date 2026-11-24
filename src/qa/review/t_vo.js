const L=require('/home/claude/w/s7/qa/s7/lib.js');const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
(async()=>{const b=await L.chromium.launch();
 for(const hero of ['princess','prince']){
 const {ctx,page}=await L.open(b,{ver:'web',fake:false,hero});
 const r=await ev(page,`(()=>{const T=[...window.__S7TXT];const miss=T.filter(t=>!__s7.recOK(t,''));
  const L=CHAPTERS.slice(40).map(C=>C.letter&&C.letter.replace(/<br>/g,''));const pre=ISBOY?'dragon':'prince';const lm=L.filter(t=>t&&!__s7.recOK(t,pre));
  const keys=Object.keys(VO.idx.clips||VO.idx).filter(k=>/^(pz|dz)\\|/.test(k)).length;
  return {n:T.length,miss:miss.length,ex:miss.slice(0,12),letters:L.length,lmiss:lm,pzKeys:keys,idx:VOICE_INDEX}})()`);
 console.log(hero,JSON.stringify(r));await ctx.close()}
 await b.close()})();

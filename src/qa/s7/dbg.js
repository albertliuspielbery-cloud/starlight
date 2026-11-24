const L=require('./lib');const Q=require('./qtest');
(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{ver:'web',errs});
 for(const [c,d] of [['letter:k7:W|M','mid'],['clock:s7','mid'],['clock:s7','hard'],['letter:k7:W|M','hard'],['pattern','mid']]){const info=await Q.playQ(page,c,d,41);const w=await Q.wrongOnce(page);const p=await Q.petHelp(page);const a=await Q.answer(page);console.log(c,d,JSON.stringify(info).slice(0,160),w,p,a)}
 console.log(errs.join('\n'));await b.close()})();

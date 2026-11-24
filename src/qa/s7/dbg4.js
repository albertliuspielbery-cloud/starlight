const L=require('./lib');const Q=require('./qtest');
(async()=>{const b=await L.chromium.launch();const errs=[];const {ctx,page}=await L.open(b,{ver:'app',errs,owned:['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']});
 for(const [c,d] of [['write:ㄨ:2','mid'],['write:ㄨ:2','easy'],['write:ㄨ:1','mid'],['write:ㄩ:3','hard'],['write:b:2','mid'],['write:d:3','mid'],['write:Y:2','mid'],['write:W:3','hard']]){await Q.playQ(page,c,d,43);console.log(c,d,await Q.answer(page))}
 console.log('errs',errs.filter(e=>!/TUNNEL|ERR_|Failed to load/.test(e)).join(' | '));await b.close()})();

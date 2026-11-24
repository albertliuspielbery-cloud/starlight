// 積木操作提示有沒有念錄音（App 版）
const L=require('../s7/lib');const Q=require('../s7/qtest');
(async()=>{const b=await L.chromium.launch();const errs=[];const {page}=await L.open(b,{ver:'app',hero:'princess',vp:{width:390,height:844},voice:true,errs,owned:['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']});
 for(let t=0;t<8;t++){await Q.playQ(page,'measure:s7blk','mid',42);await page.waitForTimeout(5000);if(await page.$('.b7tray'))break}
 await page.waitForTimeout(4000);const d=await L.voiceDump(page);
 const said=d.said.filter(x=>/疊上去|積木那麼高/.test(x.t));console.log('said',JSON.stringify(said.slice(-3)));
 console.log('played',JSON.stringify(d.play.filter(p=>/疊上去|積木那麼高/.test(p[0]))));console.log('tts',JSON.stringify(d.tts.filter(x=>/疊/.test(x.t))));
 await b.close()})();

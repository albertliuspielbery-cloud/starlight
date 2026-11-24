// 語音：第七季英文字母題（大小寫、三層樓、b/d、聽字母、寫小寫），找出走裝置語音／沒錄音的地方。node voice_letters.js
const L=require('../s7/lib');const Q=require('../s7/qtest');const fs=require('fs');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const {ctx,page}=await L.open(b,{ver:'web',hero:'princess',errs,voice:true});
 for(const c of ['letter:s7case:a|b|c|d','letter:s7floor:a|b|c|d','letter:k7lo:b|d','letter:k7:W|M','letter:k7:X|Y|Z','write:a:1','write:c:2','write:Z:1','letter','word'])for(const d of ['easy','mid','hard']){
  await Q.playQ(page,c,d,c.includes('k7lo')?43:42);await Q.wrongOnce(page);await page.waitForTimeout(1500);await Q.wrongOnce(page);await page.waitForTimeout(1500);await Q.answer(page);await page.waitForTimeout(800)}
 const V=await L.voiceDump(page);fs.writeFileSync(__dirname+'/voice/letters.json',JSON.stringify(V));
 console.log('tts',JSON.stringify(V.tts,null,1).slice(0,3000));console.log('norec',V.said.filter(x=>!x.ok).map(x=>x.t+'@'+x.w));console.log('errs',errs.filter(e=>!/promo/.test(e)).slice(0,5));await b.close()})();

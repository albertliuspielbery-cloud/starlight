const L=require('./lib');const Q=require('./qtest');const SH=__dirname+'/shots/';
(async()=>{const b=await L.chromium.launch();
 for(const [nm,vp] of [['phone',{width:395,height:859}],['ipad',{width:1180,height:820}]]){const errs=[];const {ctx,page}=await L.open(b,{ver:'web',errs,vp});
  for(const [c,d,ch] of [['count:s7ord:10','hard',42],['letter:s7floor:a|b|c|d','hard',43],['letter:s7floor:a|b','easy',43],['shape:s7grid:z4','hard',44],['shape:s7grid:z1','easy',44],['measure:s7blk','easy',43],['letter:s7case:a|b|c|d','easy',43],['letter:k7lo:b|d','hard',44],['count:s7queue','hard',43]]){
   await Q.playQ(page,c,d,ch);await page.waitForTimeout(800);await page.screenshot({path:SH+`v2_${nm}_${c.replace(/[:|]/g,'_')}_${d}.png`})}
  await page.evaluate(()=>__ev(`(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove());S.roomOwned.push('pic:mypic45');S.room.pic='mypic45';going=false;go('room','pic')})()`));await page.waitForTimeout(2000);await page.screenshot({path:SH+`v2_${nm}_room.png`});
  await page.evaluate(()=>{const b=document.querySelector('.rmdeco');b&&b.click()});await page.waitForTimeout(800);await page.evaluate(()=>{const t=document.querySelector('.tab[data-s="pic"]');t&&t.click()});await page.waitForTimeout(1500);await page.screenshot({path:SH+`v2_${nm}_room_edit.png`});
  console.log(nm,errs.filter(e=>!/TUNNEL|ERR_|Failed to load/.test(e)).join(' | '));await ctx.close()}
 await b.close()})();

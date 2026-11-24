const L=require('/home/claude/w/s7/qa/s7/lib.js');
(async()=>{const b=await L.chromium.launch();
for(const hero of ['princess','prince']){const {page,ctx}=await L.open(b,{ver:'web',hero,fake:false});
await page.evaluate(()=>__ev(`(()=>{S.room=S.room||{};S.room.pic='mypic45';S.room.toy='shelf42';(S.roomOwned=S.roomOwned||[]).push('pic:mypic45','toy:shelf42');save();go('room')})()`));
await page.waitForTimeout(2500);await page.evaluate(()=>document.querySelectorAll('.overlay,[class*=coach]').forEach(e=>e.remove()));await page.waitForTimeout(300);
await page.screenshot({path:`/tmp/claude-0/room_${hero}.png`});await ctx.close()}
await b.close()})();

const {R,VP,open,ev}=require('./lib');const vp=process.argv[2]||'ip',hero=process.argv[3]||'princess';
(async()=>{const b=await R.chromium.launch();const extra={chDone:45,progs:Array(45).fill(10),owned:['bag41','dress43','b_paint43','beret43','redpanda44','mypic45','shelf42'],look:{dress:hero==='prince'?'b_basic':'basic',pet:'unicorn'}};
 const {page,errs}=await open(b,vp,{hero,extra});
 await ev(page,"go('wardrobe')");await page.waitForTimeout(2500);
 for(const t of ['head','prop','acc','shoe','dress']){await page.evaluate(t=>{document.querySelectorAll(".coach").forEach(c=>c.remove());document.querySelector(`.w90tab[data-t="${t}"]`).click()},t);await page.waitForTimeout(700);
  console.log(t,await page.evaluate(()=>[...document.querySelectorAll('#opts .opt')].map(e=>e.dataset.id+':'+e.textContent.trim()).join(', ')))}
 console.log(await ev(page,"JSON.stringify(S.look)"),await ev(page,"JSON.stringify((S.owned||[]).filter(x=>/43|41/.test(x)))"));
 console.log(errs.slice(0,5));await b.close()})();

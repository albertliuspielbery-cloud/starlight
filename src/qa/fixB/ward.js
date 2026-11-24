const {R,VP,open,ev}=require('./lib');const vp=process.argv[2]||'ip',hero=process.argv[3]||'princess';
(async()=>{const b=await R.chromium.launch();const extra={chDone:45,progs:Array(45).fill(10),owned:['bag41','dress43','b_paint43','beret43','redpanda44','mypic45','shelf42'],look:{dress:hero==='prince'?'b_basic':'basic',pet:'unicorn'}};
 const {page,errs}=await open(b,vp,{hero,extra});
 await ev(page,"go('wardrobe')");await page.waitForTimeout(2500);
 const tabs=await page.evaluate(()=>[...document.querySelectorAll('.wtab,.tab,[data-cat],[data-t]')].filter(e=>e.offsetParent).map(e=>(e.className+'|'+(e.dataset.cat||e.dataset.t||'')+'|'+e.getAttribute('aria-label')).slice(0,80)));
 console.log(tabs.join('\n'));
 console.log(await page.evaluate(()=>document.querySelector('#screen').innerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'').slice(0,2500)));
 await b.close()})();

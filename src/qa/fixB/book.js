const {R,VP,open,ev}=require('./lib');const vp=process.argv[2]||'se';
(async()=>{const b=await R.chromium.launch();const {page}=await open(b,vp,{extra:{chDone:45,progs:Array(45).fill(10)}});
 await ev(page,"go('dex')");await page.waitForTimeout(2500);
 console.log(await page.evaluate(()=>{const t=[...document.querySelectorAll('button')].filter(b=>/^(獎|徽章|圖鑑)/.test(b.textContent.trim())||b.getAttribute('role')==='tab');const p=t[0]&&t[0].parentElement;const s=p&&getComputedStyle(p);return (p?p.className+' '+s.display+' ov='+s.overflowX+' w='+p.getBoundingClientRect().width+' sw='+p.scrollWidth:'')+'\n'+t.map(b=>{const r=b.getBoundingClientRect();return b.className+' ['+(r.left|0)+','+(r.width|0)+'x'+(r.height|0)+'] '+b.textContent.trim()+' fs='+getComputedStyle(b).fontSize}).join('\n')}));
 await page.screenshot({path:__dirname+'/shots/book0_'+vp+'.png'});await b.close()})();

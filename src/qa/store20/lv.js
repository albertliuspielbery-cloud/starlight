const L=require('./lib');(async()=>{const b=await L.chromium.launch();const p=await L.open(b,{scale:1});
console.log(await L.ev(p,`JSON.stringify([40,41,42,43,44].map(c=>{setCh(c);return [c+1,LEVELS.map((l,i)=>i+':'+l.name+' '+l.qs.join(','))]}))`));
console.log(await L.ev(p,`JSON.stringify({ch:S.ch,chDone:S.chDone,own:iapOwned(),open:[40,44].map(i=>!!window.__appOpen&&__appOpen(i))})`));
console.log(p.errs);await b.close()})();

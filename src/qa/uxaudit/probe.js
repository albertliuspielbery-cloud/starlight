const L=require('../s7/lib');const fs=require('fs');
(async()=>{const b=await L.chromium.launch();const errs=[];
 const sv=L.save40('princess',{chDone:45,ch:44,progs:Array(45).fill(10),wallet:500,tutWard:1});
 const {page}=await L.open(b,{ver:'app',owned:['full'],errs,save:sv});
 const d=await page.evaluate(()=>__ev(`CHAPTERS.map((c,i)=>({i:i+1,name:c.name||c.title,scene:c.scene||c.bg||'',levels:c.levels.map(l=>({n:l.name,q:l.qs.length,qs:l.qs,helper:l.helper,decor:l.decor,reward:l.reward})),mix:c.mix}))`));
 fs.writeFileSync(__dirname+'/chapters.json',JSON.stringify(d,null,0));
 const keys=await page.evaluate(()=>__ev(`Object.keys(CHAPTERS[0])`));console.log(keys);
 console.log(d.map(c=>c.i+' '+c.name+' L'+c.levels.length+' q:'+c.levels.map(l=>l.q).join(',')).join('\n'));
 await b.close()})();

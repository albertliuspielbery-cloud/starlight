// 快速預覽：只載入美術檔，畫 動物×四種樣子
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>console.log('c:',m.text()));
await p.setContent('<html><body style="margin:0;background:#E8F4E0;font:12px sans-serif"></body></html>');
await p.addScriptTag({path:'/home/claude/w/s7/mods/m8_photo_art.js'});
const n=await p.evaluate((ks)=>{const A=Object.assign({},window.__ZOO8a||{},window.__ZOO8b||{});delete A.RP;delete A.H;
 const keys=ks?ks.split(','):Object.keys(A).filter(k=>k!=='H');
 document.body.innerHTML='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:4px">'+keys.map(k=>['stand','sleep','eat','play'].map(q=>`<div style="background:#fff;border-radius:8px"><svg viewBox="0 0 100 100" width="100%">${A[k](q)}</svg><div style="text-align:center">${k} ${q}</div></div>`).join('')).join('')+'</div>';return keys.length},process.argv[2]||'');
await p.setViewportSize({width:1000,height:Math.ceil(n*260)+20});await p.screenshot({path:process.argv[3]||'grid.png',fullPage:true});console.log(errs);await b.close()})();

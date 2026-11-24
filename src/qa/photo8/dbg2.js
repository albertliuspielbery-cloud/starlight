const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>errs.push(m.text().slice(0,400)));
await p.goto('http://127.0.0.1:8981/index.html');await p.waitForTimeout(3000);errs.length=0;
const src=fs.readFileSync('/home/claude/w/s7/mods/m8_photo.js','utf8').replace("if(typeof SCREENS==='undefined'||!window.ZOO8||window.__PH8)return;","console.log('boot start',typeof SCREENS,!!window.ZOO8,!!window.__PH8);").replace("}catch(e){console.log('photo8',e)}};","}catch(e){console.log('photo8 ERR',e.stack)}};");
console.log(await p.evaluate(c=>{try{__ev(c);return 'ran '+!!window.__PH8}catch(e){return 'EVAL '+e.stack}},src));console.log(errs);await b.close()})();

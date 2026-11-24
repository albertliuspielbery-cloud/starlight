const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});
await p.goto('http://127.0.0.1:'+(process.argv[2]||8981)+'/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>__ev(`JSON.stringify({zoo:typeof window.ZOO8,ph8:typeof window.__PH8,err:window.__PH8err,a:window.__PH8a,b:window.__PH8b,T:typeof window.__photo8T,icon:!!ICONART['i:photo8'],scr:typeof SCREENS.photo8,css:!!document.getElementById('ph8css')})`)));await b.close()})();

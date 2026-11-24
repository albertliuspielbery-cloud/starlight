const {chromium}=require('playwright');
const [url,out,w]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+(w||1600),height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'||/s41|S41|err/i.test(m.text()))errs.push(m.text())});
await p.goto(url);await p.waitForFunction(()=>document.title==='ready',null,{timeout:60000});await p.waitForTimeout(500);
await p.screenshot({path:out,fullPage:true});console.log('ok',errs.slice(0,8));await b.close()})();

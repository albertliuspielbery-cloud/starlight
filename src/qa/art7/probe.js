const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8993/base/index.html');await p.waitForTimeout(4000);
const r=await p.evaluate(()=>{const E=window.__ev;const o={};const AN=E('AN'),BODY1221=window.BODY1221,DRESS=E('DRESS'),BFIT=E('BFIT'),S=E('S'),ITEMS=E('ITEMS'),ACCANCH=E('ACCANCH');o.an=Object.keys(AN);o.sp=Object.keys(BODY1221.SP);o.fb=typeof window.fullBody;o.dress=Object.keys(DRESS).slice(0,80);o.bfit=Object.keys(BFIT).length;o.look=JSON.stringify(S.look);o.hero=window.HERO;o.pets=ITEMS.filter(x=>x.slot==='pet').map(x=>x.id);o.acc=JSON.stringify(ACCANCH.unicorn||null);o.anc=JSON.stringify(ACCANCH.sloth36);return o});
console.log(JSON.stringify(r,null,1));console.log(errs.slice(0,5));await b.close()})();

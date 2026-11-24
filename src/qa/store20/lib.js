// App 2.0 商店截圖／審查附件共用：開 App 版 8982（自己的 context，不動伺服器），注入假商店、已買「完整版」full、完成第 45 章存檔。
// 2026-11-24 星光工作室 Starlight Studio
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const MOCK=fs.readFileSync(path.join(__dirname,'../iapmock.js'),'utf8');
const URL='http://127.0.0.1:8982/index.html';
// iPhone 6.9 吋 440x956@3＝1320x2868；iPad 13 吋 1032x1376@2＝2064x2752（跟 1.3 起的商店截圖一樣）
const DEV={iphone:{viewport:{width:440,height:956},deviceScaleFactor:3,isMobile:true},ipad:{viewport:{width:1032,height:1376},deviceScaleFactor:2,isMobile:false},
 iap:{viewport:{width:430,height:932},deviceScaleFactor:3,isMobile:true}};
const EXPIRED=JSON.stringify({start:'2026-01-01',days:30});
function save45(hero,extra={}){return Object.assign({look:{dress:hero==='prince'?'b_basic':'basic',pet:'unicorn'},owned:[],wallet:86,progs:Array(45).fill(10),ch:44,chDone:45,diff:'mid',sound:false,music:false,voice:false,name:'',vo:false,rest:0},extra)}
async function open(b,{dev='iphone',hero='princess',owned=['full'],save,v2={},promo=EXPIRED,scale,rtNow='2026-11-15T10:00'}={}){
 const d=Object.assign({},DEV[dev]);if(scale)d.deviceScaleFactor=scale;
 const ctx=await b.newContext({viewport:d.viewport,deviceScaleFactor:d.deviceScaleFactor,isMobile:d.isMobile,hasTouch:true,serviceWorkers:'block'});
 const page=await ctx.newPage();page.errs=[];
 await page.route(/promo\.json/,r=>r.fulfill({status:404,body:''}));
 page.on('pageerror',e=>page.errs.push('pageerror: '+e.message));
 page.on('console',m=>{const t=m.text();if(m.type()==='error'&&!/promo\.json|Failed to load resource/.test(t))page.errs.push('console: '+t)});
 const sv=save||save45(hero);
 await page.addInitScript(([hero,sv,v2,owned,promo,rt])=>{window.__rtNow=new Date(rt).getTime();try{const S=Storage.prototype.setItem;if(!sessionStorage.getItem('__init')){sessionStorage.setItem('__init','1');
   localStorage.clear();
   S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero,chosen:1}]}));
   S.call(localStorage,hero==='prince'?'pp4:prince':'pp4',JSON.stringify(sv));
   S.call(localStorage,'pp4v2',JSON.stringify(Object.assign({listenFirst:false,s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1},v2)));
   S.call(localStorage,'__iapmock_owned',JSON.stringify(owned));
   S.call(localStorage,'pp4iap',JSON.stringify(owned));
   if(promo)S.call(localStorage,'pp4promoCfg',promo)}}catch(e){}},[hero,sv,v2,owned,promo,rtNow]);
 await page.addInitScript(MOCK);
 await page.goto(URL);
 await page.waitForFunction(()=>typeof window.__ev==='function'&&document.querySelector('#screen'),null,{timeout:90000});
 await page.waitForTimeout(3000);page.ctx=ctx;return page}
const ev=(p,c)=>p.evaluate(x=>__ev(x),c);
const clean=p=>ev(p,`(()=>{try{hush()}catch(e){}document.querySelectorAll('.overlay,.coach,#toast,.toast').forEach(o=>o.remove());going=false;try{S.rest=0;TM.since=0;TM.restUntil=0;V2.dayLimit=0}catch(e){}})()`);
module.exports={chromium,open,ev,clean,save45,DEV};

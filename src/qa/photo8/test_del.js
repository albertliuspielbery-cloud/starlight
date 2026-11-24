// 刪除小朋友時照片一起刪；開機清掉沒有主人的照片；現在這位小朋友的照片不動
const {chromium}=require('playwright');
(async()=>{for(const port of (process.argv[2]||"8981,8982").split(",").map(Number)){const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const ev=c=>p.evaluate(c=>__ev(c),c);
await p.goto(`http://127.0.0.1:${port}/index.html`);await p.waitForTimeout(3500);
await ev(`(()=>{const P=window.PROF;if(!P.kids.some(k=>k.id==='c9'))P.kids.push({id:'c9',hero:'princess'});profSave();
 const ph=JSON.stringify([{t:1,k:'panda',q:'e09',d:'data:image/jpeg;base64,AAAA'}]);__rawLS.set('pp4photo8@c9',ph);__rawLS.set('pp4photo8',ph);__rawLS.set('pp4photo8@c77',ph);return 1})()`);
const before=await ev(`JSON.stringify(['pp4photo8@c9','pp4photo8','pp4photo8@c77'].map(k=>!!__rawLS.get(k)))`);
// 重新開：沒有主人的 c77 要被清掉
await p.reload();await p.waitForTimeout(3500);
const afterReload=await ev(`JSON.stringify(['pp4photo8@c9','pp4photo8','pp4photo8@c77'].map(k=>!!__rawLS.get(k)))`);
// 從家長專區刪掉 c9（自動按「刪除」）
await ev(`(()=>{profDel('c9');return 1})()`);await p.waitForTimeout(600);
const btns=await p.evaluate(()=>[...document.querySelectorAll('.overlay button')].map(b=>b.textContent.trim()));
const clickT=t=>p.evaluate(t=>{const b=[...document.querySelectorAll('button')].reverse().find(b=>b.offsetParent&&b.textContent.trim()===t);if(b){b.click();return 1}return 0},t);
 console.log(' 下一步',await clickT('下一步'));await p.waitForTimeout(600);const hb=await p.$('.s8hold');if(hb){const bb=await hb.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.waitForTimeout(2500);await p.mouse.up()}console.log(' 按住兩秒刪除',!!hb);await p.waitForTimeout(1200);
const after=await ev(`JSON.stringify({kids:PROF.kids.map(k=>k.id),keys:['pp4photo8@c9','pp4photo8','pp4photo8@c77'].map(k=>!!__rawLS.get(k))})`);
console.log(port,'before',before,'afterReload',afterReload,'confirm buttons',btns.join('|'),'afterDelete',after,'errors',errs.length?errs:'none');
await ev(`__rawLS.del('pp4photo8')`);await b.close()}})();

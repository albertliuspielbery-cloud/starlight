// 內購審查截圖：家長專區購買頁（只有「完整版」一列），430x932@3＝1290x2796（照原 iap_review.png）
const L=require('./lib');const OUT=__dirname+'/raw/';const sc=+process.env.SCALE||3;
(async()=>{const b=await L.chromium.launch();
 for(const [tag,promo] of [['promo',null],['expired',undefined]]){
  const p=await L.open(b,{dev:'iap',scale:sc,owned:[],promo:promo===null?null:undefined,save:L.save45('princess',{progs:Array(5).fill(10).concat(Array(40).fill(0)),ch:5,chDone:5})});
  await L.clean(p);await L.ev(p,`(()=>{go('title');setTimeout(()=>__iapShopRaw(),500)})()`);await p.waitForTimeout(3500);
  const info=await L.ev(p,`(()=>{const c=document.querySelector('.iapcard');return c?{rows:[...c.querySelectorAll('.iaprow')].map(r=>r.innerText.replace(/\\s+/g,' ')),all:c.innerText.replace(/\\s+/g,' ').slice(0,900)}:null})()`);
  console.log(tag,JSON.stringify(info));
  await p.evaluate(()=>{const c=document.querySelector('.iapcard');let el=c;while(el&&!(el.scrollHeight>el.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(el).overflowY)))el=el.parentElement;if(el)el.scrollTop=el.scrollHeight;else c.scrollIntoView({block:'end'})});
  await p.waitForTimeout(800);await p.screenshot({path:`${OUT}iap_${tag}.png`});console.log(p.errs);await p.ctx.close()}
 await b.close()})();

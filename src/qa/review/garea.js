// 地球儀 30 國可點面積（像素平方、等效直徑），zoom 1 和最大；node garea.js vp
const R=require('./rlib');const vp=process.argv[2]||'se';
const CEN={tw:[121,23.7],jp:[138,36],kr:[127.8,36.3],th:[101,15],vn:[106,16],sg:[103.8,1.35],my:[102,4],id:[115,-2],ph:[122,12],in:[79,22],gb:[-2,53],fr:[2.5,46.5],de:[10.4,51],it:[12.5,42.8],es:[-3.7,40],nl:[5.3,52.2],ch:[8.2,46.8],gr:[22,39.3],is:[-18.5,64.9],us:[-98,39],ca:[-100,58],mx:[-102,23.5],br:[-52,-10],ar2:[-64,-35],pe:[-75,-9.5],eg:[30,26.5],ke:[38,0.3],za:[24,-29],ma:[-6.5,32],au:[134,-25],nz:[172.5,-41.5]};
(async()=>{const b=await R.chromium.launch();const {page}=await R.open(b,{vp,extra:{chDone:45}});const ev=c=>R.ev(page,c);
 await ev("go('globe8')");await page.waitForTimeout(4500);
 const res=await ev(`(()=>{const G=__gl8,out={};const ct=__G8.CT;for(const z of [1,2.6]){G.setZoom(z);for(const c of ct){const k=c[0];const p=__G8.MAP?null:null;out[k]=out[k]||{};}}return 1})()`);
 const ct=await ev("__G8.CT.map(c=>c[0])");const rows=[];
 for(const z of [1,2.6]){await ev(`__gl8.setZoom(${z})`);
  for(const k of ct){const c=CEN[k];if(!c){rows.push([z,k,'noc']);continue}
   await ev(`__gl8.panTo(${c[0]},${c[1]},0)`);await page.waitForTimeout(60);
   const a=await ev(`(()=>{const G=__gl8;let n=0;const s=3;for(let y=G.VW.cy-60;y<G.VW.cy+60;y+=s)for(let x=G.VW.cx-60;x<G.VW.cx+60;x+=s)if(G.hitAt(x,y)==='${k}')n++;return n*s*s})()`);
   rows.push([z,k,a,Math.round(2*Math.sqrt(a/Math.PI))])}}
 console.log('R@1',await ev('__gl8.VW.base'));rows.filter(r=>r[3]<36).forEach(r=>console.log(r.join('\t')));console.log('ALL',JSON.stringify(rows));await b.close()})();

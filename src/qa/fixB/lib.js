// fixB 共用
const R=require('../review/rlib');const Q=require('../s7/qtest');
const VP={padL:{width:1180,height:820},padP:{width:820,height:1180},ip:{width:390,height:844},se:{width:375,height:667},land:{width:844,height:390},landse:{width:667,height:375}};
async function open(b,vp,o={}){return R.open(b,Object.assign({vp:VP[vp]},o))}
const ev=(p,c)=>p.evaluate(c=>__ev(c),c);
async function rects(page,sels){return page.evaluate(sels=>{const o={};for(const s of sels){o[s]=[...document.querySelectorAll(s)].filter(e=>e.offsetParent||getComputedStyle(e).position==='fixed').slice(0,6).map(e=>{const r=e.getBoundingClientRect();return [r.left|0,r.top|0,r.width|0,r.height|0]})}o.W=[innerWidth,innerHeight];return o},sels)}
// 全部可點目標：最小邊、是否出畫面
async function targets(page,sel){return page.evaluate(sel=>{const W=innerWidth,H=innerHeight;return [...document.querySelectorAll(sel)].filter(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0}).map(e=>{const r=e.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),off:r.left<-1||r.top<-1||r.right>W+1||r.bottom>H+1,b:Math.round(r.bottom),r:Math.round(r.right)}})},sel)}
function sum(t){if(!t.length)return 'none';return `n=${t.length} min=${Math.min(...t.map(x=>Math.min(x.w,x.h)))} off=${t.filter(x=>x.off).length} maxB=${Math.max(...t.map(x=>x.b))} maxR=${Math.max(...t.map(x=>x.r))}`}
module.exports={R,Q,VP,open,ev,rects,targets,sum};

// 審查 B 共用：開頁、語音缺漏紀錄、版面檢查（只讀，不改程式）
const L=require('../s7/lib');
const VPS={se:{width:375,height:667},ip:{width:395,height:859},land:{width:844,height:390},padP:{width:820,height:1180},padL:{width:1180,height:820}};
const HOOK=`(()=>{window.__miss=[];window.__tts=[];try{const o=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{__tts.push(u.text);};}catch(e){}})()`;
async function open(b,{ver='web',hero='princess',vp='padL',extra={},owned,v2={}}={}){
 const errs=[];const sv=L.save40(hero,Object.assign({sound:true,vo:true},extra));
 const o=await L.open(b,{ver,hero,save:sv,fake:false,vp:VPS[vp]||vp,errs,v2,owned:owned||(ver==='app'?['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']:[])});
 await o.page.evaluate(HOOK);
 // 錄音缺漏：包 speakOne
 await o.page.evaluate(()=>__ev(`(()=>{const o=speakOne;speakOne=function(p,opt){try{window.__miss.push(typeof p==='object'?(p.zh||p.en):p)}catch(e){}return o(p,opt)}})()`)).catch(e=>errs.push('hook '+e.message));
 o.errs=errs;return o}
const ev=(p,c)=>p.evaluate(c=>__ev(c),c);
// 版面：可點的東西太小、跑出畫面、字被切；頁面可捲
async function layout(page,root='body'){return page.evaluate(root=>{const W=innerWidth,H=innerHeight;const out={small:[],off:[],clip:[],scroll:null};
 const R=document.querySelector(root)||document.body;
 const vis=e=>{const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden'||+s.opacity===0)return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
 const name=e=>(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):e.tagName.toLowerCase())+(e.textContent?' "'+e.textContent.trim().slice(0,12)+'"':'');
 const clk=[...R.querySelectorAll('button,[data-v],.btn,[role=button],.wnode,.pcard,[onclick]')].filter(vis);
 for(const e of clk){const r=e.getBoundingClientRect();if(Math.min(r.width,r.height)<40&&!e.closest('.vhide'))out.small.push(name(e)+` ${r.width|0}x${r.height|0}`);
  if(r.right>W+1||r.bottom>H+1||r.left<-1||r.top<-1)out.off.push(name(e)+` [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}]`)}
 for(const e of R.querySelectorAll('*')){if(!vis(e))continue;const s=getComputedStyle(e);if(e.children.length===0&&e.textContent.trim()&&(e.scrollWidth>e.clientWidth+2&&(s.overflow==='hidden'||s.overflowX==='hidden'||s.textOverflow==='ellipsis')))out.clip.push(name(e));
  const r=e.getBoundingClientRect();if(e.children.length===0&&e.textContent.trim().length>1&&(r.right>W+2||r.left<-2)&&r.width<W)out.off.push('text '+name(e)+` [${r.left|0}-${r.right|0}]`)}
 const se=document.scrollingElement;out.scroll={doc:se.scrollHeight>H+2||se.scrollWidth>W+2,dh:se.scrollHeight,dw:se.scrollWidth};
 out.small=[...new Set(out.small)].slice(0,15);out.off=[...new Set(out.off)].slice(0,15);out.clip=[...new Set(out.clip)].slice(0,10);return out},root)}
module.exports={open,ev,layout,VPS,chromium:L.chromium};

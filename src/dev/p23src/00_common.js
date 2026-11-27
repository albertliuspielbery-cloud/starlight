if(typeof SCREENS==='undefined'||typeof V2==='undefined')return;
/* ---------- 共用 ---------- */
const RMo=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite||document.body.classList.contains('lite')}catch(e){return false}};
let UID=0;const uid=p=>'p23'+(p||'')+(++UID).toString(36)+Math.random().toString(36).slice(2,5);
const f1=v=>(+v).toFixed(1);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const ST=()=>{if(!V2.p23||typeof V2.p23!=='object'||Array.isArray(V2.p23))V2.p23={};const o=V2.p23;
 if(!o.fm||typeof o.fm!=='object')o.fm={};if(!o.vs||typeof o.vs!=='object')o.vs={};if(!o.vb||typeof o.vb!=='object')o.vb={};if(!Array.isArray(o.th))o.th=[];return o};
const SV2=()=>{try{save2()}catch(e){}};
const gHas=id=>{try{return !!(window.G22&&typeof G22.has==='function'&&G22.has(id))}catch(e){return false}};
const gFresh=id=>{try{return !!G22.st().fresh[id]}catch(e){return false}};
const gSeen=id=>{try{const g=G22.st();if(g.fresh&&g.fresh[id]){delete g.fresh[id];save2()}}catch(e){}};
const CN=n=>{const c='零一二三四五六七八九';n=+n;if(n<=10)return n===10?'十':c[n];if(n<20)return '十'+c[n-10];return c[Math.floor(n/10)]+'十'+(n%10?c[n%10]:'')};
/* 語音：只念有真人錄音的句子；沒有錄音就只顯示字幕框的字（不走裝置語音） */
const vKey=p=>{if(p==null||p==='')return null;const u=String(typeof heroT==='function'?heroT(p):p).replace(/⁠/g,'').trim();
 if(/^\d+$/.test(u))return voHas('z|'+u)?'z|'+u:'n|'+(+u);return voHas('z|'+u)?'z|'+u:'z|'+voCk(u)};
const recd=p=>{try{if(!VO.idx)return false;const k=vKey(p);return !!k&&voHas(k)}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&recd(p));if(!a.length)return Promise.resolve(false);
 const q=[];a.forEach((t,i)=>{if(i)q.push({pause:180});q.push(t)});try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
function gems(key){if(window.__P5&&typeof __P5.gems==='function')return __P5.gems(key);const first=V2[key]!==today();V2[key]=today();SV2();const n=first?3:1;S.wallet+=n;try{save()}catch(e){}try{renderBar()}catch(e){}sfx('gem');return n}
const T26=window.__T26||{};

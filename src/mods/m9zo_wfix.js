/* ================= 描字筆畫審查修正（m9zo_wfix.js） =================
 * 2026-11-28 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 2.3 筆畫總檢查（qa/v23/wchk）發現、要覆寫舊資料的地方都放這裡（新字 ㄚㄛㄜ 直接改在 m8sd_write8.js）。
 * 1. ㄓ 的筆順照教育部《國語注音符號手冊》聲符說明表：4 畫，① 左邊豎折（往下再往右）② 右邊豎 ③ 中間豎 ④ 底下長橫（手冊筆順小圖：左下角、杯子形、加中間豎、加底橫）。
 *    原本示範是「先寫中間豎」，改成手冊順序；中間豎要一直寫到底下長橫、跟它接起來（字形就是這樣）。家長要求只收正確寫法，舊的兩種寫法不再算對。
 *    ㄐ：手冊的字形第二筆（右邊的豎）是直的、沒有往左鉤；原本示範有一個小鉤。只收直的那種。
 *    只收手冊寫法：ㄅㄆㄉㄌㄎ 筆畫數不對的舊寫法拿掉（ㄖ 手冊可省作三畫，保留）。
 *    ㄘ：① 橫 ② 從橫上面起筆往左下撇、轉往右橫、再往左下撇（末筆不鉤）；原本畫成七字形，字形不對。ㄗ：① 橫折鉤 ② 中間的豎（原本豎在最左邊）。
 * 2. i、j 上面的「點」：原本小朋友用手指「點一下」（沒有拖）會被當成誤觸、完全沒有反應，卡在那裡。
 *    現在：輪到寫「點」這一筆（很短的筆畫）、而且手指點在點的附近時，把這一下補成一小筆，照原本的判斷走（點對位置就算寫好）。
 *    點在別的地方照舊當誤觸，不會多出「寫錯」。
 */
(function(){if(typeof window.__ev!=='function'){console.log('wfix: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
try{
const W9=window.__WFIX={ver:'2026-11-28',fixed:[],dot:0};
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const plen=p=>{let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s};
function resample(p,step){if(p.length<2)return p.slice();const out=[p[0]];let acc=0;for(let i=1;i<p.length;i++){let a=p[i-1],b=p[i],d=dist(a,b);while(acc+d>=step){const r=(step-acc)/d;a=[a[0]+(b[0]-a[0])*r,a[1]+(b[1]-a[1])*r];out.push(a);d=dist(a,b);acc=0}acc+=d}const l=p[p.length-1];if(dist(out[out.length-1],l)>.01)out.push(l);return out}
function prep(points){const d=resample(points,1);const Ln=plen(points);let acc=0;const t=d.map((q,i)=>{if(i)acc+=dist(d[i-1],q);return Ln?acc/Ln:0});return {points,start:points[0],end:points[points.length-1],dense:d,tt:t,len:Ln,cov:resample(points,2)}}
// ---- 1. ㄓ：只收手冊筆順（中間豎接到底下長橫）；ㄐ 只收直的 ----
const ZHI=[[[26,24],[26,42],[26,60],[50,60],[74,60]],[[74,24],[74,35.7],[74,47.3],[74,59]],[[50,14],[50,25],[50,36],[50,47],[50,58],[50,69],[50,80]],[[16,80],[38.7,80],[61.3,80],[84,80]]];
function reg(){const WR=window.__WR;if(!WR||!WR.CH||!WR.CH['ㄓ'])return false;const C=WR.CH['ㄓ'];
 if(!C.__w9){C.forms=[ZHI.map(prep)];C.P=C.forms[0];C.__w9=1;W9.fixed.push('ㄓ')}
 // ㄘ、ㄗ 字形改正（照遊戲字型量的座標）：ㄘ 第二筆是「撇下來→往右橫→再撇下來」，不是七字形的豎彎；ㄗ 的豎在中間，橫往左伸出去。只收這一種。
 const CI=[[[14,30],[38,30],[62,30],[86,30]],[[51,15],[42.2,34],[33.5,53],[53.5,54],[73.5,55],[64.8,70.5],[56,86]]];
 const ZI=[[[17,21],[49.5,21],[82,21],[81.5,36.5],[81,52],[78,58],[72,60],[64,60]],[[48.5,21],[48.5,42],[48.5,63],[48.5,84]]];
 for(const [c,D] of [['ㄘ',CI],['ㄗ',ZI]]){const X=WR.CH[c];if(X&&!X.__w9c){X.forms=[D.map(prep)];X.P=X.forms[0];X.__w9c=1;W9.fixed.push(c)}}
 // 家長要求只收正確寫法：手冊筆畫數以外的舊寫法（ㄅ兩筆、ㄆㄉㄌㄎ三筆）拿掉；ㄖ 手冊有「可省作三畫」，保留。
 for(const [c,n] of [['ㄅ',1],['ㄆ',2],['ㄉ',2],['ㄌ',2],['ㄎ',2]]){const X=WR.CH[c];if(X&&!X.__w9b){const ok=X.forms.filter(f=>f.length===n);if(ok.length&&ok.length<X.forms.length){X.forms=ok;X.P=X.forms[0];W9.fixed.push(c)}X.__w9b=1}}
 const J=WR.CH['ㄐ'];if(J&&!J.__w9&&J.forms.length>1){const hook=f=>{const e=f[1]&&f[1].end,st=f[1]&&f[1].start;return e&&st&&st[0]-e[0]>3};const ok=J.forms.filter(f=>!hook(f));if(ok.length&&ok.length<J.forms.length){J.forms=ok;J.P=J.forms[0];W9.fixed.push('ㄐ')}J.__w9=1}
 return true}
if(!reg()){let n=0;const iv=setInterval(()=>{if(reg()||++n>60)clearInterval(iv)},250)}
// ---- 2. 點一下也算寫「點」 ----
let d0=null;
const live=()=>{try{const s=window.__WR&&__WR.state();return s&&s.live&&s.phase==='write'&&s.lay&&s.lay.box?s:null}catch(e){return null}};
window.addEventListener('pointerdown',e=>{d0=null;if(!live())return;d0={x:e.clientX,y:e.clientY,id:e.pointerId,t:e.target,moved:0}},true);
window.addEventListener('pointermove',e=>{if(d0&&e.pointerId===d0.id&&!e.__w9)d0.moved=Math.max(d0.moved,Math.hypot(e.clientX-d0.x,e.clientY-d0.y))},true);
window.addEventListener('pointerup',e=>{try{const d=d0;d0=null;if(!d||e.pointerId!==d.id)return;const s=live();if(!s)return;
 const [bx,by,bs]=s.lay.box;if(!(bs>0))return;const toU=(x,y)=>[(x-bx)/bs*100,(y-by)/bs*100];
 const u0=toU(d.x,d.y),u1=toU(e.clientX,e.clientY);if(dist(u0,u1)>=4.5||d.moved/bs*100>=4.5)return;   // 有拖動：照原本判斷
 const C=__WR.CH[s.ch];if(!C)return;let E=null;for(const f of (s.forms&&s.forms.length?s.forms:[0])){const st=C.forms[f]&&C.forms[f][s.k];if(st&&st.len<10){E=st;break}}
 if(!E)return;const c=[(E.start[0]+E.end[0])/2,(E.start[1]+E.end[1])/2];if(dist(u0,c)>14)return;   // 點的位置差太遠：照舊當誤觸
 const L=Math.max(E.len,1),vx=(E.end[0]-E.start[0])/L,vy=(E.end[1]-E.start[1])/L;const p0=[u0[0]-vx*L*.6,u0[1]-vy*L*.6];
 // 以點下去的地方為中心，沿著點的方向補成一小筆（資料裡那一點長度的 1.2 倍）；pointerup 還沒到寫字板，所以原本的判斷會照常接手
 const tg=d.t&&d.t.isConnected?d.t:document.elementFromPoint(d.x,d.y);if(!tg)return;
 const mv=q=>{const ev=new PointerEvent('pointermove',{bubbles:true,cancelable:true,pointerId:e.pointerId,pointerType:e.pointerType||'touch',isPrimary:true,clientX:bx+q[0]/100*bs,clientY:by+q[1]/100*bs});ev.__w9=1;tg.dispatchEvent(ev)};
 for(let i=0;i<=6;i++)mv([p0[0]+vx*L*1.2*i/6,p0[1]+vy*L*1.2*i/6]);W9.dot++}catch(err){console.log('wfix dot',err)}},true);
}catch(e){console.log('wfix',e)}
}).toString()+')()')})();

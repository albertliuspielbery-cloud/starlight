/* ================= 第八季寫字：ㄚ ㄛ ㄜ ㄝ、小寫 e f g h i j k（m8sd_write8.js） =================
 * 2026-11-28 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 照 m7d_write7.js：把新字的筆畫加進 __WR.CH／__WR.chars，三階段（① 描一描、② 虛線描、③ 自己寫）、判斷、提醒、紀錄全部沿用 m99x。
 *   關卡表直接用 'write:ㄚ:1'、'write:e:1'、'R:ㄚ|ㄛ:3'。
 * 座標：0～100。注音用田字格（tian）；英文用四線格（four：12 最上線、38 中間虛線、64 紅色基線、90 最下線）。
 *   小寫「三層樓」：e、i 住中間（38→64；i 的點在上面一層）；f、h、k 往上長（12→64）；g、j 往下掉（38→90）。
 * ── 筆畫依據 ──
 *   注音：教育部《國語注音符號手冊》筆畫數 ㄚ2、ㄛ1、ㄜ2、ㄝ3。
 *     ㄚ：① 左上往中間的短斜筆 ② 右上往中間，接著往下寫直線（也收先寫右邊那一筆）。
 *     ㄛ：一筆：上面的橫往右，轉向左下斜，再彎到底往右上收。
 *     ㄜ：① 上面穿過橫線的短豎 ② 跟ㄛ一樣的一筆（也收先寫ㄛ形再寫短豎）。
 *     ㄝ：① 橫 ② 右邊的短豎 ③ 左邊的豎彎（由上往下，到底轉向右）；也收 ② ③ 對調、或先寫左邊的豎彎。
 *   英文小寫：台灣國小常見教法（四線格）。
 *     e：一筆：中間由左往右橫，接著逆時針繞到右下。
 *     f：① 右上彎下來的長直線（到基線）② 中線上的短橫。
 *     g：① c 形（逆時針繞一圈）② 右邊直線由中線往下，過基線後往左彎鉤；也收一筆寫完。
 *     h：① 長直線（最上線到基線）② 從直線中間往右拱起再往下到基線。
 *     i：① 中間的短直線 ② 上面一點。
 *     j：① 由中線往下，過基線後往左彎鉤 ② 上面一點。
 *     k：① 長直線 ② 右上往左到直線中間再往右下（一筆）；也收兩筆（＼、／分開寫）。
 * 語音：「還記得怎麼寫ㄚ嗎？」「你會寫ㄚ了！」整句錄音（lines/s8_content.tsv 的 S8_W 開頭），沒錄好以前只出字幕（m99x 原本就這樣）。
 */
(function(){if(typeof window.__ev!=='function'){console.log('write8: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
try{
const L=(a,b,n=4)=>Array.from({length:n},(_,i)=>{const t=i/(n-1);return [+(a[0]+(b[0]-a[0])*t).toFixed(1),+(a[1]+(b[1]-a[1])*t).toFixed(1)]});
const PL=(...pts)=>{const o=[];for(let i=1;i<pts.length;i++){const s=L(pts[i-1],pts[i],Math.max(3,Math.round(Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1])/8)+1));o.push(...(i>1?s.slice(1):s))}return o};
// 橢圓弧：角度 0＝右、90＝下（螢幕座標）；a0→a1 遞減＝逆時針
const ARC=(cx,cy,rx,ry,a0,a1,step=12)=>{const n=Math.max(3,Math.ceil(Math.abs(a1-a0)/step)+1);return Array.from({length:n},(_,i)=>{const a=(a0+(a1-a0)*i/(n-1))*Math.PI/180;return [+(cx+rx*Math.cos(a)).toFixed(1),+(cy+ry*Math.sin(a)).toFixed(1)]})};
const cat=(...ps)=>{const o=[];ps.forEach(p=>{if(o.length&&p.length&&Math.hypot(o[o.length-1][0]-p[0][0],o[o.length-1][1]-p[0][1])<.5)o.push(...p.slice(1));else o.push(...p)});return o};
const bowl=()=>ARC(49,51,14.5,13,-28,-332);          // g 的 c 形（右上起逆時針，停在右下）
// ㄛ 的身體（一筆）：dy 往下移
const oBody=dy=>cat(PL([28,22+dy],[70,22+dy],[42,50+dy]),ARC(54,60+dy,16,16,200,90,15),PL([54,76+dy],[64,74+dy],[74,66+dy]));
const hookL=(x,y0,y1)=>cat(L([x,y0],[x,y1-6],6),ARC(x-10,y1-6,10,8,0,140,20));   // 往下，過基線往左彎鉤
const WRD8={
 'ㄚ':['zy','tian',[[L([28,18],[50,48],4),PL([72,18],[50,48],[50,84])],[PL([72,18],[50,48],[50,84]),L([28,18],[50,48],4)]]],
 'ㄛ':['zy','tian',[[oBody(0)]]],
 'ㄜ':['zy','tian',[[L([50,12],[50,38],4),oBody(8)],[oBody(8),L([50,12],[50,38],4)]]],
 'ㄝ':['zy','tian',[[L([20,40],[82,40],6),L([64,20],[64,62],5),PL([36,20],[36,78],[82,78])],[L([20,40],[82,40],6),PL([36,20],[36,78],[82,78]),L([64,20],[64,62],5)],[PL([36,20],[36,78],[82,78]),L([20,40],[82,40],6),L([64,20],[64,62],5)]]],
 'e':['en','four',[[cat(L([35,51],[63.5,51],4),ARC(49.25,51,14.25,13,0,-318))]]],
 'f':['en','four',[[cat(ARC(54,20,8,8,-20,-180,20),L([46,20],[46,64],6)),L([34,38],[60,38],4)]]],
 'g':['en','four',[[bowl(),hookL(63.5,38,88)],[cat(ARC(49,51,14.5,13,-20,-372),hookL(63.5,44,88))]]],
 'h':['en','four',[[L([35,12],[35,64],6),cat(ARC(49,52,14,12,180,360),L([63,52],[63,64],3))]]],
 'i':['en','four',[[L([50,38],[50,64],4),L([50,22],[50,27],3)]]],
 'j':['en','four',[[hookL(56,38,88),L([56,22],[56,27],3)]]],
 'k':['en','four',[[L([36,12],[36,64],6),PL([62,36],[37,52],[64,64])],[L([36,12],[36,64],6),L([62,36],[37,52],4),L([45,47],[64,64],4)]]]};
const NOTES8={'ㄚ':'教育部《國語注音符號手冊》2 畫：左上短斜、右上斜接直線；兩種先後都算對','ㄛ':'1 畫','ㄜ':'2 畫：上面的短豎、ㄛ形；兩種先後都算對','ㄝ':'3 畫：橫、右短豎、左豎彎；也收另外兩種先後',
 e:'一筆',f:'彎鉤直線＋短橫',g:'c 形＋往下彎鉤；也收一筆',h:'長直線＋拱起',i:'短直線＋點',j:'往下彎鉤＋點',k:'長直線＋〈（一筆）；也收兩筆'};
const W8=window.__WR8={ready:false,ver:'2026-11-28',chars:Object.keys(WRD8),data:WRD8,notes:NOTES8};
function reg(){const WR=window.__WR;if(!WR||!WR.CH||!WR.chars)return false;
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 const plen=p=>{let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s};
 function resample(p,step){if(p.length<2)return p.slice();const out=[p[0]];let acc=0;for(let i=1;i<p.length;i++){let a=p[i-1],b=p[i],d=dist(a,b);while(acc+d>=step){const r=(step-acc)/d;a=[a[0]+(b[0]-a[0])*r,a[1]+(b[1]-a[1])*r];out.push(a);d=dist(a,b);acc=0}acc+=d}const l=p[p.length-1];if(dist(out[out.length-1],l)>.01)out.push(l);return out}
 function prep(points){const d=resample(points,1);const Ln=plen(points);let acc=0;const t=d.map((q,i)=>{if(i)acc+=dist(d[i-1],q);return Ln?acc/Ln:0});return {points,start:points[0],end:points[points.length-1],dense:d,tt:t,len:Ln,cov:resample(points,2)}}
 for(const c in WRD8){const [kind,grid,forms]=WRD8[c];if(WR.CH[c])continue;
  WR.CH[c]={char:c,kind,grid,forms:forms.map(f=>f.map(prep))};WR.CH[c].P=WR.CH[c].forms[0];if(!WR.chars.includes(c))WR.chars.push(c)}
 // 家長報告：會寫的字（ㄅ～ㄘ、ㄙㄧㄨㄩ、ㄚㄛㄜㄝ、A～Z、a～k）
 const RCH=[...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝ',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',...'abcdefghijk'];
 const _rr=WR.reportRow;
 WR.reportRow=function(){try{const lv=WR.wLevel,rec=(WR.rec&&WR.rec())||{};const any=RCH.some(c=>lv(c)!=='no');const nOK=RCH.filter(c=>lv(c)==='ok').length;
  let tip='';{let best=null;for(const c of RCH){const r=rec[c];if(!r)continue;for(const [k,t] of [['rev',`<b>${c}</b> 常從另一頭開始寫，可以陪孩子先找星星起點。`],['ord',`<b>${c}</b> 的筆順還在練，可以一起看「再看一次」的示範。`],['off',`<b>${c}</b> 寫的時候可以慢慢沿著線走。`]]){if((r[k]||0)>=3&&(!best||r[k]>best[0]))best=[r[k],t]}}if(best)tip=best[1]}
  return `<div class="lrgh"><span>會寫的字</span><b>${nOK}<small>／${RCH.length}</small></b></div><div class="lrgrid lgz wrgrid">${RCH.map(c=>{const s=lv(c);return `<i class="lrc ${s==='try'?'try':s}${/[a-z]/.test(c)?' lo7':''}" title="${s==='ok'?'會寫':s==='try'?'需要陪寫':s==='mid'?'練習中':'還沒寫'}">${c}</i>`}).join('')}</div>
  <p class="lrnote">${any?'在兩個不同的日子都自己寫、拿到三顆星，才算「會寫」。虛線框的字最近需要陪寫。小寫寫在四線格，有的住中間、有的往上長、有的往下掉。':'第二十六章開始學寫字，寫過的字會出現在這裡。'}${tip?'<br>'+tip:''}</p>`}catch(e){try{return _rr.apply(this,arguments)}catch(_){return ''}}};
 W8.ready=true;return true}
if(!reg()){let n=0;const iv=setInterval(()=>{if(reg()||++n>40)clearInterval(iv)},250)}
// 自由練習「描描寫寫」：第八季學過的字也會出
if(typeof BUILD!=='undefined'&&BUILD.wfree){const _wf8=BUILD.wfree;BUILD.wfree=function(play,sp){try{const s8=window.__s8;if(s8&&s8.CH8&&W8.ready&&Math.random()<.35){const done=s8.CH8.filter(c=>S.chDone>=c||(S.ch===c-1&&(S.progs[c-1]||0)>=8));
   const L=[...new Set(done.map(c=>s8.D8[c].learn||'').join('').split(''))].filter(c=>WRD8[c]);if(L.length&&window.__WR&&typeof __WR.build==='function'){const t=pick(L);return __WR.build(play,sp,'write:'+t+':'+(S.diff==='easy'?2:3))}}}catch(e){console.log('wr free8',e)}return _wf8.apply(this,arguments)}}
}catch(e){console.log('write8',e)}
}).toString()+')()')})();

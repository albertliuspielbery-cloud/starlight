/* ================= 第七季寫字：ㄙ ㄧ ㄨ ㄩ、W X Y Z、小寫 a b c d（m7d_write7.js） =================
 * 2026-11-22 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 接在 m99x（第四季寫字）、write5、write6 後面：把新字的筆畫加進 __WR.CH／__WR.chars，三階段（① 描一描、② 虛線描、③ 自己寫）、判斷、提醒、紀錄全部沿用 m99x。
 *   關卡表直接用 'write:ㄙ:1'、'R:ㄙ|W:3'。c 跟大寫同形，'write:c:1' 自動改成 ②（可以跳過 ① 描一描）。
 * 座標：0～100。注音用田字格（tian）；英文用四線格（four：12 最上線、38 中間虛線、64 紅色基線、90 最下線）。
 *   大寫 12→64；小寫「三層樓」：a、c 住中間（38→64），b、d 往上長（12→64）。
 * ── 筆畫依據（逐字核對，notes 也在 NOTES7 裡，給報告和以後檢查用） ──
 *   注音：教育部《國語注音符號手冊》筆畫數 ㄙ2、ㄧ1、ㄨ2、ㄩ2；先後照字源楷書（厶、一、㐅、凵）。
 *     ㄙ（厶）：① 撇折 ㇜（中上往左下撇，到底轉向右上提）② 點 ㇔（右下）。
 *     ㄧ：直式寫成橫的「一」，① 橫，由左到右（brief：直式寫橫）。
 *     ㄨ（㐅）：① 撇 ㇒（右上→左下）② 捺 ㇏（左上→右下）。
 *     ㄩ（凵）：① 豎折 ㇄（左邊由上往下，到底轉向右）② 豎（右邊由上往下，接到底線）。
 *   英文大寫：台灣國小常見教法；兩種以上教法的都收（variants，任一種寫法都算對）。
 *     W：① 一筆寫完（左上↓↑↓↑）；也收兩筆（兩個 V）。
 *     X：① 左上→右下 ② 右上→左下；也收先寫右上那筆。
 *     Y：① 左上→中間 ② 右上→中間 ③ 中間→下；也收兩筆（② 右上→中間直接往下）。
 *     Z：一筆（橫→斜→橫）。
 *   英文小寫：台灣國小常見教法。
 *     a：① 先寫 c 形（右上起逆時針繞一圈）② 右邊直線由中線寫到基線；也收一筆寫完（繞一圈後直接往下）。
 *     b：① 直線由最上線寫到基線 ② 從直線中間往右繞出肚子（順時針）。一筆「往回描」的寫法判斷不穩，先不收（待 Albert 決定）。
 *     c：一筆，右上起逆時針到右下。
 *     d：① 先寫 c 形（逆時針繞一圈）② 右邊直線由最上線寫到基線。
 * 語音：「還記得怎麼寫ㄙ嗎？」「你會寫ㄙ了！」整句錄音（lines/s7_write.tsv），沒錄好以前只出字幕（m99x 原本就這樣）。
 */
/* 主程式在 (()=>{…})() 裡面，mods 接在它後面：用主程式留的 window.__ev（直接 eval）把這一段放進主程式的範圍執行，才看得到 CHAPTERS、S、BUILD… */
(function(){if(typeof window.__ev!=='function'){console.log('write7: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
try{
const L=(a,b,n=4)=>Array.from({length:n},(_,i)=>{const t=i/(n-1);return [+(a[0]+(b[0]-a[0])*t).toFixed(1),+(a[1]+(b[1]-a[1])*t).toFixed(1)]});
const PL=(...pts)=>{const o=[];for(let i=1;i<pts.length;i++){const s=L(pts[i-1],pts[i],Math.max(3,Math.round(Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1])/8)+1));o.push(...(i>1?s.slice(1):s))}return o};
// 橢圓弧：角度 0＝右、90＝下（螢幕座標）；a0→a1 遞減＝逆時針
const ARC=(cx,cy,rx,ry,a0,a1,step=12)=>{const n=Math.max(3,Math.ceil(Math.abs(a1-a0)/step)+1);return Array.from({length:n},(_,i)=>{const a=(a0+(a1-a0)*i/(n-1))*Math.PI/180;return [+(cx+rx*Math.cos(a)).toFixed(1),+(cy+ry*Math.sin(a)).toFixed(1)]})};
const cat=(...ps)=>{const o=[];ps.forEach(p=>{if(o.length&&p.length&&Math.hypot(o[o.length-1][0]-p[0][0],o[o.length-1][1]-p[0][1])<.5)o.push(...p.slice(1));else o.push(...p)});return o};
const bowl=(x0)=>ARC(49,51,14.5,13,-28,-332);          // a、d 的 c 形（右上起逆時針，停在右下）
const WRD7={
 'ㄙ':['zy','tian',[[PL([52,16],[27,68],[76,62]),L([62,46],[74,59],4)]]],
 'ㄧ':['zy','tian',[[L([20,50],[80,50],5)]]],
 'ㄨ':['zy','tian',[[L([72,18],[26,82],6),L([30,22],[76,82],6)]]],
 'ㄩ':['zy','tian',[[PL([28,22],[28,78],[72,78]),L([72,22],[72,78],5)]]],
 'W':['en','four',[[PL([22,12],[36,64],[50,12],[64,64],[78,12])],[PL([22,12],[36,64],[50,12]),PL([50,12],[64,64],[78,12])]]],
 'X':['en','four',[[L([28,12],[72,64],5),L([72,12],[28,64],5)],[L([72,12],[28,64],5),L([28,12],[72,64],5)]]],
 'Y':['en','four',[[L([28,12],[50,38],4),L([72,12],[50,38],4),L([50,38],[50,64],4)],[L([28,12],[50,38],4),PL([72,12],[50,38],[50,64])]]],
 'Z':['en','four',[[PL([28,12],[72,12],[28,64],[72,64])]]],
 'a':['en','four',[[bowl(),L([63.5,38],[63.5,64],4)],[cat(ARC(49,51,14.5,13,-20,-372),L([63.5,44],[63.5,64],4))]]],
 'b':['en','four',[[L([35,12],[35,64],6),ARC(49,51,14,13,-175,175)]]],
 'c':['en','four',[[ARC(50,51,15,13,-35,-325)]]],
 'd':['en','four',[[bowl(),L([63.5,12],[63.5,64],6)]]]};
const SKIP1=['c','o','s','u','v','w','x','z'];   // 跟大寫同形：可以跳過 ① 描一描
const NOTES7={'ㄙ':'教育部《國語注音符號手冊》2 畫：撇折、點（字源厶）','ㄧ':'1 畫：直式寫成橫','ㄨ':'2 畫：撇、捺（字源㐅）','ㄩ':'2 畫：豎折、豎（字源凵）',
 W:'一筆；也收兩筆',X:'左上→右下、右上→左下；兩種先後都算對',Y:'三筆；也收兩筆',Z:'一筆',a:'c 形＋直線；也收一筆',b:'直線＋肚子（兩筆）',c:'一筆，可跳過①',d:'c 形＋長直線'};
const W7=window.__WR7={ready:false,ver:'2026-11-22',chars:Object.keys(WRD7),data:WRD7,notes:NOTES7,skip1:SKIP1};
function reg(){const WR=window.__WR;if(!WR||!WR.CH||!WR.chars)return false;
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 const plen=p=>{let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s};
 function resample(p,step){if(p.length<2)return p.slice();const out=[p[0]];let acc=0;for(let i=1;i<p.length;i++){let a=p[i-1],b=p[i],d=dist(a,b);while(acc+d>=step){const r=(step-acc)/d;a=[a[0]+(b[0]-a[0])*r,a[1]+(b[1]-a[1])*r];out.push(a);d=dist(a,b);acc=0}acc+=d}const l=p[p.length-1];if(dist(out[out.length-1],l)>.01)out.push(l);return out}
 function prep(points){const d=resample(points,1);const Ln=plen(points);let acc=0;const t=d.map((q,i)=>{if(i)acc+=dist(d[i-1],q);return Ln?acc/Ln:0});return {points,start:points[0],end:points[points.length-1],dense:d,tt:t,len:Ln,cov:resample(points,2)}}
 for(const c in WRD7){const [kind,grid,forms]=WRD7[c];if(WR.CH[c])continue;
  WR.CH[c]={char:c,kind,grid,forms:forms.map(f=>f.map(prep))};WR.CH[c].P=WR.CH[c].forms[0];if(!WR.chars.includes(c))WR.chars.push(c)}
 // 家長報告：會寫的字（ㄅ～ㄘ、ㄙㄧㄨㄩ、A～Z、a～d）
 const RCH=[...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩ',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',...'abcd'];
 const _rr=WR.reportRow;
 WR.reportRow=function(){try{const lv=WR.wLevel,rec=(WR.rec&&WR.rec())||{};const any=RCH.some(c=>lv(c)!=='no');const nOK=RCH.filter(c=>lv(c)==='ok').length;
  let tip='';{let best=null;for(const c of RCH){const r=rec[c];if(!r)continue;for(const [k,t] of [['rev',`<b>${c}</b> 常從另一頭開始寫，可以陪孩子先找星星起點。`],['ord',`<b>${c}</b> 的筆順還在練，可以一起看「再看一次」的示範。`],['off',`<b>${c}</b> 寫的時候可以慢慢沿著線走。`]]){if((r[k]||0)>=3&&(!best||r[k]>best[0]))best=[r[k],t]}}if(best)tip=best[1]}
  return `<div class="lrgh"><span>會寫的字</span><b>${nOK}<small>／${RCH.length}</small></b></div><div class="lrgrid lgz wrgrid">${RCH.map(c=>{const s=lv(c);return `<i class="lrc ${s==='try'?'try':s}${/[a-z]/.test(c)?' lo7':''}" title="${s==='ok'?'會寫':s==='try'?'需要陪寫':s==='mid'?'練習中':'還沒寫'}">${c}</i>`}).join('')}</div>
  <p class="lrnote">${any?'在兩個不同的日子都自己寫、拿到三顆星，才算「會寫」。虛線框的字最近需要陪寫。小寫寫在四線格，a、c 住中間，b、d 往上長。':'第二十六章開始學寫字，寫過的字會出現在這裡。'}${tip?'<br>'+tip:''}</p>`}catch(e){try{return _rr.apply(this,arguments)}catch(_){return ''}}};
 W7.ready=true;return true}
if(!reg()){let n=0;const iv=setInterval(()=>{if(reg()||++n>40)clearInterval(iv)},250)}
// 跟大寫同形的小寫：① 描一描 換成 ② 虛線描
if(typeof BUILD!=='undefined'){const _w7=BUILD.write;BUILD.write=function(play,sp,arg){try{const f=String(S.qs&&S.qs[S.q]||'');const p=f.split(':');
  if(p[0]==='write'&&SKIP1.includes(p[1])&&p[2]==='1'&&WRD7[p[1]]){p[2]='2';S.qs[S.q]=p.join(':')}}catch(e){}return _w7.apply(this,arguments)}}
// 自由練習「描描寫寫」：第七季學過的字也會出
if(typeof BUILD!=='undefined'&&BUILD.wfree){const _wf7=BUILD.wfree;BUILD.wfree=function(play,sp){try{const s7=window.__s7;if(s7&&W7.ready&&Math.random()<.4){const done=s7.CH7.filter(c=>S.chDone>=c||(S.ch===c-1&&(S.progs[c-1]||0)>=8));
   const L=[...new Set(done.map(c=>s7.D7[c].learn||'').join('').split(''))].filter(c=>WRD7[c]);if(L.length&&window.__WR&&typeof __WR.build==='function'){const t=pick(L);return __WR.build(play,sp,'write:'+t+':'+(S.diff==='easy'?2:3))}}}catch(e){console.log('wr free7',e)}return _wf7.apply(this,arguments)}}
}catch(e){console.log('write7',e)}
}).toString()+')()')})();

/* ================= 第七季：積木量身高的朋友改成全身（m7f_measure7.js）—— 2026-11-24 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 題目 measure:s7blk（m7e_newq7.js 的 bBlk）：原本朋友只畫頭（animal()），圖的高度也跟旁邊的積木柱對不上（狗頭約 1.5 格旁邊放 3 格）。
 * 改成：
 *  - 全身站著的朋友（遊戲共用的 fullBody，跟第七季兔兔護理師、黑熊保育員同一套身體；企鵝本來就是全身）。姿勢都是「站直直」（pose down，手放下，不舉高）。
 *  - 朋友的身高（腳底到最高的地方：兔子、小貓算到耳朵尖，小鴨算到頭上的毛）剛好等於答案的積木數：
 *    每隻朋友量好「頭頂」和「腳底」在圖裡的位置（BOX），viewBox 只框這一段，圖的高度＝積木一格（--u）× 答案（--h）。
 *  - 腳底和積木柱底在同一條地面線（跟積木柱一樣的底線）。
 *  - 頭頂畫一條淡淡的虛線，一路接到積木柱，看得出「疊到跟頭頂一樣高」（window.__S7MEASURE_LINE=false 可以拿掉）。
 * 不改 m7e：題目做好以後（同一個 BUILD.measure），把 .b7an 裡的頭換成全身圖。沒有任何放大縮小的動畫。
 * 開關：window.__S7MEASURE_LIVE（預設開；Albert 不同意時設 false，就回到原本只有頭的圖）。 */
(function(){if(typeof window.__ev!=='function'){console.log('measure7: 找不到 __ev');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined'||typeof BUILD.measure!=='function')return;
if(window.__S7MEASURE_LIVE===undefined)window.__S7MEASURE_LIVE=true;
if(window.__S7MEASURE_LINE===undefined)window.__S7MEASURE_LINE=true;
// 每隻朋友在 100×100 圖裡的範圍：[左, 頭頂, 右, 腳底]（站直直的姿勢；影子不算）
const BOX={bunny:[28,0,72,96.4],kitten:[24.7,-2,84,96.4],duck:[23,-2.3,77,96.4],hedgehog:[19,11.3,81,96.4],dog:[26,14,74.3,96.4],penguin:[14.3,12.7,85.7,92.7]};
const G=window;
function figSVG(k){let s='';
 try{if(k!=='penguin'&&typeof G.fullBody==='function'&&G.fullBodyHas&&G.fullBodyHas(k))s=G.fullBody(k,{pose:'down',prop:''});else if(k==='penguin')s=animal(k)}catch(e){s=''}
 const b=BOX[k];if(!s||!b||!/^<svg[\s>]/.test(s))return null;
 const vb=[b[0]-1,b[1],b[2]-b[0]+2,b[3]-b[1]];
 s=s.replace(/^<svg[^>]*>/,`<svg viewBox="${vb.map(v=>+v.toFixed(2)).join(' ')}" preserveAspectRatio="xMidYMax meet" overflow="visible" aria-hidden="true" class="m7fsvg" data-m7f="${k}">`);
 return {s,r:vb[2]/vb[3]}}
G.__m7fig=figSVG;   // 預覽圖用
function fix(play){if(!G.__S7MEASURE_LIVE||!play)return;const wrap=play.querySelector('.b7wrap');if(!wrap)return;let n=0;
 wrap.querySelectorAll('.b7fig').forEach(f=>{const an=f.querySelector('.b7an');const old=an&&an.querySelector('svg[data-an]');const k=old&&old.getAttribute('data-an');if(!k||!BOX[k])return;
  const r=figSVG(k);if(!r)return;an.innerHTML=r.s;an.classList.add('m7fan');an.style.setProperty('--r',r.r.toFixed(4));
  // 地面線跟積木柱的底線一樣（粗細、顏色照積木柱），中間的空隙也接起來
  try{const st=f.querySelector('.b7stack');if(st){const cs=getComputedStyle(st);if(parseFloat(cs.borderBottomWidth)>0)an.style.borderBottom=`${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`}
   const gap=parseFloat(getComputedStyle(f).columnGap)||0;if(gap>0)an.style.setProperty('--m7gap',gap+'px')}catch(e){}
  n++});
 if(n){wrap.classList.add('m7f');wrap.classList.toggle('m7fline',!!G.__S7MEASURE_LINE)}}
const _m=BUILD.measure;
BUILD.measure=function(play){const r=_m.apply(this,arguments);try{fix(play&&play.querySelector?play:document.querySelector('.stage .play'))}catch(e){console.log('measure7',e)}return r};
const st=document.createElement('style');st.textContent=`
.b7wrap.m7f .b7an.m7fan{flex:0 0 auto;box-sizing:content-box;height:calc(var(--u)*var(--h));width:calc(var(--u)*var(--h)*var(--r,.6));border-bottom:3px solid #8A6A3A;margin-left:calc(-1*var(--m7gap,0px));padding:0 0 0 var(--m7gap,0px)}
.b7wrap.m7f .b7an.m7fan svg{width:100%;height:100%;display:block;overflow:visible}
.b7wrap.m7fline .b7fig::before{content:'';position:absolute;left:-6px;right:-6px;top:0;border-top:2px dashed rgba(122,90,170,.55);pointer-events:none;z-index:1}`;
document.head.appendChild(st);
}catch(e){console.log('measure7 fail',e)}
}).toString()+')()')})();

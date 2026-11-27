/* ================= 2.1（遊戲 5.5.0）破關節奏與介面整理（m9za_v21.js）—— 2026-11-27 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 依 qa/uxaudit 的檢查與交叉審查（第一批）。配合 patches/92_v21_flow.py。不用新美術、不用新錄音。
 * 1. 過關卡：1.7 秒後出現下一步箭頭（.ld21nx），點畫面任何地方就出獎勵（邏輯在 patch92）。
 * 3. 關卡開場卡：點卡片任何地方就開始；開場那句念完（停 0.8 秒，至少 1.5 秒）也自動開始。沒開聲音時 3.5 秒後自動開始。
 *    上面有別的視窗、正在換畫面、正在長按地圖／房子鍵、App 剛從背景回來 1.5 秒內，都先不自動開始。
 * 4. 答對後的「下一題」提示改成大的金色箭頭圓鈕（顯示時間在 patch92）；點畫面任何地方都可以（原本就這樣）。
 * 6. 遊樂園：章節進度條和地圖鍵只在闖關相關畫面出現（以後新增的遊樂園遊戲不用再各寫一次）；
 *    遊樂園裡面的小遊戲、故事屋、房間等不放房子鍵（只留「回遊樂園」），遊樂園大門照舊有房子。
 * 7. 星星小考：「等一下再答」放大；點卡片外面的暗處等於「等一下再答」——只限「夾一題」；每天 3 題那張要按按鈕（剛回到遊樂園 1.7 秒內也不算）；出現的時機在 patch92。
 * 動畫只用淡入、移動、亮光，不用 scale。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
/* ---------- 3. 開場卡 ---------- */
let tk=0,visT=-1e9;document.addEventListener('visibilitychange',()=>{if(!document.hidden)visT=performance.now()});
const introOf=()=>{const ov=document.querySelector('.stage > .overlay');if(!ov)return null;const bs=[...ov.querySelectorAll('.card > button.btn')];const b=bs[bs.length-1];
 return b&&/開始/.test(b.textContent||'')?{ov,b}:null};
function armIntro(sayP){const tok=++tk;const f=introOf();if(!f)return;const t0=performance.now();
 f.ov.classList.add('in21');
 f.ov.addEventListener('click',e=>{try{if(e.target.closest('button,a,input,select'))return;const g=introOf();if(g&&g.ov===f.ov)g.b.click()}catch(_){}});
 const go21=()=>{if(tok!==tk||S.screen!=='stage')return;const g=introOf();if(!g||g.ov!==f.ov)return;
  const r=g.b.getBoundingClientRect(),top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
  if(document.hidden||going||performance.now()-visT<1500||(top&&!g.ov.contains(top))||document.querySelector('#rv181,.gztour,body>.overlay,#screen>.overlay,.s8dlg,.coach,.updpop,#bar .holding')){setTimeout(go21,600);return}g.b.click()};
 Promise.all([Promise.resolve(sayP).catch(()=>{}),new Promise(r=>setTimeout(r,S.sound?1500:3500))]).then(()=>setTimeout(go21,S.sound?800:0))}
{const _st=SCREENS.stage;SCREENS.stage=function(){let lastP=null;const _s=say;say=function(){const p=_s.apply(this,arguments);lastP=p;return p};
  let r;try{r=_st.apply(this,arguments)}finally{say=_s}
  try{armIntro(lastP)}catch(e){console.log('v21 intro',e)}return r}}

/* ---------- 6. 遊樂園上方列 ---------- */
const CHAP=['stage','map','world','chend','story','story19','finale','chapters','title','guide','wardrobe','rest','limit'];let parkT=0,scr0='';
{const _rb=renderBar;renderBar=function(){const r=_rb.apply(this,arguments);try{
  const park=!CHAP.includes(S.screen);if(S.screen==='park'&&scr0!=='park')parkT=performance.now();scr0=S.screen;
  document.body.classList.toggle('bar21park',park);
  document.body.classList.toggle('bar21nohome',park&&S.screen!=='park')}catch(e){}return r}}

/* ---------- 7. 星星小考：點暗處＝等一下再答 ---------- */
document.addEventListener('click',e=>{try{const t=e.target;if(t&&t.id==='rv181'){if(performance.now()-parkT<1700||t.dataset.mode==='daily')return;const l=t.querySelector('.rvlater');if(l&&l.getClientRects().length)l.click()}}catch(_){}},true);

/* ---------- 樣式 ---------- */
const st=document.createElement('style');st.textContent=`
body.bar21park #bar #prog{visibility:hidden}
body.bar21park #bar #btnMap{display:none}
body.bar21nohome #bar #btnHome{display:none}
.stage > .overlay.in21 .card{cursor:pointer}
.ld21nx{position:absolute;right:14px;bottom:14px;width:60px;height:60px;border-radius:50%;background:linear-gradient(180deg,#FFF0B8,#FFC24D);box-shadow:0 4px 0 #B97A1A,0 6px 14px rgba(0,0,0,.3);pointer-events:none;animation:ld21in .3s ease both,ld21nudge 1.1s ease-in-out .3s infinite}
.ld21nx::before{content:'';position:absolute;left:24px;top:18px;border-left:18px solid #4A2A7A;border-top:12px solid transparent;border-bottom:12px solid transparent}
@keyframes ld21in{from{opacity:0;transform:translateX(-10px)}}
@keyframes ld21nudge{50%{transform:translateX(6px)}}
.nexthint{font-size:0!important;width:84px;height:84px;padding:0!important;border-radius:50%!important;background:linear-gradient(180deg,#FFF0B8,#FFC24D)!important;box-shadow:0 5px 0 #B97A1A,0 8px 18px rgba(0,0,0,.35)!important;animation:nh21in .25s ease both,nh21nudge 1.1s ease-in-out .25s infinite!important}
.nexthint::before{content:'';position:absolute;left:33px;top:24px;border-left:26px solid #4A2A7A;border-top:18px solid transparent;border-bottom:18px solid transparent}
@keyframes nh21in{from{opacity:0;transform:translateX(calc(-50% - 12px))}}
@keyframes nh21nudge{0%,100%{transform:translateX(-50%)}50%{transform:translateX(calc(-50% + 8px))}}
#rv181 .rvlater{min-height:60px!important;padding:0 28px!important;font-size:19px!important}
.ld21card{position:relative}
@media (orientation:portrait) and (max-width:600px){.nexthint{left:14px!important;transform:none;width:72px;height:72px;animation:nh21inL .25s ease both,nh21nudgeL 1.1s ease-in-out .25s infinite!important}
 .nexthint::before{left:28px;top:20px;border-left-width:22px;border-top-width:16px;border-bottom-width:16px}}
@media (max-height:500px){.nexthint{width:64px;height:64px;bottom:8px!important}.nexthint::before{left:25px;top:18px;border-left-width:20px;border-top-width:14px;border-bottom-width:14px}}
@keyframes nh21inL{from{opacity:0;transform:translateX(-12px)}to{transform:none}}
@keyframes nh21nudgeL{0%,100%{transform:none}50%{transform:translateX(8px)}}
@media (prefers-reduced-motion:reduce){.ld21nx,.nexthint{animation:none!important}}
body.lite .ld21nx,body.lite .nexthint{animation:none!important}
`;document.head.appendChild(st);
}catch(e){console.log('m9za_v21',e)}}).toString()+')()')})();

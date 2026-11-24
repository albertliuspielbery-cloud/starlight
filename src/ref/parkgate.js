
/* ================= m99zx4（5.2.0）遊樂園大門：四區＋繼續玩＋第一次導覽；小遊戲每日寶石上限 —— 星光工作室 2026-11-12（著作權屬星光工作室） =================
 * 規格：doc/ch31_100_outline.md 第五節（二）2～5、（四）1；第七節第 18、19 項（家長已決定照建議）。
 * 做法（不改各遊戲、不改前面的模組）：
 *  1. SCREENS.park 照原本把全部卡片排進 .pgrid（鎖頭、寶石、點一下先念、第四季自己判斷鎖不鎖，全部照舊），
 *     這裡最後再包一層：每張卡標上所屬的區（data-gz）。
 *     - 大門：.pgrid 藏起來，換成「繼續玩」一條＋四個大區（手機直放 2×2、橫放和 iPad 橫放一排 4 個，不用捲）。
 *     - 進到某一區：只顯示那一區的卡片（就是原本的卡片），標題換成區名、返回鍵換成「回遊樂園大門」，顏色跟著區走。
 *     - 練習區只有自由練習：沒鎖就直接進去；還沒打開時顯示那一區（鎖住的卡會說完成第幾章）。
 *     - 從某個項目回來（不管是從大門、繼續玩，還是自由練習、故事屋、章末連結直接跳進去的），回到那個項目所屬的區；
 *       從首頁、地圖等別的地方來就到大門。自由練習回來到大門。
 *     - 「繼續玩」：最近玩過的 1 個＋還沒玩過的最新小遊戲 1 個（星星「新」徽章）。點它就是點原本那張卡（先念、再點一下進去、鎖住說原因都一樣）。
 *  2. 第一次進新大門：主角帶著看一遍（每區亮一下、念一句），可以跳過，只出現一次（V2.gateTour）。
 *  3. 小遊戲每日寶石上限：每天前 GEMRULE.fullGames 個小遊戲第一次玩照原本 3 顆，之後別的小遊戲第一次玩也只給 1 顆。
 *     做法是進遊戲時，若今天的名額用完了，就把那個遊戲的「今天玩過」先記上（各遊戲本來第二次玩就是 1 顆），
 *     所以畫面上寫的顆數和真的拿到的一樣；不會扣寶石、不會讓已經有的寶石變少。家長專區可關（V2.gemCap，預設開）。
 *     以裝置日期換日（跟各遊戲的 today() 一樣）。
 *  4. 之後的季要加卡片或小遊戲：在這個檔案之前設 window.__gateExt={zones:{卡片key:'games'},gemDay:{畫面key:'V2的日期欄位'},newest:['key']}，
 *     或直接改下面的 ZOF／GAMEDAY／NEWEST。沒有寫的卡片先放「小遊戲」。
 * 語音只念錄好的真人錄音（沒錄好就只出字幕）；台詞表在 s52/lines_park52.tsv（由 s52/mk_lines52.py 從下面的 LINES52 產生）。 */
(function(){try{
/* ---------- 寶石規則（要調就改這裡） ---------- */
const GEMRULE={fullGames:3}; // 每天前 3 個小遊戲：第一次玩 3 顆（各遊戲原本的規則）；第 4 個起第一次玩也是 1 顆
// 小遊戲畫面 → 各遊戲記「今天玩過」的 V2 欄位（農場是每天照顧、英文動一動是 1～2 顆，不算在上限裡）
const GAMEDAY={dance:'danceDay',idolstage:'idolDay',cashier:'cashDay',floatsink:'fsDay',recyclesort:'rcDay',postgame:'ppDay',rocket26:'r26Day',fossil26:'f26Day'};
/* ---------- 分區 ---------- */
const ZONES=[
 {id:'story',n:'故事和創作',c1:'#FF9BCB',c2:'#C8458F',line:'z_story',tour:'t_story'},
 {id:'games',n:'小遊戲',c1:'#7CC8FF',c2:'#2F68CF',line:'z_games',tour:'t_games'},
 {id:'home',n:'我的家',c1:'#FFDA6E',c2:'#D8941C',line:'z_home',tour:'t_home'},
 {id:'practice',n:'練習區',c1:'#86E3A6',c2:'#2C9A5E',line:'z_practice',tour:'t_practice'}];
const ZOF={storyhouse:'story',coloring:'story',album:'story',r99stage:'story',
 dance:'games',idolstage:'games',eact:'games',cashier:'games',rocket26:'games',floatsink:'games',fossil26:'games',recyclesort:'games',postgame:'games',
 room:'home',pethouse:'home',farm:'home',dex:'home',
 practice:'practice'};
// 區裡卡片的順序（沒列到的排後面，照原本的順序）
const ORDER=['storyhouse','coloring','album','r99stage','dance','idolstage','eact','cashier','rocket26','floatsink','fossil26','recyclesort','postgame','room','pethouse','farm','dex','practice'];
// 「繼續玩」的「新」：從最新的小遊戲往前找第一個打開了、還沒玩過的
const NEWEST=['fossil26','rocket26','postgame','recyclesort','floatsink','cashier','eact','r99stage','idolstage','dance'];
/*LINES52*/
const L={
"z_story":"故事和創作！",
"z_games":"小遊戲！",
"z_home":"我的家！",
"z_practice":"練習區！",
"t_hi":"遊樂園有新的大門喔，我帶你看一看！",
"t_story":"這裡是故事和創作，可以聽故事、塗顏色、編舞蹈！",
"t_games":"這裡是小遊戲，好玩的遊戲都在這裡！",
"t_home":"這裡是我的家，有房間、寵物和小農場！",
"t_practice":"這裡是練習區，想練什麼就練什麼！",
"t_cont":"上面這一條是繼續玩，剛剛玩過的會在這裡！",
"t_end":"想玩哪裡，就點一下吧！"
};
/*END*/
const EXT=()=>{try{return window.__gateExt||{}}catch(e){return {}}};
const zoneOf=k=>{const x=EXT().zones;if(x&&x[k])return x[k];return ZOF[k]||null};
const gameDay=()=>Object.assign({},GAMEDAY,EXT().gemDay||{});
const zById=id=>ZONES.find(z=>z.id===id);
/* ---------- 語音：只念有錄音的 ---------- */
const ht=t=>{try{return typeof heroT==='function'?heroT(t):t}catch(e){return t}};
const has=t=>{try{if(!t)return false;if(!S.vo)return true;if(typeof VO==='undefined'||!VO.idx)return false;const u=ht(t).replace(/⁠/g,'');return voHas('z|'+u)||voHas('z|'+voCk(u))}catch(e){return false}};
function sayR(keys){const a=(Array.isArray(keys)?keys:[keys]).map(k=>L[k]||k).filter(has);if(!a.length)return Promise.resolve(false);
 try{return Promise.resolve(say(a)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
const sv=()=>{try{save2()}catch(e){}};
/* ---------- 圖：四棟建築（書屋、摩天輪、小房子、鉛筆塔）—— 新美術，待家長確認 ---------- */
const IC={
story:`<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="110" rx="46" ry="6" fill="rgba(0,0,0,.18)"/>
<path d="M18 52 Q38 40 60 50 Q82 40 102 52 L102 104 L18 104Z" fill="#FFF3E2"/>
<path d="M14 54 Q36 36 60 46 Q84 36 106 54 L106 60 Q84 44 60 54 Q36 44 14 60Z" fill="#E8508F"/>
<path d="M60 46 V104" stroke="#E8B0C8" stroke-width="2"/>
<rect x="26" y="60" width="22" height="16" rx="3" fill="#8FD4FF" stroke="#C8458F" stroke-width="2"/><path d="M37 60 V76 M26 68 H48" stroke="#C8458F" stroke-width="1.6"/>
<path d="M72 64 h22 M72 70 h18 M72 76 h20" stroke="#E8A0C0" stroke-width="2.4" stroke-linecap="round"/>
<path d="M50 104 V86 Q60 76 70 86 V104Z" fill="#B0507F"/><circle cx="66" cy="95" r="1.8" fill="#FFE08A"/>
<g transform="rotate(32 92 30)"><rect x="88" y="8" width="8" height="34" rx="3" fill="#FFC94A" stroke="#C88A1E" stroke-width="1.4"/><rect x="88" y="38" width="8" height="6" fill="#B8C0D6"/><path d="M88 44 H96 L95 54 Q92 58 89 54Z" fill="#FF6FA8"/></g>
<path d="M30 30 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3Z" fill="#FFF07A"/></svg>`,
games:`<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="110" rx="44" ry="6" fill="rgba(0,0,0,.18)"/>
<path d="M60 56 L34 106 M60 56 L86 106" stroke="#E8ECF8" stroke-width="6" stroke-linecap="round"/><path d="M26 106 H94" stroke="#B9C2E0" stroke-width="5" stroke-linecap="round"/>
<circle cx="60" cy="56" r="40" fill="none" stroke="#FFFFFF" stroke-width="5"/><circle cx="60" cy="56" r="30" fill="none" stroke="#BFE6FF" stroke-width="2"/>
<g stroke="#E8F3FF" stroke-width="2.4"><path d="M60 16 V96 M20 56 H100 M31.7 27.7 L88.3 84.3 M88.3 27.7 L31.7 84.3"/></g>
<circle cx="60" cy="56" r="7" fill="#FFD84A" stroke="#fff" stroke-width="2"/>
<g><rect x="52" y="8" width="16" height="13" rx="4" fill="#FF6F91"/><rect x="87" y="35" width="16" height="13" rx="4" fill="#FFC94A"/><rect x="87" y="64" width="16" height="13" rx="4" fill="#7BE0A0"/><rect x="52" y="90" width="16" height="13" rx="4" fill="#B48CFF"/><rect x="17" y="64" width="16" height="13" rx="4" fill="#FF9B5A"/><rect x="17" y="35" width="16" height="13" rx="4" fill="#5AD0FF"/>
<rect x="76" y="14" width="15" height="12" rx="4" fill="#FFE27A"/><rect x="29" y="14" width="15" height="12" rx="4" fill="#9FE8FF"/><rect x="76" y="86" width="15" height="12" rx="4" fill="#FF8FC4"/><rect x="29" y="86" width="15" height="12" rx="4" fill="#A6F0B8"/></g></svg>`,
home:`<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="110" rx="46" ry="6" fill="rgba(0,0,0,.18)"/>
<rect x="78" y="20" width="12" height="24" rx="2" fill="#C8643C"/>
<rect x="24" y="54" width="72" height="52" rx="4" fill="#FFF0C8"/>
<path d="M14 58 L60 18 L106 58 Z" fill="#F0644E" stroke="#C8463A" stroke-width="3" stroke-linejoin="round"/>
<circle cx="60" cy="42" r="7" fill="#FFE27A" stroke="#C8463A" stroke-width="2"/>
<path d="M50 106 V80 Q60 70 70 80 V106Z" fill="#B06A3C"/><circle cx="66" cy="92" r="1.8" fill="#FFE08A"/>
<rect x="30" y="66" width="16" height="16" rx="3" fill="#8FD4FF" stroke="#D8941C" stroke-width="2"/><path d="M38 66 V82 M30 74 H46" stroke="#D8941C" stroke-width="1.6"/>
<rect x="74" y="66" width="16" height="16" rx="3" fill="#8FD4FF" stroke="#D8941C" stroke-width="2"/><path d="M82 66 V82 M74 74 H90" stroke="#D8941C" stroke-width="1.6"/>
<path d="M96 96 q4 -10 10 -2 q-2 6 -10 10Z" fill="#6FCB7A"/><path d="M24 96 q-4 -10 -10 -2 q2 6 10 10Z" fill="#6FCB7A"/>
<path d="M60 96 m-5 -3 a3 3 0 0 1 5 -2 a3 3 0 0 1 5 2 q0 3 -5 6 q-5 -3 -5 -6Z" fill="#FF7FA8" transform="translate(0 -30) scale(1)"/></svg>`,
practice:`<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="110" rx="40" ry="6" fill="rgba(0,0,0,.18)"/>
<rect x="40" y="40" width="40" height="66" rx="4" fill="#FFC94A" stroke="#C88A1E" stroke-width="2"/>
<path d="M53 40 V106 M67 40 V106" stroke="#E6A92A" stroke-width="2"/>
<path d="M40 40 L60 10 L80 40Z" fill="#FFE4BC" stroke="#C88A1E" stroke-width="2" stroke-linejoin="round"/><path d="M53.5 20 L60 10 L66.5 20Z" fill="#4A4A6A"/>
<rect x="40" y="96" width="40" height="10" fill="#FF8FA8"/>
<rect x="50" y="52" width="20" height="16" rx="8" fill="#8FD4FF" stroke="#C88A1E" stroke-width="2"/>
<path d="M52 106 V86 Q60 78 68 86 V106Z" fill="#2C9A5E"/>
<path d="M98 26 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3Z" fill="#FFF07A"/><path d="M18 50 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2Z" fill="#FFF07A"/>
<path d="M14 100 q6 -12 14 -4 M106 100 q-6 -12 -14 -4" stroke="#6FCB7A" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`};
const PLAY=`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#FFE27A"/><path d="M9.5 7.5 L17 12 L9.5 16.5Z" fill="#5A3E9A"/></svg>`;
const STAR=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 l3 6.6 7.2 .8 -5.4 4.9 1.5 7.1 L12 17.8 5.7 21.4 7.2 14.3 1.8 9.4 9 8.6Z" fill="#FFD84A" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
/* ---------- 樣式 ---------- */
const css=`
#screen>.park.gzon.gzgate{display:flex;flex-direction:column}
#screen>.park.gzon.gzgate>.phead{flex:0 0 auto}
#screen>.park.gzgate>.pgrid,#screen>.park.gzgate>.pcost{display:none!important}
#screen>.park.gzon:not(.gzgate)>.gz{display:none}
#screen>.park.gzon[data-gz]:not([data-gz="story"])>.pcost{display:none}
#screen>.park.gzon>.pgrid .pcard.gzoff{display:none!important}
.gz{flex:1 1 0;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.6vh,14px);padding:2px 2px 0;box-sizing:border-box}
.gzc{flex:0 0 auto;display:flex;align-items:center;gap:8px;min-height:0;padding:6px 8px;border-radius:20px;background:rgba(255,255,255,.08);border:2px dashed rgba(255,226,122,.55)}
.gzc[hidden]{display:none}
.gzcl{flex:0 0 auto;display:flex;align-items:center;gap:4px;color:#FFE27A;font-size:15px;white-space:nowrap}.gzcl i{display:block;width:26px;height:26px}.gzcl i svg{width:100%;height:100%}
.gzci{position:relative;flex:0 1 300px;min-width:0;display:flex;align-items:center;gap:6px;height:52px;padding:2px 8px 2px 4px;border-radius:16px;border:2px solid var(--gold,#E8C873);background:linear-gradient(160deg,rgba(90,70,180,.9),rgba(38,32,94,.94));color:inherit;font:inherit;cursor:pointer;text-align:left}
.gzci .pic{flex:0 0 auto;width:44px;height:44px;display:grid;place-items:center}.gzci .pic svg{width:100%;height:100%}
.gzci b{font-weight:400;font-size:16px;line-height:1.15;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.gzci.sel{outline:4px solid #FFE27A;box-shadow:0 0 18px rgba(255,226,122,.7)}
.gzci.lockd{opacity:.7}
.gzci .gznew{position:absolute;right:-6px;top:-10px;width:30px;height:30px;animation:gznew 1.4s ease-in-out infinite}.gzci .gznew svg{width:100%;height:100%}
@keyframes gznew{50%{transform:scale(1.15) rotate(10deg)}}
.gzg{flex:1 1 0;min-height:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:clamp(10px,2vmin,18px)}
.gzt{position:relative;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:10px 6px 10px;border-radius:26px;border:3px solid rgba(255,255,255,.75);
 background:radial-gradient(120% 90% at 50% 18%,rgba(255,255,255,.42),rgba(255,255,255,0) 60%),linear-gradient(170deg,var(--c1),var(--c2));color:#fff;font:inherit;cursor:pointer;
 box-shadow:0 6px 0 rgba(0,0,0,.25),inset 0 -6px 0 rgba(0,0,0,.12);animation:pop .45s cubic-bezier(.3,1.6,.5,1) backwards var(--dl,0s);overflow:hidden}
.gzt .gzi{position:relative;flex:1 1 0;min-height:0;width:100%}
.gzt .gzi svg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 3px 0 rgba(0,0,0,.15))}
.gzt b{flex:0 0 auto;font-weight:400;font-size:clamp(19px,min(5vw,4.2vh),32px);line-height:1.2;text-shadow:0 2px 0 rgba(0,0,0,.28);white-space:nowrap}
.gzt:active{transform:translateY(3px);box-shadow:0 3px 0 rgba(0,0,0,.25)}
@media (min-aspect-ratio:5/4){.gzg{grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:minmax(0,1fr)}}
@media (max-height:460px){.gzci{height:44px}.gzci .pic{width:36px;height:36px}.gzc{padding:3px 8px}.gzt{padding:6px 4px;border-radius:20px}}
/* 區裡：標題列、返回鍵是那一區的顏色 */
#screen>.park.gzon[data-gz]>.phead #pback{background:linear-gradient(170deg,var(--gzc1),var(--gzc2));border-color:rgba(255,255,255,.8);color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.3)}
#screen>.park.gzon[data-gz]>.phead .gtitle{display:inline-flex;align-items:center;gap:6px;padding:2px 14px 2px 6px;border-radius:999px;background:linear-gradient(170deg,var(--gzc1),var(--gzc2));color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.3)}
#screen>.park.gzon[data-gz]>.phead .gtitle .gzti{display:inline-block;width:34px;height:34px}#screen>.park.gzon[data-gz]>.phead .gtitle .gzti svg{width:100%;height:100%}
/* 5.1.1 固定標題列（z-index 30）會蓋在畫面上的對話框（.overlay z-index 5，例如第三季密碼、家長專區）上面：有對話框時標題列退到下面 */
#screen:has(>.overlay)>.park>.phead,#screen:has(>.overlay)>.park .pmroot>.pmtabs{z-index:4!important}
/* 第一次導覽 */
.gztour{position:fixed;inset:0;z-index:900;cursor:pointer}
.gztour .gzspot{position:fixed;border-radius:28px;box-shadow:0 0 0 200vmax rgba(10,8,40,.62),0 0 0 5px #FFE27A,0 0 26px 8px rgba(255,226,122,.7);transition:all .35s ease;pointer-events:none}
.gztour .gzspot.none{left:50%!important;top:50%!important;width:0!important;height:0!important;box-shadow:0 0 0 200vmax rgba(10,8,40,.62)}
.gztour .gzguide{position:fixed;left:50%;transform:translateX(-50%);display:flex;align-items:flex-end;gap:6px;width:min(520px,94vw);pointer-events:none;transition:top .35s ease,bottom .35s ease}
.gztour .gzhero{flex:0 0 auto;width:clamp(70px,18vmin,120px)}.gztour .gzhero svg{width:100%;height:auto;display:block}
.gztour .gzbub{flex:1 1 auto;position:relative;background:#FFFDF4;color:#3A2C6E;border-radius:20px;padding:10px 14px;font-size:clamp(16px,2.4vmin,21px);line-height:1.45;box-shadow:0 6px 0 rgba(0,0,0,.2);margin-bottom:18px}
.gztour .gzbub:before{content:'';position:absolute;left:-12px;bottom:16px;border:8px solid transparent;border-right:12px solid #FFFDF4}
.gztour .gzbub small{display:block;margin-top:4px;color:#8A7CB8;font-size:13px}
.gztour .gzskip{position:fixed;right:max(12px,env(safe-area-inset-right,0px));top:max(12px,env(safe-area-inset-top,0px));z-index:2;min-height:44px;padding:0 18px;border-radius:999px;border:2px solid #fff;background:rgba(40,30,100,.92);color:#fff;font:inherit;font-size:17px;cursor:pointer}
.gztour .gzdots{display:flex;gap:6px;justify-content:center;margin-top:6px}.gztour .gzdots i{width:8px;height:8px;border-radius:50%;background:#D8D0F0}.gztour .gzdots i.on{background:#7A5CE0}
@media (prefers-reduced-motion:reduce){.gzt,.gzci .gznew{animation:none}.gztour .gzspot,.gztour .gzguide{transition:none}}
`;
const st=document.createElement('style');st.id='m99zx4css';st.textContent=css;(document.head||document.documentElement).appendChild(st);

/* ---------- 狀態 ---------- */
const GZ={cur:null,prev:null,tour:null};window.__gate=GZ;
const park=()=>document.querySelector('#screen>.park');
const grid=()=>{const p=park();return p&&p.querySelector(':scope>.pgrid')};
const cardOf=k=>{const g=grid();return g&&g.querySelector(`.pcard[data-k="${k}"]`)};
const locked=c=>!!(c&&c.classList.contains('lockd'));
const recent=()=>{const r=V2.gzRecent;return Array.isArray(r)?r.filter(k=>typeof k==='string'):[]};
function remember(k){try{if(!zoneOf(k)&&!cardOf(k))return;const r=recent().filter(x=>x!==k);r.unshift(k);V2.gzRecent=r.slice(0,6);sv()}catch(e){}}
const played=k=>recent().includes(k)||!!(V2.parkSeen&&V2.parkSeen[k]);
function tag(){const g=grid();if(!g)return;const pos=k=>{const ex=EXT().zones||{};const o=ORDER.indexOf(k);return o<0?ORDER.length+Object.keys(ex).indexOf(k)+1:o};
 g.querySelectorAll('.pcard[data-k]').forEach(c=>{const k=c.dataset.k;const z=zoneOf(k)||'games';if(c.dataset.gz!==z)c.dataset.gz=z;c.style.order=String(pos(k))})}
const stkMark=()=>{try{if(window.__stk)window.__stk.mark()}catch(e){}};
function setBack(t){const b=document.querySelector('#screen>.park>.phead #pback');if(!b)return;const sp=b.classList.contains('p88back')?b.querySelector('span:last-child'):null;if(sp)sp.textContent=t;else b.textContent=t;b.setAttribute('aria-label',t)}
function setTitle(z){const h=document.querySelector('#screen>.park>.phead .gtitle');if(!h)return;h.innerHTML=z?`<span class="gzti">${IC[z.id]}</span>${z.n}`:'星光遊樂園'}
/* ---------- 大門 ---------- */
function contItems(){const out=[];const ok=k=>{const c=cardOf(k);return c&&c.style.display!=='none'&&!c.hidden&&!out.includes(k)}; // App 沒買的卡（m68 整張藏起來）不放
 const last=recent().find(k=>ok(k)&&k!=='practice'&&!locked(cardOf(k)));if(last)out.push(last);
 const nw=[...(EXT().newest||[]),...NEWEST].find(k=>ok(k)&&!locked(cardOf(k))&&!played(k));if(nw)out.push(nw);
 if(out.length<2){const r2=recent().find(k=>ok(k)&&k!=='practice'&&!locked(cardOf(k)));if(r2)out.push(r2)}
 return out.slice(0,2)}
function buildGate(){const p=park();if(!p)return null;let gz=p.querySelector(':scope>.gz');if(gz)gz.remove();
 gz=document.createElement('div');gz.className='gz';
 const ci=contItems();
 gz.innerHTML=`<div class="gzc"${ci.length?'':' hidden'}><span class="gzcl"><i>${PLAY}</i>繼續玩</span>${ci.map(k=>{const c=cardOf(k);const pic=(c.querySelector('.pic')||{}).innerHTML||'';const n=(c.querySelector('b')||{}).textContent||'';
   return `<button class="gzci${locked(c)?' lockd':''}" data-k="${k}"><span class="pic">${pic}</span><b>${n}</b>${played(k)?'':`<span class="gznew" aria-label="新">${STAR}</span>`}</button>`}).join('')}</div>
  <div class="gzg">${ZONES.map((z,i)=>`<button class="gzt" data-z="${z.id}" style="--c1:${z.c1};--c2:${z.c2};--dl:${(i*.07).toFixed(2)}s" aria-label="${z.n}"><span class="gzi">${IC[z.id]}</span><b>${z.n}</b></button>`).join('')}</div>`;
 const g=grid();p.insertBefore(gz,g||null);
 gz.querySelectorAll('.gzt').forEach(b=>b.onclick=()=>{try{sfx('pop')}catch(e){}openZone(b.dataset.z,true)});
 gz.querySelectorAll('.gzci').forEach(b=>b.onclick=()=>{const k=b.dataset.k,c=cardOf(k);if(!c)return;
  gz.querySelectorAll('.gzci.sel').forEach(x=>{if(x!==b)x.classList.remove('sel')});
  try{c.click()}catch(e){}
  // 原本的卡片「點一下先念」：跟著亮起來；第二下就照原本進去
  if(S.screen==='park'&&c.classList.contains('uxsel'))b.classList.add('sel');else b.classList.remove('sel')});
 return gz}
function showGate(voice){const p=park();if(!p)return;GZ.cur=null;p.classList.add('gzon','gzgate');p.removeAttribute('data-gz');
 if(!p.querySelector(':scope>.gz'))buildGate();
 const g=grid();if(g)g.querySelectorAll('.pcard').forEach(c=>{c.classList.remove('uxsel');const h=c.querySelector('.uxhand');if(h)h.remove()});
 setBack('回首頁');setTitle(null);const b=p.querySelector(':scope>.phead #pback');if(b)b.onclick=()=>{hush();go('title')};
 p.scrollTop=0;stkMark();if(voice){hush();sayR(['t_end'])}}
function openZone(id,voice){const p=park(),g=grid(),z=zById(id);if(!p||!g||!z)return;
 if(id==='practice'){const c=cardOf('practice');if(c&&!locked(c)){hush();S.from='park';GZ.cur=null;go('practice');return}}
 GZ.cur=id;p.classList.add('gzon');p.classList.remove('gzgate');p.dataset.gz=id;p.style.setProperty('--gzc1',z.c1);p.style.setProperty('--gzc2',z.c2);
 let i=0;g.querySelectorAll('.pcard[data-k]').forEach(c=>{const on=c.dataset.gz===id;c.classList.toggle('gzoff',!on);c.classList.remove('uxsel');const h=c.querySelector('.uxhand');if(h)h.remove()});
 [...g.querySelectorAll('.pcard[data-k]:not(.gzoff)')].sort((a,b)=>(+a.style.order||0)-(+b.style.order||0)).forEach(c=>{c.style.setProperty('--dl',(i++*.05).toFixed(2)+'s')});
 setBack('回遊樂園大門');setTitle(z);const b=p.querySelector(':scope>.phead #pback');if(b)b.onclick=()=>{hush();try{sfx('pop')}catch(e){}showGate(false)};
 p.scrollTop=0;stkMark();if(voice!==false){hush();sayR([z.line])}}
/* ---------- 包 SCREENS.park ---------- */
const _pk=SCREENS.park;
SCREENS.park=function(){const prev=GZ.prev;const r=_pk.apply(this,arguments);
 try{const p=park();if(!p||!grid())return r;tag();setTimeout(tag,0);
  let z=null;if(prev==='park')z=GZ.cur;else{const zz=zoneOf(prev);if(zz&&zz!=='practice')z=zz}
  buildGate();
  if(z)openZone(z,true);else{showGate(false);if(!V2.gateTour)setTimeout(()=>{if(S.screen==='park'&&!GZ.cur&&!V2.gateTour&&park())tour()},700)}
 }catch(e){console.log('gate52',e)}
 return r};
/* ---------- 換畫面：記「上一個畫面」、最近玩的、寶石上限、收掉導覽 ---------- */
const _show=show;
show=function(name){try{GZ.prev=S.screen;if(name!=='park'){endTour(false);GZ.cur=null}capEnter(name)}catch(e){console.log('gate52 show',e)}
 const r=_show.apply(this,arguments);
 try{if(name&&name!=='park'&&S.screen===name&&zoneOf(name))remember(name)}catch(e){}
 return r};
/* ---------- 寶石上限 ---------- */
const capOn=()=>V2.gemCap!==false;
function capScan(){const d=today();let c=V2.gcap;if(!c||c.d!==d||!Array.isArray(c.g)||!Array.isArray(c.s))c=V2.gcap={d,g:[],s:[]};
 const GD=gameDay();Object.keys(GD).forEach(k=>{if(V2[GD[k]]===d&&!c.g.includes(k)&&!c.s.includes(k))c.g.push(k)});return c}
function capEnter(name){try{const GD=gameDay();const c=capScan();if(!GD[name])return;const d=today();
  if(capOn()&&V2[GD[name]]!==d&&c.g.length>=GEMRULE.fullGames){V2[GD[name]]=d;c.s.push(name)}sv()}catch(e){console.log('gemcap',e)}}
window.__gemCap={rule:GEMRULE,scan:capScan,on:capOn,days:gameDay};
/* ---------- 家長專區：開關 ---------- */
if(typeof parentPanel==='function'){const _pp=parentPanel;parentPanel=function(){const r=_pp.apply(this,arguments);try{const ov=[...document.querySelectorAll('.overlay')].pop();if(!ov||ov.querySelector('.gzcap'))return r;
  const d=document.createElement('div');d.className='gzcap';
  d.innerHTML=`<span class="lab" style="display:block;margin-top:10px">小遊戲每天的寶石上限</span><div class="seg"><button data-gcap="1" aria-pressed="${capOn()}">開（建議）</button><button data-gcap="0" aria-pressed="${!capOn()}">關</button></div><p class="small">開啟時，每天前 ${GEMRULE.fullGames} 個小遊戲第一次玩各得 3 顆寶石，之後的小遊戲每次 1 顆。闖關和練習的寶石不變；已經有的寶石不會減少。</p>`;
  const lab=[...ov.querySelectorAll('.lab')].find(x=>/遊樂園要用寶石/.test(x.textContent));let after=lab;while(after&&after.nextElementSibling&&!(after.tagName==='P'&&after.classList.contains('small')))after=after.nextElementSibling;
  if(after&&after.parentNode)after.parentNode.insertBefore(d,after.nextSibling);else{const card=ov.querySelector('.card');if(!card)return r;card.appendChild(d)}
  d.querySelectorAll('[data-gcap]').forEach(b=>b.onclick=()=>{V2.gemCap=b.dataset.gcap==='1';sv();d.querySelectorAll('[data-gcap]').forEach(x=>x.setAttribute('aria-pressed',x===b))})}catch(e){console.log('gemcap pp',e)}return r}}
/* ---------- 第一次導覽 ---------- */
function endTour(done){const t=GZ.tour;if(!t)return;GZ.tour=null;try{t.el.remove()}catch(e){}if(done){V2.gateTour=1;sv()}}
function tour(){if(GZ.tour)return;const p=park();if(!p)return;V2.gateTour=1;sv();
 const steps=[{k:'t_hi'},...ZONES.map(z=>({k:z.tour,sel:`.gzt[data-z="${z.id}"]`}))];
 const cs=p.querySelector('.gzc:not([hidden])');if(cs)steps.push({k:'t_cont',sel:'.gzc'});steps.push({k:'t_end'});
 const el=document.createElement('div');el.className='gztour tour';el.setAttribute('role','dialog');el.setAttribute('aria-label','遊樂園導覽');
 let hero='';try{hero=princess(S.look,'class="gzpr"')}catch(e){}
 el.innerHTML=`<div class="gzspot none"></div><div class="gzguide"><span class="gzhero">${hero}</span><div class="gzbub"><span class="gztx"></span><div class="gzdots">${steps.map(()=>'<i></i>').join('')}</div></div></div><button class="gzskip">跳過</button>`;
 document.body.appendChild(el);const T={el,i:-1,tok:0};GZ.tour=T;
 const spot=el.querySelector('.gzspot'),guide=el.querySelector('.gzguide'),tx=el.querySelector('.gztx');
 const next=()=>{if(GZ.tour!==T)return;T.i++;if(T.i>=steps.length){endTour(true);return}const s=steps[T.i],my=++T.tok;
  tx.textContent=ht(L[s.k]);el.querySelectorAll('.gzdots i').forEach((d,j)=>d.classList.toggle('on',j===T.i));
  const t=s.sel&&park()&&park().querySelector(s.sel);
  if(t){const b=t.getBoundingClientRect(),pad=6;spot.classList.remove('none');Object.assign(spot.style,{left:(b.left-pad)+'px',top:(b.top-pad)+'px',width:(b.width+pad*2)+'px',height:(b.height+pad*2)+'px'});
   const mid=b.top+b.height/2;if(mid>innerHeight*.5){guide.style.top='max(10px, env(safe-area-inset-top, 0px))';guide.style.bottom='auto'}else{guide.style.top='auto';guide.style.bottom='max(10px, env(safe-area-inset-bottom, 0px))'}}
  else{spot.classList.add('none');guide.style.top='auto';guide.style.bottom='max(10px, env(safe-area-inset-bottom, 0px))'}
  hush();const t0=Date.now();sayR([s.k]).then(spoke=>{const w=Math.max(0,(spoke?700:3200)-(spoke?0:Date.now()-t0));setTimeout(()=>{if(GZ.tour===T&&T.tok===my)next()},w)})};
 el.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('.gzskip')){hush();endTour(true);return}next()});
 next()}
window.__gateTour=tour;
}catch(e){console.log('m99zx4',e)}})();

/* ================= 2.3 遊樂園新遊戲：腳踏車小路（m8sg_bike8.js，畫面 bike8；遊樂園大門「小遊戲」區）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 規格：brief/s8_outline.md 第 49 章、brief/F.md。完成第 49 章打開；App 照 window.__appOpen(48)。給別的代理看的說明：dev/g23.md。
 * 玩法：1. 先幫主角戴好安全帽（拉到頭上 → 點一下戴正 → 扣好扣環 → 拉緊，鬆鬆的不算）。
 *       2. 用手指在公園地圖上，從主角那裡沿著小路畫出要騎的路，主角照著騎（只會沿著小路走；畫歪了主角會停在歪掉的前面，再畫一次就好）。
 *       3. 遇到斑馬線：停下來、下車，抬頭左看看右看看（小臉框），有車子就等它過去；孩子點「可以走了」才牽著車走過去。
 *          遇到走路的人：停下來說「借過」（有彩虹腳踏車鈴就叮鈴），等他讓開，孩子點「可以走了」才繼續。
 *       4. 沿路收集已教的小寫字母牌（a～k）：簡單＝隨便拿；中等＝照字母順序（下一個會發亮，拿錯的不會被拿走）；
 *          困難＝聽語音指路（在下一個路口右轉、直直騎在第二個路口左轉…），畫對了才騎過去；畫錯了騎到對的地方停下來提醒，第二次錯整段路發亮。
 *       5. 到終點開心結束（沒有失敗、沒有倒數、不扣分）。寶石：每天第一次 3 顆，之後 1 顆（V2.bike8Day，遊樂園大門每日上限用 __gateExt.gemDay）。
 * 主角騎車是這裡自己畫的「公主／王子騎腳踏車」側面圖（頭髮、衣服顏色跟著換裝間），不做整體放大縮小；只有輪子轉、上下輕彈、頭左右看。
 * 地圖用格子路網（C×R 個路口），直放的手機把地圖轉成直的（路網、斑馬線一起轉，人物、字母不轉）。
 * 台詞：lines/b23.tsv（B23_），沒錄音時只顯示畫面上的字幕框。動畫在 prefers-reduced-motion、body.lite 時減少。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined')return;
/*LINES*/
const T={
"B23_card":"腳踏車小路！戴好安全帽，畫出要騎的路！",
"B23_lock":"完成第四十九章，就會打開喔！",
"B23_menu":"腳踏車小路！要玩哪一種呢？",
"B23_dhard":"困難",
"B23_hi":"我們去公園騎腳踏車吧！",
"B23_helm1":"騎車前，先戴好安全帽！把安全帽拉到頭上。",
"B23_helm2":"安全帽歪歪的，點一下，把它戴正。",
"B23_helm3":"戴正了！再扣好扣環。",
"B23_helm4":"喀！扣好了。鬆鬆的不算喔，拉一拉帶子。",
"B23_helm5":"剛剛好！下巴和帶子中間，放得進一根手指。出發！",
"B23_draw":"用手指從我這裡，沿著小路畫出要騎的路。",
"B23_drawE":"沿路可以拿字母牌，騎到終點的旗子！",
"B23_drawM":"照字母的順序，一個一個去拿字母牌！",
"B23_drawH":"仔細聽，我說怎麼走，你就怎麼畫。",
"B23_lrtip":"路口旁邊有粉紅色的「左」和藍色的「右」，跟著顏色轉就對了！",
"B23_from":"從我這裡開始畫喔！",
"B23_off":"這裡沒有路喔！從我這裡，沿著小路再畫一次。",
"B23_more":"接著畫下去吧！",
"B23_zebra":"前面是斑馬線！停下來，下車牽著走。",
"B23_look":"頭抬起來，左看看，右看看，耳朵聽一聽。",
"B23_car":"有車子來了，等它開過去。",
"B23_ok":"左右都沒有車了，可以走了，就點一下。",
"B23_walk":"牽著腳踏車，慢慢走過去。",
"B23_ride":"過好馬路了，再騎上去！",
"B23_ped":"前面有人在走路，停下來。",
"B23_bell":"叮鈴叮鈴，借過！",
"B23_excuse":"借過一下，謝謝！",
"B23_pedok":"他讓開了！可以走了，就點一下。",
"B23_got":"拿到字母牌了！",
"B23_next":"下一個字母在哪裡呢？去找發亮的那一個！",
"B23_notyet":"還有字母牌沒拿到喔！",
"B23_r0":"就是這個路口，往藍色「右」那邊轉。",
"B23_l0":"就是這個路口，往粉紅色「左」那邊轉。",
"B23_r1":"在下一個路口，往藍色「右」那邊轉。",
"B23_l1":"在下一個路口，往粉紅色「左」那邊轉。",
"B23_r2":"直直騎，在第二個路口，往藍色「右」那邊轉。",
"B23_l2":"直直騎，在第二個路口，往粉紅色「左」那邊轉。",
"B23_fin":"直直騎到終點！",
"B23_wrR":"嗯？要往藍色「右」那邊轉喔！",
"B23_wrL":"嗯？要往粉紅色「左」那邊轉喔！",
"B23_wrS":"還沒到喔！直直騎，數一數路口。",
"B23_glow":"跟著發亮的路畫畫看！",
"B23_end":"到終點了！你騎得好安全！",
"B23_endL":"字母牌全部拿到了！",
"B23_go":"可以走了",
"B23_left":"左",
"B23_right":"右",
"B23_ring":"叮鈴！"
};
/*END*/
const T0={again:'再點一下，就可以進去喔！',lockApp:'爸爸媽媽可以幫你打開新的冒險喔！',easy:'簡單',mid:'中等',gem3:'送你三顆寶石！',gem1:'送你一顆寶石！'};
const RM=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite||document.body.classList.contains('lite')}catch(e){return false}};
const sayQ=a=>{try{return Promise.resolve(say(a)).catch(()=>{})}catch(e){return Promise.resolve()}};
const sfx2=k=>{try{sfx(k)}catch(e){}};
const hasBell=()=>{try{return !!(window.G22&&G22.has('bk_bell'))}catch(e){return false}};
const ring=()=>{try{tone(1568,0,.45,'sine',.13);tone(2093,.13,.55,'sine',.11);tone(1568,.32,.4,'sine',.09);tone(2093,.45,.6,'sine',.08)}catch(e){}};
const N1=v=>(+v).toFixed(1);
let UID=0;const uid=p=>'bk8'+p+(++UID).toString(36)+Math.random().toString(36).slice(2,4);
const letterSay=l=>{try{return (typeof voHas==='function'&&voHas('e1|'+l))?{en:l,slow:1}:{en:l.toUpperCase(),slow:1}}catch(e){return {en:l,slow:1}}};
function gems(key){const P5=window.__P5;if(P5&&typeof P5.gems==='function')return P5.gems(key);const first=V2[key]!==today();V2[key]=today();try{save2()}catch(e){}const n=first?3:1;S.wallet+=n;save();try{renderBar()}catch(e){}sfx2('gem');return n}

/* ---------- 開放條件 ---------- */
const appOK=()=>{try{if(typeof IS_APP==='undefined'||!IS_APP)return true;return typeof window.__appOpen==='function'?!!window.__appOpen(48):true}catch(e){return false}};
function gate(){if(!((S.chDone||0)>=49))return 'ch';if(!appOK())return 'app';return ''}

/* ---------- 圖 ---------- */
const lg=(id,a,b,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
function look(){let hair='#7A4A2A',dress='#FF6FA8',dl='#FFCBE0';try{const L=S.look||{};hair=(ITEM[L.hair]||{}).c||hair;const D=DRESS[L.dress];if(D){dress=D.c;dl=D.l}}catch(e){}
 const boy=window.HERO==='prince';if(boy){try{const L=S.look||{};const D=DRESS[L.dress];if(!D){dress='#4F8BE8';dl='#BFD8FF'}}catch(e){}}return {hair,dress,dl,boy}}
const HELM={c1:'#7FE3D0',c2:'#2FB8A6',st:'#FFFFFF',sp:'#B99CFF',bk:'#FFD24D'};
// 腳踏車＋主角（側面、面向右邊；原點在地上兩輪中間；mode：ride 騎、walk 下車牽著走）
function heroBike(mode,o){o=o||{};const u=uid('h'),L=look(),boy=L.boy;const walk=mode==='walk';
 const wheel=(x)=>`<g transform="translate(${x} -16)"><circle r="15" fill="#5A4A7A"/><circle r="11.6" fill="#EAF6FF"/><g class="bkspk"><path d="M0 -11 V11 M-11 0 H11 M-7.8 -7.8 L7.8 7.8 M-7.8 7.8 L7.8 -7.8" stroke="#B9C4DC" stroke-width="1.3"/></g><circle r="3" fill="#FF8FB8"/></g>`;
 const bell=hasBell()?`<g transform="translate(16 -52)"><path d="M-4 0 Q-4 -6 0 -6 Q4 -6 4 0Z" fill="url(#${u}rb)"/><rect x="-4.6" y="-.6" width="9.2" height="2" rx="1" fill="#FFD24D"/><circle cx="-1.4" cy="-3.6" r=".9" fill="#fff" opacity=".8"/></g>`:'';
 const bike=`${wheel(-30)}${wheel(30)}
  <path d="M-30 -16 L-2 -18 L-10 -42 M-2 -18 L22 -44 L30 -16 M-10 -42 L22 -44" stroke="url(#${u}fr)" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-30 -16 L-10 -42" stroke="url(#${u}fr)" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M22 -44 L20 -52 Q24 -55 29 -52" stroke="#8A7AB0" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <rect x="-17" y="-47" width="15" height="5" rx="2.5" fill="#6A5A8A"/><circle cx="-2" cy="-18" r="4.2" fill="#FFD24D"/>
  <path d="M-30 -16 L-2 -18" stroke="#FFFFFF" stroke-width="1.2" opacity=".45"/>${bell}
  <path d="M-38 -31 Q-30 -36 -22 -31" stroke="#FFB3CF" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
 // 主角
 const helmet=`<g class="bkhelm"><path d="M-9 -84 Q-9 -100 6 -101 Q22 -100 23 -84 Q23 -81 20 -81 H-6 Q-9 -81 -9 -84Z" fill="url(#${u}hm)"/>
  <path d="M-1 -98 Q6 -100 13 -98" stroke="${HELM.st}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".9"/><path d="M-6 -88 H21" stroke="${HELM.st}" stroke-width="1.6" opacity=".6"/>
  <path d="M19 -84 Q27 -84 28 -81 H18Z" fill="${HELM.c2}"/><ellipse cx="0" cy="-94" rx="3" ry="1.6" fill="#fff" opacity=".7"/>
  <path d="M-3 -82 L4 -67 L13 -82" stroke="${HELM.sp}" stroke-width="1.6" fill="none"/><circle cx="4" cy="-67" r="1.8" fill="${HELM.bk}"/></g>`;
 const hairBack=boy?`<path d="M-9 -84 Q-12 -74 -6 -70 L2 -72 Z" fill="${L.hair}"/>`:`<path d="M-8 -84 Q-18 -80 -20 -66 Q-21 -56 -14 -52 Q-14 -62 -9 -70 Z" fill="${L.hair}"/><circle cx="-13" cy="-78" r="3.4" fill="#FF8FB8"/>`;
 const face=`<g class="bkhd">${hairBack}<circle cx="6" cy="-77" r="12.4" fill="#FFE4D4"/>
  <path d="M-5 -82 Q2 -88 16 -84 Q12 -80 6 -80 Q0 -80 -5 -76Z" fill="${L.hair}"/>
  <g class="bkeye"><circle cx="12.6" cy="-77" r="1.9" fill="#3A2A5C"/><circle cx="13.2" cy="-77.7" r=".7" fill="#fff"/></g>
  <ellipse cx="13" cy="-71.8" rx="2.6" ry="1.5" fill="#FF9FB8" opacity=".75"/><path d="M14.6 -69.4 Q16.8 -68.4 17.6 -70.2" stroke="#C0607A" stroke-width="1.1" fill="none" stroke-linecap="round"/>
  <circle cx="-2" cy="-75" r="2.6" fill="#FFD8C4"/>${helmet}</g>`;
 let body;
 if(!walk){
  const top=boy?`<path d="M-12 -48 Q-12 -64 0 -66 Q10 -66 10 -54 L6 -46 Z" fill="url(#${u}dr)"/><path d="M-14 -50 Q-4 -40 8 -46 L6 -36 Q-6 -34 -14 -40Z" fill="#5A6AB0"/>`
   :`<path d="M-12 -48 Q-12 -64 0 -66 Q10 -66 10 -54 L6 -46 Z" fill="url(#${u}dr)"/><path d="M-20 -38 Q-14 -54 -2 -50 Q8 -48 12 -40 Q0 -32 -20 -38Z" fill="url(#${u}dr)"/><path d="M-18 -39 Q-4 -34 10 -41" stroke="${L.dl}" stroke-width="1.6" fill="none" opacity=".8"/>`;
  body=`<g class="bklegB"><path d="M-6 -44 L4 -32 L-2 -14" stroke="#FFE4D4" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><ellipse cx="0" cy="-12" rx="4.6" ry="2.6" fill="#FF8FB8" opacity=".9"/></g>
   ${top}
   <g class="bklegF"><path d="M-4 -44 L10 -32 L4 -20" stroke="#FFE4D4" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="6" cy="-18" rx="5" ry="2.8" fill="#FF6F96"/></g>
   <path d="M4 -60 Q14 -56 21 -52" stroke="#FFE4D4" stroke-width="4.4" fill="none" stroke-linecap="round"/><circle cx="21.6" cy="-51.6" r="2.8" fill="#FFE4D4"/>
   <path d="M2 -63 Q-1 -60 2 -56" stroke="#fff" stroke-width="1.4" fill="none" opacity=".5"/>`}
 else{
  const top=boy?`<path d="M-26 -38 Q-28 -58 -16 -62 Q-6 -62 -4 -44 L-6 -34 H-26Z" fill="url(#${u}dr)"/><rect x="-26" y="-36" width="20" height="8" rx="3" fill="#5A6AB0"/>`
   :`<path d="M-26 -42 Q-28 -60 -16 -62 Q-6 -62 -4 -46 Q2 -30 0 -26 Q-16 -22 -32 -26 Q-30 -34 -26 -42Z" fill="url(#${u}dr)"/><path d="M-30 -27 Q-16 -24 -1 -27" stroke="${L.dl}" stroke-width="1.6" fill="none" opacity=".8"/>`;
  body=`<g class="bkwalkB"><path d="M-12 -28 L-10 -6" stroke="#FFE4D4" stroke-width="4.6" stroke-linecap="round" opacity=".85"/><ellipse cx="-8" cy="-4" rx="5" ry="2.6" fill="#FF8FB8"/></g>
   ${top}<g class="bkwalkF"><path d="M-20 -28 L-22 -6" stroke="#FFE4D4" stroke-width="5" stroke-linecap="round"/><ellipse cx="-20" cy="-4" rx="5.2" ry="2.8" fill="#FF6F96"/></g>
   <path d="M-10 -54 Q6 -54 20 -52" stroke="#FFE4D4" stroke-width="4.4" fill="none" stroke-linecap="round"/><circle cx="21" cy="-51.6" r="2.8" fill="#FFE4D4"/>`}
 const headAt=walk?'translate(-22 8)':'';
 return `<defs>${lg(u+'fr','#FF9FC8','#FF5F9E',1,0)}${lg(u+'hm',HELM.c1,HELM.c2)}${lg(u+'dr',L.dl,L.dress)}${lg(u+'rb','#FF8FA8','#8FB8FF',1,0)}</defs>
  <ellipse cx="0" cy="0" rx="48" ry="5" fill="#2A4A2A" opacity=".18"/>${bike}${body}<g transform="${headAt}">${face}</g>`}
// 安全帽特寫（主角正面，大臉；戴帽步驟、左右看小框用）
function faceBig(o){o=o||{};const u=uid('f'),L=look(),boy=L.boy;
 const hairB=boy?`<path d="M80 130 Q78 64 150 60 Q222 64 220 130 Q214 104 196 96 Q150 84 104 96 Q86 104 80 130Z" fill="${L.hair}"/>`
  :`<path d="M76 140 Q70 64 150 58 Q230 64 224 140 Q232 196 214 238 Q200 212 206 160 Q196 110 150 100 Q104 110 94 160 Q100 212 86 238 Q68 196 76 140Z" fill="${L.hair}"/>`;
 return `<svg viewBox="0 0 300 260" class="bk8face" aria-hidden="true"><defs>${lg(u+'d',L.dl,L.dress)}<radialGradient id="${u}s" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#FFF0E6"/><stop offset="1" stop-color="#FFE4D4"/></radialGradient></defs>
  ${hairB}<path d="M70 262 Q76 216 150 212 Q224 216 230 262Z" fill="url(#${u}d)"/><path d="M118 214 Q150 236 182 214" stroke="${L.dl}" stroke-width="4" fill="none" opacity=".8"/>
  <rect x="136" y="196" width="28" height="22" rx="8" fill="#FFE4D4"/>
  <g class="bk8head"><circle cx="150" cy="140" r="68" fill="url(#${u}s)"/>
   <path d="M86 128 Q96 82 150 80 Q204 82 214 128 Q196 106 170 108 Q160 96 150 108 Q132 98 120 110 Q100 108 86 128Z" fill="${L.hair}"/>
   <g class="bk8eyes"><circle cx="124" cy="146" r="8.4" fill="#3A2A5C"/><circle cx="176" cy="146" r="8.4" fill="#3A2A5C"/><circle cx="127" cy="142.6" r="3" fill="#fff"/><circle cx="179" cy="142.6" r="3" fill="#fff"/></g>
   <ellipse cx="108" cy="166" rx="12" ry="7" fill="#FF9FB8" opacity=".7"/><ellipse cx="192" cy="166" rx="12" ry="7" fill="#FF9FB8" opacity=".7"/>
   <path d="M138 174 Q150 184 162 174" stroke="#C0607A" stroke-width="3.4" fill="none" stroke-linecap="round"/>
   <ellipse cx="120" cy="118" rx="10" ry="5" fill="#fff" opacity=".25"/></g></svg>`}
function helmetSVG(o){const u=uid('m');return `<svg viewBox="-100 -90 200 230" class="bk8hel" aria-hidden="true"><defs>${lg(u+'a',HELM.c1,HELM.c2)}${lg(u+'b','#FFFFFF','#DFF8F2')}</defs>
  <g class="bk8strap"><path class="sl" d="M-66 6 Q-52 74 -10 126" stroke="${HELM.sp}" stroke-width="7" fill="none" stroke-linecap="round"/><path class="sr" d="M66 6 Q52 74 10 126" stroke="${HELM.sp}" stroke-width="7" fill="none" stroke-linecap="round"/>
   <g class="bk8buck"><rect x="-13" y="118" width="26" height="16" rx="6" fill="${HELM.bk}"/><rect x="-8" y="122" width="16" height="4" rx="2" fill="#FFF3B0"/></g></g>
  <path d="M-88 14 Q-92 -76 0 -80 Q92 -76 88 14 Q88 24 76 24 H-76 Q-88 24 -88 14Z" fill="url(#${u}a)"/>
  <path d="M-60 -56 Q0 -84 60 -56" stroke="url(#${u}b)" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="M-30 -66 L-24 -30 M0 -72 V-32 M30 -66 L24 -30" stroke="#1E8A7C" stroke-width="7" stroke-linecap="round" opacity=".45"/>
  <path d="M-84 6 H84" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/>
  <ellipse cx="-46" cy="-46" rx="16" ry="8" fill="#fff" opacity=".55" transform="rotate(-24 -46 -46)"/>
  <path d="M-64 18 Q0 36 64 18 Q68 26 60 30 Q0 50 -60 30 Q-68 26 -64 18Z" fill="${HELM.c2}"/><path d="M-44 28 Q0 40 44 28" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".45" stroke-linecap="round"/></svg>`}
// 路上的朋友（走路的人：兔子奶奶、小鴨媽媽；車子：上面看下去的小汽車）
function walker(kind){const u=uid('w');if(kind==='duck')return `<g><ellipse cx="0" cy="0" rx="16" ry="3.6" fill="#2A4A2A" opacity=".16"/><g class="bk8wb"><ellipse cx="0" cy="-16" rx="15" ry="12" fill="#FFE27A"/><circle cx="8" cy="-32" r="9.4" fill="#FFE27A"/><path d="M15 -32 L23 -30 L15 -27Z" fill="#FF9A3C"/><circle cx="10.6" cy="-34" r="1.8" fill="#3A2A5C"/><circle cx="11.2" cy="-34.6" r=".6" fill="#fff"/><ellipse cx="10" cy="-29" rx="2.4" ry="1.4" fill="#FFB3C8" opacity=".8"/><path d="M-6 -18 Q0 -12 6 -18" stroke="#F2C13C" stroke-width="2" fill="none"/><path d="M-4 -4 V1 M4 -4 V1" stroke="#FF9A3C" stroke-width="2.6" stroke-linecap="round"/><path d="M-12 -42 Q-6 -46 0 -42" stroke="#FF8FB8" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>`;
 return `<g><defs>${lg(u+'c','#FFFFFF','#F2EAF8')}</defs><ellipse cx="0" cy="0" rx="15" ry="3.6" fill="#2A4A2A" opacity=".16"/><g class="bk8wb"><path d="M-6 -60 Q-9 -78 -4 -80 Q0 -78 -2 -60Z M4 -60 Q5 -78 10 -79 Q13 -76 8 -60Z" fill="url(#${u}c)"/><path d="M-4.6 -63 Q-6 -74 -4 -76 M6 -63 Q8 -73 9.4 -75" stroke="#FFB3C8" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M-12 -2 Q-14 -30 0 -32 Q14 -30 12 -2Z" fill="#B99CFF"/><path d="M-12 -12 Q0 -6 12 -12" stroke="#E4D6FF" stroke-width="2" fill="none"/>
  <circle cx="0" cy="-46" r="14" fill="url(#${u}c)"/><circle cx="5" cy="-48" r="1.9" fill="#3A2A5C"/><circle cx="5.6" cy="-48.6" r=".6" fill="#fff"/><ellipse cx="7" cy="-42" rx="2.6" ry="1.4" fill="#FFB3C8" opacity=".8"/><circle cx="10" cy="-45" r="1.4" fill="#FF8FB8"/>
  <path d="M16 -24 Q20 -12 18 0" stroke="#C8956A" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M8 -24 Q14 -26 16 -24" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>`}
function carTop(c){const u=uid('c');c=c||'#7FB8FF';return `<g><defs>${lg(u+'b','#FFFFFF',c,1,0)}</defs><rect x="-20" y="-34" width="40" height="68" rx="14" fill="${c}"/><rect x="-16" y="-30" width="32" height="60" rx="12" fill="url(#${u}b)" opacity=".5"/>
 <rect x="-14" y="-18" width="28" height="13" rx="5" fill="#E8F6FF"/><rect x="-14" y="10" width="28" height="9" rx="4" fill="#E8F6FF"/><circle cx="-11" cy="-33" r="3" fill="#FFF3B0"/><circle cx="11" cy="-33" r="3" fill="#FFF3B0"/>
 <path d="M-8 -22 Q0 -26 8 -22" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/></g>`}
const star5=(cx,cy,R,k=.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+N1(cx+r*Math.cos(a))+' '+N1(cy+r*Math.sin(a))}return d+'Z'};
function tree(x,y,s,k){const c=['#6CC562','#7FD36E','#5DB85A'][k%3];return `<g transform="translate(${N1(x)} ${N1(y)})"><ellipse cx="0" cy="${N1(10*s)}" rx="${N1(16*s)}" ry="${N1(4*s)}" fill="#3A6A3A" opacity=".16"/><rect x="${N1(-3*s)}" y="${N1(-4*s)}" width="${N1(6*s)}" height="${N1(14*s)}" rx="${N1(2*s)}" fill="#B07A4A"/><circle cx="0" cy="${N1(-14*s)}" r="${N1(15*s)}" fill="${c}"/><circle cx="${N1(-7*s)}" cy="${N1(-19*s)}" r="${N1(6*s)}" fill="#fff" opacity=".22"/></g>`}
function flowers(x,y,k){const cs=['#FF8FB8','#FFE27A','#B99CFF','#FFFFFF'];return `<g transform="translate(${N1(x)} ${N1(y)})">${[[-10,0],[0,-6],[10,2],[3,8]].map(([a,b],i)=>`<circle cx="${a}" cy="${b}" r="4.4" fill="${cs[(i+k)%4]}"/><circle cx="${a}" cy="${b}" r="1.6" fill="#FFB84D"/>`).join('')}</g>`}
// 卡片圖示（64×64）
const ICONBK=()=>`<circle cx="32" cy="32" r="27" fill="#DDF3FF"/><path d="M6 44 Q32 36 58 44 V52 Q32 62 6 52Z" fill="#9FDB7E"/><path d="M8 48 Q32 40 56 48" stroke="#F2C9A0" stroke-width="5" fill="none" stroke-linecap="round"/><g transform="translate(32 47) scale(.42)">${heroBike('ride')}</g>`;
// 每次讀都畫一張新的（漸層 id 不重複，同一畫面出現兩次 iOS 也不會壞）
try{Object.defineProperty(ICONART,'i:bike8',{enumerable:true,configurable:true,get:()=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ICONBK()}</svg>`,set:()=>{}})}catch(e){console.log('icon bike8',e)}
try{UXPD.bike8='畫出要騎的路'}catch(e){}

/* ---------- 遊樂園卡片（小遊戲區） ---------- */
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{bike8:'games'});X.gemDay=Object.assign(X.gemDay||{},{bike8:'bike8Day'});X.newest=['bike8'].concat(X.newest||[])}catch(e){}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const g=$('.pgrid');if(g&&!g.querySelector('[data-k="bike8"]')){
 const after=g.querySelector('[data-k="vine6"]')||g.querySelector('[data-k="chef5"]')||g.querySelector('[data-k="fossil26"]');const st=gate(),lk=st==='ch'||st==='app';
 const b=document.createElement('button');b.className='pcard'+(lk?' lockd':'');b.dataset.k='bike8';b.style.setProperty('--dl','.84s');
 b.innerHTML=`<span class="pic">${art('i:bike8')}</span><b>腳踏車小路</b><span>${st==='ch'?'完成第四十九章就會打開':'畫出要騎的路'}</span>${lk?`<span class="lk">${ICON.lock('#FFD98A')}</span>`:''}`;
 // 遊樂園大門分區（m99zx4）：卡片是排好區以後才插進來的，自己標上「小遊戲」區；大門已經直接開在別區時先藏起來（照 m9zj 手作小工坊的做法）
 b.dataset.gz='games';try{const gz=window.__gate;if(gz&&document.querySelector('#screen>.park.gzon')&&gz.cur!=='games')b.classList.add('gzoff')}catch(e){}
 g.insertBefore(b,after?after.nextSibling:null)}
 // 2.2 起就有的同一個問題：小小攝影師（m8_photo.js）的卡也是後插、沒有分區標記，這裡順便補上（不改 m8_photo.js）
 if(g){const p8=g.querySelector('.pcard[data-k="photo8"]');if(p8&&!p8.dataset.gz){p8.dataset.gz='games';try{const gz=window.__gate;if(gz&&document.querySelector('#screen>.park.gzon')&&gz.cur!=='games')p8.classList.add('gzoff')}catch(e){}}}
 }catch(e){console.log('park bike8',e)}return r}}
try{PARKS.push('bike8')}catch(e){}
let pickT=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="bike8"]');if(!c)return;
 e.stopImmediatePropagation();e.preventDefault();const st=gate();const shake=()=>{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')};
 if(st==='ch'){hush();sayQ([T.B23_lock]);shake();return}
 if(st==='app'){hush();sayQ([T0.lockApp]);shake();return}
 V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen.bike8=(V2.parkSeen.bike8||0)+1;try{save2()}catch(_){}sfx2('pop');S.from='park';hush();go('bike8')};
 if((V2.parkSeen.bike8||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pickT<8000))return enter();
 const g=c.parentNode;$$('.pcard.uxsel',g).forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pickT=Date.now();sfx2('pop');hush();sayQ([T.B23_card,T0.again])}catch(_){}},true);

/* ---------- 地圖：格子路網 ---------- */
const LET='abcdefghijk'.split('');
const rint=n=>Math.floor(Math.random()*n);
const pick=a=>a[rint(a.length)];
function mkMap(diff){const easy=diff==='easy';const C=easy?4:5,R=easy?3:4,cR=easy?1:2;
 let cross;if(easy)cross=[pick([0,1,2])].concat([]);else cross=pick([[0,2],[1,3],[0,3],[1,2]]);
 if(easy&&cross[0]!==1)cross=[cross[0],cross[0]===0?2:0];
 const key=(a,b)=>a<b?a+'-'+b:b+'-'+a;const id=(c,r)=>r*C+c;const adj={};const edges={};
 const add=(a,b)=>{(adj[a]=adj[a]||[]).push(b);(adj[b]=adj[b]||[]).push(a);edges[key(a,b)]={a,b,cross:false}};
 for(let r=0;r<R;r++)for(let c=0;c<C;c++){if(c<C-1&&(c!==cR||cross.includes(r)))add(id(c,r),id(c+1,r));if(r<R-1)add(id(c,r),id(c,r+1))}
 cross.forEach(r=>{edges[key(id(cR,r),id(cR+1,r))].cross=true});
 return {C,R,cR,cross,key,id,adj,edges,cr:n=>[n%C,Math.floor(n/C)],deg:n=>(adj[n]||[]).length}}
// 路線：從最左邊往右，不走回頭路、不往左；困難的轉彎不在角落、兩個轉彎中間至少隔兩段
function genRoute(M,o){o=o||{};for(let t=0;t<900;t++){const r0=o.r0!=null?o.r0:rint(M.R);let cur=M.id(0,r0),d=[1,0];const nodes=[cur],seen=new Set([cur]);let since=0,turns=0,first=true,ok=false;
  for(let s=0;s<18;s++){const [c,r]=M.cr(cur);if(c===M.C-1&&s>0){ok=true;break}
   const opts=[];const dirs=[d,[-d[1],d[0]],[d[1],-d[0]]];
   for(const e of dirs){if(e[0]<0)continue;if(o.ban&&o.ban(e))continue;const nc=c+e[0],nr=r+e[1];if(nc<0||nc>=M.C||nr<0||nr>=M.R)continue;const nx=M.id(nc,nr);if(seen.has(nx)||!(M.adj[cur]||[]).includes(nx))continue;
    const turn=e!==d;if(turn&&o.hard){if(M.deg(cur)<3)continue;if(since<(first?1:2))continue}
    opts.push({e,nx,turn,w:turn?1:1.3})}
   if(!opts.length)break;let tot=opts.reduce((a,b)=>a+b.w,0),x=Math.random()*tot,ch=opts[0];for(const op of opts){x-=op.w;if(x<=0){ch=op;break}}
   if(ch.turn){turns++;since=0;first=false}since++;d=ch.e;cur=ch.nx;nodes.push(cur);seen.add(cur)}
  if(!ok)continue;const n=nodes.length;
  if(o.hard&&(turns<2||n<7||n>11))continue;if(!o.hard&&(n<(o.min||5)||n>(o.max||10)))continue;
  // 困難：轉彎要在真的路口（直走經過的點也要是路口，才數得清楚）
  if(o.hard){let bad=false;for(let i=1;i<n-1;i++){if(M.deg(nodes[i])<3){bad=true;break}}if(bad)continue}
  return nodes}
 return null}

/* ---------- 遊戲 ---------- */
const DN={easy:'簡單',mid:'中等',hard:'困難'};
let tok=0,BS={diff:null},G=null;
SCREENS.bike8=function(){const my=++tok;const live=()=>my===tok&&S.screen==='bike8';const calm=RM();
 if(!BS.diff)BS.diff=S.diff==='easy'?'easy':S.diff==='hard'?'hard':'mid';
 const host=document.getElementById('screen');
 host.innerHTML=`<div class="dball bk8${calm?' calm':''}"><div class="phead"><button class="btn2 small p88back" id="bk8back">回遊樂園</button><h2 class="gtitle">腳踏車小路</h2><span class="phsp"></span></div>
  <div class="bk8top"><p class="bk8bub" id="bk8bub" aria-live="polite"></p><div class="bk8got" id="bk8got"></div></div>
  <div class="bk8stage" id="bk8st"><svg class="bk8map" id="bk8map" aria-label="公園地圖，用手指畫出要騎的路"></svg>
   <div class="bk8hud" id="bk8hud"><button class="btn bk8go" id="bk8ok" hidden>${T.B23_go}</button></div>
   <div class="bk8look" id="bk8look" hidden></div></div>
  <div class="ch5menu bk8menu" id="bk8menu"><div class="ch5mc">
   <div class="ch5mh"><span class="ch5mi">${art('i:bike8')}</span><div><b>腳踏車小路</b><small>戴好安全帽，畫出要騎的路！</small></div></div>
   <div class="ch5lab">難度</div><div class="ch5row" id="bk8diffs"><button class="ch5opt" data-v="easy"><b>簡單</b><small>沿路拿字母</small></button><button class="ch5opt" data-v="mid"><b>中等</b><small>照 a b c 順序</small></button><button class="ch5opt" data-v="hard"><b>困難</b><small>聽我說怎麼走</small></button></div>
   <button class="btn ch5go" id="bk8start">出發！</button></div></div></div>`;
 const $q=s=>host.querySelector(s);
 const bub=$q('#bk8bub'),gotEl=$q('#bk8got'),st=$q('#bk8st'),svg=$q('#bk8map'),okB=$q('#bk8ok'),lookEl=$q('#bk8look'),hud=$q('#bk8hud');
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const tell=(t,parts)=>{bub.textContent=t;try{hush()}catch(e){}return sayQ(parts||[t])};
 let raf=0;
 $q('#bk8back').onclick=()=>{tok++;cancelAnimationFrame(raf);try{if(helmRZ)removeEventListener('resize',helmRZ)}catch(e){}hush();go('park')};
 const sel=()=>host.querySelectorAll('#bk8diffs .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===BS.diff));sel();
 host.querySelectorAll('#bk8diffs .ch5opt').forEach(b=>b.onclick=()=>{BS.diff=b.dataset.v;sel();sfx2('pop');hush();sayQ([BS.diff==='hard'?T.B23_dhard:T0[BS.diff]])});
 $q('#bk8start').onclick=()=>{sfx2('pop');hush();$q('#bk8menu').style.display='none';helmetStep()};
 tell(T.B23_menu);
 // 彩虹腳踏車鈴（拿到才有）
 let bellB=null;
 function addBell(){if(bellB||!hasBell())return;bellB=document.createElement('button');bellB.type='button';bellB.className='bk8bell';bellB.setAttribute('aria-label','彩虹腳踏車鈴');
  let ic='';try{ic=window.G22&&G22.art23?G22.art23('bk_bell'):''}catch(e){}bellB.innerHTML=ic||'🔔';hud.appendChild(bellB);
  bellB.onclick=e=>{e.stopPropagation();ring();bellB.classList.remove('rang');void bellB.offsetWidth;bellB.classList.add('rang');bub.textContent=T.B23_ring;
   try{const g=G22.st();if(g.fresh&&g.fresh.bk_bell){delete g.fresh.bk_bell;save2()}}catch(_){}};
  try{(window.__BK8.hud||[]).forEach(f=>{try{f(hud,{ring})}catch(e){}})}catch(e){}}

 /* ----- 1. 戴安全帽 ----- */
 let helmRZ=null;
 function helmetStep(){if(!live())return;svg.innerHTML='';gotEl.innerHTML='';
  const box=document.createElement('div');box.className='bk8helm';box.innerHTML=`<div class="bk8hf">${faceBig()}<div class="bk8hw" id="bk8hw">${helmetSVG()}</div><span class="bk8stool" aria-hidden="true"></span>
   <button class="bk8tap" id="bk8tap" type="button" aria-label="安全帽"></button><span class="bk8fing" id="bk8fing" hidden><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 44 Q10 34 8 28 Q7 24 11 24 Q14 24 17 29 L17 8 Q17 4 21 4 Q25 4 25 8 L25 30" fill="#FFE4D4"/><circle cx="21" cy="7" r="3" fill="#FFF6F0"/></svg></span></div>`;
  st.appendChild(box);
  const hw=box.querySelector('#bk8hw'),tap=box.querySelector('#bk8tap'),hf=box.querySelector('.bk8hf'),fing=box.querySelector('#bk8fing');
  let step=0;hw.className='bk8hw off';
  const fit=()=>{const R=st.getBoundingClientRect();const sd=Math.max(200,Math.min(R.width*.94,R.height*.94));hf.style.width=sd+'px';hf.style.height=sd+'px'};fit();
  const placeTap=()=>{if(!live()||!box.isConnected){removeEventListener('resize',placeTap);return}fit();const r=hf.getBoundingClientRect(),h=hw.getBoundingClientRect();if(!r.width)return;
   let x=h.left-r.left,y=h.top-r.top,w=h.width,hh=h.height;if(step===2||step===3){x=r.width*.36;y=r.height*.66;w=r.width*.28;hh=r.height*.24}
   tap.style.left=x+'px';tap.style.top=y+'px';tap.style.width=Math.max(60,w)+'px';tap.style.height=Math.max(60,hh)+'px'};
  later(placeTap,60);addEventListener('resize',placeTap);helmRZ=placeTap;
  tell(T.B23_helm1);
  const next=()=>{step++;placeTap();later(placeTap,calm?30:560);
   if(step===1){hw.className='bk8hw on tilt';sfx2('pop');tell(T.B23_helm2)}
   else if(step===2){hw.className='bk8hw on';sfx2('pop');tell(T.B23_helm3)}
   else if(step===3){hw.className='bk8hw on buck loose';sfx2('pop');try{tone(1400,0,.06,'square',.06)}catch(e){}tell(T.B23_helm4)}
   else if(step===4){hw.className='bk8hw on buck';sfx2('gem');fing.hidden=false;tap.disabled=true;
    tell(T.B23_helm5).then(()=>{});later(()=>{removeEventListener('resize',placeTap);box.classList.add('out');later(()=>{box.remove();startMap()},calm?0:380)},calm?1400:2600)}};
  // 第一步：拖到頭上，或直接點一下
  let drag=null;
  tap.addEventListener('pointerdown',e=>{if(step>=4)return;e.preventDefault();try{tap.setPointerCapture(e.pointerId)}catch(_){}drag={x:e.clientX,y:e.clientY,mv:0}});
  tap.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.mv=Math.max(drag.mv,Math.hypot(dx,dy));if(step===0){hw.style.transition='none';hw.style.translate=`${dx}px ${dy}px`}});
  const up=e=>{if(!drag)return;const d=drag;drag=null;hw.style.translate='';hw.style.transition='';
   if(step===0){const r=hf.getBoundingClientRect();const near=e.clientY<r.top+r.height*.6;if(d.mv<14||near)next();else{sfx2('wrong');tell(T.B23_helm1)}return}
   if(d.mv<40)next()};
  tap.addEventListener('pointerup',up);tap.addEventListener('pointercancel',()=>{drag=null;hw.style.translate='';hw.style.transition=''});
 }

 /* ----- 2. 地圖 ----- */
 let M=null,PORT=false,VW=800,VH=500;
 const XY=n=>{const [c,r]=M.cr(n);return XYf(c,r)};
 const XYf=(c,r)=>{const x=80+c*((VW-160)/(M.C-1)),y=70+r*(350/(M.R-1));return PORT?[y,x]:[x,y]};
 const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
 function drawMap(){const u=uid('m');const C=M.C,R=M.R,cR=M.cR;
  // 底圖（路網、馬路、河）畫在「橫的」座標，直放時整組轉成直的
  const SX=(VW-160)/(C-1),SY=350/(R-1);const X=c=>80+c*SX,Y=r=>70+r*SY;
  const roadX0=X(cR)+SX*.3,roadX1=X(cR)+SX*.7;
  let base=`<rect x="-10" y="-10" width="${VW+20}" height="520" fill="url(#${u}g)"/>
   <path d="M-10 452 Q${N1(VW*.25)} 438 ${N1(VW*.5)} 452 Q${N1(VW*.75)} 466 ${VW+10} 448 V510 H-10Z" fill="url(#${u}w)"/><path d="M20 470 Q60 464 100 470 M300 476 Q340 470 380 476 M600 468 Q640 462 680 468" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>
   <rect x="${N1(roadX0-8)}" y="-10" width="${N1(roadX1-roadX0+16)}" height="520" fill="#E4E0EC"/><rect x="${N1(roadX0)}" y="-10" width="${N1(roadX1-roadX0)}" height="520" fill="#A9B2C8"/>
   <path d="M${N1((roadX0+roadX1)/2)} -10 V510" stroke="#FFE27A" stroke-width="3" stroke-dasharray="18 16"/>`;
  Object.values(M.edges).forEach(E=>{const [ac,ar]=M.cr(E.a),[bc,br]=M.cr(E.b);base+=`<path d="M${N1(X(ac))} ${N1(Y(ar))} L${N1(X(bc))} ${N1(Y(br))}" stroke="#E9B98E" stroke-width="40" stroke-linecap="round"/>`});
  Object.values(M.edges).forEach(E=>{const [ac,ar]=M.cr(E.a),[bc,br]=M.cr(E.b);base+=`<path d="M${N1(X(ac))} ${N1(Y(ar))} L${N1(X(bc))} ${N1(Y(br))}" stroke="#F6D3AE" stroke-width="32" stroke-linecap="round"/><path d="M${N1(X(ac))} ${N1(Y(ar))} L${N1(X(bc))} ${N1(Y(br))}" stroke="#FFFFFF" stroke-width="2.4" stroke-dasharray="10 12" opacity=".75"/>`});
  // 馬路上的那一段不是腳踏車道：蓋回馬路顏色，畫斑馬線
  M.cross.forEach(r=>{const y=Y(r);base+=`<rect x="${N1(roadX0)}" y="${N1(y-22)}" width="${N1(roadX1-roadX0)}" height="44" fill="#A9B2C8"/>`;
   const n=7,w=(roadX1-roadX0)/(n*2-1);for(let i=0;i<n;i++)base+=`<rect x="${N1(roadX0+i*2*w)}" y="${N1(y-20)}" width="${N1(w)}" height="40" rx="2" fill="#FFFFFF" opacity=".95"/>`});
  const defs=`<defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9F0A6"/><stop offset="1" stop-color="#A6DE86"/></linearGradient><linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FDCFF"/><stop offset="1" stop-color="#6FB8F0"/></linearGradient>
   <radialGradient id="${u}p" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFF3D6"/></radialGradient></defs>`;
  // 裝飾（直立的，放在換算後的位置）
  let deco='';let k=0;
  for(let r=0;r<R-1;r++)for(let c=0;c<C-1;c++){if(c===cR)continue;const [x,y]=XYf(c+.5,r+.5);if((c+r)%2===0){deco+=tree(x-18,y+4,1,k)+tree(x+20,y-6,.8,k+1)}else{deco+=flowers(x,y,k)}k++}
  for(let r=0;r<R-1;r++){const [x,y]=XYf(cR+.5,r+.5);if(r%2)deco+=`<g transform="translate(${N1(x)} ${N1(y)})"><rect x="-12" y="-4" width="24" height="10" rx="3" fill="#FFFFFF" opacity=".0"/></g>`}
  const startP=XY(G.start),finP=XY(G.fin);
  deco+=`<g transform="translate(${N1(finP[0])} ${N1(finP[1])})" class="bk8fin"><path d="M14 4 V-58" stroke="#B07A4A" stroke-width="4" stroke-linecap="round"/><path d="M16 -58 Q34 -52 48 -58 Q40 -48 48 -38 Q32 -34 16 -40Z" fill="#FF6F96"/><path d="${star5(30,-48,5)}" fill="#FFE27A"/><circle cx="14" cy="-60" r="3.4" fill="#FFD24D"/>
   <circle cx="-16" cy="-54" r="9" fill="#7FB8FF"/><path d="M-16 -45 Q-14 -30 -10 -18" stroke="#fff" stroke-width="1.2" fill="none"/><circle cx="-30" cy="-44" r="8" fill="#FFE27A"/><path d="M-30 -36 Q-26 -24 -18 -16" stroke="#fff" stroke-width="1.2" fill="none"/></g>`;
  // B 的小橘（騎腳踏車的橘貓，第八季美術）有的話，在終點旁邊加油；沒有就不畫
  try{const C46=window.CH46;if(C46&&C46.cat49&&typeof C46.cat49.f==='function'){const fx=finP[0]+(PORT?-58:-62),fy=finP[1]+(PORT?-40:34);deco+=`<g transform="translate(${N1(fx-30)} ${N1(fy-56)}) scale(.6)" class="bk8cat">${C46.cat49.f()}</g>`}}catch(e){}
  deco+=`<g transform="translate(${N1(startP[0])} ${N1(startP[1])})"><path d="M-30 -6 V-62" stroke="#B07A4A" stroke-width="4" stroke-linecap="round"/><path d="M-28 -62 Q-14 -58 -2 -62 Q-8 -54 -2 -46 Q-14 -42 -28 -46Z" fill="#6FD3A8"/><circle cx="-30" cy="-64" r="3.4" fill="#FFD24D"/></g>`;
  svg.setAttribute('viewBox',PORT?`0 0 500 ${VW}`:`0 0 ${VW} 500`);svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.innerHTML=`${defs}<g ${PORT?'transform="matrix(0 1 1 0 0 0)"':''}>${base}</g><g class="bk8deco">${deco}</g><g id="bk8glow"></g><g id="bk8path"></g><g id="bk8plates"></g><g id="bk8peds"></g><g id="bk8car"></g><path id="bk8ink" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/><path id="bk8bad" fill="none" stroke="#8C7CA8" stroke-width="6" stroke-dasharray="6 8" stroke-linecap="round" opacity=".7"/><g id="bk8lr"></g><g id="bk8hero"></g>`;
  drawPlates();drawPeds();}
 function drawPlates(){const g=svg.querySelector('#bk8plates');if(!g)return;const nx=nextLetter();
  g.innerHTML=G.letters.map((L,i)=>{if(L.got)return '';const [x,y]=XY(L.n);const glow=(G.diff==='mid'&&nx===L)||(G.diff==='hard'&&nx===L);
   return `<g class="bk8plate${glow?' nx':''}" data-i="${i}" transform="translate(${N1(x)} ${N1(y-30)})"><circle r="${glow?34:22}" fill="#FFE27A" opacity="${glow?.6:0}" class="gl"/>${glow?'<rect x="-23" y="-23" width="46" height="46" rx="14" fill="none" stroke="#FFC24D" stroke-width="5"/>':''}<rect x="-19" y="-19" width="38" height="38" rx="11" fill="#FFFFFF"/><rect x="-19" y="-19" width="38" height="38" rx="11" fill="none" stroke="${['#FF8FB8','#7FB8FF','#6FD3A8','#B99CFF','#FFB35C'][i%5]}" stroke-width="4"/><text x="0" y="9" text-anchor="middle" class="bk8let">${L.l}</text><path d="M0 19 V30" stroke="#B07A4A" stroke-width="3"/></g>`}).join('')}
 function drawPeds(){const g=svg.querySelector('#bk8peds');if(!g)return;g.innerHTML=G.peds.map((p,i)=>{const E=M.edges[p.e];const pt=lerp(XY(E.a),XY(E.b),.5);const off=p.moved?p.off:[0,0];
  return `<g class="bk8ped" data-i="${i}" style="transform:translate(${N1(pt[0]+off[0])}px,${N1(pt[1]+10+off[1])}px)">${walker(p.kind)}</g>`}).join('')}
 function nextLetter(){if(G.diff==='easy')return null;return G.letters.find(L=>!L.got)||null}
 function drawGot(){gotEl.innerHTML=G.letters.map(L=>`<i class="${L.got?'on':''}">${L.got?L.l:(G.diff==='easy'?'':L.l)}</i>`).join('')}
 // 主角
 let HP=[0,0],face=1,mode='ride';
 function heroDraw(){const g=svg.querySelector('#bk8hero');if(!g)return;g.innerHTML=`<g class="bk8hero ${mode}${G.moving?' mv':''}" transform="translate(${N1(HP[0])} ${N1(HP[1]+12)})"><g transform="scale(${face<0?-.78:.78} .78)">${heroBike(mode)}</g></g>`;HG=g.firstElementChild}
 let HG=null;
 function heroPos(p){HP=p;if(HG)HG.setAttribute('transform',`translate(${N1(p[0])} ${N1(p[1]+12)})`)}
 function setFace(dx){const f=dx>0.5?1:dx<-0.5?-1:face;if(f!==face){face=f;heroDraw()}}
 function setMode(m){if(m!==mode){mode=m;heroDraw()}}
 function startMap(){if(!live())return;const diff=BS.diff;
  const r=st.getBoundingClientRect();PORT=r.height>r.width*1.08;
  // 很寬的畫面（手機橫放）路網往左右拉開，地圖才不會只有中間一小塊；直放、平板照 800
  VW=PORT?800:Math.round(Math.max(800,Math.min(1300,500*(r.width||800)/Math.max(1,r.height||500))));
  M=mkMap(diff);let route=null;
  if(diff==='hard'){
   // 困難：路線不往畫面下方騎（只往上、左、右），每一段最多到第二個路口。
   // 橫放：不准往下（r+1）；直放：地圖是轉過的，往右（c+1）就是畫面往下，所以整條路反過來騎（從下面騎到上面）。
   for(let t=0;t<150&&!route;t++){let r0=genRoute(M,{hard:true,ban:PORT?null:(e=>e[1]===1)});if(r0&&PORT)r0=r0.slice().reverse();if(r0&&hardOK(r0))route=r0;else if(t%3===2)M=mkMap(diff)}}
  for(let t=0;t<20&&!route;t++){route=genRoute(M,{hard:diff==='hard',r0:diff==='easy'?1:null,min:diff==='easy'?4:6,max:diff==='easy'?7:10});if(!route)M=mkMap(diff)}
  if(!route){route=[];for(let c=0;c<M.C;c++)route.push(M.id(c,M.cross[0]))}
  G={diff,route,start:route[0],fin:route[route.length-1],pos:route[0],ri:0,letters:[],peds:[],busy:false,miss:0,moving:false,done:false,saidNY:false,orderSaid:{}};
  // 字母牌：放在路線上（簡單隨便拿、中等照順序、困難在每一段的終點）
  const inner=route.slice(1,-1);
  if(diff==='hard'){const legs=legEnds(route);const s=rint(LET.length-legs.length+1);legs.forEach((n,i)=>G.letters.push({n,l:LET[s+i],got:false}))}
  else{const cnt=diff==='easy'?Math.min(4,inner.length):Math.min(5,inner.length);const idx=[];const step=inner.length/cnt;for(let i=0;i<cnt;i++)idx.push(Math.min(inner.length-1,Math.floor(i*step+rint(Math.max(1,Math.floor(step))))));
   const uniq=[...new Set(idx)];
   if(diff==='mid'){const s=rint(LET.length-uniq.length+1);uniq.forEach((k,i)=>G.letters.push({n:inner[k],l:LET[s+i],got:false}))}
   else{const ls=shuffle(LET).slice(0,uniq.length).sort();uniq.forEach((k,i)=>G.letters.push({n:inner[k],l:ls[i],got:false}))}}
  // 走路的人：放在路線上、不是斑馬線的那一段
  const segs=[];for(let i=0;i<route.length-1;i++){const k=M.key(route[i],route[i+1]);if(!M.edges[k].cross)segs.push(k)}
  const np=diff==='mid'?2:1;shuffle(segs.slice(1)).slice(0,np).forEach((e,i)=>G.peds.push({e,kind:i%2?'duck':'bunny',done:false,moved:false,off:[0,0]}));
  drawMap();drawGot();HP=XY(G.start);face=1;mode='ride';{const a=XY(route[0]),b=XY(route[1]);setFace(b[0]-a[0])}heroDraw();addBell();
  bindDraw();
  const intro=diff==='easy'?T.B23_drawE:diff==='mid'?T.B23_drawM:T.B23_drawH;
  const tip=diff==='hard'?[T.B23_lrtip]:[];
  tell(T.B23_draw+intro+tip.join(''),[T.B23_hi,T.B23_draw,intro].concat(tip)).then(()=>{if(live()&&G.diff==='hard')instr()});
  if(G.diff==='hard')drawLR()}
 // 困難的路線檢查：每一步在畫面上都不往下、每一段最多數到第二個路口
 function hardOK(r){for(let i=0;i<r.length-1;i++){const a=XY(r[i]),b=XY(r[i+1]);if(b[1]-a[1]>1)return false}
  const ts=turnsOf(r);let i0=0;for(const t of ts){let k=0;for(let j=i0+1;j<=t;j++)if(M.deg(r[j])>=3)k++;if(k<1||k>2)return false;i0=t+1}return ts.length>=2}
 // 困難：每一段＝直直騎到第 k 個路口、轉彎、再騎一段；最後一段直直騎到終點
 function turnsOf(route){const out=[];for(let i=1;i<route.length-1;i++){const a=M.cr(route[i-1]),b=M.cr(route[i]),c=M.cr(route[i+1]);const d1=[b[0]-a[0],b[1]-a[1]],d2=[c[0]-b[0],c[1]-b[1]];if(d1[0]!==d2[0]||d1[1]!==d2[1])out.push(i)}return out}
 function legEnds(route){const ts=turnsOf(route);const ends=ts.map(t=>Math.min(route.length-1,t+1));const last=route.length-1;if(!ends.length||ends[ends.length-1]!==last)ends.push(last);return [...new Set(ends)].map(i=>route[i]).filter(n=>n!==route[0])}
 function turnLR(i){const a=XY(G.route[i-1]),b=XY(G.route[i]),c=XY(G.route[i+1]);const d1=[b[0]-a[0],b[1]-a[1]],d2=[c[0]-b[0],c[1]-b[1]];return d1[0]*d2[1]-d1[1]*d2[0]>0?'r':'l'}
 function legNow(){const ts=turnsOf(G.route).filter(t=>t>=G.ri);const last=G.route.length-1;
  if(!ts.length)return {end:last,key:'B23_fin',dir:'s'};const t=ts[0];let k=0;for(let j=G.ri+1;j<=t;j++)if(M.deg(G.route[j])>=3)k++;k=Math.max(0,Math.min(2,k));const lr=turnLR(t);
  return {end:Math.min(last,t+1),key:'B23_'+lr+k,dir:lr,turn:t}}
 function instr(){if(!live()||G.done)return;const L=legNow();tell(T[L.key]);drawLR()}
 function drawLR(){const g=svg.querySelector('#bk8lr');if(!g)return;if(G.diff!=='hard'||G.done){g.innerHTML='';return}
  // 顏色牌放在要轉彎的那個路口（粉紅色「左」、藍色「右」，照騎過去的方向擺），最後一段直直騎到終點就收起來
  const L=legNow();if(L.turn==null){g.innerHTML='';return}
  const t=L.turn;const a=XY(G.route[t]);const p0=XY(G.route[Math.max(0,t-1)]);let d=[a[0]-p0[0],a[1]-p0[1]];const n=Math.hypot(d[0],d[1])||1;d=[d[0]/n,d[1]/n];
  const left=[d[1],-d[0]],right=[-d[1],d[0]];const R0=60;
  // 往上擺的牌子要離遠一點，才不會蓋到主角的頭（主角畫在路口上方）
  const tag=(v,t2,c,cls)=>{const D=v[1]<-.5?100:v[1]>.5?56:72;const x=a[0]+v[0]*D,y=a[1]+v[1]*D;const ang=Math.atan2(v[1],v[0])*180/Math.PI;
   return `<g class="bk8lrg ${cls}" transform="translate(${N1(x)} ${N1(y)})"><path transform="rotate(${N1(ang)})" d="M22 -9 L34 0 L22 9Z" fill="${c}"/><circle r="23" fill="${c}" stroke="#FFFFFF" stroke-width="4"/><text y="9" text-anchor="middle" class="bk8lrt">${t2}</text></g>`};
  g.innerHTML=tag(left,T.B23_left,'#FF6FA8','l')+tag(right,T.B23_right,'#4F8FE8','r')}
 /* ----- 畫路線 ----- */
 let ink=[],path=[],bad=false,badPts=[],drawing=false,lastQ=null;
 const toSvg=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=svg.getScreenCTM();if(!m)return [0,0];const q=p.matrixTransform(m.inverse());return [q.x,q.y]};
 const spacing=()=>Math.min((VW-160)/(M.C-1),350/(M.R-1));
 function segDist(p,a,b){const vx=b[0]-a[0],vy=b[1]-a[1],L=vx*vx+vy*vy||1;let t=((p[0]-a[0])*vx+(p[1]-a[1])*vy)/L;const tc=Math.max(0,Math.min(1,t));const x=a[0]+vx*tc,y=a[1]+vy*tc;return {d:Math.hypot(p[0]-x,p[1]-y),t}}
 function feed(q){if(bad)return;const sp=spacing(),tol=sp*.42;const cur=path[path.length-1];const cp=XY(cur);
  if(Math.hypot(q[0]-cp[0],q[1]-cp[1])<tol)return;
  let best=null;for(const nb of M.adj[cur]){const r=segDist(q,cp,XY(nb));if(r.d<tol&&r.t>0&&(!best||r.d<best.d))best={nb,...r}}
  if(!best){bad=true;badPts=[q];return}
  if(best.t>.62){if(path.length>=2&&best.nb===path[path.length-2])path.pop();else path.push(best.nb)}}
 function drawInk(){const k=svg.querySelector('#bk8ink'),b=svg.querySelector('#bk8bad'),pg=svg.querySelector('#bk8path');if(!k)return;
  k.setAttribute('d',ink.length?'M'+ink.map(p=>N1(p[0])+' '+N1(p[1])).join(' L'):'');
  b.setAttribute('d',badPts.length>1?'M'+badPts.map(p=>N1(p[0])+' '+N1(p[1])).join(' L'):'');
  pg.innerHTML=path.length>1?`<path d="M${path.map(n=>XY(n).map(N1).join(' ')).join(' L')}" fill="none" stroke="#FFD24D" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><path d="M${path.map(n=>XY(n).map(N1).join(' ')).join(' L')}" fill="none" stroke="#FFF6C8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 12"/>`:''}
 function bindDraw(){svg.onpointerdown=e=>{if(!G||G.busy||G.done||!live())return;e.preventDefault();const q=toSvg(e);const hp=XY(G.pos);
   if(Math.hypot(q[0]-hp[0],q[1]-hp[1])>spacing()*.62){heroHint();tell(T.B23_from);return}
   try{svg.setPointerCapture(e.pointerId)}catch(_){}drawing=true;ink=[q];path=[G.pos];bad=false;badPts=[];lastQ=q;drawInk()};
  svg.onpointermove=e=>{if(!drawing)return;const q=toSvg(e);const d=Math.hypot(q[0]-lastQ[0],q[1]-lastQ[1]);const n=Math.max(1,Math.ceil(d/8));
   for(let i=1;i<=n;i++){const p=lerp(lastQ,q,i/n);if(bad)badPts.push(p);else feed(p)}lastQ=q;ink.push(q);if(ink.length>400)ink.shift();drawInk()};
  const end=()=>{if(!drawing)return;drawing=false;const p=path.slice(),wasBad=bad;ink=[];drawInk();
   if(p.length<2){path=[];badPts=[];drawInk();if(wasBad)tell(T.B23_off);return}
   go2(p,wasBad)};
  svg.onpointerup=end;svg.onpointercancel=end}
 function heroHint(){if(!HG)return;HG.classList.remove('hint');void HG.getBoundingClientRect();HG.classList.add('hint');later(()=>HG&&HG.classList.remove('hint'),1600)}
 /* ----- 騎 ----- */
 async function go2(p,wasBad){G.busy=true;
  if(G.diff==='hard'){const L=legNow();const exp=G.route.slice(G.ri,L.end+1);let m=0;while(m<p.length&&m<exp.length&&p[m]===exp[m])m++;
   const full=m>=exp.length;const seg=exp.slice(0,Math.max(1,m));
   if(seg.length>1)await ride(seg);if(!live())return;G.ri+=seg.length-1;path=[];badPts=[];drawInk();
   if(full){G.miss=0;clearGlow();if(G.pos===G.fin){finish();return}G.busy=false;await wait(300);instr();return}
   // 畫錯了：騎到對的地方停下來
   G.miss++;sfx2('wrong');const L2=legNow();let msg;
   if(L2.turn!=null&&G.ri===L2.turn){msg=L2.dir==='r'?T.B23_wrR:T.B23_wrL}else msg=T.B23_wrS;
   G.busy=false;drawLR();
   if(G.miss>=2){showGlow(G.route.slice(G.ri,L2.end+1));tell(msg+' '+T.B23_glow+' '+T[L2.key],[msg,T.B23_glow,T[L2.key]])}else tell(msg+' '+T[L2.key],[msg,T[L2.key]]);
   return}
  await ride(p);if(!live())return;path=[];drawInk();
  if(G.done)return;
  if(G.pos===G.fin&&finOk()){finish();return}
  G.busy=false;
  if(wasBad){badPts=[];drawInk();tell(T.B23_off)}else{badPts=[];drawInk();if(G.pos===G.fin&&!finOk()){tell(T.B23_notyet+' '+T.B23_next,[T.B23_notyet,T.B23_next])}else tell(T.B23_more)}}
 const finOk=()=>G.diff!=='mid'||G.letters.every(L=>L.got);
 function showGlow(nodes){const g=svg.querySelector('#bk8glow');if(!g||nodes.length<2)return;g.innerHTML=`<path class="bk8gl" d="M${nodes.map(n=>XY(n).map(N1).join(' ')).join(' L')}" fill="none" stroke="#FFF06A" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`}
 function clearGlow(){const g=svg.querySelector('#bk8glow');if(g)g.innerHTML=''}
 function moveSeg(a,b,t0,t1,speed){return new Promise(res=>{const A=lerp(a,b,t0),B=lerp(a,b,t1);const L=Math.hypot(B[0]-A[0],B[1]-A[1]);const dur=RM()?Math.min(260,L*1.2):L/speed*1000;
  setFace(b[0]-a[0]);G.moving=true;if(HG)HG.classList.add('mv');const s0=performance.now();
  const stp=now=>{if(!live()){res();return}const k=Math.min(1,(now-s0)/Math.max(1,dur));heroPos(lerp(A,B,k));if(k<1)raf=requestAnimationFrame(stp);else{G.moving=false;if(HG)HG.classList.remove('mv');res()}};raf=requestAnimationFrame(stp)})}
 async function ride(nodes){for(let i=0;i<nodes.length-1;i++){if(!live()||G.done)return;const a=nodes[i],b=nodes[i+1];const A=XY(a),B=XY(b);const k=M.key(a,b),E=M.edges[k];
   if(!E){return}
   const ped=G.peds.find(p=>p.e===k&&!p.done);
   if(E.cross){await moveSeg(A,B,0,.07,170);if(!live())return;await crossing(A,B);if(!live())return;await moveSeg(A,B,.93,1,170)}
   else if(ped){await moveSeg(A,B,0,.18,170);if(!live())return;await meetPed(ped,A,B);if(!live())return;await moveSeg(A,B,.18,1,170)}
   else await moveSeg(A,B,0,1,170);
   if(!live())return;G.pos=b;if(G.diff==='hard')drawLR();
   await atNode(b);if(G.done)return;
   if(b===G.fin&&finOk()&&G.diff!=='hard')return}}
 async function atNode(n){const i=G.letters.findIndex(L=>L.n===n&&!L.got);if(i<0)return;const L=G.letters[i];
  if(G.diff==='mid'){const nx=nextLetter();if(nx!==L){const el=svg.querySelector(`.bk8plate[data-i="${i}"]`);if(el){el.classList.remove('no');void el.getBoundingClientRect();el.classList.add('no')}if(!G.orderSaid[L.l]){G.orderSaid[L.l]=1;tell(T.B23_next)}return}}
  L.got=true;sfx2('ding22');try{tone(880+i*60,0,.16,'triangle',.08)}catch(e){}
  const el=svg.querySelector(`.bk8plate[data-i="${i}"]`);if(el){try{burstEl(el,10)}catch(e){}}
  drawPlates();drawGot();bub.textContent=`${T.B23_got} ${L.l}`;try{hush()}catch(e){}sayQ([letterSay(L.l)]);await wait(RM()?200:520)}
 // 斑馬線：停、下車、左右看（小臉框）、等車子過去、孩子點「可以走了」、牽著走過去
 async function crossing(A,B){setMode('walk');await tell(T.B23_zebra);if(!live())return;
  lookEl.innerHTML=`<div class="bk8lk"><div class="bk8lkin">${faceBig()}<div class="bk8lkh">${helmetSVG()}</div></div><span class="ar l">◀</span><span class="ar r">▶</span></div>`;lookEl.hidden=false;const fb=lookEl.querySelector('.bk8lk');
  bub.textContent=T.B23_look;const pL=sayQ([T.B23_look]);
  fb.classList.add('L');await wait(RM()?400:900);if(!live())return;fb.classList.remove('L');fb.classList.add('R');await wait(RM()?400:900);if(!live())return;fb.classList.remove('R');fb.classList.add('L');await wait(RM()?300:700);fb.classList.remove('L');
  await pL;if(!live())return;
  // 有車子來了：等它開過去（只在路上移動，不會撞到）
  await carPass(A,B);if(!live())return;
  lookEl.hidden=true;lookEl.innerHTML='';
  await waitOk(T.B23_ok);if(!live())return;
  bub.textContent=T.B23_walk;sayQ([T.B23_walk]);if(HG)HG.classList.add('walking');await moveSeg(A,B,.07,.93,95);if(HG)HG.classList.remove('walking');if(!live())return;
  setMode('ride');bub.textContent=T.B23_ride;sayQ([T.B23_ride]);await wait(RM()?200:600)}
 function carPass(A,B){return new Promise(res=>{const g=svg.querySelector('#bk8car');if(!g){res();return}
  const mid=lerp(A,B,.5);bub.textContent=T.B23_car;sayQ([T.B23_car]);
  const col=pick(['#7FB8FF','#FF9FB8','#FFD24D','#8FE0B8']);const horiz=PORT;// 馬路在直放時是橫的
  const len=PORT?500:500,fromEnd=Math.random()<.5;const d0=fromEnd?len+60:-60,d1=fromEnd?-60:len+60;
  const rot=horiz?(fromEnd?-90:90):(fromEnd?0:180);
  const lane=(fromEnd?-1:1)*14;
  g.innerHTML=`<g class="bk8carg">${carTop(col)}</g>`;const cg=g.firstElementChild;
  const place=v=>{const x=horiz?v:mid[0]+lane,y=horiz?mid[1]+lane:v;cg.setAttribute('transform',`translate(${N1(x)} ${N1(y)}) rotate(${rot}) scale(.8)`)};
  const dur=RM()?700:2600;const s0=performance.now();place(d0);
  const stp=now=>{if(!live()){res();return}const k=Math.min(1,(now-s0)/dur);place(d0+(d1-d0)*k);if(k<1)raf=requestAnimationFrame(stp);else{g.innerHTML='';res()}};raf=requestAnimationFrame(stp)})}
 function waitOk(text){return new Promise(res=>{okB.hidden=false;okB.classList.remove('in');void okB.offsetWidth;okB.classList.add('in');tell(text);
  okB.onclick=()=>{okB.onclick=null;okB.hidden=true;sfx2('ding22');try{hush()}catch(e){}res()}})}
 async function meetPed(p,A,B){bub.textContent=T.B23_ped;await sayQ([T.B23_ped]);if(!live())return;
  if(hasBell()){ring();if(bellB){bellB.classList.remove('rang');void bellB.offsetWidth;bellB.classList.add('rang')}await tell(T.B23_bell)}else await tell(T.B23_excuse);if(!live())return;
  // 走路的人往旁邊讓一讓（只移動）
  const d=[B[0]-A[0],B[1]-A[1]];const n=Math.hypot(d[0],d[1])||1;const side=[-d[1]/n*42,d[0]/n*42];p.moved=true;p.off=side;
  const el=svg.querySelector(`.bk8ped[data-i="${G.peds.indexOf(p)}"]`);const mid=lerp(A,B,.5);
  if(el){el.style.transform=`translate(${N1(mid[0]+side[0])}px,${N1(mid[1]+10+side[1])}px)`;el.classList.add('wave')}
  await wait(RM()?200:900);if(!live())return;p.done=true;
  await waitOk(T.B23_pedok)}
 async function finish(){G.done=true;G.busy=true;cancelAnimationFrame(raf);clearGlow();const lr=svg.querySelector('#bk8lr');if(lr)lr.innerHTML='';
  try{confetti()}catch(e){}sfx2('gem');
  V2.bike8=V2.bike8&&typeof V2.bike8==='object'?V2.bike8:{n:0,d:{}};V2.bike8.n=(V2.bike8.n||0)+1;V2.bike8.d=V2.bike8.d||{};V2.bike8.d[G.diff]=(V2.bike8.d[G.diff]||0)+1;try{save2()}catch(e){}
  const n=gems('bike8Day');const all=G.letters.length&&G.letters.every(L=>L.got);
  const line=T.B23_end+(all?' '+T.B23_endL:'');bub.textContent=line;
  await sayQ([T.B23_end].concat(all?[T.B23_endL]:[],[n>=3?T0.gem3:T0.gem1]));if(!live())return;
  const ov=overlay(host,`<div class="card bk8end"><div class="bk8endpic"><svg viewBox="-60 -100 120 104" aria-hidden="true">${heroBike('ride')}</svg></div><h2>${T.B23_end}</h2>
   <p class="bk8endl">${G.letters.filter(L=>L.got).map(L=>`<i>${L.l}</i>`).join('')}</p><p class="small">寶石 +${n}</p>
   <div class="row"><button class="btn" id="bk8again">再玩一次</button><button class="btn2" id="bk8out">回遊樂園</button></div></div>`);
  ov.querySelector('#bk8again').onclick=()=>{sfx2('pop');ov.remove();svg.innerHTML='';gotEl.innerHTML='';bub.textContent='';const m=$q('#bk8menu');if(m){m.style.display='';tell(T.B23_menu)}};
  ov.querySelector('#bk8out').onclick=()=>{sfx2('pop');ov.remove();$q('#bk8back').click()}}
 window.__BK8.G=()=>({G,M,PORT,XY:M?XY:null,legNow:M?legNow:null,host});
};
/* ---------- 樣式 ---------- */
const css=document.createElement('style');css.id='bk8css';css.textContent=`
.bk8{position:relative;display:flex;flex-direction:column;height:100%;gap:6px;box-sizing:border-box}
.bk8 .ch5menu{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,16,60,.55);z-index:6;padding:12px;box-sizing:border-box}
.bk8 .ch5mc{background:#fff;color:#3A2A55;border-radius:22px;padding:14px 16px;max-width:540px;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}
.bk8 .ch5mh{display:flex;gap:10px;align-items:center}.bk8 .ch5mi{width:64px;height:64px;flex:none}.bk8 .ch5mi svg{width:100%;height:100%}
.bk8 .ch5mh b{font-size:22px;display:block}.bk8 .ch5mh small{font-size:16px}
.bk8 .ch5lab{margin:10px 0 4px;font-weight:700}.bk8 .ch5row{display:flex;gap:8px}
.bk8 .ch5opt{flex:1;min-height:64px;border:3px solid #EEE6F8;border-radius:16px;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;color:#3A2A55;font:inherit}
.bk8 .ch5opt b{font-size:20px}.bk8 .ch5opt small{font-size:16px}.bk8 .ch5opt.sel{border-color:#7A5CE0;background:#F0EAFF}
.bk8 .ch5go{display:block;margin:12px auto 0;min-width:10em;min-height:56px}
.bk8top{display:flex;align-items:center;gap:8px;margin:0 6px;min-height:44px;flex-wrap:wrap;justify-content:center}
.bk8bub{flex:1 1 260px;margin:0;padding:6px 14px;border-radius:16px;background:rgba(255,255,255,.94);color:#3A2A5A;font-size:clamp(16px,3.4vmin,21px);text-align:center;min-height:1.4em;line-height:1.35}
.bk8got{display:flex;gap:5px;flex:none}
.bk8got i{font-style:normal;min-width:36px;height:36px;border-radius:11px;border:2px dashed #C8B8E8;display:grid;place-items:center;color:#B8A8D8;background:rgba(255,255,255,.6);font:700 22px/1 'Baloo 2',sans-serif}
.bk8got i.on{border-style:solid;border-color:#FFB81C;background:#FFF4C8;color:#6A3A1A}
.bk8stage{position:relative;flex:1;min-height:250px;border-radius:22px;overflow:hidden;margin:0 6px 6px;background:#A6DE86;box-shadow:0 4px 0 rgba(40,30,80,.18)}
.bk8map{position:absolute;inset:0;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none;cursor:crosshair}
.bk8let{font:700 30px 'Baloo 2',sans-serif;fill:#4A2E7A}
.bk8lrt{font:700 26px sans-serif;fill:#FFFFFF}
.bk8plate .gl{transition:opacity .3s}.bk8plate.nx .gl{animation:bk8glow 1.4s ease-in-out infinite}
.bk8plate.no{animation:bk8no .5s ease-in-out}
@keyframes bk8glow{0%,100%{opacity:.25}50%{opacity:.8}}
@keyframes bk8no{0%,100%{translate:0 0}25%{translate:-5px 0}75%{translate:5px 0}}
.bk8ped{transition:transform .8s ease-in-out}
.bk8ped.wave .bk8wb{animation:bk8hop .6s ease-in-out 2}
@keyframes bk8hop{0%,100%{translate:0 0}50%{translate:0 -5px}}
.bk8hero .bkspk{transform-box:fill-box;transform-origin:center}
.bk8hero.mv .bkspk{animation:bk8spin .5s linear infinite}
@keyframes bk8spin{to{rotate:360deg}}
.bk8hero.mv>g{animation:bk8bob .36s ease-in-out infinite}
@keyframes bk8bob{0%,100%{translate:0 0}50%{translate:0 -1.6px}}
.bk8hero.hint>g{animation:bk8hop .5s ease-in-out 3}
.bk8hero .bkhd{transform-box:fill-box;transform-origin:50% 90%}
.bk8hero.walking .bkwalkF{animation:bk8step .5s ease-in-out infinite}.bk8hero.walking .bkwalkB{animation:bk8step .5s ease-in-out infinite reverse}
@keyframes bk8step{0%,100%{translate:-2px 0}50%{translate:2px 0}}
.bk8hud{position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:center;pointer-events:none;z-index:4}
.bk8hud>*{pointer-events:auto}
.bk8go[hidden]{display:none!important}
.bk8go{min-height:64px;min-width:200px;font-size:26px;box-shadow:0 0 0 4px rgba(255,255,255,.7),0 6px 16px rgba(0,0,0,.25)}
.bk8go.in{animation:bk8in .4s ease-out}
@keyframes bk8in{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
.bk8bell{position:absolute;right:10px;bottom:0;width:64px;height:64px;border-radius:50%;border:3px solid #FFD98A;background:rgba(255,255,255,.92);padding:4px;box-sizing:border-box;display:grid;place-items:center;box-shadow:0 3px 0 rgba(40,30,80,.25)}
.bk8bell svg{width:100%;height:100%}.bk8bell.rang svg{animation:bk8ring .5s ease-in-out 2}
@keyframes bk8ring{0%,100%{rotate:0deg}25%{rotate:-14deg}75%{rotate:14deg}}
.bk8look{position:absolute;right:10px;top:10px;width:min(34%,200px);aspect-ratio:1;z-index:5;pointer-events:none}
.bk8lkin{position:absolute;inset:0}.bk8lkin .bk8face{position:absolute;left:0;top:12%;width:100%;height:auto}
.bk8lkh{position:absolute;left:19%;top:13%;width:62%;transition:translate .4s ease-in-out,rotate .4s ease-in-out;transform-origin:50% 80%}.bk8lkh svg{width:100%;height:auto;display:block}
.bk8lk.L .bk8lkh{rotate:-8deg;translate:-6px 0}.bk8lk.R .bk8lkh{rotate:8deg;translate:6px 0}
.bk8lk{position:relative;width:100%;height:100%;border-radius:24px;background:rgba(255,255,255,.94);box-shadow:0 4px 14px rgba(40,30,80,.25);overflow:hidden}

.bk8lk .ar{position:absolute;top:40%;font-size:22px;color:#FFB81C;opacity:0;transition:opacity .3s}.bk8lk .ar.l{left:6px}.bk8lk .ar.r{right:6px}
.bk8lk.L .ar.l,.bk8lk.R .ar.r{opacity:1}
.bk8face .bk8head,.bk8face .bk8eyes{transition:translate .4s ease-in-out,rotate .4s ease-in-out;transform-box:fill-box;transform-origin:50% 80%}
.bk8lk.L .bk8eyes{translate:-12px 0}.bk8lk.R .bk8eyes{translate:12px 0}
.bk8lk.L .bk8head{rotate:-8deg;translate:-6px 0}.bk8lk.R .bk8head{rotate:8deg;translate:6px 0}
.bk8helm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#DFF3FF,#C9F0A6);z-index:3;transition:opacity .35s}
.bk8helm.out{opacity:0}
.bk8hf{position:relative;width:300px;height:300px}
.bk8hf .bk8face{position:absolute;left:0;top:12%;width:100%;height:auto}
.bk8hw{position:absolute;width:62%;left:19%;top:-2%;transition:left .5s ease-in-out,top .5s ease-in-out,rotate .45s ease-in-out;transform-origin:50% 40%;pointer-events:none}
.bk8hw svg{width:100%;height:auto;display:block}
.bk8hw.off{left:58%;top:50%;width:38%}
.bk8hw.on{left:19%;top:13%}
.bk8hw.tilt{rotate:-18deg}
.bk8hw .bk8strap{opacity:0;transition:opacity .3s}.bk8hw.on .bk8strap{opacity:1}
.bk8hw:not(.buck) .bk8buck{opacity:0}.bk8hw:not(.buck) .sl{translate:-10px -14px}.bk8hw:not(.buck) .sr{translate:10px -14px}
.bk8hw .sl,.bk8hw .sr,.bk8hw .bk8buck{transition:translate .35s ease-in-out,opacity .3s}
.bk8hw.loose .bk8buck,.bk8hw.loose .sl,.bk8hw.loose .sr{translate:0 22px}
.bk8hw.on~.bk8stool{opacity:0}
.bk8stool{transition:opacity .4s;position:absolute;left:58%;top:84%;width:38%;height:8%;border-radius:12px;background:#C8A06A;opacity:.6}
.bk8tap{position:absolute;border:0;background:transparent;border-radius:24px;cursor:pointer;touch-action:none;box-shadow:0 0 0 4px rgba(255,226,122,.0);animation:bk8tapg 1.4s ease-in-out infinite;z-index:2}
.bk8tap:disabled{animation:none}
@keyframes bk8tapg{0%,100%{box-shadow:0 0 0 4px rgba(255,226,122,.15)}50%{box-shadow:0 0 0 8px rgba(255,226,122,.75)}}
.bk8fing{position:absolute;left:46%;top:78%;width:12%;z-index:2}
.bk8fing svg{width:100%;height:auto}
.bk8end .bk8endpic{width:150px;height:130px;margin:0 auto}.bk8end .bk8endpic svg{width:100%;height:100%}
.bk8endl{display:flex;gap:6px;justify-content:center;margin:4px 0}.bk8endl i{font:700 26px/1.3 'Baloo 2',sans-serif;font-style:normal;color:#6A3A1A;background:#FFF4C8;border:2px solid #FFB81C;border-radius:10px;min-width:36px}
.bk8.calm *,.bk8.calm *::before{animation:none!important;transition:none!important}
body.lite .bk8 *{animation:none!important}
@media (prefers-reduced-motion:reduce){.bk8 *{animation:none!important;transition:none!important}}
@media (max-width:600px),(max-height:500px){.bk8got i{min-width:30px;height:30px;font-size:19px}.bk8bub{font-size:16px;padding:4px 10px}.bk8go{min-height:56px;min-width:170px;font-size:22px}.bk8bell{width:56px;height:56px}
 .bk8 .ch5opt b{font-size:17px}.bk8 .ch5opt small{font-size:14px}.bk8 .ch5mh small{font-size:14px}}
@media (max-height:500px){.bk8top{min-height:0}.bk8stage{min-height:200px}.bk8 .phead .gtitle{display:none}.bk8 .phead{min-height:0;height:4px;overflow:visible}
 .bk8end .bk8endpic{display:none}.bk8end h2{font-size:22px;margin:2px 0}.bk8endl{margin:2px 0}.bk8endl i{font-size:20px}}`;document.head.appendChild(css);
window.__BK8={T,gate,ver:'2026-11-28',hud:[],heroBike,faceBig,helmetSVG,walker,carTop,mkMap,genRoute};
}catch(e){console.log('m8sg_bike8',e)}}).toString()+')()')})();

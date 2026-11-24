/* ================= m8_globe 地球儀（畫面 globe8；遊樂園「小遊戲」區、「大自然」頁）=================
 * 2026-11-22 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室。
 * 這個檔案由 qa/globe/assemble.py 產生（src.js＋art.js＋geo.json），要改請改原始檔再組一次。
 *
 * 地圖資料授權：
 *   陸地、國家輪廓取自 Natural Earth（https://www.naturalearthdata.com）1:110m（台灣、新加坡、荷蘭、瑞士用 1:50m），
 *   經 npm 套件 world-atlas@2.0.2（TopoJSON）轉出。Natural Earth 是 public domain（公有領域），可自由使用，不需標示。
 *   處理：同一洲的國家合併成洲的輪廓（俄羅斯以東經 60 度切成歐洲、亞洲兩塊），只留 31 國的國界；
 *   座標取到 0.1 度（台灣、新加坡 0.01 度）並簡化；五大洋分界用 1 度格子事先算好（qa/globe/mkgeo.js）。
 *   北極海冰是自己畫的示意形狀（不是即時資料）。
 *
 * 玩法：手指轉地球（放開有慣性），點一下念名字。
 *   點陸地念洲名；點到選定的 31 國念國名、跳出小卡（原創小圖＋一句話）；點海念洋名；點北極白色海冰念「北極」。
 *   南極洲、北極也有小卡。其他國家不標名字、不畫國界，點了只念洲名。不畫任何國界線；點到 31 國之一時，只有那一國的範圍淡淡亮起。
 *   台灣用 1:50m 的島形＋一顆小星星標示，不放國旗；點擊範圍只在海上放大（中心 1.2 度內、海岸 0.5 度內），點在其他陸地不算台灣。開場地球轉到台灣。
 *   「找找看」：寵物說「幫我找到太平洋！」，孩子轉地球去點。一輪 5 題，不扣分、不倒數。
 *     點錯念出那裡的名字＋「再找找看！」；同一題第二次錯：鏡頭自動轉到目標、目標發光（國家在畫面上太小時鏡頭一起拉近，下一題拉回）。
 *     小國家（2026-11-24 UX 審查）：找題時以題目為優先，點在題目國家中心約 22px（台灣海上 30px）內就算對；自由轉時小國用「離誰最近」分，見下面「點到哪裡」。
 *     題目是北極、南極洲、北極海、南極海時，地球會先自動上下轉，讓孩子看得到。
 *     簡單：七大洲、台灣、北極；中等：再加五大洋；高難度：再加 30 國（台灣以外）。
 * 寶石：找找看玩完一輪，每天第一次 3 顆、之後 1 顆（V2.globe8Day；大門每日上限用 __gateExt.gemDay 接）。自由轉不給寶石。
 * 開放：完成第 41 章；App 版還要有完整版 full（或以前的 stage9；5.4.0 起不賣 stage9）；網頁版跟章節同一個季密碼（照雨林盪藤蔓）。
 * 收集冊：點過的國家、南極洲、北極記在 V2.gl8seen，收集冊多一頁「地球儀」（window.__book19.add）。
 * 語音只念有真人錄音的句子（沒錄好以前只出字幕）；台詞表 lines/globe.tsv 由 qa/globe/assemble.py 從下面 LINES 產生。
 * 動畫：只有地球轉動（鏡頭）、淡入淡出、發光，沒有角色放大縮小。 */
/* 主程式在 (()=>{…})() 裡面，mods 接在它後面：用主程式留的 window.__ev（直接 eval）把這一段放進主程式的範圍執行（跟 m7c 同一個做法）。 */
(function(){if(typeof window.__ev!=='function'){console.log('globe8: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined')return;
/*LINES*/
const T={
"card":"地球儀，轉一轉，認識世界！",
"lock41":"完成第四十一章，就會打開喔！",
"again":"再點一下，就可以進去喔！",
"lockApp":"爸爸媽媽可以幫你打開新的冒險喔！",
"hi_tw":"我們住在這裡，台灣！",
"tip":"用手指轉一轉地球，點一下，就會告訴你名字！",
"f_menu":"找找看！要玩哪一種呢？",
"d_easy":"簡單","d_mid":"中等","d_hard":"高難度",
"f_start":"我說一個地方，你轉地球找一找，點一下！",
"f_again":"再找找看！",
"f_hint":"看，發亮的地方！",
"f_ok1":"找到了！你好厲害！","f_ok2":"答對了，就是這裡！","f_ok3":"哇，你找到了！",
"f_top":"地球轉一轉，看看最上面！","f_bottom":"地球轉一轉，看看最下面！",
"f_end":"全部找到了！你是地球小專家！",
"gem3":"送你三顆寶石！","gem1":"送你一顆寶石！",
"b_sec":"地球儀！",
"b_lock":"去地球儀點一點，就會收集到喔！",
"fact_pole":"北極熊住在北極，企鵝住在地球的南邊，牠們不會碰面喔！",
"n_as":"亞洲","n_eu":"歐洲","n_af":"非洲","n_na":"北美洲","n_sa":"南美洲","n_oc":"大洋洲","n_an":"南極洲",
"n_pa":"太平洋","n_at":"大西洋","n_io":"印度洋","n_ar":"北極海","n_so":"南極海","n_arc":"北極",
"n_tw":"台灣","n_jp":"日本","n_kr":"韓國","n_th":"泰國","n_vn":"越南","n_sg":"新加坡","n_my":"馬來西亞","n_id":"印尼","n_ph":"菲律賓","n_in":"印度",
"n_gb":"英國","n_fr":"法國","n_de":"德國","n_it":"義大利","n_es":"西班牙","n_nl":"荷蘭","n_ch":"瑞士","n_gr":"希臘","n_is":"冰島",
"n_us":"美國","n_ca":"加拿大","n_mx":"墨西哥","n_br":"巴西","n_ar2":"阿根廷","n_pe":"秘魯",
"n_eg":"埃及","n_ke":"肯亞","n_za":"南非","n_ma":"摩洛哥","n_au":"澳洲","n_nz":"紐西蘭",
"s_tw":"台灣，我們住在這裡，有可愛的台灣黑熊！",
"s_jp":"日本，有很漂亮的富士山！",
"s_kr":"韓國，有辣辣的泡菜！",
"s_th":"泰國，有溫和的大象！",
"s_vn":"越南，有香噴噴的河粉！",
"s_sg":"新加坡，有美麗的蘭花！",
"s_my":"馬來西亞，森林裡住著犀鳥！",
"s_id":"印尼，住著好大的科摩多龍！",
"s_ph":"菲律賓，有大眼睛的眼鏡猴！",
"s_in":"印度，有羽毛漂亮的孔雀！",
"s_gb":"英國，有紅色的雙層巴士！",
"s_fr":"法國，有一座高高的鐵塔！",
"s_de":"德國，有像童話故事一樣的城堡！",
"s_it":"義大利，有香香的披薩！",
"s_es":"西班牙，有一大鍋的海鮮飯！",
"s_nl":"荷蘭，有風車和鬱金香！",
"s_ch":"瑞士，山上的乳牛掛著鈴鐺！",
"s_gr":"希臘，海邊有藍白色的房子！",
"s_is":"冰島，有冰也有火山！",
"s_us":"美國，有舉著火炬的自由女神像！",
"s_ca":"加拿大，秋天有紅紅黃黃的楓葉！",
"s_mx":"墨西哥，有高高的仙人掌！",
"s_br":"巴西，雨林裡有大嘴巴的巨嘴鳥！",
"s_ar2":"阿根廷，有好大好大的瀑布！",
"s_pe":"秘魯，高山上有毛茸茸的羊駝！",
"s_eg":"埃及，沙漠裡有大大的金字塔！",
"s_ke":"肯亞，大草原上有長頸鹿和斑馬！",
"s_za":"南非，海邊住著小企鵝！",
"s_ma":"摩洛哥，有尖尖蓋子的塔吉鍋！",
"s_au":"澳洲，有跳得好遠的袋鼠！",
"s_nz":"紐西蘭，有不會飛的奇異鳥！",
"s_an":"南極洲好冷好冷，沒有國家，科學家在那裡做研究！",
"s_arc":"北極是結冰的大海，北極熊住在這裡！",
"q_as":"幫我找到亞洲！","q_eu":"幫我找到歐洲！","q_af":"幫我找到非洲！","q_na":"幫我找到北美洲！","q_sa":"幫我找到南美洲！","q_oc":"幫我找到大洋洲！","q_an":"幫我找到南極洲！",
"q_pa":"幫我找到太平洋！","q_at":"幫我找到大西洋！","q_io":"幫我找到印度洋！","q_ar":"幫我找到北極海！","q_so":"幫我找到南極海！","q_arc":"幫我找到北極！",
"q_tw":"幫我找到台灣！","q_jp":"幫我找到日本！","q_kr":"幫我找到韓國！","q_th":"幫我找到泰國！","q_vn":"幫我找到越南！","q_sg":"幫我找到新加坡！","q_my":"幫我找到馬來西亞！","q_id":"幫我找到印尼！","q_ph":"幫我找到菲律賓！","q_in":"幫我找到印度！",
"q_gb":"幫我找到英國！","q_fr":"幫我找到法國！","q_de":"幫我找到德國！","q_it":"幫我找到義大利！","q_es":"幫我找到西班牙！","q_nl":"幫我找到荷蘭！","q_ch":"幫我找到瑞士！","q_gr":"幫我找到希臘！","q_is":"幫我找到冰島！",
"q_us":"幫我找到美國！","q_ca":"幫我找到加拿大！","q_mx":"幫我找到墨西哥！","q_br":"幫我找到巴西！","q_ar2":"幫我找到阿根廷！","q_pe":"幫我找到秘魯！",
"q_eg":"幫我找到埃及！","q_ke":"幫我找到肯亞！","q_za":"幫我找到南非！","q_ma":"幫我找到摩洛哥！","q_au":"幫我找到澳洲！","q_nz":"幫我找到紐西蘭！"
};
/*END*/
/* ---------- 地點 ---------- */
// 洲：代號、顏色、中心（經、緯；鏡頭轉過去用）
const CONT={as:['#F7C873',95,40],eu:['#B9A2F0',18,52],af:['#F5A66E',20,4],na:['#8FD68A',-100,45],sa:['#F49AC1',-60,-16],oc:['#FF9C8A',138,-25],an:['#F2F8FF',0,-82]};
// 洋：格子代號 0～4 → 代號、中心
const OCN=[['pa',-160,4],['at',-35,18],['io',78,-22],['ar',null,76],['so',null,-63]];
// 31 國：代號（T 的 key 用 n_／s_／q_ 加代號；阿根廷 ar2，避免跟北極海 ar 撞名）、所屬洲
const CT=[['tw','as'],['jp','as'],['kr','as'],['th','as'],['vn','as'],['sg','as'],['my','as'],['id','as'],['ph','as'],['in','as'],
 ['gb','eu'],['fr','eu'],['de','eu'],['it','eu'],['es','eu'],['nl','eu'],['ch','eu'],['gr','eu'],['is','eu'],
 ['us','na'],['ca','na'],['mx','na'],['br','sa'],['ar2','sa'],['pe','sa'],['eg','af'],['ke','af'],['za','af'],['ma','af'],['au','oc'],['nz','oc']];
const CTOF={};CT.forEach(([k,c])=>CTOF[k]=c);
const NAME=k=>T['n_'+k]||'';
const KIND=k=>CONT[k]?'cont':CTOF[k]?'ctry':k==='arc'?'arc':'ocean';
// 有小卡的：31 國＋南極洲＋北極
const HASCARD=k=>!!CTOF[k]||k==='an'||k==='arc';
const POLAR={an:-1,so:-1,arc:1,ar:1};

/* ---------- 各國代表小圖（100×100，原創簡化圖；不用照片、不用國旗）---------- */
const OL='#5B4A86';
const BG=c=>`<rect width="100" height="100" rx="18" fill="${c}"/>`;
const GROUND=(y,c)=>`<path d="M0 ${y} Q25 ${y-3} 50 ${y} T100 ${y} V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="${c}"/>`;
const SEA=(y,c)=>`<path d="M0 ${y} Q12 ${y-2.5} 25 ${y} T50 ${y} T75 ${y} T100 ${y} V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="${c}"/>`;
const EYE=(x,y,r=2.6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#2A2238"/><circle cx="${x+r*.35}" cy="${y-r*.35}" r="${r*.38}" fill="#fff"/>`;
const SUN=(x,y,r,c='#FFD45A')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const CLOUD=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="10" ry="5" fill="#fff"/><ellipse cx="6" cy="-3" rx="6" ry="5" fill="#fff"/><ellipse cx="-5" cy="-2" rx="5" ry="4" fill="#fff"/></g>`;
const FLOWER=(x,y,r,c,cc='#FFE27A')=>`<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a=>`<circle cx="${(Math.cos(a*Math.PI/180)*r).toFixed(1)}" cy="${(Math.sin(a*Math.PI/180)*r).toFixed(1)}" r="${r*.75}" fill="${c}"/>`).join('')}<circle r="${r*.55}" fill="${cc}"/></g>`;
const MAPLE=(x,y,s,c,rot=0)=>{const pts=[[0,-12],[3,-6],[8,-9],[7,-3],[13,-2],[8,3],[10,6],[2,5],[1,12],[-1,12],[-2,5],[-10,6],[-8,3],[-13,-2],[-7,-3],[-8,-9],[-3,-6]];
 return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M${pts.map(p=>p.join(' ')).join(' L')}Z" fill="${c}" stroke="rgba(0,0,0,.12)" stroke-width="1" stroke-linejoin="round"/><path d="M0 -6 V14" stroke="rgba(90,40,20,.45)" stroke-width="1.4"/></g>`};
const PIC={
// 台灣：台灣黑熊（胸前白色 V 字）
tw:()=>`${BG('#DDF2D6')}<path d="M0 58 L22 34 L36 48 L58 22 L82 46 L100 34 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#9CCF8A"/><path d="M52 28 L58 22 L64 28 L60 27 L58 30 L55 27Z" fill="#fff"/>
<ellipse cx="50" cy="76" rx="25" ry="20" fill="#2E2A33"/><path d="M33 62 Q50 84 67 62 L63 61 Q50 76 37 61Z" fill="#F4E7C8"/>
<ellipse cx="34" cy="92" rx="8" ry="5" fill="#3A3540"/><ellipse cx="66" cy="92" rx="8" ry="5" fill="#3A3540"/>
<circle cx="35" cy="30" r="7" fill="#2E2A33"/><circle cx="65" cy="30" r="7" fill="#2E2A33"/><circle cx="35" cy="30" r="3.4" fill="#5A5060"/><circle cx="65" cy="30" r="3.4" fill="#5A5060"/>
<circle cx="50" cy="44" r="18" fill="#2E2A33"/><ellipse cx="50" cy="51" rx="9" ry="6.5" fill="#C9A27E"/><ellipse cx="50" cy="47.6" rx="3.4" ry="2.3" fill="#1E1A22"/>
<path d="M46.5 52 Q50 55 53.5 52" stroke="#5A3A2A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<circle cx="42" cy="40" r="3.2" fill="#fff"/><circle cx="42.6" cy="40.6" r="1.8" fill="#1A1620"/><circle cx="58" cy="40" r="3.2" fill="#fff"/><circle cx="58.6" cy="40.6" r="1.8" fill="#1A1620"/>
<ellipse cx="37" cy="49" rx="3" ry="1.8" fill="#FF9DB5" opacity=".55"/><ellipse cx="63" cy="49" rx="3" ry="1.8" fill="#FF9DB5" opacity=".55"/>`,
// 日本：富士山、櫻花
jp:()=>`${BG('#DCEBFF')}${CLOUD(76,22,.9)}<path d="M4 84 L40 32 Q50 22 60 32 L96 84Z" fill="#6E86D6"/><path d="M40 32 Q50 22 60 32 L67 42 L61 39 L56 45 L50 38 L44 45 L39 39 L33 42Z" fill="#fff"/>${GROUND(82,'#9AD58A')}
<path d="M-2 14 Q14 18 26 12 Q34 8 40 14" stroke="#8A5A3A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M18 15 Q22 24 20 30" stroke="#8A5A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>
${FLOWER(10,12,3.4,'#FFB3CB')}${FLOWER(26,10,3.2,'#FFC6D8')}${FLOWER(38,16,3,'#FFB3CB')}${FLOWER(20,30,3.2,'#FFC6D8')}<ellipse cx="50" cy="94" rx="10" ry="2" fill="#FFC6D8" opacity=".8"/>`,
// 韓國：泡菜
kr:()=>`${BG('#FFE9DA')}<ellipse cx="50" cy="84" rx="34" ry="5" fill="rgba(90,60,40,.15)"/>
<path d="M24 50 Q30 30 44 36 Q48 46 42 54Z" fill="#E8603A"/><path d="M40 50 Q46 24 62 32 Q64 44 58 54Z" fill="#EF7448"/><path d="M56 52 Q66 32 78 42 Q76 52 70 56Z" fill="#E25530"/>
<path d="M33 40 Q36 46 37 52 M51 34 Q53 44 52 52 M68 42 Q69 48 67 54" stroke="#F8E3B0" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M28 36 q3 -5 8 -3 M58 28 q4 -4 8 0 M72 40 q4 -3 7 1" stroke="#8CC66A" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M16 52 H84 Q82 80 50 82 Q18 80 16 52Z" fill="#F7F3EA" stroke="${OL}" stroke-width="2"/><path d="M20 60 H80" stroke="#6E9BE0" stroke-width="3"/><ellipse cx="50" cy="52" rx="34" ry="4" fill="#E9E2D2" stroke="${OL}" stroke-width="2"/>
<circle cx="30" cy="70" r="2" fill="#6E9BE0"/><circle cx="50" cy="72" r="2" fill="#6E9BE0"/><circle cx="70" cy="70" r="2" fill="#6E9BE0"/>`,
// 泰國：大象
th:()=>`${BG('#E2F3DD')}${SUN(80,20,8)}${GROUND(80,'#A6D98E')}
<rect x="30" y="62" width="9" height="20" rx="4" fill="#9AA3BD"/><rect x="58" y="62" width="9" height="20" rx="4" fill="#9AA3BD"/>
<ellipse cx="50" cy="56" rx="26" ry="18" fill="#AEB6CE"/><rect x="38" y="64" width="9" height="19" rx="4" fill="#AEB6CE"/><rect x="64" y="64" width="9" height="19" rx="4" fill="#AEB6CE"/>
<path d="M76 54 q6 2 6 8" stroke="#8E96AE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<circle cx="28" cy="46" r="15" fill="#AEB6CE"/><path d="M30 34 Q48 30 46 52 Q42 62 32 56Z" fill="#C3CADF" stroke="#98A0BA" stroke-width="1.5"/>
<path d="M17 50 Q10 60 14 70 Q16 76 22 74 Q20 66 24 58" stroke="#AEB6CE" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M21 52 q-3 4 -1 7" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>${EYE(25,42,2.2)}<ellipse cx="20" cy="47" rx="2.6" ry="1.5" fill="#FF9DB5" opacity=".6"/>
<circle cx="12" cy="20" r="2" fill="#8FD4FF"/><circle cx="18" cy="14" r="2.4" fill="#8FD4FF"/><circle cx="9" cy="10" r="1.6" fill="#8FD4FF"/>`,
// 越南：河粉
vn:()=>`${BG('#FFF1D6')}<path d="M36 22 q-5 -6 0 -12 M50 20 q-5 -6 0 -12 M64 22 q-5 -6 0 -12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
<path d="M58 30 L94 12 M62 34 L96 18" stroke="#B5793F" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="50" cy="48" rx="36" ry="10" fill="#FBF2D8"/>
<path d="M22 46 q6 -4 12 0 t12 0 t12 0 t12 0 M24 50 q6 -4 12 0 t12 0 t12 0 t12 0" stroke="#F1DDA8" stroke-width="2.4" fill="none"/>
<ellipse cx="36" cy="44" rx="6" ry="3" fill="#F2A2A0"/><ellipse cx="60" cy="45" rx="7" ry="3" fill="#E89590"/>
<path d="M44 42 q4 -6 8 -2 M68 42 q3 -5 7 -1 M30 48 q3 -4 6 -1" stroke="#5DB36A" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="76" cy="47" r="4" fill="#C8E87A" stroke="#8CB84A" stroke-width="1.4"/>
<path d="M14 48 H86 Q84 80 50 84 Q16 80 14 48Z" fill="#FFFFFF" stroke="${OL}" stroke-width="2"/><path d="M22 62 Q50 70 78 62" stroke="#4E86D8" stroke-width="3" fill="none"/><path d="M30 72 Q50 77 70 72" stroke="#4E86D8" stroke-width="2" fill="none"/>`,
// 新加坡：蘭花
sg:()=>{const orch=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${[-90,-18,54,126,198].map(a=>`<ellipse cx="0" cy="-9" rx="5.5" ry="9" fill="#D48AE0" transform="rotate(${a+90})"/>`).join('')}<path d="M-6 2 Q0 14 6 2 Q0 6 -6 2Z" fill="#9A3FB0"/><circle r="4" fill="#F7E16A"/><circle r="1.6" fill="#9A3FB0"/></g>`;
 return `${BG('#F3E6FF')}<path d="M50 96 Q48 70 56 50 Q62 36 72 30" stroke="#5DA86A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M50 92 Q30 84 22 70 Q40 72 50 86Z" fill="#6FBF7A"/><path d="M52 90 Q72 84 80 70 Q62 74 52 86Z" fill="#5DB36A"/>
 ${orch(36,40,1.45)}${orch(70,28,1.05)}${orch(66,58,.9)}`},
// 馬來西亞：犀鳥
my:()=>`${BG('#E0F2E4')}<path d="M0 30 Q20 22 30 32 Q16 36 0 34Z" fill="#6FBF7A"/><path d="M100 70 Q84 60 74 66 Q88 74 100 74Z" fill="#5DB36A"/>
<path d="M6 80 Q50 70 96 82" stroke="#8A5A3A" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M44 66 L40 92 L52 92 L50 66Z" fill="#fff"/><path d="M42 82 H52" stroke="#2A2A35" stroke-width="3"/>
<ellipse cx="50" cy="58" rx="15" ry="20" fill="#2A2A35"/><path d="M38 48 Q42 66 52 74 Q40 70 36 58Z" fill="#3A3A48"/>
<circle cx="56" cy="36" r="12" fill="#2A2A35"/><path d="M62 30 Q80 26 92 36 Q80 44 64 42Z" fill="#F7B23A" stroke="#C8781E" stroke-width="1.5"/><path d="M60 28 Q72 18 86 26 Q74 28 62 32Z" fill="#E8503A"/>
<circle cx="58" cy="34" r="4" fill="#5AC8E8"/><circle cx="58" cy="34" r="2" fill="#1A1A22"/><path d="M47 77 l-2 7 M53 77 l2 7" stroke="#C8781E" stroke-width="2.5" stroke-linecap="round"/>`,
// 印尼：科摩多龍
id:()=>`${BG('#F6ECD2')}${GROUND(74,'#C9D98A')}<path d="M90 70 Q96 52 82 50" stroke="#8D8A5A" stroke-width="7" fill="none" stroke-linecap="round"/>
<ellipse cx="58" cy="64" rx="26" ry="11" fill="#8D8A5A"/><path d="M40 60 q6 -4 12 0 t12 0 t12 0" stroke="#A7A472" stroke-width="2.5" fill="none"/>
<path d="M40 70 l-6 12 h8 M56 72 l-2 12 h8 M70 70 l4 12 h8" stroke="#7A774C" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M36 62 Q22 56 12 60 Q8 64 12 68 Q24 72 38 68Z" fill="#8D8A5A"/><path d="M12 66 Q20 69 30 67" stroke="#5E5B38" stroke-width="1.5" fill="none"/>${EYE(22,60,2.4)}
<path d="M10 66 L2 64 M10 66 L3 69" stroke="#F2C440" stroke-width="2" stroke-linecap="round"/>`,
// 菲律賓：眼鏡猴
ph:()=>`${BG('#E3F0DA')}<rect x="62" y="0" width="12" height="100" fill="#8A5A3A"/><path d="M68 20 q8 -2 10 4 M68 60 q-6 -4 -12 0" stroke="#6E452A" stroke-width="2" fill="none"/>
<path d="M30 20 Q40 6 44 22Z" fill="#C49A6C"/><path d="M58 20 Q50 6 46 22Z" fill="#C49A6C"/>
<ellipse cx="46" cy="70" rx="15" ry="18" fill="#B88A5C"/><path d="M40 86 Q30 98 20 94" stroke="#B88A5C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M56 62 Q64 60 66 64 M56 80 Q64 80 66 84" stroke="#B88A5C" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="44" cy="38" r="19" fill="#C49A6C"/><circle cx="36" cy="36" r="9" fill="#F2E2C8"/><circle cx="53" cy="36" r="9" fill="#F2E2C8"/>
<circle cx="36" cy="36" r="7" fill="#E3A33A"/><circle cx="53" cy="36" r="7" fill="#E3A33A"/><circle cx="36" cy="36" r="4.6" fill="#1E1A14"/><circle cx="53" cy="36" r="4.6" fill="#1E1A14"/><circle cx="38" cy="34" r="1.6" fill="#fff"/><circle cx="55" cy="34" r="1.6" fill="#fff"/>
<path d="M42 48 Q44.5 50 47 48" stroke="#6E452A" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
// 印度：孔雀
in:()=>{let tail='';for(let i=0;i<9;i++){const a=-160+i*17.5,r=36;const x=50+Math.cos(a*Math.PI/180)*r,y=70+Math.sin(a*Math.PI/180)*r;
  tail+=`<path d="M50 70 L${x.toFixed(1)} ${y.toFixed(1)}" stroke="#3E8F62" stroke-width="2"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7" ry="9" fill="#4FAF7A" transform="rotate(${a+90} ${x.toFixed(1)} ${y.toFixed(1)})"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="#F2C440"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#2F5FC0"/>`}
 return `${BG('#E2F4F2')}${tail}<ellipse cx="50" cy="74" rx="10" ry="14" fill="#2F6FD0"/><path d="M50 62 Q46 48 50 40" stroke="#2F6FD0" stroke-width="8" fill="none" stroke-linecap="round"/>
 <circle cx="51" cy="38" r="6" fill="#2F6FD0"/><path d="M56 38 l6 2 l-6 2Z" fill="#E8A23A"/>${EYE(52.5,36.5,1.6)}<path d="M50 32 l-2 -7 M52 32 l0 -8 M54 32 l2 -7" stroke="#2F6FD0" stroke-width="1.2"/><circle cx="48" cy="25" r="1.6" fill="#2F6FD0"/><circle cx="52" cy="24" r="1.6" fill="#2F6FD0"/><circle cx="56" cy="25" r="1.6" fill="#2F6FD0"/>
 <path d="M46 88 l-2 8 M54 88 l2 8" stroke="#B8823A" stroke-width="2.5" stroke-linecap="round"/>`},
// 英國：紅色雙層巴士
gb:()=>`${BG('#E6EEF8')}${CLOUD(22,18,.9)}${GROUND(84,'#B9C2D6')}<path d="M0 90 H100" stroke="#fff" stroke-width="2" stroke-dasharray="8 6"/>
<rect x="18" y="26" width="64" height="54" rx="8" fill="#E2483D" stroke="${OL}" stroke-width="2"/><path d="M18 52 H82" stroke="#B8322A" stroke-width="3"/>
${[24,38,52,66].map(x=>`<rect x="${x}" y="32" width="11" height="12" rx="2.5" fill="#BFE6FF"/><rect x="${x}" y="58" width="11" height="11" rx="2.5" fill="#BFE6FF"/>`).join('')}
<rect x="20" y="72" width="60" height="3" fill="#F2C440"/><circle cx="32" cy="82" r="7" fill="#3A3448"/><circle cx="32" cy="82" r="3" fill="#C9C4D8"/><circle cx="68" cy="82" r="7" fill="#3A3448"/><circle cx="68" cy="82" r="3" fill="#C9C4D8"/><circle cx="80" cy="74" r="2" fill="#FFE27A"/>`,
// 法國：鐵塔
fr:()=>`${BG('#EFE6FF')}${CLOUD(20,26,.8)}${CLOUD(80,40,.7)}${GROUND(86,'#A6D98E')}
<path d="M50 8 L52 22 L58 50 L66 70 L78 90 H64 Q56 76 50 76 Q44 76 36 90 H22 L34 70 L42 50 L48 22Z" fill="#9A7E6C" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M40 52 H60 M33 72 H67 M46 30 H54" stroke="#6E5646" stroke-width="3.5"/><path d="M44 52 L56 70 M56 52 L44 70 M47 32 L53 50 M53 32 L47 50" stroke="#7E6656" stroke-width="1.4"/><path d="M50 8 V2" stroke="#6E5646" stroke-width="2"/>`,
// 德國：城堡
de:()=>`${BG('#DFEEFF')}${CLOUD(82,18,.8)}<path d="M0 78 Q30 60 56 70 Q80 64 100 74 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#8CCB7A"/>
<rect x="28" y="44" width="44" height="30" fill="#F6F1E8" stroke="${OL}" stroke-width="1.8"/><path d="M28 44 v-4 h6 v4 h6 v-4 h6 v4 h6 v-4 h6 v4 h6 v-4 h6 v4" fill="#F6F1E8" stroke="${OL}" stroke-width="1.6"/>
<rect x="18" y="34" width="14" height="40" fill="#F6F1E8" stroke="${OL}" stroke-width="1.8"/><path d="M16 35 L25 14 L34 35Z" fill="#5B7FD6" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<rect x="66" y="28" width="16" height="46" fill="#F6F1E8" stroke="${OL}" stroke-width="1.8"/><path d="M64 29 L74 6 L84 29Z" fill="#5B7FD6" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<rect x="44" y="30" width="12" height="16" fill="#F6F1E8" stroke="${OL}" stroke-width="1.8"/><path d="M42 31 L50 18 L58 31Z" fill="#6E8FE0" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M44 74 V62 Q50 55 56 62 V74Z" fill="#A86F4A"/><rect x="22" y="44" width="6" height="8" rx="3" fill="#8FC8F0"/><rect x="71" y="38" width="6" height="8" rx="3" fill="#8FC8F0"/><rect x="47" y="35" width="6" height="7" rx="3" fill="#8FC8F0"/>
<circle cx="12" cy="80" r="7" fill="#5DA86A"/><circle cx="90" cy="82" r="6" fill="#5DA86A"/>`,
// 義大利：披薩
it:()=>`${BG('#FFF0DA')}<circle cx="46" cy="52" r="34" fill="#E8B25E" stroke="${OL}" stroke-width="2"/><circle cx="46" cy="52" r="28" fill="#E2543B"/>
<path d="M28 40 q8 -6 16 0 q6 6 14 0 M24 58 q8 6 18 0 q8 -6 18 2 M36 72 q6 -4 14 0" stroke="#FFE08A" stroke-width="7" fill="none" stroke-linecap="round"/>
<circle cx="36" cy="46" r="4.6" fill="#B8322A"/><circle cx="58" cy="44" r="4.6" fill="#B8322A"/><circle cx="46" cy="64" r="4.6" fill="#B8322A"/><circle cx="62" cy="62" r="4" fill="#B8322A"/>
<path d="M48 36 q4 -6 8 -2 q-4 4 -8 2Z M30 62 q2 -6 8 -4 q-3 5 -8 4Z" fill="#3E9A4E"/>
<path d="M70 70 L92 84 Q88 92 80 92Z" fill="#E8B25E" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M74 74 L88 84 Q86 88 82 88Z" fill="#E2543B"/><circle cx="82" cy="83" r="2.2" fill="#B8322A"/>`,
// 西班牙：海鮮飯
es:()=>`${BG('#FFF2DA')}<path d="M6 56 H18 M82 56 H94" stroke="#2E2A33" stroke-width="6" stroke-linecap="round"/>
<ellipse cx="50" cy="58" rx="36" ry="24" fill="#2E2A33"/><ellipse cx="50" cy="56" rx="32" ry="20" fill="#F5C842"/>
${[[34,50],[44,62],[58,58],[64,48],[40,44],[52,48],[30,60],[66,62]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#6FBF5A"/>`).join('')}
<path d="M34 54 q-6 -8 2 -12 q6 2 4 8" stroke="#F28A72" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M60 52 q-6 -8 2 -12 q6 2 4 8" stroke="#F28A72" stroke-width="5" fill="none" stroke-linecap="round"/>
<ellipse cx="48" cy="64" rx="7" ry="4" fill="#2C2C4A" transform="rotate(-20 48 64)"/><ellipse cx="66" cy="62" rx="6" ry="3.6" fill="#2C2C4A" transform="rotate(25 66 62)"/>
<path d="M44 42 L56 42 L50 52Z" fill="#F7EE7A" stroke="#D8C440" stroke-width="1.4"/><path d="M14 30 q4 -8 0 -14 M24 28 q4 -8 0 -14" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
// 荷蘭：風車、鬱金香
nl:()=>{const tulip=(x,c)=>`<path d="M${x} 94 V80" stroke="#4E9A4E" stroke-width="2"/><path d="M${x-5} 74 Q${x-5} 84 ${x} 84 Q${x+5} 84 ${x+5} 74 L${x+2.5} 77 L${x} 72 L${x-2.5} 77Z" fill="${c}"/>`;
 return `${BG('#DDEFFF')}${CLOUD(18,20,.8)}${GROUND(78,'#8CCB7A')}<path d="M40 80 L44 40 H56 L60 80Z" fill="#A86F4A" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M42 40 Q50 30 58 40Z" fill="#7A4A30" stroke="${OL}" stroke-width="1.8"/>
 <path d="M46 80 V70 Q50 66 54 70 V80Z" fill="#6E3E28"/><circle cx="50" cy="54" r="3" fill="#BFE6FF"/>
 <g transform="translate(50 38) rotate(20)">${[0,90,180,270].map(a=>`<g transform="rotate(${a})"><rect x="-3" y="-34" width="6" height="32" fill="#F6F1E8" stroke="${OL}" stroke-width="1.4"/><path d="M-3 -30 H3 M-3 -22 H3 M-3 -14 H3" stroke="#B8A890" stroke-width="1"/></g>`).join('')}<circle r="3.2" fill="#5B4A86"/></g>
 ${tulip(12,'#E2483D')}${tulip(22,'#F7C842')}${tulip(32,'#F28AB8')}${tulip(70,'#E2483D')}${tulip(80,'#F28AB8')}${tulip(90,'#F7C842')}`},
// 瑞士：掛鈴鐺的乳牛、雪山
ch:()=>`${BG('#DDF0FF')}<path d="M0 60 L24 26 L40 46 L62 18 L90 52 L100 46 V100 H0Z" fill="#9FB6E0"/><path d="M18 34 L24 26 L30 34 L26 33 L24 36 L21 33Z M55 26 L62 18 L69 26 L65 25 L62 29 L59 25Z" fill="#fff"/>${GROUND(66,'#9AD58A')}
<path d="M32 30 Q26 22 30 18 M68 30 Q74 22 70 18" stroke="#E8D8B0" stroke-width="4" fill="none" stroke-linecap="round"/>
<ellipse cx="24" cy="40" rx="9" ry="5" fill="#fff" stroke="${OL}" stroke-width="1.6" transform="rotate(-20 24 40)"/><ellipse cx="76" cy="40" rx="9" ry="5" fill="#fff" stroke="${OL}" stroke-width="1.6" transform="rotate(20 76 40)"/>
<path d="M30 34 Q50 22 70 34 Q74 56 64 68 H36 Q26 56 30 34Z" fill="#fff" stroke="${OL}" stroke-width="1.8"/><path d="M58 30 Q68 32 69 44 Q60 44 56 36Z" fill="#3A3440"/><path d="M33 44 Q38 40 42 46 Q38 50 34 50Z" fill="#3A3440"/>
<ellipse cx="50" cy="64" rx="15" ry="9" fill="#F7B8C8" stroke="${OL}" stroke-width="1.6"/><ellipse cx="45" cy="64" rx="2.2" ry="3" fill="#C8607A"/><ellipse cx="55" cy="64" rx="2.2" ry="3" fill="#C8607A"/>${EYE(41,46,2.6)}${EYE(59,46,2.6)}
<path d="M34 72 Q50 80 66 72" stroke="#B8462E" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M44 78 H56 L58 90 H42Z" fill="#F2C440" stroke="#C8901E" stroke-width="1.8" stroke-linejoin="round"/><circle cx="50" cy="91" r="2.4" fill="#C8901E"/>`,
// 希臘：藍白房子、藍色圓頂
gr:()=>`${BG('#DDF0FF')}${SUN(82,18,8)}${SEA(70,'#4A9EE0')}<path d="M0 78 Q50 72 100 80" stroke="#8CC8F4" stroke-width="2" fill="none"/>
<rect x="10" y="44" width="26" height="30" fill="#fff" stroke="#B8C8DA" stroke-width="1.5"/><rect x="34" y="52" width="24" height="22" fill="#fff" stroke="#B8C8DA" stroke-width="1.5"/><rect x="56" y="40" width="30" height="34" fill="#fff" stroke="#B8C8DA" stroke-width="1.5"/>
<path d="M58 40 Q71 22 84 40Z" fill="#2F6FD0"/><path d="M71 22 V16 M68 18 H74" stroke="#F2C440" stroke-width="2"/>
<path d="M18 74 V62 Q22 58 26 62 V74Z M64 74 V60 Q69 55 74 60 V74Z" fill="#2F6FD0"/><rect x="40" y="58" width="8" height="8" rx="1.5" fill="#2F6FD0"/><rect x="14" y="50" width="6" height="6" rx="1.5" fill="#2F6FD0"/><rect x="78" y="48" width="6" height="7" rx="1.5" fill="#2F6FD0"/>`,
// 冰島：冰和火山
is:()=>`${BG('#DCE9F8')}<circle cx="50" cy="14" r="7" fill="#fff" opacity=".9"/><circle cx="60" cy="10" r="6" fill="#fff" opacity=".8"/><circle cx="42" cy="8" r="5" fill="#fff" opacity=".7"/>
<path d="M8 80 L38 28 H62 L92 80Z" fill="#8A7468" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M38 28 H62 L58 34 Q50 30 42 34Z" fill="#F28A3A"/><path d="M44 30 Q50 22 56 30" fill="#FFC24A"/>
<path d="M38 28 L30 42 L36 40 L40 46 L44 38 L48 40 L50 30Z M62 28 L72 44 L66 42 L62 48 L58 38 L54 40 L52 30Z" fill="#fff"/>${SEA(78,'#7FB8E8')}
<path d="M10 84 L22 80 L32 84 L28 90 H14Z" fill="#fff" stroke="#A8C8E8" stroke-width="1.5"/><path d="M66 86 L80 82 L90 86 L86 92 H70Z" fill="#fff" stroke="#A8C8E8" stroke-width="1.5"/>`,
// 美國：舉著火炬的自由女神像
us:()=>`${BG('#E3F0FF')}${CLOUD(20,30,.8)}${SEA(86,'#6FB8E8')}
<path d="M30 98 V84 H70 V98Z" fill="#B8B0C8" stroke="${OL}" stroke-width="1.6"/><path d="M36 84 V76 H64 V84Z" fill="#CFC8DC" stroke="${OL}" stroke-width="1.6"/>
<path d="M40 76 Q38 56 42 44 H58 Q62 56 60 76Z" fill="#7CC3AE" stroke="${OL}" stroke-width="1.6"/><path d="M44 50 Q48 62 46 76 M54 50 Q52 62 55 76" stroke="#5EA892" stroke-width="1.6" fill="none"/>
<path d="M56 46 L66 20" stroke="#7CC3AE" stroke-width="7" stroke-linecap="round"/><rect x="62" y="12" width="9" height="8" rx="2" fill="#E8B850" stroke="#B8862A" stroke-width="1.4"/><path d="M66.5 12 Q60 4 66 0 Q68 5 71 4 Q74 8 66.5 12Z" fill="#FF9A3A"/><path d="M66.5 11 Q64 6 67 4 Q69 8 66.5 11Z" fill="#FFE27A"/>
<rect x="34" y="52" width="9" height="12" rx="1.5" fill="#9AD4C2" stroke="${OL}" stroke-width="1.4" transform="rotate(-10 38 58)"/>
<circle cx="50" cy="38" r="8" fill="#7CC3AE" stroke="${OL}" stroke-width="1.6"/><path d="M42 33 L38 26 M46 31 L44 23 M50 30 V22 M54 31 L56 23 M58 33 L62 26" stroke="#7CC3AE" stroke-width="2.6" stroke-linecap="round"/><path d="M42 34 Q50 28 58 34" stroke="#5EA892" stroke-width="2" fill="none"/>${EYE(47,39,1.4)}${EYE(53,39,1.4)}`,
// 加拿大：秋天的楓葉
ca:()=>`${BG('#FFF0DD')}${GROUND(84,'#C8D98A')}<path d="M46 86 V52 M46 66 L36 56 M46 60 L56 50" stroke="#8A5A3A" stroke-width="5" stroke-linecap="round"/>
<circle cx="30" cy="40" r="14" fill="#F0A03A"/><circle cx="48" cy="30" r="17" fill="#E8643A"/><circle cx="64" cy="42" r="14" fill="#F4C542"/><circle cx="44" cy="48" r="12" fill="#F08A2E"/>
${MAPLE(80,22,.9,'#E2503C',18)}${MAPLE(80,62,.75,'#F4C542',-24)}${MAPLE(20,72,.7,'#F08A2E',30)}`,
// 墨西哥：仙人掌
mx:()=>`${BG('#FFEFD5')}${SUN(78,20,9,'#FFC24A')}<path d="M0 74 Q30 64 60 72 T100 70 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#F2CF8A"/>
<rect x="42" y="24" width="16" height="62" rx="8" fill="#5DB36A" stroke="${OL}" stroke-width="1.8"/><path d="M42 56 H32 Q26 56 26 50 V38 Q26 33 31 33 Q36 33 36 38 V48 H42" fill="#5DB36A" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M58 48 H66 Q72 48 72 42 V32 Q72 27 67 27 Q62 27 62 32 V40 H58" fill="#5DB36A" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M50 30 V84 M31 38 V54 M67 32 V44" stroke="#3E8F4E" stroke-width="1.5"/>
${FLOWER(50,22,2.8,'#F28AB8')}<path d="M12 86 q4 -6 8 0 M80 84 q4 -6 8 0" stroke="#C8A060" stroke-width="2" fill="none"/>`,
// 巴西：雨林裡的巨嘴鳥
br:()=>`${BG('#DCF2DA')}<path d="M0 20 Q20 10 34 22 Q16 30 0 26Z M100 40 Q80 30 68 42 Q86 50 100 46Z M0 70 Q14 58 28 66 Q12 76 0 74Z" fill="#4E9A4E"/>
<path d="M10 88 Q50 78 94 88" stroke="#8A5A3A" stroke-width="5" fill="none" stroke-linecap="round"/>
<ellipse cx="44" cy="62" rx="14" ry="20" fill="#2A2A35"/><path d="M38 80 L34 92 L44 90Z" fill="#2A2A35"/><path d="M34 50 Q40 46 46 50 Q48 60 40 64 Q34 60 34 50Z" fill="#FFE27A"/>
<circle cx="44" cy="40" r="11" fill="#2A2A35"/><path d="M50 34 Q76 30 88 42 Q78 50 52 46Z" fill="#F7943A" stroke="#C8682A" stroke-width="1.4"/><path d="M82 38 Q88 40 88 42 Q84 44 80 44Z" fill="#2A2A35"/><path d="M52 40 Q70 40 86 42" stroke="#E2503C" stroke-width="2" fill="none"/>
<circle cx="45" cy="38" r="4.4" fill="#5AA2EE"/><circle cx="45" cy="38" r="2.2" fill="#14141C"/><path d="M42 82 l-2 6 M48 82 l1 6" stroke="#5AA2EE" stroke-width="2.4" stroke-linecap="round"/>`,
// 阿根廷：大瀑布
ar2:()=>`${BG('#DDF2F0')}<path d="M0 30 H34 V70 H0Z M66 26 H100 V70 H66Z" fill="#7A9A5A"/><path d="M0 26 Q16 20 34 28 V34 H0Z M66 22 Q84 16 100 24 V30 H66Z" fill="#5DA86A"/>
<rect x="34" y="28" width="32" height="48" fill="#8FD4FF"/><path d="M38 28 V76 M44 28 V76 M50 28 V76 M56 28 V76 M62 28 V76" stroke="#fff" stroke-width="2.4" opacity=".85"/>
${SEA(72,'#6FC0E8')}<circle cx="38" cy="76" r="7" fill="#fff" opacity=".9"/><circle cx="50" cy="78" r="8" fill="#fff" opacity=".9"/><circle cx="62" cy="76" r="7" fill="#fff" opacity=".9"/>
<path d="M22 70 A28 28 0 0 1 78 70" stroke="#FF8FA8" stroke-width="2.4" fill="none" opacity=".7"/><path d="M25 70 A25 25 0 0 1 75 70" stroke="#FFE27A" stroke-width="2.4" fill="none" opacity=".7"/><path d="M28 70 A22 22 0 0 1 72 70" stroke="#8FD48A" stroke-width="2.4" fill="none" opacity=".7"/>`,
// 秘魯：高山上的羊駝
pe:()=>`${BG('#E7F0FF')}<path d="M0 56 L22 30 L40 48 L64 20 L100 56 V100 H0Z" fill="#A8B8DE"/><path d="M58 27 L64 20 L70 27 L66 26 L64 29 L61 26Z" fill="#fff"/>${GROUND(70,'#A6D98E')}
<path d="M38 74 V90 M48 76 V92 M62 76 V92 M70 74 V90" stroke="#E8D6B4" stroke-width="6" stroke-linecap="round"/>
<path d="M30 66 Q28 54 40 54 Q46 48 54 54 Q62 48 68 56 Q78 56 76 68 Q78 80 66 80 Q58 84 50 80 Q40 84 34 78 Q26 76 30 66Z" fill="#F7EBD4" stroke="#D8C4A0" stroke-width="1.5"/>
<path d="M66 60 V34" stroke="#F7EBD4" stroke-width="13" stroke-linecap="round"/><path d="M58 30 Q60 20 66 22 Q70 18 74 24 Q78 28 74 32" fill="#F7EBD4" stroke="#D8C4A0" stroke-width="1.5"/>
<path d="M60 22 L58 12 L63 18Z M72 22 L76 12 L74 20Z" fill="#E8D6B4"/><ellipse cx="66" cy="34" rx="8" ry="9" fill="#FBF3E2"/>${EYE(63,31,1.8)}${EYE(70,31,1.8)}<path d="M64 38 Q66.5 40 69 38" stroke="#8A6A4A" stroke-width="1.3" fill="none"/>
<path d="M58 44 H74" stroke="#E2503C" stroke-width="3"/><path d="M60 44 l2 5 l2 -5 l2 5 l2 -5 l2 5 l2 -5" stroke="#F2C440" stroke-width="1.5" fill="none"/>`,
// 埃及：金字塔
eg:()=>`${BG('#FFF3D6')}${SUN(78,20,10,'#FFC24A')}<path d="M0 76 Q50 66 100 76 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#F2D48A"/>
<path d="M10 78 L40 30 L70 78Z" fill="#E8B866" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 30 L70 78 H50Z" fill="#CC9A4A"/>
<path d="M54 78 L74 46 L94 78Z" fill="#E8B866" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M74 46 L94 78 H80Z" fill="#CC9A4A"/>
<path d="M22 60 H58 M30 48 H50 M62 66 H86" stroke="#D8A85A" stroke-width="1.2"/>`,
// 肯亞：大草原的長頸鹿和斑馬
ke:()=>`${BG('#FFF0D2')}${SUN(20,18,8,'#FFC24A')}${GROUND(78,'#D8D07A')}<path d="M70 78 V48" stroke="#7A5A3A" stroke-width="4"/><ellipse cx="72" cy="44" rx="22" ry="6" fill="#6FA85A"/>
<path d="M34 80 V62 M44 80 V62" stroke="#E8A848" stroke-width="5" stroke-linecap="round"/><ellipse cx="40" cy="58" rx="12" ry="9" fill="#F2B24C"/><path d="M46 54 L54 22" stroke="#F2B24C" stroke-width="7" stroke-linecap="round"/>
<ellipse cx="57" cy="20" rx="8" ry="5" fill="#F2B24C"/><path d="M53 15 l-1 -5 M57 15 l1 -5" stroke="#B5652E" stroke-width="2" stroke-linecap="round"/>${EYE(56,19,1.5)}
<circle cx="36" cy="56" r="2.4" fill="#B5652E"/><circle cx="44" cy="60" r="2.2" fill="#B5652E"/><circle cx="40" cy="52" r="1.8" fill="#B5652E"/><circle cx="50" cy="40" r="1.8" fill="#B5652E"/><circle cx="52" cy="30" r="1.6" fill="#B5652E"/>
<g transform="translate(74 74)"><path d="M-8 6 V14 M6 6 V14" stroke="#fff" stroke-width="3.4"/><ellipse cx="0" cy="2" rx="10" ry="6" fill="#fff" stroke="#3A3440" stroke-width="1.2"/><path d="M-6 -3 V7 M-2 -4 V8 M2 -4 V8 M6 -3 V7" stroke="#3A3440" stroke-width="1.8"/><path d="M-9 0 L-16 -8" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M-12 -5 l2 2 M-14 -8 l2 2" stroke="#3A3440" stroke-width="1.4"/></g>`,
// 南非：海邊的小企鵝
za:()=>`${BG('#DDF0FF')}${SEA(58,'#5AAAE8')}<path d="M0 72 Q50 64 100 74 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#F2DCA0"/><ellipse cx="80" cy="76" rx="14" ry="8" fill="#A8A0B0"/>
<ellipse cx="44" cy="62" rx="15" ry="22" fill="#2A2A35"/><ellipse cx="44" cy="66" rx="11" ry="17" fill="#fff"/><path d="M34 60 Q44 66 54 60" stroke="#2A2A35" stroke-width="2.6" fill="none"/>
<circle cx="44" cy="36" r="11" fill="#2A2A35"/><path d="M36 38 Q44 30 52 38 Q48 46 44 46 Q40 46 36 38Z" fill="#fff"/><path d="M38 32 q3 -2 6 0" stroke="#F28AA0" stroke-width="2" fill="none"/>
<path d="M44 40 L52 43 L44 45Z" fill="#3A3440"/>${EYE(40,36,1.6)}<path d="M30 56 Q26 66 30 74" stroke="#2A2A35" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M38 84 h-5 M50 84 h5" stroke="#3A3440" stroke-width="3" stroke-linecap="round"/>`,
// 摩洛哥：塔吉鍋
ma:()=>`${BG('#FFEBDD')}<path d="M40 20 q-4 -6 0 -12 M54 16 q-4 -6 0 -12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
<ellipse cx="50" cy="80" rx="38" ry="9" fill="#C8643A" stroke="${OL}" stroke-width="1.8"/><ellipse cx="50" cy="76" rx="34" ry="6" fill="#D8743E"/>
<path d="M22 76 Q30 44 46 28 Q50 24 54 28 Q70 44 78 76Z" fill="#E08A4E" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M30 64 H70 M36 52 H64" stroke="#F2C440" stroke-width="2.4"/><path d="M32 70 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4" stroke="#4E86D8" stroke-width="1.8" fill="none"/>
<circle cx="50" cy="26" r="4" fill="#F2C440" stroke="${OL}" stroke-width="1.4"/><path d="M14 82 h72" stroke="#F2C440" stroke-width="1.6"/>`,
// 澳洲：袋鼠
au:()=>`${BG('#FFEBD6')}${SUN(80,18,8,'#FFC24A')}${GROUND(82,'#E8A868')}<path d="M8 90 q6 -10 12 0 M84 92 q4 -8 8 0" stroke="#6FA85A" stroke-width="2.4" fill="none"/>
<path d="M30 80 Q12 84 6 92" stroke="#D98A4E" stroke-width="7" fill="none" stroke-linecap="round"/>
<ellipse cx="42" cy="64" rx="16" ry="20" fill="#D98A4E"/><ellipse cx="46" cy="70" rx="9" ry="11" fill="#F2C49A"/><path d="M40 84 L56 88 M44 82 L60 84" stroke="#C47A3E" stroke-width="6" stroke-linecap="round"/>
<circle cx="47" cy="64" r="6" fill="#E8A060"/><path d="M44 60 l-1 -5 M50 60 l1 -5" stroke="#D98A4E" stroke-width="2.6" stroke-linecap="round"/>${EYE(45.6,64,1.3)}${EYE(49,64,1.3)}
<path d="M50 52 Q56 50 58 56" stroke="#D98A4E" stroke-width="5" stroke-linecap="round" fill="none"/>
<path d="M44 40 Q52 28 60 34 Q66 40 58 46 Q50 48 46 46Z" fill="#D98A4E"/><path d="M46 36 L44 22 L50 32Z M52 33 L54 20 L57 32Z" fill="#C47A3E"/>${EYE(54,38,1.8)}<circle cx="61.5" cy="40" r="1.6" fill="#3A2A20"/>`,
// 紐西蘭：奇異鳥
nz:()=>`${BG('#E2F2E2')}<path d="M0 60 Q12 40 30 34 Q18 46 14 62Z M100 56 Q88 38 70 34 Q82 46 86 60Z" fill="#5DA86A"/><path d="M8 62 Q14 48 26 40 M92 58 Q86 46 74 40" stroke="#3E8F4E" stroke-width="1.5" fill="none"/>${GROUND(80,'#8CCB7A')}
<ellipse cx="46" cy="62" rx="22" ry="17" fill="#9A6E45"/><path d="M30 58 q4 -3 8 0 M40 52 q4 -3 8 0 M44 66 q4 -3 8 0 M32 68 q4 -3 8 0 M54 56 q4 -3 8 0" stroke="#7A5232" stroke-width="1.6" fill="none"/>
<circle cx="64" cy="54" r="9" fill="#9A6E45"/><path d="M71 56 Q84 64 94 76" stroke="#E3C38A" stroke-width="3" fill="none" stroke-linecap="round"/>${EYE(66,52,1.6)}
<path d="M40 78 L38 88 L34 90 M38 88 L42 90 M52 78 L54 88 L50 90 M54 88 L58 90" stroke="#C8A060" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
// 南極洲：企鵝和冰山
an:()=>`${BG('#DCEFFF')}<path d="M54 64 L66 22 L78 34 L90 18 L98 64Z" fill="#fff" stroke="#A8C8E8" stroke-width="1.8" stroke-linejoin="round"/><path d="M66 22 L72 64 M90 18 L86 64" stroke="#CFE3F5" stroke-width="2"/>${SEA(62,'#6FB0E8')}<path d="M0 74 Q30 68 60 74 T100 74 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#F4F9FF"/>
<ellipse cx="34" cy="64" rx="14" ry="20" fill="#2A2A35"/><ellipse cx="34" cy="68" rx="10" ry="15" fill="#fff"/><path d="M26 44 Q34 52 42 44 Q44 52 40 54 Q34 56 28 54Z" fill="#FFC24A" opacity=".85"/>
<circle cx="34" cy="40" r="10" fill="#2A2A35"/><path d="M26 42 q3 4 6 2" stroke="#F7A23A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 42 L42 44 L34 46Z" fill="#F2A13A"/>${EYE(37,38,1.6)}
<path d="M22 58 Q18 66 22 74 M46 58 Q50 66 46 74" stroke="#2A2A35" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M28 84 h-5 M40 84 h5" stroke="#F2A13A" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="58" cy="78" rx="8" ry="9" fill="#B8BCC8"/><circle cx="58" cy="68" r="6" fill="#2A2A35"/><ellipse cx="58" cy="70" rx="4" ry="3" fill="#fff"/>${EYE(56.6,68,1.2)}${EYE(60,68,1.2)}`,
// 北極：海冰、北極熊、北極光
arc:()=>`${BG('#25306A')}<path d="M0 30 Q20 12 40 26 T80 20 T100 22 V40 Q80 30 60 40 T20 40 T0 46Z" fill="#6FE8B4" opacity=".55"/><path d="M0 22 Q30 6 54 18 T100 12 V22 Q76 16 54 28 T0 32Z" fill="#B48CFF" opacity=".45"/>
<circle cx="14" cy="12" r="1.2" fill="#fff"/><circle cx="84" cy="34" r="1" fill="#fff"/><circle cx="60" cy="8" r="1.2" fill="#fff"/>${SEA(70,'#3E74C8')}
<path d="M6 74 L20 64 L84 62 L96 72 L88 82 H12Z" fill="#F4F9FF" stroke="#A8C8E8" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M30 66 Q28 50 44 48 H62 Q76 48 76 60 V66Z" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.6"/><rect x="32" y="60" width="9" height="10" rx="4" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.4"/><rect x="62" y="60" width="9" height="10" rx="4" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.4"/>
<path d="M72 52 Q80 44 88 50 Q92 56 86 60 Q80 62 74 60Z" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.6"/><circle cx="76" cy="46" r="3" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.4"/><circle cx="89.5" cy="54" r="1.8" fill="#2A2238"/>${EYE(82,51,1.4)}`
};


/* ---------- 地圖資料 ---------- */
const GEO=/*GEO*/{"q":10,"cont":{"as":"-oCmfYHcMAKSUKIAKJGQKYCcCeFQHcpBIRiBHYNIReASIgBGJRHHFVNTXERFGRDXJAAJEDHCNNANJDLJLDJDAJBBIBMJQXGLAXHJRDPHRBBKEQJUQENQJEBBFBBEJEGIEEBCGMBELCHEbFPHTFKKDIQMLKPFXNLLTBJJMLQDAJQDWOSHOACLbDJLRJJNUJITMROPAPLDELMFDPDPLBdvBRX3BhBVBLJHGLHbJTDHVJAFOGIbGJBZRPRDNiBvBSLMPIlBBhBPNXLPRXRHMGOPMPCHMJURIRAEQRABVPtBAPOAIRERKJMDcXILANBJERIFGRAFNBpBgBBKLMBSHKCODKHGDKTWDLDKKgBBQGOHMCWHKFYDaHQjBXLCLEGaDSPYEGLENQFKBKDKHMRACHFLJEBBNEBHNAXDAPJJbNXXNLTNAHbLJBFPGpBHRAhBLBHPGFRFHLHFRSRwBPcJmBRcNgCAYDUbLNCZYIIFGVSPEFQNOlBDfAbB7BKVCHaJCPBTJXGTQTGLSPaJBNGFHLCEJBDOfKDEHOHAHBHCFGFGJBOGKGCGFALDLEHECAFQEcBwBuBCBBHBDCPINMFaFORIDADJRHFHNJCDFBJCLBDJALFBJDDLAHFAHJFLCLFJANFDJAFTHfJRNJBFCJHNDVBDFFABFJAFBNAFMCMDGDOFIECBICEAIDKFGAIJGLSFQNOHCNUBOCMLWJIJEFMAEFKFEFQXeJAIaNkBGGBCGKEOKWKOBQEIFKIILBRENLdBPKVCDHNDTMVALUNKKQLKWSeCIOmBBYMYGiBAiBNcHYESBYKCKDMLILCFGCEuBHcJCBMCUDGHSFOLIAEEMIKJKNKBGDPBDPDHFDAJGNSDOJeDeGCEDOEWPGGONAESUFQINMFKPDBPHSGIDIXGHSLGAGUBAOSEQBESDOTBPEXHRDJECKLMPAPOKQDEQWULCOqBWeAkCVWIgBCYLGGcAGKfOSIDGUGNOIGsCIKEyBISIkBDGVUGaHBJUAyBUHFaPsBxBMKaLeGKDKLODIHaCMLcGmBQeKSFUAOJUAeFSOHMWUWHqBFEPcHsBGUBUJMJSAaDSGaCeOMBKFYC k4CzBAhERQTEDFZAIQOGFWJQlBSPAdUFJHBDIAIPKWGOABGdAHMREHKcEKGgBHCHGfWLQWWMSAgBNWD muC7FNNPFBECGIMUICEQGOAICGBFFlBN 8zCpEBQEGEIEFAJJN moCsDOOKQIAKJCHeLBHNAEJNHLRORBJWRXBFNARRNBTHdBGVHHMNCJGXHHKNAPCBaJGJQBSCSMOOFQEEQIEYEYcIISK 8wC3BWFGPPKPALANAEMaA qvCrCNEDIUCEHFF -vCsBCLMBCHBPJCBNIJFBHMFaEQGI 6sCSYAUOCDPTNDTEfARDDNSRMIkBIAJJEHLRHUZDFSXALLFHGKQTHDGCINMCUNFCzBLDHGGSDUHAFOIOCOKgBEISOQFYB mrCtGZOSEKFIFBDHB 6rCpFOASIBLdDbCAIQEMF -pCnFMCEHjBFLAIKKCGGIF 6jC_DCHmBBGIkBHINeDYLVHVKnBAREXINCHDjBIDKRAOUYBQFIB ohCVCNIJOBKNDXBfVAPSZQHMPQZqBPSFQHQROJQPMTWBKsBFSRaVSVWAQNMPOJHPMHIA qQkaUGSBCHSFDDXBHFPJHICEECGOJE kzB2EDTHFRDHQDcIgBOJKNKV ukCsLPGBSKIWGMAEHHHFLPJ ksCoPLfJPJQBQMSQQKFDL wrC-HJQSBGFDRJK 0sCoGEGCMMADLQSBRHHFLFFLOEG gvCoFCXFRHUHJGPFHXMFOGKLIFHJCNLDGIQMGMIGJQGEKOABQQJER iqC6FZRKOOMMOKUEPNLJN usCsLBHGNDPLHDPEPMBICaJBLGDBJPKHMDHNMRDJGCIGEFGBHJMDIAUIHCgBGSMAMFGGCF osCkHBKMFMAAHJJLFAKAK uuC0HGXPGAFGLJFAOFCDMMBAILQSBGF 24CwYRTAVHPEJJNZHjBBbVNGAQjBDVJXAUPNfLJJIESLGHOUGKMUMOMoBGWDUkBOJoBcOYDYIMWEKbAP s6CwbOIEVbFRTfOJVVADUKOWCGcGQWVeJ 4yC-UKMMDIKOFEFLLHGJDFLLGAK uU-VEGQASGNJCBABTHJCDIIA 06B0yBqBGoBLuBRFRpBB3BEhBIPOZE0BO ogCyxB0BLFHxDHmBaQCOA 42CyvB2BAoCJPPpCAfDnBOKMaE 08CivByBDVHfClBIGGkBD u3C8tBSIaCcHCFdApBCBC wlBwvBYGiCCiBIoBCOHNFjERfJ q5CyhBITBRIVWhBdGLbSVANPMLNDQCUBWEOCcLSCcSKHIKEEN 4xCsaDEAKKAEYFSSGYDOUGWIIKSfFRHdAHSXOhBIHSbqBPIdGbBXBPJKFAJJHRTAJbLXIXBJGLCdNZBRFZERALKTKTCrBFbIDQpBGVIVTILRNdGTANKTARGdJlBPbFLMZBHINEJMJEdFZMLJrByBZQIGxBTTACKZITFFWjBERHxBHJDrCHHFONTFEFRJgBLFJZAA-KWMVMMI6BHcFoCVOKTKBGXCIILQAGkBSOSOE2BDELTPOFGNDbWLJNlBbWBIGWGGKSKLKIOVCDKQUZQkBODOKCKLHTWBJOiBIqBAkBLRSBUiBGyBBqBCPMYMWAoBK0BEGE2BCQDsBKmBAEKUIwBIiBFbFuBBEJUE6BAsBJQHDJpCPPF2BHSEKNKGgBEgCDEJ0CBCOqBBgBAgBLKLLHYPgBHUUgBHiBGmBHOGiBBPScI0FLSL0BPwCEoBBQHBPYFcEkBCkBDmBCkBRYGPOKI-BFqBC6BJuCX0BTBLOFFQ2BDoBRTJfBBRHDRAPGZGDKTCXBJGEIXDKJLHZJZCSJMPKFCHFFjBE3BNRB7BbHHbOzBPJIRJbEFNXTCHWDBbTBHPIHhBLHVdDFVbRHOTqCKcSMAIgBGiBYkBUkBQQeXBLRzBVPazBHxBfQNpCFAOdEZJ7BChCFtE1CgBBKLUDMKWBcVCRPTBXHfdbHNhC5BbLLALKbNBH","eu":"uJ6xBIGeCaHgCNxBHJPRDJPXApBMSGdGnBSPQ4BGKFcA -OopBhBFTNELfPnBRNbONUJRVVFHhBJRXCLPXAFSPWPeLMnBXbDZKHWFuBSM2BSmBU2CiC4CoBsBKgBBeQmBAkBE-BNZFWLhBHPBDNgBNRPWVNRSNHLeNHJ7BlBjBBjBFfFLMTGEUHSIMSMuBWOEBIbK kRiyBdL5BB5BEDEbCVI-BGcDUGyBFoBF uP2wBrBJjBGOELIqBEIHcD wSqcAFJDFCDXLHFNGLRCTFKDFNDBXCXDOLJBLAJKDDGLKJHDKJKFAJREGJLBIRNAPIHQDORUAGDCAELIBICOCGBEDCFGbKLIRGPOECJIAILCFHFGAIECPCPFCJBFGJSJKPWPQAGFFDgBLSJCDDHLKPCHLOHBJJBJPHBAGEMEENUHEFILEJINCPIRONKFUJCPIJDLHHBEILEFOIGFIAGFIJBAIQMBEKBGECOKObEJGFBDCRKJBNKJIHADGQEKGSecIQAEEQAEDOKDIBMHKAUIMSCIEQGBJDFCFKBDHFCPNGJAHUDAHWEKGWHKFOG4BQUDCFUAYBkBABGEGJCTEDQAQKMSIQPQAGcFBNGBMaGaCUDWCCDNLGRHFKFCHGLUFEDKCUDCJDFMLIDBDODGDHFPCDBEHGLIAEEGBWCMJFDCFQBIHADYHQEMJMAeFAFHJELDFRBJFBHPBLFTBPFALBCDETEFDBCfEAITBFLPN uQiWBFdBAEXEEIKFQAQABDMC 1EmXHFJEJBEQBMJCDGCOIIEUAIDGAIAOHIcOYBcAWDQCgBBIHkBHIEWJYEALRNZDBFLLHPILLHDNNDNNtBALHHHJCFIFKTE 7D2hBENPRjBLbCQWJUqBYSCULJN oJ6XOCFPCFDJPIJCbKEKWBWC uFyZKGMNBZJAHFHGAYDMKB 4HijBGJLPVMBIeG 9BshBEMNMXEFGIIFGLJAULKIUQQQAYAVTUCWADPRRUBUZOBMXGHYDBLLFIJRJZAhBFJELJRCNFLEeUSEfEFIWGLKEOeB hJypBDNWNZNrCRxCKUIrBKkBEAGpBEMOgBCeNeMaFgBKiBA gcsyBoBEeAEFMGSCeDHDrBDBBXDVEMItBA mO-hBjBAXCEKcGUDKBDFCF uhBkuBwBQFKuBKqBIAXdJ9BlBERmBPLB_BEFIjBGBKUEBMoBQRE wlBwgBAXBAFFXMfBVHjCWdApBVBNTMPVEDJPQNQAMLBJKDJLRDTTSRBNWXLHDDHANMFCLEFITELBBCbKdEPEBDZSXIPKOEQQJIcIAGRDCIKGSCEGDMIKAGdGLALKPDXIAEHIPCBGGELKVBFCDDHAFMDIECQBIGFENECEHELMEGBKTEJBDETGFMBIJGIGFSOMBEWKTK8BmBIKdOIMROOSVWSQfOEOQCiBIUGiBL2BDsCXQHANVJfF5CQNDgBNCdaFQDCILKOGwBLQGLOuBUSBUFKOPMKMNM4BHKJXBALOFgBEEMwDcQBTLYBOGmBCeIWLCA vwD2sBUCcFBDTDvBBDGaI 8U4cGEUDEDCBKFUCDHVDZJLEEITGCEUIDC 8D-eKFcDJNBNFDJCCDPLAHKCGHAFGHHFGNMDDHRLlBGdFBLXDVKHDjBIHIKMEoBTWPKdIBOaEiBFFYSJuBQGQSEEFIAKHOJKCWLGC uF0aOIEPHPHEFOEG","af":"wY9CJXCLMFCFFLCFBJQfGDEJBTEPAfEJNbLLpBRVVHBNPHDBNKPEJAFEABTBHEDBHJHnBRHFCHEBBJDPBPFJRLXhBlBhBNHVHJBBDLCJDVELBHAVHPBLHJAHGFCJIABDECMHOGEAOLUZqBNQHOPgCAYBMHIJQPmBPSDcESOuBEISWCOAMFGJYAEGIJiBJMCEHWPUTUNSLUAGEGKeDEGWEQHMJEDKDCAGTHHCHFPCJMHONOfAPDPDfLLFRFRGHANELAXDhBNJCTIRQRKLOFCNIJKDIBORUJGBKBERMHADGAEFEDUCIHQJGIEKOEKBMGKESFeCKDKLICSIGGKAGGOMOGCGMAKIOMGOUKISCQOKGQQDaIQCMMMkBSUiBOAMJUCUDIAUKWEMIUGiCGKDUIUAIDOAWKODAJQICDJJAJGDBRLJCJMAEJIDYFICQDaHKRuBLWJKEKKFQGIQKMCcDGHIAGDUBGFaAwBNQGIGSCODGJEIQFQAKEMhBFHDPDJFDPQNeBBIVMTQfOVSVDBANcVGTDDCTIXSLMXGRKJcRcdKFEFAHLFQHEHIJKAUGUCSGKCIESAUGIGIABbDFDVVvBRdnBvBTRdRTPVXDJDFNHFHFBDNFHDLHH -e5HGHGNCXGHBJDFFMDFEPBHFDBRd3CHbHVPFRHbMDKBSHQAOCQKCAIKOCOJWASGKCOKAUIIAMMQMGKBIIBKOCMGKGJ","na":"j4CyrBmBDgBJUBSIYGeBeIgBGOHOEGKOBgBRcOCPYEIGYBgBHuBHcDUCaJbJkBD2BCSEULWKTIMIqBCQDULWCiBJgBEeADMSEgBHARMQQAKUVMXICWYOaBUJcVRJmBDATaQYNFNUNUOOSCW6BDaJCJPLOJBJlBNbBVGFJRRFHXNbBPHBLVDZPTVHPBXeBShBcEmBHUHOJYFWH2BDBPGTOVeTQGKWJeNMgBIWOMOBONSXOYWJSFeOG2BHSEqBRGHkBAARGXSDOLeMUWMIgChCHNaJSLgBFOFIPODIFCXbNhBFXRhBBrBExBBPNZHzBtBQEgBaqBQeCSJRLMlBaJiBEUWANOHXLtBLRHXPNCBSkBQ1BDCFTJpBLJLDDALGJIABGGDBFLBJAjBFPFeEGDbFNAAEFFGBDNNPBGDAFGEJEDAHPXBCGMJIDQBHELNCOFARGBGZNPTFNLJAJHBFVNLJHLDNENGPKNAJIVAVFLFBJCBIHGTgBDIEODKPQHETJDCJKLEVBRCPBHBEFAHEDDBHCHDNANMRBNELBRDRPTHJJFHANCJEFHRDNDlBEJGJEPONELIJWDIJSGqBKMIGMAQEGOGWEQAMAGDAJLJDNEBHXFEDAABEBDNCBDTDDBBDFGDCEIDEEeBIEMBICMDUJGFDFCHDFBHAXBBBHAFDDCFINYXADIACAGDKCUIGGMABBMBIDOJBDGLDFHCBJFGDMEEDCDGJGJBDFHFDABDKLHDJBDMBDFCDINEHAADDCJEDGCCAGFENGBGFECFDDDEHCBECODCEEPODGTQCEEDCCDGFCBFLCPGJAFEJELAJEJIXWJGPGLBPFJBzCeRIDGLCTGHIVMJMDKGCBGEGAGFKBIFKRUTOJORIBECMJGLKDOLATWBGJOHQCIPIFBLGBHCJCNcbEHCAELGFGFMJGTMRAJKAQRADJHBAFMLMZOAQBKXQBDDGNELMCCIBIIAKNOLGXoBLcLMJCBGLCFETCDEBMTUPcAEJGNSDQJKEQASFQISEkBDcFQFKCEeHKRGGDQFQDAzBcjBILSEMZKDQXOAKLIRGDSZQLSxBCXGpBU1BMbBlBKXIVDENhBFRFVDDKKUWGFGZLNLbNOJRPpBNFHdJFJXHNA3BRhBFBEoBOWMYCKIcMEEQICOMMXFFELHLKFFHKTHLABMEGLIZDRKLEBMNIIMQKGKQCOBQIQAOGDIJEOILAVDFFNGdDbGHIZMcIsBKQABJqBAPMXINKTIbIMKkBAYKGKUIUCmBKSBeMeFQHIEiBBBDgBDUCqBFmBBQBaE0BJ v0BinBQIaAADXJNADG 7xBwtBVKCIICuBBkBLAFpBCVDFC lyB6mBIGIAEDHLHCFGCC v6B8uBLHbCXEKKcESFIF z6BuwBJAlBCDEoBAODBB v8BoxBYHDFdFPGJIAIkBB h3BwuB1CIHMBKTIpBCVIIIoBBWFoBASFFHYFMD4BBgBEoBCiBBUHGHNDbFZEhDD xlC8wBcDFFlBFbGQIcC rlCoxBaDXDfAAEUGKB 3iBigBXdOGMDFFSFIGUHFNOECJINJPHBNEEQDEXRLAOKTE7BABGMIHEQMUgBOMQGKADF t0B2oBuBLAJQCOHRFdGLITJbJHKZBQKEQGSOAEJKEMF nxBotBUIsBLcHCJmBGUNwBHSHSRjBJuBLgBFeReAFNhBXXIfUZBBLULcJIDMTFNZExBQyBbCH1BIpBMXKGG5BUAF5BDRIOOuCEFGIKYUDIHIdKpBGOEVORAPIJFjBDnCGrCIPIUIbAFUQSUI0BGPLQNSQ0BKiBVDLoBG h7BquBqBAmBDdRXDVPVCLQAKKKUE 5sCyvBiBQqBMeAcCBNPHRAlBHfDbE 9yC4hBUCHVSPHALIHKJGBKAGKD 9hCyxBoBB2BHOJIHfCfGtBCUGXEBI ltCqeJBhBIFIPGDGVEFKAGiBHSBSPUHIL 9rCwuBcDyBAqBNZFvBNZNAHzBJJItBMWWSOTMkCC rjCsvBSEUAEJLJjCBxBJdADGqBK5CDbEcUSG4BHkBLiBAbSSIUBIJIH xiC2tBWHMTGNmCTBHfBMHFFjBCjBGVBlBF1CFLKZGRBXQsBEcAaElBEnCBJIuBIfAhBGQOOI2BMUDJHuBGaJYKSHQRKINUSCUB 3-ButBVOWIYDkBEGFTJgBHDRhBHRCNGxBQAGqBB ziCguBaAQDRLdOGC x9B-vBQHALJNfBVEAKfABOWAeGcACC _7BsyBOGUCHEuBCaLiCHQLYHbFjBNjBBpBCVKCGQGlBAVGLKOI n5BmzBeE-BEeIYBWFQM-BE8BCMB6BCsEDqBBkBFADvBJxBDRDsBAtBLhBFhBPnBDND7BBcBNDQJRFfFJHbFEDiBAAD1BLzBG5BDjCEBKkBEJOOC0BJZOhBEQIkBEGGbIHM2BBQBgBItBClCBjBIPIXGDG _uBkqBNFVADKIKSEQFAHBD l8BurBOHNFZGPBbISGOIgBHGD poBmfGCaFWHADJAZGRK _nBsdGJQBSAJHHAXIFGIG jhDyMGDGHNHDDDEAEDIEGAEACKD vhDgNBDFAFGCCMD 3iDyNGHBAFADGGC zjD8NCDDBFECACCEA hoD4lBQBCHLBLCNGUE 3_CokBMBKFRJTHJGDKeK prD8nBMDMCQFUBBBNDXIRBDCCI 5sBoLNEHBNCHDLGCIiBFIGJIAILCEGeDCEQAMFEAEFMABFKAKHHHJEPABDHADEFBHNFEAE rxB4QKCOBADVDBI zwB8QQHDNDCCKJIAC 7wB4PGAIRAJFBDMHGEM nd0zBkCMmCAaGmCCgFB-DPlBH3FBKDmCC-BFmBGQHVJ0BGgDI8BDMHxCNJF_BBuBBXNPLAXYLdBhBFmBJERVAaRrBBYHHFbDbAaNAHnBIJFcDaLGPhBDnBSGLXLyCBrDf7BHVATHbTrBNLB3BHRNANJLfPIPTjBbBdSnBARKNUhBYJODSbSIONIUYeGIIEQhBJRBXGBOIKUAoBDzBSTBPGWSLInBiBZIAI1BMpBClDB5BS0BGoBCzCEtBICI2EUII1BGSIkCOeCHKuBE-BE-BAWF0BK2DNvBKCI tpByLKBEDDDPALBAKCCQA vwByLOBKDEFNAFDLEJGCGMA tzBwOiBBSFIHUCkBZGAMDBFQAOHBDNDLANCdBOKHGLAHGDMLAREFEZEHEIETCNJHADFHBJCMGEIIEeI xmB4GMCEAAPRBDCGGAI","sa":"7qB7gBQXaNcDHJTAJGFHPFVCPGTCZMTKbYSDcNaHKKGOUIOB vkBlVBJaRDNOHBJRZdJnBDVCELDPEJLFVDRIHFCTOFKIGLRFPLBTFJRAPLFNUNUDHRXLLXRHHHGVMLZCZLDRHBXIVOXKHOGMJMBiBIUWQdGSQGiBYHKqBNGFZLEMiCKMFUBWICagCKeFeGQBYMaEmBM2CBgBDeTKBIlBUjBWPOHQCGPaTkBRoBHKHONOPIIIJUGOQMKODKHJLKEEBSGEEMIOBIMEMIBGICBKGGKCQWHGEMDSEEDSHKCKIBEGFMCEMBOOICEYMKMACEQBYQIIIAGFDFBFJBGHALJJIPIAGQHGAQYIBIIIGNOBOJAFSBWCKHQBMGAEwBCPFGJQAQJCPKAWLMNAJIAUPYDCEQAUDJRCNILFRDHIDGGEBEDKAGIIOKUIAELMhBKDCNPPGFkBBATQMYFiBNKJDLYGmBJeAePaVOFSAIHKjBHhBJLbbNXNPFBFNClBHrBFHDZTZBTRJDLVAdHPHVFVPRTBNCLDTDJNJVjBRPNHHTNLHLVLPEJBRKNBLM nmBrgBYKQDOIQHFHbFHIRJJK pgB0CJTHNFHJADEDCFFHEEIGSHMBOKSWHWPCH","oc":"qvD9KGEGFBLNBJCBKIGIB vwDhKECBJBB0gHDNDBIKEGAMG_gHA k4CzBiBNmBLYTELgBLGJRBENSLMVMAAHODFDWHBFNBDGlBGZYLQZKPFLFCPPFJCVCAiE s_CpCIFCJFFDMDITQNGEEaNIJ y-CzDVJJAPGLGCGSDKCEKCACJMAGIKGBMMCEDALFLJBDD 4gDpDGFILKFBFFBHIJMDQECCF woD9JMLFBFIAG ooD5JBGBQKFEPFCDB 0nDlNaVHDXONMLODGKAKHQL qlDxGGFNAHMMDEB ilD_FDDNSDMGAIPIJ ykDlGHALCFECIODGDEF 4jD_EGFADZOHIECYN miDrEIFDBHEHIAEMH yuDhZRXPHBGHCKQFMVICIOGCQAMHOAEJINSJOIAMJOFGROTCOIFEPQFMBMIKBDRFLPCFFCJBD iqDnbQMMKKOIGCKOKIPQIEHAJTXJHIJPAPFFNLTZNRALGVCDGKQaUMEQG q8CvZMBCXHFBPFGNNRCLQBOLQAKOBUFaG 6uCjUTJRFDJFHdBREbDLJFATLbCTMLEAMKCEEAICOBMJUDMAKHOAGHIDQJQDIKHHSKFGHAKJQBGDGCMEECKBMIOCNIOSGIIQIKCEBQGMCEGGAKAWGKKGKKKCSOSIRKEHKGKKDCOKKGIKEAGIBAEUGOJMLMAMBDMKQIEBGIMMGKBSEAKPGMEMFMHQDGCMFMEIAECKJFJHHFACHNTCFQLQFKFOLGAKFEFSFOGIUCMGQBIAGBMEQCEBGIWAGIGGJCLEBCHGJCLAHGNOGGHKHBHERCJGBGRBJGNWJaRBDMNITIEIJEEEVYTQPEPCJBNKPBRHbAJDNJTNHHPFJFRHJDNDNCFLHVARHVPPILECKJDRNbILCTGLMDQDKJITCGKDOJNRDMMCMIKBOPRLFHPPIAMLOJIEEZMNATKjBBvBNTC","an":"te3wBoBEeDaJKTCJlDP5CDZIEIqBGSGuBgB tpBlyB4CBaQUHFJFJ1CCjBM luBxsBkBCGKCYKKSCMHYhBEHJPtBFZAKItBFPGAIWI 9_B9sBMEsCHWCMJ7CATEJI zsChuBEIyBHYEdLbCTG xvC9tBOGUFgBHLCZCbE pmDjxBMImBDiBLGJlBBZGZO vwD90BSMkBHeIcHeI6BE8BNyFP6BGmEJsDMEIvEGPI1BESYDKtCS-CCeF0CUHI1BKzDG3BWFWcHiCEQHgBCqCQeCHQGGaEMF2BI2BCqCO2JDsBKaDuBKgBTUGqCP2BG2CHKIXOXCLILW8CFcNcAuCIUDaCSOQHwBBQHqCHYQUHcCiBLyEUSEMGGKbmBAICIQQEGFSII2CuBUA0CaMDjBRfCbJJFBHAHKFfFjBVDHSNgBJcdWxBBJXNZDVNrDRPHjEBGH0BJMFVFhBCbFBP0BV6JpBePoFesEHMIcG0BCgGUVOAG1DDFICQoCMiCUgEMkDUkBMGIVEIIsCWoBW6BHAIKIWBGHYBoCGKHiEWcMQDUCaPYEIIUEaAIHQIkCCsBDWL6CEiDQQGWSUDIFSDUAcLWGGIoBK6CUSBgBMkBECISG2BImBDQDCJcLYBeLUAiBMgDJQVADBJjBLCHYADHTPoBHWEqBcQQqCIeYqCWwCCOEKOQPSB6CAgBF6BGUB-BgBcHoBRwCEeMmBEoBPWA-BLWCcMSCwDFoBIwCEGSMFSXSDgFCOFDHMFsBJqCJWAOGyBPwBDKHmBLyDDuCRBHjBf_BNlBVLNBRYVmBBIJnDHnBhBaHKHqBNoDRKJ6BDSH4BEwCJ_gHA"},"ctry":{"tw":{"r":"q0XstEVvBL7CTIJOViCzBmBxB4DOyBByBkDmFqBwBoB-BiCaeYOAgCrBERVdC5BrB_CpBvFvBtCdf ikXo5EILDJZGBIKBOK","q":100,"c":[121,23.8]},"jp":{"r":"24CwYRTAVHPEJJNZHjBBbVNGAQjBDVJXAUPNfLJJIESLGHOUGKMUMOMoBGWDUkBOJoBcOYDYIMWEKbAP s6CwbOIEVbFRTfOJVVADUKOWCMsBWVeJ 4yC-UKMMDIKOFEFLLHGJDFLLGAK","q":10,"c":[136.9,36]},"kr":{"r":"8uCyXKCIKWCEEQXGLAXHJRDPHRBBKEQJUQENQ","q":10,"c":[127.8,36.4]},"th":{"r":"4hC-IRCZDNPGXRIRAEQRABVPtBAPOAIRERKJMDKJFHLBBKPIDBHGDKTWDLDKEOOoBMSHSBURaGEISdsBIEKWOCWMIFCLOAFVCRUMGDMCEGQBOPCTQPBRFH","q":10,"c":[101,15]},"vn":{"r":"mhCyGSIUCHMiBOCYDOEUFONOdqBXMGGMGHSXATiBKEkBCQMKHSDBLIHUDZRPRDNiBvBSLMPIlBBhBnBZPRXRHMGOPM","q":10,"c":[106.3,16.7]},"sg":{"r":"6pUqIdLhBMKSYGcLCL","q":100,"c":[103.8,1.4]},"my":{"r":"y-BiEECQHCJMCGISNILBXERIFGRAFNBpBgBBKLMBSHKCODK 2pCyCnBEHVHHJbPDRGJBLJLCNDNKBOOFQEEQgBIYcKJEGIAEWOOKQIAKJCHeLBHNAEJNH","q":10,"c":[114.7,3.6]},"id":{"r":"k4CzBAhERQTEDFZAIQOGFWJQlBSPAdUFJHBDIAIPKWGOABGdAHMREHKcEKGgBHInBWLQWWMSAgBNWD kuCxFCJNNPFBECGIMUI 8zCpEBQEGEIEFAJJN 2pCyCLRORBJWRXBFNARRNBTHdBGVHHMNCJGXHHKdCBaJGJQBSCSMOCNOJOEMBMKKCSFQEKcIIIWoBD 8wC3BWFGPPKPAZAEMaA qvCrCNEDIUCEHFF -vCsBCLMBCHBPJCBNIJFBHMFaEQGI 6sCSYAUOCDPTNDTExBDDNSRMIkBIAJJEHLRHUZDFSXALLFHGKQTHDGCINMCUNFCzBLDHGGSDUHAFOIOCOOoBSOQFYB mrCtGZOSEKFIFBDHB 6rCpFOASIBLdDbCAIQEMF -pCnFMCEHvBFIKKCGGIF 6jC_DCHmBBGIkBHINeDYLVHVKnBApBMNCHDjBIDKRAOUYBYH ohCVCNIJOBKNDXBfVAPSZQXcZqBPSNgBROJQPMTWBKsBF-B9BWAQNMPOJHPMHIA","q":10,"c":[114,-0.3]},"ph":{"r":"wrC-HJQSBGFDRJK 0sCoGEGCMMADLQSBRTZLOEG gvCoFCXFRHUHJGPFHXMFOGKLIFHJCNLDGIQYOGJQGEKOABQQJER iqC6FZRKOaaKUEPXZ usCsLBHGNDPLHDPEPMBICaJBLGDBJPKHMDHNMRDJGCIGEFGBHJMDcIHCgBGSMAMFGGCF osCkHBKMFMAAHVPAU uuC0HGXPGGRJFAOFCDMMBAILQSBGF","q":10,"c":[121.6,15.8]},"in":{"r":"68B2RCHFDALNEZNCLLPAJJPPEAVDFCHJFLgBDADLJKGMIAKSLClBEBOHAPIHLOLLFDHMFDLINCPBHlBDAPJJbNXXhBZAHbLJBFPGpBHRAhBLBHPGFRFHLHFRSRwBPcJmBRcHmBFaAYDUbLNCZYIIFGVSMOsBADQJKBQNIWWYBUWMUUUAOSMPKHMHSKIgBDWESQWXBPIJAJNCEVwBZLJHRgCbcDMJmBFSAAeMECTSHOEgBBCOHGQCSOYOQFOKKNHHWB","q":10,"c":[79.6,22.9]},"gb":{"r":"7D2hBPELAEKDKSCULJN 9BshBEMNMXEFGIIFGLJAULKIUQQoBAVTqBCDPRRUBUZOBSfYDBLLFIJRJZAhBFJELJRCNFLEeUSEfEFIWGLKEOeB","q":10,"c":[-2.7,53.9]},"fr":{"r":"8D-eKFcDJNBNFDJCCDPLAHKCGHAFGHHFGNMDDHRLlBGdFBLXDVKHDjBIHIKMEoBTWPKdIBOaEiBFFYSJuBQGQSEEFIAYRKCWLGC uF0aOIEPHPHEFOEG","q":10,"c":[2.3,46.6]},"de":{"r":"6I0hBGLFDGHGJBHILHBFCpBPGPWLHJFBCNBBFEJANDRCBFJGFBVGDDPACOKObEJGAIDEEODWMAEGGSDIEEQAEDOKDIBMQDMEAHUDAHWEKGgBN","q":10,"c":[10.3,51.1]},"it":{"r":"wGqdOBCCUEEFcFBJEHPCPFAPGJSJKPWPQAGFFDgBLSJCDDHLKPCHLOHBJJBJPHBESEENUHEFILEJINChBWNKFUZKJDLHHBEILEFOIGFIAGKDKAKIEDKAEIOBKEAI oJ6XOCFPCFDJPIlBMEKWBWC uFyZKGMNBZJAHFHGAYDMKB","q":10,"c":[12.2,43.5]},"es":{"r":"1EmXAGKOHGGMHMICCKCCAQKGFKZBFKNHAOHIcOqCFQCgBBIHkBHIEWJYEALRNZDBFLLHPILLHDNNDNNtBATPJCFIFKTE","q":10,"c":[-3.6,40.3]},"nl":{"r":"4D4fFABAEEAEFCFADEDBACDBBCBBHAHCBAECIBEAFCEAFEEEIGGMCAECGCCEMCOAEBEAAFDFFBABGBADFBCBFBBBDCFBGFBFABDBCBAB 0CkgBABFBFCBBDESA","q":10,"c":[5.7,52.3]},"ch":{"r":"-F2dCABHGBCBEAECEBBDADFCBBCFBABEHBBEBAADFFABABDEACDABCBEFBABDFHCHBFGACACHADBCABBDACCACCEEECCECGGBCCCCAEBGEQAEADCECGBGAGD","q":10,"c":[8.2,46.8]},"gr":{"r":"uQiWBFdBAEXEEIKFgBABDMC sO6ZOAQGOHSCAKKDFNDBXCXDOLVBJKDDGLKJHDUPAJREGJLBIRNAPILeRUAGIKCGGEAEOCIGKBIE","q":10,"c":[22.6,39.3]},"is":{"r":"hJypBDNWNZNrCRxCKUIrBKkBEAGpBEMOgBCeNeMaFgBKiBA","q":10,"c":[-18.8,65.1]},"us":{"r":"3sC0eoRAAIIAELGBiBDUHQEeFSGmCbCFGBBBKCEHIBBDUJKhBTdCFGBsCYFMKCmBAGIgBUkCACGOEOYQOGDOEIFAbQR9BVNPALGJIABGGDBF5BHPFeEGDbFNAAEFFGBDNNPBGJGEJEDAHPXEOJIDQBHELNCOFARGBGZNPTFNLJAJHBFhBXHLDNENQdAJIVAVFLFBJCBIHGXoBEODKPQHETJNMLEVBRCXDEFAHEDDBHCHDNANMRBNEdFRPTHJJFHANGPHBdMJWLMRaNIPALPPGLGJUdYhBAAJ3BArCYCEvBDDKLMJCBGLCFETCDEBMTUPcAEXYDQJKEQASFQISEkBDcLaCEeHKRGGJgB jhDyMGDGHRLDEDMEGAEACKD vhDgNHDFGCCMD _hDoNABJAACKA 3iDyNGHBAFADGGC zjD8NCDDBFECACCEA hoD4lBQBCHLBLCNGUE 3_CokBMBKFlBRJGDKeK j4CyrBA7FUAUFeVUMUGMJeRiBjBiBNALJJdODSZQLSxBCXGpBU1BMbB9BSVDENhBFnBJDKKUWGFGZLNLbNOJRPpBNFHdJFJXHNA3BRhBFBE-BaYCKIcMUMCOMMXFFELHLKFFHKTHLABMEGLIZDdOBMNIIMQKGKQCOBQIQAOGDIJEOIhBDFFNGdDbGHIZMoCSQABJqBAPMXIhBSbIMKkBAYKGKUI6BMSBeMeFQHIEiBBBDgBDUCgDJaE0BJ prD8nBMDMCkBHPFXIRBDCCI","q":10,"c":[-99.1,39.5]},"ca":{"r":"3sC0e3BcjBILSEMZKDQXOAKKKAMhBOhBkBdSLKTFTLdWTGTAA8F6CPSIYGeBeIgBGOHOEGKOBgBRcOCPYEIGYBgBHuBHcDUCaJbJkBD2BCSEULWKTIMIqBCQDULWCiBJ-BEDMSEgBHARMQQAKUVMXICWYOaBUJcVRJmBDATaQYNFNUNUOOSCW6BDaJCJPLOJBJlBNbBVGFJXZXNbBPHBLVDZPTVHPBXeBShBcEmBHUHOJuBN2BDBPGTOVeTQGKWJeNMgBIWOMOBONSXOYWJSFeOG2BHSEqBRGHkBAARGXSDOLeMUWMIgChCHNaJSLgBFOFIPODIFCXbNhBFXRhBBrBExBBPNZHzBtBQEgBaqBQeCSJRLMlBaJiBEUWANOHXL_BTXPNCBSkBQ1BDNMAcHGNDFEPNNXNDBFjCAfTFHlBAJBGLZJVDVJNGUgBJiBTKCEHCDIJBCCFCBGlCcRFdGPDTIhBEFCDMHAAHnRA v0BinBQIaAADXJNADG 7xBwtBVKCI2BAkBLAFlCA lyB6mBIGIAEDHLHCFGCC v6B8uBLHbCXEKKcESFIF z6BuwBJAlBCDEoBAODBB v8BoxBYHDFdFPGJIAIkBB h3BwuB1CIJWTIpBCVIIIoBBWFoBASFFHYFMD4BBgBEqCAUHGHNDbFZEhDD xlC8wBcDFFlBFbGQIcC rlCoxBaDXDfAAEUGKB 3iBigBXdOGMDFFSFIGUHFNOEKXJPVCEQDEXRLAOKTE7BABGMIHEQMUgBOMQGKADF t0B2oBuBLAJQCOHRFdGLIvBTHKZBQKKiBOAEJKEMF nxBotBUIoCTCJmBGUNwBHSHSRjBJuBLgBFeReAFNhBXXIfUZBBL4BZMTFNrCUyBbCH1BIpBMXKGG5BUAF5BDRIOOuCEFGIKYULQdKpBGOEVORAPIJFjBDnCGrCIPIUIbAFUQSUI0BGPLQNSQ0BKiBVDLoBG h7BquBqBAmBDdRXDVPVCLQAKKKUE 5sCyvBiBQqBM6BCBNPHRAlBHfDbE 9yC4hBUCHVSPHALIRQBKAGKD 9hCyxB-CJWRfCfGtBCUGXEBI ltCqeJBhBIFIPGDGVEFKAG0BJSPUHIL 9rCwuBcDyBAqBNpCTZNAHzBJJItBMoBkBTMkCC rjCsvBSEUAEJLJjCBxBJdADGqBK5CDbEcUSG4BHkBLiBAbSSIUBQR xiC2tBWHShBmCTBHfBMHFFnCI7BH1CFLKZGRBXQsBEcAaElBEnCBJIuBIfAhBGeW2BMUDJHuBGaJYKSHQRKINUSCUB 3-ButBVOWIYDkBEGFTJgBHDRhBHRCNGxBQAGqBB ziCguBaAQDRLdOGC x9B-vBQHALJNfBVEAKfABOWAeGcACC _7BsyBOGUCHEuBCaLiCHQLYHbFjBNtCAVKCGQGlBAVGLKOI n5BmzB8CIeIYBWFQM-BEoCA6BCsEDuCHADzDRsBAvCRhBPnBDND7BBcBNDQJRFfFJHbFEDiBAAD1BLzBG5BDjCEBKkBEJOOC0BJZOhBEQIkBEGGbIHMmCDgBIzDAjBIPIXGDG _uBkqBNFVADKIKSEQFBL l8BurBOHNFZGPBbIgBOmBL poBmfGCaFWHADJAZGRK _nBsdGJiBBJHHAXIFGIG","q":10,"c":[-101.6,57.7]},"mx":{"r":"lpCqUwBEBDsCX4BAAKiBAeXKTMFQFMQQAOHSZMLKVeLICLfDlBEJGJEPONMVWDIJ8BQMIKiBkBKcAGDAJLJDNEBHXFEHAFLDCBDlBAAJJAWRBFXAJPCDBLXWZMlBJzCeVOfIHIVMNWGCBGEGAGNcvBwBRIBECMVQDOLATWBGReCIPIFBLGBHEXcbEHCAELYVGTMRAJKAQRADLHFMlBaAQBKXQBDRKLMKAIIAKNOLGf6B","q":10,"c":[-102.6,23.9]},"br":{"r":"rhBjVDMIKLOjBWHATQLBwBuBgBUAQJMJDGWAMHEFDHADaDGNGHDTEAcFKGEBMGIEQDMLGBIEMnBAFYEADaLGLAVKHIVCVSCkBZBbPFFXALBHCAePLRAHMLAEKLMHSGEAIMGBKEICIYOSGSAKgCDMHGAOKEEBCILCAMmBAIGIREEMLQCCGYICIOGAERCBaHGEAeFGEkBKIIBGKAEDBHGDGHFHDPITMJKACEOEIEaBAOSAUHGGEBEDKAGISiBIAQtBKDCNPPGFkBBATQM6BTKJDLYGmBJeAePaVOFSAIHKjBHhBlBnBNXNPFBFNClBHrBFHDZTZBTRJDLVAdHPHVFVPRTBNCLHdNJVjBfXHTNL","q":10,"c":[-53.1,-10.8]},"ar":{"r":"7qB7gBQXaNcDHJTAJGfAAuB _jB7SJjBATFFBVaRDNOHBJRZdJnBDVCELDPEJLFVDRIHFCTOFKIGLRFPLBTFJRAPLFNUNUDHRXLLXRHHHGVMLpCIHMAONAFGBWQIGOBKKQGaBMKEBIJEGIHIFWKEDaKmBMGFUASOOAQMUASFEHiBMWBSGSOUOMFIEGAiBWKGUBGQSaFMNIQYAoBlBQBYPUHEHTdqBHQCSQESKEKLAPfTvBtB","q":10,"c":[-65.1,-35.2]},"pe":{"r":"1rB1CRARFXNBHDHCJLFAHFDIRMLDJMAILSAQMAdIBMCQfDFAfHJCFDHIPRfJDTKBIpCqBPOHQCGPa1BkDdWIIJUGOQMCHFFCFQBIJMKCMOSYIWUGODOGCcXMTQBKEIBMAQHNTGBKJ","q":10,"c":[-74.4,-9.2]},"eg":{"r":"iX4NtHAAwEFQGODIIKaAwBNYMSCODGJEIgBFKEMhBNhBFDPQNeBBkBpCgBrBDBANcV","q":10,"c":[29.9,26.5]},"ke":{"r":"wY9CbUBMrCqBAWWkBJiBJOaYKDAJIHOAYPeDGISKIHOARVApCMPNHFHFBDNFHDLHH","q":10,"c":[37.8,0.6]},"za":{"r":"mK7RKKIFEHWDKASKAqCGBMTBLEFOCUOEKKESHQAOEEQMCMUSQcOkBDOpBBVAFJCFAFNAFMLMCEKOAFfFJRLXhBlBhBNHfJBDLCJDVETBlBJLHJAHGFCJIABBQHOGEAOlB-B","q":10,"c":[25.1,-28.9]},"ma":{"r":"rBgWINIfGDDHZDJHJBBNXHFJlBHfPBhBLAFDPCRBFPFBJXbVFbLPrBBAKIGGKAGGOMOGCGMAKIOMGOUKISCaUQQDaKcMMkBSUiBOAMJUCcD","q":10,"c":[-8.4,29.9]},"au":{"r":"q8CvZMBCXHFBPFGNNRCLQBOLQAKiBHaG 6uCjUlBPDJFHdBREbDLJFATLbCfQAMKCEECWBMJUDMAKHUHIDQNYKHHSKFGHAKPcIaBMIOCNIOqBWKCEBcIKGKAWGaeCSOSIRKEHKGKKDCOQSKEAGIBAEUGOJMLYBDMKQIEBGIMMGKBSEAKPGMEMFMHQDGCMFMEIAECKJNRFACHNTCFqBXOLQFEFSFOGQwBDaEQCEBGIcIGGJCLEBCHGJCTGNOGQPBHERCJGBGRBJGNwBbBDMNITIEIJEEEVoBjBEPAXKPBRHbAJNhBNHTrBHJDNBTLHVARHVPbMCKJDRN7BQLMHaJITCGKDOJNRDMMCMIKBOPRLFHPPIAMVWEEZMNATKjBBvBNTC","q":10,"c":[134.4,-25.6]},"nz":{"r":"yuDhZRXPHBGHCKQFMVICIOGCQAMHSXaJOIAMJOFGROTCOIFEPQFMBMIKBJdPCFFCJBD iqDnbcWKOIGCKOKIPQIEHAJdfIJPAPFRhBZNRALGVCDGKQaUcK","q":10,"c":[170.5,-44]}},"ocean":"a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|a0.3|3x.3,3.1,60.3|3u.3,6.1,60.3|3s.3,8.1,60.3|3s.3,8.1,60.3|3s.3,8.1,60.3|3s.3,8.1,60.3|3r.3,9.1,60.3|3q.3,a.1,1l.3,6.1,49.3|31.3,6.1,i.3,b.1,1j.3,9.1,48.3|d.0,5.3,6.0,2d.3,1d.1,7.3,u.1,2.3,c.1,33.3,5.0,3.3,3.0,3.3,6.0,c.3,8.0|14.0,1y.3,2d.1,1.3,d.1,32.3,t.0,2.3,a.0|17.0,2.3,2.0,1v.3,2n.1,2y.3,19.0|1e.0,1s.3,2n.1,2x.3,1a.0|1g.0,1q.3,2o.1,2u.3,1c.0|1i.0,1n.3,2q.1,2r.3,1e.0|1l.0,1k.3,2r.1,2l.3,1j.0|1n.0,1k.3,2p.1,2j.3,1l.0|1o.0,1j.3,2q.1,4.3,1.1,2c.3,1m.0|1q.0,1g.3,2r.1,2.3,4.1,29.3,1o.0|1s.0,1e.3,2y.1,24.3,1s.0|1t.0,1d.3,30.1,20.3,1u.0|1v.0,16.3,38.1,1v.3,1w.0|1x.0,13.3,3b.1,1o.3,21.0|1z.0,11.3,3e.1,1i.3,24.0|22.0,x.3,3i.1,1e.3,25.0|23.0,v.3,3k.1,1b.3,27.0|24.0,u.3,3m.1,y.3,4.2,6.3,28.0|24.0,t.3,3q.1,r.3,a.2,2.3,2a.0|25.0,r.3,3s.1,7.2,h.3,d.2,2b.0|25.0,q.3,3t.1,a.2,c.3,f.2,2b.0|26.0,o.3,3u.1,b.2,a.3,g.2,2b.0|25.0,a.1,e.3,3v.1,c.2,7.3,i.2,2b.0|25.0,h.1,1.3,41.1,11.2,2b.0|24.0,4g.1,15.2,2b.0|24.0,4e.1,17.2,2b.0|24.0,49.1,1c.2,2b.0|24.0,47.1,1e.2,2b.0|24.0,46.1,1g.2,2a.0|24.0,45.1,1i.2,29.0|24.0,45.1,1i.2,29.0|24.0,44.1,1k.2,28.0|24.0,43.1,1l.2,28.0|24.0,43.1,1l.2,28.0|24.0,42.1,1m.2,28.0|24.0,41.1,1n.2,28.0|24.0,3t.1,1v.2,28.0|24.0,3q.1,1y.2,28.0|24.0,3p.1,1z.2,28.0|25.0,3o.1,1z.2,28.0|25.0,3o.1,1z.2,28.0|25.0,3n.1,20.2,28.0|25.0,3n.1,20.2,28.0|26.0,3k.1,22.2,28.0|27.0,3j.1,22.2,28.0|27.0,3i.1,23.2,28.0|29.0,3f.1,24.2,28.0|2a.0,3e.1,24.2,28.0|2c.0,3c.1,25.2,27.0|2h.0,35.1,27.2,27.0|2i.0,34.1,27.2,27.0|2k.0,32.1,26.2,28.0|2k.0,32.1,25.2,29.0|2k.0,32.1,25.2,29.0|2j.0,33.1,25.2,29.0|2i.0,35.1,23.2,2a.0|2h.0,37.1,22.2,2a.0|2g.0,39.1,22.2,29.0|2f.0,3b.1,21.2,29.0|2e.0,3d.1,22.2,27.0|2e.0,3e.1,21.2,27.0|2e.0,3e.1,22.2,26.0|2e.0,3e.1,22.2,26.0|2e.0,3d.1,24.2,25.0|2e.0,3c.1,24.2,26.0|2e.0,3c.1,24.2,26.0|2e.0,3b.1,25.2,26.0|2e.0,3a.1,27.2,25.0|2e.0,3a.1,27.2,25.0|2e.0,r.1,6.0,2d.1,28.2,24.0|2e.0,p.1,a.0,2a.1,29.2,24.0|2e.0,o.1,f.0,26.1,2a.2,23.0|2e.0,n.1,i.0,23.1,2d.2,21.0|2e.0,n.1,k.0,21.1,2g.2,1y.0|2e.0,n.1,m.0,1y.1,2l.2,1u.0|2e.0,m.1,r.0,1.1,1.0,1r.1,2x.2,1j.0|2e.0,m.1,u.0,1p.1,2y.2,1j.0|2e.0,m.1,u.0,1p.1,2z.2,1i.0|2e.0,l.1,v.0,1n.1,31.2,1i.0|2e.0,l.1,v.0,1m.1,33.2,1h.0|2e.0,k.1,x.0,1j.1,35.2,1h.0|2e.0,k.1,y.0,1h.1,35.2,1i.0|2e.0,j.1,11.0,1d.1,34.2,1l.0|3w.0,1h.1,32.2,1l.0|3u.0,1k.1,32.2,1k.0|3t.0,1n.1,30.2,1k.0|3q.0,1r.1,2z.2,1k.0|3n.0,1w.1,2x.2,1k.0|3l.0,1z.1,2w.2,1k.0|3j.0,22.1,2v.2,1k.0|3h.0,26.1,2t.2,1k.0|3f.0,29.1,34.2,18.0|3d.0,2a.1,39.2,14.0|3c.0,2a.1,3c.2,12.0|3b.0,2b.1,3d.2,11.0|3b.0,2b.1,3d.2,11.0|39.0,2c.1,3e.2,11.0|39.0,2c.1,3e.2,11.0|39.0,2b.1,3f.2,11.0|38.0,2c.1,3f.2,11.0|37.0,2d.1,3f.2,11.0|36.0,2e.1,3f.2,11.0|35.0,2f.1,3f.2,11.0|34.0,2g.1,3f.2,11.0|34.0,2g.1,3f.2,11.0|34.0,2g.1,3g.2,10.0|33.0,2h.1,3g.2,10.0|32.0,2i.1,3g.2,10.0|33.0,2h.1,3g.2,10.0|33.0,2h.1,3g.2,10.0|32.0,2i.1,3g.2,10.0|31.0,2j.1,3g.2,10.0|31.0,2j.1,3g.2,10.0|31.0,2j.1,3g.2,10.0|30.0,2k.1,3g.2,10.0|30.0,2k.1,3g.2,10.0|30.0,2k.1,3g.2,10.0|30.0,2k.1,3g.2,10.0|31.0,2j.1,3g.2,10.0|33.0,2h.1,3g.2,10.0|35.0,2f.1,3g.2,10.0|35.0,2f.1,3g.2,10.0|35.0,2f.1,3g.2,10.0|35.0,2f.1,3g.2,10.0|35.0,2f.1,3g.2,10.0|35.0,2f.1,3g.2,10.0|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4|a0.4"}/*GEOEND*/;
const AL='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const D2R=Math.PI/180;
function decode(str,q){const out=[];if(!str)return out;str.split(' ').forEach(part=>{const v=[];let n=0,sh=0;
  for(let i=0;i<part.length;i++){const c=AL.indexOf(part[i]);n+=(c&31)*Math.pow(2,sh);sh+=5;if(!(c&32)){v.push(n%2?-(n+1)/2:n/2);n=0;sh=0}}
  const m=v.length>>1;const P=new Float32Array(m*4),NS=new Uint8Array(m),LL=new Float32Array(m*2);let x=0,y=0;
  for(let i=0;i<m;i++){x+=v[2*i];y+=v[2*i+1];const lon=x/q,lat=y/q;LL[2*i]=lon;LL[2*i+1]=lat;P[4*i]=Math.cos(lat*D2R);P[4*i+1]=Math.sin(lat*D2R);P[4*i+2]=Math.cos(lon*D2R);P[4*i+3]=Math.sin(lon*D2R)}
  // 不描邊的邊：沿著換日線切開的邊、南極點封口的邊
  const at180=l=>Math.abs(((l%360)+540)%360-180)>179.85;
  for(let i=0;i<m;i++){const j=(i+1)%m;if((at180(LL[2*i])&&at180(LL[2*j]))||(LL[2*i+1]<-89.5&&LL[2*j+1]<-89.5)||(LL[2*i+1]<-84&&LL[2*j+1]<-84&&at180(LL[2*i])!==at180(LL[2*j])&&Math.abs(LL[2*i]-LL[2*j])>90))NS[i]=1}
  if(m>=3)out.push({n:m,P,NS,LL})});return out}
function ringFromLL(pts){const m=pts.length;const P=new Float32Array(m*4),NS=new Uint8Array(m),LL=new Float32Array(m*2);pts.forEach(([lon,lat],i)=>{LL[2*i]=lon;LL[2*i+1]=lat;P[4*i]=Math.cos(lat*D2R);P[4*i+1]=Math.sin(lat*D2R);P[4*i+2]=Math.cos(lon*D2R);P[4*i+3]=Math.sin(lon*D2R)});return {n:m,P,NS,LL}}
// 國家的「等面積半徑」（度）：點擊判定用來比大小（小國才吸附）
function radOf(rings,c){let A=0;const k=Math.cos(c[1]*D2R);rings.forEach(r=>{let a=0,x0=null;const L=r.LL;const xs=[];for(let i=0;i<r.n;i++){let x=L[2*i];if(x0!=null){while(x-x0>180)x-=360;while(x-x0<-180)x+=360}x0=x;xs.push(x)}
  for(let i=0;i<r.n;i++){const j=(i+1)%r.n;a+=xs[i]*k*L[2*j+1]-xs[j]*k*L[2*i+1]}A+=Math.abs(a)/2});return Math.sqrt(A/Math.PI)}
let MAP=null;
function loadMap(){if(MAP)return MAP;MAP={cont:{},ctry:{},grat:[],ice:null,ocean:null,maxN:0};
 for(const k in CONT)MAP.cont[k]=decode(GEO.cont[k],GEO.q);
 for(const [k] of CT){const g=GEO.ctry[k==='ar2'?'ar':k];MAP.ctry[k]={rings:decode(g.r,g.q),c:g.c};MAP.ctry[k].rad=radOf(MAP.ctry[k].rings,g.c)}
 // 經緯線（淡淡的）
 for(let lon=-180;lon<180;lon+=30){const a=[];for(let lat=-80;lat<=80;lat+=5)a.push([lon,lat]);MAP.grat.push(ringFromLL(a))}
 for(const lat of [-60,-30,0,30,60]){const a=[];for(let lon=-180;lon<=180;lon+=5)a.push([lon,lat]);MAP.grat.push(ringFromLL(a))}
 // 北極海冰（示意形狀）
 const ice=[];for(let lon=-180;lon<180;lon+=4){const r=lon*D2R;ice.push([lon,80.2+2.6*Math.sin(3*r+.7)+1.3*Math.sin(7*r+2.1)+.6*Math.sin(13*r)])}MAP.ice=ringFromLL(ice);
 // 洋的格子
 const rows=GEO.ocean.split('|');const g=new Int8Array(360*180);rows.forEach((row,j)=>{let i=0;row.split(',').forEach(run=>{const [n,l]=run.split('.');const nn=parseInt(n,36),ll=+l;for(let k=0;k<nn;k++)g[j*360+i+k]=ll;i+=nn})});MAP.ocean=g;
 // 洲和洲相接的邊（例如東經 60 度切開的歐亞、蘇伊士、巴拿馬）：不描海岸；畫的時候用一條同色細線蓋住接縫
 MAP.seam={};{const E=new Map(),ks=Object.keys(MAP.cont);const q=(r,i)=>Math.round(r.LL[2*i]*100)+','+Math.round(r.LL[2*i+1]*100);
  ks.forEach((k,ki)=>MAP.cont[k].forEach(r=>{for(let i=0;i<r.n;i++){const j=(i+1)%r.n,a=q(r,i),b=q(r,j);if(a===b)continue;const key=a<b?a+'|'+b:b+'|'+a;const o=E.get(key);
   if(!o){E.set(key,{ki,r,i});continue}if(o.ki===ki)continue;r.NS[i]=1;o.r.NS[o.i]=1;(MAP.seam[k]=MAP.seam[k]||[]).push(ringFromLL([[r.LL[2*i],r.LL[2*i+1]],[r.LL[2*j],r.LL[2*j+1]]]))}}))}
 const all=[];for(const k in MAP.cont)all.push(...MAP.cont[k]);for(const k in MAP.ctry)all.push(...MAP.ctry[k].rings);all.push(...MAP.grat,MAP.ice);all.forEach(r=>{if(r.n>MAP.maxN)MAP.maxN=r.n});
 return MAP}

/* ---------- 正射投影 ---------- */
const VW={lam:121,phi:22,zoom:1,cx:0,cy:0,R:100,w:0,h:0,dpr:1,cl:1,sl:0,cp:1,sp:0};
function setRot(){const l=VW.lam*D2R,p=VW.phi*D2R;VW.cl=Math.cos(l);VW.sl=Math.sin(l);VW.cp=Math.cos(p);VW.sp=Math.sin(p)}
function projLL(lon,lat){const cf=Math.cos(lat*D2R),sf=Math.sin(lat*D2R),cl=Math.cos(lon*D2R),sl=Math.sin(lon*D2R);
 const cd=cl*VW.cl+sl*VW.sl,sd=sl*VW.cl-cl*VW.sl;const x=cf*sd,y=VW.cp*sf-VW.sp*cf*cd,z=VW.sp*sf+VW.cp*cf*cd;return {X:VW.cx+VW.R*x,Y:VW.cy-VW.R*y,z}}
function unproj(px,py){const x=(px-VW.cx)/VW.R,y=(VW.cy-py)/VW.R;const rho=Math.hypot(x,y);if(rho>1)return null;if(rho<1e-9)return [VW.lam,VW.phi];
 const c=Math.asin(rho),sc=Math.sin(c),cc=Math.cos(c);const p0=VW.phi*D2R;
 const lat=Math.asin(cc*Math.sin(p0)+y*sc*Math.cos(p0)/rho);const lon=VW.lam*D2R+Math.atan2(x*sc,rho*cc*Math.cos(p0)-y*sc*Math.sin(p0));
 let L=lon/D2R;L=((L+540)%360)-180;return [L,lat/D2R]}
let SX=new Float32Array(16),SY=new Float32Array(16),SZ=new Float32Array(16);
function projRing(r){if(SX.length<r.n){SX=new Float32Array(r.n);SY=new Float32Array(r.n);SZ=new Float32Array(r.n)}
 const P=r.P,{cl,sl,cp,sp}=VW;let any=false,all=true;
 for(let i=0,k=0;i<r.n;i++,k+=4){const cf=P[k],sf=P[k+1],c=P[k+2],s=P[k+3];const cd=c*cl+s*sl,sd=s*cl-c*sl;SX[i]=cf*sd;SY[i]=cp*sf-sp*cf*cd;const z=sp*sf+cp*cf*cd;SZ[i]=z;if(z>0)any=true;else all=false}
 return any?(all?2:1):0}
// 把一個環畫進 fp（填色，含地平線上的弧）和 sp（描邊，不畫地平線、不畫切開的邊）
// tol（像素）：跟上一個畫出的點距離小於 tol 的點略過（效能：1:110m 的海岸點在小地球上很密；描邊是最花時間的一步）
function trace(r,fp,sp,tol){const st=projRing(r);if(!st)return;const n=r.n,cx=VW.cx,cy=VW.cy,R=VW.R,NS=r.NS;tol=tol||0;
 const X=i=>cx+R*SX[i],Y=i=>cy-R*SY[i];let lx=0,ly=0;
 if(st===2){lx=X(0);ly=Y(0);fp&&fp.moveTo(lx,ly);sp&&sp.moveTo(lx,ly);for(let i=1;i<=n;i++){const j=i%n,x=X(j),y=Y(j);
   if(tol&&i<n&&!NS[i-1]&&!NS[j]&&Math.abs(x-lx)<tol&&Math.abs(y-ly)<tol)continue;lx=x;ly=y;
   fp&&i<n&&fp.lineTo(x,y);if(sp){if(NS[i-1])sp.moveTo(x,y);else sp.lineTo(x,y)}}fp&&fp.closePath();return}
 let s=0;while(SZ[s]<=0)s++;lx=X(s);ly=Y(s);fp&&fp.moveTo(lx,ly);sp&&sp.moveTo(lx,ly);let ea=0;
 for(let k=1;k<=n;k++){const i=(s+k)%n,j=(s+k-1)%n;const zi=SZ[i],zj=SZ[j];
  if(zj>0&&zi>0){const x=X(i),y=Y(i);if(tol&&k<n&&!NS[j]&&!NS[i]&&SZ[(i+1)%n]>0&&Math.abs(x-lx)<tol&&Math.abs(y-ly)<tol)continue;lx=x;ly=y;
   fp&&fp.lineTo(x,y);if(sp){if(NS[j])sp.moveTo(x,y);else sp.lineTo(x,y)}}
  else if(zj>0||zi>0){const t=zj/(zj-zi);let x=SX[j]+(SX[i]-SX[j])*t,y=SY[j]+(SY[i]-SY[j])*t;const l=Math.hypot(x,y)||1;x/=l;y/=l;const hx=cx+R*x,hy=cy-R*y;
   if(zj>0){fp&&fp.lineTo(hx,hy);if(sp&&!NS[j])sp.lineTo(hx,hy);ea=Math.atan2(-y,x);lx=hx;ly=hy}
   else{const a=Math.atan2(-y,x);let d=a-ea;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;fp&&fp.arc(cx,cy,R,ea,ea+d,d<0);fp&&fp.lineTo(X(i),Y(i));lx=X(i);ly=Y(i);if(sp){sp.moveTo(hx,hy);if(NS[j])sp.moveTo(X(i),Y(i));else sp.lineTo(X(i),Y(i))}}}}
 fp&&fp.closePath()}
function polyline(r,p){projRing(r);const cx=VW.cx,cy=VW.cy,R=VW.R;let on=false;for(let i=0;i<r.n;i++){if(SZ[i]>0.02){const x=cx+R*SX[i],y=cy-R*SY[i];if(on)p.lineTo(x,y);else p.moveTo(x,y);on=true}else on=false}}
const angD=(a,b)=>{const f1=a[1]*D2R,f2=b[1]*D2R,dl=(a[0]-b[0])*D2R;return Math.acos(Math.max(-1,Math.min(1,Math.sin(f1)*Math.sin(f2)+Math.cos(f1)*Math.cos(f2)*Math.cos(dl))))/D2R};
function twNear(ll){if(angD(ll,[121,23.7])<=1.2)return true;const r=MAP.ctry.tw.rings;for(const g of r){for(let i=0;i<g.n;i++){if(angD(ll,[g.LL[2*i],g.LL[2*i+1]])<=0.5)return true}}return false}
function pathOf(rings){const p=new Path2D();rings.forEach(r=>trace(r,p,null));return p}

/* ---------- 語音：只念有錄音的 ---------- */
const P5=window.__P5||null;
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const ht=t=>{try{return typeof heroT==='function'?heroT(t):t}catch(e){return t}};
const has=p=>{try{if(typeof VO==='undefined'||!VO.idx)return false;const u=ht(String(p)).trim();return voHas('z|'+u)||voHas('z|'+voCk(u))}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&has(p));if(!a.length)return Promise.resolve(false);const q=[];a.forEach((t,i)=>{if(i)q.push({pause:200});q.push(t)});
 try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
function gems(key){if(P5&&typeof P5.gems==='function')return P5.gems(key);const first=V2[key]!==today();V2[key]=today();try{save2()}catch(e){}const n=first?3:1;S.wallet+=n;save();try{renderBar()}catch(e){}sfx('gem');return n}
const sv=()=>{try{save2()}catch(e){}};
const seen=()=>{const o=V2.gl8seen;return o&&typeof o==='object'?o:(V2.gl8seen={})};

/* ---------- 開放條件 ---------- */
const STAGE7=()=>window.__S7STAGE||'stage9';
const NEED=41;
// 5.4.0（Albert 11/24）：不再賣 stage9；App 有「完整版」full 就開，stage9 只是以防萬一（例如兌換碼）還認得。不向商店查 stage9
const appOK=()=>{try{if(typeof IS_APP==='undefined'||!IS_APP)return true;if(typeof iapOwned==='function'&&iapOwned().includes('full'))return true;return typeof stageOpen==='function'&&!!stageOpen(STAGE7())}catch(e){return false}};
const webOK=()=>{try{return typeof s3Ok==='function'?!!s3Ok():true}catch(e){return true}};
function gate(){if(!((S.chDone||0)>=NEED))return 'ch';if(!appOK())return 'app';if(!webOK())return 'pw';return ''}

/* ---------- 卡片圖示（64×64）：放在架子上的小地球，台灣一顆星 ---------- */
const ICON8=`<circle cx="32" cy="32" r="28" fill="#E4F1FF"/><path d="M20 56 H44 M32 50 V56" stroke="#B5793F" stroke-width="4" stroke-linecap="round"/><path d="M12 30 A20 20 0 0 0 50 40" stroke="#C8962E" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="31" cy="29" r="17" fill="#4E9BE8"/><path d="M20 20 Q26 14 32 18 Q30 24 24 26 Q19 25 20 20Z" fill="#F7C873"/><path d="M34 30 Q42 28 44 34 Q40 42 34 40 Q31 35 34 30Z" fill="#8FD68A"/><path d="M22 34 Q26 32 27 37 Q24 41 21 38Z" fill="#F5A66E"/>
<circle cx="31" cy="29" r="17" fill="url(#gl8ic)"/><path d="M39 18 l1.6 3.4 3.6 .4 -2.7 2.4 .8 3.6 -3.3 -1.9 -3.3 1.9 .8 -3.6 -2.7 -2.4 3.6 -.4Z" fill="#FFE27A" stroke="#fff" stroke-width="1"/>
<defs><radialGradient id="gl8ic" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#14306A" stop-opacity=".35"/></radialGradient></defs>`;
try{ICONART['i:globe8']=`<svg viewBox="0 0 64 64" aria-hidden="true">${ICON8}</svg>`}catch(e){console.log('icon globe8',e)}
try{UXPD.globe8='轉地球，認識世界'}catch(e){}
const PICSVG=k=>{try{return `<svg viewBox="0 0 100 100" aria-hidden="true">${PIC[k]()}</svg>`}catch(e){return ''}};

/* ---------- 遊樂園：卡片、分區、寶石上限 ---------- */
const SUB_OK='轉地球，認識世界',SUB_CH='完成第四十一章就會打開';
function mkCard(g){if(!g||g.querySelector('[data-k="globe8"]'))return;const st=gate(),lk=st==='ch'||st==='app';
 const after=g.querySelector('[data-k="vine6"]')||g.querySelector('[data-k="chef5"]')||g.querySelector('[data-k="fossil26"]');
 const b=document.createElement('button');b.className='pcard'+(lk?' lockd':'');b.dataset.k='globe8';b.dataset.page='nature';b.style.setProperty('--dl','.84s');
 b.innerHTML=`<span class="pic">${art('i:globe8')}</span><b>地球儀</b><span>${st==='ch'?SUB_CH:SUB_OK}</span>${lk?`<span class="lk">${ICON.lock('#FFD98A')}</span>`:''}`;
 // 大門（m99zx4）已經分好區了：自己標上「小遊戲」，不在那一區就先藏起來
 b.dataset.gz='games';try{const gz=window.__gate;if(gz&&document.querySelector('#screen>.park.gzon')&&gz.cur!=='games')b.classList.add('gzoff')}catch(e){}
 g.insertBefore(b,after?after.nextSibling:null)}
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{globe8:'games'});X.gemDay=Object.assign(X.gemDay||{},{globe8:'globe8Day'});X.newest=['globe8'].concat(X.newest||[]);
 // 遊樂園分頁（小遊戲區的「大自然」頁）：5.3.1 還沒有分頁，先記下來給之後的分頁用
 X.pages=Object.assign(X.pages||{},{globe8:'nature'})}catch(e){}
// 大門每次排卡片前會讀 __gateExt：在那個時間點先把卡片放進去，「繼續玩」的「新」才看得到（跟收集冊 book19 同一招，包在外面）
try{const d=Object.getOwnPropertyDescriptor(window,'__gateExt');const fix=()=>{try{if(S.screen==='park')mkCard(document.querySelector('#screen>.park>.pgrid'))}catch(e){}};
 if(d&&d.get){Object.defineProperty(window,'__gateExt',{configurable:true,get(){fix();return d.get.call(window)},set(v){d.set&&d.set.call(window,v)}})}
 else{let X=window.__gateExt;Object.defineProperty(window,'__gateExt',{configurable:true,get(){fix();return X},set(v){X=v}})}}catch(e){console.log('gl8 ext',e)}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{mkCard($('#screen>.park>.pgrid')||$('.pgrid'));try{window.__parklock&&__parklock.fixCards()}catch(_){}}catch(e){console.log('park globe8',e)}return r}}
try{PARKS.push('globe8')}catch(e){}
let pick8=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="globe8"]');if(!c)return;if(c.dataset.applk==='1')return;
 e.stopImmediatePropagation();e.preventDefault();const st=gate();const shake=()=>{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')};
 if(st==='ch'){hush();sayR([T.lock41]);shake();return}
 if(st==='app'){hush();sayR([T.lockApp]);shake();return}
 V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen.globe8=(V2.parkSeen.globe8||0)+1;sv();sfx('pop');S.from='park';hush();go('globe8')};
 const tryEnter=()=>{if(st==='pw'&&typeof window.__s3Gate==='function')return window.__s3Gate(enter);enter()};
 if((V2.parkSeen.globe8||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pick8<8000))return tryEnter();
 const g=c.parentNode;$$('.pcard.uxsel',g).forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pick8=Date.now();sfx('pop');hush();sayR([T.card,T.again])}catch(_){}},true);

/* ---------- 收集冊「地球儀」一頁（book19 的 add 介面） ---------- */
function bookReg(){try{const B=window.__book19;if(!B||typeof B.add!=='function')return false;
 const item=k=>{const got=!!seen()[k];return {k:'gl8_'+k,got,name:NAME(k),pic:PICSVG(k),hint:['g8'],lockV:T.b_lock,voice:[T['s_'+k]||NAME(k)]}};
 const GR=[['亞洲','as'],['歐洲','eu'],['美洲',['na','sa']],['非洲','af'],['大洋洲','oc']];
 B.add({id:'globe8',n:'地球儀',ic:()=>`<svg viewBox="3 2 58 58" aria-hidden="true">${ICON8}</svg>`,line:T.b_sec,groups:()=>{
  const gs=GR.map(([t,c])=>({title:t,items:CT.filter(([,cc])=>Array.isArray(c)?c.includes(cc):cc===c).map(([k])=>item(k))}));
  gs.push({title:'南極和北極',items:['an','arc'].map(item)});return gs}});return true}catch(e){console.log('gl8 book',e);return false}}
if(!bookReg()){let n=0;const iv=setInterval(()=>{if(bookReg()||++n>40)clearInterval(iv)},250)}

/* ---------- 畫面 ---------- */
const DN={easy:'簡單',mid:'中等',hard:'高難度'};
const GS={diff:null,mode:'free',opened:false};
let gTok=0;
SCREENS.globe8=function(){const g0=gate();if(g0==='ch'||g0==='app'){setTimeout(()=>{try{go('park')}catch(e){}},0);return}const tok=++gTok;const live=()=>tok===gTok&&S.screen==='globe8';const calm=RM();loadMap();
 if(!GS.diff)GS.diff=DN[S.diff]?S.diff:'mid';GS.mode='free';
 let pet='';try{pet=petSVG(S.look.pet,S.look.petacc)}catch(e){}
 screen.innerHTML=`<div class="gl8${calm?' calm':''}"><div class="phead"><button class="btn2 small" id="pback">回遊樂園</button><h2 class="gtitle">地球儀</h2><span class="phsp"></span></div>
  <div class="gl8st" id="gl8st"><canvas id="gl8cv" aria-label="地球儀：用手指轉一轉，點一下聽名字"></canvas>
   <p class="gl8bub" id="gl8bub" aria-live="polite"></p>
   <div class="gl8pet" id="gl8pet" aria-hidden="true">${pet}</div>
   <div class="gl8dots" id="gl8dots" hidden></div>
   <button class="gl8find" id="gl8find" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="#BFE6FF" stroke="#2C2674" stroke-width="2.4"/><path d="M15 15 L21 21" stroke="#2C2674" stroke-width="3" stroke-linecap="round"/></svg><b>找找看</b></button>
   <div class="gl8ctl"><button type="button" id="gl8tw" aria-label="回到台灣"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 l2.7 5.6 6.1 .8 -4.5 4.2 1.1 6 -5.4 -2.9 -5.4 2.9 1.1 -6 -4.5 -4.2 6.1 -.8Z" fill="#FFD84A" stroke="#C8901E" stroke-width="1.4" stroke-linejoin="round"/></svg></button>
    <button type="button" id="gl8in" aria-label="放大">＋</button><button type="button" id="gl8out" aria-label="縮小">－</button></div>
   <div class="gl8card" id="gl8card" hidden></div><div class="gl8tags" id="gl8tags"></div></div>
  <div class="gl8menu" id="gl8menu" hidden><div class="gl8mc">
   <div class="gl8mh"><span class="gl8mi">${art('i:globe8')}</span><div><b>找找看</b><small>聽一聽，在地球上找一找！</small></div></div>
   <div class="gl8lab">難度</div><div class="gl8row" id="gl8diffs"><button class="gl8opt" data-v="easy"><b>簡單</b><small>七大洲、台灣</small></button><button class="gl8opt" data-v="mid"><b>中等</b><small>再加五大洋</small></button><button class="gl8opt" data-v="hard"><b>高難度</b><small>再加 30 個國家</small></button></div>
   <div class="gl8mb"><button class="btn2" id="gl8cancel">自由轉</button><button class="btn" id="gl8go">出發！</button></div></div></div></div>`;
 const root=$('.gl8'),st=$('#gl8st'),cv=$('#gl8cv'),bub=$('#gl8bub'),petEl=$('#gl8pet'),dots=$('#gl8dots'),card=$('#gl8card'),tags=$('#gl8tags'),menu=$('#gl8menu'),findB=$('#gl8find');
 const ctx=cv.getContext('2d');
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const tell=(t,parts)=>{bub.textContent=ht(t);bub.classList.remove('off');petHop();return sayR(parts||[t])};
 const petHop=()=>{if(calm)return;petEl.classList.remove('hop');void petEl.offsetWidth;petEl.classList.add('hop')};
 /* ---- 版面 ---- */
 let land=false,raf=0,dirty=true;const FX={sel:null,hint:null,anim:null,vel:null,ripple:null};
 function layout(){const w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;const dpr=Math.min(window.devicePixelRatio||1,S.lite?1:2);
  cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);cv.style.width=w+'px';cv.style.height=h+'px';
  land=w>h*1.15;root.classList.toggle('land',land);
  const base=land?Math.min(h*.43,w*.31):Math.min(w*.47,h*.36);
  VW.w=w;VW.h=h;VW.dpr=dpr;VW.base=base;VW.R=base*VW.zoom;VW.cx=w/2;VW.cy=land?h*.53:h*.47;
  root.style.setProperty('--gm',Math.max(0,(w-2*base)/2)+'px');GRD=null;need()}
 const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>{if(!live()){ro.disconnect();return}layout()}):null;if(ro)ro.observe(st);else addEventListener('resize',()=>{if(live())layout()});
 /* ---- 畫 ----
  * 效能（5.4.0 UX 審查「建議 1」，2026-11-24）：
  *  - 地球沒動（只有發光、點一下的漣漪、提示在閃）時，底圖（海、陸地、台灣）用快取的圖，不重新投影、不重新描海岸；
  *  - 在動時直接畫在畫面上，不多一次搬圖；
  *  - 海岸線在小地球上很密：跟上一個點不到 TOL 像素的點略過（描邊是最花時間的一步）；
  *  - 拿掉每一洲各描一次的細邊（改成只描洲和洲相接的那幾段，避免接縫）；大氣光暈只畫外圈；
  *  - 不用 shadowBlur：台灣星星做成小圖重用，發光改成寬的半透明線。 */
 const TOL=.8,TOLM=1.6,SMALL=16;
 let GRD=null,SPR=null,LY=null,prevLK='';const BC={cv:null,c:null,key:''};
 // 漸層（大氣光暈＋海、左上亮右下暗＋地球外框）先畫成圖，之後每幀只搬圖；大小只取地球跟畫面重疊的那塊。縮放中（大小一直變）就直接畫
 function lyKey(){return [VW.R.toFixed(3),VW.cx,VW.cy,VW.w,VW.h,VW.dpr].join()}
 function layers(){const key=lyKey();if(LY&&LY.key===key)return LY;dropLayers();const {cx,cy,R,dpr,w,h}=VW;const G=grads(),TAU=Math.PI*2;
  const mk=r=>{const x0=Math.max(0,Math.floor(cx-r)),y0=Math.max(0,Math.floor(cy-r)),x1=Math.min(w,Math.ceil(cx+r)),y1=Math.min(h,Math.ceil(cy+r));
   const c=document.createElement('canvas');c.width=Math.max(1,Math.round((x1-x0)*dpr));c.height=Math.max(1,Math.round((y1-y0)*dpr));const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,-x0*dpr,-y0*dpr);return {c,x,x0,y0,w:Math.max(1,x1-x0),h:Math.max(1,y1-y0)}};
  const U=mk(R*1.12+2);paintUnder(U.x);const O=mk(R+2);paintOver(O.x);return LY={key,U,O}}
 function dropLayers(){if(LY){LY.U.c.width=LY.O.c.width=0}LY=null}
 function paintUnder(c){const {cx,cy,R}=VW,G=grads(),TAU=Math.PI*2;
  // 大氣光暈：只畫海外面那一圈（裡面會被海蓋住）
  c.fillStyle=G.atm;c.beginPath();c.arc(cx,cy,R*1.12,0,TAU);c.moveTo(cx+R*.97,cy);c.arc(cx,cy,R*.97,0,TAU);c.fill('evenodd');
  c.fillStyle=G.sea;c.beginPath();c.arc(cx,cy,R,0,TAU);c.fill()}
 function paintOver(c){const {cx,cy,R}=VW,G=grads(),TAU=Math.PI*2;
  // 光影（左上亮、右下暗）＋外框
  c.fillStyle=G.lit;c.beginPath();c.arc(cx,cy,R,0,TAU);c.fill();
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=2;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke()}
 function useLayers(){const k=lyKey(),ok=(LY&&LY.key===k)||k===prevLK;prevLK=k;return ok?layers():null}
 function grads(){if(GRD)return GRD;const {cx,cy,R}=VW;const g={};
  g.sea=ctx.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);g.sea.addColorStop(0,'#7FD0FF');g.sea.addColorStop(.6,'#3F92E2');g.sea.addColorStop(1,'#2563BE');
  g.atm=ctx.createRadialGradient(cx,cy,R*.96,cx,cy,R*1.12);g.atm.addColorStop(0,'rgba(170,225,255,.65)');g.atm.addColorStop(1,'rgba(170,225,255,0)');
  g.lit=ctx.createRadialGradient(cx-R*.38,cy-R*.42,0,cx-R*.1,cy-R*.1,R*1.35);g.lit.addColorStop(0,'rgba(255,255,255,.32)');g.lit.addColorStop(.42,'rgba(255,255,255,0)');g.lit.addColorStop(.78,'rgba(12,24,80,.10)');g.lit.addColorStop(1,'rgba(12,24,80,.42)');
  return GRD=g}
 const t0=performance.now();
 // 底圖：大氣光暈、海、經緯線、北極海冰、陸地、台灣（每一個都在地球圓裡，不用 clip）
 function drawBase(c,L,tol){const {cx,cy,R,dpr}=VW;const G=grads();c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,VW.w,VW.h);const TAU=Math.PI*2;
  // 大氣光暈＋海（先畫好的圖）
  if(L)c.drawImage(L.U.c,L.U.x0,L.U.y0,L.U.w,L.U.h);else paintUnder(c);
  if(!S.lite){const gp=new Path2D();MAP.grat.forEach(r=>polyline(r,gp));c.strokeStyle='rgba(255,255,255,.14)';c.lineWidth=1;c.stroke(gp)}
  const ip=new Path2D();trace(MAP.ice,ip,null,tol);c.fillStyle='rgba(238,248,255,.94)';c.fill(ip);c.strokeStyle='rgba(190,222,248,.9)';c.lineWidth=1.4;c.stroke(ip);
  // 陸地：先描一圈淡白色海岸（洲和洲相接的邊不描），再填洲的顏色
  const shore=new Path2D(),seam=new Path2D(),fills={};for(const k in MAP.cont){const fp=new Path2D();MAP.cont[k].forEach(r=>trace(r,fp,shore,tol));fills[k]=fp}
  c.lineJoin='round';c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=Math.max(1.2,R*.012-.8);c.stroke(shore);
  for(const k in fills){c.fillStyle=CONT[k][0];c.fill(fills[k],'evenodd')}
  // 洲和洲相接的地方：用後畫那一洲的顏色描一條細線蓋住接縫（不是國界）
  for(const k in MAP.seam){const p=new Path2D();MAP.seam[k].forEach(r=>polyline(r,p,0));c.strokeStyle=CONT[k][0];c.lineWidth=1;c.stroke(p)}
  c.strokeStyle='rgba(170,200,230,.9)';c.lineWidth=1;c.stroke(fills.an);
  // 台灣：1:50m 島形＋光圈
  const tw=projLL(121,23.7);
  if(tw.z>0){const tp=pathOf(MAP.ctry.tw.rings);const hr=Math.max(9,R*.05);c.save();c.beginPath();c.arc(cx,cy,R,0,TAU);c.clip();c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.arc(tw.X,tw.Y,hr*tw.z,0,TAU);c.fill();c.restore();
   c.fillStyle='#FFD36A';c.fill(tp);c.strokeStyle='#D8742A';c.lineWidth=1.3;c.stroke(tp)}}
 // 台灣的星星（＋自由轉時的「台灣」兩個字）：做成小圖重用，不每次算 shadowBlur
 function starSpr(s,lab){const fs=Math.round(Math.max(13,Math.min(18,VW.R*.06)));let fk='';try{fk=document.fonts?document.fonts.status+document.fonts.size:''}catch(e){}
  const key=[s.toFixed(2),lab?1:0,fs,VW.dpr,fk].join();if(SPR&&SPR.key===key)return SPR;
  const d=VW.dpr,pad=12,font=`bold ${fs}px 'Huninn',sans-serif`;const c0=document.createElement('canvas');let x=c0.getContext('2d');x.font=font;const tw=lab?x.measureText('台灣').width+6:0;
  const W=Math.ceil(pad+2*s+(lab?s*.1+tw:0)+pad),H=Math.ceil(2*Math.max(s,fs*.75)+2*pad);c0.width=Math.ceil(W*d);c0.height=Math.ceil(H*d);x=c0.getContext('2d');x.setTransform(d,0,0,d,0,0);
  const sx=pad+s,sy=H/2;x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?s*.45:s;x.lineTo(sx+Math.cos(a)*rr,sy+Math.sin(a)*rr)}x.closePath();
  x.fillStyle='#FFD84A';x.shadowColor='rgba(255,230,120,.9)';x.shadowBlur=8*d;x.fill();x.shadowBlur=0;x.strokeStyle='#fff';x.lineWidth=1.6;x.stroke();
  if(lab){x.font=font;x.textBaseline='middle';x.lineWidth=4;x.lineJoin='miter';x.strokeStyle='rgba(40,30,100,.85)';x.strokeText('台灣',sx+s*1.1,sy);x.fillStyle='#FFF6D0';x.fillText('台灣',sx+s*1.1,sy)}
  return SPR={key,cv:c0,ox:sx,oy:sy,w:W,h:H}}
 function baseKey(){return [VW.lam.toFixed(4),VW.phi.toFixed(4),VW.R.toFixed(3),VW.cx,VW.cy,VW.w,VW.h,VW.dpr,S.lite?1:0].join()}
 function dropCache(){if(BC.cv){BC.cv.width=0;BC.cv.height=0}BC.cv=null;BC.c=null;BC.key='';dropLayers();SPR=null}
 function draw(now){const {cx,cy,R,dpr}=VW;setRot();const G=grads();const TAU=Math.PI*2;
  const moving=!!(FX.anim||FX.vel||drag||pinch),key=baseKey(),L=useLayers();let direct=false;
  if(BC.key!==key){
   if(moving){drawBase(ctx,L,TOLM);BC.key='';direct=true}
   else{if(!BC.cv||BC.cv.width!==cv.width||BC.cv.height!==cv.height){if(!BC.cv)BC.cv=document.createElement('canvas');BC.cv.width=cv.width;BC.cv.height=cv.height;BC.c=BC.cv.getContext('2d')}drawBase(BC.c,L,TOL);BC.key=key}}
  if(!direct){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(BC.cv,0,0)}
  ctx.setTransform(dpr,0,0,dpr,0,0);
  // 點到的、提示的：發光（不用 shadowBlur）
  const glow=(fx,a)=>{if(!fx)return;const k=fx.k,kind=KIND(k);ctx.save();ctx.globalAlpha=a;
   if(kind==='ctry'||kind==='cont'||kind==='arc'){const rings=kind==='ctry'?MAP.ctry[k].rings:kind==='cont'?MAP.cont[k]:[MAP.ice];const p=new Path2D(),b=new Path2D();rings.forEach(r=>trace(r,p,b,TOL));
    ctx.fillStyle='rgba(255,255,255,.42)';ctx.fill(p,'evenodd');ctx.lineJoin='round';ctx.strokeStyle='rgba(255,242,160,.5)';ctx.lineWidth=kind==='ctry'?7:8;ctx.stroke(b);ctx.strokeStyle='#FFFFFF';ctx.lineWidth=kind==='ctry'?2.2:2.6;ctx.stroke(b);
    // 台灣、新加坡、在畫面上很小的國家：外面再畫一圈，才看得到
    if(kind==='ctry'){const I=ctrInfo(k);if(I.p.z>0&&(k==='tw'||k==='sg'||I.rad<SMALL)){ctx.strokeStyle='#FFF2A0';ctx.lineWidth=3;ctx.beginPath();ctx.arc(I.p.X,I.p.Y,Math.max(14,R*.06,I.rad+8),0,TAU);ctx.stroke()}}}
   else{const c=fx.at||oceanAt(k);const p=c&&projLL(c[0],c[1]);if(p&&p.z>0){const rr=R*.22;const g=ctx.createRadialGradient(p.X,p.Y,0,p.X,p.Y,rr);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.X,p.Y,rr,0,TAU);ctx.fill();
     ctx.strokeStyle='rgba(255,246,190,.95)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.X,p.Y,rr*.55,0,TAU);ctx.stroke()}}
   ctx.restore()};
  let live2=false;
  if(FX.sel||FX.hint||FX.ripple){ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.clip();
   if(FX.sel){const age=(now-FX.sel.t)/1000;const a=age<2.4?1:Math.max(0,1-(age-2.4)/.8);if(a<=0)FX.sel=null;else{glow(FX.sel,a*.9);live2=true}}
   if(FX.hint){const a=.55+.45*Math.sin((now-t0)/260);glow(FX.hint,a);live2=true}
   if(FX.ripple){const age=Math.max(0,(now-FX.ripple.t)/700);if(age>=1)FX.ripple=null;else{ctx.strokeStyle=`rgba(255,255,255,${(1-age).toFixed(2)})`;ctx.lineWidth=3;ctx.beginPath();ctx.arc(FX.ripple.x,FX.ripple.y,8+age*26,0,TAU);ctx.stroke();live2=true}}
   ctx.restore()}
  // 光影＋外框（先畫好的圖）
  if(L)ctx.drawImage(L.O.c,L.O.x0,L.O.y0,L.O.w,L.O.h);else paintOver(ctx);
  // 台灣的星星（畫在光影上面，才亮）；星星和字只畫在地球裡面（台灣轉到邊邊時不會跑出地球外）
  const tw=projLL(121,23.7);const s=Math.max(8,Math.min(15,R*.045)),sx=tw.X+s*1.25,sy=tw.Y-s*1.05;
  if(tw.z>0.2&&Math.hypot(sx-cx,sy-cy)<R-s){const sp=starSpr(s,GS.mode==='free');ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.clip();ctx.globalAlpha=Math.min(1,(tw.z-.2)*4);
   ctx.drawImage(sp.cv,sx-sp.ox,sy-sp.oy,sp.w,sp.h);ctx.restore()}
  return live2}
 let lastD=0;
 function loop(now){raf=0;if(!live()){dropCache();return}let more=false;
  // C2：只有提示在閃時，每秒畫 15 次就夠
  if(!dirty&&FX.hint&&!FX.anim&&!FX.vel&&!FX.sel&&!FX.ripple&&now-lastD<66){raf=requestAnimationFrame(loop);return}
  const A=FX.anim;if(A){const t=Math.min(1,(now-A.t)/A.d);const e=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;VW.lam=A.l0+A.dl*e;VW.phi=A.p0+(A.p1-A.p0)*e;if(A.z1!=null){VW.zoom=A.z0+(A.z1-A.z0)*e;VW.R=VW.base*VW.zoom;GRD=null}if(t>=1){FX.anim=null;A.done&&A.done()}else more=true}
  const V=FX.vel;if(V&&!drag){const dt=Math.min(50,now-V.t);V.t=now;VW.lam-=V.x*dt;VW.phi=clampP(VW.phi+V.y*dt);const k=Math.exp(-dt/420);V.x*=k;V.y*=k;if(Math.hypot(V.x,V.y)<.0025)FX.vel=null;else more=true}
  VW.lam=((VW.lam+540)%360)-180;
  if(dirty||more||FX.sel||FX.hint||FX.ripple){dirty=false;lastD=now;const g=draw(now);if(g)more=true}
  if(more&&!raf)raf=requestAnimationFrame(loop)}
 function need(){dirty=true;if(!raf)raf=requestAnimationFrame(loop)}
 const clampP=p=>Math.max(-82,Math.min(82,p));
 function panTo(lon,lat,ms,done,z){FX.vel=null;let dl=((lon-VW.lam+540)%360)-180;const p1=clampP(lat);const z1=z==null?null:Math.max(1,Math.min(2.6,z));
  if(calm||!ms){VW.lam+=dl;VW.phi=p1;if(z1!=null)setZoom(z1);need();done&&done();return}
  FX.anim={t:performance.now(),d:ms,l0:VW.lam,dl,p0:VW.phi,p1,z0:VW.zoom,z1,done};need()}
 /* ---- 點到哪裡 ----
  * 2026-11-24（UX 審查 必修 3：小國家點不到）：
  *  - baseHit：照輪廓判定（台灣 M2 規則不變：點在其他陸地上不算台灣）。
  *  - hitAt（自由轉，也是點錯時念的名字）：在畫面上大的國家照輪廓；畫面上小的國家（等面積半徑 < SMALL 像素）用「離誰最近」分，
  *    不再用固定的圓互相蓋住。點在海上、離小國海岸 MSEA 像素內，或點在沒標名字的陸地上、離小國 MLAND 像素內，念最近的那一國。
  *    台灣只在海上吸附（M2：點在廈門、福州等陸地上念「亞洲」）。
  *  - judge（找找看）：題目優先。點在題目國家中心 max(22×√放大倍數, 國家半徑＋12) 像素內、或離它的海岸 EDGE 像素內，就算找到。
  *    台灣題只有點在海上或台灣島上才放寬（點在其他陸地上還是不算），海上的範圍放大到 30×√放大倍數 像素。 */
 function oceanAt(k){const o=OCN.find(x=>x[0]===k);if(!o)return null;return [o[1]==null?VW.lam:o[1],o[2]]}
 const MSEA=14,MLAND=8;
 function ctrInfo(k){const m=MAP.ctry[k],c=m.c;const p=projLL(c[0],c[1]);return {p,rad:m.rad*D2R*VW.R*Math.max(.25,p.z)}}
 function baseHit(x,y){const dx=x-VW.cx,dy=y-VW.cy;if(dx*dx+dy*dy>VW.R*VW.R)return null;setRot();
  ctx.setTransform(VW.dpr,0,0,VW.dpr,0,0);const px=x*VW.dpr,py=y*VW.dpr;
  // 台灣（2026-11-23 內容審查 M2）：點到台灣島本身＝台灣；放大的範圍只算海上，離台灣中心 1.2 度內、或離台灣海岸 0.5 度內。
  // 點到的地方如果在其他陸地裡（例如福建沿海），就不算台灣。
  const ll0=unproj(x,y);
  if(ll0&&angD(ll0,[121,23.7])<3.5){
   if(ctx.isPointInPath(pathOf(MAP.ctry.tw.rings),px,py,'evenodd'))return 'tw';
   const onLand=ctx.isPointInPath(pathOf(MAP.cont.as),px,py,'evenodd');
   // 1:110m 的亞洲輪廓裡也有一塊粗略的台灣：落在台灣島附近的小框裡就還是台灣（框內沒有大陸海岸）
   const twBox=ll0[0]>120.05&&ll0[0]<122.1&&ll0[1]>21.8&&ll0[1]<25.35;
   if((!onLand||twBox)&&twNear(ll0))return 'tw'}
  for(const [k] of CT){if(ctx.isPointInPath(pathOf(MAP.ctry[k].rings),px,py,'evenodd'))return k}
  for(const k in MAP.cont){if(ctx.isPointInPath(pathOf(MAP.cont[k]),px,py,'evenodd'))return k}
  const ll=unproj(x,y);if(!ll)return null;
  if(ctx.isPointInPath(pathOf([MAP.ice]),px,py))return 'arc';
  // 裏海（湖）：算亞洲
  if(ll[0]>46&&ll[0]<55.5&&ll[1]>36.5&&ll[1]<47.5)return 'as';
  const i=Math.min(359,Math.max(0,Math.floor(ll[0]+180))),j=Math.min(179,Math.max(0,Math.floor(90-ll[1])));const o=MAP.ocean[j*360+i];
  return OCN[o]?OCN[o][0]:'pa'}
 const isSea=k=>k==='pa'||k==='at'||k==='io'||k==='ar'||k==='so';
 function hitAt(x,y){const k0=baseHit(x,y);if(!k0)return null;
  if(CTOF[k0]&&k0!=='tw'&&ctrInfo(k0).rad>=SMALL)return k0;
  // 分數＝離那一國海岸幾像素（點在輪廓裡面＝-1）；特別小的（半徑不到 4px，例如新加坡、荷蘭）再減 4，旁邊的大國才不會把它吃掉
  const sea=isSea(k0)||k0==='arc',land=!!CONT[k0];let best=null,bs=1e9;
  for(const [k] of CT){const I=ctrInfo(k);if(I.p.z<.1)continue;let s;
   if(k===k0)s=-1;
   else{if(I.rad>=SMALL)continue;if(k==='tw'&&!sea)continue;const M=sea?MSEA:land?MLAND:0;if(Math.hypot(I.p.X-x,I.p.Y-y)-I.rad>M+40)continue;
    const e=Math.min(edgeDist(MAP.ctry[k].rings,x,y),Math.hypot(I.p.X-x,I.p.Y-y));if(e>M)continue;s=e-(I.rad<4?4:0)}
   if(s<bs){bs=s;best=k}}
  return best||k0}
 // 離一個地方的海岸（只算看得到的邊）最近幾像素
 function edgeDist(rings,x,y){let best=1e9;const cx=VW.cx,cy=VW.cy,R=VW.R;for(const r of rings){if(!projRing(r))continue;const n=r.n,NS=r.NS;
   for(let i=0;i<n;i++){const j=(i+1)%n;if(NS[i]||SZ[i]<=0||SZ[j]<=0)continue;const ax=cx+R*SX[i],ay=cy-R*SY[i],bx=cx+R*SX[j],by=cy-R*SY[j];
    const vx=bx-ax,vy=by-ay,l2=vx*vx+vy*vy;let t=l2?((x-ax)*vx+(y-ay)*vy)/l2:0;t=t<0?0:t>1?1:t;const d=Math.hypot(ax+vx*t-x,ay+vy*t-y);if(d<best)best=d}}return best}
 const EDGE=()=>Math.max(12,10*Math.sqrt(VW.zoom));
 function judge(x,y,want){const k=hitAt(x,y);if(!k)return {ok:false,k};if(!want||okHit(want,k))return {ok:okHit(want,k),k};
  if(CTOF[want]){const k0=want==='tw'?baseHit(x,y):k;
   if(want!=='tw'||isSea(k0)||k0==='tw'){const I=ctrInfo(want);
    if(I.p.z>.1&&Math.hypot(I.p.X-x,I.p.Y-y)<=Math.max((want==='tw'?30:22)*Math.sqrt(VW.zoom),I.rad+12))return {ok:true,k};
    if(edgeDist(MAP.ctry[want].rings,x,y)<=EDGE())return {ok:true,k}}}
  else if((CONT[want]||want==='arc')&&(isSea(k)||k==='arc')){if(edgeDist(want==='arc'?[MAP.ice]:MAP.cont[want],x,y)<=EDGE())return {ok:true,k}}
  return {ok:false,k}}
 /* ---- 手指：轉、甩、捏合、點 ---- */
 const ptr=new Map();let drag=false,down=null,pinch=null,hist=[];
 cv.addEventListener('pointerdown',e=>{if(!live())return;try{cv.setPointerCapture(e.pointerId)}catch(_){}ptr.set(e.pointerId,{x:e.offsetX,y:e.offsetY});FX.vel=null;if(FX.anim&&!FX.anim.lock)FX.anim=null;
  if(ptr.size===1){down={x:e.offsetX,y:e.offsetY,t:performance.now(),lam:VW.lam,phi:VW.phi};drag=false;hist=[[performance.now(),e.offsetX,e.offsetY]]}
  else if(ptr.size===2){const [a,b]=[...ptr.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:VW.zoom};drag=true}});
 cv.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId)||!live())return;ptr.set(e.pointerId,{x:e.offsetX,y:e.offsetY});
  if(pinch&&ptr.size>=2){const [a,b]=[...ptr.values()];setZoom(pinch.z*(Math.hypot(a.x-b.x,a.y-b.y)||1)/pinch.d);return}
  if(!down)return;const dx=e.offsetX-down.x,dy=e.offsetY-down.y;if(!drag&&Math.hypot(dx,dy)>7)drag=true;
  if(drag){const k=57.3/VW.R;VW.lam=down.lam-dx*k;VW.phi=clampP(down.phi+dy*k);hist.push([performance.now(),e.offsetX,e.offsetY]);if(hist.length>8)hist.shift();need()}});
 const up=e=>{try{if(cv.hasPointerCapture&&cv.hasPointerCapture(e.pointerId))cv.releasePointerCapture(e.pointerId)}catch(_){}if(!ptr.has(e.pointerId))return;ptr.delete(e.pointerId);if(pinch){if(ptr.size<2)pinch=null;down=null;return}
  if(!down)return;const d=down;down=null;
  if(!drag){if(performance.now()-d.t<700)tap(d.x,d.y);return}
  const now=performance.now();let h=hist.filter(q=>now-q[0]<120);if(h.length<2&&hist.length>=2&&now-hist[hist.length-1][0]<350)h=hist.slice(-2);if(h.length>=2){const a=h[0],b=h[h.length-1],dt=Math.max(16,b[0]-a[0]);const k=57.3/VW.R;
   FX.vel={x:(b[1]-a[1])/dt*k,y:(b[2]-a[2])/dt*k,t:now};if(calm){FX.vel.x*=.5;FX.vel.y*=.5}need()}drag=false};
 cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 function setZoom(z){VW.zoom=Math.max(1,Math.min(2.6,z));VW.R=VW.base*VW.zoom;GRD=null;need()}
 $('#gl8in').onclick=()=>{sfx('pop');setZoom(VW.zoom*1.35)};$('#gl8out').onclick=()=>{sfx('pop');setZoom(VW.zoom/1.35)};
 $('#gl8tw').onclick=()=>{sfx('pop');hush();panTo(121,22,900);FX.sel={k:'tw',t:performance.now()+600};tell(T.hi_tw)};
 /* ---- 標籤、小卡 ---- */
 function tag(x,y,txt){const el=document.createElement('span');el.className='gl8tag';el.textContent=txt;el.style.left=x+'px';el.style.top=y+'px';tags.appendChild(el);
  while(tags.children.length>3)tags.firstChild.remove();setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),500)},1800)}
 function showCard(k){const sents=[T['s_'+k]];if(k==='an'||k==='arc')sents.push(T.fact_pole);
  card.innerHTML=`<button class="gl8x" type="button" aria-label="關閉">✕</button><div class="gl8pic">${PICSVG(k)}</div><div class="gl8txt"><b>${NAME(k)}</b>${sents.map((s,i)=>`<p${i?' class="gl8fact"':''}>${s}</p>`).join('')}${has(sents[0])?'<button class="gl8hear" type="button">再聽一次</button>':''}</div>`;
  card.hidden=false;root.classList.add('carded');card.classList.remove('in');void card.offsetWidth;card.classList.add('in');
  card.querySelector('.gl8x').onclick=e=>{e.stopPropagation();closeCard()};const hb=card.querySelector('.gl8hear');if(hb)hb.onclick=()=>{hush();sayR(sents)};
  return sents}
 function closeCard(){card.hidden=true;root.classList.remove('carded')}
 /* ---- 點一下 ---- */
 function tap(x,y){if(!live())return;
  // 找找看：題目優先的寬鬆判定（judge）；點錯時念的是 hitAt 的結果
  if(GS.mode==='find'&&F){const want=F.q[F.i],j=judge(x,y,want);if(!j.k)return;FX.ripple={x,y,t:performance.now()};return findTap(j.ok?want:j.k,x,y)}
  const k=hitAt(x,y);if(!k)return;FX.ripple={x,y,t:performance.now()};
  if(GS.mode==='find')return findTap(k,x,y);
  hush();sfx('pop');FX.sel={k,t:performance.now(),at:unproj(x,y)};need();
  const nm=NAME(k);bub.textContent=nm;bub.classList.remove('off');petHop();tag(x,y,nm);
  if(HASCARD(k)){const fresh=!seen()[k];seen()[k]=1;sv();const s=showCard(k);if(fresh){try{burst(x+st.getBoundingClientRect().left,y+st.getBoundingClientRect().top,10,true)}catch(_){}}sayR(s)}
  else{closeCard();sayR([nm])}}
 /* ---- 找找看 ---- */
 let F=null;
 const POOL={easy:['as','eu','af','na','sa','oc','an','tw','arc'],oce:['pa','at','io','ar','so'],ctry:CT.map(c=>c[0]).filter(k=>k!=='tw')};
 function pickRound(diff){const sh=a=>shuffle(a);let q;
  if(diff==='easy')q=sh(POOL.easy).slice(0,5);
  else if(diff==='mid')q=sh(sh(POOL.oce).slice(0,2).concat(sh(POOL.easy).slice(0,3)));
  else q=sh(sh(POOL.ctry).slice(0,3).concat(sh(POOL.oce).slice(0,1),sh(POOL.easy).slice(0,1)));
  return q}
 const okHit=(want,k)=>want===k||(CONT[want]&&CTOF[k]===want)||(want==='ar'&&k==='arc');
 function openMenu(){closeCard();menu.hidden=false;selD();hush();sayR([T.f_menu])}
 const selD=()=>$$('#gl8diffs .gl8opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===GS.diff));
 $$('#gl8diffs .gl8opt').forEach(b=>b.onclick=()=>{GS.diff=b.dataset.v;selD();sfx('pop');hush();sayR([T['d_'+GS.diff]]);need()});
 $('#gl8cancel').onclick=()=>{sfx('pop');menu.hidden=true;hush();if(GS.mode==='find')stopFind()};
 $('#gl8go').onclick=()=>{sfx('pop');menu.hidden=true;hush();startFind()};
 findB.onclick=()=>{sfx('pop');if(GS.mode==='find'){stopFind();return}openMenu()};
 function setFindBtn(){findB.querySelector('b').textContent=GS.mode==='find'?'自由轉':'找找看';findB.classList.toggle('on',GS.mode==='find')}
 function startFind(){GS.mode='find';closeCard();FX.sel=null;F={q:pickRound(GS.diff),i:0,miss:0,busy:false};dots.hidden=false;
  dots.innerHTML=F.q.map(()=>'<i></i>').join('');setFindBtn();need();tell(T.f_start,[T.f_start]).then(()=>later(ask,250))}
 function stopFind(){if(F&&F.zBack!=null)panTo(VW.lam,VW.phi,500,null,F.zBack);GS.mode='free';F=null;FX.hint=null;dots.hidden=true;setFindBtn();bub.textContent='';bub.classList.add('off');need()}
 function ask(){if(!F||!live())return;const k=F.q[F.i];F.miss=0;F.busy=false;FX.hint=null;$$('#gl8dots i').forEach((d,i)=>d.classList.toggle('now',i===F.i));
  const pol=POLAR[k];const q=T['q_'+k];const zb=F.zBack;F.zBack=null;// 上一題提示時鏡頭拉近了：拉回原來的大小
  if(pol){F.busy=true;bub.textContent=ht(q);bub.classList.remove('off');petHop();const lat=pol>0?58:-55;
   panTo(VW.lam,lat,1300,()=>{if(F)F.busy=false},zb);sayR([q,pol>0?T.f_top:T.f_bottom]);return}
  if(zb!=null)panTo(VW.lam,VW.phi,700,null,zb);
  tell(q)}
 function findTap(k,x,y){if(!F||F.busy)return;const want=F.q[F.i];hush();
  if(okHit(want,k)){F.busy=true;sfx('pop');try{tone(620+F.i*60,0,.16,'triangle',.08)}catch(_){}FX.hint=null;FX.sel={k:want,t:performance.now(),at:unproj(x,y)};need();
   if(HASCARD(want)){seen()[want]=1;sv()}
   const d=$$('#gl8dots i')[F.i];if(d){d.classList.add('on');try{burstEl(d,10)}catch(_){}}
   tag(x,y,NAME(want));const ok=[T.f_ok1,T.f_ok2,T.f_ok3][F.i%3];bub.textContent=ht(NAME(want)+'，'+ok);petHop();
   const extra=(want==='an'||want==='arc')?[T.fact_pole]:[];if(extra.length)bub.textContent=ht(NAME(want)+'，'+ok+' '+T.fact_pole);
   sayR([NAME(want),ok,...extra]).then(spoke=>later(next,spoke?400:(extra.length?2600:1500)));return}
  // 點錯：念出那裡的名字＋再找找看；第二次錯：轉過去、發光
  F.miss++;sfx('wrong');FX.sel={k,t:performance.now(),at:unproj(x,y)};need();tag(x,y,NAME(k));
  if(F.miss>=2){const c=CONT[want]?[CONT[want][1],CONT[want][2]]:CTOF[want]?MAP.ctry[want].c:want==='arc'?[VW.lam,84]:oceanAt(want);
   const lat=want==='an'||want==='so'?-58:want==='arc'||want==='ar'?60:c[1];F.busy=true;
   // 國家在畫面上太小：鏡頭一起拉近（等面積半徑放大到約 28 像素，最多 2.6 倍）；下一題再拉回來
   let z=null;if(CTOF[want]){const nz=28/(MAP.ctry[want].rad*D2R*VW.base);if(nz>VW.zoom*1.05){z=Math.min(2.6,nz);if(F.zBack==null)F.zBack=VW.zoom}}
   panTo(c[0],lat,1100,()=>{if(F)F.busy=false;FX.hint={k:want,at:want==='arc'?[c[0],86]:oceanAt(want)};need()},z);
   bub.textContent=ht(NAME(k)+'，'+T.f_hint);petHop();sayR([NAME(k),T.f_hint]);return}
  bub.textContent=ht(NAME(k)+'，'+T.f_again);petHop();sayR([NAME(k),T.f_again])}
 function next(){if(!F)return;F.i++;if(F.i>=F.q.length)return finish();ask()}
 async function finish(){const n=gems('globe8Day');try{confetti()}catch(e){}FX.hint=null;$$('#gl8dots i').forEach(d=>d.classList.remove('now'));
  bub.textContent=ht(T.f_end);petHop();await sayR([T.f_end,n>=3?T.gem3:T.gem1]);if(!live())return;
  later(()=>{stopFind();findB.querySelector('b').textContent='再找一次';bub.textContent=ht(n>=3?T.gem3:T.gem1);bub.classList.remove('off')},1200)}
 /* ---- 開場：轉到台灣 ---- */
 $('#pback').onclick=()=>{gTok++;cancelAnimationFrame(raf);raf=0;dropCache();hush();try{ro&&ro.disconnect()}catch(e){}go('park')};
 VW.zoom=1;VW.lam=GS.opened?121:1;VW.phi=GS.opened?22:8;layout();
 const opening=()=>{if(!live())return;if(!VW.R||!VW.w){layout()}panTo(121,22,calm?0:2400,()=>{FX.sel={k:'tw',t:performance.now()+1200};need()});
  later(()=>{tell(T.hi_tw).then(spoke=>later(()=>{if(GS.mode==='free'&&card.hidden&&menu.hidden)tell(T.tip)},spoke?300:2600))},calm?0:1300);GS.opened=true};
 later(opening,calm?0:350);need();
 window.__gl8={VW,FX,hitAt,tap:(x,y)=>tap(x,y),panTo,startFind,F:()=>F,menu:openMenu,need,setZoom,diff:d=>{GS.diff=d;need()},proj:(lon,lat)=>{setRot();return projLL(lon,lat)},judge,baseHit,ctr:k=>{setRot();const I=ctrInfo(k);return {X:I.p.X,Y:I.p.Y,z:I.p.z,rad:I.rad,c:MAP.ctry[k].c}},
  // 量效能用：連畫 n 幀（每幀換一個角度、強制畫完），回傳每幀毫秒
  bench:(n,hint,mv)=>{FX.hint=hint?{k:hint}:null;const a0=FX.anim;if(mv)FX.anim={bench:1};const t=performance.now();for(let i=0;i<n;i++){if(mv)VW.lam+=2.7;draw(performance.now());ctx.getImageData(0,0,1,1)}const ms=(performance.now()-t)/n;FX.anim=a0;FX.hint=null;need();return ms}};
};
const st=document.createElement('style');st.textContent=`
.gl8{position:relative;display:flex;flex-direction:column;height:100%;gap:6px;box-sizing:border-box;min-height:0}
.gl8st{position:relative;flex:1;min-height:280px;border-radius:22px;overflow:hidden;margin:0 6px;touch-action:none;user-select:none;-webkit-user-select:none;
 background:radial-gradient(120% 90% at 50% 40%,#3B3A9A 0%,#24205E 60%,#17143E 100%);box-shadow:0 4px 0 rgba(40,30,80,.18)}
.gl8st::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.8;background-image:radial-gradient(1.6px 1.6px at 12% 18%,#fff,transparent),radial-gradient(1.2px 1.2px at 82% 12%,#fff,transparent),radial-gradient(1.4px 1.4px at 70% 78%,#fff,transparent),radial-gradient(1.2px 1.2px at 24% 84%,#fff,transparent),radial-gradient(1.6px 1.6px at 92% 52%,#FFF3B0,transparent),radial-gradient(1.2px 1.2px at 6% 56%,#fff,transparent),radial-gradient(1.2px 1.2px at 46% 6%,#fff,transparent)}
#gl8cv{position:absolute;inset:0;display:block;touch-action:none;cursor:grab}
.gl8bub{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:max-content;max-width:min(calc(100% - 20px),560px);box-sizing:border-box;margin:0;padding:6px 16px;border-radius:18px;background:rgba(255,255,255,.94);color:#3A2A5A;font-size:clamp(16px,3.8vmin,22px);line-height:1.35;text-align:center;z-index:3;pointer-events:none;transition:opacity .3s}
.gl8bub:empty,.gl8bub.off{opacity:0}
.gl8pet{position:absolute;left:6px;bottom:4px;width:clamp(84px,21vmin,150px);z-index:2;pointer-events:none;transition:opacity .3s}
.gl8pet svg{width:100%;height:auto;display:block}
.gl8pet.hop{animation:gl8hop .5s ease-out}
@keyframes gl8hop{30%{transform:translateY(-12px)}60%{transform:translateY(0)}80%{transform:translateY(-4px)}}
.gl8find{position:absolute;left:0;right:0;margin:0 auto;width:max-content;bottom:10px;z-index:4;display:flex;align-items:center;gap:6px;min-height:48px;padding:4px 14px 4px 8px;border-radius:999px;border:3px solid #fff;background:linear-gradient(170deg,#FFE27A,#F7B43A);color:#3A2A55;font:inherit;font-size:17px;box-shadow:0 4px 0 rgba(0,0,0,.25);cursor:pointer}
.gl8find svg{width:28px;height:28px}.gl8find b{font-weight:400;white-space:nowrap}
.gl8find.on{background:linear-gradient(170deg,#BFE6FF,#7CB8F2)}
.gl8ctl{position:absolute;right:8px;bottom:8px;z-index:4;display:flex;flex-direction:column;gap:8px}
.gl8ctl button{width:48px;height:48px;border-radius:50%;border:3px solid rgba(255,255,255,.85);background:rgba(40,30,100,.78);color:#fff;font:inherit;font-size:24px;line-height:1;display:grid;place-items:center;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.25)}
.gl8ctl button svg{width:28px;height:28px}
.gl8dots{position:absolute;left:50%;bottom:72px;transform:translateX(-50%);display:flex;gap:6px;z-index:3;padding:5px 10px;border-radius:999px;background:rgba(20,16,60,.5)}
.gl8dots[hidden]{display:none}
.gl8dots i{width:22px;height:22px;border-radius:50%;border:2px dashed rgba(255,255,255,.7);box-sizing:border-box}
.gl8dots i.now{border-style:solid;border-color:#FFE27A;box-shadow:0 0 10px rgba(255,226,122,.8)}
.gl8dots i.on{border:0;background:radial-gradient(circle at 35% 30%,#FFF6C0,#FFC83A);box-shadow:0 0 8px rgba(255,214,90,.8)}
.gl8tags{position:absolute;inset:0;pointer-events:none;z-index:3}
.gl8tag{position:absolute;transform:translate(-50%,-140%);padding:3px 12px;border-radius:14px;background:#FFFDF2;color:#3A2A5A;font-size:clamp(15px,3.4vmin,20px);white-space:nowrap;box-shadow:0 3px 0 rgba(0,0,0,.25);transition:opacity .5s}
.gl8tag::after{content:'';position:absolute;left:50%;bottom:-7px;margin-left:-7px;border:7px solid transparent;border-top-color:#FFFDF2;border-bottom:0}
.gl8tag.out{opacity:0}
.gl8card{position:absolute;z-index:5;left:50%;bottom:10px;transform:translateX(-50%);width:min(94%,460px);box-sizing:border-box;display:flex;gap:10px;align-items:center;padding:10px 40px 10px 10px;border-radius:20px;background:#FFFDF6;color:#3A2A55;box-shadow:0 6px 0 rgba(0,0,0,.22)}
.gl8card[hidden]{display:none}
.gl8card.in{animation:gl8in .35s ease-out}
@keyframes gl8in{from{opacity:0;margin-bottom:-14px}to{opacity:1;margin-bottom:0}}
.gl8pic{flex:0 0 auto;width:clamp(84px,22vmin,120px);aspect-ratio:1}.gl8pic svg{width:100%;height:100%;display:block}
.gl8txt{min-width:0}.gl8txt b{display:block;font-weight:400;font-size:clamp(20px,4.6vmin,26px);line-height:1.2}
.gl8txt p{margin:3px 0 0;font-size:clamp(15px,3.4vmin,19px);line-height:1.4}.gl8txt p.gl8fact{font-size:clamp(13px,3vmin,16px);color:#6A5A8A}
.gl8hear{margin-top:6px;min-height:36px;padding:0 12px;border-radius:999px;border:2px solid #C8B8E8;background:#F4EEFF;color:#4A3A7A;font:inherit;font-size:14px;cursor:pointer}
.gl8x{position:absolute;right:6px;top:6px;width:34px;height:34px;border-radius:50%;border:0;background:#EEE6F8;color:#5A4A86;font-size:16px;cursor:pointer}
.gl8.carded:not(.land) .gl8pet,.gl8.carded:not(.land) .gl8ctl{opacity:0;pointer-events:none}
.gl8:not(.land) .gl8card{bottom:68px}
.gl8.land .gl8find{left:auto;right:8px;margin:0;bottom:auto;top:8px}.gl8.land .gl8dots{bottom:10px}
/* 橫放：小卡放右邊空白處，寵物在左邊 */
.gl8.land .gl8card{left:auto;right:64px;bottom:auto;top:max(66px,calc(50% - 150px));max-height:calc(100% - 74px);overflow:auto;width:clamp(150px,calc(var(--gm) - 70px),300px);flex-direction:column;align-items:stretch;text-align:center;padding:12px}
.gl8.land .gl8card.in{animation:gl8inr .35s ease-out}
@keyframes gl8inr{from{opacity:0;margin-right:-14px}to{opacity:1;margin-right:0}}
.gl8.land .gl8pic{width:100%;max-width:150px;margin:0 auto}
.gl8.land .gl8bub{left:10px;transform:none;max-width:max(150px,calc(var(--gm) - 24px));text-align:left}
.gl8.land .gl8card{padding-top:40px}.gl8.land .gl8x{right:8px;top:6px}
@media (orientation:landscape) and (max-height:500px){.gl8st{min-height:0}body[data-scr="globe8"] #btnMap{display:none}}
@media (max-height:460px){.gl8.land .gl8card{top:auto;bottom:8px;right:62px;width:min(300px,calc(var(--gm) - 70px));min-width:200px;flex-direction:row;align-items:center;text-align:left;padding:8px 36px 8px 8px}.gl8.land .gl8pic{width:72px;max-width:72px;margin:0}.gl8.land .gl8txt p.gl8fact{display:none}.gl8ctl{gap:5px}.gl8ctl button{width:42px;height:42px}.gl8find{min-height:42px}}
.gl8menu{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,16,60,.55);z-index:8;padding:12px;box-sizing:border-box}
.gl8menu[hidden]{display:none}
.gl8mc{background:#fff;color:#3A2A55;border-radius:22px;padding:14px 16px;max-width:520px;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}
.gl8mh{display:flex;gap:10px;align-items:center}.gl8mi{width:64px;height:64px;flex:none}.gl8mi svg{width:100%;height:100%}
.gl8mh b{font-size:22px;display:block;font-weight:400}.gl8mh small{font-size:15px}
.gl8lab{margin:10px 0 4px}.gl8row{display:flex;gap:8px}
.gl8opt{flex:1;min-height:64px;border:3px solid #EEE6F8;border-radius:16px;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;color:#3A2A55;font:inherit;cursor:pointer}
.gl8opt b{font-weight:400;font-size:18px}.gl8opt small{font-size:12.5px}.gl8opt.sel{border-color:#7A5CE0;background:#F0EAFF}
.gl8mb{display:flex;gap:10px;justify-content:center;margin-top:12px}.gl8mb .btn{min-width:8em;min-height:56px}.gl8mb .btn2{min-height:56px;white-space:nowrap;flex:none}
.gl8opt b,.gl8opt small{white-space:nowrap}
/* iPhone SE 這種窄的直式（QA 11/24）：「自由轉」「再加 30 個國家」不斷成兩行：選單邊距、按鈕內距縮小，小字跟著寬度縮 */
@media (max-width:420px){.gl8menu{padding:8px}.gl8mc{padding:12px 10px}.gl8row{gap:6px}.gl8opt{padding:4px 2px}.gl8opt small{font-size:min(12.5px,2.95vw);letter-spacing:-.02em}.gl8mb .btn{min-width:0;flex:1 1 auto}.gl8mb .btn2{padding-left:14px;padding-right:14px}}
.gl8.calm .gl8pet.hop,.gl8.calm .gl8card.in{animation:none}
@media (prefers-reduced-motion:reduce){.gl8pet.hop,.gl8card.in{animation:none}}`;document.head.appendChild(st);
window.__G8={T,gate,PIC,PICSVG,CT,ver:'2026-11-22'};
}catch(e){console.log('globe8',e)}}).toString()+')()')})();

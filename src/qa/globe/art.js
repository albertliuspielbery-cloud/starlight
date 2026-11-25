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
<path d="M72 52 Q80 44 88 50 Q92 56 86 60 Q80 62 74 60Z" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.6"/><circle cx="76" cy="46" r="3" fill="#F7F5EC" stroke="#B8C6D8" stroke-width="1.4"/><circle cx="89.5" cy="54" r="1.8" fill="#2A2238"/>${EYE(82,51,1.4)}`,
// 中國：長城、大貓熊和竹子（2026-11-25 加）
cn:()=>`${BG('#E2F2DA')}${CLOUD(80,16,.8)}<path d="M0 50 Q18 30 38 42 Q58 24 80 36 Q92 30 100 34 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#A9D896"/>
<path d="M0 54 Q18 34 38 46 Q58 28 80 40 Q92 34 100 38" stroke="#D9C49A" stroke-width="7" fill="none" stroke-linejoin="round"/>
<path d="M0 54 Q18 34 38 46 Q58 28 80 40 Q92 34 100 38" stroke="#B89A6A" stroke-width="1.6" fill="none" stroke-dasharray="3 3" transform="translate(0 -4.5)"/>
<rect x="31" y="32" width="12" height="13" fill="#D9C49A" stroke="${OL}" stroke-width="1.5"/><path d="M29 33 L37 26 L45 33Z" fill="#C2564A" stroke="${OL}" stroke-width="1.5" stroke-linejoin="round"/><rect x="35" y="37" width="4" height="8" rx="2" fill="#8A6A4A"/>
<rect x="73" y="26" width="11" height="12" fill="#D9C49A" stroke="${OL}" stroke-width="1.5"/><path d="M71 27 L78.5 20 L86 27Z" fill="#C2564A" stroke="${OL}" stroke-width="1.5" stroke-linejoin="round"/>
${GROUND(80,'#8CCB7A')}
<path d="M84 98 V40 M84 70 l7 -6 M84 56 l-6 -5" stroke="#5DA85A" stroke-width="3.4" stroke-linecap="round"/><path d="M84 52 h0 M84 66 h0 M84 82 h0" stroke="#3E8A42" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="92" cy="62" rx="6" ry="2.4" fill="#6FBF6A" transform="rotate(-30 92 62)"/><ellipse cx="76" cy="49" rx="6" ry="2.4" fill="#6FBF6A" transform="rotate(30 76 49)"/>
<ellipse cx="46" cy="80" rx="20" ry="17" fill="#FBFAF6" stroke="${OL}" stroke-width="1.6"/>
<ellipse cx="31" cy="92" rx="8" ry="5.5" fill="#2E2A33"/><ellipse cx="61" cy="92" rx="8" ry="5.5" fill="#2E2A33"/>
<path d="M27 70 Q22 82 30 84 Q36 82 34 72Z M65 70 Q70 82 62 84 Q56 82 58 72Z" fill="#2E2A33"/>
<path d="M28 66 Q46 74 64 66 L62 72 Q46 79 30 72Z" fill="#2E2A33"/>
<circle cx="33" cy="40" r="6.5" fill="#2E2A33"/><circle cx="59" cy="40" r="6.5" fill="#2E2A33"/>
<circle cx="46" cy="52" r="16" fill="#FBFAF6" stroke="${OL}" stroke-width="1.6"/>
<ellipse cx="39.5" cy="51" rx="4.6" ry="5.8" fill="#2E2A33" transform="rotate(25 39.5 51)"/><ellipse cx="52.5" cy="51" rx="4.6" ry="5.8" fill="#2E2A33" transform="rotate(-25 52.5 51)"/>
<circle cx="40" cy="50.5" r="1.9" fill="#fff"/><circle cx="52" cy="50.5" r="1.9" fill="#fff"/><circle cx="40.4" cy="50.9" r="1" fill="#1A1620"/><circle cx="51.6" cy="50.9" r="1" fill="#1A1620"/>
<ellipse cx="46" cy="57.5" rx="3" ry="2" fill="#2E2A33"/><path d="M43.5 60.5 Q46 62.5 48.5 60.5" stroke="#2E2A33" stroke-width="1.3" fill="none" stroke-linecap="round"/>
<ellipse cx="36" cy="58" rx="2.6" ry="1.6" fill="#FF9DB5" opacity=".5"/><ellipse cx="56" cy="58" rx="2.6" ry="1.6" fill="#FF9DB5" opacity=".5"/>`,
// 俄羅斯：一組大中小的木頭娃娃，後面是雪地和白樺樹（2026-11-25 加）
ru:()=>{const doll=(cx,b,s,c,c2)=>`<g transform="translate(${cx} ${b}) scale(${s})">
<path d="M-15 0 Q-18 -20 -11 -29 Q-14 -43 0 -45 Q14 -43 11 -29 Q18 -20 15 0Z" fill="${c}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M-11 -29 Q0 -24 11 -29" stroke="${OL}" stroke-width="1.2" fill="none"/>
<ellipse cx="0" cy="-33" rx="7.5" ry="7" fill="#FBEBD8"/><path d="M-7.5 -35 Q0 -43 7.5 -35 Q4 -39 0 -39 Q-4 -39 -7.5 -35Z" fill="#7A4A2A"/>
${EYE(-3,-33,1.3)}${EYE(3,-33,1.3)}<circle cx="-4.6" cy="-30" r="1.5" fill="#FF8AA8" opacity=".7"/><circle cx="4.6" cy="-30" r="1.5" fill="#FF8AA8" opacity=".7"/><path d="M-1.4 -29.2 Q0 -28 1.4 -29.2" stroke="#C2564A" stroke-width="1" fill="none" stroke-linecap="round"/>
<ellipse cx="0" cy="-12" rx="9" ry="10" fill="#FFF6E6"/>${FLOWER(0,-13,3.2,c2)}<path d="M-4 -5 q4 3 8 0" stroke="#5DA85A" stroke-width="1.4" fill="none"/></g>`;
 const birch=(x,h)=>`<rect x="${x-2.5}" y="${76-h}" width="5" height="${h}" fill="#FAFAFA" stroke="#C8CCD8" stroke-width=".8"/><path d="M${x-2.5} ${80-h*.7} h3 M${x} ${80-h*.45} h2.5 M${x-2.5} ${80-h*.25} h2" stroke="#3A3540" stroke-width="1.5"/><ellipse cx="${x}" cy="${78-h}" rx="9" ry="7" fill="#F2C85A" opacity=".85"/>`;
 return `${BG('#E3ECFA')}${CLOUD(22,16,.8)}${birch(12,46)}${birch(88,52)}${birch(76,38)}<path d="M0 74 Q30 68 60 74 T100 72 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#FFFFFF"/><path d="M0 74 Q30 68 60 74 T100 72" stroke="#D8E2F2" stroke-width="2" fill="none"/>
${doll(70,92,.62,'#4F7FD6','#FFD45A')}${doll(30,92,.78,'#F2B33A','#E2543B')}${doll(50,94,1,'#E2543B','#FFD45A')}`},
// 芬蘭：雪地小木屋、樅樹、極光（聖誕老人村用小木屋表示，不畫人物）
fi:()=>{const fir=(x,b,h)=>`<path d="M${x} ${b-h} L${x+h*.36} ${b-h*.45} H${x+h*.18} L${x+h*.44} ${b-h*.08} H${x-h*.44} L${x-h*.18} ${b-h*.45} H${x-h*.36}Z" fill="#3E8F6A" stroke="#2E6A50" stroke-width="1.2" stroke-linejoin="round"/><path d="M${x-h*.3} ${b-h*.5} Q${x} ${b-h*.6} ${x+h*.3} ${b-h*.5}" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="${x-2}" y="${b-h*.08}" width="4" height="${h*.1}" fill="#7A5A3A"/>`;
 return `${BG('#22306A')}<circle cx="16" cy="12" r="1.2" fill="#fff"/><circle cx="88" cy="10" r="1" fill="#fff"/><circle cx="60" cy="6" r="1.2" fill="#fff"/><circle cx="34" cy="26" r=".9" fill="#fff"/>
<path d="M0 34 Q18 14 38 28 T76 18 T100 20 V34 Q80 26 62 36 T24 38 T0 44Z" fill="#6FE8B4" opacity=".6"/><path d="M0 24 Q26 8 50 20 T100 10 V20 Q74 16 52 28 T0 32Z" fill="#9FF0C8" opacity=".35"/>
<path d="M0 70 Q30 62 60 68 T100 66 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#F4F8FF"/>
${fir(14,76,30)}${fir(88,74,26)}
<rect x="34" y="54" width="34" height="24" fill="#B9773F" stroke="${OL}" stroke-width="1.6"/><path d="M34 60 H68 M34 66 H68 M34 72 H68" stroke="#9A5E2E" stroke-width="1"/>
<path d="M29 56 L51 36 L73 56Z" fill="#D8584A" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/><path d="M29 56 L51 36 L73 56 L70 58 L51 41 L32 58Z" fill="#fff"/>
<rect x="38" y="60" width="10" height="9" rx="1.5" fill="#FFD86A" stroke="${OL}" stroke-width="1.2"/><path d="M43 60 V69 M38 64.5 H48" stroke="${OL}" stroke-width="1"/>
<path d="M54 78 V64 Q59 60 64 64 V78Z" fill="#7A4A2A" stroke="${OL}" stroke-width="1.2"/><circle cx="62" cy="71" r="1" fill="#FFD86A"/>
<rect x="58" y="38" width="6" height="10" fill="#8A6A5A" stroke="${OL}" stroke-width="1.2"/><circle cx="62" cy="33" r="3" fill="#fff" opacity=".7"/><circle cx="66" cy="27" r="2.4" fill="#fff" opacity=".5"/>`},
// 土耳其：熱氣球飛在尖尖的石頭山上
tr:()=>{const bal=(x,y,s,c,c2)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -16 Q14 -16 14 -2 Q14 8 4 14 H-4 Q-14 8 -14 -2 Q-14 -16 0 -16Z" fill="${c}" stroke="${OL}" stroke-width="1.4"/><path d="M0 -16 Q6 -2 4 14 M0 -16 Q-6 -2 -4 14" stroke="${c2}" stroke-width="3" fill="none"/><path d="M-4 14 L-3 19 M4 14 L3 19" stroke="${OL}" stroke-width="1"/><rect x="-4" y="19" width="8" height="6" rx="1.5" fill="#A86F4A" stroke="${OL}" stroke-width="1.2"/></g>`;
 const rock=(x,b,h,w)=>`<path d="M${x-w} ${b} Q${x-w*.6} ${b-h*.7} ${x-w*.25} ${b-h} Q${x} ${b-h*1.12} ${x+w*.25} ${b-h} Q${x+w*.6} ${b-h*.7} ${x+w} ${b}Z" fill="#F0C9A0" stroke="#C9976A" stroke-width="1.2"/><path d="M${x-w*.3} ${b-h} Q${x} ${b-h*1.3} ${x+w*.3} ${b-h}Z" fill="#B98A62"/>`;
 return `${BG('#FFE7D2')}${SUN(84,16,7,'#FFC24A')}${bal(28,30,1,'#E2543B','#FFD45A')}${bal(66,22,.7,'#5B7FD6','#FFFFFF')}${bal(86,44,.5,'#6FBF6A','#FFD45A')}${bal(46,50,.45,'#B48CFF','#FFFFFF')}
<path d="M0 82 Q30 74 60 80 T100 78 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#E8B886"/>${rock(18,86,26,9)}${rock(38,86,34,10)}${rock(62,86,22,8)}${rock(82,86,30,9)}
<path d="M0 90 Q50 84 100 92 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#D9A26E"/>`},
// 阿聯酋：沙漠、很高很高的大樓、駱駝（不是哪一棟真的大樓）
ae:()=>`${BG('#DDEEFF')}${SUN(18,18,8,'#FFC24A')}${CLOUD(84,30,.6)}
<path d="M58 84 L60 30 L62 30 L63 14 L64 30 L66 30 L68 84Z" fill="#C8D6EA" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/><path d="M60.5 44 H67.5 M60 58 H68 M59.5 72 H68.5" stroke="#8FA8CC" stroke-width="1.2"/>
<path d="M44 84 V56 H54 V84Z M72 84 V62 H82 V84Z" fill="#AFC0DA" stroke="${OL}" stroke-width="1.3"/><path d="M47 62 h4 M47 70 h4 M75 68 h4 M75 76 h4" stroke="#fff" stroke-width="2"/>
<path d="M0 80 Q20 66 44 78 Q66 68 100 80 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#F2CF8A"/><path d="M0 90 Q34 80 62 90 T100 88 V82 Q100 100 82 100 H18 Q0 100 0 82Z" fill="#E8B866"/>
<path d="M14 90 V80 M18 90 V80 M28 90 V80 M32 90 V80" stroke="#B9803F" stroke-width="2.6" stroke-linecap="round"/><path d="M12 82 Q12 72 20 72 Q22 66 26 72 Q34 72 34 82Z" fill="#D9A050" stroke="${OL}" stroke-width="1.3"/>
<path d="M33 78 Q38 72 38 64 Q38 60 42 60 Q45 61 44 64 L40 65 Q40 74 35 80Z" fill="#D9A050" stroke="${OL}" stroke-width="1.3" stroke-linejoin="round"/>${EYE(41,62,1)}`,
// 坦尚尼亞：山頂有雪的大山、草原的樹、小獅子
tz:()=>`${BG('#FFF0D6')}${SUN(84,18,8,'#FFC24A')}<path d="M0 66 L24 40 Q34 30 50 30 Q66 30 76 40 L100 66Z" fill="#9C8CB8"/><path d="M33 33 Q40 29 50 29 Q60 29 67 33 L62 38 L56 34 L50 39 L44 34 L38 38Z" fill="#fff"/>
${GROUND(70,'#D8CF7A')}<path d="M80 74 V56" stroke="#7A5A3A" stroke-width="3.2"/><ellipse cx="80" cy="54" rx="16" ry="5" fill="#6FA85A"/><ellipse cx="72" cy="52" rx="7" ry="3" fill="#7DB868"/>
<ellipse cx="38" cy="86" rx="15" ry="8" fill="#E8A84A" stroke="${OL}" stroke-width="1.4"/><path d="M26 90 V96 M33 92 V97 M44 92 V97 M50 90 V96" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><path d="M53 84 Q60 80 58 74" stroke="#E8A84A" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="58" cy="73" r="2.4" fill="#A8642A"/>
<circle cx="26" cy="74" r="12" fill="#B8682E"/><circle cx="26" cy="75" r="8" fill="#F2BC5A" stroke="${OL}" stroke-width="1.2"/>${EYE(23,73,1.2)}${EYE(29,73,1.2)}<ellipse cx="26" cy="77.5" rx="2" ry="1.4" fill="#5A3A2A"/><path d="M24 79.5 Q26 81 28 79.5" stroke="#5A3A2A" stroke-width="1" fill="none"/>`,
// 蒙古：圓圓的蒙古包、大草原、小馬（不放人物、不放真的地標）
mn:()=>`${BG('#DDEFFF')}${SUN(82,18,8,'#FFC24A')}${CLOUD(26,20,.8)}<path d="M0 52 Q26 40 52 48 Q78 40 100 48 V100 H0Z" fill="#B9DE8E"/>
${GROUND(64,'#9CD27A')}
<path d="M12 74 V60 Q12 52 30 50 Q48 52 48 60 V74Z" fill="#FBF6EA" stroke="${OL}" stroke-width="1.6"/><path d="M8 61 Q30 36 52 61 Q30 54 8 61Z" fill="#F4EEDF" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M12 64 H48" stroke="#E2543B" stroke-width="2.6"/><path d="M12 68 H48" stroke="#5B7FD6" stroke-width="1.4"/><circle cx="30" cy="44" r="2.4" fill="#E2543B" stroke="${OL}" stroke-width="1"/>
<path d="M25 74 V63 Q30 59 35 63 V74Z" fill="#E2543B" stroke="${OL}" stroke-width="1.3"/><path d="M27.5 66 h5 M27.5 70 h5" stroke="#FFD45A" stroke-width="1.2"/>
<path d="M60 86 V94 M66 87 V95 M78 87 V95 M84 86 V94" stroke="#7A4A2A" stroke-width="3.4" stroke-linecap="round"/>
<ellipse cx="72" cy="82" rx="15" ry="8" fill="#B9773F" stroke="${OL}" stroke-width="1.4"/>
<path d="M82 78 Q86 68 88 62 L95 64 Q93 72 88 82Z" fill="#B9773F" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M86 60 Q89 54 96 58 Q98 63 95 66 Q90 66 86 63Z" fill="#B9773F" stroke="${OL}" stroke-width="1.4"/><path d="M88 57 l1 -4 2 4Z" fill="#B9773F" stroke="${OL}" stroke-width="1"/>
<path d="M85 61 Q81 66 82 74 M84 64 Q80 70 81 76" stroke="#5A3A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M57 80 Q52 84 54 92" stroke="#5A3A2A" stroke-width="3" fill="none" stroke-linecap="round"/>${EYE(91,60,1.1)}`
};

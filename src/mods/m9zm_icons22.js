/* ================= 2.2 動手玩補圖（m9zm_icons22.js）—— 2026-11-28 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室；圖示由 Claude 繪製） =================
 * 為什麼：m9zg（第 41～45 章動手玩）的 ic() 找不到 ICONART 就用系統 emoji，iPhone 上是立體 emoji，跟遊戲畫風不一樣；
 *   🏥 的系統 emoji 是紅十字（受法律保護的標誌），一定要換。
 * 做什麼：
 *   1. 用 SVG 畫 30 個 64×64 圖示（平塗＋柔和漸層、白色亮點、沒有黑色描邊），登記進 ICONART（已經有的不蓋掉）；
 *      每次讀都換一組唯一的漸層 id（同一畫面出現兩次 iOS 才不會壞）。診所用青綠色愛心＋白色小加號，不用紅十字。
 *   2. 芒果（第 41 章禮物、小小廚師）原本圓圓橘橘像橘子 → 改成長腰形、黃到橘、帶紅暈的愛文芒果。
 *      禮物圖在 m9zd 的閉包裡拿不到，所以：G22.ART／SIL／svg／sil／inner／silInner 換成新圖；m9zd 自己畫出來的舊芒果（禮物卡、進度牌）在畫面上換掉；
 *      小小廚師的芒果包 G22.chefIcon。window.__m9zm.mango(u)、mangoSil(色) 給別人用。
 *   3. 題目文字（m9zg 包的 .h22pq）用 text-wrap:balance，關鍵詞和片語不從中間斷行。
 * 沒有新台詞。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(typeof ICONART==='undefined')return;
const IA=b=>`<svg viewBox="0 0 64 64" aria-hidden="true">${b}</svg>`;
const lg=(i,st,x2=0,y2=1,x1=0,y1=0)=>`<linearGradient id="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:''}/>`).join('')}</linearGradient>`;
const rg=(i,st,cx=.4,cy=.35,r=.75)=>`<radialGradient id="${i}" cx="${cx}" cy="${cy}" r="${r}">${st.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:''}/>`).join('')}</radialGradient>`;
const D=g=>`<defs>${g}</defs>`;
const hl=(x,y,rx,ry,r=-30,o=.55)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${x} ${y})" fill="#fff" opacity="${o}"/>`;
const sh=(cx=32,rx=22,cy=59)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.8" fill="#3A2A5A" opacity=".14"/>`;
const eye=(x,y,r=2.6)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r*1.2).toFixed(1)}" fill="#3A2A5C"/><circle cx="${(x+r*.35).toFixed(1)}" cy="${(y-r*.45).toFixed(1)}" r="${(r*.4).toFixed(1)}" fill="#fff"/>`;
const blush=(x,y,rx=3.4,ry=2.1)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FF8FAB" opacity=".55"/>`;
const N=v=>(+v).toFixed(1);
const star=(cx,cy,R,r=R*.48)=>'M'+Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,q=i%2?r:R;return N(cx+q*Math.cos(a))+' '+N(cy+q*Math.sin(a))}).join(' L')+'Z';
const spark=(x,y,r)=>`M${N(x)} ${N(y-r)} Q${N(x+r*.18)} ${N(y-r*.18)} ${N(x+r)} ${N(y)} Q${N(x+r*.18)} ${N(y+r*.18)} ${N(x)} ${N(y+r)} Q${N(x-r*.18)} ${N(y+r*.18)} ${N(x-r)} ${N(y)} Q${N(x-r*.18)} ${N(y-r*.18)} ${N(x)} ${N(y-r)}Z`;
const heart=(x,y,r)=>`M${N(x)} ${N(y+r*.9)} C${N(x-r*1.5)} ${N(y-r*.1)} ${N(x-r*.9)} ${N(y-r*1.2)} ${N(x)} ${N(y-r*.45)} C${N(x+r*.9)} ${N(y-r*1.2)} ${N(x+r*1.5)} ${N(y-r*.1)} ${N(x)} ${N(y+r*.9)}Z`;
const GOLD=[[0,'#FFF4B8'],[.55,'#FFD04A'],[1,'#E89E22']],WOOD=[[0,'#F2C08A'],[1,'#C8844E']];
// ---------- 圖示（id 是基本名，讀的時候 uniq() 換成唯一） ----------
const ART={
 /* 美術館、起點、櫃台 */
 '🛎️':()=>IA(D(lg('zmB',GOLD)+lg('zmBb',[[0,'#D9C2FF'],[1,'#A98AE8']]))+sh(32,25,57)+`<rect x="7" y="45" width="50" height="10" rx="5" fill="url(#zmBb)"/><rect x="10" y="45.6" width="44" height="3" rx="1.5" fill="#fff" opacity=".45"/>
  <path d="M11 46 Q11 22 32 21 Q53 22 53 46Z" fill="url(#zmB)"/><path d="M12 46 Q32 41.6 52 46" stroke="#E89E22" stroke-width="2" fill="none" opacity=".55"/>
  <rect x="29" y="14" width="6" height="8.6" rx="2.4" fill="#E8A228"/><ellipse cx="32" cy="13.6" rx="7.6" ry="3.6" fill="#FFD24D"/><ellipse cx="30" cy="12.6" rx="3" ry="1.2" fill="#fff" opacity=".7"/>
  ${hl(21,33,3.2,8,25)}<path d="${spark(53,13,4.4)}" fill="#FFF3B0"/>`),
 '🚩':()=>IA(D(lg('zmF',[[0,'#FFB8D2'],[.6,'#FF7FAE'],[1,'#E8609A']],1,0)+lg('zmFp',WOOD,1,0))+sh(21,13,58.6)+`<rect x="16.6" y="9" width="5.4" height="50" rx="2.7" fill="url(#zmFp)"/><circle cx="19.3" cy="8.6" r="4.4" fill="#FFD24D"/><circle cx="18" cy="7.4" r="1.4" fill="#fff" opacity=".8"/>
  <path d="M22 12.6 Q33 6.6 43 12 Q51 16.6 58 13 V36 Q50 40.6 42 35.6 Q32 29.6 22 35.4Z" fill="url(#zmF)"/><path d="M22 30 Q32 24.6 42 30.4 Q50 35 58 31.6 V36 Q50 40.6 42 35.6 Q32 29.6 22 35.4Z" fill="#E8609A" opacity=".35"/>
  <path d="${star(40,22.6,7)}" fill="#FFF3B0" stroke="#FFF3B0" stroke-width="1.6" stroke-linejoin="round"/>${hl(28,15.6,2,4.4,60,.6)}`),
 '🚉':()=>IA(D(lg('zmM',[[0,'#A8F0E8'],[.6,'#5CCFC8'],[1,'#36A8B8']]))+sh(32,24,59)+`<rect x="12" y="53" width="40" height="4.6" rx="2.3" fill="#9A8AD0"/>
  <path d="M22 53 L18 57.6 M42 53 L46 57.6" stroke="#7A6AB8" stroke-width="3" stroke-linecap="round"/>
  <rect x="11" y="7" width="42" height="46" rx="13" fill="url(#zmM)"/><rect x="17" y="13" width="30" height="18" rx="6" fill="#E8FBFF"/><path d="M20.6 15.6 H28 L21.6 28.4 H20 Q19.4 28.4 19.4 27Z" fill="#fff" opacity=".9"/>
  <rect x="11" y="35" width="42" height="5.4" fill="#FFE27A"/><circle cx="19.6" cy="46" r="3.6" fill="#FFF6C8"/><circle cx="44.4" cy="46" r="3.6" fill="#FFF6C8"/><rect x="26" y="43.6" width="12" height="5" rx="2.5" fill="#2E8A9A" opacity=".35"/>
  ${hl(15.6,20,1.8,5,0,.5)}`),
 '📚':()=>IA(sh(32,25,58.6)+`<g><rect x="7" y="44" width="50" height="12" rx="3.4" fill="#6FB6FF"/><rect x="45" y="46" width="10" height="8" rx="1.6" fill="#FFFDF5"/><path d="M46.6 48.4 H54 M46.6 51.4 H54" stroke="#D8E2F2" stroke-width="1"/><rect x="11" y="44" width="3" height="12" fill="#fff" opacity=".45"/></g>
  <g transform="rotate(-4 32 38)"><rect x="11" y="32.6" width="44" height="11.4" rx="3.4" fill="#FF8FB8"/><rect x="11.6" y="34.6" width="9" height="7.4" rx="1.6" fill="#FFFDF5"/><path d="M13 37 H19.6 M13 39.8 H19.6" stroke="#F2D8E2" stroke-width="1"/><rect x="50" y="32.6" width="3" height="11.4" fill="#fff" opacity=".4"/></g>
  <g transform="rotate(3 32 26)"><rect x="9" y="21" width="44" height="11.4" rx="3.4" fill="#FFD24D"/><rect x="41" y="23" width="10" height="7.4" rx="1.6" fill="#FFFDF5"/><path d="M42.6 25.4 H50 M42.6 28.2 H50" stroke="#EEE2C2" stroke-width="1"/><path d="${star(22,26.8,3.8)}" fill="#fff" opacity=".85"/></g>
  <path d="M30 21.6 Q30 12 36 8" stroke="#8FD08A" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M35 9 Q42 5 46 10 Q40 13 35 9Z" fill="#5CC98A"/>${hl(14,46.6,1.4,3,0,.5)}`),
 // 診所：青綠色愛心＋白色小加號（不用紅十字）
 '🏥':()=>IA(D(lg('zmCr',[[0,'#8FE6DA'],[1,'#2EA898']])+lg('zmCw',[[0,'#FFF4EA'],[1,'#FFD6C2']]))+sh(32,25,58.6)+`<rect x="13" y="25" width="38" height="32" rx="3.6" fill="url(#zmCw)"/><rect x="13" y="25" width="38" height="3.4" fill="#F2E2CE"/>
  <path d="M8.6 27.4 L32 9 L55.4 27.4 Q56.4 29 54.6 29 H9.4 Q7.6 29 8.6 27.4Z" fill="url(#zmCr)"/><path d="M15 25 L32 12.4 L49 25" stroke="#fff" stroke-width="1.6" fill="none" opacity=".45" stroke-linejoin="round"/>
  <path d="${heart(32,37.4,7.6)}" fill="#2EB8A8"/><path d="M32 33 V40.6 M28.2 36.8 H35.8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M26.6 57 V49.6 Q32 44.6 37.4 49.6 V57Z" fill="#8FD8CF"/><circle cx="35" cy="52.6" r=".9" fill="#2EA898"/>
  <rect x="16.4" y="45.6" width="7" height="7" rx="2" fill="#BFEFFF"/><rect x="40.6" y="45.6" width="7" height="7" rx="2" fill="#BFEFFF"/><path d="M17.6 47 L20 47 L17.6 50Z" fill="#fff" opacity=".8"/><path d="M41.8 47 L44.2 47 L41.8 50Z" fill="#fff" opacity=".8"/>
  ${hl(22,22,1.6,4.4,-52,.55)}`),
 '⛵':()=>IA(D(lg('zmSs',[[0,'#B8ECFF'],[1,'#5AB4F0']])+lg('zmSh',[[0,'#FFB0C6'],[1,'#EE6A92']])+lg('zmSw',[[0,'#FFFFFF'],[1,'#BCD4FF']],1,1))+`<rect x="30.6" y="7" width="3.2" height="38" rx="1.6" fill="#B88A5E"/><path d="M33.8 8 L42.6 10.6 L33.8 13.4Z" fill="#FF8FB0"/>
  <path d="M34.6 12 Q50.6 24 53.6 41.6 H34.6Z" fill="url(#zmSw)"/><path d="M34.6 28 Q44 29.6 50.6 33.6 L52 37 Q44 32.6 34.6 32Z" fill="#FF9FC0"/>
  <path d="M29.8 16 Q18.6 28 13.6 41.6 H29.8Z" fill="#FFE27A"/><path d="M29.8 30 Q23 32 17.6 35" stroke="#FFF6C8" stroke-width="2.4" fill="none"/>
  <path d="M8.6 44 H55.4 Q52 54.6 41 54.6 H23 Q12.6 54.6 8.6 44Z" fill="url(#zmSh)"/><circle cx="22" cy="48.6" r="2" fill="#FFF3F7"/><circle cx="32" cy="48.6" r="2" fill="#FFF3F7"/><circle cx="42" cy="48.6" r="2" fill="#FFF3F7"/>
  <path d="M3 54 Q9 50.4 15 54 T27 54 T39 54 T51 54 T63 54 V61 H3Z" fill="url(#zmSs)"/><path d="M8 57.6 Q12 55.6 16 57.6 M36 58 Q40 56 44 58" stroke="#fff" stroke-width="1.4" fill="none" opacity=".7" stroke-linecap="round"/>
  ${hl(41,22,1.8,5,-20,.6)}`),
 '🖼️':()=>IA(D(lg('zmPf',GOLD,1,1))+sh(32,25,59.4)+`<rect x="5" y="8" width="54" height="47" rx="6" fill="url(#zmPf)"/><rect x="5" y="8" width="54" height="47" rx="6" fill="none" stroke="#FFF6C8" stroke-width="1.4" opacity=".7"/>
  <rect x="11" y="14" width="42" height="35" rx="2.4" fill="#C6ECFF"/><circle cx="21" cy="23" r="5" fill="#FFD24D"/><path d="M21 15 V13.4 M21 31 V32.6 M13 23 H11.6 M29 23 H30.4" stroke="#FFD24D" stroke-width="1.6" stroke-linecap="round"/>
  <ellipse cx="41" cy="21.6" rx="6.6" ry="3.2" fill="#fff"/><ellipse cx="45" cy="20" rx="4" ry="3" fill="#fff"/>
  <path d="M11 40 Q22 30.4 33 37.6 Q42 32 53 37 V49 H11Z" fill="#7FD08A"/><path d="M11 44 Q26 38 40 43.6 Q47 41.6 53 43 V49 H11Z" fill="#5CBF72"/>
  <circle cx="42" cy="40.6" r="2.4" fill="#FF8FB8"/><circle cx="47" cy="42.6" r="2" fill="#FFF3B0"/><circle cx="20" cy="43" r="2.2" fill="#B99CFF"/>${hl(10,14.6,1.4,3.4,40,.7)}`),
 // 變色龍／蜥蜴（全遊戲的 🦎：會變顏色、像蜥蜴一樣有鱗片）
 '🦎':()=>IA(D(lg('zmLc',[[0,'#7FE08A'],[.55,'#C8E86A'],[1,'#FFB0C8']],1,0))+sh(34,24,58.6)+`<path d="M25 43 L22 52 M35 43 L34 52 M45 42 L48 51" stroke="#6FC27A" stroke-width="3.6" stroke-linecap="round"/><path d="M19 52.6 H25 M31 52.6 H37 M45 51.6 H51" stroke="#6FC27A" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M15 40 Q4.6 40.6 5 31 Q5.6 23 13.6 24.6 Q19.6 26.4 16.6 31.6 Q14.6 34 12 31.6" stroke="url(#zmLc)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M12 38 Q12.6 20 30 19 Q46 18 51 27 Q58.6 25.4 59.4 34 Q59.4 42 50.6 42.4 L19 44 Q12 44 12 38Z" fill="url(#zmLc)"/>
  <path d="M19 21.6 Q23 13.6 27.4 19.4 Q31.4 12.4 35.6 18.6 Q39.6 12.6 43.6 20" stroke="#5CC98A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="26" cy="31" r="2.2" fill="#fff" opacity=".6"/><circle cx="34" cy="28" r="1.8" fill="#fff" opacity=".6"/><circle cx="40" cy="34" r="1.8" fill="#fff" opacity=".6"/><circle cx="21" cy="36" r="1.5" fill="#fff" opacity=".6"/>
  <circle cx="51.6" cy="31.6" r="5.4" fill="#fff"/>${eye(52.4,31.8,2.6)}${blush(55.6,38.6,2.6,1.6)}<path d="M51.4 39.6 Q54.6 41.4 57.6 39.6" stroke="#C8607A" stroke-width="1.4" fill="none" stroke-linecap="round"/>${hl(24,24,2,5,70,.55)}`),
 // 美術館地圖「變變的畫」：畫框裡一隻會換顏色的變色龍（只給 m9zg 地圖用）
 'i:zm22cham':()=>IA(D(lg('zmLf',[[0,'#E2CCFF'],[1,'#9F7BE8']],1,1)+lg('zmLb',[[0,'#7FE08A'],[.5,'#FFD24D'],[1,'#FF8FC0']],1,0))+sh(32,25,59.4)+`<rect x="5" y="8" width="54" height="47" rx="6" fill="url(#zmLf)"/><rect x="10.6" y="13.6" width="42.8" height="35.8" rx="2.6" fill="#FFFDF5"/>
  <path d="M33 40 L31 45.6 M24 40 L22 45.6 M42 39.6 L44 45" stroke="#FFB0A0" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M20 37.6 Q14 38.4 14.4 33.2 Q15 28.6 19.4 29.6 Q22.6 30.6 20.6 33.4" stroke="url(#zmLb)" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M19 37 Q19.4 26 31 25 Q42 24.2 45.6 30 Q51 27.6 51.6 33.4 Q51.6 39 45 39.4 L24 40.2 Q19 40.2 19 37Z" fill="url(#zmLb)"/>
  <path d="M24 25.6 Q27 21.6 30 25 Q33 21.4 36 24.8 Q39 21.6 41.6 25.6" stroke="#5CC98A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <circle cx="30" cy="32.6" r="1.8" fill="#fff" opacity=".7"/><circle cx="37" cy="31.6" r="1.5" fill="#fff" opacity=".7"/><circle cx="25" cy="34.4" r="1.3" fill="#fff" opacity=".7"/>
  <circle cx="46.6" cy="31.6" r="3.6" fill="#fff"/>${eye(47,31.8,1.9)}${blush(49.6,36.4,2.2,1.4)}<path d="M47.6 37.4 Q49.6 38.6 51.2 37.4" stroke="#C8607A" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="${spark(14.6,18.6,3.2)}" fill="#FFD24D"/>${hl(9,14,1.2,3,40,.7)}`),
 '🏺':()=>IA(D(lg('zmV',[[0,'#FFC896'],[.6,'#F29A62'],[1,'#DA7448']],1,0))+sh(32,18,59)+`<path d="M27 19.6 Q16.6 17.6 17.6 28.4" stroke="#E2804E" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M37 19.6 Q47.4 17.6 46.4 28.4" stroke="#E2804E" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M25 9 H39 V12.6 Q37 14.6 37.4 18.4 Q50 24.6 50 38 Q50 50.6 40.4 57 H23.6 Q14 50.6 14 38 Q14 24.6 26.6 18.4 Q27 14.6 25 12.6Z" fill="url(#zmV)"/>
  <rect x="23.6" y="7" width="16.8" height="4.6" rx="2.3" fill="#F7A872"/><rect x="14.6" y="32" width="34.8" height="8" fill="#FFF3D6"/>
  <path d="M15.6 36 L19 33.4 L22.4 36 L25.8 33.4 L29.2 36 L32.6 33.4 L36 36 L39.4 33.4 L42.8 36 L46.2 33.4 L48.4 35" stroke="#3FB8A8" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
  <circle cx="22" cy="46" r="1.6" fill="#FFF3D6"/><circle cx="32" cy="48" r="1.6" fill="#FFF3D6"/><circle cx="42" cy="46" r="1.6" fill="#FFF3D6"/>${hl(22,26,2.4,6,30,.55)}`),
 '🪑':()=>IA(D(lg('zmW',WOOD,1,0))+sh(32,22,58.4)+`<rect x="15" y="7" width="5.4" height="51" rx="2.7" fill="url(#zmW)"/><rect x="43.6" y="7" width="5.4" height="51" rx="2.7" fill="url(#zmW)"/>
  <rect x="15" y="9" width="34" height="15" rx="7" fill="#E6A86E"/><rect x="19" y="12.6" width="26" height="7.4" rx="3.7" fill="#F7CFA0"/><path d="M24 14.6 Q32 12 40 14.6" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6"/>
  <rect x="11.4" y="33.4" width="41.2" height="8" rx="4" fill="#C8844E"/><rect x="12.6" y="28" width="38.8" height="8" rx="4" fill="#FF9FC0"/><path d="M17 30 Q32 28 47 30" stroke="#fff" stroke-width="1.6" fill="none" opacity=".6"/>
  <rect x="12.6" y="40" width="5.4" height="18" rx="2.7" fill="#C8844E"/><rect x="46" y="40" width="5.4" height="18" rx="2.7" fill="#C8844E"/>${hl(17.6,16,1,4,0,.5)}`),
 /* 注音配對、分籃子 */
 '🍃':()=>IA(D(lg('zmL1',[[0,'#B4F09E'],[1,'#4CB86A']],1,1)+lg('zmL2',[[0,'#D8F59A'],[1,'#7CCB5A']],1,1))+`<path d="M8 50 Q6 24 34 10 Q41 30 27 44 Q18 51 8 50Z" fill="url(#zmL1)"/><path d="M10.6 48 Q21 32 32 15" stroke="#EAFFE2" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".85"/><path d="M17 37 L13 31 M22 30.6 L19 24 M21 39 L27 37" stroke="#EAFFE2" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M27 57 Q37 35 59 32 Q59 48 45 55 Q36 59 27 57Z" fill="url(#zmL2)"/><path d="M29 56 Q42 45 57 34" stroke="#F4FFE2" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".85"/>
  <path d="M41 13 Q48 10 54 14.6 M44 20 Q50 18.4 56 21" stroke="#BFE4FF" stroke-width="2.4" fill="none" stroke-linecap="round"/>${hl(18,26,2,5,30)}`),
 '🦐':()=>IA(D(lg('zmSr',[[0,'#FFB89E'],[1,'#FF7A6A']],1,1))+`<path d="M24 49 L11 43 Q8.6 52 13 58.6Z" fill="#FF8A6E"/><path d="M24 49 L13 51 L13 58.6Z" fill="#FF7A62" opacity=".6"/>
  <path d="M41 14 Q55 25 49 40 Q42 52 25 49" stroke="url(#zmSr)" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M43.6 20.6 L54 17.6 M47.6 30.4 L57.6 31.6 M44 40.6 L52 46.6 M35 46 L37.6 55" stroke="#FFE4DA" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M37 40 L31 36 M41 33.4 L34.6 31 M40 25 L34.6 25" stroke="#FF8A6E" stroke-width="1.8" stroke-linecap="round"/>
  <ellipse cx="38" cy="14" rx="10.6" ry="8.4" fill="#FF9F86"/><path d="M30 10 Q20 2 8 6.6 M30 13 Q22 10 10 14" stroke="#FF8A6E" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  ${eye(34,12.4,2.2)}${blush(36,18,2.6,1.6)}${hl(42,10,1.8,3.4,-40,.6)}`),
 '🧹':()=>IA(D(lg('zmBr',[[0,'#FFEFA6'],[1,'#EEB848']])+lg('zmBh',WOOD,1,0))+sh(32,18,59.4)+`<g transform="rotate(16 32 34)"><rect x="29.4" y="3" width="5.2" height="34" rx="2.6" fill="url(#zmBh)"/><circle cx="32" cy="4" r="2.8" fill="#FF8FB0"/>
  <path d="M23.4 39 H40.6 Q47 49.6 50 58 Q41 60 32 60 Q23 60 14 58 Q17 49.6 23.4 39Z" fill="url(#zmBr)"/><path d="M28 42 L24.6 57.6 M32 42 V58.4 M36 42 L39.4 57.6" stroke="#D8A440" stroke-width="1.4" opacity=".75" stroke-linecap="round"/>
  <rect x="22.6" y="34.6" width="18.8" height="6.4" rx="3" fill="#FF8FB0"/><rect x="25" y="35.6" width="9" height="1.8" rx=".9" fill="#fff" opacity=".6"/>${hl(27,47,1.6,5,10,.5)}</g>`),
 '🌲':()=>{const t=(cx,y,s,c1,c2)=>`<rect x="${N(cx-s*.09)}" y="${N(y+s*.86)}" width="${N(s*.18)}" height="${N(s*.22)}" rx="1.4" fill="#B07A4E"/><path d="M${N(cx)} ${N(y)} L${N(cx+s*.3)} ${N(y+s*.32)} H${N(cx-s*.3)}Z M${N(cx)} ${N(y+s*.18)} L${N(cx+s*.4)} ${N(y+s*.6)} H${N(cx-s*.4)}Z M${N(cx)} ${N(y+s*.42)} L${N(cx+s*.48)} ${N(y+s*.88)} H${N(cx-s*.48)}Z" fill="${c1}" stroke="${c1}" stroke-width="3" stroke-linejoin="round"/><path d="M${N(cx-s*.06)} ${N(y+s*.12)} L${N(cx-s*.2)} ${N(y+s*.3)} M${N(cx-s*.1)} ${N(y+s*.36)} L${N(cx-s*.28)} ${N(y+s*.56)}" stroke="${c2}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
  return IA(`<ellipse cx="32" cy="57" rx="28" ry="4.4" fill="#BFEBA8"/>`+t(16,12,40,'#3FA35E','#9FE0A8')+t(48,10,42,'#2E9A5A','#8FD8A0')+t(32,4,52,'#5CC97A','#C8F5C0')+`<circle cx="25" cy="35" r="1.6" fill="#FF8FB0"/><circle cx="38" cy="44" r="1.6" fill="#FFE27A"/>`)},
 '3️⃣':()=>IA(D(lg('zm3',[[0,'#A8D4FF'],[1,'#5A8CE8']],1,1))+sh(32,22,59.4)+`<rect x="8" y="7" width="48" height="49" rx="13" fill="url(#zm3)"/><rect x="11" y="9.4" width="42" height="12" rx="6" fill="#fff" opacity=".22"/>
  <path d="M23 20.4 Q32 13.6 40.6 19.6 Q45 26 34.6 31.4 Q46.6 34 42.6 42.6 Q34.6 50 23 44" stroke="#fff" stroke-width="6.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${hl(15,16,2,4.6,30,.6)}`),
 '5️⃣':()=>IA(D(lg('zm5',[[0,'#FFC2DA'],[1,'#EE6AA0']],1,1))+sh(32,22,59.4)+`<rect x="8" y="7" width="48" height="49" rx="13" fill="url(#zm5)"/><rect x="11" y="9.4" width="42" height="12" rx="6" fill="#fff" opacity=".22"/>
  <path d="M41.4 16.4 H26.4 L24.4 30.4 Q33.6 25.6 40 30.6 Q45.6 36.6 40.6 43.6 Q33.6 49.4 23.6 44.6" stroke="#fff" stroke-width="6.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${hl(15,16,2,4.6,30,.6)}`),
 '🧄':()=>IA(D(lg('zmG',[[0,'#FFFFFF'],[.6,'#F1EAFB'],[1,'#D9CBF0']],1,1))+sh(32,18,58.6)+`<path d="M26 54.6 L24 58.6 M30 55.4 L29.4 59.4 M34 55.4 L34.6 59.4 M38 54.6 L40 58.6" stroke="#E2D4BC" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M32 9 Q30.6 18 22 24 Q9.4 32 13.6 44.6 Q18 55 32 55 Q46 55 50.4 44.6 Q54.6 32 42 24 Q33.4 18 32 9Z" fill="url(#zmG)"/>
  <path d="M32 17 Q22.6 34 27.6 54.4 M32 17 Q41.4 34 36.4 54.4 M30 19 Q14.6 32 18 48 M34 19 Q49.4 32 46 48" stroke="#CDBCE8" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M27 40 Q27 47 29 52 M37 40 Q37 47 35 52" stroke="#F6C6DA" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M32 9.6 Q31 4.6 34.6 2.6" stroke="#8FD08A" stroke-width="2.6" fill="none" stroke-linecap="round"/>${hl(22,34,2.4,6.4,25,.7)}`),
 '⛰️':()=>IA(D(lg('zmMt',[[0,'#9FE0B4'],[1,'#3F9F72']])+lg('zmMb',[[0,'#B4D0FF'],[1,'#7A9AE0']]))+`<ellipse cx="44" cy="15" rx="7" ry="3.4" fill="#fff" opacity=".9"/><ellipse cx="49" cy="13.6" rx="4.4" ry="3" fill="#fff" opacity=".9"/>
  <path d="M28 56 L44 22.6 Q46.6 18 49.4 22.6 L63 56Z" fill="url(#zmMb)"/><path d="M40.6 29.6 L44 22.6 Q46.6 18 49.4 22.6 L53 30 Q50.4 27.6 48 30.6 Q45.6 27.6 43 30.6 Q42 28.6 40.6 29.6Z" fill="#fff"/>
  <path d="M1 56 L23 14.6 Q26.6 8.6 30.2 14.6 L52 56Z" fill="url(#zmMt)"/><path d="M17.4 25.4 L23 14.6 Q26.6 8.6 30.2 14.6 L35.8 25.4 Q32.6 22.4 29.6 26.4 Q26.6 22.6 23.6 26.4 Q20.6 23 17.4 25.4Z" fill="#fff"/>
  <path d="M4 56 H60" stroke="#7FD08A" stroke-width="4" stroke-linecap="round"/><path d="M22 40 L16 50 M30 38 L34 46" stroke="#C8F5D0" stroke-width="2" stroke-linecap="round" opacity=".6"/>${hl(21,22,1.4,3.4,30,.6)}`),
 '🥟':()=>IA(D(lg('zmDp',[[0,'#FFFDF4'],[1,'#F2DDB8']]))+`<ellipse cx="32" cy="52" rx="27" ry="6" fill="#BFE3FF"/><ellipse cx="32" cy="51" rx="21" ry="3.6" fill="#E2F3FF"/>
  <path d="M7 41 Q8.6 19 32 17.6 Q55.4 19 57 41 Q49 51 32 51 Q15 51 7 41Z" fill="url(#zmDp)"/><path d="M9 42 Q32 55 55 42 Q48.6 51 32 51 Q15.4 51 9 42Z" fill="#E9CFA2" opacity=".8"/>
  <path d="M15.6 25.6 Q18.6 31.4 20.6 23 Q24 30 26.4 20.6 Q29.6 28.6 32 19.6 Q34.4 28.6 37.6 20.6 Q40 30 43.4 23 Q45.4 31.4 48.4 25.6" stroke="#E2C896" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${hl(18,32,2.4,5,50,.7)}`),
 '🐋':()=>IA(D(lg('zmWh',[[0,'#A8D8FF'],[1,'#4A8CE0']]))+`<path d="M22 15 Q20 8 15.6 6 M22 15 V7 M22 15 Q24 8 28.4 6" stroke="#9FE0FF" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="13.6" cy="4.6" r="1.6" fill="#9FE0FF"/><circle cx="30.6" cy="4.6" r="1.6" fill="#9FE0FF"/>
  <path d="M5 36 Q5 17 27 17 Q46 17 49.6 32 Q51 36.6 55.6 33.4 Q59 30 58.6 22 Q63.6 31 60 39 Q56 45.4 50 43 Q44 51 27 51 Q5 51 5 36Z" fill="url(#zmWh)"/>
  <path d="M7 40 Q17 50.6 33 49 Q43.6 47.6 48 41 Q35.6 45 21.6 43 Q13 42 7 40Z" fill="#DDF0FF"/><path d="M26 43 Q31 52 37 47.6 Q32 46 26 43Z" fill="#5A9AE8"/>
  ${eye(15.6,31,2.6)}${blush(13.6,37.4)}<path d="M8.6 38 Q12 40.4 16.4 39" stroke="#3A6AAA" stroke-width="1.4" fill="none" stroke-linecap="round"/>${hl(25,22,2.4,6,70,.55)}`),
 '🐠':()=>IA(D(lg('zmGf',[[0,'#FFC46E'],[1,'#FF7A3A']],1,1))+`<circle cx="9" cy="13" r="3.2" fill="none" stroke="#9FE0FF" stroke-width="1.6"/><circle cx="14" cy="6.6" r="2" fill="none" stroke="#9FE0FF" stroke-width="1.4"/>
  <path d="M40 32 Q53 15 60 21 Q54 32 60 43 Q53 49 40 32Z" fill="#FFAE70"/><path d="M44 31 Q52 24 57 23 M44 33 Q52 40 57 41" stroke="#FFE2C8" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M21 19 Q29 7.6 38.6 20Z" fill="#FF9A5A"/><ellipse cx="27" cy="32" rx="18.6" ry="15.4" fill="url(#zmGf)"/><ellipse cx="25.6" cy="39.6" rx="12" ry="5" fill="#FFE2B8"/>
  <path d="M30 28 Q33 31 30 34 M35 27 Q38 31 35 35" stroke="#FFE2B8" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M27.6 37 Q34 42.6 30 47 Q25.6 43 27.6 37Z" fill="#FFD0A0"/>
  ${eye(16.6,29.4,2.6)}${blush(15,36.4)}${hl(22,22.6,2,4.4,-60,.6)}`),
 '⚽':()=>IA(D(rg('zmBl',[[0,'#fff',0],[.75,'#3A2A5A',0],[1,'#3A2A5A',.12]],.42,.38,.62))+sh(32,19,59.4)+`<circle cx="32" cy="33" r="23" fill="#FFFDF5"/>
  <path d="M32 10 A23 23 0 0 0 32 56 C17 48 17 18 32 10Z" fill="#FFD24D"/><path d="M32 10 C17 18 17 48 32 56 C25 46 25 20 32 10Z" fill="#FF8FB8"/>
  <path d="M32 10 C47 18 47 48 32 56 C39 46 39 20 32 10Z" fill="#6FB6FF"/><path d="M32 10 A23 23 0 0 1 32 56 C47 48 47 18 32 10Z" fill="#8FD08A"/>
  <circle cx="32" cy="33" r="23" fill="url(#zmBl)"/><ellipse cx="32" cy="11.6" rx="4" ry="2.4" fill="#FFF3B0"/>${hl(19,24,3,7,30,.6)}`),
 '🌿':()=>{const bl=(d,c)=>`<path d="${d}" fill="${c}"/>`;return IA(`<ellipse cx="32" cy="57" rx="24" ry="4.2" fill="#C8EBB0"/>`+bl('M20 57 Q14 36 6 25 Q22 34 27 57Z','#4CB86A')+bl('M42 57 Q48 34 59 23 Q45 35 37 57Z','#3FA35E')+bl('M26 57 Q24 30 30 8 Q36 30 34 57Z','#6FD08A')+bl('M33 57 Q38 34 50 18 Q44 36 40 57Z','#5CC97A')+bl('M27 57 Q20 40 13 34 Q25 40 32 57Z','#8FDC8A')+
  `<path d="M29.6 16 Q28.6 30 29.4 44" stroke="#D8F8D0" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M47 24 Q41.6 34 39.6 44" stroke="#C8F0C0" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".7"/>`)},
 '🥬':()=>IA(D(lg('zmBk',[[0,'#FFFFFF'],[1,'#DDF2CF']],1,0))+`<path d="M32 52 Q12 47 8.6 26 Q8.6 9.6 21.6 9.6 Q30 11 30 26Z" fill="#4CB86A"/><path d="M32 52 Q52 47 55.4 26 Q55.4 9.6 42.4 9.6 Q34 11 34 26Z" fill="#3FA35E"/>
  <path d="M32 50 Q21.6 29 26 11 Q32 3.4 38 11 Q42.4 29 32 50Z" fill="#7CD88A"/><path d="M14 22 Q18 30 24 34 M50 22 Q46 30 40 34" stroke="#C8F5C0" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M25 58 Q22.6 45 27 33 H37 Q41.4 45 39 58Z" fill="url(#zmBk)"/><path d="M30 35 Q28.6 46 29.6 57 M34 35 Q35.4 46 34.4 57" stroke="#C8E8B8" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M32 14 V44" stroke="#E2FFE0" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>${hl(26.6,42,1.6,5,8,.7)}`),
 '🥣':()=>IA(D(lg('zmBw',[[0,'#FFC4D8'],[1,'#EE7AA4']]))+sh(32,22,58.6)+`<path d="M38 22 Q46 8 54 10" stroke="#B8A8E8" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="27" rx="25" ry="7.4" fill="#FFF3F7"/><ellipse cx="32" cy="28" rx="21" ry="5.4" fill="#FFD6E4"/>
  <path d="M7 27 Q7.6 52 32 52 Q56.4 52 57 27 A25 7.4 0 0 1 7 27Z" fill="url(#zmBw)"/><rect x="23.6" y="50" width="16.8" height="6" rx="3" fill="#E8679F"/>
  <circle cx="19" cy="38" r="2" fill="#fff" opacity=".85"/><circle cx="32" cy="42" r="2" fill="#fff" opacity=".85"/><circle cx="45" cy="38" r="2" fill="#fff" opacity=".85"/><circle cx="25.6" cy="45.6" r="1.4" fill="#fff" opacity=".7"/><circle cx="38.4" cy="45.6" r="1.4" fill="#fff" opacity=".7"/>
  ${hl(14,36,2,5.4,20,.6)}`),
 '🐒':()=>IA(D(rg('zmMk',[[0,'#E2AE7E'],[1,'#B07848']]))+`<circle cx="11" cy="32" r="8.4" fill="#C08452"/><circle cx="11" cy="32" r="4.8" fill="#FFD8C0"/><circle cx="53" cy="32" r="8.4" fill="#C08452"/><circle cx="53" cy="32" r="4.8" fill="#FFD8C0"/>
  <circle cx="32" cy="32" r="22" fill="url(#zmMk)"/><path d="M27 11.6 Q30 6 33.6 10.6 Q36 7 38.6 11.6" stroke="#A86E40" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M32 26 Q26 17.6 19.6 23.6 Q13.6 31.6 19.6 40 Q23.6 50.6 32 50.6 Q40.4 50.6 44.4 40 Q50.4 31.6 44.4 23.6 Q38 17.6 32 26Z" fill="#FFE2CC"/>
  ${eye(25,31.6,2.6)}${eye(39,31.6,2.6)}<ellipse cx="30" cy="39" rx="1.3" ry="1" fill="#A86E40"/><ellipse cx="34" cy="39" rx="1.3" ry="1" fill="#A86E40"/>
  <path d="M27 43 Q32 47.6 37 43" stroke="#A86E40" stroke-width="2" fill="none" stroke-linecap="round"/>${blush(20.6,40.4)}${blush(43.4,40.4)}${hl(21,17,2.4,5,-50,.5)}`),
 '🦛':()=>IA(D(lg('zmHp',[[0,'#C6B8F0'],[1,'#9A88D4']]))+`<ellipse cx="17" cy="14" rx="5" ry="6" fill="#9A88C8"/><ellipse cx="17" cy="14.6" rx="2.4" ry="3.2" fill="#FFB8D0"/><ellipse cx="47" cy="14" rx="5" ry="6" fill="#9A88C8"/><ellipse cx="47" cy="14.6" rx="2.4" ry="3.2" fill="#FFB8D0"/>
  <ellipse cx="32" cy="27" rx="19" ry="15" fill="url(#zmHp)"/><ellipse cx="32" cy="42" rx="24" ry="15.6" fill="#B8AAE8"/><ellipse cx="32" cy="45" rx="20" ry="11" fill="#C6BAF0" opacity=".6"/>
  ${eye(24,23,2.6)}${eye(40,23,2.6)}<ellipse cx="23.6" cy="37.6" rx="3.2" ry="2.2" fill="#7A68B0"/><ellipse cx="40.4" cy="37.6" rx="3.2" ry="2.2" fill="#7A68B0"/>
  <path d="M20 48 Q32 54 44 48" stroke="#7A68B0" stroke-width="2" fill="none" stroke-linecap="round"/>${blush(13.4,44)}${blush(50.6,44)}${hl(23,16,2,4.4,-60,.55)}`),
 '🚂':()=>IA(D(lg('zmTr',[[0,'#FFB0C4'],[1,'#EE6082']])+lg('zmTb',[[0,'#A8D4FF'],[1,'#5A8CE8']]))+`<circle cx="15" cy="7.6" r="4.4" fill="#EEF2FA"/><circle cx="8.6" cy="4.6" r="3" fill="#EEF2FA"/><circle cx="21" cy="5" r="2.4" fill="#EEF2FA"/>
  <rect x="12.4" y="12.6" width="8.4" height="11" rx="2.4" fill="#7A6AB8"/><rect x="10.4" y="10.6" width="12.4" height="4.4" rx="2.2" fill="#8F80CC"/>
  <rect x="35" y="12" width="21" height="28" rx="4.4" fill="url(#zmTb)"/><rect x="33" y="8.6" width="25" height="5" rx="2.5" fill="#7A6AB8"/><rect x="40" y="16.6" width="11" height="9.4" rx="2.4" fill="#E8F8FF"/><path d="M41.4 18 H45 L41.4 23Z" fill="#fff"/>
  <rect x="6" y="22" width="33" height="18" rx="8.4" fill="url(#zmTr)"/><path d="M17 22.6 V39.4 M27 22.6 V39.4" stroke="#FFD24D" stroke-width="2.4"/><circle cx="8.4" cy="30" r="3" fill="#FFF3B0"/>
  <rect x="4" y="38.6" width="55" height="6" rx="3" fill="#7A6AB8"/><path d="M3 55.4 H61" stroke="#C8BCE6" stroke-width="3.4" stroke-linecap="round"/>
  ${[15,31.6,48].map(x=>`<circle cx="${x}" cy="48" r="7" fill="#FFD24D"/><circle cx="${x}" cy="48" r="2.6" fill="#E8A228"/>`).join('')}<path d="M15 48 H48" stroke="#E8A228" stroke-width="2"/>${hl(14,26.6,1.6,3.6,60,.6)}`),
 '🪶':()=>IA(D(lg('zmFe',[[0,'#FFD2E6'],[.55,'#FFA8CC'],[1,'#B99CFF']],1,1))+`<g transform="rotate(-38 32 32)"><path d="M32 3 Q46.6 15 44.6 34 Q42.6 50 32 57 Q21.4 50 19.4 34 Q17.4 15 32 3Z" fill="url(#zmFe)"/>
  <path d="M44.6 25 L37.6 28 M19.8 21.6 L27 25.4 M43.6 40 L37 40.4 M20.6 39 L27 41" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M32 6 V62" stroke="#FFF6FA" stroke-width="2.2" stroke-linecap="round"/><path d="M32 57 V62" stroke="#D9C8F5" stroke-width="2.4" stroke-linecap="round"/>${hl(26,20,1.8,6,0,.6)}</g>`),
 '🌽':()=>{let k='';for(let y=12;y<=50;y+=5)for(let x=25;x<=39;x+=4.6){const w=12*Math.sin(Math.min(1,(y-4)/14)*Math.PI/2)*(y>40?1-(y-40)/22:1);if(Math.abs(x-32)<=w-1.4)k+=`<ellipse cx="${N(x)}" cy="${y}" rx="1.9" ry="1.8" fill="#FFF6C8" opacity=".75"/>`}
  return IA(D(lg('zmCn',[[0,'#FFF0A0'],[1,'#FFBE30']],1,0))+`<path d="M32 5 Q44.6 9 44.6 30 Q44.6 49 32 56 Q19.4 49 19.4 30 Q19.4 9 32 5Z" fill="url(#zmCn)"/>${k}
  <path d="M32 59 Q12.6 51 13 25 Q21.6 41 31 45Z" fill="#7CCB5A"/><path d="M32 59 Q51.4 51 51 25 Q42.4 41 33 45Z" fill="#5CB86A"/><path d="M17 36 Q20 46 28 52" stroke="#C8F5C0" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>
  <rect x="29" y="56" width="6" height="6" rx="2.4" fill="#8FD08A"/>${hl(27,16,1.8,5,15,.7)}`)}};
// 系統 emoji 有時沒有 FE0F，兩種都登記
const ALIAS={'🛎':'🛎️','⛰':'⛰️','🖼':'🖼️'};
// ---------- 每次讀都換一組唯一的漸層 id ----------
let UQ=0;
const uniq0=s=>{s=String(s==null?'':s);if(s.indexOf('id="')<0)return s;const ids=new Set();s.replace(/\sid="([^"]+)"/g,(m,i)=>{ids.add(i);return m});if(!ids.size)return s;
 const n='_m'+(++UQ).toString(36);return s.replace(/(\sid="|url\(#|href="#)([^")\s]+)/g,(m,a,i)=>ids.has(i)?a+i+n:m)};
const uniq=s=>{try{if(window.__v22vis&&typeof __v22vis.uniq==='function')return __v22vis.uniq(s)}catch(e){}return uniq0(s)};
const added=[];
const def=(k,get)=>{try{const d=Object.getOwnPropertyDescriptor(ICONART,k);if(d)return;   // 已經有圖的不蓋掉
 Object.defineProperty(ICONART,k,{configurable:true,enumerable:true,get(){try{return uniq(get())}catch(e){return ''}},set(v){}});added.push(k)}catch(e){console.log('m9zm icon',k,e)}};
Object.keys(ART).forEach(k=>def(k,ART[k]));Object.entries(ALIAS).forEach(([a,k])=>def(a,ART[k]));

/* ---------- 芒果：長腰形、黃到橘、紅暈的愛文芒果 ---------- */
let MU=0;const mid=()=>'zmg'+(++MU).toString(36)+Math.random().toString(36).slice(2,5);
const MBODY='M-26 3 Q-27 -12 -10 -15.5 Q8 -19 21 -10 Q29 -3.5 26 6 Q22 15 9 14 Q1 13.4 -6 16 Q-22 21 -26 3Z';
const MSTEM='M21.6 -11 Q24.6 -15 23.6 -19.6';const MLEAF='M23.4 -18.6 Q30 -26 37 -20.4 Q30 -14 23.4 -18.6Z';
const mangoInner=(u,shY)=>`<defs>${lg(u+'m',[[0,'#FFEA60'],[.5,'#FFB83C'],[1,'#FF8A3A']],1,0,0,1)}${rg(u+'b',[[0,'#FF4A5E',.8],[.6,'#FF5A5A',.35],[1,'#FF6A5A',0]],.5,.5,.5)}</defs>
 <ellipse cx="32" cy="${shY||60.5}" rx="22" ry="2.6" fill="#3A2A5A" opacity=".16"/>
 <g transform="translate(31 35) rotate(-24)"><path d="${MBODY}" fill="url(#${u}m)"/><ellipse cx="12" cy="-6" rx="14" ry="9.6" fill="url(#${u}b)"/>
 <path d="M-19 -8.6 Q-5 -15.4 10 -13" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".55"/>${hl(-17,-1,2.6,5.6,70,.5)}
 <path d="M-12 10 Q-2 9 6 11" stroke="#FFF7B0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/>
 <path d="${MSTEM}" stroke="#8A5A3A" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="${MLEAF}" fill="#5CC98A"/><path d="M25 -18.8 Q30 -20.6 35 -20.4" stroke="#3E9A5A" stroke-width=".9" fill="none" stroke-linecap="round"/></g>
 <g class="g22fx"><path d="${spark(10,13,3.4)}" fill="#FFE27A"/><path d="${spark(55,48,2.6)}" fill="#fff"/></g>`;
const mangoSil=c=>`<g transform="translate(31 35) rotate(-24)"><path d="${MBODY}" fill="${c}"/><path d="${MSTEM}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="${MLEAF}" fill="${c}"/></g>`;
const mangoSVG=attr=>`<svg viewBox="0 0 64 64" ${attr||''} aria-hidden="true">${mangoInner(mid())}</svg>`;
const mangoSilSVG=(c,attr)=>`<svg viewBox="0 0 64 64" ${attr||''} aria-hidden="true">${mangoSil(c||'#8C7CE6')}</svg>`;
const chefMango=()=>`<svg viewBox="0 0 64 64" aria-hidden="true">${mangoInner(mid(),58.4)}</svg>`;
window.__m9zm={icons:added,mango:u=>mangoInner(u||mid()),mangoSil,mangoSVG,chefMango,ver:'2026-11-28'};
try{const G=window.G22;if(G){
 // G22.ART／SIL：換成新物件，芒果用新圖，其他照舊（原本的屬性不能改，所以整個換掉）
 const wrapObj=(o,mk)=>{if(!o)return o;const n={};Object.keys(o).forEach(k=>Object.defineProperty(n,k,{enumerable:true,configurable:true,get:()=>k==='mango'?mk():o[k]}));return n};
 G.ART=wrapObj(G.ART,()=>mangoSVG());G.SIL=wrapObj(G.SIL,()=>mangoSilSVG());
 [['svg',(id,a)=>mangoSVG(a)],['sil',(id,c,a)=>mangoSilSVG(c,a)],['inner',()=>mangoInner(mid())],['silInner',(id,c)=>mangoSil(c||'#8C7CE6')]].forEach(([k,f])=>{const o=G[k];if(typeof o!=='function')return;G[k]=function(id){return id==='mango'?f.apply(this,arguments):o.apply(this,arguments)}});
 // 小小廚師
 if(typeof G.chefIcon==='function'){const oc=G.chefIcon;G.chefIcon=function(k){return k==='mango'?chefMango():oc.apply(this,arguments)}}}}catch(e){console.log('m9zm mango',e)}
// m9zd 自己（閉包裡）畫出來的舊芒果：一出現在畫面上就換成新圖（看舊圖的身體路徑認）
const OLDM='path[d^="M10 34 Q8 17 26 12.4"]';
const swapM=root=>{try{if(!root||root.nodeType!==1)return;const ps=root.matches&&root.matches(OLDM)?[root]:root.querySelectorAll(OLDM);
 ps.forEach(p=>{const sv=p.ownerSVGElement;if(!sv||sv.getAttribute('viewBox')!=='0 0 64 64'||sv.dataset.zmm)return;const f=p.getAttribute('fill')||'';sv.dataset.zmm='1';sv.innerHTML=/^url/.test(f)?mangoInner(mid()):mangoSil(f)})}catch(e){}};
try{new MutationObserver(rs=>{for(const r of rs)for(const n of r.addedNodes)if(n.nodeType===1)swapM(n)}).observe(document.documentElement,{childList:true,subtree:true});swapM(document.body)}catch(e){console.log('m9zm mo',e)}

/* ---------- 題目文字：手機直放不從詞中間斷行 ---------- */
const st=document.createElement('style');st.id='m9zmcss';st.textContent=`
.prompt .h22pq{display:block;text-wrap:balance;text-wrap-style:balance}
.prompt .h22pq .kw,.prompt .h22pq .h22nw,.prompt .h22pq b{white-space:nowrap}`;
document.head.appendChild(st);
}catch(e){console.log('m9zm_icons22',e)}}).toString()+')()')})();

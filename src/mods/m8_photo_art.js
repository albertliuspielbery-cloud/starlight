/* ================= 小小攝影師：動物園的動物 20 種＋動物園場景（m8_photo_art.js，名稱空間 G.ZOO8；第 44 章「動物園一日遊」共用） =================
 * 2026-11-22 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室。草稿：等 Albert 看過預覽圖才算定稿。
 * 畫法照第六季「新朋友（100×100）」：柔和漸層、深色圓眼睛＋白色亮點、腮紅、地上淡紫影子（腳在 y≈94，影子 y=95）。
 * 動物都是全身，四種樣子：stand 站著、sleep 睡覺（躺下、閉眼、Zz）、eat 吃東西（嘴邊有食物）、play 玩（球、水花、跳起來）。
 * 不用任何真實動物明星的名字；動作只用移動、旋轉、眨眼、淡入，沒有整體放大縮小。
 * 用法：
 *   ZOO8.LIST            [{k,zh,en,enKeys}] 20 種（順序＝收集冊順序）
 *   ZOO8.draw(k,pose)    100×100 的圖內容（不含 <svg>）
 *   ZOO8.svg(k,pose,a)   完整 <svg viewBox="0 0 100 100">
 *   ZOO8.RP              小貓熊（野生版）的顏色，給第七季寵物版對齊
 *   ZOO8.bg(W,H)         動物園背景（城市動物園，左右很長）；ZOO8.W、ZOO8.H 世界大小
 *   ZOO8.keeper()        保育員（100×100，全身）
 *   ZOO8.icon            小遊戲卡片圖示（64×64 內容）
 */
(function(G){
const f=v=>(+v).toFixed(1);
let K=0;const uid=p=>p+'z8'+(++K)+Math.random().toString(36).slice(2,5);
const gl=(i,a,b,x2=0,y2=1)=>`<linearGradient id="${i}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rg=(i,a,b)=>`<radialGradient id="${i}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const sh=(rx=28,cx=50)=>`<ellipse cx="${cx}" cy="95" rx="${rx}" ry="3.4" fill="#3A2A5A" opacity=".16"/>`;
const EYE='#2A1E36';
// 眼睛：o 張開（會眨眼）、c 閉著（睡覺）、h 開心（彎彎）
const E1=(x,y,r,m)=>m==='c'?`<path d="M${f(x-r)} ${f(y)} Q${f(x)} ${f(y+r*1.1)} ${f(x+r)} ${f(y)}" stroke="${EYE}" stroke-width="${f(Math.max(1.2,r*.5))}" fill="none" stroke-linecap="round"/>`
 :m==='h'?`<path d="M${f(x-r)} ${f(y+r*.45)} Q${f(x)} ${f(y-r*1.1)} ${f(x+r)} ${f(y+r*.45)}" stroke="${EYE}" stroke-width="${f(Math.max(1.2,r*.5))}" fill="none" stroke-linecap="round"/>`
 :`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${EYE}"/><circle cx="${f(x+r*.35)}" cy="${f(y-r*.4)}" r="${f(r*.4)}" fill="#fff"/>`;
const eyes=(x1,x2,y,r,m='o',y2)=>{y2=y2==null?y:y2;const s=E1(x1,y,r,m)+E1(x2,y2,r,m);return m==='o'?`<g class="blink" style="transform-origin:${f((x1+x2)/2)}px ${f((y+y2)/2)}px">${s}</g>`:s};
const eye1=(x,y,r,m='o')=>m==='o'?`<g class="blink" style="transform-origin:${f(x)}px ${f(y)}px">${E1(x,y,r,m)}</g>`:E1(x,y,r,m);
const blush=(x,y,r=2.8,o=.55)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="#FF9FB0" opacity="${o}"/>`;
const smile=(x,y,w=4,c='#5A3A3A')=>`<path d="M${f(x-w)} ${f(y)} Q${f(x)} ${f(y+w*.8)} ${f(x+w)} ${f(y)}" stroke="${c}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
const openM=(x,y,w=4,c='#5A3A3A')=>`<path d="M${f(x-w)} ${f(y)} Q${f(x)} ${f(y+w*1.5)} ${f(x+w)} ${f(y)}Z" fill="#E86A7A" stroke="${c}" stroke-width="1.3" stroke-linejoin="round"/><path d="M${f(x-w*.45)} ${f(y+w*.75)} Q${f(x)} ${f(y+w*1.1)} ${f(x+w*.45)} ${f(y+w*.75)}" fill="#FFB0B8"/>`;
const chew=(x,y,r=1.8)=>`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r*.8)}" fill="#8A3A4A"/>`;
// 睡覺的 Zz（慢慢往上飄、淡出）
const zz=(x,y)=>`<g class="z8zz" style="--zx:${x}px"><path d="M${x} ${y} h6 l-6 7 h6" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M${x} ${y} h6 l-6 7 h6" stroke="#7A86D8" stroke-width="1.8" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
 <path d="M${x+8} ${y-9} h4 l-4 5 h4" stroke="#FFFFFF" stroke-width="3.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M${x+8} ${y-9} h4 l-4 5 h4" stroke="#7A86D8" stroke-width="1.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g>`;
// 彩色海灘球
const ball=(x,y,r=7)=>`<g transform="translate(${f(x)} ${f(y)})"><circle r="${r}" fill="#FFFFFF" stroke="#E0D6EE" stroke-width=".8"/><path d="M0 ${-r} A${r} ${r} 0 0 1 ${f(r*.87)} ${f(r*.5)} L0 0Z" fill="#FF7A8F"/><path d="M${f(r*.87)} ${f(r*.5)} A${r} ${r} 0 0 1 ${f(-r*.87)} ${f(r*.5)} L0 0Z" fill="#6FC8FF"/><path d="M${f(-r*.87)} ${f(r*.5)} A${r} ${r} 0 0 1 0 ${-r} L0 0Z" fill="#FFD84D"/><circle r="${f(r*.22)}" fill="#fff"/><path d="M${f(-r*.55)} ${f(-r*.35)} q${f(r*.2)} ${f(-r*.35)} ${f(r*.55)} ${f(-r*.45)}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8" stroke-linecap="round"/></g>`;
const drops=(x,y,c='#7FD0FF')=>`<g fill="${c}" stroke="#FFFFFF" stroke-width=".8">${[[0,0,2.4],[-6,4,1.8],[6,3,2],[-3,-6,1.6],[4,-5,1.4]].map(([a,b,r])=>`<path d="M${f(x+a)} ${f(y+b-r*1.6)} Q${f(x+a+r)} ${f(y+b)} ${f(x+a)} ${f(y+b+r)} Q${f(x+a-r)} ${f(y+b)} ${f(x+a)} ${f(y+b-r*1.6)}Z"/>`).join('')}</g>`;
const motion=(x,y,s=1)=>`<path d="M${f(x)} ${f(y)} q${f(-4*s)} 2 ${f(-8*s)} 0 M${f(x)} ${f(y+5)} q${f(-4*s)} 2 ${f(-10*s)} 0" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"/>`;
// 食物
const leafy=(x,y,s=1)=>`<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><path d="M0 0 Q-8 -4 -9 -11 Q-2 -10 0 0Z" fill="#6CC04A"/><path d="M0 0 Q6 -6 12 -6 Q8 1 0 0Z" fill="#8ED86A"/><path d="M0 0 Q-2 -9 3 -14 Q6 -6 0 0Z" fill="#5AB040"/><path d="M0 0 V5" stroke="#4E8A34" stroke-width="1.6" stroke-linecap="round"/></g>`;
const grass=(x,y)=>`<path d="M${x-6} ${y} q1 -7 -2 -11 M${x-2} ${y} q0 -9 2 -13 M${x+2} ${y} q1 -8 5 -10 M${x+6} ${y} q0 -6 3 -8" stroke="#5AB040" stroke-width="2" fill="none" stroke-linecap="round"/>`;
const fish=(x,y,a=0)=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"><path d="M-7 0 Q-1 -5 6 0 Q-1 5 -7 0Z" fill="#8FC8F0" stroke="#4A8AC0" stroke-width=".9"/><path d="M6 0 L11 -4 V4Z" fill="#6AA8E0"/><circle cx="-4" cy="-.6" r=".9" fill="#2A3A5A"/></g>`;
const bamboo=(x,y,a=0,l=26)=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"><rect x="-2" y="${-l/2}" width="4" height="${l}" rx="1.6" fill="#8FCB5A" stroke="#5E9A34" stroke-width=".8"/><path d="M-2 ${f(-l/6)} h4 M-2 ${f(l/6)} h4" stroke="#5E9A34" stroke-width="1"/><path d="M2 ${f(-l/2+3)} q6 -2 9 -7 q-6 0 -9 4Z" fill="#6CC04A"/></g>`;
const banana=(x,y,a=0)=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"><path d="M-6 -8 Q-4 6 8 6 Q10 5 8 3 Q-1 3 -2 -9 Q-4 -11 -6 -8Z" fill="#FFD84D" stroke="#C8A020" stroke-width="1"/><path d="M-6 -8 l-1 -2" stroke="#7A5A2A" stroke-width="1.6" stroke-linecap="round"/></g>`;
const apple=(x,y)=>`<g transform="translate(${f(x)} ${f(y)})"><path d="M0 -4 Q-6 -8 -7 -1 Q-7 6 0 6 Q7 6 7 -1 Q6 -8 0 -4Z" fill="#F0503C"/><path d="M0 -4 Q0 -8 2 -9" stroke="#6A4A2A" stroke-width="1.2" fill="none"/><path d="M2 -7 q4 -3 5 0 q-3 1 -5 0Z" fill="#4CB35A"/></g>`;
const meat=(x,y,a=0)=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"><path d="M-2 -1 L8 -1" stroke="#FFF6E6" stroke-width="3" stroke-linecap="round"/><circle cx="9" cy="-2.6" r="2" fill="#FFF6E6"/><circle cx="9" cy=".6" r="2" fill="#FFF6E6"/><ellipse cx="-5" cy="-1" rx="7" ry="5.4" fill="#D8784A"/><ellipse cx="-6" cy="-2.6" rx="3.6" ry="1.8" fill="#F0A070" opacity=".8"/></g>`;
const acorns=(x,y)=>`<g transform="translate(${f(x)} ${f(y)})">${[[-4,0],[3,-2],[0,4]].map(([a,b])=>`<ellipse cx="${a}" cy="${b+1}" rx="3" ry="3.6" fill="#C8863A"/><path d="M${a-3.4} ${b} Q${a} ${b-4} ${a+3.4} ${b}Z" fill="#7A4E2A"/>`).join('')}</g>`;
const bug=(x,y)=>`<g transform="translate(${f(x)} ${f(y)})"><ellipse rx="4" ry="3" fill="#5ABF8A"/><path d="M0 -3 V3" stroke="#2E7A5A" stroke-width=".8"/><circle cx="4" cy="0" r="1.6" fill="#2E5A4A"/></g>`;
const ants=(x,y)=>`<g fill="#5A3A2A">${[0,5,10].map(d=>`<circle cx="${x+d}" cy="${y}" r="1"/><circle cx="${x+d+1.6}" cy="${y}" r="1.2"/>`).join('')}</g>`;
const legR=(x,y1,y2,w,c,hoof)=>`<path d="M${f(x)} ${f(y1)} V${f(y2-w/2)} Q${f(x)} ${f(y2)} ${f(x+w/2)} ${f(y2)} Q${f(x+w)} ${f(y2)} ${f(x+w)} ${f(y2-w/2)} V${f(y1)}Z" fill="${c}"/>${hoof?`<path d="M${f(x)} ${f(y2-2.6)} H${f(x+w)} V${f(y2-w*.4)} Q${f(x+w)} ${f(y2)} ${f(x+w/2)} ${f(y2)} Q${f(x)} ${f(y2)} ${f(x)} ${f(y2-w*.4)}Z" fill="${hoof}"/>`:''}`;
const W=(m,inner)=>inner; // 留著好讀

/* ---------- 1. 大象（淡藍紫，跟遊戲裡的大象一樣：粉紅耳朵） ---------- */
function elephant(p){const g=uid('el');const B=`url(#${g}b)`,D='#8E9FD8',L='#DDE5FA';
 const head=(cx,cy,m,trunk)=>`<ellipse cx="${cx-9}" cy="${cy+1}" rx="13" ry="16" fill="${B}" stroke="${D}" stroke-width=".8"/><ellipse cx="${cx-9}" cy="${cy+2}" rx="8.4" ry="11" fill="#F6B6CC"/>
  <path d="${trunk}" stroke="${B}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${trunk}" stroke="${D}" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="1 5" opacity=".35"/>
  <circle cx="${cx}" cy="${cy}" r="16" fill="${B}"/><ellipse cx="${cx-3}" cy="${cy-8}" rx="8" ry="4" fill="#fff" opacity=".25"/>
  ${eyes(cx-2,cx+8,cy-2,2.8,m)}${blush(cx-5,cy+6)}${blush(cx+12,cy+5,2.4)}
  <path d="M${cx+4} ${cy+11} q-3 4 1 6" stroke="#FFFFFF" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
 let s=`<defs>${gl(g+'b','#CFD9F7','#9EAEE2')}</defs>`;
 if(p==='sleep')return s+sh(36)+`<path d="M15 76 q-7 3 -8 10" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="25" cy="89" rx="11" ry="5.4" fill="${D}"/><ellipse cx="42" cy="76" rx="30" ry="17" fill="${B}"/><ellipse cx="42" cy="84" rx="22" ry="7" fill="${L}" opacity=".5"/>
  <ellipse cx="57" cy="90" rx="11" ry="5" fill="#AEBDEB"/>${head(72,70,'c','M80 78 Q90 88 96 88 Q99 86 96 83')}${zz(82,40)}`;
 const legs=(fl)=>legR(22,64,93,10,D,'#F2EEFF')+legR(50,64,93,10,D,'#F2EEFF')+`<path d="M14 58 q-7 5 -7 14" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M7 72 l-1.6 4 M7 72 l1.6 4" stroke="${D}" stroke-width="1.6" stroke-linecap="round"/>`
  +`<ellipse cx="42" cy="60" rx="29" ry="20" fill="${B}"/><ellipse cx="40" cy="70" rx="20" ry="7" fill="${L}" opacity=".45"/>`
  +legR(30,68,94,11,'#A8B8EA','#F6F3FF')+(fl?`<g transform="rotate(-28 62 68)">${legR(57,66,92,11,'#A8B8EA','#F6F3FF')}</g>`:legR(57,68,94,11,'#A8B8EA','#F6F3FF'));
 if(p==='eat')return s+sh(34)+legs(0)+head(70,42,'o','M80 54 Q92 54 92 40 Q92 30 85 30')+leafy(84,30,1.1)+chew(73,53);
 if(p==='play')return s+sh(30)+legs(1)+head(70,42,'h','M80 52 Q90 44 88 26 Q87 20 84 20')+drops(84,12)+drops(94,20,'#9FE0FF')+openM(71,52,3);
 return s+sh(34)+legs(0)+head(70,42,'o','M80 54 Q88 64 86 76 Q85 82 90 82')+smile(71,53,3)}

/* ---------- 2. 長頸鹿（黃色、橘色斑點，跟遊戲裡的長頸鹿一樣） ---------- */
function giraffe(p){const g=uid('gi');const B=`url(#${g}b)`,SP='#E8A04E',D='#C88A3A';
 const spots=(pts)=>pts.map(([x,y,r])=>`<path d="M${x-r} ${y} q${r*.2} ${-r} ${r} ${-r} q${r} ${r*.1} ${r} ${r} q${-r*.2} ${r} ${-r} ${r} q${-r} ${-r*.2} ${-r} ${-r}Z" fill="${SP}"/>`).join('');
 const head=(cx,cy,m,a=0)=>`<g transform="rotate(${a} ${cx} ${cy})"><path d="M${cx-4} ${cy-9} V${cy-15} M${cx+4} ${cy-9} V${cy-15}" stroke="#C8863A" stroke-width="2.4" stroke-linecap="round"/><circle cx="${cx-4}" cy="${cy-16}" r="2.4" fill="#8A5A2A"/><circle cx="${cx+4}" cy="${cy-16}" r="2.4" fill="#8A5A2A"/>
  <ellipse cx="${cx-10}" cy="${cy-6}" rx="5" ry="2.4" fill="#FFD27A" transform="rotate(-25 ${cx-10} ${cy-6})"/><ellipse cx="${cx+10}" cy="${cy-6}" rx="5" ry="2.4" fill="#FFD27A" transform="rotate(25 ${cx+10} ${cy-6})"/>
  <ellipse cx="${cx}" cy="${cy}" rx="9" ry="10" fill="${B}"/><ellipse cx="${cx}" cy="${cy+6}" rx="7" ry="5" fill="#FFE9B8"/><circle cx="${cx-2.4}" cy="${cy+6}" r=".9" fill="#8A5A2A"/><circle cx="${cx+2.4}" cy="${cy+6}" r=".9" fill="#8A5A2A"/>
  ${eyes(cx-4,cx+4,cy-1,2.2,m)}${blush(cx-7,cy+3,1.8)}${blush(cx+7,cy+3,1.8)}</g>`;
 let s=`<defs>${gl(g+'b','#FFE29A','#F7BE5C')}</defs>`;
 const neck=(d)=>`<path d="${d}" stroke="#C8863A" stroke-width="2.6" fill="none" stroke-linecap="round" transform="translate(-4.4 .6)" stroke-dasharray="2.4 1.4"/><path d="${d}" stroke="${B}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
 if(p==='sleep')return s+sh(30)+`<path d="M22 70 q-6 2 -7 9" stroke="${D}" stroke-width="1.6" fill="none"/><ellipse cx="15" cy="80" rx="1.6" ry="2.6" fill="#8A5A2A"/>
  <ellipse cx="26" cy="91" rx="9" ry="3.6" fill="#F2B050"/><ellipse cx="62" cy="91" rx="9" ry="3.6" fill="#F2B050"/>
  <ellipse cx="42" cy="80" rx="24" ry="12" fill="${B}"/>${spots([[34,78,3],[46,76,3.4],[54,83,2.6],[40,86,2.4]])}
  ${neck('M58 78 Q66 66 64 52')}${spots([[64,64,2]])}
  ${head(66,46,'c',18)}${zz(80,24)}`;
 const body=(fl)=>`<path d="M20 52 q-6 2 -6 10" stroke="${D}" stroke-width="1.6" fill="none"/><ellipse cx="14" cy="63" rx="1.6" ry="2.6" fill="#8A5A2A"/>`
  +legR(24,60,93,5,'#EEA84A','#8A5A2A')+legR(48,60,93,5,'#EEA84A','#8A5A2A')
  +`<ellipse cx="38" cy="56" rx="22" ry="12" fill="${B}"/>${spots([[30,54,3],[42,52,3.4],[50,59,2.6],[36,61,2.4],[24,58,2]])}`
  +legR(30,62,94,5.4,'#F7BE5C','#8A5A2A')+(fl?`<g transform="rotate(-35 56 62)">${legR(54,62,92,5.4,'#F7BE5C','#8A5A2A')}</g>`:legR(54,62,94,5.4,'#F7BE5C','#8A5A2A'));
 if(p==='eat')return s+sh(28)+body(0)+`<g><path d="M72 22 Q84 14 96 18" stroke="#8A5A32" stroke-width="3" fill="none" stroke-linecap="round"/>${leafy(86,22,1.2)}${leafy(94,20,1)}</g>`+neck('M52 50 Q60 36 70 28')+spots([[59,41,2.2],[64,34,2]])+head(74,24,'o',15)+chew(76,31,1.4);
 if(p==='play')return s+sh(26)+body(1)+neck('M52 50 Q58 36 63 26')+spots([[56,40,2.2],[60,33,2]])+head(65,22,'h',-8)+openM(65,29,2.4)+ball(76,86,6);
 return s+sh(28)+body(0)+neck('M52 50 Q58 36 62 26')+spots([[56,40,2.2],[59,33,2]])+head(62,22,'o')+smile(62,29,2.4)}

/* ---------- 3. 獅子（橘色鬃毛，跟遊戲裡的獅子一樣） ---------- */
function lion(p){const g=uid('li');const B=`url(#${g}b)`,M='#F59A3C',D='#C9783A';
 const mane=(cx,cy,r)=>{let d='';for(let i=0;i<14;i++){const a=i/14*Math.PI*2,a2=(i+.5)/14*Math.PI*2;d+=(i?'L':'M')+f(cx+r*Math.cos(a))+' '+f(cy+r*Math.sin(a))+' Q'+f(cx+(r+5)*Math.cos(a2))+' '+f(cy+(r+5)*Math.sin(a2))+' '+f(cx+r*Math.cos(a+Math.PI*2/14))+' '+f(cy+r*Math.sin(a+Math.PI*2/14))}return `<path d="${d}Z" fill="url(#${g}m)"/>`};
 const head=(cx,cy,m,mouth)=>mane(cx,cy,17)+`<circle cx="${cx-8}" cy="${cy-9}" r="4" fill="#FFC878"/><circle cx="${cx+8}" cy="${cy-9}" r="4" fill="#FFC878"/><circle cx="${cx-8}" cy="${cy-9}" r="2" fill="#F6A0A0"/><circle cx="${cx+8}" cy="${cy-9}" r="2" fill="#F6A0A0"/>
  <circle cx="${cx}" cy="${cy}" r="12" fill="${B}"/><ellipse cx="${cx}" cy="${cy+5}" rx="7" ry="5" fill="#FFF0CC"/><path d="M${cx-2.4} ${cy+2} h4.8 l-2.4 2.6Z" fill="#8A4A3A"/>
  ${eyes(cx-5,cx+5,cy-2,2.4,m)}${blush(cx-8,cy+4,2)}${blush(cx+8,cy+4,2)}${mouth||smile(cx,cy+6,2.6)}`;
 let s=`<defs>${gl(g+'b','#FFD89A','#F7B460')}${rg(g+'m','#F9A848','#E0802A')}</defs>`;
 const tail=(d)=>`<path d="${d}" stroke="#F0B060" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 if(p==='sleep')return s+sh(34)+tail('M20 82 Q8 84 8 74')+`<circle cx="8" cy="72" r="3.6" fill="${D}"/><ellipse cx="42" cy="81" rx="28" ry="12" fill="${B}"/><ellipse cx="24" cy="90" rx="9" ry="4.4" fill="#F0A850"/>
  <ellipse cx="66" cy="91" rx="13" ry="4.4" fill="#FFC878"/>${head(66,74,'c',`<path d="M64 81 q2 1.4 4 0" stroke="#5A3A3A" stroke-width="1.4" fill="none"/>`)}${zz(80,46)}`;
 const body=(fl)=>tail('M20 62 Q8 64 10 50')+`<circle cx="10" cy="48" r="3.6" fill="${D}"/>`+legR(22,64,93,7,'#F0A850')+legR(48,64,93,7,'#F0A850')
  +`<ellipse cx="38" cy="62" rx="24" ry="14" fill="${B}"/><ellipse cx="38" cy="70" rx="16" ry="5" fill="#FFF0CC" opacity=".5"/>`+legR(28,66,94,8,'#FFC878')+(fl?`<g transform="rotate(-40 58 68)">${legR(54,66,90,8,'#FFC878')}</g>`:legR(54,66,94,8,'#FFC878'));
 if(p==='eat')return s+sh(32)+body(0)+head(68,48,'h',chew(68,55))+meat(72,64,-20);
 if(p==='play')return s+sh(30)+body(1)+head(68,46,'h',openM(68,53,3))+ball(80,86,6.5);
 return s+sh(32)+body(0)+head(68,46,'o')}

/* ---------- 4. 斑馬（白底黑條紋） ---------- */
function zebra(p){const g=uid('ze');const B=`url(#${g}b)`,K2='#2E2A40';
 const stripes=(cx,cy,rx,ry)=>`<g clip-path="url(#${g}c)">${[-16,-9,-2,5,12,19].map((d,i)=>`<path d="M${cx+d} ${cy-ry-2} q${i%2?3:-3} ${ry} 0 ${ry*2+4}" stroke="${K2}" stroke-width="2.8" fill="none"/>`).join('')}</g>`;
 const head=(cx,cy,m,a=0,mouth)=>`<g transform="rotate(${a} ${cx} ${cy})"><path d="M${cx-6} ${cy-8} l-3 -8 l6 4Z M${cx+6} ${cy-8} l3 -8 l-6 4Z" fill="#F4F4F8" stroke="${K2}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M${cx-2} ${cy-9} l-1 -5 l3 3 l2 -4 l1 6Z" fill="${K2}"/>
  <ellipse cx="${cx}" cy="${cy}" rx="9" ry="10" fill="${B}"/><path d="M${cx-3} ${cy-9.6} v3 M${cx} ${cy-10} v3.4 M${cx+3} ${cy-9.6} v3 M${cx-8.6} ${cy-2} h3 M${cx+5.6} ${cy-2} h3" stroke="${K2}" stroke-width="1.4" stroke-linecap="round"/>
  <ellipse cx="${cx}" cy="${cy+7}" rx="7" ry="5" fill="#5A5468"/><circle cx="${cx-2.4}" cy="${cy+6}" r=".9" fill="#1A1626"/><circle cx="${cx+2.4}" cy="${cy+6}" r=".9" fill="#1A1626"/>
  ${eyes(cx-4.4,cx+4.4,cy+1,2.2,m)}${blush(cx-7,cy+4,1.8)}${blush(cx+7,cy+4,1.8)}${mouth||''}</g>`;
 let s=`<defs>${gl(g+'b','#FFFFFF','#E2E2EE')}<clipPath id="${g}c"><ellipse cx="40" cy="${p==='sleep'?80:56}" rx="22" ry="${p==='sleep'?11:12}"/></clipPath></defs>`;
 const tail=`<path d="M18 ${p==='sleep'?80:54} q-6 4 -6 12" stroke="#E2E2EE" stroke-width="2" fill="none"/><path d="M12 ${p==='sleep'?90:64} l-2 6 l4 0Z" fill="${K2}"/>`;
 if(p==='sleep')return s+sh(30)+tail+`<ellipse cx="24" cy="91" rx="9" ry="3.6" fill="#DADAE8"/><ellipse cx="40" cy="80" rx="22" ry="11" fill="${B}"/>${stripes(40,80,22,11)}<ellipse cx="58" cy="91" rx="9" ry="3.6" fill="#EDEDF4"/><path d="M54 91 v-3 M58 91 v-3.4 M62 91 v-3" stroke="${K2}" stroke-width="1.4"/>
  <path d="M56 76 Q64 70 66 66" stroke="${B}" stroke-width="9" fill="none" stroke-linecap="round"/>${head(70,70,'c',-30)}${zz(78,42)}`;
 const leg=(x,c)=>legR(x,60,94,5.4,c,'#2E2A40')+`<path d="M${x} 72 h5.4 M${x} 78 h5.4 M${x} 84 h5.4" stroke="${K2}" stroke-width="1.4"/>`;
 const body=(fl)=>tail+leg(24,'#E6E6F0')+leg(46,'#E6E6F0')+`<ellipse cx="40" cy="56" rx="22" ry="12" fill="${B}"/>${stripes(40,56,22,12)}`+leg(30,'#FFFFFF')+(fl?`<g transform="rotate(-38 55 62)">${leg(52,'#FFFFFF')}</g>`:leg(52,'#FFFFFF'));
 const neck=(d)=>`<path d="${d}" stroke="${K2}" stroke-width="4" fill="none" stroke-linecap="round" transform="translate(-3.6 -1.6)"/><path d="${d}" stroke="${B}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K2}" stroke-width="10" fill="none" stroke-dasharray="1.6 4.4" opacity=".85"/>`;
 if(p==='eat')return s+sh(30)+body(0)+neck('M54 52 Q66 60 72 72')+grass(90,95)+head(76,80,'o',-25,chew(77,87,1.4));
 if(p==='play')return s+sh(28)+body(1)+neck('M54 52 Q62 40 64 32')+head(66,28,'h',8,openM(66,35,2.4))+motion(16,40);
 return s+sh(30)+body(0)+neck('M54 52 Q62 40 64 32')+head(66,28,'o',5,smile(66,35,2.4,'#F4F4F8'))}

/* ---------- 5. 河馬（淡紫灰、粉紅肚子） ---------- */
function hippo(p){const g=uid('hp');const B=`url(#${g}b)`,D='#9A88B4',P='#F7B8C8';
 const head=(cx,cy,m,open)=>`<circle cx="${cx-9}" cy="${cy-12}" r="3.4" fill="${D}"/><circle cx="${cx+7}" cy="${cy-13}" r="3.4" fill="${D}"/><circle cx="${cx-9}" cy="${cy-12}" r="1.6" fill="${P}"/><circle cx="${cx+7}" cy="${cy-13}" r="1.6" fill="${P}"/>
  <ellipse cx="${cx}" cy="${cy-3}" rx="13" ry="11" fill="${B}"/>`
  +(open?`<path d="M${cx-14} ${cy+2} Q${cx} ${cy+24} ${cx+15} ${cy+2} Q${cx} ${cy+8} ${cx-14} ${cy+2}Z" fill="#E86A7A"/><path d="M${cx-14} ${cy+4} Q${cx} ${cy-4} ${cx+15} ${cy+4} L${cx+15} ${cy+1} Q${cx} ${cy-10} ${cx-14} ${cy+1}Z" fill="${B}"/><rect x="${cx-9}" y="${cy+3}" width="3" height="4" rx="1" fill="#fff"/><rect x="${cx+6}" y="${cy+3}" width="3" height="4" rx="1" fill="#fff"/><ellipse cx="${cx}" cy="${cy+13}" rx="6" ry="3" fill="#FFB0B8"/>`
   :`<ellipse cx="${cx+1}" cy="${cy+7}" rx="15" ry="9" fill="${B}"/><ellipse cx="${cx+1}" cy="${cy+9}" rx="11" ry="5" fill="${P}" opacity=".55"/>`)
  +`<ellipse cx="${cx-5}" cy="${cy+(open?-1:3)}" rx="1.6" ry="1.1" fill="#6A4A7A"/><ellipse cx="${cx+7}" cy="${cy+(open?-1:3)}" rx="1.6" ry="1.1" fill="#6A4A7A"/>
  ${eyes(cx-5,cx+5,cy-8,2.4,m)}${blush(cx-11,cy-2,2.2)}${blush(cx+13,cy-2,2.2)}`;
 let s=`<defs>${gl(g+'b','#CDBEDF','#A796C2')}</defs>`;
 if(p==='sleep')return s+sh(36)+`<ellipse cx="42" cy="80" rx="31" ry="14" fill="${B}"/><ellipse cx="40" cy="88" rx="22" ry="5" fill="${P}" opacity=".45"/><ellipse cx="22" cy="92" rx="8" ry="3.4" fill="${D}"/><ellipse cx="58" cy="92" rx="8" ry="3.4" fill="${D}"/>
  <path d="M12 76 l-4 3" stroke="${D}" stroke-width="2.4" stroke-linecap="round"/>${head(72,80,'c',0)}${zz(84,50)}`;
 const body=`<path d="M12 60 l-4 3" stroke="${D}" stroke-width="2.4" stroke-linecap="round"/>`+legR(20,70,93,9,D)+legR(48,70,93,9,D)+`<ellipse cx="40" cy="64" rx="30" ry="20" fill="${B}"/><ellipse cx="38" cy="76" rx="22" ry="6" fill="${P}" opacity=".45"/>`+legR(28,72,94,10,'#B4A4CC')+legR(56,72,94,10,'#B4A4CC');
 if(p==='eat')return s+sh(34)+body+head(70,48,'h',0)+grass(72,64)+chew(71,58);
 if(p==='play')return s+sh(34)+body+head(70,44,'h',1)+drops(88,30)+drops(54,30,'#9FE0FF');
 return s+sh(34)+body+head(70,48,'o',0)+smile(71,59,3)}

/* ---------- 6. 犀牛（灰色、兩支角） ---------- */
function rhino(p){const g=uid('rh');const B=`url(#${g}b)`,D='#8A92A2',H='#F2EAD8';
 const head=(cx,cy,m,a=0,mouth)=>`<g transform="rotate(${a} ${cx} ${cy})"><path d="M${cx-10} ${cy-10} l-2 -8 l6 5Z" fill="#B8C0CC" stroke="${D}" stroke-width="1"/><path d="M${cx-2} ${cy-12} l1 -8 l4 7Z" fill="#B8C0CC" stroke="${D}" stroke-width="1"/>
  <path d="M${cx-12} ${cy-6} Q${cx-10} ${cy-14} ${cx} ${cy-13} Q${cx+12} ${cy-12} ${cx+16} ${cy} Q${cx+18} ${cy+10} ${cx+8} ${cy+11} Q${cx-6} ${cy+12} ${cx-12} ${cy+4}Z" fill="${B}"/>
  <path d="M${cx+12} ${cy-5} Q${cx+15} ${cy-20} ${cx+22} ${cy-24} Q${cx+20} ${cy-12} ${cx+18} ${cy-3}Z" fill="${H}" stroke="#C8B898" stroke-width=".8"/><path d="M${cx+6} ${cy-11} Q${cx+8} ${cy-17} ${cx+12} ${cy-19} Q${cx+11} ${cy-13} ${cx+11} ${cy-9}Z" fill="${H}" stroke="#C8B898" stroke-width=".8"/>
  <circle cx="${cx+12}" cy="${cy+4}" r="1" fill="#5A6070"/>${eyes(cx-3,cx+5,cy-4,2.2,m,cy-5)}${blush(cx-6,cy+3,2)}${blush(cx+9,cy+1,1.8)}${mouth||''}</g>`;
 let s=`<defs>${gl(g+'b','#C8CED8','#9EA6B6')}</defs>`;
 if(p==='sleep')return s+sh(34)+`<ellipse cx="40" cy="80" rx="28" ry="13" fill="${B}"/><path d="M16 74 q-6 2 -6 8" stroke="${D}" stroke-width="2" fill="none"/><ellipse cx="22" cy="91" rx="8" ry="3.4" fill="${D}"/><ellipse cx="56" cy="91" rx="9" ry="3.4" fill="#A8B0BE"/>
  <path d="M28 72 q4 -4 8 0 M42 70 q4 -4 8 0" stroke="${D}" stroke-width="1.2" fill="none" opacity=".6"/>${head(70,80,'c',0,'')}${zz(80,48)}`;
 const body=`<path d="M14 56 q-6 3 -6 10" stroke="${D}" stroke-width="2" fill="none"/>`+legR(20,64,93,9,D)+legR(46,64,93,9,D)+`<ellipse cx="38" cy="60" rx="27" ry="17" fill="${B}"/><path d="M26 50 q4 -4 8 0 M40 48 q4 -4 8 0" stroke="${D}" stroke-width="1.2" fill="none" opacity=".6"/><ellipse cx="38" cy="70" rx="18" ry="5" fill="#E2E6EE" opacity=".5"/>`+legR(27,66,94,10,'#AEB6C4')+legR(53,66,94,10,'#AEB6C4');
 if(p==='eat')return s+sh(32)+grass(84,93)+body+head(70,70,'o',20,chew(78,82,1.4))+grass(92,94);
 if(p==='play')return s+sh(32)+body+head(70,50,'h',-12,`<path d="M74 58 q4 3 8 0" stroke="#5A6070" stroke-width="1.4" fill="none"/>`)+ball(93,30,6)+motion(88,24,-.6);
 return s+sh(32)+body+head(70,52,'o',0,`<path d="M75 60 q3 2 6 0" stroke="#5A6070" stroke-width="1.4" fill="none"/>`)}

/* ---------- 7. 猴子（灰褐色、粉紅臉；跟「小猴子跳跳」不同色，是動物園裡的猴子） ---------- */
function monkey(p){const g=uid('mk');const B=`url(#${g}b)`,D='#7E6450',F='#F6C8B0';
 const head=(cx,cy,m,mouth)=>`<circle cx="${cx-14}" cy="${cy}" r="6" fill="${D}"/><circle cx="${cx+14}" cy="${cy}" r="6" fill="${D}"/><circle cx="${cx-14}" cy="${cy}" r="3.4" fill="${F}"/><circle cx="${cx+14}" cy="${cy}" r="3.4" fill="${F}"/>
  <circle cx="${cx}" cy="${cy-1}" r="14" fill="${B}"/><path d="M${cx-10} ${cy+1} Q${cx-10} ${cy-9} ${cx-3} ${cy-7} Q${cx} ${cy-10} ${cx+3} ${cy-7} Q${cx+10} ${cy-9} ${cx+10} ${cy+1} Q${cx+11} ${cy+11} ${cx} ${cy+12} Q${cx-11} ${cy+11} ${cx-10} ${cy+1}Z" fill="${F}"/>
  ${eyes(cx-4.4,cx+4.4,cy-1,2.4,m)}<ellipse cx="${cx}" cy="${cy+4}" rx="2" ry="1.2" fill="#8A4A3A"/>${mouth||smile(cx,cy+7,3,'#8A4A3A')}${blush(cx-7,cy+5,2)}${blush(cx+7,cy+5,2)}<path d="M${cx-3} ${cy-14} Q${cx} ${cy-18} ${cx+3} ${cy-14}" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 let s=`<defs>${gl(g+'b','#B49A80','#8E7258')}</defs>`;
 const tail=`<path d="M60 84 Q80 86 80 70 Q80 62 74 64" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
 if(p==='sleep')return s+sh(26)+tail+`<ellipse cx="50" cy="78" rx="19" ry="16" fill="${B}"/><path d="M34 90 q6 4 12 2 M66 90 q-6 4 -12 2" stroke="${D}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M34 72 Q40 86 50 86 Q60 86 66 72" stroke="${D}" stroke-width="7" fill="none" stroke-linecap="round"/>${head(50,60,'c',`<path d="M48 67 q2 1 4 0" stroke="#8A4A3A" stroke-width="1.2" fill="none"/>`)}${zz(66,30)}`;
 const body=(arms)=>tail+`<ellipse cx="50" cy="74" rx="17" ry="18" fill="${B}"/><ellipse cx="50" cy="78" rx="10" ry="11" fill="${F}" opacity=".85"/><path d="M40 90 v4 M60 90 v4" stroke="${D}" stroke-width="7" stroke-linecap="round"/><ellipse cx="38" cy="94" rx="4.4" ry="2" fill="${F}"/><ellipse cx="62" cy="94" rx="4.4" ry="2" fill="${F}"/>`+arms;
 if(p==='eat')return s+sh(24)+body(`<path d="M36 70 Q36 62 44 60 M64 70 Q64 62 56 60" stroke="${D}" stroke-width="6" fill="none" stroke-linecap="round"/>`)+head(50,40,'h',chew(50,48,1.6))+banana(52,58,-60)+`<circle cx="44" cy="60" r="3" fill="${F}"/><circle cx="56" cy="60" r="3" fill="${F}"/>`;
 if(p==='play')return s+sh(22)+body(`<path d="M36 68 Q26 58 28 44 M64 68 Q74 58 72 44" stroke="${D}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="28" cy="42" r="3.4" fill="${F}"/><circle cx="72" cy="42" r="3.4" fill="${F}"/>`)+head(50,40,'h',openM(50,47,3,'#8A4A3A'))+motion(22,56);
 return s+sh(24)+body(`<path d="M36 68 Q32 78 36 86 M64 68 Q68 78 64 86" stroke="${D}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="36" cy="87" r="3" fill="${F}"/><circle cx="64" cy="87" r="3" fill="${F}"/>`)+head(50,40,'o')}

G.__ZOO8a={elephant,giraffe,lion,zebra,hippo,rhino,monkey,H:{f,uid,gl,rg,sh,eyes,eye1,E1,blush,smile,openM,chew,zz,ball,drops,motion,leafy,grass,fish,bamboo,banana,apple,meat,acorns,bug,ants,legR}};
})(typeof window!=='undefined'?window:globalThis);

/* ===== 動物第二批（8～20） ===== */
(function(G){
const A=G.__ZOO8a;if(!A)return;const {f,uid,gl,rg,sh,eyes,eye1,E1,blush,smile,openM,chew,zz,ball,drops,motion,leafy,grass,fish,bamboo,banana,apple,meat,acorns,bug,ants,legR}=A.H;

/* ---------- 8. 貓熊（白色、黑耳朵、黑眼圈、黑手腳） ---------- */
function panda(p){const g=uid('pa');const B=`url(#${g}b)`,K='#2C2A38';
 const pe=(x,y,m)=>m==='o'?`<g class="blink" style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="2.6" fill="#fff"/><circle cx="${x}" cy="${y}" r="1.9" fill="${K}"/><circle cx="${f(x+.7)}" cy="${f(y-.8)}" r=".8" fill="#fff"/></g>`
  :E1(x,y,2.4,m).replace(new RegExp(`stroke="#2A1E36"`),'stroke="#FFFFFF"');
 const head=(cx,cy,m,mouth)=>`<circle cx="${cx-11}" cy="${cy-11}" r="5.4" fill="${K}"/><circle cx="${cx+11}" cy="${cy-11}" r="5.4" fill="${K}"/>
  <circle cx="${cx}" cy="${cy}" r="15" fill="${B}"/><ellipse cx="${cx-6}" cy="${cy}" rx="4.4" ry="5.6" fill="${K}" transform="rotate(25 ${cx-6} ${cy})"/><ellipse cx="${cx+6}" cy="${cy}" rx="4.4" ry="5.6" fill="${K}" transform="rotate(-25 ${cx+6} ${cy})"/>
  ${pe(cx-5.6,cy-.4,m)}${pe(cx+5.6,cy-.4,m)}<ellipse cx="${cx}" cy="${cy+6}" rx="2.4" ry="1.6" fill="${K}"/>${mouth||smile(cx,cy+9,2.6,K)}${blush(cx-10,cy+7,2.2)}${blush(cx+10,cy+7,2.2)}`;
 let s=`<defs>${gl(g+'b','#FFFFFF','#E6E6EE')}</defs>`;
 if(p==='stand')return s+sh(32)+`<circle cx="16" cy="58" r="3.4" fill="#F0F0F4"/>`+legR(22,64,93,9,K)+legR(46,64,93,9,K)+`<ellipse cx="38" cy="62" rx="24" ry="16" fill="${B}"/><path d="M44 48 Q56 44 63 52 Q65 64 62 76 L50 76 Q52 62 44 48Z" fill="${K}"/>`+legR(30,66,94,10,K)+legR(52,66,94,10,K)+head(68,46,'o');
 if(p==='sleep')return s+sh(34)+`<ellipse cx="42" cy="80" rx="28" ry="13" fill="${B}"/><path d="M50 70 Q60 72 60 90 Q52 92 46 90 Q46 78 42 70Z" fill="${K}"/><ellipse cx="22" cy="90" rx="9" ry="4.4" fill="${K}"/><ellipse cx="64" cy="91" rx="11" ry="4.4" fill="${K}"/>`+head(70,76,'c',`<path d="M68 85 q2 1.2 4 0" stroke="${K}" stroke-width="1.3" fill="none"/>`)+zz(82,46);
 const sit=(arms)=>`<ellipse cx="50" cy="74" rx="20" ry="19" fill="${B}"/><ellipse cx="50" cy="78" rx="12" ry="12" fill="#FFFFFF" opacity=".6"/><ellipse cx="36" cy="90" rx="8" ry="5.6" fill="${K}"/><ellipse cx="64" cy="90" rx="8" ry="5.6" fill="${K}"/><ellipse cx="36" cy="90" rx="3.4" ry="2.6" fill="#5A5468"/><ellipse cx="64" cy="90" rx="3.4" ry="2.6" fill="#5A5468"/><path d="M34 58 Q50 54 66 58 L64 64 Q50 60 36 64Z" fill="${K}"/>`+arms;
 if(p==='eat')return s+sh(28)+sit(`<path d="M36 62 Q34 70 44 70 M64 62 Q66 70 56 70" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/>`)+bamboo(62,58,12,30)+head(50,44,'h',chew(50,53,1.6))+`<circle cx="45" cy="69" r="4" fill="${K}"/><circle cx="58" cy="68" r="4" fill="${K}"/>`;
 return s+sh(28)+sit(`<path d="M36 62 Q34 72 38 80 M64 62 Q74 54 76 42" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/>`)+head(50,44,'h',openM(50,52,2.8,K))+ball(50,86,7)+motion(84,44,-.6)}

/* ---------- 9. 小貓熊 —— 野生版。造型、顏色照第七季寵物版（m7b_s7art.js 的 PET41.redpanda41：圓耳朵白邊深色耳內、白眉毛、白臉頰、白嘴巴、奶油色和紅褐色一圈一圈的大尾巴），寵物版有就直接用它的顏色 ---------- */
const RP0={fur:'#D9662E',furL:'#F59A5C',furD:'#A8461E',dark:'#4E2A22',darkL:'#7A4434',white:'#FFF8EE',cream:'#F6D2A6',ring:'#F2C08C',inner:'#5A2E24'};
const RPc=()=>{try{const P=G.PET41&&G.PET41.RP;return P&&P.fur?Object.assign({},RP0,P):RP0}catch(e){return RP0}};
const RP=RP0;
function redpanda(p){const g=uid('rp');const C=RPc();const B=`url(#${g}b)`,DK=`url(#${g}d)`;
 const tail=(d,w=7.4)=>`<path d="${d}" stroke="${C.ring}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${C.fur}" stroke-width="${w}" fill="none" stroke-dasharray="3.6 3.6"/>`;
 const ear=(x,y,sx)=>`<g transform="translate(${x} ${y}) scale(${sx} 1)"><path d="M-6 6 Q-9 -8 0 -9 Q7 -9 6 3Z" fill="${C.white}"/><path d="M-4.4 4.6 Q-6.4 -5.6 0 -6.6 Q4.6 -6.4 4 2.4Z" fill="${C.fur}"/><path d="M-3 3.4 Q-4.2 -3.4 0 -4 Q3 -3.6 2.4 1.6Z" fill="${C.inner}"/></g>`;
 const head=(cx,cy,m,mouth)=>ear(cx-9,cy-9,1)+ear(cx+9,cy-9,-1)+`<ellipse cx="${cx}" cy="${cy}" rx="14" ry="12" fill="${B}"/>
  <path d="M${cx-14} ${cy+1} Q${cx-12} ${cy-4} ${cx-7} ${cy-1} Q${cx-5} ${cy+5} ${cx-7} ${cy+10} Q${cx-13} ${cy+8} ${cx-14} ${cy+1}Z M${cx+14} ${cy+1} Q${cx+12} ${cy-4} ${cx+7} ${cy-1} Q${cx+5} ${cy+5} ${cx+7} ${cy+10} Q${cx+13} ${cy+8} ${cx+14} ${cy+1}Z" fill="${C.white}"/>
  <path d="M${cx-5.6} ${cy+4} Q${cx-5.6} ${cy} ${cx} ${cy} Q${cx+5.6} ${cy} ${cx+5.6} ${cy+4} Q${cx+5.6} ${cy+9} ${cx} ${cy+9} Q${cx-5.6} ${cy+9} ${cx-5.6} ${cy+4}Z" fill="${C.white}"/>
  <ellipse cx="${cx-5.4}" cy="${cy-6.4}" rx="2.6" ry="1.5" fill="${C.white}" transform="rotate(-12 ${cx-5.4} ${cy-6.4})"/><ellipse cx="${cx+5.4}" cy="${cy-6.4}" rx="2.6" ry="1.5" fill="${C.white}" transform="rotate(12 ${cx+5.4} ${cy-6.4})"/>
  ${eyes(cx-5,cx+5,cy-1.6,2.4,m)}<ellipse cx="${cx}" cy="${cy+3}" rx="2.2" ry="1.5" fill="#3A2420"/>${mouth||smile(cx,cy+5.6,2.2,'#3A2420')}${blush(cx-9.6,cy+4,1.8)}${blush(cx+9.6,cy+4,1.8)}`;
 let s=`<defs>${gl(g+'b',C.furL,C.fur)}${gl(g+'d',C.darkL,C.dark)}</defs>`;
 if(p==='sleep')return s+sh(30)+`<ellipse cx="46" cy="80" rx="26" ry="13" fill="${B}"/>`+tail('M22 82 Q30 94 56 92 Q72 90 76 84',9.4)+head(62,74,'c',`<path d="M60 80 q2 1 4 0" stroke="#3A2420" stroke-width="1.2" fill="none"/>`)+zz(76,44);
 if(p==='stand')return s+sh(30)+tail('M24 66 Q10 62 10 48 Q10 40 16 38',7.4)+legR(28,68,93,6,C.dark)+legR(48,68,93,6,C.dark)+`<ellipse cx="44" cy="66" rx="22" ry="12" fill="${B}"/><ellipse cx="44" cy="74" rx="14" ry="4" fill="${C.dark}" opacity=".7"/>`+legR(34,70,94,6.4,C.darkL)+legR(54,70,94,6.4,C.darkL)+head(70,54,'o');
 const up=(arms)=>tail('M42 86 Q22 90 18 76 Q16 64 24 60',7.4)+`<ellipse cx="50" cy="72" rx="15" ry="18" fill="${B}"/><ellipse cx="50" cy="78" rx="9" ry="11" fill="${C.dark}" opacity=".85"/><path d="M42 88 v5 M58 88 v5" stroke="${C.dark}" stroke-width="7" stroke-linecap="round"/>`+arms;
 if(p==='eat')return s+sh(24)+up(`<path d="M38 66 Q38 58 46 58 M62 66 Q62 58 54 58" stroke="${DK}" stroke-width="6" fill="none" stroke-linecap="round"/>`)+head(50,42,'h',chew(50,48,1.4))+apple(50,58);
 return s+sh(22)+up(`<path d="M38 64 Q28 56 28 44 M62 64 Q72 56 72 44" stroke="${DK}" stroke-width="6" fill="none" stroke-linecap="round"/>`)+head(50,42,'h',openM(50,47.4,2.4,'#3A2420'))+motion(22,40)}

/* ---------- 10. 企鵝（跟遊戲裡的企鵝一樣：藍色、白肚子、橘色嘴和腳） ---------- */
function penguin(p){const g=uid('pe');const B=`url(#${g}b)`,O='#FFA43A';
 const body=(cx,cy,m,fl,beak,feet=1)=>`${feet?`<ellipse cx="${cx-7}" cy="${cy+30}" rx="6" ry="2.6" fill="${O}"/><ellipse cx="${cx+7}" cy="${cy+30}" rx="6" ry="2.6" fill="${O}"/>`:''}
  ${fl}<ellipse cx="${cx}" cy="${cy}" rx="18" ry="30" fill="${B}"/><path d="M${cx-12} ${cy+4} Q${cx-14} ${cy-14} ${cx} ${cy-14} Q${cx+14} ${cy-14} ${cx+12} ${cy+4} Q${cx+12} ${cy+28} ${cx} ${cy+28} Q${cx-12} ${cy+28} ${cx-12} ${cy+4}Z" fill="#FFFFFF"/>
  <ellipse cx="${cx-6}" cy="${cy-22}" rx="5" ry="3" fill="#fff" opacity=".25"/>${eyes(cx-6,cx+6,cy-14,2.6,m)}${beak}${blush(cx-10,cy-8,2.2)}${blush(cx+10,cy-8,2.2)}`;
 const bk=(cx,cy,open)=>open?`<path d="M${cx-4} ${cy} L${cx} ${cy-3} L${cx+4} ${cy}Z" fill="${O}"/><path d="M${cx-3.4} ${cy+1.4} L${cx} ${cy+5} L${cx+3.4} ${cy+1.4}Z" fill="#F08A2A"/>`:`<path d="M${cx-4} ${cy-1} L${cx+4} ${cy-1} L${cx} ${cy+4}Z" fill="${O}"/>`;
 const flip=(a1,a2)=>`<path d="M34 50 Q24 ${62+a1} 28 ${74+a1} Q34 66 36 58Z" fill="#3A50A0"/><path d="M66 50 Q76 ${62+a2} 72 ${74+a2} Q66 66 64 58Z" fill="#3A50A0"/>`;
 let s=`<defs>${gl(g+'b','#6A86D8','#3A52A8')}</defs>`;
 if(p==='sleep')return s+sh(22)+`<g transform="rotate(6 50 94)">${body(50,62,'c',flip(0,0),bk(50,57))}</g>`+zz(66,24);
 if(p==='eat')return s+sh(22)+body(50,62,'h',flip(0,0),bk(50,57,1))+fish(58,58,10);
 if(p==='play')return s+sh(16)+`<g transform="translate(0 -6)">${body(50,62,'h',flip(-22,-22),bk(50,57,1))}</g>`+drops(24,30)+drops(78,26,'#9FE0FF');
 return s+sh(22)+body(50,62,'o',flip(0,0),bk(50,57))}

/* ---------- 11. 北極熊（白色、黑鼻子） ---------- */
function polarbear(p){const g=uid('pb');const B=`url(#${g}b)`,D='#C8D2E2';
 const head=(cx,cy,m,mouth)=>`<circle cx="${cx-10}" cy="${cy-10}" r="4.4" fill="#F4F6FA"/><circle cx="${cx+10}" cy="${cy-10}" r="4.4" fill="#F4F6FA"/><circle cx="${cx-10}" cy="${cy-10}" r="2" fill="#D8DEEA"/><circle cx="${cx+10}" cy="${cy-10}" r="2" fill="#D8DEEA"/>
  <ellipse cx="${cx}" cy="${cy}" rx="14" ry="13" fill="${B}" stroke="#C4CEDF" stroke-width=".8"/><ellipse cx="${cx}" cy="${cy+6}" rx="7" ry="5" fill="#FFFFFF"/><ellipse cx="${cx}" cy="${cy+3.6}" rx="2.6" ry="1.8" fill="#2A2A36"/>
  ${eyes(cx-5,cx+5,cy-2,2.4,m)}${mouth||smile(cx,cy+7,2.4,'#5A5A6A')}${blush(cx-9,cy+4,2)}${blush(cx+9,cy+4,2)}`;
 let s=`<defs>${gl(g+'b','#FFFFFF','#DCE4EF')}</defs>`;
 if(p==='sleep')return s+sh(36)+`<ellipse cx="42" cy="81" rx="29" ry="12" fill="${B}" stroke="#C4CEDF" stroke-width=".8"/><ellipse cx="22" cy="90" rx="9" ry="4.4" fill="${D}"/><ellipse cx="64" cy="91" rx="12" ry="4.4" fill="#EEF2F8"/>`+head(68,76,'c',`<path d="M66 83 q2 1 4 0" stroke="#5A5A6A" stroke-width="1.2" fill="none"/>`)+zz(82,46);
 const body=(fl)=>`<circle cx="15" cy="60" r="3.4" fill="#E6ECF4"/>`+legR(22,64,93,9,D)+legR(46,64,93,9,D)+`<ellipse cx="38" cy="62" rx="25" ry="16" fill="${B}" stroke="#C4CEDF" stroke-width=".8"/>`+legR(29,66,94,10,'#E6ECF4')+(fl?`<g transform="rotate(-36 58 68)">${legR(53,66,90,10,'#E6ECF4')}</g>`:legR(53,66,94,10,'#E6ECF4'));
 if(p==='eat')return s+sh(32)+body(0)+head(68,48,'h',chew(68,55,1.6))+fish(76,60,-30);
 if(p==='play')return s+sh(30)+body(1)+head(68,46,'h',openM(68,53,2.8,'#5A5A6A'))+ball(82,86,6.5);
 return s+sh(32)+body(0)+head(68,48,'o')}

/* ---------- 12. 無尾熊（灰色、毛毛大耳朵、大鼻子；手上抱著尤加利樹枝） ---------- */
function koala(p){const g=uid('ko');const B=`url(#${g}b)`,D='#7E8096',N='#3A3444';
 const ear=(x,y)=>`<circle cx="${x}" cy="${y}" r="8" fill="${B}"/><circle cx="${x}" cy="${y}" r="5" fill="#F2F0F6"/><path d="M${x-6} ${y-4} l-2 -2 M${x-7} ${y} l-3 0 M${x+6} ${y-4} l2 -2 M${x+7} ${y} l3 0" stroke="#F2F0F6" stroke-width="1.4" stroke-linecap="round"/>`;
 const head=(cx,cy,m,mouth)=>ear(cx-14,cy-6)+ear(cx+14,cy-6)+`<ellipse cx="${cx}" cy="${cy}" rx="14" ry="13" fill="${B}"/><ellipse cx="${cx}" cy="${cy+3}" rx="4" ry="5.4" fill="${N}"/><ellipse cx="${cx-1.4}" cy="${cy+1}" rx="1.2" ry="1.8" fill="#fff" opacity=".4"/>
  ${eyes(cx-7,cx+7,cy-2,2.2,m)}${mouth||smile(cx,cy+10,2.2,N)}${blush(cx-9,cy+5,2)}${blush(cx+9,cy+5,2)}`;
 const euc=(x,y,a=0)=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0 Q6 -8 4 -18" stroke="#8A6A4A" stroke-width="1.6" fill="none"/>${[[2,-6,30],[5,-12,-30],[3,-17,20]].map(([a1,b1,r])=>`<ellipse cx="${a1}" cy="${b1}" rx="2.6" ry="5" fill="#8CC0A0" transform="rotate(${r} ${a1} ${b1})"/>`).join('')}</g>`;
 let s=`<defs>${gl(g+'b','#B8BAC8','#8E90A4')}</defs>`;
 const sit=(arms)=>`<ellipse cx="50" cy="76" rx="18" ry="18" fill="${B}"/><ellipse cx="50" cy="80" rx="10" ry="11" fill="#E6E4EE"/><ellipse cx="38" cy="92" rx="6" ry="3.6" fill="${D}"/><ellipse cx="62" cy="92" rx="6" ry="3.6" fill="${D}"/>`+arms;
 if(p==='sleep')return s+sh(26)+`<ellipse cx="50" cy="80" rx="20" ry="15" fill="${B}"/><ellipse cx="38" cy="92" rx="6" ry="3.4" fill="${D}"/><ellipse cx="62" cy="92" rx="6" ry="3.4" fill="${D}"/><path d="M34 76 Q50 90 66 76" stroke="${D}" stroke-width="7" fill="none" stroke-linecap="round"/>`+`<g transform="rotate(-14 50 64)">${head(50,62,'c',`<path d="M48 72 q2 1 4 0" stroke="${N}" stroke-width="1.2" fill="none"/>`)}</g>`+zz(70,30);
 if(p==='eat')return s+sh(24)+sit(`<path d="M36 70 Q38 62 46 60 M64 70 Q62 62 54 60" stroke="${D}" stroke-width="7" fill="none" stroke-linecap="round"/>`)+head(50,44,'h',chew(50,54,1.4))+euc(60,66,10);
 if(p==='play')return s+sh(22)+sit(`<path d="M36 68 Q34 78 38 86 M64 66 Q74 56 74 44" stroke="${D}" stroke-width="7" fill="none" stroke-linecap="round"/>`)+head(50,44,'h',openM(50,53,2.6,N))+motion(84,46,-.6);
 return s+sh(24)+sit(`<path d="M36 68 Q32 78 38 86 M64 68 Q68 78 62 86" stroke="${D}" stroke-width="7" fill="none" stroke-linecap="round"/>`)+head(50,44,'o')}

/* ---------- 13. 袋鼠（淺褐色、長耳朵、大腳、粗尾巴） ---------- */
function kangaroo(p){const g=uid('ka');const B=`url(#${g}b)`,D='#B8784A',L='#F6DCB8';
 const head=(cx,cy,m,a=0,mouth)=>`<g transform="rotate(${a} ${cx} ${cy})"><ellipse cx="${cx-5}" cy="${cy-12}" rx="3" ry="8" fill="${D}" transform="rotate(-12 ${cx-5} ${cy-12})"/><ellipse cx="${cx+5}" cy="${cy-12}" rx="3" ry="8" fill="${D}" transform="rotate(14 ${cx+5} ${cy-12})"/><ellipse cx="${cx-5}" cy="${cy-12}" rx="1.4" ry="5" fill="#F6C0B0" transform="rotate(-12 ${cx-5} ${cy-12})"/><ellipse cx="${cx+5}" cy="${cy-12}" rx="1.4" ry="5" fill="#F6C0B0" transform="rotate(14 ${cx+5} ${cy-12})"/>
  <ellipse cx="${cx}" cy="${cy}" rx="10" ry="9" fill="${B}"/><ellipse cx="${cx+5}" cy="${cy+4}" rx="7" ry="5" fill="${L}"/><ellipse cx="${cx+9}" cy="${cy+2.4}" rx="1.8" ry="1.3" fill="#4A2A2A"/>
  ${eyes(cx-3,cx+4,cy-2,2.2,m)}${blush(cx-6,cy+3,1.8)}${mouth||smile(cx+6,cy+6,2,'#6A3A2A')}</g>`;
 let s=`<defs>${gl(g+'b','#ECBC84','#CC8A50')}</defs>`;
 if(p==='sleep')return s+sh(34)+`<path d="M20 86 Q8 88 4 80" stroke="${B}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="42" cy="83" rx="24" ry="10" fill="${B}"/><ellipse cx="44" cy="88" rx="14" ry="4" fill="${L}"/><ellipse cx="30" cy="92" rx="12" ry="3" fill="${D}"/>`+head(68,80,'c',-10,'')+zz(78,52);
 const body=(dy,feet,arms)=>`<g transform="translate(0 ${dy})"><path d="M36 84 Q18 90 8 92" stroke="${B}" stroke-width="8" fill="none" stroke-linecap="round"/>${feet}<ellipse cx="48" cy="66" rx="14" ry="20" fill="${B}" transform="rotate(14 48 66)"/><ellipse cx="51" cy="70" rx="8" ry="13" fill="${L}" transform="rotate(14 51 70)"/>
  <ellipse cx="42" cy="80" rx="11" ry="8" fill="${B}"/>${arms}</g>`;
 const ft=`<path d="M38 86 L58 92 Q60 94 56 94 L36 93Z" fill="${D}"/>`;
 if(p==='eat')return s+sh(30)+body(4,ft,`<path d="M56 62 Q62 68 64 74" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/>`)+grass(76,94)+head(70,80,'h',30,chew(77,85,1.3));
 if(p==='play')return s+sh(20)+body(-10,`<path d="M36 84 L50 96 Q52 98 48 98 L32 92Z" fill="${D}"/>`,`<path d="M56 54 Q64 52 68 46" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/>`)+head(60,30,'h',0,openM(66,37,2.2,'#6A3A2A'))+motion(14,58)+motion(18,70);
 return s+sh(30)+body(0,ft,`<path d="M56 58 Q62 64 62 70" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/>`)+head(60,40,'o')}

/* ---------- 14. 紅鶴（粉紅色、長腳、彎彎的嘴） ---------- */
function flamingo(p){const g=uid('fl');const B=`url(#${g}b)`,LG='#F27BA0';
 const head=(cx,cy,m,a=0)=>`<g transform="rotate(${a} ${cx} ${cy})"><circle cx="${cx}" cy="${cy}" r="7" fill="${B}"/><path d="M${cx+5} ${cy-1} Q${cx+13} ${cy-1} ${cx+13} ${cy+6} Q${cx+12} ${cy+10} ${cx+9} ${cy+9} Q${cx+10} ${cy+4} ${cx+5} ${cy+3}Z" fill="#FFF0E2"/><path d="M${cx+12} ${cy+4} Q${cx+12.6} ${cy+9} ${cx+9} ${cy+9} Q${cx+10.4} ${cy+6} ${cx+10.4} ${cy+4}Z" fill="#2E2A40"/>
  ${eye1(cx+1,cy-1,1.9,m)}${blush(cx-3,cy+3,1.6)}</g>`;
 let s=`<defs>${gl(g+'b','#FFC0D4','#FF86AE')}</defs>`;
 const body=`<ellipse cx="44" cy="44" rx="17" ry="11" fill="${B}"/><path d="M30 44 Q38 36 52 40 Q46 50 30 48Z" fill="#FF7FA6"/><path d="M28 44 l-6 -2 l4 5Z" fill="#FF7FA6"/>`;
 if(p==='sleep')return s+sh(20)+`<path d="M44 54 V93" stroke="${LG}" stroke-width="2.6" stroke-linecap="round"/><path d="M44 54 L50 66 L44 70" stroke="${LG}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 93 h8" stroke="${LG}" stroke-width="2.4" stroke-linecap="round"/>`+body+`<path d="M54 40 Q60 34 56 30" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/>`+head(52,32,'c',150)+zz(64,10);
 if(p==='eat')return s+sh(22)+`<path d="M40 54 V93 M50 54 V93" stroke="${LG}" stroke-width="2.6" stroke-linecap="round"/><path d="M36 93 h8 M46 93 h8" stroke="${LG}" stroke-width="2.4" stroke-linecap="round"/>`+body+`<path d="M58 42 Q70 44 70 62 Q70 76 66 80" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/>`+head(66,82,'o',140)+drops(72,92,'#9FE0FF');
 if(p==='play')return s+sh(18)+`<path d="M44 54 V93" stroke="${LG}" stroke-width="2.6" stroke-linecap="round"/><path d="M40 93 h8" stroke="${LG}" stroke-width="2.4" stroke-linecap="round"/><path d="M46 54 L56 62 L64 58" stroke="${LG}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  +`<path d="M40 40 Q22 22 14 30 Q22 34 26 42 Q18 44 30 48Z M48 40 Q60 18 74 22 Q66 28 64 36 Q70 38 58 46Z" fill="#FFA8C4"/>`+body+`<path d="M56 38 Q64 28 58 18 Q54 10 60 8" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/>`+head(62,8,'h')+motion(10,58);
 return s+sh(22)+`<path d="M40 54 V93 M50 54 V93" stroke="${LG}" stroke-width="2.6" stroke-linecap="round"/><path d="M36 93 h8 M46 93 h8" stroke="${LG}" stroke-width="2.4" stroke-linecap="round"/>`+body+`<path d="M56 38 Q64 28 58 20 Q52 12 58 8" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/>`+head(60,10,'o')}

/* ---------- 15. 鱷魚（綠色、背上一排小山、笑咪咪） ---------- */
function crocodile(p){const g=uid('cr');const B=`url(#${g}b)`,D='#3E8A4A',BL='#D8F0B8';
 const scutes=(y)=>[20,28,36,44,52].map(x=>`<path d="M${x-3} ${y} L${x} ${y-4} L${x+3} ${y}Z" fill="${D}"/>`).join('');
 const head=(cx,cy,m,open,extra='')=>`<circle cx="${cx-2}" cy="${cy-6}" r="4.6" fill="${B}"/><circle cx="${cx+7}" cy="${cy-6}" r="4.6" fill="${B}"/>${eyes(cx-2,cx+7,cy-7,2.2,m)}`
  +(open?`<path d="M${cx-8} ${cy-2} Q${cx+12} ${cy-12} ${cx+30} ${cy-6} Q${cx+32} ${cy-2} ${cx+28} ${cy-1} L${cx-6} ${cy+2}Z" fill="${B}"/><path d="M${cx-6} ${cy+2} L${cx+28} ${cy-1} Q${cx+24} ${cy+10} ${cx-6} ${cy+8}Z" fill="#E86A7A"/><path d="M${cx-6} ${cy+7} Q${cx+12} ${cy+14} ${cx+28} ${cy+6} Q${cx+30} ${cy+10} ${cx+24} ${cy+12} Q${cx+8} ${cy+16} ${cx-6} ${cy+12}Z" fill="${B}"/>${[4,10,16,22].map(x=>`<path d="M${cx+x} ${cy} l1.4 3 l1.4 -3Z M${cx+x} ${cy+9} l1.4 -3 l1.4 3Z" fill="#fff"/>`).join('')}${extra}`
   :`<path d="M${cx-8} ${cy-2} Q${cx+12} ${cy-8} ${cx+30} ${cy-2} Q${cx+33} ${cy+4} ${cx+28} ${cy+6} Q${cx+10} ${cy+10} ${cx-6} ${cy+8}Z" fill="${B}"/><path d="M${cx-4} ${cy+4} Q${cx+12} ${cy+8} ${cx+28} ${cy+3}" stroke="#2E6A3A" stroke-width="1.4" fill="none" stroke-linecap="round"/>${[8,16].map(x=>`<path d="M${cx+x} ${cy+5.6} l1.2 2.4 l1.2 -2.4Z" fill="#fff"/>`).join('')}<circle cx="${cx+27}" cy="${cy-1.6}" r=".9" fill="#2E5A3A"/>`)+blush(cx+2,cy+2,1.8);
 let s=`<defs>${gl(g+'b','#8ED67E','#56A85E')}</defs>`;
 const tail=(d)=>`<path d="${d}" stroke="${B}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
 if(p==='sleep')return s+sh(40)+tail('M20 86 Q8 88 2 84')+`<ellipse cx="36" cy="86" rx="22" ry="7" fill="${B}"/>${scutes(80)}<ellipse cx="36" cy="90" rx="16" ry="2.6" fill="${BL}"/>`+head(58,86,'c',0)+zz(66,58);
 const legs=(fl)=>`<path d="M22 80 l-4 13 h6 M50 80 l${fl?8:4} ${fl?6:13} h6" stroke="#4FA05A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 if(p==='eat')return s+sh(40)+tail('M20 78 Q8 80 2 74')+legs(0)+`<ellipse cx="36" cy="78" rx="22" ry="9" fill="${B}"/>${scutes(70)}<ellipse cx="36" cy="83" rx="16" ry="3" fill="${BL}"/>`+head(58,76,'h',1,fish(74,79,0));
 if(p==='play')return s+sh(38)+tail('M20 76 Q6 72 8 58 Q10 52 14 54')+legs(1)+`<ellipse cx="36" cy="78" rx="22" ry="9" fill="${B}"/>${scutes(70)}<ellipse cx="36" cy="83" rx="16" ry="3" fill="${BL}"/>`+head(58,76,'h',1)+drops(14,44)+drops(88,58,'#9FE0FF');
 return s+sh(40)+tail('M20 78 Q8 80 2 76')+legs(0)+`<ellipse cx="36" cy="78" rx="22" ry="9" fill="${B}"/>${scutes(70)}<ellipse cx="36" cy="83" rx="16" ry="3" fill="${BL}"/>`+head(58,78,'o',0)}

/* ---------- 16. 烏龜（綠色殼、六角花紋） ---------- */
function turtle(p){const g=uid('tu');const B=`url(#${g}b)`,SK='#A8D488',SKD='#7AAE60';
 const shell=`<path d="M22 78 Q22 48 50 46 Q78 48 78 78Z" fill="${B}"/><path d="M20 78 H80 Q80 82 76 82 H24 Q20 82 20 78Z" fill="#E8D88A"/>
  <path d="M42 52 L58 52 L62 62 L50 70 L38 62Z M30 66 L38 62 L50 70 L48 78 L30 78Z M70 66 L62 62 L50 70 L52 78 L70 78Z" fill="#A8D088" opacity=".55" stroke="#4F8A4A" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M32 54 Q40 48 48 48" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/>`;
 const head=(cx,cy,m,mouth)=>`<path d="M${cx-12} ${cy+8} Q${cx-10} ${cy} ${cx-4} ${cy}" stroke="${SK}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="${cx}" cy="${cy-2}" rx="9" ry="8" fill="${SK}"/>${eyes(cx-2,cx+5,cy-4,2,m)}${blush(cx+5,cy+2,1.6)}${mouth||smile(cx+3,cy+2,2,'#4A6A3A')}`;
 let s=`<defs>${gl(g+'b','#8CC070','#4F8A4A')}</defs>`;
 const feet=(fl)=>`<ellipse cx="30" cy="86" rx="5" ry="7" fill="${SKD}"/><ellipse cx="64" cy="86" rx="5" ry="7" fill="${SKD}"/>`+`<path d="M26 80 Q24 92 30 93 Q36 93 34 80Z" fill="${SK}"/>`+(fl?`<ellipse cx="78" cy="76" rx="4" ry="7" fill="${SK}" transform="rotate(55 78 76)"/>`:`<path d="M68 80 Q66 92 72 93 Q78 93 76 80Z" fill="${SK}"/>`)+`<path d="M22 80 l-6 4" stroke="${SK}" stroke-width="4" stroke-linecap="round"/>`;
 if(p==='sleep')return s+sh(30)+`<g transform="translate(0 6)">${shell}<ellipse cx="78" cy="78" rx="4" ry="3" fill="${SKD}"/><path d="M76 77 q2 1 4 0" stroke="#3A5A2A" stroke-width="1" fill="none"/></g>`+zz(72,40);
 if(p==='eat')return s+sh(30)+feet(0)+shell+head(82,72,'h',chew(85,74,1.2))+leafy(94,82,.9);
 if(p==='play')return s+sh(30)+feet(1)+shell+head(82,66,'h',openM(85,68,2,'#4A6A3A'))+ball(94,86,5.4);
 return s+sh(30)+feet(0)+shell+head(82,70,'o')}

/* ---------- 17. 台灣黑熊（黑色、胸前白色 V 字，跟遊戲裡的台灣黑熊一樣） ---------- */
function blackbear(p){const g=uid('bb');const B=`url(#${g}b)`,K='#22202C',V='#FFF6E6',M='#C8A07A';
 const head=(cx,cy,m,mouth)=>`<circle cx="${cx-11}" cy="${cy-10}" r="5" fill="${B}"/><circle cx="${cx+11}" cy="${cy-10}" r="5" fill="${B}"/><circle cx="${cx-11}" cy="${cy-10}" r="2.2" fill="#5A5468"/><circle cx="${cx+11}" cy="${cy-10}" r="2.2" fill="#5A5468"/>
  <ellipse cx="${cx}" cy="${cy}" rx="15" ry="14" fill="${B}"/><ellipse cx="${cx}" cy="${cy+6}" rx="7.4" ry="5.6" fill="${M}"/><ellipse cx="${cx}" cy="${cy+3.6}" rx="2.6" ry="1.8" fill="${K}"/>
  ${E1(cx-5.6,cy-2,2.6,m==='o'?'o':m).replace(/#2A1E36/g,m==='o'?'#0E0C14':'#E8E0F0')}${E1(cx+5.6,cy-2,2.6,m==='o'?'o':m).replace(/#2A1E36/g,m==='o'?'#0E0C14':'#E8E0F0')}
  ${mouth||smile(cx,cy+8,2.4,K)}${blush(cx-10,cy+4,2.2,.4)}${blush(cx+10,cy+4,2.2,.4)}`;
 const vee=(cx,cy,w=12)=>`<path d="M${cx-w} ${cy} Q${cx-w*.4} ${cy+2} ${cx} ${cy+w*.8} Q${cx+w*.4} ${cy+2} ${cx+w} ${cy} Q${cx+w*.4} ${cy+5} ${cx} ${cy+w*1.05} Q${cx-w*.4} ${cy+5} ${cx-w} ${cy}Z" fill="${V}"/>`;
 let s=`<defs>${gl(g+'b','#4A4858','#24222E')}</defs>`;
 if(p==='sleep')return s+sh(34)+`<ellipse cx="44" cy="80" rx="27" ry="13" fill="${B}"/><ellipse cx="24" cy="90" rx="9" ry="4.4" fill="${K}"/><ellipse cx="64" cy="91" rx="12" ry="4.4" fill="#34323F"/>`+head(68,76,'c',`<path d="M66 84 q2 1 4 0" stroke="${K}" stroke-width="1.2" fill="none"/>`)+zz(82,46);
 if(p==='stand')return s+sh(24)+`<path d="M40 82 v10 M60 82 v10" stroke="${K}" stroke-width="9" stroke-linecap="round"/><ellipse cx="50" cy="68" rx="17" ry="20" fill="${B}"/>`+vee(50,56)+`<path d="M35 60 Q28 70 32 80 M65 60 Q72 70 68 80" stroke="#34323F" stroke-width="8" fill="none" stroke-linecap="round"/>`+head(50,38,'o');
 const sit=(arms)=>`<ellipse cx="50" cy="74" rx="19" ry="18" fill="${B}"/>`+vee(50,62)+`<ellipse cx="36" cy="90" rx="8" ry="5" fill="#34323F"/><ellipse cx="64" cy="90" rx="8" ry="5" fill="#34323F"/><ellipse cx="36" cy="90" rx="3.4" ry="2.4" fill="#6A6478"/><ellipse cx="64" cy="90" rx="3.4" ry="2.4" fill="#6A6478"/>`+arms;
 if(p==='eat')return s+sh(28)+sit(`<path d="M35 64 Q34 72 44 74 M65 64 Q66 72 56 74" stroke="#34323F" stroke-width="8" fill="none" stroke-linecap="round"/>`)+head(50,44,'h',chew(50,53,1.6))+acorns(50,74);
 return s+sh(26)+sit(`<path d="M35 64 Q30 74 36 82 M65 62 Q76 54 76 40" stroke="#34323F" stroke-width="8" fill="none" stroke-linecap="round"/>`)+ball(78,32,7)+head(50,44,'h',openM(50,52,2.6,K))}

/* ---------- 18. 梅花鹿（褐色、白色梅花點、小鹿角） ---------- */
function deer(p){const g=uid('de');const B=`url(#${g}b)`,D='#A8602E',L='#F6D8B8',SPT='#FFF4E0';
 const spots=(pts)=>pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.7" fill="${SPT}"/>`).join('');
 const head=(cx,cy,m,a=0,mouth)=>`<g transform="rotate(${a} ${cx} ${cy})"><path d="M${cx-4} ${cy-8} Q${cx-8} ${cy-18} ${cx-6} ${cy-24} M${cx-7} ${cy-16} l-5 -3 M${cx+4} ${cy-8} Q${cx+8} ${cy-18} ${cx+6} ${cy-24} M${cx+7} ${cy-16} l5 -3" stroke="#C8A070" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="${cx-10}" cy="${cy-5}" rx="5" ry="2.6" fill="${D}" transform="rotate(-25 ${cx-10} ${cy-5})"/><ellipse cx="${cx+10}" cy="${cy-5}" rx="5" ry="2.6" fill="${D}" transform="rotate(25 ${cx+10} ${cy-5})"/>
  <ellipse cx="${cx}" cy="${cy}" rx="9" ry="9.6" fill="${B}"/><ellipse cx="${cx}" cy="${cy+5}" rx="6" ry="4.4" fill="${L}"/><ellipse cx="${cx}" cy="${cy+3.4}" rx="2.2" ry="1.5" fill="#3A2A2A"/>
  ${eyes(cx-4,cx+4,cy-1.6,2.2,m)}${blush(cx-7,cy+3,1.8)}${blush(cx+7,cy+3,1.8)}${mouth||''}</g>`;
 let s=`<defs>${gl(g+'b','#DCA070','#B8703E')}</defs>`;
 if(p==='sleep')return s+sh(30)+`<ellipse cx="24" cy="91" rx="8" ry="3.4" fill="${D}"/><ellipse cx="40" cy="82" rx="22" ry="10" fill="${B}"/>${spots([[30,78],[38,76],[46,78],[34,84],[42,84]])}<ellipse cx="58" cy="91" rx="8" ry="3.4" fill="#C8844E"/>
  <path d="M54 76 Q62 68 62 62" stroke="${B}" stroke-width="7" fill="none" stroke-linecap="round"/>${head(64,62,'c',10)}${zz(78,32)}`;
 const leg=(x,c)=>legR(x,62,94,4.6,c,'#5A3A2A');
 const body=(dy,fl)=>`<g transform="translate(0 ${dy})"><path d="M20 54 l-5 -3 l2 5Z" fill="#FFF4E0"/>`+(fl?`<g transform="rotate(30 26 62)">${leg(24,D)}</g><g transform="rotate(-35 52 62)">${leg(48,D)}</g>`:leg(24,D)+leg(48,D))
  +`<ellipse cx="38" cy="58" rx="20" ry="10.6" fill="${B}"/><ellipse cx="38" cy="64" rx="13" ry="3.6" fill="${L}"/>${spots([[28,54],[36,52],[44,54],[32,59],[40,58],[48,58]])}`
  +(fl?`<g transform="rotate(40 32 62)">${leg(30,'#C8844E')}</g><g transform="rotate(-45 56 62)">${leg(52,'#C8844E')}</g>`:leg(30,'#C8844E')+leg(52,'#C8844E'))+`</g>`;
 const neck=(d)=>`<path d="${d}" stroke="${B}" stroke-width="7.4" fill="none" stroke-linecap="round"/>`;
 if(p==='eat')return s+sh(28)+body(0,0)+neck('M52 54 Q62 64 68 76')+grass(80,95)+head(72,80,'o',-20,chew(73,86,1.2));
 if(p==='play')return s+sh(18)+body(-10,1)+neck('M52 44 Q58 34 62 28')+head(64,24,'h',8,openM(64,30,2,'#6A3A2A'))+motion(12,50);
 return s+sh(28)+body(0,0)+neck('M52 54 Q58 42 62 34')+head(64,30,'o',5,smile(64,36,2,'#6A3A2A'))}

/* ---------- 19. 穿山甲（褐色鱗片、尖尖的嘴、長尾巴；睡覺會捲成一顆球） ---------- */
function pangolin(p){const g=uid('pg');const B=`url(#${g}b)`,S2='#8A5A3A',F='#EAC8A6';
 const scales=(cx,cy,rx,ry,n=4)=>{let o='';for(let r=0;r<n;r++){const y=cy-ry+6+r*(ry*1.6/n);const w=rx*Math.sqrt(Math.max(0,1-Math.pow((y-cy)/ry,2)));for(let x=cx-w+4;x<cx+w-2;x+=7)o+=`<path d="M${f(x-3.4)} ${f(y)} Q${f(x)} ${f(y+5)} ${f(x+3.4)} ${f(y)}" stroke="${S2}" stroke-width="1.3" fill="none"/>`}return `<g clip-path="url(#${g}c)">${o}</g>`};
 const head=(cx,cy,m,mouth)=>`<path d="M${cx-8} ${cy-6} Q${cx+4} ${cy-10} ${cx+16} ${cy+2} Q${cx+4} ${cy+8} ${cx-8} ${cy+6}Z" fill="${F}"/><circle cx="${cx+15.4}" cy="${cy+1.6}" r="1.3" fill="#5A3A2A"/>${eyes(cx-1,cx+6,cy-2,1.9,m,cy-2.6)}${blush(cx+2,cy+3,1.6)}${mouth||''}`;
 if(p==='sleep'){const s=`<defs>${gl(g+'b','#D8A878','#A87448')}<clipPath id="${g}c"><circle cx="50" cy="74" r="19"/></clipPath></defs>`;
  return s+sh(22)+`<circle cx="50" cy="74" r="19" fill="${B}"/>`+[0,1,2].map(i=>`<path d="M${50-17+i*2} ${74} A${17-i*5} ${17-i*5} 0 0 1 ${50+17-i*8} ${74-4}" stroke="${S2}" stroke-width="1.4" fill="none" opacity=".8"/>`).join('')
   +[[-12,-10],[-4,-14],[6,-13],[13,-6],[-15,0],[-10,8],[14,4]].map(([a,b])=>`<path d="M${50+a-3.4} ${74+b} Q${50+a} ${74+b+4} ${50+a+3.4} ${74+b}" stroke="${S2}" stroke-width="1.3" fill="none"/>`).join('')
   +`<path d="M36 88 Q50 98 66 86" stroke="${B}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="58" cy="80" rx="6" ry="4.4" fill="${F}"/>${E1(56,79,1.7,'c')}`+zz(66,46)}
 const up=p==='play';
 const s=`<defs>${gl(g+'b','#D8A878','#A87448')}<clipPath id="${g}c">${up?`<ellipse cx="48" cy="62" rx="13" ry="22" transform="rotate(10 48 62)"/>`:`<path d="M18 80 Q22 52 46 50 Q66 52 70 74 L70 80Z"/>`}</clipPath></defs>`;
 if(up)return s+sh(22)+`<path d="M42 82 Q26 90 18 86" stroke="${B}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M44 82 v10 M54 82 v10" stroke="${F}" stroke-width="5" stroke-linecap="round"/><ellipse cx="48" cy="62" rx="13" ry="22" fill="${B}" transform="rotate(10 48 62)"/>${scales(48,62,13,22,5)}<path d="M56 56 Q66 50 70 42 M52 58 Q60 50 62 40" stroke="${F}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`+head(54,36,'h',openM(64,40,1.6,'#6A3A2A'))+motion(84,50,-.6);
 const body=`<path d="M22 76 Q8 78 6 90 Q12 92 18 86" stroke="${B}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M28 78 v14 M60 78 v14" stroke="${F}" stroke-width="5" stroke-linecap="round"/><path d="M18 80 Q22 52 46 50 Q66 52 70 74 L70 80Z" fill="${B}"/>${scales(44,66,28,18,4)}<path d="M36 80 v12 M66 78 v14" stroke="#D8B090" stroke-width="5" stroke-linecap="round"/>`;
 if(p==='eat')return s+sh(32)+body+head(76,74,'h')+`<path d="M92 76 Q98 82 96 90" stroke="#F08A9A" stroke-width="1.4" fill="none" stroke-linecap="round"/>`+ants(88,92);
 return s+sh(32)+body+head(76,70,'o')}

/* ---------- 20. 狐獴（淺黃褐色、黑眼圈、會站起來看四周） ---------- */
function meerkat(p){const g=uid('mm');const B=`url(#${g}b)`,D='#A8784A',L='#F6E2C0',K='#5A3E2E';
 const head=(cx,cy,m,a=0,mouth)=>`<g transform="rotate(${a} ${cx} ${cy})"><circle cx="${cx-8}" cy="${cy-4}" r="2.6" fill="${K}"/><circle cx="${cx+8}" cy="${cy-4}" r="2.6" fill="${K}"/><ellipse cx="${cx}" cy="${cy}" rx="9" ry="9.4" fill="${B}"/><path d="M${cx-6} ${cy+2} Q${cx} ${cy+12} ${cx+6} ${cy+2}Z" fill="${L}"/>
  <ellipse cx="${cx-4}" cy="${cy-1}" rx="3" ry="3.4" fill="${K}" transform="rotate(20 ${cx-4} ${cy-1})"/><ellipse cx="${cx+4}" cy="${cy-1}" rx="3" ry="3.4" fill="${K}" transform="rotate(-20 ${cx+4} ${cy-1})"/>
  ${m==='o'?`<g class="blink" style="transform-origin:${cx}px ${cy-1}px"><circle cx="${cx-4}" cy="${cy-1}" r="1.7" fill="#fff"/><circle cx="${cx-4}" cy="${cy-1}" r="1.2" fill="#1A1218"/><circle cx="${cx+4}" cy="${cy-1}" r="1.7" fill="#fff"/><circle cx="${cx+4}" cy="${cy-1}" r="1.2" fill="#1A1218"/></g>`:E1(cx-4,cy-1,1.8,m).replace('#2A1E36','#FFF4E0')+E1(cx+4,cy-1,1.8,m).replace('#2A1E36','#FFF4E0')}
  <ellipse cx="${cx}" cy="${cy+5}" rx="1.6" ry="1.1" fill="${K}"/>${blush(cx-6,cy+4,1.5)}${blush(cx+6,cy+4,1.5)}${mouth||''}</g>`;
 let s=`<defs>${gl(g+'b','#EAC898','#C89A60')}</defs>`;
 if(p==='sleep')return s+sh(26)+`<ellipse cx="48" cy="84" rx="20" ry="10" fill="${B}"/><path d="M30 88 Q40 96 60 94 Q70 92 70 86" stroke="${D}" stroke-width="5" fill="none" stroke-linecap="round"/>`+head(62,80,'c',20)+zz(70,52);
 if(p==='eat')return s+sh(22)+`<path d="M44 90 Q30 94 26 86" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="76" rx="11" ry="16" fill="${B}"/><ellipse cx="50" cy="80" rx="6" ry="11" fill="${L}"/><path d="M44 90 v3 M56 90 v3" stroke="${D}" stroke-width="5" stroke-linecap="round"/><path d="M42 70 Q44 64 48 62 M58 70 Q56 64 52 62" stroke="${D}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`+head(50,50,'h',0,chew(50,56,1.2))+bug(50,62);
 if(p==='play')return s+sh(30)+`<path d="M24 74 Q12 70 10 60" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="42" cy="78" rx="18" ry="10" fill="${B}" transform="rotate(-10 42 78)"/><path d="M34 84 v9 M50 84 v9" stroke="${D}" stroke-width="5" stroke-linecap="round"/><path d="M56 82 l8 10 M60 80 l10 8" stroke="${D}" stroke-width="3.4" stroke-linecap="round"/>`
  +`<ellipse cx="78" cy="94" rx="12" ry="3" fill="#C8A070"/>${[[74,84],[82,80],[88,86],[70,78]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#C8A070"/>`).join('')}`+head(64,70,'h',30,openM(66,76,1.8,K));
 return s+sh(18)+`<path d="M44 90 Q30 94 26 88" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="70" rx="10" ry="20" fill="${B}"/><ellipse cx="50" cy="74" rx="6" ry="14" fill="${L}"/><path d="M44 88 v5 M56 88 v5" stroke="${D}" stroke-width="5" stroke-linecap="round"/><path d="M42 58 Q42 66 46 68 M58 58 Q58 66 54 68" stroke="${D}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`+head(50,42,'o')}

G.__ZOO8b={panda,redpanda,penguin,polarbear,koala,kangaroo,flamingo,crocodile,turtle,blackbear,deer,pangolin,meerkat,RP};
})(typeof window!=='undefined'?window:globalThis);

/* ===== 動物園場景、站位、保育員、圖示；組成 G.ZOO8 ===== */
(function(G){
const A=G.__ZOO8a,B2=G.__ZOO8b;if(!A||!B2)return;const {f,uid,gl,sh,eyes,blush,smile}=A.H;
const DRAW=Object.assign({},A,B2);delete DRAW.H;delete DRAW.RP;
// 20 種（收集冊順序）。enV：英文錄音可能的寫法（照現有語音包，先找有錄好的）
const LIST=[['elephant','大象','Elephant'],['giraffe','長頸鹿','Giraffe'],['lion','獅子','Lion'],['zebra','斑馬','Zebra'],['hippo','河馬','Hippo'],['rhino','犀牛','Rhino'],['meerkat','狐獴','Meerkat'],
 ['monkey','猴子','Monkey'],['panda','貓熊','Panda'],['redpanda','小貓熊','Red panda'],['koala','無尾熊','Koala'],['kangaroo','袋鼠','Kangaroo'],['flamingo','紅鶴','Flamingo'],['crocodile','鱷魚','Crocodile'],
 ['turtle','烏龜','Turtle'],['polarbear','北極熊','Polar bear'],['penguin','企鵝','Penguin'],['blackbear','台灣黑熊','Formosan black bear'],['deer','梅花鹿','Sika deer'],['pangolin','穿山甲','Pangolin']]
 .map(([k,zh,en])=>({k,zh,en,enV:[en+'.',en.toLowerCase(),en.toLowerCase()+'.'],zhV:[zh+'。',zh]}));
const POSES=['stand','sleep','eat','play'];
const draw=(k,p)=>{try{return DRAW[k]?DRAW[k](POSES.includes(p)?p:'stand'):''}catch(e){console.log('zoo8 draw',k,p,e);return ''}};
const svg=(k,p,a='')=>`<svg viewBox="0 0 100 100" ${a} aria-hidden="true">${draw(k,p)}</svg>`;
// 每種在動物園裡畫多大（世界座標；100×100 的圖放成 size×size）
const SIZE={elephant:230,giraffe:270,lion:175,zebra:185,hippo:200,rhino:195,meerkat:95,monkey:125,panda:165,redpanda:120,koala:120,kangaroo:165,flamingo:165,crocodile:200,turtle:100,polarbear:185,penguin:115,blackbear:160,deer:165,pangolin:110};

/* ---------- 世界：5600×1000，只能左右平移 ---------- */
const WW=5600,WH=1000,HZ=430;
// 分區（地面、名牌圖示用）
const ZONES=[{id:'monkey',x0:0,x1:660},{id:'savanna',x0:660,x1:2050},{id:'rocks',x0:2050,x1:2520},{id:'pond',x0:2520,x1:3260},{id:'bamboo',x0:3260,x1:3800},
 {id:'aussie',x0:3800,x1:4300},{id:'forest',x0:4300,x1:4900},{id:'polar',x0:4900,x1:5200},{id:'peng',x0:5200,x1:5600}];
// 站位：x、y（腳）、tags（位置）、cap（最多幾隻）、st（可以做的事；沒寫＝四種都可以）、wl（在水裡：水面在圖的第幾格）
const SLOTS=[
 {id:'mk_rock',sp:'monkey',x:335,y:562,tags:['rockup'],cap:2},
 {id:'mk_tree',sp:'monkey',x:198,y:440,tags:['treeup'],cap:1,st:['stand','sleep','eat']},
 {id:'mk_gr',sp:'monkey',x:520,y:955,tags:['ground'],cap:3},
 {id:'mm1',sp:'meerkat',x:770,y:968,tags:['ground'],cap:3},
 {id:'mm2',sp:'meerkat',x:2150,y:975,tags:['ground'],cap:3},
 {id:'gi_L',sp:'giraffe',x:930,y:660,tags:['L'],cap:2},
 {id:'gi_R',sp:'giraffe',x:1680,y:660,tags:['R'],cap:2},
 {id:'ze_L',sp:'zebra',x:1060,y:930,tags:['L'],cap:3},
 {id:'ze_R',sp:'zebra',x:1560,y:935,tags:['R'],cap:3},
 {id:'li_under',sp:'lion',x:1310,y:800,tags:['treedown'],cap:2},
 {id:'li_rock',sp:'lion',x:2165,y:604,tags:['rockup'],cap:1},
 {id:'el1',sp:'elephant',x:1890,y:700,tags:['ground'],cap:2},
 {id:'el2',sp:'elephant',x:1960,y:965,tags:['ground'],cap:1},
 {id:'rh1',sp:'rhino',x:2370,y:950,tags:['ground'],cap:2},
 {id:'rh2',sp:'rhino',x:2420,y:690,tags:['ground'],cap:1},
 {id:'hp_bank',sp:'hippo',x:2620,y:725,tags:['ground'],cap:1},
 {id:'hp_w',sp:'hippo',x:2730,y:940,tags:['water'],cap:2,st:['stand','play','sleep'],wl:62},
 {id:'fl1',sp:'flamingo',x:2930,y:860,tags:['water'],cap:3,wl:86},
 {id:'cr_w',sp:'crocodile',x:3130,y:962,tags:['water'],cap:1,st:['stand','play','sleep','eat'],wl:80},
 {id:'cr_bank',sp:'crocodile',x:3175,y:712,tags:['ground'],cap:2},
 {id:'tu_rock',sp:'turtle',x:3060,y:792,tags:['rockup'],cap:2},
 {id:'tu_gr',sp:'turtle',x:2590,y:985,tags:['ground'],cap:2},
 {id:'pa1',sp:'panda',x:3420,y:950,tags:['ground'],cap:3},
 {id:'pa2',sp:'panda',x:3540,y:720,tags:['ground'],cap:2},
 {id:'rp_tree',sp:'redpanda',x:3612,y:446,tags:['treeup'],cap:1},
 {id:'rp_gr',sp:'redpanda',x:3700,y:965,tags:['ground'],cap:2},
 {id:'ko_L',sp:'koala',x:3935,y:404,tags:['treeup'],cap:1,st:['stand','sleep','eat']},
 {id:'ko_R',sp:'koala',x:4160,y:494,tags:['treeup'],cap:1,st:['stand','sleep','eat']},
 {id:'ka_L',sp:'kangaroo',x:3880,y:860,tags:['L'],cap:2},
 {id:'ka_R',sp:'kangaroo',x:4220,y:870,tags:['R'],cap:2},
 {id:'bb_under',sp:'blackbear',x:4480,y:810,tags:['treedown'],cap:1},
 {id:'bb_gr',sp:'blackbear',x:4370,y:968,tags:['ground'],cap:1},
 {id:'de_under',sp:'deer',x:4650,y:812,tags:['treedown'],cap:2},
 {id:'de_gr',sp:'deer',x:4800,y:972,tags:['ground'],cap:3},
 {id:'pg_under',sp:'pangolin',x:4565,y:900,tags:['treedown'],cap:1},
 {id:'pg_gr',sp:'pangolin',x:4820,y:700,tags:['ground'],cap:1},
 {id:'pb_gr',sp:'polarbear',x:4990,y:705,tags:['ground'],cap:1},
 {id:'pb_w',sp:'polarbear',x:5085,y:925,tags:['water'],cap:1,st:['stand','play'],wl:60},
 {id:'pe_ice',sp:'penguin',x:5320,y:622,tags:['iceup'],cap:3},
 {id:'pe_w',sp:'penguin',x:5480,y:945,tags:['water'],cap:3,st:['stand','play'],wl:66},
 {id:'pe_gr',sp:'penguin',x:5250,y:975,tags:['ground'],cap:2}];
// 一群動物怎麼排：回傳每一隻的位置（世界座標）
function members(slot,n){const s=SIZE[slot.sp]*(slot.sc||(slot.y<760&&!slot.tags.includes('treeup')&&!slot.tags.includes('rockup')&&!slot.tags.includes('iceup')?.86:1));
 const gap=s*({monkey:.6,penguin:.62,turtle:.75,meerkat:.75}[slot.sp]||.6);const out=[];
 for(let i=0;i<n;i++){const o=(i-(n-1)/2)*gap;const dy=slot.tags.some(t=>/up|water/.test(t))?0:[0,10,-6][i%3];out.push({x:slot.x+o,y:slot.y+dy,size:s})}return out}
const center=m=>({x:m.x,y:m.y-m.size*.46});

/* ---------- 背景 ---------- */
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
function bg(){seed=7;const g='zbg';let s=`<defs>${gl(g+'sky','#9ED8FF','#E4F6FF')}${gl(g+'gr','#B6E39A','#86C46A')}${gl(g+'sv','#F2DE9A','#DCC070')}${gl(g+'wa','#8ED8F0','#4AAAD8')}${gl(g+'sn','#FFFFFF','#E2EEFA')}
 ${gl(g+'rk','#CFC6BC','#9A9088')}${gl(g+'ice','#F4FBFF','#B8DCF2')}${gl(g+'sd','#F0C89A','#DCA472')}${gl(g+'fo','#8ACB78','#5EA85A')}</defs>`;
 s+=`<rect width="${WW}" height="${WH}" fill="url(#${g}sky)"/>`;
 // 雲
 for(let x=120;x<WW;x+=420+rnd()*260){const y=60+rnd()*110,w=1+rnd()*.6;s+=`<g fill="#FFFFFF" opacity=".9"><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(70*w)}" ry="${f(22*w)}"/><circle cx="${f(x-22*w)}" cy="${f(y-12*w)}" r="${f(24*w)}"/><circle cx="${f(x+18*w)}" cy="${f(y-18*w)}" r="${f(30*w)}"/></g>`}
 // 遠方城市（沒有真實建築）
 for(let x=-20;x<WW;){const w=70+rnd()*80,h=90+rnd()*170,c=['#C6D2F2','#B6C4EC','#D2DAF6','#BFC8EE'][Math.floor(rnd()*4)];const y=HZ+14-h;
  s+=`<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="4" fill="${c}"/>`;
  for(let wy=y+14;wy<HZ-6;wy+=22)for(let wx=x+10;wx<x+w-14;wx+=18)if(rnd()>.25)s+=`<rect x="${f(wx)}" y="${f(wy)}" width="8" height="10" rx="1.6" fill="#EEF3FF" opacity=".75"/>`;
  if(rnd()>.8)s+=`<path d="M${f(x+w/2)} ${f(y)} V${f(y-30)}" stroke="${c}" stroke-width="4"/><circle cx="${f(x+w/2)}" cy="${f(y-32)}" r="5" fill="#FF9FB0"/>`;
  x+=w+6+rnd()*30}
 // 遠方樹
 for(let x=0;x<WW;x+=60+rnd()*40){const r=34+rnd()*24;s+=`<circle cx="${f(x)}" cy="${f(HZ+8)}" r="${f(r)}" fill="${rnd()>.5?'#93CF7E':'#80C06E'}"/>`}
 // 地面
 s+=`<rect y="${HZ}" width="${WW}" height="${WH-HZ}" fill="url(#${g}gr)"/>`;
 s+=`<path d="M640 ${HZ+20} Q700 ${HZ} 760 ${HZ} H2460 Q2540 ${HZ} 2560 ${HZ+40} L2560 ${WH} H600Z" fill="url(#${g}sv)"/>`;
 s+=`<path d="M3780 ${HZ+10} H4320 V${WH} H3760Z" fill="url(#${g}sd)" opacity=".85"/>`;
 s+=`<path d="M4300 ${HZ+10} H4900 V${WH} H4300Z" fill="url(#${g}fo)" opacity=".7"/>`;
 s+=`<path d="M4890 ${HZ+20} Q4900 ${HZ} 4930 ${HZ} H${WW} V${WH} H4880Z" fill="url(#${g}sn)"/>`;
 // 後面的木頭圍欄
 s+=`<path d="M0 ${HZ+36} H${WW} M0 ${HZ+52} H${WW}" stroke="#C89A6A" stroke-width="5"/>`;for(let x=10;x<WW;x+=46)s+=`<rect x="${x}" y="${HZ+24}" width="7" height="40" rx="2" fill="#B8865A"/>`;
 // 草地小花、草叢
 for(let i=0;i<120;i++){const x=rnd()*WW,y=HZ+90+rnd()*(WH-HZ-100);if(x>4900||(x>2520&&x<3260&&y>720))continue;s+=x>640&&x<2540?`<path d="M${f(x)} ${f(y)} q2 -8 -1 -12 M${f(x+4)} ${f(y)} q1 -8 4 -10" stroke="#C8A850" stroke-width="2" fill="none" stroke-linecap="round"/>`:`<circle cx="${f(x)}" cy="${f(y)}" r="3" fill="${['#FFFFFF','#FFD24D','#FF9FB8'][i%3]}"/><circle cx="${f(x)}" cy="${f(y)}" r="1.2" fill="#FFB84D"/>`}
 /* 猴子山：大樹（樹枝往右）＋大石頭（上面是平台） */
 s+=tree(100,960,330,1.05,'#7FC46A')+`<path d="M104 452 Q160 442 236 446" stroke="#8A5A32" stroke-width="16" fill="none" stroke-linecap="round"/><ellipse cx="236" cy="430" rx="26" ry="16" fill="#7FC46A"/>`;
 s+=`<path d="M70 452 Q60 560 74 640" stroke="#C8A070" stroke-width="5" fill="none"/><path d="M60 640 h30" stroke="#8A5A32" stroke-width="8" stroke-linecap="round"/>`;
 s+=rock(335,562,200,330,`url(#${g}rk)`);
 /* 草原：大樹（傘一樣的樹冠） */
 s+=`<path d="M1300 810 Q1290 600 1306 420 M1302 520 Q1250 450 1200 340 M1304 500 Q1360 430 1420 340" stroke="#8A5A32" stroke-width="22" fill="none" stroke-linecap="round"/>`
  +`<ellipse cx="1310" cy="320" rx="230" ry="56" fill="#6CB45A"/><ellipse cx="1290" cy="296" rx="190" ry="44" fill="#86C870"/><ellipse cx="1330" cy="282" rx="120" ry="28" fill="#9AD884"/>`;
 s+=`<ellipse cx="1310" cy="812" rx="130" ry="18" fill="#3A2A5A" opacity=".08"/>`;
 s+=rock(2165,604,170,290,`url(#${g}rk)`)+`<ellipse cx="2400" cy="560" rx="60" ry="40" fill="#C8B070" opacity=".5"/>`;
 s+=`<path d="M2470 ${HZ+80} q30 -50 70 -20 q20 -30 50 0" fill="#9AC870"/>`;
 /* 水池 */
 s+=`<ellipse cx="2890" cy="872" rx="384" ry="128" fill="#7BC0A0"/><ellipse cx="2890" cy="876" rx="370" ry="118" fill="url(#${g}wa)"/>`
  +[[2700,830,60],[2960,940,80],[3100,860,50],[2820,960,70]].map(([x,y,w])=>`<path d="M${x-w/2} ${y} q${w/4} -6 ${w/2} 0 q${w/4} 6 ${w/2} 0" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>`).join('')
  +[[2620,900],[3180,930],[2840,800]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="26" ry="9" fill="#5EB062"/><path d="M${x} ${y} l12 -6" stroke="#8ED8F0" stroke-width="3"/><circle cx="${x-8}" cy="${y-6}" r="5" fill="#FF9FC8"/>`).join('')
  +rock(3060,792,110,40,`url(#${g}rk)`)
  +[2520,2550,3250,3270].map((x,i)=>`<path d="M${x} 880 q-4 -60 ${i%2?6:-6} -90 M${x+10} 880 q2 -50 10 -70" stroke="#6AA84A" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="${x+(i%2?6:-6)}" cy="790" rx="5" ry="14" fill="#8A5A32"/>`).join('');
 /* 竹林＋小貓熊的樹（樹枝往左） */
 for(let x=3290;x<3790;x+=34+rnd()*30){const h=260+rnd()*140,t=HZ+80+rnd()*120;s+=`<g opacity="${(.75+rnd()*.25).toFixed(2)}"><rect x="${f(x)}" y="${f(t-h)}" width="10" height="${f(h)}" rx="4" fill="#7FC050"/>${[1,2,3,4].map(k=>`<rect x="${f(x-1)}" y="${f(t-h+k*h/5)}" width="12" height="4" rx="2" fill="#5E9A34"/>`).join('')}<path d="M${f(x+10)} ${f(t-h+30)} q30 -10 46 -30 q-30 4 -46 20Z M${f(x)} ${f(t-h+70)} q-30 -6 -44 -26 q28 4 44 16Z" fill="#6CC04A"/></g>`}
 s+=`<path d="M3690 780 Q3680 600 3694 380" stroke="#8A5A32" stroke-width="24" fill="none" stroke-linecap="round"/><path d="M3690 458 Q3640 452 3560 456" stroke="#8A5A32" stroke-width="15" fill="none" stroke-linecap="round"/>`
  +`<circle cx="3700" cy="330" r="80" fill="#6CB45A"/><circle cx="3640" cy="360" r="60" fill="#7FC46A"/><circle cx="3760" cy="350" r="56" fill="#7FC46A"/><circle cx="3560" cy="440" rx="30" r="26" fill="#7FC46A"/>`;
 /* 澳洲區：尤加利樹（左邊高樹枝、右邊低樹枝） */
 s+=`<path d="M4040 820 Q4030 600 4044 320" stroke="#E2D6C2" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M4040 820 Q4030 600 4044 320" stroke="#C8B89E" stroke-width="26" fill="none" stroke-dasharray="4 30" opacity=".6"/>`
  +`<path d="M4038 430 Q3990 410 3910 416" stroke="#D8CAB2" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M4046 520 Q4100 500 4190 506" stroke="#D8CAB2" stroke-width="15" fill="none" stroke-linecap="round"/>`
  +[[4044,280,90],[3960,330,60],[4130,330,64],[3890,400,30],[4200,480,30]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${f(r*.7)}" fill="#8CC0A0"/><ellipse cx="${x-r*.2}" cy="${y-r*.15}" rx="${f(r*.6)}" ry="${f(r*.35)}" fill="#A8D4B8"/>`).join('');
 s+=`<ellipse cx="4040" cy="822" rx="110" ry="14" fill="#3A2A5A" opacity=".08"/>`;
 /* 台灣森林：大樹 */
 s+=tree(4560,830,320,1.25,'#4E9A4E')+`<ellipse cx="4560" cy="832" rx="170" ry="18" fill="#3A2A5A" opacity=".1"/>`;
 for(let i=0;i<8;i++){const x=4320+i*75+rnd()*30,y=990;s+=`<path d="M${f(x)} ${y} q-14 -24 -30 -26 M${f(x)} ${y} q2 -30 -4 -40 M${f(x)} ${y} q14 -24 30 -26" stroke="#3E8A44" stroke-width="5" fill="none" stroke-linecap="round"/>`}
 /* 北極熊：雪地、小水池；企鵝：冰山平台、水池 */
 s+=`<path d="M4920 700 Q4960 560 5060 600 Q5120 520 5180 640 L5180 720 H4920Z" fill="url(#${g}ice)"/>`;
 s+=`<ellipse cx="5085" cy="925" rx="122" ry="72" fill="#A8D8F0"/><ellipse cx="5085" cy="928" rx="110" ry="64" fill="url(#${g}wa)"/>`;
 s+=`<rect x="5194" y="${HZ+10}" width="12" height="${WH-HZ}" fill="#D8E6F4"/>`;
 s+=`<path d="M5230 ${WH-80} L5236 640 Q5250 610 5280 618 L5410 618 Q5432 626 5426 660 L5440 ${WH-80}Z" fill="url(#${g}ice)" stroke="#9CC8E8" stroke-width="3"/><path d="M5250 640 l20 40 M5300 650 l-10 50 M5380 640 l18 60" stroke="#FFFFFF" stroke-width="4" opacity=".7" stroke-linecap="round"/>`;
 s+=`<ellipse cx="5480" cy="940" rx="118" ry="66" fill="#A8D8F0"/><ellipse cx="5480" cy="944" rx="106" ry="58" fill="url(#${g}wa)"/>`;
 /* 分區之間的小樹叢 */
 [660,2520,3260,3800,4300,4900].forEach(x=>{s+=`<g><ellipse cx="${x}" cy="${HZ+70}" rx="50" ry="34" fill="#6CB45A"/><ellipse cx="${x-30}" cy="${HZ+84}" rx="30" ry="22" fill="#86C870"/><ellipse cx="${x+34}" cy="${HZ+86}" rx="28" ry="20" fill="#7FC46A"/></g>`});
 /* 牌子（只有圖，沒有字）：入口「不開閃光燈」、猴子山「不餵動物」 */
 s+=sign(46,820,'flash')+sign(620,800,'feed');
 return s}
function tree(x,base,top,k,c){return `<path d="M${x} ${base} Q${x-8} ${f((base+top)/2)} ${x+4} ${top}" stroke="#8A5A32" stroke-width="${f(24*k)}" fill="none" stroke-linecap="round"/>`
 +`<circle cx="${x}" cy="${f(top-40*k)}" r="${f(96*k)}" fill="${c}"/><circle cx="${f(x-70*k)}" cy="${f(top+10*k)}" r="${f(64*k)}" fill="${c}"/><circle cx="${f(x+74*k)}" cy="${f(top+6*k)}" r="${f(66*k)}" fill="${c}"/>`
 +`<circle cx="${f(x-20*k)}" cy="${f(top-70*k)}" r="${f(52*k)}" fill="#FFFFFF" opacity=".12"/>`}
function rock(cx,top,w,h,fill){const l=cx-w/2,r=cx+w/2;return `<path d="M${l-30} ${top+h} Q${l-24} ${top+h*.5} ${l} ${top+8} Q${l+4} ${top} ${l+20} ${top} H${r-20} Q${r-4} ${top} ${r} ${top+8} Q${r+24} ${top+h*.5} ${r+30} ${top+h}Z" fill="${fill}"/>`
 +`<path d="M${l+10} ${top+6} H${r-10}" stroke="#E8E2DA" stroke-width="5" stroke-linecap="round" opacity=".8"/><path d="M${l+20} ${top+h*.45} q30 -10 60 4 M${r-40} ${top+h*.7} q20 -8 40 2" stroke="#8A8078" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>`}
// 圖示牌：紅色圓圈斜線（不開閃光燈／不餵動物／不拍玻璃）
function signIcon(k){const no=`<circle cx="0" cy="0" r="26" fill="none" stroke="#E84A4A" stroke-width="6"/><path d="M-18 -18 L18 18" stroke="#E84A4A" stroke-width="6" stroke-linecap="round"/>`;
 const ic=k==='flash'?`<rect x="-16" y="-8" width="32" height="20" rx="4" fill="#5A6A9A"/><circle cx="0" cy="2" r="6" fill="#BFE6FF" stroke="#fff" stroke-width="2"/><path d="M8 -18 L2 -8 H8 L3 2" stroke="#FFC83A" stroke-width="3.4" fill="none" stroke-linejoin="round"/>`
  :k==='feed'?`<path d="M-14 6 Q-14 -6 -4 -6 H10 Q14 -6 14 -2 Q14 2 10 2 H2" fill="#F6C8A0" stroke="#C88A60" stroke-width="2"/><circle cx="12" cy="-12" r="4" fill="#C8863A"/><circle cx="4" cy="-14" r="3.4" fill="#E8A04E"/>`
  :`<path d="M-10 -14 V8 Q-10 14 -4 14 H8 Q14 14 14 8 V-4" fill="#F6C8A0" stroke="#C88A60" stroke-width="2"/><path d="M-18 -18 V18" stroke="#9CC8E8" stroke-width="4"/><path d="M-24 -6 l-4 -2 M-24 2 l-5 0" stroke="#5A6A9A" stroke-width="2" stroke-linecap="round"/>`;
 return `<circle r="30" fill="#FFFFFF"/>${ic}${no}`}
function sign(x,y,k){return `<g class="z8sign" data-hot="${k}"><path d="M${x} ${y} V${y-110}" stroke="#8A5A32" stroke-width="8"/><g transform="translate(${x} ${y-140})"><circle r="36" fill="#F6E6C8" stroke="#B8865A" stroke-width="4"/>${signIcon(k)}</g></g>`}
// 前景：企鵝館的玻璃（有反光，上面貼「不拍玻璃」）
function front(){return `<g class="z8glass" data-hot="glass"><rect x="5206" y="790" width="${WW-5206}" height="${WH-790}" fill="#CFEFFF" opacity=".22"/><path d="M5206 790 H${WW}" stroke="#8AB8D8" stroke-width="8"/>${[5206,5400,5594].map(x=>`<rect x="${x-4}" y="786" width="8" height="${WH-786}" fill="#8AB8D8"/>`).join('')}
 <path d="M5240 990 L5300 820 M5262 990 L5318 830 M5430 990 L5490 820" stroke="#FFFFFF" stroke-width="8" opacity=".45" stroke-linecap="round"/><g transform="translate(5250 850) scale(.8)">${signIcon('glass')}</g></g>`}
const HOT=[{k:'flash',x:46,y:680,r:46},{k:'feed',x:620,y:660,r:46},{k:'glass',x0:5206,x1:WW,y0:790,y1:WH}];

/* ---------- 保育員（原創，綠色帽子、卡其色制服、提著一桶竹子） ---------- */
function keeper(){const g=uid('kp');return `<defs>${gl(g+'u','#D8C08A','#B89A62')}</defs>${sh(18)}
 <path d="M42 80 V92 M58 80 V92" stroke="#6A5A4A" stroke-width="7" stroke-linecap="round"/><ellipse cx="41" cy="93" rx="6" ry="2.6" fill="#5A3A2A"/><ellipse cx="59" cy="93" rx="6" ry="2.6" fill="#5A3A2A"/>
 <path d="M34 50 Q50 44 66 50 L68 82 H32Z" fill="url(#${g}u)"/><path d="M50 48 V82" stroke="#A88A52" stroke-width="1.4"/><rect x="38" y="58" width="8" height="6" rx="1.4" fill="#A88A52"/><circle cx="57" cy="60" r="3.4" fill="#6CB45A"/>
 <path d="M34 52 Q26 64 28 74 M66 52 Q72 62 74 70" stroke="url(#${g}u)" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="28" cy="76" r="3.6" fill="#F6CDA8"/><circle cx="74" cy="72" r="3.6" fill="#F6CDA8"/>
 <path d="M70 72 h14 l-2 18 h-10Z" fill="#7FA8D8"/><path d="M70 72 Q77 64 84 72" stroke="#5A6A9A" stroke-width="1.6" fill="none"/>${[73,77,81].map(x=>`<path d="M${x} 74 V56" stroke="#7FC050" stroke-width="3"/>`).join('')}
 <circle cx="50" cy="34" r="13" fill="#F6CDA8"/><path d="M37 32 Q38 18 50 18 Q62 18 63 32 Q56 26 50 27 Q44 26 37 32Z" fill="#5A3A2A"/><path d="M36 28 Q50 14 64 28 L68 30 H32Z" fill="#4E9A4E"/><rect x="34" y="27" width="32" height="4" rx="2" fill="#3E8A44"/>
 ${eyes(45,55,35,2.2)}${smile(50,40,3,'#8A4A3A')}${blush(41,39,2)}${blush(59,39,2)}`}
const KEEP={x:3272,y:985,size:150};

/* ---------- 小遊戲卡片圖示（64×64）：相機＋小貓熊 ---------- */
const icon=`<circle cx="32" cy="32" r="27" fill="#E2F4D8"/><g transform="translate(26 24) scale(.36)">${DRAW.redpanda('stand')}</g>
 <g transform="rotate(-10 22 40)"><rect x="6" y="30" width="30" height="20" rx="5" fill="#5A6AA8"/><rect x="12" y="26" width="10" height="6" rx="2" fill="#5A6AA8"/><circle cx="21" cy="40" r="7" fill="#BFE6FF" stroke="#fff" stroke-width="2.4"/><circle cx="23" cy="38" r="2" fill="#fff"/><circle cx="31" cy="34" r="1.6" fill="#FFD84D"/></g>`;

G.ZOO8={LIST,POSES,draw,svg,SIZE,RP:B2.RP,W:WW,H:WH,ZONES,SLOTS,members,center,bg,front,HOT,keeper,KEEP,icon,signIcon,ver:'2026-11-22'};
// 小小攝影師（m8_photo.js 排在這個檔前面）等 ZOO8 好了才開始
try{(G.__ZOO8ready||[]).forEach(f=>{try{f()}catch(e){console.log('zoo8 ready',e)}});G.__ZOO8ready=[]}catch(e){}
})(typeof window!=='undefined'?window:globalThis);

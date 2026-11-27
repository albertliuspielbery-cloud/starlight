/* ================= 2.3 遊樂園大禮物：F 的物品（m9zl_g23items.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 照 2.2 m9ze_g22items.js 的做法；資料在 m9zk_g23data.js。判斷有沒有用 G22.has(id)；看過新東西清 V2.g22.fresh[id] 再 save2()。
 * 1. 塗色本 4 張（200×200；r＝可以塗的區塊，後面的蓋在前面；deco43＝畫在線上面、不能塗）：消防車、黑熊警察、游泳池、腳踏車。
 *    一開始就放進 PICS（編號固定，塗過的顏色才對得上），沒拿到的由 patches/95 從列表拿掉（PICS 有 g22 欄位就會藏）。
 * 2. 房間玩具格：小警車玩具（點了嗚伊嗚伊、車頂燈閃、前後開一小段）；備用擺飾 彩色小風箏、黃色小鴨、月亮小夜燈。拿到才出現在「佈置房間」。
 * 3. 寵物小屋玩具：寵物游泳圈（寵物套上游泳圈，在小水盆裡上下漂；提醒「游泳圈是玩具，玩水要有大人陪」）。
 * 4. 彩虹腳踏車鈴：在腳踏車小路右下角一顆鈴，按了叮鈴；遇到走路的人會自己按（m8sg_bike8.js）。這裡放圖。
 * 5. 每樣都有 G22.ART[id]／G22.SIL[id]（64×64，每次讀都是新的字串、漸層 id 不重複）。
 * 動畫只用移動、旋轉、淡入、亮光；角色不放大縮小。新台詞 lines/g23.tsv（G23_），沒錄音時只出字幕。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined'||!window.G22)return;
const has=id=>{try{return !!G22.has(id)}catch(e){return false}};
const isFresh=id=>{try{return !!G22.st().fresh[id]}catch(e){return false}};
const seen=id=>{try{const g=G22.st();if(g.fresh&&g.fresh[id]){delete g.fresh[id];save2()}}catch(e){}};
const calm=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const N=v=>(+v).toFixed(1);
let UID=0;const uid=p=>'g23i'+p+(++UID).toString(36)+Math.random().toString(36).slice(2,4);
const sayQ=a=>{try{return Promise.resolve(say(a)).catch(()=>{})}catch(e){return Promise.resolve()}};
const sfx2=k=>{try{sfx(k)}catch(e){}};
const lg=(id,a,b,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rg=(id,a,b,cx=.4,cy=.35,r=.75)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const star=(cx,cy,R,k=.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+N(cx+r*Math.cos(a))+' '+N(cy+r*Math.sin(a))}return d+'Z'};
const spark=(x,y,r)=>`M${N(x)} ${N(y-r)} Q${N(x+r*.18)} ${N(y-r*.18)} ${N(x+r)} ${N(y)} Q${N(x+r*.18)} ${N(y+r*.18)} ${N(x)} ${N(y+r)} Q${N(x-r*.18)} ${N(y+r*.18)} ${N(x-r)} ${N(y)} Q${N(x-r*.18)} ${N(y-r*.18)} ${N(x)} ${N(y-r)}Z`;
const shadow=(cx=32,rx=22)=>`<ellipse cx="${cx}" cy="60.5" rx="${rx}" ry="2.6" fill="#3A2A5A" opacity=".16"/>`;
const T={c_new:n=>`塗色本多了${n}，快來塗顏色！`,car:'嗚伊嗚伊，小警車出動囉！',ring:'套上游泳圈，在水裡漂呀漂！',ring2:'游泳圈是玩具，玩水一定要有大人陪喔！',
 kite:'彩色小風箏，飛呀飛！',duck:'黃色小鴨，呱呱呱！',lamp:'月亮小夜燈亮亮的，晚安喔！'};

/* ======================================================================
 * 0. 禮物圖（64×64）
 * ====================================================================== */
// 塗色圖：一張貼了紙膠帶的畫紙（上面是小小的彩色圖）＋一枝蠟筆
const sheet=(u,mini)=>`<defs>${lg(u+'p','#FFFFFF','#F3ECFF')}${lg(u+'k','#FF9FC4','#FF5F9E',1,0)}<clipPath id="${u}c"><rect x="12" y="11" width="36" height="42" rx="3"/></clipPath></defs>${shadow(33,24)}
 <g transform="rotate(-6 30 32)"><rect x="9" y="8" width="42" height="49" rx="5" fill="url(#${u}p)"/><g clip-path="url(#${u}c)">${mini}</g>
  <rect x="22" y="4.6" width="16" height="7" rx="1.6" fill="#FFE27A" opacity=".9" transform="rotate(4 30 8)"/><path d="M13 13 Q12 30 14 52" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/></g>
 <g transform="rotate(38 50 46)"><rect x="44" y="30" width="9" height="26" rx="3" fill="url(#${u}k)"/><path d="M44 56 H53 L48.5 63Z" fill="#FFC9DC"/><path d="M47 60 L48.5 63 L50 60Z" fill="#E8679F"/><rect x="44" y="35" width="9" height="3" fill="#fff" opacity=".6"/></g>
 <g class="g22fx"><path d="${spark(55,10,3.6)}" fill="#FFE27A"/><path d="${spark(7,40,2.4)}" fill="#FFF3C4"/></g>`;
const ART23={
 col_firetruck:u=>sheet(u,`<rect x="10" y="10" width="40" height="46" fill="#E4F4FF"/><rect x="10" y="44" width="40" height="12" fill="#BDEB9A"/>
  <rect x="14" y="29" width="22" height="14" rx="2" fill="#FF5F5F"/><path d="M36 43 V31 Q36 29 38 29 H42 Q45 29 46 33 L47 37 V43Z" fill="#FF5F5F"/><path d="M38 31 H42 Q44 31 44.6 34 L45 36 H38Z" fill="#CFF0FF"/>
  <rect x="14" y="25" width="21" height="3" rx="1" fill="#C9D2E0"/><rect x="38" y="26.4" width="4" height="2.6" rx="1" fill="#7FB8FF"/>
  <circle cx="20" cy="44" r="4" fill="#5A4A7A"/><circle cx="41" cy="44" r="4" fill="#5A4A7A"/><circle cx="20" cy="44" r="1.6" fill="#E8ECF8"/><circle cx="41" cy="44" r="1.6" fill="#E8ECF8"/>
  <rect x="17" y="32" width="6" height="7" rx="1" fill="#FFD0D0"/><rect x="26" y="32" width="6" height="7" rx="1" fill="#FFD0D0"/><circle cx="46" cy="40" r="1.4" fill="#FFF3B0"/>`),
 col_bearcop:u=>sheet(u,`<rect x="10" y="10" width="40" height="46" fill="#E4F4FF"/><rect x="10" y="47" width="40" height="9" fill="#BDEB9A"/>
  <circle cx="22" cy="20" r="4" fill="#3E3A4E"/><circle cx="38" cy="20" r="4" fill="#3E3A4E"/><circle cx="30" cy="29" r="11" fill="#3E3A4E"/>
  <path d="M19 20 Q20 12 30 11.6 Q40 12 41 20Z" fill="#3A5AB8"/><rect x="17.6" y="19" width="24.8" height="3.4" rx="1.6" fill="#24409A"/><path d="${star(30,15.6,2.4)}" fill="#FFD24D"/>
  <ellipse cx="30" cy="32.6" rx="5.4" ry="4" fill="#E8D2B8"/><circle cx="30" cy="31.2" r="1.4" fill="#2A1E36"/><circle cx="25.4" cy="27" r="1.3" fill="#fff"/><circle cx="34.6" cy="27" r="1.3" fill="#fff"/>
  <path d="M19 56 V44 Q19 39 30 39 Q41 39 41 44 V56Z" fill="#4A6AD0"/><path d="M26 40 L30 45 L34 40" stroke="#fff" stroke-width="1.6" fill="none"/><path d="${star(36,47,2)}" fill="#FFD24D"/>`),
 col_pool:u=>sheet(u,`<rect x="10" y="10" width="40" height="46" fill="#FFF2DA"/><rect x="12" y="22" width="36" height="30" rx="4" fill="#7FD0FF"/><path d="M14 30 Q19 27 24 30 T34 30 T44 30" stroke="#fff" stroke-width="1.4" fill="none" opacity=".8"/>
  <circle cx="24" cy="38" r="7" fill="#FF8FB8"/><circle cx="24" cy="38" r="3.2" fill="#7FD0FF"/><path d="M17 38 A7 7 0 0 1 24 31 V34.8 A3.2 3.2 0 0 0 20.8 38Z" fill="#fff"/><path d="M31 38 A7 7 0 0 1 24 45 V41.2 A3.2 3.2 0 0 0 27.2 38Z" fill="#fff"/>
  <ellipse cx="38" cy="43" rx="4.6" ry="3" fill="#FFE27A"/><circle cx="40.6" cy="39.4" r="2.6" fill="#FFE27A"/><path d="M42.6 39.6 L45 40.2 L42.6 41Z" fill="#FF9A3C"/>
  <circle cx="44" cy="15" r="4" fill="#FFD24D"/><path d="M42 18 V24 M46 18 V24 M42 20.6 H46 M42 23 H46" stroke="#B9C4DC" stroke-width="1.2"/>`),
 col_bike:u=>sheet(u,`<rect x="10" y="10" width="40" height="46" fill="#E4F4FF"/><rect x="10" y="44" width="40" height="12" fill="#BDEB9A"/>
  <circle cx="19" cy="40" r="7" fill="none" stroke="#5A4A7A" stroke-width="2.4"/><circle cx="41" cy="40" r="7" fill="none" stroke="#5A4A7A" stroke-width="2.4"/>
  <path d="M19 40 L28 40 L24 31 L37 31 L41 40 M28 40 L37 31 M24 31 L23 28 M36 31 L35 27 Q37 26 39 27" stroke="#FF5F9E" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="20" y="26.6" width="6" height="2.2" rx="1.1" fill="#6A5A8A"/><path d="M38 23 H46 L45 29 H39Z" fill="#E8B07A"/><circle cx="40.6" cy="22" r="1.8" fill="#FF8FB8"/><circle cx="43.6" cy="21.4" r="1.8" fill="#FFE27A"/>`),
 rm_policecar:u=>`<defs>${lg(u+'b','#FFFFFF','#DCE8FF')}${lg(u+'d','#6F9CFF','#3E64D8')}${rg(u+'w','#FFFFFF','#BFE6FF')}</defs>${shadow(32,25)}
  <path d="M8 48 V38 Q8 33 13 32 L20 31 L26 22 Q28 20 31 20 H42 Q45 20 47 23 L52 31 L56 32 Q60 33 60 38 V48 Q60 51 57 51 H11 Q8 51 8 48Z" fill="url(#${u}b)"/>
  <path d="M8 41 H60 V46 H8Z" fill="url(#${u}d)"/><path d="M27 23 Q28 22 30 22 H35 V31 H22Z" fill="url(#${u}w)"/><path d="M37 22 H42 Q44 22 45 24 L49 31 H37Z" fill="url(#${u}w)"/>
  <rect x="29" y="14" width="5" height="6" rx="2" fill="#FF6F7F"/><rect x="34" y="14" width="5" height="6" rx="2" fill="#6F9CFF"/><rect x="28" y="19" width="12" height="2.4" rx="1" fill="#C9D2E0"/>
  <path d="${star(32.5,36.6,3.2)}" fill="#FFD24D"/><circle cx="57" cy="36" r="2.4" fill="#FFF3B0"/><rect x="7" y="35" width="3" height="3" rx="1" fill="#FF8F8F"/>
  ${[18,49].map(x=>`<circle cx="${x}" cy="51" r="7" fill="#4A3E66"/><circle cx="${x}" cy="51" r="3.4" fill="#E8ECF8"/><circle cx="${x-1}" cy="50" r="1" fill="#fff"/>`).join('')}
  <path d="M12 34 Q20 31.6 26 32" stroke="#fff" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"/><ellipse cx="31" cy="15" rx="1.4" ry=".9" fill="#fff" opacity=".8"/>
  <g class="g22fx"><path d="M24 12 L21 8 M44 12 L47 8 M34 10 V5" stroke="#FFD24D" stroke-width="1.8" stroke-linecap="round"/><path d="${spark(9,18,3)}" fill="#FFE27A"/></g>`,
 pt_ring:u=>`<defs>${lg(u+'r','#FFB3CF','#FF6F96')}${lg(u+'w','#BFEAFF','#7FCBFF')}</defs>${shadow(32,24)}
  <ellipse cx="32" cy="50" rx="27" ry="9" fill="url(#${u}w)" opacity=".85"/><path d="M10 50 Q16 47 22 50 M40 51 Q46 48 52 51" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8" stroke-linecap="round"/>
  <ellipse cx="32" cy="38" rx="23" ry="15" fill="url(#${u}r)"/><ellipse cx="32" cy="37" rx="11" ry="6.4" fill="#BFEAFF"/>
  ${[[-1,0],[1,0]].map(([s])=>`<path d="M${32+s*12.6} ${N(31.4)} Q${32+s*20} 33 ${32+s*22.4} 41 Q${32+s*18} 47 ${32+s*13} 48 Q${32+s*16} 41 ${32+s*12.6} 31.4Z" fill="#FFFFFF" opacity=".92"/>`).join('')}
  <path d="M20 29 Q26 25 34 25" stroke="#fff" stroke-width="2.6" fill="none" opacity=".7" stroke-linecap="round"/>
  <g fill="#FF6F96" transform="translate(32 47) scale(.42)"><ellipse cx="0" cy="3" rx="6" ry="4.6"/><ellipse cx="-6" cy="-4" rx="2.4" ry="3"/><ellipse cx="-2" cy="-7" rx="2.4" ry="3"/><ellipse cx="2" cy="-7" rx="2.4" ry="3"/><ellipse cx="6" cy="-4" rx="2.4" ry="3"/></g>
  <g class="g22fx"><circle cx="12" cy="20" r="2.4" fill="#BFEAFF"/><circle cx="52" cy="17" r="3" fill="#BFEAFF"/><circle cx="57" cy="25" r="1.8" fill="#BFEAFF"/><path d="${spark(10,10,3)}" fill="#FFE27A"/></g>`,
 bk_bell:u=>`<defs><linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FF8FA8"/><stop offset=".25" stop-color="#FFC46A"/><stop offset=".5" stop-color="#FFE27A"/><stop offset=".72" stop-color="#7FE0A8"/><stop offset="1" stop-color="#8FA8FF"/></linearGradient>${lg(u+'m','#E8ECF8','#AEB8D0')}</defs>${shadow(32,20)}
  <rect x="27" y="48" width="10" height="10" rx="3" fill="url(#${u}m)"/><rect x="14" y="55" width="36" height="5" rx="2.5" fill="#B99CFF"/>
  <path d="M12 46 Q12 22 32 21 Q52 22 52 46 Q52 49 48 49 H16 Q12 49 12 46Z" fill="url(#${u}r)"/>
  <path d="M15 44 H49" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/><ellipse cx="24" cy="30" rx="5" ry="3" fill="#fff" opacity=".55" transform="rotate(-30 24 30)"/>
  <circle cx="32" cy="19.6" r="3.4" fill="#FFD24D"/><path d="M50 40 L59 33" stroke="#AEB8D0" stroke-width="3.4" stroke-linecap="round"/><circle cx="59.6" cy="32.4" r="2.6" fill="#FF8FB8"/>
  <g class="g22fx"><path d="M6 20 Q3 26 6 32 M10 16 Q5 26 10 36" stroke="#FFD24D" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="${spark(52,11,3.6)}" fill="#FFE27A"/><path d="M42 9 V3 L47 4.6" stroke="#FF8FB8" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="41" cy="9.6" r="1.8" fill="#FF8FB8"/></g>`,
 sp_kite:u=>`<defs>${lg(u+'a','#FF9FC4','#FF6F96',1,1)}${lg(u+'b','#9FD8FF','#6FA8F0',1,1)}</defs>${shadow(32,14)}
  <path d="M30 4 L48 22 L30 42 L12 22Z" fill="url(#${u}b)"/><path d="M30 4 L48 22 L30 22Z M30 22 L12 22 L30 42Z" fill="url(#${u}a)"/><path d="M30 6 V40 M14 22 H46" stroke="#fff" stroke-width="1.2" opacity=".7"/>
  <path d="M30 42 Q24 48 30 52 Q36 56 30 61" stroke="#C8A06A" stroke-width="1.4" fill="none"/>${[[27,48,'#FFE27A'],[33,55,'#7FE0A8']].map(([x,y,c])=>`<path d="M${x-4} ${y-3} L${x} ${y} L${x-4} ${y+3}Z M${x+4} ${y-3} L${x} ${y} L${x+4} ${y+3}Z" fill="${c}"/>`).join('')}
  <circle cx="30" cy="20" r="2.4" fill="#3A2A5C"/><circle cx="30.8" cy="19.2" r=".8" fill="#fff"/><path d="M27 25 Q30 28 33 25" stroke="#3A2A5C" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <g class="g22fx"><path d="${spark(52,10,3.4)}" fill="#FFE27A"/><path d="M50 32 Q54 30 58 32" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`,
 sp_duck:u=>`<defs>${rg(u+'d','#FFF4B0','#FFD23A')}</defs>${shadow(32,22)}
  <path d="M10 42 Q8 32 18 32 Q26 34 34 34 Q50 32 54 42 Q54 56 32 57 Q12 56 10 42Z" fill="url(#${u}d)"/><path d="M44 36 Q54 30 54 40" fill="#FFD23A"/>
  <circle cx="24" cy="22" r="12" fill="url(#${u}d)"/><path d="M10 23 Q4 25 6 28 Q10 29 13 26Z" fill="#FF9A3C"/>
  <circle cx="20" cy="20" r="2" fill="#3A2A5C"/><circle cx="20.7" cy="19.3" r=".7" fill="#fff"/><ellipse cx="20" cy="26" rx="2.6" ry="1.6" fill="#FFB3C8" opacity=".8"/>
  <path d="M30 42 Q38 48 46 42" stroke="#F2B82A" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="27" cy="15" rx="3" ry="1.8" fill="#fff" opacity=".6"/>
  <g class="g22fx"><path d="${spark(52,14,3.4)}" fill="#FFE27A"/><path d="M40 14 Q44 10 48 14" stroke="#9FD8FF" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`,
 sp_lamp:u=>`<defs>${rg(u+'m','#FFF8D0','#FFD24D')}${lg(u+'b','#D2B4FF','#9A6CF0')}${rg(u+'g','#FFF3C4','#FFF3C4',.5,.5,.5)}</defs>${shadow(32,18)}
  <circle cx="32" cy="27" r="22" fill="#FFF3C4" opacity=".35"/><path d="M38 8 A20 20 0 1 0 50 42 A16 16 0 1 1 38 8Z" fill="url(#${u}m)"/>
  <circle cx="29" cy="31" r="1.8" fill="#C8962A"/><path d="M26 37 Q29 39.6 32 37" stroke="#C8962A" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="23" cy="34" rx="2.4" ry="1.4" fill="#FFB3C8" opacity=".8"/>
  <rect x="30" y="47" width="4" height="6" fill="#B99CFF"/><path d="M18 58 Q18 52 32 52 Q46 52 46 58Z" fill="url(#${u}b)"/><path d="M22 55 H42" stroke="#fff" stroke-width="1.4" opacity=".5" stroke-linecap="round"/>
  <g class="g22fx"><path d="${star(50,14,3.4)}" fill="#FFE27A"/><path d="${star(13,16,2.6)}" fill="#FFF3B0"/><path d="${star(54,30,2)}" fill="#FFE27A"/></g>`};
// 放進 G22.ART／SIL（getter：每次讀都是新的字串）
const artOf=id=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ART23[id](uid(id.slice(0,3)))}</svg>`;
function stripFx(s){let i,guard=0;while((i=s.indexOf('<g class="g22fx">'))>=0&&guard++<20){let d=0,j=-1;const re=/<g[\s>]|<\/g>/g;re.lastIndex=i;let m;while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0){j=m.index+4;break}}else d++}if(j<0){s=s.slice(0,i);break}s=s.slice(0,i)+s.slice(j)}return s}
const silOf=(id,c='#8C7CE6')=>{let s=artOf(id);s=s.replace(/<ellipse cx="[\d.]+" cy="60\.5"[^>]*\/>/g,'');s=stripFx(s);
 return s.replace(/<defs>[\s\S]*?<\/defs>/,'').replace(/clip-path="[^"]*"/g,'').replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="'+c+'"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'')};
try{if(G22.ART&&G22.SIL)Object.keys(ART23).forEach(id=>{
 if(!Object.getOwnPropertyDescriptor(G22.ART,id))Object.defineProperty(G22.ART,id,{enumerable:true,configurable:true,get:()=>artOf(id)});
 if(!Object.getOwnPropertyDescriptor(G22.SIL,id))Object.defineProperty(G22.SIL,id,{enumerable:true,configurable:true,get:()=>silOf(id)})})}catch(e){console.log('g23 art',e)}

/* ======================================================================
 * 1. 塗色本
 * ====================================================================== */
{const INK='#3A2A5C';const dl=(d,w=2.5)=>`<path d="${d}" stroke="${INK}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 const dot=(x,y,r=2.6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;const hi=(x,y,r=1.2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF"/>`;
 const C=(t,a)=>[t,a];
 const ringQ=(cx,cy,R,r,a0,a1)=>{const p=(rr,a)=>[N(cx+rr*Math.cos(a*Math.PI/180)),N(cy+rr*Math.sin(a*Math.PI/180))];const [x0,y0]=p(R,a0),[x1,y1]=p(R,a1),[x2,y2]=p(r,a1),[x3,y3]=p(r,a0);
  return `d="M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 0 0 ${x3} ${y3}Z"`};
 // 消防車：雲、太陽、梯子、車廂（三個門）、車頭、車窗、警示燈、車輪；車頂上坐著一隻斑點小狗
 const FIRETRUCK={n:'消防車',g22:'col_firetruck',cat47:'car',lv47:2,lw43:5,r:[
  C('rect','x="0" y="0" width="200" height="200"'),C('rect','x="0" y="160" width="200" height="40"'),
  C('circle','cx="170" cy="30" r="15"'),C('path','d="M18 44 Q18 30 32 32 Q38 20 52 26 Q66 24 64 40 Q66 50 54 50 H26 Q16 50 18 44Z"'),
  C('rect','x="18" y="94" width="124" height="54" rx="8"'),
  C('rect','x="28" y="104" width="32" height="30" rx="5"'),C('rect','x="66" y="104" width="32" height="30" rx="5"'),C('rect','x="104" y="104" width="30" height="30" rx="5"'),
  C('path','d="M140 148 V102 Q140 94 148 94 H166 Q178 94 182 106 L190 124 V148Z"'),C('path','d="M148 102 H164 Q171 102 174 110 L178 122 H148Z"'),
  C('path','d="M150 94 V84 Q150 78 156 78 H164 Q170 78 170 84 V94Z"'),C('rect','x="184" y="134" width="12" height="14" rx="4"'),C('circle','cx="184" cy="132" r="7"'),
  C('rect','x="22" y="80" width="112" height="14" rx="4"'),
  C('path','d="M86 74 Q76 68 79 60 Q84 64 90 70Z"'),C('path','d="M84 80 Q82 62 95 58 Q106 56 109 66 L112 80Z"'),C('circle','cx="109" cy="49" r="11"'),C('ellipse','cx="119" cy="52" rx="6.4" ry="5.4"'),C('path','d="M101 42 Q93 44 94 56 Q100 56 103 49Z"'),
  C('circle','cx="52" cy="152" r="18"'),C('circle','cx="158" cy="152" r="18"'),C('circle','cx="52" cy="152" r="7"'),C('circle','cx="158" cy="152" r="7"')],
  deco43:dl('M36 80 V94 M50 80 V94 M64 80 V94 M78 80 V94 M92 80 V94 M106 80 V94 M120 80 V94',2)+dl('M54 119 H56 M92 119 H94 M128 119 H130',3)
   +dl('M160 104 Q164 104 166 108',1.8)+dot(111,46,2.4)+hi(112,45)+dot(124,50.6,2.2)+dl('M117 56 Q120 58.4 123 56.4',1.6)+dot(94,67,2.4)+dot(102,73,2)+dot(90,75,1.8)+dl('M158 84 V90 M162 84 V90',1.6)+dl('M150 132 H170',2)};
 // 黑熊警察：派出所小房子、黑熊（帽子、胸口白色 V、制服、皮帶、揮手）
 const BEARCOP={n:'黑熊警察',g22:'col_bearcop',cat47:'helper',lv47:2,lw43:5,r:[
  C('rect','x="0" y="0" width="200" height="200"'),C('rect','x="0" y="170" width="200" height="30"'),C('circle','cx="178" cy="24" r="13"'),
  C('rect','x="12" y="74" width="66" height="96"'),C('path','d="M4 78 L45 46 L86 78Z"'),C('circle','cx="45" cy="38" r="8"'),
  C('rect','x="34" y="120" width="24" height="50" rx="3"'),C('rect','x="20" y="88" width="20" height="18" rx="2"'),C('rect','x="52" y="88" width="20" height="18" rx="2"'),
  C('ellipse','cx="120" cy="178" rx="14" ry="7"'),C('ellipse','cx="150" cy="178" rx="14" ry="7"'),
  C('path','d="M106 176 V124 Q106 104 135 104 Q164 104 164 124 V176Z"'),C('rect','x="106" y="150" width="58" height="9"'),
  C('path','d="M118 106 L135 128 L152 106 L145 106 L135 118 L125 106Z"'),
  C('path','d="M108 114 Q94 132 96 150 L108 150 Q108 134 116 124Z"'),C('path','d="M160 116 Q178 100 180 78 L192 82 Q192 108 166 128Z"'),C('circle','cx="186" cy="72" r="10"'),
  C('circle','cx="114" cy="56" r="10"'),C('circle','cx="156" cy="56" r="10"'),C('circle','cx="135" cy="78" r="27"'),C('ellipse','cx="135" cy="90" rx="13" ry="10"'),
  C('path','d="M106 64 Q108 42 135 40 Q162 42 164 64Z"'),C('path','d="M102 64 H168 Q171 72 163 72 H107 Q99 72 102 64Z"'),C('path',`d="${star(135,52,7)}"`),C('path',`d="${star(150,132,7)}"`)],
  deco43:dot(124,78,3.2)+hi(125.2,76.8)+dot(146,78,3.2)+hi(147.2,76.8)+`<ellipse cx="135" cy="86" rx="4.4" ry="3.2" fill="${INK}"/>`+dl('M129 94 Q135 99 141 94',2)
   +dl('M30 88 V106 M20 97 H40 M62 88 V106 M52 97 H72',2)+dot(52,146,2.2)+dl('M128 106 V150',1.6)+dl('M182 66 V62 M187 65 V60 M192 67 V63',1.6)};
 // 游泳池：大陽傘、池子、波浪、游泳圈（四段可以交錯塗）、小鴨、扶梯、太陽
 const RQ=[0,90,180,270].map(a=>C('path',ringQ(72,122,24,11,a,a+90)));
 const POOL={n:'游泳池',g22:'col_pool',cat47:'nature',lv47:2,lw43:5,r:[
  C('rect','x="0" y="0" width="200" height="200"'),C('rect','x="0" y="62" width="200" height="138"'),C('circle','cx="172" cy="26" r="15"'),
  C('path','d="M14 50 Q30 14 64 18 Q92 22 98 50 Q84 42 72 50 Q58 40 44 50 Q30 42 14 50Z"'),C('rect','x="53" y="40" width="5" height="24"'),
  C('rect','x="14" y="80" width="172" height="104" rx="12"'),C('rect','x="22" y="88" width="156" height="88" rx="8"'),
  C('path','d="M22 112 Q40 104 58 112 T94 112 T130 112 T166 112 T178 112 V120 Q160 112 142 120 T106 120 T70 120 T34 120 T22 120Z"'),
  ...RQ,
  C('ellipse','cx="140" cy="152" rx="20" ry="12"'),C('circle','cx="152" cy="134" r="11"'),C('path','d="M162 132 L174 136 L162 140Z"'),C('path','d="M126 146 Q118 138 124 134 Q130 140 132 146Z"'),
  C('rect','x="154" y="64" width="7" height="40" rx="3"'),C('rect','x="174" y="64" width="7" height="40" rx="3"')],
  deco43:dl('M154 74 H181 M154 86 H181 M154 98 H181',2.4)+dot(155,131,2.6)+hi(156,130)+dl('M136 150 Q142 156 150 152',2)+dl('M40 140 Q46 136 52 140 M100 166 Q106 162 112 166 M150 100 Q156 96 162 100',2)
   +dl('M14 50 L56 20 M98 50 L56 20 M44 50 L56 20 M72 50 L56 20',1.6)+dl('M166 10 L163 4 M180 12 L184 6 M188 26 H194',2)};
 // 腳踏車：大樹、兩個輪子（輪框＋裡面）、車架、座墊、把手、前面的籃子（三朵花）、掛在把手上的安全帽、鈴鐺
 const BIKE={n:'腳踏車',g22:'col_bike',cat47:'car',lv47:2,lw43:5,r:[
  C('rect','x="0" y="0" width="200" height="200"'),C('rect','x="0" y="170" width="200" height="30"'),C('circle','cx="26" cy="28" r="14"'),
  C('rect','x="168" y="90" width="12" height="80" rx="3"'),C('circle','cx="174" cy="70" r="26"'),
  C('path','d="M10 140 A34 34 0 1 0 78 140 A34 34 0 1 0 10 140Z M22 140 A22 22 0 1 0 66 140 A22 22 0 1 0 22 140Z" fill-rule="evenodd"'),C('circle','cx="44" cy="140" r="22"'),
  C('path','d="M110 140 A34 34 0 1 0 178 140 A34 34 0 1 0 110 140Z M122 140 A22 22 0 1 0 166 140 A22 22 0 1 0 122 140Z" fill-rule="evenodd"'),C('circle','cx="144" cy="140" r="22"'),
  C('path','d="M44 140 L66 96 L74 96 L56 140Z"'),C('path','d="M66 96 L126 92 L96 142 L84 142 L116 102 L72 104Z"'),C('path','d="M90 146 L44 146 L44 136 L92 136Z"'),
  C('path','d="M122 84 L146 140 L138 142 L114 86Z"'),C('path','d="M56 84 Q56 76 70 76 Q84 76 84 84 Q84 90 70 90 Q56 90 56 84Z"'),C('rect','x="66" y="88" width="6" height="10"'),
  C('path','d="M110 74 Q118 70 126 76 L136 70 Q142 68 144 72 L128 84 Q118 82 112 82Z"'),
  C('path','d="M140 74 H180 L174 104 H146Z"'),C('circle','cx="150" cy="66" r="9"'),C('circle','cx="164" cy="62" r="9"'),C('circle','cx="177" cy="68" r="8"'),
  C('path','d="M96 92 Q96 70 116 70 Q120 70 122 74 L114 92Z"'),C('circle','cx="130" cy="78" r="6"'),C('circle','cx="92" cy="140" r="8"')],
  deco43:dl('M44 118 V162 M22 140 H66 M28 124 L60 156 M28 156 L60 124',1.6)+dl('M144 118 V162 M122 140 H166 M128 124 L160 156 M128 156 L160 124',1.6)
   +dl('M146 80 H178 M148 88 H176 M150 96 H174',1.6)+dot(150,66,2)+dot(164,62,2)+dot(177,68,2)+dl('M100 86 Q104 78 112 76',1.8)+dl('M86 140 L80 152 M98 140 L104 128',2.4)+dl('M168 70 Q174 64 180 70',1.6)};
 [FIRETRUCK,BEARCOP,POOL,BIKE].forEach(P=>{try{if(typeof PICS!=='undefined'&&!PICS.some(x=>x.g22===P.g22))PICS.push(P)}catch(e){console.log('g23 pic',e)}});
 const CNAME={col_firetruck:'消防車',col_bearcop:'黑熊警察',col_pool:'游泳池',col_bike:'腳踏車'};const CK=Object.keys(CNAME);
 let cNew={},cT=0;
 const _cs=SCREENS.coloring;SCREENS.coloring=function(){const fr=CK.filter(k=>has(k)&&isFresh(k));
  if(fr.length){try{const P=PICS.find(x=>x.g22===fr[fr.length-1]);if(P&&P.cat47)V2.c47cat=P.cat47}catch(e){}fr.forEach(k=>{cNew[k]=Date.now()+8000;seen(k)})}
  const r=_cs.apply(this,arguments);
  try{CK.forEach(k=>{const i=PICS.findIndex(x=>x.g22===k);document.querySelectorAll(`.ccard[data-i="${i}"]`).forEach(b=>{if(cNew[k]>Date.now())b.classList.add('g22newc')})})}catch(e){}
  try{if(fr.length){fr.forEach(k=>{const i=PICS.findIndex(x=>x.g22===k);const b=document.querySelector(`.ccard[data-i="${i}"]`);if(b)try{b.scrollIntoView({block:'nearest'})}catch(_){}});
    const tk=++cT;setTimeout(()=>{if(S.screen!=='coloring'||tk!==cT)return;sayQ(fr.map(k=>T.c_new(CNAME[k])))},1400)}}catch(e){console.log('g23 coloring',e)}return r}
 window.__g23pics={FIRETRUCK,BEARCOP,POOL,BIKE}}

/* ======================================================================
 * 2. 房間玩具格：小警車、彩色小風箏、黃色小鴨、月亮小夜燈
 * ====================================================================== */
const ROOM23=[['toy','rm_policecar','小警車玩具'],['toy','sp_kite','彩色小風箏'],['toy','sp_duck','黃色小鴨'],['toy','sp_lamp','月亮小夜燈']];
function rmSync(){try{if(!S.roomOwned||typeof ROOMITEMS==='undefined')return;let got=[];ROOM23.forEach(([s,v,n])=>{if(!has(v)||!ROOMITEMS[s])return;
  if(!ROOMITEMS[s].some(x=>x[0]===v))ROOMITEMS[s].push([v,n,999]);const k=s+':'+v;if(!S.roomOwned.includes(k)){S.roomOwned.push(k);got.push(n)}});
 if(got.length){try{const K=RNK();V2[K]=(V2[K]||[]).concat(got)}catch(e){}save2();saveP()}}catch(e){console.log('g23 rmSync',e)}}
rmSync();
try{Object.assign(RMSAY,{rm_policecar:[T.car],sp_kite:[T.kite],sp_duck:[T.duck],sp_lamp:[T.lamp]})}catch(e){}
const RTOY={
 rm_policecar:()=>{const u=uid('pc');return `<svg viewBox="0 0 100 64" class="g23car" aria-hidden="true"><defs>${lg(u+'b','#FFFFFF','#DCE8FF')}${lg(u+'d','#6F9CFF','#3E64D8')}${rg(u+'w','#FFFFFF','#BFE6FF')}</defs>
  <ellipse cx="50" cy="60" rx="44" ry="3.4" fill="#3A2A5A" opacity=".18"/><g class="g23drive">
  <path d="M8 48 V36 Q8 30 14 29 L28 28 L38 16 Q41 13 45 13 H62 Q66 13 69 17 L78 28 L88 29 Q94 30 94 36 V48 Q94 52 90 52 H12 Q8 52 8 48Z" fill="url(#${u}b)"/>
  <path d="M8 40 H94 V46 H8Z" fill="url(#${u}d)"/><path d="M40 17 Q42 15.6 45 15.6 H52 V28 H31Z" fill="url(#${u}w)"/><path d="M55 15.6 H62 Q65 15.6 67 18 L74 28 H55Z" fill="url(#${u}w)"/>
  <rect x="42" y="5" width="8" height="9" rx="3" class="g23lr" fill="#FF6F7F"/><rect x="50" y="5" width="8" height="9" rx="3" class="g23lb" fill="#6F9CFF"/><rect x="40" y="12" width="20" height="3" rx="1.5" fill="#C9D2E0"/>
  <path d="${star(50,34,4.6)}" fill="#FFD24D"/><circle cx="90" cy="34" r="3.4" fill="#FFF3B0"/><rect x="6" y="33" width="4" height="4" rx="1.4" fill="#FF8F8F"/>
  ${[24,76].map(x=>`<circle cx="${x}" cy="52" r="9" fill="#4A3E66"/><circle cx="${x}" cy="52" r="4.4" fill="#E8ECF8"/>`).join('')}
  <path d="M14 32 Q24 29 32 29.6" stroke="#fff" stroke-width="2.4" fill="none" opacity=".8" stroke-linecap="round"/></g></svg>`},
 sp_kite:()=>{const u=uid('kt');return `<svg viewBox="0 0 70 130" class="g23kite" aria-hidden="true"><defs>${lg(u+'a','#FF9FC4','#FF6F96',1,1)}${lg(u+'b','#9FD8FF','#6FA8F0',1,1)}</defs>
  <ellipse cx="35" cy="126" rx="18" ry="3" fill="#3A2A5A" opacity=".16"/><rect x="33" y="70" width="4" height="54" rx="2" fill="#C8A06A"/><path d="M24 124 Q35 118 46 124Z" fill="#B99CFF"/>
  <g class="g23ksw"><path d="M35 4 L58 30 L35 58 L12 30Z" fill="url(#${u}b)"/><path d="M35 4 L58 30 L35 30Z M35 30 L12 30 L35 58Z" fill="url(#${u}a)"/>
  <circle cx="35" cy="27" r="3" fill="#3A2A5C"/><circle cx="36" cy="26" r="1" fill="#fff"/><path d="M31 34 Q35 38 39 34" stroke="#3A2A5C" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M35 58 Q28 66 35 72" stroke="#C8A06A" stroke-width="1.4" fill="none"/><path d="M30 63 L34 66 L30 69Z M38 63 L34 66 L38 69Z" fill="#FFE27A"/></g></svg>`},
 sp_duck:()=>{const u=uid('dk');return `<svg viewBox="0 0 80 70" class="g23duck" aria-hidden="true"><defs>${rg(u+'d','#FFF4B0','#FFD23A')}</defs><ellipse cx="40" cy="66" rx="30" ry="3" fill="#3A2A5A" opacity=".16"/>
  <g class="g23dk"><path d="M12 48 Q10 36 22 36 Q32 38 42 38 Q62 36 66 48 Q66 64 40 64 Q14 64 12 48Z" fill="url(#${u}d)"/><circle cx="30" cy="24" r="14" fill="url(#${u}d)"/><path d="M14 25 Q6 27 8 31 Q13 32 17 28Z" fill="#FF9A3C"/>
  <circle cx="25" cy="22" r="2.4" fill="#3A2A5C"/><circle cx="25.8" cy="21.2" r=".8" fill="#fff"/><ellipse cx="25" cy="29" rx="3" ry="1.8" fill="#FFB3C8" opacity=".8"/><path d="M36 48 Q46 55 56 48" stroke="#F2B82A" stroke-width="2.2" fill="none" stroke-linecap="round"/></g></svg>`},
 sp_lamp:()=>{const u=uid('lm');return `<svg viewBox="0 0 70 90" class="g23lamp" aria-hidden="true"><defs>${rg(u+'m','#FFF8D0','#FFD24D')}${lg(u+'b','#D2B4FF','#9A6CF0')}</defs><ellipse cx="35" cy="86" rx="22" ry="3" fill="#3A2A5A" opacity=".16"/>
  <circle cx="35" cy="34" r="30" fill="#FFF3C4" class="g23glow" opacity=".3"/><path d="M42 8 A26 26 0 1 0 58 52 A21 21 0 1 1 42 8Z" fill="url(#${u}m)"/>
  <circle cx="31" cy="38" r="2.2" fill="#C8962A"/><path d="M27 45 Q31 48 35 45" stroke="#C8962A" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="33" y="60" width="4" height="12" fill="#B99CFF"/><path d="M18 84 Q18 72 35 72 Q52 72 52 84Z" fill="url(#${u}b)"/>
  <path d="${star(56,14,4)}" fill="#FFE27A" class="g23tw"/><path d="${star(12,20,3)}" fill="#FFF3B0" class="g23tw"/></svg>`}};
// 房間玩具的圖：主程式最裡面的 roomSVG 遇到不認得的玩具會畫 castle('')（城堡）。「佈置房間」的縮圖和預覽是直接叫最裡面那一層，
// 包在外面的 roomSVG 管不到，所以改包 castle：roomSVG 那一處是唯一一個 castle('') 的呼叫，那時 S.room.toy 是我們的玩具就換成玩具圖。
// （房間本身、縮圖、預覽、「房間有新東西」小卡都會對；不再包 roomSVG，免得預覽時被「已經放著的玩具」蓋掉）
// 2.2 的玩具（m9ze：長頸鹿身高尺、雲朵抱枕、星星吊飾、愛心小盆栽）圖從 window.__g22i.RTOYART 先留一份。
// 更早各季的玩具（第四季以後加的，像 ROOMTOY4、A5／A6 的獎品）是各自包 roomSVG 換 R.toy，「佈置房間」的縮圖只叫最裡面那層，所以也是城堡：
// 這些用「整條 roomSVG 再畫一次，只看玩具」拿圖（anyToyArt）：暫時把 S.room.toy 設成那一樣、S.screen 換掉（預覽那層就不套），畫完全部放回去。
const G22T=(()=>{try{const R=window.__g22i&&__g22i.RTOYART;return R?Object.assign({},R):{}}catch(e){return {}}})();
const toyArt=ty=>{try{if(RTOY[ty])return RTOY[ty]();if(G22T[ty])return G22T[ty]()}catch(e){console.log('g23 toyArt',e)}return null};
let NEST=0,RS_IN=null;const REC={on:0,toy:undefined};
const _castle=castle;
function anyToyArt(v){const t=toyArt(v);if(t)return t;if(!v)return null;
 try{if(v==='bear')return art('🧸');if(v==='balloon')return art('🎈');if(v==='castle')return _castle('')}catch(e){return null}
 if(NEST||!RS_IN)return null;NEST++;const had=Object.prototype.hasOwnProperty.call(S.room,'toy'),old=S.room.toy,scr=S.screen;
 try{S.room.toy=v;S.screen='__g23toy';const R=RS_IN();return R&&R.toy||null}catch(e){console.log('g23 anyToy',e);return null}
 finally{if(had)S.room.toy=old;else delete S.room.toy;S.screen=scr;NEST--}}
// 最裡面那層畫玩具時：不認得的玩具（castle('')）換成正確的圖；順便記下「這一次真正要畫的是哪一樣」（預覽時就是預覽那一樣）
try{castle=function(a,door){try{if(arguments.length===1&&a===''){const ty=S.room&&S.room.toy;if(REC.on&&!NEST&&REC.toy===undefined)REC.toy=ty||'';const t=ty?anyToyArt(ty):null;if(t)return t}}catch(e){}return _castle.apply(this,arguments)}}catch(e){console.log('g23 castle',e)}
try{const _art=art;art=function(e){try{if((e==='🧸'||e==='🎈')&&REC.on&&!NEST&&REC.toy===undefined)REC.toy=S.room&&S.room.toy||''}catch(_){}return _art.apply(this,arguments)}}catch(e){console.log('g23 art',e)}
// 外面那些包 roomSVG 的（m9ze 和更早各季的）都用「已經擺著的玩具」換 R.toy，預覽別的玩具時就被蓋掉：
// 畫完如果「這一次真正要畫的」跟擺著的不一樣（＝在預覽），玩具圖改用預覽那一樣。m9ze 那張表畫的時候先收起來、畫完放回去。
{const _rs=roomSVG;RS_IN=()=>_rs();roomSVG=function(){const R0=window.__g22i&&__g22i.RTOYART;const hid={};
  try{if(R0)Object.keys(G22T).forEach(k=>{if(R0[k]){hid[k]=R0[k];delete R0[k]}})}catch(e){}
  const outer=!REC.on&&!NEST;if(outer){REC.on=1;REC.toy=undefined}
  let R;try{R=_rs.apply(this,arguments)}finally{try{Object.keys(hid).forEach(k=>{R0[k]=hid[k]})}catch(e){}if(outer)REC.on=0}
  try{if(outer&&R&&REC.toy!==undefined){const saved=roomGet('toy');const want=REC.toy||saved;if(want!==saved){const t=anyToyArt(want);if(t)R.toy=t}}}catch(e){console.log('g23 preview toy',e)}
  return R}}
{const _rm=SCREENS.room;SCREENS.room=function(){rmSync();const r=_rm.apply(this,arguments);
  try{const fr=ROOM23.map(x=>x[1]).filter(isFresh);if(fr.length)setTimeout(()=>{if(S.screen==='room')fr.forEach(seen)},1800)}catch(e){}return r}}
function bub(host,txt,l,t){try{host.querySelectorAll('.g22bub,.g23bub').forEach(e=>e.remove());const d=document.createElement('div');d.className='g22bub g23bub';d.textContent=txt;d.style.left=Math.max(14,Math.min(86,l))+'%';d.style.top=Math.max(2,t)+'%';host.appendChild(d);setTimeout(()=>d.remove(),3200)}catch(e){}}
function siren(){try{for(let i=0;i<4;i++){tone(880,i*.5,.24,'triangle',.06);tone(660,i*.5+.25,.24,'triangle',.06)}}catch(e){}}
function room23(){const sc=document.querySelector('.rscene2');if(!sc||sc.dataset.g23)return;sc.dataset.g23='1';const toy=sc.querySelector('.rtoy');if(!toy)return;
 const ty=(()=>{try{return roomGet('toy')}catch(e){return ''}})();if(!RTOY[ty])return;
 toy.classList.toggle('g22tall',ty==='sp_kite'||ty==='sp_lamp');
 const busy=()=>{try{return Date.now()<RM.busy}catch(e){return false}},lock=ms=>{try{RM.busy=Date.now()+ms}catch(e){}};
 const box=()=>{const R=sc.getBoundingClientRect(),b=toy.getBoundingClientRect();return {l:(b.left-R.left)/R.width*100,t:(b.top-R.top)/R.height*100,w:b.width/R.width*100}};
 const play=cls=>{toy.classList.remove(cls);void toy.offsetWidth;toy.classList.add(cls);setTimeout(()=>toy.classList.remove(cls),calm()?600:2600)};
 const FX={rm_policecar(){lock(2800);play('g23siren');siren();const b=box();const t=T.car;bub(sc,t,b.l+b.w/2,b.t-14);sayQ([t])},
  sp_kite(){lock(2400);play('g23fly');sfx2('whoosh');const b=box();bub(sc,T.kite,b.l+b.w/2,b.t-12);sayQ([T.kite])},
  sp_duck(){lock(2200);play('g23quack');try{tone(520,0,.12,'square',.05);tone(470,.18,.14,'square',.05)}catch(e){}const b=box();bub(sc,T.duck,b.l+b.w/2,b.t-14);sayQ([T.duck])},
  sp_lamp(){lock(2400);play('g23shine');sfx2('hint');const b=box();bub(sc,T.lamp,b.l+b.w/2,b.t-12);sayQ([T.lamp])}};
 if(toy.onclick&&FX[ty]){const o=toy.onclick;toy.onclick=function(e){try{if(RM.gemAt==='toy')return o.call(toy,e)}catch(_){}if(busy())return;try{FX[ty]()}catch(err){console.log('g23 toy',err)}}}
 else if(FX[ty])toy.addEventListener('click',()=>{if(!busy())FX[ty]()})}
try{const _re=rmEnhance;rmEnhance=function(){const r=_re.apply(this,arguments);try{room23()}catch(e){console.log('g23 room',e)}return r}}catch(e){console.log('g23 rmEnhance',e)}
window.__g23room={FX:Object.keys(RTOY)};

/* ======================================================================
 * 3. 寵物小屋：寵物游泳圈
 * ====================================================================== */
const RING_ID='pt_ring';
const ringLine=T.ring;
function ptSync(){try{if(!has(RING_ID)||typeof PTOYS==='undefined')return;if(!PTOYS.some(t=>t[0]===RING_ID))PTOYS.push([RING_ID,'寵物游泳圈',0,ringLine]);if(!PTART[RING_ID])Object.defineProperty(PTART,RING_ID,{enumerable:true,configurable:true,get:()=>artOf(RING_ID)})}catch(e){console.log('g23 ptSync',e)}}
ptSync();
{const _ph=SCREENS.pethouse;SCREENS.pethouse=function(){ptSync();const r=_ph.apply(this,arguments);try{if(isFresh(RING_ID))setTimeout(()=>{if(S.screen==='pethouse')seen(RING_ID)},1600)}catch(e){}return r}}
try{const _pn=ptPanel;ptPanel=function(kind){const r=_pn.apply(this,arguments);try{if(kind==='toy'&&has(RING_ID)){const own=G22.st().own||{};const v=own[RING_ID];const t=typeof v==='number'?v:Date.parse(v);
  if(!isFinite(t)||Date.now()-t<3*864e5){const b=document.querySelector(`.ptitem[data-k="${RING_ID}"]`);if(b){b.classList.add('g22pnew');setTimeout(()=>{try{b.scrollIntoView({block:'nearest'})}catch(e){}},350)}}}}catch(e){}return r}}catch(e){}
try{const _pp=ptPlay;ptPlay=function(id,line){try{if(id===RING_ID)return ptRing(line)}catch(e){console.log('g23 ptPlay',e)}return _pp.apply(this,arguments)}}catch(e){}
function ptRing(line){const pb=$('#pbig'),fx=$('#pfx'),sc=$('#pscene');if(!pb||!fx||!sc)return;ptBusy(true);const c=calm();
 const R=sc.getBoundingClientRect(),P=pb.getBoundingClientRect();const l=(P.left-R.left+P.width/2)/R.width*100,w=P.width/R.width*100;
 const pool=document.createElement('div');pool.className='g23pool';pool.style.cssText=`left:${N(l-w*.75)}%;width:${N(w*1.5)}%;bottom:${N((R.bottom-P.bottom)/R.height*100-2)}%`;pool.innerHTML=`<svg viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="100" cy="28" rx="98" ry="20" fill="#7FCBFF"/><ellipse cx="100" cy="24" rx="90" ry="15" fill="#BFEAFF"/><path d="M30 24 Q45 18 60 24 M120 26 Q135 20 150 26" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/></svg>`;fx.appendChild(pool);
 const ring=document.createElement('div');ring.className='g23ring';ring.innerHTML=artOf(RING_ID);ring.style.cssText=`left:${N(l-w*.42)}%;width:${N(w*.84)}%;top:-30%`;fx.appendChild(ring);sfx2('pop');
 requestAnimationFrame(()=>{ring.style.top=`${N((P.top-R.top+P.height*.42)/R.height*100)}%`;pool.classList.add('on')});
 setTimeout(()=>{if(!ptLive(pb))return;pb.classList.add('g23bob');ring.classList.add('g23bob');sfx2('whoosh');
  for(let i=0;i<6;i++){const d=document.createElement('span');d.className='g23drop';d.style.left=N(l-w*.5+Math.random()*w)+'%';d.style.bottom=N((R.bottom-P.bottom)/R.height*100+4)+'%';d.style.animationDelay=(i*.15)+'s';fx.appendChild(d)}},c?100:700);
 setTimeout(()=>{if(!ptLive(pb))return;try{toast(T.ring2)}catch(e){}sayQ([T.ring2])},c?400:1500);
 setTimeout(()=>{if(!ptLive(pb))return;pb.classList.remove('g23bob');fx.innerHTML='';ptFinish('j',line)},c?1500:3600)}

/* ---------- 樣式 ---------- */
const css=document.createElement('style');css.id='g23itemscss';css.textContent=`
.rtoy .g23car .g23lr,.rtoy .g23car .g23lb{transition:opacity .2s}
.rtoy.g23siren .g23lr{animation:g23fl .5s steps(2) infinite}.rtoy.g23siren .g23lb{animation:g23fl .5s steps(2) infinite reverse}
.rtoy.g23siren .g23drive{animation:g23drv 2.4s ease-in-out}
@keyframes g23fl{0%{opacity:1}50%{opacity:.25}100%{opacity:1}}
@keyframes g23drv{0%,100%{translate:0 0}30%{translate:-8px 0}65%{translate:8px 0}}
.rtoy.g23fly .g23ksw{animation:g23sw 1.2s ease-in-out 2;transform-box:fill-box;transform-origin:50% 100%}
@keyframes g23sw{0%,100%{rotate:0deg;translate:0 0}30%{rotate:-10deg;translate:0 -6px}70%{rotate:10deg;translate:0 -4px}}
.rtoy.g23quack .g23dk{animation:g23hop .5s ease-in-out 3}
@keyframes g23hop{0%,100%{translate:0 0}50%{translate:0 -6px}}
.rtoy.g23shine .g23glow{animation:g23gl 1.2s ease-in-out 2}.rtoy .g23tw{animation:g23tw 2.4s ease-in-out infinite}
@keyframes g23gl{0%,100%{opacity:.3}50%{opacity:.9}}@keyframes g23tw{0%,100%{opacity:1}50%{opacity:.4}}
.g23pool{position:absolute;height:14%;opacity:0;transition:opacity .5s;pointer-events:none;z-index:0}.g23pool.on{opacity:1}.g23pool svg{width:100%;height:100%;display:block}
.g23ring{position:absolute;z-index:6;pointer-events:none;transition:top .6s ease-in}.g23ring svg{width:100%;height:auto;display:block}
.g23bob{animation:g23bobk .9s ease-in-out infinite}
@keyframes g23bobk{0%,100%{translate:0 0}50%{translate:0 -6px}}
.g23drop{position:absolute;width:10px;height:10px;border-radius:50% 50% 50% 0;background:#9FD8FF;rotate:-45deg;pointer-events:none;animation:g23drp 1s ease-out both}
@keyframes g23drp{from{opacity:1;translate:0 0}to{opacity:0;translate:0 -40px}}
@media (prefers-reduced-motion:reduce){.rtoy .g23tw,.g23bob,.rtoy.g23siren .g23drive,.g23drop{animation:none!important}.g23ring{transition:none}}
body.lite .g23bob,body.lite .rtoy .g23tw,body.lite .g23drop{animation:none!important}`;document.head.appendChild(css);
window.__G23I={ver:'2026-11-28',ART23:Object.keys(ART23),artOf,silOf,RTOY:Object.keys(RTOY),rtoy:id=>RTOY[id]?RTOY[id]():'',T};
}catch(e){console.log('m9zl_g23items',e)}}).toString()+')()')})();

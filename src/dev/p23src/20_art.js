/* ---------- 新美術（全部程式畫 SVG；平塗＋柔和漸層、白色亮點、沒有黑色描邊） ---------- */
const lg=(i,a,b,x2=0,y2=1)=>`<linearGradient id="${i}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rg=(i,a,b)=>`<radialGradient id="${i}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const hl=(x,y,rx,ry,r=-30,o=.55)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${x} ${y})" fill="#fff" opacity="${o}"/>`;
const eye=(x,y,r=3)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#3A2A2A"/><circle cx="${f1(x+r*.35)}" cy="${f1(y-r*.4)}" r="${f1(r*.38)}" fill="#fff"/>`;
const blush=(x,y,r=3)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${f1(r*.62)}" fill="#FF9FB0" opacity=".6"/>`;
const shd=(cx,rx,cy)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${f1(rx*.14)}" fill="#3A2A5A" opacity=".16"/>`;
const sparkP=(x,y,r)=>`M${f1(x)} ${f1(y-r)} Q${f1(x+r*.18)} ${f1(y-r*.18)} ${f1(x+r)} ${f1(y)} Q${f1(x+r*.18)} ${f1(y+r*.18)} ${f1(x)} ${f1(y+r)} Q${f1(x-r*.18)} ${f1(y+r*.18)} ${f1(x-r)} ${f1(y)} Q${f1(x-r*.18)} ${f1(y-r*.18)} ${f1(x)} ${f1(y-r)}Z`;
const flw=(x,y,r,c,cc='#FFE27A',n=5)=>Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return `<circle cx="${f1(x+r*Math.sin(a))}" cy="${f1(y-r*Math.cos(a))}" r="${f1(r*.78)}" fill="${c}"/>`}).join('')+`<circle cx="${x}" cy="${y}" r="${f1(r*.6)}" fill="${cc}"/>`;
/* 禮物圖（64×64）：u＝唯一 id 前綴 */
const GART={
 fs_beach:u=>`<defs>${lg(u+'s','#BFE8FF','#E6F7FF')}${lg(u+'d','#FCE9C0','#EBC88A')}${lg(u+'w','#7FD0F0','#4FB0E0')}</defs>
  <rect class="p23bgx" x="4" y="6" width="56" height="52" rx="14" fill="url(#${u}s)"/>
  <g class="p23bgx"><path d="M4 30 Q16 26 28 30 Q40 34 60 28 V40 H4Z" fill="url(#${u}w)"/><path d="M8 31 Q14 29 20 31 M34 32 Q40 30 46 31" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M4 40 Q20 34 34 38 Q48 42 60 37 V50 Q60 58 52 58 H12 Q4 58 4 50Z" fill="url(#${u}d)"/></g>
  <g transform="translate(22 45) scale(1.25)"><circle r="7.4" fill="#FFF4E0"/><path d="M0 0 m-1.4 0 a1.4 1.4 0 1 1 2.8 0 a3 3 0 1 1 -6 0 a4.8 4.8 0 1 1 9.6 0" fill="none" stroke="#D9B27A" stroke-width="1.4"/></g>
  <g transform="translate(43 46) rotate(-12) scale(1.25)"><path d="M0 7 L-7 -1 Q-6 -7 0 -8 Q6 -7 7 -1Z" fill="#FFC8D8"/><path d="M0 6 L-4 -6 M0 6 V-7 M0 6 L4 -6" stroke="#F49AB6" stroke-width="1"/></g>
  <g class="p23bgx"><circle cx="50" cy="15" r="6" fill="#FFE27A"/>${hl(14,14,4,2,-20,.7)}</g>
  <g class="g22fx"><path d="${sparkP(12,48,3)}" fill="#fff"/><path d="${sparkP(56,44,2.4)}" fill="#FFE27A"/></g>`,
 fs_tri:u=>`<defs>${lg(u+'d','#F6DDB0','#E2BC84')}${lg(u+'b','#FFFBF2','#F2E2C6')}</defs>
  <path d="M4 48 Q18 40 32 43 Q46 46 60 41 V54 Q60 60 54 60 H10 Q4 60 4 54Z" fill="url(#${u}d)"/>
  ${[[14,40,15],[24,38,20],[35,38,20],[45,40,14]].map(([x,y,h])=>`<path d="M${x-5} ${y} L${x-4} ${y-h*.55} L${x} ${y-h} L${x+4} ${y-h*.55} L${x+5} ${y}Z" fill="url(#${u}b)"/><path d="M${x} ${y-h+4} V${y-1}" stroke="#E2C69A" stroke-width="1.2"/>`).join('')}
  <path d="M8 44 Q30 36 52 42" stroke="#F2E2C6" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M46 44 Q50 36 58 38 Q62 42 58 46 Q52 48 46 44Z" fill="url(#${u}b)"/><circle cx="54" cy="41" r="1.8" fill="#C9A878"/>
  <path d="M6 44 L2 38 M9 44 L7 36" stroke="#F2E2C6" stroke-width="2.6" stroke-linecap="round"/>${hl(22,26,1.6,4,-20,.7)}
  <g class="g22fx"><path d="${sparkP(10,12,3.4)}" fill="#FFE27A"/><path d="${sparkP(56,24,2.4)}" fill="#fff"/></g>`,
 vn_falls:u=>`<defs>${lg(u+'r','#9AD87A','#5FAE4A')}${lg(u+'w','#E6F8FF','#8FD8F6')}${lg(u+'p','#8FD8F6','#5BB8E8')}</defs>
  <g class="p23bgx"><path d="M4 10 Q4 4 10 4 H24 V40 H4Z" fill="url(#${u}r)"/><path d="M40 4 H54 Q60 4 60 10 V40 H40Z" fill="url(#${u}r)"/></g>
  <path d="M22 4 H42 V44 H22Z" fill="url(#${u}w)"/>${[26,31,36,40].map(x=>`<path d="M${x} 6 V42" stroke="#fff" stroke-width="1.6" opacity=".8" stroke-linecap="round"/>`).join('')}
  <path d="M4 40 Q32 34 60 40 V54 Q60 60 54 60 H10 Q4 60 4 54Z" fill="url(#${u}p)"/>
  <path d="M10 22 Q32 2 54 22" stroke="#FF9FB8" stroke-width="2.4" fill="none" opacity=".75"/><path d="M12 24 Q32 6 52 24" stroke="#FFE27A" stroke-width="2.4" fill="none" opacity=".75"/><path d="M14 26 Q32 10 50 26" stroke="#8FE0A8" stroke-width="2.4" fill="none" opacity=".75"/>
  ${flw(10,46,2.6,'#FF9FC8')}${flw(54,48,2.4,'#FFD24D','#FF9F5A')}<ellipse cx="32" cy="44" rx="12" ry="3" fill="#fff" opacity=".7"/>
  <g class="g22fx"><path d="${sparkP(18,40,2.6)}" fill="#fff"/><path d="${sparkP(46,38,2.2)}" fill="#fff"/></g>`,
 vn_frog:u=>`<defs>${lg(u+'l','#8EDB7A','#4FA84A')}${rg(u+'f','#9AF08A','#3FB860')}</defs>
  ${shd(32,22,59)}<path d="M6 50 Q14 30 34 30 Q56 32 60 50 Q40 60 6 50Z" fill="url(#${u}l)"/><path d="M10 50 Q32 40 58 49" stroke="#C8F0B0" stroke-width="1.4" fill="none"/>
  <ellipse cx="32" cy="40" rx="16" ry="12" fill="url(#${u}f)"/>
  <circle cx="23" cy="27" r="7" fill="url(#${u}f)"/><circle cx="41" cy="27" r="7" fill="url(#${u}f)"/>
  <circle cx="23" cy="27" r="4.4" fill="#FFE27A"/><circle cx="41" cy="27" r="4.4" fill="#FFE27A"/>${eye(23,27.4,2.6)}${eye(41,27.4,2.6)}
  <ellipse cx="32" cy="44" rx="9" ry="6" fill="#E8FFD8" opacity=".8"/><path d="M27 39 Q32 42.6 37 39" stroke="#2E7A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  ${blush(21,38,2.6)}${blush(43,38,2.6)}${[[16,50],[48,50]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#7EE07A"/>`).join('')}${hl(26,34,3,1.6,-20,.6)}
  <g class="g22fx"><path d="${sparkP(54,14,3)}" fill="#FFE27A"/></g>`};
function stripFx(s){let i;while((i=s.indexOf('<g class="g22fx">'))>=0){let d=0,j=i;const re=/<g[\s>]|<\/g>/g;re.lastIndex=i;let m;
  while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0){j=m.index+4;break}}else d++}if(d!==0){s=s.slice(0,i);break}s=s.slice(0,i)+s.slice(j)}return s}
function stripBg(s){s=s.replace(/<rect class="p23bgx"[^>]*\/>/g,'');return s.replace(/<g class="p23bgx">/g,'<g class="g22fx">').replace(/^/,'')}
const gInner=id=>GART[id]?GART[id](uid('g')):'';
const gSvg=id=>`<svg viewBox="0 0 64 64" aria-hidden="true">${gInner(id)}</svg>`;
const gSil=(id,c)=>{let s=stripFx(stripBg(gInner(id))).replace(/<ellipse cx="[\d.]+" cy="59"[^>]*\/>/g,'');s=s.replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="'+(c||'#8C7CE6')+'"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'');return `<svg viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`};
try{if(window.G22){G22.ART=G22.ART||{};G22.SIL=G22.SIL||{};Object.keys(GART).forEach(id=>{
 try{Object.defineProperty(G22.ART,id,{enumerable:true,configurable:true,get:()=>gSvg(id)})}catch(e){}
 try{Object.defineProperty(G22.SIL,id,{enumerable:true,configurable:true,get:()=>gSil(id)})}catch(e){}})}}catch(e){console.log('p23 g22art',e)}
/* 工具小圖 */
const ICO={
 shovel:u=>`<defs>${lg(u+'m','#E8EEF8','#A8B8D0')}${lg(u+'h','#FFB35C','#E0782E')}</defs><path d="M38 8 L46 16 L30 32 L26 28Z" fill="url(#${u}h)"/><path d="M28 26 L34 32 Q30 46 16 52 Q8 54 10 46 Q14 32 28 26Z" fill="url(#${u}m)"/>${hl(17,42,2,5,40,.8)}<circle cx="44" cy="10" r="5" fill="url(#${u}h)"/>`,
 brush:u=>`<defs>${lg(u+'h','#C99A6A','#8E6248')}${lg(u+'b','#FFE9A8','#F0C060')}</defs><path d="M44 6 L52 14 L36 30 L30 24Z" fill="url(#${u}h)"/><rect x="22" y="22" width="14" height="10" rx="2" transform="rotate(45 29 27)" fill="#C8CCD8"/><path d="M24 30 L32 38 Q26 50 12 54 Q14 40 24 30Z" fill="url(#${u}b)"/><path d="M15 50 L24 38 M19 52 L28 40" stroke="#E0A840" stroke-width="1.4" stroke-linecap="round"/>`,
 museum:u=>`<defs>${lg(u+'r','#FFE9C0','#E8C08A')}</defs><path d="M8 24 L32 8 L56 24Z" fill="#B99CFF"/><rect x="10" y="24" width="44" height="4" fill="#9A7AE8"/>${[14,25,36,47].map(x=>`<rect x="${x}" y="29" width="4" height="20" rx="1.4" fill="url(#${u}r)"/>`).join('')}<rect x="8" y="49" width="48" height="6" rx="2" fill="#9A7AE8"/><circle cx="32" cy="18" r="3" fill="#FFE27A"/>`,
 book:u=>`<defs>${lg(u+'c','#8EDB7A','#4FA84A')}</defs><rect x="10" y="8" width="44" height="48" rx="6" fill="url(#${u}c)"/><rect x="14" y="8" width="4" height="48" fill="#3F8A3A" opacity=".5"/>${flw(36,26,5,'#FF9FC8')}<rect x="24" y="40" width="24" height="5" rx="2.5" fill="#fff" opacity=".8"/>${hl(46,14,2,4,-20,.6)}`,
 house:u=>`<defs>${lg(u+'w','#E8B878','#B98450')}</defs><rect x="28" y="36" width="8" height="22" fill="#8A5A36"/><path d="M14 22 L32 8 L50 22Z" fill="#FF8FB0"/><rect x="18" y="22" width="28" height="16" rx="2" fill="url(#${u}w)"/><rect x="28" y="26" width="8" height="12" rx="3" fill="#7A4A2A"/><circle cx="12" cy="40" r="7" fill="#7CC46A"/><circle cx="52" cy="42" r="8" fill="#6AB85A"/>`};
const ico=k=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ICO[k](uid('i'))}</svg>`;
/* 雨林朋友（100×100，腳 y≈94） */
const ANI={
 toucan:u=>`<defs>${lg(u+'b','#4A4470','#2A2650')}${lg(u+'k','#FFE066','#FF9A3C',1,0)}</defs>${shd(50,22,95)}
  <path d="M30 90 H74" stroke="#8A5A36" stroke-width="6" stroke-linecap="round"/>
  <path d="M40 92 Q24 96 22 80 Q30 84 40 82Z" fill="#2A2650"/><ellipse cx="44" cy="62" rx="20" ry="26" fill="url(#${u}b)"/>
  <ellipse cx="50" cy="58" rx="11" ry="14" fill="#FFF3B0"/><ellipse cx="46" cy="82" rx="10" ry="5" fill="#FF8A9A"/>
  <circle cx="46" cy="36" r="17" fill="url(#${u}b)"/><path d="M52 30 Q78 22 94 34 Q96 42 86 46 Q70 50 54 44Z" fill="url(#${u}k)"/><path d="M86 34 Q96 36 94 42 Q90 44 86 42Z" fill="#FF6A6A"/><path d="M56 40 Q74 44 90 42" stroke="#E08A2A" stroke-width="1.4" fill="none"/>
  <circle cx="46" cy="33" r="7" fill="#7FD0FF"/>${eye(46,33,3.4)}${blush(52,44,3)}${hl(36,52,3,7,-10,.25)}<path d="M40 92 v-4 M50 92 v-4" stroke="#7A7A9A" stroke-width="3" stroke-linecap="round"/>`,
 parrot:u=>`<defs>${lg(u+'r','#FF7A6A','#E04A4A')}${lg(u+'w','#7FC4FF','#4A8AE8')}</defs>${shd(50,22,95)}
  <path d="M30 88 H72" stroke="#8A5A36" stroke-width="6" stroke-linecap="round"/>
  <path d="M46 84 L40 99 L50 96 L56 99 L54 84Z" fill="url(#${u}w)"/><ellipse cx="50" cy="62" rx="18" ry="24" fill="url(#${u}r)"/>
  <path d="M36 52 Q26 70 40 84 Q48 74 46 56Z" fill="#FFD24D"/><path d="M38 62 Q30 76 42 86 Q46 78 44 66Z" fill="url(#${u}w)"/>
  <circle cx="52" cy="34" r="17" fill="url(#${u}r)"/><ellipse cx="60" cy="32" rx="7" ry="8" fill="#FFF4EC"/>${eye(60,31,3.2)}
  <path d="M64 38 Q76 36 74 48 Q70 52 66 46 Q64 44 62 44Z" fill="#E8E0D8"/><path d="M64 44 Q68 46 72 44" stroke="#B8B0A8" stroke-width="1.2" fill="none"/>${blush(54,44,3)}${hl(44,26,3,6,-30,.4)}
  <path d="M44 88 v-4 M56 88 v-4" stroke="#7A7A9A" stroke-width="3" stroke-linecap="round"/>`,
 morpho:u=>`<defs>${rg(u+'w','#9AE0FF','#2E7AE8')}</defs>
  <path d="M48 46 Q20 14 10 26 Q4 44 26 54 Q40 56 48 50Z" fill="url(#${u}w)"/><path d="M52 46 Q80 14 90 26 Q96 44 74 54 Q60 56 52 50Z" fill="url(#${u}w)"/>
  <path d="M48 54 Q24 58 22 74 Q30 86 46 66Z" fill="url(#${u}w)"/><path d="M52 54 Q76 58 78 74 Q70 86 54 66Z" fill="url(#${u}w)"/>
  <path d="M10 26 Q4 44 26 54 M90 26 Q96 44 74 54" stroke="#BFEFFF" stroke-width="3" fill="none" opacity=".8"/>
  ${hl(26,30,6,3,-30,.6)}${hl(74,30,6,3,30,.6)}<ellipse cx="50" cy="56" rx="4.4" ry="18" fill="#5A4A7A"/><circle cx="50" cy="36" r="7" fill="#6A5A8A"/>
  ${eye(47.4,35,1.8)}${eye(52.6,35,1.8)}<path d="M47 30 Q42 18 36 16 M53 30 Q58 18 64 16" stroke="#6A5A8A" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="36" cy="16" r="2" fill="#6A5A8A"/><circle cx="64" cy="16" r="2" fill="#6A5A8A"/>`,
 chame:u=>`<defs>${lg(u+'g','#9AE87A','#3FB860')}</defs>${shd(50,26,95)}
  <path d="M14 88 Q50 80 90 88" stroke="#8A5A36" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M30 72 Q12 74 14 60 Q16 50 26 54 Q30 58 26 62 Q22 62 22 60" stroke="url(#${u}g)" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M28 76 Q30 52 54 48 Q74 46 80 62 Q82 76 64 80 Q44 84 28 76Z" fill="url(#${u}g)"/>
  <path d="M34 62 Q50 56 72 60" stroke="#FFE27A" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>
  <path d="M60 52 Q74 38 88 50 Q92 62 80 64 Z" fill="url(#${u}g)"/><circle cx="74" cy="54" r="7" fill="#7AD86A"/>${eye(75,54,3)}
  <path d="M82 62 Q86 64 88 61" stroke="#2E7A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>${blush(80,60,2.4)}
  <path d="M40 80 L36 88 M66 80 L70 88" stroke="#3FB860" stroke-width="5" stroke-linecap="round"/>${hl(52,56,5,2.4,-10,.5)}`,
 capy:u=>`<defs>${lg(u+'c','#C8946A','#9A6A44')}</defs>${shd(50,30,95)}
  <ellipse cx="46" cy="70" rx="32" ry="22" fill="url(#${u}c)"/><path d="M28 88 v6 M40 90 v4 M58 90 v4 M68 88 v6" stroke="#8A5A36" stroke-width="7" stroke-linecap="round"/>
  <path d="M62 56 Q66 36 82 38 Q94 42 94 56 Q94 68 82 70 Q68 70 62 56Z" fill="url(#${u}c)"/><ellipse cx="90" cy="56" rx="5" ry="6" fill="#8A5A36"/>
  <circle cx="72" cy="40" r="4" fill="#9A6A44"/><circle cx="72" cy="40" r="2" fill="#E8B898"/>${eye(80,48,2.8)}${blush(84,58,3)}
  <path d="M86 62 Q88 64 90 62" stroke="#6A3A2A" stroke-width="1.4" fill="none"/>${hl(34,58,8,3,-10,.35)}
  <g transform="translate(70 30)">${flw(0,0,3,'#FFB3D1')}</g>`,
 frog:u=>`<defs>${lg(u+'l','#8EDB7A','#4FA84A')}${rg(u+'f','#9AF08A','#3FB860')}</defs>${shd(50,30,95)}
  <path d="M14 92 Q26 70 52 70 Q80 72 88 92 Q52 100 14 92Z" fill="url(#${u}l)"/>
  <ellipse cx="50" cy="72" rx="22" ry="16" fill="url(#${u}f)"/><circle cx="38" cy="54" r="10" fill="url(#${u}f)"/><circle cx="62" cy="54" r="10" fill="url(#${u}f)"/>
  <circle cx="38" cy="54" r="6.4" fill="#FFE27A"/><circle cx="62" cy="54" r="6.4" fill="#FFE27A"/>${eye(38,54.6,3.6)}${eye(62,54.6,3.6)}
  <ellipse cx="50" cy="78" rx="12" ry="8" fill="#E8FFD8" opacity=".8"/><path d="M42 68 Q50 73 58 68" stroke="#2E7A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${blush(34,66,3.4)}${blush(66,66,3.4)}${[[28,86],[72,86],[36,90],[64,90]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="#7EE07A"/>`).join('')}${hl(40,62,4,2,-20,.6)}`};
const AORD=['sloth','ladybug','toucan','parrot','morpho','chame','capy','frog'];
const AGIFT={frog:'vn_frog'};
const aniInner=k=>{try{if(k==='sloth')return CH36.sloth.f();if(k==='ladybug')return CH36.ladybug.f()}catch(e){}return ANI[k]?ANI[k](uid('a')):''};
const aniSVG=(k,attr)=>`<svg viewBox="0 0 100 100" ${attr||''} aria-hidden="true">${aniInner(k)}</svg>`;
const aniSil=k=>`<svg viewBox="0 0 100 100" aria-hidden="true">${stripFx(aniInner(k)).replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="#CFC2EE"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'')}</svg>`;
/* 花和葉子（64×64） */
const ITM={
 f_pink:u=>`<defs>${rg(u+'p','#FFD0E4','#FF7FB0')}</defs><path d="M32 40 Q30 52 34 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/>${[0,72,144,216,288].map(a=>`<ellipse cx="32" cy="17" rx="9" ry="13" transform="rotate(${a} 32 30)" fill="url(#${u}p)"/>`).join('')}<circle cx="32" cy="30" r="6" fill="#FFE27A"/>${hl(26,16,2.4,4,-30,.7)}`,
 f_yellow:u=>`<defs>${rg(u+'y','#FFF6B0','#FFC83A')}</defs><path d="M32 40 Q34 52 30 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/>${Array.from({length:8},(_,i)=>`<ellipse cx="32" cy="16" rx="5" ry="11" transform="rotate(${i*45} 32 28)" fill="url(#${u}y)"/>`).join('')}<circle cx="32" cy="28" r="7" fill="#E89A3A"/>${hl(29,25,2,1.4,-30,.6)}`,
 f_purple:u=>`<defs>${rg(u+'v','#E8D8FF','#A27AF0')}</defs><path d="M32 36 Q30 50 32 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M32 30 Q14 8 10 22 Q8 34 32 30Z M32 30 Q50 8 54 22 Q56 34 32 30Z M32 30 Q20 50 30 52 Q34 50 32 30Z M32 30 Q44 50 34 52" fill="url(#${u}v)"/><circle cx="32" cy="30" r="4" fill="#FFE27A"/>${hl(18,18,2,4,-40,.7)}`,
 f_orchid:u=>`<defs>${rg(u+'o','#FFFFFF','#F4C6E6')}</defs><path d="M32 40 Q36 52 32 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="26" rx="12" ry="8" fill="url(#${u}o)"/><ellipse cx="44" cy="26" rx="12" ry="8" fill="url(#${u}o)"/><ellipse cx="32" cy="14" rx="7" ry="10" fill="url(#${u}o)"/><path d="M26 30 Q32 46 38 30 Q32 34 26 30Z" fill="#E86AA8"/><circle cx="32" cy="28" r="3" fill="#FFE27A"/>`,
 f_red:u=>`<defs>${lg(u+'r','#FF8A8A','#E8404A')}</defs><path d="M32 30 Q32 48 34 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M32 34 Q18 30 18 16 Q26 20 30 12 Q32 20 34 12 Q38 20 46 16 Q46 30 32 34Z" fill="url(#${u}r)"/><path d="M32 34 V44" stroke="#FFE27A" stroke-width="2.4" stroke-linecap="round"/><circle cx="32" cy="45" r="2.4" fill="#FFE27A"/>${hl(24,20,2,4,-20,.6)}`,
 l_heart:u=>`<defs>${lg(u+'g','#A8E88A','#4FA84A')}</defs><path d="M32 56 Q8 38 10 22 Q14 10 26 14 Q30 16 32 22 Q34 16 38 14 Q50 10 54 22 Q56 38 32 56Z" fill="url(#${u}g)"/><path d="M32 54 V22" stroke="#DFF8C8" stroke-width="2" stroke-linecap="round"/><path d="M32 40 L22 32 M32 34 L42 26 M32 46 L42 38" stroke="#DFF8C8" stroke-width="1.4" stroke-linecap="round"/>${hl(20,22,3,5,-30,.5)}`,
 l_fern:u=>`<defs>${lg(u+'g','#9AE07A','#3F9A4A')}</defs><path d="M20 58 Q30 30 46 8" stroke="#3F8A3A" stroke-width="2.6" fill="none" stroke-linecap="round"/>${Array.from({length:8},(_,i)=>{const t=i/8,x=20+26*t+t*t*0,y=58-50*t;const s=9-i*.8;return `<ellipse cx="${f1(x-s*.7)}" cy="${f1(y-2)}" rx="${f1(s)}" ry="${f1(s*.38)}" transform="rotate(-30 ${f1(x)} ${f1(y)})" fill="url(#${u}g)"/><ellipse cx="${f1(x+s*.7)}" cy="${f1(y-2)}" rx="${f1(s)}" ry="${f1(s*.38)}" transform="rotate(20 ${f1(x)} ${f1(y)})" fill="url(#${u}g)"/>`}).join('')}`,
 l_big:u=>`<defs>${lg(u+'g','#7ED86A','#2E8A4A')}</defs><path d="M32 60 V48" stroke="#3F8A3A" stroke-width="3" stroke-linecap="round"/><path d="M32 50 Q6 46 6 26 Q8 6 32 6 Q56 6 58 26 Q58 46 32 50Z" fill="url(#${u}g)"/><path d="M32 48 V10" stroke="#CFF4B8" stroke-width="2" stroke-linecap="round"/><path d="M12 22 Q20 24 24 20 M10 34 Q18 34 22 30 M52 22 Q44 24 40 20 M54 34 Q46 34 42 30" stroke="#CFF4B8" stroke-width="3" stroke-linecap="round" fill="none"/>${hl(20,14,3,6,-40,.45)}`};
const IORD=['f_pink','f_yellow','f_purple','f_orchid','f_red','l_heart','l_fern','l_big'];
const itmSVG=k=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ITM[k]?ITM[k](uid('t')):''}</svg>`;
/* 小樹屋（800×500）；SLOTS＝可以放花葉的圓點 */
const HSLOT=[[250,150],[330,110],[410,96],[490,110],[570,150],[300,236],[520,236],[350,300],[470,300],[240,372],[580,372],[410,206]];
function treeHouse(u){u=u||uid('h');return `<defs>${lg(u+'sky','#BFE8FF','#E8F8FF')}${lg(u+'t','#B8865A','#8A5A36',1,0)}${lg(u+'w','#F0C890','#C89A60')}${lg(u+'r','#FF9FB8','#E86A8A')}${rg(u+'lf','#9AE07A','#3F9A4A')}</defs>
 <rect width="800" height="500" fill="url(#${u}sky)"/><circle cx="700" cy="70" r="38" fill="#FFE27A" opacity=".85"/>
 <path d="M0 440 Q200 410 400 430 Q600 450 800 420 V500 H0Z" fill="#8ED47A"/>
 <circle cx="130" cy="120" r="110" fill="url(#${u}lf)"/><circle cx="690" cy="170" r="120" fill="url(#${u}lf)"/><circle cx="400" cy="40" r="140" fill="url(#${u}lf)" opacity=".95"/>
 <path d="M360 480 Q370 380 362 300 H458 Q450 380 462 480Z" fill="url(#${u}t)"/><path d="M380 470 Q386 400 380 320" stroke="#C8966A" stroke-width="6" fill="none" opacity=".6"/>
 <rect x="210" y="320" width="400" height="22" rx="10" fill="#9A6A40"/>${[230,290,350,470,530,590].map(x=>`<rect x="${x-5}" y="276" width="10" height="46" rx="4" fill="#B88A5A"/>`).join('')}<rect x="216" y="270" width="388" height="10" rx="5" fill="#C89A6A"/>
 <rect x="250" y="150" width="320" height="130" rx="14" fill="url(#${u}w)"/>${[180,210,240].map(y=>`<path d="M256 ${y} H564" stroke="#B88A5A" stroke-width="3" opacity=".45"/>`).join('')}
 <path d="M220 160 L410 60 L600 160Z" fill="url(#${u}r)"/><path d="M240 156 L410 68 L580 156" stroke="#FFD0DC" stroke-width="6" fill="none" opacity=".6"/>
 <rect x="380" y="190" width="60" height="90" rx="26" fill="#8A5A36"/><circle cx="428" cy="238" r="5" fill="#FFE27A"/>
 <rect x="282" y="186" width="64" height="54" rx="10" fill="#BFE8FF"/><path d="M314 186 V240 M282 213 H346" stroke="#F0C890" stroke-width="5"/>
 <rect x="474" y="186" width="64" height="54" rx="10" fill="#BFE8FF"/><path d="M506 186 V240 M474 213 H538" stroke="#F0C890" stroke-width="5"/>
 <path d="M640 342 V480 M680 342 V480" stroke="#C89A6A" stroke-width="8"/>${[370,400,430,460].map(y=>`<path d="M640 ${y} H680" stroke="#C89A6A" stroke-width="7"/>`).join('')}
 ${hl(300,200,6,12,-20,.5)}${hl(490,200,6,12,-20,.5)}`}
/* 大瀑布（800×450，終點用） */
function bigFalls(u){u=u||uid('w');return `<defs>${lg(u+'w','#F2FCFF','#9ADCF6')}${lg(u+'p','#9ADCF6','#4FB0E0')}${lg(u+'r','#8ED47A','#4F9A4A')}</defs>
 <path d="M0 0 H300 V330 H0Z" fill="url(#${u}r)"/><path d="M500 0 H800 V330 H500Z" fill="url(#${u}r)"/>
 <path d="M290 0 H510 V340 H290Z" fill="url(#${u}w)"/>${[310,340,370,400,430,460,490].map(x=>`<path d="M${x} 0 V336" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round" class="p23fall"/>`).join('')}
 <path d="M0 320 Q400 290 800 320 V450 H0Z" fill="url(#${u}p)"/><ellipse cx="400" cy="335" rx="150" ry="22" fill="#fff" opacity=".75"/>
 ${['#FF9FB8','#FFD24D','#8FE0A8','#7FC4FF','#B99CFF'].map((c,i)=>`<path d="M${120+i*10} 330 Q400 ${40+i*10} ${680-i*10} 330" stroke="${c}" stroke-width="9" fill="none" opacity=".55"/>`).join('')}
 ${flw(90,350,10,'#FF9FC8')}${flw(720,360,9,'#FFD24D','#FF9F5A')}${flw(160,380,8,'#B99CFF')}`}
/* 雨林的地方：疊在原本雨林背景上的裝飾（800×450） */
function zoneDeco(z,u){u=u||uid('z');
 if(z==='flowers')return `<g opacity=".95">${[90,230,380,520,660].map((x,i)=>`<path d="M${x} 0 Q${x+20} 60 ${x-6} 120" stroke="#5FAE4A" stroke-width="4" fill="none"/>${flw(x+8,40,7,['#FF9FC8','#FFD24D','#B99CFF','#FF8A8A','#FFB3D1'][i])}${flw(x-2,92,6,['#FFD24D','#FF9FC8','#FFB3D1','#B99CFF','#FF8A8A'][i])}`).join('')}${[[60,410],[200,430],[640,420],[740,400]].map(([x,y],i)=>flw(x,y,9,['#FF9FC8','#FFD24D','#B99CFF','#FF8A8A'][i])).join('')}</g><rect width="800" height="450" fill="#FFB3D1" opacity=".08"/>`;
 if(z==='creek')return `<defs>${lg(u+'c','#9ADCF6','#4FB0E0')}</defs><path d="M0 380 Q200 350 400 372 Q600 394 800 360 V450 H0Z" fill="url(#${u}c)" opacity=".92"/>${[[120,380],[330,392],[560,396],[700,372]].map(([x,y])=>`<path d="M${x-26} ${y} Q${x} ${y-6} ${x+26} ${y}" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>`).join('')}${[[80,420,16],[260,430,12],[470,426,18],[690,430,14]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.6}" fill="#B8B0C8"/>`).join('')}`;
 if(z==='ferns')return `<g>${[[40,450,1],[180,460,.8],[600,455,.9],[760,450,1.1]].map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})">${[-60,-30,0,30,60].map(a=>`<path d="M0 0 Q${a} -80 ${a*1.6} -140" stroke="#3F9A4A" stroke-width="5" fill="none"/>${Array.from({length:6},(_,i)=>`<ellipse cx="${f1(a*.3*(i/6+.2)*2)}" cy="${-20-i*20}" rx="14" ry="5" transform="rotate(${a/2} 0 ${-20-i*20})" fill="#5FB85A"/>`).join('')}`).join('')}</g>`).join('')}</g><rect width="800" height="450" fill="#2E8A4A" opacity=".08"/>`;
 if(z==='mist')return `<g opacity=".7"><path d="M0 250 Q200 210 400 240 Q600 270 800 230 V300 Q600 330 400 300 Q200 270 0 310Z" fill="#fff"/><path d="M0 350 Q250 320 500 350 Q650 370 800 340 V400 Q600 420 400 400 Q200 380 0 410Z" fill="#fff" opacity=".8"/></g><rect width="800" height="450" fill="#E8F0FF" opacity=".18"/>`;
 if(z==='falls')return `<defs>${lg(u+'f','#F2FCFF','#9ADCF6')}</defs><path d="M560 0 H700 V360 H560Z" fill="url(#${u}f)" opacity=".95"/>${[575,600,625,650,675].map(x=>`<path d="M${x} 0 V350" stroke="#fff" stroke-width="4" opacity=".7" class="p23fall"/>`).join('')}<path d="M480 360 Q630 330 780 362 V420 H480Z" fill="#7FC8EC"/><ellipse cx="630" cy="364" rx="90" ry="14" fill="#fff" opacity=".7"/>`;
 return `<defs>${lg(u+'t','#A87A50','#7A5232',1,0)}</defs><g><path d="M0 450 V0 H46 Q36 200 58 450Z" fill="url(#${u}t)"/><path d="M800 450 V0 H752 Q766 220 742 450Z" fill="url(#${u}t)"/>${[[60,40],[110,110],[700,60],[740,140],[250,20],[560,30]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0 0 Q6 40 -4 90" stroke="#4F9A4A" stroke-width="4" fill="none"/>${[20,45,70].map(t=>`<ellipse cx="${t%2?6:-6}" cy="${t}" rx="10" ry="5" fill="#6FBF5A" transform="rotate(${t%2?30:-30} ${t%2?6:-6} ${t})"/>`).join('')}</g>`).join('')}${[[150,300],[640,290]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="60" ry="22" fill="#4F9A4A" opacity=".35"/>`).join('')}</g>`}
const zoneThumb=z=>{const u=uid('m');return `<defs>${lg(u+'s','#D8F4E0','#9ADB8A')}</defs><rect width="800" height="450" fill="url(#${u}s)"/>${[[120,60,150],[690,40,170],[400,-30,160]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#5FAE4A"/>`).join('')}<path d="M170 450 V140 H215 V450Z M590 450 V120 H635 V450Z" fill="#8A5A36"/><path d="M0 380 Q400 340 800 380 V450 H0Z" fill="#6FBF5A"/>${zoneDeco(z)}`};
const ZONES=['trees','flowers','creek','ferns','mist'];
const ZFR={trees:['sloth','toucan','parrot'],flowers:['morpho','ladybug','parrot'],creek:['capy','frog','toucan'],ferns:['chame','ladybug','frog'],mist:['sloth','morpho','chame'],falls:['capy','parrot','frog']};
/* 房間的小化石展示架（約 130×70） */
// 地上的小木架（68×110，腳 y≈108），三層各放一隻（最新的在最上面）
function shelfArt(list){const u=uid('s');const fm=ST().fm;return `<defs>${lg(u+'w','#D8A870','#A87A48',1,0)}${lg(u+'b','#FFF4E4','#F2DEC0')}</defs>
 <rect x="2" y="2" width="64" height="104" rx="8" fill="url(#${u}b)"/><rect x="0" y="0" width="6" height="108" rx="3" fill="url(#${u}w)"/><rect x="62" y="0" width="6" height="108" rx="3" fill="url(#${u}w)"/>
 <rect x="-2" y="-2" width="72" height="7" rx="3.5" fill="#C8965E"/>${[36,70,104].map(y=>`<rect x="0" y="${y}" width="68" height="5" rx="2.5" fill="url(#${u}w)"/>`).join('')}
 ${list.slice(0,3).map((k,i)=>`<svg x="5" y="${4+i*34}" width="58" height="33" viewBox="0 0 600 340">${dinoPaint(k,fm[k]&&fm[k].c,fm[k]&&fm[k].p)}</svg>`).join('')}
 <ellipse cx="34" cy="109" rx="34" ry="3" fill="#3A2A5A" opacity=".18"/>${hl(12,16,2,8,0,.5)}<path d="${sparkP(62,6,5)}" fill="#FFE27A"/>`}

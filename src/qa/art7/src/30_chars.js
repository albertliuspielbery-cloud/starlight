
/* ===================== 1. 新朋友（100×100 全身；腳 y≈94、影子 y=96；比照 m99zzzy 的身體比例，畫得更有光影） ===================== */
// 亮晶晶的大眼睛（眨眼用 class="blink"）
const eye=(x,y,rx,ry=rx*1.18,c='#2A1E36')=>{const g=uid('ey');return `<defs>${rg(g,[[0,mixc(c,'#7A6AA8',.55)],[.7,c],[1,c]],.5,.75,.6)}</defs><ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="url(#${g})"/><ellipse cx="${n(x+rx*.3)}" cy="${n(y-ry*.38)}" rx="${n(rx*.42)}" ry="${n(ry*.36)}" fill="#FFFFFF"/><circle cx="${n(x-rx*.34)}" cy="${n(y+ry*.4)}" r="${n(rx*.17)}" fill="#FFFFFF" opacity=".85"/>`};
const eyes2=(x1,x2,y,rx,ry,c)=>`<g class="blink" style="transform-origin:${n((x1+x2)/2)}px ${n(y)}px">${eye(x1,y,rx,ry,c)}${eye(x2,y,rx,ry,c)}</g>`;
const cheek=(x,y,r=3.4,c='#FF9FB0',op=.55)=>`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(r)}" ry="${n(r*.66)}" fill="${c}" opacity="${op}"/>`;
const smile=(x,y,w=4,h=3,c='#5A2A3A',sw=1.6)=>`<path d="M${n(x-w)} ${n(y)} Q${n(x)} ${n(y+h)} ${n(x+w)} ${n(y)}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;
const openSmile=(x,y,w=4.4,h=4.4,c='#5A2A3A')=>`<path d="M${n(x-w)} ${n(y)} Q${n(x)} ${n(y+h*1.5)} ${n(x+w)} ${n(y)}Z" fill="${c}"/><path d="M${n(x-w*.5)} ${n(y+h*.7)} Q${n(x)} ${n(y+h*1.1)} ${n(x+w*.5)} ${n(y+h*.7)}" stroke="#FF8FA0" stroke-width="${n(h*.5)}" stroke-linecap="round" fill="none"/>`;
// 通用身體（梨形，光從左上來）：o.c 毛色、o.c2 暗面、o.belly、o.hand、o.feet、o.pose（手的位置，同 m99zzzy 的 ARM）、o.coat 衣服色、o.outfit／prop／front／back／tail／head／hat
const ARM7={down:[[32,79],[68,79]],wave:[[32,79],[73,44]],hold:[[44,72],[56,72]],side:[[32,79],[72,70]],up:[[27,48],[73,48]],sideL:[[28,70],[68,79]],stop:[[32,79],[74,50]],hip:[[34,72],[72,70]]};
function body7(o){const g=uid('b7');const c=o.coat||o.c,c2=o.coat2||o.c2;const [L,Rr]=ARM7[o.pose||'down'];
 let s=`<defs>${rg(g+'b',[[0,mixc(c,'#FFFFFF',.35)],[.55,c],[1,c2]],.38,.3,.75)}${lg(g+'l',[[0,c],[1,c2]])}</defs>${shd(50,96,o.sh||22,3.4)}`;
 if(o.back)s+=o.back;if(o.tail)s+=o.tail;
 // 腳
 s+=`<path d="M40 80 V90 Q40 94 44 94 H47 Q49 94 49 90 V80Z M51 80 V90 Q51 94 53 94 H56 Q60 94 60 90 V80Z" fill="${o.pants||c2}"/>`;
 s+=`<ellipse cx="44.5" cy="93.4" rx="6.2" ry="3" fill="${o.shoe||o.feet}"/><ellipse cx="55.5" cy="93.4" rx="6.2" ry="3" fill="${o.shoe||o.feet}"/><ellipse cx="43" cy="92.4" rx="2.4" ry="1" fill="#FFFFFF" opacity=".35"/><ellipse cx="54" cy="92.4" rx="2.4" ry="1" fill="#FFFFFF" opacity=".35"/>`;
 // 身體
 s+=`<path d="M38 56 Q30 70 34 82 Q50 90 66 82 Q70 70 62 56 Q50 51 38 56Z" fill="url(#${g}b)"/>`;
 if(o.belly)s+=`<ellipse cx="50" cy="72" rx="9.6" ry="10.6" fill="${o.belly}" opacity=".95"/><ellipse cx="47.6" cy="68" rx="4" ry="4.6" fill="#FFFFFF" opacity=".3"/>`;
 s+=`<path d="M35 78 Q50 88 65 78" stroke="${c2}" stroke-width="2" fill="none" opacity=".35"/>`;
 if(o.outfit)s+=o.outfit;
 // 手（袖子顏色 sleeve；暗面描一條）
 const sh=[[39.5,61],[60.5,61]],sl=o.sleeve||c;
 const arm=(a,b)=>{const mx=n((a[0]+b[0])/2+(b[0]<50?-3:3)),my=n((a[1]+b[1])/2+2);return `<path d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" stroke="${mixc(sl,'#000000',.18)}" stroke-width="8.6" stroke-linecap="round" fill="none"/><path d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" stroke="${sl}" stroke-width="7" stroke-linecap="round" fill="none"/>`};
 s+=arm(sh[0],L)+arm(sh[1],Rr);
 if(o.prop)s+=o.prop;
 s+=`<circle cx="${L[0]}" cy="${L[1]}" r="4.2" fill="${o.hand}"/><circle cx="${Rr[0]}" cy="${Rr[1]}" r="4.2" fill="${o.hand}"/><circle cx="${L[0]-1.2}" cy="${L[1]-1.4}" r="1.3" fill="#FFFFFF" opacity=".4"/><circle cx="${Rr[0]-1.2}" cy="${Rr[1]-1.4}" r="1.3" fill="#FFFFFF" opacity=".4"/>`;
 if(o.front)s+=o.front;
 s+=o.head||'';if(o.hat)s+=o.hat;
 return s}
const W7=(s,a='')=>`<svg viewBox="0 0 100 100" ${a} aria-hidden="true" overflow="visible">${s}</svg>`;
// 衣服小零件
const OUT={
 labcoat:(c='#FFFFFF',e='#D4DCEC')=>`<path d="M37 57 Q30 70 33 85 Q41 88 47 87 L50 61 L53 87 Q59 88 67 85 Q70 70 63 57 L56 54.6 L50 63 L44 54.6Z" fill="${c}" stroke="${e}" stroke-width=".8"/><path d="M44 54.6 L47.6 66 L50 63 M56 54.6 L52.4 66 L50 63" fill="${mixc(c,'#000000',.06)}" stroke="${e}" stroke-width=".6"/><rect x="55" y="72" width="7.4" height="6" rx="1.2" fill="${mixc(c,'#000000',.04)}" stroke="${e}" stroke-width=".6"/><path d="M57 72 V67.6" stroke="#FF8A80" stroke-width="1.6" stroke-linecap="round"/><circle cx="48.4" cy="72" r="1" fill="${e}"/><circle cx="48.4" cy="79" r="1" fill="${e}"/>`,
 scrubs:(c,e)=>`<path d="M37.6 57 Q31 70 34 83 Q50 89 66 83 Q69 70 62.4 57 Q56 54 50 63 Q44 54 37.6 57Z" fill="${c}"/><path d="M44 55.6 L50 63 L56 55.6" stroke="${e}" stroke-width="1.4" fill="none"/><rect x="40" y="68" width="7" height="6" rx="1.2" fill="${mixc(c,'#FFFFFF',.25)}" stroke="${e}" stroke-width=".6"/>`,
 vest:(c,e,badge)=>`<path d="M37.6 57 Q31 70 34 82 Q50 88 66 82 Q69 70 62.4 57 L56 55 L50 66 L44 55Z" fill="${c}" stroke="${e}" stroke-width=".7"/><path d="M34.6 74 Q50 79 65.4 74" stroke="${e}" stroke-width="2.4" fill="none"/>${badge||''}`,
 stetho:`<path d="M42 57 Q40 68 47 70 M58 57 Q60 68 53 70" stroke="#4A5A8A" stroke-width="1.8" fill="none"/><path d="M47 70 Q50 72 53 70" stroke="#4A5A8A" stroke-width="1.8" fill="none"/><path d="M50 71 V77" stroke="#4A5A8A" stroke-width="1.8"/><circle cx="50" cy="79" r="2.8" fill="#C8D2E8" stroke="#7A86A8" stroke-width="1.1"/>`,
 bow:(c)=>`<path d="M50 57.6 L43.6 54 V61.4Z M50 57.6 L56.4 54 V61.4Z" fill="${c}"/><circle cx="50" cy="57.6" r="1.9" fill="${mixc(c,'#000000',.2)}"/>`,
 apron:(c,e)=>`<path d="M41 59 H59 V84 Q50 87 41 84Z" fill="${c}" stroke="${e}" stroke-width=".7"/><path d="M41 59 L39 55 M59 59 L61 55" stroke="${c}" stroke-width="2"/>${[[45,66,'#FF8A80'],[54,63,'#4FC4AE'],[48,76,'#FFCB4D'],[56,74,'#7EC6F0'],[43,79,'#A99BE8']].map(([x,y,cc])=>`<path d="M${x} ${y} q2 -2.6 3.6 0 q1.4 2.4 -1 3.4 q-3 .6 -2.6 -3.4Z" fill="${cc}"/>`).join('')}`};
const PROP={
 clipboard:(x,y)=>`<g transform="translate(${x} ${y}) rotate(8)"><rect x="-7" y="-9" width="14" height="18" rx="1.6" fill="#C8925A"/><rect x="-5.4" y="-6.6" width="10.8" height="14" rx="1" fill="#FFFFFF"/><rect x="-3" y="-10.6" width="6" height="3.4" rx="1" fill="#8A96B8"/><path d="M-3.4 -2 H3.4 M-3.4 1.4 H3.4 M-3.4 4.6 H1.4" stroke="#BFD8F0" stroke-width="1.1"/><path d="${heartP(2.8,-3.6,1.6)}" fill="#FF8A80"/></g>`,
 toothbrush:(x,y)=>`<g transform="translate(${x} ${y}) rotate(-28)"><rect x="-2" y="-4" width="4" height="22" rx="2" fill="#7EC6F0"/><rect x="-2" y="-4" width="1.4" height="22" rx=".7" fill="#FFFFFF" opacity=".5"/><rect x="-3" y="-15" width="6" height="11" rx="1.4" fill="#4A9AD0"/>${[-12,-9,-6].map(yy=>`<path d="M-3 ${yy} h-4" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>`).join('')}<path d="M-7 -14 Q-10 -18 -6 -20 Q-2 -18 -4 -14Z" fill="#BFF0FF"/></g>`,
 radio:(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-4.4" y="-7" width="8.8" height="14" rx="2" fill="#4A5A6A"/><rect x="-3" y="-4.6" width="6" height="4" rx="1" fill="#8AF0B0"/><path d="M2 -7 V-13" stroke="#4A5A6A" stroke-width="1.6" stroke-linecap="round"/><circle cx="0" cy="3" r="1.2" fill="#FFCB4D"/></g>`,
 palette:(x,y)=>`<g transform="translate(${x} ${y}) rotate(-12)"><path d="M0 -10 Q12 -10 12 0 Q12 5 7 5 Q3 5 3 8 Q3 11 0 11 Q-12 11 -12 0 Q-12 -10 0 -10Z" fill="#F2D2A0" stroke="#C89A5A" stroke-width="1"/><ellipse cx="-3" cy="5" rx="2.4" ry="1.8" fill="#FFFFFF" stroke="#C89A5A" stroke-width=".6"/>${[[-6,-4,'#FF6F6F'],[-1,-6.4,'#FFCB4D'],[5,-5,'#4FC4AE'],[7,0,'#5A9AF0'],[-7,2,'#B89CFF']].map(([a,b,c])=>`<circle cx="${a}" cy="${b}" r="2.2" fill="${c}"/>`).join('')}</g>`,
 brush:(x,y,c='#FF8A80')=>`<g transform="translate(${x} ${y}) rotate(30)"><rect x="-1.4" y="-4" width="2.8" height="18" rx="1.4" fill="#C8925A"/><rect x="-1.8" y="-7" width="3.6" height="4" fill="#C8CCDA"/><path d="M-1.8 -7 Q0 -15 1.8 -7Z" fill="${c}"/></g>`,
 guide:(x,y)=>`<g transform="translate(${x} ${y}) rotate(-8)"><rect x="-8" y="-6" width="16" height="12" rx="1.4" fill="#FFFFFF" stroke="#C8962A" stroke-width="1"/><path d="M0 -6 V6" stroke="#C8962A" stroke-width=".8"/><rect x="-6" y="-3.6" width="4.6" height="4" fill="#FF8A80"/><rect x="2" y="-3.6" width="4.6" height="4" fill="#4FC4AE"/><path d="M-6 3 H-2 M2 3 H6" stroke="#C9D8F0" stroke-width=".9"/></g>`,
 books:(x,y)=>`<g transform="translate(${x} ${y})">${[['#FF8A80',0],['#4FC4AE',-4.6],['#FFCB4D',-9.2]].map(([c,yy],k)=>`<rect x="${-9+k}" y="${yy-4}" width="${18-k*2}" height="4.4" rx="1" fill="${c}"/><rect x="${-9+k}" y="${yy-4}" width="2" height="4.4" fill="#FFFFFF" opacity=".45"/>`).join('')}</g>`};

// --- 鴿子站務員嚕嚕（pigeon41）：灰藍色圓滾滾、脖子一圈綠紫亮羽毛、橘色小腳；深藍制服外套（兩排金扣子）、深藍大盤帽＋金色小星星、白色名牌（只有色塊）；一隻翅膀指路，一隻翅膀拿小路線圖 ---
function pigeonAN(){const g=uid('pg');const c='#B9BEDA',c2='#8E94BC',lt='#DCDFF0';
 return `<defs>${rg(g+'b',[[0,lt],[.6,c],[1,c2]],.38,.3,.8)}${lg(g+'n',[[0,'#7FD6B0'],[.5,'#9A86E0'],[1,'#7FD6B0']],1,0)}${lg(g+'v',[[0,'#3E5A8E'],[1,'#26396A']])}</defs>${shd(50,96,20,3.4)}
 <path d="M38 84 L28 94 L36 92 L40 96 L44 86Z" fill="${c2}"/>
 <path d="M44 86 V93 M56 86 V93" stroke="#FF9A4A" stroke-width="2.6" stroke-linecap="round"/><path d="M40 94 h8 M52 94 h8" stroke="#FF9A4A" stroke-width="2.2" stroke-linecap="round"/>
 <ellipse cx="50" cy="70" rx="19" ry="20" fill="url(#${g}b)"/>
 <path d="M33.6 62 Q30 74 35 84 Q50 91 65 84 Q70 74 66.4 62 Q60 57 50 57 Q40 57 33.6 62Z" fill="url(#${g}v)"/>
 <path d="M43 57.6 L50 66 L57 57.6" fill="#FFFFFF"/><path d="M43 57.6 L47 70 L50 66 M57 57.6 L53 70 L50 66" fill="#33508A" stroke="#1E2E56" stroke-width=".6"/>
 ${[69,75,81].map(y=>`<circle cx="46" cy="${y}" r="1.4" fill="${C7.gold}"/><circle cx="54" cy="${y}" r="1.4" fill="${C7.gold}"/>`).join('')}
 <rect x="56.6" y="64.6" width="8" height="4" rx="1" fill="#FFFFFF"/><rect x="57.6" y="65.6" width="2.4" height="2" fill="${C7.mint}"/>
 <g transform="rotate(-14 28 78)"><rect x="18" y="72" width="16" height="12" rx="1.6" fill="#FFFFFF" stroke="#C8CCDA" stroke-width=".8"/><path d="M20 81 L24 76 L28 79 L32 74" stroke="${C7.mint}" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="20" cy="81" r="1.3" fill="${C7.coral}"/><circle cx="32" cy="74" r="1.3" fill="${C7.gold}"/></g>
 <path d="M34 64 Q22 70 24 80 Q30 84 36 76Z" fill="${c}"/><path d="M26 74 Q29 79 34 78" stroke="${c2}" stroke-width="1.1" fill="none"/>
 <g class="rd4sw" style="animation-duration:2.4s;transform-origin:66px 62px"><path d="M66 62 Q78 56 86 44 Q78 42 64 54Z" fill="${c}"/><path d="M86 44 Q80 48 72 50 M84 47 Q78 52 70 54" stroke="${c2}" stroke-width="1.1" fill="none"/></g>
 <path d="M40 52 Q50 60 60 52 L60 46 Q50 52 40 46Z" fill="url(#${g}n)"/>
 <circle cx="50" cy="33" r="17" fill="url(#${g}b)"/>
 <ellipse cx="50" cy="35.6" rx="3.4" ry="1.8" fill="#F4F2FA"/><path d="M46.4 37 Q50 35.6 53.6 37 Q52 41.6 50 42.4 Q48 41.6 46.4 37Z" fill="#E8A08A"/>
 ${eyes2(44,56,31,3.4,3.9)}<circle cx="44" cy="31" r="4.6" fill="none" stroke="#FFB36A" stroke-width=".9" opacity=".8"/><circle cx="56" cy="31" r="4.6" fill="none" stroke="#FFB36A" stroke-width=".9" opacity=".8"/>
 ${cheek(40,39,3,'#FF9FB8',.5)}${cheek(60,39,3,'#FF9FB8',.5)}${smile(50,44.6,2.4,1.4,'#6A4A5A',1.1)}
 <path d="M32 24 Q32 10 50 9 Q68 10 68 24 Q60 20 50 20 Q40 20 32 24Z" fill="url(#${g}v)"/><path d="M30 24 Q50 17 70 24 L70.6 27.6 Q50 21.6 29.4 27.6Z" fill="#1E2E56"/><path d="M38 26.4 Q50 22.6 62 26.4 Q58 31 50 31 Q42 31 38 26.4Z" fill="#14203E"/>
 <g class="rd4tw" style="animation-duration:3s"><path d="${star5(50,15.6,3.6)}" fill="${C7.gold}"/></g><path d="M37 15 Q43 12 47 12" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity=".4" stroke-linecap="round"/>`}
// --- 貓頭鷹館員書書（owl42）：遊戲原本的貓頭鷹為底，金框圓眼鏡、綠色針織背心、館員名牌（色塊），一邊抱三本繪本、一邊羽毛放在嘴前「噓～」（溫柔的笑） ---
function owlLibAN(){const vest=`<path d="M27 52 Q24 72 34 86 L45 86 L46 62 Q38 54 27 52Z M73 52 Q76 72 66 86 L55 86 L54 62 Q62 54 73 52Z" fill="#5AAE6A" stroke="#3E8A4E" stroke-width=".8"/>${[60,66,72,78].map(y=>`<path d="M${30+(y-60)*.1} ${y} q2 2 4 0 q2 2 4 0 M${62-(y-60)*.1} ${y} q2 2 4 0 q2 2 4 0" stroke="#8ED09A" stroke-width=".8" fill="none"/>`).join('')}<rect x="57" y="66" width="9" height="5" rx="1" fill="#FFFFFF"/><rect x="58" y="67" width="3" height="3" fill="${C7.coral}"/>`;
 const shh=`<path d="M76 70 Q74 56 62 50 Q56 47 54.6 49.6 Q54 52 58 53 Q66 57 68 72Z" fill="#8E70C8"/><path d="M56 50.4 L52.6 49.4 M56.6 52.4 L53.4 52.8" stroke="#8E70C8" stroke-width="2.4" stroke-linecap="round"/><path d="M70 62 Q66 58 62 56" stroke="#B9A0E8" stroke-width="1" fill="none"/>`;
 const glasses=`<g fill="none" stroke="#E0A830" stroke-width="1.9"><circle cx="39.6" cy="38.4" r="10"/><circle cx="60.4" cy="38.4" r="10"/><path d="M49.6 38 Q50 36.4 50.4 38"/></g><path d="M33 33 Q36 30 40 30.6 M54 33 Q57 30 61 30.6" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".8" stroke-linecap="round"/>`;
 try{if(typeof G.fullBody==='function')return G.fullBody('owl',{front:vest+PROP.books(26,80)+glasses+shh}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}catch(e){}
 return `<circle cx="50" cy="44" r="26" fill="#9F82D6"/>${eyes2(41,59,40,5,5.6)}`}
// --- 小書蟲翻翻（bookworm42）：淺綠、四節圓圓的身體、大頭、紅臉頰、紅色小毛帽；站起來抱著一本打開的書（沒有蟲腳） ---
function bookwormAN(){const g=uid('bw');const c='#B8E07A',c2='#86BE52',lt='#E8F8C0';
 const seg=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.92}" fill="url(#${g}s)"/><circle cx="${n(x-r*.35)}" cy="${n(y-r*.4)}" r="${n(r*.26)}" fill="#FFFFFF" opacity=".4"/>`;
 return `<defs>${rg(g+'s',[[0,lt],[.6,c],[1,c2]],.38,.32,.75)}${lg(g+'p',[[0,'#FFFFFF'],[1,'#F2EAD8']])}</defs>${shd(50,96,20,3.4)}
 ${seg(60,88,9)}${seg(54,78,10)}${seg(50,67,11)}${seg(50,56,11.4)}
 <circle cx="50" cy="34" r="19" fill="url(#${g}s)"/>
 <path d="M31 30 Q30 12 50 11 Q70 12 69 30 Q60 24 50 24 Q40 24 31 30Z" fill="#E8505A"/><path d="M30 29 Q50 21 70 29 L70 33 Q50 25 30 33Z" fill="#C83A48"/>${[34,40,46,52,58,64].map(x=>`<path d="M${x} 30 V${x<50?26:26}" stroke="#F47A84" stroke-width="1" opacity=".7"/>`).join('')}<circle cx="50" cy="10" r="4" fill="#FFFFFF"/><path d="M38 18 Q44 14 50 14" stroke="#FF8A94" stroke-width="1.4" fill="none" stroke-linecap="round"/>
 ${eyes2(43,57,37,3.6,4.2)}${cheek(36,44,3.8,'#FF7A8A',.6)}${cheek(64,44,3.8,'#FF7A8A',.6)}${smile(50,45,3,2.4)}
 <g transform="rotate(-6 50 72)"><path d="M50 64 Q40 60 30 63 V80 Q40 77 50 81Z" fill="url(#${g}p)" stroke="#E2D2B0" stroke-width="1"/><path d="M50 64 Q60 60 70 63 V80 Q60 77 50 81Z" fill="url(#${g}p)" stroke="#E2D2B0" stroke-width="1"/><path d="M33 67 H46 M33 71 H46 M33 75 H44 M54 67 H67 M54 71 H65" stroke="#C9D8F0" stroke-width="1"/><circle cx="61" cy="75" r="2.4" fill="${C7.coral}"/><path d="M30 80 Q40 77 50 81 Q60 77 70 80 V82.4 Q60 79.4 50 83.4 Q40 79.4 30 82.4Z" fill="#7EC6F0"/>
  <ellipse cx="30.6" cy="71" rx="3.4" ry="4" fill="${c}"/><ellipse cx="69.4" cy="71" rx="3.4" ry="4" fill="${c}"/></g>`}
// --- 河馬醫生波波（hippo43）：淡紫灰、小圓耳朵、大嘴巴溫和的笑；白袍（袖口捲起）、淺藍聽診器（星星形狀的聽頭）、口袋插筆和星星貼紙；手掌朝上 ---
function hippoAN(){const g=uid('hp');const c='#B9AEDC',c2='#958ABF',mz='#F0CFE0';
 const head=`<defs>${rg(g+'h',[[0,mixc(c,'#FFFFFF',.4)],[.6,c],[1,c2]],.4,.3,.8)}${rg(g+'m',[[0,'#FFE8F2'],[1,mz]],.45,.3,.8)}</defs>
 <circle cx="33" cy="14" r="5" fill="${c}"/><circle cx="67" cy="14" r="5" fill="${c}"/><circle cx="33" cy="14.4" r="2.6" fill="#F4B8CC"/><circle cx="67" cy="14.4" r="2.6" fill="#F4B8CC"/>
 <ellipse cx="50" cy="28" rx="21" ry="18" fill="url(#${g}h)"/>
 <ellipse cx="50" cy="43" rx="24" ry="15" fill="url(#${g}m)"/>
 <ellipse cx="42" cy="36" rx="2.4" ry="1.7" fill="#9A6A8A"/><ellipse cx="58" cy="36" rx="2.4" ry="1.7" fill="#9A6A8A"/>
 ${eyes2(42,58,25,3.4,4)}${cheek(30,40,3.6)}${cheek(70,40,3.6)}
 <path d="M38 46 Q50 56 62 46" stroke="#7A4A6A" stroke-width="1.7" fill="#FF9FB4" stroke-linecap="round"/><path d="M45.6 47.6 h3.6 v2.4 q0 1 -1 1 h-1.6 q-1 0 -1 -1Z M50.8 47.6 h3.6 v2.4 q0 1 -1 1 h-1.6 q-1 0 -1 -1Z" fill="#FFFFFF"/>`;
 const steth=`<path d="M42 57 Q40 68 47 70 M58 57 Q60 68 53 70" stroke="#7EC6F0" stroke-width="2" fill="none"/><path d="M47 70 Q50 72 53 70 M50 71 V76" stroke="#7EC6F0" stroke-width="2" fill="none"/><path d="${star5(50,79,4.2)}" fill="#DDF0FF" stroke="#5AA6D0" stroke-width="1"/>`;
 const pocket=`<path d="M58 70 V66" stroke="${C7.coral}" stroke-width="1.6" stroke-linecap="round"/><path d="${star5(60.6,75,1.8)}" fill="${C7.gold}"/>`;
 const palm=`<ellipse cx="74" cy="68" rx="5.4" ry="3" fill="#D8D0F0"/><path d="M70 66.6 Q74 64.6 78 66.6" stroke="${c2}" stroke-width=".8" fill="none"/>`;
 const cuff=`<path d="M28.6 76.4 Q32 74.6 35.6 76.4 M68.4 69 Q72 67 75.6 69" stroke="#E2E8F4" stroke-width="3" stroke-linecap="round"/>`;
 return body7({c,c2,belly:'',hand:mixc(c,'#FFFFFF',.15),feet:c2,pose:'side',sleeve:'#FFFFFF',outfit:OUT.labcoat()+steth+pocket,front:cuff+palm,head})}
// --- 小鱷魚牙醫咔咔（croc43）：亮綠、短短胖胖、圓眼睛、背上圓圓的小凸點；笑開一排白白圓圓的牙齒；淺藍口罩拉到下巴、頭上圓圓的小反光鏡頭燈、大牙刷 ---
function crocAN(){const g=uid('cr');const c='#62C85C',c2='#3E9E44',bl='#E6F6C4';
 const head=`<defs>${rg(g+'h',[[0,mixc(c,'#FFFFFF',.38)],[.6,c],[1,c2]],.4,.3,.85)}</defs>
 <circle cx="38" cy="18" r="9" fill="url(#${g}h)"/><circle cx="62" cy="18" r="9" fill="url(#${g}h)"/>
 <path d="M24 36 Q22 22 36 22 H64 Q78 22 76 36 Q76 50 50 52 Q24 50 24 36Z" fill="url(#${g}h)"/>
 <path d="M28 42 Q50 50 72 42 Q70 50 50 52 Q30 50 28 42Z" fill="${bl}"/>
 ${eyes2(38,62,17.6,3.6,4.2)}
 <ellipse cx="44" cy="28" rx="1.4" ry="1" fill="${c2}"/><ellipse cx="56" cy="28" rx="1.4" ry="1" fill="${c2}"/>
 <path d="M30 37 Q50 47 70 37 Q66 44 50 45 Q34 44 30 37Z" fill="#7A3A3A"/>${[35,40.4,45.8,51.2,56.6,62].map((x,k)=>`<path d="M${x} ${n(38.6+Math.sin(k/5*Math.PI)*3.6)} h4 v1.6 a2 2 0 0 1 -4 0Z" fill="#FFFFFF"/>`).join('')}
 <path d="M32 44.4 Q50 54 68 44.4 L67 49 Q50 56.6 33 49Z" fill="#A8DCF4" stroke="#6AB0D8" stroke-width=".8"/><path d="M32 46 L26 42 M68 46 L74 42" stroke="#6AB0D8" stroke-width="1"/>
 ${cheek(27,33,3.4)}${cheek(73,33,3.4)}
 <path d="M30 12 Q50 2 70 12" stroke="#8A96B8" stroke-width="2.2" fill="none"/><circle cx="50" cy="7.6" r="5.4" fill="#E8F4FF" stroke="#8A96B8" stroke-width="1.2"/><circle cx="48.6" cy="6.2" r="1.8" fill="#FFFFFF"/>
 ${[[44,23],[50,22],[56,23]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="${c2}" opacity=".45"/>`).join('')}`;
 const tail=`<path d="M62 84 Q78 88 86 80 Q90 76 86 74 Q82 80 66 78Z" fill="${c2}"/>${[70,76,82].map(x=>`<circle cx="${x}" cy="${n(82-(x-70)*.4)}" r="1.8" fill="${c}"/>`).join('')}`;
 const back=`${[[36,58],[33,66],[64,58],[67,66]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="${c2}"/>`).join('')}`;
 return body7({c,c2,belly:bl,hand:mixc(c,'#FFFFFF',.15),feet:c2,pose:'wave',back,coat:'#FFFFFF',coat2:'#D8E8F0',sleeve:'#FFFFFF',outfit:OUT.labcoat('#FFFFFF','#C8DCE8'),prop:PROP.toothbrush(74,44),tail,head})}
// --- 孔雀館長羽羽（peacock45）：寶藍身體、三根小冠羽；尾巴半開成扇形，「眼睛」花紋是一個一個小小的彩色畫框；金色小領結、金色星星胸針；一隻翅膀往旁邊伸「請進」 ---
function peacockAN(){const g=uid('pc');const c='#4A86E0',c2='#2E5EB8';
 let fan=`<defs>${rg(g+'f',[[0,'#8FE0B0'],[.6,'#3EAE8A'],[1,'#2A8A70']],.5,1,1)}${rg(g+'h',[[0,'#8AB8F4'],[.6,c],[1,c2]],.4,.3,.8)}</defs><g class="rd4sw" style="animation-duration:5s;transform-origin:50px 78px"><path d="M50 78 L4 56 Q2 22 28 8 Q50 -2 72 8 Q98 22 96 56Z" fill="url(#${g}f)"/>`;
 const FC=['#FF6F6F','#FFCB4D','#6CD08A','#B89CFF'];
 for(let k=0;k<11;k++){const a=(-162+k*14.4)*Math.PI/180,r=42;const x=50+Math.cos(a)*r,y=76+Math.sin(a)*r*1.45;const rot=n(a*180/Math.PI+90);
  fan+=`<path d="M50 74 L${n(x)} ${n(y)}" stroke="#6AC89A" stroke-width=".8" opacity=".7"/><g transform="translate(${n(x)} ${n(y)}) rotate(${rot})"><rect x="-5.4" y="-6.4" width="10.8" height="12.8" rx="1.2" fill="#F2C94A"/><rect x="-3.6" y="-4.6" width="7.2" height="9.2" fill="${FC[k%4]}"/><circle cx="0" cy="0" r="1.6" fill="#FFFFFF" opacity=".7"/></g>`}
 fan+='</g>';
 const head=`<path d="M45 58 Q44 46 48 40 L54 40 Q57 48 55 58Z" fill="url(#${g}h)"/>
 <path d="M47 18 Q44 8 40 4 M50 17 V2 M53 18 Q56 8 60 4" stroke="${c2}" stroke-width="1.2" fill="none"/>${[[40,4],[50,2],[60,4]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="3.4" fill="#3EC8A8"/><circle cx="${x}" cy="${y}" r="1.2" fill="#2A3A8A"/>`).join('')}
 <ellipse cx="50" cy="30" rx="15" ry="14" fill="url(#${g}h)"/>
 <path d="M38 28 Q42 21 48 26 Q44 34 38 31Z M62 28 Q58 21 52 26 Q56 34 62 31Z" fill="#FFFFFF"/>
 `;
 return body7({c,c2,belly:'#7FB0F0',hand:'#5A96E8',feet:'#C8A880',pose:'side',back:fan,outfit:OUT.bow(C7.gold)+`<path d="${star5(57,68,3)}" fill="${C7.gold}" stroke="#E0962A" stroke-width=".6"/>`,front:`<path d="M66 64 Q76 62 82 68 Q76 72 68 70Z" fill="${c}"/><path d="M74 66 l8 1 M74 69 l7 2" stroke="${c2}" stroke-width=".8"/>`,head:head+eyes2(44,56,28,2.8,3.4)+`<path d="M48 33 Q50 31 52 33 L50 38Z" fill="#E8C888"/>${cheek(39,35,2.6)}${cheek(61,35,2.6)}`,sh:30})}
// --- 變色龍小畫家變變（chameleon45）：淺綠、捲成一圈的尾巴、大圓眼睛（圓錐形眼皮）、身上淡淡的粉黃藍斑點（會換顏色）；紅貝雷帽、沾了顏料的白色小罩衫、調色盤和畫筆 ---
function chamAN(){const g=uid('ch');const c='#9EE0A8',c2='#5AB86A';
 const spots=(o=0)=>[[40,22,'#FFB8D0'],[60,20,'#FFE68A'],[30,40,'#A8D8FF'],[70,42,'#FFB8D0'],[52,48,'#A8D8FF']].map(([x,y,cc],k)=>`<ellipse class="rd4tw" style="animation-delay:${k*.7}s;animation-duration:4s" cx="${x}" cy="${y}" rx="3.4" ry="2.6" fill="${cc}" opacity=".85"/>`).join('');
 const head=`<defs>${rg(g+'h',[[0,'#D2F6D6'],[.6,c],[1,c2]],.4,.3,.85)}${rg(g+'e',[[0,'#E2FAE6'],[1,c]],.4,.35,.7)}</defs>
 <path d="M26 34 Q24 18 44 16 Q56 10 66 18 Q78 24 76 36 Q74 50 52 52 Q30 52 26 34Z" fill="url(#${g}h)"/>${spots()}
 <path d="M24 30 L36 20 L46 30 L36 40Z" fill="url(#${g}e)" transform="rotate(-8 36 30)"/><path d="M54 30 L64 20 L76 30 L64 40Z" fill="url(#${g}e)" transform="rotate(8 64 30)"/>
 <circle cx="36" cy="30" r="8" fill="url(#${g}e)" stroke="${c2}" stroke-width="1.2"/><circle cx="64" cy="30" r="8" fill="url(#${g}e)" stroke="${c2}" stroke-width="1.2"/>
 ${eyes2(37,65,30,4,4.4)}
 ${openSmile(51,41,6,3.6)}${cheek(29,40,3.6)}${cheek(73,40,3.6)}
 <path d="M34 18 Q30 6 48 4 Q68 2 72 12 Q72 18 62 18 L40 19 Q34 19 34 18Z" fill="#E8505A"/><path d="M36 17 Q54 21 70 16 L70 19 Q54 24 36 20Z" fill="#B83440"/><path d="M50 4 Q50 0 53 1 Q54 3 52 4Z" fill="#B83440"/><path d="M40 10 Q46 6 54 5.6" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity=".45" stroke-linecap="round"/>`;
 const tail=`<path d="M62 84 Q80 86 84 76 Q88 64 78 62 Q70 62 71 69 Q72 74 77 72 Q80 70 78 67" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 84 Q80 86 84 76" stroke="${c2}" stroke-width="1.4" fill="none" opacity=".5"/>`;
 const smock=`<path d="M37 57 Q30 70 33 85 Q50 90 67 85 Q70 70 63 57 Q50 53 37 57Z" fill="#FFFFFF" stroke="#DCE2EC" stroke-width=".8"/><path d="M44 56 Q50 61 56 56" stroke="#DCE2EC" stroke-width="1.2" fill="none"/>${[[42,68,'#FF6F6F'],[56,64,'#FFCB4D'],[48,78,'#5A9AF0'],[60,76,'#B89CFF'],[52,70,'#4FC4AE']].map(([x,y,cc],k)=>blob(x,y,1.6,cc,k*40)).join('')}`;
 return body7({c,c2,belly:'',hand:'#B8EEC0',feet:c2,pose:'side',sleeve:'#FFFFFF',outfit:smock,prop:PROP.palette(30,78)+PROP.brush(74,66),tail,head}).replace(`<circle cx="32" cy="79" r="4.2"`,`<circle cx="32" cy="79" r="0"`)}
// --- 黑熊保育員阿森（keeper44）：遊戲原本的台灣黑熊為底；卡其色短袖制服（胸前兩個口袋、肩上兩條肩章）、同色圓邊帽、綠色掛繩名牌（色塊＋一片小葉子）、拿摺開的動物園地圖、腰上一個小無線電 ---
function keeperAN(){const k1='#D8BE84',k2='#B89A5E';
 const shirt=`<path d="M37 57 Q31 70 34 83 Q50 89 66 83 Q69 70 63 57 L56 55 L50 64 L44 55Z" fill="${k1}"/><path d="M44 55 L50 64 L56 55" fill="#F4EEE2"/><path d="M44 55 L47.6 62 L50 64 M56 55 L52.4 62 L50 64" stroke="${k2}" stroke-width=".8" fill="none"/>
  <rect x="40" y="64" width="7" height="6" rx="1" fill="${k1}" stroke="${k2}" stroke-width=".7"/><rect x="53" y="64" width="7" height="6" rx="1" fill="${k1}" stroke="${k2}" stroke-width=".7"/><path d="M40 66 H47 M53 66 H60" stroke="${k2}" stroke-width=".6"/>
  <rect x="36" y="56.6" width="7" height="2.4" rx="1" fill="${k2}" transform="rotate(-20 39 58)"/><rect x="57" y="56.6" width="7" height="2.4" rx="1" fill="${k2}" transform="rotate(20 61 58)"/>
  <path d="M45 56 L48 72 M55 56 L52 72" stroke="#3EA05A" stroke-width="1.4"/><rect x="46" y="71" width="8" height="9" rx="1.2" fill="#FFFFFF" stroke="#3EA05A" stroke-width=".8"/><path d="M50 74 Q47 77 50 79 Q53 77 50 74Z" fill="#5AB86A"/>
  <path d="M35 78 Q50 84 65 78" stroke="#8A6A3A" stroke-width="2.4" fill="none"/>${PROP.radio(39,82)}`;
 const hat=`<path d="M31 16 Q31 2 50 1 Q69 2 69 16Z" fill="${k1}"/><path d="M22 16 Q50 9 78 16 Q78 21 50 20 Q22 21 22 16Z" fill="${k2}"/><path d="M31 13 Q50 9 69 13" stroke="#8A6A3A" stroke-width="2" fill="none"/><path d="M38 6 Q44 3 50 3" stroke="#F2E2BA" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
 const map=`<g transform="translate(73 70) rotate(10)"><path d="M-9 -7 L-3 -9 L3 -7 L9 -9 V7 L3 9 L-3 7 L-9 9Z" fill="#E6F4D4" stroke="#8FBF5A" stroke-width=".9"/><path d="M-3 -9 V7 M3 -7 V9" stroke="#C8E0B0" stroke-width=".8"/><path d="M-6 5 Q-2 -2 6 -4" stroke="#FF8A80" stroke-width="1.1" fill="none" stroke-dasharray="1.6 1.2"/></g>`;
 try{if(typeof G.fullBody==='function')return G.fullBody('blackbear',{pose:'side',sleeve:k1,prop:map,hat:shirt.replace(PROP.radio(39,82),'')+hat+PROP.radio(38,84)+`<circle cx="32" cy="79" r="4.2" fill="#4A4356"/>`}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}catch(e){}
 return body7({c:'#3A3446',c2:'#26212F',hand:'#4A4356',feet:'#26212F',pose:'side',outfit:shirt,sleeve:k1,prop:map,hat,head:`<circle cx="50" cy="32" r="22" fill="#3A3446"/>`})}
// --- 兔兔護理師（bunny43，可選）：沿用兔子，加白色護理師小帽，帽上是粉紅色愛心（不用紅十字） ---
function bunnyNurseAN(){const cap=`<path d="M38 22 Q38 14 50 13 Q62 14 62 22 L60 25 Q50 22 40 25Z" fill="#FFFFFF" stroke="#E2DAEE" stroke-width=".8"/><path d="${heartP(50,18.6,3.4)}" fill="#FF8FB8"/>`;
 try{if(typeof G.fullBody==='function')return G.fullBody('bunny',{pose:'wave',hat:cap,outfit:`<path d="M41 60 H59 V82 Q50 86 41 82Z" fill="#FFFFFF" opacity=".9"/><path d="${heartP(50,66,2.6)}" fill="#FF8FB8"/>`}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}catch(e){}return ''}
const CH41={
 pigeon41:{f:pigeonAN,ch:41,name:'鴿子站務員嚕嚕',alt:'嚕嚕',newArt:1},
 owl42:{f:owlLibAN,ch:42,name:'貓頭鷹館員書書',alt:'書書',base:'owl'},
 bookworm42:{f:bookwormAN,ch:42,name:'小書蟲翻翻',alt:'翻翻',newArt:1},
 hippo43:{f:hippoAN,ch:43,name:'河馬醫生波波',alt:'波波',newArt:1},
 croc43:{f:crocAN,ch:43,name:'小鱷魚牙醫咔咔',alt:'咔咔',newArt:1},
 bunny43:{f:bunnyNurseAN,ch:43,name:'兔兔護理師（可選）',alt:'兔兔',base:'bunny',optional:1},
 keeper44:{f:keeperAN,ch:44,name:'黑熊保育員阿森',alt:'阿森',base:'blackbear'},
 redpanda44:{f:()=>G.RPANDA44STAND(),ch:44,name:'小貓熊環環',alt:'環環',newArt:1},
 peacock45:{f:peacockAN,ch:45,name:'孔雀館長羽羽',alt:'羽羽',newArt:1},
 chameleon45:{f:chamAN,ch:45,name:'變色龍小畫家變變',alt:'變變',newArt:1}};
Object.keys(CH41).forEach(k=>{const f0=CH41[k].f;CH41[k].svg=(a='')=>W7(f0(),a)});
G.CH41=CH41;

/* ================= m8sb_s8art 第八季「星光安全小隊」第四十六～五十章 美術 —— 2026-11-28 星光工作室 Starlight Studio =================
 * 著作權與 IP：本檔所有場景、角色（消防隊的斑點狗斑斑、黑熊警察、救生員海獺教練浪浪、橘貓小橘、小斑點狗……）、衣服、物品、圖樣都是星光工作室原創，
 * 著作權與 IP 屬於星光工作室 Starlight Studio。不用任何有版權的角色、品牌；不畫真實消防局、警察局的標誌、字和塗裝（消防車、警車都是原創簡化造型）。
 * 結構照第七季 m7b_s7art.js（把 41 換成 46）；介面說明 dev/art8_api.md：
 *   BG46.xxx(W,H)     場景（回傳 SVG 內容字串，不含 <svg> 外框；左右各多畫 400 給寬螢幕；沒有文字；H>W 直放時重新排版；上方中間留給題目卡、右下留給主角、中間留給答案卡）
 *   BG46_CH            每章的主場景；BG46_STORY 每章拆段故事的 3～4 張場景變化；BG46_OPEN 章節開場圖；BG46_FIN＝fin50 季完結大結局
 *   OBJ46[k]           題目物件 64×64；install46() 登記成 ICONART['i:s46'+k]，章節圓章 i:s46c46～i:s46c50、大地圖第十段 i:s46arc
 *   CH46[k].f(e)       新朋友 100×100 全身（腳 y≈94、影子 y=96）；e＝happy／talk
 *   PET46.spotdog46(a) 寵物小斑點狗 120×120（頭在 .pbhead，PET46.p19 給 pet19 成長用；配件錨點 anchor）；PET46.preview(st)；SPOTDOG46(e,a) 表情版；PET46.pose(act)；SPOTDOG46STAND() 朋友版
 *   S46                衣服 fireman46／b_fireman46、vest49／b_vest49、頭飾 firehat46／helmet49、房間 ROOM.escmap50／kit47、徽章 BADGE／MINI、獎狀 certHTML、hook()
 * 動畫只用遊戲現有的 rd4tw／rd4dr／rd4bob／rd4sw／blink；沒有整體放大縮小。火災只用小小的火和一點煙；沒有受傷、哭泣、可怕的畫面。
 * 開關：S46.LIVE；設 window.S8ART=false 可以整個換回暫代圖。 */
(function(G){'use strict';
const S46=G.S46={ver:'2026-11-28',LIVE:true};
const n=v=>(+v).toFixed(1);
// 遊戲裡的變數（DRESS、BFIT、princess……）在主程式的閉包裡，模組要用 window.__ev 拿
const EV=k=>{try{return typeof G.__ev==='function'?G.__ev(k):undefined}catch(e){return undefined}};
const rng=seed=>{let x=seed;return()=>{x=(x*9301+49297)%233280;return x/233280}};
const A=(c,dl,du,ex)=>` class="${c}" style="animation-delay:${dl}s${du?`;animation-duration:${du}s`:''}${ex?';'+ex:''}"`;
const T=(x,y,s,c,extra='')=>`<g transform="translate(${n(x)} ${n(y)}) scale(${(+s).toFixed(3)})"${extra}>${c}</g>`;
let U=0;const uid=p=>'s46'+p+(++U)+Math.random().toString(36).slice(2,5);
const stops=st=>st.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('');
const lg=(id,st,x2=0,y2=1,x1=0,y1=0)=>`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops(st)}</linearGradient>`;
const rg=(id,st,cx=.5,cy=.5,r=.5,fx,fy)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"${fx!=null?` fx="${fx}" fy="${fy}"`:''}>${stops(st)}</radialGradient>`;
const gl=(i,a,b,x2=0,y2=1)=>lg(i,[[0,a],[1,b]],x2,y2);
const star5=(cx,cy,R,r=R*.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,rr=i%2?r:R;d+=(i?'L':'M')+n(cx+rr*Math.cos(a))+' '+n(cy+rr*Math.sin(a))}return d+'Z'};
const spark=(cx,cy,r)=>`M${n(cx)} ${n(cy-r)}Q${n(cx+r*.16)} ${n(cy-r*.16)} ${n(cx+r)} ${n(cy)}Q${n(cx+r*.16)} ${n(cy+r*.16)} ${n(cx)} ${n(cy+r)}Q${n(cx-r*.16)} ${n(cy+r*.16)} ${n(cx-r)} ${n(cy)}Q${n(cx-r*.16)} ${n(cy-r*.16)} ${n(cx)} ${n(cy-r)}Z`;
const heartP=(cx,cy,s)=>`M${n(cx)} ${n(cy+s*.9)}C${n(cx-s*1.3)} ${n(cy+s*.1)} ${n(cx-s*.9)} ${n(cy-s*.9)} ${n(cx)} ${n(cy-s*.35)}C${n(cx+s*.9)} ${n(cy-s*.9)} ${n(cx+s*1.3)} ${n(cy+s*.1)} ${n(cx)} ${n(cy+s*.9)}Z`;
const mixc=(a,b,t)=>{const p=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16));const P=p(a),Q=p(b);return '#'+P.map((v,i)=>Math.round(v+(Q[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const sc=(W,H)=>{const P=H>W;return {P,s:P?Math.min(W/330,H/640):Math.min(W/800,H/450)}};
const shd=(cx,cy,rx,ry,op=.16,c='#2A2050')=>`<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${c}" opacity="${op}"/>`;
const R=(x,y,w,h,f,rx=0,ex='')=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx?` rx="${n(rx)}"`:''} fill="${f}"${ex}/>`;
const cloud=(x,y,s,c='#FFFFFF',op=1)=>T(x,y,s,`<path d="M-60 0 Q-62 -22 -38 -24 Q-30 -46 -6 -40 Q8 -58 30 -42 Q56 -46 56 -22 Q76 -18 70 0Z" fill="${c}" opacity="${op}"/><path d="M-52 -4 Q-20 2 60 -4" stroke="#DCE6F4" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>`);
// 第七季的城市配色（虛構，不是任何真實捷運或場館）：薄荷綠、珊瑚粉、星星金、淡紫
const C7={mint:'#4FC4AE',mintL:'#BFEFE3',coral:'#FF8A80',coralD:'#E2635C',gold:'#FFCB4D',lav:'#A99BE8',sky:'#7EC6F0',ink:'#3A3150'};
// 第八季的安全小隊配色（虛構）：消防紅、警察藍、泳池藍綠、草地綠、星星金
const C8={red:'#F0604A',redD:'#C8432F',redL:'#FF9A80',blue:'#4A72C8',blueD:'#2E4E9A',blueL:'#9EC0F2',aqua:'#4CC8E0',aquaL:'#BFF0F8',green:'#6CC46A',greenD:'#4A9A4A',gold:'#FFCB4D',goldD:'#E0A030',neon:'#D8F04A',neonD:'#B8D02A',mint:'#4FC4AE',coral:'#FF8A80',lav:'#A99BE8',sky:'#7EC6F0',ink:'#3A3150',exit:'#3CC07A'};
const BOYH=()=>{try{return G.HERO==='prince'}catch(e){return false}};
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

/* ===================== 場景共用小零件（第八季：春末到夏天，明亮有精神） ===================== */
const skySum=(g)=>lg(g,[[0,'#6EC4F4'],[.55,'#BDE6FA'],[1,'#F2FAEE']]);
const sunP=(x,y,s)=>`<g${A('rd4tw',0,5)}><circle cx="${n(x)}" cy="${n(y)}" r="${n(34*s)}" fill="#FFF6C8" opacity=".45"/></g><circle cx="${n(x)}" cy="${n(y)}" r="${n(22*s)}" fill="#FFE27A"/><circle cx="${n(x-6*s)}" cy="${n(y-6*s)}" r="${n(7*s)}" fill="#FFFFFF" opacity=".5"/>`;
// 夏天的綠樹（樹冠：暗面、亮面、亮點）
const GTC=[['#7CC860','#58A048','#B8E888'],['#6AB858','#4A9040','#A8E080'],['#8CD068','#62A84C','#C8F098']];
function gtree(x,y,s,k=0,trunk='#9A6A42'){const [c1,c2,c3]=GTC[k%3];const g=uid('gt');
 return `<defs>${rg(g,[[0,c3],[.55,c1],[1,c2]],.38,.3,.75)}</defs>`+shd(x,y+2*s,30*s,5*s,.14)
 +`<path d="M${n(x-5*s)} ${n(y)} L${n(x-3*s)} ${n(y-36*s)} L${n(x+3*s)} ${n(y-36*s)} L${n(x+5*s)} ${n(y)}Z" fill="${trunk}"/>`
 +`<path d="M${n(x-38*s)} ${n(y-52*s)} Q${n(x-44*s)} ${n(y-82*s)} ${n(x-18*s)} ${n(y-90*s)} Q${n(x-6*s)} ${n(y-114*s)} ${n(x+18*s)} ${n(y-102*s)} Q${n(x+44*s)} ${n(y-100*s)} ${n(x+40*s)} ${n(y-74*s)} Q${n(x+52*s)} ${n(y-54*s)} ${n(x+28*s)} ${n(y-42*s)} Q${n(x)} ${n(y-32*s)} ${n(x-20*s)} ${n(y-40*s)} Q${n(x-42*s)} ${n(y-38*s)} ${n(x-38*s)} ${n(y-52*s)}Z" fill="url(#${g})"/>`
 +[[-18,-84,6],[6,-96,5],[-28,-62,4],[22,-70,4.4]].map(([dx,dy,r])=>`<circle cx="${n(x+dx*s)}" cy="${n(y+dy*s)}" r="${n(r*s)}" fill="${c3}" opacity=".75"/>`).join('')}
const bush=(x,y,s,c='#6CC46A',fl)=>`${shd(x,y,30*s,4*s,.12)}<path d="M${n(x-30*s)} ${n(y)} Q${n(x-34*s)} ${n(y-20*s)} ${n(x-16*s)} ${n(y-22*s)} Q${n(x-8*s)} ${n(y-36*s)} ${n(x+8*s)} ${n(y-28*s)} Q${n(x+26*s)} ${n(y-32*s)} ${n(x+30*s)} ${n(y)}Z" fill="${c}"/><path d="M${n(x-20*s)} ${n(y-16*s)} Q${n(x-10*s)} ${n(y-26*s)} ${n(x)} ${n(y-22*s)}" stroke="#FFFFFF" stroke-width="${n(2*s)}" fill="none" opacity=".3" stroke-linecap="round"/>`
 +(fl?[[-16,-14],[4,-22],[18,-10]].map(([dx,dy],k)=>`<circle cx="${n(x+dx*s)}" cy="${n(y+dy*s)}" r="${n(3.4*s)}" fill="${['#FF9AC8','#FFE27A','#FFFFFF'][k]}"/>`).join(''):'');
function flowers(x0,x1,y,s,seed){const r=rng(seed);let d='';for(let x=x0;x<x1;x+=(18+r()*26)*s){const yy=y+r()*8*s,c=['#FF9AC8','#FFE27A','#FFFFFF','#B89CFF','#FF8A80'][Math.floor(r()*5)];
 d+=`<path d="M${n(x)} ${n(yy)} V${n(yy-8*s)}" stroke="#5AA04A" stroke-width="${n(1.4*s)}"/>`+[0,72,144,216,288].map(a=>`<ellipse cx="${n(x)}" cy="${n(yy-10.4*s)}" rx="${n(1.8*s)}" ry="${n(2.6*s)}" fill="${c}" transform="rotate(${a} ${n(x)} ${n(yy-8*s)})"/>`).join('')+`<circle cx="${n(x)}" cy="${n(yy-8*s)}" r="${n(1.4*s)}" fill="#FFCB4D"/>`}return d}
// 小小的火（一小簇，不兇）＋一點點灰白的煙
const flameS=(x,y,s)=>T(x,y,s,`<g${A('rd4bob',0,1.2)}><path d="M0 0 Q-10 -2 -9 -12 Q-8 -20 -2 -26 Q0 -18 4 -16 Q6 -22 5 -28 Q14 -20 12 -8 Q10 0 0 0Z" fill="#FF8A4A"/><path d="M0 -1 Q-5 -2 -4 -9 Q-3 -13 0 -16 Q2 -10 5 -9 Q6 -3 0 -1Z" fill="#FFD84A"/></g>`);
const smokeS=(x,y,s,op=.5)=>`<g${A('rd4dr',0,6)}>${[[0,0,14],[16,-6,11],[30,-2,9],[-14,-4,10]].map(([dx,dy,r])=>`<circle cx="${n(x+dx*s)}" cy="${n(y+dy*s)}" r="${n(r*s)}" fill="#C8CCD8" opacity="${op}"/>`).join('')}</g>`;
// 綠色逃生指示燈（跑步的小人＋門＋箭頭；沒有字）
const exitSign=(x,y,s,dir=1)=>T(x,y,s,`<rect x="-26" y="-12" width="52" height="24" rx="3" fill="${C8.exit}"/><rect x="-24" y="-10" width="48" height="20" rx="2" fill="#4AD890"/><rect x="-21" y="-8" width="10" height="16" fill="#FFFFFF"/><g transform="scale(${dir} 1)"><circle cx="2" cy="-5" r="2.6" fill="#FFFFFF"/><path d="M1 -2 L-3 4 M1 -2 L5 3 M0 0 L-5 -1 M1 1 L7 -1" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/><path d="M10 0 H20 M16 -4 L20 0 L16 4" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g><rect x="-26" y="-12" width="52" height="5" rx="2" fill="#FFFFFF" opacity=".2"/>`);
// 天花板的偵煙警報器（白色圓盤＋小紅燈）
const alarmS=(x,y,s)=>T(x,y,s,`<ellipse cx="0" cy="0" rx="16" ry="6" fill="#FFFFFF"/><path d="M-16 0 Q-16 8 0 8 Q16 8 16 0" fill="#E2E6EE"/><circle cx="7" cy="3" r="1.8" fill="#FF6A5A"/>${[-8,-4,0].map(dx=>`<path d="M${dx} 2 V5" stroke="#C8CCD8" stroke-width="1"/>`).join('')}`);
// 原創消防車（側面）：紅色車身、白色腰帶、金色星星、梯子、藍色小燈；沒有字
function fireTruck(x,y,s,o={}){const g=uid('ft');const L=o.flip?-1:1;
 return T(x,y,s,`<g transform="scale(${L} 1)"><defs>${lg(g,[[0,'#FF7A60'],[.6,C8.red],[1,C8.redD]])}</defs>${shd(0,4,128,8,.18)}
 <path d="M-120 -10 V-74 Q-120 -82 -112 -82 H40 V-10Z" fill="url(#${g})"/><path d="M40 -10 V-92 Q40 -100 48 -100 H96 Q110 -100 116 -84 L126 -54 V-10Z" fill="url(#${g})"/>
 <path d="M50 -90 H94 Q104 -90 108 -80 L114 -60 H50Z" fill="#BFE6FA"/><path d="M56 -88 L72 -88 L62 -62 L52 -62Z" fill="#FFFFFF" opacity=".4"/>
 <rect x="-120" y="-40" width="246" height="9" fill="#FFFFFF"/><rect x="-120" y="-31" width="246" height="4" fill="${C8.gold}"/>
 ${[-104,-70,-36].map(xx=>`<rect x="${xx}" y="-74" width="28" height="26" rx="3" fill="${C8.redD}"/><rect x="${xx+3}" y="-71" width="22" height="20" rx="2" fill="#E8DCD8" opacity=".9"/><rect x="${xx+5}" y="-68" width="4" height="14" rx="2" fill="#FFFFFF" opacity=".6"/>`).join('')}
 <path d="${star5(10,-58,11)}" fill="${C8.gold}"/><path d="${star5(10,-58,6)}" fill="#FFF2B0"/>
 <rect x="-118" y="-96" width="150" height="6" rx="3" fill="#D8DEE8"/><rect x="-118" y="-86" width="150" height="6" rx="3" fill="#D8DEE8"/>${Array.from({length:10},(_,k)=>`<rect x="${-112+k*15}" y="-96" width="3.4" height="16" fill="#C2C8D6"/>`).join('')}
 <rect x="62" y="-108" width="34" height="8" rx="4" fill="#5AA8F0"/><g${A('rd4tw',0,1.4)}><rect x="66" y="-107" width="10" height="6" rx="3" fill="#BFE6FF"/></g>
 <rect x="104" y="-46" width="16" height="7" rx="3" fill="#FFE27A"/><rect x="-124" y="-20" width="252" height="10" rx="5" fill="#8A93A8"/>
 ${[-82,80].map(xx=>`<circle cx="${xx}" cy="-8" r="20" fill="#3A3A4A"/><circle cx="${xx}" cy="-8" r="11" fill="#C8CCD8"/><circle cx="${xx}" cy="-8" r="4" fill="#8A8EA8"/><circle cx="${xx-6}" cy="-14" r="4" fill="#FFFFFF" opacity=".3"/>`).join('')}
 <path d="M-110 -78 H30" stroke="#FFFFFF" stroke-width="2.4" opacity=".35" stroke-linecap="round"/></g>`)}
// 原創警車（側面）：白色車身＋藍色腰帶、金色星星、紅藍小燈；沒有字
function policeCar(x,y,s,o={}){const g=uid('pc');const L=o.flip?-1:1;
 return T(x,y,s,`<g transform="scale(${L} 1)"><defs>${lg(g,[[0,'#FFFFFF'],[1,'#E2E8F2']])}</defs>${shd(0,4,96,7,.18)}
 <path d="M-92 -14 V-40 Q-92 -50 -80 -52 L-50 -56 L-30 -80 Q-26 -84 -18 -84 H34 Q42 -84 48 -78 L66 -56 L84 -52 Q96 -50 96 -38 V-14Z" fill="url(#${g})"/>
 <path d="M-26 -76 H6 V-56 H-42Z" fill="#9ED0F0"/><path d="M12 -76 H34 Q38 -76 42 -72 L58 -56 H12Z" fill="#9ED0F0"/><path d="M-20 -76 L-10 -76 L-26 -56 L-36 -56Z" fill="#FFFFFF" opacity=".45"/>
 <rect x="-92" y="-46" width="188" height="10" fill="${C8.blue}"/><rect x="-92" y="-36" width="188" height="3" fill="${C8.gold}"/>
 <path d="${star5(0,-26,7)}" fill="${C8.gold}"/>
 <rect x="-16" y="-92" width="34" height="8" rx="4" fill="#E2E6EE"/><g${A('rd4tw',0,1.2)}><rect x="-14" y="-91" width="14" height="6" rx="3" fill="#FF6A6A"/></g><g${A('rd4tw',.6,1.2)}><rect x="2" y="-91" width="14" height="6" rx="3" fill="#5A8AF0"/></g>
 <rect x="84" y="-46" width="12" height="6" rx="3" fill="#FFE27A"/><rect x="-96" y="-22" width="194" height="8" rx="4" fill="#8A93A8"/>
 ${[-56,60].map(xx=>`<circle cx="${xx}" cy="-12" r="15" fill="#3A3A4A"/><circle cx="${xx}" cy="-12" r="8" fill="#C8CCD8"/><circle cx="${xx-4}" cy="-16" r="3" fill="#FFFFFF" opacity=".3"/>`).join('')}</g>`)}
// 小腳踏車（側面；原創：彩色車架、籃子、鈴鐺）
function bikeS(x,y,s,c='#FF8A80',o={}){const L=o.flip?-1:1;
 return T(x,y,s,`<g transform="scale(${L} 1)">${shd(0,2,34,3,.14)}${[-20,20].map(xx=>`<circle cx="${xx}" cy="-12" r="12" fill="none" stroke="#3A3A4A" stroke-width="3.4"/><circle cx="${xx}" cy="-12" r="2.4" fill="#8A8EA8"/><path d="M${xx} -24 V0 M${xx-12} -12 H${xx+12}" stroke="#C8CCD8" stroke-width=".8"/>`).join('')}
 <path d="M-20 -12 L-6 -30 L14 -30 L20 -12 M-6 -30 L0 -12 L14 -30 M0 -12 L-20 -12" stroke="${c}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
 <path d="M-8 -36 H0" stroke="#3A3A4A" stroke-width="3.4" stroke-linecap="round"/><path d="M-6 -30 L-4 -36" stroke="${c}" stroke-width="2.4"/>
 <path d="M14 -30 L16 -40 M12 -42 L20 -40" stroke="#5A5C74" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="-40" r="2" fill="${C8.gold}"/>
 ${o.basket?`<path d="M18 -38 H32 L30 -28 H20Z" fill="#E8B884"/><path d="M20 -34 H31" stroke="#C8925A" stroke-width="1"/>`:''}</g>`)}
// 一般的小房子／小店（沒有招牌字；窗戶亮亮的）
function shopS(x,y,w,h,s,c,aw,o={}){let d=shd(x+w/2,y,w*.55,5*s,.12)+R(x,y-h,w,h,c,3*s)+R(x,y-h,w,6*s,mixc(c,'#FFFFFF',.35),3*s);
 d+=`<path d="M${n(x-4*s)} ${n(y-h*.62)} H${n(x+w+4*s)} L${n(x+w)} ${n(y-h*.5)} H${n(x)}Z" fill="${aw}"/>`;for(let k=0;k<6;k++)d+=`<path d="M${n(x-4*s+k*(w+8*s)/6)} ${n(y-h*.62)} h${n((w+8*s)/12)} L${n(x+k*w/6+w/12)} ${n(y-h*.5)} h${n(-w/12)}Z" fill="#FFFFFF" opacity=".7"/>`;
 d+=R(x+w*.08,y-h*.44,w*.5,h*.4,o.lit?'#FFF2C0':'#CFE8F8',2*s)+R(x+w*.66,y-h*.44,w*.26,h*.44,'#8A6A4A',2*s)+R(x+w*.08,y-h*.44,w*.5,h*.06,'#FFFFFF',0,' opacity=".5"');
 if(o.lit)d+=`<ellipse cx="${n(x+w*.33)}" cy="${n(y-h*.2)}" rx="${n(w*.3)}" ry="${n(h*.2)}" fill="#FFF6C8" opacity=".45"/>`;
 d+=R(x+w*.1,y-h*.92,w*.8,h*.22,'#FFFFFF',3*s,' opacity=".85"')+`<circle cx="${n(x+w*.5)}" cy="${n(y-h*.81)}" r="${n(h*.07)}" fill="${aw}"/>`;
 return d}
// 長椅
const benchS=(x,y,w,s,c='#E8A65A')=>shd(x+w/2,y+2*s,w*.55,4*s,.14)+R(x,y-22*s,w,6*s,c,2*s)+R(x,y-34*s,w,6*s,c,2*s)+R(x+6*s,y-16*s,5*s,16*s,'#7A7E92')+R(x+w-11*s,y-16*s,5*s,16*s,'#7A7E92')+R(x,y-34*s,w,2*s,'#FFFFFF',0,' opacity=".4"');
// 磁磚地板（透視）
function tiles(W,H,FY,s,c1,c2,step=46){let d=R(-400,FY,W+800,H-FY+10,c1);for(let x=-400;x<W+400;x+=step*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.5)} ${H}" stroke="${c2}" stroke-width="${n(1.2*s)}"/>`;
 for(let k=1;k<6;k++){const y=FY+(H-FY)*Math.pow(k/6,1.5);d+=`<path d="M-400 ${n(y)} H${W+400}" stroke="${c2}" stroke-width="${n(1.2*s)}"/>`}return d}
// 室內牆（上淺下深＋護牆板）
function wallIn(W,H,FY,s,g,c1,c2,wain){let d=`<defs>${lg(g+'w',[[0,c1],[1,c2]])}</defs>`+R(-400,0,W+800,FY,`url(#${g}w)`);
 if(wain)d+=R(-400,FY-H*.16,W+800,H*.16,wain)+R(-400,FY-H*.16,W+800,3*s,mixc(wain,'#FFFFFF',.4));
 d+=R(-400,FY-6*s,W+800,6*s,mixc(c2,'#000000',.12));return d}
// 窗戶（外面是藍天、綠樹）
function sumWin(x,y,w,h,s,fr='#FFFFFF',o={}){const g=uid('sw');let d=`<defs>${skySum(g+'s')}<clipPath id="${g}c"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(4*s)}"/></clipPath></defs>`;
 d+=`<g clip-path="url(#${g}c)">${R(x,y,w,h,`url(#${g}s)`)}${cloud(x+w*.3,y+h*.25,s*.45,'#FFFFFF',.9)}${gtree(x+w*.2,y+h*1.1,s*.7,0)}${gtree(x+w*.8,y+h*1.15,s*.8,1)}`;
 d+=`<path d="M${n(x+w*.1)} ${n(y)} L${n(x+w*.42)} ${n(y)} L${n(x+w*.12)} ${n(y+h)} L${n(x-w*.2)} ${n(y+h)}Z" fill="#FFFFFF" opacity=".16"/></g>`;
 d+=`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(4*s)}" fill="none" stroke="${fr}" stroke-width="${n(6*s)}"/>`;
 if(o.cross!==0)d+=`<path d="M${n(x+w/2)} ${n(y)} V${n(y+h)}${o.cross===2?` M${n(x)} ${n(y+h*.5)} H${n(x+w)}`:''}" stroke="${fr}" stroke-width="${n(4*s)}"/>`;
 return d}
// 盆栽
const plantS=(x,y,s,c='#E8A07A')=>`${shd(x,y,16*s,3*s,.14)}<path d="M${n(x-12*s)} ${n(y-20*s)} H${n(x+12*s)} L${n(x+9*s)} ${n(y)} H${n(x-9*s)}Z" fill="${c}"/>${[[-10,-44,-24],[8,-50,20],[0,-58,0],[-14,-32,-40],[14,-34,40]].map(([dx,dy,a])=>`<ellipse cx="${n(x+dx*s)}" cy="${n(y+dy*s)}" rx="${n(6*s)}" ry="${n(12*s)}" fill="${C8.green}" transform="rotate(${a} ${n(x+dx*s)} ${n(y+dy*s)})"/>`).join('')}<path d="M${n(x-12*s)} ${n(y-20*s)} H${n(x+12*s)}" stroke="#FFFFFF" stroke-width="${n(2*s)}" opacity=".4"/>`;
// 三角彩旗
function bunting(x0,x1,y,sag,s,cols){let d=`<path d="M${n(x0)} ${n(y)} Q${n((x0+x1)/2)} ${n(y+sag)} ${n(x1)} ${n(y)}" stroke="#B8A890" stroke-width="${n(1.6*s)}" fill="none"/>`;let k=0;
 for(let x=x0+14*s;x<x1-6*s;x+=34*s){const t=(x-x0)/(x1-x0),yy=y+2*sag*t*(1-t);d+=`<path d="M${n(x-11*s)} ${n(yy)} L${n(x+11*s)} ${n(yy)} L${n(x)} ${n(yy+20*s)}Z" fill="${cols[k++%cols.length]}"/>`}return d}

/* ===================== 題目物件（64×64；沒有字、沒有品牌；不用漸層，同一畫面出現很多次也不會壞） ===================== */
const hl=(x,y,w,h,r=2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#FFFFFF" opacity=".45"/>`;
const coin=(v,c,c2,r)=>`<circle cx="32" cy="33" r="${r}" fill="${c2}"/><circle cx="32" cy="31" r="${r}" fill="${c}"/><circle cx="32" cy="31" r="${r-4}" fill="none" stroke="#FFFFFF" stroke-width="1.6" opacity=".6"/>${Array.from({length:v},(_,k)=>{const a=-Math.PI/2+k*2*Math.PI/v,rr=v===1?0:r*.42;return `<circle cx="${n(32+Math.cos(a)*rr)}" cy="${n(31+Math.sin(a)*rr)}" r="${v>5?1.8:2.6}" fill="#FFFFFF" opacity=".9"/>`}).join('')}<ellipse cx="${32-r*.4}" cy="${31-r*.45}" rx="${r*.25}" ry="${r*.15}" fill="#FFFFFF" opacity=".55"/>`;
const OBJ46={
 // —— 46 消防局 ——
 firetruck:`<ellipse cx="32" cy="56" rx="28" ry="3" fill="#2A2050" opacity=".14"/><path d="M4 50 V24 Q4 20 8 20 H38 V50Z" fill="#F0604A"/><path d="M38 50 V16 Q38 12 42 12 H52 Q57 12 59 18 L62 30 V50Z" fill="#F0604A"/><path d="M41 16 H52 Q55 16 56 20 L58 28 H41Z" fill="#BFE6FA"/><rect x="4" y="36" width="58" height="4" fill="#FFFFFF"/><rect x="4" y="40" width="58" height="2" fill="#FFCB4D"/><rect x="6" y="14" width="30" height="3" rx="1.5" fill="#D8DEE8"/><rect x="6" y="18" width="30" height="2" fill="#D8DEE8"/><rect x="44" y="8" width="10" height="4" rx="2" fill="#5AA8F0"/><path d="${star5(22,29,5)}" fill="#FFCB4D"/><circle cx="15" cy="50" r="7" fill="#3A3A4A"/><circle cx="15" cy="50" r="3" fill="#C8CCD8"/><circle cx="50" cy="50" r="7" fill="#3A3A4A"/><circle cx="50" cy="50" r="3" fill="#C8CCD8"/>${hl(7,22,26,2)}`,
 extinguisher:`<ellipse cx="32" cy="58" rx="14" ry="3" fill="#2A2050" opacity=".14"/><rect x="20" y="18" width="22" height="40" rx="9" fill="#F0604A"/><rect x="23" y="34" width="16" height="12" rx="2" fill="#FFFFFF"/><path d="M27 40 H35" stroke="#F0604A" stroke-width="2"/><rect x="27" y="12" width="8" height="7" rx="2" fill="#5A5C74"/><path d="M24 12 H40 L42 8 H28Z" fill="#3A3A4A"/><path d="M35 14 Q48 14 48 26 V38" stroke="#3A3A4A" stroke-width="3" fill="none" stroke-linecap="round"/>${hl(23,21,4,24)}`,
 alarm:`<ellipse cx="32" cy="30" rx="24" ry="9" fill="#FFFFFF"/><path d="M8 30 Q8 42 32 42 Q56 42 56 30" fill="#E2E6EE"/><rect x="20" y="14" width="24" height="8" rx="3" fill="#E2E6EE"/><circle cx="44" cy="34" r="2.6" fill="#FF6A5A"/>${[-10,-4,2,8].map(d=>`<path d="M${32+d} 33 V38" stroke="#C8CCD8" stroke-width="1.4"/>`).join('')}<path d="M10 50 Q14 46 18 50 M46 50 Q50 46 54 50 M26 54 Q32 50 38 54" stroke="#FFB04A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
 phone:`<ellipse cx="32" cy="57" rx="24" ry="3" fill="#2A2050" opacity=".14"/><path d="M8 54 L14 30 H50 L56 54Z" fill="#FF8A80"/><path d="M10 28 Q8 20 16 18 H48 Q56 20 54 28 Q52 32 46 30 L44 24 H20 L18 30 Q12 32 10 28Z" fill="#E8605A"/>${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${22+c*7}" y="${34+r*6}" width="5" height="4" rx="1.4" fill="#FFFFFF"/>`).join('')).join('')}${hl(14,20,20,2)}`,
 exitsign:`<rect x="4" y="18" width="56" height="28" rx="4" fill="#3CC07A"/><rect x="7" y="21" width="50" height="22" rx="3" fill="#4AD890"/><rect x="10" y="23" width="11" height="18" fill="#FFFFFF"/><circle cx="32" cy="26" r="3" fill="#FFFFFF"/><path d="M31 29 L27 36 M31 29 L36 35 M30 31 L25 30 M31 32 L38 30" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/><path d="M42 32 H53 M48 27 L53 32 L48 37" stroke="#FFFFFF" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${hl(8,21,48,3)}`,
 stairs:`<path d="M6 56 H58 V8 H46 V18 H36 V28 H26 V38 H16 V48 H6Z" fill="#E8C89A"/>${[[46,8],[36,18],[26,28],[16,38],[6,48]].map(([x,y])=>`<rect x="${x}" y="${y}" width="${58-x}" height="3" fill="#FFFFFF" opacity=".6"/>`).join('')}<path d="M8 44 L48 6" stroke="#4FC4AE" stroke-width="3" stroke-linecap="round"/><path d="M22 54 L12 54 M16 50 L12 54 L16 58" stroke="#3CC07A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
 elevator:`<rect x="10" y="6" width="44" height="52" rx="3" fill="#C8CCD8"/><rect x="14" y="12" width="17" height="46" fill="#E2E6EE"/><rect x="33" y="12" width="17" height="46" fill="#E2E6EE"/><path d="M32 12 V58" stroke="#A8AEC0" stroke-width="1.4"/><circle cx="58" cy="30" r="3" fill="#FFFFFF"/><path d="M28 4 L32 1 L36 4Z M28 6 L32 9 L36 6Z" fill="#8A8EA8"/>${hl(16,14,3,40)}`,
 smoke:`${[[22,40,12],[36,34,14],[46,44,10],[30,24,10],[16,30,8]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#C8CCD8"/>`).join('')}${[[20,36,5],[34,28,6],[44,40,4]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#E8EAF0"/>`).join('')}`,
 fire:`<ellipse cx="32" cy="56" rx="16" ry="3" fill="#2A2050" opacity=".14"/><path d="M32 56 Q16 54 18 40 Q20 30 28 22 Q30 32 35 34 Q38 26 36 16 Q50 28 47 42 Q45 56 32 56Z" fill="#FF8A4A"/><path d="M32 55 Q24 54 25 45 Q26 40 31 36 Q33 42 37 43 Q40 49 32 55Z" fill="#FFD84A"/>`,
 firehelmet:`<ellipse cx="32" cy="52" rx="28" ry="5" fill="#C8432F"/><path d="M10 50 Q8 22 32 18 Q56 22 54 50Z" fill="#F0604A"/><path d="M30 18 Q32 14 34 18 V50 H30Z" fill="#C8432F"/><circle cx="32" cy="36" r="8" fill="#FFCB4D"/><path d="${star5(32,36,5)}" fill="#FFF2B0"/><path d="M14 46 H50" stroke="#FFFFFF" stroke-width="3" opacity=".9"/><path d="M16 34 Q18 26 26 22" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>`,
 mask:`<path d="M12 22 Q12 8 32 8 Q52 8 52 22 V36 Q52 50 32 52 Q12 50 12 36Z" fill="#5A5C74"/><path d="M17 22 Q17 13 32 13 Q47 13 47 22 V32 Q47 38 32 38 Q17 38 17 32Z" fill="#BFE6FA"/><path d="M20 16 L28 14 L20 34Z" fill="#FFFFFF" opacity=".45"/><circle cx="32" cy="46" r="7" fill="#8A8EA8"/><circle cx="32" cy="46" r="3.4" fill="#5A5C74"/><path d="M39 46 Q54 50 56 60" stroke="#8A8EA8" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 lighter:`<rect x="20" y="22" width="20" height="34" rx="5" fill="#7EC6F0"/><rect x="22" y="14" width="16" height="10" rx="2" fill="#C8CCD8"/><rect x="36" y="12" width="6" height="8" rx="2" fill="#8A8EA8"/>${hl(23,25,4,26)}`,
 matches:`<rect x="12" y="28" width="40" height="26" rx="3" fill="#FFB04A"/><rect x="12" y="28" width="40" height="7" fill="#FF8A4A"/>${[18,26,34,42].map((x,k)=>`<rect x="${x}" y="${10+k%2*3}" width="3" height="20" rx="1" fill="#F2D2A0"/><ellipse cx="${x+1.5}" cy="${10+k%2*3}" rx="2.6" ry="3.4" fill="#E8605A"/>`).join('')}`,
 meet:`<ellipse cx="32" cy="58" rx="20" ry="3" fill="#2A2050" opacity=".14"/><path d="M20 58 V8" stroke="#8A8EA8" stroke-width="3.4" stroke-linecap="round"/><path d="M22 8 Q36 4 50 10 Q42 16 50 24 Q36 18 22 24Z" fill="#3CC07A"/><path d="${star5(35,15,4.4)}" fill="#FFFFFF"/>${[26,34,42].map(x=>`<circle cx="${x}" cy="52" r="3.4" fill="#FFCB4D"/><path d="M${x-3} 58 Q${x} 54 ${x+3} 58" fill="#FFCB4D"/>`).join('')}`,
 window:`<rect x="10" y="8" width="44" height="44" rx="3" fill="#FFFFFF"/><rect x="14" y="12" width="17" height="36" fill="#9ED4F4"/><rect x="33" y="12" width="17" height="36" fill="#9ED4F4"/><path d="M16 14 L24 14 L16 30Z" fill="#FFFFFF" opacity=".5"/><rect x="6" y="52" width="52" height="6" rx="2" fill="#E8C89A"/><path d="M40 30 Q44 26 48 30" stroke="#FFFFFF" stroke-width="2" fill="none"/><circle cx="22" cy="40" r="3" fill="#FFE27A"/>`,
 door:`<rect x="14" y="6" width="36" height="54" rx="3" fill="#C8925A"/><rect x="18" y="10" width="28" height="20" rx="2" fill="#B07A44"/><rect x="18" y="34" width="28" height="22" rx="2" fill="#B07A44"/><circle cx="42" cy="34" r="2.6" fill="#FFCB4D"/>${hl(16,8,3,50)}`,
 // —— 47 派出所 ——
 policecar:`<ellipse cx="32" cy="56" rx="28" ry="3" fill="#2A2050" opacity=".14"/><path d="M4 50 V38 Q4 33 9 32 L18 30 L24 20 Q26 18 30 18 H38 Q42 18 44 20 L50 30 L56 32 Q60 33 60 38 V50Z" fill="#FFFFFF"/><path d="M26 22 H31 V30 H21Z M34 22 H38 L44 30 H34Z" fill="#9ED0F0"/><rect x="4" y="36" width="56" height="5" fill="#4A72C8"/><path d="${star5(32,45,3.4)}" fill="#FFCB4D"/><rect x="26" y="13" width="12" height="5" rx="2.4" fill="#E2E6EE"/><rect x="27" y="14" width="5" height="3" rx="1.4" fill="#FF6A6A"/><rect x="32" y="14" width="5" height="3" rx="1.4" fill="#5A8AF0"/><circle cx="16" cy="50" r="6" fill="#3A3A4A"/><circle cx="16" cy="50" r="2.6" fill="#C8CCD8"/><circle cx="48" cy="50" r="6" fill="#3A3A4A"/><circle cx="48" cy="50" r="2.6" fill="#C8CCD8"/>`,
 policehat:`<path d="M8 36 Q6 16 32 14 Q58 16 56 36Z" fill="#2E4E9A"/><rect x="8" y="34" width="48" height="7" rx="3" fill="#1E2F60"/><path d="M12 41 Q32 52 52 41" stroke="#14204A" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="32" cy="26" r="7" fill="#FFCB4D"/><path d="${star5(32,26,4.4)}" fill="#FFF2B0"/><path d="M14 26 Q18 18 28 16" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/>`,
 wallet:`<rect x="8" y="18" width="48" height="34" rx="6" fill="#E8A65A"/><path d="M8 26 Q8 18 16 18 H48 Q56 18 56 26Z" fill="#C8854A"/><rect x="36" y="30" width="20" height="12" rx="4" fill="#C8854A"/><circle cx="44" cy="36" r="2.6" fill="#FFCB4D"/><path d="M12 46 H30" stroke="#FFFFFF" stroke-width="1.6" stroke-dasharray="2 2" opacity=".6"/>${hl(11,21,24,2)}`,
 bill100:`<rect x="4" y="16" width="56" height="32" rx="3" fill="#F48A8A"/><rect x="7" y="19" width="50" height="26" rx="2" fill="#FFC8C0"/><circle cx="40" cy="32" r="9" fill="#FFFFFF" opacity=".8"/><path d="M36 32 Q40 26 44 32 Q40 38 36 32Z" fill="#F48A8A"/>${[0,1,2].map(k=>`<circle cx="${14+k*5}" cy="27" r="2" fill="#E0605A"/>`).join('')}<path d="M12 38 H26" stroke="#E0605A" stroke-width="2" stroke-linecap="round"/><path d="M50 22 V42" stroke="#E0605A" stroke-width="1.2" stroke-dasharray="2 2"/>`,
 coin1:coin(1,'#D8DCE6','#A8AEC0',13),coin5:coin(5,'#D8DCE6','#A8AEC0',16),coin10:coin(10,'#E8C070','#C0943A',18),coin50:coin(5,'#F2D060','#C8A030',21),
 lockheart:`<path d="M22 28 V20 Q22 10 32 10 Q42 10 42 20 V28" stroke="#C8CCD8" stroke-width="5" fill="none"/><path d="M32 58 C10 46 10 28 22 26 Q28 25 32 31 Q36 25 42 26 Q54 28 32 58Z" fill="#FF8FB8"/><circle cx="32" cy="38" r="4" fill="#C8487A"/><rect x="30.6" y="40" width="2.8" height="7" rx="1.2" fill="#C8487A"/><path d="M18 32 Q20 28 24 28" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>`,
 candy:`<path d="M16 32 L4 22 L6 42Z M48 32 L60 22 L58 42Z" fill="#FFB0D0"/><ellipse cx="32" cy="32" rx="17" ry="13" fill="#FF8FB8"/><path d="M22 24 Q32 40 42 24 M20 34 Q32 46 44 34" stroke="#FFFFFF" stroke-width="2.6" fill="none" opacity=".7"/><circle cx="26" cy="27" r="3" fill="#FFFFFF" opacity=".6"/>`,
 jelly:`<path d="M16 24 H48 L44 54 Q32 58 20 54Z" fill="#FF8A80" opacity=".9"/><path d="M16 24 H48 L46 32 Q32 36 18 32Z" fill="#FFB0A8"/><ellipse cx="32" cy="22" rx="17" ry="4" fill="#FFFFFF"/><circle cx="26" cy="40" r="3" fill="#FFFFFF" opacity=".5"/>`,
 drinkpack:`<path d="M18 16 H46 L44 56 H20Z" fill="#9ED4F4"/><rect x="18" y="16" width="28" height="8" fill="#7EC6F0"/><path d="M40 16 L44 6" stroke="#FF8A80" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="38" r="8" fill="#FFE27A"/><path d="M28 38 Q32 32 36 38" stroke="#FF8A80" stroke-width="2" fill="none"/>${hl(21,26,3,26)}`,
 gift:`<rect x="10" y="28" width="44" height="28" rx="3" fill="#A99BE8"/><rect x="7" y="20" width="50" height="10" rx="3" fill="#B8ACF0"/><rect x="28" y="20" width="8" height="36" fill="#FFCB4D"/><path d="M32 20 Q20 6 16 16 Q16 22 32 20 Q44 22 48 16 Q44 6 32 20Z" fill="#FFCB4D"/>${hl(12,23,12,2)}`,
 doorbell:`<rect x="18" y="8" width="28" height="48" rx="8" fill="#E2E6EE"/><circle cx="32" cy="38" r="9" fill="#FFCB4D"/><circle cx="32" cy="38" r="5" fill="#FFE27A"/><rect x="24" y="16" width="16" height="10" rx="2" fill="#5A6E9E"/>${[22,26,30].map(y=>`<path d="M50 ${y} Q54 ${y+6} 50 ${y+12}" stroke="#FFB04A" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>`).join('').slice(0,0)}<path d="M50 32 Q54 38 50 44 M54 28 Q60 38 54 48" stroke="#FFB04A" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
 shop:`<rect x="8" y="22" width="48" height="36" rx="2" fill="#FFF2C0"/><path d="M4 22 H60 L56 12 H8Z" fill="#4FC4AE"/>${[0,1,2,3].map(k=>`<path d="M${8+k*12} 12 H${14+k*12} L${12+k*12} 22 H${6+k*12}Z" fill="#FFFFFF" opacity=".75"/>`).join('')}<rect x="12" y="28" width="22" height="18" rx="2" fill="#FFFFFF"/><rect x="38" y="30" width="14" height="28" rx="2" fill="#E8B07A"/><circle cx="23" cy="37" r="4" fill="#FF8A80"/><ellipse cx="22" cy="58" rx="16" ry="3" fill="#FFF6C8"/>`,
 // —— 49 騎車、過馬路 ——
 helmet:`<path d="M8 40 Q6 12 32 10 Q58 12 56 40Z" fill="#4FC4AE"/><path d="M8 40 H56 Q56 44 52 44 H12 Q8 44 8 40Z" fill="#2E9A86"/>${[20,32,44].map(x=>`<path d="M${x} 14 Q${x+1} 24 ${x} 34" stroke="#2E9A86" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}<path d="M14 44 Q16 56 30 56 H34 Q48 56 50 44" stroke="#3A3A4A" stroke-width="2.4" fill="none"/><rect x="28" y="52" width="8" height="6" rx="1.6" fill="#FFCB4D"/><path d="M14 30 Q16 18 26 14" stroke="#FFFFFF" stroke-width="2.6" fill="none" opacity=".5" stroke-linecap="round"/>`,
 buckle:`<path d="M4 32 H22 M42 32 H60" stroke="#3A3A4A" stroke-width="7" stroke-linecap="round"/><rect x="20" y="22" width="16" height="20" rx="4" fill="#FFCB4D"/><path d="M36 24 L46 32 L36 40Z" fill="#E0A030"/><rect x="24" y="27" width="8" height="10" rx="2" fill="#E0A030"/><path d="M50 18 L54 14 M54 22 L60 20 M50 46 L54 50" stroke="#FFCB4D" stroke-width="2" stroke-linecap="round"/>`,
 bell:`<ellipse cx="32" cy="50" rx="20" ry="5" fill="#A8AEC0"/><path d="M14 48 Q12 22 32 20 Q52 22 50 48Z" fill="#FFCB4D"/><rect x="28" y="12" width="8" height="9" rx="2" fill="#8A8EA8"/><path d="M20 40 Q20 28 30 24" stroke="#FFFFFF" stroke-width="2.6" fill="none" opacity=".55" stroke-linecap="round"/><path d="M54 24 Q58 30 54 36 M8 24 Q4 30 8 36" stroke="#FFB04A" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
 brake:`<path d="M6 30 H40" stroke="#3A3A4A" stroke-width="8" stroke-linecap="round"/><path d="M14 30 H34" stroke="#5A5C74" stroke-width="8"/><path d="M38 28 Q52 30 58 44" stroke="#FF8A80" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="40" cy="28" r="5" fill="#8A8EA8"/><path d="M44 40 Q50 48 58 50" stroke="#FFCB4D" stroke-width="2" stroke-dasharray="3 3" fill="none"/>`,
 tire:`<circle cx="32" cy="32" r="24" fill="#3A3A4A"/><circle cx="32" cy="32" r="16" fill="#E2E6EE"/><circle cx="32" cy="32" r="4" fill="#8A8EA8"/>${[0,45,90,135].map(a=>`<path d="M32 16 V48" stroke="#A8AEC0" stroke-width="1.2" transform="rotate(${a} 32 32)"/>`).join('')}<path d="M14 22 Q20 12 30 10" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".3" stroke-linecap="round"/>`,
 vest:`<path d="M18 8 L26 8 Q32 18 38 8 L46 8 L54 20 V56 H40 V40 H24 V56 H10 V20Z" fill="#D8F04A"/><path d="M10 30 H54 M10 44 H24 M40 44 H54" stroke="#E8ECF2" stroke-width="5"/><path d="M10 30 H54" stroke="#FFFFFF" stroke-width="2" opacity=".8"/><path d="M26 8 Q32 18 38 8" stroke="#B8D02A" stroke-width="2" fill="none"/>${hl(13,18,3,30)}`,
 bike:`<g transform="translate(32 50) scale(1)">${'<circle cx="-15" cy="-10" r="10" fill="none" stroke="#3A3A4A" stroke-width="3"/><circle cx="15" cy="-10" r="10" fill="none" stroke="#3A3A4A" stroke-width="3"/><path d="M-15 -10 L-4 -26 L11 -26 L15 -10 M-4 -26 L0 -10 L11 -26 M0 -10 L-15 -10" stroke="#FF8A80" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M-8 -31 H1" stroke="#3A3A4A" stroke-width="3.4" stroke-linecap="round"/><path d="M11 -26 L13 -34 M9 -35 L17 -33" stroke="#5A5C74" stroke-width="2.4" stroke-linecap="round"/>'}</g>`,
 scooter:`<circle cx="16" cy="50" r="6" fill="#3A3A4A"/><circle cx="50" cy="50" r="6" fill="#3A3A4A"/><path d="M14 46 H50" stroke="#7EC6F0" stroke-width="5" stroke-linecap="round"/><path d="M48 46 L42 10" stroke="#7EC6F0" stroke-width="4" stroke-linecap="round"/><path d="M34 10 H50" stroke="#3A3A4A" stroke-width="4" stroke-linecap="round"/>`,
 tricycle:`<circle cx="46" cy="44" r="12" fill="none" stroke="#3A3A4A" stroke-width="3.4"/><circle cx="14" cy="52" r="6" fill="#3A3A4A"/><circle cx="26" cy="52" r="6" fill="#3A3A4A"/><path d="M14 46 H30 L46 44 M22 46 L28 26 M46 44 L42 20" stroke="#FFCB4D" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 24 H32" stroke="#FF8A80" stroke-width="5" stroke-linecap="round"/><path d="M36 20 H48" stroke="#3A3A4A" stroke-width="3.4" stroke-linecap="round"/>`,
 wheel:`<circle cx="32" cy="32" r="24" fill="none" stroke="#3A3A4A" stroke-width="6"/><circle cx="32" cy="32" r="4" fill="#FF8A80"/>${[0,30,60,90,120,150].map(a=>`<path d="M32 10 V54" stroke="#C8CCD8" stroke-width="1.4" transform="rotate(${a} 32 32)"/>`).join('')}`,
 zebra:`<rect x="2" y="10" width="60" height="44" fill="#8A8EA8"/>${[6,18,30,42,54].map(x=>`<rect x="${x-4}" y="14" width="8" height="36" fill="#FFFFFF"/>`).join('')}`,
 light:`<rect x="20" y="4" width="24" height="44" rx="6" fill="#3A3E52"/><circle cx="32" cy="16" r="7" fill="#FF6A5A"/><circle cx="32" cy="35" r="7" fill="#5A5E72"/><circle cx="30" cy="14" r="2.4" fill="#FFFFFF" opacity=".6"/><rect x="29" y="48" width="6" height="14" fill="#5A5E72"/>`,
 car:`<ellipse cx="32" cy="54" rx="28" ry="3" fill="#2A2050" opacity=".14"/><path d="M4 48 V38 Q4 33 9 32 L16 31 L22 20 Q24 18 28 18 H40 Q44 18 46 21 L52 31 L56 32 Q60 33 60 38 V48Z" fill="#7EC6F0"/><path d="M25 22 H32 V31 H19Z M35 22 H40 Q42 22 43 24 L47 31 H35Z" fill="#DFF2FC"/><rect x="2" y="42" width="60" height="5" rx="2.4" fill="#8A93A8"/><circle cx="17" cy="48" r="7" fill="#3A3A4A"/><circle cx="17" cy="48" r="3" fill="#C8CCD8"/><circle cx="47" cy="48" r="7" fill="#3A3A4A"/><circle cx="47" cy="48" r="3" fill="#C8CCD8"/><rect x="54" y="35" width="6" height="4" rx="2" fill="#FFE27A"/>${hl(8,34,40,2)}`,
 phonehead:`<rect x="20" y="6" width="22" height="40" rx="4" fill="#5A5C74"/><rect x="22.6" y="10" width="16.8" height="30" rx="2" fill="#9ED4F4"/><path d="M10 56 Q10 40 32 40 Q54 40 54 56" stroke="#FF8A80" stroke-width="3.4" fill="none"/><rect x="5" y="50" width="10" height="12" rx="4" fill="#FF8A80"/><rect x="49" y="50" width="10" height="12" rx="4" fill="#FF8A80"/>${hl(24,12,3,24)}`,
 // —— 48 游泳池 ——
 whistle:`<path d="M20 30 Q26 6 34 4" stroke="#FF8A80" stroke-width="2.4" fill="none"/><path d="M10 34 H38 Q54 34 54 46 Q54 58 40 58 Q28 58 26 46 H10Z" fill="#FFCB4D"/><circle cx="40" cy="46" r="5" fill="#E0A030"/><rect x="6" y="32" width="8" height="10" rx="2" fill="#E0A030"/><path d="M28 38 Q34 36 40 37" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`,
 ring:`<circle cx="32" cy="32" r="24" fill="#FF8A80"/><circle cx="32" cy="32" r="11" fill="#BFF0F8"/>${[0,90,180,270].map(a=>`<path d="M32 8 A24 24 0 0 1 49 15 L40 24 A11 11 0 0 0 32 21Z" fill="#FFFFFF" transform="rotate(${a} 32 32)"/>`).join('')}<path d="M16 20 Q20 14 26 12" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".7" stroke-linecap="round"/>`,
 kickboard:`<path d="M14 8 H50 Q56 8 56 14 V44 Q56 58 32 58 Q8 58 8 44 V14 Q8 8 14 8Z" fill="#7EC6F0"/><rect x="18" y="14" width="10" height="16" rx="5" fill="#FFFFFF" opacity=".85"/><rect x="36" y="14" width="10" height="16" rx="5" fill="#FFFFFF" opacity=".85"/><path d="M14 44 Q32 52 50 44" stroke="#FFCB4D" stroke-width="4" fill="none"/>`,
 goggles:`<path d="M6 32 Q4 22 12 22 M58 32 Q60 22 52 22" stroke="#A99BE8" stroke-width="4" fill="none"/><ellipse cx="20" cy="32" rx="12" ry="9" fill="#A99BE8"/><ellipse cx="44" cy="32" rx="12" ry="9" fill="#A99BE8"/><ellipse cx="20" cy="32" rx="8.6" ry="6" fill="#9ED4F4"/><ellipse cx="44" cy="32" rx="8.6" ry="6" fill="#9ED4F4"/><path d="M30 31 Q32 28 34 31" stroke="#A99BE8" stroke-width="3" fill="none"/><path d="M15 29 Q18 27 21 28 M39 29 Q42 27 45 28" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>`,
 locker:`<rect x="10" y="4" width="44" height="56" rx="3" fill="#7EC6F0"/><rect x="14" y="8" width="36" height="48" rx="2" fill="#9ED4F4"/>${[14,20,26].map(y=>`<rect x="20" y="${y}" width="24" height="2.4" rx="1.2" fill="#5AA8D8"/>`).join('')}<rect x="38" y="34" width="8" height="10" rx="2" fill="#FFCB4D"/><circle cx="24" cy="44" r="6" fill="#FFFFFF"/><path d="M21 44 H27" stroke="#7EC6F0" stroke-width="2"/>`,
 shower:`<path d="M44 58 V14 Q44 6 36 6 H26" stroke="#A8AEC0" stroke-width="4" fill="none"/><path d="M14 18 Q14 10 26 10 Q38 10 38 18Z" fill="#C8CCD8"/>${[[16,26],[22,30],[28,26],[34,30],[19,38],[31,38],[25,46]].map(([x,y])=>`<path d="M${x} ${y} q-1.6 3 0 4 q1.6 -1 0 -4Z" fill="#7EC6F0"/>`).join('')}`,
 thunder:`<path d="M12 34 Q8 22 20 20 Q22 8 36 10 Q48 8 50 20 Q60 22 56 34Z" fill="#8A92B0"/><path d="M16 30 Q30 34 52 30" stroke="#A8B0CC" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 34 L26 46 H33 L28 58 L42 42 H35 L40 34Z" fill="#FFE27A"/>`,
 towel:`<rect x="8" y="10" width="48" height="8" rx="4" fill="#C8925A"/><path d="M12 16 H52 V54 Q52 58 48 58 H16 Q12 58 12 54Z" fill="#FF9AC8"/>${[26,38,50].map(y=>`<path d="M12 ${y} H52" stroke="#FFFFFF" stroke-width="3" opacity=".8"/>`).join('')}`,
 clock:`<circle cx="32" cy="32" r="26" fill="#FFCB4D"/><circle cx="32" cy="32" r="21" fill="#FFFFFF"/>${Array.from({length:12},(_,k)=>`<circle cx="${n(32+Math.cos(k*Math.PI/6)*17)}" cy="${n(32+Math.sin(k*Math.PI/6)*17)}" r="${k%3?1:1.8}" fill="#8A8EA8"/>`).join('')}<path d="M32 32 V18 M32 32 V46" stroke="#3A3150" stroke-width="2.6" stroke-linecap="round"/><path d="M32 32 V46" stroke="#FF8A80" stroke-width="2"/><circle cx="32" cy="32" r="2.6" fill="#3A3150"/>`,
 // —— 50 家裡 ——
 detergent:`<rect x="18" y="20" width="30" height="38" rx="8" fill="#B89CFF"/><rect x="26" y="10" width="12" height="11" rx="2" fill="#7E6AD8"/><path d="M38 14 H48 V18 H38Z" fill="#7E6AD8"/><rect x="22" y="32" width="22" height="16" rx="3" fill="#FFFFFF"/><path d="M33 34 L27 46 H39Z" fill="none" stroke="#FF8A4A" stroke-width="2" stroke-linejoin="round"/><circle cx="33" cy="43" r="1.2" fill="#FF8A4A"/><path d="M33 37 V41" stroke="#FF8A4A" stroke-width="1.6"/>${hl(21,23,3,30)}`,
 podball:`<ellipse cx="32" cy="56" rx="16" ry="3" fill="#2A2050" opacity=".14"/><path d="M14 36 Q14 18 32 18 Q50 18 50 36 Q50 54 32 54 Q14 54 14 36Z" fill="#7EC6F0"/><path d="M32 18 Q24 36 32 54 Q40 36 32 18Z" fill="#FF9AC8"/><path d="M14 36 Q32 30 50 36" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".7"/><circle cx="24" cy="28" r="3" fill="#FFFFFF" opacity=".7"/>`,
 medicine:`<rect x="16" y="20" width="26" height="36" rx="5" fill="#FFB04A"/><rect x="14" y="10" width="30" height="12" rx="3" fill="#FFFFFF"/><path d="M14 14 H44 M14 18 H44" stroke="#E2E6EE" stroke-width="1.2"/><rect x="19" y="29" width="20" height="16" rx="2" fill="#FFFFFF"/><g transform="rotate(-30 29 37)"><rect x="22" y="34" width="14" height="6" rx="3" fill="#FF9AC8"/><rect x="29" y="34" width="7" height="6" rx="3" fill="#7EC6F0"/><rect x="29" y="34" width="2" height="6" fill="#7EC6F0"/></g>${hl(19,23,3,28)}<g transform="rotate(20 51 50)"><rect x="44" y="47" width="14" height="6.4" rx="3.2" fill="#FF9AC8"/><rect x="51" y="47" width="7" height="6.4" rx="3.2" fill="#FFFFFF"/><rect x="51" y="47" width="2" height="6.4" fill="#FFFFFF"/></g><circle cx="52" cy="38" r="4" fill="#FFE27A"/><path d="M49 38 H55" stroke="#E0B040" stroke-width="1"/>`,
 hotpot:`<rect x="10" y="30" width="44" height="22" rx="8" fill="#8A8EA8"/><rect x="6" y="26" width="52" height="8" rx="4" fill="#A8AEC0"/><path d="M2 30 H8 M56 30 H62" stroke="#5A5C74" stroke-width="5" stroke-linecap="round"/>${[22,32,42].map((x,k)=>`<g${A('rd4dr',k*.4,3)}><path d="M${x} 20 Q${x-4} 14 ${x} 10 Q${x+4} 6 ${x} 2" stroke="#E2E6EE" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`).join('')}${hl(13,36,24,2)}`,
 cord:`<rect x="4" y="4" width="56" height="6" rx="3" fill="#C8925A"/><path d="M8 10 V40 Q16 44 22 40 V10Z" fill="#FF9AC8"/><path d="M44 10 V58" stroke="#E8C89A" stroke-width="2.4"/><path d="M48 10 V50" stroke="#E8C89A" stroke-width="2.4"/><circle cx="44" cy="58" r="3" fill="#C8925A"/><circle cx="48" cy="50" r="3" fill="#C8925A"/>`,
 plasticbag:`<path d="M14 22 H50 L54 56 Q32 60 10 56Z" fill="#E8F2FA" opacity=".95"/><path d="M20 22 Q20 8 28 8 Q32 8 32 16 M44 22 Q44 8 36 8 Q32 8 32 16" stroke="#C8D8E8" stroke-width="3" fill="none"/><path d="M18 30 Q22 44 18 52 M44 30 Q48 40 46 52" stroke="#FFFFFF" stroke-width="2" fill="none"/><path d="M14 22 H50" stroke="#C8D8E8" stroke-width="2"/>`,
 gas:`<rect x="6" y="34" width="52" height="22" rx="4" fill="#E2E6EE"/><rect x="6" y="30" width="52" height="6" rx="2" fill="#5A5C74"/><circle cx="20" cy="46" r="4" fill="#8A8EA8"/><circle cx="44" cy="46" r="4" fill="#8A8EA8"/><path d="M14 30 Q20 22 26 30 M38 30 Q44 22 50 30" stroke="#5AA8F0" stroke-width="3" fill="none"/>`,
 wetfloor:`<rect x="2" y="30" width="60" height="30" fill="#BFE6F4"/>${[8,24,40,56].map(x=>`<path d="M${x-8} 30 L${x} 60" stroke="#FFFFFF" stroke-width="1.2" opacity=".7"/>`).join('')}<ellipse cx="24" cy="46" rx="12" ry="4" fill="#7EC6F0" opacity=".7"/><ellipse cx="44" cy="52" rx="8" ry="3" fill="#7EC6F0" opacity=".7"/><path d="M32 6 q-6 10 0 14 q6 -4 0 -14Z" fill="#7EC6F0"/><path d="M48 12 q-4 7 0 10 q4 -3 0 -10Z" fill="#9ED4F4"/>`,
 chair:`<rect x="8" y="4" width="48" height="30" rx="3" fill="#9ED4F4"/><path d="M8 4 H56 V34 H8Z" fill="none" stroke="#FFFFFF" stroke-width="3"/><rect x="20" y="30" width="24" height="5" rx="2" fill="#FF8A80"/><rect x="20" y="36" width="24" height="6" rx="2" fill="#E8A65A"/><path d="M22 42 V60 M42 42 V60" stroke="#C8854A" stroke-width="3.4" stroke-linecap="round"/><rect x="20" y="16" width="5" height="22" rx="2" fill="#E8A65A"/>`,
 washer:`<rect x="10" y="6" width="44" height="52" rx="5" fill="#FFFFFF"/><rect x="10" y="6" width="44" height="10" rx="4" fill="#E2E6EE"/><circle cx="32" cy="37" r="14" fill="#C8CCD8"/><circle cx="32" cy="37" r="10" fill="#9ED4F4"/><circle cx="18" cy="11" r="2" fill="#4FC4AE"/><circle cx="24" cy="11" r="2" fill="#FFCB4D"/>`,
 fridge:`<rect x="14" y="2" width="36" height="58" rx="5" fill="#E8F2FA"/><path d="M14 22 H50" stroke="#C8D8E8" stroke-width="2"/><rect x="42" y="8" width="3" height="10" rx="1.4" fill="#A8AEC0"/><rect x="42" y="28" width="3" height="14" rx="1.4" fill="#A8AEC0"/><circle cx="24" cy="12" r="3" fill="#FF8A80"/><path d="${star5(26,36,4)}" fill="#FFCB4D"/>${hl(17,5,3,52)}`,
 magnifier:`<path d="M40 40 L56 56" stroke="#C8854A" stroke-width="8" stroke-linecap="round"/><circle cx="26" cy="26" r="18" fill="#FFCB4D"/><circle cx="26" cy="26" r="13" fill="#BFE6FA"/><path d="M18 20 Q22 14 28 14" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 sticker:`<path d="M32 6 L38 22 L56 22 L42 33 L47 50 L32 40 L17 50 L22 33 L8 22 L26 22Z" fill="#FFCB4D"/><circle cx="26" cy="28" r="2.4" fill="#3A3150"/><circle cx="38" cy="28" r="2.4" fill="#3A3150"/><path d="M27 34 Q32 38 37 34" stroke="#3A3150" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M44 46 L52 54 L56 46Z" fill="#FFFFFF" opacity=".8"/>`,
 flashlight:`<path d="M6 26 L20 22 V42 L6 38Z" fill="#FFF6C8" opacity=".8"/><rect x="20" y="20" width="14" height="24" rx="3" fill="#FFCB4D"/><rect x="34" y="24" width="24" height="16" rx="4" fill="#4FC4AE"/><rect x="42" y="28" width="6" height="8" rx="2" fill="#FFFFFF" opacity=".8"/>${hl(37,26,18,2)}`
};
const OBJ46_NAME={firetruck:'消防車',extinguisher:'滅火器',alarm:'警報器',phone:'電話',exitsign:'逃生指示燈',stairs:'樓梯',elevator:'電梯',smoke:'煙',fire:'小火',firehelmet:'消防頭盔',mask:'消防面罩',lighter:'打火機',matches:'火柴',meet:'集合點',window:'窗戶',door:'門',
 policecar:'警車',policehat:'警察帽',wallet:'錢包',bill100:'100 元鈔票',coin1:'1 元',coin5:'5 元',coin10:'10 元',coin50:'50 元',lockheart:'通關密語',candy:'糖果',jelly:'果凍',drinkpack:'飲料包',gift:'禮物',doorbell:'門鈴',shop:'明亮的店',
 helmet:'安全帽',buckle:'扣環',bell:'鈴鐺',brake:'煞車',tire:'輪胎',vest:'反光背心',bike:'腳踏車',scooter:'滑板車',tricycle:'三輪車',wheel:'輪子',zebra:'斑馬線',car:'汽車',light:'紅綠燈',phonehead:'手機和耳機',
 whistle:'哨子',ring:'游泳圈',kickboard:'浮板',goggles:'泳鏡',locker:'置物櫃',shower:'沖水',thunder:'打雷',towel:'毛巾',clock:'時鐘',
 detergent:'清潔劑',podball:'洗衣球',medicine:'藥',hotpot:'熱鍋',cord:'窗簾繩',plasticbag:'塑膠袋',gas:'瓦斯爐',wetfloor:'濕濕的地板',chair:'窗邊的椅子',washer:'洗衣機',fridge:'冰箱',magnifier:'放大鏡',sticker:'小貼紙',flashlight:'手電筒'};
G.OBJ46=OBJ46;G.OBJ46_NAME=OBJ46_NAME;

/* ===================== 46 參觀消防局（虛構的星光消防局：紅磚、白色車庫門、原創消防車；沒有字、沒有真實標誌；火只畫小小的、煙只有一點點） ===================== */
// 原創的「安全小隊」星星盾牌（不是任何真實單位的標誌）
const shieldS=(x,y,s,c=C8.red)=>T(x,y,s,`<path d="M0 -22 L18 -15 V0 Q18 16 0 24 Q-18 16 -18 0 V-15Z" fill="${c}"/><path d="M0 -17 L13 -12 V0 Q13 12 0 18 Q-13 12 -13 0 V-12Z" fill="#FFFFFF" opacity=".25"/><path d="${star5(0,0,9)}" fill="${C8.gold}"/>`);
const helmetS=(x,y,s,c=C8.red)=>T(x,y,s,`<ellipse cx="0" cy="0" rx="16" ry="3.4" fill="${mixc(c,'#000000',.2)}"/><path d="M-13 -1 Q-14 -20 0 -22 Q14 -20 13 -1Z" fill="${c}"/><circle cx="0" cy="-11" r="4.6" fill="${C8.gold}"/><path d="M-9 -9 Q-8 -16 -3 -18" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>`);
const coatS=(x,y,s,c='#E8B84A')=>T(x,y,s,`<path d="M-6 -40 H6 L18 -34 L22 0 H-22 L-18 -34Z" fill="${c}"/><path d="M-18 -34 L-26 -6 L-20 -4 L-15 -24 M18 -34 L26 -6 L20 -4 L15 -24" fill="${mixc(c,'#000000',.1)}"/><path d="M-21 -12 H21 M-20 -22 H20" stroke="#E8ECF2" stroke-width="3.4"/><path d="M0 -38 V0" stroke="${mixc(c,'#000000',.2)}" stroke-width="1.4"/><circle cx="0" cy="-44" r="3" fill="#8A8EA8"/>`);
const bootS=(x,y,s)=>T(x,y,s,[-7,7].map(dx=>`<path d="M${dx-5} -20 H${dx+5} V-4 H${dx+9} Q${dx+11} -4 ${dx+11} 0 H${dx-5}Z" fill="#3A3A4A"/><rect x="${dx-5}" y="-12" width="10" height="3" fill="${C8.gold}"/>`).join(''));
function fire(W,H,v='garage'){const {P,s}=sc(W,H);const g=uid('fr');
 if(v==='out')return fireOut(W,H,s,P,g);
 if(v==='drill')return fireDrill(W,H,s,P,g);
 const FY=H*(P?.7:.66);let d=wallIn(W,H,FY,s,g,'#FFF4E8','#F6E2D0','#E8806A');
 // 牆上一排紅磚（上半部只有淡淡的磚紋，題目卡的位置很乾淨）
 const r=rng(46);for(let y=FY-H*.16;y<FY-6*s;y+=10*s)for(let x=-400+((y/10/s)%2)*14*s;x<W+400;x+=28*s)d+=R(x,y,26*s,8*s,r()<.5?'#E8907A':'#DE7A64',1.4*s);
 d+=tiles(W,H,FY,s,'#D8DCE4','#C4C8D2',60);
 d+=`<path d="M-400 ${n(FY+(H-FY)*.45)} H${W+400}" stroke="${C8.gold}" stroke-width="${n(5*s)}" stroke-dasharray="${n(22*s)} ${n(14*s)}" opacity=".8"/>`;
 if(v==='gear'){// 裝備間：一格一格的木頭置物格（頭盔、外套、靴子）、中間的窗戶、牆上的面罩和水帶捲、長椅
  const cw=(P?W*.4:W*.1),xs=P?[W*.06,W*.54]:[W*.015,W*.125,W*.235,W*.655,W*.765,W*.875],top=H*(P?.22:.18);
  xs.forEach((x,k)=>{const g2=uid('cb');d+=`<defs>${lg(g2,[[0,'#7A4E2A'],[1,'#9A6A3E']])}</defs>`+shd(x+cw/2,FY+2*s,cw*.55,5*s,.14)+R(x,top,cw,FY-top,'#C8925A',4*s)+R(x+5*s,top+5*s,cw-10*s,FY-top-8*s,`url(#${g2})`,2*s);
   d+=R(x+3*s,top+46*s,cw-6*s,5*s,'#E8B884',2*s)+R(x,top,cw,4*s,'#E8B884',3*s);
   d+=helmetS(x+cw/2,top+46*s,s*(P?1.5:1.3),k%3===1?'#FFCB4D':C8.red);
   d+=`<circle cx="${n(x+cw/2)}" cy="${n(top+60*s)}" r="${n(2.6*s)}" fill="#C8CCD8"/>`+coatS(x+cw/2,top+(P?120:112)*s,s*(P?1.5:1.25),k%2?'#E8B84A':'#D8A440');
   d+=bootS(x+cw/2,FY-6*s,s*(P?1.1:1));
   d+=R(x+5*s,top+5*s,3*s,FY-top-8*s,'#FFFFFF',0,' opacity=".12"')});
  if(!P){d+=sumWin(W*.38,H*.16,W*.24,H*.3,s,'#FFFFFF',{cross:2});
   d+=T(W*.36,FY-70*s,s*1.1,`<rect x="-3" y="-60" width="6" height="8" fill="#8A8EA8"/><path d="M-12 -46 Q-12 -60 0 -60 Q12 -60 12 -46 V-36 Q12 -24 0 -22 Q-12 -24 -12 -36Z" fill="#5A5C74"/><path d="M-8 -46 Q-8 -55 0 -55 Q8 -55 8 -46 V-40 Q8 -35 0 -35 Q-8 -35 -8 -40Z" fill="#BFE6FA"/><circle cx="0" cy="-28" r="4" fill="#8A8EA8"/>`);
   d+=T(W*.64,FY-40*s,s*1.1,`<circle cx="0" cy="-26" r="24" fill="#C8432F"/><circle cx="0" cy="-26" r="18" fill="#F2E2C8"/>${[14,10,6].map(r=>`<circle cx="0" cy="-26" r="${r}" fill="none" stroke="#E8C89A" stroke-width="2.4"/>`).join('')}<circle cx="0" cy="-26" r="3.4" fill="#8A8EA8"/>`)}
  d+=benchS(W*(P?.22:.4),FY+(P?100:80)*s,(P?150:200)*s,s,'#7EC6F0');
  return d}
 if(v==='truck'){// 消防車近看：梯子、水帶捲、三角錐
  d+=R(-400,H*.2,W+800,FY-H*.2-H*.16,'#FFE8D8',0,' opacity=".6"');
  d+=sumWin(W*(P?.06:.06),H*.12,(P?90:150)*s,(P?80:110)*s,s,'#FFFFFF',{cross:2})+(P?'':sumWin(W*.78,H*.12,150*s,110*s,s,'#FFFFFF',{cross:2}))+shieldS(W*(P?.8:.3),H*.2,s*1.1);
  const tx=P?W*.42:W*.4,ty=FY+(P?70:60)*s;d+=fireTruck(tx,ty,s*(P?1:1.5));
  d+=T(P?W*.84:W*.88,FY+(P?40:30)*s,s*(P?1:1.3),`${shd(0,4,26,4,.14)}<circle cx="0" cy="-26" r="26" fill="#C8432F"/><circle cx="0" cy="-26" r="20" fill="#F2E2C8"/>${[16,12,8].map(r=>`<circle cx="0" cy="-26" r="${r}" fill="none" stroke="#E8C89A" stroke-width="2.4"/>`).join('')}<circle cx="0" cy="-26" r="4" fill="#8A8EA8"/><rect x="-4" y="-4" width="8" height="8" fill="#8A8EA8"/>`);
  [[P?W*.1:W*.06,FY+(P?110:80)*s],[P?W*.26:W*.14,FY+(P?120:90)*s]].forEach(([x,y])=>d+=T(x,y,s,`${shd(0,0,12,2.4,.14)}<path d="M-9 0 L-3 -26 H3 L9 0Z" fill="#FF8A4A"/><path d="M-6 -12 H6 M-4.6 -20 H4.6" stroke="#FFFFFF" stroke-width="3"/><rect x="-12" y="-2" width="24" height="4" rx="1" fill="#E8704A"/>`));
  return d}
 // 主場景：車庫（大門開著，原創消防車停在裡面；右邊掛著裝備）
 const gx=P?W*.04:W*.02,gw=P?W*.92:W*.6,gy=H*(P?.2:.16);
 d+=R(gx,gy,gw,FY-gy,'#C8432F',6*s)+R(gx+8*s,gy+8*s,gw-16*s,FY-gy-8*s,'#5A5262',3*s)+R(gx+8*s,gy+8*s,gw-16*s,(FY-gy)*.18,'#FFFFFF',0,' opacity=".9"');
 for(let k=1;k<5;k++)d+=R(gx+8*s,gy+8*s+k*(FY-gy)*.035,gw-16*s,1.4*s,'#D8DCE4');
 d+=R(gx+8*s,gy+8*s+(FY-gy)*.18,gw-16*s,(FY-gy)*.82,'#6A6276');
 d+=fireTruck(gx+gw*(P?.5:.4),FY+(P?6:4)*s,s*(P?.82:.9));
 d+=shieldS(gx+gw*.5,gy-4*s,s*.9);
 if(!P){const hx=W*.7,hw=W*.26;d+=R(hx,H*.22,hw,6*s,'#C8925A');for(let k=0;k<3;k++){const x=hx+hw*(k+.5)/3;d+=helmetS(x,H*.22-2*s,s*1.2,k===1?'#FFCB4D':C8.red)+coatS(x,FY-56*s,s*1.25,'#E8B84A')+bootS(x,FY-6*s,s)}
  d+=T(W*.98,FY-80*s,s,`<rect x="-14" y="-40" width="28" height="40" rx="4" fill="#F0604A"/><rect x="-10" y="-34" width="20" height="16" rx="2" fill="#FFFFFF"/><rect x="-5" y="-30" width="10" height="8" rx="4" fill="#F0604A"/>`)}
 else d+=T(W*.9,FY+40*s,s*1.1,`<g transform="translate(-32 -58)">${OBJ46.extinguisher}</g>`);
 d+=alarmS(W*(P?.5:.5),H*.06,s*1.2);
 return d}
// 開場：消防局外觀（紅磚房子、三個白色車庫門、瞭望塔、星星盾牌、小旗子、行道樹）
function fireOut(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'b',[[0,'#F08A70'],[1,'#D86A52']])}${lg(g+'r',[[0,'#B8BCC8'],[1,'#9EA4B4']])}</defs>`;
 const GY=H*(P?.7:.72);d+=R(-400,0,W+800,H,`url(#${g}s)`)+sunP(W*(P?.82:.9),H*.12,s)+`<g${A('rd4dr',1,16)}>${cloud(W*.16,H*.12,s*.8)}${cloud(W*.66,H*.08,s*.55,'#FFFFFF',.9)}</g>`;
 d+=gtree(-60*s,GY,s*1.3,1)+gtree(W+50*s,GY,s*1.2,0);
 const bx=W*(P?.04:.12),bw=W*(P?.92:.7),by=H*(P?.34:.3);
 // 瞭望塔
 const tx=bx+bw*(P?.12:.08);d+=R(tx-22*s,by-80*s,44*s,GY-by+80*s,`url(#${g}b)`,3*s)+`<path d="M${n(tx-30*s)} ${n(by-80*s)} L${n(tx)} ${n(by-110*s)} L${n(tx+30*s)} ${n(by-80*s)}Z" fill="#8A4A3A"/>`+R(tx-12*s,by-68*s,24*s,22*s,'#BFE6FA',3*s)+`<path d="M${n(tx)} ${n(by-110*s)} V${n(by-140*s)}" stroke="#8A8EA8" stroke-width="${n(2*s)}"/><g${A('rd4sw',0,3,`transform-origin:${n(tx)}px ${n(by-140*s)}px`)}><path d="M${n(tx)} ${n(by-140*s)} L${n(tx+26*s)} ${n(by-132*s)} L${n(tx)} ${n(by-124*s)}Z" fill="${C8.gold}"/></g>`;
 // 主建築
 d+=shd(bx+bw/2,GY,bw*.55,8*s,.14)+R(bx,by,bw,GY-by,`url(#${g}b)`,4*s)+R(bx-6*s,by-12*s,bw+12*s,16*s,'#8A4A3A',4*s);
 const r=rng(461);for(let y=by+10*s;y<GY-4*s;y+=12*s)for(let x=bx+((y/12/s|0)%2)*10*s;x<bx+bw-16*s;x+=26*s)if(r()<.35)d+=R(x,y,20*s,6*s,'#E87A62',1.4*s,' opacity=".7"');
 d+=shieldS(bx+bw*.5,by+26*s,s*1.1);
 const nd=P?2:3,dw=bw*(P?.36:.24),gap=(bw-nd*dw)/(nd+1);
 for(let k=0;k<nd;k++){const x=bx+gap+k*(dw+gap),y=by+56*s,h=GY-y;
  if(k===(P?0:1)){d+=R(x,y,dw,h,'#5A5262',3*s)+R(x,y,dw,h*.26,'#FFFFFF',3*s);
   d+=`<g clip-path="none">${T(x+dw*.5,GY,s*(P?.42:.5),`<path d="M-80 -10 V-92 Q-80 -100 -72 -100 H72 Q80 -100 80 -92 V-10Z" fill="${C8.red}"/><path d="M-66 -90 H66 V-60 H-66Z" fill="#BFE6FA"/><rect x="-80" y="-40" width="160" height="9" fill="#FFFFFF"/><rect x="-60" y="-108" width="40" height="8" rx="4" fill="#5AA8F0"/><rect x="-74" y="-26" width="20" height="9" rx="4" fill="#FFE27A"/><rect x="54" y="-26" width="20" height="9" rx="4" fill="#FFE27A"/><path d="${star5(0,-20,10)}" fill="${C8.gold}"/><rect x="-84" y="-14" width="168" height="10" rx="5" fill="#8A93A8"/>`)}</g>`}
  else{d+=R(x,y,dw,h,'#FFFFFF',3*s);for(let j=1;j<6;j++)d+=R(x,y+j*h/6,dw,1.6*s,'#D8DCE4');d+=R(x+dw*.1,y+h*.2,dw*.8,h*.14,'#BFE6FA',2*s)}}
 // 前面的路、人行道、花
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}r)`)+R(-400,GY,W+800,12*s,'#E8E2D6')+`<path d="M-400 ${n(GY+(H-GY)*.6)} H${W+400}" stroke="#FFFFFF" stroke-width="${n(4*s)}" stroke-dasharray="${n(30*s)} ${n(20*s)}" opacity=".8"/>`;
 d+=flowers(bx,bx+bw*.3,GY+2*s,s,46)+bush(bx-20*s,GY+4*s,s,'#6CC46A',1);
 if(!P)d+=gtree(W*.05,GY+6*s,s*1.1,0)+gtree(W*.95,GY+6*s,s*1.15,2);
 if(!P)d+=bush(bx+bw+30*s,GY+4*s,s*1.1,'#5AB45A',1);
 return d}
// 逃生演練：走廊（綠色逃生指示燈、往下的樓梯、天花板警報器亮紅燈、天花板一點點煙、地上綠色箭頭；用低姿勢沿著牆走）
function fireDrill(W,H,s,P,g){const FY=H*(P?.72:.7);let d=wallIn(W,H,FY,s,g,'#F4F2EC','#E6E2D8','#C8D8C8');
 d+=tiles(W,H,FY,s,'#E2DED4','#CCC6B8',70);
 d+=R(-400,H*.05,W+800,6*s,'#D8D4CA');
 // 天花板一點點煙（在最上面，淡淡的）
 d+=smokeS(W*(P?.2:.22),H*.06,s*1.3,.38)+smokeS(W*(P?.62:.44),H*.04,s*1.1,.32);
 // 警報器（紅燈慢慢閃）
 d+=alarmS(W*(P?.82:.66),H*.08,s*1.3)+`<g${A('rd4tw',0,1.2)}><circle cx="${n(W*(P?.82:.66)+9*s)}" cy="${n(H*.08+4*s)}" r="${n(5*s)}" fill="#FF6A5A" opacity=".6"/></g>`;
 // 牆邊扶手
 d+=R(-400,FY-H*.2,W+800,4*s,'#C8925A',2*s);
 // 左邊：門（關好的房門）
 const dx=W*(P?.06:.06);d+=R(dx,FY-H*(P?.34:.42),(P?70:90)*s,H*(P?.34:.42),'#C8925A',3*s)+R(dx+8*s,FY-H*(P?.3:.38),(P?54:74)*s,H*(P?.13:.16),'#B07A44',2*s)+`<circle cx="${n(dx+(P?60:78)*s)}" cy="${n(FY-H*(P?.17:.2))}" r="${n(3.4*s)}" fill="${C8.gold}"/>`;
 // 右邊：樓梯間（往下的樓梯、扶手；逃生走樓梯，不搭電梯）
 const sx=W*(P?.56:.7),sw=(P?150:220)*s,sh=H*.5,sy=FY-sh;
 d+=R(sx,sy,sw,sh,'#E8E2D6',4*s)+R(sx+8*s,sy+8*s,sw-16*s,sh-8*s,'#D8D0C2',2*s);
 for(let k=0;k<7;k++){const t=k/7,y=sy+20*s+t*(sh-20*s),x0=sx+8*s+t*sw*.35;d+=R(x0,y,sw-16*s-t*sw*.35,(sh-20*s)/7,k%2?'#E8DCC8':'#F2E8D6')+R(x0,y,sw-16*s-t*sw*.35,2.4*s,'#FFFFFF',0,' opacity=".7"')}
 d+=`<path d="M${n(sx+14*s)} ${n(sy+10*s)} L${n(sx+sw*.42)} ${n(FY-4*s)}" stroke="${C8.mint}" stroke-width="${n(5*s)}" stroke-linecap="round"/>`+[.2,.45,.7].map(t=>`<path d="M${n(sx+14*s+t*(sw*.42-14*s))} ${n(sy+10*s+t*(FY-sy-14*s))} v${n(22*s)}" stroke="${C8.mint}" stroke-width="${n(2.4*s)}"/>`).join('');
 d+=T(sx+sw*.72,FY-sh*.4,s*1.2,`<path d="M0 -14 V10 M-8 2 L0 10 L8 2" stroke="${C8.exit}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
 d+=exitSign(sx+sw*.5,sy-18*s,s*1.2,1);
 if(!P){// 中間偏左：電梯（關著，旁邊不按）
  const ex=W*.24;d+=R(ex,FY-H*.38,100*s,H*.38,'#C8CCD8',3*s)+R(ex+6*s,FY-H*.36,42*s,H*.36,'#E2E6EE')+R(ex+52*s,FY-H*.36,42*s,H*.36,'#E2E6EE')+`<circle cx="${n(ex+112*s)}" cy="${n(FY-H*.2)}" r="${n(5*s)}" fill="#FFFFFF"/>`;}
 // 地上的綠色逃生箭頭
 for(let k=0;k<(P?3:5);k++){const x=W*(P?.14:.12)+k*(P?70:120)*s,y=FY+(P?60:50)*s;d+=`<path d="M${n(x)} ${n(y)} H${n(x+30*s)} M${n(x+20*s)} ${n(y-9*s)} L${n(x+32*s)} ${n(y)} L${n(x+20*s)} ${n(y+9*s)}" stroke="${C8.exit}" stroke-width="${n(6*s)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`}
 // 牆上的滅火器
 d+=T(W*(P?.36:.5),FY-6*s,s*.9,`<g transform="translate(-32 -58)">${OBJ46.extinguisher}</g>`);
 return d}

/* ===================== 47 派出所的黑熊警察（虛構的星光派出所：淡藍白小房子、金色星星圓牌（不是真警徽）、原創警車；回家的路、家門口；沒有字） ===================== */
const starSign=(x,y,s)=>T(x,y,s,`<circle r="22" fill="${C8.blueD}"/><circle r="18" fill="${C8.blue}"/><path d="${star5(0,0,12)}" fill="${C8.gold}"/><path d="${star5(0,-1,6)}" fill="#FFF2B0"/><path d="M-14 -8 Q-10 -15 -3 -17" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>`);
const lostBox=(x,y,s)=>T(x,y,s,`${shd(0,0,30,4,.14)}<path d="M-28 0 V-34 H28 V0Z" fill="#E8B884"/><path d="M-28 -34 L-34 -44 H22 L28 -34Z" fill="#F2CC98"/><path d="M28 -34 L34 -44 V-8 L28 0Z" fill="#C8925A"/><path d="${heartP(0,-18,7)}" fill="#FF8FB8"/><path d="M-18 -44 Q-16 -54 -8 -52 Q-6 -46 -10 -44Z" fill="#7EC6F0"/><circle cx="6" cy="-47" r="5" fill="#FFCB4D"/>`);
const counterBell=(x,y,s)=>T(x,y,s,`<ellipse cx="0" cy="0" rx="10" ry="2.6" fill="#8A8EA8"/><path d="M-8 -1 Q-8 -11 0 -11 Q8 -11 8 -1Z" fill="#FFCB4D"/><rect x="-1.4" y="-15" width="2.8" height="4" fill="#8A8EA8"/><path d="M-5 -4 Q-4 -9 0 -9.6" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".6"/>`);
function police(W,H,v='in'){const {P,s}=sc(W,H);const g=uid('pl');
 if(v==='out')return polOut(W,H,s,P,g);
 if(v==='road')return polRoad(W,H,s,P,g);
 if(v==='door')return polDoor(W,H,s,P,g);
 const FY=H*(P?.7:.66);let d=wallIn(W,H,FY,s,g,'#F2F8FF','#DCEAF8','#B8CDEE');
 d+=tiles(W,H,FY,s,'#E8E2D6','#D6CEBE',56);
 if(v==='desk'){// 櫃台近看：錢包放在櫃台上、失物招領箱、服務鈴、筆筒、小盆栽
  const cy=FY-(P?10:20)*s;d+=R(-400,H*.1,W+800,6*s,'#C8D8F0');
  d+=starSign(W*(P?.16:.08),H*.2,s*1.1)+sumWin(W*(P?.62:.74),H*.12,(P?100:170)*s,(P?90:120)*s,s,'#FFFFFF',{cross:1});
  // 牆上的小鎮地圖（綠地、路、小房子、星星；沒有字）
  if(!P){const mx=W*.17,my=H*.13,mw=W*.2,mh=H*.22;d+=R(mx-6*s,my-6*s,mw+12*s,mh+12*s,'#C8925A',4*s)+R(mx,my,mw,mh,'#E8F4DC',2*s);
   d+=`<path d="M${n(mx)} ${n(my+mh*.55)} H${n(mx+mw)} M${n(mx+mw*.4)} ${n(my)} V${n(my+mh)}" stroke="#FFFFFF" stroke-width="${n(6*s)}"/><path d="M${n(mx+mw*.62)} ${n(my)} Q${n(mx+mw*.7)} ${n(my+mh*.5)} ${n(mx+mw)} ${n(my+mh*.7)}" stroke="#9ED4F4" stroke-width="${n(7*s)}" fill="none"/>`;
   [[.12,.16,'#FF8A80'],[.2,.68,'#FFCB4D'],[.52,.18,'#A99BE8'],[.78,.2,'#7EC6F0'],[.56,.7,'#FF9AC8']].forEach(([fx,fy,c])=>d+=R(mx+mw*fx,my+mh*fy,mw*.12,mh*.2,c,1.6*s));
   d+=`<circle cx="${n(mx+mw*.3)}" cy="${n(my+mh*.4)}" r="${n(6*s)}" fill="${C8.blue}"/><path d="${star5(mx+mw*.3,my+mh*.4,4*s)}" fill="${C8.gold}"/>`+[[.7,.4,'#FF6F91'],[.15,.85,'#3CC07A']].map(([fx,fy,c])=>`<circle cx="${n(mx+mw*fx)}" cy="${n(my+mh*fy)}" r="${n(4*s)}" fill="${c}"/>`).join('')}
  d+=plantS(W*(P?.9:.62),cy+1*s,s*.9,'#7EC6F0');
  d+=shd(W*.5,FY+40*s,W*.7,10*s,.12)+R(-400,cy,W+800,(P?120:110)*s,'#7E9AD8')+R(-400,cy,W+800,14*s,'#FFFFFF',4*s)+R(-400,cy+14*s,W+800,4*s,'#C8D8F0');
  const wx=W*(P?.34:.42);d+=T(wx,cy+1*s,s*(P?1.2:1.5),`${shd(0,0,22,3,.18)}<rect x="-20" y="-16" width="40" height="16" rx="4" fill="#E8A65A"/><path d="M-20 -10 Q-20 -16 -14 -16 H14 Q20 -16 20 -10Z" fill="#C8854A"/><rect x="6" y="-12" width="14" height="8" rx="3" fill="#C8854A"/><circle cx="12" cy="-8" r="1.8" fill="#FFCB4D"/><g${A('rd4tw',0,2)}><path d="${spark(-24,-22,5)}" fill="#FFF2A8"/></g>`);
  d+=counterBell(W*(P?.8:.66),cy+1*s,s*1.3)+T(W*(P?.12:.22),cy+1*s,s*1.2,`<rect x="-7" y="-18" width="14" height="18" rx="3" fill="#7EC6F0"/>${[['#FF8A80',-4],['#FFCB4D',0],['#4FC4AE',4]].map(([c,x])=>`<rect x="${x-1}" y="-28" width="2.4" height="12" fill="${c}"/>`).join('')}`);
  d+=lostBox(W*(P?.82:.88),FY+(P?120:80)*s,s*(P?1.2:1.4));
  return d}
 // 主場景：派出所裡面（左邊櫃台＋電腦（只有色塊）、牆上星星圓牌、佈告欄（彩色小卡、沒有字）、右邊玻璃門、等候椅、失物招領箱）
 d+=R(-400,H*.1,W+800,6*s,'#C8D8F0');
 d+=starSign(W*.5,H*.12,s*.9);
 const bx=W*(P?.08:.06),bw=(P?110:170)*s;d+=R(bx,H*.2,bw,(P?80:110)*s,'#C8925A',4*s)+R(bx+6*s,H*.2+6*s,bw-12*s,(P?68:98)*s,'#F6E6C8',2*s);
 [['#FF8A80',.08,.1],['#7EC6F0',.42,.14],['#FFCB4D',.7,.08],['#8FD08A',.16,.52],['#B89CFF',.52,.56]].forEach(([c,fx,fy],k)=>{const w=bw*.26,h=(P?24:32)*s;d+=R(bx+6*s+fx*(bw-12*s),H*.2+6*s+fy*(P?68:98)*s,w,h,c,2*s,` transform="rotate(${k%2?4:-4} ${n(bx+fx*bw)} ${n(H*.2)})"`)+`<circle cx="${n(bx+6*s+fx*(bw-12*s)+w/2)}" cy="${n(H*.2+8*s+fy*(P?68:98)*s)}" r="${n(2.2*s)}" fill="#E8605A"/>`});
 // 櫃台
 const cx0=P?-20*s:W*.02,cw=P?W*.62:W*.42,cy=FY-50*s;d+=shd(cx0+cw/2,FY+4*s,cw*.55,6*s,.14)+R(cx0,cy,cw,56*s,'#7E9AD8',4*s)+R(cx0-6*s,cy-8*s,cw+12*s,12*s,'#FFFFFF',4*s)+R(cx0+cw*.1,cy+16*s,cw*.8,4*s,'#9EB6E8');
 d+=T(cx0+cw*.3,cy-8*s,s*1.1,`<rect x="-16" y="-26" width="32" height="22" rx="3" fill="#5A6E9E"/><rect x="-13" y="-23" width="26" height="16" rx="2" fill="#BFE0F8"/><rect x="-3" y="-4" width="6" height="4" fill="#5A6E9E"/><path d="M-10 -20 L-2 -20 L-10 -10Z" fill="#FFFFFF" opacity=".5"/>`)+counterBell(cx0+cw*.62,cy-8*s,s*1.1);
 // 玻璃門（右）＋外面的綠樹
 if(!P){const dx=W*.74,dw=150*s,dh=FY-H*.2;d+=R(dx-8*s,H*.2-8*s,dw+16*s,dh+8*s,'#FFFFFF',4*s);d+=`<g>${sumWin(dx,H*.2,dw,dh,s,'#C8D8F0',{cross:1})}</g>`+R(dx+dw/2-14*s,FY-dh*.5,6*s,24*s,'#8A8EA8',2*s)+R(dx+dw/2+8*s,FY-dh*.5,6*s,24*s,'#8A8EA8',2*s)}
 // 等候椅、失物招領箱、盆栽
 d+=benchS(W*(P?.56:.5),FY+(P?40:22)*s,(P?110:150)*s,s,'#7EC6F0');
 d+=lostBox(W*(P?.16:.62),FY+(P?120:20)*s,s*(P?1:1));
 d+=plantS(W*(P?.92:.97),FY+6*s,s*1.1,'#E8A07A');
 return d}
// 開場：派出所外觀（淡藍白兩層樓、星星圓牌、原創警車停在前面、路燈、行道樹、花圃）
function polOut(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'b',[[0,'#FFFFFF'],[1,'#E6EEF8']])}${lg(g+'r',[[0,'#B8BCC8'],[1,'#9EA4B4']])}</defs>`;
 const GY=H*(P?.72:.74);d+=R(-400,0,W+800,H,`url(#${g}s)`)+sunP(W*(P?.16:.1),H*.12,s)+`<g${A('rd4dr',1,16)}>${cloud(W*.72,H*.1,s*.7)}${cloud(W*.3,H*.06,s*.5,'#FFFFFF',.9)}</g>`;
 const bx=W*(P?.06:.2),bw=W*(P?.88:.56),by=H*(P?.36:.3);
 d+=gtree(bx-30*s,GY,s*1.2,0)+gtree(bx+bw+40*s,GY,s*1.25,2);
 d+=shd(bx+bw/2,GY,bw*.55,8*s,.14)+R(bx,by,bw,GY-by,`url(#${g}b)`,4*s)+`<path d="M${n(bx-16*s)} ${n(by+4*s)} L${n(bx+bw/2)} ${n(by-40*s)} L${n(bx+bw+16*s)} ${n(by+4*s)}Z" fill="${C8.blue}"/><path d="M${n(bx-16*s)} ${n(by+4*s)} H${n(bx+bw+16*s)}" stroke="${C8.blueD}" stroke-width="${n(5*s)}"/>`;
 d+=R(bx,by+(GY-by)*.46,bw,8*s,C8.blue)+starSign(bx+bw/2,by-8*s,s*.9);
 // 二樓窗戶
 for(let k=0;k<(P?2:4);k++){const wx=bx+bw*((k+.5)/(P?2:4))-26*s;d+=sumWin(wx,by+14*s,52*s,(GY-by)*.28,s,'#FFFFFF',{cross:1})}
 // 一樓：大門（中）＋兩邊窗
 const dx=bx+bw/2;d+=R(dx-34*s,GY-(GY-by)*.4,68*s,(GY-by)*.4,'#5A6E9E',4*s)+R(dx-29*s,GY-(GY-by)*.4+5*s,27*s,(GY-by)*.4-5*s,'#9ED0F0',2*s)+R(dx+2*s,GY-(GY-by)*.4+5*s,27*s,(GY-by)*.4-5*s,'#9ED0F0',2*s);
 d+=`<g${A('rd4tw',0,2.4)}><circle cx="${n(dx)}" cy="${n(GY-(GY-by)*.46)}" r="${n(6*s)}" fill="#FFF2B0"/></g>`;
 // 路、人行道、路燈、警車
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}r)`)+R(-400,GY,W+800,14*s,'#E8E2D6');
 d+=`<path d="M-400 ${n(GY+(H-GY)*.7)} H${W+400}" stroke="#FFFFFF" stroke-width="${n(4*s)}" stroke-dasharray="${n(30*s)} ${n(20*s)}" opacity=".8"/>`;
 const lx=W*(P?.9:.84);d+=R(lx-2.4*s,GY-150*s,4.8*s,150*s,'#5A6E9E')+`<path d="M${n(lx)} ${n(GY-150*s)} Q${n(lx-20*s)} ${n(GY-160*s)} ${n(lx-26*s)} ${n(GY-146*s)}" stroke="#5A6E9E" stroke-width="${n(4*s)}" fill="none"/><ellipse cx="${n(lx-26*s)}" cy="${n(GY-142*s)}" rx="${n(9*s)}" ry="${n(5*s)}" fill="#FFF2B0"/>`;
 d+=policeCar(W*(P?.34:.3),GY+(P?60:44)*s,s*(P?.8:1));
 d+=flowers(bx+bw*.62,bx+bw,GY+4*s,s,47);
 return d}
// 回家的路：明亮的人行道、小店（窗戶亮亮的、沒有招牌字）、行道樹、遠方的斑馬線；午後的陽光
function polRoad(W,H,s,P,g){let d=`<defs>${lg(g+'s',[[0,'#8FD0F4'],[.6,'#D6EEFA'],[1,'#FFF4E0']])}${lg(g+'r',[[0,'#B8BCC8'],[1,'#9EA4B4']])}${lg(g+'w',[[0,'#EDE4D4'],[1,'#DCCFB8']])}</defs>`;
 const GY=H*(P?.62:.6);d+=R(-400,0,W+800,H,`url(#${g}s)`)+sunP(W*(P?.8:.86),H*.14,s)+`<g${A('rd4dr',0,18)}>${cloud(W*.24,H*.1,s*.7)}</g>`;
 // 遠方的樓
 const r=rng(470);for(let x=-400;x<W+400;){const w=(60+r()*50)*s,h=(70+r()*90)*s;d+=R(x,GY-h,w,h,['#D8E2F2','#E4D8EE','#D2E8E4'][Math.floor(r()*3)]);for(let yy=GY-h+10*s;yy<GY-14*s;yy+=16*s)for(let xx=x+8*s;xx<x+w-12*s;xx+=16*s)d+=R(xx,yy,8*s,9*s,'#FFFFFF',1*s,' opacity=".6"');x+=w+4*s}
 // 一排小店（亮亮的）
 const shops=P?[[W*.02,'#FFE8C8','#FF8A80',1],[W*.52,'#E2F2E8','#4FC4AE',1]]:[[W*.0,'#FFE8C8','#FF8A80',1],[W*.24,'#E8E8FA','#A99BE8',0],[W*.6,'#E2F2E8','#4FC4AE',1],[W*.82,'#FFF0D8','#FFB04A',0]];
 shops.forEach(([x,c,aw,lit])=>d+=shopS(x,GY,(P?150:170)*s,(P?140:130)*s,s,c,aw,{lit}));
 // 人行道（磚）、路
 d+=R(-400,GY,W+800,(H-GY)*.55,`url(#${g}w)`);for(let x=-400;x<W+400;x+=40*s)d+=`<path d="M${n(x)} ${n(GY)} L${n(x+(x-W/2)*.3)} ${n(GY+(H-GY)*.55)}" stroke="#CFC2AC" stroke-width="${n(1.2*s)}"/>`;
 d+=R(-400,GY+(H-GY)*.55,W+800,(H-GY)*.45+10,`url(#${g}r)`)+R(-400,GY+(H-GY)*.55,W+800,6*s,'#E8E2D6');
 for(let k=0;k<6;k++)d+=R(W*.5-160*s+k*56*s,GY+(H-GY)*.66,34*s,(H-GY)*.3,'#FFFFFF',2*s,' opacity=".85"');
 d+=gtree(W*(P?.46:.5),GY+4*s,s*1.1,1);if(!P)d+=gtree(W*.04,GY+4*s,s,2);
 d+=benchS(W*(P?.62:.36),GY+(P?60:40)*s,(P?90:110)*s,s,'#E8A65A');
 return d}
// 家門口：大門、門鈴、對講機（只有色塊）、鞋架、盆栽、小窗（一個人在家不開門）
function polDoor(W,H,s,P,g){const FY=H*(P?.74:.72);let d=wallIn(W,H,FY,s,g,'#FFF6EA','#F2E4CE','#E8C8A0');
 d+=tiles(W,H,FY,s,'#E2D6C2','#CDBFA6',60);
 const dw=(P?150:170)*s,dx=W*(P?.12:.1),dy=FY-(P?300:290)*s;
 d+=R(dx-10*s,dy-10*s,dw+20*s,FY-dy+10*s,'#FFFFFF',4*s)+R(dx,dy,dw,FY-dy,'#B8784A',3*s);
 d+=R(dx+14*s,dy+16*s,dw-28*s,(FY-dy)*.38,'#A0663C',3*s)+R(dx+14*s,dy+(FY-dy)*.5,dw-28*s,(FY-dy)*.42,'#A0663C',3*s);
 d+=`<circle cx="${n(dx+dw*.5)}" cy="${n(dy+(FY-dy)*.2)}" r="${n(5*s)}" fill="#3A3A4A"/><circle cx="${n(dx+dw*.5)}" cy="${n(dy+(FY-dy)*.2)}" r="${n(2.6*s)}" fill="#BFE6FA"/>`;
 d+=R(dx+dw-24*s,dy+(FY-dy)*.48,10*s,20*s,C8.gold,3*s)+`<circle cx="${n(dx+dw-19*s)}" cy="${n(dy+(FY-dy)*.48+6*s)}" r="${n(3*s)}" fill="#FFF2B0"/>`;
 d+=R(dx+dw*.25,dy-2*s,dw*.5,3*s,'#D8C8A8');
 // 對講機、門鈴（門的右邊）
 const ix=dx+dw+(P?26:36)*s,iy=dy+(FY-dy)*.34;d+=R(ix,iy,40*s,62*s,'#E2E6EE',6*s)+R(ix+6*s,iy+8*s,28*s,22*s,'#5A6E9E',3*s)+R(ix+9*s,iy+11*s,22*s,16*s,'#9ED0F0',2*s)+`<circle cx="${n(ix+20*s)}" cy="${n(iy+44*s)}" r="${n(7*s)}" fill="${C8.gold}"/><circle cx="${n(ix+20*s)}" cy="${n(iy+44*s)}" r="${n(4*s)}" fill="#FFE27A"/>`;
 // 小窗（外面有一點點樹）
 if(!P)d+=sumWin(W*.5,H*.16,150*s,110*s,s,'#FFFFFF',{cross:2});
 // 鞋架＋小鞋子、雨傘、盆栽
 const sx=W*(P?.58:.72),sw=(P?120:150)*s;d+=shd(sx+sw/2,FY+2*s,sw*.55,5*s,.14)+R(sx,FY-58*s,sw,58*s,'#C8925A',4*s)+R(sx+6*s,FY-30*s,sw-12*s,3*s,'#A8743E');
 [[.18,'#FF8A80'],[.42,'#7EC6F0'],[.7,'#FFCB4D']].forEach(([f,c])=>d+=`<path d="M${n(sx+sw*f-12*s)} ${n(FY-34*s)} Q${n(sx+sw*f-12*s)} ${n(FY-44*s)} ${n(sx+sw*f)} ${n(FY-44*s)} H${n(sx+sw*f+10*s)} Q${n(sx+sw*f+14*s)} ${n(FY-40*s)} ${n(sx+sw*f+14*s)} ${n(FY-34*s)}Z" fill="${c}"/>`);
 d+=plantS(sx+sw+30*s,FY+4*s,s*1.1,'#7EC6F0');
 d+=`<path d="M${n(dx-10*s)} ${n(FY+14*s)} H${n(dx+dw+10*s)} L${n(dx+dw+24*s)} ${n(FY+44*s)} H${n(dx-24*s)}Z" fill="#E8A65A"/>`+`<path d="${heartP(dx+dw/2,FY+28*s,8*s)}" fill="#FFCB4D"/>`;
 d+=T(W*(P?.06:.04),FY+6*s,s*1.1,`${shd(0,0,12,3,.14)}<rect x="-10" y="-34" width="20" height="34" rx="4" fill="#7EC6F0"/><path d="M-4 -34 V-62 Q-4 -66 0 -66 M4 -34 V-56" stroke="#FF8A80" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-6 -50 Q-4 -64 2 -58 Z" fill="#FF8A80"/>`);
 d+=T(dx+dw*.5,dy-30*s,s*1.1,`<path d="M-14 0 H14 L10 -10 H-10Z" fill="#FFE27A"/><rect x="-2" y="-18" width="4" height="8" fill="#C8CCD8"/><g${A('rd4tw',0,3)}><ellipse cx="0" cy="8" rx="22" ry="8" fill="#FFF6C8" opacity=".4"/></g>`);
 d+=R(-400,FY-H*.004,W+800,2*s,'#000000',0,' opacity=".04"');
 return d}

/* ===================== 48 游泳池的哨子聲（虛構的社區游泳池：藍綠的水、水道繩、救生員高椅、淺水區、休息區；沒有字、水深不寫數字只用色帶） ===================== */
function water(x,y,w,h,s,g,deep){let d=`<defs>${lg(g+'wa',[[0,'#7FE0F0'],[1,deep||'#2EA8D8']])}</defs>`+R(x,y,w,h,`url(#${g}wa)`);
 const r=rng(480);for(let k=0;k<Math.round(w/(40*s));k++){const xx=x+r()*w,yy=y+8*s+r()*(h-16*s);d+=`<path d="M${n(xx)} ${n(yy)} q${n(6*s)} ${n(-4*s)} ${n(12*s)} 0 t${n(12*s)} 0" stroke="#FFFFFF" stroke-width="${n(1.8*s)}" fill="none" opacity=".55" stroke-linecap="round"/>`}
 return d}
const laneRope=(x0,x1,y,s,c1='#FF8A80',c2='#FFFFFF')=>{let d='';for(let x=x0;x<x1;x+=12*s)d+=`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(5.4*s)}" ry="${n(3.6*s)}" fill="${Math.round((x-x0)/(12*s))%4<2?c1:c2}"/>`;return d};
function lifeChair(x,y,s){return T(x,y,s,`${shd(0,0,40,5,.16)}<path d="M-26 0 L-16 -120 M26 0 L16 -120" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/><path d="M-22 -40 H22 M-20 -80 H20" stroke="#FFFFFF" stroke-width="5"/>
 <rect x="-22" y="-128" width="44" height="10" rx="3" fill="#FF8A80"/><rect x="-22" y="-160" width="8" height="36" rx="3" fill="#FF8A80"/><rect x="14" y="-160" width="8" height="36" rx="3" fill="#FF8A80"/><rect x="-22" y="-162" width="44" height="8" rx="3" fill="#FFFFFF"/>
 <path d="M0 -162 V-200" stroke="#E2E6EE" stroke-width="4"/><path d="M-50 -196 Q0 -236 50 -196Z" fill="#FF8A80"/>${[-30,-10,10,30].map((dx,k)=>k%2?`<path d="M${dx-10} -199 Q${dx} -${k===1?228:226} ${dx+10} -199Z" fill="#FFFFFF"/>`:'').join('')}
 <g transform="translate(30 -100)"><circle r="14" fill="#FF8A80"/><circle r="6" fill="none"/><circle r="7" fill="#BFF0F8"/>${[0,90,180,270].map(a=>`<path d="M0 -14 A14 14 0 0 1 10 -10 L5 -5 A7 7 0 0 0 0 -7Z" fill="#FFFFFF" transform="rotate(${a})"/>`).join('')}</g>`)}
const umbrellaS=(x,y,s,c1,c2='#FFFFFF')=>T(x,y,s,`${shd(0,0,44,5,.14)}<path d="M0 0 V-90" stroke="#C8CCD8" stroke-width="4"/><path d="M-60 -84 Q0 -134 60 -84Z" fill="${c1}"/>${[-36,-12,12,36].map((dx,k)=>k%2?`<path d="M${dx-12} -88 Q${dx} -120 ${dx+12} -88Z" fill="${c2}"/>`:'').join('')}<path d="M-60 -84 Q-48 -78 -36 -84 Q-24 -78 -12 -84 Q0 -78 12 -84 Q24 -78 36 -84 Q48 -78 60 -84" fill="${c1}"/>`);
const loungeS=(x,y,s,c='#7EC6F0',towel='#FF9AC8')=>T(x,y,s,`${shd(0,0,50,5,.14)}<path d="M-50 -14 H30 L50 -40" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-50 -14 H30 L50 -40" stroke="${c}" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M-44 -14 V0 M24 -14 V0" stroke="#C8CCD8" stroke-width="4"/><path d="M-20 -18 H18 L34 -36 L28 -40 L14 -22 H-20Z" fill="${towel}"/><path d="M-20 -18 H18" stroke="#FFFFFF" stroke-width="2" opacity=".7"/>`);
function pool(W,H,v='main'){const {P,s}=sc(W,H);const g=uid('po');
 if(v==='out')return poolOut(W,H,s,P,g);
 let d=`<defs>${skySum(g+'s')}${lg(g+'dk',[[0,'#F6EEE2'],[1,'#E6D8C2']])}</defs>`;
 const HY=H*(P?.34:.36),PY=H*(P?.5:.5),DY=H*(P?.86:.84);
 d+=R(-400,0,W+800,HY+20*s,`url(#${g}s)`)+sunP(W*(P?.84:.9),H*.1,s);
 if(v==='rest')d+=T(W*(P?.16:.12),H*.14,s*(P?.7:.8),`<g${A('rd4dr',0,12)}><path d="M-60 0 Q-64 -24 -38 -26 Q-30 -50 -4 -44 Q12 -62 36 -46 Q62 -50 62 -24 Q82 -20 76 0Z" fill="#9AA2C0"/><path d="M-50 -6 Q0 2 66 -6" stroke="#B8C0D8" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M6 0 L-4 16 H4 L-2 30 L14 10 H6 L12 0Z" fill="#FFE27A"/></g>`);
 else d+=`<g${A('rd4dr',1,16)}>${cloud(W*.18,H*.1,s*.7)}${cloud(W*.6,H*.06,s*.5,'#FFFFFF',.9)}</g>`;
 // 後面的樹、白色圍牆
 {const vo={main:0,warm:1,shallow:2,rest:3}[v]||0;for(let k=0;k<(P?3:6);k++){const kk=k+vo;d+=gtree(W*(k+.5)/(P?3:6)+((kk*37)%40-20)*s,HY+10*s,s*(.9+(kk%4)*.08),kk%3)}if(vo%2)d+=bush(W*.5,HY+6*s,s*1.2,'#5AB45A',1)}
 d+=R(-400,HY,W+800,22*s,'#FFFFFF')+R(-400,HY+22*s,W+800,4*s,'#D8E8F0');
 d+=R(-400,HY+26*s,W+800,PY-HY-26*s,`url(#${g}dk)`);
 if(v==='warm'){// 池邊暖身、先沖水：淋浴柱、暖身墊、拖鞋
  d+=R(-400,PY,W+800,DY-PY,`url(#${g}dk)`)+R(-400,DY,W+800,H-DY+10,`url(#${g}dk)`);
  d+=water(-400,PY+60*s,W+800,(H-PY)*.25,s,g)+R(-400,PY+56*s,W+800,6*s,'#FFFFFF');
  const sh=(x)=>T(x,PY+40*s,s*1.1,`${shd(0,0,22,4,.14)}<rect x="-4" y="-150" width="8" height="150" rx="3" fill="#C8CCD8"/><path d="M0 -150 Q0 -164 14 -164 H26" stroke="#C8CCD8" stroke-width="7" fill="none"/><ellipse cx="30" cy="-160" rx="12" ry="5" fill="#A8AEC0"/>${[[22,-140],[30,-128],[38,-140],[26,-112],[34,-100],[30,-80]].map(([x,y],k)=>`<g${A('rd4bob',k*.2,1)}><path d="M${x} ${y} q-2 4 0 5 q2 -1 0 -5Z" fill="#7EC6F0"/></g>`).join('')}`);
  d+=sh(W*(P?.12:.08))+sh(W*(P?.36:.22));
  const mx=W*(P?.5:.44),mw=(P?150:220)*s;d+=`<path d="M${n(mx)} ${n(DY-40*s)} H${n(mx+mw)} L${n(mx+mw+20*s)} ${n(DY+20*s)} H${n(mx-20*s)}Z" fill="#7FD0C0"/><path d="M${n(mx+20*s)} ${n(DY-20*s)} H${n(mx+mw-10*s)}" stroke="#FFFFFF" stroke-width="${n(3*s)}" opacity=".6"/>`;
  [[W*(P?.2:.12),'#FF8A80'],[W*(P?.3:.18),'#FFCB4D']].forEach(([x,c])=>d+=T(x,DY+30*s,s,`<ellipse cx="-6" cy="0" rx="5" ry="10" fill="${c}"/><ellipse cx="6" cy="2" rx="5" ry="10" fill="${c}"/><path d="M-9 -4 H-3 M3 -2 H9" stroke="#FFFFFF" stroke-width="2"/>`));
  if(!P)d+=T(W*.86,PY+30*s,s*1.1,`${shd(0,0,30,4,.14)}${[0,1,2,3].map(k=>`<rect x="-24" y="${-12-k*8}" width="48" height="7" rx="3" fill="${['#7EC6F0','#FFCB4D','#FF8A80','#8FD08A'][k]}"/>`).join('')}`);
  return d}
 if(v==='shallow'){// 淺水區近看：池壁上三條色帶（膝蓋、肚子、脖子的高度，沒有數字）、台階、游泳圈
  const WY=PY+10*s;d+=R(-400,PY,W+800,10*s,'#FFFFFF');
  d+=water(-400,WY,W+800,H-WY+10,s,g,'#4CC0E0');
  const wx=W*(P?.1:.06),ww=(P?90:120)*s;d+=R(wx,WY,ww,H-WY,'#E8F6FA',0,' opacity=".55"');
  [[.2,'#8FD08A'],[.42,'#FFCB4D'],[.66,'#FF8A80']].forEach(([f,c])=>d+=R(wx,WY+(H-WY)*f,ww,7*s,c,2*s));
  // 台階
  for(let k=0;k<3;k++)d+=R(W*(P?.6:.7)+k*20*s,WY+k*26*s,(P?140:200)*s,8*s,'#FFFFFF',2*s,' opacity=".7"');
  d+=`<path d="M${n(W*(P?.56:.66))} ${n(PY-50*s)} V${n(WY+50*s)} M${n(W*(P?.56:.66)+34*s)} ${n(PY-50*s)} V${n(WY+50*s)}" stroke="#C8CCD8" stroke-width="${n(5*s)}" stroke-linecap="round" fill="none"/><path d="M${n(W*(P?.56:.66))} ${n(PY-50*s)} Q${n(W*(P?.56:.66)+17*s)} ${n(PY-70*s)} ${n(W*(P?.56:.66)+34*s)} ${n(PY-50*s)}" stroke="#C8CCD8" stroke-width="${n(5*s)}" fill="none"/>`;
  d+=`<g${A('rd4bob',0,3)}>${T(W*(P?.3:.36),WY+(H-WY)*(P?.3:.36),s*(P?1.4:1.8),`<g transform="translate(-32 -32)">${OBJ46.ring}</g>`)}</g>`;
  d+=`<g${A('rd4bob',1,3.4)}>${T(W*(P?.8:.9),WY+(H-WY)*.3,s*1.2,`<g transform="translate(-32 -32)">${OBJ46.kickboard}</g>`)}</g>`;
  d+=laneRope(-400,W+400,WY+(H-WY)*(P?.62:.7),s*1.3);
  return d}
 // 池水
 d+=R(-400,PY-10*s,W+800,10*s,'#FFFFFF');
 d+=water(-400,PY,W+800,DY-PY,s,g);
 if(v==='rest'){// 休息區：陽傘、躺椅、毛巾、牆上的時鐘（遠方一朵小雷雲：打雷就上岸）
  d+=R(-400,PY+(DY-PY)*.4,W+800,H,`url(#${g}dk)`)+R(-400,PY+(DY-PY)*.4,W+800,6*s,'#FFFFFF');
  {const cx=W*(P?.9:.74),cy=HY-30*s;d+=R(cx-3*s,cy,6*s,PY-cy,'#C8CCD8')+T(cx,cy,s*1.1,`<circle r="24" fill="#FFFFFF"/><circle r="20" fill="#FFF8E8"/>${Array.from({length:12},(_,k)=>`<circle cx="${n(Math.cos(k*Math.PI/6)*15)}" cy="${n(Math.sin(k*Math.PI/6)*15)}" r="${k%3?1:1.8}" fill="#8A8EA8"/>`).join('')}<path d="M0 0 V-12 M0 0 V13" stroke="#3A3150" stroke-width="2.4" stroke-linecap="round"/><circle r="2" fill="#3A3150"/>`)}
  d+=umbrellaS(W*(P?.18:.12),DY+20*s,s*1.1,'#FF8A80')+loungeS(W*(P?.22:.2),DY+40*s,s*1.1,'#7EC6F0','#FF9AC8');
  if(!P)d+=umbrellaS(W*.52,DY+10*s,s,'#4FC4AE')+loungeS(W*.56,DY+30*s,s,'#FFCB4D','#B89CFF');
  return d}
 // 主場景：水道繩、淺水區（左邊用繩子圍起來）、救生員高椅（右）、浮板堆、梯子
 d+=laneRope(-400,W+400,PY+(DY-PY)*.35,s)+laneRope(-400,W+400,PY+(DY-PY)*.7,s,'#7EC6F0');
 d+=`<path d="M${n(W*(P?.36:.3))} ${n(PY)} L${n(W*(P?.3:.24))} ${n(DY)}" stroke="#FFCB4D" stroke-width="${n(3*s)}" stroke-dasharray="${n(8*s)} ${n(6*s)}"/>`;
 d+=R(-400,DY,W+800,H-DY+10,`url(#${g}dk)`)+R(-400,DY,W+800,8*s,'#FFFFFF');
 d+=`<path d="M${n(W*(P?.62:.7))} ${n(PY-40*s)} V${n(PY+30*s)} M${n(W*(P?.62:.7)+30*s)} ${n(PY-40*s)} V${n(PY+30*s)}" stroke="#C8CCD8" stroke-width="${n(5*s)}" stroke-linecap="round"/>`;
 d+=lifeChair(W*(P?.86:.88),PY-6*s,s*(P?.8:.9));
 d+=T(W*(P?.12:.06),DY+40*s,s,`${shd(0,0,30,4,.14)}${[0,1,2].map(k=>`<rect x="-24" y="${-10-k*8}" width="48" height="7" rx="3" fill="${['#7EC6F0','#FFCB4D','#FF8A80'][k]}"/>`).join('')}`);
 d+=`<g${A('rd4bob',.4,3.2)}>${T(W*(P?.16:.14),PY+(DY-PY)*.5,s*1.2,`<g transform="translate(-32 -32)">${OBJ46.ring}</g>`)}</g>`;
 return d}
// 開場：游泳池入口（藍綠屋頂的小房子、波浪圖形招牌（沒有字）、旋轉門、外面的花圃和樹；看得到一點點池水）
function poolOut(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'b',[[0,'#FFFFFF'],[1,'#E8F2F4']])}${lg(g+'pl',[[0,'#EDE4D4'],[1,'#D8CCB8']])}</defs>`;
 const GY=H*(P?.72:.74);d+=R(-400,0,W+800,H,`url(#${g}s)`)+sunP(W*(P?.2:.1),H*.12,s)+`<g${A('rd4dr',1,16)}>${cloud(W*.66,H*.1,s*.8)}</g>`;
 d+=gtree(W*(P?.06:.06),GY,s*1.2,0)+gtree(W*(P?.94:.92),GY,s*1.25,1);
 const bx=W*(P?.06:.16),bw=W*(P?.88:.6),by=H*(P?.38:.32);
 d+=shd(bx+bw/2,GY,bw*.55,8*s,.14)+R(bx,by,bw,GY-by,`url(#${g}b)`,6*s)+`<path d="M${n(bx-20*s)} ${n(by+10*s)} Q${n(bx+bw/2)} ${n(by-50*s)} ${n(bx+bw+20*s)} ${n(by+10*s)}Z" fill="${C8.aqua}"/>`;
 // 波浪招牌
 d+=T(bx+bw/2,by-4*s,s*1.1,`<rect x="-60" y="-22" width="120" height="40" rx="20" fill="#FFFFFF"/><path d="M-48 2 Q-36 -12 -24 2 T0 2 T24 2 T48 2" stroke="${C8.aqua}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-48 12 Q-36 0 -24 12 T0 12 T24 12 T48 12" stroke="#7EC6F0" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="40" cy="-10" r="6" fill="${C8.gold}"/>`);
 // 大門（玻璃）＋兩邊窗
 const dx=bx+bw/2;d+=R(dx-46*s,GY-(GY-by)*.56,92*s,(GY-by)*.56,'#7EC6F0',4*s)+R(dx-40*s,GY-(GY-by)*.56+6*s,38*s,(GY-by)*.56-6*s,'#BFF0F8',2*s)+R(dx+2*s,GY-(GY-by)*.56+6*s,38*s,(GY-by)*.56-6*s,'#BFF0F8',2*s);
 [bx+bw*.1,bx+bw*.72].forEach(x=>d+=R(x,by+40*s,bw*.18,(GY-by)*.34,'#BFF0F8',4*s)+`<path d="M${n(x+6*s)} ${n(by+66*s)} q${n(8*s)} ${n(-6*s)} ${n(16*s)} 0 t${n(16*s)} 0" stroke="#FFFFFF" stroke-width="${n(2*s)}" fill="none"/>`);
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}pl)`)+R(dx-60*s,GY,120*s,H-GY,'#E2D6C0');
 d+=flowers(bx-20*s,bx+bw*.36,GY+4*s,s,48)+flowers(bx+bw*.64,bx+bw+20*s,GY+4*s,s,49)+bush(bx-10*s,GY+6*s,s,'#5AB45A',1);
 d+=benchS(W*(P?.62:.74),GY+(P?90:70)*s,(P?90:120)*s,s,'#7EC6F0');
 // 一個游泳圈靠在牆邊
 d+=T(bx+bw*(P?.86:.9),GY-26*s,s*.9,`<g transform="translate(-32 -32)">${OBJ46.ring}</g>`);
 return d}

/* ===================== 49 公園騎腳踏車（虛構的河濱公園：自行車道、河、橋、草地；公園旁的路口：斑馬線、紅綠燈；沒有字、沒有真實地點） ===================== */
const pedLight=(x,y,s,red=1)=>T(x,y,s,`${shd(0,0,12,3,.14)}<rect x="-3" y="-120" width="6" height="120" fill="#7A7E92"/><rect x="-14" y="-150" width="28" height="54" rx="6" fill="#3A3E52"/><circle cx="0" cy="-136" r="9" fill="${red?'#FF6A5A':'#5A5E72'}"/><circle cx="0" cy="-110" r="9" fill="${red?'#5A5E72':'#4AD890'}"/>${red?`<circle cx="0" cy="-136" r="14" fill="#FF6A5A" opacity=".2"/>`:''}<circle cx="-3" cy="-139" r="2.6" fill="#FFFFFF" opacity=".5"/>`);
const carS=(x,y,s,c='#7EC6F0',flip)=>T(x,y,s,`<g transform="scale(${flip?-1:1} 1)">${shd(0,2,60,5,.16)}<path d="M-58 -10 V-28 Q-58 -36 -48 -38 L-30 -40 L-16 -60 Q-12 -64 -6 -64 H24 Q30 -64 34 -58 L46 -40 L52 -38 Q60 -36 60 -26 V-10Z" fill="${c}"/><path d="M-12 -58 H8 V-42 H-24Z M14 -58 H24 Q28 -58 30 -54 L38 -42 H14Z" fill="#DFF2FC"/><rect x="-60" y="-16" width="122" height="8" rx="4" fill="#8A93A8"/>${[-34,36].map(xx=>`<circle cx="${xx}" cy="-8" r="11" fill="#3A3A4A"/><circle cx="${xx}" cy="-8" r="5" fill="#C8CCD8"/>`).join('')}<rect x="50" y="-32" width="10" height="5" rx="2" fill="#FFE27A"/><path d="M-50 -34 H40" stroke="#FFFFFF" stroke-width="2" opacity=".35"/></g>`);
function park(W,H,v='main'){const {P,s}=sc(W,H);const g=uid('pk');
 if(v==='cross')return parkCross(W,H,s,P,g);
 if(v==='out')return parkOut(W,H,s,P,g);
 let d=`<defs>${skySum(g+'s')}${lg(g+'gr',[[0,'#A8E080'],[1,'#7CC860']])}${lg(g+'rv',[[0,'#8AD4F0'],[1,'#5AB4E0']])}${lg(g+'ln',[[0,'#E8907A'],[1,'#D8705A']])}</defs>`;
 const HY=H*(P?.34:.36);d+=R(-400,0,W+800,HY+10*s,`url(#${g}s)`)+sunP(W*(P?.84:.88),H*.1,s)+`<g${A('rd4dr',0,18)}>${cloud(W*.2,H*.1,s*.7)}${cloud(W*.56,H*.06,s*.45,'#FFFFFF',.9)}</g>`;
 // 遠方的山、河、橋
 d+=`<path d="M-400 ${n(HY)} Q${n(W*.1)} ${n(HY-60*s)} ${n(W*.3)} ${n(HY-20*s)} Q${n(W*.5)} ${n(HY-70*s)} ${n(W*.7)} ${n(HY-24*s)} Q${n(W*.9)} ${n(HY-56*s)} ${W+400} ${n(HY)}Z" fill="#B8DCC8"/>`;
 d+=R(-400,HY,W+800,30*s,`url(#${g}rv)`)+`<path d="M-400 ${n(HY+10*s)} H${W+400}" stroke="#FFFFFF" stroke-width="${n(1.6*s)}" stroke-dasharray="${n(20*s)} ${n(30*s)}" opacity=".6"/>`;
 if(!P||v==='main'){const bx=W*(P?.1:.06),bw=W*(P?.8:.5);d+=`<path d="M${n(bx)} ${n(HY+20*s)} Q${n(bx+bw/2)} ${n(HY-40*s)} ${n(bx+bw)} ${n(HY+20*s)}" stroke="#E8A07A" stroke-width="${n(8*s)}" fill="none"/>`+[.2,.35,.5,.65,.8].map(f=>{const x=bx+bw*f,y=HY+20*s-60*s*4*f*(1-f)*.95;return `<path d="M${n(x)} ${n(y)} V${n(HY+20*s)}" stroke="#E8A07A" stroke-width="${n(3*s)}"/>`}).join('')}
 d+=R(-400,HY+30*s,W+800,H-HY,`url(#${g}gr)`);
 if(v==='check'){// 騎車前檢查：腳踏車放大（煞車、鈴鐺、輪胎旁邊有亮亮的小星星）、安全帽放在草地上
  const bx=W*(P?.46:.4),by=H*(P?.8:.84);d+=bikeS(bx,by,s*(P?3.4:4.4),'#FF8A80',{basket:1});
  const sp=(x,y,k)=>`<g${A('rd4tw',k*.5,1.8)}><path d="${spark(x,y,9*s)}" fill="#FFF2A8"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(16*s)}" fill="#FFF6C8" opacity=".35"/></g>`;
  const k2=s*(P?3.4:4.4);d+=sp(bx+12*k2,by-42*k2,0)+sp(bx-6*k2,by-38*k2,1)+sp(bx+20*k2,by-24*k2,2);
  d+=T(W*(P?.14:.1),H*(P?.94:.9),s*(P?1.3:1.6),`<g transform="translate(-32 -50)">${OBJ46.helmet}</g>`);
  d+=flowers(-400,W+400,H*.98,s*1.2,491);
  return d}
 // 自行車道（彎彎的，左邊騎車、右邊走路；地上畫腳踏車和腳印的圖示，沒有字）
 const top=HY+40*s;d+=`<path d="M${n(W*.4)} ${n(top)} Q${n(W*.6)} ${n(top+(H-top)*.4)} ${n(W*(P?.3:.24))} ${H+10} H${n(W*(P?1.1:.96))} Q${n(W*.9)} ${n(top+(H-top)*.4)} ${n(W*.5)} ${n(top)}Z" fill="#E8DCC8"/>`;
 d+=`<path d="M${n(W*.4)} ${n(top)} Q${n(W*.6)} ${n(top+(H-top)*.4)} ${n(W*(P?.3:.24))} ${H+10} H${n(W*(P?.7:.6))} Q${n(W*.74)} ${n(top+(H-top)*.4)} ${n(W*.45)} ${n(top)}Z" fill="url(#${g}ln)"/>`;
 d+=`<path d="M${n(W*.45)} ${n(top)} Q${n(W*.74)} ${n(top+(H-top)*.4)} ${n(W*(P?.7:.6))} ${H}" stroke="#FFFFFF" stroke-width="${n(3*s)}" stroke-dasharray="${n(16*s)} ${n(12*s)}" fill="none"/>`;
 d+=T(W*(P?.5:.46),top+(H-top)*.6,s*(P?.9:1.1),`<g opacity=".8"><circle cx="-14" cy="0" r="9" fill="none" stroke="#FFFFFF" stroke-width="3"/><circle cx="14" cy="0" r="9" fill="none" stroke="#FFFFFF" stroke-width="3"/><path d="M-14 0 L-4 -14 L10 -14 L14 0 M-4 -14 L0 0" stroke="#FFFFFF" stroke-width="3" fill="none"/></g>`);
 d+=T(W*(P?.84:.78),top+(H-top)*.62,s*(P?.9:1.1),`<g opacity=".7" fill="#C8B89A"><ellipse cx="-6" cy="0" rx="4" ry="7"/><ellipse cx="6" cy="-10" rx="4" ry="7"/></g>`);
 if(v==='path'){// 自行車道上：讓走路的人（路邊的長椅、路燈、遛狗的小狗、慢慢騎的小腳踏車）
  d+=benchS(W*(P?.74:.82),top+(H-top)*.2,(P?80:110)*s,s,'#E8A65A');
  const lx=W*(P?.94:.98);d+=R(lx-2.4*s,top-90*s,4.8*s,110*s,'#5A6E9E')+`<ellipse cx="${n(lx)}" cy="${n(top-92*s)}" rx="${n(10*s)}" ry="${n(6*s)}" fill="#FFF2B0"/>`;
  d+=bikeS(W*(P?.3:.32),top+(H-top)*.36,s*(P?1.3:1.6),'#4FC4AE');
  d+=T(W*(P?.7:.66),top+(H-top)*.36,s*(P?.9:1.1),`${shd(0,0,18,3,.14)}<ellipse cx="0" cy="-14" rx="16" ry="10" fill="#FFFFFF"/><circle cx="14" cy="-22" r="9" fill="#FFFFFF"/><ellipse cx="18" cy="-28" rx="4" ry="6" fill="#8A6A4A"/><circle cx="16" cy="-23" r="1.6" fill="#2A1E36"/><ellipse cx="22" cy="-20" rx="2" ry="1.6" fill="#2A1E36"/><circle cx="-6" cy="-16" r="3.4" fill="#8A6A4A"/><path d="M-10 -6 V0 M-2 -6 V0 M6 -6 V0 M10 -6 V0" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><path d="M-16 -16 Q-22 -22 -20 -28" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 -16 Q30 -30 40 -60" stroke="#FF8A80" stroke-width="1.4" fill="none"/>`);
  d+=gtree(W*(P?.1:.08),top+(H-top)*.3,s*1.1,0)+flowers(W*.02,W*.3,H*.96,s,492);
  return d}
 // 主場景：河濱自行車道（樹、花、小腳踏車停在路邊、鳥）
 d+=gtree(W*(P?.1:.06),top+30*s,s*1.2,0)+gtree(W*(P?.9:.92),top+20*s,s*1.1,2);if(!P)d+=gtree(W*.22,top+10*s,s*.9,1)+gtree(W*.76,top+6*s,s*.9,0);
 d+=bush(W*(P?.16:.12),H*.94,s*1.2,'#5AB45A',1)+flowers(-400,W*.3,H*.98,s,493);
 d+=bikeS(W*(P?.12:.14),top+(H-top)*.5,s*(P?1.2:1.4),'#FFCB4D',{basket:1});
 d+=`<g${A('rd4dr',0,10)}>${[[.3,.16],[.36,.2]].map(([fx,fy])=>`<path d="M${n(W*fx)} ${n(H*fy)} q${n(5*s)} ${n(-5*s)} ${n(10*s)} 0 q${n(5*s)} ${n(-5*s)} ${n(10*s)} 0" stroke="#5A5C74" stroke-width="${n(1.8*s)}" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
 return d}
// 開場：公園入口（綠葉拱門、腳踏車停放架、安全帽掛勾、樹、花）
function parkOut(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'gr',[[0,'#A8E080'],[1,'#7CC860']])}${lg(g+'pl',[[0,'#EDE4D4'],[1,'#D8CCB8']])}</defs>`;
 const GY=H*(P?.66:.66);d+=R(-400,0,W+800,H,`url(#${g}s)`)+sunP(W*(P?.16:.1),H*.12,s)+`<g${A('rd4dr',1,16)}>${cloud(W*.7,H*.1,s*.8)}</g>`;
 for(let k=0;k<(P?4:8);k++)d+=gtree(W*(k+.5)/(P?4:8),GY-10*s,s*(.9+(k%3)*.12),k%3);
 d+=R(-400,GY-6*s,W+800,H,`url(#${g}gr)`);
 // 拱門（綠葉＋小花，沒有字）
 const ax=W*(P?.5:.36),aw=(P?200:240)*s;d+=`<path d="M${n(ax-aw/2)} ${n(GY)} V${n(GY-120*s)} Q${n(ax)} ${n(GY-220*s)} ${n(ax+aw/2)} ${n(GY-120*s)} V${n(GY)}" stroke="#5AA04A" stroke-width="${n(20*s)}" fill="none" stroke-linecap="round"/>`;
 const r=rng(494);for(let k=0;k<18;k++){const t=k/17,a=Math.PI*(1-t);const x=ax+Math.cos(a)*aw/2,y=t<.12||t>.88?GY-120*s+(t<.5?(.12-t):(t-.88))*600*s:GY-120*s-Math.sin(a)*100*s;d+=`<circle cx="${n(x)}" cy="${n(Math.min(y,GY-10*s))}" r="${n(5*s)}" fill="${['#FF9AC8','#FFE27A','#FFFFFF'][k%3]}"/>`}
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}pl)`)+`<path d="M${n(ax-aw*.4)} ${n(GY)} L${n(ax-aw*.9)} ${H} H${n(ax+aw*.9)} L${n(ax+aw*.4)} ${n(GY)}Z" fill="#E2D6C0"/>`;
 // 腳踏車停放架
 const rx=W*(P?.06:.62),rw=(P?150:260)*s;d+=R(rx,GY+30*s,rw,6*s,'#8A8EA8',3*s);
 const cols=['#FF8A80','#4FC4AE','#FFCB4D','#A99BE8'];for(let k=0;k<(P?2:4);k++)d+=bikeS(rx+30*s+k*(P?80:62)*s,GY+50*s,s*1.25,cols[k],{basket:k%2});
 // 安全帽架
 if(!P)d+=T(W*.94,GY+40*s,s*1.1,`${shd(0,0,24,4,.14)}<rect x="-3" y="-90" width="6" height="90" fill="#C8925A"/><rect x="-26" y="-92" width="52" height="6" rx="3" fill="#C8925A"/>${[-16,16].map((x,k)=>`<g transform="translate(${x} -84) scale(.42) translate(-32 -10)">${OBJ46.helmet.replace('#4FC4AE',k?'#FF8A80':'#4FC4AE')}</g>`).join('')}`);
 d+=flowers(-400,W+400,H*.97,s,495);
 return d}
// 公園旁的路口：斑馬線、行人紅綠燈（紅燈亮，原創樣子）、等紅燈的車、人行道邊牽著的腳踏車（過馬路下車牽著走）
function parkCross(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'r',[[0,'#A8AEBC'],[1,'#8A90A0']])}${lg(g+'w',[[0,'#EDE4D4'],[1,'#DCCFB8']])}</defs>`;
 const HY=H*(P?.4:.42);d+=R(-400,0,W+800,HY,`url(#${g}s)`)+`<g${A('rd4dr',0,18)}>${cloud(W*.2,H*.1,s*.7)}${cloud(W*.8,H*.08,s*.5)}</g>`;
 // 對面：公園的樹籬和樹、一排房子
 const r=rng(496);for(let x=-400;x<W+400;){const w=(70+r()*40)*s,h=(50+r()*50)*s;d+=R(x,HY-h,w,h,['#F2E2D2','#E2ECF6','#E8F2E0'][Math.floor(r()*3)],3*s)+`<path d="M${n(x-4*s)} ${n(HY-h)} L${n(x+w/2)} ${n(HY-h-24*s)} L${n(x+w+4*s)} ${n(HY-h)}Z" fill="${['#E8907A','#8AA8D8','#8FC07A'][Math.floor(r()*3)]}"/>`+R(x+w*.2,HY-h*.6,w*.24,h*.3,'#CFE8F8',2*s)+R(x+w*.56,HY-h*.6,w*.24,h*.3,'#CFE8F8',2*s);x+=w+10*s}
 d+=gtree(W*(P?.16:.1),HY+4*s,s,0)+gtree(W*(P?.84:.9),HY+4*s,s*1.1,1);
 d+=R(-400,HY,W+800,16*s,'#E2D6C2');
 // 馬路＋斑馬線（往前延伸）
 const RY=HY+16*s,RB=H*(P?.74:.74);d+=R(-400,RY,W+800,RB-RY,`url(#${g}r)`);
 for(let k=0;k<8;k++){const t0=k/8,t1=(k+.55)/8,y0=RY+(RB-RY)*t0,y1=RY+(RB-RY)*t1,cx=W*(P?.5:.42),hw0=(P?70:110)*s*(1+t0*.6),hw1=(P?70:110)*s*(1+t1*.6);d+=`<path d="M${n(cx-hw0)} ${n(y0)} H${n(cx+hw0)} L${n(cx+hw1)} ${n(y1)} H${n(cx-hw1)}Z" fill="#FFFFFF" opacity=".92"/>`}
 d+=`<path d="M-400 ${n(RY+(RB-RY)*.5)} H${n(W*(P?.5:.42)-(P?120:180)*s)} M${n(W*(P?.5:.42)+(P?120:180)*s)} ${n(RY+(RB-RY)*.5)} H${W+400}" stroke="#FFE27A" stroke-width="${n(4*s)}"/>`;
 // 停下來等的車（離斑馬線遠遠的）
 if(!P)d+=carS(W*.86,RY+(RB-RY)*.42,s*1.1,'#7EC6F0',1)+carS(W*.08,RY+(RB-RY)*.9,s*1.2,'#FFCB4D');else d+=carS(W*.9,RY+(RB-RY)*.46,s*.9,'#7EC6F0',1);
 // 這一邊的人行道
 d+=R(-400,RB,W+800,H-RB+10,`url(#${g}w)`)+R(-400,RB,W+800,8*s,'#C8BCA8');for(let x=-400;x<W+400;x+=40*s)d+=`<path d="M${n(x)} ${n(RB+8*s)} L${n(x+(x-W/2)*.3)} ${H}" stroke="#CFC2AC" stroke-width="${n(1.2*s)}"/>`;
 d+=pedLight(W*(P?.16:.22),RB+12*s,s*(P?1:1.1),1)+pedLight(W*(P?.66:.62),RY+6*s,s*.6,1);
 d+=bikeS(W*(P?.3:.1),RB+(P?70:50)*s,s*(P?1.3:1.5),'#FF8A80',{basket:1});
 d+=`<path d="M${n(W*(P?.5:.42)-(P?60:100)*s)} ${n(RB+18*s)} H${n(W*(P?.5:.42)+(P?60:100)*s)}" stroke="#FFCB4D" stroke-width="${n(6*s)}" stroke-dasharray="${n(10*s)} ${n(8*s)}" stroke-linecap="round" opacity=".9"/>`;
 return d}

/* ===================== 50 居家安全小偵探（主角的家：外觀、客廳、廚房、浴室、陽台；季完結頒獎典禮；沒有字，只畫正確、安全的樣子，危險物件由找危險題型自己疊上去） ===================== */
const sofaS=(x,y,w,s,c='#8FA8E8')=>shd(x+w/2,y+2*s,w*.56,6*s,.14)+R(x,y-70*s,w,40*s,c,14*s)+R(x-8*s,y-46*s,w+16*s,40*s,mixc(c,'#000000',.06),12*s)+R(x-14*s,y-56*s,22*s,52*s,c,10*s)+R(x+w-8*s,y-56*s,22*s,52*s,c,10*s)+R(x+10*s,y-6*s,6*s,8*s,'#8A6A4A')+R(x+w-16*s,y-6*s,6*s,8*s,'#8A6A4A')+R(x+w*.18,y-62*s,w*.26,24*s,'#FFCB4D',8*s)+R(x+w*.56,y-62*s,w*.26,24*s,'#FF9AC8',8*s)+R(x,y-68*s,w,4*s,'#FFFFFF',2*s,' opacity=".3"');
const curtainS=(x,y,w,h,s,c='#FFB0C8')=>`<path d="M${n(x)} ${n(y)} H${n(x+w*.22)} Q${n(x+w*.16)} ${n(y+h*.6)} ${n(x+w*.24)} ${n(y+h)} H${n(x)}Z M${n(x+w)} ${n(y)} H${n(x+w*.78)} Q${n(x+w*.84)} ${n(y+h*.6)} ${n(x+w*.76)} ${n(y+h)} H${n(x+w)}Z" fill="${c}"/>`+R(x-6*s,y-6*s,w+12*s,8*s,'#C8925A',4*s)
 // 窗簾繩收好：綁在高高的掛勾上
 +`<path d="M${n(x+w+4*s)} ${n(y+4*s)} V${n(y+h*.34)}" stroke="#E8C89A" stroke-width="${n(2*s)}"/><circle cx="${n(x+w+4*s)}" cy="${n(y+h*.34)}" r="${n(3.4*s)}" fill="#C8925A"/>`;
const frameW=(x,y,w,h,s,k=0)=>R(x,y,w,h,'#E8B04A',3*s)+R(x+4*s,y+4*s,w-8*s,h-8*s,['#BFE6FA','#FFE8F0','#E6F6DC'][k%3])+(k%3===0?`<path d="M${n(x+6*s)} ${n(y+h-6*s)} L${n(x+w*.4)} ${n(y+h*.45)} L${n(x+w*.6)} ${n(y+h*.65)} L${n(x+w*.75)} ${n(y+h*.5)} L${n(x+w-6*s)} ${n(y+h-6*s)}Z" fill="#8FD08A"/><circle cx="${n(x+w*.72)}" cy="${n(y+h*.3)}" r="${n(w*.08)}" fill="#FFCB4D"/>`:`${[[.35,'#FFB27A'],[.55,'#7EC6F0'],[.72,'#FF8A80']].map(([f,c])=>`<circle cx="${n(x+w*f)}" cy="${n(y+h*.5)}" r="${n(w*.09)}" fill="${c}"/><rect x="${n(x+w*f-w*.08)}" y="${n(y+h*.6)}" width="${n(w*.16)}" height="${n(h*.26)}" rx="${n(3*s)}" fill="${c}"/>`).join('')}`);
const stickerS=(x,y,s,k=0)=>`<g${A('rd4tw',k*.5,3)}>${T(x,y,s,`<circle r="9" fill="#FFFFFF"/><path d="${star5(0,0,7)}" fill="${['#FFCB4D','#FF8A80','#4FC4AE'][k%3]}"/><circle cx="-2" cy="-1" r="1" fill="#3A3150"/><circle cx="2" cy="-1" r="1" fill="#3A3150"/><path d="M-2 2 Q0 3.4 2 2" stroke="#3A3150" stroke-width=".8" fill="none"/>`)}</g>`;
const bookcase=(x,y,w,h,s)=>{let d=shd(x+w/2,y+2*s,w*.55,5*s,.14)+R(x,y-h,w,h,'#E8B884',4*s)+R(x+5*s,y-h+5*s,w-10*s,h-10*s,'#C8925A',2*s);const rows=3;for(let i=0;i<rows;i++){const by=y-h+5*s+(h-10*s)*(i+1)/rows;const r=rng(500+i);let xx=x+8*s;while(xx<x+w-14*s){const bw=(6+r()*5)*s,bh=(h-10*s)/rows*(.6+r()*.3);d+=R(xx,by-bh-3*s,bw,bh,['#FF8A80','#4FC4AE','#FFCB4D','#A99BE8','#7EC6F0'][Math.floor(r()*5)],1*s);xx+=bw+1*s}d+=R(x+3*s,by-3*s,w-6*s,4*s,'#A8743E')}return d};
function home(W,H,v='main'){const {P,s}=sc(W,H);const g=uid('hm');
 if(v==='out')return homeOut(W,H,s,P,g);
 if(v==='kitchen')return homeKitchen(W,H,s,P,g);
 if(v==='bath')return homeBath(W,H,s,P,g);
 if(v==='balcony')return homeBalcony(W,H,s,P,g);
 const FY=H*(P?.7:.68);let d=wallIn(W,H,FY,s,g,'#FFF4E4','#F6E4CC','#F2D2B0');
 d+=`<defs>${lg(g+'fl',[[0,'#E2B888'],[1,'#C8966A']])}</defs>`+R(-400,FY,W+800,H-FY+10,`url(#${g}fl)`);for(let x=-400;x<W+400;x+=50*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.5)} ${H}" stroke="#B88A5A" stroke-width="${n(1.2*s)}" opacity=".6"/>`;
 // 窗戶＋窗簾（繩子收在高處）；窗邊沒有椅子
 const wx=W*(P?.08:.06),ww=(P?120:180)*s,wy=H*.14,wh=(P?130:150)*s;d+=sumWin(wx,wy,ww,wh,s,'#FFFFFF',{cross:2})+curtainS(wx-10*s,wy-6*s,ww+20*s,wh+30*s,s);
 d+=stickerS(wx+ww+16*s,wy+wh*.5,s*1.2,0);
 // 地毯
 d+=`<ellipse cx="${n(W*.5)}" cy="${n(FY+(H-FY)*.45)}" rx="${n(W*(P?.42:.3))}" ry="${n((H-FY)*.26)}" fill="#FFC8DC"/><ellipse cx="${n(W*.5)}" cy="${n(FY+(H-FY)*.45)}" rx="${n(W*(P?.32:.22))}" ry="${n((H-FY)*.18)}" fill="#FFE0EC"/>`;
 if(v==='living'){// 客廳一角：書櫃、牆上的全家福、插座蓋（安全蓋）、小貼紙；桌角有防撞套
  d+=bookcase(W*(P?.58:.7),FY+4*s,(P?110:160)*s,(P?150:170)*s,s);
  d+=frameW(W*(P?.6:.42),H*(P?.16:.18),(P?90:120)*s,(P?66:84)*s,s,1);
  d+=T(W*(P?.36:.56),FY-40*s,s*1.2,`<rect x="-9" y="-12" width="18" height="24" rx="3" fill="#FFFFFF"/><rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FFE27A"/>`)+stickerS(W*(P?.36:.56)+18*s,FY-52*s,s,1);
  const tx=W*(P?.2:.3),tw=(P?120:170)*s;d+=shd(tx+tw/2,FY+60*s,tw*.6,6*s,.14)+R(tx,FY+26*s,tw,12*s,'#E8B884',6*s)+R(tx+10*s,FY+38*s,6*s,24*s,'#C8925A')+R(tx+tw-16*s,FY+38*s,6*s,24*s,'#C8925A')+`<circle cx="${n(tx)}" cy="${n(FY+32*s)}" r="${n(6*s)}" fill="#7EC6F0"/><circle cx="${n(tx+tw)}" cy="${n(FY+32*s)}" r="${n(6*s)}" fill="#7EC6F0"/>`;
  d+=plantS(W*(P?.9:.94),FY+8*s,s*1.2);
  return d}
 // 主場景：客廳全景（沙發、電視櫃（只有色塊）、書櫃、全家福、檯燈、盆栽、放大鏡和小貼紙）
 d+=frameW(W*(P?.62:.36),H*.16,(P?80:100)*s,(P?60:74)*s,s,0)+(P?'':frameW(W*.52,H*.2,70*s,54*s,s,1));
 d+=sofaS(W*(P?.36:.3),FY+40*s,(P?170:260)*s,s);
 if(!P){d+=bookcase(W*.74,FY+4*s,140*s,170*s,s);d+=T(W*.94,FY+8*s,s*1.2,`${shd(0,0,14,3,.14)}<rect x="-2" y="-110" width="4" height="110" fill="#C8925A"/><path d="M-18 -110 L-12 -136 H12 L18 -110Z" fill="#FFE27A"/><circle cx="0" cy="-118" r="30" fill="#FFF6C8" opacity=".3"/>`)}
 d+=plantS(W*(P?.9:.66),FY+10*s,s*1.1,'#7EC6F0');
 d+=T(W*(P?.16:.16),FY+(P?120:90)*s,s*(P?1.1:1.3),`<g transform="rotate(-20) translate(-32 -32)">${OBJ46.magnifier}</g>`)+stickerS(W*(P?.3:.26),FY+(P?130:100)*s,s*1.3,2);
 return d}
function homeKitchen(W,H,s,P,g){const FY=H*(P?.72:.7);let d=wallIn(W,H,FY,s,g,'#E6F6EC','#CDEBDA',null);
 // 牆上的白色磁磚
 for(let y=H*.3;y<FY-H*.2;y+=18*s)for(let x=-400;x<W+400;x+=24*s)d+=R(x,y,22*s,16*s,'#FFFFFF',2*s,' opacity=".6"');
 d+=tiles(W,H,FY,s,'#E8DCC8','#D2C2A8',60);
 // 吊櫃（清潔劑收在高高的櫃子裡，櫃門有安全鎖）
 const cx=W*(P?.04:.04),cw=W*(P?.92:.56);d+=R(cx,H*.12,cw,H*.14,'#FFFFFF',4*s)+R(cx,H*.12+H*.14-4*s,cw,4*s,'#D8E2DC');for(let k=1;k<(P?3:4);k++)d+=`<path d="M${n(cx+cw*k/(P?3:4))} ${n(H*.12)} V${n(H*.26)}" stroke="#D8E2DC" stroke-width="${n(2*s)}"/>`;
 d+=R(cx+cw*.24,H*.2,10*s,6*s,'#FFCB4D',2*s);
 // 流理台＋爐子（鍋子把手轉向裡面、沒有火）
 const ty=FY-60*s;d+=R(-400,ty,W*(P?1.4:.66)+400,FY-ty,'#FFFFFF',0)+R(-400,ty-8*s,W*(P?1.4:.66)+400,10*s,'#B8D8C8',3*s);
 for(let k=0;k<(P?3:4);k++){const x=-10*s+k*(P?110:110)*s;d+=R(x+6*s,ty+8*s,96*s,FY-ty-12*s,'#F2F6F4',3*s)+R(x+40*s,ty+20*s,22*s,4*s,'#C8D2CC',2*s)}
 const sx=W*(P?.3:.16);d+=R(sx-50*s,ty-14*s,100*s,8*s,'#5A5C74',3*s)+`<ellipse cx="${n(sx-22*s)}" cy="${n(ty-14*s)}" rx="${n(16*s)}" ry="${n(3*s)}" fill="#3A3A4A"/><ellipse cx="${n(sx+22*s)}" cy="${n(ty-14*s)}" rx="${n(16*s)}" ry="${n(3*s)}" fill="#3A3A4A"/>`;
 d+=T(sx+22*s,ty-16*s,s*1.1,`<rect x="-18" y="-18" width="36" height="18" rx="6" fill="#8A8EA8"/><rect x="-21" y="-21" width="42" height="5" rx="2.4" fill="#A8AEC0"/><path d="M-21 -18 Q-30 -20 -32 -14" stroke="#5A5C74" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-14 -14 H6" stroke="#FFFFFF" stroke-width="1.6" opacity=".4"/>`);
 d+=T(W*(P?.7:.42),ty-10*s,s*1.1,`<path d="M-24 0 Q-24 -16 0 -16 Q24 -16 24 0Z" fill="#FFCB4D"/>${[[-10,-16,'#FF6A5A'],[2,-20,'#8FD08A'],[12,-15,'#FFB04A']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="7" fill="${c}"/>`).join('')}`);
 // 冰箱（右）
 if(!P){const fx=W*.78;d+=shd(fx+60*s,FY+2*s,70*s,5*s,.14)+R(fx,FY-H*.56,120*s,H*.56,'#E8F2FA',8*s)+`<path d="M${n(fx)} ${n(FY-H*.36)} H${n(fx+120*s)}" stroke="#C8D8E8" stroke-width="${n(3*s)}"/>`+R(fx+100*s,FY-H*.5,6*s,H*.1,'#A8AEC0',3*s)+R(fx+100*s,FY-H*.3,6*s,H*.12,'#A8AEC0',3*s)+frameW(fx+20*s,FY-H*.5,40*s,30*s,s*.6,2)+stickerS(fx+80*s,FY-H*.2,s,0)}
 else d+=T(W*.86,FY+30*s,s*1.4,`<g transform="translate(-32 -60)">${OBJ46.fridge}</g>`);
 d+=stickerS(sx+64*s,ty-30*s,s*1.2,1);
 // 吊櫃下面掛著的湯勺、鍋鏟（高高的）＋流理台上的水壺；右邊的小餐桌和椅子
 d+=R(cx+cw*.62,H*.27,cw*.3,3*s,'#A8AEC0',1.4*s);[[.66,'#FF8A80'],[.74,'#7EC6F0'],[.82,'#FFCB4D']].forEach(([f,c],k)=>d+=T(cx+cw*f,H*.27+2*s,s,k===1?`<rect x="-1.4" y="0" width="2.8" height="22" fill="${c}"/><ellipse cx="0" cy="26" rx="6" ry="4" fill="${c}"/>`:`<rect x="-1.4" y="0" width="2.8" height="20" fill="${c}"/><rect x="-6" y="20" width="12" height="10" rx="2" fill="${c}"/>`));
 d+=T(W*(P?.12:.32),ty-8*s,s*1.1,`<path d="M-12 0 Q-14 -18 0 -20 Q14 -18 12 0Z" fill="#FF8A80"/><path d="M12 -12 Q20 -12 18 -4" stroke="#FF8A80" stroke-width="3" fill="none"/><rect x="-3" y="-24" width="6" height="4" rx="2" fill="#E8605A"/><path d="M-7 -14 Q-5 -17 0 -17" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".5"/>`);
 if(!P){const tx=W*.58,tw=150*s;d+=shd(tx+tw/2,FY+70*s,tw*.6,6*s,.14)+R(tx,FY+20*s,tw,12*s,'#E8B884',5*s)+R(tx+10*s,FY+32*s,7*s,38*s,'#C8925A')+R(tx+tw-17*s,FY+32*s,7*s,38*s,'#C8925A');
  [[tx-26*s],[tx+tw+6*s]].forEach(([x])=>d+=R(x,FY-10*s,20*s,40*s,'#FFB0C8',5*s)+R(x-2*s,FY+26*s,24*s,8*s,'#FF9AB8',3*s)+R(x+2*s,FY+34*s,4*s,30*s,'#C8925A')+R(x+14*s,FY+34*s,4*s,30*s,'#C8925A'));
  d+=T(tx+tw/2,FY+20*s,s,`<ellipse cx="0" cy="-2" rx="16" ry="4" fill="#FFFFFF"/><circle cx="-6" cy="-6" r="4" fill="#FF6A5A"/><circle cx="3" cy="-7" r="4" fill="#FFB04A"/><circle cx="9" cy="-5" r="3.4" fill="#8FD08A"/>`)}
 return d}
function homeBath(W,H,s,P,g){const FY=H*(P?.72:.7);let d=wallIn(W,H,FY,s,g,'#CFEEF8','#B4E0F0',null);
 for(let y=H*.36;y<FY;y+=22*s)for(let x=-400;x<W+400;x+=22*s)d+=R(x,y,20*s,20*s,'#FFFFFF',2*s,' opacity=".55"');
 d+=tiles(W,H,FY,s,'#B8DCEC','#9CC8DE',40);
 // 浴缸（左）、洗手台＋鏡子（右）、止滑墊、毛巾架、高高的櫃子
 const bx=W*(P?.02:.04),bw=(P?200:300)*s;d+=shd(bx+bw/2,FY+4*s,bw*.55,6*s,.14)+R(bx,FY-80*s,bw,80*s,'#FFFFFF',24*s)+R(bx+10*s,FY-74*s,bw-20*s,20*s,'#9ED4F4',10*s)+R(bx,FY-80*s,bw,6*s,'#E2EEF4',3*s);
 d+=`<path d="M${n(bx+bw-30*s)} ${n(FY-80*s)} V${n(FY-130*s)} H${n(bx+bw-56*s)}" stroke="#C8CCD8" stroke-width="${n(5*s)}" fill="none" stroke-linecap="round"/>`;
 [[.3,8],[.5,10],[.7,7]].forEach(([f,r])=>d+=`<circle cx="${n(bx+bw*f)}" cy="${n(FY-82*s)}" r="${n(r*s)}" fill="#FFFFFF" opacity=".9"/>`);
 // 止滑墊（有小圓點）
 const mx=W*(P?.3:.42),mw=(P?140:180)*s;d+=R(mx,FY+30*s,mw,40*s,'#8FD08A',10*s);for(let i=0;i<5;i++)for(let j=0;j<2;j++)d+=`<circle cx="${n(mx+18*s+i*mw*.18)}" cy="${n(FY+42*s+j*16*s)}" r="${n(3*s)}" fill="#FFFFFF" opacity=".7"/>`;
 if(!P){const sx=W*.76;d+=R(sx-60*s,FY-80*s,120*s,80*s,'#FFFFFF',6*s)+R(sx-50*s,FY-96*s,100*s,20*s,'#FFFFFF',10*s)+`<ellipse cx="${n(sx)}" cy="${n(FY-90*s)}" rx="${n(36*s)}" ry="${n(6*s)}" fill="#BFE6FA"/>`+R(sx-4*s,FY-120*s,8*s,26*s,'#C8CCD8',3*s);
  d+=R(sx-50*s,H*.14,100*s,110*s,'#BFE6FA',10*s)+`<path d="M${n(sx-36*s)} ${n(H*.18)} L${n(sx-10*s)} ${n(H*.18)} L${n(sx-40*s)} ${n(H*.3)}Z" fill="#FFFFFF" opacity=".6"/>`;
  d+=R(sx+70*s,H*.1,70*s,80*s,'#FFFFFF',5*s)+R(sx+92*s,H*.14,6*s,12*s,'#FFCB4D',2*s)+stickerS(sx+120*s,H*.1+60*s,s,2)}
 const tx=W*(P?.9:.56);d+=R(tx-40*s,H*.3,80*s,5*s,'#C8CCD8',3*s)+R(tx-30*s,H*.3+4*s,26*s,60*s,'#FF9AC8',4*s)+R(tx+4*s,H*.3+4*s,26*s,50*s,'#7EC6F0',4*s);
 // 牆上兩隻小鴨子玩具
 d+=T(bx+bw*.8,FY-86*s,s,`<ellipse cx="0" cy="0" rx="10" ry="7" fill="#FFD84A"/><circle cx="6" cy="-8" r="6" fill="#FFD84A"/><path d="M11 -8 L16 -6 L11 -5Z" fill="#FF9A4A"/><circle cx="7" cy="-9" r="1.2" fill="#2A1E36"/>`);
 return d}
function homeBalcony(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'f',[[0,'#E2D6C2'],[1,'#CDBFA6']])}</defs>`;
 const FY=H*(P?.74:.72);d+=R(-400,0,W+800,FY,`url(#${g}s)`)+sunP(W*(P?.8:.86),H*.12,s)+`<g${A('rd4dr',0,16)}>${cloud(W*.3,H*.12,s*.7)}</g>`;
 // 對面的屋頂、遠方的樹
 const r=rng(505);for(let x=-400;x<W+400;){const w=(80+r()*60)*s,h=(40+r()*60)*s,y=FY-H*.2;d+=R(x,y-h,w,h+H*.2,['#F2E2D2','#E2ECF6','#E8F2E0'][Math.floor(r()*3)],3*s)+`<path d="M${n(x-6*s)} ${n(y-h)} L${n(x+w/2)} ${n(y-h-30*s)} L${n(x+w+6*s)} ${n(y-h)}Z" fill="${['#E8907A','#8AA8D8','#8FC07A'][Math.floor(r()*3)]}"/>`;x+=w+20*s}
 d+=gtree(W*(P?.2:.12),FY-H*.2,s,1)+gtree(W*(P?.8:.6),FY-H*.2,s*1.1,0);
 // 高高的欄杆（直條，小朋友爬不上去）
 const RT=FY-H*(P?.3:.34);d+=R(-400,RT,W+800,8*s,'#FFFFFF',3*s);for(let x=-400;x<W+400;x+=18*s)d+=R(x,RT,5*s,FY-RT,'#FFFFFF',2*s,' opacity=".92"');
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}f)`)+R(-400,FY,W+800,6*s,'#B8AA92');
 // 曬衣桿＋衣服、洗衣機（蓋子關好）、盆栽（放在地上、離欄杆遠）
 d+=`<path d="M-400 ${n(H*.08)} H${W+400}" stroke="#C8CCD8" stroke-width="${n(4*s)}"/>`;[[.1,'#FF9AC8'],[.22,'#7EC6F0'],[.34,'#FFCB4D']].forEach(([f,c],k)=>{const x=W*(P?f*.9:f*.7);d+=`<g${A('rd4sw',k*.4,4,`transform-origin:${n(x)}px ${n(H*.08)}px`)}><path d="M${n(x-18*s)} ${n(H*.08)} H${n(x+18*s)} L${n(x+22*s)} ${n(H*.08+40*s)} H${n(x-22*s)}Z" fill="${c}"/><path d="M${n(x-6*s)} ${n(H*.08)} Q${n(x)} ${n(H*.08+6*s)} ${n(x+6*s)} ${n(H*.08)}" stroke="#FFFFFF" stroke-width="${n(2*s)}" fill="none"/></g>`});
 const wx=W*(P?.66:.76);d+=shd(wx+50*s,FY+30*s,60*s,5*s,.14)+R(wx,FY-80*s+30*s,100*s,80*s,'#FFFFFF',6*s)+R(wx,FY-80*s+30*s,100*s,16*s,'#E2E6EE',6*s)+`<circle cx="${n(wx+50*s)}" cy="${n(FY+6*s)}" r="${n(22*s)}" fill="#C8CCD8"/><circle cx="${n(wx+50*s)}" cy="${n(FY+6*s)}" r="${n(16*s)}" fill="#9ED4F4"/>`+stickerS(wx+86*s,FY-40*s,s,0);
 d+=plantS(W*(P?.16:.1),FY+40*s,s*1.2,'#FF8A80')+plantS(W*(P?.36:.24),FY+50*s,s,'#FFCB4D');
 return d}
// 開場：主角的家（兩層樓的小房子、陽台、花園、小信箱（沒有字）、門口的小路）
function homeOut(W,H,s,P,g){let d=`<defs>${skySum(g+'s')}${lg(g+'h',[[0,'#FFF4E4'],[1,'#F2DCC0']])}${lg(g+'gr',[[0,'#A8E080'],[1,'#7CC860']])}</defs>`;
 const GY=H*(P?.72:.74);d+=R(-400,0,W+800,H,`url(#${g}s)`)+sunP(W*(P?.16:.88),H*.12,s)+`<g${A('rd4dr',1,16)}>${cloud(W*.2,H*.1,s*.8)}${cloud(W*.62,H*.06,s*.5)}</g>`;
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}gr)`);
 const hx=W*(P?.08:.2),hw=W*(P?.84:.5),hy=H*(P?.36:.3);
 d+=gtree(hx-50*s,GY,s*1.3,0)+gtree(hx+hw+60*s,GY,s*1.2,2);
 d+=shd(hx+hw/2,GY,hw*.6,8*s,.14)+R(hx,hy,hw,GY-hy,`url(#${g}h)`,4*s)+`<path d="M${n(hx-26*s)} ${n(hy+8*s)} L${n(hx+hw/2)} ${n(hy-80*s)} L${n(hx+hw+26*s)} ${n(hy+8*s)}Z" fill="#E8806A"/><path d="M${n(hx-26*s)} ${n(hy+8*s)} H${n(hx+hw+26*s)}" stroke="#C8604A" stroke-width="${n(6*s)}"/>`;
 d+=R(hx+hw*.7,hy-64*s,26*s,50*s,'#C8604A',2*s);
 // 二樓陽台（高欄杆）
 const by=hy+(GY-hy)*.42;d+=sumWin(hx+hw*.12,hy+22*s,hw*.3,(GY-hy)*.26,s,'#FFFFFF',{cross:2})+sumWin(hx+hw*.58,hy+22*s,hw*.3,(GY-hy)*.26,s,'#FFFFFF',{cross:2});
 d+=R(hx+hw*.52,by-30*s,hw*.42,6*s,'#FFFFFF',2*s);for(let x=hx+hw*.52;x<hx+hw*.94;x+=12*s)d+=R(x,by-30*s,3.6*s,30*s,'#FFFFFF');d+=R(hx+hw*.52,by,hw*.42,6*s,'#E2D2B8');
 // 一樓門、窗、花台
 const dx=hx+hw*.3;d+=R(dx-30*s,GY-(GY-by)*.8,60*s,(GY-by)*.8,'#B8784A',4*s)+`<circle cx="${n(dx+18*s)}" cy="${n(GY-(GY-by)*.4)}" r="${n(4*s)}" fill="${C8.gold}"/>`+R(dx-38*s,GY-(GY-by)*.8-8*s,76*s,8*s,'#C8604A',3*s);
 d+=sumWin(hx+hw*.56,by+20*s,hw*.32,(GY-by)*.5,s,'#FFFFFF',{cross:1})+R(hx+hw*.54,by+20*s+(GY-by)*.5,hw*.36,12*s,'#C8925A',3*s)+flowers(hx+hw*.56,hx+hw*.88,by+20*s+(GY-by)*.5,s,506);
 // 門口小路、信箱、花圃、小白籬笆
 d+=`<path d="M${n(dx-26*s)} ${n(GY)} L${n(dx-70*s)} ${H} H${n(dx+70*s)} L${n(dx+26*s)} ${n(GY)}Z" fill="#E8DCC8"/>`;
 for(let x=-400;x<W+400;x+=22*s)if(Math.abs(x-dx)>60*s)d+=R(x,GY+12*s,10*s,34*s,'#FFFFFF',4*s,' opacity=".95"');d+=R(-400,GY+20*s,W+800,4*s,'#FFFFFF');
 d+=T(dx+90*s,GY+40*s,s,`<rect x="-3" y="-40" width="6" height="40" fill="#C8925A"/><rect x="-16" y="-58" width="32" height="22" rx="10" fill="#FF8A80"/><rect x="12" y="-64" width="3" height="12" fill="#FFCB4D"/><rect x="14" y="-64" width="8" height="6" fill="#FFCB4D"/>`);
 d+=flowers(-400,W+400,H*.96,s,507);
 return d}
// 季完結大結局：小鎮廣場的頒獎典禮（舞台、彩旗、星星徽章大看板（只有圖形）、氣球、彩色紙片、燈串）
function finale(W,H){const {P,s}=sc(W,H);const g=uid('fn');let d=`<defs>${lg(g+'s',[[0,'#8FD0F8'],[.6,'#D2EEFA'],[1,'#FFF4E0']])}${lg(g+'st',[[0,'#7E9AD8'],[1,'#5A76B8']])}${lg(g+'pl',[[0,'#F2E6D4'],[1,'#E0CFB4']])}${rg(g+'gw',[[0,'#FFF2B0',.9],[1,'#FFF2B0',0]])}</defs>`;
 const GY=H*(P?.62:.62);d+=R(-400,0,W+800,H,`url(#${g}s)`)+`<g${A('rd4dr',0,18)}>${cloud(W*.14,H*.1,s*.8)}${cloud(W*.84,H*.08,s*.6)}</g>`;
 for(let k=0;k<(P?3:6);k++)d+=gtree(W*(k+.5)/(P?3:6),GY-50*s,s*(.9+(k%3)*.1),k%3);
 // 舞台＋大看板（星星盾牌）
 const cx=W*.5,sw=W*(P?.9:.6);d+=R(cx-sw/2,GY-70*s,sw,70*s,`url(#${g}st)`,6*s)+R(cx-sw/2,GY-70*s,sw,10*s,'#FFFFFF',5*s,' opacity=".5"');
 for(let k=0;k<6;k++)d+=R(cx-sw/2+12*s+k*(sw-24*s)/6,GY-50*s,(sw-24*s)/6-8*s,30*s,'#9EB6E8',4*s,' opacity=".5"');
 const by=H*(P?.24:.2),bh=(P?150:170)*s;d+=`<ellipse cx="${n(cx)}" cy="${n(by+bh*.5)}" rx="${n(bh*1.2)}" ry="${n(bh*.9)}" fill="url(#${g}gw)"/>`;
 d+=T(cx,by+bh*.5,s*(P?2.6:3),`<path d="M0 -26 L22 -18 V0 Q22 20 0 30 Q-22 20 -22 0 V-18Z" fill="${C8.blue}"/><path d="M0 -21 L17 -14 V0 Q17 15 0 24 Q-17 15 -17 0 V-14Z" fill="#FFFFFF" opacity=".25"/><path d="${star5(0,1,11)}" fill="${C8.gold}"/><path d="${star5(0,1,5)}" fill="#FFF6C8"/>`);
 d+=`<g${A('rd4tw',0,2.4)}>${[[-1,-.3],[1,-.4],[-1.2,.5],[1.1,.6]].map(([fx,fy])=>`<path d="${spark(cx+fx*bh*.8,by+bh*.5+fy*bh*.6,8*s)}" fill="#FFF2A8"/>`).join('')}</g>`;
 // 彩旗、燈串
 d+=bunting(-400,W+400,H*.06,60*s,s,[C8.red,C8.gold,C8.mint,C8.blue,C8.coral,C8.lav]);
 // 廣場地面
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}pl)`);for(let x=-400;x<W+400;x+=60*s)d+=`<path d="M${n(x)} ${n(GY)} L${n(x+(x-W/2)*.5)} ${H}" stroke="#D6C6AA" stroke-width="${n(1.2*s)}"/>`;
 d+=`<path d="M${n(cx-60*s)} ${n(GY)} L${n(cx+60*s)} ${n(GY)} L${n(cx+150*s)} ${H} L${n(cx-150*s)} ${H}Z" fill="${C8.red}" opacity=".85"/><path d="M${n(cx-60*s)} ${n(GY)} L${n(cx-150*s)} ${H} M${n(cx+60*s)} ${n(GY)} L${n(cx+150*s)} ${H}" stroke="${C8.gold}" stroke-width="${n(4*s)}"/>`;
 // 兩邊：消防車、警車停著，氣球
 if(!P){d+=fireTruck(W*.06,GY+40*s,s*.6,{flip:1})+policeCar(W*.94,GY+36*s,s*.7)}
 [[W*.14,H*.36,C8.coral],[W*.18,H*.32,C8.gold],[W*.86,H*.36,C8.mint],[W*.9,H*.31,C8.lav]].forEach(([x,y,c],k)=>d+=`<g${A('rd4bob',k*.6,3)}><path d="M${n(x)} ${n(y+22*s)} Q${n(x-6*s)} ${n(y+50*s)} ${n(x+2*s)} ${n(GY-20*s)}" stroke="#B8A890" stroke-width="${n(1.2*s)}" fill="none"/><ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(17*s)}" ry="${n(21*s)}" fill="${c}"/><ellipse cx="${n(x-6*s)}" cy="${n(y-7*s)}" rx="${n(4*s)}" ry="${n(7*s)}" fill="#FFFFFF" opacity=".45"/></g>`);
 const r=rng(500);for(let i=0;i<36;i++){const x=r()*W,y=r()*GY;d+=`<rect${i%3?'':A('rd4tw',(i*.3)%3,2)} x="${n(x)}" y="${n(y)}" width="${n(6*s)}" height="${n(3*s)}" fill="${[C8.coral,C8.gold,C8.mint,C8.lav,C8.sky][i%5]}" transform="rotate(${Math.round(r()*180)} ${n(x)} ${n(y)})"/>`}
 return d}

/* ===================== 1. 新朋友（100×100 全身；腳 y≈94、影子 y=96；表情 e＝happy 開心／talk 說話） ===================== */
const mouthE=(e,x,y,w=3.4)=>e==='talk'?`<path d="M${n(x-w)} ${n(y-.4)} Q${n(x)} ${n(y+w*1.9)} ${n(x+w)} ${n(y-.4)} Q${n(x)} ${n(y+.8)} ${n(x-w)} ${n(y-.4)}Z" fill="#6A2A3A"/><ellipse cx="${n(x)}" cy="${n(y+w*.95)}" rx="${n(w*.5)}" ry="${n(w*.3)}" fill="#FF8FA0"/>`:openSmile(x,y,w,w*.8);
// 小哨子（掛在脖子上）
const whistleN=(x,y,c=C8.gold)=>`<path d="M${n(x-7)} ${n(y-12)} Q${n(x-2)} ${n(y-2)} ${n(x)} ${n(y)} Q${n(x+2)} ${n(y-2)} ${n(x+7)} ${n(y-12)}" stroke="#FF8A80" stroke-width="1" fill="none"/><path d="M${n(x-3)} ${n(y)} H${n(x+3)} Q${n(x+6)} ${n(y)} ${n(x+6)} ${n(y+3)} Q${n(x+6)} ${n(y+6)} ${n(x+3)} ${n(y+6)} Q${n(x)} ${n(y+6)} ${n(x)} ${n(y+3)} H${n(x-3)}Z" fill="${c}"/><circle cx="${n(x+3)}" cy="${n(y+3)}" r="1.2" fill="#E0A030"/>`;
// --- 消防隊的斑點狗斑斑（firedog46）：白色、咖啡色斑點（一隻眼睛有圓斑）、大垂耳；芥末黃消防外套＋銀色反光條、紅色小頭盔（金色星星）；一隻手揮揮 ---
function firedogAN(e='happy'){const g=uid('fd');const c='#FFFFFF',c2='#E2DCEA',sp='#A8744E';
 const coat=`<path d="M37.6 57 Q31 70 34 83 Q50 89 66 83 Q69 70 62.4 57 Q56 54 50 60 Q44 54 37.6 57Z" fill="#E8B84A"/><path d="M34.6 71 Q50 75 65.4 71" stroke="#E8ECF2" stroke-width="3"/><path d="M34.6 71 Q50 75 65.4 71" stroke="#FFFFFF" stroke-width="1" opacity=".8"/><path d="M50 60 V86" stroke="#C8962A" stroke-width="1.2"/><path d="M44 56 L50 63 L56 56" fill="#C8962A"/>`;
 const head=`<defs>${rg(g+'h',[[0,'#FFFFFF'],[.7,c],[1,c2]],.4,.3,.8)}</defs>
  <path d="M30 26 Q22 30 24 46 Q26 54 32 52 Q36 40 36 30Z" fill="${sp}"/><path d="M70 26 Q78 30 76 46 Q74 54 68 52 Q64 40 64 30Z" fill="${sp}"/>
  <ellipse cx="50" cy="35" rx="19" ry="17.6" fill="url(#${g}h)"/><ellipse cx="43" cy="31" rx="7" ry="6.4" fill="${sp}" opacity=".9"/><circle cx="60" cy="22" r="2.6" fill="${sp}" opacity=".8"/><circle cx="64" cy="27" r="1.8" fill="${sp}" opacity=".8"/>
  <ellipse cx="50" cy="42" rx="9" ry="6.6" fill="#FFF6EE"/>${eyes2(43,57,32,2.8,3.3)}<ellipse cx="50" cy="38.6" rx="3.4" ry="2.4" fill="#3A2A30"/><ellipse cx="49" cy="37.8" rx="1.1" ry=".6" fill="#FFFFFF" opacity=".6"/>
  ${mouthE(e,50,42.4,3.2)}${cheek(39,40,3,'#FF9FB8',.55)}${cheek(61,40,3,'#FF9FB8',.55)}`;
 const hat=`<ellipse cx="50" cy="19.6" rx="17" ry="3" fill="#C8432F"/><path d="M36 19 Q35 6 50 5 Q65 6 64 19Z" fill="#F0604A"/><path d="M49 5.4 Q50 3.6 51 5.4 V19 H49Z" fill="#C8432F"/><circle cx="50" cy="13" r="3.6" fill="${C8.gold}"/><path d="${star5(50,13,2.4)}" fill="#FFF2B0"/><path d="M39 15 Q40 9 45 7" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".5" stroke-linecap="round"/>`;
 const tail=`<path d="M62 80 Q74 78 74 68" stroke="${c2}" stroke-width="4.6" fill="none" stroke-linecap="round"/><circle cx="73.6" cy="68" r="2" fill="${sp}"/>`;
 return body7({c,c2,hand:'#FFFFFF',feet:sp,pants:'#5A5C74',shoe:'#3A3A4A',pose:e==='talk'?'side':'wave',outfit:coat,sleeve:'#E8B84A',tail,head,hat,
  prop:e==='talk'?`<g transform="translate(72 70)"><rect x="-4" y="-7" width="8" height="12" rx="3" fill="${C8.red}"/><rect x="-2.6" y="-4" width="5.2" height="4" rx="1" fill="#FFFFFF"/></g>`:''})}
// --- 黑熊警察（bearcop47）：就是遊戲裡的黑熊警察（blackbear 的頭和身體、胸口白色 V 字），加深藍警察帽（金色星星，不是真警徽）、深藍背心＋亮黃反光條、淺藍袖子、哨子 ---
function bearcopAN(e='happy'){const vest=`<path d="M37 57 Q31 70 34 82 Q50 89 66 82 Q69 70 63 57 L57 55 L50 64 L43 55Z" fill="#2E4E9A"/><path d="M34.5 73 Q50 78 65.5 73" stroke="#D8F04A" stroke-width="3" fill="none"/><path d="M41 58 L50 66 L59 58 L56 57 L50 62 L44 57Z" fill="#F4EEE2"/><path d="${star5(58,66,2.8)}" fill="${C8.gold}"/><rect x="40" y="63" width="7" height="4" rx="1" fill="#9EC0F2"/>`+whistleN(44,66);
 const cap=`<path d="M30.4 17 Q30 3 50 2 Q70 3 69.6 17Z" fill="#2E4E9A"/><rect x="29.6" y="14.6" width="40.8" height="5.4" rx="2.4" fill="#1E2F60"/><path d="M33 20 Q50 27 67 20" stroke="#14204A" stroke-width="4.4" fill="none" stroke-linecap="round"/><circle cx="50" cy="9.6" r="4" fill="${C8.gold}"/><path d="${star5(50,9.6,2.6)}" fill="#FFF2B0"/><path d="M35 11 Q38 5 45 4" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".35" stroke-linecap="round"/>`;
 try{if(typeof G.fullBody==='function'){let s=G.fullBody('blackbear',{pose:e==='talk'?'side':'wave',outfit:vest,sleeve:'#7E9AD8',hat:cap});
  if(e==='talk')s=s.replace('<path d="M45 65 Q50 69 55 65" fill="none" stroke="#1A1418" stroke-width="2" stroke-linecap="round"/>','<path d="M44.6 64.4 Q50 74 55.4 64.4 Q50 66.4 44.6 64.4Z" fill="#6A2A3A"/><ellipse cx="50" cy="69.4" rx="2.6" ry="1.6" fill="#FF8FA0"/>');
  else s=s.replace('<path d="M45 65 Q50 69 55 65" fill="none" stroke="#1A1418" stroke-width="2" stroke-linecap="round"/>','<path d="M44.4 64.4 Q50 72 55.6 64.4Z" fill="#6A2A3A"/><path d="M47 68 Q50 70 53 68" stroke="#FF8FA0" stroke-width="1.6" fill="none" stroke-linecap="round"/>');
  // 頭圖下緣的肩膀（深色）會蓋住警察背心：拿掉，胸口白色 V 字留著
  s=s.replace('<path d="M12 100 Q12 76 50 74 Q88 76 88 100Z" fill="#2B2630"/>','');
  return s.replace(/^<svg[^>]*>|<\/svg>$/g,'')}}catch(e){}
 return body7({c:'#3A3446',c2:'#26212F',hand:'#4A4356',feet:'#26212F',pose:'wave',outfit:vest,sleeve:'#7E9AD8',hat:cap,head:`<circle cx="30" cy="22" r="8" fill="#2B2630"/><circle cx="70" cy="22" r="8" fill="#2B2630"/><circle cx="50" cy="36" r="21" fill="#36303E"/><ellipse cx="50" cy="45" rx="11" ry="8" fill="#C9A27A"/>${eyes2(42,58,33,2.8,3.4)}<ellipse cx="50" cy="41" rx="3.6" ry="2.6" fill="#1A1418"/>${mouthE(e,50,46,3.2)}`})}
// --- 救生員海獺教練浪浪（otter48）：咖啡色海獺、奶油色臉、小圓耳朵、鬍鬚；紅色救生員背心＋白色條紋（沒有字、不用紅十字）、脖子掛哨子、抱著浮板 ---
function otterAN(e='happy'){const g=uid('ot');const c='#A8744E',c2='#7E5232',fc='#F2DCC0';
 const vest=`<path d="M37.6 57 Q31 70 34 82 Q50 88 66 82 Q69 70 62.4 57 L56 55 L50 64 L44 55Z" fill="#F0604A"/><path d="M35 66 Q50 70 65 66" stroke="#FFFFFF" stroke-width="3.4" fill="none"/><path d="M34.6 76 Q50 80 65.4 76" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".8"/>`+whistleN(50,63);
 const head=`<defs>${rg(g+'h',[[0,'#C8946A'],[.65,c],[1,c2]],.4,.3,.8)}</defs><circle cx="33" cy="22" r="5" fill="${c2}"/><circle cx="67" cy="22" r="5" fill="${c2}"/><circle cx="33" cy="22" r="2.4" fill="#E8B898"/><circle cx="67" cy="22" r="2.4" fill="#E8B898"/>
  <ellipse cx="50" cy="34" rx="19" ry="17" fill="url(#${g}h)"/><ellipse cx="50" cy="41" rx="12" ry="8.6" fill="${fc}"/><ellipse cx="44" cy="25" rx="5" ry="2.6" fill="#FFFFFF" opacity=".2"/>
  ${eyes2(43,57,31.6,2.8,3.3)}<ellipse cx="50" cy="37.4" rx="3.6" ry="2.6" fill="#3A2420"/><ellipse cx="49" cy="36.6" rx="1.1" ry=".6" fill="#FFFFFF" opacity=".6"/>
  ${[[40,39],[40,42],[60,39],[60,42]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7" fill="#B8946A"/>`).join('')}<path d="M36 40 H30 M36 42.4 L30.6 44 M64 40 H70 M64 42.4 L69.4 44" stroke="#FFFFFF" stroke-width=".7" opacity=".9"/>
  ${mouthE(e,50,41.6,3)}${cheek(39,38,2.8,'#FF9FB8',.5)}${cheek(61,38,2.8,'#FF9FB8',.5)}`;
 const board=`<g transform="translate(50 76)"><rect x="-13" y="-10" width="26" height="22" rx="7" fill="#7EC6F0"/><rect x="-8" y="-7" width="5" height="8" rx="2.4" fill="#FFFFFF" opacity=".85"/><rect x="3" y="-7" width="5" height="8" rx="2.4" fill="#FFFFFF" opacity=".85"/><path d="M-11 7 Q0 11 11 7" stroke="#FFCB4D" stroke-width="2" fill="none"/></g>`;
 const tail=`<path d="M60 84 Q76 88 80 78 Q78 74 70 78 Q64 80 58 80Z" fill="${c2}"/>`;
 return body7({c,c2,hand:c2,feet:c2,belly:fc,pose:e==='talk'?'wave':'hold',outfit:vest,sleeve:c,tail,head,front:e==='talk'?'':board,prop:e==='talk'?`<g transform="translate(30 80)"><rect x="-8" y="-6" width="16" height="13" rx="4" fill="#7EC6F0"/></g>`:''})}
// --- 橘貓小橘（cat49）：橘色虎斑、白色嘴邊、三角耳；戴薄荷綠腳踏車安全帽、扣好扣環；比讚 ---
const CAT={c:'#F6A24A',c2:'#D8782A',st:'#E0782A',w:'#FFF4E4'};
function catHead(g,e,x=50,y=34,k=1,helmet=true){const H_=`<defs>${rg(g+'h',[[0,'#FFC88A'],[.6,CAT.c],[1,CAT.c2]],.4,.3,.8)}</defs>`;
 let s=H_+`<g transform="translate(${x} ${y}) scale(${k}) translate(-50 -34)"><path d="M32 28 L30 10 L44 20Z M68 28 L70 10 L56 20Z" fill="${CAT.c}"/><path d="M34 24 L33 14 L41 20Z M66 24 L67 14 L59 20Z" fill="#FFB8B0"/>
  <ellipse cx="50" cy="35" rx="19" ry="16.6" fill="url(#${g}h)"/><path d="M44 19.6 L45 26 M50 19 V26 M56 19.6 L55 26" stroke="${CAT.st}" stroke-width="2" stroke-linecap="round"/><path d="M31.6 34 H36 M31.6 38 H35.6 M68.4 34 H64 M68.4 38 H64.4" stroke="${CAT.st}" stroke-width="1.6" stroke-linecap="round"/>
  <ellipse cx="50" cy="42" rx="9.6" ry="6.4" fill="${CAT.w}"/>${eyes2(43,57,33,2.8,3.3)}<path d="M48 38 H52 L50 40.4Z" fill="#FF8FA0"/>
  ${mouthE(e,50,42.4,3)}${cheek(38.6,40,2.8,'#FF9FB8',.6)}${cheek(61.4,40,2.8,'#FF9FB8',.6)}<path d="M38 41 H31 M38 43 L31.6 45 M62 41 H69 M62 43 L68.4 45" stroke="#FFFFFF" stroke-width=".7" opacity=".9"/>`;
 if(helmet)s+=`<path d="M29.4 27 Q28 6 50 5 Q72 6 70.6 27 Q60 22 50 22 Q40 22 29.4 27Z" fill="#4FC4AE"/><path d="M29.4 27 Q40 22 50 22 Q60 22 70.6 27 L70.6 29.4 Q60 24.6 50 24.6 Q40 24.6 29.4 29.4Z" fill="#2E9A86"/>${[42,50,58].map(x=>`<path d="M${x} 8 Q${x+.6} 13 ${x} 18" stroke="#2E9A86" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}<path d="M34 18 Q36 10 44 8" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/><path d="M31 28 Q33 46 46 47.4 M69 28 Q67 46 54 47.4" stroke="#3A3A4A" stroke-width="1.2" fill="none"/><rect x="46.6" y="45.6" width="6.8" height="4" rx="1.2" fill="${C8.gold}"/>`;
 return s+'</g>'}
function catAN(e='happy'){const g=uid('ct');
 const tail=`<path d="M62 84 Q78 86 78 70 Q78 62 72 62" stroke="${CAT.c}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M76.6 74 L79 72 M77.4 67 L80 66" stroke="${CAT.st}" stroke-width="2" stroke-linecap="round"/>`;
 const stripes=`<path d="M36 64 Q40 66 39 70 M64 64 Q60 66 61 70 M35 74 Q39 76 38 80 M65 74 Q61 76 62 80" stroke="${CAT.st}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 const thumb=e==='talk'?'':`<path d="M73 41 V36.4" stroke="${CAT.c}" stroke-width="3.4" stroke-linecap="round"/><circle cx="73" cy="35.6" r="1.8" fill="${CAT.w}"/>`;
 return body7({c:CAT.c,c2:CAT.c2,hand:CAT.w,feet:CAT.w,belly:CAT.w,pose:e==='talk'?'side':'wave',outfit:stripes,tail,head:catHead(g,e),front:thumb})}
// --- 小橘騎腳踏車（cat49bike）：同一隻貓坐在小腳踏車上（原創造型：薄荷綠車架、鈴鐺、籃子），戴好安全帽、雙手握把手 ---
function catBikeAN(e='happy'){const g=uid('cb');let s=shd(50,96,40,3.4);
 const k=1.3,bx=50,by=94;const P_=(x,y)=>[bx+x*k,by+y*k];
 // 後面的腳（踩在踏板上）
 const [hx,hy]=[44,52],[px,py]=P_(4,-8);s+=`<path d="M${hx} ${hy} Q${hx+12} ${hy+10} ${n(px)} ${n(py)}" stroke="${CAT.c2}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="${n(px+2)}" cy="${n(py)}" rx="4.4" ry="2.6" fill="${CAT.w}"/>`;
 s+=bikeS(bx,by,k,'#4FC4AE',{basket:1});
 // 尾巴
 s+=`<path d="M39 52 Q30 54 28 46 Q28 42 31 41" stroke="${CAT.c}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M28.6 46 L31 45.4" stroke="${CAT.st}" stroke-width="1.6" stroke-linecap="round"/>`;
 // 身體（坐在座墊上，往前傾）
 s+=`<defs>${rg(g+'b',[[0,'#FFC88A'],[.6,CAT.c],[1,CAT.c2]],.38,.3,.8)}</defs><path d="M38 52 Q34 40 42 32 Q52 26 60 34 Q64 44 56 54 Q46 58 38 52Z" fill="url(#${g}b)"/><ellipse cx="51" cy="44" rx="5.6" ry="7" fill="${CAT.w}" opacity=".95"/><path d="M41 40 Q44 42 43 46 M40 48 Q43 50 42 53" stroke="${CAT.st}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
 // 前面的腳（踩在另一邊的踏板）
 const [qx,qy]=P_(-2,-16);s+=`<path d="M48 54 Q56 60 ${n(qx+4)} ${n(qy)}" stroke="${CAT.c}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="${n(qx+6)}" cy="${n(qy)}" rx="4.4" ry="2.6" fill="${CAT.w}"/>`;
 // 手握把手
 const [rx,ry]=P_(12,-41);s+=`<path d="M56 38 Q64 40 ${n(rx)} ${n(ry+1)}" stroke="${CAT.c}" stroke-width="6.4" fill="none" stroke-linecap="round"/><circle cx="${n(rx)}" cy="${n(ry+1)}" r="3.6" fill="${CAT.w}"/>`;
 s+=catHead(g,e,56,22,.86);
 return s}
const CH46={
 firedog46:{f:firedogAN,ch:46,name:'消防隊的斑點狗斑斑',alt:'斑斑',newArt:1},
 bearcop47:{f:bearcopAN,ch:47,name:'黑熊警察',alt:'黑熊警察',base:'blackbear'},
 otter48:{f:otterAN,ch:48,name:'救生員海獺教練浪浪',alt:'浪浪',newArt:1},
 cat49:{f:catAN,ch:49,name:'橘貓小橘',alt:'小橘',newArt:1},
 cat49bike:{f:catBikeAN,ch:49,name:'小橘騎腳踏車',alt:'小橘',newArt:1}};
Object.keys(CH46).forEach(k=>{const f0=CH46[k].f;CH46[k].svg=(a='',e)=>W7(f0(e),a)});
G.CH46=CH46;G.CH46_NAME={firedog46:'斑斑',bearcop47:'黑熊警察',otter48:'浪浪',cat49:'小橘',cat49bike:'小橘'};

/* ===================== 2. 寵物小斑點狗（照 PET41 的成長、配件錨點做法） ===================== */
const HK46=[1.24,1.1,1],FS46=[.68,.84,1],PIV46=[60,68];
const P19M={
 tuft:`<path d="M86 24.5 Q81 15 86.5 10.5 Q92.5 7.5 93.5 13 Q94 17 89.6 16.6 Q87.4 16 88.6 13.8" stroke="#7A3A1E" stroke-width="2.3" fill="none" stroke-linecap="round" opacity=".85"/><path d="M83 24 Q81.5 19 84 15.5" stroke="#7A3A1E" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/>`,
 clip:`<path d="${star5(78,21,5.2)}" fill="#FFD84A" stroke="#FFFFFF" stroke-width="1.3" stroke-linejoin="round"/><circle cx="78" cy="21" r="1.4" fill="#FF8FB8"/>`,
 bib:`<path d="M62.5 59.5 Q73 66 83.5 59.5 Q85 71.5 73 77 Q61 71.5 62.5 59.5Z" fill="#FFFFFF" stroke="#F4AECB" stroke-width="1.4" stroke-linejoin="round"/><path d="M65.5 62.6 Q73 67.6 80.5 62.6" stroke="#FF9FC4" stroke-width="1.5" fill="none" stroke-dasharray="2.2 2.2" stroke-linecap="round"/><path d="${heartP(73,70.5,3.4)}" fill="#FF8FB8"/>`,
 medal:`<path d="M65 59 L71 70 L75 70 L81 59" stroke="#5C7CE8" stroke-width="3.2" fill="none" stroke-linejoin="round"/><path d="M68 59 L72.4 67 M78 59 L73.6 67" stroke="#FF8FB8" stroke-width="1.3" fill="none"/><circle cx="73" cy="73" r="6.2" fill="#F2B23A" stroke="#FFF2B8" stroke-width="1.4"/><path d="${star5(73,73,4)}" fill="#FFF6C8"/>`};
const ANC46={h:[60,24],n:[60,70],s:1};
function anchorAt(st){const hk=HK46[st]||1;const [px,py]=PIV46;return {h:[+(px+(ANC46.h[0]-px)*hk).toFixed(1),+(py+(ANC46.h[1]-py)*hk).toFixed(1)],n:ANC46.n.slice(),s:+(ANC46.s*hk).toFixed(3)}}
const atHead=(st,inner)=>{const a=anchorAt(st);return `<g transform="translate(${a.h[0]} ${a.h[1]}) scale(${a.s}) translate(-85 -24)">${inner}</g>`};
const atNeck=(st,inner)=>{const a=anchorAt(st);return `<g transform="translate(${a.n[0]} ${a.n[1]}) scale(${ANC46.s}) translate(-73 -63)">${inner}</g>`};
// 小斑點狗（120×120，viewBox 0 -6 120 120；坐著；白色、咖啡色圓斑點、大垂耳、紅色小領巾＋金色小牌子；斑斑的小寶寶；原創造型）
const SD={w:'#FFFFFF',wD:'#E4DEEC',wL:'#FFFFFF',sp:'#B07A50',spD:'#8A5A36',ear:'#9A643E',nose:'#3A2A30',sc:'#F0604A'};
function sdDefs(g){return `<defs>${rg(g+'h',[[0,'#FFFFFF'],[.62,SD.w],[1,SD.wD]],.42,.3,.8)}${rg(g+'b',[[0,'#FFFFFF'],[.6,'#FBF8FF'],[1,SD.wD]],.4,.25,.85)}${lg(g+'e',[[0,'#B87A4E'],[1,SD.ear]])}</defs>`}
// 頭（絕對座標，頭中心約 60,46；脖子 60,68）
function sdHead(g,e='normal'){let s='';
 // 大垂耳
 s+=`<path d="M34 30 Q20 30 18 50 Q17 62 26 64 Q34 64 36 50Z" fill="url(#${g}e)"/><path d="M86 30 Q100 30 102 50 Q103 62 94 64 Q86 64 84 50Z" fill="url(#${g}e)"/>`;
 s+=`<path d="M30 52 Q30 26 60 24 Q90 26 90 52 Q90 72 60 73 Q30 72 30 52Z" fill="url(#${g}h)"/>`;
 s+=`<ellipse cx="47" cy="44" rx="9" ry="8.4" fill="${SD.sp}" opacity=".85"/><circle cx="75" cy="33" r="3.6" fill="${SD.sp}" opacity=".8"/><circle cx="81" cy="40" r="2.4" fill="${SD.sp}" opacity=".8"/><path d="M48 28 Q56 25 64 26" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>`;
 s+=`<ellipse cx="60" cy="60" rx="13" ry="9.6" fill="#FFF8F2"/>`;
 // 眼睛
 if(e==='happy'||e==='eat')s+=`<path d="M42.6 48 Q47 42.6 51.4 48 M68.6 48 Q73 42.6 77.4 48" stroke="#2A1A1A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 else if(e==='sleep')s+=`<path d="M42.6 47 Q47 51 51.4 47 M68.6 47 Q73 51 77.4 47" stroke="#2A1A1A" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
 else s+=eyes2(47,73,47.6,e==='wow'?5.2:4.6,e==='wow'?6:5.4,'#2A1612');
 // 鼻子、嘴巴、腮紅
 s+=`<path d="M54.6 54 Q60 51 65.4 54 Q64 58.6 60 59.4 Q56 58.6 54.6 54Z" fill="${SD.nose}"/><ellipse cx="58.4" cy="53.6" rx="1.8" ry="1" fill="#FFFFFF" opacity=".55"/>`;
 if(e==='happy'||e==='play'||e==='talk')s+=`<path d="M53.6 61.4 Q60 ${e==='talk'?72:70} 66.4 61.4Z" fill="#6A2A3A"/><path d="M56.6 65 Q60 ${e==='talk'?69.6:68} 63.4 65" stroke="#FF8FA0" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 else if(e==='wow')s+=`<ellipse cx="60" cy="64" rx="2.6" ry="3" fill="#6A2A3A"/>`;
 else if(e==='eat')s+=`<path d="M55 62 Q57.4 64.6 60 62 Q62.6 64.6 65 62" stroke="#3A2420" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
 else s+=`<path d="M60 59.4 V61.4 M55 61.4 Q57.6 64.4 60 61.4 Q62.4 64.4 65 61.4" stroke="#3A2420" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
 s+=cheek(38,58,4,'#FF9FB8',.55)+cheek(82,58,4,'#FF9FB8',.55);
 if(e==='sleep')s+=`<g class="rd4tw" style="animation-duration:2.4s"><path d="M88 26 h6 l-6 6 h6 M96 16 h4 l-4 4 h4" stroke="#9A8AE0" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 return s}
// 坐著的小斑點狗（st 階段、e 表情、o.arms＝rest／hold／wave、o.extra 疊在最上面、o.marks 畫成長記號）
function sdSit(st=2,e='normal',o={}){const g=uid('sd');const hk=HK46[st]||1;const [px,py]=PIV46;
 let s=sdDefs(g)+shd(60,110,30,4.4,.16);
 // 尾巴（輕輕搖）
 s+=`<g class="rd4sw" style="animation-duration:1.8s;transform-origin:82px 98px"><path d="M80 100 Q96 98 98 82 Q99 76 95 76" stroke="${SD.wD}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M80 100 Q96 98 98 82 Q99 76 95 76" stroke="${SD.w}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="96" cy="78" r="3" fill="${SD.sp}"/></g>`;
 // 後腳
 s+=`<ellipse cx="42" cy="104" rx="11" ry="6.6" fill="${SD.wD}"/><ellipse cx="78" cy="104" rx="11" ry="6.6" fill="${SD.wD}"/>${[[38,105],[45,105.6],[75,105.6],[82,105]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2" ry="1.4" fill="#C8BED6"/>`).join('')}`;
 // 身體＋斑點
 s+=`<path d="M36 104 Q28 86 38 72 Q48 63 60 63 Q72 63 82 72 Q92 86 84 104Z" fill="url(#${g}b)"/>`;
 s+=`<ellipse cx="76" cy="88" rx="7" ry="6" fill="${SD.sp}" opacity=".85"/><circle cx="42" cy="90" r="4" fill="${SD.sp}" opacity=".8"/><circle cx="70" cy="76" r="2.6" fill="${SD.sp}" opacity=".7"/>`;
 // 紅色小領巾＋金色小牌子
 if(!o.noscarf)s+=`<path d="M44 68 Q60 76 76 68 L74 73 Q60 84 46 73Z" fill="${SD.sc}"/><path d="M54 74 L60 86 L66 74Z" fill="${mixc(SD.sc,'#000000',.1)}"/><circle cx="60" cy="80" r="3" fill="${C8.gold}"/><path d="${star5(60,80,1.8)}" fill="#FFF2B0"/>`;
 // 前腳
 const arms=o.arms||'rest';
 if(arms==='rest')s+=`<path d="M48 82 Q47 92 50 101 M72 82 Q73 92 70 101" stroke="${SD.wD}" stroke-width="10.4" stroke-linecap="round" fill="none"/><path d="M48 82 Q47 92 50 101 M72 82 Q73 92 70 101" stroke="${SD.w}" stroke-width="8.6" stroke-linecap="round" fill="none"/><ellipse cx="50.4" cy="103" rx="6" ry="3.8" fill="${SD.w}"/><ellipse cx="69.6" cy="103" rx="6" ry="3.8" fill="${SD.w}"/>`;
 if(arms==='hold')s+=`<path d="M46 80 Q44 90 54 88 M74 80 Q76 90 66 88" stroke="${SD.wD}" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M46 80 Q44 90 54 88 M74 80 Q76 90 66 88" stroke="${SD.w}" stroke-width="8.4" stroke-linecap="round" fill="none"/>`;
 if(arms==='wave')s+=`<path d="M48 82 Q47 92 50 101" stroke="${SD.w}" stroke-width="9" stroke-linecap="round" fill="none"/><ellipse cx="50.4" cy="103" rx="6" ry="3.8" fill="${SD.w}"/><g class="rd4sw" style="animation-duration:1.6s;transform-origin:74px 78px"><path d="M74 80 Q86 76 90 64" stroke="${SD.wD}" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M74 80 Q86 76 90 64" stroke="${SD.w}" stroke-width="8.4" stroke-linecap="round" fill="none"/><ellipse cx="90.6" cy="62" rx="5" ry="4.6" fill="${SD.w}"/><circle cx="90" cy="62" r="1.6" fill="#FFB8C8"/></g>`;
 if(o.marks&&st===0)s+=atNeck(0,P19M.bib);
 if(o.marks&&st===2)s+=atNeck(2,P19M.medal);
 s+=`<g class="pbhead sd46head" transform="translate(${px} ${py}) scale(${hk}) translate(${-px} ${-py})">${sdHead(g,e)}</g>`;
 if(o.marks&&st===0)s+=atHead(0,P19M.tuft.replace(/#7A3A1E/g,'#9A643E'));
 if(o.marks&&st===1)s+=atHead(1,P19M.clip);
 if(o.extra)s+=o.extra;
 return s}
// 捲起來睡覺
function sdCurl(){const g=uid('sdc');let s=sdDefs(g)+shd(60,110,40,4.6,.16);
 s+=`<ellipse cx="64" cy="94" rx="34" ry="16" fill="url(#${g}b)"/><ellipse cx="80" cy="90" rx="7" ry="5" fill="${SD.sp}" opacity=".8"/><path d="M40 98 Q60 108 92 98" stroke="${SD.wD}" stroke-width="1.6" fill="none"/>`;
 s+=`<ellipse cx="44" cy="104" rx="8" ry="4.4" fill="${SD.w}"/><ellipse cx="58" cy="105" rx="8" ry="4.4" fill="${SD.w}"/>`;
 s+=`<g transform="translate(-12 24) scale(.92)">${sdHead(g,'sleep')}</g>`;
 s+=`<path d="M94 98 Q108 92 100 80 Q94 76 90 82" stroke="${SD.w}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="91" cy="81" r="3" fill="${SD.sp}"/>`;
 return s}
const PSVG46=(c,a='',vb='0 -6 120 120')=>`<svg viewBox="${vb}" ${a} aria-hidden="true" data-pk="spotdog46">${c}</svg>`;
function sdPose(act,a=''){
 if(act==='sleep')return PSVG46(sdCurl(),a);
 if(act==='eat')return PSVG46(sdSit(2,'eat',{arms:'hold',extra:`<g transform="translate(60 86)"><ellipse cx="0" cy="4" rx="16" ry="5" fill="#C8CCD8"/><path d="M-14 0 Q0 10 14 0 L12 -4 H-12Z" fill="#7EC6F0"/><path d="M-6 -6 Q-2 -12 4 -8 Q8 -12 10 -6" stroke="#E8B884" stroke-width="5" fill="none" stroke-linecap="round"/></g>`}),a);
 if(act==='play')return PSVG46(sdSit(2,'happy',{arms:'wave',extra:`<g transform="translate(26 98)"><circle r="9" fill="${C8.red}"/><path d="M-9 0 Q0 5 9 0 M0 -9 Q-5 0 0 9" stroke="#FFFFFF" stroke-width="2" fill="none"/><circle cx="-3" cy="-4" r="2.4" fill="#FFFFFF" opacity=".6"/></g><g class="rd4tw"><path d="${spark(18,80,4)}" fill="#FFE27A"/></g>`}),a);
 if(act==='bath')return PSVG46(sdSit(2,'happy',{noscarf:1,extra:[[42,30,7],[56,24,9],[72,28,7],[84,40,5],[34,44,5],[94,60,6],[26,70,4]].map(([x,y,r],k)=>`<g class="rd4bob" style="animation-delay:${k*.3}s"><circle cx="${x}" cy="${y}" r="${r}" fill="#E8F8FF" opacity=".85" stroke="#9AD8F2" stroke-width="1"/><circle cx="${x-r*.35}" cy="${y-r*.35}" r="${r*.3}" fill="#FFFFFF"/></g>`).join('')}),a);
 if(act==='brush')return PSVG46(sdSit(2,'happy',{extra:`<g class="rd4tw" style="animation-duration:1.6s">${[[30,40,6],[92,48,5],[86,84,6],[28,86,4],[60,16,5]].map(([x,y,r])=>`<path d="${spark(x,y,r)}" fill="#FFF2A8"/>`).join('')}</g>`}),a);
 return PSVG46(sdSit(2,'happy',{arms:'wave'}),a)}
// 遊戲用：永遠畫「長大」的樣子、不畫成長記號；寶寶／小時候由 pet19 處理（頭在 .pbhead 裡）
function spotdog46(a=''){return PSVG46(sdSit(2,'normal',{}),a)}
function sdPreview(st,a=''){const f=FS46[st]||1;const vb=[0,-6,120,120];const w=vb[2]/f,h=vb[3]/f,x=vb[0]+vb[2]/2-w/2,y=vb[1]+vb[3]-h;
 return PSVG46(sdSit(st,'normal',{marks:1}),a,[x,y,w,h].map(v=>+v.toFixed(2)).join(' '))}
// 朋友版（100×100 全身）：站著、搖尾巴
function sdStand(e='happy'){const g=uid('sds');let s=sdDefs(g)+shd(50,96,22,3.4);
 s+=`<g class="rd4sw" style="animation-duration:1.6s;transform-origin:62px 80px"><path d="M62 80 Q76 78 76 66" stroke="${SD.w}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="76" cy="66" r="2.4" fill="${SD.sp}"/></g>`;
 s+=`<path d="M41 82 V91 Q41 94 45 94 H48 Q50 94 50 91 V82Z M50 82 V91 Q50 94 52 94 H55 Q59 94 59 91 V82Z" fill="${SD.wD}"/><ellipse cx="45" cy="93.6" rx="5.6" ry="2.6" fill="${SD.w}"/><ellipse cx="55" cy="93.6" rx="5.6" ry="2.6" fill="${SD.w}"/>`;
 s+=`<path d="M37 60 Q30 72 35 84 Q50 91 65 84 Q70 72 63 60 Q50 54 37 60Z" fill="url(#${g}b)"/><ellipse cx="58" cy="76" rx="5" ry="4" fill="${SD.sp}" opacity=".8"/>`;
 s+=`<path d="M38 62 Q34 72 38 78 M62 62 Q66 72 62 78" stroke="${SD.w}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
 s+=`<path d="M40 60 Q50 65 60 60 L58 64 Q50 70 42 64Z" fill="${SD.sc}"/><circle cx="50" cy="67" r="2.2" fill="${C8.gold}"/>`;
 s+=`<g transform="translate(50 58) scale(.62) translate(-60 -70)">${sdHead(g,e)}</g>`;
 return s}
G.SPOTDOG46STAND=(e)=>sdStand(e);
G.PET46={spotdog46,anchor:ANC46,anchorAt,p19:{hd:'pb',pv:[60,68]},preview:sdPreview,pose:sdPose,STAGE_HK:HK46,STAGE_FS:FS46};
G.PET46_NAME={spotdog46:'小斑點狗'};
G.SPOTDOG46=(e='normal',a='')=>`<svg viewBox="0 0 100 100" ${a} aria-hidden="true"><g transform="translate(-1 2) scale(.85)">${e==='sleep'?sdCurl():sdSit(2,e==='talk'?'talk':e,{arms:e==='happy'?'wave':'rest'})}</g></svg>`;

/* ===================== 3. 衣服、頭飾（公主、王子都合身；接法照 m7b 的 S41：DRESS／PAT／JK／BOOT、BOY／BJ／BS、wrapPrincess／wrapBoy） =====================
 * 46 小消防員外套 fireman46（公主）／b_fireman46（王子，也登記 fireman46）：紅色外套、亮黃＋銀色反光條、拉鍊、金色星星徽章、黑色雨鞋＋黃色條
 * 49 反光背心 vest49（公主）／b_vest49（王子，也登記 vest49）：天空藍短袖洋裝（王子：T 恤）外面套亮黃綠反光背心＋銀色反光條、白色運動鞋
 * 頭飾 firehat46 小消防員帽子（紅色頭盔＋金色星星）、helmet49 腳踏車安全帽（薄荷綠、通風孔、扣好的扣環） */
const mirror8=s=>`<g transform="translate(120 0) scale(-1 1)">${s}</g>`;
const longSleeve8=(col,edge,cuff,hi)=>{const sl=d=>`<path d="${d}" stroke="${edge}" stroke-width="9.6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="8.2" fill="none" stroke-linecap="round"/>`;
 return sl('M41 85 Q34.4 99 37 107.4')+sl('M79 85 Q85.8 99 84 107.4')
  +`<path d="M37.4 90.4 Q34.6 98 35.6 104 M82.6 90.4 Q85.6 98 84.8 104" stroke="${hi||'#FFFFFF'}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".7"/>`
  +`<path d="M31.6 101.6 Q37 99.6 42.4 101.6 L42 105.6 Q37 104 32 105.6Z M78.6 101.6 Q84 99.6 89.4 101.6 L89 105.6 Q84 104 79 105.6Z" fill="${cuff}"/><path d="M32 103.4 Q37 101.8 42 103.4 M79 103.4 Q84 101.8 89 103.4" stroke="#E8ECF2" stroke-width="1.2" fill="none"/>`};
const shortSleeve8=(col,edge)=>`<path d="M44 80 Q36 84 35 92 L41 94 Q42 88 46 85Z M76 80 Q84 84 85 92 L79 94 Q78 88 74 85Z" fill="${col}" stroke="${edge}" stroke-width=".7"/>`;
const reflect=(y,x1,x2,w=3.2)=>`<path d="M${x1} ${y} H${x2}" stroke="#FFE04A" stroke-width="${w}"/><path d="M${x1} ${y} H${x2}" stroke="#E8ECF2" stroke-width="${(w*.36).toFixed(1)}"/>`;
S46.DRESS={
 fireman46:{shape:'short',c:'#F0604A',l:'#FF9A80',dk:'#C8432F',pat:'s46fire',pc:'#FFE04A',idol:{s46:'fire',sl:'#F0604A',se:'#C8432F',sh:'#3A3A4A'}},
 vest49:{shape:'short',c:'#7EC6F0',l:'#D6EEFC',dk:'#4A9AD0',pat:'s46vest',pc:'#FFFFFF',idol:{s46:'vest',sl:'#7EC6F0',se:'#4A9AD0',sh:'#FFFFFF',she:'#4FC4AE'}}};
S46.DRESS_NAME={fireman46:'小消防員外套',vest49:'反光背心'};
S46.HEAD={firehat46:{c:'#F0604A',name:'小消防員帽子'},helmet49:{c:'#4FC4AE',name:'腳踏車安全帽'}};
S46.PAT={
 s46fire:(x,y,c,i)=>{if(i!==0)return '';return reflect(124,30,90,4)+reflect(116,33,87,2.4)+`<path d="M60 104 V136" stroke="#C8432F" stroke-width="1"/><rect x="66" y="106" width="10" height="8" rx="1.4" fill="#C8432F"/><path d="M66 108 H76" stroke="#FFE04A" stroke-width="1"/>`},
 s46vest:(x,y,c,i)=>{if(i!==0)return '';let o='';for(let k=0;k<10;k++){const xx=34+((k*19)%52),yy=110+((k*11)%20);o+=`<path d="${star5(xx,yy,1.6)}" fill="#FFFFFF" opacity=".85"/>`}return o+`<path d="M30 132 Q60 142 90 132" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".9"/>`}};
S46.JK={
 fire:(g,D,J)=>{let o=longSleeve8(J.sl,J.se,'#FFE04A','#FFFFFF');
  // 前面：拉鍊、兩條反光條、金色星星徽章、小立領
  o+=`<path d="M60 79 V104" stroke="#C8432F" stroke-width="1.4"/>`+reflect(92,46,74,3.4)+reflect(99,46,74,2.4);
  o+=`<path d="M50 78 Q60 82 70 78 L69 75 Q60 79 51 75Z" fill="#C8432F"/><path d="${star5(53.4,86,2.6)}" fill="${C8.gold}"/>`;
  return o},
 vest:(g,D,J)=>{let o=shortSleeve8(J.sl,J.se);
  o+=`<path d="M46.4 78 L53.6 76.6 Q60 86 66.4 76.6 L73.6 78 Q77 90 75.6 104 H44.4 Q43 90 46.4 78Z" fill="#D8F04A"/><path d="M53.6 76.6 Q60 86 66.4 76.6" stroke="#B8D02A" stroke-width="1.2" fill="none"/>`+reflect(93,44.6,75.4,3.2)+reflect(100,44.4,75.6,2.6)+`<path d="M60 86 V104" stroke="#B8D02A" stroke-width=".8"/>`;
  return o}};
S46.BOOT={
 fire:J=>{const fy=166;return [52,66].map(x=>`<path d="M${x-4.6} ${fy-18} H${x+4.6} V${fy-3} H${x+7} Q${x+9.6} ${fy-3} ${x+9.6} ${fy+.6} Q${x+9.6} ${fy+3.2} ${x+7} ${fy+3.2} H${x-4.6} Q${x-5.6} ${fy+3.2} ${x-5.4} ${fy}Z" fill="${J.sh}"/><path d="M${x-4.6} ${fy-12} H${x+4.6}" stroke="#FFE04A" stroke-width="2"/><path d="M${x-3} ${fy-16} V${fy-6}" stroke="#FFFFFF" stroke-width=".9" opacity=".35"/>`).join('')},
 vest:J=>{const fy=166;return [52,66].map(x=>`<path d="M${x-4.6} ${fy-6} H${x+3} Q${x+9.4} ${fy-5} ${x+9.4} ${fy+.6} Q${x+9.4} ${fy+3.2} ${x+6.8} ${fy+3.2} H${x-4.6} Q${x-5.6} ${fy+3.2} ${x-5.4} ${fy}Z" fill="${J.sh}" stroke="#D2D8E4" stroke-width=".7"/><path d="M${x-5.4} ${fy+1.4} H${x+9.4}" stroke="${J.she}" stroke-width="1.6"/><path d="M${x-2} ${fy-4} l3 1.2 M${x-2} ${fy-1.8} l3 1.2" stroke="${J.she}" stroke-width=".8"/>`).join('')}};
S46.BOY={
 b_fireman46:{n:'小消防員外套',k:'jacket',c:'#F0604A',l:'#FF9A80',p:'#3A3A4A',s:'#3A3A4A',s46:{t:'fire'},chapter:46},
 b_vest49:{n:'反光背心',k:'jacket',c:'#7EC6F0',l:'#D6EEFC',p:'#4A5A8A',s:'#FFFFFF',s46:{t:'vest'},chapter:49}};
S46.BOY.fireman46=Object.assign({},S46.BOY.b_fireman46);S46.BOY.vest49=Object.assign({},S46.BOY.b_vest49);
S46.BJ={
 fire:(g,F,J)=>`<path d="M60 78 V118" stroke="#C8432F" stroke-width="1.4"/>`+reflect(98,40.6,79.4,3.6)+reflect(106,40.4,79.6,2.6)+`<path d="M49 77 Q60 82 71 77 L70 74 Q60 78.6 50 74Z" fill="#C8432F"/><path d="${star5(51,88,2.8)}" fill="${C8.gold}"/>`+reflect(116,40.6,79.4,2.4),
 vest:(g,F,J)=>`<path d="M42.6 77 L52 75.6 Q60 86 68 75.6 L77.4 77 Q81 96 79.6 118 H40.4 Q39 96 42.6 77Z" fill="#D8F04A"/><path d="M52 75.6 Q60 86 68 75.6" stroke="#B8D02A" stroke-width="1.2" fill="none"/>`+reflect(98,40.4,79.6,3.4)+reflect(108,40.2,79.8,2.8)+`<path d="M60 86 V118" stroke="#B8D02A" stroke-width=".8"/>`};
S46.BS={
 fire:J=>`<path d="M30.4 110.6 Q35 108.6 39.6 110.6 L39.2 115.4 Q35 113.6 30.8 115.4Z M80.4 110.6 Q85 108.6 89.6 110.6 L89.2 115.4 Q85 113.6 80.8 115.4Z" fill="#FFE04A"/><path d="M30.8 113 Q35 111.4 39.4 113 M80.8 113 Q85 111.4 89.4 113" stroke="#E8ECF2" stroke-width="1" fill="none"/>`,
 vest:J=>''};
// 頭飾（公主 120×172 座標；王子往下 3）
S46.HAT={
 firehat:(c='#F0604A',dy=0)=>{const g=uid('fh');return `<g class="s46hat" transform="translate(0 ${dy})"><defs>${rg(g,[[0,mixc(c,'#FFFFFF',.35)],[.6,c],[1,mixc(c,'#000000',.2)]],.35,.25,.9)}</defs>
  <path d="M24 27 Q60 36 96 27 Q98 31 92 33 Q60 41 28 33 Q22 31 24 27Z" fill="${mixc(c,'#000000',.22)}"/>
  <path d="M32 28 Q30 2 60 0 Q90 2 88 28 Q60 34 32 28Z" fill="url(#${g})"/>
  <path d="M58.6 1 Q60 -1 61.4 1 L62 29.6 H58Z" fill="${mixc(c,'#000000',.18)}"/>
  <path d="M52 8 H68 L70 22 Q60 25 50 22Z" fill="${C8.gold}"/><path d="${star5(60,15,4.4)}" fill="#FFF2B0"/>
  <path d="M37 18 Q40 8 50 4" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".45" stroke-linecap="round"/></g>`},
 bike:(c='#4FC4AE',dy=0)=>{const g=uid('bh');const d=mixc(c,'#000000',.22);return `<g class="s46hat" transform="translate(0 ${dy})"><defs>${rg(g,[[0,mixc(c,'#FFFFFF',.4)],[.6,c],[1,d]],.35,.25,.9)}</defs>
  <path d="M30 30 Q29 58 55 68.6 M90 30 Q91 58 65 68.6" stroke="#3A3A4A" stroke-width="1.4" fill="none"/>
  <path d="M28 30 Q26 2 60 1 Q94 2 92 30 Q78 24 60 24 Q42 24 28 30Z" fill="url(#${g})"/>
  <path d="M28 30 Q42 24 60 24 Q78 24 92 30 L92 33 Q78 27 60 27 Q42 27 28 33Z" fill="${d}"/>
  ${[44,52,60,68,76].map((x,k)=>`<path d="M${x} ${4+Math.abs(k-2)*1.6} Q${x+(x-60)*.08} 12 ${x+(x-60)*.12} 20" stroke="${d}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join('')}
  <path d="M34 20 Q37 9 47 5" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
  <rect x="55" y="66.4" width="10" height="5" rx="1.6" fill="${C8.gold}"/><rect x="58" y="67.6" width="4" height="2.6" rx=".8" fill="#E0A030"/></g>`}};
// 頭飾插進主角的圖裡（一般版放在最外層 </g> 前；關節版 RIG 放進頭那一段）
const insTop8=(s,add)=>{let i=s.lastIndexOf('</g>');const secs=s.match(/data-rs="([a-z]+)"/g);if(secs&&secs[secs.length-1]==='data-rs="head"')i=s.lastIndexOf('</g>',i-1);return i>0?s.slice(0,i)+add+s.slice(i):s};
const HEADS46=['firehat46','helmet49'];
const hatOf=(id,dy)=>id==='firehat46'?S46.HAT.firehat(S46.HEAD.firehat46.c,dy):S46.HAT.bike(S46.HEAD.helmet49.c,dy);
S46.wrapPrincess=fn=>function(look,a,vb){if(!look||!HEADS46.includes(look.head))return fn.apply(this,arguments);
 let s=fn.apply(this,arguments);return insTop8(s,hatOf(look.head,0))};
S46.wrapBoy=fn=>function(look,a,vb){if(!look||!HEADS46.includes(look.head))return fn.apply(this,arguments);
 let s=fn.apply(this,arguments);return insTop8(s,hatOf(look.head,3))};
// 換裝間的小圖示（頭飾格）
S46.ICON={get firehat46(){return `<svg viewBox="20 -4 80 44" aria-hidden="true">${S46.HAT.firehat()}</svg>`},get helmet49(){return `<svg viewBox="20 -2 80 76" aria-hidden="true">${S46.HAT.bike()}</svg>`}};

/* ===================== 4. 房間佈置（100×100 完整 <svg>）：牆上「我家的逃生路線圖」、門邊的小手電筒和哨子 =====================
 * 位置照 E 的房間區域分配表（s7_home/dev/home23.md）：escmap50 右牆上 H2（746,177 寬 52）、kit47 右牆下門邊 H3（751,238 寬 46）
 * 放得很小（約 50px），所以圖形畫得粗、顏色分明 */
const escMapIn=()=>{const g=uid('em');return `<defs>${lg(g,[[0,'#FFFFFF'],[1,'#F2F6FA']])}</defs>
 <rect x="10" y="9" width="82" height="86" rx="5" fill="#000" opacity=".12"/><rect x="8" y="6" width="82" height="86" rx="5" fill="url(#${g})"/>
 <rect x="36" y="2" width="26" height="9" rx="2" fill="#FFE27A" opacity=".9" transform="rotate(-4 49 6)"/>
 <path d="M18 34 L46 14 L74 34Z" fill="#FF8A80"/><rect x="20" y="33" width="52" height="44" rx="2" fill="#FFF6E8"/>
 <rect x="23" y="36" width="22" height="18" fill="#FFD6E8"/><rect x="47" y="36" width="22" height="18" fill="#D6ECFF"/><rect x="23" y="56" width="46" height="18" fill="#E2F6DC"/>
 <path d="M34 45 V65 H58" stroke="#3CC07A" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 3"/><path d="M56 59 L63 65 L56 71" stroke="#3CC07A" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
 <rect x="62" y="60" width="8" height="15" rx="1" fill="#C8925A"/>
 <circle cx="34" cy="45" r="4.4" fill="#FF6F91"/><path d="${star5(34,45,2.8)}" fill="#FFFFFF"/>
 <path d="M70 70 H80" stroke="#3CC07A" stroke-width="4" stroke-linecap="round"/><path d="M80 82 V58" stroke="#8A8EA8" stroke-width="2.4" stroke-linecap="round"/><path d="M81 58 Q87 56 89 60 Q85 63 89 67 Q85 66 81 68Z" fill="#3CC07A"/>
 ${[76,80,84].map(x=>`<circle cx="${x}" cy="88" r="2.4" fill="#FFCB4D"/>`).join('')}
 <path d="M14 84 Q20 80 26 84" stroke="#8FD08A" stroke-width="3" fill="none" stroke-linecap="round"/>`};
const kitIn=()=>`<rect x="20" y="8" width="60" height="16" rx="5" fill="#C8925A"/><rect x="20" y="8" width="60" height="5" rx="2.5" fill="#E8B884"/><circle cx="26" cy="16" r="2" fill="#8A6A4A"/><circle cx="74" cy="16" r="2" fill="#8A6A4A"/>
 <circle cx="36" cy="22" r="3" fill="#A8AEC0"/><circle cx="64" cy="22" r="3" fill="#A8AEC0"/>
 <path d="M36 22 Q32 30 36 36" stroke="#5A5C74" stroke-width="2.4" fill="none"/><g transform="translate(36 36)"><rect x="-8" y="0" width="16" height="40" rx="5" fill="#4FC4AE"/><rect x="-11" y="40" width="22" height="16" rx="5" fill="#FFCB4D"/><ellipse cx="0" cy="54" rx="8" ry="3" fill="#FFF6C8"/><rect x="-3" y="12" width="6" height="9" rx="2" fill="#FFFFFF" opacity=".85"/><rect x="-6" y="3" width="3" height="32" rx="1.5" fill="#FFFFFF" opacity=".35"/></g>
 <path d="M64 22 Q58 40 64 52 Q70 40 64 22" stroke="#FF6F6F" stroke-width="2.6" fill="none"/><g transform="translate(64 54)"><path d="M-8 0 H6 Q14 0 14 8 Q14 16 6 16 Q-1 16 -1 8 H-8Z" fill="#FFCB4D"/><circle cx="6" cy="8" r="3.4" fill="#E0A030"/><rect x="-10" y="-1" width="5" height="7" rx="1.6" fill="#E0A030"/><path d="M0 3 Q4 2 8 3" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".6"/></g>
 <g class="rd4tw" style="animation-duration:2.6s"><path d="${spark(20,74,5)}" fill="#FFF2A8"/></g>`;
S46.ROOM={get escmap50(){return `<svg viewBox="0 0 100 100" aria-hidden="true">${escMapIn()}</svg>`},get kit47(){return `<svg viewBox="0 0 100 100" aria-hidden="true">${kitIn()}</svg>`}};
S46.ROOM_NAME={escmap50:'我家的逃生路線圖',kit47:'小手電筒和哨子'};
S46.ROOMPOS={escmap50:[746,177,52],kit47:[751,238,46]};
// 放進房間背景（800×400 座標）：x、y 左上角，w 寬（也是高）；沒給就讀 E 的 __H23.spot(id)，再沒有就用 ROOMPOS
S46.roomPlace=(id,x,y,w)=>{try{if(x==null){const sp=G.__H23&&typeof G.__H23.spot==='function'?G.__H23.spot(id):null;if(sp&&sp.w){x=sp.x;y=sp.y;w=Math.min(sp.w,sp.h||sp.w)}}}catch(e){}
 if(x==null){const p=S46.ROOMPOS[id]||[0,0,50];x=p[0];y=p[1];w=p[2]}
 const inner=id==='escmap50'?escMapIn():id==='kit47'?kitIn():'';return inner?`<svg class="s46rm" x="${x}" y="${y}" width="${w}" height="${w}" viewBox="0 0 100 100" overflow="visible">${inner}</svg>`:''};
S46.roomThumb=id=>{const s=S46.ROOM[id];return s?s.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '):''};

/* ===================== 5. 安全小隊員徽章、小徽章（圖鑑一排）、章節圓章、大地圖第十段圖示、獎狀 ===================== */
// 五章的小圖示（-10～10 座標）：消防車、警察帽、游泳圈、腳踏車、房子＋放大鏡
S46.BADGE_IC=[
 `<path d="M-10 5 V-3 Q-10 -5 -8 -5 H1 V5Z" fill="#F0604A"/><path d="M1 5 V-7 Q1 -8 2 -8 H6 Q8 -8 9 -6 L10 -2 V5Z" fill="#F0604A"/><path d="M2.6 -6.6 H6 L7.6 -3 H2.6Z" fill="#BFE6FA"/><rect x="-10" y="0" width="20" height="1.8" fill="#FFFFFF"/><rect x="-9" y="-8" width="9" height="1.6" rx=".8" fill="#C8CCD8"/><circle cx="-5" cy="5.6" r="2.6" fill="#3A3A4A"/><circle cx="5.6" cy="5.6" r="2.6" fill="#3A3A4A"/>`,
 `<path d="M-9 2 Q-10 -8 0 -9 Q10 -8 9 2Z" fill="#2E4E9A"/><rect x="-9.6" y="1" width="19.2" height="2.6" rx="1.2" fill="#1E2F60"/><path d="M-7 4 Q0 9 7 4" stroke="#14204A" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="${star5(0,-3.4,3)}" fill="#FFCB4D"/>`,
 `<circle r="8.6" fill="#FF8A80"/><circle r="3.8" fill="#FFFFFF"/>${[0,90,180,270].map(a=>`<path d="M0 -8.6 A8.6 8.6 0 0 1 6 -6 L2.7 -2.7 A3.8 3.8 0 0 0 0 -3.8Z" fill="#FFFFFF" transform="rotate(${a})"/>`).join('')}`,
 `<circle cx="-5.6" cy="3" r="4.6" fill="none" stroke="#3A3A4A" stroke-width="1.6"/><circle cx="5.6" cy="3" r="4.6" fill="none" stroke="#3A3A4A" stroke-width="1.6"/><path d="M-5.6 3 L-1.4 -4 H4 L5.6 3 M-1.4 -4 L0 3" stroke="#4FC4AE" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M-3 -6 H0.4" stroke="#3A3A4A" stroke-width="1.6" stroke-linecap="round"/><path d="M4 -4 L4.6 -7" stroke="#5A5C74" stroke-width="1.4"/>`,
 `<path d="M-9 -1 L-2 -8 L5 -1Z" fill="#FF8A80"/><rect x="-7.6" y="-1.4" width="11.2" height="9" fill="#FFF0D8"/><rect x="-3.4" y="2.4" width="3" height="5.2" fill="#C8925A"/><circle cx="5" cy="1" r="4" fill="#BFE6FA" stroke="#FFCB4D" stroke-width="1.6"/><path d="M7.8 3.8 L10 6" stroke="#C8854A" stroke-width="2.2" stroke-linecap="round"/>`];
S46.BADGE=(a='')=>{const g='b46'+Math.random().toString(36).slice(2,7);
 const ring=S46.BADGE_IC.map((s,k)=>{const t=-Math.PI/2+k*2*Math.PI/5,x=100+Math.cos(t)*60,y=98+Math.sin(t)*60;return `<g transform="translate(${n(x)} ${n(y)})"><circle r="15" fill="#FFFFFF" stroke="${C8.blue}" stroke-width="2"/><g transform="scale(1.05)">${s}</g></g>`}).join('');
 return `<svg ${a} viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="${g}" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#F4F8FF"/><stop offset="1" stop-color="#C8DAF6"/></radialGradient><linearGradient id="${g}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A92E0"/><stop offset="1" stop-color="#2E4E9A"/></linearGradient></defs>
  <path d="M70 152 L56 196 L76 186 L86 200 L96 158Z" fill="${C8.red}"/><path d="M130 152 L144 196 L124 186 L114 200 L104 158Z" fill="${C8.blue}"/>
  <circle cx="100" cy="98" r="84" fill="#FFD24D" stroke="#C8962A" stroke-width="4"/><circle cx="100" cy="98" r="76" fill="url(#${g})"/>
  <path d="M100 62 L128 72 V96 Q128 122 100 136 Q72 122 72 96 V72Z" fill="url(#${g}s)"/><path d="M100 68 L122 76 V96 Q122 116 100 128 Q78 116 78 96 V76Z" fill="#FFFFFF" opacity=".16"/>
  <path d="${star5(100,98,18)}" fill="${C8.gold}" stroke="#E0962A" stroke-width="1.2"/><path d="${star5(100,98,8)}" fill="#FFF6C8"/>
  <path d="M80 74 Q86 68 96 66" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".4" stroke-linecap="round"/>${ring}</svg>`};
S46.MINI_C=['#FFE6E0','#E2E8FA','#DDF4FA','#E2F4DC','#FFF0DE'];
S46.MINI=(k,a='')=>{const c=S46.MINI_C[k]||'#EEF2FA';return `<svg ${a} viewBox="0 0 100 100" aria-hidden="true"><path d="M34 76 L26 98 L38 92 L44 100 L50 80Z" fill="${C8.red}"/><path d="M66 76 L74 98 L62 92 L56 100 L50 80Z" fill="${C8.blue}"/>
  <circle cx="50" cy="46" r="40" fill="#FFD24D" stroke="#C8962A" stroke-width="3"/><circle cx="50" cy="46" r="34" fill="${c}" stroke="#FFF6D0" stroke-width="2.4"/><g transform="translate(50 46) scale(2.6)">${S46.BADGE_IC[k]||''}</g></svg>`};
// 章節圓章（64×64；大地圖、章節選單用；不用 emoji）
const SEALC=[['#FF8A80','#F0604A'],['#8AA8F0','#4A72C8'],['#7ED8EC','#2EA8D8'],['#9ADA8A','#5AAE5A'],['#FFC87A','#E8964A']];
S46.CHIC={};[46,47,48,49,50].forEach((c,k)=>{const [a,b]=SEALC[k];S46.CHIC[c]=`<circle cx="32" cy="33" r="29" fill="${b}"/><circle cx="32" cy="31" r="29" fill="#FFD24D"/><circle cx="32" cy="31" r="25" fill="${a}"/><circle cx="32" cy="31" r="21" fill="#FFFFFF" opacity=".92"/><g transform="translate(32 31) scale(1.75)">${S46.BADGE_IC[k]}</g><path d="M14 20 Q18 12 26 9" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>`});
// 大地圖第十段「星光安全小隊」：藍色盾牌＋金色星星
S46.ARCIC=`<path d="M32 4 L54 12 V30 Q54 50 32 60 Q10 50 10 30 V12Z" fill="#2E4E9A"/><path d="M32 8 L50 15 V30 Q50 46 32 55 Q14 46 14 30 V15Z" fill="#4A72C8"/><path d="${star5(32,31,13)}" fill="#FFCB4D"/><path d="${star5(32,31,6)}" fill="#FFF6C8"/><path d="M18 18 Q22 12 30 11" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/><circle cx="12" cy="52" r="5" fill="#F0604A"/><circle cx="52" cy="52" r="5" fill="#4FC4AE"/>`;
// 獎狀「星光安全小隊員獎狀」（文字由 A 的 __s8data.FIN／S8FIN 提供；沒有時用這裡的暫定文字）
S46.FIN0={cert_title:'星光安全小隊員',cert_to:'最棒的安全小隊員',cert_sign:'黑熊警察　和安全小隊的朋友們',cert_body:['你完成了第八季','「星光安全小隊」五章的訓練，','<br>','會火災逃生、不跟陌生人走，','<br>','玩水守規矩、騎車戴好安全帽，','<br>','還把家裡的危險一個一個找出來，','<br>','是最棒的星光安全小隊員！']};
const fin8=()=>{try{const D=G.__s8data;if(D&&D.FIN&&D.FIN.cert_title)return D.FIN}catch(e){}try{if(G.S8FIN&&G.S8FIN.cert_title)return G.S8FIN}catch(e){}const v=EV('typeof S8FIN!=="undefined"?S8FIN:null');return v&&v.cert_title?v:S46.FIN0};
S46.certHTML=(o)=>{const F=fin8();const nm=(o.name||'').trim();const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const body=Array.isArray(F.cert_body)?F.cert_body:[String(F.cert_body||'')];
 return `<div class="card certcard cert3 cert8" role="dialog" aria-label="${esc(F.cert_title)}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${esc(F.cert_title)}</div><div class="certto">頒給：<b>${nm?esc(nm):esc(F.cert_to||'')}</b></div>
  <div class="certbody">${body.map(s=>s==='<br>'?'<br>':`<span>${esc(s)}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero||''}</span><span class="c3badge">${S46.BADGE()}</span><span class="u">${o.pet||''}</span></div>
  <div class="certfoot"><div><div class="certsig">${esc(F.cert_sign||'')}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${G.SPOTDOG46('happy')}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`};
S46.CERT_CSS=`.cert8 .certin{background:linear-gradient(180deg,#F6FAFF,#E6EEFA)}.cert8 .certrib{background:linear-gradient(90deg,#4A72C8,#F0604A)}.cert8 .certtt{color:#2E4E9A;text-shadow:0 2px 0 #DCE6F8}.cert8 .c3badge svg{height:100%;width:auto}`;

/* ===================== 6. 接進遊戲（A 的 m8sc 在設好 DRESS／BFIT 之後呼叫 S46.hook()，跟 m7c 呼叫 S41.hook() 一樣） ===================== */
G.install46=function(force){try{if(!S46.LIVE&&!force)return;const IA=EV('ICONART');if(!IA)return;
 const put=(k,f)=>{try{Object.defineProperty(IA,k,{configurable:true,enumerable:true,get(){return `<svg viewBox="0 0 64 64" aria-hidden="true">${f()}</svg>`},set(v){}})}catch(e){}};
 Object.keys(OBJ46).forEach(k=>put('i:s46'+k,()=>OBJ46[k]));
 Object.keys(S46.CHIC).forEach(c=>put('i:s46c'+c,()=>S46.CHIC[c]));
 put('i:s46arc',()=>S46.ARCIC)}catch(e){console.log('install46',e)}};
S46.hook=function(force){if(!S46.LIVE&&!force)return false;if(G.__s46hooked)return true;const E=G.__ev;if(typeof E!=='function')return false;G.__s46hooked=1;
 try{const DR=E('DRESS'),BF=E('BFIT');Object.keys(S46.DRESS).forEach(k=>{DR[k]=Object.assign({},S46.DRESS[k])});Object.keys(S46.BOY).forEach(k=>{BF[k]=Object.assign({},S46.BOY[k])})}catch(e){console.log('s46 reg',e)}
 try{const IDOL=E('IDOL');
  G.__s46w={patt:_p=>function(t,x,y,col,i){if(typeof t==='string'&&S46.PAT[t])return S46.PAT[t](x,y,col,i);return _p.apply(this,arguments)}};
  E('patt=window.__s46w.patt(patt)');
  const _jk=IDOL.jacket;IDOL.jacket=function(g,D){const J=D&&D.idol;if(J&&J.s46&&S46.JK[J.s46])return S46.JK[J.s46](g,D,J);return _jk.apply(this,arguments)};
  const _jd=IDOL.jacketDefs;IDOL.jacketDefs=function(g,D){if(D&&D.idol&&D.idol.s46)return '';return _jd.apply(this,arguments)};
  const _bt=IDOL.boots;IDOL.boots=function(D,look){const J=D&&D.idol;if(J&&J.s46){if((look&&look.shoe)||!S46.BOOT[J.s46])return '';return S46.BOOT[J.s46](J)}return _bt.apply(this,arguments)};
  const _bj=IDOL.boyJacket;IDOL.boyJacket=function(g,F){const J=F&&F.s46;return _bj.apply(this,arguments)+(J&&S46.BJ[J.t]?S46.BJ[J.t](g,F,J):'')};
  const _bs=IDOL.boySleeve;IDOL.boySleeve=function(F){const J=F&&F.s46;return (J&&S46.BS[J.t]?S46.BS[J.t](J):'')+_bs.apply(this,arguments)};
  E('princess=window.S46.wrapPrincess(princess);boySVG=window.S46.wrapBoy(boySVG)');
  if(G.RIG&&G.RIG.girl){G.RIG.girl=S46.wrapPrincess(G.RIG.girl);if(G.RIG.boy)G.RIG.boy=S46.wrapBoy(G.RIG.boy)}}catch(e){console.log('s46 hook',e)}
 // 寵物小斑點狗：由 A 的 m8sc 註冊（ICONPET→ICONART，用 PET46.spotdog46 和 PET46.p19）；這裡只補配件錨點
 try{const ACC=E('ACCANCH');if(ACC&&!ACC.spotdog46)ACC.spotdog46=Object.assign({},G.PET46.anchor)}catch(e){}
 try{const st=document.createElement('style');st.textContent=S46.CERT_CSS;document.head.appendChild(st)}catch(e){}
 try{G.install46(true)}catch(e){}
 setTimeout(()=>{try{G.install46(true)}catch(e){console.log('s46 late',e)}},0);
 return true};
S46.BG=()=>G.BG46;
// 題目選項的小圖：第八季題庫裡的 emoji 換成這一季畫的物件（只改傳進來的那一份）
S46.QI={'🚒':'firetruck','🧯':'extinguisher','🚨':'alarm','☎️':'phone','📞':'phone','🪜':'stairs','🛗':'elevator','🔥':'fire','💨':'smoke','🚪':'door','🪟':'window',
 '🚓':'policecar','👮':'policehat','👛':'wallet','💵':'bill100','🍬':'candy','🍭':'candy','🎁':'gift','🔔':'bell','🏪':'shop','🔐':'lockheart',
 '⛑️':'helmet','🪖':'helmet','🦺':'vest','🚲':'bike','🚗':'car','🚙':'car','🪑':'chair','🥤':'drinkpack','🛴':'scooter','🚦':'light','📱':'phonehead','🎧':'phonehead',
 '🛟':'ring','🥽':'goggles','⛈️':'thunder','🌩️':'thunder','🚿':'shower','🕐':'clock','⏰':'clock',
 '🧴':'detergent','💊':'medicine','🍲':'hotpot','🛍️':'plasticbag','🔦':'flashlight','🔍':'magnifier','🔎':'magnifier'};
S46.quizIcons=function(Q){if(!S46.LIVE||G.S8ART===false||!Array.isArray(Q))return Q;
 const fix=o=>{if(Array.isArray(o)&&S46.QI[o[0]])o[0]='i:s46'+S46.QI[o[0]]};
 Q.forEach(q=>{try{fix(q[2]);(q[3]||[]).forEach(fix)}catch(e){}});return Q};

/* ===================== 登記 ===================== */
G.BG46={fire46:(W,H)=>fire(W,H,'garage'),fire46out:(W,H)=>fire(W,H,'out'),fire46truck:(W,H)=>fire(W,H,'truck'),fire46gear:(W,H)=>fire(W,H,'gear'),fire46drill:(W,H)=>fire(W,H,'drill')};
if(typeof police==='function')Object.assign(G.BG46,{police47:(W,H)=>police(W,H,'in'),police47out:(W,H)=>police(W,H,'out'),police47desk:(W,H)=>police(W,H,'desk'),police47road:(W,H)=>police(W,H,'road'),police47door:(W,H)=>police(W,H,'door')});
if(typeof pool==='function')Object.assign(G.BG46,{pool48:(W,H)=>pool(W,H,'main'),pool48out:(W,H)=>pool(W,H,'out'),pool48warm:(W,H)=>pool(W,H,'warm'),pool48shallow:(W,H)=>pool(W,H,'shallow'),pool48rest:(W,H)=>pool(W,H,'rest')});
if(typeof park==='function')Object.assign(G.BG46,{park49:(W,H)=>park(W,H,'main'),park49out:(W,H)=>park(W,H,'out'),park49check:(W,H)=>park(W,H,'check'),park49path:(W,H)=>park(W,H,'path'),park49cross:(W,H)=>park(W,H,'cross')});
if(typeof home==='function')Object.assign(G.BG46,{home50:(W,H)=>home(W,H,'main'),home50out:(W,H)=>home(W,H,'out'),home50a:(W,H)=>home(W,H,'living'),home50b:(W,H)=>home(W,H,'kitchen'),home50c:(W,H)=>home(W,H,'bath'),home50d:(W,H)=>home(W,H,'balcony'),fin50:(W,H)=>finale(W,H)});
G.BG46_CH={46:'fire46',47:'police47',48:'pool48',49:'park49',50:'home50'};
G.BG46_OPEN={46:'fire46out',47:'police47out',48:'pool48out',49:'park49out',50:'home50out'};
G.BG46_STORY={46:['fire46truck','fire46gear','fire46drill'],47:['police47desk','police47road','police47door'],48:['pool48warm','pool48shallow','pool48rest'],49:['park49check','park49path','park49cross'],50:['home50a','home50b','home50c','home50d']};
G.BG46_FIN='fin50';
})(typeof window!=='undefined'?window:globalThis);

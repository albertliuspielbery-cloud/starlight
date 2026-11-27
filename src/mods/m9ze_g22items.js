/* ================= 2.2 遊樂園大禮物：禮物在遊戲裡真的能用（m9ze_g22items.js）—— 2026-11-27 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 共用約定照 mods/m9zb_g22data.js：判斷有沒有用 G22.has(id)；看過新東西就清掉 V2.g22.fresh[id] 再 save2()。
 * 這個檔自己的設定放 V2.g22x（花花相框開關、今天說過的小知識），不動 V2.g22。配合 patches/95_g22items.py（小小廚師出題、塗色本藏卡）。
 * 1. 小小農場：鬱金香種子（第 5 天開粉紅鬱金香）＋第二個花盆（兩盆同時種，澆一次兩盆一起喝）、大象澆水壺（水從鼻子噴出來）、牽牛花種子（紫色小喇叭、爬竹竿；晚上花會合起來）。
 *    沒有任何農場禮物的小朋友照舊用原本的農場畫面（不動舊存檔）；有禮物時用這裡的畫面，原本正在種的那盆（V2.farm.cur）就是左邊那盆，第二盆存在 V2.farm.cur2。
 * 2. 寵物小屋：彩虹隧道（寵物從右邊鑽進去、左邊跑出來，只用移動＋遮住）、潔牙骨頭（咬一咬，牙齒亮一下）。放進「玩具」，拿到才出現。
 * 3. 小小廚師：芒果（水果串，芒果丁）、小黃瓜（三明治，小黃瓜片）。拿到後出題會用到，難度規則照舊；剛拿到時下一題一定會出現它。
 * 4. 房間：星星投影燈（檯燈；關燈後星星灑滿牆和天花板）、長頸鹿身高尺（玩具；主角走過去量身高）、動物腳印地毯（寵物踩著腳印走一圈）、
 *    備用擺飾雲朵抱枕、星星吊飾、愛心小盆栽（玩具格）。都在「佈置房間」裡選，拿到才出現。
 * 5. 塗色本：小書蟲、變色龍小畫家（分好區塊的線稿，放在「動物朋友」），拿到才出現。
 * 6. 地球儀：南極的小企鵝貼紙（轉到南極看得到，會揮手；點牠說話）。
 * 7. 小小攝影師：花花相框（之後拍的照片都有花邊，相簿可以切換有沒有相框）、彩虹相機（相機外觀換成彩虹色）。
 * 動畫只用移動、旋轉、淡入、亮光；角色不放大縮小。新台詞在 lines/v22_giftitems.tsv（沒錄音時只出字幕）。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined'||!window.G22)return;
/* ---------- 共用 ---------- */
const has=id=>{try{return !!G22.has(id)}catch(e){return false}};
const isFresh=id=>{try{return !!G22.st().fresh[id]}catch(e){return false}};
const seen=id=>{try{const g=G22.st();if(g.fresh&&g.fresh[id]){delete g.fresh[id];save2()}}catch(e){}};
const GX=()=>{if(!V2.g22x||typeof V2.g22x!=='object')V2.g22x={};return V2.g22x};
const calm=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const N=v=>(+v).toFixed(1);
let UID=0;const uid=p=>'g22i'+p+(++UID).toString(36);
const sayQ=(parts,o)=>{try{return say(parts,o)}catch(e){return Promise.resolve()}};
const sfx2=k=>{try{sfx(k)}catch(e){}};
const wait2=ms=>new Promise(r=>setTimeout(r,ms));
const lg=(id,stops,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:''}/>`).join('')}</linearGradient>`;
const rgr=(id,stops,cx=.4,cy=.35,r=.75)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:''}/>`).join('')}</radialGradient>`;
const star5p=(cx,cy,R,k=.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+N(cx+r*Math.cos(a))+' '+N(cy+r*Math.sin(a))}return d+'Z'};
const sparkP=(x,y,r)=>`M${N(x)} ${N(y-r)} Q${N(x+r*.18)} ${N(y-r*.18)} ${N(x+r)} ${N(y)} Q${N(x+r*.18)} ${N(y+r*.18)} ${N(x)} ${N(y+r)} Q${N(x-r*.18)} ${N(y+r*.18)} ${N(x-r)} ${N(y)} Q${N(x-r*.18)} ${N(y-r*.18)} ${N(x)} ${N(y-r)}Z`;
const heartP=(x,y,r)=>`M${N(x)} ${N(y+r*.9)} C${N(x-r*1.5)} ${N(y-r*.1)} ${N(x-r*.9)} ${N(y-r*1.2)} ${N(x)} ${N(y-r*.45)} C${N(x+r*.9)} ${N(y-r*1.2)} ${N(x+r*1.5)} ${N(y-r*.1)} ${N(x)} ${N(y+r*.9)}Z`;
const pawP=(x,y,s)=>`<ellipse cx="${N(x)}" cy="${N(y+s*.35)}" rx="${N(s*.62)}" ry="${N(s*.5)}"/>`+[[-.62,-.38],[-.22,-.72],[.22,-.72],[.62,-.38]].map(([a,b])=>`<ellipse cx="${N(x+a*s)}" cy="${N(y+b*s)}" rx="${N(s*.22)}" ry="${N(s*.28)}"/>`).join('');
const bubbleAt=(host,txt,l,t,ms=3200)=>{try{if(!host||!txt)return;host.querySelectorAll('.g22bub').forEach(e=>e.remove());const d=document.createElement('div');d.className='g22bub';d.textContent=txt;
 d.style.left=Math.max(14,Math.min(86,l))+'%';d.style.top=Math.max(2,t)+'%';host.appendChild(d);
 // 放不下就往裡面挪（小手機）
 const W=host.clientWidth,w=d.offsetWidth;if(W&&w){const x=Math.max(w/2+6,Math.min(W-w/2-6,l/100*W));d.style.left=x.toFixed(0)+'px'}setTimeout(()=>d.remove(),ms)}catch(e){}};
// 物品小圖：核心（m9zd）放在 G22.ART 的優先，沒有就用這裡的
const artOf=(id,fb)=>{try{const a=G22.ART&&G22.ART[id];const s=typeof a==='function'?a():a;if(typeof s==='string'&&s.length>20)return /^\s*<svg/.test(s)?s:`<svg viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`}catch(e){}return fb()};

/* ======================================================================
 * 1. 小小農場
 * ====================================================================== */
const FMX={tulip:{n:'鬱金香',last:5},morning:{n:'牽牛花',last:5}};
const FMN={tulip:'鬱金香',morning:'牽牛花'};
// ---- 圖：鬱金香（球根種子；單子葉，兩片寬葉子；第 5 天開粉紅色的花） ----
const tuLeaf=(side,h,w=1,c1='#8ED67A',c2='#5AAE5A')=>{const s=side;const tip=[60+s*(12+9*w),121-h];
 return `<path d="M${60-s*4} 121 Q${N(60+s*(12+26*w))} ${N(121-h*.42)} ${N(tip[0])} ${N(tip[1])} Q${N(60-s*(2-4*w))} ${N(121-h*.5)} ${60+s*5} 121Z" fill="${s<0?c1:c2}"/>`
  +`<path d="M${60+s*.5} 120 Q${N(60+s*(4+10*w))} ${N(121-h*.5)} ${N(tip[0]-s*2)} ${N(tip[1]+4)}" stroke="#C8F0A8" stroke-width="1.1" fill="none" opacity=".75" stroke-linecap="round"/>`};
const tuStem=y1=>`<path d="M60 121 Q58 ${N((121+y1)/2)} 60 ${y1}" stroke="#4E9E4A" stroke-width="5.2" fill="none" stroke-linecap="round"/><path d="M60 121 Q58 ${N((121+y1)/2)} 60 ${y1}" stroke="#7CC86A" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
function tuFlower(cx,cy,r=1,u){u=u||uid('tf');return `<defs>${lg(u+'a',[[0,'#FFD3E6'],[1,'#FF5F9E']])}${lg(u+'b',[[0,'#FFC2DC'],[1,'#F2508E']])}</defs>
 <path d="M${N(cx-10*r)} ${N(cy+6*r)} Q${N(cx-12*r)} ${N(cy-12*r)} ${N(cx)} ${N(cy-17*r)} Q${N(cx+12*r)} ${N(cy-12*r)} ${N(cx+10*r)} ${N(cy+6*r)}Z" fill="#E8458A"/>
 <path d="M${N(cx)} ${N(cy+14*r)} Q${N(cx-17*r)} ${N(cy+12*r)} ${N(cx-16*r)} ${N(cy-6*r)} Q${N(cx-15*r)} ${N(cy-15*r)} ${N(cx-9*r)} ${N(cy-17*r)} Q${N(cx-3*r)} ${N(cy-2*r)} ${N(cx)} ${N(cy+14*r)}Z" fill="url(#${u}b)"/>
 <path d="M${N(cx)} ${N(cy+14*r)} Q${N(cx+17*r)} ${N(cy+12*r)} ${N(cx+16*r)} ${N(cy-6*r)} Q${N(cx+15*r)} ${N(cy-15*r)} ${N(cx+9*r)} ${N(cy-17*r)} Q${N(cx+3*r)} ${N(cy-2*r)} ${N(cx)} ${N(cy+14*r)}Z" fill="url(#${u}b)"/>
 <path d="M${N(cx)} ${N(cy+15*r)} Q${N(cx-11*r)} ${N(cy+8*r)} ${N(cx-9*r)} ${N(cy-9*r)} Q${N(cx-4*r)} ${N(cy-15*r)} ${N(cx)} ${N(cy-19*r)} Q${N(cx+4*r)} ${N(cy-15*r)} ${N(cx+9*r)} ${N(cy-9*r)} Q${N(cx+11*r)} ${N(cy+8*r)} ${N(cx)} ${N(cy+15*r)}Z" fill="url(#${u}a)"/>
 <path d="M${N(cx-5*r)} ${N(cy-8*r)} Q${N(cx-6*r)} ${N(cy+2*r)} ${N(cx-3*r)} ${N(cy+8*r)}" stroke="#FFFFFF" stroke-width="${N(2*r)}" fill="none" stroke-linecap="round" opacity=".55"/>`}
function tulipPlant(st){
 if(st<=0)return `<ellipse cx="60" cy="117.4" rx="11" ry="2.8" fill="#5A3A20"/><path d="M60 104 Q67 110 67 115.4 Q67 120 60 120 Q53 120 53 115.4 Q53 110 60 104Z" fill="#D8A878"/><path d="M60 104 Q63 110 62.4 119.6 M60 104 Q57 110 57.6 119.6" stroke="#B8865A" stroke-width=".9" fill="none"/><path d="M60 104 Q59 101 60.6 99" stroke="#B8865A" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="56.6" cy="112" rx="1.4" ry="3" fill="#FFF0DC" opacity=".6"/>`;
 if(st===1)return `<path d="M56.6 121 Q57 108 61 98 Q63.4 110 63.6 121Z" fill="#7CC86A"/><path d="M59.4 119 Q59.8 110 61 102" stroke="#C8F0A8" stroke-width="1" fill="none" opacity=".8"/><path d="M63 121 Q64 114 67.6 110 Q67 116 66.4 121Z" fill="#5AAE5A"/>`;
 if(st===2)return tuLeaf(-1,34,.7)+tuLeaf(1,30,.6);
 if(st===3)return tuLeaf(-1,48,.9)+tuLeaf(1,44,.8)+tuStem(78)+`<path d="M59 80 Q55 72 57 66 Q61 72 61 80Z" fill="#9BE07A"/>`;
 let d=tuLeaf(-1,54,1)+tuLeaf(1,50,.95);
 if(st===4)return d+tuStem(60)+`<path d="M60 64 Q51 56 53 44 Q57 36 60 32 Q63 36 67 44 Q69 56 60 64Z" fill="#9BE07A"/><path d="M60 50 Q55 42 58 35 Q60 33 60 33 Q60 33 62 35 Q65 42 60 50Z" fill="#FF9AC6" opacity=".9"/><path d="M56 56 Q55 48 58 42" stroke="#C8F0A8" stroke-width="1.2" fill="none" opacity=".8"/>`;
 return d+tuStem(56)+tuFlower(60,46,1.05)}
// ---- 圖：牽牛花（爬竹竿的藤蔓、心形葉子、紫色小喇叭；晚上花合起來） ----
const mgLeaf=(x,y,s,a)=>`<g transform="translate(${N(x)} ${N(y)}) rotate(${a})"><path d="M0 0 C${N(-3*s)} ${N(2.5*s)} ${N(-9*s)} ${N(2*s)} ${N(-8.5*s)} ${N(-4*s)} C${N(-8*s)} ${N(-9*s)} ${N(-3*s)} ${N(-12*s)} 0 ${N(-16*s)} C${N(3*s)} ${N(-12*s)} ${N(8*s)} ${N(-9*s)} ${N(8.5*s)} ${N(-4*s)} C${N(9*s)} ${N(2*s)} ${N(3*s)} ${N(2.5*s)} 0 0Z" fill="#6CC562"/><path d="M0 -1 V${N(-13*s)}" stroke="#B8EE9A" stroke-width=".9" opacity=".8"/></g>`;
const mgStake=(top=30)=>`<path d="M74 121 V${top}" stroke="#C8A06A" stroke-width="3.4" stroke-linecap="round"/><path d="M74 121 V${top}" stroke="#E8C890" stroke-width="1.4" stroke-linecap="round"/>${[top+18,top+46,top+74].filter(y=>y<116).map(y=>`<path d="M72.4 ${y} H75.6" stroke="#A8804A" stroke-width="1.4"/>`).join('')}`;
// 藤蔓：從土裡出來，繞著竹竿往上爬
const mgVine=top=>{let d='M60 121 Q60 112 66 108';let y=108,s=1;while(y>top+8){const y2=y-14;d+=` Q${s>0?84:64} ${N(y-7)} ${s>0?76:70} ${N(y2)}`;y=y2;s=-s}
 return `<path d="${d}" stroke="#4E9E4A" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#7CC86A" stroke-width="2" fill="none" stroke-linecap="round"/>`};
function mgFlower(x,y,r,night,u){u=u||uid('mg');
 if(night)return `<g transform="translate(${N(x)} ${N(y)})"><path d="M0 ${N(8*r)} Q${N(-4*r)} ${N(-2*r)} ${N(-1*r)} ${N(-10*r)} Q${N(1*r)} ${N(-12*r)} ${N(2*r)} ${N(-9*r)} Q${N(4*r)} ${N(-1*r)} 0 ${N(8*r)}Z" fill="#9A7AE8"/><path d="M${N(-1*r)} ${N(-8*r)} Q${N(1*r)} ${N(-2*r)} ${N(-1*r)} ${N(5*r)}" stroke="#D8C8FF" stroke-width="${N(1.2*r)}" fill="none"/><path d="M${N(-3*r)} ${N(8*r)} Q0 ${N(5*r)} ${N(3*r)} ${N(8*r)} L0 ${N(11*r)}Z" fill="#6CC562"/></g>`;
 return `<g transform="translate(${N(x)} ${N(y)})"><defs>${rgr(u,[[0,'#FFFFFF'],[.28,'#F4E8FF'],[.42,'#B48CFF'],[1,'#7A4AE0']],.5,.5,.62)}</defs>
  <path d="M${N(-2.4*r)} ${N(6*r)} L${N(-1.6*r)} ${N(13*r)} H${N(1.6*r)} L${N(2.4*r)} ${N(6*r)}Z" fill="#C8B0FF"/><path d="M${N(-2*r)} ${N(12*r)} Q0 ${N(9*r)} ${N(2*r)} ${N(12*r)} L0 ${N(15*r)}Z" fill="#6CC562"/>
  <circle r="${N(9.6*r)}" fill="url(#${u})"/>${[0,72,144,216,288].map(a=>`<path d="M0 0 L0 ${N(-9.4*r)}" stroke="#FFFFFF" stroke-width="${N(1.1*r)}" opacity=".55" transform="rotate(${a})"/>`).join('')}
  <circle r="${N(2*r)}" fill="#FFF6C8"/><ellipse cx="${N(-4.4*r)}" cy="${N(-4.6*r)}" rx="${N(2.2*r)}" ry="${N(1.2*r)}" fill="#fff" opacity=".5" transform="rotate(-40 ${N(-4.4*r)} ${N(-4.6*r)})"/></g>`}
const mgBud=(x,y,a)=>`<g transform="translate(${N(x)} ${N(y)}) rotate(${a})"><path d="M0 6 Q-3.4 -1 -.6 -9 Q.6 -11 1.6 -8.6 Q3.4 -1 0 6Z" fill="#A88AF0"/><path d="M-.4 -8 Q1 -2 -.6 4" stroke="#E2D6FF" stroke-width="1" fill="none"/><path d="M-2.6 6 Q0 3.6 2.6 6 L0 8.6Z" fill="#6CC562"/></g>`;
function morningPlant(st,night){
 if(st<=0)return `<ellipse cx="60" cy="117.4" rx="9" ry="2.6" fill="#5A3A20"/><path d="M56 116.4 Q60 112 64.4 115.6 Q61 119 56 116.4Z" fill="#3A2A1A"/><path d="M57.6 115.6 Q60 114 62.4 115.2" stroke="#7A5A3A" stroke-width=".7" fill="none"/>`;
 if(st===1)return `<path d="M60 121 Q58 114 60 107" stroke="#4E9E4A" stroke-width="4.2" fill="none" stroke-linecap="round"/><path d="M60 121 Q58 114 60 107" stroke="#7CC86A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  +[-1,1].map(s=>`<path d="M60 107 Q${60+s*6} 99 ${60+s*12} 101 Q${60+s*15} 104 ${60+s*12} 107 Q${60+s*14} 111 ${60+s*9} 111 Q${60+s*4} 110 60 107Z" fill="#9BE07A"/>`).join('');
 if(st===2)return mgStake(70)+mgVine(92)+mgLeaf(66,108,.85,-60)+mgLeaf(76,96,.8,40);
 if(st===3)return mgStake(44)+mgVine(64)+mgLeaf(66,108,.9,-60)+mgLeaf(80,96,.85,50)+mgLeaf(68,82,.85,-55)+mgLeaf(80,70,.8,45);
 const top=st===4?38:32;let d=mgStake(26)+mgVine(top)+mgLeaf(66,108,.95,-60)+mgLeaf(81,96,.9,52)+mgLeaf(67,82,.9,-58)+mgLeaf(81,68,.85,48)+mgLeaf(68,54,.8,-52)+mgLeaf(80,42,.72,40);
 if(st===4)return d+mgBud(86,60,40)+mgBud(62,46,-35)+mgBud(84,34,30);
 return d+mgFlower(90,58,1.05,night)+mgFlower(56,44,1,night)+mgFlower(86,28,.95,night)+mgBud(64,70,-40)}
// 名牌／種子鈕上的小圖（viewBox -24 -24 48 48）
const fmMiniX={tulip:()=>`<path d="M0 22 V2" stroke="#5AAE5A" stroke-width="3" stroke-linecap="round"/><path d="M0 20 Q-12 14 -11 2 Q-4 10 0 20Z" fill="#7CC86A"/>${tuFlower(0,-3,.78)}`,
 morning:()=>`<path d="M-14 20 Q-6 8 6 10 Q14 12 14 0" stroke="#5AAE5A" stroke-width="2.6" fill="none" stroke-linecap="round"/>${mgLeaf(-10,18,.7,-40)}${mgFlower(2,-2,1.2,false)}`};
const fmMini2=k=>fmMiniX[k]?fmMiniX[k]():fmMini(k);
const fmTag2=s=>`<path d="M96 121 V98" stroke="#C8A06A" stroke-width="2.4" stroke-linecap="round"/><circle cx="96" cy="92" r="10" fill="#FFF8E8" stroke="#C8A06A" stroke-width="1.6"/><g transform="translate(96 92) scale(.5)">${fmMini2(s)}</g>`;
const fmSVG2=(s,st,wet,tag=1)=>`<svg viewBox="0 0 120 170" aria-hidden="true">${FM_DEFS}${tag?fmTag2(s):''}${fmPlant(s,st)}${fmPot(wet)}</svg>`;
const FM_LINE2=(s,st)=>{if(s==='tulip'&&st>=5)return '粉紅色的鬱金香開花了！';if(s==='morning'){if(st===3)return '藤蔓爬上竹竿了！';if(st>=5)return '牽牛花開花了！像紫色的小喇叭！'}
 if((s==='tulip'||s==='morning')&&st>=5)return '開出小花了！';return FM_LINE(s==='tulip'||s==='morning'?'sun':s,Math.min(st,4))};
// fmPlant：房間窗台、原本的畫面也用得到
{const _fp=fmPlant;fmPlant=function(s,st){try{if(s==='tulip')return tulipPlant(st);if(s==='morning')return morningPlant(st,fmNight())}catch(e){console.log('g22 fmPlant',e)}return _fp.apply(this,arguments)}}
// 新種子登記到 FM_SEEDS（只在拿到以後；窗台上有、正在種的也要登記，畫得出來）
function fmSync(){try{const F=V2.farm||{};const used=[...(F.sill||[]),F.cur&&F.cur.s,F.cur2&&F.cur2.s];
 Object.keys(FMX).forEach(k=>{if((has(k)||used.includes(k))&&!FM_SEEDS[k])FM_SEEDS[k]=FMX[k]})}catch(e){}}
fmSync();
// ---- 大象澆水壺（面朝左，鼻子是壺嘴；viewBox 0 0 100 80） ----
function eleCan(){const u=uid('ec');return `<svg viewBox="0 0 100 80" aria-hidden="true"><defs>${lg(u+'b',[[0,'#D8E0FF'],[1,'#8E9CEA']],1,1)}${lg(u+'e',[[0,'#FFD6E6'],[1,'#FF9FC4']])}</defs>
 <path d="M58 30 Q60 10 76 10 Q92 10 92 28" stroke="#8E9CEA" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M58 30 Q60 10 76 10 Q92 10 92 28" stroke="#D8E0FF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>
 <path d="M40 40 Q40 27 56 27 H80 Q95 27 95 42 L93 64 Q92 74 82 74 H52 Q42 74 41 64Z" fill="url(#${u}b)"/>
 <rect x="48" y="70" width="10" height="7" rx="3" fill="#A8B4F2"/><rect x="77" y="70" width="10" height="7" rx="3" fill="#A8B4F2"/>
 <path d="M44 44 Q30 45 26 36 Q22 27 18 22 Q14 17 9 19" stroke="url(#${u}b)" stroke-width="10" fill="none" stroke-linecap="round"/>
 <path d="M44 44 Q30 45 26 36 Q22 27 18 22 Q14 17 9 19" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity=".35" transform="translate(1 -2)"/>
 <ellipse cx="8" cy="19.4" rx="5.6" ry="4.4" fill="#A8B4F2" transform="rotate(-30 8 19.4)"/>${[[6,17],[9,16],[7.4,20.6],[10.4,19.8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9" fill="#6A78C8"/>`).join('')}
 <path d="M62 35 Q76 33 77 48 Q77 61 62 59 Q52 57 52 47 Q53 36 62 35Z" fill="url(#${u}e)"/><path d="M63 39 Q72 39 72 48 Q71 55 63 54 Q57 53 57 47 Q57 40 63 39Z" fill="#FFE8F0" opacity=".7"/>
 <circle cx="47" cy="38" r="2.4" fill="#2A2266"/><circle cx="47.8" cy="37.2" r=".9" fill="#fff"/><ellipse cx="44" cy="46" rx="3" ry="1.8" fill="#FF9FB0" opacity=".6"/>
 ${[0,72,144,216,288].map(a=>`<ellipse cx="86" cy="58" rx="2" ry="3.2" fill="#FFFFFF" transform="rotate(${a} 86 61.4)"/>`).join('')}<circle cx="86" cy="61.4" r="2.2" fill="#FFD24D"/>
 <path d="M50 33 Q56 30 64 30" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/></svg>`}
// ---- 畫面 ----
const fmUse=()=>{fmSync();return has('tulip')||has('morning')||has('elecan')||!!(V2.farm&&V2.farm.cur2)||!!(V2.farm&&V2.farm.cur&&FMX[V2.farm.cur.s])};
let fmTok2=0;
const _farm0=SCREENS.farm;
SCREENS.farm=function(){if(!fmUse())return _farm0.apply(this,arguments);try{return farm22()}catch(e){console.log('g22 farm',e);return _farm0.apply(this,arguments)}};
function farm22(){fmTok++;const tok=++fmTok2;const live=()=>tok===fmTok2&&S.screen==='farm';const F=fmData();
 const two=has('tulip')||!!F.cur2;const ele=has('elecan');const night=fmNight();const bgk=CHBG.garden?'garden':'farm';
 const CAN=()=>ele?eleCan():FM_CAN;
 const PK=two?['cur','cur2']:['cur'];
 screen.innerHTML=`<div class="dball farm g22farm${two?' g22f2':''}${ele?' g22ele':''}${night?' night':''}"><div class="phead"><button class="btn2 small" id="fmback">離開農場</button><h2 class="gtitle">小小農場</h2><span class="phsp"></span></div>
  <div class="fmscene"><svg class="bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice">${(()=>{window.__mkVeil=1;try{return sbg(bgk)}finally{window.__mkVeil=0}})()}</svg>
   <div class="fmsky">${night?`<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="30" fill="#FFF3C4" opacity=".25"/><mask id="g22mn"><circle cx="40" cy="40" r="20" fill="#fff"/><circle cx="50" cy="32" r="17" fill="#000"/></mask><circle cx="40" cy="40" r="20" fill="#FFF3C4" mask="url(#g22mn)"/><path d="M66 14 l1.4 3.2 l3.2 1.4 l-3.2 1.4 l-1.4 3.2 l-1.4 -3.2 l-3.2 -1.4 l3.2 -1.4Z M12 60 l1 2.2 l2.2 1 l-2.2 1 l-1 2.2 l-1 -2.2 l-2.2 -1 l2.2 -1Z" fill="#FFF6D0"/></svg>`
    :`<svg viewBox="0 0 80 80" aria-hidden="true"><g class="fmrays">${Array.from({length:10},(_,k)=>`<path d="M40 6 V15" stroke="#FFC93C" stroke-width="4" stroke-linecap="round" transform="rotate(${k*36} 40 40)"/>`).join('')}</g><circle cx="40" cy="40" r="19" fill="#FFD84A" stroke="#F0A020" stroke-width="2"/><circle cx="34" cy="37" r="2" fill="#7A4A1A"/><circle cx="46" cy="37" r="2" fill="#7A4A1A"/><path d="M34 45 Q40 50 46 45" stroke="#7A4A1A" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`}</div>
   <button class="fmhelp" id="fmhelp" aria-label="兔兔園丁">${animal('bunny')}</button><div class="fmbub" id="fmbub"></div><div class="fmme">${princess(S.look)}</div>
   ${PK.map((k,i)=>`<button class="fmpot g22pot" id="${i?'fmpot2':'fmpot'}" data-p="${i}" aria-label="${i?'第二盆':'小植物'}"></button>`).join('')}
   <div class="fmcan" id="fmcan">${CAN()}</div><div class="fmfx" id="fmfx"></div>
   ${night?'<div class="fmzz" id="fmzz"><b>Z</b><b>z</b><b>z</b></div>':''}</div>
  <div class="fmsteps" id="fmsteps"></div>
  <div class="dq" id="fmq"></div></div>`;
 $('#fmback').onclick=()=>{fmTok++;fmTok2++;hush();go('park')};
 const root=$('.g22farm'),scene=$('.fmscene',root),fq=$('#fmq'),can=$('#fmcan'),fx=$('#fmfx'),bub=$('#fmbub'),steps=$('#fmsteps');
 const pots=PK.map((k,i)=>$(i?'#fmpot2':'#fmpot'));
 const watered=()=>F.wd===today();
 const cur=i=>F[PK[i]]||null;
 const planted=()=>PK.map((k,i)=>i).filter(i=>cur(i));
 const empty=()=>PK.map((k,i)=>i).filter(i=>!cur(i));
 const SN=k=>(FM_SEEDS[k]||FMX[k]||{}).n||'';
 const drawPot=(i,wet,grow)=>{const c=cur(i),p=pots[i];p.innerHTML=c?fmSVG2(c.s,c.st,wet):`<svg viewBox="0 0 120 170" aria-hidden="true">${FM_DEFS}${fmPot(0)}</svg>`;
  p.classList.toggle('empty',!c);if(grow&&c){p.classList.remove('grow');void p.offsetWidth;p.classList.add('grow')}};
 const draw=(wet,grow)=>{PK.forEach((k,i)=>drawPot(i,wet&&!!cur(i),grow));
  const e=empty();pots.forEach((p,i)=>p.classList.toggle('g22next',two&&e.length>0&&i===e[0]));
  steps.innerHTML=PK.map((k,i)=>{const c=cur(i);if(!c)return two?'<span class="g22st off"></span>':'';const n=(FM_SEEDS[c.s]||FMX[c.s]||{last:5}).last;
   return `<span class="g22st">${Array.from({length:n+1},(_,j)=>`<i class="${j<c.st?'on':j===c.st?'now':''}"></i>`).join('')}</span>`}).join('');
  can.classList.toggle('hide',!planted().length)};
 const bubble=t=>{bub.textContent=t;bub.classList.remove('on');void bub.offsetWidth;bub.classList.add('on')};
 const lineOf=i=>{const c=cur(i);return c?FM_LINE2(c.s,c.st):'選一顆種子，種下去吧！'};
 // 兩盆時每一盆先念名字（向日葵、長出葉子了！）
 const plantSay=i=>{const c=cur(i);return two?[SN(c.s),lineOf(i)]:[lineOf(i)]};
 const status=()=>{const P=planted();if(!P.length)return ['選一顆種子，種下去吧！'];const L=P.flatMap(plantSay);
  L.push(watered()?'今天喝飽了，明天再來喔！':P.length>1?'點澆水壺，兩盆一起澆水吧！':'點澆水壺，幫它澆水吧！');if(empty().length)L.push('空花盆，選一顆種子種下去吧！');return L};
 const seedKeys=()=>Object.keys(FM_SEEDS).filter(k=>!FMX[k]||has(k));
 const ctl=()=>{const P=planted(),E=empty();let h='';
  if(E.length)h+=`<div class="fmseeds${seedKeys().length>3?' g22many':''}">${seedKeys().map((k,j)=>`<button class="fmseed${isFresh(k)?' g22new':''}" data-k="${k}" style="--dl:${j*.08}s" aria-label="${SN(k)}"><svg viewBox="-24 -24 48 48" aria-hidden="true">${fmMini2(k)}</svg><b>${SN(k)}</b>${isFresh(k)?'<i class="g22nw">新</i>':''}</button>`).join('')}</div>`;
  if(P.length)h+=`<div class="fmbtns"><button class="fmwater${watered()?' done':''}" id="fmwater" aria-label="澆水">${CAN()}<b>澆水</b></button><button class="speak fmspeak" aria-label="再聽一次">${ICON.speaker('#2A2266')}</button></div>`;
  fq.innerHTML=h;fq.classList.toggle('g22both',!!(E.length&&P.length));
  $$('.fmseed',fq).forEach(b=>b.onclick=()=>{if(!live()||busy)return;const E2=empty();if(!E2.length)return;const i=E2[0],k=b.dataset.k;sfx('pop');b.classList.add('sel');
   F[PK[i]]={s:k,st:0};if(FMX[k])seen(k);save2();draw(0,1);try{burstEl(pots[i],14)}catch(e){}sfx('right');
   const m=watered()?'種好了！明天再來幫它澆水喔！':'種好了！點澆水壺，幫它澆水吧！';bubble(m);sayQ([m]);setTimeout(()=>{if(live())ctl()},260)});
  const fs=$('.fmspeak',fq);if(fs)fs.onclick=()=>sayQ(status());
  const fw=$('#fmwater',fq);if(fw)fw.onclick=water};
 // ---- 澆水：壺移到花盆上面、斜下去，水滴到土裡（大象：水從鼻子噴出來） ----
 const SP=ele?{x:.08,y:.26,rot:-34,side:1}:{x:.93,y:.275,rot:36,side:-1};
 const box=el=>{const R=scene.getBoundingClientRect(),b=el.getBoundingClientRect();return {x:b.left-R.left,y:b.top-R.top,w:b.width,h:b.height}};
 const anim=(el,kf,o)=>{try{return el.animate(kf,Object.assign({fill:'forwards',easing:'ease-in-out'},o))}catch(e){return null}};
 async function pourAt(i){const p=pots[i];const pb=box(p),cb=box(can);if(!pb.w||!cb.w)return;
  const soil={x:pb.x+pb.w*.5,y:pb.y+pb.h*(117.6/170)};
  const ox=cb.w*.5,oy=cb.h*.6,vx=SP.x*cb.w-ox,vy=SP.y*cb.h-oy,a=SP.rot*Math.PI/180;const rx=vx*Math.cos(a)-vy*Math.sin(a),ry=vx*Math.sin(a)+vy*Math.cos(a);
  const tip={x:soil.x+SP.side*pb.w*.16,y:soil.y-pb.h*.42};
  const dx=tip.x-(cb.x+ox+rx),dy=tip.y-(cb.y+oy+ry);
  const cur0=can.__g22t||'translate(0px,0px) rotate(0deg)';const to=`translate(${dx.toFixed(0)}px,${dy.toFixed(0)}px) rotate(${SP.rot}deg)`;
  const c=calm();const A=anim(can,[{transform:cur0},{transform:to}],{duration:c?1:520});can.__g22t=to;if(A)await A.finished.catch(()=>{});if(!live())return;
  sfx('splash');const n=c?3:8;
  for(let k=0;k<n;k++){const d=document.createElement('b');d.className='g22drop';fx.appendChild(d);
   const jx=(k%4-1.5)*pb.w*.05,ex=soil.x+jx,ey=soil.y-2;
   const kf=ele?[{transform:`translate(${tip.x}px,${tip.y}px)`,opacity:1},{transform:`translate(${N((tip.x+ex)/2-SP.side*pb.w*.12)}px,${N(tip.y-pb.h*.08)}px)`,opacity:1,offset:.4},{transform:`translate(${N(ex)}px,${N(ey)}px)`,opacity:.25}]
    :[{transform:`translate(${tip.x}px,${tip.y}px)`,opacity:1},{transform:`translate(${N(ex)}px,${N(ey)}px)`,opacity:.25}];
   const dA=anim(d,kf,{duration:c?300:600,delay:k*(c?60:85),easing:ele?'linear':'ease-in',fill:'both'});if(dA)dA.finished.then(()=>d.remove()).catch(()=>d.remove());else setTimeout(()=>d.remove(),900)}
  await wait2(c?400:n*85+320)}
 async function canHome(){const cur0=can.__g22t;if(!cur0)return;can.__g22t='';const A=anim(can,[{transform:cur0},{transform:'translate(0px,0px) rotate(0deg)'}],{duration:calm()?1:500});if(A){await A.finished.catch(()=>{});try{A.cancel()}catch(e){}}}
 let busy=0;
 async function water(){if(busy||!live())return;const P=planted();if(!P.length)return;const b=$('#fmwater');
  if(watered()){if(b){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}can.classList.remove('nod');void can.offsetWidth;can.classList.add('nod');bubble('今天喝飽了，明天再來喔！');sayQ(['今天喝飽了，明天再來喔！']);return}
  busy=1;sfx('pop');F.wd=today();const done=[];
  P.forEach(i=>{const c=cur(i);const last=(FM_SEEDS[c.s]||FMX[c.s]||{last:5}).last;c.st=Math.min(c.st+1,last);if(c.st>=last){done.push(i);F.sill.push(c.s)}});
  if(F.sill.length>12)F.sill=F.sill.slice(-12);
  save2();if(b)b.classList.add('done');
  if(ele)sayQ(['大象噴噴水，咕嚕咕嚕！']);
  can.classList.add('g22pour');for(const i of P){await pourAt(i);if(!live())return}
  await wait2(calm()?0:300);if(!live())return;
  await canHome();can.classList.remove('g22pour');if(!live())return;fx.innerHTML='';draw(1,0);await wait2(350);if(!live())return;
  P.forEach(i=>{drawPot(i,1,1);try{burstEl(pots[i],18)}catch(e){}});sfx('right');
  const n=done.length?3:1;S.wallet+=n;save();renderBar();setTimeout(()=>sfx('gem'),400);
  const gulp=ele?'大象噴噴水，咕嚕咕嚕！':'咕嚕咕嚕，喝飽了！';
  if(!done.length){bubble(P.flatMap(plantSay).join(''));await Promise.race([sayQ([...(ele?[]:[gulp]),...P.flatMap(plantSay),'送你一顆寶石！',P.length>1?'明天再來看看它們喔！':'明天再來看看它喔！']),wait2(11000)]);busy=0;return}
  await wait2(600);if(!live())return;try{confetti()}catch(e){}
  const D=done.map(i=>Object.assign({},cur(i)));
  const mg=D.some(c=>c.s==='morning'),tu=D.some(c=>c.s==='tulip');
  const ov=overlay(screen,`<div class="card fmdone${D.length>1?' g22two':''}"><div class="fmbig">${D.map(c=>fmSVG2(c.s,c.st,0,0)).join('')}</div><h2>${D.map(c=>FM_LINE2(c.s,c.st)).join('<br>')}</h2><p>${D.map(c=>SN(c.s)).join('和')}要搬到房間的窗台上囉！<br>得到 3 顆寶石！</p><div class="row"><button class="btn" id="fmnew">再種一盆</button><button class="btn2" id="fmroom">去房間看看</button></div></div>`);
  sayQ([...D.map(c=>FM_LINE2(c.s,c.st)),D.length>1?'它們要搬到房間的窗台上囉！':'它要搬到房間的窗台上囉！','送你三顆寶石！',...(mg?[{pause:300},'兔兔的小知識：','牽牛花早上開花，太陽大了以後，就慢慢合起來。']:tu?[{pause:300},'荷蘭有好多風車，還有漂亮的鬱金香。']:[])]);
  done.forEach(i=>{F[PK[i]]=null});save2();
  $('#fmnew',ov).onclick=()=>{ov.remove();busy=0;draw(0,0);ctl();sayQ(['選一顆種子，種下去吧！'])};
  $('#fmroom',ov).onclick=()=>{ov.remove();fmTok++;fmTok2++;hush();go('room')}}
 pots.forEach((p,i)=>p.onclick=()=>{if(!live())return;const c=cur(i);sfx('pop');p.classList.remove('wig');void p.offsetWidth;p.classList.add('wig');
  const t=c?[SN(c.s),FM_LINE2(c.s,c.st)]:['選一顆種子，種下去吧！'];if(night&&c)t.push('晚上了，植物也在休息喔。');
  if(night&&c&&c.s==='morning'&&c.st>=5)t.push('牽牛花晚上把花合起來睡覺了。');
  bubble(t.join(''));sayQ(t.flatMap((x,j)=>j?[{pause:200},x]:[x]));
  if(!c){const s=$('.fmseeds',fq);if(s){s.classList.remove('g22hl');void s.offsetWidth;s.classList.add('g22hl')}}});
 can.onclick=()=>water();
 // 兔兔：種著牽牛花時，先說牽牛花的小知識（一天一次）
 $('#fmhelp').onclick=()=>{if(!live())return;sfx('pop');const X=GX();let t;
  const kinds=planted().map(i=>cur(i).s);
  if(kinds.includes('morning')&&X.mgTip!==today()){X.mgTip=today();save2();t='牽牛花早上開花，太陽大了以後，就慢慢合起來。'}
  else if(kinds.includes('tulip')&&X.tuTip!==today()){X.tuTip=today();save2();t='荷蘭有好多風車，還有漂亮的鬱金香。'}
  else t=FM_TIPS[(F.ti||0)%FM_TIPS.length];bubble(t);sayQ([t])};
 draw(0,0);ctl();
 // 剛拿到的禮物：說一句、亮一下（看過就清掉 fresh）
 const news=[];
 if(isFresh('tulip')){news.push(two?'你得到鬱金香種子，還有一個新花盆！':'你得到鬱金香種子了！');if(pots[1])pots[1].classList.add('g22hi')}
 if(isFresh('morning'))news.push('你得到牽牛花種子了！');
 if(isFresh('elecan')){news.push('澆水壺變成大象了！');can.classList.add('g22hi')}
 seen('elecan');
 setTimeout(()=>{['tulip','morning'].forEach(k=>seen(k))},1500);
 (async()=>{const tip=F.tip!==today();
  const first=[planted().length?'歡迎回到小小農場！':'歡迎來到小小農場！',...news,...status()];if(night&&planted().length)first.push('晚上了，植物也在休息喔。');
  bubble(news.length?news.join(''):status().join(''));
  await Promise.race([sayQ(first),wait2(news.length?14000:10000)]);if(!live())return;
  pots.forEach(p=>p.classList.remove('g22hi'));can.classList.remove('g22hi');
  if(tip){F.tip=today();F.ti=((F.ti||0)+1)%FM_TIPS.length;save2();const t=FM_TIPS[F.ti];bubble(t);await Promise.race([sayQ(['兔兔的小知識：',{pause:200},t]),wait2(9000)])}})();
 window.__g22farm={water,pourAt,pots,F,two,ele};
}

/* ======================================================================
 * 2. 寵物小屋：彩虹隧道、潔牙骨頭（放進「玩具」；拿到才出現）
 * ====================================================================== */
// 玩具小圖（照禮物樣張 qa/v22/gift/gift_items.js；64×64）
const PICON={
 tunnel:()=>{const u=uid('ti');const sp=(x,y,r)=>`<path d="${sparkP(x,y,r)}"/>`;return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><clipPath id="${u}c"><path d="M20 17.4 Q33 13.4 46 14.6 Q60 16.4 60 31 V55 H20Z"/></clipPath>${lg(u+'s',[[0,'#FFFFFF'],[1,'#2A1A5A']])}${rgr(u+'i',[[0,'#5A4AA8'],[1,'#1E1648']],.55,.5,.7)}${lg(u+'r',[[0,'#FFA0BC'],[1,'#FF6F96']])}</defs>
  <ellipse cx="36" cy="60.5" rx="26" ry="2.6" fill="#3A2A5A" opacity=".16"/><g clip-path="url(#${u}c)">${['#FF7A9A','#FFB35C','#FFE07A','#7FE0A0','#7FC4FF','#B99CFF','#FF9FD0'].map((c,i)=>`<rect x="${20+i*6}" y="10" width="6.2" height="50" fill="${c}"/>`).join('')}<rect x="18" y="10" width="44" height="50" fill="url(#${u}s)" opacity=".26"/></g>
  <ellipse cx="20" cy="36" rx="13.4" ry="20" fill="url(#${u}r)"/><ellipse cx="21" cy="37" rx="9.6" ry="15.6" fill="url(#${u}i)"/>
  <ellipse cx="18.4" cy="38" rx="2.3" ry="2.7" fill="#fff"/><ellipse cx="24.2" cy="38" rx="2.3" ry="2.7" fill="#fff"/><circle cx="18.9" cy="38.4" r="1.3" fill="#2A1E36"/><circle cx="24.7" cy="38.4" r="1.3" fill="#2A1E36"/>
  <g fill="#FFE27A">${sp(54,8,4)}</g><g fill="#fff">${sp(9,11,2.6)}</g></svg>`},
 bone:()=>{const u=uid('tb');return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs>${lg(u+'b',[[0,'#B8F5E8'],[1,'#43BFA6']],1,1)}</defs><ellipse cx="33" cy="60.5" rx="22" ry="2.6" fill="#3A2A5A" opacity=".16"/>
  <g transform="rotate(-28 33 35)"><rect x="17" y="29" width="32" height="12" rx="6" fill="url(#${u}b)"/>${[[16.4,28.6],[16.4,41.4],[49.6,28.6],[49.6,41.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7.2" fill="url(#${u}b)"/>`).join('')}
  ${[25,30,35,40].map(x=>`<rect x="${x}" y="29.6" width="2.4" height="10.8" rx="1.2" fill="#fff" opacity=".55"/>`).join('')}<ellipse cx="14" cy="25.6" rx="2" ry="3.6" fill="#fff" opacity=".6" transform="rotate(-30 14 25.6)"/></g>
  <path transform="translate(5 3)" d="M1 6 Q1 1 5.6 1 Q7.4 2 9.2 1 Q13.8 1 13.8 6 Q13.8 10.6 11.8 16 Q10.8 18.4 9.8 15.6 L7.4 11.4 L5 15.6 Q4 18.4 3 16 Q1 10.6 1 6Z" fill="#FFFFFF"/><path d="${sparkP(22,7,3)}" fill="#FFE27A"/><path d="${sparkP(56,10,3.8)}" fill="#FFE27A"/></svg>`}};
// 隧道側面（橫的，viewBox 0 0 200 100）：彩虹圈圈、兩頭是深色的洞
function tunnelSide(){const u=uid('tu');const C=['#FF7A9A','#FFB35C','#FFE07A','#7FE0A0','#7FC4FF','#B99CFF','#FF9FD0'];
 return `<svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="${u}c"><rect x="12" y="8" width="176" height="86" rx="6"/></clipPath>${lg(u+'s',[[0,'#FFFFFF',.55],[.35,'#FFFFFF',0],[.8,'#2A1A5A',.08],[1,'#2A1A5A',.32]])}${rgr(u+'i',[[0,'#3A2E7A'],[1,'#140F38']],.5,.5,.7)}</defs>
  <ellipse cx="100" cy="96" rx="96" ry="4.6" fill="#2A1A5A" opacity=".22"/>
  <g clip-path="url(#${u}c)">${Array.from({length:14},(_,i)=>`<rect x="${N(12+i*12.6)}" y="0" width="12.8" height="100" fill="${C[i%7]}"/>`).join('')}
   ${Array.from({length:13},(_,i)=>`<path d="M${N(24.6+i*12.6)} 8 Q${N(21.6+i*12.6)} 51 ${N(24.6+i*12.6)} 94" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".5"/>`).join('')}
   <rect x="0" y="0" width="200" height="100" fill="url(#${u}s)"/></g>
  <ellipse cx="13" cy="51" rx="9" ry="43" fill="#FF8FB2"/><ellipse cx="14" cy="51" rx="6.4" ry="38" fill="url(#${u}i)"/>
  <ellipse cx="187" cy="51" rx="9" ry="43" fill="#C9A8FF"/><ellipse cx="186" cy="51" rx="6.4" ry="38" fill="url(#${u}i)"/>
  <path d="M30 14 Q100 6 170 14" stroke="#FFFFFF" stroke-width="3.4" fill="none" stroke-linecap="round" opacity=".55"/></svg>`}
const TOOTH=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 12 Q8 4 15 4 Q18 5.6 20 5.6 Q22 5.6 25 4 Q32 4 32 12 Q32 20 28.6 30 Q27 34.6 25 30 L20 22 L15 30 Q13 34.6 11.4 30 Q8 20 8 12Z" fill="#FFFFFF"/><path d="M12 10 Q14 7 17 7.6" stroke="#BFE6FF" stroke-width="2" fill="none" stroke-linecap="round"/><path d="${sparkP(33,6,5)}" fill="#FFE27A"/><path d="${sparkP(5,24,3.4)}" fill="#FFF6C8"/></svg>`;
const PTG={tunnel:['tunnel','彩虹隧道',0,'鑽過彩虹隧道，好好玩！'],bone:['bone','潔牙骨頭',0,'咬一咬，牙齒亮晶晶！']};
function ptSync(){try{Object.keys(PTG).forEach(k=>{if(!has(k))return;if(!PTOYS.some(t=>t[0]===k))PTOYS.push(PTG[k].slice());if(!PTART[k])PTART[k]=artOf(k==='bone'?'bone':'tunnel',PICON[k])})}catch(e){console.log('g22 ptSync',e)}}
ptSync();
{const _ph=SCREENS.pethouse;SCREENS.pethouse=function(){ptSync();const r=_ph.apply(this,arguments);
  try{const fr=Object.keys(PTG).filter(isFresh);if(fr.length)setTimeout(()=>{if(S.screen==='pethouse')fr.forEach(seen)},1600)}catch(e){}return r}}
// 玩具面板：最近三天拿到的禮物玩具發亮，並捲到看得到的地方（新的排在最後面，小手機會在下面）
{const _pn=ptPanel;ptPanel=function(kind){const r=_pn.apply(this,arguments);try{if(kind!=='toy')return r;const own=G22.st().own||{};const now=Date.now();
  const nw=Object.keys(PTG).filter(k=>has(k)&&(()=>{const v=own[k];const t=typeof v==='number'?v:Date.parse(v);return !isFinite(t)||now-t<3*864e5})());
  let last=null;nw.forEach(k=>{const b=document.querySelector(`.ptitem[data-k="${k}"]`);if(b){b.classList.add('g22pnew');last=b}});
  if(last)setTimeout(()=>{try{last.scrollIntoView({block:'nearest',behavior:calm()?'auto':'smooth'})}catch(e){}},350)}catch(e){console.log('g22 ptPanel',e)}return r}}
{const _pp=ptPlay;ptPlay=function(id,line){try{if(id==='tunnel')return ptTunnel(line);if(id==='bone')return ptBone(line)}catch(e){console.log('g22 ptPlay',e)}return _pp.apply(this,arguments)}}
// 隧道：寵物先往右讓位，隧道淡入；寵物從右邊的洞鑽進去、左邊的洞跑出來（只用移動，在隧道裡的部分遮住），再走回原位
function ptTunnel(line){const pb=$('#pbig'),fx=$('#pfx'),sc=$('#pscene');if(!pb||!fx||!sc)return;ptBusy(true);
 const c=calm();const R=sc.getBoundingClientRect();const P0=pb.getBoundingClientRect();const W=R.width;
 const tw=Math.min(W*.62,P0.width*.92),th=Math.min(P0.height*.86,tw*.62);
 const tl=W/2-tw/2-W*.02,tb=R.bottom-P0.bottom;
 const t=document.createElement('div');t.className='g22tun';t.innerHTML=tunnelSide();t.style.cssText=`left:${tl.toFixed(0)}px;bottom:${Math.max(0,tb-th*.04).toFixed(0)}px;width:${tw.toFixed(0)}px;height:${th.toFixed(0)}px`;fx.appendChild(t);
 const xL=R.left+tl+tw*.06,xR=R.left+tl+tw*.94;
 const cx0=P0.left+P0.width/2;
 const startX=xR+P0.width*.5+4-cx0,endX=xL-P0.width*.5-4-cx0;
 const old=pb.style.transition;pb.style.transition='none';sfx2('hop');
 const live=()=>ptLive(pb);
 const mask=()=>{const b=pb.getBoundingClientRect();if(!b.width)return;const a=(xL-b.left)/b.width*100,z=(xR-b.left)/b.width*100;
  if(z<=0||a>=100){pb.style.webkitMaskImage=pb.style.maskImage='';return}
  const g=`linear-gradient(90deg,#000 ${a.toFixed(1)}%,transparent ${a.toFixed(1)}%,transparent ${z.toFixed(1)}%,#000 ${z.toFixed(1)}%)`;pb.style.webkitMaskImage=g;pb.style.maskImage=g};
 const move=(from,to,ms,useMask)=>new Promise(res=>{if(c||ms<=1){pb.style.translate=`${to.toFixed(0)}px 0`;if(useMask)mask();res();return}const t0=performance.now();pb.classList.add('rfxrun');
  const step=now=>{if(!live()){res();return}const k=Math.min(1,(now-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;pb.style.translate=`${(from+(to-from)*e).toFixed(1)}px 0`;if(useMask)mask();
   if(k<1)requestAnimationFrame(step);else{pb.classList.remove('rfxrun');res()}};requestAnimationFrame(step)});
 (async()=>{await move(0,startX,450);if(!live())return;t.classList.add('on');await wait2(c?100:320);if(!live())return;
  sfx2('whoosh');await move(startX,endX,c?1:1500,true);if(!live())return;
  pb.style.webkitMaskImage=pb.style.maskImage='';sfx2('pop');try{const r=pb.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height*.3,8,true)}catch(e){}
  pb.classList.remove('g22hop');void pb.offsetWidth;pb.classList.add('g22hop');await wait2(c?100:600);if(!live())return;
  t.classList.remove('on');await move(endX,0,550);pb.style.translate='';pb.style.transition=old;pb.classList.remove('g22hop');t.remove();if(!live())return;ptFinish('j',line)})()}
// 潔牙骨頭：骨頭飛到嘴邊、咬一咬，牙齒亮一下（亮光＋小星星）
function ptBone(line){const pb=$('#pbig'),fx=$('#pfx'),sc=$('#pscene');if(!pb||!fx||!sc)return;ptBusy(true);
 const R=sc.getBoundingClientRect(),P=pb.getBoundingClientRect();const c=calm();
 const l=(P.left-R.left+P.width*.5)/R.width*100,t=(P.top-R.top+P.height*.36)/R.height*100;
 const b=document.createElement('div');b.className='g22pbone';b.innerHTML=PICON.bone();b.style.cssText=`left:${(l+6).toFixed(1)}%;top:${(t+4).toFixed(1)}%;width:${(P.width/R.width*34).toFixed(1)}%`;fx.appendChild(b);
 sfx2('pop');
 setTimeout(()=>{if(!ptLive(pb))return;pb.classList.add('g22chew');sfx2('crunch');setTimeout(()=>sfx2('crunch'),420)},c?50:500);
 setTimeout(()=>{if(!ptLive(pb))return;pb.classList.remove('g22chew');b.classList.add('off');
  const th=document.createElement('div');th.className='g22tooth';th.innerHTML=TOOTH;th.style.cssText=`left:${(l-4).toFixed(1)}%;top:${(t-8).toFixed(1)}%;width:${(P.width/R.width*26).toFixed(1)}%`;fx.appendChild(th);sfx2('gem');
  try{burst(P.left+P.width*.5,P.top+P.height*.3,6,true)}catch(e){}},c?300:1700);
 setTimeout(()=>{if(!ptLive(pb))return;fx.innerHTML='';ptFinish('c',line)},c?900:2900)}

/* ======================================================================
 * 3. 小小廚師：芒果（水果串）、小黃瓜（三明治）
 * 出題在 chef5.js 裡面，patches/95_g22items.py 留了三個接口：G22.chefExtra()（多的材料）、G22.chefWant(mode)（剛拿到的那一樣，下一題一定出）、G22.chefSeen(seq)；
 * 圖：G22.chefIcon(k)、G22.chefLayer(k,y)。名字、提示句放進 window.__P5.T（i_、h_）。
 * ====================================================================== */
const CHEF={
 mango:()=>{const u=uid('cm');return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs>${lg(u+'t',[[0,'#FFF3B0'],[1,'#FFD84A']])}${lg(u+'l',[[0,'#FFC93A'],[1,'#F5A21E']])}${lg(u+'r',[[0,'#F2A020'],[1,'#E0801A']])}</defs>
  <ellipse cx="32" cy="58.4" rx="21" ry="2.6" fill="#3A2A7A" opacity=".16"/>
  <path d="M12 22 L32 12 L53 21 L33 31Z" fill="url(#${u}t)" stroke="#E0A02A" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M12 22 L33 31 V55 L13 45Z" fill="url(#${u}l)" stroke="#D88A1A" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M33 31 L53 21 V44 L33 55Z" fill="url(#${u}r)" stroke="#C8741A" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M19 21 L38 29.6 M26 17.6 L45 26 M24 25 L43 16.4 M17 22.6 L36 14" stroke="#FFFFFF" stroke-width="1" opacity=".45"/>
  <path d="M16 27 Q16 37 18 43" stroke="#FFF3B0" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/><ellipse cx="25" cy="19" rx="4" ry="1.6" fill="#fff" opacity=".7" transform="rotate(-22 25 19)"/>
  <path d="${sparkP(54,9,3.6)}" fill="#FFF6C8"/></svg>`},
 cucumber:()=>{const u=uid('cc');const seeds=(cx,cy,r)=>Array.from({length:7},(_,k)=>{const a=k/7*Math.PI*2;return `<ellipse cx="${N(cx+r*Math.cos(a))}" cy="${N(cy+r*Math.sin(a))}" rx="1.5" ry="2.6" fill="#F4FFE6" transform="rotate(${N(a*180/Math.PI+90)} ${N(cx+r*Math.cos(a))} ${N(cy+r*Math.sin(a))})"/>`}).join('');
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs>${rgr(u+'f',[[0,'#EEFFD8'],[.7,'#C8EE9A'],[1,'#9ED870']],.45,.45,.6)}</defs>
  <ellipse cx="32" cy="58.4" rx="22" ry="2.6" fill="#3A2A7A" opacity=".16"/>
  <circle cx="42" cy="26" r="16" fill="#3E9A3E"/><circle cx="42" cy="26" r="13.4" fill="url(#${u}f)"/>${seeds(42,26,6.4)}
  <ellipse cx="24" cy="42" rx="19.4" ry="17" fill="#2E8A3A"/><circle cx="24" cy="38" r="17" fill="#4FAE4A"/><circle cx="24" cy="38" r="14.2" fill="url(#${u}f)"/>${seeds(24,38,7)}
  <path d="M13 31 Q16 25 22 23.6" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/></svg>`}};
// 三明治側面一層：一排小黃瓜片（高 12，跟起司差不多）
const cuLayer=y=>`${Array.from({length:7},(_,i)=>{const x=10+i*26;return `<rect x="${x}" y="${y}" width="28" height="11" rx="5.5" fill="#4FAE4A"/><rect x="${x+2}" y="${y+2.2}" width="24" height="6.6" rx="3.3" fill="#D8F4B0"/>${[0,1,2].map(j=>`<ellipse cx="${x+8+j*6}" cy="${y+5.5}" rx="1.3" ry="1" fill="#F4FFE6"/>`).join('')}`}).join('')}`;
G22.chefIcon=k=>{try{return CHEF[k]?CHEF[k]():''}catch(e){return ''}};
G22.chefLayer=(k,y)=>k==='cucumber'?[12,cuLayer(y)]:null;
G22.chefExtra=()=>({fill:has('cucumber')?['cucumber']:[],fruit:has('mango')?['mango']:[]});
G22.chefWant=mode=>mode==='fruit'?(has('mango')&&isFresh('mango')?'mango':null):(has('cucumber')&&isFresh('cucumber')?'cucumber':null);
G22.chefSeen=seq=>{try{['mango','cucumber'].forEach(k=>{if(seq.includes(k)&&isFresh(k))seen(k)})}catch(e){}};
try{if(window.__P5&&__P5.T)Object.assign(__P5.T,{i_mango:'芒果',i_cucumber:'小黃瓜',h_mango:'是黃黃的芒果喔！',h_cucumber:'是綠綠的小黃瓜喔！'})}catch(e){}
// 選單：剛拿到的那一樣，在「水果串／三明治」上面放一個小圖＋「新」
if(SCREENS.chef5){const _c5=SCREENS.chef5;SCREENS.chef5=function(){const r=_c5.apply(this,arguments);try{
  [['mango','fruit'],['cucumber','sand']].forEach(([k,m])=>{if(!has(k)||!isFresh(k))return;const b=document.querySelector(`#ch5modes .ch5opt[data-v="${m}"]`);if(!b||b.querySelector('.g22c5n'))return;
   b.insertAdjacentHTML('beforeend',`<span class="g22c5n">${CHEF[k]()}<i>新</i></span>`);b.classList.add('g22c5b')})}catch(e){console.log('g22 chef menu',e)}return r}}
/* ======================================================================
 * 4. 房間：星星投影燈、長頸鹿身高尺、動物腳印地毯、備用擺飾（雲朵抱枕、星星吊飾、愛心小盆栽）
 * 照章節獎品的做法：ROOMITEMS 加一樣（999）＋ S.roomOwned 記「格:值」，拿到才加，所以沒拿到的小朋友看不到；第一次加進來時用「房間有新東西！」那張卡說一次。
 * ====================================================================== */
const ROOM22=[['lamp','starlamp','星星投影燈'],['toy','giraffe','長頸鹿身高尺'],['rug','pawrug','動物腳印地毯'],
 ['toy','sp_cushion','雲朵抱枕'],['toy','sp_mobile','星星吊飾'],['toy','sp_plant','愛心小盆栽']];
function rmSync(){try{if(!S.roomOwned)return;let got=[];ROOM22.forEach(([s,v,n])=>{if(!has(v)||!ROOMITEMS[s])return;
  if(!ROOMITEMS[s].some(x=>x[0]===v))ROOMITEMS[s].push([v,n,999]);const k=s+':'+v;if(!S.roomOwned.includes(k)){S.roomOwned.push(k);got.push(n)}});
 if(got.length){try{const K=RNK();V2[K]=(V2[K]||[]).concat(got)}catch(e){}save2();saveP()}}catch(e){console.log('g22 rmSync',e)}}
rmSync();
Object.assign(RMSAY,{giraffe:['量量看，你又長高了！'],sp_cushion:['雲朵抱枕軟綿綿的！'],sp_mobile:['星星吊飾轉呀轉！'],sp_plant:['愛心小盆栽，長出好多愛心！']});
// ---- 圖：檯燈、地毯（畫在 RD41.room 的房間圖裡；座標 800×400） ----
function starLampArt(){const u=uid('sl');return `<g class="g22lamp"><defs>${rgr(u+'d',[[0,'#A898F8'],[1,'#3A2E8A']],.38,.3,.8)}${lg(u+'b',[[0,'#FFC2DF'],[1,'#E8679F']])}${rgr(u+'g',[[0,'#FFF3C4',.7],[1,'#FFF3C4',0]],.5,.5,.5)}</defs>
 <circle cx="292" cy="196" r="34" fill="url(#${u}g)"/>
 <path d="M276 224 H308 L304 214 H280Z" fill="#D85A92"/><rect x="273" y="206" width="38" height="9" rx="4.5" fill="url(#${u}b)"/><rect x="277" y="207.6" width="24" height="2.2" rx="1.1" fill="#fff" opacity=".5"/><circle cx="305" cy="210.5" r="1.8" fill="#FFE27A"/>
 <path d="M274 207 A18 18 0 0 1 310 207Z" fill="url(#${u}d)"/>
 ${[[284,199,3.6],[294,193,3.2],[302,200,2.6],[289,204,2],[279,203.4,1.8],[299,205,1.8]].map(([x,y,r])=>`<path d="${star5p(x,y,r)}" fill="#FFE27A"/>`).join('')}
 <path d="M279 199 Q283 192 290 190" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>
 ${[[262,178,3.4],[322,174,3],[276,166,2.4],[312,160,2.2]].map(([x,y,r])=>`<path d="${star5p(x,y,r)}" fill="#FFE27A" opacity=".8"/>`).join('')}</g>`}
const RUGP=Array.from({length:10},(_,k)=>{const a=(k/10)*Math.PI*2+Math.PI/2;return [400+150*Math.cos(a),346+24*Math.sin(a),-a*180/Math.PI]});
function pawRugArt(){const u=uid('pr');return `<g class="g22rug"><defs>${rgr(u+'r',[[0,'#FFF6EA'],[.75,'#FFE4CC'],[1,'#FFCFAE']],.5,.45,.6)}</defs>
 <ellipse cx="400" cy="345" rx="196" ry="39" fill="#FFB38A"/><ellipse cx="400" cy="344" rx="186" ry="35" fill="url(#${u}r)"/>
 <ellipse cx="400" cy="344" rx="178" ry="32" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 7" opacity=".9"/>
 <g fill="#E8957A" opacity=".85">${RUGP.map(([x,y,a])=>`<g transform="translate(${N(x)} ${N(y)}) rotate(${N(a+90)}) scale(1 .55)">${pawP(0,0,7)}</g>`).join('')}</g>
 <g fill="#FF9FB0" transform="translate(400 343) scale(1 .5)">${pawP(0,0,16)}</g><g fill="#FFFFFF" opacity=".45" transform="translate(396 339) scale(1 .5)"><ellipse cx="0" cy="0" rx="5" ry="3"/></g></g>`}
try{const RR=window.RD41;if(RR&&typeof RR.room==='function'){const _rm=RR.room;RR.room=function(o){o=Object.assign({},o||{});const sl=o.lamp==='starlamp',pr=o.rug==='pawrug';if(sl)o.lamp='g22none';if(pr)o.rug='g22none';
 let s=_rm.call(this,o);try{if(pr){const a=s;s=s.replace(/(<ellipse cx="400" cy="351" rx="206" ry="42"[^>]*\/>)/,(m,h)=>h+pawRugArt());if(s===a)s=s.replace(/(<rect width="800" height="400" fill="url\(#[^)]*vg\)"\/>)/,(m,h)=>pawRugArt()+h)}
  if(sl){const a=s;s=s.replace(/(<rect width="800" height="400" fill="url\(#[^)]*vg\)"\/>)/,(m,h)=>starLampArt()+h);if(s===a)s+=starLampArt()}}catch(e){console.log('g22 room art',e)}return s}}}catch(e){console.log('g22 RD41',e)}
// ---- 圖：玩具格的東西 ----
const RTOYART={
 giraffe:()=>{const u=uid('gr');return `<svg viewBox="0 -26 54 166" aria-hidden="true"><defs>${lg(u+'r',[[0,'#FFFFFF'],[1,'#FFE3EF']],1,0)}${lg(u+'y',[[0,'#FFE58A'],[1,'#FFC23A']],1,1)}</defs>
  <ellipse cx="27" cy="137" rx="24" ry="2.6" fill="#3A2A5A" opacity=".18"/>
  <rect x="3" y="-6" width="13" height="142" rx="3.4" fill="url(#${u}r)"/><rect x="3" y="-6" width="3" height="142" rx="1.5" fill="#FFC9DD" opacity=".8"/>
  ${Array.from({length:27},(_,i)=>{const y=-2+i*5;return `<path d="M${i%2?10:7} ${y} H15" stroke="#FF8FB8" stroke-width="${i%2?1.1:1.6}" stroke-linecap="round"/>`}).join('')}
  <path d="M30 118 Q28 50 24 4 L32 2 Q37 50 40 116Z" fill="url(#${u}y)"/>
  ${[[24,124,4],[29,126,4],[38,126,4],[43,124,4]].map(([x,y,w])=>`<rect x="${x}" y="${y-10}" width="${w}" height="15" rx="2" fill="#FFC93C"/><rect x="${x}" y="${y+2.4}" width="${w}" height="2.6" rx="1.1" fill="#A8743E"/>`).join('')}
  <ellipse cx="34" cy="114" rx="14" ry="9" fill="url(#${u}y)"/><path d="M47 112 Q52 116 50 122" stroke="#E8A030" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="123" rx="1.4" ry="2" fill="#A8743E"/>
  <g fill="#F2A93B" opacity=".9"><ellipse cx="30" cy="110" rx="3" ry="2.2"/><ellipse cx="38" cy="112" rx="2.6" ry="2"/><ellipse cx="34" cy="117" rx="2.2" ry="1.6"/><ellipse cx="31" cy="96" rx="1.8" ry="2.6"/><ellipse cx="29.6" cy="78" rx="1.8" ry="2.6"/><ellipse cx="28.4" cy="58" rx="1.6" ry="2.4"/><ellipse cx="27" cy="38" rx="1.6" ry="2.2"/><ellipse cx="26" cy="20" rx="1.4" ry="2"/><ellipse cx="34" cy="86" rx="1.4" ry="2"/><ellipse cx="32" cy="48" rx="1.4" ry="2"/></g>
  <g class="g22ghead" transform="translate(0 -24)"><path d="M24 8 V3.6 M30 7.6 V3.2" stroke="#C88A3A" stroke-width="1.8" stroke-linecap="round"/><circle cx="24" cy="3.2" r="1.8" fill="#A8743E"/><circle cx="30" cy="2.8" r="1.8" fill="#A8743E"/>
   <ellipse cx="36" cy="12" rx="3.4" ry="1.6" transform="rotate(-20 36 12)" fill="#FFC23A"/>
   <ellipse cx="27" cy="16" rx="9" ry="7" transform="rotate(-10 27 16)" fill="url(#${u}y)"/><ellipse cx="20.6" cy="19" rx="4.6" ry="3.6" fill="#FFE9B8"/><circle cx="19.2" cy="18.4" r=".7" fill="#8A5A3A"/><circle cx="22" cy="18.2" r=".7" fill="#8A5A3A"/>
   <circle cx="28.4" cy="13.6" r="1.6" fill="#2A1E36"/><circle cx="28.9" cy="13" r=".6" fill="#fff"/><circle cx="30.6" cy="18.4" r="1.7" fill="#FF9FB0" opacity=".6"/><path d="M21 21.6 Q23 23 25 21.8" stroke="#A8743E" stroke-width=".9" fill="none" stroke-linecap="round"/></g>
  <path d="M9.6 73 Q7.8 71.6 8.4 70.4 Q9.2 69.6 10 70.6 Q10.8 69.6 11.6 70.4 Q12.2 71.6 10.4 73Z" fill="#FF6F91"/></svg>`},
 sp_cushion:()=>{const u=uid('cu');return `<svg viewBox="0 0 100 64" aria-hidden="true"><defs>${lg(u+'c',[[0,'#FFFFFF'],[1,'#D8E8FF']])}</defs><ellipse cx="50" cy="60" rx="44" ry="3.4" fill="#3A2A5A" opacity=".16"/>
  <path d="M14 52 Q2 50 4 38 Q6 28 18 28 Q20 14 36 14 Q46 4 60 12 Q76 8 82 22 Q98 24 96 40 Q96 54 82 54 H20Z" fill="url(#${u}c)"/>
  <path d="M18 30 Q22 22 32 20 M58 14 Q66 12 72 16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="38" cy="38" r="2.6" fill="#5A4A8A"/><circle cx="62" cy="38" r="2.6" fill="#5A4A8A"/><path d="M45 44 Q50 48 55 44" stroke="#5A4A8A" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="31" cy="44" rx="4" ry="2.4" fill="#FFB3D1" opacity=".7"/><ellipse cx="69" cy="44" rx="4" ry="2.4" fill="#FFB3D1" opacity=".7"/>
  <path d="${star5p(84,16,5)}" fill="#FFE27A"/></svg>`},
 sp_mobile:()=>{const u=uid('mo');const st=(x,y,r,c,k)=>`<g class="g22mst" style="transform-origin:${x}px ${y-12}px;animation-delay:${k*.3}s"><path d="M${x} ${y-12} V${y-r}" stroke="#C8B0E8" stroke-width="1"/><path d="${star5p(x,y,r)}" fill="${c}"/><circle cx="${N(x-r*.25)}" cy="${N(y-r*.25)}" r="${N(r*.18)}" fill="#fff" opacity=".7"/></g>`;
  return `<svg viewBox="0 0 80 150" aria-hidden="true"><defs>${lg(u+'p',[[0,'#E8D8FF'],[1,'#B99CFF']],1,0)}</defs><ellipse cx="40" cy="146" rx="22" ry="3" fill="#3A2A5A" opacity=".18"/>
  <path d="M26 144 Q40 136 54 144Z" fill="#B99CFF"/><rect x="38" y="22" width="4.4" height="120" rx="2.2" fill="url(#${u}p)"/>
  <g class="g22marm" style="transform-origin:40px 24px"><path d="M8 26 Q40 16 72 26" stroke="#C8A06A" stroke-width="3" fill="none" stroke-linecap="round"/>
   ${st(12,48,7,'#FFE27A',0)}${st(28,58,6,'#FF9FC4',1)}${st(52,56,6.4,'#9FD8FF',2)}${st(68,46,7,'#FFE27A',3)}</g>
  <circle cx="40" cy="20" r="5" fill="#FFD24D"/><path d="${sparkP(62,10,3)}" fill="#FFF6C8"/></svg>`},
 sp_plant:()=>{const u=uid('hp');return `<svg viewBox="0 0 70 100" aria-hidden="true"><defs>${lg(u+'o',[[0,'#F7A577'],[1,'#D8683E']],1,0)}</defs><ellipse cx="35" cy="96" rx="22" ry="3" fill="#3A2A5A" opacity=".18"/>
  <path d="M35 66 V40 M35 56 Q24 50 20 38 M35 52 Q46 46 50 34" stroke="#4E9E4A" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="g22hrt"><path d="${heartP(20,32,8)}" fill="#FF7FB0"/><path d="${heartP(50,28,8.6)}" fill="#FF5F9E"/><path d="${heartP(35,22,10)}" fill="#FF8FC0"/><circle cx="31" cy="18" r="2" fill="#fff" opacity=".6"/></g>
  <path d="M28 46 Q22 44 20 48 Q26 50 28 46Z M42 44 Q48 42 50 46 Q44 48 42 44Z" fill="#6CC562"/>
  <path d="M14 66 H56 L52 92 Q51.6 95 48 95 H22 Q18.4 95 18 92Z" fill="url(#${u}o)"/><rect x="11" y="62" width="48" height="8" rx="4" fill="#F7B080"/>
  <path d="M35 86 Q30 82 31.4 79.6 Q33 78 35 80.2 Q37 78 38.6 79.6 Q40 82 35 86Z" fill="#FFE27A"/><path d="M19 72 Q18 82 21 90" stroke="#FFD0B0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/></svg>`}};
{const _rs=roomSVG;roomSVG=function(){const R=_rs.apply(this,arguments);try{const ty=roomGet('toy');if(RTOYART[ty])R.toy=RTOYART[ty]()}catch(e){console.log('g22 roomtoy',e)}return R}}
// ---- 房間畫面：同步、新東西提示、互動 ----
{const _rm=SCREENS.room;SCREENS.room=function(sel){rmSync();const r=_rm.apply(this,arguments);
  try{const fr=ROOM22.map(x=>x[1]).filter(isFresh);if(fr.length)setTimeout(()=>{if(S.screen==='room')fr.forEach(seen)},1800)}catch(e){}return r}}
// 關燈：星星投影燈把星星灑滿牆和天花板（星星從燈飛出去＝移動＋淡入，到了以後慢慢閃）
let skyOn=false;
function starSky(sc){if(!sc)return;let k='';try{k=roomGet('lamp')}catch(e){}const want=k==='starlamp'&&sc.classList.contains('dark');let sky=sc.querySelector(':scope>.g22sky');
 if(!want){if(sky){sky.classList.remove('on');setTimeout(()=>{if(!sky.classList.contains('on'))sky.remove()},700)}skyOn=false;return}
 if(!sky){sky=document.createElement('div');sky.className='g22sky';sky.setAttribute('aria-hidden','true');
  const R=sc.getBoundingClientRect(),L=[36.5,49];const pts=[];let s=7;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280};
  for(let i=0;i<(S.lite?26:44);i++){const x=2+rnd()*96,y=2+Math.pow(rnd(),1.3)*66;if(Math.abs(x-L[0])<4&&Math.abs(y-L[1])<8)continue;pts.push([x,y,1.1+rnd()*1.8,rnd()])}
  sky.innerHTML=`<i class="g22glow" style="left:${L[0]}%;top:${L[1]}%"></i>`+pts.map(([x,y,w,r],i)=>{const dx=(L[0]-x)/100*R.width,dy=(L[1]-y)/100*R.height;
   return `<b style="left:${N(x)}%;top:${N(y)}%;width:${N(w)}%;--dx:${N(dx)}px;--dy:${N(dy)}px;--d:${N(.05+Math.hypot(dx,dy)/Math.max(1,R.width)*.9)}s;--t:${N(2.4+r*2)}s"><svg viewBox="0 0 20 20"><path d="${i%3?star5p(10,10,9.4,.45):sparkP(10,10,9.4)}" fill="${['#FFF3B0','#FFFFFF','#FFE27A','#D8E4FF'][i%4]}"/></svg></b>`}).join('');
  sc.appendChild(sky)}
 requestAnimationFrame(()=>sky.classList.add('on'));
 if(!skyOn&&S.screen==='room'){const tk=RM.tok;setTimeout(()=>{try{if(RM.tok===tk&&S.screen==='room'&&sc.classList.contains('dark')&&roomGet('lamp')==='starlamp'){const t='星星灑滿房間了！好漂亮！';bubbleAt(sc,t,37,12);sayQ([t])}}catch(e){}},1300)}
 skyOn=true}
{const _ra=rmApply;rmApply=function(sc){const r=_ra.apply(this,arguments);try{starSky(sc)}catch(e){console.log('g22 sky',e)}return r}}
// 互動（rmEnhance 最外層）：長頸鹿量身高、抱枕／吊飾／盆栽、腳印地毯
{const _re=rmEnhance;rmEnhance=function(){const r=_re.apply(this,arguments);try{room22()}catch(e){console.log('g22 room',e)}return r}}
function room22(){const sc=document.querySelector('.rscene2');if(!sc||sc.dataset.g22)return;sc.dataset.g22='1';
 const pr=sc.querySelector('.rpr'),pet=sc.querySelector('.rpet'),toy=sc.querySelector('.rtoy');if(!pr)return;
 const tok=RM.tok,live=()=>tok===RM.tok&&S.screen==='room'&&sc.isConnected;
 const later=(fn,ms)=>setTimeout(()=>{if(live())try{fn()}catch(e){console.log('g22 room fx',e)}},ms);
 const busy=()=>Date.now()<RM.busy,lock=ms=>{RM.busy=Date.now()+ms};
 const ty=(()=>{try{return roomGet('toy')}catch(e){return ''}})();
 if(toy)toy.classList.toggle('g22tall',ty==='giraffe'||ty==='sp_mobile');
 const box=el=>{const R=sc.getBoundingClientRect(),b=el.getBoundingClientRect();return {l:(b.left-R.left)/R.width*100,t:(b.top-R.top)/R.height*100,w:b.width/R.width*100,h:b.height/R.height*100}};
 const rig=()=>{const s=pr.querySelector('svg');if(!s||!(window.R99&&R99.ok))return null;try{return s.classList.contains('rj')?s:R99.prep(s)}catch(e){return null}};
 const pose=(mv,o)=>{const n=rig();if(n)try{R99.set(n,mv,o)}catch(e){}};
 const follow=l=>{try{const scr=document.querySelector('.rmscroll');if(!scr||scr.scrollWidth<=scr.clientWidth+4)return;scr.scrollTo({left:Math.max(0,Math.min(scr.scrollWidth-scr.clientWidth,l/100*scr.scrollWidth-scr.clientWidth/2)),behavior:calm()?'auto':'smooth'})}catch(e){}};
 let fx=[];const add=(cls,html,css)=>{const d=document.createElement('div');d.className='g22rfx '+cls;if(html)d.innerHTML=html;d.style.cssText=css||'';sc.appendChild(d);fx.push(d);return d};
 let moved=false;
 const walk=(cx)=>{follow(cx);if(calm())return 0;const w=box(pr).w||21;pr.classList.remove('rmidle');pr.style.left=Math.max(1,Math.min(99-w,cx-w/2)).toFixed(1)+'%';pr.style.bottom='4%';moved=true;pose('march');return 900};
 const home=()=>{fx.forEach(e=>e.remove());fx=[];const n=pr.querySelector('svg');if(n&&n.__rj){try{RIG.stop(n)}catch(_){}}else if(n&&window.R99&&R99.ok&&n.classList.contains('rj'))try{R99.set(n,null)}catch(_){}
  if(moved){pr.style.left='';pr.style.bottom=''}moved=false;pr.classList.add('rmidle');if(toy)toy.classList.remove('g22nod','g22swing','g22glow2')};
 const hearts=(l,t,n,ch)=>{for(let i=0;i<n;i++){const h=document.createElement('span');h.className='rmheart';h.textContent=ch||'💗';h.style.left=(l+(Math.random()*8-4))+'%';h.style.top=t+'%';h.style.animationDelay=(i*.12)+'s';sc.appendChild(h);setTimeout(()=>h.remove(),1800+i*120)}};
 const tcls=c=>{if(!toy)return;toy.classList.remove(c);void toy.offsetWidth;toy.classList.add(c)};
 const TFX={
  giraffe(){const b=box(toy);lock(4200);const d=walk(b.l-box(pr).w*.36);
   later(()=>{pose(null);const P=box(pr),B=box(toy);const head=P.t+P.h*.05;
    // 小星星從尺的上面滑下來，停在頭頂的高度
    const mk=add('g22mark','<svg viewBox="0 0 20 20"><path d="'+star5p(10,10,9)+'" fill="#FFD24D"/></svg>',`left:${N(B.l+B.w*.12)}%;top:${N(B.t)}%;width:2.6%;--to:${N((head-B.t)/100*sc.getBoundingClientRect().height)}px`);
    add('g22line','',`left:${N(P.l+P.w*.42)}%;top:${N(head+1.2)}%;width:${N(Math.max(1,B.l+B.w*.2-(P.l+P.w*.42)))}%`);
    sfx2('pop')},d);
   later(()=>{tcls('g22nod');sfx2('gem');const t='量量看，你又長高了！';const B=box(toy);bubbleAt(sc,t,B.l+B.w/2,Math.max(2,B.t-12));sayQ([t]);pose('clap',{iter:1})},d+1100);
   later(home,d+3300)},
  sp_cushion(){const b=box(toy);lock(3000);const d=walk(b.l-box(pr).w*.3);
   later(()=>{pose('r_hug');tcls('g22glow2');hearts(b.l+b.w/2,b.t-6,4);const t='雲朵抱枕軟綿綿的！';bubbleAt(sc,t,b.l+b.w/2,Math.max(2,b.t-22));sayQ([t])},d);later(home,d+2100)},
  sp_mobile(){const b=box(toy);lock(3200);tcls('g22swing');sfx2('hint');const t='星星吊飾轉呀轉！';bubbleAt(sc,t,b.l+b.w/2,Math.max(2,b.t-12));sayQ([t]);
   later(()=>{const R=sc.getBoundingClientRect();for(let i=0;i<4;i++)later(()=>add('g22twk','<svg viewBox="0 0 20 20"><path d="'+sparkP(10,10,9)+'" fill="#FFF6C8"/></svg>',`left:${N(b.l+Math.random()*b.w)}%;top:${N(b.t+Math.random()*b.h*.4)}%;width:2%`),i*220)},200);later(home,3000)},
  sp_plant(){const b=box(toy);lock(3000);const d=walk(b.l-box(pr).w*.3);
   later(()=>{pose('r_point');tcls('g22glow2');sfx2('gem');hearts(b.l+b.w/2,b.t,6);const t='愛心小盆栽，長出好多愛心！';bubbleAt(sc,t,b.l+b.w/2,Math.max(2,b.t-14));sayQ([t])},d);later(home,d+2100)}};
 if(toy&&toy.onclick&&TFX[ty]){const o=toy.onclick;toy.onclick=function(e){if(RM.gemAt==='toy')return o.call(toy,e);if(busy())return;try{TFX[ty]()}catch(err){console.log('g22 toy',err)}}}
 // 動物腳印地毯：寵物踩著腳印走一圈（只移動），走過的腳印亮一下
 let rg='';try{rg=roomGet('rug')}catch(e){}
 const rug=sc.querySelector('.rmhit[data-k99="rug"]');
 if(rug&&rg==='pawrug'&&pet){const o=rug.onclick;rug.onclick=function(e){if(busy())return;if(RM.gemAt==='rug'&&o)return o.call(rug,e);
   const paws=add('g22paws',RUGP.map(([x,y,a],i)=>`<i style="left:${N(x/8)}%;top:${N(y/4)}%;--a:${N(a+90)}deg"><svg viewBox="-12 -12 24 24"><g fill="#FFF3B0">${pawP(0,0,7)}</g></svg></i>`).join(''),'left:0;top:0;width:100%;height:100%');
   const order=[0,9,8,7,6,5,4,3,2,1,0];// 前面中間開始，往右繞一圈
   const pw=box(pet).w||15;const T0=calm()?0:1;const step=T0?380:0;lock(order.length*step+2400);
   pet.classList.remove('rmwalk','rmcurl');pet.classList.add('rmrun');const tr0=pet.style.transition;pet.style.transition=T0?`left ${step}ms linear,bottom ${step}ms linear`:'none';
   const sh=sc.getBoundingClientRect().height||1;
   order.forEach((k,i)=>later(()=>{const [x,y]=RUGP[k];pet.style.left=N(x/8-pw/2)+'%';pet.style.bottom=N(Math.max(0,100-y/4-3))+'%';const el=paws.children[k];if(el){el.classList.remove('lit');void el.offsetWidth;el.classList.add('lit')}if(i%2)try{tone(700+i*40,0,.08,'triangle',.05)}catch(_){}},i*step+120));
   later(()=>{pet.classList.remove('rmrun');hearts(50,58,4);const t='踩著腳印，走一圈！';bubbleAt(sc,t,50,40);sayQ([t]);sfx2('gem')},order.length*step+200);
   later(()=>{pet.style.transition=tr0;pet.style.left='';pet.style.bottom='';pet.classList.add('rmwalk');paws.remove();fx=fx.filter(x=>x!==paws)},order.length*step+2000)}}
 window.__g22room={TFX,sc}}
/* ======================================================================
 * 5. 塗色本：小書蟲、變色龍小畫家（200×200；r＝可以塗的區塊，後面的蓋在前面；deco43＝畫在線上面、不能塗）
 * 兩張圖一開始就放進 PICS（編號固定，塗過的顏色才對得上），沒拿到的由 patches/95 從列表拿掉。
 * ====================================================================== */
{const INK='#3A2A5C';const dl=(d,w=2.5)=>`<path d="${d}" stroke="${INK}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 const dot=(x,y,r=2.6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;const hi=(x,y,r=1.2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF"/>`;
 const C=(t,a)=>[t,a];
 const BOOKWORM={n:'小書蟲',g22:'bookworm',cat47:'animal',lv47:2,lw43:5,r:[
  C('rect','x="0" y="0" width="200" height="200"'),
  C('rect','x="0" y="168" width="200" height="32"'),
  C('path',`d="${star5p(30,42,13)}"`),C('path',`d="${star5p(64,24,8)}"`),C('path',`d="${heartP(178,40,10)}"`),
  C('rect','x="16" y="146" width="128" height="24" rx="5"'),C('rect','x="22" y="151" width="116" height="8" rx="2"'),
  C('rect','x="28" y="126" width="104" height="22" rx="5"'),C('rect','x="34" y="131" width="92" height="7" rx="2"'),
  C('circle','cx="44" cy="114" r="13"'),C('circle','cx="64" cy="107" r="15"'),C('circle','cx="86" cy="100" r="17"'),C('circle','cx="106" cy="94" r="17"'),
  C('circle','cx="112" cy="16" r="6.4"'),C('circle','cx="152" cy="15" r="6.4"'),
  C('circle','cx="128" cy="60" r="32"'),
  C('path','d="M98 42 Q100 22 128 22 Q156 22 158 42 Q144 34 128 34 Q112 34 98 42Z"'),
  C('circle','cx="102" cy="82" r="5"'),C('circle','cx="154" cy="82" r="5"'),
  C('circle','cx="116" cy="60" r="11"'),C('circle','cx="140" cy="60" r="11"'),
  C('path','d="M134 128 Q151 121 168 129 Q185 121 198 127 V133 Q185 127 168 135 Q151 127 134 133Z"'),
  C('path','d="M168 129 Q154 120 138 125 L140 96 Q155 91 168 100Z"'),C('path','d="M168 129 Q182 120 196 125 L194 96 Q181 91 168 100Z"'),
  C('path',`d="${heartP(178,182,8)}"`)],
  deco43:dl('M118 30 Q114 24 112 22')+dl('M140 30 Q146 22 150 21')+dl('M105 58 L97 53')+dl('M151 58 L159 53')+dl('M127 59 Q128 55 129 59')
   +dot(117,61,3.4)+dot(141,61,3.4)+hi(118.4,59.6)+hi(142.4,59.6)+dl('M120 80 Q128 87 136 80')
   +dl('M144 104 H162 M144 111 H161 M145 118 H158',2)+dl('M174 104 H190 M175 111 H189 M176 118 H186',2)+dl('M168 100 V129',2)
   +dl('M40 158 H62 M100 158 H128',2)+dl('M48 137 H70',2)+dot(60,100,1.8)+dot(84,92,1.8)+dot(102,86,1.8)};
 const CHAMELEON={n:'變色龍小畫家',g22:'chameleon',cat47:'animal',lv47:3,lw43:5,r:[
  C('rect','x="0" y="0" width="200" height="200"'),
  C('rect','x="0" y="172" width="200" height="28"'),
  C('path','d="M130 90 L116 172 L124 172 L137 90Z"'),C('path','d="M176 90 L190 172 L182 172 L169 90Z"'),
  C('rect','x="118" y="28" width="72" height="64" rx="4"'),C('circle','cx="172" cy="46" r="9"'),
  C('path','d="M120 90 Q136 70 152 80 Q166 72 188 84 V90Z"'),
  C('rect','x="112" y="90" width="84" height="8" rx="3"'),
  C('path','d="M16 150 A18 18 0 1 0 52 150 A18 18 0 1 0 16 150Z M26 150 A8 8 0 1 0 42 150 A8 8 0 1 0 26 150Z" fill-rule="evenodd"'),
  C('path','d="M60 136 Q50 130 44 134 L47 143 Q53 140 60 146Z"'),
  C('ellipse','cx="78" cy="134" rx="24" ry="20"'),
  C('path','d="M62 148 L58 170 H72 L74 150Z"'),C('path','d="M86 150 L90 170 H104 L98 148Z"'),
  C('path','d="M58 122 Q78 112 96 122 Q102 138 96 152 Q78 158 60 152 Q54 138 58 122Z"'),
  C('circle','cx="70" cy="134" r="3.8"'),C('circle','cx="86" cy="142" r="3.8"'),C('circle','cx="82" cy="128" r="3.2"'),
  C('path','d="M60 128 Q50 124 46 116 L52 112 Q56 120 64 122Z"'),
  C('path','d="M20 110 Q18 94 36 92 Q56 90 58 102 Q60 112 50 112 Q44 112 44 118 Q44 126 34 126 Q22 126 20 110Z M28 114 A4 4 0 1 0 36 114 A4 4 0 1 0 28 114Z" fill-rule="evenodd"'),
  C('circle','cx="30" cy="101" r="4.2"'),C('circle','cx="42" cy="98" r="4.2"'),C('circle','cx="52" cy="104" r="3.8"'),
  C('path','d="M60 98 Q58 74 80 70 Q100 66 108 82 Q112 98 98 110 Q80 116 66 110 Q60 106 60 98Z"'),
  C('circle','cx="70" cy="100" r="3.2"'),C('circle','cx="78" cy="107" r="2.6"'),
  C('circle','cx="93" cy="88" r="11"'),C('circle','cx="94" cy="87" r="6"'),
  C('path','d="M62 78 Q60 60 78 58 Q96 58 99 68 Q88 73 64 81Z"'),C('circle','cx="80" cy="57" r="3.2"'),
  C('path','d="M92 124 Q104 116 110 108 L117 113 Q108 126 96 132Z"'),C('circle','cx="114" cy="110" r="5"'),
  C('path','d="M111 112 L130 80 L135 83 L116 115Z"'),C('path','d="M130 80 Q132 71 139 66 Q139 75 135 83Z"')],
  deco43:dot(95,87,2.8)+hi(96.2,85.8)+dl('M97 102 Q103 106 107 100')+dot(106,92,1.3)+dl('M66 122 Q78 128 90 122',2)
   +dl('M131 79 L136 82',2)+dl('M128 40 Q136 34 146 38',1.6)};
 [BOOKWORM,CHAMELEON].forEach(P=>{try{if(!PICS.some(x=>x.g22===P.g22))PICS.push(P)}catch(e){console.log('g22 pic',e)}});
 const CNAME={bookworm:'小書蟲',chameleon:'變色龍小畫家'};
 let cNew={},cT=0;// 剛拿到的圖：這一次進來的 8 秒內都發亮（重畫也一樣）
 const _cs=SCREENS.coloring;SCREENS.coloring=function(){const fr=['bookworm','chameleon'].filter(k=>has(k)&&isFresh(k));
  if(fr.length){try{V2.c47cat='animal'}catch(e){}fr.forEach(k=>{cNew[k]=Date.now()+8000;seen(k)})}
  const r=_cs.apply(this,arguments);
  try{['bookworm','chameleon'].forEach(k=>{const i=PICS.findIndex(x=>x.g22===k);document.querySelectorAll(`.ccard[data-i="${i}"]`).forEach(b=>{if((PICS[i].n||'').length>5)b.classList.add('g22long');if(cNew[k]>Date.now())b.classList.add('g22newc')})})}catch(e){}
  try{if(fr.length){fr.forEach(k=>{const i=PICS.findIndex(x=>x.g22===k);const b=document.querySelector(`.ccard[data-i="${i}"]`);if(b)try{b.scrollIntoView({block:'nearest'})}catch(_){}});
    const tk=++cT;setTimeout(()=>{if(S.screen!=='coloring'||tk!==cT)return;sayQ(fr.map(k=>`塗色本多了${CNAME[k]}，快來塗顏色！`))},1400)}}catch(e){console.log('g22 coloring',e)}return r}}

/* ======================================================================
 * 6. 地球儀：南極的小企鵝貼紙（地球轉到看得見南極才出現；會揮手；點牠說話）
 * 地球儀本體不重組：只用 window.__gl8.proj(經度,緯度) 把貼紙放在南極半島那裡（每一幀跟著地球轉）。
 * ====================================================================== */
function pengSVG(){const u=uid('pg');return `<svg viewBox="0 0 64 74" aria-hidden="true"><defs>${lg(u+'b',[[0,'#4A5A9A'],[1,'#26305E']])}${lg(u+'i',[[0,'#FFFFFF'],[1,'#D8ECFF']])}</defs>
 <ellipse cx="32" cy="70" rx="22" ry="3" fill="#1A2A5A" opacity=".28"/>
 <path d="M10 66 Q8 56 14 52 H50 Q56 56 54 66 Q53 70 48 70 H16 Q11 70 10 66Z" fill="url(#${u}i)" stroke="#BFE0FF" stroke-width="1.4"/><path d="M16 56 H30" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>
 <g class="g22pgb"><path d="M32 8 Q48 8 50 30 Q52 50 44 58 H20 Q12 50 14 30 Q16 8 32 8Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
  <path d="M32 8 Q48 8 50 30 Q52 50 44 58 H20 Q12 50 14 30 Q16 8 32 8Z" fill="url(#${u}b)"/>
  <path d="M32 22 Q44 24 44 40 Q44 54 32 56 Q20 54 20 40 Q20 24 32 22Z" fill="#FFFFFF"/>
  <circle cx="26" cy="22" r="3.4" fill="#FFFFFF"/><circle cx="38" cy="22" r="3.4" fill="#FFFFFF"/><circle cx="26.6" cy="22.4" r="1.9" fill="#1A1E36"/><circle cx="38.6" cy="22.4" r="1.9" fill="#1A1E36"/><circle cx="27.2" cy="21.6" r=".7" fill="#fff"/><circle cx="39.2" cy="21.6" r=".7" fill="#fff"/>
  <path d="M28.6 27 L35.4 27 L32 31.4Z" fill="#FFB33A"/><ellipse cx="22.6" cy="29" rx="2.6" ry="1.6" fill="#FF9FB8" opacity=".75"/><ellipse cx="41.4" cy="29" rx="2.6" ry="1.6" fill="#FF9FB8" opacity=".75"/>
  <path d="M16 36 Q10 44 12 52 Q16 48 18 42Z" fill="#323E78"/>
  <g class="g22pgw"><path d="M48 34 Q60 26 60 16 Q54 20 47 28Z" fill="#323E78" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/></g>
  <path d="M22 58 Q20 62 25 62 Q28 62 28 58Z M36 58 Q36 62 39 62 Q44 62 42 58Z" fill="#FFB33A"/>
  <path d="M22 14 Q26 10 31 10" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".45"/></g>
 <path d="${sparkP(56,44,3.4)}" fill="#FFF6C8"/><path d="${sparkP(8,30,2.6)}" fill="#FFFFFF"/></svg>`}
const PG_LL=[-62,-74];// 南極半島附近（經度, 緯度）
function penguin8(){const st=document.getElementById('gl8st');if(!st||st.querySelector('.g22peng'))return;
 const b=document.createElement('button');b.type='button';b.className='g22peng';b.setAttribute('aria-label','南極的小企鵝');b.innerHTML=pengSVG();st.appendChild(b);
 ['pointerdown','pointermove','pointerup'].forEach(ev=>b.addEventListener(ev,e=>e.stopPropagation()));
 let shown=false;
 b.addEventListener('click',e=>{e.stopPropagation();if(+b.dataset.v<.3)return;try{hush()}catch(_){}sfx2('pop');const t='我是住在南極的小企鵝，這裡好冷喔！';
  try{const R=st.getBoundingClientRect(),q=b.getBoundingClientRect();bubbleAt(st,t,(q.left+q.width/2-R.left)/R.width*100,Math.max(2,(q.top-R.top)/R.height*100-12),3600)}catch(_){}
  b.classList.remove('g22pgt');void b.offsetWidth;b.classList.add('g22pgt');sayQ([t]);seen('penguin')});
 const loop=()=>{if(S.screen!=='globe8'||!b.isConnected)return;try{const G=window.__gl8;if(G&&G.proj&&G.VW&&G.VW.R){const p=G.proj(PG_LL[0],PG_LL[1]);const v=Math.max(0,Math.min(1,(p.z-.12)/.3));
   const w=Math.max(42,Math.min(104,G.VW.R*.3));b.style.width=w.toFixed(0)+'px';b.style.left=(p.X-w/2).toFixed(1)+'px';b.style.top=(p.Y-w*1.08).toFixed(1)+'px';b.style.opacity=v.toFixed(2);b.dataset.v=v.toFixed(2);
   b.style.pointerEvents=v>.3?'auto':'none';if(v>.6&&!shown){shown=true;b.classList.add('g22pgon');if(isFresh('penguin'))setTimeout(()=>seen('penguin'),1500)}}}catch(e){}
  requestAnimationFrame(loop)};requestAnimationFrame(loop);
 if(isFresh('penguin'))setTimeout(()=>{if(S.screen!=='globe8'||!b.isConnected||shown)return;const bub=document.getElementById('gl8bub');const t=['南極有新朋友喔！','地球轉一轉，看看最下面！'];if(bub){bub.textContent=t.join('');bub.classList.remove('off')}sayQ(t)},7000)}
if(SCREENS.globe8){const _g=SCREENS.globe8;SCREENS.globe8=function(){const r=_g.apply(this,arguments);try{if(has('penguin')&&S.screen==='globe8')setTimeout(()=>{try{if(S.screen==='globe8')penguin8()}catch(e){console.log('g22 penguin',e)}},60)}catch(e){}return r}}

/* ======================================================================
 * 7. 小小攝影師：花花相框、彩虹相機
 * 相框：拿到以後拍的照片（相簿裡照片的時間 ≥ 拿到的時間）顯示花邊；相簿可以切換有沒有相框（V2.g22x.frameOff）。照片本身不改，只是顯示時加一層。
 * ====================================================================== */
const FRAME_SVG=()=>{const fl=(x,y,r,c,cc='#FFE27A')=>[0,72,144,216,288].map(a=>`<circle cx="${N(x+r*Math.sin(a*Math.PI/180))}" cy="${N(y-r*Math.cos(a*Math.PI/180))}" r="${N(r*.78)}" fill="${c}"/>`).join('')+`<circle cx="${x}" cy="${y}" r="${N(r*.62)}" fill="${cc}"/>`;
 const lf=(x,y,a)=>`<ellipse cx="${x}" cy="${y}" rx="4.2" ry="2" fill="#6CC562" transform="rotate(${a} ${x} ${y})"/>`;
 return `<svg class="g22frs" viewBox="0 0 120 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 H120 V100 H0Z M7 7 V93 H113 V7Z" fill="#FFC9DD" fill-rule="evenodd"/><path d="M7 7 H113 V93 H7Z" fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-dasharray="3 3" opacity=".9"/>
 ${lf(16,6,30)}${lf(104,94,30)}${lf(60,3,0)}${lf(60,97,0)}${lf(3,50,90)}${lf(117,50,90)}
 ${fl(8,8,4.6,'#FF8FBE')}${fl(112,8,4.2,'#FFE27A','#FF9A2E')}${fl(8,92,4.2,'#9FD0FF')}${fl(112,92,4.6,'#FFB3D9')}
 ${fl(48,4,2.8,'#B99CFF')}${fl(74,96,2.8,'#FF8FBE')}${fl(4,30,2.6,'#FFE27A','#FF9A2E')}${fl(116,66,2.6,'#9FD0FF')}${fl(84,4,2.2,'#FFFFFF')}${fl(30,96,2.2,'#FFFFFF')}</svg>`};
const RCAM_SVG=()=>{const u=uid('rc');return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs>${lg(u+'r',[[0,'#FF7A9A'],[.2,'#FFB35C'],[.4,'#FFE07A'],[.6,'#7FE0A0'],[.8,'#7FC4FF'],[1,'#B99CFF']],1,0)}</defs>
 <rect x="8" y="18" width="48" height="34" rx="8" fill="url(#${u}r)"/><rect x="18" y="11" width="16" height="10" rx="3" fill="#FF8FB8"/><path d="M12 24 Q12 21 15 21 H30" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/>
 <circle cx="32" cy="35" r="12.4" fill="#FFFFFF"/><circle cx="32" cy="35" r="9" fill="#BFE6FF"/><circle cx="35.4" cy="31.6" r="3" fill="#fff"/><path d="${star5p(49,25,3.4)}" fill="#FFFFFF"/></svg>`};
const fTime=()=>{try{const v=G22.st().own.frame;const t=typeof v==='number'?v:Date.parse(v);return isFinite(t)?t:0}catch(e){return 0}};
const frameOn=()=>has('frame')&&!GX().frameOff;
function frameImg(img,on){if(!img||!img.parentNode)return;const w=img.parentNode.classList&&img.parentNode.classList.contains('g22fw')?img.parentNode:null;
 if(on&&!w){const s=document.createElement('span');s.className='g22fw';img.replaceWith(s);s.appendChild(img);s.insertAdjacentHTML('beforeend',FRAME_SVG())}
 else if(!on&&w){w.replaceWith(img)}}
let ph8last=-1;
function photoDeco(){if(S.screen!=='photo8'||!has('frame'))return;const on=frameOn();const scr=document.getElementById('screen');if(!scr)return;
 scr.querySelectorAll('#ph8strip .ph8slot img,.ph8pol img').forEach(im=>frameImg(im,on));
 const dev=scr.querySelector('.ph8vf .ph8dev');if(dev){const f=dev.querySelector('.g22frs');if(on&&!f)dev.insertAdjacentHTML('beforeend',FRAME_SVG());if(!on&&f)f.remove()}
 let A=null;const al=()=>{if(!A){try{A=window.__PH8.albumGet().slice().reverse()}catch(e){A=[]}}return A};const t0=fTime();
 scr.querySelectorAll('.ph8th').forEach(b=>{const p=al()[+b.dataset.j];frameImg(b.querySelector('img'),on&&!!p&&(+p.t||0)>=t0)});
 scr.querySelectorAll('.ph8big img').forEach(im=>{const p=al()[ph8last];frameImg(im,on&&!!p&&(+p.t||0)>=t0)});
 // 相簿的相框開關
 scr.querySelectorAll('.ph8all h2,.ph8end .ph8book h2').forEach(h=>{if(h.parentNode.querySelector('.g22frt'))return;const b=document.createElement('button');b.type='button';b.className='g22frt';
  const paint=()=>{const o=frameOn();b.setAttribute('aria-pressed',o?'true':'false');b.innerHTML=`<span class="g22fri g22fw"><svg viewBox="0 0 120 100" aria-hidden="true"><rect width="120" height="100" fill="#BFE6FF"/><circle cx="84" cy="34" r="12" fill="#FFD24D"/><path d="M0 72 Q40 52 72 70 Q96 60 120 70 V100 H0Z" fill="#8FD68A"/></svg>${o?FRAME_SVG():''}</span><b>${o?'花花相框：開':'花花相框：關'}</b>`};paint();
  b.onclick=e=>{e.stopPropagation();const X=GX();X.frameOff=!X.frameOff;save2();sfx2('pop');paint();photoDeco();const t=X.frameOff?'把相框拿下來囉！':'換上花花相框！';try{hush()}catch(_){}sayQ([t])};h.after(b)})}
document.addEventListener('click',e=>{try{const b=e.target.closest&&e.target.closest('.ph8th');if(b)ph8last=+b.dataset.j}catch(_){}},true);
let phMO=null;
function wrapPhoto(){if(!SCREENS.photo8||SCREENS.photo8.__g22)return !!SCREENS.photo8;const _p=SCREENS.photo8;
 SCREENS.photo8=function(){const r=_p.apply(this,arguments);try{if(S.screen!=='photo8')return r;const root=document.querySelector('.ph8');if(!root)return r;
   if(has('rcamera')){root.classList.add('g22rc');const sh=document.getElementById('ph8shut');if(sh)sh.innerHTML=RCAM_SVG()}
   if(has('frame')){if(phMO)phMO.disconnect();let q=0;phMO=new MutationObserver(()=>{if(S.screen!=='photo8'){phMO.disconnect();phMO=null;return}if(q)return;q=1;requestAnimationFrame(()=>{q=0;try{photoDeco()}catch(e){}})});
    phMO.observe(document.getElementById('screen'),{childList:true,subtree:true});photoDeco()}
   const news=[];if(isFresh('rcamera'))news.push('相機變成彩虹色了！');if(isFresh('frame'))news.push('你拍的照片會有花花相框喔！');
   if(news.length){const mc=root.querySelector('.ph8mc');if(mc&&!mc.querySelector('.g22phn')){const p=document.createElement('p');p.className='g22phn';
     p.innerHTML=`${isFresh('rcamera')?`<span>${RCAM_SVG()}</span>`:''}${isFresh('frame')?`<span class="g22fw g22fwi"><svg viewBox="0 0 120 100"><rect width="120" height="100" fill="#BFE6FF"/><circle cx="84" cy="32" r="12" fill="#FFD24D"/><path d="M0 72 Q40 52 72 70 Q96 60 120 70 V100 H0Z" fill="#8FD68A"/></svg>${FRAME_SVG()}</span>`:''}<b>${news.join('<br>')}</b>`;
     const h=mc.querySelector('.ph8mh');if(h)h.after(p);else mc.prepend(p)}
    setTimeout(()=>{if(S.screen!=='photo8')return;sayQ(news);['rcamera','frame'].forEach(seen)},1400)}}catch(e){console.log('g22 photo',e)}return r};
 SCREENS.photo8.__g22=1;return true}
if(!wrapPhoto()){let n=0;const iv=setInterval(()=>{if(wrapPhoto()||++n>60)clearInterval(iv)},250)}
/* ---------- 樣式 ---------- */
const st=document.createElement('style');st.id='g22itemscss';st.textContent=`
.g22bub{position:absolute;transform:translateX(-50%);z-index:9;background:#FFFFFF;color:#2A2266;border-radius:16px;padding:5px 12px;font-size:clamp(14px,2.2vw,20px);line-height:1.3;white-space:nowrap;max-width:calc(100% - 12px);box-sizing:border-box;overflow:hidden;text-overflow:clip;box-shadow:0 4px 12px rgba(40,30,90,.25);pointer-events:none;animation:g22bub .35s ease-out both}
@keyframes g22bub{from{opacity:0;translate:0 8px}to{opacity:1;translate:0 0}}
/* 農場：兩盆 */
.g22farm .fmfx{left:0;top:0;bottom:auto;width:0;height:0;z-index:4}
.g22drop{position:absolute;left:-4px;top:-6px;width:8px;height:12px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#8FD8FF;border:1.5px solid #4FA8E0;box-sizing:border-box;pointer-events:none}
.g22ele .g22drop{background:#BFEFFF;border-color:#7FC8F0}
.g22farm.g22f2 .fmpot{height:66%;left:36%}.g22farm.g22f2 #fmpot2{left:62%}
.g22farm.g22f2 .fmcan{left:auto;right:4%;bottom:56%;width:min(13%,100px)}
.g22farm .fmpot.g22next svg{filter:drop-shadow(0 0 6px #FFF3A0) drop-shadow(0 0 14px rgba(255,226,122,.85))}
.g22farm .fmpot.g22hi svg,.g22farm .fmcan.g22hi svg{animation:g22ihi 1.2s ease-in-out 3}
@keyframes g22ihi{50%{filter:drop-shadow(0 0 10px #FFF3A0) drop-shadow(0 0 22px rgba(255,226,122,.95))}}
.g22farm .fmcan.g22pour{transition:none}
.g22farm .fmsteps{gap:16px;flex-wrap:wrap}.g22farm .g22st{display:flex;gap:8px}.g22farm .g22st.off{display:none}
.g22farm .g22st i{width:16px;height:16px;border-radius:50%;border:2.5px solid #9BE07A;background:rgba(255,255,255,.2);box-sizing:border-box}
.g22farm .g22st i.on{background:#6CC562;border-color:#E8F8DC}.g22farm .g22st i.now{background:#FFD84A;border-color:#fff;box-shadow:0 0 10px #FFE27A}
.g22farm .dq{flex-direction:column;gap:10px}
.g22farm .fmseed.g22new{border-color:#FF8FC8;box-shadow:0 6px 0 rgba(16,10,56,.35),0 0 0 4px rgba(255,143,200,.55),0 0 18px rgba(255,226,122,.8)}
.g22farm .fmseed .g22nw{position:absolute;right:-8px;top:-10px;font-style:normal;background:#FF5F9E;color:#fff;border-radius:999px;padding:1px 8px;font-size:15px;box-shadow:0 2px 0 rgba(0,0,0,.2)}
.g22farm .fmseeds.g22hl{animation:g22hl 1s ease-in-out 2}@keyframes g22hl{50%{filter:drop-shadow(0 0 12px rgba(255,226,122,.95))}}
.g22farm .dq.g22both .fmseeds{gap:clamp(6px,1.6vw,14px)}
.g22farm .dq.g22both .fmseed{width:clamp(78px,15vw,124px);padding:6px 4px 5px;border-radius:20px}
.g22farm .dq.g22both .fmseed svg{width:clamp(40px,8vw,64px)}.g22farm .dq.g22both .fmseed b{font-size:clamp(16px,2.6vw,22px)}
.g22farm .dq.g22both .fmwater{width:clamp(110px,18vw,160px);padding:6px 6px 6px}.g22farm .dq.g22both .fmwater svg{width:clamp(54px,9vw,80px)}.g22farm .dq.g22both .fmwater b{font-size:clamp(18px,2.8vw,24px)}
.fmdone.g22two .fmbig{width:min(260px,62vw);display:flex;gap:8px}.fmdone.g22two .fmbig svg{flex:1;min-width:0}
.g22farm .fmseed b,.g22farm .fmwater b{white-space:nowrap}
@media (max-width:560px){.g22farm.g22f2 .fmpot{height:44%;left:33%}.g22farm.g22f2 #fmpot2{left:66%}.g22farm.g22f2 .fmcan{width:18%;right:3%;bottom:60%}
 .g22farm .fmseeds.g22many{flex-wrap:nowrap;gap:5px;width:100%;padding:0 6px;box-sizing:border-box}
 .g22farm .fmseeds.g22many .fmseed{flex:1 1 0;width:auto;min-width:0;max-width:88px;padding:5px 2px 4px;border-radius:16px;border-width:2.5px}
 .g22farm .fmseeds.g22many .fmseed svg{width:36px}.g22farm .fmseeds.g22many .fmseed b{font-size:14px}
 .g22farm .fmseeds.g22many .fmseed .g22nw{right:-4px;top:-10px;font-size:12px;padding:0 6px}
 .g22farm .dq.g22both .fmbtns{gap:14px}.g22farm .dq.g22both .fmwater{flex-direction:row;width:auto;gap:8px;padding:5px 18px;border-radius:22px}
 .g22farm .dq.g22both .fmwater svg{width:50px}.g22farm .dq.g22both .fmwater b{font-size:21px}.g22farm .dq.g22both .fmspeak{width:52px;height:52px}}
@media (orientation:portrait) and (max-height:700px){.g22farm .fmsteps{margin-top:6px}.g22farm .g22st i{width:13px;height:13px}.g22farm .dq{gap:6px}}
@media (orientation:landscape) and (max-height:500px){body[data-scr="farm"] .g22farm .dq .fmseeds{display:grid;grid-template-columns:repeat(2,auto);gap:6px}
 body[data-scr="farm"] .g22farm .dq .fmseeds .fmseed{width:96px;flex-direction:column;gap:0;padding:3px 4px 2px;justify-content:center;border-radius:16px}
 body[data-scr="farm"] .g22farm .dq .fmseeds .fmseed svg{width:34px}body[data-scr="farm"] .g22farm .dq .fmseeds .fmseed b{font-size:15px}
 body[data-scr="farm"] .g22farm .dq.g22both .fmbtns{flex-direction:row;gap:8px}
 body[data-scr="farm"] .g22farm .dq.g22both .fmwater{width:auto;flex-direction:row;padding:4px 12px;gap:4px}body[data-scr="farm"] .g22farm .dq.g22both .fmwater svg{width:42px}body[data-scr="farm"] .g22farm .dq.g22both .fmwater b{font-size:18px}
 body[data-scr="farm"] .g22farm .dq.g22both .fmspeak{width:46px;height:46px}
 body[data-scr="farm"] .g22farm .g22st i{width:12px;height:12px}body[data-scr="farm"] .g22farm .g22st{gap:5px}body[data-scr="farm"] .g22farm .fmsteps{gap:8px}}
/* 寵物小屋 */
.g22tun{position:absolute;z-index:2;opacity:0;transition:opacity .4s;pointer-events:none}.g22tun.on{opacity:1}.g22tun svg{width:100%;height:100%;display:block}
#pscene .pbig.g22hop svg{animation:g22hop .35s ease-in-out 2}@keyframes g22hop{50%{transform:translateY(-10%)}}
#pscene .pbig.g22chew svg{animation:g22chew .42s ease-in-out 3;transform-origin:50% 80%}@keyframes g22chew{0%,100%{transform:rotate(0)}30%{transform:rotate(-4deg) translateY(2%)}70%{transform:rotate(3deg) translateY(1%)}}
.g22pbone{position:absolute;z-index:7;pointer-events:none;animation:g22iin .4s ease-out both}.g22pbone svg{width:100%;height:auto;display:block}.g22pbone.off{animation:g22out .4s ease-in forwards}@keyframes g22out{to{opacity:0}}
.g22tooth{position:absolute;z-index:7;pointer-events:none;animation:g22tooth 1.2s ease-out both}.g22tooth svg{width:100%;height:auto;display:block}
@keyframes g22tooth{0%{opacity:0;translate:0 10px;filter:none}40%{opacity:1;translate:0 0;filter:drop-shadow(0 0 8px #FFF6C8) drop-shadow(0 0 16px rgba(255,226,122,.9))}100%{opacity:1;filter:drop-shadow(0 0 4px #FFF6C8)}}
@keyframes g22iin{from{opacity:0;translate:0 12px}to{opacity:1;translate:0 0}}
.ptitem.g22pnew{border-color:#FFE27A;box-shadow:0 0 0 3px rgba(255,226,122,.6),0 0 14px rgba(255,226,122,.7)}
/* 小小廚師 */
.ch5 .ch5opt.g22c5b{position:relative}.ch5 .g22c5n{position:absolute;right:-8px;top:-12px;width:38px;height:38px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.2))}.ch5 .g22c5n svg{width:100%;height:100%}
.ch5 .g22c5n i{position:absolute;left:-14px;top:-4px;font-style:normal;background:#FF5F9E;color:#fff;border-radius:999px;padding:0 6px;font-size:13px}
/* 房間 */
.rscene2 .rtoy.g22tall{left:63%;width:10.5%}
.g22rfx{position:absolute;pointer-events:none;z-index:7}.g22rfx svg{width:100%;height:auto;display:block}
.g22mark{animation:g22mark 1s cubic-bezier(.3,1.2,.5,1) forwards}@keyframes g22mark{from{transform:translateY(0)}to{transform:translateY(var(--to))}}
.g22line{height:0;border-top:3px dashed #FF8FB8;opacity:0;animation:g22fade .4s ease-out .9s forwards}@keyframes g22fade{to{opacity:.9}}
.rscene2 .rtoy.g22nod .g22ghead{animation:g22nod .6s ease-in-out 2;transform-origin:28px -2px;transform-box:view-box}@keyframes g22nod{50%{transform:rotate(-8deg)}}
.rscene2 .rtoy.g22swing .g22marm{animation:g22swing 1s ease-in-out 3;transform-box:view-box}@keyframes g22swing{25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}
.rscene2 .rtoy .g22mst{animation:g22mst 3s ease-in-out infinite;transform-box:view-box}@keyframes g22mst{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
.rscene2 .rtoy.g22glow2 svg{animation:g22ihi 1s ease-in-out 2}
.g22twk{animation:g22tw 1s ease-in-out both}@keyframes g22tw{0%,100%{opacity:0}50%{opacity:1}}
.g22paws i{position:absolute;width:3.4%;aspect-ratio:1;transform:translate(-50%,-50%) rotate(var(--a)) scaleY(.6);opacity:0}.g22paws i svg{width:100%;height:100%;display:block}
.g22paws i.lit{animation:g22paw 1.6s ease-out forwards}@keyframes g22paw{0%{opacity:0}20%{opacity:1;filter:drop-shadow(0 0 4px #FFF3A0)}100%{opacity:0}}
.g22sky{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:0;transition:opacity .6s}.g22sky.on{opacity:1}
.g22sky b{position:absolute;aspect-ratio:1;translate:-50% -50%;opacity:0}.g22sky b svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 3px rgba(255,246,200,.9))}
.g22sky.on b{animation:g22fly 1.1s ease-out var(--d) both,g22tw2 var(--t) ease-in-out calc(var(--d) + 1.1s) infinite}
@keyframes g22fly{from{opacity:0;transform:translate(var(--dx),var(--dy))}to{opacity:1;transform:translate(0,0)}}
@keyframes g22tw2{0%,100%{opacity:1;transform:translate(0,0)}50%{opacity:.45;transform:translate(0,-3px)}}
.g22sky .g22glow{position:absolute;width:16%;aspect-ratio:1;translate:-50% -50%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,246,200,.75),rgba(255,226,122,.25) 55%,rgba(255,226,122,0))}
/* 塗色本 */
.ccard.g22long b{font-size:.86em;letter-spacing:-.04em;white-space:nowrap}
.ccard.g22newc{box-shadow:0 0 0 4px #FFE27A,0 0 20px rgba(255,226,122,.9)!important}
/* 地球儀 */
.g22peng{position:absolute;z-index:3;padding:0;border:0;background:none;opacity:0;cursor:pointer;transition:opacity .25s}.g22peng svg{width:100%;height:auto;display:block;overflow:visible}
.g22peng .g22pgw{transform-origin:48px 32px;transform-box:view-box;animation:g22wave 1.4s ease-in-out infinite}@keyframes g22wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-26deg)}}
.g22peng .g22pgb{animation:g22ibob 2.4s ease-in-out infinite;transform-box:view-box}@keyframes g22ibob{50%{transform:translateY(-2px)}}
.g22peng.g22pgt .g22pgb{animation:g22pgt .5s ease-in-out 2}@keyframes g22pgt{50%{transform:translateY(-6px) rotate(-4deg)}}
.g22peng.g22pgon svg{filter:drop-shadow(0 0 6px rgba(255,246,200,.85))}
/* 小小攝影師 */
.overlay.ph8ov{z-index:8}
.g22fw{position:relative;display:block;width:100%}.ph8slot .g22fw{height:100%}.g22fw>img{display:block}
.g22fw>.g22frs{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.ph8vf .ph8dev>.g22frs{position:absolute;inset:0;width:100%;height:100%}
.g22frt{display:inline-flex;align-items:center;gap:6px;margin:0 auto 8px;border:2px solid #FFC9DD;background:#FFF5FA;color:#B3305E;border-radius:999px;padding:3px 12px 3px 4px;font:inherit;font-size:16px;cursor:pointer;min-height:44px}
.g22frt[aria-pressed="false"]{border-color:#D8D0E8;background:#F6F4FA;color:#6A5A8A}.g22frt[aria-pressed="false"] .g22fri{opacity:.4;filter:grayscale(.6)}
.g22frt .g22fri{width:42px;height:35px;display:block}.g22frt .g22fri svg{width:100%;height:100%;display:block}.g22frt b{font-weight:400}
.ph8all .g22frt,.ph8end .g22frt{display:flex;width:max-content}
.g22phn{display:flex;align-items:center;gap:8px;margin:8px 0 2px;padding:6px 10px;border-radius:14px;background:#FFF6FB;color:#B3305E;font-size:15px}.g22phn>span{width:52px;flex:none;display:block}.g22phn>span svg{width:100%;height:auto;display:block}.g22phn b{font-weight:400}
.g22fwi{position:relative}.g22fwi>svg:first-child{display:block}
.ph8.g22rc .ph8shut{border:6px solid transparent;background:radial-gradient(circle at 40% 35%,#FFFFFF,#FFE8F4) padding-box,conic-gradient(from 200deg,#FF7A9A,#FFB35C,#FFE07A,#7FE0A0,#7FC4FF,#B99CFF,#FF7A9A) border-box;box-shadow:0 5px 0 #8A6AC8,0 8px 16px rgba(0,0,0,.25)}
.ph8.g22rc .ph8shut:active{box-shadow:0 2px 0 #8A6AC8}
.ph8.g22rc .ph8vf .c1{border-color:#FF7A9A}.ph8.g22rc .ph8vf .c2{border-color:#FFD24D}.ph8.g22rc .ph8vf .c3{border-color:#7FE0A0}.ph8.g22rc .ph8vf .c4{border-color:#9FB8FF}
.ph8.g22rc .ph8vf{box-shadow:0 0 0 2px rgba(255,236,250,.7),0 0 0 9999px rgba(20,16,50,.16)}
@media (prefers-reduced-motion:reduce){.g22sky.on b,.g22peng .g22pgw,.g22peng .g22pgb,.rscene2 .rtoy .g22mst,.g22mark,.g22tooth,.g22pbone,#pscene .pbig.g22chew svg,#pscene .pbig.g22hop svg{animation:none!important;opacity:1}}
body.lite .g22sky.on b{animation:g22fly 1.1s ease-out var(--d) both}body.lite .rscene2 .rtoy .g22mst{animation:none}
`;document.head.appendChild(st);
// 作品集：還沒拿到的禮物塗色圖（小書蟲、變色龍）不要列出來（塗色本裡也看不到）
try{if(typeof paintItems==='function'){const _pi=paintItems;paintItems=function(){const r=_pi.apply(this,arguments);try{return r.filter(x=>{const i=+String(x.k||'').replace('pc_','');const p=PICS[i];return !(p&&p.g22&&!has(p.g22))})}catch(e){return r}}}}catch(e){console.log('g22 paintItems',e)}
window.__g22i={has,isFresh,seen,fmSync,ptSync,rmSync,starSky,penguin8,photoDeco,tulipPlant,morningPlant,eleCan,RTOYART,CHEF,PICON,pengSVG,FRAME_SVG,RCAM_SVG,tunnelSide,ver:'2026-11-27'};
}catch(e){console.log('m9ze_g22items',e)}}).toString()+')()')})();

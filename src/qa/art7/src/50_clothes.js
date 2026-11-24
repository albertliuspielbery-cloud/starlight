
/* ===================== 3. 衣服（公主、王子都合身；接法照 chars31.js／第六季 S36） =====================
 * 公主：DRESS（idol.s41＝'smock'／'guide'）＋ PAT（裙子花紋，i===0 畫整片）＋ JK（上衣外層，IDOL.jacket 掛勾）＋ BOOT（IDOL.boots）＋ HAT（idol.hat，wrapPrincess 畫在頭上）
 *       小導遊背包裝：背包本體畫在身體後面（wrapPrincess 插在 <g class="breathe"> 前面），前面是肩帶、胸扣、地圖袋
 * 王子：BOY（BFIT 參數，s41.t）＋ BJ（身體，IDOL.boyJacket）＋ BS（手臂，IDOL.boySleeve）＋ 貝雷帽、背包（wrapBoy）
 * 鍵名照內容同事的獎品表：第 41 章 back 格「bag41 小導遊背包」；第 43 章 dress43／b_paint43「小畫家罩衫」＋ head 格「beret43 貝雷帽」
 * 貝雷帽、小背包都是單獨的配件：wrapPrincess／wrapBoy 看 look.head==='beret43'、look.back==='bag41' 畫上去（背包本體在身體後面，前面畫肩帶、胸扣、地圖袋） */
const mirror7=s=>`<g transform="translate(120 0) scale(-1 1)">${s}</g>`;
const longSleeve7=(col,edge,cuff,hi)=>{const sl=d=>`<path d="${d}" stroke="${edge}" stroke-width="9.6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="8.2" fill="none" stroke-linecap="round"/>`;
 return sl('M41 85 Q34.4 99 37 107.4')+sl('M79 85 Q85.8 99 84 107.4')
  +`<path d="M37.4 90.4 Q34.6 98 35.6 104 M82.6 90.4 Q85.6 98 84.8 104" stroke="${hi||'#FFFFFF'}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".9"/>`
  +`<path d="M31.6 104.6 Q37 102.6 42.4 104.6 L42 109 Q37 107.4 32 109Z M78.6 104.6 Q84 102.6 89.4 104.6 L89 109 Q84 107.4 79 109Z" fill="${cuff}" stroke="${edge}" stroke-width=".6"/>`};
// 顏料點點（每一點都是不規則的小水滴形）
const blob=(x,y,r,c,a=0)=>`<path d="M${n(x)} ${n(y-r)} Q${n(x+r*1.1)} ${n(y-r*.9)} ${n(x+r)} ${n(y+r*.1)} Q${n(x+r*.8)} ${n(y+r)} ${n(x-r*.1)} ${n(y+r*.9)} Q${n(x-r*1.2)} ${n(y+r*.6)} ${n(x-r)} ${n(y-r*.2)} Q${n(x-r*.8)} ${n(y-r*1.1)} ${n(x)} ${n(y-r)}Z" fill="${c}" transform="rotate(${a} ${n(x)} ${n(y)})"/>`;
const PAINT=['#FF6F6F','#FFCB4D','#4FC4AE','#5A9AF0','#B89CFF','#FF9AC8'];
const brushes=(x,y)=>[['#FF6F6F',-3],['#FFCB4D',0],['#5A9AF0',3]].map(([c,dx],k)=>`<g transform="rotate(${-12+k*10} ${x+dx} ${y})"><rect x="${n(x+dx-.8)}" y="${n(y-9+k)}" width="1.6" height="9" rx=".8" fill="#C8925A"/><rect x="${n(x+dx-1)}" y="${n(y-11+k)}" width="2" height="2.4" fill="#C8CCDA"/><path d="M${n(x+dx-1)} ${n(y-11+k)} Q${n(x+dx)} ${n(y-15.4+k)} ${n(x+dx+1)} ${n(y-11+k)}Z" fill="${c}"/></g>`).join('');
S41.DRESS={
 // 43 小畫家罩衫：天空藍的長袖罩衫（短洋裝長度）、大白圓領＋珊瑚粉大蝴蝶結、胸前口袋插三支畫筆、身上一點一點的顏料、白襪子＋酒紅娃娃鞋（貝雷帽是另外的頭飾 beret43）
 dress43:{shape:'short',c:'#9ED4EE',l:'#E4F5FC',dk:'#5E9ECC',pat:'s41paint',pc:'#FFFFFF',idol:{s41:'smock',sl:'#A8DAF0',se:'#6AAED6',bw:'#FF7A7A',sk:'#FFFFFF',sh:'#9A3A4A'}}};
S41.DRESS_NAME={dress43:'小畫家罩衫'};
S41.HEAD={beret43:{c:'#E8505A',name:'貝雷帽'}};
S41.BACK={bag41:{bp:'#4FC4AE',bpd:'#2E9A86',bpk:'#FFCB4D',name:'小導遊背包'}};
S41.PAT={
 s41paint:(x,y,c,i)=>{if(i!==0)return '';let o='';const r=rng(4501);
  for(let k=0;k<16;k++){const xx=32+r()*56,yy=104+r()*28;o+=blob(xx,yy,1.2+r()*1.6,PAINT[k%6],Math.round(r()*180))}
  // 裙子上的大口袋（裡面一支鉛筆）＋裙擺的白色滾邊
  o+=`<path d="M64 112 H76 V121 Q76 124 73 124 H67 Q64 124 64 121Z" fill="#E4F5FC" stroke="#5E9ECC" stroke-width=".7"/><path d="M64 114.6 H76" stroke="#5E9ECC" stroke-width=".6"/><g transform="rotate(14 70 112)"><rect x="69" y="104" width="2.4" height="10" fill="#FFCB4D"/><path d="M69 104 L70.2 101.4 L71.4 104Z" fill="#F6D6A8"/></g>`;
  o+=`<path d="M30 133.4 Q60 143.6 90 133.4" stroke="#FFFFFF" stroke-width="2.2" fill="none" opacity=".9"/>`;
  return o},
 s41guide:(x,y,c,i)=>{if(i!==0)return '';let o='';
  // 小地圖圖釘花紋（白色、黃色）＋裙擺一條虛線（像地圖上的路線）
  for(let k=0;k<12;k++){const xx=34+((k*23)%52),yy=106+((k*13)%24);o+=k%3===0?`<path d="M${xx} ${yy+3} Q${xx-2.4} ${yy} ${xx-2.4} ${yy-1} A2.4 2.4 0 1 1 ${xx+2.4} ${yy-1} Q${xx+2.4} ${yy} ${xx} ${yy+3}Z" fill="#FFFFFF" opacity=".9"/><circle cx="${xx}" cy="${yy-1}" r=".9" fill="#E8744A"/>`:`<path d="${star5(xx,yy,1.6)}" fill="#FFE9A8" opacity=".9"/>`}
  o+=`<path d="M32 129 Q46 124 60 130 T88 128" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="2.4 1.8" fill="none" opacity=".9"/>`;
  return o}};
// 大圓領＋大蝴蝶結
const artCollar=(bw,y0=77.6)=>`<path d="M49.4 ${y0} Q54 ${y0-1.2} 60 ${y0+2.6} Q57 ${y0+9.4} 51 ${y0+8} Q46.6 ${y0+5.4} 49.4 ${y0}Z" fill="#FFFFFF" stroke="#C8D4E2" stroke-width=".7"/><path d="M70.6 ${y0} Q66 ${y0-1.2} 60 ${y0+2.6} Q63 ${y0+9.4} 69 ${y0+8} Q73.4 ${y0+5.4} 70.6 ${y0}Z" fill="#FFFFFF" stroke="#C8D4E2" stroke-width=".7"/>`
 +`<path d="M58.6 ${y0+5.6} L55 ${y0+17} L57.6 ${y0+15.4} L59.4 ${y0+17.6}Z M61.4 ${y0+5.6} L65 ${y0+17} L62.4 ${y0+15.4} L60.6 ${y0+17.6}Z" fill="${mixc(bw,'#000000',.08)}"/>`
 +`<path d="M60 ${y0+5} Q50 ${y0-1.4} 48.6 ${y0+5.4} Q50 ${y0+11} 60 ${y0+5}Z M60 ${y0+5} Q70 ${y0-1.4} 71.4 ${y0+5.4} Q70 ${y0+11} 60 ${y0+5}Z" fill="${bw}" stroke="${mixc(bw,'#000000',.2)}" stroke-width=".6"/>`
 +`<path d="M51 ${y0+3.6} Q54 ${y0+2.2} 57 ${y0+4}" stroke="#FFFFFF" stroke-width=".9" fill="none" opacity=".6" stroke-linecap="round"/><ellipse cx="60" cy="${y0+5}" rx="2.2" ry="2.6" fill="${mixc(bw,'#000000',.15)}"/>`;
// 背包肩帶＋胸扣＋地圖袋（公主、王子共用；y0 肩膀的高度）
const guideFront=(J,y0,yb,lx=48.4,rx=71.6)=>{const st=J.bp,sd=J.bpd;
 return `<path d="M${lx} ${y0} Q${lx-2.2} ${(y0+yb)/2} ${lx-1} ${yb}" stroke="${sd}" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M${lx} ${y0} Q${lx-2.2} ${(y0+yb)/2} ${lx-1} ${yb}" stroke="${st}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
 +`<path d="M${rx} ${y0} Q${rx+2.2} ${(y0+yb)/2} ${rx+1} ${yb}" stroke="${sd}" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M${rx} ${y0} Q${rx+2.2} ${(y0+yb)/2} ${rx+1} ${yb}" stroke="${st}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
 +`<path d="M${lx-1.4} ${n(y0+(yb-y0)*.42)} H${rx+1.4}" stroke="${sd}" stroke-width="1.6"/><rect x="57.4" y="${n(y0+(yb-y0)*.42-2.2)}" width="5.2" height="4.4" rx="1" fill="${J.bpk}" stroke="#C8962A" stroke-width=".5"/>`
 +`<path d="M${rx-.6} ${n(y0+(yb-y0)*.7)} h2.4" stroke="#FFFFFF" stroke-width="1.2"/><path d="M${lx-1.4} ${n(y0+(yb-y0)*.7)} h2.4" stroke="#FFFFFF" stroke-width="1.2"/>`};
const mapPouch=(x,y,from)=>`<path d="${from} Q${x-2} ${y-10} ${x} ${y-6}" stroke="#FF8A80" stroke-width=".9" fill="none"/><g transform="rotate(-6 ${x} ${y})"><rect x="${x-6}" y="${y-6}" width="12" height="11" rx="1.4" fill="#E8F6FF" stroke="#9AC8E8" stroke-width=".7"/><rect x="${x-4.6}" y="${y-4.2}" width="9.2" height="7.6" fill="#E6F4D4"/><path d="M${x-4} ${y+2} Q${x-1} ${y-3} ${x+1} ${y} T${x+4} ${y-3}" stroke="#FF8A80" stroke-width=".8" fill="none" stroke-dasharray="1.2 .8"/><circle cx="${x+3.2}" cy="${y-2.8}" r="1" fill="#FFCB4D"/><path d="M${x-6} ${y-3.6} H${x+6}" stroke="#9AC8E8" stroke-width=".6"/></g>`;
const polo=(c,e,y0)=>`<path d="M51 ${y0} L60 ${y0+5} L56 ${y0+8.6} Z M69 ${y0} L60 ${y0+5} L64 ${y0+8.6}Z" fill="#FFFFFF" stroke="${e}" stroke-width=".6"/><path d="M60 ${y0+5} V${y0+12}" stroke="${e}" stroke-width=".7"/><circle cx="60" cy="${y0+8}" r=".8" fill="${e}"/><circle cx="60" cy="${y0+11}" r=".8" fill="${e}"/>`;
S41.JK={
 smock:(g,D,J)=>{let o=longSleeve7(J.sl,J.se,'#FFFFFF','#FFFFFF');
  // 上身的顏料點點、胸前口袋插畫筆
  const r=rng(4502);for(let k=0;k<6;k++)o+=blob(47+r()*26,86+r()*12,1+r()*1.1,PAINT[(k+2)%6],Math.round(r()*180));
  o+=brushes(51,90)+`<path d="M46.6 89 H55.6 V95 Q55.6 97.4 53.2 97.4 H49 Q46.6 97.4 46.6 95Z" fill="#E4F5FC" stroke="${J.se}" stroke-width=".7"/><path d="M46.6 90.6 H55.6" stroke="${J.se}" stroke-width=".5"/>`;
  o+=artCollar(J.bw);
  return o},
 guide:(g,D,J)=>{let o=polo(D.c,D.dk,77);
  o+=guideFront(J,79,101);
  o+=mapPouch(67,94,'M54 79');
  o+=`<path d="${star5(51.6,86,1.8)}" fill="#FFFFFF"/>`;
  return o}};
S41.BOOT={
 smock:J=>{const fy=166,sh=J.sh;return [52,66].map(x=>`<path d="M${x-4} ${fy-16} H${x+4} V${fy-3} H${x-4}Z" fill="${J.sk}" stroke="#D8DEEA" stroke-width=".6"/><path d="M${x-4} ${fy-14} H${x+4}" stroke="#9ED4EE" stroke-width="1.2"/>`
  +`<path d="M${x-4.6} ${fy-3.6} H${x+3.6} Q${x+9.2} ${fy-3.6} ${x+9.2} ${fy+.8} Q${x+9.2} ${fy+3.2} ${x+6.6} ${fy+3.2} H${x-4.4} Q${x-5.4} ${fy+3.2} ${x-5.2} ${fy}Z" fill="${sh}"/><path d="M${x-3.6} ${fy-3.2} L${x+5} ${fy-5.4}" stroke="${sh}" stroke-width="1.4"/><circle cx="${x+4.6}" cy="${fy-4.6}" r=".8" fill="#FFD24D"/><path d="M${x-2} ${fy-2.4} Q${x+1} ${fy-3.2} ${x+4} ${fy-2.6}" stroke="#FFFFFF" stroke-width=".7" opacity=".5" fill="none"/>`).join('')},
 guide:J=>{const fy=166;return [52,66].map(x=>`<path d="M${x-4.6} ${fy-6} H${x+3} Q${x+9.4} ${fy-5} ${x+9.4} ${fy+.6} Q${x+9.4} ${fy+3.2} ${x+6.8} ${fy+3.2} H${x-4.6} Q${x-5.6} ${fy+3.2} ${x-5.4} ${fy}Z" fill="${J.sh}" stroke="#D2D8E4" stroke-width=".7"/><path d="M${x-5.4} ${fy+1.4} H${x+9.4}" stroke="${J.she}" stroke-width="1.6"/><path d="M${x-2} ${fy-4} l3 1.2 M${x-2} ${fy-1.8} l3 1.2" stroke="${J.she}" stroke-width=".8"/>`).join('')}};
// 貝雷帽（公主 120×172；歪歪地戴在頭頂；小小的帽尾＋一支畫筆胸針）
S41.HAT={
 beret:(c='#E8505A',dy=0)=>{const g=uid('br');return `<g class="s41hat" transform="translate(0 ${dy})"><defs>${rg(g,[[0,mixc(c,'#FFFFFF',.35)],[.6,c],[1,mixc(c,'#000000',.22)]],.35,.25,.9)}</defs>
  <path d="M32.6 26 Q29 11 55 7.6 Q85 5.4 90.6 19.6 Q91.6 27.6 80 28 L40 28.6 Q33.4 28.6 32.6 26Z" fill="url(#${g})"/>
  <path d="M36.6 25.6 Q60 31.2 83.6 25.4 L83.8 29.4 Q60 35.4 36.4 29.6Z" fill="${mixc(c,'#000000',.25)}"/>
  <path d="M57.4 7.8 Q57 3 60.6 3.4 Q63 4.4 61.2 8Z" fill="${mixc(c,'#000000',.15)}"/>
  <path d="M41 16 Q50 10 62 9.6" stroke="#FFFFFF" stroke-width="1.8" fill="none" opacity=".45" stroke-linecap="round"/>
  <g transform="rotate(-30 80 22)"><rect x="79" y="14" width="2" height="10" rx="1" fill="#C8925A"/><rect x="78.8" y="12" width="2.4" height="2.4" fill="#C8CCDA"/><path d="M78.8 12 Q80 7.6 81.2 12Z" fill="#FFCB4D"/></g>
  ${blob(46,20,1.6,'#FFCB4D',20)}${blob(68,13,1.3,'#4FC4AE',60)}</g>`}};
S41.BOY={
 // 43 小畫家罩衫：天空藍罩衫、大白圓領＋珊瑚粉蝴蝶結、胸前口袋插畫筆、顏料點點、捲起來的白袖口、深藍褲子、咖啡色鞋子
 b_paint43:{n:'小畫家罩衫',k:'jacket',c:'#9ED4EE',l:'#E4F5FC',p:'#4A5A8A',s:'#8A4A3A',s41:{t:'smock',bw:'#FF7A7A',se:'#5E9ECC'},chapter:43}};
S41.BJ={
 smock:(g,F,J)=>{let o='';const r=rng(4503);for(let k=0;k<9;k++)o+=blob(44+r()*32,90+r()*30,1+r()*1.2,PAINT[k%6],Math.round(r()*180));
  o+=`<path d="M44 92 H55 V99.4 Q55 102 52.4 102 H46.6 Q44 102 44 99.4Z" fill="#E4F5FC" stroke="${J.se}" stroke-width=".7"/><path d="M44 94 H55" stroke="${J.se}" stroke-width=".5"/>`+brushes(49.4,93.4);
  o+=`<path d="M40.6 116 Q60 121 79.4 116" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".8"/>`;
  return o+artCollar(J.bw,76.4)},
 guide:(g,F,J)=>polo(F.c,mixc(F.c,'#000000',.2),76)+guideFront(J,78,112,47,73)+mapPouch(66,98,'M54 78')+`<path d="M40 108 Q60 112 80 108" stroke="${mixc(F.c,'#000000',.12)}" stroke-width=".8" fill="none" opacity=".6"/>`};
S41.BS={
 smock:J=>`<path d="M30.4 110.6 Q35 108.6 39.6 110.6 L39.2 115.4 Q35 113.6 30.8 115.4Z M80.4 110.6 Q85 108.6 89.6 110.6 L89.2 115.4 Q85 113.6 80.8 115.4Z" fill="#FFFFFF" stroke="${J.se}" stroke-width=".6"/>`,
 guide:J=>''};
// 背包本體（畫在身體後面）
const packBack=(J,x0,y0,w,h)=>`<g class="s41pack"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${n(w*.22)}" fill="${J.bp}" stroke="${J.bpd}" stroke-width=".8"/><path d="M${x0+w*.3} ${y0} Q${x0+w/2} ${y0-7} ${x0+w*.7} ${y0}" stroke="${J.bpd}" stroke-width="2" fill="none"/><rect x="${n(x0+w*.04)}" y="${n(y0+h*.5)}" width="${n(w*.92)}" height="${n(h*.38)}" rx="${n(w*.12)}" fill="${J.bpk}" stroke="#E0A020" stroke-width=".7"/><path d="${star5(x0+w*.82,y0+h*.68,2.4)}" fill="#FFFFFF"/></g>`;
// 頭飾、背包：插進主角的圖裡（一般版放在最外層 </g> 前；關節版 RIG 放進頭那一段）
const insTop=(s,add)=>{let i=s.lastIndexOf('</g>');const secs=s.match(/data-rs="([a-z]+)"/g);if(secs&&secs[secs.length-1]==='data-rs="head"')i=s.lastIndexOf('</g>',i-1);return i>0?s.slice(0,i)+add+s.slice(i):s};
const insBody=(s,add)=>{// 肩帶：關節版放進身體那一段（跟著身體動）；一般版放在頭的前面一層
 const m=/data-rs="(body|tor)"/.exec(s);if(m){const j=s.indexOf('>',m.index)+1;return s.slice(0,j)+add+s.slice(j)}return insTop(s,add)};
const insBack=(s,add)=>{const k=s.indexOf('<g class="breathe">');return k>0?s.slice(0,k)+add+s.slice(k):s};
S41.wrapPrincess=fn=>function(look,a,vb){if(!look||(look.head!=='beret43'&&look.back!=='bag41'))return fn.apply(this,arguments);
 let s=fn.apply(this,arguments);   // 不把 head／back 清掉：遊戲本身認不得這兩個 id 就不畫，記下來的 look（跳舞骨架用）才會帶著貝雷帽、背包
 if(look.back==='bag41'){const J=S41.BACK.bag41;s=insBack(s,packBack(J,36,76,48,36));s=insBody(s,guideFront(J,79,101)+mapPouch(67,94,'M54 79'))}
 if(look.head==='beret43')s=insTop(s,S41.HAT.beret(S41.HEAD.beret43.c));
 return s};
S41.wrapBoy=fn=>function(look,a,vb){if(!look||(look.head!=='beret43'&&look.back!=='bag41'))return fn.apply(this,arguments);
 let s=fn.apply(this,arguments);   // 不把 head／back 清掉：遊戲本身認不得這兩個 id 就不畫，記下來的 look（跳舞骨架用）才會帶著貝雷帽、背包
 if(look.back==='bag41'){const J=S41.BACK.bag41;s=insBack(s,packBack(J,34,80,52,40));s=insBody(s,guideFront(J,78,112,47,73)+mapPouch(66,98,'M54 78'))}
 if(look.head==='beret43')s=insTop(s,S41.HAT.beret(S41.HEAD.beret43.c,3));
 return s};
// 換裝間的小圖示（頭飾格、背後格）
S41.ICON={get beret43(){return `<svg viewBox="26 0 68 36" aria-hidden="true">${S41.HAT.beret(S41.HEAD.beret43.c)}</svg>`},get bag41(){return `<svg viewBox="28 64 64 56" aria-hidden="true">${packBack(S41.BACK.bag41,36,76,48,36)}</svg>`}};


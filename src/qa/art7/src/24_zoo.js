
/* ===================== 44 動物園一日遊（虛構的城市動物園：地圖看板、步道、指示牌、大象區、長頸鹿區、服務台；沒有字） ===================== */
// 動物園的大象（四隻腳站著；k＝1 寶寶）。x,y＝腳底中心；s 大小；f＝-1 面向左
// 名稱給攝影師同事共用：S41.ZOO.elephant(x,y,s,o)、S41.ZOO.giraffe(x,y,s,o)
function zooElephant(x,y,s,o={}){const g=uid('ze');const f=o.f||1,b=o.baby?1:0;const c1=b?'#B8C4DA':'#A9B6CE',c2=b?'#8E9CB8':'#8090AE',c3='#C8D2E4';
 const body=`<defs>${rg(g,[[0,c3],[.6,c1],[1,c2]],.4,.3,.8)}${gl(g+'e',c1,c2)}</defs>
 ${shd(0,0,62,7,.18)}
 <path d="M-34 -6 V-40 M-14 -4 V-38 M22 -4 V-38 M40 -6 V-40" stroke="${c2}" stroke-width="18" stroke-linecap="round"/>
 <path d="M-34 -6 V-40 M22 -4 V-38" stroke="${c2}" stroke-width="16" stroke-linecap="round" opacity=".6"/>
 <path d="M-14 -4 V-36 M40 -6 V-38" stroke="${c1}" stroke-width="15" stroke-linecap="round"/>
 ${[-14,40].map(x=>`<path d="M${x-6} -2 h4 M${x-1} -1 h3 M${x+4} -2 h3" stroke="#F2EEE6" stroke-width="2.2" stroke-linecap="round"/>`).join('')}
 <path d="M-52 -60 Q-58 -94 -20 -98 Q20 -102 46 -88 Q62 -78 58 -54 Q54 -30 20 -28 H-30 Q-52 -30 -52 -60Z" fill="url(#${g})"/>
 <path d="M-52 -58 Q-58 -50 -62 -40" stroke="${c2}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-62 -40 l-3 4" stroke="${c2}" stroke-width="3" stroke-linecap="round"/>
 <path d="M-30 -40 Q0 -34 34 -42" stroke="${c2}" stroke-width="2" fill="none" opacity=".5"/>
 <g transform="translate(52 -66)">
  <path d="M-6 -22 Q-30 -26 -34 2 Q-30 26 -8 22 Q2 12 -2 -6Z" fill="url(#${g}e)"/><path d="M-10 -16 Q-26 -16 -28 2 Q-24 18 -10 16Z" fill="#E8B8C8" opacity=".75"/>
  <ellipse cx="14" cy="-6" rx="28" ry="26" fill="url(#${g})"/>
  <path d="M32 2 Q44 18 40 40 Q38 50 46 54" stroke="${c1}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M32 2 Q44 18 40 40 Q38 50 46 54" stroke="${c3}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5" transform="translate(-3 0)"/>
  ${[14,22,30].map(y=>`<path d="M${36+y*.1} ${y} q6 -1 9 2" stroke="${c2}" stroke-width="1.4" fill="none"/>`).join('')}
  ${b?'':`<path d="M26 10 Q34 22 30 30" stroke="#FFFBF0" stroke-width="5" fill="none" stroke-linecap="round"/>`}
  <g class="blink" style="transform-origin:${n(x+f*(52*s+22*s))}px ${n(y-74*s)}px"><ellipse cx="22" cy="-8" rx="4" ry="5" fill="#2A2438"/><circle cx="23.4" cy="-10" r="1.6" fill="#FFFFFF"/></g>
  <circle cx="22" cy="4" r="5" fill="#FFB0C0" opacity=".55"/><path d="M14 -20 Q20 -24 28 -20" stroke="${c2}" stroke-width="1.6" fill="none" opacity=".7"/>
 </g>`;
 return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(f*s*(b?.55:1))} ${n(s*(b?.55:1))})">${body}</g>`}
function zooGiraffe(x,y,s,o={}){const g=uid('zg');const f=o.f||1,b=o.baby?1:0,eat=o.eat;
 const c1='#F6C460',c2='#E0A040',sp='#C8783A';
 const body=`<defs>${rg(g,[[0,'#FFE2A0'],[.6,c1],[1,c2]],.4,.3,.8)}${gl(g+'n',c1,c2,1,0)}</defs>
 ${shd(0,0,46,6,.18)}
 <path d="M-30 -4 L-28 -62 M-14 -2 L-14 -60 M18 -2 L20 -60 M32 -4 L30 -62" stroke="${c2}" stroke-width="9" stroke-linecap="round"/>
 <path d="M-14 -2 L-14 -60 M32 -4 L30 -62" stroke="${c1}" stroke-width="8" stroke-linecap="round"/>
 ${[-30,-14,18,32].map(x=>`<rect x="${x-5}" y="-6" width="10" height="6" rx="2" fill="#7A4A2A"/>`).join('')}
 <path d="M-40 -84 Q-42 -60 -24 -56 H30 Q46 -58 44 -80 Q40 -98 10 -98 H-20 Q-40 -98 -40 -84Z" fill="url(#${g})"/>
 <path d="M-40 -80 Q-52 -70 -50 -50" stroke="${c2}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-52 -50 l-1 6 l4 -2Z" fill="#7A4A2A"/>
 ${[[-24,-84,8],[-6,-72,7],[14,-86,8],[30,-72,6],[-30,-66,5],[6,-62,5]].map(([cx,cy,r])=>`<path d="M${cx-r} ${cy} L${cx-r*.4} ${cy-r} L${cx+r*.6} ${cy-r*.9} L${cx+r} ${cy} L${cx+r*.3} ${cy+r*.8} L${cx-r*.6} ${cy+r*.7}Z" fill="${sp}" opacity=".85"/>`).join('')}
 <g transform="translate(30 -92) rotate(${eat?40:-10})">
  <path d="M-8 4 L4 -96 L18 -92 L12 6Z" fill="url(#${g}n)"/>
  <path d="M4 -96 L-4 0" stroke="#9A5A2A" stroke-width="4" stroke-dasharray="3 3" opacity=".8"/>
  ${[[6,-20],[10,-46],[6,-70],[12,-80]].map(([cx,cy])=>`<path d="M${cx-4} ${cy} l3 -5 l5 1 l1 5 l-4 4Z" fill="${sp}" opacity=".85"/>`).join('')}
  <g transform="translate(14 -100) rotate(${eat?-30:10})">
   <path d="M-2 -16 V-26 M10 -16 V-26" stroke="${c2}" stroke-width="3" stroke-linecap="round"/><circle cx="-2" cy="-27" r="3" fill="#7A4A2A"/><circle cx="10" cy="-27" r="3" fill="#7A4A2A"/>
   <path d="M-10 -10 Q-20 -16 -20 -8 Q-16 -4 -8 -6Z M20 -10 Q30 -16 30 -8 Q26 -4 18 -6Z" fill="${c1}"/>
   <ellipse cx="4" cy="-4" rx="14" ry="13" fill="url(#${g})"/><ellipse cx="10" cy="6" rx="12" ry="8" fill="#F4D8A8"/>
   <circle cx="14" cy="4" r="1.4" fill="#7A4A2A"/><circle cx="8" cy="5" r="1.4" fill="#7A4A2A"/>
   <ellipse cx="0" cy="-6" rx="2.6" ry="3.2" fill="#2A2438"/><circle cx="1" cy="-7.4" r="1" fill="#FFFFFF"/><path d="M-4 -11 l-2 -2 M-2 -12 l-1 -2.4" stroke="#2A2438" stroke-width=".9"/>
   <circle cx="-4" cy="1" r="3" fill="#FFB0A0" opacity=".5"/><path d="M6 10 Q10 12 14 10" stroke="#7A4A2A" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </g>
 </g>`;
 return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(f*s*(b?.6:1))} ${n(s*(b?.6:1))})">${body}</g>`}
// 統一用攝影師同事的動物（G.ZOO8，m8_photo_art.js 在 m7b 後面載入，所以畫的時候才去拿）；沒有就用上面自己的
function zooA(k,x,y,s,o={}){const Z=G.ZOO8;if(!Z||typeof Z.draw!=='function')return k==='giraffe'?zooGiraffe(x,y,s,o):zooElephant(x,y,s,o);
 const sz=s*(Z.SIZE&&Z.SIZE[k]||200)/100*.95*(o.baby?.6:1),f=o.f||1;let c='';try{c=Z.draw(k,o.eat?'eat':'stand')}catch(e){}
 return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(f*sz)} ${n(sz)}) translate(-50 -95)">${c}</g>`}
// 金合歡樹（長頸鹿區）
function acacia(x,y,s){return `<path d="M${n(x)} ${n(y)} Q${n(x+4*s)} ${n(y-50*s)} ${n(x-20*s)} ${n(y-90*s)} M${n(x+2*s)} ${n(y-40*s)} Q${n(x+20*s)} ${n(y-70*s)} ${n(x+40*s)} ${n(y-92*s)}" stroke="#7A5A3A" stroke-width="${n(7*s)}" fill="none" stroke-linecap="round"/>`
 +`<path d="M${n(x-80*s)} ${n(y-92*s)} Q${n(x-60*s)} ${n(y-122*s)} ${n(x)} ${n(y-118*s)} Q${n(x+60*s)} ${n(y-126*s)} ${n(x+86*s)} ${n(y-96*s)} Q${n(x)} ${n(y-80*s)} ${n(x-80*s)} ${n(y-92*s)}Z" fill="#6FA84E"/><path d="M${n(x-70*s)} ${n(y-100*s)} Q${n(x)} ${n(y-120*s)} ${n(x+70*s)} ${n(y-104*s)}" stroke="#9AD07A" stroke-width="${n(6*s)}" fill="none" opacity=".6" stroke-linecap="round"/>`}
// 指示牌（木頭柱子上幾個箭頭，箭頭上只有動物圖示）
function signPost(x,y,s,ics){let d=shd(x,y+2*s,14*s,3*s,.16)+R(x-3*s,y-110*s,6*s,110*s,'#9A6A42',2*s);
 ics.forEach(([ic,dir,c],k)=>{const yy=y-100*s+k*30*s;const w=60*s;const x0=dir>0?x-4*s:x+4*s-w;
  d+=`<path d="M${n(x0)} ${n(yy)} H${n(x0+w)} ${dir>0?`L${n(x0+w+10*s)} ${n(yy+12*s)} L${n(x0+w)} ${n(yy+24*s)}`:`V${n(yy+24*s)}`} H${n(x0)} ${dir<0?`L${n(x0-10*s)} ${n(yy+12*s)}`:''}Z" fill="${c}"/>`+iconSign(x0+w/2,yy+12*s,s*.8,ic,c)});
 return d}
// 地圖看板（插畫地圖：池塘、小路、各區的動物圖示、一顆你在這裡的星星）
function zooMap(x,y,w,h,s){const g=uid('zm');let d=shd(x+w/2,y+h+70*s,w*.5,6*s,.16)+R(x+w*.1,y+h,8*s,70*s,'#9A6A42')+R(x+w*.9-8*s,y+h,8*s,70*s,'#9A6A42');
 d+=R(x-8*s,y-8*s,w+16*s,h+16*s,'#8A5A30',8*s)+R(x,y,w,h,'#E8F4D8',4*s)+`<path d="M${n(x)} ${n(y+8*s)} H${n(x+w)}" stroke="#FFFFFF" stroke-width="${n(6*s)}" opacity=".5"/>`;
 d+=`<ellipse cx="${n(x+w*.5)}" cy="${n(y+h*.5)}" rx="${n(w*.14)}" ry="${n(h*.12)}" fill="#9AD8F2"/>`;
 d+=`<path d="M${n(x+w*.08)} ${n(y+h*.9)} Q${n(x+w*.3)} ${n(y+h*.7)} ${n(x+w*.5)} ${n(y+h*.72)} T${n(x+w*.9)} ${n(y+h*.3)} M${n(x+w*.5)} ${n(y+h*.72)} Q${n(x+w*.3)} ${n(y+h*.4)} ${n(x+w*.2)} ${n(y+h*.2)}" stroke="#F6E2B8" stroke-width="${n(7*s)}" fill="none" stroke-linecap="round"/>`;
 [[.2,.2,'elephant','#8FBF5A'],[.82,.24,'giraffe','#F2B84A'],[.78,.72,'paw','#FF8A80'],[.36,.5,'meet','#4FC4AE']].forEach(([a,b,ic,c])=>d+=iconSign(x+w*a,y+h*b,s*.9,ic,c));
 d+=`<g transform="translate(${n(x+w*.1)} ${n(y+h*.86)})"><circle r="${n(9*s)}" fill="#FFE27A" opacity=".5"${A('rd4tw',0,1.6)}/><path d="${star5(0,0,7*s)}" fill="${C7.gold}" stroke="#E0962A" stroke-width="${n(1.2*s)}"/></g>`;
 return d}
function zooGround(W,H,s,g,GY){let d=`<defs>${skyDay(g+'s')}${lg(g+'h',[[0,'#B8DC90'],[1,'#94C470']])}${lg(g+'gr',[[0,'#9ACC72'],[1,'#74AE52']])}${lg(g+'p',[[0,'#F4E2BC'],[1,'#E2C894']])}</defs>`;
 d+=R(-400,0,W+800,H,`url(#${g}s)`)+`<g${A('rd4dr',0,16)}>${cloud(W*.22,H*.1,s*.8)}${cloud(W*.72,H*.07,s*.6,'#FFFFFF',.9)}</g>`;
 d+=`<path d="M-400 ${n(GY-30*s)} Q${n(W*.2)} ${n(GY-80*s)} ${n(W*.5)} ${n(GY-40*s)} T${W+400} ${n(GY-50*s)} V${H} H-400Z" fill="url(#${g}h)"/>`;
 const r=rng(44);for(let i=0;i<14;i++){const x=-300+i*(W+600)/14+r()*20*s;d+=atree(x,GY-20*s+r()*16*s,s*(.6+r()*.3),i%4)}
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}gr)`);
 return d}
function zoo(W,H,v='path'){const {P,s}=sc(W,H);const g=uid('zo');let d='';const GY=H*(P?.62:.58);
 if(v==='gate')return zooGate(W,H,s,P,g);
 if(v==='info')return zooInfo(W,H,s,P,g);
 d+=zooGround(W,H,s,g,GY);
 if(v==='ele'){// 大象區：岩石、水池、媽媽和寶寶、前面的欄杆
  d+=`<path d="M-400 ${n(GY+10*s)} Q${n(W*.3)} ${n(GY-10*s)} ${n(W*.7)} ${n(GY+6*s)} T${W+400} ${n(GY)} V${n(H*.84)} H-400Z" fill="#D8C49A"/>`;
  d+=`<path d="M${n(W*(P?.5:.08))} ${n(GY+6*s)} Q${n(W*(P?.6:.16))} ${n(GY-90*s)} ${n(W*(P?.8:.3))} ${n(GY-60*s)} Q${n(W*(P?.9:.36))} ${n(GY-20*s)} ${n(W*(P?.96:.4))} ${n(GY+10*s)}Z" fill="#B8A88A"/><path d="M${n(W*(P?.56:.12))} ${n(GY-10*s)} Q${n(W*(P?.62:.2))} ${n(GY-70*s)} ${n(W*(P?.76:.28))} ${n(GY-52*s)}" stroke="#D8CCB0" stroke-width="${n(6*s)}" fill="none" opacity=".7"/>`;
  d+=`<ellipse cx="${n(W*(P?.3:.64))}" cy="${n(GY+(H*.84-GY)*.5)}" rx="${n((P?110:150)*s)}" ry="${n(26*s)}" fill="#8ACCE8"/><ellipse cx="${n(W*(P?.3:.64)-30*s)}" cy="${n(GY+(H*.84-GY)*.5-6*s)}" rx="${n(50*s)}" ry="${n(6*s)}" fill="#FFFFFF" opacity=".4"/>`;
  d+=zooA('elephant',W*(P?.32:.34),GY+(P?110:92)*s,s*(P?.9:1.05),{f:1})+zooA('elephant',W*(P?.7:.56),GY+(P?122:100)*s,s*(P?.9:1.05),{f:-1,baby:1});
  d+=fence(W,H*.86,s);
  d+=iconSign(W*(P?.14:.08),H*.8,s*1.1,'nofeed','#FF8A80');
  return d}
 if(v==='gir'){// 長頸鹿區：金合歡樹、高高的餵食架（給工作人員用）、兩隻長頸鹿
  d+=`<path d="M-400 ${n(GY+10*s)} Q${n(W*.4)} ${n(GY-6*s)} ${W+400} ${n(GY+8*s)} V${n(H*.84)} H-400Z" fill="#E2CE98"/>`;
  d+=acacia(W*(P?.8:.78),GY+40*s,s*1.2)+acacia(W*(P?.1:.12),GY+20*s,s*.9);
  d+=zooA('giraffe',W*(P?.32:.3),GY+(P?110:96)*s,s*(P?1:1.1),{f:1})+zooA('giraffe',W*(P?.7:.6),GY+(P?118:100)*s,s*(P?.9:1),{f:-1,eat:1})+zooA('giraffe',W*(P?.5:.45),GY+(P?126:106)*s,s,{f:1,baby:1});
  d+=fence(W,H*.86,s);
  return d}
 // 步道（主場景）：彎彎的小路、地圖看板、指示牌、遠方的長頸鹿和大象
 d+=zooA('giraffe',W*(P?.78:.86),GY-6*s,s*.36,{f:-1})+zooA('elephant',W*(P?.6:.7),GY-4*s,s*.3,{f:-1});
 d+=`<path d="M${n(W*.3)} ${n(H+10)} Q${n(W*.36)} ${n(GY+(H-GY)*.5)} ${n(W*.52)} ${n(GY+20*s)} Q${n(W*.62)} ${n(GY+4*s)} ${n(W*.8)} ${n(GY+2*s)} L${n(W*.82)} ${n(GY+12*s)} Q${n(W*.66)} ${n(GY+18*s)} ${n(W*.6)} ${n(GY+36*s)} Q${n(W*.5)} ${n(GY+(H-GY)*.6)} ${n(W*.62)} ${n(H+10)}Z" fill="url(#${g}p)"/>`;
 d+=`<path d="M-400 ${n(GY+24*s)} H${W+400}" stroke="#7A9A5A" stroke-width="${n(2*s)}" opacity=".0"/>`;
 // 低矮的木頭圍欄（遠）
 for(let x=-400;x<W+400;x+=30*s)d+=R(x,GY-4*s,4*s,16*s,'#B08A5A');d+=R(-400,GY,W+800,3*s,'#B08A5A')+R(-400,GY+7*s,W+800,3*s,'#B08A5A');
 d+=zooMap(W*(P?.06:.05),H*(P?.32:.2),(P?150:210)*s,(P?110:140)*s,s);
 d+=signPost(W*(P?.86:.48),GY+(P?60:40)*s,s,[['elephant',1,'#8FBF5A'],['giraffe',-1,'#F2B84A'],['meet',1,'#4FC4AE']]);
 // 花圃、長椅
 d+=bench(W*(P?.62:.84),GY+(P?110:84)*s,(P?70:90)*s,s,'#C8925A');
 const r=rng(441);for(let i=0;i<30;i++){const x=r()*W,y=GY+20*s+r()*(H-GY-20*s);if(x>W*.28&&x<W*.66)continue;if(!P&&x>W*.7&&y>H*.75)continue;d+=T(x,y,s*(.5+r()*.3),`${[0,72,144,216,288].map(a=>`<circle cx="${n(4*Math.cos(a*Math.PI/180))}" cy="${n(4*Math.sin(a*Math.PI/180))}" r="3" fill="${['#FF8FB8','#FFCB4D','#FFFFFF','#B89CFF'][i%4]}"/>`).join('')}<circle r="2" fill="#FFE27A"/>`)}
 return d}
// 前景欄杆（金屬欄杆＋木頭扶手）
function fence(W,y,s){let d=R(-400,y-36*s,W+800,8*s,'#B88A5A',3*s)+R(-400,y-36*s,W+800,2.4*s,'#E0B88A');for(let x=-400;x<W+400;x+=22*s)d+=R(x,y-28*s,4*s,28*s,'#8A92A8');d+=R(-400,y,W+800,30*s,'#9ACC72')+R(-400,y,W+800,4*s,'#7AAE58');return d}
// 入口：大拱門（上面是動物的剪影）、售票亭（沒有價格）、旗子
function zooGate(W,H,s,P,g){const GY=H*(P?.68:.66);let d=zooGround(W,H,s,g,GY);
 d+=`<path d="M-400 ${n(GY)} H${W+400} V${H} H-400Z" fill="#E8DCC4"/>`;for(let x=-400;x<W+400;x+=50*s)d+=`<path d="M${n(x)} ${n(GY)} L${n(x+(x-W/2)*.4)} ${H}" stroke="#D2C4A8" stroke-width="${n(1.4*s)}"/>`;
 const cx=W*(P?.5:.42),aw=(P?280:340)*s,ah=(P?220:230)*s;
 // 兩根柱子＋拱
 [-1,1].forEach(k=>{const x=cx+k*aw/2;d+=shd(x,GY+4*s,30*s,6*s,.16)+R(x-22*s,GY-ah,44*s,ah,'#E8A86A',6*s)+R(x-22*s,GY-ah,12*s,ah,'#FFFFFF',4*s,' opacity=".2"')+R(x-28*s,GY-ah-10*s,56*s,14*s,'#C8784A',5*s)});
 d+=`<path d="M${n(cx-aw/2-28*s)} ${n(GY-ah+4*s)} Q${n(cx)} ${n(GY-ah-80*s)} ${n(cx+aw/2+28*s)} ${n(GY-ah+4*s)} L${n(cx+aw/2+28*s)} ${n(GY-ah+30*s)} Q${n(cx)} ${n(GY-ah-50*s)} ${n(cx-aw/2-28*s)} ${n(GY-ah+30*s)}Z" fill="#5AAE6A"/>`;
 // 拱上的動物剪影（長頸鹿、大象、獅子、猴子）
 d+=T(cx-aw*.28,GY-ah-28*s,s*.9,`<path d="M-2 9 V-6 L-1 -9 Q2 -11 5 -8 L2 -6 V2 Q6 2 6 6 V9 H4 V6 H1 V9Z" fill="#FFE27A" transform="scale(2.4)"/>`)+T(cx+aw*.26,GY-ah-22*s,s*.9,`<path d="M-8 6 Q-10 -6 0 -7 Q9 -7 9 1 Q9 5 6 5 V9 H3 V5 H-3 V9 H-6Z" fill="#FFE27A" transform="scale(2.4)"/>`)+T(cx,GY-ah-46*s,s*.9,`<circle r="16" fill="#FFE27A"/><circle r="10" fill="#FFB84A"/><circle cx="-4" cy="-2" r="1.6" fill="#7A4A2A"/><circle cx="4" cy="-2" r="1.6" fill="#7A4A2A"/>`);
 // 閘口
 for(let k=0;k<3;k++){const x=cx-aw*.3+k*aw*.3;d+=R(x-6*s,GY-40*s,12*s,40*s,'#A8AEC2',3*s)+`<path d="M${n(x+6*s)} ${n(GY-26*s)} h${n(30*s)}" stroke="#C8CCDA" stroke-width="${n(4*s)}" stroke-linecap="round"/>`}
 // 售票亭（左）：窗口、小屋頂（只有圖，沒有價格）
 const tx=W*(P?.12:.1);d+=shd(tx,GY+4*s,60*s,6*s,.16)+R(tx-50*s,GY-110*s,100*s,110*s,'#FFF2DE',6*s)+`<path d="M${n(tx-62*s)} ${n(GY-104*s)} L${n(tx)} ${n(GY-150*s)} L${n(tx+62*s)} ${n(GY-104*s)}Z" fill="#FF8A80"/>`+R(tx-32*s,GY-86*s,64*s,40*s,'#BFE6F4',4*s)+R(tx-40*s,GY-46*s,80*s,8*s,'#C8925A',3*s)+iconSign(tx,GY-126*s,s*.8,'paw','#FF8A80');
 // 旗子
 [[W*(P?.88:.74),'#FFCB4D'],[W*(P?.96:.94),'#7EC6F0']].forEach(([x,c])=>{d+=R(x-2*s,GY-170*s,4*s,170*s,'#A8AEC2')+`<g${A('rd4sw',0,4,'transform-origin:0 0')}><path d="M${n(x+2*s)} ${n(GY-168*s)} q${n(30*s)} ${n(6*s)} ${n(50*s)} 0 v${n(30*s)} q${n(-20*s)} ${n(6*s)} ${n(-50*s)} 0Z" fill="${c}"/></g>`+iconSign(x+26*s,GY-152*s,s*.6,'paw',c)});
 return d}
// 服務台（走散了就在這裡等）：小亭子、集合點的旗子、工作人員的帽子、地圖
function zooInfo(W,H,s,P,g){const GY=H*(P?.66:.62);let d=zooGround(W,H,s,g,GY);
 d+=`<path d="M-400 ${n(GY+10*s)} H${W+400} V${H} H-400Z" fill="#EADFC8"/>`;
 const bx=W*(P?.34:.3),bw=(P?220:280)*s;
 d+=shd(bx,GY+40*s,bw*.6,8*s,.16)+R(bx-bw/2,GY-120*s,bw,160*s,'#FFFFFF',8*s)+`<path d="M${n(bx-bw/2-20*s)} ${n(GY-110*s)} Q${n(bx)} ${n(GY-170*s)} ${n(bx+bw/2+20*s)} ${n(GY-110*s)}Z" fill="${C7.mint}"/>`;
 let st='';for(let k=0;k<10;k++)st+=`<path d="M${n(bx-bw/2+k*bw/10)} ${n(GY-112*s)} h${n(bw/10)} v${n(18*s)} q${n(-bw/20)} ${n(8*s)} ${n(-bw/10)} 0Z" fill="${k%2?'#FFFFFF':C7.mint}"/>`;d+=st;
 d+=R(bx-bw/2+16*s,GY-80*s,bw-32*s,56*s,'#E2F4F0',4*s)+R(bx-bw/2,GY-22*s,bw,14*s,'#C8925A',4*s)+R(bx-bw/2+6*s,GY-8*s,bw-12*s,48*s,'#E8DCC6',4*s);
 d+=T(bx-bw*.25,GY-30*s,s,`<path d="M-16 0 Q-16 -14 0 -15 Q16 -14 16 0Z" fill="#6A8A4A"/><path d="M-22 0 H22 Q22 5 0 5 Q-22 5 -22 0Z" fill="#5A7A3A"/><circle cx="0" cy="-8" r="4" fill="${C7.gold}"/>`);
 d+=iconSign(bx+bw*.2,GY-52*s,s*1.4,'meet','#4FC4AE');
 // 集合點的大旗（亭子旁邊，高高的）
 const fx=bx+bw/2+40*s;d+=R(fx-3*s,GY-220*s,6*s,240*s,'#A8AEC2',2*s)+`<g${A('rd4sw',.5,4,'transform-origin:0 0')}><path d="M${n(fx+3*s)} ${n(GY-218*s)} L${n(fx+70*s)} ${n(GY-200*s)} L${n(fx+3*s)} ${n(GY-180*s)}Z" fill="#FFCB4D"/></g><circle cx="${n(fx)}" cy="${n(GY-222*s)}" r="${n(6*s)}" fill="#FF8A80"/>`+shd(fx,GY+20*s,14*s,3*s,.16);
 d+=zooMap(W*(P?.62:.72),H*(P?.2:.16),(P?110:150)*s,(P?90:110)*s,s);
 d+=atree(W*(P?.04:.04),GY+20*s,s*1.2,0);
 return d}

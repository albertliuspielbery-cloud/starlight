
/* ================= v5.4 第六季「星光大自然」第三十六～四十章（s6/assemble6.py 產生，不要手改） ================= */
// 第 36～40 章「星光大自然」場景＋題目物件（草稿 2026-11-17，等家長看過預覽圖才算定稿）
// 星光工作室 Starlight Studio｜本檔所有場景、物件都是星光工作室原創，著作權與 IP 屬於星光工作室。
// 規格同 art31.js：BG36.xxx(W,H) 回傳 SVG 內容字串（不含 <svg> 外框）；左右各多畫 400 給寬螢幕；背景沒有文字；
// H>W 時（直放手機）重新排版；上方中間留給題目卡、右下留給主角、中間留給答案卡。
// 動畫只用遊戲現有的 rd4tw（閃）／rd4dr（飄）／rd4bob（上下）／rd4sw（左右擺）／rd4fall（落下）——沒有整體放大縮小；減少動態時遊戲會關掉。
// 物件：OBJ36[k] 是 64×64 的圖內容，install36() 登記成 ICONART['i:s36'+k]。
(function(G){
const n=v=>(+v).toFixed(1);
const rng=seed=>{let x=seed;return()=>{x=(x*9301+49297)%233280;return x/233280}};
const A=(c,dl,du,ex)=>` class="${c}" style="animation-delay:${dl}s${du?`;animation-duration:${du}s`:''}${ex?';'+ex:''}"`;
const T=(x,y,s,c,extra='')=>`<g transform="translate(${n(x)} ${n(y)}) scale(${(+s).toFixed(3)})"${extra}>${c}</g>`;
const lg=(id,stops,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</linearGradient>`;
const rg=(id,stops,cx=.5,cy=.5,r=.5)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</radialGradient>`;
const star5=(cx,cy,R,r=R*.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,rr=i%2?r:R;d+=(i?'L':'M')+n(cx+rr*Math.cos(a))+' '+n(cy+rr*Math.sin(a))}return d+'Z'};
const spark=(cx,cy,r)=>`M${n(cx)} ${n(cy-r)}Q${n(cx+r*.16)} ${n(cy-r*.16)} ${n(cx+r)} ${n(cy)}Q${n(cx+r*.16)} ${n(cy+r*.16)} ${n(cx)} ${n(cy+r)}Q${n(cx-r*.16)} ${n(cy+r*.16)} ${n(cx-r)} ${n(cy)}Q${n(cx-r*.16)} ${n(cy-r*.16)} ${n(cx)} ${n(cy-r)}Z`;
const sc=(W,H)=>{const P=H>W;return {P,s:P?Math.min(W/330,H/640):Math.min(W/800,H/450)}};
const cloud=(x,y,s,c='#FFFFFF',op=1)=>T(x,y,s,`<path d="M-60 0 Q-62 -22 -38 -24 Q-30 -46 -6 -40 Q8 -58 30 -42 Q56 -46 56 -22 Q76 -18 70 0Z" fill="${c}" opacity="${op}"/>`);
let U=0;const uid=p=>p+(++U);
// 大葉子（芋葉／龜背芋感覺）：x,y＝葉柄底，len 長，ang 角度
const bigLeaf=(x,y,len,ang,c1,c2,cut)=>{const L=len,w=L*.42;let d=`<g transform="translate(${n(x)} ${n(y)}) rotate(${ang})"><path d="M0 0 Q${n(-w*1.1)} ${n(-L*.45)} 0 ${n(-L)} Q${n(w*1.1)} ${n(-L*.45)} 0 0Z" fill="${c1}"/><path d="M0 0 L0 ${n(-L*.96)}" stroke="${c2}" stroke-width="${n(L*.03)}" stroke-linecap="round"/>`;
 for(let k=1;k<5;k++){const t=k/5;d+=`<path d="M0 ${n(-L*t)} Q${n(-w*.5)} ${n(-L*t-L*.08)} ${n(-w*.86*Math.sin(t*Math.PI))} ${n(-L*t-L*.16)} M0 ${n(-L*t)} Q${n(w*.5)} ${n(-L*t-L*.08)} ${n(w*.86*Math.sin(t*Math.PI))} ${n(-L*t-L*.16)}" stroke="${c2}" stroke-width="${n(L*.014)}" fill="none" opacity=".7"/>`}
 if(cut)for(let k=1;k<4;k++){const t=k/4.4+.1;d+=`<path d="M${n(-w*.9*Math.sin(t*Math.PI))} ${n(-L*t-L*.1)} L${n(-w*.3)} ${n(-L*t-L*.04)} L${n(-w*.95*Math.sin(t*Math.PI))} ${n(-L*t-L*.02)}Z M${n(w*.9*Math.sin(t*Math.PI))} ${n(-L*t-L*.1)} L${n(w*.3)} ${n(-L*t-L*.04)} L${n(w*.95*Math.sin(t*Math.PI))} ${n(-L*t-L*.02)}Z" fill="${cut}"/>`}
 return d+'</g>'};
const fern=(x,y,s,c)=>{let d='';for(let k=-3;k<=3;k++){const a=k*22;d+=`<g transform="translate(${n(x)} ${n(y)}) rotate(${a}) scale(${(+s).toFixed(3)})"><path d="M0 0 Q-4 -30 0 -60" stroke="${c}" stroke-width="3" fill="none"/>${[10,20,30,40,50].map(t=>`<path d="M0 ${-t} q-9 -2 -13 -8 M0 ${-t} q9 -2 13 -8" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`}return d};
const grassBlades=(x0,x1,y,h,c,seed,dens=7)=>{const r=rng(seed);let d='';for(let x=x0;x<x1;x+=dens){const hh=h*(.6+r()*.6),b=(r()-.5)*h*.5;d+=`M${n(x)} ${n(y)} Q${n(x+b*.4)} ${n(y-hh*.6)} ${n(x+b)} ${n(y-hh)} Q${n(x+b*.3+2)} ${n(y-hh*.5)} ${n(x+4)} ${n(y)}Z `}return `<path d="${d}" fill="${c}"/>`};
const flower=(x,y,s,c,ctr='#FFD24D')=>T(x,y,s,`<path d="M0 0 Q-2 14 0 30" stroke="#4E9A4A" stroke-width="2.4" fill="none"/>${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-7" rx="4.6" ry="7.4" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="3.8" fill="${ctr}"/>`);
const pine=(x,y,h,c1,c2)=>{const w=h*.42;return `<path d="M${n(x)} ${n(y-h)} L${n(x+w*.5)} ${n(y-h*.62)} L${n(x+w*.32)} ${n(y-h*.62)} L${n(x+w*.72)} ${n(y-h*.3)} L${n(x+w*.46)} ${n(y-h*.3)} L${n(x+w)} ${n(y-h*.04)} L${n(x-w)} ${n(y-h*.04)} L${n(x-w*.46)} ${n(y-h*.3)} L${n(x-w*.72)} ${n(y-h*.3)} L${n(x-w*.32)} ${n(y-h*.62)} L${n(x-w*.5)} ${n(y-h*.62)}Z" fill="${c1}"/><path d="M${n(x)} ${n(y-h)} L${n(x+w*.5)} ${n(y-h*.62)} L${n(x+w*.32)} ${n(y-h*.62)} L${n(x+w*.72)} ${n(y-h*.3)} L${n(x+w*.46)} ${n(y-h*.3)} L${n(x+w)} ${n(y-h*.04)} L${n(x)} ${n(y-h*.04)}Z" fill="${c2}"/><rect x="${n(x-h*.03)}" y="${n(y-h*.05)}" width="${n(h*.06)}" height="${n(h*.06)}" fill="#6A4A32"/>`};
const butterflyS=(x,y,s,c1,c2,dl)=>`<g${A('rd4fl',dl,7)}>${T(x,y,s,`<path d="M0 0 Q-14 -16 -18 -4 Q-20 6 0 2Z M0 0 Q14 -16 18 -4 Q20 6 0 2Z" fill="${c1}"/><path d="M0 2 Q-12 6 -10 14 Q-4 16 0 4Z M0 2 Q12 6 10 14 Q4 16 0 4Z" fill="${c2}"/><rect x="-1.2" y="-6" width="2.4" height="14" rx="1.2" fill="#3A2A4A"/>`)}</g>`;

// ───────── 36 熱帶雨林（白天，霧氣、光束、藤蔓，從地面到樹冠好幾層） ─────────
function rainforest(W,H){const {P,s}=sc(W,H);const GY=H*(P?.8:.78);const g=uid('rf');let d=`<defs>
 ${lg(g+'sky',[[0,'#BFEFD6'],[.55,'#DDF6D8'],[1,'#F2F8D0']])}${lg(g+'gr',[[0,'#4E8A3A'],[1,'#2F5E2A']])}${lg(g+'tk',[[0,'#7A5A3E'],[1,'#5A4030']],1,0)}
 ${lg(g+'ray',[[0,'#FFFDE0',.55],[1,'#FFFDE0',0]])}${rg(g+'mist',[[0,'#FFFFFF',.55],[1,'#FFFFFF',0]])}</defs>`;
 d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="url(#${g}sky)"/>`;
 // 遠方的樹冠（淡）
 const r=rng(36);
 for(let L=0;L<3;L++){const y=H*(P?.30+L*.1:.24+L*.12),c=['#A8D8A0','#86C47E','#62A85C'][L];let p=`M-400 ${n(H)} L-400 ${n(y)}`;for(let x=-400;x<=W+400;x+=36*s){p+=` Q${n(x+18*s)} ${n(y-(22+r()*28)*s)} ${n(x+36*s)} ${n(y-r()*8*s)}`}p+=` L${W+400} ${n(H)}Z`;d+=`<path d="${p}" fill="${c}"/>`}
 // 光束
 [[.2,-12],[.48,-8],[.76,-14]].forEach(([fx,a])=>{d+=`<path d="M${n(W*fx)} 0 L${n(W*fx+60*s)} 0 L${n(W*fx+160*s)} ${n(GY)} L${n(W*fx+20*s)} ${n(GY)}Z" fill="url(#${g}ray)" opacity=".6"/>`});
 // 大樹幹（從地面一直到最上面）＋樹冠
 const trunks=P?[[.12,26],[.86,30],[.55,18]]:[[.06,30],[.3,20],[.7,24],[.95,34]];
 trunks.forEach(([fx,w],k)=>{const x=W*fx,tw=w*s;d+=`<path d="M${n(x-tw)} ${n(GY+6*s)} Q${n(x-tw*.7)} ${n(GY*.5)} ${n(x-tw*.5)} ${n(-10)} L${n(x+tw*.5)} ${n(-10)} Q${n(x+tw*.7)} ${n(GY*.5)} ${n(x+tw)} ${n(GY+6*s)}Z" fill="url(#${g}tk)"/>`;
  d+=`<path d="M${n(x-tw)} ${n(GY+6*s)} q${n(-18*s)} ${n(2*s)} ${n(-30*s)} ${n(10*s)} M${n(x+tw)} ${n(GY+6*s)} q${n(18*s)} ${n(2*s)} ${n(30*s)} ${n(10*s)}" stroke="#5A4030" stroke-width="${n(8*s)}" stroke-linecap="round" fill="none"/>`;
  for(let j=0;j<5;j++)d+=`<path d="M${n(x-tw*.3+j*tw*.15)} ${n(GY*(.1+j*.17))} q${n(4*s)} ${n(10*s)} 0 ${n(20*s)}" stroke="#4A3424" stroke-width="${n(1.6*s)}" fill="none" opacity=".5"/>`;
  // 苔蘚
  d+=`<ellipse cx="${n(x-tw*.4)}" cy="${n(GY*.62)}" rx="${n(tw*.5)}" ry="${n(10*s)}" fill="#7FBF5A" opacity=".8"/>`});
 // 最上層樹冠（螢幕最上面一排，題目卡在中間會蓋住一點）
 for(let x=-400;x<W+400;x+=70*s){const y=(P?18:10)*s+r()*14*s;d+=`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(56*s)}" ry="${n(34*s)}" fill="${['#3E8A3A','#4E9A44','#357A32'][Math.floor(r()*3)]}"/>`}
 // 藤蔓（左右擺）
 const vines=P?[.24,.7]:[.18,.42,.62,.84];vines.forEach((fx,k)=>{const x=W*fx,len=(P?.42:.48)*H;let v=`<path d="M${n(x)} 0 Q${n(x+16*s)} ${n(len*.5)} ${n(x-4*s)} ${n(len)}" stroke="#4E7A2E" stroke-width="${n(3.4*s)}" fill="none"/>`;for(let j=1;j<7;j++){const yy=len*j/7,xx=x+Math.sin(j)*6*s;v+=`<ellipse cx="${n(xx+(j%2?6:-6)*s)}" cy="${n(yy)}" rx="${n(6*s)}" ry="${n(3.4*s)}" fill="#6FB24A" transform="rotate(${j%2?30:-30} ${n(xx)} ${n(yy)})"/>`}d+=`<g${A('rd4sw',k*.8,6+k,'transform-origin:50% 0%')}>${v}</g>`});
 // 地面
 d+=`<path d="M-400 ${n(GY)} Q${n(W*.3)} ${n(GY-10*s)} ${n(W*.6)} ${n(GY)} T${W+400} ${n(GY)} V${H} H-400Z" fill="url(#${g}gr)"/>`;
 // 落葉
 for(let i=0;i<40;i++){const x=-400+r()*(W+800),y=GY+r()*(H-GY);d+=`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(5*s)}" ry="${n(2.4*s)}" fill="${['#A8722E','#C8963E','#6A8A3A'][i%3]}" opacity=".7" transform="rotate(${Math.round(r()*180)} ${n(x)} ${n(y)})"/>`}
 // 蕨類、大葉子（前景，左下、右邊靠中；右下留給主角）
 d+=fern(W*(P?.06:.05),GY+8*s,s*.9,'#3E7A2E')+fern(W*(P?.94:.66),GY+6*s,s*.7,'#4E8A3A');
 d+=bigLeaf(-10*s,H+10*s,(P?150:170)*s,28,'#3E8E46','#2A6A32','#2F5E2A')+bigLeaf(W*(P?.0:.12),H+16*s,(P?120:140)*s,-6,'#4FA650','#2F7A38');
 d+=bigLeaf(W+10*s,H+10*s,(P?130:150)*s,-32,'#3E8E46','#2A6A32','#2F5E2A');
 // 花（不摘：開在藤蔓上）＋ 兩隻蝴蝶、霧
 d+=flower(W*(P?.34:.24),GY-4*s,s*.8,'#FF7AA8')+flower(W*(P?.42:.27),GY+2*s,s*.6,'#FFB84A');
 d+=butterflyS(W*.36,H*.42,s*.9,'#4AB8F0','#2A7AC8',0)+butterflyS(W*.78,H*(P?.5:.38),s*.7,'#FFB84A','#E8762A',2);
 d+=`<ellipse cx="${n(W*.5)}" cy="${n(GY-10*s)}" rx="${n(W*.8)}" ry="${n(40*s)}" fill="url(#${g}mist)"/>`;
 // 雨滴（細細的，慢慢落下）
 for(let i=0;i<14;i++){const x=r()*W,y=r()*H*.5;d+=`<g${A('rd4fall',(i*.9)%12,10)}><path d="M${n(x)} ${n(y)} l${n(-1.4*s)} ${n(9*s)}" stroke="#FFFFFF" stroke-width="${n(1.4*s)}" opacity=".55" stroke-linecap="round"/></g>`}
 return d}

// ───────── 37 春天的草地花叢（藍天、小山坡、好多花、蝴蝶和瓢蟲） ─────────
function meadow(W,H){const {P,s}=sc(W,H);const GY=H*(P?.66:.62);const g=uid('md');let d=`<defs>
 ${lg(g+'sky',[[0,'#8FD4FF'],[1,'#E2F6FF']])}${lg(g+'h1',[[0,'#B8E48A'],[1,'#8ACB62']])}${lg(g+'h2',[[0,'#9AD872'],[1,'#6CB84A']])}${lg(g+'gr',[[0,'#7CC85A'],[1,'#4E9A3A']])}
 ${rg(g+'sun',[[0,'#FFFBD0'],[.5,'#FFF0A0',.6],[1,'#FFF0A0',0]])}</defs>`;
 d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="url(#${g}sky)"/>`;
 d+=`<circle cx="${n(W*(P?.82:.88))}" cy="${n(H*.12)}" r="${n(90*s)}" fill="url(#${g}sun)"/><circle cx="${n(W*(P?.82:.88))}" cy="${n(H*.12)}" r="${n(26*s)}" fill="#FFE97A"/>`;
 d+=`<g${A('rd4dr',0)}>${cloud(W*.18,H*.16,s*.9)}${cloud(W*.62,H*.1,s*.7,'#FFFFFF',.9)}</g>`;
 d+=`<path d="M-400 ${n(GY-40*s)} Q${n(W*.2)} ${n(GY-120*s)} ${n(W*.5)} ${n(GY-50*s)} T${W+400} ${n(GY-70*s)} V${H} H-400Z" fill="url(#${g}h1)"/>`;
 d+=`<path d="M-400 ${n(GY-10*s)} Q${n(W*.35)} ${n(GY-70*s)} ${n(W*.75)} ${n(GY-14*s)} T${W+400} ${n(GY-30*s)} V${H} H-400Z" fill="url(#${g}h2)"/>`;
 // 遠處小樹
 const r=rng(37);for(let i=0;i<7;i++){const x=-200+r()*(W+400),y=GY-40*s-r()*40*s;d+=`<circle cx="${n(x)}" cy="${n(y-14*s)}" r="${n(14*s)}" fill="#5AAE4A"/><rect x="${n(x-2*s)}" y="${n(y-2*s)}" width="${n(4*s)}" height="${n(12*s)}" fill="#7A5A3E"/>`}
 d+=`<path d="M-400 ${n(GY)} Q${n(W*.4)} ${n(GY-16*s)} ${n(W)} ${n(GY)} T${W+400} ${n(GY)} V${H} H-400Z" fill="url(#${g}gr)"/>`;
 // 草叢、花叢
 d+=grassBlades(-400,W+400,GY+6*s,24*s,'#5AAE44',371,6*s)+grassBlades(-400,W+400,H,40*s,'#4E9A3A',372,8*s);
 const FC=['#FF7AA8','#FFD24D','#FFFFFF','#B89CFF','#FF9A5A'];for(let i=0;i<46;i++){const x=-300+r()*(W+600),y=GY+10*s+r()*(H-GY-20*s);if(!P&&x>W*.7&&y>H*.78)continue;d+=flower(x,y,s*(.35+r()*.35),FC[i%5])}
 // 前景大花叢（左下）＋ 葉子上的瓢蟲
 const fx=W*(P?.12:.1),fy=H*(P?.9:.9);d+=`<ellipse cx="${n(fx)}" cy="${n(fy)}" rx="${n(80*s)}" ry="${n(40*s)}" fill="#3E8A34"/>`;for(let k=0;k<6;k++)d+=flower(fx-50*s+k*20*s,fy-24*s-(k%2)*12*s,s*.8,FC[k%5]);
 const lx=W*(P?.4:.32),ly=H*(P?.86:.84);d+=bigLeaf(lx,ly+30*s,60*s,40,'#6CC04A','#3E8A34');
 d+=T(lx+16*s,ly-4*s,s*.7,`<ellipse cx="0" cy="0" rx="10" ry="8" fill="#E8403A"/><path d="M0 -8 V8" stroke="#2A1A1A" stroke-width="1.4"/><circle cx="-4" cy="-2" r="2" fill="#2A1A1A"/><circle cx="4" cy="3" r="2" fill="#2A1A1A"/><circle cx="-4" cy="4" r="1.6" fill="#2A1A1A"/><circle cx="0" cy="-10" r="4.4" fill="#2A1A1A"/>`);
 d+=butterflyS(W*.3,H*.36,s,'#FF9AD0','#E85AA0',0)+butterflyS(W*(P?.7:.6),H*(P?.48:.3),s*.8,'#7FD0FF','#3A8AD8',1.6)+butterflyS(W*(P?.5:.8),H*(P?.36:.44),s*.7,'#FFE07A','#F0A030',3);
 // 小蜜蜂（遠遠的）
 d+=`<g${A('rd4fl',.8,6)}>${T(W*(P?.62:.5),H*(P?.56:.5),s*.6,`<ellipse rx="8" ry="6" fill="#FFD24D"/><path d="M-3 -6 V6 M3 -6 V6" stroke="#3A2A1A" stroke-width="2"/><ellipse cx="-2" cy="-9" rx="5" ry="3.4" fill="#FFFFFF" opacity=".85"/><ellipse cx="4" cy="-9" rx="5" ry="3.4" fill="#FFFFFF" opacity=".85"/>`)}</g>`;
 return d}

// ───────── 38 夏天的台灣山林溪流（層層的青山、針葉林、清清的小溪、大石頭和青苔、步道木樁） ─────────
function creek(W,H){const {P,s}=sc(W,H);const GY=H*(P?.58:.5);const g=uid('ck');let d=`<defs>
 ${lg(g+'sky',[[0,'#7FC4F4'],[1,'#D8F0FF']])}${lg(g+'m1',[[0,'#9CC8D8'],[1,'#B8DCE2']])}${lg(g+'m2',[[0,'#6AA88A'],[1,'#8AC09A']])}${lg(g+'m3',[[0,'#3E8A5A'],[1,'#5AA06A']])}
 ${lg(g+'wt',[[0,'#8ADCF0'],[1,'#3EA8D0']])}${lg(g+'bk',[[0,'#8AC86A'],[1,'#5A9A44']])}${lg(g+'rk',[[0,'#B8B0A8'],[1,'#7A726A']])}</defs>`;
 d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="url(#${g}sky)"/>`;
 d+=`<g${A('rd4dr',4)}>${cloud(W*.22,H*.12,s*.8)}${cloud(W*.74,H*.08,s*.6,'#FFFFFF',.9)}</g>`;
 // 三層山：遠山（藍灰，有尖尖的高山）、中山、近山
 const mt=(y,amp,c,seed,step)=>{const r=rng(seed);let p=`M-400 ${n(H)} L-400 ${n(y)}`;for(let x=-400;x<=W+400;x+=step*s){p+=` L${n(x+step*s*.5)} ${n(y-amp*s*(.4+r()*.8))} L${n(x+step*s)} ${n(y-amp*s*r()*.3)}`}return `<path d="${p} L${W+400} ${n(H)}Z" fill="${c}"/>`};
 d+=mt(GY-70*s,110,`url(#${g}m1)`,381,120)+mt(GY-30*s,70,`url(#${g}m2)`,382,90);
 // 中景針葉林
 const r=rng(38);for(let i=0;i<26;i++){const x=-400+i*(W+800)/26+r()*20*s;d+=pine(x,GY-12*s+r()*10*s,(40+r()*30)*s,'#2E6A44','#3E7E52')}
 d+=mt(GY,30,`url(#${g}m3)`,383,70);
 // 溪：從遠方 S 形流過來，近處變寬
 const cx=W*(P?.5:.46);d+=`<path d="M${n(cx-8*s)} ${n(GY-6*s)} Q${n(cx+60*s)} ${n(GY+(H-GY)*.25)} ${n(cx-40*s)} ${n(GY+(H-GY)*.5)} Q${n(cx-140*s)} ${n(GY+(H-GY)*.75)} ${n(cx-60*s)} ${n(H+10)} L${n(cx+(P?150:230)*s)} ${n(H+10)} Q${n(cx+40*s)} ${n(GY+(H-GY)*.72)} ${n(cx+30*s)} ${n(GY+(H-GY)*.48)} Q${n(cx+90*s)} ${n(GY+(H-GY)*.22)} ${n(cx+8*s)} ${n(GY-6*s)}Z" fill="url(#${g}wt)"/>`;
 // 溪岸（左右草地）
 d+=`<path d="M-400 ${n(GY)} H${n(cx-8*s)} Q${n(cx+60*s)} ${n(GY+(H-GY)*.25)} ${n(cx-40*s)} ${n(GY+(H-GY)*.5)} Q${n(cx-140*s)} ${n(GY+(H-GY)*.75)} ${n(cx-60*s)} ${n(H+10)} H-400Z" fill="url(#${g}bk)"/>`;
 d+=`<path d="M${W+400} ${n(GY)} H${n(cx+8*s)} Q${n(cx+90*s)} ${n(GY+(H-GY)*.22)} ${n(cx+30*s)} ${n(GY+(H-GY)*.48)} Q${n(cx+40*s)} ${n(GY+(H-GY)*.72)} ${n(cx+(P?150:230)*s)} ${n(H+10)} H${W+400}Z" fill="url(#${g}bk)"/>`;
 // 水波（閃）
 for(let i=0;i<12;i++){const t=i/12,y=GY+(H-GY)*t,x=cx+Math.sin(t*5)*50*s-20*s+t*30*s;d+=`<path${A('rd4tw',(i*.4)%3)} d="M${n(x)} ${n(y)} q${n(8*s)} ${n(-3*s)} ${n(16*s)} 0" stroke="#FFFFFF" stroke-width="${n(2*s)}" fill="none" opacity=".8"/>`}
 // 石頭（有青苔）
 const rock=(x,y,w,h)=>`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(w)}" ry="${n(h)}" fill="url(#${g}rk)"/><path d="M${n(x-w*.8)} ${n(y-h*.4)} Q${n(x)} ${n(y-h*1.15)} ${n(x+w*.7)} ${n(y-h*.5)} Q${n(x)} ${n(y-h*.7)} ${n(x-w*.8)} ${n(y-h*.4)}Z" fill="#7FB85A"/>`;
 d+=rock(cx-30*s,GY+(H-GY)*.62,26*s,12*s)+rock(cx+70*s,GY+(H-GY)*.82,34*s,15*s)+rock(cx+(P?-90:-170)*s,H*.94,40*s,16*s)+rock(cx+10*s,GY+(H-GY)*.32,14*s,7*s);
 // 鉤吻鮭（小小的，在水裡游）
 d+=`<g${A('rd4dr',1)}>${T(cx+10*s,GY+(H-GY)*.45,s*.55,`<path d="M-16 0 Q-4 -8 12 0 Q-4 8 -16 0Z" fill="#E8A0A8"/><path d="M12 0 L20 -6 L20 6Z" fill="#C88890"/><circle cx="-10" cy="-1" r="1.4" fill="#2A1A2A"/>${[-4,0,4,8].map(x=>`<circle cx="${x}" cy="-2" r="1" fill="#6A4A5A"/>`).join('')}`)}</g>`;
 // 步道木樁（左邊）＋ 樹
 const px=W*(P?.12:.12),py=GY+(H-GY)*.55;d+=`<rect x="${n(px-4*s)}" y="${n(py-36*s)}" width="${n(8*s)}" height="${n(40*s)}" fill="#9A6A42"/><rect x="${n(px-24*s)}" y="${n(py-40*s)}" width="${n(48*s)}" height="${n(18*s)}" rx="${n(3*s)}" fill="#B8865A"/><path d="M${n(px+14*s)} ${n(py-31*s)} l${n(8*s)} 0 l${n(-4*s)} ${n(-5*s)} M${n(px+22*s)} ${n(py-31*s)} l${n(-4*s)} ${n(5*s)}" stroke="#6A4A2A" stroke-width="${n(2*s)}" fill="none"/>`;
 d+=pine(W*(P?.9:.92),GY+(H-GY)*.5,150*s,'#2E6A44','#3E7E52')+pine(W*(P?.02:.03),GY+(H-GY)*.3,120*s,'#2E6A44','#3E7E52');
 d+=grassBlades(-400,cx-60*s,H,30*s,'#4E9A3A',381,8*s)+grassBlades(cx+(P?150:230)*s,W+400,H,30*s,'#4E9A3A',382,8*s);
 d+=flower(W*(P?.08:.2),H*.96,s*.6,'#FFFFFF')+flower(W*(P?.16:.26),H*.93,s*.5,'#FFD24D');
 return d}

// ───────── 39 星光小鎮防災中心（室內演習教室：窗外颱風、堅固的桌子、防災包架子、圖示看板，沒有字） ─────────
function safety(W,H){const {P,s}=sc(W,H);const FY=H*(P?.72:.7);const g=uid('sf');let d=`<defs>
 ${lg(g+'w',[[0,'#FFF1E0'],[1,'#FBE0C6']])}${lg(g+'f',[[0,'#D8D0C4'],[1,'#B8AE9E']])}${lg(g+'out',[[0,'#7A8AA0'],[1,'#A8B4C4']])}${lg(g+'tb',[[0,'#D89A5A'],[1,'#B87A3E']])}</defs>`;
 d+=`<rect x="-400" y="0" width="${W+800}" height="${n(FY)}" fill="url(#${g}w)"/>`;
 // 牆上一條橘色防災色帶
 d+=`<rect x="-400" y="${n(FY-70*s)}" width="${W+800}" height="${n(14*s)}" fill="#FF9A5A" opacity=".85"/><rect x="-400" y="${n(FY-56*s)}" width="${W+800}" height="${n(56*s)}" fill="#F6D2B0"/>`;
 // 地板（方格）
 d+=`<rect x="-400" y="${n(FY)}" width="${W+800}" height="${n(H-FY+10)}" fill="url(#${g}f)"/>`;for(let x=-400;x<W+400;x+=60*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.25)} ${H}" stroke="#A89E8E" stroke-width="${n(1.2*s)}" opacity=".6"/>`;
 for(let k=1;k<4;k++)d+=`<path d="M-400 ${n(FY+(H-FY)*k/4)} H${W+400}" stroke="#A89E8E" stroke-width="${n(1.2*s)}" opacity=".6"/>`;
 // 窗戶（左上）：外面灰灰的天、斜斜的雨、被風吹彎的樹
 const wx=P?W*.06:W*.05,wy=P?H*.2:H*.12,ww=(P?140:200)*s,wh=(P?130:150)*s;
 d+=`<rect x="${n(wx)}" y="${n(wy)}" width="${n(ww)}" height="${n(wh)}" rx="${n(6*s)}" fill="url(#${g}out)"/>`;
 d+=`<g${A('rd4sw',0,3,'transform-origin:20% 100%')}>${`<path d="M${n(wx+ww*.3)} ${n(wy+wh)} Q${n(wx+ww*.34)} ${n(wy+wh*.6)} ${n(wx+ww*.5)} ${n(wy+wh*.4)}" stroke="#5A4A3A" stroke-width="${n(5*s)}" fill="none"/><ellipse cx="${n(wx+ww*.56)}" cy="${n(wy+wh*.38)}" rx="${n(30*s)}" ry="${n(18*s)}" fill="#4E7A5A"/>`}</g>`;
 for(let i=0;i<10;i++){const x=wx+ww*(i/10),y=wy+wh*((i*37%10)/10);d+=`<path${A('rd4tw',(i*.3)%2,1.6)} d="M${n(x)} ${n(y)} l${n(10*s)} ${n(14*s)}" stroke="#FFFFFF" stroke-width="${n(1.6*s)}" opacity=".7"/>`}
 d+=`<rect x="${n(wx)}" y="${n(wy)}" width="${n(ww)}" height="${n(wh)}" rx="${n(6*s)}" fill="none" stroke="#FFFFFF" stroke-width="${n(7*s)}"/><path d="M${n(wx+ww/2)} ${n(wy)} V${n(wy+wh)} M${n(wx)} ${n(wy+wh/2)} H${n(wx+ww)}" stroke="#FFFFFF" stroke-width="${n(5*s)}"/>`;
 // 窗戶貼了膠帶（颱風準備）→ 不畫，避免小朋友以為要自己貼；窗下放了吸水毛巾
 d+=`<rect x="${n(wx+6*s)}" y="${n(wy+wh+2*s)}" width="${n(ww-12*s)}" height="${n(8*s)}" rx="${n(4*s)}" fill="#8AC8F0"/>`;
 // 看板（圖示：趴下、掩護、穩住三個小人，沒有字）
 if(!P||true){const bx=P?W*.62:W*.44,by=P?H*.36:H*.14,bw=(P?110:180)*s,bh=(P?70:96)*s;
  d+=`<rect x="${n(bx-bw/2)}" y="${n(by)}" width="${n(bw)}" height="${n(bh)}" rx="${n(8*s)}" fill="#FFFFFF" stroke="#FF9A5A" stroke-width="${n(4*s)}"/>`;
  const fig=(x,y,k,sz)=>{const c='#3A6AC8';if(k===0)return `<circle cx="${n(x)}" cy="${n(y-6*sz)}" r="${n(4*sz)}" fill="${c}"/><path d="M${n(x-10*sz)} ${n(y+6*sz)} Q${n(x)} ${n(y-4*sz)} ${n(x+10*sz)} ${n(y+6*sz)}" stroke="${c}" stroke-width="${n(4*sz)}" fill="none" stroke-linecap="round"/>`;
   if(k===1)return `<rect x="${n(x-12*sz)}" y="${n(y-12*sz)}" width="${n(24*sz)}" height="${n(4*sz)}" fill="#B87A3E"/><path d="M${n(x-9*sz)} ${n(y-8*sz)} V${n(y+8*sz)} M${n(x+9*sz)} ${n(y-8*sz)} V${n(y+8*sz)}" stroke="#B87A3E" stroke-width="${n(2.4*sz)}"/><circle cx="${n(x-1*sz)}" cy="${n(y)}" r="${n(3.6*sz)}" fill="${c}"/><path d="M${n(x-6*sz)} ${n(y+7*sz)} Q${n(x+2*sz)} ${n(y+1*sz)} ${n(x+6*sz)} ${n(y+7*sz)}" stroke="${c}" stroke-width="${n(3.6*sz)}" fill="none" stroke-linecap="round"/>`;
   return `<rect x="${n(x-12*sz)}" y="${n(y-12*sz)}" width="${n(24*sz)}" height="${n(4*sz)}" fill="#B87A3E"/><path d="M${n(x-9*sz)} ${n(y-8*sz)} V${n(y+8*sz)} M${n(x+9*sz)} ${n(y-8*sz)} V${n(y+8*sz)}" stroke="#B87A3E" stroke-width="${n(2.4*sz)}"/><circle cx="${n(x-1*sz)}" cy="${n(y)}" r="${n(3.6*sz)}" fill="${c}"/><path d="M${n(x+4*sz)} ${n(y-2*sz)} L${n(x+9*sz)} ${n(y+6*sz)}" stroke="#FF6A4A" stroke-width="${n(2.4*sz)}" stroke-linecap="round"/><path d="M${n(x-6*sz)} ${n(y+7*sz)} Q${n(x+2*sz)} ${n(y+1*sz)} ${n(x+6*sz)} ${n(y+7*sz)}" stroke="${c}" stroke-width="${n(3.6*sz)}" fill="none" stroke-linecap="round"/>`};
  const sz=bw/180*1.6;[0,1,2].forEach(k=>{d+=fig(bx-bw*.32+k*bw*.32,by+bh*.55,k,sz)});
  d+=`<path d="M${n(bx-bw*.18)} ${n(by+bh*.55)} l${n(8*sz)} 0 l${n(-3*sz)} ${n(-3*sz)} M${n(bx+bw*.14)} ${n(by+bh*.55)} l${n(8*sz)} 0 l${n(-3*sz)} ${n(-3*sz)}" stroke="#FF9A5A" stroke-width="${n(2*sz)}" fill="none"/>`}
 // 架子：防災包、手電筒、水
 const sx=P?W*.8:W*.84,sy=FY-(P?150:170)*s;
 d+=`<rect x="${n(sx-70*s)}" y="${n(sy)}" width="${n(140*s)}" height="${n(8*s)}" fill="#A87A4E"/><rect x="${n(sx-70*s)}" y="${n(sy+70*s)}" width="${n(140*s)}" height="${n(8*s)}" fill="#A87A4E"/><path d="M${n(sx-66*s)} ${n(sy)} V${n(FY)} M${n(sx+66*s)} ${n(sy)} V${n(FY)}" stroke="#8A6040" stroke-width="${n(6*s)}"/>`;
 d+=T(sx-38*s,sy-2*s,s,`<path d="M-20 0 Q-22 -40 0 -42 Q22 -40 20 0Z" fill="#FF6A4A"/><rect x="-14" y="-24" width="28" height="16" rx="4" fill="#FF9A7A"/><path d="M-6 -16 h12 M0 -22 v12" stroke="#FFFFFF" stroke-width="3"/><path d="M-10 -40 Q0 -54 10 -40" stroke="#C8462A" stroke-width="3" fill="none"/>`);
 d+=T(sx+10*s,sy-2*s,s,`<rect x="-6" y="-30" width="12" height="30" rx="3" fill="#8AD0F0"/><rect x="-4" y="-34" width="8" height="5" rx="1" fill="#3A8AD0"/><rect x="10" y="-26" width="12" height="26" rx="3" fill="#8AD0F0"/><rect x="12" y="-30" width="8" height="5" rx="1" fill="#3A8AD0"/>`);
 d+=T(sx+48*s,sy-2*s,s,`<rect x="-14" y="-12" width="22" height="12" rx="3" fill="#FFD24D"/><path d="M8 -14 L16 -18 V6 L8 2Z" fill="#E8B030"/><circle cx="-8" cy="-6" r="2" fill="#B88A1A"/>`);
 d+=T(sx-30*s,sy+68*s,s,`<rect x="-16" y="-24" width="32" height="24" rx="4" fill="#E8E2D4"/><path d="M-16 -16 H16" stroke="#C8BEAC" stroke-width="2"/><rect x="22" y="-20" width="26" height="20" rx="3" fill="#FFB84A"/>`);
 // 演習用的堅固桌子（中間偏左；桌下有小坐墊）
 const tx=P?W*.32:W*.3,tw=(P?150:200)*s,ty=FY+(P?40:30)*s;
 d+=`<ellipse cx="${n(tx)}" cy="${n(ty+4*s)}" rx="${n(tw*.6)}" ry="${n(10*s)}" fill="#6A5A4A" opacity=".2"/><rect x="${n(tx-tw/2)}" y="${n(ty-70*s)}" width="${n(tw)}" height="${n(14*s)}" rx="${n(4*s)}" fill="url(#${g}tb)"/><path d="M${n(tx-tw/2+10*s)} ${n(ty-58*s)} V${n(ty)} M${n(tx+tw/2-10*s)} ${n(ty-58*s)} V${n(ty)}" stroke="#9A6A3A" stroke-width="${n(8*s)}" stroke-linecap="round"/>`;
 d+=`<ellipse cx="${n(tx)}" cy="${n(ty-8*s)}" rx="${n(30*s)}" ry="${n(8*s)}" fill="#FFB8C8"/>`;
 // 牆上一個綠色「緊急出口」小人圖示（沒有字）
 d+=`<rect x="${n(W*(P?.36:.66))}" y="${n(H*(P?.14:.1))}" width="${n(46*s)}" height="${n(26*s)}" rx="${n(3*s)}" fill="#2EA85A"/>`+T(W*(P?.36:.66)+16*s,H*(P?.14:.1)+13*s,s*.9,`<circle cx="0" cy="-7" r="3" fill="#FFFFFF"/><path d="M0 -3 L-2 5 L-7 10 M-2 5 L4 10 M-1 -1 L6 2 M-1 -1 L-7 1" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M12 -8 V8" stroke="#FFFFFF" stroke-width="2"/>`);
 return d}

// ───────── 40 森林營地（傍晚：粉橘天空、針葉林、帳篷、營火；晚上版：星空、月亮、螢火蟲） ─────────
function camp(W,H,NT){const {P,s}=sc(W,H);const GY=H*(P?.66:.64);const g=uid(NT?'cn':'cp');let d=`<defs>
 ${NT?lg(g+'sky',[[0,'#121A44'],[.6,'#2A2A6A'],[1,'#4A3A7A']]):lg(g+'sky',[[0,'#7A9AE0'],[.5,'#FFB8A0'],[1,'#FFE0A8']])}
 ${lg(g+'gr',NT?[[0,'#2A4A3A'],[1,'#1A2E28']]:[[0,'#6AA84E'],[1,'#3E7A36']])}${rg(g+'fire',[[0,'#FFE08A',.9],[.4,'#FFB04A',.45],[1,'#FF8A3A',0]])}
 ${lg(g+'tn1',[[0,'#FF9A5A'],[1,'#E8703A']],1,0)}${lg(g+'tn2',[[0,'#5AB8E8'],[1,'#3A88C8']],1,0)}</defs>`;
 d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="url(#${g}sky)"/>`;
 const r=rng(40);
 if(NT){for(let i=0;i<70;i++){const x=-400+r()*(W+800),y=r()*GY*.8;d+=`<circle${i%3?'':A('rd4tw',(i*.37)%3)} cx="${n(x)}" cy="${n(y)}" r="${n((.8+r()*1.4)*s)}" fill="#FFF6D0"/>`}
  d+=`<circle cx="${n(W*(P?.78:.82))}" cy="${n(H*.14)}" r="${n(26*s)}" fill="#FFF3C0"/><circle cx="${n(W*(P?.78:.82)+10*s)}" cy="${n(H*.14-6*s)}" r="${n(24*s)}" fill="#2A2A6A"/>`;
  d+=`<path d="${star5(W*.2,H*.12,8*s)}" fill="#FFE27A"${A('rd4tw',1)}/>`}
 else{d+=`<circle cx="${n(W*(P?.7:.72))}" cy="${n(GY-30*s)}" r="${n(40*s)}" fill="#FFD27A" opacity=".9"/>`;d+=`<g${A('rd4dr',2)}>${cloud(W*.2,H*.14,s*.8,'#FFE6EE',.9)}${cloud(W*.6,H*.08,s*.6,'#FFF0E0',.85)}</g>`}
 // 遠山、針葉林
 d+=`<path d="M-400 ${n(GY-40*s)} L${n(W*.1)} ${n(GY-120*s)} L${n(W*.3)} ${n(GY-60*s)} L${n(W*.55)} ${n(GY-140*s)} L${n(W*.8)} ${n(GY-70*s)} L${W+400} ${n(GY-110*s)} V${n(GY)} H-400Z" fill="${NT?'#2A3260':'#8A86C0'}" opacity=".9"/>`;
 for(let i=0;i<30;i++){const x=-400+i*(W+800)/30+r()*16*s;d+=pine(x,GY+4*s,(50+r()*50)*s,NT?'#1E3A34':'#3E6A4A',NT?'#284A40':'#4E7E5A')}
 d+=`<rect x="-400" y="${n(GY)}" width="${W+800}" height="${n(H-GY+10)}" fill="url(#${g}gr)"/>`;
 d+=grassBlades(-400,W+400,GY+8*s,16*s,NT?'#2A4E3E':'#5A9A44',401,7*s);
 // 帳篷兩頂（左）
 const tent=(x,y,w,fill,door)=>`<ellipse cx="${n(x)}" cy="${n(y+2*s)}" rx="${n(w*.62)}" ry="${n(8*s)}" fill="#000" opacity=".15"/><path d="M${n(x-w/2)} ${n(y)} L${n(x)} ${n(y-w*.66)} L${n(x+w/2)} ${n(y)}Z" fill="${fill}"/><path d="M${n(x)} ${n(y-w*.66)} L${n(x+w/2)} ${n(y)} L${n(x+w*.1)} ${n(y)}Z" fill="#000" opacity=".12"/><path d="M${n(x-w*.14)} ${n(y)} L${n(x)} ${n(y-w*.4)} L${n(x+w*.14)} ${n(y)}Z" fill="${door}"/><path d="M${n(x)} ${n(y-w*.66)} V${n(y-w*.76)}" stroke="#6A4A32" stroke-width="${n(2.4*s)}"/>`;
 const tx=W*(P?.2:.16),ty=GY+(P?40:30)*s;
 d+=tent(tx,ty,(P?100:130)*s,`url(#${g}tn1)`,NT?'#FFD27A':'#8A3A2A')+tent(tx+(P?90:130)*s,ty-18*s,(P?80:100)*s,`url(#${g}tn2)`,NT?'#FFE0A0':'#2A4A7A');
 // 營火（中間偏右下，在主角左邊）：石頭圍一圈、木柴、火焰（rd4tw 閃，不放大縮小）
 const fx=W*(P?.52:.5),fy=H*(P?.84:.86);
 d+=`<circle cx="${n(fx)}" cy="${n(fy-20*s)}" r="${n(110*s)}" fill="url(#${g}fire)"/>`;
 d+=`<path d="M${n(fx-26*s)} ${n(fy)} L${n(fx+26*s)} ${n(fy-12*s)} M${n(fx-26*s)} ${n(fy-12*s)} L${n(fx+26*s)} ${n(fy)}" stroke="#7A4A2A" stroke-width="${n(8*s)}" stroke-linecap="round"/>`;
 d+=`<path d="M${n(fx-16*s)} ${n(fy-6*s)} Q${n(fx-20*s)} ${n(fy-34*s)} ${n(fx-4*s)} ${n(fy-50*s)} Q${n(fx-2*s)} ${n(fy-30*s)} ${n(fx+6*s)} ${n(fy-40*s)} Q${n(fx+20*s)} ${n(fy-26*s)} ${n(fx+16*s)} ${n(fy-6*s)}Z" fill="#FF8A3A"/>`;
 d+=`<path${A('rd4tw',0,1.4)} d="M${n(fx-8*s)} ${n(fy-6*s)} Q${n(fx-10*s)} ${n(fy-24*s)} ${n(fx)} ${n(fy-34*s)} Q${n(fx+10*s)} ${n(fy-22*s)} ${n(fx+8*s)} ${n(fy-6*s)}Z" fill="#FFD24D"/>`;
 for(let k=0;k<9;k++){const a=k/9*Math.PI*2;d+=`<ellipse cx="${n(fx+Math.cos(a)*34*s)}" cy="${n(fy-4*s+Math.sin(a)*10*s)}" rx="${n(8*s)}" ry="${n(5*s)}" fill="${NT?'#6A6A7A':'#9A9AA6'}"/>`}
 for(let k=0;k<5;k++)d+=`<circle${A('rd4up',k*1.6,8)} cx="${n(fx+(k-2)*6*s)}" cy="${n(fy-50*s)}" r="${n(1.6*s)}" fill="#FFD27A"/>`;
 // 木頭椅子（營火左邊）
 d+=`<rect x="${n(fx-110*s)}" y="${n(fy-14*s)}" width="${n(56*s)}" height="${n(16*s)}" rx="${n(8*s)}" fill="#9A6A42"/><ellipse cx="${n(fx-54*s)}" cy="${n(fy-6*s)}" rx="${n(5*s)}" ry="${n(8*s)}" fill="#C89A6A"/>`;
 // 掛燈串（帳篷之間）
 const lx0=tx-50*s,lx1=tx+(P?160:220)*s,ly=ty-(P?90:110)*s;let lp=`M${n(lx0)} ${n(ly)} Q${n((lx0+lx1)/2)} ${n(ly+24*s)} ${n(lx1)} ${n(ly)}`;d+=`<path d="${lp}" stroke="#5A4A3A" stroke-width="${n(1.4*s)}" fill="none"/>`;
 for(let k=1;k<8;k++){const t=k/8,x=lx0+(lx1-lx0)*t,y=ly+24*s*4*t*(1-t);d+=`<circle${A('rd4tw',k*.4,2.4)} cx="${n(x)}" cy="${n(y+4*s)}" r="${n(3.4*s)}" fill="${['#FFE27A','#FF9AB8','#9AE0FF'][k%3]}"/>`}
 if(NT){for(let i=0;i<12;i++){const x=r()*W,y=GY-30*s+r()*(H-GY);d+=`<g${A('rd4fl',(i*.7)%7,6+i%3)}><circle cx="${n(x)}" cy="${n(y)}" r="${n(2.4*s)}" fill="#E8FF8A"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(6*s)}" fill="#E8FF8A" opacity=".25"/></g>`}}
 else d+=butterflyS(W*.84,H*.44,s*.7,'#FFE07A','#F0A030',1);
 return d}
const campNight=(W,H)=>camp(W,H,1);

G.BG36={rainforest36:rainforest,meadow37:meadow,creek38:creek,safety39:safety,camp40:(W,H)=>camp(W,H,0),camp40night:campNight};
G.BG36_CH={36:'rainforest36',37:'meadow37',38:'creek38',39:'safety39',40:'camp40'};

/* ===== 題目物件（64×64） ===== */
const OBJ36={
 paperclip:`<path d="M24 54 V18 Q24 8 33 8 Q42 8 42 18 V46 Q42 52 36 52 Q30 52 30 46 V20" stroke="#8A9AB0" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M26 20 V50" stroke="#FFFFFF" stroke-width="1.2" opacity=".6"/>`,
 banana:`<path d="M14 20 Q20 52 52 46 Q56 44 52 40 Q28 40 22 16 Q18 12 14 20Z" fill="#FFD84D" stroke="#C8A020" stroke-width="2.4"/><path d="M14 20 L12 14" stroke="#7A5A2A" stroke-width="3" stroke-linecap="round"/>`,
 leaf:`<path d="M10 54 Q8 18 50 10 Q56 44 10 54Z" fill="#6CC04A" stroke="#3E8A34" stroke-width="2.4"/><path d="M12 52 Q28 32 48 14" stroke="#3E8A34" stroke-width="2" fill="none"/>`,
 acornT:`<ellipse cx="32" cy="38" rx="14" ry="16" fill="#C8863A"/><path d="M16 30 Q32 14 48 30 Q32 34 16 30Z" fill="#8A5A2A"/><path d="M32 18 V12" stroke="#6A4A2A" stroke-width="3"/>`,
 rock:`<path d="M8 50 Q6 30 22 24 Q34 16 46 24 Q60 32 56 50Z" fill="#9A928A" stroke="#6A625A" stroke-width="2.4"/><path d="M18 30 Q28 24 38 28" stroke="#C8C0B8" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 feather:`<path d="M48 8 Q22 14 16 50 L20 52 Q30 24 48 8Z" fill="#9AD0F0" stroke="#4A8AC0" stroke-width="2"/><path d="M48 8 L14 56" stroke="#4A6A90" stroke-width="2"/>`,
 apple:`<path d="M32 18 Q16 10 12 28 Q10 48 26 54 Q32 56 38 54 Q54 48 52 28 Q48 10 32 18Z" fill="#F0503C"/><path d="M32 18 Q32 10 36 6" stroke="#6A4A2A" stroke-width="3" fill="none"/><path d="M36 12 Q46 6 48 14 Q40 16 36 12Z" fill="#4CB35A"/>`,
 watermelon:`<path d="M6 30 A26 26 0 0 0 58 30Z" fill="#4CAF50"/><path d="M10 30 A22 22 0 0 0 54 30Z" fill="#FF5A6A"/>${[18,26,34,42].map((x,k)=>`<ellipse cx="${x}" cy="${36+(k%2)*4}" rx="1.6" ry="2.6" fill="#2A1A1A"/>`).join('')}`,
 sun:`<circle cx="32" cy="32" r="13" fill="#FFD24D"/>${[0,45,90,135,180,225,270,315].map(a=>`<path d="M32 12 V6" stroke="#FFB82A" stroke-width="4" stroke-linecap="round" transform="rotate(${a} 32 32)"/>`).join('')}`,
 rain:`<path d="M14 34 Q12 22 24 22 Q28 12 40 16 Q52 16 50 28 Q58 30 54 38 H16 Q10 38 14 34Z" fill="#B8C4D4"/><path d="M22 44 l-3 8 M32 44 l-3 8 M42 44 l-3 8" stroke="#3A9AE0" stroke-width="3.4" stroke-linecap="round"/>`,
 cloudy:`<path d="M10 42 Q6 28 20 26 Q24 14 38 18 Q54 16 54 32 Q60 36 56 44 H14 Q8 44 10 42Z" fill="#D8DEE8" stroke="#A8B4C4" stroke-width="2"/>`,
 typhoon:`<path d="M32 32 m-18 0 a18 18 0 1 0 18 -18" stroke="#6A8AC8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M32 32 m-9 0 a9 9 0 1 1 9 9" stroke="#8AAAE0" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="32" cy="32" r="3" fill="#4A6AA8"/>`,
 flashlight:`<rect x="10" y="26" width="30" height="14" rx="4" fill="#FFD24D" stroke="#C8962A" stroke-width="2"/><path d="M40 24 L52 18 V48 L40 42Z" fill="#E8B030" stroke="#C8962A" stroke-width="2"/><circle cx="20" cy="33" r="3" fill="#C8962A"/>`,
 twig:`<path d="M6 40 Q30 34 58 26" stroke="#8A5A32" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M30 34 L36 22 M44 30 L52 38" stroke="#8A5A32" stroke-width="3" stroke-linecap="round"/><ellipse cx="37" cy="20" rx="4" ry="2.4" fill="#6CC04A"/>`,
 lantern:`<rect x="22" y="20" width="20" height="28" rx="4" fill="#FFE8A0" stroke="#C8862A" stroke-width="2.4"/><path d="M24 20 Q32 8 40 20 M20 48 H44" stroke="#C8862A" stroke-width="3" fill="none"/><path d="M32 26 Q28 32 32 40 Q36 32 32 26Z" fill="#FF9A3A"/>`,
 tentI:`<path d="M8 52 L32 12 L56 52Z" fill="#FF9A5A"/><path d="M32 12 L56 52 H36Z" fill="#E8703A"/><path d="M26 52 L32 34 L38 52Z" fill="#8A3A2A"/>`,
 vine:`<path d="M20 4 Q34 20 26 34 Q18 48 30 60" stroke="#4E7A2E" stroke-width="4" fill="none"/><ellipse cx="34" cy="20" rx="7" ry="4" fill="#6FB24A"/><ellipse cx="18" cy="42" rx="7" ry="4" fill="#6FB24A"/>`,
};
const OBJ36_NAME={paperclip:'迴紋針',banana:'香蕉',leaf:'葉子',acornT:'橡果',rock:'石頭',feather:'羽毛',apple:'蘋果',watermelon:'西瓜',sun:'晴天',rain:'雨天',cloudy:'陰天',typhoon:'颱風',flashlight:'手電筒',twig:'樹枝',lantern:'小提燈',tentI:'帳篷',vine:'藤蔓'};
G.OBJ36=OBJ36;G.OBJ36_NAME=OBJ36_NAME;
G.install36=function(){try{if(typeof ICONART==='undefined')return;const IA=c=>`<svg viewBox="0 0 64 64" aria-hidden="true">${c}</svg>`;Object.keys(OBJ36).forEach(k=>{ICONART['i:s36'+k]=IA(OBJ36[k])})}catch(e){console.log('install36',e)}};
try{G.install36()}catch(e){}
})(typeof window!=='undefined'?window:globalThis);

// 第六季「星光大自然」角色、寵物、衣服、道具、房間、塗色、徽章、獎狀（草稿 2026-11-17，等家長看過預覽圖才算定稿）
// 星光工作室 Starlight Studio｜本檔所有角色與圖樣都是星光工作室原創，著作權與 IP 屬於星光工作室。不用任何有版權的角色或品牌。
//  CH36：新朋友（100×100 圖內容）sloth 樹懶慢慢、ladybug 瓢蟲點點、salmon 鉤吻鮭小櫻、monkey 小猴子跳跳
//  PET36：寵物小樹懶 sloth36（完整 <svg>，配件錨點 anchor）
//  S36：公主 DRESS／PAT／JK／BOOT／HAT、王子 BOY／BJ／BS、道具 PR、房間 TOY、寵物配件 PACC、塗色 PICS、徽章 BADGE／MINI、獎狀 certHTML、hook()
// 動作只用左右擺、上下、眨眼、淡入，沒有整體放大縮小。
(function(G){
const f=v=>(+v).toFixed(1);
let K=0;const id=p=>p+'_'+(++K)+Math.random().toString(36).slice(2,5);
const gl=(i,a,b,x2=0,y2=1)=>`<linearGradient id="${i}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const shadow=(rx=26)=>`<ellipse cx="50" cy="95" rx="${rx}" ry="3.4" fill="#3A2A5A" opacity=".16"/>`;
const star5=(cx,cy,R,r=R*.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,rr=i%2?r:R;d+=(i?'L':'M')+f(cx+rr*Math.cos(a))+' '+f(cy+rr*Math.sin(a))}return d+'Z'};
const mixc=(a,b,t)=>{const p=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16));const A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const eyes=(x1,x2,y,r=3.6)=>[x1,x2].map(x=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#2A1E36"/><circle cx="${f(x+r*.35)}" cy="${f(y-r*.4)}" r="${f(r*.38)}" fill="#fff"/>`).join('');
const leafD=(x,y,l,a)=>`<path d="M0 0 Q${f(-l*.4)} ${f(-l*.5)} 0 ${f(-l)} Q${f(l*.4)} ${f(-l*.5)} 0 0Z" transform="translate(${f(x)} ${f(y)}) rotate(${a})"/>`;

/* ===================== 1. 新朋友（100×100） ===================== */
// 樹懶慢慢：灰褐色毛、淺色臉、眼睛周圍深色眼帶、大大的笑、長手臂勾著樹枝
const SL={b:'#A8927A',d:'#7E6A56',l:'#C8B49A',face:'#F2E2C8',mask:'#5A4636',claw:'#F4EEDC'};
function slothBody(g,expr){const e=expr||'normal';
 return `<defs>${gl(g+'b',SL.l,SL.b)}${gl(g+'f',SL.face,'#E6D0B0')}</defs>
 <path d="M6 22 Q50 14 94 22" stroke="#7A5A3A" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M80 20 q4 -8 12 -8" stroke="#7A5A3A" stroke-width="3" fill="none"/><ellipse cx="90" cy="12" rx="5" ry="2.6" fill="#7FC05A"/>
 <path d="M26 24 Q22 44 32 58" stroke="url(#${g}b)" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M74 24 Q78 44 68 58" stroke="url(#${g}b)" stroke-width="11" fill="none" stroke-linecap="round"/>
 ${[22,26,30].map(x=>`<path d="M${x} 24 q-1 -6 2 -8" stroke="${SL.claw}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}${[70,74,78].map(x=>`<path d="M${x} 24 q1 -6 -2 -8" stroke="${SL.claw}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}
 <ellipse cx="50" cy="66" rx="24" ry="24" fill="url(#${g}b)"/><path d="M34 60 q6 6 0 12 M66 60 q-6 6 0 12 M44 78 q6 4 12 0" stroke="${SL.d}" stroke-width="1.6" fill="none" opacity=".6"/>
 <path d="M34 86 Q30 92 36 94 M66 86 Q70 92 64 94" stroke="${SL.b}" stroke-width="8" fill="none" stroke-linecap="round"/>
 <ellipse cx="50" cy="46" rx="20" ry="17" fill="url(#${g}b)"/><ellipse cx="50" cy="48" rx="16" ry="12.4" fill="url(#${g}f)"/>
 <path d="M34 44 Q40 38 46 46 Q42 52 36 50Z M66 44 Q60 38 54 46 Q58 52 64 50Z" fill="${SL.mask}"/>
 ${e==='sleep'?`<path d="M38 46 q3 2 6 0 M56 46 q3 2 6 0" stroke="#F6EAD6" stroke-width="1.6" fill="none" stroke-linecap="round"/>`:`<g class="blink" style="transform-origin:50px 46px">${eyes(41,59,46,2.8)}</g>`}
 <ellipse cx="50" cy="52" rx="3.6" ry="2.6" fill="#3A2A22"/><path d="M42 56 Q50 ${e==='happy'?64:61} 58 56" stroke="#3A2A22" stroke-width="1.8" fill="${e==='happy'?'#E88A8A':'none'}" stroke-linecap="round"/>
 <circle cx="36" cy="56" r="3" fill="#FFB0A0" opacity=".6"/><circle cx="64" cy="56" r="3" fill="#FFB0A0" opacity=".6"/>`}
const slothAN=e=>slothBody(id('sl'),e);
// 瓢蟲點點：紅色圓殼、黑點、黑頭、觸角、腮紅
function ladybugAN(){const g=id('lb');return `<defs>${gl(g+'s','#FF6A5A','#D8302A')}</defs>${shadow(24)}
 ${[[30,74],[50,80],[70,74]].map(([x,y])=>`<path d="M${x} ${y} l${x<50?-8:x>50?8:0} 10" stroke="#2A1A1A" stroke-width="2.4" stroke-linecap="round"/>`).join('')}
 <path d="M44 22 Q38 8 30 8 M56 22 Q62 8 70 8" stroke="#2A1A1A" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="30" cy="8" r="3" fill="#2A1A1A"/><circle cx="70" cy="8" r="3" fill="#2A1A1A"/>
 <ellipse cx="50" cy="60" rx="32" ry="28" fill="url(#${g}s)"/><path d="M50 34 V88" stroke="#2A1A1A" stroke-width="2"/>
 ${[[36,52,5],[64,52,5],[32,70,4.4],[68,70,4.4],[44,80,3.6],[56,80,3.6]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#2A1A1A"/>`).join('')}
 <path d="M28 46 Q34 38 42 38" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/>
 <ellipse cx="50" cy="32" rx="17" ry="13" fill="#2A1A1A"/><g class="blink" style="transform-origin:50px 30px">${eyes(43,57,30,3.4).replace(/#2A1E36/g,'#FFFFFF').replace(/fill="#fff"/g,'fill="#2A1E36"')}</g>
 <path d="M45 37 Q50 40 55 37" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="38" cy="36" r="2.4" fill="#FF8FA8" opacity=".8"/><circle cx="62" cy="36" r="2.4" fill="#FF8FA8" opacity=".8"/>`}
// 鉤吻鮭小櫻：側面、橄欖色背、深色斑點、身上一條淡粉紅（櫻花色）、頭上一朵小櫻花
function salmonAN(){const g=id('sm');return `<defs>${gl(g+'b','#9AA86A','#E8C8B8')}</defs>${shadow(30)}
 <path d="M60 48 Q44 26 26 34 Q12 42 14 54 Q12 66 26 72 Q44 80 60 58Z" fill="url(#${g}b)" transform="translate(4 0)"/>
 <path d="M18 56 Q40 54 62 54" stroke="#F4A8B8" stroke-width="6" fill="none" opacity=".75" stroke-linecap="round"/>
 <path d="M62 52 L86 36 Q82 52 86 70 Z" fill="#8A9A5E"/><path d="M40 34 Q46 22 54 30Z" fill="#8A9A5E"/><path d="M40 74 Q46 84 52 74Z" fill="#B8A88A"/>
 ${[[32,42],[40,40],[48,44],[36,48],[52,40],[56,46],[44,48]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#4A5A3A"/>`).join('')}
 <g class="blink" style="transform-origin:26px 50px"><circle cx="26" cy="50" r="4.4" fill="#2A1E36"/><circle cx="27.6" cy="48.4" r="1.6" fill="#fff"/></g>
 <path d="M18 60 Q22 63 26 61" stroke="#5A3A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="32" cy="58" r="3" fill="#FF9FB0" opacity=".7"/>
 <g transform="translate(46 22)">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-4.4" rx="3" ry="4.6" fill="#FFC8D6" transform="rotate(${a})"/>`).join('')}<circle r="2" fill="#FF8FA8"/></g>
 <path d="M70 26 q6 -2 8 2 M74 20 q6 -2 8 2" stroke="#9AD0F0" stroke-width="1.6" fill="none" stroke-linecap="round"/>`}
// 小猴子跳跳：咖啡色、桃色臉、大耳朵、捲尾巴
function monkeyAN(){const g=id('mk');return `<defs>${gl(g+'b','#B8865A','#8A5A36')}</defs>${shadow(22)}
 <path d="M70 80 Q90 82 88 64 Q86 52 78 56 Q84 62 80 68 Q76 74 66 72" stroke="#8A5A36" stroke-width="5" fill="none" stroke-linecap="round"/>
 <ellipse cx="50" cy="72" rx="18" ry="18" fill="url(#${g}b)"/><ellipse cx="50" cy="76" rx="11" ry="11" fill="#F6D2B0"/>
 <path d="M34 66 Q24 58 26 48 M66 66 Q76 58 74 48" stroke="#8A5A36" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="26" cy="47" r="4.4" fill="#F6D2B0"/><circle cx="74" cy="47" r="4.4" fill="#F6D2B0"/>
 <path d="M40 90 v-6 M60 90 v-6" stroke="#8A5A36" stroke-width="7" stroke-linecap="round"/>
 <circle cx="27" cy="34" r="9" fill="#8A5A36"/><circle cx="73" cy="34" r="9" fill="#8A5A36"/><circle cx="27" cy="34" r="5.4" fill="#F6C2A0"/><circle cx="73" cy="34" r="5.4" fill="#F6C2A0"/>
 <circle cx="50" cy="36" r="21" fill="url(#${g}b)"/><path d="M36 38 Q36 26 46 28 Q50 24 54 28 Q64 26 64 38 Q66 50 50 52 Q34 50 36 38Z" fill="#F6D2B0"/>
 <g class="blink" style="transform-origin:50px 35px">${eyes(44,56,35,3)}</g><ellipse cx="50" cy="42" rx="3" ry="2" fill="#6A3A2A"/><path d="M44 46 Q50 51 56 46" stroke="#6A3A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
 <path d="M46 16 Q50 10 54 16" stroke="#8A5A36" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="38" cy="44" r="2.6" fill="#FF9F9F" opacity=".6"/><circle cx="62" cy="44" r="2.6" fill="#FF9F9F" opacity=".6"/>`}
G.CH36={sloth:{f:()=>slothAN('happy'),ch:36,name:'樹懶',alt:'慢慢'},ladybug:{f:ladybugAN,ch:37,name:'瓢蟲',alt:'點點'},salmon:{f:salmonAN,ch:38,name:'櫻花鉤吻鮭',alt:'小櫻'},monkey:{f:monkeyAN,ch:36,name:'小猴子',alt:'跳跳'}};
G.SLOTH36=(e='normal',a='')=>`<svg viewBox="0 0 100 100" ${a} aria-hidden="true">${slothBody(id('sl'),e)}</svg>`;

/* ===================== 2. 寵物小樹懶（120×120；頭 h、脖子 n 是配件錨點） ===================== */
function slothPet(a='',acc=''){const g=id('slp');return `<svg viewBox="0 -6 120 120" ${a} aria-hidden="true"><defs>${gl(g+'b',SL.l,SL.b)}${gl(g+'f',SL.face,'#E6D0B0')}</defs>
 <ellipse cx="60" cy="110" rx="30" ry="4" fill="#3A2A5A" opacity=".16"/>
 <path d="M36 98 Q30 104 38 108 M84 98 Q90 104 82 108" stroke="${SL.b}" stroke-width="10" fill="none" stroke-linecap="round"/>
 <ellipse cx="60" cy="80" rx="30" ry="28" fill="url(#${g}b)"/><ellipse cx="60" cy="86" rx="18" ry="16" fill="${SL.l}" opacity=".7"/>
 <g class="rd4sw" style="animation-duration:7s;transform-origin:30% 20%"><path d="M34 70 Q20 84 30 98" stroke="url(#${g}b)" stroke-width="12" fill="none" stroke-linecap="round"/>${[26,30,34].map(x=>`<path d="M${x} 98 q-1 6 2 8" stroke="${SL.claw}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
 <path d="M86 70 Q100 84 90 98" stroke="url(#${g}b)" stroke-width="12" fill="none" stroke-linecap="round"/>${[86,90,94].map(x=>`<path d="M${x} 98 q1 6 -2 8" stroke="${SL.claw}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}
 <ellipse cx="60" cy="46" rx="27" ry="23" fill="url(#${g}b)"/><path d="M38 34 q6 -10 14 -10 M82 34 q-6 -10 -14 -10" stroke="${SL.d}" stroke-width="1.6" fill="none" opacity=".6"/>
 <ellipse cx="60" cy="49" rx="21" ry="16" fill="url(#${g}f)"/>
 <path d="M38 44 Q46 36 54 46 Q50 54 41 51Z M82 44 Q74 36 66 46 Q70 54 79 51Z" fill="${SL.mask}"/>
 <g class="blink" style="transform-origin:60px 46px">${eyes(48,72,46,3.4)}</g>
 <ellipse cx="60" cy="54" rx="4.4" ry="3.2" fill="#3A2A22"/><path d="M51 59 Q60 66 69 59" stroke="#3A2A22" stroke-width="2" fill="#E88A8A" stroke-linecap="round"/>
 <circle cx="42" cy="58" r="3.6" fill="#FFB0A0" opacity=".6"/><circle cx="78" cy="58" r="3.6" fill="#FFB0A0" opacity=".6"/>
 <path d="M54 25 Q60 18 66 25" stroke="${SL.d}" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`}
G.PET36={sloth36:slothPet,anchor:{h:[60,24],n:[60,66],s:1.05}};
G.PET36_NAME={sloth36:'小樹懶'};

/* ===================== 3. 衣服（公主、王子都合身；接法照 chars31.js） ===================== */
const S36=G.S36={ver:'2026-11-17'};
S36.DRESS={
 // 37 探險背心裝：葉綠色短洋裝（小葉子花紋）、卡其色多口袋背心、胸前繩子掛一支放大鏡、咖啡色登山短靴、探險帽（idol.hat）
 dress37:{shape:'short',c:'#8CC46A',l:'#E4F4D4',dk:'#5A8E3E',pat:'s36leaf',pc:'#E4F4D4',idol:{s36:'vest',vs:'#D2B07A',vse:'#9A7A44',hat:'safari',bt:'#8A5A36'}},
 // 39 雨衣雨鞋：鵝黃色雨衣（反光條、大口袋、鈕扣）、雨帽（idol.hat）、亮藍色高筒雨鞋
 dress39:{shape:'short',c:'#FFD84A',l:'#FFF4B0',dk:'#E0A820',pat:'s36rain',pc:'#FFFFFF',idol:{s36:'rain',sl:'#FFD84A',se:'#E0A820',hat:'rain',bt:'#3A8AE0'}}};
S36.DRESS_NAME={dress37:'探險背心裝',dress39:'雨衣雨鞋'};
S36.PAT={
 s36leaf:(x,y,c,i)=>{if(i!==0)return '';let o='';for(let k=0;k<22;k++){const xx=26+((k*29)%70),yy=103+((k*17)%34);o+=`<g fill="#5A9A3E" opacity=".75">${leafD(xx,yy,5.4,(k*47)%180-90)}</g>`}return o},
 s36rain:(x,y,c,i)=>{if(i!==0)return '';
  return `<path d="M24 128 Q60 136 96 128 L97 132 Q60 140 23 132Z" fill="#E8F4FF" opacity=".9"/><path d="M24 128 Q60 136 96 128" stroke="#B8C8D8" stroke-width=".6" fill="none"/>
  <rect x="32" y="108" width="14" height="10" rx="2" fill="#F2C430" stroke="#D8A020" stroke-width=".8"/><rect x="74" y="108" width="14" height="10" rx="2" fill="#F2C430" stroke="#D8A020" stroke-width=".8"/>
  <path d="M60 100 V140" stroke="#E0A820" stroke-width="1" opacity=".8"/>`}};
const mirror=s=>`<g transform="translate(120 0) scale(-1 1)">${s}</g>`;
const longSleeve=(col,edge,cuff,hi)=>{const sl=d=>`<path d="${d}" stroke="${edge}" stroke-width="9.6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="8.2" fill="none" stroke-linecap="round"/>`;
 return sl('M41 85 Q34.4 99 37 107.4')+sl('M79 85 Q85.8 99 84 107.4')
  +`<path d="M37.4 90.4 Q34.6 98 35.6 104 M82.6 90.4 Q85.6 98 84.8 104" stroke="${hi||'#FFFFFF'}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".9"/>`
  +`<ellipse cx="37" cy="107.4" rx="5.4" ry="2.5" fill="${cuff}"/><ellipse cx="84" cy="107.4" rx="5.4" ry="2.5" fill="${cuff}"/>`};
// 放大鏡（掛在胸前；cx,cy 鏡片中心）
const magnifier=(cx,cy,r=4.6)=>`<path d="M${f(cx-r*.7)} ${f(cy+r*.7)} L${f(cx-r*1.9)} ${f(cy+r*2.1)}" stroke="#8A5A36" stroke-width="2.4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#CFEFFF" stroke="#C8962A" stroke-width="1.6"/><path d="M${f(cx-r*.5)} ${f(cy-r*.2)} Q${f(cx-r*.3)} ${f(cy-r*.6)} ${f(cx+r*.1)} ${f(cy-r*.6)}" stroke="#FFFFFF" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
S36.JK={
 vest:(g,D,J)=>{const vs=J.vs,ve=J.vse;
  // 卡其背心（左右兩片、前開、各一個大口袋）
  const half=`<path d="M45.4 78.6 Q50 77.4 53.4 78.6 L57 100.8 Q51 102 45 101Z" fill="${vs}" stroke="${ve}" stroke-width=".8"/><rect x="46.6" y="90" width="8" height="7" rx="1.4" fill="${mixc(vs,'#FFFFFF',.18)}" stroke="${ve}" stroke-width=".6"/><path d="M46.6 92 H54.6" stroke="${ve}" stroke-width=".6"/><circle cx="50.6" cy="93.2" r=".7" fill="${ve}"/>`;
  let o=half+mirror(half);
  // 繩子＋放大鏡
  o+=`<path d="M53 79 Q58 90 64 94" stroke="#C8462A" stroke-width=".9" fill="none"/>`+magnifier(66,97,3.6);
  // 胸前小葉子徽章
  o+=`<g fill="#5A9A3E">${leafD(49.6,86,4.4,-30)}</g>`;
  return o},
 rain:(g,D,J)=>{let o=longSleeve(J.sl,J.se,J.se,'#FFFFFF');
  // 雨衣前襟、反光條、鈕扣、立領
  o+=`<path d="M48 78.6 Q60 76 72 78.6 L72.4 82.4 Q60 80 47.6 82.4Z" fill="${J.sl}" stroke="${J.se}" stroke-width=".8"/>`;
  o+=`<path d="M45.4 92 Q60 95 74.6 92 L74.6 94.6 Q60 97.6 45.4 94.6Z" fill="#E8F4FF" opacity=".9"/>`;
  o+=[84,90,98].map(y=>`<circle cx="62.4" cy="${y}" r="1.2" fill="#FFFFFF" stroke="${J.se}" stroke-width=".5"/>`).join('');
  o+=`<path d="M60 82 V102" stroke="${J.se}" stroke-width=".8"/>`;
  return o}};
S36.BOOT={
 vest:J=>{const fy=166,bt=J.bt,sh=mixc(bt,'#000000',.3);return [52,66].map(x=>`<path d="M${x-4.6} ${fy-9} H${x+4.4} V${fy-3.2} Q${x+9.4} ${fy-3.2} ${x+9.4} ${fy+1.4} Q${x+9.4} ${fy+3.4} ${x+6.8} ${fy+3.4} H${x-4.8} Q${x-5.6} ${fy+3.4} ${x-5.4} ${fy+1}Z" fill="${bt}" stroke="${sh}" stroke-width=".7"/><path d="M${x-2} ${fy-7} l3 1.4 M${x-2} ${fy-4.4} l3 1.4" stroke="#F6E2C0" stroke-width=".8"/><path d="M${x-5.4} ${fy+2} H${x+9.4}" stroke="${sh}" stroke-width="1.6"/><path d="M${x-4.6} ${fy-9} H${x+4.4}" stroke="#E6D2A8" stroke-width="1.6"/>`).join('')},
 rain:J=>{const fy=166,bt=J.bt,sh=mixc(bt,'#000000',.25);return [52,66].map(x=>`<path d="M${x-5} ${fy-20} H${x+5} V${fy-3.2} Q${x+9.6} ${fy-3.2} ${x+9.6} ${fy+1.2} Q${x+9.6} ${fy+3.4} ${x+7} ${fy+3.4} H${x-5} Q${x-5.8} ${fy+3.4} ${x-5.6} ${fy+1}Z" fill="${bt}" stroke="${sh}" stroke-width=".7"/><path d="M${x-3.4} ${fy-18} V${fy-6}" stroke="#FFFFFF" stroke-width="1.4" opacity=".6" stroke-linecap="round"/><circle cx="${x+1}" cy="${fy-12}" r="1.4" fill="#FFD84A"/><path d="M${x-5.6} ${fy+2} H${x+9.6}" stroke="${sh}" stroke-width="1.6"/>`).join('')}};
// 帽子（公主 120×172；跟 S31.HAT.p 同一個位置）
S36.HAT={
 safari:()=>`<g class="s36hat"><ellipse cx="60" cy="29" rx="27" ry="6.4" fill="#C8A46A" stroke="#9A7A44" stroke-width="1"/><path d="M42 29 Q42 10 60 9 Q78 10 78 29Z" fill="#D8B47A" stroke="#9A7A44" stroke-width="1"/><path d="M42 25 Q60 29 78 25 L78 28.4 Q60 32.4 42 28.4Z" fill="#6A9A3E"/><g fill="#5A9A3E">${leafD(70,26,6,40)}</g><path d="M48 14 Q54 11 60 11" stroke="#F2DCB0" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`,
 rain:()=>`<g class="s36hat"><path d="M36 31 Q34 24 42 22 Q44 8 60 8 Q76 8 78 22 Q88 26 88 34 Q78 30 60 30 Q46 30 36 31Z" fill="#FFD84A" stroke="#E0A820" stroke-width="1.1"/><path d="M44 22 Q60 18 76 22" stroke="#E0A820" stroke-width="1" fill="none"/><path d="M48 13 Q54 10 60 10" stroke="#FFF4B0" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`};
S36.BOY={
 // 37 探險背心裝：淺綠襯衫、卡其多口袋背心、胸前放大鏡、咖啡色登山鞋
 b_vest37:{n:'探險背心裝',k:'jacket',c:'#A8D88A',l:'#E4F6D6',p:'#6A6A4A',s:'#8A5A36',s36:{t:'vest',vs:'#D2B07A',vse:'#9A7A44'},chapter:37},
 // 39 雨衣雨鞋：鵝黃雨衣（反光條、鈕扣）、藍色雨鞋
 b_rain39:{n:'雨衣雨鞋',k:'jacket',c:'#FFD84A',l:'#FFF4B0',p:'#3A5A8A',s:'#3A8AE0',zip:0,s36:{t:'rain',se:'#E0A820'},chapter:39}};
S36.BJ={
 vest:(g,F,J)=>{const vs=J.vs,ve=J.vse;const half=`<path d="M44 79 Q50 77.4 54 79 L56.6 104 H44.6 Q42.8 92 44 79Z" fill="${vs}" stroke="${ve}" stroke-width=".8"/><rect x="45.6" y="92" width="8.4" height="7.4" rx="1.4" fill="${mixc(vs,'#FFFFFF',.18)}" stroke="${ve}" stroke-width=".6"/><path d="M45.6 94 H54" stroke="${ve}" stroke-width=".6"/>`;
  return half+mirror(half)+`<path d="M54 80 Q59 92 64 96" stroke="#C8462A" stroke-width=".9" fill="none"/>`+magnifier(66,99,3.8)+`<g fill="#5A9A3E">${leafD(49.4,87,4.6,-30)}</g>`},
 rain:(g,F,J)=>`<path d="M42 96 Q60 99.4 78 96 L78 99 Q60 102.4 42 99Z" fill="#E8F4FF" opacity=".9"/>`+[86,92,104].map(y=>`<circle cx="62.6" cy="${y}" r="1.2" fill="#FFFFFF" stroke="${J.se}" stroke-width=".5"/>`).join('')+`<path d="M48 78 Q60 75.6 72 78 L72.4 82 Q60 79.6 47.6 82Z" fill="#FFD84A" stroke="${J.se}" stroke-width=".8"/>`};
S36.BS={
 vest:J=>`<path d="M34.2 109.6 Q34.6 111.6 35.2 113.6 M85.8 109.6 Q85.4 111.6 84.8 113.6" stroke="#E4F6D6" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
 rain:J=>`<path d="M35.6 102 Q35.4 104 36 106 M84.4 102 Q84.6 104 84 106" stroke="#E8F4FF" stroke-width="2.4" fill="none" stroke-linecap="round"/>`};
S36.wrapPrincess=fn=>function(look,a,vb){const D=(typeof DRESS!=='undefined'&&look&&DRESS[look.dress])||null;const J=D&&D.idol;
 if(!J||!J.s36||!J.hat||!S36.HAT[J.hat])return fn.apply(this,arguments);
 const L=Object.assign({},look,{head:''});const s=fn.call(this,L,a,vb);
 let i=s.lastIndexOf('</g>');const secs=s.match(/data-rs="([a-z]+)"/g);if(secs&&secs[secs.length-1]==='data-rs="head"')i=s.lastIndexOf('</g>',i-1);
 return i>0?s.slice(0,i)+S36.HAT[J.hat]()+s.slice(i):s};

/* ===================== 3b. 道具「營地小提燈」prop40（右手 84,113 提著） ===================== */
S36.PR=g=>({prop40:`<g><path d="M84 113 V117" stroke="#8A5A36" stroke-width="1.6"/><path d="M79 119 Q84 112 89 119" stroke="#8A5A36" stroke-width="1.6" fill="none"/>
 <rect x="78.4" y="119" width="11.2" height="3" rx="1" fill="#6A4A2A"/><rect x="79.4" y="122" width="9.2" height="14" rx="2.4" fill="#FFF0B0" stroke="#C8862A" stroke-width="1"/>
 <path d="M84 125 Q81.6 129 84 133.4 Q86.4 129 84 125Z" fill="#FF9A3A" class="rd4tw" style="animation-duration:1.6s"/><rect x="78.4" y="136" width="11.2" height="3" rx="1" fill="#6A4A2A"/>
 <circle cx="84" cy="129" r="9" fill="#FFE27A" opacity=".22"/></g>`});
S36.PR.prop40=S36.PR('').prop40;
S36.PR_NAME={prop40:'營地小提燈'};

/* ===================== 3c. 寵物配件 pacc38 小樹葉帽（頭頂，獨角獸座標 頭 85,24） ===================== */
S36.PACC={pacc38:(g)=>`<g fill="#6CC04A" stroke="#3E8A34" stroke-width=".8">${leafD(78,26,14,-40)}${leafD(92,26,14,40)}${leafD(85,25,16,0)}</g><path d="M85 25 V12" stroke="#3E8A34" stroke-width="1" /><circle cx="85" cy="25.6" r="2.6" fill="#FF8FA8" stroke="#E86A8A" stroke-width=".5"/>`};
S36.PACC_NAME={pacc38:'小樹葉帽'};S36.PACC_HEAD=['pacc38'];

/* ===================== 4. 房間（100×100 完整 <svg>）：昆蟲觀察箱（門打開著，看完放走）、小帳篷 ===================== */
S36.TOY={
 bugbox37:`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="40" ry="4" fill="#000" opacity=".12"/>
  <rect x="16" y="38" width="62" height="50" rx="6" fill="#E8F8FF" stroke="#4A9AC8" stroke-width="2.4" opacity=".95"/><rect x="14" y="30" width="66" height="10" rx="4" fill="#4AB86A"/>
  ${[22,30,38,46,54,62,70].map(x=>`<path d="M${x} 31 V39" stroke="#2E8A4A" stroke-width="1.4"/>`).join('')}<path d="M40 30 Q47 20 54 30" stroke="#2E8A4A" stroke-width="2.4" fill="none"/>
  <path d="M20 86 Q30 70 40 86 M44 86 Q54 66 66 86" fill="#6CC04A"/><path d="M30 86 Q34 64 40 60" stroke="#4E9A3A" stroke-width="2" fill="none"/><ellipse cx="42" cy="60" rx="8" ry="4" fill="#7FCC5A" transform="rotate(-20 42 60)"/>
  <g transform="translate(54 70) scale(.5)"><ellipse rx="10" ry="8" fill="#E8403A"/><path d="M0 -8 V8" stroke="#2A1A1A" stroke-width="1.4"/><circle cx="-4" cy="-2" r="2" fill="#2A1A1A"/><circle cx="4" cy="3" r="2" fill="#2A1A1A"/><circle cx="0" cy="-10" r="4.4" fill="#2A1A1A"/></g>
  <path d="M78 44 L92 36 V80 L78 84" fill="#E8F8FF" stroke="#4A9AC8" stroke-width="2"/><circle cx="88" cy="58" r="1.6" fill="#4A9AC8"/>
  <g class="rd4fl" style="animation-duration:6s"><path d="M92 26 q-6 -8 -10 -2 q-1 6 10 2Z M92 26 q6 -8 10 -2 q1 6 -10 2Z" fill="#FFB84A"/></g>
  <path d="M22 44 Q26 40 32 40" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/></svg>`,
 tent40:`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="93" rx="44" ry="5" fill="#000" opacity=".12"/>
  <path d="M8 90 L50 22 L92 90Z" fill="#FF9A5A"/><path d="M50 22 L92 90 H58Z" fill="#E8703A"/><path d="M38 90 L50 52 L62 90Z" fill="#FFE8A0"/><path d="M50 52 L62 90 H54Z" fill="#F2C870"/>
  <path d="M50 22 V12" stroke="#7A5A3A" stroke-width="2.6"/><path d="M50 12 l12 4 l-12 4Z" fill="#5AB8E8"/>
  <path d="M18 74 Q50 58 82 74" stroke="#6A4A32" stroke-width="1" fill="none"/>${[26,38,50,62,74].map((x,k)=>`<path d="M${x} ${f(70-Math.sin((x-18)/64*Math.PI)*12)} l3 6 l3 -6Z" fill="${['#FFD24D','#FF8FB8','#7FD0FF','#8FE0A8','#B89CFF'][k]}"/>`).join('')}
  <circle cx="50" cy="78" r="5" fill="#FFF6D0" opacity=".9"/></svg>`};
S36.TOY_NAME={bugbox37:'昆蟲觀察箱',tent40:'小帳篷'};

/* ===================== 5. 塗色本（200×200；r＝可以塗的區塊，deco＝畫在線上面、不能塗的裝飾） ===================== */
const CR=(t,a)=>[t,a];
S36.PICS=[
 {n:'樹懶慢慢',cat:'adv',lv:1,scene:'熱帶雨林（第 36 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('path','d="M0 30 Q100 14 200 30 L200 40 Q100 24 0 40Z"'),
  CR('path','d="M60 40 Q50 80 70 110 L82 104 Q66 80 74 42Z"'),CR('path','d="M140 40 Q150 80 130 110 L118 104 Q134 80 126 42Z"'),
  CR('ellipse','cx="100" cy="138" rx="46" ry="44"'),CR('ellipse','cx="100" cy="146" rx="26" ry="24"'),
  CR('ellipse','cx="100" cy="96" rx="40" ry="34"'),CR('ellipse','cx="100" cy="100" rx="30" ry="22"'),
  CR('path','d="M72 92 Q82 80 92 94 Q86 104 76 100Z"'),CR('path','d="M128 92 Q118 80 108 94 Q114 104 124 100Z"'),
  CR('ellipse','cx="100" cy="108" rx="7" ry="5"'),
  CR('path','d="M10 190 Q30 150 50 190Z"'),CR('path','d="M150 190 Q170 146 192 190Z"'),
  CR('ellipse','cx="170" cy="22" rx="12" ry="6"')],
  deco:()=>`<circle cx="84" cy="94" r="3" fill="#333"/><circle cx="116" cy="94" r="3" fill="#333"/><path d="M88 116 Q100 126 112 116" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>`},
 {n:'瓢蟲和蝴蝶',cat:'adv',lv:1,scene:'春天的草地（第 37 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),CR('path','d="M0 150 Q100 130 200 150 V200 H0Z"'),
  CR('ellipse','cx="60" cy="140" rx="34" ry="28"'),CR('ellipse','cx="60" cy="110" rx="18" ry="14"'),
  CR('circle','cx="46" cy="134" r="6"'),CR('circle','cx="74" cy="134" r="6"'),CR('circle','cx="60" cy="154" r="6"'),
  CR('path','d="M140 70 Q110 30 104 60 Q100 84 140 76Z"'),CR('path','d="M140 70 Q170 30 176 60 Q180 84 140 76Z"'),
  CR('path','d="M140 76 Q116 86 120 104 Q132 108 140 80Z"'),CR('path','d="M140 76 Q164 86 160 104 Q148 108 140 80Z"'),
  CR('rect','x="137" y="56" width="6" height="40" rx="3"'),
  CR('circle','cx="150" cy="150" r="12"'),CR('circle','cx="174" cy="166" r="10"'),CR('circle','cx="24" cy="30" r="16"')],
  deco:()=>`<path d="M54 98 Q50 86 44 84 M66 98 Q70 86 76 84" stroke="#333" stroke-width="2.4" fill="none"/><path d="M60 112 V168" stroke="#333" stroke-width="2"/>`},
 {n:'小溪和小櫻',cat:'adv',lv:2,scene:'山上的小溪（第 38 章）',r:[
  CR('path','d="M0 0 H200 V80 H0Z"'),CR('path','d="M0 80 L40 30 L80 70 L120 20 L170 66 L200 40 V90 H0Z"'),
  CR('path','d="M0 90 H200 V120 Q140 110 100 130 Q60 150 0 130Z"'),CR('path','d="M0 130 Q60 150 100 130 Q140 110 200 120 V200 H0Z"'),
  CR('path','d="M70 156 Q90 140 116 150 Q90 168 70 156Z"'),CR('path','d="M116 150 L130 140 L130 162Z"'),
  CR('ellipse','cx="40" cy="186" rx="26" ry="12"'),CR('ellipse','cx="160" cy="184" rx="30" ry="12"'),
  CR('path','d="M20 90 L30 60 L40 90Z"'),CR('path','d="M170 92 L182 58 L194 92Z"'),CR('circle','cx="160" cy="24" r="14"')],
  deco:()=>`<circle cx="80" cy="153" r="2.4" fill="#333"/><path d="M90 150 l4 0 M98 152 l4 0" stroke="#333" stroke-width="2"/>`},
 {n:'森林露營',cat:'adv',lv:2,scene:'森林營地（第 40 章）',r:[
  CR('rect','x="0" y="0" width="200" height="130"'),CR('path','d="M0 130 H200 V200 H0Z"'),
  CR('path','d="M20 150 L70 64 L120 150Z"'),CR('path','d="M58 150 L70 110 L82 150Z"'),
  CR('path','d="M140 130 L160 70 L180 130Z"'),CR('path','d="M150 100 L160 60 L170 100Z"'),
  CR('path','d="M130 186 L180 176 M130 176 L180 186"'),CR('path','d="M140 176 Q146 150 156 140 Q160 156 166 150 Q172 166 168 178Z"'),
  CR('circle','cx="40" cy="30" r="14"'),CR('path','d="M100 20 l4 9 10 1 -8 6 3 10 -9 -5 -9 5 3 -10 -8 -6 10 -1Z"'),CR('path','d="M150 30 l3 6 7 1 -5 4 2 7 -7 -4 -7 4 2 -7 -5 -4 7 -1Z"')],
  deco:()=>`<path d="M130 186 L180 176 M130 176 L180 186" stroke="#333" stroke-width="5" stroke-linecap="round"/>`}];

/* ===================== 6. 徽章、小徽章（圖鑑「小守護者徽章」一排）、獎狀 ===================== */
S36.BADGE_IC=[
 `<path d="M-6 -4 Q-8 -10 -2 -10 Q4 -10 4 -4 Q8 -2 6 4 Q2 8 -4 6 Q-8 2 -6 -4Z" fill="#A8927A"/><path d="M-5 -4 Q-2 -7 0 -4 M5 -4 Q2 -7 0 -4" stroke="#5A4636" stroke-width="1.6" fill="none"/>`,
 `<ellipse cx="0" cy="1" rx="8" ry="7" fill="#E8403A"/><path d="M0 -6 V8" stroke="#2A1A1A" stroke-width="1"/><circle cx="-3" cy="0" r="1.4" fill="#2A1A1A"/><circle cx="3" cy="3" r="1.4" fill="#2A1A1A"/><circle cx="0" cy="-7" r="3" fill="#2A1A1A"/>`,
 `<path d="M-8 2 Q0 -6 8 2 Q0 8 -8 2Z" fill="#E8A0A8"/><path d="M8 2 L12 -2 V6Z" fill="#C88890"/><circle cx="-4" cy="1" r="1" fill="#2A1A2A"/>`,
 `<path d="M0 -8 L2 -2 L8 -2 L3 2 L5 8 L0 4 L-5 8 L-3 2 L-8 -2 L-2 -2Z" fill="#FFD24D"/><path d="M-9 8 Q0 2 9 8" stroke="#3A8AE0" stroke-width="2" fill="none"/>`,
 `<path d="M-8 7 L0 -8 L8 7Z" fill="#FF9A5A"/><path d="M-2 7 L0 1 L2 7Z" fill="#8A3A2A"/>`];
S36.BADGE=(a='')=>{const g='b36'+Math.random().toString(36).slice(2,7);
 const ring=S36.BADGE_IC.map((s,k)=>{const t=-Math.PI/2+k*2*Math.PI/5,x=100+Math.cos(t)*58,y=96+Math.sin(t)*58;return `<g transform="translate(${f(x)} ${f(y)})"><circle r="15" fill="#E8F6E0" stroke="#5A9A3E" stroke-width="2"/><g transform="scale(1.05)">${s}</g></g>`}).join('');
 return `<svg ${a} viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="${g}" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#F2FBEA"/><stop offset="1" stop-color="#BFE4A8"/></radialGradient></defs>
  <path d="M70 150 L56 196 L76 186 L86 200 L96 156Z" fill="#5A9A3E"/><path d="M130 150 L144 196 L124 186 L114 200 L104 156Z" fill="#3E8A5A"/>
  <circle cx="100" cy="96" r="84" fill="#FFD24D" stroke="#C8962A" stroke-width="4"/><circle cx="100" cy="96" r="76" fill="url(#${g})"/>
  <g transform="translate(100 96)"><path d="M0 -30 Q-26 -26 -24 4 Q-20 24 0 30 Q20 24 24 4 Q26 -26 0 -30Z" fill="#6CC04A" stroke="#3E8A34" stroke-width="2.4"/><path d="M0 -26 V28 M0 -8 L-14 -16 M0 4 L14 -6 M0 14 L-12 8" stroke="#3E8A34" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>${ring}</svg>`};
S36.MINI_C=['#C8E8B0','#FFD0C8','#C8E8F8','#FFE8A8','#E0D4FF'];
S36.MINI=(k,a='')=>{const c=S36.MINI_C[k]||'#E8F6E0';return `<svg ${a} viewBox="0 0 100 100" aria-hidden="true"><path d="M34 76 L26 98 L38 92 L44 100 L50 80Z M66 76 L74 98 L62 92 L56 100 L50 80Z" fill="#5A9A3E"/>
  <circle cx="50" cy="46" r="40" fill="#FFD24D" stroke="#C8962A" stroke-width="3"/><circle cx="50" cy="46" r="34" fill="${c}" stroke="#FFF6D0" stroke-width="2.4"/><g transform="translate(50 46) scale(2.6)">${S36.BADGE_IC[k]||''}</g></svg>`};
S36.certHTML=(o)=>{const F=(typeof S6FIN!=='undefined')?S6FIN:{cert_title:'大自然小守護者',cert_to:'最棒的小守護者',cert_sign:'樹懶慢慢　和大自然的朋友們',cert_body:[]};const nm=(o.name||'').trim();const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return `<div class="card certcard cert3 cert6" role="dialog" aria-label="${F.cert_title}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${F.cert_title}</div><div class="certto">頒給：<b>${nm?esc(nm):F.cert_to}</b></div>
  <div class="certbody">${F.cert_body.map(s=>s==='<br>'?'<br>':`<span>${s}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero||''}</span><span class="c3badge">${S36.BADGE()}</span><span class="u">${o.pet||''}</span></div>
  <div class="certfoot"><div><div class="certsig">${F.cert_sign}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${G.SLOTH36('happy')}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`};
S36.CERT_CSS=`.cert6 .certin{background:linear-gradient(180deg,#FBFFF4,#EAF7E2)}.cert6 .certrib{background:linear-gradient(90deg,#4E9A3E,#8CC46A)}.cert6 .certtt{color:#2E6A2E;text-shadow:0 2px 0 #DFF2D0}.cert6 .c3badge svg{height:100%;width:auto}`;

/* ===================== 7. 接進遊戲（m99z_season6 的 s6_logic.js 在設好 DRESS／BFIT 之後呼叫一次 S36.hook()） ===================== */
S36.hook=function(){if(G.__s36hooked)return;G.__s36hooked=1;const W=G;
 try{Object.keys(S36.DRESS).forEach(k=>{DRESS[k]=Object.assign({},S36.DRESS[k])});Object.assign(BFIT,S36.BOY)}catch(e){console.log('s36 reg',e)}
 try{const _patt=patt;patt=function(t,x,y,col,i){if(typeof t==='string'&&S36.PAT[t])return S36.PAT[t](x,y,col,i);return _patt.apply(this,arguments)};
  const _jk=IDOL.jacket;IDOL.jacket=function(g,D){const J=D&&D.idol;if(J&&J.s36&&S36.JK[J.s36])return S36.JK[J.s36](g,D,J);return _jk.apply(this,arguments)};
  const _jd=IDOL.jacketDefs;IDOL.jacketDefs=function(g,D){if(D&&D.idol&&D.idol.s36)return '';return _jd.apply(this,arguments)};
  const _bt=IDOL.boots;IDOL.boots=function(D,look){const J=D&&D.idol;if(J&&J.s36){if((look&&look.shoe)||!S36.BOOT[J.s36])return '';return S36.BOOT[J.s36](J)}return _bt.apply(this,arguments)};
  const _bj=IDOL.boyJacket;IDOL.boyJacket=function(g,F){const J=F&&F.s36;return (J&&S36.BJ[J.t]?S36.BJ[J.t](g,F,J):'')+_bj.apply(this,arguments)};
  const _bs=IDOL.boySleeve;IDOL.boySleeve=function(F){const J=F&&F.s36;return (J&&S36.BS[J.t]?S36.BS[J.t](J):'')+_bs.apply(this,arguments)};
  princess=S36.wrapPrincess(princess);
  if(W.RIG&&RIG.girl){RIG.girl=S36.wrapPrincess(RIG.girl)}}catch(e){console.log('s36 hook',e)}
 try{const st=document.createElement('style');st.textContent=S36.CERT_CSS;document.head.appendChild(st)}catch(e){}
 try{if(typeof install36==='function')install36()}catch(e){}};
})(typeof window!=='undefined'?window:globalThis);

// 由 s6/gen_s6.py 從 s6/data.py 產生，不要手改。2026-11-17 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）
const S6D={"36":{"name":"熱帶雨林","title":"第三十六章・熱帶雨林","cn":"三十六","tag":"雨林","bg":"rainforest36","helper0":"sloth","firstSay":"第三十六章，熱帶雨林！機器人嘀嘀收到森林的訊號，我們出發去雨林！點一下發光的樹懶，出發！","endText":"下一站：第三十七章「昆蟲小世界」！","levels":[["樹懶慢慢","sloth","樹懶慢慢",["quiz:雨林","write:ㄓ:1","zhuyin:hear6:ㄓ"],"pick","你好，我是樹懶慢慢。我動作很慢很慢，可是我會帶你認識雨林喔！"],["雨林的地面","frog","青蛙",["quiz:雨林","write:Q:1","count:s5c:60"],"box","呱呱！雨林的地上落葉好多，好多小動物住在這裡！"],["香蕉十根一串","monkey","小猴子跳跳",["quiz:雨林","write:ㄓ:2","count:s6t:100"],"chest","我是小猴子跳跳！香蕉十根一串，我們十根十根數！"],["樹幹上的朋友","butterfly","蝴蝶",["quiz:雨林","write:ㄔ:1","zhuyin:hear6:ㄔ"],"petgift","往上爬一層，樹幹上也住了好多朋友！"],["花朵不摘","bee","蜜蜂",["quiz:雨林","write:Q:2","letter:k6:Q|O"],"pick","嗡嗡！森林裡的花，用眼睛看就好，不摘下來喔！"],["大樹是動物的家","owl","貓頭鷹",["quiz:雨林","write:ㄔ:2","count:s5c:60"],"rain","咕咕！大樹是好多動物的家，我們要好好愛護它！"],["樹冠層","bird","小鳥",["quiz:雨林","zhuyin:hear6:ㄓ|ㄔ","count:s6t:100"],"box","啾啾！這裡是大樹的頭頂，陽光好亮！"],["雨林下雨了","frog","青蛙",["quiz:雨林","R:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P:3","memory"],"chest","下雨了！穿上雨衣，跟緊大人，我們繼續走！"],["慢慢來","sloth","樹懶慢慢",["quiz:雨林","write:ㄓ:3","write:ㄔ:3"],"petgift","慢慢來沒關係，一步一步，就會爬到上面！"],["爬到最上面","star","小星星",["quiz:雨林","write:Q:3","count:s5c:60","quiz:雨林"],"chapter","完成四個挑戰，就爬到雨林的最上面囉！"]],"story":["機器人嘀嘀嗶嗶叫：收到地球森林的訊號，大自然的朋友需要小守護者！","我們來到熱帶雨林，這裡常常下雨，大樹長得好高好高。","樹懶慢慢掛在樹上，慢慢地說：歡迎你們，我帶你們從最下面爬到最上面。","小守護者記得三件事：花草不亂摘、垃圾帶回家、動物的家不打擾。","我們跟著慢慢，一層一層往上爬吧！"],"story_p":"王子也來了，他說：我們一起當大自然小守護者！","story_b":"火花說：我飛一下就到樹頂了！慢慢說：慢慢走，才看得到每一層的朋友喔！","storyAt":4,"letter_p":"親愛的公主：<br>你跟著慢慢，從雨林最下面爬到最上面，認識好多住在不同高度的朋友！<br>你還學會ㄓ、ㄔ和Q。<br>下一站，我們去草地看小昆蟲！","letter_b":"王子，我本來想一下就飛到樹頂，原來慢慢爬，可以看到好多朋友！<br>你學會ㄓ、ㄔ和Q，好厲害！<br>下一站，我們去找小昆蟲！","theater":"樹懶慢慢爬到最高的樹枝，開心地跟大家揮揮手！","prize":{"pet":["sloth36","小樹懶"],"pic":"樹懶慢慢"},"gift":"你得到新的寵物小樹懶了！點「換裝間」，可以換上新的寵物喔！","q0":0,"lv":[[2,0],[5,13],[14,9],[1,12],[6,18,7],[8,15],[4,10],[16,11],[17,3,19],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]],"first":{"0":2,"4":6,"5":8,"7":16},"learn":"ㄓㄔQ"},"37":{"name":"昆蟲小世界","title":"第三十七章・昆蟲小世界","cn":"三十七","tag":"昆蟲","bg":"meadow37","helper0":"ladybug","firstSay":"第三十七章，昆蟲小世界！春天的草地上，小昆蟲都出來了！點一下發光的瓢蟲，出發！","endText":"下一站：第三十八章「山上的小溪」！","levels":[["瓢蟲點點","ladybug","瓢蟲點點",["quiz:昆蟲","write:ㄕ:1","zhuyin:hear6:ㄕ"],"pick","我是瓢蟲點點！我背上有圓圓的小黑點，歡迎來草地玩！"],["拿好放大鏡","sloth","樹懶慢慢",["quiz:昆蟲","write:R:1","count:s6two:20"],"box","拿著放大鏡，小昆蟲就看得好清楚！"],["螞蟻排隊","ladybug","瓢蟲點點",["quiz:昆蟲","write:ㄕ:2","count:s6pair"],"chest","你看，螞蟻排成長長一排，在搬食物喔！"],["蝴蝶的翅膀","butterfly","蝴蝶",["quiz:昆蟲","write:S:1","shape:s6sym"],"petgift","看看我的翅膀，左邊和右邊，花紋一樣嗎？"],["蜜蜂飛過來","bee","蜜蜂",["quiz:昆蟲","write:R:2","letter:k6:R|P"],"pick","嗡嗡！看到蜜蜂，不揮手，慢慢走開就好！"],["毛毛蟲不碰","bird","小鳥",["quiz:昆蟲","write:S:2","count:s6two:20"],"rain","啾啾！毛毛蟲身上有毛，用眼睛看，不用手碰喔！"],["左右一樣","butterfly","蝴蝶",["quiz:昆蟲","zhuyin:hear6:ㄕ|ㄓ|ㄔ","shape:s6sym"],"box","把翅膀對折看看，左右兩邊合起來一樣！"],["草叢小偵探","frog","青蛙",["quiz:昆蟲","R:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|ㄓ|ㄔ|Q:3","count:s6pair"],"chest","呱呱！去草叢玩，穿長袖長褲，回家記得洗手！"],["看完放回去","ladybug","瓢蟲點點",["quiz:昆蟲","write:ㄕ:3","write:R:3"],"petgift","看完了，把小昆蟲放回原來的地方吧！"],["昆蟲音樂會","star","小星星",["quiz:昆蟲","write:S:3","letter:k6:R|S","quiz:昆蟲"],"chapter","完成四個挑戰，昆蟲音樂會就要開始囉！"]],"story":["春天到了，草地上開滿了花，小昆蟲都出來曬太陽了。","瓢蟲點點飛過來說：我們住在草叢和花叢裡，歡迎來玩！","小守護者記得三件事：用眼睛看不用手抓、遇到蜜蜂不揮手慢慢走開、看完放回原來的地方。","拿好放大鏡，我們去草地當小偵探囉！"],"story_p":"王子拿著放大鏡說：哇，瓢蟲背上的點點，看得好清楚！","story_b":"火花說：我來把蜜蜂吹走！點點說：不要喔，不揮手，慢慢走開就好！","storyAt":3,"letter_p":"親愛的公主：<br>你拿著放大鏡，看到瓢蟲、螞蟻和蝴蝶，看完還把牠們放回原來的地方！<br>你也學會ㄕ和R、S。<br>下一站，我們去山上的小溪！","letter_b":"王子，看到蜜蜂我沒有揮手，慢慢走開就沒事了！<br>你學會ㄕ和R、S，好棒！<br>下一站，我們去山上的小溪！","theater":"小昆蟲在花叢裡開音樂會，蝴蝶跟著跳起舞來！","prize":{"dress":["dress37","探險背心裝"],"boy":["b_vest37","探險背心裝"],"room":["toy","bugbox37","昆蟲觀察箱"],"pic":"瓢蟲和蝴蝶"},"gift":"你得到新的衣服和昆蟲觀察箱了！點「換裝間」，可以換上新衣服喔！","q0":20,"lv":[[23,31],[20,32],[25,39],[24,36],[22,27,35],[21,28],[30,34],[38,29,33],[26,37],[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]],"first":{"1":20,"4":22,"5":21,"8":26},"learn":"ㄕRS"},"38":{"name":"山上的小溪","title":"第三十八章・山上的小溪","cn":"三十八","tag":"溪流","bg":"creek38","helper0":"blackbear","firstSay":"第三十八章，山上的小溪！夏天到了，我們去台灣的高山！點一下發光的黑熊，出發！","endText":"下一站：第三十九章「颱風和地震」！","levels":[["黑熊帶路","blackbear","台灣黑熊",["quiz:溪流","write:ㄖ:1","zhuyin:hear6:ㄖ"],"pick","我是台灣黑熊！山路有很多條，跟緊大人，走在步道上喔！"],["溪裡的小櫻","salmon","鉤吻鮭小櫻",["quiz:溪流","write:T:1","measure:s6m"],"box","我是櫻花鉤吻鮭小櫻，我住在清清的小溪裡！"],["量一量樹枝","sloth","樹懶慢慢",["quiz:溪流","write:ㄖ:2","measure:s6m"],"chest","迴紋針一個接一個排好，就可以量東西有多長！"],["玩水要大人陪","duck","小鴨",["quiz:溪流","write:U:1","compare:s6w"],"petgift","呱呱！不可以自己去溪邊玩水，一定要大人陪！"],["穿上救生衣","frog","青蛙",["quiz:溪流","write:T:2","letter:k6:T|U"],"pick","呱呱！在溪邊玩水，要穿救生衣喔！"],["溪水變黃了","deer","小鹿",["quiz:溪流","write:U:2","compare:s6w"],"rain","溪水變黃、變急了！我們馬上上岸！"],["有人掉進水裡","owl","貓頭鷹",["quiz:溪流","zhuyin:hear6:ㄖ|ㄕ","measure:s6m"],"box","咕咕！有人掉進水裡，不自己下去救，要大聲喊大人！"],["野生動物不餵","deer","山羌",["quiz:溪流","R:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|ㄓ|ㄔ|ㄕ|Q|R|S:3","compare:s6w"],"chest","我是山羌。看到野生動物，遠遠看，不靠近、不餵食喔！"],["垃圾帶下山","squirrel","松鼠",["quiz:溪流","write:ㄖ:3","write:T:3"],"petgift","吱吱！吃完的包裝，都放進背包帶下山！"],["走到上游","star","小星星",["quiz:溪流","write:U:3","measure:s6m","quiz:溪流"],"chapter","完成四個挑戰，我們就走到小溪的上游囉！"]],"story":["夏天到了，我們來到台灣的高山，山上有一條清清的小溪。","台灣黑熊說：我帶你們沿著小溪往上走，小溪裡住著櫻花鉤吻鮭喔！","小守護者記得三件事：玩水一定要大人陪、溪水變黃變急就上岸、野生動物不靠近不餵食。","戴好帽子、帶好水，我們出發囉！"],"story_p":"王子說：要是有人掉進水裡，我們不自己下去，要大聲喊大人！","story_b":"火花說：我可以自己飛到溪裡玩水嗎？黑熊說：不行喔，玩水一定要大人陪！","storyAt":3,"letter_p":"親愛的公主：<br>你用迴紋針量了好多東西，也知道玩水一定要大人陪！<br>你還學會ㄖ和T、U。<br>下一站，我們去星光小鎮的防災中心！","letter_b":"王子，我知道了，有人掉進水裡，要大聲喊大人，請大人打一一九！<br>你學會ㄖ和T、U，好厲害！<br>下一站，我們去防災中心！","theater":"黑熊和小櫻在小溪邊揮揮手：謝謝你把垃圾帶下山！","prize":{"petacc":["pacc38","小樹葉帽"],"pic":"小溪和小櫻"},"gift":"你得到新的寵物配件了！點「換裝間」，可以幫寵物戴上喔！","q0":40,"lv":[[47,50],[52,58],[48,51],[40,53],[42,54],[43,44],[41,55],[45,56,57],[46,49,59],[40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]],"first":{"3":40,"4":42,"5":43,"6":41,"7":45,"8":46},"learn":"ㄖTU"},"39":{"name":"颱風和地震","title":"第三十九章・颱風和地震","cn":"三十九","tag":"防災","bg":"safety39","helper0":"robot","firstSay":"第三十九章，颱風和地震！我們去防災中心，學怎麼保護自己！點一下發光的嘀嘀，出發！","endText":"最後一站：第四十章「森林露營大會」！","levels":[["防災中心","robot","機器人嘀嘀",["quiz:防災","write:ㄗ:1","zhuyin:hear6:ㄗ"],"pick","嗶嗶！歡迎來到防災中心，我們一起學保護自己！"],["颱風要來了","owl","貓頭鷹",["quiz:防災","write:V:1","compare:s6pic"],"box","咕咕！天氣預報說颱風要來了，我們來看看這幾天的天氣！"],["準備防災包","bear","熊熊",["quiz:防災","write:ㄗ:2","compare:s5b:50"],"chest","防災包裡放手電筒、水和乾糧，跟家人約好集合的地方！"],["遠離窗戶","kitten","小貓",["quiz:防災","write:ㄘ:1","zhuyin:hear6:ㄘ"],"petgift","喵～颱風天風好大，離窗戶遠一點喔！"],["停電了","dog","小狗",["quiz:防災","write:V:2","letter:k6:U|V"],"pick","汪！停電了，用手電筒照亮，不自己點蠟燭！"],["地震演習","robot","機器人嘀嘀",["quiz:防災","write:ㄘ:2","compare:s6pic"],"rain","嗶嗶！地震來了，先趴下！"],["趴下掩護穩住","bunny","兔兔",["quiz:防災","zhuyin:hear6:ㄗ|ㄘ","compare:s5b:50"],"box","趴下、掩護、穩住！用手護住頭和脖子！"],["聽大人指揮","hedgehog","刺蝟",["quiz:防災","R:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|ㄓ|ㄔ|ㄕ|ㄖ|Q|R|S|T|U:3","compare:s6pic"],"chest","搖完了，先不要跑，聽大人指揮再一起走！"],["電線不要碰","pig","小豬",["quiz:防災","write:ㄗ:3","write:ㄘ:3"],"petgift","掉在地上的電線很危險，不碰它，告訴大人！"],["防災小隊出發","star","小星星",["quiz:防災","write:V:3","compare:s6pic","quiz:防災"],"chapter","完成四個挑戰，你就是防災小隊的一員！"]],"story":["星光小鎮的天空變得灰灰的，風也變大了。","機器人嘀嘀說：颱風要來了！我們去防災中心，學怎麼保護自己。","小守護者記得三件事：颱風天待在家、地震時趴下掩護穩住、掉在地上的電線不碰。","跟著嘀嘀，防災小隊出發！"],"story_p":"王子說：地震的時候，我會用手護住頭和脖子！","story_b":"火花說：颱風來了，我要飛去海邊看大浪！嘀嘀說：不行喔，颱風天要待在家裡！","storyAt":3,"letter_p":"親愛的公主：<br>你學會颱風天待在家，地震時趴下、掩護、穩住，好勇敢！<br>你還學會ㄗ、ㄘ和V。<br>最後一站，是森林露營大會！","letter_b":"王子，颱風天我乖乖待在家，沒有去海邊看浪！<br>你學會ㄗ、ㄘ和V，好棒！<br>最後一站，我們去森林露營！","theater":"颱風走了，太陽出來了，大家一起把小鎮打掃乾淨！","prize":{"dress":["dress39","雨衣雨鞋"],"boy":["b_rain39","雨衣雨鞋"]},"gift":"你得到新的衣服了！點「換裝間」，可以換上新衣服喔！","q0":60,"lv":[[73,70,72],[79,69],[68,78],[65,74],[66,64],[60,75],[61,63],[62,76,71],[67,77],[60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79]],"first":{"3":65,"4":66,"5":60,"6":61,"7":62,"8":67},"learn":"ㄗㄘV"},"40":{"name":"森林露營大會","title":"第四十章・森林露營大會","cn":"四十","tag":"露營","bg":"camp40","helper0":"sloth","firstSay":"第四十章，森林露營大會！大自然的朋友都來了！點一下發光的樹懶，出發！","endText":"謝謝你當了這麼棒的大自然小守護者！下一站：第七季「星光城市小旅行」，敬請期待！","levels":[["森林營地","sloth","樹懶慢慢",["quiz:露營","zhuyin:hear6:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ","count:s5c:60"],"pick","歡迎來到森林營地！今天晚上，我們一起露營！"],["搭帳篷","bear","熊熊",["quiz:露營","R:ㄓ|ㄔ|ㄕ:3","count:s6t:100"],"box","帳篷搭好了！睡覺前把拉鍊拉好，蚊子就飛不進來！"],["跟緊大人","dog","小狗",["quiz:露營","zhuyin:hear6:ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ","measure:s6m"],"chest","汪！天黑了，不離開營地，跟緊大人！"],["營火交給大人","robot","機器人嘀嘀",["quiz:露營","R:Q|R|S:3","letter:k6:E|F|O|Q|P|R|U|V|I|J"],"petgift","嗶嗶！營火交給大人，我們坐遠一點，不跑不跳！"],["星星好亮","owl","貓頭鷹",["quiz:露營","R:ㄖ|ㄗ|ㄘ:3","compare:s6w"],"pick","咕咕！抬頭看，森林的星星好亮！"],["天黑不亂走","frog","青蛙",["quiz:露營","R:T|U|V:3","compare:s6pic"],"rain","呱呱！晚上的森林黑黑的，待在營地最安全！"],["昆蟲朋友來了","ladybug","瓢蟲點點",["quiz:露營","zhuyin:hear6:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ","count:s6two:20"],"box","我是點點！看完我們，記得放回原來的地方喔！"],["溪邊的朋友","salmon","鉤吻鮭小櫻",["quiz:露營","R:A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P:3","shape:s6sym"],"chest","好漂亮的花！拍照留念，不摘下來喔！"],["整理營地","squirrel","松鼠",["quiz:露營","R:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ:3","compare:s5b:50"],"petgift","吱吱！離開營地前，檢查一遍，東西全部帶走！"],["小守護者頒獎","star","小星星",["quiz:露營","R:ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ:3","R:Q|R|S|T|U|V:3","quiz:露營"],"chapter","最後一關！完成四個挑戰，就能成為大自然小守護者！"]],"story":["夏天的晚上，森林裡的營地好熱鬧。","慢慢說：今天是森林露營大會，大自然的朋友都來了！","露營記得三件事：營火交給大人、天黑不離開營地、東西全部帶走。","搭好帳篷，我們去營火旁邊坐好吧！"],"story_p":"王子也來了，他說：今天晚上，我們一起看星星！","story_b":"火花說：我來幫忙點營火！慢慢說：營火交給大人，我們坐遠一點看就好！","storyAt":3,"letter_p":"親愛的公主：<br>這一季，你爬上雨林的大樹、看小昆蟲、走到小溪的上游，還學會保護自己！<br>你認識了ㄅ到ㄘ二十個注音，還有A到V。<br>你是最棒的大自然小守護者！","letter_b":"王子，我們一起爬雨林、看昆蟲、走小溪，還學會颱風和地震怎麼保護自己！<br>你認識了ㄅ到ㄘ二十個注音，還有A到V，好厲害！<br>我們是最棒的大自然小守護者！","theater":null,"prize":{"prop":["prop40","營地小提燈"],"room":["toy","tent40","小帳篷"],"pic":"森林露營"},"gift":"","q0":80,"lv":[[82,88],[85,96],[81,87],[80,83,97],[86,95],[89,90],[92,93],[91,94],[84,98,99],[80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]],"first":{"2":81,"3":80,"6":92,"7":91,"8":84},"learn":""}};
// 題庫：[tag, 題目, [圖, 正解], [[圖,錯],[圖,錯]], 說明]（100 題，第 36～40 章各 20 題，S6D[c].q0 起算）
const S6Q=[["雨林","熱帶雨林是什麼樣的地方？",["🌧️","常常下雨，大樹又高又密"],[["🏜️","沙子很多，很少下雨"],["🧊","到處都是冰"]],"熱帶雨林天天下雨、又濕又熱，大樹長得又高又密。"],["雨林","熱帶雨林裡，住了多少種動物？",["🐾","好多好多種"],[["🙅","一種都沒有"],["1️⃣","只有一種"]],"雨林裡住了好多好多種動物和植物，是大家的家。"],["雨林","樹懶走路的樣子是怎麼樣的？",["🦥","慢慢的"],[["🚀","超級快"],["🦘","一直跳來跳去"]],"樹懶動作很慢很慢，慢慢爬、慢慢吃樹葉。"],["雨林","樹懶大部分的時間，待在哪裡？",["🌳","掛在樹上"],[["🌊","大海裡"],["🕳️","地洞裡"]],"樹懶用彎彎的爪子掛在樹上，連睡覺都在樹上。"],["雨林","大樹最上面那一層，誰常常在那裡飛？",["🦅","老鷹"],[["🐟","小魚"],["🐌","蝸牛"]],"雨林最上面那一層陽光最亮，老鷹在上面飛來飛去。"],["雨林","雨林的地上落葉好多，哪一種小動物住在那裡？",["🐜","螞蟻"],[["🐋","鯨魚"],["🐧","企鵝"]],"雨林的地上又濕又暗，螞蟻、青蛙這些小動物住在落葉下面。"],["雨林","在森林裡看到好漂亮的花，要怎麼做？",["👀","用眼睛看，不摘"],[["✂️","摘下來帶回家"],["🦶","用腳踩一踩"]],"花摘下來很快就枯了，留在森林裡，大家都看得到。"],["雨林","走在森林裡，要走在哪裡？",["🥾","走在步道上"],[["🌿","走進草叢裡"],["🧗","爬到大樹上"]],"走在步道上比較安全，也不會踩壞植物。"],["雨林","為什麼不可以亂砍雨林的大樹？",["🏠","大樹是好多動物的家"],[["🪓","因為砍樹很好玩"],["🌱","因為樹明天就長回來"]],"大樹要長好多好多年，砍掉了，住在上面的動物就沒有家了。"],["雨林","雨林的大樹，為什麼可以長得那麼高？",["☀️","雨水多，陽光也多"],[["❄️","天氣很冷"],["🍬","吃了很多糖果"]],"雨林雨水多、陽光多，大樹喝飽水、曬太陽，就長得好高。"],["雨林","森林的大樹，會幫我們做什麼？",["🍃","讓空氣變乾淨"],[["💨","讓空氣變髒"],["🔇","什麼都不做"]],"樹木會讓空氣變得乾淨，森林就像大家的大肺。"],["雨林","走在森林裡，說話要怎麼樣？",["🤫","小小聲的，不吵到動物"],[["📢","大聲尖叫"],["🪵","用棍子敲樹幹"]],"森林是動物的家，小聲說話，動物才不會被嚇到。"],["雨林","看到樹上有一個鳥窩，要怎麼做？",["👀","遠遠的看，不碰它"],[["🧗","爬上去拿鳥蛋"],["🪨","丟石頭"]],"鳥窩是鳥寶寶的家，遠遠的看，不打擾牠們。"],["雨林","雨林裡有一隻顏色好鮮豔的青蛙，可以摸嗎？",["🙅","不摸，鮮豔的可能有毒"],[["✋","可以抓起來玩"],["🎒","放進口袋帶走"]],"有些顏色很鮮豔的動物身上有毒，看就好，不用手碰。"],["雨林","雨林裡的小猴子，常常在哪裡玩？",["🐒","在樹上盪來盪去"],[["🌊","在河底游泳"],["🕳️","在地底下挖洞"]],"小猴子用手和尾巴抓住樹枝，在樹上盪來盪去。"],["雨林","畫畫用的紙，是用什麼做的？",["🌳","樹木"],[["🪨","石頭"],["🥛","牛奶"]],"紙是用樹木做的，紙張兩面都用，就是在愛護森林。"],["雨林","在森林裡突然下雨了，要怎麼做？",["🧥","穿上雨衣，跟緊大人"],[["🏃","自己往前跑"],["🙈","躲起來不讓大人找到"]],"下雨的時候路很滑，穿上雨衣，跟緊大人慢慢走。"],["雨林","樹懶為什麼可以掛在樹上，不會掉下來？",["🌙","有彎彎長長的爪子"],[["🎈","身上綁著氣球"],["🧲","身上有磁鐵"]],"樹懶的爪子彎彎長長的，像掛勾一樣，勾住樹枝就不會掉下來。"],["雨林","雨林樹上的果子，要留給誰吃？",["🐒","留給住在雨林的動物"],[["🧺","全部摘回家"],["🗑️","摘下來丟掉"]],"雨林的果子是猴子、小鳥這些動物的食物，我們不摘，留給牠們吃。"],["雨林","我們可以怎麼保護森林？",["💚","愛惜紙張，不亂丟垃圾"],[["🗑️","把垃圾丟在地上"],["🌸","把花都摘光"]],"愛惜紙張、垃圾帶走、不亂摘花草，就是在保護森林。"],["昆蟲","用什麼東西，可以把小昆蟲看得更清楚？",["🔍","放大鏡"],[["🔨","鐵鎚"],["🧦","襪子"]],"放大鏡可以把小東西變大，看得清清楚楚。"],["昆蟲","看到葉子上有一隻毛毛蟲，要怎麼做？",["👀","用眼睛看，不用手碰"],[["✋","用手抓起來"],["🪵","用樹枝戳牠"]],"有些毛毛蟲的毛碰到會癢、會痛，用眼睛看就好。"],["昆蟲","一隻蜜蜂飛到你旁邊，要怎麼做？",["🚶","不揮手，慢慢走開"],[["👋","用手拍牠"],["😱","大叫亂跑亂揮"]],"揮手拍打會讓蜜蜂害怕，牠就可能叮人。不揮手，慢慢走開。"],["昆蟲","瓢蟲的背上有什麼？",["⚫","圓圓的小黑點"],[["🌈","彩虹條紋"],["🔢","數字"]],"很多瓢蟲紅紅的背上，有圓圓的小黑點。"],["昆蟲","蝴蝶的翅膀，左邊和右邊的花紋怎麼樣？",["🦋","一樣"],[["🔀","完全不一樣"],["🙅","只有一邊有翅膀"]],"蝴蝶翅膀對折起來，左右兩邊的花紋合在一起，是一樣的。"],["昆蟲","螞蟻排成長長一排，在做什麼？",["🍞","一起把食物搬回家"],[["💃","一起跳舞"],["😴","一起睡覺"]],"螞蟻會一起合作，排著隊把食物搬回家。"],["昆蟲","看完的小昆蟲，要怎麼做？",["🌿","放回原來的地方"],[["📦","一直關在盒子裡"],["🗑️","丟掉"]],"小昆蟲的家在草叢和花叢，看完放回原來的地方，牠才找得到家。"],["昆蟲","蜜蜂停在花上，在做什麼？",["🌸","採花蜜"],[["🎵","唱歌"],["🏊","游泳"]],"蜜蜂在花上採花蜜，還會幫花傳花粉。"],["昆蟲","蝴蝶寶寶剛出生的時候，住在哪裡？",["🍃","葉子上，吃葉子長大"],[["🌊","水裡"],["🧊","冰箱裡"]],"蝴蝶媽媽把蛋生在葉子上，寶寶出生以後吃葉子，慢慢長大。"],["昆蟲","被蚊子咬了，好癢，要怎麼做？",["🙋","告訴大人，不一直抓"],[["💅","用力抓到破皮"],["🤐","不說話，一直忍"]],"一直抓會抓破皮，告訴大人，大人會幫你擦藥。"],["昆蟲","看到草叢裡有一張蜘蛛網，要怎麼做？",["👀","遠遠的看，不弄破"],[["✋","伸手去抓蜘蛛"],["🪵","用樹枝把網弄破"]],"蜘蛛網是蜘蛛的家，遠遠的看，不弄破，也不碰蜘蛛。"],["昆蟲","春天到了，草地上會怎麼樣？",["🌼","花開了，小昆蟲變多了"],[["❄️","下大雪"],["🍂","葉子全部掉光"]],"春天天氣變暖，花開了，小昆蟲也都出來了。"],["昆蟲","想仔細看看小昆蟲，可以怎麼做？",["📦","放進觀察箱，看完就放走"],[["🧃","關進瓶子，蓋緊緊"],["👖","放進口袋"]],"觀察箱有小洞洞可以透氣，看一下下，就放回原來的地方。"],["昆蟲","在草地玩完回家，要做什麼？",["🧼","洗手，看看有沒有被蟲咬"],[["🛌","直接上床睡覺"],["🍪","馬上吃餅乾"]],"回家先洗手，也看看身上有沒有被蚊蟲咬。"],["昆蟲","螢火蟲為什麼會一閃一閃？",["💡","牠的尾巴會發光"],[["🔋","牠帶著電池"],["🔦","牠拿著手電筒"]],"螢火蟲的尾巴會發光，一閃一閃的，好像小星星。"],["昆蟲","看到樹上有一個蜂窩，要怎麼做？",["🚶","不靠近，告訴大人"],[["🪨","丟石頭"],["🪵","用樹枝戳一戳"]],"蜂窩是蜜蜂的家，靠近或打擾牠們，蜜蜂會出來保護家。"],["昆蟲","蝴蝶最喜歡停在哪裡？",["🌺","花上"],[["🧊","冰塊上"],["🚗","車頂上"]],"蝴蝶喜歡停在花上，吸甜甜的花蜜。"],["昆蟲","一隻瓢蟲停在你的手上，要怎麼做？",["🖐️","手放平，讓牠自己飛走"],[["✊","用手抓緊緊"],["💨","用力把牠甩掉"]],"手放平平的，不抓也不甩，瓢蟲休息夠了就會自己飛走。"],["昆蟲","要去草叢比較多的地方玩，穿什麼比較好？",["👖","長袖長褲"],[["🩳","短褲打赤腳"],["👙","泳衣"]],"穿長袖長褲，比較不會被蚊蟲咬，也不會被草割到。"],["昆蟲","小昆蟲是大自然的什麼？",["🤝","朋友，要好好愛護"],[["👾","可怕的怪物"],["🧸","玩具"]],"小昆蟲幫花傳花粉、把落葉變成土，是大自然的好朋友。"],["溪流","可以自己去溪邊或海邊玩水嗎？",["🙅","不可以，要大人陪"],[["✅","可以，自己去"],["🤫","偷偷去一下就好"]],"溪水和海水看起來淺淺的，其實很危險，玩水一定要大人陪。"],["溪流","看到有人掉進水裡，要怎麼做？",["📣","大聲喊大人，請大人打一一九"],[["🏊","自己跳下去救"],["🙈","假裝沒看到"]],"小朋友跳下去救，自己也會有危險。要大聲喊大人，請大人打一一九。"],["溪流","穿上救生衣以後，還要做什麼？",["🦺","扣好拉緊，請大人檢查"],[["🔓","鬆鬆的不用扣"],["👕","穿一下就脫掉"]],"救生衣要扣好、拉緊，請大人檢查過，掉進水裡才不會鬆脫。"],["溪流","溪水突然變黃、流得好快，要怎麼做？",["⬆️","馬上上岸，離開溪邊"],[["🏊","繼續在水裡玩"],["👀","走近一點看"]],"溪水變黃變急，可能是上游下大雨，大水快要來了，要馬上上岸。"],["溪流","聽說上游下大雨了，在溪裡的人要怎麼做？",["🏃","趕快上岸"],[["⛱️","繼續在溪裡玩"],["🎣","去溪中間釣魚"]],"上游下大雨，溪水會突然變多變急，要趕快上岸。"],["溪流","在山上看到野生動物，要怎麼做？",["👀","遠遠看，不靠近、不餵食"],[["🍪","拿餅乾餵牠"],["🏃","追著牠跑"]],"野生動物會自己找食物，餵了牠會生病，靠近也可能被咬。"],["溪流","去爬山，吃完的垃圾要怎麼辦？",["🎒","放進背包帶下山"],[["🌳","丟在大樹下"],["🌊","丟進小溪裡"]],"山上沒有垃圾車，垃圾要自己帶下山，山和小溪才會乾淨。"],["溪流","爬山走累了，要怎麼做？",["🪨","跟大人說，一起找安全的地方休息"],[["🌲","自己躲進樹林裡休息"],["🧗","坐在山崖邊"]],"累了就跟大人說，一起在安全、平平的地方休息，喝口水再走。"],["溪流","溪裡的石頭長了綠綠的青苔，踩上去會怎麼樣？",["💦","很滑，容易跌倒"],[["🧽","軟軟的很舒服"],["🍬","甜甜的"]],"長青苔的石頭很滑，踩上去容易跌倒。"],["溪流","溪水看起來清清的，可以直接喝嗎？",["🙅","不可以，喝自己帶的水"],[["😋","可以大口喝"],["🐟","跟小魚一起喝"]],"溪水看起來乾淨，裡面可能有細菌，要喝自己帶來的水。"],["溪流","去爬山之前，要準備什麼？",["💧","水、帽子和外套"],[["🎮","遊戲機"],["🧸","大玩偶"]],"帶水、戴帽子，山上會變冷，也要帶外套。"],["溪流","山上的天氣變冷了，要怎麼做？",["🧥","穿上外套"],[["🩳","換穿短褲"],["🍦","吃冰淇淋"]],"山上比山下冷，冷了就穿上外套。"],["溪流","小溪裡的魚好可愛，可以抓回家養嗎？",["🙅","不可以，讓牠住在小溪裡"],[["🪣","抓回家養"],["🎣","全部抓光"]],"小溪是魚的家，有些魚是很少見的保育類動物，不可以抓。"],["溪流","天平兩邊放東西，比較重的那一邊會怎麼樣？",["⬇️","往下"],[["⬆️","往上"],["💤","不會動"]],"天平比較重的那一邊會往下，比較輕的那一邊會往上。"],["溪流","溪邊的大石頭，可以爬上去往水裡跳嗎？",["🙅","不可以，水裡有石頭很危險"],[["🤸","可以，跳下去"],["🙈","大人沒看到就跳"]],"水裡看不到的地方可能有石頭，也可能很深，不可以跳水。"],["溪流","看到朋友在溪邊滑倒了，要怎麼做？",["📣","叫大人來幫忙"],[["😆","在旁邊笑他"],["🏃","趕快跑走"]],"朋友受傷了，趕快叫大人來幫忙。"],["溪流","山上有一塊牌子寫著「危險，禁止進入」，要怎麼做？",["🚫","不進去"],[["🚶","偷偷進去看看"],["🧗","翻過欄杆"]],"寫著禁止進入的地方很危險，不進去。"],["溪流","爬山的時候，為什麼要跟緊大人？",["🧭","山路很多條，走散會迷路"],[["😴","因為大人會睡著"],["🎁","因為大人有禮物"]],"山路很多條，跟緊大人才不會走散。"],["溪流","小溪的水，是從哪裡來的？",["⛰️","山上的雨水慢慢流下來"],[["🚰","水龍頭"],["🧊","冰箱"]],"雨水落在山上，慢慢流下來，變成一條一條的小溪。"],["溪流","為什麼要保護小溪？",["🐟","好多魚和小動物住在裡面"],[["🗑️","方便丟垃圾"],["🙅","不用保護"]],"小溪是魚、青蛙和好多小動物的家，也是大家喝的水的來源。"],["防災","地震來了，第一個動作是什麼？",["⬇️","趴下"],[["🏃","往外跑"],["🛗","搭電梯"]],"地震來了，先趴下、掩護、穩住，搖的時候不要跑。"],["防災","地震的時候，要先保護身體的哪裡？",["🤲","用手護住頭和脖子"],[["🦵","膝蓋"],["👂","耳朵"]],"頭和脖子最重要，用手或包包護住它們。"],["防災","地震搖完了，接下來要怎麼做？",["👂","聽大人指揮，再一起走"],[["🏃","自己跑出去"],["🛗","搭電梯下樓"]],"搖完先不要亂跑，聽大人或老師指揮，一起走樓梯到安全的地方。"],["防災","晚上睡覺的時候地震了，要怎麼做？",["🛏️","趴著，用枕頭護住頭"],[["🏃","跳下床到處跑"],["🪟","跑到窗戶旁邊"]],"在床上就趴著，用枕頭護住頭和脖子，等搖完再聽大人說。"],["防災","颱風來了，可以去海邊看大浪嗎？",["🙅","不可以，待在家裡"],[["🌊","可以去看"],["📸","去拍大浪的照片"]],"颱風天海浪很大很危險，不去海邊、河邊看浪。"],["防災","颱風天風好大，在家裡要離什麼遠一點？",["🪟","窗戶"],[["🧸","玩偶"],["🛋️","沙發"]],"大風可能把窗戶吹破，離窗戶遠一點比較安全。"],["防災","颱風天停電了，要用什麼照亮？",["🔦","手電筒"],[["🕯️","自己點蠟燭"],["🙈","摸黑跑來跑去"]],"停電了用手電筒，蠟燭的火很危險，小朋友不自己點。"],["防災","看到電線掉在地上，要怎麼做？",["🙅","不碰它，告訴大人"],[["✋","撿起來玩"],["🦶","踩過去"]],"掉在地上的電線可能有電，很危險，不碰它，離遠一點。"],["防災","防災包裡要放什麼？",["🔦","手電筒、水和乾糧"],[["🎮","遊戲機"],["🧸","很多玩具"]],"防災包放手電筒、水、乾糧和藥，要用的時候拿了就走。"],["防災","颱風要來之前，家裡可以怎麼準備？",["🪴","把陽台的盆栽搬進來"],[["🪁","去外面放風箏"],["🏖️","去海邊玩"]],"大風會把盆栽吹掉，先搬進屋子裡。"],["防災","地震的時候正在浴室，要怎麼做？",["🛁","蹲低護住頭，離鏡子和玻璃遠一點"],[["🏃","在滑滑的地上跑出去"],["🪞","站在鏡子前面看"]],"浴室有鏡子和玻璃，地又滑，蹲低護住頭，搖完再請大人來。"],["防災","地震的時候在廚房，要怎麼做？",["🚶","離開爐子和櫃子，趴下護住頭"],[["🍳","去拿鍋子"],["🧊","打開冰箱拿東西"]],"廚房有熱鍋和會掉下來的碗盤，離遠一點，趴下護住頭。"],["防災","颱風來之前，手電筒要放在哪裡？",["🔦","大家都知道、拿得到的地方"],[["📦","藏在箱子最下面"],["🧸","放在玩具堆裡"]],"先放在大家都知道的地方，停電的時候馬上拿得到。"],["防災","學校在做地震演習，要怎麼做？",["🙇","認真跟著做"],[["😆","嘻嘻哈哈不理"],["🙈","躲起來玩"]],"演習就是練習，認真練，真的地震來了才知道怎麼做。"],["防災","颱風天，窗外有東西被風吹飛了，要怎麼做？",["🪟","離窗戶遠一點，不出去撿"],[["🏃","跑出去撿回來"],["👀","把臉貼在窗戶上看"]],"颱風天外面很危險，東西被吹走了也不出去撿，離窗戶遠一點，告訴大人。"],["防災","在走廊或樓梯上遇到地震，要怎麼做？",["🧱","靠牆蹲低，護住頭，不推擠"],[["🏃","衝下樓梯"],["🤸","在樓梯上跳"]],"走廊和樓梯上不跑，靠牆蹲低保護頭，搖完聽老師指揮。"],["防災","在公園玩的時候地震了，要怎麼做？",["🌳","離開大樹和電線桿，趴下護住頭"],[["🧗","爬上溜滑梯"],["🏃","跑到馬路上"]],"在外面先離開大樹、電線桿這些會倒下來的東西，再趴下護住頭。"],["防災","颱風過後，路上有斷掉的樹枝和積水，要怎麼做？",["🚶","跟著大人走，避開積水"],[["💦","跳進水坑裡玩"],["🪵","搬樹枝來玩"]],"積水下面可能有洞或電線，跟著大人走，避開積水和樹枝。"],["防災","家裡可以跟家人約好什麼？",["📍","地震以後在哪裡集合"],[["🎂","生日要吃什麼"],["📺","要看哪一個卡通"]],"先跟家人約好集合的地方，大家走散了也找得到彼此。"],["防災","天氣預報說颱風要來了，要怎麼做？",["👂","聽大人的安排"],[["😤","吵著要出去玩"],["🙈","不理它"]],"颱風要來，聽大人的安排，一起做好準備。"],["露營","露營的營火，要交給誰？",["🙋","大人"],[["🧒","小朋友自己"],["🐶","小狗"]],"火很燙也很危險，營火交給大人，小朋友坐遠一點。"],["露營","天黑了，可以自己離開營地去探險嗎？",["🙅","不可以，待在營地"],[["🔦","自己拿手電筒去"],["🌲","一個人走進樹林"]],"晚上的森林黑黑的，很容易迷路，天黑不離開營地。"],["露營","去露營的時候，要跟緊誰？",["👨‍👩‍👧","爸爸媽媽"],[["🦊","野狐狸"],["🎈","飛走的氣球"]],"跟緊爸爸媽媽，才不會走丟。"],["露營","營火旁邊，要怎麼做？",["🪑","坐遠一點，不跑不跳"],[["🏃","繞著營火跑"],["✋","伸手摸摸看"]],"在營火旁邊跑跳，可能跌倒或燙到，坐遠一點最安全。"],["露營","要離開營地了，帳篷裡外要怎麼做？",["🔍","檢查一遍，自己的東西都帶走"],[["🏃","直接跑走"],["🎁","留一些東西給動物"]],"離開前檢查一遍，東西都帶走，營地恢復原來乾乾淨淨的樣子。"],["露營","晚上睡帳篷前，要做什麼？",["🪥","刷牙，把帳篷拉鍊拉好"],[["🍬","吃很多糖果"],["📣","大聲吵到很晚"]],"睡前刷牙、拉好拉鍊，蚊子就飛不進來；也要讓別人好好睡覺。"],["露營","晚上在森林抬頭看，天上有什麼？",["⭐","好多星星"],[["🌈","彩虹"],["☀️","太陽"]],"森林裡燈很少，晚上可以看到好多好亮的星星。"],["露營","晚上聽到帳篷外面有奇怪的聲音，要怎麼做？",["🙋","告訴大人"],[["🔦","自己出去找"],["🏃","跑進樹林裡"]],"聽到奇怪的聲音，告訴大人，不自己跑出去。"],["露營","去露營，要帶什麼？",["🔦","手電筒"],[["📺","電視"],["🛁","浴缸"]],"晚上營地很暗，帶手電筒才看得到路。"],["露營","營地旁邊有一條小溪，可以自己去玩水嗎？",["🙅","不可以，要大人陪"],[["✅","可以自己去"],["🌙","晚上偷偷去"]],"玩水一定要大人陪，晚上更不可以去溪邊。"],["露營","地震來了，要做哪三個動作？",["⬇️","趴下、掩護、穩住"],[["🏃","快跑、快跑、快跑"],["🛗","搭電梯下樓"]],"地震時記得：趴下、掩護、穩住。"],["露營","露營時看到好漂亮的野花，要怎麼做？",["📷","拍照留念，不摘"],[["✂️","摘回家"],["🦶","踩過去"]],"野花留在大自然裡，拍照留念就好。"],["露營","看完的小昆蟲，要怎麼做？",["🌿","放回原來的地方"],[["📦","帶回家"],["🗑️","丟掉"]],"看完放回原來的地方，小昆蟲才找得到家。"],["露營","營火旁邊飛來一隻蜜蜂，要怎麼做？",["🚶","不揮手，慢慢走開"],[["👋","用手拍牠"],["😱","大叫亂揮"]],"不揮手拍打，慢慢走開，蜜蜂就不會害怕。"],["露營","森林裡的松果和落葉，可以怎麼玩？",["👀","撿地上的看一看，再放回去"],[["🌳","用力搖大樹"],["🌿","把樹枝折斷"]],"看看地上的松果和落葉，看完放回去，不搖樹、不折樹枝。"],["露營","露營的時候，一家人一起做什麼最開心？",["👨‍👩‍👧","一起吃飯、說故事"],[["📱","各自玩手機"],["😴","一直睡覺"]],"跟家人一起吃飯、聊天、說故事，是露營最開心的事。"],["露營","晚上好冷，睡覺前要怎麼做？",["🧥","穿暖和，蓋好睡袋"],[["🩳","換穿短褲"],["🍦","吃冰淇淋"]],"山上的晚上很冷，穿暖和、蓋好睡袋才不會感冒。"],["露營","營火要熄掉的時候，要怎麼做？",["🙋","請大人用水和沙子熄掉"],[["🌬️","用嘴巴吹"],["🦶","用腳去踩"]],"營火要請大人用水和沙子熄乾淨，小朋友不靠近。"],["露營","這一季你當了大自然小守護者，小守護者會做什麼？",["💚","愛護動物植物，也保護自己"],[["🪓","亂砍樹"],["🗑️","亂丟垃圾"]],"小守護者愛護動物和植物，也會保護自己的安全。"],["露營","露營結束了，要跟大自然說什麼？",["👋","謝謝大自然，下次見"],[["😤","好無聊"],["🤐","什麼都不說"]],"謝謝森林讓我們露營，下次再來玩。"]];
const S6FIN={"h":"大自然小守護者頒獎典禮！","p":"五章的冒險，全部完成了！大自然的朋友都來幫你拍拍手！","f":[["sloth","慢慢說：你一步一步爬到雨林最上面，好有耐心！"],["ladybug","點點說：謝謝你看完把我們放回草叢！"],["blackbear","黑熊說：你記得玩水要大人陪，好棒！"],["robot","嘀嘀說：地震演習，你做得好認真！"]],"pr":"公主，你是最棒的大自然小守護者！","dr":"王子，我們一起當大自然小守護者，好好玩！","c1":"恭喜你，成為大自然小守護者！","c2":"你爬上雨林的大樹、看小昆蟲、走到小溪的上游，還學會颱風和地震怎麼保護自己！","c3":"你還認識了二十個注音和A到V，好厲害！","cert_title":"大自然小守護者","cert_to":"最棒的小守護者","cert_sign":"樹懶慢慢　和大自然的朋友們","cert_body":["你完成了第六季","「星光大自然」五章的冒險，","<br>","爬上雨林的大樹、看小昆蟲，","<br>","走到小溪的上游，","學會保護自己，","<br>","是最棒的大自然小守護者！","<br>","還認識了","ㄅ～ㄘ二十個注音","和 A 到 V！"]};
const S6HEAR={"ㄓ":[["🕷️","蜘蛛"],["🐷","豬"],["🎋","竹子"],["📄","紙"],["🐙","章魚"]],"ㄔ":[["🐛","蟲"],["🚗","車子"],["🍵","茶"],["⛵","船"],["🎤","唱歌"]],"ㄕ":[["🌳","樹"],["📚","書"],["🦁","獅子"],["⛰️","山"],["💧","水"]],"ㄖ":[["🌅","日出"],["🥩","肉"],["🧍","人"]],"ㄗ":[["🚶","走路"],["👄","嘴巴"],["c:#9A5ACF","紫色"]],"ㄘ":[["🌿","草"],["🍓","草莓"],["🌈","彩虹"],["🥬","菜"]]};
const S6LIKE={"z":{"ㄓ":"ㄗ","ㄗ":"ㄓ","ㄔ":"ㄘ","ㄘ":"ㄔ","ㄕ":"ㄒ","ㄖ":"ㄌ"},"l":{"Q":"O","O":"Q","R":"P","P":"R","S":"C","T":"I","U":"V","V":"U","E":"F","F":"E","I":"J","J":"I"}};
const S6QTAG={"雨林":"#8FD08A","昆蟲":"#FFC06A","溪流":"#8FC8F0","防災":"#FF9F8A","露營":"#B8A0E8"};
const S6PT=[["rain36","熱帶雨林","🦥","sloth","rainforest36",["quiz:雨林","quiz:雨林","quiz:雨林","quiz:雨林","quiz:雨林"],36],["bug37","昆蟲小世界","🐞","ladybug","meadow37",["quiz:昆蟲","quiz:昆蟲","quiz:昆蟲","quiz:昆蟲","quiz:昆蟲"],37],["creek38","山上的小溪","🏞️","blackbear","creek38",["quiz:溪流","quiz:溪流","quiz:溪流","quiz:溪流","quiz:溪流"],38],["safe39","颱風和地震","🌀","robot","safety39",["quiz:防災","quiz:防災","quiz:防災","quiz:防災","quiz:防災"],39],["camp40","森林露營大會","⛺","sloth","camp40",["quiz:露營","quiz:露營","quiz:露營","quiz:露營","quiz:露營"],40],["hear6","聽聲音找注音","👂","sloth","rainforest36",["zhuyin:hear6:auto","zhuyin:hear6:auto","zhuyin:hear6:auto","zhuyin:hear6:auto","zhuyin:hear6:auto"],36],["math6","量一量、比一比","📎","sloth","creek38",["count:s6two:auto","measure:s6m","compare:s6w","compare:s6pic","shape:s6sym"],36]];

/* ================= 第六季「星光大自然」第三十六～四十章（接進遊戲） =================
   2026-11-17　星光工作室 Starlight Studio　｜　故事、角色（樹懶慢慢、瓢蟲點點、鉤吻鮭小櫻、小猴子跳跳、寵物小樹懶）、台詞、題目、圖樣都是星光工作室原創，著作權與 IP 屬於星光工作室。
   需要：s6_data.js（S6D、S6Q、S6FIN、S6HEAR、S6LIKE、S6QTAG、S6PT）、art36.js（BG36、OBJ36）、chars36.js（CH36、PET36、S36）。
   接法照第五季 s5_logic.js：排在 m99z_season5 後面（m99z_season6），包的是各畫面最後的版本（含第五季）。
   新題型都用現有題型名稱開頭（zhuyin:hear6、letter:k6、count:s6…、measure:s6m、compare:s6w／s6pic、shape:s6sym），錯題本、學習報告、難度調整照原本分類。
   動畫：只用淡入、移動、亮光、旋轉局部；沒有整體放大縮小。 */
(function(){
'use strict';
const C36I=35,C40I=39,S6CH=[36,37,38,39,40];
const inS6=i=>i>=C36I&&i<=C40I;
if(CHAPTERS.length!==35)console.log('s6: CHAPTERS.length='+CHAPTERS.length+'（第六季要接在第三十五章後面）');
const RM=()=>{try{return !!reduced}catch(e){return false}};
const IS_APPX=()=>{try{return typeof IS_APP!=='undefined'&&!!IS_APP}catch(e){return false}};
const MISS=[];
const BG6=window.BG36||{};if(!window.BG36)MISS.push('BG36');
const CHX=window.CH36||{};if(!window.CH36)MISS.push('CH36');
const PET6=window.PET36||null;if(!PET6)MISS.push('PET36');
const A6=window.S36||{};if(!window.S36)MISS.push('S36');
const OB=window.OBJ36||{};
window.__s6art={missing:MISS};

/* ---------- 1. 新朋友（AN 角色）和背景 ---------- */
Object.keys(CHX).forEach(k=>{if(Object.prototype.hasOwnProperty.call(AN,k))return;try{Object.defineProperty(AN,k,{configurable:true,enumerable:true,get(){return CHX[k].f()}})}catch(e){console.log('an36',k,e)}});
const DARK=['camp40night'];
const veil=(k,fn)=>function(W,H){let d='';try{d=fn(W,H)}catch(e){console.log('bg36',k,e)}
 if(window.__mkVeil){const dark=DARK.includes(k);d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="${dark?'#141A44':'#FFFFFF'}" opacity="${dark?'.18':'.22'}"/>`}return d};
const BGKEYS=['rainforest36','meadow37','creek38','safety39','camp40','camp40night'];
BGKEYS.forEach(k=>{if(BG6[k])CHBG[k]=veil(k,BG6[k])});
try{if(window.RD40BG)BGKEYS.forEach(k=>{RD40BG[k]=(W,H)=>CHBG[k](W,H)})}catch(e){}
try{const _d6=decor2;decor2=function(id){if(BGKEYS.includes(id)&&CHBG[id]){let own=false;try{own=CHAPTERS[S.ch].bg===id&&!S.pmode}catch(e){}
  if(!own){const fn=CHBG[id];delete CHBG[id];try{return _d6(id)}finally{CHBG[id]=fn}}}return _d6(id)}}catch(e){}

/* ---------- 2. 題庫（100 題）和標籤顏色 ---------- */
Object.assign(QTAG,S6QTAG);
const Q6_0=QUIZ.length;
S6Q.forEach(q=>QUIZ.push(q));
window.__s6Q0=Q6_0;

/* ---------- 3. 獎品 ---------- */
// 36：寵物小樹懶；37：探險背心裝＋昆蟲觀察箱；38：小樹葉帽（寵物配件）；39：雨衣雨鞋；40：營地小提燈＋小帳篷；塗色 36、37、38、40
const PZ=S6D;
ITEMS.push({id:'sloth36',slot:'pet',name:PZ[36].prize.pet[1],price:0,chapter:36},
 {id:'pacc38',slot:'petacc',name:PZ[38].prize.petacc[1],price:0,chapter:38},
 {id:'prop40',slot:'prop',name:PZ[40].prize.prop[1],price:0,chapter:40});
const DCH=[37,39];
if(ISBOY){DCH.forEach(c=>ITEMS.push({id:PZ[c].prize.boy[0],slot:'dress',name:PZ[c].prize.boy[1],price:0,chapter:c}));try{NEUTRAL_PROPS.push('prop40')}catch(e){}}
else DCH.forEach(c=>ITEMS.push({id:PZ[c].prize.dress[0],slot:'dress',name:PZ[c].prize.dress[1],price:0,chapter:c}));
DCH.forEach(c=>{const d=PZ[c].prize.dress[0],bb=PZ[c].prize.boy[0];try{if(A6.DRESS&&A6.DRESS[d])DRESS[d]=Object.assign({},A6.DRESS[d]);if(A6.BOY&&A6.BOY[bb])BFIT[bb]=Object.assign({},A6.BOY[bb],{n:PZ[c].prize.boy[1],chapter:c})}catch(e){}});
ITEMS.forEach(i=>{ITEM[i.id]=i});
try{if(A6&&typeof A6.hook==='function'&&window.__s36hooked!==1)A6.hook()}catch(e){console.log('s36hook',e)}
// 道具（營地小提燈）
{const _pr6=IDOL.PR;IDOL.PR=g=>{const o=_pr6(g);try{if(A6.PR&&A6.PR.prop40)o.prop40=A6.PR.prop40}catch(e){}return o}}
// 寵物小樹懶；配件用 m21 的 accOverlay（錨點 PET36.anchor）
try{ACCANCH.sloth36=Object.assign({h:[60,24],n:[60,66],s:1.05},(PET6&&PET6.anchor)||{})}catch(e){}
try{ACCHEAD.push('pacc38')}catch(e){}
{const _pa6=petAcc;petAcc=function(acc,g){if(acc==='pacc38'){try{return A6.PACC.pacc38(g)}catch(e){return ''}}return _pa6.apply(this,arguments)}}
{const _ps6=petSVG;petSVG=function(kind,acc,a){
  if(kind==='sloth36'&&PET6&&typeof PET6.sloth36==='function'){let s=PET6.sloth36(a||'',acc||'');try{const ov=acc&&typeof accOverlay==='function'?accOverlay('sloth36',acc):null;
    if(ov){const i=s.indexOf('>')+1,j=s.lastIndexOf('</svg>');if(i>0&&j>0)s=ov.back?s.slice(0,i)+ov.defs+ov.body+s.slice(i):s.slice(0,i)+ov.defs+s.slice(i,j)+ov.body+s.slice(j)}}catch(e){}return s}
  return _ps6.apply(this,arguments)}}
// 房間玩具：昆蟲觀察箱（37）、小帳篷（40）
const ROOM6=[['toy','bugbox37',PZ[37].prize.room[2],37],['toy','tent40',PZ[40].prize.room[2],40]];
ROOM6.forEach(([s,v,nm,c])=>{RMPRIZE.push([s,v,nm,c]);if(ROOMITEMS[s])ROOMITEMS[s].push([v,nm,999])});
{const _rs6=roomSVG;roomSVG=function(){const R=_rs6.apply(this,arguments);try{const ty=roomGet('toy');if((ty==='bugbox37'||ty==='tent40')&&A6.TOY&&A6.TOY[ty])R.toy=A6.TOY[ty]}catch(e){console.log('room36',e)}return R}}
// 塗色本（分類「大冒險」；完成那一章才打開）
const PIC6=[[36,PZ[36].prize.pic],[37,PZ[37].prize.pic],[38,PZ[38].prize.pic],[40,PZ[40].prize.pic]];
PIC6.forEach(([c,nm],k)=>{const P=(A6.PICS||[])[k]||{};try{PICS.push({n:nm,ch:c,cat47:P.cat||'adv',lv47:P.lv||1,r:P.r||[],deco43:typeof P.deco==='function'?P.deco():'',lw43:5})}catch(e){console.log('pic36',e)}});
const GIFT={36:['sloth36'],37:[ISBOY?'b_vest37':'dress37'],38:['pacc38'],39:[ISBOY?'b_rain39':'dress39'],40:['prop40']};
window.__s6GIFT=GIFT;

/* ---------- 4. 大地圖第八段、章節 ---------- */
WORLD.push({i:35,ic:()=>art('🦥'),c:['#8FD08A','#2A6A2A'],name:'熱帶雨林'},{i:36,ic:()=>art('🐞'),c:['#FFC06A','#8A4A1A'],name:'昆蟲小世界'},
 {i:37,ic:()=>art('🏞️'),c:['#8FC8F0','#2A4A8A'],name:'山上的小溪'},{i:38,ic:()=>art('🌀'),c:['#FF9F8A','#8A2A2A'],name:'颱風和地震'},{i:39,ic:()=>art('⛺'),c:['#B8A0E8','#4A2A7A'],name:'森林露營大會'});
ARCS.push({t:'星光大自然',n:'第八段',from:35,ic:()=>art('🌳'),say:'第六季，星光大自然！跟樹懶慢慢一起，認識動物昆蟲，學會保護自己！'});
const LETTER_P={},LETTER_B={};
S6CH.forEach(c=>{const D=S6D[c];
 const lv=D.levels.map(L=>L_(L[0],L[1],D.bg,L[3].slice(),L[4],L[5]));
 CHAPTERS.push({name:D.name,title:D.title,levels:lv,bg:D.bg,mix:[...S2MIX,'quiz:'+D.tag,'pin','m20','eword'],
  firstSay:D.firstSay,letter:D.letter_p,prize:c===36?['sloth36']:[],gems:10,prizeName:'',endText:D.endText,s6:c});
 const C=CHAPTERS[CHAPTERS.length-1];
 if(c===37||c===39)C.outfitName=ISBOY?D.prize.boy[1]:D.prize.dress[1];
 if(c===40)C.outfitName=D.prize.prop[1];
 if(ISBOY){C.letter=D.letter_b;C.boyLetter=1;DRAGON_SAY.add(voiceT(C.letter.replace(/<br>/g,'')))}
 else PRINCE_LETTERS.add(C.letter.replace(/<br>/g,''));
 LETTER_P[c]=D.letter_p.replace(/<br>/g,'');LETTER_B[c]=D.letter_b.replace(/<br>/g,'')});
const S6NEXT='下一站：第六季「星光大自然」！';
const S6AD='這是第六季的冒險內容，請爸爸媽媽到家長專區看看喔！';

/* ---------- 5. 開場故事頁 ---------- */
const STORY_HELPER={36:'sloth',37:'ladybug',38:'blackbear',39:'robot',40:'sloth'};
const _story6=SCREENS.story;
SCREENS.story=function(){if(!inS6(S.ch))return _story6.apply(this,arguments);
 const c=S.ch+1,D=S6D[c];const bg=k=>`<svg class="bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice">${sbg(k)}</svg>`;
 const ver=ISBOY?D.story_b:D.story_p;const T=D.story.slice();T.splice(D.storyAt,0,ver);const hp=STORY_HELPER[c];
 const hpAt=k=>c===36&&k===0?'robot':hp;
 const fireB=()=>{try{if(S.look.pet==='dragon')return myPet();return petSVG('dragon','','')}catch(e){return myPet()}};
 const P=T.map((t,k)=>({t,a:()=>k===D.storyAt?`${princess(S.look)}<span class="bob">${ISBOY?fireB():prince()}</span>`:k===T.length-1?`${myPet('class="small"')}${princess(S.look)}<span class="bob">${animal(hpAt(k))}</span>`:`${princess(S.look)}<span class="bob">${animal(hpAt(k))}</span>`}));
 let i=0;
 function render(){const p=P[i];
  screen.innerHTML=`<div class="story s4story s5story s6story"><button class="skip" id="skip">跳過</button><div class="scard">
   <div class="scene">${bg(D.bg)}<div class="actors">${p.a()}</div></div><p class="stext">${p.t}</p>
   <div class="sdots">${P.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
   <button class="btn" id="next">${i<P.length-1?'下一頁':'去換裝'}</button></div></div>`;
  say(talk6(p.t));
  $('#next').onclick=()=>{if(i<P.length-1){i++;sfx('pop');render()}else go('guide')};
  $('#skip').onclick=()=>go('guide')}
 render()};
// 王子版「火花說：…」用火花的聲音，後面「慢慢說：…」這類用旁白（中間隔一下）
function talk6(t){if(!ISBOY||!/火花說：/.test(t))return [t];const seg=t.split(/(?=(?:火花|慢慢|點點|黑熊|嘀嘀)說：)/).filter(Boolean);const o=[];
 seg.forEach(s=>{if(o.length)o.push({pause:200});o.push(s.startsWith('火花說：')?{zh:s.slice(4),who:'dragon'}:s)});return o}

/* ---------- 6. 每一關先從那一關主題的題目抽；沒玩到第六季的，一般問答不抽第六季的題目 ---------- */
{const _qz6=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{const c=S.ch+1;const D=inS6(S.ch)?S6D[c]:null;
   if(D&&fcat===D.tag&&S.qs&&S.qs.__lv!==undefined&&D.lv[S.level]&&!S.pmode){
    const base=D.lv[S.level].map(k=>k+Q6_0).filter(k=>QUIZ[k]&&QUIZ[k][0]===D.tag);
    const seen=S.qs.__u6||(S.qs.__u6=[]);let i;const F=D.first[String(S.level)];
    if(S.qs.indexOf('quiz:'+D.tag)===S.q&&F!=null&&!seen.length)i=F+Q6_0;
    else{let pool=base.filter(x=>!S.usedQ.includes(x)&&!seen.includes(x));
     if(!pool.length){S.usedQ=S.usedQ.filter(x=>!base.includes(x));pool=base.filter(x=>!seen.includes(x))}
     if(!pool.length)pool=base;i=pick(pool)}
    seen.push(i);
    const keep=S.usedQ.filter(x=>x!==i);S.usedQ=keep.concat(QUIZ.map((q,k)=>k).filter(k=>k!==i&&QUIZ[k][0]===D.tag&&!keep.includes(k)));
    try{return _qz6.apply(this,arguments)}finally{S.usedQ=keep.concat([i])}}}catch(e){console.log('q36lv',e)}
  return _qz6.apply(this,arguments)}}
const s6Open=i=>{try{const a=typeof window.__appOpen==='function'?!!window.__appOpen(i):true;return a&&(IS_APPX()||(typeof s3Ok==='function'?!!s3Ok():!!V2.s3pw))}catch(e){return false}};
const s6QOk=()=>{try{if(inS6(S.ch)&&!S.pmode)return true;if(IS_APPX())return s6Open(C36I)&&S.chDone>=C36I;return S.chDone>=C36I}catch(e){return false}};
window.__s6QOk=s6QOk;
{const _qz6g=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{if(!fcat&&!s6QOk()&&Array.isArray(S.usedQ)){const s6=[];for(let k=Q6_0;k<Q6_0+S6Q.length;k++)s6.push(k);const SS=new Set(s6);
    let keep=S.usedQ.filter(x=>!SS.has(x));
    if(!QUIZ.some((q,k)=>!SS.has(k)&&!keep.includes(k)))keep=[];
    S.usedQ=keep.concat(s6);
    try{return _qz6g.apply(this,arguments)}finally{const add=S.usedQ.filter(x=>!SS.has(x)&&!keep.includes(x));S.usedQ=keep.concat(add)}}}catch(e){console.log('q36gen',e)}
  return _qz6g.apply(this,arguments)}}

/* ---------- 7. 新題型 ---------- */
const curFull=t=>{const c=String(S.qs&&S.qs[S.q]||'');return c.startsWith(t+':')?c:''};
const ZY8='ㄅㄆㄇㄈㄉㄊㄋㄌ',AJ='ABCDEFGHIJ',S6CHARS='ㄓㄔㄕㄖㄗㄘQRSTUV';
const ZY20='ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘ';
const isZ6=t=>ZY20.includes(t);
const reachedCh=c=>{const i=c-1;return S.chDone>i||(S.ch===i&&!S.pmode)};
const S5DD=()=>{try{return S5D}catch(e){return {}}};
function zyLearned6(){let s=ZY8;const d5=S5DD();[31,32,33,34,35].forEach(c=>{if(d5[c]&&reachedCh(c))s+=d5[c].learn.replace(/[A-Z]/g,'')});S6CH.forEach(c=>{if(reachedCh(c))s+=S6D[c].learn.replace(/[A-Z]/g,'')});return [...new Set(s.split(''))]}
function upLearned6(){let s=AJ;const d5=S5DD();[31,32,33,34,35].forEach(c=>{if(d5[c]&&reachedCh(c))s+=d5[c].learn.replace(/[^A-Z]/g,'')});S6CH.forEach(c=>{if(reachedCh(c))s+=S6D[c].learn.replace(/[^A-Z]/g,'')});return [...new Set(s.split(''))]}
const HEARALL=(()=>{try{return Object.assign({},S5HEAR,S6HEAR)}catch(e){return Object.assign({},S6HEAR)}})();
const LIKEZ=(()=>{try{return Object.assign({},S5LIKE.z,S6LIKE.z)}catch(e){return Object.assign({},S6LIKE.z)}})();
const LIKEL=(()=>{try{return Object.assign({},S5LIKE.l,S6LIKE.l)}catch(e){return Object.assign({},S6LIKE.l)}})();
const kOpts=()=>S.diff==='easy'?2:S.diff==='hard'?4:3;
const optsFrom=(t,pool,like,k)=>{const rest=pool.filter(x=>x!==t);const L=like&&rest.includes(like)&&S.diff!=='easy'?[like]:[];return shuffle([t,...[...new Set([...L,...shuffle(rest)])].slice(0,k-1)])};
const pickNot=(arr,last)=>{const a=arr.filter(x=>x!==last);return pick(a.length?a:arr)};
const CNUM=['零','一','兩','三','四','五','六','七','八','九','十','十一','十二'];
const icon6=k=>OB[k]?`<svg viewBox="0 0 64 64" aria-hidden="true">${OB[k]}</svg>`:art('⭐');
// ---- 聽音找符號（ㄓ～ㄘ 新詞卡；ㄅ～ㄒ 用第五季的詞卡；句型同第五季） ----
const hearLine=w=>`${w}，${w}，開頭是哪一個注音呢？`;
let lastWord='';
function bHear6(play,sp,targets){const L=zyLearned6();let T=(targets||[]).filter(x=>HEARALL[x]);if(!T.length){const n6=L.filter(x=>S6HEAR[x]);T=(n6.length?n6:L).filter(x=>HEARALL[x])}
 const t=pickNot(T,S.last);S.last=t;S.ans=t;const W=HEARALL[t];const [e,w]=pickNot(W,W.find(x=>x[1]===lastWord))||W[0];lastWord=w;
 const pool=L.includes(t)?L:L.concat(t);const opts=optsFrom(t,pool,LIKEZ[t],kOpts());
 const line=hearLine(w);
 setPrompt(`聽聽看，<b class="kw">${w}</b> 開頭是哪一個注音？`,[line],sp);
 play.innerHTML=`<div class="h5card" aria-hidden="true"><span class="h5pic">${art(e)}</span><b class="h5w">${w}</b></div><div class="flutter h5flut">${opts.map((c,i)=>`<button class="bal" data-v="${c}" style="--w:${BCOL[i]};--dl:${(i*.25).toFixed(2)}s" aria-label="注音 ${c}"><div class="fl">${balloon(BCOL[i])}<span class="zy">${c}</span></div></button>`).join('')}</div>`;
 const btn=v=>$$('.bal',play).find(b=>b.dataset.v===v);
 $('.h5card',play).onclick=()=>{try{say([line])}catch(err){}};
 S.hint=m=>{if(m===1)petSay('再仔細聽一次喔！',['再仔細聽一次喔！',line]);else{petSay('我幫你，看發光的氣球！');glow(btn(t))}};
 $$('.bal',play).forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(v===t){b.classList.add('win');right(b,[praise(),'開頭的音是',{zh:ZREAD[t],slow:1}])}else wrong(b)})}
// ---- 聽字母名，找大寫（A～V） ----
function bAbc6(play,sp,targets){const L=upLearned6();let T=(targets||[]).filter(x=>/^[A-Z]$/.test(x));if(!T.length)T=L;
 const t=pickNot(T,S.last);S.last=t;S.ans=t;const k=kOpts();const pool=L.includes(t)?L:L.concat(t);const opts=optsFrom(t,pool,LIKEL[t],k);
 setPrompt(`聽聽看，找出小兔子說的字母 <b class="ear">?</b>`,['找一找，這個字母的蝴蝶：',{en:`${t}.`,slow:2}],sp);
 play.innerHTML=`<div class="flutter">${opts.map((c,i)=>{const fx=(i-(k-1)/2)*40+(i%2?30:-30),fy=-40-(i%2)*20;return `<button class="bfly" data-v="${c}" style="--w:${WING[i]};--dl:${(i*.22).toFixed(2)}s;--fx:${fx}vw;--fy:${fy}vh;--fr:${i%2?30:-30}deg" aria-label="字母 ${c}"><div class="fl">${butterfly(WING[i])}<span>${c}</span></div></button>`}).join('')}</div>`;
 const btn=v=>$$('.bfly',play).find(b=>b.dataset.v===v);
 S.hint=m=>{if(m===1)petSay('再仔細聽一次喔！',['再仔細聽一次喔：',{en:`${t}.`,slow:2}]);else{petSay('我幫你，看發光的那一隻！');glow(btn(t))}};
 $$('.bfly',play).forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(v===t){b.classList.add('win');right(b,[praise(),'這是',{en:t+'.',slow:2}])}else wrong(b)})}
// ---- 兩個兩個數 ----
const PAIRI=['🐞','👟','🧦','🦋','🍒'];
function bTwo(play,sp,a){const mx=Math.max(10,+a||20);const hi=S.diff==='easy'?5:S.diff==='hard'?Math.floor(mx/2):Math.min(8,Math.floor(mx/2));const lo=S.diff==='easy'?3:4;
 let k;do{k=rand(lo,hi)}while(k*2===S.last&&hi>lo);const n=k*2;S.last=n;S.ans=n;const it=pick(PAIRI);
 const o=new Set([n]);const K=S.diff==='easy'?2:3;let g=0;while(o.size<K&&g++<50){const v=n+pick([-2,2,-4,4,1,-1]);if(v>=2&&v<=mx+2)o.add(v)}
 setPrompt('<b class="kw">兩個兩個數</b>，一共有幾個？',['兩個兩個數，一共有幾個呢？'],sp);
 play.innerHTML=`<div class="t6pairs">${Array.from({length:k},(_,i)=>`<button class="t6pr" style="--dl:${(i*.08).toFixed(2)}s" aria-label="一對"><i>${art(it)}</i><i>${art(it)}</i></button>`).join('')}</div>${tilesHTML(shuffle([...o]),.4)}`;
 const prs=$$('.t6pr',play);let cnt=0;prs.forEach(b=>b.onclick=()=>{if(S.lock||b.dataset.n)return;cnt++;b.dataset.n=cnt*2;b.classList.add('counted');tone(480+cnt*45,0,.16,'triangle',.08);say([String(cnt*2)])});
 S.hint=m=>{prs.forEach(b=>{delete b.dataset.n;b.classList.remove('counted')});cnt=0;if(m===1)petSay('二、四、六……跟著我兩個兩個數！');else{petSay('我陪你一起數！');countAlong(prs,prs.map((_,i)=>(i+1)*2))}};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===n){prs.forEach(b=>b.classList.add('dance'));right(t,[praise(),`${n}！`])}else wrong(t)})}
// ---- 兩個一對，看有沒有剩（只操作，不說單數、雙數） ----
const PAIRS2=['🧦','👟','🧤'];
function bPair(play,sp){const [lo,hi]=S.diff==='easy'?[4,7]:S.diff==='hard'?[7,11]:[5,9];let T;do{T=rand(lo,hi)}while(T===S.last&&hi>lo);S.last=T;const odd=T%2===1;S.ans=odd?'left':'none';const it=pick(PAIRS2);
 setPrompt('點一點，<b class="kw">兩個一對</b>排好。有沒有剩下一個？',['點一點，兩個一對排好。排好了，有沒有剩下一個呢？'],sp);
 play.innerHTML=`<div class="p6pile">${Array.from({length:T},(_,i)=>`<button class="p6it" style="--dl:${(i*.05).toFixed(2)}s" aria-label="一個">${art(it)}</button>`).join('')}</div><div class="p6row" aria-hidden="true"></div>
  <div class="tiles p6yn"><button class="tile c0 long" style="--dl:.4s" data-v="none">沒有剩</button><button class="tile c2 long" style="--dl:.52s" data-v="left">剩一個</button></div>`;
 const row=$('.p6row',play);let cur=null,done=0,said=0;
 const put=b=>{if(!b||b.classList.contains('gone'))return;b.classList.add('gone');if(!cur||cur.children.length>=2){cur=document.createElement('span');cur.className='p6pr';row.appendChild(cur)}
  cur.insertAdjacentHTML('beforeend',`<i>${art(it)}</i>`);if(cur.children.length===2)cur.classList.add('full');done++;tone(520+done*30,0,.1,'triangle',.07);
  if(done===T&&!said&&!S.lock){said=1;setTimeout(()=>{if(!S.lock&&S.screen==='stage')say(['排好了！看看有沒有剩下一個？'])},250)}};
 $$('.p6it',play).forEach(b=>b.onclick=()=>{if(!S.lock)put(b)});
 S.hint=async m=>{if(m===1)petSay('一個一個點，兩個排成一對！');else{petSay('我幫你排！');for(const b of $$('.p6it:not(.gone)',play)){if(S.lock)return;put(b);await wait(180)}glow($$('.tile',play).find(t=>t.dataset.v===S.ans))}};
 S.__auto=()=>{$$('.p6it:not(.gone)',play).forEach(put);const t=$$('.tile',play).find(x=>x.dataset.v===S.ans);if(t)t.click()};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(t.dataset.v===S.ans){$$('.p6it:not(.gone)',play).forEach(put);right(t,[praise(),odd?'剩下一個！':'每一個都有一對！'])}else wrong(t)})}
// ---- 左右一樣（蝴蝶翅膀，對折看看；不說對稱） ----
const WC=[['#FF9AD0','#E85AA0'],['#7FD0FF','#3A8AD8'],['#FFE07A','#F0A030'],['#B8F0A0','#4EA83A'],['#C8A8FF','#7A5AE0']];
const SPC=['#FFFFFF','#3A2A4A','#FF6A5A','#4A6AE0'];
function wingSVG(L,R,c1,c2){const wing=(sp)=>`<path d="M50 40 Q30 6 10 14 Q2 30 18 40 Q4 52 14 64 Q30 72 50 46Z" fill="${c1}" stroke="${c2}" stroke-width="2"/>${sp.map(([x,y,r,c])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')}`;
 return `<svg viewBox="0 0 100 80" aria-hidden="true"><g>${wing(L)}</g><g transform="translate(100 0) scale(-1 1)">${wing(R)}</g><rect x="47" y="18" width="6" height="48" rx="3" fill="#3A2A4A"/><circle cx="50" cy="16" r="5" fill="#3A2A4A"/><path d="M48 12 Q44 2 40 2 M52 12 Q56 2 60 2" stroke="#3A2A4A" stroke-width="1.6" fill="none"/></svg>`}
function bSym(play,sp){const N=S.diff==='easy'?2:S.diff==='hard'?4:3;const cs=shuffle(WC).slice(0,N);const at=rand(0,N-1);
 const spots=()=>{const o=[];const k=rand(2,3);const P=[[24,26],[32,20],[20,52],[30,58],[38,30]];shuffle(P).slice(0,k).forEach(([x,y])=>o.push([x,y,rand(4,6),pick(SPC)]));return o};
 const items=cs.map(([c1,c2],i)=>{const L=spots();let R=L.map(x=>x.slice());if(i!==at){const m=rand(0,2);if(m===0)R=R.slice(1);else if(m===1)R[0][3]=SPC.find(c=>c!==R[0][3]);else R.push([22,40,5,R[0][3]===SPC[0]?SPC[2]:SPC[0]])}return wingSVG(L,R,c1,c2)});
 S.ans='y';S.last=at;
 setPrompt('哪一隻蝴蝶，<b class="kw">左邊和右邊</b>的翅膀一樣？',['哪一隻蝴蝶，左邊和右邊的翅膀一樣呢？'],sp);
 play.innerHTML=`<div class="y6row">${items.map((s,i)=>`<button class="y6b" data-v="${i===at?'y':'n'+i}" style="--dl:${(.1+i*.12).toFixed(2)}s" aria-label="蝴蝶">${s}</button>`).join('')}</div>`;
 S.hint=m=>{if(m===1)petSay('把翅膀對折看看，左右兩邊的點點一樣嗎？');else{petSay('看發光的那一隻！');glow($('.y6b[data-v="y"]',play))}};
 $$('.y6b',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v==='y'){b.classList.add('y6ok');right(b,[praise(),'左右兩邊一樣！'])}else wrong(b)})}
// ---- 量一量：拖迴紋針一個接一個（「有幾個迴紋針那麼長」；不用公分） ----
const MOBJ={twig:'樹枝',pencil:'鉛筆',leaf:'葉子',worm:'毛毛蟲'};
function objLong(k,W,H){const y=H/2;
 if(k==='pencil')return `<rect x="${W*.12}" y="${y-H*.26}" width="${W*.8}" height="${H*.52}" rx="${H*.08}" fill="#FFC24D" stroke="#C8962A" stroke-width="2"/><rect x="${W*.92-4}" y="${y-H*.26}" width="${W*.08+4}" height="${H*.52}" rx="${H*.12}" fill="#FF8FA8"/><path d="M${W*.12} ${y-H*.26} L0 ${y} L${W*.12} ${y+H*.26}Z" fill="#F6D6A8"/><path d="M${W*.04} ${y-H*.08} L0 ${y} L${W*.04} ${y+H*.08}Z" fill="#4A3A5A"/><path d="M${W*.14} ${y-H*.08} H${W*.9}" stroke="#FFE08A" stroke-width="2"/>`;
 if(k==='leaf')return `<path d="M0 ${y} Q${W*.4} ${y-H*.5} ${W} ${y} Q${W*.4} ${y+H*.5} 0 ${y}Z" fill="#6CC04A" stroke="#3E8A34" stroke-width="2"/><path d="M0 ${y} H${W*.96}" stroke="#3E8A34" stroke-width="2"/>`;
 if(k==='worm'){let o='';const n=Math.max(3,Math.round(W/(H*.7)));const r=W/n/2;for(let i=0;i<n;i++)o+=`<circle cx="${r+i*2*r}" cy="${y}" r="${Math.min(r*1.08,H*.42)}" fill="${i===n-1?'#9AD86A':'#7CC85A'}" stroke="#4E9A3A" stroke-width="1.6"/>`;return o+`<circle cx="${W-r*.7}" cy="${y-3}" r="2.4" fill="#2A1A2A"/>`}
 return `<path d="M0 ${y+2} Q${W*.5} ${y-6} ${W} ${y-2}" stroke="#8A5A32" stroke-width="${H*.22}" stroke-linecap="round" fill="none"/><path d="M${W*.35} ${y-2} L${W*.42} ${y-H*.4} M${W*.7} ${y-3} L${W*.76} ${y+H*.36}" stroke="#8A5A32" stroke-width="3" stroke-linecap="round"/><ellipse cx="${W*.43}" cy="${y-H*.42}" rx="7" ry="4" fill="#6CC04A"/>`}
const clipSVG=`<svg viewBox="0 0 60 24" aria-hidden="true"><path d="M6 18 H48 Q56 18 56 12 Q56 6 48 6 H14 Q9 6 9 10.5 Q9 15 14 15 H44" stroke="#7A8AA6" stroke-width="3.2" fill="none" stroke-linecap="round"/></svg>`;
function bMeasure(play,sp){const [lo,hi]=S.diff==='easy'?[2,4]:S.diff==='hard'?[4,8]:[3,6];let L;do{L=rand(lo,hi)}while(L===S.last&&hi>lo);S.last=L;S.ans=L;
 const ok=Object.keys(MOBJ);const ob=pick(ok);const nm=MOBJ[ob];
 const avail=Math.min((play.clientWidth||innerWidth)*.92,640);const u=Math.max(30,Math.min(70,Math.floor(avail/(L+1.6))));
 const K=S.diff==='easy'?2:3;const o=new Set([L]);let g=0;while(o.size<K&&g++<40){const v=L+pick([-1,1,2,-2]);if(v>=1&&v<=10)o.add(v)}
 setPrompt(`用迴紋針量一量，<b class="kw">${nm}</b>有幾個迴紋針那麼長？`,['把迴紋針一個接一個排好，量一量，有幾個迴紋針那麼長呢？'],sp);
 play.innerHTML=`<div class="m6wrap" style="--u:${u}px">
   <div class="m6obj" style="width:${L*u}px"><svg viewBox="0 0 ${L*u} 44" preserveAspectRatio="none" aria-hidden="true">${objLong(ob,L*u,44)}</svg></div>
   <div class="m6track" style="width:${(L+1)*u}px"><i class="m6start"></i></div>
   <div class="m6tray">${Array.from({length:L+2},(_,i)=>`<button class="m6c" style="--dl:${(i*.06).toFixed(2)}s" aria-label="迴紋針">${clipSVG}</button>`).join('')}</div></div>${tilesHTML(shuffle([...o]),.5)}`;
 const track=$('.m6track',play),tray=$('.m6tray',play);let said=0;
 const placed=()=>$$('.m6c.on',track);
 const relayout=()=>placed().forEach((c,i)=>{c.style.left=(i*u)+'px'});
 function place(c){if(S.lock||c.classList.contains('on'))return false;const n=placed().length;
  if(n>=L){c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');petSay('超過了！拿回來一個。');return false}
  c.classList.add('on');c.style.transform='';track.appendChild(c);relayout();tone(600+n*40,0,.1,'triangle',.07);
  if(n+1===L&&!said&&!S.lock){said=1;setTimeout(()=>{if(!S.lock&&S.screen==='stage')say(['排好了！數一數，有幾個迴紋針那麼長？'])},250)}return true}
 function back(c){c.classList.remove('on');c.style.left='';c.style.transform='';tray.appendChild(c);relayout();tone(480,0,.08,'triangle',.05)}
 // 拖：按住迴紋針拖到尺上（量的地方）放開；點一下也可以（接到最後面）
 $$('.m6c',play).forEach(c=>{let sx=0,sy=0,mv=false,dn=false;
  c.addEventListener('pointerdown',e=>{if(S.lock)return;dn=true;mv=false;sx=e.clientX;sy=e.clientY;try{c.setPointerCapture(e.pointerId)}catch(_){}c.classList.add('drag')});
  c.addEventListener('pointermove',e=>{if(!dn)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>8)mv=true;if(mv&&!c.classList.contains('on'))c.style.transform=`translate(${dx}px,${dy}px)`});
  const end=e=>{if(!dn)return;dn=false;c.classList.remove('drag');
   if(c.classList.contains('on')){if(!mv)back(c);return}
   if(mv){const r=track.getBoundingClientRect();const inT=e.clientX>r.left-u&&e.clientX<r.right+u&&e.clientY>r.top-u*1.2&&e.clientY<r.bottom+u*1.2;c.style.transform='';if(inT)place(c)}else place(c)};
  c.addEventListener('pointerup',end);c.addEventListener('pointercancel',()=>{dn=false;c.classList.remove('drag');c.style.transform=''})});
 S.hint=async m=>{if(m===1)petSay('從最左邊開始，一個接一個排，不要留空隙！');else{petSay('我幫你排！');for(const c of $$('.m6tray .m6c',play)){if(S.lock||placed().length>=L)break;place(c);await wait(220)}countAlong(placed());glow($$('.tile',play).find(t=>+t.dataset.v===L))}};
 S.__auto=()=>{for(const c of $$('.m6tray .m6c',play)){if(placed().length>=L)break;place(c)}const t=$$('.tile',play).find(x=>+x.dataset.v===L);if(t)t.click()};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===L){for(const c of $$('.m6tray .m6c',play)){if(placed().length>=L)break;place(c)}right(t,[praise(),`${CNUM[L]}個迴紋針那麼長！`])}else wrong(t)})}
// ---- 天平比輕重（只看哪邊低；不用單位） ----
const WT={watermelon:9,rock:7,apple:5,banana:4,acornT:2,feather:1};
const WN={watermelon:'西瓜',rock:'石頭',apple:'蘋果',banana:'香蕉',acornT:'橡果',feather:'羽毛'};
function balSVG(a,b){const d=WT[a]>WT[b]?1:-1;const ang=d*12;
 const pan=(x,k)=>`<path d="M${x-22} 0 L${x} -34 L${x+22} 0" stroke="#8A7A6A" stroke-width="1.6" fill="none"/><path d="M${x-26} 0 Q${x} 14 ${x+26} 0Z" fill="#C8B8A0" stroke="#8A7A6A" stroke-width="1.6"/><g transform="translate(${x-18} -34) scale(.56)">${OB[k]||''}</g>`;
 const lx=40,rx=160,dy=Math.sin(ang*Math.PI/180)*60;
 return `<svg viewBox="0 0 200 140" aria-hidden="true"><path d="M86 136 L100 52 L114 136Z" fill="#B8865A"/><rect x="70" y="130" width="60" height="8" rx="3" fill="#8A5A32"/>
  <g class="w6beam" style="--ang:${ang}deg"><rect x="34" y="46" width="132" height="7" rx="3" fill="#D8A060"/></g><circle cx="100" cy="50" r="6" fill="#8A5A32"/>
  <g transform="translate(0 ${(86-dy).toFixed(1)})">${pan(lx,a)}</g><g transform="translate(0 ${(86+dy).toFixed(1)})">${pan(rx,b)}</g></svg>`}
function bWeigh(play,sp){const ks=Object.keys(WT);const hard=S.diff==='hard';
 if(hard){let t;do{t=shuffle(ks).slice(0,3).sort((x,y)=>WT[y]-WT[x])}while(WT[t[0]]-WT[t[1]]<1||WT[t[1]]-WT[t[2]]<1);const [H1,M,Lw]=t;S.ans=H1;
  const pairA=Math.random()<.5?[H1,M]:[M,H1],pairB=Math.random()<.5?[M,Lw]:[Lw,M];
  setPrompt('看兩個天平，哪一個<b class="kw">最重</b>？',['看看兩個天平，往下的那一邊比較重。哪一個最重呢？'],sp);
  play.innerHTML=`<div class="w6two"><div class="w6bal">${balSVG(...pairA)}</div><div class="w6bal">${balSVG(...pairB)}</div></div><div class="tiles w6tiles">${shuffle(t).map((k,i)=>`<button class="tile c${i} long w6t" style="--dl:${(.4+i*.12).toFixed(2)}s" data-v="${k}"><span class="w6ic">${icon6(k)}</span>${WN[k]}</button>`).join('')}</div>`;
  S.hint=m=>{if(m===1)petSay('往下的那一邊比較重。先看看誰比誰重！');else{petSay('看發光的那一個！');glow($$('.tile',play).find(x=>x.dataset.v===S.ans))}};
  $$('.tile',play).forEach(x=>x.onclick=()=>{if(S.lock)return;if(x.dataset.v===S.ans)right(x,[praise(),'這個最重！']);else wrong(x)});return}
 let a,b;do{[a,b]=shuffle(ks).slice(0,2)}while(Math.abs(WT[a]-WT[b])<1||(a+b)===S.last);S.last=a+b;
 const heavy=S.diff==='easy'||Math.random()<.6;const t=heavy?(WT[a]>WT[b]?a:b):(WT[a]>WT[b]?b:a);S.ans=t;
 setPrompt(heavy?'天平往下的那一邊比較重。哪一個比較<b class="kw">重</b>？':'天平往上的那一邊比較輕。哪一個比較<b class="kw">輕</b>？',[heavy?'天平往下的那一邊，比較重。哪一個比較重呢？':'天平往上的那一邊，比較輕。哪一個比較輕呢？'],sp);
 play.innerHTML=`<div class="w6bal one">${balSVG(a,b)}</div><div class="tiles w6tiles">${[a,b].map((k,i)=>`<button class="tile c${i*2} long w6t" style="--dl:${(.4+i*.12).toFixed(2)}s" data-v="${k}"><span class="w6ic">${icon6(k)}</span>${WN[k]}</button>`).join('')}</div>`;
 S.hint=m=>{if(m===1)petSay(heavy?'看看天平，哪一邊往下？':'看看天平，哪一邊往上？');else{petSay('看發光的那一個！');glow($$('.tile',play).find(x=>x.dataset.v===S.ans))}};
 $$('.tile',play).forEach(x=>x.onclick=()=>{if(S.lock)return;if(x.dataset.v===S.ans)right(x,[praise(),heavy?'往下的那一邊比較重！':'往上的那一邊比較輕！']);else wrong(x)})}
// ---- 疊圖示：一個放一格疊起來，比誰多誰少（不叫長條圖） ----
const PICSET={w:[['sun','晴天'],['rain','雨天'],['cloudy','陰天']],b:[['🦋','蝴蝶'],['🐞','瓢蟲'],['🐝','蜜蜂']]};
function bPic(play,sp){const set=(S.ch+1===39&&!S.pmode)||(S.pmode&&Math.random()<.5)?'w':'b';const C=PICSET[set];const nc=S.diff==='easy'?2:3;const cats=C.slice(0,nc);
 const most=S.diff!=='hard'||Math.random()<.5;let cnt;let g=0;
 do{cnt=cats.map(()=>rand(1,S.diff==='easy'?4:5));g++}while(g<80&&(new Set(cnt).size<cnt.length||(S.diff==='easy'&&Math.abs(cnt[0]-cnt[1])<1)));
 const tIdx=most?cnt.indexOf(Math.max(...cnt)):cnt.indexOf(Math.min(...cnt));S.ans=String(tIdx);
 const ic=k=>set==='w'?icon6(k):art(k);
 const days=shuffle(cats.flatMap(([k],i)=>Array(cnt[i]).fill(i)));const mx=Math.max(...cnt);
 setPrompt(`一個放一格，疊起來比一比。哪一種最<b class="kw">${most?'多':'少'}</b>？`,[most?'一個放一格，疊起來比一比，哪一種最多呢？':'一個放一格，疊起來比一比，哪一種最少呢？'],sp);
 play.innerHTML=`<div class="g6days">${days.map((i,d)=>`<button class="g6d" data-c="${i}" style="--dl:${(d*.05).toFixed(2)}s" aria-label="${cats[i][1]}">${ic(cats[i][0])}</button>`).join('')}</div>
  <div class="g6chart" style="--rows:${mx}">${cats.map(([k,nm],i)=>`<div class="g6col" data-c="${i}"><div class="g6stack">${Array.from({length:mx},()=>'<i class="g6cell"></i>').join('')}</div><span class="g6lab">${ic(k)}<small>${nm}</small></span></div>`).join('')}</div>
  <div class="tiles g6tiles">${cats.map(([k,nm],i)=>`<button class="tile c${i} long" style="--dl:${(.4+i*.12).toFixed(2)}s" data-v="${i}">${nm}</button>`).join('')}</div>`;
 let left=days.length,said=0;
 const put=b=>{if(!b||b.classList.contains('gone'))return;const i=+b.dataset.c;const col=$(`.g6col[data-c="${i}"] .g6stack`,play);const cell=$$('.g6cell:not(.on)',col).pop();b.classList.add('gone');if(cell){cell.classList.add('on');cell.innerHTML=ic(cats[i][0])}left--;tone(560+(days.length-left)*25,0,.1,'triangle',.07);
  if(!left&&!said&&!S.lock){said=1;setTimeout(()=>{if(!S.lock&&S.screen==='stage')say([most?'疊好了！看一看，哪一種最多呢？':'疊好了！看一看，哪一種最少呢？'])},250)}};
 $$('.g6d',play).forEach(b=>b.onclick=()=>{if(!S.lock)put(b)});
 S.hint=async m=>{if(m===1)petSay('點一點，把每一個放到它的那一排！');else{petSay('我幫你疊！');for(const b of $$('.g6d:not(.gone)',play)){if(S.lock)return;put(b);await wait(160)}glow($$('.tile',play).find(t=>t.dataset.v===S.ans))}};
 S.__auto=()=>{$$('.g6d:not(.gone)',play).forEach(put);const t=$$('.tile',play).find(x=>x.dataset.v===S.ans);if(t)t.click()};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(t.dataset.v===S.ans){$$('.g6d:not(.gone)',play).forEach(put);right(t,[praise(),`${cats[tIdx][1]}最${most?'多':'少'}！`])}else wrong(t)})}
// ---- 十根十根數（香蕉十根一串，只數整十到 100；第 36、40 章） ----
const BUNCH=`<svg viewBox="0 0 64 64" aria-hidden="true">${[0,1,2,3,4].map(k=>`<path transform="rotate(${-28+k*14} 32 8)" d="M30 10 Q22 34 30 56 Q34 58 35 54 Q30 34 34 10Z" fill="#FFD84D" stroke="#C8A020" stroke-width="1.6"/>`).join('')}<rect x="27" y="2" width="10" height="9" rx="3" fill="#7A5A2A"/></svg>`;
function bTens6(play,sp,a){const mx=Math.max(20,+a||100);const K=Math.floor(mx/10);let k;do{k=rand(2,S.diff==='easy'?Math.min(4,K):K)}while(k*10===S.last&&K>2);const n=k*10;S.last=n;S.ans=n;
 const o=new Set([n]);let g=0;while(o.size<(S.diff==='easy'?2:3)&&g++<50){const v=n+pick([-10,10,-20,20]);if(v>=10&&v<=Math.max(mx,n+10))o.add(v)}
 setPrompt('香蕉<b class="kw">十根一串</b>，十根十根數，一共有幾根？',['香蕉十根一串，十根十根數，一共有幾根呢？'],sp);
 play.innerHTML=`<div class="t5bags b6bun">${Array.from({length:k},(_,b)=>`<button class="t5bag b6b" style="--dl:${(b*.12).toFixed(2)}s" aria-label="一串十根">${BUNCH}<i class="b6n">10</i></button>`).join('')}</div>${tilesHTML(shuffle([...o]),.5)}`;
 const bags=$$('.b6b',play);let cnt=0;bags.forEach(b=>b.onclick=()=>{if(S.lock||b.dataset.n)return;cnt++;b.dataset.n=cnt*10;b.classList.add('counted');tone(480+cnt*45,0,.16,'triangle',.08);say([String(cnt*10)])});
 S.hint=m=>{bags.forEach(b=>{delete b.dataset.n;b.classList.remove('counted')});cnt=0;if(m===1)petSay('十、二十、三十……跟著我十根十根數！');else{petSay('我陪你一起數！');countAlong(bags,bags.map((_,i)=>(i+1)*10))}};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===n){bags.forEach(b=>b.classList.add('dance'));right(t,[praise(),`${n}！`])}else wrong(t)})}
// 接到現有題型上（第二段是 s6 的才接手）
const B6={s6t:bTens6,hear6:bHear6,k6:bAbc6,s6two:bTwo,s6pair:bPair,s6sym:bSym,s6m:bMeasure,s6w:bWeigh,s6pic:bPic};
const NEED6={s6two:37,s6pair:37,s6sym:37,s6m:38,s6w:38,s6pic:39};
const argsOf=(type,sub)=>{const f=curFull(type);if(!f)return null;const p=f.split(':');return p[1]===sub?p.slice(2):null};
const wrap6=(type,subs)=>{const _o=BUILD[type];BUILD[type]=function(play,sp,arg){try{if(subs.includes(arg)){const a=argsOf(type,arg);const k=(a&&a[0])||'';S.w4fb=0;
   // 自由練習「量一量、比一比」：還沒玩到的題型先換成十個十個數（第五季題型）
   if(S.pmode&&S.pmode.k==='math6'&&NEED6[arg]&&S.chDone<NEED6[arg]){const o=S.qs[S.q];S.qs[S.q]='count:s6t:100';try{return BUILD.count(play,sp,'s6t')}finally{S.qs[S.q]=o}}
   if(arg==='hear6'||arg==='k6')return B6[arg](play,sp,k&&k!=='auto'?k.split('|'):null);
   return B6[arg](play,sp,k)}}catch(e){console.log('b6',type,arg,e)}return _o.apply(this,arguments)}};
wrap6('zhuyin',['hear6']);wrap6('letter',['k6']);wrap6('count',['s6two','s6pair','s6t']);wrap6('shape',['s6sym']);wrap6('measure',['s6m']);wrap6('compare',['s6w','s6pic']);

/* ---------- 8. 寫字：ㄓ～ㄘ、Q～V（筆畫資料 s6/write/write6.js 進到 __WR.CH 以後就用；還沒有的字退回聽音找符號／認字母） ---------- */
const wrHas=c=>{try{return !!(window.__WR&&__WR.CH&&__WR.CH[c])}catch(e){return false}};
function wr6Fallback(play,sp,chars){const c=pickNot(chars.length?chars:['ㄓ'],S.last);const r=isZ6(c)?bHear6(play,sp,[c]):bAbc6(play,sp,[c]);S.w4fb=1;return r}
{const _w6=BUILD.write,_r6=BUILD.R;
 BUILD.write=function(play,sp,arg){try{const f=curFull('write');const c=(f?f.split(':')[1]:arg)||'';if(c&&S6CHARS.includes(c)&&!wrHas(c))return wr6Fallback(play,sp,[c])}catch(e){console.log('w6',e)}return _w6.apply(this,arguments)};
 BUILD.R=function(play,sp,arg){try{const f=curFull('R');if(f){const p=f.split(':');const chars=(p[1]||'').split('|').filter(Boolean);const ok=chars.filter(c=>!S6CHARS.includes(c)||wrHas(c));
    if(!ok.length)return wr6Fallback(play,sp,chars);
    if(ok.length!==chars.length){p[1]=ok.join('|');S.qs[S.q]=p.join(':')}}}catch(e){console.log('r6',e)}return _r6.apply(this,arguments)}}
function s6Learned(){let o='';S6CH.forEach(c=>{const i=c-1,L=S6D[c].learn;if(!L)return;if(S.chDone>i||(S.ch===i&&(S.progs[i]||0)>=8))o+=L;else if(S.chDone>=i&&(S.progs[i]||0)>=1)o+=L[0]+(L.match(/[A-Z]/)||[''])[0]});return [...new Set(o.split(''))].filter(Boolean)}
window.__s6Learned=s6Learned;
{const _wf6=BUILD.wfree;BUILD.wfree=function(play,sp){try{const L6=s6Learned().filter(wrHas);if(L6.length&&Math.random()<.5){const t=pickNot(L6,S.last);const code='write:'+t+':'+(S.diff==='easy'?2:3);
   if(window.__WR&&typeof __WR.build==='function'){try{return __WR.build(play,sp,code)}catch(e){console.log('wr free6',e)}}}}catch(e){}return _wf6.apply(this,arguments)}}

/* ---------- 9. 破關小劇場（第 36～39 章各一句；第 40 章用季完結大結局） ---------- */
try{const A=k=>()=>animal(k),I=e=>()=>art(e);const TH=window.TH93;
 Object.assign(TH.T93,{
  35:{line:S6D[36].theater,o:'50% 60%',tint:'day',deco:[[A('sloth'),'bob',84,52,15],[I('🍃'),'pop',16,18,7],[A('monkey'),'hop',12,58,12]]},
  36:{line:S6D[37].theater,o:'50% 60%',tint:'day',deco:[[A('ladybug'),'hop',84,60,12],[A('butterfly'),'bob',14,40,11],[I('🌼'),'pop',70,14,7]]},
  37:{line:S6D[38].theater,o:'50% 65%',tint:'day',deco:[[A('blackbear'),'bob',84,58,14],[A('salmon'),'hop',12,64,12],[I('🎒'),'pop',50,10,8]]},
  38:{line:S6D[39].theater,o:'50% 60%',tint:'warm',deco:[[A('robot'),'hop',84,58,13],[I('☀️'),'pop',16,12,10],[I('🧹'),'bob',12,60,10]]}});
 TH.BIG[39]='chend'}catch(e){console.log('th36',e)}

/* ---------- 10. 第三十五章大結局：接到第六季 ---------- */
const appOk=i=>{try{return typeof window.__appOpen==='function'?!!window.__appOpen(i):true}catch(e){return false}};
{const _ce35=SCREENS.chend;SCREENS.chend=function(){const r=_ce35.apply(this,arguments);
 try{if(S.ch===34&&$('.fin5')&&CHAPTERS[C36I]){const ln=$('.fin5 p.s5');
   if(appOk(C36I)){if(ln)ln.textContent=S6NEXT;const eb=$('.fin5 .endbtns');
    if(eb&&!$('#nextch6')){const b=document.createElement('button');b.className='btn';b.id='nextch6';b.textContent='前往第六季';eb.insertBefore(b,eb.firstChild);
     const gc=$('#gcert');if(gc)gc.className='btn2';
     b.onclick=()=>{clearEnd();hush();setCh(C36I);if(S.prog>=NL)S.prog=0;S.walkFrom=null;save();go(S.prog===0?'story':'guide')}}}
   else if(ln)ln.textContent=S6AD}}catch(e){console.log('fin5to6',e)}
 return r}}

/* ---------- 11. 章末禮物（第 36～39 章；第 40 章是季完結） ---------- */
const NAME6=id=>(ITEM[id]||{}).name||'';
{const _rw6=REWARD.chapter;REWARD.chapter=function(card,finish){if(!inS6(S.ch))return _rw6.apply(this,arguments);
 const c=S.ch+1,C=CHAPTERS[S.ch],ids=GIFT[c]||[];
 card.innerHTML=`<div class="scroll">${C.letter}<span class="sign">—— 王子</span>${sealSVG()}</div><button class="btn" id="next">看看禮物</button>`;
 say([{zh:C.letter.replace(/<br>/g,''),who:'prince'}]);
 $('#next',card).onclick=()=>{ids.forEach(id=>{if(!owns(id))S.owned.push(id)});S.newPrize=ids.slice();
  ids.forEach(id=>{const it=ITEM[id];if(!it)return;if(it.slot==='dress')S.look.dress=id;if(it.slot==='prop')S.look.prop=id;if(it.slot==='petacc')S.look.petacc=id});
  const n=C.gems||10;S.wallet+=n;save();try{renderBar()}catch(e){}
  const names=ids.map(NAME6).filter(Boolean).join('和');const it0=ITEM[ids[0]]||{};
  const pic=it0.slot==='pet'?`<span class="bob">${petSVG(ids[0],'')}</span>${princess(S.look)}`:it0.slot==='petacc'?`${princess(S.look)}<span class="bob">${petSVG(S.look.pet,ids[0])}</span>`:`${princess(S.look)}<span class="bob">${myPet('class="small"')}</span>`;
  card.innerHTML=`<div class="petshow">${pic}</div><h2>得到${names}！</h2><p class="small">還有 ${n} 顆寶石！</p><button class="btn" id="cont">太棒了！</button>`;
  sfx('gem');confetti();say([`得到${names}了！`,'還有十顆寶石！']);$('#cont',card).onclick=finish}}}
const NEWPET='你得到新的衣服和寵物了！點「換裝間」，可以換上新衣服喔！';
function s6CatchUp(){let ch=false;S6CH.forEach(c=>{if(S.chDone>=c)(GIFT[c]||[]).forEach(id=>{if(!owns(id)){S.owned.push(id);ch=true}})});if(ch)save()}
window.__s6CatchUp=s6CatchUp;

/* ---------- 12. 第六季完結：大自然小守護者頒獎典禮＋獎狀 ---------- */
const CERT6K=()=>'cert6_'+(window.HERO||'princess');window.CERT6K=CERT6K;
const cert6Date=()=>{const c=V2[CERT6K()];if(!c||!c.d)return '';const [y,m,d]=c.d.split('-');return `${y} 年 ${+m} 月 ${+d} 日`};
const cert6Give=()=>{if(V2[CERT6K()])return false;const n=new Date();V2[CERT6K()]={d:`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`};save2();return true};
const FIN6_END=S6D[40].endText;
const S6BADGE=(a='')=>{try{return A6.BADGE(a)}catch(e){return ''}};window.S6BADGE=S6BADGE;
const esc6=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function certHTML6(o){if(typeof A6.certHTML==='function')return A6.certHTML(o);const nm=(o.name||'').trim();
 return `<div class="card certcard cert3 cert6" role="dialog" aria-label="${S6FIN.cert_title}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${S6FIN.cert_title}</div><div class="certto">頒給：<b>${nm?esc6(nm):S6FIN.cert_to}</b></div>
  <div class="certbody">${S6FIN.cert_body.map(s=>s==='<br>'?'<br>':`<span>${s}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero}</span><span class="c3badge">${S6BADGE()}</span><span class="u">${o.pet}</span></div>
  <div class="certfoot"><div><div class="certsig">${S6FIN.cert_sign}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${S6BADGE()}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`}
function cert6Show(after){const old=$('.certov');if(old)old.remove();
 const ov=overlay(screen,certHTML6({name:S.name||'',hero:princess(S.look),pet:myPet(),date:cert6Date()}));ov.classList.add('certov');
 $('#certok',ov).onclick=()=>{hush();ov.remove();if(after)after()};
 say([S6FIN.c1,{pause:200},S6FIN.c2,{pause:200},S6FIN.c3]);return ov}
window.cert6Show=cert6Show;
const cert6Visible=()=>{try{if(!V2[CERT6K()])return false;if(IS_APPX()&&typeof window.__bkCap==='function')return __bkCap()>=40;return true}catch(e){return false}};
{const _cp5=certPick;certPick=function(){if(!cert6Visible())return _cp5.apply(this,arguments);
 const c5=(()=>{try{return !!(window.CERT5K&&V2[CERT5K()])&&(!IS_APPX()||typeof window.__bkCap!=='function'||__bkCap()>=35)}catch(e){return false}})();
 const L=[[!!V2[CERTK()],'2','星光小勇士','第二季'],[!!V2[CERT3K()],'3','星光小幫手','第三季'],[!!(window.CERT4K&&V2[CERT4K()]),'4','星光太空探險隊','第四季'],[c5,'5','星光小管家','第五季'],[true,'6','大自然小守護者','第六季']].filter(x=>x[0]);
 const open=s=>s==='6'?cert6Show():s==='5'?cert5Show():s==='4'?cert4Show():s==='3'?cert3Show():certShow();
 if(L.length<=1){hush();return open('6')}
 const seal=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#E8505A"/><circle cx="50" cy="50" r="36" fill="none" stroke="#FFE7B0" stroke-width="3" stroke-dasharray="4 4"/><path d="${certStarD(50,50,22,10)}" fill="#FFE27A"/></svg>`;
 const ic={'2':seal,'3':(()=>{try{return S25BADGE()}catch(e){return seal}})(),'4':(()=>{try{return S4BADGE()}catch(e){return seal}})(),'5':(()=>{try{return S5BADGE()}catch(e){return seal}})(),'6':S6BADGE()};
 const ov=overlay(screen,`<div class="card certpick${L.length>2?' cp3':''}${L.length>3?' cp4':''}${L.length>4?' cp5':''}"><h2>想看哪一張？</h2><div class="cprow">
  ${L.map(([,s,t,n])=>`<button class="cpbtn" data-s="${s}"><span class="cpic">${ic[s]}</span><b>${t}</b><small>${n}</small></button>`).join('')}</div>
  <button class="btn2" id="cpno">關閉</button></div>`);
 say(['你想看哪一張？']);
 $$('.cpbtn',ov).forEach(b=>b.onclick=()=>{sfx('pop');hush();ov.remove();open(b.dataset.s)});
 $('#cpno',ov).onclick=()=>{hush();ov.remove();sfx('pop')}}}
{const _w6=SCREENS.world;SCREENS.world=function(){const r=_w6.apply(this,arguments);try{if(cert6Visible()){let b=$('#wcert');
 if(!b){const sp=$('.whead .phsp');if(sp){b=document.createElement('button');b.className='btn2 small';b.id='wcert';b.textContent='🏅 獎狀';sp.replaceWith(b)}}
 if(b)b.onclick=()=>{sfx('pop');certPick()}}}catch(e){console.log('cert6',e)}return r}}
let fin6Tok=0,fin6Cert=0;
function grandFinale6(){clearEnd();const tok=++fin6Tok;const live=()=>tok===fin6Tok&&S.screen==='chend';
 const calm=RM()||!!S.lite;const first=cert6Give();fin6Cert=0;
 screen.innerHTML=`<div class="ending grand fin4 fin6"><svg class="fin6bg" aria-hidden="true"></svg>
  <div class="gparade">${S6FIN.f.map(([k],j)=>`<span class="gfr" data-k="${k}" style="animation-delay:${(1.2+j*.22).toFixed(2)}s">${animal(k)}</span>`).join('')}</div>
  <div class="trio"><div class="walkin">${princess(S.look)}</div><div class="fromdoor">${prince()}</div><div class="walkin u" style="animation-delay:.3s">${myPet()}</div></div>
  <h2 class="endh">${S6FIN.h}</h2><p class="endp">五章的冒險，全部完成了！<br>大自然的朋友都來幫你拍拍手！</p>
  <div class="endbtns"><button class="btn" id="gcert">看獎狀</button><button class="btn2" id="again">再玩一次</button><button class="btn2" id="endworld">大地圖</button><button class="btn2" id="home">回首頁</button></div>
  <p class="s6">下一站：第七季「星光城市小旅行」，敬請期待！</p></div>`;
 fin6Bg();
 const T=(ms,f)=>endTimers.push(setTimeout(f,calm?0:ms));
 if(!calm){for(let k=0;k<10;k++)T(1800+k*900,()=>{if(!live()||fin6Cert)return;burst(innerWidth*(.12+Math.random()*.76),innerHeight*(.06+Math.random()*.28),46);if(k%3===0)sfx('gem')});
  T(3000,()=>{if(live()&&!fin6Cert)confetti()});T(3400,()=>$$('.fin6 .trio > div,.fin6 .gfr').forEach(d=>{const s=d.firstElementChild||d;s.classList.add('jig')}))}
 const cert=()=>{if(!live())return;fin6Cert=1;clearEnd();hush();cert6Show(()=>{if(live())say([FIN6_END])})};
 $('#gcert').onclick=cert;
 $('#again').onclick=()=>{fin6Tok++;clearEnd();hush();S.prog=0;S.walkFrom=null;save();go('guide')};
 $('#endworld').onclick=()=>{fin6Tok++;clearEnd();hush();go('world')};
 $('#home').onclick=()=>{fin6Tok++;clearEnd();hush();go('title')};
 (async()=>{const sw=a=>Promise.all([say(a),wait(calm?300:1800)]);const stop=()=>!live()||fin6Cert;
  const talk=async(sel,a)=>{const el=$(sel);if(el){el.classList.add('gtalk');if(!calm)burstEl(el,14)}await sw(a);if(el)el.classList.remove('gtalk')};
  await sw([S6FIN.h,{pause:200},S6FIN.p]);if(stop())return;
  for(const [k,t] of S6FIN.f){if(stop())return;await talk(`.fin6 .gfr[data-k="${k}"]`,[t])}
  if(stop())return;await talk('.fin6 .fromdoor',[ISBOY?{zh:S6FIN.dr,who:'dragon'}:{zh:S6FIN.pr,who:'prince'}]);
  if(stop())return;if(!first){await sw([FIN6_END]);return}
  if($('.certov'))return;cert()})()}
window.grandFinale6=grandFinale6;
function fin6Bg(){const fe=$('.fin6'),g=fe&&$('.fin6bg',fe);if(!g)return;const r=fe.getBoundingClientRect();if(!r.width||!r.height)return;
 let W=Math.round(500*r.width/r.height),H=500;if(r.height>r.width){W=400;H=Math.round(400*r.height/r.width)}const key=W+'x'+H;if(g.dataset.k===key)return;
 g.dataset.k=key;g.setAttribute('viewBox',`0 0 ${W} ${H}`);g.setAttribute('preserveAspectRatio','xMidYMax slice');try{g.innerHTML=(BG6.camp40night||BG6.camp40)(W,H)}catch(e){}}
{let t6=0;addEventListener('resize',()=>{clearTimeout(t6);t6=setTimeout(()=>{try{if($('.fin6'))fin6Bg()}catch(e){}},150)})}
{const _ce6=SCREENS.chend;SCREENS.chend=function(){if(S.ch===C40I)return grandFinale6();return _ce6.apply(this,arguments)}}

/* ---------- 13. 自由練習：五個主題＋聽聲音找注音＋量一量、比一比 ---------- */
S6PT.forEach(([k,n,e,h,bg,qs])=>PTOPICS.push([k,n,e,h,bg,qs.slice()]));
const PT6=Object.fromEntries(S6PT.map(x=>[x[0],x[6]]));
{const _pp6=SCREENS.practice;SCREENS.practice=function(){const r=_pp6.apply(this,arguments);try{Object.entries(PT6).forEach(([k,c])=>{const i=c-1;
  const ok=s6Open(i)&&S.chDone>i;
  if(!ok){const b=document.querySelector(`.tcard[data-k="${k}"]`);if(b)b.remove()}})}catch(e){console.log('pt6',e)}return r}}

/* ---------- 14. 圖鑑：樹懶、瓢蟲、鉤吻鮭、小猴子；寶物「小守護者徽章」一排 ---------- */
try{DEX.push(['sloth','樹懶','Sloth'],['ladybug','瓢蟲','Ladybug'],['salmon','櫻花鉤吻鮭','Formosan salmon'],['monkey','小猴子','Monkey'])}catch(e){}
{const _dx6=SCREENS.dex;SCREENS.dex=function(tab){const r=_dx6.apply(this,arguments);try{if((tab||'ani')!=='tre')return r;const body=$('#dbody');if(!body||$('.trow.s6b',body))return r;
  const B=S6CH.map(c=>({c:c-1,ok:S.chDone>c-1&&s6Open(c-1)}));if(!B.some(x=>x.ok)&&S.chDone<C36I)return r;
  const row=document.createElement('div');row.className='trow s6b';row.innerHTML=`<h3>${art('🌳')}小守護者徽章</h3><div class="titems">${B.map((x,k)=>`<button class="titem${x.ok?'':' unk'}" data-c="${x.c}"><span class="tpic">${x.ok?`<span class="s6mini">${(A6.MINI||(()=>''))(k)}</span>`:WICON.stamp}</span><small>${x.ok?wName(x.c):'？'}</small></button>`).join('')}</div>`;
  body.appendChild(row);
  $$('.titem',row).forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(b.classList.contains('unk')){say(['這個徽章還沒拿到喔！']);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
   b.classList.remove('jig');void b.offsetWidth;b.classList.add('jig');sfx('gem');burstEl(b,16);say([`這是${wName(c)}的小守護者徽章！`])})}catch(e){console.log('dex6',e)}return r}}

/* ---------- 15. 網頁版密碼（跟第三～五季同一個密碼、同一個開關）：標題改「第六季搶先玩」；App 購買：第三十六～四十章（stage8） ---------- */
{let want=-1;const _sh6=show;show=function(name,arg){try{want=S.ch;if(name==='title'||name==='chend')s6CatchUp()}catch(e){}return _sh6.apply(this,arguments)};
 const _g6=s3Gate;s3Gate=function(then){const r=_g6.apply(this,arguments);try{if(want>=C36I){const h=$('.s3gate h2');if(h)h.textContent='第六季搶先玩'}}catch(e){}return r};window.__s3Gate=s3Gate}
// App：商品 tw.starlight.adventure.stage8（價格由 App Store 回傳，這裡不寫；比照前幾段）；m67 的 STAGES 用 push 加
try{if(typeof STAGES!=='undefined'&&!STAGES.some(s=>s[0]==='stage8'))STAGES.push(['stage8','第三十六～四十章',35,40])}catch(e){console.log('stage8',e)}
const SEG6={id:'stage8',r:'第三十六～四十章',arc:'第六季・星光大自然',from:36,
 learn:['聽音找符號：ㄓㄔㄕㄖㄗㄘ（還不拼讀）；英文大寫 Q～V；跟著筆順寫','數到 60、十個十個數到 100、兩個兩個數；用迴紋針量一量、天平比輕重、一格一個圖示疊起來比多少','雨林、昆蟲、溪流：不摘花、看完昆蟲放回去；玩水要大人陪、有人落水不自己救，喊大人打一一九；颱風待在家、地震趴下掩護穩住'],
 extra:'新寵物小樹懶，新衣服探險背心裝、雨衣雨鞋，房間多了昆蟲觀察箱和小帳篷。遊樂園多一個「雨林盪藤蔓」（完成第三十六章打開，照順序接香蕉）。完成第四十章，拿到「大自然小守護者」獎狀。',
 park:[['i:vine6','雨林盪藤蔓','🐒']]};
{const _ih6=window.__iapShopHook;window.__iapShopHook=function(ov,price){const r=_ih6?_ih6.apply(this,arguments):undefined;try{const d=$('.f3intro',ov);if(!d||$('.f3seg[data-seg="s6"]',d))return r;
  const lead=$('.f3lead',d);if(lead)lead.textContent='第一～五章免費。後面還有七段、三十五章，每段五章，要照順序打開。';
  let own=false;try{own=!!stageOpen('stage8')}catch(e){}const p=price('stage8');const g=SEG6;
  const items=ITEMS.filter(x=>x.chapter>=36&&x.chapter<=40&&['pet','dress','prop'].includes(x.slot));
  const sec=document.createElement('section');sec.className='f3seg'+(own?' own':'');sec.dataset.seg='s6';
  sec.innerHTML=`<div class="f3sh"><div><small>${g.r}</small><b>${g.arc}</b></div>${own?'<span class="f3tag">已解鎖 ✓</span>':p?`<span class="f3tag">${esc6(p)}</span>`:''}</div>
   <div class="f3scs">${[0,1,2,3,4].map(i=>{const C=CHAPTERS[g.from-1+i];let bg='';try{bg=sbg(C.bg)}catch(e){}return `<figure class="f3sc" data-c="${g.from+i}"><span class="f3sv"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${bg}</svg></span><figcaption>${C.name}</figcaption></figure>`}).join('')}</div>
   <div class="f3sub">學什麼</div><ul class="f3ul">${g.learn.map(t=>`<li>${t}</li>`).join('')}</ul>
   <div class="f3sub">新的寵物、衣服和道具</div><div class="f3its">${items.map(it=>`<figure class="f3it"><span class="f3iv">${(()=>{try{return still(it.slot==='pet'?petSVG(it.id,''):princess({...S.look,[it.slot]:it.id},'',VB[it.slot]))}catch(e){return ''}})()}</span><figcaption>${esc6(it.name)}</figcaption></figure>`).join('')}</div>
   <div class="f3sub">遊樂園新遊戲</div><div class="f3pks">${g.park.map(([e,n,fb])=>`<span class="f3pk"><span class="pic">${art(typeof ICONART!=='undefined'&&ICONART[e]?e:fb)}</span>${n}</span>`).join('')}</div><p class="f3ex">${g.extra}</p>`;
  const how=$('.f3how',d);if(how)d.insertBefore(sec,how);else d.appendChild(sec)}catch(e){console.log('intro6',e)}return r}}
// App：還沒打開的第三十六～四十章，「完成第三十六章…」這類字樣不顯示
if(IS_APPX()){try{const CN6={'三十六':36,'三十七':37,'三十八':38,'三十九':39,'四十':40};const RE6=/第(三十[六七八九]|四十)章/;
 const lockT=t=>{const m=String(t).match(RE6);return !!(m&&!appOk(CN6[m[1]]-1))};
 const sweep=()=>{try{$$('.opt[data-id]').forEach(b=>{if(b.style.display==='none')return;const it=ITEM[b.dataset.id];if(it&&it.chapter>35&&!appOk(it.chapter-1)&&!owns(it.id))b.style.display='none'});
  $$('button,[role="button"],.pbtn,.rmitem,.citem,li').forEach(b=>{if(b.style.display==='none'||b.classList.contains('wnode')||b.closest('.overlay .card.left')||b.classList.contains('pcard')||b.classList.contains('gzci'))return;const t=b.textContent||'';if(t.length<80&&lockT(t))b.style.display='none'})}catch(e){}};
 new MutationObserver(()=>sweep()).observe(document.body,{childList:true,subtree:true});
 const _sl6=say;say=function(parts,opt){try{if(Array.isArray(parts)&&parts.some(p=>typeof p==='string'&&/完成第(三十[六七八九]|四十)章/.test(p)&&lockT(p)))return Promise.resolve()}catch(e){}return _sl6.call(this,parts,opt)}}catch(e){console.log('applock6',e)}}

/* ---------- 16. 學習報告、爸爸媽媽的練習 ---------- */
try{if(window.__WR&&typeof __WR.reportRow==='function'){const _rr6=__WR.reportRow;__WR.reportRow=function(){let s=_rr6.apply(this,arguments);try{const C=S6CHARS.split('').filter(wrHas);if(C.length&&typeof __WR.wLevel==='function'){
  const nOK=C.filter(c=>__WR.wLevel(c)==='ok').length;s+=`<div class="lrgh"><span>會寫的字（第六季）</span><b>${nOK}<small>／${C.length}</small></b></div><div class="lrgrid lgz wrgrid">${C.map(c=>{const v=__WR.wLevel(c);return `<i class="lrc ${v==='try'?'try':v}">${c}</i>`}).join('')}</div>`}}catch(e){}return s}}}catch(e){}
{const _pp6b=parentPanel;parentPanel=function(){const r=_pp6b.apply(this,arguments);try{const has6=S6CHARS.split('').some(wrHas);if(has6){const ov=$$('.overlay').pop();if(ov)$$('p.small',ov).forEach(p=>{p.textContent=p.textContent.replace('ㄅ～ㄒ、A～P','ㄅ～ㄘ、A～V').replace('ㄅ～ㄌ、A～J','ㄅ～ㄘ、A～V')})}}catch(e){}return r}}

/* ---------- 16b. 遊樂園接口：購買項目代號（vine6.js 讀 window.__S6STAGE）；火箭飛行聽注音／聽字母加進第六季學過的字 ---------- */
window.__S6STAGE='stage8';
{const _r26=window.__r26extra;window.__r26extra=kind=>{const o=typeof _r26==='function'?_r26(kind):[];try{S6CH.forEach(c=>{if(S.chDone>c-1)S6D[c].learn.split('').forEach(x=>{if(kind==='zy'?isZ6(x):/^[A-Z]$/.test(x))o.push(x)})})}catch(e){}return o}}

/* ---------- 17. 還沒錄音的第六季台詞：只出字幕，不用裝置內建聲音 ---------- */
const S6TXT=new Set(),S6OPT=new Set();
const add6=t=>{if(!t)return;String(t).replace(/<br>/g,'').split(/(?<=[。！？!?])/).map(x=>x.trim()).filter(Boolean).forEach(x=>S6TXT.add(x))};
S6CH.forEach(c=>{const D=S6D[c];[D.firstSay,D.endText,D.story_p,D.story_b,D.letter_p,D.letter_b,D.theater,D.gift,...D.story,...D.levels.map(L=>L[5])].forEach(add6)});
S6Q.forEach(([,q,a,w,why])=>{add6(q);add6(why);[a,...w].forEach(o=>S6OPT.add(o[1]))});
[S6FIN.h,S6FIN.p,S6FIN.pr,S6FIN.dr,S6FIN.c1,S6FIN.c2,S6FIN.c3,...S6FIN.f.map(x=>x[1]),FIN6_END,S6AD,S6NEXT].forEach(add6);
Object.values(S6HEAR).forEach(ws=>ws.forEach(([,w])=>add6(hearLine(w))));
const S6LINES=['香蕉十根一串，十根十根數，一共有幾根呢？','十、二十、三十……跟著我十根十根數！','兩個兩個數，一共有幾個呢？','二、四、六……跟著我兩個兩個數！','點一點，兩個一對排好。排好了，有沒有剩下一個呢？','排好了！看看有沒有剩下一個？','一個一個點，兩個排成一對！','我幫你排！','剩下一個！','每一個都有一對！',
 '哪一隻蝴蝶，左邊和右邊的翅膀一樣呢？','把翅膀對折看看，左右兩邊的點點一樣嗎？','左右兩邊一樣！',
 '把迴紋針一個接一個排好，量一量，有幾個迴紋針那麼長呢？','超過了！拿回來一個。','排好了！數一數，有幾個迴紋針那麼長？','從最左邊開始，一個接一個排，不要留空隙！',...[1,2,3,4,5,6,7,8].map(n=>`${CNUM[n]}個迴紋針那麼長！`),
 '看看兩個天平，往下的那一邊比較重。哪一個最重呢？','天平往下的那一邊，比較重。哪一個比較重呢？','天平往上的那一邊，比較輕。哪一個比較輕呢？','往下的那一邊比較重。先看看誰比誰重！','看看天平，哪一邊往下？','看看天平，哪一邊往上？','這個最重！','往下的那一邊比較重！','往上的那一邊比較輕！',
 '一個放一格，疊起來比一比，哪一種最多呢？','一個放一格，疊起來比一比，哪一種最少呢？','疊好了！看一看，哪一種最多呢？','疊好了！看一看，哪一種最少呢？','點一點，把每一個放到它的那一排！','我幫你疊！',
 ...Object.values(PICSET).flat().flatMap(([,nm])=>[`${nm}最多！`,`${nm}最少！`]),
 '這個徽章還沒拿到喔！',...S6CH.map(c=>`這是${S6D[c].name}的小守護者徽章！`),'第六季，星光大自然！跟樹懶慢慢一起，認識動物昆蟲，學會保護自己！','你想看哪一張？'];
S6LINES.forEach(add6);
S6CH.forEach(c=>{(GIFT[c]||[]).forEach(id=>add6(`得到${NAME6(id)}了！`));const nm=(GIFT[c]||[]).map(NAME6).filter(Boolean).join('和');if(nm)add6(`得到${nm}了！`)});
window.__S6TXT=S6TXT;window.__S6OPT=S6OPT;
const S6NAMES=[];S6CH.forEach(c=>{S6NAMES.push(S6D[c].name,'第'+S6D[c].cn+'章')});['sloth36','pacc38','prop40','dress37','dress39','b_vest37','b_rain39'].forEach(id=>S6NAMES.push(NAME6(id)||(BFIT[id]||{}).n));
ROOM6.forEach(r=>S6NAMES.push(r[2]));PIC6.forEach(p=>S6NAMES.push(p[1]));S6NAMES.push('樹懶慢慢','瓢蟲點點','小守護者徽章','大自然小守護者','聽聲音找注音','量一量、比一比','迴紋針');
const S6EN=['Sloth.','Ladybug.','Formosan salmon.','Monkey.'];
const _isS6b=t=>{const u=String(t);return S6NAMES.some(n=>n&&u.includes(n))};
const vt=t=>{try{return voiceT(typeof heroT==='function'?heroT(t):t)}catch(e){return t}};
function recOK(t,who){try{const u=vt(t).replace(/⁠/g,'');const pre=who==='prince'?'pz|':who==='dragon'?'dz|':'';
  if(!pre&&(voHas('z|'+u.trim())||voHas('z|'+voCk(u))))return true;
  return voSents(u).every(s=>pre?voHas(pre+s.trim()):voResolve(s).every(g=>typeof g==='string'))}catch(e){return true}}
function isS6(t){const u=String(t).replace(/<br>/g,'');if(S6TXT.has(u.trim())||_isS6b(u))return true;
 const ss=voSents(u);if(ss.some(s=>S6TXT.has(s)))return true;
 return u.split(/[，、？]/).some(x=>{const y=x.replace(/^(是|還是)/,'').trim();return y&&S6OPT.has(y)})}
const isWhole6=t=>typeof t==='string'&&/！(?=\S)/.test(t.trim())&&isS6(t);
const _say6=say;say=function(parts,opt){
 try{if(Array.isArray(parts)&&inS6(S.ch)&&S.ch<C40I&&parts.includes(NEWPET)){const g=S6D[S.ch+1].gift;const k=parts.indexOf(NEWPET);parts=parts.slice(0,k).concat(g?[g]:[],parts.slice(k+1))}}catch(e){}
 try{if(Array.isArray(parts)&&(inS6(S.ch)||parts.some(p=>typeof p==='string'&&isS6(p)))){
  const inCh=inS6(S.ch)&&!S.pmode;let changed=false;let out=parts;
  if(S.vo&&VO.idx){out=parts.filter(p=>{if(typeof p==='string'){if(!p.trim())return true;
    let q=p;const who=(()=>{const u=p.replace(/<br>/g,'');if(!ISBOY&&Object.values(LETTER_P).includes(u))return 'prince';if(ISBOY&&Object.values(LETTER_B).includes(u))return 'dragon';
     if(!ISBOY&&u.startsWith('王子說：')){q=u.slice(4);return 'prince'}if(ISBOY&&vt(u).startsWith('火花說：')){q=vt(u).slice(4);return 'dragon'}return ''})();
    if((inCh||isS6(p))&&!recOK(q,who)){changed=true;return false}return true}
   if(p&&typeof p==='object'&&p.zh!=null&&!p.en&&!p.slow&&(p.who==='prince'||p.who==='dragon'||isS6(p.zh)||inCh)){const w=ISBOY&&(p.who==='prince'||(!p.who&&DRAGON_SAY.has(vt(String(p.zh)))))?'dragon':p.who;if(!recOK(p.zh,w)){changed=true;return false}}
   if(p&&typeof p==='object'&&p.en!=null&&S6EN.includes(String(p.en))){const k='e'+(p.slow||0)+'|'+p.en;if(!voHas(k)&&!voHas('e0|'+p.en)&&!voHas('e1|'+p.en)){changed=true;return false}}
   return true})}
  const sep=(a,b)=>{try{return !!(S.vo&&VO.idx)&&recOK(a,'')&&recOK(b,'')&&!recOK(a+b,'')}catch(e){return false}};
  const o=[];out.forEach(p=>{const prev=o[o.length-1];if(typeof p==='string'&&typeof prev==='string'){if(isWhole6(p)||isWhole6(prev)){o.push({pause:150});changed=true}else if(sep(prev,p)){o.push({pause:60});changed=true}}o.push(p)});
  if(changed){const isCur=parts===S.cur;const o2=o.filter((p,k)=>!(p&&p.pause&&(k===0||o[k-1]&&o[k-1].pause)));if(isCur)S.cur=o2;return _say6.call(this,o2,opt)}}}catch(e){console.log('say6',e)}
 return _say6.apply(this,arguments)};
{const _vs6=voSpeak;voSpeak=async function(p,opt,gen){try{const txt=String(p&&typeof p==='object'?(p.en!=null?'':p.zh):p).trim();
  if(txt&&/！(?=\S)/.test(txt)&&!(typeof p==='object'&&(p.who||p.slow))&&S.vo&&VO.idx&&voHas('z|'+txt)&&isS6(txt)){const b=await voBuf('z|'+txt);
   if(b&&gen===sayGen){const ok=await voPlay(b);if(ok!==false||gen!==sayGen)return}}}catch(e){}
  return _vs6.apply(this,arguments)}}

/* ---------- 18. 樣式（只有淡入、移動、亮光；沒有放大縮小） ---------- */
const st=document.createElement('style');st.textContent=`
.b6b{display:grid;place-items:center;padding:4px}.b6b svg{width:86%;height:86%}.b6b .b6n{position:absolute;bottom:4px;right:6px;font-style:normal;font-size:14px;color:#8A5A1A;background:#FFF4C8;border-radius:999px;padding:0 6px}.b6b[data-n] .b6n{display:none}
.t6pairs{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vmin,14px);justify-content:center;margin:6px auto;max-width:96%}
.t6pr{position:relative;display:flex;gap:2px;padding:6px 10px;border-radius:999px;border:3px solid #D8E8C8;background:rgba(255,255,255,.88);cursor:pointer;animation:fade6 .4s backwards var(--dl)}
.t6pr i{font-style:normal;width:clamp(26px,6vmin,44px);height:clamp(26px,6vmin,44px);display:grid;place-items:center;font-size:clamp(22px,5vmin,36px)}.t6pr i svg{width:100%;height:100%}
.t6pr.counted,.t6pr[data-n]{border-color:#FFB81C;box-shadow:0 0 0 3px #FFE27A}.t6pr[data-n]::after{content:attr(data-n);position:absolute;top:-12px;right:-6px;background:#FFB81C;color:#fff;border-radius:999px;padding:0 8px;font-size:16px}
.p6pile{display:flex;flex-wrap:wrap;gap:clamp(4px,1.4vmin,10px);justify-content:center;margin:4px auto;max-width:96%}
.p6it{width:clamp(42px,9vmin,64px);height:clamp(42px,9vmin,64px);border:0;border-radius:16px;background:rgba(255,255,255,.8);display:grid;place-items:center;font-size:clamp(28px,6vmin,44px);cursor:pointer;animation:fade6 .4s backwards var(--dl)}
.p6it svg{width:80%;height:80%}.p6it.gone{visibility:hidden}
.p6row{display:flex;flex-wrap:wrap;gap:clamp(6px,1.6vmin,12px);justify-content:center;min-height:clamp(46px,9vmin,66px);margin:4px auto;max-width:96%}
.p6pr{display:flex;gap:2px;padding:4px 8px;border-radius:14px;border:3px dashed #C8B8E8;background:rgba(255,255,255,.75);animation:fade6 .3s}.p6pr.full{border-style:solid;border-color:#8FD08A}
.p6pr i{font-style:normal;width:clamp(28px,6vmin,44px);height:clamp(28px,6vmin,44px);display:grid;place-items:center;font-size:clamp(22px,5vmin,34px)}.p6pr i svg{width:100%;height:100%}
.y6row{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vmin,22px);justify-content:center;margin:8px auto}
.y6b{width:clamp(110px,26vmin,190px);aspect-ratio:5/4;border-radius:22px;border:3px solid #E0D4F4;background:rgba(255,255,255,.9);padding:6px;cursor:pointer;animation:fade6 .4s backwards var(--dl)}
.y6b svg{width:100%;height:100%;display:block}.y6b.y6ok{border-color:#8FD08A;box-shadow:0 0 0 4px #DFF6D0}
.m6wrap{display:flex;flex-direction:column;align-items:center;gap:6px;margin:6px auto;padding:10px 12px;border-radius:20px;background:rgba(255,255,255,.82);width:max-content;max-width:96%}
.m6obj{height:44px;align-self:flex-start;margin-left:calc(var(--u)*.3)}.m6obj svg{width:100%;height:100%;display:block}
.m6track{position:relative;height:calc(var(--u)*.46);align-self:flex-start;margin-left:calc(var(--u)*.3);border-bottom:3px dashed #B8C4D8}
.m6start{position:absolute;left:-3px;top:-58px;bottom:-6px;width:3px;background:#FF8FA8;border-radius:2px}
.m6tray{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:calc(var(--u)*.5);margin-top:6px}
.m6c{width:var(--u);height:calc(var(--u)*.42);padding:0;border:0;background:none;cursor:grab;touch-action:none;animation:fade6 .4s backwards var(--dl)}
.m6c svg{width:100%;height:100%;display:block;pointer-events:none}.m6c.drag{cursor:grabbing;z-index:5;position:relative;filter:drop-shadow(0 4px 4px rgba(40,30,80,.25))}
.m6track .m6c{position:absolute;top:0;transition:left .2s}.m6track .m6c[data-n]::after{content:attr(data-n);position:absolute;top:-20px;left:40%;color:#B3305E;font-size:15px}
.w6bal{width:clamp(200px,46vmin,320px);margin:2px auto}.w6bal svg{width:100%;height:auto;display:block}
.w6two{display:flex;flex-wrap:wrap;justify-content:center;gap:4px}.w6two .w6bal{width:clamp(150px,36vmin,260px)}
.w6beam{transform-box:view-box;transform-origin:100px 50px;transform:rotate(var(--ang));transition:transform .8s ease-out}
.w6t .w6ic{display:inline-block;width:1.4em;height:1.4em;vertical-align:-.35em;margin-right:4px}.w6t .w6ic svg{width:100%;height:100%}
.g6days{display:flex;flex-wrap:wrap;gap:clamp(4px,1.2vmin,8px);justify-content:center;margin:2px auto;max-width:96%}
.g6d{width:clamp(38px,8vmin,56px);height:clamp(38px,8vmin,56px);border-radius:12px;border:2px solid #D8DEEA;background:#FFFFFF;display:grid;place-items:center;font-size:clamp(24px,5.4vmin,38px);padding:3px;cursor:pointer;animation:fade6 .4s backwards var(--dl)}
.g6d svg{width:100%;height:100%}.g6d.gone{visibility:hidden}
.g6chart{display:flex;gap:clamp(10px,3vmin,26px);justify-content:center;align-items:flex-end;margin:4px auto;padding:8px 14px 4px;border-radius:18px;background:rgba(255,255,255,.85)}
.g6col{display:flex;flex-direction:column;align-items:center;gap:2px}
.g6stack{display:flex;flex-direction:column;gap:2px}
.g6cell{width:clamp(30px,6.4vmin,46px);height:clamp(30px,6.4vmin,46px);border:2px dashed #D8DEEA;border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:clamp(20px,4.6vmin,32px)}
.g6cell.on{border-style:solid;border-color:#8FC8F0;background:#F2FAFF;animation:fade6 .3s}.g6cell svg{width:90%;height:90%}
.g6lab{display:flex;flex-direction:column;align-items:center;font-size:clamp(20px,4.4vmin,30px);line-height:1}.g6lab svg{width:1.2em;height:1.2em}.g6lab small{font-size:14px;color:#5A3A7A}
.fin6{background:#141A44}
.fin6 .fin6bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.fin6 .gfr.gtalk,.fin6 .fromdoor.gtalk{transform:translateY(-8px);filter:drop-shadow(0 0 10px rgba(255,230,140,.95));transition:transform .3s}
.fin6 .gparade{order:1}.fin6 .trio{order:2}.fin6 .endh{order:3}.fin6 .endp{order:4}.fin6 .endbtns{order:5}.fin6 .s6{order:6}
.certpick.cp5 .cprow{display:grid;grid-template-columns:repeat(3,auto);justify-content:center;gap:10px}
@media (min-width:700px){.certpick.cp5 .cprow{grid-template-columns:repeat(5,auto)}}
.s6b .s6mini{display:block;width:100%;height:100%}.s6b .s6mini svg{width:100%;height:100%;display:block;filter:drop-shadow(0 2px 3px rgba(20,10,60,.35))}
@keyframes fade6{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.fin6 .gfr.gtalk{transition:none}.t6pr,.p6it,.y6b,.m6c,.g6d,.p6pr,.g6cell.on{animation:none}.w6beam{transition:none}}`;document.head.appendChild(st);

/* ---------- 19. 重新打開時回到第三十六～四十章 ---------- */
try{const c=window.__svCh41;
 if(typeof c==='number'&&c>=C36I&&c<CHAPTERS.length&&c!==S.ch&&c<=Math.max(S.chDone||0,0)&&s6Open(c)
  &&(typeof window.__chOpen!=='function'||window.__chOpen(c))){setCh(c);try{save()}catch(e){}}}catch(e){console.log('ch36restore',e)}
function autoAnswer(){try{if(typeof S.__auto==='function'){S.__auto();return true}const el=$(`.play [data-v="${String(S.ans).replace(/"/g,'\\"')}"]`);if(el){el.click();return true}}catch(e){}return false}
{const _rq6=renderQ;renderQ=function(){S.__auto=null;return _rq6.apply(this,arguments)}}
window.__s6={C36I,C40I,S6D,Q6_0,GIFT,grandFinale6,cert6Show,s6Learned,isS6,recOK,isS6En:t=>S6EN.includes(t),zyLearned6,upLearned6,autoAnswer,wrHas,art:MISS,hearLine,S6CHARS,S6LINES,PICSET};
})();

/* ================= 第六季寫字：ㄓ ㄔ ㄕ ㄖ ㄗ ㄘ、Q R S T U V（s6/write/write6.js） =================
 * 2026-11-17 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 接在 v5/m99x_write.js（第四季寫字模組）和 write5.js 後面：把新字的筆畫加進 __WR.CH／__WR.chars，三階段描寫、判斷、提醒、紀錄全部沿用 m99x。
 *   關卡表直接用 'write:ㄓ:1'、'R:ㄓ|ㄔ:3'。家長報告「會寫的字」改成 42 個（ㄅ～ㄘ、A～V）。
 * 筆順：注音照教育部《國語注音符號手冊》筆畫數（ㄓ4 ㄔ3 ㄕ3 ㄖ4 ㄗ2 ㄘ2），先後照字源楷書；英文照台灣國小常見教法，兩種以上教法的都算對（variants）。
 * 筆畫資料由 s6/write/mk_data6.py 從 s6/write/strokes.json 產生，不要手改 WRD6 那一行。
 * 語音：「還記得怎麼寫ㄓ嗎？」「你會寫ㄓ了！」整句錄音（s6/write/lines_write6.tsv），沒錄好以前只出字幕（m99x 原本就這樣）。
 */
(function(){try{
const WRD6=/*WRD6*/{"ㄓ":["zy","tian",[[[[50.0,14.0],[50.0,29.3],[50.0,44.7],[50.0,60.0]],[[28,34],[28,47],[28,60],[50,60],[72,60]],[[72.0,34.0],[72.0,42.3],[72.0,50.7],[72.0,59.0]],[[16.0,80.0],[38.7,80.0],[61.3,80.0],[84.0,80.0]]],[[[50.0,14.0],[50.0,32.7],[50.0,51.3],[50.0,70.0]],[[26,36],[26,53],[26,80],[55,80],[84,80]],[[74.0,36.0],[74.0,50.3],[74.0,64.7],[74.0,79.0]]]]],"ㄔ":["zy","tian",[[[[60.0,14.0],[53.3,20.0],[46.7,26.0],[40.0,32.0]],[[64.0,34.0],[53.3,42.0],[42.7,50.0],[32.0,58.0]],[[48.0,46.0],[48.0,59.3],[48.0,72.7],[48.0,86.0]]]]],"ㄕ":["zy","tian",[[[[30,18],[52,18],[74,18],[74,29],[74,40]],[[30.0,40.0],[44.7,40.0],[59.3,40.0],[74.0,40.0]],[[30,40],[30,52],[28,62],[24,71],[18,79],[12,85]]]]],"ㄖ":["zy","tian",[[[[32.0,16.0],[32.0,38.7],[32.0,61.3],[32.0,84.0]],[[32,16],[50,16],[68,16],[68,50],[68,84]],[[45.0,44.0],[50.0,49.0],[55.0,54.0]],[[32.0,84.0],[44.0,84.0],[56.0,84.0],[68.0,84.0]]],[[[32,16],[32,50],[32,84],[50,84],[68,84]],[[32,16],[50,16],[68,16],[68,50],[68,84]],[[45.0,44.0],[50.0,49.0],[55.0,54.0]]]]],"ㄗ":["zy","tian",[[[[30,20],[50,20],[70,20],[70,40],[70,58],[62,52]],[[30.0,20.0],[30.0,41.3],[30.0,62.7],[30.0,84.0]]],[[[30,20],[50,20],[70,20],[70,40],[70,58]],[[30.0,20.0],[30.0,41.3],[30.0,62.7],[30.0,84.0]]]]],"ㄘ":["zy","tian",[[[[22.0,44.0],[40.7,41.3],[59.3,38.7],[78.0,36.0]],[[42,16],[42,40],[42,64],[47,76],[58,80],[80,80]]]]],"Q":["en","four",[[[[50.0,12.0],[46.2,12.5],[42.5,14.0],[39.2,16.4],[36.2,19.6],[33.8,23.6],[32.0,28.1],[30.9,32.9],[30.5,38.0],[30.9,43.1],[32.0,47.9],[33.8,52.4],[36.2,56.4],[39.2,59.6],[42.5,62.0],[46.2,63.5],[50.0,64.0],[53.8,63.5],[57.5,62.0],[60.8,59.6],[63.8,56.4],[66.2,52.4],[68.0,47.9],[69.1,43.1],[69.5,38.0],[69.1,32.9],[68.0,28.1],[66.2,23.6],[63.8,19.6],[60.8,16.4],[57.5,14.0],[53.8,12.5],[50.0,12.0]],[[54.0,52.0],[59.3,57.3],[64.7,62.7],[70.0,68.0]]]]],"R":["en","four",[[[[33.8,12.0],[33.8,29.3],[33.8,46.7],[33.8,64.0]],[[33.8,12],[49.2,12],[52.6,12.3],[55.9,13.3],[58.8,15.0],[61.2,17.1],[63.1,19.7],[64.2,22.6],[64.6,25.6],[64.2,28.6],[63.1,31.5],[61.2,34.1],[58.8,36.2],[55.9,37.9],[52.6,38.9],[49.2,39.2],[33.8,39.2]],[[46.0,39.2],[53.1,47.5],[60.1,55.7],[67.2,64.0]]],[[[33.8,12.0],[33.8,29.3],[33.8,46.7],[33.8,64.0]],[[33.8,12],[49.2,12],[52.6,12.3],[55.9,13.3],[58.8,15.0],[61.2,17.1],[63.1,19.7],[64.2,22.6],[64.6,25.6],[64.2,28.6],[63.1,31.5],[61.2,34.1],[58.8,36.2],[55.9,37.9],[52.6,38.9],[49.2,39.2],[33.8,39.2],[46,39.2],[56,51.6],[67.2,64]]]]],"S":["en","four",[[[[65,19],[60,13.5],[52,12],[43,13],[36.5,18],[36,25],[41,31],[50,36],[59,41],[64.5,47],[65,55],[60,61.5],[51,64],[42,63],[35,58]]]]],"T":["en","four",[[[[28.0,12.0],[42.7,12.0],[57.3,12.0],[72.0,12.0]],[[50.0,12.0],[50.0,29.3],[50.0,46.7],[50.0,64.0]]],[[[50.0,12.0],[50.0,29.3],[50.0,46.7],[50.0,64.0]],[[28.0,12.0],[42.7,12.0],[57.3,12.0],[72.0,12.0]]]]],"U":["en","four",[[[[32,12],[32,30],[32,46],[32.6,50.7],[34.4,55.0],[37.3,58.7],[41.0,61.6],[45.3,63.4],[50.0,64.0],[54.7,63.4],[59.0,61.6],[62.7,58.7],[65.6,55.0],[67.4,50.7],[68.0,46.0],[68,30],[68,12]]],[[[32,12],[32,30],[32,46],[32.6,50.7],[34.4,55.0],[37.3,58.7],[41.0,61.6],[45.3,63.4],[50.0,64.0],[54.7,63.4],[59.0,61.6],[62.7,58.7],[65.6,55.0],[67.4,50.7],[68.0,46.0]],[[68.0,12.0],[68.0,29.3],[68.0,46.7],[68.0,64.0]]]]],"V":["en","four",[[[[30,12],[40,38],[50,64],[60,38],[70,12]]],[[[30.0,12.0],[36.7,29.3],[43.3,46.7],[50.0,64.0]],[[70.0,12.0],[63.3,29.3],[56.7,46.7],[50.0,64.0]]]]]}/*WRD6_END*/;
const W6=window.__WR6={ready:false,ver:'2026-11-17',chars:Object.keys(WRD6)};
function reg(){const WR=window.__WR;if(!WR||!WR.CH||!WR.chars)return false;
 // 跟 m99x 的 prep() 同一套（密點、長度、進度 t）
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 const plen=p=>{let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s};
 function resample(p,step){if(p.length<2)return p.slice();const out=[p[0]];let acc=0;for(let i=1;i<p.length;i++){let a=p[i-1],b=p[i],d=dist(a,b);while(acc+d>=step){const r=(step-acc)/d;a=[a[0]+(b[0]-a[0])*r,a[1]+(b[1]-a[1])*r];out.push(a);d=dist(a,b);acc=0}acc+=d}const l=p[p.length-1];if(dist(out[out.length-1],l)>.01)out.push(l);return out}
 function prep(points){const d=resample(points,1);const Ln=plen(points);let acc=0;const t=d.map((q,i)=>{if(i)acc+=dist(d[i-1],q);return Ln?acc/Ln:0});return {points,start:points[0],end:points[points.length-1],dense:d,tt:t,len:Ln,cov:resample(points,2)}}
 for(const c in WRD6){const [kind,grid,forms]=WRD6[c];if(WR.CH[c])continue;
  WR.CH[c]={char:c,kind,grid,forms:forms.map(f=>f.map(prep))};WR.CH[c].P=WR.CH[c].forms[0];if(!WR.chars.includes(c))WR.chars.push(c)}
 // 家長報告：會寫的字 42 個
 const RCH=[...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘ',...'ABCDEFGHIJKLMNOPQRSTUV'];
 const _rr=WR.reportRow;
 WR.reportRow=function(){try{const lv=WR.wLevel,rec=(WR.rec&&WR.rec())||{};const any=RCH.some(c=>lv(c)!=='no');const nOK=RCH.filter(c=>lv(c)==='ok').length;
  let tip='';{let best=null;for(const c of RCH){const r=rec[c];if(!r)continue;for(const [k,t] of [['rev',`<b>${c}</b> 常從另一頭開始寫，可以陪孩子先找星星起點。`],['ord',`<b>${c}</b> 的筆順還在練，可以一起看「再看一次」的示範。`],['off',`<b>${c}</b> 寫的時候可以慢慢沿著線走。`]]){if((r[k]||0)>=3&&(!best||r[k]>best[0]))best=[r[k],t]}}if(best)tip=best[1];else{const sp=RCH.find(c=>{const r=rec[c],C=WR.CH[c];return r&&r.last&&r.last.form===1&&/^[ㄅ-ㄩ]$/.test(c)&&C&&C.forms[1]&&C.forms[0].length<C.forms[1].length});if(sp)tip=`<b>${sp}</b> 可以一筆寫完的地方，分開寫也算對。`}}
  return `<div class="lrgh"><span>會寫的字</span><b>${nOK}<small>／${RCH.length}</small></b></div><div class="lrgrid lgz wrgrid">${RCH.map(c=>{const s=lv(c);return `<i class="lrc ${s==='try'?'try':s}" title="${s==='ok'?'會寫':s==='try'?'需要陪寫':s==='mid'?'練習中':'還沒寫'}">${c}</i>`}).join('')}</div>
  <p class="lrnote">${any?'在兩個不同的日子都自己寫、拿到三顆星，才算「會寫」。虛線框的字最近需要陪寫。':'第二十六章開始學寫字，寫過的字會出現在這裡。'}${tip?'<br>'+tip:''}</p>`}catch(e){try{return _rr.apply(this,arguments)}catch(_){return ''}}};
 W6.ready=true;return true}
if(!reg()){let n=0;const iv=setInterval(()=>{if(reg()||++n>40)clearInterval(iv)},250)}
}catch(e){console.log('write6',e)}})();

/* ================= 雨林盪藤蔓（s6/park/vine6.js，畫面 vine6；遊樂園大門「小遊戲」區） =================
 * 2026-11-17 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 規格：doc/ch31_100_outline.md 第五節（三）2「雨林盪藤蔓」、（二）6 新小遊戲共同規格。完成第 36 章打開；App 要買第六季那一包（stage8）；網頁版跟章節同一個季密碼。
 * 玩法：點香蕉，小猴子跳跳抓著藤蔓盪過去接香蕉。香蕉上有數字，要照順序接。一局 10 根香蕉，約 1～3 分鐘，一定開心結束。
 *   簡單：前面只有一根香蕉，點了就過，數 1～10。
 *   中等：前面三根香蕉，十個一數（10、20、30…100）。
 *   高難度：兩個兩個數（2～20，完成第 37 章以後；之前用十個一數）；藤蔓會左右擺，香蕉擺到靠近小猴子、發亮的時候再點（看時機；減少動態時不用等）。
 * 沒有輸、不扣分、不掉下去：點錯的香蕉，小猴子盪過去一點又盪回來（「嗯？下一個是幾呢？」）；同一步第二次點錯，對的香蕉會發亮。
 * 寶石：每天第一次玩完 3 顆、之後 1 顆（V2.vine6Day；大門每日上限 m99zx4 用 __gateExt.gemDay 接）。
 * 語音只念有真人錄音的句子（沒錄好以前只出字幕）；台詞表由 s6/park/mk_lines6.py 從下面 LINES 產生 lines_park6.tsv。
 * 動畫：只有移動和藤蔓旋轉、亮光，沒有放大縮小。 */
(function(){try{
if(typeof SCREENS==='undefined')return;
/*LINES*/
const T={
"v_card":"雨林盪藤蔓，照順序接香蕉！",
"lock36":"完成第三十六章，就會打開喔！",
"again":"再點一下，就可以進去喔！",
"lockApp":"爸爸媽媽可以幫你打開新的冒險喔！",
"v_menu":"雨林盪藤蔓！要玩哪一種呢？",
"d_easy":"簡單","d_mid":"中等","d_hard":"高難度",
"v_hi":"我是小猴子跳跳！點香蕉，我就盪過去接！",
"v_r1":"一、二、三，一個一個數，接香蕉！",
"v_r10":"十、二十、三十，照順序接香蕉！",
"v_r2":"二、四、六，兩個兩個數，接香蕉！",
"v_r5":"五、十、十五，五個五個數，接香蕉！",
"v_time":"香蕉盪過來、發亮的時候，再點喔！",
"v_oops":"嗯？下一個是幾呢？再看一次！",
"v_miss":"差一點點！等香蕉發亮再點！",
"v_end":"全部接到了！你數得好棒！",
"gem3":"送你三顆寶石！","gem1":"送你一顆寶石！"
};
/*END*/
const P5=window.__P5||null;
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const has=p=>{try{if(!VO.idx)return false;const u=String(p).trim();if(/^\d+$/.test(u))return voHas('z|'+u)||voHas('n|'+(+u));return voHas('z|'+u)||voHas('z|'+voCk(u))}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&has(p));if(!a.length)return Promise.resolve(false);const q=[];a.forEach((t,i)=>{if(i)q.push({pause:180});q.push(t)});
 try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
function gems(key){if(P5&&typeof P5.gems==='function')return P5.gems(key);const first=V2[key]!==today();V2[key]=today();try{save2()}catch(e){}const n=first?3:1;S.wallet+=n;save();try{renderBar()}catch(e){}sfx('gem');return n}
/* ---------- 開放條件 ---------- */
const STAGE6=window.__S6STAGE||'stage8';
const appOK=()=>{try{if(typeof IS_APP==='undefined'||!IS_APP)return true;return typeof stageOpen==='function'&&!!stageOpen(STAGE6)}catch(e){return false}};
const webOK=()=>{try{return typeof s3Ok==='function'?!!s3Ok():true}catch(e){return true}};
function gate(){if(!(S.chDone>=36))return 'ch';if(!appOK())return 'app';if(!webOK())return 'pw';return ''}
/* ---------- 卡片圖示（64×64）：盪藤蔓的小猴子 ---------- */
const MK=()=>{try{return CH36.monkey.f()}catch(e){return ''}};
const BAN=(o)=>`<path d="M14 20 Q20 52 52 46 Q56 44 52 40 Q28 40 22 16 Q18 12 14 20Z" fill="#FFD84D" stroke="#C8A020" stroke-width="2.4"/><path d="M14 20 L12 14" stroke="#7A5A2A" stroke-width="3" stroke-linecap="round"/>`;
const ICON6=`<circle cx="32" cy="32" r="27" fill="#DFF5D8"/><path d="M14 4 Q20 22 30 30" stroke="#4E7A2E" stroke-width="3" fill="none"/><ellipse cx="20" cy="14" rx="5" ry="3" fill="#6FB24A"/><g transform="translate(16 18) scale(.36)">${MK()}</g><g transform="translate(40 34) scale(.36)">${BAN()}</g>`;
try{const IA=c=>`<svg viewBox="0 0 64 64" aria-hidden="true">${c}</svg>`;ICONART['i:vine6']=IA(ICON6)}catch(e){console.log('icon vine6',e)}
try{UXPD.vine6='照順序接香蕉'}catch(e){}
// 遊樂園大門（m99zx4）：放「小遊戲」；寶石照每日上限
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{vine6:'games'});X.gemDay=Object.assign(X.gemDay||{},{vine6:'vine6Day'});X.newest=['vine6'].concat(X.newest||[])}catch(e){}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const g=$('.pgrid');if(g&&!g.querySelector('[data-k="vine6"]')){
 const after=g.querySelector('[data-k="chef5"]')||g.querySelector('[data-k="fossil26"]');const st=gate(),lk=st==='ch'||st==='app';
 const b=document.createElement('button');b.className='pcard'+(lk?' lockd':'');b.dataset.k='vine6';b.style.setProperty('--dl','.8s');
 b.innerHTML=`<span class="pic">${art('i:vine6')}</span><b>雨林盪藤蔓</b><span>${st==='ch'?'完成第三十六章就會打開':'照順序接香蕉'}</span>${lk?`<span class="lk">${ICON.lock('#FFD98A')}</span>`:''}`;
 g.insertBefore(b,after?after.nextSibling:null)}}catch(e){console.log('park vine6',e)}return r}}
try{PARKS.push('vine6')}catch(e){}
let pick6=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="vine6"]');if(!c)return;
 e.stopImmediatePropagation();e.preventDefault();const st=gate();const shake=()=>{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')};
 if(st==='ch'){hush();sayR([T.lock36]);shake();return}
 if(st==='app'){hush();sayR([T.lockApp]);shake();return}
 V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen.vine6=(V2.parkSeen.vine6||0)+1;try{save2()}catch(_){}sfx('pop');S.from='park';hush();go('vine6')};
 const tryEnter=()=>{if(st==='pw'&&typeof window.__s3Gate==='function')return window.__s3Gate(enter);enter()};
 if((V2.parkSeen.vine6||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pick6<8000))return tryEnter();
 const g=c.parentNode;$$('.pcard.uxsel',g).forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pick6=Date.now();sfx('pop');hush();sayR([T.v_card,T.again])}catch(_){}},true);

/* ---------- 遊戲 ---------- */
const DN={easy:'簡單',mid:'中等',hard:'高難度'};
let vTok=0,VS={diff:null},G=null;
function seqOf(diff){if(diff==='easy')return {step:1,start:1,rule:'v_r1'};if(diff==='mid')return {step:10,start:10,rule:'v_r10'};// 2026-11-17 審查：高難度先只用兩個兩個數（第 37 章教），而且完成第 37 章才出；還沒完成就十個十個數＋看時機。五個五個數等第 41 章再加。
 return S.chDone>=37?{step:2,start:2,rule:'v_r2'}:{step:10,start:10,rule:'v_r10'}}
function choices(diff,want,step){if(diff==='easy')return [want];const o=new Set([want]);const cand=(step===10?[want+10,want+20,want-10,want+5]:step===5?[want+5,want-5,want+10,want+1]:[want+2,want-2,want+4,want+1]).filter(v=>v>0&&v!==want);
 for(const c of shuffle(cand)){if(o.size>=3)break;o.add(c)}return shuffle([...o])}
SCREENS.vine6=function(){const tok=++vTok;const live=()=>tok===vTok&&S.screen==='vine6';const calm=RM();
 if(!VS.diff)VS.diff=DN[S.diff]?S.diff:'mid';
 let bg='';try{bg=(window.BG36&&BG36.rainforest36)?BG36.rainforest36(800,450):''}catch(e){}
 screen.innerHTML=`<div class="dball vn6${calm?' calm':''}"><div class="phead"><button class="btn2 small" id="pback">回遊樂園</button><h2 class="gtitle">雨林盪藤蔓</h2><span class="phsp"></span></div>
  <div class="vn6stage" id="vn6st"><svg class="vn6bg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg}</svg>
   <p class="vn6bub" id="vn6bub"></p><div class="vn6vines" id="vn6v"></div><div class="vn6mk" id="vn6mk" style="left:14%;top:46%"><svg viewBox="0 0 100 100" aria-hidden="true">${MK()}</svg></div></div>
  <div class="vn6got" id="vn6got"></div>
  <div class="ch5menu vn6menu" id="vn6menu"><div class="ch5mc">
   <div class="ch5mh"><span class="ch5mi">${art('i:vine6')}</span><div><b>雨林盪藤蔓</b><small>照順序接香蕉，數一數！</small></div></div>
   <div class="ch5lab">難度</div><div class="ch5row" id="vn6diffs"><button class="ch5opt" data-v="easy"><b>簡單</b><small>1、2、3…</small></button><button class="ch5opt" data-v="mid"><b>中等</b><small>10、20、30…</small></button><button class="ch5opt" data-v="hard"><b>高難度</b><small>2、4、6，看時機</small></button></div>
   <button class="btn ch5go" id="vn6go">出發！</button></div></div></div>`;
 const bub=$('#vn6bub'),vv=$('#vn6v'),mk=$('#vn6mk'),got=$('#vn6got');let raf=0;
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const tell=(t,parts)=>{bub.textContent=t;return sayR(parts||[t])};
 $('#pback').onclick=()=>{vTok++;cancelAnimationFrame(raf);hush();go('park')};
 const sel=()=>$$('#vn6diffs .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===VS.diff));sel();
 $$('#vn6diffs .ch5opt').forEach(b=>b.onclick=()=>{VS.diff=b.dataset.v;sel();sfx('pop');hush();sayR([T['d_'+VS.diff]])});
 $('#vn6go').onclick=()=>{sfx('pop');hush();$('#vn6menu').style.display='none';start()};
 tell(T.v_menu);
 function start(){const sq=seqOf(VS.diff);G={diff:VS.diff,step:sq.step,next:sq.start,n:0,total:10,miss:0,busy:false,timing:VS.diff==='hard'&&!calm};
  got.innerHTML=Array.from({length:G.total},()=>'<i></i>').join('');
  tell(T[sq.rule],[T.v_hi,T[sq.rule],...(G.timing?[T.v_time]:[])]);mk.style.left='14%';mk.style.top='46%';round()}
 function round(){if(!live())return;G.miss=0;G.busy=false;const ch=choices(G.diff,G.next,G.step);const xs=ch.length===1?[58]:innerWidth<700?[40,63,86]:[46,66,86];
  vv.innerHTML=`<div class="vn6vine home" style="left:14%"><i class="vn6rope"></i></div>`+ch.map((v,i)=>`<button class="vn6vine c" data-v="${v}" style="left:${xs[i]}%;--ph:${(i*.25).toFixed(2)};--dl:${(i*.12).toFixed(2)}s" aria-label="香蕉 ${v}"><i class="vn6rope"></i><span class="vn6ban"><svg viewBox="0 0 64 64" aria-hidden="true">${BAN()}</svg><b>${v}</b></span></button>`).join('');
  $$('.vn6vine.c',vv).forEach(b=>b.onclick=()=>tap(b));
  if(G.timing)sway();}
 // 高難度：藤蔓左右擺（只旋轉），擺向小猴子那一邊時香蕉發亮，才抓得到
 function sway(){cancelAnimationFrame(raf);const t0=performance.now();const step=t=>{if(!live()||!G)return;const ss=(t-t0)/1000;
   $$('.vn6vine.c',vv).forEach(b=>{if(b.dataset.lock)return;const ph=+getComputedStyle(b).getPropertyValue('--ph')||0;const amp=innerWidth<700?5:10;const a=amp*Math.sin(ss*1.6+ph);b.style.transform=`rotate(${a.toFixed(1)}deg)`;b.classList.toggle('near',a>amp*.35)});
   raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)}
 const pos=b=>{const r=b.getBoundingClientRect(),R=$('#vn6st').getBoundingClientRect();const ban=$('.vn6ban',b).getBoundingClientRect();return {x:(ban.left+ban.width/2-R.left)/R.width*100,y:(ban.top-R.top)/R.height*100}};
 function tap(b){if(!G||G.busy||!live())return;hush();const v=+b.dataset.v;const p=pos(b);
  if(G.timing&&!b.classList.contains('near')){G.busy=true;swingTry(p,()=>{G.busy=false;tell(T.v_miss)});return}
  if(v!==G.next){G.busy=true;G.miss++;sfx('wrong');swingTry(p,()=>{G.busy=false;tell(T.v_oops);if(G.miss>=2){const ok=$$('.vn6vine.c',vv).find(x=>+x.dataset.v===G.next);if(ok){ok.classList.remove('hintglow');void ok.offsetWidth;ok.classList.add('hintglow')}}});return}
  G.busy=true;b.dataset.lock=1;b.style.transform='';sfx('pop');
  // 盪過去：先往上，再落到香蕉旁邊（只移動，不放大縮小）
  const mid={x:(parseFloat(mk.style.left)+p.x)/2,y:Math.max(8,Math.min(parseFloat(mk.style.top),p.y)-18)};
  mk.style.left=mid.x+'%';mk.style.top=mid.y+'%';mk.classList.add('swing');
  later(()=>{mk.style.left=(p.x-4)+'%';mk.style.top=(p.y-6)+'%'},calm?0:380);
  later(()=>{mk.classList.remove('swing');const bn=$('.vn6ban',b);if(bn)bn.classList.add('got');const cell=got.children[G.n];if(cell){cell.textContent=v;cell.classList.add('on')}
   tone(560+G.n*40,0,.14,'triangle',.08);try{burstEl(b,10)}catch(_){}sayR([String(v)]);G.n++;G.next+=G.step;
   if(G.n>=G.total){later(finish,700);return}
   // 換下一段：這條藤蔓變成小猴子的家，其他香蕉淡出
   later(()=>{$$('.vn6vine',vv).forEach(x=>{if(x!==b)x.classList.add('out')});mk.style.left='14%';mk.style.top='46%';b.style.left='14%';$('.vn6ban',b)&&$('.vn6ban',b).remove();b.classList.remove('c');b.classList.add('home')},calm?100:700);
   later(round,calm?250:1300)},calm?50:800)}
 function swingTry(p,done){const x0=parseFloat(mk.style.left),y0=parseFloat(mk.style.top);mk.style.left=(x0+(p.x-x0)*.4)+'%';mk.style.top=(y0-8)+'%';
  later(()=>{mk.style.left=x0+'%';mk.style.top=y0+'%';later(done,350)},calm?50:420)}
 async function finish(){cancelAnimationFrame(raf);const n=gems('vine6Day');try{confetti()}catch(e){}vv.innerHTML='';mk.style.left='44%';mk.style.top='40%';
  bub.textContent=T.v_end;await sayR([T.v_end,n>=3?T.gem3:T.gem1]);if(!live())return;
  const m=$('#vn6menu');if(m){m.style.display='';$('#vn6go').textContent='再玩一次'}}
};
const st=document.createElement('style');st.textContent=`
.vn6{position:relative;display:flex;flex-direction:column;height:100%;gap:6px;box-sizing:border-box}
.vn6 .ch5menu{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,16,60,.55);z-index:6;padding:12px;box-sizing:border-box}
.vn6 .ch5mc{background:#fff;color:#3A2A55;border-radius:22px;padding:14px 16px;max-width:520px;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}
.vn6 .ch5mh{display:flex;gap:10px;align-items:center}.vn6 .ch5mi{width:64px;height:64px;flex:none}.vn6 .ch5mi svg{width:100%;height:100%}
.vn6 .ch5mh b{font-size:22px;display:block}.vn6 .ch5mh small{font-size:15px}
.vn6 .ch5lab{margin:10px 0 4px;font-weight:700}.vn6 .ch5row{display:flex;gap:8px}
.vn6 .ch5opt{flex:1;min-height:60px;border:3px solid #EEE6F8;border-radius:16px;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;color:#3A2A55}
.vn6 .ch5opt small{font-size:12.5px}.vn6 .ch5opt.sel{border-color:#7A5CE0;background:#F0EAFF}
.vn6 .ch5go{display:block;margin:12px auto 0;min-width:10em;min-height:56px}
.vn6stage{position:relative;flex:1;min-height:320px;border-radius:22px;overflow:hidden;margin:0 6px;box-shadow:0 4px 0 rgba(40,30,80,.18)}
.vn6bg{position:absolute;inset:0;width:100%;height:100%}
.vn6bub{position:absolute;top:8px;left:50%;transform:translateX(-50%);max-width:86%;margin:0;padding:6px 14px;border-radius:16px;background:rgba(255,255,255,.92);color:#3A2A5A;font-size:clamp(15px,3.6vmin,20px);text-align:center;z-index:3}
.vn6vines{position:absolute;inset:0;z-index:2}
.vn6vine{pointer-events:none;z-index:1;position:absolute;top:-2%;width:clamp(64px,15vmin,110px);height:62%;margin-left:calc(clamp(64px,15vmin,110px)/-2);border:0;background:none;padding:0;transform-origin:50% 0;transition:left .6s ease-in-out,opacity .5s;animation:vn6in .5s backwards var(--dl,0s)}
.vn6vine.home{height:48%}
.vn6rope{position:absolute;left:50%;top:0;bottom:16%;width:5px;margin-left:-2.5px;border-radius:3px;background:linear-gradient(#5E8A34,#3E6A22);box-shadow:-6px 20% 0 -1px #6FB24A}
.vn6vine.home .vn6rope{bottom:0}
.vn6ban{pointer-events:auto;position:absolute;left:0;right:0;bottom:0;height:34%;display:grid;place-items:center;cursor:pointer}
.vn6vine.near,.vn6vine.hintglow{z-index:2}
.vn6ban svg{width:76%;height:100%}
.vn6ban b{position:absolute;bottom:26%;left:50%;transform:translateX(-50%);min-width:2.1em;padding:0 6px;border-radius:999px;background:#FFFFFF;color:#6A3A1A;border:3px solid #FFB81C;font-size:clamp(16px,4vmin,24px);line-height:1.3}
.vn6vine.near .vn6ban{filter:drop-shadow(0 0 10px #FFF06A) drop-shadow(0 0 4px #FFFFFF)}
.vn6ban.got{opacity:0;transition:opacity .5s}
.vn6vine.out{opacity:0;pointer-events:none}
.vn6vine.hintglow .vn6ban{filter:drop-shadow(0 0 12px #FFE27A)}
.vn6mk{position:absolute;width:clamp(70px,16vmin,120px);margin-left:calc(clamp(70px,16vmin,120px)/-2);z-index:3;transition:left .38s ease-in-out,top .38s ease-in-out;pointer-events:none}
.vn6mk svg{width:100%;height:auto;display:block}.vn6mk.swing svg{transform:rotate(-12deg);transition:transform .3s}
.vn6got{display:flex;gap:4px;justify-content:center;padding:2px 8px 6px}
.vn6got i{font-style:normal;min-width:30px;height:30px;border-radius:10px;border:2px dashed #C8B8E8;display:grid;place-items:center;color:#6A3A1A;background:rgba(255,255,255,.6);font-size:15px}
.vn6got i.on{border-style:solid;border-color:#FFB81C;background:#FFF4C8}
.vn6menu{z-index:6}
@keyframes vn6in{from{opacity:0;transform:translateY(-20px)}to{opacity:1}}
.vn6.calm .vn6vine,.vn6.calm .vn6mk{transition:none;animation:none}
@media (prefers-reduced-motion:reduce){.vn6vine,.vn6mk{transition:none;animation:none}}`;document.head.appendChild(st);
window.__V6={T,gate,ver:'2026-11-17'};
}catch(e){console.log('vine6',e)}})();


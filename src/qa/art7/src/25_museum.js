
/* ===================== 45 美術館的小畫家（季完結；虛構的星光美術館：白牆展覽廳、投射燈、小朋友的畫、雕塑、圖示牌；沒有字） ===================== */
const BOYH=()=>{try{return G.HERO==='prince'}catch(e){return false}};
function musWall(W,H,s,g,FY,c1='#FBF8F2',c2='#EFE8DC'){let d=`<defs>${lg(g+'w',[[0,c1],[1,c2]])}${lg(g+'f',[[0,'#D8A874'],[1,'#B07E4C']])}${lg(g+'cone',[[0,'#FFF8DA',.85],[1,'#FFF8DA',0]])}</defs>`;
 d+=R(-400,0,W+800,FY,`url(#${g}w)`)+R(-400,0,W+800,H*.07,'#F2EEE6')+R(-400,H*.07,W+800,3*s,'#E0D8CA');
 d+=R(-400,FY-14*s,W+800,14*s,'#E6DCCB');
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}f)`);for(let x=-400;x<W+400;x+=34*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.45)} ${H}" stroke="#9A6A3E" stroke-width="${n(1*s)}" opacity=".35"/>`;
 d+=`<ellipse cx="${n(W*.5)}" cy="${n(FY+(H-FY)*.4)}" rx="${n(W*.55)}" ry="${n(14*s)}" fill="#FFFFFF" opacity=".18"/>`;
 return d}
// 天花板軌道燈＋光錐
function trackLights(xs,FY,W,H,s,g){let d=R(-400,H*.075,W+800,4*s,'#C8C0B2');xs.forEach(x=>{d+=spotCone(x,H*.1,150*s,FY-H*.14,g+'cone',.5)+`<path d="M${n(x)} ${n(H*.08)} L${n(x-4*s)} ${n(H*.1)}" stroke="#5A5C74" stroke-width="${n(3*s)}"/><rect x="${n(x-9*s)}" y="${n(H*.095)}" width="${n(18*s)}" height="${n(12*s)}" rx="${n(3*s)}" fill="#5A5C74" transform="rotate(-10 ${n(x)} ${n(H*.1)})"/>`});return d}
function museum(W,H,v='hall'){const {P,s}=sc(W,H);const g=uid('ms');let d='';
 if(v==='lobby')return musLobby(W,H,s,P,g);
 if(v==='out')return musOut(W,H,s,P,g);
 if(v==='fin')return musFin(W,H,s,P,g);
 const FY=H*(P?.66:.64);d+=musWall(W,H,s,g,FY);
 if(v==='sculpt'){// 雕塑廳：台座上的雕塑、圖示牌（不摸、不開閃光燈）、地上的參觀線
  const xs=P?[W*.25,W*.75]:[W*.16,W*.5,W*.84];d+=trackLights(xs,FY,W,H,s,g);
  const ped=(x,k)=>{let o=shd(x,FY+30*s,40*s,6*s,.16)+R(x-30*s,FY-40*s,60*s,70*s,'#FFFFFF',3*s)+R(x-30*s,FY-40*s,60*s,6*s,'#EEE8DE')+R(x-30*s,FY-40*s,10*s,70*s,'#F4F0E8');
   if(k===0)o+=`<path d="M${n(x-20*s)} ${n(FY-40*s)} Q${n(x-26*s)} ${n(FY-100*s)} ${n(x)} ${n(FY-120*s)} Q${n(x+26*s)} ${n(FY-100*s)} ${n(x+20*s)} ${n(FY-40*s)}Z" fill="#7EC6F0"/><circle cx="${n(x)}" cy="${n(FY-80*s)}" r="${n(12*s)}" fill="#FFFFFF" opacity=".5"/>`;
   if(k===1)o+=`<path d="M${n(x)} ${n(FY-40*s)} V${n(FY-70*s)}" stroke="#C8925A" stroke-width="${n(6*s)}"/>`+[[0,-100,22,'#FF8A80'],[-16,-80,16,'#FFCB4D'],[16,-78,14,'#4FC4AE']].map(([dx,dy,r,c])=>`<circle cx="${n(x+dx*s)}" cy="${n(FY+dy*s)}" r="${n(r*s)}" fill="${c}"/><circle cx="${n(x+dx*s-r*s*.3)}" cy="${n(FY+dy*s-r*s*.3)}" r="${n(r*s*.3)}" fill="#FFFFFF" opacity=".5"/>`).join('');
   if(k===2)o+=`<path d="M${n(x-24*s)} ${n(FY-40*s)} L${n(x-10*s)} ${n(FY-110*s)} L${n(x+6*s)} ${n(FY-70*s)} L${n(x+22*s)} ${n(FY-120*s)} L${n(x+26*s)} ${n(FY-40*s)}Z" fill="#A99BE8"/><path d="M${n(x-10*s)} ${n(FY-110*s)} L${n(x+6*s)} ${n(FY-70*s)} L${n(x-4*s)} ${n(FY-40*s)}" fill="#8A7AD8"/>`;
   return o};
  xs.forEach((x,k)=>d+=ped(x,k));
  d+=iconSign(W*(P?.5:.33),H*.3,s*1.2,'notouch','#5A5C74')+iconSign(W*(P?.5:.33)+34*s,H*.3,s*1.2,'noflash','#5A5C74');
  d+=`<path d="M-400 ${n(FY+60*s)} H${W+400}" stroke="#FFCB4D" stroke-width="${n(4*s)}" stroke-dasharray="${n(16*s)} ${n(10*s)}" opacity=".7"/>`;
  return d}
 if(v==='kids'){// 兒童畫展區：主角的畫在中間發亮（星星緞帶），旁邊一排小朋友的畫
  const xs=P?[W*.5]:[W*.2,W*.5,W*.8];d+=trackLights(xs,FY,W,H,s,g);
  d+=R(-400,H*.18,W+800,FY-H*.32,'#FFF0E0',0,' opacity=".6"');
  const fw=(P?150:170)*s,fh=fw*.78,cx=W*.5,cy=H*(P?.3:.3);
  d+=`<ellipse cx="${n(cx)}" cy="${n(cy+fh*.5)}" rx="${n(fw*.9)}" ry="${n(fh*.9)}" fill="#FFF6C8" opacity=".55"/>`;
  d+=frameArt(cx-fw/2,cy,fw,fh,s,7,'gold',{boy:BOYH()});
  // 星星緞帶
  d+=T(cx+fw*.46,cy+fh*.06,s,`<path d="M-6 6 L-12 26 L-4 20 L0 28 L4 6Z M6 6 L12 26 L4 20 L0 28" fill="${C7.coral}"/><circle r="12" fill="${C7.gold}" stroke="#E0962A" stroke-width="2"/><path d="${star5(0,0,7)}" fill="#FFFFFF"/>`);
  d+=`<g${A('rd4tw',0,2)}><path d="${spark(cx-fw*.6,cy,7*s)}" fill="#FFE27A"/><path d="${spark(cx+fw*.62,cy+fh*.9,5*s)}" fill="#FFE27A"/></g>`;
  // 兩邊的小朋友的畫（高度剛好，小朋友看得到）
  const L=P?[[W*.08,.6,0],[W*.62,.6,3]]:[[W*.04,.26,0],[W*.17,.36,1],[W*.7,.26,3],[W*.83,.36,4]];
  L.forEach(([x,ty,k],i)=>d+=frameArt(x,H*ty,(P?100:96)*s,(P?76:72)*s,s,k,['white','mint','coral','wood'][i%4]));
  // 畫下面的小說明牌（只有色塊）
  L.forEach(([x,ty])=>d+=R(x+60*s,H*ty+82*s,30*s,14*s,'#FFFFFF',2*s,` stroke="#D8D0C2" stroke-width="${n(1*s)}"`)+R(x+64*s,H*ty+87*s,20*s,2*s,'#C8C0B2'));
  d+=R(cx+fw*.24,cy+fh+14*s,40*s,18*s,'#FFFFFF',2*s,` stroke="${C7.gold}" stroke-width="${n(1.4*s)}"`)+`<path d="${star5(cx+fw*.24+20*s,cy+fh+23*s,5*s)}" fill="${C7.gold}"/>`;
  d+=ropes(W*(P?.1:.3),W*(P?.9:.7),FY+(P?50:40)*s,s,'#C8462A','#C8962A');
  return d}
 // 展覽廳（主場景）：牆上掛著小朋友的畫、長椅、圍繩、圖示牌
 const xs=P?[W*.2,W*.8]:[W*.1,W*.32,W*.68,W*.9];d+=trackLights(xs,FY,W,H,s,g);
 const F=P?[[W*.06,.2,.84,2,'wood'],[W*.58,.18,.8,5,'gold']]:[[W*.02,.2,1,2,'wood'],[W*.23,.16,.82,5,'gold'],[W*.6,.18,.86,1,'white'],[W*.8,.2,.98,3,'mint']];
 F.forEach(([x,ty,k,a,st])=>d+=frameArt(x,H*ty,120*s*k,92*s*k,s,a,st));
 d+=R(W*(P?.4:.42),H*.24,(P?60:80)*s,(P?60:80)*s,'#FFFFFF',3*s,` stroke="#E8E0D2" stroke-width="${n(2*s)}"`)+T(W*(P?.4:.42)+(P?30:40)*s,H*.24+(P?30:40)*s,s*(P?.8:1),`<path d="M-26 20 L-6 -20 L10 6 L18 -6 L28 20Z" fill="#8FD08A"/><circle cx="16" cy="-18" r="7" fill="#FFCB4D"/>`);
 d+=iconSign(W*(P?.5:.53),H*(P?.4:.42),s*1.1,'noflash','#5A5C74');
 d+=bench(W*(P?.08:.12),FY+(P?80:64)*s,(P?100:140)*s,s,'#7E8ED8');
 d+=ropes(W*(P?.06:.04),W*(P?.94:.62),FY+(P?20:16)*s,s*.8,'#C8462A','#C8962A');
 return d}
// 大廳：挑高、大窗、旋轉樓梯、懸吊的彩色雕塑、服務台
function musLobby(W,H,s,P,g){const FY=H*(P?.7:.68);let d=musWall(W,H,s,g,FY,'#F6F2EA','#E8E0D2');
 // 大玻璃窗（左）
 d+=cityWin(W*(P?.04:.04),H*.1,(P?120:200)*s,FY-H*.14,s,'#C8C0B2',45,{cross:2,fw:5});
 // 懸吊的彩色雕塑（圓圈和星星，輕輕擺）
 const hx=W*.5;d+=`<g${A('rd4sw',0,6,`transform-origin:${n(hx)}px 0px`)}><path d="M${n(hx)} 0 V${n(H*.16)}" stroke="#A8A0B8" stroke-width="${n(1.4*s)}"/><path d="M${n(hx-80*s)} ${n(H*.16)} H${n(hx+80*s)}" stroke="#A8A0B8" stroke-width="${n(2*s)}"/>`
  +[[-80,40,'#FF8A80','c'],[-30,70,'#FFCB4D','s'],[30,50,'#4FC4AE','c'],[80,80,'#A99BE8','s']].map(([dx,len,c,t])=>`<path d="M${n(hx+dx*s)} ${n(H*.16)} V${n(H*.16+len*s)}" stroke="#A8A0B8" stroke-width="${n(1.2*s)}"/>${t==='c'?`<circle cx="${n(hx+dx*s)}" cy="${n(H*.16+len*s+12*s)}" r="${n(12*s)}" fill="${c}"/>`:`<path d="${star5(hx+dx*s,H*.16+len*s+12*s,14*s)}" fill="${c}"/>`}`).join('')+`</g>`;
 // 旋轉樓梯（右後）
 const sx=W*(P?.7:.76);for(let k=0;k<9;k++){const y=FY-k*22*s,x=sx+Math.sin(k*.7)*40*s;d+=R(x-40*s,y-8*s,80*s,10*s,'#FFFFFF',3*s)+R(x-40*s,y+2*s,80*s,4*s,'#D8D0C2')}
 d+=`<path d="M${n(sx-40*s)} ${n(FY-10*s)} ${Array.from({length:9},(_,k)=>`L${n(sx-40*s+Math.sin(k*.7)*40*s)} ${n(FY-k*22*s-30*s)}`).join(' ')}" stroke="#C8962A" stroke-width="${n(3*s)}" fill="none"/>`;
 // 服務台（中後）
 const cx=W*(P?.4:.4);d+=shd(cx,FY+8*s,90*s,7*s,.14)+R(cx-80*s,FY-50*s,160*s,56*s,'#FFFFFF',20*s)+R(cx-80*s,FY-50*s,160*s,10*s,C7.coral,6*s)+T(cx,FY-22*s,s*1.2,`<path d="M0 -9 Q10 -9 10 0 Q10 4 6 4 Q3 4 3 7 Q3 10 0 10 Q-10 10 -10 0 Q-10 -9 0 -9Z" fill="${C7.gold}"/>${[[-5,-3,'#FF8A80'],[0,-5,'#FFFFFF'],[5,-3,'#4FC4AE'],[-5,3,'#7EC6F0']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${c}"/>`).join('')}`);
 // 大大的垂吊布條（只有色塊和圖形，沒有字）
 [[W*(P?.12:.32),C7.coral],[W*(P?.88:.6),C7.mint]].forEach(([x,c],k)=>d+=`<path d="M${n(x-24*s)} ${n(H*.08)} H${n(x+24*s)} V${n(H*.4)} L${n(x)} ${n(H*.36)} L${n(x-24*s)} ${n(H*.4)}Z" fill="${c}"/>`+(k?`<circle cx="${n(x)}" cy="${n(H*.2)}" r="${n(12*s)}" fill="#FFFFFF" opacity=".85"/>`:`<path d="${star5(x,H*.2,13*s)}" fill="#FFFFFF" opacity=".9"/>`));
 if(!P)d+=plant(W*.04,FY+30*s,s*1.4);
 return d}
// 開場：美術館外觀（白色建築、大玻璃、台階、彩色布條、秋天的樹、鴿子）
function musOut(W,H,s,P,g){let d=`<defs>${skyDay(g+'s')}${lg(g+'b',[[0,'#FFFFFF'],[1,'#EEE8DE']])}${lg(g+'gl',[[0,'#BFE0F2'],[1,'#8AB8D8']])}${lg(g+'pl',[[0,'#EDE4D4'],[1,'#D8CCB8']])}</defs>`;
 const GY=H*(P?.72:.72);d+=R(-400,0,W+800,H,`url(#${g}s)`)+`<g${A('rd4dr',2,14)}>${cloud(W*.2,H*.1,s*.8)}${cloud(W*.84,H*.14,s*.6,'#FFFFFF',.9)}</g>`;
 // 建築：一個大方塊＋斜斜的玻璃屋頂
 const bx=W*(P?.04:.1),bw=W*(P?.92:.66),by=H*(P?.26:.2);
 d+=`<path d="M${n(bx)} ${n(by+30*s)} L${n(bx+bw*.55)} ${n(by-30*s)} L${n(bx+bw)} ${n(by+10*s)} V${n(GY)} H${n(bx)}Z" fill="url(#${g}b)"/>`;
 d+=`<path d="M${n(bx+bw*.3)} ${n(by+4*s)} L${n(bx+bw*.55)} ${n(by-30*s)} L${n(bx+bw*.8)} ${n(by-8*s)} V${n(GY)} H${n(bx+bw*.3)}Z" fill="url(#${g}gl)"/>`;
 for(let k=1;k<6;k++){const x=bx+bw*.3+k*bw*.5/6;d+=`<path d="M${n(x)} ${n(by+(k<3?4:-20)*s)} V${n(GY)}" stroke="#FFFFFF" stroke-width="${n(2.4*s)}" opacity=".8"/>`}
 d+=`<path d="M${n(bx+bw*.34)} ${n(GY)} L${n(bx+bw*.46)} ${n(by)} L${n(bx+bw*.52)} ${n(by-10*s)} L${n(bx+bw*.42)} ${n(GY)}Z" fill="#FFFFFF" opacity=".25"/>`;
 // 牆上的大畫框（裝飾：彩色的圓和三角）＋布條
 d+=R(bx+bw*.04,by+60*s,bw*.2,bw*.14,'#FFFFFF',4*s,` stroke="${C7.gold}" stroke-width="${n(5*s)}"`)+T(bx+bw*.14,by+60*s+bw*.07,s*(P?.8:1.1),`<circle cx="-12" cy="-6" r="14" fill="${C7.coral}"/><path d="M0 16 L14 -14 L28 16Z" fill="${C7.mint}" transform="translate(-6 0)"/><rect x="-26" y="6" width="16" height="10" fill="${C7.gold}"/>`);
 [[bx+bw*.86,C7.coral],[bx+bw*.94,C7.lav]].forEach(([x,c])=>d+=`<path d="M${n(x-12*s)} ${n(by+40*s)} H${n(x+12*s)} V${n(by+150*s)} L${n(x)} ${n(by+140*s)} L${n(x-12*s)} ${n(by+150*s)}Z" fill="${c}"/><circle cx="${n(x)}" cy="${n(by+70*s)}" r="${n(6*s)}" fill="#FFFFFF" opacity=".85"/>`);
 // 大門
 const dx=bx+bw*.55,dw=(P?90:110)*s;d+=R(dx-dw/2,GY-110*s,dw,110*s,'#5A6E9E',4*s)+R(dx-dw/2+5*s,GY-104*s,dw/2-8*s,104*s,'#8AB8D8',2*s)+R(dx+3*s,GY-104*s,dw/2-8*s,104*s,'#8AB8D8',2*s);
 // 廣場、台階
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}pl)`);for(let k=0;k<3;k++)d+=R(dx-dw-k*20*s,GY+k*10*s,dw*2+k*40*s,10*s,['#F6F0E4','#ECE2D0','#E2D6C0'][k],2*s);
 for(let x=-400;x<W+400;x+=60*s)d+=`<path d="M${n(x)} ${n(GY+30*s)} L${n(x+(x-W/2)*.4)} ${H}" stroke="#CFC2AC" stroke-width="${n(1.2*s)}"/>`;
 d+=atree(W*(P?.06:.04),GY+12*s,s*1.3,3)+atree(W*(P?.94:.88),GY+8*s,s*1.2,0);
 // 鴿子（廣場上兩隻）
 const pg=(x,y,f)=>T(x,y,s*f,`${shd(0,0,10,2,.18)}<ellipse cx="0" cy="-8" rx="10" ry="7" fill="#B8BCD0"/><circle cx="8" cy="-15" r="5" fill="#B8BCD0"/><path d="M5 -12 Q8 -9 11 -12" stroke="#7FC8A8" stroke-width="2" fill="none"/><path d="M13 -15 l4 1 l-4 1Z" fill="#E8A06A"/><circle cx="9" cy="-16" r="1" fill="#2A2438"/><path d="M-10 -8 L-16 -11 L-14 -5Z" fill="#9EA4BC"/><path d="M-2 -1 V2 M2 -1 V2" stroke="#E8A06A" stroke-width="1.4"/>`);
 d+=pg(W*(P?.2:.24),GY+(P?100:80)*s,1)+pg(W*(P?.32:.3),GY+(P?110:88)*s,-.9);
 const r=rng(45);for(let i=0;i<20;i++)d+=leafS(-200+r()*(W+400),GY+30*s+r()*(H-GY-30*s),s*1.2,ATC[i%4][0],Math.round(r()*180));
 return d}
// 季完結大結局：展覽開幕派對（彩旗、燈串、投射燈、主角的畫在中間）
function musFin(W,H,s,P,g){const FY=H*(P?.66:.66);let d=musWall(W,H,s,g,FY,'#FFF4E6','#F6E2CA');
 d+=`<defs>${rg(g+'gw',[[0,'#FFF2B0',.85],[1,'#FFF2B0',0]])}</defs>`;
 d+=trackLights(P?[W*.5]:[W*.26,W*.5,W*.74],FY,W,H,s,g);
 // 彩旗（兩條）
 [[H*.12,0],[H*.2,1]].forEach(([y,k])=>{const x0=-400,x1=W+400;d+=`<path d="M${x0} ${n(y)} Q${n(W/2)} ${n(y+40*s)} ${x1} ${n(y)}" stroke="#B8A890" stroke-width="${n(1.6*s)}" fill="none"/>`;
  for(let x=-380+k*20*s;x<W+400;x+=40*s){const t=(x-x0)/(x1-x0),yy=y+40*s*4*t*(1-t);d+=`<path d="M${n(x-12*s)} ${n(yy)} L${n(x+12*s)} ${n(yy)} L${n(x)} ${n(yy+22*s)}Z" fill="${[C7.coral,C7.gold,C7.mint,C7.lav,'#7EC6F0'][Math.abs(Math.round(x/40))%5]}"/>`}});
 // 主角的畫（中間，金框）
 const fw=(P?170:200)*s,fh=fw*.78,cx=W*.5,cy=H*(P?.28:.26);
 d+=`<ellipse cx="${n(cx)}" cy="${n(cy+fh*.5)}" rx="${n(fw)}" ry="${n(fh)}" fill="url(#${g}gw)"/>`+frameArt(cx-fw/2,cy,fw,fh,s,7,'gold',{boy:BOYH()});
 d+=T(cx,cy-16*s,s*1.2,`<path d="M-40 0 Q0 -14 40 0 L36 8 Q0 -4 -36 8Z" fill="${C7.coral}"/><circle r="12" fill="${C7.gold}" stroke="#E0962A" stroke-width="2"/><path d="${star5(0,0,7)}" fill="#FFFFFF"/>`);
 // 兩邊其他小朋友的畫
 if(!P)[[W*.06,.3,1,'mint'],[W*.2,.4,4,'white'],[W*.68,.3,3,'coral'],[W*.82,.4,0,'wood']].forEach(([x,ty,k,st])=>d+=frameArt(x,H*ty,96*s,72*s,s,k,st));
 // 氣球
 [[W*.12,H*.5,C7.coral],[W*.16,H*.46,C7.gold],[W*.86,H*.5,C7.mint],[W*.9,H*.45,C7.lav]].forEach(([x,y,c],k)=>d+=`<g${A('rd4bob',k*.6,3)}><path d="M${n(x)} ${n(y+22*s)} Q${n(x-6*s)} ${n(y+50*s)} ${n(x+2*s)} ${n(FY)}" stroke="#B8A890" stroke-width="${n(1.2*s)}" fill="none"/><ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(17*s)}" ry="${n(21*s)}" fill="${c}"/><ellipse cx="${n(x-6*s)}" cy="${n(y-7*s)}" rx="${n(4*s)}" ry="${n(7*s)}" fill="#FFFFFF" opacity=".5"/></g>`);
 // 紅地毯（從前面到畫）
 d+=`<path d="M${n(cx-50*s)} ${n(FY)} L${n(cx+50*s)} ${n(FY)} L${n(cx+130*s)} ${H} L${n(cx-130*s)} ${H}Z" fill="${C7.coral}" opacity=".85"/><path d="M${n(cx-50*s)} ${n(FY)} L${n(cx-130*s)} ${H} M${n(cx+50*s)} ${n(FY)} L${n(cx+130*s)} ${H}" stroke="${C7.gold}" stroke-width="${n(4*s)}"/>`;
 // 彩色紙片
 const r=rng(450);for(let i=0;i<36;i++){const x=r()*W,y=r()*FY;d+=`<rect${i%3?'':A('rd4tw',(i*.3)%3,2)} x="${n(x)}" y="${n(y)}" width="${n(6*s)}" height="${n(3*s)}" fill="${[C7.coral,C7.gold,C7.mint,C7.lav,'#7EC6F0'][i%5]}" transform="rotate(${Math.round(r()*180)} ${n(x)} ${n(y)})"/>`}
 for(let i=0;i<8;i++)d+=`<path${A('rd4tw',i*.4,2.4)} d="${spark(r()*W,r()*FY*.8,(4+r()*4)*s)}" fill="#FFF6C8"/>`;
 return d}

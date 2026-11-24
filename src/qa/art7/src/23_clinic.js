
/* ===================== 43 看醫生不害怕（虛構的小診所和牙醫；標誌用「愛心＋加號」的薄荷綠，不用紅十字；沒有字、叫號燈不出數字） ===================== */
function clinWall(W,H,s,g,FY,c1='#EAF7F4',c2='#D6EEE8'){let d=`<defs>${lg(g+'w',[[0,c1],[1,c2]])}${lg(g+'f',[[0,'#E6E2EE'],[1,'#CFCADC']])}</defs>`;
 d+=R(-400,0,W+800,FY,`url(#${g}w)`);
 // 牆上淡淡的雲朵和星星貼紙
 const rr=rng(430);for(let i=0;i<10;i++){const x=-300+rr()*(W+600),y=H*.12+rr()*(FY-H*.4);d+=i%2?cloud(x,y,s*.32,'#FFFFFF',.55):`<path d="${star5(x,y,6*s)}" fill="#FFFFFF" opacity=".6"/>`}
 // 下半截護牆板（圓角木板）
 d+=R(-400,FY-64*s,W+800,64*s,'#F6EEE0')+R(-400,FY-66*s,W+800,5*s,'#E2D2B8');
 for(let x=-400;x<W+400;x+=70*s)d+=R(x+6*s,FY-56*s,58*s,48*s,'#FBF5EA',6*s,` stroke="#E8DCC6" stroke-width="${n(1.4*s)}"`);
 d+=R(-400,FY-8*s,W+800,8*s,C7.mint);
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}f)`);d+=R(-400,FY,W+800,10*s,'#000000',0,' opacity=".05"');for(let x=-400;x<W+400;x+=54*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.35)} ${H}" stroke="#BEB8CC" stroke-width="${n(1*s)}" opacity=".7"/>`;
 [.3,.62].forEach(t=>d+=`<path d="M-400 ${n(FY+(H-FY)*t)} H${W+400}" stroke="#BEB8CC" stroke-width="${n(1*s)}" opacity=".7"/>`);
 d+=`<ellipse cx="${n(W*.5)}" cy="${n(FY+(H-FY)*.45)}" rx="${n(W*.5)}" ry="${n(12*s)}" fill="#FFFFFF" opacity=".22"/>`;
 return d}
// 候診椅一排
function seats(x,y,nn,s,c=C7.coral){let d=shd(x+nn*22*s,y+4*s,nn*24*s,5*s,.14)+R(x,y-6*s,nn*44*s,4*s,'#A8AEC2',2*s);
 for(let k=0;k<nn;k++){const sx=x+k*44*s;d+=`<path d="M${n(sx+6*s)} ${n(y-4*s)} V${n(y+2*s)} M${n(sx+36*s)} ${n(y-4*s)} V${n(y+2*s)}" stroke="#A8AEC2" stroke-width="${n(3*s)}"/>`+R(sx+2*s,y-22*s,40*s,14*s,c,6*s)+R(sx+4*s,y-58*s,36*s,36*s,c,8*s)+R(sx+8*s,y-54*s,10*s,24*s,'#FFFFFF',5*s,' opacity=".25"')}
 return d}
// 叫號燈（只有一排亮點和一個鈴鐺）
function callBoard(x,y,s){return R(x-60*s,y-26*s,120*s,52*s,'#3A3E56',8*s)+R(x-54*s,y-20*s,70*s,40*s,'#1E2234',5*s)
 +[0,1,2].map(k=>`<circle cx="${n(x-40*s+k*21*s)}" cy="${n(y)}" r="${n(7*s)}" fill="${k===2?'#8AF0B0':'#3A4A50'}"${k===2?A('rd4tw',0,1.6):''}/>`).join('')
 +T(x+38*s,y,s,`<path d="M-9 6 Q-9 -8 0 -9 Q9 -8 9 6Z" fill="#FFCB4D"/><rect x="-11" y="5" width="22" height="3" rx="1.5" fill="#FFCB4D"/><circle cx="0" cy="10" r="2.4" fill="#FFCB4D"/>`)}
function clinic(W,H,v='wait'){const {P,s}=sc(W,H);const g=uid('cl');let d='';
 if(v==='doc')return clinDoc(W,H,s,P,g);
 if(v==='dent')return clinDent(W,H,s,P,g);
 if(v==='med')return clinMed(W,H,s,P,g);
 if(v==='out')return clinOut(W,H,s,P,g);
 const FY=H*(P?.7:.68);d+=clinWall(W,H,s,g,FY);
 // 天花板燈
 d+=R(-400,0,W+800,H*.06,'#F4FBF9');for(let x=-400;x<W+400;x+=180*s)d+=lightBar(x+40*s,H*.02,100*s,s);
 // 掛號櫃台（右後方，主角站在右下，櫃台在後面）
 const kx=W*(P?.56:.62),kw=(P?150:250)*s;
 d+=R(kx,FY-80*s,kw,80*s,'#FFFFFF',6*s)+R(kx,FY-80*s,kw,10*s,C7.mint,6*s)+R(kx+10*s,FY-62*s,kw-20*s,54*s,'#E2F4F0',4*s)+iconSign(kx+kw/2,FY-34*s,s,'heart',C7.mint);
 d+=R(kx+kw*.1,FY-108*s,46*s,28*s,'#5A5C74',4*s)+R(kx+kw*.1+4*s,FY-104*s,38*s,18*s,'#BFF6E8',2*s)+plant(kx+kw-26*s,FY-80*s,s*.8);
 // 叫號燈（左上）＋窗戶
 d+=callBoard(W*(P?.3:.2),H*(P?.2:.18),s*(P?1:1.1));
 d+=cityWin(W*(P?.7:.38),H*.12,(P?80:120)*s,(P?90:110)*s,s,'#FFFFFF',43,{cross:2,fw:6});
 // 牆上的圖示：洗手、咳嗽遮口鼻
 const pst=(x,y,ic)=>R(x-24*s,y-30*s,48*s,60*s,'#FFFFFF',4*s,` stroke="#BFE0EA" stroke-width="${n(2*s)}"`)+iconSign(x,y-6*s,s*1.1,ic,'#5AA6D0')+R(x-14*s,y+14*s,28*s,3*s,'#CFE6EE',1.5*s)+R(x-10*s,y+20*s,20*s,3*s,'#CFE6EE',1.5*s);
 d+=pst(W*(P?.14:.56),H*(P?.4:.27),'wash')+pst(W*(P?.3:.64),H*(P?.4:.27),'cover');
 // 魚缸（在矮櫃上）
 if(!P){const fx=W*.44,fy=FY-6*s;d+=shd(fx,fy+2*s,56*s,5*s,.12)+R(fx-50*s,fy-40*s,100*s,40*s,'#E8D2B0',4*s)+R(fx-46*s,fy-36*s,42*s,32*s,'#D8BE96',3*s)+R(fx+4*s,fy-36*s,42*s,32*s,'#D8BE96',3*s)
  +R(fx-44*s,fy-96*s,88*s,56*s,'#BFE8F6',6*s,` stroke="#8ACCE0" stroke-width="${n(2.4*s)}"`)+R(fx-40*s,fy-58*s,80*s,14*s,'#E8DCB8',3*s)
  +`<path d="M${n(fx-30*s)} ${n(fy-44*s)} q${n(-4*s)} ${n(-20*s)} ${n(4*s)} ${n(-34*s)} M${n(fx+28*s)} ${n(fy-44*s)} q${n(6*s)} ${n(-16*s)} 0 ${n(-28*s)}" stroke="#5AAE5A" stroke-width="${n(3*s)}" fill="none" stroke-linecap="round"/>`
  +[[-6,-76,'#FF8A80',1],[16,-66,'#FFCB4D',-1]].map(([dx,dy,c,f],k)=>`<g${A('rd4dr',k*2,7)}>${T(fx+dx*s,fy+dy*s,s,`<path d="M-7 0 Q0 -6 7 0 Q0 6 -7 0Z" fill="${c}"/><path d="M${7*f} 0 l${4*f} -4 v8Z" fill="${c}"/><circle cx="${-3*f}" cy="-1" r="1" fill="#3A2A2A"/>`)}</g>`).join('')
  +`<circle${A('rd4tw',0,2)} cx="${n(fx+4*s)}" cy="${n(fy-86*s)}" r="${n(2*s)}" fill="#FFFFFF"/><path d="M${n(fx-40*s)} ${n(fy-92*s)} L${n(fx-30*s)} ${n(fy-92*s)} L${n(fx-40*s)} ${n(fy-50*s)}Z" fill="#FFFFFF" opacity=".4"/>`}
 // 候診椅（左邊一排）
 d+=seats(W*(P?.02:.03),FY+(P?40:30)*s,P?3:4,s,C7.coral);
 // 兒童遊戲角（小積木、搖搖馬）
 const tx=W*(P?.22:.38);d+=`<ellipse cx="${n(tx)}" cy="${n(FY+(P?110:84)*s)}" rx="${n(70*s)}" ry="${n(16*s)}" fill="#FFE6A8" opacity=".8"/>`;
 [[-30,0,'#FF8A80'],[-12,4,'#7EC6F0'],[6,0,'#FFCB4D'],[-20,-14,'#8FD08A']].forEach(([dx,dy,c])=>d+=R(tx+dx*s,FY+(P?96:70)*s+dy*s,16*s,14*s,c,2*s));
 d+=T(tx+40*s,FY+(P?100:74)*s,s,`<path d="M-18 6 Q0 14 18 6" stroke="#C8925A" stroke-width="3" fill="none"/><ellipse cx="0" cy="-6" rx="14" ry="9" fill="#FFB27A"/><circle cx="12" cy="-16" r="7" fill="#FFB27A"/><path d="M8 -22 L10 -28 L14 -22Z" fill="#FFB27A"/><circle cx="14" cy="-17" r="1.4" fill="#3A2A2A"/><path d="M-12 -8 Q-20 -10 -20 -2" stroke="#C8784A" stroke-width="3" fill="none"/>`);
 return d}
// 診間：醫生的桌子、聽診器、量身高的積木格子尺、檢查床
function clinDoc(W,H,s,P,g){const FY=H*(P?.72:.7);let d=clinWall(W,H,s,g,FY,'#EEF6FF','#DCE8F8');
 d+=R(-400,0,W+800,H*.06,'#F6FAFF');for(let x=-400;x<W+400;x+=180*s)d+=lightBar(x+40*s,H*.02,100*s,s);
 // 量身高：牆上的彩色積木格子尺（一格一格）
 const hx=W*(P?.1:.08);for(let k=0;k<10;k++){const c=['#FF8A80','#FFB27A','#FFCB4D','#8FD08A','#4FC4AE','#7EC6F0','#A99BE8','#F48FB8','#FF8A80','#FFB27A'][k];d+=R(hx,FY-(k+1)*24*s,34*s,22*s,c,3*s)+R(hx+3*s,FY-(k+1)*24*s+3*s,8*s,16*s,'#FFFFFF',2*s,' opacity=".35"')}
 d+=T(hx+17*s,FY-252*s,s,`<path d="${star5(0,0,9)}" fill="${C7.gold}"/>`);
 // 檢查床（左後，鋪白紙）
 const bx=W*(P?.3:.18),bw=(P?120:170)*s;d+=shd(bx+bw/2,FY+6*s,bw*.55,6*s,.14)+R(bx,FY-46*s,bw,16*s,'#7EC6F0',6*s)+R(bx+bw*.15,FY-48*s,bw*.7,6*s,'#FFFFFF',2*s)+R(bx-4*s,FY-60*s,30*s,16*s,'#BFE6FF',8*s)+`<path d="M${n(bx+10*s)} ${n(FY-30*s)} V${n(FY)} M${n(bx+bw-10*s)} ${n(FY-30*s)} V${n(FY)}" stroke="#A8AEC2" stroke-width="${n(4*s)}"/>`;
 // 醫生的桌子（中間後面）：電腦、聽診器、筆筒、小熊玩偶
 const dx=W*(P?.6:.5),dw=(P?150:200)*s;d+=shd(dx,FY+6*s,dw*.55,7*s,.14)+R(dx-dw/2,FY-56*s,dw,10*s,'#E8E2D6',4*s)+R(dx-dw/2+6*s,FY-46*s,dw*.4,46*s,'#D8D0C2',4*s)+`<path d="M${n(dx+dw/2-12*s)} ${n(FY-46*s)} V${n(FY)}" stroke="#B8B0A2" stroke-width="${n(5*s)}"/>`;
 d+=R(dx-dw*.1,FY-100*s,70*s,44*s,'#5A5C74',5*s)+R(dx-dw*.1+5*s,FY-95*s,60*s,32*s,'#BFE6FF',3*s)+R(dx-dw*.1+30*s,FY-56*s,10*s,6*s,'#5A5C74')+`<path d="${heartP(dx-dw*.1+35*s,FY-80*s,7*s)}" fill="${C7.mint}"/>`;
 d+=T(dx-dw*.36,FY-58*s,s,`<path d="M-10 -2 Q-12 -22 0 -24 Q12 -22 10 -2" stroke="#5A6A9A" stroke-width="2.4" fill="none"/><circle cx="-10" cy="-1" r="2.6" fill="#5A6A9A"/><circle cx="10" cy="-1" r="2.6" fill="#5A6A9A"/><path d="M0 -24 Q14 -26 16 -10" stroke="#5A6A9A" stroke-width="2.4" fill="none"/><circle cx="16" cy="-6" r="5" fill="#C8D2E8" stroke="#8A96B8" stroke-width="1.6"/>`);
 d+=T(dx+dw*.38,FY-56*s,s,`<circle cx="0" cy="-10" r="9" fill="#C9875A"/><circle cx="-7" cy="-17" r="3.6" fill="#C9875A"/><circle cx="7" cy="-17" r="3.6" fill="#C9875A"/><ellipse cx="0" cy="-7" rx="4" ry="3" fill="#F4CFA6"/><circle cx="-3" cy="-11" r="1.2" fill="#3A2A2A"/><circle cx="3" cy="-11" r="1.2" fill="#3A2A2A"/><ellipse cx="0" cy="2" rx="8" ry="6" fill="#C9875A"/>`);
 // 牆上：一張身體圖（愛心）、窗戶
 d+=cityWin(W*(P?.62:.7),H*.12,(P?90:130)*s,(P?96:110)*s,s,'#FFFFFF',44,{cross:2,fw:6});
 d+=R(W*(P?.36:.36),H*.14,70*s,90*s,'#FFFFFF',4*s,` stroke="#BFD8F0" stroke-width="${n(2*s)}"`)+T(W*(P?.36:.36)+35*s,H*.14+45*s,s,`<circle cx="0" cy="-26" r="8" fill="#FFD0B8"/><path d="M-12 -14 H12 L10 14 H-10Z" fill="#BFE6FF"/><path d="${heartP(0,-4,6)}" fill="${C7.coral}"/><path d="M-6 14 V32 M6 14 V32" stroke="#FFD0B8" stroke-width="5" stroke-linecap="round"/>`);
 return d}
// 牙醫：診療椅、頭上的燈、漱口杯、大牙齒圖、窗外的雲
function clinDent(W,H,s,P,g){const FY=H*(P?.72:.7);let d=clinWall(W,H,s,g,FY,'#F0FBFF','#DDF0FA');
 d+=R(-400,0,W+800,H*.06,'#F6FDFF');for(let x=-400;x<W+400;x+=180*s)d+=lightBar(x+40*s,H*.02,100*s,s);
 d+=cityWin(W*(P?.06:.06),H*.12,(P?100:140)*s,(P?110:120)*s,s,'#FFFFFF',45,{cross:2,fw:6});
 // 大牙齒圖（笑臉）、刷牙圖
 const px=W*(P?.66:.4);d+=R(px,H*.12,96*s,96*s,'#FFFFFF',10*s,` stroke="#BFE6FF" stroke-width="${n(3*s)}"`)+T(px+48*s,H*.12+50*s,s*1.6,`<path d="M-14 -14 Q-16 -22 -6 -20 Q0 -18 6 -20 Q16 -22 14 -14 Q14 -2 10 8 Q8 18 4 16 Q2 6 0 6 Q-2 6 -4 16 Q-8 18 -10 8 Q-14 -2 -14 -14Z" fill="#FFFFFF" stroke="#8ACBE8" stroke-width="1.6"/><circle cx="-5" cy="-8" r="1.6" fill="#3A3150"/><circle cx="5" cy="-8" r="1.6" fill="#3A3150"/><path d="M-4 -3 Q0 0 4 -3" stroke="#3A3150" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="-9" cy="-4" r="2" fill="#FFB0C0" opacity=".8"/><circle cx="9" cy="-4" r="2" fill="#FFB0C0" opacity=".8"/><path d="${spark(14,-18,3)}" fill="#FFE27A"/>`);
 // 診療椅（中間偏左）：底座、座墊、斜斜的椅背、頭枕、扶手、腳的那一段
 const cx=W*(P?.52:.36),cy=FY+20*s;d+=shd(cx+10*s,cy+6*s,110*s,9*s,.16);
 d+=R(cx-36*s,cy-8*s,72*s,12*s,'#B8BECE',6*s)+R(cx-10*s,cy-46*s,20*s,40*s,'#C8CCDA',4*s)+R(cx-6*s,cy-46*s,4*s,40*s,'#FFFFFF',2*s,' opacity=".5"');
 const ch=(o)=>`<path d="${o}" fill="${C7.mint}"/>`;
 d+=ch(`M${n(cx-50*s)} ${n(cy-58*s)} H${n(cx+44*s)} Q${n(cx+56*s)} ${n(cy-58*s)} ${n(cx+56*s)} ${n(cy-46*s)} H${n(cx-50*s)}Z`);
 d+=ch(`M${n(cx+40*s)} ${n(cy-58*s)} L${n(cx+96*s)} ${n(cy-36*s)} Q${n(cx+104*s)} ${n(cy-32*s)} ${n(cx+100*s)} ${n(cy-24*s)} L${n(cx+92*s)} ${n(cy-22*s)} L${n(cx+40*s)} ${n(cy-44*s)}Z`);
 d+=ch(`M${n(cx-48*s)} ${n(cy-56*s)} L${n(cx-104*s)} ${n(cy-124*s)} Q${n(cx-112*s)} ${n(cy-138*s)} ${n(cx-98*s)} ${n(cy-144*s)} L${n(cx-78*s)} ${n(cy-150*s)} Q${n(cx-64*s)} ${n(cy-152*s)} ${n(cx-58*s)} ${n(cy-140*s)} L${n(cx-24*s)} ${n(cy-60*s)}Z`);
 d+=`<ellipse cx="${n(cx-92*s)}" cy="${n(cy-158*s)}" rx="${n(22*s)}" ry="${n(11*s)}" fill="#3EAE98" transform="rotate(-25 ${n(cx-92*s)} ${n(cy-158*s)})"/>`;
 d+=`<path d="M${n(cx-82*s)} ${n(cy-132*s)} L${n(cx-52*s)} ${n(cy-68*s)}" stroke="#FFFFFF" stroke-width="${n(5*s)}" opacity=".35" stroke-linecap="round"/><path d="M${n(cx-40*s)} ${n(cy-54*s)} H${n(cx+40*s)}" stroke="#FFFFFF" stroke-width="${n(3*s)}" opacity=".35" stroke-linecap="round"/>`;
 d+=R(cx-30*s,cy-82*s,46*s,8*s,'#3EAE98',4*s)+`<path d="M${n(cx+10*s)} ${n(cy-78*s)} V${n(cy-56*s)}" stroke="#A8AEC2" stroke-width="${n(4*s)}"/>`;
 // 漱口小台（椅子旁邊）
 d+=R(cx-150*s,cy-90*s,8*s,90*s,'#C8CCDA',3*s)+`<ellipse cx="${n(cx-146*s)}" cy="${n(cy-92*s)}" rx="${n(16*s)}" ry="${n(6*s)}" fill="#FFFFFF" stroke="#C8CCDA" stroke-width="${n(2*s)}"/>`+R(cx-138*s,cy-110*s,10*s,14*s,'#FFCB4D',2*s);
 // 頭上的燈（手臂）
  d+=`<path d="M${n(cx-40*s)} 0 V${n(H*.18)} Q${n(cx-40*s)} ${n(H*.24)} ${n(cx-60*s)} ${n(H*.28)}" stroke="#C8CCDA" stroke-width="${n(6*s)}" fill="none" stroke-linecap="round"/>`+T(cx-66*s,H*.3,s,`<path d="M-26 0 Q0 -26 26 0Z" fill="#E8ECF4" stroke="#C8CCDA" stroke-width="2"/><ellipse cx="0" cy="0" rx="22" ry="5" fill="#FFF6C8"/><path d="M-24 6 L-50 90 L40 90 L24 6Z" fill="#FFF8DA" opacity=".25"/>`);
 // 小推車：器械盤、漱口杯
 const tx=cx+140*s;d+=shd(tx,FY+4*s,30*s,4*s,.14)+`<path d="M${n(tx)} ${n(FY)} V${n(FY-80*s)}" stroke="#A8AEC2" stroke-width="${n(4*s)}"/>`+R(tx-34*s,FY-86*s,68*s,8*s,'#E8ECF4',3*s)+`<path d="M${n(tx-24*s)} ${n(FY-88*s)} l${n(16*s)} 0 M${n(tx-4*s)} ${n(FY-88*s)} l${n(16*s)} 0" stroke="#8A96B8" stroke-width="${n(2*s)}" stroke-linecap="round"/>`+R(tx+14*s,FY-104*s,14*s,18*s,'#FFCB4D',3*s)+R(tx+16*s,FY-102*s,4*s,14*s,'#FFFFFF',2*s,' opacity=".5"');
 if(!P)d+=plant(W*.95,FY+6*s,s*1.1);
 return d}
// 藥局領藥窗口：藥袋（大人拿）、櫃台高高的、牆上「藥要大人給」的圖示（大人的手＋藥袋）
function clinMed(W,H,s,P,g){const FY=H*(P?.72:.7);let d=clinWall(W,H,s,g,FY,'#F4F8EE','#E4EEDA');
 d+=R(-400,0,W+800,H*.06,'#F8FBF4');for(let x=-400;x<W+400;x+=180*s)d+=lightBar(x+40*s,H*.02,100*s,s);
 // 領藥窗口（左半）＋後面的藥櫃
 const wx=W*(P?.06:.06),ww=W*(P?.88:.56),wy=H*.12;
 d+=R(wx,wy,ww,FY-wy-90*s,'#FFFFFF',8*s)+R(wx+12*s,wy+12*s,ww-24*s,FY-wy-120*s,'#EAF6F0',4*s);
 for(let r=0;r<3;r++)for(let c=0;c<(P?5:8);c++){const x=wx+22*s+c*(ww-44*s)/(P?5:8),y=wy+22*s+r*(FY-wy-140*s)/3;d+=R(x,y,(ww-44*s)/(P?5:8)-8*s,(FY-wy-140*s)/3-8*s,'#FFFFFF',3*s,` stroke="#CFE6DA" stroke-width="${n(1.4*s)}"`)+`<circle cx="${n(x+((ww-44*s)/(P?5:8)-8*s)/2)}" cy="${n(y+10*s)}" r="${n(2*s)}" fill="${[C7.mint,C7.coral,C7.gold,C7.lav][(r+c)%4]}"/>`}
 d+=R(wx-10*s,FY-90*s,ww+20*s,16*s,'#C8E8DC',6*s)+R(wx,FY-74*s,ww,74*s,'#FFFFFF',4*s)+R(wx,FY-74*s,ww,6*s,C7.mint);
 // 櫃台上：兩個藥袋（白色紙袋，上面只有圖示：太陽、月亮）、一個小籃子
 const mb=(x,ic)=>`<g transform="translate(${n(x)} ${n(FY-92*s)})">${R(-18*s,-44*s,36*s,46*s,'#FFFFFF',3*s,` stroke="#BFD8C8" stroke-width="${n(1.4*s)}"`)}${R(-18*s,-44*s,36*s,10*s,C7.mint,3*s)}${ic==='sun'?`<circle cx="0" cy="${n(-16*s)}" r="${n(6*s)}" fill="${C7.gold}"/>`:`<path d="M${n(4*s)} ${n(-22*s)} A${n(7*s)} ${n(7*s)} 0 1 0 ${n(4*s)} ${n(-8*s)} A${n(5*s)} ${n(5*s)} 0 1 1 ${n(4*s)} ${n(-22*s)}Z" fill="${C7.lav}"/>`}</g>`;
 d+=mb(wx+ww*.3,'sun')+mb(wx+ww*.42,'moon');
 // 牆上：藥要大人給（大人的手拿藥袋）的圖示板
 const ix=W*(P?.8:.78),iy=H*(P?.5:.22);d+=R(ix-44*s,iy-34*s,88*s,68*s,'#FFFFFF',8*s,` stroke="${C7.mint}" stroke-width="${n(3*s)}"`)+T(ix,iy,s,`<path d="M-30 14 Q-20 6 -8 8 L4 8 Q8 8 8 12 Q8 16 4 16 H-6" stroke="#E8B898" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="2" y="-20" width="18" height="24" rx="2" fill="#FFFFFF" stroke="${C7.mint}" stroke-width="2"/><rect x="2" y="-20" width="18" height="6" fill="${C7.mint}"/><circle cx="11" cy="-6" r="3" fill="${C7.gold}"/><path d="M-26 -16 Q-16 -24 -6 -14" stroke="${C7.coral}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="${heartP(-18,-24,4)}" fill="${C7.coral}"/>`);
 // 候診椅（右邊；主角會站在右下）
 if(!P)d+=seats(W*.66,FY+44*s,2,s,C7.lav);
 return d}
// 開場：街角的小診所（綠色植物、遮雨棚、愛心加號招牌）
function clinOut(W,H,s,P,g){let d=`<defs>${skyDay(g+'s')}${lg(g+'b',[[0,'#FFFFFF'],[1,'#E8F2F0']])}${lg(g+'gl',[[0,'#BFE6F4'],[1,'#8ACBE4']])}${lg(g+'rd',[[0,'#D8D4DE'],[1,'#BCB6C8']])}</defs>`;
 const GY=H*(P?.72:.72);d+=R(-400,0,W+800,H,`url(#${g}s)`)+`<g${A('rd4dr',1,14)}>${cloud(W*.7,H*.1,s*.8)}</g>`;
 d+=city(-400,W+400,GY-10*s,s,143,['#E8DCD0','#D8E4EE','#F2E2D6','#DCE8DE']);
 const bx=W*(P?.06:.12),bw=W*(P?.88:.56),by=H*(P?.24:.18);
 d+=R(bx,by,bw,GY-by,`url(#${g}b)`,6*s)+R(bx,by,bw,14*s,C7.mint,6*s);
 // 招牌（愛心加號）
 d+=T(bx+bw/2,by+40*s,s*1.6,`<circle r="18" fill="#FFFFFF" stroke="${C7.mint}" stroke-width="3"/><path d="${heartP(0,1,11)}" fill="${C7.mint}"/><path d="M-2 -5 H2 V-1 H6 V3 H2 V7 H-2 V3 H-6 V-1 H-2Z" fill="#FFFFFF"/>`);
 // 遮雨棚（薄荷＋白條紋）
 const aw=bw*.9,ax=bx+bw*.05,ay=by+74*s;let st='';for(let k=0;k<12;k++)st+=`<path d="M${n(ax+k*aw/12)} ${n(ay)} h${n(aw/12)} v${n(26*s)} q${n(-aw/24)} ${n(10*s)} ${n(-aw/12)} 0Z" fill="${k%2?'#FFFFFF':C7.mint}"/>`;d+=st;
 // 大窗＋門
 const ww=bw*.3;d+=R(bx+bw*.06,ay+44*s,ww,GY-ay-60*s,`url(#${g}gl)`,4*s)+R(bx+bw*.64,ay+44*s,ww,GY-ay-60*s,`url(#${g}gl)`,4*s);
 [bx+bw*.06,bx+bw*.64].forEach(x=>{d+=`<path d="M${n(x+ww*.2)} ${n(ay+44*s)} L${n(x+ww*.45)} ${n(ay+44*s)} L${n(x+ww*.25)} ${n(GY-16*s)} L${n(x)} ${n(GY-16*s)}Z" fill="#FFFFFF" opacity=".3"/>`+plant(x+ww*.8,GY-16*s,s*.8)});
 const dx=bx+bw/2,dw=(P?80:96)*s;d+=R(dx-dw/2,ay+40*s,dw,GY-ay-40*s,`url(#${g}gl)`,4*s)+`<path d="M${n(dx)} ${n(ay+40*s)} V${n(GY)}" stroke="#FFFFFF" stroke-width="${n(3*s)}"/>`+R(dx-dw/2-6*s,ay+36*s,dw+12*s,6*s,'#3EAE98',3*s);
 // 人行道、路樹
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}rd)`)+R(-400,GY,W+800,26*s,'#E8E2EE');for(let x=-400;x<W+400;x+=40*s)d+=`<path d="M${n(x)} ${n(GY)} V${n(GY+26*s)}" stroke="#D2CCDC" stroke-width="${n(1.4*s)}"/>`;
 d+=atree(W*(P?.92:.86),GY+10*s,s*1.2,0)+atree(W*(P?.04:.05),GY+12*s,s*1.1,3);
 const r=rng(43);for(let i=0;i<18;i++)d+=leafS(-200+r()*(W+400),GY+30*s+r()*(H-GY-30*s),s*1.2,ATC[i%4][0],Math.round(r()*180));
 return d}

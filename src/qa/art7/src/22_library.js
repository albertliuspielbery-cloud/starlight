
/* ===================== 42 安靜的圖書館（虛構的市立圖書館：高高的書架、大拱窗、閱讀桌、繪本區；沒有字） ===================== */
function libWall(W,H,s,g,FY){let d=`<defs>${lg(g+'w',[[0,'#FFF4E2'],[1,'#F6E4C8']])}${lg(g+'f',[[0,'#C89A68'],[1,'#A8784A']])}${rg(g+'sun',[[0,'#FFF6D0',.7],[1,'#FFF6D0',0]])}</defs>`;
 d+=R(-400,0,W+800,FY,`url(#${g}w)`);
 d+=R(-400,FY-30*s,W+800,30*s,'#E8CFA8')+R(-400,FY-32*s,W+800,4*s,'#C8A274');
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}f)`);for(let x=-400;x<W+400;x+=46*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.4)} ${H}" stroke="#9A6A3E" stroke-width="${n(1.1*s)}" opacity=".45"/>`;
 for(let y=FY+18*s;y<H;y+=26*s)d+=`<path d="M-400 ${n(y)} H${W+400}" stroke="#9A6A3E" stroke-width="${n(1*s)}" opacity=".3"/>`;
 return d}
// 大拱窗（外面是秋天的樹）
function archWin(x,y,w,h,s,seed){const g=uid('aw');return `<defs><clipPath id="${g}"><path d="M${n(x)} ${n(y+h)} V${n(y+w/2)} A${n(w/2)} ${n(w/2)} 0 0 1 ${n(x+w)} ${n(y+w/2)} V${n(y+h)}Z"/></clipPath></defs>`
 +`<g clip-path="url(#${g})">${cityWin(x,y,w,h,s,'#FFFFFF',seed,{cross:0,fw:0,r:0})}</g>`
 +`<path d="M${n(x)} ${n(y+h)} V${n(y+w/2)} A${n(w/2)} ${n(w/2)} 0 0 1 ${n(x+w)} ${n(y+w/2)} V${n(y+h)}Z" fill="none" stroke="#FFFFFF" stroke-width="${n(8*s)}"/>`
 +`<path d="M${n(x+w/2)} ${n(y)} V${n(y+h)} M${n(x)} ${n(y+h*.55)} H${n(x+w)}" stroke="#FFFFFF" stroke-width="${n(5*s)}"/>`+R(x-8*s,y+h,w+16*s,8*s,'#E8CFA8',2*s)}
// 閱讀桌（桌燈＋打開的書）
function readTable(x,y,w,s,lamp=1){let d=shd(x,y+4*s,w*.62,8*s,.16)+R(x-w/2,y-44*s,w,9*s,'#C8925A',4*s)+R(x-w/2,y-44*s,w,3*s,'#E8B884',2*s)
 +`<path d="M${n(x-w/2+14*s)} ${n(y-36*s)} V${n(y)} M${n(x+w/2-14*s)} ${n(y-36*s)} V${n(y)}" stroke="#8A5A30" stroke-width="${n(6*s)}" stroke-linecap="round"/>`;
 d+=`<g transform="translate(${n(x-w*.18)} ${n(y-50*s)})"><path d="M0 0 Q${n(-12*s)} ${n(-6*s)} ${n(-24*s)} ${n(-3*s)} V${n(5*s)} Q${n(-12*s)} ${n(2*s)} 0 ${n(7*s)}Z" fill="#FFFFFF" stroke="#7EC6F0" stroke-width="${n(1.4*s)}"/><path d="M0 0 Q${n(12*s)} ${n(-6*s)} ${n(24*s)} ${n(-3*s)} V${n(5*s)} Q${n(12*s)} ${n(2*s)} 0 ${n(7*s)}Z" fill="#FFFFFF" stroke="#7EC6F0" stroke-width="${n(1.4*s)}"/></g>`;
 if(lamp){const lx=x+w*.3;d+=`<path d="M${n(lx)} ${n(y-44*s)} V${n(y-76*s)}" stroke="#4E8A6A" stroke-width="${n(2.4*s)}"/><path d="M${n(lx-14*s)} ${n(y-74*s)} Q${n(lx)} ${n(y-96*s)} ${n(lx+14*s)} ${n(y-74*s)}Z" fill="#5AB88A"/><ellipse cx="${n(lx)}" cy="${n(y-44*s)}" rx="${n(10*s)}" ry="${n(3*s)}" fill="#4E8A6A"/><ellipse cx="${n(lx)}" cy="${n(y-46*s)}" rx="${n(30*s)}" ry="${n(6*s)}" fill="#FFF6C8" opacity=".55"/>`}
 return d}
function stool(x,y,s,c){return shd(x,y+2*s,14*s,3*s,.16)+`<path d="M${n(x-8*s)} ${n(y)} L${n(x-6*s)} ${n(y-20*s)} M${n(x+8*s)} ${n(y)} L${n(x+6*s)} ${n(y-20*s)}" stroke="#8A5A30" stroke-width="${n(3*s)}" stroke-linecap="round"/><ellipse cx="${n(x)}" cy="${n(y-22*s)}" rx="${n(14*s)}" ry="${n(5*s)}" fill="${c}"/><ellipse cx="${n(x)}" cy="${n(y-23.5*s)}" rx="${n(11*s)}" ry="${n(3*s)}" fill="${mixc(c,'#FFFFFF',.3)}"/>`}
function library(W,H,v='hall'){const {P,s}=sc(W,H);const g=uid('lb');let d='';
 if(v==='desk')return libDesk(W,H,s,P,g);
 if(v==='kids')return libKids(W,H,s,P,g);
 if(v==='out')return libOut(W,H,s,P,g);
 if(v==='aisle')return libAisle(W,H,s,P,g);
 const FY=H*(P?.7:.68);d+=libWall(W,H,s,g,FY);
 // 高書架（一整面牆）＋中間兩個拱窗
 const sw=(P?110:130)*s;const wins=P?[W*.5]:[W*.36,W*.64];
 for(let x=-400,i=0;x<W+400;x+=sw+6*s,i++){if(wins.some(wx=>Math.abs(x+sw/2-wx)<sw*.9))continue;d+=shelf(x,H*.1,sw,FY-H*.1,s,420+i*7,P?6:5)}
 wins.forEach((wx,k)=>{d+=`<ellipse cx="${n(wx)}" cy="${n(FY)}" rx="${n(sw*1.2)}" ry="${n(30*s)}" fill="url(#${g}sun)"/>`+archWin(wx-sw*.42,H*.08,sw*.84,FY-H*.2,s,20+k)});
 // 上面一排小燈
 for(let x=-400+40*s;x<W+400;x+=200*s)d+=`<path d="M${n(x)} 0 V${n(H*.05)}" stroke="#A8784A" stroke-width="${n(1.4*s)}"/><path d="M${n(x-12*s)} ${n(H*.07)} Q${n(x)} ${n(H*.03)} ${n(x+12*s)} ${n(H*.07)}Z" fill="#FFE9B0"/><ellipse cx="${n(x)}" cy="${n(H*.075)}" rx="${n(16*s)}" ry="${n(4*s)}" fill="#FFF6D0" opacity=".6"/>`;
 // 閱讀桌（左）、地球儀、盆栽
 d+=readTable(W*(P?.3:.22),FY+(P?60:44)*s,(P?150:190)*s,s)+stool(W*(P?.12:.1),FY+(P?70:56)*s,s,'#FF8A80')+stool(W*(P?.46:.34),FY+(P?72:58)*s,s,'#4FC4AE');
 if(!P)d+=plant(W*.95,FY+8*s,s*1.2);
 d+=T(W*(P?.86:.6),FY+(P?24:16)*s,s,`${shd(0,2,16,3.4,.14)}<path d="M-12 0 H12 L6 -8 H-6Z" fill="#A8784A"/><path d="M0 -8 V-14" stroke="#A8784A" stroke-width="3"/><circle cx="0" cy="-30" r="16" fill="#7EC6F0"/><path d="M-10 -38 Q-4 -42 2 -36 Q-2 -30 -8 -30Z M4 -24 Q10 -30 14 -22 Q8 -18 4 -24Z M-12 -24 Q-6 -20 -4 -16" fill="#8FD08A"/><path d="M-18 -30 A18 18 0 0 0 0 -12" stroke="#C8925A" stroke-width="2.4" fill="none"/><circle cx="-6" cy="-36" r="3" fill="#FFFFFF" opacity=".6"/>`);
 return d}
// 借書櫃台：櫃台、還書口、排隊的地線和小柱子、一台推車
function libDesk(W,H,s,P,g){const FY=H*(P?.7:.66);let d=libWall(W,H,s,g,FY);
 const sw=(P?110:130)*s;for(let x=-400,i=0;x<W+400;x+=sw+6*s,i++)d+=shelf(x,H*.06,sw,FY-H*.3,s,470+i*5,4);
 d+=R(-400,FY-H*.24,W+800,H*.24-30*s,'#F6E4C8');
 // 櫃台（左半邊；圓弧前板）
 const cx=W*(P?.4:.3),cw=(P?260:330)*s;
 d+=shd(cx,FY+44*s,cw*.56,10*s,.16)+`<path d="M${n(cx-cw/2)} ${n(FY+40*s)} V${n(FY-30*s)} H${n(cx+cw/2)} V${n(FY+40*s)}Z" fill="#C8925A"/>`+R(cx-cw/2-10*s,FY-40*s,cw+20*s,12*s,'#E8C08A',5*s)+R(cx-cw/2-10*s,FY-40*s,cw+20*s,3*s,'#FFE0B0',2*s);
 for(let k=0;k<5;k++)d+=R(cx-cw/2+10*s+k*cw/5,FY-22*s,cw/5-20*s,56*s,'#B07A44',6*s);
 // 還書口（一個小洞＋箭頭）、掃描機、一疊書、小鈴
 d+=R(cx+cw*.22,FY-6*s,60*s,12*s,'#5A3A1E',4*s)+iconSign(cx+cw*.22+30*s,FY+20*s,s*.8,'arrowD','#4FC4AE')+iconSign(cx+cw*.22+30*s,FY-24*s,s*.7,'book','#4FC4AE');
 d+=R(cx-cw*.3,FY-62*s,40*s,22*s,'#5A5C74',4*s)+R(cx-cw*.3+4*s,FY-58*s,32*s,12*s,'#8AE0D0',2*s)+R(cx-cw*.3+12*s,FY-40*s,16*s,4*s,'#5A5C74');
 d+=books(cx-cw*.05,FY-40*s,60*s,s,88,22).replace(/rect x/g,'rect transform="rotate(0)" x');
 [0,1,2].forEach(k=>d+=R(cx+cw*.06,FY-48*s-k*7*s,46*s,7*s,['#FF8A80','#FFCB4D','#7EC6F0'][k],2*s));
 // 排隊：地上一排腳印＋兩根小柱子拉繩
 d+=ropes(W*(P?.62:.62),W*(P?.94:.86),FY+(P?120:96)*s,s,'#4FC4AE','#A8AEC2');
 for(let k=0;k<3;k++)d+=T(W*(P?.56:.56)+k*40*s,FY+(P?80:64)*s+k*6*s,s,`<ellipse cx="-4" cy="0" rx="4" ry="6.6" fill="#FFCB4D" opacity=".75"/><ellipse cx="5" cy="2" rx="4" ry="6.6" fill="#FFCB4D" opacity=".75"/>`);
 // 牆上：小聲說話的圖示
 d+=iconSign(W*(P?.85:.66),FY-H*.13,s*1.3,'quiet','#7E8ED8');
 // 書推車（右後）
 const bx=W*(P?.8:.9),by=FY+20*s;d+=shd(bx,by+4*s,50*s,6*s,.16)+R(bx-46*s,by-60*s,92*s,8*s,'#7EC6F0',3*s)+R(bx-46*s,by-30*s,92*s,8*s,'#7EC6F0',3*s)+`<path d="M${n(bx-42*s)} ${n(by-60*s)} V${n(by-4*s)} M${n(bx+42*s)} ${n(by-60*s)} V${n(by-4*s)}" stroke="#5AA6D0" stroke-width="${n(4*s)}"/>`+books(bx-42*s,by-60*s,84*s,s,61,24)+books(bx-42*s,by-30*s,84*s,s,62,22)+`<circle cx="${n(bx-36*s)}" cy="${n(by)}" r="${n(5*s)}" fill="#5A5C74"/><circle cx="${n(bx+36*s)}" cy="${n(by)}" r="${n(5*s)}" fill="#5A5C74"/>`;
 return d}
// 繪本區：矮書架、圓地毯、軟墊、牆上的大樹貼紙
function libKids(W,H,s,P,g){const FY=H*(P?.66:.64);let d=libWall(W,H,s,g,FY).replace('#FFF4E2','#F0F7E6').replace('#F6E4C8','#E2EED2');
 // 牆上的大樹（貼紙）
 const tx=W*(P?.2:.16);d+=`<path d="M${n(tx-10*s)} ${n(FY-30*s)} Q${n(tx-6*s)} ${n(H*.3)} ${n(tx-2*s)} ${n(H*.22)} L${n(tx+10*s)} ${n(H*.22)} Q${n(tx+10*s)} ${n(H*.3)} ${n(tx+16*s)} ${n(FY-30*s)}Z" fill="#C89A6A"/>`;
 [[-50,.2,56,'#8FD08A'],[30,.16,60,'#7FC47A'],[-10,.08,64,'#9ADA92'],[60,.28,40,'#8FD08A'],[-70,.32,36,'#7FC47A']].forEach(([dx,ty,r,c])=>d+=`<circle cx="${n(tx+dx*s)}" cy="${n(H*ty+20*s)}" r="${n(r*s)}" fill="${c}" opacity=".9"/>`);
 [[-30,.18],[20,.12],[50,.26],[-60,.28],[0,.24]].forEach(([dx,ty],k)=>d+=`<circle cx="${n(tx+dx*s)}" cy="${n(H*ty+20*s)}" r="${n(6*s)}" fill="${['#FF8A80','#FFCB4D','#F48FB8'][k%3]}"/>`);
 d+=`<path d="M${n(tx+70*s)} ${n(H*.1)} q${n(6*s)} ${n(-6*s)} ${n(12*s)} 0 q${n(6*s)} ${n(-6*s)} ${n(12*s)} 0" stroke="#5A8AD8" stroke-width="${n(2*s)}" fill="none"/>`;
 // 牆上一排展示架（繪本封面朝外）
 const rx=W*(P?.38:.34),rw=W*(P?.6:.62);
 for(let k=0;k<2;k++){const y=H*(.16+k*.2);d+=R(rx,y+44*s,rw,6*s,'#C8925A',2*s);
  for(let i=0;i<(P?4:7);i++){const bx=rx+10*s+i*(rw-20*s)/(P?4:7),bw=40*s,bh=48*s;const c=BKC[(i+k*3)%BKC.length];
   d+=R(bx,y-4*s,bw,bh,c,3*s)+R(bx+4*s,y+2*s,bw-8*s,bh*.55,'#FFFFFF',2*s,' opacity=".85"')+`<circle cx="${n(bx+bw/2)}" cy="${n(y+14*s)}" r="${n(7*s)}" fill="${BKC[(i+k*3+4)%BKC.length]}"/>`+R(bx,y-4*s,4*s,bh,mixc(c,'#000000',.2),2*s)}}
 // 矮書架（前面）
 d+=shelf(W*(P?.04:.36),FY-50*s,(P?140:200)*s,80*s,s,512,2,{faceout:1,wood:['#FFD08A','#E8A85A','#C8863A']});
 // 圓地毯＋軟墊（豆豆沙發）
 const rcx=W*(P?.5:.46),rcy=FY+(P?120:90)*s;d+=`<ellipse cx="${n(rcx)}" cy="${n(rcy)}" rx="${n((P?150:230)*s)}" ry="${n((P?40:44)*s)}" fill="#FFCFC4"/><ellipse cx="${n(rcx)}" cy="${n(rcy)}" rx="${n((P?120:190)*s)}" ry="${n((P?30:34)*s)}" fill="none" stroke="#FFFFFF" stroke-width="${n(4*s)}" stroke-dasharray="${n(10*s)} ${n(8*s)}"/>`;
 const bean=(x,y,c)=>shd(x,y+4*s,30*s,6*s,.16)+`<path d="M${n(x-30*s)} ${n(y)} Q${n(x-34*s)} ${n(y-40*s)} ${n(x)} ${n(y-44*s)} Q${n(x+34*s)} ${n(y-40*s)} ${n(x+30*s)} ${n(y)} Q${n(x)} ${n(y+8*s)} ${n(x-30*s)} ${n(y)}Z" fill="${c}"/><path d="M${n(x-20*s)} ${n(y-30*s)} Q${n(x-8*s)} ${n(y-40*s)} ${n(x+6*s)} ${n(y-38*s)}" stroke="#FFFFFF" stroke-width="${n(3*s)}" fill="none" opacity=".45" stroke-linecap="round"/>`;
 d+=bean(W*(P?.16:.12),FY+(P?100:80)*s,'#7EC6F0')+bean(W*(P?.82:.7),FY+(P?100:72)*s,'#FFCB4D');
 // 地毯上的書和小積木
 d+=T(rcx-40*s,rcy-6*s,s,`<path d="M0 0 Q-10 -5 -20 -2 V6 Q-10 3 0 8Z M0 0 Q10 -5 20 -2 V6 Q10 3 0 8Z" fill="#FFFFFF" stroke="#FF8A80" stroke-width="1.4"/>`);
 return d}
// 書架走道（號碼一樣的顏色貼紙排在一起；梯子）
function libAisle(W,H,s,P,g){const FY=H*(P?.74:.76);let d=libWall(W,H,s,g,FY);
 const sw=(P?150:180)*s;for(let x=-400,i=0;x<W+400;x+=sw+10*s,i++){d+=shelf(x,H*.04,sw,FY-H*.04,s,600+i*13,P?7:6);
  // 書背上的顏色小貼紙（照顏色排）
  for(let r=0;r<(P?7:6);r++){const by=H*.04+5*s+(FY-H*.04-8*s)/(P?7:6)*(r+1)-12*s;d+=`<path d="M${n(x+10*s)} ${n(by)} H${n(x+sw-10*s)}" stroke="${BKC[(i+r)%BKC.length]}" stroke-width="${n(3*s)}" stroke-dasharray="${n(2*s)} ${n(6*s)}" opacity=".9"/>`}}
 // 梯子
 const lx=W*(P?.12:.18);d+=`<path d="M${n(lx)} ${n(FY+10*s)} L${n(lx+30*s)} ${n(H*.18)} M${n(lx+40*s)} ${n(FY+10*s)} L${n(lx+64*s)} ${n(H*.18)}" stroke="#A8784A" stroke-width="${n(5*s)}" stroke-linecap="round"/>`;for(let k=1;k<7;k++){const t=k/7;d+=`<path d="M${n(lx+30*s*t)} ${n(FY+10*s+(H*.18-FY-10*s)*t)} H${n(lx+40*s+24*s*t)}" stroke="#C8925A" stroke-width="${n(4*s)}" stroke-linecap="round"/>`}
 d+=shd(lx+20*s,FY+12*s,40*s,6*s,.14);
 // 地上：一台空的小推車
 d+=`<ellipse cx="${n(W*.5)}" cy="${n(FY+(H-FY)*.5)}" rx="${n(W*.5)}" ry="${n(10*s)}" fill="#FFFFFF" opacity=".14"/>`;
 return d}
// 開場：圖書館外面（大玻璃門、台階、樹、腳踏車架、還書箱）
function libOut(W,H,s,P,g){let d=`<defs>${skyDay(g+'s')}${lg(g+'b',[[0,'#F4E6CE'],[1,'#E4CFAE']])}${lg(g+'gl',[[0,'#A8D8EE'],[1,'#7EB8DA']])}${lg(g+'gr',[[0,'#9AD07A'],[1,'#6FAE58']])}</defs>`;
 const GY=H*(P?.72:.74);d+=R(-400,0,W+800,H,`url(#${g}s)`)+`<g${A('rd4dr',0,14)}>${cloud(W*.15,H*.12,s*.8)}${cloud(W*.8,H*.08,s*.6,'#FFFFFF',.9)}</g>`;
 d+=city(-400,W+400,GY-30*s,s*.9,42,['#D6E0F2','#C8D4EC']);
 // 建築（中間偏左，大大的一棟）
 const bx=W*(P?.02:.08),bw=W*(P?.96:.62),by=H*(P?.2:.14);
 d+=R(bx,by,bw,GY-by,`url(#${g}b)`,6*s)+R(bx-10*s,by-12*s,bw+20*s,18*s,'#C8925A',5*s)+R(bx-10*s,by-12*s,bw+20*s,5*s,'#E8B884',3*s);
 // 屋頂上一本打開的書（招牌只有圖）
 d+=T(bx+bw/2,by-24*s,s*1.4,`<path d="M0 0 Q-16 -8 -32 -4 V10 Q-16 6 0 12Z" fill="#FFFFFF" stroke="#7E8ED8" stroke-width="2"/><path d="M0 0 Q16 -8 32 -4 V10 Q16 6 0 12Z" fill="#FFFFFF" stroke="#7E8ED8" stroke-width="2"/><path d="M-26 0 H-6 M-26 5 H-8 M6 0 H26 M8 5 H26" stroke="#C9D8F0" stroke-width="1.6"/><path d="${star5(0,-18,7)}" fill="${C7.gold}"/>`);
 // 一排大窗
 const nw=P?4:6;for(let k=0;k<nw;k++){const wx=bx+20*s+k*(bw-40*s)/nw,ww=(bw-40*s)/nw-14*s;d+=R(wx,by+24*s,ww,(GY-by)*.34,`url(#${g}gl)`,4*s)+`<path d="M${n(wx+ww*.2)} ${n(by+24*s)} L${n(wx+ww*.45)} ${n(by+24*s)} L${n(wx+ww*.25)} ${n(by+24*s+(GY-by)*.34)} L${n(wx)} ${n(by+24*s+(GY-by)*.34)}Z" fill="#FFFFFF" opacity=".3"/>`+books(wx+4*s,by+24*s+(GY-by)*.34-2*s,ww-8*s,s*.8,700+k,26)}
 // 大門（中間）＋台階
 const dx=bx+bw/2,dw=(P?110:130)*s,dt=GY-(P?130:140)*s;
 d+=R(dx-dw/2-10*s,dt-10*s,dw+20*s,GY-dt+10*s,'#C8925A',8*s)+R(dx-dw/2,dt,dw,GY-dt,`url(#${g}gl)`,4*s)+`<path d="M${n(dx)} ${n(dt)} V${n(GY)}" stroke="#E8F6FF" stroke-width="${n(3*s)}"/><circle cx="${n(dx-6*s)}" cy="${n(dt+(GY-dt)*.55)}" r="${n(2.4*s)}" fill="#FFFFFF"/><circle cx="${n(dx+6*s)}" cy="${n(dt+(GY-dt)*.55)}" r="${n(2.4*s)}" fill="#FFFFFF"/>`;
 // 地面
 d+=R(-400,GY,W+800,H-GY+10,`url(#${g}gr)`)+R(-400,GY,W+800,12*s,'#E4D8C4');
 for(let k=0;k<3;k++)d+=R(dx-dw/2-30*s-k*16*s,GY+k*10*s,dw+60*s+k*32*s,10*s,['#EDE2CE','#E4D6BE','#DACAAE'][k],2*s);
 d+=`<path d="M${n(dx-dw)} ${n(H)} L${n(dx-dw/2-60*s)} ${n(GY+30*s)} H${n(dx+dw/2+60*s)} L${n(dx+dw)} ${n(H)}Z" fill="#E8DCC6"/>`;
 // 樹、還書箱、腳踏車架
 d+=atree(W*(P?.1:.03),GY+10*s,s*1.3,0)+atree(W*(P?.92:.76),GY+6*s,s*1.1,2);
 const rbx=W*(P?.2:.24);d+=shd(rbx,GY+24*s,24*s,5*s,.18)+R(rbx-22*s,GY-36*s,44*s,60*s,'#7E8ED8',8*s)+R(rbx-16*s,GY-26*s,32*s,6*s,'#2A2A4A',3*s)+R(rbx-22*s,GY-36*s,44*s,8*s,'#9AA8E8',6*s)+iconSign(rbx,GY,s*.7,'book','#5A6AB8');
 if(!P){const kx=W*.9;for(let k=0;k<4;k++)d+=`<path d="M${n(kx+k*16*s)} ${n(GY+30*s)} V${n(GY+10*s)} Q${n(kx+k*16*s+6*s)} ${n(GY+2*s)} ${n(kx+k*16*s+12*s)} ${n(GY+10*s)} V${n(GY+30*s)}" stroke="#A8AEC2" stroke-width="${n(3*s)}" fill="none"/>`}
 const r=rng(42);for(let i=0;i<26;i++)d+=leafS(-200+r()*(W+400),GY+20*s+r()*(H-GY-20*s),s*1.2,ATC[i%4][0],Math.round(r()*180));
 return d}

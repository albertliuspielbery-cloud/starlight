
/* ===================== 41 搭捷運進城（虛構的「星光捷運」：白色車身、薄荷綠＋珊瑚粉腰帶、金色小星星；沒有字、沒有真實路線色和標誌） ===================== */
// 列車側面：x 左邊、y 車頂、len 長度、h 車身高；o.door＝門的位置（0～1）陣列，o.open＝打開的門
function trainSide(x,y,len,h,s,o={}){const g=uid('tr');const doors=o.door||[.12,.5,.88];
 let d=`<defs>${lg(g,[[0,'#FFFFFF'],[.55,'#F2F4FA'],[1,'#D6DAE8']])}${lg(g+'w',[[0,'#3E4E7A'],[.5,'#5A6E9E'],[1,'#7A8EBE']])}${lg(g+'i',[[0,'#FFFBEA'],[1,'#F2E6C8']])}</defs>`;
 d+=R(x,y,len,h,`url(#${g})`,h*.12)+R(x,y-h*.06,len,h*.08,'#C8CCDA',h*.04);
 d+=R(x,y+h*.66,len,h*.1,C7.mint)+R(x,y+h*.78,len,h*.04,C7.coral)+R(x,y+h*.88,len,h*.12,'#B8BCCC',h*.06);
 // 窗戶（門和門之間）
 const dw=h*.42;const segs=[0,...doors.map(t=>x+len*t),x+len];
 for(let i=0;i<doors.length+1;i++){const a=i?x+len*doors[i-1]+dw/2+h*.1:x+h*.18,b=i<doors.length?x+len*doors[i]-dw/2-h*.1:x+len-h*.18;if(b-a<h*.3)continue;
  d+=R(a,y+h*.16,b-a,h*.38,`url(#${g}w)`,h*.06)+`<path d="M${n(a+(b-a)*.15)} ${n(y+h*.16)} L${n(a+(b-a)*.32)} ${n(y+h*.16)} L${n(a+(b-a)*.2)} ${n(y+h*.54)} L${n(a+(b-a)*.03)} ${n(y+h*.54)}Z" fill="#FFFFFF" opacity=".22"/>`
  +`<path d="M${n(a)} ${n(y+h*.16)} H${n(b)}" stroke="#2A3458" stroke-width="${n(h*.02)}" opacity=".5"/>`}
 // 門
 doors.forEach((t,k)=>{const cx=x+len*t;const op=o.open&&o.open.includes(k);
  if(op){d+=R(cx-dw/2,y+h*.08,dw,h*.84,`url(#${g}i)`,h*.03)+R(cx-dw/2,y+h*.08,dw,h*.06,'#E8DCC0')
   +`<path d="M${n(cx-dw*.1)} ${n(y+h*.1)} V${n(y+h*.9)} M${n(cx+dw*.1)} ${n(y+h*.1)} V${n(y+h*.9)}" stroke="#C8CCDA" stroke-width="${n(h*.03)}" stroke-linecap="round"/>`
   +R(cx-dw/2,y+h*.86,dw,h*.06,'#C8C0AE')+R(cx-dw/2-h*.1,y+h*.08,h*.1,h*.84,'#E4E6F0',h*.02)+R(cx+dw/2,y+h*.08,h*.1,h*.84,'#E4E6F0',h*.02)}
  else{d+=R(cx-dw/2,y+h*.08,dw,h*.84,'#E9ECF4',h*.03)+`<path d="M${n(cx)} ${n(y+h*.08)} V${n(y+h*.92)}" stroke="#B8BCCC" stroke-width="${n(h*.015)}"/>`
   +[cx-dw*.27,cx+dw*.27].map(wx=>R(wx-dw*.15,y+h*.16,dw*.3,h*.38,`url(#${g}w)`,h*.04)).join('')+R(cx-dw/2,y+h*.66,dw,h*.1,mixc(C7.mint,'#FFFFFF',.2))}
  d+=`<circle cx="${n(cx)}" cy="${n(y+h*.04)}" r="${n(h*.025)}" fill="${op?'#FF7A5A':'#FFD27A'}"${op?A('rd4tw',0,.9):''}/>`});
 // 車頭方向的小星星標誌
 if(o.emblem!==0)d+=`<circle cx="${n(x+len*.31)}" cy="${n(y+h*.71)}" r="${n(h*.09)}" fill="#FFFFFF"/><path d="${star5(x+len*.31,y+h*.71,h*.07)}" fill="${C7.gold}"/>`;
 return d}
// 月台門（玻璃）一整排：y 上緣、FY 地面；open＝打開的那一組門
function psd(W,y,FY,s,open=-1,unit=180){let d='';const u=unit*s;const N=Math.ceil((W+800)/u)+1;
 for(let i=0;i<N;i++){const x=-400+i*u;const dx=x+u*.3,dw=u*.4;
  // 固定玻璃
  d+=R(x+u*.02,y,u*.26,FY-y,'#DDF2FA',0,' opacity=".28"')+R(x+u*.72,y,u*.26,FY-y,'#DDF2FA',0,' opacity=".28"');
  if(i===open){d+=R(dx-dw*.46,y,dw*.48,FY-y,'#DDF2FA',0,' opacity=".32"')+R(dx+dw*.98,y,dw*.48,FY-y,'#DDF2FA',0,' opacity=".32"')}
  else d+=R(dx,y,dw/2-1*s,FY-y,'#DDF2FA',0,' opacity=".3"')+R(dx+dw/2+1*s,y,dw/2-1*s,FY-y,'#DDF2FA',0,' opacity=".3"')+`<path d="M${n(dx+dw*.5)} ${n(y)} V${n(FY)}" stroke="#AEB6C8" stroke-width="${n(2*s)}"/>`;
  // 玻璃反光
  d+=`<path d="M${n(x+u*.06)} ${n(FY-8*s)} L${n(x+u*.16)} ${n(y+8*s)} M${n(x+u*.1)} ${n(FY-8*s)} L${n(x+u*.18)} ${n(y+30*s)}" stroke="#FFFFFF" stroke-width="${n(3*s)}" opacity=".45"/>`;
  // 框
  d+=`<path d="M${n(x)} ${n(y)} V${n(FY)} M${n(dx)} ${n(y)} V${n(FY)} M${n(dx+dw)} ${n(y)} V${n(FY)}" stroke="#AEB6C8" stroke-width="${n(5*s)}"/>`;
  d+=R(x,FY-12*s,u,12*s,'#C8CEDC')+R(x,FY-12*s,u,3*s,'#E8ECF4');
  // 門上的燈
  d+=R(dx+dw/2-9*s,y-14*s,18*s,7*s,'#3A3E56',2*s)+`<circle cx="${n(dx+dw/2)}" cy="${n(y-10.5*s)}" r="${n(2.4*s)}" fill="${i===open?'#FF7A5A':'#8AF0B0'}"${i===open?A('rd4tw',0,.9):''}/>`}
 return d}
function metro(W,H,v='platform'){const {P,s}=sc(W,H);const g=uid('mt');let d='';
 const FY=H*(P?.74:.72);
 if(v==='car')return metroCar(W,H,s,P,g);
 if(v==='gate')return metroGate(W,H,s,P,g);
 if(v==='map')return metroMap(W,H,s,P,g);
 d+=`<defs>${lg(g+'cl',[[0,'#E6E2EE'],[1,'#F4F2F8']])}${lg(g+'tn',[[0,'#24263A'],[.5,'#3A3C52'],[1,'#4A4C64']])}${lg(g+'fl',[[0,'#D8D8E2'],[1,'#B6B6C8']])}${rg(g+'gl',[[0,'#FFFDF0',.9],[1,'#FFFDF0',0]])}</defs>`;
 // 天花板、軌道那一邊的隧道牆（暗一點，列車停在月台門後面）
 d+=R(-400,0,W+800,H*.14,`url(#${g}cl)`);
 for(let x=-400;x<W+400;x+=150*s)d+=lightBar(x+20*s,H*.05,110*s,s);
 d+=R(-400,H*.14,W+800,FY-H*.14,`url(#${g}tn)`);
 const TY=H*(P?.31:.29),TH=(FY-TY)*.93;const U=180*s,NU=Math.ceil((W+800)/U);
 const op=v==='door'?Math.floor((400+W*.5)/U):-1;
 d+=trainSide(-400,TY,W+800,TH,s,{door:Array.from({length:NU},(_,i)=>(i*U+U*.5)/(W+800)),open:op>=0?[op]:[],emblem:0});
 d+=R(-400,TY-2*s,W+800,TH*.2,'#1E2034',0,' opacity=".25"');
 // 月台門上方的橫樑（淡紫＋薄荷），上面有到站顯示燈（只有亮點，沒有字）
 d+=R(-400,H*.14,W+800,H*.11,'#5E5C7E')+R(-400,H*.235,W+800,H*.018,C7.mint)+R(-400,H*.14,W+800,3*s,'#8A88AA');
 for(let i=0;i<NU;i++){const cx=-400+i*U+U*.5;if(cx<-80||cx>W+80)continue;d+=R(cx-30*s,H*.165,60*s,H*.045,'#2A2C40',4*s);for(let k=0;k<6;k++)d+=`<circle cx="${n(cx-20*s+k*8*s)}" cy="${n(H*.1875)}" r="${n(2*s)}" fill="${k<4?'#8AF0B0':'#3A4A50'}" opacity=".9"/>`}
 // 月台門
 d+=psd(W,H*.255+10*s,FY,s,op);
 if(op>=0){// 打開的門：列車地板、月台和車廂中間的空隙（發亮的提醒線）
  const cx=-400+op*U+U*.5,dw=U*.4;
  d+=R(cx-dw*.5,FY-24*s,dw,6*s,'#C8C0AE')+R(cx-dw*.5,FY-18*s,dw,5*s,'#1A1A28')+`<path d="M${n(cx-dw*.5)} ${n(FY-15.5*s)} H${n(cx+dw*.5)}"${A('rd4tw',0,1.1)} stroke="#FFE27A" stroke-width="${n(2.4*s)}" stroke-linecap="round"/>`;
  d+=`<ellipse cx="${n(cx)}" cy="${n(H*.27)}" rx="${n(70*s)}" ry="${n(26*s)}" fill="url(#${g}gl)" opacity=".7"/>`;
  [-1,1].forEach(k=>{d+=`<g${A('rd4tw',k>0?.45:0,.9)}><path d="M${n(cx+k*(dw*.5+16*s))} ${n(H*.33)} l${n(k*10*s)} ${n(-6*s)} M${n(cx+k*(dw*.5+16*s))} ${n(H*.36)} l${n(k*12*s)} 0 M${n(cx+k*(dw*.5+16*s))} ${n(H*.39)} l${n(k*10*s)} ${n(6*s)}" stroke="#FFE27A" stroke-width="${n(2.6*s)}" stroke-linecap="round"/></g>`})}
 // 地板（往前有一點透視的磁磚線）
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}fl)`);
 d+=R(-400,FY,W+800,4*s,'#9A9AB0');
 for(let x=-400;x<W+400;x+=60*s)d+=`<path d="M${n(x)} ${n(FY+20*s)} L${n(x+(x-W/2)*.35)} ${H}" stroke="#C4C4D2" stroke-width="${n(1*s)}" opacity=".8"/>`;
 [.45,.7].forEach(t=>d+=`<path d="M-400 ${n(FY+(H-FY)*t)} H${W+400}" stroke="#C4C4D2" stroke-width="${n(1*s)}" opacity=".8"/>`);
 // 導盲磚（黃色一排）＋候車排隊的線（門兩邊各一條綠色箭頭，沒有字）
 d+=R(-400,FY+8*s,W+800,10*s,'#F2C94A');for(let x=-400;x<W+400;x+=8*s)d+=`<circle cx="${n(x)}" cy="${n(FY+13*s)}" r="${n(1.4*s)}" fill="#D8A82E"/>`;
 for(let i=0;i<NU;i++){const cx=-400+i*U+U*.5;if(cx<-60||cx>W+60)continue;
  [-1,1].forEach(sd=>{const bx=cx+sd*46*s,by=FY+70*s;d+=`<path d="M${n(bx)} ${n(by)} L${n(bx-sd*10*s)} ${n(FY+30*s)}" stroke="#5CC07A" stroke-width="${n(6*s)}" stroke-linecap="round" opacity=".8"/><path d="M${n(bx-sd*10*s-8*s)} ${n(FY+36*s)} L${n(bx-sd*10*s)} ${n(FY+24*s)} L${n(bx-sd*10*s+8*s)} ${n(FY+36*s)}" stroke="#5CC07A" stroke-width="${n(5*s)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>`});
  d+=`<path d="M${n(cx-18*s)} ${n(FY+30*s)} L${n(cx+18*s)} ${n(FY+30*s)}" stroke="#FF8A80" stroke-width="${n(4*s)}" stroke-linecap="round" opacity=".7"/>`}
 // 地板反光
 for(let x=-400;x<W+400;x+=150*s)d+=`<ellipse cx="${n(x+75*s)}" cy="${n(FY+(H-FY)*.58)}" rx="${n(50*s)}" ry="${n(6*s)}" fill="#FFFFFF" opacity=".25"/>`;
 // 柱子（左右）＋吊牌＋時鐘
 const pil=(x)=>`<defs>${lg(g+'p'+Math.round(x),[[0,'#DCDCE8'],[.45,'#FFFFFF'],[1,'#BEBED0']],1,0)}</defs>`+R(x-16*s,H*.12,32*s,FY-H*.12+30*s,`url(#${g}p${Math.round(x)})`)+R(x-16*s,H*.42,32*s,10*s,C7.coral)+R(x-16*s,H*.44,32*s,3*s,'#FFFFFF',0,' opacity=".6"')+shd(x,FY+30*s,24*s,4*s,.14);
 d+=pil(W*(P?.05:.04))+pil(W*(P?.95:.97));
 d+=hangSign(W*(P?.3:.24),H*.14,s*(P?.8:1),['train','arrowR','exit','arrowL']);
 d+=clock(W*(P?.95:.97),H*.36,13*s,10,0);
 // 左邊的長椅
 d+=bench(W*(P?.02:.07),FY+(P?70:56)*s,(P?80:100)*s,s,'#9A88D8');
 if(v==='open'){}
 return d}
// 車廂內：對面的座位、窗外的城市、扶手和拉環、車門上的路線小燈
function metroCar(W,H,s,P,g){let d=`<defs>${lg(g+'wl',[[0,'#F6F4EE'],[1,'#E8E4DA']])}${lg(g+'fl',[[0,'#BDB8C8'],[1,'#9E98AE']])}${lg(g+'pl',[[0,'#B8C0D0'],[.5,'#FFFFFF'],[1,'#A8B0C4']],1,0)}${lg(g+'st',[[0,'#7EC6E8'],[1,'#5AA6D0']])}${lg(g+'st2',[[0,'#B9A8F0'],[1,'#9A86E0']])}</defs>`;
 const FY=H*(P?.74:.76);
 d+=R(-400,0,W+800,H,`url(#${g}wl)`);
 // 天花板＋燈＋廣告框（畫的是星光美術館的畫，沒有字）
 d+=R(-400,0,W+800,H*.1,'#EDEAE2')+R(-400,H*.1,W+800,3*s,'#D6D0C2');for(let x=-400;x<W+400;x+=220*s)d+=lightBar(x+30*s,H*.03,160*s,s);
 // 窗戶（一整排）
 const wy=H*(P?.2:.17),wh=H*(P?.22:.28);
 for(let x=-400+40*s,i=0;x<W+400;x+=230*s,i++){d+=cityWin(x,wy,190*s,wh,s,'#D8D4CC',30+i,{r:14,fw:7,cross:0,notree:1});
  d+=`<g${A('rd4dr',i%3,9)}>${R(x+20*s,wy+wh*.7,60*s,3*s,'#FFFFFF',1*s,' opacity=".35"')}</g>`}
 // 座位（長椅；右邊靠近主角的那一段是博愛座，深一點的顏色）
 const sy=FY-H*(P?.16:.2);
 d+=R(-400,sy-12*s,W+800,12*s,'#DCD6CA');
 for(let x=-400+20*s,i=0;x<W+400;x+=230*s,i++){const pri=i%3===2;
  d+=R(x,sy,200*s,26*s,`url(#${g}${pri?'st2':'st'})`,8*s)+R(x,sy+22*s,200*s,10*s,mixc(pri?'#9A86E0':'#5AA6D0','#000000',.2),5*s);
  for(let k=1;k<4;k++)d+=`<path d="M${n(x+k*50*s)} ${n(sy+3*s)} V${n(sy+22*s)}" stroke="#FFFFFF" stroke-width="${n(1.4*s)}" opacity=".45"/>`;
  d+=R(x-6*s,sy-60*s,8*s,90*s,'#C8C4BA',3*s);
  if(pri)d+=iconSign(x+100*s,sy-36*s,s*.8,'heart','#9A86E0')}
 d+=R(-400,sy+32*s,W+800,FY-sy-32*s,'#D6D0C4');
 // 地板
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}fl)`);const r=rng(41);for(let i=0;i<90;i++)d+=`<circle cx="${n(-400+r()*(W+800))}" cy="${n(FY+r()*(H-FY))}" r="${n(.9*s)}" fill="#FFFFFF" opacity=".3"/>`;
 d+=`<ellipse cx="${n(W*.5)}" cy="${n(FY+(H-FY)*.5)}" rx="${n(W*.6)}" ry="${n(16*s)}" fill="#FFFFFF" opacity=".16"/>`;
 // 車門（左）＋門上的路線小燈（一排點，現在這站在發亮）
 const dx=W*(P?.1:.1),dw=(P?80:110)*s;
 d+=R(dx-dw/2-6*s,H*.11,dw+12*s,FY-H*.11,'#C8CCDA',8*s)+R(dx-dw/2,H*.12,dw,FY-H*.12,'#E8EAF2',6*s)+cityWin(dx-dw/2+6*s,H*.18,dw/2-9*s,H*.3,s*.6,'#D8DCE6',51,{cross:0,fw:3,notree:1})+cityWin(dx+3*s,H*.18,dw/2-9*s,H*.3,s*.6,'#D8DCE6',52,{cross:0,fw:3,notree:1})+`<path d="M${n(dx)} ${n(H*.12)} V${n(FY)}" stroke="#B0B4C4" stroke-width="${n(2*s)}"/>`;
 d+=R(dx-dw/2,FY-6*s,dw,6*s,'#F2C94A');
 const ly=H*.115;d+=R(dx-70*s,ly-8*s,140*s,16*s,'#3A3E56',4*s)+`<path d="M${n(dx-60*s)} ${n(ly)} H${n(dx+60*s)}" stroke="${C7.mint}" stroke-width="${n(2.4*s)}"/>`;
 for(let k=0;k<7;k++){const xx=dx-60*s+k*20*s;d+=`<circle cx="${n(xx)}" cy="${n(ly)}" r="${n(3*s)}" fill="${k<3?'#8A8EA8':k===3?'#FFE27A':'#FFFFFF'}"${k===3?A('rd4tw',0,1.2):''}/>`}
 // 直立扶手、橫桿和拉環
 d+=R(-400,H*.13,W+800,4*s,`url(#${g}pl)`);
 for(let x=-400+130*s;x<W+400;x+=190*s){d+=`<path d="M${n(x)} ${n(H*.15)} V${n(H*.24)}" stroke="#A8B0C4" stroke-width="${n(1.6*s)}"/><path d="M${n(x-6*s)} ${n(H*.24)} Q${n(x)} ${n(H*.3)} ${n(x+6*s)} ${n(H*.24)}Z" fill="none" stroke="${C7.coral}" stroke-width="${n(3*s)}"/>`;
  d+=`<path d="M${n(x+60*s)} ${n(H*.15)} V${n(H*.24)}" stroke="#A8B0C4" stroke-width="${n(1.6*s)}"/><path d="M${n(x+54*s)} ${n(H*.24)} Q${n(x+60*s)} ${n(H*.3)} ${n(x+66*s)} ${n(H*.24)}Z" fill="none" stroke="${C7.coral}" stroke-width="${n(3*s)}"/>`}
 [W*(P?.3:.3),W*(P?.9:.78)].forEach(x=>{d+=R(x-4*s,H*.13,8*s,FY-H*.13,`url(#${g}pl)`,4*s)+shd(x,FY+2*s,12*s,3*s,.16)});
 return d}
// 車站大廳：手扶梯（往下到月台）、閘門、售票機（沒有字、沒有卡片品牌）
function metroGate(W,H,s,P,g){let d=`<defs>${lg(g+'wl',[[0,'#F2EFE8'],[1,'#E4DFD4']])}${lg(g+'fl',[[0,'#D9D6E0'],[1,'#BCB8C8']])}${lg(g+'gt',[[0,'#B9ACF2'],[1,'#8C7CD8']])}${lg(g+'gl',[[0,'#E6F6FF',.7],[1,'#BFE6F8',.35]],1,0)}${rg(g+'sc',[[0,'#BFF6E8'],[1,'#5AC8B0']])}</defs>`;
 const FY=H*(P?.66:.62);
 d+=R(-400,0,W+800,FY,`url(#${g}wl)`);
 // 牆上的磁磚格線、腰帶
 for(let x=-400;x<W+400;x+=40*s)d+=`<path d="M${n(x)} ${n(H*.12)} V${n(FY)}" stroke="#D8D2C4" stroke-width="${n(1*s)}"/>`;
 for(let y=H*.12;y<FY;y+=40*s)d+=`<path d="M-400 ${n(y)} H${W+400}" stroke="#D8D2C4" stroke-width="${n(1*s)}"/>`;
 d+=R(-400,FY-60*s,W+800,12*s,C7.mint)+R(-400,FY-48*s,W+800,4*s,C7.coral);
 d+=R(-400,0,W+800,H*.12,'#E8E4DC');for(let x=-400;x<W+400;x+=160*s)d+=lightBar(x+20*s,H*.04,110*s,s);
 // 地板
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}fl)`);for(let x=-400;x<W+400;x+=60*s)d+=`<path d="M${n(x)} ${n(FY)} L${n(x+(x-W/2)*.3)} ${H}" stroke="#C8C4D2" stroke-width="${n(1*s)}" opacity=".7"/>`;
 d+=`<ellipse cx="${n(W*.55)}" cy="${n(FY+(H-FY)*.4)}" rx="${n(W*.4)}" ry="${n(10*s)}" fill="#FFFFFF" opacity=".25"/>`;
 // 手扶梯（左邊，從正面看：一階一階往上，兩邊黑色扶手帶、玻璃扶手板，上面是亮亮的出口）
 const ecx=W*(P?.2:.15),eb=FY+(P?70:66)*s,et=H*(P?.2:.13),wb=(P?100:130)*s,wt=(P?50:64)*s;
 const ex=(t,k)=>ecx+k*(wb+(wt-wb)*t)/2,ey=t=>eb+(et-eb)*t;
 d+=`<defs>${lg(g+'ex',[[0,'#FFFBE8'],[1,'#FFE9B0']])}${lg(g+'st',[[0,'#8C92A8'],[1,'#B8BCCC']])}</defs>`;
 d+=R(ex(1,-1)-20*s,et-34*s,wt+40*s,40*s,`url(#${g}ex)`,6*s)+`<path d="M${n(ex(1,-1)-20*s)} ${n(et-34*s)} h${n(wt+40*s)}" stroke="#E8DCC4" stroke-width="${n(4*s)}"/>`;
 d+=`<path d="M${n(ex(0,-1))} ${n(eb)} L${n(ex(1,-1))} ${n(et)} L${n(ex(1,1))} ${n(et)} L${n(ex(0,1))} ${n(eb)}Z" fill="url(#${g}st)"/>`;
 for(let k=0;k<14;k++){const t=1-Math.pow(1-k/14,1.35),t2=1-Math.pow(1-(k+1)/14,1.35);
  d+=`<path d="M${n(ex(t,-1))} ${n(ey(t))} L${n(ex(t,1))} ${n(ey(t))}" stroke="#F2C94A" stroke-width="${n(Math.max(1,(3-t*2)*s))}"/>`;
  for(let q=-3;q<=3;q++){const xa=ecx+q/4*(wb+(wt-wb)*t)/2,xb=ecx+q/4*(wb+(wt-wb)*t2)/2;d+=`<path d="M${n(xa)} ${n(ey(t)-1*s)} L${n(xb)} ${n(ey(t2)+1*s)}" stroke="#6E748A" stroke-width="${n(.8*s)}" opacity=".6"/>`}}
 // 兩邊扶手板（玻璃）＋扶手帶
 [-1,1].forEach(k=>{const o=k*16*s,o2=k*8*s;
  d+=`<path d="M${n(ex(0,k))} ${n(eb)} L${n(ex(1,k))} ${n(et)} L${n(ex(1,k)+o2)} ${n(et-30*s)} L${n(ex(0,k)+o)} ${n(eb-60*s)}Z" fill="url(#${g}gl)" stroke="#C0D2DE" stroke-width="${n(1.2*s)}"/>`;
  d+=`<path d="M${n(ex(0,k)+o)} ${n(eb-60*s)} Q${n(ex(0,k)+o+k*4*s)} ${n(eb-44*s)} ${n(ex(0,k)+o*.9)} ${n(eb-36*s)} M${n(ex(0,k)+o)} ${n(eb-60*s)} L${n(ex(1,k)+o2)} ${n(et-30*s)}" stroke="#2A2A3A" stroke-width="${n(6*s)}" fill="none" stroke-linecap="round"/>`;
  d+=`<path d="M${n(ex(0,k)+o-k*2*s)} ${n(eb-62*s)} L${n(ex(1,k)+o2-k*1*s)} ${n(et-31*s)}" stroke="#7A7A92" stroke-width="${n(1.2*s)}"/>`;
  d+=`<path d="M${n(ex(0,k))} ${n(eb)} L${n(ex(0,k)+o*1.1)} ${n(eb)} L${n(ex(0,k)+o*1.1)} ${n(eb-36*s)} L${n(ex(0,k)+o)} ${n(eb-38*s)}Z" fill="#A8AEC2"/>`});
 d+=R(ex(0,-1)-6*s,eb,wb+12*s,8*s,'#C8CCDA',2*s)+R(ex(0,-1),eb-3*s,wb,4*s,'#F2C94A')+shd(ecx,eb+12*s,wb*.7,6*s,.14);
 // 售票機（左邊牆上，螢幕亮亮的，出票口一個代幣）
 const vx=W*(P?.42:.3),vy=FY;d+=shd(vx+30*s,vy+2*s,40*s,5*s,.14)+R(vx,vy-110*s,60*s,110*s,'#E8E6F0',6*s)+R(vx,vy-110*s,60*s,14*s,C7.mint,6*s)+R(vx+8*s,vy-86*s,44*s,32*s,`url(#${g}sc)`,4*s)
  +[0,1,2].map(k=>`<circle cx="${n(vx+16*s+k*14*s)}" cy="${n(vy-44*s)}" r="${n(4*s)}" fill="${[C7.coral,C7.gold,C7.lav][k]}"/>`).join('')+R(vx+18*s,vy-30*s,24*s,10*s,'#3A3E56',3*s)+`<circle cx="${n(vx+30*s)}" cy="${n(vy-25*s)}" r="${n(3.4*s)}" fill="${C7.lav}"/>`;
 // 閘門（一排三個，右邊留空給主角）
 const gx0=W*(P?.2:.44);const gw=(P?44:56)*s;
 for(let k=0;k<(P?3:4);k++){const x=gx0+k*gw*1.6;
  d+=shd(x+gw/2,FY+20*s,gw*.6,5*s,.15)+R(x,FY-34*s,gw*.7,54*s,`url(#${g}gt)`,6*s)+R(x,FY-34*s,gw*.7,6*s,'#D6CCFA',4*s)+`<circle cx="${n(x+gw*.35)}" cy="${n(FY-20*s)}" r="${n(6*s)}" fill="#3A3E56"/><circle cx="${n(x+gw*.35)}" cy="${n(FY-20*s)}" r="${n(3.4*s)}" fill="#8AF0B0"${A('rd4tw',k*.4,2)}/>`;
  d+=`<path d="M${n(x+gw*.7)} ${n(FY-14*s)} Q${n(x+gw*.95)} ${n(FY-20*s)} ${n(x+gw*1.1)} ${n(FY-12*s)}" fill="#DDF2FA" stroke="#A8C8DA" stroke-width="${n(1.4*s)}" opacity=".85"/>`}
 // 頭上的吊牌
 d+=hangSign(W*(P?.5:.5),H*.12,s*(P?.8:1),['esc','arrowD','train','arrowL']);
 d+=iconSign(W*(P?.86:.9),H*.28,s*1.1,'exit','#4E9A6A');
 return d}
// 路線圖牆：彩色的線、站的圓點、終點有美術館、沿路有圖書館、診所、動物園的小圖（沒有字）
function metroMap(W,H,s,P,g){let d=`<defs>${lg(g+'wl',[[0,'#F4F0E8'],[1,'#E6E0D4']])}${lg(g+'fl',[[0,'#D8D6E0'],[1,'#BCB8C8']])}${rg(g+'gl',[[0,'#FFFFFF',.8],[1,'#FFFFFF',0]])}</defs>`;
 const FY=H*(P?.78:.8);d+=R(-400,0,W+800,FY,`url(#${g}wl)`)+R(-400,FY,W+800,H-FY+10,`url(#${g}fl)`);
 for(let x=-400;x<W+400;x+=40*s)d+=`<path d="M${n(x)} 0 V${n(FY)}" stroke="#DCD6C8" stroke-width="${n(1*s)}"/>`;
 d+=R(-400,FY-40*s,W+800,10*s,C7.mint);
 // 地圖板
 const bx=W*(P?.06:.08),by=H*(P?.24:.12),bw=W*(P?.88:.64),bh=H*(P?.36:.56);
 d+=R(bx-10*s,by-10*s,bw+20*s,bh+20*s,'#5A5C74',10*s)+R(bx,by,bw,bh,'#FFFFFF',6*s)+`<ellipse cx="${n(bx+bw*.3)}" cy="${n(by+bh*.2)}" rx="${n(bw*.4)}" ry="${n(bh*.3)}" fill="url(#${g}gl)"/>`;
 // 河、公園（淡淡的底色）
 d+=`<path d="M${n(bx)} ${n(by+bh*.72)} Q${n(bx+bw*.3)} ${n(by+bh*.6)} ${n(bx+bw*.55)} ${n(by+bh*.8)} T${n(bx+bw)} ${n(by+bh*.7)} V${n(by+bh*.84)} Q${n(bx+bw*.7)} ${n(by+bh*.95)} ${n(bx+bw*.5)} ${n(by+bh*.9)} T${n(bx)} ${n(by+bh*.86)}Z" fill="#CFEAFA"/>`;
 d+=`<ellipse cx="${n(bx+bw*.7)}" cy="${n(by+bh*.3)}" rx="${n(bw*.12)}" ry="${n(bh*.14)}" fill="#DDF2D2"/>`;
 const X=t=>bx+bw*t,Y=t=>by+bh*t;
 const line=(pts,c)=>`<path d="M${pts.map(([a,b])=>n(X(a))+' '+n(Y(b))).join(' L')}" stroke="${c}" stroke-width="${n(7*s)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 const L1=[[.06,.82],[.22,.82],[.34,.62],[.5,.62],[.62,.42],[.8,.42],[.92,.2]];
 d+=line([[.1,.18],[.3,.18],[.42,.4],[.42,.62],[.58,.86],[.9,.86]],C7.lav)+line([[.2,.95],[.2,.6],[.5,.3],[.72,.18],[.95,.18]],'#7EC6F0')+line(L1,C7.mint)+line([[.04,.45],[.3,.45],[.5,.62],[.7,.7],[.96,.62]],C7.gold);
 // 站點
 const st=(t,u,big)=>`<circle cx="${n(X(t))}" cy="${n(Y(u))}" r="${n((big?7:5)*s)}" fill="#FFFFFF" stroke="#3A3150" stroke-width="${n(2*s)}"/>`;
 [[.22,.82],[.34,.62],[.5,.62,1],[.62,.42],[.8,.42],[.42,.4],[.3,.18],[.2,.6],[.5,.3],[.72,.18],[.3,.45],[.7,.7],[.58,.86]].forEach(([a,b,c])=>d+=st(a,b,c));
 // 地標小圖
 const mk=(t,u,ic,bg)=>iconSign(X(t),Y(u)-20*s,s*.9,ic,bg);
 d+=mk(.06,.82,'heart','#FF8A80').replace('','')+mk(.34,.62,'book','#7E8ED8')+mk(.62,.42,'tooth','#4FC4AE')+mk(.8,.42,'elephant','#8FBF5A')+mk(.92,.2,'palette','#FF8A80');
 // 家（起點）＝小房子；你在這裡＝一顆發亮的星星
 d+=`<g transform="translate(${n(X(.06))} ${n(Y(.82)+2*s)})"><circle r="${n(9*s)}" fill="#FFE27A" opacity=".5"${A('rd4tw',0,1.6)}/><path d="${star5(0,0,8*s)}" fill="${C7.gold}" stroke="#E0962A" stroke-width="${n(1.2*s)}"/></g>`;
 d+=`<path d="M${n(X(.92)-10*s)} ${n(Y(.2)+8*s)} l${n(10*s)} ${n(-6*s)} l${n(10*s)} ${n(6*s)}" stroke="#FF8A80" stroke-width="${n(2*s)}" fill="none"/>`;
 // 右邊：月台方向的指示（圖示）、一盆植物
 if(!P){d+=iconSign(W*.82,H*.2,s*1.2,'train','#3A5A7A')+iconSign(W*.82+36*s,H*.2,s*1.2,'arrowR','#3A5A7A');d+=plant(W*.8,FY+6*s,s*1.1)}
 // 欄杆
 d+=`<path d="M${n(bx-20*s)} ${n(FY+10*s)} H${n(bx+bw+20*s)}" stroke="#A8B0C4" stroke-width="${n(5*s)}" stroke-linecap="round"/>`;
 [bx,bx+bw/2,bx+bw].forEach(x=>d+=R(x-2.4*s,FY+10*s,4.8*s,40*s,'#A8B0C4',2*s));
 return d}
// 開場：家裡客廳的早上，桌上有美術館寄來的邀請卡（第 41 章、也是第七季開場）
function home41(W,H){const {P,s}=sc(W,H);const g=uid('hm');let d=`<defs>${lg(g+'w',[[0,'#FFF1DE'],[1,'#F8DEC0']])}${lg(g+'f',[[0,'#D9A872'],[1,'#B8834E']])}${lg(g+'ray',[[0,'#FFF8D8',.6],[1,'#FFF8D8',0]])}${lg(g+'sofa',[[0,'#9FD6C8'],[1,'#6FB8A6']])}</defs>`;
 const FY=H*(P?.72:.7);
 d+=R(-400,0,W+800,FY,`url(#${g}w)`);
 for(let x=-400;x<W+400;x+=28*s)d+=`<path d="M${n(x)} 0 V${n(FY)}" stroke="#F2D2B0" stroke-width="${n(6*s)}" opacity=".35"/>`;
 d+=R(-400,FY-24*s,W+800,24*s,'#F6E6D2')+R(-400,FY-26*s,W+800,3*s,'#E8C8A2');
 d+=R(-400,FY,W+800,H-FY+10,`url(#${g}f)`);for(let y=FY+16*s;y<H;y+=22*s)d+=`<path d="M-400 ${n(y)} H${W+400}" stroke="#A8743E" stroke-width="${n(1.2*s)}" opacity=".4"/>`;
 // 窗戶＋陽光
 const wx=W*(P?.08:.06),wy=H*(P?.12:.1),ww=(P?150:210)*s,wh=(P?160:170)*s;
 d+=`<path d="M${n(wx)} ${n(wy+wh)} L${n(wx+ww)} ${n(wy+wh)} L${n(wx+ww+160*s)} ${n(H)} L${n(wx+40*s)} ${n(H)}Z" fill="url(#${g}ray)" opacity=".7"/>`;
 d+=cityWin(wx,wy,ww,wh,s,'#FFFFFF',11,{cross:2,fw:8});
 d+=`<path d="M${n(wx-20*s)} ${n(wy-14*s)} H${n(wx+ww+20*s)}" stroke="#B8834E" stroke-width="${n(5*s)}" stroke-linecap="round"/>`+`<path d="M${n(wx-14*s)} ${n(wy-12*s)} Q${n(wx)} ${n(wy+wh*.6)} ${n(wx-10*s)} ${n(wy+wh+20*s)} L${n(wx-30*s)} ${n(wy+wh+20*s)} Q${n(wx-30*s)} ${n(wy+wh*.5)} ${n(wx-24*s)} ${n(wy-12*s)}Z M${n(wx+ww+14*s)} ${n(wy-12*s)} Q${n(wx+ww)} ${n(wy+wh*.6)} ${n(wx+ww+10*s)} ${n(wy+wh+20*s)} L${n(wx+ww+30*s)} ${n(wy+wh+20*s)} Q${n(wx+ww+30*s)} ${n(wy+wh*.5)} ${n(wx+ww+24*s)} ${n(wy-12*s)}Z" fill="#FFB0A8"/>`;
 // 牆上掛著主角以前畫的畫
 d+=frameArt(W*(P?.62:.44),H*(P?.1:.12),(P?70:86)*s,(P?54:66)*s,s,2,'white')+frameArt(W*(P?.8:.6),H*(P?.14:.16),(P?50:60)*s,(P?40:46)*s,s,5,'mint');
 // 沙發（右後）
 if(!P){const sx=W*.66,sw=230*s;d+=shd(sx+sw/2,FY+12*s,sw*.55,8*s,.14)+R(sx,FY-70*s,sw,50*s,`url(#${g}sofa)`,18*s)+R(sx-10*s,FY-34*s,sw+20*s,44*s,`url(#${g}sofa)`,14*s)+R(sx+12*s,FY-40*s,sw/2-16*s,20*s,'#BFE8DC',10*s)+R(sx+sw/2+4*s,FY-40*s,sw/2-16*s,20*s,'#BFE8DC',10*s)+R(sx+30*s,FY-66*s,40*s,30*s,'#FFCB4D',10*s)}
 // 小桌子＋邀請卡（左中，主角會走過去看）
 const tx=W*(P?.32:.3),tw=(P?120:150)*s,ty=FY+(P?40:30)*s;
 d+=shd(tx,ty+4*s,tw*.6,8*s,.16)+R(tx-tw/2,ty-46*s,tw,10*s,'#E8B884',5*s)+`<path d="M${n(tx-tw/2+12*s)} ${n(ty-36*s)} V${n(ty)} M${n(tx+tw/2-12*s)} ${n(ty-36*s)} V${n(ty)}" stroke="#B8834E" stroke-width="${n(6*s)}" stroke-linecap="round"/>`;
 // 信封（打開）＋卡片站著（上面畫一個畫框和星星，沒有字）
 d+=`<g transform="translate(${n(tx-28*s)} ${n(ty-52*s)}) rotate(-8)">${R(-22*s,-14*s,44*s,28*s,'#FFFFFF',3*s)}<path d="M${n(-22*s)} ${n(-14*s)} L0 ${n(4*s)} L${n(22*s)} ${n(-14*s)}" stroke="#E8DCC4" stroke-width="${n(1.4*s)}" fill="none"/><path d="${heartP(0,0,4*s)}" fill="${C7.coral}"/></g>`;
 d+=`<g transform="translate(${n(tx+22*s)} ${n(ty-48*s)}) rotate(4)">${R(-24*s,-56*s,48*s,56*s,'#FFFDF6',4*s,` stroke="${C7.gold}" stroke-width="${n(2*s)}"`)}${R(-16*s,-48*s,32*s,26*s,'#E8B04A',2*s)}${R(-13*s,-45*s,26*s,20*s,'#FFF6E6')}`
  +`<g transform="translate(${n(-13*s)} ${n(-45*s)}) scale(${n(.26*s)} ${n(.266*s)})">${kidArt(7)()}</g>`
  +`<path d="${star5(0,-12*s,5*s)}" fill="${C7.gold}"/><path d="M${n(-16*s)} ${n(-5*s)} H${n(16*s)}" stroke="${C7.coral}" stroke-width="${n(1.6*s)}" stroke-linecap="round"/></g>`;
 d+=`<g${A('rd4tw',0,1.8)}><path d="${spark(tx+52*s,ty-108*s,6*s)}" fill="#FFE27A"/><path d="${spark(tx-4*s,ty-118*s,4*s)}" fill="#FFFFFF"/></g>`;
 // 地毯
 d+=`<ellipse cx="${n(W*(P?.5:.5))}" cy="${n(FY+(H-FY)*.62)}" rx="${n(W*(P?.42:.3))}" ry="${n(26*s)}" fill="#FFCFC4" opacity=".55"/>`;
 return d}

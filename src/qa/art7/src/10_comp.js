
/* ===================== 場景共用小零件 ===================== */
// 秋天的行道樹（樹冠由幾團組成：暗面、亮面、亮點）
const ATC=[['#E8A23A','#C8782A','#FFD27A'],['#7FB85A','#5A9442','#B8E07A'],['#F2C04A','#D89A2E','#FFE89A'],['#E07A4A','#B85A36','#FFB27A']];
function atree(x,y,s,k=0,trunk='#8A5A3A'){const [c1,c2,c3]=ATC[k%4];const g=uid('at');
 return `<defs>${rg(g,[[0,c3],[.55,c1],[1,c2]],.38,.3,.75)}</defs>`+shd(x,y+2*s,34*s,6*s,.14)
 +`<path d="M${n(x-4*s)} ${n(y)} Q${n(x-3*s)} ${n(y-30*s)} ${n(x-9*s)} ${n(y-48*s)} M${n(x-2*s)} ${n(y-30*s)} Q${n(x+8*s)} ${n(y-40*s)} ${n(x+14*s)} ${n(y-52*s)}" stroke="${trunk}" stroke-width="${n(5*s)}" fill="none" stroke-linecap="round"/>`
 +`<path d="M${n(x-5*s)} ${n(y)} L${n(x-3*s)} ${n(y-34*s)} L${n(x+3*s)} ${n(y-34*s)} L${n(x+5*s)} ${n(y)}Z" fill="${trunk}"/>`
 +`<path d="M${n(x-40*s)} ${n(y-50*s)} Q${n(x-46*s)} ${n(y-80*s)} ${n(x-20*s)} ${n(y-88*s)} Q${n(x-8*s)} ${n(y-112*s)} ${n(x+16*s)} ${n(y-100*s)} Q${n(x+42*s)} ${n(y-100*s)} ${n(x+40*s)} ${n(y-74*s)} Q${n(x+52*s)} ${n(y-54*s)} ${n(x+30*s)} ${n(y-42*s)} Q${n(x)} ${n(y-30*s)} ${n(x-22*s)} ${n(y-38*s)} Q${n(x-44*s)} ${n(y-36*s)} ${n(x-40*s)} ${n(y-50*s)}Z" fill="url(#${g})"/>`
 +`<path d="M${n(x-30*s)} ${n(y-46*s)} Q${n(x-4*s)} ${n(y-36*s)} ${n(x+30*s)} ${n(y-46*s)} Q${n(x+10*s)} ${n(y-40*s)} ${n(x-30*s)} ${n(y-46*s)}Z" fill="${c2}" opacity=".5"/>`
 +[[-18,-82,6],[6,-94,5],[-30,-62,4],[22,-70,4.4]].map(([dx,dy,r])=>`<circle cx="${n(x+dx*s)}" cy="${n(y+dy*s)}" r="${n(r*s)}" fill="${c3}" opacity=".75"/>`).join('')}
// 落葉
const leafS=(x,y,s,c,a)=>`<path d="M0 -5 Q4 -1 0 5 Q-4 -1 0 -5Z" fill="${c}" transform="translate(${n(x)} ${n(y)}) rotate(${a}) scale(${(+s).toFixed(2)})"/>`;
// 遠方城市（窗戶有亮有暗，沒有招牌字）
function city(x0,x1,base,s,seed,pal){const r=rng(seed);let d='';const P=pal||['#C9D6EE','#B8C8E6','#D8E0F2','#AFC0E0'];
 for(let x=x0;x<x1;){const w=(26+r()*34)*s,h=(40+r()*90)*s,c=P[Math.floor(r()*P.length)];
  d+=R(x,base-h,w,h+2,c);if(r()<.3)d+=`<path d="M${n(x+w*.2)} ${n(base-h)} V${n(base-h-10*s)}" stroke="${c}" stroke-width="${n(2*s)}"/>`;
  for(let yy=base-h+6*s;yy<base-8*s;yy+=9*s)for(let xx=x+4*s;xx<x+w-6*s;xx+=8*s)if(r()<.7)d+=R(xx,yy,4*s,4.6*s,r()<.18?'#FFF3C4':'#FFFFFF',0,' opacity=".55"');
  x+=w+(2+r()*6)*s}return d}
// 天空（秋天涼爽的白天）
const skyDay=(g)=>lg(g,[[0,'#8FCFF4'],[.6,'#CDEBFA'],[1,'#F4F8EC']]);
// 窗戶：外面是秋天的城市（x,y,w,h；fr 窗框色）
function cityWin(x,y,w,h,s,fr='#FFFFFF',seed=7,o={}){const g=uid('cw');let d=`<defs>${skyDay(g+'s')}<clipPath id="${g}c"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n((o.r||4)*s)}"/></clipPath></defs>`;
 d+=`<g clip-path="url(#${g}c)">${R(x,y,w,h,`url(#${g}s)`)}${cloud(x+w*.3,y+h*.22,s*.45,'#FFFFFF',.9)}`;
 d+=city(x-10*s,x+w+10*s,y+h*.82,s*.8,seed,['#D2DCF0','#C4D2EC','#E0E6F4'])+city(x-20*s,x+w+20*s,y+h*.96,s,seed+3,['#B8C8E6','#A9BCE0','#C9D4EC']);
 if(!o.notree)d+=atree(x+w*.15,y+h*1.05,s*.7,seed%4)+atree(x+w*.82,y+h*1.08,s*.8,(seed+1)%4);
 d+=`<path d="M${n(x+w*.1)} ${n(y)} L${n(x+w*.42)} ${n(y)} L${n(x+w*.12)} ${n(y+h)} L${n(x-w*.2)} ${n(y+h)}Z" fill="#FFFFFF" opacity=".16"/></g>`;
 d+=`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n((o.r||4)*s)}" fill="none" stroke="${fr}" stroke-width="${n((o.fw||6)*s)}"/>`;
 if(o.cross!==0)d+=`<path d="M${n(x+w/2)} ${n(y)} V${n(y+h)}${o.cross===2?` M${n(x)} ${n(y+h*.45)} H${n(x+w)}`:''}" stroke="${fr}" stroke-width="${n((o.fw||6)*s*.7)}"/>`;
 return d}
// 書（書背）：書架一排
const BKC=['#FF8A80','#4FC4AE','#FFCB4D','#A99BE8','#7EC6F0','#FFB27A','#8FD08A','#F48FB8','#6A8AD8','#E8705A'];
function books(x,y,w,s,seed,maxH=30){const r=rng(seed);let d='',xx=x;
 while(xx<x+w-6*s){const bw=(5+r()*5)*s,bh=(maxH*.62+r()*maxH*.38)*s,c=BKC[Math.floor(r()*BKC.length)];
  if(r()<.12&&xx+bh<x+w){// 斜靠的一本
   d+=`<g transform="rotate(${n(-14-r()*8)} ${n(xx)} ${n(y)})">${R(xx,y-bh,bw,bh,c,1*s)}${R(xx,y-bh*.78,bw,2*s,'#FFFFFF',0,' opacity=".55"')}</g>`;xx+=bh*.45+bw;continue}
  d+=R(xx,y-bh,bw,bh,c,1*s)+R(xx,y-bh,bw*.28,bh,'#FFFFFF',0,' opacity=".18"')+R(xx,y-bh*.8,bw,1.6*s,mixc(c,'#FFFFFF',.5))+R(xx,y-bh*.3,bw,1.6*s,mixc(c,'#000000',.2));
  if(r()<.35)d+=`<circle cx="${n(xx+bw/2)}" cy="${n(y-bh*.55)}" r="${n(bw*.22)}" fill="#FFFFFF" opacity=".7"/>`;
  xx+=bw+(r()<.2?2*s:.4*s)}return d}
// 書架（x,y 左上；w,h；rows 層）
function shelf(x,y,w,h,s,seed,rows=4,o={}){const g=uid('sh');const wd=o.wood||['#C8925A','#A8743E','#8A5A30'];
 let d=`<defs>${gl(g,wd[0],wd[1])}${gl(g+'i',mixc(wd[1],'#000000',.25),mixc(wd[1],'#000000',.05))}</defs>`+shd(x+w/2,y+h+2*s,w*.56,6*s,.14);
 d+=R(x,y,w,h,`url(#${g})`,3*s)+R(x+5*s,y+5*s,w-10*s,h-8*s,`url(#${g}i)`,2*s);
 const rh=(h-8*s)/rows;for(let i=0;i<rows;i++){const by=y+5*s+rh*(i+1);
  d+=books(x+7*s,by-2*s,w-14*s,s,seed+i*11,Math.min(34,rh/s-6));
  if(o.faceout&&i===o.faceout){const fx=x+w*.62,fw=rh*.62;d+=R(fx,by-2*s-rh*.78,fw,rh*.74,'#FFF6E0',2*s)+`<circle cx="${n(fx+fw*.5)}" cy="${n(by-rh*.52)}" r="${n(fw*.24)}" fill="#FF8A80"/>`+R(fx,by-2*s-rh*.78,fw*.12,rh*.74,'#E8B04A',1*s)}
  d+=R(x+3*s,by-2*s,w-6*s,4.4*s,wd[2],1*s)+R(x+3*s,by-2*s,w-6*s,1.4*s,mixc(wd[0],'#FFFFFF',.35))}
 d+=R(x,y,w,4*s,mixc(wd[0],'#FFFFFF',.25),3*s)+R(x,y,3.6*s,h,mixc(wd[0],'#FFFFFF',.2),2*s);
 return d}
// 小朋友的畫（蠟筆風格，在 0 0 100 75 的格子裡；k 換主題）
function kidArt(k){const lw=`stroke-linecap="round" stroke-linejoin="round" fill="none"`;
 const sun=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#FFD24D" stroke="#F2A62E" stroke-width="1.6"/>`+[0,45,90,135,180,225,270,315].map(a=>{const c=Math.cos(a*Math.PI/180),sn=Math.sin(a*Math.PI/180);return `<path d="M${n(x+c*(r+3))} ${n(y+sn*(r+3))} L${n(x+c*(r+8))} ${n(y+sn*(r+8))}" stroke="#F2A62E" stroke-width="2" ${lw}/>`}).join('');
 const grass=`<path d="M0 64 Q25 58 50 63 T100 61 V75 H0Z" fill="#8FD07A"/><path d="M6 66 l2 -5 l2 5 M30 67 l2 -5 l2 5 M70 66 l2 -5 l2 5 M88 67 l2 -5 l2 5" stroke="#5AA04A" stroke-width="1.2" ${lw}/>`;
 const A=[
  ()=>`<rect width="100" height="75" fill="#EAF6FF"/>${sun(82,16,8)}${grass}<path d="M24 62 V38 H52 V62Z" fill="#FFB8A8" stroke="#E2635C" stroke-width="1.6"/><path d="M20 40 L38 24 L56 40Z" fill="#E2635C" stroke="#B8483E" stroke-width="1.6"/><rect x="34" y="48" width="8" height="14" fill="#8A5A3A"/><rect x="27" y="42" width="6" height="6" fill="#BFE6FF" stroke="#7EC6F0"/><rect x="44" y="42" width="6" height="6" fill="#BFE6FF" stroke="#7EC6F0"/>${[64,74].map(x=>`<path d="M${x} 62 V52" stroke="#4E9A3A" stroke-width="1.6"/><circle cx="${x}" cy="50" r="3.4" fill="#FF8FB8"/><circle cx="${x}" cy="50" r="1.2" fill="#FFE27A"/>`).join('')}`,
  ()=>`<rect width="100" height="75" fill="#FFF4E6"/><path d="M10 70 Q50 60 90 70" stroke="#E8C89A" stroke-width="3" ${lw}/><ellipse cx="50" cy="50" rx="20" ry="15" fill="#FFB86A" stroke="#E08A3A" stroke-width="1.6"/><circle cx="50" cy="30" r="14" fill="#FFB86A" stroke="#E08A3A" stroke-width="1.6"/><path d="M38 22 L40 10 L48 18Z M62 22 L60 10 L52 18Z" fill="#FFB86A" stroke="#E08A3A" stroke-width="1.6"/><circle cx="45" cy="29" r="1.8" fill="#3A2A2A"/><circle cx="55" cy="29" r="1.8" fill="#3A2A2A"/><path d="M47 34 Q50 37 53 34" stroke="#3A2A2A" stroke-width="1.2" ${lw}/><path d="M70 52 Q84 46 80 30" stroke="#E08A3A" stroke-width="4" ${lw}/><path d="M36 33 H26 M36 36 H27 M64 33 H74 M64 36 H73" stroke="#C88A5A" stroke-width=".9"/>`,
  ()=>`<rect width="100" height="75" fill="#F2FFF0"/><path d="M38 70 L42 52 H62 L66 70Z" fill="#C8784A" stroke="#9A5A30" stroke-width="1.6"/>${[[44,28,'#FF6F8E'],[56,22,'#FFD24D'],[64,34,'#B89CFF'],[36,40,'#7EC6F0']].map(([x,y,c])=>`<path d="M52 52 Q${(x+52)/2} ${(y+52)/2+4} ${x} ${y}" stroke="#4E9A3A" stroke-width="1.6" ${lw}/>${[0,72,144,216,288].map(a=>`<circle cx="${n(x+5*Math.cos(a*Math.PI/180))}" cy="${n(y+5*Math.sin(a*Math.PI/180))}" r="3.6" fill="${c}"/>`).join('')}<circle cx="${x}" cy="${y}" r="2.4" fill="#FFF3B0"/>`).join('')}<path d="M8 12 q4 -4 8 0 q4 -4 8 0" stroke="#7EC6F0" stroke-width="1.6" ${lw}/>`,
  ()=>`<rect width="100" height="75" fill="#EAF6FF"/>${['#FF6F6F','#FFB24A','#FFE04A','#6FD08A','#5AA8F0','#A98AE8'].map((c,i)=>`<path d="M${12+i*3} 64 Q50 ${8+i*3} ${88-i*3} 64" stroke="${c}" stroke-width="3" ${lw}/>`).join('')}<path d="M6 66 Q14 56 24 62 Q30 54 38 64Z M62 64 Q70 54 78 62 Q86 54 96 66Z" fill="#FFFFFF" stroke="#BFD8F0" stroke-width="1.4"/>`,
  ()=>`<rect width="100" height="75" fill="#BFE8FF"/><path d="M0 18 Q25 12 50 18 T100 16" stroke="#7EC6F0" stroke-width="2" ${lw}/><path d="M30 40 Q44 26 60 40 Q44 54 30 40Z" fill="#FF8A80" stroke="#E2635C" stroke-width="1.6"/><path d="M60 40 L70 32 V48Z" fill="#FF8A80" stroke="#E2635C" stroke-width="1.6"/><circle cx="38" cy="38" r="1.8" fill="#3A2A2A"/><path d="M12 72 Q14 58 10 50 M18 72 Q22 60 20 54 M86 72 Q84 60 88 52" stroke="#4FC4AE" stroke-width="2.4" ${lw}/><circle cx="74" cy="22" r="2.6" fill="#FFFFFF" stroke="#7EC6F0"/><circle cx="80" cy="14" r="1.8" fill="#FFFFFF" stroke="#7EC6F0"/><path d="M40 66 Q44 62 48 66 Q52 62 56 66" stroke="#FFD24D" stroke-width="2" ${lw}/>`,
  ()=>`<rect width="100" height="75" fill="#FFF8E8"/>${sun(16,14,6)}${grass}<path d="M62 62 V34" stroke="#8A5A3A" stroke-width="5" ${lw}/><circle cx="62" cy="28" r="16" fill="#8FD07A" stroke="#5AA04A" stroke-width="1.6"/>${[[56,24],[68,30],[60,34]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.4" fill="#FF6F6F"/>`).join('')}<path d="M28 30 q4 -4 8 0 q4 -4 8 0" stroke="#3A3150" stroke-width="1.6" ${lw}/>`,
  ()=>`<rect width="100" height="75" fill="#2A2E6A"/>${[[14,12],[30,22],[80,10],[88,30],[60,8],[20,50]].map(([x,y])=>`<path d="${star5(x,y,2.6)}" fill="#FFE27A"/>`).join('')}<circle cx="74" cy="56" r="10" fill="#FFB27A"/><path d="M40 60 L46 22 L52 60Z" fill="#EDEFFB" stroke="#A9B4E0" stroke-width="1.4"/><circle cx="46" cy="40" r="3" fill="#7EC6F0"/><path d="M40 60 L36 66 L42 62 M52 60 L56 66 L50 62" fill="#FF8A80" stroke="#FF8A80" stroke-width="1.6"/><path d="M44 62 L46 72 L48 62" fill="#FFD24D"/>`,
  // 7：主角的畫——公主（或王子）牽著小貓熊，旁邊是太陽和小花
  (boy)=>`<rect width="100" height="75" fill="#FFF6EC"/>${sun(84,14,7)}${grass}
   <path d="M30 62 L36 40 H44 L50 62Z" fill="${boy?'#7EC6F0':'#FF8FB8'}" stroke="${boy?'#4A8AC8':'#E2638E'}" stroke-width="1.6"/><circle cx="40" cy="30" r="9" fill="#FFE0C8" stroke="#E8A888" stroke-width="1.4"/><path d="M31 30 Q32 18 40 19 Q48 18 49 30" fill="${boy?'#8A5A3A':'#A8683A'}"/>${boy?'':`<path d="M31 28 Q28 40 32 46 M49 28 Q52 40 48 46" stroke="#A8683A" stroke-width="3" ${lw}/><path d="M35 19 L37 13 L40 18 L43 13 L45 19Z" fill="#FFD24D"/>`}<circle cx="37" cy="30" r="1.2" fill="#3A2A2A"/><circle cx="43" cy="30" r="1.2" fill="#3A2A2A"/><path d="M38 34 Q40 36 42 34" stroke="#E2635C" stroke-width="1" ${lw}/><path d="M36 62 V68 M44 62 V68" stroke="#E8A888" stroke-width="2" ${lw}/>
   <path d="M48 46 Q54 50 58 50" stroke="#E8A888" stroke-width="2" ${lw}/>
   <ellipse cx="66" cy="56" rx="9" ry="8" fill="#D2692E" stroke="#A8481E" stroke-width="1.4"/><circle cx="64" cy="44" r="8" fill="#D2692E" stroke="#A8481E" stroke-width="1.4"/><path d="M57 40 L58 34 L62 38Z M71 40 L70 34 L66 38Z" fill="#FFFFFF" stroke="#A8481E" stroke-width="1"/><ellipse cx="64" cy="47" rx="4" ry="3" fill="#FFFFFF"/><circle cx="61" cy="43" r="1.1" fill="#3A2A2A"/><circle cx="67" cy="43" r="1.1" fill="#3A2A2A"/>
   <path d="M74 60 Q84 60 84 50 Q84 42 78 44" stroke="#D2692E" stroke-width="5" ${lw}/><path d="M76 58 l2 -4 M81 56 l2 -4 M83 50 l-4 0" stroke="#FFE0B8" stroke-width="1.6" ${lw}/>
   <path d="M14 62 V54" stroke="#4E9A3A" stroke-width="1.4"/><circle cx="14" cy="52" r="3" fill="#B89CFF"/><path d="M22 64 V57" stroke="#4E9A3A" stroke-width="1.4"/><circle cx="22" cy="55" r="2.6" fill="#FFD24D"/>
   <path d="${heartP(50,14,4)}" fill="#FF8A80"/>`];
 return A[k%A.length]}
// 畫框（gold 金框、wood 木框、white 白框）；k 用 kidArt 第幾張（或傳函式）
function frameArt(x,y,w,h,s,k,style='wood',o={}){const g=uid('fa');const FR={gold:['#F2CF6A','#C8962A'],wood:['#C8925A','#8A5A30'],white:['#FFFFFF','#D8D2E6'],mint:['#8FE0CE','#3E9E8A'],coral:['#FFB0A8','#D8605A']}[style]||['#C8925A','#8A5A30'];
 const b=Math.min(w,h)*.09,m=Math.min(w,h)*.07;const art=typeof k==='function'?k():kidArt(k)(o.boy);
 return `<defs>${gl(g,FR[0],FR[1],1,1)}<clipPath id="${g}c"><rect x="${n(x+b+m)}" y="${n(y+b+m)}" width="${n(w-2*b-2*m)}" height="${n(h-2*b-2*m)}"/></clipPath></defs>`
  +R(x+3*s,y+4*s,w,h,'#2A2050',2*s,' opacity=".14"')+R(x,y,w,h,`url(#${g})`,2*s)+R(x+b,y+b,w-2*b,h-2*b,o.mat||'#FFFDF6')
  +`<g clip-path="url(#${g}c)"><g transform="translate(${n(x+b+m)} ${n(y+b+m)}) scale(${n((w-2*b-2*m)/100)} ${n((h-2*b-2*m)/75)})">${art}</g></g>`
  +`<path d="M${n(x+b)} ${n(y+b)} H${n(x+w-b)} M${n(x+b)} ${n(y+b)} V${n(y+h-b)}" stroke="#000000" stroke-width="${n(1.2*s)}" opacity=".12"/>`
  +`<path d="M${n(x+1.5*s)} ${n(y+1.5*s)} H${n(x+w-1.5*s)}" stroke="#FFFFFF" stroke-width="${n(1.2*s)}" opacity=".5"/>`}
// 投射燈（從上往下的光錐）
function spotCone(x,y,w,h,g,op=.35){return `<path d="M${n(x-w*.08)} ${n(y)} L${n(x+w*.08)} ${n(y)} L${n(x+w/2)} ${n(y+h)} L${n(x-w/2)} ${n(y+h)}Z" fill="url(#${g})" opacity="${op}"/>`}
// 盆栽
function plant(x,y,s,c='#E8B07A'){return shd(x,y+1*s,16*s,3.4*s,.14)+`<path d="M${n(x-11*s)} ${n(y-18*s)} H${n(x+11*s)} L${n(x+8*s)} ${n(y)} H${n(x-8*s)}Z" fill="${c}"/><path d="M${n(x-12*s)} ${n(y-20*s)} H${n(x+12*s)} V${n(y-16*s)} H${n(x-12*s)}Z" fill="${mixc(c,'#000000',.12)}"/>`
 +[[-14,-46,-30],[0,-56,0],[14,-44,30],[-8,-36,-60],[10,-34,60]].map(([dx,dy,a])=>`<path d="M${n(x)} ${n(y-18*s)} Q${n(x+dx*.3*s)} ${n(y+dy*.6*s)} ${n(x+dx*s)} ${n(y+dy*s)}" stroke="#4E9A4A" stroke-width="${n(1.6*s)}" fill="none"/><ellipse cx="${n(x+dx*s)}" cy="${n(y+dy*s)}" rx="${n(5*s)}" ry="${n(9*s)}" fill="${['#5AAE5A','#6CC06A','#4E9A4A'][Math.abs(dx)%3]}" transform="rotate(${a} ${n(x+dx*s)} ${n(y+dy*s)})"/>`).join('')}
// 長椅（木頭＋金屬腳）
function bench(x,y,w,s,c='#C8925A'){return shd(x+w/2,y+2*s,w*.55,5*s,.16)+`<path d="M${n(x+6*s)} ${n(y)} V${n(y-18*s)} M${n(x+w-6*s)} ${n(y)} V${n(y-18*s)}" stroke="#6A6A80" stroke-width="${n(3*s)}" stroke-linecap="round"/>`
 +R(x,y-22*s,w,6*s,c,2*s)+R(x,y-22*s,w,2*s,mixc(c,'#FFFFFF',.3),1*s)+R(x+2*s,y-40*s,w-4*s,5*s,c,2*s)+R(x+2*s,y-32*s,w-4*s,5*s,c,2*s)+`<path d="M${n(x+8*s)} ${n(y-40*s)} V${n(y-22*s)} M${n(x+w-8*s)} ${n(y-40*s)} V${n(y-22*s)}" stroke="#6A6A80" stroke-width="${n(2.4*s)}"/>`}
// 吊燈條（天花板光帶）
const lightBar=(x,y,w,s)=>`<rect x="${n(x-4*s)}" y="${n(y-4*s)}" width="${n(w+8*s)}" height="${n(14*s)}" rx="${n(7*s)}" fill="#FFFBE6" opacity=".35"/>${R(x,y,w,6*s,'#FFFDF2',3*s)}`;
// 牆上的小圖示牌（沒有字）
function iconSign(x,y,s,ic,bg='#3A6A8A'){const IC={
  train:`<rect x="-9" y="-10" width="18" height="16" rx="5" fill="#FFFFFF"/><rect x="-6" y="-7" width="12" height="5" rx="1.4" fill="${bg}"/><circle cx="-5" cy="2" r="1.6" fill="${bg}"/><circle cx="5" cy="2" r="1.6" fill="${bg}"/><path d="M-6 6 L-9 11 M6 6 L9 11" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`,
  exit:`<circle cx="-2" cy="-8" r="2.6" fill="#FFFFFF"/><path d="M-2 -4 L-4 3 L-9 8 M-4 3 L2 8 M-3 -2 L4 1 M-3 -2 L-9 0" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M7 -9 V9" stroke="#FFFFFF" stroke-width="2.4"/>`,
  arrowL:`<path d="M9 0 H-8 M-2 -6 L-8 0 L-2 6" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  arrowR:`<path d="M-9 0 H8 M2 -6 L8 0 L2 6" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  arrowD:`<path d="M0 -9 V8 M-6 2 L0 8 L6 2" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  esc:`<path d="M-10 8 H-4 L5 -4 H10" stroke="#FFFFFF" stroke-width="2.6" fill="none" stroke-linejoin="round"/><circle cx="-1" cy="-8" r="2.2" fill="#FFFFFF"/><path d="M-1 -5 V1" stroke="#FFFFFF" stroke-width="2.2"/>`,
  quiet:`<circle cx="-2" cy="-1" r="7" fill="#FFFFFF"/><path d="M-4 -1 H0" stroke="${bg}" stroke-width="1.6" stroke-linecap="round"/><path d="M6 -8 V8" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>`,
  wash:`<path d="M-8 -2 Q-8 6 0 6 Q8 6 8 -2Z" fill="#FFFFFF"/><path d="M-3 -8 Q-3 -4 -1 -4 M3 -9 Q3 -5 5 -5" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="-2" cy="-2" r="1.4" fill="${bg}"/>`,
  cover:`<circle cx="-3" cy="-1" r="6.4" fill="#FFFFFF"/><path d="M-1 3 Q6 2 9 -4" stroke="#FFFFFF" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="-5" cy="-2" r="1" fill="${bg}"/>`,
  noflash:`<rect x="-9" y="-5" width="18" height="12" rx="2" fill="#FFFFFF"/><circle cx="0" cy="1" r="3.6" fill="${bg}"/><path d="M4 -9 L1 -5 H4 L1 -1" stroke="#FFE27A" stroke-width="1.6" fill="none"/><circle r="12" fill="none" stroke="#FF6A5A" stroke-width="2.4"/><path d="M-8.5 -8.5 L8.5 8.5" stroke="#FF6A5A" stroke-width="2.4"/>`,
  notouch:`<path d="M-4 8 V-4 Q-4 -7 -2 -7 Q0 -7 0 -4 V-8 Q0 -10 2 -10 Q4 -10 4 -8 V-2 Q6 -4 8 -2 L4 8Z" fill="#FFFFFF"/><circle r="12" fill="none" stroke="#FF6A5A" stroke-width="2.4"/><path d="M-8.5 -8.5 L8.5 8.5" stroke="#FF6A5A" stroke-width="2.4"/>`,
  nofeed:`<path d="M-8 6 Q-8 -2 -2 -2 H5 Q8 -2 8 1 Q8 4 5 4 H0" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="3" cy="-7" r="3.6" fill="#FFFFFF"/><circle r="12" fill="none" stroke="#FFFFFF" stroke-width="2.4"/><path d="M-8.5 -8.5 L8.5 8.5" stroke="#FFFFFF" stroke-width="2.4"/>`,
  meet:`<path d="M-6 9 V-9" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/><path d="M-6 -9 L8 -5 L-6 -1Z" fill="#FFE27A"/><circle cx="3" cy="5" r="2.4" fill="#FFFFFF"/><circle cx="8" cy="6" r="1.8" fill="#FFFFFF"/>`,
  heart:`<path d="${heartP(0,0,8)}" fill="#FFFFFF"/><path d="M-1.4 -4 H1.4 V-1.4 H4 V1.4 H1.4 V4 H-1.4 V1.4 H-4 V-1.4 H-1.4Z" fill="${bg}"/>`,
  tooth:`<path d="M-7 -7 Q-8 -11 -3 -10 Q0 -9 3 -10 Q8 -11 7 -7 Q7 -1 5 4 Q4 9 2 8 Q1 3 0 3 Q-1 3 -2 8 Q-4 9 -5 4 Q-7 -1 -7 -7Z" fill="#FFFFFF"/>`,
  book:`<path d="M0 -6 Q-5 -9 -10 -7 V7 Q-5 5 0 8Z M0 -6 Q5 -9 10 -7 V7 Q5 5 0 8Z" fill="#FFFFFF"/>`,
  paw:`<ellipse cx="0" cy="3" rx="5" ry="4.4" fill="#FFFFFF"/>${[[-6,-3],[-2,-7],[2,-7],[6,-3]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.1" fill="#FFFFFF"/>`).join('')}`,
  palette:`<path d="M0 -9 Q10 -9 10 0 Q10 4 6 4 Q3 4 3 7 Q3 10 0 10 Q-10 10 -10 0 Q-10 -9 0 -9Z" fill="#FFFFFF"/>${[[-5,-3,'#FF8A80'],[0,-5,'#FFCB4D'],[5,-3,'#4FC4AE'],[-5,3,'#7EC6F0']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${c}"/>`).join('')}`,
  elephant:`<path d="M-8 6 Q-10 -6 0 -7 Q9 -7 9 1 Q9 5 6 5 V9 H3 V5 H-3 V9 H-6Z" fill="#FFFFFF"/><path d="M-8 -1 Q-12 3 -10 9" stroke="#FFFFFF" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  giraffe:`<path d="M-2 9 V-6 L-1 -9 Q2 -11 5 -8 L2 -6 V2 Q6 2 6 6 V9 H4 V6 H1 V9Z" fill="#FFFFFF"/>`};
 return T(x,y,s,`<rect x="-13" y="-13" width="26" height="26" rx="6" fill="${bg}"/>${IC[ic]||''}`)}
// 天花板吊牌（一排圖示）
function hangSign(x,y,s,ics,bg='#3A5A7A'){const w=(ics.length*30+10);return `<path d="M${n(x-w*s*.35)} 0 V${n(y)} M${n(x+w*s*.35)} 0 V${n(y)}" stroke="#9A9AB0" stroke-width="${n(1.6*s)}"/>`+R(x-w*s/2,y,w*s,34*s,bg,5*s)+R(x-w*s/2,y,w*s,3*s,'#FFFFFF',2*s,' opacity=".25"')+ics.map((ic,i)=>iconSign(x+(-w/2+20+i*30)*s,y+17*s,s,ic,bg)).join('')}
// 時鐘（只有刻度，沒有數字）
function clock(x,y,r,h=10,m=0){const a1=(h%12+m/60)*30-90,a2=m*6-90;return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r*1.12)}" fill="#5A5A74"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#FFFFFF"/>`+Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<path d="M${n(x+Math.cos(a)*r*.8)} ${n(y+Math.sin(a)*r*.8)} L${n(x+Math.cos(a)*r*(i%3?.88:.92))} ${n(y+Math.sin(a)*r*(i%3?.88:.92))}" stroke="#3A3150" stroke-width="${n(r*(i%3?.05:.1))}" stroke-linecap="round"/>`}).join('')
 +`<path d="M${n(x)} ${n(y)} L${n(x+Math.cos(a1*Math.PI/180)*r*.5)} ${n(y+Math.sin(a1*Math.PI/180)*r*.5)}" stroke="#3A3150" stroke-width="${n(r*.12)}" stroke-linecap="round"/><path d="M${n(x)} ${n(y)} L${n(x+Math.cos(a2*Math.PI/180)*r*.74)} ${n(y+Math.sin(a2*Math.PI/180)*r*.74)}" stroke="#3A3150" stroke-width="${n(r*.08)}" stroke-linecap="round"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r*.08)}" fill="#FF8A80"/>`}
// 繩子圍欄（美術館、排隊）
function ropes(x0,x1,y,s,c='#C8462A',post='#C8962A'){let d='';const N=Math.max(2,Math.round((x1-x0)/(70*s)));const xs=Array.from({length:N+1},(_,i)=>x0+(x1-x0)*i/N);
 xs.forEach((x,i)=>{if(i)d+=`<path d="M${n(xs[i-1])} ${n(y-30*s)} Q${n((xs[i-1]+x)/2)} ${n(y-18*s)} ${n(x)} ${n(y-30*s)}" stroke="${c}" stroke-width="${n(3*s)}" fill="none"/>`});
 xs.forEach(x=>{d+=shd(x,y+1*s,9*s,2.4*s,.16)+R(x-2*s,y-34*s,4*s,34*s,post,1*s)+`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(8*s)}" ry="${n(2.6*s)}" fill="${post}"/><circle cx="${n(x)}" cy="${n(y-35*s)}" r="${n(3.6*s)}" fill="${mixc(post,'#FFFFFF',.3)}"/>`});return d}
// 地板（亮面、有反光）
function floorGloss(y,W,H,s,c1,c2,g){return `<defs>${gl(g,c1,c2)}</defs>`+R(-400,y,W+800,H-y+10,`url(#${g})`)+`<path d="M-400 ${n(y+(H-y)*.35)} H${W+400}" stroke="#FFFFFF" stroke-width="${n(18*s)}" opacity=".12"/>`}

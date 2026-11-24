/* ================= m7b_s7art 第七季「星光城市小旅行」第四十一～四十五章 美術（預覽版：還沒接進遊戲）—— 2026-11-22 星光工作室 Starlight Studio =================
 * 著作權與 IP：本檔所有場景、角色（小貓熊、鴿子站務員、小書蟲、河馬醫生、小鱷魚牙醫、孔雀館長、變色龍小畫家……）、衣服、物品、圖樣都是星光工作室原創，
 * 著作權與 IP 屬於星光工作室 Starlight Studio。不用任何有版權的角色、品牌；不畫真實場館、真實捷運的名稱、配色、標誌，也沒有任何卡片品牌。
 * 結構照第六季 S36（season6.js）：
 *   BG41.xxx(W,H)     場景（回傳 SVG 內容字串，不含 <svg> 外框；左右各多畫 400 給寬螢幕；沒有文字；H>W 直放時重新排版；上方中間留給題目卡、右下留給主角、中間留給答案卡）
 *   BG41_CH            每章的主場景；BG41_STORY 每章拆段故事的 3～4 張場景變化；BG41_OPEN 章節開場圖；fin45 季完結大結局
 *   OBJ41[k]           題目物件 64×64；install41() 登記成 ICONART['i:s41'+k]
 *   CH41[k].f()        新朋友 100×100 全身（腳 y≈94、影子 y=96）；id 照 dev/cast.json
 *   PET41.redpanda44(a)  寵物小貓熊 120×120（頭在 .pbhead，PET41.p19 給 pet19 成長用；配件錨點 anchor）；PET41.preview(st) 三階段預覽；RPANDA44(e,a) 表情版；PET41.pose(act) 寵物小屋動作；RPANDA44STAND() 朋友版
 *   S41                衣服 dress43／b_paint43、頭飾 beret43、背包 bag41、房間 TOY.shelf42、ROOM.mypic45（牆上的「我的畫」，可放塗色本作品）、塗色 PICS、徽章 BADGE／MINI、獎狀 certHTML、hook()
 * 動畫只用遊戲現有的 rd4tw／rd4dr／rd4bob／rd4sw／rd4fall／blink；沒有整體放大縮小。
 * 開關：S41.LIVE（2026-11-24 Albert 看過預覽圖、同意，打開）；設 window.S7ART=false 可以整個換回暫代圖。 */
(function(G){'use strict';
const S41=G.S41={ver:'2026-11-24',LIVE:true};   // 2026-11-24 Albert 同意，打開
const n=v=>(+v).toFixed(1);
// 遊戲裡的變數（DRESS、BFIT、princess……）在主程式的閉包裡，模組要用 window.__ev 拿
const EV=k=>{try{return typeof G.__ev==='function'?G.__ev(k):undefined}catch(e){return undefined}};
const rng=seed=>{let x=seed;return()=>{x=(x*9301+49297)%233280;return x/233280}};
const A=(c,dl,du,ex)=>` class="${c}" style="animation-delay:${dl}s${du?`;animation-duration:${du}s`:''}${ex?';'+ex:''}"`;
const T=(x,y,s,c,extra='')=>`<g transform="translate(${n(x)} ${n(y)}) scale(${(+s).toFixed(3)})"${extra}>${c}</g>`;
let U=0;const uid=p=>'s41'+p+(++U)+Math.random().toString(36).slice(2,5);
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

/* ===================== 題目物件（64×64；沒有字、沒有品牌） ===================== */
const OBJ41={
 // 捷運列車（正面，白色車身＋薄荷綠、珊瑚粉，金色小星星）
 train:`<rect x="12" y="8" width="40" height="44" rx="12" fill="#FFFFFF" stroke="#B8BCCC" stroke-width="2"/><rect x="17" y="14" width="30" height="18" rx="5" fill="#5A6E9E"/><path d="M20 14 L28 14 L22 32 L17 32Z" fill="#FFFFFF" opacity=".25"/><rect x="12" y="35" width="40" height="5" fill="#4FC4AE"/><rect x="12" y="40" width="40" height="2.4" fill="#FF8A80"/><circle cx="20" cy="46" r="3" fill="#FFE27A"/><circle cx="44" cy="46" r="3" fill="#FFE27A"/><path d="${star5(32,10.6,2.6)}" fill="#FFCB4D"/><path d="M18 52 L14 58 M46 52 L50 58" stroke="#8A8EA8" stroke-width="3" stroke-linecap="round"/><path d="M8 58 H56" stroke="#8A8EA8" stroke-width="2.4" stroke-linecap="round"/>`,
 // 手扶梯（正面往上）
 escalator:`<path d="M14 56 L24 12 H40 L50 56Z" fill="#9EA4B8"/>${[16,22,28,34,40,46,52].map((y,k)=>`<path d="M${n(24-(y-12)*10/44)} ${y} H${n(40+(y-12)*10/44)}" stroke="#F2C94A" stroke-width="${(1+k*.25).toFixed(1)}"/>`).join('')}<path d="M10 56 L21 10 M54 56 L43 10" stroke="#2A2A3A" stroke-width="4" stroke-linecap="round"/><rect x="22" y="4" width="20" height="6" rx="2" fill="#FFF1B0"/>`,
 // 車票（圓圓的代幣）＋一張紙卡（沒有任何品牌）
 ticket:`<rect x="8" y="18" width="34" height="24" rx="4" fill="#FFFFFF" stroke="#A99BE8" stroke-width="2"/><rect x="8" y="18" width="34" height="7" rx="3" fill="#A99BE8"/><path d="M14 32 H30 M14 37 H24" stroke="#D8D0F4" stroke-width="2.4" stroke-linecap="round"/><circle cx="44" cy="38" r="12" fill="#C9B8FF" stroke="#8A76E0" stroke-width="2"/><circle cx="44" cy="38" r="7.4" fill="none" stroke="#FFFFFF" stroke-width="1.6"/><path d="${star5(44,38,4)}" fill="#FFFFFF"/>`,
 // 書
 book:`<path d="M12 14 H44 Q50 14 50 20 V52 H18 Q12 52 12 46Z" fill="#FF8A80"/><path d="M18 46 H50 V54 H18 Q14 54 14 50 Q14 46 18 46Z" fill="#FFFFFF" stroke="#E2635C" stroke-width="1.6"/><rect x="12" y="14" width="6" height="34" fill="#E2635C"/><circle cx="33" cy="28" r="7" fill="#FFCB4D"/><path d="${star5(33,28,4)}" fill="#FFFFFF"/><path d="M42 14 V26 L45 23 L48 26 V16" fill="#4FC4AE"/>`,
 // 書架
 shelf:`<rect x="8" y="6" width="48" height="52" rx="3" fill="#C8925A"/><rect x="12" y="10" width="40" height="44" fill="#8A5A30"/><path d="M12 31 H52" stroke="#C8925A" stroke-width="3"/>${[[14,'#FF8A80',16],[19,'#4FC4AE',18],[24,'#FFCB4D',15],[29,'#A99BE8',18],[34,'#7EC6F0',17],[41,'#FFB27A',14]].map(([x,c,h])=>`<rect x="${x}" y="${30-h}" width="${x===34?6:4.4}" height="${h}" rx="1" fill="${c}"/>`).join('')}${[[14,'#8FD08A',18],[19,'#F48FB8',16],[24,'#6A8AD8',18],[29,'#FFCB4D',15],[38,'#FF8A80',17],[44,'#4FC4AE',18]].map(([x,c,h])=>`<rect x="${x}" y="${53-h}" width="4.4" height="${h}" rx="1" fill="${c}"/>`).join('')}<rect x="8" y="56" width="48" height="4" rx="1" fill="#A8743E"/>`,
 // 藥袋（白色紙袋，上面只有太陽圖示）
 medbag:`<path d="M14 18 H50 L48 56 H16Z" fill="#FFFFFF" stroke="#9ACCB8" stroke-width="2"/><path d="M14 18 H50 V26 H14Z" fill="#4FC4AE"/><path d="M14 18 L20 12 H44 L50 18" fill="#E6F6F0" stroke="#9ACCB8" stroke-width="1.6"/><circle cx="32" cy="40" r="7" fill="#FFCB4D"/>${[0,60,120,180,240,300].map(a=>`<path d="M32 30 V27" stroke="#FFCB4D" stroke-width="2" stroke-linecap="round" transform="rotate(${a} 32 40)"/>`).join('')}`,
 // 牙刷
 toothbrush:`<g transform="rotate(-35 32 32)"><rect x="29" y="18" width="6" height="40" rx="3" fill="#7EC6F0"/><rect x="29" y="18" width="2" height="40" rx="1" fill="#FFFFFF" opacity=".5"/><rect x="28" y="4" width="8" height="16" rx="2" fill="#4A9AD0"/>${[7,10,13,16].map(y=>`<path d="M28 ${y} H22" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>`).join('')}<path d="M22 5 Q16 2 18 -2 Q24 0 22 5Z" fill="#BFF0FF"/></g>`,
 // 聽診器
 stetho:`<path d="M18 8 V22 Q18 36 30 36 Q42 36 42 22 V8" stroke="#4A5A8A" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="18" cy="8" r="3" fill="#8A96B8"/><circle cx="42" cy="8" r="3" fill="#8A96B8"/><path d="M30 36 V44 Q30 54 42 54" stroke="#4A5A8A" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="46" cy="52" r="8" fill="#C8D2E8" stroke="#7A86A8" stroke-width="2.4"/><circle cx="46" cy="52" r="3.4" fill="#FFFFFF"/>`,
 // 地圖（摺起來的動物園地圖）
 map:`<path d="M8 14 L22 10 L36 14 L52 10 V50 L36 54 L22 50 L8 54Z" fill="#E6F4D4" stroke="#8FBF5A" stroke-width="2" stroke-linejoin="round"/><path d="M22 10 V50 M36 14 V54" stroke="#C8E0B0" stroke-width="1.6"/><ellipse cx="30" cy="30" rx="6" ry="4" fill="#9AD8F2"/><path d="M12 46 Q20 34 30 38 T48 18" stroke="#FF8A80" stroke-width="2" fill="none" stroke-dasharray="3 2.4"/><path d="M46 14 Q42 14 42 18 Q42 22 46 26 Q50 22 50 18 Q50 14 46 14Z" fill="#FF6F6F"/><circle cx="46" cy="18" r="1.6" fill="#FFFFFF"/>`,
 // 相機
 camera:`<rect x="8" y="20" width="48" height="32" rx="6" fill="#5A6E9E"/><rect x="8" y="20" width="48" height="8" rx="4" fill="#7A8EBE"/><path d="M20 20 L24 13 H36 L40 20Z" fill="#5A6E9E"/><circle cx="32" cy="37" r="11" fill="#3A4A70"/><circle cx="32" cy="37" r="7.4" fill="#8ACBE8"/><circle cx="29" cy="34" r="2.4" fill="#FFFFFF" opacity=".8"/><rect x="44" y="23" width="7" height="4" rx="1" fill="#FFE27A"/><circle cx="14" cy="24" r="1.6" fill="#FF8A80"/>`,
 // 畫框（裡面一幅小朋友的畫）
 frame:`<rect x="6" y="10" width="52" height="44" rx="2" fill="#E8B04A" stroke="#C8862A" stroke-width="2"/><rect x="12" y="16" width="40" height="32" fill="#FFF8EC"/><g transform="translate(12 16) scale(.4 .427)">${kidArt(0)()}</g><path d="M8 12 H56" stroke="#FFF2C0" stroke-width="1.4" opacity=".8"/>`,
 // 畫筆
 brush:`<g transform="rotate(40 32 32)"><rect x="29" y="22" width="6" height="36" rx="3" fill="#C8925A"/><rect x="29" y="22" width="2" height="36" rx="1" fill="#FFFFFF" opacity=".35"/><rect x="28" y="16" width="8" height="8" fill="#C8CCDA"/><path d="M28 16 Q32 0 36 16Z" fill="#FF6F6F"/></g><path d="M8 54 Q14 46 22 52" stroke="#FF6F6F" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 // 調色盤
 palette:`<path d="M32 8 Q56 8 56 30 Q56 40 46 40 Q40 40 40 46 Q40 56 32 56 Q8 56 8 32 Q8 8 32 8Z" fill="#F2D2A0" stroke="#C89A5A" stroke-width="2"/><ellipse cx="25" cy="44" rx="5" ry="4" fill="#FFFFFF" stroke="#C89A5A" stroke-width="1.4"/>${[[20,24,'#FF6F6F'],[30,17,'#FFCB4D'],[42,20,'#4FC4AE'],[47,30,'#5A9AF0'],[16,34,'#B89CFF']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="4.6" fill="${c}"/>`).join('')}`,
 // 面紙（咳嗽打噴嚏遮口鼻）
 tissue:`<rect x="10" y="28" width="44" height="26" rx="5" fill="#BFE6F4" stroke="#7EC6F0" stroke-width="2"/><ellipse cx="32" cy="30" rx="10" ry="3" fill="#7EC6F0"/><path d="M24 30 Q22 16 32 12 Q42 16 40 30" fill="#FFFFFF" stroke="#D8E2F0" stroke-width="1.6"/><path d="M14 46 Q32 50 50 46" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".6"/>`,
 // 藥水瓶（藥不是糖果）
 syrup:`<path d="M24 10 H40 V18 Q46 22 46 30 V52 Q46 56 42 56 H22 Q18 56 18 52 V30 Q18 22 24 18Z" fill="#FFB8A8" stroke="#E2635C" stroke-width="2"/><rect x="22" y="6" width="20" height="7" rx="2" fill="#FFFFFF" stroke="#C8CCDA" stroke-width="1.4"/><rect x="18" y="32" width="28" height="14" fill="#FFFFFF" opacity=".9"/><path d="${heartP(32,39,5)}" fill="#4FC4AE"/><path d="M22 22 Q20 34 22 50" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>`,
 // 糖果（跟藥水比一比）
 candy:`<path d="M10 24 L20 30 L10 36Z M54 24 L44 30 L54 36Z" fill="#FF8FB8"/><circle cx="32" cy="30" r="13" fill="#FF8FB8"/><path d="M22 24 Q32 16 42 26 M22 34 Q32 26 42 36" stroke="#FFFFFF" stroke-width="2.4" fill="none"/>`,
 // 號碼牌（只有一顆星星，沒有數字）
 numtag:`<rect x="14" y="10" width="36" height="46" rx="5" fill="#FFFFFF" stroke="#4FC4AE" stroke-width="2.4"/><rect x="14" y="10" width="36" height="10" rx="4" fill="#4FC4AE"/><circle cx="32" cy="38" r="10" fill="#FFF1B0"/><path d="${star5(32,38,7)}" fill="#FFCB4D"/><circle cx="32" cy="15" r="2" fill="#FFFFFF"/>`,
 // 圖書館的借書證（只有圖，沒有字）＋還書時間的小月曆
 libcard:`<rect x="8" y="16" width="48" height="32" rx="4" fill="#7E8ED8"/><rect x="8" y="16" width="48" height="8" rx="3" fill="#5A6AB8"/><circle cx="20" cy="36" r="6" fill="#FFFFFF"/><circle cx="20" cy="34.4" r="2.4" fill="#7E8ED8"/><path d="M15.6 40.6 Q20 37 24.4 40.6" fill="#7E8ED8"/><path d="M30 32 H48 M30 38 H44" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" opacity=".85"/><path d="M42 18 Q38 14 34 18 Q30 14 26 18 V22 Q30 20 34 22 Q38 20 42 22Z" fill="#FFFFFF" opacity=".9"/>`,
 // 長頸鹿、大象（題目小圖；動物園那章用）
 get elephant(){try{if(G.ZOO8)return `<g transform="translate(-2 -6) scale(.68)">${G.ZOO8.draw('elephant','stand')}</g>`}catch(e){}return zooElephant(28,58,.34,{f:1})},
 get giraffe(){try{if(G.ZOO8)return `<g transform="translate(-2 -6) scale(.68)">${G.ZOO8.draw('giraffe','stand')}</g>`}catch(e){}return zooGiraffe(26,62,.25,{f:1})},
 // 服務台的集合點旗子
 meetflag:`<path d="M20 58 V8" stroke="#8A92A8" stroke-width="3.4" stroke-linecap="round"/><path d="M21 10 L50 18 L21 28Z" fill="#FFCB4D" stroke="#E0A020" stroke-width="1.4"/><circle cx="20" cy="6" r="3" fill="#FF8A80"/><ellipse cx="20" cy="58" rx="12" ry="3" fill="#C8CCDA"/>`,
 // 不開閃光燈、不摸畫（美術館的圖示）
 noflash:`<circle cx="32" cy="32" r="26" fill="#FFFFFF" stroke="#FF6A5A" stroke-width="4"/><rect x="16" y="24" width="32" height="20" rx="3" fill="#5A6E9E"/><circle cx="32" cy="34" r="6" fill="#8ACBE8"/><path d="M40 16 L35 23 H40 L35 30" stroke="#FFCB4D" stroke-width="2.4" fill="none" stroke-linejoin="round"/><path d="M14 14 L50 50" stroke="#FF6A5A" stroke-width="4" stroke-linecap="round"/>`};
const OBJ41_NAME={train:'捷運列車',escalator:'手扶梯',ticket:'車票',book:'書',shelf:'書架',medbag:'藥袋',toothbrush:'牙刷',stetho:'聽診器',map:'地圖',camera:'相機',frame:'畫框',brush:'畫筆',palette:'調色盤',tissue:'面紙',syrup:'藥水',candy:'糖果',numtag:'號碼牌',libcard:'借書證',elephant:'大象',giraffe:'長頸鹿',meetflag:'集合點旗子',noflash:'不開閃光燈'};
G.OBJ41=OBJ41;G.OBJ41_NAME=OBJ41_NAME;
// 登記成遊戲的圖示 ICONART['i:s41'+k]（LIVE 開了才做；預覽頁可以直接用 OBJ41）
G.install41=function(force){try{if(!S41.LIVE&&!force)return;const IA=EV('ICONART');if(!IA)return;Object.keys(OBJ41).forEach(k=>{try{Object.defineProperty(IA,'i:s41'+k,{configurable:true,enumerable:true,get(){return `<svg viewBox="0 0 64 64" aria-hidden="true">${OBJ41[k]}</svg>`},set(v){}})}catch(e){}})}catch(e){console.log('install41',e)}};

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

/* ===================== 1. 新朋友（100×100 全身；腳 y≈94、影子 y=96；比照 m99zzzy 的身體比例，畫得更有光影） ===================== */
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
// 衣服小零件
const OUT={
 labcoat:(c='#FFFFFF',e='#D4DCEC')=>`<path d="M37 57 Q30 70 33 85 Q41 88 47 87 L50 61 L53 87 Q59 88 67 85 Q70 70 63 57 L56 54.6 L50 63 L44 54.6Z" fill="${c}" stroke="${e}" stroke-width=".8"/><path d="M44 54.6 L47.6 66 L50 63 M56 54.6 L52.4 66 L50 63" fill="${mixc(c,'#000000',.06)}" stroke="${e}" stroke-width=".6"/><rect x="55" y="72" width="7.4" height="6" rx="1.2" fill="${mixc(c,'#000000',.04)}" stroke="${e}" stroke-width=".6"/><path d="M57 72 V67.6" stroke="#FF8A80" stroke-width="1.6" stroke-linecap="round"/><circle cx="48.4" cy="72" r="1" fill="${e}"/><circle cx="48.4" cy="79" r="1" fill="${e}"/>`,
 scrubs:(c,e)=>`<path d="M37.6 57 Q31 70 34 83 Q50 89 66 83 Q69 70 62.4 57 Q56 54 50 63 Q44 54 37.6 57Z" fill="${c}"/><path d="M44 55.6 L50 63 L56 55.6" stroke="${e}" stroke-width="1.4" fill="none"/><rect x="40" y="68" width="7" height="6" rx="1.2" fill="${mixc(c,'#FFFFFF',.25)}" stroke="${e}" stroke-width=".6"/>`,
 vest:(c,e,badge)=>`<path d="M37.6 57 Q31 70 34 82 Q50 88 66 82 Q69 70 62.4 57 L56 55 L50 66 L44 55Z" fill="${c}" stroke="${e}" stroke-width=".7"/><path d="M34.6 74 Q50 79 65.4 74" stroke="${e}" stroke-width="2.4" fill="none"/>${badge||''}`,
 stetho:`<path d="M42 57 Q40 68 47 70 M58 57 Q60 68 53 70" stroke="#4A5A8A" stroke-width="1.8" fill="none"/><path d="M47 70 Q50 72 53 70" stroke="#4A5A8A" stroke-width="1.8" fill="none"/><path d="M50 71 V77" stroke="#4A5A8A" stroke-width="1.8"/><circle cx="50" cy="79" r="2.8" fill="#C8D2E8" stroke="#7A86A8" stroke-width="1.1"/>`,
 bow:(c)=>`<path d="M50 57.6 L43.6 54 V61.4Z M50 57.6 L56.4 54 V61.4Z" fill="${c}"/><circle cx="50" cy="57.6" r="1.9" fill="${mixc(c,'#000000',.2)}"/>`,
 apron:(c,e)=>`<path d="M41 59 H59 V84 Q50 87 41 84Z" fill="${c}" stroke="${e}" stroke-width=".7"/><path d="M41 59 L39 55 M59 59 L61 55" stroke="${c}" stroke-width="2"/>${[[45,66,'#FF8A80'],[54,63,'#4FC4AE'],[48,76,'#FFCB4D'],[56,74,'#7EC6F0'],[43,79,'#A99BE8']].map(([x,y,cc])=>`<path d="M${x} ${y} q2 -2.6 3.6 0 q1.4 2.4 -1 3.4 q-3 .6 -2.6 -3.4Z" fill="${cc}"/>`).join('')}`};
const PROP={
 clipboard:(x,y)=>`<g transform="translate(${x} ${y}) rotate(8)"><rect x="-7" y="-9" width="14" height="18" rx="1.6" fill="#C8925A"/><rect x="-5.4" y="-6.6" width="10.8" height="14" rx="1" fill="#FFFFFF"/><rect x="-3" y="-10.6" width="6" height="3.4" rx="1" fill="#8A96B8"/><path d="M-3.4 -2 H3.4 M-3.4 1.4 H3.4 M-3.4 4.6 H1.4" stroke="#BFD8F0" stroke-width="1.1"/><path d="${heartP(2.8,-3.6,1.6)}" fill="#FF8A80"/></g>`,
 toothbrush:(x,y)=>`<g transform="translate(${x} ${y}) rotate(-28)"><rect x="-2" y="-4" width="4" height="22" rx="2" fill="#7EC6F0"/><rect x="-2" y="-4" width="1.4" height="22" rx=".7" fill="#FFFFFF" opacity=".5"/><rect x="-3" y="-15" width="6" height="11" rx="1.4" fill="#4A9AD0"/>${[-12,-9,-6].map(yy=>`<path d="M-3 ${yy} h-4" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>`).join('')}<path d="M-7 -14 Q-10 -18 -6 -20 Q-2 -18 -4 -14Z" fill="#BFF0FF"/></g>`,
 radio:(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-4.4" y="-7" width="8.8" height="14" rx="2" fill="#4A5A6A"/><rect x="-3" y="-4.6" width="6" height="4" rx="1" fill="#8AF0B0"/><path d="M2 -7 V-13" stroke="#4A5A6A" stroke-width="1.6" stroke-linecap="round"/><circle cx="0" cy="3" r="1.2" fill="#FFCB4D"/></g>`,
 palette:(x,y)=>`<g transform="translate(${x} ${y}) rotate(-12)"><path d="M0 -10 Q12 -10 12 0 Q12 5 7 5 Q3 5 3 8 Q3 11 0 11 Q-12 11 -12 0 Q-12 -10 0 -10Z" fill="#F2D2A0" stroke="#C89A5A" stroke-width="1"/><ellipse cx="-3" cy="5" rx="2.4" ry="1.8" fill="#FFFFFF" stroke="#C89A5A" stroke-width=".6"/>${[[-6,-4,'#FF6F6F'],[-1,-6.4,'#FFCB4D'],[5,-5,'#4FC4AE'],[7,0,'#5A9AF0'],[-7,2,'#B89CFF']].map(([a,b,c])=>`<circle cx="${a}" cy="${b}" r="2.2" fill="${c}"/>`).join('')}</g>`,
 brush:(x,y,c='#FF8A80')=>`<g transform="translate(${x} ${y}) rotate(30)"><rect x="-1.4" y="-4" width="2.8" height="18" rx="1.4" fill="#C8925A"/><rect x="-1.8" y="-7" width="3.6" height="4" fill="#C8CCDA"/><path d="M-1.8 -7 Q0 -15 1.8 -7Z" fill="${c}"/></g>`,
 guide:(x,y)=>`<g transform="translate(${x} ${y}) rotate(-8)"><rect x="-8" y="-6" width="16" height="12" rx="1.4" fill="#FFFFFF" stroke="#C8962A" stroke-width="1"/><path d="M0 -6 V6" stroke="#C8962A" stroke-width=".8"/><rect x="-6" y="-3.6" width="4.6" height="4" fill="#FF8A80"/><rect x="2" y="-3.6" width="4.6" height="4" fill="#4FC4AE"/><path d="M-6 3 H-2 M2 3 H6" stroke="#C9D8F0" stroke-width=".9"/></g>`,
 books:(x,y)=>`<g transform="translate(${x} ${y})">${[['#FF8A80',0],['#4FC4AE',-4.6],['#FFCB4D',-9.2]].map(([c,yy],k)=>`<rect x="${-9+k}" y="${yy-4}" width="${18-k*2}" height="4.4" rx="1" fill="${c}"/><rect x="${-9+k}" y="${yy-4}" width="2" height="4.4" fill="#FFFFFF" opacity=".45"/>`).join('')}</g>`};

// --- 鴿子站務員嚕嚕（pigeon41）：灰藍色圓滾滾、脖子一圈綠紫亮羽毛、橘色小腳；深藍制服外套（兩排金扣子）、深藍大盤帽＋金色小星星、白色名牌（只有色塊）；一隻翅膀指路，一隻翅膀拿小路線圖 ---
function pigeonAN(){const g=uid('pg');const c='#B9BEDA',c2='#8E94BC',lt='#DCDFF0';
 return `<defs>${rg(g+'b',[[0,lt],[.6,c],[1,c2]],.38,.3,.8)}${lg(g+'n',[[0,'#7FD6B0'],[.5,'#9A86E0'],[1,'#7FD6B0']],1,0)}${lg(g+'v',[[0,'#3E5A8E'],[1,'#26396A']])}</defs>${shd(50,96,20,3.4)}
 <path d="M38 84 L28 94 L36 92 L40 96 L44 86Z" fill="${c2}"/>
 <path d="M44 86 V93 M56 86 V93" stroke="#FF9A4A" stroke-width="2.6" stroke-linecap="round"/><path d="M40 94 h8 M52 94 h8" stroke="#FF9A4A" stroke-width="2.2" stroke-linecap="round"/>
 <ellipse cx="50" cy="70" rx="19" ry="20" fill="url(#${g}b)"/>
 <path d="M33.6 62 Q30 74 35 84 Q50 91 65 84 Q70 74 66.4 62 Q60 57 50 57 Q40 57 33.6 62Z" fill="url(#${g}v)"/>
 <path d="M43 57.6 L50 66 L57 57.6" fill="#FFFFFF"/><path d="M43 57.6 L47 70 L50 66 M57 57.6 L53 70 L50 66" fill="#33508A" stroke="#1E2E56" stroke-width=".6"/>
 ${[69,75,81].map(y=>`<circle cx="46" cy="${y}" r="1.4" fill="${C7.gold}"/><circle cx="54" cy="${y}" r="1.4" fill="${C7.gold}"/>`).join('')}
 <rect x="56.6" y="64.6" width="8" height="4" rx="1" fill="#FFFFFF"/><rect x="57.6" y="65.6" width="2.4" height="2" fill="${C7.mint}"/>
 <g transform="rotate(-14 28 78)"><rect x="18" y="72" width="16" height="12" rx="1.6" fill="#FFFFFF" stroke="#C8CCDA" stroke-width=".8"/><path d="M20 81 L24 76 L28 79 L32 74" stroke="${C7.mint}" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="20" cy="81" r="1.3" fill="${C7.coral}"/><circle cx="32" cy="74" r="1.3" fill="${C7.gold}"/></g>
 <path d="M34 64 Q22 70 24 80 Q30 84 36 76Z" fill="${c}"/><path d="M26 74 Q29 79 34 78" stroke="${c2}" stroke-width="1.1" fill="none"/>
 <g class="rd4sw" style="animation-duration:2.4s;transform-origin:66px 62px"><path d="M66 62 Q78 56 86 44 Q78 42 64 54Z" fill="${c}"/><path d="M86 44 Q80 48 72 50 M84 47 Q78 52 70 54" stroke="${c2}" stroke-width="1.1" fill="none"/></g>
 <path d="M40 52 Q50 60 60 52 L60 46 Q50 52 40 46Z" fill="url(#${g}n)"/>
 <circle cx="50" cy="33" r="17" fill="url(#${g}b)"/>
 <ellipse cx="50" cy="35.6" rx="3.4" ry="1.8" fill="#F4F2FA"/><path d="M46.4 37 Q50 35.6 53.6 37 Q52 41.6 50 42.4 Q48 41.6 46.4 37Z" fill="#E8A08A"/>
 ${eyes2(44,56,31,3.4,3.9)}<circle cx="44" cy="31" r="4.6" fill="none" stroke="#FFB36A" stroke-width=".9" opacity=".8"/><circle cx="56" cy="31" r="4.6" fill="none" stroke="#FFB36A" stroke-width=".9" opacity=".8"/>
 ${cheek(40,39,3,'#FF9FB8',.5)}${cheek(60,39,3,'#FF9FB8',.5)}${smile(50,44.6,2.4,1.4,'#6A4A5A',1.1)}
 <path d="M32 24 Q32 10 50 9 Q68 10 68 24 Q60 20 50 20 Q40 20 32 24Z" fill="url(#${g}v)"/><path d="M30 24 Q50 17 70 24 L70.6 27.6 Q50 21.6 29.4 27.6Z" fill="#1E2E56"/><path d="M38 26.4 Q50 22.6 62 26.4 Q58 31 50 31 Q42 31 38 26.4Z" fill="#14203E"/>
 <g class="rd4tw" style="animation-duration:3s"><path d="${star5(50,15.6,3.6)}" fill="${C7.gold}"/></g><path d="M37 15 Q43 12 47 12" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity=".4" stroke-linecap="round"/>`}
// --- 貓頭鷹館員書書（owl42）：遊戲原本的貓頭鷹為底，金框圓眼鏡、綠色針織背心、館員名牌（色塊），一邊抱三本繪本、一邊羽毛放在嘴前「噓～」（溫柔的笑） ---
function owlLibAN(){const vest=`<path d="M27 52 Q24 72 34 86 L45 86 L46 62 Q38 54 27 52Z M73 52 Q76 72 66 86 L55 86 L54 62 Q62 54 73 52Z" fill="#5AAE6A" stroke="#3E8A4E" stroke-width=".8"/>${[60,66,72,78].map(y=>`<path d="M${30+(y-60)*.1} ${y} q2 2 4 0 q2 2 4 0 M${62-(y-60)*.1} ${y} q2 2 4 0 q2 2 4 0" stroke="#8ED09A" stroke-width=".8" fill="none"/>`).join('')}<rect x="57" y="66" width="9" height="5" rx="1" fill="#FFFFFF"/><rect x="58" y="67" width="3" height="3" fill="${C7.coral}"/>`;
 const shh=`<path d="M76 70 Q74 56 62 50 Q56 47 54.6 49.6 Q54 52 58 53 Q66 57 68 72Z" fill="#8E70C8"/><path d="M56 50.4 L52.6 49.4 M56.6 52.4 L53.4 52.8" stroke="#8E70C8" stroke-width="2.4" stroke-linecap="round"/><path d="M70 62 Q66 58 62 56" stroke="#B9A0E8" stroke-width="1" fill="none"/>`;
 const glasses=`<g fill="none" stroke="#E0A830" stroke-width="1.9"><circle cx="39.6" cy="38.4" r="10"/><circle cx="60.4" cy="38.4" r="10"/><path d="M49.6 38 Q50 36.4 50.4 38"/></g><path d="M33 33 Q36 30 40 30.6 M54 33 Q57 30 61 30.6" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".8" stroke-linecap="round"/>`;
 try{if(typeof G.fullBody==='function')return G.fullBody('owl',{front:vest+PROP.books(26,80)+glasses+shh}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}catch(e){}
 return `<circle cx="50" cy="44" r="26" fill="#9F82D6"/>${eyes2(41,59,40,5,5.6)}`}
// --- 小書蟲翻翻（bookworm42）：淺綠、四節圓圓的身體、大頭、紅臉頰、紅色小毛帽；站起來抱著一本打開的書（沒有蟲腳） ---
function bookwormAN(){const g=uid('bw');const c='#B8E07A',c2='#86BE52',lt='#E8F8C0';
 const seg=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.92}" fill="url(#${g}s)"/><circle cx="${n(x-r*.35)}" cy="${n(y-r*.4)}" r="${n(r*.26)}" fill="#FFFFFF" opacity=".4"/>`;
 return `<defs>${rg(g+'s',[[0,lt],[.6,c],[1,c2]],.38,.32,.75)}${lg(g+'p',[[0,'#FFFFFF'],[1,'#F2EAD8']])}</defs>${shd(50,96,20,3.4)}
 ${seg(60,88,9)}${seg(54,78,10)}${seg(50,67,11)}${seg(50,56,11.4)}
 <circle cx="50" cy="34" r="19" fill="url(#${g}s)"/>
 <path d="M31 30 Q30 12 50 11 Q70 12 69 30 Q60 24 50 24 Q40 24 31 30Z" fill="#E8505A"/><path d="M30 29 Q50 21 70 29 L70 33 Q50 25 30 33Z" fill="#C83A48"/>${[34,40,46,52,58,64].map(x=>`<path d="M${x} 30 V${x<50?26:26}" stroke="#F47A84" stroke-width="1" opacity=".7"/>`).join('')}<circle cx="50" cy="10" r="4" fill="#FFFFFF"/><path d="M38 18 Q44 14 50 14" stroke="#FF8A94" stroke-width="1.4" fill="none" stroke-linecap="round"/>
 ${eyes2(43,57,37,3.6,4.2)}${cheek(36,44,3.8,'#FF7A8A',.6)}${cheek(64,44,3.8,'#FF7A8A',.6)}${smile(50,45,3,2.4)}
 <g transform="rotate(-6 50 72)"><path d="M50 64 Q40 60 30 63 V80 Q40 77 50 81Z" fill="url(#${g}p)" stroke="#E2D2B0" stroke-width="1"/><path d="M50 64 Q60 60 70 63 V80 Q60 77 50 81Z" fill="url(#${g}p)" stroke="#E2D2B0" stroke-width="1"/><path d="M33 67 H46 M33 71 H46 M33 75 H44 M54 67 H67 M54 71 H65" stroke="#C9D8F0" stroke-width="1"/><circle cx="61" cy="75" r="2.4" fill="${C7.coral}"/><path d="M30 80 Q40 77 50 81 Q60 77 70 80 V82.4 Q60 79.4 50 83.4 Q40 79.4 30 82.4Z" fill="#7EC6F0"/>
  <ellipse cx="30.6" cy="71" rx="3.4" ry="4" fill="${c}"/><ellipse cx="69.4" cy="71" rx="3.4" ry="4" fill="${c}"/></g>`}
// --- 河馬醫生波波（hippo43）：淡紫灰、小圓耳朵、大嘴巴溫和的笑；白袍（袖口捲起）、淺藍聽診器（星星形狀的聽頭）、口袋插筆和星星貼紙；手掌朝上 ---
function hippoAN(){const g=uid('hp');const c='#B9AEDC',c2='#958ABF',mz='#F0CFE0';
 const head=`<defs>${rg(g+'h',[[0,mixc(c,'#FFFFFF',.4)],[.6,c],[1,c2]],.4,.3,.8)}${rg(g+'m',[[0,'#FFE8F2'],[1,mz]],.45,.3,.8)}</defs>
 <circle cx="33" cy="14" r="5" fill="${c}"/><circle cx="67" cy="14" r="5" fill="${c}"/><circle cx="33" cy="14.4" r="2.6" fill="#F4B8CC"/><circle cx="67" cy="14.4" r="2.6" fill="#F4B8CC"/>
 <ellipse cx="50" cy="28" rx="21" ry="18" fill="url(#${g}h)"/>
 <ellipse cx="50" cy="43" rx="24" ry="15" fill="url(#${g}m)"/>
 <ellipse cx="42" cy="36" rx="2.4" ry="1.7" fill="#9A6A8A"/><ellipse cx="58" cy="36" rx="2.4" ry="1.7" fill="#9A6A8A"/>
 ${eyes2(42,58,25,3.4,4)}${cheek(30,40,3.6)}${cheek(70,40,3.6)}
 <path d="M38 46 Q50 56 62 46" stroke="#7A4A6A" stroke-width="1.7" fill="#FF9FB4" stroke-linecap="round"/><path d="M45.6 47.6 h3.6 v2.4 q0 1 -1 1 h-1.6 q-1 0 -1 -1Z M50.8 47.6 h3.6 v2.4 q0 1 -1 1 h-1.6 q-1 0 -1 -1Z" fill="#FFFFFF"/>`;
 const steth=`<path d="M42 57 Q40 68 47 70 M58 57 Q60 68 53 70" stroke="#7EC6F0" stroke-width="2" fill="none"/><path d="M47 70 Q50 72 53 70 M50 71 V76" stroke="#7EC6F0" stroke-width="2" fill="none"/><path d="${star5(50,79,4.2)}" fill="#DDF0FF" stroke="#5AA6D0" stroke-width="1"/>`;
 const pocket=`<path d="M58 70 V66" stroke="${C7.coral}" stroke-width="1.6" stroke-linecap="round"/><path d="${star5(60.6,75,1.8)}" fill="${C7.gold}"/>`;
 const palm=`<ellipse cx="74" cy="68" rx="5.4" ry="3" fill="#D8D0F0"/><path d="M70 66.6 Q74 64.6 78 66.6" stroke="${c2}" stroke-width=".8" fill="none"/>`;
 const cuff=`<path d="M28.6 76.4 Q32 74.6 35.6 76.4 M68.4 69 Q72 67 75.6 69" stroke="#E2E8F4" stroke-width="3" stroke-linecap="round"/>`;
 return body7({c,c2,belly:'',hand:mixc(c,'#FFFFFF',.15),feet:c2,pose:'side',sleeve:'#FFFFFF',outfit:OUT.labcoat()+steth+pocket,front:cuff+palm,head})}
// --- 小鱷魚牙醫咔咔（croc43）：亮綠、短短胖胖、圓眼睛、背上圓圓的小凸點；笑開一排白白圓圓的牙齒；淺藍口罩拉到下巴、頭上圓圓的小反光鏡頭燈、大牙刷 ---
function crocAN(){const g=uid('cr');const c='#62C85C',c2='#3E9E44',bl='#E6F6C4';
 const head=`<defs>${rg(g+'h',[[0,mixc(c,'#FFFFFF',.38)],[.6,c],[1,c2]],.4,.3,.85)}</defs>
 <circle cx="38" cy="18" r="9" fill="url(#${g}h)"/><circle cx="62" cy="18" r="9" fill="url(#${g}h)"/>
 <path d="M24 36 Q22 22 36 22 H64 Q78 22 76 36 Q76 50 50 52 Q24 50 24 36Z" fill="url(#${g}h)"/>
 <path d="M28 42 Q50 50 72 42 Q70 50 50 52 Q30 50 28 42Z" fill="${bl}"/>
 ${eyes2(38,62,17.6,3.6,4.2)}
 <ellipse cx="44" cy="28" rx="1.4" ry="1" fill="${c2}"/><ellipse cx="56" cy="28" rx="1.4" ry="1" fill="${c2}"/>
 <path d="M30 37 Q50 47 70 37 Q66 44 50 45 Q34 44 30 37Z" fill="#7A3A3A"/>${[35,40.4,45.8,51.2,56.6,62].map((x,k)=>`<path d="M${x} ${n(38.6+Math.sin(k/5*Math.PI)*3.6)} h4 v1.6 a2 2 0 0 1 -4 0Z" fill="#FFFFFF"/>`).join('')}
 <path d="M32 44.4 Q50 54 68 44.4 L67 49 Q50 56.6 33 49Z" fill="#A8DCF4" stroke="#6AB0D8" stroke-width=".8"/><path d="M32 46 L26 42 M68 46 L74 42" stroke="#6AB0D8" stroke-width="1"/>
 ${cheek(27,33,3.4)}${cheek(73,33,3.4)}
 <path d="M30 12 Q50 2 70 12" stroke="#8A96B8" stroke-width="2.2" fill="none"/><circle cx="50" cy="7.6" r="5.4" fill="#E8F4FF" stroke="#8A96B8" stroke-width="1.2"/><circle cx="48.6" cy="6.2" r="1.8" fill="#FFFFFF"/>
 ${[[44,23],[50,22],[56,23]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="${c2}" opacity=".45"/>`).join('')}`;
 const tail=`<path d="M62 84 Q78 88 86 80 Q90 76 86 74 Q82 80 66 78Z" fill="${c2}"/>${[70,76,82].map(x=>`<circle cx="${x}" cy="${n(82-(x-70)*.4)}" r="1.8" fill="${c}"/>`).join('')}`;
 const back=`${[[36,58],[33,66],[64,58],[67,66]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="${c2}"/>`).join('')}`;
 return body7({c,c2,belly:bl,hand:mixc(c,'#FFFFFF',.15),feet:c2,pose:'wave',back,coat:'#FFFFFF',coat2:'#D8E8F0',sleeve:'#FFFFFF',outfit:OUT.labcoat('#FFFFFF','#C8DCE8'),prop:PROP.toothbrush(74,44),tail,head})}
// --- 孔雀館長羽羽（peacock45）：寶藍身體、三根小冠羽；尾巴半開成扇形，「眼睛」花紋是一個一個小小的彩色畫框；金色小領結、金色星星胸針；一隻翅膀往旁邊伸「請進」 ---
function peacockAN(){const g=uid('pc');const c='#4A86E0',c2='#2E5EB8';
 let fan=`<defs>${rg(g+'f',[[0,'#8FE0B0'],[.6,'#3EAE8A'],[1,'#2A8A70']],.5,1,1)}${rg(g+'h',[[0,'#8AB8F4'],[.6,c],[1,c2]],.4,.3,.8)}</defs><g class="rd4sw" style="animation-duration:5s;transform-origin:50px 78px"><path d="M50 78 L4 56 Q2 22 28 8 Q50 -2 72 8 Q98 22 96 56Z" fill="url(#${g}f)"/>`;
 const FC=['#FF6F6F','#FFCB4D','#6CD08A','#B89CFF'];
 for(let k=0;k<11;k++){const a=(-162+k*14.4)*Math.PI/180,r=42;const x=50+Math.cos(a)*r,y=76+Math.sin(a)*r*1.45;const rot=n(a*180/Math.PI+90);
  fan+=`<path d="M50 74 L${n(x)} ${n(y)}" stroke="#6AC89A" stroke-width=".8" opacity=".7"/><g transform="translate(${n(x)} ${n(y)}) rotate(${rot})"><rect x="-5.4" y="-6.4" width="10.8" height="12.8" rx="1.2" fill="#F2C94A"/><rect x="-3.6" y="-4.6" width="7.2" height="9.2" fill="${FC[k%4]}"/><circle cx="0" cy="0" r="1.6" fill="#FFFFFF" opacity=".7"/></g>`}
 fan+='</g>';
 const head=`<path d="M45 58 Q44 46 48 40 L54 40 Q57 48 55 58Z" fill="url(#${g}h)"/>
 <path d="M47 18 Q44 8 40 4 M50 17 V2 M53 18 Q56 8 60 4" stroke="${c2}" stroke-width="1.2" fill="none"/>${[[40,4],[50,2],[60,4]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="3.4" fill="#3EC8A8"/><circle cx="${x}" cy="${y}" r="1.2" fill="#2A3A8A"/>`).join('')}
 <ellipse cx="50" cy="30" rx="15" ry="14" fill="url(#${g}h)"/>
 <path d="M38 28 Q42 21 48 26 Q44 34 38 31Z M62 28 Q58 21 52 26 Q56 34 62 31Z" fill="#FFFFFF"/>
 `;
 return body7({c,c2,belly:'#7FB0F0',hand:'#5A96E8',feet:'#C8A880',pose:'side',back:fan,outfit:OUT.bow(C7.gold)+`<path d="${star5(57,68,3)}" fill="${C7.gold}" stroke="#E0962A" stroke-width=".6"/>`,front:`<path d="M66 64 Q76 62 82 68 Q76 72 68 70Z" fill="${c}"/><path d="M74 66 l8 1 M74 69 l7 2" stroke="${c2}" stroke-width=".8"/>`,head:head+eyes2(44,56,28,2.8,3.4)+`<path d="M48 33 Q50 31 52 33 L50 38Z" fill="#E8C888"/>${cheek(39,35,2.6)}${cheek(61,35,2.6)}`,sh:30})}
// --- 變色龍小畫家變變（chameleon45）：淺綠、捲成一圈的尾巴、大圓眼睛（圓錐形眼皮）、身上淡淡的粉黃藍斑點（會換顏色）；紅貝雷帽、沾了顏料的白色小罩衫、調色盤和畫筆 ---
function chamAN(){const g=uid('ch');const c='#9EE0A8',c2='#5AB86A';
 const spots=(o=0)=>[[40,22,'#FFB8D0'],[60,20,'#FFE68A'],[30,40,'#A8D8FF'],[70,42,'#FFB8D0'],[52,48,'#A8D8FF']].map(([x,y,cc],k)=>`<ellipse class="rd4tw" style="animation-delay:${k*.7}s;animation-duration:4s" cx="${x}" cy="${y}" rx="3.4" ry="2.6" fill="${cc}" opacity=".85"/>`).join('');
 const head=`<defs>${rg(g+'h',[[0,'#D2F6D6'],[.6,c],[1,c2]],.4,.3,.85)}${rg(g+'e',[[0,'#E2FAE6'],[1,c]],.4,.35,.7)}</defs>
 <path d="M26 34 Q24 18 44 16 Q56 10 66 18 Q78 24 76 36 Q74 50 52 52 Q30 52 26 34Z" fill="url(#${g}h)"/>${spots()}
 <path d="M24 30 L36 20 L46 30 L36 40Z" fill="url(#${g}e)" transform="rotate(-8 36 30)"/><path d="M54 30 L64 20 L76 30 L64 40Z" fill="url(#${g}e)" transform="rotate(8 64 30)"/>
 <circle cx="36" cy="30" r="8" fill="url(#${g}e)" stroke="${c2}" stroke-width="1.2"/><circle cx="64" cy="30" r="8" fill="url(#${g}e)" stroke="${c2}" stroke-width="1.2"/>
 ${eyes2(37,65,30,4,4.4)}
 ${openSmile(51,41,6,3.6)}${cheek(29,40,3.6)}${cheek(73,40,3.6)}
 <path d="M34 18 Q30 6 48 4 Q68 2 72 12 Q72 18 62 18 L40 19 Q34 19 34 18Z" fill="#E8505A"/><path d="M36 17 Q54 21 70 16 L70 19 Q54 24 36 20Z" fill="#B83440"/><path d="M50 4 Q50 0 53 1 Q54 3 52 4Z" fill="#B83440"/><path d="M40 10 Q46 6 54 5.6" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity=".45" stroke-linecap="round"/>`;
 const tail=`<path d="M62 84 Q80 86 84 76 Q88 64 78 62 Q70 62 71 69 Q72 74 77 72 Q80 70 78 67" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 84 Q80 86 84 76" stroke="${c2}" stroke-width="1.4" fill="none" opacity=".5"/>`;
 const smock=`<path d="M37 57 Q30 70 33 85 Q50 90 67 85 Q70 70 63 57 Q50 53 37 57Z" fill="#FFFFFF" stroke="#DCE2EC" stroke-width=".8"/><path d="M44 56 Q50 61 56 56" stroke="#DCE2EC" stroke-width="1.2" fill="none"/>${[[42,68,'#FF6F6F'],[56,64,'#FFCB4D'],[48,78,'#5A9AF0'],[60,76,'#B89CFF'],[52,70,'#4FC4AE']].map(([x,y,cc],k)=>blob(x,y,1.6,cc,k*40)).join('')}`;
 return body7({c,c2,belly:'',hand:'#B8EEC0',feet:c2,pose:'side',sleeve:'#FFFFFF',outfit:smock,prop:PROP.palette(30,78)+PROP.brush(74,66),tail,head}).replace(`<circle cx="32" cy="79" r="4.2"`,`<circle cx="32" cy="79" r="0"`)}
// --- 黑熊保育員阿森（keeper44）：遊戲原本的台灣黑熊為底；卡其色短袖制服（胸前兩個口袋、肩上兩條肩章）、同色圓邊帽、綠色掛繩名牌（色塊＋一片小葉子）、拿摺開的動物園地圖、腰上一個小無線電 ---
function keeperAN(){const k1='#D8BE84',k2='#B89A5E';
 const shirt=`<path d="M37 57 Q31 70 34 83 Q50 89 66 83 Q69 70 63 57 L56 55 L50 64 L44 55Z" fill="${k1}"/><path d="M44 55 L50 64 L56 55" fill="#F4EEE2"/><path d="M44 55 L47.6 62 L50 64 M56 55 L52.4 62 L50 64" stroke="${k2}" stroke-width=".8" fill="none"/>
  <rect x="40" y="64" width="7" height="6" rx="1" fill="${k1}" stroke="${k2}" stroke-width=".7"/><rect x="53" y="64" width="7" height="6" rx="1" fill="${k1}" stroke="${k2}" stroke-width=".7"/><path d="M40 66 H47 M53 66 H60" stroke="${k2}" stroke-width=".6"/>
  <rect x="36" y="56.6" width="7" height="2.4" rx="1" fill="${k2}" transform="rotate(-20 39 58)"/><rect x="57" y="56.6" width="7" height="2.4" rx="1" fill="${k2}" transform="rotate(20 61 58)"/>
  <path d="M45 56 L48 72 M55 56 L52 72" stroke="#3EA05A" stroke-width="1.4"/><rect x="46" y="71" width="8" height="9" rx="1.2" fill="#FFFFFF" stroke="#3EA05A" stroke-width=".8"/><path d="M50 74 Q47 77 50 79 Q53 77 50 74Z" fill="#5AB86A"/>
  <path d="M35 78 Q50 84 65 78" stroke="#8A6A3A" stroke-width="2.4" fill="none"/>${PROP.radio(39,82)}`;
 const hat=`<path d="M31 16 Q31 2 50 1 Q69 2 69 16Z" fill="${k1}"/><path d="M22 16 Q50 9 78 16 Q78 21 50 20 Q22 21 22 16Z" fill="${k2}"/><path d="M31 13 Q50 9 69 13" stroke="#8A6A3A" stroke-width="2" fill="none"/><path d="M38 6 Q44 3 50 3" stroke="#F2E2BA" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
 const map=`<g transform="translate(73 70) rotate(10)"><path d="M-9 -7 L-3 -9 L3 -7 L9 -9 V7 L3 9 L-3 7 L-9 9Z" fill="#E6F4D4" stroke="#8FBF5A" stroke-width=".9"/><path d="M-3 -9 V7 M3 -7 V9" stroke="#C8E0B0" stroke-width=".8"/><path d="M-6 5 Q-2 -2 6 -4" stroke="#FF8A80" stroke-width="1.1" fill="none" stroke-dasharray="1.6 1.2"/></g>`;
 try{if(typeof G.fullBody==='function')return G.fullBody('blackbear',{pose:'side',sleeve:k1,prop:map,hat:shirt.replace(PROP.radio(39,82),'')+hat+PROP.radio(38,84)+`<circle cx="32" cy="79" r="4.2" fill="#4A4356"/>`}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}catch(e){}
 return body7({c:'#3A3446',c2:'#26212F',hand:'#4A4356',feet:'#26212F',pose:'side',outfit:shirt,sleeve:k1,prop:map,hat,head:`<circle cx="50" cy="32" r="22" fill="#3A3446"/>`})}
// --- 兔兔護理師（bunny43，可選）：沿用兔子，加白色護理師小帽，帽上是粉紅色愛心（不用紅十字） ---
function bunnyNurseAN(){const cap=`<path d="M38 22 Q38 14 50 13 Q62 14 62 22 L60 25 Q50 22 40 25Z" fill="#FFFFFF" stroke="#E2DAEE" stroke-width=".8"/><path d="${heartP(50,18.6,3.4)}" fill="#FF8FB8"/>`;
 try{if(typeof G.fullBody==='function')return G.fullBody('bunny',{pose:'wave',hat:cap,outfit:`<path d="M41 60 H59 V82 Q50 86 41 82Z" fill="#FFFFFF" opacity=".9"/><path d="${heartP(50,66,2.6)}" fill="#FF8FB8"/>`}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}catch(e){}return ''}
const CH41={
 pigeon41:{f:pigeonAN,ch:41,name:'鴿子站務員嚕嚕',alt:'嚕嚕',newArt:1},
 owl42:{f:owlLibAN,ch:42,name:'貓頭鷹館員書書',alt:'書書',base:'owl'},
 bookworm42:{f:bookwormAN,ch:42,name:'小書蟲翻翻',alt:'翻翻',newArt:1},
 hippo43:{f:hippoAN,ch:43,name:'河馬醫生波波',alt:'波波',newArt:1},
 croc43:{f:crocAN,ch:43,name:'小鱷魚牙醫咔咔',alt:'咔咔',newArt:1},
 bunny43:{f:bunnyNurseAN,ch:43,name:'兔兔護理師（可選）',alt:'兔兔',base:'bunny',optional:1},
 keeper44:{f:keeperAN,ch:44,name:'黑熊保育員阿森',alt:'阿森',base:'blackbear'},
 redpanda44:{f:()=>G.RPANDA44STAND(),ch:44,name:'小貓熊環環',alt:'環環',newArt:1},
 peacock45:{f:peacockAN,ch:45,name:'孔雀館長羽羽',alt:'羽羽',newArt:1},
 chameleon45:{f:chamAN,ch:45,name:'變色龍小畫家變變',alt:'變變',newArt:1}};
Object.keys(CH41).forEach(k=>{const f0=CH41[k].f;CH41[k].svg=(a='')=>W7(f0(),a)});
G.CH41=CH41;

/* ===================== 2. 寵物小貓熊（120×120，viewBox 0 -6 120 120；坐著；紅褐色、白色眉毛和臉頰、一圈一圈的大尾巴；原創造型） =====================
 * PET41.redpanda44(a)：st＝0 寶寶、1 小時候、2 長大（照 pet19：寶寶頭 1.24 倍＋捲毛＋圍兜、小時候頭 1.1 倍＋星星髮夾、長大＋金色星星徽章；整體大小 .68／.84／1，下緣對齊）
 * PET41.anchor：長大時的配件錨點（頭頂 h、脖子 n、大小 s；座標系同 ACCANCH）；PET41.anchorAt(st) 各階段的錨點
 * RPANDA41(e,a)：100×100 表情版（normal／happy／sleep／wow／cough），給故事、獎狀用
 * PET41.pose(act,a)：寵物小屋動作（eat 吃東西、play 玩球、sleep 捲起來睡覺、bath 洗澡泡泡、brush 梳毛亮晶晶） */
const RP_=0;const RP={fur:'#D9662E',furL:'#F59A5C',furD:'#A8461E',dark:'#4E2A22',darkL:'#7A4434',white:'#FFF8EE',cream:'#F6D2A6',ring:'#F2C08C',inner:'#5A2E24'};
const HK41=[1.24,1.1,1],FS41=[.68,.84,1],PIV41=[60,68];
// 大尾巴：沿著曲線一顆一顆毛球疊起來，紅褐和奶油色交替成一圈一圈
function rpTail(g,len=1,x0=78,y0=100){const P=[[x0,y0],[x0+34*len,y0+4],[x0+38*len,y0-40*len],[x0+18*len,y0-52*len]];
 const at=t=>{const u=1-t;return [0,1].map(i=>u*u*u*P[0][i]+3*u*u*t*P[1][i]+3*u*t*t*P[2][i]+t*t*t*P[3][i])};
 let d='';const N=16;for(let k=0;k<=N;k++){const t=k/N,[x,y]=at(t),[x2,y2]=at(Math.min(1,t+.02));const a=Math.atan2(y2-y,x2-x)*180/Math.PI;
  const r=(10.5-2*t)*(k===N?.8:1)*Math.min(1,len*1.05);const ring=Math.floor(k*7/N)%2;const c=k>=N-1?RP.furD:ring?RP.ring:RP.fur;
  d+=`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(r*1.08)}" ry="${n(r)}" fill="${c}" transform="rotate(${n(a)} ${n(x)} ${n(y)})"/>`;
  if(k%2===0&&k<N-1)d+=`<ellipse cx="${n(x-r*.25)}" cy="${n(y-r*.35)}" rx="${n(r*.45)}" ry="${n(r*.25)}" fill="#FFFFFF" opacity=".16" transform="rotate(${n(a)} ${n(x)} ${n(y)})"/>`}
 return d}
// 頭（絕對座標，頭中心約 60,46；脖子 60,68）
function rpHead(g,e='normal'){const ear=(sx)=>`<g transform="translate(60 0) scale(${sx} 1) translate(-60 0)"><path d="M29 38 Q22 14 39 10 Q52 10 50 30Z" fill="${RP.white}"/><path d="M32 35 Q27 17 39.6 14.4 Q48 15 46.6 29Z" fill="${RP.fur}"/><path d="M34.6 32 Q31.6 20 39.8 18.4 Q45 19.6 44 28Z" fill="${RP.inner}"/></g>`;
 let s=ear(1)+ear(-1);
 s+=`<path d="M28 52 Q24 28 60 24 Q96 28 92 52 Q92 62 86 66 L90 70 L82 69 Q72 74 60 74 Q48 74 38 69 L30 70 L34 66 Q28 62 28 52Z" fill="url(#${g}h)"/>`;
 s+=`<path d="M44 28 Q52 25 60 25" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity=".35" stroke-linecap="round"/><path d="M55 25.4 Q57 20.6 60 23 Q63 20.6 65 25.4Z" fill="${RP.fur}"/>`;
 // 白眉毛、白臉頰、白嘴巴（中間留一條紅褐色的「淚痕」）
 s+=`<ellipse cx="45.6" cy="36.4" rx="4.6" ry="2.8" fill="${RP.white}" transform="rotate(-12 45.6 36.4)"/><ellipse cx="74.4" cy="36.4" rx="4.6" ry="2.8" fill="${RP.white}" transform="rotate(12 74.4 36.4)"/>`;
 s+=`<path d="M31 53 Q33 46 41 50.6 Q45.6 58 42.6 68 Q34 66 31 53Z" fill="${RP.white}"/><path d="M89 53 Q87 46 79 50.6 Q74.4 58 77.4 68 Q86 66 89 53Z" fill="${RP.white}"/>`;
 s+=`<path d="M49 60 Q49 52 60 52 Q71 52 71 60 Q71 70 60 70 Q49 70 49 60Z" fill="${RP.white}"/>`;
 // 眼睛
 if(e==='happy'||e==='eat')s+=`<path d="M42.6 49 Q47 43.6 51.4 49 M68.6 49 Q73 43.6 77.4 49" stroke="#2A1A1A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 else if(e==='sleep')s+=`<path d="M42.6 48 Q47 52 51.4 48 M68.6 48 Q73 52 77.4 48" stroke="#2A1A1A" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
 else if(e==='cough')s+=`<path d="M43 45 L50 48.6 L43 52 M77 45 L70 48.6 L77 52" stroke="#2A1A1A" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 else if(e==='shy')s+=`<g class="blink" style="transform-origin:60px 49px"><ellipse cx="49" cy="49.6" rx="4.4" ry="5.2" fill="#2A1612"/><ellipse cx="75" cy="49.6" rx="4.4" ry="5.2" fill="#2A1612"/><circle cx="50.6" cy="47.6" r="1.8" fill="#FFFFFF"/><circle cx="76.6" cy="47.6" r="1.8" fill="#FFFFFF"/></g><path d="M42 41 Q46 39 50 41 M70 41 Q74 39 78 41" stroke="#7A3A1E" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
 else s+=eyes2(47,73,48.6,e==='wow'?5.2:4.8,e==='wow'?6:5.6,'#2A1612');
 // 鼻子、嘴巴、腮紅
 s+=`<path d="M55.6 55.4 Q60 52.6 64.4 55.4 Q63 59.4 60 60 Q57 59.4 55.6 55.4Z" fill="#3A2420"/><ellipse cx="58.6" cy="55" rx="1.6" ry=".9" fill="#FFFFFF" opacity=".55"/>`;
 if(e==='happy'||e==='play')s+=`<path d="M54.4 62 Q60 70 65.6 62Z" fill="#6A2A2A"/><path d="M56.6 65 Q60 67.4 63.4 65" stroke="#FF8FA0" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
 else if(e==='wow')s+=`<ellipse cx="60" cy="64.4" rx="2.6" ry="3" fill="#6A2A2A"/>`;
 else if(e==='eat')s+=`<path d="M55 63 Q57.4 65.6 60 63 Q62.6 65.6 65 63" stroke="#3A2420" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="66" cy="63" rx="2.6" ry="2" fill="${RP.white}"/>`;
 else if(e==='shy')s+=`<path d="M57.6 62.6 Q60 64.4 62.4 62.6" stroke="#3A2420" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
 else if(e!=='cough')s+=`<path d="M60 60 V62 M55 62 Q57.6 65 60 62 Q62.4 65 65 62" stroke="#3A2420" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
 s+=cheek(38,59,4,'#FF8FA0',e==='shy'?.85:.55)+cheek(82,59,4,'#FF8FA0',e==='shy'?.85:.55);
 if(e==='sleep')s+=`<g class="rd4tw" style="animation-duration:2.4s"><path d="M88 30 h6 l-6 6 h6 M96 20 h4 l-4 4 h4" stroke="#9A8AE0" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 return s}
// 成長的小記號（跟 pet19 的假配件同一個樣子；u＝獨角獸座標轉到這裡）
const P19M={
 tuft:`<path d="M86 24.5 Q81 15 86.5 10.5 Q92.5 7.5 93.5 13 Q94 17 89.6 16.6 Q87.4 16 88.6 13.8" stroke="#7A3A1E" stroke-width="2.3" fill="none" stroke-linecap="round" opacity=".85"/><path d="M83 24 Q81.5 19 84 15.5" stroke="#7A3A1E" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/>`,
 clip:`<path d="${star5(78,21,5.2)}" fill="#FFD84A" stroke="#FFFFFF" stroke-width="1.3" stroke-linejoin="round"/><circle cx="78" cy="21" r="1.4" fill="#FF8FB8"/>`,
 bib:`<path d="M62.5 59.5 Q73 66 83.5 59.5 Q85 71.5 73 77 Q61 71.5 62.5 59.5Z" fill="#FFFFFF" stroke="#F4AECB" stroke-width="1.4" stroke-linejoin="round"/><path d="M65.5 62.6 Q73 67.6 80.5 62.6" stroke="#FF9FC4" stroke-width="1.5" fill="none" stroke-dasharray="2.2 2.2" stroke-linecap="round"/><path d="${heartP(73,70.5,3.4)}" fill="#FF8FB8"/>`,
 medal:`<path d="M65 59 L71 70 L75 70 L81 59" stroke="#5C7CE8" stroke-width="3.2" fill="none" stroke-linejoin="round"/><path d="M68 59 L72.4 67 M78 59 L73.6 67" stroke="#FF8FB8" stroke-width="1.3" fill="none"/><circle cx="73" cy="73" r="6.2" fill="#F2B23A" stroke="#FFF2B8" stroke-width="1.4"/><path d="${star5(73,73,4)}" fill="#FFF6C8"/>`};
const ANC41={h:[60,25],n:[60,70],s:1.05};
function anchorAt(st){const hk=HK41[st]||1;const [px,py]=PIV41;return {h:[+(px+(ANC41.h[0]-px)*hk).toFixed(1),+(py+(ANC41.h[1]-py)*hk).toFixed(1)],n:ANC41.n.slice(),s:+(ANC41.s*hk).toFixed(3)}}
const atHead=(st,inner)=>{const a=anchorAt(st);return `<g transform="translate(${a.h[0]} ${a.h[1]}) scale(${a.s}) translate(-85 -24)">${inner}</g>`};
const atNeck=(st,inner)=>{const a=anchorAt(st);return `<g transform="translate(${a.n[0]} ${a.n[1]}) scale(${ANC41.s}) translate(-73 -63)">${inner}</g>`};
function rpDefs(g){return `<defs>${rg(g+'h',[[0,RP.furL],[.55,RP.fur],[1,RP.furD]],.42,.3,.8)}${rg(g+'b',[[0,RP.furL],[.6,RP.fur],[1,RP.furD]],.4,.25,.85)}${lg(g+'d',[[0,RP.darkL],[1,RP.dark]])}</defs>`}
// 坐著的小貓熊（st 階段、e 表情、o.arms＝手的樣子、o.extra 疊在最上面）
function rpSit(st=2,e='normal',o={}){const g=uid('rp');const hk=HK41[st]||1;const [px,py]=PIV41;
 let s=rpDefs(g)+shd(60,110,30,4.4,.16);
 s+=`<g class="rd4sw" style="animation-duration:4.6s;transform-origin:80px 100px">${rpTail(g,st===0?.78:st===1?.9:1)}</g>`;
 // 後腳
 s+=`<ellipse cx="43" cy="104" rx="10.6" ry="6.4" fill="url(#${g}d)"/><ellipse cx="77" cy="104" rx="10.6" ry="6.4" fill="url(#${g}d)"/>${[[39,104],[47,104.6],[73,104.6],[81,104]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.6" fill="#8A5A4A"/>`).join('')}`;
 // 身體
 s+=`<path d="M36 104 Q28 86 38 72 Q48 63 60 63 Q72 63 82 72 Q92 86 84 104Z" fill="url(#${g}b)"/>`;
 s+=`<path d="M50 74 Q60 70 70 74 Q72 90 68 104 H52 Q48 90 50 74Z" fill="#8A3E22" opacity=".35"/><ellipse cx="52" cy="80" rx="6" ry="4" fill="#FFFFFF" opacity=".12"/>`;
 s+=`<path d="M38 80 Q36 90 40 98 M82 80 Q84 90 80 98" stroke="${RP.furD}" stroke-width="1.4" fill="none" opacity=".5"/>`;
 // 前腳
 const arms=o.arms||'rest';
 if(arms==='rest')s+=`<path d="M47 80 Q46 92 50 101 M73 80 Q74 92 70 101" stroke="url(#${g}d)" stroke-width="9" stroke-linecap="round" fill="none"/><ellipse cx="50.4" cy="103" rx="6.4" ry="4.2" fill="${RP.dark}"/><ellipse cx="69.6" cy="103" rx="6.4" ry="4.2" fill="${RP.dark}"/><path d="M47 79 Q46.4 88 48 94" stroke="#9A5A44" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`;
 if(arms==='hold')s+=`<path d="M46 78 Q44 88 54 86 M74 78 Q76 88 66 86" stroke="url(#${g}d)" stroke-width="10" stroke-linecap="round" fill="none"/>`;
 if(arms==='wave')s+=`<path d="M47 78 Q46 92 50 102" stroke="url(#${g}d)" stroke-width="10" stroke-linecap="round" fill="none"/><ellipse cx="50.4" cy="103" rx="6.4" ry="4.2" fill="${RP.dark}"/><g class="rd4sw" style="animation-duration:1.6s;transform-origin:74px 76px"><path d="M74 78 Q86 74 90 62" stroke="url(#${g}d)" stroke-width="10" stroke-linecap="round" fill="none"/><ellipse cx="90.6" cy="60" rx="5.4" ry="5" fill="${RP.dark}"/></g>`;
 if(arms==='cover')s+=`<path d="M47 78 Q46 92 50 102" stroke="url(#${g}d)" stroke-width="10" stroke-linecap="round" fill="none"/><ellipse cx="50.4" cy="103" rx="6.4" ry="4.2" fill="${RP.dark}"/>`;
 if(o.marks&&st===0)s+=atNeck(0,P19M.bib);
 if(o.marks&&st===2)s+=atNeck(2,P19M.medal);
 if(o.mid)s+=o.mid;
 // 頭（寶寶、小時候放大）
 s+=`<g class="pbhead rp44head" transform="translate(${px} ${py}) scale(${hk}) translate(${-px} ${-py})">${rpHead(g,e)}</g>`;
 if(arms==='cover')s+=`<path d="M73 78 Q80 74 70 66" stroke="url(#${g}d)" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M58 60 Q66 54 74 62 Q72 70 62 70 Q56 66 58 60Z" fill="#FFFFFF" stroke="#D8E2F0" stroke-width="1"/><ellipse cx="70" cy="66" rx="5.4" ry="4.6" fill="${RP.dark}"/>`;
 if(o.marks&&st===0)s+=atHead(0,P19M.tuft);
 if(o.marks&&st===1)s+=atHead(1,P19M.clip);
 if(o.extra)s+=o.extra;
 return s}
// 捲起來睡覺（尾巴當被子）
function rpCurl(){const g=uid('rpc');let s=rpDefs(g)+shd(60,110,40,4.6,.16);
 s+=`<ellipse cx="64" cy="94" rx="34" ry="16" fill="url(#${g}b)"/><path d="M40 98 Q60 108 92 98" stroke="${RP.furD}" stroke-width="1.6" fill="none" opacity=".5"/>`;
 s+=`<ellipse cx="44" cy="104" rx="8" ry="4.4" fill="${RP.dark}"/><ellipse cx="58" cy="105" rx="8" ry="4.4" fill="${RP.dark}"/>`;
 s+=`<g transform="translate(-12 22) scale(.92)">${rpHead(g,'sleep')}</g>`;
 // 尾巴從後面繞到前面，像被子一樣蓋著
 const P=[[96,98],[110,80],[80,72],[60,104]];let t='';for(let k=0;k<=14;k++){const tt=k/14,u=1-tt;const x=u*u*u*P[0][0]+3*u*u*tt*P[1][0]+3*u*tt*tt*P[2][0]+tt*tt*tt*P[3][0],y=u*u*u*P[0][1]+3*u*u*tt*P[1][1]+3*u*tt*tt*P[2][1]+tt*tt*tt*P[3][1];
  t+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(9.6-tt*1.6)}" fill="${k>=13?RP.furD:Math.floor(k/2)%2?RP.ring:RP.fur}"/>`}
 return s+`<g transform="translate(0 4)">${t}</g>`}
const PSVG=(c,a='',vb='0 -6 120 120')=>`<svg viewBox="${vb}" ${a} aria-hidden="true" data-pk="redpanda44">${c}</svg>`;
// 寵物小屋的動作
function rpPose(act,a=''){
 if(act==='sleep')return PSVG(rpCurl(),a);
 if(act==='eat')return PSVG(rpSit(2,'eat',{arms:'hold',nomedal:1,extra:`<g transform="translate(60 84)"><path d="M-9 -2 Q-10 -12 0 -12 Q10 -12 9 -2 Q8 6 0 6 Q-8 6 -9 -2Z" fill="#FF6F6F"/><path d="M-4 -4 Q0 -8 4 -4 Q4 2 0 3 Q-4 2 -4 -4Z" fill="#FFF4D8"/><path d="M0 -12 Q1 -16 4 -17" stroke="#7A4A2A" stroke-width="1.6" fill="none"/><path d="M4 -16 Q9 -19 10 -14 Q6 -13 4 -16Z" fill="#6CC06A"/></g><ellipse cx="54" cy="86" rx="5.4" ry="4.6" fill="${RP.dark}"/><ellipse cx="66" cy="86" rx="5.4" ry="4.6" fill="${RP.dark}"/>`}),a);
 if(act==='play')return PSVG(rpSit(2,'happy',{arms:'wave',nomedal:1,extra:`<g transform="translate(26 98)"><circle r="9" fill="#FFCB4D"/><path d="M-9 0 Q0 5 9 0 M0 -9 Q-5 0 0 9" stroke="#FF8A80" stroke-width="2" fill="none"/><circle cx="-3" cy="-4" r="2.4" fill="#FFFFFF" opacity=".6"/></g><g class="rd4tw"><path d="${spark(18,80,4)}" fill="#FFE27A"/></g>`}),a);
 if(act==='bath')return PSVG(rpSit(2,'happy',{nomedal:1,extra:[[42,30,7],[56,24,9],[72,28,7],[84,40,5],[34,44,5],[94,60,6],[26,70,4]].map(([x,y,r],k)=>`<g class="rd4bob" style="animation-delay:${k*.3}s"><circle cx="${x}" cy="${y}" r="${r}" fill="#E8F8FF" opacity=".85" stroke="#9AD8F2" stroke-width="1"/><circle cx="${x-r*.35}" cy="${y-r*.35}" r="${r*.3}" fill="#FFFFFF"/></g>`).join('')}),a);
 if(act==='brush')return PSVG(rpSit(2,'happy',{nomedal:1,extra:`<g class="rd4tw" style="animation-duration:1.6s">${[[30,40,6],[92,48,5],[86,84,6],[28,86,4],[60,16,5]].map(([x,y,r])=>`<path d="${spark(x,y,r)}" fill="#FFF2A8"/>`).join('')}</g><path d="M40 80 Q44 74 50 76 M70 76 Q76 74 80 80" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`}),a);
 return PSVG(rpSit(2,'happy',{arms:'wave'}),a)}
// 遊戲用：PET41.redpanda44(a,acc) 永遠畫「長大」的樣子、不畫成長記號；寶寶／小時候由 pet19 處理（頭在 .pbhead 裡，PET41.p19＝{hd:'pb',pv:[60,68]}；記號和配件照 ACCANCH）
function redpanda44(a=''){return PSVG(rpSit(2,'normal',{}),a)}
// 預覽用：照 pet19 的做法畫出三個階段（頭放大、成長記號、整體大小用 viewBox 調、下緣對齊）
function stagePreview(st,a=''){const f=FS41[st]||1;const vb=[0,-6,120,120];const w=vb[2]/f,h=vb[3]/f,x=vb[0]+vb[2]/2-w/2,y=vb[1]+vb[3]-h;
 return PSVG(rpSit(st,'normal',{marks:1}),a,[x,y,w,h].map(v=>+v.toFixed(2)).join(' '))}
// 朋友版（100×100 全身）：站著、尾巴繞到前面抱著、害羞又好奇
function rpStand(){const g=uid('rs');let s=rpDefs(g)+shd(50,96,22,3.4);
 const bz=(P,t)=>{const u=1-t;return [0,1].map(i=>u*u*u*P[0][i]+3*u*u*t*P[1][i]+3*u*t*t*P[2][i]+t*t*t*P[3][i])};
 const seg=(P,N,r0,r1,k0,tot)=>{let t='';for(let k=0;k<=N;k++){const tt=k/N,[x,y]=bz(P,tt);const kk=k0+k;const c=kk>=tot-1?RP.furD:Math.floor(kk*7/tot)%2?RP.ring:RP.fur;t+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(r0+(r1-r0)*tt)}" fill="${c}"/>`}return t};
 // 尾巴後半段（在身體後面）
 s+=`<g class="rd4sw" style="animation-duration:3.6s;transform-origin:64px 84px">${seg([[62,86],[88,90],[94,62],[74,56]],9,8.6,8.2,0,22)}</g>`;
 s+=`<path d="M41 82 V91 Q41 94 45 94 H48 Q50 94 50 91 V82Z M50 82 V91 Q50 94 52 94 H55 Q59 94 59 91 V82Z" fill="url(#${g}d)"/><ellipse cx="45" cy="93.6" rx="5.6" ry="2.6" fill="${RP.dark}"/><ellipse cx="55" cy="93.6" rx="5.6" ry="2.6" fill="${RP.dark}"/>`;
 s+=`<path d="M37 60 Q30 72 35 84 Q50 91 65 84 Q70 72 63 60 Q50 54 37 60Z" fill="url(#${g}b)"/>`;
 // 尾巴前半段（繞到肚子前面，被兩隻手抱著）
 s+=seg([[74,56],[66,64],[50,64],[40,78]],12,8.2,5.4,10,22);
 s+=`<path d="M39 64 Q34 72 41 76 M61 63 Q64 70 57 72" stroke="url(#${g}d)" stroke-width="7" stroke-linecap="round" fill="none"/><ellipse cx="42.6" cy="75" rx="4.4" ry="3.6" fill="${RP.dark}"/><ellipse cx="56" cy="71.6" rx="4.4" ry="3.6" fill="${RP.dark}"/>`;
 s+=`<g transform="translate(50 60) scale(.62) translate(-60 -70)">${rpHead(g,'shy')}</g>`;
 return s}
G.RPANDA44STAND=(a)=>rpStand();
G.PET41={redpanda44,anchor:ANC41,anchorAt,p19:{hd:'pb',pv:[60,68]},preview:stagePreview,pose:rpPose,STAGE_HK:HK41,STAGE_FS:FS41};
G.PET41_NAME={redpanda44:'小貓熊'};
G.RPANDA44=G.RPANDA41=(e='normal',a='')=>{if(e==='cough')e='normal';return `<svg viewBox="0 0 100 100" ${a} aria-hidden="true"><g transform="translate(-1 2) scale(.85)">${e==='sleep'?rpCurl():rpSit(2,e,{arms:e==='happy'?'wave':'rest'})}</g></svg>`};

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


/* ===================== 4. 房間（100×100 完整 <svg>）：小書架、畫框（可以放孩子自己塗的塗色本作品） =====================
 * TOY.shelf42  小書架（放在地上，玩具格）
 * TOY.frame45  小畫架上的畫框（放在地上，玩具格；沒有選作品時放一張預設的畫）
 * S41.FRAME(pic,o)   掛在牆上的畫框；pic＝塗色本作品的 SVG 內容（200×200 座標，塗好顏色的那一張），沒有就畫預設的畫；o.easel＝放在畫架上
 */
function frameSVG(pic,o={}){const g=uid('fr');const easel=!!o.easel;
 const X=easel?22:14,Y=easel?10:16,Wd=easel?56:72,Hd=easel?56:64,b=5,m=4;
 const inner=pic?`<g transform="translate(${X+b+m} ${Y+b+m}) scale(${n((Wd-2*b-2*m)/200)} ${n((Hd-2*b-2*m)/200)})">${pic}</g>`:`<g transform="translate(${X+b+m} ${Y+b+m}) scale(${n((Wd-2*b-2*m)/100)} ${n((Hd-2*b-2*m)/75)})">${kidArt(7)(BOYH())}</g>`;
 let s=`<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,[[0,'#F6D27A'],[.5,'#E8B04A'],[1,'#C8862A']],1,1)}<clipPath id="${g}c"><rect x="${X+b+m}" y="${Y+b+m}" width="${Wd-2*b-2*m}" height="${Hd-2*b-2*m}"/></clipPath></defs>`;
 if(easel)s+=`<ellipse cx="50" cy="95" rx="30" ry="3.4" fill="#000" opacity=".12"/><path d="M36 94 L46 30 M64 94 L54 30 M50 94 L50 66" stroke="#B07A44" stroke-width="3.6" stroke-linecap="round"/><path d="M38 70 H62" stroke="#B07A44" stroke-width="3"/>`;
 else s+=`<path d="M${X+12} ${Y+2} L50 4 L${X+Wd-12} ${Y+2}" stroke="#8A6A4A" stroke-width="1.4" fill="none"/><circle cx="50" cy="4" r="2.4" fill="#C8962A"/>`;
 s+=`<rect x="${X+2}" y="${Y+3}" width="${Wd}" height="${Hd}" rx="2" fill="#000" opacity=".14"/><rect x="${X}" y="${Y}" width="${Wd}" height="${Hd}" rx="2.4" fill="url(#${g})"/><rect x="${X+b}" y="${Y+b}" width="${Wd-2*b}" height="${Hd-2*b}" fill="#FFFDF6"/>`;
 s+=`<g clip-path="url(#${g}c)">${inner}</g><path d="M${X+b} ${Y+b} H${X+Wd-b} M${X+b} ${Y+b} V${Y+Hd-b}" stroke="#000" stroke-width=".8" opacity=".12"/><path d="M${X+1.6} ${Y+1.4} H${X+Wd-1.6}" stroke="#FFF6C8" stroke-width="1"/>`;
 // 花邊：四個角的小花＋上下的雕花（照塗色本「畫框」那一張）
 if(!easel){[[X,Y],[X+Wd,Y],[X,Y+Hd],[X+Wd,Y+Hd]].forEach(([cx,cy],k)=>{s+=`<g transform="translate(${cx} ${cy})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-3.4" rx="2.4" ry="3.4" fill="${['#FF9AB8','#FFB27A','#B89CFF','#7FD0C0'][k]}" transform="rotate(${a})"/>`).join('')}<circle r="2.2" fill="#FFE27A" stroke="#C8862A" stroke-width=".5"/></g>`});
  s+=`<path d="M${50-8} ${Y+1.6} Q50 ${Y-3} ${50+8} ${Y+1.6} M${50-8} ${Y+Hd-1.6} Q50 ${Y+Hd+3} ${50+8} ${Y+Hd-1.6}" stroke="#FFF2C0" stroke-width="1.4" fill="none"/><circle cx="50" cy="${Y-.4}" r="1.6" fill="#FFE27A"/>`}
 // 金色小星星（自己的作品）
 s+=`<g transform="translate(${X+Wd-4} ${Y+Hd-4})"><circle r="6.4" fill="#FF8A80" stroke="#FFFFFF" stroke-width="1.2"/><path d="${star5(0,0,3.8)}" fill="#FFF6C8"/></g>`;
 if(easel)s+=`<rect x="${X-2}" y="${Y+Hd-1}" width="${Wd+4}" height="4" rx="1.4" fill="#C8925A"/>`;
 return s+`</svg>`}
S41.FRAME=frameSVG;
S41.TOY={
 shelf42:(()=>{const g='s41sh';return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,[[0,'#E8B884'],[1,'#C8925A']])}${lg(g+'i',[[0,'#9A6A3A'],[1,'#B8844E']])}</defs>
  <ellipse cx="50" cy="95" rx="40" ry="4" fill="#000" opacity=".12"/>
  <rect x="14" y="30" width="72" height="64" rx="4" fill="url(#${g})"/><rect x="19" y="35" width="62" height="54" rx="2" fill="url(#${g}i)"/>
  <path d="M19 62 H81" stroke="#E8B884" stroke-width="4"/>
  ${[[21,'#FF8A80',22,6],[27.4,'#4FC4AE',19,5],[33,'#FFCB4D',23,6.4],[39.8,'#A99BE8',18,5],[45.4,'#7EC6F0',21,5.6]].map(([x,c,h,w])=>`<rect x="${x}" y="${60-h}" width="${w}" height="${h}" rx="1" fill="${c}"/><rect x="${x}" y="${60-h+3}" width="${w}" height="1.6" fill="#FFFFFF" opacity=".55"/>`).join('')}
  <g transform="rotate(-16 56 60)"><rect x="51" y="40" width="6" height="20" rx="1" fill="#F48FB8"/></g>
  <rect x="64" y="40" width="14" height="20" rx="2" fill="#FFF6E0"/><circle cx="71" cy="48" r="4" fill="#FF8A80"/><path d="M66 56 H76" stroke="#E8B04A" stroke-width="1.6"/>
  ${[[22,'#8FD08A',19,5.4],[28,'#6A8AD8',22,6],[34.6,'#FFB27A',20,5]].map(([x,c,h,w])=>`<rect x="${x}" y="${87-h}" width="${w}" height="${h}" rx="1" fill="${c}"/>`).join('')}
  <rect x="44" y="70" width="18" height="17" rx="3" fill="#FFFFFF" opacity=".9"/><path d="M46 84 Q53 72 60 84Z" fill="#8FD08A"/><circle cx="57" cy="75" r="2.6" fill="#FFCB4D"/>
  <g transform="translate(70 87)"><path d="M-6 0 H6 L5 -7 H-5Z" fill="#E8B07A"/><path d="M0 -7 Q-6 -14 -3 -18 M0 -7 Q4 -14 6 -16 M0 -7 V-17" stroke="#5AAE5A" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="-3" cy="-18" rx="2.4" ry="3.4" fill="#6CC06A"/><ellipse cx="6" cy="-16" rx="2.4" ry="3.4" fill="#6CC06A"/></g>
  <rect x="12" y="26" width="76" height="6" rx="3" fill="#F2CC98"/><rect x="12" y="26" width="76" height="2" rx="1" fill="#FFFFFF" opacity=".5"/>
  <g transform="translate(26 26)"><path d="M-6 0 Q-6 -12 0 -12 Q6 -12 6 0Z" fill="#FFE27A"/><path d="${star5(0,-6,3.4)}" fill="#FFFFFF"/><rect x="-7" y="-1" width="14" height="2" rx="1" fill="#E8B04A"/></g>
  <g transform="translate(72 26)">${[['#7EC6F0',0],['#FF8A80',-4],['#FFCB4D',-8]].map(([c,y])=>`<rect x="-8" y="${y-4}" width="16" height="4" rx="1" fill="${c}"/>`).join('')}</g></svg>`})(),
 get frame45(){return frameSVG('',{easel:1})}};
S41.TOY_NAME={shelf42:'小書架',frame45:'我的畫（小畫架）'};
// 第 45 章房間「我的畫」：掛在牆上的畫框（框裡放孩子選的塗色本作品；m7c 拿 S41.ROOM.mypic45）
S41.ROOM={get mypic45(){return frameSVG('')}};S41.ROOM_NAME={mypic45:'我的畫'};

/* ===================== 5. 塗色本（200×200；格式同第六季 S36.PICS；構圖照 dev/coloring_s7.md） =====================
 * r＝可以塗的區塊（封閉；後面的蓋在前面的上面），deco＝畫在線上面、不能塗的裝飾（線條 #3A2A5C）。順序：捷運列車（41）、書架（42）、動物園的動物（44）、畫框（45） */
const CR=(t,a)=>[t,a];
const INK='#3A2A5C';
const dl=(d,w=2.5)=>`<path d="${d}" stroke="${INK}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot=(x,y,r=2.6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
S41.PICS=[
 {n:'捷運列車',cat:'adv',lv:2,scene:'搭捷運進城（第 41 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('circle','cx="172" cy="24" r="13"'),
  CR('path','d="M44 34 Q40 22 54 22 Q60 12 72 18 Q84 14 86 26 Q96 28 92 36Z"'),
  CR('rect','x="6" y="44" width="34" height="50"'),CR('rect','x="46" y="60" width="28" height="34"'),CR('rect','x="118" y="36" width="32" height="58"'),CR('rect','x="154" y="62" width="34" height="32"'),
  CR('rect','x="0" y="186" width="200" height="14"'),
  CR('rect','x="86" y="152" width="28" height="34"'),
  CR('rect','x="0" y="144" width="200" height="10"'),
  CR('path','d="M12 102 Q12 92 22 92 H96 V118 H12Z"'),CR('rect','x="12" y="118" width="84" height="20"'),
  CR('rect','x="100" y="92" width="68" height="26"'),CR('rect','x="100" y="118" width="68" height="20"'),
  CR('path','d="M168 92 Q192 94 194 122 V138 H168Z"'),
  CR('rect','x="60" y="98" width="18" height="38" rx="2"'),CR('rect','x="142" y="98" width="18" height="38" rx="2"'),
  CR('rect','x="18" y="98" width="17" height="15" rx="3"'),CR('rect','x="39" y="98" width="17" height="15" rx="3"'),CR('rect','x="105" y="98" width="16" height="15" rx="3"'),CR('rect','x="124" y="98" width="14" height="15" rx="3"'),
  CR('circle','cx="26.5" cy="109" r="5"'),CR('circle','cx="113" cy="109" r="5"'),
  CR('path','d="M172 98 H184 Q190 104 190 112 H172Z"'),
  CR('circle','cx="183" cy="127" r="7"'),
  CR('circle','cx="30" cy="141" r="6"'),CR('circle','cx="78" cy="141" r="6"'),CR('circle','cx="118" cy="141" r="6"'),CR('circle','cx="156" cy="141" r="6"')],
  deco:()=>dl('M12 118 H194',3.4)+dl('M69 99 V135 M151 99 V135')+dot(180.4,125.4,1.3)+dot(185.6,125.4,1.3)+dl('M180 128.6 Q183 131 186 128.6',1.6)
   +[[30,141],[78,141],[118,141],[156,141]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${INK}"/>`).join('')
   +[[12,52],[24,52],[12,66],[24,66],[12,80],[24,80],[52,68],[62,68],[124,46],[136,46],[124,62],[136,62],[160,70],[172,70]].map(([x,y])=>`<rect x="${x}" y="${y}" width="7" height="7" fill="none" stroke="${INK}" stroke-width="1.6"/>`).join('')
   +dl('M100 154 V184',1.6)},
 {n:'書架',cat:'adv',lv:1,scene:'安靜的圖書館（第 42 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('rect','x="0" y="190" width="200" height="10"'),
  CR('rect','x="38" y="74" width="124" height="114"'),
  CR('rect','x="28" y="68" width="10" height="124" rx="2"'),CR('rect','x="162" y="68" width="10" height="124" rx="2"'),
  CR('rect','x="24" y="62" width="152" height="8" rx="3"'),CR('rect','x="38" y="108" width="124" height="7"'),CR('rect','x="38" y="148" width="124" height="7"'),CR('rect','x="24" y="186" width="152" height="7" rx="2"'),
  CR('rect','x="44" y="80" width="13" height="28" rx="1.6"'),CR('rect','x="59" y="84" width="13" height="24" rx="1.6"'),CR('rect','x="74" y="78" width="15" height="30" rx="1.6"'),CR('rect','x="91" y="83" width="13" height="25" rx="1.6"'),CR('path','d="M108 108 L118 80 L130 84 L121 108Z"'),CR('rect','x="136" y="80" width="16" height="28" rx="1.6"'),
  CR('rect','x="46" y="138" width="56" height="10" rx="2"'),CR('rect','x="52" y="128" width="46" height="10" rx="2"'),
  CR('path','d="M120 148 L116 132 H144 L140 148Z"'),CR('path','d="M130 132 Q112 126 116 112 Q130 116 130 132Z"'),CR('path','d="M130 132 Q148 124 146 110 Q132 114 130 132Z"'),
  CR('rect','x="62" y="158" width="15" height="14" rx="1.6"'),CR('rect','x="81" y="156" width="15" height="16" rx="1.6"'),CR('rect','x="100" y="158" width="15" height="14" rx="1.6"'),
  CR('path','d="M52 168 H148 L142 186 H58Z"'),
  CR('path','d="M78 62 Q74 40 82 30 L80 18 L90 26 Q100 22 110 26 L120 18 L118 30 Q126 40 122 62Z"'),
  CR('path','d="M80 60 Q76 44 86 40 L92 62Z M120 60 Q124 44 114 40 L108 62Z"'),
  CR('ellipse','cx="100" cy="52" rx="10" ry="10"')],
  deco:()=>`<circle cx="91" cy="36" r="6.4" fill="none" stroke="${INK}" stroke-width="2.4"/><circle cx="109" cy="36" r="6.4" fill="none" stroke="${INK}" stroke-width="2.4"/>${dl('M97.4 36 H102.6',2)}${dot(91,36,2.2)}${dot(109,36,2.2)}${dl('M98 42 L100 45 L102 42',2)}`
   +`<path d="${star5(50.5,92,3)}" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="${heartP(81.5,92,3)}" fill="none" stroke="${INK}" stroke-width="1.6"/>${dl('M140 92 q4 -3 8 0 q-4 3 -8 0 M148 92 l3 -2 v4Z',1.6)}`
   +dl('M42 85 V100 M164 80 V96 M166 120 V136 M34 130 V146',1.4)+dl('M58 175 H142 M62 181 H138',1.6)},
 {n:'動物園的動物',cat:'adv',lv:2,scene:'動物園一日遊（第 44 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('path','d="M0 150 Q100 138 200 150 V200 H0Z"'),
  CR('rect','x="150" y="20" width="9" height="132" rx="3"'),CR('path','d="M158 50 Q176 40 188 46 Q174 54 158 54Z"'),CR('path','d="M150 80 Q132 70 120 76 Q134 84 150 84Z"'),
  CR('rect','x="112" y="110" width="5" height="36"'),CR('path','d="M114 92 Q98 100 114 118 Q130 100 114 92Z"'),
  CR('path','d="M0 92 Q14 86 22 64 L30 30 Q34 16 48 18 Q60 20 58 32 Q56 40 46 42 L40 70 Q36 96 26 112 L0 118Z"'),
  CR('circle','cx="18" cy="96" r="5"'),CR('circle','cx="30" cy="74" r="4.6"'),CR('circle','cx="36" cy="50" r="4.4"'),CR('circle','cx="12" cy="108" r="4.4"'),CR('circle','cx="26" cy="92" r="3.6"'),
  CR('path','d="M54 156 Q48 116 82 110 Q116 106 124 130 Q128 156 110 158 L104 158 V146 H90 V158 H70 V146 H58 V158Z"'),
  CR('path','d="M98 118 Q112 104 120 118 Q122 134 106 136 Q96 132 98 118Z"'),
  CR('path','d="M116 114 Q128 110 129 94 Q130 86 125 81 L131 77 Q139 85 137 97 Q134 116 118 124Z"'),
  CR('path','d="M127 77 Q114 60 118 44 Q124 60 132 74Z"'),CR('path','d="M132 74 Q132 56 144 46 Q140 62 136 76Z"'),
  CR('path','d="M152 180 Q140 176 142 160 Q144 146 158 144 Q172 144 174 160 Q176 178 162 182Z"'),
  CR('path','d="M146 146 Q142 128 158 124 Q174 126 172 146 Q166 154 158 154 Q150 154 146 146Z"'),
  CR('path','d="M150 140 Q152 148 158 150 Q164 148 166 140 Q160 144 158 144 Q156 144 150 140Z"'),
  CR('path','d="M146 132 L144 120 L154 126Z"'),CR('path','d="M170 132 L172 120 L162 126Z"'),
  CR('path','d="M172 182 Q190 180 192 168 L180 166 Q178 174 168 176Z"'),CR('path','d="M180 166 L192 168 Q194 156 188 150 L178 156Z"'),CR('path','d="M178 156 L188 150 Q184 142 176 142 L172 150Z"'),
  CR('path','d="M172 150 L176 142 Q166 138 160 146 L164 152Z"'),CR('path','d="M164 152 L160 146 Q150 150 150 160 L158 162Z"'),CR('path','d="M158 162 L150 160 Q150 170 156 174 L162 168Z"')],
  deco:()=>`${dot(46,28,2.4)}${dot(108,124,2.4)}${dot(154,136,2.2)}${dot(162,136,2.2)}${dl('M152 138 Q151 142 153 145 M164 138 Q165 142 163 145',1.6)}${dl('M156 146 Q158 148 160 146',1.6)}`
   +dl('M129 98 h5 M130 104 h5 M128 110 h5',1.6)+dl('M86 158 V146',1.6)
   +dl('M150 38 H159 M150 66 H159 M150 98 H159 M150 128 H159',2)},
 {n:'畫框',cat:'adv',lv:1,scene:'美術館的小畫家（第 45 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('rect','x="0" y="174" width="200" height="26"'),
  CR('path','d="M22 18 Q34 10 46 18 Q58 10 70 18 Q82 10 94 18 Q106 10 118 18 Q130 10 142 18 Q154 10 166 18 V136 Q154 144 142 136 Q130 144 118 136 Q106 144 94 136 Q82 144 70 136 Q58 144 46 136 Q34 144 22 136Z"'),
  CR('rect','x="36" y="30" width="116" height="94" rx="3"'),
  CR('rect','x="44" y="38" width="100" height="78"'),
  CR('circle','cx="22" cy="18" r="9"'),CR('circle','cx="166" cy="18" r="9"'),CR('circle','cx="22" cy="136" r="9"'),CR('circle','cx="166" cy="136" r="9"'),
  CR('path','d="M44 102 Q80 92 110 98 Q130 94 144 100 V116 H44Z"'),
  CR('circle','cx="124" cy="56" r="11"'),
  CR('rect','x="56" y="74" width="30" height="26"'),CR('path','d="M52 76 L71 58 L90 76Z"'),CR('rect','x="65" y="86" width="10" height="14"'),
  CR('path','d="M112 74 Q100 74 100 64 Q100 54 112 54 Q124 54 124 64 Q124 74 112 74Z"'),CR('rect','x="109" y="74" width="6" height="22"'),
  CR('circle','cx="96" cy="98" r="5"'),CR('circle','cx="132" cy="96" r="5"'),
  CR('rect','x="78" y="150" width="34" height="14" rx="2"'),
  CR('path','d="M150 174 Q146 154 156 144 Q152 132 166 129 Q182 128 182 142 Q186 156 178 166 Q192 166 192 177 Q192 188 182 187 Q174 186 176 178 Q180 176 182 179 Q184 174 178 172 L174 174Z"'),
  CR('circle','cx="167" cy="141" r="6.4"'),
  CR('path','d="M154 132 Q151 118 168 116 Q184 116 183 128 Q176 131 154 132Z"'),
  CR('path','d="M132 166 Q130 152 144 150 Q156 150 156 160 Q156 166 150 166 Q146 166 146 170 Q146 174 140 174 Q132 174 132 166Z"')],
  deco:()=>`${dot(168,141,2.6)}${dl('M158 152 Q165 156 172 152',2)}${dot(140,158,2.2)}${dot(148,156,2.2)}${dot(146,164,1.8)}`
   +[[44,30,52,22],[144,30,136,22],[44,124,52,132],[144,124,136,132]].map(([a,b,c,d])=>dl(`M${a} ${b} L${c} ${d}`,1.6)).join('')
   +dl('M94 24 Q100 20 106 24 M94 130 Q100 134 106 130',1.6)+dl('M71 66 V70',1.6)+dl('M96 103 V112 M132 101 V112',1.6)
   +[0,60,120,180,240,300].map(a=>dl('M124 41 V37',2.2).replace('<path',`<path transform="rotate(${a} 124 56)"`)).join('')}];

/* ===================== 6. 徽章、小徽章（圖鑑「城市小旅行家」一排）、獎狀 ===================== */
S41.BADGE_IC=[
 `<rect x="-8" y="-8" width="16" height="14" rx="4" fill="#FFFFFF" stroke="#8A8EA8" stroke-width="1"/><rect x="-5.6" y="-5.6" width="11.2" height="5" rx="1.4" fill="#5A6E9E"/><rect x="-8" y="1" width="16" height="2" fill="#4FC4AE"/><path d="M-5 6 L-7 9 M5 6 L7 9" stroke="#8A8EA8" stroke-width="1.4" stroke-linecap="round"/>`,
 `<path d="M0 -5 Q-4.6 -8 -9 -6 V6 Q-4.6 4 0 7Z M0 -5 Q4.6 -8 9 -6 V6 Q4.6 4 0 7Z" fill="#FFFFFF" stroke="#7E8ED8" stroke-width="1.2"/><path d="M-7 -2 H-2 M-7 1 H-2 M2 -2 H7 M2 1 H7" stroke="#C9D8F0" stroke-width=".9"/>`,
 `<path d="M-7 -6 Q-8 -10 -3 -9 Q0 -8 3 -9 Q8 -10 7 -6 Q7 0 5 4 Q4 8 2 7 Q1 3 0 3 Q-1 3 -2 7 Q-4 8 -5 4 Q-7 0 -7 -6Z" fill="#FFFFFF" stroke="#4FC4AE" stroke-width="1.2"/><circle cx="-2.6" cy="-3.4" r=".9" fill="#3A3150"/><circle cx="2.6" cy="-3.4" r=".9" fill="#3A3150"/><path d="M-1.6 -1 Q0 .4 1.6 -1" stroke="#3A3150" stroke-width=".7" fill="none"/>`,
 `<path d="M-8 6 Q-10 -6 0 -7 Q9 -7 9 1 Q9 5 6 5 V9 H3 V5 H-3 V9 H-6Z" fill="#A9B6CE"/><path d="M-8 -1 Q-12 3 -10 9" stroke="#A9B6CE" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="-3" cy="-2" r="1" fill="#2A2438"/><path d="M0 -6 Q4 -4 3 1" stroke="#E8B8C8" stroke-width="2" fill="none"/>`,
 `<path d="M0 -8 Q9 -8 9 0 Q9 4 5 4 Q2 4 2 6.4 Q2 9 0 9 Q-9 9 -9 0 Q-9 -8 0 -8Z" fill="#F2D2A0" stroke="#C89A5A" stroke-width="1"/>${[[-4.6,-3,'#FF6F6F'],[0,-5,'#FFCB4D'],[4.6,-3,'#4FC4AE'],[-4.6,2.6,'#5A9AF0']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${c}"/>`).join('')}`];
S41.BADGE=(a='')=>{const g='b41'+Math.random().toString(36).slice(2,7);
 const ring=S41.BADGE_IC.map((s,k)=>{const t=-Math.PI/2+k*2*Math.PI/5,x=100+Math.cos(t)*58,y=96+Math.sin(t)*58;return `<g transform="translate(${n(x)} ${n(y)})"><circle r="15" fill="#FFFFFF" stroke="${C7.mint}" stroke-width="2"/><g transform="scale(1.05)">${s}</g></g>`}).join('');
 return `<svg ${a} viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="${g}" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#F2FBFF"/><stop offset="1" stop-color="#BFE6F4"/></radialGradient><clipPath id="${g}c"><circle cx="100" cy="96" r="34"/></clipPath></defs>
  <path d="M70 150 L56 196 L76 186 L86 200 L96 156Z" fill="${C7.coral}"/><path d="M130 150 L144 196 L124 186 L114 200 L104 156Z" fill="${C7.mint}"/>
  <circle cx="100" cy="96" r="84" fill="#FFD24D" stroke="#C8962A" stroke-width="4"/><circle cx="100" cy="96" r="76" fill="url(#${g})"/>
  <g clip-path="url(#${g}c)"><rect x="60" y="56" width="80" height="80" fill="#BFE6F4"/>
   <rect x="72" y="92" width="14" height="40" fill="#A99BE8"/><rect x="88" y="78" width="16" height="54" fill="#7EC6F0"/><rect x="106" y="88" width="14" height="44" fill="${C7.coral}"/><rect x="122" y="98" width="12" height="34" fill="${C7.mint}"/>
   ${[[75,98],[80,106],[91,84],[98,94],[91,104],[109,94],[114,104],[125,104]].map(([x,y])=>`<rect x="${x}" y="${y}" width="3.4" height="3.4" fill="#FFFFFF" opacity=".8"/>`).join('')}
   <path d="M60 122 H140 V136 H60Z" fill="#8A8EA8"/><rect x="62" y="114" width="44" height="12" rx="4" fill="#FFFFFF"/><rect x="62" y="119" width="44" height="2.4" fill="${C7.mint}"/></g>
  <circle cx="100" cy="96" r="34" fill="none" stroke="#FFFFFF" stroke-width="3"/><path d="${star5(100,70,8)}" fill="#FFCB4D" stroke="#E0962A" stroke-width="1.2"/>${ring}</svg>`};
S41.MINI_C=['#DDF6F0','#E2E6FF','#E0F6EE','#E6EEF8','#FFF0DE'];
S41.MINI=(k,a='')=>{const c=S41.MINI_C[k]||'#E8F6F2';return `<svg ${a} viewBox="0 0 100 100" aria-hidden="true"><path d="M34 76 L26 98 L38 92 L44 100 L50 80Z" fill="${C7.coral}"/><path d="M66 76 L74 98 L62 92 L56 100 L50 80Z" fill="${C7.mint}"/>
  <circle cx="50" cy="46" r="40" fill="#FFD24D" stroke="#C8962A" stroke-width="3"/><circle cx="50" cy="46" r="34" fill="${c}" stroke="#FFF6D0" stroke-width="2.4"/><g transform="translate(50 46) scale(2.6)">${S41.BADGE_IC[k]||''}</g></svg>`};
// 獎狀（文字由內容同事的 S7FIN 提供；還沒有時先用這裡的暫定文字，只在預覽頁出現）
S41.FIN0={cert_title:'城市小旅行家',cert_to:'最棒的小旅行家',cert_sign:'小貓熊　和城市的朋友們',cert_body:['你完成了第七季','「星光城市小旅行」五章的冒險，','<br>','搭捷運、去圖書館、看醫生，','<br>','當動物園的小導遊，','<br>','還在美術館看見自己的畫，','<br>','是最棒的城市小旅行家！']};
S41.certHTML=(o)=>{const F=(typeof G.S7FIN!=='undefined'&&G.S7FIN.cert_title)?G.S7FIN:(EV('typeof S7FIN!=="undefined"?S7FIN:null')||S41.FIN0);const nm=(o.name||'').trim();const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return `<div class="card certcard cert3 cert7" role="dialog" aria-label="${F.cert_title}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${F.cert_title}</div><div class="certto">頒給：<b>${nm?esc(nm):F.cert_to}</b></div>
  <div class="certbody">${F.cert_body.map(s=>s==='<br>'?'<br>':`<span>${s}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero||''}</span><span class="c3badge">${S41.BADGE()}</span><span class="u">${o.pet||''}</span></div>
  <div class="certfoot"><div><div class="certsig">${F.cert_sign}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${G.RPANDA41('happy')}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`};
S41.CERT_CSS=`.cert7 .certin{background:linear-gradient(180deg,#F6FDFF,#E6F6F2)}.cert7 .certrib{background:linear-gradient(90deg,#3EAE98,#7EC6F0)}.cert7 .certtt{color:#2E7A6E;text-shadow:0 2px 0 #D8F2EC}.cert7 .c3badge svg{height:100%;width:auto}`;

/* ===================== 7. 接進遊戲（這一輪先不接：S41.LIVE=false 時 hook() 什麼都不做；Albert 同意後，m7c 的邏輯在設好 DRESS／BFIT 之後呼叫 S41.hook()） =====================
 * 遊戲本體的變數在主程式閉包裡，模組用 window.__ev 改（跟 build.py 接在主程式後面的位置一致）。
 * 貝雷帽 beret43（頭飾格）、小導遊背包 bag41（背後格）由 wrapPrincess／wrapBoy 畫；換裝間圖示 S41.ICON。 */
S41.hook=function(force){if(!S41.LIVE&&!force)return false;if(G.__s41hooked)return true;G.__s41hooked=1;const E=G.__ev;if(typeof E!=='function')return false;
 try{const DR=E('DRESS'),BF=E('BFIT');Object.keys(S41.DRESS).forEach(k=>{DR[k]=Object.assign({},S41.DRESS[k])});Object.keys(S41.BOY).forEach(k=>{BF[k]=Object.assign({},S41.BOY[k])})}catch(e){console.log('s41 reg',e)}
 try{const IDOL=E('IDOL');
  G.__s41w={patt:_p=>function(t,x,y,col,i){if(typeof t==='string'&&S41.PAT[t])return S41.PAT[t](x,y,col,i);return _p.apply(this,arguments)}};
  E('patt=window.__s41w.patt(patt)');
  const _jk=IDOL.jacket;IDOL.jacket=function(g,D){const J=D&&D.idol;if(J&&J.s41&&S41.JK[J.s41])return S41.JK[J.s41](g,D,J);return _jk.apply(this,arguments)};
  const _jd=IDOL.jacketDefs;IDOL.jacketDefs=function(g,D){if(D&&D.idol&&D.idol.s41)return '';return _jd.apply(this,arguments)};
  const _bt=IDOL.boots;IDOL.boots=function(D,look){const J=D&&D.idol;if(J&&J.s41){if((look&&look.shoe)||!S41.BOOT[J.s41])return '';return S41.BOOT[J.s41](J)}return _bt.apply(this,arguments)};
  const _bj=IDOL.boyJacket;IDOL.boyJacket=function(g,F){const J=F&&F.s41;return _bj.apply(this,arguments)+(J&&S41.BJ[J.t]?S41.BJ[J.t](g,F,J):'')};
  const _bs=IDOL.boySleeve;IDOL.boySleeve=function(F){const J=F&&F.s41;return (J&&S41.BS[J.t]?S41.BS[J.t](J):'')+_bs.apply(this,arguments)};
  E('princess=window.S41.wrapPrincess(princess);boySVG=window.S41.wrapBoy(boySVG)');
  if(G.RIG&&G.RIG.girl){G.RIG.girl=S41.wrapPrincess(G.RIG.girl);if(G.RIG.boy)G.RIG.boy=S41.wrapBoy(G.RIG.boy)}}catch(e){console.log('s41 hook',e)}
 // 寵物小貓熊：由 m7c 註冊（ICONPET→ICONART，用 PET41.redpanda44 和 PET41.p19）；這裡只補配件錨點
 try{const ACC=E('ACCANCH');if(ACC&&!ACC.redpanda44)ACC.redpanda44=Object.assign({},G.PET41.anchor)}catch(e){}
 try{const st=document.createElement('style');st.textContent=S41.CERT_CSS;document.head.appendChild(st)}catch(e){}
 try{G.install41(true)}catch(e){}
 setTimeout(()=>{try{G.install41(true);S41.quizIcons()}catch(e){console.log('s41 late',e)}},0);   // 等 m8（ZOO8）、m7c 都載入完再做一次
 return true};
S41.BG=()=>G.BG41;

/* ---------- 題目選項的小圖：第七季題庫裡的幾個 emoji 換成這一季畫的物件（只改第七季的題目，其他章不動） ---------- */
const QI={'🚇':'train','🚆':'train','🎫':'ticket','📚':'book','📖':'book','🩺':'stetho','🪥':'toothbrush','🗺️':'map','📷':'camera','📸':'camera','🖼️':'frame','🖌️':'brush','🎨':'palette','🧻':'tissue','🍬':'candy','🐘':'elephant','🦒':'giraffe'};
S41.quizIcons=function(){if(!S41.LIVE||G.S7ART===false)return;let Q=null;try{Q=EV('typeof S7Q!=="undefined"?S7Q:null')}catch(e){}if(!Array.isArray(Q))return;
 const fix=o=>{if(Array.isArray(o)&&QI[o[0]])o[0]='i:s41'+QI[o[0]]};
 Q.forEach(q=>{try{fix(q[2]);(q[3]||[]).forEach(fix)}catch(e){}})};
/* ---------- 第 43 章兔兔護理師換成戴小護理帽的 bunny43（Albert 2026-11-24 決定要用；粉紅愛心，不用紅十字） ---------- */
try{if(S41.LIVE&&G.S7ART!==false){const D=EV('typeof S7D!=="undefined"?S7D:null');const L=D&&D[43]&&D[43].levels;if(L)L.forEach(x=>{if(x[1]==='bunny')x[1]='bunny43'});
 setTimeout(()=>{try{if(G.__ST19SPK&&G.__ST19SPK['兔兔']==='bunny')G.__ST19SPK['兔兔']='bunny43'}catch(e){}},0)}}catch(e){console.log('s41 bunny43',e)}
/* ---------- 房間佈置選單「牆上的畫」那一格的小縮圖（patches/72_s7art_thumb.py 接進 thumbRaw） ---------- */
G.__s41picThumb=v=>{if(v==='none')return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#F6E6D2"/><rect x="18" y="20" width="64" height="56" rx="4" fill="none" stroke="#C8A27A" stroke-width="3" stroke-dasharray="6 5"/></svg>`;
 return frameSVG('').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ')};

/* ===================== 登記 ===================== */
G.BG41={metro41:(W,H)=>metro(W,H,'platform'),metro41door:(W,H)=>metro(W,H,'door'),metro41car:(W,H)=>metro(W,H,'car'),metro41gate:(W,H)=>metro(W,H,'gate'),metro41map:(W,H)=>metro(W,H,'map'),home41:home41,library42:(W,H)=>library(W,H,'hall'),library42desk:(W,H)=>library(W,H,'desk'),library42kids:(W,H)=>library(W,H,'kids'),library42aisle:(W,H)=>library(W,H,'aisle'),library42out:(W,H)=>library(W,H,'out'),
 clinic43:(W,H)=>clinic(W,H,'wait'),clinic43doc:(W,H)=>clinic(W,H,'doc'),clinic43dent:(W,H)=>clinic(W,H,'dent'),clinic43med:(W,H)=>clinic(W,H,'med'),clinic43out:(W,H)=>clinic(W,H,'out'),
 zoo44:(W,H)=>zoo(W,H,'path'),zoo44gate:(W,H)=>zoo(W,H,'gate'),zoo44ele:(W,H)=>zoo(W,H,'ele'),zoo44gir:(W,H)=>zoo(W,H,'gir'),zoo44info:(W,H)=>zoo(W,H,'info'),
 museum45:(W,H)=>museum(W,H,'hall'),museum45kids:(W,H)=>museum(W,H,'kids'),museum45sculpt:(W,H)=>museum(W,H,'sculpt'),museum45lobby:(W,H)=>museum(W,H,'lobby'),museum45out:(W,H)=>museum(W,H,'out'),fin45:(W,H)=>museum(W,H,'fin')};
G.BG41_CH={41:'metro41',42:'library42',43:'clinic43',44:'zoo44',45:'museum45'};
G.BG41_OPEN={41:'home41',42:'library42out',43:'clinic43out',44:'zoo44gate',45:'museum45out'};
G.BG41_STORY={41:['metro41gate','metro41map','metro41door','metro41car'],42:['library42desk','library42kids','library42aisle'],43:['clinic43doc','clinic43dent','clinic43med'],44:['zoo44ele','zoo44gir','zoo44info'],45:['museum45lobby','museum45kids','museum45sculpt']};
G.BG41_FIN='fin45';
S41.ZOO={elephant:(x,y,s,o)=>zooA('elephant',x,y,s,o),giraffe:(x,y,s,o)=>zooA('giraffe',x,y,s,o)};
})(typeof window!=='undefined'?window:globalThis);

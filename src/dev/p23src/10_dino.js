/* ---------- 化石：骨頭畫法（照原本挖化石的畫法）＋ 恐龍資料 ---------- */
const B='#FFF4E0',O='#C9A878';
const bone=(d,w)=>`<path d="${d}" fill="none" stroke="${O}" stroke-width="${w+5}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${B}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const knob=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r+2.5}" fill="${O}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${B}"/>`;
const shp=d=>`<path d="${d}" fill="${B}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>`;
const ribs=(x0,x1,y,h,n,w=7)=>{let o='';for(let i=0;i<n;i++){const x=x0+(x1-x0)*i/(n-1);o+=bone(`M${x} ${y-h*.1} Q${x+10} ${y+h*.5} ${x+3} ${y+h}`,w)}return o};
const legs=(dx,h,w)=>bone(`M${-dx} ${-h*.5} Q${-dx-6} 0 ${-dx+2} ${h*.5}`,w)+bone(`M${dx} ${-h*.5} Q${dx-6} 0 ${dx+2} ${h*.5}`,w)+knob(-dx,-h*.5,w*.6)+knob(dx,-h*.5,w*.6)+`<ellipse cx="${-dx+8}" cy="${h*.5+4}" rx="${w*1.1}" ry="${w*.5}" fill="${B}" stroke="${O}" stroke-width="2.5"/><ellipse cx="${dx+8}" cy="${h*.5+4}" rx="${w*1.1}" ry="${w*.5}" fill="${B}" stroke="${O}" stroke-width="2.5"/>`;
const AMM=R=>{let o=`<circle r="${R}" fill="${B}" stroke="${O}" stroke-width="3"/>`;let p='M0 0';for(let t=0;t<=4.2*Math.PI;t+=.2){const r=R*.08+R*.86*t/(4.2*Math.PI);p+=` L${(r*Math.cos(t)).toFixed(1)} ${(r*Math.sin(t)).toFixed(1)}`}o+=`<path d="${p}" fill="none" stroke="${O}" stroke-width="${(R*.05).toFixed(1)}"/>`;
 for(let t=1.2*Math.PI;t<=4.2*Math.PI;t+=.32){const r=R*.08+R*.86*t/(4.2*Math.PI),r0=r-R*.86*2*Math.PI/(4.2*Math.PI);o+=`<line x1="${(r0*Math.cos(t)).toFixed(1)}" y1="${(r0*Math.sin(t)).toFixed(1)}" x2="${(r*Math.cos(t)).toFixed(1)}" y2="${(r*Math.sin(t)).toFixed(1)}" stroke="${O}" stroke-width="${(R*.025).toFixed(1)}" opacity=".7"/>`}return o};
const TRILO=`<path d="M0 -44 Q30 -42 32 -10 Q34 26 0 46 Q-34 26 -32 -10 Q-30 -42 0 -44Z" fill="${B}" stroke="${O}" stroke-width="3"/><path d="M-26 -20 Q0 -34 26 -20" fill="none" stroke="${O}" stroke-width="2.4"/>${[-8,2,12,22,32].map(y=>`<path d="M-28 ${y} Q0 ${y+6} 28 ${y}" fill="none" stroke="${O}" stroke-width="2"/>`).join('')}<path d="M-9 -20 V40 M9 -20 V40" stroke="${O}" stroke-width="2"/><circle cx="-12" cy="-28" r="3" fill="${O}"/><circle cx="12" cy="-28" r="3" fill="${O}"/>`;
const FISH=`<path d="M-50 0 Q-30 -22 8 -20 Q34 -16 46 0 Q34 16 8 20 Q-30 22 -50 0Z" fill="${B}" opacity=".5" stroke="${O}" stroke-width="2.4"/>${bone('M-44 0 H38',4)}${[-30,-18,-6,6,18].map(x=>bone(`M${x} -15 Q${x+4} 0 ${x} 15`,2.6)).join('')}<circle cx="30" cy="-4" r="6" fill="none" stroke="${O}" stroke-width="2.6"/>${bone('M-44 0 L-60 -14 M-44 0 L-60 14',3.4)}`;
const SHELL=`<path d="M0 40 L-40 -6 Q-36 -40 0 -44 Q36 -40 40 -6Z" fill="${B}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>${[-28,-14,0,14,28].map(x=>`<path d="M0 38 L${x} -38" stroke="${O}" stroke-width="2.4"/>`).join('')}<path d="M-12 40 H12 L8 48 H-8Z" fill="${B}" stroke="${O}" stroke-width="2.4"/>`;
const LEAFF=`<path d="M-40 34 Q-44 -20 20 -44 Q46 -50 42 -20 Q30 40 -40 34Z" fill="${B}" stroke="${O}" stroke-width="3"/><path d="M-36 30 Q0 0 34 -38" stroke="${O}" stroke-width="2.6" fill="none"/>${[-20,-6,8,20].map(t=>`<path d="M${t} ${-t*1.05-4} q-14 -4 -20 -16 M${t} ${-t*1.05-4} q10 8 22 8" stroke="${O}" stroke-width="1.8" fill="none"/>`).join('')}`;
const BONUS={b_ammo:{n:'菊石',g:AMM(40)},b_fish:{n:'魚',g:FISH},b_trilo:{n:'三葉蟲',g:TRILO},b_shell:{n:'貝殼',g:SHELL},b_leaf:{n:'葉子',g:LEAFF}};
const plate=(x,h)=>shp(`M${x-13} 16 L${x-11} ${-h*.45} L${x} ${-h} L${x+11} ${-h*.45} L${x+13} 16Z`)+`<path d="M${x} ${-h+8} V10" stroke="${O}" stroke-width="2" opacity=".6"/>`;
const paddle=(s)=>shp(`M${-20*s} ${-12*s} Q${20*s} ${-8*s} ${42*s} ${16*s} Q${44*s} ${28*s} ${30*s} ${26*s} Q0 ${16*s} ${-24*s} ${2*s}Z`)+bone(`M${-14*s} ${-6*s} Q${14*s} ${2*s} ${34*s} ${18*s}`,3);
const EYE='#5A3A2A';
const DINO={
 brachio:{body:'#9FD8A8',eye:[475,66],sil:'M60 255 Q40 250 30 262 Q110 230 190 195 Q240 140 330 150 Q370 150 400 120 Q430 60 455 30 Q470 18 488 26 Q494 38 478 44 Q460 70 440 120 Q420 175 380 205 L380 300 H345 L340 225 Q300 232 265 228 L262 300 H228 L222 222 Q170 225 60 255Z',
  spots:[[300,190,14],[262,200,10],[336,186,9]],
  parts:[{n:'頭和長脖子',v:'p_neck',x:425,y:95,g:bone('M-40 70 Q-15 10 30 -55',15)+shp('M24 -66 Q40 -78 60 -70 Q68 -62 58 -54 Q42 -48 26 -52Z')+'<circle cx="44" cy="-63" r="4" fill="#7E5640"/>'},
  {n:'身體',v:'p_body',x:290,y:185,g:bone('M-110 0 Q0 -50 110 -20',13)+ribs(-80,80,-22,48,7)},
  {n:'尾巴',v:'p_tail',x:130,y:222,g:bone('M70 -26 Q0 0 -90 34',11)+knob(-92,35,4)},
  {n:'前腳',v:'p_fleg',x:362,y:262,g:legs(12,76,12)},
  {n:'後腳',v:'p_bleg',x:245,y:262,g:legs(14,76,13)}]},
 trike:{body:'#FFC48A',eye:[492,190],sil:'M70 240 Q130 210 200 200 Q250 160 330 165 Q380 165 410 180 Q430 120 470 120 Q520 130 535 175 Q560 190 560 210 Q540 232 500 232 Q470 240 440 225 L425 225 L420 300 H385 L378 238 Q330 245 280 240 L275 300 H240 L235 236 Q170 240 70 240Z',
  spots:[[300,205,13],[262,214,9],[338,202,9]],
  parts:[{n:'頭',v:'p_head',x:485,y:200,g:shp('M-45 -8 Q-40 -34 -6 -34 Q30 -34 48 -10 Q62 0 58 12 Q40 26 10 24 Q-30 26 -45 -8Z')+bone('M-4 -32 Q-10 -56 -2 -74',7)+bone('M14 -30 Q14 -54 24 -70',7)+bone('M46 -6 Q56 -18 60 -26',6)+'<circle cx="8" cy="-12" r="6" fill="#7E5640"/>'},
  {n:'頭盾',v:'p_frill',z:-1,x:440,y:160,g:shp('M-30 40 Q-50 0 -20 -36 Q10 -60 40 -40 Q30 0 20 40Z')+[[-28,10],[-30,-16],[-12,-38],[14,-46],[34,-36]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="${O}"/>`).join('')},
  {n:'身體',v:'p_body',x:310,y:198,g:bone('M-100 0 Q0 -46 100 -6',13)+ribs(-72,72,-20,44,6)},
  {n:'尾巴',v:'p_tail',x:150,y:222,g:bone('M70 -22 Q0 0 -80 20',11)+knob(-82,21,4)},
  {n:'前腳',v:'p_fleg',x:400,y:265,g:legs(12,64,13)},
  {n:'後腳',v:'p_bleg',x:258,y:265,g:legs(14,64,14)}]},
 trex:{body:'#9FB8F0',eye:[470,74],sil:'M40 160 Q120 150 200 150 Q260 110 330 120 Q370 110 395 80 Q420 50 470 55 Q530 62 545 90 Q550 115 520 122 Q480 128 455 122 Q430 140 395 160 Q380 190 350 200 L345 210 L330 300 H295 L300 215 L290 300 H255 L262 205 Q230 190 200 175 Q120 175 40 160Z',
  spots:[[318,150,12],[284,158,9],[350,146,8]],
  parts:[{n:'頭',v:'p_head',x:490,y:92,g:shp('M-50 -8 Q-46 -38 -6 -40 Q40 -40 56 -14 Q60 4 46 8 L-20 10 Q-44 12 -50 -8Z')+shp('M-30 12 Q0 24 40 14 Q42 24 24 30 Q-10 34 -30 22Z')+'<circle cx="-20" cy="-18" r="7" fill="#7E5640"/><ellipse cx="10" cy="-14" rx="7" ry="5" fill="#7E5640" opacity=".8"/>'+[-24,-12,0,12,24,36].map(x=>`<path d="M${x} 9 l3 6 l3 -6Z" fill="#fff" stroke="${O}" stroke-width="1"/>`).join('')},
  {n:'脖子',v:'p_neck2',x:415,y:118,g:bone('M-26 34 Q0 10 20 -26',13)},
  {n:'身體',v:'p_body',x:320,y:158,g:bone('M-80 -16 Q0 -44 70 -24',13)+ribs(-50,50,-26,46,5)},
  {n:'小手',v:'p_arm',x:388,y:178,g:bone('M-6 -12 Q4 0 14 4',6)+bone('M14 4 l8 2 M14 4 l6 7',3)},
  {n:'尾巴前段',v:'p_tail1',x:200,y:162,g:bone('M70 -2 Q20 -8 -50 -2',12)},
  {n:'尾巴後段',v:'p_tail2',x:90,y:162,g:bone('M58 -2 Q0 0 -50 6',8)+knob(-52,6,3)},
  {n:'左腳',v:'p_lleg',x:278,y:250,g:bone('M0 -44 Q14 -10 4 24',14)+bone('M4 24 Q2 36 -6 46',8)+`<ellipse cx="2" cy="50" rx="16" ry="6" fill="${B}" stroke="${O}" stroke-width="2.5"/>`},
  {n:'右腳',v:'p_rleg',x:320,y:252,g:bone('M0 -44 Q14 -10 4 24',14)+bone('M4 24 Q2 36 -6 46',8)+`<ellipse cx="2" cy="50" rx="16" ry="6" fill="${B}" stroke="${O}" stroke-width="2.5"/>`}]},
 // 新：劍龍（背上骨板、尾巴尖刺）
 stego:{body:'#F7B6C8',eye:[512,226],sil:'M60 205 Q120 200 180 195 Q230 150 300 145 Q370 145 420 185 Q460 210 500 212 Q532 214 542 230 Q536 248 505 248 Q470 248 440 236 L428 240 L422 300 H390 L384 245 Q330 252 276 246 L271 300 H234 L229 238 Q160 232 60 205Z M58 204 L40 178 L72 200Z M78 199 L66 170 L94 195Z M222 152 L226 110 L246 96 L262 112 L262 145Z M268 142 L276 96 L298 80 L314 98 L310 140Z M318 142 L328 100 L348 90 L362 108 L352 150Z M362 156 L376 124 L392 118 L402 134 L388 168Z',
  spots:[[300,200,13],[260,206,9],[345,196,9]],
  parts:[{n:'頭',v:'p_head',x:505,y:232,g:shp('M-40 -4 Q-32 -22 0 -22 Q30 -20 40 -4 Q42 10 20 14 Q-20 16 -40 -4Z')+'<circle cx="8" cy="-8" r="5" fill="#7E5640"/>'+bone('M-34 2 Q-10 10 30 4',3)},
  {n:'背上的骨板',v:'p_plate',z:-1,x:310,y:128,g:plate(-70,40)+plate(-24,52)+plate(24,52)+plate(66,38)},
  {n:'身體',v:'p_body',x:300,y:196,g:bone('M-110 6 Q0 -46 110 0',13)+ribs(-76,76,-16,40,6)},
  {n:'尾巴',v:'p_tail',x:140,y:210,g:bone('M70 -12 Q0 -4 -76 -8',11)+bone('M-56 -10 L-74 -34',5)+bone('M-40 -10 L-50 -36',5)},
  {n:'前腳',v:'p_fleg',x:406,y:270,g:legs(10,58,11)},
  {n:'後腳',v:'p_bleg',x:252,y:270,g:legs(12,62,13)}]},
 // 新：鴨嘴龍（頭上長長的頭冠）
 para:{body:'#B8E08A',eye:[482,100],sil:'M60 175 Q140 160 220 160 Q270 130 340 140 Q390 140 420 120 Q440 100 462 94 L420 70 Q408 62 418 56 L486 86 Q518 94 528 112 Q520 128 495 128 Q470 128 455 140 Q430 170 395 190 Q370 205 345 212 L330 300 H296 L302 222 Q275 226 254 212 L262 300 H228 L222 205 Q150 195 60 175Z',
  spots:[[300,172,12],[262,180,9],[338,166,9]],
  parts:[{n:'頭和頭冠',v:'p_crest',x:482,y:104,g:shp('M-30 -6 Q-24 -22 4 -22 Q30 -20 46 -4 Q50 8 34 10 Q0 14 -30 -6Z')+bone('M-14 -16 Q-40 -30 -64 -42',9)+'<circle cx="0" cy="-8" r="5" fill="#7E5640"/>'},
  {n:'脖子',v:'p_neck2',x:430,y:142,g:bone('M-30 30 Q0 10 30 -20',12)},
  {n:'身體',v:'p_body',x:300,y:176,g:bone('M-100 -6 Q0 -46 100 -14',13)+ribs(-70,70,-20,42,6)},
  {n:'小手',v:'p_arm',x:386,y:206,g:bone('M-8 -14 Q2 0 12 8',6)+bone('M12 8 l8 2 M12 8 l5 8',3)},
  {n:'尾巴',v:'p_tail',x:130,y:172,g:bone('M70 -4 Q0 -2 -72 4',11)+knob(-74,4,4)},
  {n:'後腳',v:'p_bleg',x:280,y:260,g:legs(14,70,13)}]},
 // 新：甲龍（骨甲、尾巴大槌子）
 anky:{body:'#E8C27A',eye:[516,222],sil:'M40 215 Q90 205 150 205 Q200 160 300 155 Q400 158 450 195 Q480 205 510 205 Q545 210 548 230 Q540 248 505 246 Q470 246 445 238 L432 300 H400 L396 246 Q330 252 270 248 L266 300 H232 L228 240 Q150 238 80 228 Q46 246 22 228 Q16 206 40 215Z',
  spots:[[260,196,10],[300,186,11],[340,196,10]],
  parts:[{n:'頭',v:'p_head',x:508,y:226,g:shp('M-34 -10 Q-28 -24 0 -24 Q30 -22 38 -6 Q40 12 18 16 Q-20 18 -34 -10Z')+bone('M-24 -22 L-34 -32',4)+bone('M-6 -24 L-10 -34',4)+'<circle cx="10" cy="-8" r="5" fill="#7E5640"/>'},
  {n:'背上的骨甲',v:'p_armor',z:-1,x:300,y:180,g:shp('M-120 30 Q-110 -26 0 -32 Q110 -26 120 30Z')+[[-80,10],[-40,-6],[0,-12],[40,-6],[80,10],[-60,22],[-20,10],[20,10],[60,22]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${B}" stroke="${O}" stroke-width="2.4"/>`).join('')},
  {n:'身體',v:'p_body',x:300,y:226,g:bone('M-100 0 Q0 -24 100 0',12)+ribs(-60,60,-6,26,5,6)},
  {n:'尾巴的大槌子',v:'p_club',x:92,y:222,g:bone('M64 -6 Q10 0 -30 4',10)+shp('M-30 -8 Q-52 -16 -62 2 Q-54 22 -30 16 Q-20 4 -30 -8Z')},
  {n:'前腳',v:'p_fleg',x:414,y:272,g:legs(10,52,13)},
  {n:'後腳',v:'p_bleg',x:250,y:272,g:legs(12,52,14)}]},
 // 新：蛇頸龍（海裡，四個鰭）
 plesio:{sea:1,body:'#8FD0E8',eye:[516,72],sil:'M90 212 Q130 200 160 195 Q200 158 270 156 Q330 156 360 175 Q400 150 430 110 Q455 72 490 62 Q525 56 540 70 Q545 84 525 88 Q500 90 480 100 Q450 125 425 170 Q400 205 370 222 L400 262 Q410 282 390 278 L340 242 Q300 250 250 248 L234 282 Q220 298 206 282 L208 240 Q170 232 150 225 Q120 225 90 212Z',
  spots:[[268,196,12],[230,204,9],[306,192,9]],
  parts:[{n:'頭',v:'p_head',x:512,y:74,g:shp('M-28 6 Q-26 -14 0 -14 Q26 -12 32 2 Q30 14 10 14 Q-16 16 -28 6Z')+'<circle cx="4" cy="-3" r="4.4" fill="#7E5640"/>'},
  {n:'長脖子',v:'p_lneck',x:428,y:132,g:bone('M-66 56 Q-30 30 -6 0 Q20 -34 58 -52',11)},
  {n:'身體',v:'p_body',x:268,y:202,g:bone('M-100 6 Q0 -46 96 0',13)+ribs(-60,60,-16,38,5)},
  {n:'尾巴',v:'p_tail',x:118,y:212,g:bone('M40 -6 Q0 0 -34 4',8)+knob(-36,4,3)},
  {n:'前面的鰭',v:'p_ffl',x:366,y:248,g:paddle(1)},
  {n:'後面的鰭',v:'p_bfl',x:214,y:256,g:paddle(.85)}]},
 // 新：翼龍（從前面看，翅膀張開）
 ptero:{sea:1,body:'#FFD58A',eye:[318,106],sil:'M290 162 Q200 120 70 135 Q120 175 150 205 Q200 192 285 208Z M310 162 Q400 120 530 135 Q480 175 450 205 Q400 192 315 208Z M300 148 Q324 150 324 196 Q324 240 300 246 Q276 240 276 196 Q276 150 300 148Z M300 94 Q332 92 386 108 Q338 118 314 126 L300 152 L288 126 Q266 112 240 94 Q270 102 300 94Z M288 240 L278 270 L296 262Z M312 240 L322 270 L304 262Z',
  spots:[[300,196,10],[190,166,9],[410,166,9]],
  parts:[{n:'頭',v:'p_head',x:304,y:112,g:shp('M-4 -16 Q26 -18 76 -4 Q30 4 10 12 L-4 22 L-14 10 Q-38 -4 -62 -18 Q-30 -10 -4 -16Z')+'<circle cx="12" cy="-6" r="4.4" fill="#7E5640"/>'},
  {n:'身體',v:'p_body',x:300,y:196,g:bone('M0 -40 V40',13)+ribs(-14,14,-24,20,3,5)},
  {n:'左邊的翅膀',v:'p_lwing',x:186,y:168,g:shp('M100 -6 Q30 -44 -110 -32 Q-60 6 -32 36 Q24 22 100 38Z')+bone('M96 -4 Q20 -36 -100 -30',6)},
  {n:'右邊的翅膀',v:'p_rwing',x:414,y:168,g:shp('M-100 -6 Q-30 -44 110 -32 Q60 6 32 36 Q-24 22 -100 38Z')+bone('M-96 -4 Q-20 -36 100 -30',6)},
  {n:'腳',v:'p_leg',x:300,y:256,g:bone('M-10 -16 L-18 14',6)+bone('M10 -16 L18 14',6)}]}
};
DINO.ammo={sea:1,body:'#F5C8A0',eye:null,sil:'M300 54 A118 118 0 1 0 300.1 54Z',spots:[[300,172,16],[352,140,9],[250,210,9]],parts:(()=>{const R=118,c0=300,c1=172,out=[],nm=[['菊石上面','p_am1'],['菊石右下','p_am2'],['菊石左下','p_am3']];
 for(let q=0;q<3;q++){const a0=(-150+120*q)*Math.PI/180,a1=(-30+120*q)*Math.PI/180,am=(a0+a1)/2,gx=Math.cos(am)*R*.5,gy=Math.sin(am)*R*.5;
  const wedge=`M0 0 L${(R*Math.cos(a0)).toFixed(1)} ${(R*Math.sin(a0)).toFixed(1)} A${R} ${R} 0 0 1 ${(R*Math.cos(a1)).toFixed(1)} ${(R*Math.sin(a1)).toFixed(1)}Z`;
  out.push({n:nm[q][0],v:nm[q][1],x:c0+gx,y:c1+gy,vb:'-110 -110 220 220',g:`<g transform="translate(${(-gx).toFixed(1)} ${(-gy).toFixed(1)})"><clipPath id="P23CLIP${q}"><path d="${wedge}"/></clipPath><g clip-path="url(#P23CLIP${q})">${AMM(R)}</g><path d="${wedge}" fill="none" stroke="${O}" stroke-width="4" stroke-linejoin="round"/></g>`})}
 return out})()};
const DORD=['brachio','trex','trike','para','anky','plesio','ptero','ammo','stego'];
// 禮物 fs_tri（id 沿用）＝劍龍化石；三角龍一直都是免費的（原本就挖得到，不拿走）
const DGIFT={stego:'fs_tri'};
const DNAME=k=>T26['n_'+k]||TP['n_'+k]||k;
const VBp=p=>p.vb||'-80 -80 160 160';
// 夾片 id 每次換新的（同一畫面出現兩次 iOS 才不會壞）
const pg=(p)=>p.g.indexOf('P23CLIP')<0?p.g:p.g.replace(/P23CLIP/g,uid('c'));
const SITES={
 valley:{pool:['brachio','trex','stego','para','ammo','trike'],sand:['#F2D6A4','#E0BA80'],dots:['#D9AE72','#FFF0D0','#C99A60'],deep:['#C99A6A','#A87A50'],line:'#C99A60'},
 forest:{pool:['anky','stego','para','brachio','trex','trike'],sand:['#C8A47C','#A98460'],dots:['#8E6A48','#E6D0B0','#7FA05A'],deep:['#8E6A48','#6E5038'],line:'#8E6A48'},
 beach:{gift:'fs_beach',pool:['plesio','ptero','ammo'],sand:['#FCEBC4','#F2D49A'],dots:['#FFFFFF','#E8C890','#9ED8F0'],deep:['#E0BE84','#C8A06A'],line:'#E2C28C'}};
const SORD=['valley','forest','beach'];
const siteOpen=k=>!SITES[k].gift||gHas(SITES[k].gift);
const dinoOpen=k=>!DGIFT[k]||gHas(DGIFT[k]);
// 著色：每一塊骨頭的位置分一區（Voronoi，剪在恐龍外形裡），再加三個花紋圓點
function cells(d){const pts=d.parts.map(p=>[p.x,p.y]);const box=[[0,0],[600,0],[600,340],[0,340]];
 return pts.map((p,i)=>{let poly=box.slice();pts.forEach((q,j)=>{if(i===j)return;const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,nx=q[0]-p[0],ny=q[1]-p[1];
  const inside=v=>(v[0]-mx)*nx+(v[1]-my)*ny<=0;const out=[];for(let k=0;k<poly.length;k++){const a=poly[k],b=poly[(k+1)%poly.length],ia=inside(a),ib=inside(b);if(ia)out.push(a);
   if(ia!==ib){const da=(a[0]-mx)*nx+(a[1]-my)*ny,db=(b[0]-mx)*nx+(b[1]-my)*ny,t=da/(da-db);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}poly=out});
  return poly.length?'M'+poly.map(v=>f1(v[0])+' '+f1(v[1])).join(' L')+'Z':''})}
const NREG=d=>d.parts.length+(d.spots?d.spots.length:0);
// 塗好的恐龍（600×340）：c＝每一區的顏色、p＝手指畫小圖
function dinoPaint(k,c,p,o){o=o||{};const d=DINO[k];if(!d)return '';const u=uid('d');const cs=cells(d);const n=d.parts.length;
 const col=i=>(c&&c[i])||(o.blank?'#FFFFFF':i>=n?shade(d.body):d.body);
 let s=`<defs><clipPath id="${u}c"><path d="${d.sil}"/></clipPath><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
 s+=`<g clip-path="url(#${u}c)">`+cs.map((pp,i)=>`<path d="${pp}" fill="${col(i)}" data-r="${i}" class="p23reg"/>`).join('')+(d.spots||[]).map(([x,y,r],j)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col(n+j)}" data-r="${n+j}" class="p23reg"/>`).join('');
 if(p)s+=`<image href="${p}" x="0" y="0" width="600" height="340" preserveAspectRatio="none" pointer-events="none"/>`;
 s+=cs.map(pp=>`<path d="${pp}" fill="none" stroke="#FFFFFF" stroke-width="3" opacity=".9" pointer-events="none"/>`).join('')+`<rect width="600" height="340" fill="url(#${u}g)" pointer-events="none"/></g>`;
 s+=`<path d="${d.sil}" fill="none" stroke="${o.blank?'#C9B6E8':'rgba(90,60,40,.25)'}" stroke-width="3" stroke-linejoin="round" pointer-events="none"/>`;
 if(d.eye){const [x,y]=d.eye;s+=`<g pointer-events="none"><circle cx="${x}" cy="${y}" r="7" fill="${EYE}"/><circle cx="${x+2.4}" cy="${y-2.4}" r="2.4" fill="#fff"/><ellipse cx="${x-4}" cy="${y+12}" rx="7" ry="4" fill="#FF9FB0" opacity=".55"/></g>`}
 return s}
function shade(c){try{const n=parseInt(c.slice(1),16);const r=Math.max(0,(n>>16)-40),g=Math.max(0,((n>>8)&255)-40),b=Math.max(0,(n&255)-40);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}catch(e){return c}}
const dinoSVG=(k,e,attr)=>`<svg viewBox="0 0 600 340" ${attr||''} aria-hidden="true">${dinoPaint(k,e&&e.c,e&&e.p)}</svg>`;
const dinoSil=(k,c)=>`<svg viewBox="0 0 600 340" aria-hidden="true"><path d="${DINO[k].sil}" fill="${c||'#CFC2EE'}"/></svg>`;

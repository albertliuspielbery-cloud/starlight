
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

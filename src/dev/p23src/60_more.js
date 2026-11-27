/* =====================================================================
 * 其他後期小遊戲：每玩完一次，送一樣小收集（每次不一樣，先送還沒有的），結束卡上看得到「這一套」收集到哪裡
 * 小小郵差＝郵票、火箭飛行＝太空貼紙、回收分類＝環保小徽章、小超市收銀台＝小店貼紙、浮沉小水盆＝水盆小玩具
 * 存檔：V2.p23.pk = {遊戲: {東西: 幾個}}；遊戲本身不動，只在結束卡加一排小圖
 * ===================================================================== */
const stampF=(u,inner,bg)=>`<defs>${lg(u+'s',bg[0],bg[1])}</defs><rect x="4" y="4" width="56" height="56" rx="2" fill="#FFFFFF"/>${Array.from({length:7},(_,i)=>`<circle cx="${6+i*8.67}" cy="4" r="2.4" fill="#E8E0F4"/><circle cx="${6+i*8.67}" cy="60" r="2.4" fill="#E8E0F4"/><circle cx="4" cy="${6+i*8.67}" r="2.4" fill="#E8E0F4"/><circle cx="60" cy="${6+i*8.67}" r="2.4" fill="#E8E0F4"/>`).join('')}<rect x="10" y="10" width="44" height="44" rx="4" fill="url(#${u}s)"/>${inner}`;
const heartP=(x,y,r)=>`M${x} ${y+r*.9} Q${x-r*1.3} ${y} ${x-r*.9} ${y-r*.6} Q${x-r*.4} ${y-r*1.1} ${x} ${y-r*.4} Q${x+r*.4} ${y-r*1.1} ${x+r*.9} ${y-r*.6} Q${x+r*1.3} ${y} ${x} ${y+r*.9}Z`;
const starP=(x,y,R,k=.48)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+f1(x+r*Math.cos(a))+' '+f1(y+r*Math.sin(a))}return d+'Z'};
const MORE={
 postgame:{n:'郵票',got:'收到一張新郵票！',all:'郵票都收集好了！',items:{
  st_flower:['花朵郵票',u=>stampF(u,flw(32,32,8,'#FF8FB8'),['#FFF0F6','#FFD6E8'])],
  st_star:['星星郵票',u=>stampF(u,`<path d="${starP(32,33,15)}" fill="#FFD24D"/>${hl(27,27,2,4,-30,.7)}`,['#EAF2FF','#C8DCFF'])],
  st_heart:['愛心郵票',u=>stampF(u,`<path d="${heartP(32,33,13)}" fill="#FF6F96"/>${hl(26,28,2,3.6,-30,.7)}`,['#FFF6E0','#FFE6B8'])],
  st_rainbow:['彩虹郵票',u=>stampF(u,['#FF8A8A','#FFC24D','#8EDB7A','#7FC4FF','#B99CFF'].map((c,i)=>`<path d="M${14+i*3} 46 A${18-i*3} ${18-i*3} 0 0 1 ${50-i*3} 46" stroke="${c}" stroke-width="3.4" fill="none"/>`).join(''),['#F0FBFF','#D8F2FF'])],
  st_boat:['小船郵票',u=>stampF(u,`<path d="M16 38 H48 L42 48 H22Z" fill="#FF8A6A"/><path d="M32 16 V38 M32 18 L46 34 H32Z" fill="#FFFFFF" stroke="#C8B8E8" stroke-width="1.4"/><path d="M12 50 Q22 46 32 50 Q42 54 52 50" stroke="#4FB0E0" stroke-width="2.4" fill="none"/>`,['#EAF8FF','#BFE8FF'])],
  st_balloon:['熱氣球郵票',u=>stampF(u,`<path d="M32 12 Q46 12 46 27 Q46 36 36 42 H28 Q18 36 18 27 Q18 12 32 12Z" fill="#FF9FB8"/><path d="M32 12 Q38 24 34 42 M32 12 Q26 24 30 42" stroke="#FFE27A" stroke-width="2.4" fill="none"/><rect x="28" y="45" width="8" height="6" rx="1.4" fill="#C99A6A"/>${hl(24,22,2,5,-20,.6)}`,['#FFF8E8','#E8F4FF'])]}},
 rocket26:{n:'太空貼紙',got:'得到一張新的太空貼紙！',all:'太空貼紙都收集好了！',items:{
  sp_moon:['月亮',u=>`<defs>${rg(u+'m','#FFF6C8','#FFD24D')}</defs><circle cx="32" cy="32" r="26" fill="#2E2A70"/><path d="M38 12 A20 20 0 1 0 50 44 A16 16 0 1 1 38 12Z" fill="url(#${u}m)"/>${hl(28,22,2.4,5,-30,.6)}`],
  sp_saturn:['土星',u=>`<defs>${rg(u+'s','#FFE8B8','#E8A85A')}</defs><circle cx="32" cy="32" r="26" fill="#2E2A70"/><circle cx="32" cy="32" r="13" fill="url(#${u}s)"/><ellipse cx="32" cy="33" rx="24" ry="6" fill="none" stroke="#FFD8A0" stroke-width="3" transform="rotate(-18 32 33)"/>${hl(27,27,2,4,-30,.6)}`],
  sp_earth:['地球',u=>`<defs>${rg(u+'e','#9ADCF6','#3F8AE0')}</defs><circle cx="32" cy="32" r="26" fill="#2E2A70"/><circle cx="32" cy="32" r="16" fill="url(#${u}e)"/><path d="M22 26 Q28 20 34 24 Q32 30 26 32Z M36 36 Q44 34 44 40 Q40 46 34 44Z" fill="#6FCF6A"/>${hl(26,24,2,4,-30,.6)}`],
  sp_comet:['彗星',u=>`<circle cx="32" cy="32" r="26" fill="#2E2A70"/><path d="M40 24 L12 46 L16 42 L10 40Z" fill="#9ADCF6" opacity=".7"/><path d="M42 22 L18 48" stroke="#BFEFFF" stroke-width="5" stroke-linecap="round" opacity=".6"/><circle cx="42" cy="22" r="7" fill="#FFFFFF"/>`],
  sp_rocket:['小火箭',u=>`<circle cx="32" cy="32" r="26" fill="#2E2A70"/><path d="M32 12 Q42 20 40 38 H24 Q22 20 32 12Z" fill="#F0F4FF"/><circle cx="32" cy="26" r="4" fill="#7FD0FF"/><path d="M24 34 L18 42 H25Z M40 34 L46 42 H39Z" fill="#FF7A7A"/><path d="M28 40 Q32 52 36 40Z" fill="#FFB35C"/>`],
  sp_star:['亮晶晶星星',u=>`<circle cx="32" cy="32" r="26" fill="#2E2A70"/><path d="${starP(32,32,16)}" fill="#FFE27A"/>${[[14,16],[50,18],[48,48],[16,46]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="#fff"/>`).join('')}`]}},
 recyclesort:{n:'環保小徽章',got:'得到一個新的環保小徽章！',all:'環保小徽章都收集好了！',items:{
  bd_leaf:['綠葉徽章',u=>`<circle cx="32" cy="32" r="26" fill="#8EDB7A"/><circle cx="32" cy="32" r="20" fill="#E8FFE0"/><path d="M22 42 Q20 22 42 20 Q44 40 22 42Z" fill="#4FA84A"/><path d="M22 42 L38 26" stroke="#E8FFE0" stroke-width="2"/>`],
  bd_bottle:['瓶子徽章',u=>`<circle cx="32" cy="32" r="26" fill="#7FC4FF"/><circle cx="32" cy="32" r="20" fill="#EAF6FF"/><rect x="27" y="14" width="10" height="6" rx="2" fill="#4F8AE0"/><path d="M26 22 H38 Q40 26 40 30 V46 Q40 50 36 50 H28 Q24 50 24 46 V30 Q24 26 26 22Z" fill="#9ADCF6"/>${hl(29,32,1.6,6,0,.8)}`],
  bd_paper:['紙箱徽章',u=>`<circle cx="32" cy="32" r="26" fill="#FFC24D"/><circle cx="32" cy="32" r="20" fill="#FFF6E0"/><path d="M18 26 L32 20 L46 26 V42 L32 48 L18 42Z" fill="#D8A870"/><path d="M18 26 L32 32 L46 26 M32 32 V48" stroke="#B88A50" stroke-width="1.6" fill="none"/>`],
  bd_can:['鐵罐徽章',u=>`<circle cx="32" cy="32" r="26" fill="#B99CFF"/><circle cx="32" cy="32" r="20" fill="#F4F0FF"/><rect x="23" y="18" width="18" height="28" rx="4" fill="#C8D0E0"/><rect x="23" y="26" width="18" height="10" fill="#FF8A8A"/>${hl(27,30,1.6,8,0,.8)}`],
  bd_heart:['愛地球徽章',u=>`<circle cx="32" cy="32" r="26" fill="#FF9FB8"/><circle cx="32" cy="32" r="20" fill="#FFF0F4"/><path d="${heartP(32,33,13)}" fill="#7FC4FF"/><path d="M24 30 Q28 26 32 30 Q30 36 26 36Z" fill="#8EDB7A"/>`],
  bd_star:['小尖兵徽章',u=>`<circle cx="32" cy="32" r="26" fill="#FFD24D"/><circle cx="32" cy="32" r="20" fill="#FFFBE8"/><path d="${starP(32,33,14)}" fill="#FFB81C"/><path d="M20 52 L24 60 L32 56 L40 60 L44 52" fill="#FF8A8A"/>`]}},
 cashier:{n:'小店貼紙',got:'得到一張新的小店貼紙！',all:'小店貼紙都收集好了！',items:{
  sk_apple:['蘋果',u=>`<defs>${rg(u+'a','#FF9A9A','#E84A4A')}</defs><circle cx="32" cy="32" r="27" fill="#FFF6E8"/><path d="M32 22 Q44 14 48 30 Q48 46 32 50 Q16 46 16 30 Q20 14 32 22Z" fill="url(#${u}a)"/><path d="M32 22 Q32 14 36 10" stroke="#8A5A36" stroke-width="2.4" fill="none"/><path d="M34 16 Q42 10 44 16 Q38 20 34 16Z" fill="#6FBF5A"/>${hl(24,28,2.4,5,-20,.6)}`],
  sk_banana:['香蕉',u=>`<circle cx="32" cy="32" r="27" fill="#FFF6E8"/><g transform="translate(4 4) scale(.9)">${BAN()}</g>`],
  sk_carrot:['紅蘿蔔',u=>`<circle cx="32" cy="32" r="27" fill="#FFF6E8"/><path d="M24 22 L42 24 Q36 40 26 50 Q22 40 24 22Z" fill="#FF9A4A"/><path d="M28 30 H33 M27 37 H31" stroke="#E8782E" stroke-width="1.6"/><path d="M33 22 Q30 12 26 10 M33 22 Q36 12 42 12 M33 22 Q40 18 44 20" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/>`],
  sk_bread:['麵包',u=>`<circle cx="32" cy="32" r="27" fill="#FFF6E8"/><path d="M14 36 Q14 22 32 22 Q50 22 50 36 Q50 44 44 44 H20 Q14 44 14 36Z" fill="#E8B070"/><path d="M24 28 L28 34 M32 26 L36 32 M40 28 L42 33" stroke="#FFE8C0" stroke-width="2.4" stroke-linecap="round"/>`],
  sk_milk:['牛奶',u=>`<circle cx="32" cy="32" r="27" fill="#FFF6E8"/><path d="M24 20 L28 14 H36 L40 20 V48 Q40 50 38 50 H26 Q24 50 24 48Z" fill="#FFFFFF"/><path d="M24 20 H40" stroke="#C8D8F0" stroke-width="2"/><rect x="24" y="28" width="16" height="10" fill="#7FC4FF"/><path d="${heartP(32,33,3.4)}" fill="#fff"/>`],
  sk_straw:['草莓',u=>`<circle cx="32" cy="32" r="27" fill="#FFF6E8"/><path d="M20 24 Q32 18 44 24 Q44 40 32 50 Q20 40 20 24Z" fill="#FF6F7A"/>${[[26,30],[34,28],[38,36],[28,38],[32,44]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1" ry="1.6" fill="#FFE27A"/>`).join('')}<path d="M24 22 L32 16 L40 22 L32 26Z" fill="#6FBF5A"/>`]}},
 floatsink:{n:'水盆小玩具',got:'得到一個新的水盆小玩具！',all:'水盆小玩具都收集好了！',items:{
  ty_duck:['小黃鴨',u=>`<circle cx="32" cy="32" r="27" fill="#E0F4FF"/><ellipse cx="30" cy="40" rx="16" ry="10" fill="#FFD84D"/><circle cx="38" cy="26" r="9" fill="#FFD84D"/><path d="M45 26 L52 28 L45 31Z" fill="#FF9A4A"/>${eye(40,24,1.8)}<path d="M22 38 Q28 34 32 40" stroke="#F0B820" stroke-width="2" fill="none"/>`],
  ty_boat:['小紙船',u=>`<circle cx="32" cy="32" r="27" fill="#E0F4FF"/><path d="M12 36 H52 L44 46 H20Z" fill="#FFFFFF"/><path d="M20 36 L32 18 L44 36Z" fill="#FFB3D1"/><path d="M10 48 Q22 44 32 48 Q42 52 54 48" stroke="#7FC4FF" stroke-width="2.4" fill="none"/>`],
  ty_star:['海星',u=>`<circle cx="32" cy="32" r="27" fill="#E0F4FF"/><path d="${starP(32,34,17,.5)}" fill="#FF9A7A"/>${[[32,24],[40,32],[36,40],[28,40],[24,32]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.4" fill="#FFE0D0"/>`).join('')}`],
  ty_ball:['小皮球',u=>`<defs>${rg(u+'b','#FFFFFF','#FF8FB8')}</defs><circle cx="32" cy="32" r="27" fill="#E0F4FF"/><circle cx="32" cy="34" r="15" fill="url(#${u}b)"/><path d="M17 34 Q32 26 47 34" stroke="#7FC4FF" stroke-width="3" fill="none"/>`],
  ty_shell:['小貝殼',u=>`<circle cx="32" cy="32" r="27" fill="#E0F4FF"/><path d="M32 48 L16 30 Q18 16 32 14 Q46 16 48 30Z" fill="#FFD0DC"/>${[-10,-5,0,5,10].map(x=>`<path d="M32 46 L${32+x*1.4} 17" stroke="#F49AB6" stroke-width="1.4"/>`).join('')}`],
  ty_whale:['小鯨魚',u=>`<circle cx="32" cy="32" r="27" fill="#E0F4FF"/><path d="M12 36 Q14 22 32 22 Q48 22 50 34 Q52 44 36 46 H22 Q12 46 12 36Z" fill="#7FB8F0"/><path d="M50 34 L58 28 L56 38Z" fill="#7FB8F0"/><path d="M30 22 Q28 14 24 12 M30 22 Q32 14 36 12" stroke="#9ADCF6" stroke-width="2" fill="none" stroke-linecap="round"/>${eye(22,32,1.8)}${blush(24,38,2.4)}`]}}};
const AGAINID={postgame:'#ppagain',rocket26:'#r26re',recyclesort:'#ragain',cashier:'#cagain',floatsink:'#fagain'};
const moreSVG=(g,k)=>{const it=MORE[g]&&MORE[g].items[k];return it?`<svg viewBox="0 0 64 64" aria-hidden="true">${it[1](uid('k'))}</svg>`:''};
function moreGive(g){const P=ST();if(!P.pk||typeof P.pk!=='object')P.pk={};const o=P.pk[g]=P.pk[g]&&typeof P.pk[g]==='object'?P.pk[g]:{};const ks=Object.keys(MORE[g].items);
 let c=ks.filter(k=>!o[k]);const fresh=c.length>0;if(!c.length)c=ks;const k=pick(c);o[k]=(o[k]||0)+1;SV2();return {k,fresh,all:ks.every(x=>o[x])}}
{const _ov=overlay;overlay=function(host,html){const ov=_ov.apply(this,arguments);try{if(S.screen==='cashier'&&ov&&ov.querySelector('#cagain'))ov.classList.add('p23cash')}catch(e){}try{const g=S.screen;if(MORE[g]&&ov&&ov.querySelector(AGAINID[g])&&!ov.querySelector('.p23col')){
  const r=moreGive(g),M=MORE[g],o=ST().pk[g];const ks=Object.keys(M.items);
  const box=document.createElement('div');box.className='p23col';
  box.setAttribute('aria-label',M.got+M.items[r.k][0]);
  box.innerHTML=`<i class="p23cn">${moreSVG(g,r.k)}</i><div class="p23cx"><b class="p23colt">${M.got}</b><span class="p23cd">${M.items[r.k][0]}　${ks.map(k=>`<s class="${o[k]?'got':''}${k===r.k?' new':''}"></s>`).join('')}</span></div>`;
  const row=ov.querySelector(AGAINID[g]).closest('.row');if(row&&row.parentNode)row.parentNode.insertBefore(box,row);else (ov.querySelector('.card')||ov).appendChild(box);
  if(r.all&&r.fresh){const t=box.querySelector('.p23colt');if(t)t.textContent=M.all}}}catch(e){console.log('p23 more',e)}return ov}}

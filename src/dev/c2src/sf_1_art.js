/* ---------- 美術小工具（大圖用；全部原創） ---------- */
const SK='#FFE4D4',BL='#FFB3C1',EY='#2B2630';
const R=(x,y,w,h,f,rx=0,ex='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const C=(x,y,r,f,ex='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${ex}/>`;
const E=(x,y,rx,ry,f,ex='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P=(d,f,ex='')=>`<path d="${d}" fill="${f}" ${ex}/>`;
const Ln=(x1,y1,x2,y2,c,w,ex='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const PL=(d,c,w,ex='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const G=(x,y,inner,ex='')=>`<g transform="translate(${x} ${y})" ${ex}>${inner}</g>`;
const HI=(x,y,rx,ry,o=.55)=>E(x,y,rx,ry,'#fff',`opacity="${o}"`);
const TX=(x,y,t,sz,f,ex='')=>`<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="middle" font-weight="700" font-family="var(--cjk,sans-serif)" ${ex}>${t}</text>`;
// 漸層：K 是一張圖的工具箱（id 每次唯一）
function kit(){const pre=uid('d8');let n=0;const defs=[];
 const K={defs,id:()=>pre+'_'+(n++),
  lg(c1,c2,hz){const id=K.id();defs.push(`<linearGradient id="${id}" x1="0" y1="0" x2="${hz?1:0}" y2="${hz?0:1}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`);return `url(#${id})`},
  rg(c1,c2){const id=K.id();defs.push(`<radialGradient id="${id}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`);return `url(#${id})`},
  out(){return defs.length?`<defs>${defs.join('')}</defs>`:''}};
 return K}
const lt=(hex,a=.35)=>{try{const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r+(255-r)*a);g=Math.round(g+(255-g)*a);b=Math.round(b+(255-b)*a);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}catch(e){return hex}};
const dk=(hex,a=.2)=>{try{const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r*(1-a));g=Math.round(g*(1-a));b=Math.round(b*(1-a));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}catch(e){return hex}};
/* 小朋友／大人：(x,y)＝兩腳中間；小朋友約 100 高，大人約 160 高。
   o: s 大小、pose(stand|walk|run|low|reach|wave|up|hold|phone|sit|push|point|cover)、girl、adult、shirt、pants、hair、flip、mouth(smile|o|open)、
      hat(helmet 安全帽｜fire 消防帽｜cap 泳帽｜police)、strap(true 扣好｜false 沒扣)、mask 面罩、ear 耳機、wet 濕的手、hand 手上拿的東西（svg，畫在右手） */
function person(K,x,y,o={}){
 const s=o.s||1,ad=!!o.adult,girl=o.girl!==false,pose=o.pose||'stand';
 const shirt=o.shirt||(girl?'#FF9EC4':'#7FC8F8'),pants=o.pants||(ad?'#6C7AC8':'#7C8CE0'),hair=o.hair||(ad?'#5A4038':'#6B4A3A');
 const hr=ad?15:17,hy=ad?-136:-70,bt=ad?-118:-52,bb=ad?-60:-24,bw=ad?36:30;
 let g=E(0,0,ad?26:21,5,'#2A1A4A','opacity=".13"');
 const low=pose==='low',sit=pose==='sit';
 // 腳
 const lw=ad?9:8;
 if(low){g+=PL(`M-4 -15 L10 -12 L6 -2`,pants,lw)+PL(`M6 -15 L20 -10 L18 -2`,pants,lw)+E(6,-1,7,4,'#E86A8A')+E(20,-1,7,4,'#E86A8A')}
 else if(sit){g+=PL(`M-7 ${bb+2} L-7 ${bb+6} L18 ${bb+8}`,pants,lw)+PL(`M7 ${bb+2} L24 ${bb+6}`,pants,lw)+E(22,bb+8,5,6,'#E86A8A')+E(28,bb+6,5,6,'#E86A8A')}
 else{const sp=pose==='run'?[[-14,4],[16,-6]]:pose==='walk'||pose==='push'?[[-9,0],[10,0]]:[[-7,0],[7,0]];
  sp.forEach(([dx,ly],i)=>{const sx=i?6:-6;g+=PL(`M${sx} ${bb} L${sx+dx*.5} ${(bb)/2} L${dx} ${-4+ly}`,pants,lw)+E(dx+(i?2:-2),-2+ly,ad?8:7,4.2,ad?'#5A4A6A':'#E86A8A')})}
 // 身體＋手（上半身可以往前彎）
 let up='';const sg=K.lg(lt(shirt,.3),shirt);
 up+=R(-bw/2,bt,bw,bb-bt+4,sg,12);
 if(girl&&!ad)up+=P(`M${-bw/2-3} ${bb+4} L${bw/2+3} ${bb+4} L${bw/2-1} ${bb-8} L${-bw/2+1} ${bb-8}Z`,dk(shirt,.08));
 up+=HI(-bw/4,bt+8,4,7,.35);
 if(o.vest)up+=R(-bw/2+3,bt+4,bw-6,bb-bt-6,'#FFE14D',8)+R(-bw/2+3,bt+16,bw-6,4,'#fff')+R(-bw/2+3,bt+26,bw-6,4,'#fff');
 if(o.fire)up+=R(-bw/2,bt,bw,bb-bt+4,K.lg('#F2C36B','#D99A3A'),12)+R(-bw/2,bt+18,bw,5,'#E8F86A')+R(-bw/2,bt+32,bw,5,'#E8F86A');
 const sh=[[-bw/2+4,bt+7],[bw/2-4,bt+7]];
 const H={stand:[[-bw/2-5,bt+30],[bw/2+5,bt+30]],walk:[[-bw/2-9,bt+26],[bw/2+9,bt+30]],run:[[-bw/2-14,bt+18],[bw/2+14,bt+30]],
  reach:[[-bw/2-5,bt+30],[bw/2+26,bt+2]],wave:[[-bw/2-5,bt+30],[bw/2+12,bt-20]],up:[[-bw/2-10,bt-20],[bw/2+10,bt-20]],hold:[[-8,bt+22],[8,bt+22]],
  phone:[[-bw/2-5,bt+30],[9,hy+16]],sit:[[-bw/2-4,bt+28],[bw/2+10,bt+24]],push:[[bw/2+10,bt+16],[bw/2+24,bt+14]],point:[[-bw/2-5,bt+30],[bw/2+30,bt+8]],
  cover:[[-11,hy+8],[11,hy+8]],low:[[bw/2+10,bt+34],[bw/2+18,bt+20]],bike:[[bw/2+18,bt+26],[bw/2+22,bt+24]]}[pose]||[[-bw/2-5,bt+30],[bw/2+5,bt+30]];
 const aw=ad?8:7;
 H.forEach(([hx,hy2],i)=>{up+=PL(`M${sh[i][0]} ${sh[i][1]} L${hx} ${hy2}`,o.fire?'#E0A848':lt(shirt,.15),aw)+C(hx,hy2,aw*.62,SK);if(o.wet)up+=P(`M${hx+4} ${hy2+6} q3 5 0 7 q-3 -2 0 -7Z`,'#7FD0FF')+P(`M${hx-5} ${hy2+9} q2.4 4 0 5.6 q-2.4 -1.6 0 -5.6Z`,'#7FD0FF')});
 if(o.hand){const [hx,hy2]=H[1];up+=G(hx,hy2,o.hand)}
 // 頭
 let hd='';
 if(girl){hd+=C(-hr*.98,hy+2,hr*.42,hair)+C(hr*.98,hy+2,hr*.42,hair)}
 hd+=C(0,hy,hr,SK);
 hd+=P(`M${-hr-1} ${hy+1} Q${-hr} ${hy-hr-4} 0 ${hy-hr-2} Q${hr} ${hy-hr-4} ${hr+1} ${hy+1} Q${hr*.6} ${hy-hr*.45} ${hr*.1} ${hy-hr*.6} Q${-hr*.5} ${hy-hr*.35} ${-hr-1} ${hy+1}Z`,hair);
 hd+=HI(-hr*.35,hy-hr*.7,hr*.28,hr*.12,.4);
 const ex=hr*.38;
 if(!o.mask){[-ex,ex].forEach(x2=>{hd+=C(x2,hy+2,ad?2.4:2.8,EY)+C(x2+.9,hy+1.1,.95,'#fff')});
  hd+=E(-hr*.62,hy+hr*.42,3.4,2.1,BL)+E(hr*.62,hy+hr*.42,3.4,2.1,BL);
  hd+=o.mouth==='o'?E(0,hy+hr*.5,2.6,3,'#C8506A'):o.mouth==='open'?P(`M-4 ${hy+hr*.4} Q0 ${hy+hr*.9} 4 ${hy+hr*.4}Z`,'#C8506A'):PL(`M-4 ${hy+hr*.42} Q0 ${hy+hr*.7} 4 ${hy+hr*.42}`,'#C8506A',1.8)}
 if(o.hat==='helmet'){const hc=o.hc||'#FF8A5C';hd+=P(`M${-hr-3} ${hy-2} Q${-hr-2} ${hy-hr-9} 0 ${hy-hr-9} Q${hr+2} ${hy-hr-9} ${hr+3} ${hy-2}Z`,K.lg(lt(hc,.3),hc))+R(-hr-4,hy-4,2*hr+8,4,dk(hc,.15),2)+HI(-hr*.3,hy-hr-3,hr*.4,2.4,.5);
  if(o.strap===false)hd+=PL(`M${-hr+1} ${hy-1} L${-hr-3} ${hy+14}`,'#5A5A7A',2.2)+PL(`M${hr-1} ${hy-1} L${hr+5} ${hy+12}`,'#5A5A7A',2.2);
  else hd+=PL(`M${-hr+1} ${hy-1} Q${-hr+2} ${hy+hr} 0 ${hy+hr+1} Q${hr-2} ${hy+hr} ${hr-1} ${hy-1}`,'#5A5A7A',2.2)+R(-3,hy+hr-1,6,4,'#FFD24D',1)}
 if(o.hat==='fire'){hd+=P(`M${-hr-5} ${hy-1} Q${-hr-3} ${hy-hr-11} 0 ${hy-hr-11} Q${hr+3} ${hy-hr-11} ${hr+5} ${hy-1}Z`,K.lg('#FF6A6A','#E03A3A'))+E(0,hy-1,hr+9,4,'#C82A2A')+P(`M-5 ${hy-hr-8} h10 l-2 9 h-6Z`,'#FFD24D')}
 if(o.hat==='cap'){hd+=P(`M${-hr-1} ${hy} Q${-hr} ${hy-hr-5} 0 ${hy-hr-5} Q${hr} ${hy-hr-5} ${hr+1} ${hy}Z`,o.hc||'#6FD3FF')+HI(-hr*.3,hy-hr,hr*.35,2.2,.5)}
 if(o.hat==='police'){hd+=P(`M${-hr-2} ${hy-4} L${-hr+2} ${hy-hr-7} L${hr-2} ${hy-hr-7} L${hr+2} ${hy-4}Z`,'#3A5AB8')+R(-hr-4,hy-5,2*hr+8,4,'#2A3A88',2)+C(0,hy-hr-1,3,'#FFD24D')}
 if(o.mask){hd+=E(0,hy+2,hr*.82,hr*.7,'#BFE8FF','opacity=".9"')+HI(-hr*.3,hy-3,hr*.25,3,.7);[-ex,ex].forEach(x2=>{hd+=C(x2,hy+1,2.6,EY)+C(x2+.9,hy+.2,.9,'#fff')});hd+=E(0,hy+hr*.62,5,4,'#8A9AB0')+PL(`M0 ${hy+hr*.8} Q8 ${hy+hr+8} 14 ${bt+12}`,'#8A9AB0',3)+E(-hr*.6,hy+hr*.36,3,1.8,BL,'opacity=".8"')+E(hr*.6,hy+hr*.36,3,1.8,BL,'opacity=".8"')}
 if(o.ear){hd+=PL(`M${-hr-2} ${hy+2} Q0 ${hy-hr-10} ${hr+2} ${hy+2}`,'#7A6AD8',3)+R(-hr-6,hy-3,7,11,'#9A8AF0',3)+R(hr-1,hy-3,7,11,'#9A8AF0',3)}
 if(o.earNeck){up+=PL(`M${-9} ${bt+2} Q0 ${bt+10} ${9} ${bt+2}`,'#7A6AD8',3)+R(-13,bt-2,7,9,'#9A8AF0',3)+R(6,bt-2,7,9,'#9A8AF0',3)}
 if(o.bag)hd+=P(`M${-hr-5} ${hy+hr*.55} Q${-hr-7} ${hy-hr-10} 0 ${hy-hr-12} Q${hr+7} ${hy-hr-10} ${hr+5} ${hy+hr*.55}Z`,'#E8F4FF','opacity=".72"')+PL(`M${-hr-5} ${hy+hr*.55} L${hr+5} ${hy+hr*.55}`,'#BFD8F0',2)+HI(-hr*.5,hy-hr*.4,3,7,.8);
 let body=up+hd;
 if(low){body=`<g transform="translate(4 ${ad?14:9}) rotate(24 0 ${bb})">${up+hd}</g>`}
 if(sit)body=G(0,6,up+hd);
 return `<g transform="translate(${x} ${y}) scale(${o.flip?-s:s} ${s})">${g}${body}</g>`}
/* 動物朋友：有 B 畫好的（AN 裡有）就用，沒有用現有的 */
const ANX={firedog46:'dog',bearcop47:'blackbear',otter48:'seal',cat49:'kitten',spotdog46:'dog'};
function anKey(k){try{if(AN&&Object.prototype.hasOwnProperty.call(AN,k))return k;const f=ANX[k];if(f&&Object.prototype.hasOwnProperty.call(AN,f))return f}catch(e){}return null}
function an(k,x,y,sz,flip){const kk=anKey(k);if(!kk)return '';let s='';try{s=animal(kk)}catch(e){return ''}
 s=s.replace(/^<svg /,`<svg x="${flip?-x-sz/2:x-sz/2}" y="${y-sz}" width="${sz}" height="${sz}" `);return flip?`<g transform="scale(-1 1)">${s}</g>`:s}
/* 常用小東西 */
const smoke=(x,y,s=1,o=.55)=>G(x,y,`<g opacity="${o}" class="d8smoke">${C(0,0,18*s,'#C9C6D8')+C(20*s,-8*s,22*s,'#D6D3E3')+C(42*s,0,17*s,'#C9C6D8')+C(18*s,8*s,16*s,'#BDBACE')}</g>`);
const flame=(x,y,s=1)=>G(x,y,`<g class="d8flame">${P(`M0 0 Q${-12*s} ${-8*s} ${-4*s} ${-24*s} Q${-1*s} ${-14*s} ${4*s} ${-20*s} Q${2*s} ${-30*s} ${8*s} ${-34*s} Q${14*s} ${-18*s} ${11*s} ${-6*s} Q${9*s} 0 0 0Z`,'#FF9A3C')+P(`M${2*s} ${-2*s} Q${-4*s} ${-8*s} ${1*s} ${-16*s} Q${4*s} ${-10*s} ${6*s} ${-14*s} Q${9*s} ${-6*s} ${2*s} ${-2*s}Z`,'#FFE27A')}</g>`);
const okSticker=(x,y)=>G(x,y,C(0,0,17,'#6FE3A8')+C(0,0,13,'#3FCB84')+PL('M-7 0 L-2 6 L8 -6','#fff',4.2)+HI(-5,-8,5,2.5,.6),'class="d8ok"');
const sparkle=(x,y,c='#FFF2A8')=>P(`M${x} ${y-7} L${x+2} ${y-2} L${x+7} ${y} L${x+2} ${y+2} L${x} ${y+7} L${x-2} ${y+2} L${x-7} ${y} L${x-2} ${y-2}Z`,c);
const bottle=(K,x,y,c,lab)=>G(x,y,R(-9,-34,18,34,K.lg(lt(c,.35),c),6)+R(-5,-44,10,11,dk(c,.15),3)+R(-9,-24,18,12,'#fff',2,'opacity=".85"')+(lab||'')+HI(-4,-28,2,6,.6));
const spray=(K,x,y,c)=>G(x,y,R(-10,-36,20,36,K.lg(lt(c,.3),c),6)+P('M-6 -36 h10 v-8 h10 v6 h-6 v2 h-14Z',dk(c,.25))+R(-7,-26,14,12,'#fff',2,'opacity=".9"')+P('M-3 -24 l3 4 l3 -4 m-6 8 l3 -4 l3 4','none','stroke="#C8506A" stroke-width="1.6"')+HI(-5,-30,2,6,.6));
const cup=(x,y,c)=>G(x,y,P('M-9 -20 h18 l-3 20 h-12Z',c)+R(-10,-22,20,4,lt(c,.4),2)+HI(-4,-14,2,4,.6));
const chair=(K,x,y,c='#E8A86A')=>G(x,y,R(-20,-70,8,70,dk(c,.12),3)+R(-20,-70,40,10,c,4)+R(-22,-38,44,9,c,4)+R(12,-38,7,38,dk(c,.12),3)+R(-20,-38,7,38,dk(c,.12),3)+HI(-8,-66,10,2,.5));
const stool=(x,y,c='#7FD0C8')=>G(x,y,R(-18,-36,36,8,c,4)+R(-15,-30,6,30,dk(c,.15),3)+R(9,-30,6,30,dk(c,.15),3)+HI(-6,-33,8,2,.5));
const box=(K,x,y,w,h,c='#E8C08A')=>G(x,y,R(-w/2,-h,w,h,K.lg(lt(c,.2),c),4)+R(-w/2,-h,w,6,dk(c,.12),3)+R(-4,-h,8,h*.5,lt(c,.4),1));
const teddy=(x,y,s=1)=>G(x,y,`<g transform="scale(${s})">${C(-10,-30,6,'#C8905A')+C(10,-30,6,'#C8905A')+E(0,-12,13,12,'#D8A06A')+C(0,-26,11,'#D8A06A')+E(0,-23,5,4,'#F0D0A8')+C(-4,-28,1.6,EY)+C(4,-28,1.6,EY)+E(-9,-4,5,4,'#C8905A')+E(9,-4,5,4,'#C8905A')}</g>`);
const phoneS=(c='#7A6AD8')=>R(-5,-9,10,16,c,2.5)+R(-3.5,-7,7,11,'#BFE8FF',1);
const plant=(K,x,y,s=1)=>G(x,y,`<g transform="scale(${s})">${P('M-14 -22 h28 l-4 22 h-20Z',K.lg('#F2A07A','#D8805A'))+E(0,-34,9,16,'#6FCB7A')+E(-12,-30,8,12,'#5ABB6A','transform="rotate(-30 -12 -30)"')+E(12,-30,8,12,'#5ABB6A','transform="rotate(30 12 -30)"')}</g>`);

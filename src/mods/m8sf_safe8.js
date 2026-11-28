/* ================= 第八季安全題（m8sf_safe8.js）—— 2026-11-28 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 題型：danger8:<場景> 找危險大圖｜phone8:119／110 打電話演練｜okno8:<章> 可以／不可以。說明檔 dev/types8_safe.md。
 * 規則：沒有輸、不扣分、不計時；做錯彈回、說明、再試，第二次錯發光。找危險點到「沒問題」的東西不算錯。
 * 畫面：大圖全部用程式畫 SVG（平塗＋柔和漸層＋白色亮點，沒有黑色描邊；人物膚色 #FFE4D4、黑點眼加白亮點、粉紅腮紅）。
 *   漸層 id 每次產生都唯一。角色不做放大縮小動畫，只有淡入、亮光、上下輕彈。
 * 語音：台詞全部在 lines/s8_safe.tsv（S8S_），沒錄音時只出字幕（m9z_notts），不用裝置內建語音。
 * 安全內容依台灣現行宣導（內政部消防署：小火快逃、濃煙關門、不躲浴室、有煙才低姿勢、不搭電梯），來源見 dev/notes_safe8.md。
 * 原始碼在 dev/c2src/sf_*.js，用 dev/c2src/mk.sh 組成這一個檔。 */
(function(){if(typeof window.__ev!=='function'){console.log('m8sf: 找不到 __ev');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined')return;
const RM=()=>{try{return !!reduced||!!S.lite}catch(e){return false}};
const byD=(e,m,h)=>S.diff==='easy'?e:S.diff==='hard'?h:m;
const LOG=p=>{try{if(window.__s7log)p.forEach(x=>{if(typeof x==='string'&&x.trim())__s7log.push(x)})}catch(e){}return p};
const clean=p=>p.filter(x=>x!=null&&x!=='');
const SAY=p=>{try{return say(LOG(clean(p)))}catch(e){return Promise.resolve()}};
const PS=(text,parts)=>{try{return petSay(text,LOG(clean(parts||[text])))}catch(e){}};
const bump=el=>{if(!el)return;try{el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')}catch(e){}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let UID=0;const uid=p=>(p||'s8')+'_'+(++UID)+Math.random().toString(36).slice(2,6);
const okSfx=()=>{try{sfx('ding22')}catch(e){try{sfx('pop')}catch(_){}}};
const popSfx=()=>{try{sfx('pop')}catch(e){}};
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
/* ---------- 找危險大圖：場景（800×500） ---------- */
// item：{id,k:'bad'|'ok',x,y,r（點擊範圍）,bad(K),good(K),art(K),why,nm,hard}
const bike=(K,x,y,c='#FF7AA8',o={})=>G(x,y,(()=>{const w=(cx)=>C(cx,-17,17,'none','stroke="#4A4A6A" stroke-width="4"')+C(cx,-17,4,'#9A9AB8')+Ln(cx,-31,cx,-3,'#B8B8D0',1.4)+Ln(cx-14,-17,cx+14,-17,'#B8B8D0',1.4);
 return w(-28)+w(28)+PL('M-28 -17 L-6 -17 L12 -44 L-14 -44 Z M-6 -17 L-14 -48 M12 -44 L28 -17',c,4.6)+R(-22,-54,18,6,'#5A4A6A',3)+PL('M12 -44 L14 -56 L24 -58',dk(c,.2),4)+(o.bell?C(22,-60,4.5,'#FFD24D')+HI(21,-62,1.5,1,.7):'')})());
const car=(K,x,y,c='#7FB8FF',o={})=>G(x,y,P('M-70 -18 Q-72 -44 -50 -46 L-34 -72 Q-30 -78 -20 -78 L28 -78 Q38 -78 44 -70 L58 -46 Q74 -44 72 -18Z',K.lg(lt(c,.3),c))+P('M-28 -70 L-40 -48 L-4 -48 L-4 -70Z M4 -70 L4 -48 L48 -48 L36 -70Z','#DFF4FF')+HI(-20,-64,8,3,.7)+C(-40,-14,14,'#4A4A6A')+C(-40,-14,6,'#B8B8D0')+C(40,-14,14,'#4A4A6A')+C(40,-14,6,'#B8B8D0')+E(66,-34,5,4,'#FFF2A8')+(o.open?P('M-4 -70 L-4 -20 L-36 -14 L-34 -64Z',lt(c,.15)):''));
const kidBike=(K,x,y,o={})=>{const kb=Object.assign({pose:'bike',s:.82},o);return G(x,y,bike(K,0,0,o.bc||'#FF7AA8',{bell:o.bell})+person(K,-8,-12,kb))};
const exitSign=(x,y)=>G(x,y,R(-26,-14,52,28,'#2FB86A',5)+C(-11,-4,3.4,'#fff')+PL('M-11 0 L-13 7 M-12 2 L-6 5 M-12 2 L-17 5 M-13 7 L-9 11 M-13 7 L-17 11','#fff',2.2)+P('M2 -6 h12 v-4 l8 10 l-8 10 v-4 h-12Z','#fff'));
const SC={};
/* ===== fire46 消防局的逃生演練屋 ===== */
SC.fire46={nm:'消防局的逃生演練屋',
 bg:K=>{let s=R(0,0,800,500,K.lg('#FFE9DC','#F7D3C3'))+R(0,0,800,40,'#E86A6A')+R(0,40,800,6,'#FFD24D');
  s+=R(0,410,800,90,K.lg('#D8C8E8','#C4B0DA'));
  // 房子
  s+=P('M140 74 L430 26 L730 74Z',K.lg('#FFB28A','#F28A6A'))+R(150,70,572,342,'#E8D8F4',6);
  s+=R(160,80,552,152,K.lg('#FBF6FF','#F0E6FF'),4)+R(160,242,552,166,K.lg('#FFFBF2','#FFF0DA'),4)+R(150,232,572,10,'#C9A0D8',2);
  // 樓梯（右邊）
  for(let i=0;i<8;i++)s+=R(600+i*14,400-i*21,122-i*14,21,i%2?'#E2C8A0':'#EBD4AE');
  s+=PL('M596 400 L712 236','#B8906A',4)+TX(650,226,'樓梯','15','#8A5A3A');
  // 二樓：牆上指示燈、窗
  s+=exitSign(640,110)+R(420,98,70,50,'#CFEFFF',6)+Ln(455,98,455,148,'#fff',3)+HI(436,110,8,4,.7);
  // 小小的火和一點煙（演練）
  s+=R(560,206,26,26,'#B8B8D0',4)+flame(566,208,.7)+smoke(390,96,.9,.45)+smoke(470,112,.8,.4)+smoke(520,92,.7,.35);
  // 一樓：門、桌子
  s+=R(160,318,58,90,'#8FD0A8',4)+R(166,324,46,84,'#BFEBD0',3)+C(204,366,3,'#5A8A6A')+TX(189,312,'出口','14','#2F8A5A');
  s+=R(290,350,90,10,'#D8A06A',3)+R(296,360,8,48,'#C08A58',2)+R(366,360,8,48,'#C08A58',2);
  // 外面：消防車的頭
  s+=P('M0 300 L60 300 Q80 300 84 320 L90 400 L0 400Z',K.lg('#FF6A6A','#E04040'))+R(4,312,50,34,'#CFEFFF',4)+C(40,404,16,'#4A4A6A')+C(40,404,6,'#B8B8D0')+R(0,286,40,14,'#FFD24D',3);
  return s},
 items:[
  {id:'closet',k:'bad',x:335,y:170,r:60,nm:'躲在衣櫃裡',why:'不可以躲在衣櫃裡！要趕快往外、往下逃。',
   bad:K=>R(298,108,76,124,K.lg('#E8B888','#D49A68'),6)+R(304,114,32,112,'#3A2A4A',3)+person(K,322,226,{s:.78,pose:'hold',shirt:'#FFB0D0'})+R(338,114,32,112,'#E2AE7E',3)+P('M304 114 L282 120 L282 226 L304 226Z','#E2AE7E')+C(344,170,3,'#8A5A3A'),
   good:K=>R(298,108,76,124,K.lg('#E8B888','#D49A68'),6)+R(304,114,32,112,'#E2AE7E',3)+R(338,114,32,112,'#E2AE7E',3)+C(330,170,3,'#8A5A3A')+C(342,170,3,'#8A5A3A')+HI(316,124,6,3,.5)},
  {id:'lift',k:'bad',x:212,y:172,r:58,nm:'搭電梯',why:'失火了不搭電梯，要走樓梯往下逃。',
   bad:K=>R(172,104,74,128,'#C8D4E8',4)+R(176,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(210,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(250,150,14,26,'#9AA8C8',3)+C(257,157,3.4,'#FFD24D')+C(257,169,3.4,'#FFE9A0')+person(K,232,228,{s:.78,pose:'reach',girl:false,shirt:'#8FD0FF'}),
   good:K=>R(172,104,74,128,'#C8D4E8',4)+R(176,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(210,108,32,124,K.lg('#E4ECF8','#C4D0E4'))+R(250,150,14,26,'#9AA8C8',3)+R(182,140,56,34,'#FFF',4)+TX(210,154,'失火','12','#E04A4A')+TX(210,168,'不搭電梯','11','#E04A4A')},
  {id:'smoke',k:'bad',x:500,y:180,r:60,nm:'站著走進煙裡',why:'有煙的時候，壓低身體、沿著牆走，不要站直。',
   bad:K=>person(K,500,230,{s:.8,pose:'walk',shirt:'#FFD06A'})+smoke(470,150,.9,.6),
   good:K=>person(K,520,230,{s:.8,pose:'low',shirt:'#FFD06A',flip:true})+smoke(470,150,.9,.45)},
  {id:'teddy',k:'bad',x:470,y:350,r:58,nm:'回去拿玩具',why:'不回去拿玩具！人先逃出去，最重要。',
   bad:K=>teddy(430,404,1.1)+person(K,480,404,{s:.8,pose:'reach',shirt:'#B8A8FF',flip:true}),
   good:K=>teddy(430,404,1.1)+P('M452 360 q6 -8 12 0 q6 -8 12 0 q0 10 -12 16 q-12 -6 -12 -16Z','#FF9EC4','opacity=".8"')},
  {id:'lighter',k:'bad',hard:1,x:336,y:322,r:52,nm:'玩打火機',why:'打火機、火柴不是玩具，不玩，交給大人。',
   bad:K=>person(K,336,404,{s:.72,pose:'hold',girl:false,shirt:'#7FE0C0'})+G(336,360,R(-5,-10,10,16,'#FF6A8A',2)+R(-4,-14,8,5,'#C8C8D8',1)),
   good:K=>G(336,342,R(-26,-8,52,10,'#C8A0E0',3)+TX(0,-12,'交給大人','12','#8A5AAA'))},
  {id:'fireman',k:'ok',x:96,y:368,r:62,why:'消防員戴著面罩，不可怕。看到他，要走向他喔！',art:K=>person(K,100,452,{adult:true,s:.82,fire:true,hat:'fire',mask:true,shirt:'#E0A848',pants:'#C08A3A',girl:false,pose:'wave'})},
  {id:'exit',k:'ok',x:640,y:110,r:44,why:'綠色的逃生指示燈，照著它走就對了！',art:K=>''}
 ]};
/* ===== pool48 社區游泳池 ===== */
SC.pool48={nm:'社區游泳池',
 bg:K=>{let s=R(0,0,800,140,K.lg('#BFEFFF','#E8FAFF'))+C(90,50,26,'#FFE27A')+HI(84,44,8,5,.6);
  s+=R(0,120,800,40,'#FFFFFF')+(()=>{let f='';for(let x=10;x<800;x+=26)f+=R(x,104,8,40,'#F0F4FF',3);return f})();
  s+=R(0,150,800,350,K.lg('#FBEFDF','#F2E0C8'));
  s+=R(140,232,560,214,K.lg('#9FE6FF','#4FB8EC',true),18)+R(140,232,560,214,K.lg('#ffffff00','#2A88C833'),18);
  s+=R(146,238,548,8,'#fff',4,'opacity=".45"');
  for(let x=160;x<690;x+=22){s+=C(x,300,4,(x/22|0)%2?'#FF7A7A':'#fff')+C(x,375,4,(x/22|0)%2?'#FFD24D':'#fff')}
  s+=G(196,214,R(-36,-14,72,24,'#fff',6)+TX(0,4,'淺水區','15','#3A8ACA'))+G(640,214,R(-36,-14,72,24,'#fff',6)+TX(0,4,'深水區','15','#2A5A9A'));
  // 救生員高椅
  s+=PL('M716 236 L726 120 M770 236 L760 120 M720 190 L766 190','#FFFFFF',6)+R(712,112,64,12,'#FF8A8A',4);
  // 蓮蓬頭
  s+=PL('M40 300 L40 150 Q40 136 56 136 L70 136','#B8C0D8',6)+E(72,142,12,6,'#C8D0E4');
  s+=E(400,494,120,8,'#7FD0FF','opacity=".25"');
  return s},
 items:[
  {id:'run',k:'bad',x:420,y:440,r:56,nm:'池邊奔跑',why:'池邊地板滑滑的，不奔跑，慢慢走。',
   bad:K=>E(380,488,22,5,'#7FD0FF','opacity=".7"')+E(456,492,18,4,'#7FD0FF','opacity=".7"')+person(K,420,486,{s:.78,pose:'run',shirt:'#FF8AB8',hat:'cap'}),
   good:K=>E(380,488,22,5,'#7FD0FF','opacity=".5"')+person(K,420,486,{s:.78,pose:'stand',shirt:'#FF8AB8',hat:'cap'})},
  {id:'push',k:'bad',x:330,y:182,r:58,nm:'推人',why:'不推人！在池邊推人，很危險。',
   bad:K=>person(K,306,228,{s:.74,pose:'push',girl:false,shirt:'#7FE0C0',hat:'cap',hc:'#FFB86A'})+person(K,350,226,{s:.74,pose:'up',shirt:'#FFB0D0',hat:'cap',mouth:'o',flip:true}),
   good:K=>person(K,306,228,{s:.74,pose:'stand',girl:false,shirt:'#7FE0C0',hat:'cap',hc:'#FFB86A'})+person(K,350,228,{s:.74,pose:'wave',shirt:'#FFB0D0',hat:'cap',flip:true})},
  {id:'jump',k:'bad',x:540,y:186,r:58,nm:'跳水',why:'不跳水！從樓梯慢慢下水。',
   bad:K=>person(K,540,196,{s:.74,pose:'up',girl:false,shirt:'#FFD06A',hat:'cap',hc:'#8AE07A'})+E(540,246,26,6,'#fff','opacity=".7"'),
   good:K=>PL('M566 228 L566 270 M590 228 L590 270 M566 242 L590 242 M566 258 L590 258','#E8EEF8',4.5)+person(K,540,228,{s:.74,pose:'point',girl:false,shirt:'#FFD06A',hat:'cap',hc:'#8AE07A'})},
  {id:'deep',k:'bad',x:620,y:350,r:62,nm:'一個人在深水區',why:'只在站得到的淺水區，大人要在旁邊。游泳圈是玩具，不能代替大人。',
   bad:K=>G(620,360,person(K,0,30,{s:.66,pose:'up',shirt:'#B8A8FF',hat:'cap',hc:'#FF8AB8'})+R(-30,10,60,26,'#4FB8EC',12)+E(0,10,32,10,'#FF9A6A')+E(0,9,19,5,'#4FB8EC')+HI(-16,6,6,2,.6)),
   good:K=>G(232,348,person(K,0,24,{s:.62,pose:'wave',shirt:'#B8A8FF',hat:'cap',hc:'#FF8AB8'})+R(-24,8,48,22,'#8EDCFA',10))+G(290,350,person(K,0,48,{adult:true,s:.62,pose:'wave',shirt:'#7FB8FF',girl:false})+R(-30,16,60,40,'#8EDCFA',12))},
  {id:'guard',k:'ok',x:744,y:124,r:56,why:'救生員吹哨子的時候，大家停下來聽，這樣很好喔！',art:K=>an('otter48',744,114,70)+C(760,92,4,'#FFD24D')},
  {id:'shower',k:'ok',x:60,y:250,r:56,why:'下水前先沖水、做暖身，這樣很好喔！',art:K=>PL('M66 150 l-6 20 M72 150 l0 22 M78 150 l6 20','#7FD0FF',2.4)+person(K,64,300,{s:.72,pose:'up',girl:false,shirt:'#FFB86A',hat:'cap',hc:'#7FD0FF'})}
 ]};
/* ===== park49 河濱自行車道和路口 ===== */
const tree=(K,x,y,s=1)=>G(x,y,`<g transform="scale(${s})">${R(-5,-30,10,30,'#B8865A',3)+C(0,-44,22,K.lg('#8FE08A','#5ABF6A'))+C(-14,-36,14,'#6FCF7A')+C(14,-36,14,'#6FCF7A')+HI(-6,-54,7,4,.45)}</g>`);
SC.park49={nm:'河濱自行車道和路口',
 bg:K=>{let s=R(0,0,800,120,K.lg('#BFEBFF','#E9F9FF'))+C(700,46,22,'#FFE27A');
  s+=P('M0 80 Q60 60 120 78 Q180 58 250 80 L250 120 L0 120Z','#B8E0C8')+P('M500 84 Q580 56 660 82 Q720 64 800 86 L800 120 L500 120Z','#B8E0C8');
  s+=R(0,110,800,40,K.lg('#8FD8F8','#5FC0EC'))+PL('M30 128 q16 -6 32 0 M200 136 q16 -6 32 0 M420 126 q16 -6 32 0 M640 134 q16 -6 32 0','#fff',2.4,'opacity=".7"');
  s+=R(0,150,800,44,'#A8E09A')+R(0,194,800,96,K.lg('#F6B8A0','#EDA48A'))+PL('M0 242 L800 242','#fff',3,'stroke-dasharray="22 18"');
  s+=G(460,236,PL('M-14 0 a7 7 0 1 0 0.1 0 M14 0 a7 7 0 1 0 0.1 0 M-14 0 L-4 0 L4 -12 L-8 -12 M4 -12 L14 0','#fff',2.2,'opacity=".75"'));
  s+=R(0,290,800,34,'#A8E09A')+tree(K,40,300,.9)+tree(K,250,300,.8)+tree(K,770,300,.9);
  s+=R(0,322,800,26,'#E8E2F0')+R(0,348,800,120,K.lg('#8A8AA8','#77779A'))+R(0,468,800,32,'#E8E2F0');
  for(let y=356;y<462;y+=18)s+=R(420,y,120,10,'#FFFFFF',2,'opacity=".92"');
  s+=PL('M0 408 L380 408 M580 408 L800 408','#FFE27A',4,'stroke-dasharray="26 20"');
  s+=G(600,322,R(-4,-80,8,80,'#6A6A8A',3)+R(-12,-112,24,40,'#4A4A6A',6)+C(0,-102,7,'#8A3A4A')+C(0,-84,7,'#6FE3A8'));
  s+=car(K,130,440,'#9AC8FF');
  return s},
 items:[
  {id:'helmet',k:'bad',x:160,y:236,r:56,nm:'安全帽沒扣',why:'安全帽要戴正，扣好扣環。鬆鬆的不算喔！',
   bad:K=>kidBike(K,160,286,{hat:'helmet',strap:false,shirt:'#FFB0D0'}),good:K=>kidBike(K,160,286,{hat:'helmet',strap:true,shirt:'#FFB0D0'})},
  {id:'zebra',k:'bad',x:480,y:412,r:58,nm:'騎車過斑馬線',why:'過馬路要下車，牽著腳踏車走。',
   bad:K=>kidBike(K,480,446,{hat:'helmet',girl:false,shirt:'#8FD0FF',bc:'#7ACF9A'}),
   good:K=>bike(K,500,446,'#7ACF9A')+person(K,462,448,{s:.8,pose:'walk',girl:false,shirt:'#8FD0FF',hat:'helmet',hc:'#7ACF9A'})},
  {id:'phone',k:'bad',x:660,y:440,r:56,nm:'邊過馬路邊滑手機',why:'過馬路不滑手機，頭抬起來，眼睛看車子。',
   bad:K=>person(K,660,492,{s:.8,pose:'phone',shirt:'#FFD06A',mouth:'o',hand:phoneS()}),
   good:K=>person(K,660,492,{s:.8,pose:'point',shirt:'#FFD06A',flip:true})},
  {id:'ear',k:'bad',x:300,y:440,r:56,nm:'戴耳機過馬路',why:'過馬路不戴耳機聽音樂，耳朵要聽車子的聲音。',
   bad:K=>person(K,300,492,{s:.8,pose:'walk',girl:false,shirt:'#B8A8FF',ear:true}),
   good:K=>person(K,300,492,{s:.8,pose:'stand',girl:false,shirt:'#B8A8FF',earNeck:true})},
  {id:'nohand',k:'bad',hard:1,x:580,y:236,r:54,nm:'放手騎車',why:'騎車兩手要握好，不放手騎。',
   bad:K=>G(580,286,bike(K,0,0,'#FFB86A')+person(K,-8,-12,{s:.82,pose:'up',shirt:'#9FE0A0',hat:'helmet',hc:'#FFB86A'})),
   good:K=>kidBike(K,580,286,{hat:'helmet',hc:'#FFB86A',shirt:'#9FE0A0',bc:'#FFB86A'})},
  {id:'bell',k:'ok',x:370,y:236,r:52,why:'按鈴說「借過」，讓走路的人先走，這樣很好喔！',art:K=>kidBike(K,370,286,{hat:'helmet',hc:'#B88AFF',shirt:'#FFE07A',bc:'#B88AFF',bell:true})+TX(408,214,'叮！','16','#B86A00')},
  {id:'adult',k:'ok',x:720,y:230,r:56,why:'大人陪著，在自行車道上騎車，這樣很好喔！',art:K=>G(720,286,bike(K,0,0,'#7FB8FF')+person(K,-8,-12,{adult:true,s:.62,pose:'bike',girl:false,shirt:'#7FB8FF',hat:'helmet',hc:'#7FB8FF'}))}
 ]};
/* ===== 第 50 章：主角的家（客廳、廚房、浴室、陽台） ===== */
const wallFloor=(K,c1,c2,f1,f2,fy=380)=>R(0,0,800,fy,K.lg(c1,c2))+R(0,fy,800,500-fy,K.lg(f1,f2))+R(0,fy-6,800,8,dk(c2,.1));
const windowW=(K,x,y,w,h)=>R(x-8,y-8,w+16,h+16,'#FFFFFF',8)+R(x,y,w,h,K.lg('#BFE9FF','#E6F7FF'),4)+Ln(x+w/2,y,x+w/2,y+h,'#fff',5)+Ln(x,y+h/2,x+w,y+h/2,'#fff',5)+HI(x+w*.25,y+h*.2,w*.12,h*.06,.7);
SC.home50a={nm:'客廳',
 bg:K=>{let s=wallFloor(K,'#FFF4E4','#FCE6CC','#E8C8A0','#D8B088');
  s+=windowW(K,48,70,150,190)+P('M30 56 L76 56 L66 280 L26 280Z','#FF9EC4')+P('M170 56 L216 56 L222 280 L180 280Z','#FF9EC4')+R(22,50,200,10,'#C88A9A',4);
  s+=R(300,300,240,62,K.lg('#A8C8FF','#88A8F0'),18)+R(290,272,260,46,K.lg('#B8D4FF','#98B8F8'),20)+R(286,300,26,80,'#88A8F0',12)+R(528,300,26,80,'#88A8F0',12)+E(360,296,24,10,'#FFE07A')+E(470,296,24,10,'#FFB0D0');
  s+=R(310,380,10,14,'#8A6A9A',2)+R(520,380,10,14,'#8A6A9A',2);
  s+=R(690,170,86,210,K.lg('#D8A878','#C08A58'),6)+R(698,178,70,196,'#E8B888',4)+C(756,280,5,'#FFD24D')+TX(733,160,'大門','14','#8A5A3A');
  s+=R(612,318,22,30,'#FFFFFF',4)+C(619,328,2,'#8A8AA8')+C(627,328,2,'#8A8AA8')+R(621,336,2,5,'#8A8AA8');
  s+=E(600,440,60,10,'#000','opacity=".05"');
  return s},
 items:[
  {id:'chair',k:'bad',x:124,y:300,r:62,nm:'窗邊的椅子',why:'窗戶旁邊不放椅子，也不爬窗戶。',
   bad:K=>chair(K,124,392,'#F2B880')+person(K,126,336,{s:.74,pose:'reach',shirt:'#FFD06A',flip:true}),
   good:K=>R(110,252,30,10,'#8A8AA8',3)+TX(124,248,'鎖','12','#5A5A7A')},
  {id:'cord',k:'bad',x:246,y:290,r:56,nm:'拉著窗簾繩子玩',why:'窗簾的繩子要綁高高的，不拿來玩，也不繞在脖子上。',
   bad:K=>PL('M214 70 L216 250 Q222 276 238 290','#C88A9A',3)+person(K,256,380,{s:.74,pose:'reach',girl:false,shirt:'#8FD0FF',flip:true}),
   good:K=>PL('M214 70 L216 120 Q226 132 216 140 Q206 132 216 120','#C88A9A',3)+C(216,118,4,'#FFD24D')},
  {id:'bag',k:'bad',x:420,y:296,r:58,nm:'拿塑膠袋要套頭玩',why:'塑膠袋不套在頭上玩，用完交給大人收好。',
   bad:K=>person(K,420,350,{s:.72,pose:'up',shirt:'#FFB0D0',mouth:'open'})+G(420,276,P('M-20 -14 Q-22 -34 0 -36 Q22 -34 20 -14 L16 8 H-16Z','#E8F4FF','opacity=".85"')+PL('M-16 8 L16 8','#BFD8F0',2)+HI(-8,-22,3,7,.8)),
   good:K=>person(K,420,350,{s:.72,pose:'sit',shirt:'#FFB0D0'})},
  {id:'plug',k:'bad',x:604,y:370,r:58,nm:'濕的手要碰插座',why:'插座不碰；手濕濕的，也不碰電器。',
   bad:K=>person(K,592,440,{s:.8,pose:'reach',shirt:'#9FE0A0',wet:true})+cup(560,440,'#7FD0FF'),
   good:K=>R(611,318,24,32,'#FFE07A',5)+person(K,592,440,{s:.8,pose:'hold',shirt:'#9FE0A0'})+R(578,384,28,16,'#FFFFFF',4)},
  {id:'door',k:'bad',hard:1,x:730,y:290,r:58,nm:'自己去開門',why:'有人按門鈴，小朋友不自己開門，先叫大人來。',
   bad:K=>P('M698 178 L740 190 L740 366 L698 374Z','#E8B888')+R(740,186,30,190,'#FFF6E0')+person(K,722,440,{s:.78,pose:'reach',girl:false,shirt:'#FFB86A'})+TX(650,200,'叮咚！','15','#C85A8A'),
   good:K=>R(698,178,70,196,'#E8B888',4)+C(756,280,5,'#FFD24D')+R(744,240,20,4,'#8A8AA8',2)+person(K,690,440,{s:.78,pose:'phone',girl:false,shirt:'#FFB86A',hand:phoneS()})},
  {id:'map',k:'ok',x:420,y:150,r:58,why:'牆上貼著我家的逃生路線圖，全家一起看過，這樣很好喔！',
   art:K=>G(420,150,R(-60,-46,120,92,'#FFFFFF',6)+R(-52,-38,104,76,'#F4F8FF',3)+PL('M-48 -30 H48 V30 H-48Z M-4 -30 V0 H48 M-48 6 H-10','#9AA8C8',2.5)+PL('M-26 -14 L-26 18 L-44 18','#3FCB84',4)+P('M-44 18 l8 -6 v12Z','#3FCB84')+C(-26,-14,5,'#FF6A8A')+R(-58,-56,116,14,'#FFD24D',4)+TX(0,-45,'我家的逃生路線','11','#8A5A00'))},
  {id:'toys',k:'ok',x:480,y:450,r:46,why:'玩具收好了，走路不會絆倒，這樣很好喔！',art:K=>box(K,480,478,72,40,'#B8E0FF')+teddy(470,446,.7)+C(496,440,8,'#FF8A8A')}
 ]};
SC.home50b={nm:'廚房',
 bg:K=>{let s=wallFloor(K,'#EFFFF6','#DDF6EA','#F2E6D2','#E2D2B8',470);
  for(let x=0;x<800;x+=40)for(let y=150;y<290;y+=40)s+=R(x+2,y+2,36,36,'#FFFFFF',4,'opacity=".35"');
  s+=R(40,30,340,104,K.lg('#FFD8A8','#F2BE88'),8)+[60,170,280].map(x=>R(x,40,90,84,'#FFE4C0',6)+C(x+78,84,3.4,'#B8865A')).join('');
  s+=R(30,290,630,12,'#E8E8F4',4)+R(36,302,618,168,K.lg('#FFE0B8','#F2C898'),6)+[50,200,350,500].map(x=>R(x,314,136,146,'#FFEACC',6)+C(x+68,330,3.4,'#B8865A')).join('');
  s+=R(180,272,120,22,'#C8D8F0',8)+Ln(240,250,240,272,'#A8B8D8',5)+PL('M240 250 Q240 240 252 240','#A8B8D8',5);
  s+=R(420,270,150,22,'#5A5A7A',6)+E(460,272,22,5,'#3A3A4A')+E(530,272,22,5,'#3A3A4A')+C(570,320,7,'#E0E0EC')+C(590,320,7,'#E0E0EC');
  s+=R(676,110,110,360,K.lg('#F4F8FF','#DCE4F4'),12)+Ln(676,220,786,220,'#C8D0E4',3)+R(690,160,8,40,'#B8C0D8',3)+R(690,240,8,60,'#B8C0D8',3);
  s+=R(60,404,150,10,'#C8A0E0',3)+R(68,414,8,56,'#A880C8',2)+R(194,414,8,56,'#A880C8',2);
  return s},
 items:[
  {id:'cleaner',k:'bad',x:136,y:376,r:58,nm:'清潔劑放在飲料旁',why:'清潔劑不是飲料，要放在高高的櫃子裡，不碰。',
   bad:K=>bottle(K,96,404,'#FFB86A')+cup(126,404,'#FF9EC4')+spray(K,160,404,'#B88AFF')+person(K,232,470,{s:.78,pose:'reach',shirt:'#FFD06A',flip:true}),
   good:K=>bottle(K,110,404,'#FFB86A')+cup(146,404,'#FF9EC4')+G(105,116,spray(K,0,0,'#B88AFF'))+R(88,60,50,4,'#B8865A',2)},
  {id:'pot',k:'bad',x:452,y:262,r:56,nm:'鍋柄朝外',why:'熱鍋、熱湯不碰！鍋柄要轉到裡面。',
   bad:K=>P('M440 268 h60 v-30 q0 -8 -8 -8 h-44 q-8 0 -8 8Z',K.lg('#E8E8F4','#B8C0D8'))+R(386,240,56,8,'#6A6A8A',4)+PL('M456 222 q-6 -10 0 -18 M472 222 q-6 -10 0 -18','#fff',3,'opacity=".8"')+person(K,392,470,{s:.8,pose:'up',girl:false,shirt:'#8FD0FF'}),
   good:K=>P('M440 268 h60 v-30 q0 -8 -8 -8 h-44 q-8 0 -8 8Z',K.lg('#E8E8F4','#B8C0D8'))+R(498,240,40,8,'#6A6A8A',4)+PL('M456 222 q-6 -10 0 -18 M472 222 q-6 -10 0 -18','#fff',3,'opacity=".8"')},
  {id:'pills',k:'bad',x:330,y:266,r:50,nm:'藥放在桌上像糖果',why:'藥不是糖果，顏色再漂亮也不吃，交給大人收好。',
   bad:K=>R(318,262,20,28,'#FFFFFF',5)+R(316,256,24,8,'#FF8AB8',3)+['#FF8A8A','#FFD24D','#7FD0FF','#9FE0A0','#B88AFF'].map((c,i)=>E(296+i*16+(i%2)*4,286-(i%2)*4,6,4,c)).join(''),
   good:K=>G(330,286,R(-22,-26,44,26,'#FFFFFF',5)+R(-4,-22,8,18,'#FF6A8A',1)+R(-9,-17,18,8,'#FF6A8A',1))},
  {id:'gas',k:'bad',x:624,y:390,r:56,nm:'聞到瓦斯味',why:'聞到怪怪的瓦斯味，不碰開關，馬上告訴大人。',
   bad:K=>PL('M580 326 q10 -10 20 0 q10 10 20 0 M584 344 q10 -10 20 0 q10 10 20 0','#9AD07A',3,'opacity=".9"')+person(K,630,470,{s:.8,pose:'cover',shirt:'#FFB0D0',flip:true}),
   good:K=>person(K,630,470,{s:.8,pose:'wave',shirt:'#FFB0D0',flip:true})+G(600,362,R(-40,-18,80,26,'#FFFFFF',10)+TX(0,0,'告訴大人！','13','#C8506A'))},
  {id:'sos',k:'ok',x:730,y:170,r:44,why:'冰箱上貼著緊急電話，這樣很好喔！',art:K=>G(730,168,R(-30,-34,60,64,'#FFFBE0',4)+C(0,-36,5,'#FF6A8A')+TX(0,-10,'119','17','#E04A4A','font-family="var(--latin,sans-serif)"')+TX(0,16,'110','17','#3A5AB8','font-family="var(--latin,sans-serif)"'))},
  {id:'sink',k:'ok',x:240,y:256,r:40,why:'用完水，水龍頭關好了，這樣很好喔！',art:K=>''}
 ]};
SC.home50c={nm:'浴室',
 bg:K=>{let s=R(0,0,800,360,K.lg('#E4F6FF','#CDEBFA'));for(let x=0;x<800;x+=50)for(let y=0;y<360;y+=50)s+=R(x+2,y+2,46,46,'#FFFFFF',5,'opacity=".3"');
  s+=R(0,360,800,140,K.lg('#F4FAFF','#DDEAF6'));for(let x=0;x<800;x+=60)s+=Ln(x,360,x-30,500,'#C8DCEC',2);
  s+=R(20,276,250,120,K.lg('#FFFFFF','#E4ECF8'),26)+R(30,284,230,22,'#9FE0FF',10)+R(52,250,10,30,'#C8D0E4',3)+R(46,246,28,8,'#C8D0E4',4)+C(84,264,6,'#FF8A8A')+C(100,264,6,'#7FB8FF');
  s+=R(410,300,124,124,K.lg('#FFFFFF','#E8EEF8'),8)+R(400,276,144,30,'#FFFFFF',12)+E(472,284,46,8,'#BFE9FF')+R(466,250,12,26,'#C8D0E4',4);
  s+=R(420,120,104,120,K.lg('#E8F8FF','#C8E8F8'),12)+HI(446,150,12,24,.6);
  s+=R(560,210,22,30,'#FFFFFF',4)+C(567,220,2,'#8A8AA8')+C(575,220,2,'#8A8AA8');
  s+=R(600,70,170,10,'#C8A0E0',4)+R(610,80,6,20,'#A880C8',2)+R(750,80,6,20,'#A880C8',2);
  s+=R(700,380,84,90,K.lg('#FFE4C0','#F2C898'),10)+PL('M700 400 H784 M700 420 H784 M700 440 H784','#E8B880',2);
  return s},
 items:[
  {id:'run',k:'bad',x:330,y:440,r:58,nm:'濕地板上跑',why:'浴室地板滑滑的，要慢慢走。',
   bad:K=>E(300,486,26,6,'#9FE0FF','opacity=".9"')+E(360,476,20,5,'#9FE0FF','opacity=".9"')+person(K,330,490,{s:.8,pose:'run',shirt:'#FFB0D0'}),
   good:K=>R(286,480,92,14,'#B8E8C8',6)+person(K,330,490,{s:.8,pose:'stand',shirt:'#FFB0D0'})},
  {id:'dryer',k:'bad',x:516,y:268,r:46,nm:'吹風機放在水旁邊',why:'吹風機不放在水旁邊，用完請大人拔掉插頭收好。',
   bad:K=>G(512,276,R(-4,-14,26,16,'#B88AFF',8)+R(10,-2,8,16,'#9A6AE0',3))+PL('M526 284 Q560 300 566 238','#6A6A8A',2.5),
   good:K=>G(600,140,R(-4,-14,26,16,'#B88AFF',8)+R(10,-2,8,16,'#9A6AE0',3))+R(590,104,4,22,'#A880C8',2)},
  {id:'hide',k:'bad',x:472,y:368,r:50,nm:'要躲進櫃子',why:'不躲進櫃子裡，玩捉迷藏要選安全、大人看得到的地方。',
   bad:K=>R(420,312,104,104,'#5A4A6A',6)+R(474,312,50,104,'#F4F8FF',4)+C(482,364,3,'#B8C0D8')+P('M420 312 L398 320 L398 414 L420 416Z','#F4F8FF')+person(K,388,470,{s:.62,pose:'reach',girl:false,shirt:'#9FE0A0'}),
   good:K=>R(420,312,50,104,'#F4F8FF',4)+R(474,312,50,104,'#F4F8FF',4)+C(462,364,3,'#B8C0D8')+C(482,364,3,'#B8C0D8')},
  {id:'pods',k:'bad',x:650,y:440,r:50,nm:'洗衣球放在地上',why:'洗衣球不是糖果，不碰不吃，放在高高的地方。',
   bad:K=>R(624,440,52,34,'#FFFFFF',8)+['#FF8AB8','#7FD0FF','#FFD24D','#9FE0A0'].map((c,i)=>C(632+i*12,438-(i%2)*6,7,c)+HI(630+i*12,435-(i%2)*6,2.4,1.4,.7)).join('')+C(690,470,7,'#7FD0FF'),
   good:K=>G(700,70,R(-26,-30,52,30,'#FFFFFF',8)+R(-26,-32,52,8,'#FF8AB8',4))},
  {id:'hot',k:'bad',hard:1,x:110,y:262,r:50,nm:'自己開熱水',why:'熱水很燙！洗澡水請大人幫忙放好。',
   bad:K=>PL('M56 288 q-6 -12 0 -22 M70 288 q-6 -12 0 -22','#FFFFFF',3,'opacity=".9"')+person(K,140,360,{s:.72,pose:'reach',shirt:'#FFD06A',flip:true}),
   good:K=>G(150,300,E(0,0,12,8,'#FFE27A')+C(8,-8,7,'#FFE27A')+P('M14 -8 l6 2 l-6 2Z','#FF9A3C')+C(10,-10,1.4,EY))},
  {id:'mat',k:'ok',x:150,y:430,r:48,why:'浴缸前面鋪了止滑墊，這樣很好喔！',art:K=>R(90,416,120,26,'#9FE0C8',10)+[100,120,140,160,180].map(x=>C(x+6,429,4,'#7FD0B0')).join('')}
 ]};
SC.home50d={nm:'陽台',
 bg:K=>{let s=R(0,0,800,380,K.lg('#BFEBFF','#EAF9FF'))+C(620,60,24,'#FFE27A');
  s+=[[30,150,90],[140,120,70],[230,170,60],[520,140,80],[620,180,60]].map(([x,y,w])=>R(x,y,w,240-y+120,'#D8E4F4',6)+R(x+10,y+14,14,14,'#F4F8FF',3)+R(x+w-24,y+14,14,14,'#F4F8FF',3)).join('');
  s+=R(0,232,800,10,'#FFFFFF',4)+(()=>{let r='';for(let x=12;x<800;x+=28)r+=R(x,240,8,140,'#F0F4FF',3);return r})();
  s+=R(0,380,800,120,K.lg('#F2E6D8','#E2D2C0'));
  s+=R(20,286,130,140,K.lg('#FFFFFF','#E4ECF8'),12)+R(30,296,110,16,'#D8E0F0',4)+C(46,304,4,'#7FE3A8');
  s+=PL('M380 40 L380 380 M640 40 L640 380 M370 70 L650 70','#C8C8DC',5);
  s+=[[430,'#FF9EC4'],[490,'#8FD0FF'],[550,'#FFE07A']].map(([x,c])=>PL(`M${x} 70 l-14 14 h28 Z`,'#B8B8D0',2)+P(`M${x-18} 84 h36 v40 h-36Z`,c)).join('');
  s+=R(680,110,110,280,'#E8F4FF',6)+(()=>{let r='';for(let y=120;y<386;y+=12)r+=Ln(686,y,784,y,'#C8D8EC',1);return r})()+R(676,104,118,8,'#B8C8E0',3);
  s+=R(600,150,70,10,'#C8A0E0',3)+R(606,160,6,16,'#A880C8',2)+R(658,160,6,16,'#A880C8',2);
  return s},
 items:[
  {id:'climb',k:'bad',x:330,y:300,r:62,nm:'箱子靠著欄杆',why:'欄杆旁邊不放箱子、椅子，也不爬上去。',
   bad:K=>box(K,320,392,80,60,'#E8C08A')+box(K,330,334,60,44,'#F2D0A0')+person(K,334,292,{s:.74,pose:'up',girl:false,shirt:'#FFB86A'}),
   good:K=>box(K,600,470,70,46,'#E8C08A')+box(K,600,426,52,36,'#F2D0A0')},
  {id:'washer',k:'bad',x:110,y:376,r:62,nm:'要爬進洗衣機',why:'洗衣機不能爬進去玩！',
   bad:K=>C(84,366,40,'#3A3A5A')+C(84,366,30,'#4A4A6A')+P('M44 366 a40 40 0 0 1 -28 -30 l-8 34Z','#C8D0E4','opacity=".95"')+person(K,170,470,{s:.66,pose:'reach',shirt:'#FFB0D0',flip:true}),
   good:K=>C(84,366,40,'#C8D0E4')+C(84,366,30,K.rg('#E8F8FF','#9FC8E8'))+HI(72,352,10,6,.7)},
  {id:'bleach',k:'bad',x:236,y:440,r:52,nm:'漂白水放在地上',why:'漂白水放在高高的地方，小朋友不碰。',
   bad:K=>bottle(K,226,470,'#B8E0FF',TX(0,-16,'漂白','8','#3A5AB8'))+cup(258,470,'#FFB86A'),
   good:K=>G(634,146,bottle(K,0,0,'#B8E0FF',TX(0,-16,'漂白','8','#3A5AB8')))},
  {id:'rope',k:'bad',x:500,y:420,r:56,nm:'拿繩子要繞脖子玩',why:'繩子不繞在脖子上玩。',
   bad:K=>person(K,500,480,{s:.8,pose:'up',shirt:'#9FE0A0'})+PL('M478 398 Q500 370 522 398 Q530 430 516 452','#E86A8A',3),
   good:K=>G(380,200,PL('M0 0 a10 10 0 1 0 0.1 0 m0 4 a6 6 0 1 0 0.1 0','#E86A8A',3))},
  {id:'pot',k:'bad',hard:1,x:200,y:220,r:46,nm:'花盆放在欄杆上',why:'花盆不放在欄杆上，可能會掉下去。',
   bad:K=>plant(K,200,234,.9),good:K=>plant(K,160,474,.9)},
  {id:'mom',k:'ok',x:700,y:410,r:52,why:'大人在晾衣服，小朋友在旁邊幫忙拿衣架，這樣很好喔！',art:K=>person(K,720,470,{adult:true,s:.62,pose:'up',shirt:'#B8A8FF'})},
  {id:'screen',k:'ok',x:736,y:220,r:44,why:'紗門關好了，這樣很好喔！',art:K=>''}
 ]};
/* ===== police47 回家的路上（可選）：只畫親切的陌生人，不畫可怕的人 ===== */
const shop=(K,x,w,c,icon)=>R(x,150,w,230,K.lg('#FFF8F0','#F4E8DA'),6)+P(`M${x-6} 150 h${w+12} l-10 36 h${-w+8}Z`,c)+(()=>{let r='';for(let i=0;i<w;i+=24)r+=P(`M${x+i} 150 h12 l-4 36 h-12Z`,'#FFFFFF','opacity=".55"');return r})()+R(x+14,200,w-28,90,'#CFEFFF',6)+HI(x+30,214,12,5,.6)+R(x+w/2-20,300,40,80,'#E8C8A0',4)+G(x+w/2,130,R(-26,-16,52,26,'#FFFFFF',8)+icon);
SC.police47={nm:'回家的路上',
 bg:K=>{let s=R(0,0,800,380,K.lg('#CFEFFF','#F2FBFF'))+C(90,60,24,'#FFE27A');
  s+=shop(K,20,180,'#FF9EC4',E(-6,0,10,7,'#E8B068')+E(8,0,10,7,'#F2C080'))+shop(K,240,170,'#9FE0A0',C(0,0,8,'#FF8A8A')+R(-2,-12,4,6,'#6FCB7A'));
  s+=R(450,170,140,210,K.lg('#E8F0FF','#D0DCF4'),6)+R(450,150,140,26,'#3A5AB8',6)+TX(520,170,'派出所','16','#FFFFFF')+R(470,200,100,70,'#CFEFFF',6)+R(500,290,40,90,'#B8C8E8',4)+C(520,140,8,'#FF6A6A');
  s+=R(610,190,180,190,K.lg('#FFF4E0','#F4E0C0'),6)+P('M600 190 L700 130 L800 190Z','#F2A07A')+R(670,300,40,80,'#D8A878',4)+R(630,220,40,40,'#CFEFFF',4)+R(730,220,40,40,'#CFEFFF',4)+TX(700,176,'我家','15','#8A5A3A');
  s+=R(0,380,800,90,K.lg('#EFE8F4','#E0D8EA'))+R(0,470,800,30,'#8A8AA8')+PL('M0 486 L800 486','#FFE27A',3,'stroke-dasharray="24 18"');
  return s},
 items:[
  {id:'car',k:'bad',x:130,y:420,r:62,nm:'跟不熟的人上車',why:'不熟的人叫你上車，就算很親切、說認識爸媽，也說「不要」，馬上走開。',
   bad:K=>car(K,110,500,'#C8B8FF',{open:true})+person(K,100,470,{adult:true,s:.56,pose:'wave',girl:false,shirt:'#9FD8C0'})+person(K,170,468,{s:.7,pose:'reach',shirt:'#FFD06A',flip:true}),
   good:K=>car(K,110,500,'#C8B8FF')+person(K,210,468,{s:.7,pose:'run',shirt:'#FFD06A'})+G(204,380,R(-30,-14,60,24,'#FFFFFF',10)+TX(0,4,'不要！','14','#C8506A'))},
  {id:'candy',k:'bad',x:330,y:420,r:58,nm:'拿不熟的人給的糖果',why:'不熟的人給的糖果、飲料，不拿、不吃。',
   bad:K=>person(K,300,470,{adult:true,s:.56,pose:'reach',shirt:'#FFC8A0'})+G(326,398,E(0,0,8,6,'#FF8AB8')+P('M-8 0 l-6 -5 v10Z M8 0 l6 -5 v10Z','#FF8AB8'))+person(K,350,468,{s:.7,pose:'reach',girl:false,shirt:'#8FD0FF',flip:true}),
   good:K=>person(K,300,470,{adult:true,s:.56,pose:'stand',shirt:'#FFC8A0'})+person(K,360,468,{s:.7,pose:'stand',girl:false,shirt:'#8FD0FF',flip:true})+G(370,380,R(-40,-14,80,24,'#FFFFFF',10)+TX(0,4,'不要，謝謝','13','#C8506A'))},
  {id:'wallet',k:'bad',x:470,y:430,r:52,nm:'撿到錢包放口袋',why:'撿到東西，交給警察或大人。',
   bad:K=>person(K,470,470,{s:.7,pose:'hold',shirt:'#FFB0D0',hand:R(-10,-6,16,11,'#B8865A',3)}),
   good:K=>person(K,500,470,{s:.7,pose:'reach',shirt:'#FFB0D0',hand:R(-2,-6,16,11,'#B8865A',3)})},
  {id:'cop',k:'ok',x:590,y:410,r:50,why:'黑熊警察在派出所，需要幫忙可以找他。',art:K=>an('bearcop47',590,470,80)},
  {id:'fam',k:'ok',x:720,y:420,r:52,why:'和家人一起走，這樣很好喔！',art:K=>person(K,705,470,{adult:true,s:.56,pose:'hold',shirt:'#7FB8FF',girl:false})+person(K,742,470,{s:.6,pose:'wave',shirt:'#FFE07A',flip:true})}
 ]};
SC.home50=SC.home50a;
/* ===== home50r 主角自己的房間（第 50 章大冒險：居家安全小偵探）：只畫東西「正要出問題」的樣子，主角拿放大鏡在房間裡 ===== */
const strip=(n)=>G(0,0,R(-46,-12,92,22,'#FFFFFF',8)+R(-46,-12,92,6,'#E8ECF8',4)+Array.from({length:4},(_,i)=>R(-36+i*22,-6,12,10,'#C8D0E4',3)).join('')+Array.from({length:n},(_,i)=>R(-38+i*22,-24,16,18,['#FF9EC4','#8FD0FF','#FFE07A','#9FE0A0','#B8A8FF'][i%5],4)+PL(`M${-30+i*22} -24 Q${-30+i*22} -44 ${-40+i*30} -52`,'#8A8AA8',2.4)).join('')+PL('M46 0 Q70 4 80 -10','#8A8AA8',3));
const scissors=(open)=>open?G(0,0,PL('M-4 0 L26 -14 M-4 0 L26 10','#9AA8C8',5)+C(-12,-6,7,'none','stroke="#FF7AA8" stroke-width="4"')+C(-12,8,7,'none','stroke="#FF7AA8" stroke-width="4"')):G(0,0,PL('M-2 0 L26 -2','#9AA8C8',5)+C(-10,-5,6,'none','stroke="#FF7AA8" stroke-width="4"')+C(-10,6,6,'none','stroke="#FF7AA8" stroke-width="4"'));
const roomHero=()=>{try{return `<g class="q8hero">${String(princess(S.look)).replace(/^<svg /,'<svg x="380" y="300" width="105" height="150" preserveAspectRatio="xMidYMax meet" ')}</g>`}catch(e){return ''}};
const magnifier=(x,y,s=1)=>G(x,y,`<g transform="scale(${s})">${PL('M10 10 L30 30','#B8865A',8)+C(0,0,16,'#DFF4FF','stroke="#FFD24D" stroke-width="6"')+HI(-5,-5,5,3,.8)}</g>`);
SC.home50r={nm:'我的房間',
 bg:K=>{let s=R(0,0,800,390,K.lg('#FFF0F8','#F8E0F0'))+R(0,384,800,116,K.lg('#E8C8A0','#D8B088'))+R(0,380,800,8,'#E8B8D0');
  for(let x=20;x<800;x+=60)s+=C(x,30,3,'#FFD0E8')+C(x+30,70,3,'#FFE4F0');
  s+=windowW(K,300,80,150,150)+P('M284 66 L324 66 L316 246 L280 246Z','#B8A8FF')+P('M426 66 L466 66 L470 246 L434 246Z','#B8A8FF')+R(276,60,196,10,'#9A8AD8',4);
  s+=R(30,300,240,90,K.lg('#FFFFFF','#F4E8FF'),14)+R(30,276,30,120,'#E8B8D0',8)+R(24,262,42,22,'#F2C8DC',10)+R(70,318,200,60,K.lg('#FFB0D0','#FF8AB8'),12)+R(76,296,70,28,'#FFFFFF',12)+HI(110,330,30,6,.4);
  s+=R(276,330,56,60,'#E8C8A0',6)+R(282,338,44,8,'#D8B088',3);
  s+=G(150,150,R(-56,-40,112,80,'#FFFFFF',6)+R(-48,-32,96,64,'#F4F8FF',3)+PL('M-44 -26 H44 V26 H-44Z M-4 -26 V0 H44','#9AA8C8',2.2)+PL('M-24 -10 L-24 16 L-40 16','#3FCB84',3.5)+C(-24,-10,4,'#FF6A8A'));
  s+=R(520,300,180,14,'#E8B888',5)+R(530,314,10,80,'#D8A070',3)+R(680,314,10,80,'#D8A070',3)+R(540,240,8,60,'#B8A8E8',3)+P('M524 240 h40 l-8 -24 h-24Z','#FFE07A')+R(620,262,26,38,'#9FE0C8',6);
  s+=R(716,150,78,240,'#F4E0C8',4)+R(722,156,66,234,'#FFF8EE',3);for(let i=0;i<5;i++)s+=R(726,340-i*28+28,58,10,'#E8C8A0',2);s+=TX(755,146,'樓梯','14','#8A5A3A');
  s+=roomHero()+magnifier(500,370,1.1);
  return s},
 items:[
  {id:'strip',k:'bad',x:330,y:420,r:62,nm:'插座插得滿滿的',why:'插座不要插得滿滿的，請大人整理好。',bad:K=>G(330,440,strip(5)),good:K=>G(330,440,strip(2))},
  {id:'scis',k:'bad',x:600,y:282,r:58,nm:'剪刀打開放在桌邊',why:'剪刀用完合起來，收進筆筒，不拿著跑。',bad:K=>G(670,292,scissors(true)),good:K=>G(633,250,`<g transform="rotate(-80)">${scissors(false)}</g>`)},
  {id:'chair',k:'bad',x:376,y:290,r:62,nm:'窗戶旁邊的椅子',why:'窗戶旁邊不放椅子，也不爬窗戶。',bad:K=>chair(K,376,384,'#FFB86A'),good:K=>chair(K,610,396,'#FFB86A')},
  {id:'toys',k:'bad',x:740,y:420,r:62,nm:'玩具丟在樓梯口',why:'玩具收進箱子，樓梯口空空的，才不會絆倒。',bad:K=>teddy(724,446,.9)+C(760,440,10,'#FF8A8A')+R(736,456,22,14,'#8FD0FF',3)+C(706,470,7,'#FFD24D'),good:K=>box(K,520,486,70,40,'#B8E0FF')+teddy(510,452,.6)+C(536,446,7,'#FF8A8A')},
  {id:'bagbed',k:'bad',hard:1,x:170,y:300,r:58,nm:'塑膠袋放在床上',why:'塑膠袋不放在床上，用完交給大人收好。',bad:K=>G(190,306,P('M-20 -10 Q-22 -32 0 -34 Q22 -32 20 -10 L16 12 H-16Z','#E8F4FF','opacity=".9"')+HI(-8,-20,3,7,.8)),good:K=>''},
  {id:'flash',k:'ok',x:304,y:318,r:52,why:'床邊放手電筒，晚上停電也看得到路，這樣很好喔！',art:K=>G(304,326,R(-16,-6,32,14,'#FF8AB8',6)+R(12,-8,10,18,'#FFE07A',4)+P('M22 -6 L44 -14 L44 16 L22 8Z','#FFF8C8','opacity=".7"'))},
  {id:'map',k:'ok',x:150,y:150,r:58,why:'牆上貼著我家的逃生路線圖，這樣很好喔！',art:K=>''}
 ]};
/* ---------- 台詞（id＝S8S_＋key；TSV 由 dev/c2src/lines.js 產生） ---------- */
const LN={
 d_done:'全部找到了！你是安全小偵探！',d_ok:'這樣很好喔！',d_tip1:'仔細看看，誰做得不對呢？',d_tip2:'我幫你，看發光的地方！',d_more:'還有喔，再找找看！',
 d_in_fire46:'逃生演練屋：誰做得不對？點一下，幫他改過來！',
 d_in_police47:'回家的路上：誰做得不對？點一下，幫他改過來！',
 d_in_pool48:'社區游泳池：誰做得不對？點一下，幫他改過來！',
 d_in_park49:'自行車道：誰做得不對？點一下，幫他改過來！',
 d_in_home50a:'客廳：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50b:'廚房：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50c:'浴室：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50r:'我的房間：哪裡有危險？點一下，貼上小貼紙！',
 d_in_home50d:'陽台：哪裡有危險？點一下，貼上小貼紙！'};
const L=k=>LN[k]||'';
/* 選項念出來：題目念完，一張一張亮起來、念它的字（不識字也聽得懂）；小朋友點了就停 */
async function readOpts(els,txt,ok){try{for(const el of els){if(!el.isConnected||(ok&&!ok()))return;el.classList.add('reading');await Promise.race([SAY([txt(el)]),wait(window.__s8fast?20:2600)]);el.classList.remove('reading');if(!el.isConnected||(ok&&!ok()))return;await wait(window.__s8fast?5:120)}}catch(e){}}
/* 手機橫放時寵物泡泡會蓋住題目：改成只念＋放在自己的說明格 */
const PS2=(text,box)=>{if(shortLand2()||document.querySelector('.stage.q8full')){if(box){box.textContent=text;box.hidden=false}return SAY([text])}return PS(text)};
function shortLand2(){return innerHeight<=500&&innerWidth>innerHeight}
const D8LIST=['fire46','police47','pool48','park49','home50a','home50b','home50c','home50d','home50r'];
D8LIST.forEach(sc=>SC[sc].items.forEach(it=>{LN['d_'+sc+'_'+it.id]=it.why;it.r=Math.max(it.r,it.k==='bad'?58:52)}));  // 手機上點擊範圍至少約 44pt
/* ---------- 版面：手機橫放時題目區太矮，改用泡泡下面到舞台底的整塊空間 ---------- */
let curFit=null;
const refit=()=>{[0,160,520].forEach(t=>setTimeout(()=>{try{curFit&&curFit()}catch(e){}},t))};
const shortLand=()=>innerHeight<=500&&innerWidth>innerHeight;
function avail(play,full){
 try{if(play.dataset.s8s){play.style.cssText='';delete play.dataset.s8s}
  const st=play.closest('.stage');if(st)st.classList.remove('q8full');
  if(full&&st&&!shortLand()&&innerWidth<700&&innerHeight>innerWidth){const sr=st.getBoundingClientRect(),b=st.querySelector('.bubble'),br=b?b.getBoundingClientRect():null;
   const top=(br&&br.height?br.bottom:sr.top+120)+6,left=sr.left+10,right=sr.right-10,bottom=sr.bottom-10;play.dataset.s8s=1;st.classList.add('q8full');
   play.style.cssText=`position:absolute;left:${left-sr.left}px;top:${top-sr.top}px;width:${right-left}px;height:${Math.max(160,bottom-top)}px;flex:none;justify-content:center;gap:4px;margin:0;z-index:2`;
   return {w:right-left,h:Math.max(160,bottom-top),land:false,full:true}}
  if(shortLand()&&st){const sr=st.getBoundingClientRect(),b=st.querySelector('.bubble'),br=b?b.getBoundingClientRect():null,tm=document.getElementById('team'),trc=tm?tm.getBoundingClientRect():null;
   const top=(br&&br.height?br.bottom:sr.top+90)+6,left=sr.left+12;let right=sr.right-10;if(trc&&trc.width&&trc.left>sr.left+sr.width*.6)right=Math.min(right,trc.left-4);
   const bottom=sr.bottom-8;play.dataset.s8s=1;
   play.style.cssText=`position:absolute;left:${left-sr.left}px;top:${top-sr.top}px;width:${Math.max(200,right-left)}px;height:${Math.max(120,bottom-top)}px;flex:none;justify-content:center;gap:4px;margin:0`;
   return {w:Math.max(200,right-left),h:Math.max(120,bottom-top),land:true}}
  const r=play.getBoundingClientRect();return {w:r.width,h:r.height,land:false}}catch(e){return {w:320,h:240,land:false}}}
addEventListener('resize',()=>{try{if(curFit&&S.screen==='stage')setTimeout(()=>{try{curFit&&curFit()}catch(e){}},60)}catch(e){}});
{const _rq=renderQ;renderQ=function(){try{curFit=null;const p=document.querySelector('.stage .play');if(p&&p.dataset.s8s){p.style.cssText='';delete p.dataset.s8s}document.querySelectorAll('.stage.q8full').forEach(x=>x.classList.remove('q8full'));document.querySelectorAll('.d8hold').forEach(x=>x.remove())}catch(e){}return _rq.apply(this,arguments)}}
/* ---------- 找危險：可以放進任何容器（大冒險關第 50 章也用） ---------- */
function d8svg(sc,o={}){const D=SC[sc]||SC.home50a;const K=kit();const fixed=o.fixed||new Set();const hard=!!o.hard;
 let body=D.bg(K),top='',hits='';
 const act=D.items.filter(it=>it.k==='bad'&&(!it.hard||hard)&&(!o.only||o.only.includes(it.id)));
 D.items.forEach(it=>{
  if(it.k==='ok'){body+=`<g class="d8i d8okit" data-id="${it.id}">${it.art(K)}</g>`;hits+=`<circle class="d8hit" data-id="${it.id}" data-k="ok" cx="${it.x}" cy="${it.y}" r="${it.r}" fill="#000" fill-opacity="0"/>`;return}
  if(!act.includes(it))return;  // 困難才出的那一個：其他難度整個不畫
  const f=fixed.has(it.id);
  body+=`<g class="d8i d8bad${f?' fixed':''}" data-id="${it.id}"><g class="d8b">${it.bad(K)}</g><g class="d8g">${it.good(K)}</g></g>`;
  top+=`<g class="d8st${f?' on':''}" data-id="${it.id}">${okSticker(it.x+it.r*.55,it.y-it.r*.55)}</g><circle class="d8ring" data-id="${it.id}" cx="${it.x}" cy="${it.y}" r="${it.r-4}" fill="none" stroke="#FFE27A" stroke-width="10"/>`;
  hits+=`<circle class="d8hit" data-id="${it.id}" data-k="bad" cx="${it.x}" cy="${it.y}" r="${it.r}" fill="#000" fill-opacity="0"/>`});
 return {svg:`<svg class="d8svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(D.nm)}">${K.out()}<rect class="d8bgk" x="0" y="0" width="800" height="500" fill="#000" fill-opacity="0"/>${body}${top}<g class="d8hits">${hits}</g></svg>`,act}}
function mountDanger(host,sc,o={}){
 const D=SC[sc]||SC.home50a;sc=SC[sc]?sc:'home50a';const fixed=new Set();
 const built=d8svg(sc,{hard:o.hard,only:o.only});const act=built.act;const need=Math.min(o.need||act.length,act.length);
 host.innerHTML=built.svg;const svg=host.querySelector('svg');
 const bar=o.bar;let busy=false,miss=0,done=false,idleT=0;
 const drawBar=(msg)=>{if(!bar)return;bar.innerHTML=`<div class="d8slots">${Array.from({length:need},(_,i)=>`<i class="${i<fixed.size?'on':''}">${i<fixed.size?'✓':''}</i>`).join('')}</div>${msg?`<div class="d8why">${esc(msg)}</div>`:''}`};
 drawBar('');
 const ring=id=>{const r=svg.querySelector(`.d8ring[data-id="${id}"]`);if(r){r.classList.remove('on');void r.getBBox;r.classList.add('on')}};
 const left=()=>act.filter(it=>!fixed.has(it.id));
 const hint=m=>{if(done)return;if(m===1){PS2(L('d_tip1'))}else{const it=left()[0];if(it){PS2(L('d_tip2'));ring(it.id);show(it);if(o.onHint)try{o.onHint(it)}catch(e){}}}};
 const arm=()=>{clearTimeout(idleT);idleT=setTimeout(()=>{if(!done&&host.isConnected&&!busy){hint(2);arm()}},o.idle||22000)};arm();
 const fix=async id=>{if(done||busy||fixed.has(id))return;const it=act.find(x=>x.id===id);if(!it)return;
  fixed.add(id);busy=true;arm();
  const g=svg.querySelector(`.d8bad[data-id="${id}"]`);if(g)g.classList.add('fixed');const st=svg.querySelector(`.d8st[data-id="${id}"]`);if(st)st.classList.add('on');
  const r=svg.querySelector(`.d8ring[data-id="${id}"]`);if(r)r.classList.remove('on');
  okSfx();try{if(!RM())burstEl(svg.querySelector(`.d8hit[data-id="${id}"]`),8)}catch(e){}
  drawBar(it.why);if(o.onItem)try{o.onItem(it,fixed.size)}catch(e){}
  const last=fixed.size>=need;
  const p=SAY([it.why]);
  if(last){done=true;clearTimeout(idleT);await Promise.race([p,wait(window.__s8fast?50:5200)]);busy=false;if(host.isConnected&&o.onDone)o.onDone(svg);return}
  await Promise.race([p,wait(window.__s8fast?50:900)]);busy=false};
 const okTap=id=>{const it=D.items.find(x=>x.id===id);if(!it||busy)return;popSfx();drawBar(it.why);SAY([it.why]);
  try{const h=svg.querySelector(`.d8hit[data-id="${id}"]`);if(h&&!RM())burstEl(h,5)}catch(e){}};
 svg.addEventListener('click',e=>{if(done)return;const h=e.target.closest&&e.target.closest('.d8hit');
  if(h){if(h.dataset.k==='bad'){if(!fixed.has(h.dataset.id))fix(h.dataset.id);return}okTap(h.dataset.id);return}
  miss++;if(miss%3===0)hint(miss>=6?2:1)});
 const auto=async()=>{for(const it of left()){if(done)break;while(busy)await wait(40);fix(it.id);await wait(60)}};
 // 直式手機：大圖用螢幕高度的 55～60%，比畫面寬，左右滑著看（點擊圈跟著變大）；iPad、橫放照原本整張放進去
 const fit=(w,h,panH)=>{if(panH){const H=Math.floor(panH),W=Math.floor(H*1.6);svg.style.width=W+'px';svg.style.height=H+'px';host.classList.add('pan');host.style.width=Math.floor(w)+'px';host.style.height=H+'px';
   if(!host.dataset.sx){host.dataset.sx=1;host.scrollLeft=0}return W>w+4}
  host.classList.remove('pan');host.style.width='';host.style.height='';const W=Math.max(120,Math.min(w,h*1.6));svg.style.width=Math.floor(W)+'px';svg.style.height=Math.floor(W/1.6)+'px';return false};
 const show=it=>{try{if(!host.classList.contains('pan'))return;const W=svg.getBoundingClientRect().width,w=host.clientWidth;host.scrollTo({left:Math.max(0,it.x/800*W-w/2),behavior:RM()?'auto':'smooth'})}catch(e){}};
 return {svg,hint,auto,fit,need,act,fixed,host,stop:()=>{done=true;clearTimeout(idleT)}}}
// 直式手機用全舞台（藏起舞台下方的主角寵物）＋左右滑；回傳大圖高度（不用滑時回 0）
const portraitPhone=()=>!shortLand()&&innerWidth<700&&innerHeight>innerWidth;
const panH=(A,reserve)=>portraitPhone()?Math.max(220,Math.min(A.h-reserve,innerHeight*.58)):0;
BUILD.danger8=function(play,sp,arg){
 const sc=SC[arg]?arg:'home50a';S.ans=null;S.revKey=null;
 setPrompt(`<span class="qtag" style="--tagc:#FFB86A">找危險</span>${esc(L('d_in_'+sc))}`,LOG([L('d_in_'+sc)]),sp);
 play.innerHTML=`<div class="d8wrap"><div class="d8box"></div><div class="d8swipe" hidden>← 左右滑一滑，看整張圖 →</div><div class="d8bar"></div></div>`;
 const wrap=play.querySelector('.d8wrap'),bar=play.querySelector('.d8bar'),sw=play.querySelector('.d8swipe');
 const M=mountDanger(play.querySelector('.d8box'),sc,{hard:S.diff==='hard',bar,onDone:el=>{right(el,[praise(),L('d_done')])}});
 S.hint=M.hint;S.__auto=M.auto;
 curFit=()=>{const A=avail(play,portraitPhone());wrap.classList.toggle('land',!!A.land);const side=A.land||A.w>A.h*1.9;wrap.classList.toggle('side',side);
  if(side){M.fit(A.w-Math.min(A.land?190:250,A.w*.3)-8,A.h);sw.hidden=true}else{const ph=panH(A,64+28);const sc=M.fit(A.w,A.h-(innerWidth<700?64:70),ph);sw.hidden=!sc}};
 M.host.addEventListener('scroll',()=>{if(!sw.hidden)sw.classList.add('seen')},{passive:true});
 refit()};
/* ---------- 打電話演練 phone8:119／110（原創手機畫面，練習用，不會真的撥出去） ---------- */
Object.assign(LN,{
 p_note:'練習用，不會真的撥出去',p_note_say:'這是練習用的電話，不會真的撥出去喔！',
 p_in_119:'來練習打一一九！先按一、一、九，再按綠色的電話。',p_in_110:'來練習打一一零！先按一、一、零，再按綠色的電話。',
 p_wk_119:'要按一、一、九喔！我們再按一次。',p_wk_110:'要按一、一、零喔！我們再按一次。',p_glow:'我幫你，看發光的按鍵！',
 p_dial:'按好了！按綠色的電話，撥出去。',p_ring:'嘟……嘟……接通了！',
 p_119_q1:'這裡是一一九，請問在哪裡？',p_110_q1:'這裡是一一零，請問在哪裡？',p_q2:'發生什麼事？',p_q3:'請問你是誰？',
 p_119_end:'好，我們馬上到！',p_110_end:'好，警察馬上到！',
 p_119_a1:'在我家',p_119_a2:'失火了！',p_119_a3:'我是小朋友',p_110_a1:'在公園',p_110_a2:'有人一直跟著我',p_110_a3:'我是小朋友',
 p_w1:'對方問「在哪裡」，要先說在哪裡喔！',p_w2:'對方問「發生什麼事」，要說發生什麼事喔！',p_w3:'對方問「你是誰」，要說出自己是誰喔！',
 p_hang:'等對方說「好」，才可以掛電話喔！',p_hangnow:'對方說好了，現在可以掛電話了！',
 p_end_119:'說得好！一一九不可以亂打，真的有火災、有人受傷才打。',p_end_110:'說得好！一一零不可以亂打，真的需要警察幫忙才打。',
 p_tip:'要說三件事：在哪裡、什麼事、我是誰。',p_real:'真的打電話，要說你的名字；地址請爸媽教你。'});
const PIC8={119:['<svg viewBox="0 0 40 40"><path d="M6 20 L20 7 L34 20 V34 H6Z" fill="#FFB0C8"/><path d="M3 21 L20 5 L37 21" fill="none" stroke="#E86A8A" stroke-width="4" stroke-linecap="round"/><rect x="16" y="23" width="9" height="11" rx="2" fill="#C88A5A"/></svg>','<svg viewBox="0 0 40 40"><path d="M20 36 Q8 34 10 22 Q12 14 18 8 Q18 16 24 18 Q24 10 28 6 Q34 16 30 28 Q28 36 20 36Z" fill="#FF9A3C"/><path d="M20 34 Q14 32 16 26 Q18 22 20 20 Q22 26 25 26 Q26 32 20 34Z" fill="#FFE27A"/></svg>','KID'],110:['<svg viewBox="0 0 40 40"><rect x="17" y="22" width="6" height="14" rx="2" fill="#B8865A"/><circle cx="20" cy="16" r="12" fill="#6FCF7A"/><circle cx="12" cy="20" r="7" fill="#5ABB6A"/><circle cx="28" cy="20" r="7" fill="#5ABB6A"/></svg>','<svg viewBox="0 0 40 40"><ellipse cx="13" cy="26" rx="5" ry="8" fill="#9A8AF0"/><ellipse cx="27" cy="14" rx="5" ry="8" fill="#9A8AF0"/><circle cx="9" cy="16" r="2" fill="#9A8AF0"/><circle cx="13" cy="15" r="2" fill="#9A8AF0"/><circle cx="23" cy="4.5" r="2" fill="#9A8AF0"/><circle cx="27" cy="4" r="2" fill="#9A8AF0"/></svg>','KID']};
const kidIc=()=>{const K=kit();return `<svg viewBox="-24 -100 48 48">${K.out()}${person(K,0,-30,{s:.9,pose:'wave',shirt:'#FFB0D0'})}</svg>`};
const ICALL=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M12 8 q-4 2 -4 8 q2 10 12 16 q6 2 8 -2 l2 -4 q0 -2 -2 -3 l-5 -2 q-2 0 -3 2 l-1 1 q-5 -3 -7 -7 l1 -1 q2 -1 2 -3 l-2 -5 q-1 -2 -3 -2Z" fill="#fff"/></svg>`;
const IHANG=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 22 q14 -10 28 0 l-2 5 q-1 1 -3 1 l-4 -2 q-1 -1 -1 -3 v-2 q-4 -1 -8 0 v2 q0 2 -1 3 l-4 2 q-2 0 -3 -1Z" fill="#fff"/></svg>`;
function opSVG(){const K=kit();return `<svg class="p8opsvg" viewBox="-34 -160 68 68" aria-hidden="true">${K.out()}${C(0,-126,33,'#FFFFFF')}${C(0,-126,33,'#BFE9FF','opacity=".5"')}${person(K,0,-40,{adult:true,s:.62,pose:'hold',girl:true,shirt:'#7FC8F8',ear:true,hair:'#6B4A3A'})}</svg>`}
BUILD.phone8=function(play,sp,arg){
 const num=arg==='110'?'110':'119';const dig=num.split('');S.ans=null;S.revKey=null;
 let phase='dial',typed='',kMiss=0,step=0,cMiss=0,fast=false,alive=true,readTk=0;
 setPrompt(`<span class="qtag" style="--tagc:#FF8A8A">打電話演練</span>${esc(L('p_in_'+num))}`,LOG([L('p_in_'+num),L('p_note_say')]),sp);
 const keys=['1','2','3','4','5','6','7','8','9','del','0','call'];
 play.innerHTML=`<div class="p8wrap"><div class="p8phone"><div class="p8scr"><div class="p8note">${L('p_note')}</div><div class="p8num" aria-live="polite"></div><div class="p8st">要按 <b>${dig.join(' ')}</b></div></div>
  <div class="p8pad">${keys.map(k=>k==='call'?`<button class="p8k p8call" data-k="call" aria-label="撥出">${ICALL}</button>`:k==='del'?`<button class="p8k p8del" data-k="del" aria-label="清除">⌫</button>`:`<button class="p8k" data-k="${k}">${k}</button>`).join('')}</div></div>
  <div class="p8talk" hidden><div class="p8op"><span class="p8opi">${opSVG()}</span><div class="p8ob"></div></div><div class="p8cards"></div><div class="p8me"></div><button class="p8hang" aria-label="掛斷">${IHANG}<span>掛斷</span></button></div></div>`;
 const live=()=>{if(!play.isConnected||S.screen!=='stage')alive=false;return alive};  // 離開關卡後不再念
 const $p=s=>play.querySelector(s),wrap=$p('.p8wrap'),nm=$p('.p8num'),stx=$p('.p8st'),talk=$p('.p8talk'),ob=$p('.p8ob'),cards=$p('.p8cards'),me=$p('.p8me'),hang=$p('.p8hang'),callB=$p('.p8call');
 const show=()=>{nm.textContent=typed;callB.classList.toggle('ready',typed===num)};
 const keyEl=k=>play.querySelector(`.p8k[data-k="${k}"]`);
 const nextKey=()=>typed===num?'call':dig[typed.length]||dig[0];
 const Q=[{q:L('p_'+num+'_q1'),a:1,w:'p_w1'},{q:L('p_q2'),a:2,w:'p_w2'},{q:L('p_q3'),a:3,w:'p_w3'}];
 const A=[1,2,3].map(i=>L('p_'+num+'_a'+i));
 let order=shuffle([1,2,3]);
 S.hint=m=>{if(!live())return;if(phase==='dial'){if(kMiss<=1)PS2(L('p_wk_'+num));else{PS2(L('p_glow'));glow(keyEl(nextKey()))}}
  else if(phase==='talk'){const q=Q[step];if(!q)return;if(cMiss<=1)PS2(L(q.w));else{PS2(L('p_tip'));glow(cards.querySelector(`[data-a="${q.a}"]`))}}
  else if(phase==='hang')glow(hang)};
 const press=k=>{if(phase!=='dial'||S.lock||!alive)return;const b=keyEl(k);popSfx();try{tone(520+(+k||0)*40,0,.12,'sine',.08)}catch(e){}
  if(k==='del'){typed='';show();return}
  if(k==='call'){if(typed===num){connect();return}kMiss++;typed='';show();wrong(b);return}
  if(typed.length>=num.length){kMiss++;typed='';show();wrong(b);return}
  if(k!==dig[typed.length]){kMiss++;typed='';show();wrong(b);return}
  typed+=k;show();if(typed===num){stx.textContent='';SAY([L('p_dial')]);try{callB.classList.add('ready')}catch(e){}}};
 play.querySelectorAll('.p8k').forEach(b=>b.onclick=()=>press(b.dataset.k));
 const ask=async()=>{if(!live())return;const q=Q[step];cMiss=0;ob.textContent=q.q;ob.classList.remove('in');void ob.offsetWidth;ob.classList.add('in');
  order=shuffle([1,2,3]);cards.innerHTML=order.map(i=>{const ic=PIC8[num][i-1];return `<button class="p8c" data-a="${i}"><span class="p8ci">${ic==='KID'?kidIc():ic}</span><span>${esc(A[i-1])}</span></button>`}).join('');
  cards.querySelectorAll('.p8c').forEach(c=>c.onclick=()=>pick(c));const tk=++readTk;await SAY([q.q]);await readOpts([...cards.querySelectorAll('.p8c')],c=>A[+c.dataset.a-1],()=>tk===readTk&&phase==='talk')};
 const pick=async c=>{if(phase!=='talk'||S.lock||!alive||c.disabled)return;const q=Q[step];readTk++;try{hush()}catch(e){}cards.querySelectorAll('.p8c').forEach(x=>x.classList.remove('reading'));
  if(+c.dataset.a!==q.a){cMiss++;wrong(c);return}
  okSfx();c.classList.add('ok22');cards.querySelectorAll('.p8c').forEach(x=>x.disabled=true);
  me.innerHTML+=`<span class="p8said">${esc(A[q.a-1])}</span>`;await Promise.race([SAY([A[q.a-1]]),wait(fast?40:1600)]);if(!live())return;
  step++;if(step<Q.length){ask();return}
  phase='hang';cards.innerHTML='';const e=L('p_'+num+'_end');ob.textContent=e;ob.classList.remove('in');void ob.offsetWidth;ob.classList.add('in');
  await Promise.race([SAY([e]),wait(fast?40:2600)]);if(!live())return;hang.classList.add('ready');stx.textContent='';if(live())SAY([L('p_hangnow')])};
 hang.onclick=async()=>{if(S.lock||!alive)return;if(phase!=='hang'){bump(hang);PS2(L('p_hang'));return}
  phase='end';popSfx();try{tone(330,0,.18,'sine',.08)}catch(e){}hang.classList.remove('ready');talk.classList.add('ended');ob.textContent='';
  right(hang,[praise(),L('p_real'),L('p_end_'+num)],1600)};
 const connect=async()=>{phase='ring';callB.classList.remove('ready');stx.textContent='';nm.textContent=num;wrap.classList.add('calling');
  play.querySelector('.p8pad').hidden=true;talk.hidden=false;ob.textContent=L('p_ring');
  try{if(S.sound){tone(440,0,.5,'sine',.06);tone(440,.9,.5,'sine',.06)}}catch(e){}
  await wait(fast?60:1700);if(!live())return;phase='talk';curFit&&curFit();ask()};
 S.__auto=async()=>{fast=true;for(let i=0;i<20&&phase==='dial'&&!S.lock;i++){press(nextKey());await wait(30)}
  for(let i=0;i<200&&phase!=='hang'&&alive;i++){if(phase==='talk'){const c=cards.querySelector(`.p8c[data-a="${(Q[step]||{}).a}"]:not([disabled])`);if(c)pick(c)}await wait(60)}
  for(let i=0;i<100&&!hang.classList.contains('ready')&&alive;i++)await wait(60);hang.click()};
 show();
 curFit=()=>{if(!play.isConnected){alive=false;return}const A0=avail(play);wrap.classList.toggle('land',!!A0.land)};refit();
};
/* ---------- 可以／不可以 okno8:<章>（情境卡，舉手或搖頭，不計時） ---------- */
// [情境, 可以1／不可以0, 為什麼, 小圖]
const OKNO8={
 46:[['逃生要開門前，先用手背摸摸門把。',1,'對！門把燙燙的，外面可能有火，就不要開。','door|🚪'],
  ['衣服燒起來了，停下來、躺下、滾一滾。',1,'對！停、躺、滾，雙手遮住臉，把火壓熄。','fire|🧥'],
  ['插座冒煙了，自己拿水去潑。',0,'電器冒煙不碰、不潑水，馬上告訴大人，一起往外逃。','smoke|🔌'],
  ['逃出來以後，跟消防員說「家裡還有小狗」。',1,'對！告訴消防員請他們幫忙，自己不跑回去。','firehelmet|🐶'],
  ['平常就跟家人一起走一走逃生路線。',1,'對！平常練習，真的有事就不會慌。','exitsign|🗺️'],
  ['手電筒放在床邊，停電的時候用。',1,'對！手電筒放在找得到的地方，晚上也看得到路。','flashlight|🔦'],
  ['把玩具堆在樓梯和門口。',0,'樓梯和門口是逃生的路，要空空的。','stairs|🧸'],
  ['失火了，先打電話給好朋友聊天。',0,'先逃出去！到了安全的地方，再請大人打一一九。','phone|☎️']],
 47:[['一位親切的奶奶，請你幫她搬東西到她的車上。',0,'大人需要幫忙會找別的大人，不跟不熟的人去車子那裡。','car|🚗'],
  ['不熟的叔叔說他是爸爸的同事，要帶你去買冰淇淋。',0,'說認識爸媽、要請你吃東西，都不跟他走，先問爸爸媽媽。','gift|🍦'],
  ['有人一直跟著你，你跑進旁邊的店裡，請店員幫忙。',1,'對！跑到人多、明亮的店裡，請大人幫忙。','shop|🏪'],
  ['路邊有人發試喝的飲料包，叫你喝喝看。',0,'不知道是什麼的飲料不喝，說「不要」，告訴大人。','drinkpack|🧃'],
  ['在路上撿到一支手機，交給派出所的警察。',1,'對！撿到東西交給警察，幫忙找到主人。','policehat|📱'],
  ['車子裡的人跟你問路，你走近車子告訴他。',0,'問路應該問大人，小朋友站遠遠的，不靠近車子。','car|🚙'],
  ['不認識的人問你住在哪裡，你告訴他。',0,'不告訴不認識的人你住哪裡，馬上告訴大人。','lockheart|🏠'],
  ['出門前，跟爸媽說要去哪裡、跟誰去。',1,'對！爸媽知道你在哪裡，才放心。','👨‍👩‍👧']],
 48:[['沒有大人陪，自己去游泳池玩水。',0,'玩水一定要有大人陪在旁邊。','ring|🏊'],
  ['下水前，先上廁所。',1,'對！先上好廁所，在水裡比較舒服，池子也乾淨。','🚻'],
  ['戴好泳帽，把長頭髮綁起來。',1,'對！頭髮綁好，比較乾淨，也不會被勾住。','goggles|👧'],
  ['在泳池裡吐口水。',0,'池水是大家一起用的，要保持乾淨。','💦'],
  ['躲在水裡憋氣很久，嚇好朋友。',0,'在水裡不惡作劇，大家才不會擔心。','🫧'],
  ['游完泳，用毛巾擦乾、換上乾衣服。',1,'對！擦乾、穿暖，才不會感冒。','towel|🧺'],
  ['在河邊、海邊，沒有大人就自己下水玩。',0,'河邊、海邊的水又深又會流，一定要大人陪，在可以玩水的地方玩。','whistle|🌊'],
  ['出太陽的時候，擦防曬、戴帽子。',1,'對！保護皮膚，才不會曬傷。','🧢']],
 49:[['騎車穿亮色的衣服或反光背心。',1,'對！亮亮的，別人很遠就看得到你。','vest|🦺'],
  ['鞋帶鬆鬆的，就上車騎。',0,'鞋帶綁好再騎，才不會捲進車輪。','👟'],
  ['長長的褲管捲起來，再騎腳踏車。',1,'對！衣服不會捲進車輪。','👖'],
  ['一邊騎車，一邊吃冰淇淋。',0,'騎車兩手握好，眼睛看前面。','🍦'],
  ['下坡的時候，慢慢騎、輕輕按煞車。',1,'對！下坡慢慢騎，才停得住。','brake|⛰️'],
  ['腳踏車停在走道中間。',0,'腳踏車停在停車架，不擋住別人的路。','bike|🚲'],
  ['溜滑板車的時候，也戴好安全帽。',1,'對！騎腳踏車、溜滑板車，都要戴安全帽。','scooter|🛴']],
 50:[['浴缸放了水，大人不在，自己進去玩。',0,'浴缸的水很危險，大人在旁邊才可以洗澡。','wetfloor|🛁'],
  ['把小珠子放進嘴巴、鼻子裡。',0,'小東西會卡住，不放進嘴巴和鼻子。','📿'],
  ['吹風機用完，請大人拔插頭收好。',1,'對！電器用完收好。','💨'],
  ['在樓梯上跑跑跳跳。',0,'上下樓梯扶著扶手，一步一步走。','stairs|🪜'],
  ['生病要吃的藥，等大人拿給你。',1,'對！吃藥要大人拿給你，不自己拿。','medicine|💊'],
  ['把衣服放在電暖器上面烤。',0,'電暖器旁邊不放衣服和紙，會燒起來。','fire|🔥'],
  ['玩具玩完收好，地上空空的。',1,'對！地上空空的，大家都不會絆倒。','🧸'],
  ['把電線拉來拉去，當跳繩玩。',0,'電線不是玩具，不拉、不咬。','cord|🔌']]};
Object.assign(LN,{o_in:'可以，還是不可以？可以就舉手，不可以就搖頭！',o_yes:'可以',o_no:'不可以',o_done:'全部答對了！你好會判斷喔！',o_glow:'我幫你，看發光的那一個！'});
Object.keys(OKNO8).forEach(c=>OKNO8[c].forEach((r,i)=>{LN[`o_${c}_${i}`]=r[0];LN[`o_${c}_${i}w`]=r[2]}));
const icoHTML=sp=>{const [k0,e]=String(sp).includes('|')?String(sp).split('|'):['',sp];try{if(k0&&typeof ICONART!=='undefined'&&ICONART['i:s46'+k0])return ICONART['i:s46'+k0];const q=window.S46&&S46.QI&&S46.QI[e];if(q&&typeof ICONART!=='undefined'&&ICONART['i:s46'+q])return ICONART['i:s46'+q];if(typeof ICONART!=='undefined'&&ICONART[e])return ICONART[e]}catch(_){}return `<span class="o8emo">${e}</span>`};
const HANDUP=`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 26 V12 a3 3 0 0 1 6 0 V22 V8 a3 3 0 0 1 6 0 V22 V10 a3 3 0 0 1 6 0 V24 V16 a3 3 0 0 1 6 0 V30 q0 12 -12 12 q-8 0 -12 -6 l-8 -10 a3 3 0 0 1 5 -4Z" fill="${SK}"/><path d="M18 40 q6 4 14 1" stroke="#F2B8A0" stroke-width="2" fill="none"/></svg>`;
const SHAKE=`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="${SK}"/><path d="M9 22 Q10 8 24 8 Q38 8 39 22 Q32 14 24 15 Q16 14 9 22Z" fill="#6B4A3A"/><circle cx="18" cy="25" r="2" fill="${EY}"/><circle cx="30" cy="25" r="2" fill="${EY}"/><path d="M20 32 h8" stroke="#C8506A" stroke-width="2" stroke-linecap="round"/><path d="M4 18 q-3 6 0 12 M44 18 q3 6 0 12" stroke="#FF8AB8" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
BUILD.okno8=function(play,sp,arg){
 const ch=OKNO8[arg]?arg:'46';S.ans=null;S.revKey=null;const all=OKNO8[ch].map((r,i)=>({t:r[0],a:r[1],w:r[2],ic:r[3],i}));
 const n=byD(3,3,4);const SEEN=window.__o8seen||(window.__o8seen={});const seen=SEEN[ch]||(SEEN[ch]=[]);if(all.length-seen.length<n)seen.length=0;  // 同一章兩題可以／不可以，先出還沒出過的
 let list;for(let g=0;g<30;g++){const fresh=shuffle(all.filter(x=>!seen.includes(x.i)));list=fresh.slice(0,n);const y=list.filter(x=>x.a).length;if(y>=1&&y<n)break}
 list.forEach(x=>seen.push(x.i));
 let k=0,miss=0,fast=false,busy=false;
 setPrompt(`<span class="qtag" style="--tagc:#9FE0A0">可以不可以</span>${esc(L('o_in'))}`,LOG([L('o_in')]),sp);
 play.innerHTML=`<div class="o8wrap"><div class="q8dots">${list.map(()=>'<i></i>').join('')}</div><div class="o8card"><div class="o8ic"></div><div class="o8t"></div><div class="o8why" hidden></div></div>
  <div class="o8btns"><button class="o8b yes" data-v="1">${HANDUP}<span>${L('o_yes')}</span></button><button class="o8b no" data-v="0">${SHAKE}<span>${L('o_no')}</span></button></div></div>`;
 const card=play.querySelector('.o8card'),ic=play.querySelector('.o8ic'),tt=play.querySelector('.o8t'),why=play.querySelector('.o8why'),btn=v=>play.querySelector(`.o8b[data-v="${v}"]`);
 const dots=[...play.querySelectorAll('.q8dots i')];
 const show=async()=>{const it=list[k];miss=0;ic.innerHTML=icoHTML(it.ic);tt.textContent=it.t;why.hidden=true;dots.forEach((d,j)=>{d.classList.toggle('on',j<k);d.classList.toggle('now',j===k)});
  card.classList.remove('in');void card.offsetWidth;card.classList.add('in');play.querySelectorAll('.o8b').forEach(b=>b.classList.remove('ok22','hintglow'));
  if(k>0||!sp)SAY([it.t]);else setTimeout(()=>{try{if(list[k]===it&&card.isConnected)SAY([it.t])}catch(e){}},50)};
 S.hint=m=>{const it=list[k];if(!it)return;why.textContent=it.w;why.hidden=false;if(miss<=1)PS2(it.w);else{PS2(L('o_glow'));glow(btn(it.a))}};
 const ans=async b=>{if(S.lock||busy)return;const it=list[k];if(!it)return;
  if(+b.dataset.v!==it.a){miss++;wrong(b);return}
  busy=true;okSfx();b.classList.add('ok22');why.textContent=it.w;why.hidden=false;dots[k].classList.add('on');
  if(k===list.length-1){busy=false;right(b,[praise(),it.w],600);return}
  await Promise.race([SAY([it.w]),wait(fast?40:2600)]);await wait(fast?20:300);k++;busy=false;if(card.isConnected)show()};
 play.querySelectorAll('.o8b').forEach(b=>b.onclick=()=>ans(b));
 S.__auto=async()=>{fast=true;for(let g=0;g<20&&!S.lock&&card.isConnected;g++){while(busy)await wait(30);if(S.lock)break;ans(btn(list[k].a));await wait(40)}};
 show();curFit=()=>{const A0=avail(play);play.querySelector('.o8wrap').classList.toggle('land',!!A0.land)};refit()};
/* ---------- 樣式 ---------- */
const st8=document.createElement('style');st8.id='m8sf-css';st8.textContent=`
.d8wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:100%;height:100%;min-height:0}
.d8wrap.land,.d8wrap.side{flex-direction:row;gap:12px}
.d8box{display:flex;align-items:center;justify-content:center;min-height:0}
.d8box.pan{display:block;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;border-radius:18px;box-shadow:0 4px 18px rgba(20,10,60,.35);touch-action:pan-x}.d8box.pan::-webkit-scrollbar{display:none}.d8box.pan .d8svg{max-width:none;border-radius:0;box-shadow:none}
.d8swipe{font-size:15px;font-weight:700;color:#FFE27A;line-height:1.2;text-align:center;transition:opacity .4s}.d8swipe[hidden]{display:none}.d8swipe.seen{opacity:.55}
.d8svg{display:block;border-radius:18px;box-shadow:0 4px 18px rgba(20,10,60,.35);background:#fff;touch-action:manipulation;-webkit-tap-highlight-color:transparent;max-width:100%}
.d8svg .d8hit{cursor:pointer;pointer-events:all}
.d8svg .d8bad .d8g{display:none}.d8svg .d8bad.fixed .d8b{display:none}.d8svg .d8bad.fixed .d8g{display:inline;animation:d8in .45s ease}
.d8svg .d8st{opacity:0;pointer-events:none}.d8svg .d8st.on{opacity:1;animation:d8in .4s ease}
.d8svg .d8ring{opacity:0;pointer-events:none}.d8svg .d8ring.on{animation:d8ring 1.1s ease-in-out 4}
@keyframes d8in{from{opacity:0}to{opacity:1}}
@keyframes d8ring{0%,100%{opacity:0}50%{opacity:1}}
.d8svg .d8smoke{animation:d8drift 5s ease-in-out infinite alternate}
@keyframes d8drift{from{transform:translateX(0)}to{transform:translateX(10px)}}
.d8svg .d8flame{animation:d8flick .8s ease-in-out infinite alternate}
@keyframes d8flick{from{opacity:.85}to{opacity:1}}
.d8bar{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-height:56px;max-width:100%}
.d8wrap.land .d8bar,.d8wrap.side .d8bar{flex-direction:column;width:min(240px,28%);min-height:0}.d8wrap.side .d8slots{flex-wrap:wrap;justify-content:center}
.d8slots{display:flex;gap:6px}
.d8slots i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.18);border:2px dashed rgba(255,255,255,.55);color:#fff;font-style:normal;font-weight:800;font-size:20px;transition:background .3s}
.d8slots i.on{background:#3FCB84;border:2px solid #6FE3A8;box-shadow:0 0 10px rgba(111,227,168,.7)}
.d8why{background:#FFFDF5;color:#4A2A7A;border-radius:14px;padding:6px 12px;font-size:17px;line-height:1.35;max-width:min(560px,100%);box-shadow:0 2px 8px rgba(20,10,60,.25);animation:d8in .3s ease}
.d8wrap.land .d8why{font-size:14px;padding:5px 8px}
@media (max-width:600px){.d8why{font-size:15px}.d8slots i{width:30px;height:30px;font-size:18px}.d8bar{min-height:50px;gap:6px}}
/* 大冒險關：直式手機把題目區放大到舞台底，舞台下方的主角和寵物先藏起來（畫面裡已經有主角和寵物）；寵物說話泡泡會蓋住題目，這時提示只念出來＋發光 */
.stage.q8full #team>*{visibility:hidden}.stage.q8full #petbub{display:none!important}.stage.q8full .play{justify-content:flex-start!important;padding-top:4px}.stage.q8full .q8wrap{justify-content:flex-start}
/* 打電話 */
.p8wrap{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:clamp(10px,2.4vw,26px);width:100%;max-height:100%}
.p8phone{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 14px 14px;border-radius:30px;background:linear-gradient(180deg,#5A4A8A,#3A2E66);box-shadow:0 6px 20px rgba(10,6,40,.45),inset 0 2px 0 rgba(255,255,255,.25)}
.p8scr{width:100%;min-width:200px;border-radius:16px;background:linear-gradient(180deg,#E8F8FF,#C8E8FA);padding:6px 10px;text-align:center;color:#2A3A6A}
.p8note{font-size:16px;font-weight:800;color:#D0406A;line-height:1.25}
.p8num{font:800 34px/1.15 var(--latin,'Baloo 2',sans-serif);letter-spacing:6px;min-height:40px;color:#2A2A5A}
.p8st{font-size:16px;color:#4A5A8A;min-height:20px}.p8st b{font-family:var(--latin,'Baloo 2',sans-serif);font-size:20px;letter-spacing:3px;color:#D0406A}
.p8pad{display:grid;grid-template-columns:repeat(3,auto);gap:8px}
.p8k{--kz:clamp(48px,min(8.4vh,15vw),66px);width:var(--kz);height:var(--kz);border-radius:50%;border:0;background:linear-gradient(180deg,#FFFFFF,#E4E0F4);color:#3A2E66;font:800 calc(var(--kz)*.46)/1 var(--latin,'Baloo 2',sans-serif);box-shadow:0 3px 0 #B8B0D8;cursor:pointer;-webkit-tap-highlight-color:transparent;display:grid;place-items:center;padding:0}
.p8k:active{transform:translateY(2px);box-shadow:0 1px 0 #B8B0D8}
.p8k.p8del{font-size:calc(var(--kz)*.36);color:#8A7AB8}
.p8k.p8call{background:linear-gradient(180deg,#7FE8A8,#3FC878);box-shadow:0 3px 0 #2A9A58}.p8k.p8call svg{width:56%;height:56%}
.p8k.p8call.ready{box-shadow:0 0 0 4px #FFE27A,0 0 18px #FFE27A}
.p8wrap.calling .p8pad{display:none}
.p8talk{display:flex;flex-direction:column;align-items:center;gap:8px;max-width:min(520px,100%)}
.p8talk[hidden]{display:none}
.p8op{display:flex;align-items:center;gap:8px}
.p8opi{width:64px;height:64px;flex:none;display:block}.p8opi svg{width:100%;height:100%;display:block}
.p8ob{background:#FFFDF5;color:#3A2E66;border-radius:16px;padding:8px 14px;font-size:19px;font-weight:700;line-height:1.3;box-shadow:0 2px 8px rgba(20,10,60,.25);min-height:24px}
.p8ob.in{animation:d8in .35s ease}
.p8cards{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.p8c{min-height:56px;min-width:110px;max-width:200px;padding:8px 12px;border-radius:16px;border:3px solid #FFE27A;background:#FFFFFF;color:#4A2A7A;font-size:18px;font-weight:800;line-height:1.25;cursor:pointer;box-shadow:0 3px 0 rgba(20,10,60,.25)}
.p8c{display:flex;flex-direction:column;align-items:center;gap:2px}.p8ci{width:36px;height:36px;display:block}.p8ci svg{width:100%;height:100%;display:block}.p8c.reading,.q8opt.reading{box-shadow:0 0 0 4px #FFE27A,0 0 16px #FFE27A}
.p8c.ok22{border-color:#6FE3A8;box-shadow:0 0 0 3px #6FE3A8,0 0 14px #6FE3A8}
.p8c[disabled]{opacity:.75}
.p8me{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.p8said{background:#6FE3A8;color:#144A30;border-radius:12px;padding:3px 10px;font-size:16px;font-weight:700}
.p8hang{display:flex;align-items:center;gap:6px;min-height:52px;padding:6px 18px;border-radius:30px;border:0;background:linear-gradient(180deg,#FF8A8A,#E04A5A);color:#fff;font-size:18px;font-weight:800;box-shadow:0 3px 0 #A82A3A;cursor:pointer}
.p8hang svg{width:34px;height:34px}.p8hang.ready{box-shadow:0 0 0 4px #FFE27A,0 0 18px #FFE27A}
.p8talk.ended .p8cards{display:none}
@media (max-width:700px) and (orientation:portrait){.p8wrap{flex-direction:column;gap:8px}.p8phone{padding:8px 10px 10px;gap:6px}.p8pad{gap:6px}.p8k{--kz:clamp(44px,min(7vh,15vw),60px)}.p8num{font-size:28px;min-height:32px}.p8scr{min-width:180px;padding:4px 8px}
 .p8c{min-width:88px;font-size:16px;padding:6px 8px}.p8ob{font-size:17px}.p8opi{width:52px;height:52px}}
@media (max-height:700px) and (orientation:portrait){.p8k{--kz:44px}.p8pad{gap:4px}.p8st{display:none}.p8num{font-size:24px;min-height:28px}.p8note{font-size:14px}}
.p8wrap.land{gap:10px}.p8wrap.land .p8phone{flex-direction:row;padding:8px;gap:8px}.p8wrap.land .p8scr{min-width:150px;max-width:170px;align-self:stretch;display:flex;flex-direction:column;justify-content:center}
.p8wrap.land .p8k{--kz:44px}.p8wrap.land .p8pad{gap:4px}.p8wrap.land .p8note{font-size:14px}
.p8wrap.land.calling .p8phone{flex-direction:column}.p8wrap.land .p8talk{gap:5px}.p8wrap.land .p8ob{font-size:16px;padding:5px 10px}.p8wrap.land .p8c{min-height:46px;font-size:15px;padding:4px 8px;min-width:90px}.p8wrap.land .p8opi{width:44px;height:44px}.p8wrap.land .p8hang{min-height:46px;font-size:16px}
@media (min-width:900px) and (min-height:600px){.p8ob{font-size:24px;padding:10px 18px}.p8c{font-size:22px;min-height:66px;min-width:150px;max-width:260px}.p8opi{width:84px;height:84px}.p8said{font-size:19px}.p8hang{font-size:22px;min-height:60px}.p8talk{gap:14px}.p8wrap.calling .p8scr{min-width:240px}}
/* 可以／不可以 */
.o8wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(8px,2vh,16px);width:100%}
.q8dots{display:flex;gap:6px;align-items:center}
.q8dots i{font-style:normal;line-height:1}.q8dots i::before{content:'★';font-size:24px;color:rgba(255,255,255,.3);transition:color .3s,text-shadow .3s}
.q8dots i.on::before{color:#FFE27A;text-shadow:0 0 10px #FFE27A}.q8dots i.now:not(.on)::before{color:rgba(255,226,122,.6)}
.o8card{display:flex;align-items:center;gap:14px;background:#FFFDF5;border-radius:22px;padding:14px 20px;max-width:min(640px,96%);box-shadow:0 4px 14px rgba(20,10,60,.3);flex-wrap:wrap;justify-content:center}
.o8card.in{animation:d8in .35s ease}
.o8ic{width:clamp(56px,10vh,88px);height:clamp(56px,10vh,88px);display:grid;place-items:center;flex:none}.o8ic svg{width:100%;height:100%}.o8emo{font-size:clamp(44px,8vh,70px);line-height:1}
.o8t{font-size:clamp(19px,2.8vh,26px);font-weight:800;color:#3A2E66;line-height:1.35;flex:1;min-width:180px}
.o8why{flex-basis:100%;font-size:17px;color:#7A4A9A;background:#F4ECFF;border-radius:12px;padding:6px 10px;line-height:1.35}
.o8why[hidden]{display:none}
.o8btns{display:flex;gap:clamp(14px,4vw,40px)}
.o8b{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:clamp(110px,22vw,170px);min-height:clamp(84px,14vh,130px);border-radius:24px;border:4px solid #fff;font-size:clamp(18px,2.6vh,24px);font-weight:800;cursor:pointer;box-shadow:0 4px 0 rgba(20,10,60,.3)}
.o8b svg{width:clamp(40px,7vh,64px);height:clamp(40px,7vh,64px)}
.o8b.yes{background:linear-gradient(180deg,#B8F4D0,#6FDCA0);color:#145A34}.o8b.no{background:linear-gradient(180deg,#FFD0E0,#FF9AB8);color:#7A1A3A}
.o8b.ok22{box-shadow:0 0 0 4px #6FE3A8,0 0 18px #6FE3A8}
@media (max-width:600px){.o8card{padding:10px 12px;gap:10px}.o8t{font-size:17px;min-width:150px}.o8why{font-size:15px}}
.o8wrap.land{flex-direction:row;flex-wrap:wrap;gap:8px}.o8wrap.land .q8dots{flex-basis:100%;justify-content:center}.o8wrap.land .o8card{max-width:58%;padding:8px 12px}.o8wrap.land .o8t{font-size:16px;min-width:120px}.o8wrap.land .o8ic{width:48px;height:48px}.o8wrap.land .o8emo{font-size:40px}
.o8wrap.land .o8btns{flex-direction:column;gap:8px}.o8wrap.land .o8b{min-height:52px;width:120px;flex-direction:row;font-size:17px}.o8wrap.land .o8b svg{width:34px;height:34px}.o8wrap.land .o8why{font-size:14px}
@media (prefers-reduced-motion:reduce){.d8svg .d8smoke,.d8svg .d8flame{animation:none}.d8svg .d8ring.on{animation:none;opacity:1}}
body.lite .d8svg .d8smoke,body.lite .d8svg .d8flame{animation:none}
`;document.head.appendChild(st8);
/* ---------- 給別的 mod 用 ---------- */
try{if(typeof TNAME!=='undefined'&&TNAME)Object.assign(TNAME,{danger8:'找危險',phone8:'打電話演練',okno8:'可以不可以',quest8:'大冒險關'})}catch(e){}
window.__danger8={list:D8LIST,SC,panH,portraitPhone,svg:(sc,o)=>d8svg(sc,o||{}).svg,mount:mountDanger};
window.__s8s={LN,L,SC,kit,person,an,anKey,smoke,flame,okSticker,sparkle,bottle,cup,box,teddy,tree,bike,kidBike,car,exitSign,chair,plant,phoneS,R,C,E,P,Ln,PL,G,HI,TX,lt,dk,avail,panH,portraitPhone,setFit:f=>{curFit=f},refit,SAY,PS,PS2,readOpts,okSfx,popSfx,esc,RM,byD,OKNO8,uid,mountDanger,ICALL,IHANG,opSVG};
}catch(e){console.log('m8sf',e)}
}).toString()+')()')})();

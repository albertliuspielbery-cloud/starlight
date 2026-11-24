
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

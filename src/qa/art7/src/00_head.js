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

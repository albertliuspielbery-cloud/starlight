/* ================= 2.3 我的家與手作（m9zj_home23.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 給 E（我的家與手作）。說明：dev/home23.md。台詞：lines/h23.tsv（H23_）＋ lines/h23_ssml.json。測試：qa/v23/home/。
 * 1. 手作小工坊（畫面 craft23，遊樂園「我的家」）：一次做一樣，選色紙 → 剪（手指沿虛線描）→ 塗顏色／畫圖案（手指畫）→ 貼貼紙、亮片
 *    → 黏起來（拖到發亮的地方）→ 完成（作品小動畫）→ 放進房間。基本 3 種（紙燈籠、小旗子串、紙盤花），禮物 4 種
 *    （cr_windmill 彩色小風車、cr_fishcup 紙杯小魚、cr_wreath 小花圈、cr_frame 手作相框，G22.has(id) 才出現）。
 *    作品存在 V2.craft23={w:[…最多 12 件],show:[…最多 4 件]}（每個小朋友一份；只存參數、顏色、簡化過的筆畫，不存圖）。
 * 2. 房間：床頭上方牆面（800×400 座標 x96–206、y134–212）加「手作展示」——上面一條掛繩（2 件）、下面一塊小層板（2 件）；
 *    點作品會動一下、念一句。「佈置房間」多一個「手作作品」分類，可以選放哪幾件。
 * 3. 節慶佈置一件一件選（家長 11/27 方案 C）：「節日佈置」裡多一張「一件一件選」，打開後每一件可以點開關，也可以混搭不同節日的單件
 *    （同一個位置只放一件，放新的就換掉舊的）。舊存檔（V2.fest_主角＝整套）照舊。自動模式（__fsAuto）只能開關這次節日的每一件。
 * 動畫只用移動、旋轉（物品）、淡入、亮光；角色不放大縮小。減少動態、流暢模式都停。語音只用 say()（沒錄音只出字幕），不用裝置語音。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(typeof SCREENS!=='object'||!SCREENS.room||typeof rmEnhance!=='function')return;
const NS='http://www.w3.org/2000/svg';
const n1=v=>Math.round(v*10)/10;
const boy=()=>{try{return window.HERO==='prince'}catch(e){return false}};
const snd=k=>{try{sfx(k)}catch(e){}};
const sv2=()=>{try{save2()}catch(e){}};
const RM=()=>{try{return !!reduced||!!S.lite||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const RMH=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};  // 只看「減少動態」（點了才動一下的，流暢模式也動一下）
const PHONE=()=>Math.min(innerWidth,innerHeight)<=500;
let UID=0;const uid=p=>(p||'h23')+(++UID).toString(36)+Math.random().toString(36).slice(2,5);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);

/* ---------- 台詞（lines/h23.tsv 由這張表產生：H23_＋key） ---------- */
/*H23LINES*/
const T={
"name":"手作小工坊！",
"hello":"歡迎來到手作小工坊！今天要做什麼呢？",
"n_lantern":"紙燈籠！","n_flags":"小旗子串！","n_plate":"紙盤花！","n_windmill":"彩色小風車！","n_fishcup":"紙杯小魚！","n_wreath":"小花圈！","n_frame":"手作相框！",
"s_color":"先選一張你喜歡的色紙！",
"s_cut":"拿起剪刀，用手指沿著虛線，慢慢畫過去！",
"cut_more":"還有一條虛線，繼續剪！",
"cut_done":"剪好了！",
"cut_hint":"從發亮的剪刀那裡開始，沿著虛線走喔！",
"s_paint":"來塗顏色、畫圖案！選顏色和筆，用手指畫畫看。",
"paint_ok":"畫好了，就按「下一步」！",
"s_stick":"貼上貼紙和亮片！點一個貼紙，再點你想貼的地方。",
"stick_ok":"貼好了，就按「下一步」！",
"s_glue":"最後把東西黏上去！把它拖到發亮的地方。",
"glue_ok":"黏好了！",
"glue_try":"差一點點，再試一次！",
"glue_hint":"拖到發亮的圓圈裡面喔！",
"done":"完成了！你做得好漂亮！",
"d_lantern":"紙燈籠輕輕搖，好漂亮！","d_flags":"小旗子隨風飄呀飄！","d_plate":"紙盤花開花了！","d_windmill":"風一吹，小風車轉呀轉！",
"d_fishcup":"小魚游來游去！","d_wreath":"小花圈好可愛！","d_frame":"相框裡是最可愛的你！",
"room_put":"放進房間了！去房間看看吧！",
"room_full":"房間的展示架滿了，換下最早放的那一件。",
"full12":"作品櫃滿了！選一件舊作品，換成新的。",
"gallery":"這是你做過的作品！",
"gal_empty":"還沒有作品，做一個吧！",
"r_lantern":"這是我做的紙燈籠！","r_flags":"這是我做的小旗子串！","r_plate":"這是我做的紙盤花！","r_windmill":"這是我做的小風車！",
"r_fishcup":"這是我做的紙杯小魚！","r_wreath":"這是我做的小花圈！","r_frame":"這是我做的相框！",
"tab_open":"選幾件作品，放在牆上和小架子上！",
"tab_on":"放上去了！","tab_off":"收起來了！",
"tab_none":"還沒有作品喔！去手作小工坊做一個吧！",
"fx_open":"想要哪幾件佈置？點一下就能放上去，再點一下就拿下來。也可以混搭不同節日喔！",
"fx_auto":"這次節日的佈置，點一下就能拿下來，再點一下就放回去！",
"fx_on":"放上去了！","fx_off":"拿下來了！","fx_swap":"換上新的囉！","fx_none":"全部拿下來了！",
"it_cny_top":"紅燈籠串！","it_cny_wl":"倒貼的福字！","it_cny_wm":"大紅燈籠！","it_cny_cp":"春聯！","it_cny_wr":"一串鞭炮！","it_cny_win":"窗花！","it_cny_fl":"橘子盆和紅包！","it_cny_bed":"床柱上的紅包！",
"it_lantern_top":"一排小燈籠！","it_lantern_wm":"宮燈！","it_lantern_wl":"魚燈！","it_lantern_rd":"燈謎卡！","it_lantern_wr":"紅燈籠！","it_lantern_win":"月亮和煙火！","it_lantern_fl":"兔子燈和湯圓！",
"it_duanwu_top":"香包串！","it_duanwu_wm":"一串粽子！","it_duanwu_wl":"大香包！","it_duanwu_wr":"艾草和菖蒲！","it_duanwu_win":"窗外的龍舟！","it_duanwu_fl":"龍舟和立蛋！",
"it_moon_top":"星星月亮串！","it_moon_win":"大圓月！","it_moon_wm":"月亮燈！","it_moon_wl":"彎彎的月亮！","it_moon_fl":"烤肉和月餅！","it_moon_fl2":"兔子燈！",
"it_halloween_top":"橘紫小彩旗！","it_halloween_web":"笑臉小蜘蛛！","it_halloween_wl":"巫師帽！","it_halloween_wm":"小幽靈！","it_halloween_wr":"蝙蝠串！","it_halloween_win":"紫色的夜空！","it_halloween_fl":"南瓜燈和糖果籃！","it_halloween_fl2":"小南瓜燈！",
"it_xmas_top":"彩燈串！","it_xmas_wm":"大花圈！","it_xmas_wl":"鈴鐺！","it_xmas_wr":"拐杖糖和星星！","it_xmas_win":"下雪的窗戶！","it_xmas_bed":"聖誕襪！","it_xmas_fl":"聖誕樹和禮物！","it_xmas_fl2":"雪人！"
};
/*H23END*/
const say23=(...keys)=>{try{const a=keys.filter(Boolean).map(k=>T[k]||k);if(!a.length)return Promise.resolve();try{hush()}catch(e){}return Promise.resolve(say(a)).catch(()=>{})}catch(e){return Promise.resolve()}};
// 畫面上的提示字（跟字幕同一句；沒聲音時也看得到）
let tipEl=null;const tip=k=>{try{if(tipEl&&tipEl.isConnected)tipEl.textContent=heroT(T[k]||k)}catch(e){}};

/* ---------- 色紙、顏料、貼紙 ---------- */
const PAPER=[['#FFB3CF','#FF8FB8'],['#FF8A8A','#F0645E'],['#FFC27A','#FF9E4A'],['#FFE88A','#FFD24D'],['#A8E8A0','#6FCB7A'],['#9AD6FF','#5FB4F0'],['#CDB4FF','#A88AF0'],['#FFFDF6','#F2EADA']];
const PAPERN=['粉紅色','紅色','橘色','黃色','綠色','藍色','紫色','白色'];
const INK=['#FF4F6E','#FF9A3A','#FFD23A','#4CC26A','#3A9CFF','#9A6AF0','#FF7FC0','#FFFFFF','#8A5A3A'];
const BRUSH=[{w:4.5,n:'細筆'},{w:11,n:'粗筆'},{w:0,dot:5,n:'點點筆'}];
const star5=(cx,cy,R,k=.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+n1(cx+r*Math.cos(a))+' '+n1(cy+r*Math.sin(a))}return d+'Z'};
const HEART=(s)=>`M0 ${n1(6*s)} C${n1(-9*s)} ${n1(0)} ${n1(-8*s)} ${n1(-8*s)} 0 ${n1(-3.6*s)} C${n1(8*s)} ${n1(-8*s)} ${n1(9*s)} 0 0 ${n1(6*s)}Z`;
const SEQ=['#FF8FC8','#7FD8FF','#FFE07A','#B99CFF','#8FF0C8'];
// 貼紙：(0,0) 是中心，大約 22×22
const STK=[
 {n:'星星',d:(u,i)=>`<path d="${star5(0,0,11)}" fill="url(#${u}sg)"/><path d="M-3 -6 L-1 -3" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity=".8"/>`},
 {n:'愛心',d:(u,i)=>`<path d="${HEART(1.25)}" fill="#FF6F9E"/><ellipse cx="-4.6" cy="-4.4" rx="2.2" ry="1.4" fill="#FFFFFF" opacity=".75" transform="rotate(-35 -4.6 -4.4)"/>`},
 {n:'小花',d:(u,i)=>[0,72,144,216,288].map(a=>`<circle cx="${n1(6*Math.sin(a*Math.PI/180))}" cy="${n1(-6*Math.cos(a*Math.PI/180))}" r="5" fill="#FF9AC6"/>`).join('')+`<circle r="4" fill="#FFE27A"/><circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity=".8"/>`},
 {n:'月亮',d:(u,i)=>`<path d="M4 -10 A10.5 10.5 0 1 0 4 10 A8 8 0 1 1 4 -10Z" fill="#FFE07A"/><circle cx="-5" cy="-3" r="1.4" fill="#FFFFFF" opacity=".8"/>`},
 {n:'蝴蝶',d:(u,i)=>`<ellipse cx="-6" cy="-4" rx="6" ry="7" fill="#B99CFF" transform="rotate(-20 -6 -4)"/><ellipse cx="6" cy="-4" rx="6" ry="7" fill="#B99CFF" transform="rotate(20 6 -4)"/><ellipse cx="-5" cy="6" rx="4.4" ry="4.6" fill="#8FD0FF"/><ellipse cx="5" cy="6" rx="4.4" ry="4.6" fill="#8FD0FF"/><rect x="-1.4" y="-9" width="2.8" height="18" rx="1.4" fill="#7A5AC8"/><circle cx="-6" cy="-5" r="1.6" fill="#FFFFFF" opacity=".8"/>`},
 {n:'亮片',d:(u,i)=>{const c=SEQ[Math.abs(i)%SEQ.length];return `<circle r="7.5" fill="${c}"/><circle r="7.5" fill="url(#${u}sq)"/><circle r="2" fill="#FFFFFF" opacity=".55"/><path d="M-3.4 -3.4 L-1.4 -1.4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><path d="M9 -9 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1Z" fill="#FFFFFF" opacity=".9"/>`}}];
const stkDefs=u=>`<radialGradient id="${u}sg" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#FFF6B0"/><stop offset=".6" stop-color="#FFD84A"/><stop offset="1" stop-color="#F2A83A"/></radialGradient><radialGradient id="${u}sq" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/><stop offset=".45" stop-color="#FFFFFF" stop-opacity=".15"/><stop offset="1" stop-color="#5A3A9A" stop-opacity=".25"/></radialGradient>`;

/* ---------- 手作：每一種的形狀、虛線、要黏的東西（200×200 座標） ---------- */
const scallop=(cx,cy,R,N,b)=>{let d='';for(let i=0;i<=N;i++){const a=(i/N)*Math.PI*2-Math.PI/2;const x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);if(!i){d+=`M${n1(x)} ${n1(y)}`;continue}
 const m=a-Math.PI/N;d+=` Q${n1(cx+(R+b)*Math.cos(m))} ${n1(cy+(R+b)*Math.sin(m))} ${n1(x)} ${n1(y)}`}return d+'Z'};
const rrect=(x,y,w,h,r)=>`M${x+r} ${y} H${x+w-r} Q${x+w} ${y} ${x+w} ${y+r} V${y+h-r} Q${x+w} ${y+h} ${x+w-r} ${y+h} H${x+r} Q${x} ${y+h} ${x} ${y+h-r} V${y+r} Q${x} ${y} ${x+r} ${y}Z`;
const circ=(cx,cy,r)=>`M${cx-r} ${cy} A${r} ${r} 0 1 0 ${cx+r} ${cy} A${r} ${r} 0 1 0 ${cx-r} ${cy}Z`;
const PLATE=scallop(100,94,56,10,22);
const glow=(x,y,r,c='#FFF3B0')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".35"/>`;
// 主角的小照片（相框用）：(0,0) 是照片中心
function photo(u){const b=boy();const hair=b?'#5A3E2A':'#8A5A3A',top=b?'#5FA8E8':'#FF9AC6';
 return `<rect x="-29" y="-34" width="58" height="68" rx="4" fill="#FFFFFF"/><rect x="-25" y="-30" width="50" height="52" rx="2" fill="url(#${u}ph)"/>
 <circle cx="16" cy="-22" r="5" fill="#FFF3B0" opacity=".9"/><path d="M-25 14 Q-10 6 0 12 Q12 4 25 12 V22 H-25Z" fill="#9EDC8E"/>
 ${b?'':`<path d="M-15 -8 Q-18 14 -12 20 H12 Q18 14 15 -8Z" fill="${hair}"/>`}
 <path d="M-13 22 Q-12 10 0 10 Q12 10 13 22Z" fill="${top}"/>
 <circle cx="0" cy="-4" r="11.5" fill="#FFE4D4"/>
 ${b?`<path d="M-12 -6 Q-13 -18 0 -18 Q13 -18 12 -6 Q8 -12 0 -12 Q-7 -13 -12 -6Z" fill="${hair}"/><path d="M-8 -17 L-8 -24 L-4 -20 L0 -26 L4 -20 L8 -24 L8 -17Z" fill="#FFD24D"/><circle cx="0" cy="-21" r="1.4" fill="#FF6F91"/>`
  :`<path d="M-12.5 -3 Q-14 -17 0 -17 Q14 -17 12.5 -3 Q9 -11 2 -12 Q-6 -11 -12.5 -3Z" fill="${hair}"/><path d="M-7 -16 L-5 -21 L-2 -17 L0 -22 L2 -17 L5 -21 L7 -16Z" fill="#FF8FB8"/><circle cx="0" cy="-19" r="1.2" fill="#FFFFFF"/>`}
 <circle cx="-4.2" cy="-3.4" r="1.7" fill="#2A2A3A"/><circle cx="4.2" cy="-3.4" r="1.7" fill="#2A2A3A"/><circle cx="-3.6" cy="-4" r=".6" fill="#FFFFFF"/><circle cx="4.8" cy="-4" r=".6" fill="#FFFFFF"/>
 <ellipse cx="-7" cy="1" rx="2.4" ry="1.4" fill="#FF9AB0" opacity=".7"/><ellipse cx="7" cy="1" rx="2.4" ry="1.4" fill="#FF9AB0" opacity=".7"/><path d="M-2.6 2.6 Q0 5 2.6 2.6" stroke="#C8586A" stroke-width="1.2" fill="none" stroke-linecap="round"/>`}
const CR={
 lantern:{n:'紙燈籠',gift:'',piece:'M58 42 H142 Q172 100 142 158 H58 Q28 100 58 42Z',cut:['M58 42 H142 Q172 100 142 158 H58 Q28 100 58 42'],anim:'sway',org:[100,20],vb:[26,2,148,198],hang:1,
  over:(u,c)=>`<g opacity=".28" stroke="${c[1]}" stroke-width="2" fill="none">${[70,85,100,115,130].map(x=>`<path d="M${x} 46 Q${x+(x-100)*.35} 100 ${x} 154"/>`).join('')}</g><rect x="52" y="34" width="96" height="12" rx="5" fill="#F2C24A"/><rect x="52" y="154" width="96" height="12" rx="5" fill="#F2C24A"/><path d="M58 38 H142" stroke="#FFF3C4" stroke-width="2" stroke-linecap="round" opacity=".8"/>`,
  parts:{handle:{at:[100,22],z:'back',box:[64,4,72,40],d:u=>`<path d="M66 40 Q66 8 100 8 Q134 8 134 40" stroke="#E89A3A" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M70 36 Q72 14 100 13" stroke="#FFD48A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`},
   tassel:{at:[100,176],z:'front',box:[84,160,32,38],d:u=>`<rect x="94" y="164" width="12" height="8" rx="3" fill="#F2C24A"/>${[-5,-2,1,4].map(x=>`<path d="M${100+x} 172 V196" stroke="#FF6F6F" stroke-width="3" stroke-linecap="round"/>`).join('')}<circle cx="100" cy="166" r="3" fill="#FFF3C4"/>`}}},
 flags:{n:'小旗子串',gift:'',piece:'M20 40 H180 V56 H176 L152 132 L128 56 H124 L100 132 L76 56 H72 L48 132 L24 56 H20Z',sheet:[20,40,160,138],
  cut:['M20 56 H24 L48 132 L72 56 H76 L100 132 L124 56 H128 L152 132 L176 56 H180'],anim:'flut',org:[100,40],vb:[0,20,200,116],hang:1,
  over:(u,c)=>`<path d="M20 40 H180 V56 H20Z" fill="${c[1]}" opacity=".35"/>`,
  parts:{rope:{at:[100,40],z:'front',box:[0,22,200,40],d:u=>`<path d="M2 34 Q100 52 198 34" stroke="#C8955E" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M4 32 Q100 49 196 32" stroke="#F2D2A8" stroke-width="1.6" fill="none" stroke-linecap="round"/>${[48,100,152].map(x=>`<rect x="${x-5}" y="${x===100?36:38}" width="10" height="14" rx="3" fill="#FFB86B"/>`).join('')}`}}},
 plate:{n:'紙盤花',gift:'',piece:PLATE,cut:[PLATE.replace(/Z$/,'')],anim:'sway',org:[100,196],vb:[12,8,176,192],
  over:(u,c)=>`<circle cx="100" cy="94" r="42" fill="none" stroke="#FFFFFF" stroke-width="3" opacity=".45"/>`,
  parts:{stem:{at:[100,172],z:'back',box:[64,146,72,54],d:u=>`<path d="M100 146 V198" stroke="#5FB86A" stroke-width="8" stroke-linecap="round"/><path d="M100 178 Q80 160 66 170 Q82 188 100 182Z" fill="#7FD08A"/><path d="M100 170 Q120 152 134 162 Q118 180 100 174Z" fill="#6FC27A"/>`},
   center:{at:[100,94],z:'front',box:[78,72,44,44],d:u=>`<circle cx="100" cy="94" r="20" fill="url(#${u}ce)"/>${[[-7,-6],[6,-8],[9,4],[-3,8],[-10,4],[1,-1]].map(([x,y])=>`<circle cx="${100+x}" cy="${94+y}" r="2" fill="#E8A43A"/>`).join('')}<circle cx="93" cy="87" r="4" fill="#FFFFFF" opacity=".6"/>`}}},
 windmill:{n:'彩色小風車',gift:'cr_windmill',piece:'M40 40 H160 V160 H40Z',sheet:[40,40,120,120],cut:['M40 40 L84 84','M160 40 L116 84','M160 160 L116 116','M40 160 L84 116'],anim:'spin',org:[100,100],vb:[34,34,132,166],stand:1,
  blades:'M100 100 L40 40 Q70 34 100 40Z M100 100 L160 40 Q166 70 160 100Z M100 100 L160 160 Q130 166 100 160Z M100 100 L40 160 Q34 130 40 100Z',
  over:(u,c,done)=>!done?'':`<g fill="#FFFFFF" opacity=".28"><path d="M100 100 L40 40 Q62 44 76 60Z"/><path d="M100 100 L160 40 Q156 62 140 76Z"/><path d="M100 100 L160 160 Q138 156 124 140Z"/><path d="M100 100 L40 160 Q44 138 60 124Z"/></g>`,
  parts:{pin:{at:[100,100],z:'front',box:[88,88,24,112],d:u=>`<rect x="96" y="100" width="8" height="98" rx="4" fill="#C8955E"/><rect x="96" y="100" width="3" height="98" fill="#E8C29A"/><circle cx="100" cy="100" r="9" fill="#FF6F91"/><circle cx="97" cy="97" r="3" fill="#FFFFFF" opacity=".7"/>`}}},
 fishcup:{n:'紙杯小魚',gift:'cr_fishcup',piece:'M38 54 Q38 47 45 48 L150 70 Q156 72 156 78 V122 Q156 128 150 130 L45 152 Q38 153 38 146Z',cut:['M38 54 Q38 47 45 48 L150 70 Q156 72 156 78 V122 Q156 128 150 130 L45 152 Q38 153 38 146 Z'],anim:'swim',org:[100,100],vb:[34,38,162,120],stand:1,
  over:(u,c)=>`<ellipse cx="40" cy="100" rx="9" ry="47" fill="${c[1]}"/><ellipse cx="41" cy="100" rx="5" ry="40" fill="#7A4A6A" opacity=".35"/><circle cx="66" cy="86" r="9" fill="#FFFFFF"/><circle cx="68" cy="86" r="5" fill="#2A2A3A"/><circle cx="70" cy="84" r="1.8" fill="#FFFFFF"/><ellipse cx="62" cy="104" rx="5" ry="3" fill="#FF9AB0" opacity=".6"/>`,
  parts:{tail:{at:[168,100],z:'back',box:[146,66,54,68],d:u=>`<path d="M150 100 L192 70 Q184 100 192 130Z" fill="url(#${u}ta)"/><path d="M160 96 L184 80 M160 104 L184 120" stroke="#FFFFFF" stroke-width="2" opacity=".5" stroke-linecap="round"/>`},
   fin:{at:[100,62],z:'back',box:[78,40,48,34],d:u=>`<path d="M82 68 Q96 40 122 58 L116 72Z" fill="url(#${u}ta)"/>`}}},
 wreath:{n:'小花圈',gift:'cr_wreath',piece:circ(100,100,70)+circ(100,100,36),cut:[circ(100,100,70).replace(/Z$/,''),circ(100,100,36).replace(/Z$/,'')],anim:'sway',org:[100,20],vb:[26,6,148,192],hang:1,
  over:(u,c)=>[0,40,80,120,160,200,240,280,320].map(a=>{const t=a*Math.PI/180;return `<ellipse cx="${n1(100+53*Math.cos(t))}" cy="${n1(100+53*Math.sin(t))}" rx="9" ry="4.4" fill="#7FD08A" opacity=".7" transform="rotate(${a+60} ${n1(100+53*Math.cos(t))} ${n1(100+53*Math.sin(t))})"/>`}).join(''),
  parts:{loop:{at:[100,24],z:'back',box:[84,8,32,30],d:u=>`<path d="M92 34 Q86 10 100 10 Q114 10 108 34" stroke="#FF8FB8" stroke-width="4" fill="none" stroke-linecap="round"/>`},
   bow:{at:[100,168],z:'front',box:[70,150,60,48],d:u=>`<path d="M100 166 L76 154 Q70 168 76 180Z M100 166 L124 154 Q130 168 124 180Z" fill="url(#${u}bw)"/><path d="M98 168 L88 194 M102 168 L112 194" stroke="#FF6F9E" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="166" r="6" fill="#FF6F9E"/><path d="M80 160 L88 162" stroke="#FFFFFF" stroke-width="2" opacity=".6" stroke-linecap="round"/>`}}},
 frame:{n:'手作相框',gift:'cr_frame',piece:rrect(34,28,132,144,16)+rrect(60,54,80,82,8),cut:[rrect(34,28,132,144,16).replace(/Z$/,''),rrect(60,54,80,82,8).replace(/Z$/,'')],anim:'twk',org:[100,100],vb:[32,26,136,148],stand:1,
  over:(u,c)=>`<path d="${rrect(42,36,116,128,12)}" fill="none" stroke="#FFFFFF" stroke-width="2.4" opacity=".5"/><rect x="60" y="54" width="80" height="82" rx="8" fill="#E8F4FF" opacity=".55"/>`,
  parts:{photo:{at:[100,95],z:'mid',box:[68,58,64,74],d:u=>`<g transform="translate(100 95)">${photo(u)}</g>`}}}
};
const ORDERC=['lantern','flags','plate','windmill','fishcup','wreath','frame'];
const GIFTS=['cr_windmill','cr_fishcup','cr_wreath','cr_frame'];
const has22=id=>{try{return !!(window.G22&&G22.has(id))}catch(e){return false}};
const avail=k=>{const c=CR[k];return !!c&&(!c.gift||has22(c.gift))};
const partDefs=(u)=>`<radialGradient id="${u}ce" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFF3A0"/><stop offset="1" stop-color="#FFC23A"/></radialGradient>
 <linearGradient id="${u}ta" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB86B"/><stop offset="1" stop-color="#FF7A6A"/></linearGradient>
 <linearGradient id="${u}bw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB3CF"/><stop offset="1" stop-color="#FF6F9E"/></linearGradient>
 <linearGradient id="${u}ph" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE6FF"/><stop offset="1" stop-color="#EAF7FF"/></linearGradient>`;

/* ---------- 筆畫壓縮：200×200 座標取整數，每點 4 個字（36 進位），簡化（RDP） ---------- */
const enc=v=>{v=Math.max(0,Math.min(1295,Math.round(v)));return (v<36?'0':'')+v.toString(36)};
const dec=s=>{const a=[];for(let i=0;i+3<s.length;i+=4)a.push([parseInt(s.substr(i,2),36),parseInt(s.substr(i+2,2),36)]);return a};
function rdp(pts,eps){if(pts.length<3)return pts.slice();let dm=0,ix=0;const [a,b]=[pts[0],pts[pts.length-1]];const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1;
 for(let i=1;i<pts.length-1;i++){const d=Math.abs(dy*pts[i][0]-dx*pts[i][1]+b[0]*a[1]-b[1]*a[0])/L;if(d>dm){dm=d;ix=i}}
 if(dm>eps){const l=rdp(pts.slice(0,ix+1),eps),r=rdp(pts.slice(ix),eps);return l.slice(0,-1).concat(r)}return [a,b]}
const MAXPT=520;
function packStrokes(strokes){let eps=1.1,out;for(let k=0;k<8;k++){out=strokes.map(s=>{const p=BRUSH[s.b]&&BRUSH[s.b].dot?s.p:rdp(s.p,eps);return [s.c,s.b,p.map(q=>enc(q[0])+enc(q[1])).join('')]});
  const tot=out.reduce((t,s)=>t+s[2].length/4,0);if(tot<=MAXPT)break;eps*=1.6}
 // 還是太多：從最舊的筆畫開始丟（很少發生）
 let tot=out.reduce((t,s)=>t+s[2].length/4,0);while(tot>MAXPT*1.4&&out.length>1){tot-=out[0][2].length/4;out.shift()}return out}
const strokeSVG=(s)=>{const c=INK[s[0]]||INK[0],B=BRUSH[s[1]]||BRUSH[0],p=typeof s[2]==='string'?dec(s[2]):s[2];if(!p.length)return '';
 if(B.dot)return p.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="${B.dot}" fill="${c}"/>`).join('');
 if(p.length===1)return `<circle cx="${p[0][0]}" cy="${p[0][1]}" r="${B.w/2}" fill="${c}"/>`;
 return `<path d="M${p.map(q=>q[0]+' '+q[1]).join(' L')}" stroke="${c}" stroke-width="${B.w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`};

/* ---------- 畫一件作品（完整 svg；opt.parts：已經黏上去的；opt.cls：外層 class） ---------- */
function workInner(w,opt={}){const c=CR[w.k];if(!c)return '';const u=opt.u||uid('cw');const pc=PAPER[w.c]||PAPER[0];
 const glued=opt.parts||Object.keys(c.parts);const P=z=>Object.entries(c.parts).filter(([id,p])=>p.z===z&&glued.includes(id)).map(([id,p])=>p.d(u)).join('');
 const shape=c.blades&&glued.includes('pin')?c.blades:c.piece;
 const body=`<path d="${c.piece}" fill="url(#${u}pp)" fill-rule="evenodd"/>${(w.s||[]).map(strokeSVG).join('')}${c.over(u,pc,glued.length>=Object.keys(c.parts).length)}`;
 const stk=(w.t||[]).map((t,i)=>{const S0=STK[t[0]];return S0?`<g transform="translate(${t[1]} ${t[2]})${t[3]?` rotate(${t[3]})`:''}">${S0.d(u,t[1]+t[2])}</g>`:''}).join('');
 const hl=`<path d="${c.piece}" fill="url(#${u}hl)" fill-rule="evenodd"/>`;
 const inner=`<g clip-path="url(#${u}cp)">${body}${stk}${hl}</g>`;
 const spinG=c.anim==='spin'&&glued.includes('pin');
 return `<defs><linearGradient id="${u}pp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pc[0]}"/><stop offset="1" stop-color="${pc[1]}"/></linearGradient>
 <linearGradient id="${u}hl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".35"/><stop offset=".45" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
 <clipPath id="${u}cp"><path d="${shape}" clip-rule="evenodd" fill-rule="evenodd"/></clipPath>${partDefs(u)}${stkDefs(u)}</defs>
 <g class="cr23a cr23a-${c.anim}" style="transform-origin:${c.org[0]-(opt.vx||0)}px ${c.org[1]-(opt.vy||0)}px">${P('back')}${spinG?`<g class="cr23spin" style="transform-origin:${100-(opt.vx||0)}px ${100-(opt.vy||0)}px">${inner}</g>`:inner}${P('mid')}${P('front')}</g>`}
const workSVG=(w,opt={})=>`<svg viewBox="0 0 200 200" class="cr23w${opt.cls?' '+opt.cls:''}" aria-hidden="true">${workInner(w,opt)}</svg>`;
// 示範作品（選單縮圖、禮物圖）：筆畫用點列寫，載入時壓縮成存檔格式
const SK=(c,b,pts)=>[c,b,pts.map(q=>enc(q[0])+enc(q[1])).join('')];
const wave=(x0,x1,y,a,st=10)=>{const o=[];for(let x=x0;x<=x1;x+=st)o.push([x,Math.round(y+a*Math.sin((x-x0)/st*1.1))]);return o};
const SAMPLE={lantern:{k:'lantern',c:1,s:[SK(2,1,wave(44,156,78,5)),SK(2,1,wave(44,156,122,5)),SK(7,2,[[70,100],[100,100],[130,100]])],t:[[0,100,100]]},
 flags:{k:'flags',c:5,s:[SK(2,2,[[48,80],[100,80],[152,80],[48,100],[100,100],[152,100]])],t:[[1,48,72],[0,100,72],[2,152,72]]},
 plate:{k:'plate',c:0,s:[SK(6,1,wave(52,148,60,4)),SK(7,2,[[60,120],[80,134],[120,134],[140,120]])],t:[]},
 windmill:{k:'windmill',c:3,s:[SK(4,1,[[50,60],[100,60],[150,60]]),SK(0,1,[[60,140],[100,140],[140,140]]),SK(3,1,[[60,50],[60,150]]),SK(6,1,[[140,50],[140,150]])],t:[]},
 fishcup:{k:'fishcup',c:4,s:[SK(7,0,[[90,80],[100,90],[90,100],[100,110],[90,120]]),SK(7,0,[[115,84],[125,94],[115,104],[125,114]])],t:[[5,136,96],[5,108,132]]},
 wreath:{k:'wreath',c:4,s:[],t:[[2,40,100],[2,160,100],[1,100,40],[2,62,146],[2,138,146],[5,62,54],[5,138,54]]},
 frame:{k:'frame',c:6,s:[SK(7,2,[[44,40],[44,160],[156,40],[156,160]])],t:[[0,48,44],[1,152,156],[2,152,44],[3,48,156]]}};

/* ---------- 禮物圖（G22.ART／SIL，64×64，跟 m9zd 同一種：地上影子 cy=60.5、旁邊的閃光放在 g22fx） ---------- */
const GIFTK={cr_windmill:'windmill',cr_fishcup:'fishcup',cr_wreath:'wreath',cr_frame:'frame'};
function giftInner(id){const k=GIFTK[id];const w=SAMPLE[k];const u=uid('cg');
 return `<ellipse cx="32" cy="60.5" rx="20" ry="2.6" fill="#3A2A5A" opacity=".16"/><g transform="translate(3.2 1.6) scale(.29)">${workInner(w,{u})}</g>
 <g class="g22fx"><path d="M54 8 l1.4 3.2 3.2 1.4 -3.2 1.4 -1.4 3.2 -1.4 -3.2 -3.2 -1.4 3.2 -1.4Z" fill="#FFE27A"/><circle cx="9" cy="14" r="2" fill="#FFB3D1"/></g>`}
const giftSVG=id=>`<svg viewBox="0 0 64 64" aria-hidden="true">${giftInner(id)}</svg>`;
function stripFx(s){let i;while((i=s.indexOf('<g class="g22fx">'))>=0){let d=0,j=-1;const re=/<g[\s>]|<\/g>/g;re.lastIndex=i;let m;
  while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0){j=m.index+4;break}}else d++}if(j<0){s=s.slice(0,i);break}s=s.slice(0,i)+s.slice(j)}return s}
const giftSil=(id,c)=>{let s=giftInner(id).replace(/<ellipse cx="32" cy="60\.5"[^>]*\/>/,'');s=stripFx(s);
 s=s.replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="'+(c||'#8C7CE6')+'"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'');return `<svg viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`};
try{if(window.G22){G22.ART=G22.ART||{};G22.SIL=G22.SIL||{};
 Object.keys(GIFTK).forEach(id=>{Object.defineProperty(G22.ART,id,{enumerable:true,configurable:true,get:()=>giftSVG(id)});Object.defineProperty(G22.SIL,id,{enumerable:true,configurable:true,get:()=>giftSil(id)})});
 G22.NEEDCH23=Object.assign(G22.NEEDCH23||{},{craft:0})}}catch(e){console.log('h23 g22art',e)}

/* ---------- 存檔：V2.craft23={w:[作品],show:[作品 id]}（每個小朋友一份） ---------- */
const MAXW=12,MAXSHOW=4;
function st(){let o=V2.craft23;if(!o||typeof o!=='object'||Array.isArray(o))o=V2.craft23={w:[],show:[]};
 if(!Array.isArray(o.w))o.w=[];if(!Array.isArray(o.show))o.show=[];
 // 壞掉、認不得的作品不顯示（不刪）
 return o}
const okW=w=>w&&typeof w==='object'&&CR[w.k]&&typeof w.i==='string';
const works=()=>st().w.filter(okW);
const shown=()=>{const o=st(),ids=works().map(w=>w.i);return o.show.filter(i=>ids.includes(i)).slice(0,MAXSHOW).map(i=>works().find(w=>w.i===i))};
function setShow(id,on){const o=st();o.show=o.show.filter(i=>i!==id&&works().some(w=>w.i===i));let bumped=null;
 if(on){o.show.push(id);while(o.show.length>MAXSHOW)bumped=o.show.shift()}sv2();return bumped}
const nameOf=w=>(CR[w.k]||{}).n||'作品';

/* ---------- 遊樂園大門：卡片（我的家） ---------- */
const gate=()=>'';  // 手作小工坊是「我的家」的系統功能：不鎖章節、App 不鎖
window.__CR23={gate,ver:'2026-11-28'};
const ICON23=()=>{const u=uid('ci');return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE0B0"/><stop offset="1" stop-color="#E8B070"/></linearGradient>
 <linearGradient id="${u}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF9A9A"/><stop offset="1" stop-color="#F0645E"/></linearGradient></defs>
 <ellipse cx="32" cy="59" rx="26" ry="3" fill="#3A2A5A" opacity=".16"/><rect x="6" y="40" width="52" height="16" rx="5" fill="url(#${u}t)"/><rect x="6" y="40" width="52" height="4" rx="2" fill="#FFF0D6" opacity=".8"/>
 <g transform="translate(14 8) scale(.16)"><path d="M58 42 H142 Q172 100 142 158 H58 Q28 100 58 42Z" fill="url(#${u}p)"/><rect x="52" y="34" width="96" height="12" rx="5" fill="#F2C24A"/><rect x="52" y="154" width="96" height="12" rx="5" fill="#F2C24A"/><path d="M66 40 Q66 8 100 8 Q134 8 134 40" stroke="#E89A3A" stroke-width="7" fill="none"/><path d="${star5(100,100,22)}" fill="#FFE27A"/></g>
 <g transform="rotate(-24 44 30)"><circle cx="38" cy="38" r="5" fill="none" stroke="#7FB8FF" stroke-width="3"/><circle cx="50" cy="38" r="5" fill="none" stroke="#7FB8FF" stroke-width="3"/><path d="M41 34 L56 16 M47 34 L40 16" stroke="#B8C0D6" stroke-width="3" stroke-linecap="round"/></g>
 <path d="M48 52 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2Z" fill="#FFF07A"/><circle cx="14" cy="46" r="3" fill="#FF8FC8"/><circle cx="22" cy="49" r="2.4" fill="#7FD8FF"/></svg>`};
try{ICONART['i:craft23']=ICON23()}catch(e){}
try{UXPD.craft23='剪剪貼貼做手作'}catch(e){}
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{craft23:'home'});X.gemDay=Object.assign(X.gemDay||{},{craft23:'cr23Day'});
 X.newest=['craft23'].concat((X.newest||[]).filter(k=>k!=='craft23'))}catch(e){}
function mkCard(g){if(!g||g.querySelector('[data-k="craft23"]'))return;
 const after=g.querySelector('[data-k="pethouse"]')||g.querySelector('[data-k="room"]');
 const b=document.createElement('button');b.className='pcard';b.dataset.k='craft23';b.style.setProperty('--dl','.5s');
 b.innerHTML=`<span class="pic">${art('i:craft23')}</span><b>手作小工坊</b><span>剪剪貼貼做手作</span>`;
 b.dataset.gz='home';try{const gz=window.__gate;if(gz&&document.querySelector('#screen>.park.gzon')&&gz.cur!=='home')b.classList.add('gzoff')}catch(e){}
 g.insertBefore(b,after?after.nextSibling:null)}
// 大門每次排卡片前會讀 __gateExt：在那時候先把卡片放進去（跟地球儀同一招）
try{const d=Object.getOwnPropertyDescriptor(window,'__gateExt');const fix=()=>{try{if(S.screen==='park')mkCard(document.querySelector('#screen>.park>.pgrid'))}catch(e){}};
 if(d&&d.get){Object.defineProperty(window,'__gateExt',{configurable:true,get(){fix();return d.get.call(window)},set(v){d.set&&d.set.call(window,v)}})}
 else{let X=window.__gateExt;Object.defineProperty(window,'__gateExt',{configurable:true,get(){fix();return X},set(v){X=v}})}}catch(e){console.log('cr23 ext',e)}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{mkCard(document.querySelector('#screen>.park>.pgrid')||document.querySelector('.pgrid'));try{window.__parklock&&__parklock.fixCards()}catch(_){}}catch(e){console.log('park craft23',e)}return r}}
try{PARKS.push('craft23')}catch(e){}
let pickT=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="craft23"]');if(!c)return;
 e.stopImmediatePropagation();e.preventDefault();V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen.craft23=(V2.parkSeen.craft23||0)+1;sv2();snd('pop');S.from='park';try{hush()}catch(_){}go('craft23')};
 // 第一次點先念名字（亮起來＋小手），再點一下才進去；玩過兩次以後直接進去
 if((V2.parkSeen.craft23||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pickT<8000))return enter();
 const g=c.parentNode;g.querySelectorAll('.pcard.uxsel').forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pickT=Date.now();snd('pop');say23('name')}catch(_){}},true);

/* ---------- 手作小工坊（craft23） ---------- */
const SPKI=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.6L12.5 5v14l-4.9-4.5H4z" fill="#5A3E9A"/><path d="M15.5 8.6a4.6 4.6 0 0 1 0 6.8M18 6.2a8 8 0 0 1 0 11.6" stroke="#5A3E9A" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`;
const SCI=`<g><circle cx="-6" cy="8" r="5.4" fill="none" stroke="#FF6F91" stroke-width="3.4"/><circle cx="6" cy="8" r="5.4" fill="none" stroke="#FF6F91" stroke-width="3.4"/><path d="M-3 4 L9 -14 M3 4 L-9 -14" stroke="#B8C0D6" stroke-width="3.6" stroke-linecap="round"/><path d="M-2.2 2.6 L7.6 -12" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity=".8"/><circle cx="0" cy="2" r="1.8" fill="#8A8FA8"/></g>`;
const HANDI=`<g><path d="M0 0 C-2 -4 -1 -10 3 -10 C5 -10 6 -8 6 -6 L6 -16 C6 -20 12 -20 12 -16 L12 -8 C14 -10 18 -9 18 -6 C20 -8 24 -7 24 -3 L24 6 C24 14 18 20 10 20 C4 20 0 14 0 8Z" fill="#FFE4D4"/><path d="M6 -6 V-1 M12 -8 V-1 M18 -6 V-1" stroke="#E8B8A0" stroke-width="1.4" stroke-linecap="round"/><ellipse cx="9" cy="-15" rx="1.6" ry="2.2" fill="#FFFFFF" opacity=".8"/></g>`;
const STEPN=['選色紙','剪下來','塗顏色','貼貼紙','黏起來'];
let tok=0,CUR=null;
SCREENS.craft23=function(){const my=++tok;const live=()=>my===tok&&S.screen==='craft23';const calm=RM();
 const fromRoom=S.from==='room';
 screen.innerHTML=`<div class="cr23${calm?' calm':''}"><div class="phead"><button class="btn2 small p88back" id="cr23back" type="button">${fromRoom?'回房間':'回遊樂園'}</button><h2 class="gtitle">手作小工坊</h2><span class="phsp"></span></div>
  <div class="cr23top" id="cr23top" hidden><div class="cr23dots" id="cr23dots">${STEPN.map((t,i)=>`<i data-i="${i}"></i>`).join('')}</div><b class="cr23stn" id="cr23stn"></b></div>
  <div class="cr23tipw" id="cr23tipw" hidden><p class="cr23tip" id="cr23tip"></p><button class="spk22 cr23spk" id="cr23spk" type="button" aria-label="再聽一次">${SPKI}</button></div>
  <div class="cr23main" id="cr23main" hidden><div class="cr23canv" id="cr23canv"></div><div class="cr23tools" id="cr23tools"></div></div>
  <div class="cr23menu" id="cr23menu"><div class="cr23mc">
   <div class="cr23mh"><span class="cr23mi">${art('i:craft23')}</span><div><b>手作小工坊</b><small>今天要做什麼呢？</small></div></div>
   <div class="cr23opts" id="cr23opts"></div>
   <div class="cr23row2"><button class="btn2 cr23gal" id="cr23gal" type="button">我的作品 <small id="cr23gn"></small></button><button class="btn cr23go" id="cr23go" type="button">開始做！</button></div>
  </div></div></div>`;
 tipEl=document.getElementById('cr23tip');
 const $i=id=>document.getElementById(id);
 const back=()=>{tok++;CUR=null;try{hush()}catch(e){}go(fromRoom?'room':'park')};$i('cr23back').onclick=back;
 $i('cr23spk').onclick=e=>{e.stopPropagation();const k=CUR&&CUR.tipK;if(k)say23(k)};
 let sel=null;try{sel=V2.cr23last&&avail(V2.cr23last)?V2.cr23last:null}catch(e){}
 const list=ORDERC.filter(avail);if(!sel)sel=list[0];
 // 剛拿到的禮物：標「新」、先選它；看過就清掉 fresh（跟 2.2 物品一樣）
 let fr={};try{fr=(window.G22&&G22.st().fresh)||{}}catch(e){}
 const newK=list.filter(k=>CR[k].gift&&fr[CR[k].gift]);if(newK.length)sel=newK[newK.length-1];
 const opts=$i('cr23opts');
 opts.innerHTML=list.map(k=>`<button class="cr23opt${k===sel?' sel':''}" type="button" data-k="${k}"><span class="cr23oi">${workSVG(SAMPLE[k])}</span><b>${CR[k].n}</b>${CR[k].gift?`<small class="cr23new${newK.includes(k)?' fresh':''}">${newK.includes(k)?'新！':'禮物'}</small>`:''}</button>`).join('');
 if(newK.length){try{newK.forEach(k=>{delete G22.st().fresh[CR[k].gift]});sv2()}catch(e){}}
 opts.querySelectorAll('.cr23opt').forEach(b=>b.onclick=()=>{sel=b.dataset.k;opts.querySelectorAll('.cr23opt').forEach(x=>x.classList.toggle('sel',x===b));snd('pop');say23('n_'+sel)});
 const gn=()=>{const n=works().length;$i('cr23gn').textContent=n?`${n} 件`:''};gn();
 $i('cr23gal').onclick=()=>{snd('pop');gallery(live)};
 $i('cr23go').onclick=()=>{snd('pop');try{V2.cr23last=sel;sv2()}catch(e){}start(sel)};
 say23('hello');
 /* --- 做一件 --- */
 function start(k){const c=CR[k];CUR={k,c,step:0,w:{k,c:0,s:[],t:[]},glued:[],tipK:''};
  $i('cr23menu').style.display='none';['cr23top','cr23tipw','cr23main'].forEach(id=>$i(id).hidden=false);fit();step(0)}
 function setTip(k){CUR.tipK=k;tip(k);say23(k)}
 function dots(i){document.querySelectorAll('#cr23dots i').forEach((d,j)=>{d.classList.toggle('on',j<i);d.classList.toggle('now',j===i)});$i('cr23stn').textContent=i<5?`${i+1}. ${STEPN[i]}`:'完成！'}
 function step(i){if(!live())return;CUR.step=i;dots(i);const tools=$i('cr23tools');tools.innerHTML='';tools.className='cr23tools cr23t'+i;
  [stColor,stCut,stPaint,stStick,stGlue,stDone][i]();fit()}
 const canv=()=>$i('cr23canv');
 function svgPt(svg,e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=svg.getScreenCTM();if(!m)return {x:0,y:0};const q=p.matrixTransform(m.inverse());return {x:q.x,y:q.y}}
 const pieceFill=u=>{const pc=PAPER[CUR.w.c]||PAPER[0];return `<defs><linearGradient id="${u}pp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pc[0]}"/><stop offset="1" stop-color="${pc[1]}"/></linearGradient>
  <linearGradient id="${u}hl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".35"/><stop offset=".45" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
  <clipPath id="${u}cp"><path d="${CUR.c.piece}" clip-rule="evenodd"/></clipPath>${stkDefs(u)}${partDefs(u)}</defs>`};
 const TABLE=`<rect x="-40" y="-40" width="280" height="280" fill="url(#cr23tb)" opacity="0"/>`;
 // 1. 選色紙
 function stColor(){const tools=$i('cr23tools');const u=uid('cc');
  const draw=()=>{const c=CUR.c,sh=c.sheet||[22,22,156,156];canv().innerHTML=`<svg viewBox="0 0 200 200" id="cr23svg">${pieceFill(u)}<rect x="${sh[0]+3}" y="${sh[1]+5}" width="${sh[2]}" height="${sh[3]}" rx="6" fill="#3A2A5A" opacity=".14"/><rect x="${sh[0]}" y="${sh[1]}" width="${sh[2]}" height="${sh[3]}" rx="6" fill="url(#${u}pp)"/><rect x="${sh[0]}" y="${sh[1]}" width="${sh[2]}" height="${sh[3]}" rx="6" fill="url(#${u}hl)"/>
   <path d="${c.piece}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="5 6" opacity=".7" fill-rule="evenodd"/></svg>`};draw();
  tools.innerHTML=`<div class="cr23lab">色紙</div><div class="cr23sw">${PAPER.map((p,i)=>`<button type="button" class="cr23pap${i===CUR.w.c?' sel':''}" data-i="${i}" aria-label="${PAPERN[i]}" style="--a:${p[0]};--b:${p[1]}"></button>`).join('')}</div><button class="btn cr23next" id="cr23next" type="button">下一步</button>`;
  tools.querySelectorAll('.cr23pap').forEach(b=>b.onclick=()=>{CUR.w.c=+b.dataset.i;tools.querySelectorAll('.cr23pap').forEach(x=>x.classList.toggle('sel',x===b));snd('pop');draw()});
  $i('cr23next').onclick=()=>{snd('pop');step(1)};setTip('s_color')}
 // 2. 剪：手指沿虛線描
 function stCut(){const c=CUR.c,u=uid('ct'),sh=c.sheet||[22,22,156,156];const tools=$i('cr23tools');
  // 取樣：每條虛線每 4 單位一點
  const tmp=document.createElementNS(NS,'svg');tmp.setAttribute('style','position:absolute;width:0;height:0;overflow:hidden');document.body.appendChild(tmp);
  const segs=c.cut.map(d=>{const p=document.createElementNS(NS,'path');p.setAttribute('d',d);tmp.appendChild(p);let L=0;try{L=p.getTotalLength()}catch(e){}const N=Math.max(2,Math.ceil(L/4)),o=[];for(let i=0;i<=N;i++){try{const q=p.getPointAtLength(L*i/N);o.push([q.x,q.y])}catch(e){}}return o});tmp.remove();
  let si=0,idx=0,miss=0,down=false,moved=0,hintOn=false;
  const scrap=`M${sh[0]} ${sh[1]} h${sh[2]} v${sh[3]} h${-sh[2]}Z ${c.piece}`;
  canv().innerHTML=`<svg viewBox="0 0 200 200" id="cr23svg" class="cr23cut">${pieceFill(u)}
   <g id="cr23sheet"><rect x="${sh[0]+3}" y="${sh[1]+5}" width="${sh[2]}" height="${sh[3]}" rx="6" fill="#3A2A5A" opacity=".14"/><path d="${c.sheet&&CUR.k!=='flags'?c.piece:scrap}" fill="url(#${u}pp)" fill-rule="evenodd" id="cr23scrap"/></g>
   <path d="${c.piece}" fill="url(#${u}pp)" fill-rule="evenodd"/><path d="${c.piece}" fill="url(#${u}hl)" fill-rule="evenodd"/>
   ${segs.map((p,i)=>`<path class="cr23dash" d="${c.cut[i]}" fill="none" stroke="#6A4AB0" stroke-width="2.4" stroke-dasharray="6 5" stroke-linecap="round"/>`).join('')}
   <path id="cr23trace" d="" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
   <circle id="cr23front" r="12" fill="#FFF3A0" class="cr23pulse"/><g id="cr23sci">${SCI}</g><g id="cr23hand" opacity="0">${HANDI}</g></svg>`;
  const svg=$i('cr23svg'),trace=$i('cr23trace'),front=$i('cr23front'),sci=$i('cr23sci'),hand=$i('cr23hand');
  const done=[];
  const redraw=()=>{const p=segs[si];const q=p[Math.min(idx,p.length-1)];front.setAttribute('cx',q[0]);front.setAttribute('cy',q[1]);
   sci.setAttribute('transform',`translate(${n1(q[0])} ${n1(q[1])})`);hand.setAttribute('transform',`translate(${n1(q[0]+4)} ${n1(q[1]+6)})`);
   const all=done.concat([p.slice(0,idx+1)]);trace.setAttribute('d',all.filter(a=>a.length>1).map(a=>'M'+a.map(v=>n1(v[0])+' '+n1(v[1])).join(' L')).join(' '))};redraw();
  const R=26;
  const adv=pt=>{const p=segs[si];let got=false;for(let j=idx+1;j<Math.min(p.length,idx+14);j++){if(Math.hypot(p[j][0]-pt.x,p[j][1]-pt.y)<R){idx=j;got=true}}if(got){moved++;if(moved%6===0)snd('crunch')}return got};
  const finishSeg=()=>{done.push(segs[si].slice());snd('pop');if(si<segs.length-1){si++;idx=0;redraw();setTip('cut_more');return}
   // 全部剪好：旁邊的紙掉下去
   front.remove();sci.remove();hand.remove();svg.querySelectorAll('.cr23dash').forEach(x=>x.remove());const sc=$i('cr23scrap');if(sc&&(!c.sheet||CUR.k==='flags'))sc.classList.add('cr23fall');
   if(CUR.k==='windmill')trace.setAttribute('stroke','#FFFFFF');
   snd('gem');setTip('cut_done');setTimeout(()=>{if(live()&&CUR&&CUR.step===1)step(2)},calm?700:1500)};
  svg.onpointerdown=e=>{if(!segs[si])return;e.preventDefault();try{svg.setPointerCapture(e.pointerId)}catch(_){}down=true;const pt=svgPt(svg,e);const q=segs[si][idx];
   if(Math.hypot(q[0]-pt.x,q[1]-pt.y)>R*1.6){down=false;miss++;snd('hop');if(miss>=2&&!hintOn){hintOn=true;hand.setAttribute('opacity','1');hand.classList.add('cr23hint');setTip('cut_hint')}return}
   hand.setAttribute('opacity','0');adv(pt);redraw()};
  svg.onpointermove=e=>{if(!down)return;e.preventDefault();const pt=svgPt(svg,e);if(adv(pt)){redraw();if(idx>=segs[si].length-1){down=false;finishSeg()}}};
  svg.onpointerup=svg.onpointercancel=()=>{down=false};
  tools.innerHTML=`<div class="cr23big">${SCI.replace('<g>','<svg viewBox="-16 -18 32 34" aria-hidden="true"><g>').replace(/<\/g>$/,'</g></svg>')}</div><p class="cr23note">沿著虛線，用手指畫過去</p>`;
  setTip('s_cut')}
 // 3. 塗顏色、畫圖案
 function stPaint(){const c=CUR.c,u=uid('cp');const tools=$i('cr23tools');let ci=CUR.ci!=null?CUR.ci:0,bi=CUR.bi!=null?CUR.bi:1;
  canv().innerHTML=`<svg viewBox="0 0 200 200" id="cr23svg" class="cr23paint">${pieceFill(u)}<path d="${c.piece}" fill="#3A2A5A" opacity=".14" transform="translate(3 5)" fill-rule="evenodd"/>
   <g clip-path="url(#${u}cp)"><path d="${c.piece}" fill="url(#${u}pp)" fill-rule="evenodd"/><g id="cr23ink">${CUR.w.s.map(strokeSVG).join('')}</g><g id="cr23live"></g>${c.over(u,PAPER[CUR.w.c])}<path d="${c.piece}" fill="url(#${u}hl)" fill-rule="evenodd"/></g></svg>`;
  const svg=$i('cr23svg'),ink=$i('cr23ink'),lv=$i('cr23live');let cur=null;
  const liveSVG=()=>{lv.innerHTML=cur?strokeSVG([cur.c,cur.b,cur.p]):''};
  svg.onpointerdown=e=>{e.preventDefault();try{svg.setPointerCapture(e.pointerId)}catch(_){}const q=svgPt(svg,e);cur={c:ci,b:bi,p:[[Math.round(q.x),Math.round(q.y)]]};liveSVG()};
  svg.onpointermove=e=>{if(!cur)return;e.preventDefault();const q=svgPt(svg,e),x=Math.round(q.x),y=Math.round(q.y),l=cur.p[cur.p.length-1];const B=BRUSH[cur.b];
   if(Math.hypot(x-l[0],y-l[1])>=(B.dot?B.dot*2.6:1.5)){cur.p.push([x,y]);liveSVG()}};
  const end=()=>{if(!cur)return;const s=cur;cur=null;lv.innerHTML='';const B=BRUSH[s.b];s.p=s.p.filter(q=>q[0]>=-10&&q[0]<=210&&q[1]>=-10&&q[1]<=210).map(q=>[Math.max(0,Math.min(200,q[0])),Math.max(0,Math.min(200,q[1]))]);
   if(!s.p.length)return;if(!B.dot)s.p=rdp(s.p,.9);const packed=[s.c,s.b,s.p.map(q=>enc(q[0])+enc(q[1])).join('')];CUR.w.s.push(packed);ink.insertAdjacentHTML('beforeend',strokeSVG(packed));
   if(CUR.w.s.length>60){CUR.w.s=packStrokes(CUR.w.s.map(x=>({c:x[0],b:x[1],p:dec(x[2])})))}
   if(CUR.w.s.length===4&&!CUR.saidP){CUR.saidP=1;setTip('paint_ok')}};
  svg.onpointerup=svg.onpointercancel=end;
  tools.innerHTML=`<div class="cr23lab">顏色</div><div class="cr23sw">${INK.map((c0,i)=>`<button type="button" class="cr23ink${i===ci?' sel':''}" data-i="${i}" style="--a:${c0}" aria-label="顏色${i+1}"></button>`).join('')}</div>
   <div class="cr23lab">筆</div><div class="cr23br">${BRUSH.map((b,i)=>`<button type="button" class="cr23brb${i===bi?' sel':''}" data-i="${i}"><svg viewBox="0 0 40 24" aria-hidden="true">${b.dot?'<circle cx="10" cy="12" r="4" fill="currentColor"/><circle cx="20" cy="12" r="4" fill="currentColor"/><circle cx="30" cy="12" r="4" fill="currentColor"/>':`<path d="M6 16 Q14 4 20 12 T34 8" stroke="currentColor" stroke-width="${b.w*.55}" fill="none" stroke-linecap="round"/>`}</svg><b>${b.n}</b></button>`).join('')}</div>
   <div class="cr23row"><button class="btn2 cr23undo" id="cr23undo" type="button">擦掉一筆</button><button class="btn cr23next" id="cr23next" type="button">下一步</button></div>`;
  const setInk=()=>{tools.querySelectorAll('.cr23brb').forEach(b=>b.style.color=INK[ci]==='#FFFFFF'?'#C8B8E8':INK[ci])};setInk();
  tools.querySelectorAll('.cr23ink').forEach(b=>b.onclick=()=>{ci=CUR.ci=+b.dataset.i;tools.querySelectorAll('.cr23ink').forEach(x=>x.classList.toggle('sel',x===b));setInk();snd('pop')});
  tools.querySelectorAll('.cr23brb').forEach(b=>b.onclick=()=>{bi=CUR.bi=+b.dataset.i;tools.querySelectorAll('.cr23brb').forEach(x=>x.classList.toggle('sel',x===b));snd('pop')});
  $i('cr23undo').onclick=()=>{if(!CUR.w.s.length)return;CUR.w.s.pop();ink.innerHTML=CUR.w.s.map(strokeSVG).join('');snd('pop')};
  $i('cr23next').onclick=()=>{snd('pop');step(3)};setTip('s_paint')}
 // 4. 貼貼紙、亮片
 function stStick(){const c=CUR.c,u=uid('cs');const tools=$i('cr23tools');let si=CUR.si!=null?CUR.si:0;
  const draw=()=>{canv().innerHTML=`<svg viewBox="0 0 200 200" id="cr23svg" class="cr23stick">${pieceFill(u)}<path d="${c.piece}" fill="#3A2A5A" opacity=".14" transform="translate(3 5)" fill-rule="evenodd"/>
   <g clip-path="url(#${u}cp)"><path d="${c.piece}" fill="url(#${u}pp)" fill-rule="evenodd" id="cr23pc"/>${CUR.w.s.map(strokeSVG).join('')}${c.over(u,PAPER[CUR.w.c])}<g id="cr23stk">${CUR.w.t.map(t=>`<g transform="translate(${t[1]} ${t[2]})">${STK[t[0]].d(u,t[1]+t[2])}</g>`).join('')}</g><path d="${c.piece}" fill="url(#${u}hl)" fill-rule="evenodd"/></g></svg>`;
   const svg=$i('cr23svg');svg.onpointerdown=e=>{e.preventDefault();const q=svgPt(svg,e);const x=Math.round(q.x),y=Math.round(q.y);let inside=true;try{const pc=$i('cr23pc');const P=svg.createSVGPoint();P.x=x;P.y=y;if(pc&&pc.isPointInFill)inside=pc.isPointInFill(P)}catch(_){}
    if(!inside){snd('hop');return}if(CUR.w.t.length>=14){snd('hint');return}CUR.w.t.push([si,x,y]);snd('pop');draw();if(CUR.w.t.length===3&&!CUR.saidS){CUR.saidS=1;setTip('stick_ok')}try{const g=$i('cr23stk');const last=g&&g.lastElementChild;if(last&&!calm)last.classList.add('cr23pop')}catch(_){}}};draw();
  tools.innerHTML=`<div class="cr23lab">貼紙和亮片</div><div class="cr23stks">${STK.map((s,i)=>{const v=uid('sb');return `<button type="button" class="cr23stb${i===si?' sel':''}" data-i="${i}" aria-label="${s.n}"><svg viewBox="-14 -14 28 28" aria-hidden="true"><defs>${stkDefs(v)}</defs>${s.d(v,i)}</svg><b>${s.n}</b></button>`}).join('')}</div>
   <div class="cr23row"><button class="btn2 cr23undo" id="cr23undo" type="button">拿掉一個</button><button class="btn cr23next" id="cr23next" type="button">下一步</button></div>`;
  tools.querySelectorAll('.cr23stb').forEach(b=>b.onclick=()=>{si=CUR.si=+b.dataset.i;tools.querySelectorAll('.cr23stb').forEach(x=>x.classList.toggle('sel',x===b));snd('pop')});
  $i('cr23undo').onclick=()=>{if(!CUR.w.t.length)return;CUR.w.t.pop();draw();snd('pop')};
  $i('cr23next').onclick=()=>{snd('pop');step(4)};setTip('s_stick')}
 // 5. 黏起來：把東西拖到發亮的地方
 function stGlue(){const c=CUR.c;const tools=$i('cr23tools');const ids=Object.keys(c.parts);const miss={};
  const draw=()=>{const left=ids.filter(id=>!CUR.glued.includes(id));canv().innerHTML=`<svg viewBox="0 0 200 200" id="cr23svg" class="cr23glue">${workInner(CUR.w,{parts:CUR.glued})}
   ${left.map(id=>{const a=c.parts[id].at;return `<g class="cr23tg" data-id="${id}"><circle cx="${a[0]}" cy="${a[1]}" r="20" fill="#FFF3A0" opacity=".55" class="cr23pulse"/><circle cx="${a[0]}" cy="${a[1]}" r="20" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-dasharray="4 4"/></g>`}).join('')}</svg>`;
   tools.innerHTML=`<div class="cr23lab">拖到發亮的地方</div><div class="cr23tray">${left.map(id=>{const p=c.parts[id],b=p.box,v=uid('pt');return `<button type="button" class="cr23part" data-id="${id}" aria-label="拖到發亮的地方"><svg viewBox="${b[0]-4} ${b[1]-4} ${b[2]+8} ${b[3]+8}" aria-hidden="true"><defs>${partDefs(v)}</defs>${p.d(v)}</svg></button>`}).join('')}</div>`;
   tools.querySelectorAll('.cr23part').forEach(bindDrag);fit()};
  function bindDrag(btn){const id=btn.dataset.id;let ghost=null,sx=0,sy=0,mv=false;
   btn.onpointerdown=e=>{e.preventDefault();try{btn.setPointerCapture(e.pointerId)}catch(_){}sx=e.clientX;sy=e.clientY;mv=false;const r=btn.getBoundingClientRect();
    ghost=document.createElement('div');ghost.className='cr23ghost';ghost.innerHTML=btn.innerHTML;ghost.style.width=r.width+'px';ghost.style.height=r.height+'px';ghost.style.left=(r.left)+'px';ghost.style.top=(r.top)+'px';ghost.dataset.ox=e.clientX-r.left;ghost.dataset.oy=e.clientY-r.top;document.body.appendChild(ghost);btn.classList.add('drag')};
   btn.onpointermove=e=>{if(!ghost)return;if(Math.hypot(e.clientX-sx,e.clientY-sy)>6)mv=true;ghost.style.left=(e.clientX-ghost.dataset.ox)+'px';ghost.style.top=(e.clientY-ghost.dataset.oy)+'px'};
   const up=e=>{if(!ghost)return;const g=ghost;ghost=null;btn.classList.remove('drag');
    if(!mv){g.remove();snd('pop');setTip('glue_hint');const t=document.querySelector(`.cr23tg[data-id="${id}"]`);if(t){t.classList.remove('cr23hint');void t.getBoundingClientRect();t.classList.add('cr23hint')}return}
    const svg=$i('cr23svg');const q=svgPt(svg,e);const a=c.parts[id].at;
    if(Math.hypot(q.x-a[0],q.y-a[1])<38){g.remove();CUR.glued.push(id);snd('gem');draw();try{burstEl(canv(),14)}catch(_){}
     if(CUR.glued.length>=ids.length){setTip('glue_ok');setTimeout(()=>{if(live()&&CUR&&CUR.step===4)step(5)},calm?500:1100)}else setTip('glue_ok');return}
    // 沒對準：彈回去，第二次發亮提示
    miss[id]=(miss[id]||0)+1;snd('hop');const r=btn.getBoundingClientRect();g.classList.add('back');g.style.left=r.left+'px';g.style.top=r.top+'px';setTimeout(()=>g.remove(),calm?0:320);
    if(miss[id]>=2){const t=document.querySelector(`.cr23tg[data-id="${id}"]`);if(t)t.classList.add('cr23hint');setTip('glue_hint')}else setTip('glue_try')};
   btn.onpointerup=up;btn.onpointercancel=e=>{if(ghost){ghost.remove();ghost=null;btn.classList.remove('drag')}}}
  draw();setTip('s_glue')}
 // 6. 完成
 function stDone(){const w=CUR.w;const k=CUR.k;dots(5);
  canv().innerHTML=workSVG(w,{cls:'cr23anim'});$i('cr23tools').innerHTML='';
  w.s=packStrokes(w.s.map(x=>({c:x[0],b:x[1],p:typeof x[2]==='string'?dec(x[2]):x[2]})));
  w.i='w'+Date.now().toString(36);w.d=Math.round(Date.now()/1000);
  let gem=0;try{const P5=window.__P5;gem=P5&&typeof P5.gems==='function'?P5.gems('cr23Day'):0}catch(e){}
  try{confetti()}catch(e){}
  const o=st();
  if(works().length>=MAXW){replacePick(w,()=>endCard(w,gem),()=>endCard(null,gem))}else{o.w.push(w);sv2();endCard(w,gem)}}
 function endCard(w,gem){if(!live())return;const k=CUR.k;
  const ov=overlay(screen,`<div class="card cr23end"><div class="cr23ep">${workSVG(w||CUR.w,{cls:'cr23anim'})}</div><h2>做好了！</h2>${gem?`<p class="small cr23gem">得到 ${gem} 顆寶石！</p>`:''}
   ${w?`<button class="btn cr23room" id="cr23room" type="button"><span class="cr23hi">${HOUSE}</span>放進房間</button>`:''}
   <div class="row"><button class="btn" id="cr23again" type="button">再玩一次</button><button class="btn2" id="cr23out" type="button">${fromRoom?'回房間':'回遊樂園'}</button></div></div>`);
  ov.classList.add('cr23ov');
  say23('done','d_'+k);
  const rb=ov.querySelector('#cr23room');
  if(rb)rb.onclick=()=>{if(rb.dataset.done){snd('pop');ov.remove();tok++;CUR=null;try{hush()}catch(e){}S.from='craft23';go('room');return}
   const bumped=setShow(w.i,true);snd('gem');rb.dataset.done='1';rb.innerHTML=`<span class="cr23hi">${HOUSE}</span>去房間看看`;rb.classList.add('ok');say23(...(bumped?['room_full','room_put']:['room_put']))};
  ov.querySelector('#cr23again').onclick=()=>{snd('pop');ov.remove();SCREENS.craft23()};
  ov.querySelector('#cr23out').onclick=()=>{snd('pop');ov.remove();back()}}
 // 作品櫃滿了：選一件舊的換掉（不換就不存這一件）
 function replacePick(w,ok,no){let pick=null;const ws=works();
  const ov=overlay(screen,`<div class="card cr23gcard"><h2>作品櫃滿了！</h2><p class="small">選一件舊作品，換成新的</p><div class="cr23grid">${ws.map(x=>`<button type="button" class="cr23gi" data-i="${x.i}">${workSVG(x)}<b>${nameOf(x)}</b></button>`).join('')}</div>
   <div class="row"><button class="btn" id="cr23rep" type="button" disabled>換成新的</button><button class="btn2" id="cr23keep" type="button">先不要存</button></div></div>`);
  ov.classList.add('cr23ov');say23('full12');
  ov.querySelectorAll('.cr23gi').forEach(b=>b.onclick=()=>{pick=b.dataset.i;ov.querySelectorAll('.cr23gi').forEach(x=>x.classList.toggle('sel',x===b));ov.querySelector('#cr23rep').disabled=false;snd('pop')});
  ov.querySelector('#cr23rep').onclick=()=>{if(!pick)return;const o=st();const j=o.w.findIndex(x=>x&&x.i===pick);if(j>=0)o.w.splice(j,1,w);else o.w.push(w);o.show=o.show.filter(i=>i!==pick);sv2();snd('gem');ov.remove();ok()};
  ov.querySelector('#cr23keep').onclick=()=>{snd('pop');ov.remove();no()}}
 // 畫布正方形：橫的放左邊；直的放上面，下面一定留得下工具（量工具真正要的高度）
 function fit(){try{const m=$i('cr23main'),cv=canv(),tl=$i('cr23tools');if(!m||!cv)return;
   // 手機橫放：畫布在左邊、提示和工具在右邊（CSS 用格子排），畫布用整個高度
   if(matchMedia('(orientation:landscape) and (max-height:500px)').matches){const root=m.closest('.cr23');const R0=root.getBoundingClientRect();m.classList.add('land');
    const s0=Math.min(R0.height-24,R0.width*.5);cv.style.width=cv.style.height=Math.max(150,Math.floor(s0))+'px';return}
   const r=m.getBoundingClientRect();const land=r.width>r.height*1.05;m.classList.toggle('land',land);
   let s=land?Math.min(r.height-8,r.width*.58):Math.min(r.width-8,r.height*.64);
   if(!land&&tl){const kids=[...tl.children].filter(c=>c.offsetParent!==null);const gap=8;let need=kids.reduce((t,c)=>t+c.offsetHeight,0)+gap*Math.max(0,kids.length-1)+12;if(s+need+10>r.height)s=r.height-need-10}
   cv.style.width=cv.style.height=Math.max(150,Math.floor(s))+'px'}catch(e){}}
 const onR=()=>{if(!live()){removeEventListener('resize',onR);return}fit()};addEventListener('resize',onR);
};
const HOUSE=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 L12 3.6 L21 11" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10 V20 H18 V10" fill="currentColor" opacity=".9"/><path d="M10.4 20 V15 H13.6 V20" fill="#FFFFFF" opacity=".8"/></svg>`;
// 我的作品
function gallery(live){const ws=works(),sh=st().show;
 const ov=overlay(screen,`<div class="card cr23gcard"><h2>我的作品</h2>${ws.length?`<p class="small">點房子，就能放進房間（最多 ${MAXSHOW} 件）</p>`:''}<div class="cr23grid">${ws.length?ws.map(x=>`<div class="cr23gi" data-i="${x.i}"><button type="button" class="cr23gw" aria-label="${nameOf(x)}">${workSVG(x)}</button><b>${nameOf(x)}</b>
  <button type="button" class="cr23gh${sh.includes(x.i)?' on':''}" aria-label="放進房間"><span class="cr23hi">${HOUSE}</span><span class="t">${sh.includes(x.i)?'在房間':'放進房間'}</span></button></div>`).join(''):`<p class="cr23empty">還沒有作品，做一個吧！</p>`}</div>
  <div class="row"><button class="btn" id="cr23gok" type="button">好了</button></div></div>`);
 ov.classList.add('cr23ov');say23(ws.length?'gallery':'gal_empty');
 const paint=()=>{const sh2=st().show;ov.querySelectorAll('.cr23gi').forEach(g=>{const on=sh2.includes(g.dataset.i);const h=g.querySelector('.cr23gh');h.classList.toggle('on',on);h.querySelector('.t').textContent=on?'在房間':'放進房間'})};
 ov.querySelectorAll('.cr23gi').forEach(g=>{const id=g.dataset.i,w=ws.find(x=>x.i===id);
  g.querySelector('.cr23gw').onclick=()=>{snd('pop');const s=g.querySelector('svg');if(s&&!RMH()){s.classList.remove('cr23anim','cr23one');void s.getBoundingClientRect();s.classList.add('cr23anim','cr23one');setTimeout(()=>s.classList.remove('cr23anim','cr23one'),3200)}say23('n_'+w.k)};
  g.querySelector('.cr23gh').onclick=()=>{const on=st().show.includes(id);const b=setShow(id,!on);snd(on?'pop':'gem');paint();say23(on?'tab_off':(b?'room_full':'tab_on'))}});
 ov.querySelector('#cr23gok').onclick=()=>{snd('pop');ov.remove();try{const n=works().length;const e=document.getElementById('cr23gn');if(e)e.textContent=n?`${n} 件`:''}catch(e){}}}

/* ---------- 房間：區域分配（800×400；dev/home23.md 的表） ---------- */
const ZONES={craft:{x:96,y:134,w:110,h:78,who:'E 手作展示'},escmap50:{x:746,y:176,w:52,h:56,who:'B 畫、A 接'},kit47:{x:750,y:236,w:48,h:56,who:'B 畫、A 接'},
 fossilshelf:{x:588,y:288,w:68,h:110,who:'D 小化石展示架'},spare:{x:292,y:132,w:53,h:66,who:'備用'}};
const spot=id=>{const z=ZONES[id];return z?{x:z.x,y:z.y,w:z.w,h:z.h}:null};
// 掛繩 2 格（上）、小層板 2 格（下）
const SLOT={hang:[[124,141,52,36],[180,141,52,36]],stand:[[124,206,52,29],[180,206,52,29]]};
function placeWorks(){const ws=shown();const H=[],St=[];ws.forEach(w=>(CR[w.k].hang?H:St).push(w));while(H.length>2)St.push(H.pop());while(St.length>2)H.push(St.pop());return {H,St}}
function roomLayer(){try{const sc=document.querySelector('.rscene2');if(!sc)return;sc.querySelectorAll(':scope>svg.h23rm').forEach(e=>e.remove());if(!works().length)return;
 const bg=sc.querySelector(':scope>svg.bg');const par=(bg&&bg.getAttribute('preserveAspectRatio'))||'xMidYMid slice';
 const {H,St}=placeWorks();const u=uid('rm');
 const pin=(x,y)=>`<rect x="${x-3}" y="${y-5}" width="6" height="12" rx="2" fill="url(#${u}pn)"/><rect x="${x-3}" y="${y-1}" width="6" height="1.6" fill="#B8864A" opacity=".7"/>`;
 // 作品照自己的範圍（vb）縮放放進格子：掛的上緣對齊掛繩，站的下緣對齊層板
 const one=(w,sl,mode)=>{const [cx,top,mw,mh]=sl;const vb=CR[w.k].vb;const k=Math.min(mw/vb[2],mh/vb[3]);const ww=n1(vb[2]*k),hh=n1(vb[3]*k);const x=n1(cx-ww/2),y=mode==='hang'?top:n1(top-hh);
  return `<g class="h23it" data-i="${w.i}"><svg x="${x}" y="${y}" width="${ww}" height="${hh}" viewBox="${vb.join(' ')}" overflow="visible" class="h23ws">${workInner(w,{vx:vb[0],vy:vb[1]})}</svg>${mode==='hang'?pin(cx,top+2):`<ellipse cx="${cx}" cy="${top-1}" rx="${n1(ww*.36)}" ry="2" fill="#5A3A2A" opacity=".18"/>`}
   <rect class="h23hit" x="${cx-25}" y="${mode==='hang'?top-4:n1(top-Math.max(hh,30)-6)}" width="50" height="${mode==='hang'?n1(Math.max(hh,36)+8):n1(Math.max(hh,30)+8)}" fill="#FFFFFF" fill-opacity="0"/></g>`};
 const svg=document.createElementNS(NS,'svg');svg.setAttribute('class','h23rm');svg.setAttribute('viewBox','0 0 800 400');svg.setAttribute('preserveAspectRatio',par);
 svg.innerHTML=`<defs><linearGradient id="${u}wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8B884"/><stop offset="1" stop-color="#C08850"/></linearGradient>
  <linearGradient id="${u}pn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F2D2A0"/><stop offset="1" stop-color="#D8A868"/></linearGradient></defs>
  <g class="h23shelf"><path d="M98 139 Q151 152 206 139" stroke="#C8955E" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="98" cy="139" r="2.4" fill="#D8A868"/><circle cx="206" cy="139" r="2.4" fill="#D8A868"/>
  <path d="M108 211 L114 218 L120 211Z M184 211 L190 218 L196 211Z" fill="#B07A44"/><rect x="100" y="206" width="104" height="6" rx="2.4" fill="url(#${u}wd)"/><rect x="100" y="206" width="104" height="1.6" rx=".8" fill="#FFF0D6" opacity=".7"/></g>
  ${H.map((w,i)=>one(w,SLOT.hang[i],'hang')).join('')}${St.map((w,i)=>one(w,SLOT.stand[i],'stand')).join('')}`;
 sc.appendChild(svg);
 svg.querySelectorAll('.h23it').forEach(g=>{const hit=g.querySelector('.h23hit');hit.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();const w=works().find(x=>x.i===g.dataset.i);if(!w)return;
  snd('pop');if(!RMH()){const s=g.querySelector('.h23ws');s.classList.remove('cr23anim','cr23one');void s.getBoundingClientRect();s.classList.add('cr23anim','cr23one');clearTimeout(g._t);g._t=setTimeout(()=>s.classList.remove('cr23anim','cr23one'),3200)}
  try{burstEl(hit,10)}catch(_){}say23('r_'+w.k)})})}catch(e){console.log('h23 room',e)}}
window.__H23={ZONES,spot,works,shown,workSVG,roomLayer,ver:'2026-11-28'};

/* ---------- 佈置房間：「手作作品」分類 ---------- */
const F9=()=>window.__fest9||null;
const CHECK=()=>{try{return F9().CHECK}catch(e){return '✓'}};
const TABI=()=>{const u=uid('tb');return `<svg viewBox="0 0 48 40" aria-hidden="true"><rect width="48" height="40" rx="6" fill="#FFE9F1"/><path d="M4 9 Q24 16 44 9" stroke="#C8955E" stroke-width="1.4" fill="none"/>
 <g transform="translate(6 8) scale(.085)">${workInner(SAMPLE.lantern,{u:u+'a'})}</g><g transform="translate(25 9) scale(.085)">${workInner(SAMPLE.flags,{u:u+'b'})}</g><rect x="6" y="34" width="36" height="3" rx="1.4" fill="#D8A868"/></svg>`};
function tabHTML(p88,ic,nm){return p88?`<i class="p88ti">${ic}</i><span class="p88tl">${nm}</span>`:`${ic}<span>${nm}</span>`}
function addTab(){const tabs=document.querySelector('.rside .tabs');if(!tabs||tabs.querySelector('.h23tab'))return;const p88=tabs.classList.contains('p88tabs');
 const t=document.createElement('button');t.type='button';t.className='tab h23tab';t.setAttribute('aria-label','手作作品');t.setAttribute('aria-selected','false');t.innerHTML=tabHTML(p88,TABI(),'手作作品');
 t.onclick=e=>{e.stopPropagation();if(document.querySelector('.overlay'))return;openTab(true)};
 const fs=tabs.querySelector('.fs9tab');if(fs)tabs.insertBefore(t,fs);else tabs.appendChild(t)}
function openTab(say1){const sel=(document.querySelector('.rside .tab[aria-selected="true"][data-s]')||{}).dataset;try{SCREENS.room(sel&&sel.s||'bed')}catch(e){}
 const box=document.querySelector('.rside .ropts'),tabs=document.querySelector('.rside .tabs');if(!box||!tabs)return;
 tabs.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected','false'));const t=tabs.querySelector('.h23tab');if(t)t.setAttribute('aria-selected','true');
 box.classList.add('fs9box','h23box');renderTab(box);snd('pop');if(say1)say23(works().length?'tab_open':'tab_none')}
function renderTab(box){const ws=works(),sh=st().show;
 const mk=`<button type="button" class="ropt fs9o h23mk" aria-label="去做新作品"><span class="p88th">${art('i:craft23')}</span><b class="fs9n">做新作品</b><span class="p88st"></span></button>`;
 box.innerHTML=ws.map(w=>{const on=sh.includes(w.i);return `<button type="button" class="ropt fs9o h23o${on?' on':''}" data-i="${w.i}" aria-label="${nameOf(w)}${on?'（在房間裡）':''}"><span class="p88th h23th">${workSVG(w)}</span><b class="fs9n">${nameOf(w)}</b><span class="p88st${on?' p88on':''}">${on?CHECK():''}</span></button>`}).join('')+mk;
 box.querySelectorAll('.h23o').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.i,on=st().show.includes(id);const bumped=setShow(id,!on);snd(on?'pop':'gem');roomLayer();renderTab(box);say23(on?'tab_off':(bumped?'room_full':'tab_on'))});
 box.querySelector('.h23mk').onclick=e=>{e.stopPropagation();snd('pop');try{hush()}catch(_){}S.from='room';go('craft23')};
 try{box.scrollLeft=0}catch(e){}}
{const _room=SCREENS.room;SCREENS.room=function(){const r=_room.apply(this,arguments);try{addTab()}catch(e){console.log('h23tab',e)}return r}}
// 從手作小工坊回房間：回到房間
{const _rm=rmEnhance;rmEnhance=function(){const r=_rm.apply(this,arguments);try{roomLayer();fxHook()}catch(e){console.log('h23 rmEnhance',e)}return r}}

/* ---------- 節慶佈置一件一件選（方案 C） ---------- */
// 每個節日有哪幾件（位置 key 照 m99zxh 的 ORDER），名字見 T['it_節日_位置']
const FORDER=['web','top','wl','rd','wm','cp','wr','win','bed','fl','fl2'];
const FTH=()=>{try{return F9().TH}catch(e){return []}};
const fname=k=>{try{return F9().THN(k)}catch(e){return k}};
const AUTO=()=>{try{const A=window.__fsAuto;return A&&A.on()?A:null}catch(e){return null}};
const HK=()=>boy()?'prince':'princess';
const MIXK=()=>'fest23_'+HK(),OFFK=()=>'fest23a_'+HK();
const itName=(k,p)=>String(T['it_'+k+'_'+p]||p).replace(/！$/,'');
// 解析某個節日的佈置（每次都是新的漸層 id）
function parts(k){try{const str=F9().decoSVG(k);const t=document.createElementNS(NS,'svg');t.innerHTML=str;const defs=[...t.querySelectorAll(':scope>defs')].map(d=>d.outerHTML).join('');
 const g={};t.querySelectorAll(':scope>g.fs9p').forEach(e=>{const m=/fs9-([a-z0-9]+)/.exec(e.getAttribute('class')||'');if(m)g[m[1]]=e.outerHTML});return {defs,g}}catch(e){return {defs:'',g:{}}}}
const SLOTS={};const slotsOf=k=>{if(!SLOTS[k]){const p=parts(k);SLOTS[k]=FORDER.filter(s=>p.g[s])}return SLOTS[k]};
const validK=k=>FTH().some(t=>t[0]===k);
// 手動模式：V2.fest23_主角={m:{位置:節日}}；沒有＝整套（舊存檔照舊）
function getMix(){try{const o=V2[MIXK()];if(!o||typeof o!=='object'||!o.m||typeof o.m!=='object')return null;const m={};Object.entries(o.m).forEach(([s,k])=>{if(FORDER.includes(s)&&validK(k)&&slotsOf(k).includes(s))m[s]=k});return m}catch(e){return null}}
function setMix(m){try{if(m)V2[MIXK()]={m};else delete V2[MIXK()];sv2()}catch(e){}}
// 自動模式：V2.fest23a_主角={id:'xmas2026',off:[位置]}（只對這一次節日有效）
function getOff(){try{const A=AUTO();const o=V2[OFFK()];const a=A&&A.active();if(!a||!o||o.id!==a.id||!Array.isArray(o.off))return [];return o.off.filter(s=>FORDER.includes(s))}catch(e){return []}}
function setOff(off){try{const A=AUTO();const a=A&&A.active();if(!a||!off||!off.length)delete V2[OFFK()];else V2[OFFK()]={id:a.id,off};sv2()}catch(e){}}
// 現在房間該掛哪幾件：{位置:節日}；null＝照原本整套
function want(){const F=F9();if(!F)return null;const A=AUTO();
 if(A){const k=A.cur();if(!k)return null;const off=getOff();if(!off.length)return null;const m={};slotsOf(k).forEach(s=>{if(!off.includes(s))m[s]=k});return m}
 if(!F.isOpen())return null;const k=F.saved();if(!k)return null;return getMix()}
const fullOf=k=>{const m={};slotsOf(k).forEach(s=>m[s]=k);return m};
function mainOf(m){const c={};Object.values(m).forEach(k=>c[k]=(c[k]||0)+1);return Object.keys(c).sort((a,b)=>c[b]-c[a])[0]||''}
function applyMix(){try{const sc=document.querySelector('.rscene2');if(!sc)return;const svg=sc.querySelector(':scope>svg.fs9l');if(!svg)return;const m=want();
 if(!m){if(svg.dataset.h23){delete svg.dataset.h23;F9().paint(true)}return}
 const sig=JSON.stringify(m);if(svg.dataset.h23===sig)return;
 const ks=[...new Set(Object.values(m))];const P={};ks.forEach(k=>P[k]=parts(k));
 svg.innerHTML=ks.map(k=>P[k].defs).join('')+FORDER.map(s=>m[s]&&P[m[s]].g[s]?P[m[s]].g[s]:'').join('');svg.dataset.h23=sig;
 // 光影層：只有主節日整套都在的時候留著（不然光暈會亮在沒有東西的地方）
 const mk=mainOf(m),full=slotsOf(mk).every(s=>m[s]===mk);sc.querySelectorAll(':scope>svg.fs9a').forEach(a=>{a.style.display=full&&a.dataset.k===mk?'':'none'})}catch(e){console.log('h23 mix',e)}}
let MO=null;
function fxHook(){try{const sc=document.querySelector('.rscene2');if(!sc)return;if(MO)MO.disconnect();MO=new MutationObserver(()=>{const s=sc.querySelector(':scope>svg.fs9l');if(s&&!s.dataset.h23busy){s.dataset.h23busy=1;applyMix();delete s.dataset.h23busy}});
 MO.observe(sc,{childList:true});applyMix()}catch(e){console.log('h23 fxHook',e)}}
// 原本的節日卡（整套換上／不用佈置）：清掉一件一件的選擇
document.addEventListener('click',e=>{try{const b=e.target.closest&&e.target.closest('.ropts.fs9box .ropt.fs9o');if(!b||b.classList.contains('h23fxc')||b.closest('.h23box')||b.classList.contains('fs9lock')||b.classList.contains('fsaWait'))return;
 if(AUTO()){setOff([])}else setMix(null)}catch(_){}},true);
// 節日選項最後加一張「一件一件選」
const FXIC=()=>{const u=uid('fi');return `<svg viewBox="0 0 200 125" aria-hidden="true"><rect width="200" height="125" fill="#FFE9F1"/><rect y="92" width="200" height="33" fill="#E2B486"/>
 ${[[34,40,'#E8463A'],[100,40,'#3E9A56'],[166,40,'#7A4AB8']].map(([x,y,c],i)=>`<rect x="${x-26}" y="${y-26}" width="52" height="60" rx="10" fill="#FFFFFF" opacity=".9"/><circle cx="${x}" cy="${y}" r="15" fill="${c}"/><path d="${star5(x,y,7)}" fill="#FFE27A"/>
 <circle cx="${x+18}" cy="${y+26}" r="10" fill="${i<2?'#FFD24D':'#FFFFFF'}" stroke="#C8A0E8" stroke-width="2"/>${i<2?`<path d="M${x+13} ${y+26} l4 4 l7 -8" stroke="#5A3A8A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`:''}`).join('')}</svg>`};
function fxAvail(){const F=F9();if(!F)return false;const A=AUTO();if(A)return !!A.active();return F.isOpen()}
function fxCard(){try{if(!fxAvail())return;document.querySelectorAll('.rside .ropts.fs9box:not(.h23box)').forEach(box=>{if(box.querySelector('.h23fxc')||!box.querySelector('.fs9o'))return;
 const b=document.createElement('button');b.type='button';b.className='ropt fs9o h23fxc';b.setAttribute('aria-label','一件一件選');b.innerHTML=`<span class="p88th">${FXIC()}</span><b class="fs9n">一件一件選</b><span class="p88st"></span>`;
 b.onclick=e=>{e.stopPropagation();snd('pop');fxSheet()};box.appendChild(b)})}catch(e){console.log('h23 fxcard',e)}}
new MutationObserver(()=>{if(S.screen==='room')fxCard()}).observe(document.getElementById('screen')||document.body,{childList:true,subtree:true});
// 一件一件選的面板（下半部，房間看得到）
function fxSheet(){const F=F9();if(!F)return;const A=AUTO();const host=document.getElementById('screen');
 let cur=(()=>{const m=want();if(m)return Object.assign({},m);const k=A?A.cur():F.saved();return k?fullOf(k):{}})();
 let browse=A?(A.active()||{}).k:(mainOf(cur)||F.saved()||(FTH()[0]||[])[0]);
 const ov=overlay(host,`<div class="card h23fx"><div class="h23fxh"><h2>一件一件選</h2><span class="h23sp"></span><button class="btn2 h23fxnone" type="button">全部拿下來</button><button class="btn h23fxok" type="button">好了</button></div><div class="h23fxt"></div><div class="h23fxi"></div></div>`);
 ov.classList.add('h23fxov');say23(A?'fx_auto':'fx_open');
 const tabs=ov.querySelector('.h23fxt'),items=ov.querySelector('.h23fxi');
 function commit(){const ks=Object.keys(cur);
  if(A){const a=A.active();const k=a&&a.k;if(!k)return;const off=slotsOf(k).filter(s=>cur[s]!==k);const offK='festOff_'+HK();
   if(off.length>=slotsOf(k).length){try{V2[offK]=a.id}catch(e){}setOff([])}else{try{if(V2[offK]===a.id)delete V2[offK]}catch(e){}setOff(off)}sv2();F.paint(true);return}
  if(!ks.length){setMix(null);F.setSaved('');F.paint(true);return}
  const mk=mainOf(cur);const full=fullOf(mk);const same=Object.keys(full).length===ks.length&&ks.every(s=>full[s]===cur[s]);
  setMix(same?null:Object.assign({},cur));if(F.saved()!==mk)F.setSaved(mk);
  const svg=document.querySelector('.rscene2>svg.fs9l');if(svg&&svg.dataset.k===mk&&!same){delete svg.dataset.h23;applyMix()}else F.paint(true)}
 function drawTabs(){const list=A?FTH().filter(t=>t[0]===browse):FTH();
  tabs.innerHTML=list.map(([k,nm])=>{const n=Object.values(cur).filter(x=>x===k).length;return `<button type="button" class="h23ft${k===browse?' sel':''}" data-k="${k}"><span class="h23fti">${F.thumbSVG(k)}</span><b>${nm}</b>${n?`<i class="h23fn">${n}</i>`:''}</button>`}).join('');
  tabs.querySelectorAll('.h23ft').forEach(b=>b.onclick=()=>{browse=b.dataset.k;snd('pop');drawTabs();drawItems()})}
 function thumb(k,s){const p=parts(k);const bb=BB(k,s);return `<svg viewBox="${bb.join(' ')}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${p.defs}${p.g[s]||''}</svg>`}
 function drawItems(){const k=browse;if(!k){items.innerHTML='';return}
  items.innerHTML=slotsOf(k).map(s=>{const on=cur[s]===k;const other=cur[s]&&cur[s]!==k?cur[s]:'';return `<button type="button" class="h23fit${on?' on':''}" data-s="${s}" aria-pressed="${on}" aria-label="${itName(k,s)}"><span class="h23fth">${thumb(k,s)}</span><b>${itName(k,s)}</b>${on?`<span class="h23ck">${CHECK()}</span>`:other?`<small>換掉${fname(other)}的</small>`:''}</button>`}).join('');
  items.querySelectorAll('.h23fit').forEach(b=>b.onclick=()=>{const s=b.dataset.s;let line;
   if(cur[s]===k){delete cur[s];line='fx_off';snd('pop')}else{line=cur[s]?'fx_swap':'fx_on';cur[s]=k;snd('gem')}
   commit();drawTabs();drawItems();say23(line==='fx_off'?'fx_off':'it_'+k+'_'+s,line==='fx_off'?'':line)})}
 ov.querySelector('.h23fxnone').onclick=()=>{cur={};commit();snd('pop');drawTabs();drawItems();say23('fx_none')};
 ov.querySelector('.h23fxok').onclick=()=>{snd('pop');try{hush()}catch(e){}ov.remove();try{const box=document.querySelector('.rside .ropts.fs9box');if(box&&F.openPanel){F.openPanel(false)}}catch(e){}};
 ov.addEventListener('click',e=>{if(e.target===ov){ov.querySelector('.h23fxok').click()}});
 drawTabs();drawItems()}
// 每一件的範圍（縮圖用）：放在畫面外量 getBBox，量一次記起來
const BBC={};
function BB(k,s){const key=k+'.'+s;if(BBC[key])return BBC[key];let r=[0,0,800,400];
 try{const p=parts(k);const t=document.createElementNS(NS,'svg');t.setAttribute('viewBox','0 0 800 400');t.setAttribute('style','position:fixed;left:-2000px;top:0;width:800px;height:400px;visibility:hidden;pointer-events:none');
  t.innerHTML=p.defs+(p.g[s]||'');document.body.appendChild(t);const g=t.querySelector('g.fs9p');if(g){const b=g.getBBox();const pad=6;
   let x=Math.max(-20,b.x-pad),y=Math.max(-10,b.y-pad),w=Math.min(840,b.width+pad*2),h=Math.min(420,b.height+pad*2);
   // 縮圖比例 4:3 左右，太長的（上緣一整排）只取左邊一段
   if(w>h*2.4){w=Math.max(h*2.4,120)}if(h>w*1.6){const cy=y+h/2;h=w*1.6;y=cy-h/2}r=[n1(x),n1(y),n1(w),n1(h)]}t.remove()}catch(e){}
 BBC[key]=r;return r}
window.__H23.fest={want,getMix,setMix,getOff,setOff,slotsOf,applyMix,fxSheet,itName};
// 美術總表、測試用
window.__H23.art={SAMPLE,CR,sticker:i=>{const u=uid('as');return `<svg viewBox="-14 -14 28 28"><defs>${stkDefs(u)}</defs>${STK[i].d(u,i)}</svg>`},STKN:STK.map(x=>x.n),
 sci:`<svg viewBox="-16 -18 32 34">${SCI}</svg>`,hand:`<svg viewBox="-2 -22 28 44">${HANDI}</svg>`,icon:ICON23,tab:TABI,fx:FXIC,
 photo:()=>{const u=uid('ap');return `<svg viewBox="-32 -36 64 72"><defs>${partDefs(u)}</defs>${photo(u)}</svg>`},
 part:(k,id)=>{const p=CR[k].parts[id],b=p.box,u=uid('pp');return `<svg viewBox="${b[0]-4} ${b[1]-4} ${b[2]+8} ${b[3]+8}"><defs>${partDefs(u)}</defs>${p.d(u)}</svg>`},
 gift:giftSVG,giftSil:giftSil};

/* ---------- 樣式（動畫只用移動、旋轉物品、淡入、亮光；減少動態、流暢模式停） ---------- */
const css=document.createElement('style');css.id='h23css';css.textContent=`
.cr23{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;gap:6px;box-sizing:border-box;padding:0 6px 8px}
.cr23 .phead{flex:0 0 auto}
.cr23top{display:flex;align-items:center;justify-content:center;gap:12px;flex:0 0 auto;flex-wrap:wrap}
.cr23top[hidden],.cr23tipw[hidden],.cr23main[hidden]{display:none!important}
.cr23dots{display:flex;gap:6px;align-items:center}
.cr23dots i{font-style:normal;line-height:1;display:inline-block}
.cr23dots i::before{content:'★';font-size:24px;color:rgba(255,255,255,.3);transition:color .3s,text-shadow .3s}
.cr23dots i.on::before{color:#FFE27A;text-shadow:0 0 10px #FFE27A}.cr23dots i.now::before{color:rgba(255,226,122,.65)}
.cr23stn{font-size:20px;color:#FFE7B0;font-weight:700;letter-spacing:1px}
.cr23tipw{position:relative;flex:0 0 auto;display:flex;align-items:center;gap:10px;max-width:900px;width:100%;margin:0 auto}
.cr23tip{flex:1;margin:0;min-height:48px;box-sizing:border-box;display:flex;align-items:center;padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.93);color:#3A2A55;font-size:20px;line-height:1.35;box-shadow:0 3px 0 rgba(16,10,56,.35)}
.cr23tipw .cr23spk{flex:0 0 auto;position:relative}
.cr23main{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:10px}
.cr23main.land{flex-direction:row;justify-content:center;align-items:center}
.cr23canv{flex:0 0 auto;position:relative;border-radius:26px;background:radial-gradient(circle at 30% 25%,#FFFDF6,#FFF1DC);box-shadow:0 4px 0 rgba(16,10,56,.35),inset 0 0 0 3px rgba(255,217,138,.7);overflow:hidden}
.cr23canv::before{content:'';position:absolute;inset:10px;border-radius:18px;background-image:radial-gradient(rgba(200,160,120,.25) 1.4px,transparent 1.6px);background-size:22px 22px;pointer-events:none}
.cr23canv>svg{position:relative;display:block;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none}
.cr23tools{flex:1 1 auto;min-width:0;min-height:0;width:100%;max-width:440px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:8px;overflow:auto;padding:4px;box-sizing:border-box}
.cr23tools>:first-child{margin-top:auto}.cr23tools>:last-child{margin-bottom:auto}
.cr23main.land .cr23tools{width:auto;flex:1 1 380px;max-width:580px;align-self:stretch}
.cr23lab{font-size:16px;color:#FFE7B0;font-weight:700}
.cr23sw,.cr23br,.cr23stks,.cr23tray,.cr23row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.cr23pap,.cr23ink{width:54px;height:54px;border-radius:50%;border:3px solid #FFFFFF;padding:0;cursor:pointer;background:linear-gradient(180deg,var(--a),var(--b,var(--a)));box-shadow:0 3px 0 rgba(16,10,56,.4);-webkit-tap-highlight-color:transparent}
.cr23pap{border-radius:14px}
.cr23pap.sel,.cr23ink.sel{border-color:#FFC24D;box-shadow:0 0 0 3px #FFC24D,0 0 14px rgba(255,194,77,.7),0 3px 0 rgba(16,10,56,.4)}
.cr23brb,.cr23stb{min-width:84px;min-height:64px;border-radius:18px;border:3px solid #FFFFFF;background:#FFFFFF;color:#3A2A55;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px 8px;cursor:pointer;box-shadow:0 3px 0 rgba(16,10,56,.4);font:inherit}
.cr23brb svg{width:44px;height:26px}.cr23stb svg{width:34px;height:34px}
.cr23brb b,.cr23stb b{font-size:16px;font-weight:700;color:#3A2A55}
.cr23stb{min-width:70px}
.cr23brb.sel,.cr23stb.sel{border-color:#FFC24D;background:#FFF6DA;box-shadow:0 0 0 2px #FFC24D,0 0 14px rgba(255,194,77,.6),0 3px 0 rgba(16,10,56,.4)}
.cr23next{min-height:60px;min-width:170px;font-size:24px}
.cr23undo{min-height:56px;font-size:18px}
.cr23big svg{width:96px;height:100px}
.cr23note{margin:0;font-size:18px;color:#FFE7B0;text-align:center}
.cr23part{width:104px;height:104px;border-radius:22px;border:3px dashed #FFD98A;background:#FFFFFF;padding:6px;cursor:grab;touch-action:none;box-shadow:0 3px 0 rgba(16,10,56,.4)}
.cr23part svg{width:100%;height:100%;display:block;pointer-events:none}
.cr23part.drag{opacity:.35}
.cr23ghost{position:fixed;z-index:60;pointer-events:none;border-radius:22px;background:rgba(255,255,255,.55);padding:6px;box-sizing:border-box}
.cr23ghost svg{width:100%;height:100%;display:block}
.cr23ghost.back{transition:left .3s ease,top .3s ease,opacity .3s;opacity:.4}
.cr23pulse{animation:cr23pl 1.4s ease-in-out infinite}
@keyframes cr23pl{0%,100%{opacity:.25}50%{opacity:.85}}
.cr23tg.cr23hint circle:first-child{animation:cr23pl .6s ease-in-out 4;fill:#FFE27A}
#cr23hand.cr23hint{animation:cr23pl .8s ease-in-out infinite}
.cr23fall{animation:cr23fall 1.2s ease-in forwards}
@keyframes cr23fall{to{transform:translateY(120px);opacity:0}}
.cr23pop{animation:cr23in .35s ease-out}
@keyframes cr23in{from{opacity:0}to{opacity:1}}
.cr23w{display:block}
.cr23a{transform-box:view-box}
.cr23spin{transform-box:view-box}
.cr23anim .cr23a-sway{animation:cr23sw 2.4s ease-in-out infinite}
.cr23anim .cr23a-flut{animation:cr23sw 1.5s ease-in-out infinite}
.cr23anim .cr23a-twk{animation:cr23sw2 3s ease-in-out infinite}
.cr23anim .cr23spin{animation:cr23spin 1.6s linear infinite}
.cr23anim .cr23a-swim{animation:cr23swim 2.6s ease-in-out infinite}
@keyframes cr23sw{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
@keyframes cr23sw2{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@keyframes cr23spin{to{transform:rotate(360deg)}}
@keyframes cr23swim{0%,100%{transform:translate(-12px,2px)}50%{transform:translate(12px,-4px)}}
@media (prefers-reduced-motion:reduce){.cr23anim .cr23a,.cr23anim .cr23spin,.cr23pulse,.cr23fall,.cr23pop,.cr23tg.cr23hint circle:first-child,#cr23hand.cr23hint{animation:none!important}.cr23fall{opacity:0}}
.lite .cr23anim:not(.cr23one) .cr23a,.lite .cr23anim:not(.cr23one) .cr23spin,.lite .cr23pulse,.lite .cr23fall{animation:none!important}.lite .cr23fall{opacity:0}
.cr23one .cr23a,.cr23one .cr23spin{animation-iteration-count:2!important}
/* 開始卡：深紫卡＋白色選項、選中金框（照 2.2 的小遊戲開始選單） */
.cr23menu{position:absolute;inset:0;display:grid;place-items:center;padding:56px 10px 10px;box-sizing:border-box;overflow:auto;z-index:3}
.cr23mc{width:min(760px,100%);box-sizing:border-box;padding:16px 18px 18px;background:linear-gradient(180deg,rgba(60,50,140,.97),rgba(34,28,94,.97));border:2px solid #FFD98A;border-radius:32px;color:#FFF8EC;box-shadow:0 10px 30px rgba(0,0,0,.38);display:flex;flex-direction:column;gap:12px}
.cr23mh{display:flex;align-items:center;gap:12px}.cr23mi{width:64px;height:64px;flex:0 0 64px}.cr23mi svg{width:100%;height:100%}
.cr23mh b{display:block;font-size:26px;color:#FFF8EC}.cr23mh small{display:block;font-size:16px;color:#D4CCF4}
.cr23opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:10px}
.cr23opt{position:relative;background:#FFFFFF;color:#3A2A55;border:3px solid #FFFFFF;border-radius:22px;box-shadow:0 3px 0 rgba(16,10,56,.45);padding:6px 4px 8px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;font:inherit;min-height:120px}
.cr23opt .cr23oi{width:84px;height:84px}.cr23opt .cr23oi svg{width:100%;height:100%}
.cr23opt b{font-size:17px;color:#3A2A55}
.cr23opt.sel{border-color:#FFC24D;background:#FFF6DA;box-shadow:0 0 0 2px #FFC24D,0 0 14px rgba(255,194,77,.6),0 3px 0 rgba(16,10,56,.45)}
.cr23new{position:absolute;top:4px;right:6px;font-size:16px;background:#FF8FB8;color:#FFFFFF;border-radius:10px;padding:0 6px;font-weight:700}.cr23new.fresh{background:#FFC24D;color:#5A3A14}
.cr23row2{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.cr23go{min-height:64px;min-width:200px;font-size:26px}.cr23gal{min-height:60px;min-width:150px;font-size:20px}.cr23gal small{font-size:16px;color:#FFE7B0}
/* 結束卡、作品櫃 */
.cr23ov .card{width:min(620px,100%)}
.cr23end{text-align:center}
.cr23ep{width:min(220px,44vh);height:min(220px,44vh);margin:0 auto 2px}.cr23ep svg{width:100%;height:100%}
.cr23gem{color:#FFE7B0;font-size:18px!important;margin:0 0 6px}
.cr23room{min-height:60px;min-width:220px;font-size:22px;margin:4px auto 12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(180deg,#FF9AC6,#F0649E)!important;color:#FFFFFF!important}
.cr23room.ok{background:linear-gradient(180deg,#7FE3A8,#3CB873)!important}
.cr23hi{display:inline-block;width:26px;height:26px;color:#FFFFFF}.cr23hi svg{width:100%;height:100%}
.cr23gcard h2{margin:.2em 0}
.cr23grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(122px,1fr));gap:10px;margin:8px 0 12px;max-height:56vh;overflow:auto;padding:4px}
.cr23gi{background:#FFFFFF;border-radius:20px;padding:6px;display:flex;flex-direction:column;align-items:center;gap:4px;border:3px solid #FFFFFF;box-shadow:0 3px 0 rgba(16,10,56,.35);color:#3A2A55;font:inherit;cursor:pointer}
button.cr23gi.sel{border-color:#FFC24D;background:#FFF6DA}
.cr23gi>svg,.cr23gw svg{width:92px;height:92px;display:block}
.cr23gw{background:none;border:0;padding:0;cursor:pointer}
.cr23gi b{font-size:16px;color:#3A2A55}
.cr23gh{min-height:44px;width:100%;border-radius:14px;border:0;background:#EDE6FF;color:#5A3E9A;font:inherit;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:4px;cursor:pointer}
.cr23gh .cr23hi{color:#7A5AC8;width:22px;height:22px}
.cr23gh.on{background:#FFE27A;color:#5A3A14}.cr23gh.on .cr23hi{color:#C8862A}
.cr23empty{grid-column:1/-1;font-size:18px;color:#FFE7B0;text-align:center}
/* 手機 */
@media (max-width:600px),(max-height:500px){
 .cr23stn{font-size:16px}.cr23dots i::before{font-size:20px}.cr23tip{font-size:16px;min-height:44px;padding:6px 12px}
 .cr23pap,.cr23ink{width:46px;height:46px}.cr23sw,.cr23br,.cr23stks,.cr23tray,.cr23row{gap:8px}
 .cr23brb,.cr23stb{min-width:70px;min-height:56px;border-radius:14px}.cr23brb b,.cr23stb b{font-size:14px}.cr23stb svg{width:28px;height:28px}
 .cr23next{min-height:52px;min-width:130px;font-size:20px}.cr23undo{min-height:48px;font-size:16px}
 .cr23part{width:84px;height:84px}.cr23lab,.cr23note{font-size:14px}
 .cr23opts{grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:8px}.cr23opt{min-height:88px;padding:4px 2px 6px;border-radius:18px}.cr23opt .cr23oi{width:54px;height:54px}.cr23opt b{font-size:14px;white-space:nowrap}.cr23new{font-size:12px;top:2px;right:3px;padding:0 4px}
 .cr23menu{padding:50px 6px 8px}.cr23mc{padding:12px 12px 14px;gap:10px;border-radius:26px}
 .cr23mh b{font-size:22px}.cr23mh small{font-size:14px}.cr23mi{width:52px;height:52px;flex-basis:52px}
 .cr23go{min-height:56px;min-width:160px;font-size:22px}.cr23gal{min-height:52px;font-size:18px}
 .cr23grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}.cr23gi>svg,.cr23gw svg{width:72px;height:72px}.cr23gi b,.cr23gh{font-size:14px}
 .cr23room{min-height:52px;min-width:180px;font-size:20px}
}
@media (max-height:740px) and (orientation:portrait){.cr23top{display:none!important}.cr23lab{display:none}}
@media (max-height:500px) and (orientation:landscape){
 .cr23lab{display:none}.cr23pap,.cr23ink{width:44px;height:44px}.cr23brb,.cr23stb{min-height:50px}.cr23part{width:76px;height:76px}.cr23next{min-height:48px}
 .overlay .card.cr23end{display:grid!important;grid-template-columns:auto auto;grid-auto-rows:auto;align-items:center;justify-items:center;column-gap:16px;row-gap:6px;width:auto;max-width:min(720px,100%);padding:12px 18px}
 .cr23end .cr23ep{grid-row:1/span 4;width:min(170px,52vh);height:min(170px,52vh);margin:0}.cr23end h2{margin:0;font-size:24px}.cr23end .cr23room{margin:0}.cr23end .row{margin:0}
 .cr23opts{grid-template-columns:repeat(auto-fill,minmax(92px,1fr))}
 .cr23menu{padding-top:8px}.cr23mc{padding:10px 14px;gap:8px}.cr23opt .cr23oi{width:52px;height:52px}.cr23opt{min-height:84px}.cr23top{display:none!important}.cr23tip{min-height:40px}.cr23big svg{width:64px;height:66px}}
/* 手機橫放：畫布在左、提示和工具在右（畫布用整個高度，至少 220） */
@media (orientation:landscape) and (max-height:500px){
 .cr23{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);column-gap:10px;row-gap:6px;padding:16px 6px 6px;align-items:start}
 .cr23 .phead{position:absolute;left:0;top:0;right:0;height:0;overflow:visible;margin:0;padding:0}.cr23 .phead .gtitle,.cr23 .phead .phsp{display:none}
 .cr23tipw{grid-column:2;grid-row:1;margin:0;max-width:none;width:auto}.cr23tip{min-height:44px;font-size:16px;padding:6px 12px}
 .cr23main,.cr23main.land{display:contents}
 .cr23canv{grid-column:1;grid-row:1/span 2;align-self:center}
 .cr23tools,.cr23main.land .cr23tools{grid-column:2;grid-row:2;max-width:none;width:auto;align-self:stretch;height:100%}
 .cr23sw,.cr23br,.cr23stks,.cr23tray,.cr23row{gap:8px}
}
/* 房間：手作展示 */
.rscene2>svg.h23rm{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4}
.rscene2>svg.h23rm *{pointer-events:none}
.rscene2>svg.h23rm .h23hit{pointer-events:all;cursor:pointer}
.ropts.h23box .ropt .p88th.h23th svg{width:100%;height:100%;display:block;object-fit:contain}
.ropts.h23box .ropt .p88th.h23th{background:#FFF7EC}
/* 節慶一件一件選 */
.overlay.h23fxov{place-items:end center;background:rgba(10,8,40,.22);padding:0 6px}
.overlay .card.h23fx{width:min(1000px,100%)!important;max-width:none!important;align-items:stretch!important;text-align:left;margin:0;max-height:min(56%,460px);display:flex;flex-direction:column;gap:8px;padding:10px 14px 12px!important;border-radius:28px 28px 18px 18px;overflow:hidden}
.h23fxh{display:flex;align-items:center;gap:10px}.h23fxh h2{margin:0;font-size:22px;white-space:nowrap}.h23sp{flex:1}
.h23fxok{min-height:52px;min-width:120px;font-size:20px}
.h23fxt{display:flex;gap:8px;overflow-x:auto;flex:0 0 auto;padding:6px 2px 2px;width:100%;box-sizing:border-box}
.h23ft{position:relative;flex:0 0 auto;min-width:86px;min-height:62px;border-radius:16px;border:3px solid rgba(255,255,255,.5);background:rgba(255,255,255,.12);color:#FFF3D0;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 6px;font:inherit;cursor:pointer}
.h23ft .h23fti{width:64px;height:40px;border-radius:8px;overflow:hidden}.h23ft .h23fti svg{width:100%;height:100%;display:block}
.h23ft b{font-size:16px;font-weight:700}.h23ft.sel{border-color:#FFC24D;background:rgba(255,226,122,.28)}
.h23fn{position:absolute;top:-4px;right:-4px;min-width:22px;height:22px;border-radius:11px;background:#FF6F9E;color:#FFFFFF;font-style:normal;font-size:16px;font-weight:700;display:grid;place-items:center}
.h23fxi{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px;overflow:auto;min-height:0;padding:2px;width:100%;box-sizing:border-box;flex:1 1 auto}
.h23fit{position:relative;min-height:112px;border-radius:18px;border:3px solid #FFFFFF;background:#FFFFFF;color:#3A2A55;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;font:inherit;cursor:pointer;box-shadow:0 3px 0 rgba(16,10,56,.35)}
.h23fit .h23fth{width:96px;height:64px;border-radius:10px;background:#FFE9F1;overflow:hidden}.h23fit .h23fth svg{width:100%;height:100%;display:block}
.h23fit b{font-size:16px;line-height:1.2;text-align:center;color:#3A2A55}.h23fit small{font-size:16px;line-height:1.15;text-align:center;color:#8A6AB0}
.h23fit.on{border-color:#FFC24D;background:#FFF6DA;box-shadow:0 0 0 2px #FFC24D,0 3px 0 rgba(16,10,56,.35)}
.h23ck{position:absolute;top:4px;right:4px;width:26px;height:26px}.h23ck svg{width:100%;height:100%}
.h23fxnone{min-height:48px;font-size:18px;white-space:nowrap}
@media (max-width:600px),(max-height:500px){.overlay .card.h23fx{max-height:64%}.h23fxh h2{font-size:17px}.h23fxi{grid-template-columns:repeat(auto-fill,minmax(96px,1fr))}.h23fit .h23fth{width:84px;height:56px}.h23fit b{font-size:14px}.h23ft b{font-size:14px}.h23fit small{font-size:14px}.h23fxnone{font-size:15px;min-height:44px;padding:0 10px}.h23fxok{min-height:44px;min-width:76px;font-size:17px;padding:0 12px}}
@media (max-height:500px) and (orientation:landscape){.overlay .card.h23fx{max-height:82%;gap:6px;padding:8px 12px 10px!important}.h23ft .h23fti{display:none}.h23ft{min-height:44px;min-width:72px;justify-content:center}
 .h23fxi{grid-auto-flow:column;grid-template-columns:none;grid-auto-columns:100px;grid-template-rows:auto;overflow-x:auto;overflow-y:hidden;min-height:118px}.h23fit{min-height:110px}}
`;document.head.appendChild(css);
}catch(e){console.log('m9zj_home23',e)}}).toString()+')()')})();

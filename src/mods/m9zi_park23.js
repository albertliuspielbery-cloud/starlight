/* ================= 2.3 小遊戲重做：挖化石、雨林盪藤蔓（m9zi_park23.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 由 dev/mk_park23.py 從 dev/p23src/*.js 組出來，不要直接改這個檔。說明見 dev/park23.md。
 * 挖化石 fossil26：挖掘地（恐龍谷、森林山坡、海邊的化石場＝禮物 fs_beach）、每次隨機的恐龍（9 種，三角龍＝禮物 fs_tri）、小鏟子＋刷子、
 *   拼回去、數一數（照舊）、幫恐龍塗顏色（點一點塗／手指畫）、我的恐龍博物館；房間的小化石展示架。
 * 雨林盪藤蔓 vine6：照順序接香蕉（照舊）；路線每次不同、第 3、6 根後岔路自己選；動物朋友（雨林貼紙簿，小樹蛙＝禮物 vn_frog）；
 *   撿花和葉子佈置小樹屋；終點小樹屋或大瀑布（禮物 vn_falls）。不倒數、不會掉下去、沒有失敗。
 * 存檔：V2.p23（每個小朋友一份）；沒有這個欄位＝舊存檔，照常玩。台詞：lines/p23.tsv（P23_），沒錄音時只出字幕。
 * 動畫只用移動、旋轉（轉圈虛線框）、淡入、亮光；角色不放大縮小。prefers-reduced-motion／body.lite 停掉。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined'||typeof V2==='undefined')return;
/* ---------- 共用 ---------- */
const RMo=()=>{try{return !!reduced||matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite||document.body.classList.contains('lite')}catch(e){return false}};
let UID=0;const uid=p=>'p23'+(p||'')+(++UID).toString(36)+Math.random().toString(36).slice(2,5);
const f1=v=>(+v).toFixed(1);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const ST=()=>{if(!V2.p23||typeof V2.p23!=='object'||Array.isArray(V2.p23))V2.p23={};const o=V2.p23;
 if(!o.fm||typeof o.fm!=='object')o.fm={};if(!o.vs||typeof o.vs!=='object')o.vs={};if(!o.vb||typeof o.vb!=='object')o.vb={};if(!Array.isArray(o.th))o.th=[];return o};
const SV2=()=>{try{save2()}catch(e){}};
const gHas=id=>{try{return !!(window.G22&&typeof G22.has==='function'&&G22.has(id))}catch(e){return false}};
const gFresh=id=>{try{return !!G22.st().fresh[id]}catch(e){return false}};
const gSeen=id=>{try{const g=G22.st();if(g.fresh&&g.fresh[id]){delete g.fresh[id];save2()}}catch(e){}};
const CN=n=>{const c='零一二三四五六七八九';n=+n;if(n<=10)return n===10?'十':c[n];if(n<20)return '十'+c[n-10];return c[Math.floor(n/10)]+'十'+(n%10?c[n%10]:'')};
/* 語音：只念有真人錄音的句子；沒有錄音就只顯示字幕框的字（不走裝置語音） */
const vKey=p=>{if(p==null||p==='')return null;const u=String(typeof heroT==='function'?heroT(p):p).replace(/⁠/g,'').trim();
 if(/^\d+$/.test(u))return voHas('z|'+u)?'z|'+u:'n|'+(+u);return voHas('z|'+u)?'z|'+u:'z|'+voCk(u)};
const recd=p=>{try{if(!VO.idx)return false;const k=vKey(p);return !!k&&voHas(k)}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&recd(p));if(!a.length)return Promise.resolve(false);
 const q=[];a.forEach((t,i)=>{if(i)q.push({pause:180});q.push(t)});try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
function gems(key){if(window.__P5&&typeof __P5.gems==='function')return __P5.gems(key);const first=V2[key]!==today();V2[key]=today();SV2();const n=first?3:1;S.wallet+=n;try{save()}catch(e){}try{renderBar()}catch(e){}sfx('gem');return n}
const T26=window.__T26||{};

/*P23LINES*/
const TP={
"f_menu":"挖化石！要去哪裡挖呢？",
"f_site_valley":"恐龍谷",
"f_site_forest":"森林山坡",
"f_site_beach":"海邊的化石場",
"f_in_valley":"恐龍谷到了！沙子裡藏著一隻恐龍，是誰呢？先用小鏟子挖挖看！",
"f_in_forest":"森林山坡到了！泥土裡藏著一隻恐龍，是誰呢？先用小鏟子挖挖看！",
"f_in_beach":"海邊的化石場到了！這裡藏著很久以前住在海邊的動物，是誰呢？",
"t_shovel":"小鏟子",
"t_brush":"刷子",
"f_hit":"叮！碰到硬硬的化石了，換刷子輕輕刷！",
"n_stego":"劍龍","n_para":"鴨嘴龍","n_anky":"甲龍","n_plesio":"蛇頸龍","n_ptero":"翼龍",
"a_stego":"七塊化石都找到了！是劍龍！我們來把劍龍拼回去！",
"a_para":"七塊化石都找到了！是鴨嘴龍！我們來把鴨嘴龍拼回去！",
"a_anky":"七塊化石都找到了！是甲龍！我們來把甲龍拼回去！",
"a_plesio":"七塊化石都找到了！是蛇頸龍！我們來把蛇頸龍拼回去！",
"a_ptero":"六塊化石都找到了！是翼龍！我們來把翼龍拼回去！",
"q_stego":"劍龍拼好了！數一數，我們找到了幾塊化石？",
"q_para":"鴨嘴龍拼好了！數一數，我們找到了幾塊化石？",
"q_anky":"甲龍拼好了！數一數，我們找到了幾塊化石？",
"q_plesio":"蛇頸龍拼好了！數一數，我們找到了幾塊化石？",
"q_ptero":"翼龍拼好了！數一數，我們找到了幾塊化石？",
"p_plate":"是背上的骨板！","p_armor":"是背上的骨甲！","p_club":"是尾巴的大槌子！","p_crest":"是頭和頭冠！",
"p_lneck":"是長脖子！","p_ffl":"是前面的鰭！","p_bfl":"是後面的鰭！","p_lwing":"是左邊的翅膀！","p_rwing":"是右邊的翅膀！","p_leg":"是腳！",
"b_shell":"找到一個貝殼化石！貝殼也會變成化石喔。",
"b_leaf":"找到一片葉子化石！很久以前的植物也會留下樣子。",
"c_go":"幫恐龍塗顏色！",
"c_skip":"先不要塗",
"c_hi":"選一個顏色，點一點恐龍，幫牠塗上顏色！",
"c_finger":"也可以用手指畫畫喔！",
"c_tap":"點一點塗",
"c_draw":"手指畫",
"c_clear":"重來",
"c_done":"放進博物館",
"c_nice":"好漂亮！",
"m_title":"我的恐龍博物館",
"m_in":"放進我的恐龍博物館了！",
"m_hi":"這是我的恐龍博物館！點一點，看看你找到的恐龍。",
"m_new":"新的",
"m_what":"還沒找到，是誰呢？",
"m_paint":"重新塗顏色",
"m_close":"關起來",
"m_btn":"博物館",
"m_shelf":"這是我的小化石展示架！",
"m_room":"房間多了一個小化石展示架！",
"x_brachio":"腕龍的脖子很長，可以吃到高高的樹葉。",
"x_trex":"暴龍的牙齒很大，手卻小小的。",
"x_trike":"三角龍頭上有三支角，還有一個大大的頭盾。",
"x_stego":"劍龍的背上有一片一片的骨板，尾巴有尖尖的刺。",
"x_para":"鴨嘴龍的頭上有長長的頭冠，可能用來發出聲音。",
"x_anky":"甲龍身上有硬硬的骨甲，尾巴像一個大槌子。",
"x_plesio":"蛇頸龍住在海裡，用四個像槳一樣的鰭划水。牠也不是恐龍喔。",
"x_ptero":"翼龍會在天上飛，牠不是恐龍，是會飛的爬蟲類。",
"x_ammo":"菊石住在海裡，殼是一圈一圈捲起來的。",
"e_again":"再挖一次",
"e_site":"換一個地方",
"e_out":"回遊樂園",
"v_menu":"雨林盪藤蔓！今天要去哪裡呢？",
"v_to":"要去哪裡",
"v_dest_house":"小樹屋",
"v_dest_falls":"大瀑布",
"v_hi_house":"我們一起盪去小樹屋吧！照順序接香蕉！",
"v_hi_falls":"我們一起盪去大瀑布吧！照順序接香蕉！",
"z_trees":"大樹林","z_flowers":"花花藤","z_creek":"小溪邊","z_ferns":"蕨類森林","z_mist":"霧霧山谷","z_falls":"瀑布邊",
"v_fork":"前面有兩條路！你想走哪一條？",
"v_go":"出發，往這邊走！",
"v_friend":"看！有朋友在那裡，點牠打招呼！",
"v_hello":"你好！",
"v_sticker":"貼進雨林貼紙簿了！",
"v_arrive_house":"到小樹屋了！今天的冒險好開心！",
"v_arrive_falls":"到大瀑布了！水花亮晶晶，好漂亮！",
"v_sum":"今天的收穫",
"v_ban":"香蕉",
"v_friends":"遇到的朋友",
"v_flowers":"撿到的花和葉子",
"v_none":"下次再找找看",
"v_deco":"佈置小樹屋",
"v_book":"貼紙簿",
"v_house":"我的小樹屋",
"b_title":"雨林貼紙簿",
"b_hi":"這是雨林貼紙簿！遇到的朋友都在這裡。",
"b_what":"還沒遇到喔",
"h_title":"佈置小樹屋",
"h_hi":"選一朵花或一片葉子，再點小樹屋上發亮的圓圈，放上去！",
"h_none":"去雨林盪藤蔓，撿花和葉子回來佈置吧！",
"h_take":"拿下來了。",
"h_put":"放好了！",
"h_done":"好了",
"a_sloth":"我是樹懶，我動作很慢，常常倒掛在樹上。",
"a_ladybug":"我是瓢蟲，身上有小黑點，我會吃蚜蟲。",
"a_toucan":"我是大嘴鳥，嘴巴又大又彩色，我喜歡吃水果。",
"a_parrot":"我是鸚鵡，羽毛很鮮豔，我會用嘴巴和腳爬樹。",
"a_morpho":"我是藍色蝴蝶，翅膀亮亮的，我喜歡喝甜甜的果汁。",
"a_chame":"我是變色龍，兩隻眼睛可以各自轉來轉去。",
"a_capy":"我是水豚，我很會游泳，最喜歡泡在水裡。",
"a_frog":"我是小樹蛙，腳趾有圓圓的吸盤，可以黏在葉子上。",
"nm_sloth":"樹懶","nm_ladybug":"瓢蟲","nm_toucan":"大嘴鳥","nm_parrot":"鸚鵡","nm_morpho":"藍色蝴蝶","nm_chame":"變色龍","nm_capy":"水豚","nm_frog":"小樹蛙",
"it_f_pink":"粉紅花","it_f_yellow":"黃色小花","it_f_purple":"紫色花","it_f_orchid":"蘭花","it_f_red":"紅色花","it_l_heart":"愛心葉","it_l_fern":"蕨類葉子","it_l_big":"大葉子",
"g_fs_beach":"海邊的化石場打開了！可以去海邊挖化石了！",
"g_fs_tri":"劍龍的化石藏進挖掘地了，去挖挖看！",
"g_vn_falls":"可以盪去大瀑布了！",
"g_vn_frog":"小樹蛙來雨林了，去找牠玩！"
};
/*END*/

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

/* ---------- 新美術（全部程式畫 SVG；平塗＋柔和漸層、白色亮點、沒有黑色描邊） ---------- */
const lg=(i,a,b,x2=0,y2=1)=>`<linearGradient id="${i}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rg=(i,a,b)=>`<radialGradient id="${i}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const hl=(x,y,rx,ry,r=-30,o=.55)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${x} ${y})" fill="#fff" opacity="${o}"/>`;
const eye=(x,y,r=3)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#3A2A2A"/><circle cx="${f1(x+r*.35)}" cy="${f1(y-r*.4)}" r="${f1(r*.38)}" fill="#fff"/>`;
const blush=(x,y,r=3)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${f1(r*.62)}" fill="#FF9FB0" opacity=".6"/>`;
const shd=(cx,rx,cy)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${f1(rx*.14)}" fill="#3A2A5A" opacity=".16"/>`;
const sparkP=(x,y,r)=>`M${f1(x)} ${f1(y-r)} Q${f1(x+r*.18)} ${f1(y-r*.18)} ${f1(x+r)} ${f1(y)} Q${f1(x+r*.18)} ${f1(y+r*.18)} ${f1(x)} ${f1(y+r)} Q${f1(x-r*.18)} ${f1(y+r*.18)} ${f1(x-r)} ${f1(y)} Q${f1(x-r*.18)} ${f1(y-r*.18)} ${f1(x)} ${f1(y-r)}Z`;
const flw=(x,y,r,c,cc='#FFE27A',n=5)=>Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return `<circle cx="${f1(x+r*Math.sin(a))}" cy="${f1(y-r*Math.cos(a))}" r="${f1(r*.78)}" fill="${c}"/>`}).join('')+`<circle cx="${x}" cy="${y}" r="${f1(r*.6)}" fill="${cc}"/>`;
/* 禮物圖（64×64）：u＝唯一 id 前綴 */
const GART={
 fs_beach:u=>`<defs>${lg(u+'s','#BFE8FF','#E6F7FF')}${lg(u+'d','#FCE9C0','#EBC88A')}${lg(u+'w','#7FD0F0','#4FB0E0')}</defs>
  <rect class="p23bgx" x="4" y="6" width="56" height="52" rx="14" fill="url(#${u}s)"/>
  <g class="p23bgx"><path d="M4 30 Q16 26 28 30 Q40 34 60 28 V40 H4Z" fill="url(#${u}w)"/><path d="M8 31 Q14 29 20 31 M34 32 Q40 30 46 31" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M4 40 Q20 34 34 38 Q48 42 60 37 V50 Q60 58 52 58 H12 Q4 58 4 50Z" fill="url(#${u}d)"/></g>
  <g transform="translate(22 45) scale(1.25)"><circle r="7.4" fill="#FFF4E0"/><path d="M0 0 m-1.4 0 a1.4 1.4 0 1 1 2.8 0 a3 3 0 1 1 -6 0 a4.8 4.8 0 1 1 9.6 0" fill="none" stroke="#D9B27A" stroke-width="1.4"/></g>
  <g transform="translate(43 46) rotate(-12) scale(1.25)"><path d="M0 7 L-7 -1 Q-6 -7 0 -8 Q6 -7 7 -1Z" fill="#FFC8D8"/><path d="M0 6 L-4 -6 M0 6 V-7 M0 6 L4 -6" stroke="#F49AB6" stroke-width="1"/></g>
  <g class="p23bgx"><circle cx="50" cy="15" r="6" fill="#FFE27A"/>${hl(14,14,4,2,-20,.7)}</g>
  <g class="g22fx"><path d="${sparkP(12,48,3)}" fill="#fff"/><path d="${sparkP(56,44,2.4)}" fill="#FFE27A"/></g>`,
 fs_tri:u=>`<defs>${lg(u+'d','#F6DDB0','#E2BC84')}${lg(u+'b','#FFFBF2','#F2E2C6')}</defs>
  <path d="M4 48 Q18 40 32 43 Q46 46 60 41 V54 Q60 60 54 60 H10 Q4 60 4 54Z" fill="url(#${u}d)"/>
  ${[[14,40,15],[24,38,20],[35,38,20],[45,40,14]].map(([x,y,h])=>`<path d="M${x-5} ${y} L${x-4} ${y-h*.55} L${x} ${y-h} L${x+4} ${y-h*.55} L${x+5} ${y}Z" fill="url(#${u}b)"/><path d="M${x} ${y-h+4} V${y-1}" stroke="#E2C69A" stroke-width="1.2"/>`).join('')}
  <path d="M8 44 Q30 36 52 42" stroke="#F2E2C6" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M46 44 Q50 36 58 38 Q62 42 58 46 Q52 48 46 44Z" fill="url(#${u}b)"/><circle cx="54" cy="41" r="1.8" fill="#C9A878"/>
  <path d="M6 44 L2 38 M9 44 L7 36" stroke="#F2E2C6" stroke-width="2.6" stroke-linecap="round"/>${hl(22,26,1.6,4,-20,.7)}
  <g class="g22fx"><path d="${sparkP(10,12,3.4)}" fill="#FFE27A"/><path d="${sparkP(56,24,2.4)}" fill="#fff"/></g>`,
 vn_falls:u=>`<defs>${lg(u+'r','#9AD87A','#5FAE4A')}${lg(u+'w','#E6F8FF','#8FD8F6')}${lg(u+'p','#8FD8F6','#5BB8E8')}</defs>
  <g class="p23bgx"><path d="M4 10 Q4 4 10 4 H24 V40 H4Z" fill="url(#${u}r)"/><path d="M40 4 H54 Q60 4 60 10 V40 H40Z" fill="url(#${u}r)"/></g>
  <path d="M22 4 H42 V44 H22Z" fill="url(#${u}w)"/>${[26,31,36,40].map(x=>`<path d="M${x} 6 V42" stroke="#fff" stroke-width="1.6" opacity=".8" stroke-linecap="round"/>`).join('')}
  <path d="M4 40 Q32 34 60 40 V54 Q60 60 54 60 H10 Q4 60 4 54Z" fill="url(#${u}p)"/>
  <path d="M10 22 Q32 2 54 22" stroke="#FF9FB8" stroke-width="2.4" fill="none" opacity=".75"/><path d="M12 24 Q32 6 52 24" stroke="#FFE27A" stroke-width="2.4" fill="none" opacity=".75"/><path d="M14 26 Q32 10 50 26" stroke="#8FE0A8" stroke-width="2.4" fill="none" opacity=".75"/>
  ${flw(10,46,2.6,'#FF9FC8')}${flw(54,48,2.4,'#FFD24D','#FF9F5A')}<ellipse cx="32" cy="44" rx="12" ry="3" fill="#fff" opacity=".7"/>
  <g class="g22fx"><path d="${sparkP(18,40,2.6)}" fill="#fff"/><path d="${sparkP(46,38,2.2)}" fill="#fff"/></g>`,
 vn_frog:u=>`<defs>${lg(u+'l','#8EDB7A','#4FA84A')}${rg(u+'f','#9AF08A','#3FB860')}</defs>
  ${shd(32,22,59)}<path d="M6 50 Q14 30 34 30 Q56 32 60 50 Q40 60 6 50Z" fill="url(#${u}l)"/><path d="M10 50 Q32 40 58 49" stroke="#C8F0B0" stroke-width="1.4" fill="none"/>
  <ellipse cx="32" cy="40" rx="16" ry="12" fill="url(#${u}f)"/>
  <circle cx="23" cy="27" r="7" fill="url(#${u}f)"/><circle cx="41" cy="27" r="7" fill="url(#${u}f)"/>
  <circle cx="23" cy="27" r="4.4" fill="#FFE27A"/><circle cx="41" cy="27" r="4.4" fill="#FFE27A"/>${eye(23,27.4,2.6)}${eye(41,27.4,2.6)}
  <ellipse cx="32" cy="44" rx="9" ry="6" fill="#E8FFD8" opacity=".8"/><path d="M27 39 Q32 42.6 37 39" stroke="#2E7A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  ${blush(21,38,2.6)}${blush(43,38,2.6)}${[[16,50],[48,50]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#7EE07A"/>`).join('')}${hl(26,34,3,1.6,-20,.6)}
  <g class="g22fx"><path d="${sparkP(54,14,3)}" fill="#FFE27A"/></g>`};
function stripFx(s){let i;while((i=s.indexOf('<g class="g22fx">'))>=0){let d=0,j=i;const re=/<g[\s>]|<\/g>/g;re.lastIndex=i;let m;
  while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0){j=m.index+4;break}}else d++}if(d!==0){s=s.slice(0,i);break}s=s.slice(0,i)+s.slice(j)}return s}
function stripBg(s){s=s.replace(/<rect class="p23bgx"[^>]*\/>/g,'');return s.replace(/<g class="p23bgx">/g,'<g class="g22fx">').replace(/^/,'')}
const gInner=id=>GART[id]?GART[id](uid('g')):'';
const gSvg=id=>`<svg viewBox="0 0 64 64" aria-hidden="true">${gInner(id)}</svg>`;
const gSil=(id,c)=>{let s=stripFx(stripBg(gInner(id))).replace(/<ellipse cx="[\d.]+" cy="59"[^>]*\/>/g,'');s=s.replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="'+(c||'#8C7CE6')+'"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'');return `<svg viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`};
try{if(window.G22){G22.ART=G22.ART||{};G22.SIL=G22.SIL||{};Object.keys(GART).forEach(id=>{
 try{Object.defineProperty(G22.ART,id,{enumerable:true,configurable:true,get:()=>gSvg(id)})}catch(e){}
 try{Object.defineProperty(G22.SIL,id,{enumerable:true,configurable:true,get:()=>gSil(id)})}catch(e){}})}}catch(e){console.log('p23 g22art',e)}
/* 工具小圖 */
const ICO={
 shovel:u=>`<defs>${lg(u+'m','#E8EEF8','#A8B8D0')}${lg(u+'h','#FFB35C','#E0782E')}</defs><path d="M38 8 L46 16 L30 32 L26 28Z" fill="url(#${u}h)"/><path d="M28 26 L34 32 Q30 46 16 52 Q8 54 10 46 Q14 32 28 26Z" fill="url(#${u}m)"/>${hl(17,42,2,5,40,.8)}<circle cx="44" cy="10" r="5" fill="url(#${u}h)"/>`,
 brush:u=>`<defs>${lg(u+'h','#C99A6A','#8E6248')}${lg(u+'b','#FFE9A8','#F0C060')}</defs><path d="M44 6 L52 14 L36 30 L30 24Z" fill="url(#${u}h)"/><rect x="22" y="22" width="14" height="10" rx="2" transform="rotate(45 29 27)" fill="#C8CCD8"/><path d="M24 30 L32 38 Q26 50 12 54 Q14 40 24 30Z" fill="url(#${u}b)"/><path d="M15 50 L24 38 M19 52 L28 40" stroke="#E0A840" stroke-width="1.4" stroke-linecap="round"/>`,
 museum:u=>`<defs>${lg(u+'r','#FFE9C0','#E8C08A')}</defs><path d="M8 24 L32 8 L56 24Z" fill="#B99CFF"/><rect x="10" y="24" width="44" height="4" fill="#9A7AE8"/>${[14,25,36,47].map(x=>`<rect x="${x}" y="29" width="4" height="20" rx="1.4" fill="url(#${u}r)"/>`).join('')}<rect x="8" y="49" width="48" height="6" rx="2" fill="#9A7AE8"/><circle cx="32" cy="18" r="3" fill="#FFE27A"/>`,
 book:u=>`<defs>${lg(u+'c','#8EDB7A','#4FA84A')}</defs><rect x="10" y="8" width="44" height="48" rx="6" fill="url(#${u}c)"/><rect x="14" y="8" width="4" height="48" fill="#3F8A3A" opacity=".5"/>${flw(36,26,5,'#FF9FC8')}<rect x="24" y="40" width="24" height="5" rx="2.5" fill="#fff" opacity=".8"/>${hl(46,14,2,4,-20,.6)}`,
 house:u=>`<defs>${lg(u+'w','#E8B878','#B98450')}</defs><rect x="28" y="36" width="8" height="22" fill="#8A5A36"/><path d="M14 22 L32 8 L50 22Z" fill="#FF8FB0"/><rect x="18" y="22" width="28" height="16" rx="2" fill="url(#${u}w)"/><rect x="28" y="26" width="8" height="12" rx="3" fill="#7A4A2A"/><circle cx="12" cy="40" r="7" fill="#7CC46A"/><circle cx="52" cy="42" r="8" fill="#6AB85A"/>`};
const ico=k=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ICO[k](uid('i'))}</svg>`;
/* 雨林朋友（100×100，腳 y≈94） */
const ANI={
 toucan:u=>`<defs>${lg(u+'b','#4A4470','#2A2650')}${lg(u+'k','#FFE066','#FF9A3C',1,0)}</defs>${shd(50,22,95)}
  <path d="M30 90 H74" stroke="#8A5A36" stroke-width="6" stroke-linecap="round"/>
  <path d="M40 92 Q24 96 22 80 Q30 84 40 82Z" fill="#2A2650"/><ellipse cx="44" cy="62" rx="20" ry="26" fill="url(#${u}b)"/>
  <ellipse cx="50" cy="58" rx="11" ry="14" fill="#FFF3B0"/><ellipse cx="46" cy="82" rx="10" ry="5" fill="#FF8A9A"/>
  <circle cx="46" cy="36" r="17" fill="url(#${u}b)"/><path d="M52 30 Q78 22 94 34 Q96 42 86 46 Q70 50 54 44Z" fill="url(#${u}k)"/><path d="M86 34 Q96 36 94 42 Q90 44 86 42Z" fill="#FF6A6A"/><path d="M56 40 Q74 44 90 42" stroke="#E08A2A" stroke-width="1.4" fill="none"/>
  <circle cx="46" cy="33" r="7" fill="#7FD0FF"/>${eye(46,33,3.4)}${blush(52,44,3)}${hl(36,52,3,7,-10,.25)}<path d="M40 92 v-4 M50 92 v-4" stroke="#7A7A9A" stroke-width="3" stroke-linecap="round"/>`,
 parrot:u=>`<defs>${lg(u+'r','#FF7A6A','#E04A4A')}${lg(u+'w','#7FC4FF','#4A8AE8')}</defs>${shd(50,22,95)}
  <path d="M30 88 H72" stroke="#8A5A36" stroke-width="6" stroke-linecap="round"/>
  <path d="M46 84 L40 99 L50 96 L56 99 L54 84Z" fill="url(#${u}w)"/><ellipse cx="50" cy="62" rx="18" ry="24" fill="url(#${u}r)"/>
  <path d="M36 52 Q26 70 40 84 Q48 74 46 56Z" fill="#FFD24D"/><path d="M38 62 Q30 76 42 86 Q46 78 44 66Z" fill="url(#${u}w)"/>
  <circle cx="52" cy="34" r="17" fill="url(#${u}r)"/><ellipse cx="60" cy="32" rx="7" ry="8" fill="#FFF4EC"/>${eye(60,31,3.2)}
  <path d="M64 38 Q76 36 74 48 Q70 52 66 46 Q64 44 62 44Z" fill="#E8E0D8"/><path d="M64 44 Q68 46 72 44" stroke="#B8B0A8" stroke-width="1.2" fill="none"/>${blush(54,44,3)}${hl(44,26,3,6,-30,.4)}
  <path d="M44 88 v-4 M56 88 v-4" stroke="#7A7A9A" stroke-width="3" stroke-linecap="round"/>`,
 morpho:u=>`<defs>${rg(u+'w','#9AE0FF','#2E7AE8')}</defs>
  <path d="M48 46 Q20 14 10 26 Q4 44 26 54 Q40 56 48 50Z" fill="url(#${u}w)"/><path d="M52 46 Q80 14 90 26 Q96 44 74 54 Q60 56 52 50Z" fill="url(#${u}w)"/>
  <path d="M48 54 Q24 58 22 74 Q30 86 46 66Z" fill="url(#${u}w)"/><path d="M52 54 Q76 58 78 74 Q70 86 54 66Z" fill="url(#${u}w)"/>
  <path d="M10 26 Q4 44 26 54 M90 26 Q96 44 74 54" stroke="#BFEFFF" stroke-width="3" fill="none" opacity=".8"/>
  ${hl(26,30,6,3,-30,.6)}${hl(74,30,6,3,30,.6)}<ellipse cx="50" cy="56" rx="4.4" ry="18" fill="#5A4A7A"/><circle cx="50" cy="36" r="7" fill="#6A5A8A"/>
  ${eye(47.4,35,1.8)}${eye(52.6,35,1.8)}<path d="M47 30 Q42 18 36 16 M53 30 Q58 18 64 16" stroke="#6A5A8A" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="36" cy="16" r="2" fill="#6A5A8A"/><circle cx="64" cy="16" r="2" fill="#6A5A8A"/>`,
 chame:u=>`<defs>${lg(u+'g','#9AE87A','#3FB860')}</defs>${shd(50,26,95)}
  <path d="M14 88 Q50 80 90 88" stroke="#8A5A36" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M30 72 Q12 74 14 60 Q16 50 26 54 Q30 58 26 62 Q22 62 22 60" stroke="url(#${u}g)" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M28 76 Q30 52 54 48 Q74 46 80 62 Q82 76 64 80 Q44 84 28 76Z" fill="url(#${u}g)"/>
  <path d="M34 62 Q50 56 72 60" stroke="#FFE27A" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>
  <path d="M60 52 Q74 38 88 50 Q92 62 80 64 Z" fill="url(#${u}g)"/><circle cx="74" cy="54" r="7" fill="#7AD86A"/>${eye(75,54,3)}
  <path d="M82 62 Q86 64 88 61" stroke="#2E7A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>${blush(80,60,2.4)}
  <path d="M40 80 L36 88 M66 80 L70 88" stroke="#3FB860" stroke-width="5" stroke-linecap="round"/>${hl(52,56,5,2.4,-10,.5)}`,
 capy:u=>`<defs>${lg(u+'c','#C8946A','#9A6A44')}</defs>${shd(50,30,95)}
  <ellipse cx="46" cy="70" rx="32" ry="22" fill="url(#${u}c)"/><path d="M28 88 v6 M40 90 v4 M58 90 v4 M68 88 v6" stroke="#8A5A36" stroke-width="7" stroke-linecap="round"/>
  <path d="M62 56 Q66 36 82 38 Q94 42 94 56 Q94 68 82 70 Q68 70 62 56Z" fill="url(#${u}c)"/><ellipse cx="90" cy="56" rx="5" ry="6" fill="#8A5A36"/>
  <circle cx="72" cy="40" r="4" fill="#9A6A44"/><circle cx="72" cy="40" r="2" fill="#E8B898"/>${eye(80,48,2.8)}${blush(84,58,3)}
  <path d="M86 62 Q88 64 90 62" stroke="#6A3A2A" stroke-width="1.4" fill="none"/>${hl(34,58,8,3,-10,.35)}
  <g transform="translate(70 30)">${flw(0,0,3,'#FFB3D1')}</g>`,
 frog:u=>`<defs>${lg(u+'l','#8EDB7A','#4FA84A')}${rg(u+'f','#9AF08A','#3FB860')}</defs>${shd(50,30,95)}
  <path d="M14 92 Q26 70 52 70 Q80 72 88 92 Q52 100 14 92Z" fill="url(#${u}l)"/>
  <ellipse cx="50" cy="72" rx="22" ry="16" fill="url(#${u}f)"/><circle cx="38" cy="54" r="10" fill="url(#${u}f)"/><circle cx="62" cy="54" r="10" fill="url(#${u}f)"/>
  <circle cx="38" cy="54" r="6.4" fill="#FFE27A"/><circle cx="62" cy="54" r="6.4" fill="#FFE27A"/>${eye(38,54.6,3.6)}${eye(62,54.6,3.6)}
  <ellipse cx="50" cy="78" rx="12" ry="8" fill="#E8FFD8" opacity=".8"/><path d="M42 68 Q50 73 58 68" stroke="#2E7A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${blush(34,66,3.4)}${blush(66,66,3.4)}${[[28,86],[72,86],[36,90],[64,90]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="#7EE07A"/>`).join('')}${hl(40,62,4,2,-20,.6)}`};
const AORD=['sloth','ladybug','toucan','parrot','morpho','chame','capy','frog'];
const AGIFT={frog:'vn_frog'};
const aniInner=k=>{try{if(k==='sloth')return CH36.sloth.f();if(k==='ladybug')return CH36.ladybug.f()}catch(e){}return ANI[k]?ANI[k](uid('a')):''};
const aniSVG=(k,attr)=>`<svg viewBox="0 0 100 100" ${attr||''} aria-hidden="true">${aniInner(k)}</svg>`;
const aniSil=k=>`<svg viewBox="0 0 100 100" aria-hidden="true">${stripFx(aniInner(k)).replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="#CFC2EE"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'')}</svg>`;
/* 花和葉子（64×64） */
const ITM={
 f_pink:u=>`<defs>${rg(u+'p','#FFD0E4','#FF7FB0')}</defs><path d="M32 40 Q30 52 34 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/>${[0,72,144,216,288].map(a=>`<ellipse cx="32" cy="17" rx="9" ry="13" transform="rotate(${a} 32 30)" fill="url(#${u}p)"/>`).join('')}<circle cx="32" cy="30" r="6" fill="#FFE27A"/>${hl(26,16,2.4,4,-30,.7)}`,
 f_yellow:u=>`<defs>${rg(u+'y','#FFF6B0','#FFC83A')}</defs><path d="M32 40 Q34 52 30 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/>${Array.from({length:8},(_,i)=>`<ellipse cx="32" cy="16" rx="5" ry="11" transform="rotate(${i*45} 32 28)" fill="url(#${u}y)"/>`).join('')}<circle cx="32" cy="28" r="7" fill="#E89A3A"/>${hl(29,25,2,1.4,-30,.6)}`,
 f_purple:u=>`<defs>${rg(u+'v','#E8D8FF','#A27AF0')}</defs><path d="M32 36 Q30 50 32 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M32 30 Q14 8 10 22 Q8 34 32 30Z M32 30 Q50 8 54 22 Q56 34 32 30Z M32 30 Q20 50 30 52 Q34 50 32 30Z M32 30 Q44 50 34 52" fill="url(#${u}v)"/><circle cx="32" cy="30" r="4" fill="#FFE27A"/>${hl(18,18,2,4,-40,.7)}`,
 f_orchid:u=>`<defs>${rg(u+'o','#FFFFFF','#F4C6E6')}</defs><path d="M32 40 Q36 52 32 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="26" rx="12" ry="8" fill="url(#${u}o)"/><ellipse cx="44" cy="26" rx="12" ry="8" fill="url(#${u}o)"/><ellipse cx="32" cy="14" rx="7" ry="10" fill="url(#${u}o)"/><path d="M26 30 Q32 46 38 30 Q32 34 26 30Z" fill="#E86AA8"/><circle cx="32" cy="28" r="3" fill="#FFE27A"/>`,
 f_red:u=>`<defs>${lg(u+'r','#FF8A8A','#E8404A')}</defs><path d="M32 30 Q32 48 34 60" stroke="#4FA84A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M32 34 Q18 30 18 16 Q26 20 30 12 Q32 20 34 12 Q38 20 46 16 Q46 30 32 34Z" fill="url(#${u}r)"/><path d="M32 34 V44" stroke="#FFE27A" stroke-width="2.4" stroke-linecap="round"/><circle cx="32" cy="45" r="2.4" fill="#FFE27A"/>${hl(24,20,2,4,-20,.6)}`,
 l_heart:u=>`<defs>${lg(u+'g','#A8E88A','#4FA84A')}</defs><path d="M32 56 Q8 38 10 22 Q14 10 26 14 Q30 16 32 22 Q34 16 38 14 Q50 10 54 22 Q56 38 32 56Z" fill="url(#${u}g)"/><path d="M32 54 V22" stroke="#DFF8C8" stroke-width="2" stroke-linecap="round"/><path d="M32 40 L22 32 M32 34 L42 26 M32 46 L42 38" stroke="#DFF8C8" stroke-width="1.4" stroke-linecap="round"/>${hl(20,22,3,5,-30,.5)}`,
 l_fern:u=>`<defs>${lg(u+'g','#9AE07A','#3F9A4A')}</defs><path d="M20 58 Q30 30 46 8" stroke="#3F8A3A" stroke-width="2.6" fill="none" stroke-linecap="round"/>${Array.from({length:8},(_,i)=>{const t=i/8,x=20+26*t+t*t*0,y=58-50*t;const s=9-i*.8;return `<ellipse cx="${f1(x-s*.7)}" cy="${f1(y-2)}" rx="${f1(s)}" ry="${f1(s*.38)}" transform="rotate(-30 ${f1(x)} ${f1(y)})" fill="url(#${u}g)"/><ellipse cx="${f1(x+s*.7)}" cy="${f1(y-2)}" rx="${f1(s)}" ry="${f1(s*.38)}" transform="rotate(20 ${f1(x)} ${f1(y)})" fill="url(#${u}g)"/>`}).join('')}`,
 l_big:u=>`<defs>${lg(u+'g','#7ED86A','#2E8A4A')}</defs><path d="M32 60 V48" stroke="#3F8A3A" stroke-width="3" stroke-linecap="round"/><path d="M32 50 Q6 46 6 26 Q8 6 32 6 Q56 6 58 26 Q58 46 32 50Z" fill="url(#${u}g)"/><path d="M32 48 V10" stroke="#CFF4B8" stroke-width="2" stroke-linecap="round"/><path d="M12 22 Q20 24 24 20 M10 34 Q18 34 22 30 M52 22 Q44 24 40 20 M54 34 Q46 34 42 30" stroke="#CFF4B8" stroke-width="3" stroke-linecap="round" fill="none"/>${hl(20,14,3,6,-40,.45)}`};
const IORD=['f_pink','f_yellow','f_purple','f_orchid','f_red','l_heart','l_fern','l_big'];
const itmSVG=k=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ITM[k]?ITM[k](uid('t')):''}</svg>`;
/* 小樹屋（800×500）；SLOTS＝可以放花葉的圓點 */
const HSLOT=[[250,150],[330,110],[410,96],[490,110],[570,150],[300,236],[520,236],[350,300],[470,300],[240,372],[580,372],[410,206]];
function treeHouse(u){u=u||uid('h');return `<defs>${lg(u+'sky','#BFE8FF','#E8F8FF')}${lg(u+'t','#B8865A','#8A5A36',1,0)}${lg(u+'w','#F0C890','#C89A60')}${lg(u+'r','#FF9FB8','#E86A8A')}${rg(u+'lf','#9AE07A','#3F9A4A')}</defs>
 <rect width="800" height="500" fill="url(#${u}sky)"/><circle cx="700" cy="70" r="38" fill="#FFE27A" opacity=".85"/>
 <path d="M0 440 Q200 410 400 430 Q600 450 800 420 V500 H0Z" fill="#8ED47A"/>
 <circle cx="130" cy="120" r="110" fill="url(#${u}lf)"/><circle cx="690" cy="170" r="120" fill="url(#${u}lf)"/><circle cx="400" cy="40" r="140" fill="url(#${u}lf)" opacity=".95"/>
 <path d="M360 480 Q370 380 362 300 H458 Q450 380 462 480Z" fill="url(#${u}t)"/><path d="M380 470 Q386 400 380 320" stroke="#C8966A" stroke-width="6" fill="none" opacity=".6"/>
 <rect x="210" y="320" width="400" height="22" rx="10" fill="#9A6A40"/>${[230,290,350,470,530,590].map(x=>`<rect x="${x-5}" y="276" width="10" height="46" rx="4" fill="#B88A5A"/>`).join('')}<rect x="216" y="270" width="388" height="10" rx="5" fill="#C89A6A"/>
 <rect x="250" y="150" width="320" height="130" rx="14" fill="url(#${u}w)"/>${[180,210,240].map(y=>`<path d="M256 ${y} H564" stroke="#B88A5A" stroke-width="3" opacity=".45"/>`).join('')}
 <path d="M220 160 L410 60 L600 160Z" fill="url(#${u}r)"/><path d="M240 156 L410 68 L580 156" stroke="#FFD0DC" stroke-width="6" fill="none" opacity=".6"/>
 <rect x="380" y="190" width="60" height="90" rx="26" fill="#8A5A36"/><circle cx="428" cy="238" r="5" fill="#FFE27A"/>
 <rect x="282" y="186" width="64" height="54" rx="10" fill="#BFE8FF"/><path d="M314 186 V240 M282 213 H346" stroke="#F0C890" stroke-width="5"/>
 <rect x="474" y="186" width="64" height="54" rx="10" fill="#BFE8FF"/><path d="M506 186 V240 M474 213 H538" stroke="#F0C890" stroke-width="5"/>
 <path d="M640 342 V480 M680 342 V480" stroke="#C89A6A" stroke-width="8"/>${[370,400,430,460].map(y=>`<path d="M640 ${y} H680" stroke="#C89A6A" stroke-width="7"/>`).join('')}
 ${hl(300,200,6,12,-20,.5)}${hl(490,200,6,12,-20,.5)}`}
/* 大瀑布（800×450，終點用） */
function bigFalls(u){u=u||uid('w');return `<defs>${lg(u+'w','#F2FCFF','#9ADCF6')}${lg(u+'p','#9ADCF6','#4FB0E0')}${lg(u+'r','#8ED47A','#4F9A4A')}</defs>
 <path d="M0 0 H300 V330 H0Z" fill="url(#${u}r)"/><path d="M500 0 H800 V330 H500Z" fill="url(#${u}r)"/>
 <path d="M290 0 H510 V340 H290Z" fill="url(#${u}w)"/>${[310,340,370,400,430,460,490].map(x=>`<path d="M${x} 0 V336" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round" class="p23fall"/>`).join('')}
 <path d="M0 320 Q400 290 800 320 V450 H0Z" fill="url(#${u}p)"/><ellipse cx="400" cy="335" rx="150" ry="22" fill="#fff" opacity=".75"/>
 ${['#FF9FB8','#FFD24D','#8FE0A8','#7FC4FF','#B99CFF'].map((c,i)=>`<path d="M${120+i*10} 330 Q400 ${40+i*10} ${680-i*10} 330" stroke="${c}" stroke-width="9" fill="none" opacity=".55"/>`).join('')}
 ${flw(90,350,10,'#FF9FC8')}${flw(720,360,9,'#FFD24D','#FF9F5A')}${flw(160,380,8,'#B99CFF')}`}
/* 雨林的地方：疊在原本雨林背景上的裝飾（800×450） */
function zoneDeco(z,u){u=u||uid('z');
 if(z==='flowers')return `<g opacity=".95">${[90,230,380,520,660].map((x,i)=>`<path d="M${x} 0 Q${x+20} 60 ${x-6} 120" stroke="#5FAE4A" stroke-width="4" fill="none"/>${flw(x+8,40,7,['#FF9FC8','#FFD24D','#B99CFF','#FF8A8A','#FFB3D1'][i])}${flw(x-2,92,6,['#FFD24D','#FF9FC8','#FFB3D1','#B99CFF','#FF8A8A'][i])}`).join('')}${[[60,410],[200,430],[640,420],[740,400]].map(([x,y],i)=>flw(x,y,9,['#FF9FC8','#FFD24D','#B99CFF','#FF8A8A'][i])).join('')}</g><rect width="800" height="450" fill="#FFB3D1" opacity=".08"/>`;
 if(z==='creek')return `<defs>${lg(u+'c','#9ADCF6','#4FB0E0')}</defs><path d="M0 380 Q200 350 400 372 Q600 394 800 360 V450 H0Z" fill="url(#${u}c)" opacity=".92"/>${[[120,380],[330,392],[560,396],[700,372]].map(([x,y])=>`<path d="M${x-26} ${y} Q${x} ${y-6} ${x+26} ${y}" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>`).join('')}${[[80,420,16],[260,430,12],[470,426,18],[690,430,14]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.6}" fill="#B8B0C8"/>`).join('')}`;
 if(z==='ferns')return `<g>${[[40,450,1],[180,460,.8],[600,455,.9],[760,450,1.1]].map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})">${[-60,-30,0,30,60].map(a=>`<path d="M0 0 Q${a} -80 ${a*1.6} -140" stroke="#3F9A4A" stroke-width="5" fill="none"/>${Array.from({length:6},(_,i)=>`<ellipse cx="${f1(a*.3*(i/6+.2)*2)}" cy="${-20-i*20}" rx="14" ry="5" transform="rotate(${a/2} 0 ${-20-i*20})" fill="#5FB85A"/>`).join('')}`).join('')}</g>`).join('')}</g><rect width="800" height="450" fill="#2E8A4A" opacity=".08"/>`;
 if(z==='mist')return `<g opacity=".7"><path d="M0 250 Q200 210 400 240 Q600 270 800 230 V300 Q600 330 400 300 Q200 270 0 310Z" fill="#fff"/><path d="M0 350 Q250 320 500 350 Q650 370 800 340 V400 Q600 420 400 400 Q200 380 0 410Z" fill="#fff" opacity=".8"/></g><rect width="800" height="450" fill="#E8F0FF" opacity=".18"/>`;
 if(z==='falls')return `<defs>${lg(u+'f','#F2FCFF','#9ADCF6')}</defs><path d="M560 0 H700 V360 H560Z" fill="url(#${u}f)" opacity=".95"/>${[575,600,625,650,675].map(x=>`<path d="M${x} 0 V350" stroke="#fff" stroke-width="4" opacity=".7" class="p23fall"/>`).join('')}<path d="M480 360 Q630 330 780 362 V420 H480Z" fill="#7FC8EC"/><ellipse cx="630" cy="364" rx="90" ry="14" fill="#fff" opacity=".7"/>`;
 return `<defs>${lg(u+'t','#A87A50','#7A5232',1,0)}</defs><g><path d="M0 450 V0 H46 Q36 200 58 450Z" fill="url(#${u}t)"/><path d="M800 450 V0 H752 Q766 220 742 450Z" fill="url(#${u}t)"/>${[[60,40],[110,110],[700,60],[740,140],[250,20],[560,30]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0 0 Q6 40 -4 90" stroke="#4F9A4A" stroke-width="4" fill="none"/>${[20,45,70].map(t=>`<ellipse cx="${t%2?6:-6}" cy="${t}" rx="10" ry="5" fill="#6FBF5A" transform="rotate(${t%2?30:-30} ${t%2?6:-6} ${t})"/>`).join('')}</g>`).join('')}${[[150,300],[640,290]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="60" ry="22" fill="#4F9A4A" opacity=".35"/>`).join('')}</g>`}
const zoneThumb=z=>{const u=uid('m');return `<defs>${lg(u+'s','#D8F4E0','#9ADB8A')}</defs><rect width="800" height="450" fill="url(#${u}s)"/>${[[120,60,150],[690,40,170],[400,-30,160]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#5FAE4A"/>`).join('')}<path d="M170 450 V140 H215 V450Z M590 450 V120 H635 V450Z" fill="#8A5A36"/><path d="M0 380 Q400 340 800 380 V450 H0Z" fill="#6FBF5A"/>${zoneDeco(z)}`};
const ZONES=['trees','flowers','creek','ferns','mist'];
const ZFR={trees:['sloth','toucan','parrot'],flowers:['morpho','ladybug','parrot'],creek:['capy','frog','toucan'],ferns:['chame','ladybug','frog'],mist:['sloth','morpho','chame'],falls:['capy','parrot','frog']};
/* 房間的小化石展示架（約 130×70） */
// 地上的小木架（68×110，腳 y≈108），三層各放一隻（最新的在最上面）
function shelfArt(list){const u=uid('s');const fm=ST().fm;return `<defs>${lg(u+'w','#D8A870','#A87A48',1,0)}${lg(u+'b','#FFF4E4','#F2DEC0')}</defs>
 <rect x="2" y="2" width="64" height="104" rx="8" fill="url(#${u}b)"/><rect x="0" y="0" width="6" height="108" rx="3" fill="url(#${u}w)"/><rect x="62" y="0" width="6" height="108" rx="3" fill="url(#${u}w)"/>
 <rect x="-2" y="-2" width="72" height="7" rx="3.5" fill="#C8965E"/>${[36,70,104].map(y=>`<rect x="0" y="${y}" width="68" height="5" rx="2.5" fill="url(#${u}w)"/>`).join('')}
 ${list.slice(0,3).map((k,i)=>`<svg x="5" y="${4+i*34}" width="58" height="33" viewBox="0 0 600 340">${dinoPaint(k,fm[k]&&fm[k].c,fm[k]&&fm[k].p)}</svg>`).join('')}
 <ellipse cx="34" cy="109" rx="34" ry="3" fill="#3A2A5A" opacity=".18"/>${hl(12,16,2,8,0,.5)}<path d="${sparkP(62,6,5)}" fill="#FFE27A"/>`}

/* =====================================================================
 * 挖化石（新版）：挖掘地、隨機恐龍、小鏟子＋刷子、拼回去、數一數、塗顏色、恐龍博物館
 * ===================================================================== */
const FLV={easy:{brush:44,tol:90,outline:1,shovel:68},mid:{brush:36,tol:68,outline:1,shovel:60},hard:{brush:28,tol:50,outline:0,shovel:52}};
const sitePic=k=>{const u=uid('p');
 if(k==='forest')return `<svg viewBox="0 0 120 64" aria-hidden="true"><defs>${lg(u+'a','#BFE8C8','#E8F8E8')}${lg(u+'b','#C8A47C','#A98460')}</defs><rect width="120" height="64" rx="12" fill="url(#${u}a)"/><circle cx="20" cy="24" r="16" fill="#7CC46A"/><circle cx="100" cy="20" r="18" fill="#5FAE4A"/><path d="M0 40 Q40 24 80 34 Q100 38 120 30 V52 Q120 64 108 64 H12 Q0 64 0 52Z" fill="url(#${u}b)"/><path d="M50 50 Q60 44 70 50" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="48" cy="51" r="3" fill="#FFF4E0"/><circle cx="72" cy="51" r="3" fill="#FFF4E0"/></svg>`;
 if(k==='beach')return `<svg viewBox="0 0 120 64" aria-hidden="true"><defs>${lg(u+'a','#BFE8FF','#E6F7FF')}${lg(u+'w','#7FD0F0','#4FB0E0')}${lg(u+'b','#FCEBC4','#F2D49A')}</defs><rect width="120" height="64" rx="12" fill="url(#${u}a)"/><circle cx="98" cy="16" r="8" fill="#FFE27A"/><path d="M0 28 Q30 22 60 28 Q90 34 120 26 V40 H0Z" fill="url(#${u}w)"/><path d="M0 40 Q40 32 80 38 Q100 42 120 36 V52 Q120 64 108 64 H12 Q0 64 0 52Z" fill="url(#${u}b)"/><g transform="translate(40 50)"><circle r="7" fill="#FFF4E0"/><path d="M0 0 m-1.4 0 a1.4 1.4 0 1 1 2.8 0 a3 3 0 1 1 -6 0" fill="none" stroke="#D9B27A" stroke-width="1.4"/></g><path d="M78 56 L72 48 Q74 42 78 42 Q82 42 84 48Z" fill="#FFC8D8"/></svg>`;
 return `<svg viewBox="0 0 120 64" aria-hidden="true"><defs>${lg(u+'a','#FFE8C0','#FFF6E0')}${lg(u+'b','#F2D6A4','#E0BA80')}</defs><rect width="120" height="64" rx="12" fill="url(#${u}a)"/><circle cx="96" cy="16" r="9" fill="#FFD24D"/><path d="M0 34 Q30 18 60 30 Q90 40 120 26 V52 Q120 64 108 64 H12 Q0 64 0 52Z" fill="url(#${u}b)"/><path d="M14 30 L22 14 L30 30Z M90 32 L100 18 L110 32Z" fill="#E8B878"/><path d="M44 50 Q58 42 72 50" stroke="#FFF4E0" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="42" cy="51" r="3.6" fill="#FFF4E0"/><circle cx="74" cy="51" r="3.6" fill="#FFF4E0"/></svg>`};
function chooseDino(site){const fm=ST().fm,last=ST().fl;let pool=SITES[site].pool.filter(dinoOpen);if(!pool.length)pool=['brachio'];
 // 有禮物劍龍、還沒挖過：這一次一定是牠
 if(gHas('fs_tri')&&pool.includes('stego')&&!fm.stego)return 'stego';
 let c=pool.filter(k=>!fm[k]&&k!==last);if(!c.length)c=pool.filter(k=>k!==last);if(!c.length)c=pool;return pick(c)}
let fTok=0,FS=null,FX={site:null,diff:null};
SCREENS.fossil26=function(){const tok=++fTok;const live=()=>tok===fTok&&S.screen==='fossil26';
 const P=ST();if(!FX.site)FX.site=P.fs&&SITES[P.fs]&&siteOpen(P.fs)?P.fs:'valley';if(!siteOpen(FX.site))FX.site='valley';if(!FX.diff)FX.diff=FLV[S.diff]?S.diff:'mid';
 const calm0=RMo();
 screen.innerHTML=`<div class="dball f26 p23f${calm0?' calm':''}"><div class="phead"><button class="btn2 small p88back" id="pback">回遊樂園</button><h2 class="gtitle">挖化石</h2><span class="phsp"></span></div>
  <div class="f26say"><p id="f26say"></p><button class="r26ib f26ag" id="f26ag" aria-label="再聽一次">${ICON.speaker('#FFE6A8')}</button></div>
  <div class="f26main"><div class="f26bw" id="f26bw"><div class="f26board" id="f26board"><svg id="f26sv" viewBox="0 0 600 340"></svg><canvas id="f26sand" width="1200" height="680"></canvas></div></div>
   <div class="f26side"><div class="p23tools" id="p23tools"><button class="p23tool" data-t="shovel" aria-label="${TP.t_shovel}">${ico('shovel')}<span>${TP.t_shovel}</span></button><button class="p23tool" data-t="brush" aria-label="${TP.t_brush}">${ico('brush')}<span>${TP.t_brush}</span></button></div>
    <div class="f26count"><span id="f26cl">找到化石</span><b id="f26cn">0</b><div class="f26dots" id="f26dots"></div></div><div class="f26tray" id="f26tray"></div></div></div>
  <div class="r26menu f26menu" id="f26menu"><div class="r26mc">
   <div class="r26mh"><span class="r26mi">${art('i:fossil26')}</span><div><b>挖化石</b><small>挖出恐龍、拼回去、塗上顏色，放進我的恐龍博物館！</small></div></div>
   <div class="r26lab">挖掘地</div><div class="f26opts p23sites" id="p23sites">${SORD.filter(siteOpen).map(k=>`<button class="r26opt f26opt" data-k="${k}"><span class="f26mp">${sitePic(k)}</span><b>${TP['f_site_'+k]}</b></button>`).join('')}</div>
   <div class="r26lab">難度</div><div class="r26row" id="p23fdiff"><button class="r26opt" data-v="easy"><b>簡單</b></button><button class="r26opt" data-v="mid"><b>中等</b></button><button class="r26opt" data-v="hard"><b>高難度</b></button></div>
   <div class="p23mrow"><button class="btn r26go" id="f26go">開始挖！</button><button class="btn2 p23mbtn" id="p23mus">${ico('museum')}<span>${TP.m_btn}</span></button></div></div></div></div>`;
 const root=$('.f26'),sv=$('#f26sv'),cv=$('#f26sand'),cx=cv.getContext('2d',{willReadFrequently:true}),board=$('#f26board'),bw=$('#f26bw'),menu=$('#f26menu'),tray=$('#f26tray');
 const SK=2;let calm=calm0,tool='shovel';const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const sayEl=$('#f26say');let curSay=null;
 const tell=(txt,parts)=>{sayEl.textContent=txt;curSay=parts||[txt];return sayR(curSay)};
 $('#pback').onclick=()=>{fTok++;hush();go('park')};
 $('#f26ag').onclick=()=>{if(curSay){sfx('pop');hush();sayR(curSay)}};
 const mTop=()=>{try{const h=root.querySelector('.phead');const t=h.getBoundingClientRect().bottom-root.getBoundingClientRect().top;menu.style.setProperty('--mt',Math.max(0,Math.round(t+6))+'px')}catch(e){}};
 const selS=()=>$$('#p23sites .f26opt').forEach(b=>b.classList.toggle('sel',b.dataset.k===FX.site));selS();
 const selD=()=>$$('#p23fdiff .r26opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===FX.diff));selD();
 $$('#p23sites .f26opt').forEach(b=>b.onclick=()=>{FX.site=b.dataset.k;selS();sfx('pop');hush();sayR([TP['f_site_'+FX.site]])});
 $$('#p23fdiff .r26opt').forEach(b=>b.onclick=()=>{FX.diff=b.dataset.v;selD();sfx('pop');hush();sayR([T26['d_'+FX.diff]])});
 $('#f26go').onclick=()=>{sfx('pop');hush();menu.style.display='none';requestAnimationFrame(()=>{if(live())startDig()})};
 $('#p23mus').onclick=()=>{sfx('pop');hush();openMuseum({})};
 $$('#p23tools .p23tool').forEach(b=>b.onclick=()=>{setTool(b.dataset.t);sfx('pop')});
 function setTool(t){tool=t;$$('#p23tools .p23tool').forEach(b=>{b.classList.toggle('sel',b.dataset.t===t);if(b.dataset.t===t)b.classList.remove('want')});cv.classList.toggle('shov',t==='shovel')}
 function showMenu(){menu.style.display='';mTop();root.classList.remove('digging','building');tell(TP.f_menu)}
 function fitBoard(){board.style.width=board.style.height='';if(matchMedia('(orientation:portrait)').matches)return;const r=bw.getBoundingClientRect();if(!r.width||!r.height)return;const w=Math.min(r.width,r.height*600/340);board.style.width=Math.floor(w)+'px';board.style.height=Math.floor(w*340/600)+'px'}
 const onRs=()=>{if(!live())return removeEventListener('resize',onRs);fitBoard();mTop()};addEventListener('resize',onRs);
 let ro=null;try{ro=new ResizeObserver(()=>{if(!live()){ro.disconnect();return}fitBoard()});ro.observe(bw)}catch(e){}
 const L=()=>FLV[FX.diff]||FLV.mid;
 const DL=()=>FS.list;
 function frame(){const s=SITES[FS.site],u=uid('f');return `<defs><linearGradient id="${u}sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.deep[0]}"/><stop offset="1" stop-color="${s.deep[1]}"/></linearGradient><pattern id="${u}pat" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="5" cy="6" r="2" fill="#5E4232" opacity=".3"/><circle cx="15" cy="16" r="1.6" fill="#FFF0D0" opacity=".4"/></pattern></defs><rect width="600" height="340" rx="22" fill="url(#${u}sb)"/><rect width="600" height="340" rx="22" fill="url(#${u}pat)"/>`}
 function dots(n){$('#f26dots').innerHTML=Array.from({length:n},()=>'<i></i>').join('')}
 function setCount(n){$('#f26cn').textContent=n;[...$('#f26dots').children].forEach((x,j)=>x.classList.toggle('on',j<n))}
 function startDig(){hush();const site=FX.site,k=chooseDino(site),d=DINO[k];P.fs=site;SV2();calm=RMo();root.classList.toggle('calm',calm);root.classList.add('digging');root.classList.remove('building');fitBoard();
  const bk=k==='ammo'?null:pick(site==='beach'?['b_ammo','b_fish','b_shell','b_trilo']:site==='forest'?['b_leaf','b_trilo','b_ammo','b_fish']:['b_ammo','b_fish','b_trilo','b_shell','b_leaf']);
  const list=d.parts.concat(bk?[{bonus:1,v:bk,n:BONUS[bk].n,g:BONUS[bk].g}]:[]);
  const n=list.length,cols=3,rows=Math.ceil(n/cols),cl=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)cl.push([c,r]);const cs=shuffle(cl);
  FS={k,site,list,phase:'dig',found:[],placed:[],idle:0,miss:{},fast:0,lastWarn:0,hits:0,lastHit:0,
   pos:list.map((p,i)=>{const [c,r]=cs[i];return {x:(c+.5)*600/cols+(Math.random()-.5)*20,y:(r+.5)*340/rows+(Math.random()-.5)*14,s:(p.vb?.5:1)*(n<=6?.62:.5),rot:Math.round((Math.random()-.5)*30)}})};
  sv.innerHTML=frame()+list.map((p,i)=>`<g id="f26b${i}" transform="translate(${FS.pos[i].x} ${FS.pos[i].y}) rotate(${FS.pos[i].rot}) scale(${FS.pos[i].s})">${pg(p)}</g>`).join('');
  FS.rad=list.map((p,i)=>{try{const bb=document.getElementById('f26b'+i).getBBox();return Math.max(bb.width,bb.height)/2*FS.pos[i].s*.72}catch(e){return 36}});
  paintSand();cv.style.display='block';setCount(0);dots(list.length);tray.innerHTML='';$('#f26cl').textContent='找到化石';setTool('shovel');
  tell(TP['f_in_'+site])}
 function paintSand(){const s=SITES[FS.site];cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;cx.clearRect(0,0,600,340);const g=cx.createLinearGradient(0,0,0,340);g.addColorStop(0,s.sand[0]);g.addColorStop(1,s.sand[1]);cx.fillStyle=g;cx.beginPath();if(cx.roundRect)cx.roundRect(0,0,600,340,22);else cx.rect(0,0,600,340);cx.fill();
  for(let i=0;i<500;i++){cx.fillStyle=s.dots[i%3];cx.globalAlpha=.5;cx.beginPath();cx.arc(Math.random()*600,Math.random()*340,Math.random()*2+.6,0,7);cx.fill()}
  cx.globalAlpha=.35;cx.strokeStyle=s.line;cx.lineWidth=2;for(let y=30;y<340;y+=36){cx.beginPath();cx.moveTo(10,y);for(let x=10;x<=590;x+=30)cx.quadraticCurveTo(x+15,y+(x%60?6:-6),x+30,y);cx.stroke()}
  // 各挖掘地的小東西：海邊＝小貝殼、森林＝小葉子、恐龍谷＝小石頭
  for(let i=0;i<9;i++){const x=30+Math.random()*540,y=20+Math.random()*300;cx.globalAlpha=.75;
   if(FS.site==='beach'){cx.fillStyle=i%2?'#FFD0DC':'#FFFFFF';cx.beginPath();cx.moveTo(x,y+6);cx.lineTo(x-6,y-2);cx.quadraticCurveTo(x,y-8,x+6,y-2);cx.closePath();cx.fill()}
   else if(FS.site==='forest'){cx.fillStyle=i%2?'#7FA05A':'#9AC070';cx.beginPath();cx.ellipse(x,y,7,3.4,i,0,7);cx.fill()}
   else{cx.fillStyle=i%2?'#D2A870':'#C49460';cx.beginPath();cx.ellipse(x,y,5,3.4,i,0,7);cx.fill()}}
  cx.globalAlpha=1}
 function brushAt(px,py,fast){const r=L().brush,stg=fast?.18:.9;cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='destination-out';const g=cx.createRadialGradient(px,py,r*.3,px,py,r);g.addColorStop(0,`rgba(0,0,0,${stg})`);g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.beginPath();cx.arc(px,py,r,0,7);cx.fill();cx.restore();
  if(!calm){cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.fillStyle=SITES[FS.site].sand[1];for(let i=0;i<3;i++){cx.globalAlpha=.6;cx.beginPath();cx.arc(px+(Math.random()-.5)*r*2.4,py+(Math.random()-.5)*r*2.4,1.6,0,7);cx.fill()}cx.restore()}}
 // 小鏟子：一下挖掉一大片；碰到化石就停（化石只能用刷子刷出來）
 function scoop(px,py){if(!FS||FS.phase!=='dig')return;let dm=1e9;DL().forEach((p,i)=>{if(FS.found.includes(i))return;const Q=FS.pos[i];const d=Math.hypot(px-Q.x,py-Q.y)-FS.rad[i];if(d<dm)dm=d});
  const rad=Math.min(L().shovel,dm);
  if(rad<16){const now=performance.now();if(now-FS.lastHit<600)return;FS.lastHit=now;FS.hits++;tone(1568,0,.12,'triangle',.07);tone(2093,.06,.1,'triangle',.05);
   const bb=$('#p23tools .p23tool[data-t="brush"]');if(bb){bb.classList.remove('want');void bb.offsetWidth;bb.classList.add('want')}
   if(FS.hits>=2&&tool==='shovel'){setTool('brush')}tell(TP.f_hit);return}
  cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='destination-out';const g=cx.createRadialGradient(px,py,rad*.55,px,py,rad);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.beginPath();cx.arc(px,py,rad,0,7);cx.fill();cx.restore();
  tone(180+Math.random()*60,0,.08,'triangle',.05);FS.idle=0;
  if(!calm){cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.fillStyle=SITES[FS.site].sand[1];for(let i=0;i<8;i++){const a=Math.random()*7,rr=rad*(1+Math.random()*.25);cx.globalAlpha=.7;cx.beginPath();cx.arc(px+Math.cos(a)*rr,py+Math.sin(a)*rr,2+Math.random()*2,0,7);cx.fill()}cx.restore()}}
 function checkFound(){if(!FS||FS.phase!=='dig')return;const list=DL();let img;try{img=cx.getImageData(0,0,cv.width,cv.height).data}catch(e){return}
  list.forEach((p,i)=>{if(FS.found.includes(i)||FS.phase!=='dig')return;const el=document.getElementById('f26b'+i);if(!el)return;let bb;try{bb=el.getBBox()}catch(e){return}const Q=FS.pos[i];
   let tot=0,clr=0;const ang=Q.rot*Math.PI/180;
   for(let a=0;a<9;a++)for(let b=0;b<7;b++){const lx=bb.x+bb.width*(a+.5)/9,ly=bb.y+bb.height*(b+.5)/7,sx=Q.x+Q.s*(lx*Math.cos(ang)-ly*Math.sin(ang)),sy=Q.y+Q.s*(lx*Math.sin(ang)+ly*Math.cos(ang));
    const X=Math.round(sx*SK),Y=Math.round(sy*SK);if(X<0||Y<0||X>=cv.width||Y>=cv.height)continue;tot++;if(img[(Y*cv.width+X)*4+3]<90)clr++}
   if(tot&&clr/tot>.58)found(i)})}
 const bline=v=>T26[v]||TP[v]||'';
 function found(i){const list=DL(),p=list[i];if(FS.found.includes(i))return;FS.found.push(i);FS.idle=0;const n=FS.found.length,Q=FS.pos[i];
  cx.save();cx.setTransform(SK,0,0,SK,0,0);cx.globalCompositeOperation='destination-out';cx.beginPath();cx.arc(Q.x,Q.y,70*Q.s/.62,0,7);cx.fill();cx.restore();
  const el=document.getElementById('f26b'+i);if(el)el.insertAdjacentHTML('afterbegin',`<circle r="${p.vb?140:70}" fill="#FFF3B0" opacity=".5"/>`);$$('#f26sv .f26hint').forEach(x=>x.remove());cv.classList.remove('hinting');
  setCount(n);sfx(p.bonus?'gem':'right');
  const t=document.createElement('div');t.className='f26bn'+(p.bonus?' bonus':'')+(calm?'':' pop');t.dataset.i=i;t.innerHTML=`<svg viewBox="${VBp(p)}" aria-hidden="true">${pg(p)}</svg>${p.bonus?'<b>寶物</b>':''}`;t.setAttribute('aria-label',p.n);tray.appendChild(t);
  const left=list.length-n;
  if(!left){const a=T26['a_'+FS.k]||TP['a_'+FS.k];tell(a);later(startBuild,calm?2200:3000);return}
  if(n===1&&tool==='shovel')setTool('brush');
  if(p.bonus)tell(`${bline(p.v)} 還有 ${left} 塊。`,[bline(p.v),T26['l'+left]]);
  else tell(`找到第${CN(n)}塊化石，${p.n}！還有 ${left} 塊。`,[T26['k'+n],T26[p.v]||TP[p.v],T26['l'+left]])}
 let drawing=false,lastP=null,lastT=0,ct=0,lastS=null;
 const toB=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)/r.width*600,(e.clientY-r.top)/r.height*340]};
 cv.addEventListener('pointerdown',e=>{if(!FS||FS.phase!=='dig')return;e.preventDefault();drawing=true;try{cv.setPointerCapture(e.pointerId)}catch(_){}lastP=toB(e);lastT=performance.now();FS.idle=0;
  if(tool==='shovel'){lastS=lastP;scoop(...lastP);if(!ct)ct=setTimeout(()=>{ct=0;if(live())checkFound()},120)}else brushAt(...lastP)});
 cv.addEventListener('pointermove',e=>{if(!drawing||!FS||FS.phase!=='dig')return;const p=toB(e),now=performance.now();
  if(tool==='shovel'){if(Math.hypot(p[0]-lastS[0],p[1]-lastS[1])>30){lastS=p;scoop(...p)}lastP=p;FS.idle=0;return}
  const dt=Math.max(8,now-lastT);const dx=p[0]-lastP[0],dy=p[1]-lastP[1],dist=Math.hypot(dx,dy),spd=dist/dt*1000;lastT=now;
  const fast=spd>900;FS.fast=fast?FS.fast+dt:Math.max(0,FS.fast-dt*2);
  if(FS.fast>500&&now-FS.lastWarn>6000){FS.lastWarn=now;tell(T26.f_slow)}
  const stp=Math.max(1,dist/8);for(let i=1;i<=stp;i++)brushAt(lastP[0]+dx*i/stp,lastP[1]+dy*i/stp,fast);lastP=p;FS.idle=0;if(!ct)ct=setTimeout(()=>{ct=0;if(live())checkFound()},120)});
 const endB=()=>{if(drawing){drawing=false;if(live())checkFound()}};cv.addEventListener('pointerup',endB);cv.addEventListener('pointercancel',endB);
 const iv=setInterval(()=>{if(!live()){clearInterval(iv);return}if(!FS||FS.phase!=='dig'||drawing||document.hidden||$('.overlay'))return;FS.idle++;
  if(FS.idle>=8){FS.idle=0;const left=DL().map((p,i)=>i).filter(i=>!FS.found.includes(i));if(left.length){const Q=FS.pos[left[0]];$$('#f26sv .f26hint').forEach(x=>x.remove());
   sv.insertAdjacentHTML('beforeend',`<g class="f26hint" transform="translate(${Q.x} ${Q.y})"><circle r="34" fill="none" stroke="#FFF3B0" stroke-width="6" class="f26glow"/></g>`);cv.classList.add('hinting');tell(T26.f_idle)}}},1000);
 // ── 拼回去（寶物不用拼）
 function startBuild(){if(!FS||FS.phase!=='dig')return;const d=DINO[FS.k];FS.phase='build';cv.style.display='none';root.classList.remove('digging');root.classList.add('building');
  sv.innerHTML=frame()+`<path d="${d.sil}" fill="#FFF4E0" opacity=".16"/>`+(d.sea?'':`<path d="M0 300 H600" stroke="#5E4232" stroke-width="3" opacity=".45"/>`)+
   d.parts.map((p,i)=>`<g id="f26s${i}" opacity="${L().outline?.42:0}" transform="translate(${p.x} ${p.y})" style="filter:grayscale(1) brightness(.5)">${pg(p)}</g>`).join('')+`<g>${d.parts.map((p,i)=>({i,z:p.z||0})).sort((a,b)=>a.z-b.z).map(o=>`<g id="f26p${o.i}"></g>`).join('')}</g><g id="f26glow"></g>`;
  $('#f26cl').textContent='拼好了';dots(d.parts.length);setCount(0);
  [...tray.children].sort((a,b)=>a.classList.contains('bonus')-b.classList.contains('bonus')||Math.random()-.5).forEach(x=>{x.classList.remove('pop');tray.appendChild(x)});
  tell(L().outline?T26.f_build:T26.f_build2)}
 let drag=null;
 tray.addEventListener('pointerdown',e=>{const t=e.target.closest('.f26bn');if(!t||t.classList.contains('bonus')||t.classList.contains('used')||!FS||FS.phase!=='build')return;e.preventDefault();
  const i=+t.dataset.i,p=DINO[FS.k].parts[i];const el=document.createElement('div');el.className='f26drag';const sc=sv.getBoundingClientRect().width/600,vw=+VBp(p).split(' ')[2];
  el.style.width=el.style.height=Math.max(60,vw*sc)+'px';el.innerHTML=`<svg viewBox="${VBp(p)}" width="100%" height="100%" aria-hidden="true">${pg(p)}</svg>`;document.body.appendChild(el);
  drag={i,el,t,id:e.pointerId};try{tray.setPointerCapture(e.pointerId)}catch(_){}mv(e);t.style.opacity=.3});
 const mv=e=>{if(!drag||e.pointerId!==drag.id)return;drag.el.style.left=e.clientX+'px';drag.el.style.top=e.clientY+'px'};
 tray.addEventListener('pointermove',mv);
 const drop=e=>{if(!drag||e.pointerId!==drag.id)return;const {i,el,t}=drag;drag=null;el.remove();if(!live()||!FS||FS.phase!=='build')return;const d=DINO[FS.k],p=d.parts[i],r=sv.getBoundingClientRect();
  const bx=(e.clientX-r.left)/r.width*600,by=(e.clientY-r.top)/r.height*340,dist=Math.hypot(bx-p.x,by-p.y);
  if(e.type==='pointerup'&&dist<L().tol){t.classList.add('used');t.style.opacity='';$('#f26p'+i).innerHTML=`<g transform="translate(${p.x} ${p.y})">${pg(p)}</g>`;$('#f26s'+i).setAttribute('opacity',0);$('#f26glow').innerHTML='';
   FS.placed.push(i);const n=FS.placed.length;setCount(n);sfx('pop');
   if(n===d.parts.length){tell(T26.f_okall);FS.phase='done';later(done,1400)}else tell(T26[['f_ok1','f_ok2','f_ok3'][n%3]])}
  else{t.style.opacity='';if(e.type!=='pointerup')return;FS.miss[i]=(FS.miss[i]||0)+1;sfx('hint');
   if(FS.miss[i]>=2||!L().outline){$('#f26glow').innerHTML=`<g transform="translate(${p.x} ${p.y})" class="f26glow"><circle r="46" fill="#FFF3B0" opacity=".55"/></g>`;tell(`${p.n}放在這裡，發亮的地方！`,[T26.f_here])}
   else tell(`再試試看，${p.n}要放哪裡呢？`,[T26.f_try])}};
 tray.addEventListener('pointerup',drop);tray.addEventListener('pointercancel',drop);
 // 拼好：數一數（寶物也算一塊）→ 塗顏色 → 博物館
 function done(){const k=FS.k,d=DINO[k],n=DL().length;FS.phase='end';
  const pic=`<svg viewBox="0 0 600 340" aria-hidden="true"><path d="${d.sil}" fill="${d.body}" opacity=".9"/>${d.parts.slice().sort((a,b)=>(a.z||0)-(b.z||0)).map(p=>`<g transform="translate(${p.x} ${p.y})" opacity=".6">${pg(p)}</g>`).join('')}</svg>`;
  const opts=shuffle([n-1,n,n+1]);let first=true,paid=0;
  const ov=overlay(screen,`<div class="card f26end"><div class="f26pic">${pic}</div><div class="f26er"><h2>${DNAME(k)}拼好了！</h2><p id="f26q">數一數，我們找到了幾塊化石？</p>
   <div class="f26row" id="f26row" aria-hidden="true">${DL().map((p,i)=>`<span class="f26ri${p.bonus?' bonus':''}"><svg viewBox="${VBp(p)}">${pg(p)}</svg><i>${i+1}</i></span>`).join('')}</div>
   <div class="f26nums" id="f26nums">${opts.map((v,j)=>`<button style="--c:${['#FF7FB8','#4FC0C0','#A98BF0'][j]}" data-v="${v}">${v}</button>`).join('')}</div>
   <p class="small" id="f26got"></p><div class="p23cgo" id="p23cgo" style="display:none"><button class="btn p23gold" id="p23paint">${TP.c_go}</button><button class="btn2 small" id="p23skip">${TP.c_skip}</button></div></div></div>`);
  ov.classList.add('r26ov');const nums=$('#f26nums',ov);
  sayR([T26['q_'+k]||TP['q_'+k]]);
  const cnt=()=>{const a=[];for(let i=1;i<=n;i++)a.push(String(i));return a};
  nums.onclick=e=>{const b=e.target.closest('button');if(!b||paid)return;const v=+b.dataset.v;
   if(v===n){if(first)try{markN(n,true)}catch(_){}first=false;paid=1;sfx('right');[...nums.children].forEach(x=>x.classList.toggle('dim',x!==b));b.classList.add('win');
    const g=gems('f26Day');try{confetti()}catch(_){}$('#f26q',ov).textContent=`對！${cnt().join('、')}，一共找到 ${n} 塊化石！`;$('#f26row',ov).classList.add('cnt');$('#f26got',ov).textContent=`得到 ${g} 顆寶石！`;
    $('#p23cgo',ov).style.display='';sayR([T26.yes,...cnt(),T26['c'+n],g===3?T26.gem3:T26.gem1])}
   else{if(first){try{markN(n,false)}catch(_){}first=false}sfx('hint');$('#f26q',ov).textContent=`我們一起數一數：${cnt().join('、')}。`;$('#f26row',ov).classList.add('cnt');sayR([T26.count,...cnt()])}};
  const toMus=(e)=>{const P=ST();const o=P.fm[k]||{};o.n=(o.n||0)+1;o.t=Date.now();o.s=FS.site;if(e){o.c=e.c;o.p=e.p||''}P.fm[k]=o;P.fl=k;SV2();
   const first1=Object.keys(P.fm).length===1&&o.n===1;
   openMuseum({hl:k,first:first1,onClose:()=>{if(live())endCard(k)}})};
  $('#p23paint',ov).onclick=()=>{sfx('pop');hush();ov.remove();openPaint(k,{},e=>toMus(e))};
  $('#p23skip',ov).onclick=()=>{sfx('pop');hush();ov.remove();toMus(null)}}
 function endCard(k){const e=ST().fm[k]||{};const ov=overlay(screen,`<div class="card f26end p23end"><div class="f26pic">${dinoSVG(k,e)}</div><div class="f26er"><h2>${DNAME(k)}${TP.m_in.replace(/！$/,'')}！</h2>
   <div class="row"><button class="btn" id="f26re">再玩一次</button><button class="btn2" id="f26out">回遊樂園</button></div><button class="btn2 small" id="f26chg">${TP.e_site}</button></div></div>`);
  ov.classList.add('r26ov');
  $('#f26re',ov).onclick=()=>{ov.remove();sfx('pop');startDig()};
  $('#f26chg',ov).onclick=()=>{ov.remove();sfx('pop');FS=null;showMenu()};
  $('#f26out',ov).onclick=()=>{ov.remove();fTok++;hush();go('park')}}
 fitBoard();showMenu();
 {const fr=['fs_beach','fs_tri'].filter(id=>gHas(id)&&gFresh(id));if(fr.length){const t=fr.map(id=>TP['g_'+id]).join('');sayEl.textContent=t;curSay=fr.map(id=>TP['g_'+id]);hush();sayR(curSay)}}
 try{const V=window.__v22vis;if(V&&typeof V.addBg==='function'){V.addBg('fossil26');requestAnimationFrame(()=>{if(live())V.addBg('fossil26')});setTimeout(()=>{if(live())V.addBg('fossil26')},400)}}catch(e){}
 ['fs_beach','fs_tri'].forEach(gSeen);
 window.__P23=Object.assign(window.__P23||{},{f:{start:(k,site)=>{if(site)FX.site=site;menu.style.display='none';chooseDinoOverride=k||null;try{startDig()}finally{chooseDinoOverride=null}return FS},S:()=>FS,scoop:(x,y)=>scoop(x,y),brush:(x,y)=>brushAt(x,y),check:()=>checkFound(),found:i=>found(i),build:()=>startBuild(),tool:t=>setTool(t),
  place:i=>{const p=DINO[FS.k].parts[i],t=tray.querySelector(`.f26bn[data-i="${i}"]`);if(!p)return false;const r=sv.getBoundingClientRect();if(!t)return false;const tr=t.getBoundingClientRect();
   const ev=(type,x,y)=>new PointerEvent(type,{bubbles:true,clientX:x,clientY:y,pointerId:7,button:0,buttons:type==='pointerup'?0:1});
   t.dispatchEvent(ev('pointerdown',tr.left+tr.width/2,tr.top+tr.height/2));const X=r.left+p.x/600*r.width,Y=r.top+p.y/340*r.height;tray.dispatchEvent(ev('pointermove',X,Y));tray.dispatchEvent(ev('pointerup',X,Y));return true},
  parts:()=>DINO[FS.k].parts.length,all:()=>DL().length}});
};
let chooseDinoOverride=null;
{const _cd=chooseDino;chooseDino=function(site){if(chooseDinoOverride)return chooseDinoOverride;return _cd(site)}}
/* ---------- 塗顏色 ---------- */
const PAL=['#FF8FB8','#FF7A7A','#FFB35C','#FFE066','#8EDB7A','#5FC8A8','#7FC4FF','#6A8AF0','#B99CFF','#C99A6A','#FFFFFF','#8A8AA8'];
function openPaint(k,o,cb){const d=DINO[k];const n=NREG(d);const c=(o.c||[]).slice();let col=PAL[0],mode='tap',drew=false;const calm=RMo();
 const host=document.getElementById('screen')||document.body;
 const ov=overlay(host,`<div class="card p23paint"><h2>${TP.c_go.replace('恐龍',DNAME(k))}</h2>
  <div class="p23pbody"><div class="p23pv" id="p23pv"><svg viewBox="0 0 600 340" id="p23psv" aria-hidden="true"></svg><canvas id="p23pc" width="1200" height="680"></canvas></div>
  <div class="p23pside"><div class="p23pal" id="p23pal">${PAL.map((x,i)=>`<button style="--c:${x}" data-c="${x}" aria-label="顏色 ${i+1}"${i?'':' class="sel"'}></button>`).join('')}</div>
  <div class="p23pm"><button class="p23mode sel" data-m="tap">${TP.c_tap}</button><button class="p23mode" data-m="draw">${TP.c_draw}</button><button class="p23mode" id="p23pclr">${TP.c_clear}</button></div></div></div>
  <div class="row"><button class="btn p23gold" id="p23pdone">${TP.c_done}</button></div></div>`);
 ov.classList.add('p23ov');
 const svg=$('#p23psv',ov),cvs=$('#p23pc',ov),g=cvs.getContext('2d');let clip=null;try{clip=new Path2D(d.sil)}catch(e){}
 const draw=()=>{svg.innerHTML=dinoPaint(k,c.length?c:null,null,{blank:true})};draw();
 if(o.p){const im=new Image();im.onload=()=>{g.drawImage(im,0,0,1200,680);drew=true};im.src=o.p}
 const say1=t=>{try{hush()}catch(e){}sayR([t])};
 sayR([TP.c_hi]);
 $('#p23pal',ov).onclick=e=>{const b=e.target.closest('button');if(!b)return;col=b.dataset.c;$$('#p23pal button',ov).forEach(x=>x.classList.toggle('sel',x===b));sfx('pop')};
 $$('.p23mode[data-m]',ov).forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('.p23mode[data-m]',ov).forEach(x=>x.classList.toggle('sel',x===b));cvs.classList.toggle('on',mode==='draw');sfx('pop');if(mode==='draw')say1(TP.c_finger)});
 $('#p23pclr',ov).onclick=()=>{c.length=0;g.clearRect(0,0,1200,680);drew=false;draw();sfx('pop')};
 svg.addEventListener('pointerdown',e=>{if(mode!=='tap')return;const r=e.target.closest&&e.target.closest('.p23reg');if(!r)return;e.preventDefault();const i=+r.dataset.r;
  for(let j=0;j<n;j++)if(c[j]==null)c[j]='#FFFFFF';c[i]=col;r.setAttribute('fill',col);tone(660+i*40,0,.1,'triangle',.06)});
 let dn=false,lp=null;const toC=e=>{const r=cvs.getBoundingClientRect();return [(e.clientX-r.left)/r.width*600,(e.clientY-r.top)/r.height*340]};
 const stroke=(a,b)=>{g.save();g.setTransform(2,0,0,2,0,0);if(clip)g.clip(clip);g.strokeStyle=col;g.lineWidth=18;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();g.restore();drew=true};
 cvs.addEventListener('pointerdown',e=>{if(mode!=='draw')return;e.preventDefault();dn=true;try{cvs.setPointerCapture(e.pointerId)}catch(_){}lp=toC(e);stroke(lp,[lp[0]+.1,lp[1]+.1])});
 cvs.addEventListener('pointermove',e=>{if(!dn)return;const p=toC(e);stroke(lp,p);lp=p});
 const up=()=>{dn=false};cvs.addEventListener('pointerup',up);cvs.addEventListener('pointercancel',up);
 $('#p23pdone',ov).onclick=()=>{sfx('pop');let p='';if(drew){try{const t=document.createElement('canvas');t.width=300;t.height=170;t.getContext('2d').drawImage(cvs,0,0,300,170);p=t.toDataURL('image/png')}catch(e){}}
  ov.remove();sayR([TP.c_nice]);cb&&cb({c:c.length?c.slice(0,n):null,p})};
 if(window.__P23)window.__P23.paint={ov,tap:(i,cc)=>{if(cc)col=cc;const r=svg.querySelector(`.p23reg[data-r="${i}"]`);if(!r)return false;r.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:0,clientY:0}));return true},
  draw:(pts,cc)=>{if(cc)col=cc;for(let i=1;i<pts.length;i++)stroke(pts[i-1],pts[i])}};
 return ov}
/* ---------- 我的恐龍博物館 ---------- */
function museumList(){const fm=ST().fm;return DORD.filter(k=>!DGIFT[k]||gHas(DGIFT[k])||fm[k])}
function openMuseum(o){o=o||{};const host=document.getElementById('screen')||document.body;const fm=ST().fm;const list=museumList();const got=list.filter(k=>fm[k]).length;
 const ov=overlay(host,`<div class="card p23mus"><div class="p23mh"><span class="p23mi">${ico('museum')}</span><div><h2>${TP.m_title}</h2><small>收集了 ${got}／${list.length} 種</small></div></div>
  <div class="p23mg" id="p23mg">${list.map(k=>{const e=fm[k];return `<button class="p23ms${e?' got':''}${o.hl===k?' hl':''}" data-k="${k}" aria-label="${e?DNAME(k):TP.m_what}"><span class="p23mp">${e?dinoSVG(k,e):dinoSil(k)}</span><b>${e?DNAME(k):'？'}</b>${o.hl===k?`<i class="p23new">${TP.m_new}</i>`:''}</button>`}).join('')}</div>
  <div class="p23md" id="p23md" hidden></div>
  <div class="row"><button class="btn2" id="p23mclose">${TP.m_close}</button></div></div>`);
 ov.classList.add('p23ov');
 const md=$('#p23md',ov),mg=$('#p23mg',ov);
 if(o.hl){sayR([TP.m_in]);const t=o.first?TP.m_room:'';if(t)setTimeout(()=>{try{toast(t)}catch(e){}},600)}else sayR([TP.m_hi]);
 mg.onclick=e=>{const b=e.target.closest('.p23ms');if(!b)return;const k=b.dataset.k;sfx('pop');hush();
  if(!fm[k]){sayR([TP.m_what]);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
  md.hidden=false;mg.hidden=true;md.innerHTML=`<div class="p23mbig">${dinoSVG(k,fm[k])}</div><h3>${DNAME(k)}</h3><p>${TP['x_'+k]||''}</p><div class="p23mdb"><button class="btn2 small" id="p23rp">${TP.m_paint}</button><button class="btn2 small" id="p23bk">${TP.m_title}</button></div>`;
  sayR([TP['x_'+k]]);
  $('#p23bk',ov).onclick=()=>{sfx('pop');md.hidden=true;mg.hidden=false};
  $('#p23rp',ov).onclick=()=>{sfx('pop');hush();ov.style.display='none';openPaint(k,{c:fm[k].c,p:fm[k].p},r=>{const P=ST();P.fm[k].c=r.c;P.fm[k].p=r.p||'';SV2();ov.remove();openMuseum({onClose:o.onClose})})}};
 $('#p23mclose',ov).onclick=()=>{sfx('pop');hush();ov.remove();o.onClose&&o.onClose()};
 return ov}

/* =====================================================================
 * 雨林盪藤蔓（新版）：路線每次不同、岔路自己選、動物朋友貼紙簿、撿花和葉子佈置小樹屋、開心的終點
 * 照順序接香蕉照舊（簡單 1～10、中等 10～100、高難度 2～20＋看時機）；不倒數、不會掉下去
 * ===================================================================== */
const VDN={easy:'簡單',mid:'中等',hard:'高難度'};
const MKY=()=>{try{return CH36.monkey.f()}catch(e){return ''}};
const BAN=()=>`<path d="M14 20 Q20 52 52 46 Q56 44 52 40 Q28 40 22 16 Q18 12 14 20Z" fill="#FFD84D"/><path d="M18 22 Q24 44 48 43" stroke="#FFF2A8" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M14 20 L12 14" stroke="#7A5A2A" stroke-width="3" stroke-linecap="round"/>`;
function vSeq(diff){if(diff==='easy')return {step:1,start:1,rule:'v_r1'};if(diff==='mid')return {step:10,start:10,rule:'v_r10'};return S.chDone>=37?{step:2,start:2,rule:'v_r2'}:{step:10,start:10,rule:'v_r10'}}
function vChoices(diff,want,step){if(diff==='easy')return [want];const o=new Set([want]);const cand=(step===10?[want+10,want+20,want-10,want+5]:[want+2,want-2,want+4,want+1]).filter(v=>v>0&&v!==want);
 for(const c of shuffle(cand)){if(o.size>=3)break;o.add(c)}return shuffle([...o])}
const T6=()=>{try{return (window.__V6&&__V6.T)||{}}catch(e){return {}}};
const aOpen=k=>!AGIFT[k]||gHas(AGIFT[k]);
let vTok=0,VX={diff:null,dest:'house'},G=null;
SCREENS.vine6=function(){const tok=++vTok;const live=()=>tok===vTok&&S.screen==='vine6';const calm=RMo();const T=T6();const P=ST();
 if(!VX.diff)VX.diff=VDN[S.diff]?S.diff:'mid';if(VX.dest==='falls'&&!gHas('vn_falls'))VX.dest='house';
 let bg='';try{bg=(window.BG36&&BG36.rainforest36)?BG36.rainforest36(800,450):''}catch(e){}
 const falls=gHas('vn_falls');
 screen.innerHTML=`<div class="dball vn6 p23v${calm?' calm':''}"><div class="phead"><button class="btn2 small p88back" id="pback">回遊樂園</button><h2 class="gtitle">雨林盪藤蔓</h2><span class="phsp"></span></div>
  <div class="vn6stage" id="vn6st"><svg class="vn6bg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg}</svg><svg class="vn6bg p23zd" id="p23zd" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true"></svg>
   <p class="vn6bub" id="vn6bub"></p><div class="p23gr" id="p23gr"></div><div class="vn6vines" id="vn6v"></div><div class="vn6mk" id="vn6mk" style="left:14%;top:46%"><svg viewBox="0 0 100 100" aria-hidden="true">${MKY()}</svg></div><div class="p23fork" id="p23fork" hidden></div></div>
  <div class="p23hud"><div class="vn6got" id="vn6got"></div><div class="p23cnt"><span class="p23cc" id="p23cf" aria-label="${TP.v_friends}"></span><span class="p23cc" id="p23ci" aria-label="${TP.v_flowers}"></span></div></div>
  <div class="ch5menu vn6menu" id="vn6menu"><div class="ch5mc">
   <div class="ch5mh"><span class="ch5mi">${art('i:vine6')}</span><div><b>雨林盪藤蔓</b><small>照順序接香蕉，認識雨林的朋友！</small></div></div>
   <div class="ch5lab">難度</div><div class="ch5row" id="vn6diffs"><button class="ch5opt" data-v="easy"><b>簡單</b><small>1、2、3…</small></button><button class="ch5opt" data-v="mid"><b>中等</b><small>10、20、30…</small></button><button class="ch5opt" data-v="hard"><b>高難度</b><small>${S.chDone>=37?'2、4、6，':''}看時機</small></button></div>
   <div class="ch5lab">${TP.v_to}</div><div class="ch5row" id="p23dest"><button class="ch5opt p23dopt" data-v="house"><span class="p23dp">${ico('house')}</span><b>${TP.v_dest_house}</b></button>${falls?`<button class="ch5opt p23dopt" data-v="falls"><span class="p23dp">${gSvg('vn_falls')}</span><b>${TP.v_dest_falls}</b></button>`:''}</div>
   <div class="p23gorow"><button class="btn ch5go" id="vn6go">出發！</button>
   <div class="p23vbtn"><button class="btn2 small" id="p23book">${ico('book')}<span>${TP.v_book}</span></button><button class="btn2 small" id="p23house">${ico('house')}<span>${TP.v_house}</span></button></div></div></div></div></div>`;
 const bub=$('#vn6bub'),vv=$('#vn6v'),mk=$('#vn6mk'),got=$('#vn6got'),gr=$('#p23gr'),zd=$('#p23zd'),fk=$('#p23fork');let raf=0;
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 const tell=(t,parts)=>{bub.textContent=t;return sayR(parts||[t])};
 $('#pback').onclick=()=>{vTok++;cancelAnimationFrame(raf);hush();go('park')};
 const sel=()=>{$$('#vn6diffs .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===VX.diff));$$('#p23dest .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===VX.dest))};sel();
 $$('#vn6diffs .ch5opt').forEach(b=>b.onclick=()=>{VX.diff=b.dataset.v;sel();sfx('pop');hush();sayR([T['d_'+VX.diff]])});
 $$('#p23dest .ch5opt').forEach(b=>b.onclick=()=>{VX.dest=b.dataset.v;sel();sfx('pop');hush();sayR([TP['v_dest_'+VX.dest]])});
 $('#vn6go').onclick=()=>{sfx('pop');hush();$('#vn6menu').style.display='none';start()};
 $('#p23book').onclick=()=>{sfx('pop');hush();openBook()};
 $('#p23house').onclick=()=>{sfx('pop');hush();openHouse()};
 {const fr=['vn_falls','vn_frog'].filter(id=>gHas(id)&&gFresh(id));if(fr.length)tell(fr.map(id=>TP['g_'+id]).join(''),fr.map(id=>TP['g_'+id]));else tell(TP.v_menu)}['vn_falls','vn_frog'].forEach(gSeen);
 const hud=()=>{$('#p23cf').innerHTML=`${ico('book')}<b>${G?G.friends.length:0}</b>`;$('#p23ci').innerHTML=`${itmSVG('f_pink')}<b>${G?G.items.length:0}</b>`};
 function start(){const sq=vSeq(VX.diff);cancelAnimationFrame(raf);
  const z0=gHas('vn_frog')&&!P.vs.frog?'creek':pick(ZONES);
  G={diff:VX.diff,step:sq.step,next:sq.start,n:0,total:10,miss:0,busy:false,timing:VX.diff==='hard'&&!calm,dest:VX.dest,zone:z0,seen:[z0],friends:[],items:[],frogDone:false};
  got.innerHTML=Array.from({length:G.total},()=>'<i></i>').join('');hud();
  mk.style.left='14%';mk.style.top='46%';setZone(z0,true);
  tell(T[sq.rule]||'',[TP['v_hi_'+G.dest],T[sq.rule],...(G.timing?[T.v_time]:[])]);round()}
 // 換一個地方：背景裝飾、一位動物朋友、兩樣花葉
 function setZone(z,first){G.zone=z;zd.innerHTML=zoneDeco(z);zd.classList.remove('in');void zd.getBoundingClientRect();zd.classList.add('in');
  gr.innerHTML='';const fr=pickFriend(z);const side=Math.random()<.5;const fx=side?30+Math.random()*8:66+Math.random()*16;
  if(fr){const b=document.createElement('button');b.className='p23fr';b.dataset.k=fr;b.style.left=fx+'%';b.setAttribute('aria-label',TP['nm_'+fr]);b.innerHTML=aniSVG(fr);b.onclick=()=>meet(b);gr.appendChild(b)}
  const xs=[];for(let i=0;i<2;i++){let x;let t=0;do{x=8+Math.random()*84;t++}while(t<30&&(Math.abs(x-fx)<12||Math.abs(x-14)<8||xs.some(q=>Math.abs(q-x)<12)));xs.push(x)}
  xs.forEach(x=>{const k=pick(IORD);const b=document.createElement('button');b.className='p23it';b.dataset.k=k;b.style.left=x+'%';b.setAttribute('aria-label',TP['it_'+k]);b.innerHTML=itmSVG(k);b.onclick=()=>pickUp(b);gr.appendChild(b)});
  if(!first)later(()=>{if(!G||G.n>=G.total)return;bub.textContent=TP['z_'+z]+'！'+TP.v_friend;sayR([TP['z_'+z]])},200)}
 function pickFriend(z){let pool=(ZFR[z]||AORD).filter(aOpen);if(gHas('vn_frog')&&!G.frogDone&&(G.seen.length===1||z==='creek'||z==='ferns'))return 'frog';
  let c=pool.filter(k=>!G.friends.includes(k)&&!P.vs[k]);if(!c.length)c=pool.filter(k=>!G.friends.includes(k));if(!c.length)c=pool;return c.length?pick(c):null}
 function meet(b){if(!G||!live())return;const k=b.dataset.k;hush();if(k==='frog')G.frogDone=true;
  const firstEver=!P.vs[k];if(!b.classList.contains('met')){P.vs[k]=(P.vs[k]||0)+1;SV2();if(!G.friends.includes(k))G.friends.push(k);hud();sfx('gem')}else sfx('pop');
  b.classList.remove('met');void b.offsetWidth;b.classList.add('met');
  const t=TP.v_hello+TP['a_'+k];bub.textContent=t;sayR([TP.v_hello,TP['a_'+k]]);if(firstEver){const lab=document.createElement('span');lab.className='p23lab st';lab.textContent=TP.v_sticker;lab.style.left=b.style.left;gr.appendChild(lab);later(()=>lab.remove(),2200)}}
 function pickUp(b){if(!G||!live()||b.classList.contains('got'))return;const k=b.dataset.k;b.classList.add('got');P.vb[k]=(P.vb[k]||0)+1;SV2();G.items.push(k);hud();
  tone(880,0,.1,'triangle',.08);tone(1175,.08,.12,'triangle',.07);const lab=document.createElement('span');lab.className='p23lab';lab.textContent='＋'+TP['it_'+k];lab.style.left=b.style.left;gr.appendChild(lab);
  later(()=>{b.remove();lab.remove()},calm?600:1100)}
 function round(){if(!live())return;G.miss=0;G.busy=false;const ch=vChoices(G.diff,G.next,G.step);const xs=ch.length===1?[58]:innerWidth<700?[40,63,86]:[46,66,86];
  vv.innerHTML=`<div class="vn6vine home" style="left:14%"><i class="vn6rope"></i></div>`+ch.map((v,i)=>`<button class="vn6vine c" data-v="${v}" style="left:${xs[i]}%;--ph:${(i*.25).toFixed(2)};--dl:${(i*.12).toFixed(2)}s" aria-label="香蕉 ${v}"><i class="vn6rope"></i><span class="vn6ban"><svg viewBox="0 0 64 64" aria-hidden="true">${BAN()}</svg><b>${v}</b></span></button>`).join('');
  $$('.vn6vine.c',vv).forEach(b=>b.onclick=()=>tap(b));if(G.timing)sway()}
 function sway(){cancelAnimationFrame(raf);const t0=performance.now();const step=t=>{if(!live()||!G)return;const ss=(t-t0)/1000;
   $$('.vn6vine.c',vv).forEach(b=>{if(b.dataset.lock)return;const ph=+getComputedStyle(b).getPropertyValue('--ph')||0;const amp=innerWidth<700?5:10;const a=amp*Math.sin(ss*1.6+ph);b.style.transform=`rotate(${a.toFixed(1)}deg)`;b.classList.toggle('near',a>amp*.35)});
   raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)}
 const pos=b=>{const R=$('#vn6st').getBoundingClientRect();const ban=$('.vn6ban',b).getBoundingClientRect();return {x:(ban.left+ban.width/2-R.left)/R.width*100,y:(ban.top-R.top)/R.height*100}};
 function tap(b){if(!G||G.busy||!live()||G.n>=G.total)return;hush();const v=+b.dataset.v;const p=pos(b);
  if(G.timing&&!b.classList.contains('near')){G.busy=true;swingTry(p,()=>{G.busy=false;tell(T.v_miss)});return}
  if(v!==G.next){G.busy=true;G.miss++;sfx('wrong');swingTry(p,()=>{G.busy=false;tell(T.v_oops);if(G.miss>=2){const ok=$$('.vn6vine.c',vv).find(x=>+x.dataset.v===G.next);if(ok){ok.classList.remove('hintglow');void ok.offsetWidth;ok.classList.add('hintglow')}}});return}
  G.busy=true;b.dataset.lock=1;b.style.transform='';sfx('pop');
  const mid={x:(parseFloat(mk.style.left)+p.x)/2,y:Math.max(8,Math.min(parseFloat(mk.style.top),p.y)-18)};
  mk.style.left=mid.x+'%';mk.style.top=mid.y+'%';mk.classList.add('swing');
  later(()=>{mk.style.left=(p.x-4)+'%';mk.style.top=(p.y-6)+'%'},calm?0:380);
  later(()=>{mk.classList.remove('swing');const bn=$('.vn6ban',b);if(bn)bn.classList.add('got');const cell=got.children[G.n];if(cell){cell.textContent=v;cell.classList.add('on')}
   tone(560+G.n*40,0,.14,'triangle',.08);try{burstEl(b,10)}catch(_){}sayR([String(v)]);G.n++;G.next+=G.step;
   if(G.n>=G.total){later(finish,700);return}
   later(()=>{$$('.vn6vine',vv).forEach(x=>{if(x!==b)x.classList.add('out')});mk.style.left='14%';mk.style.top='46%';b.style.left='14%';$('.vn6ban',b)&&$('.vn6ban',b).remove();b.classList.remove('c');b.classList.add('home')},calm?100:700);
   if(G.n===3||G.n===6)later(fork,calm?300:1300);else later(round,calm?250:1300)},calm?50:800)}
 function swingTry(p,done){const x0=parseFloat(mk.style.left),y0=parseFloat(mk.style.top);mk.style.left=(x0+(p.x-x0)*.4)+'%';mk.style.top=(y0-8)+'%';
  later(()=>{mk.style.left=x0+'%';mk.style.top=y0+'%';later(done,350)},calm?50:420)}
 // 岔路：兩個路牌，自己選
 function fork(){if(!live())return;cancelAnimationFrame(raf);vv.innerHTML='';let c=ZONES.filter(z=>!G.seen.includes(z));if(falls&&G.dest!=='falls'&&!G.seen.includes('falls'))c.push('falls');if(c.length<2)c=ZONES.filter(z=>z!==G.zone);
  const two=shuffle(c).slice(0,2);G.busy=true;
  fk.innerHTML=two.map((z,i)=>`<button class="p23sign ${i?'r':'l'}" data-z="${z}" aria-label="${TP['z_'+z]}"><span class="p23sp"><svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${zoneThumb(z)}</svg></span><b>${TP['z_'+z]}</b><i class="p23arw"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${i?'M10 20 H28 M20 11 L29 20 L20 29':'M30 20 H12 M20 11 L11 20 L20 29'}" stroke="#6A3A1A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></i></button>`).join('');
  fk.hidden=false;tell(TP.v_fork);
  $$('.p23sign',fk).forEach(b=>b.onclick=()=>{if(!G.busy)return;const z=b.dataset.z;sfx('pop');hush();fk.hidden=true;fk.innerHTML='';G.seen.push(z);
   mk.style.left=(b.classList.contains('r')?70:30)+'%';mk.style.top='30%';tell(TP.v_go);
   later(()=>{mk.style.left='14%';mk.style.top='46%';setZone(z);round()},calm?150:800)})}
 async function finish(){cancelAnimationFrame(raf);const n=gems('vine6Day');try{confetti()}catch(e){}vv.innerHTML='';gr.innerHTML='';
  zd.innerHTML=G.dest==='falls'?bigFalls():`<rect width="800" height="450" fill="#BFE8FF" opacity=".35"/><g transform="translate(150 20) scale(.64)">${treeHouse()}</g>`;
  const fr=G.friends.slice(0,5);gr.innerHTML=fr.map((k,i)=>`<span class="p23fr end" style="left:${(50+(i-(fr.length-1)/2)*15).toFixed(1)}%">${aniSVG(k)}</span>`).join('');
  mk.style.left='50%';mk.style.top=G.dest==='falls'?'40%':'34%';mk.classList.add('happy');
  const t=TP['v_arrive_'+G.dest];bub.textContent=t;await sayR([t,n>=3?T.gem3:T.gem1]);if(!live())return;await wait(calm?200:900);if(!live())return;mk.classList.remove('happy');endCard(n)}
 function endCard(n){const g=G;const ov=overlay(screen,`<div class="card p23vend"><h2>${TP.v_sum}</h2>
   <div class="p23sum"><div class="p23sr"><b>${TP.v_ban}</b><span class="p23si"><i class="p23ban"><svg viewBox="0 0 64 64">${BAN()}</svg></i><em>× ${g.total}</em></span></div>
   <div class="p23sr"><b>${TP.v_friends}</b><span class="p23si">${g.friends.length?g.friends.map(k=>`<i>${aniSVG(k)}</i>`).join(''):`<small>${TP.v_none}</small>`}</span></div>
   <div class="p23sr"><b>${TP.v_flowers}</b><span class="p23si">${g.items.length?g.items.map(k=>`<i>${itmSVG(k)}</i>`).join(''):`<small>${TP.v_none}</small>`}</span></div></div>
   <p class="small">得到 ${n} 顆寶石！</p>
   <div class="p23vb2"><button class="btn2 small" id="p23deco">${ico('house')}<span>${TP.v_deco}</span></button><button class="btn2 small" id="p23bk2">${ico('book')}<span>${TP.v_book}</span></button></div>
   <div class="row"><button class="btn" id="vn23again">再玩一次</button><button class="btn2" id="vn23out">回遊樂園</button></div></div>`);
  ov.classList.add('r26ov','p23ov');
  $('#vn23again',ov).onclick=()=>{sfx('pop');ov.remove();resetStage();$('#vn6menu').style.display='';tell(TP.v_menu)};
  $('#vn23out',ov).onclick=()=>{sfx('pop');ov.remove();vTok++;hush();go('park')};
  $('#p23deco',ov).onclick=()=>{sfx('pop');hush();ov.style.display='none';openHouse(()=>{if(ov.isConnected)ov.style.display=''})};
  $('#p23bk2',ov).onclick=()=>{sfx('pop');hush();ov.style.display='none';openBook(()=>{if(ov.isConnected)ov.style.display=''})}}
 function resetStage(){zd.innerHTML='';gr.innerHTML='';vv.innerHTML='';fk.hidden=true;mk.style.left='14%';mk.style.top='46%';G=null;hud()}
 hud();
 window.__P23=Object.assign(window.__P23||{},{v:{start:()=>{$('#vn6menu').style.display='none';start();return G},G:()=>G,
  tapNext:()=>{const b=$$('.vn6vine.c',vv).find(x=>+x.dataset.v===G.next&&!x.dataset.lock);if(!b)return false;if(G.timing)b.classList.add('near');b.click();return true},
  tapWrong:()=>{const b=$$('.vn6vine.c',vv).find(x=>+x.dataset.v!==G.next);if(!b)return false;if(G.timing)b.classList.add('near');b.click();return true},
  fork:i=>{const b=$$('.p23sign',fk)[i||0];if(!b)return false;b.click();return true},
  friend:()=>{const b=$('.p23fr',gr);if(!b)return false;b.click();return true},item:()=>{const b=$('.p23it:not(.got)',gr);if(!b)return false;b.click();return true}}});
};
/* ---------- 雨林貼紙簿 ---------- */
function openBook(onClose){const host=document.getElementById('screen')||document.body;const P=ST();const list=AORD.filter(k=>aOpen(k)||P.vs[k]);const got=list.filter(k=>P.vs[k]).length;
 const ov=overlay(host,`<div class="card p23book"><div class="p23mh"><span class="p23mi">${ico('book')}</span><div><h2>${TP.b_title}</h2><small>收集了 ${got}／${list.length} 張</small></div></div>
  <div class="p23bg" id="p23bg">${list.map(k=>`<button class="p23bs${P.vs[k]?' got':''}" data-k="${k}" aria-label="${P.vs[k]?TP['nm_'+k]:TP.b_what}"><span class="p23bp">${P.vs[k]?aniSVG(k):aniSil(k)}</span><b>${P.vs[k]?TP['nm_'+k]:'？'}</b></button>`).join('')}</div>
  <p class="p23bt" id="p23bt">${TP.b_hi}</p><div class="row"><button class="btn2" id="p23bclose">${TP.m_close}</button></div></div>`);
 ov.classList.add('p23ov');sayR([TP.b_hi]);
 $('#p23bg',ov).onclick=e=>{const b=e.target.closest('.p23bs');if(!b)return;const k=b.dataset.k;sfx('pop');hush();
  if(!P.vs[k]){$('#p23bt',ov).textContent=TP.b_what;sayR([TP.b_what]);return}
  $('#p23bt',ov).textContent=TP['a_'+k];sayR([TP['a_'+k]]);b.classList.remove('met');void b.offsetWidth;b.classList.add('met')};
 $('#p23bclose',ov).onclick=()=>{sfx('pop');hush();ov.remove();onClose&&onClose()};return ov}
/* ---------- 佈置小樹屋 ---------- */
function openHouse(onClose){const host=document.getElementById('screen')||document.body;const P=ST();let selK=null;
 const ov=overlay(host,`<div class="card p23house"><h2>${TP.h_title}</h2><div class="p23hv"><svg viewBox="0 0 800 500" id="p23hsv" aria-hidden="false"></svg></div>
  <p class="p23bt" id="p23ht"></p><div class="p23bag" id="p23bag"></div><div class="row"><button class="btn p23gold" id="p23hdone">${TP.h_done}</button></div></div>`);
 ov.classList.add('p23ov');const svg=$('#p23hsv',ov),bag=$('#p23bag',ov),ht=$('#p23ht',ov);
 const occ=()=>{const m={};P.th.forEach(([i,k])=>{m[i]=k});return m};
 function draw(){const m=occ();svg.innerHTML=treeHouse()+HSLOT.map(([x,y],i)=>m[i]?`<g class="p23hs full" data-i="${i}"><circle cx="${x}" cy="${y}" r="42" fill="#fff" opacity=".01"/><svg x="${x-44}" y="${y-44}" width="88" height="88" viewBox="0 0 64 64">${ITM[m[i]]?ITM[m[i]](uid('h')):''}</svg></g>`:`<g class="p23hs${selK?' on':''}" data-i="${i}"><circle cx="${x}" cy="${y}" r="30" fill="#fff" opacity=".35"/><circle cx="${x}" cy="${y}" r="30" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="8 7"/></g>`).join('');
  const ks=IORD.filter(k=>(P.vb[k]||0)>0);
  bag.innerHTML=ks.length?ks.map(k=>`<button class="p23bi${selK===k?' sel':''}" data-k="${k}" aria-label="${TP['it_'+k]}">${itmSVG(k)}<b>${P.vb[k]}</b></button>`).join(''):`<small>${TP.h_none}</small>`;
  if(selK&&!(P.vb[selK]>0))selK=null}
 draw();const first=Object.values(P.vb).some(v=>v>0)?TP.h_hi:TP.h_none;ht.textContent=first;sayR([first]);
 bag.onclick=e=>{const b=e.target.closest('.p23bi');if(!b)return;selK=b.dataset.k;sfx('pop');draw()};
 svg.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('.p23hs');if(!g)return;const i=+g.dataset.i;const m=occ();
  if(m[i]){P.th=P.th.filter(([j])=>j!==i);P.vb[m[i]]=(P.vb[m[i]]||0)+1;SV2();sfx('pop');ht.textContent=TP.h_take;draw();return}
  if(!selK||!(P.vb[selK]>0)){ht.textContent=Object.values(P.vb).some(v=>v>0)?TP.h_hi:TP.h_none;return}
  P.th.push([i,selK]);P.vb[selK]--;SV2();tone(880,0,.1,'triangle',.08);ht.textContent=TP.h_put;draw()});
 $('#p23hdone',ov).onclick=()=>{sfx('pop');hush();ov.remove();onClose&&onClose()};
 if(window.__P23)window.__P23.house={sel:k=>{selK=k;draw()},put:i=>{const g=svg.querySelector(`.p23hs[data-i="${i}"]`);if(!g)return false;g.dispatchEvent(new MouseEvent('click',{bubbles:true}));return true}};
 return ov}

/* ---------- 房間：小化石展示架（博物館有恐龍才出現；點了在房間裡開博物館） ---------- */
// 位置：E（mods/m9zj_home23.js）若提供 window.__H23.spot('fossilshelf') → {x,y,w}（房間 800×400 座標）就用它；沒有就用預設
// 左邊讓給玩具格（F 的小警車、2.2 長頸鹿身高尺最右到 x≈599）：架子從 x602 開始，右邊不超過 E 給的 H4（到 656），腳踩在 y≈396
const SHELF_L=602;
function fitShelf(z){const x2=z.x+z.w,bot=z.y+z.h;const x=Math.max(z.x,SHELF_L);const w=Math.max(40,Math.min(z.w,x2-x));return {x,y:bot-2-w*108/68,w}}
const SHELF0=fitShelf({x:588,y:288,w:68,h:110});
function shelfSpot(){try{const h=window.__H23;if(h&&typeof h.spot==='function'){const s=h.spot('fossilshelf');if(s&&isFinite(s.x)&&isFinite(s.y))return fitShelf({x:+s.x,y:+s.y,w:+s.w||68,h:+s.h||110})}}catch(e){}return SHELF0}
function addShelf(){try{if(S.screen!=='room')return;const fm=ST().fm;const ks=Object.keys(fm).filter(k=>DINO[k]).sort((a,b)=>(fm[b].t||0)-(fm[a].t||0));if(!ks.length)return;
 const sv=document.querySelector('#screen .rscene2 svg.bg');if(!sv)return;const old=sv.querySelector('.p23shelf');if(old)old.remove();
 const sp=shelfSpot(),sc=sp.w/68;const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','p23shelf');g.setAttribute('transform',`translate(${sp.x} ${sp.y}) scale(${f1(sc)})`);
 g.setAttribute('role','button');g.setAttribute('aria-label',TP.m_title);g.innerHTML=`<rect x="-4" y="-4" width="76" height="116" fill="#fff" opacity="0"/>`+shelfArt(ks);
 g.addEventListener('click',e=>{e.stopPropagation();sfx('pop');try{hush()}catch(_){}sayR([TP.m_shelf]);openMuseum({})});sv.appendChild(g);
 // 房間的 svg 若被別的圖層蓋住：放一顆透明按鈕在展示架上（跟著房間捲動）
 requestAnimationFrame(()=>{try{const r=g.getBoundingClientRect();if(!r.width)return;const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height*.6);if(hit&&(hit===g||g.contains(hit)))return;
  const host=sv.parentElement;if(!host)return;const hr=host.getBoundingClientRect();let b=host.querySelector('.p23shelfb');if(!b){b=document.createElement('button');b.className='p23shelfb';b.setAttribute('aria-label',TP.m_title);b.onclick=e=>{e.stopPropagation();sfx('pop');try{hush()}catch(_){}sayR([TP.m_shelf]);openMuseum({})};host.appendChild(b)}
  if(getComputedStyle(host).position==='static')host.style.position='relative';
  Object.assign(b.style,{left:(r.left-hr.left+host.scrollLeft)+'px',top:(r.top-hr.top+host.scrollTop)+'px',width:Math.max(44,r.width)+'px',height:Math.max(44,r.height)+'px'})}catch(e){}})}catch(e){console.log('p23 shelf',e)}}
{const _rm=SCREENS.room;if(typeof _rm==='function'){SCREENS.room=function(){const r=_rm.apply(this,arguments);try{setTimeout(addShelf,60);setTimeout(addShelf,700)}catch(e){}return r}}}
/* ---------- 給 F（禮物核心）：挖化石開不開 ---------- */
window.__F26=Object.assign(window.__F26||{},{gate:()=>{try{return typeof window.__gate26==='function'?window.__gate26('fossil26')||'':''}catch(e){return ''}}});
/* ---------- 遊樂園卡片的說明字跟著新玩法 ---------- */
try{if(typeof UXPD!=='undefined'){UXPD.fossil26='挖恐龍、塗顏色';UXPD.vine6='接香蕉、交朋友'}}catch(e){}
{const _pk=SCREENS.park;if(typeof _pk==='function'){SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const fix=()=>{[['fossil26','刷開沙子，拼回恐龍','挖恐龍、拼骨頭、塗顏色'],['vine6','照順序接香蕉','接香蕉、交朋友']].forEach(([k,a,b])=>{document.querySelectorAll(`.pcard[data-k="${k}"] span`).forEach(s=>{if(s.textContent===a)s.textContent=b})})};fix();setTimeout(fix,300)}catch(e){}return r}}}

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

// 房間畫面被重畫（換佈置、別的 mod 重畫背景）時，展示架不見了就補回來
{let t=0;const mo=new MutationObserver(()=>{if(t)return;t=setTimeout(()=>{t=0;try{if(S.screen==='room'&&ST()&&Object.keys(ST().fm).length&&!document.querySelector('#screen .p23shelf'))addShelf()}catch(e){}},250)});
 const sc=document.getElementById('screen');if(sc)mo.observe(sc,{childList:true,subtree:true})}
const css=document.createElement('style');css.id='p23css';css.textContent=`
/* ---- 挖化石 ---- */
.p23f .f26side{gap:8px}
.p23tools{display:flex;gap:8px;flex:0 0 auto}
.p23tool{flex:1 1 0;min-width:0;min-height:60px;border-radius:16px;border:3px solid rgba(255,217,138,.35);background:rgba(40,24,18,.5);color:#fff;font:inherit;font-size:16px;display:flex;align-items:center;justify-content:center;gap:4px;padding:2px 6px;cursor:pointer}
.p23tool svg{width:40px;height:40px;flex:none}.p23tool span{white-space:nowrap}
.p23tool.sel{border-color:#FFD24D;background:rgba(255,210,77,.28);box-shadow:0 0 12px rgba(255,210,77,.45)}
.p23tool.want{animation:p23want 1s ease-in-out 3}
@keyframes p23want{50%{box-shadow:0 0 22px #FFE27A;border-color:#FFE27A}}
.p23f .f26board canvas.shov{cursor:pointer}
.p23sites{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.p23sites .f26mp{height:58px!important}
.p23mrow{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:4px}
.p23mrow .r26go{margin-top:0}
.p23mbtn{min-height:60px;display:inline-flex;align-items:center;gap:6px;padding:4px 16px 4px 8px;font-size:20px}
.p23mbtn svg{width:42px;height:42px}
.p23gold{background:linear-gradient(180deg,#FFE27A,#FFB81C)!important;color:#5A3A0A!important;min-height:60px;font-size:22px}
.p23cgo{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:6px}
.p23cgo .btn2.small{min-height:48px}
/* ---- 遮罩卡片（塗色、博物館、貼紙簿、小樹屋） ---- */
.overlay.p23ov{z-index:40}
.p23ov .card{max-width:min(860px,calc(100vw - 20px));max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px);box-sizing:border-box;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 16px}
.p23ov .card h2{margin:0;font-size:24px}
.p23ov .card .row{justify-content:center;flex-wrap:wrap;gap:12px}
.p23ov .card .row>:is(.btn,.btn2){min-height:56px;min-width:7em}
.p23paint .p23pbody{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%}
.p23pv{position:relative;width:min(100%,620px);aspect-ratio:600/340;border-radius:18px;background:#FFF9EE;box-shadow:inset 0 0 0 3px #F0E2C8;flex:none}
.p23pv svg,.p23pv canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.p23pv svg{touch-action:none}.p23pv .p23reg{cursor:pointer}
.p23pv canvas{pointer-events:none;touch-action:none}.p23pv canvas.on{pointer-events:auto}
.p23pside{display:flex;flex-direction:column;align-items:center;gap:8px}
.p23pal{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.p23pal button{width:48px;height:48px;border-radius:50%;border:4px solid #fff;background:var(--c);box-shadow:0 2px 6px rgba(40,20,80,.25);cursor:pointer;padding:0}
.p23pal button.sel{border-color:#FFD24D;box-shadow:0 0 0 3px #7A5CE0,0 0 12px rgba(255,210,77,.6)}
.p23pm{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.p23mode{min-height:48px;padding:4px 14px;border-radius:14px;border:3px solid #E6DAF8;background:#FBF8FF;color:#3A2A55;font:inherit;font-size:17px;cursor:pointer}
.p23mode.sel{border-color:#FFD24D;background:#FFF4C8}
.p23mh{display:flex;align-items:center;gap:10px;align-self:stretch;justify-content:center}.p23mh small{font-size:16px;display:block}
.p23mi{width:52px;height:52px;flex:none}.p23mi svg{width:100%;height:100%}
.p23mg,.p23bg{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;width:100%}
.p23ms,.p23bs{position:relative;min-height:96px;border-radius:16px;border:3px solid #EEE6F8;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px;font:inherit;color:#3A2A55;cursor:pointer}
.p23ms b,.p23bs b{font-size:17px;font-weight:400}
.p23ms.got{background:#FFF9EE;border-color:#F0D8A8}.p23ms.hl{border-color:#FFD24D;box-shadow:0 0 14px rgba(255,210,77,.7)}
.p23mp{display:block;width:100%;height:70px}.p23mp svg{width:100%;height:100%}
.p23new{position:absolute;right:6px;top:4px;font-style:normal;font-size:14px;background:#FF7FB8;color:#fff;border-radius:999px;padding:0 8px}
.p23md{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%}.p23md[hidden],.p23mg[hidden]{display:none}
.p23mbig{width:min(100%,520px)}.p23mbig svg{width:100%;height:auto;display:block}
.p23md h3{margin:0;font-size:24px}.p23md p{margin:0;font-size:18px;text-align:center}
.p23mdb{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.p23mdb .btn2{min-height:48px}
.p23end .f26pic svg{max-height:30vh}
.p23ms.shake,.p23bs.shake{animation:p23sh .4s}
@keyframes p23sh{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
/* ---- 雨林盪藤蔓 ---- */
.p23v .vn6vines{pointer-events:none}
.p23zd{opacity:1;transition:opacity .6s}.p23zd.in{animation:p23fade .7s}
@keyframes p23fade{from{opacity:0}to{opacity:1}}
.p23gr{position:absolute;inset:0;z-index:3;pointer-events:none}
.p23fr{position:absolute;top:62%;width:clamp(76px,17vmin,128px);height:clamp(76px,17vmin,128px);margin-left:calc(clamp(76px,17vmin,128px)/-2);border:0;background:none;padding:0;cursor:pointer;pointer-events:auto;filter:drop-shadow(0 0 8px rgba(255,255,255,.75))}
.p23fr svg{width:100%;height:100%;display:block}
.p23fr:not(.met):not(.end)::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:3px dashed rgba(255,255,255,.85);animation:p23ring 2.4s linear infinite}
@keyframes p23ring{to{transform:rotate(360deg)}}
.p23fr.met{animation:p23hop .7s ease-out 1}.p23fr.met svg{filter:drop-shadow(0 0 10px #FFE27A)}
@keyframes p23hop{30%{transform:translateY(-16px)}60%{transform:translateY(0)}80%{transform:translateY(-6px)}}
.p23fr.end{top:66%;pointer-events:none;width:clamp(64px,14vmin,104px);height:clamp(64px,14vmin,104px);margin-left:calc(clamp(64px,14vmin,104px)/-2);animation:p23hop 1.2s ease-in-out infinite}
.p23it{position:absolute;top:84%;width:56px;height:56px;margin-left:-28px;border:0;padding:4px;border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 12px rgba(255,255,255,.8);cursor:pointer;pointer-events:auto;transition:transform .6s,opacity .6s}
.p23it svg{width:100%;height:100%;display:block}
.p23it.got{transform:translateY(-60px);opacity:0;pointer-events:none}
.p23lab.st{top:56%;background:#FFF4C8;color:#6A3A1A;border:2px solid #FFD24D}
.p23lab{position:absolute;top:76%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:#3A6A2A;border-radius:12px;padding:2px 10px;font-size:16px;white-space:nowrap;pointer-events:none}
.p23fork{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;gap:4%;background:rgba(20,40,20,.25)}
.p23fork[hidden]{display:none}
.p23sign{width:min(40%,280px);border:4px solid #FFD24D;border-radius:22px;background:linear-gradient(180deg,#B8865A,#8A5A36);color:#fff;font:inherit;padding:8px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;box-shadow:0 6px 0 rgba(60,30,10,.35);position:relative}
.p23sign .p23sp{display:block;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden}.p23sign .p23sp svg{width:100%;height:100%;display:block}
.p23sign b{font-size:22px;font-weight:400}
.p23arw{position:absolute;top:-18px;font-style:normal;width:40px;height:40px;border-radius:50%;background:#FFD24D;color:#6A3A1A;display:grid;place-items:center;font-size:24px}.p23sign.l .p23arw{left:-12px}.p23sign.r .p23arw{right:-12px}
.p23hud{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;padding:2px 8px 6px}
.p23hud .vn6got{padding:0;flex-wrap:nowrap}
@media (max-width:420px){.p23hud .vn6got{gap:3px}.p23hud .vn6got i{min-width:28px;height:28px;font-size:14px;border-radius:8px}.p23cc{font-size:15px;min-height:30px}.p23cc svg{width:24px;height:24px}}
.p23cnt{display:flex;gap:8px}
.p23cc{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.7);border-radius:999px;padding:2px 10px 2px 4px;color:#3A2A55;font-size:17px;min-height:34px}
.p23cc svg{width:28px;height:28px}
.vn6mk.happy{animation:p23hop 1s ease-in-out infinite}
.p23dopt .p23dp{display:block;width:44px;height:44px}.p23dopt .p23dp svg{width:100%;height:100%}
.p23gorow{display:flex;flex-direction:column;align-items:center}
.p23vbtn,.p23vb2{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px}
.p23vbtn .btn2,.p23vb2 .btn2{min-height:52px;display:inline-flex;align-items:center;gap:6px;padding:2px 14px 2px 6px;font-size:18px}
.p23vbtn svg,.p23vb2 svg{width:38px;height:38px}
.p23vend .p23sum{display:flex;flex-direction:column;gap:6px;width:100%}
.p23sr{display:flex;align-items:center;gap:10px;background:#FBF8FF;border-radius:14px;padding:4px 10px}
.p23sr>b{flex:none;font-weight:400;font-size:17px;min-width:6.5em;color:#5A3EB8}
.p23si{display:flex;flex-wrap:wrap;gap:4px;align-items:center}.p23si i{width:44px;height:44px;display:block}.p23si i svg{width:100%;height:100%}.p23si em{font-style:normal;font-size:22px;color:#3A2A55}.p23si small{font-size:16px;color:#6A5A8A}
.p23bp{display:block;width:84px;height:84px}.p23bp svg{width:100%;height:100%}
.p23bs.got{background:#F0FFF0;border-color:#BFE8B0}.p23bs.met{animation:p23hop .7s ease-out 1}
.p23bt{margin:0;font-size:18px;text-align:center;min-height:1.4em}
.p23hv{width:min(100%,640px)}.p23hv svg{width:100%;height:auto;display:block;border-radius:18px}
.p23hs{cursor:pointer}.p23hs.on circle:last-child{stroke:#FFE27A;animation:p23blink 1.2s ease-in-out infinite}
@keyframes p23blink{50%{opacity:.4}}
.p23bag{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:56px;align-items:center}.p23bag small{font-size:16px}
.p23bi{position:relative;width:60px;height:60px;border-radius:16px;border:3px solid #E6DAF8;background:#FBF8FF;padding:4px;cursor:pointer}
.p23bi svg{width:100%;height:100%}.p23bi b{position:absolute;right:-6px;bottom:-6px;min-width:22px;height:22px;border-radius:11px;background:#5A3EB8;color:#fff;font-size:14px;font-weight:400;line-height:22px}
.p23bi.sel{border-color:#FFD24D;box-shadow:0 0 12px rgba(255,210,77,.7)}
.p23fall{stroke-dasharray:30 18;animation:p23flow 1.2s linear infinite}
@keyframes p23flow{to{stroke-dashoffset:-48}}
/* 其他小遊戲結束卡的小收集 */
.p23col{display:flex;align-items:center;gap:8px;margin:2px auto 6px;max-width:100%;background:rgba(255,255,255,.12);border-radius:16px;padding:3px 12px 3px 4px;box-sizing:border-box}
.p23cn{width:44px;height:44px;flex:none;display:block;border-radius:12px;box-shadow:0 0 0 3px #FFD24D,0 0 12px rgba(255,210,77,.7)}.p23cn svg{width:100%;height:100%;display:block}
.p23cx{display:flex;flex-direction:column;align-items:flex-start;min-width:0;line-height:1.25}
.p23colt{font-size:16px;font-weight:400}
.p23cd{font-size:15px;opacity:.95;display:flex;align-items:center;gap:3px;flex-wrap:wrap}
.p23cd s{display:inline-block;width:9px;height:9px;border-radius:50%;border:2px solid rgba(255,226,122,.75);box-sizing:border-box}.p23cd s.got{background:#FFE27A;border-color:#FFE27A}.p23cd s.new{box-shadow:0 0 6px #FFE27A}
@media (orientation:landscape) and (max-height:500px){.p23col{margin:2px auto}.p23cn{width:36px;height:36px}.p23colt{font-size:15px}}
/* 收銀台結束卡：手機橫放（矮螢幕）原本會超出畫面 → 左邊主角、右邊字和按鈕；還是放不下就可以捲 */
.overlay.p23cash{z-index:40}
@media (orientation:landscape) and (max-height:500px){
 .overlay.p23cash{display:flex;align-items:center;justify-content:center}
 .overlay.p23cash .card{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-auto-rows:min-content;column-gap:18px;row-gap:4px;align-items:center;justify-items:center;align-content:center;
  width:min(720px,100%);max-width:100%;max-height:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 18px!important;box-sizing:border-box;height:auto!important}
 .overlay.p23cash .card>.face.big{grid-column:1;grid-row:1 / span 6;width:clamp(84px,30vh,130px)!important;height:auto!important;margin:0!important;align-self:center}
 .overlay.p23cash .card>.face.big svg{width:100%!important;height:auto!important;display:block}
 .overlay.p23cash .card>:not(.face){grid-column:2;max-width:100%}
 .overlay.p23cash .card h2{font-size:22px;margin:0;text-align:center}
 .overlay.p23cash .card>p{margin:0;font-size:17px;line-height:1.35;text-align:center}
 .overlay.p23cash .card .row{flex-wrap:nowrap!important;gap:10px;margin:2px 0 0}
 .overlay.p23cash .card .row>:is(.btn,.btn2){min-height:52px;min-width:6.5em}
}
/* 房間 */
.p23shelf{cursor:pointer;pointer-events:auto}
.p23shelfb{position:absolute;z-index:4;border:0;background:transparent;padding:0;cursor:pointer}
/* 直放、手機 */
@media (max-width:520px){.p23mg,.p23bg{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.p23ms,.p23bs{min-height:84px;padding:4px}.p23mp{height:52px}.p23bp{width:60px;height:60px}.p23ms b,.p23bs b{font-size:15px}
 .p23pal button{width:44px;height:44px}.p23sign b{font-size:18px}.p23tool{font-size:15px}.p23tool svg{width:34px;height:34px}.p23sr>b{min-width:5em;font-size:15px}.p23si i{width:36px;height:36px}}
@media (orientation:portrait) and (max-height:700px){.p23tool{min-height:52px}.p23tools{gap:6px}}
@media (orientation:landscape) and (max-height:500px){
 .p23ov .card{padding:8px 12px;gap:4px}.p23ov .card h2{font-size:20px}
 .p23paint .p23pbody{flex-direction:row;align-items:center}.p23pv{width:auto;height:min(58vh,260px)}.p23pside{flex:1;min-width:0}.p23pal{gap:6px}.p23pal button{width:44px;height:44px}
 .p23mg,.p23bg{grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px}.p23ms,.p23bs{min-height:76px;padding:2px}.p23mp{height:46px}.p23bp{width:52px;height:52px}
 .p23mbig{width:auto}.p23mbig svg{height:30vh;width:auto;aspect-ratio:600/340;margin:0 auto}.p23hv{width:auto;display:flex;justify-content:center}.p23hv svg{height:33vh;width:auto;aspect-ratio:800/500;margin:0 auto}
 .p23house{gap:2px!important}.p23house .row>.btn{min-height:50px}.p23house .p23bt,.p23md p,.p23bt{font-size:15px;min-height:0}.p23bi{width:48px;height:48px}.p23bag{min-height:48px}.p23md h3{font-size:20px}.p23mdb .btn2{min-height:44px}
 .p23v .vn6stage{min-height:0}
 .p23v .p23dopt{flex-direction:row;gap:8px;min-height:50px}.p23v .p23dopt .p23dp{width:34px;height:34px}
 .p23gorow{flex-direction:row;justify-content:center;gap:10px;flex-wrap:wrap}.p23gorow .ch5go{margin:6px 0 0!important}.p23gorow .p23vbtn{margin-top:6px}.p23hud{padding:0 6px 2px}.p23hud .vn6got i{min-width:26px;height:26px;font-size:14px}.p23cc{min-height:28px}
 .p23tool{min-height:48px;font-size:14px}.p23tool svg{width:30px;height:30px}
 .p23vend .p23sum{flex-direction:row;flex-wrap:wrap}.p23sr{flex:1 1 40%}.p23vbtn{margin-top:4px}.p23vbtn .btn2{min-height:46px}
 .p23sites .f26mp{height:40px!important}.p23mbtn{min-height:52px;font-size:18px}.p23mbtn svg{width:34px;height:34px}
 .p23fr{top:56%}.p23it{top:80%;width:48px;height:48px;margin-left:-24px}.p23sign b{font-size:18px}
}
.p23v.calm .p23fr,.p23v.calm .p23it,.p23v.calm .vn6mk{animation:none!important;transition:none}
.p23v.calm .p23fr::after{animation:none}
body.lite :is(.p23fr,.p23fr::after,.vn6mk.happy,.p23fall,.p23hs.on circle,.p23tool.want,.p23zd.in,.p23bs.met){animation:none!important}
@media (prefers-reduced-motion:reduce){:is(.p23fr,.p23fr::after,.vn6mk.happy,.p23fall,.p23hs.on circle,.p23tool.want,.p23zd.in,.p23bs.met,.p23ms.shake){animation:none!important}.p23it{transition:opacity .2s}}
`;document.head.appendChild(css);
window.__P23=Object.assign(window.__P23||{},{ver:'2026-11-28',TP,DINO,DORD,SITES,ANI:AORD,ITEMS:IORD,ART:GART,art:gSvg,sil:gSil,st:ST,openMuseum,openBook,openHouse,openPaint,dinoSVG,aniSVG,itmSVG,ico,treeHouse,bigFalls,zoneDeco,sitePic,shelfArt,addShelf,MORE,moreSVG,moreGive,chooseDino:s=>chooseDino(s)});

}catch(e){console.log('m9zi_park23',e)}}).toString()+')()')})();

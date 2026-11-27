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

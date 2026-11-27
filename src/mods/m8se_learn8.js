/* ================= 2.3 第八季學習動手題（m8se_learn8.js）—— 2026-11-28 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 題型（關卡表直接寫代碼，見 dev/types8_learn.md）：
 *   pin8 拼拼看　tone8 四聲　floor8 樓層　route8 逃生路線　money8 湊錢　change8 找錢　locker8 置物櫃
 *   deep8 比深淺　chart8 圖示圖表　wheel8 數輪子　clock8 撥時鐘　low8 小寫三層樓　case8 大小寫翻牌
 * 規則：每題都用手玩（拖、點、滑；拖拉都可以改成點一下）。沒有輸、不扣分、不倒數；做錯彈回去＋提示，第二次錯發光。
 *   角色只移動、不放大縮小。S.__auto 給測試自動作答。錯題本收整個代碼；學習報告分類 window.__s8cls(q)。
 * 語音：句子都在 T（lines/s8_learn.tsv 由 dev/mk_s8l.js 從這裡產生，前綴 S8L_）；沒錄音時只出字幕（m9z_notts）。 */
(function(){if(typeof window.__ev!=='function'){console.log('learn8: 找不到 __ev');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined')return;
/* ---------- 台詞（id 不含前綴；產生 tsv 時加 S8L_） ---------- */
const T=/*T8*/{
 PIN_I:'把左邊的注音，滑到右邊的注音上，合在一起！',PIN_Q:'合起來是什麼音？點對的圖。',PIN_H1:'按住左邊的卡片，滑到右邊的卡片上。',PIN_AG:'再聽一次：',
 PIN_HI:'聽聽看，要拼出這個音：',PIN_HQ:'哪一個注音要滑上去呢？',PIN_HH:'嘴巴慢慢念，第一個音是什麼呢？',
 PW_ba:'八，數字八！',PW_ma:'媽，媽媽的媽！',PW_ta:'他，指著的那個小朋友，就是他！',PW_la:'拉，拉開門的拉！',PW_ji:'雞，小雞的雞！',PW_qi:'七，數字七！',PW_xi:'西，西瓜的西！',
 PW_zhu:'豬，小豬的豬！',PW_shu:'書，看書的書！',PW_he:'喝，喝牛奶的喝！',PW_ge:'哥，哥哥的哥！',PW_che:'車，汽車的車！',
 Z_ba:'八',Z_ma:'媽',Z_ta:'他',Z_la:'拉',Z_ji:'雞',Z_qi:'七',Z_xi:'西',Z_zhu:'豬',Z_shu:'書',Z_he:'喝',Z_ge:'哥',Z_che:'車',Z_ma2:'麻',Z_ma3:'馬',Z_ma4:'罵',Z_ma5:'嗎',   // 拼讀合起來的音（已經有 z1|字 錄音的會優先用）

 TN_I:'仔細聽，這是第幾聲？把泡泡拖到對的聲調小路上。',TN_E:'點一下小路，可以先聽聽看；再點一次，就是選它。',TN_H1:'再聽一次，聲音是平平的、往上爬、先下去再上來，還是往下滑呢？',
 TN_1:'媽，一聲，平平的。',TN_2:'麻，二聲，往上爬。',TN_3:'馬，三聲，先下去再上來。',TN_4:'罵，四聲，往下滑。',TN_5:'嗎，輕聲，輕輕的。',
 TONE1:'一聲',TONE2:'二聲',TONE3:'三聲',TONE4:'四聲',TONE5:'輕聲',
 F1:'一樓',F2:'二樓',F3:'三樓',F4:'四樓',F5:'五樓',F6:'六樓',F7:'七樓',F8:'八樓',F9:'九樓',F10:'十樓',
 FL_E:'警報器響了！走樓梯，一層一層往下走，走到一樓出口！',FL_NOW:'我們現在在',FL_EL:'失火了不搭電梯，要走樓梯喔！',FL_OUT:'到一樓了，從出口出去，到外面集合！',
 FT1:'走樓梯往下走，走到一樓，再按「到了」！',FT2:'走樓梯往下走，走到二樓，再按「到了」！',FT3:'走樓梯往下走，走到三樓，再按「到了」！',FT4:'走樓梯往下走，走到四樓，再按「到了」！',FT5:'走樓梯往下走，走到五樓，再按「到了」！',
 FT6:'走樓梯往下走，走到六樓，再按「到了」！',FT7:'走樓梯往下走，走到七樓，再按「到了」！',FT8:'走樓梯往下走，走到八樓，再按「到了」！',FT9:'走樓梯往下走，走到九樓，再按「到了」！',
 FD1:'從這裡往下走一層，再按「到了」！',FD2:'從這裡往下走兩層，再按「到了」！',FD3:'從這裡往下走三層，再按「到了」！',FD4:'從這裡往下走四層，再按「到了」！',FD5:'從這裡往下走五層，再按「到了」！',
 FD6:'從這裡往下走六層，再按「到了」！',FD7:'從這裡往下走七層，再按「到了」！',FD8:'從這裡往下走八層，再按「到了」！',FD9:'從這裡往下走九層，再按「到了」！',
 FL_HERE:'這裡是',FL_MORE:'還沒到喔，看看樓層的號碼牌。',FL_H1:'一層一層走，邊走邊數樓層的號碼。',FL_OK:'走到了！走樓梯最安全！',
 FO_I:'把信送到這一樓：',FO_H1:'從最下面開始數：一樓、二樓、三樓……',FO_OK:'送到了！',
 RT_I:'火災演練！跟著綠色的逃生指示牌走，牌子上的小人往哪邊跑，我們就往哪邊走。',RT_L:'往左轉！',RT_R:'往右轉！',RT_F:'直直走！',
 RT_H1:'看綠色的牌子，小人往哪邊跑呢？',RT_EL:'失火了不搭電梯，要走樓梯喔！',RT_OK:'逃出來了！到全家約好的地方集合。',
 MN_I:'把錢拖進盤子，湊到',MN_OVER:'太多囉！換小一點的錢試試看。',MN_H1:'先放大的錢，再放小的錢。',MN_HOK:'湊好了，就按「好了」。',MN_NOT:'還不一樣多喔，再數一數。',
 MN_B:'一張一百元，跟幾個五十元一樣多呢？把五十元拖進盤子，湊到一百元。',MN_BOK:'兩個五十元，就是一百元！',MN_ALL:'一百元，一張就夠了！',
 CG_I:'買東西囉！這個要',CG_PAY:'你給了',CG_DO:'要找你多少錢呢？把一元一個一個放進格子，從價錢數到你給的錢。',CG_HD:'要找你多少錢呢？把錢放進找錢盤，放好按「好了」。',
 CG_BACK:'找你',CG_H1:'從價錢開始往上數，數到你給的錢。',
 LK_I:'幫忙把鑰匙放進同一個號碼的置物櫃！',LK_NO:'不是這一格喔。',
 DP_knee:'把我拖到水只到膝蓋的地方。',DP_belly:'把我拖到水到肚子的地方。',DP_neck:'把我拖到水到脖子的地方。',DP_order:'誰站的地方水最淺？從淺到深，一個一個點。',DP_safe:'要在哪裡玩水呢？把我拖到站得到、水淺淺的地方。',
 DS_knee:'水到膝蓋，淺淺的。',DS_belly:'水到肚子。',DS_neck:'水到脖子，好深喔！',DS_deep:'浮球繩外面站不到，不能去！',DS_safe:'在站得到的淺水區玩，大人在旁邊，伸手就抓得到！',DP_H1:'看看水面，淹到身體的哪裡？',DS_neck2:'水到脖子太深了，回到淺一點的地方。',
 CH_I:'公園裡有好多車！把每一台車放到它那一排，一格放一台。',CH_QM:'哪一種車最多？點那一排。',CH_QL:'哪一種車最少？點那一排。',CH_H1:'一格一台，看哪一排疊得最高。',CH_H2:'一格一台，看哪一排疊得最矮。',CH_HD:'把兩排比一比，多出來的有幾格？',
 CH_M_bike:'腳踏車最多！',CH_M_scoot:'滑板車最多！',CH_M_tri:'三輪車最多！',CH_L_bike:'腳踏車最少！',CH_L_scoot:'滑板車最少！',CH_L_tri:'三輪車最少！',
 CH_D_bike_scoot:'腳踏車比滑板車多幾台？',CH_D_bike_tri:'腳踏車比三輪車多幾台？',CH_D_scoot_bike:'滑板車比腳踏車多幾台？',CH_D_scoot_tri:'滑板車比三輪車多幾台？',CH_D_tri_bike:'三輪車比腳踏車多幾台？',CH_D_tri_scoot:'三輪車比滑板車多幾台？',
 CH_N1:'多一台！',CH_N2:'多兩台！',CH_N3:'多三台！',CH_N4:'多四台！',CH_N5:'多五台！',CH_SORT:'放好了！',
 WH_I:'一台腳踏車有兩個輪子。把腳踏車一台一台停進停車架，兩個兩個數輪子！',WH_Q:'一共有幾個輪子？',WH_H1:'兩個兩個數：二、四、六……',
 CK_I:'把時鐘撥到',CK_DO:'轉一轉時鐘的針，撥好了，按「撥好了」！',CK_EASY:'轉一轉短短的針，撥好了，按「撥好了」！',CK_SW:'下水游泳，游三十分鐘要上岸休息一下。那時候是幾點呢？',CK_SW330:'游三十分鐘，三點半要上岸休息。把時鐘撥到三點半！',CK_SWG:'游泳游三十分鐘，就要上岸休息一下。',
 CK_H1:'短短的針指著幾點；長長的針指著十二是整點，指著六是半點。',
 LW_up:'往上長！',LW_mid:'住中間！',LW_down:'往下掉！',LW_H1:'看看字母有沒有往上長出來，或是往下掉下去。'
}/*/T8*/;
const OLD={glow:'我幫你，看發光的那一個！',together:'我陪你一起數！',found:'找到了！',hun2:'先看十位，找到那一排，再一格一格找！',
 caseI:'大寫和小寫是好朋友，幫它們配成一對吧！',caseOK:'大寫和小寫，是好朋友！',floorI:'把小寫字母，送回它住的那一層！',memPair:'我偷偷告訴你，發光的兩張是一對！',memDone:'全部找到了！記憶力好好喔！'};
/* ---------- 共用 ---------- */
const byD=(e,m,h)=>S.diff==='easy'?e:S.diff==='hard'?h:m;
const RM=()=>{try{return !!reduced||!!S.lite}catch(e){return false}};
const LOG=p=>{try{if(window.__s7log)p.forEach(x=>{if(typeof x==='string'&&x.trim())__s7log.push(x)})}catch(e){}return p};
const clean=p=>p.filter(x=>x!=null&&x!=='');
const SAY=p=>{try{return say(LOG(clean(p)))}catch(e){return Promise.resolve()}};
const P=(html,parts,sp)=>setPrompt(html,LOG(clean(parts)),sp);
const PS=(text,parts)=>{try{return petSay(text,LOG(clean(parts||[text])))}catch(e){}};
const OK=(el,parts)=>right(el,LOG(clean([praise(),...parts])));
const _=()=>({pause:1});   // 把句子分開（每一段各自有錄音）
const EN=x=>({en:x,slow:1});
const ZR=t=>({zh:(typeof ZREAD!=='undefined'&&ZREAD[t])||t,slow:1});
const vh=k=>{try{return typeof voHas==='function'&&voHas(k)}catch(e){return false}};
const ZW=w=>vh('z1|'+w)?{zh:w,slow:1}:vh('z|'+w)?w:vh('z2|'+w)?{zh:w,slow:2}:w;   // 合起來的音：有錄音就用，沒有就用台詞檔裡的「z|字」
const CNN=n=>{const d='零一二三四五六七八九';if(n<=10)return n===10?'十':d[n];if(n<20)return '十'+(n%10?d[n%10]:'');return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'')};
const CQ=n=>n===2?'兩':CNN(n);
const bump=el=>{if(!el)return;el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')};
const W=(el)=>{try{wrong(el)}catch(e){}};
const ic=e=>{try{if(ICONART[e])return ICONART[e]}catch(_){}return `<svg viewBox="0 0 100 100" aria-hidden="true"><text x="50" y="56" font-size="76" text-anchor="middle" dominant-baseline="middle">${e}</text></svg>`};
const anSafe=k=>{try{return animal(k)}catch(e){return ic('⭐')}};
const heroMini=()=>{try{return princess(S.look,'class="s8hp"')}catch(e){return ic('👧')}};
const uid=()=>{try{return nid()}catch(e){return 's8'+Math.random().toString(36).slice(2,8)}};
const CH=()=>+window.__s8chT||((S.ch|0)+1);   // __s8chT 只給測試用
const FULL=type=>{try{const c=String(S.qs&&S.qs[S.q]||'');if(c.startsWith(type+':'))return c;
 if(c.startsWith('rev:')){const e=(V2.wrong||[]).find(x=>x.id===+c.slice(4));if(e&&String(e.t).startsWith(type+':'))return String(e.t)}}catch(e){}return type+':auto'};
const ARG=type=>FULL(type).slice(type.length+1);
const begin=()=>{S.__auto=null;S.w4fb=0;S.ans=null;S.revKey=null;S.hint=null};
const okMark=el=>{if(el)el.classList.add('s8ok')};
// 拖拉：按住拖到目標放開；只點一下就呼叫 onTap。targets() 回傳可以放的元素。外層被縮放（zoom）時照比例移動。
function drag8(el,o){let dn=null;el.classList.add('s8dg');
 const hitT=(x,y)=>(o.targets()||[]).find(t=>{const r=t.getBoundingClientRect();return r.width&&x>=r.left-6&&x<=r.right+6&&y>=r.top-6&&y<=r.bottom+6})||null;
 el.addEventListener('pointerdown',e=>{if(S.lock||(o.canStart&&!o.canStart()))return;const r=el.getBoundingClientRect();dn={id:e.pointerId,x:e.clientX,y:e.clientY,mv:false,z:(el.offsetWidth?r.width/el.offsetWidth:1)||1};try{el.setPointerCapture(e.pointerId)}catch(_){}});
 el.addEventListener('pointermove',e=>{if(!dn||e.pointerId!==dn.id)return;const dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(!dn.mv&&Math.abs(dx)+Math.abs(dy)>10){dn.mv=true;el.classList.add('s8drag')}
  if(dn.mv){e.preventDefault();el.style.transform=`translate(${dx/dn.z}px,${dy/dn.z}px)`;const t=hitT(e.clientX,e.clientY);(o.targets()||[]).forEach(x=>x.classList.toggle('s8over',x===t))}});
 const end=(e,cancel)=>{if(!dn||e.pointerId!==dn.id)return;const mv=dn.mv;dn=null;el.classList.remove('s8drag');el.style.transform='';(o.targets()||[]).forEach(x=>x.classList.remove('s8over'));
  if(cancel)return;if(mv){const t=hitT(e.clientX,e.clientY);if(t)o.onDrop(t);else bump(el)}else if(o.onTap)o.onTap()};
 el.addEventListener('pointerup',e=>end(e,false));el.addEventListener('pointercancel',e=>end(e,true));
 el.addEventListener('click',e=>{if(e.detail===0&&o.onTap)o.onTap()})}
const flyTo=(src,dst,html)=>{try{if(RM()||!src||!dst)return;const a=src.getBoundingClientRect(),b=dst.getBoundingClientRect();if(!a.width||!b.width)return;const f=document.createElement('div');f.className='s8fly';f.innerHTML=html;
 Object.assign(f.style,{left:a.left+'px',top:a.top+'px',width:a.width+'px',height:a.height+'px'});document.body.appendChild(f);
 f.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${b.left+b.width/2-a.left-a.width/2}px,${b.top+b.height/2-a.top-a.height/2}px)`,opacity:.2}],{duration:380,easing:'ease-in'}).finished.then(()=>f.remove()).catch(()=>f.remove())}catch(e){}};
const availH=play=>{try{const ch=play.clientHeight;if(ch>140)return ch;const t=play.getBoundingClientRect().top;return Math.max(180,innerHeight-t-10)}catch(e){return 400}};
const land=()=>innerWidth>innerHeight*1.15;
const numBtns=(opts)=>`<div class="s8nums">${opts.map(v=>`<button class="s8num" data-v="${v}" aria-label="${v}">${v}</button>`).join('')}</div>`;
const near3=(n,k,lo,step)=>{const s=new Set([n]);const c=[n+step,n-step,n+2*step,n-2*step].filter(x=>x>=lo);for(const x of shuffle(c)){if(s.size>=k)break;s.add(x)}return shuffle([...s])};

/* ---------- 新美術（原創 SVG：平塗＋柔和漸層、白色亮點、沒有黑色描邊；漸層 id 每次都不一樣） ---------- */
const hl=(x,y,rx,ry,a=-20)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".55" transform="rotate(${a} ${x} ${y})"/>`;
const eyes=(x1,x2,y,r=2.6)=>`<circle cx="${x1}" cy="${y}" r="${r}" fill="#3A2A3A"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#3A2A3A"/><circle cx="${x1+.9}" cy="${y-.9}" r="${r*.38}" fill="#fff"/><circle cx="${x2+.9}" cy="${y-.9}" r="${r*.38}" fill="#fff"/>`;
const blush=(x1,x2,y)=>`<ellipse cx="${x1}" cy="${y}" rx="4" ry="2.4" fill="#FF9FB8" opacity=".7"/><ellipse cx="${x2}" cy="${y}" rx="4" ry="2.4" fill="#FF9FB8" opacity=".7"/>`;
const lg=(id,a,b,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const ART8={
 n8:()=>numCard(8,'#FF7FA8'),n7:()=>numCard(7,'#6FA8FF'),
 mom:()=>{const g=uid();return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,'#FFB0CF','#FF7FAE')}</defs><circle cx="50" cy="20" r="11" fill="#7A4A2E"/><path d="M28 98 Q30 62 50 60 Q70 62 72 98Z" fill="url(#${g})"/>
  <circle cx="50" cy="40" r="19" fill="#FFE4D4"/><path d="M31 40 Q30 20 50 20 Q70 20 69 40 Q64 28 50 28 Q36 28 31 40Z" fill="#8A5232"/><path d="M31 40 Q28 52 33 58 L35 44Z M69 40 Q72 52 67 58 L65 44Z" fill="#8A5232"/>${eyes(43,57,41)}${blush(38,62,47)}<path d="M45 49 Q50 53 55 49" stroke="#C0606A" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M50 74 l-5 -5 a3.4 3.4 0 0 1 5 -4.4 a3.4 3.4 0 0 1 5 4.4Z" fill="#fff" opacity=".85"/>${hl(40,70,3,6)}</svg>`},
 he:()=>{const g=uid(),h=uid(),k=uid();return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,'#FFB0CF','#FF7FAE')}${lg(h,'#9FE8B8','#5CC98A')}<radialGradient id="${k}"><stop offset="0" stop-color="#FFF6C8"/><stop offset="1" stop-color="#FFE27A" stop-opacity="0"/></radialGradient></defs>
  <circle cx="71" cy="54" r="30" fill="url(#${k})"/><path d="M71 12 v9 M66 17 l5 5 l5 -5" stroke="#FF9F3C" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M56 98 Q57 70 71 68 Q85 70 86 98Z" fill="url(#${h})"/><circle cx="71" cy="48" r="15" fill="#FFE4D4"/><path d="M56 47 Q56 32 71 32 Q86 32 86 47 Q80 39 71 39 Q62 39 56 47Z" fill="#5A3A26"/>${eyes(66,76,49,2.2)}${blush(62,80,54)}<path d="M67 56 Q71 59 75 56" stroke="#C0606A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M10 98 Q11 74 24 72 Q37 74 38 98Z" fill="url(#${g})"/><path d="M34 80 Q44 74 52 70" stroke="#FFE4D4" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M50 71 L58 67" stroke="#FFE4D4" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="24" cy="56" r="14" fill="#FFE4D4"/><path d="M10 55 Q10 40 24 40 Q38 40 38 55 Q34 46 24 46 Q14 46 10 55Z" fill="#8A5232"/>${eyes(21,30,57,2)}${blush(17,33,62)}<path d="M22 63 Q25 66 28 63" stroke="#C0606A" stroke-width="1.6" fill="none" stroke-linecap="round"/>${hl(64,76,2.4,5)}</svg>`},
 bro:()=>{const g=uid();return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,'#A8CFFF','#6FA0F0')}</defs><path d="M28 98 Q30 58 50 56 Q70 58 72 98Z" fill="url(#${g})"/><rect x="35" y="58" width="5" height="40" rx="2" fill="#FFC93C"/><rect x="60" y="58" width="5" height="40" rx="2" fill="#FFC93C"/>
  <circle cx="50" cy="34" r="18" fill="#FFE4D4"/><path d="M32 32 Q32 14 50 14 Q68 14 68 32 Q66 22 56 24 Q50 18 44 24 Q36 22 32 32Z" fill="#3E2A1E"/>${eyes(43,57,35)}${blush(38,62,41)}<path d="M45 43 Q50 47 55 43" stroke="#C0606A" stroke-width="2" fill="none" stroke-linecap="round"/>${hl(40,66,3,6)}</svg>`},
 pull:()=>{const g=uid(),h=uid();return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,'#FFD9A8','#E8A868')}${lg(h,'#FFB0CF','#FF6FA8',1,0)}</defs><rect x="22" y="8" width="56" height="88" rx="8" fill="#C9B8E8"/><rect x="27" y="13" width="46" height="83" rx="6" fill="url(#${g})"/>
  <rect x="33" y="20" width="34" height="26" rx="5" fill="#FFF3DC" opacity=".55"/><rect x="33" y="54" width="34" height="34" rx="5" fill="#FFF3DC" opacity=".4"/><rect x="60" y="48" width="7" height="16" rx="3.5" fill="#FFD24D"/>
  <path d="M58 76 Q40 80 22 70" stroke="url(#${h})" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M14 66 L28 62 L24 76Z" fill="#FF6FA8"/>${hl(36,24,3,7)}</svg>`},
 bill:()=>bill100(),bike:()=>vBike(),scoot:()=>vScoot(),tri:()=>vTri()
};
function numCard(n,c){const g=uid();const dots=Array.from({length:n},(_,i)=>{const r=i<4?0:1,k=i<4?i:i-4,cnt=r?n-4:4;const x=50+(k-(cnt-1)/2)*15;return `<circle cx="${x}" cy="${r?88:76}" r="5" fill="${c}"/>`}).join('');
 return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${lg(g,'#FFFBEF','#FFE9B0')}</defs><rect x="8" y="4" width="84" height="94" rx="16" fill="url(#${g})"/><text x="50" y="58" text-anchor="middle" font-family="Baloo 2,Arial Rounded MT Bold,sans-serif" font-weight="800" font-size="60" fill="${c}">${n}</text>${dots}${hl(22,16,4,8)}</svg>`}
function bill100(){const g=uid(),h=uid();return `<svg viewBox="0 0 160 80" aria-hidden="true" class="s8bill"><defs>${lg(g,'#D8F7E6','#9FE0C0',1,1)}<radialGradient id="${h}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFF6C8"/><stop offset="1" stop-color="#FFC93C"/></radialGradient></defs>
 <rect x="2" y="2" width="156" height="76" rx="10" fill="url(#${g})"/><rect x="8" y="8" width="144" height="64" rx="7" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 4" opacity=".9"/>
 <circle cx="40" cy="40" r="22" fill="url(#${h})"/><path d="${typeof starD==='function'?starD(40,41,14):'M40 26 L44 36 L54 37 L46 44 L49 54 L40 48 L31 54 L34 44 L26 37 L36 36Z'}" fill="#FF9FC8"/>
 <path d="M112 50 L124 40 L136 50Z" fill="#FF9A8A"/><rect x="115" y="50" width="18" height="14" rx="2" fill="#FFF7DE"/><rect x="121" y="55" width="6" height="9" rx="1.5" fill="#B99CFF"/>
 <text x="96" y="40" text-anchor="middle" font-family="Baloo 2,Arial Rounded MT Bold,sans-serif" font-weight="800" font-size="30" fill="#2E7A58">100</text><text x="96" y="60" text-anchor="middle" font-size="15" font-weight="700" fill="#2E7A58">元</text>${hl(20,16,4,9,-30)}</svg>`}
const wheel=(x,y,r,g)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#6A6A8A"/><circle cx="${x}" cy="${y}" r="${r*.62}" fill="url(#${g})"/><circle cx="${x}" cy="${y}" r="${r*.18}" fill="#B8B8D0"/>`;
function vBike(cls=''){const g=uid(),w=uid();return `<svg viewBox="0 0 100 70" aria-hidden="true" class="s8veh ${cls}"><defs>${lg(g,'#FFA8C8','#FF6FA8')}<radialGradient id="${w}"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E6E0F8"/></radialGradient></defs>
 <g class="s8w">${wheel(24,48,17,w)}</g><g class="s8w">${wheel(76,48,17,w)}</g><path d="M24 48 L42 24 L66 24 L76 48 M42 24 L50 48 L66 24 M50 48 L24 48" stroke="url(#${g})" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
 <rect x="34" y="15" width="16" height="6" rx="3" fill="#7A5AC8"/><path d="M66 24 L62 12 L72 10" stroke="#9A8AC0" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="73" cy="9" r="3.4" fill="#FFD24D"/>${hl(40,24,2,4)}</svg>`}
function vScoot(cls=''){const g=uid(),w=uid();return `<svg viewBox="0 0 100 70" aria-hidden="true" class="s8veh ${cls}"><defs>${lg(g,'#A8E4FF','#4FB8F0')}<radialGradient id="${w}"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E6E0F8"/></radialGradient></defs>
 <g class="s8w">${wheel(22,56,10,w)}</g><g class="s8w">${wheel(78,56,10,w)}</g><rect x="18" y="44" width="62" height="9" rx="4.5" fill="url(#${g})"/><path d="M76 48 L68 8" stroke="url(#${g})" stroke-width="7" stroke-linecap="round"/><path d="M58 8 H80" stroke="#7A5AC8" stroke-width="7" stroke-linecap="round"/>${hl(30,46,2,5,-70)}</svg>`}
function vTri(cls=''){const g=uid(),w=uid();return `<svg viewBox="0 0 100 70" aria-hidden="true" class="s8veh ${cls}"><defs>${lg(g,'#FFE68A','#FFB33A')}<radialGradient id="${w}"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E6E0F8"/></radialGradient></defs>
 <g class="s8w">${wheel(70,46,19,w)}</g><g class="s8w">${wheel(18,56,10,w)}</g><g class="s8w">${wheel(36,56,10,w)}</g><path d="M14 46 H44 L56 30 L70 46 M56 30 L60 14 L70 12" stroke="url(#${g})" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M36 34 Q36 24 48 26 L46 36Z" fill="#FF7FA8"/><circle cx="71" cy="11" r="3.4" fill="#7FE3F0"/>${hl(26,46,2,4,-70)}</svg>`}
const VEH={bike:{n:'腳踏車',a:vBike},scoot:{n:'滑板車',a:vScoot},tri:{n:'三輪車',a:vTri}};
const exitSign=(dir,cls='')=>{const g=uid();const rot={L:180,R:0,F:-90}[dir]||0;return `<svg viewBox="0 0 120 60" aria-hidden="true" class="s8exit ${cls}"><defs>${lg(g,'#5FE0A0','#2FB874')}</defs><rect x="2" y="2" width="116" height="56" rx="9" fill="url(#${g})"/>
 <g transform="translate(${dir==='L'?102:22} 6) scale(${dir==='L'?-1:1} 1)"><circle cx="14" cy="8" r="6" fill="#fff"/><path d="M14 16 L10 30 L2 40 M10 30 L20 40 M12 20 L2 24 M13 20 L24 26" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/></g>
 <g transform="translate(${dir==='L'?36:84} 30) rotate(${rot})"><path d="M-14 0 H8 M0 -10 L12 0 L0 10" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>${hl(14,12,3,6,-40)}</svg>`};
const elevSVG=()=>`<svg viewBox="0 0 60 80" aria-hidden="true" class="s8elv"><rect x="4" y="4" width="52" height="72" rx="7" fill="#D8D2E8"/><rect x="10" y="18" width="19" height="54" rx="2" fill="#EEEAF6"/><rect x="31" y="18" width="19" height="54" rx="2" fill="#EEEAF6"/><path d="M24 10 L30 5 L36 10Z M24 13 L30 18 L36 13Z" fill="#9A8AC0"/>
 <circle cx="30" cy="45" r="17" fill="none" stroke="#FF6F7F" stroke-width="5"/><path d="M18 33 L42 57" stroke="#FF6F7F" stroke-width="5" stroke-linecap="round"/></svg>`;
const keySVG=n=>{const g=uid();return `<svg viewBox="0 0 120 70" aria-hidden="true"><defs>${lg(g,'#FFE68A','#F2B544')}</defs><circle cx="26" cy="35" r="18" fill="url(#${g})"/><circle cx="26" cy="35" r="7" fill="#FFF7DE"/><rect x="40" y="30" width="36" height="10" rx="5" fill="url(#${g})"/><rect x="60" y="38" width="6" height="10" rx="2" fill="#F2B544"/>
 <rect x="74" y="14" width="42" height="42" rx="10" fill="#FF8FB8"/><text x="95" y="44" text-anchor="middle" font-family="Baloo 2,Arial Rounded MT Bold,sans-serif" font-weight="800" font-size="26" fill="#fff">${n}</text>${hl(20,28,3,5)}</svg>`};
const plateSVG=()=>{const g=uid();return `<svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" class="s8plsvg"><defs><radialGradient id="${g}" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E9E2FF"/></radialGradient></defs><ellipse cx="100" cy="30" rx="98" ry="28" fill="#D9CCF6"/><ellipse cx="100" cy="28" rx="86" ry="22" fill="url(#${g})"/></svg>`};
const coin=v=>{try{return v===100?bill100():coinSVG(v)}catch(e){return `<b>${v}</b>`}};

/* ---------- 1. 拼拼看 pin8 ---------- */
const PIN={'ㄅㄚ':{w:'八',ch:46,p:'n8',l:'PW_ba'},'ㄇㄚ':{w:'媽',ch:46,p:'mom',l:'PW_ma'},'ㄊㄚ':{w:'他',ch:46,p:'he',l:'PW_ta'},'ㄌㄚ':{w:'拉',ch:46,p:'pull',l:'PW_la'},
 'ㄐㄧ':{w:'雞',ch:47,p:'🐔',l:'PW_ji'},'ㄑㄧ':{w:'七',ch:47,p:'n7',l:'PW_qi'},'ㄒㄧ':{w:'西',ch:47,p:'🍉',l:'PW_xi'},'ㄓㄨ':{w:'豬',ch:47,p:'pig',l:'PW_zhu'},'ㄕㄨ':{w:'書',ch:47,p:'📖',l:'PW_shu'},
 'ㄏㄜ':{w:'喝',ch:48,p:'🥛',l:'PW_he'},'ㄍㄜ':{w:'哥',ch:48,p:'bro',l:'PW_ge'},'ㄔㄜ':{w:'車',ch:48,p:'🚗',l:'PW_che'}};
const PINX=[['ㄊㄚ','ㄍㄜ'],['ㄅㄚ','ㄑㄧ']];   // 不放在同一題（都是人、都是數字）
const clash=(a,b)=>PINX.some(([x,y])=>(a===x&&b===y)||(a===y&&b===x));
const picArt=k=>ART8[k]?ART8[k]():k==='pig'?anSafe('pig'):ic(k);
const zyV=(s,mk,light)=>`<span class="s8zv">${light?'<i class="s8tl">˙</i>':''}${[...s].map((c,i,a)=>`<span>${c}${i===a.length-1&&mk?`<i class="s8tm">${mk}</i>`:''}</span>`).join('')}</span>`;
function pinPool(){const ch=CH();const all=Object.keys(PIN);if(ch<46||ch>=49)return all;
 const now=all.filter(k=>PIN[k].ch===ch),before=all.filter(k=>PIN[k].ch<ch);return Math.random()<.25&&before.length?before:now}
function bPin(play,sp){begin();const a=ARG('pin8');let list=a&&a!=='auto'?a.split('|').filter(k=>PIN[k]):[];if(!list.length)list=pinPool();
 if(S.diff!=='hard'&&list.length>1&&list.some(k=>k!=='ㄊㄚ'))list=list.filter(k=>k!=='ㄊㄚ');let s;let g=0;do{s=pick(list)}while(s===S.last&&list.length>1&&g++<10);S.last=s;const it=PIN[s],c=s[0],v=s[1];
 const hard=S.diff==='hard';let merged=false;
 const seen=Object.keys(PIN).filter(k=>PIN[k].ch<=Math.max(CH(),46)&&k!==s&&!clash(k,s)&&(S.diff==='hard'||k!=='ㄊㄚ'));
 const opts=shuffle([s,...shuffle(seen).slice(0,byD(1,2,2))]);
 const cons=hard?shuffle([c,...shuffle(Object.keys(PIN).filter(k=>k[1]===v&&k!==s).map(k=>k[0])).slice(0,CH()>=47?2:1)]):[c];
 const sound=x=>[ZR(x[0]),{pause:160},ZR(x[1]),{pause:260},ZW(PIN[x].w)];
 if(hard)P(`拼出這個音：<span class="s8pinq">${picArt(it.p)}</span>`,[T.PIN_HI,_(),ZW(it.w),_(),T.PIN_HQ],sp);
 else P(`把 <b class="kw">${c}</b> 滑到 <b class="kw">${v}</b> 上`,[T.PIN_I],sp);
 play.innerHTML=`<div class="s8pin${hard?' hard':''}"><div class="s8pinrow"><div class="s8cons">${cons.map(x=>`<button class="s8zy s8c" data-c="${x}" aria-label="${x}">${x}</button>`).join('')}</div>
  <svg class="s8arw" viewBox="0 0 60 30" aria-hidden="true"><path d="M4 15 H46 M36 5 L50 15 L36 25" stroke="#FFC93C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="s8zy s8v" data-v="${v}">${v}</div></div><div class="s8pics"></div></div>`;
 const vEl=$('.s8v',play),cEls=$$('.s8c',play),pics=$('.s8pics',play);let sel=null;
 const showPics=()=>{if(hard)return;pics.innerHTML=opts.map((k,i)=>`<button class="s8pic" data-k="${k}" style="--dl:${(i*.1).toFixed(2)}s" aria-label="圖">${picArt(PIN[k].p)}</button>`).join('');
  $$('.s8pic',pics).forEach(b=>b.onclick=()=>choose(b))};
 const merge=el=>{if(S.lock||merged)return;const x=el.dataset.c;
  if(x!==c){bump(el);W(el);SAY([ZW(PIN[x+v].w)]);return}
  merged=true;flyTo(el,vEl,x);el.classList.add('gone');cEls.forEach(b=>b.disabled=true);vEl.classList.add('merged');vEl.innerHTML=zyV(s);tone(660,0,.16,'triangle',.1);tone(990,.12,.2,'triangle',.08);
  if(hard){S.miss=0;OK(vEl,[...sound(s),{pause:200},T[it.l]]);return}
  S.miss=0;P(`<b class="kw">${s}</b> 是哪一個？`,[...sound(s),{pause:250},T.PIN_Q],true);showPics()};
 function choose(b){if(S.lock||!merged)return;if(b.dataset.k!==s){W(b);return}okMark(b);OK(b,[ZW(it.w),{pause:150},T[it.l]])}
 cEls.forEach(el=>drag8(el,{targets:()=>[vEl],onDrop:()=>merge(el),onTap:()=>{if(!hard)return merge(el);cEls.forEach(x=>x.classList.remove('s8sel'));sel=el;el.classList.add('s8sel');SAY([ZR(el.dataset.c)])},canStart:()=>!merged}));
 vEl.onclick=()=>{if(merged){SAY(sound(s));return}if(sel)merge(sel)};
 S.hint=m=>{if(!merged){if(m===1)PS(hard?T.PIN_HH:T.PIN_H1,hard?[T.PIN_HH,_(),ZW(it.w)]:[T.PIN_H1]);else{PS(OLD.glow);glow(cEls.find(x=>x.dataset.c===c))}}
  else{if(m===1)PS(T.PIN_AG,[T.PIN_AG,...sound(s)]);else{PS(OLD.glow);glow($(`.s8pic[data-k="${s}"]`,pics))}}};
 S.__auto=()=>{if(!merged)merge(cEls.find(x=>x.dataset.c===c));if(!hard&&!S.lock){const b=$(`.s8pic[data-k="${s}"]`,pics);if(b)choose(b)}}}

/* ---------- 2. 四聲 tone8 ---------- */
const TONE=[null,{w:'媽',m:'',n:'一聲',d:'M8 16 H112',l:'TN_1'},{w:'麻',m:'ˊ',n:'二聲',d:'M8 50 L112 10',l:'TN_2'},{w:'馬',m:'ˇ',n:'三聲',d:'M8 18 Q40 60 64 50 Q90 40 112 12',l:'TN_3'},{w:'罵',m:'ˋ',n:'四聲',d:'M8 10 L112 50',l:'TN_4'},{w:'嗎',m:'˙',n:'輕聲',d:'M50 30 H70',l:'TN_5'}];
const TZ=t=>t===1?ZW('媽'):t===3?ZW('馬'):({2:'麻',4:'罵',5:'嗎'})[t];
function bTone(play,sp){begin();const a=ARG('tone8');const syl=(a&&/^ㄇㄚ/.test(a))||!a||a==='auto'?'ㄇㄚ':'ㄇㄚ';
 const all=byD(null,[1,2,3,4],[1,2,3,4,5]);let t;let g=0;do{t=rand(1,all?all.length:4)}while(t===S.last&&g++<10);S.last=t;
 const set=all||shuffle([t,({1:4,2:4,3:1,4:1})[t]]).sort();const ear=S.diff!=='hard';
 P(`這是第幾聲？<button class="s8bub s8dg" aria-label="再聽一次">${zyV(syl)}<b>?</b></button>`,[T.TN_I,{pause:300},TZ(t),...(ear&&!S.__t8e?[{pause:300},T.TN_E]:[])],sp);S.__t8e=1;
 play.innerHTML=`<div class="s8tone n${set.length}">${set.map(k=>{const R=TONE[k];return `<button class="s8road" data-t="${k}" aria-label="${R.n}"><svg viewBox="0 0 120 60" aria-hidden="true"><path d="${R.d}" class="rd" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${R.d}" class="rl" fill="none" stroke-linecap="round" stroke-dasharray="2 9"/><circle class="ball" r="7" cx="-20" cy="-20"/></svg><span class="s8tn">${zyV(syl,k<5?R.m:'',k===5)}<small>${R.n}</small></span></button>`}).join('')}</div>`;
 const bub=$('.bubble .s8bub')||$('.s8bub');const roads=$$('.s8road',play);let armed=null;let done=false;
 const ride=r=>{try{if(RM())return;const p=$('.rd',r),b=$('.ball',r);const L=p.getTotalLength();const t0=performance.now();const st=now=>{const k=Math.min(1,(now-t0)/900);const q=p.getPointAtLength(L*k);b.setAttribute('cx',q.x);b.setAttribute('cy',q.y);if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}catch(e){}};
 const choose=r=>{if(S.lock||done)return;const k=+r.dataset.t;if(k!==t){armed=null;W(r);return}done=true;okMark(r);ride(r);if(bub)bub.innerHTML=zyV(syl,t<5?TONE[t].m:'',t===5);OK(r,[T[TONE[t].l]])};
 roads.forEach(r=>{r.onclick=()=>{if(S.lock)return;if(!ear||armed===r)return choose(r);armed=r;roads.forEach(x=>x.classList.toggle('s8sel',x===r));SAY([TZ(+r.dataset.t)])}});
 if(bub){drag8(bub,{targets:()=>roads,onDrop:choose,onTap:()=>SAY([TZ(t)])})}
 S.hint=m=>{if(m===1)PS(T.TN_H1,[T.TN_H1,{pause:300},TZ(t)]);else{PS(OLD.glow);glow(roads.find(x=>+x.dataset.t===t))}};
 S.__auto=()=>choose(roads.find(x=>+x.dataset.t===t))}

/* ---------- 3. 樓層 floor8 ---------- */
const FN=n=>T['F'+n]||String(n);
function bFloor(play,sp){begin();const a=ARG('floor8');if(/^ord/.test(a))return bFloorOrd(play,sp);
 let [fr,to]=(a.match(/^(\d+)-(\d+)/)||[0,0,0]).slice(1).map(Number);
 if(!fr||!to||fr<=to||fr>10){fr=byD(rand(3,4),rand(4,6),rand(5,8));to=S.diff==='easy'?1:rand(1,Math.max(1,fr-2))}
 const N=Math.max(fr,3),easy=S.diff==='easy'||to===fr;let cur=fr;S.last=fr+'-'+to;
 const intro=easy?[T.FL_E]:S.diff==='hard'?[T['FD'+(fr-to)]]:[T['FT'+to]];
 P(easy?`走樓梯，走到 <b class="kw">${to} 樓</b>`:S.diff==='hard'?`往下走 <b class="kw">${fr-to} 層</b>`:`走到 <b class="kw">${to} 樓</b>，按「到了」`,[...intro,{pause:250},T.FL_NOW,_(),FN(fr)],sp);
 play.innerHTML=`<div class="s8bld${land()?' land':''}"><div class="s8tower" style="--n:${N}"><div class="s8roof"></div>${Array.from({length:N},(_,i)=>{const f=N-i;return `<button class="s8fl" data-f="${f}" aria-label="${f}樓"><b class="s8fp">${f}</b><span class="s8room"></span><span class="s8st"><svg viewBox="0 0 40 30" aria-hidden="true"><path d="M2 28 H10 V21 H18 V14 H26 V7 H34 V2 H38 V28Z" fill="#E8C890"/></svg></span></button>`}).join('')}<div class="s8door">出口</div></div>
  <button class="s8lift" aria-label="電梯">${elevSVG()}<small>失火不搭</small></button>
  <div class="s8ctl"><button class="s8go dn" aria-label="往下走一層"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6 V32 M8 22 L20 34 L32 22" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>往下</span></button>
  ${easy?'':`<button class="s8go up" aria-label="往上走一層"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 34 V8 M8 18 L20 6 L32 18" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>往上</span></button><button class="s8okb" aria-label="到了">到了</button>`}</div></div>`;
 const tw=$('.s8tower',play);tw.style.height=Math.min(availH(play)-8,N*64+40)+'px';
 const fl=f=>$(`.s8fl[data-f="${f}"]`,play);const hero=document.createElement('span');hero.className='s8hero';hero.innerHTML=heroMini();
 const put=(f,anim)=>{const r=$('.s8room',fl(f));const from=hero.isConnected?hero.getBoundingClientRect():null;r.appendChild(hero);$$('.s8fl',play).forEach(x=>x.classList.toggle('on',+x.dataset.f===f));$$('.s8fl',play).forEach(x=>x.classList.toggle('nx',+x.dataset.f===f-1));
  if(anim&&from&&!RM()){const b=hero.getBoundingClientRect();hero.animate([{transform:`translate(${from.left-b.left}px,${from.top-b.top}px)`},{transform:'none'}],{duration:320,easing:'ease-out'})}};
 put(cur,false);let done=false;
 const step=d=>{if(S.lock||done)return;const n=cur+d;if(n<1||n>N){bump($('.s8go.'+(d<0?'dn':'up'),play));return}cur=n;put(cur,true);tone(520+(N-cur)*40,0,.12,'triangle',.08);
  if(easy&&cur===to){done=true;S.miss=0;OK(fl(cur),[FN(cur),{pause:200},to===1?T.FL_OUT:T.FL_OK]);return}SAY([FN(cur)])};
 $('.s8go.dn',play).onclick=()=>step(-1);const up=$('.s8go.up',play);if(up)up.onclick=()=>step(1);
 $$('.s8fl',play).forEach(x=>x.onclick=()=>{const f=+x.dataset.f;if(f===cur-1)step(-1);else if(f===cur+1&&!easy)step(1);else if(f!==cur){bump(x);SAY([FN(f)])}});
 $('.s8lift',play).onclick=()=>{if(S.lock||done)return;W($('.s8lift',play));PS(T.FL_EL)};
 const ok=$('.s8okb',play);if(ok)ok.onclick=()=>{if(S.lock||done)return;if(cur===to){done=true;okMark(ok);OK(fl(cur),[FN(cur),{pause:200},to===1?T.FL_OUT:T.FL_OK])}else{W(ok);SAY([T.FL_HERE,_(),FN(cur),_(),T.FL_MORE])}};
 S.hint=m=>{if(m===1)PS(T.FL_H1);else{PS(OLD.glow);if(cur===to&&ok)glow(ok);else glow($('.s8go.'+(cur>to?'dn':'up'),play)||$('.s8go.dn',play));glow($('.s8fp',fl(to)))}};
 S.__auto=()=>{let k=0;while(!S.lock&&!done&&cur!==to&&k++<20)step(cur>to?-1:1);if(!S.lock&&!done&&ok)ok.click()}}
function bFloorOrd(play,sp){const N=Math.max(4,Math.min(byD(4,6,9),Math.floor((availH(play)-50)/36)));let t;let g=0;do{t=rand(S.diff==='easy'?1:2,N)}while(t===S.last&&g++<10);S.last=t;
 P(`把信送到 <b class="kw">${t} 樓</b>`,[T.FO_I,_(),FN(t)],sp);
 play.innerHTML=`<div class="s8bld ord${land()?' land':''}"><div class="s8tower" style="--n:${N}"><div class="s8roof"></div>${Array.from({length:N},(_,i)=>{const f=N-i;return `<button class="s8fl" data-f="${f}" aria-label="${f}樓"><b class="s8fp">${f}</b><span class="s8win"></span><span class="s8win"></span></button>`}).join('')}<div class="s8door"></div></div>
  <div class="s8ctl"><button class="s8env" aria-label="信">${ic('💌')}</button></div></div>`;
 const tw=$('.s8tower',play);tw.style.height=Math.min(availH(play)-8,N*60+40)+'px';
 const fls=$$('.s8fl',play),env=$('.s8env',play);let sel=false;
 const drop=f=>{if(S.lock)return;const x=fls.find(y=>+y.dataset.f===f);if(f!==t){bump(env);W(x);SAY([FN(f)]);return}
  flyTo(env,x,ic('💌'));env.classList.add('gone');$('.s8win',x).innerHTML=ic('💌');okMark(x);OK(x,[FN(t),{pause:120},T.FO_OK])};
 drag8(env,{targets:()=>fls,onDrop:x=>drop(+x.dataset.f),onTap:()=>{sel=true;env.classList.add('s8sel')}});
 fls.forEach(x=>x.onclick=()=>{if(sel)drop(+x.dataset.f);else SAY([FN(+x.dataset.f)])});
 S.hint=m=>{if(m===1)PS(T.FO_H1);else{PS(OLD.glow);glow(fls.find(y=>+y.dataset.f===t))}};
 S.__auto=()=>drop(t)}

/* ---------- 4. 逃生路線 route8 ---------- */
const ROUTES={r1:'FL',r2:'RFL',r3:'LFRF',r4:'FRLF',r5:'RLFRL',r6:'LRFLR'};
function bRoute(play,sp){begin();const a=ARG('route8');let id=ROUTES[a]?a:byD(pick(['r1','r2']),pick(['r3','r4']),pick(['r5','r6']));S.last=id;
 const mv=[...ROUTES[id]];let k=0;const hard=S.diff==='hard',easy=S.diff==='easy';
 P(`跟著<b class="kw">綠色指示牌</b>走到出口`,[T.RT_I],sp);
 play.innerHTML=`<div class="s8rt${land()?' land':''}"><div class="s8rview"></div><div class="s8rside"><div class="s8rdots">${mv.map(()=>'<i></i>').join('')}<i class="ex"></i></div>
  <div class="s8rbtn">${[['L','左轉','M30 20 H12 M20 10 L10 20 L20 30'],['F','直走','M20 34 V8 M10 18 L20 8 L30 18'],['R','右轉','M10 20 H28 M20 10 L30 20 L20 30']].map(([d,n,p])=>`<button class="s8dir" data-d="${d}" aria-label="${n}"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${p}" stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${n}</span></button>`).join('')}
  ${hard?`<button class="s8dir lift" data-d="E" aria-label="搭電梯">${elevSVG()}<span>電梯</span></button>`:''}</div></div></div>`;
 const view=$('.s8rview',play),btns=$$('.s8dir',play);let busy=false;
 const draw=()=>{const d=mv[k];const open=new Set([d]);if(!easy){const o=['L','F','R'].filter(x=>x!==d);open.add(pick(o))}
  const wall='#C9B8E8',fl='#FFF3DC';const g=uid();
  view.innerHTML=`<svg viewBox="0 0 200 200" class="s8map" aria-hidden="true"><defs>${lg(g,'#FFF8E8','#FFEBC8')}</defs><rect width="200" height="200" rx="16" fill="${wall}"/>
   <rect x="70" y="70" width="60" height="130" fill="url(#${g})"/>${open.has('F')?`<rect x="70" y="0" width="60" height="80" fill="url(#${g})"/>`:''}${open.has('L')?`<rect x="0" y="70" width="80" height="60" fill="url(#${g})"/>`:''}${open.has('R')?`<rect x="120" y="70" width="80" height="60" fill="url(#${g})"/>`:''}
   ${[150,170,190].map(y=>`<rect x="96" y="${y}" width="8" height="5" rx="2" fill="#F2D9A8"/>`).join('')}
   ${hard&&k===1?`<g transform="translate(${open.has('L')?140:8} 8)"><rect width="44" height="54" rx="6" fill="#D8D2E8"/><rect x="5" y="10" width="16" height="40" fill="#EEEAF6"/><rect x="23" y="10" width="16" height="40" fill="#EEEAF6"/></g>`:''}</svg>
   <div class="s8sign${easy?' blink':''}${hard?' sm':''}" style="${d==='L'?'left:2%':d==='R'?'right:2%':'left:50%;transform:translateX(-50%)'};top:${d==='F'?'2%':'8%'}">${exitSign(d)}</div>
   <span class="s8rhero">${heroMini()}</span>`};
 const finish=()=>{const g=uid();view.innerHTML=`<svg viewBox="0 0 200 200" class="s8map" aria-hidden="true"><defs>${lg(g,'#BDEBFF','#E8FFF2')}</defs><rect width="200" height="200" rx="16" fill="url(#${g})"/><rect x="0" y="150" width="200" height="50" fill="#9FE0A8"/><rect x="14" y="40" width="70" height="112" rx="6" fill="#C9B8E8"/><rect x="34" y="96" width="30" height="56" rx="4" fill="#5FE0A0"/><text x="49" y="88" text-anchor="middle" font-size="14" font-weight="800" fill="#2E7A58">出口</text></svg>
  <span class="s8tree">${ic('🌳')}</span><span class="s8rhero out">${heroMini()}</span>`};
 const go=d=>{if(S.lock||busy)return;const b=btns.find(x=>x.dataset.d===d);if(d==='E'){W(b);PS(T.RT_EL);return}
  if(d!==mv[k]){W(b);return}busy=true;S.miss=0;okMark(b);setTimeout(()=>b.classList.remove('s8ok'),500);const h=$('.s8rhero',view);const dx=d==='L'?-70:d==='R'?70:0,dy=d==='F'?-130:-62;
  const nx=()=>{$$('.s8rdots i',play)[k].classList.add('on');k++;busy=false;if(k>=mv.length){$$('.s8rdots i',play)[k].classList.add('on');finish();OK(view,[T.RT_OK]);return}draw()};
  SAY([T['RT_'+d]]);tone(600+k*60,0,.14,'triangle',.08);
  if(h&&!RM()&&h.animate){h.animate([{transform:'translate(-50%,0)'},{transform:`translate(-50%,-62%)`},{transform:`translate(calc(-50% + ${dx}%),${dy}%)`}],{duration:560,easing:'ease-in-out',fill:'forwards'}).finished.then(nx).catch(nx)}else setTimeout(nx,60)};
 btns.forEach(b=>b.onclick=()=>go(b.dataset.d));draw();
 S.hint=m=>{if(m===1)PS(T.RT_H1);else{PS(OLD.glow);glow(btns.find(x=>x.dataset.d===mv[k]))}};
 S.__auto=()=>{const f=()=>{if(S.lock||k>=mv.length||!view.isConnected)return;if(!busy)go(mv[k]);setTimeout(f,RM()?90:300)};f()}}

/* ---------- 5. 湊錢 money8 ---------- */
function bMoney(play,sp){begin();const a=ARG('money8');const m=/^(\d+)(?:\|([\d,]+))?/.exec(a||'');let n=m?Math.min(100,Math.max(1,+m[1])):0;let den=m&&m[2]&&m[2]!=='100'?m[2].split(',').map(Number).filter(v=>[1,5,10,50,100].includes(v)):null;
 if(!n){const R=byD([10,40],[20,90],[30,100]);do{n=rand(R[0],R[1])}while(n===S.last);if(S.diff==='easy')n=Math.round(n/5)*5||10}S.last=n;
 if(!den&&n===100)den=byD([50,10],[50,10],[1,5,10,50]);if(!den)den=S.diff==='easy'?(n>=50?[50,10]:n%5===0&&n%10?[10,5]:[10,1]):S.diff==='mid'?[1,5,10,50]:[1,5,10,50,100];
 if(den.includes(100)&&n<100)den=den.filter(v=>v!==100);den=[...new Set(den)].sort((x,y)=>x-y);if(n%Math.min(...den)!==0&&!den.includes(1))den.unshift(1);
 const billQ=n===100&&!den.includes(100)&&den.includes(50);const show=S.diff!=='hard';let sum=0;const inP=[];
 P(billQ?`湊到 <b class="kw">100 元</b>（跟一張 100 元一樣多）`:`湊到 <b class="kw">${n} 元</b>`,billQ?[T.MN_B]:[T.MN_I,_(),`${n}元！`],sp);
 play.innerHTML=`<div class="s8mon"><div class="s8top">${billQ?`<span class="s8tgt bill">${bill100()}</span>`:`<span class="s8tgt"><small>湊到</small><b>${n}</b><small>元</small></span>`}
  <div class="s8plate" aria-label="盤子">${plateSVG()}<div class="s8pin2"></div></div><span class="s8sum${show?'':' hide'}"><b>0</b><small>元</small></span></div>
  <div class="s8wal">${den.map(v=>`<button class="s8coin${v===100?' b':''}" data-v="${v}" aria-label="${v}元">${coin(v)}</button>`).join('')}${show?'':'<button class="s8okb" aria-label="好了">好了</button>'}</div></div>`;
 const plate=$('.s8plate',play),pin=$('.s8pin2',play),sumEl=$('.s8sum b',play);const cs=$$('.s8coin',play);let done=false;
 const upd=()=>{sumEl.textContent=sum;pin.classList.toggle('many',inP.length>6)};
 const fin=el=>{done=true;okMark(plate);OK(el||plate,billQ&&inP.every(x=>+x.dataset.v===50)?[T.MN_BOK]:n===100&&inP.length===1?[T.MN_ALL]:[`${n}元！`])};
 const add=v=>{if(S.lock||done)return;const src=cs.find(x=>+x.dataset.v===v);if(sum+v>n){bump(src);W(src);PS(T.MN_OVER);return}
  sum+=v;S.miss=0;const c=document.createElement('button');c.className='s8in'+(v===100?' b':'');c.dataset.v=v;c.setAttribute('aria-label',v+'元');c.innerHTML=coin(v);pin.appendChild(c);inP.push(c);flyTo(src,c,coin(v));
  c.onclick=()=>{if(S.lock||done)return;sum-=v;inP.splice(inP.indexOf(c),1);c.remove();upd()};tone(700+Math.min(sum,100)*4,0,.12,'triangle',.08);upd();
  if(show){if(sum===n)fin(c);else SAY([`${sum}元！`])}};
 cs.forEach(x=>drag8(x,{targets:()=>[plate],onDrop:()=>add(+x.dataset.v),onTap:()=>add(+x.dataset.v)}));
 const ok=$('.s8okb',play);if(ok)ok.onclick=()=>{if(S.lock||done)return;if(sum===n){okMark(ok);fin(ok)}else{W(ok);PS(T.MN_NOT)}};
 const best=()=>{const r=n-sum;const v=den.filter(x=>x<=r).pop();return cs.find(x=>+x.dataset.v===v)};
 S.hint=mm=>{if(mm===1)PS(T.MN_H1);else{PS(OLD.glow);glow(best())}};
 S.__auto=()=>{let k=0;while(!S.lock&&!done&&sum<n&&k++<120){const b=best();if(!b)break;add(+b.dataset.v)}if(ok&&!S.lock&&!done)ok.click()}}

/* ---------- 6. 找錢 change8 ---------- */
const SHOP=['✏️','🍎','🎈','🧸','🍪'];
function bChange(play,sp){begin();const a=ARG('change8');let [pay,pr]=(a.match(/^(\d+)-(\d+)/)||[0,0,0]).slice(1).map(Number);
 if(!pay||!pr||pr>=pay){pay=10;do{pr=rand(byD(7,5,3),9)}while(pr===S.last)}if(pay-pr>10)pr=pay-10;if(pay>100)pay=100;S.last=pr;const chg=pay-pr;const hard=S.diff==='hard';
 const item=pick(SHOP),clerk=pick(['bear','bunny','kitten','squirrel']);
 const payCoins=[];{let r=pay;[100,50,10,5,1].forEach(v=>{while(r>=v){payCoins.push(v);r-=v}})}
 P(`這個 <b class="kw">${pr} 元</b>，你給 <b class="kw">${pay} 元</b>，找多少？`,[T.CG_I,_(),`${pr}元！`,_(),T.CG_PAY,_(),`${pay}元！`,{pause:200},hard?T.CG_HD:T.CG_DO],sp);
 play.innerHTML=`<div class="s8chg${land()?' land':''}"><div class="s8shop"><span class="s8clerk">${anSafe(clerk)}</span><span class="s8item">${ic(item)}<b>${pr} 元</b></span><span class="s8paid">${payCoins.map(v=>`<i>${coin(v)}</i>`).join('')}</span></div>
  ${hard?`<div class="s8plate tray" aria-label="找錢盤">${plateSVG()}<div class="s8pin2"></div></div>`:`<div class="s8line"><span class="s8from">${pr}</span>${Array.from({length:chg},(_,i)=>`<span class="s8slot" data-i="${i}"><small>${S.diff==='easy'||i===chg-1?pr+i+1:''}</small></span>`).join('')}</div>`}
  <div class="s8wal">${(hard&&chg>=5?[1,5]:[1]).map(v=>`<button class="s8coin" data-v="${v}" aria-label="${v}元">${coin(v)}</button>`).join('')}${hard?'<button class="s8okb" aria-label="好了">好了</button>':''}</div></div>`;if(land()){const w=$('.s8chg',play);const r=document.createElement('div');r.className='s8cr';[...w.children].slice(1).forEach(x=>r.appendChild(x));w.appendChild(r)}
 const cs=$$('.s8coin',play);let got=0,done=false;const slots=$$('.s8slot',play);const tray=$('.s8plate',play);
 const fin=el=>{done=true;okMark(el);OK(el,[T.CG_BACK,_(),`${chg}元！`])};
 const add=v=>{if(S.lock||done)return;const src=cs.find(x=>+x.dataset.v===v);
  if(!hard){const sl=slots[got];if(!sl)return;sl.innerHTML=coin(1);sl.classList.add('on');flyTo(src,sl,coin(1));got++;S.miss=0;tone(640+got*60,0,.12,'triangle',.08);if(got>=chg)fin($('.s8line',play));else SAY([String(pr+got)]);return}
  if(got+v>chg){bump(src);W(src);PS(T.MN_OVER);return}got+=v;S.miss=0;const c=document.createElement('button');c.className='s8in';c.innerHTML=coin(v);$('.s8pin2',tray).appendChild(c);flyTo(src,c,coin(v));
  c.onclick=()=>{if(S.lock||done)return;got-=v;c.remove()};tone(640+got*40,0,.12,'triangle',.08)};
 cs.forEach(x=>drag8(x,{targets:()=>hard?[tray]:slots.filter(s=>!s.classList.contains('on')),onDrop:()=>add(+x.dataset.v),onTap:()=>add(+x.dataset.v)}));
 const ok=$('.s8okb',play);if(ok)ok.onclick=()=>{if(S.lock||done)return;if(got===chg)fin(ok);else{W(ok);PS(T.MN_NOT)}};
 S.hint=m=>{if(m===1)PS(T.CG_H1);else{PS(OLD.glow);glow(cs[0])}};
 S.__auto=()=>{let k=0;while(!S.lock&&!done&&k++<30){if(hard){const r=chg-got;if(r<=0)break;add(r>=5&&cs[1]?5:1)}else add(1)}if(ok&&!S.lock&&!done)ok.click()}}

/* ---------- 7. 置物櫃 locker8 ---------- */
function bLocker(play,sp){begin();const a=ARG('locker8');let n=+(a||'').replace(/\D/g,'')||0;if(!n||n>100){do{n=rand(byD(1,11,21),byD(40,80,100))}while(n===S.last)}S.last=n;
 const rows=byD(1,2,3);const dec=Math.floor((n-1)/10);let s0=Math.max(0,Math.min(dec-rand(0,rows-1),10-rows));const start=s0*10+1;const nums=Array.from({length:rows*10},(_,i)=>start+i);
 const narrow=innerWidth<640&&!land();
 P(`鑰匙放進 <b class="kw">${n} 號</b>置物櫃`,[T.LK_I,_(),`${n}號`],sp);
 play.innerHTML=`<div class="s8lk${land()?' land':''}"><button class="s8key" aria-label="${n}號鑰匙">${keySVG(n)}</button><div class="s8wall" style="--c:${narrow?5:10}">${nums.map(v=>`<button class="s8box" data-v="${v}" aria-label="${v}號"><b>${v}</b></button>`).join('')}</div></div>`;
 const boxes=$$('.s8box',play),key=$('.s8key',play);{const wl=$('.s8wall',play);const cols=narrow?5:10;const rws=Math.ceil(nums.length/cols);const room=land()?availH(play)-24:availH(play)-key.offsetHeight-30;const lh=Math.floor(room/rws)-6;const cw=wl.clientWidth/cols;if(lh<cw*1.05){wl.classList.add('fit');wl.style.setProperty('--lh',Math.max(44,Math.min(80,lh))+'px')}}
 const drop=b=>{if(S.lock)return;const v=+b.dataset.v;if(v!==n){bump(key);W(b);SAY([`這是${v}號`,_(),T.LK_NO]);return}
  flyTo(key,b,keySVG(n));key.classList.add('gone');b.classList.add('open');okMark(b);OK(b,[`${n}號`,{pause:120},OLD.found])};
 drag8(key,{targets:()=>boxes,onDrop:drop,onTap:()=>{key.classList.add('s8sel')}});boxes.forEach(b=>b.onclick=()=>drop(b));
 S.hint=m=>{if(m===1)PS(OLD.hun2);else{PS(OLD.glow);glow(boxes.find(b=>+b.dataset.v===n))}};
 S.__auto=()=>drop(boxes.find(b=>+b.dataset.v===n))}

/* ---------- 8. 比深淺 deep8 ---------- */
const DZ={knee:{f:.27,n:'膝蓋'},belly:{f:.52,n:'肚子'},neck:{f:.84,n:'脖子'},deep:{f:1.5,n:'站不到'}};
function bDeep(play,sp){begin();let a=ARG('deep8');const D0={a:['knee','belly','neck'],b:['safe','order']}[a]||(['knee','belly','neck','order','safe'].includes(a)?[a]:['knee','belly','neck','order','safe']);{let g=0;do{a=pick(D0)}while(a===S.lastD&&D0.length>1&&g++<10)}S.lastD=a;S.last=a;
 const hard=S.diff==='hard';let zones=a==='order'||a==='safe'?['knee','belly','neck']:S.diff==='easy'?(a==='belly'?['knee','belly']:['knee','neck']):['knee','belly','neck'];
 if(a==='safe'&&S.diff==='easy')zones=['knee','neck'];if(hard&&a!=='order')zones=zones.concat('deep');if(Math.random()<.5)zones=zones.slice().reverse();   // 深的那邊有時在左、有時在右
 const VH=200,H=96,SUR=64;const hgt=z=>z==='deep'?196:SUR+H*DZ[z].f;const g=uid();const ZW8=300/zones.length;const di=zones.indexOf('deep');const ropeX=di<0?-1:di===0?ZW8:di*ZW8;
 P({knee:'水到<b class="kw">膝蓋</b>',belly:'水到<b class="kw">肚子</b>',neck:'水到<b class="kw">脖子</b>',order:'從<b class="kw">淺</b>排到<b class="kw">深</b>',safe:'找<b class="kw">站得到</b>的地方'}[a],[T['DP_'+a]],sp);
 const fr=shuffle(['bunny','kitten','duck','squirrel']);const floorP=zones.map((z,i)=>`H${i*ZW8} V${hgt(z)} H${(i+1)*ZW8}`).join(' ');
 play.innerHTML=`<div class="s8deep${land()?' land':''}">${a==='order'?'':`<button class="s8me" aria-label="主角">${heroMini()}</button>`}
  <div class="s8pool"><svg viewBox="0 0 300 ${VH}" preserveAspectRatio="none" aria-hidden="true"><defs>${lg(g,'#9FE4FF','#3FA8E8')}</defs>
   <rect width="300" height="${VH}" fill="#FFF3DC"/><path d="M0 ${SUR} ${floorP} V${SUR}Z" fill="url(#${g})" opacity=".9"/>
   ${zones.map((z,i)=>`<rect x="${i*ZW8}" y="${hgt(z)}" width="${ZW8}" height="${VH-hgt(z)}" fill="#E6DEFA"/>`).join('')}
   <path d="M0 ${SUR} H300" stroke="#fff" stroke-width="2" stroke-dasharray="10 8" opacity=".85"/>
   ${ropeX>0?`<path d="M${ropeX} ${SUR} V${VH-4}" stroke="#FF6F7F" stroke-width="3" stroke-dasharray="8 6"/>${[-6,0,6].map(k=>'').join('')}<circle cx="${ropeX}" cy="${SUR}" r="8" fill="#FF6F7F"/><circle cx="${ropeX}" cy="${SUR}" r="3.4" fill="#fff"/>`:''}</svg>
   ${zones.map((z,i)=>`<button class="s8zone" data-z="${z}" style="left:${i*100/zones.length}%;width:${100/zones.length}%" aria-label="${DZ[z].n}">${a==='order'?`<span class="s8fr" style="bottom:${(VH-hgt(z))/VH*100}%;height:${H/VH*100}%">${anSafe(fr[i])}<span class="s8wat" style="height:${DZ[z].f*72}%"></span></span>`:''}<small>${z==='deep'?'站不到':''}</small></button>`).join('')}</div></div>`;
 const zs=$$('.s8zone',play),me=$('.s8me',play);let k=0;const order=['knee','belly','neck'];
 const stand=zEl=>{const z=zEl.dataset.z;if(z==='deep')return;const h=document.createElement('span');h.className='s8fr me';h.style.bottom=(VH-hgt(z))/VH*100+'%';h.style.height=H/VH*100+'%';h.innerHTML=heroMini()+`<span class="s8wat" style="height:${DZ[z].f*100}%"></span>`;zEl.appendChild(h)};
 const want=z=>a==='safe'?(z==='knee'||z==='belly'):z===a;
 const drop=zEl=>{if(S.lock||!zEl)return;const z=zEl.dataset.z;
  if(a==='order'){if(z!==order[k]){W(zEl);return}zEl.classList.add('s8ok');tone(600+k*90,0,.14,'triangle',.08);k++;S.miss=0;if(k>=zones.length){OK(zEl,[T.DS_knee,{pause:100},T.DS_neck]);return}SAY([T['DS_'+z]]);return}
  if(!want(z)){bump(me);W(zEl);SAY([z==='deep'?T.DS_deep:a==='safe'&&z==='neck'?T.DS_neck2:T['DS_'+z]]);return}
  me.classList.add('gone');stand(zEl);okMark(zEl);OK(zEl,[T['DS_'+z],...(a==='safe'?[{pause:150},T.DS_safe]:[])])};
 if(me)drag8(me,{targets:()=>zs,onDrop:drop,onTap:()=>me.classList.add('s8sel')});zs.forEach(x=>x.onclick=()=>drop(x));
 S.hint=m=>{if(m===1)PS(T.DP_H1);else{PS(OLD.glow);glow(zs.find(x=>a==='order'?x.dataset.z===order[k]:want(x.dataset.z)))}};
 S.__auto=()=>{if(a==='order'){let j=0;while(!S.lock&&k<zones.length&&j++<5)drop(zs.find(x=>x.dataset.z===order[k]))}else drop(zs.find(x=>want(x.dataset.z)))}}

/* ---------- 9. 圖示圖表 chart8 ---------- */
const CSET={a:{bike:5,scoot:3,tri:4},b:{bike:6,scoot:2,tri:4},c:{bike:3,scoot:7,tri:5}};
function bChart(play,sp){begin();const a=ARG('chart8');const hard=S.diff==='hard';let cnt;
 if(CSET[a])cnt=Object.assign({},CSET[a]);else{const mx=byD(5,7,8);let g=0;do{cnt={bike:rand(1,mx),scoot:rand(1,mx),tri:rand(1,mx)};g++}while(g<50&&(new Set(Object.values(cnt)).size<3))}
 let kinds=Object.keys(cnt);if(S.diff==='easy'){kinds=shuffle(kinds).slice(0,2);kinds.forEach(k=>cnt[k]=Math.min(cnt[k],5));if(cnt[kinds[0]]===cnt[kinds[1]])cnt[kinds[0]]=Math.max(1,cnt[kinds[0]]-1)}
 kinds.sort((x,y)=>['bike','scoot','tri'].indexOf(x)-['bike','scoot','tri'].indexOf(y));const vals=kinds.map(k=>cnt[k]);const mxv=Math.max(...vals),mnv=Math.min(...vals);
 const qLeast=a!=='b'&&S.diff==='mid'&&Math.random()<.4&&vals.filter(v=>v===mnv).length===1;const ansK=kinds.find(k=>cnt[k]===(qLeast?mnv:mxv));
 let d1=null,d2=null;if(hard||a==='b'){const pr=[];kinds.forEach(x=>kinds.forEach(y=>{if(x!==y&&cnt[x]>cnt[y]&&cnt[x]-cnt[y]<=5)pr.push([x,y])}));if(pr.length){[d1,d2]=pick(pr)}else if(a==='b'){const s2=kinds.slice().sort((x,y)=>cnt[y]-cnt[x]);d1=s2[0];d2=s2[s2.length-1];if(cnt[d1]-cnt[d2]>5)cnt[d2]=cnt[d1]-5;if(cnt[d1]===cnt[d2]){d1=null;d2=null}}}
 S.last=a;const items=shuffle(kinds.flatMap(k=>Array.from({length:cnt[k]},()=>k)));let placed=0;const stack={};kinds.forEach(k=>stack[k]=0);
 P(`把車子<b class="kw">一格一台</b>疊起來`,[T.CH_I],sp);
 play.innerHTML=`<div class="s8ch${land()?' land':''}"><div class="s8park">${items.map((k,i)=>`<button class="s8vh" data-k="${k}" data-i="${i}" aria-label="${VEH[k].n}">${VEH[k].a()}</button>`).join('')}</div>
  <div class="s8chart" style="--r:${mxv}">${kinds.map(k=>`<button class="s8col" data-k="${k}" aria-label="${VEH[k].n}"><span class="s8cells">${Array.from({length:mxv},(_,i)=>`<i data-r="${i}"></i>`).join('')}</span><span class="s8lab">${VEH[k].a()}<small>${VEH[k].n}</small></span></button>`).join('')}</div><div class="s8q"></div></div>`;
 const vs=$$('.s8vh',play),cols=$$('.s8col',play),q=$('.s8q',play);let phase=0;
 const put=(v,col)=>{if(S.lock||phase)return;const k=v.dataset.k;if(col&&col.dataset.k!==k){bump(v);W(col);return}col=col||cols.find(c=>c.dataset.k===k);
  const cell=$$('.s8cells i',col)[stack[k]];stack[k]++;cell.innerHTML=VEH[k].a();cell.classList.add('on');flyTo(v,cell,VEH[k].a());v.classList.add('gone');v.disabled=true;placed++;S.miss=0;tone(560+stack[k]*50,0,.12,'triangle',.08);SAY([String(stack[k])]);
  if(placed>=items.length)setTimeout(ask,RM()?60:450)};
 const ask=()=>{if(S.lock||phase||!play.isConnected)return;phase=1;$('.s8park',play).classList.add('done');P(qLeast?'哪一種車<b class="kw">最少</b>？':'哪一種車<b class="kw">最多</b>？',[T.CH_SORT,{pause:200},qLeast?T.CH_QL:T.CH_QM],true);cols.forEach(c=>c.classList.add('ask'))};
 const ask2=()=>{if(S.lock||phase!==3||!play.isConnected)return;phase=2;const k=cnt[d1]-cnt[d2];const op=near3(k,3,1,1).filter(x=>x>=1&&x<=9);while(op.length<3){const x=rand(1,6);if(!op.includes(x))op.push(x)}
  P(`${VEH[d1].n}比${VEH[d2].n}<b class="kw">多幾台</b>？`,[T['CH_D_'+d1+'_'+d2]],true);q.innerHTML=numBtns(shuffle(op));
  $$('.s8num',q).forEach(b=>b.onclick=()=>{if(S.lock)return;if(+b.dataset.v!==k){W(b);return}okMark(b);OK(b,[T['CH_N'+k]])});
  S.hint=m=>{if(m===1)PS(T.CH_HD);else{PS(OLD.glow);glow($(`.s8num[data-v="${k}"]`,q))}}};
 const pickCol=c=>{if(S.lock||phase!==1)return;if(c.dataset.k!==ansK){W(c);return}okMark(c);if(d1){S.miss=0;SAY([T[(qLeast?'CH_L_':'CH_M_')+ansK]]);setTimeout(ask2,RM()?60:900);phase=3;return}OK(c,[T[(qLeast?'CH_L_':'CH_M_')+ansK]])};
 vs.forEach(v=>drag8(v,{targets:()=>cols,onDrop:c=>put(v,c),onTap:()=>put(v,null),canStart:()=>!phase}));cols.forEach(c=>c.onclick=()=>pickCol(c));
 S.hint=m=>{if(!phase){PS(OLD.glow);glow(vs.find(v=>!v.disabled));return}if(m===1)PS(qLeast?T.CH_H2:T.CH_H1);else{PS(OLD.glow);glow(cols.find(c=>c.dataset.k===ansK))}};
 S.__auto=()=>{vs.forEach(v=>{if(!v.disabled)put(v,null)});if(!phase){ask()}if(phase===1)pickCol(cols.find(c=>c.dataset.k===ansK));if(d1&&phase===3)ask2();const b=$(`.s8num[data-v="${d1?cnt[d1]-cnt[d2]:-1}"]`,q);if(b)b.click()}}

/* ---------- 10. 2 個 2 個數輪子 wheel8 ---------- */
function bWheel(play,sp){begin();const a=ARG('wheel8');let n=+(a||'').replace(/\D/g,'')||0;if(!n||n<1)n=byD(rand(2,3),rand(3,5),rand(4,7));n=Math.max(1,Math.min(10,byD(Math.min(n,3),Math.min(n,5),n)));S.last=n;const W2=2*n;
 const hard=S.diff==='hard';let got=0;
 P(`兩個兩個數<b class="kw">輪子</b>`,[T.WH_I],sp);
 play.innerHTML=`<div class="s8wh${land()?' land':''}"><div class="s8lot">${Array.from({length:n},(_,i)=>`<button class="s8vh" data-i="${i}" aria-label="腳踏車">${vBike()}</button>`).join('')}</div>
  <div class="s8rack" style="--n:${n}">${Array.from({length:n},(_,i)=>`<span class="s8rs" data-i="${i}"><b></b></span>`).join('')}</div><div class="s8cnt${hard?' hide':''}"></div><div class="s8q"></div></div>`;
 const bs=$$('.s8vh',play),rs=$$('.s8rs',play),q=$('.s8q',play),cnt=$('.s8cnt',play);let phase=0;
 const park=b=>{if(S.lock||phase||b.disabled)return;const sl=rs[got];sl.innerHTML=vBike('lit')+`<b>${2*(got+1)}</b>`;flyTo(b,sl,vBike());b.classList.add('gone');b.disabled=true;got++;S.miss=0;tone(560+got*60,0,.12,'triangle',.08);
  cnt.textContent=String(2*got);SAY([String(2*got)]);if(got>=n)setTimeout(ask,RM()?60:500)};
 const ask=()=>{if(S.lock||phase||!play.isConnected)return;phase=1;const op=near3(W2,byD(2,3,3),2,hard?1:2);P('一共有幾個<b class="kw">輪子</b>？',[T.WH_Q],true);q.innerHTML=numBtns(op);
  $$('.s8num',q).forEach(b=>b.onclick=()=>{if(S.lock)return;if(+b.dataset.v!==W2){W(b);return}okMark(b);OK(b,[`一共${W2}個`])})};
 bs.forEach(b=>drag8(b,{targets:()=>[$('.s8rack',play)],onDrop:()=>park(b),onTap:()=>park(b),canStart:()=>!phase}));
 S.hint=m=>{if(!phase){PS(OLD.glow);glow(bs.find(x=>!x.disabled));return}if(m===1)PS(T.WH_H1);else{PS(OLD.glow);glow($(`.s8num[data-v="${W2}"]`,q))}};
 S.__auto=()=>{bs.forEach(b=>{if(!b.disabled)park(b)});if(!phase)ask();const b=$(`.s8num[data-v="${W2}"]`,q);if(b)b.click()}}

/* ---------- 11. 撥時鐘 clock8 ---------- */
function bClock(play,sp){begin();const a=ARG('clock8');const m=/^(\d{1,2})(?::(\d{2}))?(\+30)?/.exec(a||'');let h,mm,plus=false,h0=0,m0=0;
 if(m&&+m[1]>=1&&+m[1]<=12){h=+m[1];mm=+(m[2]||0)>=30?30:0;if(m[3]&&S.diff!=='easy'){plus=true;h0=h;m0=mm;if(mm===0)mm=30;else{mm=0;h=h%12+1}}}
 else{do{h=rand(1,12)}while(h===S.last);mm=S.diff==='easy'?0:pick([0,30])}S.last=h;
 const easy=S.diff==='easy',hard=S.diff==='hard';let ch=hard?((h+rand(2,8)-1)%12)+1:12,cm=easy?mm:hard?(mm?0:30):0;if(!hard&&ch===h)ch=h===12?6:12;
 const lab=x=>`${x[0]}點${x[1]?'半':''}`;
 const swim=!plus&&!/\+30/.test(a||'')&&(/\|swim/.test(a||'')||CH()===48);   // 第 48 章：游泳游三十分鐘，幾點上岸（不算經過時間，直接撥到那個時間）
 if(swim)P(`游 30 分鐘，<b class="kw">${lab([h,mm])}</b>上岸休息：撥到 <b class="kw">${lab([h,mm])}</b>`,h===3&&mm===30?[T.CK_SW330,{pause:200},easy?T.CK_EASY:T.CK_DO]:[T.CK_SWG,{pause:200},T.CK_I,_(),`${h}點${mm?'半':''}`,{pause:200},easy?T.CK_EASY:T.CK_DO],sp);else
 P(plus?`${lab([h0,m0])}下水，游 30 分鐘是幾點？`:`撥到 <b class="kw">${lab([h,mm])}</b>`,plus?[`${h0}點${m0?'半':''}`,_(),T.CK_SW]:[T.CK_I,_(),`${h}點${mm?'半':''}`,{pause:200},easy?T.CK_EASY:T.CK_DO],sp);
 play.innerHTML=`<div class="s8clk${land()?' land':''}">${plus?`<span class="s8mini">${clockSVG(h0,m0)}<small>下水</small></span>`:''}<div class="s8face"><svg viewBox="0 0 200 200" aria-hidden="true"></svg>${Array.from({length:12},(_,i)=>{const k=i+1,an=k*30*Math.PI/180;return `<button class="s8hn" data-h="${k}" style="left:${50+Math.sin(an)*35}%;top:${50-Math.cos(an)*35}%" aria-label="${k}"></button>`}).join('')}</div>
  <div class="s8ctl">${easy?'':`<button class="s8mh" aria-label="換長針"><span>長針</span><b></b></button>`}<button class="s8okb" aria-label="撥好了">撥好了</button></div></div>`;
 const face=$('.s8face',play),svg=$('svg',face);const ok=$('.s8okb',play),mh=$('.s8mh',play);let drag=null,done=false;
 const draw=(ha,ma)=>{const g=uid();const H=ha!=null?ha:((ch%12)+cm/60)*30,M=ma!=null?ma:cm*6;let t='';for(let i=0;i<60;i++){const q=i*6*Math.PI/180,r1=i%5?86:82;t+=`<line x1="${(100+Math.sin(q)*r1).toFixed(1)}" y1="${(100-Math.cos(q)*r1).toFixed(1)}" x2="${(100+Math.sin(q)*90).toFixed(1)}" y2="${(100-Math.cos(q)*90).toFixed(1)}" stroke="#B8A8E8" stroke-width="${i%5?1.2:2.4}"/>`}
  let nm='';for(let i=1;i<=12;i++){const q=i*30*Math.PI/180;nm+=`<text x="${(100+Math.sin(q)*70).toFixed(1)}" y="${(108-Math.cos(q)*70).toFixed(1)}" text-anchor="middle" font-family="Baloo 2,Arial Rounded MT Bold,sans-serif" font-weight="800" font-size="22" fill="#3A2A6A">${i}</text>`}
  svg.innerHTML=`<defs><radialGradient id="${g}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EDE6FF"/></radialGradient></defs><circle cx="100" cy="100" r="96" fill="#FFD98A"/><circle cx="100" cy="100" r="90" fill="url(#${g})"/>${t}${nm}
   <line x1="100" y1="100" x2="${(100+Math.sin(M*Math.PI/180)*68).toFixed(1)}" y2="${(100-Math.cos(M*Math.PI/180)*68).toFixed(1)}" stroke="#4A7BE0" stroke-width="6" stroke-linecap="round" class="mh"/>
   <line x1="100" y1="100" x2="${(100+Math.sin(H*Math.PI/180)*44).toFixed(1)}" y2="${(100-Math.cos(H*Math.PI/180)*44).toFixed(1)}" stroke="#FF5FA6" stroke-width="10" stroke-linecap="round" class="hh"/><circle cx="100" cy="100" r="8" fill="#3A2A6A"/>`;
  if(mh)$('b',mh).textContent=cm?'指著 6':'指著 12'};
 draw();
 const ang=e=>{const r=face.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;return (Math.atan2(x,-y)*180/Math.PI+360)%360};
 const hAng=()=>((ch%12)+cm/60)*30;const dif=(x,y)=>{const d=Math.abs(x-y)%360;return d>180?360-d:d};
 face.addEventListener('pointerdown',e=>{if(S.lock||done)return;const q=ang(e);drag={hn:e.target.closest&&e.target.closest('.s8hn'),id:e.pointerId,w:(!easy&&dif(q,cm*6)<dif(q,hAng())-10)?'m':'h',mv:false,x:e.clientX,y:e.clientY};try{face.setPointerCapture(e.pointerId)}catch(_){}});
 face.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;if(!drag.mv&&Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)<8)return;drag.mv=true;e.preventDefault();const q=ang(e);if(drag.w==='h')draw(q,null);else draw(null,q)});
 face.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;if(!d.mv){const b=d.hn;if(b){ch=+b.dataset.h;draw();tone(700,0,.1,'sine',.06)}return}
  const q=ang(e);if(d.w==='h'){let k=Math.round((q-cm/2)/30);k=((k%12)+12)%12;ch=k||12}else{cm=dif(q,180)<90?30:0}draw();tone(700,0,.1,'sine',.06)});
 face.addEventListener('pointercancel',()=>{drag=null;draw()});
 $$('.s8hn',face).forEach(b=>b.addEventListener('click',e=>{if(e.detail===0&&!S.lock&&!done){ch=+b.dataset.h;draw()}}));
 if(mh)mh.onclick=()=>{if(S.lock||done)return;cm=cm?0:30;draw();tone(620,0,.1,'sine',.06)};
 ok.onclick=()=>{if(S.lock||done)return;if(ch===h&&cm===mm){done=true;okMark(ok);OK(face,[`${h}點${mm?'半':''}`])}else W(ok)};
 S.hint=m2=>{if(m2===1)PS(T.CK_H1);else{PS(OLD.glow);if(ch!==h)glow($(`.s8hn[data-h="${h}"]`,face));else if(mh&&cm!==mm)glow(mh);else glow(ok)}};
 S.__auto=()=>{ch=h;cm=mm;draw();ok.click()}}

/* ---------- 12. 小寫三層樓 low8 ---------- */
const FLR=c=>'bdfhklt'.includes(c)?'up':'gjpqy'.includes(c)?'down':'mid';
const LO8=()=>window.__LO7||{};
const loPath=(c,cls='')=>`<path d="${LO8()[c]||''}" class="s8g ${cls}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const learnedLo=()=>{const ch=CH();return 'abcd'+'efghijk'.slice(0,Math.max(0,Math.min(7,(ch-45)*2)))};
function bLow(play,sp){begin();const a=ARG('low8');let L=(a||'').split('|').map(x=>x.trim().toLowerCase()).filter(x=>/^[a-z]$/.test(x)&&LO8()[x]);if(!L.length)L=['e','f'];
 const k=byD(2,3,4);L=[...new Set(L)];let pool=[...new Set(learnedLo().split(''))].filter(c=>LO8()[c]&&!L.includes(c));const seq=[];{let rest=shuffle(L);while(seq.length<k&&rest.length){const miss=['up','mid','down'].filter(f=>!seq.some(c=>FLR(c)===f));const c=rest.find(x=>miss.includes(FLR(x)))||rest[0];seq.push(c);rest=rest.filter(x=>x!==c)}}
 const need=['up','mid','down'];while(seq.length<k&&pool.length){const miss=need.filter(f=>!seq.some(c=>FLR(c)===f));const cand=pool.filter(c=>miss.includes(FLR(c)));const c=cand.length?pick(cand):pick(pool);seq.push(c);pool=pool.filter(x=>x!==c)}
 shuffle(seq);S.last=seq.join('');let placed=0;const SP=52,Wd=seq.length*SP+28;
 P(`把小寫字母送回<b class="kw">它住的那一層</b>`,[OLD.floorI],sp);
 const g=uid();
 play.innerHTML=`<div class="s8low${land()?' land':''}"><div class="s8lc">${seq.map((c,j)=>`<button class="s8lt" data-c="${c}" data-j="${j}" aria-label="字母 ${c}"><svg viewBox="0 4 100 92" aria-hidden="true">${loPath(c)}</svg></button>`).join('')}</div>
  <div class="s8house" style="width:min(92vw,${Wd*2.1}px,calc((100vh - 170px)*${(Wd/118).toFixed(3)}))"><svg viewBox="0 -14 ${Wd} 118" aria-hidden="true"><defs>${lg(g,'#FFF8EC','#FFEFD6')}</defs><path d="M6 6 L${Wd/2} -12 L${Wd-6} 6Z" fill="#FF9A8A"/><rect x="6" y="6" width="${Wd-12}" height="94" rx="6" fill="url(#${g})"/>
   ${[[12,''],[38,'5 5'],[64,''],[90,'']].map(([y,da])=>`<line x1="10" y1="${y}" x2="${Wd-10}" y2="${y}" stroke="${y===64?'#F2A7A7':'#B8C2E0'}" stroke-width="${y===64?2.4:1.6}"${da?` stroke-dasharray="${da}"`:''}/>`).join('')}<g class="s8put"></g></svg>
   <button class="s8band" data-f="up" style="top:0;height:${49/118*100}%" aria-label="上面一層"></button><button class="s8band" data-f="down" style="top:${81/118*100}%;height:${37/118*100}%" aria-label="下面一層"></button><button class="s8band" data-f="mid" style="top:${49/118*100}%;height:${32/118*100}%" aria-label="中間一層"></button></div></div>`;
 const cards=$$('.s8lt',play),bands=$$('.s8band',play),put=$('.s8put',play);let sel=null;
 const place=(card,f)=>{if(S.lock||!card||card.disabled)return;const c=card.dataset.c;if(FLR(c)!==f){bump(card);W(bands.find(b=>b.dataset.f===f));return}
  card.disabled=true;card.classList.add('gone');put.insertAdjacentHTML('beforeend',`<g transform="translate(${14+SP/2+placed*SP-40} 0) scale(.8 1)">${loPath(c,'on')}</g>`);placed++;S.miss=0;sel=null;cards.forEach(x=>x.classList.remove('s8sel'));tone(620+placed*60,0,.12,'triangle',.08);
  if(placed>=seq.length){okMark($('.s8house',play));OK($('.s8house',play),[EN(c),{pause:100},T['LW_'+f]]);return}SAY([EN(c),{pause:100},T['LW_'+f]])};
 cards.forEach(cd=>drag8(cd,{targets:()=>bands,onDrop:b=>place(cd,b.dataset.f),onTap:()=>{cards.forEach(x=>x.classList.remove('s8sel'));sel=cd;cd.classList.add('s8sel');SAY([EN(cd.dataset.c)])}}));
 bands.forEach(b=>b.onclick=()=>{if(sel)place(sel,b.dataset.f)});
 S.hint=m=>{if(m===1)PS(T.LW_H1);else{const c=cards.find(x=>!x.disabled);if(c){PS(OLD.glow);glow(c);glow(bands.find(b=>b.dataset.f===FLR(c.dataset.c)))}}};
 S.__auto=()=>{cards.forEach(c=>{if(!c.disabled&&!S.lock)place(c,FLR(c.dataset.c))})}}

/* ---------- 13. 大小寫翻牌 case8（用 2.2 的翻牌） ---------- */
const loSVG8=c=>`<svg viewBox="0 0 100 100" class="s8lo" aria-hidden="true">${[[12,''],[38,'4 4'],[64,''],[90,'']].map(([y,da])=>`<line x1="4" y1="${y}" x2="96" y2="${y}" stroke="${y===64?'#F2A7A7':'#B8C2E0'}" stroke-width="${y===64?2:1.4}"${da?` stroke-dasharray="${da}"`:''}/>`).join('')}${loPath(c)}</svg>`;
function bCase(play,sp){begin();const a=ARG('case8');let L=(a||'').split('|').map(x=>x.trim().toUpperCase()).filter(x=>/^[A-Z]$/.test(x)&&LO8()[x.toLowerCase()]);if(!L.length)L=['E','F'];
 const k=byD(2,3,4);const extra=shuffle(learnedLo().toUpperCase().split('').filter(x=>!L.includes(x)));const set=shuffle(L).slice(0,k);while(set.length<k&&extra.length)set.push(extra.shift());S.last=set.join('');
 const M=window.__h22&&window.__h22.B22&&window.__h22.B22.memory;
 const c={make:()=>({prompt:'大寫和小寫<b class="kw">配成一對</b>',intro:[OLD.caseI],done:OLD.caseOK,cls:'s8case',pairs:set.map(x=>({a:{html:`<b class="s8up">${x}</b>`},b:{html:`<span class="s8lob">${loSVG8(x.toLowerCase())}</span>`},say:[EN(x),{pause:120},EN(x.toLowerCase())]}))})};
 if(typeof M==='function'){const r=M(play,sp,c);return r}
 return BUILD.letter(play,sp,'')}

/* ---------- 接進遊戲 ---------- */
const B8={pin8:bPin,tone8:bTone,floor8:bFloor,route8:bRoute,money8:bMoney,change8:bChange,locker8:bLocker,deep8:bDeep,chart8:bChart,wheel8:bWheel,clock8:bClock,low8:bLow,case8:bCase};
Object.keys(B8).forEach(t=>{BUILD[t]=function(play,sp){try{return B8[t](play,sp)}catch(e){console.log('learn8',t,e);try{S.__auto=null;return BUILD.quiz(play,sp,'')}catch(_){}}}});
try{Object.assign(TNAME,{pin8:'拼拼看',tone8:'四聲',floor8:'樓層',route8:'逃生路線',money8:'湊錢',change8:'找錢',locker8:'置物櫃',deep8:'比深淺',chart8:'圖示圖表',wheel8:'數輪子',clock8:'撥時鐘',low8:'小寫三層樓',case8:'大小寫配對'})}catch(e){}
try{REVOK.push(...Object.keys(B8))}catch(e){}
const CLS8={pin8:'zy',tone8:'zy',low8:'en',case8:'en',floor8:'ma',money8:'ma',change8:'ma',locker8:'ma',deep8:'ma',chart8:'ma',wheel8:'ma',clock8:'ma',route8:'life'};
window.__s8cls=q=>{try{let t=String(q||'');if(t.startsWith('rev:')){const e=(V2.wrong||[]).find(x=>x.id===+t.slice(4));t=e?String(e.t):''}return CLS8[t.split(':')[0]]||''}catch(e){return ''}};
const hook=()=>{try{const H=window.__h22;if(!H||H.__s8)return !!H;const o=H.cls;H.cls=q=>window.__s8cls(q)||(typeof o==='function'?o(q):'');H.__s8=1;return true}catch(e){return false}};
if(!hook())setTimeout(hook,0);
window.__s8learn={B8,T,PIN,ROUTES,CSET,CLS8,ART8,VEH,bill100,keySVG,exitSign,elevSVG,zyV,TONE};

/* ---------- 樣式（只有淡入、移動、亮光；角色不放大縮小） ---------- */
const st=document.createElement('style');st.textContent=`
.s8dg{touch-action:none;-webkit-user-select:none;user-select:none;cursor:grab}
.s8drag{z-index:40;position:relative;transition:none!important;box-shadow:0 10px 24px rgba(60,30,120,.28)!important;cursor:grabbing}
.s8over{box-shadow:0 0 0 4px #FFD24D,0 0 18px #FFE27A!important}
.s8sel{box-shadow:0 0 0 4px #FFD24D!important}
.s8ok{box-shadow:0 0 0 4px #6FE3A8,0 0 18px rgba(111,227,168,.8)!important}
.gone{opacity:0!important;pointer-events:none}
.s8fly{position:fixed;z-index:60;pointer-events:none;display:grid;place-items:center}.s8fly svg{width:100%;height:100%}
.s8hp{width:100%;height:100%;display:block}
.s8nums{display:flex;gap:clamp(10px,2.4vmin,20px);justify-content:center;flex-wrap:wrap;margin-top:6px}
.s8num{min-width:clamp(64px,12vmin,96px);min-height:clamp(56px,11vmin,84px);border-radius:20px;border:3px solid #fff;background:linear-gradient(#B99CFF,#8C6CF0);color:#fff;font:800 clamp(30px,6vmin,46px)/1 var(--latin,'Baloo 2',sans-serif);box-shadow:0 4px 0 #6A4AC8;animation:s8in .35s both}
@keyframes s8in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.s8okb{min-width:112px;min-height:56px;padding:0 22px;border-radius:999px;border:3px solid #fff;background:linear-gradient(#FFE27A,#FFB83A);color:#6A3A00;font-weight:800;font-size:clamp(18px,3.2vmin,24px);box-shadow:0 4px 0 #D88A1A}
/* 注音直式 */
.s8zv{display:inline-flex;flex-direction:column;align-items:center;position:relative;line-height:1.02;vertical-align:middle}
.s8zv>span{position:relative;display:block}.s8tm{position:absolute;right:-.6em;top:12%;font-style:normal;font-size:.62em;line-height:1}.s8tl{position:absolute;top:-.5em;left:50%;transform:translateX(-50%);font-style:normal;font-size:.8em;line-height:1}
/* pin8 */
.s8pin{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2.4vmin,22px);width:100%}
.s8pinrow{display:flex;align-items:center;justify-content:center;gap:clamp(10px,3vmin,28px)}
.s8cons{display:flex;flex-direction:column;gap:12px}
.s8zy{width:clamp(80px,17vmin,150px);min-height:clamp(80px,17vmin,150px);border-radius:26px;display:grid;place-items:center;font-size:clamp(46px,10vmin,90px);font-weight:700;color:#4A2A7A;border:3px solid #fff;box-shadow:0 5px 0 rgba(90,60,160,.25);padding:6px 0;box-sizing:border-box}
.s8c{background:linear-gradient(#FFD0E4,#FF9FC8)}.s8v{background:linear-gradient(#DDF4FF,#A8DDFF);outline:3px dashed #6FB8F0;outline-offset:-10px}
.s8v.merged{outline:none;background:linear-gradient(#FFF6D0,#FFE27A);font-size:clamp(36px,7.4vmin,62px)}
.s8pin.hard .s8cons{flex-direction:row}.s8pin.hard .s8zy{width:clamp(72px,13vmin,110px);min-height:clamp(72px,13vmin,110px)}
.s8arw{width:clamp(40px,7vmin,64px);opacity:.9}
@media (max-aspect-ratio:1/1){.s8pin.hard .s8pinrow{flex-direction:column;gap:8px}.s8pin.hard .s8arw{transform:rotate(90deg)}.s8pin.hard .s8zy{width:clamp(72px,22vw,104px);min-height:clamp(72px,22vw,104px)}}
.s8pics{display:flex;gap:clamp(10px,2.6vmin,24px);justify-content:center;min-height:clamp(84px,18vmin,150px)}
.s8pic{width:clamp(88px,18vmin,150px);height:clamp(88px,18vmin,150px);border-radius:24px;background:#fff;border:3px solid #E8DEFF;box-shadow:0 5px 0 rgba(90,60,160,.18);padding:8px;animation:s8in .4s both;animation-delay:var(--dl)}
.s8pic svg{width:100%;height:100%}.s8pinq{display:inline-block;width:1.9em;height:1.9em;vertical-align:middle;background:#fff;border-radius:12px;padding:2px}.s8pinq svg{width:100%;height:100%}
.land .s8pin,.s8pin{max-width:100%}
/* tone8 */
.s8bub{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;margin-left:6px;border-radius:999px;border:3px solid #fff;background:linear-gradient(#FFF6D0,#FFE27A);font-size:1.15em;color:#4A2A7A;min-height:48px;vertical-align:middle}
.s8bub b{font-family:var(--latin,'Baloo 2',sans-serif);color:#FF6FA8}
.s8tone{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,2vmin,16px);width:min(96%,720px);margin:auto}
.s8tone.n5{grid-template-columns:repeat(3,minmax(0,1fr))}
.s8road{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:22px;border:3px solid #fff;background:linear-gradient(#FFFFFF,#EFE8FF);box-shadow:0 4px 0 rgba(90,60,160,.18);min-height:clamp(64px,13vmin,110px)}
.s8road svg{flex:1;min-width:0;height:clamp(44px,9vmin,80px)}.s8road .rd{stroke:var(--rc,#C9B8E8);stroke-width:12}.s8road[data-t='1']{--rc:#FFB3CF}.s8road[data-t='2']{--rc:#9FD8FF}.s8road[data-t='3']{--rc:#B9F0A8}.s8road[data-t='4']{--rc:#FFD98A}.s8road[data-t='5']{--rc:#D9C2FF}.s8road .rl{stroke:#fff;stroke-width:3}.s8road .ball{fill:#FF6FA8}
.s8tn{display:flex;flex-direction:column;align-items:center;font-size:clamp(24px,4.4vmin,36px);color:#4A2A7A;font-weight:700}.s8tn small{font-size:clamp(14px,2.4vmin,18px);color:#7A5AB0}
/* floor8 */
.s8bld{display:flex;align-items:flex-end;justify-content:center;gap:clamp(8px,2vmin,20px);width:100%}
.s8tower{position:relative;display:flex;flex-direction:column;width:clamp(170px,34vmin,300px);background:linear-gradient(#FFF6E6,#FFE8C8);border-radius:14px 14px 4px 4px;padding:30px 8px 30px;box-sizing:border-box;box-shadow:0 6px 0 rgba(90,60,160,.15)}
.s8roof{position:absolute;left:-6px;right:-6px;top:-4px;height:30px;background:#FF9A8A;border-radius:12px 12px 4px 4px}
.s8fl{flex:1;min-height:0;display:flex;align-items:center;gap:6px;border:none;border-top:2px solid #E8D2B0;background:transparent;padding:0 4px;position:relative}
.s8fl.on{background:rgba(255,226,122,.45)}.s8fl.nx .s8st{animation:s8gl 1.4s infinite}
.s8fp{min-width:30px;height:min(80%,30px);display:grid;place-items:center;border-radius:8px;background:#7A5AC8;color:#fff;font:800 clamp(14px,2.6vmin,20px)/1 var(--latin,'Baloo 2',sans-serif)}
.s8room{flex:1;height:100%;display:flex;align-items:flex-end;justify-content:center}.s8hero{display:block;height:92%;aspect-ratio:120/172}
.s8st{height:80%;aspect-ratio:4/3}.s8st svg{width:100%;height:100%}
@keyframes s8gl{50%{filter:drop-shadow(0 0 6px #FFD24D) brightness(1.1)}}
.s8door{position:absolute;left:50%;bottom:2px;transform:translateX(-50%);width:44%;height:26px;border-radius:8px 8px 0 0;background:#5FE0A0;color:#fff;font-weight:800;font-size:clamp(14px,2vmin,16px);display:grid;place-items:center}
.s8lift{align-self:center;display:flex;flex-direction:column;align-items:center;gap:2px;border:none;background:#fff;border-radius:16px;padding:6px;min-width:56px;box-shadow:0 4px 0 rgba(90,60,160,.15)}
.s8lift svg{width:clamp(44px,8vmin,64px)}.s8lift small{font-size:clamp(14px,2vmin,16px);color:#C04050;font-weight:700}
.s8ctl{display:flex;flex-direction:column;gap:12px;align-items:center;align-self:center}
.s8go{width:clamp(72px,14vmin,104px);min-height:clamp(64px,12vmin,92px);border-radius:22px;border:3px solid #fff;background:linear-gradient(#9FE8B8,#4CC98A);color:#fff;font-weight:800;font-size:clamp(16px,2.6vmin,20px);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 4px 0 #2E9A5E}
.s8go.up{background:linear-gradient(#C9B8F8,#8C6CF0);box-shadow:0 4px 0 #6A4AC8}.s8go svg{width:40%;}
.s8win{width:22%;height:70%;border-radius:6px;background:#CFEFFF;display:grid;place-items:center}.s8win svg{width:90%;height:90%}
.s8env{width:clamp(76px,14vmin,110px);height:clamp(76px,14vmin,110px);border-radius:22px;border:3px solid #fff;background:#FFF0F6;box-shadow:0 4px 0 rgba(90,60,160,.18);padding:8px}.s8env svg{width:100%;height:100%}
.s8bld.ord .s8fl{justify-content:space-around}
.s8bld.land .s8tower{padding:18px 8px 20px}.s8bld.land .s8roof{height:18px}.s8bld.land .s8door{height:18px;font-size:clamp(14px,2vmin,16px)}
/* route8 */
.s8rt{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%}.s8rt.land{flex-direction:row;justify-content:center}
.s8rview{position:relative;width:min(70vmin,420px);aspect-ratio:1;max-height:calc(100% - 4px)}.s8map{width:100%;height:100%;display:block}
.s8rt.land .s8rview{width:min(56vh,420px)}
.s8sign{position:absolute;width:44%}.s8sign.sm{width:32%}.s8sign.blink svg{animation:s8gl 1.2s infinite}.s8sign svg{width:100%;display:block}
.s8rhero{position:absolute;left:50%;bottom:4%;width:16%;aspect-ratio:120/172;transform:translateX(-50%)}.s8rhero.out{left:66%;bottom:8%}
.s8tree{position:absolute;right:4%;bottom:14%;width:30%;aspect-ratio:1}.s8tree svg{width:100%;height:100%}
.s8rside{display:flex;flex-direction:column;align-items:center;gap:10px}
.s8rdots{display:flex;gap:6px}.s8rdots i{width:14px;height:14px;border-radius:50%;background:#E0D6F8}.s8rdots i.on{background:#6FE3A8}.s8rdots i.ex{background:#FFE27A}
.s8rbtn{display:flex;gap:clamp(8px,2vmin,16px);flex-wrap:wrap;justify-content:center}
.s8dir{width:clamp(80px,15vmin,112px);min-height:clamp(70px,13vmin,100px);border-radius:22px;border:3px solid #fff;background:linear-gradient(#7FE0B0,#3FBF7F);color:#fff;font-weight:800;font-size:clamp(16px,3vmin,22px);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 4px 0 #2E9A5E}
.s8dir svg{width:46%}.s8dir.lift{background:linear-gradient(#EEE8F8,#C9C0E0);color:#5A4A7A;box-shadow:0 4px 0 #9A8AC0}.s8dir.lift svg{width:36%}
.s8rt.land .s8rbtn{display:grid;grid-template-columns:repeat(2,auto)}.s8rt.land .s8rview{width:min(calc(100vh - 150px),420px)}
/* money8 / change8 */
.s8mon,.s8chg{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.8vmin,16px);width:100%}
.s8top{display:flex;align-items:center;justify-content:center;gap:clamp(8px,2vmin,18px);width:100%}
.s8tgt{display:flex;flex-direction:column;align-items:center;background:#fff;border-radius:18px;padding:6px 12px;color:#4A2A7A;box-shadow:0 4px 0 rgba(90,60,160,.15)}.s8tgt b{font:800 clamp(30px,6vmin,48px)/1 var(--latin,'Baloo 2',sans-serif);color:#FF6FA8}.s8tgt small{font-size:clamp(14px,2vmin,16px)}
.s8tgt.bill{padding:6px}.s8tgt.bill svg{width:clamp(110px,22vmin,170px)}
.s8plate{position:relative;width:min(56vw,460px);min-height:clamp(96px,19vmin,150px);display:grid;place-items:center}.s8plsvg{position:absolute;inset:0;width:100%;height:100%}
.s8pin2{position:relative;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;max-width:84%;padding:8px}
.s8in{border:none;background:none;padding:0;display:grid;place-items:center;min-width:44px;min-height:44px}.s8in svg{width:clamp(44px,8vmin,64px)!important;height:auto}.s8in.b svg{width:clamp(90px,16vmin,130px)!important}
.s8pin2.many .s8in svg{width:clamp(36px,6vmin,50px)!important}
.s8sum{display:flex;flex-direction:column;align-items:center;color:#4A2A7A;background:#fff;border-radius:16px;padding:6px 12px;min-width:64px;box-shadow:0 4px 0 rgba(90,60,160,.15)}.s8sum b{font:800 clamp(28px,5.6vmin,44px)/1 var(--latin,'Baloo 2',sans-serif)}.s8sum.hide{visibility:hidden}
.s8wal{display:flex;gap:clamp(8px,2vmin,18px);align-items:center;justify-content:center;flex-wrap:wrap;background:rgba(255,255,255,.55);border-radius:22px;padding:8px 14px}
.s8coin{border:none;background:none;padding:2px;min-width:56px;min-height:56px;display:grid;place-items:center}.s8coin svg{width:clamp(56px,11vmin,88px)!important;height:auto}.s8coin.b svg{width:clamp(110px,20vmin,160px)!important}
.s8shop{display:flex;align-items:flex-end;justify-content:center;gap:clamp(10px,3vmin,28px);background:linear-gradient(#FFF6E6,#FFE3C0);border-radius:20px;padding:8px 18px}
.s8clerk{width:clamp(64px,13vmin,100px);aspect-ratio:1}.s8clerk svg{width:100%;height:100%}
.s8item{display:flex;flex-direction:column;align-items:center;width:clamp(64px,12vmin,92px)}.s8item svg{width:100%;aspect-ratio:1}.s8item b{background:#FF8FB8;color:#fff;border-radius:10px;padding:0 8px;font-size:clamp(16px,2.8vmin,22px)}
.s8paid{display:flex;gap:2px;align-items:center}.s8paid i svg{width:clamp(48px,9vmin,70px)!important;height:auto}.s8paid i .s8bill{width:clamp(90px,16vmin,120px)!important}
.s8line{display:flex;align-items:center;gap:clamp(6px,1.6vmin,12px);flex-wrap:wrap;justify-content:center}
.s8from{min-width:52px;height:52px;border-radius:14px;background:#FF8FB8;color:#fff;display:grid;place-items:center;font:800 26px/1 var(--latin,'Baloo 2',sans-serif)}
.s8slot{width:clamp(52px,9.6vmin,74px);height:clamp(52px,9.6vmin,74px);border-radius:50%;border:3px dashed #B99CFF;display:grid;place-items:center;position:relative;background:rgba(255,255,255,.6)}
.s8slot small{position:absolute;bottom:-1.3em;font:800 16px/1 var(--latin,'Baloo 2',sans-serif);color:#7A5AB0}.s8slot svg{width:90%!important;height:auto}.s8slot.on{border-style:solid;border-color:#6FE3A8}
.s8chg .s8line{margin-bottom:16px}.s8chg.land{flex-direction:row;justify-content:center}.s8cr{display:flex;flex-direction:column;align-items:center;gap:10px}
/* locker8 */
.s8lk{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vmin,14px);width:100%}.s8lk.land{flex-direction:row;justify-content:center}
.s8key{border:none;background:#fff;border-radius:18px;padding:6px 10px;box-shadow:0 4px 0 rgba(90,60,160,.15)}.s8key svg{width:clamp(110px,20vmin,170px);display:block}
.s8wall{display:grid;grid-template-columns:repeat(var(--c),minmax(0,1fr));gap:clamp(4px,1vmin,8px);background:#C9D8F0;border-radius:16px;padding:clamp(6px,1.4vmin,12px);width:min(94vw,820px);box-sizing:border-box}
.s8lk.land .s8wall{width:min(72vw,820px)}
.s8box{min-height:46px;aspect-ratio:1/1.05;border-radius:10px;border:none;background:linear-gradient(#FFFFFF,#E6EEFA);box-shadow:inset 0 -4px 0 #B8C6E0;display:grid;place-items:center;position:relative}
.s8box b{font:800 clamp(16px,3vmin,26px)/1 var(--latin,'Baloo 2',sans-serif);color:#3A4A7A}.s8box::after{content:'';position:absolute;right:14%;top:44%;width:8%;height:14%;border-radius:3px;background:#B8C6E0}
.s8wall.fit .s8box{aspect-ratio:auto;height:var(--lh)}.s8box.open{background:linear-gradient(#DFFFEF,#AEF0CF)}
/* deep8 */
.s8deep{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%}.s8deep.land{flex-direction:row;justify-content:center}
.s8me{border:none;background:#fff;border-radius:18px;padding:6px;width:clamp(64px,12vmin,96px);aspect-ratio:120/172;box-shadow:0 4px 0 rgba(90,60,160,.15);flex:none}
.s8pool{position:relative;width:min(94vw,760px);aspect-ratio:300/200;max-height:56vh}.s8deep.land .s8pool{width:min(70vw,760px,calc((100vh - 160px)*1.5))}
.s8pool>svg{position:absolute;inset:0;width:100%;height:100%;border-radius:16px}
.s8zone{position:absolute;top:0;bottom:0;border:none;background:transparent;border-radius:12px}
.s8zone small{position:absolute;top:4px;left:50%;transform:translateX(-50%);font-size:clamp(14px,2vmin,16px);font-weight:800;color:#C04050}
.s8fr{position:absolute;left:50%;transform:translateX(-50%);aspect-ratio:120/172;display:block}.s8fr>svg{width:100%;height:100%;display:block}
.s8fr .s8wat{position:absolute;left:-30%;right:-30%;bottom:0;background:linear-gradient(rgba(130,210,255,.72),rgba(63,168,232,.82));border-top:2px solid rgba(255,255,255,.9);border-radius:4px}
/* chart8 */
.s8ch{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%}.s8ch.land{flex-direction:row;justify-content:center;align-items:flex-end}
.s8park{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:min(94vw,640px);background:linear-gradient(#E8FFE8,#C8F0C8);border-radius:18px;padding:8px}
.s8ch.land .s8park{max-width:44vw}.s8park.done{display:none}
.s8vh{border:none;background:rgba(255,255,255,.7);border-radius:14px;padding:4px;min-width:56px;min-height:46px}.s8vh svg{width:clamp(52px,9vmin,76px);display:block}
.s8chart{display:flex;gap:clamp(10px,3vmin,26px);align-items:flex-end;justify-content:center}
.s8col{display:flex;flex-direction:column;align-items:center;border:none;background:rgba(255,255,255,.6);border-radius:16px;padding:6px;gap:4px}
.s8col.ask{animation:s8gl 1.6s infinite}
.s8cells{display:flex;flex-direction:column-reverse;gap:2px}.s8cells i{width:clamp(44px,8vmin,64px);height:clamp(22px,min(4.2vmin,calc((100vh - 330px)/var(--r))),40px);min-height:16px;border:2px dashed #D0C4F0;border-radius:6px;display:grid;place-items:center;box-sizing:border-box}
.s8cells i.on{border:2px solid #fff;background:#fff}.s8cells i svg{height:100%;width:auto}
.s8lab{display:flex;flex-direction:column;align-items:center}.s8lab svg{width:clamp(44px,8vmin,64px)}.s8lab small{font-size:clamp(14px,2vmin,16px);color:#4A2A7A;font-weight:700}
.s8q:empty{display:none}
/* wheel8 */
.s8wh{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%}.s8wh.land{flex-direction:row;justify-content:center;flex-wrap:wrap}
.s8lot{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:min(94vw,640px)}.s8lot .s8vh svg{width:clamp(60px,11vmin,90px)}
.s8rack{display:grid;grid-template-columns:repeat(min(var(--n),5),auto);gap:6px;background:linear-gradient(#E6EEFA,#C9D8F0);border-radius:16px;padding:8px;min-height:56px;min-width:120px}
.s8rs{position:relative;width:clamp(60px,11vmin,90px);aspect-ratio:100/70;border-bottom:4px solid #9AAAD0;display:grid;place-items:center}.s8rs svg{width:100%}
.s8rs b{position:absolute;top:-4px;right:-2px;background:#FF6FA8;color:#fff;border-radius:999px;padding:0 6px;font:800 16px/1.3 var(--latin,'Baloo 2',sans-serif)}.s8rs b:empty{display:none}
.s8veh.lit .s8w circle:first-child{fill:#FFB33A}
.s8cnt{font:800 clamp(34px,7vmin,56px)/1 var(--latin,'Baloo 2',sans-serif);color:#FF6FA8;min-height:1em}.s8cnt.hide{visibility:hidden}
/* clock8 */
.s8clk{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%}.s8clk.land{flex-direction:row;justify-content:center}
.s8face{position:relative;width:min(62vmin,340px);aspect-ratio:1;touch-action:none}.s8face>svg{width:100%;height:100%;display:block}
.s8clk.land .s8face{width:min(calc(100vh - 172px),340px)}
.s8hn{position:absolute;width:17%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:none;background:transparent;min-width:44px;min-height:44px}
.s8mini{display:flex;flex-direction:column;align-items:center;width:clamp(80px,16vmin,120px)}.s8mini svg{width:100%}.s8mini small{font-size:clamp(14px,2vmin,16px);color:#4A2A7A}
.s8mh{display:flex;flex-direction:column;align-items:center;min-width:104px;min-height:56px;border-radius:18px;border:3px solid #fff;background:linear-gradient(#BFD8FF,#7FA8F0);color:#fff;font-weight:800;box-shadow:0 4px 0 #4A7BE0}.s8mh b{font-size:16px}
/* low8 */
.s8low{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%}.s8low.land{flex-direction:row;justify-content:center}
.s8lc{display:flex;gap:clamp(8px,2vmin,16px);flex-wrap:wrap;justify-content:center}
.s8lt{width:clamp(64px,12vmin,96px);aspect-ratio:100/92;border-radius:16px;border:3px solid #fff;background:linear-gradient(#FFFFFF,#F2ECFF);box-shadow:0 4px 0 rgba(90,60,160,.18);padding:4px}.s8lt svg{width:100%;height:100%}
.s8g{stroke:#4A2A7A;stroke-width:8}.s8g.on{stroke:#FF6FA8}
.s8house{position:relative}.s8house>svg{width:100%;display:block}.s8low.land .s8house{max-width:60vw}
.s8band{position:absolute;left:4%;right:4%;border:none;background:transparent;border-radius:8px}
/* case8 */
.s8up{font:800 clamp(40px,8vmin,64px)/1 var(--latin,'Baloo 2',sans-serif);color:#4A2A7A}.s8lob{display:block;width:80%;margin:auto}.s8lo{width:100%;display:block}.s8lo .s8g{stroke-width:7}
@media (prefers-reduced-motion:reduce){.s8fl.nx .s8st,.s8sign.blink svg,.s8col.ask,.s8pic,.s8num{animation:none!important}}
body.lite .s8fl.nx .s8st,body.lite .s8sign.blink svg,body.lite .s8col.ask{animation:none!important}
`;document.head.appendChild(st);
}catch(e){console.log('m8se_learn8',e)}
}).toString()+')()')})();

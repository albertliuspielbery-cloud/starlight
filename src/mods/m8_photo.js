/* ================= 小小攝影師（m8_photo.js，畫面 photo8；遊樂園大門「小遊戲」區「大自然」頁） =================
 * 2026-11-22 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室。預覽版：等 Albert 看過新美術才算定稿。
 * 規格：doc/brief_s7.md 附錄「小小攝影師」；大綱「五、遊樂園規劃」第七季。完成第 44 章打開；App 要有完整版 full（或以前的 stage9；5.4.0 起不賣 stage9）；網頁版跟章節同一個季密碼。
 * 玩法：城市動物園一大片場景（只能左右平移，不縮放）。保育員請小朋友幫忙拍照：拖動相機取景框，對準題目說的動物，按快門。一輪 5 張，最後翻相簿。
 *   簡單：一個條件（哪一種動物）。中等：兩個條件（動物＋數量／在做什麼／在哪裡）。高難度：三個條件。還不能拼讀，不出看注音名牌的題。
 *   題目是固定清單（QS），每題一句完整錄音；場景每一輪照題目重新安排，保證拍得到（站位、數量、在做什麼都照題目排，另外放幾群「差一點」的當對照）。
 * 沒有輸、不扣分、不倒數：拍錯了說「這是長頸鹿喔，再找找看！」；同一題第二次錯，鏡頭移過去、要拍的動物發光。
 * 動物園的安全和禮貌放在場景小細節：入口「不開閃光燈」牌、相機的閃光燈按鈕一直是關的；猴子山「不餵動物」牌；企鵝館玻璃「不拍玻璃」。點了會說明。
 * 彩蛋：保育員就在竹林旁邊，點他會說話；把保育員拍進去（沒有動物），他會謝謝你。
 * 收集：拍到的動物住進收集冊「我的動物園」（20 種，V2.z8got）；照片存在這台裝置（canvas 畫成 240×200 的小圖，最多 40 張，舊的自動移掉）。
 * 寶石：每天第一次玩完 3 顆、之後 1 顆（V2.photo8Day；大門每日上限用 __gateExt.gemDay 接）。
 * 語音只念有真人錄音的句子（沒錄好以前只出字幕）；台詞表 lines/photo.tsv 由 qa/photo8/mk_lines.py 從下面 LINES、QS 產生。
 * 動畫：只有移動、淡入淡出、眨眼、亮光，沒有放大縮小。 */
/* 主程式在 (()=>{…})() 裡面，mods 接在它後面：用主程式留的 window.__ev（直接 eval）把這一段放進主程式的範圍執行（跟 m7c、m8_globe 同一個做法）。
 * 檔名排序時這個檔在 m8_photo_art.js 前面：等美術（ZOO8）載入後再開始。 */
(function(){
const run=()=>{if(typeof window.__ev!=='function'){console.log('photo8: 找不到 __ev，沒有接上');return}if(window.__PH8)return;window.__ev('('+(function(){try{
if(typeof SCREENS==='undefined'||!window.ZOO8||window.__PH8)return;
const Z=window.ZOO8;
/*LINES*/
const T={
"v_card":"小小攝影師，幫動物園的動物拍照！",
"lock44":"完成第四十四章，就會打開喔！",
"again":"再點一下，就可以進去喔！",
"lockApp":"爸爸媽媽可以幫你打開新的冒險喔！",
"v_menu":"小小攝影師！要玩哪一種呢？",
"d_easy":"簡單","d_mid":"中等","d_hard":"高難度",
"v_hi":"我是動物園的保育員，請你當小小攝影師，幫動物拍照！",
"v_how":"拖動相機，對準動物，再按快門！",
"v_got":"拍到了！",
"v_got2":"拍得好清楚！",
"v_new":"新朋友住進我的動物園了！",
"v_none":"相機裡沒有動物喔，對準動物再拍！",
"v_pos":"是這種動物沒錯！看看牠在哪裡？",
"v_st":"是這種動物沒錯！看看牠在做什麼？",
"v_n":"是這種動物沒錯！數一數，要幾隻呢？",
"v_glow":"看！發光的就是了！",
"v_keepsnap":"咦，你拍到保育員了！謝謝你！",
"v_keeper":"我是保育員，動物吃的東西都是我們準備的喔！",
"v_flash":"拍動物不開閃光燈，動物才不會嚇到喔！",
"v_feed":"不餵動物，動物吃自己的食物才健康喔！",
"v_glass":"不要用手拍玻璃，動物會嚇一跳喔！",
"v_done":"五張照片都拍好了！一起來看相簿！",
"v_great":"你是很棒的小小攝影師！",
"v_album":"這是你拍的照片！點一下，聽聽牠的名字。",
"gem3":"送你三顆寶石！","gem1":"送你一顆寶石！",
"b_line":"我的動物園！",
"b_lock":"去小小攝影師拍拍看，牠就會住進來喔！",
"w_elephant":"這是大象喔，再找找看！","w_giraffe":"這是長頸鹿喔，再找找看！","w_lion":"這是獅子喔，再找找看！","w_zebra":"這是斑馬喔，再找找看！",
"w_hippo":"這是河馬喔，再找找看！","w_rhino":"這是犀牛喔，再找找看！","w_meerkat":"這是狐獴喔，再找找看！","w_monkey":"這是猴子喔，再找找看！",
"w_panda":"這是貓熊喔，再找找看！","w_redpanda":"這是小貓熊喔，再找找看！","w_koala":"這是無尾熊喔，再找找看！","w_kangaroo":"這是袋鼠喔，再找找看！",
"w_flamingo":"這是紅鶴喔，再找找看！","w_crocodile":"這是鱷魚喔，再找找看！","w_turtle":"這是烏龜喔，再找找看！","w_polarbear":"這是北極熊喔，再找找看！",
"w_penguin":"這是企鵝喔，再找找看！","w_blackbear":"這是台灣黑熊喔，再找找看！","w_deer":"這是梅花鹿喔，再找找看！","w_pangolin":"這是穿山甲喔，再找找看！"
};
/*END*/
/* 題目清單（每題一句完整錄音）：lv e 簡單（一個條件）／m 中等（兩個）／h 高難度（三個）
 * n 幾隻；st 在做什麼 stand 站著／sleep 睡覺／eat 吃東西／play 玩；pos 在哪裡 rockup 石頭上面／treeup 樹上／treedown 大樹下面／L 大樹左邊／R 大樹右邊／water 水裡／iceup 冰塊上面 */
/*QS*/
const QS=[
{"id":"e01","lv":"e","sp":"elephant","t":"幫我拍大象！"},{"id":"e02","lv":"e","sp":"giraffe","t":"幫我拍長頸鹿！"},{"id":"e03","lv":"e","sp":"lion","t":"幫我拍獅子！"},{"id":"e04","lv":"e","sp":"zebra","t":"幫我拍斑馬！"},
{"id":"e05","lv":"e","sp":"hippo","t":"幫我拍河馬！"},{"id":"e06","lv":"e","sp":"rhino","t":"幫我拍犀牛！"},{"id":"e07","lv":"e","sp":"meerkat","t":"幫我拍狐獴！"},{"id":"e08","lv":"e","sp":"monkey","t":"幫我拍猴子！"},
{"id":"e09","lv":"e","sp":"panda","t":"幫我拍貓熊！"},{"id":"e10","lv":"e","sp":"redpanda","t":"幫我拍小貓熊！"},{"id":"e11","lv":"e","sp":"koala","t":"幫我拍無尾熊！"},{"id":"e12","lv":"e","sp":"kangaroo","t":"幫我拍袋鼠！"},
{"id":"e13","lv":"e","sp":"flamingo","t":"幫我拍紅鶴！"},{"id":"e14","lv":"e","sp":"crocodile","t":"幫我拍鱷魚！"},{"id":"e15","lv":"e","sp":"turtle","t":"幫我拍烏龜！"},{"id":"e16","lv":"e","sp":"polarbear","t":"幫我拍北極熊！"},
{"id":"e17","lv":"e","sp":"penguin","t":"幫我拍企鵝！"},{"id":"e18","lv":"e","sp":"blackbear","t":"幫我拍台灣黑熊！"},{"id":"e19","lv":"e","sp":"deer","t":"幫我拍梅花鹿！"},{"id":"e20","lv":"e","sp":"pangolin","t":"幫我拍穿山甲！"},
{"id":"m01","lv":"m","sp":"zebra","n":2,"t":"幫我拍兩隻斑馬！"},
{"id":"m02","lv":"m","sp":"flamingo","n":3,"t":"幫我拍三隻紅鶴！"},
{"id":"m03","lv":"m","sp":"meerkat","n":3,"t":"幫我拍三隻狐獴！"},
{"id":"m04","lv":"m","sp":"kangaroo","n":2,"t":"幫我拍兩隻袋鼠！"},
{"id":"m05","lv":"m","sp":"deer","n":2,"t":"幫我拍兩隻梅花鹿！"},
{"id":"m06","lv":"m","sp":"penguin","n":3,"t":"幫我拍三隻企鵝！"},
{"id":"m07","lv":"m","sp":"lion","st":"sleep","t":"幫我拍在睡覺的獅子！"},
{"id":"m08","lv":"m","sp":"panda","st":"eat","t":"幫我拍在吃東西的貓熊！"},
{"id":"m09","lv":"m","sp":"koala","st":"sleep","t":"幫我拍在睡覺的無尾熊！"},
{"id":"m10","lv":"m","sp":"redpanda","st":"play","t":"幫我拍在玩的小貓熊！"},
{"id":"m11","lv":"m","sp":"giraffe","st":"eat","t":"幫我拍在吃東西的長頸鹿！"},
{"id":"m12","lv":"m","sp":"polarbear","st":"play","t":"幫我拍在玩的北極熊！"},
{"id":"m13","lv":"m","sp":"elephant","st":"play","t":"幫我拍在玩的大象！"},
{"id":"m14","lv":"m","sp":"rhino","st":"stand","t":"幫我拍站著的犀牛！"},
{"id":"m15","lv":"m","sp":"blackbear","st":"eat","t":"幫我拍在吃東西的台灣黑熊！"},
{"id":"m16","lv":"m","sp":"monkey","pos":"rockup","t":"幫我拍在石頭上面的猴子！"},
{"id":"m17","lv":"m","sp":"hippo","pos":"water","t":"幫我拍在水裡的河馬！"},
{"id":"m18","lv":"m","sp":"giraffe","pos":"L","t":"幫我拍在大樹左邊的長頸鹿！"},
{"id":"m19","lv":"m","sp":"zebra","pos":"R","t":"幫我拍在大樹右邊的斑馬！"},
{"id":"m20","lv":"m","sp":"turtle","pos":"rockup","t":"幫我拍在石頭上面的烏龜！"},
{"id":"m21","lv":"m","sp":"deer","pos":"treedown","t":"幫我拍在大樹下面的梅花鹿！"},
{"id":"m22","lv":"m","sp":"penguin","pos":"iceup","t":"幫我拍在冰塊上面的企鵝！"},
{"id":"h01","lv":"h","sp":"panda","n":2,"st":"sleep","t":"幫我拍兩隻在睡覺的貓熊！"},
{"id":"h02","lv":"h","sp":"zebra","n":2,"st":"eat","t":"幫我拍兩隻在吃東西的斑馬！"},
{"id":"h03","lv":"h","sp":"penguin","n":2,"st":"play","t":"幫我拍兩隻在玩的企鵝！"},
{"id":"h04","lv":"h","sp":"meerkat","n":3,"st":"stand","t":"幫我拍三隻站著的狐獴！"},
{"id":"h05","lv":"h","sp":"monkey","n":2,"pos":"rockup","t":"幫我拍兩隻在石頭上面的猴子！"},
{"id":"h06","lv":"h","sp":"lion","pos":"rockup","st":"sleep","t":"幫我拍在石頭上面睡覺的獅子！"},
{"id":"h07","lv":"h","sp":"giraffe","pos":"L","st":"eat","t":"幫我拍在大樹左邊吃東西的長頸鹿！"},
{"id":"h08","lv":"h","sp":"kangaroo","n":2,"pos":"R","t":"幫我拍兩隻在大樹右邊的袋鼠！"},
{"id":"h09","lv":"h","sp":"deer","n":2,"pos":"treedown","t":"幫我拍兩隻在大樹下面的梅花鹿！"},
{"id":"h10","lv":"h","sp":"koala","pos":"treeup","st":"sleep","t":"幫我拍在樹上睡覺的無尾熊！"},
{"id":"h11","lv":"h","sp":"hippo","n":2,"pos":"water","t":"幫我拍兩隻在水裡的河馬！"},
{"id":"h12","lv":"h","sp":"redpanda","pos":"treeup","st":"eat","t":"幫我拍在樹上吃東西的小貓熊！"},
{"id":"h13","lv":"h","sp":"turtle","n":2,"pos":"rockup","t":"幫我拍兩隻在石頭上面的烏龜！"},
{"id":"h14","lv":"h","sp":"penguin","n":3,"pos":"iceup","t":"幫我拍三隻在冰塊上面的企鵝！"},
{"id":"h15","lv":"h","sp":"blackbear","pos":"treedown","st":"sleep","t":"幫我拍在大樹下面睡覺的台灣黑熊！"},
{"id":"h16","lv":"h","sp":"polarbear","pos":"water","st":"play","t":"幫我拍在水裡玩的北極熊！"}
];
/*END*/
const P5=window.__P5||null;
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const has=p=>{try{if(!VO.idx)return false;const u=String(p).trim();return voHas('z|'+u)||voHas('z|'+voCk(u))}catch(e){return false}};
const hasE=t=>{try{return !!VO.idx&&voHas('e1|'+t)}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&(typeof p==='object'?(p.en!=null&&hasE(p.en)):has(p)));if(!a.length)return Promise.resolve(false);
 const q=[];a.forEach((t,i)=>{if(i)q.push({pause:180});q.push(t)});try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
const LI=k=>Z.LIST.find(x=>x.k===k)||{k,zh:k,en:k,zhV:[k],enV:[k]};
// 動物名字：中文、英文各念一次（照圖鑑）；只念錄好的
function nameParts(k){const L=LI(k);const zh=L.zhV.find(has);const en=L.enV.find(hasE);return [zh||L.zh+'。',en?{en,slow:1}:{en:L.en+'.',slow:1}]}
function gems(key){if(P5&&typeof P5.gems==='function')return P5.gems(key);const first=V2[key]!==today();V2[key]=today();try{save2()}catch(e){}const n=first?3:1;S.wallet+=n;save();try{renderBar()}catch(e){}sfx('gem');return n}
const sv2=()=>{try{save2()}catch(e){}};
/* ---------- 開放條件 ---------- */
const STAGE7=()=>window.__S7STAGE||'stage9';
// 5.4.0（Albert 11/24）：不再賣 stage9；App 有「完整版」full 就開，stage9 只是以防萬一（例如兌換碼）還認得。不向商店查 stage9
const appOK=()=>{try{if(typeof IS_APP==='undefined'||!IS_APP)return true;if(typeof iapOwned==='function'&&iapOwned().includes('full'))return true;return typeof stageOpen==='function'&&!!stageOpen(STAGE7())}catch(e){return false}};
const webOK=()=>{try{return typeof s3Ok==='function'?!!s3Ok():true}catch(e){return true}};
function gate(){if(!(S.chDone>=44))return 'ch';if(!appOK())return 'app';if(!webOK())return 'pw';return ''}
/* ---------- 卡片 ---------- */
try{const IA=c=>`<svg viewBox="0 0 64 64" aria-hidden="true">${c}</svg>`;ICONART['i:photo8']=IA(Z.icon)}catch(e){console.log('icon photo8',e)}
try{UXPD.photo8='在動物園拍動物'}catch(e){}
// 遊樂園大門（m99zx4）：放「小遊戲」；寶石照每日上限；page：小遊戲區分頁時放「大自然」頁
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{photo8:'games'});X.gemDay=Object.assign(X.gemDay||{},{photo8:'photo8Day'});X.newest=['photo8'].concat((X.newest||[]).filter(k=>k!=='photo8'));X.page=Object.assign(X.page||{},{photo8:'nature'})}catch(e){}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const g=$('.pgrid');if(g&&!g.querySelector('[data-k="photo8"]')){
 const after=g.querySelector('[data-k="vine6"]')||g.querySelector('[data-k="chef5"]');const st=gate(),lk=st==='ch'||st==='app';
 const b=document.createElement('button');b.className='pcard'+(lk?' lockd':'');b.dataset.k='photo8';b.style.setProperty('--dl','.85s');
 b.innerHTML=`<span class="pic">${art('i:photo8')}</span><b>小小攝影師</b><span>${st==='ch'?'完成第四十四章就會打開':'在動物園拍動物'}</span>${lk?`<span class="lk">${ICON.lock('#FFD98A')}</span>`:''}`;
 g.insertBefore(b,after?after.nextSibling:null)}}catch(e){console.log('park photo8',e)}return r}}
try{PARKS.push('photo8')}catch(e){}
let pick8=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="photo8"]');if(!c)return;
 e.stopImmediatePropagation();e.preventDefault();const st=gate();const shake=()=>{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')};
 if(st==='ch'){hush();sayR([T.lock44]);shake();return}
 if(st==='app'){hush();sayR([T.lockApp]);shake();return}
 V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen.photo8=(V2.parkSeen.photo8||0)+1;sv2();sfx('pop');S.from='park';hush();go('photo8')};
 const tryEnter=()=>{if(st==='pw'&&typeof window.__s3Gate==='function')return window.__s3Gate(enter);enter()};
 if((V2.parkSeen.photo8||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pick8<8000))return tryEnter();
 const g=c.parentNode;$$('.pcard.uxsel',g).forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pick8=Date.now();sfx('pop');hush();sayR([T.v_card,T.again])}catch(_){}},true);

/* ---------- 相簿：存在這台裝置（每個小朋友分開；不放進文字備份） ---------- */
const AKEY=()=>{let id='c1';try{id=(window.KID&&KID.id)||'c1'}catch(e){}return 'pp4photo8'+(id==='c1'?'':'@'+id)};
const MAXP=40;
function albumGet(){try{const r=window.__rawLS?__rawLS.get(AKEY()):localStorage.getItem(AKEY());const a=JSON.parse(r||'[]');return Array.isArray(a)?a.filter(x=>x&&x.d&&x.k):[]}catch(e){return []}}
function albumPut(a){a=a.slice(-MAXP);for(let i=0;i<8;i++){try{const v=JSON.stringify(a);window.__rawLS?__rawLS.set(AKEY(),v):localStorage.setItem(AKEY(),v);return true}catch(e){a=a.slice(Math.min(5,a.length-1))}}return false}
function albumAdd(p){const a=albumGet();a.push(p);return albumPut(a)}
// 刪掉一個小朋友時，他的照片一起刪（家長 2026-11-24 決定）：包 profDel；開機時也清掉已經沒有這位小朋友的照片
const photoKeyOf=id=>'pp4photo8'+(id==='c1'?'':'@'+id);
function photoSweep(){try{const P=window.PROF;if(!P||!Array.isArray(P.kids)||!window.__rawLS)return;const ids=new Set(P.kids.map(k=>k.id));const LS=window.localStorage;const del=[];
 for(let i=0;i<LS.length;i++){const k=LS.key(i);const m=k&&k.match(/^pp4photo8@(.+)$/);if(m&&!ids.has(m[1]))del.push(k)}del.forEach(k=>__rawLS.del(k))}catch(e){console.log('photo8 sweep',e)}}
try{if(typeof profDel==='function'){const _pd=profDel;profDel=async function(id){const r=await _pd.apply(this,arguments);try{const P=window.PROF;if(id&&P&&!P.kids.some(k=>k.id===id)&&window.__rawLS)__rawLS.del(photoKeyOf(id))}catch(e){}return r}}}catch(e){console.log('photo8 profDel',e)}
photoSweep();
/* ---------- 收集：我的動物園 ---------- */
const got=()=>{const g=V2.z8got;return g&&typeof g==='object'?g:(V2.z8got={})};
const nGot=()=>Z.LIST.filter(x=>got()[x.k]).length;

/* ---------- 一輪：選題、安排場景 ---------- */
const POSES=Z.POSES;
const pickOne=a=>a[Math.floor(Math.random()*a.length)];
const rint=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const satS=(s,a,q)=>!!a&&a.n>0&&s.sp===q.sp&&(!q.n||a.n===q.n)&&(!q.st||a.st===q.st)&&(!q.pos||s.tags.includes(q.pos));
const FW=360,FH=300,VY0=200,VH=Z.H-VY0;   // 取景框（世界座標）、畫面看得到的高度（天空上面一段不顯示）
function layout(qs){const A={};
 for(const q of qs){const c=shuffle(Z.SLOTS.filter(s=>s.sp===q.sp&&!A[s.id]&&(!q.pos||s.tags.includes(q.pos))&&(!q.n||s.cap>=q.n)&&(!q.st||!s.st||s.st.includes(q.st))));
  if(!c.length)return null;const s=c[0];A[s.id]={n:q.n||rint(1,Math.min(2,s.cap)),st:q.st||pickOne(s.st||POSES),q:q.id};q._slot=s.id}
 for(const s of Z.SLOTS){if(A[s.id])continue;const qq=qs.filter(q=>q.sp===s.sp);let a=null;
  for(let t=0;t<24&&!a;t++){const n=qq.length?rint(1,s.cap):(Math.random()<.22?0:rint(1,s.cap));const c={n,st:pickOne(s.st||POSES)};
   // 同一種動物的另一群：故意跟題目差一個條件（數量、在做什麼、在哪裡），當對照
   if(!qq.some(q=>satS(s,c,q)))a=c}
  A[s.id]=a||{n:0,st:'stand'}}
 Z.LIST.forEach(L=>{if(Z.SLOTS.some(s=>s.sp===L.k&&A[s.id].n>0))return;const s=Z.SLOTS.find(s=>s.sp===L.k);A[s.id]={n:1,st:(s.st||POSES)[0]}});
 return A}
function build(A){const M=[];let i=0;
 Z.SLOTS.forEach(s=>{const a=A[s.id];if(!a||!a.n)return;Z.members(s,a.n).forEach((m,j)=>{const front=['penguin','meerkat','koala','monkey','blackbear'].includes(s.sp);const flip=front?false:s.tags.includes('R')?true:s.tags.includes('L')?false:Math.random()<.4;
  M.push({i:i++,sp:s.sp,st:a.st,slot:s.id,tags:s.tags,x:m.x,y:m.y,size:m.size,cx:m.x,cy:m.y-m.size*.46,flip,wl:s.wl||0})})});
 return M}
function judge(M,q,fr){const inF=m=>m.cx>=fr.x&&m.cx<=fr.x+fr.w&&m.cy>=fr.y&&m.cy<=fr.y+fr.h;
 const inn=M.filter(inF);const sp=inn.filter(m=>m.sp===q.sp);const ok=sp.filter(m=>(!q.st||m.st===q.st)&&(!q.pos||m.tags.includes(q.pos)));
 if(q.n?ok.length===q.n:ok.length>0)return {ok:true,hit:ok};
 if(sp.length){const pf=sp.filter(m=>!q.pos||m.tags.includes(q.pos));if(!pf.length)return {why:'pos'};const sf=pf.filter(m=>!q.st||m.st===q.st);if(!sf.length)return {why:'st'};return {why:'n'}}
 if(inn.length){const c={x:fr.x+fr.w/2,y:fr.y+fr.h/2};const near=inn.slice().sort((a,b)=>Math.hypot(a.cx-c.x,a.cy-c.y)-Math.hypot(b.cx-c.x,b.cy-c.y))[0];return {why:'sp',k:near.sp}}
 const K=Z.KEEP;const kc={x:K.x,y:K.y-K.size*.46};if(kc.x>=fr.x&&kc.x<=fr.x+fr.w&&kc.y>=fr.y&&kc.y<=fr.y+fr.h)return {why:'keeper'};
 return {why:'none'}}
// 這一題拍不拍得到：在要拍的那一群附近找一個取景框的位置（保證每一題都有解）
function solve(M,q){const tg=M.filter(m=>m.slot===q._slot);if(!tg.length)return null;const x0=Math.min(...tg.map(m=>m.cx)),x1=Math.max(...tg.map(m=>m.cx));const y0=Math.min(...tg.map(m=>m.cy)),y1=Math.max(...tg.map(m=>m.cy));
 let best=null;for(let x=x1-FW;x<=x0;x+=12)for(let y=Math.max(VY0,y1-FH);y<=Math.min(Z.H-FH,y0);y+=12){const fr={x,y,w:FW,h:FH};if(judge(M,q,fr).ok){const d=Math.abs(x+FW/2-(x0+x1)/2)+Math.abs(y+FH/2-(y0+y1)/2);if(!best||d<best.d)best={x,y,w:FW,h:FH,d}}}
 return best}
function makeRound(lv){const seen=got();
 for(let t=0;t<60;t++){const pool=shuffle(QS.filter(q=>q.lv===lv).map(q=>Object.assign({},q)));
  // 簡單：先出還沒收集到的動物
  if(lv==='e')pool.sort((a,b)=>(seen[a.sp]?1:0)-(seen[b.sp]?1:0));
  const qs=[],used=new Set();for(const q of pool){if(qs.length>=5)break;if(used.has(q.sp))continue;qs.push(q);used.add(q.sp)}
  if(lv==='e')qs.sort(()=>Math.random()-.5);
  const A=layout(qs);if(!A)continue;const M=build(A);if(qs.every(q=>solve(M,q)))return {qs,M}}
 return null}
window.__photo8T={QS,T,layout,build,judge,solve,makeRound,FW,FH};

/* ---------- 畫面 ---------- */
const DN={easy:'e',mid:'m',hard:'h'};
let pTok=0,VS={diff:null},G=null,BG=null,FR=null;
const keeperFace=`<svg viewBox="22 8 56 44" aria-hidden="true">${Z.keeper()}</svg>`;
const ICS={
 shut:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="18" width="48" height="34" rx="8" fill="#5A6AA8"/><rect x="18" y="11" width="16" height="10" rx="3" fill="#5A6AA8"/><circle cx="32" cy="35" r="12" fill="#BFE6FF" stroke="#FFFFFF" stroke-width="4"/><circle cx="36" cy="31" r="3.4" fill="#fff"/><circle cx="48" cy="25" r="2.6" fill="#FFD84D"/></svg>`,
 flash:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M36 8 L18 36 H30 L24 56 L46 26 H34Z" fill="#FFD84D" stroke="#C8962A" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="32" r="26" fill="none" stroke="#E84A4A" stroke-width="5"/><path d="M14 14 L50 50" stroke="#E84A4A" stroke-width="5" stroke-linecap="round"/></svg>`,
 L:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 L8 12 L15 19" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 R:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5 L16 12 L9 19" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 spk:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9 H8 L13 5 V19 L8 15 H4Z" fill="currentColor"/><path d="M16 9 Q18 12 16 15 M18.6 6.6 Q22.4 12 18.6 17.4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
 album:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="10" width="44" height="46" rx="5" fill="#FF8FC8"/><rect x="8" y="10" width="7" height="46" rx="3" fill="#E0609A"/><rect x="20" y="17" width="26" height="22" rx="2" fill="#FFF8EC"/><circle cx="28" cy="25" r="3.4" fill="#FFD24D"/><path d="M21 37 L29 29 L34 33 L39 27 L45 37Z" fill="#6FD39A"/></svg>`};
function memberSVG(m,photo){const s=m.size/100;const tx=m.flip?m.x+m.size/2:m.x-m.size/2,ty=m.y-m.size*.95;
 let inner=Z.draw(m.sp,m.st);
 if(m.wl){const id='z8w'+m.i;inner=`<defs><clipPath id="${id}"><rect x="-20" y="-20" width="140" height="${m.wl+20}"/></clipPath></defs><g clip-path="url(#${id})">${inner}</g><path d="M2 ${m.wl} q12 -4 24 0 q12 4 24 0 q12 -4 24 0 q12 4 24 0" stroke="#FFFFFF" stroke-width="2.6" fill="none" opacity=".75" stroke-linecap="round"/>`}
 return `<g class="z8a" data-i="${m.i}" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${(m.flip?-s:s).toFixed(4)} ${s.toFixed(4)})">${photo?'':'<ellipse class="z8halo" cx="50" cy="56" rx="54" ry="50" fill="url(#z8glowg)"/>'}${inner}</g>`}
function sceneInner(M,photo){const K=Z.KEEP,ks=K.size/100;
 const ms=M.slice().sort((a,b)=>a.y-b.y);
 return `<defs><radialGradient id="z8glowg"><stop offset="0" stop-color="#FFF6A8" stop-opacity=".95"/><stop offset=".6" stop-color="#FFE27A" stop-opacity=".55"/><stop offset="1" stop-color="#FFE27A" stop-opacity="0"/></radialGradient></defs>`
  +(BG||(BG=Z.bg()))+ms.filter(m=>m.y<K.y).map(m=>memberSVG(m,photo)).join('')
  +`<g class="z8kp" data-hot="keeper" transform="translate(${K.x-K.size/2} ${K.y-K.size*.95}) scale(${ks})">${Z.keeper()}</g>`
  +ms.filter(m=>m.y>=K.y).map(m=>memberSVG(m,photo)).join('')+Z.front()}

SCREENS.photo8=function(){const g0=gate();if(g0==='ch'||g0==='app'){setTimeout(()=>{try{go('park')}catch(e){}},0);return}const tok=++pTok;const live=()=>tok===pTok&&S.screen==='photo8';const calm=RM();
 if(!VS.diff)VS.diff=DN[S.diff]?S.diff:'easy';
 screen.innerHTML=`<div class="ph8${calm?' calm':''}"><div class="phead"><button class="btn2 small" id="pback">回遊樂園</button><h2 class="gtitle">小小攝影師</h2><span class="phsp"></span></div>
  <div class="ph8stage" id="ph8st"><div class="ph8world" id="ph8w"></div>
   <div class="ph8q" id="ph8q" hidden><span class="ph8kp">${keeperFace}</span><p id="ph8qt"></p><button class="ph8rep" id="ph8rep" type="button" aria-label="再聽一次">${ICS.spk}</button></div>
   <div class="ph8vf" id="ph8vf" hidden><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><b class="ph8x"></b><span class="ph8dark"></span><span class="ph8dev"></span></div>
   <button class="ph8arr l" id="ph8l" type="button" aria-label="往左看">${ICS.L}</button><button class="ph8arr r" id="ph8r" type="button" aria-label="往右看">${ICS.R}</button>
   <p class="ph8tip" id="ph8tip"></p><div class="ph8map" id="ph8map" aria-hidden="true"></div></div>
  <div class="ph8bar"><div class="ph8strip" id="ph8strip"></div><button class="ph8flash" id="ph8fl" type="button" aria-label="閃光燈關著">${ICS.flash}</button><button class="ph8shut" id="ph8shut" type="button" aria-label="按快門" disabled>${ICS.shut}</button></div>
  <div class="ph8menu" id="ph8menu"><div class="ph8mc">
   <div class="ph8mh"><span class="ph8mi">${art('i:photo8')}</span><div><b>小小攝影師</b><small>保育員請你幫動物拍照！</small></div></div>
   <div class="ph8lab">難度</div><div class="ph8row" id="ph8diffs"><button class="ph8opt" data-v="easy" type="button"><b>簡單</b><small>找到動物</small></button><button class="ph8opt" data-v="mid" type="button"><b>中等</b><small>兩個條件</small></button><button class="ph8opt" data-v="hard" type="button"><b>高難度</b><small>三個條件</small></button></div>
   <div class="ph8row2"><button class="btn2 ph8alb" id="ph8alb" type="button"><span class="ph8ai">${ICS.album}</span>相簿 <small id="ph8an"></small></button><button class="btn ph8go" id="ph8go" type="button">出發！</button></div>
   <p class="ph8zoo" id="ph8zoo"></p></div></div></div>`;
 const st=$('#ph8st'),wEl=$('#ph8w'),vf=$('#ph8vf'),tip=$('#ph8tip'),qt=$('#ph8qt'),strip=$('#ph8strip'),shut=$('#ph8shut'),map=$('#ph8map');
 const later=(f,ms)=>setTimeout(()=>{if(live())f()},ms);
 let k=1,pan=0,vfx=0,vfy=0,tipT=0;
 const showTip=(t,ms=3200)=>{tip.textContent=t;tip.classList.add('on');clearTimeout(tipT);tipT=setTimeout(()=>tip.classList.remove('on'),ms)};
 const back=()=>{pTok++;G=null;hush();go('park')};$('#pback').onclick=back;
 const sel=()=>$$('#ph8diffs .ph8opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===VS.diff));sel();
 $$('#ph8diffs .ph8opt').forEach(b=>b.onclick=()=>{VS.diff=b.dataset.v;sel();sfx('pop');hush();sayR([T['d_'+VS.diff]])});
 const menuInfo=()=>{const n=albumGet().length;$('#ph8an').textContent=n?`${n} 張`:'';$('#ph8zoo').textContent=`我的動物園：${nGot()}／${Z.LIST.length} 種動物`};menuInfo();
 $('#ph8go').onclick=()=>{sfx('pop');hush();$('#ph8menu').style.display='none';start()};
 $('#ph8alb').onclick=()=>{sfx('pop');hush();albumView()};
 sayR([T.v_menu]);
 /* --- 場景大小、平移 --- */
 const maxPan=()=>Math.max(0,Z.W*k-st.clientWidth);
 const setPan=(p,smooth)=>{pan=Math.max(0,Math.min(maxPan(),p));wEl.style.transition=smooth&&!calm?'transform .45s ease':'none';wEl.style.transform=`translateX(${(-pan).toFixed(1)}px)`;drawMap()};
 const vfW=()=>FW*k,vfH=()=>FH*k;
 const setVF=(x,y)=>{vfx=Math.max(0,Math.min(st.clientWidth-vfW(),x));vfy=Math.max(0,Math.min(st.clientHeight-vfH(),y));vf.style.left=vfx.toFixed(1)+'px';vf.style.top=vfy.toFixed(1)+'px'};
 function fit(){if(!G)return;const cxW=(pan+st.clientWidth/2)/k;const fxW=(vfx+pan)/k,fyW=vfy/k+VY0;
  k=st.clientHeight/VH;const wpx=Z.W*k;wEl.style.width=wpx.toFixed(1)+'px';wEl.style.height=st.clientHeight+'px';
  const s=wEl.querySelector('svg');if(s){s.setAttribute('width',wpx.toFixed(1));s.setAttribute('height',st.clientHeight)}
  vf.style.width=vfW().toFixed(1)+'px';vf.style.height=vfH().toFixed(1)+'px';
  setPan(cxW*k-st.clientWidth/2);setVF(fxW*k-pan,(fyW-VY0)*k)}
 function render(){wEl.innerHTML=`<svg viewBox="0 ${VY0} ${Z.W} ${VH}" preserveAspectRatio="xMinYMin meet">${sceneInner(G.M)}</svg>`;k=st.clientHeight/VH;
  const wpx=Z.W*k;wEl.style.width=wpx.toFixed(1)+'px';const s=wEl.querySelector('svg');s.setAttribute('width',wpx.toFixed(1));s.setAttribute('height',st.clientHeight);
  vf.style.width=vfW().toFixed(1)+'px';vf.style.height=vfH().toFixed(1)+'px'}
 const frameW=()=>({x:(vfx+pan)/k,y:vfy/k+VY0,w:FW,h:FH});
 function drawMap(){if(!G)return;const W=st.clientWidth;const vw=st.clientWidth/(Z.W*k);map.innerHTML=`<div class="ph8mz">${Z.ZONES.map(z=>`<i class="z-${z.id}" style="flex:${z.x1-z.x0}"></i>`).join('')}</div><b style="left:${(pan/(Z.W*k)*100).toFixed(2)}%;width:${(vw*100).toFixed(2)}%"></b>`}
 /* --- 拖動：相機框、背景平移、點一下 --- */
 let drag=null,raf=0;
 const edgePan=()=>{cancelAnimationFrame(raf);if(!drag||drag.kind!=='vf')return;const W=st.clientWidth;let d=0;if(vfx<=4&&drag.dx<0)d=-1;else if(vfx>=W-vfW()-4&&drag.dx>0)d=1;
  if(d){const p0=pan;setPan(pan+d*Math.max(6,W*.012));if(pan!==p0){}}raf=requestAnimationFrame(edgePan)};
 st.addEventListener('pointerdown',e=>{if(!G||G.busy&&G.busy!=='wait'||e.button>0)return;if(e.target.closest('button,.ph8q'))return;
  const r=st.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;
  if(e.target.closest('#ph8vf')){drag={kind:'vf',id:e.pointerId,ox:x-vfx,oy:y-vfy,x0:x,y0:y,dx:0,moved:0};vf.classList.add('drag');try{st.setPointerCapture(e.pointerId)}catch(_){}raf=requestAnimationFrame(edgePan)}
  else{drag={kind:'bg',id:e.pointerId,p0:pan,x0:x,y0:y,moved:0,hot:e.target.closest('[data-hot]')};try{st.setPointerCapture(e.pointerId)}catch(_){}}
  e.preventDefault()});
 st.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const r=st.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;
  if(Math.hypot(x-drag.x0,y-drag.y0)>8)drag.moved=1;
  if(drag.kind==='vf'){drag.dx=x-(drag.lx==null?x:drag.lx);drag.lx=x;setVF(x-drag.ox,y-drag.oy)}
  else if(drag.moved){setPan(drag.p0-(x-drag.x0))}});
 const endDrag=e=>{if(!drag||(e&&e.pointerId!==drag.id))return;const d=drag;drag=null;cancelAnimationFrame(raf);vf.classList.remove('drag');
  if(d.kind==='bg'&&!d.moved&&e){const r=st.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;
   if(d.hot){hot(d.hot.dataset.hot);return}
   const wx=(x+pan)/k,wy=y/k+VY0;const H=Z.HOT.find(h=>h.r?Math.hypot(wx-h.x,wy-h.y)<h.r:(wx>=h.x0&&wx<=h.x1&&wy>=h.y0&&wy<=h.y1));if(H){hot(H.k);return}
   // 點一下：相機框移過去（慢慢滑過去）
   vf.classList.add('glide');setVF(x-vfW()/2,y-vfH()/2);later(()=>vf.classList.remove('glide'),360)}};
 st.addEventListener('pointerup',endDrag);st.addEventListener('pointercancel',endDrag);
 function hot(kk){sfx('pop');hush();const t=kk==='keeper'?T.v_keeper:kk==='flash'?T.v_flash:kk==='feed'?T.v_feed:kk==='glass'?T.v_glass:'';if(!t)return;showTip(t);sayR([t]);
  if(kk==='glass'){const g=wEl.querySelector('.z8glass');if(g){g.classList.remove('wob');void g.getBBox();g.classList.add('wob')}}}
 $('#ph8l').onclick=()=>{sfx('pop');setPan(pan-st.clientWidth*.6,1)};$('#ph8r').onclick=()=>{sfx('pop');setPan(pan+st.clientWidth*.6,1)};
 map.addEventListener('click',e=>{const r=map.getBoundingClientRect();const f=(e.clientX-r.left)/r.width;setPan(f*Z.W*k-st.clientWidth/2,1)});
 $('#ph8fl').onclick=()=>hot('flash');
 $('#ph8rep').onclick=()=>{if(G&&G.q){hush();sayR([G.q.t])}};
 shut.onclick=()=>snap();
 addEventListener('resize',onRs);function onRs(){if(!live()){removeEventListener('resize',onRs);return}clearTimeout(onRs.t);onRs.t=setTimeout(fit,120)}
 /* --- 一輪 --- */
 function start(){const lv=DN[VS.diff]||'e';const R=makeRound(lv);if(!R){showTip('…');return}
  G={lv,qs:R.qs,M:R.M,i:-1,miss:0,busy:false,shots:[],newK:[]};render();
  strip.innerHTML=G.qs.map(()=>'<i class="ph8slot"></i>').join('');
  vf.hidden=false;$('#ph8q').hidden=false;shut.disabled=false;
  setPan(0);setVF(st.clientWidth/2-vfW()/2,st.clientHeight*.52-vfH()/2);
  const first=!V2.z8hi;V2.z8hi=1;sv2();
  next(first)}
 function next(intro){G.i++;G.miss=0;G.busy=false;wEl.querySelectorAll('.z8a.glow').forEach(x=>x.classList.remove('glow'));
  if(G.i>=G.qs.length){finish();return}
  G.q=G.qs[G.i];qt.textContent=G.q.t;$('#ph8q').classList.remove('in');void $('#ph8q').offsetWidth;$('#ph8q').classList.add('in');
  [...strip.children].forEach((c,j)=>c.classList.toggle('now',j===G.i));
  hush();sayR(intro?[T.v_hi,T.v_how,G.q.t]:[G.q.t])}
 async function snap(){if(!G||G.busy||!G.q)return;G.busy=true;hush();
  tone(1800,0,.03,'square',.05);tone(900,.06,.05,'square',.05);
  vf.classList.remove('snap');void vf.offsetWidth;vf.classList.add('snap');
  const fr=frameW();const r=judge(G.M,G.q,fr);
  await new Promise(res=>setTimeout(res,calm?60:260));if(!live())return;
  if(r.ok)return good(fr,r);
  if(r.why==='keeper'){showTip(T.v_keepsnap);await sayR([T.v_keepsnap]);if(live())G.busy=false;return}
  G.miss++;sfx('wrong');
  const t=r.why==='sp'?T['w_'+r.k]:r.why==='none'?T.v_none:r.why==='pos'?T.v_pos:r.why==='st'?T.v_st:T.v_n;
  showTip(t,4200);const parts=[t];
  if(G.miss>=2){glow();parts.push(T.v_glow);const gi=G.i;later(()=>{if(G&&G.i===gi&&!G.busy)showTip(T.v_glow,4200)},2200)}
  else if(r.why!=='sp'&&r.why!=='none')parts.push(G.q.t);
  G.busy=false;sayR(parts)}
 function glow(){const tg=G.M.filter(m=>m.slot===G.q._slot);tg.forEach(m=>{const g=wEl.querySelector(`.z8a[data-i="${m.i}"]`);if(g)g.classList.add('glow')});
  // 鏡頭平移到要拍的動物（只平移）
  const cx=tg.reduce((a,m)=>a+m.cx,0)/tg.length;const vis=cx*k>pan+40&&cx*k<pan+st.clientWidth-40;if(!vis)setPan(cx*k-st.clientWidth/2,1)}
 async function good(fr,r){const q=G.q,kk=q.sp;sfx('right');tone(660,0,.12,'triangle',.07);tone(990,.1,.16,'triangle',.07);
  wEl.querySelectorAll('.z8a.glow').forEach(x=>x.classList.remove('glow'));
  let url='';try{url=await photo(fr)}catch(e){console.log('photo8 snap',e)}if(!live())return;
  const isNew=!got()[kk];got()[kk]=(got()[kk]||0)+1;V2.z8n=(V2.z8n||0)+1;sv2();
  if(url)albumAdd({t:Date.now(),k:kk,q:q.id,d:url});
  G.shots.push({k:kk,d:url,q:q.id});if(isNew)G.newK.push(kk);
  // 照片在取景框裡「洗出來」（淡入），再淡出、放進下面的底片格
  const dev=vf.querySelector('.ph8dev');dev.style.backgroundImage=url?`url("${url}")`:'';vf.classList.add('dev');
  const slot=strip.children[G.i];if(slot){slot.innerHTML=url?`<img src="${url}" alt="">`:Z.svg(kk,'stand');slot.classList.add('on')}
  try{burstEl(slot||vf,14)}catch(e){}
  const L=LI(kk);showTip(`${T.v_got} ${L.zh}　${L.en}`,3600);
  await sayR([pickOne([T.v_got,T.v_got2]),...nameParts(kk),...(isNew?[T.v_new]:[])]);if(!live())return;
  await new Promise(res=>setTimeout(res,calm?200:700));if(!live())return;
  vf.classList.remove('dev');next(false)}
 // 把取景框裡的畫面畫成小照片（canvas → JPEG，約 6～12KB）
 function photo(fr){return new Promise((res,rej)=>{const W2=240,H2=200;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="${fr.x.toFixed(1)} ${fr.y.toFixed(1)} ${fr.w} ${fr.h}" preserveAspectRatio="xMidYMid slice">${sceneInner(G.M,1)}</svg>`;
  const u=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const img=new Image();
  img.onload=()=>{try{const c=document.createElement('canvas');c.width=W2;c.height=H2;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W2,H2);x.drawImage(img,0,0,W2,H2);URL.revokeObjectURL(u);res(c.toDataURL('image/jpeg',.66))}catch(e){URL.revokeObjectURL(u);rej(e)}};
  img.onerror=e=>{URL.revokeObjectURL(u);rej(e)};img.src=u})}
 async function finish(){G.busy=true;shut.disabled=true;const n=gems('photo8Day');try{if(!calm)confetti()}catch(e){}
  $('#ph8q').hidden=true;vf.hidden=true;
  const ov=overlay(screen,`<div class="card ph8end" role="dialog" aria-label="相簿"><div class="ph8book"><h2>我的相簿</h2><div class="ph8pics">${G.shots.map((s,j)=>{const L=LI(s.k);return `<button class="ph8pol" type="button" data-k="${s.k}" style="--dl:${(j*.12).toFixed(2)}s;--rt:${[-4,3,-2,4,-3][j%5]}deg">${s.d?`<img src="${s.d}" alt="">`:Z.svg(s.k,'stand')}<b>${L.zh}</b><small>${L.en}</small>${G.newK.includes(s.k)?'<i class="ph8newb">新朋友</i>':''}</button>`}).join('')}</div>
   <p class="ph8gem">${typeof gem==='function'?gem('#7FD8FF'):''}<span>＋${n}</span>　我的動物園 ${nGot()}／${Z.LIST.length}</p></div>
   <div class="row"><button class="btn2" id="ph8home" type="button">回遊樂園</button><button class="btn2" id="ph8all" type="button">看全部照片</button><button class="btn" id="ph8again" type="button">再玩一次</button></div></div>`);
  ov.classList.add('ph8ov');
  $$('.ph8pol',ov).forEach(b=>b.onclick=()=>{sfx('pop');sayR(nameParts(b.dataset.k))});
  $('#ph8home',ov).onclick=()=>{ov.remove();back()};
  $('#ph8all',ov).onclick=()=>{sfx('pop');albumView()};
  $('#ph8again',ov).onclick=()=>{sfx('pop');hush();ov.remove();$('#ph8menu').style.display='';$('#ph8go').textContent='再玩一次';menuInfo();G=null;wEl.innerHTML='';strip.innerHTML='';map.innerHTML=''};
  await sayR([T.v_done,T.v_great,n>=3?T.gem3:T.gem1])}
 // 全部照片（存在這台裝置，最新的在前面）
 function albumView(){const a=albumGet().slice().reverse();
  const ov=overlay(screen,`<div class="card ph8all" role="dialog" aria-label="全部照片"><button class="xclose" type="button" aria-label="關閉">✕</button><h2>全部照片 <small>${a.length}／${MAXP}</small></h2>
   ${a.length?`<div class="ph8grid">${a.map((p,j)=>{const L=LI(p.k);return `<button class="ph8th" type="button" data-j="${j}"><img src="${p.d}" alt="${L.zh}" loading="lazy"><b>${L.zh}</b></button>`}).join('')}</div>`:`<p class="ph8empty">還沒有照片，去動物園拍拍看！</p>`}
   <p class="ph8note">照片只存在這台裝置，最多 ${MAXP} 張，新的照片會把最舊的換掉。</p></div>`);
  ov.classList.add('ph8ov');const close=()=>{hush();ov.remove();menuInfo()};$('.xclose',ov).onclick=close;ov.addEventListener('click',e=>{if(e.target===ov)close()});
  $$('.ph8th',ov).forEach(b=>b.onclick=()=>{const p=a[+b.dataset.j];if(!p)return;sfx('pop');const L=LI(p.k);
   const o2=overlay(screen,`<div class="card ph8big" role="dialog" aria-label="${L.zh}"><img src="${p.d}" alt=""><h2>${L.zh}</h2><p class="ph8en">${L.en}</p><div class="row"><button class="btn" type="button">好</button></div></div>`);
   o2.classList.add('ph8ov');$('button',o2).onclick=()=>{hush();o2.remove()};o2.addEventListener('click',e=>{if(e.target===o2){hush();o2.remove()}});sayR(nameParts(p.k))});
  if(a.length)sayR([T.v_album])}
 // 測試用
 if(window.__ev)window.__p8={G:()=>G,frame:frameW,setVF,setPan,k:()=>k,pan:()=>pan,snap,solve,judge,aim:(fr)=>{setPan(fr.x*k-(st.clientWidth-FW*k)/2);setVF(fr.x*k-pan,(fr.y-VY0)*k)},fit};
};

/* ---------- 收集冊：加一頁「我的動物園」（照 book19 的分頁接口） ---------- */
const BKIC=`<svg viewBox="3 2 58 58" aria-hidden="true" class="z7i"><ellipse cx="32" cy="58" rx="24" ry="2.6" fill="#3A2A7A" opacity=".16"/><path d="M8 26 L32 10 L56 26Z" fill="#E8603A" stroke="#A8402A" stroke-width="1.2" stroke-linejoin="round"/><rect x="10" y="26" width="44" height="28" rx="3" fill="#FFF3DC" stroke="#C89A62" stroke-width="1.2"/><g transform="translate(15 26) scale(.34)">${Z.draw('giraffe','stand')}</g><g transform="translate(30 34) scale(.24)">${Z.draw('panda','stand')}</g></svg>`;
function bookItems(){const g=got();const st=gate();
 return Z.LIST.map(L=>({k:'z8_'+L.k,got:!!g[L.k],name:L.zh,en:L.en,pic:Z.svg(L.k,'stand'),big:()=>Z.svg(L.k,g[L.k]?'play':'stand'),voice:nameParts(L.k),hint:st==='ch'?['ch',44]:['z8'],lockV:st==='ch'?'':T.b_lock}))}
function addBook(){try{if(!window.__book19||typeof __book19.add!=='function')return false;__book19.add({id:'zoo8',n:'我的動物園',t:'動物園',ic:()=>BKIC,line:T.b_line,groups:()=>[{title:'我的動物園',items:bookItems()}]});return true}catch(e){console.log('photo8 book',e);return false}}
if(!addBook()){let n=0;const iv=setInterval(()=>{if(addBook()||++n>40)clearInterval(iv)},250)}

const css=document.createElement('style');css.id='ph8css';css.textContent=`
.ph8{position:relative;display:flex;flex-direction:column;height:100%;gap:6px;box-sizing:border-box;min-height:0}
.ph8stage{position:relative;flex:1;min-height:240px;border-radius:22px;overflow:hidden;margin:0 6px;box-shadow:0 4px 0 rgba(40,30,80,.18);background:#BDE6FF;touch-action:none;user-select:none;-webkit-user-select:none}
.ph8world{position:absolute;left:0;top:0;height:100%;will-change:transform}
.ph8world svg{display:block}
.z8a .z8halo{opacity:0}.z8a.glow .z8halo{animation:z8glow 1s ease-in-out infinite alternate}
@keyframes z8glow{from{opacity:.35}to{opacity:1}}
.z8zz{animation:z8zz 2.6s ease-in-out infinite}@keyframes z8zz{0%{opacity:0;transform:translateY(4px)}30%{opacity:1}100%{opacity:0;transform:translateY(-8px)}}
.z8glass.wob{animation:z8wob .5s ease}@keyframes z8wob{30%{transform:translateX(3px)}60%{transform:translateX(-3px)}}
.ph8q{position:absolute;left:0;right:0;margin:0 auto;width:fit-content;top:8px;display:flex;align-items:center;gap:6px;max-width:min(calc(100% - 16px),640px);box-sizing:border-box;padding:4px 6px 4px 4px;border-radius:20px;background:rgba(255,255,255,.95);color:#3A2A5A;z-index:4;box-shadow:0 3px 10px rgba(40,30,80,.18)}
.ph8q.in{animation:ph8qin .4s ease}@keyframes ph8qin{from{opacity:0;transform:translateY(-10px)}}
.ph8kp{flex:none;width:44px;height:36px;border-radius:14px;background:#E6F6DC;overflow:hidden}.ph8kp svg{width:100%;height:100%;display:block}
.ph8q p{margin:0;font-size:clamp(16px,3.8vmin,22px);line-height:1.3}
.ph8rep{flex:none;width:40px;height:40px;border-radius:50%;border:0;background:#7A5CE0;color:#fff;display:grid;place-items:center;cursor:pointer}.ph8rep svg{width:22px;height:22px}
.ph8vf{position:absolute;z-index:3;cursor:grab;touch-action:none;border-radius:12px;box-shadow:0 0 0 2px rgba(255,255,255,.55),0 0 0 9999px rgba(20,16,50,.16)}
.ph8vf.drag{cursor:grabbing}.ph8vf.glide{transition:left .3s ease,top .3s ease}
.ph8vf i{position:absolute;width:26%;height:26%;border:5px solid #FFFFFF;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35));transition:transform .12s ease}
.ph8vf .c1{left:-3px;top:-3px;border-right:0;border-bottom:0;border-radius:12px 0 0 0}.ph8vf .c2{right:-3px;top:-3px;border-left:0;border-bottom:0;border-radius:0 12px 0 0}
.ph8vf .c3{left:-3px;bottom:-3px;border-right:0;border-top:0;border-radius:0 0 0 12px}.ph8vf .c4{right:-3px;bottom:-3px;border-left:0;border-top:0;border-radius:0 0 12px 0}
.ph8vf .ph8x{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px 0 0 -11px;background:linear-gradient(#fff,#fff) center/2px 100% no-repeat,linear-gradient(#fff,#fff) center/100% 2px no-repeat;opacity:.8}
.ph8vf .ph8dark{position:absolute;inset:0;border-radius:12px;background:#140F2E;opacity:0;pointer-events:none}
.ph8vf.snap .ph8dark{animation:ph8snap .26s ease}@keyframes ph8snap{40%{opacity:.75}}
.ph8vf.snap .c1{animation:ph8c1 .26s ease}.ph8vf.snap .c2{animation:ph8c2 .26s ease}.ph8vf.snap .c3{animation:ph8c3 .26s ease}.ph8vf.snap .c4{animation:ph8c4 .26s ease}
@keyframes ph8c1{40%{transform:translate(8px,8px)}}@keyframes ph8c2{40%{transform:translate(-8px,8px)}}@keyframes ph8c3{40%{transform:translate(8px,-8px)}}@keyframes ph8c4{40%{transform:translate(-8px,-8px)}}
.ph8vf .ph8dev{position:absolute;inset:6px;border-radius:6px;background:#fff center/cover no-repeat;border:4px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.3);opacity:0;transition:opacity .5s ease;pointer-events:none}
.ph8vf.dev .ph8dev{opacity:1}
.ph8arr{position:absolute;top:50%;margin-top:-28px;width:44px;height:56px;border:0;border-radius:16px;background:rgba(255,255,255,.82);color:#5A3E9A;display:grid;place-items:center;z-index:4;cursor:pointer;box-shadow:0 3px 0 rgba(40,30,80,.2)}
.ph8arr svg{width:26px;height:26px}.ph8arr.l{left:6px}.ph8arr.r{right:6px}
.ph8tip{position:absolute;left:0;right:0;margin:0 auto;width:fit-content;bottom:34px;transform:translateY(10px);max-width:calc(100% - 24px);box-sizing:border-box;padding:8px 16px;border-radius:18px;background:#FFFDF4;color:#3A2A5A;font-size:clamp(16px,3.6vmin,21px);text-align:center;z-index:5;opacity:0;transition:opacity .3s,transform .3s;pointer-events:none;box-shadow:0 4px 0 rgba(40,30,80,.2)}
.ph8tip.on{opacity:1;transform:none}
.ph8map{position:absolute;left:56px;right:56px;bottom:6px;height:16px;border-radius:8px;overflow:hidden;z-index:4;cursor:pointer;box-shadow:0 0 0 2px rgba(255,255,255,.8)}
.ph8mz{display:flex;height:100%}.ph8mz i{display:block;height:100%}
.ph8mz .z-monkey{background:#9AD08A}.ph8mz .z-savanna,.ph8mz .z-rocks{background:#EED68A}.ph8mz .z-pond{background:#7FC8F0}.ph8mz .z-bamboo{background:#7FC050}.ph8mz .z-aussie{background:#E8B888}.ph8mz .z-forest{background:#5EA85A}.ph8mz .z-polar,.ph8mz .z-peng{background:#EAF4FF}
.ph8map b{position:absolute;top:0;bottom:0;border:3px solid #7A5CE0;border-radius:8px;box-sizing:border-box;background:rgba(255,255,255,.25)}
.ph8bar{display:flex;align-items:center;gap:8px;padding:0 8px 6px;flex:none}
.ph8strip{flex:1;display:flex;gap:6px;min-width:0;justify-content:center}
.ph8slot{flex:0 1 66px;aspect-ratio:6/5;border-radius:8px;border:3px dashed rgba(255,255,255,.55);background:rgba(255,255,255,.12);display:grid;place-items:center;overflow:hidden;box-sizing:border-box}
.ph8slot.now{border-color:#FFE27A;box-shadow:0 0 12px rgba(255,226,122,.6)}
.ph8slot.on{border:3px solid #fff;background:#fff;animation:ph8on .5s ease}.ph8slot img,.ph8slot svg{width:100%;height:100%;object-fit:cover;display:block}
@keyframes ph8on{from{opacity:0;transform:translateY(-12px)}}
.ph8flash{flex:none;width:46px;height:46px;border-radius:50%;border:2px solid rgba(255,255,255,.7);background:rgba(255,255,255,.9);display:grid;place-items:center;cursor:pointer;padding:0}.ph8flash svg{width:34px;height:34px}
.ph8shut{flex:none;width:74px;height:74px;border-radius:50%;border:5px solid #fff;background:radial-gradient(circle at 40% 35%,#FF8FB8,#E8508F);display:grid;place-items:center;cursor:pointer;box-shadow:0 5px 0 #A8306A,0 8px 16px rgba(0,0,0,.25);padding:0}
.ph8shut svg{width:46px;height:46px}.ph8shut:active{transform:translateY(3px);box-shadow:0 2px 0 #A8306A}.ph8shut:disabled{opacity:.45}
.ph8menu{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,16,60,.55);z-index:6;padding:12px;box-sizing:border-box}
.ph8mc{background:#fff;color:#3A2A55;border-radius:22px;padding:14px 16px;max-width:540px;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}
.ph8mh{display:flex;gap:10px;align-items:center}.ph8mi{width:64px;height:64px;flex:none}.ph8mi svg{width:100%;height:100%}
.ph8mh b{font-size:22px;display:block}.ph8mh small{font-size:15px}
.ph8lab{margin:10px 0 4px;font-weight:700}.ph8row{display:flex;gap:8px}
.ph8opt{flex:1;min-height:60px;border:3px solid #EEE6F8;border-radius:16px;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;color:#3A2A55;font:inherit;cursor:pointer}
.ph8opt b{font-size:18px}.ph8opt small{font-size:12.5px}.ph8opt.sel{border-color:#7A5CE0;background:#F0EAFF}
.ph8row2{display:flex;gap:10px;justify-content:center;align-items:center;margin-top:12px;flex-wrap:wrap}
.ph8alb{display:inline-flex;align-items:center;gap:4px;min-height:52px}.ph8ai{width:30px;height:30px;display:inline-block}.ph8ai svg{width:100%;height:100%}.ph8alb small{color:#8A6AB8}
.ph8go{min-width:9em;min-height:56px}
.ph8zoo{margin:10px 0 0;text-align:center;color:#7A5A9A;font-size:15px}
.ph8ov .card.ph8end{width:min(900px,96vw);max-width:96vw;padding:12px;max-height:92vh;overflow:auto;text-align:center;background:linear-gradient(180deg,#FFFDF6,#FFF0D6);color:#3D2C5E}
.ph8book{border-radius:16px;padding:10px;background:linear-gradient(160deg,#7C5CD6,#4A3290);}
.ph8book h2{margin:0 0 8px;color:#FFF3D6}
.ph8pics{display:flex;flex-wrap:wrap;gap:clamp(8px,1.6vw,14px);justify-content:center;padding:6px 4px 10px}
.ph8pol{position:relative;width:clamp(96px,15.5vw,150px);padding:7px 7px 6px;border:0;border-radius:4px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.3);display:flex;flex-direction:column;align-items:center;gap:1px;font:inherit;color:#3D2C5E;cursor:pointer;transform:rotate(var(--rt));animation:ph8pin .5s ease backwards var(--dl)}
@keyframes ph8pin{from{opacity:0;translate:0 24px}}
.ph8pol img,.ph8pol svg{width:100%;aspect-ratio:6/5;object-fit:cover;display:block;background:#EEF6FF}
.ph8pol b{font-size:16px;font-weight:400;margin-top:3px}.ph8pol small{font-family:'Baloo 2',sans-serif;color:#8A6AB8;font-size:14px;line-height:1}
.ph8newb{position:absolute;top:-8px;right:-8px;font-style:normal;background:#FFD84D;color:#6A3A0A;border-radius:999px;padding:1px 8px;font-size:12px;box-shadow:0 2px 0 #C8962A}
.ph8gem{display:flex;align-items:center;justify-content:center;gap:6px;color:#FFF3D6;margin:0;font-size:16px}.ph8gem svg{width:26px;height:26px}
.ph8end .row{display:flex;gap:10px;justify-content:center;margin-top:10px;flex-wrap:wrap}
.ph8ov .card.ph8all{width:min(760px,94vw);max-height:90vh;overflow:auto;position:relative;background:#FFFDF6;color:#3D2C5E}
.ph8all h2 small{font-size:.6em;color:#8A6AB8;font-family:'Baloo 2',sans-serif}
.ph8grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px}
.ph8th{border:0;padding:5px 5px 3px;background:#fff;border-radius:6px;box-shadow:0 3px 8px rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;font:inherit;color:#3D2C5E;cursor:pointer}
.ph8th img{width:100%;aspect-ratio:6/5;object-fit:cover;display:block;border-radius:3px}.ph8th b{font-weight:400;font-size:14px}
.ph8empty{text-align:center;color:#8A6A4A;margin:30px 0}.ph8note{font-size:13px;color:#8A7A9A;margin:12px 0 0;text-align:center}
.ph8ov .card.ph8big{width:min(420px,92vw);text-align:center;background:#FFFDF6;color:#3D2C5E}.ph8big img{width:100%;border-radius:8px;border:6px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.25);box-sizing:border-box}
.ph8big h2{margin:6px 0 0}.ph8en{margin:0;font-family:'Baloo 2',sans-serif;font-size:20px;color:#8A6AB8}.ph8big .row{display:flex;justify-content:center;margin-top:8px}
@media (max-height:520px){.ph8shut{width:58px;height:58px}.ph8shut svg{width:36px;height:36px}.ph8slot{flex-basis:52px}.ph8q p{font-size:15px}.ph8kp{width:36px;height:30px}.ph8rep{width:34px;height:34px}.ph8stage{min-height:200px}}
@media (max-width:480px){.ph8arr{width:36px;height:48px;margin-top:-24px}.ph8map{left:46px;right:46px}.ph8flash{width:40px;height:40px}.ph8shut{width:64px;height:64px}.ph8slot{flex-basis:50px}}
.ph8.calm .ph8world,.ph8.calm .ph8vf{transition:none!important}
@media (prefers-reduced-motion:reduce){.z8zz,.z8a.glow .z8halo,.ph8pol,.ph8slot.on,.ph8q.in{animation:none!important}.z8a.glow .z8halo{opacity:.9}}
`;document.head.appendChild(css);
window.__PH8={T,QS,gate,albumGet,photoSweep,photoKeyOf,ver:'2026-11-22'};
}catch(e){window.__PH8err=String(e&&e.stack||e);console.log('photo8',e)}}).toString()+')()')};
if(window.ZOO8)run();else window.__ZOO8ready=(window.__ZOO8ready||[]).concat(run);
})();

/* ================= 2.2 第 41～45 章：每一關換一題動手玩（m9zg_hands22.js）—— 2026-11-27 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 為什麼：第 41～45 章 72% 是「聽一句、點三張卡」，動手玩的題型 0%（第 6～10 章 22%），女兒覺得破關無聊。
 * 做什麼：第 1～9 關每關把一題三選一換成一題動手玩（第 10 關不動），內容只用到那一章為止教過的：注音 ㄙㄧㄨㄩ（和前幾季的聲母）、
 *   英文 W～Z、小寫 a～d、五個五個數、到 100、第幾個、時鐘、這一章的場景。安全知識（quiz）和寫字（write、R）一題都不少：
 *   第 41～44 章第 9 關原本是「安全題＋寫字＋寫字」，沒有別的三選一可以換，所以把第 9 關的第二個寫字（同一個字的第 3 步）
 *   移到第 7 關（第 7 關原本有兩題三選一，其中聽注音那題拿掉，它的內容改在第 9 關的動手玩練）。每關題數不變，2.1 的加題規則不動。
 * 題型代號：<原本的題型>:h22:<內容>，接在原本題型的名字後面（錯題本、學習報告、寵物幫忙照原本的分類）：
 *   catch 接星星（聽音接注音／照順序接數字）　memory 翻牌配對　sort 送進對的籃子（拖拉或點籃子）　seq 排順序（點一點排好；排隊第幾個）
 *   puzzle 拼圖（場景圖交換拼片；百數表把數字送回空格）　maze 走格子（照順序踩石頭；動物園、美術館地圖帶路）　clock 撥時鐘　measure 疊積木量身高
 * 規則：沒有輸、不扣分、不倒數（接星星一直掉，接到為止）；做錯 wrong() 搖一搖＋提示，第二次錯發光。角色、寵物只移動，不放大縮小。
 *   2026-11-28：點到別的星星不算進過關星星；其他題型每一題最多算 1 次錯（mkMiss），錯題本照舊記。
 *   拖拉的都可以改用「點一下、再點目的地」。寵物幫忙（pet19）只在三選一出現，這裡 S.ans=null；測試用 S.__auto 自動作答。
 * 語音：盡量用已錄好的句子（接星星、翻牌、分籃子、帶路、積木、百數表、時鐘提示……）；注音念法 z1／z2、字母 e1、數字 n|。
 *   新句子照常 say()，沒錄音時只出字幕（m9z_notts），全部列在 lines/v22_hands.tsv（H22_）。 */
(function(){if(typeof window.__ev!=='function'){console.log('hands22: 找不到 __ev');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined'||typeof CHAPTERS==='undefined')return;
/* ---------- 共用 ---------- */
const byD=(e,m,h)=>S.diff==='easy'?e:S.diff==='hard'?h:m;
const RM=()=>{try{return !!reduced||!!S.lite}catch(e){return false}};
const LN={C5:'數字星星掉下來了！五個五個數，照順序接住。',C10:'數字星星掉下來了！十個十個數，照順序接住。',C10H:'十、二十、三十……十個十個數！',CQ:'叫號燈的號碼星星掉下來了！照號碼的順序接住。',CQH:'叫完這一號，下一號就多一！',
 M5:'翻開兩張牌，把數字和手掌配成一對！一隻手有五根手指，五個五個數。',MK:'翻開兩張牌，把時鐘和幾點配成一對！',MZ:'翻開兩張牌，把注音和圖片配成一對！圖片的名字，開頭就是這個注音。',
 QORD:'大家來排隊借書！聽聽看要排第幾個，就點那個位置。',QBOOK:'書背上的號碼，從小排到大！先點最小的號碼。',QTIX:'幫大家照號碼排好隊！號碼牌從小排到大，先點最小的號碼。',QH:'幫好朋友排隊，從矮排到高！先點最矮的。',
 QA:'小導遊帶路！照字母的順序，一個一個點，去看動物。',QP:'幫忙掛畫！照畫上的號碼從小排到大，先點最小的號碼。',P:'點兩塊拼圖，交換位置，把圖拼好！照數字排一排，就拼好了。',P0:'點兩塊拼圖，交換位置，把圖拼好！',PDONE:'拼好了！',
 PH:'百數表上有幾格空空的，把數字送回去！先點數字，再點空格。',Z5:'點旁邊的站，一站一站走到終點！',ZL:'照字母的順序，一格一格走過去！',ZA:'只踩這個小寫字母的石頭，一格一格走過去：',ZT:'點旁邊發光的格子，就會走過去。',
 D1:'來撥時鐘！',DH:'短短的針，要指著這個數字：',Z5a:'看路線圖！',D2:'點時鐘上的數字，短針就會轉過去。撥好了，按「好了」！',D3:'長針指著十二是整點，指著六是半點。點下面的按鈕，換長針。',K1:'幫好朋友量身高！',K2:'把積木疊到跟頭頂一樣高，再按「好了」！'};
// 已經有錄音的句子（前幾季、第七季用過）
const OLD={catchI:'天上掉下好多星星！仔細聽，只接住這個的星星：',catchOK:'全部接到了！這是',catchAll:'全部接到了！',againC:'再聽一次：',again:'再聽一次喔！',glowStar:'會發光的星星就對了！',memPair:'我偷偷告訴你，發光的兩張是一對！',memDone:'全部找到了！記憶力好好喔！',
 sortI:'幫忙把東西放進對的籃子。',sortDone:'全部都放好了！',side:'要走旁邊的格子喔',step:'一格一格走，邊走邊數！',five:'五、十、十五……跟著我五個五個數！',together:'我陪你一起數！',glow:'我幫你，看發光的那一個！',findPre:'要先找',findPost:'喔！',
 swap:'把發光的兩塊交換看看！',caseI:'大寫和小寫是好朋友，幫它們配成一對吧！',caseOK:'大寫和小寫，是好朋友！',floorI:'把小寫字母，送回它住的那一層！',blkH:'把積木疊到跟頭頂一樣高，再數一數！',blkH2:'從最下面開始，一個一個往上數！',
 hun1:'一排有十格，往下一排，就多十！',hun2:'先看十位，找到那一排，再一格一格找！',ordH:'從櫃台這邊開始，一個一個數：第一、第二、第三……',found:'找到了！',dirs:{'右':'往右','左':'往左','上':'往上','下':'往下'}};
const LOG=p=>{try{if(window.__s7log)p.forEach(x=>{if(typeof x==='string'&&x.trim())__s7log.push(x)})}catch(e){}return p};
const clean=p=>p.filter(x=>x!=null&&x!=='');
const SAY=p=>{try{return say(LOG(clean(p)))}catch(e){return Promise.resolve()}};
// 題目文字：照標點和空白切成小片語，每片不從中間斷行（手機直放不會斷成「車／廂」）；CSS 在 m9zm_icons22.js
// 只有一個字（「照」「幫」）接在關鍵詞前面的，跟關鍵詞黏在一起，才不會一個字孤單一行
const glue1=h=>String(h).replace(/(^|[：，、？！。\s])([^\s<>：，、？！。])(\s?)(<b\b[^>]*>[^<]*<\/b>)/g,(m,a,c,sp,b)=>`${a}<span class="h22nw">${c}${sp}${b}</span>`);
const nwrap=h=>glue1(h).split(/(<[^>]+>)/).map((t,i,a)=>{if(i%2||!t)return t;const open=a.slice(0,i).filter((x,j)=>j%2&&/^<b\b/.test(x)).length-a.slice(0,i).filter((x,j)=>j%2&&/^<\/b>/.test(x)).length;if(open>0)return t;
 return t.replace(/[^：，、？！。\s]+[：，、？！。]*/g,m=>[...m].length>1?`<span class="h22nw">${m}</span>`:m)}).join('');
const P=(html,parts,sp)=>setPrompt(`<span class="h22pq">${nwrap(html)}</span>`,LOG(clean(parts)),sp);
// 做錯：「誤點」（接星星點到別的星星）只搖一下＋提示，不算進這關的星星；其他動手玩每一題最多算 1 次錯，第二次以後只提示（錯題本照舊記）
const mkMiss=()=>{let counted=false;return (el,free)=>{const m=S.lvMiss;wrong(el);if(S.lvMiss>m){if(free||counted)S.lvMiss=m;else counted=true}}};
const PS=(text,parts)=>{try{return petSay(text,LOG(clean(parts||[text])))}catch(e){}};
const OK=(el,parts)=>right(el,LOG(clean([praise(),...parts])));
const EN=x=>({en:x,slow:1});const ZR=t=>({zh:ZREAD[t],slow:1});const ZR2=t=>({zh:ZREAD[t],slow:2});
const CNN=n=>{const d='零一二三四五六七八九';if(n<=10)return n===10?'十':d[n];if(n<20)return '十'+(n%10?d[n%10]:'');return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'')};
const CQ=n=>n===2?'兩':CNN(n);
const bump=el=>{if(!el)return;el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')};
const Q7=()=>window.__s7q||{};const NQ=()=>Q7().NQ||{};const GRID=()=>Q7().GRID||null;
const GD=n=>{try{return (0,eval)(`typeof ${n}!=='undefined'?${n}:undefined`)}catch(e){return undefined}};
const HEARALL=()=>{const o={};try{Object.assign(o,S5HEAR)}catch(e){}try{Object.assign(o,S6HEAR)}catch(e){}try{Object.assign(o,GD('S7HEAR')||{})}catch(e){}return o};
// 圖示：有遊戲畫好的圖就用，沒有就把 emoji 放進 SVG（跟著格子大小縮放）
const ic=e=>{try{if(ICONART[e])return ICONART[e]}catch(_){}return `<svg viewBox="0 0 100 100" aria-hidden="true"><text x="50" y="54" font-size="78" text-anchor="middle" dominant-baseline="middle">${e}</text></svg>`};
const ZY20='ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘ';
const zyTo=ch=>(ZY20+'ㄙㄧㄨㄩ'.slice(0,Math.max(0,Math.min(4,ch-40)))).split('');
const UPTO=ch=>'ABCDEFGHIJKLMNOPQRSTUV'+'WXYZ'.slice(0,ch>=42?4:ch>=41?2:0);
const pics=(t,k)=>{const H=HEARALL();return shuffle((H[t]||[]).filter(x=>x&&x[0]&&!/^c:/.test(x[0]))).slice(0,k)};
const picHTML=(e,w)=>`<span class="h22pic"><span class="h22pe">${ic(e)}</span><small>${w}</small></span>`;
const LO=()=>window.__LO7||{};
const loSVG=c=>`<svg viewBox="0 0 100 100" class="h22lo" aria-hidden="true">${[[12,''],[38,'4 4'],[64,''],[90,'']].map(([y,da])=>`<line x1="4" y1="${y}" x2="96" y2="${y}" stroke="${y===64?'#F2A7A7':'#B8C2E0'}" stroke-width="${y===64?2:1.4}"${da?` stroke-dasharray="${da}"`:''}/>`).join('')}<path d="${LO()[c]||''}" fill="none" stroke="#4A2A7A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const petHTML=()=>{try{return myPet()}catch(e){return art('🐾')}};
const anSafe=k=>{try{return animal(k)}catch(e){return art('⭐')}};
const flyFrom=(src,dst,html)=>{try{if(RM()||!src||!dst)return;const a=src.getBoundingClientRect(),b=dst.getBoundingClientRect();if(!a.width||!b.width)return;const f=document.createElement('div');f.className='h22fly';f.innerHTML=html;
 Object.assign(f.style,{left:a.left+'px',top:a.top+'px',width:a.width+'px',height:a.height+'px'});document.body.appendChild(f);
 f.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${b.left+b.width/2-a.left-a.width/2}px,${b.top+b.height/2-a.top-a.height/2}px)`,opacity:.15}],{duration:420,easing:'ease-in'}).finished.then(()=>f.remove()).catch(()=>f.remove())}catch(e){}};
// 拖拉：按住拖到目標放開；沒拖（只點一下）就呼叫 onTap。targets() 回傳可以放的元素。
function dragish(el,{targets,onDrop,onTap,canStart}){let dn=null;
 el.addEventListener('pointerdown',e=>{if(S.lock||(canStart&&!canStart()))return;dn={id:e.pointerId,x:e.clientX,y:e.clientY,mv:false};try{el.setPointerCapture(e.pointerId)}catch(_){}});
 el.addEventListener('pointermove',e=>{if(!dn||e.pointerId!==dn.id)return;const dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(!dn.mv&&Math.abs(dx)+Math.abs(dy)>10){dn.mv=true;el.classList.add('h22drag')}
  if(dn.mv){e.preventDefault();el.style.transform=`translate(${dx}px,${dy}px)`;const t=hitT(e.clientX,e.clientY);(targets()||[]).forEach(x=>x.classList.toggle('h22over',x===t))}});
 const hitT=(x,y)=>(targets()||[]).find(t=>{const r=t.getBoundingClientRect();return x>=r.left-6&&x<=r.right+6&&y>=r.top-6&&y<=r.bottom+6})||null;
 const end=(e,cancel)=>{if(!dn||e.pointerId!==dn.id)return;const mv=dn.mv;dn=null;el.classList.remove('h22drag');el.style.transform='';(targets()||[]).forEach(x=>x.classList.remove('h22over'));
  if(cancel)return;if(mv){const t=hitT(e.clientX,e.clientY);if(t)onDrop(t);else bump(el)}else if(onTap)onTap()};
 el.addEventListener('pointerup',e=>end(e,false));el.addEventListener('pointercancel',e=>end(e,true));
 el.addEventListener('click',e=>{if(e.detail===0&&onTap)onTap()})}   // 鍵盤（Enter／空白鍵）

/* ---------- 1. 接星星（聽注音接；照順序接數字）——不倒數，星星一直掉，接到為止 ---------- */
function bCatch(play,sp,c){const d=S.diff;const seqM=c.k==='seq';let seq=[],pool=[],target='',need;
 if(seqM){const m=c.make();seq=m.seq;pool=m.dis;need=seq.length;S.last=seq[0]}
 else{const L=zyTo(c.ch);target=c.t;const like=(c.like||[]).filter(x=>L.includes(x)&&x!==target);
  let oth=shuffle(L.filter(x=>x!==target&&!like.includes(x))).slice(0,3);if(d!=='easy')oth=oth.concat(like.slice(0,d==='mid'?1:2));pool=oth;need=byD(3,4,5);
  S.revKey={k:'g',i:target};S.last=target}
 S.ans=null;let got=0,alive=true,sn=0,glowOn=false,lastLane=-1,lastHit=performance.now();const miss=mkMiss();
 const cur=()=>seqM?seq[got]:target;
 const introP=seqM?[c.intro,...seq.slice(0,3).map(String)]:[OLD.catchI,ZR2(target)];
 P(seqM?`照順序接星星：<b class="kw">${seq.slice(0,3).join('、')}……</b>`:`接住 <b class="ear">?</b> 的星星`,introP,false);const intro=sp?SAY(introP):wait(300);
 play.innerHTML=`<div class="catchwrap h22catch"><div class="catchfield${seqM?'':' zy'}"></div><div class="catchbar h22bar${seqM?' num':''}${need>5?' many':''}">${Array.from({length:need},()=>'<i></i>').join('')}</div></div>`;
 const cf=$('.catchfield',play),bar=$('.h22bar',play),dur=byD(6.6,5.6,5),cols=['#FFE27A','#FF9FC8','#9FE8FF','#B9F5A0','#D9C2FF'];let iv=0;
 const stop=()=>{alive=false;clearInterval(iv)};
 const glowNow=()=>$$('.fall',cf).forEach(x=>x.classList.toggle('tglow',glowOn&&x.dataset.v===String(cur())));
 const spawn=()=>{if(!alive)return;if(!cf.isConnected||S.screen!=='stage'){stop();return}if(cf.clientHeight<60||document.hidden)return;
  if(!glowOn&&performance.now()-lastHit>16000){glowOn=true}   // 很久沒接到：目標星星自己發亮（不扣分）
  const want=cur();const isT=sn%3===0||Math.random()<.34;sn++;const others=pool.concat(seqM?seq.slice(got+1):[]).filter(x=>String(x)!==String(want));
  const v=isT||!others.length?want:pick(others);let lane;do{lane=rand(0,4)}while(lane===lastLane);lastLane=lane;
  const b=document.createElement('button');b.className='fall'+(glowOn&&String(v)===String(want)?' tglow':'');b.dataset.v=String(v);b.setAttribute('aria-label',String(v));
  b.style.left=(3+lane*19)+'%';b.style.setProperty('--dur',dur+'s');b.style.setProperty('--fh',(Math.max(cf.clientHeight,200)+110)+'px');b.style.setProperty('--c',pick(cols));
  b.innerHTML=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="${starD(32,35,30)}" fill="var(--c)" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg><span>${v}</span>`;
  b.addEventListener('animationend',e=>{if(e.target===b)b.remove()});b.onclick=()=>hit(b.dataset.v,b);cf.appendChild(b)};
 function hit(v,b){if(S.lock||!alive)return;if(b&&(b.classList.contains('got')||b.classList.contains('miss')))return;
  if(String(v)===String(cur())){if(b){b.classList.add('got');burstEl(b,12)}got++;lastHit=performance.now();glowOn=false;tone(760+got*140,0,.22,'triangle',.1);
   const bi=$$('i',bar)[got-1];if(bi){bi.classList.add('on');if(seqM)bi.textContent=v}glowNow();
   if(got>=need){stop();setTimeout(()=>$$('.fall',cf).forEach(x=>x.classList.add('fade')),200);OK(bar,seqM?[OLD.catchAll]:[OLD.catchOK,ZR2(target)]);return}
   if(seqM)SAY([String(v)]);return}
  if(b)b.classList.add('miss');miss(bar,true)}
 const lis=document.createElement('div');lis.className='clisten';lis.innerHTML='<b>仔細聽…</b>';cf.appendChild(lis);
 Promise.race([intro,wait(7000)]).then(()=>wait(400)).then(()=>{lis.remove();if(iv)return;if(!alive||!cf.isConnected||S.screen!=='stage')return;spawn();iv=setInterval(spawn,byD(1250,1000,900))});
 S.hint=m=>{if(m===1){if(seqM)PS(`要先找 ${cur()} 喔！`,[OLD.findPre,String(cur()),OLD.findPost]);else PS(OLD.again,[OLD.againC,ZR2(target)])}
  else{glowOn=true;glowNow();if(seqM)PS(c.hint,[c.hint]);else PS(OLD.glowStar)}};
 S.__auto=()=>{for(let k=0;k<40&&alive&&!S.lock;k++)hit(cur(),null)}}

/* ---------- 2. 翻牌配對 ---------- */
function bMem(play,sp,c){const m=c.make();const pairs=m.pairs;const n=pairs.length;S.ans=null;
 const cards=shuffle(pairs.flatMap((p,i)=>[{i,f:p.a},{i,f:p.b}]));const land=innerWidth>innerHeight*1.15;const cols=land?n:(n<=3?3:4);
 P(m.prompt,m.intro,sp);
 play.innerHTML=`<div class="memgrid h22mem ${m.cls||''}" style="--cols:${cols}">${cards.map((x,k)=>`<button class="mcard" data-k="${k}" aria-label="牌"><span class="back">${ICON.star('#FFD98A')}</span><span class="front ${x.f.cls||''}">${x.f.html}</span></button>`).join('')}</div>`;
 const els=$$('.mcard',play),grid=$('.h22mem',play);let open=[],done=0,busy=false,mm=0;const pid=el=>cards[+el.dataset.k].i;
 const match=(a,b)=>{if(a.classList.contains('matched'))return;a.classList.add('flip','matched');b.classList.add('flip','matched');burstEl(a,8);burstEl(b,8);tone(880,0,.2,'triangle',.1);done++;const p=pairs[pid(a)];
  if(done>=n)OK(grid,[...(p.say||[]),{pause:200},m.done||OLD.memDone]);else SAY(p.say||[])};
 els.forEach(el=>el.onclick=()=>{if(S.lock||busy||el.classList.contains('flip'))return;el.classList.add('flip');tone(700,0,.1,'sine',.06);open.push(el);
  if(open.length===2){const [a,b]=open;open=[];busy=true;
   if(pid(a)===pid(b))setTimeout(()=>{busy=false;match(a,b)},320);
   else{mm++;setTimeout(()=>{a.classList.remove('flip');b.classList.remove('flip');busy=false;if(mm%3===0&&S.hint&&!S.lock)S.hint(2)},950)}}});
 S.hint=()=>{const hid=els.filter(x=>!x.classList.contains('matched'));const a=hid[0];if(!a)return;const b=hid.find(x=>x!==a&&pid(x)===pid(a));PS(OLD.memPair);glow(a);glow(b)};
 S.__auto=()=>{const seen=new Set();els.forEach(a=>{if(S.lock||a.classList.contains('matched'))return;const i=pid(a);if(seen.has(i))return;seen.add(i);const b=els.find(x=>x!==a&&pid(x)===i);if(b)match(a,b)})}}

/* ---------- 3. 送進對的籃子（拖過去，或點籃子） ---------- */
function bSort(play,sp,c){const m=c.make();const B=m.baskets,it=m.items;S.ans=null;
 P(m.prompt,m.intro,false);
 play.innerHTML=`<div class="h22sort b${B.length}">${B.map((b,i)=>`<button class="basket h22b" style="grid-area:b${i}" data-k="${b.k}" aria-label="${b.aria}"><span class="h22bl">${b.html}</span><span class="bin"></span></button>`).join('')}
  <div class="sortstage h22st" style="grid-area:st"><div class="h22card" role="button" tabindex="0"></div><div class="sortcount"></div></div></div>`;
 const bk=$$('.h22b',play),card=$('.h22card',play);let idx=0,busy=false;const miss=mkMiss();
 const show=first=>{const x=it[idx];card.className='h22card '+(x.cls||'');card.innerHTML=x.html;card.setAttribute('aria-label',x.aria||'卡片');$('.sortcount',play).textContent=`${idx+1} / ${it.length}`;
  card.animate([{opacity:0,transform:'translateY(-14px)'},{opacity:1,transform:'none'}],{duration:RM()?10:300});
  S.cur=clean([...m.intro,{pause:250},...(x.say||[])]);if(first){if(sp)SAY(S.cur)}else if(x.say)SAY(x.say)};
 const place=b=>{if(S.lock||busy||idx>=it.length)return;const x=it[idx];
  if(b.dataset.k!==x.k){miss(b);return}
  S.miss=0;flyFrom(card,b,x.mini||x.html);const bin=$('.bin',b);bin.insertAdjacentHTML('beforeend',`<i>${x.mini||x.html}</i>`);burstEl(b,10);tone(600+idx*80,0,.18,'triangle',.1);idx++;
  if(idx>=it.length){card.innerHTML='';card.classList.add('empty');OK(b,[...(x.ok||[]),{pause:150},m.done||OLD.sortDone]);return}
  busy=true;SAY(x.ok||[]);setTimeout(()=>{busy=false;if(!S.lock)show()},380)};
 bk.forEach(b=>b.onclick=()=>place(b));
 dragish(card,{targets:()=>bk,onDrop:place,onTap:()=>{const x=it[idx];if(x&&x.say)SAY(x.say)},canStart:()=>idx<it.length&&!busy});
 show(true);
 S.hint=mm=>{const x=it[idx];if(!x)return;if(mm===1&&m.hint1)PS(m.hint1(x).t,m.hint1(x).p);else{PS(OLD.glow);glow(bk.find(b=>b.dataset.k===x.k))}};
 S.__auto=()=>{for(let k=0;k<20&&idx<it.length&&!S.lock;k++){busy=false;place(bk.find(b=>b.dataset.k===it[idx].k))}}}

/* ---------- 4. 排順序（點一點排好）／排隊排第幾個 ---------- */
function bOrder(play,sp,c){const m=c.make();S.ans=null;if(m.mode==='place')return bPlace(play,sp,m);
 const items=m.items;let tray;do{tray=shuffle(items.map((_,i)=>i))}while(items.length>1&&tray.every((v,i)=>v===i));
 P(m.prompt,m.intro,sp);
 play.innerHTML=`<div class="h22ord ${m.theme}"><div class="h22slots">${items.map((x,i)=>`<span class="h22slot" data-i="${i}">${m.slot?m.slot(i):''}</span>`).join('')}</div>
  <div class="h22tray">${tray.map((i,k)=>`<button class="h22itm" data-i="${i}" style="--dl:${(k*.06).toFixed(2)}s" aria-label="${items[i].aria}">${items[i].html}</button>`).join('')}</div></div>`;
 const slots=$$('.h22slot',play),its=$$('.h22itm',play);let idx=0;const miss=mkMiss();
 const take=b=>{if(S.lock||!b||b.classList.contains('gone'))return;const i=+b.dataset.i;
  if(i!==idx){miss(b);return}
  S.miss=0;const sl=slots[idx];flyFrom(b,sl,items[i].html);sl.insertAdjacentHTML('beforeend',`<span class="h22in">${items[i].html}</span>`);sl.classList.add('fill');b.classList.add('gone');b.disabled=true;
  tone(520+idx*90,0,.2,'triangle',.1);idx++;
  if(idx>=items.length){OK($('.h22slots',play),[...(items[i].say||[]),{pause:150},...(m.done||[OLD.sortDone])]);return}
  SAY(items[i].say||[])};
 its.forEach(b=>b.onclick=()=>take(b));
 S.hint=mm=>{const x=items[idx];if(!x)return;if(mm===1)PS(m.hint1?m.hint1(x).t:'要先找'+(x.name||'')+'喔！',m.hint1?m.hint1(x).p:[OLD.findPre,...(x.say||[]),OLD.findPost]);else{PS(OLD.glow);glow(its.find(b=>+b.dataset.i===idx))}};
 S.__auto=()=>{for(let k=0;k<20&&idx<items.length&&!S.lock;k++)take(its.find(b=>+b.dataset.i===idx))}}
function bPlace(play,sp,m){const N=m.n,list=m.list;let k=0;
 P(m.prompt,m.intro,false);if(sp)SAY([...m.intro,{pause:200},`第${CNN(list[0].o)}個！`]);
 play.innerHTML=`<div class="h22ord h22q"><div class="h22line" style="--n:${N}"><span class="h22desk" aria-hidden="true">${ic('🛎️')}<small>${m.front||'櫃台'}</small></span>${Array.from({length:N},(_,i)=>`<button class="h22pos" data-i="${i}" aria-label="第${CNN(i+1)}個位置">${m.nums?`<em>${i+1}</em>`:''}</button>`).join('')}</div>
  <div class="h22wait"><span class="h22who"></span><b class="h22ordw"></b></div></div>`;
 const pos=$$('.h22pos',play);const miss=mkMiss();
 const show=()=>{const x=list[k];S.cur=LOG([...m.intro,{pause:200},`第${CNN(x.o)}個！`]);$('.h22who',play).innerHTML=anSafe(x.an);$('.h22ordw',play).textContent=`第${CNN(x.o)}個`;$('.h22wait',play).animate([{opacity:0,transform:'translateX(-16px)'},{opacity:1,transform:'none'}],{duration:RM()?10:300})};
 const put=b=>{if(S.lock||k>=list.length||b.classList.contains('fill'))return;const x=list[k];const i=+b.dataset.i;
  if(i!==x.o-1){miss(b);return}
  S.miss=0;flyFrom($('.h22who',play),b,anSafe(x.an));b.classList.add('fill');b.innerHTML=`<span class="h22an">${anSafe(x.an)}</span>${m.nums?`<em>${i+1}</em>`:''}`;tone(560+k*80,0,.2,'triangle',.1);k++;
  if(k>=list.length){$('.h22wait',play).style.visibility='hidden';OK(b,[`第${CNN(x.o)}個！`]);return}
  SAY([`第${CNN(x.o)}個！`]);setTimeout(()=>{if(!S.lock){show();SAY([`第${CNN(list[k].o)}個！`])}},700)};
 pos.forEach(b=>b.onclick=()=>put(b));show();
 S.hint=mm=>{const x=list[k];if(!x)return;if(mm===1)PS(OLD.ordH);else{PS(OLD.together);countAlong(pos.slice(0,x.o)).then(()=>{pos.forEach(p=>{if(!p.classList.contains('fill')){delete p.dataset.n;p.classList.remove('counted')}});glow(pos[x.o-1])})}};
 S.__auto=()=>{for(let j=0;j<20&&k<list.length&&!S.lock;j++)put(pos[list[k].o-1])}}

/* ---------- 5. 拼圖（交換拼片）、百數表（把數字送回空格） ---------- */
const picURL={};
function sceneURL(k){if(picURL[k])return picURL[k];let s='';try{s=CHBG[k](800,400)}catch(e){}picURL[k]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">${s}</svg>`);return picURL[k]}
function bPuz(play,sp,c){const m=c.make();S.ans=null;if(m.mode==='hund')return bHund(play,sp,m);
 const {cols,rows,labels}=m;const N=cols*rows;const url=sceneURL(m.img);let order,g=0;
 do{order=shuffle([...Array(N).keys()])}while(g++<60&&order.some((v,i)=>v===i));
 P(m.prompt,m.intro,sp);
 play.innerHTML=`<div class="h22pzw"><div class="h22pz" style="--c:${cols};--r:${rows}">${order.map(p=>`<button class="h22pt" data-p="${p}" aria-label="拼圖"></button>`).join('')}</div>${m.ref===false?'':`<div class="h22ref" aria-hidden="true"></div>`}</div>`;
 const tiles=$$('.h22pt',play);const ref=$('.h22ref',play);if(ref)ref.style.backgroundImage=`url("${url}")`;
 const paint=el=>{const p=+el.dataset.p;el.style.backgroundImage=`url("${url}")`;el.style.backgroundSize=`${cols*100}% ${rows*100}%`;el.style.backgroundPosition=`${cols>1?(p%cols)/(cols-1)*100:0}% ${rows>1?Math.floor(p/cols)/(rows-1)*100:0}%`;el.innerHTML=labels?`<i>${labels[p]}</i>`:''};
 tiles.forEach(paint);let sel=null,done=false;
 const check=()=>{if(done)return;if(tiles.every((el,i)=>+el.dataset.p===i)){done=true;tiles.forEach(e=>e.classList.add('ok'));OK($('.h22pz',play),[m.done||LN.PDONE])}};
 const swap=(a,b)=>{const t=a.dataset.p;a.dataset.p=b.dataset.p;b.dataset.p=t;paint(a);paint(b);[a,b].forEach(x=>{x.classList.remove('h22pop');void x.offsetWidth;x.classList.add('h22pop')});tone(820,0,.12,'triangle',.08)};
 tiles.forEach(el=>el.onclick=()=>{if(S.lock||done)return;if(!sel){sel=el;el.classList.add('sel');tone(600,0,.08,'sine',.06);return}if(sel===el){el.classList.remove('sel');sel=null;return}
  const a=sel;sel=null;a.classList.remove('sel');swap(a,el);check()});
 S.hint=()=>{const i=tiles.findIndex((el,k)=>+el.dataset.p!==k);if(i<0)return;const j=tiles.findIndex(el=>+el.dataset.p===i);PS(OLD.swap);glow(tiles[i]);glow(tiles[j])};
 S.__auto=()=>{for(let i=0;i<N&&!done;i++){const j=tiles.findIndex(el=>+el.dataset.p===i);if(j!==i)swap(tiles[i],tiles[j])}check()}}
function bHund(play,sp,m){const {start,rows,gaps,extra}=m;const nums=Array.from({length:rows*10},(_,i)=>start+i);
 const tilesV=shuffle(gaps.concat(extra||[]));let left=gaps.length;
 P(m.prompt,m.intro,sp);
 play.innerHTML=`<div class="h22hund"><div class="h7tab h22tab">${nums.map(v=>gaps.includes(v)?`<button class="h7c h22gap" data-v="${v}" aria-label="空格"></button>`:`<span class="h7c">${v}</span>`).join('')}</div>
  <div class="h22nts">${tilesV.map((v,i)=>`<button class="tile c${i%5} long h22nt" data-n="${v}" style="--dl:${(.3+i*.1).toFixed(2)}s">${v}</button>`).join('')}</div></div>`;
 const gapEls=$$('.h22gap',play),nts=$$('.h22nt',play);let sel=null;const miss=mkMiss();
 const fill=(t,gEl)=>{if(S.lock||!t||!gEl||gEl.classList.contains('ok'))return;
  if(+t.dataset.n!==+gEl.dataset.v){miss(gEl);return}
  S.miss=0;flyFrom(t,gEl,`<b>${t.dataset.n}</b>`);gEl.textContent=t.dataset.n;gEl.classList.add('ok');gEl.disabled=true;t.classList.add('gone');t.disabled=true;sel=null;$$('.h22nt.sel',play).forEach(x=>x.classList.remove('sel'));
  tone(620+(gaps.length-left)*70,0,.16,'triangle',.08);left--;
  if(left<=0){OK($('.h22tab',play),[OLD.found,String(t.dataset.n)]);return}SAY([String(t.dataset.n)])};
 nts.forEach(t=>dragish(t,{targets:()=>gapEls.filter(x=>!x.classList.contains('ok')),onDrop:g=>fill(t,g),
  onTap:()=>{if(S.lock||t.disabled)return;$$('.h22nt.sel',play).forEach(x=>x.classList.remove('sel'));sel=t;t.classList.add('sel');SAY([String(t.dataset.n)])},canStart:()=>!t.disabled}));
 gapEls.forEach(gEl=>gEl.onclick=()=>{if(S.lock)return;if(sel)fill(sel,gEl);else{nts.filter(x=>!x.disabled).forEach(x=>{x.classList.remove('h22nudge');void x.offsetWidth;x.classList.add('h22nudge')})}});
 S.hint=mm=>{if(mm===1)PS(OLD.hun1);else{const gEl=gapEls.find(x=>!x.classList.contains('ok'));if(!gEl)return;PS(OLD.glow);glow(gEl);glow(nts.find(x=>!x.disabled&&+x.dataset.n===+gEl.dataset.v))}};
 S.__auto=()=>{gapEls.forEach(gEl=>{if(!S.lock&&!gEl.classList.contains('ok'))fill(nts.find(x=>!x.disabled&&+x.dataset.n===+gEl.dataset.v),gEl)})}}

/* ---------- 6. 走格子（照順序踩石頭／地圖帶路） ---------- */
const DV={'右':[1,0],'左':[-1,0],'上':[0,-1],'下':[0,1]};
let mzRO=null;const roOff=()=>{if(mzRO){try{mzRO.disconnect()}catch(e){}mzRO=null}};
try{const _rq=renderQ;renderQ=function(){roOff();return _rq.apply(this,arguments)}}catch(e){}
const kk=(x,y)=>x+','+y;
function genPath(w,h,n,st){for(let t=0;t<200;t++){const path=[st];const used=new Set([kk(...st)]);let ok=true;
  for(let i=0;i<n;i++){const [x,y]=path[path.length-1];const nb=shuffle(Object.values(DV)).map(([dx,dy])=>[x+dx,y+dy]).filter(([a,b])=>a>=0&&b>=0&&a<w&&b<h&&!used.has(kk(a,b))
    // 不要貼著走過的格子（路才不會擠成一團、看得出前後）
    &&Object.values(DV).filter(([dx,dy])=>used.has(kk(a+dx,b+dy))).length<=1);
   if(!nb.length){ok=false;break}const p=nb[0];path.push(p);used.add(kk(...p))}
  if(ok)return path}return null}
function bMaze(play,sp,c){const m=c.make();S.ans=null;if(!m)return false;const {w,h}=m;const cells=m.cells;let at=m.start.slice(),step=0;
 P(m.prompt,m.intro,sp);
 let html='';for(let y=0;y<h;y++)for(let x=0;x<w;x++){const k=kk(x,y),cl=cells[k]||{};const st=x===m.start[0]&&y===m.start[1];
  html+=`<button class="h22mc${cl.cls?' '+cl.cls:''}${st?' st':''}" data-k="${k}" aria-label="${cl.aria||'格子'}">${st?(m.startHTML||''):(cl.html||'')}</button>`}
 play.innerHTML=`<div class="h22mzw ${m.theme||''}"><div class="h22mz" style="--w:${w};--h:${h}">${html}<span class="h22tok" aria-hidden="true">${petHTML()}</span></div></div>`;
 const grid=$('.h22mz',play),tok=$('.h22tok',play);const cellEl=(x,y)=>$(`.h22mc[data-k="${kk(x,y)}"]`,play);const miss=mkMiss();
 const adj=([x,y])=>Object.values(DV).map(([dx,dy])=>[x+dx,y+dy]).filter(([a,b])=>a>=0&&b>=0&&a<w&&b<h);
 const place=()=>{const el=cellEl(...at);if(!el)return;const ch=el.offsetHeight,lab=!!el.querySelector('small');el.classList.add('tokon');$$('.h22mc.tokon',play).forEach(x=>{if(x!==el)x.classList.remove('tokon')});
  Object.assign(tok.style,{left:el.offsetLeft+'px',top:(el.offsetTop-(lab?ch*.1:0))+'px',width:el.offsetWidth+'px',height:(lab?ch*.74:ch)+'px'});
  $$('.h22mc',play).forEach(x=>x.classList.remove('near'));adj(at).forEach(p=>{const e=cellEl(...p);if(e&&!e.classList.contains('been'))e.classList.add('near')})};
 requestAnimationFrame(place);roOff();try{const ro=new ResizeObserver(()=>{if(grid.isConnected&&grid.offsetParent!==null)place();else if(mzRO===ro)roOff()});mzRO=ro;ro.observe(grid)}catch(e){}
 const next=()=>m.mode==='lead'?(()=>{const [tx,ty]=m.target;if(at[0]!==tx)return [at[0]+Math.sign(tx-at[0]),at[1]];if(at[1]!==ty)return [at[0],at[1]+Math.sign(ty-at[1])];return null})():m.route[step];
 const move=el=>{const [x,y]=el.dataset.k.split(',').map(Number);const prev=at;at=[x,y];el.classList.add('been');const pe=cellEl(...prev);if(pe)pe.classList.add('been');place();tone(560+step*50,0,.13,'triangle',.08);step++;return [x-prev[0],y-prev[1]]};
 const tap=el=>{if(S.lock)return;const [x,y]=el.dataset.k.split(',').map(Number);
  if(Math.abs(x-at[0])+Math.abs(y-at[1])!==1){bump(el);SAY([OLD.side]);return}
  if(m.mode==='lead'){const d=move(el);if(x===m.target[0]&&y===m.target[1]){$$('.h22mc',play).forEach(q=>q.classList.remove('near'));OK(el,[m.done]);return}SAY([OLD.dirs[Object.keys(DV).find(k=>DV[k][0]===d[0]&&DV[k][1]===d[1])]]);return}
  if(el.classList.contains('been')||el.classList.contains('st')){bump(el);return}
  const want=m.route[step];if(!want||x!==want[0]||y!==want[1]){miss(el);return}
  S.miss=0;const d=move(el);if(step>=m.route.length){$$('.h22mc',play).forEach(q=>q.classList.remove('near'));OK(el,m.done?[].concat(m.done):[]);return}
  SAY(m.say?m.say(step-1,el):[OLD.dirs[Object.keys(DV).find(k=>DV[k][0]===d[0]&&DV[k][1]===d[1])]])};
 $$('.h22mc',play).forEach(el=>el.onclick=()=>tap(el));
 S.hint=mm=>{if(mm===1&&m.hint1)PS(m.hint1.t,m.hint1.p);else{const n=next();if(n){PS(OLD.glow);glow(cellEl(...n))}}};
 S.__auto=()=>{for(let j=0;j<40&&!S.lock;j++){const n=next();if(!n)break;tap(cellEl(...n))}}
 return true}
// 地圖帶路（S7GRID：簡單＝近的地方、中等＝任一個地方、困難＝照方向走）
function gridMaze(gid){const G=(GRID()||{})[gid];if(!G)return null;const PL=G.places||{};const byName={};Object.entries(PL).forEach(([k,v])=>{byName[v[2]]=k});
 const tk=G.tasks||{};const lead=(tk.lead||[]).filter(t=>byName[t.to]);const hard=(tk.hard||[]).filter(t=>t.t==='go'&&byName[t.ans]);
 const near=lead.filter(t=>t.shortest<=3);let task,mode;
 if(S.diff==='hard'&&hard.length){task=pick(hard);mode='go'}else{const L=S.diff==='easy'&&near.length?near:lead;task=pick(L.filter(t=>t.to!==S.__h22gt).length?L.filter(t=>t.to!==S.__h22gt):L);mode='lead'}
 S.__h22gt=task.to||task.ans;
 const cells={};Object.entries(PL).forEach(([k,v])=>{let ic0='';const e1=(v[2]==='變變的畫'&&ICONART['i:zm22cham'])?'i:zm22cham':v[1];   // 變變的畫：畫框裡的變色龍（m9zm）
  try{ic0=v[0]&&AN[v[0]]?animal(v[0]):ic(e1)}catch(e){ic0=ic(e1)}cells[k]={html:`<span class="h22mi">${ic0}</span><small>${v[2]}</small>`,cls:'pl',aria:v[2]}});
 const [sx,sy]=G.start;const to=mode==='go'?task.ans:task.to;const tgt=byName[to].split(',').map(Number);
 let route=[];if(mode==='go'){let x=sx,y=sy;(task.moves||[]).forEach(([d,n])=>{for(let i=0;i<n;i++){x+=DV[d][0];y+=DV[d][1];route.push([x,y])}})}
 const done=((NQ().grid||{}).arrived||'走到{n}那裡了！').replace('{n}',to);
 return {w:G.w,h:G.h,cells,start:G.start,startHTML:`<span class="h22mi">${ic('🚩')}</span><small>${G.startName||'入口'}</small>`,mode,target:tgt,route,theme:'h22map g7'+(G.scene||'zoo'),
  prompt:task.line,intro:mode==='go'?[task.line]:[task.line,LN.ZT],done,hint1:{t:OLD.step,p:[OLD.step]}}}
// 照順序踩石頭：seq＝要踩的標籤（照順序），dis＝其他格子的標籤
function stoneMaze(o){const w=o.w,h=o.h,st=o.start||[0,h-1];const path=genPath(w,h,o.seq.length,st);if(!path)return null;const cells={};const used=new Set(path.map(p=>kk(...p)));
 path.slice(1).forEach((p,i)=>{cells[kk(...p)]={html:o.lab(o.seq[i]),cls:'stone'+(i===o.seq.length-1?' end':''),aria:String(o.seq[i])}});
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const k=kk(x,y);if(used.has(k))continue;cells[k]={html:o.lab(pick(o.dis)),cls:'stone dis',aria:'石頭'}}
 return {w,h,cells,start:st,startHTML:o.startHTML,mode:'seq',route:path.slice(1),theme:o.theme,prompt:o.prompt,intro:o.intro,say:o.say,done:o.done,hint1:o.hint1}}

/* ---------- 7. 撥時鐘 ---------- */
function bDial(play,sp){const mins=byD([0],[0,30],[0,30]);let h;do{h=rand(1,12)}while(h===S.last);S.last=h;const mm=pick(mins);S.ans=null;const lab=mm?`${h}點半`:`${h}點`;
 let ch,cm=0;do{ch=rand(1,12)}while(ch===h);const two=mins.length>1;
 P(`把時鐘撥到 <b class="kw">${lab}</b>`,[LN.D1,lab,{pause:150},LN.D2,...(two?[LN.D3]:[])],sp);
 const num=i=>{const a=i*30*Math.PI/180;return [Math.sin(a)*78,-Math.cos(a)*78]};
 play.innerHTML=`<div class="h22dial"><div class="h22clk"><svg viewBox="-110 -110 220 220" aria-hidden="false" role="group" aria-label="時鐘">
  <circle r="104" fill="#FFF8E6" stroke="#E8B04A" stroke-width="6"/>${Array.from({length:60},(_,i)=>{const a=i*6*Math.PI/180,r1=i%5?96:91;return `<line x1="${(Math.sin(a)*r1).toFixed(1)}" y1="${(-Math.cos(a)*r1).toFixed(1)}" x2="${(Math.sin(a)*100).toFixed(1)}" y2="${(-Math.cos(a)*100).toFixed(1)}" stroke="#B89A6A" stroke-width="${i%5?1:2.4}"/>`}).join('')}
  <g class="h22mh"><line x1="0" y1="10" x2="0" y2="-80" stroke="#4A6AD0" stroke-width="5" stroke-linecap="round"/></g>
  <g class="h22hh"><line x1="0" y1="8" x2="0" y2="-50" stroke="#E0457A" stroke-width="9" stroke-linecap="round"/></g><circle r="7" fill="#4A2A7A"/>
  ${Array.from({length:12},(_,k)=>{const i=k+1;const [x,y]=num(i);return `<g class="h22n" data-h="${i}" role="button" aria-label="${i}" tabindex="0"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17" class="h22nb"/><text x="${x.toFixed(1)}" y="${(y+7).toFixed(1)}" text-anchor="middle">${i}</text></g>`}).join('')}
  </svg></div><div class="h22dc">${two?`<div class="h22mmr"><button class="h22mm" data-m="0">${clockSVG(12,0)}<span>整點</span></button><button class="h22mm" data-m="30">${clockSVG(12,30)}<span>半點</span></button></div>`:''}<button class="btn h22ok">好了</button></div></div>`;
 const hh=$('.h22hh',play),mh=$('.h22mh',play);const miss=mkMiss();
 const draw=()=>{hh.style.transform=`rotate(${((ch%12)+cm/60)*30}deg)`;mh.style.transform=`rotate(${cm*6}deg)`;$$('.h22mm',play).forEach(b=>b.classList.toggle('on',+b.dataset.m===cm));$$('.h22n',play).forEach(g=>g.classList.toggle('on',+g.dataset.h===ch))};
 draw();
 const setH=i=>{if(S.lock)return;ch=i;draw();tone(520+i*20,0,.1,'triangle',.07);SAY([String(i)])};
 $$('.h22n',play).forEach(g=>{g.addEventListener('click',()=>setH(+g.dataset.h));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')setH(+g.dataset.h)})});
 $$('.h22mm',play).forEach(b=>b.onclick=()=>{if(S.lock)return;cm=+b.dataset.m;draw();tone(700,0,.1,'sine',.06)});
 const ok=$('.h22ok',play);
 ok.onclick=()=>{if(S.lock)return;if(ch===h&&cm===mm){OK($('.h22clk',play),[lab])}else miss(ok)};
 S.hint=k=>{if(k===1){const t=(NQ().clock||{}).hint1;if(t&&two)PS(t);else PS(`${LN.DH}${h}`,[LN.DH,String(h)])}else{PS(OLD.glow);glow($(`.h22n[data-h="${h}"] circle`,play)||null);const b=$(`.h22mm[data-m="${mm}"]`,play);if(b&&cm!==mm)glow(b)}};
 S.__auto=()=>{ch=h;cm=mm;draw();ok.click()}}

/* ---------- 8. 疊積木量身高（疊好按「好了」） ---------- */
function bStack(play,sp){const B=NQ().blk||{};const who=pick((B.who||[['bunny','小兔子']]).filter(w=>window.__m7fig&&__m7fig(w[0])))||['bunny','小兔子'];
 const R=byD([2,5],[3,6],[4,7]);let n;do{n=rand(R[0],R[1])}while(n===S.last&&R[1]>R[0]);S.last=n;S.ans=null;const mx=n+2;
 let fig=null;try{fig=window.__m7fig&&__m7fig(who[0])}catch(e){}
 P(`幫<b class="kw">${who[1]}</b>量身高：疊到跟頭頂一樣高`,[LN.K1,LN.K2],sp);
 play.innerHTML=`<div class="h22stkw"><div class="b7wrap m7f m7fline h22stk" style="--mx:${mx}"><span class="b7fig" style="--h:${n}"><span class="b7stack"><span class="b7col"></span></span><span class="b7an m7fan" style="--r:${fig?fig.r.toFixed(3):.7}">${fig?fig.s:anSafe(who[0])}</span></span>
  <div class="b7tray">${Array.from({length:mx},()=>`<button class="b7b b7t" aria-label="積木"></button>`).join('')}</div></div><div class="h22okrow"><button class="btn h22ok">好了</button></div></div>`;
 const stack=$('.b7col',play),tray=$('.b7tray',play),ok=$('.h22ok',play);const miss=mkMiss();
 const add=b=>{if(S.lock||!b)return;const c=stack.children.length;if(c>=mx){bump(b);return}b.remove();stack.insertAdjacentHTML('beforeend',`<i class="b7b on" style="--k:${c}"></i>`);tone(560+c*40,0,.1,'triangle',.07)};
 const bind=b=>b.onclick=()=>add(b);$$('.b7t',play).forEach(bind);
 const back=()=>{const l=stack.lastElementChild;if(!l||S.lock)return;l.remove();tray.insertAdjacentHTML('beforeend','<button class="b7b b7t" aria-label="積木"></button>');bind(tray.lastElementChild);tone(400,0,.1,'sine',.05)};
 $('.b7stack',play).addEventListener('click',back);
 const setTo=k=>{while(stack.children.length>k)back();while(stack.children.length<k){const b=$('.b7t',play);if(!b)break;add(b)}};
 ok.onclick=()=>{if(S.lock)return;if(stack.children.length===n){$$('.b7col .b7b',play).forEach((e,i)=>e.dataset.n=i+1);OK($('.b7fig',play),[`${CQ(n)}個積木那麼高！`])}else miss(ok)};
 S.hint=k=>{if(k===1)PS(OLD.blkH);else{PS(OLD.together);setTo(n);countAlong([...stack.children]).then(()=>glow(ok))}};
 S.__auto=()=>{setTo(n);ok.click()}}

/* ---------- 內容（每一題的資料；只用到那一章為止教過的） ---------- */
const fiveSeq=()=>byD([5,10,15],[5,10,15,20,25],[5,10,15,20,25,30]);
const notMul=(lo,hi,k,step)=>shuffle(Array.from({length:hi-lo+1},(_,i)=>lo+i).filter(v=>v%step)).slice(0,k);
const zyPairs=(t,others,n)=>{const H=HEARALL();const set=[t,...shuffle(others.filter(x=>x!==t&&(H[x]||[]).length))].slice(0,n);const usedW=new Set();
 return set.map(z=>{const p=pics(z,6).find(x=>!usedW.has(x[1]))||pics(z,1)[0]||['⭐',z];usedW.add(p[1]);return {a:{html:`<b class="h22zy">${z}</b>`},b:{html:picHTML(p[0],p[1])},say:[ZR(z)]}})};
const zySort=(a,b,n)=>{const ia=pics(a,6),ib=pics(b,6);const na=Math.ceil(n/2),nb=n-na;const hl=window.__hearLine7||(w=>`${w}，${w}，開頭是哪一個注音呢？`);
 const items=shuffle([...ia.slice(0,na).map(p=>[a,p]),...ib.slice(0,nb).map(p=>[b,p])]).map(([z,p])=>({k:z,html:picHTML(p[0],p[1]),mini:ic(p[0]),aria:p[1],say:[hl(p[1])],ok:[ZR(z)]}));
 return {baskets:[a,b].map(z=>({k:z,html:`<b class="h22zy">${z}</b>`,aria:'注音 '+z})),items,prompt:`<b class="kw">${a}</b> 還是 <b class="kw">${b}</b>？送進對的籃子`,intro:[OLD.sortI],
  hint1:x=>({t:'唸唸看，第一個音是什麼呢？',p:[x.say[0]]})}};
const ltSort=(a,b,n,lo)=>{const cs=['#FF8FA8','#FFC24D','#6FB6FF','#8FD08A','#B89CFF','#FF9A5A'];const na=Math.ceil(n/2);
 const items=shuffle([...Array(na).fill(a),...Array(n-na).fill(b)]).map((z,i)=>({k:z,html:lo?`<span class="h22lob">${loSVG(z)}</span>`:`<b class="h22lt" style="color:${cs[i%cs.length]}">${z}</b>`,mini:`<b class="h22lt sm">${z}</b>`,aria:'字母',ok:[EN(z)]}));
 const bd=(NQ().case||{}).bdHint||{};
 return {baskets:[a,b].map(z=>({k:z,html:lo?`<span class="h22lob">${loSVG(z)}</span>`:`<b class="h22lt">${z}</b>`,aria:'字母 '+z})),items,prompt:`<b class="kw">${a}</b> 和 <b class="kw">${b}</b>，分一分`,intro:[OLD.sortI],
  hint1:lo?(x=>({t:bd[x.k]||OLD.glow,p:[bd[x.k]||OLD.glow]})):null}};
const BOOKC=['#FF8FA8','#FFC24D','#8FD08A','#6FB6FF','#B89CFF','#FF9A5A','#5AC8C8','#E86AA0'];
const ascItems=(vals,html,say)=>vals.slice().sort((a,b)=>a-b).map((v,i)=>({v,name:String(v),aria:String(v),html:html(v,i),say:say?say(v):[String(v)]}));
const CT={
 // 接星星
 c41:{g:'catch',k:'zy',t:'ㄙ',like:['ㄕ','ㄘ'],ch:41},
 c42:{g:'catch',k:'zy',t:'ㄧ',like:['ㄒ','ㄙ'],ch:42},
 c43:{g:'catch',k:'zy',t:'ㄨ',like:['ㄧ','ㄙ'],ch:43},
 c44:{g:'catch',k:'zy',t:'ㄩ',like:['ㄧ','ㄨ'],ch:44},
 c41n:{g:'catch',k:'seq',intro:LN.C5,hint:OLD.five,make:()=>{const s=fiveSeq();return {seq:s,dis:notMul(1,s[s.length-1]+4,6,5)}}},
 c42n:{g:'catch',k:'seq',intro:LN.C10,hint:LN.C10H,make:()=>{const s=byD([10,20,30,40],[10,20,30,40,50,60],[30,40,50,60,70,80,90,100]);return {seq:s,dis:notMul(s[0]-5,s[s.length-1],7,10)}}},
 c43n:{g:'catch',k:'seq',intro:LN.CQ,hint:LN.CQH,make:()=>{const R=byD([11,25],[20,45],[30,60]);const len=byD(3,4,5);const a=rand(R[0],R[1]);const s=Array.from({length:len},(_,i)=>a+i);return {seq:s,dis:[a-1,a+len,a+len+1,a+10,a-10].filter(v=>v>0)}}},
 // 翻牌
 m41n:{g:'memory',make:()=>{const vs=shuffle(byD([10,15,20],[5,10,15,20,25],[5,10,15,20,25,30])).slice(0,byD(3,4,5));
  return {prompt:'翻翻看：數字和<b class="kw">手掌</b>配一對',intro:[LN.M5],cls:'h22five',pairs:vs.map(v=>({a:{html:`<b class="h22num">${v}</b>`},b:{html:`<span class="h22hands" style="--k:${v/5}">${Array.from({length:v/5},()=>`<i>${ic('✋')}</i>`).join('')}</span>`},say:[String(v)]}))}}},
 m41k:{g:'memory',make:()=>clockPairs()},
 m45k:{g:'memory',make:()=>clockPairs()},
 m42z:{g:'memory',make:()=>({prompt:'翻翻看：<b class="kw">注音</b>和圖片配一對',intro:[LN.MZ],pairs:zyPairs('ㄧ',shuffle(['ㄒ','ㄙ','ㄕ','ㄐ','ㄑ','ㄘ']),byD(3,4,5))})},
 m43z:{g:'memory',make:()=>({prompt:'翻翻看：<b class="kw">注音</b>和圖片配一對',intro:[LN.MZ],pairs:zyPairs('ㄨ',['ㄧ','ㄙ',...shuffle(['ㄕ','ㄒ','ㄏ','ㄐ'])],byD(3,4,5))})},
 m44z:{g:'memory',make:()=>({prompt:'翻翻看：<b class="kw">注音</b>和圖片配一對',intro:[LN.MZ],pairs:zyPairs('ㄩ',['ㄧ','ㄨ',...shuffle(['ㄙ','ㄒ','ㄐ'])],byD(3,4,5))})},
 m44c:{g:'memory',make:()=>casePairs()},
 m45c:{g:'memory',make:()=>casePairs()},
 // 送進籃子
 s41wm:{g:'sort',make:()=>ltSort('W','M',byD(4,5,6))},
 s42yv:{g:'sort',make:()=>ltSort('Y','V',byD(4,5,6))},
 s44bd:{g:'sort',make:()=>ltSort('b','d',byD(4,5,6),true)},
 s41z:{g:'sort',make:()=>zySort('ㄙ','ㄕ',byD(4,5,6))},
 s42z:{g:'sort',make:()=>zySort('ㄧ','ㄒ',byD(4,5,6))},
 s45z:{g:'sort',make:()=>zySort('ㄧ','ㄩ',byD(4,5,6))},
 s43f:{g:'sort',make:()=>{const F=NQ().floor||{};const R=F.right||{mid:'住中間！',up:'往上長！',down:'往下掉！'};const FL=c=>(F.up||'bdfhklt').includes(c)?'up':(F.down||'gjpqy').includes(c)?'down':'mid';
  const set=byD(['a','b','a','b'],['a','b','o','l','a'],['a','b','o','h','g','a']);const nm={up:'往上長',mid:'住中間',down:'往下掉'};const ks=S.diff==='hard'?['up','mid','down']:['up','mid'];
  return {baskets:ks.map(k=>({k,html:`<span class="h22fl ${k}">${flIcon(k)}<small>${nm[k]}</small></span>`,aria:nm[k]})),
   items:shuffle(set).map(c=>({k:FL(c),html:`<span class="h22lob">${loSVG(c)}</span>`,mini:`<b class="h22lt sm">${c}</b>`,aria:'字母 '+c,say:[EN(c)],ok:[R[FL(c)]]})),
   prompt:'小寫字母住哪一層？送回家',intro:[OLD.floorI],hint1:()=>({t:(F.hint1||'看看它的身體，有沒有長到樓上，或是掉到地下室？'),p:[F.hint1||OLD.glow]})}}},
 // 排順序
 q42o:{g:'seq',make:()=>{const N=byD(5,7,8),k=byD(3,4,5);const os=shuffle(Array.from({length:N},(_,i)=>i+1)).slice(0,k);const who=shuffle(((NQ().ord||{}).queue||{}).who||['bunny','dog','pig','frog','bear']);
  return {mode:'place',n:N,nums:S.diff==='easy',front:((NQ().ord||{}).queue||{}).front||'櫃台',list:os.map((o,i)=>({o,an:who[i%who.length]})),prompt:'排隊借書：要排<b class="kw">第幾個</b>？點那個位置',intro:[LN.QORD]}}},
 q42b:{g:'seq',make:()=>{const len=byD(4,5,5);let a;if(S.diff==='hard'){const st=rand(2,9)*10-rand(1,3);a=Array.from({length:len},(_,i)=>st+i*2)}else{const st=S.diff==='easy'?rand(1,25):rand(11,94);a=Array.from({length:len},(_,i)=>st+i)}
  return {theme:'h22shelf',items:ascItems(a,(v,i)=>`<span class="h22book" style="--bc:${BOOKC[(v+i)%BOOKC.length]}"><b>${v}</b></span>`),prompt:'書背上的號碼，<b class="kw">從小排到大</b>',intro:[LN.QBOOK],hint1:x=>({t:`要先找 ${x.v} 喔！`,p:[OLD.findPre,String(x.v),OLD.findPost]}),done:[OLD.sortDone]}}},
 q43t:{g:'seq',make:()=>{const len=byD(3,4,5);const st=S.diff==='easy'?rand(1,15):S.diff==='mid'?rand(10,40):rand(20,60);const a=Array.from({length:len},(_,i)=>st+i);const who=shuffle(['bunny','squirrel','hedgehog','kitten','duck','pig','dog','frog']);
  return {theme:'h22tix',slot:i=>`<span class="h22an">${anSafe(who[i%who.length])}</span>`,items:ascItems(a,v=>`<span class="h22tk"><small>號碼</small><b>${v}</b></span>`),prompt:'號碼牌<b class="kw">從小排到大</b>，發給排隊的朋友',intro:[LN.QTIX],hint1:x=>({t:`要先找 ${x.v} 喔！`,p:[OLD.findPre,String(x.v),OLD.findPost]}),done:[OLD.sortDone]}}},
 q43h:{g:'seq',make:()=>{const k=byD(3,4,5);const hs=shuffle([2,3,4,5,6,7]).slice(0,k).sort((a,b)=>a-b);const who=shuffle(['bunny','kitten','duck','hedgehog','dog','penguin']);
  return {theme:'h22hts',items:hs.map((h,i)=>({v:h,name:'',aria:'朋友',html:`<span class="h22ht" style="--h:${h}"><span class="h22hh">${anSafe(who[i])}</span><span class="b7col">${Array.from({length:h},()=>'<i class="b7b"></i>').join('')}</span></span>`,say:[]})),
   prompt:'從<b class="kw">矮</b>排到<b class="kw">高</b>',intro:[LN.QH],hint1:()=>({t:OLD.blkH2,p:[OLD.blkH2]}),done:[OLD.sortDone]}}},
 q44a:{g:'seq',make:()=>{const L=byD(['a','b','c'],['a','b','c','d'],['a','b','c','d']);const an=shuffle(['elephant','giraffe','penguin','lion','redpanda44']);
  return {theme:'h22tour',slot:i=>`<em>${i+1}</em>`,items:L.map((c,i)=>({v:i,name:c,aria:'字母 '+c,html:`<span class="h22sign"><span class="h22lob">${loSVG(c)}</span><span class="h22san">${anSafe(an[i])}</span></span>`,say:[EN(c)]})),
   prompt:'照 <b class="kw">a、b、c、d</b> 的順序，帶大家去看動物',intro:[LN.QA],hint1:x=>({t:'要先找 '+x.name+' 喔！',p:[OLD.findPre,EN(x.name),OLD.findPost]}),done:[OLD.sortDone]}}},
 q45p:{g:'seq',make:()=>{const len=byD(4,5,5);let a;if(S.diff==='hard'){const st=rand(3,9)*10-rand(1,3);a=Array.from({length:len},(_,i)=>st+i*2)}else{const st=S.diff==='easy'?rand(1,25):rand(20,94);a=Array.from({length:len},(_,i)=>st+i)}
  const pic=shuffle(['🌻','🏠','🌈','🐟','🍎','⛵','🌙','🦋']);
  return {theme:'h22wall',items:ascItems(a,(v,i)=>`<span class="h22pnt" style="--fc:${BOOKC[(i*3)%BOOKC.length]}"><span class="h22pp">${ic(pic[i%pic.length])}</span><b>${v}</b></span>`),prompt:'照畫上的號碼，<b class="kw">從小排到大</b>',intro:[LN.QP],hint1:x=>({t:`要先找 ${x.v} 喔！`,p:[OLD.findPre,String(x.v),OLD.findPost]}),done:[OLD.sortDone]}}},
 // 拼圖、百數表
 p41:{g:'puzzle',make:()=>{const [c,r]=byD([2,2],[3,2],[3,2]);return {img:'metro41car',cols:c,rows:r,labels:Array.from({length:c*r},(_,i)=>(i+1)*5),ref:S.diff!=='hard',prompt:'拼好捷運車廂：照 <b class="kw">5、10、15……</b> 排好',intro:[LN.P,OLD.five]}}},
 p43:{g:'puzzle',make:()=>{const [c,r]=byD([2,2],[3,2],[3,2]);const st=rand(byD(1,11,21),byD(10,30,50));return {img:'clinic43doc',cols:c,rows:r,labels:Array.from({length:c*r},(_,i)=>st+i),ref:S.diff!=='hard',prompt:'拼好診所的圖：照<b class="kw">號碼</b>排好',intro:[LN.P]}}},
 p44:{g:'puzzle',make:()=>{const [c,r]=byD([2,2],[3,2],[4,2]);return {img:'zoo44ele',cols:c,rows:r,labels:null,ref:true,prompt:'拼好<b class="kw">大象的家</b>',intro:[LN.P0]}}},
 p45:{g:'puzzle',make:()=>{const [c,r]=byD([2,2],[3,2],[3,2]);const st=rand(byD(1,20,40),byD(20,60,90));return {img:'museum45kids',cols:c,rows:r,labels:Array.from({length:c*r},(_,i)=>st+i),ref:S.diff!=='hard',prompt:'拼好<b class="kw">我的畫</b>：照號碼排好',intro:[LN.P]}}},
 p42h:{g:'puzzle',make:()=>hundSpec()},
 p45h:{g:'puzzle',make:()=>hundSpec()},
 // 走格子
 z41:{g:'maze',make:()=>{const s=fiveSeq();const [w,h]=byD([4,3],[5,4],[6,4]);return stoneMaze({w,h,seq:s,dis:notMul(1,34,10,5),theme:'h22metro',lab:v=>`<b>${v}</b>`,startHTML:`<span class="h22mi">${ic('🚉')}</span><small>起點</small>`,
  prompt:'看路線圖：照 <b class="kw">5、10、15……</b> 一站一站走',intro:[LN.Z5a,OLD.five,LN.Z5],say:i=>[String(s[i])],done:[String(s[s.length-1])],hint1:{t:OLD.five,p:[OLD.five]}})}},
 z42:{g:'maze',make:()=>{const s=byD('WXYZ','UVWXYZ','STUVWXYZ').split('');const [w,h]=byD([4,3],[5,4],[6,4]);const dis='ABCDEHKMNOP'.split('');return stoneMaze({w,h,seq:s,dis,theme:'h22lib',lab:v=>`<b>${v}</b>`,startHTML:`<span class="h22mi">${ic('📚')}</span><small>起點</small>`,
  prompt:`照字母的順序走：<b class="kw">${s.join(' ')}</b>`,intro:[LN.ZL],say:i=>[EN(s[i])],done:[EN(s[s.length-1])],hint1:{t:OLD.step,p:[OLD.step]}})}},
 z43:{g:'maze',make:()=>{const n=byD(4,5,6);const [w,h]=byD([4,3],[5,4],[6,4]);return stoneMaze({w,h,seq:Array(n).fill('a'),dis:byD(['b'],['b'],['b','b','o']),theme:'h22stn',lab:v=>`<span class="h22lob">${loSVG(v)}</span>`,startHTML:`<span class="h22mi">${ic('🏥')}</span><small>起點</small>`,
  prompt:'只踩小寫 <b class="kw lo7">a</b> 的石頭',intro:[LN.ZA,EN('a')],say:()=>[EN('a')],done:[EN('a')],hint1:{t:LN.ZA+' a',p:[LN.ZA,EN('a')]}})}},
 z44a:{g:'maze',make:()=>gridMaze('z1')},z44b:{g:'maze',make:()=>gridMaze('z3')},z44c:{g:'maze',make:()=>gridMaze('z5')},
 z45a:{g:'maze',make:()=>gridMaze('m1')},z45b:{g:'maze',make:()=>gridMaze('m3')},
 // 撥時鐘、量身高
 d41:{g:'clock'},d45:{g:'clock'},
 k43:{g:'measure'}};
function clockPairs(){const n=byD(3,4,5);const set=[];const used=new Set();let g=0;
 while(set.length<n&&g++<80){const h=rand(1,12),m=S.diff==='easy'?0:pick([0,30]);const k=h+'|'+m;if(used.has(k))continue;used.add(k);set.push([h,m])}
 // 中等、困難：放一組同一個小時的整點和半點，要看長針
 if(S.diff!=='easy'&&!set.some(([h,m])=>set.some(([h2,m2])=>h2===h&&m2!==m))){const [h,m]=set[0];set[set.length-1]=[h,m?0:30]}
 return {prompt:'翻翻看：<b class="kw">時鐘</b>和幾點配一對',intro:[LN.MK],cls:'h22clkm',pairs:set.map(([h,m])=>{const lab=m?`${h}點半`:`${h}點`;return {a:{html:`<span class="h22mc2">${clockSVG(h,m)}</span>`},b:{html:`<b class="h22lab">${lab}</b>`},say:[lab]}})}}
function casePairs(){const L=shuffle(['a','b','c','d']).slice(0,byD(3,4,4));return {prompt:'翻翻看：<b class="kw">大寫</b>和<b class="kw">小寫</b>配一對',intro:[OLD.caseI],done:OLD.caseOK,
 pairs:L.map(c=>({a:{html:`<b class="h22lt">${c.toUpperCase()}</b>`},b:{html:`<span class="h22lob">${loSVG(c)}</span>`},say:[EN(c.toUpperCase()),{pause:120},EN(c)]}))}}
function hundSpec(){const rows=byD(2,3,3),k=byD(2,3,4);const start=S.diff==='easy'?rand(0,1)*10+1:rand(0,10-rows)*10+1;
 const all=Array.from({length:rows*10},(_,i)=>start+i);let gaps;do{gaps=shuffle(all).slice(0,k)}while(new Set(gaps.map(v=>v%10)).size<k);
 const extra=S.diff==='hard'?[start>1?start-1:start+rows*10]:[];   // 困難：多一張放不進去的數字
 return {mode:'hund',start,rows,gaps,extra,prompt:'百數表：把數字<b class="kw">送回空格</b>',intro:[LN.PH]}}
const flIcon=k=>`<svg viewBox="0 0 40 44" aria-hidden="true"><path d="M6 12 L20 2 L34 12Z" fill="#FF9A8A"/><rect x="8" y="12" width="24" height="10" fill="${k==='up'?'#FFE27A':'#FFF7DE'}" stroke="#C8A060"/><rect x="8" y="22" width="24" height="10" fill="${k==='mid'?'#FFE27A':'#FFF7DE'}" stroke="#C8A060"/><rect x="8" y="32" width="24" height="10" fill="${k==='down'?'#FFE27A':'#E6EEFA'}" stroke="#7A8AB0" stroke-dasharray="${k==='down'?'':'2 2'}"/></svg>`;

/* ---------- 接到現有題型上（type:h22:id） ---------- */
const B22={catch:bCatch,memory:bMem,sort:bSort,seq:bOrder,puzzle:bPuz,maze:bMaze,clock:bDial,measure:bStack};
const fullCode=type=>{try{const c=String(S.qs&&S.qs[S.q]||'');if(c.startsWith(type+':h22'))return c;
 if(c.startsWith('rev:')){const e=(V2.wrong||[]).find(x=>x.id===+c.slice(4));if(e&&String(e.t).startsWith(type+':h22'))return String(e.t)}}catch(e){}return ''};
const idFor=(type,code)=>{const id=String(code).split(':')[2]||'';if(CT[id]&&CT[id].g===type)return id;
 // 錯題複習只帶題型：照現在的章挑這一章的同種題
 const ch=String((S.ch|0)+1);const ids=Object.keys(CT).filter(k=>CT[k].g===type);return ids.find(k=>k.includes(ch))||ids[0]};
Object.keys(B22).forEach(type=>{const _o=BUILD[type];if(typeof _o!=='function')return;
 BUILD[type]=function(play,sp,arg){if(arg==='h22'){try{const code=fullCode(type);const id=idFor(type,code);const c=CT[id];S.__auto=null;S.w4fb=0;
   if(c){const r=B22[type](play,sp,c);if(r!==false)return r}}catch(e){console.log('hands22',type,e)}}
  return _o.apply(this,arguments)}});
try{Object.assign(TNAME,{puzzle:'拼圖',measure:TNAME.measure||'量一量'})}catch(e){}

/* ---------- 第 41～45 章關卡表：原本 → 2.2（原本對不上就不改，記在 console） ---------- */
const PLAN={
 41:[[['quiz:捷運','write:ㄙ:1','zhuyin:hear7:ㄙ'],['quiz:捷運','write:ㄙ:1','catch:h22:c41']],
  [['quiz:捷運','write:W:1','clock:s7'],['quiz:捷運','write:W:1','maze:h22:z41']],
  [['quiz:捷運','write:ㄙ:2','count:s7five:30'],['quiz:捷運','write:ㄙ:2','memory:h22:m41n']],
  [['quiz:捷運','write:X:1','letter:k7:W|M'],['quiz:捷運','write:X:1','sort:h22:s41wm']],
  [['quiz:捷運','write:W:2','clock:s7'],['quiz:捷運','write:W:2','clock:h22:d41']],
  [['quiz:捷運','write:X:2','count:s7five:30'],['quiz:捷運','write:X:2','puzzle:h22:p41']],
  [['quiz:捷運','zhuyin:hear7:ㄙ|ㄕ|ㄘ','count:s7five:30'],['quiz:捷運','write:W:3','catch:h22:c41n']],
  [['quiz:捷運','R:ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|Q|R|S|T|U|V:3','clock:s7'],['quiz:捷運','R:ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|Q|R|S|T|U|V:3','memory:h22:m41k']],
  [['quiz:捷運','write:ㄙ:3','write:W:3'],['quiz:捷運','write:ㄙ:3','sort:h22:s41z']]],
 42:[[['quiz:圖書館','write:ㄧ:1','zhuyin:hear7:ㄧ'],['quiz:圖書館','write:ㄧ:1','catch:h22:c42']],
  [['quiz:圖書館','write:Y:1','count:s7ord:10'],['quiz:圖書館','write:Y:1','seq:h22:q42o']],
  [['quiz:圖書館','write:ㄧ:2','count:s7ord:10'],['quiz:圖書館','write:ㄧ:2','memory:h22:m42z']],
  [['quiz:圖書館','write:Z:1','count:s7hund:100'],['quiz:圖書館','write:Z:1','puzzle:h22:p42h']],
  [['quiz:圖書館','write:Y:2','letter:k7:Y|V'],['quiz:圖書館','write:Y:2','sort:h22:s42yv']],
  [['quiz:圖書館','write:Z:2','count:s7hund:100'],['quiz:圖書館','write:Z:2','catch:h22:c42n']],
  [['quiz:圖書館','zhuyin:hear7:ㄧ|ㄙ|ㄒ','count:s7hund:100'],['quiz:圖書館','write:Y:3','seq:h22:q42b']],
  [['quiz:圖書館','R:ㄙ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|W|X|S|T|U|V:3','count:s7ord:10'],['quiz:圖書館','R:ㄙ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|W|X|S|T|U|V:3','maze:h22:z42']],
  [['quiz:圖書館','write:ㄧ:3','write:Y:3'],['quiz:圖書館','write:ㄧ:3','sort:h22:s42z']]],
 43:[[['quiz:看醫生','write:ㄨ:1','zhuyin:hear7:ㄨ'],['quiz:看醫生','write:ㄨ:1','catch:h22:c43']],
  [['quiz:看醫生','letter:s7floor:a|b','write:a:1'],['quiz:看醫生','sort:h22:s43f','write:a:1']],
  [['quiz:看醫生','write:ㄨ:2','measure:s7blk'],['quiz:看醫生','write:ㄨ:2','measure:h22:k43']],
  [['quiz:看醫生','write:b:1','count:s7queue'],['quiz:看醫生','write:b:1','seq:h22:q43t']],
  [['quiz:看醫生','write:a:2','letter:s7case:a|b'],['quiz:看醫生','write:a:2','puzzle:h22:p43']],
  [['quiz:看醫生','write:b:2','measure:s7blk'],['quiz:看醫生','write:b:2','seq:h22:q43h']],
  [['quiz:看醫生','zhuyin:hear7:ㄨ|ㄧ|ㄙ','count:s7queue'],['quiz:看醫生','write:a:3','catch:h22:c43n']],
  [['quiz:看醫生','R:ㄙ|ㄧ|W|X|Y|Z:3','letter:s7floor:a|b'],['quiz:看醫生','R:ㄙ|ㄧ|W|X|Y|Z:3','maze:h22:z43']],
  [['quiz:看醫生','write:ㄨ:3','write:a:3'],['quiz:看醫生','write:ㄨ:3','memory:h22:m43z']]],
 44:[[['quiz:動物園','write:ㄩ:1','zhuyin:hear7:ㄩ'],['quiz:動物園','write:ㄩ:1','memory:h22:m44z']],
  [['quiz:動物園','write:c:2','shape:s7grid:z1'],['quiz:動物園','write:c:2','maze:h22:z44a']],
  [['quiz:動物園','write:ㄩ:2','shape:s7grid:z2'],['quiz:動物園','write:ㄩ:2','puzzle:h22:p44']],
  [['quiz:動物園','write:d:1','letter:k7lo:b|d'],['quiz:動物園','write:d:1','sort:h22:s44bd']],
  [['quiz:動物園','write:c:3','shape:s7grid:z3'],['quiz:動物園','write:c:3','maze:h22:z44b']],
  [['quiz:動物園','write:d:2','letter:s7floor:a|b|c|d'],['quiz:動物園','write:d:2','memory:h22:m44c']],
  [['quiz:動物園','zhuyin:hear7:ㄩ|ㄧ|ㄨ','shape:s7grid:z4'],['quiz:動物園','catch:h22:c44','write:d:3']],
  [['quiz:動物園','R:ㄙ|ㄧ|ㄨ|W|X|Y|Z:3','shape:s7grid:z5'],['quiz:動物園','R:ㄙ|ㄧ|ㄨ|W|X|Y|Z:3','maze:h22:z44c']],
  [['quiz:動物園','write:ㄩ:3','write:d:3'],['quiz:動物園','write:ㄩ:3','seq:h22:q44a']]],
 45:[[['quiz:美術館','zhuyin:hear7:ㄙ|ㄧ|ㄨ|ㄩ','clock:s7'],['quiz:美術館','zhuyin:hear7:ㄙ|ㄧ|ㄨ|ㄩ','clock:h22:d45']],
  [['quiz:美術館','R:ㄙ|ㄧ|ㄨ|ㄩ:3','count:s7hund:100'],['quiz:美術館','R:ㄙ|ㄧ|ㄨ|ㄩ:3','puzzle:h22:p45h']],
  [['quiz:美術館','letter:s7case:a|b|c|d','count:s7hund:100'],['quiz:美術館','memory:h22:m45c','count:s7hund:100']],
  [['quiz:美術館','R:W|X|Y|Z:3','shape:s7grid:m1'],['quiz:美術館','R:W|X|Y|Z:3','maze:h22:z45a']],
  [['quiz:美術館','zhuyin:hear7:auto','clock:s7'],['quiz:美術館','sort:h22:s45z','clock:s7']],
  [['quiz:美術館','R:a|b|c|d:3','shape:s7grid:m2'],['quiz:美術館','R:a|b|c|d:3','puzzle:h22:p45']],
  [['quiz:美術館','letter:s7case:a|b|c|d','count:s7hund:100'],['quiz:美術館','letter:s7case:a|b|c|d','seq:h22:q45p']],
  [['quiz:美術館','R:ㄙ|ㄧ|ㄨ|ㄩ|W|X|Y|Z:3','shape:s7grid:m3'],['quiz:美術館','R:ㄙ|ㄧ|ㄨ|ㄩ|W|X|Y|Z:3','maze:h22:z45b']],
  [['quiz:美術館','zhuyin:hear7:ㄙ|ㄧ|ㄨ|ㄩ','clock:s7'],['quiz:美術館','zhuyin:hear7:ㄙ|ㄧ|ㄨ|ㄩ','memory:h22:m45k']]]};
const applied=[];
function apply(){Object.keys(PLAN).forEach(c=>{const C=CHAPTERS.find(x=>x&&x.s7===+c);if(!C)return;PLAN[c].forEach(([from,to],i)=>{const L=C.levels[i];if(!L||!Array.isArray(L.qs))return;
  if(L.qs.join('｜')===to.join('｜')){applied.push(c+'-'+(i+1));return}
  if(L.qs.join('｜')!==from.join('｜')){console.log('hands22: 第'+c+'章第'+(i+1)+'關跟預期不同，沒有改',L.qs.join(','));return}
  L.qs.splice(0,L.qs.length,...to);applied.push(c+'-'+(i+1))})})}
apply();if(applied.length<45)setTimeout(apply,0);
const CLS22={};Object.entries({zy:'c41 s41z c42 m42z s42z c43 m43z m44z c44 s45z',en:'s41wm s42yv z42 s43f z43 s44bd m44c q44a m45c',ma:'c41n z41 m41n d41 p41 m41k q42o p42h c42n q42b k43 q43t p43 q43h c43n z44a p44 z44b z44c d45 p45h z45a p45 q45p z45b m45k'}).forEach(([c,v])=>v.split(' ').forEach(id=>CLS22[id]=c));
// 學習報告分類：照題目內容（patches/98_h22cls.py 叫這個）
function cls(q){const m=/^[a-z]+:h22:([a-z0-9]+)/.exec(q||'');return m&&CLS22[m[1]]||''}
window.__h22={PLAN,CT,B22,applied,LN,genPath,cls,CLS22,ro:()=>mzRO,nwrap};

/* ---------- 樣式（只有淡入、移動、亮光；角色、寵物不放大縮小） ---------- */
const st=document.createElement('style');st.textContent=`
.h22fly{position:fixed;z-index:60;pointer-events:none;display:grid;place-items:center}
.h22fly svg{width:80%;height:80%}
.h22drag{z-index:30;position:relative;transition:none!important;cursor:grabbing}
.h22over{box-shadow:0 0 0 4px #FFE27A,0 0 22px #FFD24D!important}
@keyframes h22pop{from{opacity:.4}to{opacity:1}}
.h22pop{animation:h22pop .3s ease}
@keyframes h22nudge{30%{transform:translateY(-6px)}60%{transform:translateY(0)}}
.h22nudge{animation:h22nudge .5s ease}
/* 接星星：數字進度格 */
.h22bar.num i{display:grid;place-items:center;width:auto;min-width:34px;padding:0 4px;font-family:var(--latin);font-weight:800;font-size:17px;color:#4A2A7A;font-style:normal}
.h22catch .fall span{font-size:clamp(22px,min(4.2vw,4.2vh),36px)}
.h22bar{flex-wrap:wrap;max-width:96%}
.h22bar.many{gap:5px}.h22bar.many i{min-width:30px;height:30px;font-size:15px}
@media (orientation:landscape) and (max-height:500px){
 .play>.h22catch{flex-direction:row;align-items:stretch;flex:none;height:min(52vh,210px);gap:8px;width:calc(100% - 96px);align-self:flex-start}
 .h22catch .catchfield{min-height:0;height:100%;max-height:none}
 .h22catch .h22bar{flex-direction:column;flex-wrap:nowrap;justify-content:center;gap:4px;max-width:none}
 .h22catch .h22bar i{width:28px;height:28px}.h22catch .h22bar.num i{min-width:30px;height:26px;font-size:14px}
 .h22catch .h22bar.many{display:grid;grid-template-columns:repeat(2,auto);align-content:center}}
/* 翻牌 */
.h22mem .front{color:#4A2A7A}
.h22mem .front b{font-family:var(--latin);font-weight:800;line-height:1}
.h22mem .h22lt{font-size:clamp(28px,min(7vw,7vh),60px)}
.h22mem .h22zy{font-family:var(--cjk);font-weight:700;font-size:clamp(28px,min(7vw,7vh),60px)}
.h22mem .h22num{font-size:clamp(24px,min(6vw,6vh),52px)}
.h22mem .h22lab{font-family:var(--cjk);font-weight:700;font-size:clamp(14px,min(3.4vw,3.4vh),26px);white-space:nowrap}
.h22mem .h22lob svg,.h22mem .front .h22lob svg{width:78%;height:78%}
.h22mem .h22lob{display:grid;place-items:center;width:100%;height:100%}
.h22pic{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;width:100%;height:100%}
.h22pic .h22pe{display:grid;place-items:center;width:62%;aspect-ratio:1}
.h22pic .h22pe svg{width:100%!important;height:100%!important}
.h22pic small{font-size:clamp(11px,min(2.6vw,2.4vh),18px);color:#4A2A7A;line-height:1.1}
.h22hands{display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:1px;width:86%;height:86%}
.h22hands i{width:30%;aspect-ratio:1;display:grid;place-items:center}
.h22hands i svg{width:100%!important;height:100%!important}
.h22mc2{display:grid;place-items:center;width:88%;height:88%}
.h22mc2 svg,.h22mem .front .h22mc2 svg{width:100%!important;height:100%!important}
/* 送進籃子 */
.h22sort{display:grid;gap:clamp(8px,2vmin,18px);justify-content:center;align-items:center;justify-items:center}
.h22sort.b2{grid-template-areas:"st st" "b0 b1"}
.h22sort.b3{grid-template-areas:"st st st" "b0 b1 b2"}
.h22sort .basket{width:clamp(110px,min(26vw,24vh),210px);min-height:clamp(96px,min(18vh,24vw),150px);touch-action:none}
.h22sort .h22bl{display:grid;place-items:center;min-height:clamp(40px,7vh,64px)}
.h22sort .h22bl b{font-family:var(--latin);font-weight:800;font-size:clamp(34px,min(7vw,7vh),56px);color:var(--gold);line-height:1}
.h22sort .h22bl .h22zy{font-family:var(--cjk);font-weight:700}
.h22sort .h22bl .h22lob svg{width:clamp(48px,min(9vw,9vh),72px);height:auto;background:#FFFDF5;border-radius:10px}
.h22fl{display:flex;flex-direction:column;align-items:center;gap:2px}.h22fl svg{width:clamp(34px,6vh,48px);height:auto}.h22fl small{font-size:clamp(14px,2.2vh,18px);color:var(--gold)}
.h22sort .bin{min-height:24px}.h22sort .bin i{display:inline-grid;place-items:center;width:26px;height:26px}.h22sort .bin i svg{width:24px!important;height:24px!important}.h22sort .bin .h22lt.sm{font-size:20px;color:#fff;font-family:var(--latin);font-weight:800}
.h22st{min-height:0!important;gap:2px}
.h22card{width:clamp(96px,min(22vw,22vh),170px);aspect-ratio:1;border-radius:24px;background:linear-gradient(180deg,#FFFDF5,#F2E6FF);border:3px solid #FFD98A;box-shadow:0 6px 0 rgba(0,0,0,.25);display:grid;place-items:center;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;color:#4A2A7A}
.h22card.empty{visibility:hidden}
.h22card .h22lt{font-family:var(--latin);font-weight:800;font-size:clamp(52px,min(12vw,12vh),100px);line-height:1}
.h22card .h22lob{display:grid;place-items:center;width:88%;height:88%}.h22card .h22lob svg{width:100%;height:100%}
.h22card .h22pic small{font-size:clamp(14px,min(3vw,2.6vh),20px)}
.h22sort .sortcount{font-size:14px;opacity:.8}
@media (orientation:landscape) and (max-height:560px){
 .h22sort.b2{grid-template-areas:"b0 st b1"}.h22sort.b3{grid-template-areas:"st b0 b1 b2"}
 .h22sort .basket{min-height:clamp(90px,34vh,140px);width:clamp(100px,18vw,180px)}
 .h22card{width:clamp(84px,30vh,140px)}}
/* 排順序 */
.h22ord{display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.4vmin,22px);width:100%}
.h22slots{display:flex;gap:clamp(4px,1.2vmin,10px);justify-content:center;padding:8px 12px 6px;border-radius:16px;flex-wrap:nowrap}
.h22slot{position:relative;width:clamp(48px,min(12vw,12vh),92px);aspect-ratio:.72;border:3px dashed var(--goldline);border-radius:12px;display:flex;align-items:flex-end;justify-content:center;background:rgba(20,16,60,.35)}
.h22slot.fill{border-style:solid;border-color:#FFE27A;background:rgba(255,240,190,.25)}
.h22slot .h22in{position:absolute;inset:0;display:grid;place-items:center}
.h22tray{display:flex;gap:clamp(6px,1.6vmin,14px);flex-wrap:wrap;justify-content:center}
.h22itm{border:0;background:none;padding:0;width:clamp(48px,min(12vw,12vh),92px);aspect-ratio:.72;display:grid;place-items:center;cursor:pointer;animation:fade7 .35s backwards var(--dl)}
.h22itm.gone{visibility:hidden}
.h22book{display:flex;align-items:center;justify-content:center;width:84%;height:96%;border-radius:6px 6px 4px 4px;background:var(--bc);border:2px solid #5A4A6A;box-shadow:inset -6px 0 0 rgba(0,0,0,.12)}
.h22book b{background:#FFFDF5;border-radius:6px;padding:2px 4px;font-family:var(--latin);font-weight:800;font-size:clamp(15px,min(3.4vw,3.4vh),26px);color:#4A2A7A}
.h22shelf .h22slots{background:linear-gradient(180deg,rgba(150,100,60,.25),rgba(150,100,60,.35));border-bottom:8px solid #9A6A3A}
.h22shelf .h22slot{border-radius:6px}
.h22tk{display:flex;flex-direction:column;align-items:center;justify-content:center;width:92%;height:70%;background:#FFF3C4;border:2px solid #E8B04A;border-radius:10px;color:#4A2A7A;box-shadow:0 3px 0 rgba(0,0,0,.2)}
.h22tk small{font-size:11px;line-height:1}.h22tk b{font-family:var(--latin);font-weight:800;font-size:clamp(17px,min(3.8vw,3.8vh),30px);line-height:1}
.h22tix .h22slot{aspect-ratio:.6;align-items:flex-start}.h22tix .h22slot .h22an{position:absolute;bottom:2px;left:6%;width:88%;height:52%}.h22tix .h22slot .h22an svg{width:100%;height:100%}
.h22tix .h22slot .h22in{inset:2px 0 auto 0;height:46%}
.h22tix .h22itm{aspect-ratio:1.1}
.h22hts .h22slot,.h22hts .h22itm{aspect-ratio:.5;width:clamp(44px,min(10vw,9vh),78px)}
.h22hts .h22slots{align-items:flex-end;border-bottom:4px solid #8A6A3A;border-radius:0}
.h22ht{--u:clamp(10px,min(2.6vw,3.4vh),18px);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}
.h22ht .h22hh{width:calc(var(--u)*2.4);height:calc(var(--u)*2.4);margin-bottom:-2px}.h22ht .h22hh svg{width:100%;height:100%}
.h22ht .b7col{display:flex;flex-direction:column}.h22ht .b7b{width:calc(var(--u)*1.6);height:var(--u);border-width:1.5px}
.h22hts .h22slot .h22in{align-items:end}
.h22tour .h22slot{aspect-ratio:.8}.h22tour .h22slot>em{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-style:normal;font-family:var(--latin);font-weight:800;font-size:13px;background:#FFE27A;color:#4A2A7A;border-radius:999px;padding:0 6px;z-index:2}
.h22tour .h22slots{background:rgba(214,178,120,.55);border-radius:22px;border-bottom:5px solid rgba(160,120,70,.7)}
.h22tour .h22itm{aspect-ratio:.8}
.h22sign{display:flex;flex-direction:column;align-items:center;width:96%;height:100%;background:#FFFDF5;border:2px solid #C8A060;border-radius:10px;overflow:hidden}
.h22sign .h22lob{flex:1;width:100%;display:grid;place-items:center}.h22sign .h22lob svg{width:90%;height:auto}.h22sign .h22san{width:60%;aspect-ratio:1}.h22sign .h22san svg{width:100%;height:100%}
.h22wall .h22slots{background:rgba(255,250,235,.6);border-top:4px solid #D8C8A8}
.h22pnt{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:94%;height:96%;background:#FFFDF5;border:4px solid var(--fc);border-radius:6px;box-shadow:0 3px 0 rgba(0,0,0,.2)}
.h22pnt .h22pp{width:62%;aspect-ratio:1}.h22pnt .h22pp svg{width:100%;height:100%}.h22pnt b{font-family:var(--latin);font-weight:800;font-size:clamp(13px,min(3vw,3vh),22px);color:#4A2A7A;line-height:1}
/* 排隊第幾個 */
.h22q .h22line{display:flex;align-items:flex-end;gap:clamp(3px,1vmin,8px);padding:6px 10px;border-radius:16px;background:rgba(20,16,60,.35);max-width:96vw;box-sizing:border-box}
.h22desk{display:flex;flex-direction:column;align-items:center;flex:none;width:clamp(30px,min(calc(78vw / (var(--n,6) + 1.3)),9vh),70px)}.h22desk svg{width:100%;height:auto}.h22desk small{font-size:12px}
.h22pos{position:relative;width:clamp(26px,min(calc(78vw / (var(--n,6) + 1.3) - 6px),9.5vh),74px);aspect-ratio:.8;border:3px dashed var(--goldline);border-radius:12px;background:rgba(255,255,255,.08);padding:0;display:grid;place-items:center}
.h22pos em{position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);font-style:normal;font-family:var(--latin);font-weight:800;font-size:14px;color:var(--gold)}
.h22pos.fill{border-style:solid;border-color:#FFE27A}
.h22pos.counted{transform:none!important;box-shadow:0 0 0 3px #FFE27A}
.h22sort .bin i{animation:fade7 .3s!important}.h22pos .h22an{width:100%;height:100%;display:grid;place-items:center}.h22pos .h22an svg{width:96%;height:96%}
.h22wait{display:flex;align-items:center;gap:10px;padding:6px 16px;border-radius:999px;background:rgba(255,255,255,.14);border:2px solid var(--goldline)}
.h22who{width:clamp(48px,min(11vw,11vh),84px);aspect-ratio:1}.h22who svg{width:100%;height:100%}
.h22ordw{font-size:clamp(22px,min(5vw,5vh),36px);color:var(--gold);font-weight:400}
/* 拼圖 */
.h22pzw{display:flex;align-items:center;gap:clamp(10px,3vw,24px);flex-wrap:wrap;justify-content:center}
.h22pz{display:grid;grid-template-columns:repeat(var(--c),1fr);grid-template-rows:repeat(var(--r),1fr);gap:3px;width:min(86vw,96vh,620px);aspect-ratio:2/1;padding:4px;border-radius:14px;background:rgba(255,255,255,.18);border:2px solid var(--goldline)}
.h22pt{position:relative;border:0;padding:0;border-radius:6px;background-repeat:no-repeat;box-shadow:0 3px 0 rgba(0,0,0,.3);outline:3px solid transparent;transition:outline-color .2s}
.h22pt.sel{outline-color:#FFD24D;box-shadow:0 0 18px #FFD24D}
.h22pt.ok{box-shadow:0 0 12px #FFE27A}
.h22pt i{position:absolute;left:4px;top:4px;font-style:normal;font-family:var(--latin);font-weight:800;font-size:clamp(13px,min(2.6vw,3.4vh),22px);background:rgba(255,253,245,.92);color:#4A2A7A;border-radius:8px;padding:0 6px;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.h22ref{width:min(22vw,18vh,140px);aspect-ratio:2/1;background-size:cover;border-radius:10px;border:2px solid var(--goldline);opacity:.92}
@media (orientation:landscape) and (max-height:560px){.h22pz{width:min(60vw,88vh,520px)}}
/* 百數表 */
.h22hund{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vmin,16px)}
.h22tab{grid-template-columns:repeat(10,1fr)!important;width:min(92vw,110vh,640px)!important}
.h22tab .h7c{aspect-ratio:1}
.h22gap{border:2px dashed #E86AA0!important;background:#FFF0F6!important;color:#B3305E;font-weight:800;cursor:pointer;padding:0}
.h22gap.ok{border-style:solid!important;background:#E8FFE8!important;color:#2E6B2E}
.h22nts{display:flex;gap:clamp(8px,2vw,18px);flex-wrap:wrap;justify-content:center}
.h22nts .tile{width:clamp(56px,min(12vw,12vh),96px);font-size:clamp(24px,min(5vw,5vh),40px);touch-action:none}
.h22nts .tile.sel{box-shadow:0 0 0 4px #FFE27A,0 0 22px #FFD24D}
.h22nts .tile.gone{visibility:hidden}
/* 走格子 */
.h22mzw{display:flex;justify-content:center}
.h22mz{position:relative;display:grid;grid-template-columns:repeat(var(--w),1fr);grid-template-rows:repeat(var(--h),1fr);gap:clamp(3px,.8vmin,6px);width:min(88vw,calc(var(--w)/var(--h)*54vh),calc(var(--w)*104px));aspect-ratio:var(--w)/var(--h);padding:6px;border-radius:16px;background:rgba(255,255,255,.14);border:2px solid var(--goldline)}
.h22mc{position:relative;border:0;border-radius:12px;padding:0;background:rgba(255,255,255,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#4A2A7A;cursor:pointer;overflow:hidden}
.h22mc b{font-family:var(--latin);font-weight:800;font-size:clamp(16px,min(5vw,5vh),34px);line-height:1}
.h22mc small{font-size:clamp(9px,min(2vw,2.2vh),14px);line-height:1.05;white-space:nowrap}
.h22mc .h22mi{width:62%;aspect-ratio:1;display:grid;place-items:center}.h22mc .h22mi svg{width:100%;height:100%}
.h22mc .h22lob{width:86%;height:86%;display:grid;place-items:center}.h22mc .h22lob svg{width:100%;height:100%}
.h22mc.st{background:#FFF3C4}
.h22mc.near{box-shadow:0 0 0 3px rgba(255,226,122,.9),0 0 12px rgba(255,210,77,.8)}
.h22mc.been{background:#FFE9A8}
.h22metro .h22mc.stone{border-radius:50%}
.h22metro .h22mc.been{background:#7FD6B5;color:#0E3A2C}
.h22mc.stone.end::after{content:'終點';position:absolute;bottom:2px;font-size:clamp(9px,1.6vh,12px);color:#B3305E;line-height:1}
.h22stn .h22mc{border-radius:40% 46% 42% 48%}
.h22stn .h22mc.been{background:#BFE7FF}
.h22map .h22mc{background:rgba(232,248,220,.92)}.h22map .h22mc.pl{background:#FFFDF5}.h22map.g7museum .h22mc{background:rgba(250,240,225,.95)}
.h22map .h22mc.been{background:#FFE9A8}
.h22tok{position:absolute;left:0;top:0;pointer-events:none;transition:left .28s ease,top .28s ease;display:grid;place-items:center;z-index:3}
.h22tok svg{width:78%;height:78%;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3))}
/* 寵物站在有字的格子（入口、起點、地點）時往上偏，字疊在寵物上面、加淡底，看得到 */
.h22mc small{position:relative;z-index:4}
.h22mc.tokon small{background:rgba(255,253,245,.92);border-radius:6px;padding:0 4px}
/* 撥時鐘 */
.h22dial{display:flex;align-items:center;justify-content:center;gap:clamp(12px,3vw,34px);flex-wrap:wrap}
.h22clk{width:min(62vw,40vh,300px);aspect-ratio:1}.h22clk svg{width:100%;height:100%;display:block}
.h22n{cursor:pointer}.h22n .h22nb{fill:transparent}.h22n text{font-family:var(--latin);font-weight:800;font-size:22px;fill:#4A2A7A;pointer-events:none}
.h22n.on .h22nb{fill:#FFE27A}
.h22n .h22nb.hintglow{fill:#FFE27A}
.h22hh,.h22mh{transition:transform .35s ease}
.h22dc{display:flex;flex-direction:column;align-items:center;gap:10px}
.h22mmr{display:flex;gap:10px}
.h22mm{display:flex;flex-direction:column;align-items:center;gap:2px;border:2px solid var(--goldline);border-radius:16px;background:rgba(255,255,255,.12);padding:6px 10px;color:#fff;font-size:16px}
.h22mm .clockw,.h22mm svg{width:clamp(40px,7vh,56px);height:clamp(40px,7vh,56px)}
.h22mm.on{background:#FFE9A8;color:#4A2A7A;border-color:#FFD24D}
.h22ok{min-width:120px}
@media (orientation:landscape) and (max-height:560px){.h22clk{width:min(46vh,260px)}.h22dc{gap:6px}}
/* 量身高 */
.h22stkw{display:flex;flex-direction:column;align-items:center}
@media (orientation:landscape) and (max-height:500px){.h22stkw{flex-direction:row;gap:14px}.h22okrow{margin:0}
 .h22ord:not(.h22q){flex-direction:row;justify-content:center;gap:16px}.h22ord:not(.h22q) .h22tray{flex-wrap:nowrap}
 .h22mz{width:min(88vw,calc(var(--w)/var(--h)*47vh),calc(var(--w)*104px))}}
.h22stk{--u:clamp(16px,min(5.4vmin,7vw,calc(50vh / var(--mx))),34px)!important}
.h22stk .b7fig::before{top:auto!important;bottom:calc(var(--u)*var(--h) + 3px)}
.h22stk .b7stack{cursor:pointer}
.h22okrow{display:flex;justify-content:center;margin-top:6px}
@media (prefers-reduced-motion:reduce){.h22tok,.h22hh,.h22mh{transition:none}}
`;document.head.appendChild(st);
}catch(e){console.log('m9zg_hands22',e)}}).toString()+')()')})();

/* ================= 第七季新題型（m7e_newq7.js）—— 2026-11-22 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 規格：s7/dev/spec_newq.md（內容同事 2026-11-22）。資料：S7NQ（句子、範圍）、S7GRID（9 張方格地圖）、S7HEAR／S7LIKE／S7SEE（m7a_s7data.js）。
 *   全部接在現有題型名稱後面（第二段是 s7… 才接手），錯題本、學習報告、難度調整照原本分類：
 *   zhuyin:hear7  letter:k7  letter:k7lo  letter:s7case  letter:s7floor  shape:s7grid:<地圖>  count:s7ord  count:s7hund  count:s7queue  count:s7five  measure:s7blk  clock:s7
 * 三個難度看 S.diff。沒有輸、不扣分、不倒數：做錯 wrong() 彈回來，第二次錯 S.hint(2) 發光。
 * 寵物幫忙（pet19）：選擇題的答案按鈕有 data-v，只有一個對到 S.ans；配對、拖拉、帶路這幾種給 S.__auto，S.ans 設成 null（寵物不幫忙）。
 * 語音：只念資料（S7NQ、S7GRID、S7HEAR…，TSV 在 lines/s7_content.tsv）和現有語音索引裡的句子；數字用 n|＋p| 片段；字母一律 e1|（{en:x,slow:1}）。
 *   沒有錄音就只出字幕，不用裝置內建聲音（V() 先濾掉）。程式自己不另寫要念的句子。
 * 動畫：只有淡入、移動、亮光；沒有整體放大縮小。 */
/* 主程式在 (()=>{…})() 裡面，mods 接在它後面：用主程式留的 window.__ev（直接 eval）把這一段放進主程式的範圍執行，才看得到 CHAPTERS、S、BUILD… */
(function(){if(typeof window.__ev!=='function'){console.log('newq7: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined')return;
const CNN=n=>{const d='零一二三四五六七八九';if(n<=10)return n===10?'十':d[n];if(n<20)return '十'+(n%10?d[n%10]:'');return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'')};
const CQ=n=>n===2?'兩':CNN(n);     // 數量用「兩」
/* ---------- 共用 ---------- */
const S7=()=>window.__s7||null;
const GD=n=>{try{return (0,eval)(`typeof ${n}!=='undefined'?${n}:undefined`)}catch(e){return undefined}};
const NQ=GD('S7NQ')||((S7()||{}).DATA||{}).NQ||{};
const GRID=GD('S7GRID')||((S7()||{}).DATA||{}).GRID||null;
const SEE=GD('S7SEE')||[];
const LIKE7=GD('S7LIKE')||((S7()||{}).DATA||{}).LIKE||{z:{},l:{},low:{}};
const HEAR7=GD('S7HEAR')||((S7()||{}).DATA||{}).HEAR||{};
// 現有語音索引裡就有的句子（前幾季用過）
const OLD={again:'再仔細聽一次喔！',againC:'再仔細聽一次喔：',glowB:'我幫你，看發光的氣球！',glowF:'我幫你，看發光的那一隻！',glow:'我幫你，看發光的那一個！',together:'我陪你一起數！',kq:'找一找，這個字母的蝴蝶：',head:'開頭的音是',read:'時鐘上現在是幾點？'};
const rec=t=>{try{if(!VO.idx)return false;const u=String(t).trim();if(!u)return false;return voSents(u).every(s=>voResolve(s).every(g=>typeof g==='string'))}catch(e){return false}};
const recE=p=>{try{return !!VO.idx&&(voHas('e'+(p.slow||0)+'|'+p.en)||voHas('e1|'+p.en))}catch(e){return false}};
const V=parts=>parts.filter(p=>p!=null&&p!==''&&(typeof p==='string'?rec(p):p.en!=null?recE(p):true));
const P=(html,parts,sp)=>setPrompt(html,V(parts),sp);
const PS=(text,parts)=>{if(!text)return;const v=V(parts||[text]);return petSay(text,v.length?v:[{pause:10}])};
const OK=(el,parts)=>right(el,V([praise(),...parts]));
const EN=x=>({en:x,slow:1});
const fill=(t,o)=>String(t||'').replace(/\{(\w+)\}/g,(_,k)=>o&&o[k]!=null?o[k]:'');
// 句子陣列 → 要念的片段：'{en}'、'{EN}' 念字母名（e1|），其他填數字（數字是阿拉伯數字，念的時候接 n| 錄音）
const parts=(arr,o)=>[].concat(arr||[]).map(t=>t==='{en}'?EN(o.en):t==='{EN}'?EN(o.EN):fill(t,o)).filter(p=>p!=='');
const txt=(arr,o)=>[].concat(arr||[]).map(t=>t==='{en}'?`<b class="kw lo7">${o.en}</b>`:t==='{EN}'?`<b class="kw">${o.EN}</b>`:fill(t,o)).join(' ');
const orL=l=>l.length===2?`是${l[0]}，還是${l[1]}？`:l.length===3?`是${l[0]}、${l[1]}，還是${l[2]}？`:`是${l.slice(0,-1).join('、')}，還是${l[l.length-1]}？`;
const kOpts=()=>S.diff==='easy'?2:S.diff==='hard'?4:3;
const pickNot=(arr,last)=>{const a=arr.filter(x=>x!==last);return pick(a.length?a:arr)};
const curFull=t=>{const c=String(S.qs&&S.qs[S.q]||'');return c.startsWith(t+':')?c:''};
const argsOf=(type,sub)=>{const f=curFull(type);if(!f)return null;const p=f.split(':');return p[1]===sub?p.slice(2):null};
const reachedCh=c=>{const i=c-1;return S.chDone>i||(S.ch===i&&!S.pmode)};
const D7=()=>{try{return S7().D7}catch(e){return {}}};
const C0=()=>{try{return S7().SZ.c0}catch(e){return 41}};
const chNow=()=>S.pmode?0:S.ch+1;
const learned7=()=>{let s='';try{const D=D7();Object.keys(D).forEach(c=>{if(reachedCh(+c))s+=(D[c].learn||'')+(D[c].learnLow||'')})}catch(e){}return s};
const ZY20='ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘ',UP22='ABCDEFGHIJKLMNOPQRSTUV';
const zyL=()=>[...new Set((ZY20+learned7().replace(/[^ㄅ-ㄩ]/g,'')).split(''))];
const upL=()=>[...new Set((UP22+learned7().replace(/[^A-Z]/g,'')).split(''))];
const loL=()=>{const l=[...new Set(learned7().replace(/[^a-z]/g,'').split(''))].filter(Boolean);return l.length?l:['a','b']};
const tgt=a=>{const k=a&&a[0];return k&&k!=='auto'?k.split('|').filter(Boolean):null};
const RM=()=>{try{return !!reduced||!!S.lite}catch(e){return false}};
const anOK=k=>{try{return !!k&&Object.prototype.hasOwnProperty.call(AN,k)}catch(e){return false}};
const animalSafe=k=>{try{return animal(k)}catch(e){return art('⭐')}};
const bounce=el=>{if(!el)return;el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')};
const optsFrom=(t,pool,like,k)=>{const rest=pool.filter(x=>x!==t);const L=like&&rest.includes(like)&&S.diff!=='easy'?[like]:[];return shuffle([t,...[...new Set([...L,...shuffle(rest)])].slice(0,k-1)])};
const numOpts=(n,k,c)=>{const s=new Set([n]);shuffle(c.filter(v=>v>=1&&v!==n)).forEach(v=>{if(s.size<k)s.add(v)});return shuffle([...s])};
// 一格一格亮、念 1、2、3…（答對後的回饋）
async function lightAlong(els){for(let i=0;i<els.length;i++){const e=els[i];if(!e||!e.isConnected)return;e.classList.add('l7on');tone(480+i*40,0,.14,'triangle',.07);await Promise.all([say(V([String(i+1)])),wait(RM()?60:260)])}}

/* ---------- 1. 聽聲音找注音（第七季詞卡＋前幾季的詞卡）；第 44 章第 1 關答對後翻一張「看整個詞」 ---------- */
const HEARALL=()=>{const o={};try{Object.assign(o,S5HEAR)}catch(e){}try{Object.assign(o,S6HEAR)}catch(e){}Object.assign(o,HEAR7);return o};
const LIKEZ=()=>{const o={};try{Object.assign(o,S5LIKE.z)}catch(e){}try{Object.assign(o,S6LIKE.z)}catch(e){}Object.assign(o,LIKE7.z||{});return o};
const LIKEL=()=>Object.assign({},(()=>{try{return Object.assign({},S5LIKE.l,S6LIKE.l)}catch(e){return {}}})(),LIKE7.l||{});
const hearLine=w=>`${w}，${w}，開頭是哪一個注音呢？`;window.__hearLine7=hearLine;
let lastWord='';
function bHear7(play,sp,a){const H=HEARALL();const L=zyL();let T=(tgt(a)||[]).filter(x=>H[x]);if(!T.length){const n7=L.filter(x=>'ㄙㄧㄨㄩ'.includes(x)&&H[x]);T=(n7.length?n7:L).filter(x=>H[x])}
 if(!T.length)T=['ㄙ'];const t=pickNot(T,S.last);S.last=t;S.ans=t;const W=H[t]||[['☂️','傘']];const [e,w]=pickNot(W,W.find(x=>x[1]===lastWord))||W[0];lastWord=w;
 const pool=L.includes(t)?L:L.concat(t);const opts=optsFrom(t,pool,LIKEZ()[t],S.diff==='easy'?3:4);const line=hearLine(w);
 P(`聽聽看，<b class="kw">${w}</b> 開頭是哪一個注音？`,[line],sp);
 const see=chNow()===C0()+3&&S.level===0&&SEE.length?pick(SEE):null;
 play.innerHTML=`<div class="h5card" aria-hidden="true"><span class="h5pic">${art(e)}</span><b class="h5w">${w}</b></div><div class="flutter h5flut">${opts.map((c,i)=>`<button class="bal" data-v="${c}" style="--w:${BCOL[i]};--dl:${(i*.25).toFixed(2)}s" aria-label="注音 ${c}"><div class="fl">${balloon(BCOL[i])}<span class="zy">${c}</span></div></button>`).join('')}</div>${see?`<div class="h7see" hidden><span class="pic">${art(see[0])}</span><b>${see[1]}</b><span class="zy">${see[2]}</span></div>`:''}`;
 const btn=v=>$$('.bal',play).find(b=>b.dataset.v===v);
 $('.h5card',play).onclick=()=>{try{say(V([line]))}catch(err){}};
 S.hint=m=>{if(m===1)PS(OLD.again,[OLD.again,line]);else{PS(OLD.glowB);glow(btn(t))}};
 $$('.bal',play).forEach(b=>b.onclick=()=>{if(S.lock)return;const v=b.dataset.v;if(v===t){b.classList.add('win');const sc=$('.h7see',play);if(sc)sc.hidden=false;
  right(b,[...V([praise(),OLD.head]),{zh:ZREAD[t],slow:1},...(see?V([{pause:300},see[1]]):[])])}else wrong(b)})}

/* ---------- 2. 聽字母名找大寫（蝴蝶）；b／d 分辨 ---------- */
// 小寫字形（四線格 0～100：12 最上線、38 中間虛線、64 紅色基線、90 最下線；跟 m7d 寫字一樣）。bowl＝圓肚子（b／d 提示時亮）
const LO={a:'M62 42 Q56 37 47 38 Q34 40 33 52 Q33 64 46 64 Q57 64 62 54 M62 38 V64',b:'M36 12 V64 M36 50 Q40 38 52 38 Q65 39 65 51 Q65 64 52 64 Q40 64 36 54',
 c:'M64 42 Q58 37 49 38 Q36 40 35 51 Q35 63 49 64 Q58 64 64 59',d:'M64 12 V64 M64 50 Q60 38 48 38 Q35 39 35 51 Q35 64 48 64 Q60 64 64 54',
 e:'M35 51 H64 Q63 38 50 38 Q35 39 35 51 Q36 64 50 64 Q58 64 63 59',o:'M50 38 Q35 38 35 51 Q35 64 50 64 Q65 64 65 51 Q65 38 50 38Z',
 n:'M37 38 V64 M37 48 Q41 38 51 38 Q63 38 63 49 V64',m:'M28 38 V64 M28 47 Q31 38 39 38 Q48 38 48 47 V64 M48 47 Q51 38 60 38 Q69 38 69 47 V64',
 h:'M37 12 V64 M37 48 Q41 38 51 38 Q63 38 63 49 V64',l:'M50 12 V64',t:'M48 16 V58 Q48 64 56 64 Q61 64 63 61 M38 38 H60',
 k:'M38 12 V64 M62 38 L38 54 M46 49 L63 64',g:'M62 42 Q56 37 47 38 Q34 40 34 51 Q34 62 46 62 Q57 62 62 52 M62 38 V80 Q61 90 48 90 Q40 90 36 86',
 p:'M37 38 V90 M37 50 Q41 38 52 38 Q65 39 65 51 Q65 64 52 64 Q41 64 37 54',q:'M63 38 V90 M63 50 Q59 38 48 38 Q35 39 35 51 Q35 64 48 64 Q59 64 63 54',
 y:'M36 38 L50 64 M64 38 L46 82 Q42 90 34 88',u:'M37 38 V54 Q37 64 49 64 Q60 64 63 54 M63 38 V64',s:'M62 42 Q57 37 49 38 Q38 39 39 46 Q40 51 50 52 Q61 53 61 58 Q60 64 49 64 Q40 64 36 59',
 f:'M60 16 Q56 12 51 12 Q45 12 45 20 V64 M37 38 H57',j:'M56 38 V82 Q55 90 46 90 Q41 90 38 87 M56 26 V27',r:'M40 38 V64 M40 50 Q44 38 56 38 Q60 38 62 40',
 v:'M36 38 L50 64 L64 38',w:'M28 38 L38 64 L50 42 L62 64 L72 38',x:'M37 38 L63 64 M63 38 L37 64',z:'M37 38 H63 L37 64 H63',i:'M50 38 V64 M50 26 V27'};
const BOWL={b:'M36 50 Q40 38 52 38 Q65 39 65 51 Q65 64 52 64 Q40 64 36 54',d:'M64 50 Q60 38 48 38 Q35 39 35 51 Q35 64 48 64 Q60 64 64 54',a:'M62 42 Q56 37 47 38 Q34 40 33 52 Q33 64 46 64 Q57 64 62 54',c:''};
const glyph=(c,cls='')=>`<path d="${LO[c]||''}" class="f7g ${cls}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const gsvg=(c,x)=>`<svg viewBox="0 18 100 64" aria-hidden="true">${glyph(c)}${BOWL[c]?`<path d="${BOWL[c]}" class="f7bowl" fill="none" stroke-linecap="round"/>`:''}${x||''}</svg>`;
window.__LO7=LO;
function bK7(play,sp,a){const L=upL();let T0=(tgt(a)||[]).filter(x=>/^[A-Z]$/.test(x));if(!T0.length)T0=L.filter(x=>'WXYZ'.includes(x));if(!T0.length)T0=L;
 const t=pickNot(T0,S.last);S.last=t;S.ans=t;const pool=L.includes(t)?L:L.concat(t);const opts=optsFrom(t,pool,LIKEL()[t],S.diff==='easy'?3:4);const k=opts.length;const nm={en:`${t}.`,slow:2};
 P(`聽聽看，找出小兔子說的字母 <b class="ear">?</b>`,[OLD.kq,nm],sp);
 play.innerHTML=`<div class="flutter">${opts.map((c,i)=>{const fx=(i-(k-1)/2)*40+(i%2?30:-30),fy=-40-(i%2)*20;return `<button class="bfly" data-v="${c}" style="--w:${WING[i]};--dl:${(i*.22).toFixed(2)}s;--fx:${fx}vw;--fy:${fy}vh;--fr:${i%2?30:-30}deg" aria-label="字母 ${c}"><div class="fl">${butterfly(WING[i])}<span>${c}</span></div></button>`}).join('')}</div>`;
 const btn=v=>$$('.bfly',play).find(b=>b.dataset.v===v);
 S.hint=m=>{if(m===1)PS(OLD.again,[OLD.againC,nm]);else{PS(OLD.glowF);glow(btn(t))}};
 $$('.bfly',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===t){b.classList.add('win');right(b,[...V([praise(),'這是']),{en:t+'.',slow:2}])}else wrong(b)})}
function bK7lo(play,sp,a){const C=NQ.case||{};let T0=(tgt(a)||[]).filter(x=>/^[a-z]$/.test(x));if(!T0.length)T0=['b','d'];
 const t=pickNot(T0,S.last);S.last=t;S.ans=t;let opts=[...new Set(T0.concat(['b','d']))];if(S.diff==='hard')opts=[...new Set(opts.concat(['a','c']))];opts=shuffle(opts);
 P(txt(C.bd,{en:t}),parts(C.bd,{en:t}),sp);
 play.innerHTML=`<div class="tiles k7lo">${opts.map((c,i)=>`<button class="tile c${i%5} k7g" style="--dl:${(.2+i*.12).toFixed(2)}s" data-v="${c}" aria-label="字母 ${c}">${gsvg(c)}</button>`).join('')}</div>`;
 const btn=v=>$$('.k7g',play).find(b=>b.dataset.v===v);
 S.hint=m=>{if(m===1){const h=(C.bdHint||{})[t];$$('.k7g',play).forEach(b=>b.classList.add('belly'));if(h)PS(h,[EN(t),h])}else{PS(OLD.glow);glow(btn(t))}};
 $$('.k7g',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===t){b.classList.add('win');right(b,[...V([praise()]),EN(t)])}else wrong(b)})}

/* ---------- 3. 大小寫配對（上排大寫氣球、下排小寫氣球；mid／hard 三成機會：看大寫找小寫） ---------- */
function bCase(play,sp,a){const C=NQ.case||{};let T0=(tgt(a)||[]).filter(x=>/^[a-z]$/i.test(x)).map(x=>x.toLowerCase());if(!T0.length)T0=loL();T0=[...new Set(T0)];
 if(S.diff!=='easy'&&Math.random()<.3)return bCaseFind(play,sp,T0);
 const n=Math.min(T0.length,(C.n||{})[S.diff]||kOpts());const set=shuffle(T0).slice(0,Math.max(2,n));const ups=shuffle(set.slice()),lows=shuffle(set.slice());S.last=set.join('');S.ans=null;
 P(C.pair||'',[C.pair],sp);
 const bal=(c,i,up)=>`<button class="c7b ${up?'up':'lo'}" data-${up?'u':'l'}="${c}" style="--w:${BCOL[i%BCOL.length]};--dl:${(.2+i*.12).toFixed(2)}s" aria-label="字母 ${up?c.toUpperCase():c}"><span class="c7bb">${balloon(BCOL[i%BCOL.length])}</span><b class="${up?'':'lo7'}">${up?c.toUpperCase():c}</b></button>`;
 play.innerHTML=`<div class="c7pairs"><div class="c7done"></div><div class="c7row">${ups.map((c,i)=>bal(c,i,1)).join('')}</div><div class="c7row">${lows.map((c,i)=>bal(c,i+2,0)).join('')}</div></div>`;
 let selU=null,selL=null,left=set.length;
 const clear=()=>{$$('.c7b.sel',play).forEach(b=>b.classList.remove('sel'));selU=selL=null};
 const tryPair=async()=>{if(!selU||!selL)return;const u=selU,l=selL;const ok=u.dataset.u===l.dataset.l;
  if(!ok){clear();bounce(u);bounce(l);wrong(l);return}
  clear();u.disabled=l.disabled=true;const c=u.dataset.u;const pr=document.createElement('span');pr.className='c7pr';pr.innerHTML=`<b>${c.toUpperCase()}</b><i class="c7rib"></i><b class="lo7">${c}</b>`;$('.c7done',play).appendChild(pr);
  u.classList.add('gone');l.classList.add('gone');tone(620+(set.length-left)*60,0,.12,'triangle',.08);left--;S.miss=0;
  if(left>0){try{say(V([EN(c.toUpperCase()),{pause:150},EN(c)]))}catch(e){}return}
  right(pr,[...V([EN(c.toUpperCase()),{pause:150},EN(c),{pause:200},praise(),C.right])])};
 $$('.c7b',play).forEach(b=>b.onclick=()=>{if(S.lock||b.disabled)return;sfx('pop');if(b.dataset.u!=null){if(selU)selU.classList.remove('sel');selU=b}else{if(selL)selL.classList.remove('sel');selL=b}b.classList.add('sel');tryPair()});
 S.hint=m=>{if(m===1)PS(C.hint1||'唸唸看，大寫和小寫的名字是一樣的喔！');else{PS(OLD.glow);const u=$$('.c7b.up:not([disabled])',play)[0];if(u){const l=$(`.c7b.lo[data-l="${u.dataset.u}"]`,play);glow(u);glow(l)}}};
 S.__auto=()=>{set.forEach(c=>{const u=$(`.c7b.up[data-u="${c}"]:not([disabled])`,play),l=$(`.c7b.lo[data-l="${c}"]:not([disabled])`,play);if(u&&l&&!S.lock){u.click();l.click()}})}}
function bCaseFind(play,sp,T0){const C=NQ.case||{};const low=Object.assign({b:'d',d:'b',a:'d',c:'a'},LIKE7.low||{});const t=pickNot(T0,S.last);S.last=t;const EN0=t.toUpperCase();
 const k=S.diff==='hard'?4:3;const pool=[...new Set(T0.concat(['a','b','c','d']))];const opts=optsFrom(t,pool,low[t],k);if(low[t]&&!opts.includes(low[t])){opts[opts.findIndex(x=>x!==t)]=low[t]}S.ans=t;
 P(txt(C.find,{EN:EN0}),parts(C.find,{EN:EN0}),sp);
 play.innerHTML=`<div class="c7wrap"><button class="c7big" aria-label="字母 ${EN0}">${EN0}</button><span class="c7arrow" aria-hidden="true">→</span>
  <div class="tiles c7opts">${opts.map((c,i)=>`<button class="tile c${i%5} c7o lo7" style="--dl:${(.3+i*.12).toFixed(2)}s" data-v="${c}" aria-label="字母 ${c}">${c}</button>`).join('')}</div></div>`;
 $('.c7big',play).onclick=()=>{try{say(V([EN(EN0)]))}catch(e){}};
 S.hint=m=>{if(m===1)PS('唸唸看，大寫和小寫的名字是一樣的喔！');else{PS(OLD.glow);glow($(`.c7o[data-v="${t}"]`,play))}};
 $$('.c7o',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===t){b.classList.add('win');right(b,[...V([praise(),C.right2])])}else wrong(b)})}

/* ---------- 4. 三層樓：樓上（12～38）、中間（38～64）、地下室（64～90） ---------- */
const FLOOR=()=>{const F=NQ.floor||{};const o={};[...(F.mid||'acemnorsuvwxz')].forEach(c=>o[c]='mid');[...(F.up||'bdfhklt')].forEach(c=>o[c]='up');[...(F.down||'gjpqy')].forEach(c=>o[c]='down');return o};
// 房子（寬 W 的四線格＋屋頂）
const house=(W,put='')=>`<svg viewBox="0 -16 ${W} 110" aria-hidden="true"><path d="M2 12 L${W/2} -14 L${W-2} 12Z" fill="#FF9A8A" stroke="#C8584A" stroke-width="2"/>
 <rect x="2" y="12" width="${W-4}" height="26" class="f7b1 f7fl" data-f="up"/><rect x="2" y="38" width="${W-4}" height="26" class="f7b2 f7fl" data-f="mid"/><rect x="2" y="64" width="${W-4}" height="26" class="f7b3 f7fl" data-f="down"/>
 ${[[12,''],[38,'3 3'],[64,''],[90,'']].map(([y,da])=>`<line x1="2" y1="${y}" x2="${W-2}" y2="${y}" stroke="${y===64?'#F2A7A7':'#A8B4D8'}" stroke-width="${y===64?1.4:1}"${da?` stroke-dasharray="${da}"`:''}/>`).join('')}<g class="f7put">${put}</g></svg>`;
const mini=v=>`<svg viewBox="0 0 40 44" aria-hidden="true">${v==='up'?'<path d="M8 14 L20 4 L32 14Z" fill="#FF9A8A"/><rect x="10" y="14" width="20" height="26" fill="#FFF7DE" stroke="#C8A060"/><rect x="16" y="28" width="8" height="12" fill="#C8A060"/>'
 :v==='down'?'<path d="M6 12 L20 2 L34 12Z" fill="#FF9A8A"/><rect x="8" y="12" width="24" height="14" fill="#FFF7DE" stroke="#C8A060"/><rect x="8" y="28" width="24" height="12" fill="#C8D8F0" stroke="#7A8AB0" stroke-dasharray="2 2"/><path d="M2 27 H38" stroke="#8A6A3A" stroke-width="2"/>'
 :'<path d="M6 22 L20 12 L34 22Z" fill="#FF9A8A"/><rect x="8" y="22" width="24" height="18" fill="#FFF7DE" stroke="#C8A060"/><rect x="16" y="30" width="8" height="10" fill="#C8A060"/>'}</svg>`;
let floorIntro=0;
function bFloor(play,sp,a){const F=NQ.floor||{};const FL=FLOOR();const T0=(tgt(a)||[]).filter(c=>LO[c]&&FL[c]);
 const base=T0.length?T0:[...String((F.pool||{})[chNow()]||'')].filter(c=>LO[c]&&FL[c]).concat(T0.length?[]:loL().filter(c=>LO[c]&&FL[c]));
 const B=[...new Set(base.length?base:['a','b'])];const G=[...String((F.guest||{})[S.diff]||'')].filter(c=>LO[c]&&FL[c]&&!B.includes(c));
 if(S.diff==='hard')return bFloorSort(play,sp,B,G,FL);
 let t;let g=0;do{t=G.length&&Math.random()<.35?pick(G):pick(B)}while(t===S.last&&g++<10);S.last=t;const ans=FL[t];S.ans=ans;
 const Zo=F.opts||['住中間','往上長','往下掉'];const Z=[['mid',Zo[0]],['up',Zo[1]],['down',Zo[2]]];
 const intro=!floorIntro++&&F.intro;
 P(txt(F.ask,{en:t}),[...(intro?[F.intro,{pause:200}]:[]),...parts(F.ask,{en:t}),{pause:120},orL(Zo)],sp);
 play.innerHTML=`<div class="f7wrap f7one"><button class="f7card" aria-label="字母 ${t}"><svg viewBox="0 0 100 100" aria-hidden="true">${glyph(t)}</svg></button><div class="f7house">${house(100)}</div></div>
  <div class="tiles f7opts">${Z.map(([v,n],j)=>`<button class="tile c${j} long f7z" style="--dl:${(.3+j*.12).toFixed(2)}s" data-v="${v}" aria-label="${n}"><span class="f7mi">${mini(v)}</span>${n}</button>`).join('')}</div>`;
 if(intro&&!RM()){const fl=$$('.f7house .f7fl',play);fl.forEach((r,i)=>setTimeout(()=>{r.classList.add('l7on');setTimeout(()=>r.classList.remove('l7on'),700)},400+i*700))}
 $('.f7card',play).onclick=()=>{try{say(V([EN(t)]))}catch(e){}};
 const zs=$$('.f7z',play);
 S.hint=m=>{if(m===1)PS(F.hint1);else{PS(OLD.glow);$$('.f7house .f7fl',play).forEach(r=>r.classList.toggle('l7on',r.dataset.f===ans||(ans!=='mid'&&r.dataset.f==='mid')));glow(zs.find(z=>z.dataset.v===ans))}};
 zs.forEach(z=>z.onclick=()=>{if(S.lock)return;if(z.dataset.v===ans){$('.f7house .f7put',play).innerHTML=glyph(t,'on');$('.f7card',play).classList.add('gone');right(z,[...V([praise()]),EN(t),...V([(F.right||{})[ans]])])}else wrong(z)})}
function bFloorSort(play,sp,B,G,FL){const F=NQ.floor||{};const all=shuffle([...new Set(B.concat(G))]);const seq=[];const kinds=new Set();
 for(const c of all){if(seq.length>=4)break;if(!kinds.has(FL[c])||seq.length>=3){seq.push(c);kinds.add(FL[c])}}while(seq.length<3&&all.length)seq.push(pick(all));
 S.last=seq.join('');S.ans=null;let placed=0;const W=50*seq.length;
 P(F.sort||'',[F.sort],sp);
 play.innerHTML=`<div class="f7wrap"><div class="f7cards">${seq.map((c,j)=>`<button class="f7card sm" data-c="${c}" data-j="${j}" style="--dl:${(.2+j*.1).toFixed(2)}s" aria-label="字母 ${c}"><svg viewBox="0 0 100 100" aria-hidden="true">${glyph(c)}</svg></button>`).join('')}</div>
  <div class="f7house wide">${house(W)}</div></div>`;
 const hs=$('.f7house svg',play);let sel=null;
 const bandAt=(x,y)=>{const r=hs.getBoundingClientRect();if(x<r.left||x>r.right||y<r.top||y>r.bottom)return null;const vy=-16+(y-r.top)/r.height*110;return vy<38?'up':vy<64?'mid':'down'};
 const want=c=>FL[c]==='up'?'up':FL[c]==='down'?'down':'mid';
 const place=(card,f)=>{if(S.lock||!card||card.disabled)return;card.style.transform='';const c=card.dataset.c;
  if(f!==want(c)){bounce(card);wrong(card);return}
  card.disabled=true;card.classList.add('gone');const j=+card.dataset.j;$('.f7put',hs).insertAdjacentHTML('beforeend',`<g transform="translate(${-25+50*j} 0)">${glyph(c,'on')}</g>`);
  tone(620+placed*60,0,.12,'triangle',.08);placed++;S.miss=0;sel=null;$$('.f7card.sel',play).forEach(x=>x.classList.remove('sel'));
  if(placed<seq.length){try{say(V([EN(c),(F.right||{})[FL[c]]]))}catch(e){}return}
  right(card,[...V([praise()]),EN(c),...V([(F.right||{})[FL[c]]])])};
 $$('.f7card',play).forEach(card=>{let sx=0,sy=0,dn=false,mv=false;
  card.addEventListener('pointerdown',e=>{if(S.lock||card.disabled)return;dn=true;mv=false;sx=e.clientX;sy=e.clientY;try{card.setPointerCapture(e.pointerId)}catch(_){}card.classList.add('drag')});
  card.addEventListener('pointermove',e=>{if(!dn)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>8)mv=true;if(mv)card.style.transform=`translate(${dx}px,${dy}px)`});
  card.addEventListener('pointerup',e=>{if(!dn)return;dn=false;card.classList.remove('drag');if(mv){const f=bandAt(e.clientX,e.clientY);card.style.transform='';if(f)place(card,f);else bounce(card)}else{$$('.f7card.sel',play).forEach(x=>x.classList.remove('sel'));sel=card;card.classList.add('sel');try{say(V([EN(card.dataset.c)]))}catch(_){}}});
  card.addEventListener('pointercancel',()=>{dn=false;card.classList.remove('drag');card.style.transform=''})});
 hs.addEventListener('click',e=>{if(!sel)return;const f=bandAt(e.clientX,e.clientY);if(f)place(sel,f)});
 S.hint=m=>{if(m===1)PS(F.hint1);else{const c=$$('.f7card:not([disabled])',play)[0];if(c){PS(OLD.glow);glow(c);$$('.f7fl',hs).forEach(r=>r.classList.toggle('l7on',r.dataset.f===want(c.dataset.c)))}}};
 S.__auto=()=>{$$('.f7card:not([disabled])',play).forEach(c=>place(c,want(c.dataset.c)))}}

/* ---------- 5. 方格地圖（S7GRID：easy go；mid count／dir；hard go 轉彎＋三成 lead 帶路） ---------- */
const DV={'右':[1,0],'左':[-1,0],'上':[0,-1],'下':[0,1]};const DAR={'右':'→','左':'←','上':'↑','下':'↓'};const DNM={'上':'上面','下':'下面','左':'左邊','右':'右邊'};
function bGrid(play,sp,a){if(!GRID)return false;const id=a&&a[0]&&a[0]!=='auto'?a[0]:'';
 let gid=id&&GRID[id]?id:'';if(!gid){const ks=Object.keys(GRID).filter(k=>/^m/.test(k)?S.chDone>=C0()+3||chNow()===C0()+4:true);gid=pick(ks.length?ks:Object.keys(GRID))}const G=GRID[gid];
 const tk=G.tasks||{};let list=S.diff==='easy'?tk.easy:S.diff==='mid'?tk.mid:(Math.random()<.3&&tk.lead&&tk.lead.length?tk.lead:tk.hard);if(!list||!list.length)list=tk.easy||[];
 const task=pickNot(list,S.__gt)||list[0];S.__gt=task;
 const key=(x,y)=>x+','+y;const [sx,sy]=G.start;const PL=G.places||{};const byName={};Object.entries(PL).forEach(([k,v])=>{byName[v[2]]=k});
 const ty=task.t;
 let cells='';for(let y=0;y<G.h;y++)for(let x=0;x<G.w;x++){const k=key(x,y);const pl=PL[k];const st=x===sx&&y===sy;
  cells+=`<span class="g7c${pl?' g7pl':''}${st?' g7s':''}" data-k="${k}">${st?`${art('🐾')}<small class="g7nm">${G.startName||'入口'}</small>`:pl?`${anOK(pl[0])?animal(pl[0]):art(pl[1])}<small class="g7nm">${pl[2]}</small>`:''}</span>`}
 const placeIcon=n=>{const v=PL[byName[n]];return v?(anOK(v[0])?animal(v[0]):art(v[1])):''};
 let below='';const names=Object.values(PL).map(v=>v[2]);
 if(ty==='go'){const opts=optsFrom(task.ans,names,null,kOpts());S.ans=task.ans;below=`<div class="tiles g7opts">${opts.map((n,i)=>`<button class="tile c${i%5} long g7o" style="--dl:${(.4+i*.1).toFixed(2)}s" data-v="${n}"><span class="g7oi">${placeIcon(n)}</span>${n}</button>`).join('')}</div>`}
 else if(ty==='count'){S.ans=task.ans;below=tilesHTML(numOpts(task.ans,kOpts(),[task.ans+1,task.ans-1,task.ans+2,task.ans-2]),.5)}
 else if(ty==='dir'){S.ans=task.ans;below=`<div class="tiles g7dirs">${['上','下','左','右'].map((d,i)=>`<button class="tile c${i} g7d" style="--dl:${(.4+i*.1).toFixed(2)}s" data-v="${d}"><span class="g7da">${DAR[d]}</span>${DNM[d]}</button>`).join('')}</div>`}
 else{S.ans=null;below=`<div class="g7pad">${['上','左','右','下'].map(d=>`<button class="btn2 g7ar${d}" data-d="${d}" aria-label="往${d}">${DAR[d]}</button>`).join('')}</div>`}
 P(task.line,ty==='dir'?[task.line,{pause:150},orL(['上面','下面','左邊','右邊'])]:[task.line],sp);
 const mvTxt=ty==='go'?(task.moves||[]).map(([d,n])=>`${DAR[d]}×${n}`).join('　'):'';
 play.innerHTML=`<div class="g7wrap g7${G.scene||'zoo'}"><div class="g7grid" style="--r:${G.h};--c:${G.w}">${cells}<span class="g7me" aria-hidden="true">${(()=>{try{return myPet()}catch(e){return art('🐾')}})()}</span></div>${mvTxt?`<span class="g7mv">${mvTxt}</span>`:''}</div>${below}`;
 const grid=$('.g7grid',play),me=$('.g7me',play);let at=[sx,sy];
 const cellEl=(x,y)=>$(`.g7c[data-k="${key(x,y)}"]`,play);
 const put=(x,y)=>{const c=cellEl(x,y),g=grid.getBoundingClientRect();if(!c)return;const r=c.getBoundingClientRect();me.style.transform=`translate(${r.left-g.left}px,${r.top-g.top}px)`;me.style.width=r.width+'px';me.style.height=r.height+'px';at=[x,y]};
 requestAnimationFrame(()=>put(sx,sy));
 const target=ty==='go'?byName[task.ans]:byName[task.to];
 const route=()=>{const out=[];let x=sx,y=sy;if(ty==='go'){(task.moves||[]).forEach(([d,n])=>{for(let i=0;i<n;i++){x+=DV[d][0];y+=DV[d][1];out.push([x,y])}});return out}
  if(!target)return out;const [tx,ty2]=target.split(',').map(Number);if(task.dir==='上'||task.dir==='下'){while(y!==ty2){y+=Math.sign(ty2-y);out.push([x,y])}while(x!==tx){x+=Math.sign(tx-x);out.push([x,y])}}else{while(x!==tx){x+=Math.sign(tx-x);out.push([x,y])}while(y!==ty2){y+=Math.sign(ty2-y);out.push([x,y])}}return out};
 const walk=async()=>{const els=[];for(const [x,y] of route()){put(x,y);const el=cellEl(x,y);if(el){el.classList.add('l7on');els.push(el)}tone(480+els.length*40,0,.12,'triangle',.07);await Promise.all([say(V([String(els.length)])),wait(RM()?60:300)])}};
 const home=()=>{put(sx,sy);$$('.g7c.l7on',play).forEach(c=>c.classList.remove('l7on'))};
 const goal=n=>`走到${n}那裡了！`;
 S.hint=async m=>{if(m===1)PS('一格一格走，邊走邊數！');else{PS(OLD.glow);for(const [x,y] of route()){const el=cellEl(x,y);if(el){el.classList.add('g7hint');await wait(RM()?40:220)}}glow($$('.play [data-v]').find(b=>String(b.dataset.v)===String(S.ans)))}};
 const done=async(el,extra)=>{S.lock=true;await walk();S.lock=false;right(el,[...V([praise(),...extra])])};
 if(ty==='go')$$('.g7o',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===S.ans)done(b,[goal(task.ans)]);else{home();wrong(b)}});
 else if(ty==='count')$$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===S.ans)done(t,[`走${CQ(task.ans)}格！`]);else{home();wrong(t)}});
 else if(ty==='dir')$$('.g7d',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(t.dataset.v===S.ans)done(t,[`往${t.dataset.v}邊！`]);else{home();wrong(t)}});
 else{let steps=0;const pad=$('.g7pad',play);
  const step=d=>{if(S.lock)return;const nx=at[0]+DV[d][0],ny=at[1]+DV[d][1];if(nx<0||ny<0||nx>=G.w||ny>=G.h){bounce(me);return}
   put(nx,ny);steps++;const el=cellEl(nx,ny);if(el)el.classList.add('l7on');tone(480+steps*30,0,.1,'triangle',.06);
   if(key(nx,ny)===target){if(steps===task.shortest)return askSteps();right(el,[...V([praise(),goal(task.to)])])}};
  const askSteps=()=>{pad.innerHTML=tilesHTML(numOpts(steps,kOpts(),[steps+1,steps-1,steps+2]),.1);S.ans=steps;setPrompt('你走了幾格呢？',V(['你走了幾格呢？']),true);
   $$('.tile',pad).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===steps)right(t,[...V([praise(),`走${CQ(steps)}格！`,goal(task.to)])]);else wrong(t)})};
  $$('[data-d]',pad).forEach(b=>b.onclick=()=>step(b.dataset.d));
  const nextDir=()=>{if(!target)return null;const [tx,ty2]=target.split(',').map(Number);if(at[0]!==tx)return tx>at[0]?'右':'左';if(at[1]!==ty2)return ty2>at[1]?'下':'上';return null};
  S.hint=m=>{if(m===1)PS('一格一格走，邊走邊數！');else{const d=nextDir();if(d)glow($(`[data-d="${d}"]`,pad))}};
  S.__auto=async()=>{let n=0,d;while(!S.lock&&(d=nextDir())&&n++<20){step(d);await wait(20)}const t=$$('.tile',pad).find(x=>+x.dataset.v===steps);if(t)t.click()}}
 return true}

/* ---------- 6. 序數（借書排隊、書架；第 42 章第 2、3 關先排隊，第 8 關先書架，之後輪流） ---------- */
const BOOKC=['#FF8FA8','#FFC24D','#8FD08A','#6FB6FF','#B89CFF','#FF9A5A','#5AC8C8','#E86AA0','#A8C84A','#7A8AE0'];const BOOKI=['⭐','❤️','🌙','🍀','🔺','🔵','🌸','🐟','🍎','🌈'];
let ordAlt=0;
function bOrd(play,sp,a){const O=NQ.ord||{};const mx=Math.min(10,+((a&&a[0])||10)||10);const N=Math.min(mx,(O.n||{})[S.diff]||7);const maxAsk=S.diff==='easy'?Math.min(3,N):N;
 let n;do{n=rand(1,maxAsk)}while(n===S.last&&maxAsk>1);S.last=n;
 const first=S.qs&&!S.qs.__ord7;if(S.qs)S.qs.__ord7=1;
 const shelf=first&&chNow()===C0()+1?(S.level===7):(ordAlt++%2===1);
 const Q=(shelf?O.shelf:O.queue)||{};const ask=shelf&&S.diff==='hard'&&Q.ask&&Math.random()<.3;
 const who=shuffle(((O.queue||{}).who)||['bunny','dog','pig','frog','bear']).slice(0,N);
 const item=i=>shelf?`<svg viewBox="0 0 30 64" aria-hidden="true"><rect x="3" y="4" width="24" height="56" rx="3" fill="${BOOKC[i%10]}" stroke="#5A4A6A" stroke-width="1.6"/><text x="15" y="38" font-size="14" text-anchor="middle">${BOOKI[i%10]}</text></svg>`:`<span class="o7an">${animalSafe(who[i])}</span>`;
 const line=ask?Q.ask:(Q.lines||[])[n-1];const ok=(Q.right||[])[n-1];
 P(line||'',[line],sp);
 play.innerHTML=`<div class="o7wrap${shelf?' o7books':''}"><div class="o7row">${shelf?'':`<span class="o7desk" aria-hidden="true">${art('🛎️')}<small>${O.queue&&O.queue.front||'櫃台'}</small><em>← 前面</em></span>`}${Array.from({length:N},(_,i)=>`<${ask?'span':'button'} class="o7it${ask&&i===n-1?' o7glow':''}" ${ask?'':`data-v="${i+1}"`} style="--dl:${(i*.06).toFixed(2)}s" aria-label="第${i+1}個">${item(i)}</${ask?'span':'button'}>`).join('')}</div></div>
  ${ask?`<div class="tiles">${numOpts(n,3,[n+1,n-1,n+2]).map((v,i)=>`<button class="tile c${i} long" data-v="${v}" style="--dl:${(.4+i*.12).toFixed(2)}s">第${CNN(v)}本</button>`).join('')}</div>`:''}`;
 S.ans=n;const its=$$('.o7it',play);let busy=false;
 S.hint=m=>{if(m===1)PS(Q.hint1);else{PS(OLD.together);countAlong(its.slice(0,n)).then(()=>glow(ask?$$('.tile',play).find(t=>+t.dataset.v===n):its[n-1]))}};
 $$(ask?'.tile':'.o7it',play).forEach(b=>b.onclick=async()=>{if(S.lock||busy)return;if(+b.dataset.v===n){busy=true;b.classList.add('o7ok');S.hint=null;await lightAlong(its.slice(0,n));busy=false;right(b,V([praise(),ok]))}else wrong(b)})}

/* ---------- 7. 百數表：找數字、空格、照號碼排書（第 42 章第 7 關第一題）、下一個（自由練習） ---------- */
function bHund(play,sp,a){const H=NQ.hun||{};const top=S.diff==='easy'?30:100;
 const first=S.qs&&!S.qs.__hun7;if(S.qs)S.qs.__hun7=1;
 let mode=S.diff==='easy'?'find':S.diff==='mid'?pick(['find','find','gap']):pick(['gap','book']);
 if(first&&chNow()===C0()+1&&S.level===6)mode='book';if(S.pmode&&S.diff!=='easy'&&Math.random()<.25&&H.next)mode='next';
 let n;do{n=rand(2,top-1)}while(n===S.last);S.last=n;
 if(mode==='book'){const cross=S.diff==='hard';let st;do{st=rand(2,95)}while(cross&&Math.floor(st/10)===Math.floor((st+4)/10)&&Math.random()<.8);const gap=rand(1,3);const row=[0,1,2,3,4].map(i=>st+i);const num=row[gap];
  const slots=['L',gap,'R'];S.ans=String(gap);
  P(H.book||'',[H.book],sp);
  play.innerHTML=`<div class="h7book"><span class="h7bk now" aria-label="${num}號"><b>${num}</b></span></div><div class="h7shelf"><button class="h7slot end" data-v="L" aria-label="放這裡"></button>${row.map((v,i)=>i===gap?`<button class="h7slot" data-v="${i}" aria-label="放這裡"></button>`:`<span class="h7bk"><b>${v}</b></span>`).join('')}<button class="h7slot end" data-v="R" aria-label="放這裡"></button></div>`;
  S.hint=m=>{if(m===1)PS(H.hint1b);else{PS(OLD.glow);glow($(`.h7slot[data-v="${gap}"]`,play))}};
  $$('.h7slot',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===S.ans){b.outerHTML=`<span class="h7bk now ok"><b>${num}</b></span>`;$('.h7book',play).style.visibility='hidden';right($('.h7bk.ok',play),[...V([praise(),H.right,String(num)])])}else wrong(b)});return}
 const ans=mode==='next'?n+1:n;S.ans=ans;
 const cell=v=>mode==='gap'&&v===n||mode==='next'&&v===n+1?`<span class="h7c q">?</span>`:mode==='find'?`<button class="h7c" data-v="${v}" aria-label="${v}">${v}</button>`:`<span class="h7c${mode==='next'&&v===n?' hl':''}">${v}</span>`;
 const q=mode==='find'?parts(H.find,{n}):mode==='next'?parts(H.next,{n}):[H.gap];
 P(mode==='find'?`找一找，<b class="kw">${n}</b> 在哪裡？`:mode==='next'?`<b class="kw">${n}</b> 的下一個是幾？`:H.gap,mode==='find'?[q[0],{pause:150},...q.slice(1)]:q,sp);
 play.innerHTML=`<div class="h7tab">${Array.from({length:top},(_,i)=>cell(i+1)).join('')}</div>${mode==='find'?'':tilesHTML(numOpts(ans,3,mode==='next'?[n+2,n,n+10]:[n+1,n-1,n+10,n-10]),.4)}`;
 const rowOf=v=>$$('.h7c',play).slice(Math.floor((v-1)/10)*10,Math.floor((v-1)/10)*10+10);
 S.hint=async m=>{if(m===1)PS(mode==='find'?H.hint1:H.hint1b);else{PS(OLD.glow);rowOf(ans).forEach(c=>c.classList.add('h7nb'));await wait(500);glow(mode==='find'?$(`.h7c[data-v="${n}"]`,play):$$('.tile',play).find(t=>+t.dataset.v===ans))}};
 $$(mode==='find'?'.h7c[data-v]':'.tile',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(+b.dataset.v===ans){const c=$('.h7c.q',play);if(c){c.textContent=ans;c.classList.add('ok')}else b.classList.add('ok');right(b,[...V([praise(),H.right,String(ans)])])}else wrong(b)})}

/* ---------- 8. 看叫號：前面還有幾個人在等 ---------- */
const PPL=['bunny','squirrel','hedgehog','kitten','duck','pig','dog','frog'];
function bQueue(play,sp){const C=NQ.call||{};const R=(C.range||{})[S.diff]||[1,10,1,3];let k;do{k=rand(R[2],R[3])}while(k===S.last&&R[3]>R[2]);S.last=k;
 const cur=rand(R[0],R[1]),mine=cur+k+1;S.ans=k;const hide=S.diff==='hard';
 const q=parts(C.parts,{a:cur,b:mine});
 P(`現在叫到 <b class="kw">${cur}</b> 號，你是 <b class="kw">${mine}</b> 號。你前面還有<b class="kw">幾個人</b>在等？`,q.flatMap((p,i)=>i?[{pause:150},p]:[p]),sp);
 const ppl=Array.from({length:k},(_,i)=>`<span class="q7p${hide?' hid':''}" style="--dl:${(.3+i*.08).toFixed(2)}s"><i>${animalSafe(PPL[(cur+i)%PPL.length])}</i><b>${cur+i+1}</b></span>`).join('');
 play.innerHTML=`<div class="q7wrap"><div class="q7door"><div class="q7board" aria-label="叫號燈 ${cur} 號"><small>叫號</small><b>${cur}</b></div><span class="q7in">${animalSafe(PPL[(cur+7)%PPL.length])}<b>${cur}</b></span></div><div class="q7line">${ppl}</div><div class="q7me"><span class="q7tk"><small>我的號碼</small><b>${mine}</b></span><i>${(()=>{try{return princess(S.look)}catch(e){return ''}})()}</i></div></div>${tilesHTML(numOpts(k,kOpts(),[k+1,k-1,k+2]),.5)}`;
 const ps=$$('.q7p',play);
 S.hint=m=>{if(m===1)PS(hide?C.hint1b:C.hint1);else{ps.forEach(p=>p.classList.remove('hid'));PS(OLD.together);countAlong(ps).then(()=>glow($$('.tile',play).find(t=>+t.dataset.v===k)))}};
 $$('.tile',play).forEach(t=>t.onclick=async()=>{if(S.lock)return;if(+t.dataset.v===k){S.lock=true;ps.forEach(p=>p.classList.remove('hid'));const bd=$('.q7board b',play);for(let v=cur+1;v<=mine;v++){bd.textContent=v;tone(520+(v-cur)*40,0,.1,'triangle',.06);await wait(RM()?40:240)}$('.q7me',play).classList.add('up');S.lock=false;right(t,[...V([praise(),fill(C.right,{k})])])}else wrong(t)})}

/* ---------- 9. 積木量身高（疊積木）、比高矮、多幾個 ---------- */
const blkCol=n=>`<span class="b7col">${Array.from({length:n},(_,i)=>`<i class="b7b" style="--k:${i}"></i>`).join('')}</span>`;
function bBlk(play,sp){const B=NQ.blk||{};const R=(B.range||{})[S.diff]||[2,6];const who=shuffle((B.who||[['bunny','小兔子']]).slice());
 const mode=S.diff==='easy'?'measure':S.diff==='mid'?pick(['measure','cmp']):'cmp';
 const fig=(w,h,i,btn,blocks)=>`<${btn?'button':'span'} class="b7fig" ${btn?`data-v="${i}"`:''} style="--h:${h};--dl:${(.1+i*.12).toFixed(2)}s" aria-label="${w[1]||'朋友'}">${blocks!=null?`<span class="b7stack" data-i="${i}">${blkCol(blocks)}</span>`:''}<span class="b7an">${animalSafe(w[0])}</span></${btn?'button':'span'}>`;
 if(mode==='measure'){let n;do{n=rand(R[0],R[1])}while(n===S.last&&R[1]>R[0]);S.last=n;S.ans=n;const w=who[0];
  const ln=fill(B.measure,{who:w[1]});P(ln,[ln],sp);
  play.innerHTML=`<div class="b7wrap" style="--mx:${n+1}">${fig(w,n,0,false,0)}<div class="b7tray">${Array.from({length:n+2},(_,i)=>`<button class="b7b b7t" aria-label="積木"></button>`).join('')}</div></div>${tilesHTML(numOpts(n,kOpts(),[n+1,n-1,n+2]),.5)}`;
  const stack=$('.b7stack .b7col',play);let said=0;
  const add=b=>{if(S.lock||!b)return false;const c=stack.children.length;if(c>=n){bounce(b);PS('超過了！拿回來一個。');return false}b.remove();stack.insertAdjacentHTML('beforeend',`<i class="b7b on" style="--k:${c}"></i>`);tone(560+c*40,0,.1,'triangle',.07);if(c+1===n&&!said){said=1;PS(B.hint1b||'',[])}return true};
  $$('.b7t',play).forEach(b=>b.onclick=()=>add(b));
  stack.parentNode.addEventListener('click',()=>{const l=stack.lastElementChild;if(l&&!S.lock){l.remove();$('.b7tray',play).insertAdjacentHTML('beforeend','<button class="b7b b7t" aria-label="積木"></button>');const nb=$('.b7tray .b7t:last-child',play);nb.onclick=()=>add(nb)}});
  const fillUp=()=>{for(const b of $$('.b7t',play)){if(stack.children.length>=n)break;add(b)}};
  S.hint=m=>{if(m===1)PS(B.hint1);else{PS(OLD.together);fillUp();countAlong([...stack.children]).then(()=>glow($$('.tile',play).find(t=>+t.dataset.v===n)))}};
  $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===n){fillUp();right(t,[...V([praise(),`${CQ(n)}個積木那麼高！`])])}else wrong(t)});return}
 let h1,h2;do{h1=rand(R[0],R[1]);h2=rand(R[0],R[1])}while(Math.abs(h1-h2)<1||(S.diff==='hard'&&Math.abs(h1-h2)>4));const hs=[h1,h2];const ws=who.slice(0,2);
 const hi=Math.random()<.55;const at=String(hs.indexOf(hi?Math.max(...hs):Math.min(...hs)));S.ans=at;const q=hi?B.taller:B.shorter;
 P(q,[q],sp);play.innerHTML=`<div class="b7wrap" style="--mx:${Math.max(...hs)}">${ws.map((w,i)=>fig(w,hs[i],i,true,hs[i])).join('')}</div><div class="b7more"></div>`;
 const opts=$$('[data-v]',play);
 S.hint=m=>{if(m===1)PS(B.hint1);else{PS(OLD.glow);glow(opts.find(o=>o.dataset.v===at))}};
 opts.forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v!==at)return wrong(b);b.classList.add('b7ok');
  if(S.diff!=='hard'||!B.diff)return right(b,[...V([praise(),hi?B.right_tall:B.right_short])]);
  // hard：接著問多幾個
  opts.forEach(o=>o.disabled=true);sfx('gem');const k=Math.abs(h1-h2);S.ans=k;S.miss=0;
  try{say(V([hi?B.right_tall:B.right_short]))}catch(e){}
  setTimeout(()=>{if(S.lock)return;setPrompt(B.diff,V([B.diff]),true);const mo=$('.b7more',play);mo.innerHTML=tilesHTML(numOpts(k,kOpts(),[k+1,k-1,k+2]),.1);
   S.hint=m=>{if(m===1)PS(B.hint1);else{PS(OLD.glow);glow($$('.tile',mo).find(t=>+t.dataset.v===k))}};
   $$('.tile',mo).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===k)right(t,[...V([praise(),`多${CQ(k)}個積木！`])]);else wrong(t)})},RM()?100:900)})}

/* ---------- 10. 五個五個數 ---------- */
function bFive(play,sp,a){const F=NQ.five||{};const mx=Math.max(15,+((a&&a[0])||30)||30);const R=(F.range||{})[S.diff]||[2,4];const hi=Math.min(R[1],Math.floor(mx/5));const lo=Math.min(R[0],hi);
 let k;do{k=rand(lo,hi)}while(k*5===S.last&&hi>lo);const n=k*5;S.last=n;S.ans=n;const set=pick(F.sets||[{k:'star',icon:'⭐',line:''}]);
 P(set.line,[set.line],sp);
 const card=set.k==='wait'?`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="4" y="10" width="56" height="44" rx="10" fill="#8FE08A" stroke="#3E9A3A" stroke-width="2.4"/><text x="32" y="42" font-size="24" text-anchor="middle" fill="#1E5A1E">5</text></svg>`
  :`<span class="f7five5">${Array.from({length:5},()=>`<i>${art(set.icon)}</i>`).join('')}</span>`;
 play.innerHTML=`<div class="t5bags f7five">${Array.from({length:k},(_,b)=>`<button class="t5bag f7b" style="--dl:${(b*.12).toFixed(2)}s" aria-label="五個">${card}</button>`).join('')}</div>${tilesHTML(numOpts(n,S.diff==='easy'?2:3,[n+5,n-5]),.5)}`;
 const bags=$$('.f7b',play);let cnt=0;bags.forEach(b=>b.onclick=()=>{if(S.lock||b.dataset.n)return;cnt++;b.dataset.n=cnt*5;b.classList.add('counted');tone(480+cnt*45,0,.16,'triangle',.08);say(V([String(cnt*5)]))});
 S.hint=m=>{bags.forEach(b=>{delete b.dataset.n;b.classList.remove('counted')});cnt=0;if(m===1)PS(F.hint1);else{PS(F.hint2||OLD.together);countAlong(bags,bags.map((_,i)=>(i+1)*5))}};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===n){bags.forEach(b=>b.classList.add('dance'));right(t,[...V([praise(),String(n)])])}else wrong(t)})}

/* ---------- 11. 時鐘：整點、半點（沿用現有 clock；hard 三成出「哪一個時鐘是…」） ---------- */
function bClockPick(play,sp){const C=NQ.clock||{};let h;do{h=rand(1,12)}while(h===S.last);S.last=h;const half=Math.random()<.5;const m=half?30:0;
 const set=new Set([h+'|'+m,h+'|'+(half?0:30)]);let g=0;while(set.size<3&&g++<40){const hh=((h+pick([-2,-1,1,2,6])+11)%12)+1;set.add(hh+'|'+m)}
 S.ans=h+'|'+m;const ln=fill(half?C.pickHalf:C.pick,{h});const pp=ln.replace(String(h),'|'+h+'|').split('|').filter(Boolean);
 P(ln,pp,sp);
 play.innerHTML=`<div class="quiz k7clk">${shuffle([...set]).map((s,k)=>{const [a,b]=s.split('|').map(Number);return `<button class="qcard sq" style="--dl:${(k*.12).toFixed(2)}s" data-v="${s}" aria-label="時鐘"><div class="clockw">${clockSVG(a,b)}</div></button>`}).join('')}</div>`;
 S.hint=mm=>{if(mm===1)PS(C.hint1);else{PS(OLD.glow);glow($(`.qcard[data-v="${S.ans}"]`,play))}};
 $$('.qcard',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===S.ans)right(b,V([praise()]));else wrong(b)})}

/* ---------- 接到現有題型上 ---------- */
const B7={hear7:bHear7,k7:bK7,k7lo:bK7lo,s7case:bCase,s7floor:bFloor,s7grid:bGrid,s7ord:bOrd,s7hund:bHund,s7queue:bQueue,s7five:bFive,s7blk:bBlk};
const wrap7=(type,subs)=>{const _o=BUILD[type];BUILD[type]=function(play,sp,arg){try{if(subs.includes(arg)){S.w4fb=0;S.__auto=null;const r=B7[arg](play,sp,argsOf(type,arg)||[]);if(r!==false)return r}}catch(e){console.log('b7',type,arg,e)}return _o.apply(this,arguments)}};
wrap7('zhuyin',['hear7']);wrap7('letter',['k7','k7lo','s7case','s7floor']);wrap7('shape',['s7grid']);wrap7('count',['s7ord','s7hund','s7queue','s7five']);wrap7('measure',['s7blk']);
// 時鐘：easy 只有整點；mid、hard 整點＋半點（現有 clock 的 mid）；hard 三成出反過來的題。不出幾點幾分
{const _ck=BUILD.clock;BUILD.clock=function(play,sp,arg){if(arg==='s7'||curFull('clock').startsWith('clock:s7')){S.__auto=null;if(S.diff==='hard'&&(NQ.clock||{}).pick&&Math.random()<.3){try{return bClockPick(play,sp)}catch(e){console.log('b7 clock',e)}}
  const d=S.diff;if(d==='hard')S.diff='mid';try{return _ck.apply(this,arguments)}finally{S.diff=d}}return _ck.apply(this,arguments)}}
window.__s7q={B7,NQ,GRID,OLD,LO,FLOOR,zyL,upL,loL,rec,parts,fill,orL,hearLine};
/* ---------- 樣式（只有淡入、移動、亮光） ---------- */
const st=document.createElement('style');st.textContent=`
.lo7{font-family:var(--latin,'Baloo 2',sans-serif)}
.c7pairs{display:flex;flex-direction:column;align-items:center;gap:10px;margin:6px auto}
.c7ups{display:flex;gap:clamp(8px,2vmin,16px);justify-content:center}
.c7up{position:relative;width:clamp(64px,14vmin,96px);height:clamp(78px,17vmin,116px);border-radius:18px;border:3px solid #E0D4F4;background:#FFFFFF;color:#5A2E8A;font:700 clamp(34px,8vmin,56px)/1 var(--latin,'Baloo 2',sans-serif);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.c7up .c7lo{font-style:normal;font-size:.7em;color:#3A8A3A;min-height:1em}.c7up.now{border-color:#FFB81C;box-shadow:0 0 0 4px #FFE27A}.c7up.ok{border-color:#8FD08A}
.c7o.used{opacity:.25}
.f7line{display:flex;gap:8px;justify-content:center}.f7q{width:clamp(40px,9vmin,60px);height:clamp(40px,9vmin,60px);border-radius:12px;background:rgba(255,255,255,.75);border:2px dashed #C8B8E8}.f7q svg{width:100%;height:100%}
.f7q.now{border:3px solid #FFB81C;background:#FFFFFF}.f7q.done{opacity:.35}
.g7pl{flex-direction:column}.g7nm{position:absolute;left:0;right:0;bottom:1px;font-size:clamp(9px,1.8vmin,12px);line-height:1.1;color:#3A2A5A;text-align:center;white-space:nowrap;overflow:hidden;pointer-events:none}
.g7c .g7nm{background:rgba(255,255,255,.7);border-radius:0 0 8px 8px}.g7pl svg,.g7pl .emoji{width:70%;height:70%;margin-bottom:10%}
button.g7c{cursor:pointer;border:0;font:inherit}.g7museum .g7grid{background:#E8D8C0;box-shadow:inset 0 0 0 3px #B89A70}
.g7dirs .g7d{min-width:5.2em}.g7da{display:inline-block;margin-right:4px;font-weight:700}
.o7desk{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;margin-right:6px;font-size:clamp(24px,5vmin,38px)}.o7desk small{font-size:12px;color:#5A3A7A}.o7desk svg,.o7desk .emoji{width:1.2em;height:1.2em}
.o7it.o7glow{filter:drop-shadow(0 0 8px #FFE27A) drop-shadow(0 0 3px #FFB81C)}
.h7c.hl{background:#EAF2FF;border-color:#6FB6FF;color:#2A4A8A;font-weight:700}
.h7book{display:flex;justify-content:center;margin:4px auto}.h7shelf{display:flex;align-items:flex-end;justify-content:center;gap:2px;margin:6px auto;padding:6px 8px 10px;border-radius:12px;background:linear-gradient(#C89A6A,#A8784A);max-width:98%;flex-wrap:nowrap}
.h7bk{display:flex;align-items:flex-end;justify-content:center;width:clamp(28px,6.4vmin,44px);height:clamp(56px,12vmin,84px);border-radius:4px;background:#6FB6FF;border:2px solid #3A5A8A;box-sizing:border-box;padding-bottom:4px}
.h7bk:nth-child(4n+2){background:#FF8FA8}.h7bk:nth-child(4n){background:#8FD08A}.h7bk b{background:#fff;border-radius:4px;padding:0 3px;font:400 clamp(11px,2.4vmin,15px)/1.2 var(--latin,'Baloo 2',sans-serif);color:#3A2A5A}
.h7bk.now{background:#FFC24D;border-color:#C8862A}
.h7slot{width:clamp(14px,3.4vmin,24px);height:clamp(56px,12vmin,84px);border:2px dashed rgba(255,255,255,.8);border-radius:6px;background:rgba(255,255,255,.18);padding:0;cursor:pointer}
.h7slot.ok{width:auto;border:0;background:none}
.f7five5{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;width:86%;height:86%;place-items:center}.f7five5 i{font-style:normal;font-size:clamp(12px,2.8vmin,20px);display:grid;place-items:center;width:100%;height:100%}.f7five5 i svg{width:100%;height:100%}
.k7clk .qcard .clockw{width:clamp(90px,20vmin,150px)}

.c7wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(8px,2.4vmin,22px);margin:6px auto}
.c7big{width:clamp(96px,22vmin,150px);height:clamp(96px,22vmin,150px);border-radius:26px;border:4px solid #FFD98A;background:#FFFFFF;color:#5A2E8A;font:700 clamp(58px,13vmin,96px)/1 var(--latin,'Baloo 2',sans-serif);display:grid;place-items:center;animation:fade7 .4s backwards}
.c7arrow{font-size:clamp(28px,6vmin,44px);color:#FFE7B0}
.c7opts{margin:0}.c7o{font-family:var(--latin,'Baloo 2',sans-serif)!important;font-size:clamp(34px,7vmin,52px)!important;min-width:clamp(64px,13vmin,96px)}
.f7wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vmin,16px);margin:4px auto}
.f7card{width:clamp(84px,18vmin,124px);height:clamp(84px,18vmin,124px);border-radius:22px;border:4px solid #FFD98A;background:#FFFFFF;padding:6px;cursor:grab;touch-action:none;animation:fade7 .4s backwards;position:relative;z-index:3}
.f7card svg{width:100%;height:100%;display:block;pointer-events:none}.f7card.drag{cursor:grabbing;filter:drop-shadow(0 6px 8px rgba(40,30,80,.35))}.f7card.gone{visibility:hidden}
.f7g{stroke:#5A2E8A;stroke-width:6}.f7g.on{stroke:#3A8A3A}.f7g.try{stroke:#E8817A;opacity:.7}
.f7zones{display:flex;gap:clamp(6px,2vmin,16px);justify-content:center;flex-wrap:wrap}
.f7z{width:clamp(96px,26vmin,170px);border-radius:20px;border:3px solid #E0D4F4;background:rgba(255,255,255,.94);padding:6px 6px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;color:#3A2A5A;animation:fade7 .4s backwards var(--dl)}
.f7z svg{width:100%;aspect-ratio:1;display:block}.f7z b{font-size:clamp(15px,3.4vmin,20px);font-weight:400}
.f7z.over{border-color:#FFB81C;box-shadow:0 0 0 4px #FFE27A}.f7z.win{border-color:#8FD08A;box-shadow:0 0 0 4px #DFF6D0}
.f7b1{fill:#EAF2FF}.f7b2{fill:#FFF7DE}.f7b3{fill:#F0FFF0}.f7hl{fill:#FFD98A;opacity:.55}
.g7wrap{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px auto}
.g7grid{display:grid;grid-template-columns:repeat(var(--c),clamp(44px,min(11vmin,15vw),76px));grid-template-rows:repeat(var(--r),clamp(44px,min(11vmin,15vw),76px));gap:3px;padding:6px;border-radius:18px;background:#9AD27A;box-shadow:inset 0 0 0 3px #6AA84E}
.g7c{position:relative;border-radius:10px;background:rgba(255,255,255,.55);display:grid;place-items:center;font-size:clamp(26px,6vmin,44px);border:0;padding:2px}
.g7c svg,.g7c .emoji{width:86%;height:86%}.g7an{background:#FFFFFF;cursor:pointer;animation:fade7 .4s backwards var(--dl)}
.g7s{background:#FFF0C0}.g7star{background:#FFF7D8}.g7step{box-shadow:inset 0 0 0 3px #FFB81C}
.g7me{position:absolute;inset:4%;display:grid;place-items:center;z-index:2;transition:transform .26s ease-in-out;pointer-events:none}.g7me svg{width:100%;height:100%}
.g7ar{font-size:clamp(18px,4vmin,26px);color:#FFFFFF;background:rgba(58,42,106,.7);padding:2px 14px;border-radius:999px;letter-spacing:.06em}
.o7wrap{display:flex;flex-direction:column;align-items:center;gap:4px;margin:6px auto;max-width:98%}
.o7ar{align-self:flex-start;font-size:clamp(22px,5vmin,34px);color:#FFE7B0;margin-left:4px}.o7ar.r{align-self:flex-end;margin-right:4px}
.o7row{display:flex;gap:clamp(2px,1vmin,8px);justify-content:center;flex-wrap:nowrap;padding:6px 8px;border-radius:18px;background:rgba(255,255,255,.82)}
.o7it{position:relative;width:clamp(30px,min(8.4vmin,9vw),64px);height:clamp(40px,min(11vmin,12vw),78px);border:0;border-radius:12px;background:transparent;display:grid;place-items:center;font-size:clamp(24px,min(6vmin,7.4vw),46px);padding:0;cursor:pointer;animation:fade7 .4s backwards var(--dl)}
.o7it svg,.o7it .emoji{width:100%;height:100%}.o7books .o7row{background:linear-gradient(#C89A6A,#A8784A);padding-bottom:10px}.o7it.o7ok{box-shadow:0 0 0 3px #8FD08A}
.o7it[data-n]::after{content:attr(data-n);position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#FFB81C;color:#fff;border-radius:999px;padding:0 6px;font-size:14px}
.h7tab{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:2px;width:min(96%,560px);margin:4px auto;padding:6px;border-radius:14px;background:rgba(255,255,255,.9)}
.h7c{aspect-ratio:1.25;border:1.5px solid #D8DEEA;border-radius:7px;background:#FFFFFF;color:#3A2A5A;display:grid;place-items:center;font:400 clamp(12px,min(2.7vmin,3.4vw),20px)/1 var(--latin,'Baloo 2',sans-serif);padding:0;cursor:pointer;min-width:0}
span.h7c{cursor:default}.h7c.q{background:#FFF0C0;border-color:#FFB81C;color:#C0567F;font-weight:700}.h7c.ok{background:#DFF6D0;border-color:#8FD08A}.h7c.h7nb{background:#EAF2FF;border-color:#6FB6FF}
.q7wrap{display:flex;align-items:flex-end;justify-content:center;gap:clamp(6px,2vmin,16px);flex-wrap:wrap;margin:6px auto;padding:8px 12px;border-radius:20px;background:rgba(255,255,255,.85);max-width:96%}
.q7board{display:flex;flex-direction:column;align-items:center;padding:4px 14px;border-radius:14px;background:#2A2A4A;color:#7CFFB0;box-shadow:inset 0 0 0 3px #4A4A7A}.q7board small{color:#C8C8E8;font-size:13px}.q7board b{font:700 clamp(26px,6vmin,40px)/1.1 var(--latin,'Baloo 2',sans-serif)}
.q7line{display:flex;gap:4px;align-items:flex-end;flex-wrap:wrap;justify-content:center}
.q7p{position:relative;display:flex;flex-direction:column;align-items:center;animation:fade7 .4s backwards var(--dl)}.q7p i{font-style:normal;font-size:clamp(26px,6vmin,42px);width:1.2em;height:1.2em;display:grid;place-items:center}.q7p i svg{width:100%;height:100%}
.q7p b{font:400 14px/1.2 var(--latin,'Baloo 2',sans-serif);background:#FFF;border:1.5px solid #C8B8E8;border-radius:6px;padding:0 5px;color:#5A3A7A}.q7p.hid{opacity:.12}
.q7p[data-n]::after{content:attr(data-n);position:absolute;top:-14px;background:#FFB81C;color:#fff;border-radius:999px;padding:0 6px;font-size:14px}
.q7me{display:flex;flex-direction:column;align-items:center}.q7me i{width:clamp(40px,9vmin,60px);height:clamp(40px,9vmin,60px)}.q7me i svg{width:100%;height:100%}
.q7tk{display:flex;flex-direction:column;align-items:center;padding:2px 10px;border-radius:10px;background:#FFF4C8;border:2px dashed #E8B84A;color:#6A3A1A}.q7tk small{font-size:12px}.q7tk b{font:700 clamp(22px,5vmin,32px)/1.1 var(--latin,'Baloo 2',sans-serif)}
.b7wrap{--u:clamp(20px,min(5.6vmin,7vw),34px);display:flex;gap:clamp(10px,4vmin,40px);justify-content:center;align-items:flex-end;margin:6px auto;padding:10px 16px 6px;border-radius:20px;background:rgba(255,255,255,.85);min-height:calc(var(--u)*var(--mx) + 20px)}
.b7fig{position:relative;display:flex;align-items:flex-end;gap:4px;border:0;background:none;padding:0;cursor:pointer;animation:fade7 .4s backwards var(--dl);border-radius:14px}
span.b7fig{cursor:default}.b7fig.b7ok{box-shadow:0 0 0 4px #8FD08A}
.b7col{display:flex;flex-direction:column-reverse;gap:0}.b7b{width:var(--u);height:var(--u);box-sizing:border-box;border:2px solid #C8862A;background:#FFC86A;border-radius:4px;display:block;position:relative}
.b7b:nth-child(2n){background:#FFB84A}.b7b[data-n]::after{content:attr(data-n);position:absolute;left:110%;top:0;color:#B3305E;font-size:14px;font-style:normal}
.b7an{display:block;height:calc(var(--u)*var(--h));width:calc(var(--u)*var(--h)*.86)}.b7an svg{width:100%;height:100%;display:block}
button.b7fig.tile{display:inline-flex}
.f7five .f7b{display:grid;place-items:center;padding:4px}.f7five .f7b svg{width:86%;height:86%}
@keyframes fade7{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.c7big,.f7card,.f7z,.g7an,.o7it,.q7p,.b7fig{animation:none}.g7me{transition:none}}`;document.head.appendChild(st);
}catch(e){console.log('newq7',e)}
}).toString()+')()')})();

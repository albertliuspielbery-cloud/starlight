
/* ================= m99zzzzzz_book19（1.9）收集冊 —— 星光工作室 2026-11-17（全部原創，著作權與 IP 屬於星光工作室） =================
 * 規格：doc/ch31_100_outline.md「收集冊改版（分頁架構）、獎狀牆」＋ 1.9 追加：一本可以一頁一頁翻的冊子。
 * 分頁：獎狀牆、徽章、圖鑑（動物朋友、昆蟲、寶物）、衣服和飾品、寵物、塗色作品。
 *  - 每頁上面「已收集 X／共 Y」；沒拿到的顯示剪影＋「完成第幾章就能拿到」或「再存幾顆寶石」（不顯示價格）。
 *  - 點已收集的：看大圖、聽名字（只念錄好的真人錄音；沒錄好就只顯示字，新台詞在 s52/lines_book19.tsv）。
 *  - 翻頁：左右滑、點 ◀ ▶、鍵盤左右鍵；動畫只用移動＋淡入（不用 scale）；減少動態時只淡入。
 *  - 手機一次一頁；寬螢幕橫放一次兩頁（攤開的書）。每頁放幾張卡依畫面大小自動算。
 * 資料全部讀現有的，不另外存一份：
 *  - 獎狀：CERTK／CERT3K／window.CERT{n}K（第 n 季，n≥4）＋ certShow／cert3Show／window.cert{n}Show；第 n 季在第 5n+10 章頒。
 *    標題：S{n}FIN.cert_title（有的話），沒有就用已知的表；徽章圖 S25BADGE／window.S{n}BADGE。之後的季照同樣命名就會自動出現。
 *  - 動物朋友、昆蟲：DEX＋dexMet()（第四欄寫 'bug' 的、或是已知的昆蟲代號，放「昆蟲」）。
 *  - 寶物、各季徽章（旅行紀念章、探險徽章、小管家徽章、小守護者徽章…）：直接用圖鑑「寶物收藏」畫出來的每一排（各季模組自己加的），
 *    所以之後的季在圖鑑加一排，收集冊也自動有（標題有「徽章」「紀念章」的放徽章頁，其他放圖鑑頁）。
 *  - 衣服、飾品、寵物：ITEMS＋owns()（App 沒打開的章節不列）。
 *  - 塗色作品：PICS＋塗色本存的顏色（S.colors）和畫（pp4paint），縮圖用 picSVG。
 * 存檔：只多 V2.cbTab（上次看的分頁）。
 * 入口：遊樂園「我的家」的「收集冊」卡（window.__gateExt.zones.cbook='home'），取代原本的「圖鑑」卡（家長 2026-11-17 同意）；
 *   圖鑑畫面（SCREENS.dex）和其他地方連到圖鑑的入口照舊。 */
(function(){try{
if(typeof SCREENS!=='object'||typeof DEX==='undefined')return;
const Q=(s,r)=>(r||document).querySelector(s),QA=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"'`]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
const pop=()=>{try{sfx('pop')}catch(e){}};
const isApp=()=>{try{return typeof IS_APP!=='undefined'&&!!IS_APP}catch(e){return false}};
const NCH=()=>CHAPTERS.length;
const cap=()=>{try{if(isApp()&&typeof window.__bkCap==='function')return window.__bkCap()}catch(e){}return NCH()};
const chOK=n=>n>=1&&n<=NCH()&&n<=cap();          // n：第幾章（從 1 算）
// 全域的 const／function（例如 S6FIN、cert6Show）：先看 window，再用全域範圍讀
const G=n=>{if(!/^[A-Za-z_$][\w$]*$/.test(n))return undefined;try{if(window[n]!==undefined)return window[n]}catch(e){}try{return (0,eval)(`typeof ${n}!=='undefined'?${n}:undefined`)}catch(e){return undefined}};

/* ---------- 語音：只念錄好的 ---------- */
const L={
 open:'這是你的收集冊！左右翻一翻，看看收集了什麼！',
 cert:'獎狀牆！',badge:'徽章！',dex:'圖鑑！',wear:'衣服和飾品！',pet:'寵物！',paint:'塗色作品！',
 lockCh:'還沒拿到喔，繼續冒險就會拿到！',lockGem:'再存一些寶石，就可以去換囉！',goWard:'寶石夠了，去換裝間換換看！',
 lockPlay:'繼續闖關，就有機會拿到喔！',goPaint:'這張還沒塗顏色，去塗色本畫畫看！',meet:'還沒遇到喔，繼續冒險就會遇到！',
 full:'這一頁全部收集好了，好厲害！',card:'收集冊，看看收集到的寶貝！'};
const ht=t=>{try{return typeof heroT==='function'?heroT(t):t}catch(e){return t}};
const hasZ=t=>{try{if(!t)return false;if(!S.vo)return true;if(typeof VO==='undefined'||!VO.idx)return false;const u=ht(t).replace(/⁠/g,'');return voHas('z|'+u)||voHas('z|'+voCk(u))}catch(e){return false}};
const hasE=t=>{try{if(!S.vo)return true;return ['e0','e1','e2'].some(p=>voHas(p+'|'+t))}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).map(p=>typeof p==='string'?(L[p]||p):p).filter(p=>p&&(typeof p==='string'?hasZ(p):p.en!=null?hasE(p.en):false));
 if(!a.length)return Promise.resolve(false);try{hush()}catch(e){}try{return Promise.resolve(say(a)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}

/* ---------- 圖示（m99zx7 同一套畫法：64×64、顯示裁成 3 2 58 58、左上亮右下暗的漸層＋深一階描邊＋白色高光＋淡紫影子） ---------- */
const GF={plum:'#6E4CC0',lilac:'#9E7AEE',gold:'#F2B036',cream:'#F2DFBA',pink:'#F27DB0',rose:'#E2504C',blue:'#5AA2EE',teal:'#36B2A0',sky:'#B4DEF8',navy:'#2C2674',silver:'#C2CADC',wood:'#C4824A'};
const g=k=>`url(#z7${k}) ${GF[k]||'#999'}`;
const sh=(w=48,y=58)=>`<ellipse cx="32" cy="${y}" rx="${w/2}" ry="2.6" fill="#3A2A7A" opacity=".16"/>`;
const hl=(d,w=1.8,o=.7)=>`<path d="${d}" stroke="#FFFFFF" stroke-width="${w}" fill="none" stroke-linecap="round" opacity="${o}"/>`;
const SV=(b,c='')=>`<svg viewBox="3 2 58 58" aria-hidden="true" class="z7i ${c}">${b}</svg>`;
const starD=(cx,cy,R,r)=>{let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r:R;d+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(1)+' '+(cy+Math.sin(a)*rr).toFixed(1)}return d+'Z'};
const IC={
 // 收集冊：紫色厚書、金色書角、中間金星徽章、粉紅書籤緞帶、右邊露出紙頁
 book:`${sh(50)}<path d="M14 10 H50 Q54 10 54 14 V52 Q54 56 50 56 H14Z" fill="#FFF8EA" stroke="#B08A50" stroke-width="1.1"/>
<path d="M50.6 13 V53 M52.4 14.4 V51.6" stroke="#E2CDA4" stroke-width=".9"/>
<path d="M9 8 H46 Q50 8 50 12 V52 Q50 56 46 56 H9 Q7 56 7 54 V10 Q7 8 9 8Z" fill="${g('plum')}" stroke="#3E2A86" stroke-width="1.4" stroke-linejoin="round"/>
<rect x="7" y="8" width="7" height="48" rx="2" fill="#4A3290"/><path d="M10.5 12 V52" stroke="#8C70E0" stroke-width="1" opacity=".7"/>
<path d="M50 8 V16 L42 8Z M50 56 V48 L42 56Z" fill="${g('gold')}" stroke="#A0701E" stroke-width=".9" stroke-linejoin="round"/>
<rect x="18" y="14" width="26" height="36" rx="4" fill="none" stroke="${g('gold')}" stroke-width="1.6" opacity=".9"/>
<circle cx="31" cy="30" r="9.4" fill="${g('gold')}" stroke="#A0701E" stroke-width="1.2"/><path d="${starD(31,30.6,6,2.6)}" fill="#FFF6C8" stroke="#C8901E" stroke-width=".7" stroke-linejoin="round"/>
<path d="M24 44 H38" stroke="${g('gold')}" stroke-width="2" stroke-linecap="round"/>
<path d="M38 6 V24 L41.5 20.6 L45 24 V6Z" fill="${g('pink')}" stroke="#C83E78" stroke-width="1" stroke-linejoin="round"/>
${hl('M17 12 Q22 10.6 28 11',1.8,.6)}<path d="M54 30 l1.4 -3.4 l1.4 3.4 l3.4 1.4 l-3.4 1.4 l-1.4 3.4 l-1.4 -3.4 l-3.4 -1.4Z" fill="#FFF07A" stroke="#E8B830" stroke-width=".6"/>`,
 // 獎狀牆：金色畫框裡的獎狀＋紅色印章
 cert:`${sh(48)}<rect x="7" y="9" width="50" height="42" rx="4" fill="${g('gold')}" stroke="#A0701E" stroke-width="1.4"/>
<rect x="12" y="14" width="40" height="32" rx="2" fill="#FFF8EA" stroke="#C8A060" stroke-width="1"/>
<rect x="20" y="17" width="24" height="6" rx="3" fill="${g('rose')}"/><path d="M18 28.5 H46 M18 33 H40 M18 37.5 H36" stroke="#C8B08A" stroke-width="1.8" stroke-linecap="round"/>
<circle cx="44" cy="40" r="6.4" fill="${g('rose')}" stroke="#A8303A" stroke-width="1"/><path d="${starD(44,40.4,3.8,1.6)}" fill="#FFE27A"/>
<path d="M32 4 L26 9 M32 4 L38 9" stroke="#8A6A3A" stroke-width="1.4" stroke-linecap="round"/><circle cx="32" cy="4.4" r="1.6" fill="#8A6A3A"/>${hl('M10 12 H22',1.6,.6)}`,
 // 徽章：雙色緞帶＋金色獎牌
 badge:`${sh(36)}<path d="M20 4 H30 L36 24 H26Z" fill="${g('blue')}" stroke="#2E62A8" stroke-width="1.1" stroke-linejoin="round"/><path d="M44 4 H34 L28 24 H38Z" fill="${g('pink')}" stroke="#C83E78" stroke-width="1.1" stroke-linejoin="round"/>
<circle cx="32" cy="38" r="16" fill="${g('gold')}" stroke="#A0701E" stroke-width="1.5"/><circle cx="32" cy="38" r="11.6" fill="none" stroke="#C8901E" stroke-width="1" stroke-dasharray="2.4 2"/>
<path d="${starD(32,38.6,8.6,3.8)}" fill="#FFF6C8" stroke="#C8901E" stroke-width=".8" stroke-linejoin="round"/>${hl('M22 31 Q25 26.4 30 25.4',2,.7)}`,
 // 衣服和飾品：蓬蓬裙＋小皇冠
 wear:`${sh(44)}<path d="M25 16 Q32 21 39 16 L41 30 Q51 42 54 54 Q32 60 10 54 Q13 42 23 30Z" fill="${g('pink')}" stroke="#C83E78" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M23 30 Q32 34 41 30" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".8"/><path d="M18 46 Q22 50 26 46 Q30 50 34 46 Q38 50 42 46 Q46 50 48 47" stroke="#FFD3E6" stroke-width="1.6" fill="none"/>
<path d="M26 16 Q25 10 28 8 M38 16 Q39 10 36 8" stroke="#C83E78" stroke-width="1.6" fill="none" stroke-linecap="round"/>
<path d="M42 12 L45 4 L48.6 9 L52 3 L54 12Z" fill="${g('gold')}" stroke="#A0701E" stroke-width="1" stroke-linejoin="round"/><circle cx="48.4" cy="9.6" r="1.3" fill="#FF6F91"/>${hl('M24 34 Q19 42 16 50',1.8,.6)}`};
const parkIc=k=>{try{if(window.__z7&&typeof __z7.parkIcon==='function'){const s=__z7.parkIcon(k);if(s)return s}}catch(e){}return ''};
const MED=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#E8505A"/><circle cx="50" cy="50" r="36" fill="none" stroke="#FFE7B0" stroke-width="3" stroke-dasharray="4 4"/><path d="${starD(50,50,22,10)}" fill="#FFE27A"/></svg>`;

/* ---------- 資料 ---------- */
const CN=n=>{const D='零一二三四五六七八九';if(n<=10)return n===10?'十':D[n];if(n<20)return '十'+(n%10?D[n%10]:'');return D[Math.floor(n/10)]+'十'+(n%10?D[n%10]:'')};
// 沒拿到的提示（畫面上用的字，不出現價格）
const H={ch:n=>`完成第 ${n} 章|就能拿到`,gem:n=>`再存 ${n} 顆|寶石`,gemok:()=>'寶石夠了|去換裝間換',play:()=>'繼續闖關|就能拿到',paint:()=>'去塗色本|畫一張',meet:()=>'繼續冒險|就會遇到'};
const hTxt=t=>t.replace('|','');const hHTML=t=>t.split('|').map(esc).join('<br>');
const HV={ch:'lockCh',gem:'lockGem',gemok:'goWard',play:'lockPlay',paint:'goPaint',meet:'meet'};
// 獎狀
const TITLES={2:'星光小勇士',3:'星光小幫手',4:'星光太空探險隊',5:'星光小管家',6:'大自然小守護者'};
function certList(){const out=[];
 try{if(isApp()&&typeof f3cert==='function'&&chOK(5)){const got=!!V2.f3cert1||S.chDone>=5;out.push({k:'cert1',name:'星光小探險家',sub:'第一段',ch:5,got,pic:MED,open:()=>f3cert()})}}catch(e){}
 for(let n=2;n<=40;n++){try{
  const kf=n===2?(typeof CERTK==='function'?CERTK:null):n===3?(typeof CERT3K==='function'?CERT3K:null):G('CERT'+n+'K');
  const sf=n===2?(typeof certShow==='function'?certShow:null):n===3?(typeof cert3Show==='function'?cert3Show:null):G('cert'+n+'Show');
  if(typeof kf!=='function'||typeof sf!=='function')continue;
  const ch=5*n+10;const v=V2[kf()];const got=!!(v&&!v.t93);if(!got&&!chOK(ch))continue;if(got&&isApp()&&ch>cap())continue;
  const fin=G('S'+n+'FIN');const name=(fin&&fin.cert_title)||TITLES[n]||`第${CN(n)}季獎狀`;
  const bf=n===2?null:n===3?(typeof S25BADGE==='function'?S25BADGE:null):G('S'+n+'BADGE');let pic=MED;try{if(typeof bf==='function')pic=bf()||MED}catch(e){}
  out.push({k:'cert'+n,name,sub:`第${CN(n)}季`,ch,got,pic,open:()=>sf()})}catch(e){console.log('b19 cert',n,e)}}
 return out}
// 圖鑑「寶物收藏」每一排（各季自己加的）：畫一次圖鑑、把每一排拿出來（不念、不出聲）
function harvest(){const rows=[];const s0=say,f0=sfx;
 try{say=()=>Promise.resolve();sfx=()=>{};SCREENS.dex('tre');
  QA('#dbody .trow',screen).forEach((r,ri)=>{if(r.style.display==='none'||r.hidden)return;const h=Q('h3',r);const ic=h&&Q('svg',h);const title=h?h.textContent.trim():'';
   const items=QA('.titem',r).filter(b=>b.style.display!=='none'&&!b.hidden).map((b,j)=>{const c=+b.dataset.c;const ok=!b.classList.contains('unk');
    if(!ok&&Number.isFinite(c)&&!chOK(c+1))return null;
    return {k:'tr'+ri+'_'+j,el:b,got:ok,name:ok?((Q('small',b)||{}).textContent||'').trim():'',pic:(Q('.tpic',b)||{}).innerHTML||'',hint:Number.isFinite(c)?['ch',c+1]:['play'],kind:b.dataset.kind||''}}).filter(Boolean);
   if(items.length)rows.push({title,ic:ic?ic.outerHTML:'',items,badge:/徽章|紀念章/.test(title)})})}
 catch(e){console.log('b19 harvest',e)}finally{say=s0;sfx=f0}
 try{screen.innerHTML=''}catch(e){}
 return rows}
// 動物朋友、昆蟲
const BUGS=new Set(['butterfly','bee','ladybug','ant','dragonfly','firefly','beetle','stagbeetle','cicada','mantis','cricket','grasshopper','caterpillar','bug','moth','snail']);
function dexItems(){let met=new Set();try{met=dexMet()}catch(e){}
 const first=k=>{try{return CHAPTERS.findIndex(c=>(c.levels||[]).some(l=>l.helper===k))+1}catch(e){return 0}};
 const ani=[],bug=[];DEX.forEach(d=>{const [k,zh,en,cat]=d;const got=met.has(k);const n=first(k);if(!got&&n>0&&!chOK(n))return;
  const it={k:'dx_'+k,got,name:zh,en,pic:(()=>{try{return animal(k)}catch(e){return ''}})(),hint:n>0?['ch',n]:['meet'],voice:[zh+'。',{en:en+'.',slow:1}],meetV:1};
  (cat==='bug'||cat==='insect'||BUGS.has(k)?bug:ani).push(it)});
 return {ani,bug}}
// 衣服、飾品、寵物
const hintOf=it=>{if(it.chapter&&S.chDone<it.chapter)return ['ch',it.chapter];if(+it.price>0){const need=+it.price-(+S.wallet||0);return need>0?['gem',need]:['gemok']}return ['play']};
const vis=it=>{if(owns(it.id))return true;if(it.chapter&&!chOK(it.chapter))return false;if(it.hide||it.hidden)return false;return true};
function itemCard(it){const pet=it.slot==='pet'||it.slot==='petacc';
 const base=()=>{try{return typeof PETANI!=='undefined'&&PETANI[S.look.pet]?'unicorn':S.look.pet}catch(e){return 'unicorn'}};
 const draw=big=>{try{if(it.slot==='pet')return still(petSVG(it.id,''));if(it.slot==='petacc')return still(petSVG(base(),it.id));
   return still(big?princess({...S.look,[it.slot]:it.id}):princess({...S.look,[it.slot]:it.id},'',VB[it.slot]))}catch(e){return ''}};
 return {k:'it_'+it.id,got:owns(it.id),name:it.name,lazy:()=>draw(false),big:()=>draw(true),hint:hintOf(it),voice:[it.name],pet}}
function wearGroups(){const A=['neck','ear','clip','back','wrist'];const boy=typeof ISBOY!=='undefined'&&ISBOY;
 const G0=[[boy?'衣服':'裙子',i=>i.slot==='dress'],[boy?'帽子和頭飾':'頭飾',i=>i.slot==='head'],['飾品',i=>A.includes(i.slot)],['鞋子',i=>i.slot==='shoe'],['道具',i=>i.slot==='prop']];
 return G0.map(([t,f])=>({title:t,items:ITEMS.filter(f).filter(vis).map(itemCard)})).filter(x=>x.items.length)}
function petGroups(){return [['寵物',i=>i.slot==='pet'],['寵物小物',i=>i.slot==='petacc']].map(([t,f])=>({title:t,items:ITEMS.filter(f).filter(vis).map(itemCard)})).filter(x=>x.items.length)}
// 塗色作品
function paintItems(){let P={};try{P=paintGet()||{}}catch(e){}
 return PICS.map((p,i)=>({p,i})).filter(({p})=>p&&p.r&&!/空白/.test(p.n||'')&&!p.blank).filter(({p,i})=>{const done=!!P[i]||Object.keys((S.colors||{})[i]||{}).length>0;return done||!p.ch||chOK(p.ch)}).map(({p,i})=>{
  const done=!!P[i]||Object.keys((S.colors||{})[i]||{}).length>0;const open=!p.ch||S.chDone>=p.ch;
  return {k:'pc_'+i,got:done,name:p.n,lazy:()=>{try{return done?picSVG(i,true):picSVG(i,false,'line')}catch(e){return ''}},big:()=>{try{return picSVG(i,true)}catch(e){return ''}},hint:open?['paint']:['ch',p.ch],voice:[p.n],line:open}})}

/* ---------- 分頁（之後要加分頁：window.__book19.add({id,n,ic,line,groups:()=>[{title,items}]})） ---------- */
let HV0=null;
const SECS=[
 {id:'cert',n:'獎狀牆',ic:()=>SV(IC.cert),line:'cert',big:1,groups:()=>[{title:'獎狀',items:certList().map(c=>({...c,hint:['ch',c.ch]}))}]},
 {id:'badge',n:'徽章',ic:()=>SV(IC.badge),line:'badge',groups:()=>{const C=certList().filter(c=>c.k!=='cert1');
   const out=[{title:'每一季的徽章',items:C.map(c=>({k:'bd_'+c.k,got:c.got,name:c.name+'徽章',voice:[c.name],pic:c.pic,hint:['ch',c.ch]}))}];
   (HV0||[]).filter(r=>r.badge).forEach(r=>out.push({title:r.title,ic:r.ic,items:r.items}));return out.filter(x=>x.items.length)}},
 {id:'dex',n:'圖鑑',ic:()=>parkIc('dex')||SV(IC.badge),line:'dex',groups:()=>{const d=dexItems();const out=[{title:'動物朋友',items:d.ani}];if(d.bug.length)out.push({title:'昆蟲',items:d.bug});
   (HV0||[]).filter(r=>!r.badge).forEach(r=>out.push({title:r.title,ic:r.ic,items:r.items}));return out.filter(x=>x.items.length)}},
 {id:'wear',n:'衣服和飾品',t:'衣服飾品',ic:()=>SV(IC.wear),line:'wear',groups:wearGroups},
 {id:'pet',n:'寵物',ic:()=>parkIc('pethouse')||SV(IC.badge),line:'pet',groups:petGroups},
 {id:'paint',n:'塗色作品',ic:()=>parkIc('coloring')||SV(IC.badge),line:'paint',groups:()=>[{title:'塗色作品',items:paintItems()}]}];
const EXTRA=[];window.__book19={add(s){if(s&&s.id&&typeof s.groups==='function'&&!SECS.concat(EXTRA).some(x=>x.id===s.id))EXTRA.push(s)},secs:()=>SECS.concat(EXTRA),L,cert:certList};

/* ---------- 畫面 ---------- */
const B={sec:0,view:0,views:[],data:null,busy:0,moved:0};
const allSecs=()=>SECS.concat(EXTRA);
function loadData(){HV0=harvest();B.data=allSecs().map(s=>{let gs=[];try{gs=s.groups()||[]}catch(e){console.log('b19 sec',s.id,e)}
 const items=gs.flatMap(x=>x.items);return {s,gs,got:items.filter(i=>i.got).length,tot:items.length}})}
function geom(){const st=Q('#cbstage');if(!st)return null;const W=st.clientWidth,Hh=st.clientHeight;const two=W>=760&&W>Hh*1.15;return {W,H:Hh,two,pw:two?(W-28)/2:W}}
function capFor(sec,gm){const pad=14,head=gm.H<380?42:58;const w=gm.pw-pad*2,h=gm.H-pad*2-head-4;const big=sec.s.big;
 const minW=big?(gm.pw<420?136:168):(gm.pw<360?84:gm.pw<460?94:112),gap=8;const cols=Math.max(big?1:2,Math.floor((w+gap)/(minW+gap)));
 const cw=(w-(cols-1)*gap)/cols;const hh=gm.H<380?20:24;const hd0=sec.gs.length>1||sec.gs.some(x=>x.ic)?hh+gap:0;let chh=Math.min(cw*(big?1.02:1.22),big?230:170);chh=Math.max(Math.min(chh,h-hd0),Math.min(70,h-hd0));
 // 排得下幾排就把卡片拉高填滿（最多原本的 1.25 倍），頁面下面不要留一大塊空白
 const hd=sec.gs.length>1||sec.gs.some(x=>x.ic)?hh+gap:0;const rows=Math.max(1,Math.floor((h-hd+gap)/(chh+gap)));chh=Math.max(chh,Math.min((h-hd-(rows-1)*gap)/rows-1,chh*1.25));
 return {cols,cw,chh,h,gap,hh}}
const showHd=(d,gr)=>d.gs.length>1||!!gr.ic;
function paginate(){const gm=geom();if(!gm)return;B.gm=gm;const per=gm.two?2:1;B.views=[];
 B.data.forEach((d,si)=>{const cp=capFor(d,gm);d.cp=cp;const pages=[];let pg=null,rem=0;
  const newPg=()=>{pg={segs:[],items:[]};pages.push(pg);rem=cp.h};
  newPg();
  d.gs.forEach(gr=>{const hd=showHd(d,gr)?cp.hh+cp.gap:0;let seg=null;
   for(let i=0;i<gr.items.length;i+=cp.cols){const row=gr.items.slice(i,i+cp.cols);
    if(!seg){if(rem<hd+cp.chh&&pg.items.length)newPg();seg={gr,items:[]};pg.segs.push(seg);rem-=hd}
    else if(rem<cp.chh){newPg();seg={gr,items:[]};pg.segs.push(seg);rem-=hd}
    seg.items.push(...row);pg.items.push(...row);rem-=cp.chh+cp.gap}
   if(!gr.items.length&&!seg){pg.segs.push({gr,items:[]})}});
  d.first=B.views.length;for(let i=0;i<pages.length;i+=per)B.views.push({si,pages:pages.slice(i,i+per)});d.last=B.views.length-1})}
const cntHTML=d=>`<span class="cbcnt">已收集 <b>${d.got}</b>／共 ${d.tot}</span>`;
function cardHTML(it,d,ix){const big=!!d.s.big;const h=it.hint||['play'];const ht=H[h[0]]?H[h[0]](h[1]):'';
 const pic=it.pic!=null&&typeof it.pic==='string'?it.pic:'';
 if(big)return `<button class="cbc cbcert${it.got?'':' no'}" data-ix="${ix}" type="button" aria-label="${esc(it.got?it.name:hTxt(ht))}" style="--dl:${(ix*.04).toFixed(2)}s"><span class="cbfr"><span class="cbpaper"><i class="cbrib">獎　狀</i><span class="cbbd">${pic}</span><b>${esc(it.name)}</b></span></span><small>${esc(it.got?it.sub||'':hTxt(ht))}</small></button>`;
 return `<button class="cbc${it.got?'':' no'}${it.line?' line':''}" data-ix="${ix}" type="button" aria-label="${esc(it.got?it.name:hTxt(ht))}" style="--dl:${(ix*.03).toFixed(2)}s"><span class="cbp">${pic}</span>${it.got?`<b>${esc(it.name)}</b>`:`<small><i class="cbhi cbh_${h[0]}"></i><span>${hHTML(ht)}</span></small>`}</button>`}
function pageHTML(v,pg,k){const d=B.data[v.si];if(!pg)return `<div class="cbpg cbblank"><span class="cbor">${SV(IC.book)}</span></div>`;
 const full=d.tot&&d.got===d.tot;let ix=0;
 const segH=sg=>{const gr=sg.gr;const gc=gr.items.filter(i=>i.got).length;return `<div class="cbgt">${gr.ic||''}<span>${esc(gr.title)}</span><em>${gc}／${gr.items.length}</em></div>`};
 return `<div class="cbpg" data-p="${k}"><div class="cbhd"><b class="cbsn">${esc(d.s.n)}</b>${full?'<i class="cbfull">全部收集好了！</i>':''}${cntHTML(d)}</div>
  <div class="cbgrid" style="--cols:${d.cp.cols};--ch:${Math.floor(d.cp.chh)}px;--hh:${d.cp.hh}px">${pg.segs.map(sg=>(showHd(d,sg.gr)?segH(sg):'')+sg.items.map(it=>cardHTML(it,d,ix++)).join('')).join('')}${pg.items.length?'':'<p class="cbempty">這裡還沒有東西喔！</p>'}</div></div>`}
function fillLazy(el){QA('.cbc',el).forEach(b=>{const it=b.__it;if(!it||!it.lazy)return;const p=Q('.cbp',b);if(p&&!p.firstChild){const draw=()=>{if(b.isConnected)p.innerHTML=it.lazy()};draw()}})}
function viewEl(i){const v=B.views[i];const el=document.createElement('div');el.className='cbview'+(B.gm.two?' two':'');
 el.innerHTML=v.pages.map((pg,k)=>pageHTML(v,pg,k)).join('')+(B.gm.two&&v.pages.length<2?pageHTML(v,null,1):'')+(B.gm.two?'<i class="cbspine" aria-hidden="true"></i>':'');
 QA('.cbpg[data-p]',el).forEach(pe=>{const pg=v.pages[+pe.dataset.p];QA('.cbc',pe).forEach(b=>{b.__it=pg.items[+b.dataset.ix];b.onclick=e=>{if(B.moved){e.preventDefault();return}tap(b,b.__it)}})});
 return el}
function navUpd(){const v=B.views[B.view];if(!v)return;const d=B.data[v.si];
 QA('.cbtab').forEach(t=>{const on=+t.dataset.s===v.si;t.setAttribute('aria-selected',on);t.classList.toggle('on',on)});
 const n=d.last-d.first+1,k=B.view-d.first;const dots=Q('#cbdots');
 if(dots)dots.innerHTML=n<=1?'':n<=9?Array.from({length:n},(_,i)=>`<i class="${i===k?'on':''}"></i>`).join(''):`<span>${k+1}／${n}</span>`;
 const pv=Q('#cbprev'),nx=Q('#cbnext');if(pv)pv.disabled=B.view<=0;if(nx)nx.disabled=B.view>=B.views.length-1;
 try{V2.cbTab=allSecs()[v.si].id}catch(e){}}
function showView(i,dir){i=Math.max(0,Math.min(B.views.length-1,i));const st=Q('#cbstage');if(!st)return;
 const old=Q('.cbview',st);const el=viewEl(i);const prevSi=B.views[B.view]?B.views[B.view].si:-1;B.view=i;
 if(old&&dir&&!RM()){el.classList.add(dir>0?'infr':'infl');old.classList.add(dir>0?'outl':'outr');old.style.pointerEvents='none';st.appendChild(el);setTimeout(()=>{try{old.remove()}catch(e){}},300)}
 else{if(old)old.remove();if(dir&&RM())el.classList.add('infade');st.appendChild(el)}
 fillLazy(el);navUpd();const si=B.views[i].si;if(dir&&si!==prevSi)sayR([allSecs()[si].line||''])}
function flip(d){if(B.busy)return;const n=B.view+d;if(n<0||n>=B.views.length){const st=Q('#cbstage .cbview');if(st&&!RM()){st.classList.remove('nudge','nudgel');void st.offsetWidth;st.classList.add(d>0?'nudge':'nudgel')}return}
 B.busy=1;setTimeout(()=>B.busy=0,260);pop();showView(n,d)}
function tab(si){const d=B.data[si];if(!d)return;pop();const dir=d.first>B.view?1:d.first<B.view?-1:0;if(dir)showView(d.first,dir);sayR([allSecs()[si].line||''])}
/* ---------- 點卡片 ---------- */
function shake(b){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}
function tap(b,it){if(!it)return;
 if(!it.got){shake(b);pop();const h=(it.hint||['play'])[0];sayR([it.meetV&&h==='ch'?'meet':HV[h]||'lockPlay']);return}
 if(it.open){try{hush()}catch(e){}pop();it.open();return}
 if(it.el){// 圖鑑寶物排的原本按鈕：放進大圖裡，點一下（原本的聲音、動畫）
  if(it.kind==='letter'){const hold=Q('#cbhold')||document.body;hold.appendChild(it.el);try{it.el.click()}catch(e){}return}
  const ov=big(it,'');const slot=Q('.cbbigpic',ov);slot.innerHTML='';it.el.classList.add('cbtr');slot.appendChild(it.el);setTimeout(()=>{try{if(it.el.isConnected)it.el.click()}catch(e){}},RM()?0:180);return}
 try{sfx('gem')}catch(e){}big(it,it.big?it.big():it.pic||'');sayR(it.voice||[it.name])}
function big(it,pic){const ov=overlay(screen,`<div class="card cbbig" role="dialog" aria-label="${esc(it.name)}"><button class="xclose" type="button" aria-label="關閉">✕</button>
  <div class="cbbigpic${it.k&&it.k.startsWith('pc_')?' sq':''}">${pic}</div><h2>${esc(it.name)}</h2>${it.en?`<p class="cben">${esc(it.en)}</p>`:''}
  <div class="row">${it.voice?'<button class="btn2 cbspk" type="button" aria-label="再聽一次">🔊 再聽一次</button>':''}<button class="btn cbok" type="button">好</button></div></div>`);
 ov.classList.add('cb19ov');const close=()=>{try{hush()}catch(e){}ov.remove()};Q('.xclose',ov).onclick=close;Q('.cbok',ov).onclick=()=>{pop();close()};
 ov.addEventListener('click',e=>{if(e.target===ov)close()});const sp=Q('.cbspk',ov);if(sp)sp.onclick=()=>sayR(it.voice);
 try{if(!RM())burstEl(Q('.cbbigpic',ov),18)}catch(e){}return ov}
/* ---------- 滑動 ---------- */
function swipe(st){let x0=0,y0=0,on=0,id=null;
 st.addEventListener('pointerdown',e=>{if(e.button>0)return;on=1;id=e.pointerId;x0=e.clientX;y0=e.clientY;B.moved=0},{passive:true});
 st.addEventListener('pointermove',e=>{if(!on||e.pointerId!==id)return;const dx=e.clientX-x0,dy=e.clientY-y0;if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)){B.moved=1;const v=Q('.cbview:last-child',st);if(v&&!RM())v.style.transform=`translateX(${Math.max(-60,Math.min(60,dx*.35)).toFixed(1)}px)`}},{passive:true});
 const end=e=>{if(!on||(e&&e.pointerId!==id))return;on=0;const dx=(e?e.clientX:x0)-x0,dy=(e?e.clientY:y0)-y0;const v=Q('.cbview:last-child',st);if(v)v.style.transform='';
  if(B.moved&&Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.2)flip(dx<0?1:-1);setTimeout(()=>{B.moved=0},40)};
 st.addEventListener('pointerup',end);st.addEventListener('pointercancel',()=>{on=0;const v=Q('.cbview:last-child',st);if(v)v.style.transform='';setTimeout(()=>{B.moved=0},40)})}
let kbd=null,rsz=null;
SCREENS.cbook=function(){
 loadData();
 screen.innerHTML=`<div class="park cb19">${parkHead('收集冊')}
  <div class="cbtabs" role="tablist">${allSecs().map((s,i)=>`<button class="cbtab" role="tab" data-s="${i}" type="button" style="--dl:${(i*.05).toFixed(2)}s"><span class="cbti">${s.ic()}</span><b>${esc(s.t||s.n)}</b></button>`).join('')}</div>
  <div class="cbbook"><div class="cbstage" id="cbstage"></div>
   <div class="cbnav"><button class="cbarr" id="cbprev" type="button" aria-label="上一頁"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 L8 12 L15 19" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <div class="cbdots" id="cbdots" aria-hidden="true"></div>
    <button class="cbarr" id="cbnext" type="button" aria-label="下一頁"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5 L16 12 L9 19" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></div>
  <div id="cbhold" hidden></div></div>`;
 bindBack();
 QA('.cbtab').forEach(t=>t.onclick=()=>tab(+t.dataset.s));Q('#cbprev').onclick=()=>flip(-1);Q('#cbnext').onclick=()=>flip(1);
 swipe(Q('#cbstage'));
 paginate();let si=Math.max(0,allSecs().findIndex(s=>s.id===V2.cbTab));if(!B.data[si])si=0;B.view=0;showView(B.data[si].first,0);
 if(kbd)removeEventListener('keydown',kbd);kbd=e=>{if(S.screen!=='cbook'||$$('.overlay').length)return;if(e.key==='ArrowRight'){e.preventDefault();flip(1)}else if(e.key==='ArrowLeft'){e.preventDefault();flip(-1)}};addEventListener('keydown',kbd);
 if(!rsz){let t=0;rsz=()=>{clearTimeout(t);t=setTimeout(()=>{if(S.screen!=='cbook'||!Q('#cbstage'))return;const v=B.views[B.view];const keep=v?v.si:0;paginate();const d=B.data[keep];showView(d?d.first:0,0)},180)};addEventListener('resize',rsz)}
 sayR(['open'])};
window.__book19.reload=()=>{if(S.screen==='cbook')SCREENS.cbook()};
window.__book19.state=B;
try{PARKS.push('cbook')}catch(e){}

/* ---------- 遊樂園「我的家」：收集冊卡片 ---------- */
// 卡片「點一下先念」那句（m73）還沒錄好時，只念後半句，不用裝置內建語音
{const _s=say;say=function(parts){try{if(Array.isArray(parts)&&parts[0]===L.card.replace(/！$/,'')+'！'&&!hasZ(L.card))parts=parts.slice(1)}catch(e){}return _s.apply(this,[parts].concat([].slice.call(arguments,1)))}}
// 收集冊卡片要在大門（m99zx4）分區、做「繼續玩」之前就放好；原本的「圖鑑」卡拿掉（收集冊已含圖鑑；圖鑑畫面 SCREENS.dex 和別處的入口都保留）。
// m99zx4 包的 SCREENS.park 在畫完卡片後、分區之前一定會讀 window.__gateExt（tag()→EXT()），所以在這個讀取點把卡片換好。
function cardFix(){try{const g=Q('#screen>.park>.pgrid');if(!g||g.__b19)return;g.__b19=1;
  const dx=Q('.pcard[data-k="dex"]',g);
  if(!Q('.pcard[data-k="cbook"]',g)){const b=document.createElement('button');b.className='pcard';b.dataset.k='cbook';b.dataset.z7='1';
   b.innerHTML=`<span class="pic">${SV(IC.book)}</span><b>收集冊</b><span>看看收集到的寶貝</span>`;b.onclick=()=>{pop();go('cbook')};
   if(dx)dx.after(b);else g.appendChild(b)}
  if(dx)dx.remove()}catch(e){console.log('b19 card',e)}}
{let X=window.__gateExt||{};X.zones=Object.assign({},X.zones||{},{cbook:'home'});
 try{Object.defineProperty(window,'__gateExt',{configurable:true,get(){cardFix();return X},set(v){X=v&&typeof v==='object'?v:{};X.zones=Object.assign({},X.zones||{},{cbook:'home'})}})}catch(e){window.__gateExt=X}}
// 保險：萬一大門沒讀到（例如大門關掉），畫完遊樂園再補一次
const _pk=SCREENS.park;
SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const g=Q('#screen>.park>.pgrid');if(g&&!g.__b19){cardFix();const b=Q('.pcard[data-k="cbook"]',g);if(b){b.dataset.gz='home';if(!(window.__gate&&__gate.cur==='home'))b.classList.add('gzoff')}}}catch(e){console.log('b19 park',e)}return r};

/* ---------- 樣式 ---------- */
const css=`
#b19bg{position:fixed;inset:0;z-index:0;pointer-events:none;display:none;background:radial-gradient(120% 80% at 50% 0%,#F7E2C2 0%,#E8C08C 55%,#C88A54 100%)}
#b19bg::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(120,70,30,.06) 0 2px,transparent 2px 46px),repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 9px)}
body[data-scr="cbook"] #b19bg{display:block}body[data-scr="cbook"] #sky{visibility:hidden}
.park.cb19{overflow:hidden!important;display:flex;flex-direction:column;gap:6px;padding:0 4px max(6px,env(safe-area-inset-bottom))}
.cb19 .phead .gtitle{color:#4A2E6E;text-shadow:0 2px 0 #FFF4DE}
.cbtabs{display:flex;gap:6px;justify-content:center;padding:2px 2px 0;flex:none;position:relative;z-index:2}
.cbtab{flex:1 1 0;max-width:118px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:1px;padding:6px 2px 7px;border:0;border-radius:16px 16px 6px 6px;font:inherit;color:#4A2E6E;cursor:pointer;
 background:linear-gradient(180deg,#FFF6E4,#F2DDB8);box-shadow:inset 0 2px 0 rgba(255,255,255,.8),0 3px 0 #C89A62;transform:translateY(5px);transition:transform .2s ease,background .2s ease;animation:cbtabin .35s ease backwards;animation-delay:var(--dl)}
.cbtab .cbti{width:clamp(30px,8vw,46px);height:clamp(30px,8vw,46px);display:block}.cbtab .cbti svg{width:100%;height:100%;display:block}
.cbtab b{font-size:clamp(11px,2.9vw,15px);font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;line-height:1.25}
.cbtab.on{transform:translateY(0);background:linear-gradient(180deg,#FFFFFF,#FFF3D6);box-shadow:inset 0 2px 0 #fff,0 0 0 3px #F2B036,0 5px 14px rgba(120,70,20,.35)}
.cbtab.on b{color:#7A3E9E}
@keyframes cbtabin{from{opacity:0;transform:translateY(14px)}}
.cbbook{flex:1;min-height:0;display:flex;flex-direction:column;position:relative;border-radius:22px;padding:10px 10px 6px;
 background:linear-gradient(160deg,#7C5CD6,#4A3290 70%);box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -4px 0 rgba(0,0,0,.25),0 10px 24px rgba(70,40,20,.35)}
.cbbook::before,.cbbook::after{content:'';position:absolute;width:26px;height:26px;background:linear-gradient(135deg,#FFE9A8,#E0A43A);pointer-events:none}
.cbbook::before{left:0;top:0;border-radius:22px 0 26px 0}.cbbook::after{right:0;top:0;border-radius:0 22px 0 26px}
.cbstage{flex:1;min-height:0;position:relative;overflow:hidden;border-radius:14px;touch-action:pan-y}
.cbview{position:absolute;inset:0;display:flex;gap:28px;will-change:transform,opacity;transition:transform .18s ease}
.cbview.two{gap:28px}
.cbspine{position:absolute;left:50%;top:0;bottom:0;width:28px;margin-left:-14px;background:linear-gradient(90deg,rgba(60,30,90,.0),rgba(60,30,90,.35) 40%,rgba(60,30,90,.35) 60%,rgba(60,30,90,0));pointer-events:none}
.cbview.two::before{content:'';position:absolute;left:calc(50% - 14px);top:0;bottom:0;width:28px;background:#5A3EA8}
.cbpg{flex:1 1 0;min-width:0;position:relative;display:flex;flex-direction:column;padding:12px 14px 10px;box-sizing:border-box;border-radius:12px;
 background:linear-gradient(180deg,#FFFDF6,#FFF3DC);box-shadow:inset 0 0 0 1px #E8D2A8,inset -6px 0 10px rgba(160,110,50,.12);color:#3D2C5E;
 background-image:radial-gradient(circle,rgba(180,140,90,.16) 1px,transparent 1.4px),linear-gradient(180deg,#FFFDF6,#FFF3DC);background-size:18px 18px,100% 100%}
.cbview.two .cbpg:first-child{border-radius:12px 4px 4px 12px;box-shadow:inset 0 0 0 1px #E8D2A8,inset -14px 0 16px rgba(120,80,40,.16)}
.cbview.two .cbpg:nth-child(2){border-radius:4px 12px 12px 4px;box-shadow:inset 0 0 0 1px #E8D2A8,inset 14px 0 16px rgba(120,80,40,.16)}
.cbblank{display:grid;place-items:center}.cbblank .cbor{width:30%;max-width:120px;opacity:.22;filter:grayscale(.3)}.cbblank .cbor svg{width:100%;display:block}
.cbhd{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:none;margin-bottom:8px}
.cbsn{font-size:clamp(17px,4.4vw,22px);font-weight:400;color:#5A2E8A}
.cbcnt{font-size:clamp(13px,3.4vw,16px);color:#6A4A2A;white-space:nowrap;background:#FFF0C8;border:1.5px solid #EAC57A;border-radius:999px;padding:2px 10px}
.cbcnt b{color:#B85A10;font-size:1.15em;font-family:'Baloo 2',sans-serif;font-weight:800}
.cbgt{display:flex;align-items:center;gap:6px;margin:0;font-size:clamp(13px,3.3vw,16px);color:#7A5A9A;flex:none;min-width:0}
.cbgt svg{width:22px;height:22px;flex:none}.cbgt span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cbgt em{font-style:normal;font-size:.85em;color:#A08A6A;font-family:'Baloo 2',sans-serif}
.cbfull{font-style:normal;margin-left:auto;margin-right:6px;background:linear-gradient(180deg,#FFE27A,#F2B036);color:#6A3A0A;border-radius:999px;padding:1px 10px;font-size:.85em;white-space:nowrap;box-shadow:0 0 12px rgba(255,210,90,.7)}
.cbgrid{flex:1;min-height:0;display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));grid-auto-rows:auto;gap:8px;align-content:start}
.cbgrid>.cbc{height:var(--ch)}.cbgrid>.cbgt{grid-column:1/-1;height:var(--hh);margin:0}
.cbc{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:2px;min-width:0;padding:6px 4px 5px;border:0;border-radius:16px;cursor:pointer;font:inherit;color:#3D2C5E;
 background:linear-gradient(170deg,#FFFFFF,#FFF4E2);box-shadow:inset 0 0 0 2px #F0DDBA,0 3px 0 #E2C48E,0 4px 10px rgba(140,90,40,.14);animation:cbcin .32s ease backwards;animation-delay:var(--dl);overflow:hidden}
@keyframes cbcin{from{opacity:0;transform:translateY(10px)}}
.cbc .cbp{flex:1;min-height:0;width:100%;display:grid;place-items:center}
.cbc .cbp>svg,.cbc .cbp>span>svg,.cbc .cbp svg.cthumb{max-width:100%;max-height:100%;width:auto;height:100%;display:block}
.cbc .cbp>*{max-height:100%}
.cbc .cbp>span{display:grid;place-items:center;width:100%;height:100%}.cbc .cbp>span>svg{width:100%;height:100%;max-width:100%}
.cbc b{font-size:clamp(12px,3.1vw,15px);font-weight:400;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.cbc small{font-size:clamp(10px,2.6vw,12.5px);line-height:1.18;color:#8A6A4A;display:flex;align-items:center;gap:3px;text-align:center;justify-content:center;flex:none}
.cbc small span{white-space:nowrap}
.cbview.two .cbpg:nth-child(2) .cbhd{visibility:hidden}
.cbc.no{background:linear-gradient(170deg,#F4EEE4,#ECE2D2);box-shadow:inset 0 0 0 2px #E2D4BC,0 3px 0 #D6C29E}
.cbc.no .cbp{filter:brightness(0) saturate(0);opacity:.2}
.cbc.no.line .cbp{filter:none;opacity:.5}.cbc .cbp svg.cline{background:#fff;border-radius:8px}
.cbhi{width:13px;height:13px;flex:none;display:inline-block;border-radius:50%;background:#C8A87A;-webkit-mask:var(--m) center/contain no-repeat;mask:var(--m) center/contain no-repeat}
.cbh_ch,.cbh_meet,.cbh_play{--m:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M10 1l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 14.5 4.6 17.5l1.2-6L1.3 7.3l6.1-.7z'/%3E%3C/svg%3E");background:#E0A43A}
.cbh_gem,.cbh_gemok{--m:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 2h10l4 5-9 11L1 7z'/%3E%3C/svg%3E");background:#4AA8E8}
.cbh_paint{--m:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M15 1l4 4-9 9-4-4zM5 11l4 4c-1 3-4 4-8 4 2-2 1-6 4-8z'/%3E%3C/svg%3E");background:#E85A9A}
.cbc.cbcert{padding:6px 4px 4px;background:none;box-shadow:none;overflow:visible}
.cbfr{flex:1;min-height:0;width:100%;display:flex;padding:7px;box-sizing:border-box;border-radius:8px;background:linear-gradient(135deg,#FFE9A8,#E0A43A 55%,#B87A20);box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 4px 10px rgba(110,70,20,.35)}
.cbpaper{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border-radius:3px;background:linear-gradient(180deg,#FFFBF0,#FFF0D0);box-shadow:inset 0 0 0 1px #D8B878;padding:4px;overflow:hidden}
.cbrib{font-style:normal;background:#E8505A;color:#FFF3D6;border-radius:999px;padding:0 10px;font-size:clamp(10px,2.6vw,13px);letter-spacing:.1em}
.cbbd{flex:1;min-height:0;width:56%;display:grid;place-items:center}.cbbd svg{width:100%;height:100%;max-height:100%;display:block}
.cbpaper b{font-size:clamp(11px,2.9vw,15px);color:#6A3A1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.cbcert small{margin-top:3px;color:#6A4A2A}
.cbcert.no .cbfr{background:none;border:3px dashed #D2B88A;box-shadow:none}
.cbcert.no .cbpaper{background:rgba(255,255,255,.35);box-shadow:none}.cbcert.no .cbrib{background:#D8C8B0}.cbcert.no .cbbd{filter:brightness(0);opacity:.15}.cbcert.no .cbpaper b{color:#B8A488}
.cbempty{grid-column:1/-1;text-align:center;color:#A08A6A;margin-top:20%}
.cbnav{flex:none;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 2px 0}
.cbarr{width:52px;height:44px;border:0;border-radius:999px;display:grid;place-items:center;cursor:pointer;color:#5A2E8A;background:linear-gradient(180deg,#FFF1A8,#F2B036);box-shadow:inset 0 2px 0 rgba(255,255,255,.7),0 3px 0 #A0701E}
.cbarr svg{width:24px;height:24px}.cbarr:disabled{opacity:.35;cursor:default}
.cbarr:not(:disabled):active{transform:translateY(2px);box-shadow:inset 0 2px 0 rgba(255,255,255,.7),0 1px 0 #A0701E}
.cbdots{display:flex;gap:7px;align-items:center;justify-content:center;flex:1;color:#FFF3D6;font-family:'Baloo 2',sans-serif;font-size:16px}
.cbdots i{width:9px;height:9px;border-radius:50%;background:rgba(255,243,214,.35)}.cbdots i.on{background:#FFE27A;box-shadow:0 0 8px #FFE27A;width:20px;border-radius:6px}
.cbview.infr{animation:cbinr .28s ease both}.cbview.infl{animation:cbinl .28s ease both}.cbview.outl{animation:cboutl .26s ease both}.cbview.outr{animation:cboutr .26s ease both}.cbview.infade{animation:cbfade .2s ease both}
@keyframes cbinr{from{opacity:0;transform:translateX(42px)}}@keyframes cbinl{from{opacity:0;transform:translateX(-42px)}}
@keyframes cboutl{to{opacity:0;transform:translateX(-42px)}}@keyframes cboutr{to{opacity:0;transform:translateX(42px)}}@keyframes cbfade{from{opacity:0}}
.cbview.nudge{animation:cbnudge .3s ease}.cbview.nudgel{animation:cbnudgel .3s ease}
@keyframes cbnudge{40%{transform:translateX(-10px)}}@keyframes cbnudgel{40%{transform:translateX(10px)}}
.cb19ov .card.cbbig{animation:cbbigin .3s ease both;width:min(420px,92vw);text-align:center;position:relative;background:linear-gradient(180deg,#FFFDF6,#FFF0D6);color:#3D2C5E}
@keyframes cbbigin{from{opacity:0;transform:translateY(24px)}}
.cbbig h2{margin:6px 0 0;color:#5A2E8A}.cbbig .cben{margin:0;font-family:'Baloo 2',sans-serif;font-size:20px;color:#8A6AB8}
.cbbigpic{width:min(260px,62vw);height:min(260px,62vw);margin:4px auto 0;display:grid;place-items:center;border-radius:50%;background:radial-gradient(circle at 50% 45%,#FFF6C8 0%,rgba(255,240,200,.6) 50%,rgba(255,240,200,0) 72%)}
.cbbigpic>svg,.cbbigpic>span>svg{width:88%;height:88%;display:block}.cbbigpic.sq{border-radius:18px;background:#fff;box-shadow:0 4px 14px rgba(120,80,40,.2)}.cbbigpic.sq>svg{width:100%;height:100%;border-radius:18px}
.cbbigpic .titem.cbtr{width:86%;height:86%;border:0;background:none!important;box-shadow:none!important;display:flex;flex-direction:column;align-items:center;justify-content:center;font:inherit;color:#5A2E8A}
.cbbigpic .titem.cbtr .tpic{width:72%;height:72%;display:grid;place-items:center}.cbbigpic .titem.cbtr .tpic svg,.cbbigpic .titem.cbtr .tpic>span{width:100%;height:100%}.cbbigpic .titem.cbtr small{display:none}
.cbbig .row{display:flex;gap:10px;justify-content:center;margin-top:10px;flex-wrap:wrap}
@media (max-height:520px){.cbtab{flex-direction:row;padding:3px 6px;gap:4px}.cbtab .cbti{width:26px;height:26px}.cbbook{padding:6px 8px 4px}.cbnav{padding-top:3px}.cbarr{height:34px;width:44px}.cbpg{padding:6px 10px}.cbgt{margin:2px 0 4px}}
@media (max-width:360px){.cbtab b{font-size:10px}}
@media (prefers-reduced-motion:reduce){.cbtab,.cbc,.cb19ov .card.cbbig{animation:none}}
`;
const st=document.createElement('style');st.id='b19css';st.textContent=css;(document.head||document.documentElement).appendChild(st);
{const bg=document.createElement('div');bg.id='b19bg';const sky=document.getElementById('sky');(sky&&sky.parentNode||document.body).insertBefore(bg,sky?sky.nextSibling:document.body.firstChild)}
}catch(e){console.log('book19',e)}})();

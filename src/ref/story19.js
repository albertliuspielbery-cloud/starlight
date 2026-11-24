
/* ================= m99zzzz（1.9 原型）故事拆成小段，穿插在關卡中 —— 星光工作室 2026-11-17（全部原創，著作權與 IP 屬於星光工作室） =================
 * 問題：每章開頭的故事一出來，孩子就直接按「跳過」。
 * 做法（通用，不逐章手改）：
 *  1. 開場只留一句「鉤子」＋一個畫面，馬上去換裝、開始玩。
 *     其餘頁平均分到這一章各關之間（每一段 1～2 頁，像找到一條線索），最後一關後照原本接破關小劇場。
 *  2. 每一頁要孩子點畫面上的角色才會說話、往下走（點了會跳一下、發亮），不自動連播。仍可跳過。
 *  3. 鉤子叫孩子的名字（有錄好的名字才念），主角穿目前的衣服（每次播都重新畫），寵物同行並說「我們快去幫忙！」。
 * 資料來源：直接用原本每一章的開場故事（SCREENS.story，各季各自的寫法都一樣處理）：
 *   把原本的故事畫在畫面上、一頁一頁按「下一頁」，抓下每一頁的畫面、文字和要念的句子（say 的內容）。
 *   所以以後新增章節、改故事文字，不用另外改這裡。
 * 自動規則（plan）：
 *   - 鉤子＝第一頁的第一句；第一頁只有一句就整頁當鉤子（用原本整頁的錄音）。
 *     第一頁還有其他句子：剩下的句子有錄音就當第一段的第一頁，沒有就整頁（原本的錄音）重放。
 *   - 需要孩子選擇才能往下的頁（第 11 章幫小星星取名）留在開場，鉤子之後馬上做。
 *   - 最後一頁如果是「換衣服、出發囉」的出發頁（至少 3 頁時），不放進關卡之間（開場已經直接去換裝），只在完整故事裡看。
 *   - 其餘頁分到第 1～(關數-1) 關之後：頁數不超過關數-1 時一頁一段，平均散開（第一段一定在第 1 關之後）；
 *     超過時兩頁一段，最多 2 頁一段。
 * 語音：絕不用裝置內建語音。原本每頁照原本 say（同一份錄音）；新加的句子（名字、鉤子、寵物那句）只有錄音存在才念，沒有就只顯示文字。
 * 家長專區「學習」：故事拆成小段穿插在關卡中（預設開；關掉＝完全照原本）。
 * 故事屋「我的冒險」：點一章可以選「完整故事」（原本全部的頁，一頁一頁點）或「破關小劇場」。
 * 動畫：只用淡入、移動、亮光，不整體放大縮小。兒童畫面不出現價格。 */
(function(){try{
const sty='st19';
const ON=()=>{try{return !V2.st19off}catch(e){return true}};
const BOY=()=>{try{return !!ISBOY}catch(e){return window.HERO==='prince'}};
const ht=t=>{try{return typeof heroT==='function'?heroT(t):t}catch(e){return t}};
const RM=()=>{try{return reduced||!!S.lite}catch(e){return false}};
const sents=t=>(String(t||'').match(/[^。！？!?]+[。！？!?」』）)～…]*/g)||[]).map(s=>s.trim()).filter(Boolean);
// 有錄音才算（每一句、每一段都要找得到錄音檔）；不看「內建聲音」設定，新句子一律不用內建語音
const rec=t=>{try{if(!VO.idx)return false;const u=ht(String(t)).replace(/⁠/g,'');return sents(u).length>0&&sents(u).every(x=>voResolve(x).every(g=>typeof g==='string'))}catch(e){return false}};
const sayIf=list=>{const a=list.filter(x=>x&&(typeof x!=='string'||rec(x)));if(!a.length||!S.vo)return Promise.resolve();try{return say(a)||Promise.resolve()}catch(e){return Promise.resolve()}};
const PETLINE='我們快去幫忙！',PETLINE0='我們一起幫忙吧！';   // 新錄好「我們快去幫忙！」之前，先用已經錄好的「我們一起幫忙吧！」
const petLine=()=>rec(PETLINE)?PETLINE:rec(PETLINE0)?PETLINE0:PETLINE;
const title=()=>BOY()?'王子':'公主';
const nameLine=()=>S.name?`${S.name}${title()}！`:'';
const st=()=>{const k='st19'+(BOY()?'b':'p');let o=V2[k];if(!o||o.c!==S.ch)o=V2[k]={c:S.ch,seen:[]};return o};
const sv2=()=>{try{save2()}catch(e){}};

/* ---------- 1. 抓原本的故事頁 ---------- */
let ORIG=null;
function capture(c){
 const out=[];if(!ORIG)return out;const ch0=S.ch,scr0=S.screen,_say=say,_go=go,_sfx=sfx;let said=null,went=false;
 try{S.ch=c;say=a=>{said=a;return Promise.resolve()};go=()=>{went=true};sfx=()=>{};
  ORIG.call(window);
  for(let k=0;k<14&&!went;k++){const sc=screen.querySelector('.story .scard');if(!sc)break;
   const tx=sc.querySelector('.stext'),sr=sc.querySelector('.scroll'),sn=sc.querySelector('.snames'),scn=sc.querySelector('.scene');
   const t=sr?(Array.isArray(said)?said.filter(x=>typeof x==='string').join(''):sr.textContent):(tx?tx.textContent:'');
   if(scn)scn.remove();if(sr)sr.remove();if(sn)sn.remove();
   out.push({i:k,t:t.trim(),say:Array.isArray(said)?said:[t],scene:scn,scroll:sr,names:sn});said=null;
   const nb=sc.querySelector('#next');if(!nb)break;nb.disabled=false;nb.click()}
 }catch(e){console.log('st19 capture',e)}
 finally{say=_say;go=_go;sfx=_sfx;S.ch=ch0;S.screen=scr0;try{screen.innerHTML=''}catch(e){}}
 return out}

/* ---------- 2. 自動拆分規則 ---------- */
const DEP=/(換上|穿上|打扮|捲起袖子|拿好|帶好|帶著|牽好|準備好了嗎|出發|我們去.{0,8}囉)/;
function plan(c,pages){
 const P=pages||capture(c);const N=P.length;const NLc=((CHAPTERS[c]||{}).levels||[]).length||10;
 const r={c,n:N,nl:NLc,hook:'',hookSay:[],hookWhole:false,hookPage:null,opening:[],segs:[],dep:null,rest:[]};if(!N)return r;
 // 王子版：先整頁換成王子版文字再切句（整頁有自己的王子版說法時，切出來的句子才對得上錄音）
 const p0=P[0],ss=sents(ht(p0.t));r.hookPage=p0;
 // 第一句太短（例如「叮咚！」）就連下一句一起當鉤子
 const nh=ss.length>1&&ss[0].replace(/[^\p{L}\p{N}]/gu,'').length<5?2:1;
 if(ss.length<=nh){r.hook=ht(p0.t);r.hookSay=p0.say;r.hookWhole=true}
 else{r.hook=ss.slice(0,nh).join('');r.hookSay=[r.hook];const rem=ss.slice(nh).join('');
  r.rest.push(rec(rem)?Object.assign({},p0,{t:rem,say:[rem],part:'rest'}):Object.assign({},p0,{part:'full'}))}
 for(let i=1;i<N;i++){const p=P[i];
  if(p.names){r.opening.push(p);continue}
  if(i===N-1&&N>=3&&!p.scroll&&DEP.test(p.t)){r.dep=p;continue}
  r.rest.push(p)}
 const G=Math.max(1,NLc-1);
 // 頁數比關卡間少：把有兩句以上、每一句都有自己錄音的頁拆成一句一頁（同一個畫面），讓更多關之間有一小段
 for(let j=0;j<r.rest.length&&r.rest.length<G;j++){const p=r.rest[j];if(p.scroll||p.names||!Array.isArray(p.say)||!p.say.every(x=>typeof x==='string'))continue;
  const q=sents(ht(p.t));if(q.length<2||!q.every(rec))continue;const take=Math.min(q.length,G-r.rest.length+1);
  const grp=[];for(let k=0;k<take;k++){const a=Math.round(k*q.length/take),b=Math.round((k+1)*q.length/take);grp.push(q.slice(a,b).join(''))}
  const pcs=grp.map((t,k)=>Object.assign({},p,{t,say:[t],part:(p.part?p.part+'+':'')+'s'+(k+1),scene:k?(p.scene&&p.scene.cloneNode(true)):p.scene}));
  r.rest.splice(j,1,...pcs);j+=pcs.length-1}
 const R=r.rest.length;if(!R)return r;
 const nseg=Math.min(R,G);const base=Math.floor(R/nseg);let extra=R%nseg;let k0=0;
 for(let s=0;s<nseg;s++){let n=base+(extra>0?1:0);if(extra>0)extra--;n=Math.min(n,2);if(s===nseg-1)n=R-k0;   // 頁數超過 2×(關數-1) 時多的放最後一段（目前沒有這種章）
  const at=nseg===1?1:1+Math.round(s*(G-1)/(nseg-1));r.segs.push({at,pages:r.rest.slice(k0,k0+n)});k0+=n}
 return r}

/* ---------- 3. 畫面 ---------- */
const TOK={n:0};
const petSmall=()=>{try{return myPet('class="small"')}catch(e){return ''}};
// 原本的故事頁裡寵物都是 myPet('class="small"')：畫面上已經有小隻的就不再加
function sceneHTMLHasPet(scn){try{const a=scn&&scn.querySelector('.actors');return !!a&&!!a.querySelector('.small')}catch(e){return false}}
function glowOn(el){if(!el||RM()||!el.animate)return null;try{return el.animate([{filter:'drop-shadow(0 0 0 rgba(255,232,150,0))'},{filter:'drop-shadow(0 0 9px rgba(255,232,150,.95))'},{filter:'drop-shadow(0 0 0 rgba(255,232,150,0))'}],{duration:1600,iterations:Infinity})}catch(e){return null}}
function hop(el){if(!el)return;try{if(RM()||!el.animate){el.animate&&el.animate([{filter:'brightness(1.25)'},{filter:'none'}],{duration:500});return}
 const h=Math.max(10,Math.min(26,el.getBoundingClientRect().height*.12));
 el.animate([{translate:'0 0'},{translate:`0 -${h}px`,offset:.35},{translate:'0 0',offset:.65},{translate:`0 -${h*.3}px`,offset:.82},{translate:'0 0'}],{duration:620,easing:'ease-out'});
 el.animate([{filter:'drop-shadow(0 0 12px rgba(255,240,170,1)) brightness(1.15)'},{filter:'none'}],{duration:900,easing:'ease-out'})}catch(e){}}
// 說話的角色頭像：「○○說：」找得到就用那個角色，其他是旁白（故事書）
const SPK={'貓頭鷹':'owl','貓頭鷹老師':'owl','貓頭鷹博士':'owl','小鳥':'bird','雪人先生':'snowman','小老鼠':'mouse','咚咚':'dongdong','台灣黑熊':'blackbear','小兔子':'bunny','小鹿':'deer','熊熊':'bear','乳牛':'cow','警察小狗':'dog','嘀嘀':'robot','捲捲':'pangolin','小恐龍阿古':'dino','亮亮':'star'};
function avatarOf(t){const m=/^([^，。！？：]{1,7}?)說：/.exec(String(t||''))||/([^，。！？：]{1,7}?)說：/.exec(String(t||''));let k=m&&m[1];
 try{if(k){k=k.replace(/^(可是|這時候|他|它)/,'');if(V2.starName&&k===V2.starName)return {h:animal('star'),n:k};
  if(/王子$/.test(k)&&!BOY())return {h:prince(),n:'王子'};if(/火花$/.test(k))return {h:petSVG('dragon','',''),n:'火花'};
  if(/它$/.test(k)||/星星$/.test(k))return {h:animal('star'),n:'小星星'};
  const key=SPK[k]||Object.keys(SPK).find(x=>k.endsWith(x))&&SPK[Object.keys(SPK).find(x=>k.endsWith(x))];if(key&&AN[key])return {h:animal(key),n:k}}}catch(e){}
 return null}
const BOOK=`<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="st19bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7DE"/><stop offset="1" stop-color="#F3DDA8"/></linearGradient></defs><path d="M32 16 Q20 9 7 12 V50 Q20 47 32 54Z" fill="url(#st19bk)" stroke="#B88A3E" stroke-width="2" stroke-linejoin="round"/><path d="M32 16 Q44 9 57 12 V50 Q44 47 32 54Z" fill="url(#st19bk)" stroke="#B88A3E" stroke-width="2" stroke-linejoin="round"/><path d="M13 22 Q20 20.5 26 23 M13 29 Q20 27.5 26 30 M38 23 Q44 20.5 51 22 M38 30 Q44 27.5 51 29" stroke="#D8B878" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M47 6 l1.6 3.6 3.9.4-2.9 2.6.8 3.8-3.4-2-3.4 2 .8-3.8-2.9-2.6 3.9-.4z" fill="#FFD24D" stroke="#C8901E" stroke-width=".8"/></svg>`;
const STAR=on=>`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3.5l4.7 10 10.9 1.2-8.1 7.4 2.3 10.8L20 27.4l-9.8 5.5 2.3-10.8-8.1-7.4 10.9-1.2z" fill="${on?'url(#st19sg)':'rgba(255,255,255,.10)'}" stroke="${on?'#B8801A':'rgba(255,226,150,.55)'}" stroke-width="1.6" stroke-linejoin="round"/>${on?'<path d="M14 15.5l3-.4 1.6-3.4" stroke="#FFF8D8" stroke-width="1.6" fill="none" stroke-linecap="round"/>':''}</svg>`;
const SGRAD='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="st19sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3A6"/><stop offset=".55" stop-color="#FFD24D"/><stop offset="1" stop-color="#F0A21E"/></linearGradient></defs></svg>';
const FINGER=`<svg viewBox="0 0 48 56" aria-hidden="true"><path d="M17 30V9.5a4 4 0 0 1 8 0V25l.4-1.6a3.8 3.8 0 0 1 7.3 1.4l-.2 1.6a3.8 3.8 0 0 1 7.1 2l-.3 1.8a3.6 3.6 0 0 1 6.6 2.4L44 42c-1.4 7.4-7 11-14 11h-3.6c-5 0-8.4-2-11-6.2L8.2 35.4a3.7 3.7 0 0 1 6.2-4z" fill="#FFF6E6" stroke="#5A3A1A" stroke-width="2.4" stroke-linejoin="round"/><path d="M25 25v6M32.6 26.4v5M39.7 30.2v3.4" stroke="#5A3A1A" stroke-width="2" stroke-linecap="round"/></svg>`;
const CORNER=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M4 30 Q4 4 30 4" stroke="#FFE7A0" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M10 30 Q10 10 30 10" stroke="#E8B850" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M8 8l2.2 4.4 4.8.6-3.5 3.3.9 4.7L8 18.8 3.6 21l.9-4.7L1 13l4.8-.6z" fill="#FFD24D" stroke="#B8801A" stroke-width="1"/></svg>`;
function enter(list){if(RM())return;list.forEach((a,k)=>{try{const dx=(k%2?1:-1)*46;a.animate([{opacity:0,translate:`${dx}px 0`},{opacity:1,translate:'0 0'}],{duration:700,delay:120+k*160,easing:'cubic-bezier(.2,.8,.3,1)',fill:'backwards'})}catch(e){}})}
// 角色排一排剛好放得下：先用 100px 高量出整排有多寬，再算畫面放得下的最大高度（不縮放，直接設高度）
function fitActors(scn){try{const a=scn&&scn.querySelector('.actors');if(!a)return;const W=scn.clientWidth,H=scn.clientHeight;if(!W||!H)return;
 a.style.height='100px';const r=a.scrollWidth/100||1;const h=Math.max(60,Math.min(H*.74,W*.92/r));a.style.height=h+'px'}catch(e){}}
addEventListener('resize',()=>{try{if(S.screen==='story19')fitActors($('.st19stage .scene'))}catch(e){}});
SCREENS.story19=function(arg){
 arg=arg||{};const mode=arg.mode||'seg',c=typeof arg.c==='number'?arg.c:S.ch;const tok=++TOK.n;const live=()=>tok===TOK.n&&S.screen==='story19';
 hush();try{$('#bar').hidden=true}catch(e){}
 const P=capture(c);const pl=plan(c,P);
 let list,endLabel,onEnd;const K=arg.k|0,NS=pl.segs.length;
 const C=CHAPTERS[c]||{};const ttl=ht(C.title||C.name||'');const tparts=ttl.split('・');
 if(mode==='hook'){list=[{hook:1}].concat(pl.opening);endLabel='出發！';onEnd=()=>go('guide')}
 else if(mode==='full'){list=P;endLabel='看破關小劇場';
  onEnd=()=>{try{const T=window.TH93;if(T&&T.BIG[c])return T.replayBig(c)}catch(e){}go('theater93',{ch:c,mode:'replay'})}}
 else{const sg=pl.segs[K]||{pages:[]};list=sg.pages;endLabel='繼續冒險';onEnd=()=>go('map')}
 if(!list.length){onEnd();return}
 const back=()=>{if(mode==='full'){try{TH93.TH.adv=1}catch(e){}go('storyhouse')}else onEnd()};
 // 上方：線索收集條（過關劇情）／完整故事頁碼／章名
 const clue=()=>`<div class="st19clue" role="img" aria-label="找到線索 ${K+1} / ${NS}"><b class="st19clt">線索</b>${pl.segs.map((_,j)=>`<span class="st19slot${j<K?' got':''}${j===K?' now':''}" data-j="${j}">${STAR(j<K)}</span>`).join('')}</div>`;
 let i=0,flew=false;
 function render(){if(!live())return;const p=list[i],last=i===list.length-1;
  const isHook=!!p.hook;const pg=isHook?pl.hookPage:p;
  const top=mode==='seg'?clue():mode==='full'?`<div class="st19clue st19full"><b class="st19clt">完整故事</b><span class="st19pg">${i+1} / ${list.length}</span></div>`:'<span></span>';
  const sp=!isHook&&!p.names?avatarOf(ht(p.t)):null;
  const say1=isHook?`<div class="st19say st19nr on"><span class="st19av">${BOOK}</span><div class="st19bub">${S.name?`<b class="st19nm">${ht(nameLine())}</b>`:''}<p class="st19text">${ht(pl.hook)}</p></div></div>
    <div class="st19say st19sp on"><span class="st19av">${petSmall()}</span><div class="st19bub"><p class="st19text">${ht(petLine())}</p></div></div>`
   :p.names?`<div class="st19say st19nr on"><span class="st19av">${BOOK}</span><div class="st19bub"><p class="st19text">${ht(p.t)}</p></div></div>`
   :`<div class="st19say${sp?'':' st19nr'}"><span class="st19av">${sp?sp.h:BOOK}</span><div class="st19bub"><p class="st19text">${ht(p.t)}</p><p class="st19tip" aria-hidden="true">點點看發亮的朋友！</p></div></div>`;
  screen.innerHTML=`<div class="st19 m-${mode}${isHook?' hook':''}${pg&&pg.scroll?' isscroll':''}">${SGRAD}<div class="st19top">${top}<button class="btn2 small st19skip" id="st19skip">跳過</button></div>
   <div class="st19main"><div class="st19frame"><div class="st19stage"></div>${['tl','tr','bl','br'].map(k=>`<i class="st19cn ${k}">${CORNER}</i>`).join('')}
     ${isHook?`<div class="st19ribbon"><small>${tparts.length>1?tparts[0]:''}</small><b>${tparts[tparts.length-1]}</b></div>`:''}<span class="st19fing" aria-hidden="true">${FINGER}</span></div>
    <div class="st19side">${say1}<div class="st19row"><button class="btn st19next${isHook?' st19big':''}" id="next">${last?endLabel:'下一頁'}</button></div></div></div></div>`;
  const root=$('.st19',screen),stage=$('.st19stage',screen),nx=$('#next',screen),bub=$('.st19say:not(.st19sp)',screen),fing=$('.st19fing',screen);
  if(pg&&pg.scene){stage.appendChild(pg.scene);if(!sceneHTMLHasPet(pg.scene)&&!pg.scene.querySelector('.st19comp')){const a=document.createElement('span');a.className='st19comp';a.innerHTML=petSmall();pg.scene.appendChild(a)}}
  else if(pg&&pg.scroll)stage.appendChild(pg.scroll);
  if(p.names){$('.st19side',screen).insertBefore(p.names,$('.st19row',screen));nx.disabled=!V2.starName}
  $('#st19skip',screen).onclick=()=>{sfx('pop');hush();if(p.names&&!V2.starName){V2.starName='小星星';sv2()}back()};
  const actors=pg&&pg.scene?$$('.actors > *',pg.scene).concat($$('.st19comp',pg.scene)):pg&&pg.scroll?[pg.scroll]:[];
  fitActors(pg&&pg.scene);enter(actors);
  // 線索：這一段第一頁，新的星星從畫面飛進線索條，亮起來
  if(mode==='seg'&&!flew){flew=true;const slot=$(`.st19slot[data-j="${K}"]`,screen);
   const lightUp=()=>{if(!slot)return;slot.classList.add('got');slot.innerHTML=STAR(true);try{sfx('gem')}catch(e){}};
   if(slot&&!RM()&&slot.animate){setTimeout(()=>{if(!live())return;const fr=$('.st19frame',screen).getBoundingClientRect(),sr=slot.getBoundingClientRect();
     const f=document.createElement('span');f.className='st19fly';f.innerHTML=STAR(true);root.appendChild(f);const sz=sr.width;
     const x0=fr.left+fr.width/2-sz/2,y0=fr.top+fr.height*.42-sz/2;Object.assign(f.style,{left:x0+'px',top:y0+'px',width:sz+'px',height:sz+'px'});
     const an=f.animate([{opacity:0,translate:'0 30px',filter:'drop-shadow(0 0 0 #FFE27A)'},{opacity:1,translate:'0 0',filter:'drop-shadow(0 0 18px #FFE27A)',offset:.3},{opacity:1,translate:`${sr.left-x0}px ${sr.top-y0}px`,filter:'drop-shadow(0 0 8px #FFE27A)'}],{duration:1300,easing:'cubic-bezier(.5,0,.3,1)'});
     an.finished.then(()=>{f.remove();if(live()){lightUp();slot.animate([{filter:'drop-shadow(0 0 16px #FFE27A) brightness(1.4)'},{filter:'drop-shadow(0 0 4px #FFE27A)'}],{duration:900,easing:'ease-out'})}}).catch(()=>f.remove())},500)}
   else lightUp()}
  let told=false,glows=[];
  const placeFinger=()=>{try{const a=actors.find(x=>!x.classList.contains('st19comp'))||actors[0];if(!a||!fing)return;const fr=$('.st19frame',screen).getBoundingClientRect(),r=a.getBoundingClientRect();
   fing.style.left=(r.left-fr.left+r.width*.62)+'px';fing.style.top=(r.top-fr.top+r.height*.30)+'px';fing.classList.add('on')}catch(e){}};
  const tell=()=>{told=true;glows.forEach(g=>{try{g.cancel()}catch(e){}});glows=[];if(fing)fing.classList.remove('on');if(bub)bub.classList.add('on');
   hush();const pr=sayIf(p.say);setTimeout(()=>{if(live())nx.classList.add('on')},RM()?100:900);return pr};
  actors.forEach((a,k)=>{a.classList.add('st19tap');a.setAttribute('role','button');a.setAttribute('aria-label','點一下');
   a.addEventListener('click',e=>{e.stopPropagation();sfx('pop');hop(a);if(isHook){hush();sayIf(a.classList.contains('st19comp')?[petLine()]:[nameLine(),...pl.hookSay]);return}if(!told)tell();else if(a.classList.contains('st19comp'))sayIf([petLine()]);else{hush();sayIf(p.say)}})});
  if(bub&&!isHook&&!p.names)bub.onclick=()=>{if(told){hush();sayIf(p.say)}else tell()};
  nx.onclick=()=>{if(nx.disabled)return;sfx('pop');hush();if(!last){i++;render()}else onEnd()};
  if(isHook){nx.classList.add('on');const pet=$('.st19say.st19sp',screen);
   (async()=>{await new Promise(r=>setTimeout(r,RM()?50:700));if(!live())return;
    await sayIf([nameLine(),...pl.hookSay]);if(!live())return;await new Promise(r=>setTimeout(r,200));if(!live())return;
    if(pet){pet.classList.add('talk');hop($('.st19av',pet))}await sayIf([petLine()])})()}
  else if(p.names){nx.classList.add('on');sayIf(p.say);$$('.sname',screen).forEach(b=>b.addEventListener('click',()=>{nx.disabled=false}))}
  else{setTimeout(()=>{if(live()&&!told){placeFinger();actors.forEach((a,k)=>{const g=glowOn(a);if(g){g.currentTime=k*260;glows.push(g)}})}},RM()?0:900)}
 }
 render()};

/* ---------- 4. 接進遊戲 ---------- */
// 開場：只有鉤子（S.prog===0 才會進 story）
function wrapStory(){ORIG=SCREENS.story;
 SCREENS.story=function(){if(!ON()||S.pmode)return ORIG.apply(this,arguments);
  try{const o=st();o.seen=[];sv2();S.screen='story19';return SCREENS.story19({mode:'hook',c:S.ch})}catch(e){console.log('st19 hook',e);return ORIG.apply(this,arguments)}}}
// 過關回地圖之前：剛好是要播故事的那一關，就先播那一段
function wrapShow(){const _show=show;
 show=function(name,arg){
  try{if(name==='story19'||name==='map')TOK.n++;
   if(name==='map'&&ON()&&!S.pmode&&S.walkFrom!=null&&S.walkFrom===S.prog-1&&S.prog>0&&S.prog<NL){
    const o=st();if(!o.seen.includes(S.prog)){const pl=plan(S.ch);const k=pl.segs.findIndex(s=>s.at===S.prog);
     if(k>=0){o.seen.push(S.prog);sv2();return _show.call(this,'story19',{mode:'seg',c:S.ch,k})}}}}catch(e){console.log('st19 show',e)}
  return _show.apply(this,arguments)}}
// 故事屋「我的冒險」：點一章 → 完整故事／破關小劇場
function advChoice(b){const c=+b.dataset.c;if(!(c>=0))return;
 const ov=overlay(screen,`<div class="card st19ch"><h2>${CHAPTERS[c].title||CHAPTERS[c].name}</h2><div class="st19chrow"><button class="btn" id="st19full">${typeof art==='function'?art('📖'):''}<span>完整故事</span></button><button class="btn2" id="st19end">${typeof WICON!=='undefined'&&WICON.star?WICON.star:''}<span>破關小劇場</span></button></div><button class="btn2 small" id="st19x">返回</button></div>`);
 $('#st19x',ov).onclick=()=>{sfx('pop');ov.remove()};
 $('#st19end',ov).onclick=()=>{ov.remove();b.__st19ok=1;try{b.click()}finally{b.__st19ok=0}};
 $('#st19full',ov).onclick=()=>{sfx('pop');ov.remove();hush();go('story19',{mode:'full',c})}}
screen.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('.adv93');if(!b||b.__st19ok||!ON())return;
 try{if(window.TH93&&!TH93.visible(+b.dataset.c))return}catch(e){}e.stopPropagation();e.preventDefault();sfx('pop');advChoice(b)},true);
// 家長專區：開關
function wrapParent(){const _pp=parentPanel;parentPanel=function(){const r=_pp.apply(this,arguments);try{const ov=$$('.overlay').pop();const card=ov&&$('.card',ov);if(!card||$('#st19opt',card))return r;
  const d=document.createElement('div');d.id='st19opt';d.dataset.s8own='1';d.dataset.s8='learn';const off=!ON();
  d.innerHTML=`<span class="lab">故事拆成小段穿插在關卡中</span><div class="seg"><button data-st19="1" aria-pressed="${!off}">開</button><button data-st19="0" aria-pressed="${off}">關（照原本）</button></div><p class="small">開：每一章開頭只講一句話就開始玩，故事分成小段，過關時播一段（像找到一條線索），要孩子點畫面才往下。關：開頭一次把故事講完。故事屋「我的冒險」可以再看一次完整故事。</p>`;
  const pd=$('#pdone',card);pd?card.insertBefore(d,pd):card.appendChild(d);
  $$('[data-st19]',d).forEach(b=>b.onclick=()=>{V2.st19off=b.dataset.st19==='0';sv2();$$('[data-st19]',d).forEach(x=>x.setAttribute('aria-pressed',x===b));try{sfx('pop')}catch(e){}})}catch(e){console.log('st19 pp',e)}return r}}
setTimeout(()=>{try{wrapStory();wrapShow();if(typeof parentPanel==='function')wrapParent()}catch(e){console.log('st19 wrap',e)}},0);
window.__st19={capture,plan,rec,sents,petLine,nameLine,PETLINE};

/* ---------- 5. 樣式（淡入、移動、亮光；不放大縮小） ---------- */
const css=document.createElement('style');css.textContent=`
.st19{--g1:#FFE7A0;--g2:#E8B850;--g3:#B8801A;height:100%;display:flex;flex-direction:column;gap:8px;position:relative;padding:calc(env(safe-area-inset-top,0px) + 8px) 12px calc(env(safe-area-inset-bottom,0px) + 10px);box-sizing:border-box;overflow:hidden}
.st19::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 35%,rgba(255,214,120,.16),rgba(255,214,120,0) 60%);pointer-events:none}
.st19top{position:relative;z-index:3;display:flex;align-items:center;gap:8px;min-height:52px}
.st19skip{margin-left:auto;min-height:44px;min-width:80px}
.st19clue{display:flex;align-items:center;gap:4px;padding:4px 12px 4px 14px;border-radius:999px;background:linear-gradient(180deg,rgba(70,52,150,.92),rgba(36,26,96,.92));border:2px solid var(--g2);box-shadow:0 0 0 3px rgba(255,231,160,.18),0 4px 14px rgba(10,6,40,.45),inset 0 1px 0 rgba(255,255,255,.18);animation:st19in .5s ease-out both}
.st19clt{color:var(--g1);font-weight:400;font-size:clamp(16px,1.2vmin + 10px,22px);margin-right:4px;white-space:nowrap}
.st19slot{display:flex;width:clamp(30px,4.6vmin,42px);height:clamp(30px,4.6vmin,42px)}
.st19slot svg{width:100%;height:100%}
.st19slot.got svg{filter:drop-shadow(0 0 5px rgba(255,226,122,.85))}
.st19slot.now:not(.got) svg{animation:st19wait 1.4s ease-in-out infinite}
@keyframes st19wait{50%{opacity:.45}}
.st19fly{position:fixed;z-index:20;pointer-events:none;display:flex}.st19fly svg{width:100%;height:100%}
.st19pg{color:#FFF1C2;font-size:clamp(16px,1.2vmin + 10px,22px)}
.st19main{position:relative;z-index:1;flex:1;min-height:0;display:flex;flex-direction:column;gap:10px}
.st19frame{position:relative;flex:0 0 auto;height:min(60vh,112vw);border-radius:30px;padding:7px;background:linear-gradient(145deg,#FFF3C4,#E8B850 30%,#FFE7A0 52%,#C8901E 78%,#FFE7A0);box-shadow:0 0 0 2px rgba(120,70,10,.35),0 0 28px 4px rgba(255,214,120,.38),0 14px 30px rgba(10,6,40,.5);animation:st19in .55s ease-out both}
.st19stage{position:absolute;inset:7px;border-radius:24px;overflow:hidden;background:#2A2466;box-shadow:inset 0 0 0 2px rgba(120,70,10,.45),inset 0 0 26px rgba(20,10,60,.45)}
.st19stage .scene{position:absolute;inset:0;width:auto;aspect-ratio:auto;max-height:none;border-radius:0;container-type:size}
.st19stage .scene .actors{bottom:5%;height:min(70%,50vw);width:max-content;left:50%;right:auto;translate:-50% 0;gap:10px}
.st19stage .scene .actors>*{flex-shrink:0}
.st19stage .scene .actors>.bob:not(:has(.small)){height:76%}
.st19cn{position:absolute;width:44px;height:44px;pointer-events:none;z-index:2;filter:drop-shadow(0 1px 1px rgba(80,40,0,.5))}
.st19cn svg{width:100%;height:100%}.st19cn.tl{left:-4px;top:-4px}.st19cn.tr{right:-4px;top:-4px;rotate:90deg}.st19cn.br{right:-4px;bottom:-4px;rotate:180deg}.st19cn.bl{left:-4px;bottom:-4px;rotate:270deg}
.st19ribbon{position:absolute;z-index:3;left:50%;top:-6px;translate:-50% 0;display:flex;flex-direction:column;align-items:center;padding:6px 34px 8px;min-width:46%;max-width:86%;box-sizing:border-box;background:linear-gradient(180deg,#FF8FB8,#E0567F);border:3px solid var(--g1);border-radius:0 0 22px 22px;box-shadow:0 6px 14px rgba(60,10,40,.35);color:#fff;text-align:center;text-shadow:0 2px 0 rgba(120,20,60,.45)}
.st19ribbon small{font-size:clamp(14px,1vmin + 9px,19px);opacity:.92}
.st19ribbon b{font-weight:400;font-size:clamp(26px,3.2vmin + 12px,44px);line-height:1.15;white-space:nowrap}
.st19comp{position:absolute;right:4%;bottom:5%;height:min(32%,24cqw);display:flex;align-items:flex-end}
.st19comp svg{height:100%;width:auto}
.st19 .st19tap{cursor:pointer;-webkit-tap-highlight-color:transparent}
.st19fing{position:absolute;z-index:4;width:clamp(40px,6vmin,56px);pointer-events:none;opacity:0;transition:opacity .4s}
.st19fing.on{opacity:1;animation:st19tapme 1.2s ease-in-out infinite}
.st19fing svg{width:100%;height:auto;filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))}
@keyframes st19tapme{0%,100%{translate:0 0}50%{translate:-6px -12px}}
.st19side{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:10px}
.st19say{display:flex;align-items:flex-end;gap:10px;animation:st19in .5s ease-out .25s both}
.st19av{flex:0 0 auto;width:clamp(56px,9vmin,84px);height:clamp(56px,9vmin,84px);border-radius:50%;background:radial-gradient(circle at 50% 40%,#FFFDF2,#FFE9B0);border:3px solid var(--g2);box-shadow:0 0 0 3px rgba(255,231,160,.25),0 4px 10px rgba(10,6,40,.35);display:flex;align-items:center;justify-content:center;overflow:hidden}
.st19av svg{width:84%;height:84%}
.st19say.st19sp .st19av svg{width:92%;height:92%}
.st19bub{position:relative;flex:1;min-width:0;background:linear-gradient(180deg,#FFFDF4,#FFF2CF);border:3px solid var(--g2);border-radius:24px;padding:12px 18px;box-shadow:0 5px 0 rgba(140,90,20,.35),0 8px 18px rgba(10,6,40,.3);cursor:pointer}
.st19bub::before{content:'';position:absolute;left:-14px;bottom:18px;width:18px;height:18px;background:#FFF5D8;border-left:3px solid var(--g2);border-bottom:3px solid var(--g2);transform:skewY(-28deg) rotate(18deg);border-radius:0 0 0 6px}
.st19say.st19nr .st19bub{background:linear-gradient(180deg,#FFF9EA,#F8E7C0);border-radius:18px}
.st19who{display:block;color:#C0567F;font-weight:400;font-size:clamp(15px,.8vmin + 11px,19px);margin-bottom:2px}
.st19nm{display:block;color:#D0567F;font-weight:400;font-size:clamp(20px,1.8vmin + 12px,30px)}
.st19text{margin:0;color:#4A2E1A;font-size:clamp(21px,2vmin + 12px,32px);line-height:1.55;text-wrap:pretty;opacity:0;transition:opacity .5s}
.st19say.on .st19text{opacity:1}
.st19tip{position:absolute;inset:0;margin:0;display:flex;align-items:center;justify-content:center;color:#B8801A;font-size:clamp(20px,1.6vmin + 12px,28px);transition:opacity .4s;pointer-events:none}
.st19say.on .st19tip{opacity:0}
.st19say.st19sp{margin-left:8%;animation-delay:1.2s}
.st19say.st19sp .st19bub{padding:8px 16px}.st19say.st19sp .st19text{font-size:clamp(19px,1.6vmin + 11px,26px)}
.st19say.st19sp.talk .st19bub{box-shadow:0 0 0 4px rgba(255,210,77,.75),0 5px 0 rgba(140,90,20,.35)}
.st19row{display:flex;justify-content:center}
.st19next{opacity:0;translate:0 10px;pointer-events:none;transition:opacity .4s,translate .4s;min-width:200px;min-height:60px;font-size:clamp(20px,1.8vmin + 12px,28px)}
.st19next.on{opacity:1;translate:0 0;pointer-events:auto}
.st19next.st19big{min-width:min(78vw,340px);min-height:72px;font-size:clamp(26px,2.6vmin + 14px,38px);letter-spacing:.2em;box-shadow:0 0 22px 4px rgba(255,214,120,.45),0 6px 0 #C07A10}
.st19next:disabled{opacity:.45}
.st19.isscroll .st19stage{display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 40%,#4B3A8E,#1B1D52 75%)}
.st19.isscroll .st19stage .scroll{max-width:86%;cursor:pointer}
.st19 .snames{margin:0 auto}
@keyframes st19in{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
/* 橫放、電腦：左邊大畫面，右邊對話 */
@media (min-aspect-ratio:1/1){
 .st19main{flex-direction:row;align-items:stretch;gap:18px}
 .st19frame{flex:1 1 auto;height:auto;min-width:0}
 .st19side{flex:0 0 min(31%,380px)}
 .st19.hook .st19side{flex-basis:min(33%,400px)}
}
@media (min-aspect-ratio:1/1) and (max-height:520px){.st19side{gap:6px}.st19text{font-size:20px}.st19av{width:52px;height:52px}}
.card.st19ch{width:min(520px,92vw)}
.st19chrow{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:8px 0 12px}
.st19chrow button{display:flex;align-items:center;gap:8px;min-height:64px;font-size:clamp(18px,1.6vmin + 10px,24px)}
.st19chrow button svg,.st19chrow button .emoji{width:34px;height:34px;flex:0 0 auto}
@media (prefers-reduced-motion:reduce){.st19 *,.st19{animation:none!important;transition:none!important}.st19text{opacity:1}}
.lite .st19 *{animation-duration:.01s!important}
`;document.head.appendChild(css);
}catch(e){console.log('st19',e)}})();

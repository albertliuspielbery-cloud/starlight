
/* ================= 第五季「星光小管家」第三十一～三十五章（接進遊戲） =================
   2026-11-12　星光工作室 Starlight Studio　｜　故事、角色（存錢小豬咚咚、寵物小松鼠）、台詞、題目、圖樣都是星光工作室原創，著作權與 IP 屬於星光工作室。
   需要：s5_data.js（S5D、S5Q、S5FIN、S5HEAR、S5LIKE、S5QTAG、S5PT）、placeholder31.js（占位圖）；正式美術 art31.js（BG31、S31）、chars31.js（CH31、PET31）有就用。
   接法照第四季 s4_logic.js：排在 m99z_season4 後面（m99z_season5），包的是各畫面最後的版本。
   新題型都用現有題型名稱開頭（zhuyin:hear、letter:k5、count:s5…、coin:s5…、compare:s5b），錯題本、學習報告、難度調整照原本分類。 */
(function(){
'use strict';
const C31I=30,C35I=34,S5CH=[31,32,33,34,35];
const inS5=i=>i>=C31I&&i<=C35I;
if(CHAPTERS.length!==30)console.log('s5: CHAPTERS.length='+CHAPTERS.length+'（第五季要接在第三十章後面）');
const RM=()=>{try{return !!reduced}catch(e){return false}};
const IS_APPX=()=>{try{return typeof IS_APP!=='undefined'&&!!IS_APP}catch(e){return false}};

/* ---------- 0. 美術：正式圖有就用，沒有就用占位圖（記下哪些是占位，給測試和家長看） ---------- */
const PH=[];
const pickObj=(real,ph,name)=>{const o=Object.assign({},ph||{});Object.keys(o).forEach(k=>{if(real&&real[k]!=null)o[k]=real[k];else PH.push(name+'.'+k)});if(real)Object.keys(real).forEach(k=>{if(o[k]==null)o[k]=real[k]});return o};
// 美術負責人的場景名稱（livingroom、stationery、kitchen、party、fair）對到章節背景代號；寵物 PET31.squirrel 對到 squirrel31
const BGA={home31:'livingroom',stationery32:'stationery',kitchen33:'kitchen',party34:'party',market35:'fair'};
const BGR=(()=>{const R=window.BG31;if(!R)return null;const o=Object.assign({},R);Object.entries(BGA).forEach(([k,v])=>{if(!o[k]&&R[v])o[k]=R[v]});return o})();
const BG5=pickObj(BGR,BG31P,'BG31');
const CHX=pickObj(window.CH31,CH31P,'CH31');
const PETR=(()=>{const P=window.PET31;if(P&&typeof P.squirrel31==='function')return {squirrel31:P.squirrel31,anchor:P.anchor};
 if(P&&typeof P.squirrel==='function')return {squirrel31:P.squirrel,anchor:P.anchor,own:1};PH.push('PET31.squirrel31');return PET31P})();
const S31R=window.S31||{};
const A5={};['DRESS','BOY','PR','TOY','PACC'].forEach(k=>{A5[k]=pickObj(S31R[k],S31P[k],'S31.'+k)});
A5.PICS=Array.isArray(S31R.PICS)&&S31R.PICS.length>=4?S31R.PICS:(PH.push('S31.PICS'),S31P.PICS);
A5.BADGE=typeof S31R.BADGE==='function'?S31R.BADGE:(PH.push('S31.BADGE'),S31P.BADGE);
A5.MINI=typeof S31R.MINI==='function'?S31R.MINI:(PH.push('S31.MINI'),S31P.MINI);
A5.certHTML=typeof S31R.certHTML==='function'?S31R.certHTML:null;
window.__s5art={placeholder:PH};

/* ---------- 0b. 硬幣：家長 11/13 決定第五季起全面改用新硬幣 COIN31（art31.js；1、5、10、50 元，原創圖樣），取代 coinSVG ----------
   coinSVG 是全域函式，換掉以後收銀台、湊錢、存錢小豬等所有用到硬幣的地方都一起換；COIN31 沒載入時保留舊的。 */
try{if(typeof window.COIN31==='function'&&COIN31(10)){const _cs0=coinSVG;coinSVG=function(v){try{const s=COIN31(v);if(s)return s}catch(e){}return _cs0.apply(this,arguments)};window.__coin31=1}}catch(e){console.log('coin31',e)}

/* ---------- 1. 新朋友（AN 角色）和背景 ---------- */
Object.keys(CHX).forEach(k=>{if(k!=='dongdong'&&Object.prototype.hasOwnProperty.call(AN,k))return;try{Object.defineProperty(AN,k,{configurable:true,enumerable:true,get(){return CHX[k].f()}})}catch(e){console.log('an31',k,e)}});
const DARK=['market35night'];
const veil=(k,f)=>function(W,H){let d='';try{d=f(W,H)}catch(e){console.log('bg31',k,e)}
 if(window.__mkVeil){const dark=DARK.includes(k);d+=`<rect x="-400" y="0" width="${W+800}" height="${H}" fill="${dark?'#141A44':'#FFFFFF'}" opacity="${dark?'.18':'.22'}"/>`}return d};
const BGKEYS=['home31','stationery32','kitchen33','party34','market35','market35night'];
BGKEYS.forEach(k=>{if(BG5[k])CHBG[k]=veil(k,BG5[k])});
try{if(window.RD40BG)BGKEYS.forEach(k=>{RD40BG[k]=(W,H)=>CHBG[k](W,H)})}catch(e){}
try{const NEW5=BGKEYS;const _d5=decor2;decor2=function(id){if(NEW5.includes(id)&&CHBG[id]){let own=false;try{own=CHAPTERS[S.ch].bg===id&&!S.pmode}catch(e){}
  if(!own){const fn=CHBG[id];delete CHBG[id];try{return _d5(id)}finally{CHBG[id]=fn}}}return _d5(id)}}catch(e){}

/* ---------- 2. 題庫（100 題）和標籤顏色 ---------- */
Object.assign(QTAG,S5QTAG);
const Q5_0=QUIZ.length;
S5Q.forEach(q=>QUIZ.push(q));
window.__s5Q0=Q5_0;

/* ---------- 3. 獎品 ---------- */
// 第 31 章：寵物小松鼠＋書桌上的存錢小豬；32：彩色鉛筆領巾；33：小管家圍裙裝；34：生日派對小帽；35：市集小背包＋市集小攤位玩具架；塗色 31、33、34、35
const PZ=S5D;  // S5D[c].prize
ITEMS.push({id:'squirrel31',slot:'pet',name:PZ[31].prize.pet[1],price:0,chapter:31},
 {id:'pacc32',slot:'petacc',name:PZ[32].prize.petacc[1],price:0,chapter:32},
 {id:'pacc34',slot:'petacc',name:PZ[34].prize.petacc[1],price:0,chapter:34},
 {id:'prop35',slot:'prop',name:PZ[35].prize.prop[1],price:0,chapter:35});
// 衣服：第 32、33、34 章（第 32、34 章家長 11/13 決定加送衣服；公主 dress32／33／34、王子 b_dress32／b_apron33／b_dress34）
const DCH=[32,33,34];
if(ISBOY){DCH.forEach(c=>ITEMS.push({id:PZ[c].prize.boy[0],slot:'dress',name:PZ[c].prize.boy[1],price:0,chapter:c}));try{NEUTRAL_PROPS.push('prop35')}catch(e){}}
else DCH.forEach(c=>ITEMS.push({id:PZ[c].prize.dress[0],slot:'dress',name:PZ[c].prize.dress[1],price:0,chapter:c}));
DCH.forEach(c=>{const d=PZ[c].prize.dress[0],bb=PZ[c].prize.boy[0];if(A5.DRESS[d])DRESS[d]=Object.assign({},A5.DRESS[d]);if(A5.BOY[bb])BFIT[bb]=Object.assign({},A5.BOY[bb],{n:PZ[c].prize.boy[1],chapter:c})});
ITEMS.forEach(i=>{ITEM[i.id]=i});
// 衣服細節的掛勾（花紋、上衣、廚師帽）：chars31.js 的 S31.hook()；設好 DRESS／BFIT 之後再接一次，接到時 window.__s31hooked===1
try{if(window.S31&&typeof S31.hook==='function'&&window.__s31hooked!==1)S31.hook()}catch(e){console.log('s31hook',e)}
try{if(window.S31&&S31.CERT_CSS){const c=document.createElement('style');c.textContent=S31.CERT_CSS;document.head.appendChild(c)}}catch(e){}
// 道具
{const _pr5=IDOL.PR;IDOL.PR=g=>{const o=_pr5(g);try{o.prop35=A5.PR.prop35}catch(e){}return o}}
// 寵物小松鼠：正式圖（PET31.squirrel31）或占位圖；配件用 m21 的 accOverlay（錨點 PET31.anchor）
try{ACCANCH.squirrel31=Object.assign({h:[56,30],n:[56,64],s:1.05},PETR.anchor||{})}catch(e){}
try{ACCHEAD.push('pacc34')}catch(e){}
let PK5='';
{const _pa5=petAcc;petAcc=function(acc,g){if(acc==='pacc32'||acc==='pacc34'){try{return A5.PACC[acc](g,PK5)}catch(e){return ''}}return _pa5.apply(this,arguments)}}
{const _ps5=petSVG;petSVG=function(kind,acc,a){const o=PK5;PK5=kind;try{
  if(kind==='squirrel31'){let s=PETR.squirrel31(a||'',acc||'');if(PETR.own)return s;try{const ov=acc&&typeof accOverlay==='function'?accOverlay('squirrel31',acc):null;
    if(ov){const i=s.indexOf('>')+1,j=s.lastIndexOf('</svg>');if(i>0&&j>0)s=ov.back?s.slice(0,i)+ov.defs+ov.body+s.slice(i):s.slice(0,i)+ov.defs+s.slice(i,j)+ov.body+s.slice(j)}}catch(e){}return s}
  return _ps5.apply(this,arguments)}finally{PK5=o}}}
// 房間玩具
const ROOM5=[['toy','piggy31',PZ[31].prize.room[2],31],['toy','stall35',PZ[35].prize.room[2],35]];
ROOM5.forEach(([s,v,nm,c])=>{RMPRIZE.push([s,v,nm,c]);if(ROOMITEMS[s])ROOMITEMS[s].push([v,nm,999])});
{const _rs5=roomSVG;roomSVG=function(){const R=_rs5.apply(this,arguments);try{const ty=roomGet('toy');if(ty==='piggy31'||ty==='stall35')R.toy=A5.TOY[ty]}catch(e){console.log('room31',e)}return R}}
// 塗色本（200×200；分類「大冒險」；完成那一章才打開）
const PIC5=[[31,PZ[31].prize.pic],[33,PZ[33].prize.pic],[34,PZ[34].prize.pic],[35,PZ[35].prize.pic]];
PIC5.forEach(([c,nm],k)=>{const P=A5.PICS[k]||{};try{PICS.push({n:nm,ch:c,cat47:P.cat||'adv',lv47:P.lv||1,r:P.r||[],deco43:typeof P.deco==='function'?P.deco():'',lw43:5})}catch(e){console.log('pic31',e)}});
// 化石塗色大圖 2 張（菊石、恐龍化石；S31.PICS_FOSSIL）：家長 11/14 決定不用完成章節就能畫 → 不帶 ch
const PICF5=(Array.isArray(S31R.PICS_FOSSIL)?S31R.PICS_FOSSIL:[]).filter(P=>P&&P.n&&!PICS.some(x=>x.n===P.n));
PICF5.forEach(P=>{try{PICS.push({n:P.n,cat47:P.cat||'adv',lv47:P.lv||1,r:P.r||[],deco43:typeof P.deco==='function'?P.deco():'',lw43:5})}catch(e){console.log('picfossil',e)}});
// 每一章拿到什麼（章末禮物、補發都看這張）
const GIFT={31:['squirrel31'],32:[ISBOY?'b_dress32':'dress32','pacc32'],33:[ISBOY?'b_apron33':'dress33'],34:[ISBOY?'b_dress34':'dress34','pacc34'],35:['prop35']};
window.__s5GIFT=GIFT;

/* ---------- 4. 大地圖第七段、章節 ---------- */
WORLD.push({i:30,ic:()=>art('🐷'),c:['#FF9FB8','#8A3A5A'],name:'我的存錢小豬'},{i:31,ic:()=>art('✏️'),c:['#7FB8F0','#2A4A8A'],name:'小小文具店'},
 {i:32,ic:()=>art('🥪'),c:['#FFC86A','#8A5A1A'],name:'廚房小幫手'},{i:33,ic:()=>art('🎂'),c:['#FF9FD0','#7A2A6A'],name:'好朋友的生日會'},{i:34,ic:()=>art('🛍️'),c:['#9AD86A','#2A6A2A'],name:'週末小市集'});
ARCS.push({t:'星光小管家',n:'第七段',from:30,ic:()=>art('🐷'),say:'第五季，星光小管家！跟存錢小豬咚咚一起，學會存錢、幫忙做家事！'});
const LETTER_P={},LETTER_B={};
S5CH.forEach(c=>{const D=S5D[c];
 const lv=D.levels.map(L=>L_(L[0],L[1],D.bg,L[3].slice(),L[4],L[5]));
 CHAPTERS.push({name:D.name,title:D.title,levels:lv,bg:D.bg,mix:[...S2MIX,'quiz:'+D.tag,'pin','m20','eword'],
  firstSay:D.firstSay,letter:D.letter_p,prize:c===31?['squirrel31']:[],gems:10,prizeName:'',endText:D.endText,s5:c});
 const C=CHAPTERS[CHAPTERS.length-1];
 if(c>=32&&c<=34)C.outfitName=ISBOY?D.prize.boy[1]:D.prize.dress[1];
 if(c===35)C.outfitName=D.prize.prop[1];
 if(ISBOY){C.letter=D.letter_b;C.boyLetter=1;DRAGON_SAY.add(voiceT(C.letter.replace(/<br>/g,'')))}
 else PRINCE_LETTERS.add(C.letter.replace(/<br>/g,''));
 LETTER_P[c]=D.letter_p.replace(/<br>/g,'');LETTER_B[c]=D.letter_b.replace(/<br>/g,'')});
// 第三十章結束：接第五季
const S5NEXT='下一站：第五季「星光小管家」！';
const S4END5='謝謝你一路勇敢探險！下一站：第五季「星光小管家」！';
const S5AD='這是第五季的冒險內容，請爸爸媽媽到家長專區看看喔！';
try{CHAPTERS[29].endText=S4END5}catch(e){}

/* ---------- 5. 開場故事頁 ---------- */
const STORY_HELPER={31:'dongdong',32:'dongdong',33:'dongdong',34:'bunny',35:'dongdong'};
const _story5=SCREENS.story;
SCREENS.story=function(){if(!inS5(S.ch))return _story5.apply(this,arguments);
 const c=S.ch+1,D=S5D[c];const bg=k=>`<svg class="bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice">${sbg(k)}</svg>`;
 const ver=ISBOY?D.story_b:D.story_p;const T=D.story.slice();T.splice(D.storyAt,0,ver);const hp=STORY_HELPER[c];
 const P=T.map((t,k)=>({t,a:()=>k===D.storyAt?`${princess(S.look)}<span class="bob">${ISBOY?fireB():prince()}</span>`:k===T.length-1?`${myPet('class="small"')}${princess(S.look)}<span class="bob">${animal(hp)}</span>`:`${princess(S.look)}<span class="bob">${animal(hp)}</span>`}));
 const fireB=()=>{try{if(S.look.pet==='dragon')return myPet();return petSVG('dragon','','')}catch(e){return myPet()}};
 let i=0;
 function render(){const p=P[i];
  screen.innerHTML=`<div class="story s4story s5story"><button class="skip" id="skip">跳過</button><div class="scard">
   <div class="scene">${bg(D.bg)}<div class="actors">${p.a()}</div></div><p class="stext">${p.t}</p>
   <div class="sdots">${P.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
   <button class="btn" id="next">${i<P.length-1?'下一頁':'去換裝'}</button></div></div>`;
  say(talk5(p.t));
  $('#next').onclick=()=>{if(i<P.length-1){i++;sfx('pop');render()}else go('guide')};
  $('#skip').onclick=()=>go('guide')}
 render()};
// 王子版「火花說：…」用火花的聲音，後面「咚咚說：…」用旁白（中間隔一下）
function talk5(t){if(!ISBOY||!/火花說：/.test(t))return [t];const seg=t.split(/(?=(?:火花|咚咚)說：)/).filter(Boolean);const o=[];
 seg.forEach(s=>{if(o.length)o.push({pause:200});o.push(s.startsWith('火花說：')?{zh:s.slice(4),who:'dragon'}:s)});return o}

/* ---------- 6. 每一關先從那一關主題的題目抽；沒玩到第五季的，一般問答不抽第五季的題目 ---------- */
{const _qz5=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{const c=S.ch+1;const D=inS5(S.ch)?S5D[c]:null;
   if(D&&fcat===D.tag&&S.qs&&S.qs.__lv!==undefined&&D.lv[S.level]&&!S.pmode){
    const base=D.lv[S.level].map(k=>k+Q5_0).filter(k=>QUIZ[k]&&QUIZ[k][0]===D.tag);
    const seen=S.qs.__u5||(S.qs.__u5=[]);let i;const F=D.first[String(S.level)];
    if(S.qs.indexOf('quiz:'+D.tag)===S.q&&F!=null&&!seen.length)i=F+Q5_0;
    else{let pool=base.filter(x=>!S.usedQ.includes(x)&&!seen.includes(x));
     if(!pool.length){S.usedQ=S.usedQ.filter(x=>!base.includes(x));pool=base.filter(x=>!seen.includes(x))}
     if(!pool.length)pool=base;i=pick(pool)}
    seen.push(i);
    const keep=S.usedQ.filter(x=>x!==i);S.usedQ=keep.concat(QUIZ.map((q,k)=>k).filter(k=>k!==i&&QUIZ[k][0]===D.tag&&!keep.includes(k)));
    try{return _qz5.apply(this,arguments)}finally{S.usedQ=keep.concat([i])}}}catch(e){console.log('q31lv',e)}
  return _qz5.apply(this,arguments)}}
// S.qs.__lv：startLevel 抽的那一輪（不是自由練習）
{const _sl5=startLevel;startLevel=function(i){const r=_sl5.apply(this,arguments);try{if(Array.isArray(S.qs)&&!S.pmode)S.qs.__lv=i}catch(e){}return r}}
const s5Open=i=>{try{const a=typeof window.__appOpen==='function'?!!window.__appOpen(i):true;return a&&(IS_APPX()||(typeof s3Ok==='function'?!!s3Ok():!!V2.s3pw))}catch(e){return false}};
const s5QOk=()=>{try{if(inS5(S.ch)&&!S.pmode)return true;if(IS_APPX())return s5Open(C31I)&&S.chDone>=C31I;return S.chDone>=C31I}catch(e){return false}};
window.__s5QOk=s5QOk;
{const _qz5g=BUILD.quiz;BUILD.quiz=function(play,sp,fcat){
  try{if(!fcat&&!s5QOk()&&Array.isArray(S.usedQ)){const s5=[];for(let k=Q5_0;k<Q5_0+S5Q.length;k++)s5.push(k);const SS=new Set(s5);
    let keep=S.usedQ.filter(x=>!SS.has(x));
    if(!QUIZ.some((q,k)=>!SS.has(k)&&!keep.includes(k)))keep=[];
    S.usedQ=keep.concat(s5);
    try{return _qz5g.apply(this,arguments)}finally{const add=S.usedQ.filter(x=>!SS.has(x)&&!keep.includes(x));S.usedQ=keep.concat(add)}}}catch(e){console.log('q31gen',e)}
  return _qz5g.apply(this,arguments)}}

/* ---------- 7. 新題型 ---------- */
const curFull=t=>{const c=String(S.qs&&S.qs[S.q]||'');return c.startsWith(t+':')?c:''};
const ZY14='ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒ',ZY8='ㄅㄆㄇㄈㄉㄊㄋㄌ',AJ='ABCDEFGHIJ',S5CHARS='ㄍㄎㄏㄐㄑㄒKLMNOP';
const isZ5=t=>ZY14.includes(t);
const reachedCh=c=>{const i=c-1;return S.chDone>i||(S.ch===i&&!S.pmode)};
function zyLearned5(){let s=ZY8;S5CH.forEach(c=>{if(reachedCh(c))s+=S5D[c].learn.replace(/[A-Z]/g,'')});return [...new Set(s.split(''))]}
function upLearned5(){let s=AJ;S5CH.forEach(c=>{if(reachedCh(c))s+=S5D[c].learn.replace(/[^A-Z]/g,'')});return [...new Set(s.split(''))]}
const kOpts=()=>S.diff==='easy'?2:S.diff==='hard'?4:3;
const optsFrom=(t,pool,like,k)=>{const rest=pool.filter(x=>x!==t);const L=like&&rest.includes(like)&&S.diff!=='easy'?[like]:[];return shuffle([t,...[...new Set([...L,...shuffle(rest)])].slice(0,k-1)])};
const pickNot=(arr,last)=>{const a=arr.filter(x=>x!==last);return pick(a.length?a:arr)};
// ---- 聽音找符號：聽一個詞（念兩次），選開頭的注音（ㄐㄑㄒ 也只聽音找符號，不拼讀） ----
const hearLine=w=>`${w}，${w}，開頭是哪一個注音呢？`;
let lastWord='';
function bHear(play,sp,targets){const L=zyLearned5();let T=(targets||[]).filter(x=>S5HEAR[x]);if(!T.length)T=L.filter(x=>S5HEAR[x]);
 const t=pickNot(T,S.last);S.last=t;S.ans=t;const W=S5HEAR[t];const [e,w]=pickNot(W,W.find(x=>x[1]===lastWord))||W[0];lastWord=w;
 const pool=L.includes(t)?L:L.concat(t);const opts=optsFrom(t,pool,S5LIKE.z[t],kOpts());
 const line=hearLine(w);
 setPrompt(`聽聽看，<b class="kw">${w}</b> 開頭是哪一個注音？`,[line],sp);
 play.innerHTML=`<div class="h5card" aria-hidden="true"><span class="h5pic">${art(e)}</span><b class="h5w">${w}</b></div><div class="flutter h5flut">${opts.map((c,i)=>`<button class="bal" data-v="${c}" style="--w:${BCOL[i]};--dl:${(i*.25).toFixed(2)}s" aria-label="注音 ${c}"><div class="fl">${balloon(BCOL[i])}<span class="zy">${c}</span></div></button>`).join('')}</div>`;
 const btn=v=>$$('.bal',play).find(b=>b.dataset.v===v);
 $('.h5card',play).onclick=()=>{try{say([line])}catch(err){}};
 S.hint=m=>{if(m===1)petSay('再仔細聽一次喔！',['再仔細聽一次喔！',line]);else{petSay('我幫你，看發光的氣球！');glow(btn(t))}};
 $$('.bal',play).forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(v===t){b.classList.add('win');right(b,[praise(),'開頭的音是',{zh:ZREAD[t],slow:1}])}else wrong(b)})}
// ---- 聽字母名，找大寫字母（K～P，跟以前學的一起） ----
function bAbc(play,sp,targets){const L=upLearned5();let T=(targets||[]).filter(x=>/^[A-Z]$/.test(x));if(!T.length)T=L;
 const t=pickNot(T,S.last);S.last=t;S.ans=t;const k=kOpts();const pool=L.includes(t)?L:L.concat(t);const opts=optsFrom(t,pool,S5LIKE.l[t],k);
 setPrompt(`聽聽看，找出小兔子說的字母 <b class="ear">?</b>`,['找一找，這個字母的蝴蝶：',{en:`${t}.`,slow:2}],sp);
 play.innerHTML=`<div class="flutter">${opts.map((c,i)=>{const fx=(i-(k-1)/2)*40+(i%2?30:-30),fy=-40-(i%2)*20;return `<button class="bfly" data-v="${c}" style="--w:${WING[i]};--dl:${(i*.22).toFixed(2)}s;--fx:${fx}vw;--fy:${fy}vh;--fr:${i%2?30:-30}deg" aria-label="字母 ${c}"><div class="fl">${butterfly(WING[i])}<span>${c}</span></div></button>`}).join('')}</div>`;
 const btn=v=>$$('.bfly',play).find(b=>b.dataset.v===v);
 S.hint=m=>{if(m===1)petSay('再仔細聽一次喔！',['再仔細聽一次喔：',{en:`${t}.`,slow:2}]);else{petSay('我幫你，看發光的那一隻！');glow(btn(t))}};
 $$('.bfly',play).forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(v===t){b.classList.add('win');right(b,[praise(),'這是',{en:t+'.',slow:2}])}else wrong(b)})}
// 數學的上限：關卡寫的（30／40／50）；自由練習寫 auto＝看玩到第幾章
const autoMax=()=>{const d=S.chDone;return d>=C35I?50:d>=33?50:d>=31?40:30};
const maxOf=a=>{const n=+a;return n>0?n:autoMax()};
const ICON5=()=>{const c=S.pmode?0:S.ch+1;return c===32?art('✏️'):c===34?art('🍬'):c===35?art('🍎'):acorn()};
// ---- 一排十個，數到 30／40／50 ----
function bCnt(play,sp,a){const mx=maxOf(a);let n;const lo=S.diff==='easy'?11:21,hi=S.diff==='easy'?Math.min(20,mx):mx;do{n=rand(lo,hi)}while(n===S.last&&hi>lo);S.last=n;S.ans=n;
 const it=ICON5();const rows=[];for(let r=0;r*10<n;r++)rows.push(Math.min(10,n-r*10));
 setPrompt('一排有十個，一共有幾個？',['一排有十個，一共有幾個呢？'],sp);
 play.innerHTML=`<div class="c5rows">${rows.map((m,r)=>`<div class="c5row${m===10?' full':''}" data-r="${r}">${Array.from({length:m},(_,i)=>`<button class="it c5it" style="--dl:${((r*10+i)*.03).toFixed(2)}s" aria-label="一個">${it}</button>`).join('')}</div>`).join('')}</div>${tilesHTML(options(n,1,Math.max(mx,n+10)),.4)}`;
 const reset=countable(play);
 S.hint=m=>{reset();if(m===1)petSay('先一排一排數，十、二十、三十，再一個一個數！');else{petSay('我陪你一起數！');const full=$$('.c5row.full',play);const part=$$('.c5row:not(.full) .c5it',play);countAlong([...full,...part],[...full.map((_,i)=>(i+1)*10),...part.map((_,i)=>full.length*10+i+1)])}};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;const v=+t.dataset.v;if(v===n){$$('.c5it',play).forEach(e=>e.classList.add('dance'));right(t,[praise(),`${n}！`])}else wrong(t)})}
// ---- 十個十個數（一包十個） ----
function bTens(play,sp,a){const mx=maxOf(a);const K=Math.max(2,Math.floor(mx/10));let k;do{k=rand(2,S.diff==='easy'?Math.min(3,K):K)}while(k*10===S.last&&K>2);const n=k*10;S.last=n;S.ans=n;
 const it=ICON5();const o=new Set([n]);while(o.size<(S.diff==='easy'?2:3)){const v=n+pick([-10,10,-20,20]);if(v>=10&&v<=Math.max(mx,n+10))o.add(v)}
 setPrompt('十個一包，十個十個數，一共有幾個？',['十個一包，十個十個數，一共有幾個呢？'],sp);
 play.innerHTML=`<div class="t5bags">${Array.from({length:k},(_,b)=>`<button class="t5bag" style="--dl:${(b*.15).toFixed(2)}s" aria-label="一包十個"><span class="t5in">${Array.from({length:10},()=>`<i>${it}</i>`).join('')}</span></button>`).join('')}</div>${tilesHTML(shuffle([...o]),.5)}`;
 const bags=$$('.t5bag',play);let cnt=0;bags.forEach(b=>b.onclick=()=>{if(S.lock||b.dataset.n)return;cnt++;b.dataset.n=cnt*10;b.classList.add('counted');tone(480+cnt*55,0,.16,'triangle',.08);say([String(cnt*10)])});
 S.hint=m=>{bags.forEach(b=>{delete b.dataset.n;b.classList.remove('counted')});cnt=0;if(m===1)petSay('十、二十、三十……跟著我一起數！');else{petSay('我陪你一起數！');countAlong(bags,bags.map((_,i)=>(i+1)*10))}};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===n){bags.forEach(b=>b.classList.add('dance'));right(t,[praise(),`${n}！`])}else wrong(t)})}
// ---- 排隊第幾個 ----
const QPPL=['🐰','🐻','🐱','🐶','🐷','🦊','🐼','🐸'];
function bNth(play,sp){const N=S.diff==='easy'?4:S.diff==='hard'?7:5;const ppl=shuffle(QPPL).slice(0,N);let k;do{k=rand(S.diff==='easy'?1:2,N)}while(k===S.last&&N>2);S.last=k;S.ans=k;
 const o=new Set([k]);while(o.size<Math.min(N,S.diff==='easy'?2:3))o.add(rand(1,N));
 setPrompt('戴星星的朋友，排在<b class="kw">第幾個</b>？',['數一數，戴星星的朋友，排在第幾個呢？'],sp);
 play.innerHTML=`<div class="n5line"><span class="n5booth">${art('🎂')}</span>${ppl.map((a,i)=>`<span class="n5p${i+1===k?' star':''}" data-i="${i+1}">${i+1===k?`<i class="n5st">${art('⭐')}</i>`:''}<span class="emoji">${a}</span></span>`).join('')}</div>
  <div class="tiles">${shuffle([...o]).map((v,i)=>`<button class="tile c${i%5} long n5t" style="--dl:${(.3+i*.12).toFixed(2)}s" data-v="${v}">第${v}個</button>`).join('')}</div>`;
 S.hint=m=>{clearCount(play);if(m===1)petSay('從最前面開始數！');else{petSay('我陪你數！');countAlong($$('.n5p',play).slice(0,k))}};
 $$('.n5t',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(+t.dataset.v===k)right(t,[praise(),`${k}！`]);else wrong(t)})}
// ---- 分水果：一人一個輪流發，發完看大家是不是一樣多（只操作，不說平分、不出算式） ----
const FRUIT=['🍎','🍊','🍓','🍐','🍌'];const FRIENDS=['🐰','🐻','🐱','🐶','🦊','🐼'];
function bDeal(play,sp){let T,k,ask='each';const d=S.diff;
 if(d==='easy'){[T,k]=pick([[4,2],[6,2],[6,3]])}else if(d==='mid'){[T,k]=pick([[6,2],[6,3],[8,2],[9,3]])}else{[T,k]=pick([[6,3],[8,2],[7,2],[8,3],[9,3],[10,2]]);ask='same'}
 const key=T+'/'+k;if(key===S.last&&d!=='easy'){[T,k]=T===6&&k===3?[6,2]:[6,3]}S.last=T+'/'+k;
 const each=Math.floor(T/k),same=T%k===0;S.ans=ask==='same'?(same?'same':'diff'):each;
 const fr=pick(FRUIT),who=shuffle(FRIENDS).slice(0,k);
 const vq=ask==='same'?'水果一人一個，輪流發給大家。發完了，大家是不是一樣多呢？':'水果一人一個，輪流發給大家。發完了，每個人有幾個呢？';
 setPrompt(ask==='same'?'一人一個，輪流發。發完了，大家<b class="kw">一樣多</b>嗎？':'一人一個，輪流發。發完了，<b class="kw">每個人有幾個</b>？',[vq],sp);
 const tiles=ask==='same'?`<div class="tiles d5yn"><button class="tile c0 long" style="--dl:.4s" data-v="same">一樣多</button><button class="tile c2 long" style="--dl:.52s" data-v="diff">不一樣多</button></div>`:tilesHTML(options(each,1,6,S.diff==='easy'?2:3),.4);
 play.innerHTML=`<div class="d5fruit">${Array.from({length:T},(_,i)=>`<button class="d5f" style="--dl:${(i*.06).toFixed(2)}s" aria-label="水果">${art(fr)}</button>`).join('')}</div>
  <div class="d5plates">${who.map((f,i)=>`<div class="d5plate"><span class="d5who emoji">${f}</span><div class="d5pl" id="d5p${i}"></div></div>`).join('')}</div>${tiles}`;
 let dealt=0,said=0;const deal=c=>{if(!c||c.classList.contains('gone'))return;const pl=$('#d5p'+(dealt%k),play);c.classList.add('gone');if(pl)pl.insertAdjacentHTML('beforeend',`<i>${art(fr)}</i>`);dealt++;tone(560+dealt*25,0,.1,'triangle',.07);
  if(dealt===T&&!said&&!S.lock){said=1;setTimeout(()=>{if(!S.lock&&S.screen==='stage')say(['發完了！看看大家是不是一樣多？'])},250)}};
 $$('.d5f',play).forEach(c=>c.onclick=()=>{if(!S.lock)deal(c)});
 S.hint=async m=>{if(m===1)petSay('先點水果，一人一個，輪流發給大家！');else{petSay('我幫你發！');for(const c of $$('.d5f:not(.gone)',play)){if(S.lock)return;deal(c);await wait(200)}glow($$('.tile',play).find(t=>t.dataset.v===String(S.ans)))}};
 $$('.tile',play).forEach(t=>t.onclick=()=>{if(S.lock)return;if(t.dataset.v===String(S.ans)){$$('.d5f:not(.gone)',play).forEach(deal);right(t,[praise(),S.ans==='diff'?'有人多一個，不一樣多！':'大家一樣多！'])}else wrong(t)})}
// ---- 把錢放進盤子，剛剛好（:30 只有 1、5、10 元；:50 多一個 50 元） ----
const coinB=(v,i)=>`<button class="coin it s3coin c5coin v${v}" style="--dl:${(i*.08).toFixed(2)}s" data-c="${v}" aria-label="${v}元">${coinSVG(v)}</button>`;
function bPay(play,sp,a){const mx=maxOf(a);const has50=mx>=50;let price;
 const [lo,hi]=has50?(S.diff==='easy'?[21,30]:[31,50]):(S.diff==='easy'?[11,20]:[21,30]);do{price=rand(lo,hi)}while(price===S.last);S.last=price;S.ans=price;
 const tray=(has50?[50,10,10,10,10,5,5,1,1,1,1]:[10,10,10,5,5,1,1,1,1,1]);
 setPrompt(`<b class="kw">${price} 元</b>，把錢放進盤子，剛剛好！`,[`${price}元！`,'把錢放進盤子裡，要剛剛好喔！'],sp);
 play.innerHTML=`<div class="s3pay"><div class="s3tag"><span class="emo">${art(pick(['🎁','🧸','📒','🧣','🖍️']))}</span><b>${price}<small>元</small></b></div><div class="s3plate" id="plate"><span class="s3sum" id="sum">0 元</span></div></div>
  <div class="coins s3coins s3tray">${tray.map((v,i)=>coinB(v,i)).join('')}</div>`;
 const plate=$('#plate',play),sum=$('#sum',play);const inP=()=>$$('.c5coin',plate).reduce((x,c)=>x+ +c.dataset.c,0);
 const upd=()=>{const s=inP();sum.textContent=s+' 元';sum.classList.toggle('ok',s===price);return s};
 const back=c=>{$('.s3tray',play).appendChild(c);c.classList.remove('inplate');upd()};
 let busy=0;
 function tapC(c){if(S.lock||busy)return;const v=+c.dataset.c;
  if(c.classList.contains('inplate')){tone(500,0,.1,'triangle',.06);back(c);say([`${v}元！`]);return}
  c.classList.add('inplate');plate.appendChild(c);tone(700,0,.12,'triangle',.08);const s=upd();
  if(s===price){$$('.c5coin',plate).forEach(x=>x.classList.add('dance'));right(plate,[praise(),'剛剛好，',`${price}元！`])}
  else if(s>price){busy=1;c.classList.add('s3over');petSay('太多了！拿回來一個，再想想看。',[`${s}元！`,'太多了！','拿回來一個，再想想看。']);wrong(c);setTimeout(()=>{busy=0;c.classList.remove('s3over');if(c.isConnected&&!S.lock&&c.classList.contains('inplate'))back(c)},900)}
  else say([`${v}元！`])}
 $$('.c5coin',play).forEach(c=>c.onclick=()=>tapC(c));
 const plan=()=>{let need=price-inP();const out=[];for(const c of $$('.s3tray .c5coin',play).sort((x,y)=>y.dataset.c-x.dataset.c)){const v=+c.dataset.c;if(v<=need){out.push(c);need-=v}}return need===0?out:[]};
 S.hint=m=>{if(m===1)petSay(price>=50?'一個五十元，就是五十元喔！':'先放十元，再看看還差多少！');else{const p=plan();petSay('放這一個！');if(p[0])glow(p[0])}};
 S.__auto=()=>{$$('.c5coin',plate).forEach(back);plan().forEach(tapC)}}
// ---- 一個 50 元和五個 10 元一樣多 ----
function bFifty(play,sp){S.ans='5';const k=S.diff==='easy'?2:3;const o=shuffle([5,...shuffle([3,4,6]).slice(0,k-1)]);
 setPrompt('哪一堆十元，跟一個<b class="kw">五十元</b>一樣多？',['哪一堆十元，跟一個五十元一樣多呢？'],sp);
 play.innerHTML=`<div class="f5wrap"><div class="f5one">${coinSVG(50)}</div><div class="f5opts">${o.map((m,i)=>`<button class="f5grp" data-v="${m}" style="--dl:${(.2+i*.15).toFixed(2)}s" aria-label="${m}個十元">${Array.from({length:m},()=>`<i class="f5c">${coinSVG(10)}</i>`).join('')}</button>`).join('')}</div></div>`;
 S.hint=m=>{clearCount(play);if(m===1)petSay('十、二十、三十、四十、五十，數到五十！');else{const g=$('.f5grp[data-v="5"]',play);petSay('我陪你數！');if(g)countAlong($$('.f5c',g),[10,20,30,40,50])}};
 $$('.f5grp',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v==='5'){$$('.f5c',b).forEach(e=>e.classList.add('dance'));right(b,[praise(),'五個十元，就是五十元！'])}else wrong(b)})}
// ---- 50 以內比大小 ----
function bBig(play,sp,a){const mx=maxOf(a);const k=S.diff==='hard'?3:2;const lo=S.diff==='easy'?10:21,hi=S.diff==='easy'?Math.min(30,mx):mx;const v=new Set();
 while(v.size<k){const x=rand(lo,hi);if(S.diff==='hard'&&v.size&&Math.random()<.5){const b=[...v][0];const y=Math.floor(b/10)*10+rand(0,9);if(y>=lo&&y<=hi){v.add(y);continue}}v.add(x)}
 const vals=[...v];const big=Math.random()<.6;const t=big?Math.max(...vals):Math.min(...vals);S.ans=String(t);S.last=t;
 setPrompt(`哪一個數字最<b class="kw">${big?'大':'小'}</b>？`,[`這裡有${k===2?'兩':'三'}個數字，哪一個最${big?'大':'小'}呢？`],sp);
 play.innerHTML=tilesHTML(shuffle(vals));
 $$('.tile',play).forEach(b=>b.onclick=()=>{if(S.lock)return;if(b.dataset.v===S.ans)right(b,[praise(),`${t}最${big?'大':'小'}！`]);else wrong(b)});
 S.hint=m=>{if(m===1)petSay('先看十位數，十位數大的就比較大喔！');else{petSay('看發光的那一個！');glow($$('.tile',play).find(b=>b.dataset.v===S.ans))}}}
// 接到現有題型上（照原本的參數順序；第二段是 s5 的才接手）
const B5={hear:bHear,k5:bAbc,s5c:bCnt,s5t:bTens,s5n:bNth,s5d:bDeal,s5p:bPay,s5f:bFifty,s5b:bBig};
const argsOf=(type,sub)=>{const f=curFull(type);if(!f)return null;const p=f.split(':');return p[1]===sub?p.slice(2):null};
const wrap5=(type,subs)=>{const _o=BUILD[type];BUILD[type]=function(play,sp,arg){try{if(subs.includes(arg)){const a=argsOf(type,arg);const k=(a&&a[0])||'';S.w4fb=0;
   // 自由練習「數錢和數數」：還沒玩到的題型先換成數數
   let sub=arg;if(S.pmode&&S.pmode.k==='math5'){if(sub==='s5d'&&S.chDone<33)sub='s5c';if(sub==='s5t'&&S.chDone<34)sub='s5c';if(sub==='s5b'&&S.chDone<32)sub='s5c'}
   if(sub==='hear'||sub==='k5')return B5[sub](play,sp,k&&k!=='auto'?k.split('|'):null);
   return B5[sub](play,sp,k)}}catch(e){console.log('b5',type,arg,e)}return _o.apply(this,arguments)}};
wrap5('zhuyin',['hear']);wrap5('letter',['k5']);wrap5('count',['s5c','s5t','s5n','s5d']);wrap5('coin',['s5p','s5f']);wrap5('compare',['s5b']);
try{Object.assign(TNAME,{})}catch(e){}

/* ---------- 8. 寫字：ㄍ～ㄒ、K～P（寫字負責人的筆畫資料進到 __WR.CH 以後就用；還沒有的字退回「聽音找符號」／認字母） ---------- */
const wrHas=c=>{try{return !!(window.__WR&&__WR.CH&&__WR.CH[c])}catch(e){return false}};
function wr5Fallback(play,sp,chars){const c=pickNot(chars.length?chars:['ㄍ'],S.last);const r=isZ5(c)?bHear(play,sp,[c]):bAbc(play,sp,[c]);S.w4fb=1;return r}
{const _w5=BUILD.write,_r5=BUILD.R;
 BUILD.write=function(play,sp,arg){try{const f=curFull('write');const c=(f?f.split(':')[1]:arg)||'';if(c&&S5CHARS.includes(c)&&!wrHas(c))return wr5Fallback(play,sp,[c])}catch(e){console.log('w5',e)}return _w5.apply(this,arguments)};
 BUILD.R=function(play,sp,arg){try{const f=curFull('R');if(f){const p=f.split(':');const chars=(p[1]||'').split('|').filter(Boolean);const ok=chars.filter(c=>!S5CHARS.includes(c)||wrHas(c));
    if(!ok.length)return wr5Fallback(play,sp,chars);
    if(ok.length!==chars.length){p[1]=ok.join('|');S.qs[S.q]=p.join(':')}}}catch(e){console.log('r5',e)}return _r5.apply(this,arguments)}}
// 學過的字（第五季）：那一章完成，或正在玩到第 9 關以後（③ 只給起點那一關）就算學過；剛開始那一章只算第一個注音和第一個字母
function s5Learned(){let o='';S5CH.forEach(c=>{const i=c-1,L=S5D[c].learn;if(!L)return;if(S.chDone>i||(S.ch===i&&(S.progs[i]||0)>=8))o+=L;else if(S.chDone>=i&&(S.progs[i]||0)>=1)o+=L[0]+(L.match(/[A-Z]/)||[''])[0]});return [...new Set(o.split(''))].filter(Boolean)}
window.__s5Learned=s5Learned;
{const _wf5=BUILD.wfree;BUILD.wfree=function(play,sp){try{const L5=s5Learned().filter(wrHas);if(L5.length){const L4=typeof window.__s4Learned==='function'?__s4Learned():[];const all=[...new Set([...L4,...L5])];
   const t=pickNot(all,S.last);const code='write:'+t+':'+(S.diff==='easy'?2:3);if(window.__WR&&typeof __WR.build==='function'&&wrHas(t)){try{return __WR.build(play,sp,code)}catch(e){console.log('wr free5',e)}}}}catch(e){}return _wf5.apply(this,arguments)}}

/* ---------- 9. 破關小劇場（第 31～34 章各一句；第 35 章用季完結大結局） ---------- */
try{const A=k=>()=>animal(k),I=e=>()=>art(e);const TH=window.TH93;
 Object.assign(TH.T93,{
  30:{line:S5D[31].theater,o:'50% 60%',tint:'warm',deco:[[A('dongdong'),'hop',84,58,15],[I('⭐'),'pop',16,18,7],[I('⭐'),'pop',70,14,6]]},
  31:{line:S5D[32].theater,o:'50% 60%',tint:'day',deco:[[I('✏️'),'bob',10,60,11],[I('📏'),'bob',86,58,12],[A('bear'),'bob',74,60,13]]},
  32:{line:S5D[33].theater,o:'50% 70%',tint:'warm',deco:[[I('🥪'),'pop',12,62,11],[I('🍎'),'hop',86,64,9],[A('pig'),'bob',72,58,12]]},
  33:{line:S5D[34].theater,o:'50% 55%',tint:'pink',deco:[[I('🎂'),'pop',50,8,16],[A('bunny'),'hop',86,58,13],[I('🎈'),'rise',12,0,10]]}});
 TH.BIG[34]='chend'}catch(e){console.log('th31',e)}

/* ---------- 10. 第三十章大結局：接到第五季 ---------- */
const appOk=i=>{try{return typeof window.__appOpen==='function'?!!window.__appOpen(i):true}catch(e){return false}};
{const _ce30=SCREENS.chend;SCREENS.chend=function(){const r=_ce30.apply(this,arguments);
 try{if(S.ch===29&&$('.fin4')&&CHAPTERS[C31I]){const ln=$('.fin4 .s5');
   if(appOk(C31I)){if(ln)ln.textContent=S5NEXT;const eb=$('.fin4 .endbtns');
    if(eb&&!$('#nextch5')&&!(window.TH93&&TH93.TH.big)){const b=document.createElement('button');b.className='btn';b.id='nextch5';b.textContent='前往第五季';eb.insertBefore(b,eb.firstChild);
     const gc=$('#gcert');if(gc)gc.className='btn2';
     b.onclick=()=>{clearEnd();hush();setCh(C31I);if(S.prog>=NL)S.prog=0;S.walkFrom=null;save();go(S.prog===0?'story':'guide')}}}
   else if(ln)ln.textContent=S5AD}}catch(e){console.log('fin4to5',e)}
 return r}}

/* ---------- 11. 章末禮物（第 31～34 章；第 35 章是季完結） ---------- */
const NAME5=id=>(ITEM[id]||{}).name||'';
{const _rw5=REWARD.chapter;REWARD.chapter=function(card,finish){if(!inS5(S.ch))return _rw5.apply(this,arguments);
 const c=S.ch+1,C=CHAPTERS[S.ch],ids=GIFT[c]||[];
 card.innerHTML=`<div class="scroll">${C.letter}<span class="sign">—— 王子</span>${sealSVG()}</div><button class="btn" id="next">看看禮物</button>`;
 say([{zh:C.letter.replace(/<br>/g,''),who:'prince'}]);
 $('#next',card).onclick=()=>{ids.forEach(id=>{if(!owns(id))S.owned.push(id)});S.newPrize=ids.slice();
  ids.forEach(id=>{const it=ITEM[id];if(!it)return;if(it.slot==='dress')S.look.dress=id;if(it.slot==='prop')S.look.prop=id;if(it.slot==='petacc')S.look.petacc=id});
  const n=C.gems||10;S.wallet+=n;save();try{renderBar()}catch(e){}
  const names=ids.map(NAME5).filter(Boolean).join('和');const it0=ITEM[ids[0]]||{};
  const pic=it0.slot==='pet'?`<span class="bob">${petSVG(ids[0],'')}</span>${princess(S.look)}`:it0.slot==='petacc'?`${princess(S.look)}<span class="bob">${petSVG(S.look.pet,ids[0])}</span>`:`${princess(S.look)}<span class="bob">${myPet('class="small"')}</span>`;
  card.innerHTML=`<div class="petshow">${pic}</div><h2>得到${names}！</h2><p class="small">還有 ${n} 顆寶石！</p><button class="btn" id="cont">太棒了！</button>`;
  sfx('gem');confetti();say([`得到${names}了！`,'還有十顆寶石！']);$('#cont',card).onclick=finish}}}
// 章末畫面的「你得到新的衣服和寵物了！」換成這一章真的拿到的東西
const NEWPET='你得到新的衣服和寵物了！點「換裝間」，可以換上新衣服喔！';
// 補發（之前完成的章節、備份還原）：寵物、配件、衣服、道具
function s5CatchUp(){let ch=false;S5CH.forEach(c=>{if(S.chDone>=c)(GIFT[c]||[]).forEach(id=>{if(!owns(id)){S.owned.push(id);ch=true}})});if(ch)save()}
window.__s5CatchUp=s5CatchUp;

/* ---------- 12. 第五季完結：星光小管家頒獎典禮＋獎狀 ---------- */
const CERT5K=()=>'cert5_'+(window.HERO||'princess');window.CERT5K=CERT5K;
const cert5Date=()=>{const c=V2[CERT5K()];if(!c||!c.d)return '';const [y,m,d]=c.d.split('-');return `${y} 年 ${+m} 月 ${+d} 日`};
const cert5Give=()=>{if(V2[CERT5K()])return false;const n=new Date();V2[CERT5K()]={d:`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`};save2();return true};
const FIN5_END=S5D[35].endText;
const S5BADGE=(a='')=>A5.BADGE(a);window.S5BADGE=S5BADGE;
const esc5=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function certHTML5(o){if(A5.certHTML)return A5.certHTML(o);const nm=(o.name||'').trim();
 return `<div class="card certcard cert3 cert5" role="dialog" aria-label="${S5FIN.cert_title}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${S5FIN.cert_title}</div><div class="certto">頒給：<b>${nm?esc5(nm):S5FIN.cert_to}</b></div>
  <div class="certbody">${S5FIN.cert_body.map(s=>s==='<br>'?'<br>':`<span>${s}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero}</span><span class="c3badge">${S5BADGE()}</span><span class="u">${o.pet}</span></div>
  <div class="certfoot"><div><div class="certsig">${S5FIN.cert_sign}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${S5BADGE()}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`}
function cert5Show(after){const old=$('.certov');if(old)old.remove();
 const ov=overlay(screen,certHTML5({name:S.name||'',hero:princess(S.look),pet:myPet(),date:cert5Date()}));ov.classList.add('certov');
 $('#certok',ov).onclick=()=>{hush();ov.remove();if(after)after()};
 say([S5FIN.c1,{pause:200},S5FIN.c2,{pause:200},S5FIN.c3]);return ov}
window.cert5Show=cert5Show;
// 大地圖 🏅：拿到幾張就列幾張（App：沒打開第三十五章的，第五季那張先不列）
const cert5Visible=()=>{try{if(!V2[CERT5K()])return false;if(IS_APPX()&&typeof window.__bkCap==='function')return __bkCap()>=35;return true}catch(e){return false}};
{const _cp4=certPick;certPick=function(){if(!cert5Visible())return _cp4.apply(this,arguments);
 const L=[[!!V2[CERTK()],'2','星光小勇士','第二季'],[!!V2[CERT3K()],'3','星光小幫手','第三季'],[!!(window.CERT4K&&V2[CERT4K()]),'4','星光太空探險隊','第四季'],[true,'5','星光小管家','第五季']].filter(x=>x[0]);
 const open=s=>s==='5'?cert5Show():s==='4'?cert4Show():s==='3'?cert3Show():certShow();
 if(L.length<=1){hush();return open('5')}
 const seal=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#E8505A"/><circle cx="50" cy="50" r="36" fill="none" stroke="#FFE7B0" stroke-width="3" stroke-dasharray="4 4"/><path d="${certStarD(50,50,22,10)}" fill="#FFE27A"/></svg>`;
 const ic={'2':seal,'3':(()=>{try{return S25BADGE()}catch(e){return seal}})(),'4':(()=>{try{return S4BADGE()}catch(e){return seal}})(),'5':S5BADGE()};
 const ov=overlay(screen,`<div class="card certpick${L.length>2?' cp3':''}${L.length>3?' cp4':''}"><h2>想看哪一張？</h2><div class="cprow">
  ${L.map(([,s,t,n])=>`<button class="cpbtn" data-s="${s}"><span class="cpic">${ic[s]}</span><b>${t}</b><small>${n}</small></button>`).join('')}</div>
  <button class="btn2" id="cpno">關閉</button></div>`);
 say(['你想看哪一張？']);
 $$('.cpbtn',ov).forEach(b=>b.onclick=()=>{sfx('pop');hush();ov.remove();open(b.dataset.s)});
 $('#cpno',ov).onclick=()=>{hush();ov.remove();sfx('pop')}}}
{const _w5=SCREENS.world;SCREENS.world=function(){const r=_w5.apply(this,arguments);try{if(cert5Visible()){let b=$('#wcert');
 if(!b){const sp=$('.whead .phsp');if(sp){b=document.createElement('button');b.className='btn2 small';b.id='wcert';b.textContent='🏅 獎狀';sp.replaceWith(b)}}
 if(b)b.onclick=()=>{sfx('pop');certPick()}}}catch(e){console.log('cert5',e)}return r}}
let fin5Tok=0,fin5Cert=0;
function grandFinale5(){clearEnd();const tok=++fin5Tok;const live=()=>tok===fin5Tok&&S.screen==='chend';
 const calm=RM()||!!S.lite;const first=cert5Give();fin5Cert=0;
 screen.innerHTML=`<div class="ending grand fin4 fin5"><svg class="fin4bg fin5bg" aria-hidden="true"></svg>
  <div class="gparade">${S5FIN.f.map(([k],j)=>`<span class="gfr" data-k="${k}" style="animation-delay:${(1.2+j*.22).toFixed(2)}s">${animal(k)}</span>`).join('')}</div>
  <div class="trio"><div class="walkin">${princess(S.look)}</div><div class="fromdoor">${prince()}</div><div class="walkin u" style="animation-delay:.3s">${myPet()}</div></div>
  <h2 class="endh">${S5FIN.h}</h2><p class="endp">五章的冒險，全部完成了！<br>大家都來幫你拍拍手！</p>
  <div class="endbtns"><button class="btn" id="gcert">看獎狀</button><button class="btn2" id="again">再玩一次</button><button class="btn2" id="endworld">大地圖</button><button class="btn2" id="home">回首頁</button></div>
  <p class="s5">下一站：第六季「星光大自然」，敬請期待！</p></div>`;
 fin5Bg();
 const T=(ms,f)=>endTimers.push(setTimeout(f,calm?0:ms));
 if(!calm){for(let k=0;k<10;k++)T(1800+k*900,()=>{if(!live()||fin5Cert)return;burst(innerWidth*(.12+Math.random()*.76),innerHeight*(.06+Math.random()*.28),46);if(k%3===0)sfx('gem')});
  T(3000,()=>{if(live()&&!fin5Cert)confetti()});T(3400,()=>$$('.fin5 .trio > div,.fin5 .gfr').forEach(d=>{const s=d.firstElementChild||d;s.classList.add('jig')}))}
 const cert=()=>{if(!live())return;fin5Cert=1;clearEnd();hush();cert5Show(()=>{if(live())say([FIN5_END])})};
 $('#gcert').onclick=cert;
 $('#again').onclick=()=>{fin5Tok++;clearEnd();hush();S.prog=0;S.walkFrom=null;save();go('guide')};
 $('#endworld').onclick=()=>{fin5Tok++;clearEnd();hush();go('world')};
 $('#home').onclick=()=>{fin5Tok++;clearEnd();hush();go('title')};
 (async()=>{const sw=a=>Promise.all([say(a),wait(calm?300:1800)]);const stop=()=>!live()||fin5Cert;
  const talk=async(sel,a)=>{const el=$(sel);if(el){el.classList.add('gtalk');if(!calm)burstEl(el,14)}await sw(a);if(el)el.classList.remove('gtalk')};
  await sw([S5FIN.h,{pause:200},S5FIN.p]);if(stop())return;
  for(const [k,t] of S5FIN.f){if(stop())return;await talk(`.fin5 .gfr[data-k="${k}"]`,[t])}
  if(stop())return;await talk('.fin5 .fromdoor',[ISBOY?{zh:S5FIN.dr,who:'dragon'}:{zh:S5FIN.pr,who:'prince'}]);
  if(stop())return;if(!first){await sw([FIN5_END]);return}
  if($('.certov'))return;cert()})()}
window.grandFinale5=grandFinale5;
function fin5Bg(){const f=$('.fin5'),g=f&&$('.fin5bg',f);if(!g)return;const r=f.getBoundingClientRect();if(!r.width||!r.height)return;
 let W=Math.round(500*r.width/r.height),H=500;if(r.height>r.width){W=400;H=Math.round(400*r.height/r.width)}const key=W+'x'+H;if(g.dataset.k===key)return;
 g.dataset.k=key;g.setAttribute('viewBox',`0 0 ${W} ${H}`);g.setAttribute('preserveAspectRatio','xMidYMax slice');try{g.innerHTML=(BG5.market35night||BG5.market35)(W,H)}catch(e){}}
{let t5=0;addEventListener('resize',()=>{clearTimeout(t5);t5=setTimeout(()=>{try{if($('.fin5'))fin5Bg()}catch(e){}},150)})}
{const _ce5=SCREENS.chend;SCREENS.chend=function(){if(S.ch===C35I)return grandFinale5();return _ce5.apply(this,arguments)}}

/* ---------- 13. 自由練習：五個主題＋聽音找符號＋數錢和數數 ---------- */
S5PT.forEach(([k,n,e,h,bg,qs])=>PTOPICS.push([k,n,e,h,bg,qs.slice()]));
const PT5=Object.fromEntries(S5PT.map(x=>[x[0],x[6]]));
{const _pp5=SCREENS.practice;SCREENS.practice=function(){const r=_pp5.apply(this,arguments);try{Object.entries(PT5).forEach(([k,c])=>{const i=c-1;
  const ok=s5Open(i)&&S.chDone>i;
  if(!ok){const b=document.querySelector(`.tcard[data-k="${k}"]`);if(b)b.remove()}})}catch(e){console.log('pt5',e)}return r}}

/* ---------- 14. 圖鑑：咚咚、小管家徽章 ---------- */
try{DEX.push(['dongdong','存錢小豬咚咚','Piggy bank'])}catch(e){}
{const _dx5=SCREENS.dex;SCREENS.dex=function(tab){const r=_dx5.apply(this,arguments);try{if((tab||'ani')!=='tre')return r;const body=$('#dbody');if(!body||$('.trow.s5b',body))return r;
  const B=S5CH.map(c=>({c:c-1,ok:S.chDone>c-1&&s5Open(c-1)}));if(!B.some(x=>x.ok)&&S.chDone<C31I)return r;
  const row=document.createElement('div');row.className='trow s5b';row.innerHTML=`<h3>${art('🐷')}小管家徽章</h3><div class="titems">${B.map((x,k)=>`<button class="titem${x.ok?'':' unk'}" data-c="${x.c}"><span class="tpic">${x.ok?`<span class="s5mini">${A5.MINI(k)}</span>`:WICON.stamp}</span><small>${x.ok?wName(x.c):'？'}</small></button>`).join('')}</div>`;
  body.appendChild(row);
  $$('.titem',row).forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(b.classList.contains('unk')){say(['這個徽章還沒拿到喔！']);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
   b.classList.remove('jig');void b.offsetWidth;b.classList.add('jig');sfx('gem');burstEl(b,16);say([`這是${wName(c)}的小管家徽章！`])})}catch(e){console.log('dex5',e)}return r}}

/* ---------- 15. 網頁版密碼（跟第三、四季同一個密碼、同一個開關）：標題改「第五季搶先玩」；App 購買：第三十一～三十五章（stage7） ---------- */
{let want=-1;const _sh5=show;show=function(name,arg){try{want=S.ch;if(name==='title'||name==='chend')s5CatchUp()}catch(e){}return _sh5.apply(this,arguments)};
 const _g5=s3Gate;s3Gate=function(then){const r=_g5.apply(this,arguments);try{if(want>=C31I){const h=$('.s3gate h2');if(h)h.textContent='第五季搶先玩'}}catch(e){}return r};window.__s3Gate=s3Gate}
// App：商品 tw.starlight.adventure.stage7（價格由 App Store 回傳，這裡不寫）；m67 的 STAGES 用 push 加（mkapp.py 會檢查原本那一行）
try{if(typeof STAGES!=='undefined'&&!STAGES.some(s=>s[0]==='stage7'))STAGES.push(['stage7','第三十一～三十五章',30,35])}catch(e){console.log('stage7',e)}
// 完整版介紹：第六段（第五季）
const SEG5={id:'stage7',r:'第三十一～三十五章',arc:'第五季・星光小管家',from:31,
 learn:['聽音找符號：ㄍㄎㄏㄐㄑㄒ（只聽音認符號，還不拼讀）；英文大寫 K～P；跟著筆順寫','數到 50、十個十個數、排隊第幾個；認識 50 元硬幣、湊錢；分水果（一人一個輪流發）','錢是爸媽辛苦賺來的、不拿爸媽的錢、想買先問；刀子爐火交給大人；到朋友家的禮貌'],
 extra:'新寵物小松鼠和好幾件新衣服。遊樂園多兩個：存錢小豬咚咚（完成第三十一章打開，把寶石存成零錢、一起數一數）、小小廚師（完成第三十三章打開，疊三明治、串水果）。完成第三十五章，拿到「星光小管家」獎狀。',
 // 5.2.0：遊樂園卡片圖示用正式美術 OBJ31.piggy5／chef5（park5.js 登記成 ICONART['i:piggy5']／['i:chef5']）；沒有才用表情符號
 park:[['i:piggy5','存錢小豬咚咚','🐷'],['i:chef5','小小廚師','🥪']]};
{const _ih5=window.__iapShopHook;window.__iapShopHook=function(ov,price){const r=_ih5?_ih5.apply(this,arguments):undefined;try{const d=$('.f3intro',ov);if(!d||$('.f3seg[data-seg="s5"]',d))return r;
  const lead=$('.f3lead',d);if(lead)lead.textContent='第一～五章免費。後面還有六段、三十章，每段五章，要照順序打開。';
  let own=false;try{own=!!stageOpen('stage7')}catch(e){}const p=price('stage7');const g=SEG5;
  const items=ITEMS.filter(x=>x.chapter>=31&&x.chapter<=35&&['pet','dress','prop'].includes(x.slot));
  const sec=document.createElement('section');sec.className='f3seg'+(own?' own':'');sec.dataset.seg='s5';
  sec.innerHTML=`<div class="f3sh"><div><small>${g.r}</small><b>${g.arc}</b></div>${own?'<span class="f3tag">已解鎖 ✓</span>':p?`<span class="f3tag">${esc5(p)}</span>`:''}</div>
   <div class="f3scs">${[0,1,2,3,4].map(i=>{const C=CHAPTERS[g.from-1+i];let bg='';try{bg=sbg(C.bg)}catch(e){}return `<figure class="f3sc" data-c="${g.from+i}"><span class="f3sv"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${bg}</svg></span><figcaption>${C.name}</figcaption></figure>`}).join('')}</div>
   <div class="f3sub">學什麼</div><ul class="f3ul">${g.learn.map(t=>`<li>${t}</li>`).join('')}</ul>
   <div class="f3sub">新的寵物、衣服和道具</div><div class="f3its">${items.map(it=>`<figure class="f3it"><span class="f3iv">${(()=>{try{return still(it.slot==='pet'?petSVG(it.id,''):princess({...S.look,[it.slot]:it.id},'',VB[it.slot]))}catch(e){return ''}})()}</span><figcaption>${esc5(it.name)}</figcaption></figure>`).join('')}</div>
   <div class="f3sub">遊樂園新遊戲</div><div class="f3pks">${g.park.map(([e,n,fb])=>`<span class="f3pk"><span class="pic">${art(typeof ICONART!=='undefined'&&ICONART[e]?e:fb)}</span>${n}</span>`).join('')}</div><p class="f3ex">${g.extra}</p>`;
  const how=$('.f3how',d);if(how)d.insertBefore(sec,how);else d.appendChild(sec)}catch(e){console.log('intro5',e)}return r}}
// App：還沒打開的第三十一～三十五章，「完成第三十一章…」這類字樣不顯示（m68 的章數只到三十）
if(IS_APPX()){try{const CN5={'三十一':31,'三十二':32,'三十三':33,'三十四':34,'三十五':35};const RE5=/第(三十[一二三四五])章/;
 const lockT=t=>{const m=String(t).match(RE5);return !!(m&&!appOk(CN5[m[1]]-1))};
 const sweep=()=>{try{$$('.opt[data-id]').forEach(b=>{if(b.style.display==='none')return;const it=ITEM[b.dataset.id];if(it&&it.chapter>30&&!appOk(it.chapter-1)&&!owns(it.id))b.style.display='none'});
  $$('button,[role="button"],.pbtn,.rmitem,.citem,li').forEach(b=>{if(b.style.display==='none'||b.classList.contains('wnode')||b.closest('.overlay .card.left')||b.classList.contains('pcard')||b.classList.contains('gzci'))return;const t=b.textContent||'';if(t.length<80&&lockT(t))b.style.display='none'})}catch(e){}};
 new MutationObserver(()=>sweep()).observe(document.body,{childList:true,subtree:true});
 const _sl5=say;say=function(parts,opt){try{if(Array.isArray(parts)&&parts.some(p=>typeof p==='string'&&/完成第三十[一二三四五]章/.test(p)&&lockT(p)))return Promise.resolve()}catch(e){}return _sl5.call(this,parts,opt)}}catch(e){console.log('applock5',e)}}

/* ---------- 16. 學習報告、爸爸媽媽的練習 ---------- */
// 報告「會寫的字」：第五季的字有筆畫資料以後，多一列（ㄍ～ㄒ、K～P）
try{if(window.__WR&&typeof __WR.reportRow==='function'){const _rr5=__WR.reportRow;__WR.reportRow=function(){let s=_rr5.apply(this,arguments);try{const C=S5CHARS.split('').filter(wrHas);if(C.length&&typeof __WR.wLevel==='function'){
  const nOK=C.filter(c=>__WR.wLevel(c)==='ok').length;s+=`<div class="lrgh"><span>會寫的字（第五季）</span><b>${nOK}<small>／${C.length}</small></b></div><div class="lrgrid lgz wrgrid">${C.map(c=>{const v=__WR.wLevel(c);return `<i class="lrc ${v==='try'?'try':v}">${c}</i>`}).join('')}</div>`}}catch(e){}return s}}}catch(e){}
// 家長專區「爸爸媽媽的練習」：寫一寫的說明跟著有筆畫資料的字變
{const _pp5b=parentPanel;parentPanel=function(){const r=_pp5b.apply(this,arguments);try{const has5=S5CHARS.split('').some(wrHas);if(has5){const ov=$$('.overlay').pop();if(ov)$$('p.small',ov).forEach(p=>{if(/ㄅ～ㄌ、A～J/.test(p.textContent))p.textContent=p.textContent.replace('ㄅ～ㄌ、A～J','ㄅ～ㄒ、A～P')})}}catch(e){}return r}}

/* ---------- 16b. 遊樂園、存錢小豬接口 ----------
   ・購買項目代號給遊樂園（park5.js 讀 window.__S5STAGE）
   ・火箭飛行（m99y）聽注音／聽字母：完成第五季哪一章，就加進那一章的字（ㄍ～ㄒ、K～P）
   ・第 31～35 章第一次過一關：咚咚存 2 元；完成一章再存 5 元（__PIGGY.addCoins；存進去的不能拿出來）
   ・存錢小豬的大東西（20 顆以上）：市集小老闆裝 30、禮物和氣球擺飾 40、生日大蛋糕擺飾 20；換裝間、房間不能直接買，點了帶去存錢小豬（兌換要家長確認，在 piggy5.js） */
window.__S5STAGE='stage7';
window.__r26extra=kind=>{const o=[];S5CH.forEach(c=>{if(S.chDone>c-1)S5D[c].learn.split('').forEach(x=>{if(kind==='zy'?isZ5(x):/^[A-Z]$/.test(x))o.push(x)})});return o};
{let first=false,lvc=-1,lvl=-1;const _ld5=levelDone;levelDone=function(){try{first=false;if(!S.pmode&&inS5(S.ch)&&S.level>=(S.prog||0)){first=true;lvc=S.ch;lvl=S.level}}catch(e){}
  const r=_ld5.apply(this,arguments);
  try{if(first&&window.__PIGGY&&S.chDone>=C31I){first=false;const P=window.__PIGGY;const n=P.addCoins(2,`第${S5D[lvc+1].cn}章第${lvl+1}關`);if(lvl===9)P.addCoins(5,`完成第${S5D[lvc+1].cn}章`);if(n)toast('咚咚幫你存了 '+(lvl===9?7:2)+' 元！')}}catch(e){console.log('pig5',e)}
  return r}}
const BIG5=[{id:ISBOY?'b_market35m':'dress35m',slot:'dress',name:'市集小老闆裝',price:30},{room:'toy',id:'gifts5',name:'禮物和氣球擺飾',price:40},{room:'toy',id:'cake5',name:'生日大蛋糕擺飾',price:20}];
try{if(window.S31&&S31.DRESS&&S31.DRESS.dress35m)DRESS.dress35m=Object.assign({},S31.DRESS.dress35m);if(window.S31&&S31.BOY&&S31.BOY.b_market35m)BFIT.b_market35m=Object.assign({},S31.BOY.b_market35m,{n:'市集小老闆裝'})}catch(e){}
const TOY5X={gifts5:()=>{try{if(S31R.TOY&&S31R.TOY.gifts5)return S31R.TOY.gifts5;return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="95" rx="40" ry="4" fill="#000" opacity=".12"/><g transform="translate(52 2) scale(.7)">${OBJ31.balloon}</g><g transform="translate(4 40) scale(.85)">${OBJ31.gift}</g><g transform="translate(44 50) scale(.72)">${OBJ31.gift}</g></svg>`}catch(e){return A5.TOY.stall35}},
 cake5:()=>{try{if(S31R.TOY&&S31R.TOY.cake5)return S31R.TOY.cake5;return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="36" ry="4" fill="#000" opacity=".12"/><g transform="translate(10 6) scale(1.25)">${OBJ31.cake}</g></svg>`}catch(e){return A5.TOY.stall35}}};
BIG5.forEach(x=>{if(x.room){if(ROOMITEMS[x.room])ROOMITEMS[x.room].push([x.id,x.name,x.price])}else if(DRESS[x.id]||BFIT[x.id]){ITEMS.push({id:x.id,slot:x.slot,name:x.name,price:x.price,piggy5:1});ITEM[x.id]=ITEMS[ITEMS.length-1]}});
{const _rs5b=roomSVG;roomSVG=function(){const R=_rs5b.apply(this,arguments);try{const ty=roomGet('toy');if(TOY5X[ty])R.toy=TOY5X[ty]()}catch(e){}return R}}
const pigOpen=()=>{try{return S.chDone>=C31I&&typeof SCREENS.piggy5==='function'&&(!IS_APPX()||appOk(C31I)||true)}catch(e){return false}};
const PIGSAY1='這個要放進存錢小豬，慢慢存喔！',PIGSAY2='完成第三十一章，存錢小豬就會打開喔！';
function toPiggy(name){const ov=overlay(screen,`<div class="card"><div class="face big">${(()=>{try{return typeof DONG31==='function'?DONG31('wow',''):animal('dongdong')}catch(e){return ''}})()}</div><h2>${name}</h2><p>${pigOpen()?PIGSAY1:PIGSAY2}</p><div class="row">${pigOpen()?'<button class="btn" id="pg5go">去存錢小豬</button><button class="btn2" id="pg5no">先不要</button>':'<button class="btn" id="pg5no">好</button>'}</div></div>`);
 say([pigOpen()?PIGSAY1:PIGSAY2]);$('#pg5no',ov).onclick=()=>ov.remove();const g=$('#pg5go',ov);if(g)g.onclick=()=>{ov.remove();hush();S.from=S.screen;go('piggy5')}}
// 20 顆以上、不是章節大獎的東西：攔下直接購買（換裝間 .opt、房間 .ropt），改去存錢小豬
document.addEventListener('click',e=>{try{const t=e.target.closest&&e.target.closest('.opt[data-id],.ropt[data-v]');if(!t)return;
 if(t.matches('.opt[data-id]')){const it=ITEM[t.dataset.id];if(!it||owns(it.id)||it.chapter||!(it.price>=20)||it.price>=999)return;e.stopImmediatePropagation();e.preventDefault();toPiggy(it.name);return}
 if(S.screen==='room'){const sel=($('.tab[data-s][aria-selected="true"]')||{}).dataset;const s=sel&&sel.s;if(!s||!ROOMITEMS[s])return;const it=ROOMITEMS[s].find(x=>x[0]===t.dataset.v);
  if(!it||!(it[2]>=20)||it[2]>=999||S.roomOwned.includes(s+':'+it[0]))return;e.stopImmediatePropagation();e.preventDefault();toPiggy(it[1])}}catch(err){console.log('pig5block',err)}},true);
// 價錢那一格改成小豬圖示（看得出要用存錢小豬換）
{const mark=()=>{try{$$('.opt[data-id]').forEach(b=>{const it=ITEM[b.dataset.id];if(it&&!it.chapter&&it.price>=20&&it.price<999&&!owns(it.id)&&!b.dataset.pg5){b.dataset.pg5=1;const em=b.querySelector('.price');if(em)em.insertAdjacentHTML('afterbegin','🐷')}});
  if(S.screen==='room')$$('.ropt[data-v]').forEach(b=>{if(b.dataset.pg5)return;const em=b.querySelector('em');const n=em&&+em.textContent.replace(/\D/g,'');if(n>=20&&n<999){b.dataset.pg5=1;em.insertAdjacentHTML('afterbegin','🐷')}})}catch(e){}};
 new MutationObserver(mark).observe(document.body,{childList:true,subtree:true})}
window.__s5BIG=BIG5;

/* ---------- 17. 還沒錄音的第五季台詞：只出字幕，不用裝置內建聲音 ---------- */
const S5TXT=new Set(),S5OPT=new Set();
const add5=t=>{if(!t)return;String(t).replace(/<br>/g,'').split(/(?<=[。！？!?])/).map(x=>x.trim()).filter(Boolean).forEach(x=>S5TXT.add(x))};
S5CH.forEach(c=>{const D=S5D[c];[D.firstSay,D.endText,D.story_p,D.story_b,D.letter_p,D.letter_b,D.theater,D.gift,...D.story,...D.levels.map(L=>L[5])].forEach(add5)});
S5Q.forEach(([,q,a,w,why])=>{add5(q);add5(why);[a,...w].forEach(o=>S5OPT.add(o[1]))});
[S5FIN.h,S5FIN.p,S5FIN.pr,S5FIN.dr,S5FIN.c1,S5FIN.c2,S5FIN.c3,...S5FIN.f.map(x=>x[1]),FIN5_END,S5AD,S5NEXT,S4END5].forEach(add5);
Object.values(S5HEAR).forEach(ws=>ws.forEach(([,w])=>add5(hearLine(w))));
['開頭的音是','一排有十個，一共有幾個呢？','先一排一排數，十、二十、三十，再一個一個數！','十個一包，十個十個數，一共有幾個呢？','十、二十、三十……跟著我一起數！',
 '數一數，戴星星的朋友，排在第幾個呢？','從最前面開始數！','水果一人一個，輪流發給大家。發完了，大家是不是一樣多呢？','水果一人一個，輪流發給大家。發完了，每個人有幾個呢？',
 '發完了！看看大家是不是一樣多？','先點水果，一人一個，輪流發給大家！','我幫你發！','大家一樣多！','有人多一個，不一樣多！','哪一堆十元，跟一個五十元一樣多呢？','十、二十、三十、四十、五十，數到五十！',
 '五個十元，就是五十元！','一個五十元，就是五十元喔！','先放十元，再看看還差多少！','放這一個！','這個徽章還沒拿到喔！',...S5CH.map(c=>`這是${S5D[c].name}的小管家徽章！`),
 '第五季，星光小管家！跟存錢小豬咚咚一起，學會存錢、幫忙做家事！','你想看哪一張？',PIGSAY1,PIGSAY2].forEach(add5);
S5CH.forEach(c=>{(GIFT[c]||[]).forEach(id=>add5(`得到${NAME5(id)}了！`));const nm=(GIFT[c]||[]).map(NAME5).filter(Boolean).join('和');if(nm)add5(`得到${nm}了！`)});
window.__S5TXT=S5TXT;window.__S5OPT=S5OPT;
const S5NAMES=[];S5CH.forEach(c=>{S5NAMES.push(S5D[c].name,'第'+S5D[c].cn+'章')});['squirrel31','pacc32','pacc34','prop35','dress32','dress33','dress34','b_dress32','b_apron33','b_dress34'].forEach(id=>S5NAMES.push(NAME5(id)||(BFIT[id]||{}).n));[32,33,34].forEach(c=>S5NAMES.push(PZ[c].prize.dress[1],PZ[c].prize.boy[1]));
ROOM5.forEach(r=>S5NAMES.push(r[2]));PIC5.forEach(p=>S5NAMES.push(p[1]));S5NAMES.push('存錢小豬咚咚','小管家徽章','星光小管家','聽音找符號','數錢和數數');BIG5.forEach(x=>S5NAMES.push(x.name));
const S5EN=['Piggy bank.'];
const _isS5b=t=>{const u=String(t);return S5NAMES.some(n=>n&&u.includes(n))};
const vt=t=>{try{return voiceT(typeof heroT==='function'?heroT(t):t)}catch(e){return t}};
function recOK(t,who){try{const u=vt(t).replace(/⁠/g,'');const pre=who==='prince'?'pz|':who==='dragon'?'dz|':'';
  if(!pre&&(voHas('z|'+u.trim())||voHas('z|'+voCk(u))))return true;
  return voSents(u).every(s=>pre?voHas(pre+s.trim()):voResolve(s).every(g=>typeof g==='string'))}catch(e){return true}}
function isS5(t){const u=String(t).replace(/<br>/g,'');if(S5TXT.has(u.trim())||_isS5b(u))return true;
 const ss=voSents(u);if(ss.some(s=>S5TXT.has(s)))return true;
 return u.split(/[，、？]/).some(x=>{const y=x.replace(/^(是|還是)/,'').trim();return y&&S5OPT.has(y)})}
const isWhole5=t=>typeof t==='string'&&/！(?=\S)/.test(t.trim())&&isS5(t);
const _say5=say;say=function(parts,opt){
 try{if(Array.isArray(parts)&&inS5(S.ch)&&S.ch<C35I&&parts.includes(NEWPET)){const g=S5D[S.ch+1].gift;const k=parts.indexOf(NEWPET);parts=parts.slice(0,k).concat(g?[g]:[],parts.slice(k+1))}}catch(e){}
 try{if(Array.isArray(parts)&&parts.some(p=>p===S4END5||p==='謝謝你一路勇敢探險！下一次的冒險，敬請期待！')&&S.ch===29&&CHAPTERS[C31I]&&appOk(C31I)){parts=parts.map(p=>p==='謝謝你一路勇敢探險！下一次的冒險，敬請期待！'?S4END5:p)}}catch(e){}
 try{if(Array.isArray(parts)&&(inS5(S.ch)||parts.some(p=>typeof p==='string'&&isS5(p)))){
  const inCh=inS5(S.ch)&&!S.pmode;let changed=false;let out=parts;
  if(S.vo&&VO.idx){out=parts.filter(p=>{if(typeof p==='string'){if(!p.trim())return true;
    let q=p;const who=(()=>{const u=p.replace(/<br>/g,'');if(!ISBOY&&Object.values(LETTER_P).includes(u))return 'prince';if(ISBOY&&Object.values(LETTER_B).includes(u))return 'dragon';
     if(!ISBOY&&u.startsWith('王子說：')){q=u.slice(4);return 'prince'}if(ISBOY&&vt(u).startsWith('火花說：')){q=vt(u).slice(4);return 'dragon'}return ''})();
    if((inCh||isS5(p))&&!recOK(q,who)){changed=true;return false}return true}
   if(p&&typeof p==='object'&&p.zh!=null&&!p.en&&!p.slow&&(p.who==='prince'||p.who==='dragon'||isS5(p.zh))){const w=ISBOY&&(p.who==='prince'||(!p.who&&DRAGON_SAY.has(vt(String(p.zh)))))?'dragon':p.who;if(!recOK(p.zh,w)){changed=true;return false}}
   if(p&&typeof p==='object'&&p.en!=null&&S5EN.includes(String(p.en))){const k='e'+(p.slow||0)+'|'+p.en;if(!voHas(k)&&!voHas('e0|'+p.en)&&!voHas('e1|'+p.en)){changed=true;return false}}
   return true})}
  const sep=(a,b)=>{try{return !!(S.vo&&VO.idx)&&recOK(a,'')&&recOK(b,'')&&!recOK(a+b,'')}catch(e){return false}};
  const o=[];out.forEach(p=>{const prev=o[o.length-1];if(typeof p==='string'&&typeof prev==='string'){if(isWhole5(p)||isWhole5(prev)){o.push({pause:150});changed=true}else if(sep(prev,p)){o.push({pause:60});changed=true}}o.push(p)});
  if(changed){const isCur=parts===S.cur;const o2=o.filter((p,k)=>!(p&&p.pause&&(k===0||o[k-1]&&o[k-1].pause)));if(isCur)S.cur=o2;return _say5.call(this,o2,opt)}}}catch(e){console.log('say5',e)}
 return _say5.apply(this,arguments)};
// 句子中間有「！」的第五季台詞是整句錄的：有整句錄音就整句播（跟 m82_fix43 的 WHOLE43 同一個做法）
{const _vs5=voSpeak;voSpeak=async function(p,opt,gen){try{const txt=String(p&&typeof p==='object'?(p.en!=null?'':p.zh):p).trim();
  if(txt&&/！(?=\S)/.test(txt)&&!(typeof p==='object'&&(p.who||p.slow))&&S.vo&&VO.idx&&voHas('z|'+txt)&&isS5(txt)){const b=await voBuf('z|'+txt);
   if(b&&gen===sayGen){const ok=await voPlay(b);if(ok!==false||gen!==sayGen)return}}}catch(e){}
  return _vs5.apply(this,arguments)}}

/* ---------- 18. 樣式 ---------- */
const st=document.createElement('style');st.textContent=`
.h5card{display:flex;flex-direction:column;align-items:center;gap:2px;margin:2px auto 0;padding:6px 18px 8px;border-radius:22px;background:rgba(255,255,255,.88);box-shadow:0 4px 0 rgba(60,30,90,.18);cursor:pointer;width:max-content;max-width:90%}
.h5card .h5pic{width:clamp(64px,13vmin,110px);height:clamp(64px,13vmin,110px);display:grid;place-items:center;font-size:clamp(52px,11vmin,92px);line-height:1}
.h5card .h5pic svg{width:100%;height:100%}.h5card .h5w{font-size:clamp(20px,4vmin,30px);color:#5A3A7A;font-weight:400}
.h5flut{margin-top:4px}
.c5rows{display:flex;flex-direction:column;gap:clamp(3px,1vmin,8px);align-items:flex-start;margin:4px auto;padding:6px 10px;border-radius:16px;background:rgba(255,255,255,.55);width:max-content;max-width:96%}
.c5row{display:flex;gap:clamp(1px,.6vmin,5px);padding:2px 6px;border-radius:12px}.c5row.full{background:rgba(255,226,122,.35)}
.c5row[data-n]{outline:3px solid #FFB81C}
.c5it{width:clamp(22px,5.2vmin,40px);height:clamp(22px,5.2vmin,40px);padding:0;border:0;background:none;display:grid;place-items:center;font-size:clamp(18px,4.4vmin,34px)}.c5it svg{width:100%;height:100%}
.t5bags{display:flex;flex-wrap:wrap;gap:clamp(6px,2vmin,16px);justify-content:center;margin:6px auto}
.t5bag{position:relative;width:clamp(74px,17vmin,120px);aspect-ratio:1;border-radius:18px 18px 26px 26px;border:3px solid #E8B07A;background:#FFF4E2;padding:6px;cursor:pointer;animation:pop .4s backwards var(--dl)}
.t5bag .t5in{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;width:100%;height:100%;align-content:center}.t5bag i{font-style:normal;display:grid;place-items:center;font-size:clamp(10px,2.4vmin,18px)}.t5bag i svg{width:100%;height:auto}
.t5bag.counted,.t5bag[data-n]{border-color:#FFB81C;box-shadow:0 0 0 3px #FFE27A}.t5bag[data-n]::after{content:attr(data-n);position:absolute;top:-12px;right:-8px;background:#FFB81C;color:#fff;border-radius:999px;padding:0 8px;font-size:16px}
.n5line{display:flex;align-items:flex-end;justify-content:center;gap:clamp(2px,1.2vmin,10px);margin:10px auto 4px;flex-wrap:nowrap;max-width:98%}
.n5booth{font-size:clamp(34px,8vmin,60px);margin-right:clamp(4px,1.6vmin,14px)}.n5booth svg{width:clamp(40px,9vmin,68px);height:auto}
.n5p{position:relative;font-size:clamp(28px,6.6vmin,52px);line-height:1;display:flex;flex-direction:column;align-items:center}
.n5p .n5st{position:absolute;top:-.8em;font-size:.55em;font-style:normal}.n5p .n5st svg{width:1em;height:1em}
.n5p[data-n]::after{content:attr(data-n);position:absolute;bottom:-1.1em;font-size:.4em;color:#B3305E}
.d5fruit{display:flex;flex-wrap:wrap;gap:clamp(4px,1.4vmin,10px);justify-content:center;margin:4px auto;max-width:96%}
.d5f{width:clamp(40px,8.4vmin,64px);height:clamp(40px,8.4vmin,64px);border:0;background:rgba(255,255,255,.7);border-radius:50%;display:grid;place-items:center;font-size:clamp(28px,6vmin,46px);cursor:pointer;animation:pop .4s backwards var(--dl)}
.d5f svg{width:80%;height:80%}.d5f.gone{visibility:hidden}
.d5plates{display:flex;gap:clamp(6px,2.4vmin,22px);justify-content:center;margin:6px auto}
.d5plate{display:flex;flex-direction:column;align-items:center;gap:2px}.d5who{font-size:clamp(28px,6vmin,46px)}
.d5pl{min-width:clamp(70px,15vmin,120px);min-height:clamp(36px,7vmin,56px);border-radius:999px;background:#FFFFFF;border:3px solid #E8D0F0;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;padding:2px 6px}
.d5pl i{font-style:normal;font-size:clamp(18px,3.6vmin,28px)}.d5pl i svg{width:1.1em;height:1.1em}
.f5wrap{display:flex;align-items:center;justify-content:center;gap:clamp(10px,3vmin,30px);flex-wrap:wrap;margin:6px auto}
.f5one svg{width:clamp(70px,15vmin,110px);height:auto}
.f5opts{display:flex;flex-direction:column;gap:clamp(6px,1.6vmin,12px)}
.f5grp{display:flex;gap:2px;padding:6px 10px;border-radius:18px;border:3px solid #D8D0F0;background:#FFFFFF;cursor:pointer;animation:pop .4s backwards var(--dl);min-height:48px;align-items:center}
.f5grp .f5c{font-style:normal;display:block;width:clamp(28px,6vmin,44px)}.f5grp .f5c svg{width:100%;height:auto;display:block}
.c5coin{min-width:44px;min-height:44px}
.fin5{background:#1A1A4A}
.fin5 .fin5bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.fin5 .gfr.gtalk,.fin5 .fromdoor.gtalk{transform:scale(1.18) translateY(-6px);filter:drop-shadow(0 0 10px rgba(255,230,140,.95));transition:transform .3s}
.fin5 .gparade{order:1}.fin5 .trio{order:2}.fin5 .endh{order:3}.fin5 .endp{order:4}.fin5 .endbtns{order:5}.fin5 .s5{order:6}
.cert5 .certin{background:linear-gradient(180deg,#FFFDF6,#FFF2F6)}.cert5 .certrib{background:linear-gradient(90deg,#FF7FA8,#FFB84A)}.cert5 .certtt{color:#B3305E;text-shadow:0 2px 0 #FFE0EA}
.cert5 .certart{align-items:center}.cert5 .c3badge svg{height:100%;width:auto}
.certpick.cp4 .cprow{display:grid;grid-template-columns:repeat(2,auto);justify-content:center;gap:10px}
@media (min-width:700px){.certpick.cp4 .cprow{grid-template-columns:repeat(4,auto)}}
.s5b .s5mini{display:block;width:100%;height:100%}.s5b .s5mini svg{width:100%;height:100%;display:block;filter:drop-shadow(0 2px 3px rgba(20,10,60,.35))}
@media (prefers-reduced-motion:reduce){.fin5 .gfr.gtalk{transition:none}.t5bag,.d5f,.f5grp{animation:none}}`;document.head.appendChild(st);

/* ---------- 19. 重新打開時回到第三十一～三十五章（m77、第四季還原時第五季還沒加進 CHAPTERS） ---------- */
try{const c=window.__svCh41;
 if(typeof c==='number'&&c>=C31I&&c<CHAPTERS.length&&c!==S.ch&&c<=Math.max(S.chDone||0,0)&&s5Open(c)
  &&(typeof window.__chOpen!=='function'||window.__chOpen(c))){setCh(c);try{save()}catch(e){}}}catch(e){console.log('ch31restore',e)}
// 測試用：自動作答（多步驟的題型：放硬幣）
function autoAnswer(){try{if(typeof S.__auto==='function'){S.__auto();return true}const el=$(`.play [data-v="${String(S.ans).replace(/"/g,'\\"')}"]`);if(el){el.click();return true}}catch(e){}return false}
{const _rq5=renderQ;renderQ=function(){S.__auto=null;return _rq5.apply(this,arguments)}}
window.__s5={C31I,C35I,S5D,Q5_0,GIFT,grandFinale5,cert5Show,s5Learned,isS5,recOK,isS5En:t=>S5EN.includes(t),zyLearned5,upLearned5,autoAnswer,wrHas,art:PH,hearLine,S5CHARS};
})();

/* ================= 第五季寫字：ㄍ ㄎ ㄏ ㄐ ㄑ ㄒ、K L M N O P（s5/write/write5.js） =================
 * 2026-11-12 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 接在 v5/m99x_write.js（第四季寫字模組）後面：把新字的筆畫加進 __WR.CH／__WR.chars，三階段描寫、判斷、提醒、紀錄全部沿用 m99x，不另寫一套。
 *   關卡表直接用 'write:ㄍ:1'、'R:ㄍ|ㄎ:3'（建議關卡表在 s5/write/strokes.json 的 schedule）。
 *   家長報告「會寫的字」改成 30 個（ㄅ～ㄒ、A～P）。
 * 筆順：注音照教育部《國語注音符號手冊》聲符說明表（ㄍ2 ㄎ2 ㄏ2 ㄐ2 ㄑ1 ㄒ2）；英文照台灣國小常見教法，兩種以上教法的都算對（variants）。
 * 筆畫資料由 s5/write/mk_data5.py 從 s5/write/strokes.json 產生，不要手改 WRD5 那一行。
 * 語音：「還記得怎麼寫ㄍ嗎？」「你會寫ㄍ了！」整句錄音（s5/write/lines_write5.tsv），沒錄好以前只出字幕（m99x 原本就這樣）。
 */
(function(){try{
const WRD5=/*WRD5*/{"ㄍ":["zy","tian",[[[[42,20],[36,30],[30,40],[25,48],[31,58],[37,68],[43,79]],[[70,20],[64,30],[58,40],[53,48],[59,58],[65,68],[71,79]]]]],"ㄎ":["zy","tian",[[[[22,23],[78,23]],[[37,24],[36,34],[35,44],[70,45],[69,57],[66,69],[61,77],[54,80],[46,79]]],[[[22,23],[78,23]],[[37,24],[36,34],[35,44]],[[35,44],[70,45],[69,57],[66,69],[61,77],[54,80],[46,79]]]]],"ㄏ":["zy","tian",[[[[30,23],[78,23]],[[30,23],[30,36],[29,50],[26,62],[21,72],[15,80]]]]],"ㄐ":["zy","tian",[[[[32,24],[32,40],[32,56],[32,68],[44,61],[57,54]],[[60,18],[60,38],[60,58],[60,80],[53,74]]],[[[32,24],[32,40],[32,56],[32,68],[44,61],[57,54]],[[60,18],[60,50],[60,80]]]]],"ㄑ":["zy","tian",[[[[64,18],[55,28],[45,38],[33,48],[43,59],[54,69],[65,80]]]]],"ㄒ":["zy","tian",[[[[20,25],[80,25]],[[50,26],[50,52],[50,80]]]]],"K":["en","four",[[[[32.1,12],[32.1,64]],[[67.0,12],[50,26],[33.5,40]],[[40.5,34.2],[54,49],[68.0,64]]],[[[32.1,12],[32.1,64]],[[67.0,12],[50,26],[33.5,40],[50.7,52],[68.0,64]]]]],"L":["en","four",[[[[33.8,12],[33.8,38],[33.8,64],[50,64],[66.2,64]]],[[[33.8,12],[33.8,64]],[[33.8,64],[66.2,64]]]]],"M":["en","four",[[[[28,12],[28,64]],[[28,12],[39,38],[50,64]],[[50,64],[72,12]],[[72,12],[72,64]]],[[[28,12],[28,64]],[[28,12],[39,38],[50,64],[61,38],[72,12],[72,38],[72,64]]],[[[28,64],[28,38],[28,12],[39,38],[50,64],[61,38],[72,12],[72,38],[72,64]]]]],"N":["en","four",[[[[32.1,12],[32.1,64]],[[32.1,12],[50,38],[67.9,64]],[[67.9,64],[67.9,38],[67.9,12]]],[[[32.1,12],[32.1,64]],[[32.1,12],[50,38],[67.9,64]],[[67.9,12],[67.9,38],[67.9,64]]],[[[32.1,12],[32.1,64]],[[32.1,12],[50,38],[67.9,64],[67.9,38],[67.9,12]]]]],"O":["en","four",[[[[50.0,12.0],[46.2,12.5],[42.5,14.0],[39.2,16.4],[36.2,19.6],[33.8,23.6],[32.0,28.1],[30.9,32.9],[30.5,38.0],[30.9,43.1],[32.0,47.9],[33.8,52.4],[36.2,56.4],[39.2,59.6],[42.5,62.0],[46.2,63.5],[50.0,64.0],[53.8,63.5],[57.5,62.0],[60.8,59.6],[63.8,56.4],[66.2,52.4],[68.0,47.9],[69.1,43.1],[69.5,38.0],[69.1,32.9],[68.0,28.1],[66.2,23.6],[63.8,19.6],[60.8,16.4],[57.5,14.0],[53.8,12.5],[50.0,12.0]]],[[[50.0,12.0],[46.3,12.5],[42.7,13.9],[39.4,16.2],[36.5,19.3],[34.0,23.1],[32.2,27.4],[31.0,32.2],[30.5,37.1],[30.7,42.1],[31.7,46.9],[33.3,51.4],[35.5,55.4],[38.3,58.8],[41.5,61.4],[45.0,63.1],[48.6,63.9],[52.4,63.8],[56.0,62.7],[59.5,60.7],[62.5,57.9],[65.2,54.4],[67.2,50.2],[68.6,45.6],[69.4,40.7],[69.4,35.7],[68.7,30.8],[67.4,26.2],[65.4,22.0],[62.8,18.4],[59.7,15.5]]]]],"P":["en","four",[[[[33.8,12],[33.8,64]],[[33.8,12],[49.2,12],[52.6,12.3],[55.9,13.3],[58.8,15.0],[61.2,17.1],[63.1,19.7],[64.2,22.6],[64.6,25.6],[64.2,28.6],[63.1,31.5],[61.2,34.1],[58.8,36.2],[55.9,37.9],[52.6,38.9],[49.2,39.2],[33.8,39.2]]]]]}/*WRD5_END*/;
const W5=window.__WR5={ready:false,ver:'2026-11-12',chars:Object.keys(WRD5)};
function reg(){const WR=window.__WR;if(!WR||!WR.CH||!WR.chars)return false;
 // 跟 m99x 的 prep() 同一套（密點、長度、進度 t）
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 const plen=p=>{let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s};
 function resample(p,step){if(p.length<2)return p.slice();const out=[p[0]];let acc=0;for(let i=1;i<p.length;i++){let a=p[i-1],b=p[i],d=dist(a,b);while(acc+d>=step){const r=(step-acc)/d;a=[a[0]+(b[0]-a[0])*r,a[1]+(b[1]-a[1])*r];out.push(a);d=dist(a,b);acc=0}acc+=d}const l=p[p.length-1];if(dist(out[out.length-1],l)>.01)out.push(l);return out}
 function prep(points){const d=resample(points,1);const Ln=plen(points);let acc=0;const t=d.map((q,i)=>{if(i)acc+=dist(d[i-1],q);return Ln?acc/Ln:0});return {points,start:points[0],end:points[points.length-1],dense:d,tt:t,len:Ln,cov:resample(points,2)}}
 for(const c in WRD5){const [kind,grid,forms]=WRD5[c];if(WR.CH[c])continue;
  WR.CH[c]={char:c,kind,grid,forms:forms.map(f=>f.map(prep))};WR.CH[c].P=WR.CH[c].forms[0];if(!WR.chars.includes(c))WR.chars.push(c)}
 // 家長報告：會寫的字 30 個
 const RCH=['ㄅ','ㄆ','ㄇ','ㄈ','ㄉ','ㄊ','ㄋ','ㄌ','ㄍ','ㄎ','ㄏ','ㄐ','ㄑ','ㄒ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];
 const _rr=WR.reportRow;
 WR.reportRow=function(){try{const lv=WR.wLevel,rec=(WR.rec&&WR.rec())||{};const any=RCH.some(c=>lv(c)!=='no');const nOK=RCH.filter(c=>lv(c)==='ok').length;
  let tip='';{let best=null;for(const c of RCH){const r=rec[c];if(!r)continue;for(const [k,t] of [['rev',`<b>${c}</b> 常從另一頭開始寫，可以陪孩子先找星星起點。`],['ord',`<b>${c}</b> 的筆順還在練，可以一起看「再看一次」的示範。`],['off',`<b>${c}</b> 寫的時候可以慢慢沿著線走。`]]){if((r[k]||0)>=3&&(!best||r[k]>best[0]))best=[r[k],t]}}if(best)tip=best[1];else{const sp=RCH.find(c=>{const r=rec[c],C=WR.CH[c];return r&&r.last&&r.last.form===1&&/^[ㄅ-ㄩ]$/.test(c)&&C&&C.forms[1]&&C.forms[0].length<C.forms[1].length});if(sp)tip=`<b>${sp}</b> 可以一筆寫完的地方，分開寫也算對。`}}
  return `<div class="lrgh"><span>會寫的字</span><b>${nOK}<small>／${RCH.length}</small></b></div><div class="lrgrid lgz wrgrid">${RCH.map(c=>{const s=lv(c);return `<i class="lrc ${s==='try'?'try':s}" title="${s==='ok'?'會寫':s==='try'?'需要陪寫':s==='mid'?'練習中':'還沒寫'}">${c}</i>`}).join('')}</div>
  <p class="lrnote">${any?'在兩個不同的日子都自己寫、拿到三顆星，才算「會寫」。虛線框的字最近需要陪寫。':'第二十六章開始學寫字，寫過的字會出現在這裡。'}${tip?'<br>'+tip:''}</p>`}catch(e){try{return _rr.apply(this,arguments)}catch(_){return ''}}};
 W5.ready=true;return true}
if(!reg()){let n=0;const iv=setInterval(()=>{if(reg()||++n>40)clearInterval(iv)},250)}
}catch(e){console.log('write5',e)}})();

/* ================= 第五季遊樂園共用（s5/park/park5.js）：台詞、語音、卡片、開放條件、寶石 =================
 * 2026-11-12 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 兩個新東西：存錢小豬咚咚（piggy5，放「我的家」，完成第 31 章打開，不算小遊戲、不給寶石、App 不鎖）
 *            小小廚師（chef5，小遊戲，完成第 33 章打開，App 要買第五季那一包）。
 * 卡片先照第四季（m99y）的方式插進遊樂園 .pgrid；遊樂園大門（m99zx4）用 window.__gateExt 把卡片放到對的區。
 * 語音只念有真人錄音的句子（沒錄好以前只出字幕）；台詞表由 s5/park/mk_lines5.py 從下面 LINES 產生 lines_park5.tsv。
 * 順序：park5.js → piggy5.js → chef5.js（s5/assemble5.py 收進 v5/m99z_season5.js）。 */
(function(){try{
if(typeof SCREENS==='undefined')return;
/*LINES*/
const T={
"p_card":"存錢小豬咚咚，把寶石存起來！",
"lock31":"完成第三十一章，就會打開喔！",
"again":"再點一下，就可以進去喔！",
"p_hi":"咚咚！我是存錢小豬咚咚，把寶石餵給我吧！",
"p_drag":"把寶石拖到我背上的小洞洞，或是點一下寶石。",
"p_ding":"叮咚！",
"p_yum":"好吃！謝謝你！",
"p_x5":"五個一元，換成一個五元！",
"p_x10":"兩個五元，換成一個十元！",
"p_x50":"五個十元，換成一個五十元！",
"p_nogem":"寶石都存進來了！去闖關、玩遊戲，再收集寶石吧！",
"p_count":"我們一起數一數！",
"p_counted":"數好了！咚咚的肚子好飽喔！",
"p_empty":"咚咚的肚子空空的，先存一些寶石吧！",
"p_pick":"你想要存錢換什麼呢？選一個吧！",
"p_picked":"好！我們一起慢慢存！",
"p_none":"大東西還在路上，過幾天再來看看喔！",
"p_more":"還要再存一些，慢慢存，一定存得到！",
"p_enough":"存夠了！我們先去問爸爸媽媽！",
"p_ask":"請爸爸媽媽來看一看。",
"p_got":"換到了！謝謝爸爸媽媽！",
"p_wait":"好，我們先放著，下次再問爸爸媽媽。",
"p_change":"要換一個想要的東西嗎？",
"p_save":"把錢存起來，想要的東西就慢慢存到了！",
"p_tot_a":"咚咚肚子裡有",
"p_tot_b":"元",
"p_lots":"咚咚肚子裡存了好多錢！",
"p_out":"要請爸爸媽媽幫忙拿出來喔！",
"c1":"一元","c5":"五元","c10":"十元","c50":"五十元",
"c_card":"小小廚師，做點心給動物朋友吃！",
"lock33":"完成第三十三章，就會打開喔！",
"lockApp":"爸爸媽媽可以幫你打開新的冒險喔！",
"c_menu":"小小廚師！要做什麼點心呢？",
"c_safe":"小廚師只做不用刀、不用火的點心喔！",
"m_sand":"三明治","m_fruit":"水果串",
"d_easy":"簡單","d_mid":"中等","d_hard":"高難度",
"c_go":"開始做！",
"c_hello":"你好！我肚子餓了，可以幫我做點心嗎？",
"c_look":"看看點菜卡，一樣一樣放上去！",
"c_pattern":"看看水果串的規律，接下去串！",
"c_listen":"仔細聽，我要點的是：",
"c_want":"我要",
"n1":"一個","n2":"兩個","n3":"三個",
"i_bread":"麵包","i_lettuce":"生菜","i_tomato":"番茄","i_cheese":"起司","i_egg":"蛋",
"i_straw":"草莓","i_banana":"香蕉","i_grape":"葡萄","i_orange":"橘子","i_guava":"芭樂",
"h_bread":"是咖啡色的麵包喔！","h_lettuce":"是綠綠的生菜喔！","h_tomato":"是紅紅的番茄喔！","h_cheese":"是黃黃的起司喔！","h_egg":"是白白的蛋喔！",
"h_straw":"是紅紅的草莓喔！","h_banana":"是黃黃的香蕉喔！","h_grape":"是紫色的葡萄喔！","h_orange":"是橘色的橘子喔！","h_guava":"是綠綠的芭樂喔！",
"c_oops":"嗯？再看一次喔！",
"c_ok1":"放好了！","c_ok2":"好棒！","c_ok3":"就是這樣！",
"c_done_s":"三明治做好了！","c_done_f":"水果串做好了！",
"c_count_s":"數一數，三明治有幾層？","c_count_f":"數一數，水果串上有幾個水果？",
"c_try":"再數一次喔！",
"count":"我們一起數一數！",
"yes":"對！",
"c_yum":"好好吃！謝謝小廚師！",
"c_next":"下一位客人來了！",
"c_end":"三位客人都吃飽了！你是很棒的小廚師！",
"gem3":"送你三顆寶石！","gem1":"送你一顆寶石！"
};
/*END*/
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||!!S.lite}catch(e){return false}};
/* ---------- 語音：只念有錄音的（同 m99y） ---------- */
const vKey=p=>{if(p==null||p==='')return null;
 if(typeof p==='object'){if(p.en!=null)return 'e'+(p.slow||0)+'|'+String(p.en).trim();if(p.zh!=null)return (p.slow?'z'+p.slow:'z')+'|'+String(p.zh).trim();return null}
 const u=String(typeof heroT==='function'?heroT(p):p).replace(/⁠/g,'').trim();
 if(/^\d+$/.test(u))return voHas('z|'+u)?'z|'+u:'n|'+(+u);
 return voHas('z|'+u)?'z|'+u:'z|'+voCk(u)};
// 句中有「！」「？」的台詞是整句錄的：有整句錄音就整句播（同 m82_fix43 的 WHOLE43）
{const WH5=new Set(Object.values(T).filter(t=>/[！？](?=\S)/.test(t)));const _vs5p=voSpeak;voSpeak=async function(p,opt,gen){try{const txt=String(p&&typeof p==='object'?(p.en!=null?'':p.zh):p).trim();
  if(txt&&WH5.has(txt)&&!(typeof p==='object'&&(p.who||p.slow))&&S.vo&&VO.idx&&voHas('z|'+txt)){const b=await voBuf('z|'+txt);
   if(b&&gen===sayGen){const ok=await voPlay(b);if(ok!==false||gen!==sayGen)return}}}catch(e){}
  return _vs5p.apply(this,arguments)}}
const has=p=>{try{if(!VO.idx)return false;const k=vKey(p);return !!k&&voHas(k)}catch(e){return false}};
function sayR(parts){const a=(Array.isArray(parts)?parts:[parts]).filter(p=>p!=null&&p!==''&&has(p));
 if(!a.length)return Promise.resolve(false);const q=[];a.forEach((t,i)=>{if(i)q.push({pause:180});q.push(t)});
 try{return Promise.resolve(say(q)).then(()=>true,()=>true)}catch(e){return Promise.resolve(false)}}
// 寶石：每天第一次 3 顆、之後 1 顆（大門的每日上限 m99zx4 會在進遊戲時先記上「今天玩過」）
function gems(key){const first=V2[key]!==today();V2[key]=today();try{save2()}catch(e){}const n=first?3:1;S.wallet+=n;save();try{renderBar()}catch(e){}sfx('gem');return n}
/* ---------- 開放條件 ---------- */
const NEED={piggy5:31,chef5:33};
const STAGE5=window.__S5STAGE||'stage7';// 第三十一～三十五章的 App 包（主程式定了再改）
const appOK=k=>{try{if(k==='piggy5')return true;if(typeof IS_APP==='undefined'||!IS_APP)return true;return typeof stageOpen==='function'&&!!stageOpen(STAGE5)}catch(e){return false}};
const webOK=()=>{try{return typeof s3Ok==='function'?!!s3Ok():true}catch(e){return true}};
const pigOff=()=>{try{return V2.pigOff===true}catch(e){return false}};
function gate(k){if(!(S.chDone>=NEED[k]))return 'ch';if(!appOK(k))return 'app';if(!webOK())return 'pw';return ''}
/* ---------- 卡片圖示（遊樂園卡片 64×64） ---------- */
const dong=e=>{try{if(window.CH31&&CH31.dongdong&&CH31.dongdong.f)return CH31.dongdong.f(e||'happy')}catch(_){}
 return `<ellipse cx="50" cy="58" rx="34" ry="28" fill="#FFC4D4" stroke="#E890A8" stroke-width="3"/><rect x="42" y="30" width="16" height="4" rx="2" fill="#B07A1C"/><circle cx="38" cy="54" r="3.4" fill="#5A3A4A"/><circle cx="62" cy="54" r="3.4" fill="#5A3A4A"/><ellipse cx="50" cy="66" rx="9" ry="6" fill="#FF9DB8"/><circle cx="46" cy="66" r="1.6" fill="#B85A78"/><circle cx="54" cy="66" r="1.6" fill="#B85A78"/>`};
try{Object.assign(ICONART,{
 'i:piggy5':IA(`<circle cx="32" cy="32" r="27" fill="#FFE6EE"/><g transform="translate(4 6) scale(.56)">${dong('happy')}</g><g transform="translate(40 6) scale(.42)"><circle cx="18" cy="18" r="13" fill="#FFE07A" stroke="#D8A032" stroke-width="3"/></g>`),
 'i:chef5':IA(`<circle cx="32" cy="32" r="27" fill="#E2F6FF"/><ellipse cx="32" cy="50" rx="20" ry="4" fill="#fff" stroke="#B9D6E8" stroke-width="1.4"/><path d="M15 46 Q32 38 49 46 L49 49 Q32 44 15 49Z" fill="#E9B26A"/><path d="M14 43 Q20 39 26 43 Q32 39 38 43 Q44 39 50 43 L48 46 Q32 42 16 46Z" fill="#6CC56C"/><rect x="17" y="37" width="30" height="4" rx="2" fill="#FFD24D"/><path d="M15 36 Q32 26 49 36 L49 38 Q32 33 15 38Z" fill="#E9B26A"/>
  <path d="M22 22 Q18 12 26 12 Q28 6 34 8 Q40 5 42 12 Q48 12 44 22Z" fill="#fff" stroke="#C9D6E6" stroke-width="1.4"/><rect x="23" y="20" width="20" height="5" rx="1.5" fill="#fff" stroke="#C9D6E6" stroke-width="1.2"/>`)})}catch(e){console.log('icons5',e)}
// 正式卡片圖示（chars31.js 的 OBJ31.piggy5／chef5，64×64 圖內容）有就用
try{['piggy5','chef5'].forEach(k=>{if(window.OBJ31&&typeof OBJ31[k]==='string'&&OBJ31[k])ICONART['i:'+k]=IA(OBJ31[k])})}catch(e){}
try{UXPD.piggy5='把寶石存起來';UXPD.chef5='做點心給動物朋友吃'}catch(e){}
const CARD={piggy5:['i:piggy5','存錢小豬咚咚','把寶石存起來','完成第三十一章就會打開','lock31','p_card'],
 chef5:['i:chef5','小小廚師','疊三明治、串水果串','完成第三十三章就會打開','lock33','c_card']};
// 遊樂園大門（m99zx4）：存錢小豬放「我的家」、小小廚師放「小遊戲」；小小廚師的寶石照每日上限
try{const X=window.__gateExt=window.__gateExt||{};X.zones=Object.assign(X.zones||{},{piggy5:'home',chef5:'games'});X.gemDay=Object.assign(X.gemDay||{},{chef5:'chef5Day'});X.newest=['chef5'].concat(X.newest||[])}catch(e){}
{const _pk=SCREENS.park;SCREENS.park=function(){const r=_pk.apply(this,arguments);try{const g=$('.pgrid');if(g){
 let after=g.querySelector('[data-k="fossil26"]')||g.querySelector('[data-k="rocket26"]');
 ['piggy5','chef5'].forEach((k,i)=>{if(g.querySelector(`[data-k="${k}"]`))return;if(k==='piggy5'&&pigOff())return;const C=CARD[k],st=gate(k),lk=st==='ch'||st==='app';
  const b=document.createElement('button');b.className='pcard'+(lk?' lockd':'');b.dataset.k=k;b.style.setProperty('--dl',(.72+i*.04).toFixed(2)+'s');
  b.innerHTML=`<span class="pic">${art(C[0])}</span><b>${C[1]}</b><span>${st==='ch'?C[3]:C[2]}</span>${lk?`<span class="lk">${ICON.lock('#FFD98A')}</span>`:''}`;
  g.insertBefore(b,after?after.nextSibling:null);after=b})}}catch(e){console.log('park5',e)}return r}}
try{PARKS.push('piggy5','chef5')}catch(e){}
// 點卡片：鎖住的說要完成第幾章；第一次點先說是什麼、再點一下才進去
let pick5=0;
document.addEventListener('click',e=>{try{if(S.screen!=='park')return;const c=e.target.closest&&e.target.closest('.pcard[data-k="piggy5"],.pcard[data-k="chef5"]');if(!c)return;
 e.stopImmediatePropagation();e.preventDefault();const k=c.dataset.k,st=gate(k);
 const shake=()=>{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')};
 if(st==='ch'){hush();sayR([T[CARD[k][4]]]);shake();return}
 if(st==='app'){hush();sayR([T.lockApp]);shake();return}
 V2.parkSeen=V2.parkSeen||{};
 const enter=()=>{V2.parkSeen[k]=(V2.parkSeen[k]||0)+1;try{save2()}catch(_){}sfx('pop');S.from='park';hush();go(k)};
 const tryEnter=()=>{if(st==='pw'&&typeof window.__s3Gate==='function')return window.__s3Gate(enter);enter()};
 if((V2.parkSeen[k]||0)>=2||(c.classList.contains('uxsel')&&Date.now()-pick5<8000))return tryEnter();
 const g=c.parentNode;$$('.pcard.uxsel',g).forEach(x=>{x.classList.remove('uxsel');const h=x.querySelector('.uxhand');if(h)h.remove()});
 c.classList.add('uxsel');c.insertAdjacentHTML('beforeend','<span class="uxhand">'+(typeof CHAND!=='undefined'?CHAND:'')+'</span>');pick5=Date.now();sfx('pop');hush();
 sayR([T[CARD[k][5]],T.again])}catch(_){}},true);
window.__P5={T,sayR,has,gems,gate,RM,dong,pigOff,ver:'2026-11-12'};
}catch(e){console.log('park5',e)}})();

/* ================= 存錢小豬咚咚（s5/park/piggy5.js，畫面 piggy5） =================
 * 2026-11-12 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 規格：doc/ch31_100_outline.md 第五節（三）2、（四）1、（五）；第七節第 19 項（家長已決定：每個目標確認一次）。
 *  - 放在遊樂園「我的家」；完成第 31 章打開；App 不鎖（系統功能）；不是小遊戲，不給寶石。
 *  - 存：把寶石一顆一顆拖進咚咚背上的投幣口（或點一下寶石），叮咚一聲變成一元硬幣；
 *        滿 5 個一元換成 1 個五元、2 個五元換成 1 個十元、5 個十元換成 1 個五十元（1 顆寶石＝1 元，只是寶石的另一種樣子，不能在別處用）。
 *        關卡給的遊戲零錢用 __PIGGY.addCoins(n,'來源') 直接存進來。
 *  - 數一數：一個一個硬幣亮起來，念出加起來的數（100 以內有錄音）。
 *  - 目標：選一個 20 顆以上的衣服或房間佈置（清單從 ITEMS、ROOMITEMS 抓 price≥20 且還沒有的，加上 window.PIGGY_GOALS 登記的）。
 *          存夠了咚咚說「我們先去問爸爸媽媽！」→ 家長算術題（每個目標都要重新算一次，不用 90 秒內免算）→ 家長按「換給孩子」才換到。
 *  - 兒童畫面不出現真實價格（只有遊戲裡的硬幣數）。畫面大大顯示「咚咚肚子裡有 N 元」，按喇叭念出來。
 *  - 拿出來：孩子按「拿出來」，咚咚說要請爸爸媽媽幫忙；孩子不能自己拿。家長在家長專區「存錢小豬」→「拿出來」選要拿多少，拿出的變回寶石（1 元＝1 顆），有紀錄。
 *    給「遊戲設定」分類用的入口：__PIGGY.takeOut(回去的函式)（畫面）、__PIGGY.withdraw(n)（直接拿出 n 元，回傳實際拿出的數）。
 *  - 家長專區多一列「存錢小豬」：存了多少、目標、存錢紀錄、待確認的兌換（可以在那裡直接換）、拿出來、關閉整個功能。
 * 資料：V2.pig={bal, goal, got:[], log:[{d,a,n,k}]}（每位小朋友各一份）。 */
(function(){try{
if(typeof SCREENS==='undefined'||!window.__P5)return;
const {T,sayR,dong,RM}=window.__P5;
const PG=()=>{try{const p=V2.pig=V2.pig&&typeof V2.pig==='object'?V2.pig:{};p.bal=Math.max(0,+p.bal||0);p.got=Array.isArray(p.got)?p.got:[];p.log=Array.isArray(p.log)?p.log:[];return p}catch(e){return {bal:0,got:[],log:[]}}};
const td=()=>{const d=new Date();return `${d.getMonth()+1}/${d.getDate()}`};
function logIt(a,n,k){const p=PG();p.log.push({d:td(),a,n,k});if(p.log.length>60)p.log=p.log.slice(-60)}
const VAL=[50,10,5,1];
const brk=n=>{const o={50:0,10:0,5:0,1:0};for(const v of VAL){o[v]=Math.floor(n/v);n-=o[v]*v}return o};
const coin=v=>{try{if(typeof COIN31==='function')return COIN31(v,{px:40})}catch(e){}return typeof coinSVG==='function'?coinSVG(v):`<b>${v}</b>`};
const gemI=()=>{try{return gem(typeof WALLET_GEM!=='undefined'?WALLET_GEM:undefined)}catch(e){return '<i class="pg5gem0"></i>'}};
const dongSVG=e=>{try{if(typeof DONG31==='function')return DONG31(e||'normal','class="pg5dd"')}catch(_){}return `<svg viewBox="0 0 100 100" class="pg5dd" aria-hidden="true">${dong(e)}</svg>`};
/* ---------- 目標清單 ---------- */
const BIG=20;
function goals(){const out=[];
 try{(ITEMS||[]).forEach(it=>{if(it.price>=BIG&&it.price<999&&!it.chapter&&!it.reward&&!owns(it.id))out.push({id:'it:'+it.id,name:it.name,price:it.price,kind:'衣服',
  art:()=>{try{return still(it.slot==='pet'?petSVG(it.id):princess({...S.look,[it.slot]:it.id},'',VB[it.slot]||VB.dress))}catch(e){return ''}},
  has:()=>owns(it.id),give:()=>{if(!owns(it.id))S.owned.push(it.id);save()}})})}catch(e){}
 try{for(const s in ROOMITEMS)ROOMITEMS[s].forEach(([v,n,p])=>{if(p>=BIG&&p<999&&!S.roomOwned.includes(s+':'+v))out.push({id:'rm:'+s+':'+v,name:n,price:p,kind:'房間',
  art:()=>{try{const A=window.S31&&S31.TOY&&S31.TOY[v];if(A)return A}catch(e){}return roomIcon()},has:()=>S.roomOwned.includes(s+':'+v),give:()=>{if(!S.roomOwned.includes(s+':'+v))S.roomOwned.push(s+':'+v);save()}})})}catch(e){}
 try{(window.PIGGY_GOALS||[]).forEach(g=>{if(g&&g.id&&g.price>=BIG&&!(g.has&&g.has())&&!out.some(x=>x.id===g.id))out.push(g)})}catch(e){}
 return out.sort((a,b)=>a.price-b.price)}
const roomIcon=()=>`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="12" width="48" height="40" rx="6" fill="#FFF4DD" stroke="#E8C27A" stroke-width="2"/><path d="M14 44 H50" stroke="#C88A50" stroke-width="3"/><rect x="18" y="26" width="12" height="16" rx="2" fill="#FFB3C8"/><circle cx="42" cy="34" r="7" fill="#9AD0FF"/></svg>`;
const goalOf=()=>{const p=PG();if(!p.goal)return null;return goals().find(g=>g.id===p.goal)||null};
/* ---------- 畫面 ---------- */
let pTok=0;
SCREENS.piggy5=function(){const tok=++pTok;const live=()=>tok===pTok&&S.screen==='piggy5';const calm=RM();
 screen.innerHTML=`<div class="dball pg5${calm?' calm':''}"><div class="phead"><button class="btn2 small" id="pback">回遊樂園</button><h2 class="gtitle">存錢小豬咚咚</h2><span class="phsp"></span></div>
  <div class="pg5main">
   <div class="pg5left"><div class="pg5bub" id="pg5bub"></div><div class="pg5pig" id="pg5pig" aria-label="存錢小豬咚咚">${dongSVG('happy')}<i class="pg5slot" id="pg5slot"></i></div></div>
   <div class="pg5right">
    <div class="pg5box"><div class="pg5tot"><span>咚咚肚子裡有</span><b id="pg5n">0</b><span>元</span><button class="r26ib pg5say" id="pg5say" aria-label="念出來">${ICON.speaker('#5A3AB0')}</button></div><div class="pg5bh"><b>咚咚的肚子</b><span class="pg5bb"><button class="btn2 small" id="pg5cnt">數一數</button><button class="btn2 small" id="pg5out">拿出來</button></span></div><div class="pg5coins" id="pg5coins"></div></div>
    <div class="pg5goal" id="pg5goal"></div>
    <div class="pg5tray"><div class="pg5th"><b>我的寶石</b><span id="pg5wn"></span></div><div class="pg5gems" id="pg5gems"></div></div>
   </div></div></div>`;
 const bub=$('#pg5bub'),pigEl=$('#pg5pig');let timers=[];const later=(f,ms)=>{const t=setTimeout(()=>{if(live())f()},ms);timers.push(t);return t};
 const tell=(t,parts)=>{bub.textContent=t;bub.classList.remove('pop');void bub.offsetWidth;bub.classList.add('pop');return sayR(parts||[t])};
 const face=(e,ms)=>{pigEl.querySelector('svg').outerHTML=dongSVG(e);if(ms)later(()=>face('happy'),ms)};
 $('#pback').onclick=()=>{pTok++;hush();go('park')};
 function coinsHTML(){const b=brk(PG().bal);let h='';for(const v of VAL)for(let i=0;i<b[v];i++)h+=`<button class="pg5c v${v}" data-v="${v}" aria-label="${v}元">${coin(v)}</button>`;return h||'<p class="pg5e">空空的</p>'}
 function drawCoins(newV){$('#pg5coins').innerHTML=coinsHTML();$('#pg5n').textContent=PG().bal;if(newV){const c=[...$$('#pg5coins .pg5c')].filter(x=>+x.dataset.v===newV).pop();if(c&&!calm)c.classList.add('in')}
  $$('#pg5coins .pg5c').forEach(b=>b.onclick=()=>{sfx('pop');hush();sayR([T['c'+b.dataset.v]])})}
 function drawGems(){const n=S.wallet;$('#pg5wn').textContent=n;const show=Math.min(n,10);
  $('#pg5gems').innerHTML=Array.from({length:show},(_,i)=>`<button class="pg5g" data-i="${i}" aria-label="寶石">${gemI()}</button>`).join('')+(n>10?`<span class="pg5more">＋${n-10}</span>`:'')+(n?'':'<p class="pg5e">寶石都存進來了</p>');
  $$('#pg5gems .pg5g').forEach(bindGem)}
 function drawGoal(){const g=goalOf(),p=PG(),el=$('#pg5goal');
  if(!g){const any=goals().length;el.innerHTML=`<div class="pg5gl"><span class="pg5gi">${roomIcon()}</span><div><b>想要的東西</b><small>${any?'選一個大東西，慢慢存':'大東西還在路上'}</small></div></div>${any?'<button class="btn" id="pg5pick">選一個</button>':''}`;
   const b=$('#pg5pick');if(b)b.onclick=pick;return}
  const ok=p.bal>=g.price,pc=Math.min(100,Math.round(p.bal/g.price*100));
  el.innerHTML=`<div class="pg5gl"><span class="pg5gi">${g.art()}</span><div><b>${g.name}</b><small>存了 <b>${Math.min(p.bal,g.price)}</b>／${g.price}</small><div class="pg5bar"><i style="width:${pc}%"></i></div></div></div>
   <div class="pg5gb">${ok?'<button class="btn pg5ask" id="pg5ask">請爸爸媽媽來看</button>':''}<button class="btn2 small" id="pg5chg">換一個</button></div>`;
  $('#pg5chg').onclick=()=>{sfx('pop');hush();tell(T.p_change);pick()};const a=$('#pg5ask');if(a)a.onclick=ask}
 /* 存一顆 */
 let busy=0;
 function deposit(fromEl){if(S.wallet<1){tell(T.p_nogem);return}if(busy>2)return;busy++;
  const b0=brk(PG().bal);S.wallet-=1;PG().bal+=1;logIt('存',1);save();try{save2()}catch(e){}try{renderBar()}catch(e){}
  const fly=()=>{busy--;if(!live())return;const b1=brk(PG().bal);let ln=null,nv=1;if(b1[50]>b0[50]){ln='p_x50';nv=50}else if(b1[10]>b0[10]){ln='p_x10';nv=10}else if(b1[5]>b0[5]){ln='p_x5';nv=5}
   sfx(ln?'gem':'right');drawCoins(nv);drawGems();drawGoal();face(ln?'wow':'yum',1100);pigEl.classList.remove('bump');void pigEl.offsetWidth;pigEl.classList.add('bump');
   const g=goalOf();if(g&&PG().bal===g.price){later(()=>{face('wow',1600);tell(T.p_enough)},500)}else if(ln)tell(T[ln]);else tell(Math.random()<.5?T.p_ding:T.p_yum)};
  if(calm||!fromEl){fly();return}
  const r=fromEl.getBoundingClientRect(),s=$('#pg5slot').getBoundingClientRect();const f=document.createElement('div');f.className='pg5fly';f.innerHTML=gemI();
  f.style.left=r.left+'px';f.style.top=r.top+'px';document.body.appendChild(f);requestAnimationFrame(()=>{f.style.transform=`translate(${s.left+s.width/2-r.left-18}px,${s.top-r.top-12}px) scale(.6)`;f.style.opacity='.4'});
  setTimeout(()=>{f.remove();fly()},calm?0:420)}
 // 拖寶石：放到咚咚身上才算；只點一下也可以存
 function bindGem(b){let st=null;
  b.addEventListener('pointerdown',e=>{e.preventDefault();st={x:e.clientX,y:e.clientY,id:e.pointerId,el:null};try{b.setPointerCapture(e.pointerId)}catch(_){}});
  b.addEventListener('pointermove',e=>{if(!st||e.pointerId!==st.id)return;if(!st.el&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>8){st.el=document.createElement('div');st.el.className='pg5drag';st.el.innerHTML=gemI();document.body.appendChild(st.el);b.style.opacity=.3}
   if(st.el){st.el.style.left=e.clientX+'px';st.el.style.top=e.clientY+'px'}});
  const up=e=>{if(!st||e.pointerId!==st.id)return;const s=st;st=null;b.style.opacity='';if(!s.el){if(e.type==='pointerup')deposit(b);return}s.el.remove();
   const r=pigEl.getBoundingClientRect();if(e.type==='pointerup'&&e.clientX>r.left-20&&e.clientX<r.right+20&&e.clientY>r.top-30&&e.clientY<r.bottom+20)deposit(null);else{sfx('hint');tell(T.p_drag)}};
  b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up)}
 /* 存了多少：念出來 */
 const sayTot=()=>{const n=PG().bal;bub.textContent=`咚咚肚子裡有 ${n} 元！`;return n<=100?sayR([T.p_tot_a,String(n),T.p_tot_b]):sayR([T.p_lots])};
 $('#pg5say').onclick=()=>{sfx('pop');hush();sayTot()};
 /* 拿出來：孩子不能自己拿 */
 $('#pg5out').onclick=()=>{sfx('pop');hush();face('normal',1600);tell(T.p_out)};
 /* 數一數 */
 $('#pg5cnt').onclick=()=>{if(busy)return;hush();const cs=[...$$('#pg5coins .pg5c')];if(!cs.length){tell(T.p_empty);return}busy=9;
  tell(T.p_count);let sum=0,i=0;cs.forEach(c=>c.classList.remove('lit'));
  const step=()=>{if(!live()){busy=0;return}if(i>=cs.length){busy=0;face('happy');later(()=>tell(T.p_counted),300);return}const c=cs[i++];sum+=+c.dataset.v;c.classList.add('lit');c.setAttribute('data-n',sum);sfx('pop');
   if(sum<=100)sayR([String(sum)]);later(step,calm?650:800)};later(step,1400)};
 /* 選目標 */
 function pick(){const L=goals();if(!L.length){tell(T.p_none);drawGoal();return}
  const ov=overlay(screen,`<div class="card pg5pick"><h2>想要存錢換什麼呢？</h2><div class="pg5opts">${L.map(g=>`<button class="pg5opt${PG().goal===g.id?' sel':''}" data-id="${g.id}"><span class="pg5oi">${g.art()}</span><b>${g.name}</b><small>${g.kind}・<i class="pg5gi2">${gemI()}</i>${g.price}</small></button>`).join('')}</div><div class="row"><button class="btn2" id="pg5pno">先不要</button></div></div>`);
  ov.classList.add('pg5ov');tell(T.p_pick);
  $('#pg5pno',ov).onclick=()=>{sfx('pop');ov.remove()};
  $$('.pg5opt',ov).forEach(b=>b.onclick=()=>{const p=PG();p.goal=b.dataset.id;const g=L.find(x=>x.id===p.goal);logIt('目標',0,g&&g.name);try{save2()}catch(e){}sfx('gem');ov.remove();drawGoal();face('happy');
   tell(PG().bal>=g.price?T.p_enough:T.p_picked)})}
 /* 存夠了：請爸爸媽媽來看（每個目標都要重新算一次家長題） */
 function ask(){const g=goalOf();if(!g||PG().bal<g.price)return;hush();tell(T.p_ask);
  try{pgOK70=0}catch(e){}parentGate(()=>{if(!live())return;confirmP(g,ok=>{if(ok)celebrate(g);else{face('normal',1500);tell(T.p_wait)}})})}
 function celebrate(g){drawCoins();drawGoal();face('wow',2400);try{confetti()}catch(e){}sfx('gem');
  const ov=overlay(screen,`<div class="card pg5got"><div class="pg5gotpic">${g.art()}</div><h2>換到${g.name}了！</h2><p class="small">${g.kind==='衣服'?'可以去換裝間穿穿看喔！':'可以去房間佈置看看喔！'}</p><div class="row"><button class="btn" id="pg5gok">好！</button></div></div>`);
  ov.classList.add('pg5ov');sayR([T.p_got,T.p_save]);$('#pg5gok',ov).onclick=()=>{sfx('pop');hush();ov.remove()}}
 drawCoins();drawGems();drawGoal();
 const p=PG();if(!p.seenHi){p.seenHi=1;try{save2()}catch(e){}tell(T.p_hi,[T.p_hi,T.p_drag])}
 else{const g=goalOf();if(g&&p.bal>=g.price)tell(T.p_enough);else if(g)tell(T.p_more);else tell(T.p_pick)}};
// 家長確認畫面（算術題之後）；家長專區也用這個
function confirmP(g,done){const p=PG();
 const ov=overlay(screen,`<div class="card left pg5par"><h2>家長確認：存錢小豬</h2><p>孩子想用存錢小豬裡存的 <b class="gold">${g.price}</b> 元（＝${g.price} 顆寶石），換「<b>${g.name}</b>」（${g.kind}）。</p><p class="small">現在存了 ${p.bal} 顆。換了以後，存錢小豬裡剩下 ${p.bal-g.price} 顆。寶石是遊戲裡的獎勵，不是真的錢。</p><div class="row"><button class="btn" id="pg5yes">換給孩子</button><button class="btn2" id="pg5no">先不要</button></div></div>`);
 ov.classList.add('pg5ov');
 $('#pg5yes',ov).onclick=()=>{const q=PG();if(q.bal<g.price){ov.remove();return done(false)}q.bal-=g.price;g.give();q.got.push(g.id);q.goal=null;logIt('換',g.price,g.name);try{save2()}catch(e){}save();ov.remove();done(true)};
 $('#pg5no',ov).onclick=()=>{logIt('先不換',0,g.name);try{save2()}catch(e){}ov.remove();done(false)}}
/* ---------- 家長：拿出來（拿出的變回寶石，1 元＝1 顆） ---------- */
function withdraw(n){const p=PG();n=Math.max(0,Math.min(p.bal,Math.floor(+n||0)));if(!n)return 0;p.bal-=n;S.wallet+=n;logIt('拿出',n);try{save2()}catch(e){}save();try{renderBar()}catch(e){}return n}
function takeOut(back){const p=PG();let n=Math.min(p.bal,10);
 const ov=overlay(screen,`<div class="card left pg5take"><h2>從存錢小豬拿出來</h2><p>現在存了 <b class="gold">${p.bal}</b> 元（＝${p.bal} 顆寶石）。拿出來的會變回孩子的寶石。</p>
  <div class="pg5amt"><button class="btn2" data-d="-10">－10</button><button class="btn2" data-d="-1">－1</button><input id="pg5amt" class="pin" inputmode="numeric" aria-label="拿出多少"><button class="btn2" data-d="1">＋1</button><button class="btn2" data-d="10">＋10</button></div>
  <div class="row"><button class="btn2 small" id="pg5all">全部（${p.bal}）</button></div>
  <p class="small" id="pg5amtn"></p><div class="row"><button class="btn" id="pg5tk"${p.bal?'':' disabled'}>拿出來</button><button class="btn2" id="pg5tkno">取消</button></div></div>`);
 ov.classList.add('pg5ov');const inp=$('#pg5amt',ov);
 const upd=v=>{n=Math.max(0,Math.min(PG().bal,Math.floor(+v||0)));inp.value=n;$('#pg5amtn',ov).textContent=`拿出 ${n} 元以後，存錢小豬剩 ${PG().bal-n} 元，孩子的寶石變成 ${S.wallet+n} 顆。`};upd(n);
 $$('[data-d]',ov).forEach(b=>b.onclick=()=>upd(n+ +b.dataset.d));inp.oninput=()=>upd(inp.value);$('#pg5all',ov).onclick=()=>upd(PG().bal);
 const done=()=>{ov.remove();if(typeof back==='function')back()};
 // 按「拿出來」要再確認一次（家長專區、遊戲設定兩邊同一個確認框：m99zx8 的 window.__s8ask1；沒有就用 confirmBox）
 $('#pg5tk',ov).onclick=async()=>{if(ov.dataset.ask)return;if(n>0){ov.dataset.ask=1;let y=true;
  try{const left=Math.max(0,PG().bal-n);if(typeof window.__s8ask1==='function')y=await window.__s8ask1({title:`從存錢小豬拿出 ${n} 元？`,body:`<p>咚咚肚子裡的 ${n} 元會變回孩子的 ${n} 顆寶石（小豬剩 ${left} 元），會記在存錢紀錄裡。</p>`,ok:'拿出來'});
   else if(typeof confirmBox==='function')y=await confirmBox(`從存錢小豬拿出 ${n} 元？`,`咚咚肚子裡的 ${n} 元會變回孩子的 ${n} 顆寶石（小豬剩 ${left} 元）。`,'拿出來')}catch(e){y=false}
  delete ov.dataset.ask;if(!y||!ov.isConnected)return}
  const got=withdraw(n);ov.remove();try{toast(got?`拿出 ${got} 元，變回 ${got} 顆寶石`:'沒有拿出')}catch(e){}if(typeof back==='function')back()};
 $('#pg5tkno',ov).onclick=done;return ov}
/* ---------- 家長專區：存錢小豬 ---------- */
function parentPig(){const p=PG(),g=goalOf();const off=V2.pigOff===true;
 const ov=overlay(screen,`<div class="card left pg5hub"><h2>存錢小豬</h2>
  <p>現在存了 <b class="gold">${p.bal}</b> 元（1 元＝1 顆寶石）。${g?`目標：「${g.name}」（${g.price} 元）${p.bal>=g.price?'，<b>已經存夠，等您確認</b>':''}。`:'還沒選目標。'}</p>
  <div class="row">${g&&p.bal>=g.price?'<button class="btn" id="pg5now">現在換給孩子</button>':''}<button class="btn2" id="pg5take">拿出來</button></div>
  <span class="lab">存錢紀錄（最近 20 筆）</span><div class="pg5log">${p.log.slice(-20).reverse().map(x=>`<div><span>${x.d}</span><span>${x.a}${x.n?' '+x.n+' 元':''}${x.k?'「'+x.k+'」':''}</span></div>`).join('')||'<div>還沒有紀錄</div>'}</div>
  <span class="lab">存錢小豬</span><div class="seg"><button data-po="0" aria-pressed="${!off}">開</button><button data-po="1" aria-pressed="${off}">關（遊樂園不顯示）</button></div>
  <p class="small">孩子不能自己從存錢小豬拿錢，要拿出來請按上面的「拿出來」，拿出的會變回寶石（1 元＝1 顆），會記在紀錄裡。20 顆以上的大東西要先存在小豬裡，存夠了由您確認才換得到，每個東西確認一次。</p>
  <div class="row"><button class="btn2" id="pg5hb">回家長專區</button></div></div>`);
 ov.classList.add('pg5ov');
 $$('[data-po]',ov).forEach(b=>b.onclick=()=>{V2.pigOff=b.dataset.po==='1';try{save2()}catch(e){}$$('[data-po]',ov).forEach(x=>x.setAttribute('aria-pressed',x===b))});
 $('#pg5take',ov).onclick=()=>{ov.remove();takeOut(parentPig)};
 const now=$('#pg5now',ov);if(now)now.onclick=()=>{ov.remove();confirmP(g,()=>parentPig())};
 $('#pg5hb',ov).onclick=()=>{ov.remove();try{homeHub()}catch(e){}}}
try{if(typeof homeHub==='function'){const _hub5=homeHub;homeHub=function(){const r=_hub5.apply(this,arguments);try{if(!(S.chDone>=31))return r;const ov=$$('.overlay').pop();const card=ov&&$('.card.hub',ov);
 if(card&&!$('.hrow[data-k="pig5"]',card)){const p=PG(),g=goalOf();const b=document.createElement('button');b.className='hrow';b.dataset.k='pig5';
  b.innerHTML=`<span class="hic"><svg viewBox="0 0 100 100" aria-hidden="true">${dong('happy')}</svg></span><span class="htx"><b>存錢小豬</b><small>存了 ${p.bal} 元${g&&p.bal>=g.price?'・有一個東西等您確認':''}・存錢紀錄・開關</small></span><i>›</i>`;
  const x=$('#hubx',card);x?x.before(b):card.appendChild(b);b.onclick=()=>{sfx&&sfx('pop');ov.remove();parentPig()}}}catch(e){console.log('pig5hub',e)}return r};window.__homeHub=homeHub}}catch(e){}
/* ---------- 樣式 ---------- */
const css=document.createElement('style');css.id='pg5css';css.textContent=`
.pg5 .pg5bh .btn2,.pg5 .pg5gb .btn2,.pg5 .pg5gb .btn,.pg5 .pg5goal>.btn{min-height:48px;min-width:48px;box-sizing:border-box}
.pg5 .pg5tot{display:flex;align-items:center;justify-content:center;gap:8px;font-size:20px;font-weight:700;margin-bottom:6px;color:#5A3A7A}.pg5 .pg5tot b{font:800 40px/1 var(--latin,sans-serif);color:#E0457A;min-width:1.2em;text-align:center}
.pg5 .pg5say{width:48px;height:48px;flex:0 0 48px}.pg5 .pg5bb{display:flex;gap:6px}
.pg5ov .pg5amt{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;margin:8px 0}.pg5ov .pg5amt .btn2{min-width:48px;min-height:48px;padding:0 8px;margin:0;box-sizing:border-box}.pg5ov .pg5amt input{width:3.6em;min-height:48px;text-align:center;font-size:22px;box-sizing:border-box;margin:0}
.pg5 .pg5main{display:flex;flex-direction:column;gap:10px;padding:6px 12px 12px;box-sizing:border-box;max-width:980px;margin:0 auto;width:100%}
.pg5 .pg5left{position:relative;display:flex;flex-direction:column;align-items:center}
.pg5 .pg5pig{position:relative;width:min(46vw,210px);aspect-ratio:1;touch-action:none}.pg5 .pg5pig svg{width:100%;height:100%}
.pg5 .pg5pig.bump{animation:pg5bump .45s}@keyframes pg5bump{30%{transform:scale(1.08,.94)}60%{transform:scale(.97,1.04)}}
.pg5 .pg5slot{position:absolute;left:44%;top:18%;width:12%;height:6%}
.pg5 .pg5bub{min-height:2.6em;max-width:min(92vw,520px);background:#fff;color:#4A2C5E;border-radius:18px;padding:8px 14px;font-size:18px;line-height:1.35;box-shadow:0 4px 0 rgba(0,0,0,.15);text-align:center}
.pg5 .pg5bub.pop{animation:pg5pop .3s}@keyframes pg5pop{0%{transform:scale(.92)}100%{transform:scale(1)}}
.pg5 .pg5right{display:flex;flex-direction:column;gap:10px;min-width:0}
.pg5 .pg5box,.pg5 .pg5goal,.pg5 .pg5tray{background:rgba(255,255,255,.93);border-radius:18px;padding:10px 12px;color:#3A2A55;box-shadow:0 4px 0 rgba(0,0,0,.18)}
.pg5 .pg5bh,.pg5 .pg5th{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:17px}
.pg5 .pg5coins{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;min-height:52px;align-items:center}
.pg5 .pg5c{position:relative;border:0;background:none;padding:0;width:48px;height:48px;min-width:44px}.pg5 .pg5c svg{width:100%;height:100%}
.pg5 .pg5c.v50{width:56px;height:56px}.pg5 .pg5c.in{animation:pg5in .5s}@keyframes pg5in{0%{transform:translateY(-30px) scale(.5);opacity:0}100%{transform:none;opacity:1}}
.pg5 .pg5c.lit{filter:drop-shadow(0 0 6px #FFD24D)}.pg5 .pg5c.lit::after{content:attr(data-n);position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);background:#7A5CE0;color:#fff;border-radius:9px;font:700 13px/1.4 var(--latin,sans-serif);padding:0 6px}
.pg5 .pg5e{margin:0;color:#8A7AA0;font-size:15px}
.pg5 .pg5gl{display:flex;align-items:center;gap:10px}.pg5 .pg5gl>div{flex:1;min-width:0}.pg5 .pg5gl b{display:block;font-size:18px}.pg5 .pg5gl small{font-size:15px;color:#6A5A80}.pg5 .pg5gl small b{display:inline;font-size:inherit;color:#C8457A}
.pg5 .pg5gi{flex:0 0 74px;width:74px;height:74px;display:block;background:#FFF6E6;border-radius:14px;overflow:hidden}.pg5 .pg5gi svg{width:100%;height:100%}
.pg5 .pg5bar{height:14px;border-radius:7px;background:#EEE6F8;overflow:hidden;margin-top:4px}.pg5 .pg5bar i{display:block;height:100%;background:linear-gradient(90deg,#FFB3C8,#FF7FA8);border-radius:7px;transition:width .4s}
.pg5 .pg5gb{display:flex;gap:8px;justify-content:flex-end;margin-top:8px;flex-wrap:wrap}.pg5 .pg5goal>.btn{margin-top:8px}
.pg5 .pg5ask{animation:pg5glow 1.4s infinite alternate}@keyframes pg5glow{to{box-shadow:0 0 0 6px rgba(255,210,77,.55)}}
.pg5 .pg5gems{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;align-items:center;min-height:52px}
.pg5 .pg5g{width:52px;height:52px;border:0;border-radius:14px;background:#F3EEFF;padding:6px;touch-action:none;cursor:grab}.pg5 .pg5g svg{width:100%;height:100%}
.pg5 .pg5more{font:700 17px var(--latin,sans-serif);color:#7A5CE0}
.pg5fly,.pg5drag{position:fixed;z-index:60;width:36px;height:36px;pointer-events:none;transition:transform .4s ease-in,opacity .4s}.pg5drag{transform:translate(-50%,-50%);transition:none;width:44px;height:44px}.pg5fly svg,.pg5drag svg{width:100%;height:100%}
.pg5.calm *{animation:none!important;transition:none!important}
.pg5ov .card{max-width:min(620px,calc(100vw - 24px));box-sizing:border-box;max-height:calc(100vh - 24px);overflow:auto}
.pg5ov .pg5opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin:8px 0}
.pg5ov .pg5opt{color:#3A2A55;border:3px solid transparent;border-radius:16px;background:#FFF8EC;padding:8px;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:44px}
.pg5ov .pg5opt.sel{border-color:#FF7FA8}.pg5ov .pg5oi{width:84px;height:84px;display:block}.pg5ov .pg5oi svg{width:100%;height:100%}.pg5ov .pg5opt b{font-size:16px}.pg5ov .pg5opt small{font-size:14px;color:#6A5A80;display:flex;align-items:center;gap:2px}.pg5ov .pg5gi2{width:16px;height:16px;display:inline-block}.pg5ov .pg5gi2 svg{width:100%;height:100%}
.pg5ov .pg5gotpic{width:140px;height:140px;margin:0 auto}.pg5ov .pg5gotpic svg{width:100%;height:100%}
.pg5ov .pg5log{max-height:180px;overflow:auto;font-size:14px;background:rgba(0,0,0,.05);border-radius:10px;padding:6px 10px;margin:4px 0 10px}.pg5ov .pg5log div{display:flex;gap:12px}
@media (orientation:landscape){.pg5 .pg5main{flex-direction:row;align-items:flex-start}.pg5 .pg5left{flex:0 0 40%}.pg5 .pg5right{flex:1}.pg5 .pg5pig{width:min(30vw,36vh,260px)}}
`;document.head.appendChild(css);
window.__PIGGY={PG,goals,goalOf,brk,addCoins(n,why){n=Math.max(0,Math.floor(+n||0));if(!n)return 0;PG().bal+=n;logIt(why||'零錢',n);try{save2()}catch(e){}return n},parentPig,confirmP,BIG,withdraw,takeOut};
}catch(e){console.log('piggy5',e)}})();

/* ================= 小小廚師（s5/park/chef5.js，畫面 chef5） =================
 * 2026-11-12 星光工作室 Starlight Studio 原創，著作權與 IP 屬於星光工作室
 * 規格：doc/ch31_100_outline.md 第五節（三）2「小小廚師」、（二）6 新小遊戲共同規格。完成第 33 章打開；App 要買第五季那一包。
 * 玩法：三位動物客人輪流點餐（一局約 1～3 分鐘），照點菜卡（或聽語音）把材料一樣一樣放上去：
 *   三明治：一層一層疊（麵包、生菜、番茄、起司、蛋）。水果串：一個一個串（草莓、香蕉、葡萄、橘子、芭樂）。
 *   做好了數一數「有幾層／幾個水果」，客人笑咪咪吃掉。只做不用刀、不用火的點心。
 * 難度（照遊戲三級；選單可以換）：
 *   簡單：三明治 3 層、水果串 3 個，看點菜卡，材料只有 2 種可以選；數數選 2 個答案。
 *   中等：三明治 5 層、水果串 6 個「規律」（點菜卡只畫前 4 個，後面要自己接下去）；材料 3～5 種；數數 3 選 1。
 *   高難度：聽客人點餐、沒有圖卡（只有空格），可以按「再聽一次」；水果串用「兩個草莓、一個香蕉」這樣數量＋名字；數數 3 選 1。
 * 沒有輸、沒有倒數：放錯會彈回去（說「嗯？再看一次喔！」），同一格第二次放錯，對的材料會發亮，再說它的顏色。
 * 操作：點一下材料就放上去；也可以把材料拖到盤子上。
 * 寶石：每天第一次玩完 3 顆、之後 1 顆（V2.chef5Day；大門每日上限 m99zx4 用 __gateExt.gemDay 接）。
 * 食材圖：有 OBJ31（第五季美術）就用，沒有的（麵包、起司、草莓、三明治側面層、竹籤）先用占位圖，見 s5/design/art_needs.md「遊樂園」。 */
(function(){try{
if(typeof SCREENS==='undefined'||!window.__P5)return;
const {T,sayR,gems,RM}=window.__P5;
/* ---------- 食材 ---------- */
const o31=k=>{try{if(window.OBJ31&&OBJ31[k])return `<svg viewBox="0 0 64 64" aria-hidden="true">${typeof OBJ31[k]==='function'?OBJ31[k]():OBJ31[k]}</svg>`}catch(e){}return null};
const PH={// 占位圖（64×64）
 bread:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 26 Q10 12 24 12 Q32 6 40 12 Q54 12 52 26 L50 52 Q32 56 14 52Z" fill="#E9B26A" stroke="#B9783A" stroke-width="2.4"/><path d="M17 27 Q16 18 25 18 Q32 13 39 18 Q48 18 47 27 L46 48 Q32 51 18 48Z" fill="#FFF0D2"/></svg>`,
 cheese:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 44 L32 16 L56 44Z" fill="#FFD24D" stroke="#D8A032" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 44 H56 V52 H8Z" fill="#F5C23A" stroke="#D8A032" stroke-width="2.4"/><circle cx="30" cy="36" r="3.4" fill="#F0B02A"/><circle cx="40" cy="42" r="2.4" fill="#F0B02A"/><circle cx="22" cy="46" r="2" fill="#E8A61E"/></svg>`,
 straw:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 56 Q14 44 14 28 Q14 18 24 18 Q32 18 32 22 Q32 18 40 18 Q50 18 50 28 Q50 44 32 56Z" fill="#FF4F6A" stroke="#C8304A" stroke-width="2"/><path d="M22 14 Q32 20 42 14 Q38 22 32 21 Q26 22 22 14Z" fill="#4CB35A"/><g fill="#FFE8A0"><circle cx="24" cy="30" r="1.4"/><circle cx="32" cy="34" r="1.4"/><circle cx="40" cy="30" r="1.4"/><circle cx="28" cy="42" r="1.4"/><circle cx="36" cy="42" r="1.4"/></g></svg>`,
 lettuce:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 40 Q14 22 32 24 Q50 22 56 40 Q48 46 40 42 Q32 48 24 42 Q16 46 8 40Z" fill="#7CCB5A" stroke="#3E8E3A" stroke-width="2"/></svg>`,
 tomato:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="36" r="20" fill="#F0503C"/><path d="M24 16 L32 20 L40 16 L36 22 L32 20 L28 22Z" fill="#4CB35A"/></svg>`,
 egg:`<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="34" rx="18" ry="22" fill="#FFFDF4" stroke="#D9CBB0" stroke-width="2"/></svg>`,
 banana:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 22 Q20 50 52 44 Q30 40 20 18Z" fill="#FFD84D" stroke="#C8A020" stroke-width="2"/></svg>`,
 grape:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="#8A5ACF" stroke="#5E3A9A" stroke-width="1.4"><circle cx="26" cy="24" r="7"/><circle cx="38" cy="24" r="7"/><circle cx="32" cy="35" r="7"/><circle cx="22" cy="36" r="6"/><circle cx="42" cy="36" r="6"/><circle cx="32" cy="47" r="6"/></g></svg>`,
 orange:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="34" r="20" fill="#FF9A2E" stroke="#D8701A" stroke-width="2"/><path d="M32 14 Q38 8 44 12 Q38 16 32 14Z" fill="#4CB35A"/></svg>`,
 guava:`<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="36" rx="18" ry="20" fill="#9ED36A" stroke="#5E9A3A" stroke-width="2"/></svg>`};
const OBJK={lettuce:'greens',tomato:'tomato',egg:'egg',banana:'banana',grape:'grapes',orange:'orange',guava:'guava'};
const ING={bread:{c:'#D9A05B',en:'bread'},lettuce:{c:'#7CCB5A'},tomato:{c:'#F0503C'},cheese:{c:'#FFD24D'},egg:{c:'#FFFDF4',en:'egg'},
 straw:{c:'#FF4F6A',en:'strawberry'},banana:{c:'#FFD84D',en:'banana'},grape:{c:'#8A5ACF',en:'grape'},orange:{c:'#FF9A2E',en:'orange'},guava:{c:'#9ED36A'}};
const NAME=k=>T['i_'+k];
const icon=k=>(OBJK[k]&&o31(OBJK[k]))||(window.OBJ31&&OBJ31[k]&&o31(k))||PH[k];
const FILL=['lettuce','tomato','cheese','egg'],FRUIT=['straw','banana','grape','orange','guava'];
// 三明治側面一層（寬 200）——占位圖
function layer(k,y){try{const L5=window.OBJ31&&OBJ31.layer5;if(L5&&typeof L5.get==='function'){const r=L5.get(k,y);if(r)return r}}catch(e){}  // 正式圖（chars31.js 的 OBJ31.layer5）有就用
 const L={bread:[22,`<rect x="6" y="${y}" width="188" height="22" rx="11" fill="#E9B26A" stroke="#B9783A" stroke-width="3"/><rect x="14" y="${y+5}" width="172" height="10" rx="5" fill="#FFE9C2"/>`],
 lettuce:[14,`<path d="M2 ${y+7} Q12 ${y-2} 22 ${y+7} T42 ${y+7} T62 ${y+7} T82 ${y+7} T102 ${y+7} T122 ${y+7} T142 ${y+7} T162 ${y+7} T182 ${y+7} T198 ${y+7} V${y+13} H2Z" fill="#7CCB5A" stroke="#3E8E3A" stroke-width="2"/>`],
 tomato:[14,`<rect x="16" y="${y}" width="78" height="13" rx="6.5" fill="#F0503C" stroke="#B83020" stroke-width="2"/><rect x="106" y="${y}" width="78" height="13" rx="6.5" fill="#F0503C" stroke="#B83020" stroke-width="2"/>`],
 cheese:[12,`<path d="M10 ${y} H190 L196 ${y+11} H4Z" fill="#FFD24D" stroke="#D8A032" stroke-width="2"/><path d="M40 ${y+11} Q46 ${y+20} 52 ${y+11}Z M140 ${y+11} Q146 ${y+18} 152 ${y+11}Z" fill="#FFD24D" stroke="#D8A032" stroke-width="1.6"/>`],
 egg:[14,`<rect x="20" y="${y}" width="160" height="13" rx="6.5" fill="#FFFDF4" stroke="#D9CBB0" stroke-width="2"/><ellipse cx="70" cy="${y+6.5}" rx="16" ry="5" fill="#FFC93A"/><ellipse cx="130" cy="${y+6.5}" rx="16" ry="5" fill="#FFC93A"/>`]}[k];return L}
/* ---------- 出題 ---------- */
const pickN=(a,n)=>shuffle(a).slice(0,n);
const rr=a=>a[Math.floor(Math.random()*a.length)];
function makeOrder(mode,diff){
 if(mode==='sand'){
  if(diff==='easy'){const x=rr(FILL);return {seq:['bread',x,'bread'],tray:shuffle(['bread',x]),show:'all'}}
  if(diff==='mid'){const f=pickN(FILL,3);return {seq:['bread',...f,'bread'],tray:shuffle(['bread',...FILL]),show:'all'}}
  const f=pickN(FILL,Math.random()<.5?2:3);return {seq:['bread',...f,'bread'],tray:shuffle(['bread',...FILL]),show:'none',say:[T.c_want,...['bread',...f,'bread'].map(NAME)]}}
 if(diff==='easy'){const [a,b]=pickN(FRUIT,2);return {seq:[a,b,a],tray:shuffle([a,b]),show:'all'}}
 if(diff==='mid'){const [a,b,c]=pickN(FRUIT,3);const pat=Math.random()<.5?[a,b]:[a,a,b];const seq=[];while(seq.length<6)seq.push(pat[seq.length%pat.length]);return {seq,tray:shuffle([a,b,c]),show:4,pattern:1}}
 const ks=pickN(FRUIT,Math.random()<.5?2:3);const mx=ks.length===2?3:2;const grp=ks.map(k=>[k,1+Math.floor(Math.random()*mx)]);
 const seq=grp.flatMap(([k,n])=>Array(n).fill(k));return {seq,tray:shuffle([...FRUIT]),show:'none',say:[T.c_want,...grp.flatMap(([k,n])=>[T['n'+n],NAME(k)])]}}
window.__CH5={mk:makeOrder};
const GUESTS=()=>{const a=['bunny','bear','kitten','squirrel','owl','frog'].filter(k=>{try{return !!AN[k]}catch(e){return false}});return shuffle(a.length?a:['bunny'])};
const guestSVG=k=>{try{return animal(k)}catch(e){return ''}};
/* ---------- 畫面 ---------- */
let cTok=0,CS={mode:null,diff:null},G=null;
const DN={easy:'簡單',mid:'中等',hard:'高難度'};
SCREENS.chef5=function(){const tok=++cTok;const live=()=>tok===cTok&&S.screen==='chef5';const calm=RM();
 if(!CS.diff)CS.diff=DN[S.diff]?S.diff:'mid';if(!CS.mode)CS.mode='sand';
 screen.innerHTML=`<div class="dball ch5${calm?' calm':''}"><div class="phead"><button class="btn2 small" id="pback">回遊樂園</button><h2 class="gtitle">小小廚師</h2><span class="phsp"></span></div>
  <div class="ch5top"><div class="ch5guest" id="ch5guest"></div><div class="ch5talk"><p class="ch5bub" id="ch5bub"></p><div class="ch5card" id="ch5card"></div></div>
   <div class="ch5side"><div class="ch5dots" id="ch5dots"></div><button class="r26ib ch5ag" id="ch5ag" aria-label="再聽一次">${ICON.speaker('#2A2266')}</button></div></div>
  <div class="ch5board" id="ch5board"><svg id="ch5sv" viewBox="0 0 240 230" preserveAspectRatio="xMidYMax meet"></svg><div class="ch5nums" id="ch5nums"></div></div>
  <div class="ch5tray" id="ch5tray"></div>
  <div class="ch5menu" id="ch5menu"><div class="ch5mc">
   <div class="ch5mh"><span class="ch5mi">${art('i:chef5')}</span><div><b>小小廚師</b><small>只做不用刀、不用火的點心喔！</small></div></div>
   <div class="ch5lab">做什麼</div><div class="ch5row" id="ch5modes"><button class="ch5opt" data-v="sand"><span class="ch5oi">${icon('bread')}</span><b>三明治</b></button><button class="ch5opt" data-v="fruit"><span class="ch5oi">${icon('straw')}</span><b>水果串</b></button></div>
   <div class="ch5lab">難度</div><div class="ch5row" id="ch5diffs"><button class="ch5opt" data-v="easy"><b>簡單</b><small>看卡片，3 個</small></button><button class="ch5opt" data-v="mid"><b>中等</b><small>更多、接規律</small></button><button class="ch5opt" data-v="hard"><b>高難度</b><small>聽客人點餐</small></button></div>
   <button class="btn ch5go" id="ch5go">開始做！</button></div></div></div>`;
 const root=$('.ch5'),sv=$('#ch5sv'),tray=$('#ch5tray'),bub=$('#ch5bub'),board=$('#ch5board');
 let timers=[];const later=(f,ms)=>{const t=setTimeout(()=>{if(live())f()},ms);timers.push(t);return t};
 let cur=null;const tell=(t,parts)=>{bub.textContent=t;cur=parts||[t];return sayR(cur)};
 $('#pback').onclick=()=>{cTok++;hush();go('park')};
 $('#ch5ag').onclick=()=>{sfx('pop');hush();if(G&&G.o&&G.o.say&&G.phase==='make')sayR(G.o.say);else if(cur)sayR(cur)};
 const sel=()=>{$$('#ch5modes .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===CS.mode));$$('#ch5diffs .ch5opt').forEach(b=>b.classList.toggle('sel',b.dataset.v===CS.diff))};sel();
 $$('#ch5modes .ch5opt').forEach(b=>b.onclick=()=>{CS.mode=b.dataset.v;sel();sfx('pop');hush();sayR([T['m_'+CS.mode]])});
 $$('#ch5diffs .ch5opt').forEach(b=>b.onclick=()=>{CS.diff=b.dataset.v;sel();sfx('pop');hush();sayR([T['d_'+CS.diff]])});
 $('#ch5go').onclick=()=>{sfx('pop');hush();$('#ch5menu').style.display='none';start()};
 tell(T.c_menu,[T.c_menu,T.c_safe]);
 function start(){G={mode:CS.mode,diff:CS.diff,guests:GUESTS(),n:0,total:3,miss:0,phase:'make'};root.classList.add('playing');root.classList.toggle('fruit',G.mode==='fruit');nextGuest(true)}
 function dots(){$('#ch5dots').innerHTML=Array.from({length:G.total},(_,i)=>`<i class="${i<G.n?'on':''}"></i>`).join('')}
 function nextGuest(first){const gk=G.guests[G.n%G.guests.length];G.o=makeOrder(G.mode,G.diff);G.put=[];G.miss={};G.phase='make';dots();
  $('#ch5guest').innerHTML=guestSVG(gk);$('#ch5guest').className='ch5guest'+(calm?'':' in');drawCard();drawBoard();drawTray();$('#ch5nums').innerHTML='';
  const hint=G.o.say?T.c_listen:G.o.pattern?T.c_pattern:T.c_look;
  if(G.o.say){bub.textContent=hint;cur=[T.c_hello,hint];sayR([...(first?[T.c_hello]:[T.c_next]),hint]).then(()=>{if(live()&&G&&G.phase==='make')sayR(G.o.say)})}
  else tell(hint,[...(first?[T.c_hello]:[T.c_next]),hint])}
 function drawCard(){const o=G.o;$('#ch5card').innerHTML=o.seq.map((k,i)=>{const shown=o.show==='all'||(typeof o.show==='number'&&i<o.show);const done=i<G.put.length;
   return `<span class="ch5ci${done?' done':''}${shown?'':' q'}">${shown||done?icon(shown?k:G.put[i]):'<b>?</b>'}</span>`}).join(G.mode==='sand'?'':'<i class="ch5dash"></i>');
  $('#ch5card').classList.toggle('up',G.mode==='sand')}
 function drawBoard(){let h='';if(G.mode==='sand'){h+=`<ellipse cx="120" cy="214" rx="108" ry="12" fill="#fff" stroke="#BFD3E6" stroke-width="3"/>`;let y=204;
   G.put.forEach((k,i)=>{const [hh,g]=layer(k,0);y-=hh;h+=`<g class="ch5ly${i===G.put.length-1&&!calm?' drop':''}" data-i="${i}" transform="translate(20 ${y})">${g}</g>`;G.ly=G.ly||[];G.ly[i]=y+hh/2});
   if(G.phase==='make'){h+=`<rect x="20" y="${Math.max(6,y-30)}" width="200" height="24" rx="12" fill="none" stroke="#fff" stroke-dasharray="6 6" stroke-width="2.5" opacity=".7"/>`}}
  else{const n=G.o.seq.length,x0=24,x1=216,sp=(x1-x0)/(n+.6);h+=`<path d="M8 150 H232" stroke="#C88A50" stroke-width="6" stroke-linecap="round"/><path d="M226 145 L238 150 L226 155Z" fill="#C88A50"/>`;
   G.ly=[];for(let i=0;i<n;i++){const cx=x0+sp*(i+.8);G.ly[i]=cx;if(i<G.put.length)h+=`<g class="ch5fr${i===G.put.length-1&&!calm?' drop':''}" transform="translate(${cx-22} 128) scale(.69)">${icon(G.put[i]).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`;
    else h+=`<circle cx="${cx}" cy="150" r="17" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 5" opacity="${i===G.put.length&&G.phase==='make'?.9:.35}"/>`}}
  sv.innerHTML=h}
 function drawTray(){tray.innerHTML=G.o.tray.map(k=>`<button class="ch5it" data-k="${k}" aria-label="${NAME(k)}"><span>${icon(k)}</span><b>${NAME(k)}</b></button>`).join('');$$('.ch5it',tray).forEach(bindIt)}
 function bindIt(b){let st=null;const k=b.dataset.k;
  b.addEventListener('pointerdown',e=>{if(!G||G.phase!=='make')return;e.preventDefault();st={x:e.clientX,y:e.clientY,id:e.pointerId,el:null};try{b.setPointerCapture(e.pointerId)}catch(_){}});
  b.addEventListener('pointermove',e=>{if(!st||e.pointerId!==st.id)return;if(!st.el&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>10){st.el=document.createElement('div');st.el.className='ch5drag';st.el.innerHTML=icon(k);document.body.appendChild(st.el)}
   if(st.el){st.el.style.left=e.clientX+'px';st.el.style.top=e.clientY+'px'}});
  const up=e=>{if(!st||e.pointerId!==st.id)return;const s=st;st=null;if(!s.el){if(e.type==='pointerup')place(k,b);return}s.el.remove();if(e.type!=='pointerup')return;
   const r=board.getBoundingClientRect();if(e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top-20&&e.clientY<r.bottom)place(k,b);else{sfx('hint')}};
  b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up)}
 function place(k,b){if(!G||G.phase!=='make')return;hush();const i=G.put.length,want=G.o.seq[i];
  if(k===want){G.put.push(k);sfx('pop');$$('.ch5it',tray).forEach(x=>x.classList.remove('glow'));drawBoard();drawCard();
   const en=ING[k].en;if(G.put.length===G.o.seq.length){G.phase='count';later(askCount,calm?500:800);tell(G.mode==='sand'?T.c_done_s:T.c_done_f);return}
   sayR([NAME(k),...(en?[{en,slow:1}]:[])]);bub.textContent=T[['c_ok1','c_ok2','c_ok3'][i%3]];return}
  G.miss[i]=(G.miss[i]||0)+1;sfx('hint');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');
  if(G.miss[i]>=2){const w=$(`.ch5it[data-k="${want}"]`,tray);if(w)w.classList.add('glow');tell(T['h_'+want])}else tell(T.c_oops)}
 // 數一數：簡單 2 選 1、其他 3 選 1；答錯不扣，再數一次
 function askCount(){const n=G.o.seq.length;let opts=G.diff==='easy'?[n,n+(Math.random()<.5?1:-1)]:[n-1,n,n+1];opts=shuffle(opts.filter(x=>x>0));
  const q=G.mode==='sand'?T.c_count_s:T.c_count_f;tell(q);
  $('#ch5nums').innerHTML=`<p>${q}</p><div>${opts.map(v=>`<button class="ch5num" data-v="${v}">${v}</button>`).join('')}</div>`;
  $$('.ch5num').forEach(b=>b.onclick=()=>{if(G.phase!=='count')return;hush();const v=+b.dataset.v;
   if(v===n){G.phase='eat';b.classList.add('ok');sfx('right');countAlong(n)}else{sfx('hint');b.classList.add('dim');tell(T.c_try,[T.c_try,T.count]);countAlong(n,true)}})}
 function countAlong(n,again){const marks=G.ly.slice(0,n);let i=0;const nums=[];
  const step=()=>{if(i>=n){if(!again)later(eat,500);return}const m=marks[i];i++;nums.push(i);
   sv.insertAdjacentHTML('beforeend',G.mode==='sand'?`<g class="ch5n"><circle cx="230" cy="${m}" r="9" fill="#7A5CE0"/><text x="230" y="${m+4}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${i}</text></g>`:`<g class="ch5n"><circle cx="${m}" cy="186" r="10" fill="#7A5CE0"/><text x="${m}" y="${190}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${i}</text></g>`);
   sayR([String(i)]);later(step,calm?550:700)};
  $$('.ch5n',sv).forEach(x=>x.remove());if(!again)sayR([T.yes]);later(step,again?900:600)}
 function eat(){$('#ch5nums').innerHTML='';$('#ch5guest').className='ch5guest'+(calm?'':' happy');tell(T.c_yum);sfx('gem');G.n++;dots();
  later(()=>{if(G.n>=G.total)finish();else nextGuest(false)},calm?1600:2400)}
 function finish(){G.phase='end';const n=gems('chef5Day');try{confetti()}catch(e){}
  const ov=overlay(screen,`<div class="card ch5end"><div class="ch5endpic">${art('i:chef5')}</div><h2>三位客人都吃飽了！</h2><p>你是很棒的小廚師！<br>得到 ${n} 顆寶石！</p><div class="row"><button class="btn" id="ch5again">再做一次</button><button class="btn2" id="ch5back">回遊樂園</button></div></div>`);
  ov.classList.add('ch5ov');tell(T.c_end,[T.c_end,n===3?T.gem3:T.gem1]);
  $('#ch5again',ov).onclick=()=>{sfx('pop');hush();ov.remove();root.classList.remove('playing');$('#ch5menu').style.display='';G=null;tell(T.c_menu)};
  $('#ch5back',ov).onclick=()=>{sfx('pop');hush();ov.remove();cTok++;go('park')}}
 Object.assign(window.__CH5,{state:()=>G&&{mode:G.mode,diff:G.diff,phase:G.phase,n:G.n,seq:G.o&&G.o.seq.slice(),put:G.put&&G.put.slice(),tray:G.o&&G.o.tray.slice(),miss:G.miss,say:G.o&&G.o.say},place:(k)=>{const b=$(`.ch5it[data-k="${k}"]`,tray);if(b)place(k,b);return !!b}});
};
/* ---------- 樣式 ---------- */
const css=document.createElement('style');css.id='ch5css';css.textContent=`
.ch5{display:flex;flex-direction:column;height:100%;box-sizing:border-box}
.ch5 .ch5top{display:flex;align-items:center;gap:8px;padding:4px 10px;max-width:980px;margin:0 auto;width:100%;box-sizing:border-box}
.ch5 .ch5guest{flex:0 0 auto;width:min(22vw,110px);aspect-ratio:1}.ch5 .ch5guest svg{width:100%;height:100%}
.ch5 .ch5guest.in{animation:ch5in .6s}.ch5 .ch5guest.happy{animation:ch5hop .5s 3}@keyframes ch5in{0%{transform:translateX(-60px);opacity:0}}@keyframes ch5hop{50%{transform:translateY(-12px)}}
.ch5 .ch5talk{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}
.ch5 .ch5bub{margin:0;background:#fff;color:#3A2A55;border-radius:16px;padding:7px 12px;font-size:17px;line-height:1.35;min-height:1.4em;box-shadow:0 3px 0 rgba(0,0,0,.15)}
.ch5 .ch5card{display:flex;align-items:center;gap:3px;background:#FFF8EC;border:3px dashed #E8C27A;border-radius:14px;padding:5px 8px;min-height:44px;flex-wrap:wrap}
.ch5 .ch5card.up{flex-direction:column-reverse;align-items:center;flex-wrap:nowrap;width:max-content;max-width:100%}
.ch5 .ch5ci{width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px}.ch5 .ch5ci svg{width:100%;height:100%}
.ch5 .ch5card.up .ch5ci{width:34px;height:30px}
.ch5 .ch5ci.q{background:#EEE6F8;color:#7A5CE0;font:700 20px var(--latin,sans-serif)}.ch5 .ch5ci.done{opacity:.35}
.ch5 .ch5dash{width:6px;height:3px;background:#C88A50;border-radius:2px}
.ch5 .ch5side{display:flex;flex-direction:column;align-items:center;gap:6px}.ch5 .ch5dots{display:flex;gap:4px}.ch5 .ch5dots i{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.35)}.ch5 .ch5dots i.on{background:#FFD24D}
.ch5 .ch5ag{width:48px;height:48px}
.ch5 .ch5board{position:relative;flex:1;min-height:150px;max-width:620px;width:100%;margin:0 auto}.ch5 .ch5board svg{width:100%;height:100%;display:block}
.ch5 .ch5ly.drop,.ch5 .ch5fr.drop{animation:ch5drop .35s}@keyframes ch5drop{0%{transform-box:fill-box;opacity:0}}
.ch5 .ch5nums{position:absolute;left:0;right:0;top:4px;text-align:center}.ch5 .ch5nums p{margin:0 auto 6px;display:inline-block;background:rgba(255,255,255,.92);color:#3A2A55;border-radius:12px;padding:4px 12px;font-size:17px}
.ch5 .ch5nums>div{display:flex;justify-content:center;gap:12px}
.ch5 .ch5num{width:64px;height:64px;border-radius:50%;border:0;background:#FFF;color:#5A3AB0;font:800 30px var(--latin,sans-serif);box-shadow:0 4px 0 #C9B8F0}.ch5 .ch5num.ok{background:#FFD24D}.ch5 .ch5num.dim{opacity:.4}
.ch5 .ch5tray{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;padding:8px 10px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.14)}
.ch5 .ch5it{width:76px;min-height:84px;border:0;border-radius:16px;background:#FFF8EC;display:flex;flex-direction:column;align-items:center;padding:4px;touch-action:none;box-shadow:0 4px 0 rgba(0,0,0,.2);color:#3A2A55}
.ch5 .ch5it span{width:52px;height:52px}.ch5 .ch5it svg{width:100%;height:100%}.ch5 .ch5it b{font-size:15px}
.ch5 .ch5it.glow{box-shadow:0 0 0 5px #FFE27A,0 0 22px #FFD24D;animation:ch5gl 1s infinite alternate}@keyframes ch5gl{to{transform:scale(1.06)}}
.ch5 .ch5it.shake{animation:shake .4s}
.ch5drag{position:fixed;z-index:60;width:60px;height:60px;transform:translate(-50%,-50%);pointer-events:none}.ch5drag svg{width:100%;height:100%}
.ch5 .ch5menu{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,16,60,.55);z-index:5;padding:12px;box-sizing:border-box}
.ch5 .ch5mc{background:#fff;color:#3A2A55;border-radius:22px;padding:14px 16px;max-width:520px;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}
.ch5 .ch5mh{display:flex;gap:10px;align-items:center}.ch5 .ch5mi{width:64px;height:64px}.ch5 .ch5mi svg{width:100%;height:100%}.ch5 .ch5mh b{font-size:22px;display:block}.ch5 .ch5mh small{font-size:15px}
.ch5 .ch5lab{margin:10px 0 4px;font-weight:700}.ch5 .ch5row{display:flex;gap:8px}
.ch5 .ch5opt{flex:1;min-height:60px;border:3px solid #EEE6F8;border-radius:16px;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;color:#3A2A55}
.ch5 .ch5opt.sel{border-color:#7A5CE0;background:#F0EAFF}.ch5 .ch5oi{width:40px;height:40px}.ch5 .ch5oi svg{width:100%;height:100%}.ch5 .ch5opt small{font-size:12.5px}
.ch5 .ch5go{display:block;margin:12px auto 0;min-width:10em;min-height:56px}
.ch5.calm *{animation:none!important}
.ch5ov .card{max-width:min(520px,calc(100vw - 24px));box-sizing:border-box}.ch5ov .ch5endpic{width:110px;height:110px;margin:0 auto}.ch5ov .ch5endpic svg{width:100%;height:100%}
@media (min-width:900px) and (min-height:700px){.ch5 .ch5guest{width:150px}.ch5 .ch5bub{font-size:21px}.ch5 .ch5ci{width:56px;height:56px}.ch5 .ch5card.up .ch5ci{width:52px;height:40px}
 .ch5 .ch5it{width:104px;min-height:116px}.ch5 .ch5it span{width:76px;height:76px}.ch5 .ch5it b{font-size:18px}.ch5 .ch5board{max-width:780px}.ch5 .ch5num{width:80px;height:80px;font-size:38px}.ch5 .ch5ag{width:60px;height:60px}}
@media (orientation:portrait) and (max-height:740px){.ch5 .ch5card.up .ch5ci{width:30px;height:21px}.ch5 .ch5card{padding:3px 6px}.ch5 .ch5bub{font-size:15px;padding:4px 10px}.ch5 .ch5guest{width:70px}.ch5 .ch5board{min-height:110px}
 .ch5 .ch5it{width:64px;min-height:70px}.ch5 .ch5it span{width:40px;height:40px}.ch5 .ch5it b{font-size:13px}.ch5 .ch5tray{gap:5px;padding-top:5px}}
@media (orientation:portrait) and (max-width:380px){.ch5 .ch5tray{flex-wrap:nowrap;padding-left:4px;padding-right:4px;gap:4px}.ch5 .ch5it{flex:1 1 0;width:auto;max-width:64px;min-width:44px;min-height:64px;padding:3px 1px}.ch5 .ch5it span{width:34px;height:34px}.ch5 .ch5it b{font-size:12.5px}}
@media (orientation:landscape) and (max-height:560px){.ch5{display:grid;grid-template-columns:minmax(0,1fr) 176px;grid-template-rows:auto auto minmax(0,1fr)}.ch5>.phead{grid-column:1/3}
 .ch5 .ch5top{grid-column:1;grid-row:2;padding:2px 8px}.ch5 .ch5board{grid-column:1;grid-row:3;min-height:110px}.ch5 .ch5tray{grid-column:2;grid-row:2/4;align-content:center;padding:6px;border-radius:16px 0 0 16px}
 .ch5 .ch5guest{width:64px}.ch5 .ch5it{min-height:66px;width:76px}.ch5 .ch5it span{width:40px;height:40px}.ch5 .ch5it b{font-size:13px}.ch5 .ch5bub{font-size:15px;padding:4px 10px}.ch5 .ch5card.up{flex-direction:row-reverse}.ch5 .ch5ci{width:32px;height:32px}
 .ch5 .ch5num{width:54px;height:54px;font-size:26px}}
`;document.head.appendChild(css);
}catch(e){console.log('chef5',e)}})();


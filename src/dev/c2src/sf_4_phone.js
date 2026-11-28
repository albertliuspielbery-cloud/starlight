/* ---------- 打電話演練 phone8:119／110（原創手機畫面，練習用，不會真的撥出去） ---------- */
Object.assign(LN,{
 p_note:'練習用，不會真的撥出去',p_note_say:'這是練習用的電話，不會真的撥出去喔！',
 p_in_119:'來練習打一一九！先按一、一、九，再按綠色的電話。',p_in_110:'來練習打一一零！先按一、一、零，再按綠色的電話。',
 p_wk_119:'要按一、一、九喔！我們再按一次。',p_wk_110:'要按一、一、零喔！我們再按一次。',p_glow:'我幫你，看發光的按鍵！',
 p_dial:'按好了！按綠色的電話，撥出去。',p_ring:'嘟……嘟……接通了！',
 p_119_q1:'這裡是一一九，請問在哪裡？',p_110_q1:'這裡是一一零，請問在哪裡？',p_q2:'發生什麼事？',p_q3:'請問你是誰？',
 p_119_end:'好，我們馬上到！',p_110_end:'好，警察馬上到！',
 p_119_a1:'在我家',p_119_a2:'失火了！',p_119_a3:'我是小朋友',p_110_a1:'在公園',p_110_a2:'有人一直跟著我',p_110_a3:'我是小朋友',
 p_w1:'對方問「在哪裡」，要先說在哪裡喔！',p_w2:'對方問「發生什麼事」，要說發生什麼事喔！',p_w3:'對方問「你是誰」，要說出自己是誰喔！',
 p_hang:'等對方說「好」，才可以掛電話喔！',p_hangnow:'對方說好了，現在可以掛電話了！',
 p_end_119:'說得好！一一九不可以亂打，真的有火災、有人受傷才打。',p_end_110:'說得好！一一零不可以亂打，真的需要警察幫忙才打。',
 p_tip:'要說三件事：在哪裡、什麼事、我是誰。',p_real:'真的打電話，要說你的名字；地址請爸媽教你。'});
const PIC8={119:['<svg viewBox="0 0 40 40"><path d="M6 20 L20 7 L34 20 V34 H6Z" fill="#FFB0C8"/><path d="M3 21 L20 5 L37 21" fill="none" stroke="#E86A8A" stroke-width="4" stroke-linecap="round"/><rect x="16" y="23" width="9" height="11" rx="2" fill="#C88A5A"/></svg>','<svg viewBox="0 0 40 40"><path d="M20 36 Q8 34 10 22 Q12 14 18 8 Q18 16 24 18 Q24 10 28 6 Q34 16 30 28 Q28 36 20 36Z" fill="#FF9A3C"/><path d="M20 34 Q14 32 16 26 Q18 22 20 20 Q22 26 25 26 Q26 32 20 34Z" fill="#FFE27A"/></svg>','KID'],110:['<svg viewBox="0 0 40 40"><rect x="17" y="22" width="6" height="14" rx="2" fill="#B8865A"/><circle cx="20" cy="16" r="12" fill="#6FCF7A"/><circle cx="12" cy="20" r="7" fill="#5ABB6A"/><circle cx="28" cy="20" r="7" fill="#5ABB6A"/></svg>','<svg viewBox="0 0 40 40"><ellipse cx="13" cy="26" rx="5" ry="8" fill="#9A8AF0"/><ellipse cx="27" cy="14" rx="5" ry="8" fill="#9A8AF0"/><circle cx="9" cy="16" r="2" fill="#9A8AF0"/><circle cx="13" cy="15" r="2" fill="#9A8AF0"/><circle cx="23" cy="4.5" r="2" fill="#9A8AF0"/><circle cx="27" cy="4" r="2" fill="#9A8AF0"/></svg>','KID']};
const kidIc=()=>{const K=kit();return `<svg viewBox="-24 -100 48 48">${K.out()}${person(K,0,-30,{s:.9,pose:'wave',shirt:'#FFB0D0'})}</svg>`};
const ICALL=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M12 8 q-4 2 -4 8 q2 10 12 16 q6 2 8 -2 l2 -4 q0 -2 -2 -3 l-5 -2 q-2 0 -3 2 l-1 1 q-5 -3 -7 -7 l1 -1 q2 -1 2 -3 l-2 -5 q-1 -2 -3 -2Z" fill="#fff"/></svg>`;
const IHANG=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 22 q14 -10 28 0 l-2 5 q-1 1 -3 1 l-4 -2 q-1 -1 -1 -3 v-2 q-4 -1 -8 0 v2 q0 2 -1 3 l-4 2 q-2 0 -3 -1Z" fill="#fff"/></svg>`;
function opSVG(){const K=kit();return `<svg class="p8opsvg" viewBox="-34 -160 68 68" aria-hidden="true">${K.out()}${C(0,-126,33,'#FFFFFF')}${C(0,-126,33,'#BFE9FF','opacity=".5"')}${person(K,0,-40,{adult:true,s:.62,pose:'hold',girl:true,shirt:'#7FC8F8',ear:true,hair:'#6B4A3A'})}</svg>`}
BUILD.phone8=function(play,sp,arg){
 const num=arg==='110'?'110':'119';const dig=num.split('');S.ans=null;S.revKey=null;
 let phase='dial',typed='',kMiss=0,step=0,cMiss=0,fast=false,alive=true,readTk=0;
 setPrompt(`<span class="qtag" style="--tagc:#FF8A8A">打電話演練</span>${esc(L('p_in_'+num))}`,LOG([L('p_in_'+num),L('p_note_say')]),sp);
 const keys=['1','2','3','4','5','6','7','8','9','del','0','call'];
 play.innerHTML=`<div class="p8wrap"><div class="p8phone"><div class="p8scr"><div class="p8note">${L('p_note')}</div><div class="p8num" aria-live="polite"></div><div class="p8st">要按 <b>${dig.join(' ')}</b></div></div>
  <div class="p8pad">${keys.map(k=>k==='call'?`<button class="p8k p8call" data-k="call" aria-label="撥出">${ICALL}</button>`:k==='del'?`<button class="p8k p8del" data-k="del" aria-label="清除">⌫</button>`:`<button class="p8k" data-k="${k}">${k}</button>`).join('')}</div></div>
  <div class="p8talk" hidden><div class="p8op"><span class="p8opi">${opSVG()}</span><div class="p8ob"></div></div><div class="p8cards"></div><div class="p8me"></div><button class="p8hang" aria-label="掛斷">${IHANG}<span>掛斷</span></button></div></div>`;
 const live=()=>{if(!play.isConnected||S.screen!=='stage')alive=false;return alive};  // 離開關卡後不再念
 const $p=s=>play.querySelector(s),wrap=$p('.p8wrap'),nm=$p('.p8num'),stx=$p('.p8st'),talk=$p('.p8talk'),ob=$p('.p8ob'),cards=$p('.p8cards'),me=$p('.p8me'),hang=$p('.p8hang'),callB=$p('.p8call');
 const show=()=>{nm.textContent=typed;callB.classList.toggle('ready',typed===num)};
 const keyEl=k=>play.querySelector(`.p8k[data-k="${k}"]`);
 const nextKey=()=>typed===num?'call':dig[typed.length]||dig[0];
 const Q=[{q:L('p_'+num+'_q1'),a:1,w:'p_w1'},{q:L('p_q2'),a:2,w:'p_w2'},{q:L('p_q3'),a:3,w:'p_w3'}];
 const A=[1,2,3].map(i=>L('p_'+num+'_a'+i));
 let order=shuffle([1,2,3]);
 S.hint=m=>{if(!live())return;if(phase==='dial'){if(kMiss<=1)PS2(L('p_wk_'+num));else{PS2(L('p_glow'));glow(keyEl(nextKey()))}}
  else if(phase==='talk'){const q=Q[step];if(!q)return;if(cMiss<=1)PS2(L(q.w));else{PS2(L('p_tip'));glow(cards.querySelector(`[data-a="${q.a}"]`))}}
  else if(phase==='hang')glow(hang)};
 const press=k=>{if(phase!=='dial'||S.lock||!alive)return;const b=keyEl(k);popSfx();try{tone(520+(+k||0)*40,0,.12,'sine',.08)}catch(e){}
  if(k==='del'){typed='';show();return}
  if(k==='call'){if(typed===num){connect();return}kMiss++;typed='';show();wrong(b);return}
  if(typed.length>=num.length){kMiss++;typed='';show();wrong(b);return}
  if(k!==dig[typed.length]){kMiss++;typed='';show();wrong(b);return}
  typed+=k;show();if(typed===num){stx.textContent='';SAY([L('p_dial')]);try{callB.classList.add('ready')}catch(e){}}};
 play.querySelectorAll('.p8k').forEach(b=>b.onclick=()=>press(b.dataset.k));
 const ask=async()=>{if(!live())return;const q=Q[step];cMiss=0;ob.textContent=q.q;ob.classList.remove('in');void ob.offsetWidth;ob.classList.add('in');
  order=shuffle([1,2,3]);cards.innerHTML=order.map(i=>{const ic=PIC8[num][i-1];return `<button class="p8c" data-a="${i}"><span class="p8ci">${ic==='KID'?kidIc():ic}</span><span>${esc(A[i-1])}</span></button>`}).join('');
  cards.querySelectorAll('.p8c').forEach(c=>c.onclick=()=>pick(c));const tk=++readTk;await SAY([q.q]);await readOpts([...cards.querySelectorAll('.p8c')],c=>A[+c.dataset.a-1],()=>tk===readTk&&phase==='talk')};
 const pick=async c=>{if(phase!=='talk'||S.lock||!alive||c.disabled)return;const q=Q[step];readTk++;try{hush()}catch(e){}cards.querySelectorAll('.p8c').forEach(x=>x.classList.remove('reading'));
  if(+c.dataset.a!==q.a){cMiss++;wrong(c);return}
  okSfx();c.classList.add('ok22');cards.querySelectorAll('.p8c').forEach(x=>x.disabled=true);
  me.innerHTML+=`<span class="p8said">${esc(A[q.a-1])}</span>`;await Promise.race([SAY([A[q.a-1]]),wait(fast?40:1600)]);if(!live())return;
  step++;if(step<Q.length){ask();return}
  phase='hang';cards.innerHTML='';const e=L('p_'+num+'_end');ob.textContent=e;ob.classList.remove('in');void ob.offsetWidth;ob.classList.add('in');
  await Promise.race([SAY([e]),wait(fast?40:2600)]);if(!live())return;hang.classList.add('ready');stx.textContent='';if(live())SAY([L('p_hangnow')])};
 hang.onclick=async()=>{if(S.lock||!alive)return;if(phase!=='hang'){bump(hang);PS2(L('p_hang'));return}
  phase='end';popSfx();try{tone(330,0,.18,'sine',.08)}catch(e){}hang.classList.remove('ready');talk.classList.add('ended');ob.textContent='';
  right(hang,[praise(),L('p_real'),L('p_end_'+num)],1600)};
 const connect=async()=>{phase='ring';callB.classList.remove('ready');stx.textContent='';nm.textContent=num;wrap.classList.add('calling');
  play.querySelector('.p8pad').hidden=true;talk.hidden=false;ob.textContent=L('p_ring');
  try{if(S.sound){tone(440,0,.5,'sine',.06);tone(440,.9,.5,'sine',.06)}}catch(e){}
  await wait(fast?60:1700);if(!live())return;phase='talk';curFit&&curFit();ask()};
 S.__auto=async()=>{fast=true;for(let i=0;i<20&&phase==='dial'&&!S.lock;i++){press(nextKey());await wait(30)}
  for(let i=0;i<200&&phase!=='hang'&&alive;i++){if(phase==='talk'){const c=cards.querySelector(`.p8c[data-a="${(Q[step]||{}).a}"]:not([disabled])`);if(c)pick(c)}await wait(60)}
  for(let i=0;i<100&&!hang.classList.contains('ready')&&alive;i++)await wait(60);hang.click()};
 show();
 curFit=()=>{if(!play.isConnected){alive=false;return}const A0=avail(play);wrap.classList.toggle('land',!!A0.land)};refit();
};

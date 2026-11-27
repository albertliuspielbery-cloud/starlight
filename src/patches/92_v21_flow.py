# 2.1（遊戲 5.5.0）破關節奏與小修正（2026-11-27 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）
# 依 qa/uxaudit（三份檢查＋交叉審查）第一批。配合 mods/m9za_v21.js。這裡只改包不到的地方：
#  1. 過關卡：只念一句（原本三句，全對時被 7 秒截斷、點了也跳不過）；念完就出獎勵；1.7 秒後點畫面任何地方（click）也出獎勵。
#     獎勵畫出來後 0.4 秒內不收點擊（點一下不會連帶選走禮物）。有加句（皇冠、小任務、亂猜）時最多等 7 秒，讓那句念完。
#     寶石名稱、三顆星改成只用畫面表示。「拿到皇冠了」等加句（m46）照舊接在前面。
#  2. 題數：中等難度不再多加 1 題、困難從多 2 題改成多 1 題；補的英文／注音只在還有沒學會的字時才出。
#  4. 答對後：0.7 秒（＋講解延長的時間）就出現下一題箭頭（原本 1.6 秒才出一行字）。外觀在 m9za。
#  5. 描字第一步（描一描）：這個字以前描過第一步，或這一章已經示範完一次，就不自動示範；旁邊「再看一次」照舊。
#  7. 星星小考：不在進遊樂園時擋在門口，改成從遊樂園裡的小遊戲、故事屋等回來時才出（家長說明文字跟著改）。
#     家長「每天先複習 5 關」開著時：「遊樂園開門囉」只在從外面進遊樂園時念，不再等小考。
#  9. 寫字板：上一根手指沒收到「離開」（手掌、系統手勢打斷）時不再卡住：還沒畫出線的（像手掌壓著，線長不到 3 格）0.4 秒沒動就讓出，
#     已經在畫的一筆 1.5 秒沒動才讓出；舊手指還沒畫線時，另一根手指先移動超過 2 格就改用它；收不到放開就清掉。
#  10. 公主「轉一下」動畫（獎勵卡、換裝間、說明頁）：拿掉放大縮小，只左右輕晃。
def rep(old,new,n=1):
    global s
    assert s.count(old)==n,('patch92 找不到或次數不對',old[:70],s.count(old))
    s=s.replace(old,new)
# 1. 過關卡
rep("const ldSay=say([pick(['過關了！好厲害！','太棒了，這一關完成了！','過關囉！']),`拿到一顆${LG.name}！`,perfect?'全部答對，拿到三顆星！':'']);",
    "const ldSay=say([pick(['過關了！好厲害！','太棒了，這一關完成了！','過關囉！'])]);")
rep(" Promise.all([Promise.race([ldSay,wait(7000)]),wait(reduced?200:1700)]).then(()=>{if(card.isConnected)REWARD[L.reward==='chapter'?'chapter':pickReward()](card,finish)});",
    " let ldGo=null;const ldTap=new Promise(r=>ldGo=r);"
    "setTimeout(()=>{if(!ov.isConnected)return;try{const nx=document.createElement('div');nx.className='ld21nx';nx.setAttribute('aria-hidden','true');const cd=$('.card',ov);cd.classList.add('ld21card');cd.appendChild(nx)}catch(e){}ov.addEventListener('click',()=>ldGo(),{once:true})},reduced?200:1700);"
    "\n Promise.all([Promise.race([ldSay,wait(7000),ldTap]),wait(reduced?200:1700)]).then(()=>{try{ov.querySelectorAll('.ld21nx').forEach(x=>x.remove())}catch(e){}if(card.isConnected){card.style.pointerEvents='none';setTimeout(()=>{card.style.pointerEvents=''},400)}if(card.isConnected)REWARD[L.reward==='chapter'?'chapter':pickReward()](card,finish)});")
# 2. 題數
rep(" const n=S.diff==='mid'?1:S.diff==='hard'?2:0;const mix=((CHAPTERS[S.ch]",
    " const n=S.diff==='hard'?1:0;const mix=((CHAPTERS[S.ch]")
rep(" const t=covRate(letterPool())<=covRate(zyPool().split(''))?'letter':'zhuyin';S.qs.push(t);S.qs.__ext27=1};",
    " const cl=covRate(letterPool()),cz=covRate(zyPool().split(''));if(Math.min(cl,cz)>=1)return;const t=cl<=cz?'letter':'zhuyin';S.qs.push(t);S.qs.__ext27=1};")
# 4. 答對後的下一題箭頭
rep("const nh=setTimeout(()=>{if(S.screen!=='stage')return;const h=document.createElement('div');h.className='nexthint';h.textContent='點一下，下一題 ▶';document.body.appendChild(h)},1600);",
    "const nh=setTimeout(()=>{if(S.screen!=='stage')return;const h=document.createElement('div');h.className='nexthint';h.textContent='點一下，下一題 ▶';document.body.appendChild(h)},700+(+extra||0));")
# 5. 描字示範
rep(" if(q.stage===0)demo(live(()=>{begin();sayL('W02')}));",
    " if(q.stage===0){const SEEN=window.__wr21seen||(window.__wr21seen=new Set());const sk=S.ch+'|'+q.c;let seen=SEEN.has(sk);try{const r0=W()[q.c];if(r0&&r0.st&&r0.st[1])seen=true}catch(e){}"
    "if(seen){begin();sayL('W02')}else demo(live(()=>{SEEN.add(sk);begin();sayL('W02')}))}")
# 7. 星星小考
rep("function onPark(fromGame){try{if(S.screen!=='park')return;const r=D();",
    "function onPark(fromGame,prev){try{if(S.screen!=='park')return;const r=D();const back21=fromGame||(!!prev&&prev!=='park'&&!['title','world','map','chapters','chend','story','story19','guide','finale','wardrobe','rest','limit','stage'].includes(prev));")
rep("  if(!r.d.shown&&V2.gateTour){setTimeout(()=>{if(S.screen==='park'&&!busy()&&!D().d.shown)openDaily('auto')},700);return}",
    "  if(!r.d.shown&&V2.gateTour){if(back21)setTimeout(()=>{if(S.screen==='park'&&!busy()&&!D().d.shown)openDaily('auto')},700);return}")
rep("  try{if(name==='park')onPark(isGame(prev)&&prev!=='park')}catch(e){console.log('rv181 show',e)}return r}}",
    "  try{if(name==='park')onPark(isGame(prev)&&prev!=='park',prev)}catch(e){console.log('rv181 show',e)}return r}}")
# 9. 寫字板
rep("function bindPointer(){const b=Q.svg;let act=null,U=[],inkPl=null;",
    "function bindPointer(){const b=Q.svg;let act=null,U=[],inkPl=null,actT=0,alt=null,len21=0;\n const drop21=()=>{try{b.releasePointerCapture(act)}catch(_){}act=null;try{if(inkPl)inkPl.remove()}catch(_){}};")
rep(" b.addEventListener('pointerdown',e=>{if(!isW()||Q.phase!=='write'||S.lock||act!==null)return;e.preventDefault();act=e.pointerId;",
    " b.addEventListener('pointerdown',e=>{if(act!==null){const idle=performance.now()-actT,drawing=len21>3;if((!drawing&&idle>400)||(drawing&&idle>1500))drop21();"
    "else if(!drawing&&isW()&&Q.phase==='write'&&!S.lock){alt={id:e.pointerId,s:toU(e)};try{b.setPointerCapture(e.pointerId)}catch(_){}return}}"
    "if(!isW()||Q.phase!=='write'||S.lock||act!==null)return;e.preventDefault();act=e.pointerId;actT=performance.now();")
rep(" b.addEventListener('pointermove',e=>{if(e.pointerId!==act)return;e.preventDefault();",
    " b.addEventListener('pointermove',e=>{if(alt&&e.pointerId===alt.id){e.preventDefault();const p=toU(e);if(act!==null&&len21<=3&&dist(p,alt.s)>2){drop21();act=alt.id;U=[alt.s,p];len21=dist(alt.s,p);alt=null;actT=performance.now();"
    "inkPl=el('polyline',{points:pts(U),fill:'none',stroke:'var(--ink)','stroke-width':IW(),'stroke-linecap':'round','stroke-linejoin':'round'},G.ink)}return}"
    "if(e.pointerId!==act)return;e.preventDefault();actT=performance.now();")
rep(" const up=e=>{if(e.pointerId!==act)return;act=null;",
    " b.addEventListener('lostpointercapture',e=>{if(alt&&e.pointerId===alt.id){alt=null;return}if(e.pointerId===act){act=null;try{if(inkPl)inkPl.remove()}catch(_){}}});\n const up=e=>{if(alt&&e.pointerId===alt.id){alt=null;return}if(e.pointerId!==act)return;act=null;")
# 10. 公主轉一下：不放大縮小
rep("@keyframes spin{40%{transform:scale(1.06) rotate(-4deg)}70%{transform:scale(.98) rotate(3deg)}}",
    "@keyframes spin{40%{transform:rotate(-4deg)}70%{transform:rotate(3deg)}}")
rep("U=[toU(e)];inkPl=el('polyline'","U=[toU(e)];len21=0;inkPl=el('polyline'")
rep("for(const x of (ev.length?ev:[e])){const p=toU(x);if(dist(p,U[U.length-1])>=.6)U.push(p)}",
    "for(const x of (ev.length?ev:[e])){const p=toU(x);const dd=dist(p,U[U.length-1]);if(dd>=.6){U.push(p);len21+=dd}}")
# 7b. 家長「每天先複習 5 關」開著時：遊樂園開門那句（小考不在門口跳了，不用等它），只在從外面進遊樂園時念
rep("go=function(name){try{if(name==='park'&&blocked(S.screen)){gate();return}if(name==='park')justOpened=true}",
    "go=function(name){try{if(name==='park'&&blocked(S.screen)){gate();return}if(name==='park'&&fromOutside(S.screen))justOpened=true}")
rep("if(ON.park()&&o.ok&&o.done.length&&!o.said&&!quizWillPop()){",
    "if(ON.park()&&o.ok&&o.done.length&&!o.said){")
rep("每天第一次進遊樂園先答 3 題，答完得到","每天在遊樂園玩完第一個遊戲回來，先答 3 題，答完得到")
# 11. 「關於」的這一版新增（App 版看得到的那一段；原本還停在 1.8 的內容）
rep("這一版新增：第五季「星光小管家」第三十一～三十五章、遊樂園大門四區、存錢小豬咚咚、小小廚師、特別衣服的小特效、房間窗外風景、房間和寵物互動、家長專區新分類、文字備份。'",
    "這一版新增：破關更順，過關點一下就拿禮物、開場說完自動開始、答對後有大箭頭；中等和困難每一關少一題；描過的字不用每次重看示範；遊樂園裡不會再跳出闖關地圖鍵；星星小考改成玩完一個遊戲回來才出現；寫字板手掌碰到也不會卡住。'")
# 12. 家長設定「每關多一題字母／注音」說明：全部學會就不加
rep("沒有字母或注音題的關卡，會自動加一題，字母和注音會輪流出，每一個都會練到。",
    "沒有字母或注音題的關卡，還有沒學會的字時會加一題，字母和注音輪流出；全部學會了就不加。")

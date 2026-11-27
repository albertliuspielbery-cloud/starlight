/* ================= 2.2 遊樂園大禮物：核心流程（m9zd_g22core.js）—— 2026-11-27 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 家長已同意的設計與樣張：qa/v22/gift/mock_gift_*.png（大禮物卡）、mock_map_*.png（章節地圖禮物牌）、gift_items.js（物品圖畫法）。
 * 共用約定照 mods/m9zb_g22data.js（G22.ITEMS／SPARE／GAMENAME、V2.g22={own,got,fresh}、G22.has／forLevel／forChapter），這裡不另訂存檔欄位。
 * 1. 第 41 章起，第 3、6、9 關「第一次過關」：過關卡（patch92 的 1.7 秒點一下）之後，不抽隨機獎勵，改開「遊樂園大禮物」。
 *    接法：pickReward() 在這種時候回傳 'g22'，REWARD.g22(card,finish) 畫禮物卡；收尾照原本的 finish（進度 +1、寶石飛、存檔）。
 *    送哪一樣：G22.forLevel(章,關)；那個遊戲還沒開放（章節還沒完成、App 那一段沒打開、各遊戲自己的 gate 不是 ''）或已經有了，
 *    改送 G22.SPARE 第一個還沒有的（都有了就照舊抽隨機獎勵）。重玩、練習模式（S.pmode）、第 10 關照舊。
 *    打開禮物時記錄：V2.g22.own[id]=時間、got['章-關']=id、fresh[id]=1（G22.give）。
 *    「去遊樂園試試看」：finish() 跑完原本的收尾，最後那一下 go('map') 換成進那個遊戲（S.from='park'）；
 *    遊戲畫面上方列加一顆「回去繼續冒險」（只在這次跳過去時出現；離開遊戲到遊樂園大門或其他地方就收起來），按了回章節地圖。
 *    家長開了「每天先複習 5 關才能去遊樂園」而今天還沒複習完時，不出「去遊樂園試試看」，只有「繼續冒險」。
 * 2. 物品圖：樣張 8 樣（gift_items.js 原樣搬進來）＋補畫 7 樣＋備用擺飾 3 樣，64×64、同一套畫法。
 *    G22.svg(id)／G22.sil(id,色)／G22.inner(id)；G22.ART[id]、G22.SIL[id] 每次讀都是新的 SVG 字串（漸層 id 不重複）。
 * 3. 章節地圖（第 41 章起、有禮物的章節）：禮物牌（下一份禮物的剪影＋問號；外圈三格＝離下一份禮物還要過幾關；旁邊三格＝第 3、6、9 關，拿到的變彩色），
 *    位置自動找不擋關卡圓點、章名的地方（平板在左上，手機直放在第 10 關旁邊）；下一份禮物那一關的圓點右下角加一個小禮物盒。點禮物牌念「再過○關…」。
 * 4. 補發：2.2 以前已經過了的第 3／6／9 關（S.progs／該章進度／S.chDone 已超過，但 V2.g22.got 沒記錄），進大地圖或章節地圖時，
 *    每章一張「遊樂園有新東西！」小卡（物品圖最多 3 樣），按「好棒！」關掉；送出去就記在 got，所以每章只出一次。
 * 動畫只用移動、淡入、亮光（禮物盒蓋子往上移開、物品從盒子往上滑、光芒淡入）；不放大縮小、不倒數、不出現價格。
 * 新台詞照常 say()（沒錄音時只顯示字幕不出聲）；台詞表 lines/v22_giftcore.tsv（G22C_）。公主版、王子版共用。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
if(!window.G22||!Array.isArray(G22.ITEMS))return;
/*ART22-BEGIN*/
let K=0;const uid=()=>'g22'+(++K).toString(36)+Math.random().toString(36).slice(2,5);
const f=v=>(+v).toFixed(1);
const lg=(i,a,b,x2=0,y2=1,mid)=>`<linearGradient id="${i}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/>${mid?`<stop offset=".5" stop-color="${mid}"/>`:''}<stop offset="1" stop-color="${b}"/></linearGradient>`;
const rg=(i,a,b,cx=.4,cy=.35,r=.75)=>`<radialGradient id="${i}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const hl=(x,y,rx,ry,r=-30,o=.55)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${x} ${y})" fill="#fff" opacity="${o}"/>`;
const shadow=(cx=32,rx=22,cy=60.5)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.6" fill="#3A2A5A" opacity=".16"/>`;
const star=(cx,cy,R,k=.46)=>{let d='';for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,r=i%2?R*k:R;d+=(i?'L':'M')+f(cx+r*Math.cos(a))+' '+f(cy+r*Math.sin(a))}return d+'Z'};
const spark=(x,y,r)=>`M${f(x)} ${f(y-r)} Q${f(x+r*.18)} ${f(y-r*.18)} ${f(x+r)} ${f(y)} Q${f(x+r*.18)} ${f(y+r*.18)} ${f(x)} ${f(y+r)} Q${f(x-r*.18)} ${f(y+r*.18)} ${f(x-r)} ${f(y)} Q${f(x-r*.18)} ${f(y-r*.18)} ${f(x)} ${f(y-r)}Z`;
const flower=(x,y,r,c,cc='#FFE27A')=>[0,72,144,216,288].map(a=>`<circle cx="${f(x+r*Math.sin(a*Math.PI/180))}" cy="${f(y-r*Math.cos(a*Math.PI/180))}" r="${f(r*.78)}" fill="${c}"/>`).join('')+`<circle cx="${x}" cy="${y}" r="${f(r*.62)}" fill="${cc}"/>`;

const ART={
/* 1 鬱金香種子（種子袋靠在一個小花盆上；第一次送種子時多送一個花盆） */
tulip:u=>`<defs>${lg(u+'p','#FFF8FB','#FFD3E6')}${lg(u+'t','#FF9AC6','#FF4F95')}${lg(u+'s','#E8F7FF','#C9ECFF')}${lg(u+'o','#F7A577','#D8683E',1,0)}</defs>
 ${shadow(34,25)}
 <g transform="rotate(-9 24 32)">
  <path d="M8 12 L11 8 L14 12 L17 8 L20 12 L23 8 L26 12 L29 8 L32 12 L35 8 L38 12 V54 Q38 58 34 58 H12 Q8 58 8 54Z" fill="url(#${u}p)"/>
  <path d="M8 12 L11 8 L14 12 L17 8 L20 12 L23 8 L26 12 L29 8 L32 12 L35 8 L38 12 V16 H8Z" fill="#FF9FC4"/>
  <rect x="12" y="19" width="22" height="25" rx="4" fill="url(#${u}s)"/>
  <path d="M23 43 V29" stroke="#4FB35A" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M23 41 Q15 39 14.5 31 Q21 33 23 41Z" fill="#6CC562"/><path d="M23 38 Q30 36 31 29 Q24.5 31 23 38Z" fill="#5DBB4A"/>
  <path d="M16.6 22.6 L19.6 26 L23 21 L26.4 26 L29.4 22.6 Q30.4 31.6 23 32.6 Q15.6 31.6 16.6 22.6Z" fill="url(#${u}t)"/>
  <path d="M23 21 L20.6 27.4 Q22 31 23 32.6 Q24 31 25.4 27.4Z" fill="#FFC2DC" opacity=".75"/>
  ${hl(19,25.6,1.4,2.6,-20)}
  <rect x="12" y="47" width="22" height="3.4" rx="1.7" fill="#FFB3D1"/><circle cx="31" cy="52.6" r="1.6" fill="#FFB3D1"/>
 </g>
 <path d="M36.6 47 H58.4 L55.8 59.4 Q55.4 61.6 53.2 61.6 H41.8 Q39.6 61.6 39.2 59.4Z" fill="url(#${u}o)"/>
 <rect x="34.6" y="43.4" width="25.8" height="5.4" rx="2.7" fill="#F7B080"/>
 <ellipse cx="47.5" cy="44.4" rx="10.6" ry="1.5" fill="#7A5232"/>
 <path d="M47.5 58.2 Q43.6 55.6 44.7 53.6 Q45.9 52 47.5 53.8 Q49.1 52 50.3 53.6 Q51.4 55.6 47.5 58.2Z" fill="#FFE27A"/>
 <path d="M39.4 50 Q39 54 40.4 58" stroke="#FFD0B0" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/>
 <g fill="#8A5A2A"><ellipse cx="45" cy="42.4" rx="2" ry="1.3" transform="rotate(-20 45 42.4)"/><ellipse cx="50.4" cy="42" rx="1.8" ry="1.2" transform="rotate(25 50.4 42)"/></g>
 <g class="g22fx"><path d="${spark(56,8,4.2)}" fill="#FFE27A"/><path d="${spark(48,16,2.4)}" fill="#fff"/></g>`,

/* 2 彩虹隧道（寵物小屋的玩具：寵物從這頭鑽進去、那頭跑出來；隧道裡有一雙眼睛在偷看） */
tunnel:u=>`<defs><clipPath id="${u}c"><path d="M20 17.4 Q33 13.4 46 14.6 Q60 16.4 60 31 V55 H20Z"/></clipPath>${lg(u+'sh','#FFFFFF','#2A1A5A',0,1)}${rg(u+'in','#5A4AA8','#1E1648',.55,.5,.7)}${lg(u+'r','#FFA0BC','#FF6F96')}</defs>
 ${shadow(36,26)}
 <g clip-path="url(#${u}c)">${['#FF7A9A','#FFB35C','#FFE07A','#7FE0A0','#7FC4FF','#B99CFF','#FF9FD0'].map((c,i)=>`<rect x="${20+i*6}" y="10" width="6.2" height="50" fill="${c}"/>`).join('')}
  ${[26,32,38,44,50,56].map(x=>`<path d="M${x} 14 V56" stroke="#fff" stroke-width="1.1" opacity=".45"/>`).join('')}
  <rect x="18" y="10" width="44" height="50" fill="url(#${u}sh)" opacity=".26"/>
  <path d="M24 19.6 Q36 16.4 46 17.6 Q56 19 57 28" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".5"/></g>
 <ellipse cx="20" cy="36" rx="13.4" ry="20" fill="url(#${u}r)"/>
 <ellipse cx="21" cy="37" rx="9.6" ry="15.6" fill="url(#${u}in)"/>
 <g><ellipse cx="18.4" cy="38" rx="2.3" ry="2.7" fill="#fff"/><ellipse cx="24.2" cy="38" rx="2.3" ry="2.7" fill="#fff"/><circle cx="18.9" cy="38.4" r="1.3" fill="#2A1E36"/><circle cx="24.7" cy="38.4" r="1.3" fill="#2A1E36"/><circle cx="19.4" cy="37.7" r=".5" fill="#fff"/><circle cx="25.2" cy="37.7" r=".5" fill="#fff"/></g>
 ${hl(12,26,2,6,10,.5)}
 <g class="g22fx"><path d="M4.2 58.6 A2.4 1.8 0 1 0 9 58.6 A2.4 1.8 0 1 0 4.2 58.6Z M3.65 55.6 A.95 .95 0 1 0 5.55 55.6 A.95 .95 0 1 0 3.65 55.6Z M5.65 55 A.95 .95 0 1 0 7.55 55 A.95 .95 0 1 0 5.65 55Z M7.65 55.6 A.95 .95 0 1 0 9.55 55.6 A.95 .95 0 1 0 7.65 55.6Z" fill="#FF9FC4" opacity=".85"/><path d="${spark(54,8,4)}" fill="#FFE27A"/><path d="${spark(9,11,2.6)}" fill="#fff"/></g>`,

/* 3 芒果（小小廚師水果串的新水果：一顆愛文芒果＋兩塊切好的芒果丁） */
mango:u=>window.__m9zm&&window.__m9zm.mango?window.__m9zm.mango(u):`<defs>${lg(u+'m','#FF5A5A','#FFD23A',1,1,'#FF9A2E')}${lg(u+'c','#FFE27A','#FFB81A')}</defs>
 ${shadow(32,24)}
 <path d="M10 34 Q8 17 26 12.4 Q45 9 51 25 Q55 40 42 49 Q26 58 15 47 Q10.6 42 10 34Z" fill="url(#${u}m)"/>
 ${hl(20,24,4.2,8,-28)}<ellipse cx="44" cy="42" rx="5" ry="2.2" transform="rotate(-40 44 42)" fill="#FFF3A0" opacity=".5"/>
 <path d="M27 13 Q27.6 9.6 29.6 7.6" stroke="#8A5A3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
 <path d="M29.4 8.4 Q36 1.6 47 4.6 Q40.6 12.6 29.4 8.4Z" fill="#5CC98A"/><path d="M31 8 Q38 6 44.6 5.2" stroke="#3E9A5A" stroke-width=".9" fill="none" stroke-linecap="round"/>
 <g transform="translate(37 44)"><path d="M0 4 L7 0 L16 2.6 L9 6.8Z" fill="#FFF0A8"/><path d="M0 4 L9 6.8 V16.6 L0 13.6Z" fill="url(#${u}c)"/><path d="M9 6.8 L16 2.6 V12.4 L9 16.6Z" fill="#F0A020"/>${hl(3.4,8.6,1,2.6,0,.5)}</g>
 <g transform="translate(25 49.4)"><path d="M0 3.4 L6 0 L13.4 2.2 L7.4 5.8Z" fill="#FFF0A8"/><path d="M0 3.4 L7.4 5.8 V13.8 L0 11.2Z" fill="url(#${u}c)"/><path d="M7.4 5.8 L13.4 2.2 V10.2 L7.4 13.8Z" fill="#F0A020"/></g>
 <g class="g22fx"><path d="${spark(55,14,3.6)}" fill="#fff"/></g>`,

/* 4 星星投影燈（房間的燈：點一下，星星灑滿牆和天花板） */
starlamp:u=>`<defs>${rg(u+'g','#FFF3C4','#FFF3C4',.5,.55,.5)}${rg(u+'d','#A898F8','#3A2E8A',.38,.3,.8)}${lg(u+'b','#FFC2DF','#E8679F')}${lg(u+'beam','#FFE27A','#FFE27A',0,1)}</defs>
 <g class="g22fx"><circle cx="32" cy="30" r="27" fill="url(#${u}g)" opacity=".55"/>
 <path d="M26 24 L10 4 H22Z M38 24 L54 4 H42Z M32 22 L28 2 H36Z" fill="#FFE9A0" opacity=".42"/></g>
 ${shadow(32,18)}
 <path d="M13 41 A19 19 0 0 1 51 41Z" fill="url(#${u}d)"/>
 ${[[24,32,3.6],[35,27,3.2],[43,35,2.8],[30,38,2.2],[19,38,2]].map(([x,y,r])=>`<path d="${star(x,y,r)}" fill="#FFE27A"/>`).join('')}
 <path d="M18 31 Q22 25 29 23.4" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".5"/>
 <rect x="11" y="40" width="42" height="10" rx="5" fill="url(#${u}b)"/><rect x="14" y="41.6" width="30" height="2.4" rx="1.2" fill="#fff" opacity=".45"/>
 <circle cx="46" cy="45" r="2.1" fill="#FFE27A"/>
 <path d="M18 50 H46 L43 57 Q42.6 58.6 41 58.6 H23 Q21.4 58.6 21 57Z" fill="#D85A92"/>
 <g class="g22fx">${[[8,14,3.8],[57,18,3.2],[6,32,2.4],[59,34,2.2]].map(([x,y,r])=>`<path d="${star(x,y,r)}" fill="#FFE27A"/>`).join('')}
 <path d="${spark(48,8,2.8)}" fill="#fff"/><path d="${spark(16,4,2.2)}" fill="#fff"/></g>`,

/* 5 長頸鹿身高尺（貼在房間牆上：點一下，主角走過去量身高） */
giraffe:u=>`<defs>${lg(u+'r','#FFFFFF','#FFE3EF')}${lg(u+'y','#FFE58A','#FFC23A')}</defs>
 ${shadow(36,24)}
 <rect x="6" y="3" width="13" height="57" rx="3.4" fill="url(#${u}r)"/><rect x="6" y="3" width="3" height="57" rx="1.5" fill="#FFC9DD" opacity=".7"/>
 ${Array.from({length:11},(_,i)=>{const y=7+i*5;return `<path d="M${i%2?12:10} ${y} H18" stroke="#FF8FB8" stroke-width="${i%2?1.3:1.8}" stroke-linecap="round"/>`}).join('')}
 <path d="M14 28.6 Q11.8 26.8 12.6 25.4 Q13.4 24.4 14.6 25.6 Q15.8 24.4 16.6 25.4 Q17.4 26.8 15.2 28.6Z" fill="#FF6F91"/>
 <path d="M37 46 Q35 32 27.6 18.6 L33.8 15.4 Q41.6 29 45.6 44Z" fill="url(#${u}y)"/>
 <ellipse cx="44" cy="48" rx="14" ry="8.6" fill="url(#${u}y)"/>
 ${[[31,53,3.4],[36,53.6,3.4],[46,53.6,3.4],[51,53,3.4]].map(([x,y,w])=>`<rect x="${x}" y="${y}" width="${w}" height="7" rx="1.6" fill="#FFC93C"/><rect x="${x}" y="${y+5.2}" width="${w}" height="2.2" rx="1" fill="#A8743E"/>`).join('')}
 <path d="M57.6 46 Q61.6 48 60.6 53" stroke="#E8A030" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="60.6" cy="54" rx="1.4" ry="2" fill="#A8743E"/>
 <g fill="#F2A93B" opacity=".9"><ellipse cx="40" cy="45.4" rx="3.2" ry="2.4"/><ellipse cx="48" cy="44.6" rx="2.6" ry="2"/><ellipse cx="51.6" cy="50.4" rx="2.6" ry="2"/><ellipse cx="43.4" cy="51.4" rx="2.4" ry="1.8"/>
  <ellipse cx="38.8" cy="37" rx="2" ry="2.6"/><ellipse cx="35.6" cy="29.6" rx="1.8" ry="2.3"/><ellipse cx="32.6" cy="23" rx="1.4" ry="1.8"/></g>
 <path d="M26.6 6.6 V2.8 M31.8 6.4 V2.6" stroke="#C88A3A" stroke-width="1.8" stroke-linecap="round"/><circle cx="26.6" cy="2.6" r="1.7" fill="#A8743E"/><circle cx="31.8" cy="2.4" r="1.7" fill="#A8743E"/>
 <ellipse cx="36.4" cy="9.4" rx="3.2" ry="1.6" transform="rotate(-24 36.4 9.4)" fill="#FFC23A"/><ellipse cx="36.4" cy="9.4" rx="1.8" ry=".8" transform="rotate(-24 36.4 9.4)" fill="#FFB3C6"/>
 <ellipse cx="28.6" cy="11.6" rx="8.4" ry="6.2" transform="rotate(-14 28.6 11.6)" fill="url(#${u}y)"/>
 <ellipse cx="23" cy="14.4" rx="4.2" ry="3.4" fill="#FFE9B8"/><circle cx="21.6" cy="13.8" r=".7" fill="#8A5A3A"/><circle cx="24.4" cy="13.6" r=".7" fill="#8A5A3A"/>
 <circle cx="29.4" cy="9.8" r="1.5" fill="#2A1E36"/><circle cx="29.9" cy="9.2" r=".55" fill="#fff"/>
 <circle cx="31.6" cy="13.6" r="1.6" fill="#FF9FB0" opacity=".6"/>
 ${hl(31,8,1.6,3,-40,.45)}`,

/* 6 潔牙骨頭（寵物小屋的玩具：咬一咬，牙齒亮晶晶） */
bone:u=>`<defs>${lg(u+'b','#B8F5E8','#43BFA6',1,1)}</defs>
 ${shadow(33,22)}
 <g transform="rotate(-28 33 35)">
  <rect x="17" y="29" width="32" height="12" rx="6" fill="url(#${u}b)"/>
  <circle cx="16.4" cy="28.6" r="7.2" fill="url(#${u}b)"/><circle cx="16.4" cy="41.4" r="7.2" fill="url(#${u}b)"/>
  <circle cx="49.6" cy="28.6" r="7.2" fill="url(#${u}b)"/><circle cx="49.6" cy="41.4" r="7.2" fill="url(#${u}b)"/>
  ${[25,30,35,40].map(x=>`<rect x="${x}" y="29.6" width="2.4" height="10.8" rx="1.2" fill="#fff" opacity=".55"/>`).join('')}
  ${hl(14,25.6,2,3.6,-30,.6)}${hl(47.4,25.6,1.8,3.2,-30,.5)}
 </g>
 <g class="g22fx"><path transform="translate(5 3)" d="M1 6 Q1 1 5.6 1 Q7.4 2 9.2 1 Q13.8 1 13.8 6 Q13.8 10.6 11.8 16 Q10.8 18.4 9.8 15.6 L7.4 11.4 L5 15.6 Q4 18.4 3 16 Q1 10.6 1 6Z" fill="#FFFFFF"/><path transform="translate(5 3)" d="M3.2 4.6 Q4.2 3 6 3.2" stroke="#BFE6FF" stroke-width="1.2" fill="none" stroke-linecap="round"/>
 <path d="${spark(22,7,3)}" fill="#FFE27A"/><path d="${spark(56,10,3.8)}" fill="#FFE27A"/><path d="${spark(9,52,2.6)}" fill="#fff"/>
 ${[[53,52,2.6],[58,46,1.6],[47,57,1.4]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#E8FDFF" opacity=".9"/>`).join('')}</g>`,

/* 7 大象澆水壺（小小農場：鼻子是壺嘴，澆水時從鼻子灑出來） */
elecan:u=>`<defs>${lg(u+'e','#C9D4FF','#8E9CEA',1,1)}${lg(u+'ear','#FFC9DD','#FF9FC4')}</defs>
 ${shadow(30,22)}
 <path d="M12 30 Q11.6 15.4 26 15 Q37 15 38.4 26" stroke="#8E9CEA" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M12 30 Q11.6 15.4 26 15 Q37 15 38.4 26" stroke="#C9D4FF" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
 <path d="M8 38 Q8 26 22 25 H34 Q46 25 47 38 L46 50 Q45.4 57 38 57 H17 Q9.6 57 9 50Z" fill="url(#${u}e)"/>
 <rect x="15" y="54" width="8" height="5.4" rx="2.4" fill="#A8B4F2"/><rect x="31" y="54" width="8" height="5.4" rx="2.4" fill="#A8B4F2"/>
 <path d="M42 44 Q52 44 54 34 Q55 25 52.6 19.4 L57.4 17 Q61 26 58.6 37 Q55.6 49.6 42 51Z" fill="url(#${u}e)"/>
 <ellipse cx="55" cy="17.6" rx="3.6" ry="2.2" transform="rotate(-26 55 17.6)" fill="#A8B4F2"/>
 <path d="M30 31 Q19 30 19.6 41 Q20.4 49 30 47Z" fill="url(#${u}ear)"/><path d="M30 31 Q23 31 23.4 40 Q24 45.6 30 45Z" fill="#FFE3EE" opacity=".6"/>
 <circle cx="38" cy="36" r="2" fill="#2A1E36"/><circle cx="38.7" cy="35.2" r=".75" fill="#fff"/>
 <circle cx="42.6" cy="42" r="2.2" fill="#FF9FB0" opacity=".6"/>
 ${flower(16.6,48.6,2.4,'#FFFFFF')}
 ${hl(14,34,2,5,10,.5)}
 <g class="g22fx">${[[56,9,2.6],[61,12.6,2],[51,8,1.8],[59.4,5,1.5]].map(([x,y,r])=>`<path d="M${x} ${f(y-r*1.6)} Q${f(x+r)} ${f(y-r*.2)} ${f(x+r*.9)} ${f(y+r*.4)} A${r} ${r} 0 0 1 ${f(x-r*.9)} ${f(y+r*.4)} Q${f(x-r)} ${f(y-r*.2)} ${x} ${f(y-r*1.6)}Z" fill="#8FD8FF"/>`).join('')}</g>`,

/* 8 花花相框（小小攝影師：之後拍的照片都有花朵邊框，相簿裡看得到） */
frame:u=>`<defs>${lg(u+'f','#FFF0F6','#FFC9DD')}${lg(u+'s','#A8DCFF','#E8F6FF')}</defs>
 ${shadow(32,24)}
 <g transform="rotate(-6 32 32)">
  <rect x="8" y="7" width="48" height="50" rx="6" fill="url(#${u}f)"/>
  <rect x="13" y="12" width="38" height="31" rx="3" fill="url(#${u}s)"/>
  <path d="M13 36 Q22 28.6 31 34 Q40 29 51 34.6 V40 Q51 43 48 43 H16 Q13 43 13 40Z" fill="#8FD68A"/>
  <path d="M13 39 Q24 34 35 39 Q43 36 51 38.6 V40 Q51 43 48 43 H16 Q13 43 13 40Z" fill="#6CC562"/>
  <circle cx="42" cy="20" r="4.2" fill="#FFD24D"/><circle cx="42" cy="20" r="6.4" fill="#FFE27A" opacity=".35"/>
  <path d="M18 22 Q18 18.6 21.4 18.6 Q22.4 16.4 25.2 17 Q28.6 17 28.6 20.4 Q30.4 21 30 23 H18.6 Q17.6 23 18 22Z" fill="#fff" opacity=".95"/>
  <path d="M28.6 39.6 Q26.4 38 27 36.8 Q27.6 36 28.6 37 Q29.6 36 30.2 36.8 Q30.8 38 28.6 39.6Z" fill="#FF6F91"/>
  <rect x="20" y="47.6" width="24" height="3" rx="1.5" fill="#FFB3D1"/>
  ${hl(14,10.6,1.4,3,-30,.6)}
 </g>
 <ellipse cx="11" cy="15.6" rx="3" ry="1.6" transform="rotate(30 11 15.6)" fill="#6CC562"/><ellipse cx="53.6" cy="50" rx="3" ry="1.6" transform="rotate(-30 53.6 50)" fill="#6CC562"/>
 ${flower(9,9,3.6,'#FF8FBE')}${flower(55.6,10.6,3,'#FFE27A','#FF9A2E')}${flower(8.6,52.6,3,'#9FD0FF')}${flower(56,54.6,3.8,'#FFB3D9')}`,
/* 9 小書蟲的塗色圖（塗色本：一張還沒塗完的線稿，書裡探出頭的小書蟲戴眼鏡；旁邊兩支蠟筆） */
bookworm:u=>`<defs>${lg(u+'p','#FFFFFF','#F3EEFF')}${lg(u+'g','#C8F59A','#6CC562')}${lg(u+'c1','#9BE07A','#4FB35A',1,0)}${lg(u+'c2','#FFB3D1','#FF6F9E',1,0)}</defs>
 ${shadow(32,25)}
 <g transform="rotate(-6 30 31)">
  <rect x="8" y="5" width="42" height="51" rx="4" fill="url(#${u}p)"/>
  <path d="M42 56 H46 Q50 56 50 52 V48Z" fill="#DCD2F4"/>
  <rect x="8" y="5" width="42" height="3.4" rx="1.7" fill="#FFD3E6"/>
  <g fill="none" stroke="#8C7CC8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
   <path d="M14 46 Q22 42 29 45 Q36 42 44 46 V50 Q36 46.6 29 49.4 Q22 46.6 14 50Z"/>
   <path d="M29 45 V49.4"/>
   <circle cx="20.6" cy="38.6" r="4.4"/><circle cx="26.4" cy="34.6" r="4.6"/>
  </g>
  <circle cx="20.6" cy="38.6" r="4.4" fill="url(#${u}g)" opacity=".95"/>
  <circle cx="33.6" cy="27.6" r="6.6" fill="url(#${u}g)"/>
  <g fill="none" stroke="#8C7CC8" stroke-width="1.2" stroke-linecap="round"><circle cx="33.6" cy="27.6" r="6.6"/><path d="M31 20.6 Q29.6 16.6 27.4 16.4 M36.4 20.8 Q38 16.8 40.2 16.8"/></g>
  <circle cx="27.2" cy="16.4" r="1.3" fill="#FF8FB8"/><circle cx="40.4" cy="16.8" r="1.3" fill="#FF8FB8"/>
  <g fill="none" stroke="#5A4A9A" stroke-width="1.1"><circle cx="31.2" cy="26.6" r="2.4"/><circle cx="36.6" cy="26.6" r="2.4"/><path d="M33.6 26.4 H34.2"/></g>
  <circle cx="31.4" cy="26.8" r=".9" fill="#2A1E36"/><circle cx="36.8" cy="26.8" r=".9" fill="#2A1E36"/>
  <path d="M31.6 30.6 Q33.8 32.4 36 30.6" stroke="#5A4A9A" stroke-width="1.1" fill="none" stroke-linecap="round"/>
  ${hl(30.6,23.6,1.2,2.2,-30,.7)}
  <path d="M12 12 H24 M12 15.4 H20" stroke="#E4DCF8" stroke-width="1.6" stroke-linecap="round"/>
 </g>
 <g transform="rotate(-32 46 50)"><rect x="34" y="47" width="22" height="6" rx="2" fill="url(#${u}c1)"/><rect x="38" y="47" width="10" height="6" fill="#FFFFFF" opacity=".55"/><path d="M56 47 L61.4 50 L56 53Z" fill="#4FB35A"/></g>
 <g transform="rotate(-14 46 56)"><rect x="36" y="53" width="20" height="5.6" rx="2" fill="url(#${u}c2)"/><rect x="40" y="53" width="9" height="5.6" fill="#FFFFFF" opacity=".55"/><path d="M56 53 L61 55.8 L56 58.6Z" fill="#FF6F9E"/></g>
 <g class="g22fx"><path d="${spark(56,9,3.8)}" fill="#FFE27A"/><path d="${spark(4.6,22,2.4)}" fill="#fff"/></g>`,

/* 10 南極的小企鵝（地球儀：點南極，小企鵝站在冰塊上揮手） */
penguin:u=>`<defs>${lg(u+'b','#7486E0','#2E3A8A',1,1)}${lg(u+'i','#F4FCFF','#B4E0F6')}${lg(u+'k','#FFD24D','#FF8A2A')}${lg(u+'w','#FFFFFF','#E6F2FF')}</defs>
 ${shadow(32,23)}
 <path d="M7 52 Q8 46.4 15 45.6 H49 Q56 46.4 57 52 V55 Q56 59.4 50.6 59.4 H13.4 Q8 59.4 7 55Z" fill="url(#${u}i)"/>
 <path d="M11.6 49 Q13.6 47.6 19 47.6 H40" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".85"/>
 <path d="M44 53 L47 56.4 M50 51.6 L52.6 54" stroke="#9ED2EE" stroke-width="1.1" stroke-linecap="round"/>
 <ellipse cx="26.4" cy="49.6" rx="4.6" ry="2.2" fill="url(#${u}k)"/><ellipse cx="37.6" cy="49.6" rx="4.6" ry="2.2" fill="url(#${u}k)"/>
 <path d="M18.6 27 Q10.4 31.6 9.6 40 Q14.6 39.6 19.6 35.4Z" fill="#3A4898"/>
 <path d="M45 26.6 Q51.6 21 54.6 14.4 Q57.6 20.6 47 33.4Z" fill="#3A4898"/>
 <path d="M32 7.4 Q45.6 7.4 46.6 23.6 Q48.6 38 44.4 45 Q39 50.2 32 50.2 Q25 50.2 19.6 45 Q15.4 38 17.4 23.6 Q18.4 7.4 32 7.4Z" fill="url(#${u}b)"/>
 <path d="M32 19.6 Q27.4 13 22.8 17.2 Q19.8 21.4 21.6 29 Q21.2 40.6 25.2 46 Q28.4 49.4 32 49.4 Q35.6 49.4 38.8 46 Q42.8 40.6 42.4 29 Q44.2 21.4 41.2 17.2 Q36.6 13 32 19.6Z" fill="url(#${u}w)"/>
 <circle cx="27.6" cy="25.4" r="2.3" fill="#2A1E36"/><circle cx="36.4" cy="25.4" r="2.3" fill="#2A1E36"/>
 <circle cx="28.4" cy="24.6" r=".85" fill="#fff"/><circle cx="37.2" cy="24.6" r=".85" fill="#fff"/>
 <path d="M29.2 29.2 Q32 27.6 34.8 29.2 Q33.6 32.8 32 33 Q30.4 32.8 29.2 29.2Z" fill="url(#${u}k)"/>
 <ellipse cx="24.4" cy="30.6" rx="2.2" ry="1.4" fill="#FF9FB8" opacity=".7"/><ellipse cx="39.6" cy="30.6" rx="2.2" ry="1.4" fill="#FF9FB8" opacity=".7"/>
 ${hl(24.4,13.6,2,4.2,-35,.45)}
 <g class="g22fx"><path d="${spark(56,30,3)}" fill="#fff"/><path d="${spark(8,12,3.4)}" fill="#BFE6FF"/>
  <g stroke="#BFE6FF" stroke-width="1.3" stroke-linecap="round"><path d="M55 5 V12 M51.6 8.6 H58.4 M52.6 6.2 L57.4 11 M57.4 6.2 L52.6 11"/></g></g>`,

/* 11 小黃瓜（小小廚師：一根小黃瓜，尾巴還有小黃花；旁邊兩片切好的） */
cucumber:u=>`<defs>${lg(u+'c','#A8E87A','#2F9A4A',0,1)}${rg(u+'s','#F2FFE0','#BFEA94',.5,.5,.6)}</defs>
 ${shadow(32,25)}
 <g transform="rotate(-34 30 30)">
  <rect x="6" y="23" width="48" height="14" rx="7" fill="url(#${u}c)"/>
  <path d="M11 26.6 Q30 23.6 50 26.6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".45"/>
  ${[[14,31],[21,29],[28,32],[35,29.4],[42,31.6],[47,28.6],[18,34],[39,34.2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".95" fill="#E8FFD0" opacity=".9"/>`).join('')}
  <path d="M54 30 Q57.6 27.6 58.4 30 Q57.6 32.6 54 30Z" fill="#7FA03A"/>
  ${flower(4.6,30,2.6,'#FFE27A','#FFB81A')}
 </g>
 <g transform="translate(44 50)"><ellipse cx="0" cy="0" rx="9" ry="5.4" fill="#3E9A4A"/><ellipse cx="0" cy="-.8" rx="8" ry="4.6" fill="url(#${u}s)"/>
  ${[0,60,120,180,240,300].map(a=>`<ellipse cx="${f(3.4*Math.cos(a*Math.PI/180))}" cy="${f(-.8+2*Math.sin(a*Math.PI/180))}" rx=".9" ry=".55" fill="#8CCB5A" opacity=".8"/>`).join('')}</g>
 <g transform="translate(25 54.4)"><ellipse cx="0" cy="0" rx="7.4" ry="4.4" fill="#3E9A4A"/><ellipse cx="0" cy="-.7" rx="6.5" ry="3.7" fill="url(#${u}s)"/>
  ${[0,72,144,216,288].map(a=>`<ellipse cx="${f(2.8*Math.cos(a*Math.PI/180))}" cy="${f(-.7+1.6*Math.sin(a*Math.PI/180))}" rx=".8" ry=".5" fill="#8CCB5A" opacity=".8"/>`).join('')}</g>
 ${hl(15.6,44,1.4,3.4,40,.5)}
 <g class="g22fx"><path d="${spark(54,10,3.8)}" fill="#FFE27A"/><path d="${spark(12,12,2.4)}" fill="#fff"/></g>`,

/* 12 動物腳印地毯（房間的地毯：粉紫色橢圓地毯，上面有三種顏色的小腳印，兩頭有流蘇） */
pawrug:u=>`<defs>${lg(u+'r','#FFE0F0','#E9A6D2',1,1)}${lg(u+'e','#D8B8FF','#A88AE8',0,1)}</defs>
 ${shadow(32,27,59.6)}
 ${[11,14,17,20,23].map(i=>`<path d="M${f(5.4-(i-17)*.05)} ${f(i+20)} H1.6" stroke="#C9A8F0" stroke-width="1.6" stroke-linecap="round"/><path d="M${f(58.6+(i-17)*.05)} ${f(i+20)} H62.4" stroke="#C9A8F0" stroke-width="1.6" stroke-linecap="round"/>`).join('')}
 <ellipse cx="32" cy="40" rx="27.6" ry="16.6" fill="url(#${u}e)"/>
 <ellipse cx="32" cy="38.8" rx="27" ry="15.6" fill="url(#${u}r)"/>
 <ellipse cx="32" cy="38.8" rx="22" ry="11.6" fill="none" stroke="#fff" stroke-width="1.3" stroke-dasharray="2.4 2.2" opacity=".85"/>
 ${[[20,36,'#FF7FAE',-18],[32,43.6,'#9A7CF0',8],[44,34.6,'#5FB4F0',-6]].map(([x,y,c,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="1.6" rx="3.4" ry="2.4" fill="${c}"/>${[[-3.6,-1.6],[-1.3,-3],[1.3,-3],[3.6,-1.6]].map(([a,b])=>`<ellipse cx="${a}" cy="${b}" rx="1.3" ry="1" fill="${c}"/>`).join('')}</g>`).join('')}
 <path d="M10 33 Q16 25.6 28 24" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".55"/>
 <g class="g22fx"><g transform="translate(52 12) rotate(14)" opacity=".85"><ellipse cx="0" cy="1.4" rx="2.8" ry="2.2" fill="#FFB3D1"/>${[[-3,-1.4],[-1.1,-2.8],[1.1,-2.8],[3,-1.4]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="1.05" fill="#FFB3D1"/>`).join('')}</g>
  <path d="${spark(12,13,3.6)}" fill="#FFE27A"/><path d="${spark(40,9,2.2)}" fill="#fff"/></g>`,

/* 13 牽牛花種子（小小農場：藍紫色牽牛花的種子袋，旁邊一條小藤蔓開了一朵花，地上三顆種子） */
morning:u=>`<defs>${lg(u+'p','#F8F6FF','#DCD0FF')}${lg(u+'s','#FFF6E0','#FFE3B0')}${rg(u+'f','#FFFFFF','#6C6CF4',.5,.5,.62)}${rg(u+'g','#FFFFFF','#8A7CF8',.5,.5,.62)}${lg(u+'l','#9BE07A','#4FB35A',1,1)}</defs>
 ${shadow(30,26)}
 <g transform="rotate(-8 24 32)">
  <path d="M7 12 L10 8 L13 12 L16 8 L19 12 L22 8 L25 12 L28 8 L31 12 L34 8 L37 12 V54 Q37 58 33 58 H11 Q7 58 7 54Z" fill="url(#${u}p)"/>
  <path d="M7 12 L10 8 L13 12 L16 8 L19 12 L22 8 L25 12 L28 8 L31 12 L34 8 L37 12 V16 H7Z" fill="#B99CFF"/>
  <rect x="11" y="19" width="22" height="25" rx="4" fill="url(#${u}s)"/>
  <path d="M22 43 Q19 37 21 31" stroke="#4FB35A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M20.6 38.4 Q14.6 38.6 14.8 34 Q18.6 33 20.6 38.4Z" fill="#6CC562"/>
  ${[0,72,144,216,288].map(a=>`<circle cx="${f(22+5.2*Math.sin(a*Math.PI/180))}" cy="${f(27-5.2*Math.cos(a*Math.PI/180))}" r="3.9" fill="url(#${u}f)"/>`).join('')}
  <circle cx="22" cy="27" r="4.6" fill="url(#${u}f)"/>
  <path d="${star(22,27,4,.35)}" fill="#fff" opacity=".85"/><circle cx="22" cy="27" r="1.4" fill="#FFE27A"/>
  <rect x="11" y="47" width="22" height="3.4" rx="1.7" fill="#C9B4FF"/><circle cx="30" cy="52.6" r="1.6" fill="#C9B4FF"/>
  ${hl(14,22,1.3,2.6,-20,.7)}
 </g>
 <path d="M40 58 Q37 48 43 42 Q50 36 46 28 Q43 21 49 16" stroke="#4FB35A" stroke-width="2" fill="none" stroke-linecap="round"/>
 <path d="M49 16 Q53 14 52.4 17.6 Q51.4 19.6 49.6 18.4" stroke="#4FB35A" stroke-width="1.4" fill="none" stroke-linecap="round"/>
 <path d="M44 41.6 Q51 43.4 53.6 38 Q53.4 34.6 50.6 34.8 Q49 32.4 46.4 34 Q44 36.6 44 41.6Z" fill="url(#${u}l)"/>
 <path d="M44.6 30 Q38.6 30.6 37.6 25.8 Q38 23.4 40.2 23.8 Q41 21.6 43 22.6 Q45.4 24.6 44.6 30Z" fill="url(#${u}l)"/>
 ${[0,72,144,216,288].map(a=>`<circle cx="${f(53+4.6*Math.sin(a*Math.PI/180))}" cy="${f(25.6-4.6*Math.cos(a*Math.PI/180))}" r="3.5" fill="url(#${u}g)"/>`).join('')}
 <circle cx="53" cy="25.6" r="4" fill="url(#${u}g)"/><path d="${star(53,25.6,3.6,.35)}" fill="#fff" opacity=".85"/><circle cx="53" cy="25.6" r="1.2" fill="#FFE27A"/>
 <g fill="#5A3A2A">${[[44,58.4,-20],[49,59,15],[53.6,58,-5]].map(([x,y,r])=>`<path transform="translate(${x} ${y}) rotate(${r})" d="M0 -2 Q2.2 -1.4 2 1.4 L-2 1.4 Q-2.2 -1.4 0 -2Z"/>`).join('')}</g>
 <g class="g22fx"><path d="${spark(58,8,3.4)}" fill="#FFE27A"/><path d="${spark(40,7,2.2)}" fill="#fff"/></g>`,

/* 14 變色龍小畫家的塗色圖（塗色本：捲尾巴的變色龍戴著小畫家帽，身上塗了一半彩虹；旁邊一支水彩筆） */
chameleon:u=>`<defs>${lg(u+'p','#FFFFFF','#FFF4E0')}${lg(u+'w','#F4C08A','#C4824A',1,0)}</defs>
 ${shadow(32,25)}
 <g transform="rotate(5 32 31)">
  <rect x="9" y="5" width="44" height="50" rx="4" fill="url(#${u}p)"/>
  <path d="M45 55 H49 Q53 55 53 51 V47Z" fill="#F2DFBA"/>
  <rect x="9" y="5" width="44" height="3.4" rx="1.7" fill="#BFE6FF"/>
  <path d="M14 44 Q30 40 48 44" stroke="#C9A06A" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <clipPath id="${u}b"><path d="M16 38 Q16 26 28 24 Q38 23 42 30 Q44 36 40 40 Q30 43 16 38Z"/></clipPath>
  <g clip-path="url(#${u}b)">${['#FF7A9A','#FFB35C','#FFE07A','#7FE0A0'].map((c,i)=>`<rect x="${14+i*5.4}" y="20" width="5.6" height="24" fill="${c}"/>`).join('')}</g>
  <g fill="none" stroke="#8C7CC8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
   <path d="M16 38 Q16 26 28 24 Q38 23 42 30 Q44 36 40 40 Q30 43 16 38Z"/>
   <path d="M16 38 Q11 38 10.6 33 Q10.6 28.6 14.6 28.6 Q18 28.8 17.6 32 Q17 34.2 15 33.6"/>
   <path d="M22 40.6 L21 43.6 M33 41.6 L33.6 44.4"/>
   <path d="M40 27.6 Q46 25.6 48.6 30 Q49.6 34 45.6 35.6 Q42.6 36.4 41.6 34"/>
  </g>
  <circle cx="44.4" cy="30.4" r="2.6" fill="#fff" stroke="#8C7CC8" stroke-width="1.1"/><circle cx="45" cy="30.6" r="1.2" fill="#2A1E36"/>
  <path d="M38.6 25.4 Q41 19.6 47 21 Q49.6 22 48 24.6 Q44 23.6 38.6 25.4Z" fill="#B99CFF"/><circle cx="47.4" cy="20.6" r="1.2" fill="#8A6AE8"/>
  ${[[18,14,'#FF7A9A'],[24,14,'#FFE07A'],[30,14,'#7FC4FF']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="2.2" fill="${c}"/>`).join('')}
 </g>
 <g transform="rotate(-38 46 52)"><rect x="32" y="50.4" width="22" height="3.4" rx="1.7" fill="url(#${u}w)"/><rect x="53" y="49.6" width="4" height="5" rx=".8" fill="#C2CADC"/><path d="M57 49.8 Q62.6 50.6 63 52.1 Q62.6 53.6 57 54.4Z" fill="#9A7CF0"/></g>
 <g class="g22fx"><path d="${spark(6,10,3.4)}" fill="#FFE27A"/><path d="${spark(58,14,2.6)}" fill="#fff"/></g>`,

/* 15 彩虹相機（小小攝影師：彩虹條紋的相機，拍出來的照片多一道彩虹） */
rcamera:u=>`<defs>${lg(u+'b','#FFFFFF','#E8E0FA',0,1)}${rg(u+'l','#9FD0FF','#2A3A8A',.38,.34,.75)}<clipPath id="${u}c"><rect x="7" y="20" width="50" height="34" rx="7"/></clipPath></defs>
 ${shadow(32,24)}
 <rect x="14" y="15" width="11" height="7" rx="2.4" fill="#B99CFF"/>
 <rect x="41" y="14" width="9" height="6" rx="2.2" fill="#FFD24D"/><rect x="42.6" y="14.6" width="5.8" height="2" rx="1" fill="#fff" opacity=".55"/>
 <rect x="7" y="20" width="50" height="34" rx="7" fill="url(#${u}b)"/>
 <g clip-path="url(#${u}c)">${['#FF7A9A','#FFB35C','#FFE07A','#7FE0A0','#7FC4FF','#B99CFF'].map((c,i)=>`<rect x="5" y="${f(37+i*2.8)}" width="54" height="2.9" fill="${c}"/>`).join('')}
  <rect x="5" y="20" width="54" height="5" fill="#fff" opacity=".5"/></g>
 <rect x="11" y="24" width="9" height="6" rx="2" fill="#E2F4FF"/><rect x="12" y="25" width="3.4" height="2" rx="1" fill="#fff"/>
 <circle cx="34" cy="38" r="13" fill="#FFB3D1"/><circle cx="34" cy="38" r="10.6" fill="#FFF0F6"/>
 <circle cx="34" cy="38" r="8.4" fill="url(#${u}l)"/>
 <circle cx="34" cy="38" r="4.2" fill="#1E2A6A" opacity=".55"/>
 <ellipse cx="30.6" cy="34.6" rx="2.6" ry="1.8" transform="rotate(-35 30.6 34.6)" fill="#fff" opacity=".85"/><circle cx="37.4" cy="41.4" r="1.1" fill="#fff" opacity=".7"/>
 ${hl(11,33,1.4,4,0,.55)}
 <g class="g22fx"><path d="M47 9 A9 9 0 0 1 63 9" stroke="#FF8FB8" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/><path d="M49 9.6 A7 7 0 0 1 61 9.6" stroke="#FFE07A" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/><path d="M51 10.2 A5 5 0 0 1 59 10.2" stroke="#7FC4FF" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="${spark(6,10,3.2)}" fill="#FFE27A"/></g>`,

/* 16 備用：雲朵抱枕（房間：軟軟的雲朵抱枕，閉著眼睛在笑） */
sp_cushion:u=>`<defs>${lg(u+'c','#FFFFFF','#BFE1FF',.3,1)}</defs>
 ${shadow(32,24)}
 <path d="M14 50 Q5 50 5.6 41 Q6.4 33.4 14 33 Q14.6 22.6 25 21.6 Q30.6 13.6 40 16.4 Q47.6 18.6 48.6 26.6 Q58.6 27.4 58.4 38 Q58 50 47 50Z" fill="url(#${u}c)"/>
 <path d="M14 46 Q9.6 45.6 10 40.6 M25 25.6 Q29 19.4 36 20" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>
 <path d="M14 50 Q5 50 5.6 41 Q6.4 33.4 14 33 Q14.6 22.6 25 21.6 Q30.6 13.6 40 16.4 Q47.6 18.6 48.6 26.6 Q58.6 27.4 58.4 38 Q58 50 47 50Z" fill="none" stroke="#9ECFF4" stroke-width="1" stroke-dasharray="1.8 2.2" opacity=".9" transform="translate(32 34) scale(.9) translate(-32 -34)"/>
 <path d="M23.4 37 Q26 34.6 28.6 37 M36 37 Q38.6 34.6 41.2 37" stroke="#5A4A8A" stroke-width="1.6" fill="none" stroke-linecap="round"/>
 <path d="M29.6 41.4 Q32.3 44 35 41.4" stroke="#5A4A8A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
 <ellipse cx="22.6" cy="41" rx="2.6" ry="1.6" fill="#FFB3CF" opacity=".75"/><ellipse cx="42" cy="41" rx="2.6" ry="1.6" fill="#FFB3CF" opacity=".75"/>
 <g class="g22fx"><path d="${star(55,12,3.6)}" fill="#FFE27A"/><path d="${spark(9,18,2.8)}" fill="#fff"/><path d="${star(47,6,2)}" fill="#FFE27A" opacity=".8"/></g>`,

/* 17 備用：星星吊飾（房間：掛在天花板的吊飾，一個月亮、兩顆星星） */
sp_mobile:u=>`<defs>${lg(u+'s','#FFF1A8','#F2B036',1,1)}${lg(u+'p','#FFD3E6','#F27DB0',1,1)}${lg(u+'m','#FFF6D8','#FFC97A',1,1)}${lg(u+'w','#F8CC94','#C4824A',0,1)}</defs>
 <ellipse cx="32" cy="60.5" rx="14" ry="2.2" fill="#3A2A5A" opacity=".12"/>
 <path d="M32 1 V9" stroke="#B9A4E4" stroke-width="1.2"/>
 <path d="M9 12 Q32 6 55 12" stroke="url(#${u}w)" stroke-width="3.2" fill="none" stroke-linecap="round"/>
 <circle cx="32" cy="9" r="2" fill="#C4824A"/>
 <g stroke="#C8B4EC" stroke-width="1"><path d="M12 11.4 V26"/><path d="M32 8.4 V31"/><path d="M52 11.4 V35"/></g>
 <path d="M16.6 26.4 A9 9 0 1 0 16.6 43.6 A7 7 0 1 1 16.6 26.4Z" fill="url(#${u}m)" transform="translate(-2.4 0)"/>
 <circle cx="13" cy="37" r=".9" fill="#E0A050" opacity=".6"/>
 <path d="${star(32,40,10.6)}" fill="url(#${u}s)"/>
 <circle cx="29" cy="40.4" r=".95" fill="#6A4A2A"/><circle cx="35" cy="40.4" r=".95" fill="#6A4A2A"/><path d="M30.4 43 Q32 44.4 33.6 43" stroke="#6A4A2A" stroke-width=".9" fill="none" stroke-linecap="round"/>
 <path d="M28 34.6 L30.6 30.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
 <path d="${star(52,41,6.6)}" fill="url(#${u}p)"/>
 <path d="M50 38.4 L51.4 36.4" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
 <g class="g22fx"><path d="${spark(57,24,2.8)}" fill="#FFE27A"/><path d="${spark(20,52,2.4)}" fill="#fff"/><path d="${spark(44,54,1.8)}" fill="#FFE27A"/></g>`,

/* 18 備用：愛心小盆栽（房間：粉紅小盆子，長出愛心形狀的葉子，頂端一朵愛心花） */
sp_plant:u=>`<defs>${lg(u+'o','#FFC4DA','#F27DB0',1,0)}${lg(u+'l','#B4EC8A','#4FB35A',1,1)}${lg(u+'h','#FFB3D1','#FF5A92',1,1)}</defs>
 ${shadow(32,18)}
 <path d="M32 40 Q31 30 32 20" stroke="#4FB35A" stroke-width="2.2" fill="none" stroke-linecap="round"/>
 <path d="M31.6 34 Q26 32 22 28 M32.4 29 Q38 27 42 22.6" stroke="#4FB35A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
 ${[[20,27.4,-35,7.4],[44,21.6,30,7.4],[25.6,37.4,-60,6],[39,35.6,55,6]].map(([x,y,r,s])=>`<path transform="translate(${x} ${y}) rotate(${r}) scale(${f(s/8)})" d="M0 6 Q-8 0 -6 -5 Q-3.4 -8.6 0 -4.4 Q3.4 -8.6 6 -5 Q8 0 0 6Z" fill="url(#${u}l)"/>`).join('')}
 <path transform="translate(32 13)" d="M0 7 Q-9.4 0 -7 -5.6 Q-4 -9.6 0 -5 Q4 -9.6 7 -5.6 Q9.4 0 0 7Z" fill="url(#${u}h)"/>
 ${hl(28.6,9.6,1.4,2.4,-30,.7)}
 <path d="M18 44 H46 L43 58 Q42.6 60 40.4 60 H23.6 Q21.4 60 21 58Z" fill="url(#${u}o)"/>
 <rect x="16" y="40" width="32" height="6" rx="3" fill="#FFB3CF"/>
 <ellipse cx="32" cy="41" rx="13" ry="1.6" fill="#7A5232"/>
 <path d="M32 56 Q27.4 52.8 28.6 50.6 Q30 48.8 32 50.8 Q34 48.8 35.4 50.6 Q36.6 52.8 32 56Z" fill="#fff" opacity=".9"/>
 <path d="M22 47 Q21.6 52 23.4 57" stroke="#FFE3EE" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/>
 <g class="g22fx"><path transform="translate(52 10)" d="M0 3.4 Q-4.6 0 -3.4 -2.8 Q-2 -4.6 0 -2.4 Q2 -4.6 3.4 -2.8 Q4.6 0 0 3.4Z" fill="#FF8FB8" opacity=".85"/><path transform="translate(11 16)" d="M0 2.6 Q-3.4 0 -2.6 -2 Q-1.4 -3.4 0 -1.8 Q1.4 -3.4 2.6 -2 Q3.4 0 0 2.6Z" fill="#FFB3D1" opacity=".85"/><path d="${spark(55,30,2.6)}" fill="#FFE27A"/></g>`
};
/*ART22-END*/

/* ---------- 1. 圖：彩色、剪影 ---------- */
// 剪影：拿掉地上影子和旁邊的閃光（<g class="g22fx">），其餘的 fill／stroke 全部換成同一個顏色（不用 SVG 濾鏡，iOS 也一樣）
function stripFx(s){let i;while((i=s.indexOf('<g class="g22fx">'))>=0){let d=0,j=i;const re=/<g[\s>]|<\/g>/g;re.lastIndex=i;let m;
  while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0){j=m.index+4;break}}else d++}
  if(d!==0){s=s.slice(0,i);break}s=s.slice(0,i)+s.slice(j)}return s}
const inner=id=>{const a=ART[id];return a?a(uid()):''};
const svgOf=(id,attr)=>`<svg viewBox="0 0 64 64" ${attr||''} aria-hidden="true">${inner(id)}</svg>`;
function silInner(id,c){let s=inner(id);s=s.replace(/<ellipse cx="[\d.]+" cy="60\.5"[^>]*\/>/g,'').replace(/<ellipse cx="32" cy="59\.6"[^>]*\/>/g,'');s=stripFx(s);
 return s.replace(/(fill|stroke)="(?!none)[^"]*"/g,(m,a)=>a+'="'+c+'"').replace(/ (?:fill-|stroke-)?opacity="[^"]*"/g,'')}
const silOf=(id,c,attr)=>`<svg viewBox="0 0 64 64" ${attr||''} aria-hidden="true">${silInner(id,c||'#8C7CE6')}</svg>`;
const ARTO={},SILO={};
Object.keys(ART).forEach(id=>{Object.defineProperty(ARTO,id,{enumerable:true,get:()=>svgOf(id)});Object.defineProperty(SILO,id,{enumerable:true,get:()=>silOf(id)})});

/* ---------- 2. 遊戲開不開、送哪一樣 ---------- */
const SCR={farm:'farm',pet:'pethouse',chef:'chef5',room:'room',coloring:'coloring',globe:'globe8',photo:'photo8'};
const NEEDCH={farm:23,chef:33,globe:41,photo:44};          // 第幾章（1 起算）完成才打開；寵物小屋、房間、塗色本一開始就有
const LVS=[3,6,9];
const keyOf=(ch,lv)=>ch+'-'+lv;
const appCh=n=>{try{return typeof window.__appOpen==='function'?!!window.__appOpen(n-1):true}catch(e){return true}};
function gameOpen(game){try{const scr=SCR[game];if(!scr||typeof SCREENS[scr]!=='function')return false;
 const n=NEEDCH[game]||0;if(n&&((S.chDone||0)<n||!appCh(n)))return false;
 const m=game==='globe'?window.__G8:game==='photo'?window.__PH8:game==='chef'?window.__P5:null;
 if(m&&typeof m.gate==='function'){const st=game==='chef'?m.gate('chef5'):m.gate();if(st)return false}
 return true}catch(e){return false}}
function resolve(ch,lv){const it=G22.forLevel(ch,lv);if(!it)return null;
 if(!G22.has(it.id)&&gameOpen(it.game))return it;
 return G22.SPARE.find(x=>!G22.has(x.id))||null}
function give(id,key){const g=G22.st();if(!g.own[id])g.own[id]=Date.now();g.fresh[id]=1;if(key)g.got[key]=id;try{save2()}catch(e){}return G22.byId(id)}
const GN=game=>(G22.GAMENAME&&G22.GAMENAME[game])||'遊樂園';
const progOf=ch=>{const c=ch-1;let p=0;try{p=(S.progs&&S.progs[c])||0;if(S.ch===c)p=Math.max(p,S.prog||0);if((S.chDone||0)>=ch)p=Math.max(p,10)}catch(e){}return p};
const hasGifts=ch=>G22.forChapter(ch).length>0;

/* ---------- 3. 台詞（lines/v22_giftcore.tsv） ---------- */
const T={open:'哇，大禮物！點一下，打開它！',got:'拿到遊樂園的新東西了！',go:'去遊樂園試試看吧！',keep:'東西會一直留著，想玩的時候再去也可以喔！',
 pot:'還送你一個小花盆，馬上就能種！',into:g=>`放進${GN(g)}了！`,done:'玩好了嗎？點這裡，回去繼續冒險！',back:'回來了！我們繼續冒險吧！',
 left:n=>`再過${['','一','兩','三'][n]||n}關，就有遊樂園的新東西喔！`,all:'這一章的遊樂園禮物都拿到了！',name:it=>it.name+'！',bf:'遊樂園有新東西喔！'};
const sayP=a=>{try{return say(a)}catch(e){return Promise.resolve()}};
// 畫面上沒有那句字的時候，用遊戲原本的小提示條（toast）顯示同一句（沒錄音也看得到）
const sayT=t=>{try{toast(t)}catch(e){}return sayP([t])};
const RM=()=>{try{return !!reduced||!!S.lite}catch(e){return false}};
// 正在念嗎（「玩好了嗎」不要打斷遊戲自己的話）
let SB={n:0,on:false,t:0};
{const _say=say;say=function(){const r=_say.apply(this,arguments);try{const n=++SB.n;SB.on=true;SB.t=Date.now();Promise.resolve(r).then(()=>{if(SB.n===n)SB.on=false},()=>{if(SB.n===n)SB.on=false})}catch(e){}return r}}
const speaking=()=>SB.on&&Date.now()-SB.t<12000;
const cn=n=>{const D='零一二三四五六七八九';if(n<=10)return n===10?'十':D[n];if(n<20)return '十'+(n%10?D[n%10]:'');return D[Math.floor(n/10)]+'十'+(n%10?D[n%10]:'')};

/* ---------- 4. 小圖：摩天輪吊牌、禮物盒、光芒、遊戲小圖示 ---------- */
const FW=['#FF6F91','#FFD24D','#6FD3A8','#7FB8FF','#B99CFF','#FFB35C'];
const ferris=(r=6.4)=>[0,60,120,180,240,300].map((a,i)=>{const x=f(r*Math.cos(a*Math.PI/180)),y=f(r*Math.sin(a*Math.PI/180));return `<path d="M0 0 L${x} ${y}" stroke="#FF8FB8" stroke-width="1"/><circle cx="${x}" cy="${y}" r="1.9" fill="${FW[i]}"/>`}).join('');
const TAGSVG=()=>`<svg viewBox="-12 -12 24 24" aria-hidden="true"><circle r="10" fill="#FFF8E8"/><circle r="6.4" fill="none" stroke="#FF8FB8" stroke-width="1.6"/>${ferris()}<path d="M-3 10 L0 3 L3 10" stroke="#C8962A" stroke-width="1.6" fill="none"/></svg>`;
// 盒子分兩層：後面（打開的蓋子）在物品後面，前面（盒身＋還沒打開的蓋子）在物品前面
function boxBack(u){return `<svg viewBox="0 -16 120 108" aria-hidden="true"><defs><linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D2B4FF"/><stop offset="1" stop-color="#9A6CF0"/></linearGradient>
 <linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE9A0"/><stop offset=".5" stop-color="#FFD24D"/><stop offset="1" stop-color="#F0B030"/></linearGradient></defs>
 <g class="g22lidO"><path d="M14 30 L6 8 L64 2 L70 26Z" fill="url(#${u}l)" opacity=".95"/><path d="M36 28 L30 5.6 L42 4.4 L48 27Z" fill="url(#${u}r)"/></g>
 <path d="M12 30 H108 V40 H12Z" fill="#5A34B0"/></svg>`}
function boxFront(u){return `<svg viewBox="0 -16 120 108" aria-hidden="true"><defs><linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B98CFF"/><stop offset="1" stop-color="#7A4FD8"/></linearGradient>
 <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCC4FF"/><stop offset="1" stop-color="#A57CF4"/></linearGradient>
 <linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE9A0"/><stop offset=".5" stop-color="#FFD24D"/><stop offset="1" stop-color="#F0B030"/></linearGradient></defs>
 <path d="M12 34 H108 V80 Q108 88 100 88 H20 Q12 88 12 80Z" fill="url(#${u}a)"/>
 <path d="M8 28 H112 Q114 28 114 30 V38 Q114 40 112 40 H8 Q6 40 6 38 V30 Q6 28 8 28Z" fill="#C7A6FF"/>
 <path d="M10 30 H110" stroke="#fff" stroke-width="2" opacity=".5" stroke-linecap="round"/>
 <rect x="52" y="28" width="16" height="60" fill="url(#${u}r)"/>
 ${[[24,52],[34,72],[86,50],[96,72],[24,78],[88,82]].map(([x,y])=>`<path d="${star(x,y,4)}" fill="#FFE9A0" opacity=".8"/>`).join('')}
 <path d="M60 34 Q74 46 84 44" stroke="#C8962A" stroke-width="1.4" fill="none"/>
 <g transform="translate(88 46)"><circle r="11" fill="#FFF8E8" stroke="#FFD24D" stroke-width="2"/><circle r="6.4" fill="none" stroke="#FF8FB8" stroke-width="1.6"/>${ferris()}<path d="M-3 9 L0 3 L3 9" stroke="#C8962A" stroke-width="1.4" fill="none"/></g>
 <path d="M16 40 Q15 62 18 82" stroke="#fff" stroke-width="3" fill="none" opacity=".3" stroke-linecap="round"/>
 <g class="g22lidC"><path d="M4 16 Q4 12 8 12 H112 Q116 12 116 16 V34 Q116 38 112 38 H8 Q4 38 4 34Z" fill="url(#${u}c)"/>
  <path d="M8 15 H112" stroke="#fff" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>
  <rect x="52" y="12" width="16" height="26" fill="url(#${u}r)"/>
  <path d="M60 12 Q44 -12 34 -4 Q30 4 60 12Z M60 12 Q76 -12 86 -4 Q90 4 60 12Z" fill="url(#${u}r)"/>
  <path d="M60 12 Q47 -5 39 -2" stroke="#FFF3C4" stroke-width="1.6" fill="none" opacity=".8" stroke-linecap="round"/>
  <circle cx="60" cy="11" r="5" fill="#F0B030"/></g></svg>`}
const RAYS=u=>`<svg viewBox="-50 -50 100 100" aria-hidden="true"><defs><radialGradient id="${u}" cx="0" cy="0" r="50" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF6D0" stop-opacity=".95"/><stop offset=".5" stop-color="#FFE27A" stop-opacity=".45"/><stop offset="1" stop-color="#FFE27A" stop-opacity="0"/></radialGradient></defs>${Array.from({length:12},(_,i)=>`<path d="M0 0 L${f(50*Math.cos((i*30-5)*Math.PI/180))} ${f(50*Math.sin((i*30-5)*Math.PI/180))} L${f(50*Math.cos((i*30+5)*Math.PI/180))} ${f(50*Math.sin((i*30+5)*Math.PI/180))}Z" fill="url(#${u})"/>`).join('')}</svg>`;
// 遊戲小圖示：用遊樂園卡片同一張圖（m99zx7）；沒有就用主程式的 ICONART
const ICOK={farm:'i:farmpot',pet:'🏠',chef:'i:chef5',room:'🛏️',coloring:'🎨',globe:'i:globe8',photo:'i:photo8'};
function gameIcon(game){try{const z=window.__z7;if(z&&typeof z.parkIcon==='function'){const s=z.parkIcon(SCR[game]);if(s)return s}}catch(e){}
 try{return art(ICOK[game])||''}catch(e){return ''}}
const SMALLBOX=`<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#FFF8E8" stroke="#FFD98A" stroke-width="2"/><rect x="9" y="17" width="22" height="15" rx="2.6" fill="#B98CFF"/><rect x="7.4" y="12.6" width="25.2" height="6.4" rx="2" fill="#D2B4FF"/><rect x="18" y="12.6" width="4" height="19.4" fill="#FFD24D"/><path d="M20 12.6 Q13 4 10.4 8.6 Q9.4 12.6 20 12.6Z M20 12.6 Q27 4 29.6 8.6 Q30.6 12.6 20 12.6Z" fill="#FFD24D"/></svg>`;
const MAPIC=()=>{try{return ICON.map('#FFD98A')}catch(e){return ''}};

/* ---------- 5. 過關：第 3、6、9 關第一次過關改開大禮物 ---------- */
let PEND=null;
function pendingNow(){try{
 if(S.pmode||S.screen!=='stage')return null;
 const ch=S.ch+1,lv=S.level+1;if(ch<41||!LVS.includes(lv))return null;
 if(S.level!==S.prog)return null;                        // 只有第一次過關（重玩照舊）
 const L=LEVELS[S.level];if(!L||L.reward==='chapter')return null;
 if(G22.st().got[keyOf(ch,lv)])return null;
 const it=resolve(ch,lv);return it?{ch,lv,it}:null}catch(e){console.log('g22 pend',e);return null}}
{const _pr=pickReward;pickReward=function(){const p=pendingNow();if(p&&typeof REWARD.g22==='function'){PEND=p;return 'g22'}return _pr.apply(this,arguments)}}
const parkBlocked=()=>{try{const P=window.__p19;return !!(P&&typeof P.blocked==='function'&&P.blocked('stage'))}catch(e){return false}};
const J={scr:null,game:null,pending:false,active:false,t:0,back:false,said:false,tm:0};
REWARD.g22=function(card,finish){const P=PEND;PEND=null;if(!P||!card||!card.isConnected)return REWARD.chest(card,finish);
 const it=P.it,key=keyOf(P.ch,P.lv),calm=RM();const u=uid();
 const cd=card.closest('.card');if(cd)cd.classList.add('g22card');card.classList.add('g22body');
 card.innerHTML=`<div class="g22l"><div class="g22tag">${TAGSVG()}遊樂園的新東西！</div>
  <button class="g22stage${calm?' calm':''}" type="button" aria-label="打開大禮物"><span class="g22glow"></span><span class="g22rays">${RAYS(u+'y')}</span>
   <span class="g22back">${boxBack(u+'b')}</span><span class="g22item">${svgOf(it.id)}</span><span class="g22front">${boxFront(u+'f')}</span></button>
  <p class="g22tap">點一下，打開它！</p></div><div class="g22r" hidden></div>`;
 const st=$('.g22stage',card),r=$('.g22r',card);
 sayP([T.open]);
 let opened=false;
 const open=()=>{if(opened||!card.isConnected)return;opened=true;give(it.id,key);
  const canGo=gameOpen(it.game)&&!parkBlocked();
  try{hush()}catch(e){}sfx('gem');st.classList.add('open');st.setAttribute('aria-label',it.name);st.disabled=true;
  const tp=$('.g22tap',card);if(tp)tp.remove();
  setTimeout(()=>{try{burstEl(st,46)}catch(e){}},calm?0:420);
  r.innerHTML=`<h2 class="g22name">${it.name}</h2>
   <p class="g22where"><span class="gi">${gameIcon(it.game)}</span><span>放進<b>${GN(it.game)}</b>了！${it.pot?'<br>還送你一個小花盆，馬上就能種！':''}</span></p>
   ${canGo?'':`<p class="g22keep">${T.keep}</p>`}<div class="g22btns">${canGo?`<button class="btn g22go" type="button">去遊樂園試試看</button><button class="btn2 g22cont" type="button">繼續冒險</button>`:`<button class="btn g22cont" type="button">繼續冒險</button>`}</div>`;
  setTimeout(()=>{if(!card.isConnected)return;r.hidden=false;void r.offsetWidth;r.classList.add('in')},calm?0:700);
  sayP([T.got,T.name(it),T.into(it.game)].concat(it.pot?[T.pot]:[],[canGo?T.go:T.keep]));
  let left=false;
  const go1=$('.g22go',r),c1=$('.g22cont',r);
  if(go1)go1.onclick=()=>{if(left)return;left=true;sfx('pop');try{hush()}catch(e){}
   J.scr=SCR[it.game];J.game=it.game;J.pending=true;J.t=Date.now();J.said=false;finish()};
  if(c1)c1.onclick=()=>{if(left)return;left=true;sfx('pop');J.pending=false;if(canGo)sayT(T.keep);finish()}};
 st.onclick=open;
 // 點卡片其他地方也可以打開（過關卡 0.4 秒內不收點擊，patch92）
 card.addEventListener('click',e=>{if(!opened&&!(e.target.closest&&e.target.closest('button')))open()});
};

/* ---------- 6. 跳到遊戲、回去繼續冒險 ---------- */
const OUT=['park','title','world','map','chapters','chend','story','story19','guide','finale','wardrobe','rest','limit','stage','practice'];
{const _go=go;go=function(name){try{if(J.pending&&name==='map'){J.pending=false;if(Date.now()-J.t<20000&&J.scr&&typeof SCREENS[J.scr]==='function'){J.st={ch:S.ch,prog:S.prog,wf:S.walkFrom};J.active=true;J.at=Date.now();S.from='park';return _go.call(this,J.scr)}}}catch(e){console.log('g22 go',e)}
 return _go.apply(this,arguments)}}
function retBtn(){return document.getElementById('g22ret')}
function addRet(){if(retBtn())return;const host=document.querySelector('#bar .lefty')||document.getElementById('bar');if(!host)return;
 const b=document.createElement('button');b.id='g22ret';b.type='button';b.className='g22ret';b.innerHTML=`<span class="ic">${MAPIC()}</span><span>回去繼續冒險</span>`;b.setAttribute('aria-label','回去繼續冒險');
 b.onclick=e=>{e.stopPropagation();sfx('pop');try{hush()}catch(_){}J.active=false;J.back=true;remRet();go('map')};
 host.insertBefore(b,host.firstChild);document.body.classList.add('g22retOn');armDone()}
function remRet(){const b=retBtn();if(b)b.remove();document.body.classList.remove('g22retOn');clearTimeout(J.tm);const t=document.getElementById('g22tip');if(t)t.remove()}
function tipAt(b,text){let t=document.getElementById('g22tip');if(t)t.remove();t=document.createElement('div');t.id='g22tip';t.className='g22tip';t.setAttribute('aria-hidden','true');t.textContent=text;document.body.appendChild(t);
 // 放在鈕的右邊（上方列空的地方，不蓋住遊戲的「回遊樂園」）；右邊太窄才放下面
 const r=b.getBoundingClientRect(),room=innerWidth-r.right-20;
 if(room>=170){t.classList.add('side');t.style.maxWidth=Math.min(340,room)+'px';const h=t.offsetHeight;t.style.left=(r.right+12)+'px';t.style.top=Math.max(4,r.top+r.height/2-h/2)+'px'}
 else{const w=t.offsetWidth;t.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2))+'px';t.style.top=(r.bottom+10)+'px';t.style.setProperty('--ax',Math.max(14,Math.min(w-14,r.left+r.width/2-parseFloat(t.style.left)))+'px')}
 requestAnimationFrame(()=>t.classList.add('on'));setTimeout(()=>{t.classList.remove('on');setTimeout(()=>t.remove(),400)},6500)}
// 玩了一陣子（約 40 秒）、沒在念、沒在點的時候，提醒一次「玩好了嗎？」，鈕發亮
let lastTouch=0;document.addEventListener('pointerdown',()=>{lastTouch=Date.now()},true);
function armDone(){clearTimeout(J.tm);if(J.said)return;const t0=Date.now();
 const chk=()=>{if(!J.active||!retBtn()||J.said)return;if(Date.now()-t0>180000)return;
  const rb=retBtn();if(going||speaking()||!rb||!rb.getClientRects().length||Date.now()-lastTouch<3500||document.querySelector('#screen .overlay, body > .overlay, #rv181')){J.tm=setTimeout(chk,2500);return}
  J.said=true;const b=retBtn();if(b){b.classList.add('g22hi');tipAt(b,T.done)}sayP([T.done])};
 J.tm=setTimeout(chk,40000)}
{const _show=show;show=function(name){try{if(name==='map'&&J.st){const st=J.st;J.st=null;if(S.ch===st.ch&&S.prog===st.prog&&S.walkFrom==null&&st.wf!=null)S.walkFrom=st.wf}}catch(e){}
 const r=_show.apply(this,arguments);try{
  if(J.active){if(name==='park'||OUT.includes(name)){J.active=false;remRet()}else addRet()}else if(retBtn())remRet();
  if(name==='map'&&J.back){J.back=false;setTimeout(()=>{if(S.screen==='map'&&!document.querySelector('#screen .overlay'))sayT(T.back)},700)}
  if(name==='map'||name==='world')bfLater(name);
 }catch(e){console.log('g22 show',e)}return r}}

/* ---------- 7. 章節地圖：禮物牌 ---------- */
function chState(ch){const g=G22.st(),p=progOf(ch);
 const slots=LVS.map(lv=>{const id=g.got[keyOf(ch,lv)];const it=id?G22.byId(id):(resolve(ch,lv)||G22.forLevel(ch,lv));return {lv,got:!!id,it}});
 const nx=slots.find(s=>!s.got&&s.lv>p)||null;
 return {p,slots,nx,lit:nx?Math.max(0,Math.min(3,p-(nx.lv-3))):3,left:nx?nx.lv-p:0}}
function plaqueHTML(ch){const S0=chState(ch),u=uid(),R=38,C=2*Math.PI*R,seg=C/3;
 const ring=`<svg class="rg" viewBox="0 0 84 84" aria-hidden="true"><defs><radialGradient id="${u}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF3C4" stop-opacity=".75"/><stop offset=".6" stop-color="#FFD98A" stop-opacity=".25"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient></defs>
  <circle cx="42" cy="42" r="40" fill="url(#${u})" opacity="${(.25+S0.lit*.25).toFixed(2)}"/><circle cx="42" cy="42" r="${R}" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="5"/>
  ${[0,1,2].map(k=>`<circle cx="42" cy="42" r="${R}" fill="none" stroke="${k<S0.lit?'#FFD24D':'rgba(255,217,138,.28)'}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${(seg-7).toFixed(1)} ${(C-seg+7).toFixed(1)}" stroke-dashoffset="${(-k*seg+C/4-3.5).toFixed(1)}"/>`).join('')}</svg>`;
 let mid;if(S0.nx&&S0.nx.it)mid=`<div class="sl">${silOf(S0.nx.it.id,'#8C7CE6')}</div><b>?</b>`;
 else{const last=[...S0.slots].reverse().find(s=>s.got&&s.it);mid=last?`<div class="sl">${svgOf(last.it.id)}</div>`:`<b>★</b>`}
 const row=S0.slots.map(s=>`<span class="${s.got?'got':''}">${s.it?(s.got?svgOf(s.it.id):silOf(s.it.id,'#8C7CE6')):''}<i>${s.lv}</i></span>`).join('');
 return {html:`<div class="nx${S0.nx?'':' all'}">${ring}${mid}</div><div class="row">${row}</div>`,st:S0}}
const rectOf=e=>{try{const r=e.getBoundingClientRect();return r.width||r.height?{l:r.left,t:r.top,r:r.right,b:r.bottom}:null}catch(_){return null}};
const ovl=(a,b)=>Math.max(0,Math.min(a.r,b.r)-Math.max(a.l,b.l))*Math.max(0,Math.min(a.b,b.b)-Math.max(a.t,b.t));
function placePlaque(){try{
 const old=document.getElementById('g22plq'),oldB=document.getElementById('g22nb');
 const ch=S.ch+1;const svg=document.querySelector('#screen .mapsvg');
 if(S.screen!=='map'||S.pmode||!svg||ch<41||!hasGifts(ch)){if(old)old.remove();if(oldB)oldB.remove();return}
 const host=svg.parentElement;let pq=old;
 if(!pq||pq.parentElement!==host){if(pq)pq.remove();pq=document.createElement('button');pq.type='button';pq.id='g22plq';pq.className='g22plq';host.appendChild(pq);
  pq.onclick=e=>{e.stopPropagation();sfx('pop');const s=chState(S.ch+1);try{hush()}catch(_){}sayT(s.nx?T.left(s.left):T.all);pq.classList.remove('tapped');void pq.offsetWidth;pq.classList.add('tapped')}}
 const P=plaqueHTML(ch);if(pq.__h!==P.html.replace(/g22[0-9a-z]+/g,'')){pq.innerHTML=P.html;pq.__h=P.html.replace(/g22[0-9a-z]+/g,'')}
 pq.setAttribute('aria-label',P.st.nx?T.left(P.st.left):T.all);
 // 找位置：不擋關卡圓點和章名
 let sv=rectOf(svg);const scr=rectOf(document.getElementById('screen'))||sv;if(!sv)return;
 try{const vb=svg.viewBox&&svg.viewBox.baseVal;const par=svg.getAttribute('preserveAspectRatio')||'';if(vb&&vb.width&&!/slice|none/.test(par)){const W0=sv.r-sv.l,H0=sv.b-sv.t,k=Math.min(W0/vb.width,H0/vb.height),cw=vb.width*k,chh=vb.height*k;
  sv={l:sv.l,t:sv.t+(H0-chh)/2,r:sv.r,b:sv.t+(H0+chh)/2}}}catch(e){}   // 地圖背景左右會畫到 viewBox 外面，上下不會
 const area={l:Math.max(sv.l,scr.l)+6,t:Math.max(sv.t,scr.t)+6,r:Math.min(sv.r,scr.r,innerWidth)-6,b:Math.min(sv.b,scr.b,innerHeight)-6};
 const w=pq.offsetWidth,h=pq.offsetHeight;
 const nodes=[...svg.querySelectorAll('.node'),...document.querySelectorAll('.ub22:not([hidden])')].map(rectOf).filter(Boolean).map(r=>({l:r.l-4,t:r.t-4,r:r.r+4,b:r.b+4}));
 const banner=[...svg.querySelectorAll('text.banner')].map(t=>{const a=rectOf(t);const pr=t.previousElementSibling&&t.previousElementSibling.tagName==='rect'?rectOf(t.previousElementSibling):null;return pr||a}).filter(Boolean);
 const tok=rectOf(document.getElementById('token')||document.createElement('i'));
 const n10e=svg.querySelector('.node[data-i="9"] .nbody circle'),n10=n10e?rectOf(n10e):null;
 // 在地圖範圍裡每 8 點試一個位置：蓋到圓點（含名字）最重、蓋到章名次之、蓋到主角一點點；都不蓋的話，離「偏好位置」最近的
 // 偏好位置：橫的畫面在左上角（樣張平板），直的畫面在第 10 關右邊（樣張手機）
 const wide=(area.r-area.l)>(area.b-area.t);let ax=area.l,ay=area.t;
 if(!wide&&n10){ax=n10.r+8;ay=(n10.t+n10.b)/2-h/2+4}
 let best=null;const X1=area.r-w,Y1=area.b-h;
 for(let y=area.t;y<=Math.max(area.t,Y1)+.1;y+=8)for(let x=area.l;x<=Math.max(area.l,X1)+.1;x+=8){const R={l:x,t:y,r:x+w,b:y+h};
  let sc=0;for(const n of nodes)sc+=ovl(R,n)*10;for(const n of banner)sc+=ovl(R,n)*4;if(tok)sc+=ovl(R,tok)*.25;
  sc+=Math.hypot(x-ax,y-ay)*.5;if(!best||sc<best.sc)best={x,y,sc}}
 if(!best)best={x:area.l,y:area.t};
 const op=pq.offsetParent||document.body,o=op.getBoundingClientRect();
 pq.style.left=(best.x-o.left+op.scrollLeft)+'px';pq.style.top=(best.y-o.top+op.scrollTop)+'px';pq.classList.add('on');
 // 下一份禮物那一關：圓點右下角小禮物盒
 const nx=P.st.nx;const ne=nx?svg.querySelector(`.node[data-i="${nx.lv-1}"] .nbody circle`):null;
 if(!ne){if(oldB)oldB.remove();return}
 let nb=oldB;if(!nb||nb.parentElement!==host){if(nb)nb.remove();nb=document.createElement('span');nb.id='g22nb';nb.className='g22nb';nb.setAttribute('aria-hidden','true');nb.innerHTML=SMALLBOX;host.appendChild(nb)}
 const rr=rectOf(ne),s=nb.offsetWidth||30,o2=(nb.offsetParent||document.body).getBoundingClientRect();
 nb.style.left=(rr.r-s*.75-o2.left)+'px';nb.style.top=(rr.b-s*.8-o2.top)+'px';
}catch(e){console.log('g22 plaque',e)}}
{const _map=SCREENS.map;SCREENS.map=function(){const r=_map.apply(this,arguments);try{placePlaque();[120,450,1300].forEach(t=>setTimeout(()=>{if(S.screen==='map')placePlaque()},t))}catch(e){console.log('g22 map',e)}return r}}
addEventListener('resize',()=>setTimeout(()=>{if(S.screen==='map')placePlaque()},350));

/* ---------- 8. 補發（2.2 以前已經過的關） ---------- */
function bfScan(){const g=G22.st(),out=[];
 const chs=[...new Set(G22.ITEMS.map(x=>x.ch))].sort((a,b)=>a-b);
 for(const ch of chs){const p=progOf(ch);const list=[];
  for(const lv of LVS){const k=keyOf(ch,lv);if(g.got[k]||p<lv)continue;const it=resolve(ch,lv);if(!it||list.some(x=>x.it.id===it.id))continue;list.push({k,it})}
  if(list.length)out.push({ch,list})}
 return out}
const BF={ov:null,tok:0};
const bfBusy=()=>!!(BF.ov&&BF.ov.isConnected);   // 小卡被換畫面拿掉了也不會卡住
function bfLater(name){const tok=++BF.tok;let n=0;
 const tryIt=()=>{if(tok!==BF.tok||S.screen!==name||bfBusy())return;
  if(going||document.querySelector('#screen .overlay, body > .overlay, .stage .overlay, #rv181, .gztour')){if(++n<20)setTimeout(tryIt,800);return}
  let q;try{q=bfScan()}catch(e){q=[]}if(!q.length)return;n=0;bfShow(q[0],()=>{if(tok===BF.tok&&S.screen===name)setTimeout(tryIt,350)})};
 setTimeout(tryIt,1100)}
function bfShow(B,done){const host=document.getElementById('screen');if(!host)return;
 // 拿出來的時候就記下（got），每章只出一次
 const items=B.list.slice(0,3).map(x=>{give(x.it.id,x.k);return x.it});B.list.slice(3).forEach(x=>give(x.it.id,x.k));
 const ov=overlay(host,`<div class="card g22bf"><div class="g22tag">${TAGSVG()}第${cn(B.ch)}章的禮物</div><h2>遊樂園有新東西！</h2>
  <div class="g22bfrow">${items.map(it=>`<div class="g22bfi"><span class="pic">${svgOf(it.id)}</span><b>${it.name}</b><small><span class="gi">${gameIcon(it.game)}</span>${GN(it.game)}</small></div>`).join('')}</div>
  <button class="btn g22ok" type="button">好棒！</button></div>`);
 ov.classList.add('g22bfov');BF.ov=ov;
 sfx('gem');try{burstEl($('.g22bfrow',ov),30)}catch(e){}sayP([T.bf]);
 try{if(S.screen==='map')placePlaque()}catch(e){}
 let shut=false;const close=()=>{if(shut)return;shut=true;sfx('pop');try{hush()}catch(_){}ov.classList.add('out');setTimeout(()=>{ov.remove();BF.ov=null;try{if(S.screen==='map')placePlaque()}catch(e){}done&&done()},RM()?0:260)};
 $('.g22ok',ov).onclick=close}

/* ---------- 9. 給物品同事、測試用 ---------- */
Object.assign(G22,{ART:ARTO,SIL:SILO,svg:svgOf,sil:silOf,inner,silInner,give,resolve,gameOpen,SCR,LVS,keyOf,
 core:{ver:'2026-11-27',J,T,pendingNow,chState,placePlaque,bfScan,bfLater,progOf,icon:gameIcon}});

/* ---------- 10. 樣式（動畫只用移動、淡入、亮光） ---------- */
const css=document.createElement('style');css.id='g22corecss';css.textContent=`
.card.g22card{width:min(560px,100%);box-sizing:border-box;padding:14px 22px 18px!important}
.g22body{display:flex!important;flex-direction:column;align-items:center;gap:4px;width:100%;min-height:0}
.g22body .g22l,.g22body .g22r{display:flex;flex-direction:column;align-items:center;gap:4px;width:100%}
.g22body .g22r[hidden]{display:none}
.g22tag{display:inline-flex;align-items:center;gap:6px;background:#FFE9A8;color:#6A3A00;border-radius:999px;padding:3px 14px;font-weight:700;font-size:17px;margin-top:6px;line-height:1.3}
.g22tag svg{width:22px;height:22px;flex:none}
.g22stage{position:relative;z-index:0;display:block;width:280px;height:232px;margin:-2px 0 0;padding:0;border:0;background:none;color:inherit;font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.g22stage:disabled{cursor:default}
.g22stage>span{position:absolute;display:block;pointer-events:none}
.g22body .g22r{position:relative;z-index:1}
.g22stage .g22glow{left:50%;top:48%;width:250px;height:250px;margin:-125px 0 0 -125px;border-radius:50%;background:radial-gradient(circle,rgba(255,236,160,.85) 0,rgba(255,214,110,.35) 38%,rgba(255,214,110,0) 68%);opacity:.45;transition:opacity .6s}
.g22rays{left:50%;top:40%;width:330px;height:330px;margin:-165px 0 0 -165px;opacity:0;transition:opacity .8s .1s}
.g22rays svg,.g22back svg,.g22front svg,.g22item svg{width:100%;height:auto;display:block}
.g22back,.g22front{left:50%;bottom:-4px;width:136px;margin-left:-68px}
.g22front{animation:g22bob 1.6s ease-in-out infinite}
.g22back{opacity:0}
.g22item{left:50%;top:-2px;width:158px;margin-left:-79px;filter:drop-shadow(0 6px 10px rgba(40,20,90,.35));opacity:0;transform:translateY(96px);transition:transform .8s cubic-bezier(.2,.8,.3,1) .18s,opacity .5s .18s}
.g22lidC{transition:transform .55s cubic-bezier(.3,.7,.4,1),opacity .45s .1s}
.g22stage.open .g22glow{opacity:1;animation:g22pulse 2.2s ease-in-out .9s infinite}
.g22stage.open .g22rays{opacity:.9}
.g22stage.open .g22front{animation:none}
.g22stage.open .g22back{opacity:1;transition:opacity .3s .2s}
.g22stage.open .g22lidC{transform:translate(-26px,-46px) rotate(-14deg);opacity:0}
.g22stage.open .g22item{opacity:1;transform:none}
.card.g22card .g22tap{margin:2px 0 0;color:#FFE27A;font-size:19px;font-weight:700;animation:g22pulse 1.6s ease-in-out infinite}
@keyframes g22bob{50%{transform:translateY(-6px)}}
@keyframes g22pulse{50%{opacity:.6}}
.g22r{opacity:0;transform:translateY(10px);transition:opacity .45s,transform .45s}
.g22r.in{opacity:1;transform:none}
.card.g22card .g22name{margin:2px 0 0;font-size:34px;color:#FFE27A;letter-spacing:2px;text-shadow:0 2px 0 rgba(60,30,120,.6);line-height:1.2;text-align:center}
.card.g22card .g22where{display:flex;align-items:center;gap:8px;margin:0;color:#F4EEFF;font-size:18px;line-height:1.35;text-align:left}
.card.g22card .g22where .gi,.g22bfi .gi{flex:0 0 auto;width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.12);display:grid;place-items:center}
.card.g22card .g22where .gi svg{width:36px;height:36px}
.card.g22card .g22where b{color:#FFE27A;font-weight:700}
.g22btns{display:flex;gap:12px;justify-content:center;width:100%;margin-top:10px;flex-wrap:wrap}
.g22btns .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:24px;padding:12px 26px}
.g22btns .btn2{font-size:20px;padding:12px 22px}
.g22stage.calm .g22front,.g22stage.calm .g22glow,.card.g22card .g22tap.calm{animation:none}
.g22stage.calm .g22item,.g22stage.calm .g22lidC,.g22stage.calm .g22back,.g22stage.calm .g22rays{transition:none}
@media (prefers-reduced-motion:reduce){.g22front,.card.g22card .g22tap,.g22stage.open .g22glow{animation:none!important}.g22item,.g22lidC,.g22r{transition:opacity .2s!important}}
/* 手機直放：卡片窄、鈕上下排 */
@media (max-width:520px){
 .card.g22card{padding:10px 12px 14px!important}
 .g22stage{width:230px;height:196px}.g22item{width:136px;margin-left:-68px;transform:translateY(80px)}.g22back,.g22front{width:116px;margin-left:-58px}
 .g22stage .g22glow{width:210px;height:210px;margin:-105px 0 0 -105px}.g22rays{width:250px;height:250px;margin:-125px 0 0 -125px}
 .card.g22card .g22name{font-size:30px}.card.g22card .g22where{font-size:16px}.card.g22card .g22where .gi{width:34px;height:34px}.card.g22card .g22where .gi svg{width:30px;height:30px}
 .g22btns{flex-direction:column;align-items:stretch;gap:8px}.g22btns .btn{font-size:22px}.g22btns .btn2{font-size:18px}}
/* 矮的直放手機（SE） */
@media (max-width:520px) and (max-height:700px){
 .g22tag{font-size:15px;margin-top:2px}.g22stage{width:200px;height:162px}.g22item{width:112px;margin-left:-56px}.g22back,.g22front{width:100px;margin-left:-50px}
 .g22stage .g22glow{width:180px;height:180px;margin:-90px 0 0 -90px}.g22rays{width:210px;height:210px;margin:-105px 0 0 -105px}
 .card.g22card .g22name{font-size:26px}.g22btns{margin-top:6px}.g22btns .btn{font-size:20px;padding:10px 20px}.g22btns .btn2{padding:9px 18px}}
/* 橫放手機（矮）：左邊盒子、右邊名字和鈕 */
@media (max-height:500px) and (min-width:560px){
 .card.g22card{width:min(640px,100%);padding:8px 16px 10px!important;gap:4px}
 .g22card .rhead{margin:0}
 .g22body{flex-direction:row!important;align-items:center;justify-content:center;gap:14px}
 .g22body .g22l{width:auto;flex:0 0 auto}.g22body .g22r{width:auto;flex:1 1 auto;max-width:330px}
 .g22tag{font-size:14px;margin-top:0;padding:2px 10px}.g22tag svg{width:18px;height:18px}
 .g22stage{width:170px;height:124px}.g22back,.g22front{bottom:-2px}.g22item{width:92px;margin-left:-46px;transform:translateY(56px)}.g22back,.g22front{width:86px;margin-left:-43px}
 .g22stage .g22glow{width:130px;height:130px;margin:-65px 0 0 -65px}.g22rays{width:150px;height:150px;margin:-75px 0 0 -75px}
 .card.g22card .g22tap{font-size:15px}
 .card.g22card .g22name{font-size:24px}.card.g22card .g22where{font-size:15px}.card.g22card .g22where .gi{width:30px;height:30px}.card.g22card .g22where .gi svg{width:26px;height:26px}
 .g22btns{flex-direction:row;flex-wrap:nowrap;gap:8px;margin-top:6px}.g22btns .btn{font-size:18px;padding:8px 14px}.g22btns .btn2{font-size:16px;padding:8px 12px}}
.card.g22card .g22keep{margin:2px 0 0;color:#CFC4F4;font-size:15px;line-height:1.4;text-align:center}
@media (max-height:500px){.card.g22card .g22keep{font-size:13px}}
.g22tip{position:fixed;z-index:40;max-width:min(320px,86vw);padding:8px 14px;border-radius:16px;background:#FFFDF5;color:#3B2C8E;font-size:16px;font-weight:700;line-height:1.35;box-shadow:0 0 18px rgba(255,210,110,.6);opacity:0;transform:translateY(-6px);transition:opacity .3s,transform .3s;pointer-events:none}
.g22tip::before{content:'';position:absolute;left:var(--ax,50%);top:-8px;margin-left:-8px;border:8px solid transparent;border-top:0;border-bottom-color:#FFFDF5}
.g22tip.side{transform:translateX(-6px)}
.g22tip.side::before{left:-8px;top:50%;margin:-8px 0 0;border:8px solid transparent;border-left:0;border-right-color:#FFFDF5}
.g22tip.on{opacity:1;transform:none}
/* 遊戲畫面上方列：回去繼續冒險 */
body.g22retOn #bar #prog{display:none!important}
#g22ret{display:inline-flex;align-items:center;gap:6px;height:42px;padding:0 14px 0 5px;margin-right:8px;border-radius:999px;border:2px solid #FFD98A;background:linear-gradient(180deg,#6E50D4,#3B2C8E);color:#FFF6D0;font:inherit;font-size:17px;font-weight:700;letter-spacing:1px;white-space:nowrap;box-shadow:0 3px 0 rgba(20,10,60,.45);cursor:pointer;flex:none;-webkit-tap-highlight-color:transparent}
#g22ret .ic{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.14);display:grid;place-items:center}
#g22ret .ic svg{width:24px;height:24px}
#g22ret.g22hi{animation:g22hi 1.5s ease-in-out infinite}
body.c87on #g22ret{display:none!important}
@keyframes g22hi{50%{box-shadow:0 3px 0 rgba(20,10,60,.45),0 0 0 4px rgba(255,217,138,.55),0 0 18px 6px rgba(255,217,138,.65)}}
@media (max-width:420px){#g22ret{font-size:15px;letter-spacing:0;height:40px;padding:0 10px 0 4px;margin-right:6px}#g22ret .ic{width:28px;height:28px}#g22ret .ic svg{width:21px;height:21px}}
@media (prefers-reduced-motion:reduce){#g22ret.g22hi{animation:none;box-shadow:0 0 0 4px rgba(255,217,138,.7)}}
/* 章節地圖：禮物牌 */
.g22plq{position:absolute;z-index:4;left:0;top:0;visibility:hidden;margin:0;font:inherit;color:#fff;background:linear-gradient(180deg,#3B2C8E,#241A62);border:2.5px solid #FFD98A;border-radius:20px;padding:6px 9px 6px 6px;box-shadow:0 6px 16px rgba(20,10,60,.45),inset 0 0 0 1px rgba(255,255,255,.08);display:flex;flex-direction:row;align-items:center;gap:6px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.g22plq.on{visibility:visible}
.g22plq .nx{position:relative;width:84px;height:84px;flex:none}
.g22plq .nx>svg.rg{position:absolute;inset:0;width:100%;height:100%}
.g22plq .nx .sl{position:absolute;left:14px;top:14px;width:56px;height:56px}
.g22plq .nx .sl svg{width:100%;height:100%;display:block}
.g22plq .nx b{position:absolute;left:0;right:0;top:22px;text-align:center;font:800 32px/1 'Baloo 2',sans-serif;color:#FFF6D0;text-shadow:0 2px 4px rgba(30,10,80,.8)}
.g22plq .nx.all b{color:#FFD24D}
.g22plq .row{display:flex;flex-direction:column;gap:5px}
.g22plq .row span{position:relative;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.1);display:grid;place-items:center;border:1.5px solid rgba(255,217,138,.45)}
.g22plq .row span.got{background:#FFF8E8;border-color:#FFD98A}
.g22plq .row span svg{width:25px;height:25px}
.g22plq .row span i{position:absolute;right:-5px;bottom:-5px;width:15px;height:15px;border-radius:50%;background:#FFD98A;color:#4A2A00;font:800 10px/15px 'Baloo 2',sans-serif;font-style:normal;text-align:center}
.g22plq .row span.got i{background:#6FD08A;color:#fff}
.g22plq.tapped{animation:g22tap .9s ease-out}
@keyframes g22tap{0%{box-shadow:0 6px 16px rgba(20,10,60,.45),0 0 0 0 rgba(255,217,138,.9)}100%{box-shadow:0 6px 16px rgba(20,10,60,.45),0 0 0 14px rgba(255,217,138,0)}}
.g22nb{position:absolute;z-index:4;width:30px;height:30px;pointer-events:none}
.g22nb svg{width:100%;height:100%;display:block}
@media (max-width:520px){.g22plq{padding:4px 7px 4px 4px;border-radius:16px;gap:5px;border-width:2px}.g22plq .nx{width:64px;height:64px}.g22plq .nx .sl{left:11px;top:11px;width:42px;height:42px}.g22plq .nx b{top:16px;font-size:25px}
 .g22plq .row span{width:21px;height:21px}.g22plq .row{gap:3px}.g22plq .row span svg{width:18px;height:18px}.g22plq .row span i{width:13px;height:13px;font-size:9px;line-height:13px}.g22nb{width:24px;height:24px}}
@media (max-height:500px){.g22plq{padding:4px 7px 4px 4px;border-radius:14px;gap:4px;border-width:2px}.g22plq .nx{width:56px;height:56px}.g22plq .nx .sl{left:10px;top:10px;width:36px;height:36px}.g22plq .nx b{top:14px;font-size:22px}
 .g22plq .row span{width:18px;height:18px}.g22plq .row{gap:2px}.g22plq .row span svg{width:15px;height:15px}.g22plq .row span i{width:11px;height:11px;font-size:8px;line-height:11px;right:-4px;bottom:-4px}.g22nb{width:22px;height:22px}}
/* 補發小卡 */
.card.g22bf{width:min(520px,94%);box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;padding:16px 18px 18px!important}
.card.g22bf h2{margin:2px 0 0;color:#FFE27A;font-size:30px}
.g22bfrow{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;width:100%}
.g22bfi{display:flex;flex-direction:column;align-items:center;gap:3px;width:132px}
.g22bfi .pic{width:96px;height:96px;border-radius:20px;background:#FFF8E8;display:grid;place-items:center;box-shadow:0 0 0 2px #FFD98A,0 0 18px rgba(255,217,138,.45)}
.g22bfi .pic svg{width:84px;height:84px}
.g22bfi b{color:#FFF6D0;font-size:17px;line-height:1.25}
.g22bfi small{display:flex;align-items:center;gap:4px;color:#CFC4F4;font-size:14px}
.g22bfi .gi{width:24px;height:24px;border-radius:7px}.g22bfi .gi svg{width:22px;height:22px}
.g22bf .g22ok{font-size:24px;padding:10px 40px;margin-top:4px}
.g22bfov{animation:g22in .35s ease-out}.g22bfov .card{animation:g22up .4s ease-out}
.g22bfov.out{opacity:0;transition:opacity .25s}
@keyframes g22in{from{opacity:0}}@keyframes g22up{from{transform:translateY(14px);opacity:0}}
@media (max-width:520px){.card.g22bf{padding:14px 10px 16px!important}.g22bfrow{gap:6px;flex-wrap:nowrap}.g22bfi{width:86px}.g22bfi .pic{width:72px;height:72px;border-radius:16px}.g22bfi .pic svg{width:62px;height:62px}.g22bfi b{font-size:14px}.g22bfi small{font-size:12px;flex-direction:column;gap:1px}.card.g22bf h2{font-size:24px}}
@media (max-height:500px){.card.g22bf{gap:4px;padding:10px 14px 12px!important}.card.g22bf h2{font-size:22px}.g22bfi .pic{width:64px;height:64px}.g22bfi .pic svg{width:56px;height:56px}.g22bf .g22ok{font-size:20px;padding:7px 30px}}
@media (prefers-reduced-motion:reduce){.g22bfov,.g22bfov .card{animation:none}}
`;document.head.appendChild(css);
}catch(e){console.log('m9zd_g22core',e)}}).toString()+')()')})();

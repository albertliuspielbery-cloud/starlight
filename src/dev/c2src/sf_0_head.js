/* ================= 第八季安全題（m8sf_safe8.js）—— 2026-11-28 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 題型：danger8:<場景> 找危險大圖｜phone8:119／110 打電話演練｜okno8:<章> 可以／不可以。說明檔 dev/types8_safe.md。
 * 規則：沒有輸、不扣分、不計時；做錯彈回、說明、再試，第二次錯發光。找危險點到「沒問題」的東西不算錯。
 * 畫面：大圖全部用程式畫 SVG（平塗＋柔和漸層＋白色亮點，沒有黑色描邊；人物膚色 #FFE4D4、黑點眼加白亮點、粉紅腮紅）。
 *   漸層 id 每次產生都唯一。角色不做放大縮小動畫，只有淡入、亮光、上下輕彈。
 * 語音：台詞全部在 lines/s8_safe.tsv（S8S_），沒錄音時只出字幕（m9z_notts），不用裝置內建語音。
 * 安全內容依台灣現行宣導（內政部消防署：小火快逃、濃煙關門、不躲浴室、有煙才低姿勢、不搭電梯），來源見 dev/notes_safe8.md。
 * 原始碼在 dev/c2src/sf_*.js，用 dev/c2src/mk.sh 組成這一個檔。 */
(function(){if(typeof window.__ev!=='function'){console.log('m8sf: 找不到 __ev');return}window.__ev('('+(function(){
try{
if(typeof BUILD==='undefined')return;
const RM=()=>{try{return !!reduced||!!S.lite}catch(e){return false}};
const byD=(e,m,h)=>S.diff==='easy'?e:S.diff==='hard'?h:m;
const LOG=p=>{try{if(window.__s7log)p.forEach(x=>{if(typeof x==='string'&&x.trim())__s7log.push(x)})}catch(e){}return p};
const clean=p=>p.filter(x=>x!=null&&x!=='');
const SAY=p=>{try{return say(LOG(clean(p)))}catch(e){return Promise.resolve()}};
const PS=(text,parts)=>{try{return petSay(text,LOG(clean(parts||[text])))}catch(e){}};
const bump=el=>{if(!el)return;try{el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')}catch(e){}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let UID=0;const uid=p=>(p||'s8')+'_'+(++UID)+Math.random().toString(36).slice(2,6);
const okSfx=()=>{try{sfx('ding22')}catch(e){try{sfx('pop')}catch(_){}}};
const popSfx=()=>{try{sfx('pop')}catch(e){}};

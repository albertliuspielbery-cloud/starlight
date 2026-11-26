/* ================= 5.4.0 收費改成只賣「完整版」（m9_pay290.js） =================
 * 2026-11-24 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室。
 * Albert 11/24 決定：
 *  - 第六章以後只收一次 NT$290（價格由 App Store 回傳，程式不寫）。用現有商品 full（tw.starlight.adventure.full）當「完整版」：
 *    full＝STAGES 裡全部的段（第二～第九段，之後新增的段也算），不寫死清單。以前買過 full（第六～二十章合購）的人更新後全部打開。
 *  - 單段 stage2～stage9、合購 s2to6、s5to8 不再賣；判斷照舊（已經有的照樣有效、恢復購買也認得、退款照原本的規則）。
 *  - 限時送第六～十五章（promo）不動。
 * 這個檔只在 App 版作用；網頁版不受影響。購買畫面的購買列、只查 full：patches/90_pay290.py。
 * 這個檔排在所有 mods 最後，購買畫面的 __iapShopHook 包在最外層（第五～七季、promo 的 hook 都跑完才改字）。 */
(function(){if(typeof window.__ev!=='function'){console.log('pay290: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){try{
if(typeof IS_APP==='undefined'||!IS_APP||typeof STAGES==='undefined'||typeof FULLSET==='undefined')return;
/* ---------- 1. full＝全部的段（動態：看 STAGES 現在有哪些段；之後 push 新段也自動包含） ---------- */
// FULLSET 那一行原文不能改（app/mkapp.py 會檢查），所以只換掉它的 includes；用到 FULLSET 的地方（m67 stageOpen、promo 的 own）都會跟著變
try{Object.defineProperty(FULLSET,'includes',{value:id=>STAGES.some(s=>s[0]===id),configurable:true})}catch(e){console.log('pay290 fullset',e)}
const hasFull=()=>{try{return iapOwned().includes('full')}catch(e){return false}};
const allOpen=()=>{try{return STAGES.every(([id])=>stageOpen(id))}catch(e){return false}};
const CN='零一二三四五六七八九';
const cn=n=>n<=10?(n===10?'十':CN[n]):n<20?'十'+CN[n-10]:CN[Math.floor(n/10)]+'十'+(n%10?CN[n%10]:'');
const lastCh=()=>Math.max(...STAGES.map(s=>s[3]));
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* ---------- 2. 完整版介紹（購買畫面）：說明文字改成只有完整版 ---------- */
{const _ih=window.__iapShopHook;window.__iapShopHook=function(ov,price){const r=_ih?_ih.apply(this,arguments):undefined;try{
 const card=ov.querySelector('.card');if(!card)return r;
 const d=card.querySelector('.f3intro');const all=allOpen(),full=hasFull(),p=price('full');
 // 開頭一句
 const lead=d&&d.querySelector('.f3lead');
 if(lead)lead.textContent=all?`第一～五章免費，第六～${cn(lastCh())}章都已經打開了。`:`第一～五章免費。買「完整版」，第六～${cn(lastCh())}章全部打開，之後新增的章節也包含。`;
 // 各段介紹：不放價格（只查 full，本來就沒有單段價格；保險起見，不是「已解鎖／已領取」的標籤都拿掉）
 if(d)d.querySelectorAll('.f3seg .f3tag').forEach(t=>{if(!/已解鎖|已領取/.test(t.textContent))t.remove()});
 // 購買說明：整段重寫（拿掉分段買、合購）
 const ul=d&&d.querySelector('.f3how ul');
 if(ul){const own=(()=>{try{return iapOwned().filter(x=>x!=='full')}catch(e){return []}})();
  const L=[];
  if(full)L.push('已經買了「完整版」：第六章以後的章節全部打開，之後新增的章節也包含，不用再付錢。');
  else L.push(`「完整版」${p?esc(p)+'，':''}一次購買永久使用：第六章以後的章節全部打開，之後新增的章節也包含。不是訂閱，不會每個月扣款。`);
  if(!full&&own.length)L.push('以前買過或用兌換碼打開的章節會一直保留。完整版的價格不會扣掉已經打開的部分。');
  L.push('寶石、衣服、寵物都是玩遊戲得到的，App 裡沒有別的東西要付錢，也沒有廣告。');
  try{if(FAMILY_SHARE)L.push('開了「家人共享」的家人，用自己的 Apple ID 也能玩。')}catch(e){}
  L.push('換手機、刪掉重裝：在這裡按「恢復購買」。','有設定「購買前詢問」的家庭，要等家長在自己的手機上同意。');
  ul.innerHTML=L.map(t=>`<li>${t}</li>`).join('')}
 // promo 在購買列加的「建議」拿掉（只剩一列）
 card.querySelectorAll('.prm52rec').forEach(x=>x.remove());
 // 5.4.1（Apple 2.1(b) 11/26：審查員找不到購買）：頁首就放購買鈕，不用捲到最底；shop() 在 hook 之後才綁 [data-buy]，所以這顆也走同一個購買流程
 if(!all&&!card.querySelector('.pay290top')){const box=document.createElement('div');box.className='pay290top';
  const anchor=lead||card.querySelector('h2');
  if(p){box.innerHTML=`<button class="btn" data-buy="full">購買「完整版」 ${esc(p)}</button><small>第六章以後全部章節，一次購買永久使用；下面有內容介紹、恢復購買和兌換碼。</small>`}
  else{box.innerHTML=`<small>現在連不上 App Store，暫時無法購買。</small><button class="btn2 small pay290retry">重新連接 App Store</button>`;
   box.querySelector('.pay290retry').onclick=()=>{try{ov.remove();window.__iapShopRaw()}catch(e){}}}
  if(anchor)anchor.after(box)}
 // 頁底沒有價格時也給重試鍵
 card.querySelectorAll('.iaprow .na').forEach(n=>{if(n.nextElementSibling&&n.nextElementSibling.classList.contains('pay290retry'))return;const b=document.createElement('button');b.className='btn2 small pay290retry';b.textContent='重新連接 App Store';b.onclick=()=>{try{ov.remove();window.__iapShopRaw()}catch(e){}};n.after(b)});
}catch(e){console.log('pay290 shop',e)}return r}}
/* ---------- 3. 遊戲設定的「購買」區塊 ---------- */
if(typeof parentPanel==='function'){const _pp=parentPanel;parentPanel=function(){const r=_pp.apply(this,arguments);try{
 const box=[...document.querySelectorAll('.iappp')].pop();if(!box)return r;
 const n=box.querySelector('.iapppn:not(.bkgap)');if(n&&!allOpen())n.textContent='第一～五章免費；第六章以後買「完整版」一次全部打開，永久使用，可恢復購買';
 // 只有後面幾段（例如兌換碼拿到第二十一～二十五章）：原本寫「先解鎖第六～二十章」，現在單段不賣了
 const g=box.querySelector('.bkgap');if(g){const m=String(g.textContent).match(/^(.*)已經打開了！/);
  g.textContent=(m?m[1]+'已經打開了！':'')+'前面的章節要先玩完才會玩到；買「完整版」就能從第六章一路玩下去。'}
}catch(e){console.log('pay290 pp',e)}return r}}
/* ---------- 4. 版本紀錄：App 版不再提合購 ---------- */
try{if(typeof VLOG!=='undefined')VLOG.forEach(v=>{if(v&&typeof v[2]==='string'&&/合購/.test(v[2])){
 v[2]=v[2].replace('家長專區新增「第二十一～四十章合購」。','').replace('App 版購買畫面新增「第六～三十章合購」。','App 版購買畫面調整。')}})}catch(e){}
/* ---------- 5. 樣式 ---------- */
const st=document.createElement('style');st.textContent=`.iaprow.pay290{flex-wrap:wrap}.iaprow.pay290 span{flex:1 1 200px;min-width:0}.iaprow.pay290 small{opacity:.8;font-size:13px;line-height:1.5}.iaprow.pay290 i{font-weight:700}.pay290top{display:flex;flex-direction:column;align-items:center;gap:6px;margin:10px 0 6px;padding:12px;border-radius:16px;background:rgba(255,217,138,.12);border:2px solid rgba(255,217,138,.55)}.pay290top .btn{min-width:240px;font-size:20px}.pay290top small{opacity:.85;font-size:13px;line-height:1.5;text-align:center}.iaprow .na{opacity:.9!important;font-size:15px!important}`;document.head.appendChild(st);
window.__pay290={hasFull,allOpen,ver:'2026-11-24'};
}catch(e){window.__pay290err=String(e&&e.stack||e);console.log('pay290',e)}}).toString()+')()')})();

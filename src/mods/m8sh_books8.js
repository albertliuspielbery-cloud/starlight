/* ================= 第八季：故事屋新書（m8sh_books8.js）—— 2026-11-28 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 把 m8sa_s8data.js 的 S8BOOKS（《小橘的安全帽》g:49、《家裡的小偵探》g:50）接進故事屋。做法照 m7g_books7.js：
 *  - 書的格式一樣，接在 STORYBOOK 最後面（順序不能改：存檔 storyDay、寶石 key 用書的位置）。
 *  - g＝完成第幾章才打開（S.chDone<g 就鎖；App 版那一章也要打開）。
 *  - 念的方式照現有閱讀頁（只播整句錄音，沒有錄音就只出字幕）。文字寫「公主」，王子版靠 heroT 換字。
 *  - 朋友 cat49、bearcop47 是 m8sc 從 CH46 放進 AN 的（沒有美術時是暫代圖／黑熊警察 blackbear）。
 * 場景：第八季背景（m8sb 的 BG46，m8sc 放進 CHBG）；沒有那個背景時退回這一章的主場景（park49、home50），再退回 hall。 */
(function(){if(typeof window.__ev!=='function'){console.log('books8: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
'use strict';
try{
const BK=(window.__s8data&&window.__s8data.S8BOOKS)||null;
if(!Array.isArray(BK)||!BK.length){console.log('books8: 沒有 S8BOOKS');return}
if(typeof STORYBOOK==='undefined'||!Array.isArray(STORYBOOK)){console.log('books8: 沒有 STORYBOOK');return}
if(!window.__s8||window.__s8.off){console.log('books8: 第八季沒有接上');return}
const has=k=>{try{return !!k&&(k==='forest'||k==='lake'||k==='hall'||!!CHBG[k])}catch(e){return false}};
const pick=(B,k)=>{const c=[k,String(k||'').replace(/(\d+)[a-z]+$/,'$1'),B.scene0,'hall'];return c.find(has)||'hall'};
const miss=[];
BK.forEach(B=>{if(!B||!B.id||!Array.isArray(B.p))return;
 if(STORYBOOK.some(x=>x&&x.id===B.id))return;
 B.p.forEach(([k])=>{if(!has(k)&&!miss.includes(k))miss.push(k)});
 STORYBOOK.push({id:B.id,t:B.t,c:B.c,g:B.g||0,s8:1,
  p:B.p.map(([k,acts,txt])=>[pick(B,k),acts.slice(),txt]),
  q:(B.q||[]).map(([qt,o])=>[qt,o.slice()])})});
window.__books8={n:BK.length,ids:BK.map(b=>b.id),idx:STORYBOOK.map((b,i)=>b&&b.s8?i:-1).filter(i=>i>=0),missingScene:miss};
}catch(e){console.log('books8',e)}
}).toString()+')()')})();

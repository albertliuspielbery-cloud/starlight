/* ================= 第七季：故事屋新書（m7g_books7.js）—— 2026-11-24 星光工作室 Starlight Studio（全部原創，著作權與 IP 屬於星光工作室） =================
 * 把 m7a_s7data.js 的 S7BOOKS（《圖書館的小聲音》g:42、《我的畫掛在牆上》g:45）接進故事屋。
 * 做法照 v4.7「故事屋資料」（base：STORYBOOK.push 新 5 本）：
 *  - 書的格式一樣：{id,t,c,g,p:[[場景key,[朋友…],文字]…],q:[[題目,[對,錯,錯]]…]}；接在 STORYBOOK 最後面（順序不能改：存檔 storyDay、寶石 key 用書的位置）。
 *  - g＝完成第幾章才打開（v4.7 的 locked99：S.chDone<g 就鎖；App 版那一章也要買過，用 window.__appOpen）。鎖住的書跟舊書一樣顯示「完成第○章就能看」、點了不能看。
 *  - 念的方式：v4.7 閱讀頁 readStory99 的 line()（r99：只播整句錄音 z1|／z|，沒有錄音就安靜，不用內建語音）。
 *  - 公主／王子：文字寫「公主」，王子版畫面靠 heroT 自動換字，語音 key 用 voiceT（跟舊書一樣）。
 *  - 朋友：owl42、peacock45、chameleon45 是 m7c 從 CH41 放進 AN 的第七季朋友（全身圖）。
 * 場景 key：資料裡的 lib42、gallery45 遊戲裡沒有這個背景 → 用最接近的第七季背景（m7b_s7art.js 的 BG41，m7c 放進 CHBG）：
 *  lib42→library42（圖書館大廳）、gallery45→museum45kids（美術館兒童畫展區）；scene0（hall）是最後的備用。
 *  另外照每一頁文字挑同一套第七季背景（在家裡的頁用 home41、借還書櫃台 library42desk…），見 PAGE。
 *  沒有那個背景（美術關掉）時退回 library42／museum45，再退回 scene0。 */
(function(){if(typeof window.__ev!=='function'){console.log('books7: 找不到 __ev，沒有接上');return}window.__ev('('+(function(){
'use strict';
let BK=null;try{BK=(window.__s7data&&window.__s7data.S7BOOKS)||(typeof S7BOOKS!=='undefined'?S7BOOKS:null)}catch(e){}
if(!Array.isArray(BK)||!BK.length){console.log('books7: 沒有 S7BOOKS');return}
if(typeof STORYBOOK==='undefined'||!Array.isArray(STORYBOOK)){console.log('books7: 沒有 STORYBOOK');return}
// 資料的場景 key → 遊戲的背景 key（找不到的換成最接近的第七季背景）
const SCN={lib42:'library42',gallery45:'museum45kids'};
// 每一頁挑更貼近文字的第七季背景（index＝頁）
const PAGE={
 libvoice:{1:'library42desk',2:'home41',3:'home41',4:'home41',5:'home41',6:'library42out',7:'library42desk',8:'library42aisle'},
 mypainting:{0:'home41',1:'home41',2:'museum45out',3:'museum45lobby',4:'museum45'}};
const has=k=>{try{return !!k&&(k==='forest'||k==='lake'||k==='hall'||!!CHBG[k])}catch(e){return false}};
const pick=(B,pg,k)=>{const c=[(PAGE[B.id]||{})[pg],SCN[k]||k,(SCN[k]||'').replace(/(\d+)[a-z]+$/,'$1'),B.scene0,'hall'];return c.find(has)||'hall'};
const miss=[];
BK.forEach(B=>{if(!B||!B.id||!Array.isArray(B.p))return;
 if(STORYBOOK.some(x=>x&&x.id===B.id))return;   // 已經接過
 B.p.forEach(([k])=>{if(!has(k)&&!miss.includes(k))miss.push(k)});
 STORYBOOK.push({id:B.id,t:B.t,c:B.c,g:B.g||0,s7:1,
  p:B.p.map(([k,acts,txt],pg)=>[pick(B,pg,k),acts.slice(),txt]),
  q:(B.q||[]).map(([qt,o])=>[qt,o.slice()])})});
window.__books7={n:BK.length,ids:BK.map(b=>b.id),idx:STORYBOOK.map((b,i)=>b&&b.s7?i:-1).filter(i=>i>=0),missingScene:miss,SCN,PAGE};
}).toString()+')()')})();

/* ================= 2.3 字形與排版小修正（m9zp_tfix.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 依 qa/v23/tchk 檢查結果（不動台詞、不用新錄音）：
 * 1. 獎狀日期（.certdt）原本只用英文字型，「年月日」會掉到系統字型 → 數字用 Baloo 2，中文用台灣字形。
 * 2. 第八季四聲練習的聲調符號（.s8tm）太小看不清楚 → 放大、加粗。
 * 3. 「遊樂園有新東西」小卡、大禮物卡的物品名稱換行時，最後一個字不要自己掉到下一行（例：小書蟲的塗色／圖）。
 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
 if(document.getElementById('m9zpcss'))return;
 const st=document.createElement('style');st.id='m9zpcss';
 st.textContent=`.certdt{font-family:"Baloo 2",var(--cjk)!important}
.s8tm{font-size:.9em!important;font-weight:700!important;right:-.75em!important;top:4%!important}
.g22bfi b,.g22name,.g22card h2,.g22item b{text-wrap:balance;text-align:center}`;
 document.head.appendChild(st);
}catch(e){console.log('m9zp_tfix',e)}}).toString()+')()')})();

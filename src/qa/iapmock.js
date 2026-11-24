// 測試用假商店：模擬 Capacitor 的 NativePurchases 外掛（StoreKit）。2026-11-22 星光工作室 Starlight Studio
// 只給測試用（playwright addInitScript 注入 App 版 8982），不放進遊戲。
// 介面照 base m67_iap：getProducts／getPurchases／purchaseProduct／restorePurchases／presentOfferCodeRedeemSheet／addListener('transactionUpdated')。
// 價格：5.4.0 起只賣「完整版」full NT$290（Albert 11/24）；舊的單段 NT$120、合購 s2to6／s5to8 NT$390 留著給舊測試用（遊戲不再向商店查）。
// 已買的：localStorage「__iapmock_owned」（JSON 陣列，例如 ["stage2","stage8"]），或 window.__IAPMOCK_OWNED。
(function(){
const P='tw.starlight.adventure.';
const PRICE={full:'NT$290',s2to6:'NT$390',s5to8:'NT$390'};
const IDS=['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9','full','s2to6','s5to8'];
const LS=k=>{try{return Storage.prototype.getItem.call(localStorage,k)}catch(e){return null}};
const SV=(k,v)=>{try{Storage.prototype.setItem.call(localStorage,k,v)}catch(e){}};
const own=()=>{try{const a=window.__IAPMOCK_OWNED||JSON.parse(LS('__iapmock_owned')||'[]');return Array.isArray(a)?a:[]}catch(e){return []}};
const setOwn=a=>{window.__IAPMOCK_OWNED=null;SV('__iapmock_owned',JSON.stringify([...new Set(a)]))};
const L={};const calls=[];
const tx=id=>({productIdentifier:P+id,transactionId:'mock-'+id+'-'+Date.now(),purchaseDate:new Date().toISOString()});
const NP={
 async getProducts({productIdentifiers}={}){calls.push(['getProducts',productIdentifiers]);await new Promise(r=>setTimeout(r,120));
  return {products:(productIdentifiers||IDS.map(x=>P+x)).map(pid=>{const id=String(pid).replace(P,'');const ps=PRICE[id]||'NT$120';return {identifier:pid,productIdentifier:pid,priceString:ps,localizedPrice:ps,title:id}})}},
 async getPurchases(o){calls.push(['getPurchases',o]);return {purchases:own().map(tx)}},
 async purchaseProduct({productIdentifier}){calls.push(['purchaseProduct',productIdentifier]);const id=String(productIdentifier).replace(P,'');setOwn(own().concat([id]));return tx(id)},
 async restorePurchases(){calls.push(['restorePurchases']);return {}},
 async presentOfferCodeRedeemSheet(){calls.push(['offer']);return {}},
 addListener(n,cb){(L[n]=L[n]||[]).push(cb);return {remove(){}}}};
window.Capacitor=Object.assign(window.Capacitor||{},{Plugins:Object.assign((window.Capacitor&&window.Capacitor.Plugins)||{},{NativePurchases:NP}),isPluginAvailable:n=>n==='NativePurchases',isNativePlatform:()=>true,getPlatform:()=>'ios'});
window.__iapMock={own,setOwn,calls,fire:(id,revoked)=>(L.transactionUpdated||[]).forEach(cb=>cb(Object.assign(tx(id),revoked?{revocationDate:new Date().toISOString()}:{})))};
})();

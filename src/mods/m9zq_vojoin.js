/* ================= 2.3 語音接句（m9zq_vojoin.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 問題：say() 會把連在一起的幾段文字併成一句再找錄音（例：「答對了！」＋「全部找到了！你是安全小偵探！」）。
 *   併起來的整段沒有錄音時，原本會拆成一句一句找；整段錄好的台詞拆開後，後面那句（「你是安全小偵探！」）單獨沒有錄音，就退回裝置語音。
 * 做法：整段沒有錄音、拆句又會缺的時候，改成把句子「接成最長的、有整段錄音的幾塊」，一塊一塊播（每一塊都是錄好的整句）。
 *   找不到全部都有錄音的接法，就照原本的方式（不改變其他行為）。
 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
 if(window.__voJoin)return;window.__voJoin=1;
 const _vs=voSpeak;
 const key=c=>voHas('z|'+c)?'z|'+c:voHas('z|'+voCk(c))?'z|'+voCk(c):null;
 const one=c=>{try{const r=voResolve(c);return r.length>0&&r.every(g=>typeof g==='string')}catch(e){return false}};
 function plan(ss){const n=ss.length,best=Array(n+1).fill(null);best[n]=[];
  for(let i=n-1;i>=0;i--){for(let j=n;j>i;j--){if(!best[j])continue;const c=ss.slice(i,j).join('');
    if(key(c)||(j===i+1&&one(c))){best[i]=[c,...best[j]];break}}}
  return best[0]}
 voSpeak=async function(p,opt,gen){
  try{const ob=typeof p==='object'&&p!=null;
   if(S.vo&&VO.idx&&!(ob&&(p.en!=null||p.slow||p.who||p.pause))){
    const txt=String(ob?p.zh:p).trim();
    if(txt&&!key(txt)){const ss=voSents(txt);
     if(ss.length>1&&!ss.every(one)){const pl=plan(ss);
      if(pl&&pl.length>1){for(const c of pl){if(gen!==sayGen)return;await _vs.call(this,ob?Object.assign({},p,{zh:c}):c,opt,gen);if(gen!==sayGen)return;await wait(60)}return}}}}
  }catch(e){console.log('m9zq_vojoin',e)}
  return _vs.apply(this,arguments)};
}catch(e){console.log('m9zq_vojoin',e)}}).toString()+')()')})();

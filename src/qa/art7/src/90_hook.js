
/* ===================== 7. 接進遊戲（這一輪先不接：S41.LIVE=false 時 hook() 什麼都不做；Albert 同意後，m7c 的邏輯在設好 DRESS／BFIT 之後呼叫 S41.hook()） =====================
 * 遊戲本體的變數在主程式閉包裡，模組用 window.__ev 改（跟 build.py 接在主程式後面的位置一致）。
 * 貝雷帽 beret43（頭飾格）、小導遊背包 bag41（背後格）由 wrapPrincess／wrapBoy 畫；換裝間圖示 S41.ICON。 */
S41.hook=function(force){if(!S41.LIVE&&!force)return false;if(G.__s41hooked)return true;G.__s41hooked=1;const E=G.__ev;if(typeof E!=='function')return false;
 try{const DR=E('DRESS'),BF=E('BFIT');Object.keys(S41.DRESS).forEach(k=>{DR[k]=Object.assign({},S41.DRESS[k])});Object.keys(S41.BOY).forEach(k=>{BF[k]=Object.assign({},S41.BOY[k])})}catch(e){console.log('s41 reg',e)}
 try{const IDOL=E('IDOL');
  G.__s41w={patt:_p=>function(t,x,y,col,i){if(typeof t==='string'&&S41.PAT[t])return S41.PAT[t](x,y,col,i);return _p.apply(this,arguments)}};
  E('patt=window.__s41w.patt(patt)');
  const _jk=IDOL.jacket;IDOL.jacket=function(g,D){const J=D&&D.idol;if(J&&J.s41&&S41.JK[J.s41])return S41.JK[J.s41](g,D,J);return _jk.apply(this,arguments)};
  const _jd=IDOL.jacketDefs;IDOL.jacketDefs=function(g,D){if(D&&D.idol&&D.idol.s41)return '';return _jd.apply(this,arguments)};
  const _bt=IDOL.boots;IDOL.boots=function(D,look){const J=D&&D.idol;if(J&&J.s41){if((look&&look.shoe)||!S41.BOOT[J.s41])return '';return S41.BOOT[J.s41](J)}return _bt.apply(this,arguments)};
  const _bj=IDOL.boyJacket;IDOL.boyJacket=function(g,F){const J=F&&F.s41;return _bj.apply(this,arguments)+(J&&S41.BJ[J.t]?S41.BJ[J.t](g,F,J):'')};
  const _bs=IDOL.boySleeve;IDOL.boySleeve=function(F){const J=F&&F.s41;return (J&&S41.BS[J.t]?S41.BS[J.t](J):'')+_bs.apply(this,arguments)};
  E('princess=window.S41.wrapPrincess(princess);boySVG=window.S41.wrapBoy(boySVG)');
  if(G.RIG&&G.RIG.girl){G.RIG.girl=S41.wrapPrincess(G.RIG.girl);if(G.RIG.boy)G.RIG.boy=S41.wrapBoy(G.RIG.boy)}}catch(e){console.log('s41 hook',e)}
 // 寵物小貓熊：由 m7c 註冊（ICONPET→ICONART，用 PET41.redpanda44 和 PET41.p19）；這裡只補配件錨點
 try{const ACC=E('ACCANCH');if(ACC&&!ACC.redpanda44)ACC.redpanda44=Object.assign({},G.PET41.anchor)}catch(e){}
 try{const st=document.createElement('style');st.textContent=S41.CERT_CSS;document.head.appendChild(st)}catch(e){}
 try{G.install41(true)}catch(e){}
 setTimeout(()=>{try{G.install41(true);S41.quizIcons()}catch(e){console.log('s41 late',e)}},0);   // 等 m8（ZOO8）、m7c 都載入完再做一次
 return true};
S41.BG=()=>G.BG41;

/* ---------- 題目選項的小圖：第七季題庫裡的幾個 emoji 換成這一季畫的物件（只改第七季的題目，其他章不動） ---------- */
const QI={'🚇':'train','🚆':'train','🎫':'ticket','📚':'book','📖':'book','🩺':'stetho','🪥':'toothbrush','🗺️':'map','📷':'camera','📸':'camera','🖼️':'frame','🖌️':'brush','🎨':'palette','🧻':'tissue','🍬':'candy','🐘':'elephant','🦒':'giraffe'};
S41.quizIcons=function(){if(!S41.LIVE||G.S7ART===false)return;let Q=null;try{Q=EV('typeof S7Q!=="undefined"?S7Q:null')}catch(e){}if(!Array.isArray(Q))return;
 const fix=o=>{if(Array.isArray(o)&&QI[o[0]])o[0]='i:s41'+QI[o[0]]};
 Q.forEach(q=>{try{fix(q[2]);(q[3]||[]).forEach(fix)}catch(e){}})};
/* ---------- 第 43 章兔兔護理師換成戴小護理帽的 bunny43（Albert 2026-11-24 決定要用；粉紅愛心，不用紅十字） ---------- */
try{if(S41.LIVE&&G.S7ART!==false){const D=EV('typeof S7D!=="undefined"?S7D:null');const L=D&&D[43]&&D[43].levels;if(L)L.forEach(x=>{if(x[1]==='bunny')x[1]='bunny43'});
 setTimeout(()=>{try{if(G.__ST19SPK&&G.__ST19SPK['兔兔']==='bunny')G.__ST19SPK['兔兔']='bunny43'}catch(e){}},0)}}catch(e){console.log('s41 bunny43',e)}
/* ---------- 房間佈置選單「牆上的畫」那一格的小縮圖（patches/72_s7art_thumb.py 接進 thumbRaw） ---------- */
G.__s41picThumb=v=>{if(v==='none')return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#F6E6D2"/><rect x="18" y="20" width="64" height="56" rx="4" fill="none" stroke="#C8A27A" stroke-width="3" stroke-dasharray="6 5"/></svg>`;
 return frameSVG('').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ')};

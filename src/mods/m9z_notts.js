/* 5.4.0 C1：不再用裝置內建語音。錄音拿不到時只停一下（讓畫面上的字幕看得到），不出聲。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){
 // C4：遊樂園的密碼窗（地球儀、攝影師、盪藤蔓…）標題改通用字，不再沿用上次章節的「第Ｎ季」
 try{const _pg=window.__s3Gate;if(typeof _pg==='function')window.__s3Gate=function(){const r=_pg.apply(this,arguments);try{const h=$('.s3gate h2');if(h)h.textContent='新遊戲搶先玩'}catch(e){}return r}}catch(e){}
 try{speakOne=function(p,opt){return new Promise(r=>{try{const ob=typeof p==='object';const txt=String(ob?(p.en!=null?p.en:p.zh):p||'');console.log('notts: 沒有錄音',txt.slice(0,40));setTimeout(r,Math.min(2600,400+txt.length*140))}catch(e){r()}})}}catch(e){console.log('notts fail',e)}
}).toString()+')()')})();

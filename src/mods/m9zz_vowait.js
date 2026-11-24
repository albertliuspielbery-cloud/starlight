/* 5.4.0 語音：有錄音就等錄音，不拆句、不靜音（2026-11-24 星光工作室 Starlight Studio）
 * 問題：網頁版第一次念新語音包裡的句子時，語音包還沒下載完，voBuf 拿不到（伺服器不支援 Range 時單句也抓不到），
 *   整句就被拆成好幾段、沒錄音的段落改用 speakOne（以前是裝置內建語音，m9z_notts 之後變成沒聲音）。
 *   大小寫配對很快連配時，上一個字母還在解碼就被下一句取代，原本的 voSpeak 會改用 speakOne 再念一次。
 * 做法：
 *  1. voBuf：語音索引裡有這句、可是它的語音包還沒好 → 把那包排到最前面，等它下載好再解碼（不回傳 null）。
 *     伺服器不支援 Range、整包又很大時，另外從頭讀那個檔案，讀到這一句的位置就先拿來用（讀夠了就停）。
 *     等的時候有新的一句（sayGen 換了，例如 hush 或下一句）就不等了；最多等 WAITMAX。
 *  2. voSpeak 最外層：語音清單還沒載入時先等清單；把這一句的 sayGen 帶進 opt（__g），
 *     speakOne 收到已經被取代的句子就直接結束（patches/91 也在原本的 voSpeak 先擋掉）。
 *  3. speakOne 只剩「索引裡真的沒有」的句子會走到（m9z_notts：不出聲、停一下）。
 *  window.__vw：統計（等了幾次、多久、被取代、speakOne 次數），測試用。
 * App 版：每句是 App 裡的小檔案，不用等下載，只套用 2。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){
try{
const W=window.__vw={waits:0,waitMs:0,maxMs:0,peek:0,peekMB:0,gaveUp:0,stale:0,staleOne:0,one:[],log:[]};
const lg=(...a)=>{try{W.log.push([Math.round(performance.now()),...a]);if(W.log.length>60)W.log.shift()}catch(e){}};
const APP=(()=>{try{return typeof IS_APP!=='undefined'&&!!IS_APP}catch(e){return false}})();
const WAITMAX=90000;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------- 不支援 Range 時：從頭讀語音包，讀到需要的位置就先用 ---------- */
const PK={};
function peek(f,end){let p=PK[f];
 if(p&&!p.dead&&(p.n>=end||!p.done)){if(end>p.want)p.want=end;p.t=Date.now();return p}
 p=PK[f]={n:0,chunks:[],want:end,t:Date.now(),done:false,dead:false,blob:null,bn:0};W.peek++;lg('peek',f,end);
 (async()=>{try{const ctl=window.AbortController?new AbortController():null;
   const r=await fetch('voice/'+f+'?pk='+Date.now(),{cache:'no-store',signal:ctl&&ctl.signal});
   if(!r.ok||!r.body||!r.body.getReader){p.dead=true;try{ctl&&ctl.abort()}catch(_){}return}
   const rd=r.body.getReader();
   for(;;){if(VO.abs[f]||(p.n>=p.want&&Date.now()-p.t>3000)){try{rd.cancel()}catch(_){}try{ctl&&ctl.abort()}catch(_){}break}
    const x=await rd.read();if(x.done)break;if(x.value&&x.value.length){p.chunks.push(x.value);p.n+=x.value.length}}
  }catch(e){p.dead=p.n===0}finally{p.done=true;W.peekMB=+(W.peekMB+p.n/1048576).toFixed(2);lg('peek-end',f,p.n)}})();
 return p}
const peekBlob=p=>{if(!p.blob||p.bn!==p.n){p.blob=new Blob(p.chunks);p.bn=p.n}return p.blob};
// 語音包下載好了就把讀到一半的丟掉
setInterval(()=>{try{for(const f in PK){if(VO.abs[f]&&PK[f].done)delete PK[f]}}catch(e){}},5000);

/* ---------- 1. voBuf：有錄音就等 ---------- */
if(!APP&&typeof voBuf==='function'){const _vb=voBuf;
 const have=(k,e,f)=>{try{if(VO.bufs.has(k)||VO.abs[f])return true;if(e.length>=5&&VO.abs[VO.files[e[3]]] instanceof Blob)return true;return !!(VO.rb&&VO.rb.has(f+'@'+e[1]))}catch(_){return false}};
 voBuf=async function(k){
  if(VO.bufs.has(k))return VO.bufs.get(k);
  const e=VO.idx&&VO.idx[k];if(!e||!VO.files)return _vb.apply(this,arguments);
  const f=VO.files[e[0]];if(!f)return _vb.apply(this,arguments);
  if(have(k,e,f))return _vb.apply(this,arguments);
  const g0=sayGen,t0=performance.now();
  let b=await _vb.apply(this,arguments);if(b)return b;               // Range 單句（0.9 秒內）拿到了
  if(typeof voNamePack==='function'&&voNamePack(f))return null;      // 名字包不整包下載（只能單句抓）
  W.waits++;lg('wait',k.slice(0,30),f);let p=null;
  try{for(;;){
   if(sayGen!==g0){W.stale++;lg('stale',k.slice(0,30));return null}
   if(have(k,e,f)){b=await _vb.call(this,k);if(b)break}
   const end=e[1]+e[2];
   if(p&&p.n>=end){try{b=await voDecode(peekBlob(p),e[1],e[2],k)}catch(_){b=null}if(b)break;p=null}
   if(VO.failed&&VO.failed.has(f)&&!(p&&!p.done)){lg('failed',f);break}
   if(performance.now()-t0>WAITMAX){W.gaveUp++;lg('giveup',k.slice(0,30));break}
   try{if(!VO.packs[f])voPack(f);voWant(f)}catch(_){}
   if(VO.rangeOK===false||VO.chunkOK===false){if(!p||(p.done&&p.n<end))p=peek(f,end);else if(end>p.want){p.want=end;p.t=Date.now()}}
   else if(VO.rangeOK===true&&!(VO.rq&&VO.rq.has(f+'@'+e[1]))){try{voRange(f,e)}catch(_){}}   // 單句還在路上就等它，斷了再抓一次
   await sleep(120)}
  }catch(err){lg('err',String(err&&err.message||err))}
  const ms=Math.round(performance.now()-t0);W.waitMs+=ms;if(ms>W.maxMs)W.maxMs=ms;lg('got',k.slice(0,30),!!b,ms);
  return b||null}}

/* ---------- 2. voSpeak：清單還沒好先等；sayGen 帶進 opt ---------- */
if(typeof voSpeak==='function'){const _vs=voSpeak;
 voSpeak=async function(p,opt,gen){
  const o=Object.assign({},opt||{},{__g:gen});
  try{if(S.vo&&!VO.idx&&VO.ready&&!VO.done){const t0=performance.now();lg('idx-wait');
    while(!VO.idx&&!VO.done&&gen===sayGen&&performance.now()-t0<20000)await sleep(100)}}catch(e){}
  if(gen!=null&&gen!==sayGen){W.stale++;return}
  return _vs.call(this,p,o,gen)}}

/* ---------- 3. speakOne：已經被取代的句子不念 ---------- */
if(typeof speakOne==='function'){const _so=speakOne;
 speakOne=function(p,opt){try{if(opt&&opt.__g!=null&&opt.__g!==sayGen){W.staleOne++;return Promise.resolve()}
   W.one.push(String(typeof p==='object'&&p?(p.en!=null?p.en:p.zh):p).slice(0,40));if(W.one.length>40)W.one.shift()}catch(e){}
  return _so.apply(this,arguments)}}
}catch(e){console.log('vowait fail',e)}
}).toString()+')()')})();

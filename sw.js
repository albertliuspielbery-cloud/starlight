// 星光公主大冒險 — offline cache. Change VERSION when updating the game.
const VERSION='starlight-v81';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./font-hun-ebe5f7e6.woff2','./font-baloo-abc191e4.woff2'];
const PAGE=()=>'./index.html?n='+Date.now(); // 網址加上時間，避免拿到 GitHub 的舊副本
const timeout=ms=>new Promise(r=>setTimeout(r,ms));
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(CORE.map(u=>Promise.race([
  fetch(u==='./'||u==='./index.html'?PAGE():u,{cache:'reload'}).then(r=>{if(r.ok)return c.put(u,r)}),timeout(8000)]).catch(()=>{}))))
  // 新版的語音目錄也先存好（離線打開也有聲音）
  .then(()=>caches.open(VERSION)).then(c=>c.match('./index.html')).then(h=>h&&h.text()).then(t=>t&&Promise.race([saveVI(t),timeout(8000)])).catch(()=>{})
  .then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  // 新的快取沒拿到網頁本體（網路太慢）：先從舊的快取搬過來，離線才打得開
  try{const c=await caches.open(VERSION);if(!(await c.match('./index.html'))){const old=await caches.match('./index.html');if(old)await c.put('./index.html',old)}}catch(_){}
  const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==VERSION&&k!=='starlight-voice').map(k=>caches.delete(k)));
  await self.clients.claim()})())});
const isPage=req=>req.mode==='navigate'||/\/(index\.html)?$/.test(new URL(req.url).pathname);
// 新版網頁存起來之前，先把它需要的字型和語音目錄也存好（離線打開新版也有聲音、字型）；缺一樣就不換，繼續用舊版
async function stash(res){
  const txt=await res.clone().text();
  const c=await caches.open(VERSION);
  for(const f of new Set(txt.match(/font-[a-z]+-[0-9a-f]{8}\.woff2/g)||[])){
    if(await caches.match('./'+f))continue;const r=await fetch('./'+f,{cache:'reload'});if(!r.ok)throw new Error('font');await c.put('./'+f,r)}
  await saveVI(txt);
  await c.put('./index.html',res)}
async function saveVI(txt){const vi=(txt.match(/const VOICE_INDEX='([^']+)'/)||[])[1];if(!vi)return;
  const vc=await caches.open('starlight-voice');const key=new URL('voice/'+vi,self.location).href;
  if(!(await vc.match(key))){const r=await fetch(key,{cache:'reload'});if(!r.ok)throw new Error('voice index');await vc.put(key,new Response(await r.text(),{headers:{'Content-Type':'application/json'}}))}}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  // 遊戲自己檢查新版本（index.html?v=...）：直接上網拿，不走快取，也不限時間
  if(req.mode!=='navigate'&&url.searchParams.has('v'))return;
  if(isPage(req)){
    // v3.3：平常打開先用存好的版本（馬上開），同時在背景下載新版，下次打開就是新版
    // 按「現在更新」時（?fresh=）一定等新版下載完
    const fresh=url.searchParams.has('fresh');
    const net=fetch(PAGE(),{cache:'no-store'}).then(res=>{if(!res||!res.ok)throw new Error('bad '+(res&&res.status));return res});
    const saved=net.then(res=>stash(res.clone())).catch(()=>{});
    e.waitUntil(saved);
    if(!fresh){
      e.respondWith(caches.match('./index.html').then(h=>h||caches.match('./')).then(h=>{
        if(h)return h;
        return Promise.race([net,timeout(20000).then(()=>{throw new Error('slow')})]).catch(()=>fetch(req))}).catch(()=>fetch(req)));
      return;
    }
    e.respondWith(Promise.race([net,timeout(15000).then(()=>{throw new Error('slow')})])
      .catch(()=>caches.match('./index.html').then(h=>h||caches.match('./')).then(h=>h||net).catch(()=>fetch(req))));
    return;
  }
  if(/\/voice\//.test(url.pathname)){
    // 語音包：檔名有版本，存在獨立快取，更新遊戲時不用重新下載
    // 語音包由遊戲自己下載和保存（不經過這裡，避免 iPad Safari 大檔案卡住）
    return;
  }
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy))}
    return res;
  })));
});

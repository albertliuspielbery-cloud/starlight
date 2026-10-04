// 星光公主大冒險 — offline cache. Change VERSION when updating the game.
const VERSION='starlight-v74';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./font-hun-0bf25087.woff2','./font-baloo-abc191e4.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(CORE.map(u=>Promise.race([fetch(new Request(u,{cache:'reload'})).then(r=>{if(r.ok)return c.put(u,r)}),new Promise(r=>setTimeout(r,8000))]).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION&&k!=='starlight-voice').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const isPage=req=>req.mode==='navigate'||/\/(index\.html)?$/.test(new URL(req.url).pathname);
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  // 遊戲自己檢查新版本（index.html?v=...）：直接上網拿，不走快取，也不限時間
  if(req.mode!=='navigate'&&url.searchParams.has('v'))return;
  if(isPage(req)){
    // 網頁本體：有網路就拿最新版（網址加上時間，避免拿到 GitHub 的舊副本），太慢才先用快取
    // 按「現在更新」時（?fresh=）一定等新版下載完
    const fresh=url.searchParams.has('fresh');
    const net=fetch('./index.html?n='+Date.now(),{cache:'no-store'}).then(res=>{if(!res||!res.ok)throw new Error('bad '+(res&&res.status));const copy=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',copy));return res});
    e.respondWith(Promise.race([net,new Promise((_,rej)=>setTimeout(rej,fresh?15000:6000))])
      .catch(()=>caches.match('./index.html').then(h=>h||caches.match('./')).then(h=>h||net).catch(()=>fetch(req))));
    return;
  }
  if(/\/voice\//.test(new URL(req.url).pathname)){
    // 語音包：檔名有版本，存在獨立快取，更新遊戲時不用重新下載
    // 語音包由遊戲自己下載和保存（不經過這裡，避免 iPad Safari 大檔案卡住）
    return;
  }
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy))}
    return res;
  })));
});

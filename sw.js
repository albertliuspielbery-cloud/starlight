// 星光公主大冒險 — offline cache. Change VERSION when updating the game.
const VERSION='starlight-v43';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(CORE.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION&&k!=='starlight-voice').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const isPage=req=>req.mode==='navigate'||/\/(index\.html)?$/.test(new URL(req.url).pathname);
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  if(isPage(req)){
    // 網頁本體：有網路就拿最新版，沒網路才用快取
    e.respondWith(Promise.race([
      fetch(req,{cache:'no-store'}).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',copy))}return res}),
      new Promise((_,rej)=>setTimeout(rej,4000))
    ]).catch(()=>caches.match('./index.html').then(h=>h||caches.match('./'))));
    return;
  }
  if(/\/voice\//.test(new URL(req.url).pathname)){
    // 語音包：檔名有版本，存在獨立快取，更新遊戲時不用重新下載
    e.respondWith(caches.open('starlight-voice').then(c=>c.match(req).then(hit=>hit||fetch(req).then(res=>{if(res&&res.ok)c.put(req,res.clone());return res}))));
    return;
  }
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy))}
    return res;
  })));
});

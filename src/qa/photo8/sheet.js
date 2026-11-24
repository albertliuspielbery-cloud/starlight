const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
await p.setContent('<html><body style="margin:0"></body></html>');await p.addScriptTag({path:'/home/claude/w/s7/mods/m8_photo_art.js'});
await p.evaluate(()=>{const Z=ZOO8;const N={stand:'站',sleep:'睡',eat:'吃',play:'玩'};
 document.body.innerHTML=`<div style="font-family:'PingFang TC','Noto Sans CJK TC',sans-serif;background:linear-gradient(#E6F6FF,#F4FBEA);padding:22px 24px">
 <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px"><div><b style="font-size:30px;color:#4A2E7A">小小攝影師：動物園的 20 種動物</b><div style="color:#7A6A9A;font-size:16px">每種四個樣子：站、睡、吃、玩（預覽草稿）</div></div><div style="color:#8A7AA8;font-size:14px">2026-11-22　星光工作室 Starlight Studio　著作權與 IP 屬於星光工作室</div></div>
 <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">${Z.LIST.map(L=>`<div style="background:#fff;border-radius:16px;padding:8px;box-shadow:0 3px 8px rgba(60,40,120,.12)">
  <div style="display:flex;align-items:baseline;gap:8px"><b style="font-size:20px;color:#3A2A5A">${L.zh}</b><span style="color:#8A6AB8;font-size:14px">${L.en}</span></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px">${Z.POSES.map(q=>`<div style="position:relative"><svg viewBox="0 0 100 100" style="width:100%;display:block">${Z.draw(L.k,q)}</svg><i style="position:absolute;left:2px;top:2px;font-style:normal;font-size:12px;background:#F0EAFF;color:#6A4AB8;border-radius:8px;padding:0 6px">${N[q]}</i></div>`).join('')}</div></div>`).join('')}</div></div>`});
const h=await p.evaluate(()=>document.body.scrollHeight);await p.setViewportSize({width:1600,height:h});
await p.screenshot({path:'/home/claude/w/s7/preview/zoo_animals.png',fullPage:true});await b.close()})();

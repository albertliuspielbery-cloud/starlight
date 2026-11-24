// 地球儀預覽圖：node preview.js（輸出 /home/claude/w/s7/preview/globe_*.png）
const { chromium } = require('playwright');
const OUT = '/home/claude/w/s7/preview/';
const SC = [
  ['globe_1_open_iphone', 390, 844, null, 5200],
  ['globe_2_card_ipad_land', 1180, 820, "__gl8.panTo(135,30,0);setTimeout(()=>{const q=__gl8.proj(138.5,36.5);__gl8.tap(q.X,q.Y)},100)", 1500],
  ['globe_3_ocean_iphone_land', 844, 390, "__gl8.panTo(-150,10,0);setTimeout(()=>{__gl8.tap(__gl8.VW.cx-20,__gl8.VW.cy+10)},100)", 1200],
  ['globe_4_find_ipad', 820, 1180, "__gl8.diff('mid');__gl8.startFind();", 5200, "(()=>{const F=__gl8.F();F.q[0]='at';})()"],
  ['globe_5_found_ipad', 820, 1180, "__gl8.diff('mid');__gl8.startFind();", 5200, "(()=>{const F=__gl8.F();F.q[0]='at';})()", "__gl8.panTo(-35,15,0);setTimeout(()=>__gl8.tap(__gl8.VW.cx,__gl8.VW.cy),60)", 260],
  ['globe_6_antarctica_iphone', 390, 844, "__gl8.panTo(150,-62,0);setTimeout(()=>{const q=__gl8.proj(150,-78);__gl8.tap(q.X,q.Y)},100)", 1200],
  ['globe_7_hint_ipad_land', 1180, 820, "__gl8.diff('hard');__gl8.startFind();", 5200, "(()=>{const F=__gl8.F();F.q[0]='ke';})()", "(()=>{__gl8.panTo(-100,40,0);setTimeout(()=>{__gl8.tap(__gl8.VW.cx,__gl8.VW.cy);setTimeout(()=>__gl8.tap(__gl8.VW.cx+10,__gl8.VW.cy),900)},150)})()", 3500],
  ['globe_8_arctic_iphone_land', 844, 390, "__gl8.panTo(30,62,0);setTimeout(()=>{const q=__gl8.proj(10,86);__gl8.tap(q.X,q.Y)},100)", 1200],
];
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [name, w, h, act, wait, pre, act2, wait2] of SC) { if (process.argv[2] && !name.includes(process.argv[2])) continue;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true });
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ' ' + e.message));
    const ev = x => p.evaluate(s => __ev(s), x);
    await p.goto('http://127.0.0.1:8981/index.html'); await p.waitForTimeout(1800);
    await ev("S.chDone=Math.max(S.chDone||0,41);V2.s3pw=1;go('globe8')"); await p.waitForTimeout(name.includes('open') ? 300 : 4300);
    if (act) { await ev(act + (pre ? ';' + pre : '')); await p.waitForTimeout(wait) }
    else await p.waitForTimeout(wait);
    if (act2) { await ev(act2); await p.waitForTimeout(wait2) }
    await p.screenshot({ path: OUT + name + '.png' }); await ctx.close(); console.log('ok', name);
  }
  if (process.argv[2]) { await b.close(); return }
  // 小卡一覽（33 張小圖＋一句話）
  const ctx = await b.newContext({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8981/index.html'); await p.waitForTimeout(1500);
  await p.evaluate(() => {
    const G = __ev('window.__G8'); const keys = G.CT.map(c => c[0]).concat(['an', 'arc']);
    document.body.innerHTML = `<div style="font-family:Huninn,sans-serif;background:#F4EEFF;padding:18px;color:#3A2A55"><h2 style="margin:0 0 10px">地球儀小卡（31 國＋南極洲＋北極）— 星光工作室 Starlight Studio 原創 2026-11-22，著作權與 IP 屬於星光工作室</h2>
    <div style="display:grid;grid-template-columns:repeat(9,1fr);gap:10px">${keys.map(k => `<div style="background:#fff;border-radius:14px;padding:6px;text-align:center"><div style="width:100%;aspect-ratio:1">${G.PICSVG(k)}</div><b style="font-size:16px">${G.T['n_' + k]}</b><div style="font-size:11px;line-height:1.3">${G.T['s_' + k]}</div></div>`).join('')}</div></div>`;
    document.body.style.cssText = 'margin:0;overflow:auto;height:auto';document.documentElement.style.cssText='height:auto;overflow:auto';
  });
  await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + 'globe_9_cards.png', fullPage: true }); console.log('ok cards');
  console.log(errs.join('\n') || 'no errors'); await b.close();
})();

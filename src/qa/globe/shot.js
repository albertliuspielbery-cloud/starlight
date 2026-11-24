// 地球儀快速截圖：node shot.js <port> <w> <h> <out.png> [js 在進入後執行]
const { chromium } = require('playwright');
(async () => {
  const [port, w, h, out, extra] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2, hasTouch: true, isMobile: +w < 1000 });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror ' + e.message));
  p.on('console', m => { if (m.type() === 'error' || /globe8|gl8/.test(m.text())) errs.push('console ' + m.text()) });
  await p.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  await p.evaluate(() => __ev("try{S.chDone=Math.max(S.chDone||0,41);V2.s3pw=1;}catch(e){};go('globe8')"));
  await p.waitForTimeout(4200);
  if (extra) { await p.evaluate(x=>__ev(x),extra); await p.waitForTimeout(1600) }
  await p.screenshot({ path: out });
  console.log(errs.join('\n') || 'no errors');
  await b.close();
})();

// 地球儀整套測試：轉動、慣性、點海、點國家、找找看一輪（含點錯兩次）、收集冊、返回。node play.js <port> <w> <h>
const { chromium } = require('playwright');
(async () => {
  const [port, w, h] = process.argv.slice(2); const W = +w || 1180, H = +h || 820;
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: true });
  const p = await ctx.newPage();
  // App 版（8982）：headless 沒有 StoreKit 外掛，IAP_ON 會是 false、只開前 5 章（S.chDone 會被收回去）→ 用測試假商店（qa/iapmock.js，什麼都還沒買）
  if (String(port) === '8982') await p.addInitScript(require('fs').readFileSync(__dirname + '/../iapmock.js', 'utf8')); const errs = [], log = [];
  p.on('pageerror', e => errs.push('pageerror ' + e.message));
  p.on('console', m => { if (m.type() === 'error' || /globe8|gl8/.test(m.text())) errs.push('console ' + m.text()) });
  const ev = x => p.evaluate(s => __ev(s), x);
  const ok = (c, m) => { log.push((c ? 'OK ' : 'NG ') + m); if (!c) errs.push('FAIL ' + m) };
  await p.goto(`http://127.0.0.1:${port}/index.html`); await p.waitForFunction(() => typeof window.__ev === 'function', null, { timeout: 90000 }); await p.waitForTimeout(2500);
  // 遊樂園卡片：還沒完成第 41 章是鎖的
  await ev("S.chDone=40;go('park')"); await p.waitForTimeout(1500);
  ok(await ev("!!document.querySelector('.pcard[data-k=\"globe8\"].lockd')"), '第40章時卡片上鎖');
  ok(await ev("(document.querySelector('.pcard[data-k=\"globe8\"]')||{}).dataset?.gz==='games'"), '卡片在小遊戲區');
  const app = await ev("IS_APP"); 
  await ev("S.chDone=41;V2.s3pw=1;go('title')"); await p.waitForTimeout(1200); await ev("go('park')"); await p.waitForTimeout(1500);
  const lk = await ev("!!document.querySelector('.pcard[data-k=\"globe8\"].lockd')");
  ok(app ? lk : !lk, (app ? 'App 沒買 stage9 仍上鎖' : '網頁版完成第41章打開'));
  if (app) { await ev("iapSave(iapOwned().concat(['stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']));go('title')"); await p.waitForTimeout(800); await ev("go('park')"); await p.waitForTimeout(1500); ok(!(await ev("!!document.querySelector('.pcard[data-k=\"globe8\"].lockd')")), 'App 買了第七季、完成第41章打開'); await ev("go('title')"); await p.waitForTimeout(800); }
  await ev("go('globe8')"); await p.waitForTimeout(4200);
  ok(await ev("S.screen==='globe8'"), '進入地球儀');
  const tw = await ev("Math.round(__gl8.VW.lam)+','+Math.round(__gl8.VW.phi)"); ok(tw === '121,22', '開場轉到台灣 ' + tw);
  const box = await (await p.$('#gl8cv')).boundingBox();
  // 轉動＋慣性
  const l0 = await ev("__gl8.VW.lam"); const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  await p.mouse.move(cx, cy); await p.mouse.down(); for (let i = 1; i <= 8; i++) { await p.mouse.move(cx - i * 18, cy + i * 4); await p.waitForTimeout(12) } await p.mouse.up();
  const l1 = await ev("__gl8.VW.lam"); await p.waitForTimeout(700); const l2 = await ev("__gl8.VW.lam");
  ok(Math.abs(l1 - l0) > 10, '拖曳會轉 ' + (l1 - l0).toFixed(1)); ok(Math.abs(l2 - l1) > .5, '放開有慣性 ' + (l2 - l1).toFixed(1));
  await p.waitForTimeout(1500);
  const find = async (want, okf) => ev(`(()=>{const G=__gl8;const ok=${okf};for(let r=0;r<=G.VW.R;r+=6)for(let a=0;a<6.28;a+=r?6/r:7){const x=G.VW.cx+r*Math.cos(a),y=G.VW.cy+r*Math.sin(a);if(ok(G.hitAt(x,y)))return [x,y]}return null})()`);
  const tapAt = async xy => { await p.mouse.click(box.x + xy[0], box.y + xy[1]); };
  // 點海洋
  await ev("__gl8.panTo(-160,5,0)"); await p.waitForTimeout(200);
  let xy = await find('pa', "k=>k==='pa'"); ok(!!xy, '找得到太平洋'); await tapAt(xy); await p.waitForTimeout(400);
  ok((await ev("document.querySelector('#gl8bub').textContent")) === '太平洋', '點海念太平洋');
  // 點國家：小卡
  await ev("__gl8.panTo(30,27,0)"); await p.waitForTimeout(200); xy = await find('eg', "k=>k==='eg'"); await tapAt(xy); await p.waitForTimeout(500);
  ok(await ev("!document.querySelector('#gl8card').hidden&&/埃及/.test(document.querySelector('#gl8card').textContent)"), '點埃及跳小卡');
  ok(await ev("!!V2.gl8seen.eg"), '埃及進收集冊');
  // 點沒選的國家（中國）只念洲名
  await ev("__gl8.panTo(105,35,0)"); await p.waitForTimeout(200); await tapAt([await ev("__gl8.VW.cx"), await ev("__gl8.VW.cy")]); await p.waitForTimeout(300);
  ok((await ev("document.querySelector('#gl8bub').textContent")) === '亞洲', '點中國只念亞洲');
  // 台灣點擊範圍（內容審查 M2）：鏡頭對準台灣，放大和原尺寸各測一次
  for (const z of [1, 2.6]) {
    await ev(`__gl8.setZoom(${z});__gl8.panTo(120.5,24.5,0)`); await p.waitForTimeout(200);
    const at = (lon, lat) => ev(`(()=>{const q=__gl8.proj(${lon},${lat});return __gl8.hitAt(q.X,q.Y)})()`);
    const xm = await at(118.1, 24.6), fz = await at(119.3, 26.1), mid = await at(119.9, 24.3), twc = await at(120.95, 23.7), sea = await at(121.75, 23.3), ph = await at(120.2, 23.0);
    ok(xm === 'as', `zoom${z} 廈門念亞洲 ${xm}`); ok(fz === 'as', `zoom${z} 福州念亞洲 ${fz}`);
    ok(mid === 'tw' || mid === 'pa', `zoom${z} 台灣海峽中線 ${mid}`); ok(twc === 'tw', `zoom${z} 台灣本島 ${twc}`); ok(sea === 'tw', `zoom${z} 台灣東邊近海 ${sea}`); ok(ph === 'tw', `zoom${z} 台灣西南近海 ${ph}`);
  }
  await ev("__gl8.setZoom(1)");
  // 不畫國界：高難度也一樣（看程式裡沒有國界描線）
  // 南極洲、北極
  await ev("__gl8.panTo(0,-70,0)"); await p.waitForTimeout(200); xy = await find('an', "k=>k==='an'"); await tapAt(xy); await p.waitForTimeout(400);
  ok(await ev("/科學家/.test(document.querySelector('#gl8card').textContent)"), '南極洲小卡');
  await ev("__gl8.panTo(0,70,0)"); await p.waitForTimeout(200); xy = await find('arc', "k=>k==='arc'"); await tapAt(xy); await p.waitForTimeout(400);
  ok(await ev("/北極熊住在這裡/.test(document.querySelector('#gl8card').textContent)"), '北極小卡');
  xy = await find('ar', "k=>k==='ar'"); ok(!!xy, '北極海和北極分開點'); 
  // 找找看（高難度），第一題點錯兩次
  if(await ev("!document.querySelector('#gl8card').hidden"))await p.click('#gl8card .gl8x');await p.click('#gl8find');await p.waitForTimeout(400);ok(await ev("!document.querySelector('#gl8menu').hidden"),'找找看選單打開'); await p.waitForTimeout(300); await p.click('#gl8diffs [data-v="hard"]'); await p.click('#gl8go');
  await p.waitForTimeout(3600);
  let wrong = 0;
  for (let i = 0; i < 5; i++) {
    await p.waitForFunction(() => __ev("__gl8.F()&&!__gl8.F().busy"), null, { timeout: 15000 });
    const want = await ev("__gl8.F().q[__gl8.F().i]");
    if (i === 0) {
      const misses = [];
      for (let k = 0; k < 2; k++) { const w2 = await find('x', `k=>k&&k!==${JSON.stringify(want)}&&!(${JSON.stringify(want)}==='ar'&&k==='arc')&&!(k&&__G8.CT.some(c=>c[0]===k&&c[1]===${JSON.stringify(want)}))`); const m0 = await ev("__gl8.F().miss"); for (let t = 0; t < 3; t++) { await tapAt(w2); await p.waitForTimeout(900); if (await ev("__gl8.F().miss") > m0) break } /* 主機很忙時按下到放開會超過 700ms，遊戲當成長按不算點：重點一次 */ wrong++; misses.push(await ev("__gl8.F()&&__gl8.F().miss")) }
      const hinted = await p.waitForFunction(() => __ev("!!__gl8.FX.hint||(__gl8.F()&&__gl8.F().busy)"), null, { timeout: 4000 }).then(() => true, () => false);
      ok(hinted, '第二次錯會發光提示 miss=' + misses.join(','));
      await p.waitForFunction(() => __ev("__gl8.F()&&!__gl8.F().busy"), null, { timeout: 8000 });
      const vis = await ev(`(()=>{const h=__gl8.FX.hint;return !!h})()`); ok(vis, '提示目標 ' + want);
    }
    const t = await find(want, `k=>k===${JSON.stringify(want)}`);
    if (!t) { // 不在畫面上：鏡頭轉過去
      await ev(`(()=>{const C=${JSON.stringify(want)};const c=__G8.CT.find(x=>x[0]===C);})()`);
    }
    const t2 = t || await (async () => { await ev(`__gl8.panTo(...(${JSON.stringify(want)} in {an:1,so:1}?[0,-65]:${JSON.stringify(want)} in {arc:1,ar:1}?[0,65]:[0,0]),0)`); return find(want, `k=>k===${JSON.stringify(want)}`) })();
    let tt = t2; if (!tt) { for (const lon of [0, 60, 120, 180, -120, -60]) { for (const lat of [-40, 0, 40]) { await ev(`__gl8.panTo(${lon},${lat},0)`); tt = await find(want, `k=>k===${JSON.stringify(want)}`); if (tt) break } if (tt) break } }
    ok(!!tt, `第${i + 1}題 ${want} 找得到`); if (!tt) break;
    await tapAt(tt); await p.waitForTimeout(600);
    ok(await ev(`document.querySelectorAll('#gl8dots i.on').length===${i + 1}`), `第${i + 1}題答對`);
  }
  await p.waitForFunction(() => __ev("!__gl8.F()"), null, { timeout: 30000 }).catch(() => {});
  ok(await ev("V2.globe8Day===today()"), '玩完拿到寶石（globe8Day）');
  ok(await ev("!__gl8.F()"), '回到自由轉');
  // 收集冊有地球儀頁
  ok(await ev("window.__book19&&__book19.secs().some(s=>s.id==='globe8')"), '收集冊有地球儀頁');
  // 返回
  await p.click('#pback'); await p.waitForTimeout(1800); ok(await ev("S.screen==='park'"), '返回遊樂園');
  console.log(port, W + 'x' + H, '\n' + log.join('\n'), '\n' + (errs.length ? errs.join('\n') : 'no errors'));
  await b.close();
})();

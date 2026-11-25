// 地球儀：每個國家在找找看（高難度）都點得中（UX 審查 必修 3；2026-11-25 起 37 國，含中國、俄羅斯、芬蘭、土耳其、阿聯酋、坦尚尼亞）。node reach.js <port> <w> <h> [quick]
// 1. 判定（judge）：國家轉到畫面正中、和轉到偏旁邊（離中心 0.45R）兩種，點國家中心、中心周圍 8／14／20px 八個方向都要算對；
//    算出「點了會算對」的面積，等效直徑至少 44px。台灣題：點在廈門、福州陸地上不算（M2）；那裡念「中國」；中國題點台灣不算。
// 2. 真的點：每一國開一題，用滑鼠點在中心旁邊 10px，題目圓點要變成答對。
// 3. 自由轉：點每一國的中心都念那一國；小國旁邊 8px 的海上也念那一國；廈門、福州念「亞洲」。
// 4. 德國提示：點錯兩次 → 鏡頭拉近、轉過去、發光；點發光處旁邊 8px 算對；下一題鏡頭拉回來。
const { chromium } = require('playwright');
(async () => {
  const [port, w, h, quick] = process.argv.slice(2); const W = +w || 375, H = +h || 667;
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: true });
  const p = await ctx.newPage();
  // App 版（8982）：headless 沒有 StoreKit 外掛，IAP_ON 會是 false、只開前 5 章（S.chDone 會被收回去）→ 用測試假商店（qa/iapmock.js，什麼都還沒買）
  if (String(port) === '8982') await p.addInitScript(require('fs').readFileSync(__dirname + '/../iapmock.js', 'utf8')); const errs = [], log = []; let nOK = 0;
  p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('response', r => { if (r.status() >= 400) log.push('http ' + r.status() + ' ' + r.url().slice(0, 100)) });
  p.on('console', m => { if (m.type() === 'error' || /globe8|gl8/.test(m.text())) errs.push('console ' + m.text()) });
  const ev = x => p.evaluate(s => __ev(s), x);
  const ok = (c, m) => { if (c) nOK++; else { log.push('NG ' + m); errs.push('FAIL ' + m) } };
  await p.goto(`http://127.0.0.1:${port}/index.html`); await p.waitForFunction(() => typeof window.__ev === 'function', null, { timeout: 90000 }); await p.waitForTimeout(2500);
  if (await ev('IS_APP')) await ev("iapSave(iapOwned().concat(['full','stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']))");
  await ev("S.chDone=45;V2.s3pw=1;save();go('globe8')"); await p.waitForTimeout(4500);
  ok(await ev("S.screen==='globe8'"), '進入地球儀');
  const CT = await ev("__G8.CT.map(c=>c[0])");
  const box = await (await p.$('#gl8cv')).boundingBox();
  // ---- 1. 判定 ----
  const rows = [];
  for (const k of CT) {
    for (const where of ['center', 'side']) {
      const r = await ev(`(()=>{const G=__gl8,c=G.ctr(${JSON.stringify(k)}).c;G.setZoom(1);
        // side：國家在畫面中心偏左上 0.45R（孩子沒有把它轉到正中間）
        if(${JSON.stringify(where)}==='side'){G.panTo(c[0]+20,c[1]-14,0)}else G.panTo(c[0],c[1],0);
        const I=G.ctr(${JSON.stringify(k)});const res={k:${JSON.stringify(k)},rad:+I.rad.toFixed(1),z:+I.z.toFixed(2),bad:[],area:0};
        const J=(x,y)=>G.judge(x,y,${JSON.stringify(k)}).ok;
        if(!J(I.X,I.Y))res.bad.push('c');
        for(const d of [8,14,20])for(let a=0;a<8;a++){const x=I.X+d*Math.cos(a*Math.PI/4),y=I.Y+d*Math.sin(a*Math.PI/4);
          if(${JSON.stringify(k)}==='tw'){const b=G.baseHit(x,y);if(b&&b!=='tw'&&!['pa','at','io','ar','so'].includes(b))continue}// M2：台灣題點在其他陸地上本來就不算
          // 點在另一個介紹的國家上、而題目國家在畫面上不小（半徑 16px 以上）：本來就該算錯（念那一國），不檢查
          {const hk=G.hitAt(x,y);if(hk&&hk!==${JSON.stringify(k)}&&__G8.CT.some(c=>c[0]===hk)&&I.rad>=16)continue;if(${JSON.stringify(k)}!=='tw'&&G.baseHit(x,y)==='tw')continue}
          if(!J(x,y))res.bad.push(d+'@'+a*45)}
        let n=0;for(let y=I.Y-70;y<=I.Y+70;y+=2)for(let x=I.X-70;x<=I.X+70;x+=2)if(J(x,y))n++;res.area=n*4;res.dia=Math.round(2*Math.sqrt(res.area/Math.PI));
        // 自由轉：點在國家上（離中心最近、在輪廓裡面的點；越南這種彎的國家，重心會落在別國）念這一國
        let fx=I.X,fy=I.Y;if(G.baseHit(fx,fy)!==${JSON.stringify(k)}){let f=0;for(let r=1;r<=40&&!f;r++)for(let a=0;a<16&&!f;a++){const x=I.X+r*Math.cos(a*Math.PI/8),y=I.Y+r*Math.sin(a*Math.PI/8);if(G.baseHit(x,y)===${JSON.stringify(k)}){fx=x;fy=y;f=1}}}
        res.free=G.hitAt(fx,fy);return res})()`);
      rows.push([where, r]);
      ok(r.bad.length === 0, `${k} ${where} 判定 漏掉 ${r.bad.join(',')}`);
      ok(r.dia >= 44, `${k} ${where} 可點面積等效直徑 ${r.dia}px`);
      ok(r.free === k, `${k} ${where} 自由轉點在國家上念 ${r.free}`);
    }
  }
  const small = rows.filter(([w, r]) => w === 'center').map(([, r]) => r).sort((a, b) => a.dia - b.dia).slice(0, 8);
  log.push('最小的 8 國（找題可點等效直徑 px / 國家半徑 px）：' + small.map(r => `${r.k} ${r.dia}/${r.rad}`).join('  '));
  // M2：台灣題、自由轉
  for (const z of [1, 2.6]) {
    const m2 = await ev(`(()=>{const G=__gl8;G.setZoom(${z});G.panTo(120.5,24.5,0);const at=(lon,lat)=>{const q=G.proj(lon,lat);return [G.hitAt(q.X,q.Y),G.judge(q.X,q.Y,'tw').ok]};const cnAt=(lon,lat)=>{const q=G.proj(lon,lat);return G.judge(q.X,q.Y,'cn').ok};return {xm:at(118.1,24.6),fz:at(119.3,26.1),qz:at(118.6,24.9),tw:at(120.95,23.7),sea:at(121.75,23.3),twcn:[cnAt(120.95,23.7),cnAt(121.2,24.6),cnAt(120.3,22.8),cnAt(121.75,23.3)].some(Boolean)}})()`);
    // 2026-11-25 起福建陸地念「中國」（台灣題一樣不算對）
    ok(m2.xm[0] === 'cn' && !m2.xm[1], `zoom${z} 廈門：念 ${m2.xm[0]}、台灣題算對=${m2.xm[1]}`);
    ok(m2.fz[0] === 'cn' && !m2.fz[1], `zoom${z} 福州：念 ${m2.fz[0]}、台灣題算對=${m2.fz[1]}`);
    ok(m2.qz[0] === 'cn' && !m2.qz[1], `zoom${z} 泉州：念 ${m2.qz[0]}、台灣題算對=${m2.qz[1]}`);
    ok(!m2.twcn, `zoom${z} 中國題點台灣島、台灣近海不算對 ${m2.twcn}`);
    ok(m2.tw[0] === 'tw' && m2.tw[1], `zoom${z} 台灣本島 ${m2.tw}`); ok(m2.sea[0] === 'tw' && m2.sea[1], `zoom${z} 台灣東邊近海 ${m2.sea}`);
  }
  // 自由轉：小國旁邊 8px 的海上念那一國
  for (const [k, lon, lat] of [['sg', 104.4, 1.0], ['kr', 129.6, 35.0], ['gr', 23.5, 37.0], ['is', -24.5, 64.6], ['nl', 4.0, 53.0], ['tw', 122.4, 23.6], ['ae', 54.6, 25.4]]) {
    const r = await ev(`(()=>{const G=__gl8;G.setZoom(1);const c=G.ctr('${k}').c;G.panTo(c[0],c[1],0);const I=G.ctr('${k}');const q=G.proj(${lon},${lat});
      // 從國家中心往那個方向找第一個海上的點（約 8px）
      const dx=q.X-I.X,dy=q.Y-I.Y,l=Math.hypot(dx,dy)||1;for(let d=4;d<=I.rad*2+12;d++){const x=I.X+dx/l*d,y=I.Y+dy/l*d;const b=G.baseHit(x,y);if(['pa','at','io','ar','so'].includes(b))return [G.hitAt(x,y),d,b]}return ['nosea']})()`);
    ok(r[0] === k, `自由轉 ${k} 旁邊海上 ${r[1]}px 念 ${r[0]}（輪廓是 ${r[2]}）`);
  }
  // ---- 2. 真的點（找找看，高難度） ----
  await ev("__gl8.setZoom(1)");
  const list = quick ? ['de', 'kr', 'gr', 'is', 'sg', 'nl', 'ch', 'ae', 'cn', 'ru'] : CT.filter(k => k !== 'tw').concat(['tw']);
  await ev(`(()=>{__gl8.diff('hard');__gl8.startFind()})()`);
  await p.waitForFunction(() => __ev("__gl8.F()&&!__gl8.F().busy&&__gl8.F().i===0&&document.querySelector('#gl8dots i.now')"), null, { timeout: 20000 });
  for (const k of list) {
    await ev(`(()=>{const F=__gl8.F();F.q=[${JSON.stringify(k)},'pa','pa','pa','pa'];F.i=0;F.miss=0;F.busy=false;document.querySelectorAll('#gl8dots i').forEach(d=>d.classList.remove('on'));const c=__gl8.ctr(${JSON.stringify(k)}).c;__gl8.panTo(c[0]+8,c[1]-5,0)})()`);
    await p.waitForTimeout(150);
    const I = await ev(`__gl8.ctr(${JSON.stringify(k)})`);
    // 台灣：往東邊（海上）偏 10px；其他：往右下偏 10px（常常會落在鄰國或海上）
    // 台灣：往東邊（海上）偏 10px；其他：往右下偏 10px（常常會落在鄰國或海上）。
    // 題目國家在畫面上不小（半徑 16px 以上）時，旁邊別的介紹國家本來就該算錯：換一個方向，不點在別國上
    let off = k === 'tw' ? [10, 0] : [7, 7];
    if (k !== 'tw' && I.rad >= 16) off = await ev(`(()=>{const G=__gl8,I=G.ctr(${JSON.stringify(k)});for(const [dx,dy] of [[7,7],[-7,7],[7,-7],[-7,-7],[10,0],[-10,0],[0,10],[0,-10]]){const h=G.hitAt(I.X+dx,I.Y+dy);if(!(h&&h!==${JSON.stringify(k)}&&__G8.CT.some(c=>c[0]===h)))return [dx,dy]}return [7,7]})()`);
    await p.mouse.click(box.x + I.X + off[0], box.y + I.Y + off[1]);
    const got = await p.waitForFunction(() => __ev("document.querySelectorAll('#gl8dots i.on').length===1"), null, { timeout: 2500 }).then(() => true, () => false);
    ok(got, `真的點 ${k}（中心旁 10px）算對`);
    await p.waitForFunction(() => __ev("!__gl8.F()||__gl8.F().i>=1"), null, { timeout: 8000 }).catch(() => {});
    await p.waitForTimeout(150);
  }
  // ---- 4. 德國提示：鏡頭拉近 ----
  if (await ev("!!__gl8.F()")) {
    await ev(`(()=>{const F=__gl8.F();F.q=['de','pa','pa','pa','pa'];F.i=0;F.miss=0;F.busy=false;F.zBack=null;__gl8.setZoom(1);__gl8.panTo(-40,10,0)})()`);
    await p.waitForTimeout(200);
    for (let i = 0; i < 2; i++) { const m0 = await ev('__gl8.F().miss'); const c = await ev('[__gl8.VW.cx,__gl8.VW.cy]'); for (let t = 0; t < 3; t++) { await p.mouse.click(box.x + c[0], box.y + c[1]); await p.waitForTimeout(700); if (await ev('__gl8.F().miss') > m0) break } }
    await p.waitForFunction(() => __ev("!!__gl8.FX.hint&&!__gl8.F().busy"), null, { timeout: 6000 }).catch(() => {});
    const z = await ev('__gl8.VW.zoom'); ok(z > 1.05, '德國提示時鏡頭拉近 zoom=' + z.toFixed(2));
    ok(await ev("!!__gl8.FX.hint&&__gl8.FX.hint.k==='de'"), '德國發光');
    const I = await ev(`__gl8.ctr('de')`); ok(I.rad >= 26 || z > 2.55, '拉近後德國半徑 ' + I.rad.toFixed(1) + 'px（zoom ' + z.toFixed(2) + '）');
    await p.mouse.click(box.x + I.X + 8, box.y + I.Y + 2);
    const got = await p.waitForFunction(() => __ev("document.querySelectorAll('#gl8dots i.on').length>=1"), null, { timeout: 2500 }).then(() => true, () => false);
    ok(got, '提示後點德國旁邊 8px 算對');
    await p.waitForFunction(() => __ev("!__gl8.F()||(__gl8.F().i>=1&&!__gl8.FX.anim)"), null, { timeout: 9000 }).catch(() => {});
    await p.waitForTimeout(400);
    ok(Math.abs(await ev('__gl8.VW.zoom') - 1) < .02, '下一題鏡頭拉回原來大小 zoom=' + (await ev('__gl8.VW.zoom')).toFixed(2));
  }
  console.log(port, W + 'x' + H, 'OK', nOK, '\n' + log.join('\n'), '\n' + (errs.length ? errs.join('\n') : 'no errors'));
  await b.close();
})();

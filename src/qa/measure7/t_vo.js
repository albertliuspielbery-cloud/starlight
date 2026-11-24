// 慢速網路＋不支援 Range、清空快取，第一次進第 43 章（河馬醫生開場）＋大小寫配對快速連配：裝置語音、speakOne 應該 0 次，錄音要真的播
// node t_vo.js [web|app] [KB/s]
const L=require('../s7/lib');const fs=require('fs');
const ver=process.argv[2]||'web';const KBS=+(process.argv[3]||600);
const MOCK=fs.readFileSync(__dirname+'/../iapmock.js','utf8');
const HOOK=`(()=>{window.__T={tts:[],one:[],play:[],chain:[],say:[]};try{const SP=SpeechSynthesis.prototype;SP.speak=function(u){window.__T.tts.push(String(u.text));setTimeout(()=>{try{u.onend&&u.onend(new Event('end'))}catch(e){}},30)}}catch(e){}})()`;
const ev=(p,c)=>p.evaluate(c=>__ev(c),c);
(async()=>{const b=await L.chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 const ctx=await b.newContext({viewport:{width:1180,height:820}});const page=await ctx.newPage();const errs=[];
 page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{const t=m.text();if(/vowait|notts|measure7/.test(t))errs.push(t)});
 // Range：測試伺服器本來就不支援（回 200）；確認一下
 const cdp=await ctx.newCDPSession(page);await cdp.send('Network.enable');
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:120,downloadThroughput:KBS*1024,uploadThroughput:256*1024});
 const sv=L.save40('princess',{sound:true,vo:true,music:false});
 await page.addInitScript(HOOK);
 await page.addInitScript(([sv,app])=>{try{if(!sessionStorage.getItem('__init')){sessionStorage.setItem('__init','1');localStorage.setItem('pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero:'princess',chosen:1}]}));localStorage.setItem('pp4',JSON.stringify(sv));localStorage.setItem('pp4v2',JSON.stringify({listenFirst:false,s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1}));localStorage.setItem('pp4setup','done');localStorage.setItem('__iapmock_owned',JSON.stringify(['full','stage2','stage3','stage4','stage5','stage6','stage7','stage8','stage9']))}}catch(e){}},[sv,ver==='app']);
 if(ver==='app')await page.addInitScript(MOCK);
 const t0=Date.now();await page.goto(process.env.URLX||L.URL[ver],{timeout:180000});
 await page.waitForFunction(()=>typeof window.__ev==='function'&&document.querySelector('#screen'),null,{timeout:180000});
 console.log('loaded',(Date.now()-t0)/1000,'s');
 const rng=await page.evaluate(async()=>{const r=await fetch('voice/'+__ev('VOICE_INDEX'),{headers:{Range:'bytes=0-9'}});return r.status});console.log('Range 測試回應',rng);
 await page.mouse.click(600,400);await page.waitForTimeout(500);
 // 外層攔截：speakOne（所有呼叫）、voPlay、__voChain85、say
 await ev(page,`(()=>{const T=window.__T;const so=speakOne;speakOne=function(p,o){T.one.push([String(typeof p==='object'?(p.en!=null?p.en:p.zh):p).slice(0,40),o&&o.__g,sayGen]);return so.apply(this,arguments)};
  const vp=voPlay;voPlay=function(b){T.play.push([b&&b.__k||'?',Math.round(performance.now())]);return vp.apply(this,arguments)};
  const ch=window.__voChain85;if(ch)window.__voChain85=function(bs,g){T.chain.push(bs.map(b=>b.__k).join('+'));return ch.apply(this,arguments)};
  const sy=say;say=function(parts){try{T.say.push([Math.round(performance.now()),JSON.stringify(parts).slice(0,80)])}catch(e){}return sy.apply(this,arguments)}})()`);
 const st=async tag=>{const s=await ev(page,`({got:VO.got,files:VO.files&&VO.files.length,idx:!!VO.idx,rangeOK:VO.rangeOK,chunkOK:VO.chunkOK,vw:Object.assign({},window.__vw||{},{log:undefined,one:undefined}),screen:S.screen})`);console.log(tag,JSON.stringify(s))};
 await st('start');
 // 1) 第一次進第 43 章第 1 關（河馬醫生波波開場）
 await ev(page,`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(42);startLevel(0)})()`);
 const hippo='你好，我是河馬醫生波波！哪裡不舒服，都可以跟我說喔。';
 for(let i=0;i<240;i++){await page.waitForTimeout(500);const d=await page.evaluate(h=>{const T=window.__T;return {p:T.play.some(x=>x[0]==='z|'+h),c:T.chain.length}},hippo);if(d.p)break;}
 await st('after hippo');
 // 直接用 say 再試一次那一句（第一次進來時一定是這句）
 const hp=await page.evaluate(h=>window.__T.play.filter(x=>/河馬醫生波波/.test(x[0])),hippo);console.log('河馬整句播放',JSON.stringify(hp));
 await page.waitForTimeout(6000);
 // 2) 大小寫配對：快速連配（每 120～250ms 點一下）
 const Q=require('../s7/qtest');
 for(let r=0;r<6;r++){await Q.playQ(page,'letter:s7case:a|b|c|d',r%2?'mid':'easy',42);await page.waitForTimeout(300);
  const ok=await page.evaluate(()=>__ev(`(()=>{const play=document.querySelector('.stage .play');return !!play.querySelector('.c7b.up')})()`));if(!ok){continue}
  for(let k=0;k<4;k++){const pair=await page.evaluate(()=>{const u=document.querySelector('.stage .play .c7b.up:not([disabled])');if(!u)return null;const l=document.querySelector(`.stage .play .c7b.lo[data-l="${u.dataset.u}"]:not([disabled])`);if(!l)return null;u.click();return u.dataset.u});
   if(!pair)break;await page.waitForTimeout(120+Math.random()*130);await page.evaluate(c=>{const l=document.querySelector(`.stage .play .c7b.lo[data-l="${c}"]:not([disabled])`);l&&l.click()},pair);await page.waitForTimeout(150+Math.random()*120)}
  await page.waitForTimeout(r<5?900:8000)}
 await st('after case');
 const T=await page.evaluate(()=>window.__T);const vw=await page.evaluate(()=>window.__vw);
 console.log('speechSynthesis.speak 次數',T.tts.length,JSON.stringify(T.tts.slice(0,8)));
 console.log('speakOne 次數',T.one.length,JSON.stringify(T.one.slice(0,10)));
 console.log('voPlay',T.play.length,JSON.stringify(T.play.map(x=>x[0]).slice(0,60)));
 console.log('chain(拆句連播)',T.chain.length,JSON.stringify(T.chain.slice(0,10)));
 console.log('vowait',JSON.stringify(Object.assign({},vw,{log:undefined})));console.log('vowait log',JSON.stringify((vw.log||[]).slice(-25)));
 console.log('say 次數',T.say.length,JSON.stringify(T.say.slice(0,4)));
 const boot=await page.evaluate(()=>window.__boot99u&&window.__boot99u.log.slice(-10));console.log('boot',JSON.stringify(boot));
 console.log('errs',errs.slice(0,8));
 fs.writeFileSync(__dirname+`/r_vo_${ver}.json`,JSON.stringify({T,vw},null,1));
 await b.close()})();

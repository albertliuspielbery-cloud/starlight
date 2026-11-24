// 第七季測試共用（2026-11-22 星光工作室 Starlight Studio）
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const FAKE=fs.readFileSync(path.join(__dirname,'fake_s7data.js'),'utf8');
const MOCK=fs.readFileSync(path.join(__dirname,'../iapmock.js'),'utf8');
const URL={web:'http://127.0.0.1:8981/index.html',app:'http://127.0.0.1:8982/index.html'};
// 第 40 章完成的存檔
function save40(hero,extra={}){const progs=Array(40).fill(10).concat([0,0,0,0,0]);
 return Object.assign({look:{dress:hero==='prince'?'b_basic':'basic',pet:'unicorn'},owned:[],wallet:200,progs,ch:39,chDone:40,diff:'mid',sound:false,music:false,voice:true,name:'',vo:true,rest:0},extra)}
async function open(browser,{ver='web',hero='princess',save,v2={},owned=[],fake=false,vp={width:1180,height:820},errs=[],voice=process.env.VOICE==='1'}={}){
 const ctx=await browser.newContext({viewport:vp,deviceScaleFactor:1,hasTouch:vp.width<700,isMobile:false});
 const page=await ctx.newPage();
 page.on('pageerror',e=>errs.push('pageerror: '+e.message));
 page.on('console',m=>{if(m.type()==='error'){let u='';try{u=m.location().url||''}catch(e){}errs.push('console: '+m.text()+(/Failed to load resource/.test(m.text())?' @ '+u:''))}const t=m.text();if(/^(b7|newq7|s7|q41|say7|intro7|pt7|dex7|cert7|fin6to7|th41|applock7|write7|wr free7|pet7reg|room41|dress41|pcat7|an41|bg41)\b/.test(t))errs.push('log: '+t)});
 let sv=save||save40(hero);if(voice){sv=Object.assign({},sv,{sound:true,vo:true,music:false});await page.addInitScript(VHOOK)}
 await page.addInitScript(([hero,sv,v2,owned])=>{try{const S=Storage.prototype.setItem;if(!sessionStorage.getItem('__init')){sessionStorage.setItem('__init','1');
   S.call(localStorage,'pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero,chosen:1}]}));
   S.call(localStorage,hero==='prince'?'pp4:prince':'pp4',JSON.stringify(sv));
   S.call(localStorage,'pp4v2',JSON.stringify(Object.assign({listenFirst:false,s3pw:1,seenWorld:1,tutDone:1,parkTour:1,onb:1},v2)));
   S.call(localStorage,'__iapmock_owned',JSON.stringify(owned))}}catch(e){}},[hero,sv,v2,owned]);
 if(fake)await page.addInitScript(FAKE);
 if(ver==='app')await page.addInitScript(MOCK);
 await page.goto(URL[ver]);
 await page.waitForFunction(()=>typeof window.__ev==='function'&&(window.__game||document.querySelector('.title')||document.querySelector('#screen')),null,{timeout:90000}).catch(()=>{});
 await page.waitForTimeout(2500);
 if(voice)await voiceArm(page);
 return {ctx,page,errs}}
// 語音檢查（VOICE=1）：裝置語音一律記下來（不真的念）；say() 收到的每一句在過濾前記下來，並當場用遊戲自己的 voResolve 判斷有沒有錄音
const VHOOK=`(()=>{window.__V={tts:[],said:[],probe:{},play:{}};try{const SP=SpeechSynthesis.prototype;SP.speak=function(u){let w='';try{w=window.__ev?__ev('S.screen+"/"+S.ch+"/"+(S.pmode||"")+(VO.files&&VO.got>=VO.files.length?"":"/包未載完")'):''}catch(e){}window.__V.tts.push({t:String(u.text),w});setTimeout(()=>{try{u.onend&&u.onend(new Event('end'))}catch(e){}try{u.dispatchEvent(new Event('end'))}catch(e){}},30)}}catch(e){}})()`;
async function voiceArm(page){
 await page.waitForFunction(()=>window.__ev&&__ev('!!(VO.idx&&VO.files&&VO.got>=VO.files.length)'),null,{timeout:300000}).catch(async()=>console.log('voice: packs not all loaded',await page.evaluate(()=>__ev('Object.keys(VO.abs).length+"/"+VO.files.length+" got="+VO.got+" err="+VO.err'))));
 await page.evaluate(()=>__ev(`(()=>{const V=window.__V;if(V.armed)return;V.armed=1;const raw=VO.idx;V.raw=raw;const has=k=>!!raw[k];
  const vt=t=>{try{return voiceT(typeof heroT==='function'?heroT(t):t)}catch(e){return t}};
  const resolveOK=(t,who)=>{const u=vt(String(t)).replace(/<br>/g,'').replace(/⁠/g,'').trim();if(!u)return [true,[]];const pre=who==='prince'?'pz|':who==='dragon'?'dz|':'';
   if(!pre&&(has('z|'+u)||has('z|'+voCk(u))))return [true,['z|'+u]];const bad=[];const ks=[];
   voSents(u).forEach(s=>{if(pre){if(has(pre+s.trim()))ks.push(pre+s.trim());else bad.push(s)}else{const r=voResolve(s);r.forEach(g=>{if(typeof g==='string')ks.push(g);else bad.push(g.tts)})}});return [!bad.length,ks,bad]};
  const where=()=>S.screen+'/'+S.ch+'/'+(S.pmode||'');
  const _s=say;say=function(parts,opt){try{(Array.isArray(parts)?parts:[parts]).forEach(p=>{if(p==null||p===''||(p&&p.pause))return;
    if(typeof p==='string'){const [ok,ks,bad]=resolveOK(p,'');V.said.push({t:p,ok,ks,bad,w:where()})}
    else if(p.en!=null){const sl=p.slow||0;const k=['e'+sl+'|'+p.en].concat(sl===1?['e0|'+p.en]:[]).find(has);V.said.push({t:'EN:'+p.en+(sl?'(slow'+sl+')':''),ok:!!k,ks:k?[k]:[],w:where()})}
    else if(p.zh!=null&&p.slow){const sl=p.slow;const k='z'+sl+'|'+String(p.zh).trim();let ok=has(k),ks=ok?[k]:[];if(!ok&&sl===1){const [o2,k2]=resolveOK(p.zh,'');ok=o2;ks=k2}V.said.push({t:p.zh+'(slow'+sl+')',ok,ks,bad:ok?[]:[k],w:where()})}
    else if(p.zh!=null){const [ok,ks,bad]=resolveOK(p.zh,p.who==='prince'?(typeof ISBOY!=='undefined'&&ISBOY?'dragon':'prince'):p.who||'');V.said.push({t:p.zh,who:p.who||'',ok,ks,bad,w:where()})}})}catch(e){V.said.push({t:'ERR '+e.message,ok:false,w:where()})}
   return _s.apply(this,arguments)};
  {const _so=speakOne;speakOne=function(p,o){try{const ob=typeof p==='object';V.tts.push({t:String(ob?(p.en!=null?p.en:p.zh):p),w:where()+'/speakOne'+(ob&&p.slow?'/slow'+p.slow:'')+(ob&&p.en!=null?'/en':''),st:String(new Error().stack).split(String.fromCharCode(10)).slice(2,6).map(x=>x.trim().slice(0,60)).join(' < ')})}catch(e){}return _so.apply(this,arguments)}}
  voPlay=function(b){const k=b&&b.__k||'?';V.play[k]=(V.play[k]||0)+1;return new Promise(r=>setTimeout(()=>r(true),15))};
  VO.idx=new Proxy(raw,{get(t,k){if(typeof k==='string'&&/^[a-z0-9]+\\|/.test(k)&&!t[k]){const w=where();(V.probe[k]=V.probe[k]||{n:0,w}).n++}return t[k]}});
 })()`));}
async function voiceDump(page){return page.evaluate(()=>{const V=window.__V||{};const F=__ev('VO.files');const raw=V.raw||{};return {tts:V.tts||[],said:V.said||[],probe:V.probe||{},play:Object.entries(V.play||{}).map(([k,n])=>[k,n,raw[k]?F[raw[k][0]]:null])}})}
const ev=(page,f,a)=>page.evaluate(f,a);
async function closeOverlays(page){await page.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove())})}
module.exports={chromium,open,save40,ev,URL,closeOverlays,voiceArm,voiceDump};

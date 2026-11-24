// 其他項目：拆段故事線索、關卡開場卡、字母歌、攝影師相簿／大照片、收集冊分頁、寵物小屋、破關小劇場標題、換裝間貝雷帽／背包。node misc.js vps [ver] [items]
const {R,VP,open,ev}=require('./lib');
const vps=(process.argv[2]||'padL,padP,ip,se,land,landse').split(',');const ver=process.argv[3]||'web';const items=(process.argv[4]||'seg,intro,abc,photo,cbook,pet,theater,ward').split(',');
const W=(p,ms)=>p.waitForTimeout(ms);
const offs=(page,sel)=>page.evaluate(sel=>{const W=innerWidth,H=innerHeight;return [...document.querySelectorAll(sel)].filter(e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>0&&s.visibility!=='hidden'}).map(e=>{const r=e.getBoundingClientRect();return `${(e.id||e.className||e.tagName).toString().split(' ')[0]}[${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}]${(r.left<-1||r.top<-1||r.right>W+1||r.bottom>H+1)?'!OFF':''}`}).join(' ')},sel);
(async()=>{const b=await R.chromium.launch();
 for(const vp of vps){const extra={chDone:45,progs:Array(45).fill(10),owned:['bag41','dress43','b_paint43','beret43','redpanda44','mypic45','shelf42'],look:{dress:'basic',pet:'redpanda44'}};
  const {page,ctx,errs}=await open(b,vp,{ver,extra,v2:{rvDaily:false,rvMid:false,gateTour:1}});const e=c=>ev(page,c);const tag=`${ver}_${vp}`;
  const shot=async n=>page.screenshot({path:`${__dirname}/shots/m_${tag}_${n}.png`});
  try{
  if(items.includes('seg')){await e(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(40);going=false;go('story19',{mode:'seg',c:40,k:2})})()`);await W(page,1600);
   console.log(vp,'seg41',await offs(page,'.st19clue,#st19skip,.st19slot'));await shot('seg41')}
  if(items.includes('intro')){for(const [ch,lv] of [[45,0],[42,3]]){await e(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());S.pmode=null;setCh(${ch-1});S.diff='mid';going=false;startLevel(${lv})})()`);await W(page,1800);
    console.log(vp,'intro',ch,await offs(page,'.stage .overlay .card,.stage .overlay .card .btn'));await shot(`intro_c${ch}`)}}
  if(items.includes('abc')){await e(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(41);going=false;go('map')})()`);await W(page,1500);
   await page.evaluate(()=>{window.__abcSong7(()=>{})});await W(page,6000);console.log(vp,'abc',await offs(page,'.abc7,#abc7x,.abc7g span:last-child'));await shot('abc');await page.evaluate(()=>{const x=document.querySelector('#abc7x');if(x)x.click()});await W(page,500)}
  if(items.includes('photo')){await e("go('photo8')");await W(page,2500);await page.evaluate(()=>{document.querySelector('#ph8go').click()});await W(page,1500);
   for(let r=0;r<16;r++){if(await page.evaluate(()=>!!document.querySelector('.ph8end')))break;await page.waitForFunction(()=>{const g=__p8.G();return g&&(!g.busy||g.busy==='wait')},null,{timeout:8000}).catch(()=>{});const fr=await page.evaluate(()=>{const g=__p8.G();return g&&__p8.solve(g.M,g.q)});if(!fr)break;await page.evaluate(fr=>__p8.aim(fr),fr);await W(page,300);await page.evaluate(()=>{if(!document.querySelector('.overlay'))document.querySelector('#ph8shut').click()});await W(page,2500)}
   await W(page,2500);console.log(vp,'album',await offs(page,'.ph8end,#ph8again,#ph8all,#ph8home'));await shot('album');
   await page.evaluate(()=>document.querySelector('#ph8all').click());await W(page,900);console.log(vp,'all',await offs(page,'.ph8all,.ph8all .xclose'));await shot('allphotos');
   await page.evaluate(()=>{const t=document.querySelector('.ph8th');if(t)t.click()});await W(page,800);console.log(vp,'big',await offs(page,'.ph8big,.ph8big .btn,.ph8big img'));await shot('big');
   await page.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>o.remove())})}
  if(items.includes('cbook')){await e("go('cbook')");await W(page,2000);console.log(vp,'cbook',await page.evaluate(()=>[...document.querySelectorAll('.cbtab')].map(t=>{const b=t.querySelector('b');const r=t.getBoundingClientRect();return `${b.textContent}${b.scrollWidth>b.clientWidth+1?'(切)':''}[${r.width|0}x${r.height|0}${r.right>innerWidth?'!OFF':''}]`}).join(' ')));await shot('cbook');
   await page.evaluate(()=>{const t=[...document.querySelectorAll('.cbtab')].find(t=>/動物園/.test(t.textContent));if(t)t.click()});await W(page,900);await shot('cbook_zoo')}
  if(items.includes('pet')){await e("go('pethouse')");await W(page,2200);console.log(vp,'pet',await offs(page,'.pswitch .psw.on'));await shot('pethouse')}
  if(items.includes('theater')){await e(`(()=>{hush();document.querySelectorAll('.overlay').forEach(o=>o.remove());setCh(40);going=false;go('theater93',{ch:40,mode:'replay'})})()`);await W(page,2600);console.log(vp,'theater',await offs(page,'.th93title,.th93skip'));await shot('theater41');await e("hush();go('title')");await W(page,1200)}
  if(items.includes('ward')){await e("go('wardrobe')");await W(page,2200);
   for(const [t,id] of [['head','beret43'],['acc','bag41']]){await page.evaluate(t=>{document.querySelectorAll('.coach').forEach(c=>c.remove());document.querySelector(`.w90tab[data-t="${t}"]`).click()},t);await W(page,700);
    const ok=await page.evaluate(id=>{document.querySelectorAll('.coach').forEach(c=>c.remove());const o=document.querySelector(`#opts .opt[data-id="${id}"]`);if(!o)return 'missing';o.scrollIntoView({block:'center'});o.click();return 'clicked'},id);await W(page,1000);
    const look=await e('JSON.stringify({head:S.look.head,back:S.look.back})');console.log(vp,'ward',t,id,ok,look,await offs(page,`#opts .opt[data-id="${id}"]`));await shot(`ward_${id}`)}}
  }catch(err){console.log(vp,'ERR',err.message)}
  const ee=errs.filter(x=>!/favicon|Failed to load|^log:/.test(x));if(ee.length)console.log('ERRS',vp,ee.slice(0,6));await ctx.close()}
 await b.close()})();

// 語音完整性（程式找句子）：把第七季、地球儀、攝影師、寫字、季完結、故事屋新書會念的句子全部列出，用遊戲自己的 voResolve 判斷有沒有錄音。
// 公主、王子各跑一次（heroT 會換字）。node voice_static.js → logs/voice_static_<hero>.json
const L=require('../s7/lib');const fs=require('fs');
(async()=>{const b=await L.chromium.launch();
 for(const hero of ['princess','prince']){const errs=[];
  const {ctx,page}=await L.open(b,{ver:'web',hero,errs,save:L.save40(hero,{chDone:45,progs:Array(45).fill(10)}),voice:false});
  await page.waitForFunction(()=>__ev('!!VO.idx'),null,{timeout:60000});
  const r=await page.evaluate(()=>__ev(`(()=>{const has=k=>!!VO.idx[k];
   const vt=t=>{try{return voiceT(typeof heroT==='function'?heroT(t):t)}catch(e){return t}};
   const chk=(t,src)=>{let u0=String(t==null?'':t).replace(/<br>/g,'').replace(/<[^>]+>/g,'').replace(/⁠/g,'').trim();if(!u0||!/[\\p{L}\\p{N}]/u.test(u0))return null;let u=vt(u0);
    // 王子／火花自己說的話：用王子（pz|）或火花（dz|）的聲音
    let pre='';if(/letter_p$/.test(src)){pre='pz|'}else if(/letter_b$/.test(src)){pre='dz|'}else if(/^王子說：/.test(u)){pre='pz|';u=u.slice(4)}else if(/^火花說：/.test(u)){pre='dz|';u=u.slice(4)}
    if(pre){if(has(pre+u))return null;const bad=voSents(u).filter(s=>!has(pre+s.trim()));return bad.length?{src,t:pre+u,bad}:null}
    if(has('z|'+u)||has('z|'+voCk(u)))return null;const bad=[];voSents(u).forEach(s=>{if(has('z|'+s)||has('z|'+voCk(s)))return;voResolve(s).forEach(g=>{if(typeof g!=='string')bad.push(g.tts)})});return bad.length?{src,t:u,bad}:null};
   const out=[];const add=(t,src)=>{const x=chk(t,src);if(x)out.push(x)};let n=0;const each=(t,src)=>{n++;add(t,src)};
   // 1. 第七季（m7c 自己收集的 S7TXT：章名、開場、關卡介紹、題目、選項說明、信、獎狀、季完結）
   const D=window.__s7data||{};
   // 2. 拆段故事、破關小劇場
   const walk=(o,src)=>{if(o==null)return;if(typeof o==='string'){if(/[\\u4e00-\\u9fff]/.test(o))each(o,src);return}if(Array.isArray(o))o.forEach((x,i)=>walk(x,src));else if(typeof o==='object')Object.entries(o).forEach(([k,v])=>{if(!/^(id|c|bg|scene0|g|at|key|art|pic|icon|helper0|k|tag)$/.test(k))walk(v,src+'.'+k)})};
   // 只取會念出來的欄位（章名、關卡名、標籤這些只是字幕／標題，不念）
   Object.entries(D.S7D||{}).forEach(([c,d])=>{['firstSay','endText','story_p','story_b','letter_p','letter_b','theater','gift'].forEach(k=>each(d[k],'S7D.'+c+'.'+k));(d.story||[]).forEach((t,i)=>each(t,'S7D.'+c+'.story'+i));(d.levels||[]).forEach((L,i)=>each(L[5],'S7D.'+c+'.lv'+(i+1)+'.intro'))});
   (D.S7Q||[]).forEach((q,i)=>{each(q[1],'S7Q'+i+'.題目');each(q[2][1],'S7Q'+i+'.答案');(q[3]||[]).forEach((o,j)=>each(o[1],'S7Q'+i+'.選項'+j));each(q[4],'S7Q'+i+'.說明')});
   walk(D.S7FIN,'S7FIN');walk(D.S7SEG,'S7SEG');walk(D.S7NQ,'S7NQ');
   Object.entries(D.S7HEAR||{}).forEach(([z,a])=>a.forEach(w=>each(w[1],'S7HEAR.'+z)));
   Object.entries(D.S7GRID||{}).forEach(([g,o])=>{Object.values(o.tasks||{}).forEach(ts=>ts.forEach((t,i)=>each(t.line,'S7GRID.'+g+'.line')));Object.values(o.places||{}).forEach(p=>each(p[2],'S7GRID.'+g+'.place'))});
   // 第七季程式裡自己組的句子（m7c 收在 S7TXT；只看沒有在資料裡整句出現的）
   const ALLK=Object.keys(VO.idx).filter(k=>/^(z|pz|dz)\|/.test(k)).join(String.fromCharCode(10));
   [...(window.__S7TXT||[])].forEach(t=>{const u=vt(String(t).trim());if(ALLK.includes(u))return;each(t,'S7TXT')});
   // 3. 故事屋新書（兩本）
   (D.S7BOOKS||[]).forEach(bk=>{each(bk.t,'BOOK '+bk.id+'.title');(bk.p||[]).forEach((p,i)=>each(p[2],'BOOK '+bk.id+'.p'+i));(bk.q||[]).forEach((q,i)=>{each(q[0],'BOOK '+bk.id+'.q'+i);(q[1]||[]).forEach(o=>each(o,'BOOK '+bk.id+'.q'+i+'.opt'))})});
   // 4. 地球儀、攝影師
   const G=window.__G8||{};Object.entries(G.T||{}).forEach(([k,v])=>{if(typeof v==='string')each(v,'G8.'+k)});
   const P=window.__PH8||{};Object.entries(P.T||{}).forEach(([k,v])=>{if(typeof v==='string')each(v,'PH8.'+k);else if(Array.isArray(v))v.forEach((x,i)=>typeof x==='string'&&each(x,'PH8.'+k+i))});
   (P.QS||[]).forEach((q,i)=>{const t=Array.isArray(q)?q.find(x=>typeof x==='string'&&/[\\u4e00-\\u9fff]/.test(x)):q&&(q.t||q.q);if(t)each(t,'PH8.QS'+i)});
   // 5. 寫字（m7d）
   const W=window.__WR7||{};walk(W.T||W.LINES||null,'WR7');
   return {n,miss:out,books:(D.S7BOOKS||[]).map(b=>b.t),wr7:Object.keys(W)}})()`));
  fs.writeFileSync(__dirname+`/logs/voice_static_${hero}.json`,JSON.stringify(r,null,1));
  console.log(hero,'檢查句數',r.n,'沒錄音',r.miss.length,'寫字模組',r.wr7.join(','));r.miss.forEach(m=>console.log('  ',m.src,'|',m.t,'| 缺:',m.bad.join(' / ')));
  console.log(' errs',errs.filter(e=>!/promo/.test(e)).slice(0,3));await ctx.close()}
 await b.close()})();

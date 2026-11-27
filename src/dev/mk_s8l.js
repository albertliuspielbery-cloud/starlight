// 從 mods/m8se_learn8.js 的 T 產生 lines/s8_learn.tsv（S8L_ 前綴）和 lines/s8_learn_ssml.json（破音字）
// 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）　用法：node dev/mk_s8l.js
const fs=require('fs'),path=require('path');const H=path.join(__dirname,'..');
const src=fs.readFileSync(H+'/mods/m8se_learn8.js','utf8');const m=/\/\*T8\*\/(\{[\s\S]*?\})\/\*\/T8\*\//.exec(src);
const T=(0,eval)('('+m[1]+')');
// 破音字：數（動詞 ㄕㄨˇ）→署、長（ㄓㄤˇ）→掌、轉一轉（ㄓㄨㄢˋ）→賺、聲調（ㄉㄧㄠˋ）→掉、長長的（ㄔㄤˊ）→常常
const FIX=[[/數(?!字)/g,'<sub alias="署">數</sub>'],[/往上長/g,'往上<sub alias="掌">長</sub>'],[/轉一轉/g,'<sub alias="賺">轉</sub>一<sub alias="賺">轉</sub>'],[/聲調/g,'聲<sub alias="掉">調</sub>'],[/長長的/g,'<sub alias="常常">長長</sub>的']];
const out=[],ss={};const seen=new Set();
for(const [k,v] of Object.entries(T)){const id='S8L_'+k;if(seen.has(v)){continue}seen.add(v);out.push(id+'\t'+v);let x=v;FIX.forEach(([re,r])=>x=x.replace(re,r));if(x!==v)ss[id]=x}
fs.writeFileSync(H+'/lines/s8_learn.tsv','# 2.3 第八季學習動手題台詞（mods/m8se_learn8.js；2026-11-28 星光工作室 Starlight Studio）。單一個字（麻、罵、嗎、車）是拼讀合起來的音，key＝z|字。\n'+out.join('\n')+'\n');
fs.writeFileSync(H+'/lines/s8_learn_ssml.json',JSON.stringify(ss,null,0).replace(/","/g,'",\n"')+'\n');
console.log('lines',out.length,'ssml',Object.keys(ss).length);

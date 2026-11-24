// 第七季暫代資料（測試用，不放 mods）：從 S6D／S6Q 複製改章號、章名。2026-11-22 星光工作室 Starlight Studio
// 用法：node mk_fake.js → fake_s7data.js（測試時用 playwright addInitScript 注入，設 window.__S7FAKE）
// 關卡題型代號就是 m7e_newq7.js 接的代號，給寫資料的同事參考。
const fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'../../ref/season6.js'),'utf8').split('\n');
const i0=src.findIndex(l=>l.startsWith('const S6D='));const i1=src.findIndex(l=>l.startsWith('const S6PT='));
eval(src.slice(i0,i1+1).join('\n')+';global.X={S6D,S6Q,S6FIN,S6HEAR,S6LIKE,S6QTAG,S6PT}');
const TAG={36:'捷運',37:'圖書館',38:'看醫生',39:'動物園',40:'美術館'};
const NM={41:['搭捷運進城','四十一','metro41','捷運'],42:['安靜的圖書館','四十二','library42','圖書館'],43:['看醫生不害怕','四十三','clinic43','看醫生'],44:['動物園一日遊','四十四','zoo44','動物園'],45:['美術館的小畫家','四十五','museum45','美術館']};
// 每章 10 關的題型（照附錄大綱；第三個欄位以後是 m7e 新題型）
const LV={
 41:[['quiz:捷運','write:ㄙ:1','zhuyin:hear7:ㄙ'],['quiz:捷運','write:W:1','clock:s7'],['quiz:捷運','write:ㄙ:2','count:s7five:30'],['quiz:捷運','write:X:1','letter:k7:W|M'],['quiz:捷運','write:W:2','clock:s7'],
  ['quiz:捷運','write:X:2','count:s7five:30'],['quiz:捷運','zhuyin:hear7:ㄙ|ㄕ','letter:k7:X|W'],['quiz:捷運','R:ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|Q|R|S|T|U|V:3','clock:s7'],['quiz:捷運','write:ㄙ:3','write:W:3'],['quiz:捷運','write:X:3','count:s7five:30','quiz:捷運']],
 42:[['quiz:圖書館','write:ㄧ:1','zhuyin:hear7:ㄧ'],['quiz:圖書館','write:Y:1','count:s7ord:10'],['quiz:圖書館','write:ㄧ:2','count:s7hund:100'],['quiz:圖書館','write:Z:1','letter:k7:Y|Z'],['quiz:圖書館','write:Y:2','count:s7ord:10'],
  ['quiz:圖書館','write:Z:2','count:s7hund:100'],['quiz:圖書館','zhuyin:hear7:ㄧ|ㄙ','letter:k7:Z|Y'],['quiz:圖書館','R:ㄙ|W|X:3','count:s7ord:10'],['quiz:圖書館','write:ㄧ:3','write:Y:3'],['quiz:圖書館','write:Z:3','count:s7hund:100','quiz:圖書館']],
 43:[['quiz:看醫生','write:ㄨ:1','letter:s7floor'],['quiz:看醫生','write:a:1','measure:s7blk'],['quiz:看醫生','write:ㄨ:2','count:s7queue'],['quiz:看醫生','write:b:1','letter:s7case:a|b'],['quiz:看醫生','write:a:2','measure:s7blk'],
  ['quiz:看醫生','write:b:2','count:s7queue'],['quiz:看醫生','zhuyin:hear7:ㄨ|ㄧ','letter:s7floor'],['quiz:看醫生','R:ㄙ|ㄧ|W|X|Y|Z:3','measure:s7blk'],['quiz:看醫生','write:ㄨ:3','write:a:3'],['quiz:看醫生','write:b:3','count:s7queue','quiz:看醫生']],
 44:[['quiz:動物園','write:ㄩ:1','zhuyin:hear7:ㄩ'],['quiz:動物園','write:c:1','shape:s7grid'],['quiz:動物園','write:ㄩ:2','letter:s7case:c|d'],['quiz:動物園','write:d:1','letter:s7floor'],['quiz:動物園','write:c:2','shape:s7grid'],
  ['quiz:動物園','write:d:2','letter:k7lo:b|d'],['quiz:動物園','zhuyin:hear7:ㄩ|ㄨ','shape:s7grid'],['quiz:動物園','R:ㄨ|a|b:3','letter:s7case:a|b|c|d'],['quiz:動物園','write:ㄩ:3','write:c:3'],['quiz:動物園','write:d:3','shape:s7grid','quiz:動物園']],
 45:[['quiz:美術館','zhuyin:hear7:ㄙ|ㄧ|ㄨ|ㄩ','count:s7hund:100'],['quiz:美術館','R:ㄙ|ㄧ|ㄨ|ㄩ:3','clock:s7'],['quiz:美術館','letter:s7case:a|b|c|d','shape:s7grid'],['quiz:美術館','R:W|X|Y|Z:3','letter:k7:A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z'],['quiz:美術館','R:a|b|c|d:3','letter:s7floor'],
  ['quiz:美術館','count:s7ord:10','clock:s7'],['quiz:美術館','zhuyin:hear7:ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄧ|ㄨ|ㄩ','count:s7five:30'],['quiz:美術館','R:ㄙ|ㄧ|ㄨ|ㄩ|W|X|Y|Z|a|b|c|d:3','shape:s7grid'],['quiz:美術館','letter:s7case:a|b|c|d','measure:s7blk'],['quiz:美術館','R:a|b|c|d:3','count:s7hund:100','quiz:美術館']]};
const LEARN={41:'ㄙWX',42:'ㄧYZ',43:'ㄨab',44:'ㄩcd',45:''};
const HELP={41:'robot',42:'owl',43:'bunny',44:'monkey',45:'kitten'};
const PRIZE={41:{pet:['redpanda41','小貓熊'],pic:'捷運列車'},42:{dress:['dress42','小畫家罩衫'],boy:['b_paint42','小畫家罩衫'],room:['toy','shelf42','小書架'],pic:'書架'},
 43:{petacc:['pacc43','貝雷帽'],pic:'動物園動物'},44:{prop:['prop44','小導遊背包']},45:{room:['toy','mypic45','我的畫'],pic:'畫框'}};
const S7D={};
[41,42,43,44,45].forEach((c,k)=>{const o=JSON.parse(JSON.stringify(X.S6D[c-5]));const [name,cn,bg,tag]=NM[c];
 Object.assign(o,{name,title:`第${cn}章・${name}`,cn,tag,bg,helper0:HELP[c],learn:LEARN[c],prize:PRIZE[c],
  firstSay:`第${cn}章，${name}！（暫代）點一下發光的朋友，出發！`,
  endText:c<45?`下一站：第${NM[c+1][1]}章「${NM[c+1][0]}」！`:'謝謝你當了這麼棒的城市小旅行家！下一站：第八季，敬請期待！',
  story:[`（暫代故事）第${cn}章第一頁：${name}。`,'（暫代）我們跟大人一起出發吧！','（暫代）記得要有禮貌、注意安全。','準備好了，我們出發囉！'],
  story_p:'（暫代）王子也來了！',story_b:'（暫代）火花說：我也要去！',storyAt:2,
  letter_p:`親愛的公主：<br>（暫代）你完成了第${cn}章！`,letter_b:`王子，（暫代）我們完成了第${cn}章！`,
  theater:c<45?`（暫代）第${cn}章破關了！`:null,gift:c===41?'你得到新的寵物小貓熊了！點「換裝間」，可以換上新的寵物喔！':''});
 o.levels=o.levels.map((L,j)=>{L=L.slice();L[3]=LV[c][j];L[1]=j===0?HELP[c]:L[1];return L});
 S7D[c]=o});
const S7Q=X.S6Q.map(q=>{q=JSON.parse(JSON.stringify(q));q[0]=TAG[{雨林:36,昆蟲:37,溪流:38,防災:39,露營:40}[q[0]]];q[1]='（暫代）'+q[1];return q});
const S7FIN=Object.assign(JSON.parse(JSON.stringify(X.S6FIN)),{h:'城市小旅行家頒獎典禮！（暫代）',p:'五章的城市小旅行，全部完成了！',
 f:[['robot','嘀嘀說：（暫代）你搭捷運好有禮貌！'],['owl','貓頭鷹說：（暫代）圖書館裡你好安靜！'],['bunny','兔兔說：（暫代）看醫生你好勇敢！'],['monkey','跳跳說：（暫代）動物園你當了小導遊！']],
 pr:'公主，你是最棒的城市小旅行家！',dr:'王子，我們一起當城市小旅行家，好好玩！',c1:'恭喜你，成為城市小旅行家！',c2:'（暫代）你搭捷運、去圖書館、看醫生、逛動物園，還在美術館看到自己的畫！',c3:'你還學會了全部的注音聲母、ㄧㄨㄩ，和大寫A到Z！',
 cert_title:'城市小旅行家',cert_to:'最棒的城市小旅行家',cert_sign:'城市裡的朋友們',cert_body:['你完成了第七季','「星光城市小旅行」五章的冒險，','<br>','（暫代）學會公共場所的禮貌和安全，','<br>','是最棒的城市小旅行家！']});
const S7HEAR={'ㄙ':[['☂️','傘'],['🌲','森林'],['4️⃣','四']],'ㄧ':[['👕','衣服'],['🪑','椅子'],['1️⃣','一']],'ㄨ':[['🏠','屋子'],['🐢','烏龜'],['5️⃣','五']],'ㄩ':[['🐟','魚'],['☔','雨'],['🌂','雨傘']]};
const S7LIKE={z:{'ㄙ':'ㄕ','ㄕ':'ㄙ','ㄧ':'ㄑ','ㄨ':'ㄩ','ㄩ':'ㄨ'},l:{'W':'M','M':'W','X':'Y','Y':'X','Z':'N','N':'Z'}};
const S7QTAG={捷運:'#8FC8F0',圖書館:'#FFC06A',看醫生:'#FF9F8A',動物園:'#8FD08A',美術館:'#B8A0E8'};
const S7PT=[['metro41','搭捷運進城','🚇','robot','metro41',['quiz:捷運','quiz:捷運','quiz:捷運','quiz:捷運','quiz:捷運'],41],['lib42','安靜的圖書館','📚','owl','library42',['quiz:圖書館','quiz:圖書館','quiz:圖書館','quiz:圖書館','quiz:圖書館'],42],
 ['doc43','看醫生不害怕','🩺','bunny','clinic43',['quiz:看醫生','quiz:看醫生','quiz:看醫生','quiz:看醫生','quiz:看醫生'],43],['zoo44','動物園一日遊','🦁','monkey','zoo44',['quiz:動物園','quiz:動物園','quiz:動物園','quiz:動物園','quiz:動物園'],44],
 ['art45','美術館的小畫家','🖼️','kitten','museum45',['quiz:美術館','quiz:美術館','quiz:美術館','quiz:美術館','quiz:美術館'],45],
 ['hear7','聽聲音找注音（二）','👂','robot','metro41',['zhuyin:hear7:auto','zhuyin:hear7:auto','zhuyin:hear7:auto','zhuyin:hear7:auto','zhuyin:hear7:auto'],41],
 ['math7','數一數、走一走','🧱','monkey','zoo44',['count:s7five:30','count:s7ord:10','count:s7hund:100','measure:s7blk','shape:s7grid'],41],
 ['abc7','小寫字母三層樓','🔤','owl','library42',['letter:s7floor','letter:s7case:auto','letter:s7floor','letter:s7case:auto','letter:k7:auto'],43]];
const S7DEX=[['redpanda','小貓熊','Red panda']];
const out=`// 第七季暫代資料（mk_fake.js 產生；只給測試用，不放 mods）\nwindow.__S7FAKE=${JSON.stringify({S7D,S7Q,S7FIN,S7HEAR,S7LIKE,S7QTAG,S7PT,S7DEX})};\n`;
fs.writeFileSync(path.join(__dirname,'fake_s7data.js'),out);console.log('ok',out.length);

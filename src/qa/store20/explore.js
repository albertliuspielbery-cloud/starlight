// 試拍候選畫面（iPhone 440x956@1）→ try/
const L=require('./lib');const OUT=__dirname+'/try/';const DEV=process.env.DEV||'iphone';
const Q=[[41,2,'quiz:捷運'],[41,1,'clock:s7'],[41,2,'count:s7five:30'],[42,0,'quiz:圖書館'],[42,1,'count:s7ord:10'],[42,3,'count:s7hund:100'],[43,0,'quiz:看醫生'],[43,1,'letter:s7floor:a|b'],[43,2,'measure:s7blk'],[43,3,'count:s7queue'],
 [44,0,'quiz:動物園'],[44,1,'shape:s7grid:z1'],[44,3,'letter:k7lo:b|d'],[45,0,'quiz:美術館'],[45,5,'shape:s7grid:m2'],[45,2,'letter:s7case:a|b|c|d']];
(async()=>{const b=await L.chromium.launch();const p=await L.open(b,{dev:DEV,scale:1,hero:process.env.HERO||'princess'});
 const shot=async k=>{await p.waitForTimeout(500);await p.screenshot({path:`${OUT}${DEV}_${k}.png`});console.log('shot',k,await L.ev(p,'S.screen'))};
 for(const [ch,lv,t] of Q){await L.clean(p);await L.ev(p,`(()=>{S.pmode=null;setCh(${ch-1});S.prog=10;startLevel(${lv});S.qs[0]=${JSON.stringify(t)}})()`);await p.waitForTimeout(1500);
  await p.evaluate(()=>{const o=document.querySelector('.stage .overlay, .overlay');if(o){const x=o.querySelector('button');if(x)x.click()}});await p.waitForTimeout(2200);
  await L.ev(p,`(()=>{try{hush()}catch(e){}})()`);await shot(`q${ch}_${t.replace(/[:|]/g,'_')}`)}
 console.log(p.errs);await b.close()})();

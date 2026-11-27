/* ===== home50r 主角自己的房間（第 50 章大冒險：居家安全小偵探）：只畫東西「正要出問題」的樣子，主角拿放大鏡在房間裡 ===== */
const strip=(n)=>G(0,0,R(-46,-12,92,22,'#FFFFFF',8)+R(-46,-12,92,6,'#E8ECF8',4)+Array.from({length:4},(_,i)=>R(-36+i*22,-6,12,10,'#C8D0E4',3)).join('')+Array.from({length:n},(_,i)=>R(-38+i*22,-24,16,18,['#FF9EC4','#8FD0FF','#FFE07A','#9FE0A0','#B8A8FF'][i%5],4)+PL(`M${-30+i*22} -24 Q${-30+i*22} -44 ${-40+i*30} -52`,'#8A8AA8',2.4)).join('')+PL('M46 0 Q70 4 80 -10','#8A8AA8',3));
const scissors=(open)=>open?G(0,0,PL('M-4 0 L26 -14 M-4 0 L26 10','#9AA8C8',5)+C(-12,-6,7,'none','stroke="#FF7AA8" stroke-width="4"')+C(-12,8,7,'none','stroke="#FF7AA8" stroke-width="4"')):G(0,0,PL('M-2 0 L26 -2','#9AA8C8',5)+C(-10,-5,6,'none','stroke="#FF7AA8" stroke-width="4"')+C(-10,6,6,'none','stroke="#FF7AA8" stroke-width="4"'));
const roomHero=()=>{try{return `<g class="q8hero">${String(princess(S.look)).replace(/^<svg /,'<svg x="380" y="300" width="105" height="150" preserveAspectRatio="xMidYMax meet" ')}</g>`}catch(e){return ''}};
const magnifier=(x,y,s=1)=>G(x,y,`<g transform="scale(${s})">${PL('M10 10 L30 30','#B8865A',8)+C(0,0,16,'#DFF4FF','stroke="#FFD24D" stroke-width="6"')+HI(-5,-5,5,3,.8)}</g>`);
SC.home50r={nm:'我的房間',
 bg:K=>{let s=R(0,0,800,390,K.lg('#FFF0F8','#F8E0F0'))+R(0,384,800,116,K.lg('#E8C8A0','#D8B088'))+R(0,380,800,8,'#E8B8D0');
  for(let x=20;x<800;x+=60)s+=C(x,30,3,'#FFD0E8')+C(x+30,70,3,'#FFE4F0');
  s+=windowW(K,300,80,150,150)+P('M284 66 L324 66 L316 246 L280 246Z','#B8A8FF')+P('M426 66 L466 66 L470 246 L434 246Z','#B8A8FF')+R(276,60,196,10,'#9A8AD8',4);
  s+=R(30,300,240,90,K.lg('#FFFFFF','#F4E8FF'),14)+R(30,276,30,120,'#E8B8D0',8)+R(24,262,42,22,'#F2C8DC',10)+R(70,318,200,60,K.lg('#FFB0D0','#FF8AB8'),12)+R(76,296,70,28,'#FFFFFF',12)+HI(110,330,30,6,.4);
  s+=R(276,330,56,60,'#E8C8A0',6)+R(282,338,44,8,'#D8B088',3);
  s+=G(150,150,R(-56,-40,112,80,'#FFFFFF',6)+R(-48,-32,96,64,'#F4F8FF',3)+PL('M-44 -26 H44 V26 H-44Z M-4 -26 V0 H44','#9AA8C8',2.2)+PL('M-24 -10 L-24 16 L-40 16','#3FCB84',3.5)+C(-24,-10,4,'#FF6A8A'));
  s+=R(520,300,180,14,'#E8B888',5)+R(530,314,10,80,'#D8A070',3)+R(680,314,10,80,'#D8A070',3)+R(540,240,8,60,'#B8A8E8',3)+P('M524 240 h40 l-8 -24 h-24Z','#FFE07A')+R(620,262,26,38,'#9FE0C8',6);
  s+=R(716,150,78,240,'#F4E0C8',4)+R(722,156,66,234,'#FFF8EE',3);for(let i=0;i<5;i++)s+=R(726,340-i*28+28,58,10,'#E8C8A0',2);s+=TX(755,146,'樓梯','14','#8A5A3A');
  s+=roomHero()+magnifier(500,370,1.1);
  return s},
 items:[
  {id:'strip',k:'bad',x:330,y:420,r:62,nm:'插座插得滿滿的',why:'插座不要插得滿滿的，請大人整理好。',bad:K=>G(330,440,strip(5)),good:K=>G(330,440,strip(2))},
  {id:'scis',k:'bad',x:600,y:282,r:58,nm:'剪刀打開放在桌邊',why:'剪刀用完合起來，收進筆筒，不拿著跑。',bad:K=>G(670,292,scissors(true)),good:K=>G(633,250,`<g transform="rotate(-80)">${scissors(false)}</g>`)},
  {id:'chair',k:'bad',x:376,y:290,r:62,nm:'窗戶旁邊的椅子',why:'窗戶旁邊不放椅子，也不爬窗戶。',bad:K=>chair(K,376,384,'#FFB86A'),good:K=>chair(K,610,396,'#FFB86A')},
  {id:'toys',k:'bad',x:740,y:420,r:62,nm:'玩具丟在樓梯口',why:'玩具收進箱子，樓梯口空空的，才不會絆倒。',bad:K=>teddy(724,446,.9)+C(760,440,10,'#FF8A8A')+R(736,456,22,14,'#8FD0FF',3)+C(706,470,7,'#FFD24D'),good:K=>box(K,520,486,70,40,'#B8E0FF')+teddy(510,452,.6)+C(536,446,7,'#FF8A8A')},
  {id:'bagbed',k:'bad',hard:1,x:170,y:300,r:58,nm:'塑膠袋放在床上',why:'塑膠袋不放在床上，用完交給大人收好。',bad:K=>G(190,306,P('M-20 -10 Q-22 -32 0 -34 Q22 -32 20 -10 L16 12 H-16Z','#E8F4FF','opacity=".9"')+HI(-8,-20,3,7,.8)),good:K=>''},
  {id:'flash',k:'ok',x:304,y:318,r:52,why:'床邊放手電筒，晚上停電也看得到路，這樣很好喔！',art:K=>G(304,326,R(-16,-6,32,14,'#FF8AB8',6)+R(12,-8,10,18,'#FFE07A',4)+P('M22 -6 L44 -14 L44 16 L22 8Z','#FFF8C8','opacity=".7"'))},
  {id:'map',k:'ok',x:150,y:150,r:58,why:'牆上貼著我家的逃生路線圖，這樣很好喔！',art:K=>''}
 ]};

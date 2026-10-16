// 宣傳影片專用（mkapp.py 有 DEMO=1 才會放進 App）：遊戲開始前先放好示範用的進度
(function(){try{if(localStorage.getItem('demo_init_v1'))return;localStorage.clear();localStorage.setItem('demo_init_v1','1');
 localStorage.setItem('pp4setup','done');
 localStorage.setItem('pp4prof',JSON.stringify({cur:'c1',next:2,kids:[{id:'c1',hero:'princess',chosen:1}]}));
 localStorage.setItem('pp4',JSON.stringify({name:'',chDone:4,ch:4,progs:[10,10,10,10,3],wallet:86,tutWard:1,owned:['unicorn','kitty','fox'],look:{pet:'unicorn'}}));
 const d=new Date();localStorage.setItem('pp4v2',JSON.stringify({seenWorld:1,parkGate:0,ptoy_princess:['frisbee','yarn','bubble','slide'],roomGem:d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}));
}catch(e){}})();

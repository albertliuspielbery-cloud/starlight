#!/bin/bash
# fixB 最後驗證：8981（web）＋8982（app），六種尺寸
cd /home/claude/w/s7/qa/fixB; export NODE_PATH=$(npm root -g)
V=padL,padP,ip,se,land,landse
MUST='count:s7hund:100;shape:s7grid:z4;shape:s7grid:m1;shape:s7grid:m2;shape:s7grid:m3;measure:s7blk;count:s7ord:10'
REST='count:s7queue;count:s7five:30;letter:s7case:a|b|c|d;letter:s7floor:a|b|c|d;letter:k7lo:b|d;letter:k7:W|M;zhuyin:hear7:ㄙ|ㄕ|ㄘ;clock:s7'
for ver in web app; do
 SHOT=fin node chk.js $V "$MUST" easy,mid,hard 2 $ver > fin_chk_must_$ver.log 2>&1
 node misc.js $V $ver > fin_misc_$ver.log 2>&1
 for vp in padL padP ip se land landse; do node func.js $vp $ver >> fin_func_$ver.log 2>&1; done
done
node chk.js $V "$REST" mid,hard 1 web > fin_chk_rest_web.log 2>&1
node map.js se,padP 41,45 mapfin_app app > fin_map_app.log 2>&1
node map.js padL,padP,ip,se,land,landse 41,42,43,44,45,40 mapfin > fin_map.log 2>&1
node hint.js se,ip,land,landse > fin_hint.log 2>&1
echo done

#!/bin/bash
# fixB 最後驗證（只驗 App 版 8982，六種尺寸）
cd /home/claude/w/s7/qa/fixB; export NODE_PATH=$(npm root -g)
V=padL,padP,ip,se,land,landse
MUST='count:s7hund:100;shape:s7grid:z4;shape:s7grid:m2;measure:s7blk;count:s7ord:10'
SHOT=fin node chk.js $V "$MUST" easy,mid,hard 1 app > fin_chk_must_app.log 2>&1
node misc.js $V app > fin_misc_app.log 2>&1
for vp in padL padP ip se land landse; do node func.js $vp app >> fin_func_app.log 2>&1; done
node map.js padL,padP,ip,se,land,landse 41,42,45,40 mapfin_app app > fin_map_app.log 2>&1
echo done

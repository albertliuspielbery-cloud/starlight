#!/bin/bash
# 最終驗收：其他測試一個一個跑（App 版）
export NODE_PATH=$(npm root -g); Q=/home/claude/w/s7/qa; O=$Q/final2/logs
run(){ local name=$1; shift; echo "### $name start $(date +%T)" >> $O/queue.txt; ( "$@" ) > $O/$name.log 2>&1; echo "### $name exit $? $(date +%T)" >> $O/queue.txt; }
cd $Q/final2
run qtest_princess timeout 1500 node qtest_app.js all princess
run qtest_prince timeout 1500 node qtest_app.js all prince
cd $Q/pay290; run pay290 timeout 1800 node test.js
cd $Q/books7; run books7_princess timeout 900 node test.js app princess; run books7_prince timeout 900 node test.js app prince
cd $Q/final; run regress_princess timeout 1800 node regress.js app princess; run regress_prince timeout 1800 node regress.js app prince
run upgrade timeout 1800 node upgrade.js
cd $Q/globe; run globe_play_390 timeout 900 node play.js 8982 390 844; run globe_play_1180 timeout 900 node play.js 8982 1180 820
run globe_reach_375 timeout 1500 node reach.js 8982 375 667; run globe_reach_820 timeout 1500 node reach.js 8982 820 1180
cd $Q/photo8; run photo_easy timeout 900 node test.js 8982 375x667 easy; run photo_mid timeout 900 node test.js 8982 844x390 mid; run photo_hard timeout 900 node test.js 8982 1180x820 hard
cd $Q/final2; run t_ans timeout 600 node t_ans_app.js
cd $Q/fixB; run fixB_vtip timeout 600 node vtip.js
for vp in padL ip se landse; do run fixB_ward3_$vp timeout 600 node ward3.js $vp princess; done
run fixB_ward3_ip_prince timeout 600 node ward3.js ip prince
run fixB_chk timeout 2400 node chk.js padL,padP,ip,se,land,landse 'count:s7hund:100;shape:s7grid:z4;shape:s7grid:m2;measure:s7blk;count:s7ord:10' easy,mid,hard 1 app
run fixB_misc timeout 2400 node misc.js padL,padP,ip,se,land,landse app
for vp in padL padP ip se land landse; do run fixB_func_$vp timeout 900 node func.js $vp app; done
run fixB_map timeout 1800 node map.js padL,padP,ip,se,land,landse 41,42,45,40 mapfin2_app app
cd $Q/final2
run voice_static timeout 900 node voice_static.js
run voice_letters_princess timeout 1500 node voice_letters.js princess
run voice_letters_prince timeout 1500 node voice_letters.js prince
run voice_scenes_princess timeout 2400 node voice_scenes.js princess
run voice_scenes_prince timeout 2400 node voice_scenes.js prince
echo "### ALL DONE $(date +%T)" >> $O/queue.txt

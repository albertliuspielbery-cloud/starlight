#!/bin/bash
# 最終驗收：App 版 test_s7.js 每章一個行程（VOICE=1）。run_s7.sh <princess|prince>
cd /home/claude/w/s7/qa/s7; export NODE_PATH=$(npm root -g)
for ch in ${CHS:-41 42 43 44 45}; do
 VOICE=1 NOREG=1 timeout 3000 node test_s7.js app $1 $ch > /home/claude/w/s7/qa/final2/logs/s7_app_$1_$ch.log 2>&1
 echo "exit $?" >> /home/claude/w/s7/qa/final2/logs/s7_app_$1_$ch.log
done

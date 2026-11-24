#!/bin/bash
# 一組一組跑 test_s7.js（每章一個行程）：run_s7.sh <web|app> <princess|prince> [VOICE=0|1]
cd /home/claude/w/s7/qa/s7; export NODE_PATH=$(npm root -g)
for ch in 41 42 43 44 45; do
 VOICE=${3:-0} NOREG=1 timeout 3000 node test_s7.js $1 $2 $ch > /home/claude/w/s7/qa/final/logs/s7_$1_$2_$ch.log 2>&1
 echo "exit $?" >> /home/claude/w/s7/qa/final/logs/s7_$1_$2_$ch.log
done

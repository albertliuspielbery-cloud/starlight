#!/bin/bash
# 備份第七季工作區到永久空間（不含 out、voice 大檔）
D=/mnt/user-data/outputs/s7_backup; mkdir -p $D
cd /home/claude/w && tar czf $D/s7_work.tgz.tmp --exclude='s7/out' --exclude='s7/voice' --exclude='s7/rec' --exclude='s7/base' --exclude='s7/font/*.ttf' --exclude='node_modules' --exclude='*.png.tmp' s7 doc 2>/dev/null && mv $D/s7_work.tgz.tmp $D/s7_work.tgz && ls -la $D/s7_work.tgz
mkdir -p /mnt/user-data/outputs/s7_backup/voice && cp -u /home/claude/w/s7/voice/*.bin /home/claude/w/s7/voice/*.json /mnt/user-data/outputs/s7_backup/voice/

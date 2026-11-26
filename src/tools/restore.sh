#!/bin/bash
# 新對話還原工作區（星光工作室 Starlight Studio）。用法：
#   git clone -b app-2.0 https://github.com/albertliuspielbery-cloud/starlight /home/claude/w/repo
#   bash /home/claude/w/repo/src/tools/restore.sh
set -e
mkdir -p /home/claude/w
rm -rf /home/claude/w/s7 && cp -a /home/claude/w/repo/src /home/claude/w/s7
mkdir -p /home/claude/w/s7/voice && cp /home/claude/w/repo/voice/*.json /home/claude/w/repo/voice/*.bin /home/claude/w/s7/voice/
cd /home/claude/w/s7 && python3 build.py && bash tools/srv_up.sh
grep -o "APP_VERSION='[0-9.]*'" out/app/app/www/index.html | head -1
echo "還原完成：工作區 /home/claude/w/s7，App 測試 http://127.0.0.1:8982/index.html"

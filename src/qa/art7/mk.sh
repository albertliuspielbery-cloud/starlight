#!/bin/bash
# 把 src/*.js 照檔名順序接成 mods/m7b_s7art.js
cd /home/claude/w/s7/qa/art7 && cat src/*.js > /home/claude/w/s7/mods/m7b_s7art.js && node -e "require('/home/claude/w/s7/mods/m7b_s7art.js');console.log('syntax ok',Object.keys(globalThis.BG41||{}).length)"

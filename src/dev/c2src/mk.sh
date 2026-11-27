#!/bin/bash
# 組出 mods/m8sf_safe8.js 和 mods/m8si_quest8.js（2026-11-28 星光工作室）
set -e
cd "$(dirname "$0")"
cat sf_0_head.js sf_1_art.js sf_2a_scenes.js sf_2b_scenes.js sf_2c_scenes.js sf_2d_room.js sf_3_danger.js sf_4_phone.js sf_5_okno.js sf_6_css.js sf_9_tail.js > ../../mods/m8sf_safe8.js
[ -f si_quest.js ] && cp si_quest.js ../../mods/m8si_quest8.js
node -e "new Function(require('fs').readFileSync('../../mods/m8sf_safe8.js','utf8'))" && echo sf-syntax-ok
[ -f ../../mods/m8si_quest8.js ] && node -e "new Function(require('fs').readFileSync('../../mods/m8si_quest8.js','utf8'))" && echo si-syntax-ok

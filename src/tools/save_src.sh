#!/bin/bash
# 把 App 原始碼（建置來源）存進 repo 的 src/：base、mods、patches、lines、tools、font、dev、ref、cfg、build.py、美術與地球儀原始檔、測試腳本（不含截圖、輸出、語音包）
set -e
S=/home/claude/w/s7; D=/home/claude/w/repo/src
mkdir -p $D
rm -rf $D/*; cd $S
for x in base mods patches lines tools font dev ref cfg.json build.py qa/art7/src; do mkdir -p $D/$(dirname $x); cp -a $x $D/$x; done
find qa -maxdepth 2 \( -name '*.js' -o -name '*.py' -o -name '*.sh' \) -size -300k | while read f; do mkdir -p $D/$(dirname $f); cp -a $f $D/$f; done
cp -a qa/globe/geo.json $D/qa/globe/
rm -f $D/font/hun.woff2
cat > $D/README.md <<'R'
# 星光小冒險 App 原始碼（星光工作室 Starlight Studio）
只出 App 版（2026-11-24 起網頁版不再更新）。
- base/index.html：5.3.1 建好的檔，當作底
- patches/*.py：依檔名順序對底做文字取代
- mods/*.js：依檔名順序接在主程式最後（用 window.__ev 進主程式範圍）
- cfg.json：版本號、版本紀錄、sw 快取名、語音索引
- build.py：建置 → out/web、out/app/www（用 repo app/mkapp.py）
- qa/globe/src.js → qa/globe/assemble.py 組出 mods/m8_globe.js；qa/art7/src → mk.sh 組出 mods/m7b_s7art.js
- 語音包在 repo voice/（新的 pack 由 tools/mkpack.py 產生）。錄音金鑰不在這裡，也不要放進來。
R
cd /home/claude/w/repo; git add src; git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "保存 App 原始碼（src/）：5.4.0 建置來源

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01YGmeENxiTCh9c5wqJjpZKC" && git log --oneline -1; du -sh src

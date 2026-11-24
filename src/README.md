# 星光小冒險 App 原始碼（星光工作室 Starlight Studio）
只出 App 版（2026-11-24 起網頁版不再更新）。
- base/index.html：5.3.1 建好的檔，當作底
- patches/*.py：依檔名順序對底做文字取代
- mods/*.js：依檔名順序接在主程式最後（用 window.__ev 進主程式範圍）
- cfg.json：版本號、版本紀錄、sw 快取名、語音索引
- build.py：建置 → out/web、out/app/www（用 repo app/mkapp.py）
- qa/globe/src.js → qa/globe/assemble.py 組出 mods/m8_globe.js；qa/art7/src → mk.sh 組出 mods/m7b_s7art.js
- 語音包在 repo voice/（新的 pack 由 tools/mkpack.py 產生）。錄音金鑰不在這裡，也不要放進來。

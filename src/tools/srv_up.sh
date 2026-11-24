#!/bin/bash
# 8981 網頁版、8982 App 版
cd /home/claude/w/s7
for p in 8981 8982; do curl -s -o /dev/null -w "" http://127.0.0.1:$p/index.html && continue
 d=out/web; [ $p = 8982 ] && d=out/app/app/www
 nohup python3 -m http.server $p --bind 127.0.0.1 --directory $d >/dev/null 2>&1 &
done
sleep 1; for p in 8981 8982; do echo -n "$p "; curl -s -o /dev/null -w "%{http_code} " http://127.0.0.1:$p/index.html; done; echo

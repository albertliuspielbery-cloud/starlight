#!/bin/bash
# 平行開發用：建一份 s7 的工作複本（不含語音包、輸出、截圖），自己的 App 伺服器埠號。
# 用法：bash tools/mkcopy.sh <名字> <App埠號>   例：bash tools/mkcopy.sh gift 8992
# 之後：cd /home/claude/w/s7_<名字> && python3 build.py && bash srv.sh   測試網址 http://127.0.0.1:<埠號>/index.html
set -e
N=$1;P=$2;D=/home/claude/w/s7_$N
[ -e $D ] && { echo "$D 已經存在"; exit 1; }
mkdir -p $D && (cd /home/claude/w/s7 && tar cf - --exclude=./voice --exclude=./out --exclude='*.png' --exclude='*.jpg' --exclude='*.webm' --exclude='./.build.lock' .) | (cd $D && tar xf -)
ln -s /home/claude/w/s7/voice $D/voice
sed -i "s#http://127.0.0.1:8981/index.html#http://127.0.0.1:$((P-1))/index.html#; s#http://127.0.0.1:8982/index.html#http://127.0.0.1:$P/index.html#" $D/qa/s7/lib.js
cat > $D/srv.sh <<S
#!/bin/bash
cd $D
curl -s -o /dev/null http://127.0.0.1:$P/index.html && exit 0
nohup python3 -m http.server $P --bind 127.0.0.1 --directory out/app/app/www >/dev/null 2>&1 &
sleep 1; curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:$P/index.html
S
chmod +x $D/srv.sh; echo "ok $D 埠號 $P"

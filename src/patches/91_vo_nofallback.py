# 5.4.0 語音：不用裝置內建語音（2026-11-24 星光工作室 Starlight Studio）
# 配合 mods/m9zz_vowait.js（錄音還沒下載好就等它，不拆句、不靜音）。這裡只改兩個包不到的地方：
#  1. 原本的 voSpeak（v1.9）：句子被下一句取代（sayGen 換了）之後，還會走 fallback／speakOne 念一次（大小寫配對快速連配時會出現）。
#     改成：已經被取代就直接結束。
#  2. 開機 40 秒內（k1）：那一句的錄音片段抓不到（伺服器不支援 Range）時整句丟掉、不念。改成照常交給 say，
#     由 m9zz_vowait 等語音包下載好再念錄音。
def rep(old,new,n=1):
    global s
    assert s.count(old)==n,('patch91 找不到或次數不對',old[:60],s.count(old))
    s=s.replace(old,new)
rep("const fallback=async()=>{if(sl===2){await speakOne(p,opt);",
    "const fallback=async()=>{if(gen!==sayGen)return;if(sl===2){await speakOne(p,opt);")
rep("if(b&&b.tts!=null){await speakOne({zh:b.tts},opt);continue}",
    "if(b&&b.tts!=null){if(gen!==sayGen)return;await speakOne({zh:b.tts},opt);continue}")
rep("if(!b){const g=segs[i];await speakOne(",
    "if(!b){if(gen!==sayGen)return;const g=segs[i];await speakOne(")
rep("if(!ok){D.dropped++;lg('noclip',txt);return}",
    "if(!ok){lg('noclip-wait',txt)}",2)

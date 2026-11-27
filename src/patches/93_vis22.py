# 2.2 視覺（2026-11-27 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）。配合 mods/m9zc_vis22.js。
#  火箭飛行：畫布每一格先清空，底色漸層改成可以半透明（window.__v22r26a，m9zc 放了第 27 章月亮背景時設 .78；沒放背景時維持 1＝原本的樣子）。
def rep(old,new,n=1):
    global s
    assert s.count(old)==n,('patch93 找不到或次數不對',old[:70],s.count(old))
    s=s.replace(old,new)
rep("const g=cx.createLinearGradient(0,0,0,600);g.addColorStop(0,'#0B0F33');g.addColorStop(.6,'#1E1B5A');g.addColorStop(1,'#3A2A7A');cx.fillStyle=g;cx.fillRect(0,0,WW,600);",
    "const g=cx.createLinearGradient(0,0,0,600);g.addColorStop(0,'#0B0F33');g.addColorStop(.6,'#1E1B5A');g.addColorStop(1,'#3A2A7A');cx.clearRect(0,0,WW,600);cx.globalAlpha=+window.__v22r26a||1;cx.fillStyle=g;cx.fillRect(0,0,WW,600);cx.globalAlpha=1;")

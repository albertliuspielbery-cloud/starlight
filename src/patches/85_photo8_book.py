# 小小攝影師（m8_photo.js）：收集冊「我的動物園」頁沒拿到的卡片，提示寫「小小攝影師 拍拍看」、點了念這一頁自己的句子（item.lockV）
# 2026-11-22 星光工作室 Starlight Studio
a="const H={ch:n=>`完成第 ${n} 章|就能拿到`,"
assert s.count(a)==1,'book19 H'
s=s.replace(a,"const H={z8:()=>'小小攝影師|拍拍看',ch:n=>`完成第 ${n} 章|就能拿到`,")
a="sayR([it.meetV&&h==='ch'?'meet':HV[h]||'lockPlay'])"
assert s.count(a)==1,'book19 tap'
s=s.replace(a,"sayR([it.lockV||(it.meetV&&h==='ch'?'meet':HV[h]||'lockPlay')])")

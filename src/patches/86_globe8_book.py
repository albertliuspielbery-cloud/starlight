# 地球儀（m8_globe.js）：收集冊「地球儀」頁沒拿到的卡片，提示寫「去地球儀|點一點」（hint 'g8'）；點了念 item.lockV（85_photo8_book.py 加的）
# 2026-11-22 星光工作室 Starlight Studio。接在 85_photo8_book.py 後面；沒有 85 也能用（只是點了念原本的句子）。
a="ch:n=>`完成第 ${n} 章|就能拿到`,"
assert s.count(a)==1,'book19 H'
s=s.replace(a,"g8:()=>'去地球儀|點一點',"+a)

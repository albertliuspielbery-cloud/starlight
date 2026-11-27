# 2.2 動手玩的學習報告分類（2026-11-27 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）。配合 mods/m9zg_hands22.js。
#  第 41～45 章的動手玩（翻牌、分籃子、走格子、拼圖、排順序…）照題目內容算注音／英文／數學，不再全部算「生活與自然」。
def rep(old,new,n=1):
    global s
    assert s.count(old)==n,('patch98 找不到或次數不對',old[:70],s.count(old))
    s=s.replace(old,new)
rep("function abClass(){const t=curType();if(!t)return '';",
    "function abClass(){const t=curType();if(!t)return '';try{const h=window.__h22&&window.__h22.cls&&window.__h22.cls(String(S.qs[S.q]||''));if(h)return h}catch(e){}")

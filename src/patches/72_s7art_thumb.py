# 第七季美術（m7b）：房間佈置選單「牆上的畫」pic 格的小縮圖（房間改版的縮圖產生器原本不認得新格）
# 2026-11-24 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）
old="if(k==='toy')return R.toy;\n  return CROP[k]?cropSVG(k,R.bg):''"
new="if(k==='toy')return R.toy;\n  if(k==='pic'&&typeof window.__s41picThumb==='function')return window.__s41picThumb(v);\n  return CROP[k]?cropSVG(k,R.bg):''"
assert s.count(old)==1,'72_s7art_thumb'
s=s.replace(old,new)

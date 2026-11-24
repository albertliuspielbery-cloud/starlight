# 5.4.0 收費改成只賣「完整版」（Albert 11/24）。2026-11-24 星光工作室 Starlight Studio
# m67 購買畫面（shop 在 m67 的閉包裡，包不到，只能改原文）：
#  1. 只向 App Store 查 full 一個商品（不查 stage2～stage9、s2to6、s5to8）
#  2. 購買列只剩一列「完整版：第六章以後全部章節」；單段、合購的列都不列
# 單段、合購的判斷（stageOpen、sync 的 okId、退款）都不動：已經有的照樣有效、恢復購買也認得。
# full＝全部的段：mods/m9_pay290.js（不改 FULLSET 那一行，app/mkapp.py 會檢查原文）
def rep(old,new):
    global s
    assert s.count(old)==1,('patch90 找不到或不只一處',old[:60])
    s=s.replace(old,new)
# 1. 只查 full
rep("const loadProducts=async()=>{if(products&&Object.keys(products).length>=STAGES.length+1+BUNDLES.length)return products;try{const r=await Promise.race([NP.getProducts({productIdentifiers:[...STAGES.map(s=>IAPP+s[0]),IAPP+'full',...BUNDLES.map(b=>IAPP+b[0])]}),",
    "const loadProducts=async()=>{if(products&&products.full)return products;try{const r=await Promise.race([NP.getProducts({productIdentifiers:[IAPP+'full']}),")
rep("const need=!products||Object.keys(products).length<STAGES.length+1+BUNDLES.length;","const need=!products||!products.full;")
# 2. 購買列：從 const rows=STAGES.map( 到合購列（BUNDLES.map…join('')}）整段換掉
a=s.index("  const rows=STAGES.map(([id,n],k)=>`<div class=\"iaprow\">")
b0="${BUNDLES.map(([bid,bn,set,bd,opt])=>{const o2=iapOwned();"
b=s.index(b0,a);b=s.index("}).join('')}\n",b)+len("}).join('')}\n")
assert s.count("  const rows=STAGES.map(([id,n],k)=>`<div class=\"iaprow\">")==1 and s.count(b0)==1
old=s[a:b]
assert old.count('${rows}')==1 and "${iapOwned().includes('full')||anyStage" in old
k=old.index('${rows}')+len('${rows}')
head=old[old.index('  const ov=overlay('):k]
NEWROWS=("  // 5.4.0：只有「完整版」full 一列；全部章節都打開了就寫「已解鎖全部章節」\n"
 "  const allOpen=STAGES.every(([id])=>stageOpen(id));\n"
 "  const rows=`<div class=\"iaprow pay290\"><span><b>完整版：第六章以後全部章節</b><br><small>一次購買永久使用，之後新增的章節也包含。</small></span>${allOpen?'<i>已解鎖全部章節 ✓</i>':btn('full')}</div>`;\n")
s=s[:a]+NEWROWS+head+'\n'+s[b:]

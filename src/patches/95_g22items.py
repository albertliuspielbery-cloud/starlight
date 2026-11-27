# 2.2 遊樂園大禮物：物品在遊戲裡用得到（2026-11-27 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）
# 配合 mods/m9ze_g22items.js。這裡只改包不到的地方（小小廚師在自己的函式裡面、塗色本藏卡在中間那一層）：
#  1. 小小廚師：材料清單 FILL／FRUIT 每出一題重算一次（G22.chefExtra() 多給小黃瓜、芒果）；ING 多兩樣（英文名）；
#     出題後如果有剛拿到的那一樣（G22.chefWant），重抽到題目裡有它為止（難度規則不變）；G22.chefSeen 清掉「新」；
#     圖：PH 沒有的材料問 G22.chefIcon(k)；三明治側面一層先問 G22.chefLayer(k,y)。
#  2. 塗色本：PICS 有 g22（禮物 id）的圖，還沒拿到就不放進列表（跟還沒有的寵物同一個地方）。
def rep(old,new,n=1):
    global s
    assert s.count(old)==n,('patch95 找不到或次數不對',old[:70],s.count(old))
    s=s.replace(old,new)
# 1. 小小廚師
rep("const FILL=['lettuce','tomato','cheese','egg'],FRUIT=['straw','banana','grape','orange','guava'];",
    "const FILL0=['lettuce','tomato','cheese','egg'],FRUIT0=['straw','banana','grape','orange','guava'];let FILL=FILL0,FRUIT=FRUIT0;"
    "const g22on=()=>{let a=FILL0,b=FRUIT0;try{const X=window.G22&&G22.chefExtra&&G22.chefExtra();if(X){a=FILL0.concat(X.fill||[]);b=FRUIT0.concat(X.fruit||[])}}catch(e){}FILL=a;FRUIT=b};")
rep("function makeOrder(mode,diff){",
    "function makeOrder(mode,diff){g22on();let o=makeOrder0(mode,diff);"
    "try{const w=window.G22&&G22.chefWant&&G22.chefWant(mode);if(w)for(let i=0;i<80&&!o.seq.includes(w);i++)o=makeOrder0(mode,diff);if(window.G22&&G22.chefSeen)G22.chefSeen(o.seq)}catch(e){}return o}\n"
    "function makeOrder0(mode,diff){")
rep("orange:{c:'#FF9A2E',en:'orange'},guava:{c:'#9ED36A'}};",
    "orange:{c:'#FF9A2E',en:'orange'},guava:{c:'#9ED36A'},mango:{c:'#FFB81A',en:'mango'},cucumber:{c:'#6DBE4A',en:'cucumber'}};")
rep("const icon=k=>(OBJK[k]&&o31(OBJK[k]))||(window.OBJ31&&OBJ31[k]&&o31(k))||PH[k];",
    "const icon=k=>(OBJK[k]&&o31(OBJK[k]))||(window.OBJ31&&OBJ31[k]&&o31(k))||PH[k]||(window.G22&&G22.chefIcon?G22.chefIcon(k):'')||'';")
rep("function layer(k,y){try{const L5=window.OBJ31&&OBJ31.layer5;",
    "function layer(k,y){try{const g=window.G22&&G22.chefLayer&&G22.chefLayer(k,y);if(g)return g}catch(e){}try{const L5=window.OBJ31&&OBJ31.layer5;")
# 2. 塗色本：還沒拿到的禮物圖不放進列表
rep("if(P.petKind&&!owns(P.petKind)){b.remove();return}",
    "if(P.petKind&&!owns(P.petKind)){b.remove();return}if(P.g22&&!(window.G22&&G22.has(P.g22))){b.remove();return}")

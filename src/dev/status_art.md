# 第七季美術（m7b_s7art）進度　2026-11-22　星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）

## 狀態（2026-11-23）：預覽圖做好了，等 Albert 看。preview/s7art_1～11.png 是對齊 cast.json 之後的新版。

## 檔案
- 模組：/home/claude/w/s7/mods/m7b_s7art.js（由 /home/claude/w/s7/qa/art7/src/*.js 接成，`bash qa/art7/mk.sh` 重接＋語法檢查；語法通過）
- 開關：S41.LIVE=false，hook() 和 install41 在關著時什麼都不做，不影響遊戲。
- 預覽頁：/home/claude/w/s7/preview/s7art.html（用 8993 的 python http.server 服務 /home/claude/w/s7）；截圖腳本 qa/art7/shots.js → preview/s7art_N.png
- 動物園的大象、長頸鹿統一用 G.ZOO8（m8_photo_art.js，畫的時候才去拿；沒有就用自己的備用圖）。
- build.py 跑過：5.4.0 建置 ok，網頁版開起來沒有錯誤，S41.LIVE=false。

## 做好的
- 五章場景 26 張（BG41；BG41_CH 主場景、BG41_OPEN 開場、BG41_STORY 拆段 3～4 張、fin45 大結局），橫放、直放都可以。
- 題目物件 22 個（OBJ41）、小書架 shelf42、牆上「我的畫」S41.ROOM.mypic45／S41.FRAME(pic) 可放塗色本作品、徽章／小徽章／獎狀 certHTML。
- 寵物小貓熊 redpanda44：PET41.redpanda44(a)（頭在 .pbhead，PET41.p19={hd:'pb',pv:[60,68]} 給 pet19）、PET41.preview(st) 三階段、RPANDA44(表情)、PET41.pose(eat/bath/brush/play/sleep)、朋友版 RPANDA44STAND。
- 衣服照獎品表改名：dress43／b_paint43 小畫家罩衫、頭飾 beret43、背後 bag41 小導遊背包（wrapPrincess／wrapBoy 畫）。
- 朋友照 cast.json 的 id 改畫：pigeon41、owl42、bookworm42、hippo43、croc43、bunny43（可選）、keeper44、redpanda44、peacock45、chameleon45。
- 塗色本 4 張照 dev/coloring_s7.md 重畫了（還沒看過渲染結果）。
- 動物園的大象、長頸鹿（四隻腳）：S41.ZOO.elephant／giraffe；攝影師同事 m8_photo_art.js 已經有自己的 elephant/giraffe（G.__ZOO8a），之後可以統一用他的或我的。

## 下一步
1. （完成）預覽頁改成新鍵名、重新截圖、逐張檢查；補強了診所場景（護牆板、魚缸、海報）、牙醫診療椅、環環抱尾巴、阿森制服、書書的「噓」手勢、「我的畫」畫框花邊、塗色本的大象和變變。
2. 待 Albert 決定：owl42 顏色（cast 寫咖啡色和奶油色，現在沿用遊戲裡紫色的貓頭鷹）、bunny43 護理師帽要不要。
3. 給 Albert 看預覽，同意後把 S41.LIVE 打開、跟 m7c 對接（m7c 用 PET41.redpanda44、PET41.p19、S41.ROOM.mypic45、S41.HEAD／S41.BACK 需要它那邊加換裝格子的對應）。

## 還缺／待決定
- owl42 顏色（紫 or 咖啡）、bunny43 護理師帽要不要。
- m7c 要處理 head 格 beret43、back 格 bag41 的換裝圖示（S41.ICON.beret43／bag41 已提供）和「我的畫」掛在牆上的位置。

## 決定（11/22）
- 動物園的大象、長頸鹿統一用攝影師同事的 G.ZOO8（m8_photo_art.js），S41.ZOO 不用，第 44 章場景改成引用 ZOO8。
- 貓頭鷹館員顏色、兔子護理帽：等 Albert 看預覽時一起問。

## 2026-11-24 接進遊戲（Albert 同意）
- S41.LIVE=true。m7c 讀到美術就用真的圖（__s7art.on=true，missing 空的）。
- 換裝：頭飾格 beret43、背後格 bag41。wrapPrincess／wrapBoy 不再把 head／back 清掉（清掉的話跳舞骨架 RIG 記到的 look 沒有貝雷帽，關卡畫面會少帽子）。
- 房間：pic 格用 S41.FRAME（花邊畫框，框裡放自己塗的作品），在 m7c 的 wallSVG7 改成畫框，擺在牆上的空位（左邊吊架和城堡畫中間，x192 y40，88×88）；pic 格小縮圖：patches/72_s7art_thumb.py ＋ window.__s41picThumb。
- 開場故事每一頁換場景（m7c 的 pgBg7：第一頁開場圖、中間拆段故事場景、最後一頁主場景）；大結局用 fin45。
- 題目物件：ICONART['i:s41*'] 改成 getter（大象、長頸鹿用 ZOO8）；第七季題庫裡幾個 emoji（📚📖🎨🍬🗺️📷🖼️🖌️🧻🩺🪥🐘🦒🚇🎫）換成這一季畫的物件（只改 S7Q）。
- 小貓熊沒有咳嗽表情（RPANDA44('cough') 會畫成一般表情）。
- 書書維持紫色；第 43 章兔兔換成戴小護理帽的 bunny43（S7D[43] 的關卡、__ST19SPK 的「兔兔」）。
- 截圖：qa/art7/live/（web／app × iPhone 直式／iPad 橫式；每章一張＋開場故事、房間、房間佈置、換裝、寵物小屋、獎狀、大結局）；腳本 qa/art7/live.js。

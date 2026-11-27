# 第八季美術 m8sb_s8art.js 介面說明（給 A／C1／C2／E／F）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）

第 2 版（01:10）：全部圖都做好、已在遊戲裡測過；房間位置改照 E 的分配表；加了 `car` 汽車物件。

檔案：`/home/claude/w/s7_s8art/mods/m8sb_s8art.js`（B 寫，結構照第七季 m7b_s7art.js，把 41 換成 46）。
載入順序：m8sb 在 m8sc 前面（檔名排序 m8sb < m8sc），所以 A 的 m8sc 讀得到下面所有 window 上的東西。
開關：`S46.LIVE===true`（預設開）；設 `window.S8ART=false` 可以整個換回暫代圖（A 要照 m7c 的 ART_ON 寫法自己判斷）。
**所有東西都掛在 window 上**；m8sb 本身不改遊戲，只有 A 呼叫 `S46.hook()` 之後才把衣服、頭飾、寵物錨點、獎狀 CSS、題目物件登記進遊戲（跟 m7c 呼叫 S41.hook() 一樣）。

## 1. 場景 BG46（照 BG41）
`BG46[key](W,H)` → SVG 內容字串（不含 `<svg>` 外框）。左右各多畫 400 給寬螢幕；H>W 直放時重排；上方中間留題目卡、中間留答案卡、右下留主角；沒有文字、沒有真實標誌。

| 章 | 主場景 BG46_CH | 開場圖 BG46_OPEN | 拆段故事 BG46_STORY |
|---|---|---|---|
| 46 | `fire46` 消防局車庫（消防車、裝備） | `fire46out` 消防局外觀 | `fire46truck` 消防車近看、`fire46gear` 裝備牆（頭盔、外套、面罩）、`fire46drill` 逃生演練走廊（綠色逃生指示燈、樓梯、警報器、天花板一點點煙） |
| 47 | `police47` 派出所裡面（櫃台、失物招領箱） | `police47out` 派出所外觀（原創警車） | `police47desk` 櫃台近看（送錢包）、`police47road` 回家的路（明亮的店、人行道）、`police47door` 家門口（門鈴、對講機） |
| 48 | `pool48` 社區游泳池（救生員高椅、淺水區） | `pool48out` 游泳池入口（置物櫃） | `pool48warm` 池邊暖身、沖水、`pool48shallow` 淺水區近看（水深色帶）、`pool48rest` 休息區（時鐘、毛巾，遠方小雷雲） |
| 49 | `park49` 河濱自行車道 | `park49out` 公園入口（腳踏車停放架） | `park49check` 騎車前檢查（煞車、鈴鐺、輪胎）、`park49path` 自行車道（讓走路的人）、`park49cross` 公園旁的路口（斑馬線、紅綠燈，牽車） |
| 50 | `home50` 主角的家・客廳全景 | `home50out` 主角的家外觀 | `home50a` 客廳、`home50b` 廚房、`home50c` 浴室、`home50d` 陽台 |

- `window.BG46_CH={46:'fire46',47:'police47',48:'pool48',49:'park49',50:'home50'}`
- `window.BG46_OPEN={46:'fire46out',…}`、`window.BG46_STORY={46:['fire46truck','fire46gear','fire46drill'],…,50:['home50a','home50b','home50c','home50d']}`
- `window.BG46_FIN='fin50'`：季完結大結局（小鎮廣場頒獎典禮：彩旗、舞台、星星徽章大看板、氣球）。
- C2 的找危險大圖可以拿 `BG46.home50a/b/c/d`、`BG46.fire46drill`、`BG46.pool48`、`BG46.park49cross` 當底圖（危險物件 C2 自己疊上去）。
- 第八季建議的暫代背景（m8sc 的 SZ.fallbackBG）：`{fire46:'town',police47:'street',pool48:'farm',park49:'farm',home50:'castle'}`。

## 2. 朋友 CH46（照 CH41；100×100 全身，腳 y≈94、影子 y=96）
`CH46[k].f(e)` → SVG 內容（不含外框）；`e`＝`'happy'`（預設，開心）／`'talk'`（說話，嘴巴張開）。`CH46[k].svg(a,e)` → 完整 `<svg viewBox="0 0 100 100">`。
| id | 名字 | 說明 |
|---|---|---|
| `firedog46` | 消防隊的斑點狗「斑斑」 | 白底咖啡斑點、原創消防外套（亮黃反光條）、小頭盔 |
| `bearcop47` | 黑熊警察 | 用遊戲原本的 `blackbear` 身體＋頭（`fullBody('blackbear')`，胸口白色 V 字），加深藍警察帽（金色星星，不是真警徽）、藍色背心＋亮黃反光條、哨子 |
| `otter48` | 救生員海獺教練「浪浪」 | 咖啡色海獺、紅白救生員背心（沒有字）、脖子掛哨子、拿浮板 |
| `cat49` | 橘貓「小橘」站姿 | 橘色虎斑、戴安全帽、扣好扣環、手比讚 |
| `cat49bike` | 小橘騎腳踏車 | 同一隻貓騎小腳踏車（原創造型，有鈴鐺），寬一點，一樣 100×100、輪子著地 y≈94 |
- A 照 m7c：`Object.keys(CH46).forEach(k=>…AN[k] getter → CH46[k].f())`。說話版：`CH46[k].f('talk')`。
- 也有 `CH46_NAME={firedog46:'斑斑',…}`。

## 3. 寵物 PET46（照 PET41.redpanda44；120×120，viewBox `0 -6 120 120`，坐著）
- `PET46.spotdog46(a,acc,st)`：永遠畫「長大」的樣子（m7c 叫 `PET7[id]('','',2)` 照樣可以）；頭在 `.pbhead`。
- `PET46.p19={hd:'pb',pv:[60,68]}`（給 pet19 成長用）、`PET46.anchor={h:[60,24],n:[60,70],s:1}`、`PET46.anchorAt(st)`、`PET46.preview(st,a)` 三階段預覽（寶寶、小時候、長大）。
- `PET46.pose(act,a)`：寵物小屋動作 `eat`／`play`／`sleep`／`bath`／`brush`。
- `window.SPOTDOG46(e,a)`：100×100 表情版，`e`＝`normal`／`happy`／`sleep`／`wow`／`talk`（給故事、獎狀）。`window.SPOTDOG46STAND()`：朋友版站姿（100×100 內容）。
- `PET46_NAME={spotdog46:'小斑點狗'}`。寵物只會開心，沒有生病、難過的表情。

## 4. 衣服、頭飾（照 S41；公主、王子都穿得上）
| 用途 | 公主（DRESS） | 王子（BFIT） | 頭飾（head 格） |
|---|---|---|---|
| 46 小消防員外套＋帽子 | `fireman46` | `b_fireman46`（也登記 `fireman46` 給王子，A 的 boy 欄寫哪個都可以） | `firehat46` 小消防員帽子 |
| 49 反光背心＋腳踏車安全帽 | `vest49` | `b_vest49`（也登記 `vest49`） | `helmet49` 腳踏車安全帽 |
- 建議 A 的獎品表：46 `dress:['fireman46','小消防員外套'], boy:['b_fireman46','小消防員外套'], items:[['head','firehat46','小消防員帽子']]`；49 `dress:['vest49','反光背心'], boy:['b_vest49','反光背心'], items:[['head','helmet49','腳踏車安全帽']]`。
- `S46.DRESS`、`S46.BOY`、`S46.DRESS_NAME`、`S46.HEAD`（`firehat46`、`helmet49`）、`S46.ICON.firehat46／helmet49`（換裝間小圖示）。
- `S46.hook()` 會：登記 DRESS／BFIT、patt 花紋、IDOL.jacket／boots／boyJacket／boySleeve 掛勾、`princess`／`boySVG`／`RIG` 包一層畫頭飾；寵物錨點 `ACCANCH.spotdog46`；獎狀 CSS；`install46()`。

## 5. 房間佈置（100×100 完整 `<svg>`）
- `S46.ROOM.escmap50`：牆上「我家的逃生路線圖」（房子平面圖、綠色箭頭、集合點旗子；沒有字）。
- `S46.ROOM.kit47`：門邊掛勾板上的小手電筒和哨子。
- `S46.ROOM_NAME={escmap50:'我家的逃生路線圖',kit47:'小手電筒和哨子'}`。
- 放在房間 roomSVG 的 bg（800×400 座標）：`S46.roomPlace(id)` → `<svg class="s46rm" x y width height viewBox="0 0 100 100">…</svg>` 片段，直接加到 `R.bg` 最後面（在主角、寵物後面）。
- 位置照 E 的房間區域分配表（s7_home/dev/home23.md）：不給座標時先讀 `window.__H23.spot(id)`，讀不到用 `S46.ROOMPOS`：`escmap50:[746,177,52]`（右牆上 H2）、`kit47:[751,238,46]`（右牆下門邊 H3）（x、y、寬＝高）。也可以 `S46.roomPlace(id,x,y,w)` 自己給。
- 已測：qa/v23/s8art/room8.js 把兩樣加進 roomSVG，截圖 shots/ipad_room.png。
- 房間佈置選單小縮圖：`S46.roomThumb(id)` → 有 xmlns 的完整 svg 字串。

## 6. 徽章、小徽章、獎狀、章節圓章、大地圖圖示
- `S46.BADGE(a)`：安全小隊員徽章 200×200 完整 svg（盾牌＋星星＋五個小圖示）。
- `S46.MINI(k,a)`：五章的小徽章 100×100（k＝0～4 對應 46～50），給圖鑑一排。
- `S46.BADGE_IC[k]`：五章小圖示（-10～10 座標的內容）。
- `S46.certHTML(o)`：獎狀「星光安全小隊員獎狀」，o＝`{name,hero,pet,date}`（同 m7c 的 certHTML7）；文字讀 `window.__s8data.FIN`（或 `window.S8FIN`）的 `cert_title`／`cert_to`／`cert_sign`／`cert_body`（陣列，`'<br>'` 換行），沒有就用 `S46.FIN0`。class：`card certcard cert3 cert8`，按鈕 `#certok`。CSS 在 `S46.CERT_CSS`（hook 會加）。
- 章節圓章（不用 emoji）：`install46()` 會登記 `ICONART['i:s46c46']`～`['i:s46c50']`（消防車、警察帽、游泳圈、腳踏車、房子＋放大鏡）、大地圖第十段 `ICONART['i:s46arc']`（安全小隊盾牌）。A 的 WORLD／ARCS 的 `ic` 寫這些鍵，`art(ic)` 就會畫出來。也可以直接拿 `S46.CHIC[46]`…（64×64 內容）。

## 7. 題目物件 OBJ46（64×64 內容；install46() 登記成 `ICONART['i:s46'+k]`）
`firetruck` 消防車、`extinguisher` 滅火器、`alarm` 警報器、`phone` 電話、`exitsign` 逃生指示燈、`stairs` 樓梯、`elevator` 電梯、`smoke` 一點煙、`fire` 小小的火、`firehelmet` 消防頭盔、`mask` 消防面罩、`lighter` 打火機、`matches` 火柴、`meet` 集合點旗子、`window` 靠馬路的窗、`door` 門、
`policecar` 警車、`policehat` 警察帽、`wallet` 錢包、`bill100` 100 元鈔票（原創樣子）、`coin1`／`coin5`／`coin10`／`coin50` 硬幣、`lockheart` 通關密語愛心鎖、`candy` 陌生人給的糖果、`jelly` 果凍、`drinkpack` 飲料包、`gift` 禮物、`doorbell` 門鈴、`shop` 明亮的店、
`helmet` 腳踏車安全帽、`buckle` 扣環、`bell` 鈴鐺、`brake` 煞車、`tire` 輪胎、`vest` 反光背心、`bike` 腳踏車、`scooter` 滑板車、`tricycle` 三輪車、`wheel` 輪子、`zebra` 斑馬線、`car` 汽車、`light` 紅綠燈、`phonehead` 手機和耳機、
`whistle` 救生員哨子、`ring` 游泳圈、`kickboard` 浮板、`goggles` 泳鏡、`locker` 置物櫃、`shower` 沖水、`thunder` 雷雲、`towel` 毛巾、`clock` 時鐘、
`detergent` 清潔劑瓶、`podball` 洗衣球、`medicine` 藥罐、`hotpot` 熱鍋、`cord` 窗簾繩、`plasticbag` 塑膠袋、`gas` 瓦斯爐、`wetfloor` 浴室濕地板、`chair` 窗邊的椅子、`washer` 洗衣機、`fridge` 冰箱、`magnifier` 放大鏡、`sticker` 提醒小貼紙、`flashlight` 手電筒。
- `OBJ46_NAME[k]` 中文名。`S46.QI`：emoji → 物件鍵（🚒→firetruck、🧯→extinguisher、☎️/📞→phone、🚓→policecar、👛→wallet、🍬→candy、🛟→ring、🥽→goggles、🚲→bike、🛴→scooter、🔔→bell、⛑️→helmet、💊→medicine、🧴→detergent、⛈️→thunder、📱→phonehead…）；`S46.quizIcons(Q)` 把第八季題庫陣列裡這些 emoji 換成 `i:s46…`（只改傳進去的那份）。
- 有缺的物件跟 B 說（或直接在說明檔寫），B 會補。

## 8. 測試、截圖
- `qa/v23/s8art/live8.js [ipad|iphone]`：借第 45 章的關卡，把背景換成第八季主場景（要同時設 `CHBG[k]` 和 `RD40BG[k]`，關卡畫面用的是 RD40BG；`window.__rtNow` 設白天，不然是夜晚模式）。
- A 接線提醒：照 m7c，`BGKEYS.forEach(k=>{if(CHBG[k])RD40BG[k]=…})` 那一行要留著，關卡畫面才看得到第八季場景。

## 9. 其他
- 動畫只用遊戲現有的 rd4tw／rd4dr／rd4bob／rd4sw／blink；沒有整體放大縮小；漸層 id 每次產生都唯一。
- 沒有塗色本 PICS（第八季塗色圖是 F 的遊樂園禮物 col_*）。
- 原始碼分段在 `qa/v23/s8art/src/*.js`，`bash qa/v23/s8art/mk.sh` 接成 mods/m8sb_s8art.js 並做語法檢查（要改請改 src 再接）。
- 新美術總表：`qa/v23/s8art/sheet1_scenes.png`（場景）、`sheet2_cast.png`（朋友、寵物、衣服、徽章、房間、物件）；遊戲內截圖 `qa/v23/s8art/shots/`。

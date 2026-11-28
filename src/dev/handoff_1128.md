# 星光小冒險 完整交接（給新對話的 Claude）

2026-11-28　星光工作室 Starlight Studio　著作權與 IP 屬於星光工作室 Starlight Studio（內部文件；公開內容不寫本名）

新對話開始時先讀完這份，再動手。其他專案文件：「UIUX總檢與破關改善_1127」（介面、美術、破關好玩度的檢查結論）、「2.2設計_遊樂園禮物與人物圖示」、「第31-100章大綱與遊樂園規劃」（之後每季的內容）、「交接_第七季進度」（2.0 送審經過）。

---

## 1. 現在的狀態（2026-11-28 早上）

| 項目 | 狀態 |
|---|---|
| iOS App 2.0 | 遊戲 5.4.1，建置 202611260215，11/26 重新送審，等 Apple 審查。設定「自動發佈此版本」。 |
| iOS App 2.1 | 遊戲 5.5.0，分支 **app-2.1（4a736de，已推上 GitHub）**。Albert 可先跑 TestFlight（ios.yml、分支 app-2.1、勾 upload）。 |
| iOS App 2.2 | 遊戲 5.6.0，分支 **app-2.2（7063de3，已推）**，MARKETING_VERSION 2.2，release_notes 含 2.1 內容。**新台詞還沒錄音**（見第 4 節 rec79）。 |
| iOS App 2.3 | 遊戲 5.7.0（sw starlight-v138），分支 **app-2.3（c401e14，已推）**，MARKETING_VERSION 2.3，商店說明（description、promotional_text、release_notes）已改第八季。**新台詞還沒錄音**。2.3 已包含 2.1、2.2 全部內容。 |
| 送審計畫 | 2.0 通過上架後，錄好 rec79、換語音索引、重建，推到 app-2.3（或 2.2）→ Albert 跑 iOS 打包＋商店資料 → 送審。建議直接送 2.3（2.1、2.2 都包在裡面）。 |
| 網頁版 | 停在 5.3.1，不再更新 |
| 收費 | 只賣「完整版」，第六章以後全部章節＋之後新增章節（第 46～50 章自動包含）。只買過分段的舊家庭要再買完整版才能玩第 46 章起（照 2.0 規則；要不要另外處理請 Albert 決定）。 |

### 2.1（5.5.0）內容
過關卡點一下就出獎勵、開場念完自動開始、答對大箭頭、中等每關少一題、描過的字不重看示範、遊樂園不跳闖關地圖鍵、星星小考改成玩完一個遊戲回來才出、寫字板手掌壓住不卡。程式：patches/92_v21_flow.py、mods/m9za_v21.js。

### 2.2（5.6.0）內容
- 遊樂園大禮物：第 41～45 章第 3、6、9 關第一次過關送遊樂園的新東西（15 樣：鬱金香種子＋花盆、彩虹隧道、芒果、小書蟲塗色圖、星星投影燈、南極企鵝、長頸鹿身高尺、小黃瓜、潔牙骨頭、大象澆水壺、腳印地毯、牽牛花、花花相框、變色龍塗色圖、彩虹相機）；「去遊樂園試試看」→遊戲裡「回去繼續冒險」；舊存檔補送；章節地圖禮物牌。存檔 V2.g22={own,got,fresh}（公主王子共用）。mods/m9zb_g22data.js（資料約定）、m9zd_g22core.js（核心）、m9ze_g22items.js（各遊戲物品）、patches/95。
- 第 41～45 章第 1～9 關每關一題動手玩（接星星、翻牌、分籃子、走格子、拼圖、排順序、撥時鐘、疊積木）：mods/m9zg_hands22.js、patches/98（學習報告分類）。誤點不扣星星。
- 美術：答案卡人物手勢 30 款（m9zc_vis22.js，原始碼 qa/v22/vis/src → node qa/v22/vis/assemble.js）、動手玩缺的 30 個圖示和愛文芒果（m9zm_icons22.js）、白紗變淡、王子舞會新圖、小遊戲背景。
- 介面統一 mods/m9zf_ui22.js：共用返回鍵（找畫面裡 class `.p88back` 的原返回鍵來按；**新畫面的返回鍵要加 p88back**）、上方圓鈕 52/60、最小字、答對 sfx('ding22')＋綠框、喇叭統一、通知最多 6 個小圖、小遊戲開始結束卡統一。
- 其他：m9zh_v22misc.js（「城市詞卡找注音」改名）、patches/96（關於頁這一版新增）、cfg.json 新增 vlog_prev（build.py 會把舊版本紀錄一起放進 VLOG）。

### 2.3（5.7.0）內容（7 位代理平行做、2 位審查、修正後整合）
- 第八季「星光安全小隊」第 46～50 章（消防局、派出所、游泳池、騎腳踏車、居家安全）：資料正本 dev/s8_data.py → `python3 dev/gen_s8.py` 產生 mods/m8sa_s8data.js 和 dev/levels8.md；dev/check_s8.py 檢查；dev/lines_s8.py 抽台詞。接線 m8sc_s8logic.js（大地圖第十段、獎狀、獎品：小斑點狗、小消防員外套帽子、反光背心安全帽、房間「安全角落」kit47／escmap50）、寫字 m8sd_write8.js（ㄚㄛㄜㄝ、e～k）、故事屋兩本 m8sh_books8.js、patches/73（八季五十章字樣）。美術 m8sb_s8art.js（原始碼 qa/v23/s8art/src → mk.sh）。
- 新題型：學習動手題 m8se_learn8.js（pin8 拼拼看、tone8 四聲、floor8、route8、money8、change8、locker8、deep8、chart8、wheel8、clock8、low8、case8；說明 dev/types8_learn.md）；安全題 m8sf_safe8.js（danger8 找危險大圖 9 張、phone8 打電話演練、okno8 可以不可以）、第 10 關大冒險 m8si_quest8.js（第 50 章在主角自己的房間）；原始碼 dev/c2src → mk.sh；說明 dev/types8_safe.md、查證 dev/notes_safe8.md、dev/notes8.md。
- 遊樂園：腳踏車小路 m8sg_bike8.js（第 49 章完成才開）；挖化石＋盪藤蔓大改版 m9zi_park23.js（原始碼 dev/p23src → dev/mk_park23.py；恐龍 9 種、塗顏色、恐龍博物館、房間化石展示架；盪藤蔓岔路、雨林朋友貼紙簿、小樹屋佈置；其他後期小遊戲每局送小收集）；手作小工坊＋作品擺進房間＋節日佈置一件一件選 m9zj_home23.js（說明含房間區域分配表 dev/home23.md）。
- 第 46～50 章遊樂園禮物 15 樣 m9zk_g23data.js＋物品 m9zl_g23items.js（塗色圖 4 張、小警車、寵物游泳圈、彩虹車鈴；另修好房間玩具縮圖一直是城堡的舊問題）；挖化石、盪藤蔓、手作的禮物物品在各自的 mod。fs_tri＝劍龍化石（三角龍原本就免費）。
- 測試：qa/v23/s8data/test_s8.js（公主第 46～50 章 71 項全過＋15 樣禮物都對；王子 46、49）、qa/v23/{s8learn,s8safe,park,home,bike}/、qa/v22/*。整合測試都過（剩下的失敗是舊測試的假設過時：giftcore D9、bike gift D3）。
- 給家長看的：重點畫面、新美術總表 PDF（2.2＋2.3 全部新圖）。

### 11/28 早上驗收後的修正（5.7.0，sw starlight-v139）
- 字形：粉圓 Huninn 的漢字是日本寫法（真、令、草、說…），漢字改用「源泉圓體 TW M」（font/GenSenRounded2TW-M.otf，SIL OFL 1.1，ButTaiwan）。build.py 4b 段只把漢字做成子集 font-tw-*.woff2；patches/9d_twfont.py 加 @font-face StarTW（unicode-range 只含漢字）、--cjk 與 .zy 前面加 "StarTW"、字型授權加一行。注音、英文、標點仍用粉圓。字表多收 × ° ©。
- 描字：照教育部《國語注音符號手冊》線上版（language.moe.gov.tw/001/Upload/files/SITE_CONTENT/M0001/deploy/html_ch/）逐字核對 28 個注音。Albert 要求「只收正確寫法」：ㄓ（中間豎寫到底接長橫，4 畫）、ㄚ 3 畫、ㄛ／ㄜ（第二筆從橫的中間往下、轉左繞大彎；照字形量的座標）、ㄐ 只收直的；ㄅㄆㄉㄌㄎ 筆畫數不對的舊寫法、ㄝ 其他筆順都拿掉；ㄖ 保留手冊的「可省作三畫」。檔案：mods/m8sd_write8.js、mods/m9zo_wfix.js（另含 i、j 點一下就算寫點）。總表工具 qa/v23/wchk（dump.js → sheet.js、cmp2.js、wshot.js）。
- 排版：章節地圖關卡名稱太長會擠在一起，dev/s8_data.py 縮短 13 個（只是顯示名稱，沒有錄音）；mods/m9zp_tfix.js（獎狀日期字型、四聲符號放大、禮物卡名稱換行平均）。
- 台詞改 4 句（P23_f_in_beach 海邊→海裡、S8S_p_w3、S8S_d_home50b_sink、S8_0886）→ rec80（rec/r80，id 加 _v2，lines/vo80_ids.json）。
- 商店文字：描述「小寫 a～k」＋筆順依教育部手冊；版本說明加字形與筆順；關鍵字換「安全、消防」（關鍵字要 ≤100 位元組）。

---

## 2. Albert 的規則（一定要遵守）
（同前版，不變）
**溝通**：一律繁體中文，簡潔白話，不要 AI 腔。多半用手機。背景長時間工作不要一直回報。大工作拆給多個代理平行做，再找另一批代理交叉審查（11/28 他說「原則上都依建議，不要卡住」）。給他看成果用幾張截圖，不要錄影。每次交付告訴他版本號。
**發布**：只出 App 版，每次都保存 App 原始碼（repo src/）。每次交付都升版本號。iOS 上傳和 ASC 送審由 Albert 自己按；回覆 Apple 前先給他看。密碼、付款、Apple 金鑰只能他自己輸入。不在歐盟、中國上架。商店說明不寫價格、不寫「免費」、不放注音符號。兒童畫面不出現價格。
**內容**：無版權角色品牌、不用「星光少女／星光樂團／星光樂園」；公開內容不出現女兒英文名；著作權寫「星光工作室 Starlight Studio」；新美術要先給 Albert 看；不可以有缺錄音、絕不用裝置語音；角念 ㄐㄧㄠˇ（TTS 寫腳）、睡覺的覺用 alias「叫」；角色不整體放大縮小、不轉到後腦勺；沒有罪惡感機制；紅十字不要用（受法律保護）。
**安全**：絕對不可以上傳、貼出或打開 Azure 語音金鑰（D:\星光公主\key.txt）。repo 是公開的，不放任何金鑰或私人資料。
女兒最喜歡：畫畫、手作、自己的家（11/28）。覺得破關和後期小遊戲無聊。

---

## 3. 新對話怎麼接手（原始碼還原）
1. `git clone -b app-2.3 https://github.com/albertliuspielbery-cloud/starlight /home/claude/w/repo`（要推送先 add_repo，access: push；11/27 晚 Albert 允許後成功）
2. `bash /home/claude/w/repo/src/tools/restore.sh`（會 rm -rf /home/claude/w/s7，已有工作區不要跑）。路徑寫死 /home/claude/w/s7、/home/claude/w/repo。
3. 平行開發：`bash tools/mkcopy.sh <名字> <App埠號>` 建 /home/claude/w/s7_<名字> 複本（語音用連結），各代理只新增自己編號的檔案；合併時只拿各自負責的檔。機器只有 2 顆 CPU，同時 7～8 位代理跑瀏覽器測試時計時類測試會不穩。
4. 出新版：改程式 → 升 cfg.json version、sw → build → 測試 → 新分支複製 out/web 的 index.html、sw.js、新 font-hun（舊的 git rm）→ 改 MARKETING_VERSION、appstore/metadata → `bash tools/save_src.sh`（可用 SRC=其他工作區）→ `git add -A && git commit --amend` → push。

---

## 4. 錄音（rec79，還沒錄）
- 2.2＋2.3 全部新台詞 1859 句（S8 962、S8S 276、S8L 147、H23 94、P23 80、S8B 70、G22I 57、B23 43、G22C 37、V22M 34、H22 29、G23 28、英文 2），破音字 88 句已用 SSML 處理。
- 產生方式：`python3 tools/mkrec2.py 79` → rec/r79/lines_79.tsv、rec79.bat、lines/vo79_ids.json（已在 repo src/lines）。聲音：z|→HsiaoChen、dz|→HsiaoYu、pz|→YunJhe、e1|→Jenny。
- 步驟：把 lines_79.tsv、rec79.bat 放到 D:\星光公主（要 Albert 允許資料夾存取，或請他自己放）→ 雙擊 rec79.bat（約一小時）→ 看 log.txt 最後一行 done ok=N → 拿回 mp3 → `python3 tools/mkpack.py voice/index-2fc8cdbe.json lines/vo79_ids.json rec/r79/voice pack62` → cfg.json voice_index 換新索引 → 重建 → 推 app-2.3（voice/ 新檔也要加進 repo）。
- 單字音（麻、罵、嗎、車）和四聲要錄完聽一次。
- 已用過的錄音前綴：JIAO73、S7、GL8、PH8、S7W、S7F、S7H、S7K、S7G、S7J、S7Q、V22M、G22C、G22I、H22、S8、S8B、S8L、S8S、P23、H23、B23、G23、E1。下一個 rec80、pack63。

---

## 5. iOS App 與 App Store Connect
（同前版）appId tw.starlight.adventure，Apple ID 6820335492。Actions：ios.yml（Albert 按、勾 upload）、ios-iap.yml、ios-metadata.yml（Claude 可代跑 `gh workflow run ios-metadata.yml --ref <分支>`）。ASC 版本頁 https://appstoreconnect.apple.com/apps/6820335492/distribution/ios/version/inflight 。2027 年 4 月前 ios.yml 換 Xcode 27。

---

## 6. 待辦
1. 等 2.0 審查；通過後下架舊商品。
2. 錄 rec79 → 換語音索引 → 推 app-2.3 → Albert 打包送審（建議直接送 2.3）。
3. 2.3 待家長看的：新美術總表（2.2 人物手勢 20 款新圖＋遮眼改版、介面小圖示、王子舞會；2.3 全部）、腳踏車困難模式（已改成顏色牌左右、最多第二個路口）、手作小工坊不鎖章節＋做一件給寶石（每天第一次 3 顆、之後 1 顆）、第 48 章沒有章節獎品、舊分段買家要不要另外處理。
4. 2.3 已知小問題：找危險在手機橫放時人物約 34px（直放可左右滑已放大）；腳踏車、手作、化石各自的 MutationObserver 在 iPhone 上的效能待實機確認；2.1 舊存檔一次補送五張禮物小卡；qa/v22/giftcore D9、qa/v23/bike gift D3 是舊測試假設。
5. 之後：第九季（第 51～55 章）照大綱；其他後期小遊戲（郵差、火箭、回收、收銀台、水盆）每局內容變化（建議在 dev/park23.md 第 7 節）；手機直放重排、字幕框統一、第一季場景補畫。
6. 以前審查找到、還沒修的：舊的角色整體縮放（跳舞題、舞會舞伴、寵物跳…）、自由練習完成卡沒套 2.1 改法、家長「亂猜會少寶石」選項、qa/pay290 測試判定。

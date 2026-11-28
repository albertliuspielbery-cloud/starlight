# 第八季關卡表（第 46～50 章）—— A 寫，C1／C2 看這份實作參數

2026-11-28　星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）　第 3 版（09:14）

- 這份由 dev/gen_s8.py 從 dev/s8_data.py 產生（資料是正本）。有改會更新最上面的版次。
- 第 1～9 關每關 3 題：一題安全（quiz／okno8／danger8／phone8 輪流）、一題寫字（write／R）、一題學習動手題；同一章相鄰兩關不用同一種動手題。
- 第 10 關只放 `quest8:<章>`（照 C2 說明：章末關卡 base 不會再插加題、複習題，整關就是大冒險）。
- 題型還沒在 A 的複本時，m8sc 出題那一刻換成備用題型（S8FB），整合後自動用真的。
- 參數照 C1 的 types8_learn.md、C2 的 types8_safe.md：wheel8:<台數>、deep8:order／safe、money8:100|100（認識 100 元鈔票）、clock8:3:30（整點半點，不算經過時間）、pin8:ㄊㄚ|ㄌㄚ（從裡面抽一個）。
- 安全三選一的 tag：46 `消防局`、47 `派出所`、48 `游泳池`、49 `騎車`、50 `居家安全`（題庫在 s8_data.py 的 Q）。

## 第 46 章　參觀消防局（場景 fire46，幫手 firedog46）
| 關 | 名稱 | 幫手 | 題目 |
|---|---|---|---|
| 1 | 消防局到了 | firedog46 | quiz:消防局, write:ㄚ:1, pin8:ㄅㄚ |
| 2 | 看看消防車 | firedog46 | okno8:46, write:e:1, floor8:ord |
| 3 | 警鈴響了 | firedog46 | quiz:消防局, write:ㄚ:2, route8:r1 |
| 4 | 大聲喊失火了 | duck | danger8:fire46, write:f:1, pin8:ㄇㄚ |
| 5 | 走樓梯往下 | firedog46 | quiz:消防局, write:e:2, floor8:5-1 |
| 6 | 有煙壓低身體 | bunny | okno8:46, write:ㄚ:3, pin8:ㄊㄚ|ㄌㄚ |
| 7 | 打一一九 | firedog46 | phone8:119, write:f:2, case8:E|F |
| 8 | 跟著綠色小人 | penguin | quiz:消防局, write:e:3, route8:r2 |
| 9 | 不怕消防員 | firedog46 | quiz:消防局, write:f:3, low8:e|f |
| 10 | 逃生演練 | star | quest8:46 |

## 第 47 章　派出所的黑熊警察（場景 police47，幫手 bearcop47）
| 關 | 名稱 | 幫手 | 題目 |
|---|---|---|---|
| 1 | 撿到一個錢包 | bearcop47 | quiz:派出所, write:ㄛ:1, pin8:ㄐㄧ |
| 2 | 一百元鈔票 | bearcop47 | okno8:47, write:g:1, money8:100|100 |
| 3 | 看起來很親切 | squirrel | quiz:派出所, write:ㄛ:2, pin8:ㄑㄧ |
| 4 | 打一一零 | bearcop47 | phone8:110, write:h:1, change8:10-8 |
| 5 | 通關密語 | bearcop47 | quiz:派出所, write:g:2, pin8:ㄒㄧ |
| 6 | 湊一湊錢 | pig | quiz:派出所, write:ㄛ:3, money8:60 |
| 7 | 大聲說不要 | hedgehog | okno8:47, write:h:2, pin8:ㄓㄨ|ㄕㄨ |
| 8 | 糖果給爸媽看 | kitten | quiz:派出所, write:g:3, change8:10-6 |
| 9 | 跑到人多處 | bearcop47 | quiz:派出所, write:h:3, low8:g|h |
| 10 | 安全回家路 | star | quest8:47 |

## 第 48 章　游泳池的哨子聲（場景 pool48，幫手 otter48）
| 關 | 名稱 | 幫手 | 題目 |
|---|---|---|---|
| 1 | 游泳池開放了 | otter48 | quiz:游泳池, write:ㄜ:1, pin8:ㄏㄜ |
| 2 | 找到置物櫃 | duck | okno8:48, write:i:1, locker8:24 |
| 3 | 三點半上岸 | otter48 | quiz:游泳池, write:ㄜ:2, clock8:3:30 |
| 4 | 池邊找一找 | otter48 | danger8:pool48, write:j:1, deep8:order |
| 5 | 先暖身再沖水 | frog | quiz:游泳池, write:i:2, pin8:ㄍㄜ |
| 6 | 哨子響了 | otter48 | okno8:48, write:ㄜ:3, locker8:57 |
| 7 | 在淺水區玩 | penguin | quiz:游泳池, write:j:2, deep8:safe |
| 8 | 游泳圈是玩具 | otter48 | quiz:游泳池, write:i:3, pin8:ㄔㄜ |
| 9 | 打雷就上岸 | duck | quiz:游泳池, write:j:3, low8:i|j |
| 10 | 游泳池一日 | star | quest8:48 |

## 第 49 章　公園騎腳踏車（場景 park49，幫手 cat49）
| 關 | 名稱 | 幫手 | 題目 |
|---|---|---|---|
| 1 | 戴好安全帽 | cat49 | quiz:騎車, write:ㄝ:1, tone8:ㄇㄚ |
| 2 | 檢查腳踏車 | cat49 | okno8:49, write:k:1, wheel8:3 |
| 3 | 公園裡的車 | squirrel | quiz:騎車, write:ㄝ:2, chart8:a |
| 4 | 找自行車道 | cat49 | danger8:park49, write:k:2, tone8:ㄇㄚ |
| 5 | 按鈴說借過 | cat49 | quiz:騎車, R:ㄚ|ㄛ|ㄜ:3, wheel8:5 |
| 6 | 不放手騎 | bunny | okno8:49, write:ㄝ:3, pin8:auto |
| 7 | 停車場不玩 | cat49 | quiz:騎車, write:k:3, chart8:b |
| 8 | 抬頭看車 | hedgehog | quiz:騎車, R:e|f|g|h|i|j|k:3, tone8:ㄇㄚ |
| 9 | 下車牽著走 | cat49 | quiz:騎車, R:ㄚ|ㄛ|ㄜ|ㄝ:3, low8:e|f|g|h|i|j|k |
| 10 | 騎車去公園 | star | quest8:49 |

## 第 50 章　居家安全小偵探（場景 home50，幫手 bearcop47）
| 關 | 名稱 | 幫手 | 題目 |
|---|---|---|---|
| 1 | 客廳找一找 | bearcop47 | danger8:home50a, R:ㄚ|ㄛ:3, pin8:auto |
| 2 | 數小貼紙 | firedog46 | quiz:居家安全, R:e|f:3, locker8:88 |
| 3 | 不是飲料糖果 | otter48 | okno8:50, R:ㄜ|ㄝ:3, money8:90 |
| 4 | 廚房找一找 | bearcop47 | danger8:home50b, R:g|h:3, tone8:ㄇㄚ |
| 5 | 熱的不碰 | cat49 | quiz:居家安全, R:i|j|k:3, clock8:7:30 |
| 6 | 浴室慢慢走 | otter48 | quiz:居家安全, R:ㄚ|ㄛ|ㄜ|ㄝ:3, chart8:c |
| 7 | 窗簾繩塑膠袋 | firedog46 | quiz:居家安全, R:a|b|c|d:3, case8:E|F|G|H|I|J|K |
| 8 | 窗戶邊不爬 | cat49 | okno8:50, R:e|f|g|h|i|j|k:3, pin8:auto |
| 9 | 聞到怪味道 | bearcop47 | quiz:居家安全, R:ㄚ|ㄛ|ㄜ|ㄝ|e|f|g|h|i|j|k:3, low8:e|f|g|h|i|j|k |
| 10 | 安全小偵探 | star | quest8:50 |

## 用到的參數（給 C1、C2 對照）
- `pin8`：pin8:ㄅㄚ、pin8:ㄇㄚ、pin8:ㄊㄚ|ㄌㄚ、pin8:ㄐㄧ、pin8:ㄑㄧ、pin8:ㄒㄧ、pin8:ㄓㄨ|ㄕㄨ、pin8:ㄏㄜ、pin8:ㄍㄜ、pin8:ㄔㄜ、pin8:auto
- `okno8`：okno8:46、okno8:47、okno8:48、okno8:49、okno8:50
- `floor8`：floor8:ord、floor8:5-1
- `route8`：route8:r1、route8:r2
- `danger8`：danger8:fire46、danger8:pool48、danger8:park49、danger8:home50a、danger8:home50b
- `phone8`：phone8:119、phone8:110
- `case8`：case8:E|F、case8:E|F|G|H|I|J|K
- `low8`：low8:e|f、low8:g|h、low8:i|j、low8:e|f|g|h|i|j|k
- `quest8`：quest8:46、quest8:47、quest8:48、quest8:49、quest8:50
- `money8`：money8:100|100、money8:60、money8:90
- `change8`：change8:10-8、change8:10-6
- `locker8`：locker8:24、locker8:57、locker8:88
- `clock8`：clock8:3:30、clock8:7:30
- `deep8`：deep8:order、deep8:safe
- `tone8`：tone8:ㄇㄚ
- `wheel8`：wheel8:3、wheel8:5
- `chart8`：chart8:a、chart8:b、chart8:c

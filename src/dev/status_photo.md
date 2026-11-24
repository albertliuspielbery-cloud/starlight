# 小小攝影師（photo8）進度　2026-11-23　星光工作室 Starlight Studio
預覽版完成，等 Albert 看美術。
- App 8982 進不去的原因：在瀏覽器裡測 App 版時沒有原生購買外掛，window.__chOpen 是空的，所以第 6 章以後都算沒買，存檔會退回第 5 章。程式本身沒有問題。測試已改成先設 window.__chOpen=chOpenApp，再買 stage2～9。
- 測試 qa/photo8/test.js 四種組合都過：8981／8982 × iPad 橫式／iPhone 直式，簡單、中等、高難度都跑過，沒有錯誤。
- 預覽圖和說明在 preview/zoo_animals.png、preview/photo_*.png、preview/photo_design.md。
- 2026-11-24：刪掉小朋友時照片一起刪（包 profDel），開機時也清掉沒有主人的照片；測試 qa/photo8/test_del.js 通過。
- 下一步：等 Albert 看過美術、回覆 photo_design.md 最後的待決事項。

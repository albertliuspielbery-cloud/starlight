# 台灣標準字形（2026-11-28 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）
# 粉圓 Huninn 由日文字型改來，很多漢字是日本寫法（真、令、草、說…）。漢字改用「源泉圓體 TW M」（GenSen Rounded 2 TW，SIL OFL 1.1，台灣教育部字形），
# 注音、英文、標點照舊用粉圓（描字的形狀不變）。build.py 會把 font-tw-PLACEHOLDER.woff2 換成子集字型的檔名。
def rep(old,new,n=1):
    global s
    assert s.count(old)==n,('patch9d 找不到或次數不對',old[:70],s.count(old))
    s=s.replace(old,new)
rep('@font-face{font-family:"Huninn";','@font-face{font-family:"StarTW";src:url(font-tw-PLACEHOLDER.woff2) format("woff2");font-weight:400;font-display:swap;unicode-range:U+3400-4DBF,U+4E00-9FFF,U+F900-FAFF,U+20000-2FFFF}\n@font-face{font-family:"Huninn";')
rep('--cjk:"Huninn",','--cjk:"StarTW","Huninn",')
rep('<details class="fontlic"><summary>字型授權</summary><p>粉圓 Huninn：Copyright 2025 The Huninn Project Authors (https://github.com/justfont/Huninn)<br>',
    '<details class="fontlic"><summary>字型授權</summary><p>源泉圓體 GenSen Rounded 2 TW：Copyright 2014-2019 Adobe (http://www.adobe.com/), with Reserved Font Name \'Source\'；GenSen Rounded by ButTaiwan (https://github.com/ButTaiwan/gensen-font)<br>粉圓 Huninn：Copyright 2025 The Huninn Project Authors (https://github.com/justfont/Huninn)<br>')
rep('兩套字型都採用 SIL Open Font License 1.1 授權，全文如下。','三套字型都採用 SIL Open Font License 1.1 授權，全文如下。')
rep('.zy{font-family:"Huninn",','.zy{font-family:"StarTW","Huninn",')

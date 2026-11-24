
/* ===================== 5. 塗色本（200×200；格式同第六季 S36.PICS；構圖照 dev/coloring_s7.md） =====================
 * r＝可以塗的區塊（封閉；後面的蓋在前面的上面），deco＝畫在線上面、不能塗的裝飾（線條 #3A2A5C）。順序：捷運列車（41）、書架（42）、動物園的動物（44）、畫框（45） */
const CR=(t,a)=>[t,a];
const INK='#3A2A5C';
const dl=(d,w=2.5)=>`<path d="${d}" stroke="${INK}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot=(x,y,r=2.6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
S41.PICS=[
 {n:'捷運列車',cat:'adv',lv:2,scene:'搭捷運進城（第 41 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('circle','cx="172" cy="24" r="13"'),
  CR('path','d="M44 34 Q40 22 54 22 Q60 12 72 18 Q84 14 86 26 Q96 28 92 36Z"'),
  CR('rect','x="6" y="44" width="34" height="50"'),CR('rect','x="46" y="60" width="28" height="34"'),CR('rect','x="118" y="36" width="32" height="58"'),CR('rect','x="154" y="62" width="34" height="32"'),
  CR('rect','x="0" y="186" width="200" height="14"'),
  CR('rect','x="86" y="152" width="28" height="34"'),
  CR('rect','x="0" y="144" width="200" height="10"'),
  CR('path','d="M12 102 Q12 92 22 92 H96 V118 H12Z"'),CR('rect','x="12" y="118" width="84" height="20"'),
  CR('rect','x="100" y="92" width="68" height="26"'),CR('rect','x="100" y="118" width="68" height="20"'),
  CR('path','d="M168 92 Q192 94 194 122 V138 H168Z"'),
  CR('rect','x="60" y="98" width="18" height="38" rx="2"'),CR('rect','x="142" y="98" width="18" height="38" rx="2"'),
  CR('rect','x="18" y="98" width="17" height="15" rx="3"'),CR('rect','x="39" y="98" width="17" height="15" rx="3"'),CR('rect','x="105" y="98" width="16" height="15" rx="3"'),CR('rect','x="124" y="98" width="14" height="15" rx="3"'),
  CR('circle','cx="26.5" cy="109" r="5"'),CR('circle','cx="113" cy="109" r="5"'),
  CR('path','d="M172 98 H184 Q190 104 190 112 H172Z"'),
  CR('circle','cx="183" cy="127" r="7"'),
  CR('circle','cx="30" cy="141" r="6"'),CR('circle','cx="78" cy="141" r="6"'),CR('circle','cx="118" cy="141" r="6"'),CR('circle','cx="156" cy="141" r="6"')],
  deco:()=>dl('M12 118 H194',3.4)+dl('M69 99 V135 M151 99 V135')+dot(180.4,125.4,1.3)+dot(185.6,125.4,1.3)+dl('M180 128.6 Q183 131 186 128.6',1.6)
   +[[30,141],[78,141],[118,141],[156,141]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${INK}"/>`).join('')
   +[[12,52],[24,52],[12,66],[24,66],[12,80],[24,80],[52,68],[62,68],[124,46],[136,46],[124,62],[136,62],[160,70],[172,70]].map(([x,y])=>`<rect x="${x}" y="${y}" width="7" height="7" fill="none" stroke="${INK}" stroke-width="1.6"/>`).join('')
   +dl('M100 154 V184',1.6)},
 {n:'書架',cat:'adv',lv:1,scene:'安靜的圖書館（第 42 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('rect','x="0" y="190" width="200" height="10"'),
  CR('rect','x="38" y="74" width="124" height="114"'),
  CR('rect','x="28" y="68" width="10" height="124" rx="2"'),CR('rect','x="162" y="68" width="10" height="124" rx="2"'),
  CR('rect','x="24" y="62" width="152" height="8" rx="3"'),CR('rect','x="38" y="108" width="124" height="7"'),CR('rect','x="38" y="148" width="124" height="7"'),CR('rect','x="24" y="186" width="152" height="7" rx="2"'),
  CR('rect','x="44" y="80" width="13" height="28" rx="1.6"'),CR('rect','x="59" y="84" width="13" height="24" rx="1.6"'),CR('rect','x="74" y="78" width="15" height="30" rx="1.6"'),CR('rect','x="91" y="83" width="13" height="25" rx="1.6"'),CR('path','d="M108 108 L118 80 L130 84 L121 108Z"'),CR('rect','x="136" y="80" width="16" height="28" rx="1.6"'),
  CR('rect','x="46" y="138" width="56" height="10" rx="2"'),CR('rect','x="52" y="128" width="46" height="10" rx="2"'),
  CR('path','d="M120 148 L116 132 H144 L140 148Z"'),CR('path','d="M130 132 Q112 126 116 112 Q130 116 130 132Z"'),CR('path','d="M130 132 Q148 124 146 110 Q132 114 130 132Z"'),
  CR('rect','x="62" y="158" width="15" height="14" rx="1.6"'),CR('rect','x="81" y="156" width="15" height="16" rx="1.6"'),CR('rect','x="100" y="158" width="15" height="14" rx="1.6"'),
  CR('path','d="M52 168 H148 L142 186 H58Z"'),
  CR('path','d="M78 62 Q74 40 82 30 L80 18 L90 26 Q100 22 110 26 L120 18 L118 30 Q126 40 122 62Z"'),
  CR('path','d="M80 60 Q76 44 86 40 L92 62Z M120 60 Q124 44 114 40 L108 62Z"'),
  CR('ellipse','cx="100" cy="52" rx="10" ry="10"')],
  deco:()=>`<circle cx="91" cy="36" r="6.4" fill="none" stroke="${INK}" stroke-width="2.4"/><circle cx="109" cy="36" r="6.4" fill="none" stroke="${INK}" stroke-width="2.4"/>${dl('M97.4 36 H102.6',2)}${dot(91,36,2.2)}${dot(109,36,2.2)}${dl('M98 42 L100 45 L102 42',2)}`
   +`<path d="${star5(50.5,92,3)}" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="${heartP(81.5,92,3)}" fill="none" stroke="${INK}" stroke-width="1.6"/>${dl('M140 92 q4 -3 8 0 q-4 3 -8 0 M148 92 l3 -2 v4Z',1.6)}`
   +dl('M42 85 V100 M164 80 V96 M166 120 V136 M34 130 V146',1.4)+dl('M58 175 H142 M62 181 H138',1.6)},
 {n:'動物園的動物',cat:'adv',lv:2,scene:'動物園一日遊（第 44 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('path','d="M0 150 Q100 138 200 150 V200 H0Z"'),
  CR('rect','x="150" y="20" width="9" height="132" rx="3"'),CR('path','d="M158 50 Q176 40 188 46 Q174 54 158 54Z"'),CR('path','d="M150 80 Q132 70 120 76 Q134 84 150 84Z"'),
  CR('rect','x="112" y="110" width="5" height="36"'),CR('path','d="M114 92 Q98 100 114 118 Q130 100 114 92Z"'),
  CR('path','d="M0 92 Q14 86 22 64 L30 30 Q34 16 48 18 Q60 20 58 32 Q56 40 46 42 L40 70 Q36 96 26 112 L0 118Z"'),
  CR('circle','cx="18" cy="96" r="5"'),CR('circle','cx="30" cy="74" r="4.6"'),CR('circle','cx="36" cy="50" r="4.4"'),CR('circle','cx="12" cy="108" r="4.4"'),CR('circle','cx="26" cy="92" r="3.6"'),
  CR('path','d="M54 156 Q48 116 82 110 Q116 106 124 130 Q128 156 110 158 L104 158 V146 H90 V158 H70 V146 H58 V158Z"'),
  CR('path','d="M98 118 Q112 104 120 118 Q122 134 106 136 Q96 132 98 118Z"'),
  CR('path','d="M116 114 Q128 110 129 94 Q130 86 125 81 L131 77 Q139 85 137 97 Q134 116 118 124Z"'),
  CR('path','d="M127 77 Q114 60 118 44 Q124 60 132 74Z"'),CR('path','d="M132 74 Q132 56 144 46 Q140 62 136 76Z"'),
  CR('path','d="M152 180 Q140 176 142 160 Q144 146 158 144 Q172 144 174 160 Q176 178 162 182Z"'),
  CR('path','d="M146 146 Q142 128 158 124 Q174 126 172 146 Q166 154 158 154 Q150 154 146 146Z"'),
  CR('path','d="M150 140 Q152 148 158 150 Q164 148 166 140 Q160 144 158 144 Q156 144 150 140Z"'),
  CR('path','d="M146 132 L144 120 L154 126Z"'),CR('path','d="M170 132 L172 120 L162 126Z"'),
  CR('path','d="M172 182 Q190 180 192 168 L180 166 Q178 174 168 176Z"'),CR('path','d="M180 166 L192 168 Q194 156 188 150 L178 156Z"'),CR('path','d="M178 156 L188 150 Q184 142 176 142 L172 150Z"'),
  CR('path','d="M172 150 L176 142 Q166 138 160 146 L164 152Z"'),CR('path','d="M164 152 L160 146 Q150 150 150 160 L158 162Z"'),CR('path','d="M158 162 L150 160 Q150 170 156 174 L162 168Z"')],
  deco:()=>`${dot(46,28,2.4)}${dot(108,124,2.4)}${dot(154,136,2.2)}${dot(162,136,2.2)}${dl('M152 138 Q151 142 153 145 M164 138 Q165 142 163 145',1.6)}${dl('M156 146 Q158 148 160 146',1.6)}`
   +dl('M129 98 h5 M130 104 h5 M128 110 h5',1.6)+dl('M86 158 V146',1.6)
   +dl('M150 38 H159 M150 66 H159 M150 98 H159 M150 128 H159',2)},
 {n:'畫框',cat:'adv',lv:1,scene:'美術館的小畫家（第 45 章）',r:[
  CR('rect','x="0" y="0" width="200" height="200"'),
  CR('rect','x="0" y="174" width="200" height="26"'),
  CR('path','d="M22 18 Q34 10 46 18 Q58 10 70 18 Q82 10 94 18 Q106 10 118 18 Q130 10 142 18 Q154 10 166 18 V136 Q154 144 142 136 Q130 144 118 136 Q106 144 94 136 Q82 144 70 136 Q58 144 46 136 Q34 144 22 136Z"'),
  CR('rect','x="36" y="30" width="116" height="94" rx="3"'),
  CR('rect','x="44" y="38" width="100" height="78"'),
  CR('circle','cx="22" cy="18" r="9"'),CR('circle','cx="166" cy="18" r="9"'),CR('circle','cx="22" cy="136" r="9"'),CR('circle','cx="166" cy="136" r="9"'),
  CR('path','d="M44 102 Q80 92 110 98 Q130 94 144 100 V116 H44Z"'),
  CR('circle','cx="124" cy="56" r="11"'),
  CR('rect','x="56" y="74" width="30" height="26"'),CR('path','d="M52 76 L71 58 L90 76Z"'),CR('rect','x="65" y="86" width="10" height="14"'),
  CR('path','d="M112 74 Q100 74 100 64 Q100 54 112 54 Q124 54 124 64 Q124 74 112 74Z"'),CR('rect','x="109" y="74" width="6" height="22"'),
  CR('circle','cx="96" cy="98" r="5"'),CR('circle','cx="132" cy="96" r="5"'),
  CR('rect','x="78" y="150" width="34" height="14" rx="2"'),
  CR('path','d="M150 174 Q146 154 156 144 Q152 132 166 129 Q182 128 182 142 Q186 156 178 166 Q192 166 192 177 Q192 188 182 187 Q174 186 176 178 Q180 176 182 179 Q184 174 178 172 L174 174Z"'),
  CR('circle','cx="167" cy="141" r="6.4"'),
  CR('path','d="M154 132 Q151 118 168 116 Q184 116 183 128 Q176 131 154 132Z"'),
  CR('path','d="M132 166 Q130 152 144 150 Q156 150 156 160 Q156 166 150 166 Q146 166 146 170 Q146 174 140 174 Q132 174 132 166Z"')],
  deco:()=>`${dot(168,141,2.6)}${dl('M158 152 Q165 156 172 152',2)}${dot(140,158,2.2)}${dot(148,156,2.2)}${dot(146,164,1.8)}`
   +[[44,30,52,22],[144,30,136,22],[44,124,52,132],[144,124,136,132]].map(([a,b,c,d])=>dl(`M${a} ${b} L${c} ${d}`,1.6)).join('')
   +dl('M94 24 Q100 20 106 24 M94 130 Q100 134 106 130',1.6)+dl('M71 66 V70',1.6)+dl('M96 103 V112 M132 101 V112',1.6)
   +[0,60,120,180,240,300].map(a=>dl('M124 41 V37',2.2).replace('<path',`<path transform="rotate(${a} 124 56)"`)).join('')}];

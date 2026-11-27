# 從 mods/m8sg_bike8.js（/*LINES*/…/*END*/）和 mods/m9zl_g23items.js（const T）產生 lines/b23.tsv、lines/g23.tsv（2026-11-28 星光工作室）
import re,json
SK={'B23_go','B23_left','B23_right','B23_ring','B23_got'}   # 只是按鈕／字卡上的字，不念
s=open('mods/m8sg_bike8.js',encoding='utf-8').read()
blk=s[s.index('/*LINES*/'):s.index('/*END*/')]
T=dict(re.findall(r'"(B23_\w+)":"([^"]+)"',blk))
b=[(k,v) for k,v in T.items() if k not in SK]
open('lines/b23.tsv','w',encoding='utf-8').write(''.join(f'{k}\t{v}\n' for k,v in b))
g=[('G23_c_fire','塗色本多了消防車，快來塗顏色！'),('G23_c_bear','塗色本多了黑熊警察，快來塗顏色！'),('G23_c_pool','塗色本多了游泳池，快來塗顏色！'),('G23_c_bike','塗色本多了腳踏車，快來塗顏色！')]
t=open('mods/m9zl_g23items.js',encoding='utf-8').read()
m=re.search(r"const T=\{(.*?)\};",t,re.S).group(1)
for k,v in re.findall(r"(\w+):'([^']+)'",m):g.append(('G23_'+k,v))
# 禮物核心（m9zd）會念「名稱！」和「放進○○了！」：新的 15 樣＋3 樣備用擺飾的名稱、4 個新遊戲
k=open('mods/m9zk_g23data.js',encoding='utf-8').read()
for i,n in re.findall(r"\{id:'(\w+)',\s*(?:ch:\d+,lv:\d+,)?game:'\w+',\s*name:'([^']+)'\}",k):g.append(('G23_n_'+i,n+'！'))
for gm,n in [('fossil','挖化石'),('vine','雨林盪藤蔓'),('craft','手作小工坊'),('bike','腳踏車小路')]:g.append(('G23_into_'+gm,f'放進{n}了！'))
open('lines/g23.tsv','w',encoding='utf-8').write(''.join(f'{k}\t{v}\n' for k,v in g))
json.dump({'B23_wrS':'還沒到喔！直直騎，<sub alias="署">數</sub>一<sub alias="署">數</sub>路口。'},open('lines/b23_ssml.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
json.dump({'G23_n_cr_frame':'手作<sub alias="像">相</sub>框！'},open('lines/g23_ssml.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
# 檢查：每一句在程式裡都找得到
for k,v in b:assert v in s,(k,v)
for kk,v in g:assert v in t or '塗色本多了' in v or kk.startswith(('G23_n_','G23_into_')),(kk,v)
# 已經有錄音的句子（不用再錄）
try:
  d=json.load(open('/home/claude/w/s7/voice/index-2fc8cdbe.json'))['clips']
  print('已有錄音：',[v for k,v in b+g if 'z|'+v in d])
except Exception as e:print(e)
print('b23',len(b),'g23',len(g))

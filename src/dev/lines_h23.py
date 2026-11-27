# 從 mods/m9zj_home23.js 的台詞表產生 lines/h23.tsv（H23_）＋ lines/h23_ssml.json（破音字）—— 2026-11-28 星光工作室 Starlight Studio
import re,json,pathlib
H=pathlib.Path(__file__).resolve().parent.parent
s=open(H/'mods/m9zj_home23.js',encoding='utf-8').read()
blk=s[s.index('/*H23LINES*/'):s.index('/*H23END*/')]
pairs=re.findall(r'"([a-z0-9_]+)":"([^"]+)"',blk)
ids=[k for k,_ in pairs];assert len(ids)==len(set(ids)),'重複的 key'
open(H/'lines/h23.tsv','w',encoding='utf-8').write(''.join(f'H23_{k}\t{t}\n' for k,t in pairs))
# 破音字：倒貼（ㄉㄠˋ）→到、轉（ㄓㄨㄢˋ 轉圈）→賺、相框（ㄒㄧㄤˋ）→像、差一點（ㄔㄚˋ）→岔
SUB=[('倒貼','<sub alias="到">倒</sub>貼'),('轉呀轉','<sub alias="賺">轉</sub>呀<sub alias="賺">轉</sub>'),('相框','<sub alias="像">相</sub>框'),('差一點','<sub alias="岔">差</sub>一點')]
ss={}
for k,t in pairs:
    u=t
    for a,b in SUB:u=u.replace(a,b)
    if u!=t:ss['H23_'+k]=u
json.dump(ss,open(H/'lines/h23_ssml.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(pairs),'句；ssml',len(ss),'句')

# 組出 mods/m9zi_park23.js、lines/p23.tsv（2026-11-28 星光工作室 Starlight Studio，著作權與 IP 屬於星光工作室）
# 用法：python3 dev/mk_park23.py
import glob,os,re,json
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
parts=sorted(glob.glob(os.path.join(H,'dev/p23src/*.js')))
body=''.join(open(p,encoding='utf-8').read()+'\n' for p in parts)
assert '</script' not in body
head='''/* ================= 2.3 小遊戲重做：挖化石、雨林盪藤蔓（m9zi_park23.js）—— 2026-11-28 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 由 dev/mk_park23.py 從 dev/p23src/*.js 組出來，不要直接改這個檔。說明見 dev/park23.md。
 * 挖化石 fossil26：挖掘地（恐龍谷、森林山坡、海邊的化石場＝禮物 fs_beach）、每次隨機的恐龍（9 種，三角龍＝禮物 fs_tri）、小鏟子＋刷子、
 *   拼回去、數一數（照舊）、幫恐龍塗顏色（點一點塗／手指畫）、我的恐龍博物館；房間的小化石展示架。
 * 雨林盪藤蔓 vine6：照順序接香蕉（照舊）；路線每次不同、第 3、6 根後岔路自己選；動物朋友（雨林貼紙簿，小樹蛙＝禮物 vn_frog）；
 *   撿花和葉子佈置小樹屋；終點小樹屋或大瀑布（禮物 vn_falls）。不倒數、不會掉下去、沒有失敗。
 * 存檔：V2.p23（每個小朋友一份）；沒有這個欄位＝舊存檔，照常玩。台詞：lines/p23.tsv（P23_），沒錄音時只出字幕。
 * 動畫只用移動、旋轉（轉圈虛線框）、淡入、亮光；角色不放大縮小。prefers-reduced-motion／body.lite 停掉。 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
'''
tail='''}catch(e){console.log('m9zi_park23',e)}}).toString()+')()')})();
'''
open(os.path.join(H,'mods/m9zi_park23.js'),'w',encoding='utf-8').write(head+body+tail)
m=re.search(r'/\*P23LINES\*/\s*const TP=\{(.*?)\};\s*/\*END\*/',body,re.S)
d=json.loads('{'+m.group(1).strip().rstrip(',')+'}')
seen=set();rows=[]
# 只在畫面上當按鈕／標題的字（不念）不放進台詞表
UI={'t_shovel','t_brush','c_go','c_skip','c_tap','c_draw','c_clear','c_done','m_title','m_new','m_paint','m_close','m_btn','e_again','e_site','e_out',
 'v_to','v_sum','v_ban','v_friends','v_flowers','v_none','v_deco','v_book','v_house','b_title','h_title','h_done','v_sticker'}
for k,v in d.items():
    if k in UI or k.startswith(('nm_','it_','n_')): continue
    if v in seen: continue
    seen.add(v);rows.append(('P23_'+k,v))
open(os.path.join(H,'lines/p23.tsv'),'w',encoding='utf-8').write(''.join(f'{a}\t{b}\n' for a,b in rows))
# 破音字（念法提示）：lines/p23_ssml.json
SUB=lambda a,c:f'<sub alias="{a}">{c}</sub>'
def ssml(v):
    w=v
    w=w.replace('數一數',SUB('署','數')+'一'+SUB('署','數'))
    w=w.replace('長',SUB('常','長'))                 # 長長的、長脖子、很長（ㄔㄤˊ）
    if '重新' in w or w=='重來': w=w.replace('重',SUB('蟲','重'))
    w=w.replace('倒掛',SUB('到','倒')+'掛')          # ㄉㄠˋ
    w=w.replace('轉來轉去',SUB('賺','轉')+'來'+SUB('賺','轉')+'去')  # ㄓㄨㄢˋ
    return w
sm={a:ssml(b) for a,b in rows if ssml(b)!=b}
json.dump(sm,open(os.path.join(H,'lines/p23_ssml.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('mod',len(head+body+tail),'lines',len(rows),'ssml',len(sm))

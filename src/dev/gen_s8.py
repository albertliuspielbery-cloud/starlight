# -*- coding: utf-8 -*-
# 第八季資料 → mods/m8sa_s8data.js（照 gen_s7.py：資料一律從 s8_data.py 來，JS 檔不要手改）
# 2026-11-28　星光工作室 Starlight Studio　著作權與 IP 屬於星光工作室
# 用法：python3 dev/gen_s8.py
import json, os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, H)
import s8_data as d

OUT = os.path.join(os.path.dirname(H), 'mods', 'm8sa_s8data.js')
HEAD = '''/* ================= 2.3 第八季「星光安全小隊」第四十六～五十章：資料（dev/gen_s8.py 從 dev/s8_data.py 產生，不要手改） =================
   2026-11-28　星光工作室 Starlight Studio　｜　故事、角色（消防隊的斑斑、黑熊警察、救生員浪浪、橘貓小橘）、台詞、題目都是星光工作室原創，著作權與 IP 屬於星光工作室。
   內容：S8D（各章，結構同 S7D）、S8Q（安全三選一：[tag, 題目, [圖, 正解], [[圖,錯],[圖,錯]], 說明]，S8D[c].q0 起算）、S8FIN（季完結、獎狀）、S8QTAG、S8PT（自由練習）、
   S8FB（題型還沒有時的備用）、S8HANDS（動手題的題型）、S8TH（破關小劇場點綴）、S8BOOKS（故事屋新書）、S8DEX、S8FRIENDS、SEG8（App 購買介紹）、S8PARENT（給爸爸媽媽）、S8SEG（拆段故事的預算結果）。
   關卡表：dev/levels8.md。 */
'''


LV_HEAD = """# 第八季關卡表（第 46～50 章）—— A 寫，C1／C2 看這份實作參數

2026-11-28　星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）　{ver}

- 這份由 dev/gen_s8.py 從 dev/s8_data.py 產生（資料是正本）。有改會更新最上面的版次。
- 第 1～9 關每關 3 題：一題安全（quiz／okno8／danger8／phone8 輪流）、一題寫字（write／R）、一題學習動手題；同一章相鄰兩關不用同一種動手題。
- 第 10 關只放 `quest8:<章>`（照 C2 說明：章末關卡 base 不會再插加題、複習題，整關就是大冒險）。
- 題型還沒在 A 的複本時，m8sc 出題那一刻換成備用題型（S8FB），整合後自動用真的。
- 參數照 C1 的 types8_learn.md、C2 的 types8_safe.md：wheel8:<台數>、deep8:order／safe、money8:100|100（認識 100 元鈔票）、clock8:3:30（整點半點，不算經過時間）、pin8:ㄊㄚ|ㄌㄚ（從裡面抽一個）。
- 安全三選一的 tag：46 `消防局`、47 `派出所`、48 `游泳池`、49 `騎車`、50 `居家安全`（題庫在 s8_data.py 的 Q）。
"""
def levels_md(ver):
    o = [LV_HEAD.format(ver=ver)]
    for c in d.CH:
        D = d.S8D[c]
        o.append(f"\n## 第 {c} 章　{D['name']}（場景 {D['bg']}，幫手 {D['helper0']}）\n| 關 | 名稱 | 幫手 | 題目 |\n|---|---|---|---|\n")
        for i, L in enumerate(D['levels']):
            o.append(f"| {i+1} | {L[0]} | {L[1]} | {', '.join(L[3])} |\n")
    used = {}
    for c in d.CH:
        for L in d.S8D[c]['levels']:
            for q in L[3]:
                t = q.split(':')[0]
                if t in d.FALLBACK: used.setdefault(t, []).append(q)
    o.append('\n## 用到的參數（給 C1、C2 對照）\n')
    for t, L in used.items():
        o.append(f"- `{t}`：{'、'.join(sorted(set(L), key=L.index))}\n")
    return ''.join(o)

def main():
    parts = [HEAD, '(function(){\n']
    names = []
    for name, val in d.consts():
        parts.append(f'const {name}={json.dumps(val, ensure_ascii=False, separators=(",", ":"))};\n'); names.append(name)
    parts.append('window.__s8data={' + ','.join(names) + '};window.S8FIN=S8FIN;\n})();\n')
    js = ''.join(parts)
    open(OUT, 'w', encoding='utf-8').write(js)
    r = subprocess.run(['node', '-e', f"global.window={{}};require('vm').runInThisContext(require('fs').readFileSync({json.dumps(OUT)},'utf8'));const D=window.__s8data;console.log('S8D',Object.keys(D.S8D).length,'S8Q',D.S8Q.length)"], capture_output=True, text=True, timeout=30)
    print(r.stdout.strip() or r.stderr.strip()[:400])
    print('寫好', OUT, len(js.encode('utf-8')), 'bytes')
    import datetime
    md = os.path.join(H, 'levels8.md'); open(md, 'w', encoding='utf-8').write(levels_md('第 3 版（' + datetime.datetime.now().strftime('%H:%M') + '）'))
    print('寫好', md)

if __name__ == '__main__':
    main()

# -*- coding: utf-8 -*-
# 第七季資料 → mods/m7a_s7data.js（照 S6D 的產生方式：資料一律從 s7_data.py 來，JS 檔不要手改）
# 2026-11-22　星光工作室 Starlight Studio　著作權與 IP 屬於星光工作室
# 用法：python3 /home/claude/w/s7/dev/gen_s7.py
import json, os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, H)
import s7_data as d

OUT = os.path.join(os.path.dirname(H), 'mods', 'm7a_s7data.js')
HEAD = '''/* ================= v5.4 第七季「星光城市小旅行」第四十一～四十五章：資料（s7/dev/gen_s7.py 從 s7_data.py 產生，不要手改） =================
   2026-11-22　星光工作室 Starlight Studio　｜　故事、角色（站務員嚕嚕、館員書書、小書蟲翻翻、河馬醫生波波、小鱷魚牙醫咔咔、保育員阿森、小貓熊環環、孔雀館長羽羽、變色龍小畫家變變）、台詞、題目、地圖都是星光工作室原創，著作權與 IP 屬於星光工作室。
   內容：S7D（各章，結構同 S6D；多 learnLow＝這章學的小寫）、S7Q（100 題：[tag, 題目, [圖, 正解], [[圖,錯],[圖,錯]], 說明]，第 41～45 章各 20 題，S7D[c].q0 起算）、
   S7FIN（季完結、獎狀）、S7HEAR／S7LIKE／S7SEE（注音詞卡、易混、第 44 章看整個詞）、S7QTAG、S7PT（自由練習）、S7GRID（方格地圖與題目）、S7NQ（其他新題型的句子和範圍）、
   S7TH（破關小劇場點綴）、S7BOOKS（故事屋新書）、S7DEX（圖鑑）、S7FRIENDS、SEG7（App 購買介紹）、S7PARENT（給爸爸媽媽）、S7SEG（拆段故事的預算結果，給對照用）。
   新題型規格：s7/dev/spec_newq.md。 */
'''

def main():
    parts = [HEAD]
    for name, val in d.consts():
        parts.append(f'const {name}={json.dumps(val, ensure_ascii=False, separators=(",", ":"))};\n')
    parts.append('window.__s7data={S7D,S7Q,S7FIN,S7HEAR,S7LIKE,S7SEE,S7QTAG,S7PT,S7GRID,S7NQ,S7TH,S7BOOKS,S7DEX,S7FRIENDS,SEG7,S7PARENT,S7SEG};\n')
    js = ''.join(parts)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, 'w', encoding='utf-8').write(js)
    # 語法檢查（有 node 就跑）
    try:
        r = subprocess.run(['node', '-e', f"global.window={{}};require('vm').runInThisContext(require('fs').readFileSync({json.dumps(OUT)},'utf8'));console.log('S7D',Object.keys(window.__s7data.S7D).length,'S7Q',window.__s7data.S7Q.length)"], capture_output=True, text=True, timeout=30)
        print(r.stdout.strip() or r.stderr.strip()[:400])
    except Exception as e:
        print('node 檢查略過', e)
    print('寫好', OUT, len(js.encode('utf-8')), 'bytes')

if __name__ == '__main__':
    main()

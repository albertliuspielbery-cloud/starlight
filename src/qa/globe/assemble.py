# 地球儀模組組裝：src.js ＋ art.js ＋ geo.json → mods/m8_globe.js；LINES → lines/globe.tsv（只列還沒錄音的句子）
# 2026-11-22 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室）
# 用法：python3 /home/claude/w/s7/qa/globe/assemble.py
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent
S7 = H.parent.parent
src = (H / 'src.js').read_text(encoding='utf-8')
art = (H / 'art.js').read_text(encoding='utf-8')
geo = json.loads((H / 'geo.json').read_text(encoding='utf-8'))
geo.pop('stat', None)
g = json.dumps(geo, ensure_ascii=False, separators=(',', ':'))
assert src.count('/*ART*/') == 1 and src.count('/*GEO*/null/*GEOEND*/') == 1
out = src.replace('/*ART*/', art).replace('/*GEO*/null/*GEOEND*/', '/*GEO*/' + g + '/*GEOEND*/')
(S7 / 'mods' / 'm8_globe.js').write_text(out, encoding='utf-8')
# 台詞
m = re.search(r'/\*LINES\*/\s*const T=(\{.*?\});\s*/\*END\*/', src, re.S)
T = json.loads(m.group(1))
vi = json.load(open('/home/claude/w/s7/out/web/voice/'+json.load(open('/home/claude/w/s7/cfg.json'))['voice_index'], encoding='utf-8'))['clips']
def rec(t):
    t = t.strip()
    return ('z|' + t) in vi or ('z|' + re.sub(r'[，、,]+$', '', t)) in vi
rows, reuse, done = [], [], set()
for k, t in T.items():
    if t in done:
        continue
    done.add(t)
    if rec(t):
        reuse.append(t); continue
    # 破音字、「角」照規則（這批沒有）
    rows.append(f'GL8_{k}\tzh-TW-HsiaoChenNeural\t{t}')
(S7 / 'lines').mkdir(exist_ok=True)
(S7 / 'lines' / 'globe.tsv').write_text('\n'.join(rows) + '\n', encoding='utf-8')
print('module', len(out.encode('utf-8')), 'bytes; geo', len(g.encode('utf-8')), 'bytes')
print('lines new', len(rows), 'reused', len(reuse), reuse)

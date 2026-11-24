# 彙整 voice/*.json（測試時念的句子）：沒錄音的句子、裝置語音、探測沒找到的 key、睡覺句用哪個 pack
import json,glob,collections,sys
idx=json.load(open('/home/claude/w/s7/voice/'+json.load(open('/home/claude/w/s7/cfg.json'))['voice_index']))
C=idx['clips'];F=idx['files']
norec=collections.defaultdict(set);tts=collections.defaultdict(set);probe=collections.Counter();sleep={};said=0
for f in sorted((sorted(glob.glob('/home/claude/w/s7/qa/final/voice/app_*.json'))+sorted(glob.glob('/home/claude/w/s7/qa/final2/voice/*.json')))):
    d=json.load(open(f));n=f.split('/')[-1]
    for x in d['said']:
        said+=1
        if not x['ok']:norec[x['t']].add(n+'@'+x['w'])
        for k in x.get('ks',[]):
            if '睡覺' in k or '午覺' in k:sleep[k]=F[C[k][0]] if k in C else 'NOT IN INDEX'
    for x in d['tts']:
        if '包未載完' not in x['w']:tts[x['t']].add(n+'@'+x['w'])
    for k,v in d['probe'].items():
        if k.startswith(('z|','e1|','pz|','dz|')) and v['w'].split('/')[0] in ('stage','globe8','photo8','chend','map','story19','cbook','finale','world','park'):probe[(k,v['w'].split('/')[0])]+=v['n']
print('檔案',len((sorted(glob.glob('/home/claude/w/s7/qa/final/voice/app_*.json'))+sorted(glob.glob('/home/claude/w/s7/qa/final2/voice/*.json')))),'念的句子',said,'索引',json.load(open('/home/claude/w/s7/cfg.json'))['voice_index'])
print('== 沒錄音（遊戲有要念、但索引裡沒有）',len(norec))
for t,w in sorted(norec.items()):print('  ',t[:70],'|',sorted(w)[:2])
print('== 用到裝置語音（不含語音包還沒下載完）',len(tts))
for t,w in tts.items():print('  ',t[:60],'|',sorted(w)[:2])
print('== 睡覺／午覺 句子用到的 pack');[print('  ',k,v) for k,v in sorted(sleep.items())]
print('== 有查但索引沒有的 key（含 voResolve 先試整句的正常情況，只列遊樂園）')
for (k,s),n in probe.most_common():
    if s in ('globe8','photo8','cbook'):print('  ',s,k[:70],n)

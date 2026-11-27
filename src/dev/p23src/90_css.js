// 房間畫面被重畫（換佈置、別的 mod 重畫背景）時，展示架不見了就補回來
{let t=0;const mo=new MutationObserver(()=>{if(t)return;t=setTimeout(()=>{t=0;try{if(S.screen==='room'&&ST()&&Object.keys(ST().fm).length&&!document.querySelector('#screen .p23shelf'))addShelf()}catch(e){}},250)});
 const sc=document.getElementById('screen');if(sc)mo.observe(sc,{childList:true,subtree:true})}
const css=document.createElement('style');css.id='p23css';css.textContent=`
/* ---- 挖化石 ---- */
.p23f .f26side{gap:8px}
.p23tools{display:flex;gap:8px;flex:0 0 auto}
.p23tool{flex:1 1 0;min-width:0;min-height:60px;border-radius:16px;border:3px solid rgba(255,217,138,.35);background:rgba(40,24,18,.5);color:#fff;font:inherit;font-size:16px;display:flex;align-items:center;justify-content:center;gap:4px;padding:2px 6px;cursor:pointer}
.p23tool svg{width:40px;height:40px;flex:none}.p23tool span{white-space:nowrap}
.p23tool.sel{border-color:#FFD24D;background:rgba(255,210,77,.28);box-shadow:0 0 12px rgba(255,210,77,.45)}
.p23tool.want{animation:p23want 1s ease-in-out 3}
@keyframes p23want{50%{box-shadow:0 0 22px #FFE27A;border-color:#FFE27A}}
.p23f .f26board canvas.shov{cursor:pointer}
.p23sites{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.p23sites .f26mp{height:58px!important}
.p23mrow{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:4px}
.p23mrow .r26go{margin-top:0}
.p23mbtn{min-height:60px;display:inline-flex;align-items:center;gap:6px;padding:4px 16px 4px 8px;font-size:20px}
.p23mbtn svg{width:42px;height:42px}
.p23gold{background:linear-gradient(180deg,#FFE27A,#FFB81C)!important;color:#5A3A0A!important;min-height:60px;font-size:22px}
.p23cgo{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:6px}
.p23cgo .btn2.small{min-height:48px}
/* ---- 遮罩卡片（塗色、博物館、貼紙簿、小樹屋） ---- */
.overlay.p23ov{z-index:40}
.p23ov .card{max-width:min(860px,calc(100vw - 20px));max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px);box-sizing:border-box;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 16px}
.p23ov .card h2{margin:0;font-size:24px}
.p23ov .card .row{justify-content:center;flex-wrap:wrap;gap:12px}
.p23ov .card .row>:is(.btn,.btn2){min-height:56px;min-width:7em}
.p23paint .p23pbody{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%}
.p23pv{position:relative;width:min(100%,620px);aspect-ratio:600/340;border-radius:18px;background:#FFF9EE;box-shadow:inset 0 0 0 3px #F0E2C8;flex:none}
.p23pv svg,.p23pv canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.p23pv svg{touch-action:none}.p23pv .p23reg{cursor:pointer}
.p23pv canvas{pointer-events:none;touch-action:none}.p23pv canvas.on{pointer-events:auto}
.p23pside{display:flex;flex-direction:column;align-items:center;gap:8px}
.p23pal{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.p23pal button{width:48px;height:48px;border-radius:50%;border:4px solid #fff;background:var(--c);box-shadow:0 2px 6px rgba(40,20,80,.25);cursor:pointer;padding:0}
.p23pal button.sel{border-color:#FFD24D;box-shadow:0 0 0 3px #7A5CE0,0 0 12px rgba(255,210,77,.6)}
.p23pm{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.p23mode{min-height:48px;padding:4px 14px;border-radius:14px;border:3px solid #E6DAF8;background:#FBF8FF;color:#3A2A55;font:inherit;font-size:17px;cursor:pointer}
.p23mode.sel{border-color:#FFD24D;background:#FFF4C8}
.p23mh{display:flex;align-items:center;gap:10px;align-self:stretch;justify-content:center}.p23mh small{font-size:16px;display:block}
.p23mi{width:52px;height:52px;flex:none}.p23mi svg{width:100%;height:100%}
.p23mg,.p23bg{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;width:100%}
.p23ms,.p23bs{position:relative;min-height:96px;border-radius:16px;border:3px solid #EEE6F8;background:#FBF8FF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px;font:inherit;color:#3A2A55;cursor:pointer}
.p23ms b,.p23bs b{font-size:17px;font-weight:400}
.p23ms.got{background:#FFF9EE;border-color:#F0D8A8}.p23ms.hl{border-color:#FFD24D;box-shadow:0 0 14px rgba(255,210,77,.7)}
.p23mp{display:block;width:100%;height:70px}.p23mp svg{width:100%;height:100%}
.p23new{position:absolute;right:6px;top:4px;font-style:normal;font-size:14px;background:#FF7FB8;color:#fff;border-radius:999px;padding:0 8px}
.p23md{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%}.p23md[hidden],.p23mg[hidden]{display:none}
.p23mbig{width:min(100%,520px)}.p23mbig svg{width:100%;height:auto;display:block}
.p23md h3{margin:0;font-size:24px}.p23md p{margin:0;font-size:18px;text-align:center}
.p23mdb{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.p23mdb .btn2{min-height:48px}
.p23end .f26pic svg{max-height:30vh}
.p23ms.shake,.p23bs.shake{animation:p23sh .4s}
@keyframes p23sh{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
/* ---- 雨林盪藤蔓 ---- */
.p23v .vn6vines{pointer-events:none}
.p23zd{opacity:1;transition:opacity .6s}.p23zd.in{animation:p23fade .7s}
@keyframes p23fade{from{opacity:0}to{opacity:1}}
.p23gr{position:absolute;inset:0;z-index:3;pointer-events:none}
.p23fr{position:absolute;top:62%;width:clamp(76px,17vmin,128px);height:clamp(76px,17vmin,128px);margin-left:calc(clamp(76px,17vmin,128px)/-2);border:0;background:none;padding:0;cursor:pointer;pointer-events:auto;filter:drop-shadow(0 0 8px rgba(255,255,255,.75))}
.p23fr svg{width:100%;height:100%;display:block}
.p23fr:not(.met):not(.end)::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:3px dashed rgba(255,255,255,.85);animation:p23ring 2.4s linear infinite}
@keyframes p23ring{to{transform:rotate(360deg)}}
.p23fr.met{animation:p23hop .7s ease-out 1}.p23fr.met svg{filter:drop-shadow(0 0 10px #FFE27A)}
@keyframes p23hop{30%{transform:translateY(-16px)}60%{transform:translateY(0)}80%{transform:translateY(-6px)}}
.p23fr.end{top:66%;pointer-events:none;width:clamp(64px,14vmin,104px);height:clamp(64px,14vmin,104px);margin-left:calc(clamp(64px,14vmin,104px)/-2);animation:p23hop 1.2s ease-in-out infinite}
.p23it{position:absolute;top:84%;width:56px;height:56px;margin-left:-28px;border:0;padding:4px;border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 12px rgba(255,255,255,.8);cursor:pointer;pointer-events:auto;transition:transform .6s,opacity .6s}
.p23it svg{width:100%;height:100%;display:block}
.p23it.got{transform:translateY(-60px);opacity:0;pointer-events:none}
.p23lab.st{top:56%;background:#FFF4C8;color:#6A3A1A;border:2px solid #FFD24D}
.p23lab{position:absolute;top:76%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:#3A6A2A;border-radius:12px;padding:2px 10px;font-size:16px;white-space:nowrap;pointer-events:none}
.p23fork{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;gap:4%;background:rgba(20,40,20,.25)}
.p23fork[hidden]{display:none}
.p23sign{width:min(40%,280px);border:4px solid #FFD24D;border-radius:22px;background:linear-gradient(180deg,#B8865A,#8A5A36);color:#fff;font:inherit;padding:8px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;box-shadow:0 6px 0 rgba(60,30,10,.35);position:relative}
.p23sign .p23sp{display:block;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden}.p23sign .p23sp svg{width:100%;height:100%;display:block}
.p23sign b{font-size:22px;font-weight:400}
.p23arw{position:absolute;top:-18px;font-style:normal;width:40px;height:40px;border-radius:50%;background:#FFD24D;color:#6A3A1A;display:grid;place-items:center;font-size:24px}.p23sign.l .p23arw{left:-12px}.p23sign.r .p23arw{right:-12px}
.p23hud{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;padding:2px 8px 6px}
.p23hud .vn6got{padding:0;flex-wrap:nowrap}
@media (max-width:420px){.p23hud .vn6got{gap:3px}.p23hud .vn6got i{min-width:28px;height:28px;font-size:14px;border-radius:8px}.p23cc{font-size:15px;min-height:30px}.p23cc svg{width:24px;height:24px}}
.p23cnt{display:flex;gap:8px}
.p23cc{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.7);border-radius:999px;padding:2px 10px 2px 4px;color:#3A2A55;font-size:17px;min-height:34px}
.p23cc svg{width:28px;height:28px}
.vn6mk.happy{animation:p23hop 1s ease-in-out infinite}
.p23dopt .p23dp{display:block;width:44px;height:44px}.p23dopt .p23dp svg{width:100%;height:100%}
.p23gorow{display:flex;flex-direction:column;align-items:center}
.p23vbtn,.p23vb2{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px}
.p23vbtn .btn2,.p23vb2 .btn2{min-height:52px;display:inline-flex;align-items:center;gap:6px;padding:2px 14px 2px 6px;font-size:18px}
.p23vbtn svg,.p23vb2 svg{width:38px;height:38px}
.p23vend .p23sum{display:flex;flex-direction:column;gap:6px;width:100%}
.p23sr{display:flex;align-items:center;gap:10px;background:#FBF8FF;border-radius:14px;padding:4px 10px}
.p23sr>b{flex:none;font-weight:400;font-size:17px;min-width:6.5em;color:#5A3EB8}
.p23si{display:flex;flex-wrap:wrap;gap:4px;align-items:center}.p23si i{width:44px;height:44px;display:block}.p23si i svg{width:100%;height:100%}.p23si em{font-style:normal;font-size:22px;color:#3A2A55}.p23si small{font-size:16px;color:#6A5A8A}
.p23bp{display:block;width:84px;height:84px}.p23bp svg{width:100%;height:100%}
.p23bs.got{background:#F0FFF0;border-color:#BFE8B0}.p23bs.met{animation:p23hop .7s ease-out 1}
.p23bt{margin:0;font-size:18px;text-align:center;min-height:1.4em}
.p23hv{width:min(100%,640px)}.p23hv svg{width:100%;height:auto;display:block;border-radius:18px}
.p23hs{cursor:pointer}.p23hs.on circle:last-child{stroke:#FFE27A;animation:p23blink 1.2s ease-in-out infinite}
@keyframes p23blink{50%{opacity:.4}}
.p23bag{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:56px;align-items:center}.p23bag small{font-size:16px}
.p23bi{position:relative;width:60px;height:60px;border-radius:16px;border:3px solid #E6DAF8;background:#FBF8FF;padding:4px;cursor:pointer}
.p23bi svg{width:100%;height:100%}.p23bi b{position:absolute;right:-6px;bottom:-6px;min-width:22px;height:22px;border-radius:11px;background:#5A3EB8;color:#fff;font-size:14px;font-weight:400;line-height:22px}
.p23bi.sel{border-color:#FFD24D;box-shadow:0 0 12px rgba(255,210,77,.7)}
.p23fall{stroke-dasharray:30 18;animation:p23flow 1.2s linear infinite}
@keyframes p23flow{to{stroke-dashoffset:-48}}
/* 其他小遊戲結束卡的小收集 */
.p23col{display:flex;align-items:center;gap:8px;margin:2px auto 6px;max-width:100%;background:rgba(255,255,255,.12);border-radius:16px;padding:3px 12px 3px 4px;box-sizing:border-box}
.p23cn{width:44px;height:44px;flex:none;display:block;border-radius:12px;box-shadow:0 0 0 3px #FFD24D,0 0 12px rgba(255,210,77,.7)}.p23cn svg{width:100%;height:100%;display:block}
.p23cx{display:flex;flex-direction:column;align-items:flex-start;min-width:0;line-height:1.25}
.p23colt{font-size:16px;font-weight:400}
.p23cd{font-size:15px;opacity:.95;display:flex;align-items:center;gap:3px;flex-wrap:wrap}
.p23cd s{display:inline-block;width:9px;height:9px;border-radius:50%;border:2px solid rgba(255,226,122,.75);box-sizing:border-box}.p23cd s.got{background:#FFE27A;border-color:#FFE27A}.p23cd s.new{box-shadow:0 0 6px #FFE27A}
@media (orientation:landscape) and (max-height:500px){.p23col{margin:2px auto}.p23cn{width:36px;height:36px}.p23colt{font-size:15px}}
/* 收銀台結束卡：手機橫放（矮螢幕）原本會超出畫面 → 左邊主角、右邊字和按鈕；還是放不下就可以捲 */
.overlay.p23cash{z-index:40}
@media (orientation:landscape) and (max-height:500px){
 .overlay.p23cash{display:flex;align-items:center;justify-content:center}
 .overlay.p23cash .card{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-auto-rows:min-content;column-gap:18px;row-gap:4px;align-items:center;justify-items:center;align-content:center;
  width:min(720px,100%);max-width:100%;max-height:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 18px!important;box-sizing:border-box;height:auto!important}
 .overlay.p23cash .card>.face.big{grid-column:1;grid-row:1 / span 6;width:clamp(84px,30vh,130px)!important;height:auto!important;margin:0!important;align-self:center}
 .overlay.p23cash .card>.face.big svg{width:100%!important;height:auto!important;display:block}
 .overlay.p23cash .card>:not(.face){grid-column:2;max-width:100%}
 .overlay.p23cash .card h2{font-size:22px;margin:0;text-align:center}
 .overlay.p23cash .card>p{margin:0;font-size:17px;line-height:1.35;text-align:center}
 .overlay.p23cash .card .row{flex-wrap:nowrap!important;gap:10px;margin:2px 0 0}
 .overlay.p23cash .card .row>:is(.btn,.btn2){min-height:52px;min-width:6.5em}
}
/* 房間 */
.p23shelf{cursor:pointer;pointer-events:auto}
.p23shelfb{position:absolute;z-index:4;border:0;background:transparent;padding:0;cursor:pointer}
/* 直放、手機 */
@media (max-width:520px){.p23mg,.p23bg{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.p23ms,.p23bs{min-height:84px;padding:4px}.p23mp{height:52px}.p23bp{width:60px;height:60px}.p23ms b,.p23bs b{font-size:15px}
 .p23pal button{width:44px;height:44px}.p23sign b{font-size:18px}.p23tool{font-size:15px}.p23tool svg{width:34px;height:34px}.p23sr>b{min-width:5em;font-size:15px}.p23si i{width:36px;height:36px}}
@media (orientation:portrait) and (max-height:700px){.p23tool{min-height:52px}.p23tools{gap:6px}}
@media (orientation:landscape) and (max-height:500px){
 .p23ov .card{padding:8px 12px;gap:4px}.p23ov .card h2{font-size:20px}
 .p23paint .p23pbody{flex-direction:row;align-items:center}.p23pv{width:auto;height:min(58vh,260px)}.p23pside{flex:1;min-width:0}.p23pal{gap:6px}.p23pal button{width:44px;height:44px}
 .p23mg,.p23bg{grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px}.p23ms,.p23bs{min-height:76px;padding:2px}.p23mp{height:46px}.p23bp{width:52px;height:52px}
 .p23mbig{width:auto}.p23mbig svg{height:30vh;width:auto;aspect-ratio:600/340;margin:0 auto}.p23hv{width:auto;display:flex;justify-content:center}.p23hv svg{height:33vh;width:auto;aspect-ratio:800/500;margin:0 auto}
 .p23house{gap:2px!important}.p23house .row>.btn{min-height:50px}.p23house .p23bt,.p23md p,.p23bt{font-size:15px;min-height:0}.p23bi{width:48px;height:48px}.p23bag{min-height:48px}.p23md h3{font-size:20px}.p23mdb .btn2{min-height:44px}
 .p23v .vn6stage{min-height:0}
 .p23v .p23dopt{flex-direction:row;gap:8px;min-height:50px}.p23v .p23dopt .p23dp{width:34px;height:34px}
 .p23gorow{flex-direction:row;justify-content:center;gap:10px;flex-wrap:wrap}.p23gorow .ch5go{margin:6px 0 0!important}.p23gorow .p23vbtn{margin-top:6px}.p23hud{padding:0 6px 2px}.p23hud .vn6got i{min-width:26px;height:26px;font-size:14px}.p23cc{min-height:28px}
 .p23tool{min-height:48px;font-size:14px}.p23tool svg{width:30px;height:30px}
 .p23vend .p23sum{flex-direction:row;flex-wrap:wrap}.p23sr{flex:1 1 40%}.p23vbtn{margin-top:4px}.p23vbtn .btn2{min-height:46px}
 .p23sites .f26mp{height:40px!important}.p23mbtn{min-height:52px;font-size:18px}.p23mbtn svg{width:34px;height:34px}
 .p23fr{top:56%}.p23it{top:80%;width:48px;height:48px;margin-left:-24px}.p23sign b{font-size:18px}
}
.p23v.calm .p23fr,.p23v.calm .p23it,.p23v.calm .vn6mk{animation:none!important;transition:none}
.p23v.calm .p23fr::after{animation:none}
body.lite :is(.p23fr,.p23fr::after,.vn6mk.happy,.p23fall,.p23hs.on circle,.p23tool.want,.p23zd.in,.p23bs.met){animation:none!important}
@media (prefers-reduced-motion:reduce){:is(.p23fr,.p23fr::after,.vn6mk.happy,.p23fall,.p23hs.on circle,.p23tool.want,.p23zd.in,.p23bs.met,.p23ms.shake){animation:none!important}.p23it{transition:opacity .2s}}
`;document.head.appendChild(css);
window.__P23=Object.assign(window.__P23||{},{ver:'2026-11-28',TP,DINO,DORD,SITES,ANI:AORD,ITEMS:IORD,ART:GART,art:gSvg,sil:gSil,st:ST,openMuseum,openBook,openHouse,openPaint,dinoSVG,aniSVG,itmSVG,ico,treeHouse,bigFalls,zoneDeco,sitePic,shelfArt,addShelf,MORE,moreSVG,moreGive,chooseDino:s=>chooseDino(s)});

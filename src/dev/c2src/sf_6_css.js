/* ---------- 樣式 ---------- */
const st8=document.createElement('style');st8.id='m8sf-css';st8.textContent=`
.d8wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:100%;height:100%;min-height:0}
.d8wrap.land,.d8wrap.side{flex-direction:row;gap:12px}
.d8box{display:flex;align-items:center;justify-content:center;min-height:0}
.d8box.pan{display:block;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;border-radius:18px;box-shadow:0 4px 18px rgba(20,10,60,.35);touch-action:pan-x}.d8box.pan::-webkit-scrollbar{display:none}.d8box.pan .d8svg{max-width:none;border-radius:0;box-shadow:none}
.d8swipe{font-size:15px;font-weight:700;color:#FFE27A;line-height:1.2;text-align:center;transition:opacity .4s}.d8swipe[hidden]{display:none}.d8swipe.seen{opacity:.55}
.d8svg{display:block;border-radius:18px;box-shadow:0 4px 18px rgba(20,10,60,.35);background:#fff;touch-action:manipulation;-webkit-tap-highlight-color:transparent;max-width:100%}
.d8svg .d8hit{cursor:pointer;pointer-events:all}
.d8svg .d8bad .d8g{display:none}.d8svg .d8bad.fixed .d8b{display:none}.d8svg .d8bad.fixed .d8g{display:inline;animation:d8in .45s ease}
.d8svg .d8st{opacity:0;pointer-events:none}.d8svg .d8st.on{opacity:1;animation:d8in .4s ease}
.d8svg .d8ring{opacity:0;pointer-events:none}.d8svg .d8ring.on{animation:d8ring 1.1s ease-in-out 4}
@keyframes d8in{from{opacity:0}to{opacity:1}}
@keyframes d8ring{0%,100%{opacity:0}50%{opacity:1}}
.d8svg .d8smoke{animation:d8drift 5s ease-in-out infinite alternate}
@keyframes d8drift{from{transform:translateX(0)}to{transform:translateX(10px)}}
.d8svg .d8flame{animation:d8flick .8s ease-in-out infinite alternate}
@keyframes d8flick{from{opacity:.85}to{opacity:1}}
.d8bar{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-height:56px;max-width:100%}
.d8wrap.land .d8bar,.d8wrap.side .d8bar{flex-direction:column;width:min(240px,28%);min-height:0}.d8wrap.side .d8slots{flex-wrap:wrap;justify-content:center}
.d8slots{display:flex;gap:6px}
.d8slots i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.18);border:2px dashed rgba(255,255,255,.55);color:#fff;font-style:normal;font-weight:800;font-size:20px;transition:background .3s}
.d8slots i.on{background:#3FCB84;border:2px solid #6FE3A8;box-shadow:0 0 10px rgba(111,227,168,.7)}
.d8why{background:#FFFDF5;color:#4A2A7A;border-radius:14px;padding:6px 12px;font-size:17px;line-height:1.35;max-width:min(560px,100%);box-shadow:0 2px 8px rgba(20,10,60,.25);animation:d8in .3s ease}
.d8wrap.land .d8why{font-size:14px;padding:5px 8px}
@media (max-width:600px){.d8why{font-size:15px}.d8slots i{width:30px;height:30px;font-size:18px}.d8bar{min-height:50px;gap:6px}}
/* 大冒險關：直式手機把題目區放大到舞台底，舞台下方的主角和寵物先藏起來（畫面裡已經有主角和寵物）；寵物說話泡泡會蓋住題目，這時提示只念出來＋發光 */
.stage.q8full #team>*{visibility:hidden}.stage.q8full #petbub{display:none!important}.stage.q8full .play{justify-content:flex-start!important;padding-top:4px}.stage.q8full .q8wrap{justify-content:flex-start}
/* 打電話 */
.p8wrap{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:clamp(10px,2.4vw,26px);width:100%;max-height:100%}
.p8phone{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 14px 14px;border-radius:30px;background:linear-gradient(180deg,#5A4A8A,#3A2E66);box-shadow:0 6px 20px rgba(10,6,40,.45),inset 0 2px 0 rgba(255,255,255,.25)}
.p8scr{width:100%;min-width:200px;border-radius:16px;background:linear-gradient(180deg,#E8F8FF,#C8E8FA);padding:6px 10px;text-align:center;color:#2A3A6A}
.p8note{font-size:16px;font-weight:800;color:#D0406A;line-height:1.25}
.p8num{font:800 34px/1.15 var(--latin,'Baloo 2',sans-serif);letter-spacing:6px;min-height:40px;color:#2A2A5A}
.p8st{font-size:16px;color:#4A5A8A;min-height:20px}.p8st b{font-family:var(--latin,'Baloo 2',sans-serif);font-size:20px;letter-spacing:3px;color:#D0406A}
.p8pad{display:grid;grid-template-columns:repeat(3,auto);gap:8px}
.p8k{--kz:clamp(48px,min(8.4vh,15vw),66px);width:var(--kz);height:var(--kz);border-radius:50%;border:0;background:linear-gradient(180deg,#FFFFFF,#E4E0F4);color:#3A2E66;font:800 calc(var(--kz)*.46)/1 var(--latin,'Baloo 2',sans-serif);box-shadow:0 3px 0 #B8B0D8;cursor:pointer;-webkit-tap-highlight-color:transparent;display:grid;place-items:center;padding:0}
.p8k:active{transform:translateY(2px);box-shadow:0 1px 0 #B8B0D8}
.p8k.p8del{font-size:calc(var(--kz)*.36);color:#8A7AB8}
.p8k.p8call{background:linear-gradient(180deg,#7FE8A8,#3FC878);box-shadow:0 3px 0 #2A9A58}.p8k.p8call svg{width:56%;height:56%}
.p8k.p8call.ready{box-shadow:0 0 0 4px #FFE27A,0 0 18px #FFE27A}
.p8wrap.calling .p8pad{display:none}
.p8talk{display:flex;flex-direction:column;align-items:center;gap:8px;max-width:min(520px,100%)}
.p8talk[hidden]{display:none}
.p8op{display:flex;align-items:center;gap:8px}
.p8opi{width:64px;height:64px;flex:none;display:block}.p8opi svg{width:100%;height:100%;display:block}
.p8ob{background:#FFFDF5;color:#3A2E66;border-radius:16px;padding:8px 14px;font-size:19px;font-weight:700;line-height:1.3;box-shadow:0 2px 8px rgba(20,10,60,.25);min-height:24px}
.p8ob.in{animation:d8in .35s ease}
.p8cards{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.p8c{min-height:56px;min-width:110px;max-width:200px;padding:8px 12px;border-radius:16px;border:3px solid #FFE27A;background:#FFFFFF;color:#4A2A7A;font-size:18px;font-weight:800;line-height:1.25;cursor:pointer;box-shadow:0 3px 0 rgba(20,10,60,.25)}
.p8c{display:flex;flex-direction:column;align-items:center;gap:2px}.p8ci{width:36px;height:36px;display:block}.p8ci svg{width:100%;height:100%;display:block}.p8c.reading,.q8opt.reading{box-shadow:0 0 0 4px #FFE27A,0 0 16px #FFE27A}
.p8c.ok22{border-color:#6FE3A8;box-shadow:0 0 0 3px #6FE3A8,0 0 14px #6FE3A8}
.p8c[disabled]{opacity:.75}
.p8me{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.p8said{background:#6FE3A8;color:#144A30;border-radius:12px;padding:3px 10px;font-size:16px;font-weight:700}
.p8hang{display:flex;align-items:center;gap:6px;min-height:52px;padding:6px 18px;border-radius:30px;border:0;background:linear-gradient(180deg,#FF8A8A,#E04A5A);color:#fff;font-size:18px;font-weight:800;box-shadow:0 3px 0 #A82A3A;cursor:pointer}
.p8hang svg{width:34px;height:34px}.p8hang.ready{box-shadow:0 0 0 4px #FFE27A,0 0 18px #FFE27A}
.p8talk.ended .p8cards{display:none}
@media (max-width:700px) and (orientation:portrait){.p8wrap{flex-direction:column;gap:8px}.p8phone{padding:8px 10px 10px;gap:6px}.p8pad{gap:6px}.p8k{--kz:clamp(44px,min(7vh,15vw),60px)}.p8num{font-size:28px;min-height:32px}.p8scr{min-width:180px;padding:4px 8px}
 .p8c{min-width:88px;font-size:16px;padding:6px 8px}.p8ob{font-size:17px}.p8opi{width:52px;height:52px}}
@media (max-height:700px) and (orientation:portrait){.p8k{--kz:44px}.p8pad{gap:4px}.p8st{display:none}.p8num{font-size:24px;min-height:28px}.p8note{font-size:14px}}
.p8wrap.land{gap:10px}.p8wrap.land .p8phone{flex-direction:row;padding:8px;gap:8px}.p8wrap.land .p8scr{min-width:150px;max-width:170px;align-self:stretch;display:flex;flex-direction:column;justify-content:center}
.p8wrap.land .p8k{--kz:44px}.p8wrap.land .p8pad{gap:4px}.p8wrap.land .p8note{font-size:14px}
.p8wrap.land.calling .p8phone{flex-direction:column}.p8wrap.land .p8talk{gap:5px}.p8wrap.land .p8ob{font-size:16px;padding:5px 10px}.p8wrap.land .p8c{min-height:46px;font-size:15px;padding:4px 8px;min-width:90px}.p8wrap.land .p8opi{width:44px;height:44px}.p8wrap.land .p8hang{min-height:46px;font-size:16px}
@media (min-width:900px) and (min-height:600px){.p8ob{font-size:24px;padding:10px 18px}.p8c{font-size:22px;min-height:66px;min-width:150px;max-width:260px}.p8opi{width:84px;height:84px}.p8said{font-size:19px}.p8hang{font-size:22px;min-height:60px}.p8talk{gap:14px}.p8wrap.calling .p8scr{min-width:240px}}
/* 可以／不可以 */
.o8wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(8px,2vh,16px);width:100%}
.q8dots{display:flex;gap:6px;align-items:center}
.q8dots i{font-style:normal;line-height:1}.q8dots i::before{content:'★';font-size:24px;color:rgba(255,255,255,.3);transition:color .3s,text-shadow .3s}
.q8dots i.on::before{color:#FFE27A;text-shadow:0 0 10px #FFE27A}.q8dots i.now:not(.on)::before{color:rgba(255,226,122,.6)}
.o8card{display:flex;align-items:center;gap:14px;background:#FFFDF5;border-radius:22px;padding:14px 20px;max-width:min(640px,96%);box-shadow:0 4px 14px rgba(20,10,60,.3);flex-wrap:wrap;justify-content:center}
.o8card.in{animation:d8in .35s ease}
.o8ic{width:clamp(56px,10vh,88px);height:clamp(56px,10vh,88px);display:grid;place-items:center;flex:none}.o8ic svg{width:100%;height:100%}.o8emo{font-size:clamp(44px,8vh,70px);line-height:1}
.o8t{font-size:clamp(19px,2.8vh,26px);font-weight:800;color:#3A2E66;line-height:1.35;flex:1;min-width:180px}
.o8why{flex-basis:100%;font-size:17px;color:#7A4A9A;background:#F4ECFF;border-radius:12px;padding:6px 10px;line-height:1.35}
.o8why[hidden]{display:none}
.o8btns{display:flex;gap:clamp(14px,4vw,40px)}
.o8b{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:clamp(110px,22vw,170px);min-height:clamp(84px,14vh,130px);border-radius:24px;border:4px solid #fff;font-size:clamp(18px,2.6vh,24px);font-weight:800;cursor:pointer;box-shadow:0 4px 0 rgba(20,10,60,.3)}
.o8b svg{width:clamp(40px,7vh,64px);height:clamp(40px,7vh,64px)}
.o8b.yes{background:linear-gradient(180deg,#B8F4D0,#6FDCA0);color:#145A34}.o8b.no{background:linear-gradient(180deg,#FFD0E0,#FF9AB8);color:#7A1A3A}
.o8b.ok22{box-shadow:0 0 0 4px #6FE3A8,0 0 18px #6FE3A8}
@media (max-width:600px){.o8card{padding:10px 12px;gap:10px}.o8t{font-size:17px;min-width:150px}.o8why{font-size:15px}}
.o8wrap.land{flex-direction:row;flex-wrap:wrap;gap:8px}.o8wrap.land .q8dots{flex-basis:100%;justify-content:center}.o8wrap.land .o8card{max-width:58%;padding:8px 12px}.o8wrap.land .o8t{font-size:16px;min-width:120px}.o8wrap.land .o8ic{width:48px;height:48px}.o8wrap.land .o8emo{font-size:40px}
.o8wrap.land .o8btns{flex-direction:column;gap:8px}.o8wrap.land .o8b{min-height:52px;width:120px;flex-direction:row;font-size:17px}.o8wrap.land .o8b svg{width:34px;height:34px}.o8wrap.land .o8why{font-size:14px}
@media (prefers-reduced-motion:reduce){.d8svg .d8smoke,.d8svg .d8flame{animation:none}.d8svg .d8ring.on{animation:none;opacity:1}}
body.lite .d8svg .d8smoke,body.lite .d8svg .d8flame{animation:none}
`;document.head.appendChild(st8);

/* ================= 2.2 遊樂園大禮物：共用資料（m9zb_g22data.js）—— 2026-11-27 星光工作室 Starlight Studio（著作權與 IP 屬於星光工作室） =================
 * 禮物核心（m9zd_g22core.js）和禮物物品（m9ze_g22items.js）共用的約定，兩邊都只讀這份，不各自另訂：
 * - 存檔：V2.g22 = {own:{物品id:取得時間}, got:{'章-關':物品id}, fresh:{物品id:1}}（fresh＝拿到還沒去遊樂園看過）；用 save2() 存。
 * - 判斷有沒有：G22.has(id)。給：G22.give(id)（核心負責畫面；物品這邊只要讀 has）。
 * - 章、關是遊戲裡的 1 起算章號（第 41 章＝S.ch 40）和 1 起算關號（第 3 關＝S.level 2）。
 * - game：farm 小小農場、pet 寵物小屋、chef 小小廚師、room 房間、coloring 塗色本、globe 地球儀、photo 小小攝影師。
 * - spare：遊戲還沒開（或其他原因送不了）時改送的房間備用擺飾，依序取第一個還沒有的。
 */
(function(){if(typeof window.__ev!=='function')return;window.__ev('('+(function(){try{
const ITEMS=[
 {id:'tulip',    ch:41,lv:3,game:'farm',    name:'鬱金香種子',     pot:1},
 {id:'tunnel',   ch:41,lv:6,game:'pet',     name:'彩虹隧道'},
 {id:'mango',    ch:41,lv:9,game:'chef',    name:'芒果'},
 {id:'bookworm', ch:42,lv:3,game:'coloring',name:'小書蟲的塗色圖'},
 {id:'starlamp', ch:42,lv:6,game:'room',    name:'星星投影燈'},
 {id:'penguin',  ch:42,lv:9,game:'globe',   name:'南極的小企鵝'},
 {id:'giraffe',  ch:43,lv:3,game:'room',    name:'長頸鹿身高尺'},
 {id:'cucumber', ch:43,lv:6,game:'chef',    name:'小黃瓜'},
 {id:'bone',     ch:43,lv:9,game:'pet',     name:'潔牙骨頭'},
 {id:'elecan',   ch:44,lv:3,game:'farm',    name:'大象澆水壺'},
 {id:'pawrug',   ch:44,lv:6,game:'room',    name:'動物腳印地毯'},
 {id:'morning',  ch:44,lv:9,game:'farm',    name:'牽牛花種子'},
 {id:'frame',    ch:45,lv:3,game:'photo',   name:'花花相框'},
 {id:'chameleon',ch:45,lv:6,game:'coloring',name:'變色龍小畫家的塗色圖'},
 {id:'rcamera',  ch:45,lv:9,game:'photo',   name:'彩虹相機'}];
const SPARE=[
 {id:'sp_cushion',game:'room',name:'雲朵抱枕'},
 {id:'sp_mobile', game:'room',name:'星星吊飾'},
 {id:'sp_plant',  game:'room',name:'愛心小盆栽'}];
const GAMENAME={farm:'小小農場',pet:'寵物小屋',chef:'小小廚師',room:'房間',coloring:'塗色本',globe:'地球儀',photo:'小小攝影師'};
const st=()=>{if(!V2.g22||typeof V2.g22!=='object')V2.g22={own:{},got:{},fresh:{}};const g=V2.g22;g.own=g.own||{};g.got=g.got||{};g.fresh=g.fresh||{};return g};
const byId=id=>ITEMS.concat(SPARE).find(x=>x.id===id)||null;
window.G22=Object.assign(window.G22||{},{ITEMS,SPARE,GAMENAME,st,byId,
 has:id=>{try{return !!st().own[id]}catch(e){return false}},
 forLevel:(ch,lv)=>ITEMS.find(x=>x.ch===ch&&x.lv===lv)||null,
 forChapter:ch=>ITEMS.filter(x=>x.ch===ch)});
}catch(e){console.log('m9zb_g22data',e)}}).toString()+')()')})();

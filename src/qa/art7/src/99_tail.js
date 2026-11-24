
/* ===================== 登記 ===================== */
G.BG41={metro41:(W,H)=>metro(W,H,'platform'),metro41door:(W,H)=>metro(W,H,'door'),metro41car:(W,H)=>metro(W,H,'car'),metro41gate:(W,H)=>metro(W,H,'gate'),metro41map:(W,H)=>metro(W,H,'map'),home41:home41,library42:(W,H)=>library(W,H,'hall'),library42desk:(W,H)=>library(W,H,'desk'),library42kids:(W,H)=>library(W,H,'kids'),library42aisle:(W,H)=>library(W,H,'aisle'),library42out:(W,H)=>library(W,H,'out'),
 clinic43:(W,H)=>clinic(W,H,'wait'),clinic43doc:(W,H)=>clinic(W,H,'doc'),clinic43dent:(W,H)=>clinic(W,H,'dent'),clinic43med:(W,H)=>clinic(W,H,'med'),clinic43out:(W,H)=>clinic(W,H,'out'),
 zoo44:(W,H)=>zoo(W,H,'path'),zoo44gate:(W,H)=>zoo(W,H,'gate'),zoo44ele:(W,H)=>zoo(W,H,'ele'),zoo44gir:(W,H)=>zoo(W,H,'gir'),zoo44info:(W,H)=>zoo(W,H,'info'),
 museum45:(W,H)=>museum(W,H,'hall'),museum45kids:(W,H)=>museum(W,H,'kids'),museum45sculpt:(W,H)=>museum(W,H,'sculpt'),museum45lobby:(W,H)=>museum(W,H,'lobby'),museum45out:(W,H)=>museum(W,H,'out'),fin45:(W,H)=>museum(W,H,'fin')};
G.BG41_CH={41:'metro41',42:'library42',43:'clinic43',44:'zoo44',45:'museum45'};
G.BG41_OPEN={41:'home41',42:'library42out',43:'clinic43out',44:'zoo44gate',45:'museum45out'};
G.BG41_STORY={41:['metro41gate','metro41map','metro41door','metro41car'],42:['library42desk','library42kids','library42aisle'],43:['clinic43doc','clinic43dent','clinic43med'],44:['zoo44ele','zoo44gir','zoo44info'],45:['museum45lobby','museum45kids','museum45sculpt']};
G.BG41_FIN='fin45';
S41.ZOO={elephant:(x,y,s,o)=>zooA('elephant',x,y,s,o),giraffe:(x,y,s,o)=>zooA('giraffe',x,y,s,o)};
})(typeof window!=='undefined'?window:globalThis);

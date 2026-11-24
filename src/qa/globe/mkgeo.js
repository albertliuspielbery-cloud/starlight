// 地球儀資料產生器：world-atlas（Natural Earth，public domain）→ 壓縮字串
// 用法：node mkgeo.js > geo.json
const t=require('topojson-client');
const W110=require('./node_modules/world-atlas/countries-110m.json');
const W50=require('./node_modules/world-atlas/countries-50m.json');
const geoms=W110.objects.countries.geometries;
const name=g=>g.properties&&g.properties.name;
const EU=new Set(['Norway','Sweden','Finland','Denmark','Iceland','Ireland','United Kingdom','France','Spain','Portugal','Belgium','Netherlands','Luxembourg','Germany','Switzerland','Austria','Italy','Slovenia','Croatia','Bosnia and Herz.','Serbia','Montenegro','Kosovo','Albania','Macedonia','Greece','Bulgaria','Romania','Moldova','Ukraine','Belarus','Poland','Czechia','Slovakia','Hungary','Lithuania','Latvia','Estonia']);
const AF=new Set(['Tanzania','W. Sahara','Dem. Rep. Congo','Somalia','Kenya','Sudan','Chad','South Africa','Lesotho','Zimbabwe','Botswana','Namibia','Senegal','Mali','Mauritania','Benin','Niger','Nigeria','Cameroon','Togo','Ghana',"Côte d'Ivoire",'Guinea','Guinea-Bissau','Liberia','Sierra Leone','Burkina Faso','Central African Rep.','Congo','Gabon','Eq. Guinea','Zambia','Malawi','Mozambique','eSwatini','Angola','Burundi','Madagascar','Gambia','Tunisia','Algeria','Morocco','Egypt','Libya','Ethiopia','Djibouti','Somaliland','Uganda','Rwanda','Eritrea','S. Sudan']);
const NA=new Set(['Canada','United States of America','Greenland','Mexico','Panama','Costa Rica','Nicaragua','Honduras','El Salvador','Guatemala','Belize','Haiti','Dominican Rep.','Bahamas','Puerto Rico','Jamaica','Cuba','Trinidad and Tobago']);
const SA=new Set(['Argentina','Chile','Uruguay','Brazil','Bolivia','Peru','Colombia','Venezuela','Guyana','Suriname','Ecuador','Paraguay','Falkland Is.']);
const OC=new Set(['Australia','New Zealand','Papua New Guinea','Fiji','Vanuatu','New Caledonia','Solomon Is.']);
const AN=new Set(['Antarctica']);
const SKIP=new Set(['Fr. S. Antarctic Lands','Russia','France']);
const contOf=n=>EU.has(n)?'eu':AF.has(n)?'af':NA.has(n)?'na':SA.has(n)?'sa':OC.has(n)?'oc':AN.has(n)?'an':'as';
const groups={as:[],eu:[],af:[],na:[],sa:[],oc:[],an:[]};
geoms.forEach(g=>{const n=name(g);if(!n||SKIP.has(n))return;groups[contOf(n)].push(g)});
const extra={as:[],eu:[],af:[],na:[],sa:[],oc:[],an:[]};
const feat=n=>t.feature(W110,geoms.find(g=>name(g)===n));
const polysOf=f=>{const g=f.geometry;return g.type==='Polygon'?[g.coordinates]:g.coordinates};
// 俄羅斯：東經 60 度切開（西邊歐洲、東邊亞洲）
function unwrap(r){const o=[r[0].slice()];for(let i=1;i<r.length;i++){let x=r[i][0];const px=o[i-1][0];while(x-px>180)x-=360;while(x-px<-180)x+=360;o.push([x,r[i][1]])}return o}
function clipRing(r,keepWest,X){r=unwrap(r);const out=[];const inside=p=>keepWest?p[0]<=X:p[0]>=X;
 for(let i=0;i<r.length;i++){const a=r[i],b=r[(i+1)%r.length];const ia=inside(a),ib=inside(b);
  if(ia)out.push(a);if(ia!==ib){const tt=(X-a[0])/(b[0]-a[0]);out.push([X,a[1]+tt*(b[1]-a[1])])}}
 return out.length>=3?out:null}
polysOf(feat('Russia')).forEach(p=>{const r=p[0];const w=clipRing(r,true,60),e=clipRing(r,false,60);if(w)extra.eu.push(w);if(e)extra.as.push(e)});
// 法國：歐洲本土在歐洲，法屬圭亞那在南美洲
polysOf(feat('France')).forEach(p=>{const r=p[0];(r[0][0]<0&&r[0][1]<10?extra.sa:extra.eu).push(r)});
const cont={};
for(const k in groups){const m=t.merge(W110,groups[k]);const rings=[];(m.type==='Polygon'?[m.coordinates]:m.coordinates).forEach(p=>p.forEach(r=>rings.push(r)));cont[k]=rings.concat(extra[k])}
// ---- 簡化（Douglas-Peucker，經緯度平面） ----
function dp(pts,tol){if(pts.length<=4)return pts;const keep=new Uint8Array(pts.length);keep[0]=keep[pts.length-1]=1;
 const st=[[0,pts.length-1]];while(st.length){const [a,b]=st.pop();let md=-1,mi=-1;const [x1,y1]=pts[a],[x2,y2]=pts[b];const dx=x2-x1,dy=y2-y1,L=dx*dx+dy*dy;
  for(let i=a+1;i<b;i++){const [x,y]=pts[i];let d;if(L===0)d=Math.hypot(x-x1,y-y1);else{let u=((x-x1)*dx+(y-y1)*dy)/L;u=Math.max(0,Math.min(1,u));d=Math.hypot(x-(x1+u*dx),y-(y1+u*dy))}if(d>md){md=d;mi=i}}
  if(md>tol){keep[mi]=1;st.push([a,mi],[mi,b])}}
 return pts.filter((p,i)=>keep[i])}
function simp(r,tol){// 環：分兩半各自簡化，避免頭尾退化
 const n=r.length;if(n<8)return r;const h=Math.floor(n/2);const a=dp(r.slice(0,h+1),tol),b=dp(r.slice(h),tol);return a.slice(0,-1).concat(b)}
// ---- 編碼：0.1 度整數、差分、zigzag、64 字元變長 ----
const AL='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function vint(v){v=v<0?(-v*2-1):v*2;let s='';do{let c=v&31;v=Math.floor(v/32);if(v>0)c|=32;s+=AL[c]}while(v>0);return s}
function enc(rings,q=10){return rings.map(r=>{let px=0,py=0,s='';const seen=[];for(const [x,y] of r){const X=Math.round(x*q),Y=Math.round(y*q);if(seen.length&&X===px&&Y===py)continue;s+=vint(X-px)+vint(Y-py);px=X;py=Y;seen.push(1)}return s}).join(' ')}
const out={q:10,cont:{},ctry:{},stat:{}};
let npt=0;
const TOL={an:.15,as:.05,eu:.04,af:.05,na:.06,sa:.05,oc:.04};
for(const k in cont){const rings=cont[k].map(r=>simp(r,TOL[k])).filter(r=>r.length>=3);
 // 太小的島丟掉（面積 < 0.05 平方度），但保留大洋洲的小島
 const area=r=>{let a=0;for(let i=0;i<r.length;i++){const p=r[i],q=r[(i+1)%r.length];a+=p[0]*q[1]-q[0]*p[1]}return Math.abs(a/2)};
 const rr=rings.filter(r=>area(r)>(k==='oc'?.02:.08));
 rr.forEach(r=>npt+=r.length);out.cont[k]=enc(rr);out.stat[k]=rr.length}
// ---- 31 國 ----
const C=[
 ['tw','Taiwan',50],['jp','Japan'],['kr','South Korea'],['th','Thailand'],['vn','Vietnam'],['sg','Singapore',50],['my','Malaysia'],['id','Indonesia'],['ph','Philippines'],['in','India'],
 ['gb','United Kingdom'],['fr','France'],['de','Germany'],['it','Italy'],['es','Spain'],['nl','Netherlands',50],['ch','Switzerland',50],['gr','Greece'],['is','Iceland'],
 ['us','United States of America'],['ca','Canada'],['mx','Mexico'],['br','Brazil'],['ar','Argentina'],['pe','Peru'],
 ['eg','Egypt'],['ke','Kenya'],['za','South Africa'],['ma','Morocco'],
 ['au','Australia'],['nz','New Zealand']];
for(const [id,n,res] of C){const W=res===50?W50:W110;const g=W.objects.countries.geometries.find(x=>name(x)===n);if(!g)throw new Error('no '+n);
 let ps=polysOf(t.feature(W,g));if(id==='fr')ps=ps.filter(p=>!(p[0][0][0]<0&&p[0][0][1]<10));
 if(id==='ma')ps=ps; // 只用 110m 的摩洛哥本體
 const tol=res===50?(id==='tw'?.03:.04):.1;
 let rings=ps.map(p=>simp(p[0],tol)).filter(r=>r.length>=3);
 // 主要的一塊算中心（面積加權）
 const area=r=>{let a=0;for(let i=0;i<r.length;i++){const p=r[i],q=r[(i+1)%r.length];a+=p[0]*q[1]-q[0]*p[1]}return a/2};
 if(id!=='tw'&&id!=='sg')rings=rings.filter(r=>Math.abs(area(r))>.03||rings.length===1);
 let big=rings.reduce((a,b)=>Math.abs(area(b))>Math.abs(area(a))?b:a);
 let cx=0,cy=0,A=0;for(let i=0;i<big.length;i++){const p=big[i],q=big[(i+1)%big.length];const c=p[0]*q[1]-q[0]*p[1];cx+=(p[0]+q[0])*c;cy+=(p[1]+q[1])*c;A+=c}A/=2;cx/=6*A;cy/=6*A;
 rings.forEach(r=>npt+=r.length);
 out.ctry[id]={r:enc(rings,id==='tw'||id==='sg'?100:10),q:id==='tw'||id==='sg'?100:10,c:[+cx.toFixed(1),+cy.toFixed(1)]}}
out.stat.npt=npt;
// ---- 海洋格子（1 度）：陸地點陣 → 多起點擴散，牆擋住洋與洋的分界 ----
const GW=360,GH=180;const land=new Uint8Array(GW*GH);
const allR=[];for(const k in cont)cont[k].forEach(r=>allR.push(r));
for(let j=0;j<GH;j++){const lat=89.5-j;const xs=[];for(const r of allR){for(let i=0;i<r.length;i++){const a=r[i],b=r[(i+1)%r.length];if((a[1]>lat)!==(b[1]>lat)){xs.push(a[0]+(lat-a[1])/(b[1]-a[1])*(b[0]-a[0]))}}}
 xs.sort((a,b)=>a-b);for(let k=0;k+1<xs.length;k+=2){for(let i=0;i<GW;i++){const lon=-179.5+i;if(lon>=xs[k]&&lon<xs[k+1])land[j*GW+i]=1}}}
const lab=new Int8Array(GW*GH).fill(-1);const wall=new Uint8Array(GW*GH);
const cell=(lon,lat)=>{let i=Math.floor(lon+180),j=Math.floor(90-lat);i=((i%GW)+GW)%GW;j=Math.max(0,Math.min(GH-1,j));return j*GW+i};
function wline(pts){for(let k=0;k+1<pts.length;k++){const [x1,y1]=pts[k],[x2,y2]=pts[k+1];const n=Math.ceil(Math.max(Math.abs(x2-x1),Math.abs(y2-y1))*4)+1;for(let s=0;s<=n;s++){const x=x1+(x2-x1)*s/n,y=y1+(y2-y1)*s/n;wall[cell(x,y)]=1}}}
// 0 太平洋 1 大西洋 2 印度洋 3 北極海 4 南極海
wline([[20,-35],[20,-60]]);wline([[147,-43.5],[147,-60]]);wline([[-67,-55],[-67,-60]]);wline([[-68.5,-52.3],[-67,-55]]);
wline([[103.6,1.3],[104.5,0.3],[106,-6],[115,-8.6],[119,-8.8],[123,-8.8],[125,-9],[127,-13.8]]);
wline([[142.3,-10.6],[142.3,-9.5]]);
for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const lat=89.5-j,id=j*GW+i;if(land[id])continue;if(lat>=66)lab[id]=3;else if(lat<=-60)lab[id]=4}
const seeds=[[0,-150,0],[0,160,0],[0,114,12],[0,135,40],[0,123,35],[0,150,55],[0,110,-4],[0,128,-5],[0,139,-14],[0,155,-18],[0,160,-38],[0,-120,-40],[0,-175,58],[0,-140,55],[0,-110,20],
 [1,-30,0],[1,-30,40],[1,18,35],[1,34,43],[1,19,57],[1,-90,25],[1,-75,15],[1,-40,-40],[1,-10,60],[1,3,56],[1,-55,58],[1,-45,62],
 [2,80,-20],[2,88,15],[2,65,15],[2,38,20],[2,51,27],[2,115,-15],[2,125,-11],[2,130,-36],[2,60,-50],[2,100,-40],
 [3,-85,60],[3,-80,64]];
let q=[];for(const [l,lon,lat] of seeds){const id=cell(lon,lat);if(!land[id]&&!wall[id]&&lab[id]<0){lab[id]=l;q.push(id)}}
const nb=id=>{const i=id%GW,j=(id-i)/GW;const o=[];o.push(j*GW+(i+1)%GW,j*GW+(i+GW-1)%GW);if(j>0)o.push(id-GW);if(j<GH-1)o.push(id+GW);return o};
while(q.length){const nq=[];for(const id of q)for(const n of nb(id)){if(land[n]||wall[n]||lab[n]>=0)continue;lab[n]=lab[id];nq.push(n)}q=nq}
// 牆、陸地、沒到的：取最近的
let left=1;let guard=0;while(left&&guard++<400){left=0;const nl=Int8Array.from(lab);for(let id=0;id<GW*GH;id++){if(lab[id]>=0)continue;left++;for(const n of nb(id))if(lab[n]>=0){nl[id]=lab[n];break}}lab.set(nl)}
// 列：run-length（數字＋類別）
const rows=[];for(let j=0;j<GH;j++){let s='',cur=lab[j*GW],n=0;for(let i=0;i<GW;i++){const v=lab[j*GW+i];if(v===cur)n++;else{s+=n.toString(36)+'.'+cur+',';cur=v;n=1}}s+=n.toString(36)+'.'+cur;rows.push(s)}
out.ocean=rows.join('|');
console.log(JSON.stringify(out));

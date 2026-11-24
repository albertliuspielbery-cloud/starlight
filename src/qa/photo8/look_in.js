(()=>{const ks=['elephant','giraffe','lion','blackbear','deer','bear','kitten','frog','leopardcat','monkey','penguin','owl'];
 let h=ks.filter(k=>AN[k]).map(k=>`<div style="width:130px;height:150px;display:inline-block;background:#fff;margin:4px">${animal(k)}<br>${k}</div>`).join('');
 try{h+=Object.keys(CH36).map(k=>`<div style="width:130px;height:150px;display:inline-block;background:#eef;margin:4px"><svg viewBox="0 0 100 100">${CH36[k].f()}</svg><br>${k}</div>`).join('')}catch(e){h+=e}
 try{h+=['elephant','giraffe','lion','frog','blackbear'].map(k=>`<div style="width:130px;height:150px;display:inline-block;background:#efe;margin:4px">${fullBody(k,{pose:'wave'})}<br>fb ${k}</div>`).join('')}catch(e){h+=e}
 try{h+=['penguin','sloth36'].map(k=>`<div style="width:130px;height:150px;display:inline-block;background:#fee;margin:4px">${petSVG(k,'')}</div>`).join('')}catch(e){h+=e}
 document.body.innerHTML='<div style="background:#ccc;padding:10px">'+h+'</div>';return Object.keys(AN).join(',')})()


/* ===================== 6. 徽章、小徽章（圖鑑「城市小旅行家」一排）、獎狀 ===================== */
S41.BADGE_IC=[
 `<rect x="-8" y="-8" width="16" height="14" rx="4" fill="#FFFFFF" stroke="#8A8EA8" stroke-width="1"/><rect x="-5.6" y="-5.6" width="11.2" height="5" rx="1.4" fill="#5A6E9E"/><rect x="-8" y="1" width="16" height="2" fill="#4FC4AE"/><path d="M-5 6 L-7 9 M5 6 L7 9" stroke="#8A8EA8" stroke-width="1.4" stroke-linecap="round"/>`,
 `<path d="M0 -5 Q-4.6 -8 -9 -6 V6 Q-4.6 4 0 7Z M0 -5 Q4.6 -8 9 -6 V6 Q4.6 4 0 7Z" fill="#FFFFFF" stroke="#7E8ED8" stroke-width="1.2"/><path d="M-7 -2 H-2 M-7 1 H-2 M2 -2 H7 M2 1 H7" stroke="#C9D8F0" stroke-width=".9"/>`,
 `<path d="M-7 -6 Q-8 -10 -3 -9 Q0 -8 3 -9 Q8 -10 7 -6 Q7 0 5 4 Q4 8 2 7 Q1 3 0 3 Q-1 3 -2 7 Q-4 8 -5 4 Q-7 0 -7 -6Z" fill="#FFFFFF" stroke="#4FC4AE" stroke-width="1.2"/><circle cx="-2.6" cy="-3.4" r=".9" fill="#3A3150"/><circle cx="2.6" cy="-3.4" r=".9" fill="#3A3150"/><path d="M-1.6 -1 Q0 .4 1.6 -1" stroke="#3A3150" stroke-width=".7" fill="none"/>`,
 `<path d="M-8 6 Q-10 -6 0 -7 Q9 -7 9 1 Q9 5 6 5 V9 H3 V5 H-3 V9 H-6Z" fill="#A9B6CE"/><path d="M-8 -1 Q-12 3 -10 9" stroke="#A9B6CE" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="-3" cy="-2" r="1" fill="#2A2438"/><path d="M0 -6 Q4 -4 3 1" stroke="#E8B8C8" stroke-width="2" fill="none"/>`,
 `<path d="M0 -8 Q9 -8 9 0 Q9 4 5 4 Q2 4 2 6.4 Q2 9 0 9 Q-9 9 -9 0 Q-9 -8 0 -8Z" fill="#F2D2A0" stroke="#C89A5A" stroke-width="1"/>${[[-4.6,-3,'#FF6F6F'],[0,-5,'#FFCB4D'],[4.6,-3,'#4FC4AE'],[-4.6,2.6,'#5A9AF0']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${c}"/>`).join('')}`];
S41.BADGE=(a='')=>{const g='b41'+Math.random().toString(36).slice(2,7);
 const ring=S41.BADGE_IC.map((s,k)=>{const t=-Math.PI/2+k*2*Math.PI/5,x=100+Math.cos(t)*58,y=96+Math.sin(t)*58;return `<g transform="translate(${n(x)} ${n(y)})"><circle r="15" fill="#FFFFFF" stroke="${C7.mint}" stroke-width="2"/><g transform="scale(1.05)">${s}</g></g>`}).join('');
 return `<svg ${a} viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="${g}" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#F2FBFF"/><stop offset="1" stop-color="#BFE6F4"/></radialGradient><clipPath id="${g}c"><circle cx="100" cy="96" r="34"/></clipPath></defs>
  <path d="M70 150 L56 196 L76 186 L86 200 L96 156Z" fill="${C7.coral}"/><path d="M130 150 L144 196 L124 186 L114 200 L104 156Z" fill="${C7.mint}"/>
  <circle cx="100" cy="96" r="84" fill="#FFD24D" stroke="#C8962A" stroke-width="4"/><circle cx="100" cy="96" r="76" fill="url(#${g})"/>
  <g clip-path="url(#${g}c)"><rect x="60" y="56" width="80" height="80" fill="#BFE6F4"/>
   <rect x="72" y="92" width="14" height="40" fill="#A99BE8"/><rect x="88" y="78" width="16" height="54" fill="#7EC6F0"/><rect x="106" y="88" width="14" height="44" fill="${C7.coral}"/><rect x="122" y="98" width="12" height="34" fill="${C7.mint}"/>
   ${[[75,98],[80,106],[91,84],[98,94],[91,104],[109,94],[114,104],[125,104]].map(([x,y])=>`<rect x="${x}" y="${y}" width="3.4" height="3.4" fill="#FFFFFF" opacity=".8"/>`).join('')}
   <path d="M60 122 H140 V136 H60Z" fill="#8A8EA8"/><rect x="62" y="114" width="44" height="12" rx="4" fill="#FFFFFF"/><rect x="62" y="119" width="44" height="2.4" fill="${C7.mint}"/></g>
  <circle cx="100" cy="96" r="34" fill="none" stroke="#FFFFFF" stroke-width="3"/><path d="${star5(100,70,8)}" fill="#FFCB4D" stroke="#E0962A" stroke-width="1.2"/>${ring}</svg>`};
S41.MINI_C=['#DDF6F0','#E2E6FF','#E0F6EE','#E6EEF8','#FFF0DE'];
S41.MINI=(k,a='')=>{const c=S41.MINI_C[k]||'#E8F6F2';return `<svg ${a} viewBox="0 0 100 100" aria-hidden="true"><path d="M34 76 L26 98 L38 92 L44 100 L50 80Z" fill="${C7.coral}"/><path d="M66 76 L74 98 L62 92 L56 100 L50 80Z" fill="${C7.mint}"/>
  <circle cx="50" cy="46" r="40" fill="#FFD24D" stroke="#C8962A" stroke-width="3"/><circle cx="50" cy="46" r="34" fill="${c}" stroke="#FFF6D0" stroke-width="2.4"/><g transform="translate(50 46) scale(2.6)">${S41.BADGE_IC[k]||''}</g></svg>`};
// 獎狀（文字由內容同事的 S7FIN 提供；還沒有時先用這裡的暫定文字，只在預覽頁出現）
S41.FIN0={cert_title:'城市小旅行家',cert_to:'最棒的小旅行家',cert_sign:'小貓熊　和城市的朋友們',cert_body:['你完成了第七季','「星光城市小旅行」五章的冒險，','<br>','搭捷運、去圖書館、看醫生，','<br>','當動物園的小導遊，','<br>','還在美術館看見自己的畫，','<br>','是最棒的城市小旅行家！']};
S41.certHTML=(o)=>{const F=(typeof G.S7FIN!=='undefined'&&G.S7FIN.cert_title)?G.S7FIN:(EV('typeof S7FIN!=="undefined"?S7FIN:null')||S41.FIN0);const nm=(o.name||'').trim();const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return `<div class="card certcard cert3 cert7" role="dialog" aria-label="${F.cert_title}獎狀"><div class="certin"><div class="certrib">獎　狀</div>
  <div class="certtt">${F.cert_title}</div><div class="certto">頒給：<b>${nm?esc(nm):F.cert_to}</b></div>
  <div class="certbody">${F.cert_body.map(s=>s==='<br>'?'<br>':`<span>${s}</span>`).join('')}</div>
  <div class="certart"><span>${o.hero||''}</span><span class="c3badge">${S41.BADGE()}</span><span class="u">${o.pet||''}</span></div>
  <div class="certfoot"><div><div class="certsig">${F.cert_sign}</div><div class="certdt">${o.date||''}</div></div><span class="c3mini">${G.RPANDA41('happy')}</span></div></div>
  <button class="btn" id="certok">好棒！</button></div>`};
S41.CERT_CSS=`.cert7 .certin{background:linear-gradient(180deg,#F6FDFF,#E6F6F2)}.cert7 .certrib{background:linear-gradient(90deg,#3EAE98,#7EC6F0)}.cert7 .certtt{color:#2E7A6E;text-shadow:0 2px 0 #D8F2EC}.cert7 .c3badge svg{height:100%;width:auto}`;

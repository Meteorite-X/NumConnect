// ══════════════════════════════════════════════════════════════
//  ES6 IMPORTS — Багийн гишүүн бүрийн өгөгдөл
// ══════════════════════════════════════════════════════════════
import { users, filters, recentMatches }        from './data/member1.js';
import { chatMessages, generalMessages }         from './data/member2.js';
import { stats, features, kpis, reports,
         schedulePattern, scheduleHours,
         scheduleDays, dauChart }                from './data/member3.js';

const DATA = {
  users, filters, recentMatches,
  chatMessages, generalMessages,
  stats, features, kpis, reports,
  schedulePattern, scheduleHours, scheduleDays, dauChart
};


// ══════════════════════════════════════════════════════════════
//  ES6 RENDER FUNCTIONS — JSON датаг HTML болгож load хийнэ
// ══════════════════════════════════════════════════════════════

// ─── Landing stats render (destructuring + map + template literals) ───
const renderStats = () => {
  const container = document.getElementById('stats-container');
  if (!container) return;
  container.innerHTML = DATA.stats
    .map(({ value, label }) => `
      <div class="stat-item">
        <span class="stat-n">${value}</span>
        <span class="stat-l">${label}</span>
      </div>`)
    .join('');
};

// ─── Landing features render (destructuring + arrow + map) ───
const renderFeatures = () => {
  const container = document.getElementById('features-container');
  if (!container) return;
  container.innerHTML = DATA.features
    .map(({ icon, iconClass, title, desc }) => `
      <div class="feat-card">
        <div class="feat-ico ${iconClass}">${icon}</div>
        <div class="feat-t">${title}</div>
        <div class="feat-p">${desc}</div>
      </div>`)
    .join('');
};

// ─── Filter chips render (map + event delegation) ───
const renderFilterChips = () => {
  const container = document.getElementById('filter-chips-container');
  if (!container) return;
  container.innerHTML = DATA.filters
    .map(({ label, active = false }) =>
      `<button class="chip${active ? ' on' : ''}">${label}</button>`)
    .join('');
  // ES6 event delegation
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      chip.classList.add('on');
    });
  });
};

// ─── Discover list render (spread, destructuring, optional chaining, ternary) ───
const renderDiscoverList = (users = DATA.users) => {
  const container = document.getElementById('discover-list-container');
  const countLabel = document.getElementById('user-count-label');
  if (!container) return;

  // filter + sort (ES6)
  const sorted = [...users].sort((a, b) => b.score - a.score);
  if (countLabel) countLabel.innerHTML = `<strong style="color:var(--ink)">${sorted.length}</strong> оюутан`;

  container.innerHTML = sorted.map(({ name, age, av, mbti, major, year, score, online, tags, commonHours, gradient }) => {
    const isHighScore = score >= 75;
    const ringStyle = isHighScore ? '' : 'border-color:var(--line);background:var(--bg)';
    const scoreStyle = isHighScore ? '' : 'color:var(--sub)';
    return `
      <div class="user-card">
        <div class="u-av" style="background:linear-gradient(135deg,${gradient[0]},${gradient[1]})">${av}${online ? '<div class="u-dot"></div>' : ''}</div>
        <div class="u-info">
          <div class="u-namerow">
            <span class="u-name">${name}, ${age}</span>
            ${mbti ? `<span class="u-mbti">${mbti}</span>` : ''}
          </div>
          <div class="u-meta">${major} · ${year} · ${commonHours} нийтлэг</div>
          <div class="u-tags">${tags.slice(0, 2).map(t => `<span class="u-tag">${t}</span>`).join('')}</div>
        </div>
        <div class="u-right">
          <div class="score-ring" style="${ringStyle}">
            <div class="sr-n" style="${scoreStyle}">${score}%</div>
            <div class="sr-l" style="${scoreStyle}">таарсан</div>
          </div>
          <button class="msg-btn" onclick="event.stopPropagation();this.textContent='✓ Илгээсэн';this.classList.add('sent')">💬 Мессеж</button>
        </div>
      </div>`;
  }).join('');
};

// ─── Chat messages render (for...of + template literals) ───
const renderChatMessages = () => {
  const container = document.getElementById('msgs-container');
  if (!container) return;
  let html = '<div class="date-sep">Өнөөдөр</div>';
  for (const { sender, av, time, text, me } of DATA.chatMessages) {
    html += `
      <div class="msg-row${me ? ' me' : ''}">
        <div class="msg-av">${av}</div>
        <div class="msg-content">
          <div class="msg-sender${me ? ' me-n' : ''}">${sender} <span class="msg-ts">${time}</span></div>
          <div class="bubble">${text}</div>
        </div>
      </div>`;
  }
  container.innerHTML = html;
};

// ─── General channel messages render (Array.map + optional clickable) ───
const renderGeneralMessages = () => {
  const container = document.getElementById('gen-msgs');
  if (!container) return;
  const { generalMessages } = DATA;  // destructuring

  let html = generalMessages.map(({ name, av, time, text, gradient, clickable }) => {
    const clickAttr = clickable ? `onclick="openGenProfile('${name}')" style="cursor:pointer"` : '';
    const avClick = clickable ? `onclick="openGenProfile('${name}')"` : '';
    return `
      <div class="gen-msg">
        <div class="gen-av" ${avClick} style="background:linear-gradient(135deg,${gradient[0]},${gradient[1]})">${av}</div>
        <div class="gen-body">
          <div class="gen-head" ${clickAttr}><span class="gen-name">${name}</span><span class="gen-ts">${time}</span></div>
          <div class="gen-text">${text}</div>
        </div>
      </div>`;
  }).join('');

  // Одоо тусгаарлагч нэмэх (7-р мессежийн өмнө)
  const msgs = html.split('</div></div></div>');
  if (msgs.length > 7) {
    msgs.splice(7, 0, `</div></div></div><div style="display:flex;align-items:center;gap:10px;margin:10px 20px;font-size:9px;color:var(--mute);letter-spacing:1px;text-transform:uppercase"><div style="flex:1;height:1px;background:var(--line)"></div>ОДОО<div style="flex:1;height:1px;background:var(--line)"></div></div>`);
    html = msgs.join('</div></div></div>');
  }

  container.innerHTML = html;
};

// ─── Admin KPI render (destructuring + map + ternary) ───
const renderKPIs = () => {
  const container = document.getElementById('kpi-container');
  if (!container) return;
  container.innerHTML = DATA.kpis
    .map(({ icon, iconClass, label, value, valueClass, change, negative }) => `
      <div class="kpi">
        <div class="kpi-ico ${iconClass}">${icon}</div>
        <div class="kpi-l">${label}</div>
        <div class="kpi-n ${valueClass}">${value}</div>
        <div class="kpi-ch${negative ? ' neg' : ''}">${change}</div>
      </div>`)
    .join('');
};

// ─── Admin users table render (filter + find + map) ───
const renderAdminUsers = (filterType = 'all') => {
  const container = document.getElementById('admin-users-container');
  if (!container) return;

  // ES6: filter
  const filtered = filterType === 'all'
    ? DATA.users
    : DATA.users.filter(u => u.plan === filterType);

  container.innerHTML = filtered.map(({ name, av, email, major, year, plan, status }) => {
    const planBadge = plan === 'premium'
      ? '<span class="badge bg-prem">👑 Premium</span>'
      : '<span class="badge bg-free">Free</span>';
    const statusBadge = status === 'active'
      ? '<span class="badge bg-ok">Идэвхтэй</span>'
      : '<span class="badge bg-bad">Тайлагдсан</span>';
    return `
      <tr class="adm-tr">
        <td class="adm-td"><div class="uc"><div class="ua">${av}</div><div><div class="un">${name}</div><div class="ue">${email}</div></div></div></td>
        <td class="adm-td">${major}</td>
        <td class="adm-td">${year}</td>
        <td class="adm-td">${planBadge}</td>
        <td class="adm-td">${statusBadge}</td>
        <td class="adm-td"><button class="adm-act aa-view">Харах</button><button class="adm-act aa-block">Блок</button></td>
      </tr>`;
  }).join('');
};

// ─── Admin reports render (map + ternary) ───
const renderReports = () => {
  const container = document.getElementById('reports-container');
  if (!container) return;
  container.innerHTML = DATA.reports
    .map(({ icon, title, detail, status }) => `
      <div class="rep-item">
        <div class="rep-ico">${icon}</div>
        <div><div class="rep-t">${title}</div><div class="rep-s">${detail}</div></div>
        <div class="rep-st"><span class="badge ${status === 'open' ? 'bg-bad' : 'bg-ok'}">${status === 'open' ? 'Нээлттэй' : 'Шийдвэрлэсэн'}</span></div>
      </div>`)
    .join('');
};

// ─── DAU Chart render (map + max + Math) ───
const renderDAUChart = () => {
  const chartArea = document.querySelector('.chart-area');
  const chartDays = document.querySelector('.chart-days');
  if (!chartArea || !chartDays) return;

  chartArea.innerHTML = DATA.dauChart
    .map(({ value, height }) => `
      <div class="cb2" style="height:${height}%">
        <div class="cb2-val">${value}</div>
      </div>`)
    .join('');

  chartDays.innerHTML = DATA.dauChart
    .map(({ day }) => `<div class="cd">${day}</div>`)
    .join('');
};

// ─── Sidebar matches render (map + optional chaining + nullish coalescing) ───
const renderSidebarMatches = () => {
  const container = document.getElementById('sidebar-matches-container');
  if (!container) return;
  container.innerHTML = DATA.recentMatches
    .map(({ name, av, preview, unread, time, online }) => `
      <div class="mi"${name === 'Энхтуяа' ? ' onclick="go(\'chat\')"' : ''}>
        <div class="mi-av">${av}${online ? '<div class="mi-dot"></div>' : ''}</div>
        <div><div class="mi-name">${name}</div><div class="mi-pre">${preview}</div></div>
        ${unread ? `<div class="mi-unread">${unread}</div>` : `<div class="mi-time">${time ?? ''}</div>`}
      </div>`)
    .join('');
};


// ══════════════════════════════════════════════════════════════
//  INIT — Бүх render функцуудыг дуудаж өгөгдлийг load хийнэ
// ══════════════════════════════════════════════════════════════
const initApp = () => {
  renderStats();
  renderFeatures();
  renderFilterChips();
  renderDiscoverList();
  renderChatMessages();
  renderGeneralMessages();
  renderKPIs();
  renderAdminUsers();
  renderReports();
  renderDAUChart();
  renderSidebarMatches();
};

// DOM бэлэн болмогц init
document.addEventListener('DOMContentLoaded', initApp);


// ══════════════════════════════════════════════════════════════
//  genProfiles — General channel profile popup-д ашиглана
// ══════════════════════════════════════════════════════════════

// ES6: Object.fromEntries + map (users массиваас object үүсгэх)
const genProfiles = Object.fromEntries(
  DATA.users.map(({ name, ...rest }) => [name, rest])
);


// ══════════════════════════════════════════════════════════════
//  EXISTING FUNCTIONS — Бүх UI interaction logic
// ══════════════════════════════════════════════════════════════

/* ═══ THEME ═══ */
function toggleTheme(){const r=document.documentElement;const d=r.getAttribute('data-theme')==='dark';r.setAttribute('data-theme',d?'light':'dark');document.getElementById('theme-btn').textContent=d?'🌙':'☀️';try{localStorage.setItem('nc-theme',d?'light':'dark')}catch(e){}}
(function(){try{const s=localStorage.getItem('nc-theme');if(s==='dark'){document.documentElement.setAttribute('data-theme','dark');window.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('theme-btn');if(b)b.textContent='☀️'})}}catch(e){}})();

/* ═══ NAV ═══ */
function go(id){document.querySelectorAll('.sc').forEach(s=>s.classList.remove('on'));document.querySelectorAll('.nt').forEach(b=>b.classList.remove('on'));const el=document.getElementById(id);if(el)el.classList.add('on');document.querySelectorAll('.nt').forEach(b=>{if(b.getAttribute('onclick')?.includes(`'${id}'`))b.classList.add('on')});window.scrollTo(0,0)}

/* ═══ PILLS TOGGLE ═══ */
document.querySelectorAll('.pill').forEach(p=>{p.addEventListener('click',function(){this.classList.toggle('on')})});

/* ═══ MBTI ═══ */
document.querySelectorAll('.mbti-pill').forEach(btn=>{btn.addEventListener('click',function(){const v=this.dataset.mbti;document.querySelectorAll('.mbti-pill').forEach(b=>b.classList.remove('on'));this.classList.add('on');const s=document.getElementById('mbti-selected'),bg=document.getElementById('mbti-selected-badge');if(v){bg.textContent=v;s.style.display='flex';document.getElementById('mbti-picker').style.display='none'}else{s.style.display='none'}})});
function clearMbti(){document.querySelectorAll('.mbti-pill').forEach(b=>b.classList.remove('on'));document.getElementById('mbti-selected').style.display='none';document.getElementById('mbti-picker').style.display='flex'}

/* ═══ VIEW TOGGLE ═══ */
function setView(m){document.getElementById('vt-swipe').classList.toggle('on',m==='swipe');document.getElementById('vt-list').classList.toggle('on',m==='list');document.getElementById('view-swipe').style.display=m==='swipe'?'flex':'none';document.getElementById('view-list').style.display=m==='list'?'flex':'none'}

/* ═══ SCHEDULE (uses DATA.schedulePattern + DATA.scheduleHours) ═══ */
let dragMode='free',isDragging=false;
function setDragMode(m){dragMode=m;['free','busy','clear'].forEach(x=>{document.getElementById('sm-'+x)?.classList.toggle('on',x===m)})}

const sgBody=document.getElementById('sg-body');
if(sgBody){
  const { scheduleHours, schedulePattern } = DATA; // ES6 destructuring
  scheduleHours.forEach((h,i)=>{
    const row=document.createElement('div');row.className='sg-row';
    const th=document.createElement('div');th.className='sg-time';th.textContent=h+':00';row.appendChild(th);
    for(let d=0;d<7;d++){
      const c=document.createElement('div');
      c.className='sg-cell'+(schedulePattern[i][d]?' '+schedulePattern[i][d]:'');
      c.addEventListener('mousedown',e=>{isDragging=true;applyCell(c);e.preventDefault()});
      c.addEventListener('mouseover',()=>{if(isDragging)applyCell(c)});
      c.addEventListener('touchstart',()=>{isDragging=true;applyCell(c)},{passive:true});
      c.addEventListener('touchmove',e=>{const t=e.touches[0];const el=document.elementFromPoint(t.clientX,t.clientY);if(el&&el.classList.contains('sg-cell'))applyCell(el)},{passive:true});
      row.appendChild(c);
    }
    sgBody.appendChild(row);
  });
  document.addEventListener('mouseup',()=>{isDragging=false;updateStats()});
  document.addEventListener('touchend',()=>{isDragging=false;updateStats()});
}

function applyCell(c){c.classList.remove('f','b');if(dragMode==='free')c.classList.add('f');if(dragMode==='busy')c.classList.add('b')}
function updateStats(){let f=0,b=0;document.querySelectorAll('#sg-body .sg-cell').forEach(c=>{if(c.classList.contains('f'))f++;else if(c.classList.contains('b'))b++});const cf=document.getElementById('cnt-free'),cb=document.getElementById('cnt-busy');if(cf)cf.textContent=f;if(cb)cb.textContent=b}
function clearAll(){document.querySelectorAll('#sg-body .sg-cell').forEach(c=>c.classList.remove('f','b'));updateStats()}

/* ═══ GENERAL CHANNEL ═══ */
function openGenProfile(name){
  const d=genProfiles[name];if(!d)return;
  const { av, mbti, major, year, score, online, bio, tags } = d; // ES6 destructuring
  document.getElementById('gpp-av').textContent=av;
  document.getElementById('gpp-name').textContent=name;
  document.getElementById('gpp-mbti').textContent=mbti;
  document.getElementById('gpp-dot').className='gen-pp-dot '+(online?'on':'off');
  document.getElementById('gpp-meta').textContent=`${major} · ${year}`;
  document.getElementById('gpp-score').textContent=`${score}%`;
  document.getElementById('gpp-fill').style.width=`${score}%`;
  document.getElementById('gpp-bio').textContent=bio;
  document.getElementById('gpp-tags').innerHTML=tags.map(t=>`<span class="gpp-tag">${t}</span>`).join('');
  document.getElementById('gpp-chat-btn').onclick=()=>{closeGeneral();go('chat');addToDmList(name,av,online);openDmWith(name,av,major,year,`${score}%`,online)};
  document.getElementById('gen-profile-panel').classList.add('open');
}
function closeGenProfile(){document.getElementById('gen-profile-panel').classList.remove('open')}
function openGeneral(){document.getElementById('gen-overlay').classList.add('open');document.querySelectorAll('.th-item').forEach(i=>i.classList.remove('on'));document.getElementById('gen-item').classList.add('on');setTimeout(()=>{const m=document.getElementById('gen-msgs');m.scrollTop=m.scrollHeight},50)}
function closeGeneral(){document.getElementById('gen-overlay').classList.remove('open');document.getElementById('gen-item').classList.remove('on')}
function sendGenMsg(){const inp=document.getElementById('gen-input');const t=inp.value.trim();if(!t)return;const msgs=document.getElementById('gen-msgs');const now=new Date();const ts=now.getHours()+':'+(now.getMinutes()+'').padStart(2,'0');const div=document.createElement('div');div.className='gen-msg';div.innerHTML=`<div class="gen-av" style="background:linear-gradient(135deg,var(--accent-lt),var(--accent))">😊</div><div class="gen-body"><div class="gen-head"><span class="gen-name" style="color:var(--accent)">Би</span><span class="gen-ts">${ts}</span></div><div class="gen-text">${t.replace(/</g,'&lt;')}</div></div>`;msgs.appendChild(div);inp.value='';msgs.scrollTop=msgs.scrollHeight}

/* ═══ ADD TO DM LIST ═══ */
function addToDmList(name,av,online){const list=document.getElementById('tab-dms');const dmId='dm-'+name.replace(/\s+/g,'');if(document.getElementById(dmId))return;const cats=list.querySelectorAll('.tc-cat');let insertAfter=cats[1]||cats[0];const item=document.createElement('div');item.className='th-item';item.id=dmId;item.innerHTML=`<div class="th-av">${av}${online?'<div class="th-on"></div>':''}</div><div class="th-body"><div class="th-row"><div class="th-name">${name}</div><div class="th-time">Одоо</div></div><div class="th-pre new">Шинэ яриа</div></div>`;item.onclick=function(){const d=genProfiles[name];if(d)openDmWith(name,d.av,d.major,d.year,`${d.score}%`,d.online);document.querySelectorAll('.th-item').forEach(i=>i.classList.remove('on'));item.classList.add('on')};if(insertAfter&&insertAfter.nextSibling)list.insertBefore(item,insertAfter.nextSibling);else list.appendChild(item)}

/* ═══ OPEN DM ═══ */
function openDmWith(name,av,major,year,score,online){document.getElementById('cbar-av').textContent=av;document.getElementById('cbar-name').textContent=name;const s=document.getElementById('cbar-status');s.textContent=online?'● Онлайн байна':'⊘ Офлайн';s.style.color=online?'#059669':'#94A3B8';document.getElementById('cbar-sub').textContent=`${major} · ${year} · ${score} таарсан`;document.querySelector('.chat-inp').placeholder=`${name} руу мессеж...`;document.querySelectorAll('.th-item').forEach(i=>i.classList.remove('on'));const dmItem=document.getElementById('dm-'+name.replace(/\s+/g,''));if(dmItem)dmItem.classList.add('on');const msgs=document.getElementById('msgs-container');if(msgs&&!msgs.querySelector('.msg-row')){msgs.innerHTML=`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:48px 20px;text-align:center"><div style="font-size:56px">${av}</div><div style="font-family:var(--fd);font-size:24px;font-weight:800;color:var(--ink)">${name}</div><div style="font-size:13px;color:var(--sub)">${major} · ${year} · ${score}</div><div style="margin-top:8px;padding:10px 20px;background:var(--accent-g);border:1px solid var(--accent-gw);border-radius:var(--r);font-size:13px;color:var(--accent)">👋 Анхны мессежээ илгээгээрэй</div></div>`}const dmsTab=document.querySelector('.chat-tab');if(dmsTab){document.querySelectorAll('.chat-tab').forEach(t=>t.classList.remove('on'));dmsTab.classList.add('on');document.getElementById('tab-dms').style.display='block';document.getElementById('tab-people').style.display='none'}closeUserPanel()}

/* ═══ CHAT ═══ */
function switchChatTab(tab,btn){document.querySelectorAll('.chat-tab').forEach(b=>b.classList.remove('on'));btn.classList.add('on');document.getElementById('tab-dms').style.display=tab==='dms'?'block':'none';document.getElementById('tab-people').style.display=tab==='people'?'block':'none'}

// ES6: chatData-г DATA.users-аас динамикаар үүсгэх (reduce + destructuring)
const chatData = DATA.users
  .filter(u => ['enkh','bat','tem'].includes(u.id))
  .reduce((acc, { id, av, name, online, major, year, score }) => {
    acc[id === 'enkh' ? 'enkhtuya' : id === 'bat' ? 'batmonkh' : 'temuulen'] = {
      av, name,
      status: online ? '● Онлайн байна' : '⊘ Офлайн',
      sub: `${major} · ${year} · ${score}%`,
      ph: name
    };
    return acc;
  }, {});

function openChat(id){const d=chatData[id];if(!d)return;document.getElementById('cbar-av').textContent=d.av;document.getElementById('cbar-name').textContent=d.name;document.getElementById('cbar-status').textContent=d.status;document.getElementById('cbar-status').style.color=d.status.startsWith('●')?'#059669':'#94A3B8';document.getElementById('cbar-sub').textContent=d.sub;document.querySelector('.chat-inp').placeholder=d.ph+' руу мессеж...';document.querySelectorAll('.th-item').forEach(i=>i.classList.remove('on'));event.currentTarget.classList.add('on');closeUserPanel()}

/* ═══ USER PANEL ═══ */
let _cp={};
function showUserProfile(name,av,mbti,major,year,score,online,tags,bio){_cp={name,av,mbti,major,year,score,online,tags,bio};const pct=parseInt(score);document.getElementById('up-avatar').textContent=av;document.getElementById('up-name').textContent=name;document.getElementById('up-mbti').textContent=mbti;document.getElementById('up-meta').textContent=major+' · '+year;document.getElementById('up-score').textContent=score;document.getElementById('up-fill').style.width=pct+'%';document.getElementById('up-fill').style.background=pct>=80?'linear-gradient(90deg,var(--accent),var(--accent-h))':pct>=65?'linear-gradient(90deg,var(--warn),#fbbf24)':'linear-gradient(90deg,var(--blue),#60a5fa)';const dot=document.getElementById('up-dot');dot.classList.toggle('on',online);dot.classList.toggle('off',!online);document.getElementById('up-tags').innerHTML=tags.map(t=>`<span class="up-tag">${t}</span>`).join('');document.getElementById('up-bio').textContent=bio;document.getElementById('up-chat-btn').textContent='💬 '+name+' руу мессеж';document.getElementById('user-panel').classList.add('open')}
function closeUserPanel(){document.getElementById('user-panel').classList.remove('open')}
function startChatFromPanel(){const d=_cp;document.getElementById('cbar-av').textContent=d.av;document.getElementById('cbar-name').textContent=d.name;document.getElementById('cbar-status').textContent=d.online?'● Онлайн':'⊘ Офлайн';document.getElementById('cbar-status').style.color=d.online?'#059669':'#94A3B8';document.getElementById('cbar-sub').textContent=d.major+' · '+d.year+' · '+d.score;document.querySelector('.chat-inp').placeholder=d.name+' руу мессеж...';const msgs=document.getElementById('msgs-container');msgs.innerHTML=`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:40px 20px;text-align:center"><div style="font-size:48px">${d.av}</div><div style="font-family:var(--fd);font-size:20px;font-weight:800;color:var(--ink)">${d.name}</div><div style="font-size:12px;color:var(--sub)">${d.major} · ${d.year}</div><div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;margin-top:4px">${d.tags.map(t=>`<span class="up-tag">${t}</span>`).join('')}</div><div style="font-size:12px;color:var(--sub);margin-top:8px;max-width:300px">${d.bio}</div><div style="font-size:11px;color:var(--accent);margin-top:4px">👋 Анхны мессежээ илгээгээрэй</div></div>`;closeUserPanel();switchChatTab('dms',document.querySelector('.chat-tab'))}

/* ═══ SEND MSG ═══ */
function sendMsg(){const inp=document.getElementById('chat-input');const t=inp.value.trim();if(!t)return;const msgs=document.getElementById('msgs-container');const now=new Date();const ts=now.getHours()+':'+(now.getMinutes()+'').padStart(2,'0');const r=document.createElement('div');r.className='msg-row me';r.innerHTML=`<div class="msg-av">😊</div><div class="msg-content"><div class="msg-sender me-n">Би <span class="msg-ts">${ts}</span></div><div class="bubble">${t.replace(/</g,'&lt;')}</div></div>`;msgs.appendChild(r);inp.value='';msgs.scrollTop=msgs.scrollHeight}

/* ═══ KEYBOARD ═══ */
document.addEventListener('keydown', (e) => {
  if(e.key==='Escape'){closeUserPanel();closeGenProfile();document.getElementById('mm')?.classList.remove('show');const genOv=document.getElementById('gen-overlay');if(genOv?.classList.contains('open'))closeGeneral()}
});

/* ═══ YEAR PILLS — SINGLE SELECT ═══ */
document.querySelectorAll('.row2 .pill-row').forEach(row=>{
  row.querySelectorAll('.pill').forEach(p=>{
    p.addEventListener('click',()=>{
      row.querySelectorAll('.pill').forEach(x=>x.classList.remove('on'));
      p.classList.add('on');
    });
  });
});

/* ═══ OTP AUTO-FOCUS ═══ */
document.querySelectorAll('.otp-inp').forEach((inp,i,all)=>{
  inp.addEventListener('input',function(){
    if(this.value.length===1){this.classList.add('filled');if(i<all.length-1)all[i+1].focus()}
  });
  inp.addEventListener('keydown',function(e){
    if(e.key==='Backspace'&&!this.value&&i>0){all[i-1].focus();all[i-1].classList.remove('filled')}
  });
});

// ══════════════════════════════════════════════════════════════
//  WINDOW EXPORTS — HTML onclick-аас дуудагддаг функцүүд
//  ES6 module scope-оос гарч window-д холбоно
// ══════════════════════════════════════════════════════════════
Object.assign(window, {
  go, toggleTheme,
  clearMbti, setView,
  setDragMode, clearAll,
  openGeneral, closeGeneral, openGenProfile, closeGenProfile, sendGenMsg,
  openChat, showUserProfile, closeUserPanel, startChatFromPanel,
  sendMsg, switchChatTab
});

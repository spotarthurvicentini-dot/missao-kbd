const MANAGER_ICONS = {
  grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  pulse:'<svg viewBox="0 0 24 24"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>',
  users:'<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>',
  book:'<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z"/><path d="M8 7h8M8 11h6"/></svg>',
  logout:'<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  calendar:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
  menu:'<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>',
  play:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  warning:'<svg viewBox="0 0 24 24"><path d="M10.3 3.7 2.5 17.5A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.5L13.7 3.7a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>'
};

const REGION_NAMES = { SP:'São Paulo', PR:'Paraná', SC:'Santa Catarina', RS:'Rio Grande do Sul' };
const currentManagerRole = sessionStorage.getItem('KBD_AUTH_ROLE') || '';
const currentManagerUser = localStorage.getItem('SETOR') || '';
let managementReport = null;
let managementCycle = null;
let teamSearchTerm = '';
let teamPage = 1;
const TEAM_PAGE_SIZE = 50;

function managerIcon(name){ return MANAGER_ICONS[name] || MANAGER_ICONS.grid; }
function managerEscape(value){ return String(value ?? '').replace(/[&<>'"]/g,char=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char])); }
function managerPercent(value){ return value === null || value === undefined ? '—' : `${Number(value)}%`; }
function managerDate(value){ if(!value)return 'Sem login';const date=new Date(value);return Number.isNaN(date.getTime())?'Sem login':date.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'}); }
function managerRegion(value){ return REGION_NAMES[value] || value || 'Sem regional'; }

function renderManagerLoading(){
  document.getElementById('kpiGrid').innerHTML=['Equipe vinculada','Acessos únicos','Andamento','Índice de acerto'].map(label=>`<article class="kpi-card"><div class="kpi-top"><span>${label}</span></div><div class="kpi-value">—</div><div class="kpi-foot">Carregando dados reais…</div></article>`).join('');
  document.getElementById('engagementChart').innerHTML='<div class="empty-search">Carregando evolução do período…</div>';
  document.getElementById('healthBars').innerHTML='<div class="empty-search">Carregando indicadores…</div>';
  document.getElementById('regionTable').innerHTML='<div class="empty-search">Carregando regionais…</div>';
  document.getElementById('attentionList').innerHTML='<div class="empty-search">Carregando alertas…</div>';
  document.getElementById('operationContent').innerHTML='<div class="empty-search">Carregando operação…</div>';
  document.getElementById('teamContent').innerHTML='<div class="empty-search">Carregando equipe…</div>';
}

async function loadManagementData(){
  const token=sessionStorage.getItem('KBD_AUTH_TOKEN')||'';
  try{
    const response=await fetch(GOOGLE_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'dashboard',setor:currentManagerUser,days:30,token}),cache:'no-store'});
    const data=await response.json();
    if(!response.ok||!data.ok||!data.report)throw new Error(data.error||'Não foi possível carregar o painel.');
    managementReport=data.report;
    managementCycle=data.cycle||null;
    const cycleLabel=document.getElementById('cycleLabel');
    if(cycleLabel&&managementCycle)cycleLabel.textContent=managementCycle.name;
    document.getElementById('updatedAt').innerHTML='<i class="status-dot"></i> Dados reais atualizados agora';
    renderManagementAll();
  }catch(error){
    const message=error?.message||'Não foi possível carregar os dados.';
    document.getElementById('updatedAt').textContent=message;
    document.getElementById('adminPage').querySelectorAll('.empty-search').forEach(el=>el.textContent='Dados indisponíveis. Nenhum valor estimado será exibido.');
    document.getElementById('kpiGrid').querySelectorAll('.kpi-foot').forEach(el=>el.textContent='Dados indisponíveis.');
    if(/sessão|expirada|inválida/i.test(message)){sessionStorage.removeItem('KBD_AUTH_TOKEN');sessionStorage.removeItem('KBD_AUTH_ROLE');setTimeout(()=>window.location.replace('index.html'),1200);}
  }
}

function renderManagerKpis(){
  const totals=managementReport.totals;
  const cards=[
    ['users','Equipe vinculada',totals.linkedPromoters,`${totals.linkedPromoters} promotores no catálogo`,'Promotores distintos vinculados no catálogo vigente.'],
    ['pulse','Acessos únicos',totals.activePromoters,`${totals.activePromoters} promotores • ${totals.accesses} eventos de login`,managementReport.definitions.activePromoters],
    ['target','Andamento dos quizzes',`${totals.completionRate}%`,`${totals.completedKbdCount}/${totals.eligibleKbdCount} quizzes dos 9 KBDs publicados`,managementReport.definitions.completion],
    ['check','Índice de acerto',managerPercent(totals.accuracy),totals.questions?`${totals.correct}/${totals.questions} respostas do quiz mais recente`:'Sem quiz concluído no ciclo',managementReport.definitions.accuracy]
  ];
  document.getElementById('kpiGrid').innerHTML=cards.map(([icon,label,value,detail,definition])=>`<article class="kpi-card" title="${managerEscape(definition||'')}"><div class="kpi-top"><span>${managerEscape(label)}</span><span class="kpi-icon">${managerIcon(icon)}</span></div><div class="kpi-value">${managerEscape(value)}</div><div class="kpi-foot">${managerEscape(detail)}</div></article>`).join('');
}

function renderManagerTrend(){
  const rows=managementReport.weeklyTrend||[];
  if(!rows.length){document.getElementById('engagementChart').innerHTML='<div class="empty-search">Sem dados no período.</div>';return;}
  const maxValue=Math.max(1,...rows.flatMap(row=>[row.activePromoters,row.quizAttempts]));
  const points=(key)=>rows.map((row,index)=>`${rows.length===1?50:index*100/(rows.length-1)},${110-(Number(row[key]||0)*90/maxValue)}`).join(' ');
  document.getElementById('engagementChart').innerHTML=`<svg viewBox="0 0 100 120" preserveAspectRatio="none"><path class="chart-grid" d="M0 20H100M0 50H100M0 80H100M0 110H100"/><polyline points="${points('activePromoters')}" fill="none" stroke="#38d4e8" stroke-width="1.8" vector-effect="non-scaling-stroke"/><polyline points="${points('quizAttempts')}" fill="none" stroke="#9b7bff" stroke-width="1.8" vector-effect="non-scaling-stroke"/></svg><div class="chart-labels">${rows.map(row=>`<span title="${row.activePromoters} acessos únicos • ${row.accesses} eventos • ${row.quizAttempts} tentativas">${managerEscape(row.label)}</span>`).join('')}</div>`;
}

function renderManagerIndicators(){
  const totals=managementReport.totals;
  const activation=totals.linkedPromoters?Math.round(totals.activePromoters*100/totals.linkedPromoters):0;
  const metrics=[['Ativação',activation,`${totals.activePromoters}/${totals.linkedPromoters}`],['Quizzes',totals.completionRate,`${totals.completedKbdCount}/${totals.eligibleKbdCount}`],['Conhecimento',totals.accuracy,totals.questions?`${totals.correct}/${totals.questions}`:'Sem base']];
  document.getElementById('healthBars').innerHTML=metrics.map(([label,value,detail])=>`<div class="health-row"><span>${managerEscape(label)}</span><div class="bar"><i style="width:${value===null?0:value}%"></i></div><b title="${managerEscape(detail)}">${managerPercent(value)}</b></div>`).join('');
}

function renderManagerRegions(){
  const rows=managementReport.regionalPerformance||[];
  document.getElementById('regionTable').innerHTML='<div class="region-row header"><span>Regional</span><span>Conclusão</span><span>Acerto</span><span>Equipe</span><span></span></div>'+rows.map((row,index)=>`<div class="region-row"><span class="region-name"><i class="region-avatar">${index+1}</i>${managerEscape(managerRegion(row.regional))}</span><span class="table-progress"><span class="bar"><i style="width:${row.completionRate}%"></i></span><b>${row.completionRate}%</b></span><b>${managerPercent(row.accuracy)}</b><span>${row.activePromoters}/${row.linkedPromoters} ativos</span><span></span></div>`).join('');
}

function renderManagerAttention(){
  const rows=managementReport.attention||[];
  const total=Number(managementReport.totals.attentionPeopleCount||0);
  document.querySelector('.count-badge').textContent=String(total);
  document.querySelector('.count-badge').title=`${total} promotores distintos com alerta`;
  document.getElementById('attentionList').innerHTML=rows.length?rows.map(row=>`<div class="attention-item"><span class="attention-icon ${row.severity==='high'?'red':'amber'}">${managerIcon('warning')}</span><div><strong>${managerEscape(row.label)}</strong><p>Regra calculada com atividade recente e avanço do ciclo.</p></div><span>${row.count}</span></div>`).join(''):'<div class="empty-search">Nenhum alerta calculado.</div>';
}

function renderManagerOperation(){
  const totals=managementReport.totals;
  const modules=[
    ['users','Promotores vinculados',totals.linkedPromoters,'Catálogo vigente'],
    ['pulse','Acessos únicos',totals.activePromoters,'Promotores distintos com login'],
    ['users','Promotor-dias',totals.promoterDays,'Promotor + dia distintos no período'],
    ['check','Quizzes concluídos',totals.completedKbdCount,`De ${totals.eligibleKbdCount} quizzes dos 9 KBDs publicados`],
    ['play','Vídeo assistido',`${totals.videoAveragePercent}%`,'Maior progresso por promotor e KBD'],
    ['target','Acerto',managerPercent(totals.accuracy),totals.questions?'Quiz mais recente do ciclo':'Sem base no ciclo']
  ];
  document.getElementById('operationContent').innerHTML='<div class="module-grid">'+modules.map(([icon,label,value,detail])=>`<article class="module-card"><span class="module-icon">${managerIcon(icon)}</span><div class="big">${managerEscape(value)}</div><h3>${managerEscape(label)}</h3><p>${managerEscape(detail)}</p></article>`).join('')+'</div>';
}

function filteredManagerPeople(){
  const term=teamSearchTerm.trim().toLowerCase();
  return (managementReport.people||[]).filter(person=>!term||`${person.sector} ${person.coordinator} ${person.regional}`.toLowerCase().includes(term));
}

function renderManagerTeam(){
  const all=filteredManagerPeople();
  const pages=Math.max(1,Math.ceil(all.length/TEAM_PAGE_SIZE));
  teamPage=Math.min(teamPage,pages);
  const start=(teamPage-1)*TEAM_PAGE_SIZE;
  const people=all.slice(start,start+TEAM_PAGE_SIZE);
  document.getElementById('teamContent').innerHTML=`<div class="team-toolbar"><input id="teamSearch" value="${managerEscape(teamSearchTerm)}" placeholder="Buscar por promotor, coordenador ou regional"><span class="team-count">${all.length} promotores</span></div><div class="team-table"><div class="team-row header"><span>Promotor</span><span>Coordenador</span><span>Regional</span><span>Andamento</span><span>Acerto</span><span>Último login</span></div>${people.map(person=>`<button type="button" class="team-row team-row-clickable" data-promoter="${managerEscape(person.sector)}" aria-label="Abrir desempenho de ${managerEscape(person.sector)}"><span class="person"><i class="mini-avatar">${managerEscape(person.sector.slice(0,2))}</i><span><strong>${managerEscape(person.sector)}</strong><small>${person.completedKbdCount}/${person.eligibleKbdCount} quizzes • ver KBDs</small></span></span><span>${managerEscape(person.coordinator)}</span><span>${managerEscape(managerRegion(person.regional))}</span><span>${person.completionRate}%</span><span class="score-chip ${person.accuracy!==null&&person.accuracy<70?'warn':''}">${managerPercent(person.accuracy)}</span><span>${managerEscape(managerDate(person.lastAccessAt))}</span></button>`).join('')||'<div class="empty-search">Nenhum promotor encontrado.</div>'}</div><div class="pagination"><button class="btn secondary" id="prevTeam" ${teamPage<=1?'disabled':''}>Anterior</button><span>Página ${teamPage} de ${pages}</span><button class="btn secondary" id="nextTeam" ${teamPage>=pages?'disabled':''}>Próxima</button></div>`;
  document.getElementById('teamSearch').addEventListener('input',event=>{teamSearchTerm=event.target.value;teamPage=1;renderManagerTeam();});
  document.getElementById('prevTeam').onclick=()=>{if(teamPage>1){teamPage-=1;renderManagerTeam();}};
  document.getElementById('nextTeam').onclick=()=>{if(teamPage<pages){teamPage+=1;renderManagerTeam();}};
  document.querySelectorAll('[data-promoter]').forEach(button=>button.onclick=()=>openPromoterDetail(button.dataset.promoter));
}

function closePromoterDetail(){
  const backdrop=document.getElementById('promoterDrawerBackdrop');
  backdrop?.classList.remove('open');
  backdrop?.setAttribute('aria-hidden','true');
  document.body.classList.remove('drawer-open');
}

function renderPromoterDetail(data){
  const person=data.person;
  const groups=(data.kbds||[]).reduce((all,row)=>{const brand=row.brand||'Outros';(all[brand]||(all[brand]=[])).push(row);return all;},{});
  const completed=Number(person.completedKbdCount||0);
  const eligible=Number(person.eligibleKbdCount||9);
  const activeDays=Number(person.activeDays||0);
  document.getElementById('promoterDrawerSubtitle').textContent=`${person.coordinator} • ${managerRegion(person.regional)} • ciclo ${data.cycle?.name||'vigente'}`;
  document.getElementById('promoterDrawerContent').innerHTML=`<div class="promoter-summary"><article><small>Quizzes concluídos</small><strong>${completed}/${eligible}</strong></article><article><small>Acerto no ciclo</small><strong>${managerPercent(person.accuracy)}</strong></article><article><small>Dias com acesso</small><strong>${activeDays} ${activeDays===1?'dia':'dias'}</strong></article><article><small>Último login</small><strong>${managerEscape(managerDate(person.lastAccessAt))}</strong></article></div><div class="brand-groups">${Object.entries(groups).map(([brand,rows])=>`<section class="brand-group"><header><span class="brand-avatar">${managerEscape(brand.slice(0,2))}</span><div><h3>${managerEscape(brand)}</h3><p>${rows.filter(row=>row.completedPromoters>0).length}/${rows.length} KBDs concluídos</p></div></header><div class="kbd-detail-head"><span>KBD</span><span>Status</span><span>Resultado</span><span>Vídeo</span></div>${rows.map(row=>`<div class="kbd-detail-row"><strong>${managerEscape(row.kbd)}</strong><span class="kbd-status ${row.completedPromoters>0?'done':'pending'}">${row.completedPromoters>0?'Quiz concluído':'Não concluído'}</span><span><b>${row.questions?`${row.correct}/${row.questions}`:'—'}</b><small>${row.accuracy===null||row.accuracy===undefined?'Sem resultado':`${managerPercent(row.accuracy)} de acerto`}</small></span><span><b>${Number(row.videoAveragePercent||0)}%</b><small>assistido</small></span></div>`).join('')}</section>`).join('')}</div>`;
}

async function openPromoterDetail(promoter){
  const backdrop=document.getElementById('promoterDrawerBackdrop');
  document.getElementById('promoterDrawerTitle').textContent=promoter;
  document.getElementById('promoterDrawerSubtitle').textContent='Carregando dados reais do ciclo…';
  document.getElementById('promoterDrawerContent').innerHTML='<div class="empty-search">Consultando quizzes e progresso dos 9 KBDs…</div>';
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden','false');
  document.body.classList.add('drawer-open');
  try{
    const token=sessionStorage.getItem('KBD_AUTH_TOKEN')||'';
    const response=await fetch(GOOGLE_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'promoterDetail',setor:currentManagerUser,promoter,token}),cache:'no-store'});
    const data=await response.json();
    if(!response.ok||!data.ok||!data.person||!Array.isArray(data.kbds))throw new Error(data.error||'Não foi possível carregar o promotor.');
    if(document.getElementById('promoterDrawerTitle').textContent!==promoter)return;
    renderPromoterDetail(data);
  }catch(error){
    document.getElementById('promoterDrawerSubtitle').textContent='Dados indisponíveis';
    document.getElementById('promoterDrawerContent').innerHTML=`<div class="empty-search">${managerEscape(error?.message||'Não foi possível carregar o desempenho.')}</div>`;
  }
}

function renderManagementAll(){renderManagerKpis();renderManagerTrend();renderManagerIndicators();renderManagerRegions();renderManagerAttention();renderManagerOperation();renderManagerTeam();}
function closeManagerSidebar(){document.getElementById('sidebar')?.classList.remove('open');document.body.classList.remove('menu-open');}
function showManagerView(name){document.querySelectorAll('.view').forEach(view=>view.classList.toggle('active',view.dataset.page===name));document.querySelectorAll('.nav-item[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===name));closeManagerSidebar();window.scrollTo(0,0);}

function searchManagement(value){teamSearchTerm=value;teamPage=1;showManagerView('team');if(managementReport)renderManagerTeam();}

function updateManagerGlobalSearch(value){
  const box=document.getElementById('searchResults');
  const term=value.trim().toLowerCase();
  if(!managementReport||term.length<2){box.classList.remove('open');box.innerHTML='';return;}
  const people=(managementReport.people||[]).filter(person=>`${person.sector} ${person.coordinator} ${person.regional}`.toLowerCase().includes(term)).slice(0,8);
  box.innerHTML=people.length?people.map(person=>`<button class="search-result" data-search-sector="${managerEscape(person.sector)}"><i class="mini-avatar">${managerEscape(person.sector.slice(0,2))}</i><span><strong>${managerEscape(person.sector)}</strong><small>Coordenador ${managerEscape(person.coordinator)} • ${managerEscape(managerRegion(person.regional))}</small></span><span>Abrir equipe</span></button>`).join(''):'<div class="empty-search">Nenhum setor encontrado.</div>';
  box.classList.add('open');
  box.querySelectorAll('[data-search-sector]').forEach(button=>button.onclick=()=>{document.getElementById('globalSearch').value=button.dataset.searchSector;box.classList.remove('open');searchManagement(button.dataset.searchSector);});
}

function initAdmin(){
  const token=sessionStorage.getItem('KBD_AUTH_TOKEN');
  if(!currentManagerUser||!token||!['admin','manager'].includes(currentManagerRole)){window.location.replace('index.html');return;}
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=managerIcon(el.dataset.icon));
  const avatar=document.getElementById('managerSectorAvatar');
  if(avatar)avatar.textContent=currentManagerRole==='admin'?'SPOT':currentManagerUser;
  document.querySelector('.admin-user strong').textContent='Gestor';
  document.querySelector('.admin-user small').textContent=currentManagerRole==='admin'?'SPOT':currentManagerUser;
  document.querySelector('.scope-tabs').innerHTML=`<button class="active">${currentManagerRole==='admin'?'Todas as equipes':'Minha equipe'}</button>`;
  if(currentManagerRole==='manager'){
    document.querySelector('[data-page="overview"] .page-head p').textContent='Acompanhe somente os promotores vinculados ao seu setor.';
    document.querySelector('[data-page="team"] h1').textContent='Minha equipe e KBDs';
  }
  renderManagerLoading();
  document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>showManagerView(button.dataset.view));
  const search=document.getElementById('globalSearch');
  search.addEventListener('input',()=>updateManagerGlobalSearch(search.value));
  search.addEventListener('keydown',event=>{if(event.key==='Enter'&&search.value.trim()){document.getElementById('searchResults').classList.remove('open');searchManagement(search.value);}});
  document.addEventListener('click',event=>{if(!event.target.closest('.global-search'))document.getElementById('searchResults').classList.remove('open');});
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus();}});
  document.getElementById('menuButton').onclick=()=>{const open=document.getElementById('sidebar').classList.toggle('open');document.body.classList.toggle('menu-open',open);};
  document.getElementById('sidebarBackdrop').onclick=closeManagerSidebar;
  document.getElementById('closePromoterDrawer').onclick=closePromoterDetail;
  document.getElementById('promoterDrawerBackdrop').addEventListener('click',event=>{if(event.target.id==='promoterDrawerBackdrop')closePromoterDetail();});
  document.addEventListener('click',event=>{if(window.matchMedia('(max-width: 760px)').matches&&document.getElementById('sidebar').classList.contains('open')&&!event.target.closest('#sidebar')&&!event.target.closest('#menuButton'))closeManagerSidebar();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closePromoterDetail();});
  loadManagementData();
}

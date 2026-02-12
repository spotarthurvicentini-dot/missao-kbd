// ====== CONFIGURAÇÃO GOOGLE SHEETS ======
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyWERu4e0iNLGkeB3Xq8Ou1dM4FFGI7SQagRVEjhCNIc-4gVAyt4DJPNe_rp9Le6kM/exec";

// ====== DADOS ======
const CONTENT = {
  marcas: [
    { id: "always", nome: "ALWAYS", logo: "logos/always.jpg", kbds: [{ id: "kbd1", nome: "KBD Absorventes – Always Suave", videoId: null, imagens: [] }] },
    { id: "downy", nome: "DOWNY", logo: "logos/downy.png", kbds: [{ id: "kbd1", nome: "KBD Ponto Extra – Brisa", videoId: "sY8R7z2jwuI", imagens: [] }, { id: "kbd2", nome: "KBD Bloco Azul (50%)", videoId: null, imagens: [] }, { id: "kbd3", nome: "KBD Bloco Colorido (40%) ou [Alfazema ou Lírios]", videoId: null, imagens: [] }] },
    { id: "pantene", nome: "PANTENE", logo: "logos/pantene.png", kbds: [{ id: "kbd1", nome: "KBD Bond Repair (20%)", videoId: null, imagens: [] }, { id: "kbd2", nome: "KBD Top Versões – Bambu, Colágeno e Biotinamina B3 (40%)", videoId: null, imagens: [] }, { id: "kbd3", nome: "KBD Óleo – 2 Pontos de Contato", videoId: null, imagens: [] }, { id: "kbd4", nome: "KBD Rio/Cachoeira Dourada", videoId: null, imagens: [] }] },
    { id: "pampers", nome: "PAMPERS", logo: "logos/pampers.png", kbds: [{ id: "kbd1", nome: "KBD Ponto Extra – 50% Tamanhos Grandes", videoId: null, imagens: [] }, { id: "kbd2", nome: "KBD Pants", videoId: null, imagens: [] }, { id: "kbd3", nome: "KBD Pants + Premium (Lojas Sul)", videoId: null, imagens: [] }, { id: "kbd4", nome: "KBD Vale Night – SOS Gôndola", videoId: null, imagens: [] }, { id: "kbd5", nome: "KBD Vale Night – Ponto Extra Farma", videoId: null, imagens: [] }] },
    { id: "secret", nome: "SECRET", logo: "logos/secret.png", kbds: [{ id: "kbd1", nome: "KBD 2 Bandejas", videoId: null, imagens: [] }, { id: "kbd2", nome: "KBD Bloco 15 Frentes ou 3 Bandejas", videoId: null, imagens: [] }] },
    { id: "oral-b", nome: "ORAL-B", logo: "logos/oral-b.png", kbds: [{ id: "kbd1", nome: "KBD Branqueamento (60%)", videoId: null, imagens: [] }, { id: "kbd2", nome: "KBD 2 Pontos de Contato – Escovas", videoId: null, imagens: [] }, { id: "kbd3", nome: "KBD Layout BIPE – Escovas", videoId: null, imagens: [] }] },
    { id: "gillette", nome: "GILLETTE", logo: "logos/gillette.png", kbds: [{ id: "kbd1", nome: "KBD Sistemas – % de Ganchos", videoId: null, imagens: [] }, { id: "kbd2", nome: "KBD 2 Pontos de Contato – Mach3/Presto3", videoId: null, imagens: [] }, { id: "kbd3", nome: "KBD Carga Mach3 c/8 – 2 Ganchos", videoId: "qaQl_otdN9Y", imagens: [] }] },
    { id: "venus", nome: "VENUS", logo: "logos/venus.png", kbds: [{ id: "kbd1", nome: "KBD Sistemas – 20% de Ganchos", videoId: null, imagens: [] }, { id: "kbd2", nome: "KBD 2 Pontos de Contato", videoId: null, imagens: [] }, { id: "kbd3", nome: "KBD Checkout – Venus Pele Sensível", videoId: null, imagens: [] }] }
  ]
};

function criarModal(c) {
  const o = document.createElement('div');
  o.className = 'modal-overlay';
  o.innerHTML = `<div class="modal-content"><div class="modal-icon">${c.icon}</div><div class="modal-title">${c.title}</div><div class="modal-text">${c.text}</div><div class="modal-buttons">${c.buttons.map(b => `<button class="modal-btn ${b.class}" onclick="${b.action}">${b.label}</button>`).join('')}</div></div>`;
  document.body.appendChild(o);
  return o;
}

function fecharModal() { const o = document.querySelector('.modal-overlay'); if (o) o.remove(); }
function confirmarSaida() { criarModal({ icon: '⚠️', title: 'Tem certeza?', text: 'Ao sair, você perderá todo o progresso.', buttons: [{ label: 'Sim, sair', class: 'modal-btn-confirm', action: 'sairConfirmado()' }, { label: 'Cancelar', class: 'modal-btn-cancel', action: 'fecharModal()' }] }); }
function sairConfirmado() { localStorage.removeItem("SETOR"); window.location.href = "index.html"; }
function entrar() { const s = document.getElementById("setor").value.trim().toUpperCase(); if (!s) return alert("Digite seu setor"); if (!s.startsWith("SPI")) return alert("Setor inválido"); localStorage.setItem("SETOR", s); window.location.href = "home.html"; }
function getSetor() { return (localStorage.getItem("SETOR") || "").trim(); }
function ensureSetor() { if (!getSetor()) window.location.href = "index.html"; }
function trocarSetor() { confirmarSaida(); }

// ====== APP SHELL (TOP + BOTTOM NAV) ======
function goBackFallback(fallbackHref){
  if (window.history.length > 1) window.history.back();
  else window.location.href = fallbackHref || "home.html";
}

function openMenu(){
  const existing = document.getElementById("appMenuOverlay");
  if (existing) return;

  const overlay = document.createElement("div");
  overlay.id = "appMenuOverlay";
  overlay.className = "modal-overlay";

  const params = new URLSearchParams(window.location.search);
  const marca = params.get("marca");

  overlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-title">Menu</div>

      <div class="modal-actions">
        <button class="modal-btn primary" onclick="window.location.href='home.html'">🏠 Home</button>
        <button class="modal-btn primary" onclick="window.location.href='marcas.html'">🗂️ Marcas</button>
        <button class="modal-btn primary" onclick="window.location.href='quiz.html'">📝 Quiz</button>
        ${marca ? `<button class="modal-btn" onclick="window.location.href='marca.html?marca=${encodeURIComponent(marca)}'">🧩 KBDs da marca</button>` : ``}
        <button class="modal-btn" onclick="confirmarSaida()">🔁 Trocar setor</button>
        <button class="modal-btn" onclick="closeMenu()">Fechar</button>
      </div>
    </div>`;

  overlay.addEventListener("click", (e)=>{ if(e.target===overlay) closeMenu(); });
  document.body.appendChild(overlay);
}

function closeMenu(){
  const el = document.getElementById("appMenuOverlay");
  if (el) el.remove();
}

function injectShell(opts){
  // opts: {active:'home|aula|quiz|fotos|videos', title, subtitle, backFallback}
  const already = document.querySelector(".appbar");
  if (already) return;

  const title = opts?.title || "Missão KBD";
  const subtitle = opts?.subtitle || "";
  const active = opts?.active || "";
  const backFallback = opts?.backFallback || "home.html";

  const params = new URLSearchParams(window.location.search);
  const marca = params.get("marca");
  const kbd = params.get("kbd");

  const hrefAula   = (marca && kbd) ? `kbd.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}` : "home.html";
  const hrefQuiz   = (marca && kbd) ? `quiz.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}` : "home.html";
  const hrefFotos  = (marca && kbd) ? `kbd.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}&view=fotos` : "home.html";
  const hrefVideos = (marca && kbd) ? `kbd.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}&view=videos` : "home.html";

  const appbar = document.createElement("div");
  appbar.className = "appbar";
  appbar.innerHTML = `
    <div class="appbar-left">
      <button class="iconBtn" aria-label="Voltar" onclick="goBackFallback('${backFallback}')">←</button>
      <button class="iconBtn" aria-label="Menu" onclick="openMenu()">☰</button>
    </div>
    <div class="appbar-brand">
      <a class="brandLink" href="home.html" aria-label="Home">
        <img class="brandLogo" src="logo-topbar.png" alt="Missão KBD">
      </a>
      ${subtitle ? `<div class="brandSubtitle">${subtitle}</div>` : ``}
    </div>
    <div class="appbar-right">
      <div class="pill" id="pillSetor">---</div>
    </div>
  `;

const nav = document.createElement("nav");
  nav.className = "bottomNav";
  nav.innerHTML = `
    <a class="navItem ${active==='home'?'active':''}" href="home.html"><div class="navIcon">🏠</div><div>Home</div></a>
    <a class="navItem ${active==='marcas'?'active':''}" href="marcas.html"><div class="navIcon">🗂️</div><div>Marcas</div></a>
    <a class="navItem ${active==='quiz'?'active':''}" href="quiz.html"><div class="navIcon">📝</div><div>Quiz</div></a>
  `;
document.body.prepend(appbar);
  document.body.appendChild(nav);

  const pill = document.getElementById("pillSetor");
  if (pill) pill.textContent = getSetor() || "---";
}



function renderHome() {
  ensureSetor();
  injectShell({active:'home', title:'Missão KBD', subtitle:'Home', backFallback:'home.html'});
  const badge = document.getElementById("setorBadge");
  if (badge) badge.textContent = getSetor();
}

function renderMarcas() {
  ensureSetor();
  injectShell({active:'marcas', title:'Missão KBD', subtitle:'Marcas', backFallback:'home.html'});
  const lista = document.getElementById("listaMarcas");
  if (!lista) return;
  lista.innerHTML = "";
  CONTENT.marcas.forEach((m) => {
    const totalKbds = (m.kbds || []).length;
    const row = document.createElement("div");
    row.className = "card cardRow";
    row.innerHTML = `
      <div class="cardLogo"><img src="${m.logo}" alt="${m.nome}"></div>
      <div class="cardContent">
        <div class="cardTitle">${m.nome}</div>
        <div class="cardSub">${totalKbds} KBD${totalKbds > 1 ? 's' : ''}</div>
      </div>
    `;
    row.onclick = () => { window.location.href = "marca.html?marca=" + encodeURIComponent(m.id); };
    lista.appendChild(row);
  });
}

function voltarHome() { window.location.href = "home.html"; }

function renderMarca() {
  ensureSetor();
  injectShell({active:'marcas', title:'Missão KBD', subtitle:'Marcas', backFallback:'home.html'});
  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) { alert("Marca não encontrada"); voltarHome(); return; }
  document.getElementById("marcaTitulo").textContent = marca.nome;
  const topbarSetor = document.getElementById("topbarSetor");
  if (topbarSetor) topbarSetor.textContent = getSetor();
  const lista = document.getElementById("listaKbds");
  lista.innerHTML = "";
  marca.kbds.forEach(kbd => {
    const div = document.createElement("div");
    div.className = "card cardRow";
    div.innerHTML = `<div class="cardContent"><div class="cardTitle">${kbd.nome}</div><div class="cardSub">Clique para abrir</div></div>`;
    div.onclick = () => { window.location.href = "kbd.html?marca=" + encodeURIComponent(marca.id) + "&kbd=" + encodeURIComponent(kbd.id); };
    lista.appendChild(div);
  });
}

function voltarMarca() { const p = new URLSearchParams(window.location.search); window.location.href = "marca.html?marca=" + encodeURIComponent(p.get("marca")); }

function renderKbd() {
  ensureSetor();
  // view=fotos|videos controla o que aparece
  const _view = new URLSearchParams(window.location.search).get('view') || 'tudo';
  injectShell({active:'marcas', title:'Missão KBD', subtitle:'Aula prática', backFallback:'home.html'});
  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const kbdId = params.get("kbd");
  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) { alert("Marca não encontrada"); voltarHome(); return; }
  const kbd = (marca.kbds || []).find(k => k.id === kbdId);
  if (!kbd) { alert("KBD não encontrado"); voltarMarca(); return; }
  document.getElementById("kbdTitulo").textContent = `${marca.nome} • ${kbd.nome}`;
  // Dropdown: trocar KBD dentro da mesma marca
  const sel = document.getElementById("kbdSelect");
  if (sel) {
    sel.innerHTML = "";
    (marca.kbds || []).forEach(k => {
      const opt = document.createElement("option");
      opt.value = k.id;
      opt.textContent = k.nome;
      if (k.id === kbd.id) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.onchange = () => {
      const next = sel.value;
      const v = new URLSearchParams(window.location.search).get('view');
      const viewParam = v ? `&view=${encodeURIComponent(v)}` : '';
      window.location.href = `kbd.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(next)}${viewParam}`;
    };
  }

  // Tabs: Tudo / Vídeos / Fotos
  const view = new URLSearchParams(window.location.search).get('view') || 'tudo';
  const tabTudo = document.getElementById("tabTudo");
  const tabVideos = document.getElementById("tabVideos");
  const tabFotos = document.getElementById("tabFotos");
  const setActiveTab = () => {
    [tabTudo, tabVideos, tabFotos].forEach(t => t && t.classList.remove("active"));
    if (view === 'videos') tabVideos && tabVideos.classList.add("active");
    else if (view === 'fotos') tabFotos && tabFotos.classList.add("active");
    else tabTudo && tabTudo.classList.add("active");
  };
  const navToView = (v) => {
    const url = new URL(window.location.href);
    if (v === 'tudo') url.searchParams.delete('view');
    else url.searchParams.set('view', v);
    window.location.href = url.toString();
  };
  tabTudo && (tabTudo.onclick = () => navToView('tudo'));
  tabVideos && (tabVideos.onclick = () => navToView('videos'));
  tabFotos && (tabFotos.onclick = () => navToView('fotos'));
  setActiveTab();

  const iframe = document.getElementById("videoFrame");
  const placeholder = document.getElementById("videoPlaceholder");
  const linkBox = document.getElementById("videoLinkBox");
  const direct = document.getElementById("videoDirectLink");

  if (kbd.videoId) {
    iframe.src = "https://www.youtube-nocookie.com/embed/" + kbd.videoId + "?rel=0&modestbranding=1";
    iframe.style.display = "block";
    placeholder.style.display = "none";

    if (direct) direct.href = "https://youtu.be/" + kbd.videoId;
    if (linkBox) linkBox.style.display = "block";
  } else {
    iframe.style.display = "none";
    placeholder.style.display = "block";
    if (linkBox) linkBox.style.display = "none";
  }

  // Controla exibição por view
  const videoBox = document.getElementById("videoBox");
  const imgBox = document.getElementById("imagensKbd");
  if (videoBox) {
    videoBox.style.display = (view === 'fotos') ? "none" : "block";
  }
  if (imgBox) {
    imgBox.style.display = (view === 'videos') ? "none" : "grid";
  }

  // IMAGENS

  imgBox.innerHTML = "";
  if (kbd.imagens && kbd.imagens.length > 0) { kbd.imagens.forEach(src => { const img = document.createElement("img"); img.src = src; imgBox.appendChild(img); }); } else { const msg = document.createElement("div"); msg.className = "small"; msg.style.marginTop = "16px"; msg.style.opacity = ".8"; msg.textContent = "Imagens em breve."; imgBox.appendChild(msg); }
}

function irParaQuiz() { const p = new URLSearchParams(window.location.search); window.location.href = "quiz.html?marca=" + encodeURIComponent(p.get("marca")) + "&kbd=" + encodeURIComponent(p.get("kbd")); }


let quizState = {
  marcaAtual: null,
  kbdAtual: null,
  perguntaIndex: 0,
  tentativa: 1,
  acertos: 0,
  total: 0,
  historico: [],
  respondendo: false,
  perguntas: [],
  selecionada: null
};

function getQuizKey(marcaId, kbdId){ return `mkbd_quiz_${marcaId||'__'}_${kbdId||'__'}`; }

function salvarResultadoLocal({marcaId, kbdId, marcaNome, kbdNome, scorePct, acertos, total}) {
  try{
    const all = JSON.parse(localStorage.getItem("mkbd_quiz_scores") || "{}");
    const key = getQuizKey(marcaId, kbdId);
    all[key] = { marcaId, kbdId, marcaNome, kbdNome, scorePct, acertos, total, updatedAt: new Date().toISOString() };
    localStorage.setItem("mkbd_quiz_scores", JSON.stringify(all));
  }catch(e){ console.warn(e); }
}

function lerResultadosLocal() {
  try{
    const all = JSON.parse(localStorage.getItem("mkbd_quiz_scores") || "{}");
    return Object.values(all).sort((a,b)=> (b.updatedAt||"").localeCompare(a.updatedAt||""));
  }catch(e){ return []; }
}

function renderQuiz() {
  ensureSetor();
  injectShell({active:'quiz', title:'Missão KBD', subtitle:'Quiz', backFallback:'home.html'});

  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const kbdId = params.get("kbd");

  // Se não veio marca/kbd, mostrar painel de resultados (tipo "quizzes feitos")
  if (!marcaId || !kbdId) {
    renderQuizDashboard();
    return;
  }

  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) { alert("Marca não encontrada"); voltarHome(); return; }

  const kbd = (marca.kbds || []).find(k => k.id === kbdId);
  const perguntas = QUIZZES[marcaId] || [];

  if (perguntas.length === 0) {
    document.getElementById("quizTitulo").textContent = "Quiz";
    document.getElementById("quizSubtitulo").textContent = "Em breve";
    document.getElementById("quizArea").innerHTML = `
      <div class="card centerCard">
        <div class="bigIcon">📝</div>
        <div class="cardTitle">Quiz em breve</div>
        <div class="cardSub">Enquanto isso, revise a aula e tente outro KBD.</div>
        <div class="btnRow">
          <a class="btnSecondary" href="marca.html?marca=${encodeURIComponent(marcaId)}">Voltar para KBDs</a>
          <a class="btnPrimary" href="home.html">Home</a>
        </div>
      </div>`;
    return;
  }

  quizState = {
    marcaAtual: marca,
    kbdAtual: kbd,
    perguntaIndex: 0,
    tentativa: 1,
    acertos: 0,
    total: perguntas.length,
    historico: [],
    perguntas,
    respondendo: false,
    selecionada: null
  };

  document.getElementById("quizTitulo").textContent = `Quiz • ${marca.nome}`;
  document.getElementById("quizSubtitulo").textContent = kbd ? kbd.nome : "";

  mostrarPerguntaForms();
}

function renderQuizDashboard() {
  const box = document.getElementById("quizArea");
  document.getElementById("quizTitulo").textContent = "Quiz";
  document.getElementById("quizSubtitulo").textContent = "Quizzes concluídos e pontuação";

  const resultados = lerResultadosLocal();

  if (!resultados.length) {
    box.innerHTML = `
      <div class="card centerCard">
        <div class="bigIcon">🧠</div>
        <div class="cardTitle">Nenhum quiz concluído ainda</div>
        <div class="cardSub">Entre em uma marca e finalize um quiz para salvar sua pontuação.</div>
        <div class="btnRow">
          <a class="btnPrimary" href="marcas.html">Ir para Marcas</a>
        </div>
      </div>`;
    return;
  }

  box.innerHTML = `
    <div class="card" style="padding:16px;">
      <div class="cardTitle" style="margin-bottom:8px;">Seu histórico</div>
      <div class="small">Baseado nos quizzes concluídos neste aparelho (localStorage).</div>
    </div>
    <div class="listStack" id="listaScores"></div>
  `;

  const lista = document.getElementById("listaScores");
  resultados.forEach(r => {
    const div = document.createElement("div");
    div.className = "card scoreCard";
    div.innerHTML = `
      <div class="scoreLeft">
        <div class="scorePct">${r.scorePct}%</div>
        <div class="small">${r.acertos}/${r.total}</div>
      </div>
      <div class="scoreMid">
        <div class="cardTitle">${r.marcaNome}</div>
        <div class="cardSub">${r.kbdNome || "KBD"}</div>
        <div class="tiny">Atualizado em ${new Date(r.updatedAt).toLocaleString('pt-BR')}</div>
      </div>
      <div class="scoreRight">
        <a class="btnInline" href="quiz.html?marca=${encodeURIComponent(r.marcaId)}&kbd=${encodeURIComponent(r.kbdId)}">Refazer</a>
      </div>
    `;
    lista.appendChild(div);
  });
}

function mostrarPerguntaForms() {
  const { perguntas, perguntaIndex, acertos } = quizState;
  const p = perguntas[perguntaIndex];
  quizState.respondendo = false;
  quizState.selecionada = null;

  const progressPct = Math.round((perguntaIndex / perguntas.length) * 100);

  const altsHtml = p.alternativas.map((alt, i) => {
    const letter = String.fromCharCode(65 + i);
    const clean = alt.replace(/^[A-D]\)\s*/, '');
    const id = `alt_${letter}`;
    return `
      <label class="formOption" for="${id}">
        <input type="radio" name="quiz_alt" id="${id}" value="${letter}">
        <span class="optLetter">${letter}</span>
        <span class="optText">${clean}</span>
      </label>
    `;
  }).join("");

  document.getElementById("quizArea").innerHTML = `
    <div class="card" style="padding:16px;">
      <div class="progressWrap">
        <div class="progressBar"><div class="progressFill" style="width:${progressPct}%;"></div></div>
        <div class="progressMeta">
          <div class="small"><strong>Pergunta ${perguntaIndex + 1}</strong> de ${perguntas.length}</div>
          <div class="small">${acertos} acertos</div>
        </div>
      </div>

      <div class="questionTitle">${p.pergunta}</div>

      <div class="optionsWrap">
        ${altsHtml}
      </div>

      <div class="actionsRow">
        <button class="btnPrimary" id="btnConfirmar" disabled>Confirmar resposta</button>
      </div>
    </div>
  `;

  const radios = Array.from(document.querySelectorAll('input[name="quiz_alt"]'));
  const btn = document.getElementById("btnConfirmar");

  radios.forEach(r => r.addEventListener("change", () => {
    quizState.selecionada = r.value;
    btn.disabled = false;
  }));

  btn.addEventListener("click", () => confirmarResposta());
}

function confirmarResposta() {
  if (quizState.respondendo) return;
  const r = quizState.selecionada;
  if (!r) return;

  quizState.respondendo = true;

  const { perguntas, perguntaIndex, marcaAtual, kbdAtual } = quizState;
  const p = perguntas[perguntaIndex];
  const correta = r === p.gabarito;

  quizState.historico.push({ pergunta: p.pergunta, resposta: r, correta: p.gabarito, acertou: correta });
  if (correta) quizState.acertos++;

  const scorePct = Math.round((quizState.acertos / quizState.total) * 100);

  // Envia (best-effort) para Sheets, mas também salva localmente.
  enviarParaSheets({
    setor: getSetor(),
    marca: marcaAtual.nome,
    kbd: kbdAtual ? kbdAtual.nome : "N/A",
    pergunta: p.pergunta,
    resposta: r,
    correta: p.gabarito,
    acertou: correta,
    score: scorePct,
    tentativa: quizState.tentativa
  });

  if (correta) {
    mostrarFeedbackInline(true);
  } else {
    mostrarFeedbackInline(false, p);
  }
}

function mostrarFeedbackInline(ok, p=null) {
  const { perguntas, perguntaIndex } = quizState;

  const rt = (!ok && p)
    ? p.alternativas[p.gabarito.charCodeAt(0) - 65].replace(/^[A-D]\)\s*/, '')
    : "";

  const just = (!ok && p && p.justificativa) ? p.justificativa : "";

  document.getElementById("quizArea").insertAdjacentHTML("beforeend", `
    <div class="card feedbackCard ${ok ? 'ok' : 'bad'}">
      <div class="feedbackTitle">${ok ? '✅ Correto!' : '❌ Incorreto'}</div>
      ${!ok ? `<div class="small" style="margin-top:6px;"><strong>Resposta correta:</strong> ${p.gabarito}) ${rt}</div>` : ``}
      ${(!ok && just) ? `<div class="small" style="margin-top:8px; opacity:.9;">${just}</div>` : ``}
      <div class="actionsRow" style="margin-top:12px;">
        <button class="btnPrimary" onclick="proximaPergunta()">Próxima</button>
      </div>
    </div>
  `);

  // trava inputs
  const inputs = document.querySelectorAll('input[name="quiz_alt"]');
  inputs.forEach(i => i.disabled = true);
  const btn = document.getElementById("btnConfirmar");
  if (btn) btn.disabled = true;
}

function proximaPergunta() {
  quizState.perguntaIndex++;
  if (quizState.perguntaIndex < quizState.perguntas.length) {
    mostrarPerguntaForms();
  } else {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  const { acertos, total, marcaAtual, kbdAtual } = quizState;
  const pct = Math.round((acertos / total) * 100);

  salvarResultadoLocal({
    marcaId: marcaAtual.id,
    kbdId: kbdAtual ? kbdAtual.id : "__",
    marcaNome: marcaAtual.nome,
    kbdNome: kbdAtual ? kbdAtual.nome : "KBD",
    scorePct: pct,
    acertos,
    total
  });

  document.getElementById("quizArea").innerHTML = `
    <div class="card centerCard">
      <div class="bigIcon">🏁</div>
      <div class="cardTitle">Resultado final</div>
      <div class="scoreBig">${pct}%</div>
      <div class="cardSub">${acertos} de ${total} corretas</div>

      <div class="btnRow">
        <a class="btnSecondary" href="quiz.html">Ver histórico</a>
        <a class="btnPrimary" href="marcas.html">Ir para Marcas</a>
      </div>
    </div>
  `;
}

function proximoKBD() {
  // Mantido por compatibilidade com botões antigos (se existirem em algum HTML), mas agora não é usado.
  const p = new URLSearchParams(window.location.search);
  const mid = p.get("marca");
  const kid = p.get("kbd");
  const ma = CONTENT.marcas.find(m => m.id === mid);
  if (!ma) { voltarHome(); return; }
  const ki = ma.kbds.findIndex(k => k.id === kid);
  if (ki + 1 < ma.kbds.length) {
    const nk = ma.kbds[ki + 1];
    window.location.href = "kbd.html?marca=" + encodeURIComponent(mid) + "&kbd=" + encodeURIComponent(nk.id);
    return;
  }
  window.location.href = "marca.html?marca=" + encodeURIComponent(mid);
}


async function enviarParaSheets(d) {
  try {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: new Date().toISOString(), setor: d.setor, marca: d.marca, kbd: d.kbd, pergunta: d.pergunta, resposta: d.resposta, correta: d.correta, acertou: d.acertou ? "SIM" : "NÃO", score: d.score, tentativa: d.tentativa, userAgent: navigator.userAgent })
    });
  } catch (e) { console.error(e); }
}

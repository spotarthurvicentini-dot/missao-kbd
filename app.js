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
  const kbd = params.get("kbd");
  overlay.innerHTML = `
    <div class="modal-content" style="max-width:420px; width: calc(100% - 40px);">
      <div class="modal-title" style="margin-bottom:14px;">Menu</div>
      <div class="modal-text" style="display:grid; gap:10px;">
        <button class="modal-btn modal-btn-confirm" onclick="window.location.href='home.html'">🏠 Home</button>
        ${marca ? `<button class="modal-btn modal-btn-confirm" onclick="window.location.href='marca.html?marca=${encodeURIComponent(marca)}'">🧩 Trocar KBD</button>` : ``}
        <button class="modal-btn modal-btn-cancel" onclick="confirmarSaida()">🔁 Trocar setor</button>
        <button class="modal-btn modal-btn-cancel" onclick="closeMenu()">Fechar</button>
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
    <div class="appbar-title">
      ${title}
      ${subtitle ? `<span>${subtitle}</span>` : ``}
    </div>
    <div class="appbar-right">
      <div class="pill" id="pillSetor">---</div>
    </div>
  `;

  const nav = document.createElement("nav");
  nav.className = "bottomNav";
  nav.innerHTML = `
    <a class="navItem ${active==='home'?'active':''}" href="home.html"><div class="navIcon">🏠</div><div>Home</div></a>
    <a class="navItem ${active==='aula'?'active':''}" href="${hrefAula}"><div class="navIcon">📘</div><div>Aula</div></a>
    <a class="navItem ${active==='quiz'?'active':''}" href="${hrefQuiz}"><div class="navIcon">📝</div><div>Quiz</div></a>
    <a class="navItem ${active==='fotos'?'active':''}" href="${hrefFotos}"><div class="navIcon">🖼️</div><div>Fotos</div></a>
    <a class="navItem ${active==='videos'?'active':''}" href="${hrefVideos}"><div class="navIcon">🎬</div><div>Vídeos</div></a>
  `;

  document.body.prepend(appbar);
  document.body.appendChild(nav);

  const pill = document.getElementById("pillSetor");
  if (pill) pill.textContent = getSetor() || "---";
}



function renderHome() {
  ensureSetor();
  injectShell({active:'home', title:'Missão KBD', subtitle:'Marcas', backFallback:'home.html'});
  const badge = document.getElementById("setorBadge");
  if (badge) badge.textContent = getSetor();
  const lista = document.getElementById("listaMarcas");
  if (!lista) return;
  lista.innerHTML = "";
  CONTENT.marcas.forEach((m) => {
    const div = document.createElement("div");
    div.className = "card";
    const totalKbds = (m.kbds || []).length;
    div.innerHTML = `<div class="cardLogo"><img src="${m.logo}" alt="${m.nome}"></div><div class="cardContent"><div class="cardTitle">${m.nome}</div><div class="cardSub">${totalKbds} KBD${totalKbds > 1 ? 's' : ''}</div></div>`;
    div.onclick = () => { window.location.href = "marca.html?marca=" + encodeURIComponent(m.id); };
    lista.appendChild(div);
  });
}

function voltarHome() { window.location.href = "home.html"; }

function renderMarca() {
  ensureSetor();
  injectShell({active:'aula', title:'Missão KBD', subtitle:'Selecione o KBD', backFallback:'home.html'});
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
    div.className = "card";
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
  injectShell({active: (_view==='fotos'?'fotos':(_view==='videos'?'videos':'aula')), title:'Missão KBD', subtitle:'Aula prática', backFallback:'home.html'});
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
  if (kbd.videoId) {
    iframe.src = "https://www.youtube.com/embed/" + kbd.videoId;
    iframe.style.display = "block";
    placeholder.style.display = "none";
  } else {
    iframe.style.display = "none";
    placeholder.style.display = "flex";
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

let quizState = { marcaAtual: null, kbdAtual: null, perguntaIndex: 0, tentativa: 1, acertos: 0, total: 0, historico: [], respondendo: false };

function renderQuiz() {
  ensureSetor();
  injectShell({active:'quiz', title:'Missão KBD', subtitle:'Quiz', backFallback:'home.html'});
  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const kbdId = params.get("kbd");
  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) { alert("Marca não encontrada"); voltarHome(); return; }
  const kbd = (marca.kbds || []).find(k => k.id === kbdId);
  const perguntas = QUIZZES[marcaId] || [];
  if (perguntas.length === 0) { document.getElementById("quizArea").innerHTML = `<div class="card" style="text-align: center; padding: 40px;"><div style="font-size: 48px; margin-bottom: 16px;">📝</div><div class="cardTitle">Quiz em breve</div><button class="btnPrimary" onclick="proximoKBD()">Próximo KBD →</button></div>`; return; }
  quizState = { marcaAtual: marca, kbdAtual: kbd, perguntaIndex: 0, tentativa: 1, acertos: 0, total: perguntas.length, historico: [], perguntas: perguntas, respondendo: false };
  document.getElementById("quizTitulo").textContent = `Quiz ${marca.nome}`;
  document.getElementById("quizSubtitulo").textContent = kbd ? kbd.nome : "";
  const topbarSetor = document.getElementById("topbarSetor");
  if (topbarSetor) topbarSetor.textContent = getSetor();
  mostrarPergunta();
}

function mostrarPergunta() {
  const { perguntas, perguntaIndex } = quizState;
  const p = perguntas[perguntaIndex];
  quizState.respondendo = false;
  document.getElementById("quizArea").innerHTML = `<div class="card" style="padding: 24px;"><div style="text-align: center; margin-bottom: 20px;"><div class="small" style="font-weight: 700;">Pergunta ${perguntaIndex + 1} de ${perguntas.length}</div></div><div class="cardTitle" style="margin-bottom: 24px; font-size: 18px;">${p.pergunta}</div><div style="display: grid; gap: 12px;">${p.alternativas.map((alt, i) => { const l = String.fromCharCode(65 + i); return `<button onclick="responderQuiz('${l}')" style="width: 100%; padding: 16px; text-align: left; border-radius: 12px; background: rgba(168, 85, 247, 0.1); border: 2px solid rgba(0, 217, 255, 0.3); color: white; cursor: pointer; font-size: 15px;"><strong>${l})</strong> ${alt.replace(/^[A-D]\)\s*/, '')}</button>`; }).join('')}</div></div>`;
}

async function responderQuiz(r) {
  if (quizState.respondendo) return;
  quizState.respondendo = true;
  const { perguntas, perguntaIndex, marcaAtual, kbdAtual } = quizState;
  const p = perguntas[perguntaIndex];
  const c = r === p.gabarito;
  quizState.historico.push({ pergunta: p.pergunta, resposta: r, correta: p.gabarito, acertou: c });
  if (c) quizState.acertos++;
  enviarParaSheets({ setor: getSetor(), marca: marcaAtual.nome, kbd: kbdAtual ? kbdAtual.nome : "N/A", pergunta: p.pergunta, resposta: r, correta: p.gabarito, acertou: c, score: Math.round((quizState.acertos / quizState.total) * 100), tentativa: quizState.tentativa });
  if (c) { mostrarFeedbackCorreto(); } else { mostrarPopupErro(p); }
}

function mostrarFeedbackCorreto() {
  const { perguntas, perguntaIndex } = quizState;
  document.getElementById("quizArea").innerHTML = `<div class="card" style="padding: 40px; text-align: center; background: rgba(0, 255, 100, 0.15); border: 2px solid #00ff64;"><div style="font-size: 64px;">✓</div><div class="cardTitle" style="color: #00ff64;">Correto!</div></div>`;
  setTimeout(() => { proximaPergunta(); }, 1200);
}

function mostrarPopupErro(p) {
  const rt = p.alternativas[p.gabarito.charCodeAt(0) - 65].replace(/^[A-D]\)\s*/, '');
  criarModal({ icon: '✗', title: 'Incorreto', text: `<div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; margin: 16px 0;"><div style="font-weight: 700; margin-bottom: 8px;">Resposta correta:</div><div style="font-size: 16px; font-weight: 900; color: #00ff64;">${p.gabarito}) ${rt}</div>${p.justificativa ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 14px;">${p.justificativa}</div>` : ''}</div>`, buttons: [{ label: 'Entendi', class: 'modal-btn-confirm', action: 'fecharModalEProximo()' }] });
}

function fecharModalEProximo() { fecharModal(); proximaPergunta(); }

function proximaPergunta() {
  quizState.perguntaIndex++;
  if (quizState.perguntaIndex < quizState.perguntas.length) { mostrarPergunta(); } else { mostrarResultadoFinal(); }
}

function mostrarResultadoFinal() {
  const { acertos, total } = quizState;
  const pct = Math.round((acertos / total) * 100);
  let emoji, msg, grad;
  if (pct >= 81) { emoji = "🥇"; msg = "Ouro!"; grad = "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"; }
  else if (pct >= 61) { emoji = "🥈"; msg = "Prata!"; grad = "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)"; }
  else { emoji = "🥉"; msg = "Bronze!"; grad = "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)"; }
  document.getElementById("quizArea").innerHTML = `<div class="card" style="padding: 40px; text-align: center; background: ${grad}; border: none;"><div style="font-size: 80px;">${emoji}</div><div style="font-size: 28px; font-weight: 900;">${msg}</div><div style="font-size: 48px; font-weight: 900; margin: 20px 0;">${pct}%</div><div style="font-size: 18px;">${acertos} de ${total}</div><button class="btnPrimary" onclick="proximoKBD()" style="margin-top: 30px; background: rgba(0,0,0,0.3); border: 2px solid white;">Próximo →</button></div>`;
}

function proximoKBD() {
  const p = new URLSearchParams(window.location.search);
  const mid = p.get("marca");
  const kid = p.get("kbd");
  const ma = CONTENT.marcas.find(m => m.id === mid);
  if (!ma) { voltarHome(); return; }
  const ki = ma.kbds.findIndex(k => k.id === kid);
  if (ki + 1 < ma.kbds.length) { const nk = ma.kbds[ki + 1]; window.location.href = "kbd.html?marca=" + encodeURIComponent(mid) + "&kbd=" + encodeURIComponent(nk.id); return; }
  const mi = CONTENT.marcas.findIndex(m => m.id === mid);
  if (mi + 1 < CONTENT.marcas.length) { const nm = CONTENT.marcas[mi + 1]; const pk = nm.kbds[0]; window.location.href = "kbd.html?marca=" + encodeURIComponent(nm.id) + "&kbd=" + encodeURIComponent(pk.id); return; }
  alert("Parabéns! 🎉"); voltarHome();
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

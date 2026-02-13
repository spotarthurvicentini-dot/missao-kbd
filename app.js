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

// ====== APP SHELL (TOPBAR + MENU + BOTTOM NAV) ======
function navToKbdAtual() {
  const p = new URLSearchParams(window.location.search);
  const marca = p.get("marca");
  const kbd = p.get("kbd");
  if (marca && kbd) {
    window.location.href = `kbd.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}`;
  } else {
    window.location.href = "home.html";
  }
}

function openMenu() {
  const p = new URLSearchParams(window.location.search);
  const marcaId = p.get("marca");
  const marca = (CONTENT.marcas || []).find(m => m.id === marcaId);
  const kbds = (marca?.kbds || []).map(k => `<div class="menuItem" onclick="window.location.href='kbd.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(k.id)}'">${k.nome}</div>`).join("");
  criarModal({
    icon: "☰",
    title: "Menu",
    text: `
      <div class="menuList">
        <div class="menuItem" onclick="window.location.href='home.html'">🏠 Home</div>
        <div class="menuItem" onclick="window.location.href='marcas.html'">🏷️ Marcas</div>
        ${marca ? `<div style='margin:10px 0 6px; opacity:.8; font-weight:900;'>KBDs de ${marca.nome}</div>${kbds || "<div class='small'>Sem KBDs</div>"}` : ""}
        <div style='margin-top:12px;'></div>
        <div class="menuItem" onclick="fecharModal(); confirmarSaida();">🔁 Trocar setor</div>
      </div>
    `,
    buttons: [{ label: "Fechar", class: "modal-btn-cancel", action: "fecharModal()" }]
  });
}

function initAppShell() {
  const back = document.getElementById("navBack");
  if (back) back.onclick = () => history.length > 1 ? history.back() : voltarHome();

  const menu = document.getElementById("navMenu");
  if (menu) menu.onclick = () => openMenu();

  const setor = document.getElementById("navSetor");
  if (setor) {
    setor.textContent = getSetor() || "---";
    setor.onclick = () => confirmarSaida();
  }

  const items = document.querySelectorAll(".bottomNav .navItem");
  items.forEach(btn => {
    btn.onclick = () => {
      const dest = btn.getAttribute("data-nav");
      if (dest === "home") return (window.location.href = "home.html");
      if (dest === "marcas") return (window.location.href = "marcas.html");
      if (dest === "quiz") {
        const p = new URLSearchParams(window.location.search);
        const marca = p.get("marca") || (CONTENT.marcas?.[0]?.id);
        const kbd = p.get("kbd") || (CONTENT.marcas?.find(m=>m.id===marca)?.kbds?.[0]?.id);
        if (marca && kbd) return (window.location.href = `quiz.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}`);
        return (window.location.href = "home.html");
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", initAppShell);

function renderHome() {
  ensureSetor();
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
  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const kbdId = params.get("kbd");
  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) { alert("Marca não encontrada"); voltarHome(); return; }
  const kbd = (marca.kbds || []).find(k => k.id === kbdId);
  if (!kbd) { alert("KBD não encontrado"); voltarMarca(); return; }
  document.getElementById("kbdTitulo").textContent = `${marca.nome} • ${kbd.nome}`;
  const topbarSetor = document.getElementById("topbarSetor");
  if (topbarSetor) topbarSetor.textContent = getSetor();
  const iframe = document.getElementById("videoFrame");
  const placeholder = document.getElementById("videoPlaceholder");
  if (kbd.videoId) { iframe.src = "https://www.youtube.com/embed/" + kbd.videoId; iframe.style.display = "block"; placeholder.style.display = "none"; } else { iframe.style.display = "none"; placeholder.style.display = "flex"; }
  const imgBox = document.getElementById("imagensKbd");
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
  perguntas: [],
  respondendo: false,
  bloqueado: false,
  respostaSelecionada: null,
  finalizado: false
};

const PROGRESS_KEY = "mkbd_quiz_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { completed: {} };
  } catch {
    return { completed: {} };
  }
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function markQuizDone(marcaId, kbdId, payload) {
  const p = loadProgress();
  if (!p.completed) p.completed = {};
  if (!p.completed[marcaId]) p.completed[marcaId] = {};
  p.completed[marcaId][kbdId || "__marca__"] = payload;
  saveProgress(p);
}

function isQuizDone(marcaId, kbdId) {
  const p = loadProgress();
  return Boolean(p?.completed?.[marcaId]?.[kbdId || "__marca__"]);
}

function getNextTarget(marcaId, kbdId) {
  // Regra: tentar completar primeiro a marca atual (kbds pendentes), depois avançar para marcas seguintes.
  const marcas = CONTENT.marcas || [];
  const currentMarca = marcas.find(m => m.id === marcaId) || marcas[0];
  const currentKbdIdx = (currentMarca?.kbds || []).findIndex(k => k.id === kbdId);

  // 1) Próximo KBD pendente dentro da marca atual (depois do atual)
  if (currentMarca) {
    const kbds = currentMarca.kbds || [];
    for (let i = Math.max(0, currentKbdIdx + 1); i < kbds.length; i++) {
      if (!isQuizDone(currentMarca.id, kbds[i].id)) return { marca: currentMarca, kbd: kbds[i] };
    }
    // 2) Qualquer KBD pendente dentro da marca atual (antes do atual)
    for (let i = 0; i < kbds.length; i++) {
      if (!isQuizDone(currentMarca.id, kbds[i].id)) return { marca: currentMarca, kbd: kbds[i] };
    }
  }

  // 3) Marcas seguintes (primeiro KBD pendente)
  const startIdx = Math.max(0, marcas.findIndex(m => m.id === marcaId) + 1);
  for (let mi = startIdx; mi < marcas.length; mi++) {
    const m = marcas[mi];
    const kbds = m.kbds || [];
    for (let ki = 0; ki < kbds.length; ki++) {
      if (!isQuizDone(m.id, kbds[ki].id)) return { marca: m, kbd: kbds[ki] };
    }
  }
  // 4) Marcas anteriores (se usuário pulou)
  for (let mi = 0; mi < startIdx; mi++) {
    const m = marcas[mi];
    const kbds = m.kbds || [];
    for (let ki = 0; ki < kbds.length; ki++) {
      if (!isQuizDone(m.id, kbds[ki].id)) return { marca: m, kbd: kbds[ki] };
    }
  }

  return null;
}

function allQuizzesCompleted() {
  const marcas = CONTENT.marcas || [];
  for (const m of marcas) {
    for (const k of (m.kbds || [])) {
      if (!isQuizDone(m.id, k.id)) return false;
    }
  }
  return true;
}

function renderQuiz() {
  ensureSetor();
  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const kbdId = params.get("kbd");
  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) { alert("Marca não encontrada"); voltarHome(); return; }
  const kbd = (marca.kbds || []).find(k => k.id === kbdId);
  const perguntas = QUIZZES[marcaId] || [];

  // KBD dropdown
  const sel = document.getElementById("quizKbdSelect");
  if (sel) {
    sel.innerHTML = (marca.kbds || []).map(x => `<option value="${x.id}" ${x.id === kbdId ? "selected" : ""}>${x.nome}</option>`).join("");
    sel.onchange = () => {
      const nextId = sel.value;
      window.location.href = `quiz.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(nextId)}`;
    };
  }

  document.getElementById("quizTitulo").textContent = `Quiz - ${marca.nome}`;
  document.getElementById("quizSubtitulo").textContent = kbd ? `${kbd.nome} • ${perguntas.length} perguntas` : `${perguntas.length} perguntas`;
  const navSetor = document.getElementById("navSetor");
  if (navSetor) navSetor.textContent = getSetor();

  if (!Array.isArray(perguntas) || perguntas.length === 0) {
    document.getElementById("quizArea").innerHTML = `<div class="card" style="text-align:center; padding:28px;">\
      <div style="font-size:40px;">📝</div>\
      <div class="cardTitle" style="margin-top:10px;">Quiz em breve</div>\
      <div class="cardSub" style="margin-top:6px;">Esse conteúdo ainda não tem perguntas cadastradas.</div>\
      <button class="btnPrimary" style="margin-top:16px;" onclick="navToKbdAtual()">Voltar para a aula</button>\
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
    bloqueado: false,
    respostaSelecionada: null,
    finalizado: false
  };

  renderQuizPergunta();
}

function renderQuizPergunta() {
  const { perguntas, perguntaIndex, acertos, total } = quizState;
  const p = perguntas[perguntaIndex];
  quizState.respondendo = false;
  quizState.bloqueado = false;
  quizState.respostaSelecionada = null;

  // UI topo
  const counter = document.getElementById("quizCounter");
  if (counter) counter.textContent = `${perguntaIndex + 1}/${perguntas.length}`;
  const bar = document.getElementById("quizProgressBar");
  if (bar) {
    const pct = Math.round(((perguntaIndex) / perguntas.length) * 100);
    bar.style.width = `${pct}%`;
  }

  const htmlAlts = p.alternativas.map((alt, i) => {
    const l = String.fromCharCode(65 + i);
    const txt = alt.replace(/^[A-D]\)\s*/, '');
    return `
      <button class="optBtn" data-opt="${l}" onclick="responderQuiz('${l}')">
        <span class="optBadge">${l}</span>
        <span class="optText">${txt}</span>
        <span class="optIcon" aria-hidden="true"></span>
      </button>
    `;
  }).join("");

  document.getElementById("quizArea").innerHTML = `
    <div class="quizCard">
      <div class="quizQTop">
        <div class="quizQLabel">Pergunta ${perguntaIndex + 1}</div>
      </div>
      <div class="quizQuestion">${p.pergunta}</div>
      <div class="quizOptions">${htmlAlts}</div>
      <div class="quizFooterNote">Pontuação atual: <strong>${acertos}</strong> de <strong>${Math.max(0, perguntaIndex)}</strong> respondidas</div>
    </div>
  `;
}

async function responderQuiz(r) {
  if (quizState.bloqueado) return;
  quizState.bloqueado = true;
  const { perguntas, perguntaIndex, marcaAtual, kbdAtual } = quizState;
  const p = perguntas[perguntaIndex];
  const correta = r === p.gabarito;
  quizState.respostaSelecionada = r;
  quizState.historico.push({ pergunta: p.pergunta, resposta: r, correta: p.gabarito, acertou: correta });
  if (correta) quizState.acertos++;

  const pctNow = Math.round((quizState.acertos / quizState.total) * 100);
  enviarParaSheets({
    setor: getSetor(),
    marca: marcaAtual.nome,
    kbd: kbdAtual ? kbdAtual.nome : "N/A",
    pergunta: p.pergunta,
    resposta: r,
    correta: p.gabarito,
    acertou: correta,
    score: pctNow,
    tentativa: quizState.tentativa
  });

  renderQuizFeedback(p, r, correta);
}

function renderQuizFeedback(p, r, correta) {
  const area = document.getElementById("quizArea");
  const correctText = p.alternativas[p.gabarito.charCodeAt(0) - 65].replace(/^[A-D]\)\s*/, '');

  // Atualiza barra
  const bar = document.getElementById("quizProgressBar");
  if (bar) {
    const pct = Math.round(((quizState.perguntaIndex + 1) / quizState.perguntas.length) * 100);
    bar.style.width = `${pct}%`;
  }

  const htmlAlts = p.alternativas.map((alt, i) => {
    const l = String.fromCharCode(65 + i);
    const txt = alt.replace(/^[A-D]\)\s*/, '');
    let cls = "optBtn";
    let icon = "";
    if (l === p.gabarito) { cls += " optCorrect"; icon = "✓"; }
    if (l === r && l !== p.gabarito) { cls += " optWrong"; icon = "✕"; }
    return `
      <div class="${cls}">
        <span class="optBadge">${l}</span>
        <span class="optText">${txt}</span>
        <span class="optIcon">${icon}</span>
      </div>
    `;
  }).join("");

  const feedback = correta
    ? `<div class="quizFeedback ok">✅ Correto! Ótimo trabalho!</div>`
    : `<div class="quizFeedback bad">❌ Resposta incorreta. A resposta certa é: <strong>${p.gabarito}) ${correctText}</strong>${p.justificativa ? `<div class="quizJust">${p.justificativa}</div>` : ""}</div>`;

  const isLast = (quizState.perguntaIndex + 1) >= quizState.perguntas.length;
  const btnLabel = isLast ? "🏁 Ver Resultado" : "➡️ Próxima Pergunta";

  area.innerHTML = `
    <div class="quizCard">
      <div class="quizQTop">
        <div class="quizQLabel">Pergunta ${quizState.perguntaIndex + 1}</div>
      </div>
      <div class="quizQuestion">${p.pergunta}</div>
      <div class="quizOptions">${htmlAlts}</div>
      ${feedback}
    </div>
    <button class="btnPrimary quizNext" onclick="proximaPergunta()">${btnLabel}</button>
  `;
}

function proximaPergunta() {
  quizState.perguntaIndex++;
  if (quizState.perguntaIndex < quizState.perguntas.length) {
    renderQuizPergunta();
  } else {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  const { acertos, total } = quizState;
  const pct = Math.round((acertos / total) * 100);
  let emoji = "🥉";
  let headline = "Continue estudando!";
  let sub = "Revise o material e tente novamente.";
  if (pct === 100) {
    emoji = "🥇";
    headline = "Perfeito!";
    sub = "Você acertou tudo. Mandou demais!";
  } else if (pct >= 80) {
    emoji = "🥈";
    headline = "Muito bom!";
    sub = "Você está muito perto do 100%.";
  }

  // Marca como concluído (por marca+kbd) e decide próximo passo.
  const marcaId = quizState.marcaAtual?.id;
  const kbdId = quizState.kbdAtual?.id;
  markQuizDone(marcaId, kbdId, {
    pct,
    acertos,
    total,
    updatedAt: new Date().toISOString(),
    setor: getSetor(),
    marca: quizState.marcaAtual?.nome || "",
    kbd: quizState.kbdAtual?.nome || ""
  });

  const next = getNextTarget(marcaId, kbdId);
  const terminouTudo = !next && allQuizzesCompleted();

  const primaryLabel = terminouTudo ? "✅ Finalizar" : "➡️ Próximo";
  const primaryAction = terminouTudo ? "finalizarFluxo()" : "irProximoFluxo()";

  document.getElementById("quizArea").innerHTML = `
    <div class="quizResultCard">
      <div class="quizResultIcon">${emoji}</div>
      <div class="quizResultTitle">${headline}</div>
      <div class="quizResultScore">${acertos}/${total}</div>
      <div class="quizResultPct">${pct}% de acertos</div>
      <div class="quizResultSub">${sub}</div>

      <div class="quizResultActions">
        <button class="btnPrimary" onclick="${primaryAction}">${primaryLabel}</button>
        <button class="btnSoft" onclick="tentarNovamenteQuiz()">🔁 Tentar novamente</button>
        <button class="btnGhost" onclick="navToKbdAtual()">📚 Revisar material</button>
        <button class="btnGhost" onclick="voltarMarca()">← Voltar para a marca</button>
      </div>
    </div>
  `;
}

function tentarNovamenteQuiz() {
  // Não apaga progresso; apenas reinicia o quiz atual.
  quizState.perguntaIndex = 0;
  quizState.acertos = 0;
  quizState.historico = [];
  renderQuizPergunta();
}

function irProximoFluxo() {
  const marcaId = quizState.marcaAtual?.id;
  const kbdId = quizState.kbdAtual?.id;
  const next = getNextTarget(marcaId, kbdId);
  if (!next) return finalizarFluxo();
  window.location.href = `kbd.html?marca=${encodeURIComponent(next.marca.id)}&kbd=${encodeURIComponent(next.kbd.id)}`;
}

function finalizarFluxo() {
  criarModal({
    icon: "🎉",
    title: "Fluxo concluído",
    text: "Você finalizou todos os quizzes de todas as marcas. Parabéns!",
    buttons: [{ label: "Ir para Home", class: "modal-btn-confirm", action: "voltarHome()" }]
  });
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

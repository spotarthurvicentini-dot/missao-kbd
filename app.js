// ====== DADOS (VOCÊ VAI EDITAR DEPOIS) ======
const CONTENT = {
  marcas: [
    {
      id: "pantene",
      nome: "PANTENE",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD 01 - Exposição",
          videoId: null,          // depois: ID do YouTube
          imagens: []             // depois: ["img/pantene/kbd1_01.jpg", ...]
        }
      ]
    }
  ]
};

// ====== LOGIN (SETOR) ======
function entrar() {
  const setorInput = document.getElementById("setor");
  const setor = setorInput.value.trim().toUpperCase();

  if (setor === "") {
    alert("Digite seu setor");
    return;
  }

  if (!setor.startsWith("SPI")) {
    alert("Setor inválido. Exemplo: SPI200");
    return;
  }

  localStorage.setItem("SETOR", setor);
  window.location.href = "home.html";
}

// ====== BASE ======
function getSetor() {
  return (localStorage.getItem("SETOR") || "").trim();
}

function ensureSetor() {
  if (!getSetor()) {
    window.location.href = "index.html";
  }
}

function trocarSetor() {
  localStorage.removeItem("SETOR");
  window.location.href = "index.html";
}

// ====== HOME ======
function renderHome() {
  ensureSetor();

  const badge = document.getElementById("setorBadge");
  if (badge) badge.textContent = getSetor();

  const lista = document.getElementById("listaMarcas");
  lista.innerHTML = "";

  CONTENT.marcas.forEach((m) => {
    const div = document.createElement("div");
    div.className = "card";

    const totalKbds = (m.kbds || []).length;

    div.innerHTML = `
      <div class="cardTitle">${m.nome}</div>
      <div class="cardSub">${totalKbds} KBD(s)</div>
    `;

    div.onclick = () => {
      window.location.href = "marca.html?marca=" + encodeURIComponent(m.id);
    };

    lista.appendChild(div);
  });
}

// ====== MARCA ======
function voltarHome() {
  window.location.href = "home.html";
}

function renderMarca() {
  ensureSetor();

  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");

  const marca = CONTENT.marcas.find(m => m.id === marcaId);

  if (!marca) {
    alert("Marca não encontrada");
    voltarHome();
    return;
  }

  document.getElementById("marcaTitulo").textContent = marca.nome;
  document.getElementById("setorBadge").textContent = getSetor();

  const lista = document.getElementById("listaKbds");
  lista.innerHTML = "";

  marca.kbds.forEach(kbd => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="cardTitle">${kbd.nome}</div>
      <div class="cardSub">Abrir conteúdo</div>
    `;

    div.onclick = () => {
      window.location.href =
        "kbd.html?marca=" + encodeURIComponent(marca.id) +
        "&kbd=" + encodeURIComponent(kbd.id);
    };

    lista.appendChild(div);
  });
}

// ====== KBD (AULA) ======
function voltarMarca() {
  const params = new URLSearchParams(window.location.search);
  const marca = params.get("marca");
  window.location.href = "marca.html?marca=" + encodeURIComponent(marca);
}

function renderKbd() {
  ensureSetor();

  const params = new URLSearchParams(window.location.search);
  const marcaId = params.get("marca");
  const kbdId = params.get("kbd");

  const marca = CONTENT.marcas.find(m => m.id === marcaId);
  if (!marca) {
    alert("Marca não encontrada");
    voltarHome();
    return;
  }

  const kbd = (marca.kbds || []).find(k => k.id === kbdId);
  if (!kbd) {
    alert("KBD não encontrado");
    voltarMarca();
    return;
  }

  document.getElementById("kbdTitulo").textContent =
    `${marca.nome} • ${kbd.nome}`;

  document.getElementById("setorBadge").textContent = getSetor();

  // VÍDEO (placeholder por enquanto)
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

  // IMAGENS (vazio por enquanto)
  const imgBox = document.getElementById("imagensKbd");
  imgBox.innerHTML = "";

  if (kbd.imagens && kbd.imagens.length > 0) {
    kbd.imagens.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      imgBox.appendChild(img);
    });
  } else {
    // mensagem leve quando não tiver imagens
    const msg = document.createElement("div");
    msg.className = "small";
    msg.style.marginTop = "16px";
    msg.style.opacity = ".8";
    msg.textContent = "Imagens em breve.";
    imgBox.appendChild(msg);
  }
}

// ====== QUIZ (vamos implementar depois) ======
function irParaQuiz() {
  alert("Quiz: vamos implementar na próxima etapa 🙂");
}

// ====== CONFIGURAÇÃO GOOGLE SHEETS ======
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyWERu4e0iNLGkeB3Xq8Ou1dM4FFGI7SQagRVEjhCNIc-4gVAyt4DJPNe_rp9Le6kM/exec";

// ====== DADOS (VOCÊ VAI EDITAR DEPOIS) ======
const CONTENT = {
  marcas: [
    {
      id: "always",
      nome: "ALWAYS",
      logo: "logos/always.jpg",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Absorventes – Always Suave",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "downy",
      nome: "DOWNY",
      logo: "logos/downy.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Ponto Extra – Brisa",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD Bloco Azul (50%)",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd3",
          nome: "KBD Bloco Colorido (40%) ou [Alfazema ou Lírios]",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "pantene",
      nome: "PANTENE",
      logo: "logos/pantene.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Bond Repair (20%)",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD Top Versões – Bambu, Colágeno e Biotinamina B3 (40%)",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd3",
          nome: "KBD Óleo – 2 Pontos de Contato",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd4",
          nome: "KBD Rio/Cachoeira Dourada",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "pampers",
      nome: "PAMPERS",
      logo: "logos/pampers.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Ponto Extra – 50% Tamanhos Grandes",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD Pants",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd3",
          nome: "KBD Pants + Premium (Lojas Sul)",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd4",
          nome: "KBD Vale Night – SOS Gôndola",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd5",
          nome: "KBD Vale Night – Ponto Extra Farma",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "secret",
      nome: "SECRET",
      logo: "logos/secret.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD 2 Bandejas",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD Bloco 15 Frentes ou 3 Bandejas",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "oral-b",
      nome: "ORAL-B",
      logo: "logos/oral-b.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Branqueamento (60%)",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD 2 Pontos de Contato – Escovas",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd3",
          nome: "KBD Layout BIPE – Escovas",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "gillette",
      nome: "GILLETTE",
      logo: "logos/gillette.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Sistemas – % de Ganchos",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD 2 Pontos de Contato – Mach3/Presto3",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd3",
          nome: "KBD Carga Mach3 c/8 – 2 Ganchos",
          videoId: null,
          imagens: []
        }
      ]
    },
    {
      id: "venus",
      nome: "VENUS",
      logo: "logos/venus.png",
      kbds: [
        {
          id: "kbd1",
          nome: "KBD Sistemas – 20% de Ganchos",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd2",
          nome: "KBD 2 Pontos de Contato",
          videoId: null,
          imagens: []
        },
        {
          id: "kbd3",
          nome: "KBD Checkout – Venus Pele Sensível",
          videoId: null,
          imagens: []
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
      <div class="cardLogo">
        <img src="${m.logo}" alt="${m.nome}">
      </div>
      <div class="cardContent">
        <div class="cardTitle">${m.nome}</div>
        <div class="cardSub">${totalKbds} KBD${totalKbds > 1 ? 's' : ''}</div>
      </div>
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
      <div class="cardContent">
        <div class="cardTitle">${kbd.nome}</div>
        <div class="cardSub">Clique para abrir conteúdo</div>
      </div>
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

  // VÍDEO
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

  // IMAGENS
  const imgBox = document.getElementById("imagensKbd");
  imgBox.innerHTML = "";

  if (kbd.imagens && kbd.imagens.length > 0) {
    kbd.imagens.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      imgBox.appendChild(img);
    });
  } else {
    const msg = document.createElement("div");
    msg.className = "small";
    msg.style.marginTop = "16px";
    msg.style.opacity = ".8";
    msg.textContent = "Imagens em breve.";
    imgBox.appendChild(msg);
  }
}

// ====== QUIZ - NOVO SISTEMA ======
function irParaQuiz() {
  const params = new URLSearchParams(window.location.search);
  const marca = params.get("marca");
  const kbd = params.get("kbd");
  window.location.href = 
    "quiz.html?marca=" + encodeURIComponent(marca) +
    "&kbd=" + encodeURIComponent(kbd);
}

// Estado global do quiz
let quizState = {
  marcaAtual: null,
  kbdAtual: null,
  perguntaIndex: 0,
  tentativa: 1,
  acertos: 0,
  total: 0,
  historico: []
};

function renderQuiz() {
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

  // Buscar perguntas
  const perguntas = QUIZZES[marcaId] || [];
  
  if (perguntas.length === 0) {
    document.getElementById("quizArea").innerHTML = `
      <div class="card" style="text-align: center; padding: 40px;">
        <div style="font-size: 48px; margin-bottom: 16px;">📝</div>
        <div class="cardTitle">Quiz em breve</div>
        <div class="cardSub" style="margin-top: 8px;">
          As perguntas para ${marca.nome} estão sendo preparadas.
        </div>
        <button class="btnPrimary" onclick="proximoKBD()" style="margin-top: 20px;">
          Próximo KBD →
        </button>
      </div>
    `;
    return;
  }

  // Inicializar estado
  quizState = {
    marcaAtual: marca,
    kbdAtual: kbd,
    perguntaIndex: 0,
    tentativa: 1,
    acertos: 0,
    total: perguntas.length,
    historico: [],
    perguntas: perguntas
  };

  // Atualizar cabeçalho
  document.getElementById("quizTitulo").textContent = `Quiz ${marca.nome}`;
  document.getElementById("quizSubtitulo").textContent = kbd ? kbd.nome : "";
  document.getElementById("setorBadge").textContent = getSetor();

  // Mostrar primeira pergunta
  mostrarPergunta();
}

function mostrarPergunta() {
  const { perguntas, perguntaIndex } = quizState;
  const pergunta = perguntas[perguntaIndex];

  const html = `
    <div class="card" style="padding: 24px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div class="small" style="font-weight: 700; opacity: 0.7;">
          Pergunta ${perguntaIndex + 1} de ${perguntas.length}
        </div>
      </div>

      <div class="cardTitle" style="margin-bottom: 24px; font-size: 18px; line-height: 1.4;">
        ${pergunta.pergunta}
      </div>
      
      <div id="alternativas" style="display: grid; gap: 12px;">
        ${pergunta.alternativas.map((alt, i) => {
          const letra = String.fromCharCode(65 + i);
          return `
            <button class="quizOpcao" onclick="responderQuiz('${letra}')" style="
              width: 100%;
              padding: 16px;
              text-align: left;
              border-radius: 12px;
              background: rgba(255,255,255,0.08);
              border: 2px solid rgba(255,255,255,0.15);
              color: white;
              cursor: pointer;
              transition: all 0.2s;
              font-size: 15px;
            " onmouseover="this.style.background='rgba(255,255,255,0.15)'; this.style.borderColor='rgba(255,255,255,0.3)'"
               onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(255,255,255,0.15)'">
              <strong>${letra})</strong> ${alt.replace(/^[A-D]\)\s*/, '')}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.getElementById("quizArea").innerHTML = html;
}

async function responderQuiz(resposta) {
  const { perguntas, perguntaIndex, marcaAtual, kbdAtual } = quizState;
  const pergunta = perguntas[perguntaIndex];
  const correto = resposta === pergunta.gabarito;

  // Registrar resposta
  quizState.historico.push({
    pergunta: pergunta.pergunta,
    resposta: resposta,
    correta: pergunta.gabarito,
    acertou: correto
  });

  if (correto) {
    quizState.acertos++;
  }

  // Enviar para Google Sheets
  await enviarParaSheets({
    setor: getSetor(),
    marca: marcaAtual.nome,
    kbd: kbdAtual ? kbdAtual.nome : "N/A",
    pergunta: pergunta.pergunta,
    resposta: resposta,
    correta: pergunta.gabarito,
    acertou: correto,
    score: Math.round((quizState.acertos / quizState.total) * 100),
    tentativa: quizState.tentativa
  });

  if (correto) {
    // CORRETO - apenas mostra feedback verde e avança
    mostrarFeedbackCorreto();
  } else {
    // ERRADO - mostra popup
    mostrarPopupErro(pergunta);
  }
}

function mostrarFeedbackCorreto() {
  const { perguntas, perguntaIndex } = quizState;
  
  document.getElementById("quizArea").innerHTML = `
    <div class="card" style="padding: 40px; text-align: center; background: rgba(0,255,100,0.15); border: 2px solid #00ff64;">
      <div style="font-size: 64px; margin-bottom: 16px;">✓</div>
      <div class="cardTitle" style="font-size: 24px; margin-bottom: 8px;">
        Correto!
      </div>
      <div class="cardSub" style="margin-top: 12px;">
        Você acertou a pergunta ${perguntaIndex + 1} de ${perguntas.length}
      </div>
    </div>
  `;

  // Avançar automaticamente após 1.5s
  setTimeout(() => {
    proximaPergunta();
  }, 1500);
}

function mostrarPopupErro(pergunta) {
  // Criar overlay
  const overlay = document.createElement('div');
  overlay.id = 'popupOverlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  `;

  overlay.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #ff3232 0%, #ff6b6b 100%);
      padding: 32px;
      border-radius: 20px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    ">
      <div style="text-align: center; margin-bottom: 20px; font-size: 64px;">
        ✗
      </div>
      <div style="font-size: 22px; font-weight: 900; margin-bottom: 16px; text-align: center;">
        Resposta Incorreta
      </div>
      <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; margin-bottom: 20px;">
        <div style="font-weight: 700; margin-bottom: 8px; font-size: 14px; opacity: 0.9;">
          Resposta correta:
        </div>
        <div style="font-size: 16px; font-weight: 900;">
          ${pergunta.gabarito}) ${pergunta.alternativas[pergunta.gabarito.charCodeAt(0) - 65].replace(/^[A-D]\)\s*/, '')}
        </div>
        ${pergunta.justificativa ? `
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 14px; opacity: 0.95;">
            ${pergunta.justificativa}
          </div>
        ` : ''}
      </div>
      <button onclick="fecharPopupErro()" style="
        width: 100%;
        padding: 16px;
        border-radius: 12px;
        border: none;
        background: white;
        color: #ff3232;
        font-size: 16px;
        font-weight: 900;
        cursor: pointer;
      ">
        Entendi
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
}

function fecharPopupErro() {
  const overlay = document.getElementById('popupOverlay');
  if (overlay) {
    overlay.remove();
  }
  proximaPergunta();
}

function proximaPergunta() {
  quizState.perguntaIndex++;

  if (quizState.perguntaIndex < quizState.perguntas.length) {
    // Ainda tem perguntas
    mostrarPergunta();
  } else {
    // Acabou o quiz
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  const { acertos, total } = quizState;
  const percentual = Math.round((acertos / total) * 100);
  
  // Definir medalha
  let cor, emoji, mensagem, gradiente;
  if (percentual >= 81) {
    cor = "ouro";
    emoji = "🥇";
    mensagem = "Ouro - Excelente!";
    gradiente = "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
  } else if (percentual >= 61) {
    cor = "prata";
    emoji = "🥈";
    mensagem = "Prata - Muito Bom!";
    gradiente = "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)";
  } else {
    cor = "bronze";
    emoji = "🥉";
    mensagem = "Bronze - Continue Estudando!";
    gradiente = "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)";
  }

  document.getElementById("quizArea").innerHTML = `
    <div class="card" style="padding: 40px; text-align: center; background: ${gradiente}; color: white;">
      <div style="font-size: 80px; margin-bottom: 16px;">${emoji}</div>
      <div style="font-size: 28px; font-weight: 900; margin-bottom: 12px;">
        ${mensagem}
      </div>
      <div style="font-size: 48px; font-weight: 900; margin: 20px 0;">
        ${percentual}%
      </div>
      <div style="font-size: 18px; opacity: 0.95;">
        ${acertos} de ${total} perguntas corretas
      </div>
      
      <button class="btnPrimary" onclick="proximoKBD()" style="
        margin-top: 30px;
        background: rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        Próximo KBD →
      </button>
    </div>
  `;
}

function proximoKBD() {
  const params = new URLSearchParams(window.location.search);
  const marcaIdAtual = params.get("marca");
  const kbdIdAtual = params.get("kbd");

  const marcaAtual = CONTENT.marcas.find(m => m.id === marcaIdAtual);
  if (!marcaAtual) {
    voltarHome();
    return;
  }

  // Encontrar índice do KBD atual
  const kbdIndex = marcaAtual.kbds.findIndex(k => k.id === kbdIdAtual);
  
  // Próximo KBD na mesma marca
  if (kbdIndex + 1 < marcaAtual.kbds.length) {
    const proximoKbd = marcaAtual.kbds[kbdIndex + 1];
    window.location.href = 
      "kbd.html?marca=" + encodeURIComponent(marcaIdAtual) +
      "&kbd=" + encodeURIComponent(proximoKbd.id);
    return;
  }

  // Próxima marca
  const marcaIndex = CONTENT.marcas.findIndex(m => m.id === marcaIdAtual);
  if (marcaIndex + 1 < CONTENT.marcas.length) {
    const proximaMarca = CONTENT.marcas[marcaIndex + 1];
    const primeiroKbd = proximaMarca.kbds[0];
    window.location.href = 
      "kbd.html?marca=" + encodeURIComponent(proximaMarca.id) +
      "&kbd=" + encodeURIComponent(primeiroKbd.id);
    return;
  }

  // Acabou tudo!
  alert("Parabéns! Você completou todos os KBDs! 🎉");
  voltarHome();
}

async function enviarParaSheets(dados) {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      setor: dados.setor,
      marca: dados.marca,
      kbd: dados.kbd,
      pergunta: dados.pergunta,
      resposta: dados.resposta,
      correta: dados.correta,
      acertou: dados.acertou ? "SIM" : "NÃO",
      score: dados.score,
      tentativa: dados.tentativa,
      userAgent: navigator.userAgent
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}

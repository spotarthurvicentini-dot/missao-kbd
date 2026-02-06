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

// ====== QUIZ ======
function irParaQuiz() {
  const params = new URLSearchParams(window.location.search);
  const marca = params.get("marca");
  const kbd = params.get("kbd");
  window.location.href = 
    "quiz.html?marca=" + encodeURIComponent(marca) +
    "&kbd=" + encodeURIComponent(kbd);
}

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

  // Atualizar título
  document.getElementById("quizTitulo").textContent = `Quiz ${marca.nome}`;
  document.getElementById("quizSubtitulo").textContent = "Teste seus conhecimentos";
  document.getElementById("setorBadge").textContent = getSetor();

  // Buscar perguntas do quiz
  const perguntas = QUIZZES[marcaId] || [];
  
  if (perguntas.length === 0) {
    document.getElementById("quizArea").innerHTML = `
      <div class="card" style="text-align: center; padding: 40px;">
        <div style="font-size: 48px; margin-bottom: 16px;">📝</div>
        <div class="cardTitle">Quiz em breve</div>
        <div class="cardSub" style="margin-top: 8px;">
          As perguntas para ${marca.nome} estão sendo preparadas.
        </div>
      </div>
    `;
    return;
  }

  // Renderizar quiz
  let html = '';
  
  perguntas.forEach((p, index) => {
    html += `
      <div class="quizPergunta" id="pergunta${index}" style="margin-bottom: 20px;">
        <div class="card" style="padding: 20px;">
          <div class="cardTitle" style="margin-bottom: 16px;">
            ${index + 1}. ${p.pergunta}
          </div>
          
          <div class="quizAlternativas" style="display: grid; gap: 10px;">
            ${p.alternativas.map((alt, i) => {
              const letra = String.fromCharCode(65 + i); // A, B, C, D
              return `
                <label class="quizOpcao" style="
                  display: block;
                  padding: 14px;
                  border-radius: 10px;
                  background: rgba(255,255,255,0.08);
                  border: 2px solid rgba(255,255,255,0.15);
                  cursor: pointer;
                  transition: all 0.2s;
                " onmouseover="this.style.background='rgba(255,255,255,0.15)'"
                   onmouseout="this.style.background='rgba(255,255,255,0.08)'">
                  <input type="radio" 
                         name="q${index}" 
                         value="${letra}"
                         style="margin-right: 8px;">
                  ${alt}
                </label>
              `;
            }).join('')}
          </div>
          
          <div id="feedback${index}" style="margin-top: 16px; display: none;">
            <!-- Feedback aparecerá aqui -->
          </div>
        </div>
      </div>
    `;
  });

  html += `
    <button class="btnPrimary" onclick="corrigirQuiz()" id="btnCorrigir">
      ✓ Corrigir Quiz
    </button>
    
    <div id="resultado" style="margin-top: 20px; display: none;">
      <!-- Resultado final -->
    </div>
  `;

  document.getElementById("quizArea").innerHTML = html;
  
  // Guardar dados do quiz
  window.quizAtual = {
    marcaId: marcaId,
    perguntas: perguntas
  };
}

function corrigirQuiz() {
  const { perguntas } = window.quizAtual;
  let acertos = 0;
  let total = perguntas.length;

  perguntas.forEach((p, index) => {
    const resposta = document.querySelector(`input[name="q${index}"]:checked`);
    const feedbackDiv = document.getElementById(`feedback${index}`);
    
    if (!resposta) {
      feedbackDiv.style.display = 'block';
      feedbackDiv.innerHTML = `
        <div style="padding: 12px; background: rgba(255,200,0,0.15); border-radius: 8px; border-left: 4px solid #ffc800;">
          ⚠️ Você não respondeu esta pergunta
        </div>
      `;
      return;
    }

    const correto = resposta.value === p.gabarito;
    if (correto) acertos++;

    feedbackDiv.style.display = 'block';
    feedbackDiv.innerHTML = `
      <div style="padding: 12px; background: ${correto ? 'rgba(0,255,100,0.15)' : 'rgba(255,50,50,0.15)'}; 
                  border-radius: 8px; border-left: 4px solid ${correto ? '#00ff64' : '#ff3232'};">
        ${correto ? '✓' : '✗'} ${correto ? 'Correto!' : 'Incorreto'}
        <br><small style="opacity: 0.9; margin-top: 4px; display: block;">
          ${p.justificativa || `Resposta correta: ${p.gabarito}`}
        </small>
      </div>
    `;
  });

  // Mostrar resultado final
  const percentual = Math.round((acertos / total) * 100);
  const emoji = percentual >= 70 ? '🎉' : percentual >= 50 ? '😊' : '📚';
  const mensagem = percentual >= 70 ? 'Excelente!' : percentual >= 50 ? 'Bom trabalho!' : 'Continue estudando!';

  document.getElementById("resultado").style.display = 'block';
  document.getElementById("resultado").innerHTML = `
    <div class="card" style="text-align: center; padding: 30px; background: rgba(255,255,255,0.12);">
      <div style="font-size: 64px; margin-bottom: 16px;">${emoji}</div>
      <div class="cardTitle" style="font-size: 24px; margin-bottom: 8px;">
        ${mensagem}
      </div>
      <div style="font-size: 32px; font-weight: 900; margin: 16px 0;">
        ${acertos}/${total}
      </div>
      <div class="cardSub" style="font-size: 16px;">
        ${percentual}% de acertos
      </div>
    </div>
  `;

  // Esconder botão de corrigir
  document.getElementById("btnCorrigir").style.display = 'none';

  // Scroll suave para o resultado
  setTimeout(() => {
    document.getElementById("resultado").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
}

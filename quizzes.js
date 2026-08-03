// quizzes.js — quizzes reais por KBD (marca -> kbd -> perguntas)
// Estrutura: QUIZZES[marcaId][kbdId] = [ { pergunta, alternativas, gabarito, justificativa } ]

const QUIZZES = {
  "tampax": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória do novo KBD de Tampax?",
        "alternativas": [
          "A) Ter Tampax em ponto extra, em qualquer lugar da loja",
          "B) Ter bandeja de Tampax executada no ponto natural de absorventes internos",
          "C) Ter apenas 1 unidade de Tampax exposta no checkout",
          "D) Ter Tampax exposto junto com Always"
        ],
        "gabarito": "B",
        "justificativa": "no canal DPP, a loja deve possuir bandeja de Tampax executada no ponto natural da categoria de absorventes internos, com produto abastecido e visível."
      },
      {
        "pergunta": "Em qual canal esse KBD é válido?",
        "alternativas": [
          "A) Apenas HFS",
          "B) Apenas C&C",
          "C) DPP",
          "D) Todos os canais, exceto CLUB"
        ],
        "gabarito": "C",
        "justificativa": "no canal DPP, a loja deve possuir bandeja de Tampax executada no ponto natural da categoria de absorventes internos, com produto abastecido e visível."
      },
      {
        "pergunta": "Onde a bandeja de Tampax precisa estar posicionada?",
        "alternativas": [
          "A) No ponto extra, fora da categoria",
          "B) No checkout",
          "C) Dentro da categoria de absorventes internos (ponto natural)",
          "D) Em qualquer prateleira da loja"
        ],
        "gabarito": "C",
        "justificativa": "no canal DPP, a loja deve possuir bandeja de Tampax executada no ponto natural da categoria de absorventes internos, com produto abastecido e visível."
      },
      {
        "pergunta": "Quais produtos são válidos para essa execução?",
        "alternativas": [
          "A) Tampax Compak Super, Intenso e Muito Intenso",
          "B) Apenas Tampax Compak Super",
          "C) Qualquer absorvente interno da categoria",
          "D) Tampax Compak com menos de 8 unidades"
        ],
        "gabarito": "A",
        "justificativa": "os produtos válidos são Tampax Compak Super, Tampax Compak Intenso e Tampax Compak Muito Intenso, sempre com a bandeja abastecida e visível dentro da categoria de absorventes internos."
      },
      {
        "pergunta": "Qual das situações abaixo é um erro comum e não deve ser considerada correta?",
        "alternativas": [
          "A) Bandeja de Tampax dentro da categoria de absorventes internos",
          "B) Bandeja de Tampax posicionada no ponto extra",
          "C) Produto Tampax abastecido e visível",
          "D) Bandeja de Tampax no ponto natural em loja DPP"
        ],
        "gabarito": "B",
        "justificativa": "erros comuns: bandeja fora da categoria (ponto extra), bandeja vazia ou execução fora do ponto natural. O foco do promotor é garantir a bandeja abastecida e bem posicionada no ponto natural."
      }
    ]
  },
  "always": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória do KBD de Always no modo campo?",
        "alternativas": [
          "A) Garantir 50% da gôndola de absorventes com versões Suave",
          "B) Garantir 70% da gôndola de Always com versões Suave",
          "C) Garantir 70% da gôndola total da categoria com versões Secas",
          "D) Garantir 80% da gôndola de Always com qualquer versão da marca"
        ],
        "gabarito": "B",
        "justificativa": "O objetivo é ter 70% da gôndola de Always com versões Suave, medição em centímetros, considerando apenas absorventes Always e sem contar protetores diários; também traz o que entra como “Suave” e o que não pode ser considerado."
      },
      {
        "pergunta": "Qual é a forma correta de medir o KBD de Always Suave?",
        "alternativas": [
          "A) Por número de frentes",
          "B) Por quantidade de pacotes",
          "C) Em centímetros",
          "D) Por blocos visuais, sem medir"
        ],
        "gabarito": "C",
        "justificativa": "O objetivo é ter 70% da gôndola de Always com versões Suave, medição em centímetros, considerando apenas absorventes Always e sem contar protetores diários; também traz o que entra como “Suave” e o que não pode ser considerado."
      },
      {
        "pergunta": "Qual dos itens abaixo não deve ser contado na leitura do KBD de Always?",
        "alternativas": [
          "A) Always Ultra Suave",
          "B) Always Cobertura Suave",
          "C) Protetor diário Always",
          "D) Always Suave Noturno"
        ],
        "gabarito": "C",
        "justificativa": "O objetivo é ter 70% da gôndola de Always com versões Suave, medição em centímetros, considerando apenas absorventes Always e sem contar protetores diários; também traz o que entra como “Suave” e o que não pode ser considerado."
      },
      {
        "pergunta": "Em uma execução de gôndola, qual situação está correta segundo o guia?",
        "alternativas": [
          "A) Misturar versões Suave e Secas sem bloco, desde que sejam da marca Always",
          "B) Contar protetores diários como parte da execução Suave",
          "C) Medir por frentes, desde que a marca esteja bem exposta",
          "D) Considerar apenas absorventes Always e focar nas versões Suave"
        ],
        "gabarito": "D",
        "justificativa": "O objetivo é ter 70% da gôndola de Always com versões Suave, medição em centímetros, considerando apenas absorventes Always e sem contar protetores diários; também traz o que entra como “Suave” e o que não pode ser considerado."
      },
      {
        "pergunta": "Qual alternativa contém apenas versões que contam como “Suave” no KBD de Always?",
        "alternativas": [
          "A) Always Suave, Always Ultra Suave, Always Cobertura Suave e Always Suave Noturno",
          "B) Always Seca, Always Ultra Suave, protetor diário e Always Suave",
          "C) Always Cobertura Suave, Always Seca Noturno, protetor diário e Always Ultra",
          "D) Always Suave, protetor diário, Always Suave Noturno e Always Seca"
        ],
        "gabarito": "A",
        "justificativa": "O objetivo é ter 70% da gôndola de Always com versões Suave, medição em centímetros, considerando apenas absorventes Always e sem contar protetores diários; também traz o que entra como “Suave” e o que não pode ser considerado."
      }
    ]
  },
  "downy": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória para validar o KBD de Downy no Ponto Extra (Brisa)?",
        "alternativas": [
          "A) Ter qualquer ponto natural de Downy com no mínimo 2 versões",
          "B) Ter Ponto Extra de Downy com as versões obrigatórias",
          "C) Ter apenas Brisa de Verão no ponto extra",
          "D) Ter qualquer versão de Downy exposta fora da gôndola"
        ],
        "gabarito": "B",
        "justificativa": ""
      },
      {
        "pergunta": "Quais canais são elegíveis para esse KBD?",
        "alternativas": [
          "A) C&C, NMR/GMR, CLUB, LASA e HFS",
          "B) C&C, DPP, PERFUMARIA e HFS",
          "C) NMR/GMR, CLUB, DPP e PERFUMARIA",
          "D) Apenas C&C, CLUB e LASA"
        ],
        "gabarito": "A",
        "justificativa": ""
      },
      {
        "pergunta": "Para que o ponto extra seja considerado válido, quais versões precisam estar juntas OBRIGATORIAMENTE?",
        "alternativas": [
          "A) Brisa Suave e Verão Tropical",
          "B) Brisa de Verão e Brisa Intenso",
          "C) Brisa Intenso e Brisa Suave",
          "D) Verão Tropical e qualquer outra versão de Downy"
        ],
        "gabarito": "B",
        "justificativa": ""
      },
      {
        "pergunta": "Qual das situações abaixo invalida a execução do KBD?",
        "alternativas": [
          "A) Ter Brisa de Verão, Brisa Intenso e Brisa Suave no ponto extra",
          "B) Montar o ponto extra em um canal elegível",
          "C) Ter Brisa de Verão e Brisa Suave e Verão Tropical no ponto extra",
          "D) Expor Verão Tropical junto das versões obrigatórias"
        ],
        "gabarito": "C",
        "justificativa": ""
      },
      {
        "pergunta": "Qual alternativa representa corretamente as versões obrigatórias do KBD de Ponto Extra (Brisa)?",
        "alternativas": [
          "A) Brisa de Verão + Brisa Intenso + Brisa Suave ou Verão Tropical",
          "B) Brisa Suave + Verão Tropical + Brisa Intenso",
          "C) Brisa de Verão + Brisa Suave + Verão Tropical",
          "D) Brisa Intenso + Brisa Suave + Verão Tropical"
        ],
        "gabarito": "A",
        "justificativa": ""
      }
    ],
    "kbd2": [
      {
        "pergunta": "Qual é a execução obrigatória do KBD Downy | Bloco Azul (50%)?",
        "alternativas": [
          "A) Garantir 40% do espaço de Downy com versões coloridas",
          "B) Garantir 50% do espaço de Downy com Bloco Azul",
          "C) Garantir 50% da gôndola total da categoria com qualquer versão de Downy",
          "D) Garantir 70% do espaço de Downy com Brisa de Verão"
        ],
        "gabarito": "B",
        "justificativa": "garantir 50% do espaço de Downy com Bloco Azul, medir em centímetros pela fórmula cm Bloco Azul / cm Total Downy, considerar como bloco as versões Brisa de Verão, Brisa Intenso e Brisa Suave, não contar versões fora do bloco, considerar as versões disponíveis na loja, e os canais válidos são todos, exceto DPP e Perfumaria. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Como deve ser feita a medição correta desse KBD?",
        "alternativas": [
          "A) Pela quantidade de frentes de Downy azul",
          "B) Pela quantidade de SKUs disponíveis",
          "C) Em centímetros: cm Bloco Azul / cm Total Downy",
          "D) Em blocos visuais, sem necessidade de medir"
        ],
        "gabarito": "C",
        "justificativa": "garantir 50% do espaço de Downy com Bloco Azul, medir em centímetros pela fórmula cm Bloco Azul / cm Total Downy, considerar como bloco as versões Brisa de Verão, Brisa Intenso e Brisa Suave, não contar versões fora do bloco, considerar as versões disponíveis na loja, e os canais válidos são todos, exceto DPP e Perfumaria. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Quais versões fazem parte do Bloco Azul?",
        "alternativas": [
          "A) Brisa de Verão, Brisa Intenso e Brisa Suave",
          "B) Brisa de Verão, Alfazema e Lírios",
          "C) Brisa Intenso, Verão Tropical e Frescor da Primavera",
          "D) Brisa Suave, Verão Tropical e Alfazema"
        ],
        "gabarito": "A",
        "justificativa": "garantir 50% do espaço de Downy com Bloco Azul, medir em centímetros pela fórmula cm Bloco Azul / cm Total Downy, considerar como bloco as versões Brisa de Verão, Brisa Intenso e Brisa Suave, não contar versões fora do bloco, considerar as versões disponíveis na loja, e os canais válidos são todos, exceto DPP e Perfumaria. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Qual situação abaixo está incorreta segundo o guia?",
        "alternativas": [
          "A) Considerar as versões disponíveis na loja no momento da leitura",
          "B) Medir o espaço de Downy em centímetros",
          "C) Contar versões fora do Bloco Azul para completar o percentual",
          "D) Substituir por versões do mesmo bloco em caso de ruptura"
        ],
        "gabarito": "C",
        "justificativa": "garantir 50% do espaço de Downy com Bloco Azul, medir em centímetros pela fórmula cm Bloco Azul / cm Total Downy, considerar como bloco as versões Brisa de Verão, Brisa Intenso e Brisa Suave, não contar versões fora do bloco, considerar as versões disponíveis na loja, e os canais válidos são todos, exceto DPP e Perfumaria. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Em quais canais esse KBD é válido?",
        "alternativas": [
          "A) Apenas C&C, NMR/GMR e CLUB",
          "B) Todos os canais, exceto DPP e Perfumaria",
          "C) Apenas LASA, HFS e DPP",
          "D) Somente Perfumaria e DPP"
        ],
        "gabarito": "B",
        "justificativa": "garantir 50% do espaço de Downy com Bloco Azul, medir em centímetros pela fórmula cm Bloco Azul / cm Total Downy, considerar como bloco as versões Brisa de Verão, Brisa Intenso e Brisa Suave, não contar versões fora do bloco, considerar as versões disponíveis na loja, e os canais válidos são todos, exceto DPP e Perfumaria. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      }
    ],
    "kbd3": [
      {
        "pergunta": "Qual é a execução obrigatória do KBD Downy | Bloco Colorido (40%)?",
        "alternativas": [
          "A) Garantir 50% do espaço de Downy com qualquer versão colorida",
          "B) Garantir 40% do espaço de Downy com o Bloco Colorido",
          "C) Garantir 40% da gôndola total da categoria com Downy",
          "D) Garantir 70% do espaço de Downy com Verão Tropical"
        ],
        "gabarito": "B",
        "justificativa": "garantir 40% do espaço de Downy com o Bloco Colorido, medir em centímetros pela fórmula cm Bloco Colorido / cm Total Downy, considerar como bloco as versões Alfazema, Lírios, Verão Tropical e Frescor da Primavera, não contar versões fora do bloco, sempre considerar as versões disponíveis na loja, e os canais elegíveis são C&C, NMR/GMR, CLUB, LASA e HFS. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Como deve ser feita a medição correta desse KBD?",
        "alternativas": [
          "A) Pela quantidade de frentes do bloco",
          "B) Pela soma dos SKUs coloridos disponíveis",
          "C) Em centímetros: cm Bloco Colorido / cm Total Downy",
          "D) Pela presença visual do bloco na gôndola"
        ],
        "gabarito": "C",
        "justificativa": "garantir 40% do espaço de Downy com o Bloco Colorido, medir em centímetros pela fórmula cm Bloco Colorido / cm Total Downy, considerar como bloco as versões Alfazema, Lírios, Verão Tropical e Frescor da Primavera, não contar versões fora do bloco, sempre considerar as versões disponíveis na loja, e os canais elegíveis são C&C, NMR/GMR, CLUB, LASA e HFS. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Quais versões fazem parte do Bloco Colorido?",
        "alternativas": [
          "A) Alfazema, Lírios, Verão Tropical e Frescor da Primavera",
          "B) Brisa de Verão, Brisa Intenso, Brisa Suave e Verão Tropical",
          "C) Alfazema, Brisa Suave, Lírios e Frescor da Primavera",
          "D) Lírios, Brisa Intenso, Verão Tropical e Alfazema"
        ],
        "gabarito": "A",
        "justificativa": "garantir 40% do espaço de Downy com o Bloco Colorido, medir em centímetros pela fórmula cm Bloco Colorido / cm Total Downy, considerar como bloco as versões Alfazema, Lírios, Verão Tropical e Frescor da Primavera, não contar versões fora do bloco, sempre considerar as versões disponíveis na loja, e os canais elegíveis são C&C, NMR/GMR, CLUB, LASA e HFS. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Qual das situações abaixo está incorreta segundo o guia?",
        "alternativas": [
          "A) Considerar as versões disponíveis em loja no momento da leitura",
          "B) Substituir por versões do mesmo bloco em caso de ruptura",
          "C) Contar versões fora do Bloco Colorido para completar o percentual",
          "D) Medir o espaço de Downy em centímetros"
        ],
        "gabarito": "C",
        "justificativa": "garantir 40% do espaço de Downy com o Bloco Colorido, medir em centímetros pela fórmula cm Bloco Colorido / cm Total Downy, considerar como bloco as versões Alfazema, Lírios, Verão Tropical e Frescor da Primavera, não contar versões fora do bloco, sempre considerar as versões disponíveis na loja, e os canais elegíveis são C&C, NMR/GMR, CLUB, LASA e HFS. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      },
      {
        "pergunta": "Em quais canais esse KBD é elegível?",
        "alternativas": [
          "A) Todos os Canais",
          "B) Apenas C&C e NMR/GMR",
          "C) C&C, NMR/GMR, CLUB e LASA",
          "D) Somente DPP, HFS e Perfumaria"
        ],
        "gabarito": "C",
        "justificativa": "garantir 40% do espaço de Downy com o Bloco Colorido, medir em centímetros pela fórmula cm Bloco Colorido / cm Total Downy, considerar como bloco as versões Alfazema, Lírios, Verão Tropical e Frescor da Primavera, não contar versões fora do bloco, sempre considerar as versões disponíveis na loja, e os canais elegíveis são C&C, NMR/GMR, CLUB, LASA e HFS. Em caso de ruptura, a substituição deve ser por versões do mesmo bloco."
      }
    ]
  },
  "pantene": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória do KBD Pantene – Bond Repair?",
        "alternativas": [
          "A) Garantir 20% do espaço total da categoria cabelos para Pantene",
          "B) Garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair",
          "C) Garantir 40% do espaço de Pantene para Bond Repair",
          "D) Garantir 20% da gôndola total com packs de Bond Repair"
        ],
        "gabarito": "B",
        "justificativa": "garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair, excluindo packs do cálculo. A medição é em centímetros e considera apenas produtos Pantene Bond Repair. Vale para todos os canais."
      },
      {
        "pergunta": "Como deve ser feita a medição correta desse KBD?",
        "alternativas": [
          "A) Por frentes",
          "B) Por quantidade de SKUs",
          "C) Em centímetros",
          "D) Por número de produtos expostos"
        ],
        "gabarito": "C",
        "justificativa": "garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair, excluindo packs do cálculo. A medição é em centímetros e considera apenas produtos Pantene Bond Repair. Vale para todos os canais."
      },
      {
        "pergunta": "O que deve ser excluído da leitura desse KBD?",
        "alternativas": [
          "A) Apenas os SKUs pequenos",
          "B) Apenas os itens do topo da gôndola",
          "C) Packs de Bond Repair",
          "D) Todas as versões de tratamento Pantene"
        ],
        "gabarito": "C",
        "justificativa": "garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair, excluindo packs do cálculo. A medição é em centímetros e considera apenas produtos Pantene Bond Repair. Vale para todos os canais."
      },
      {
        "pergunta": "Qual alternativa está correta sobre o que conta nesse KBD?",
        "alternativas": [
          "A) Somar Bond Repair com qualquer outro tratamento Pantene",
          "B) Somar apenas Pantene Bond Repair, sem contar packs",
          "C) Contar qualquer tratamento Pantene que esteja no topo da gôndola",
          "D) Contar Bond Repair apenas se estiver em ponto extra"
        ],
        "gabarito": "B",
        "justificativa": "garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair, excluindo packs do cálculo. A medição é em centímetros e considera apenas produtos Pantene Bond Repair. Vale para todos os canais."
      },
      {
        "pergunta": "Qual situação abaixo está incorreta segundo o guia?",
        "alternativas": [
          "A) Medir o espaço de Bond Repair em centímetros",
          "B) Aplicar o KBD em todos os canais",
          "C) Contar packs para ajudar a completar o percentual",
          "D) Garantir no mínimo 20% do espaço de Pantene"
        ],
        "gabarito": "C",
        "justificativa": "garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair, excluindo packs do cálculo. A medição é em centímetros e considera apenas produtos Pantene Bond Repair. Vale para todos os canais."
      }
    ],
    "kbd3": [
      {
        "pergunta": "Qual é a execução obrigatória do KBD 2 Pontos de Contato com Finalizadores Pantene?",
        "alternativas": [
          "A) Executar 2 frentes de Óleo Pantene na gôndola",
          "B) Executar no mínimo 2 pontos de contato com Óleo, Sérum ou Leave-in Pantene",
          "C) Executar 2 checkouts com qualquer item Pantene",
          "D) Executar 2 SKUs de finalizadores no ponto natural"
        ],
        "gabarito": "B",
        "justificativa": "executar no mínimo 2 pontos de contato com finalizadores Pantene (Óleo, Sérum e Leave-in), sempre fora do ponto natural. Cada execução separada conta como 1 ponto. O que mudou: antes valia só para Óleo, agora Sérum e Leave-in também entram na conta."
      },
      {
        "pergunta": "Quais produtos agora contam para esse KBD, além do Óleo?",
        "alternativas": [
          "A) Apenas embalagens promocionais",
          "B) Sérum e Leave-in Pantene",
          "C) Shampoo e Condicionador Pantene",
          "D) Máscaras de tratamento Pantene"
        ],
        "gabarito": "B",
        "justificativa": "executar no mínimo 2 pontos de contato com finalizadores Pantene (Óleo, Sérum e Leave-in), sempre fora do ponto natural. Cada execução separada conta como 1 ponto. O que mudou: antes valia só para Óleo, agora Sérum e Leave-in também entram na conta."
      },
      {
        "pergunta": "Onde os pontos de contato precisam estar localizados?",
        "alternativas": [
          "A) Dentro do ponto natural, junto com a gôndola",
          "B) Fora do ponto natural",
          "C) Apenas no checkout",
          "D) Não importa, desde que o produto esteja na loja"
        ],
        "gabarito": "B",
        "justificativa": "executar no mínimo 2 pontos de contato com finalizadores Pantene (Óleo, Sérum e Leave-in), sempre fora do ponto natural. Cada execução separada conta como 1 ponto. O que mudou: antes valia só para Óleo, agora Sérum e Leave-in também entram na conta."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Ter Óleo Pantene em clipstrip e Sérum em ilha",
          "B) Ter Leave-in em display fora do ponto natural",
          "C) Contar o ponto natural como 1 dos 2 pontos de contato",
          "D) Executar finalizadores fora do ponto natural"
        ],
        "gabarito": "C",
        "justificativa": "executar no mínimo 2 pontos de contato com finalizadores Pantene (Óleo, Sérum e Leave-in), sempre fora do ponto natural. Cada execução separada conta como 1 ponto. O que mudou: antes valia só para Óleo, agora Sérum e Leave-in também entram na conta."
      },
      {
        "pergunta": "O que mudou nesse KBD em relação ao ciclo anterior?",
        "alternativas": [
          "A) Reduziu de 2 para 1 ponto de contato",
          "B) Passou a valer também para Sérum e Leave-in, além do Óleo",
          "C) Passou a aceitar ponto natural como ponto válido",
          "D) Ficou restrito apenas ao canal DPP"
        ],
        "gabarito": "B",
        "justificativa": "executar no mínimo 2 pontos de contato com finalizadores Pantene (Óleo, Sérum e Leave-in), sempre fora do ponto natural. Cada execução separada conta como 1 ponto. O que mudou: antes valia só para Óleo, agora Sérum e Leave-in também entram na conta."
      }
    ],
    "kbd5": [
      {
        "pergunta": "Qual é a execução obrigatória do novo KBD Finalizadores com Espaço Garantido?",
        "alternativas": [
          "A) Ter qualquer quantidade de Óleo, Sérum e Leave-in na gôndola",
          "B) Garantir uma quantidade mínima de frentes de Óleo, Sérum e Leave-in na gôndola",
          "C) Ter apenas 1 frente de cada finalizador",
          "D) Garantir 100% do espaço de finalizadores da categoria"
        ],
        "gabarito": "B",
        "justificativa": "Óleo, Sérum e Leave-in agora precisam ter uma quantidade mínima de frentes visíveis na gôndola: 8 frentes em DPP e 6 frentes nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA, HFS e PERFUMARIA). Cada produto voltado para frente conta 1 vez, sem duplicar a mesma frente."
      },
      {
        "pergunta": "Qual é a meta de frentes no canal DPP?",
        "alternativas": [
          "A) Pelo menos 6 frentes",
          "B) Pelo menos 8 frentes",
          "C) Pelo menos 10 frentes",
          "D) Não há meta específica para DPP"
        ],
        "gabarito": "B",
        "justificativa": "Óleo, Sérum e Leave-in agora precisam ter uma quantidade mínima de frentes visíveis na gôndola: 8 frentes em DPP e 6 frentes nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA, HFS e PERFUMARIA). Cada produto voltado para frente conta 1 vez, sem duplicar a mesma frente."
      },
      {
        "pergunta": "Qual é a meta de frentes em C&C, NMR/GMR, CLUB, LASA, HFS e PERFUMARIA?",
        "alternativas": [
          "A) Pelo menos 6 frentes",
          "B) Pelo menos 8 frentes",
          "C) Pelo menos 10 frentes",
          "D) Pelo menos 15 frentes"
        ],
        "gabarito": "A",
        "justificativa": "Óleo, Sérum e Leave-in agora precisam ter uma quantidade mínima de frentes visíveis na gôndola: 8 frentes em DPP e 6 frentes nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA, HFS e PERFUMARIA). Cada produto voltado para frente conta 1 vez, sem duplicar a mesma frente."
      },
      {
        "pergunta": "Qual situação abaixo é um erro comum nesse KBD?",
        "alternativas": [
          "A) Contar apenas frentes visíveis na gôndola",
          "B) Contar a mesma frente duas vezes",
          "C) Somar Óleo, Sérum e Leave-in juntos",
          "D) Garantir a meta correta por canal"
        ],
        "gabarito": "B",
        "justificativa": "Óleo, Sérum e Leave-in agora precisam ter uma quantidade mínima de frentes visíveis na gôndola: 8 frentes em DPP e 6 frentes nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA, HFS e PERFUMARIA). Cada produto voltado para frente conta 1 vez, sem duplicar a mesma frente."
      },
      {
        "pergunta": "Qual produto exposto NÃO deve ser contado nesse KBD?",
        "alternativas": [
          "A) Óleo Pantene na gôndola, voltado para frente",
          "B) Sérum Pantene em clipstrip ou checkout",
          "C) Leave-in Pantene visível na gôndola",
          "D) Óleo Pantene exposto corretamente em DPP"
        ],
        "gabarito": "B",
        "justificativa": "Somente os finalizadores expostos na gôndola (ponto natural) contam para este KBD; produto em clipstrip, checkout, ilha ou display não entra na contagem de frentes garantidas."
      }
    ]
  },
  "pampers": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Ter um ponto extra de Pampers com 100% dos produtos em tamanho G",
          "B) Executar ponto extra de Pampers com pelo menos 50% de fraldas XG, XXG ou XXXG",
          "C) Executar ponto natural de Pampers com tamanhos variados",
          "D) Ter os três tamanhos grandes obrigatoriamente no ponto extra"
        ],
        "gabarito": "B",
        "justificativa": "executar Ponto Extra de Pampers com pelo menos 50% de fraldas XG, XXG ou XXXG. Os canais elegíveis são C&C, NMR/GMR, CLUB e LASA. O guia também deixa claro que não é obrigatório ter os três tamanhos, que HFS e Perfumaria não são elegíveis, e que pode haver concorrência no mesmo ponto extra, desde que Pampers com tamanhos grandes esteja executado."
      },
      {
        "pergunta": "Quais canais são elegíveis para esse KBD?",
        "alternativas": [
          "A) C&C, NMR/GMR, CLUB e LASA",
          "B) C&C, HFS, CLUB e Perfumaria",
          "C) NMR/GMR, HFS, LASA e DPP",
          "D) Apenas C&C e NMR/GMR"
        ],
        "gabarito": "A",
        "justificativa": "executar Ponto Extra de Pampers com pelo menos 50% de fraldas XG, XXG ou XXXG. Os canais elegíveis são C&C, NMR/GMR, CLUB e LASA. O guia também deixa claro que não é obrigatório ter os três tamanhos, que HFS e Perfumaria não são elegíveis, e que pode haver concorrência no mesmo ponto extra, desde que Pampers com tamanhos grandes esteja executado."
      },
      {
        "pergunta": "O que o guia diz sobre os tamanhos XG, XXG e XXXG?",
        "alternativas": [
          "A) É obrigatório ter os três tamanhos juntos",
          "B) Basta ter um dos tamanhos grandes para já valer, desde que cumpra a regra",
          "C) Só vale se tiver XXG e XXXG juntos",
          "D) O tamanho XG não conta como tamanho grande"
        ],
        "gabarito": "B",
        "justificativa": "executar Ponto Extra de Pampers com pelo menos 50% de fraldas XG, XXG ou XXXG. Os canais elegíveis são C&C, NMR/GMR, CLUB e LASA. O guia também deixa claro que não é obrigatório ter os três tamanhos, que HFS e Perfumaria não são elegíveis, e que pode haver concorrência no mesmo ponto extra, desde que Pampers com tamanhos grandes esteja executado."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Ter concorrência no mesmo ponto extra, desde que Pampers tamanhos grandes esteja executado",
          "B) Validar a execução em canal HFS",
          "C) Ter no ponto extra fraldas Pampers XG ocupando pelo menos metade do espaço",
          "D) Montar o ponto extra em canal LASA"
        ],
        "gabarito": "B",
        "justificativa": "executar Ponto Extra de Pampers com pelo menos 50% de fraldas XG, XXG ou XXXG. Os canais elegíveis são C&C, NMR/GMR, CLUB e LASA. O guia também deixa claro que não é obrigatório ter os três tamanhos, que HFS e Perfumaria não são elegíveis, e que pode haver concorrência no mesmo ponto extra, desde que Pampers com tamanhos grandes esteja executado."
      },
      {
        "pergunta": "Qual alternativa representa corretamente uma execução válida?",
        "alternativas": [
          "A) Ponto extra de Pampers em C&C com 50% ou mais de XG/XXG/XXXG",
          "B) Ponto natural de Pampers em HFS com tamanhos RN e P",
          "C) Ponto extra em Perfumaria com qualquer tamanho de Pampers",
          "D) Ponto extra de Pampers com exigência obrigatória dos três tamanhos grandes"
        ],
        "gabarito": "A",
        "justificativa": "executar Ponto Extra de Pampers com pelo menos 50% de fraldas XG, XXG ou XXXG. Os canais elegíveis são C&C, NMR/GMR, CLUB e LASA. O guia também deixa claro que não é obrigatório ter os três tamanhos, que HFS e Perfumaria não são elegíveis, e que pode haver concorrência no mesmo ponto extra, desde que Pampers com tamanhos grandes esteja executado."
      }
    ],
    "kbd2": [
      {
        "pergunta": "Como deve ser feita a medição correta do KBD Pampers – Pants?",
        "alternativas": [
          "A) Por frentes de Pampers Pants",
          "B) Em centímetros: cm Pants / cm Total Pampers",
          "C) Por quantidade de pacotes Pants na loja",
          "D) Por número de tamanhos disponíveis"
        ],
        "gabarito": "B",
        "justificativa": "edir em centímetros pela fórmula cm Pants / cm Total Pampers, somando apenas as versões Ajuste Total, Super Pants, PC Pants e Splashers; considerar somente as versões que existem na loja; e o objetivo varia por canal/região, então deve ser consultada a tabela do guia. Se não houver cadastro/ruptura de Total Pants, o KBD fica não válido e deve ser marcado como não executando."
      },
      {
        "pergunta": "Quais versões contam para esse KBD?",
        "alternativas": [
          "A) Ajuste Total, Super Pants, PC Pants e Splashers",
          "B) Ajuste Total, Premium Care, Confort Sec e Splashers",
          "C) Super Pants, Premium, XXG e Splashers",
          "D) Apenas Ajuste Total e Super Pants"
        ],
        "gabarito": "A",
        "justificativa": "edir em centímetros pela fórmula cm Pants / cm Total Pampers, somando apenas as versões Ajuste Total, Super Pants, PC Pants e Splashers; considerar somente as versões que existem na loja; e o objetivo varia por canal/região, então deve ser consultada a tabela do guia. Se não houver cadastro/ruptura de Total Pants, o KBD fica não válido e deve ser marcado como não executando."
      },
      {
        "pergunta": "O que deve ser feito quando não houver cadastro ou houver ruptura de Total Pants na loja?",
        "alternativas": [
          "A) Validar com qualquer versão Pampers disponível",
          "B) Substituir por Premium e seguir a leitura",
          "C) Considerar o KBD não válido e marcar como não executando",
          "D) Medir apenas o total da categoria e estimar o percentual"
        ],
        "gabarito": "C",
        "justificativa": "edir em centímetros pela fórmula cm Pants / cm Total Pampers, somando apenas as versões Ajuste Total, Super Pants, PC Pants e Splashers; considerar somente as versões que existem na loja; e o objetivo varia por canal/região, então deve ser consultada a tabela do guia. Se não houver cadastro/ruptura de Total Pants, o KBD fica não válido e deve ser marcado como não executando."
      },
      {
        "pergunta": "Qual das situações abaixo está incorreta segundo o guia?",
        "alternativas": [
          "A) Somar apenas as versões Pants",
          "B) Considerar apenas versões que existem na loja",
          "C) Ignorar o objetivo por região/canal",
          "D) Medir em centímetros"
        ],
        "gabarito": "C",
        "justificativa": "edir em centímetros pela fórmula cm Pants / cm Total Pampers, somando apenas as versões Ajuste Total, Super Pants, PC Pants e Splashers; considerar somente as versões que existem na loja; e o objetivo varia por canal/região, então deve ser consultada a tabela do guia. Se não houver cadastro/ruptura de Total Pants, o KBD fica não válido e deve ser marcado como não executando."
      },
      {
        "pergunta": "Sobre o objetivo desse KBD, qual alternativa está correta?",
        "alternativas": [
          "A) O objetivo é fixo para todos os canais",
          "B) O objetivo só muda entre marcas concorrentes",
          "C) O objetivo por canal deve ser consultado na tabela do guia",
          "D) O objetivo é sempre 50% em São Paulo"
        ],
        "gabarito": "C",
        "justificativa": "edir em centímetros pela fórmula cm Pants / cm Total Pampers, somando apenas as versões Ajuste Total, Super Pants, PC Pants e Splashers; considerar somente as versões que existem na loja; e o objetivo varia por canal/região, então deve ser consultada a tabela do guia. Se não houver cadastro/ruptura de Total Pants, o KBD fica não válido e deve ser marcado como não executando."
      }
    ],
    "kbd3": [
      {
        "pergunta": "Como deve ser feita a medição correta desse KBD?",
        "alternativas": [
          "A) Por frentes de Pampers Premium",
          "B) Em centímetros: cm Pants + Premium / cm Total Pampers",
          "C) Pela quantidade de pacotes Pants e Premium",
          "D) Pela soma dos tamanhos disponíveis"
        ],
        "gabarito": "B",
        "justificativa": "medir em centímetros pela fórmula cm Pants + Premium / cm Total Pampers; somar apenas Ajuste Total, Super Pants, PC Pants, Splashers e Premium; considerar apenas as versões que existem na loja; o objetivo por canal deve ser consultado na tabela; e, se não houver cadastro/ruptura de Total Pants, o KBD fica não válido. O guia também reforça que não pode aplicar fora do Sul nem contar versões fora do grupo Pants + Premium."
      },
      {
        "pergunta": "Quais versões entram no cálculo desse KBD?",
        "alternativas": [
          "A) Ajuste Total, Super Pants, PC Pants, Splashers e Premium",
          "B) Ajuste Total, Premium Care, Confort Sec e Splashers",
          "C) Super Pants, Premium, RN e P",
          "D) Apenas Pants e Confort Sec"
        ],
        "gabarito": "A",
        "justificativa": "medir em centímetros pela fórmula cm Pants + Premium / cm Total Pampers; somar apenas Ajuste Total, Super Pants, PC Pants, Splashers e Premium; considerar apenas as versões que existem na loja; o objetivo por canal deve ser consultado na tabela; e, se não houver cadastro/ruptura de Total Pants, o KBD fica não válido. O guia também reforça que não pode aplicar fora do Sul nem contar versões fora do grupo Pants + Premium."
      },
      {
        "pergunta": "Qual das situações abaixo torna a leitura incorreta?",
        "alternativas": [
          "A) Considerar apenas versões que existem na loja",
          "B) Consultar o objetivo na tabela por canal",
          "C) Aplicar o KBD em lojas fora da região Sul",
          "D) Somar Pants + Premium no cálculo"
        ],
        "gabarito": "C",
        "justificativa": "medir em centímetros pela fórmula cm Pants + Premium / cm Total Pampers; somar apenas Ajuste Total, Super Pants, PC Pants, Splashers e Premium; considerar apenas as versões que existem na loja; o objetivo por canal deve ser consultado na tabela; e, se não houver cadastro/ruptura de Total Pants, o KBD fica não válido. O guia também reforça que não pode aplicar fora do Sul nem contar versões fora do grupo Pants + Premium."
      },
      {
        "pergunta": "O que deve ser feito se não houver cadastro ou houver ruptura de Total Pants?",
        "alternativas": [
          "A) Validar com Premium apenas",
          "B) Considerar o KBD não válido e marcar como não executando",
          "C) Substituir por qualquer versão Pampers",
          "D) Medir só o Premium e seguir normalmente"
        ],
        "gabarito": "B",
        "justificativa": "medir em centímetros pela fórmula cm Pants + Premium / cm Total Pampers; somar apenas Ajuste Total, Super Pants, PC Pants, Splashers e Premium; considerar apenas as versões que existem na loja; o objetivo por canal deve ser consultado na tabela; e, se não houver cadastro/ruptura de Total Pants, o KBD fica não válido. O guia também reforça que não pode aplicar fora do Sul nem contar versões fora do grupo Pants + Premium."
      },
      {
        "pergunta": "Qual alternativa está correta segundo o guia?",
        "alternativas": [
          "A) Pode contar versões fora do grupo Pants + Premium para ajudar no percentual",
          "B) O KBD vale para qualquer região, desde que tenha Premium",
          "C) O objetivo por canal deve ser consultado na tabela do guia",
          "D) Premium entra apenas como material de apoio e não no cálculo"
        ],
        "gabarito": "C",
        "justificativa": "medir em centímetros pela fórmula cm Pants + Premium / cm Total Pampers; somar apenas Ajuste Total, Super Pants, PC Pants, Splashers e Premium; considerar apenas as versões que existem na loja; o objetivo por canal deve ser consultado na tabela; e, se não houver cadastro/ruptura de Total Pants, o KBD fica não válido. O guia também reforça que não pode aplicar fora do Sul nem contar versões fora do grupo Pants + Premium."
      }
    ],
    "kbd4": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Executar qualquer material de Pampers na gôndola",
          "B) Executar materiais de Vale Night na gôndola + material com ícone de mamadeira",
          "C) Executar apenas fraldas Pampers Vale Night no ponto natural",
          "D) Executar ponto extra com qualquer comunicação da marca"
        ],
        "gabarito": "B",
        "justificativa": "executar materiais de Vale Night na gôndola + material com ícone de mamadeira. Os materiais válidos são faixa, fita, precificador, wobbler e cartaz. Os canais elegíveis são C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria, e DPP não é elegível. O guia também deixa claro que não pode executar sem comunicação e sem o ícone de mamadeira."
      },
      {
        "pergunta": "Quais materiais são válidos para esse KBD?",
        "alternativas": [
          "A) Cubo, topo de ilha, display e faixa",
          "B) Faixa, fita, precificador, wobbler e cartaz",
          "C) Apenas wobbler e cartaz",
          "D) Clipstrip, faixa, cartaz e display"
        ],
        "gabarito": "B",
        "justificativa": "executar materiais de Vale Night na gôndola + material com ícone de mamadeira. Os materiais válidos são faixa, fita, precificador, wobbler e cartaz. Os canais elegíveis são C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria, e DPP não é elegível. O guia também deixa claro que não pode executar sem comunicação e sem o ícone de mamadeira."
      },
      {
        "pergunta": "Qual canal não é elegível para esse KBD?",
        "alternativas": [
          "A) HFS",
          "B) CLUB",
          "C) Perfumaria",
          "D) DPP"
        ],
        "gabarito": "D",
        "justificativa": "executar materiais de Vale Night na gôndola + material com ícone de mamadeira. Os materiais válidos são faixa, fita, precificador, wobbler e cartaz. Os canais elegíveis são C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria, e DPP não é elegível. O guia também deixa claro que não pode executar sem comunicação e sem o ícone de mamadeira."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Executar faixa de Vale Night com ícone de mamadeira na gôndola",
          "B) Executar wobbler e cartaz de Vale Night com comunicação correta",
          "C) Executar material de Vale Night sem comunicação ou sem ícone de mamadeira",
          "D) Validar a execução em canal LASA"
        ],
        "gabarito": "C",
        "justificativa": "executar materiais de Vale Night na gôndola + material com ícone de mamadeira. Os materiais válidos são faixa, fita, precificador, wobbler e cartaz. Os canais elegíveis são C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria, e DPP não é elegível. O guia também deixa claro que não pode executar sem comunicação e sem o ícone de mamadeira."
      },
      {
        "pergunta": "Qual alternativa representa corretamente o que conta nesse KBD?",
        "alternativas": [
          "A) Qualquer um dos materiais Vale Night na gôndola, com comunicação + ícone de mamadeira",
          "B) Apenas ponto extra com cubo e topo de ilha",
          "C) Qualquer material Pampers, mesmo sem ícone de mamadeira",
          "D) Apenas precificador, desde que esteja no checkout"
        ],
        "gabarito": "A",
        "justificativa": "executar materiais de Vale Night na gôndola + material com ícone de mamadeira. Os materiais válidos são faixa, fita, precificador, wobbler e cartaz. Os canais elegíveis são C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria, e DPP não é elegível. O guia também deixa claro que não pode executar sem comunicação e sem o ícone de mamadeira."
      }
    ],
    "kbd5": [
      {
        "pergunta": "Qual é a execução correta para validar esse KBD?",
        "alternativas": [
          "A) Executar materiais de Vale Night na gôndola natural",
          "B) Executar ponto extra com materiais de Vale Night + material com ícone de mamadeira",
          "C) Executar apenas cartaz de Vale Night no checkout",
          "D) Executar qualquer ponto extra de Pampers, mesmo sem comunicação"
        ],
        "gabarito": "B",
        "justificativa": ""
      },
      {
        "pergunta": "Qual é o canal elegível para esse KBD?",
        "alternativas": [
          "A) Somente FARMA (DPP)",
          "B) HFS",
          "C) C&C",
          "D) CLUB e LASA"
        ],
        "gabarito": "A",
        "justificativa": ""
      },
      {
        "pergunta": "Quais materiais são válidos para esse KBD?",
        "alternativas": [
          "A) Faixa, fita, wobbler e cartaz",
          "B) Apenas cubo e topo de ilha",
          "C) Clipstrip, display, faixa e precificador",
          "D) Cubo, precificador, wobbler, cartaz e topo de ilha"
        ],
        "gabarito": "D",
        "justificativa": ""
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Usar topo de ilha como um dos materiais válidos",
          "B) Executar ponto extra em FARMA com cubo e comunicação correta",
          "C) Validar a execução em canal fora de DPP",
          "D) Executar ponto extra com cartaz e ícone de mamadeira"
        ],
        "gabarito": "C",
        "justificativa": ""
      },
      {
        "pergunta": "Qual alternativa representa corretamente o que conta nesse KBD?",
        "alternativas": [
          "A) Qualquer material Pampers em qualquer canal",
          "B) Ponto extra com comunicação Vale Night e ícone de mamadeira",
          "C) Ponto extra sem ícone, desde que tenha cartaz",
          "D) Qualquer ponto natural de Pampers com boa exposição"
        ],
        "gabarito": "B",
        "justificativa": ""
      }
    ]
  },
  "secret": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória do KBD Secret em DPP e HFS?",
        "alternativas": [
          "A) Executar 20 frentes de Secret na gôndola",
          "B) Executar Secret com 10 frentes na gôndola OU 2 bandejas",
          "C) Executar apenas 2 bandejas, sem opção de frentes",
          "D) Executar 2 bandejas de qualquer desodorante da categoria"
        ],
        "gabarito": "B",
        "justificativa": "nos canais DPP e HFS, a loja pode atingir o KBD com 10 frentes na gôndola OU 2 bandejas de Secret. O que mudou: antes só valiam bandejas; agora frentes também contam como forma válida."
      },
      {
        "pergunta": "Em quais canais esse KBD é elegível?",
        "alternativas": [
          "A) C&C e CLUB",
          "B) DPP e HFS",
          "C) LASA e NMR/GMR",
          "D) DPP e Perfumaria"
        ],
        "gabarito": "B",
        "justificativa": "nos canais DPP e HFS, a loja pode atingir o KBD com 10 frentes na gôndola OU 2 bandejas de Secret. O que mudou: antes só valiam bandejas; agora frentes também contam como forma válida."
      },
      {
        "pergunta": "O que mudou nesse KBD em relação ao ciclo anterior?",
        "alternativas": [
          "A) Reduziu a quantidade de bandejas exigida",
          "B) Passou a aceitar também a contagem por frentes na gôndola",
          "C) Deixou de valer para o canal HFS",
          "D) Passou a exigir 3 bandejas em vez de 2"
        ],
        "gabarito": "B",
        "justificativa": "nos canais DPP e HFS, a loja pode atingir o KBD com 10 frentes na gôndola OU 2 bandejas de Secret. O que mudou: antes só valiam bandejas; agora frentes também contam como forma válida."
      },
      {
        "pergunta": "Qual das situações abaixo atende corretamente ao KBD em uma loja DPP?",
        "alternativas": [
          "A) 8 frentes de Secret na gôndola",
          "B) 10 frentes de Secret na gôndola",
          "C) 1 bandeja de Secret",
          "D) 5 frentes e nenhuma bandeja"
        ],
        "gabarito": "B",
        "justificativa": "nos canais DPP e HFS, a loja pode atingir o KBD com 10 frentes na gôndola OU 2 bandejas de Secret. O que mudou: antes só valiam bandejas; agora frentes também contam como forma válida."
      },
      {
        "pergunta": "O que conta para validar esse KBD em DPP/HFS?",
        "alternativas": [
          "A) Apenas 1 bandeja bem posicionada",
          "B) 10 frentes na gôndola OU 2 bandejas de Secret",
          "C) Qualquer bandeja da categoria desodorantes",
          "D) Apenas produtos Secret na área de sprays"
        ],
        "gabarito": "B",
        "justificativa": "nos canais DPP e HFS, a loja pode atingir o KBD com 10 frentes na gôndola OU 2 bandejas de Secret. O que mudou: antes só valiam bandejas; agora frentes também contam como forma válida."
      }
    ],
    "kbd2": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD nos demais canais elegíveis (Alimentar)?",
        "alternativas": [
          "A) Executar Secret com pelo menos 10 frentes ou 2 bandejas",
          "B) Executar Secret com pelo menos 15 frentes na gôndola OU 3 bandejas",
          "C) Executar 3 bandejas de qualquer desodorante da categoria",
          "D) Executar 15 frentes apenas em lojas DPP"
        ],
        "gabarito": "B",
        "justificativa": "nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA e Perfumaria), a regra permanece igual ao ciclo anterior: pelo menos 15 frentes na gôndola OU 3 bandejas de Secret."
      },
      {
        "pergunta": "Quais canais são elegíveis para esse KBD?",
        "alternativas": [
          "A) DPP e HFS",
          "B) Apenas C&C e CLUB",
          "C) C&C, NMR/GMR, CLUB, LASA e Perfumaria",
          "D) Somente HFS, LASA e DPP"
        ],
        "gabarito": "C",
        "justificativa": "nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA e Perfumaria), a regra permanece igual ao ciclo anterior: pelo menos 15 frentes na gôndola OU 3 bandejas de Secret."
      },
      {
        "pergunta": "Qual das situações abaixo atende corretamente ao KBD?",
        "alternativas": [
          "A) Loja HFS com 3 bandejas de Secret",
          "B) Loja DPP com 15 frentes de Secret",
          "C) Loja NMR/GMR com 3 bandejas de Secret",
          "D) Loja HFS com 15 frentes de Secret"
        ],
        "gabarito": "C",
        "justificativa": "nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA e Perfumaria), a regra permanece igual ao ciclo anterior: pelo menos 15 frentes na gôndola OU 3 bandejas de Secret."
      },
      {
        "pergunta": "Qual situação abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Executar 15 frentes de Secret em C&C",
          "B) Executar 3 bandejas de Secret em CLUB",
          "C) Executar 14 frentes de Secret em Perfumaria",
          "D) Executar 15 frentes de Secret em NMR/GMR"
        ],
        "gabarito": "C",
        "justificativa": "nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA e Perfumaria), a regra permanece igual ao ciclo anterior: pelo menos 15 frentes na gôndola OU 3 bandejas de Secret."
      },
      {
        "pergunta": "Esse KBD mudou em relação ao ciclo anterior?",
        "alternativas": [
          "A) Sim, a meta de frentes diminuiu",
          "B) Sim, passou a valer para DPP também",
          "C) Não, a regra desses canais permanece igual",
          "D) Sim, deixou de aceitar bandejas"
        ],
        "gabarito": "C",
        "justificativa": "nos demais canais elegíveis (C&C, NMR/GMR, CLUB, LASA e Perfumaria), a regra permanece igual ao ciclo anterior: pelo menos 15 frentes na gôndola OU 3 bandejas de Secret."
      }
    ]
  },
  "oral-b": {
    "kbd1": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Garantir 60% do espaço de cremes Oral-B com versões de branqueamento",
          "B) Garantir 60% da gôndola total da categoria com Oral-B",
          "C) Garantir 50% do espaço de escovas Oral-B com itens 3D White",
          "D) Garantir 60% das frentes de cremes dentais com qualquer pasta branca"
        ],
        "gabarito": "A",
        "justificativa": "garantir 60% do espaço de cremes Oral-B com versões de branqueamento, medindo em centímetros pela fórmula cm Branqueamento / cm Total Cremes Oral-B. Os canais válidos são todos. A lâmina também define exatamente quais versões entram no cálculo: 3DW Brilliant Fresh, 3Dwhite Mineral Clean, 3Dwhite Perfection, Extra Branco e Extra Branco Carvão. O que não pode é contar pastas que não são de branqueamento e medir por frentes em vez de cm."
      },
      {
        "pergunta": "Como deve ser feita a medição correta desse KBD?",
        "alternativas": [
          "A) Por número de SKUs de branqueamento",
          "B) Em centímetros: cm Branqueamento / cm Total Cremes Oral-B",
          "C) Por quantidade de frentes brancas na gôndola",
          "D) Por quantidade de embalagens expostas"
        ],
        "gabarito": "B",
        "justificativa": "garantir 60% do espaço de cremes Oral-B com versões de branqueamento, medindo em centímetros pela fórmula cm Branqueamento / cm Total Cremes Oral-B. Os canais válidos são todos. A lâmina também define exatamente quais versões entram no cálculo: 3DW Brilliant Fresh, 3Dwhite Mineral Clean, 3Dwhite Perfection, Extra Branco e Extra Branco Carvão. O que não pode é contar pastas que não são de branqueamento e medir por frentes em vez de cm."
      },
      {
        "pergunta": "Qual das opções abaixo conta como versão válida de branqueamento?",
        "alternativas": [
          "A) Pasta Oral-B infantil",
          "B) 3Dwhite Perfection",
          "C) Qualquer creme com embalagem clara",
          "D) Pasta de proteção de gengiva"
        ],
        "gabarito": "B",
        "justificativa": "garantir 60% do espaço de cremes Oral-B com versões de branqueamento, medindo em centímetros pela fórmula cm Branqueamento / cm Total Cremes Oral-B. Os canais válidos são todos. A lâmina também define exatamente quais versões entram no cálculo: 3DW Brilliant Fresh, 3Dwhite Mineral Clean, 3Dwhite Perfection, Extra Branco e Extra Branco Carvão. O que não pode é contar pastas que não são de branqueamento e medir por frentes em vez de cm."
      },
      {
        "pergunta": "Qual situação abaixo está incorreta segundo o guia?",
        "alternativas": [
          "A) Considerar Extra Branco Carvão como versão válida",
          "B) Medir em centímetros o espaço de branqueamento",
          "C) Contar pastas que não são de branqueamento para completar o percentual",
          "D) Aplicar o KBD em qualquer canal"
        ],
        "gabarito": "C",
        "justificativa": "garantir 60% do espaço de cremes Oral-B com versões de branqueamento, medindo em centímetros pela fórmula cm Branqueamento / cm Total Cremes Oral-B. Os canais válidos são todos. A lâmina também define exatamente quais versões entram no cálculo: 3DW Brilliant Fresh, 3Dwhite Mineral Clean, 3Dwhite Perfection, Extra Branco e Extra Branco Carvão. O que não pode é contar pastas que não são de branqueamento e medir por frentes em vez de cm."
      },
      {
        "pergunta": "Qual alternativa representa corretamente um grupo de versões válidas desse KBD?",
        "alternativas": [
          "A) Extra Branco, 3Dwhite Perfection e 3DW Brilliant Fresh",
          "B) Pasta infantil, Extra Branco e Mineral Clean",
          "C) 3Dwhite Perfection, enxaguante Oral-B e Extra Branco",
          "D) Extra Branco Carvão, pasta de gengiva e 3DW Brilliant Fresh"
        ],
        "gabarito": "A",
        "justificativa": "garantir 60% do espaço de cremes Oral-B com versões de branqueamento, medindo em centímetros pela fórmula cm Branqueamento / cm Total Cremes Oral-B. Os canais válidos são todos. A lâmina também define exatamente quais versões entram no cálculo: 3DW Brilliant Fresh, 3Dwhite Mineral Clean, 3Dwhite Perfection, Extra Branco e Extra Branco Carvão. O que não pode é contar pastas que não são de branqueamento e medir por frentes em vez de cm."
      }
    ],
    "kbd2": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Executar 2 pontos extras/pontos de contato de escovas Oral-B",
          "B) Executar 2 frentes de escovas Oral-B na gôndola",
          "C) Executar 1 ponto de contato e 1 checkout",
          "D) Executar 2 pontos no ponto natural"
        ],
        "gabarito": "A",
        "justificativa": "executar pelo menos 2 pontos extras/pontos de contato de escovas Oral-B. O guia deixa claro que ClipStrip é válido, mas não pode ser ponto natural nem checkout. Os canais válidos são todos. A lâmina também traz como itens foco sugeridos: Indicator+2, tamanhos grandes e 3DW, embora possa executar outros itens de Oral-B. O ponto principal aqui é validar se a pessoa entendeu a diferença entre ponto adicional válido e ponto que não pode ser contado."
      },
      {
        "pergunta": "Qual das opções abaixo pode ser considerada válida para esse KBD?",
        "alternativas": [
          "A) Checkout",
          "B) Ponto natural",
          "C) ClipStrip",
          "D) Gôndola principal de escovas"
        ],
        "gabarito": "C",
        "justificativa": "executar pelo menos 2 pontos extras/pontos de contato de escovas Oral-B. O guia deixa claro que ClipStrip é válido, mas não pode ser ponto natural nem checkout. Os canais válidos são todos. A lâmina também traz como itens foco sugeridos: Indicator+2, tamanhos grandes e 3DW, embora possa executar outros itens de Oral-B. O ponto principal aqui é validar se a pessoa entendeu a diferença entre ponto adicional válido e ponto que não pode ser contado."
      },
      {
        "pergunta": "Qual situação abaixo não atende ao KBD?",
        "alternativas": [
          "A) Ter 2 pontos adicionais de escovas Oral-B fora do ponto natural",
          "B) Ter 1 ilha e 1 ponta com escovas Oral-B",
          "C) Ter 1 ClipStrip e 1 ponta de gôndola",
          "D) Ter 1 ponto natural e 1 checkout com escovas Oral-B"
        ],
        "gabarito": "D",
        "justificativa": "executar pelo menos 2 pontos extras/pontos de contato de escovas Oral-B. O guia deixa claro que ClipStrip é válido, mas não pode ser ponto natural nem checkout. Os canais válidos são todos. A lâmina também traz como itens foco sugeridos: Indicator+2, tamanhos grandes e 3DW, embora possa executar outros itens de Oral-B. O ponto principal aqui é validar se a pessoa entendeu a diferença entre ponto adicional válido e ponto que não pode ser contado."
      },
      {
        "pergunta": "Sobre os canais elegíveis, qual alternativa está correta?",
        "alternativas": [
          "A) Apenas C&C e NMR/GMR",
          "B) Todos os canais são válidos",
          "C) Apenas canais sem checkout",
          "D) Todos, exceto DPP"
        ],
        "gabarito": "B",
        "justificativa": "executar pelo menos 2 pontos extras/pontos de contato de escovas Oral-B. O guia deixa claro que ClipStrip é válido, mas não pode ser ponto natural nem checkout. Os canais válidos são todos. A lâmina também traz como itens foco sugeridos: Indicator+2, tamanhos grandes e 3DW, embora possa executar outros itens de Oral-B. O ponto principal aqui é validar se a pessoa entendeu a diferença entre ponto adicional válido e ponto que não pode ser contado."
      },
      {
        "pergunta": "Quais são exemplos de itens foco sugeridos na lâmina?",
        "alternativas": [
          "A) Escovas infantis, enxaguantes e fio dental",
          "B) Indicator+2, tamanhos grandes e 3DW",
          "C) Apenas 3DW e pastas branqueadoras",
          "D) Indicator+2, cremes dentais e enxaguantes"
        ],
        "gabarito": "B",
        "justificativa": "executar pelo menos 2 pontos extras/pontos de contato de escovas Oral-B. O guia deixa claro que ClipStrip é válido, mas não pode ser ponto natural nem checkout. Os canais válidos são todos. A lâmina também traz como itens foco sugeridos: Indicator+2, tamanhos grandes e 3DW, embora possa executar outros itens de Oral-B. O ponto principal aqui é validar se a pessoa entendeu a diferença entre ponto adicional válido e ponto que não pode ser contado."
      }
    ],
    "kbd3": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Executar 2 pontos de contato com escovas Oral-B",
          "B) Garantir 60% do espaço com escovas premium",
          "C) Organizar a gôndola de escovas Oral-B conforme o layout BIPE/BIP",
          "D) Separar escovas apenas por cor de embalagem"
        ],
        "gabarito": "C",
        "justificativa": "executar a gôndola de escovas Oral-B conforme o layout BIPE. Os canais válidos são todos. O guia diz que o que conta é o layout BIPE aplicado na gôndola, com organização por blocos/segmentos conforme o guia BIPE. O que não pode é executar sem seguir o layout ou misturar segmentos sem lógica de BIPE. Aqui o foco não é quantidade, e sim padronização correta da organização da gôndola."
      },
      {
        "pergunta": "O que conta para validar esse KBD?",
        "alternativas": [
          "A) Layout BIPE/BIP aplicado na gôndola de escovas",
          "B) Qualquer organização visualmente bonita",
          "C) Escovas agrupadas por preço",
          "D) Mistura de segmentos desde que complete espaço"
        ],
        "gabarito": "A",
        "justificativa": "executar a gôndola de escovas Oral-B conforme o layout BIPE. Os canais válidos são todos. O guia diz que o que conta é o layout BIPE aplicado na gôndola, com organização por blocos/segmentos conforme o guia BIPE. O que não pode é executar sem seguir o layout ou misturar segmentos sem lógica de BIPE. Aqui o foco não é quantidade, e sim padronização correta da organização da gôndola."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Aplicar a organização por blocos conforme o guia BIPE",
          "B) Seguir a lógica de segmentos da marca",
          "C) Misturar segmentos sem lógica de BIPE",
          "D) Executar o layout na gôndola de escovas"
        ],
        "gabarito": "C",
        "justificativa": "executar a gôndola de escovas Oral-B conforme o layout BIPE. Os canais válidos são todos. O guia diz que o que conta é o layout BIPE aplicado na gôndola, com organização por blocos/segmentos conforme o guia BIPE. O que não pode é executar sem seguir o layout ou misturar segmentos sem lógica de BIPE. Aqui o foco não é quantidade, e sim padronização correta da organização da gôndola."
      },
      {
        "pergunta": "Sobre os canais válidos, qual alternativa está correta?",
        "alternativas": [
          "A) Apenas CLUB e LASA",
          "B) Todos os canais",
          "C) Apenas C&C, NMR/GMR e HFS",
          "D) Todos, exceto DPP e Perfumaria"
        ],
        "gabarito": "B",
        "justificativa": "executar a gôndola de escovas Oral-B conforme o layout BIPE. Os canais válidos são todos. O guia diz que o que conta é o layout BIPE aplicado na gôndola, com organização por blocos/segmentos conforme o guia BIPE. O que não pode é executar sem seguir o layout ou misturar segmentos sem lógica de BIPE. Aqui o foco não é quantidade, e sim padronização correta da organização da gôndola."
      },
      {
        "pergunta": "Qual alternativa representa melhor a lógica desse KBD?",
        "alternativas": [
          "A) O mais importante é aumentar a quantidade de escovas na loja",
          "B) O KBD mede quantas frentes cada escova tem",
          "C) O KBD depende de pontos extras e checkout",
          "D) O KBD avalia se a gôndola está organizada por blocos/segmentos conforme BIPE"
        ],
        "gabarito": "D",
        "justificativa": "executar a gôndola de escovas Oral-B conforme o layout BIPE. Os canais válidos são todos. O guia diz que o que conta é o layout BIPE aplicado na gôndola, com organização por blocos/segmentos conforme o guia BIPE. O que não pode é executar sem seguir o layout ou misturar segmentos sem lógica de BIPE. Aqui o foco não é quantidade, e sim padronização correta da organização da gôndola."
      }
    ]
  },
  "gillette": {
    "kbd1": [
      {
        "pergunta": "Como deve ser feita a medição correta desse KBD?",
        "alternativas": [
          "A) Em centímetros na gôndola masculina",
          "B) Pela quantidade de embalagens vendidas",
          "C) Por ganchos: ganchos Sistemas / ganchos total Gillette Masculina",
          "D) Por número de SKUs de Gillette"
        ],
        "gabarito": "C",
        "justificativa": "garantir um percentual de ganchos de Sistemas dentro da gôndola Gillette Masculina, medindo por ganchos na fórmula ganchos Sistemas / ganchos total Gillette Masculina. O objetivo varia por canal: C&C = 25% e demais canais elegíveis = 35%. DPP não é elegível. O guia também define que Sistemas são cargas e aparelhos conectáveis: Mach3, Fusion e Proshield. Não pode medir em centímetros, misturar descartáveis no cálculo nem considerar DPP."
      },
      {
        "pergunta": "Quais produtos entram como Sistemas nesse KBD?",
        "alternativas": [
          "A) Mach3, Fusion e Proshield",
          "B) Apenas Mach3 e Presto3",
          "C) Todos os descartáveis Gillette",
          "D) Apenas cargas Mach3 c/8"
        ],
        "gabarito": "A",
        "justificativa": "garantir um percentual de ganchos de Sistemas dentro da gôndola Gillette Masculina, medindo por ganchos na fórmula ganchos Sistemas / ganchos total Gillette Masculina. O objetivo varia por canal: C&C = 25% e demais canais elegíveis = 35%. DPP não é elegível. O guia também define que Sistemas são cargas e aparelhos conectáveis: Mach3, Fusion e Proshield. Não pode medir em centímetros, misturar descartáveis no cálculo nem considerar DPP."
      },
      {
        "pergunta": "Qual alternativa está correta sobre a meta por canal?",
        "alternativas": [
          "A) C&C 35% e DPP 25%",
          "B) C&C 25% e demais canais elegíveis 35%",
          "C) Todos os canais 25%",
          "D) CLUB 25% e C&C 35%"
        ],
        "gabarito": "B",
        "justificativa": "garantir um percentual de ganchos de Sistemas dentro da gôndola Gillette Masculina, medindo por ganchos na fórmula ganchos Sistemas / ganchos total Gillette Masculina. O objetivo varia por canal: C&C = 25% e demais canais elegíveis = 35%. DPP não é elegível. O guia também define que Sistemas são cargas e aparelhos conectáveis: Mach3, Fusion e Proshield. Não pode medir em centímetros, misturar descartáveis no cálculo nem considerar DPP."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Medir por ganchos na gôndola Gillette Masculina",
          "B) Contar Fusion no cálculo de Sistemas",
          "C) Considerar descartáveis junto com Sistemas",
          "D) Aplicar 35% nos canais elegíveis fora de C&C"
        ],
        "gabarito": "C",
        "justificativa": "garantir um percentual de ganchos de Sistemas dentro da gôndola Gillette Masculina, medindo por ganchos na fórmula ganchos Sistemas / ganchos total Gillette Masculina. O objetivo varia por canal: C&C = 25% e demais canais elegíveis = 35%. DPP não é elegível. O guia também define que Sistemas são cargas e aparelhos conectáveis: Mach3, Fusion e Proshield. Não pode medir em centímetros, misturar descartáveis no cálculo nem considerar DPP."
      },
      {
        "pergunta": "Qual canal não é elegível para esse KBD?",
        "alternativas": [
          "A) LASA",
          "B) DPP",
          "C) C&C",
          "D) NMR/GMR"
        ],
        "gabarito": "B",
        "justificativa": "garantir um percentual de ganchos de Sistemas dentro da gôndola Gillette Masculina, medindo por ganchos na fórmula ganchos Sistemas / ganchos total Gillette Masculina. O objetivo varia por canal: C&C = 25% e demais canais elegíveis = 35%. DPP não é elegível. O guia também define que Sistemas são cargas e aparelhos conectáveis: Mach3, Fusion e Proshield. Não pode medir em centímetros, misturar descartáveis no cálculo nem considerar DPP."
      }
    ],
    "kbd2": [
      {
        "pergunta": "Quantos pontos de contato de Mach3/Presto3 Sensitive (4un+) são exigidos em C&C, NMR/GMR, LASA, HFS e PERFUMARIA?",
        "alternativas": [
          "A) 2 pontos, igual a antes",
          "B) 3 pontos de contato",
          "C) 4 pontos de contato",
          "D) Nenhum, esses canais não são elegíveis"
        ],
        "gabarito": "B",
        "justificativa": "o que mudou: agora C&C, NMR/GMR, LASA, HFS e PERFUMARIA exigem pelo menos 3 pontos de contato com Mach3 Sensitive ou Presto3 Sensitive (4 unidades ou mais), sempre fora do ponto natural. Em DPP a exigência continua sendo 2 pontos. Priorizar sempre os itens Sensitive com 4 unidades ou mais."
      },
      {
        "pergunta": "Quantos pontos de contato são exigidos no canal DPP?",
        "alternativas": [
          "A) 1 ponto",
          "B) 2 pontos, sem alteração",
          "C) 3 pontos, igual aos demais canais",
          "D) DPP não participa desse KBD"
        ],
        "gabarito": "B",
        "justificativa": "o que mudou: agora C&C, NMR/GMR, LASA, HFS e PERFUMARIA exigem pelo menos 3 pontos de contato com Mach3 Sensitive ou Presto3 Sensitive (4 unidades ou mais), sempre fora do ponto natural. Em DPP a exigência continua sendo 2 pontos. Priorizar sempre os itens Sensitive com 4 unidades ou mais."
      },
      {
        "pergunta": "Quais produtos devem ser priorizados nesse KBD?",
        "alternativas": [
          "A) Qualquer item Gillette, sem prioridade",
          "B) Mach3 Sensitive e Presto3 Sensitive com 4 unidades ou mais",
          "C) Apenas embalagens promocionais",
          "D) Somente cargas com 8 unidades"
        ],
        "gabarito": "B",
        "justificativa": "o que mudou: agora C&C, NMR/GMR, LASA, HFS e PERFUMARIA exigem pelo menos 3 pontos de contato com Mach3 Sensitive ou Presto3 Sensitive (4 unidades ou mais), sempre fora do ponto natural. Em DPP a exigência continua sendo 2 pontos. Priorizar sempre os itens Sensitive com 4 unidades ou mais."
      },
      {
        "pergunta": "Qual canal não é elegível para esse KBD?",
        "alternativas": [
          "A) HFS",
          "B) CLUB",
          "C) NMR/GMR",
          "D) LASA"
        ],
        "gabarito": "B",
        "justificativa": "o que mudou: agora C&C, NMR/GMR, LASA, HFS e PERFUMARIA exigem pelo menos 3 pontos de contato com Mach3 Sensitive ou Presto3 Sensitive (4 unidades ou mais), sempre fora do ponto natural. Em DPP a exigência continua sendo 2 pontos. Priorizar sempre os itens Sensitive com 4 unidades ou mais."
      },
      {
        "pergunta": "Qual das situações abaixo não atende ao KBD?",
        "alternativas": [
          "A) 3 pontos de contato em C&C, fora do ponto natural",
          "B) 2 pontos de contato em DPP",
          "C) Contar o ponto natural como 1 dos pontos de contato",
          "D) Priorizar Mach3 Sensitive com 4 unidades ou mais"
        ],
        "gabarito": "C",
        "justificativa": "o que mudou: agora C&C, NMR/GMR, LASA, HFS e PERFUMARIA exigem pelo menos 3 pontos de contato com Mach3 Sensitive ou Presto3 Sensitive (4 unidades ou mais), sempre fora do ponto natural. Em DPP a exigência continua sendo 2 pontos. Priorizar sempre os itens Sensitive com 4 unidades ou mais."
      }
    ],
    "kbd3": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Executar 2 frentes de aparelho Mach3",
          "B) Executar no mínimo 2 ganchos de carga Mach3 com 8 unidades",
          "C) Executar 2 packs de Presto3 em qualquer canal",
          "D) Executar 2 ganchos de qualquer carga Gillette"
        ],
        "gabarito": "B",
        "justificativa": "executar no mínimo 2 ganchos de Carga Mach3 com 8 unidades, com leitura feita por ganchos. O canal elegível é somente DPP. O guia deixa claro que não pode ler esse KBD fora de DPP e não pode esquecer que o item correto é a carga Mach3 com 8 unidades."
      },
      {
        "pergunta": "Como deve ser feita a leitura correta desse KBD?",
        "alternativas": [
          "A) Em centímetros",
          "B) Por número de checkouts",
          "C) Por ganchos",
          "D) Por quantidade de lojas atendidas"
        ],
        "gabarito": "C",
        "justificativa": "executar no mínimo 2 ganchos de Carga Mach3 com 8 unidades, com leitura feita por ganchos. O canal elegível é somente DPP. O guia deixa claro que não pode ler esse KBD fora de DPP e não pode esquecer que o item correto é a carga Mach3 com 8 unidades."
      },
      {
        "pergunta": "Qual é o canal elegível para esse KBD?",
        "alternativas": [
          "A) Somente DPP",
          "B) CLUB e LASA",
          "C) Todos os canais",
          "D) HFS e C&C"
        ],
        "gabarito": "A",
        "justificativa": "executar no mínimo 2 ganchos de Carga Mach3 com 8 unidades, com leitura feita por ganchos. O canal elegível é somente DPP. O guia deixa claro que não pode ler esse KBD fora de DPP e não pode esquecer que o item correto é a carga Mach3 com 8 unidades."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Ter 2 ganchos de carga Mach3 c/8 em DPP",
          "B) Medir o KBD por ganchos",
          "C) Validar o KBD em canal fora de DPP",
          "D) Focar especificamente na carga Mach3 com 8 unidades"
        ],
        "gabarito": "C",
        "justificativa": "executar no mínimo 2 ganchos de Carga Mach3 com 8 unidades, com leitura feita por ganchos. O canal elegível é somente DPP. O guia deixa claro que não pode ler esse KBD fora de DPP e não pode esquecer que o item correto é a carga Mach3 com 8 unidades."
      },
      {
        "pergunta": "O que conta para validar esse KBD?",
        "alternativas": [
          "A) Qualquer carga Gillette com boa visibilidade",
          "B) Aparelho Mach3 e Fusion no mesmo gancho",
          "C) Carga Mach3 c/8 com no mínimo 2 ganchos",
          "D) Dois ganchos de descartáveis Gillette"
        ],
        "gabarito": "C",
        "justificativa": "executar no mínimo 2 ganchos de Carga Mach3 com 8 unidades, com leitura feita por ganchos. O canal elegível é somente DPP. O guia deixa claro que não pode ler esse KBD fora de DPP e não pode esquecer que o item correto é a carga Mach3 com 8 unidades."
      }
    ]
  },
  "venus": {
    "kbd2": [
      {
        "pergunta": "Quantos pontos de contato de Venus são exigidos agora em todos os canais elegíveis?",
        "alternativas": [
          "A) 1 ponto de contato",
          "B) 2 pontos de contato",
          "C) 3 pontos de contato",
          "D) 4 pontos de contato"
        ],
        "gabarito": "C",
        "justificativa": "o que mudou: antes eram 2 pontos de contato apenas em DPP e Perfumaria; agora são pelo menos 3 pontos de contato em TODOS os canais elegíveis, sempre fora do ponto natural e fora do checkout. Priorizar Venus Pele Sensível e Venus Suave."
      },
      {
        "pergunta": "Em quais canais esse KBD passou a ser exigido?",
        "alternativas": [
          "A) Apenas DPP e HFS",
          "B) Apenas Perfumaria",
          "C) Em todos os canais elegíveis",
          "D) Somente C&C"
        ],
        "gabarito": "C",
        "justificativa": "o que mudou: antes eram 2 pontos de contato apenas em DPP e Perfumaria; agora são pelo menos 3 pontos de contato em TODOS os canais elegíveis, sempre fora do ponto natural e fora do checkout. Priorizar Venus Pele Sensível e Venus Suave."
      },
      {
        "pergunta": "Quais itens o guia orienta priorizar nesse KBD?",
        "alternativas": [
          "A) Venus Pele Sensível e Venus Suave",
          "B) Venus Spa e Venus Íntima Sistema",
          "C) Apenas Venus Pele Sensível",
          "D) Qualquer item Venus da categoria"
        ],
        "gabarito": "A",
        "justificativa": "o que mudou: antes eram 2 pontos de contato apenas em DPP e Perfumaria; agora são pelo menos 3 pontos de contato em TODOS os canais elegíveis, sempre fora do ponto natural e fora do checkout. Priorizar Venus Pele Sensível e Venus Suave."
      },
      {
        "pergunta": "Qual das situações abaixo não atende ao KBD?",
        "alternativas": [
          "A) Ter 3 pontos adicionais com Venus, fora do ponto natural",
          "B) Ter 3 pontos adicionais com Venus, fora do checkout",
          "C) Contar 1 ponto natural como ponto de contato válido",
          "D) Cada execução separada contando como 1 ponto"
        ],
        "gabarito": "C",
        "justificativa": "o que mudou: antes eram 2 pontos de contato apenas em DPP e Perfumaria; agora são pelo menos 3 pontos de contato em TODOS os canais elegíveis, sempre fora do ponto natural e fora do checkout. Priorizar Venus Pele Sensível e Venus Suave."
      },
      {
        "pergunta": "O que o guia proíbe nesse KBD?",
        "alternativas": [
          "A) Priorizar Venus Pele Sensível",
          "B) Executar em todos os canais elegíveis",
          "C) Contar ponto natural ou checkout como ponto de contato",
          "D) Fazer três pontos adicionais"
        ],
        "gabarito": "C",
        "justificativa": "o que mudou: antes eram 2 pontos de contato apenas em DPP e Perfumaria; agora são pelo menos 3 pontos de contato em TODOS os canais elegíveis, sempre fora do ponto natural e fora do checkout. Priorizar Venus Pele Sensível e Venus Suave."
      }
    ],
    "kbd3": [
      {
        "pergunta": "Qual é a execução obrigatória desse KBD?",
        "alternativas": [
          "A) Executar qualquer item Venus no checkout",
          "B) Executar apenas o aparelho Venus Pele Sensível na região de checkout",
          "C) Executar cargas de Venus Pele Sensível no checkout",
          "D) Executar Venus Spa em 60% da gôndola"
        ],
        "gabarito": "B",
        "justificativa": "na região de CKO, executar apenas o aparelho Venus Pele Sensível. A meta é ter pelo menos 60% dos CKOs com P&G com esse produto. Os canais elegíveis são todos, exceto CLUB. O guia também deixa claro que não pode executar carga em vez de aparelho, não pode contar CKOs sem produtos P&G e não pode aplicar em CLUB."
      },
      {
        "pergunta": "Qual é a meta desse KBD?",
        "alternativas": [
          "A) Pelo menos 60% dos CKOs com P&G com Venus Pele Sensível",
          "B) Pelo menos 20% dos ganchos da categoria",
          "C) Pelo menos 2 checkouts por loja",
          "D) 100% dos checkouts da loja com Venus"
        ],
        "gabarito": "A",
        "justificativa": "na região de CKO, executar apenas o aparelho Venus Pele Sensível. A meta é ter pelo menos 60% dos CKOs com P&G com esse produto. Os canais elegíveis são todos, exceto CLUB. O guia também deixa claro que não pode executar carga em vez de aparelho, não pode contar CKOs sem produtos P&G e não pode aplicar em CLUB."
      },
      {
        "pergunta": "Qual das situações abaixo não pode ser considerada correta?",
        "alternativas": [
          "A) Contar CKOs sem produtos P&G",
          "B) Executar aparelho Venus Pele Sensível",
          "C) Aplicar fora de CLUB",
          "D) Medir a presença em checkout com P&G"
        ],
        "gabarito": "A",
        "justificativa": "na região de CKO, executar apenas o aparelho Venus Pele Sensível. A meta é ter pelo menos 60% dos CKOs com P&G com esse produto. Os canais elegíveis são todos, exceto CLUB. O guia também deixa claro que não pode executar carga em vez de aparelho, não pode contar CKOs sem produtos P&G e não pode aplicar em CLUB."
      },
      {
        "pergunta": "Qual item realmente conta nesse KBD?",
        "alternativas": [
          "A) Carga Venus Pele Sensível",
          "B) Qualquer aparelho Venus",
          "C) Apenas o aparelho Venus Pele Sensível",
          "D) Venus Íntima Sistema no checkout"
        ],
        "gabarito": "C",
        "justificativa": "na região de CKO, executar apenas o aparelho Venus Pele Sensível. A meta é ter pelo menos 60% dos CKOs com P&G com esse produto. Os canais elegíveis são todos, exceto CLUB. O guia também deixa claro que não pode executar carga em vez de aparelho, não pode contar CKOs sem produtos P&G e não pode aplicar em CLUB."
      },
      {
        "pergunta": "Sobre os canais elegíveis, qual alternativa está correta?",
        "alternativas": [
          "A) Apenas DPP e HFS",
          "B) Todos os canais, exceto CLUB",
          "C) Somente CLUB e DPP",
          "D) Apenas C&C, NMR/GMR e LASA"
        ],
        "gabarito": "B",
        "justificativa": "na região de CKO, executar apenas o aparelho Venus Pele Sensível. A meta é ter pelo menos 60% dos CKOs com P&G com esse produto. Os canais elegíveis são todos, exceto CLUB. O guia também deixa claro que não pode executar carga em vez de aparelho, não pode contar CKOs sem produtos P&G e não pode aplicar em CLUB."
      }
    ]
  }
};

window.QUIZZES = QUIZZES;

const q = (pergunta, alternativas, gabarito, justificativa) => ({ pergunta, alternativas, gabarito, justificativa });

const QUIZZES = {
  pantene: {
    "bond-repair": [
      q("Uma loja possui 180 cm de Pantene na gôndola, já desconsiderando os packs. Desse espaço, 30 cm são de Pantene Bond Repair. Qual é a avaliação correta?", [
        "A) Atingiu o KBD, porque Bond Repair representa mais de 15% da gôndola.",
        "B) Não atingiu o KBD, pois seriam necessários pelo menos 36 cm de Bond Repair.",
        "C) Atingiu o KBD, porque qualquer execução acima de 25 cm é válida.",
        "D) Não é possível avaliar sem considerar os packs."
      ], "B", "O mínimo é 20% do espaço de Pantene, sem packs. Em 180 cm, isso equivale a 36 cm; portanto, 30 cm não atingem o KBD.")
    ],
    finalizadores: [
      q("Em uma farmácia do canal DPP, foram identificadas 3 frentes de óleo, 2 de sérum e 2 de leave-in na gôndola. Qual é o resultado do KBD?", [
        "A) Atingido, porque os três tipos de finalizadores estão presentes.",
        "B) Atingido, porque o mínimo para todos os canais é de 6 frentes.",
        "C) Não atingido, porque o canal DPP precisa de pelo menos 8 frentes.",
        "D) Não atingido, porque cada produto precisa ter 8 frentes individualmente."
      ], "C", "As frentes somam 7. Em DPP, o mínimo é de 8 frentes de finalizadores na gôndola."),
      q("Uma loja HFS possui 2 frentes de óleo, 2 de sérum e 2 de leave-in. Qual é a avaliação correta?", [
        "A) Atingiu o KBD, pois totaliza 6 frentes de finalizadores.",
        "B) Não atingiu, porque o target de todos os canais é de 8 frentes.",
        "C) Não atingiu, porque óleo não pode ser contabilizado.",
        "D) Atingiu somente se houver também um ponto extra."
      ], "A", "Nos demais canais elegíveis, incluindo HFS, o mínimo é de 6 frentes. A execução soma exatamente 6.")
    ]
  },
  gillette: {
    "mach3-presto3": [
      q("Uma loja C&C possui 1 clipstrip de Mach3 carga com 4 unidades, 1 display de Presto 3 com 4 unidades e 1 ponto adicional com pack de Mach3. Todos estão fora do ponto natural e do checkout. Qual é a avaliação?", [
        "A) Atingiu o KBD, porque possui 3 pontos de contato válidos.",
        "B) Não atingiu, porque packs não são considerados.",
        "C) Não atingiu, porque clipstrip não é um ponto válido.",
        "D) Atingiu apenas se todos os pontos forem do mesmo produto."
      ], "A", "Em C&C são exigidos 3 pontos válidos, fora do ponto natural e do checkout. Os três pontos apresentados atendem à regra."),
      q("Uma farmácia possui dois pontos adicionais fora do ponto natural e do checkout: 1 ponto com Presto 3 de 4 unidades e 1 ponto com pack de Mach3. Qual é o resultado?", [
        "A) Não atingiu, porque o mínimo é sempre de 3 pontos.",
        "B) Atingiu, porque no canal DPP o target é de 2 pontos de contato.",
        "C) Não atingiu, porque produtos diferentes não podem ser somados.",
        "D) Atingiu somente se um dos pontos estiver no checkout."
      ], "B", "No canal DPP, o target permanece em 2 pontos de contato válidos, sempre fora do ponto natural e do checkout."),
      q("Qual execução abaixo pode ser contabilizada para o KBD de pontos de contato de Gillette?", [
        "A) Presto 3 com 3 unidades executado no checkout.",
        "B) Mach3 com 2 unidades executado fora do ponto natural.",
        "C) Presto 3 com 4 unidades executado em uma ponta de gôndola.",
        "D) Mach3 com 4 unidades executado exclusivamente no ponto natural."
      ], "C", "O ponto precisa ter uma apresentação válida com 4 unidades ou mais e ficar fora do ponto natural e do checkout. A ponta de gôndola atende aos critérios.")
    ]
  },
  venus: {
    "tres-pontos": [
      q("Uma loja possui três pontos adicionais de Venus fora do ponto natural e do checkout: 1 clipstrip de Venus Suave, 1 display de Venus Pele Sensível e 1 ponta de gôndola com outro aparelho Venus. Qual é a avaliação?", [
        "A) Atingiu o KBD, porque existem 3 pontos válidos de Venus.",
        "B) Não atingiu, porque somente Venus Pele Sensível pode ser contabilizado.",
        "C) Não atingiu, porque os três pontos precisam ter o mesmo produto.",
        "D) Atingiu somente nos canais C&C e NMR/GMR."
      ], "A", "O KBD exige pelo menos 3 pontos de contato de Venus fora do ponto natural e do checkout. Os três apresentados são válidos."),
      q("Uma loja apresenta Venus no ponto natural, no checkout, em um clipstrip e em um display adicional. Quantos pontos são válidos para o KBD de 3 pontos de contato?", [
        "A) 4 pontos.", "B) 3 pontos.", "C) 2 pontos.", "D) 1 ponto."
      ], "C", "Ponto natural e checkout não entram na contagem. Restam como válidos o clipstrip e o display adicional: 2 pontos."),
      q("Sobre a execução dos pontos de contato de Venus, qual afirmação está correta?", [
        "A) Apenas Venus Suave é válido para o KBD.",
        "B) Apenas o aparelho Venus Pele Sensível é válido.",
        "C) Outros produtos Venus podem ser executados, mas a recomendação é priorizar Venus Pele Sensível e Venus Suave.",
        "D) O KBD somente é válido quando há um produto masculino junto à execução."
      ], "C", "Outros aparelhos Venus podem compor os pontos, com prioridade para Venus Pele Sensível e Venus Suave.")
    ]
  },
  secret: {
    "frentes-bandejas": [
      q("Uma loja do canal DPP possui 10 frentes de Secret, organizadas em um bloco contínuo, mas não possui bandejas. Qual é o resultado?", [
        "A) Atingiu o KBD, porque DPP exige 10 frentes ou 2 bandejas.",
        "B) Não atingiu, porque são obrigatórias 2 bandejas.",
        "C) Não atingiu, porque todos os canais exigem 15 frentes.",
        "D) Atingiu apenas se as 10 frentes forem de spray."
      ], "A", "Em DPP, a regra pode ser cumprida com 10 frentes ou 2 bandejas. As 10 frentes são suficientes."),
      q("Uma loja C&C possui 14 frentes de Secret e 2 bandejas. Qual é a avaliação?", [
        "A) Atingiu, porque 2 bandejas substituem qualquer quantidade de frentes.",
        "B) Atingiu, porque possui mais de 10 frentes.",
        "C) Não atingiu, porque precisa de pelo menos 15 frentes ou 3 bandejas.",
        "D) Não atingiu, porque somente roll-on pode ser contabilizado."
      ], "C", "Em C&C, são necessárias 15 frentes ou 3 bandejas. A loja não alcançou nenhum dos dois critérios."),
      q("Uma loja HFS possui somente 9 frentes de Secret, porém executa 2 bandejas nas prateleiras superiores. Qual é a avaliação correta?", [
        "A) Não atingiu, porque faltou uma frente.",
        "B) Atingiu, porque o critério pode ser cumprido com 2 bandejas.",
        "C) Não atingiu, porque as bandejas deveriam estar nas prateleiras inferiores.",
        "D) Atingiu somente se também houver 15 frentes."
      ], "B", "Em HFS, duas bandejas cumprem o critério alternativo; não é necessário também atingir a quantidade de frentes.")
    ]
  },
  "oral-b": {
    branqueamento: [
      q("Uma loja possui 100 cm de pastas Oral-B, dos quais 55 cm são de versões de branqueamento válidas. Qual é a avaliação?", [
        "A) Atingiu o KBD, porque ultrapassou 50%.", "B) Não atingiu, porque o objetivo é de 60%.", "C) Atingiu, porque o objetivo é de 55%.", "D) Não é possível avaliar sem conhecer o canal."
      ], "B", "O objetivo é de pelo menos 60% da gôndola de pastas. Com 55 cm em 100 cm, a loja atingiu apenas 55%."),
      q("Qual conjunto é composto somente por pastas válidas para o KBD de branqueamento?", [
        "A) 3DW Brilliant Fresh, 3Dwhite Mineral Clean e Extra Branco Carvão.",
        "B) Oral-B Kids, Extra Branco e creme para sensibilidade.",
        "C) 3Dwhite Perfection, creme gengiva e Oral-B Kids.",
        "D) Creme anticáries, Extra Branco Carvão e creme infantil."
      ], "A", "3DW Brilliant Fresh, 3Dwhite Mineral Clean e Extra Branco Carvão pertencem ao conjunto de versões de branqueamento válidas."),
      q("Uma loja de perfumaria possui 60% do espaço de pastas Oral-B ocupado por versões de branqueamento válidas. Qual é a avaliação?", [
        "A) Não atingiu, porque o KBD não se aplica à perfumaria.", "B) Não atingiu, porque perfumaria exige 70%.", "C) Atingiu, pois o objetivo de 60% se aplica a todos os canais apresentados.", "D) Atingiu somente se houver um ponto extra de escovas."
      ], "C", "O objetivo de 60% é aplicado a todos os canais apresentados, inclusive perfumaria.")
    ]
  },
  pampers: {
    "vale-night": [
      q("Uma loja possui uma faixa de gôndola com comunicação Vale Night, mas os demais materiais executados não apresentam o ícone de mamadeira. Qual é a avaliação?", [
        "A) Atingiu, porque a faixa é suficiente.", "B) Não atingiu, porque o KBD exige a faixa e materiais com o ícone de mamadeira.", "C) Atingiu, porque o ícone é opcional.", "D) Não atingiu somente se a loja for DPP."
      ], "B", "O KBD exige a faixa de gôndola Vale Night e materiais que apresentem o ícone de mamadeira. A faixa sozinha não é suficiente."),
      q("Em qual situação o KBD de comunicação Vale Night na gôndola de Pampers não deve ser aplicado?", [
        "A) Loja HFS.", "B) Loja de perfumaria.", "C) Loja DPP.", "D) Loja C&C."
      ], "C", "O KBD de gôndola Vale Night não se aplica ao canal DPP; nesse canal, o material apresenta o KBD de ponto extra.")
    ],
    "vale-night-ponto-extra": [
      q("Uma loja DPP possui um ponto extra com Pampers e um topo de ilha com comunicação Vale Night e ícone de mamadeira. Qual é a avaliação?", [
        "A) Atingiu o KBD de ponto extra de Vale Night.", "B) Não atingiu, porque topo de ilha não é um material válido.", "C) Não atingiu, porque o ponto extra não pode ser aplicado em DPP.", "D) Atingiu somente se o ponto extra estiver dentro do ponto natural."
      ], "A", "Em DPP, o ponto extra de Pampers com comunicação Vale Night e material com ícone de mamadeira atende ao KBD; topo de ilha é um dos materiais apresentados.")
    ]
  },
  tampax: {
    "ponto-natural": [
      q("Em qual canal o KBD de bandejas de Tampax apresentado no material deve ser avaliado?", ["A) C&C.", "B) NMR/GMR.", "C) DPP.", "D) HFS."], "C", "O KBD apresentado para bandeja de Tampax é aplicado ao canal DPP."),
      q("Uma loja DPP possui uma bandeja de Tampax executada em um ponto extra próximo ao checkout, mas não há bandeja no ponto natural de absorventes internos. Qual é o resultado?", [
        "A) Atingiu, porque qualquer bandeja Tampax é válida.", "B) Não atingiu, porque a bandeja deve estar no ponto natural de absorventes internos.", "C) Atingiu, porque checkout substitui o ponto natural.", "D) Não atingiu, porque são necessárias obrigatoriamente três bandejas."
      ], "B", "A bandeja precisa estar executada no ponto natural da categoria de absorventes internos. Um ponto extra próximo ao checkout não substitui essa execução."),
      q("Qual é o principal papel da bandeja de Tampax apresentado no material?", [
        "A) Reduzir a quantidade de produtos expostos na categoria.", "B) Aumentar a visibilidade, incentivar a experimentação e recrutar novas consumidoras.", "C) Direcionar as consumidoras exclusivamente para versões de absorventes externos.", "D) Substituir integralmente a comunicação da categoria no ponto de venda."
      ], "B", "A bandeja aumenta a visibilidade de Tampax no ponto natural, favorecendo experimentação e recrutamento de novas consumidoras.")
    ]
  }
};

window.QUIZZES = QUIZZES;

# Missão KBD — v2 (Ciclo Julho–Dezembro 2026)

Aplicação mobile-first de treinamento SPOT × P&G, preparada como PWA e futura base para APK.

## Escopo validado

O V2 contém 9 KBDs, separados de forma explícita:

- **Novos (2):** Pantene Finalizadores e Tampax no ponto natural.
- **Alterados (2):** Gillette Mach3/Presto3 e Secret por frentes ou bandejas.
- **Transformacionais (5):** Pantene Bond Repair, Venus 3 pontos, Oral-B 60%, Pampers Vale Night na gôndola e Pampers Vale Night no ponto extra.

Conteúdos antigos fora desse recorte não devem aparecer no aplicativo.

## Estado dos materiais

- Conteúdo dos 9 KBDs: estruturado com base nos PDFs de treinamento.
- Vídeos: aguardando material aprovado.
- Quizzes: 21 perguntas validadas, três por marca, com justificativa após a confirmação.
- Confirmação e sincronização: cada resposta confirmada é enviada pela integração já configurada.

O arquivo `quizzes.js` contém somente as perguntas e os gabaritos recebidos para este ciclo.

## Estrutura

```text
index.html          login por setor
home.html           home separada por categoria
kbd.html            detalhe e material de cada KBD
quiz.html           central de quizzes e respostas
novidades.html      visão resumida do ciclo
checklist.html      checklist dos 9 conteúdos
app.js              conteúdo e lógica da interface
quizzes.js          perguntas e gabaritos aprovados
style.css           estilos mobile-first
manifest.json       configuração PWA
service-worker.js   cache offline
assets/             identidade e ícones
logos/              logos das marcas
kbds/               imagens de apoio
PDFs Base/          fontes de trabalho; não publicar em produção
```

## Publicação

O projeto está conectado ao repositório `SPOTPROMO-PG/missao-kbd`. Os PDFs-base devem ser excluídos do artefato publicado.

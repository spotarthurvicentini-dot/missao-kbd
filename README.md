# Missão KBD — v2 (Ciclo Julho–Dezembro 2026)

Aplicação mobile-first de treinamento SPOT × P&G, preparada como PWA e futura base para APK.

## Escopo validado

O V2 contém 9 KBDs, separados de forma explícita:

- **Novos (2):** Pantene Finalizadores e Tampax no ponto natural.
- **Alterados (2):** Gillette Mach3/Presto3 e Secret por frentes ou bandejas.
- **Transformacionais (5):** SOS Downy, Pantene Bond Repair, Venus 3 pontos, Oral-B 60% e Pampers Vale Night.

Conteúdos antigos fora desse recorte não devem aparecer no aplicativo.

## Estado dos materiais

- Conteúdo dos 9 KBDs: estruturado com base nos PDFs de treinamento.
- Vídeos: aguardando material aprovado.
- Quizzes: aguardando perguntas e gabaritos aprovados pela área de treinamento.
- Confirmação e sincronização de respostas: permanece como evolução de backend.

O arquivo `quizzes.js` fica intencionalmente vazio até a aprovação. A interface mostra “Quiz em preparação” e não publica perguntas antigas ou inventadas.

## Estrutura

```text
index.html          login por setor
home.html           home separada por categoria
kbd.html            detalhe e material de cada KBD
quiz.html           central de quizzes e respostas
novidades.html      visão resumida do ciclo
checklist.html      checklist dos 9 conteúdos
app.js              conteúdo e lógica da interface
quizzes.js          perguntas aprovadas (vazio neste momento)
style.css           estilos mobile-first
manifest.json       configuração PWA
service-worker.js   cache offline
assets/             identidade e ícones
logos/              logos das marcas
kbds/               imagens de apoio
PDFs Base/          fontes de trabalho; não publicar em produção
```

## Publicação

Esta pasta não contém metadados `.git`. Antes de publicar, conecte-a ao repositório GitHub correto ou copie as alterações para um clone dele. Os PDFs-base devem ser excluídos do artefato publicado.

# Missão KBD — v2 (Ciclo Julho–Dezembro 2026)

Aplicação mobile-first de treinamento SPOT × P&G, publicada como PWA e empacotada como APK Android.

## Escopo validado

O V2 contém 9 KBDs, separados de forma explícita:

- **Novos (2):** Pantene Finalizadores e Tampax no ponto natural.
- **Alterados (2):** Gillette Mach3/Presto3 e Secret por frentes ou bandejas.
- **Transformacionais (5):** Pantene Bond Repair, Venus 3 pontos, Oral-B 60%, Pampers Vale Night na gôndola e Pampers Vale Night no ponto extra.

Conteúdos antigos fora desse recorte não devem aparecer no aplicativo.

## Estado dos materiais

- Conteúdo dos 9 KBDs: estruturado com base nos PDFs de treinamento.
- Vídeos: links aprovados configurados nos KBDs disponíveis.
- Quizzes: 21 perguntas validadas, três por marca, com justificativa após a confirmação.
- Confirmação e sincronização: cada resposta confirmada é enviada pela integração já configurada.

O arquivo `quizzes.js` contém somente as perguntas e os gabaritos recebidos para este ciclo.

## Estrutura operacional

```text
APP/                código Android, assinatura privada e APK oficial
BASES/              PDFs originais de treinamento, fora da publicação
CODIGO/             API do Google Sheets e integrações de apoio
SCRIPTS/            utilitários e arquivos temporários
SITE/               documentação da publicação web
raiz do projeto/    frontend publicado pelo GitHub Pages
assets/             identidade e ícones
logos/              logos das marcas
kbds/               imagens usadas pelo aplicativo
```

## Publicação

O projeto está conectado ao repositório `SPOTPROMO-PG/missao-kbd`. Os PDFs-base devem ser excluídos do artefato publicado.

## Gerar o APK oficial

Execute `APP/preparar_android.ps1`. O resultado pronto para entrega será `APP/distribuicao/Missao_KBD.apk`.

A assinatura privada fica em `APP/assinatura/` e precisa ser preservada para todas as versões futuras.

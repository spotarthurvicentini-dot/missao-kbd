# Missão KBD — v2 (Ciclo Julho–Dezembro 2026)

Aplicação mobile-first de treinamento SPOT × P&G, publicada como PWA e empacotada como APK Android.

## Escopo validado

O treinamento e os quizzes do V2 contêm 9 KBDs, separados de forma explícita:

- **Novos (4):** Pantene Finalizadores, Tampax no ponto natural, Gillette Mach3/Presto3 e Secret por frentes ou bandejas.
- **Transformacionais (5):** Pantene Bond Repair, Venus 3 pontos, Oral-B 60%, Pampers Vale Night na gôndola e Pampers Vale Night no ponto extra.

A área **Consulta** segue o `Guia de KBD - Versão Campo (Julho a Dezembro de 2026)` e contém os 25 KBDs de execução do guia, cada um com sua página visual oficial. Materiais retirados ou ausentes no guia não entram no pacote publicado.

## Estado dos materiais

- Conteúdo dos 9 KBDs: estruturado com base nos PDFs de treinamento.
- Vídeos: links aprovados configurados nos KBDs disponíveis.
- Quizzes: 21 perguntas validadas, três por marca, com justificativa após a confirmação.
- Confirmação e sincronização: cada resposta confirmada é enviada pela integração já configurada.

O arquivo `SITE/publicacao/quizzes.js` contém somente as perguntas e os gabaritos recebidos para este ciclo.

## Estrutura operacional

```text
APP/                código Android, assinatura privada e APK oficial
BASES/              PDFs originais de treinamento, fora da publicação
CODIGO/             API do Google Sheets e integrações de apoio
SCRIPTS/            utilitários e configurações técnicas
SITE/publicacao/    frontend completo publicado pelo GitHub Pages
.github/workflows/  automações de publicação e validação
```

A raiz do projeto contém somente as pastas operacionais, `.gitignore` e este arquivo de orientação.

## Publicação

O projeto está conectado ao repositório `SPOTPROMO-PG/missao-kbd`. A publicação monta um artefato usando `SITE/publicacao/` e acrescenta somente o APK oficial de `APP/distribuicao/`. PDFs, fontes, segredos e builds locais não entram no site.

## Gerar o APK oficial

Execute `APP/preparar_android.ps1`. O resultado pronto para entrega será `APP/distribuicao/Missao_KBD.apk`.

A assinatura privada fica em `APP/assinatura/` e precisa ser preservada para todas as versões futuras.

# Missão KBD: Execução de Elite — v2 (Ciclo Julho–Dezembro 2026)

Redesign completo do app de treinamento SPOT × P&G, com o conteúdo do ciclo
JUL–DEZ/26 e identidade visual nova (dark navy + neon, mascote robô).

## O que mudou nesta versão

### Visual / UX
- Identidade visual totalmente nova: fundo dark navy, gradiente neon
  (rosa → laranja → amarelo → ciano), mascote robô da campanha, logo
  "Missão KBD: Execução de Elite".
- Menu inferior fixo (Home / Novidades / Checklist / Quiz) — antes não existia
  navegação persistente.
- Grid de marcas em 2 colunas na Home, com indicador visual (bolinha) de quais
  marcas têm KBD novo ou que mudou.
- Badges de status **Novo / Mudou / Manteve** em cada KBD.
- Nova seção "Pílula de conhecimento" em cada KBD: o que conta, erro comum,
  produtos válidos e foco do promotor — extraído diretamente do material de
  treinamento.
- Pronto para instalação como **PWA** (ícone na tela inicial, abre em tela
  cheia, funciona offline para o conteúdo já visitado).

### Conteúdo (ciclo Julho–Dezembro 2026)
- **Nova marca: Tampax** — bandeja no ponto natural (DPP).
- **Novos KBDs Pantene**: Finalizadores com espaço garantido (frentes) e
  2 Pontos de Contato com Finalizadores (Óleo, Sérum e Leave-in).
- **Atualizados**: Secret (frentes OU bandejas), Gillette Mach3/Presto3
  (3 pontos na maioria dos canais, 2 em DPP), Venus (3 pontos em todos os
  canais), Pantene Bond Repair (regra de leitura ajustada).
- **Removidos** (não fazem mais parte do ciclo): Pantene Bambu/Colágeno/B3,
  Pantene Rio/Cachoeira Dourada, Venus % de sistemas na gôndola.
- **2 páginas novas**:
  - `novidades.html` — resumo visual do que entrou, mudou, manteve e saiu.
  - `checklist.html` — checklist interativo com os 25 itens de KBD para
    consulta rápida durante a visita (marca/desmarca e salva no aparelho).
- Todos os quizzes foram revisados e atualizados para refletir as novas regras
  (115 perguntas no total, incluindo os KBDs novos).

### O que foi mantido
- Login por código de setor (mesma lista de setores liberados).
- Integração com Google Sheets (mesma URL do Apps Script).
- Estrutura de progresso salva no aparelho (localStorage).

## Como publicar (GitHub Pages, igual antes)

1. Suba o conteúdo desta pasta para o repositório `missao-kbd`.
2. Em Settings → Pages, aponte para a branch/pasta de publicação.
3. O app abre em `index.html`.

## Como gerar o APK Android

O app já está pronto como **PWA** (tem `manifest.json`, `service-worker.js` e
ícones em todos os tamanhos). O caminho mais rápido e confiável para virar um
`.apk` instalável é usar uma ferramenta pronta que empacota a PWA — não é
necessário escrever código nativo:

### Opção recomendada — PWABuilder (sem instalar nada)
1. Publique o site (GitHub Pages, Netlify, Vercel etc.) — precisa de uma URL
   pública com HTTPS.
2. Acesse **https://www.pwabuilder.com**.
3. Cole a URL do site publicado e clique em "Start".
4. O PWABuilder vai validar o manifest (já está configurado corretamente) e
   mostrar as opções de pacote. Escolha **Android**.
5. Baixe o pacote gerado (`.apk` ou `.aab` assinado). Ele já vem pronto para
   instalar em qualquer Android ou publicar na Play Store.

### Opção alternativa — Bubblewrap (linha de comando)
Se preferir gerar localmente (exige Node.js e JDK instalados):
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://SEU-DOMINIO/manifest.json
bubblewrap build
```
Isso gera um `.apk`/`.aab` assinado com uma chave local.

> Observação: como o app usa YouTube embutido e envia dados para o Google
> Sheets, o aparelho precisa de internet para essas duas funções — o restante
> (login, navegação, checklist, progresso) funciona offline graças ao service
> worker.

## Estrutura de arquivos

```
index.html        → login
home.html          → home com progresso e marcas
marca.html         → lista de KBDs de uma marca
kbd.html           → aula do KBD (vídeo + pílula + galeria + quiz)
quiz.html          → quiz interativo
novidades.html     → o que mudou no ciclo
checklist.html     → checklist de visita (25 itens)
app.js             → lógica, conteúdo (CONTENT/NOVIDADES/CHECKLIST_ITEMS)
quizzes.js         → banco de perguntas por KBD
style.css          → design system (cores, componentes)
manifest.json      → configuração PWA
service-worker.js  → cache offline
assets/            → ícones do app, mascote, logo
logos/             → logos das marcas
kbds/              → imagens de referência de cada KBD (+ kbds/pilulas/)
```

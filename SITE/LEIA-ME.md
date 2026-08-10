# SITE

O frontend completo está em `publicacao/`.

Dentro dela ficam os HTMLs, JavaScript, CSS, manifesto, service worker, imagens, logos e referências dos KBDs. A biblioteca `kbds/guia-campo-2026/` contém somente as 25 páginas de KBD aprovadas no guia de campo vigente. Nenhum arquivo do frontend deve ficar solto na raiz do projeto.

O workflow `.github/workflows/deploy-pages.yml` publica o conteúdo desta pasta como a raiz do GitHub Pages e inclui o APK oficial durante a montagem do artefato.

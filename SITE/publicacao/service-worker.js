const CACHE_NAME = "missao-kbd-v2-guia-campo-25-kbds-2026-08-10";
const CORE_ASSETS = [
  "./index.html",
  "./home.html",
  "./marca.html",
  "./kbd.html",
  "./quiz.html",
  "./novidades.html",
  "./checklist.html",
  "./admin.html",
  "./admin.css?v=20260806-2",
  "./admin-mobile.css?v=20260806-2",
  "./admin-overrides.css?v=20260807-2",
  "./admin-real.js?v=20260807-5",
  "./style.css?v=20260807-2",
  "./app.js?v=20260810-8",
  "./quizzes.js?v=20260804-2",
  "./manifest.json",
  "./assets/mission-hero-v2.webp",
  "./assets/login-hero-final.webp?v=2",
  "./kbds/guia-campo-2026/always-70-suave.jpg",
  "./kbds/guia-campo-2026/tampax-bandeja-ponto-natural.jpg",
  "./kbds/guia-campo-2026/pantene-bond-repair-20.jpg",
  "./kbds/guia-campo-2026/pantene-finalizadores-8-frentes.jpg",
  "./kbds/guia-campo-2026/pantene-finalizadores-6-frentes.jpg",
  "./kbds/guia-campo-2026/pantene-finalizadores-2-pontos.jpg",
  "./kbds/guia-campo-2026/pampers-pants-sp.jpg",
  "./kbds/guia-campo-2026/pampers-pants-premium-sul.jpg",
  "./kbds/guia-campo-2026/pampers-ponto-extra-tamanhos-grandes.jpg",
  "./kbds/guia-campo-2026/pampers-vale-night-gondola.jpg",
  "./kbds/guia-campo-2026/pampers-vale-night-ponto-extra.jpg",
  "./kbds/guia-campo-2026/downy-ponto-extra-brisas-verao.jpg",
  "./kbds/guia-campo-2026/downy-bloco-azul-50.jpg",
  "./kbds/guia-campo-2026/downy-bloco-colorido-40.jpg",
  "./kbds/guia-campo-2026/secret-10-frentes-2-bandejas.jpg",
  "./kbds/guia-campo-2026/secret-15-frentes-3-bandejas.jpg",
  "./kbds/guia-campo-2026/oral-b-branqueamento-60.jpg",
  "./kbds/guia-campo-2026/oral-b-2-pontos-escovas.jpg",
  "./kbds/guia-campo-2026/oral-b-layout-bipe.jpg",
  "./kbds/guia-campo-2026/gillette-sistemas-ganchos.jpg",
  "./kbds/guia-campo-2026/gillette-3-pontos-mach3-presto3.jpg",
  "./kbds/guia-campo-2026/gillette-2-pontos-mach3-presto3.jpg",
  "./kbds/guia-campo-2026/gillette-carga-mach3-c8-2-ganchos.jpg",
  "./kbds/guia-campo-2026/venus-3-pontos.jpg",
  "./kbds/guia-campo-2026/venus-pele-sensivel-checkout.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Never intercept cross-origin requests (storage de vídeo, Google Sheets/Apps Script)
  if (new URL(req.url).origin !== self.location.origin) return;
  if (req.method !== "GET") return;

  const update = fetch(req).then((res) => {
    if (res && res.status === 200) {
      const clone = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
    }
    return res;
  });

  // HTML/navigation must prefer the network so a previous APK cannot pin an old panel.
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(update.catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html"))));
    return;
  }

  const cachedResponse = caches.match(req);
  event.waitUntil(update.catch(() => {}));
  event.respondWith(cachedResponse.then((cached) => cached || update));
});

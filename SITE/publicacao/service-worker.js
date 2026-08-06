const CACHE_NAME = "missao-kbd-v2-auth-2026-08-06";
const CORE_ASSETS = [
  "./index.html",
  "./home.html",
  "./marca.html",
  "./kbd.html",
  "./quiz.html",
  "./novidades.html",
  "./checklist.html",
  "./admin.html",
  "./admin.css?v=20260806-1",
  "./admin-mobile.css?v=20260806-1",
  "./admin.js?v=20260806-2",
  "./style.css?v=20260805-1",
  "./app.js?v=20260806-3",
  "./quizzes.js?v=20260804-2",
  "./manifest.json",
  "./assets/mission-hero-v2.webp",
  "./assets/login-hero-final.webp?v=2",
  "./kbds/referencias-2026/tampax-ponto-natural.webp",
  "./kbds/referencias-2026/pantene-bond-repair.webp",
  "./kbds/referencias-2026/pantene-finalizadores-dpp-8-frentes.webp",
  "./kbds/referencias-2026/pantene-finalizadores-alimentar-6-frentes.webp",
  "./kbds/referencias-2026/pampers-vale-night-gondola.webp",
  "./kbds/referencias-2026/pampers-vale-night-ponto-extra.webp",
  "./kbds/referencias-2026/secret-dpp-hfs-10-frentes-2-bandejas.webp",
  "./kbds/referencias-2026/secret-alimentar-15-frentes-3-bandejas.webp",
  "./kbds/referencias-2026/oral-b-branqueamento-60.webp",
  "./kbds/referencias-2026/gillette-alimentar-3-pontos.webp",
  "./kbds/referencias-2026/gillette-dpp-2-pontos.webp",
  "./kbds/referencias-2026/venus-3-pontos.webp",
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

  const cachedResponse = caches.match(req);
  const update = fetch(req).then((res) => {
    if (res && res.status === 200) {
      const clone = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
    }
    return res;
  });

  event.waitUntil(update.catch(() => {}));
  event.respondWith(cachedResponse.then((cached) => cached || update));
});

const CACHE_NAME = "missao-kbd-v2-a36-fast";
const CORE_ASSETS = [
  "./index.html",
  "./home.html",
  "./marca.html",
  "./kbd.html",
  "./quiz.html",
  "./novidades.html",
  "./checklist.html",
  "./style.css?v=20260804-5",
  "./app.js?v=20260804-5",
  "./quizzes.js?v=20260804-2",
  "./manifest.json",
  "./assets/mission-hero-v2.webp",
  "./assets/login-hero-final.webp?v=2",
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

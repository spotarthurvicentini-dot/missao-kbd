const CACHE_NAME = "missao-kbd-v2-login-hero-final";
const CORE_ASSETS = [
  "./index.html",
  "./home.html",
  "./marca.html",
  "./kbd.html",
  "./quiz.html",
  "./novidades.html",
  "./checklist.html",
  "./style.css?v=20260804-3",
  "./app.js?v=20260804-2",
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

  const networkFirst = req.destination === "document" ||
    req.destination === "style" ||
    req.destination === "script";

  if (networkFirst) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
      }
      return res;
    }))
  );
});

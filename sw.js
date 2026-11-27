/* Teacher Dario · offline support.
   Pages and code: network first (students always get the newest version), saved copy when offline.
   Pictures and big picture-data files: cache first (saves mobile data). Tapping a notification opens the app. */
const CACHE = "td-v2";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
const HEAVY = /\.(jpe?g|png|webp|gif|svg|mp3|wav)$|\/(picimg|thimg|starterimg|petphotos|photos)[^/]*\.js$/i;
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;           // Firebase, fonts etc. go straight to the network
  if (/\.pdf$/i.test(u.pathname)) return;                                       // big PDFs: never cached
  if (r.mode === "navigate" || /\/(index\.html)?$/.test(u.pathname)) {
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return res; }).catch(() => caches.match("./index.html")));
    return;
  }
  if (HEAVY.test(u.pathname)) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)); } return res; })));
    return;
  }
  e.respondWith(fetch(r).then(res => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)); } return res; }).catch(() => caches.match(r)));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws => {
    const w = ws.find(x => x.url.includes("/student-lesson-dashboard/")); if (w) return w.focus();
    return self.clients.openWindow(url);
  }));
});

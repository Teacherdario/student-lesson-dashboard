/* Teacher Dario · Level 0 Starter course view: 15 picture units for absolute beginners.
   Learn (photo cards + audio + mic) · Listen and choose · Read and choose · Speak · First sentences. Spanish first. */
(function () {
  if (typeof VIEWS === "undefined" || !window.STARTER) return;
  const U = STARTER.units;
  const e = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const md = t => e(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
  const store = () => { try { save(); } catch (x) { } };
  const IMG = k => (window.STARTER_IMG || {})[k] || "";
  const say = (t, l, s) => { if (window.SPEAK) SPEAK.say(t, l, s); };
  const isT = () => window.TD_TEACHER || !document.getElementById("gate");
  const ST = () => { if (!S.st) S.st = {}; const s = S.st; s.u = s.u || ""; s.tab = s.tab || "learn"; s.stars = s.stars || {}; s.said = s.said || {}; s.built = s.built || {}; s.best = s.best || {}; return s; };
  const unit = id => U.find(u => u.id === id);
  const words = u => u.groups.flatMap(g => g.w);
  const starsOf = id => { const x = ST().stars[id] || {}; return ["l", "r", "k", "b"].filter(k => x[k]).length; };
  const starRow = id => { const n = starsOf(id); return `<span class="st-stars" aria-label="${n} of 4 stars">${"★".repeat(n)}<i>${"★".repeat(4 - n)}</i></span>`; };
  const TABS = [["learn", "Learn", "Aprende", "👀"], ["listen", "Listen", "Escucha", "👂"], ["read", "Read", "Lee", "📖"], ["speak", "Speak", "Habla", "🎤"], ["sent", "Sentences", "Oraciones", "🧩"]];

  /* ---------- visuals ---------- */
  function vis(u, w, cls) {
    cls = cls || "";
    if (u.kind === "numbers") return `<div class="st-vis num ${cls}"><b>${e(w[4])}</b>${dots(w[4])}</div>`;
    if (u.kind === "letters") { const p = IMG(w[3]); return `<div class="st-vis let ${cls}">${p ? `<img src="${p}" alt="" loading="lazy">` : ""}<b>${e(w[0])}<small>${e(w[0].toLowerCase())}</small></b></div>`; }
    if (u.kind === "colors" && /^#/.test(w[4])) { const p = IMG(w[3]); return `<div class="st-vis col ${cls}">${p ? `<img src="${p}" alt="" loading="lazy">` : ""}<span class="sw" style="background:${w[4]}"></span></div>`; }
    const p = IMG(w[3]);
    if (p) return `<div class="st-vis ${cls}"><img src="${p}" alt="" loading="lazy"></div>`;
    return `<div class="st-vis emo ${cls}"><b>${e(w[4])}</b><small>${e(w[2])}</small></div>`;
  }
  function dots(n) { n = +n; if (!(n > 0 && n <= 20)) return ""; return `<span class="dots">${"●".repeat(n)}</span>`; }

  /* ---------- home ---------- */
  function home() {
    const s = ST(); const total = U.length * 4, got = U.reduce((a, u) => a + starsOf(u.id), 0);
    const next = U.find(u => starsOf(u.id) < 3) || U[0];
    let h = `<div class="st-hero"><div><div class="st-kick">Level 0 · Nivel 0</div><h1>Starter English</h1><p>Empieza desde cero: palabras con fotos, audio y tu voz. <span>Start from zero: words with photos, audio and your voice.</span></p>
      <div class="st-pbar"><i style="width:${Math.round(100 * got / total)}%"></i></div><div class="st-psub">${got} / ${total} ★</div></div>
      <button class="btn primary st-go" type="button" data-st="open" data-u="${next.id}">${got ? "Continue · Continuar" : "Start · Empezar"} ➜<small>Unit ${U.indexOf(next) + 1} · ${e(next.t)}</small></button></div>`;
    h += `<div class="st-how"><div><b>1 👀</b><span>Mira y escucha</span><em>Look and listen</em></div><div><b>2 🗣️</b><span>Repite en voz alta</span><em>Repeat</em></div><div><b>3 🎮</b><span>Juega y gana estrellas</span><em>Play and win stars</em></div><div><b>4 🎤</b><span>Habla con el micrófono</span><em>Speak</em></div></div>`;
    if (isT() && window.TOOLS && TOOLS.print) h += `<div class="row" style="justify-content:flex-end;gap:8px;margin:6px 0"><button class="btn" type="button" data-st="printall">🖨 Picture dictionary PDF · Diccionario ilustrado</button></div>`;
    h += `<div class="st-grid">${U.map((u, i) => `<button class="st-tile" type="button" data-st="open" data-u="${u.id}">
      <div class="st-cover">${IMG(u.cover) ? `<img src="${IMG(u.cover)}" alt="" loading="lazy">` : `<b>${u.ic}</b>`}<span class="st-n">${i + 1}</span></div>
      <div class="st-tt"><b>${u.ic} ${e(u.t)}</b><span>${e(u.es)}</span>${starRow(u.id)}</div></button>`).join("")}</div>`;
    h += `<p class="sub st-cred">Photos · Fotos: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>${credits()}</p>`;
    return h;
  }
  function credits() { const C = window.STARTER_CREDIT || {}; const by = [...new Set(Object.values(C).map(c => c.by).filter(Boolean))]; return by.length ? ` · ${e(by.slice(0, 400).join(", "))}` : ""; }

  /* ---------- unit ---------- */
  function unitView(u) {
    const s = ST(), i = U.indexOf(u);
    let h = `<div class="st-uhead"><button class="btn" type="button" data-st="home">← Units · Unidades</button><div class="st-uti"><span class="st-ub">Unit ${i + 1} / ${U.length}</span><h1>${u.ic} ${e(u.t)}</h1><p class="st-es">${e(u.es)}</p></div>${starRow(u.id)}</div>
      <div class="card st-goal">🎯 <b>${e(u.goal[0])}</b><span>${e(u.goal[1])}</span></div>
      <div class="st-tabs" role="tablist">${TABS.map(t => `<button type="button" role="tab" aria-selected="${s.tab === t[0]}" data-st="tab" data-v="${t[0]}"><span>${t[3]}</span>${t[2]}<small>${t[1]}</small>${tabStar(u.id, t[0])}</button>`).join("")}</div>`;
    h += `<div class="st-body">${s.tab === "listen" || s.tab === "read" ? game(u, s.tab) : s.tab === "speak" ? speakTab(u) : s.tab === "sent" ? sentTab(u) : learn(u)}</div>`;
    const nx = TABS.findIndex(t => t[0] === s.tab);
    h += `<div class="row st-foot">${i > 0 ? `<button class="btn" type="button" data-st="open" data-u="${U[i - 1].id}">← Unit ${i}</button>` : "<span></span>"}
      ${nx < TABS.length - 1 ? `<button class="btn primary" type="button" data-st="tab" data-v="${TABS[nx + 1][0]}">Next · Siguiente: ${TABS[nx + 1][2]} ➜</button>` : i < U.length - 1 ? `<button class="btn primary" type="button" data-st="open" data-u="${U[i + 1].id}">Unit ${i + 2} ➜</button>` : "<span></span>"}</div>`;
    if (isT() && window.TOOLS && TOOLS.print) h += `<div class="row" style="justify-content:flex-end;margin-top:8px"><button class="btn" type="button" data-st="print" data-u="${u.id}">🖨 Worksheet PDF · Hoja de trabajo</button></div>`;
    return h;
  }
  const TK = { listen: "l", read: "r", speak: "k", sent: "b" };
  const tabStar = (id, t) => TK[t] && (ST().stars[id] || {})[TK[t]] ? `<i class="st-tick">★</i>` : "";

  function learn(u) {
    let h = "";
    u.groups.forEach(g => {
      h += `<h2 class="st-gh">${e(g.h[1])} <small>${e(g.h[0])}</small></h2><div class="st-cards">`;
      g.w.forEach(w => {
        h += `<div class="st-card" data-spbox>${vis(u, w)}<button class="st-word" type="button" data-st="say" data-t="${e(w[0])}" title="Listen · Escuchar">${e(w[0])} <span>🔊</span></button>
          <div class="st-fig">🗣️ ${e(w[1])}</div><div class="st-esw">${e(w[2])}</div>
          <div class="st-btns"><button class="st-ib" type="button" data-st="slow" data-t="${e(w[0])}" title="Slowly · Despacio" aria-label="Listen slowly">🐢</button>${window.SPEAK ? SPEAK.micBtn(w[0], "learn:" + u.id) : ""}</div><div class="sp-res"></div></div>`;
      });
      h += `</div>`;
    });
    h += `<h2 class="st-gh">Tips · Consejos</h2><div class="st-tips">${u.tips.map(t => `<div class="st-tip"><p>${md(t[0])}</p><em>${e(t[1])}</em></div>`).join("")}</div>`;
    return h;
  }

  /* ---------- listen / read games ---------- */
  let G = null; // {u,mode,qs,i,score,ans}
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const vkey = (u, w) => u.kind === "numbers" ? "n" + w[4] : u.kind === "letters" ? "l" + w[0] : (w[3] || w[4] + w[2]);
  function newGame(u, mode) {
    const W = words(u), N = Math.min(10, W.length);
    const qs = shuffle(W).slice(0, N).map(w => {
      const pool = shuffle(W.filter(x => x !== w && vkey(u, x) !== vkey(u, w)));
      const opts = shuffle([w, ...pool.slice(0, 3)]);
      return { w, opts };
    });
    G = { u: u.id, mode, qs, i: 0, score: 0, ans: null };
  }
  function game(u, mode) {
    if (!G || G.u !== u.id || G.mode !== mode) newGame(u, mode);
    if (G.i >= G.qs.length) {
      const ok = G.score, n = G.qs.length, pass = ok >= Math.ceil(n * .8);
      return `<div class="card st-end"><div class="st-big">${pass ? "🏆" : "💪"}</div><h2>${ok} / ${n}</h2><p>${pass ? "¡Excelente! Ganaste una estrella ★ · Excellent! You won a star." : "¡Buen intento! Necesitas " + Math.ceil(n * .8) + " para la estrella. · Good try!"}</p>
        <button class="btn primary" type="button" data-st="again">Play again · Jugar otra vez</button></div>`;
    }
    const q = G.qs[G.i];
    let h = `<div class="st-gtop"><span>${mode === "listen" ? "👂 Escucha y toca la imagen correcta · Listen and tap the right picture" : "📖 Lee la palabra y toca la imagen · Read the word and tap the picture"}</span><b>${G.i + 1} / ${G.qs.length} · ✅ ${G.score}</b></div>`;
    h += mode === "listen" ? `<div class="st-prompt"><button class="st-play" type="button" data-st="say" data-t="${e(q.w[0])}" aria-label="Play the word again">🔊</button><button class="st-ib" type="button" data-st="slow" data-t="${e(q.w[0])}" aria-label="Slowly">🐢</button></div>`
      : `<div class="st-prompt"><div class="st-read">${e(q.w[0])}</div></div>`;
    h += `<div class="st-opts">${q.opts.map((o, i) => { const st = G.ans == null ? "" : o === q.w ? "ok" : G.ans === i ? "bad" : "dim"; return `<button class="st-opt ${st}" type="button" data-st="pick" data-i="${i}" ${G.ans != null ? "disabled" : ""}>${vis(u, o, "sm")}${G.ans != null ? `<span class="st-lab">${e(o[0])}</span>` : ""}</button>`; }).join("")}</div>`;
    if (G.ans != null) { const right = q.opts[G.ans] === q.w; h += `<div class="st-fb ${right ? "ok" : "bad"}">${right ? "✅ ¡Correcto! · Correct!" : `❌ Es <b>${e(q.w[0])}</b> (${e(q.w[2])})`}</div><div class="row" style="justify-content:center"><button class="btn primary" type="button" data-st="gnext">Next · Siguiente ➜</button></div>`; }
    return h;
  }

  /* ---------- speak ---------- */
  function speakTab(u) {
    const s = ST(), said = s.said[u.id] || [], W = words(u), need = Math.ceil(W.length * .7);
    let h = `<div class="card st-sp"><b>🎤 Di cada palabra en voz alta. · Say each word out loud.</b><p>Escucha 🔊, toca 🎤 y habla. Las palabras correctas se ponen verdes. Necesitas ${need} de ${W.length} para la estrella. · Get ${need} of ${W.length} for the star.</p>
      <div class="st-pbar"><i style="width:${Math.round(100 * Math.min(said.length, W.length) / W.length)}%"></i></div><div class="st-psub">${said.length} / ${W.length} ✅</div>
      ${window.SPEAK && !SPEAK.ok ? `<p class="st-warn">Tu navegador no puede escuchar. Usa Chrome, Edge o Safari. · Use Chrome, Edge or Safari to speak.</p>` : ""}</div><div class="st-list">`;
    W.forEach(w => {
      const ok = said.includes(w[0]);
      h += `<div class="st-row ${ok ? "done" : ""}" data-spbox>${vis(u, w, "xs")}<div class="st-rt"><b>${e(w[0])}</b><span>🗣️ ${e(w[1])} · ${e(w[2])}</span></div>
        <button class="st-ib" type="button" data-st="say" data-t="${e(w[0])}" aria-label="Listen">🔊</button>${window.SPEAK ? SPEAK.micBtn(w[0], "spk:" + u.id) : ""}<span class="st-ok">${ok ? "✅" : ""}</span><div class="sp-res"></div></div>`;
    });
    return h + `</div>`;
  }

  /* ---------- sentences ---------- */
  let B = null; // {u, k, picked:[], tiles:[]}
  const tilesOf = t => t.replace(/([.!?,])/g, " $1").split(/\s+/).filter(x => x && !/^[.!?,]$/.test(x));
  function sentTab(u) {
    const s = ST(), built = s.built[u.id] || [];
    let h = `<div class="card st-sp"><b>🧩 Tus primeras oraciones · Your first sentences</b><p>Escucha, repite y ordena las palabras. Ordena todas para ganar la estrella. · Listen, repeat and put the words in order.</p><div class="st-psub">${built.length} / ${u.sent.length} ✅</div></div>`;
    u.sent.forEach((x, k) => {
      const done = built.includes(k), open = B && B.u === u.id && B.k === k;
      h += `<div class="card st-sent ${done ? "done" : ""}" data-spbox><div class="st-ses">${e(x[1])}</div>
        <div class="st-sen">${e(x[0])} <button class="st-ib" type="button" data-st="say" data-t="${e(x[0])}" aria-label="Listen">🔊</button><button class="st-ib" type="button" data-st="slow" data-t="${e(x[0])}" aria-label="Slowly">🐢</button></div>
        <div class="st-fig">🗣️ ${e(x[2])}</div>
        <div class="st-btns">${window.SPEAK ? SPEAK.micBtn(x[0], "sen:" + u.id) : ""}<button class="btn sm" type="button" data-st="build" data-k="${k}">${done ? "✅ " : ""}🧩 Ordena · Build it</button></div><div class="sp-res"></div>
        ${open ? buildBox(x) : ""}</div>`;
    });
    return h;
  }
  function buildBox(x) {
    const T = tilesOf(x[0]);
    if (!B.tiles) B.tiles = shuffle(T.map((t, i) => ({ t, i })));
    const ok = B.picked.length === T.length && B.picked.map(p => p.t).join(" ") === T.join(" ");
    return `<div class="st-build"><div class="st-ans">${B.picked.map((p, j) => `<button type="button" class="st-tl on" data-st="unpick" data-j="${j}">${e(p.t)}</button>`).join("") || `<span class="sub">Toca las palabras en orden · Tap the words in order</span>`}</div>
      <div class="st-bank">${B.tiles.map(p => B.picked.includes(p) ? `<span class="st-tl ghost">${e(p.t)}</span>` : `<button type="button" class="st-tl" data-st="tile" data-i="${p.i}">${e(p.t)}</button>`).join("")}</div>
      ${B.picked.length === T.length ? `<div class="st-fb ${ok ? "ok" : "bad"}">${ok ? "✅ ¡Perfecto! · Perfect!" : "❌ Casi. Toca una palabra para quitarla. · Almost. Tap a word to remove it."}</div>` : ""}</div>`;
  }

  /* ---------- teacher print ---------- */
  function printUnit(list, title) {
    let h = `<header class="pd-head"><div><div class="pd-school">${e((S.tools && S.tools.school) || "Teacher Dario · English")}</div><h1>${e(title)}</h1><div class="pd-sub">Level 0 · Starter · Nivel 0</div></div><div class="pd-lines"><span>Name · Nombre: ____________________________</span><span>Date · Fecha: ______________</span></div></header>`;
    list.forEach((u, n) => {
      const W = words(u);
      h += `${n ? '<div class="pd-break"></div>' : ""}<section class="pd-sec"><h2><span>${U.indexOf(u) + 1}</span> ${e(u.t)} · ${e(u.es)}</h2><p class="pd-inst">${e(u.goal[0])} · ${e(u.goal[1])}</p>
        <div class="st-pgrid">${W.map(w => `<div class="st-pc">${pvis(u, w)}<b>${e(w[0])}</b><span>${e(w[1])}</span><em>${e(w[2])}</em></div>`).join("")}</div></section>`;
      if (list.length === 1) {
        const pick = shuffle(W).slice(0, Math.min(12, W.length));
        h += `<section class="pd-sec"><h2><span>A</span> Look and write · Mira y escribe</h2><div class="pd-bank">${shuffle(pick).map(w => `<span>${e(w[0])}</span>`).join("")}</div>
          <div class="st-pgrid">${pick.map(w => `<div class="st-pc">${pvis(u, w)}<div class="st-line"></div></div>`).join("")}</div></section>
          <section class="pd-sec"><h2><span>B</span> Translate · Traduce al inglés</h2><ol class="pd-q">${u.sent.map(x => `<li>${e(x[1])}<div class="pd-write"><div></div></div></li>`).join("")}</ol></section>
          <section class="pd-key"><h2>Answer key · Respuestas</h2><p>${u.sent.map((x, i) => `${i + 1}. ${e(x[0])}`).join(" · ")}</p></section>`;
      }
    });
    TOOLS.print(h, title);
  }
  function pvis(u, w) {
    if (u.kind === "numbers") return `<div class="st-pv t">${e(w[4])}</div>`;
    if (u.kind === "letters") return `<div class="st-pv t">${e(w[0])}${e(w[0].toLowerCase())}</div>`;
    const p = IMG(w[3]); if (p) return `<img class="st-pv" src="${p}" alt="">`;
    if (u.kind === "colors") return `<div class="st-pv" style="background:${w[4]}"></div>`;
    return `<div class="st-pv t">${e(w[4])}</div>`;
  }

  /* ---------- draw + events ---------- */
  function draw() {
    const root = document.getElementById("v-starter"); if (!root) return;
    const s = ST(); const u = s.u && unit(s.u);
    root.innerHTML = u ? unitView(u) : home();
    if (u && s.tab === "listen" && G && G.ans == null && G.i < G.qs.length && !G.played) { G.played = G.i + 1; const w0 = G.qs[G.i].w[0]; setTimeout(() => say(w0, "en"), 250); }
  }
  function star(id, k) { const s = ST(); const x = s.stars[id] || (s.stars[id] = {}); if (!x[k]) { x[k] = 1; store(); } }

  document.addEventListener("click", ev => {
    const b = ev.target.closest("[data-st]"); if (!b || !b.closest("#v-starter")) return;
    const s = ST(), a = b.dataset.st, u = unit(s.u);
    if (a === "open") { s.u = b.dataset.u; s.tab = "learn"; G = null; B = null; store(); draw(); window.scrollTo(0, 0); }
    else if (a === "home") { s.u = ""; store(); draw(); window.scrollTo(0, 0); }
    else if (a === "tab") { s.tab = b.dataset.v; G = null; B = null; store(); draw(); }
    else if (a === "say") say(b.dataset.t, "en");
    else if (a === "slow") say(b.dataset.t, "en", true);
    else if (a === "pick" && G && G.ans == null) {
      G.ans = +b.dataset.i; const q = G.qs[G.i]; const right = q.opts[G.ans] === q.w; if (right) G.score++;
      say(q.w[0], "en"); draw();
    }
    else if (a === "gnext" && G) {
      G.i++; G.ans = null; G.played = 0;
      if (G.i >= G.qs.length) { const k = G.mode === "listen" ? "l" : "r", pct = Math.round(100 * G.score / G.qs.length); s.best[u.id + k] = Math.max(s.best[u.id + k] || 0, pct); if (G.score >= Math.ceil(G.qs.length * .8)) star(u.id, k); store(); }
      draw();
    }
    else if (a === "again") { G = null; draw(); }
    else if (a === "build") { const k = +b.dataset.k; B = B && B.u === u.id && B.k === k ? null : { u: u.id, k, picked: [], tiles: null }; draw(); }
    else if (a === "tile" && B) {
      const p = B.tiles.find(t => t.i === +b.dataset.i); if (p && !B.picked.includes(p)) B.picked.push(p);
      const x = u.sent[B.k], T = tilesOf(x[0]);
      if (B.picked.length === T.length && B.picked.map(p => p.t).join(" ") === T.join(" ")) {
        say(x[0], "en"); const L = s.built[u.id] || (s.built[u.id] = []); if (!L.includes(B.k)) L.push(B.k);
        if (L.length >= u.sent.length) star(u.id, "b"); store();
      }
      draw();
    }
    else if (a === "unpick" && B) { B.picked.splice(+b.dataset.j, 1); draw(); }
    else if (a === "print") printUnit([u], "Level 0 · Unit " + (U.indexOf(u) + 1) + " · " + u.t);
    else if (a === "printall") printUnit(U, "Level 0 · Starter · Picture dictionary");
  });
  document.addEventListener("speak:result", ev => {
    const k = ev.detail.key || ""; const r = ev.detail.r; if (!r || !r.ok) return;
    const m = /^spk:(.+)$/.exec(k); if (!m) return;
    const s = ST(), u = unit(m[1]); if (!u) return;
    const L = s.said[u.id] || (s.said[u.id] = []); if (!L.includes(ev.detail.target)) L.push(ev.detail.target);
    if (L.length >= Math.ceil(words(u).length * .7)) star(u.id, "k");
    store();
    const row = ev.target.closest(".st-row"); if (row) { row.classList.add("done"); const o = row.querySelector(".st-ok"); if (o) o.textContent = "✅"; }
    const ps = document.querySelector("#v-starter .st-sp .st-psub"); if (ps) ps.textContent = L.length + " / " + words(u).length + " ✅";
    const pb = document.querySelector("#v-starter .st-sp .st-pbar i"); if (pb) pb.style.width = Math.round(100 * L.length / words(u).length) + "%";
  });

  window.STARTER.draw = draw;
  window.STARTER.open = id => { const s = ST(); s.u = id || ""; s.tab = "learn"; G = null; B = null; store(); location.hash = "starter"; setTimeout(draw, 30); };
  window.STARTER.stars = starsOf;

  const css = document.createElement("style");
  css.textContent = `
.st-hero{display:flex;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:linear-gradient(135deg,#ff8a3d,#ff4f81 55%,#7b5cff);color:#fff;border-radius:20px;padding:22px 24px;margin-bottom:14px}
.st-hero h1{font-size:2rem;margin:2px 0;color:#fff}.st-hero p{margin:4px 0 10px;font-size:1.05rem;max-width:560px}.st-hero p span{display:block;opacity:.85;font-size:.9rem}
.st-kick{font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:.78rem;opacity:.9}
.st-pbar{height:9px;background:rgba(255,255,255,.35);border-radius:6px;overflow:hidden;max-width:420px}.st-pbar i{display:block;height:100%;background:#fff;border-radius:6px}
.st-sp .st-pbar,.st-body .st-pbar{background:var(--line)}.st-sp .st-pbar i{background:linear-gradient(90deg,#34a36b,#7bd389)}
.st-psub{font-size:.85rem;font-weight:700;margin-top:4px}
.st-go{background:#fff!important;color:#c2185b!important;border:0!important;font-size:1.1rem;padding:14px 22px;display:flex;flex-direction:column;align-items:center;border-radius:14px}.st-go small{font-weight:600;color:#555;font-size:.8rem}
.st-how{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}.st-how div{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:10px 12px;display:flex;flex-direction:column}.st-how b{font-size:1.1rem}.st-how span{font-weight:700}.st-how em{color:var(--muted);font-size:.82rem}
.st-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.st-tile{border:1px solid var(--line);background:var(--surface);border-radius:16px;overflow:hidden;padding:0;text-align:left;cursor:pointer;font:inherit;color:inherit;transition:transform .15s,box-shadow .15s}.st-tile:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.1)}
.st-cover{position:relative;aspect-ratio:4/3;background:#fde7d6;display:grid;place-items:center}.st-cover img{width:100%;height:100%;object-fit:cover}.st-cover>b{font-size:3rem}
.st-n{position:absolute;top:8px;left:8px;background:#fff;color:#c2185b;font-weight:800;border-radius:999px;min-width:30px;height:30px;display:grid;place-items:center;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.st-tt{padding:10px 12px;display:flex;flex-direction:column;gap:2px}.st-tt span{color:var(--muted);font-size:.86rem}
.st-stars{color:#f5a400;letter-spacing:2px;font-size:1.05rem}.st-stars i{color:#d9d9d9;font-style:normal}
.st-cred{margin-top:16px;font-size:.75rem}
.st-uhead{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:10px}.st-uti{flex:1;min-width:200px}.st-uti h1{margin:2px 0}.st-es{margin:0;color:#5b4a8a;font-style:italic}
.st-ub{display:inline-block;background:#ff4f81;color:#fff;font-weight:800;font-size:.75rem;border-radius:999px;padding:2px 10px}.st-goal{display:flex;flex-direction:column;gap:2px;background:#fff8e1;border-color:#f1d27a}.st-goal span{color:var(--muted);font-size:.9rem;margin-left:24px}
.st-tabs{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:12px 0}
.st-tabs button{position:relative;border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:8px 4px;font-family:inherit;font-weight:700;font-size:.92rem;color:inherit;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px}
.st-tabs button span{font-size:1.3rem}.st-tabs button small{font-weight:500;color:var(--muted);font-size:.72rem}.st-tabs button[aria-selected=true]{border-color:#ff4f81;background:#fff0f5}
.st-tick{position:absolute;top:3px;right:6px;color:#f5a400;font-style:normal}
.st-gh{margin:16px 0 8px}.st-gh small{color:var(--muted);font-weight:500;font-size:.8em}
.st-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
.st-card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:8px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px}
.st-vis{width:100%;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:#f2f4f8;display:grid;place-items:center;position:relative}.st-vis img{width:100%;height:100%;object-fit:cover}
.st-vis.num{background:linear-gradient(135deg,#e0ecff,#f3e8ff);align-content:center;gap:4px}.st-vis.num b{font-size:3.2rem;color:#2453c9;line-height:1}.st-vis .dots{color:#ff4f81;font-size:.7rem;letter-spacing:2px;max-width:90%;line-height:1.1}
.st-vis.let img{opacity:.9}.st-vis.let b{position:absolute;left:8px;bottom:6px;background:rgba(255,255,255,.92);border-radius:10px;padding:0 10px;font-size:2.2rem;color:#c2185b;line-height:1.2}.st-vis.let b small{font-size:.6em;margin-left:4px;color:#7b5cff}
.st-vis.col .sw{position:absolute;right:8px;bottom:8px;width:38px;height:38px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)}
.st-vis.emo{background:linear-gradient(135deg,#fff3e0,#fce4ec);align-content:center}.st-vis.emo b{font-size:2.6rem;line-height:1}.st-vis.emo small{font-size:.82rem;color:#7a4b00;padding:0 4px}
.st-word{border:0;background:none;font-family:inherit;font-weight:800;font-size:1.25rem;color:inherit;cursor:pointer;padding:2px 4px}.st-word span{font-size:.8em}
.st-fig{display:inline-block;background:#fff6dc;color:#7a4b00;border-radius:8px;padding:1px 8px;font-size:.9rem;font-weight:600}
.st-esw{color:#5b4a8a;font-size:.88rem}
.st-btns{display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:2px}
.st-ib{border:1px solid var(--line);background:var(--surface);border-radius:999px;width:36px;height:36px;font-size:1.05rem;cursor:pointer}
.st-card .sp-fb{font-size:.82rem;padding:6px 8px;margin-top:4px}.st-card .sp-fb .sp-words{font-size:.95rem;margin:2px 0}.st-card .sp-heard{font-size:.74rem}
.st-tips{display:grid;gap:8px}.st-tip{background:#eef6ff;border-left:4px solid #2453c9;border-radius:10px;padding:8px 12px}.st-tip p{margin:0}.st-tip em{color:var(--muted);font-size:.85rem}
.st-gtop{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:.92rem;margin-bottom:8px}
.st-prompt{display:flex;justify-content:center;align-items:center;gap:10px;margin:8px 0 14px}
.st-play{width:84px;height:84px;border-radius:50%;border:0;background:linear-gradient(135deg,#ff8a3d,#ff4f81);color:#fff;font-size:2.2rem;cursor:pointer;box-shadow:0 6px 16px rgba(255,79,129,.35)}
.st-read{font-size:2.6rem;font-weight:800;background:var(--surface);border:2px dashed #7b5cff;border-radius:16px;padding:8px 26px}
.st-opts{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-width:620px;margin:0 auto}
.st-opt{border:3px solid transparent;background:var(--surface);border-radius:16px;padding:4px;cursor:pointer;font:inherit;color:inherit;display:flex;flex-direction:column;gap:2px;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.st-opt.ok{border-color:#34a36b}.st-opt.bad{border-color:#e35d5d}.st-opt.dim{opacity:.45}.st-lab{font-weight:800}
.st-fb{text-align:center;font-weight:700;margin:12px 0;border-radius:10px;padding:8px}.st-fb.ok{background:#e7f8ee;color:#15803d}.st-fb.bad{background:#fdecec;color:#b42318}
.st-end{text-align:center}.st-big{font-size:3rem}
.st-sp p{margin:6px 0}.st-warn{color:#b42318;font-weight:700}
.st-list{display:grid;gap:8px}.st-row{display:grid;grid-template-columns:64px 1fr auto auto 26px;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:6px 10px}
.st-row.done{border-color:#34a36b;background:#f3fbf6}.st-row .sp-res{grid-column:1/-1}.st-row .sp-res:empty{display:none}
.st-vis.xs{width:64px;border-radius:10px}.st-vis.xs.num b{font-size:1.6rem}.st-vis.xs .dots,.st-vis.xs small{display:none}.st-vis.xs.let b{font-size:1.1rem;left:3px;bottom:3px;padding:0 4px}.st-vis.xs.emo b{font-size:1.5rem}.st-vis.xs .sw{width:20px;height:20px;right:3px;bottom:3px;border-width:2px}
.st-rt{display:flex;flex-direction:column}.st-rt b{font-size:1.1rem}.st-rt span{font-size:.84rem;color:var(--muted)}
.st-sent{display:flex;flex-direction:column;gap:6px}.st-sent.done{border-color:#34a36b}.st-ses{color:#5b4a8a;font-weight:700}.st-sen{font-size:1.3rem;font-weight:800;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.st-sent .st-btns{justify-content:flex-start}
.st-build{border-top:1px dashed var(--line);padding-top:8px}.st-ans{min-height:46px;border:2px dashed #7b5cff;border-radius:12px;padding:6px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}
.st-bank{display:flex;flex-wrap:wrap;gap:6px}.st-tl{border:1.5px solid #7b5cff;background:#f3efff;color:#3b2a8a;border-radius:10px;padding:6px 12px;font-family:inherit;font-weight:700;font-size:1rem;cursor:pointer}.st-tl.on{background:#7b5cff;color:#fff}.st-tl.ghost{opacity:.25;cursor:default}
.st-foot{justify-content:space-between;margin-top:18px}
.st-pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.st-pc{border:1px solid #ccc;border-radius:8px;padding:5px;text-align:center;font:12px Arial,sans-serif;break-inside:avoid;display:flex;flex-direction:column;gap:1px}
.st-pc b{font-size:14px}.st-pc span{color:#7a4b00}.st-pc em{color:#5b4a8a}.st-pv{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;display:block}.st-pv.t{display:grid;place-items:center;font:800 34px Arial,sans-serif;color:#2453c9;background:#eef3ff}.st-line{border-bottom:1.5px solid #555;height:26px}
@media (max-width:760px){.st-how{grid-template-columns:repeat(2,1fr)}.st-tabs button{font-size:.8rem}.st-tabs button small{display:none}.st-cards{grid-template-columns:repeat(2,1fr)}.st-grid{grid-template-columns:repeat(2,1fr)}.st-hero h1{font-size:1.6rem}.st-read{font-size:2rem}.st-row{grid-template-columns:52px 1fr auto auto 22px;gap:6px}.st-vis.xs{width:52px}}`;
  document.head.appendChild(css);

  if (!VIEWS.some(x => x[0] === "starter")) {
    VIEWS.splice(0, 0, ["starter", "Starter", '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-starter")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-starter"; sec.setAttribute("aria-label", "Level 0 Starter course"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "starter") draw(); }; try { render(); } catch (x) { } }
  }
})();

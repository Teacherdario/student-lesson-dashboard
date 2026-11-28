/* Teacher Dario · Live games (Kahoot-style). The teacher hosts on a big screen or phone, students join with a PIN.
   Uses Firebase through window.TD_FB (set by the login block on the GitHub site). Data: live/{pin} + live/{pin}/players/{uid}. */
(function () {
  if (typeof VIEWS === "undefined") return;
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const COLS = ["#e21b3c", "#1368ce", "#d89e00", "#26890c"], SH = ["▲", "◆", "●", "■"];
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const F = () => window.TD_FB;
  const BASE = (() => { try { const c = document.currentScript && document.currentScript.src; return c ? c.replace(/[^/]*$/, "") : ""; } catch (e) { return ""; } })();
  const loaded = {};
  function loadFor(key) {
    let file = null, m;
    if ((m = /^fm(\d+)-/.exec(key)) && window.FARM && FARM.list[+m[1]]) file = "farmimg-s" + FARM.list[+m[1]].st + ".js";
    else if ((m = /^th(\d+)-/.exec(key)) && window.THEMES && THEMES.list[+m[1]]) file = "thimg-" + THEMES.list[+m[1]].id + ".js";
    else if ((m = /^(A1|A2|B1|B2|C1|C2)-/.exec(key))) file = "picimg-" + m[1].toLowerCase() + ".js";
    if (!file || loaded[file]) return; loaded[file] = 1;
    const s = document.createElement("script"); s.src = BASE + file; s.onload = () => draw(); document.head.appendChild(s);
  }
  /* ---------- join by PIN, QR code or link ---------- */
  const SITE = "https://teacherdario.github.io/student-lesson-dashboard/";
  const siteURL = () => /github\.io$/.test(location.hostname) ? location.origin + location.pathname : SITE;
  const joinURL = pin => siteURL() + "?pin=" + pin + "#live";
  let qrReady = !!window.qrcode, qrAsked = false;
  function needQR() { if (qrReady || qrAsked) return; qrAsked = true; const s = document.createElement("script"); s.src = BASE + "qr.js"; s.onload = () => { qrReady = true; draw(); }; document.head.appendChild(s); }
  function qrSVG(text) { try { const q = qrcode(0, "M"); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true, alt: "QR code to join the game" }); } catch (e) { return ""; } }
  const shareText = pin => `🎮 ¡Juego en vivo de Teacher Dario! · Live game\nPIN: ${pin}\nToca para entrar · Tap to join: ${joinURL(pin)}`;
  // A student who opened a join link: remember the PIN until they are signed in, then join by themselves.
  let pending = "";
  try { const p = new URLSearchParams(location.search).get("pin"); if (p && /^\d{6}$/.test(p)) { pending = p; sessionStorage.setItem("td-join", p); const u = new URL(location.href); u.searchParams.delete("pin"); u.hash = "live"; history.replaceState(null, "", u.pathname + u.search + u.hash); } else pending = sessionStorage.getItem("td-join") || ""; } catch (e) { }
  function autoJoin() {
    if (!pending || L.pin || L.busy) return;
    const fb = F(); if (!fb || !fb.auth || !fb.auth.currentUser || !window.TD_ME) return;
    const p = pending; pending = ""; try { sessionStorage.removeItem("td-join"); } catch (e) { }
    if (location.hash !== "#live") location.hash = "live";
    if (window.TD_TEACHER) { L.prefill = p; draw(); return; }
    join(p);
  }
  setInterval(autoJoin, 1000);
  const imgOf = k => k ? ((window.TH_IMG || {})[k] || (window.PIC_IMG || {})[k] || (window.FM_IMG || {})[k] || "") : "";
  const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const now = () => Date.now();

  /* ---------- sources ---------- */
  function sources() {
    const out = [];
    (window.THEMES && THEMES.list || []).forEach(t => out.push({ id: "th:" + t.id, src: "Places", name: `${t.em} ${t.en}`, words: lv => t.w.filter(x => x.l <= lv).map(x => ({ w: x.w, es: x.es, m: x.m, e: x.e, k: x.key, l: x.l })) }));
    const P = window.PICDICT && PICDICT.data || {};
    LV.forEach((L, li) => (P[L] || []).forEach(t => out.push({ id: `pd:${L}:${t.ti}`, src: `Picture dictionary ${L}`, name: `${t.em} ${t.en} (${L})`, words: () => t.items.map(x => ({ w: x.w, es: x.es, m: x.m, e: x.e, k: x.key, l: li + 1 })) })));
    (window.FARM && FARM.list || []).forEach(u => out.push({ id: "fm:" + u.id, src: "Field & Machine English", name: `${u.em} ${u.ui + 1}. ${u.en}`, words: () => u.w.map(x => ({ w: x.w, es: x.es, m: x.m, e: x.e, k: x.key, l: 1 })) }));
    return out;
  }
  const TYPES = [["mix", "🔀 Mixed"], ["pic", "🖼️ Picture → word"], ["es", "🇲🇽 Spanish → English"], ["def", "📖 Meaning → word"], ["gap", "✏️ Complete the sentence"]];
  function buildQuestions(cfg) {
    const S = sources().filter(s => cfg.src.includes(s.id)); const lv = LV.indexOf(cfg.lv) + 1;
    let pool = []; S.forEach(s => pool.push(...s.words(lv))); const seen = new Set(); pool = pool.filter(x => !seen.has(x.w.toLowerCase()) && seen.add(x.w.toLowerCase()));
    if (pool.length < 4) return [];
    const picks = shuf(pool).slice(0, Math.min(cfg.n, pool.length));
    return picks.map((x, i) => {
      let type = cfg.type === "mix" ? ["pic", "es", "def", "gap"][i % 4] : cfg.type;
      const re = new RegExp("\\b" + x.w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\w*", "i");
      if (type === "gap" && !re.test(x.e)) type = "def";
      const opts = shuf([x.w, ...shuf(pool.filter(y => y.w !== x.w)).slice(0, 3).map(y => y.w)]);
      const q = type === "pic" ? "What is this? · ¿Qué es?" : type === "es" ? `How do you say “${x.es}” in English?` : type === "def" ? `Which word means: “${x.m}”?` : x.e.replace(re, "_____");
      return { t: type, q, k: type === "pic" || type === "gap" ? x.k : "", o: opts, a: opts.indexOf(x.w), es: x.es };
    });
  }

  /* ---------- state ---------- */
  const L = { pin: null, host: false, game: null, players: [], me: null, uns: [], qRecv: 0, tick: null, err: "", busy: false };
  const cfg = () => { if (!S.liveCfg) S.liveCfg = { src: [], lv: window.TD_LEVEL || "A1", type: "mix", n: 10, secs: 20, allow: [] }; return S.liveCfg; };
  const store = () => { try { save(); } catch (e) { } };
  function stop() { L.uns.forEach(u => { try { u(); } catch (e) { } }); L.uns = []; clearInterval(L.tick); L.tick = null; }
  let roster = null;
  async function loadRoster() { if (roster || !F()) return; try { const fb = F(); const qs = await fb.getDocs(fb.collection(fb.db, "roster")); roster = []; qs.forEach(d => { const v = d.data(); if (v.name && v.role !== "teacher") roster.push(v.name); }); roster.sort(); draw(); } catch (e) { roster = []; } }

  /* ---------- host ---------- */
  async function create() {
    const fb = F(), c = cfg(); const qs = buildQuestions(c);
    if (!qs.length) { L.err = "Choose at least one theme with 4+ words at this level. · Elige al menos un tema."; draw(); return; }
    L.busy = true; draw();
    const pin = String(100000 + Math.floor(Math.random() * 900000));
    const title = sources().filter(s => c.src.includes(s.id)).map(s => s.name).slice(0, 3).join(", ") + (c.src.length > 3 ? "…" : "");
    try {
      await fb.setDoc(fb.doc(fb.db, "live", pin), { host: fb.auth.currentUser.uid, state: "lobby", qi: -1, qAt: 0, secs: c.secs, lv: c.lv, title, allow: c.allow || [], qs: JSON.stringify(qs), created: now() });
      L.pin = pin; L.host = true; L.err = ""; watchHost();
    } catch (e) { L.err = "Could not create the game. Check the database rules. · No se pudo crear el juego. " + (e.code || ""); }
    L.busy = false; draw();
  }
  function watchHost() {
    const fb = F(); stop();
    L.uns.push(fb.onSnapshot(fb.doc(fb.db, "live", L.pin), d => { L.game = d.exists() ? Object.assign(d.data(), { Q: JSON.parse(d.data().qs || "[]") }) : null; draw(); }));
    L.uns.push(fb.onSnapshot(fb.collection(fb.db, "live", L.pin, "players"), qs => { L.players = []; qs.forEach(d => L.players.push(Object.assign({ id: d.id }, d.data()))); hostAuto(); draw(); }));
    L.tick = setInterval(() => { hostAuto(); const t = document.getElementById("lv-time"); if (t && L.game && L.game.state === "q") t.textContent = Math.max(0, Math.ceil((L.game.qAt + L.game.secs * 1000 - now()) / 1000)); const b = document.querySelector(".lv-tbar i"); if (b && L.game && L.game.state === "q") b.style.width = Math.max(0, 100 - (now() - L.game.qAt) / (L.game.secs * 10)) + "%"; }, 250);
  }
  const answered = qi => L.players.filter(p => p.ans && p.ans[qi] != null).length;
  function hostAuto() { const g = L.game; if (!L.host || !g || g.state !== "q") return; if (now() > g.qAt + g.secs * 1000 + 600 || (L.players.length && answered(g.qi) >= L.players.length)) setState({ state: "reveal" }); }
  let setting = false;
  async function setState(o) { if (setting) return; setting = true; const fb = F(); try { await fb.setDoc(fb.doc(fb.db, "live", L.pin), o, { merge: true }); } catch (e) { } setting = false; }
  async function closeGame() { const fb = F(); const pin = L.pin; stop(); try { for (const p of L.players) await fb.deleteDoc(fb.doc(fb.db, "live", pin, "players", p.id)); await fb.deleteDoc(fb.doc(fb.db, "live", pin)); } catch (e) { } Object.assign(L, { pin: null, host: false, game: null, players: [] }); draw(); }

  /* ---------- player ---------- */
  async function join(pin) {
    const fb = F(); pin = String(pin || "").replace(/\D/g, ""); if (pin.length !== 6) { L.err = "The PIN has 6 numbers. · El PIN tiene 6 números."; draw(); return; }
    L.busy = true; draw();
    try {
      const g = await fb.getDoc(fb.doc(fb.db, "live", pin));
      if (!g.exists()) throw { msg: "No game with that PIN. · No hay juego con ese PIN." };
      const v = g.data(); if (v.state === "end") throw { msg: "That game has finished. · Ese juego ya terminó." };
      const me = String(window.TD_ME || "player"); if (v.allow && v.allow.length && !v.allow.includes(me)) throw { msg: "This game is for other students. · Este juego es para otros alumnos." };
      const uid = fb.auth.currentUser.uid; const ref = fb.doc(fb.db, "live", pin, "players", uid);
      const old = await fb.getDoc(ref); if (!old.exists()) await fb.setDoc(ref, { name: me, score: 0, ans: {}, joined: now() });
      L.pin = pin; L.host = false; L.err = ""; stop();
      L.uns.push(fb.onSnapshot(fb.doc(fb.db, "live", pin), d => { const pv = L.game; L.game = d.exists() ? Object.assign(d.data(), { Q: JSON.parse(d.data().qs || "[]") }) : null; if (L.game && (!pv || pv.qi !== L.game.qi || pv.state !== L.game.state) && L.game.state === "q") L.qRecv = now(); if (L.game && L.game.Q[L.game.qi]) loadFor(L.game.Q[L.game.qi].k); draw(); }));
      L.uns.push(fb.onSnapshot(ref, d => { L.me = d.exists() ? d.data() : null; draw(); }));
      L.uns.push(fb.onSnapshot(fb.collection(fb.db, "live", pin, "players"), qs => { L.players = []; qs.forEach(d => L.players.push(Object.assign({ id: d.id }, d.data()))); draw(); }));
      L.tick = setInterval(() => { const t = document.getElementById("lv-time"); if (t && L.game && L.game.state === "q") t.textContent = Math.max(0, Math.ceil((L.qRecv + L.game.secs * 1000 - now()) / 1000)); }, 300);
    } catch (e) { L.err = e.msg || ("Could not join. · No se pudo entrar. " + (e.code || "")); }
    L.busy = false; draw();
  }
  async function answer(o) {
    const g = L.game, fb = F(); if (!g || g.state !== "q" || !L.me || (L.me.ans && L.me.ans[g.qi] != null)) return;
    const q = g.Q[g.qi]; const t = now() - L.qRecv, ok = o === q.a; const pts = ok ? Math.max(500, Math.round(1000 - 500 * t / (g.secs * 1000))) : 0;
    const ans = Object.assign({}, L.me.ans || {}); ans[g.qi] = { o, p: pts };
    L.me = Object.assign({}, L.me, { ans, score: (L.me.score || 0) + pts }); draw();
    try { await fb.setDoc(fb.doc(fb.db, "live", L.pin, "players", fb.auth.currentUser.uid), { ans, score: L.me.score }, { merge: true }); } catch (e) { }
  }
  function leave() { stop(); Object.assign(L, { pin: null, game: null, me: null, players: [] }); draw(); }

  /* ---------- views ---------- */
  const rank = () => L.players.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
  const board = (n, meName) => `<ol class="lv-board">${rank().slice(0, n).map((p, i) => `<li class="${p.name === meName ? "me" : ""}"><span>${i + 1}</span><b>${esc(p.name)}</b><em>${p.score || 0}</em></li>`).join("")}</ol>`;
  function qBlock(q, big) {
    if (q.k) loadFor(q.k); const im = imgOf(q.k);
    return `${q.t === "pic" ? `<div class="lv-img">${im ? `<img src="${im}" alt="">` : '<span>🖼️</span>'}</div>` : ""}<h2 class="lv-q${big ? " big" : ""}">${esc(q.q)}</h2>`;
  }
  function setupHTML() {
    const c = cfg(), S = sources(); loadRoster();
    const groups = {}; S.forEach(s => (groups[s.src] = groups[s.src] || []).push(s));
    const count = buildCount(c);
    return `<div class="card"><h2>1 · Themes · Temas</h2><p class="sub">Pick one or more. · Elige uno o varios.</p>
      ${Object.keys(groups).map(g => `<details class="lv-src" ${g === "Places" ? "open" : ""}><summary>${esc(g)} <span class="sub">(${groups[g].filter(s => c.src.includes(s.id)).length}/${groups[g].length})</span></summary><div class="lv-chips">${groups[g].map(s => `<button type="button" class="chip" data-lv="src" data-v="${s.id}" aria-pressed="${c.src.includes(s.id)}">${esc(s.name)}</button>`).join("")}</div></details>`).join("")}</div>
      <div class="card"><h2>2 · Level · Nivel</h2><div class="seg">${LV.map(l => `<button type="button" class="chip" data-lv="lv" data-v="${l}" aria-pressed="${c.lv === l}"><span class="lvl ${l}">${l}</span></button>`).join("")}</div><p class="sub">${count} words available · palabras disponibles</p></div>
      <div class="card"><h2>3 · Game · Juego</h2><div class="seg">${TYPES.map(([k, l]) => `<button type="button" class="chip" data-lv="type" data-v="${k}" aria-pressed="${c.type === k}">${l}</button>`).join("")}</div>
        <div class="row lv-row"><span>Questions · Preguntas</span>${[5, 10, 15, 20].map(n => `<button type="button" class="chip sm" data-lv="n" data-v="${n}" aria-pressed="${c.n === n}">${n}</button>`).join("")}</div>
        <div class="row lv-row"><span>Seconds · Segundos</span>${[10, 20, 30, 45].map(n => `<button type="button" class="chip sm" data-lv="secs" data-v="${n}" aria-pressed="${c.secs === n}">${n}</button>`).join("")}</div></div>
      <div class="card"><h2>4 · Players · Jugadores</h2><p class="sub">Leave all unselected to let any of your students join. · Si no eliges, entra cualquier alumno.</p>
        <div class="lv-chips">${roster == null ? "Loading…" : roster.length ? roster.map(n => `<button type="button" class="chip sm" data-lv="allow" data-v="${esc(n)}" aria-pressed="${(c.allow || []).includes(n)}">${esc(n)}</button>`).join("") : '<span class="sub">No students yet.</span>'}</div></div>
      ${L.err ? `<p class="lv-err">${esc(L.err)}</p>` : ""}
      <button type="button" class="btn primary lv-big" data-lv="create" ${L.busy || !c.src.length ? "disabled" : ""}>🎮 Create game · Crear juego</button>`;
  }
  function buildCount(c) { const lv = LV.indexOf(c.lv) + 1; const s = new Set(); sources().filter(x => c.src.includes(x.id)).forEach(x => x.words(lv).forEach(w => s.add(w.w.toLowerCase()))); return s.size; }
  function hostHTML() {
    const g = L.game; if (!g) return `<p>Loading… · Cargando…</p>`;
    const head = `<div class="row lv-top"><span class="lv-pin">PIN <b>${L.pin}</b></span><span class="sub">${esc(g.title)} · ${g.lv}</span><button type="button" class="btn ghost" data-lv="close">✕ End game</button></div>`;
    if (g.state === "lobby") { needQR(); const url = joinURL(L.pin); return head + `<div class="lv-lobby"><h2>How to join · Cómo entrar</h2><div class="lv-ways">
      <div class="lv-way"><b>1 · PIN</b><span class="sub">App → 🎮 Live → type the PIN · escribe el PIN</span><div class="lv-bigpin">${L.pin}</div></div>
      <div class="lv-way"><b>2 · QR</b><span class="sub">Scan with the phone camera · Escanea con la cámara</span><div class="lv-qr">${qrReady ? qrSVG(url) : "…"}</div></div>
      <div class="lv-way"><b>3 · Link · Enlace</b><span class="sub">Send it on WhatsApp · Envíalo por WhatsApp</span><code class="lv-url">${esc(url)}</code><div class="lv-share"><button type="button" class="btn" data-lv="copy">📋 Copy · Copiar</button><a class="btn" href="https://wa.me/?text=${encodeURIComponent(shareText(L.pin))}" target="_blank" rel="noopener">🟢 WhatsApp</a>${navigator.share ? '<button type="button" class="btn" data-lv="share">📤 Share · Compartir</button>' : ""}</div></div></div>
      <p><b>${L.players.length}</b> players · jugadores</p><div class="lv-names">${L.players.map(p => `<span>${esc(p.name)}</span>`).join("") || '<span class="sub">Waiting for players… · Esperando…</span>'}</div>
      <button type="button" class="btn primary lv-big" data-lv="start" ${L.players.length ? "" : "disabled"}>▶ Start · Empezar (${g.Q.length} questions)</button></div>`; }
    const q = g.Q[g.qi];
    if (g.state === "q") return head + `<div class="lv-qhead"><span>${g.qi + 1}/${g.Q.length}</span><span class="lv-timer" id="lv-time">${g.secs}</span><span>${answered(g.qi)}/${L.players.length} answered</span></div><div class="lv-tbar"><i></i></div>${qBlock(q, true)}<div class="lv-opts host">${q.o.map((o, i) => `<div class="lv-opt" style="background:${COLS[i]}"><span>${SH[i]}</span>${esc(o)}</div>`).join("")}</div>`;
    if (g.state === "reveal") { const cnt = [0, 0, 0, 0]; L.players.forEach(p => { const a = p.ans && p.ans[g.qi]; if (a) cnt[a.o]++; }); const mx = Math.max(1, ...cnt);
      return head + `<div class="lv-qhead"><span>${g.qi + 1}/${g.Q.length}</span></div>${qBlock(q, true)}<div class="lv-bars">${q.o.map((o, i) => `<div class="${i === q.a ? "ok" : "no"}"><i style="height:${Math.round(cnt[i] / mx * 100)}%;background:${COLS[i]}"></i><b>${cnt[i]}</b><span>${SH[i]} ${esc(o)}${i === q.a ? " ✓" : ""}</span></div>`).join("")}</div>
        <h3>🏆 Top 5</h3>${board(5)}<button type="button" class="btn primary lv-big" data-lv="next">${g.qi + 1 < g.Q.length ? "Next question · Siguiente ▶" : "🏁 Final results · Resultados"}</button>`; }
    if (g.state === "end") { const r = rank();
      return head + `<div class="lv-podium">${[1, 0, 2].map(i => r[i] ? `<div class="p${i + 1}"><b>${esc(r[i].name)}</b><em>${r[i].score || 0}</em><span>${i + 1}</span></div>` : "<div></div>").join("")}</div>${board(50)}
        <div class="row"><button type="button" class="btn primary" data-lv="again">🔁 New game · Nuevo juego</button><button type="button" class="btn ghost" data-lv="close">✕ Close · Cerrar</button></div>`; }
    return head;
  }
  function playHTML() {
    const g = L.game, me = String(window.TD_ME || "");
    if (!g) return `<div class="card lv-wait"><p>The game was closed by the teacher. · El maestro cerró el juego.</p><button type="button" class="btn" data-lv="leave">OK</button></div>`;
    const top = `<div class="row lv-top"><span class="lv-pin">PIN <b>${L.pin}</b></span><span><b>${esc(me)}</b> · ${L.me ? L.me.score || 0 : 0} pts</span></div>`;
    if (g.state === "lobby") return top + `<div class="card lv-wait"><div class="lv-spin">🎮</div><h2>You're in! · ¡Ya entraste!</h2><p>Wait for the teacher to start. · Espera a que el maestro empiece.</p><p class="sub">${L.players.length} players · jugadores</p></div>`;
    const q = g.Q[g.qi], a = L.me && L.me.ans && L.me.ans[g.qi];
    if (g.state === "q") return top + `<div class="lv-qhead"><span>${g.qi + 1}/${g.Q.length}</span><span class="lv-timer" id="lv-time">${g.secs}</span></div>${qBlock(q)}${a ? `<div class="card lv-wait"><h2>Answer sent ✔ · Respuesta enviada</h2><p>Wait for the others… · Espera a los demás…</p></div>` : `<div class="lv-opts">${q.o.map((o, i) => `<button type="button" class="lv-opt" style="background:${COLS[i]}" data-lv="ans" data-v="${i}"><span>${SH[i]}</span>${esc(o)}</button>`).join("")}</div>`}`;
    if (g.state === "reveal") { const ok = a && a.o === q.a; const pos = rank().findIndex(p => p.name === me) + 1;
      return top + `<div class="card lv-res ${ok ? "ok" : "no"}"><h2>${a ? ok ? "✅ Correct! · ¡Correcto!" : "❌ Not this time · Esta vez no" : "⏰ Time's up · Se acabó el tiempo"}</h2>${a ? `<p>+${a.p} points</p>` : ""}<p>Answer · Respuesta: <b>${esc(q.o[q.a])}</b>${q.es ? ` (${esc(q.es)})` : ""}</p><p>You are <b>#${pos || "–"}</b> of ${L.players.length}</p></div>`; }
    if (g.state === "end") { const pos = rank().findIndex(p => p.name === me) + 1;
      return top + `<div class="card lv-res ok"><h2>${pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : "🎉"} You finished #${pos} · Quedaste en el lugar ${pos}</h2><p>${L.me ? L.me.score || 0 : 0} points</p></div>${board(10, me)}<button type="button" class="btn" data-lv="leave">Exit · Salir</button>`; }
    return top;
  }
  function joinHTML() {
    return `<div class="card lv-join"><h2>Join a live game · Entrar a un juego</h2><p class="sub">Type the PIN your teacher shows. · Escribe el PIN que muestra tu maestro.</p>
      <input id="lv-pin" class="lv-pinin" inputmode="numeric" maxlength="6" placeholder="123456" autocomplete="off" value="${esc(L.prefill || "")}"><button type="button" class="btn primary lv-big" data-lv="join" ${L.busy ? "disabled" : ""}>Enter · Entrar</button>${L.err ? `<p class="lv-err">${esc(L.err)}</p>` : ""}</div>`;
  }
  function html() {
    let h = `<div class="head"><div><h1>🎮 Live games</h1><p class="sub">Juegos en vivo · ${window.TD_TEACHER ? "Host a game for your class · Organiza un juego" : "Play with your class · Juega con tu clase"}</p></div></div>`;
    if (!F()) return h + `<div class="card"><p>Live games need a student login, so they work in the <b>Teacher Dario app</b> and on <a href="https://teacherdario.github.io/student-lesson-dashboard/" target="_blank" rel="noopener">teacherdario.github.io/student-lesson-dashboard</a>.</p><p class="sub">Los juegos en vivo funcionan en la app y en el sitio con tu usuario.</p></div>`;
    if (L.pin) return h + (L.host ? hostHTML() : playHTML());
    if (window.TD_TEACHER) return h + `<div class="row" style="margin-bottom:10px"><span class="sub">Or join as a player: · O entra como jugador:</span></div>${setupHTML()}<details class="card" style="margin-top:12px"><summary>Join with a PIN · Entrar con PIN</summary>${joinHTML()}</details>`;
    return h + joinHTML();
  }
  function draw() {
    const s = document.getElementById("v-live"); if (!s) return;
    const a = document.activeElement, keep = a && a.id === "lv-pin" ? a.value : null;
    s.innerHTML = html();
    if (keep != null) { const i = document.getElementById("lv-pin"); if (i) { i.value = keep; i.focus(); } }
  }
  window.LIVE = { draw };

  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-lv]"); if (!b) return; const a = b.dataset.lv, c = cfg();
    if (a === "src") { const i = c.src.indexOf(b.dataset.v); if (i < 0) c.src.push(b.dataset.v); else c.src.splice(i, 1); store(); draw(); }
    else if (a === "lv") { c.lv = b.dataset.v; store(); draw(); }
    else if (a === "type") { c.type = b.dataset.v; store(); draw(); }
    else if (a === "n" || a === "secs") { c[a] = +b.dataset.v; store(); draw(); }
    else if (a === "allow") { c.allow = c.allow || []; const i = c.allow.indexOf(b.dataset.v); if (i < 0) c.allow.push(b.dataset.v); else c.allow.splice(i, 1); store(); draw(); }
    else if (a === "create") create();
    else if (a === "start" || a === "next") { const g = L.game; if (!g) return; if (g.qi + 1 >= g.Q.length) setState({ state: "end" }); else { const nq = g.Q[g.qi + 1]; if (nq.k) loadFor(nq.k); setState({ state: "q", qi: g.qi + 1, qAt: now() }); } }
    else if (a === "close") { if (L.host) closeGame(); }
    else if (a === "again") { closeGame(); }
    else if (a === "copy") { const u = joinURL(L.pin); (navigator.clipboard ? navigator.clipboard.writeText(shareText(L.pin)) : Promise.reject()).then(() => { b.textContent = "✓ Copied · Copiado"; }).catch(() => { prompt("Copy this link:", u); }); }
    else if (a === "share") { navigator.share({ title: "Teacher Dario · Live game", text: shareText(L.pin) }).catch(() => { }); }
    else if (a === "join") { const i = document.getElementById("lv-pin"); join(i && i.value); }
    else if (a === "ans") answer(+b.dataset.v);
    else if (a === "leave") leave();
  });
  document.addEventListener("keydown", ev => { if (ev.key === "Enter" && ev.target && ev.target.id === "lv-pin") join(ev.target.value); });

  const css = document.createElement("style");
  css.textContent = `
.lv-src{margin:6px 0}.lv-src summary{cursor:pointer;font-weight:800;padding:4px 0}.lv-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.lv-row{gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap}.lv-row>span{min-width:150px;font-weight:700}
.lv-big{width:100%;min-height:56px;font-size:1.15rem;margin-top:12px}.lv-err{color:#e5484d;font-weight:700}
.lv-top{justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:10px}.lv-pin{background:var(--ink);color:var(--bg);border-radius:10px;padding:4px 12px}.lv-pin b{letter-spacing:.12em}
.lv-lobby{text-align:center}.lv-ways{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:10px 0 14px}.lv-way{border:1px solid var(--line);border-radius:14px;background:var(--surface);padding:12px;display:flex;flex-direction:column;gap:6px;align-items:center;justify-content:flex-start}.lv-way>b{font-size:1.1rem}.lv-way .lv-bigpin{font-size:clamp(2.2rem,4.6vw,3.6rem);letter-spacing:.08em;margin:auto 0}
.lv-qr{width:min(220px,70vw);background:#fff;border-radius:10px;padding:4px}.lv-qr svg{width:100%;height:auto;display:block}.lv-url{font-size:.8rem;word-break:break-all;background:var(--sunken);padding:6px 8px;border-radius:8px}.lv-share{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.lv-share .btn{min-height:38px;text-decoration:none}.lv-bigpin{font:900 clamp(3rem,12vw,7rem)/1 system-ui;letter-spacing:.12em;margin:10px 0;color:#1f4e9c}
.lv-names{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0}.lv-names span{background:var(--line);border-radius:20px;padding:6px 14px;font-weight:800;animation:lvpop .3s}
@keyframes lvpop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}
.lv-qhead{display:flex;justify-content:space-between;align-items:center;font-weight:800;margin:6px 0}.lv-timer{display:grid;place-items:center;width:56px;height:56px;border-radius:28px;background:#7048e8;color:#fff;font-size:1.4rem}
.lv-tbar{height:8px;background:var(--line);border-radius:4px;overflow:hidden}.lv-tbar i{display:block;height:100%;width:100%;background:#7048e8;transition:width .25s linear}
.lv-img{width:min(520px,100%,calc(34vh*4/3));margin:10px auto;aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:var(--line);display:grid;place-items:center;font-size:4rem}.lv-img img{width:100%;height:100%;object-fit:cover}
.lv-q{text-align:center;font-size:clamp(1.2rem,3.5vw,1.8rem);margin:12px 0}.lv-q.big{font-size:clamp(1.4rem,4vw,2.4rem)}
.lv-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.lv-opt{display:flex;align-items:center;gap:10px;min-height:76px;border:0;border-radius:14px;color:#fff;font:800 clamp(1rem,3vw,1.35rem) system-ui;padding:10px 14px;text-align:left;cursor:pointer;box-shadow:0 4px 0 #0003}
.lv-opt span{font-size:1.4rem}.lv-opts.host .lv-opt{cursor:default;min-height:90px}
.lv-bars{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;align-items:end;height:220px;margin:10px 0}.lv-bars>div{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;gap:4px}.lv-bars i{width:70%;min-height:4px;border-radius:8px 8px 0 0}.lv-bars .no{opacity:.45}.lv-bars span{font-size:.85rem;text-align:center;font-weight:700}
.lv-board{list-style:none;padding:0;margin:8px 0;display:grid;gap:6px}.lv-board li{display:flex;gap:10px;align-items:center;background:var(--surface,var(--bg));border:1px solid var(--line);border-radius:12px;padding:8px 12px}.lv-board li.me{border-color:#1c7ed6;background:#1c7ed61a}.lv-board span{width:28px;font-weight:900}.lv-board b{flex:1}.lv-board em{font-style:normal;font-weight:900}
.lv-podium{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;gap:10px;height:260px;margin:10px 0}.lv-podium>div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;border-radius:14px 14px 0 0;color:#fff;padding:8px;text-align:center}
.lv-podium .p1{height:100%;background:#d89e00}.lv-podium .p2{height:75%;background:#8a8f98}.lv-podium .p3{height:55%;background:#b0642a}.lv-podium span{font:900 2rem system-ui}.lv-podium em{font-style:normal}
.lv-wait,.lv-join{text-align:center}.lv-spin{font-size:3rem;animation:lvb 1s infinite alternate}@keyframes lvb{to{transform:translateY(-8px)}}
.lv-pinin{width:100%;max-width:320px;font:900 2.2rem system-ui;letter-spacing:.2em;text-align:center;padding:10px;border:2px solid var(--line);border-radius:14px;background:var(--surface,var(--bg));color:inherit;margin:10px auto;display:block}
.lv-res.ok{border-color:#26890c}.lv-res.no{border-color:#e21b3c}.lv-res{text-align:center;border-width:2px}
@media(max-width:600px){.lv-opts{grid-template-columns:1fr}.lv-bars{height:170px}}`;
  document.head.appendChild(css);

  if (!VIEWS.some(v => v[0] === "live")) {
    VIEWS.push(["live", "Live", '<path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.3 5H6.7a4 4 0 00-4 3.6l-.7 6.9A2.6 2.6 0 004.6 18c.9 0 1.7-.4 2.2-1.1L8.5 15h7l1.7 1.9c.5.7 1.3 1.1 2.2 1.1a2.6 2.6 0 002.6-2.5l-.7-6.9A4 4 0 0017.3 5z"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-live")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-live"; sec.setAttribute("aria-label", "Live games"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "live") draw(); }; try { render(); } catch (e) { } }
  }
})();

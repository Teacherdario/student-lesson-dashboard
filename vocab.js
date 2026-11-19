/* Teacher Dario · Vocabulary course (A1–C2): word lists, "build the sentence" and word-building practice. Uses DICT_DATA. */
(function () {
  const D = window.DICT_DATA; if (!D || typeof VIEWS === "undefined") return;
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const LVA = [...LV, "FCE"];
  const ALW = () => { const a = (window.TD_ALLOW || {})["VOC"]; return a && a.length ? LVA.filter(l => a.includes(l)) : LVA; };
  const inLv = (e, lv) => lv === "FCE" ? /^B2 First/.test(e.src || "") : e.c === lv;
  const wbLv = lv => lv === "FCE" ? "B2" : lv;
  const escH = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const E = D.entries.map((r, i) => ({ i, w: r[0], t: r[1], c: r[2], p: r[3], es: r[4], e: r[7], src: r[8] || "", xs: r[11] || "" }));
  const WB = D.wb || [];
  const COMMON = new Set(); const CE = window.CEFR_EST || {}; ["A1", "A2", "B1", "B2"].forEach(l => String(CE[l] || "").split(" ").forEach(w => COMMON.add(w)));
  ["mexico", "messi", "shakira", "london", "paris", "spain", "canada"].forEach(w => COMMON.delete(w));
  const GROUPS = [["noun", "Nouns · Sustantivos"], ["verb", "Verbs · Verbos"], ["adjective", "Adjectives · Adjetivos"], ["adverb", "Adverbs · Adverbios"], ["phrase", "Phrasal verbs & expressions · Verbos frasales y expresiones"], ["other", "Other words · Otras palabras"]];
  const grp = t => ["noun", "verb", "adjective", "adverb"].includes(t) ? t : (t === "phrasal verb" || t === "expression") ? "phrase" : "other";
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nrm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' -]/g, "").replace(/\s+/g, " ").trim();
  function V() { if (!S.voc) S.voc = {}; const v = S.voc; v.lv = v.lv || (LVA.includes(window.TD_LEVEL) ? window.TD_LEVEL : "A1"); v.mode = v.mode || "list"; v.best = v.best || {}; return v; }
  const store = () => { try { save(); } catch (e) { } };

  /* ---------- build the sentence ---------- */
  function sbItems(lv) {
    const pool = E.filter(e => inLv(e, lv) && e.e && e.xs && e.e.split(" ").length >= 4 && e.e.split(" ").length <= 14);
    return shuffle(pool).slice(0, 10).map(e => {
      let s = e.e.trim(); const end = /[.!?]$/.test(s) ? s.slice(-1) : "."; if (/[.!?]$/.test(s)) s = s.slice(0, -1);
      const toks = s.split(/\s+/);
      const t0 = toks[0]; if (t0 !== "I" && /^[A-Z][a-z']*$/.test(t0) && COMMON.has(t0.toLowerCase())) toks[0] = t0.toLowerCase();
      return { i: e.i, w: e.w, es: e.es, xs: e.xs, toks, end, order: shuffle(toks.map((_, k) => k)), picked: [], done: false };
    });
  }
  const full = x => { const t = x.toks.join(" ") + x.end; return t.charAt(0).toUpperCase() + t.slice(1); };
  const tokOK = q => q.picked.length === q.toks.length && q.picked.every((k, j) => nrm(q.toks[k]) === nrm(q.toks[j]));
  /* ---------- word building ---------- */
  function wbItems(lv) { return shuffle(WB.filter(x => x[0] === wbLv(lv))).slice(0, 10).map(x => ({ s: x[1], root: x[2], a: x[3].split("/"), v: "" })); }
  const wbOK = q => q.a.some(a => nrm(a) === nrm(q.v));

  function fb(score, n, lv, kind) {
    const p = score / n; const next = ALW()[ALW().indexOf(lv) + 1];
    const msg = p >= .9 ? `Excellent! You know ${lv} vocabulary well.${next ? ` Try ${next} next.` : " You are working at the top level."} · ¡Excelente!` :
      p >= .7 ? `Good work. You are close to mastering ${lv}. Review the words you missed and try again. · Buen trabajo.` :
        p >= .5 ? `Getting there. Study the ${lv} word list for ten minutes, then try a new set. · Vas bien.` :
          `This level needs more practice. Read the ${lv} word list with the examples${LV.indexOf(lv) > 0 ? `, or try ${LV[LV.indexOf(lv) - 1]} first` : ""}. · Necesitas practicar más.`;
    const tip = kind === "sb" ? "Tip: find the subject and the verb first, then add the rest. · Consejo: busca primero el sujeto y el verbo." : "Tip: decide if the gap needs a noun, verb, adjective or adverb, and if it is negative. · Consejo: decide qué tipo de palabra falta.";
    return `<div class="vfb ${p >= .7 ? "ok" : "no"}"><b>Score · Puntuación: ${score}/${n}</b><p>${msg}</p><p class="sub">${tip}</p></div>`;
  }
  function bestLine(lv) { const b = V().best[lv] || {}; const f = x => x ? `${x[0]}/${x[1]}` : "–"; return `<span class="sub">Best · Mejor: build ${f(b.sb)} · word building ${f(b.wb)}</span>`; }

  /* ---------- markup ---------- */
  function listHTML(lv) {
    const L = E.filter(e => inLv(e, lv)).sort((a, b) => a.w.localeCompare(b.w));
    return `<p class="sub">${L.length} words and expressions at ${lv}. Tap 🔊 to listen, or a word to open it in the dictionary. · Toca una palabra para verla en el diccionario.</p>` +
      GROUPS.map(([g, lab]) => { const a = L.filter(e => grp(e.t) === g); if (!a.length) return ""; return `<h3 class="vh">${lab} <span class="sub">(${a.length})</span></h3><ul class="vlist">${a.map(e => `<li><div class="vw"><button type="button" class="vlink" data-voc="dict" data-w="${escH(e.w)}" lang="en">${escH(e.w)}</button>${e.p ? `<span class="ipa" lang="en">/${escH(e.p)}/</span>` : ""}<button class="dsay sm" type="button" data-dict="say" data-w="${escH(e.w)}" data-lang="en-GB" aria-label="Listen: ${escH(e.w)}">🔊</button></div><div class="des" lang="es">${escH(e.es)}</div>${e.e ? `<div class="dex" lang="en">${escH(e.e)}</div>` : ""}</li>`).join("")}</ul>`; }).join("");
  }
  function sbHTML(v) {
    const q = v.sb;
    if (!q || q.lv !== v.lv) return `<div class="card"><h2>Build the sentence · Ordena la oración</h2><p>Read the sentence in Spanish, then put the English words in the right order. Each sentence uses a ${escH(v.lv)} word. Ten sentences per set.</p><p class="sub">Lee la oración en español y ordena las palabras en inglés.</p><button class="btn primary" type="button" data-voc="sb-new">Start 10 sentences · Empezar</button></div>`;
    const it = q.items[q.k];
    if (!it) { const sc = q.items.filter(tokOK).length; return `<div class="card"><h2>Build the sentence · ${escH(v.lv)}</h2>${fb(sc, q.items.length, v.lv, "sb")}<ol class="vrev">${q.items.map(x => `<li class="${tokOK(x) ? "ok" : "no"}"><span lang="en">${escH(full(x))}</span><br><span class="sub" lang="es">${escH(x.xs || "")}</span>${tokOK(x) ? " ✓" : ` <span class="sub">· you wrote: ${escH(x.picked.map(k => x.toks[k]).join(" ") || "–")}</span>`}</li>`).join("")}</ol><button class="btn primary" type="button" data-voc="sb-new">New set · Nueva serie</button></div>`; }
    const ok = it.done ? tokOK(it) : null;
    return `<div class="card"><div class="row" style="justify-content:space-between"><h2>Build the sentence · ${escH(v.lv)}</h2><span class="sub">${q.k + 1} / ${q.items.length}</span></div>
      <div class="vxs"><span class="vxl">In Spanish · En español</span><span lang="es">${escH(it.xs || "")}</span></div><p class="sub">Key word · Palabra clave: <b lang="en">${escH(it.w)}</b> = <span lang="es">${escH(it.es)}</span></p>
      <div class="vans" aria-label="Your sentence">${it.picked.map((k, j) => `<button type="button" class="vtile on" data-voc="sb-un" data-j="${j}" ${it.done ? "disabled" : ""} lang="en">${escH(it.toks[k])}</button>`).join("")}${it.picked.length ? `<span class="vend">${escH(it.end)}</span>` : `<span class="sub">Tap the words below in order · Toca las palabras en orden</span>`}</div>
      <div class="vbank">${it.order.map(k => it.picked.includes(k) ? `<span class="vtile gone">${escH(it.toks[k])}</span>` : `<button type="button" class="vtile" data-voc="sb-pick" data-k="${k}" ${it.done ? "disabled" : ""} lang="en">${escH(it.toks[k])}</button>`).join("")}</div>
      ${it.done ? `<div class="vfb ${ok ? "ok" : "no"}">${ok ? "Correct! · ¡Correcto!" : `Not quite. · Casi. Correct answer: <b lang="en">${escH(full(it))}</b>`} <button class="dsay sm" type="button" data-dict="say" data-w="${escH(full(it))}" data-lang="en-GB" aria-label="Listen to the sentence">🔊</button></div>` : ""}
      <div class="row">${it.done ? `<button class="btn primary" type="button" data-voc="sb-next">${q.k + 1 < q.items.length ? "Next · Siguiente" : "See my score · Ver resultado"}</button>` : `<button class="btn" type="button" data-voc="sb-clear">Clear · Borrar</button><button class="btn primary" type="button" data-voc="sb-check" ${it.picked.length === it.toks.length ? "" : "disabled"}>Check · Revisar</button>`}</div></div>`;
  }
  function wbHTML(v) {
    const q = v.wb;
    if (!q || q.lv !== v.lv) return `<div class="card"><h2>Word building · Formación de palabras</h2><p>Use the <b class="vroot">BLUE WORD</b> in capitals to form a word that fits the gap, like Cambridge Use of English Part 3. Ten sentences per set.</p><p class="sub">Usa la palabra <b class="vroot">AZUL</b> en mayúsculas para formar la palabra correcta.</p><button class="btn primary" type="button" data-voc="wb-new">Start 10 sentences · Empezar</button></div>`;
    const sc = q.done ? q.items.filter(wbOK).length : 0;
    return `<div class="card"><h2>Word building · ${escH(v.lv)}</h2>${q.items.map((x, i) => { const ok = q.done ? wbOK(x) : null; const [a, b] = x.s.split("_____"); return `<div class="fq"><div class="stem"><span class="qn">${i + 1}</span> <span lang="en">${escH(a)}<input class="gap ${q.done ? (ok ? "ok" : "no") : ""}" data-voc-wb="${i}" value="${escH(x.v)}" aria-label="Gap ${i + 1}" autocomplete="off" autocapitalize="none" spellcheck="false" style="width:9em" ${q.done ? "disabled" : ""}>${escH(b)}</span> <b class="vroot">${escH(x.root)}</b>${q.done && !ok ? ` <span class="fix">${escH(x.a.join(" / "))}</span>` : ""}</div></div>`; }).join("")}
      ${q.done ? fb(sc, q.items.length, v.lv, "wb") + `<div class="row"><button class="btn primary" type="button" data-voc="wb-new">New set · Nueva serie</button></div>` : `<div class="row"><button class="btn primary" type="button" data-voc="wb-check">Check answers · Revisar</button></div>`}</div>`;
  }
  /* ===================== game-style path & lessons ===================== */
  const UNIT = 8, GOAL = 20, HEARTS = 5;
  const GORD = ["noun", "verb", "adjective", "adverb", "phrase", "other"];
  const GNAME = { noun: "Things & people", verb: "Actions", adjective: "Describing", adverb: "How & when", phrase: "Phrases", other: "More words" };
  const GNAME_ES = { noun: "Cosas y personas", verb: "Acciones", adjective: "Describir", adverb: "Cómo y cuándo", phrase: "Frases", other: "Más palabras" };
  const unitCache = {};
  function units(lv) {
    if (unitCache[lv]) return unitCache[lv];
    const out = [];
    GORD.forEach(g => {
      const ws = E.filter(e => inLv(e, lv) && grp(e.t) === g).sort((a, b) => a.w.localeCompare(b.w));
      const n = Math.ceil(ws.length / UNIT);
      for (let k = 0; k < n; k++) {
        const part = ws.slice(Math.round(k * ws.length / n), Math.round((k + 1) * ws.length / n));
        out.push({ g, k: k + 1, n, words: part });
      }
    });
    return (unitCache[lv] = out);
  }
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const yesterday = () => { const d = new Date(Date.now() - 864e5); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  function G() {
    const v = V(); v.xp = v.xp || 0; v.units = v.units || {}; v.seen = v.seen || []; v.miss = v.miss || [];
    v.streak = v.streak || { n: 0, last: "" }; if (v.snd === undefined) v.snd = true;
    if (!v.day || v.day.d !== today()) v.day = { d: today(), xp: 0 };
    if (v.streak.last && v.streak.last !== today() && v.streak.last !== yesterday()) v.streak.n = 0;
    v.tab = v.tab || "path"; return v;
  }
  const unitDone = (v, lv, i) => ((v.units[lv] || {})[i] || {}).c || 0;
  const canSpeak = () => !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  function speak(t) { try { const ss = speechSynthesis; ss.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "en-GB"; u.rate = .9; const vv = (ss.getVoices() || []).find(x => /^en[-_]GB/i.test(x.lang || "")); if (vv) u.voice = vv; ss.speak(u); } catch (e) { } }
  let actx = null;
  function beep(ok) {
    const v = V(); if (v.snd === false) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const t0 = actx.currentTime;
      (ok ? [[660, 0], [880, .09]] : [[220, 0], [180, .12]]).forEach(([f, d]) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = ok ? "sine" : "square"; o.frequency.value = f; g.gain.setValueAtTime(.0001, t0 + d); g.gain.exponentialRampToValueAtTime(ok ? .18 : .06, t0 + d + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + d + .16); o.connect(g); g.connect(actx.destination); o.start(t0 + d); o.stop(t0 + d + .18); });
    } catch (e) { }
  }
  const pick = (arr, n, not) => shuffle(arr.filter(x => !not || !not(x))).slice(0, n);
  const short = es => String(es || "").split(/,\s*/)[0];
  function distract(e, field, n) {
    const same = E.filter(x => x.c === e.c && x !== e && grp(x.t) === grp(e.t));
    const pool = same.length >= n + 2 ? same : E.filter(x => x.c === e.c && x !== e);
    const seen = new Set([field === "es" ? short(e.es).toLowerCase() : e.w.toLowerCase()]); const out = [];
    for (const x of shuffle(pool)) { const val = field === "es" ? short(x.es) : x.w; if (seen.has(val.toLowerCase())) continue; seen.add(val.toLowerCase()); out.push(val); if (out.length === n) break; }
    return out;
  }
  function buildLesson(lv, ui) {
    const v = G(); const U = units(lv)[ui]; const W = shuffle(U.words); const steps = [];
    const types = canSpeak() ? ["mean", "rev", "listen"] : ["mean", "rev"];
    W.forEach((e, j) => {
      if (!v.seen.includes(e.i)) steps.push({ k: "intro", e });
      const k = types[j % types.length];
      const opts = k === "mean" ? shuffle([short(e.es), ...distract(e, "es", 3)]) : shuffle([e.w, ...distract(e, "w", 3)]);
      steps.push({ k, e, opts, ans: k === "mean" ? short(e.es) : e.w });
    });
    if (W.length >= 3) steps.push({ k: "match", pairs: pick(W, Math.min(5, W.length)).map(e => ({ en: e.w, es: short(e.es), i: e.i })) });
    pick(W, 2, e => !(e.e && e.xs && e.e.split(" ").length >= 4 && e.e.split(" ").length <= 12)).forEach(e => steps.push({ k: "build", e, it: mkSb(e) }));
    const wb = WB.filter(x => x[0] === wbLv(lv)); if (wb.length) { const x = wb[Math.floor(Math.random() * wb.length)]; steps.push({ k: "wb", q: { s: x[1], root: x[2], a: x[3].split("/"), v: "" } }); }
    // keep intros right before their first question
    return { lv, ui, steps, i: 0, hearts: HEARTS, right: 0, asked: 0, xp: 0, sel: null, state: "ask", t0: Date.now(), redo: new Set() };
  }
  function mkSb(e) {
    let s = e.e.trim(); const end = /[.!?]$/.test(s) ? s.slice(-1) : "."; if (/[.!?]$/.test(s)) s = s.slice(0, -1);
    const toks = s.split(/\s+/); const t0 = toks[0]; if (t0 !== "I" && /^[A-Z][a-z']*$/.test(t0) && COMMON.has(t0.toLowerCase())) toks[0] = t0.toLowerCase();
    return { i: e.i, w: e.w, es: e.es, xs: e.xs, toks, end, order: shuffle(toks.map((_, k) => k)), picked: [], done: false };
  }
  let L = null; // active lesson (kept in memory)
  const cur = () => L && L.steps[L.i];
  function isRight(st) {
    if (st.k === "mean" || st.k === "rev" || st.k === "listen") return st.sel === st.ans;
    if (st.k === "build") return tokOK(st.it);
    if (st.k === "wb") return wbOK(st.q);
    return true;
  }
  function canCheck(st) {
    if (!st) return false;
    if (["mean", "rev", "listen"].includes(st.k)) return st.sel != null;
    if (st.k === "build") return st.it.picked.length === st.it.toks.length;
    if (st.k === "wb") return String(st.q.v || "").trim().length > 0;
    return false;
  }
  function check() {
    const st = cur(); if (!st || L.state !== "ask" || !canCheck(st)) return;
    const ok = isRight(st); L.state = ok ? "right" : "wrong"; L.asked++;
    if (ok) { if (!st.retry) { L.right++; L.xp += 1; } }
    else { L.hearts--; if (!st.retry) { const c = Object.assign({}, st, { retry: true, sel: null }); if (c.k === "build") c.it = Object.assign({}, st.it, { picked: [], order: shuffle(st.it.order) }); if (c.k === "wb") c.q = Object.assign({}, st.q, { v: "" }); L.steps.push(c); } const id = st.e ? st.e.i : null; const v = G(); if (id != null && !v.miss.includes(id)) { v.miss.push(id); if (v.miss.length > 60) v.miss.shift(); } }
    beep(ok); if (ok && st.e && canSpeak() && st.k !== "listen") speak(st.k === "build" ? full(st.it) : st.e.w);
    draw();
  }
  function next() {
    const st = cur(); const v = G();
    if (st && st.k === "intro") { if (!v.seen.includes(st.e.i)) v.seen.push(st.e.i); }
    if (L.hearts <= 0) { L.state = "fail"; draw(); return; }
    L.i++; L.state = "ask";
    if (L.i >= L.steps.length) finish(); else { const n = cur(); if (n && (n.k === "listen" || n.k === "intro")) setTimeout(() => speak(n.e.w), 250); }
    store(); draw();
  }
  function finish() {
    const v = G(); L.state = "done";
    const bonus = 5 + (L.hearts === HEARTS ? 5 : 0); L.xp += bonus; L.bonus = bonus;
    v.xp += L.xp; v.day.xp += L.xp;
    if (v.streak.last !== today()) { v.streak.n = v.streak.last === yesterday() ? v.streak.n + 1 : 1; v.streak.last = today(); }
    const u = (v.units[L.lv] = v.units[L.lv] || {}); const r = u[L.ui] = u[L.ui] || { c: 0 }; r.c = Math.min(3, (r.c || 0) + 1); r.best = Math.max(r.best || 0, Math.round(100 * L.right / Math.max(1, L.asked))); r.at = Date.now();
    L.steps.forEach(s => { if (s.e && !v.seen.includes(s.e.i)) v.seen.push(s.e.i); });
    store();
  }
  function startLesson(lv, ui) { L = buildLesson(lv, ui); const n = cur(); if (n && (n.k === "listen" || n.k === "intro")) setTimeout(() => speak(n.e.w), 300); draw(); window.scrollTo(0, 0); }

  /* ---------- markup ---------- */
  function statsBar(v) {
    const pct = Math.min(100, Math.round(100 * v.day.xp / GOAL));
    return `<div class="gbar"><span class="gstat" title="Day streak · Racha"><b class="gfire">🔥</b> ${v.streak.n}</span><span class="gstat" title="Total XP"><b class="gxp">⚡</b> ${v.xp} XP</span><span class="ggoal" title="Daily goal · Meta diaria"><span class="sub">Today · Hoy ${v.day.xp}/${GOAL} XP</span><span class="gmeter"><i style="width:${pct}%"></i></span></span><button class="gsnd" type="button" data-voc="snd" aria-pressed="${v.snd !== false}" title="Sound effects">${v.snd !== false ? "🔔" : "🔕"}</button></div>`;
  }
  function pathHTML(v) {
    const U = units(v.lv); const firstOpen = U.findIndex((_, i) => !unitDone(v, v.lv, i)); const cur = firstOpen < 0 ? U.length : firstOpen;
    const offs = [0, 46, 70, 46, 0, -46, -70, -46];
    let lastG = "";
    return `<div class="gpath">${U.map((u, i) => {
      const c = unitDone(v, v.lv, i), st = c ? "done" : i === cur ? "now" : "lock";
      const head = u.g !== lastG ? `<div class="gsec"><b>${GNAME[u.g]}</b> <span class="sub">· ${GNAME_ES[u.g]}</span></div>` : ""; lastG = u.g;
      return `${head}<div class="gnode-wrap ${st}" style="--x:${offs[i % offs.length]}px">${st === "now" ? `<span class="gstart">START · EMPEZAR</span>` : ""}<button type="button" class="gnode ${st}" data-voc="unit" data-u="${i}" aria-label="Unit ${i + 1}: ${escH(u.words.map(w => w.w).join(", "))}${st === "lock" ? " (locked)" : ""}">${st === "done" ? "★" : st === "now" ? "▶" : "🔒"}</button><div class="glab"><b>Unit ${i + 1}</b>${c ? ` <span class="gcrowns">${"★".repeat(c)}${"☆".repeat(3 - c)}</span>` : ""}<span class="sub">${escH(u.words.slice(0, 4).map(w => w.w).join(", "))}${u.words.length > 4 ? "…" : ""}</span></div></div>`;
    }).join("")}<div class="gend">${cur >= U.length ? `🏆 You finished every ${v.lv} unit! Try the next level. · ¡Terminaste todas las unidades de ${v.lv}!` : `${U.length - cur} units left in ${v.lv} · Te faltan ${U.length - cur} unidades`}</div></div>`;
  }
  function optBtns(st, lang) {
    return `<div class="gopts">${st.opts.map((o, j) => `<button type="button" class="gopt${st.sel === o ? " sel" : ""}${L.state !== "ask" && o === st.ans ? " good" : ""}${L.state === "wrong" && st.sel === o ? " badc" : ""}" data-voc="opt" data-v="${escH(o)}" ${L.state !== "ask" ? "disabled" : ""} lang="${lang}"><span class="gk">${j + 1}</span>${escH(o)}</button>`).join("")}</div>`;
  }
  function stepHTML(st) {
    if (st.k === "intro") { const e = st.e; return `<div class="gq"><span class="gtag">NEW WORD · PALABRA NUEVA</span><div class="gcard"><div class="gword" lang="en">${escH(e.w)} <button class="gspk" type="button" data-voc="say" data-w="${escH(e.w)}" aria-label="Listen">🔊</button></div>${e.p ? `<div class="ipa">/${escH(e.p)}/</div>` : ""}<div class="ges" lang="es">${escH(e.es)}</div>${e.e ? `<div class="gex" lang="en">${escH(e.e)}</div>${e.xs ? `<div class="sub" lang="es">${escH(e.xs)}</div>` : ""}` : ""}<span class="lvl ${e.c}">${e.c}</span></div></div>`; }
    if (st.k === "mean") return `<div class="gq"><h2>What does this mean? <span class="sub">· ¿Qué significa?</span></h2><div class="gprompt" lang="en"><button class="gspk" type="button" data-voc="say" data-w="${escH(st.e.w)}" aria-label="Listen">🔊</button> ${escH(st.e.w)}</div>${optBtns(st, "es")}</div>`;
    if (st.k === "rev") return `<div class="gq"><h2>How do you say this in English? <span class="sub">· ¿Cómo se dice en inglés?</span></h2><div class="gprompt" lang="es">${escH(short(st.e.es))}</div>${optBtns(st, "en")}</div>`;
    if (st.k === "listen") return `<div class="gq"><h2>Tap what you hear <span class="sub">· Toca lo que escuchas</span></h2><div class="glisten"><button class="gbig" type="button" data-voc="say" data-w="${escH(st.e.w)}" aria-label="Play the word again">🔊</button><button class="gslow" type="button" data-voc="say-slow" data-w="${escH(st.e.w)}" aria-label="Play slowly">🐢</button></div>${optBtns(st, "en")}</div>`;
    if (st.k === "match") { const en = st.enOrd || (st.enOrd = shuffle(st.pairs.map(p => p.en))); const es = st.esOrd || (st.esOrd = shuffle(st.pairs.map(p => p.es))); st.done = st.done || []; const col = (arr, side) => arr.map(x => { const p = st.pairs.find(p => p[side] === x); const done = st.done.includes(p.en); return `<button type="button" class="gmt${done ? " ok" : ""}${st.pick && st.pick.side === side && st.pick.v === x ? " sel" : ""}${st.bad && st.bad.includes(x) ? " badc" : ""}" data-voc="mt" data-side="${side}" data-v="${escH(x)}" ${done ? "disabled" : ""} lang="${side}">${escH(x)}</button>`; }).join(""); return `<div class="gq"><h2>Match the pairs <span class="sub">· Une las parejas</span></h2><div class="gmatch"><div>${col(en, "en")}</div><div>${col(es, "es")}</div></div></div>`; }
    if (st.k === "build") { const it = st.it; return `<div class="gq"><h2>Write this in English <span class="sub">· Escríbelo en inglés</span></h2><div class="vxs"><span class="vxl">Spanish · Español</span><span lang="es">${escH(it.xs || "")}</span></div><div class="vans">${it.picked.map((k, j) => `<button type="button" class="vtile on" data-voc="g-un" data-j="${j}" ${L.state !== "ask" ? "disabled" : ""} lang="en">${escH(it.toks[k])}</button>`).join("")}${it.picked.length ? `<span class="vend">${escH(it.end)}</span>` : `<span class="sub">Tap the words · Toca las palabras</span>`}</div><div class="vbank">${it.order.map(k => it.picked.includes(k) ? "" : `<button type="button" class="vtile" data-voc="g-pick" data-k="${k}" ${L.state !== "ask" ? "disabled" : ""} lang="en">${escH(it.toks[k])}</button>`).join("")}</div></div>`; }
    if (st.k === "wb") { const [a, b] = st.q.s.split("_____"); return `<div class="gq"><h2>Change the blue word to fit the gap <span class="sub">· Cambia la palabra azul</span></h2><div class="gprompt sm" lang="en">${escH(a)}<input class="gap" id="g-wb" value="${escH(st.q.v)}" data-voc-g="wb" aria-label="Your answer" autocomplete="off" autocapitalize="none" spellcheck="false" style="width:9em" ${L.state !== "ask" ? "disabled" : ""}>${escH(b)} <b class="vroot">${escH(st.q.root)}</b></div></div>`; }
    return "";
  }
  function answerText(st) {
    if (st.k === "build") return full(st.it);
    if (st.k === "wb") return st.q.a.join(" / ");
    if (st.k === "mean") return `${st.ans}`;
    return st.ans || "";
  }
  const PRAISE = ["Excellent! · ¡Excelente!", "Great job! · ¡Muy bien!", "Correct! · ¡Correcto!", "Amazing! · ¡Increíble!", "Well done! · ¡Bien hecho!"];
  function lessonHTML(v) {
    const st = cur();
    const prog = Math.round(100 * Math.min(L.i, L.steps.length) / L.steps.length);
    const top = `<div class="gtop"><button class="gx" type="button" data-voc="quit" aria-label="Quit lesson">✕</button><div class="gprog" role="progressbar" aria-valuenow="${prog}" aria-valuemin="0" aria-valuemax="100"><i style="width:${prog}%"></i></div><span class="ghearts" aria-label="${L.hearts} hearts left">❤️ ${L.hearts}</span></div>`;
    if (L.state === "fail") return `<div class="glesson">${top}<div class="gend-card"><div class="gbigemoji">💔</div><h2>Out of hearts · Sin vidas</h2><p>You made ${HEARTS} mistakes in this lesson. Review the words and try again. · Repasa las palabras e inténtalo de nuevo.</p><div class="gfoot-btns"><button class="gbtn" type="button" data-voc="quit">Back · Volver</button><button class="gbtn go" type="button" data-voc="retry">Try again · Reintentar</button></div></div></div>`;
    if (L.state === "done") {
      const acc = Math.round(100 * L.right / Math.max(1, L.asked)); const mins = Math.max(1, Math.round((Date.now() - L.t0) / 60000));
      const msg = acc >= 90 ? "Outstanding! You know these words. · ¡Sobresaliente!" : acc >= 70 ? "Great work! A little more practice and you'll master them. · ¡Buen trabajo!" : "Good effort! Do this unit again to make the words stick. · ¡Buen esfuerzo! Repite esta unidad.";
      return `<div class="glesson"><div class="gend-card"><div class="gbigemoji">🎉</div><h2>Lesson complete! · ¡Lección completada!</h2><p>${msg}</p><div class="gtiles"><div class="gtile xp"><span>Total XP</span><b>⚡ ${L.xp}</b>${L.bonus > 5 ? `<em>+5 no-mistake bonus</em>` : ""}</div><div class="gtile acc"><span>Accuracy · Precisión</span><b>🎯 ${acc}%</b></div><div class="gtile st"><span>Streak · Racha</span><b>🔥 ${v.streak.n}</b></div><div class="gtile tm"><span>Time · Tiempo</span><b>⏱ ${mins} min</b></div></div><div class="gfoot-btns"><button class="gbtn go" type="button" data-voc="quit">Continue · Continuar</button></div></div></div>`;
    }
    let foot;
    if (L.state === "ask") foot = `<div class="gfoot"><div class="gfoot-in">${st.k === "intro" ? `<span></span><button class="gbtn go" type="button" data-voc="next">Got it · Entendido</button>` : st.k === "match" ? `<span class="sub">Tap an English word, then its Spanish pair · Toca una palabra y su pareja</span><span></span>` : `<button class="gbtn ghost" type="button" data-voc="skip">Skip · Saltar</button><button class="gbtn go" type="button" data-voc="check" ${canCheck(st) ? "" : "disabled"}>Check · Revisar</button>`}</div></div>`;
    else { const ok = L.state === "right"; foot = `<div class="gfoot ${ok ? "ok" : "no"}" role="status"><div class="gfoot-in"><div class="gfb"><b>${ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : "Correct answer · Respuesta correcta:"}</b>${ok ? (st.e && st.k !== "match" ? `<span lang="en">${escH(st.k === "build" ? full(st.it) : st.e.w)} = <span lang="es">${escH(short(st.e.es))}</span></span>` : "") : `<span>${escH(answerText(st))}</span>`}</div><button class="gbtn ${ok ? "go" : "red"}" type="button" data-voc="next">Continue · Continuar</button></div></div>`; }
    return `<div class="glesson">${top}${stepHTML(st)}${foot}</div>`;
  }
  function wordsTabHTML(v) { return `<div class="card">${listHTML(v.lv)}</div>`; }
  function practiceTabHTML(v) {
    const mode = v.mode === "wb" ? "wb" : "sb";
    return `<div class="seg sm" role="group" aria-label="Practice type" style="margin-bottom:12px">${[["sb", "Build the sentence · Ordena"], ["wb", "Word building · Forma palabras"]].map(([k, l]) => `<button class="chip" type="button" data-voc="mode" data-v="${k}" aria-pressed="${mode === k}">${l}</button>`).join("")}</div>${mode === "sb" ? sbHTML(v) : wbHTML(v)}`;
  }
  /* ===================== end game-style block ===================== */
  function html() {
    const v = G(); if (!ALW().includes(v.lv)) v.lv = ALW()[0];
    if (L) return lessonHTML(v);
    const counts = Object.fromEntries(LV.map(l => [l, E.filter(e => inLv(e, l)).length]));
    const U = units(v.lv), done = U.filter((_, i) => unitDone(v, v.lv, i)).length;
    return `<div class="head"><h1>Vocabulary</h1><span class="sub">Vocabulario · A1 to C2 + B2 First</span></div>${statsBar(v)}
      <div class="seg" role="group" aria-label="Level">${ALW().map(l => { const u = units(l), d = u.filter((_, i) => unitDone(v, l, i)).length; return `<button class="chip" type="button" data-voc="lv" data-v="${l}" aria-pressed="${v.lv === l}"><span class="lvl ${l}">${l}</span> <span class="sub">${d}/${u.length}</span></button>`; }).join("")}</div>
      <div class="gtabs" role="tablist">${[["path", "🗺️", "Learn", "Aprender"], ["words", "📖", "Words", "Palabras"], ["practice", "🏋️", "Practice", "Practicar"]].map(([k, ic, l, es]) => `<button role="tab" type="button" class="gtab" data-voc="tab" data-v="${k}" aria-selected="${v.tab === k}"><span>${ic} ${l}</span><small>${es}</small></button>`).join("")}</div>
      ${v.tab === "path" ? `<p class="sub gintro">${done}/${U.length} units done in ${v.lv} · ${counts[v.lv]} words. Each lesson takes about 3 minutes. · Cada lección dura unos 3 minutos.</p>${pathHTML(v)}` : v.tab === "words" ? wordsTabHTML(v) : practiceTabHTML(v)}`;
  }
  function draw() { const s = document.getElementById("v-vocab"); if (!s) return; s.innerHTML = html(); const g = document.getElementById("g-wb"); if (g && !g.disabled) { g.focus(); g.setSelectionRange(g.value.length, g.value.length); } }

  /* ---------- events ---------- */
  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-voc]"); if (!b) return; const a = b.dataset.voc; const v = V();
    if (a === "lv" && ALW().includes(b.dataset.v)) { v.lv = b.dataset.v; }
    else if (a === "mode") { v.mode = b.dataset.v; }
    else if (a === "tab") { v.tab = b.dataset.v; }
    else if (a === "snd") { v.snd = v.snd === false; }
    else if (a === "unit") { const ui = +b.dataset.u; const U = units(v.lv); const first = U.findIndex((_, i) => !unitDone(v, v.lv, i)); if (ui > (first < 0 ? U.length : first)) { toast("Finish the unit before this one first. · Primero termina la unidad anterior."); return; } startLesson(v.lv, ui); return; }
    else if (a === "say") { speak(b.dataset.w); return; }
    else if (a === "say-slow") { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(b.dataset.w); u.lang = "en-GB"; u.rate = .55; speechSynthesis.speak(u); } catch (e) { } return; }
    else if (a === "opt") { const st = cur(); if (st && L.state === "ask") { st.sel = b.dataset.v; draw(); } return; }
    else if (a === "check") { check(); return; }
    else if (a === "skip") { const st = cur(); if (st && L.state === "ask") { if (st.k === "build") st.it.picked = []; st.sel = "\u0000"; if (st.k === "wb") st.q.v = "\u0000"; L.state = "ask"; const ok = false; L.state = "wrong"; L.asked++; L.hearts--; if (!st.retry) { const c = Object.assign({}, st, { retry: true, sel: null }); if (c.k === "build") c.it = Object.assign({}, st.it, { picked: [], order: shuffle(st.it.order) }); if (c.k === "wb") c.q = Object.assign({}, st.q, { v: "" }); L.steps.push(c); } beep(ok); draw(); } return; }
    else if (a === "next") { next(); return; }
    else if (a === "quit") { L = null; try { speechSynthesis.cancel(); } catch (e) { } }
    else if (a === "retry") { startLesson(L.lv, L.ui); return; }
    else if (a === "g-pick") { const st = cur(); if (st && L.state === "ask") { st.it.picked.push(+b.dataset.k); draw(); } return; }
    else if (a === "g-un") { const st = cur(); if (st && L.state === "ask") { st.it.picked.splice(+b.dataset.j, 1); draw(); } return; }
    else if (a === "mt") { const st = cur(); if (!st || L.state !== "ask") return; const side = b.dataset.side, val = b.dataset.v; st.bad = null;
      if (!st.pick || st.pick.side === side) { st.pick = { side, v: val }; if (side === "en") speak(val); draw(); return; }
      const en = side === "en" ? val : st.pick.v, es = side === "es" ? val : st.pick.v; const p = st.pairs.find(p => p.en === en);
      if (p && p.es === es) { st.done.push(en); st.pick = null; beep(true); if (st.done.length === st.pairs.length) { L.state = "right"; L.asked++; L.right++; L.xp += 1; } }
      else { st.bad = [en, es]; st.pick = null; beep(false); st.miss = (st.miss || 0) + 1; }
      draw(); return; }
    else if (a === "dict") { if (window.DICT) { DICT.search(b.dataset.w); if (VIEWS.some(x => x[0] === "dict")) location.hash = "dict"; } return; }
    else if (a === "sb-new") { v.sb = { lv: v.lv, k: 0, items: sbItems(v.lv) }; }
    else if (a === "sb-pick") { const it = v.sb.items[v.sb.k]; it.picked.push(+b.dataset.k); }
    else if (a === "sb-un") { const it = v.sb.items[v.sb.k]; it.picked.splice(+b.dataset.j, 1); }
    else if (a === "sb-clear") { v.sb.items[v.sb.k].picked = []; }
    else if (a === "sb-check") { v.sb.items[v.sb.k].done = true; }
    else if (a === "sb-next") { v.sb.k++; if (v.sb.k >= v.sb.items.length) { const sc = v.sb.items.filter(tokOK).length; const bb = v.best[v.lv] = v.best[v.lv] || {}; if (!bb.sb || sc >= bb.sb[0]) bb.sb = [sc, v.sb.items.length, Date.now()]; } }
    else if (a === "wb-new") { v.wb = { lv: v.lv, items: wbItems(v.lv), done: false }; }
    else if (a === "wb-check") { v.wb.done = true; const sc = v.wb.items.filter(wbOK).length; const bb = v.best[v.lv] = v.best[v.lv] || {}; if (!bb.wb || sc >= bb.wb[0]) bb.wb = [sc, v.wb.items.length, Date.now()]; }
    else return;
    store(); draw();
    if (/^(sb|wb)-(new|next|check)$/.test(a)) { const c = document.querySelector("#v-vocab .card"); if (c && c.getBoundingClientRect().top < 0) c.scrollIntoView({ block: "start" }); }
  });
  document.addEventListener("input", ev => { const i = ev.target; if (i.dataset && i.dataset.vocG === "wb") { const st = cur(); if (st && st.k === "wb") { st.q.v = i.value; const c = document.querySelector('[data-voc="check"]'); if (c) c.disabled = !canCheck(st); } } });
  document.addEventListener("keydown", ev => {
    if (!L || !document.getElementById("v-vocab") || !document.getElementById("v-vocab").classList.contains("on")) return;
    const st = cur(); if (!st) return;
    if (ev.key === "Enter") { ev.preventDefault(); if (L.state === "ask") { if (st.k === "intro") next(); else check(); } else if (L.state === "right" || L.state === "wrong") next(); return; }
    if (L.state === "ask" && st.opts && /^[1-4]$/.test(ev.key) && !(ev.target && ev.target.tagName === "INPUT")) { st.sel = st.opts[+ev.key - 1]; draw(); }
  });
  function toast(t) { let el = document.getElementById("g-toast"); if (!el) { el = document.createElement("div"); el.id = "g-toast"; el.setAttribute("role", "status"); document.body.appendChild(el); } el.textContent = t; el.className = "on"; clearTimeout(toast.t); toast.t = setTimeout(() => { el.className = ""; }, 2600); }
  document.addEventListener("input", ev => { const i = ev.target; if (!i.dataset || i.dataset.vocWb === undefined) return; const v = V(); if (v.wb && v.wb.items[+i.dataset.vocWb]) { v.wb.items[+i.dataset.vocWb].v = i.value; store(); } });

  /* ---------- styles ---------- */
  const st = document.createElement("style");
  st.textContent = `.lvl.FCE{background:#7b2cbf;color:#fff}.vh{margin:16px 0 6px}.vlist{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.vlist li{border:1px solid var(--line);border-radius:8px;padding:8px 10px;background:var(--surface);display:flex;flex-direction:column;gap:2px}
.vw{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.vlink{border:0;background:none;padding:0;font:inherit;font-family:var(--read);font-size:1.12rem;font-weight:700;color:var(--ink);cursor:pointer;text-align:left}.vlink:hover{text-decoration:underline}
.vw .ipa{font-size:.92rem;color:var(--muted)}.vlist .des{color:var(--muted)}.vlist .dex{font-size:.92rem}
.vans{min-height:56px;border:2px dashed var(--line);border-radius:10px;padding:8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:10px 0}
.vbank{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.vtile{border:1px solid var(--line);background:var(--surface);border-radius:8px;padding:8px 12px;min-height:42px;font:inherit;font-size:1.05rem;cursor:pointer}
.vtile.on{background:var(--accent-soft);border-color:var(--accent)}.vtile.gone{display:none}.vend{font-size:1.2rem;font-weight:700}
.vfb{border-radius:8px;padding:10px 12px;margin:10px 0}.vfb.ok{background:var(--good-soft);}.vfb.no{background:var(--warn-soft)}
.vrev{padding-left:22px}.vrev li{margin:6px 0}.vrev li.ok{color:var(--good)}.vroot{font-size:.95rem;letter-spacing:.04em;color:var(--accent);font-weight:800}
.vxs{background:var(--accent-soft);border-left:4px solid var(--accent);border-radius:8px;padding:10px 12px;margin:8px 0;font-size:1.1rem}.vxs .vxl{display:block;font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--accent);margin-bottom:2px}`;
  st.textContent += `
.gbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;background:var(--surface);border:2px solid var(--line);border-radius:16px;padding:10px 14px;margin:8px 0 12px}
.gstat{font-weight:800;font-size:1.1rem;display:inline-flex;gap:4px;align-items:center}.gfire{filter:saturate(1.3)}
.ggoal{display:flex;flex-direction:column;gap:3px;flex:1 1 160px;min-width:140px}.gmeter{height:12px;background:var(--sunken);border-radius:99px;overflow:hidden}.gmeter i{display:block;height:100%;background:linear-gradient(90deg,#ffb020,#ff8a00);border-radius:99px;transition:width .4s}
.gsnd{border:0;background:none;font-size:1.3rem;cursor:pointer;min-width:40px;min-height:40px}
.gtabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:12px 0;border-bottom:2px solid var(--line);overflow-x:auto}.gtab{display:flex;flex-direction:column;align-items:center;gap:1px;border:0;background:none;padding:8px 4px;font:inherit;font-weight:800;color:var(--muted);border-bottom:3px solid transparent;margin-bottom:-2px;cursor:pointer;white-space:nowrap}.gtab small{font-weight:600;font-size:.75rem}.gtab[aria-selected="true"]{color:var(--accent);border-bottom-color:var(--accent)}
.gintro{margin:4px 0 8px}
.gpath{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 0 30px}
.gsec{align-self:stretch;margin:18px 0 6px;padding:10px 14px;border-radius:14px;background:var(--accent);color:var(--accent-ink);font-size:1.02rem}.gsec .sub{color:inherit;opacity:.85}
.gnode-wrap.now{margin-top:40px}.gnode-wrap{position:relative;display:flex;flex-direction:column;align-items:center;transform:translateX(var(--x));margin:4px 0}
.gnode{width:76px;height:70px;border-radius:50%;border:0;font-size:1.7rem;font-weight:900;color:#fff;cursor:pointer;box-shadow:0 7px 0 rgba(0,0,0,.22);transition:transform .08s}
.gnode:active{transform:translateY(5px);box-shadow:0 2px 0 rgba(0,0,0,.22)}
.gnode.done{background:linear-gradient(#ffc93c,#f2a900);color:#7a4b00}.gnode.now{background:linear-gradient(#5bd65b,#2fa62f);animation:gpulse 1.6s infinite}.gnode.lock{background:var(--sunken);color:var(--muted);box-shadow:0 7px 0 var(--line)}
@keyframes gpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@media (prefers-reduced-motion:reduce){.gnode.now{animation:none}}
.gstart{position:absolute;top:-34px;background:var(--surface);border:2px solid var(--line);border-radius:10px;padding:3px 10px;font-weight:900;font-size:.78rem;color:#2fa62f;white-space:nowrap;animation:gbob 1.4s infinite}
@keyframes gbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.glab{display:flex;flex-direction:column;align-items:center;margin-top:10px;max-width:200px;text-align:center}.glab .sub{font-size:.8rem}.gcrowns{color:#f2a900;letter-spacing:1px}
.gend{margin-top:14px;font-weight:700;text-align:center}
.glesson{max-width:640px;margin:0 auto;min-height:70vh;display:flex;flex-direction:column;padding-bottom:140px}
.gtop{display:flex;align-items:center;gap:12px;margin:6px 0 18px}.gx{border:0;background:none;font-size:1.4rem;color:var(--muted);cursor:pointer;min-width:40px;min-height:40px}
.gprog{flex:1;height:16px;background:var(--sunken);border-radius:99px;overflow:hidden}.gprog i{display:block;height:100%;background:linear-gradient(#6be06b,#2fa62f);border-radius:99px;transition:width .35s}
.ghearts{font-weight:900;color:#e5484d;white-space:nowrap}
.gq h2{font-size:1.45rem;margin:0 0 14px}.gq h2 .sub{font-size:1rem;font-weight:400}
.gprompt{font-family:var(--read);font-size:1.9rem;font-weight:700;border:2px solid var(--line);border-radius:16px;padding:16px 18px;margin-bottom:18px;background:var(--surface);display:flex;align-items:center;gap:10px;flex-wrap:wrap}.gprompt.sm{font-size:1.25rem;font-family:inherit;font-weight:500;display:block;line-height:2}
.gspk{border:0;background:var(--accent);color:#fff;border-radius:12px;min-width:46px;min-height:46px;font-size:1.3rem;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.gopts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:520px){.gopts{grid-template-columns:1fr}}
.gopt{position:relative;text-align:left;border:2px solid var(--line);border-bottom-width:5px;border-radius:14px;background:var(--surface);padding:14px 14px 14px 46px;min-height:58px;font:inherit;font-size:1.08rem;font-weight:600;cursor:pointer}
.gopt .gk{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:24px;height:24px;border:2px solid var(--line);border-radius:7px;font-size:.8rem;display:flex;align-items:center;justify-content:center;color:var(--muted)}
.gopt.sel{border-color:var(--accent);background:var(--accent-soft);color:var(--accent)}.gopt.good{border-color:#2fa62f;background:#dff7d6;color:#1d6b1d}.gopt.badc{border-color:#e5484d;background:#ffe1e1;color:#a01d22}
.glisten{display:flex;gap:12px;justify-content:center;margin:6px 0 20px}.gbig{width:110px;height:110px;border-radius:24px;border:0;background:var(--accent);color:#fff;font-size:3rem;cursor:pointer;box-shadow:0 7px 0 rgba(0,0,0,.25)}.gslow{width:64px;height:64px;align-self:flex-end;border-radius:18px;border:0;background:var(--accent-soft);font-size:1.8rem;cursor:pointer;box-shadow:0 5px 0 var(--line)}
.gmatch{display:grid;grid-template-columns:1fr 1fr;gap:10px}.gmatch>div{display:flex;flex-direction:column;gap:10px}
.gmt{border:2px solid var(--line);border-bottom-width:5px;border-radius:14px;background:var(--surface);min-height:56px;font:inherit;font-size:1.05rem;font-weight:600;cursor:pointer;padding:8px}
.gmt.sel{border-color:var(--accent);background:var(--accent-soft)}.gmt.ok{opacity:.35;border-color:#2fa62f;background:#dff7d6;cursor:default}.gmt.badc{border-color:#e5484d;background:#ffe1e1;animation:gshake .3s}
@keyframes gshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.gtag{display:inline-block;font-weight:900;font-size:.8rem;color:#a855f7;letter-spacing:.06em;margin-bottom:8px}
.gcard{border:2px solid var(--line);border-bottom-width:6px;border-radius:20px;padding:22px;background:var(--surface);display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.gword{font-family:var(--read);font-size:2.2rem;font-weight:800;display:flex;align-items:center;gap:12px}.ges{font-size:1.4rem;font-weight:700;color:var(--accent)}.gex{font-family:var(--read);font-style:italic;font-size:1.1rem}
.gfoot{position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--surface);border-top:2px solid var(--line);padding:16px clamp(16px,4vw,40px) calc(16px + env(safe-area-inset-bottom))}
.gfoot-in{max-width:640px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.gfoot.ok{background:#d7ffb8;border-top-color:#b6ef8f}.gfoot.no{background:#ffdfe0;border-top-color:#ffc1c1}
.gfb{display:flex;flex-direction:column;gap:2px;font-size:1.05rem}.gfoot.ok .gfb b{color:#1d6b1d;font-size:1.3rem}.gfoot.no .gfb b{color:#a01d22;font-size:1.15rem}.gfoot.no .gfb span{color:#a01d22;font-weight:600}.gfoot.ok .gfb span{color:#1d6b1d}
.gbtn{border:0;border-radius:14px;padding:12px 26px;min-height:50px;font:inherit;font-weight:900;font-size:1.02rem;letter-spacing:.02em;cursor:pointer;background:var(--surface);color:var(--muted);border:2px solid var(--line);border-bottom-width:5px}
.gbtn.go{background:#2fa62f;color:#fff;border-color:#1f7d1f}.gbtn.go:disabled{background:var(--sunken);color:var(--muted);border-color:var(--line);cursor:not-allowed}.gbtn.red{background:#e5484d;color:#fff;border-color:#b3262b}.gbtn.ghost{background:none}
.gbtn:active:not(:disabled){transform:translateY(3px);border-bottom-width:2px}
.gend-card{text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:20px}.gbigemoji{font-size:4.5rem;animation:gbob 1.2s infinite}
.gtiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;width:100%;margin:10px 0}
.gtile{border-radius:16px;border:2px solid;padding:4px 4px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;overflow:hidden}.gtile span{font-weight:900;font-size:.78rem;color:#fff;align-self:stretch;padding:4px;margin:-4px -4px 0}.gtile b{font-size:1.3rem}.gtile em{font-size:.75rem;color:var(--muted)}
.gtile.xp{border-color:#ffb020}.gtile.xp span{background:#ffb020}.gtile.acc{border-color:#2fa62f}.gtile.acc span{background:#2fa62f}.gtile.st{border-color:#ff7a00}.gtile.st span{background:#ff7a00}.gtile.tm{border-color:#1cb0f6}.gtile.tm span{background:#1cb0f6}
.gfoot-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px}
#g-toast{position:fixed;left:50%;bottom:90px;transform:translate(-50%,20px);background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:12px;opacity:0;pointer-events:none;transition:.25s;z-index:60;max-width:90vw;text-align:center}#g-toast.on{opacity:1;transform:translate(-50%,0)}`;
  document.head.appendChild(st);

  /* ---------- register the view ---------- */
  if (!VIEWS.some(v => v[0] === "vocab")) {
    const i = VIEWS.findIndex(v => v[0] === "dict");
    VIEWS.splice(i < 0 ? VIEWS.length : i, 0, ["vocab", "Vocab", '<path d="M4 6h7M4 12h7M4 18h7M15 5l2.5 6L20 5M14.5 19l3-8 3 8M15.6 16.5h3.8"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-vocab")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-vocab"; sec.setAttribute("aria-label", "Vocabulary"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "vocab") draw(); }; try { render(); } catch (e) { } }
  }
  window.VOCAB = { html, draw, L: () => L };
})();

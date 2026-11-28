/* Teacher Dario · Field & Machine English (English for specific purposes: farm machinery, tools, harvest, maintenance).
   2-year program for true beginners: 4 semesters × 6 units (A0 → A2). Each unit: scene photo, 20 picture words,
   8 expressions, grammar, reading + true/false, a task card (work instructions), a dialogue with the mic, writing, workbook.
   Data: farm-1..4.js · photos: farmimg-scenes.js + farmimg-s1..s4.js (lazy). State: S.farm. Course code: FARM. */
(function () {
  if (typeof VIEWS === "undefined") return;
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const POS = { n: ["noun", "sustantivo"], v: ["verb", "verbo"], adj: ["adjective", "adjetivo"], adv: ["adverb", "adverbio"], prep: ["preposition", "preposición"], num: ["number", "número"], exp: ["expression", "expresión"] };
  const STAGES = [
    { n: 1, lv: "A0", em: "🧤", en: "Starting work", es: "Empezando a trabajar", when: "Year 1 · Months 1–6 · Año 1 · Meses 1–6", c: "#e8590c" },
    { n: 2, lv: "A1", em: "🌾", en: "The farm and the fields", es: "La granja y los campos", when: "Year 1 · Months 7–12 · Año 1 · Meses 7–12", c: "#2f9e44" },
    { n: 3, lv: "A1–A2", em: "⚙️", en: "Machines and maintenance", es: "Máquinas y mantenimiento", when: "Year 2 · Months 13–18 · Año 2 · Meses 13–18", c: "#1c7ed6" },
    { n: 4, lv: "A2", em: "🛠️", en: "Repairs, safety and teamwork", es: "Reparaciones, seguridad y equipo", when: "Year 2 · Months 19–24 · Año 2 · Meses 19–24", c: "#7048e8" }];
  const U = [];
  const pend = (window.FARM && window.FARM._q) || [];
  function add(u) {
    const ui = U.length;
    U.push(Object.assign({}, u, { ui, w: u.w.map((s, i) => { const p = s.split("|"); return { key: `fm${ui}-${i}`, n: i + 1, w: p[0], pos: p[1], es: p[2], fig: p[3], m: p[4], e: p[5], xe: p[6], q: p[7] }; }),
      x: u.x.map(s => { const p = s.split("|"); return { en: p[0], es: p[1] }; }) }));
    later();
  }
  let rt = 0; const later = () => { clearTimeout(rt); rt = setTimeout(() => { try { if (curView() === "farm") draw(); } catch (e) { } }, 40); };
  const API = window.FARM = { add, list: U, stages: STAGES, refresh: () => later() };
  pend.forEach(add);

  /* ---------- helpers ---------- */
  const BASE = (() => { try { const c = document.currentScript && document.currentScript.src; return c ? c.replace(/[^/]*$/, "") : ""; } catch (e) { return ""; } })();
  const loaded = {};
  function need(file) { if (loaded[file]) return; loaded[file] = 1; const s = document.createElement("script"); s.src = BASE + file; s.async = true; s.onload = () => later(); s.onerror = () => { loaded[file] = 0; }; document.head.appendChild(s); }
  const img = k => (window.FM_IMG || {})[k];
  const credit = k => (window.FM_CREDIT || {})[k];
  const thumb = (k, em, big) => { const s = img(k); return s ? `<img src="${s}" alt="" loading="lazy" decoding="async">` : `<span class="pz-ph${big ? " big" : ""}" aria-hidden="true">${em}</span>`; };
  const ipa = w => { const L = window.LEX_IPA || {}; const p = String(w).toLowerCase().replace(/[^a-z' -]/g, "").split(/[\s-]+/).filter(Boolean); const r = p.map(x => L[x]); return r.length && r.every(Boolean) ? r.join(" ") : ""; };
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const shuf = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nrm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' -]/g, "").replace(/\s+/g, " ").trim();
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function findIn(text, w) {
    const forms = [w, w + "s", w + "es", w + "ed", w + "d", w.replace(/e$/, "") + "ing", w + "ing", w.replace(/y$/, "ies"), w.replace(/f$/, "ves"), w === "foot" ? "feet" : w];
    for (const f of forms) { const m = new RegExp("\\b" + reEsc(f) + "\\b", "i").exec(text); if (m) return [m.index, m[0]]; }
    return null;
  }
  function say(t, lang, rate) { try { const ss = speechSynthesis; ss.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = lang || "en-US"; u.rate = rate || .9; ss.speak(u); } catch (e) { } }
  const mic = (t, k) => window.SPEAK && SPEAK.micBtn ? SPEAK.micBtn(t, k) : "";
  const stageFile = ui => "farmimg-s" + (U[ui] ? U[ui].st : 1) + ".js";

  /* ---------- state ---------- */
  const st = () => { if (!S.farm) S.farm = {}; const p = S.farm; p.learned = p.learned || {}; p.best = p.best || {}; p.ans = p.ans || {}; p.done = p.done || {}; p.wr = p.wr || {}; p.tab = p.tab || "words"; return p; };
  const store = () => { try { save(); } catch (e) { } };
  const PARTS = [["words", "🖼️", "Words", "Palabras"], ["phrases", "💬", "Expressions", "Expresiones"], ["grammar", "🧩", "Grammar", "Gramática"], ["read", "📖", "Reading", "Lectura"], ["task", "🛠️", "Task card", "Tarea"], ["speak", "🎤", "Speaking", "Habla"], ["write", "✍️", "Writing", "Escritura"], ["book", "📝", "Workbook", "Cuaderno"]];
  const CHARM_PARTS = ["words", "phrases", "read", "task", "speak", "write", "book"];
  function unitDone(u, p) { const d = p.done[u.id] || {}; const r = {}; CHARM_PARTS.forEach(k => { r[k] = k === "book" ? (p.best[u.id] || 0) >= 70 : k === "words" ? (d.words || u.w.filter(x => p.learned[x.key]).length >= 15) : !!d[k]; }); return r; }
  API.progress = (stt) => { const p = Object.assign({ learned: {}, best: {}, done: {} }, (stt && stt.farm) || {}); return U.map(u => { const r = unitDone(u, p); return { id: u.id, en: u.en, parts: r, n: Object.values(r).filter(Boolean).length, best: p.best[u.id] || 0 }; }); };
  API.CHARM_PARTS = CHARM_PARTS;

  /* ---------- workbook (deterministic) ---------- */
  function work(ui) {
    const u = U[ui], r = rng(ui * 131 + 7), W = u.w;
    const pick = (arr, n) => shuf(arr, r).slice(0, n);
    const opts = (x, field) => shuf([x, ...pick(W.filter(y => y !== x && (y.pos === x.pos || W.filter(z => z.pos === x.pos).length < 4)), 3)], r).map(y => y[field]);
    const ex = [];
    ex.push({ k: "pic", t: ["Look and choose the word", "Mira y escoge la palabra"], items: pick(W, 6).map(x => ({ key: x.key, a: x.w, o: opts(x, "w") })) });
    ex.push({ k: "lis", t: ["Listen and choose", "Escucha y escoge"], items: pick(W, 6).map(x => ({ say: x.w, a: x.w, o: opts(x, "w") })) });
    ex.push({ k: "spell", t: ["Spell the word", "Escribe la palabra"], items: pick(W.filter(x => /^[a-z]+$/i.test(x.w) && x.w.length >= 3 && x.w.length <= 10), 6).map(x => { let s = shuf(x.w.toLowerCase().split(""), r).join(""); if (s === x.w.toLowerCase()) s = s.split("").reverse().join(""); return { key: x.key, es: x.es, sc: s, a: x.w }; }) });
    const gp = pick(W.filter(x => findIn(x.e, x.w)), 6);
    ex.push({ k: "gap", t: ["Complete the sentences with the word bank", "Completa las oraciones con el banco de palabras"], items: gp.map(x => { const f = findIn(x.e, x.w); return { pre: x.e.slice(0, f[0]), a: f[1], post: x.e.slice(f[0] + f[1].length), es: x.xe }; }) });
    ex[3].bank = shuf(ex[3].items.map(x => x.a.toLowerCase()), r);
    const xp = pick(u.x, 6);
    ex.push({ k: "expr", t: ["Match the expressions", "Relaciona las expresiones"], items: xp.map(x => ({ q: x.es, a: x.en, o: shuf([x.en, ...pick(u.x.filter(y => y !== x), 2).map(y => y.en)], r) })) });
    ex.push({ k: "tf", t: ["Read again: True or False", "Lee otra vez: verdadero o falso"], items: u.r.tf.map(q => ({ q: q[0], a: q[1] ? "T" : "F", o: ["T", "F"] })) });
    const order = shuf(u.task.steps.map((s, i) => i), r);
    ex.push({ k: "order", t: ["Put the task steps in order (1–6)", "Ordena los pasos de la tarea (1–6)"], items: order.map(i => ({ q: u.task.steps[i][0], es: u.task.steps[i][1], a: String(i + 1) })) });
    return ex;
  }
  const answerOf = (A, e, i) => (A[e + "." + i] || "");
  function exScore(E, A, ei) { const e = E[ei]; let ok = 0; e.items.forEach((x, i) => { const v = answerOf(A, ei, i); if (e.k === "spell" || e.k === "gap" ? nrm(v) === nrm(x.a) : v === x.a) ok++; }); return [ok, e.items.length]; }
  function pct(E, A) { let ok = 0, tot = 0; E.forEach((e, i) => { const [a, b] = exScore(E, A, i); ok += a; tot += b; }); return tot ? Math.round(100 * ok / tot) : 0; }

  /* ---------- views ---------- */
  function homeHTML(p) {
    need("farmimg-scenes.js");
    const prog = API.progress(S); const totP = prog.reduce((a, x) => a + x.n, 0), maxP = U.length * CHARM_PARTS.length; const unitsDone = prog.filter(x => x.n === CHARM_PARTS.length).length;
    let h = `<div class="fm-hero"><div class="fm-hi"><span class="fm-big">🚜</span><div><h1>Field & Machine English</h1><p>Inglés para el campo y la maquinaria</p><p class="fm-tag">2-year program · 24 units · from zero to A2 · Programa de 2 años · 24 unidades · desde cero hasta A2</p></div></div>
      <div class="fm-pg"><div class="fm-bar"><i style="width:${Math.round(100 * totP / maxP)}%"></i></div><span><b>${unitsDone}</b>/24 units complete · ${totP}/${maxP} parts · unidades completas</span></div></div>
      <details class="card fm-how"><summary>📌 How to study · Cómo estudiar</summary><ol>
        <li>One unit every 3–4 weeks. 20–30 minutes a day. · Una unidad cada 3–4 semanas. 20–30 minutos al día.</li>
        <li>Learn the words with pictures, listen and repeat out loud. · Aprende las palabras con imágenes, escucha y repite en voz alta.</li>
        <li>Practise the expressions and the dialogue with the microphone 🎤. · Practica expresiones y el diálogo con el micrófono.</li>
        <li>Read the task card: it is real work on the farm. · Lee la tarea: es trabajo real en la granja.</li>
        <li>Finish the workbook with 70% or more to complete the unit 🔮. · Termina el cuaderno con 70% o más para completar la unidad.</li></ol></details>`;
    STAGES.forEach(s => {
      const us = U.filter(u => u.st === s.n);
      h += `<section class="fm-stage" style="--sc:${s.c}"><div class="fm-sh"><span class="fm-sn">${s.em}</span><div><b>Semester ${s.n} · ${esc(s.en)}</b><span>${esc(s.es)} · ${esc(s.when)}</span></div><span class="fm-lv">${s.lv}</span></div>
        <div class="th-grid">${us.map(u => { const pr = prog[u.ui]; const sc = (window.FM_SCENE || {})[u.ui]; return `<button type="button" class="th-card fm-card" data-fm="open" data-v="${u.ui}"><span class="th-scene">${sc ? `<img src="${sc}" alt="" loading="lazy">` : `<span class="pz-ph">${u.em}</span>`}<i>${u.ui + 1}</i>${pr.n === CHARM_PARTS.length ? '<span class="pz-ok">✓</span>' : ""}</span><b>${u.em} ${esc(u.en)}</b><small>${esc(u.es)}</small><span class="pz-bar"><i style="width:${Math.round(100 * pr.n / CHARM_PARTS.length)}%"></i></span><small class="sub">${pr.n}/${CHARM_PARTS.length} parts${pr.best ? " · workbook " + pr.best + "%" : ""}</small></button>`; }).join("")}</div></section>`;
    });
    return h;
  }
  function tabsHTML(u, p) {
    const d = unitDone(u, p);
    return `<div class="fm-tabs" role="tablist">${PARTS.map(([k, ic, en, es]) => `<button type="button" role="tab" class="fm-tab" data-fm="tab" data-v="${k}" aria-selected="${p.tab === k}">${ic}<b>${en}</b><small>${es}</small>${d[k] ? '<i class="fm-ck">✓</i>' : ""}</button>`).join("")}</div>`;
  }
  const doneBtn = (u, p, k) => { const on = !!(p.done[u.id] || {})[k]; return `<div class="fm-donebar"><button type="button" class="btn ${on ? "ghost" : "primary"}" data-fm="done" data-v="${k}">${on ? "✓ Done · Terminado" : "✓ I finished this part · Terminé esta parte"}</button></div>`; };
  function unitHTML(u, p) {
    need(stageFile(u.ui)); need("farmimg-scenes.js");
    const sc = (window.FM_SCENE || {})[u.ui], cr = credit(`fm${u.ui}-s`), s = STAGES[u.st - 1];
    let h = `<div class="pz-top"><button type="button" class="btn ghost" data-fm="back">← All units · Todas las unidades</button><span class="sub">Semester ${u.st} · ${esc(s.en)}</span></div>
      <div class="th-hero">${sc ? `<img src="${sc}" alt="${esc(u.en)}">` : `<span class="pz-ph big">${u.em}</span>`}<div class="th-cap"><b>Unit ${u.ui + 1} · ${esc(u.en)}</b><span>${esc(u.es)} · <span class="lvl ${u.lv === "A0" ? "A1" : u.lv}">${u.lv === "A0" ? "Level 0" : u.lv}</span></span></div></div>
      ${cr ? `<p class="pz-cr">Photo · Foto: <a href="${esc(cr[1])}" target="_blank" rel="noopener">${esc(cr[0])}</a> / Unsplash</p>` : ""}
      <p class="fm-can">🎯 <b>${esc(u.can[0])}</b><br><span class="sub">${esc(u.can[1])}</span></p>` + tabsHTML(u, p);
    const t = p.tab;
    if (t === "words") h += `<p class="sub">Tap a picture to see the word, the Spanish, the pronunciation and an example. · Toca una imagen.</p><div class="pz-grid">${u.w.map(x => `<button type="button" class="pz-card${p.learned[x.key] ? " got" : ""}" data-fm="word" data-v="${x.n - 1}"><span class="pz-img">${thumb(x.key, u.em)}<i>${x.n}</i>${p.learned[x.key] ? '<span class="pz-ok">✓</span>' : ""}</span><b>${esc(x.w)}</b><small>${esc(x.es)}</small><span class="fm-fig">🗣️ ${esc(x.fig)}</span></button>`).join("")}</div><p class="sub" style="margin-top:10px">${u.w.filter(x => p.learned[x.key]).length}/20 learned · aprendidas (15 = ✓)</p>`;
    if (t === "phrases") h += `<p class="sub">Listen 🔊, then say it 🎤. · Escucha y luego dilo.</p><div class="fm-list">${u.x.map((x, i) => `<div class="fm-row"><div><b lang="en">${esc(x.en)}</b><small>${esc(x.es)}</small></div><span class="fm-act"><button class="btn" type="button" data-fm="say" data-t="${esc(x.en)}" aria-label="Listen">🔊</button><button class="btn ghost" type="button" data-fm="say" data-r=".6" data-t="${esc(x.en)}" aria-label="Slow">🐢</button>${mic(x.en, `fm:${u.id}:x${i}`)}</span><div class="sp-res"></div></div>`).join("")}</div>` + doneBtn(u, p, "phrases");
    if (t === "grammar") h += `<div class="card fm-gr"><h2>${esc(u.gr.t)}</h2><p>${esc(u.gr.es)}</p><div class="fm-list">${u.gr.ex.map(e => `<div class="fm-row"><div><b lang="en">${esc(e[0])}</b><small>${esc(e[1])}</small></div><span class="fm-act"><button class="btn" type="button" data-fm="say" data-t="${esc(e[0])}">🔊</button>${mic(e[0], `fm:${u.id}:g`)}</span><div class="sp-res"></div></div>`).join("")}</div></div>`;
    if (t === "read") { const A = p.ans[u.id + ":r"] || {}; const chk = A._chk;
      h += `<div class="card"><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn" type="button" data-fm="say" data-r=".85" data-t="${esc(u.r.t)}">🔊 Listen · Escuchar</button><button class="btn ghost" type="button" data-fm="say" data-r=".65" data-t="${esc(u.r.t)}">🐢 Slow · Lento</button><button class="btn ghost" type="button" data-fm="es">${p.showEs ? "🙈 Hide Spanish · Ocultar español" : "🇲🇽 Show Spanish · Ver español"}</button></div>
        <div class="th-read fm-read" lang="en">${esc(u.r.t)}</div>${p.showEs ? `<div class="fm-es">${esc(u.r.es)}</div>` : ""}
        <h3>True or False? · ¿Verdadero o falso?</h3><ol class="th-tf">${u.r.tf.map((q, i) => { const v = A[i] || ""; const ok = (v === "T") === q[1]; return `<li class="${chk && v ? (ok ? "th-ok" : "th-no") : ""}">${esc(q[0])} <span class="th-tfb"><button type="button" class="chip sm" data-fm="rtf" data-v="${i}:T" aria-pressed="${v === "T"}">True</button><button type="button" class="chip sm" data-fm="rtf" data-v="${i}:F" aria-pressed="${v === "F"}">False</button></span></li>`; }).join("")}</ol>
        <div class="row"><button class="btn primary" type="button" data-fm="rchk">✔ Check · Revisar</button>${chk ? `<b>${u.r.tf.filter((q, i) => (A[i] === "T") === q[1] && A[i]).length}/5</b>` : ""}</div></div>`; }
    if (t === "task") { const A = p.ans[u.id + ":t"] || {}; const ord = A.ord || shuf(u.task.steps.map((s, i) => i), rng(u.ui * 7 + 3)); const ok = ord.every((v, i) => v === i);
      h += `<div class="fm-wo"><div class="fm-woh"><span>🛠️ TASK CARD · TARJETA DE TAREA</span><b>Unit ${u.ui + 1}</b></div><h2>${esc(u.task.t)}</h2><p class="sub">${esc(u.task.es)}</p>
        <ol class="fm-steps">${u.task.steps.map((s, i) => `<li><div><b lang="en">${esc(s[0])}</b><small>${esc(s[1])}</small></div><button class="btn ghost" type="button" data-fm="say" data-t="${esc(s[0])}" aria-label="Listen">🔊</button></li>`).join("")}</ol>
        <button class="btn" type="button" data-fm="say" data-r=".85" data-t="${esc(u.task.steps.map(s => s[0]).join(" "))}">🔊 Listen to all the steps · Escuchar todos</button></div>
        <div class="card"><h3>Put the steps in order · Ordena los pasos</h3><p class="sub">Use ▲ ▼ to move a step. · Usa ▲ ▼ para mover un paso.</p><ol class="fm-ord">${ord.map((si, i) => `<li class="${A.chk ? (si === i ? "th-ok" : "th-no") : ""}"><span>${esc(u.task.steps[si][0])}</span><span class="fm-mv"><button class="btn ghost sm" type="button" data-fm="mv" data-v="${i}:-1" ${i === 0 ? "disabled" : ""} aria-label="Up">▲</button><button class="btn ghost sm" type="button" data-fm="mv" data-v="${i}:1" ${i === ord.length - 1 ? "disabled" : ""} aria-label="Down">▼</button></span></li>`).join("")}</ol>
        <div class="row"><button class="btn primary" type="button" data-fm="ochk">✔ Check · Revisar</button>${A.chk ? (ok ? '<b class="pz-good">✅ Perfect order! · ¡Orden perfecto!</b>' : '<b class="pz-bad">Not yet. Try again. · Todavía no.</b>') : ""}</div></div>`; }
    if (t === "speak") h += `<div class="card"><h3>Dialogue · Diálogo</h3><p class="sub">Listen to each line, then say it with the mic. Practise both roles. · Escucha cada línea y dila con el micrófono. Practica los dos papeles.</p>
        <button class="btn" type="button" data-fm="dlg">🔊 Play the dialogue · Reproducir diálogo</button>
        <div class="fm-dlg">${u.d.map((l, i) => `<div class="fm-line ${l[0] === "A" ? "a" : "b"}"><span class="fm-who">${l[0]}</span><div class="fm-bub"><b lang="en">${esc(l[1])}</b><small>${esc(l[2])}</small><span class="fm-act"><button class="btn ghost sm" type="button" data-fm="say" data-l="${l[0] === "A" ? "en-US" : "en-GB"}" data-t="${esc(l[1])}">🔊</button>${mic(l[1], `fm:${u.id}:d${i}`)}</span><div class="sp-res"></div></div></div>`).join("")}</div></div>` + doneBtn(u, p, "speak");
    if (t === "write") { const v = p.wr[u.id] || ""; const wc = (v.match(/[A-Za-z']+/g) || []).length; const used = u.wr.bank.filter(b => v.toLowerCase().includes(b.toLowerCase()));
      h += `<div class="card"><h3>✍️ ${esc(u.wr.t)}</h3><p class="sub">${esc(u.wr.es)}</p><p class="sub">Word bank · Banco de palabras: ${u.wr.bank.map(b => `<span class="th-wd${used.includes(b) ? " on" : ""}">${esc(b)}</span>`).join(" ")}</p>
        <textarea class="th-ta" data-fm-in="wr" rows="7" aria-label="Your writing" placeholder="Write here in English · Escribe aquí en inglés">${esc(v)}</textarea>
        <p class="sub th-wc">${wc} words · palabras · ${used.length}/${u.wr.bank.length} from the bank. ${wc >= 20 ? "✅ Your teacher can see it. · Tu maestro puede verlo." : "Write at least 20 words. · Escribe al menos 20 palabras."}</p>
        <details><summary>👀 See an example · Ver un ejemplo</summary><p class="fm-model" lang="en">${esc(u.wr.model)} <button class="btn ghost sm" type="button" data-fm="say" data-t="${esc(u.wr.model)}">🔊</button></p></details></div>`; }
    if (t === "book") h += bookHTML(u, p);
    return h;
  }
  function bookHTML(u, p) {
    const E = work(u.ui), A = p.ans[u.id] = p.ans[u.id] || {}, chk = A._chk || {};
    let h = `<p class="sub">Workbook · Cuaderno: 7 exercises. Your answers are saved. 70% or more completes the unit 🔮. · 70% o más completa la unidad.</p>`;
    E.forEach((e, ei) => {
      const mk = (i, x) => { if (!chk[ei]) return ""; const v = answerOf(A, ei, i); return (e.k === "spell" || e.k === "gap" ? nrm(v) === nrm(x.a) : v === x.a) ? " th-ok" : " th-no"; };
      let body = "";
      if (e.k === "pic" || e.k === "lis" || e.k === "expr" || e.k === "tf") body = `<ol class="th-mc">${e.items.map((x, i) => `<li class="${mk(i, x)}"><div class="th-mcq">${e.k === "pic" ? `<span class="th-mci">${thumb(x.key, u.em)}</span><span>What is this? · ¿Qué es?</span>` : e.k === "lis" ? `<button class="btn" type="button" data-fm="say" data-t="${esc(x.say)}">🔊 Listen · Escucha</button>` : `<span>${esc(x.q)}</span>`}</div><div class="th-opts">${x.o.map(o => `<button type="button" class="chip sm" data-fm="ans" data-v="${ei}.${i}" data-a="${esc(o)}" aria-pressed="${answerOf(A, ei, i) === o}">${e.k === "tf" ? (o === "T" ? "True · Verdadero" : "False · Falso") : esc(o)}</button>`).join("")}</div></li>`).join("")}</ol>`;
      if (e.k === "spell") body = `<ol class="th-sp">${e.items.map((x, i) => `<li class="${mk(i, x)}"><span class="th-mci">${thumb(x.key, u.em)}</span><div><b class="th-scr">${esc(x.sc.split("").join(" "))}</b><small> ${esc(x.es)}</small><br><input class="th-in" data-fm-in="${ei}.${i}" value="${esc(answerOf(A, ei, i))}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Spelling ${i + 1}"></div></li>`).join("")}</ol>`;
      if (e.k === "gap") body = `<div class="th-bank">${e.bank.map(b => `<span>${esc(b)}</span>`).join("")}</div><ol class="th-wb">${e.items.map((x, i) => `<li class="${mk(i, x)}">${esc(x.pre)}<input class="th-in" data-fm-in="${ei}.${i}" value="${esc(answerOf(A, ei, i))}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Gap ${i + 1}">${esc(x.post)}<br><small class="sub">${esc(x.es)}</small></li>`).join("")}</ol>`;
      if (e.k === "order") body = `<ol class="th-wb fm-ordq">${e.items.map((x, i) => `<li class="${mk(i, x)}"><select data-fm-in="${ei}.${i}" aria-label="Step number">${["", "1", "2", "3", "4", "5", "6"].map(n => `<option ${answerOf(A, ei, i) === n ? "selected" : ""}>${n}</option>`).join("")}</select> ${esc(x.q)} <small class="sub">${esc(x.es)}</small></li>`).join("")}</ol>`;
      const sc = exScore(E, A, ei);
      h += `<section class="card th-ex"><h3>${ei + 1}. ${esc(e.t[0])} <span class="sub">· ${esc(e.t[1])}</span></h3>${body}<div class="row"><button class="btn" type="button" data-fm="chk" data-v="${ei}">✔ Check · Revisar</button>${chk[ei] ? `<b class="th-sc">${sc[0]}/${sc[1]}${sc[0] === sc[1] ? " 🎉" : ""}</b>` : ""}</div></section>`;
    });
    const all = Object.keys(chk).length === E.length, pc = pct(E, A);
    h += `<div class="card fm-total"><b>Total: ${all ? pc + "%" : "check every exercise · revisa cada ejercicio"}</b>${p.best[u.id] ? ` · best · mejor: <b>${p.best[u.id]}%</b>` : ""}${(p.best[u.id] || 0) >= 70 ? " · ✅ Unit workbook complete! · ¡Cuaderno completo!" : ""}<div class="row" style="margin-top:8px"><button class="btn ghost" type="button" data-fm="reset">↺ Start again · Empezar de nuevo</button></div></div>`;
    return h;
  }
  function detailHTML(u, x, p) {
    const i = ipa(x.w), c = credit(x.key);
    return `<div class="pz-modal" role="dialog" aria-modal="true" aria-label="${esc(x.w)}" id="fm-modal"><div class="pz-sheet">
      <button type="button" class="pz-x" data-fm="close" aria-label="Close · Cerrar">✕</button>
      <div class="pz-hero">${thumb(x.key, u.em, true)}<i>${x.n}</i></div>
      ${c ? `<p class="pz-cr">Photo · Foto: <a href="${esc(c[1])}" target="_blank" rel="noopener">${esc(c[0])}</a> / Unsplash</p>` : ""}
      <div class="pz-wrow"><h2>${esc(x.w)}</h2><span class="lvl ${u.lv === "A0" ? "A1" : u.lv}">${u.lv === "A0" ? "Level 0" : u.lv}</span></div>
      <p class="pz-posl">${(POS[x.pos] || POS.n)[0]} · ${(POS[x.pos] || POS.n)[1]} · ${u.em} ${esc(u.en)}</p>
      <p class="pz-es">🇲🇽 ${esc(x.es)}</p>${i ? `<p class="pz-ipa">/${esc(i)}/</p>` : ""}<p class="pz-fig">🗣️ Pronunciación figurada: <b>${esc(x.fig)}</b></p>
      <div class="row pz-snd"><button class="btn" type="button" data-fm="say" data-l="en-US" data-t="${esc(x.w)}">🔊 US</button><button class="btn" type="button" data-fm="say" data-l="en-GB" data-t="${esc(x.w)}">🔊 UK</button><button class="btn ghost" type="button" data-fm="say" data-r=".55" data-t="${esc(x.w)}">🐢 Slow · Lento</button>${mic(x.w, `fm:${u.id}:w${x.n}`)}</div><div class="sp-res"></div>
      <h4>Meaning · Significado</h4><p>${esc(x.m)}</p>
      <h4>Example · Ejemplo</h4><p class="pz-ex" lang="en">${esc(x.e)} <button class="btn ghost sm" type="button" data-fm="say" data-t="${esc(x.e)}" aria-label="Listen">🔊</button></p><p class="sub">${esc(x.xe)}</p>
      <div class="row pz-nav"><button class="btn ghost" type="button" data-fm="step" data-v="-1" ${x.n === 1 ? "disabled" : ""}>← Prev</button><button class="btn${p.learned[x.key] ? " ghost" : ""}" type="button" data-fm="learn" data-v="${x.key}">${p.learned[x.key] ? "✓ Learned · Aprendida" : "☆ Mark as learned · Marcar"}</button><button class="btn ghost" type="button" data-fm="step" data-v="1" ${x.n === 20 ? "disabled" : ""}>Next →</button></div>
    </div></div>`;
  }
  function html() {
    const p = st(); const u = p.u != null ? U[p.u] : null;
    if (!U.length) return `<p class="sub">Loading… · Cargando…</p>`;
    return `<div class="fm">${u ? unitHTML(u, p) : homeHTML(p)}</div>`;
  }
  let open = null;
  function draw() {
    const s = document.getElementById("v-farm"); if (!s) return;
    const a = document.activeElement; const keepId = a && a.dataset && a.dataset.fmIn; const pos = a && a.selectionStart;
    s.innerHTML = html();
    if (open != null) { const p = st(), u = U[p.u]; const m = document.getElementById("fm-modal"); if (m) m.remove(); if (u && u.w[open]) document.body.insertAdjacentHTML("beforeend", detailHTML(u, u.w[open], p)); }
    if (keepId) { const el = s.querySelector(`[data-fm-in="${keepId}"]`); if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (e) { } } }
  }
  API.draw = draw; API.html = html; API.work = work;
  API.openUnit = ui => { const p = st(); p.u = +ui; p.tab = "words"; store(); if (location.hash !== "#farm") location.hash = "farm"; setTimeout(draw, 30); };

  /* ---------- events ---------- */
  function closeModal() { open = null; const m = document.getElementById("fm-modal"); if (m) m.remove(); }
  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-fm]"); if (!b) { if (ev.target.classList && ev.target.classList.contains("pz-modal") && ev.target.id === "fm-modal") closeModal(); return; }
    const a = b.dataset.fm, p = st(), u = p.u != null ? U[p.u] : null;
    if (a === "say") { say(b.dataset.t, b.dataset.l, b.dataset.r ? +b.dataset.r : null); return; }
    if (a === "open") { p.u = +b.dataset.v; p.tab = "words"; store(); draw(); window.scrollTo(0, 0); return; }
    if (a === "back") { p.u = null; store(); draw(); window.scrollTo(0, 0); return; }
    if (!u) return;
    if (a === "tab") { p.tab = b.dataset.v; store(); draw(); return; }
    if (a === "word") { open = +b.dataset.v; draw(); return; }
    if (a === "close") { closeModal(); draw(); return; }
    if (a === "step") { open = Math.max(0, Math.min(19, open + +b.dataset.v)); draw(); return; }
    if (a === "learn") { if (p.learned[b.dataset.v]) delete p.learned[b.dataset.v]; else p.learned[b.dataset.v] = 1; store(); draw(); return; }
    if (a === "done") { const d = p.done[u.id] = p.done[u.id] || {}; d[b.dataset.v] = d[b.dataset.v] ? 0 : Date.now(); store(); draw(); return; }
    if (a === "es") { p.showEs = !p.showEs; store(); draw(); return; }
    if (a === "rtf") { const A = p.ans[u.id + ":r"] = p.ans[u.id + ":r"] || {}; const [i, v] = b.dataset.v.split(":"); A[i] = v; store(); draw(); return; }
    if (a === "rchk") { const A = p.ans[u.id + ":r"] = p.ans[u.id + ":r"] || {}; A._chk = 1; const ok = u.r.tf.filter((q, i) => (A[i] === "T") === q[1] && A[i]).length; if (ok >= 4) { const d = p.done[u.id] = p.done[u.id] || {}; d.read = d.read || Date.now(); } store(); draw(); return; }
    if (a === "mv") { const A = p.ans[u.id + ":t"] = p.ans[u.id + ":t"] || {}; A.ord = A.ord || shuf(u.task.steps.map((s, i) => i), rng(u.ui * 7 + 3)); const [i, d] = b.dataset.v.split(":").map(Number); const j = i + d; if (j < 0 || j >= A.ord.length) return; [A.ord[i], A.ord[j]] = [A.ord[j], A.ord[i]]; A.chk = 0; store(); draw(); return; }
    if (a === "ochk") { const A = p.ans[u.id + ":t"] = p.ans[u.id + ":t"] || {}; A.ord = A.ord || shuf(u.task.steps.map((s, i) => i), rng(u.ui * 7 + 3)); A.chk = 1; if (A.ord.every((v, i) => v === i)) { const d = p.done[u.id] = p.done[u.id] || {}; d.task = d.task || Date.now(); } store(); draw(); return; }
    if (a === "dlg") { try { speechSynthesis.cancel(); u.d.forEach(l => { const x = new SpeechSynthesisUtterance(l[1]); x.lang = l[0] === "A" ? "en-US" : "en-GB"; x.rate = .9; speechSynthesis.speak(x); }); } catch (e) { } return; }
    if (a === "ans") { const A = p.ans[u.id] = p.ans[u.id] || {}; A[b.dataset.v] = b.dataset.a; store(); draw(); return; }
    if (a === "chk") { const A = p.ans[u.id] = p.ans[u.id] || {}; A._chk = A._chk || {}; A._chk[b.dataset.v] = 1; const E = work(u.ui); if (Object.keys(A._chk).length === E.length) { const pc = pct(E, A); if (pc > (p.best[u.id] || 0)) p.best[u.id] = pc; } store(); draw(); return; }
    if (a === "reset") { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = "Tap again to clear · Toca otra vez"; return; } p.ans[u.id] = {}; store(); draw(); return; }
  });
  document.addEventListener("input", ev => {
    const k = ev.target.dataset && ev.target.dataset.fmIn; if (!k) return; const p = st(), u = U[p.u]; if (!u) return;
    if (k === "wr") { p.wr[u.id] = ev.target.value; const wc = (ev.target.value.match(/[A-Za-z']+/g) || []).length; const d = p.done[u.id] = p.done[u.id] || {}; if (wc >= 20) d.write = d.write || Date.now(); else d.write = 0; store(); const w = ev.target.parentNode.querySelector(".th-wc"); if (w) w.textContent = `${wc} words · palabras. ${wc >= 20 ? "✅ Your teacher can see it. · Tu maestro puede verlo." : "Write at least 20 words. · Escribe al menos 20 palabras."}`; return; }
    const A = p.ans[u.id] = p.ans[u.id] || {}; A[k] = ev.target.value; store();
  });
  document.addEventListener("change", ev => { const k = ev.target.dataset && ev.target.dataset.fmIn; if (k && ev.target.tagName === "SELECT") { const p = st(), u = U[p.u]; if (!u) return; const A = p.ans[u.id] = p.ans[u.id] || {}; A[k] = ev.target.value; store(); } });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape" && open != null) { closeModal(); draw(); } });

  /* ---------- styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
.fm-hero{border-radius:20px;padding:20px;color:#fff;background:linear-gradient(135deg,#2b6e2f 0%,#4a8f2a 45%,#d9a521 100%);box-shadow:0 10px 30px #2b6e2f33;margin-bottom:14px}
.fm-hi{display:flex;gap:14px;align-items:center}.fm-big{font-size:3.2rem;line-height:1}.fm-hero h1{color:#fff;margin:0}.fm-hero p{margin:2px 0;color:#f3ffe9}.fm-tag{font-size:.88rem;opacity:.95}
.fm-pg{margin-top:12px;display:flex;flex-direction:column;gap:6px;font-size:.88rem}.fm-bar{height:10px;border-radius:999px;background:#ffffff40;overflow:hidden}.fm-bar i{display:block;height:100%;background:#fff}
.fm-how summary{cursor:pointer;font-weight:800}.fm-how ol{margin:8px 0 0 18px;display:flex;flex-direction:column;gap:6px}
.fm-stage{margin:18px 0}.fm-sh{display:flex;gap:12px;align-items:center;border-left:6px solid var(--sc);background:var(--surface,var(--bg));border-radius:14px;padding:10px 14px;margin-bottom:10px}
.fm-sh b{display:block;font-size:1.08rem}.fm-sh span{font-size:.85rem;color:var(--muted)}.fm-sn{font-size:1.8rem}.fm-lv{margin-left:auto;background:var(--sc);color:#fff;font-weight:800;border-radius:999px;padding:3px 12px;font-size:.85rem;white-space:nowrap}
.fm-card .pz-ok{position:absolute;right:8px;top:8px}
.fm-can{background:#f1f9ec;border:1px solid #cfe8c0;border-radius:14px;padding:10px 12px;margin:10px 0}
.fm-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:10px 0 14px}@media(min-width:900px){.fm-tabs{grid-template-columns:repeat(8,1fr)}}
.fm-tab{position:relative;display:flex;flex-direction:column;align-items:center;gap:1px;border:1px solid var(--line);border-radius:12px;background:var(--surface,var(--bg));padding:8px 4px;font:inherit;color:inherit;cursor:pointer;font-size:1.2rem}
.fm-tab b{font-size:.78rem}.fm-tab small{font-size:.68rem;color:var(--muted)}.fm-tab[aria-selected="true"]{border-color:#2f9e44;box-shadow:inset 0 -3px 0 #2f9e44;background:#f1f9ec}
.fm-ck{position:absolute;top:4px;right:6px;font-style:normal;font-size:.75rem;color:#fff;background:#2fa62f;border-radius:999px;width:18px;height:18px;display:grid;place-items:center}
.fm-fig{font-size:.75rem;color:#7a4b00;background:#fff3cd;border-radius:8px;padding:1px 6px;align-self:flex-start;margin:4px 2px 0}
.fm-list{display:flex;flex-direction:column;gap:8px}.fm-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--surface,var(--bg))}
.fm-row>div:first-child{display:flex;flex-direction:column;flex:1;min-width:180px}.fm-row b{font-size:1.05rem}.fm-row small{color:var(--muted)}.fm-row .sp-res{flex-basis:100%}.fm-row .sp-res:empty{display:none}
.fm-act{display:flex;gap:6px;align-items:center}.fm-act .btn{min-height:40px}
.fm-donebar{margin:14px 0}.fm-gr h2{margin-top:0}
.fm-read{font-size:1.12rem;line-height:1.9}.fm-es{background:#fff8e6;border-radius:12px;padding:10px 14px;margin-top:8px;color:#5b4a1a}
.fm-wo{border:2px solid #2b6e2f;border-radius:16px;padding:14px;background:repeating-linear-gradient(0deg,#fbfdf8,#fbfdf8 31px,#eef5e7 32px);margin-bottom:12px}
.fm-woh{display:flex;justify-content:space-between;font-size:.78rem;font-weight:800;letter-spacing:.06em;color:#2b6e2f;border-bottom:2px dashed #2b6e2f55;padding-bottom:6px;margin-bottom:6px}
.fm-steps{margin:10px 0 12px 22px;display:flex;flex-direction:column;gap:8px}.fm-steps li{display:flex;gap:8px;align-items:center;justify-content:space-between}.fm-steps li>div{display:flex;flex-direction:column}.fm-steps small{color:var(--muted)}
.fm-ord{margin:8px 0 10px 22px;display:flex;flex-direction:column;gap:6px}.fm-ord li{display:flex;gap:8px;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:10px;padding:6px 10px;background:var(--surface,var(--bg))}.fm-mv{display:flex;gap:4px}
.fm-dlg{display:flex;flex-direction:column;gap:10px;margin-top:12px}.fm-line{display:flex;gap:8px;align-items:flex-start}.fm-line.b{flex-direction:row-reverse}
.fm-who{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:900;color:#fff;background:#1c7ed6}.fm-line.b .fm-who{background:#2f9e44}
.fm-bub{display:flex;flex-direction:column;gap:2px;max-width:85%;border:1px solid var(--line);border-radius:14px;padding:8px 12px;background:var(--surface,var(--bg))}.fm-line.b .fm-bub{background:#f1f9ec}.fm-bub small{color:var(--muted)}.fm-bub .fm-act{margin-top:4px}.fm-bub .sp-res:empty{display:none}
.fm-model{background:#f1f9ec;border-radius:12px;padding:10px 12px}.fm-total{font-size:1.05rem}
.fm-ordq select{min-height:36px;border:1px solid var(--line);border-radius:8px;padding:2px 6px;background:var(--surface,var(--bg));color:inherit;font:inherit}
@media(max-width:520px){.fm-hi{align-items:flex-start}.fm-big{font-size:2.4rem}}`;
  document.head.appendChild(css);

  /* ---------- register the view ---------- */
  if (!VIEWS.some(v => v[0] === "farm")) {
    VIEWS.push(["farm", "Farm English", '<path d="M3 17h2m14 0h2M5 17a2 2 0 104 0 2 2 0 10-4 0zm10-1a3 3 0 106 0 3 3 0 10-6 0zM9 17h6M5 14V9h6l2 5M13 14h3V7h-3"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-farm")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-farm"; sec.setAttribute("aria-label", "Field and Machine English"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "farm") draw(); }; try { render(); } catch (e) { } }
  }
})();

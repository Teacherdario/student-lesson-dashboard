/* Teacher Dario · Student Book (Libro del estudiante): a bilingual grammar and vocabulary reference for every course. */
window.BOOK = window.BOOK || { courses: {}, units: {}, extra: {}, special: {} };
BOOK.course = (k, d) => { BOOK.courses[k] = d; };
BOOK.unit = (id, d) => { BOOK.units[id] = d; };
BOOK.words = list => list.forEach(r => { BOOK.extra[r[0].toLowerCase()] = { w: r[0], p: r[1], es: r[2] }; });

(function () {
  if (typeof VIEWS === "undefined") return;
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const LVNAME = { A1: ["Beginner", "Principiante"], A2: ["Elementary", "Básico"], B1: ["Intermediate", "Intermedio"], B2: ["Upper intermediate", "Intermedio alto"], C1: ["Advanced", "Avanzado"], C2: ["Proficiency", "Maestría"] };
  const escB = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const md = t => escB(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/__(.+?)__/g, "<u>$1</u>");
  const fig = ipa => (window.FIGURADA ? FIGURADA(ipa) : "");
  const B = () => { if (!S.book) S.book = {}; const b = S.book; b.c = b.c || ""; b.u = b.u || ""; b.es = b.es !== false; b.chk = b.chk || {}; b.qa = b.qa || {}; return b; };
  const store = () => { try { save(); } catch (e) { } };

  /* ---------- voice ---------- */
  function voice(lang) {
    if (!("speechSynthesis" in window)) return null;
    const vs = speechSynthesis.getVoices();
    if (lang === "es") return vs.find(v => /es[-_]MX/i.test(v.lang)) || vs.find(v => /es[-_]US/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null;
    return vs.find(v => /en[-_]GB/i.test(v.lang) && /female|libby|sonia|kate|serena|hazel|google uk english female/i.test(v.name)) || vs.find(v => /en[-_]GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  }
  function say(text, lang, slow) {
    if (!("speechSynthesis" in window)) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); const v = voice(lang); if (v) u.voice = v; u.lang = v ? v.lang : (lang === "es" ? "es-MX" : "en-GB"); u.rate = slow ? .7 : .92; speechSynthesis.speak(u); } catch (e) { }
  }
  const sp = (text, lang, label) => `<button class="bk-say" type="button" data-bk="say" data-t="${escB(text)}" data-l="${lang || "en"}" aria-label="${label || "Listen"}: ${escB(text)}" title="Listen · Escuchar">🔊</button>`;
  const spSlow = text => `<button class="bk-say slow" type="button" data-bk="say" data-t="${escB(text)}" data-l="en" data-slow="1" aria-label="Listen slowly: ${escB(text)}" title="Slowly · Despacio">🐢</button>`;

  /* ---------- word lookup ---------- */
  let DMAP = null;
  function dict(w) {
    if (!DMAP) { DMAP = {}; try { (DICT_DATA.entries || []).forEach(r => { const k = r[0].toLowerCase(); if (!DMAP[k]) DMAP[k] = r; }); } catch (e) { } }
    const k = String(w).toLowerCase(); const r = DMAP[k];
    if (r) return { w: r[0], t: r[1], c: r[2], p: r[3], es: r[4], syn: r[5] || [], m: r[6], e: r[7], xs: r[11] };
    const x = BOOK.extra[k]; if (x) return { w: x.w, t: "", c: "", p: x.p, es: x.es, syn: [] };
    return null;
  }
  BOOK.dict = dict;

  /* ---------- access ---------- */
  function allowed() {
    const c = window.TD_CODES || []; const all = [...LV, "VOC", "VERB", "PET", "FCE"];
    if (!c.length) return all;
    const out = LV.filter(l => c.includes(l));
    if (c.some(x => x === "VOC" || x.startsWith("VOC:"))) out.push("VOC");
    if (c.some(x => x === "VERB" || x.startsWith("VERB:"))) out.push("VERB");
    if (c.includes("PET")) out.push("PET"); if (c.includes("FCE")) out.push("FCE");
    if (c.includes("PET")) ["A2", "B1"].forEach(l => { if (!out.includes(l)) out.push(l); });
    if (c.includes("FCE")) ["B1", "B2"].forEach(l => { if (!out.includes(l)) out.push(l); });
    return out;
  }
  const CNAME = { VOC: ["Vocabulary course", "Curso de vocabulario"], VERB: ["Verbs course", "Curso de verbos"], PET: ["B1 Preliminary (PET)", "B1 Preliminary (PET)"], FCE: ["B2 First (FCE)", "B2 First (FCE)"] };
  const cName = k => LV.includes(k) ? [`Level ${k} · ${LVNAME[k][0]}`, `Nivel ${k} · ${LVNAME[k][1]}`] : CNAME[k];
  const lessonsOf = lv => { try { return (window.ALL_LESSONS || LESSONS).filter(l => l.level === lv); } catch (e) { return []; } };

  /* ---------- shared pieces ---------- */
  const bi = (en, es, cls) => `<div class="bk-bi ${cls || ""}"><div class="en" lang="en">${md(en)}</div>${B().es && es ? `<div class="es" lang="es">${md(es)}</div>` : ""}</div>`;
  const head = (n, en, es, icon) => `<h2 class="bk-h"><span class="bk-n">${icon || n}</span><span>${escB(en)}${B().es && es ? `<small lang="es">${escB(es)}</small>` : ""}</span></h2>`;
  function table(tb) {
    const kind = tb.k || ""; // aff / neg / q / sa
    return `<div class="bk-tbl ${kind}"><div class="bk-tt">${escB(tb.t[0])}${B().es && tb.t[1] ? ` <span lang="es">· ${escB(tb.t[1])}</span>` : ""}</div><div class="bk-tw"><table><thead><tr>${tb.h.map(x => `<th>${md(x)}</th>`).join("")}</tr></thead><tbody>${tb.r.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="pr"' : ""}>${md(c)}</td>`).join("")}${tb.say !== false ? `<td class="sy">${sp(r.filter((c, i) => tb.say ? tb.say.includes(i) : true).join(" ").replace(/\*\*|__/g, "").replace(/\s*\/\s*/g, " / "))}</td>` : ""}</tr>`).join("")}</tbody></table></div>${tb.n ? `<p class="bk-tn">${md(tb.n[0])}${B().es && tb.n[1] ? `<br><span lang="es">${md(tb.n[1])}</span>` : ""}</p>` : ""}</div>`;
  }
  function vocabCard(w, lessonMeaning, lessonEx) {
    const d = dict(w) || {}; const ipa = d.p || ""; const ex = lessonEx || d.e || ""; const f = fig(ipa);
    return `<div class="bk-voc"><div class="bk-vw"><b lang="en">${escB(w)}</b>${sp(w)}${spSlow(w)}${d.t ? `<span class="bk-tag">${escB(d.t)}</span>` : ""}${d.c ? `<span class="lvl ${d.c}">${d.c}</span>` : ""}</div>
      ${f ? `<div class="bk-fig" title="Pronunciación figurada"><span class="lab">Se pronuncia</span> <b>${escB(f)}</b>${ipa ? ` <span class="ipa">/${escB(ipa)}/</span>` : ""}</div>` : ""}
      <div class="bk-es" lang="es">🇲🇽 ${escB(d.es || "")}</div>
      <div class="bk-mean"><span class="lab">Meaning</span> ${escB(lessonMeaning || d.m || "")}</div>
      ${ex ? `<div class="bk-ex"><span lang="en">“${escB(ex)}”</span>${sp(ex)}${B().es && d.xs && (!lessonEx || lessonEx === d.e) ? `<br><span class="es" lang="es">${escB(d.xs)}</span>` : ""}</div>` : ""}</div>`;
  }
  BOOK.vocabCard = vocabCard; BOOK.table = table; BOOK.bi = bi; BOOK.head = head; BOOK.sp = sp; BOOK.md = md; BOOK.esc = escB; BOOK.state = B;

  /* ---------- course page ---------- */
  function renderCourse(k) {
    if (BOOK.special[k]) return BOOK.special[k].course();
    const C = BOOK.courses[k] || {}; const Ls = lessonsOf(k); const b = B();
    let h = `<div class="bk-cover lv-${k}"><div><span class="bk-kicker">Student Book · Libro del estudiante</span><h1>${escB(cName(k)[0])}</h1>${b.es ? `<p class="es" lang="es">${escB(cName(k)[1])}</p>` : ""}${C.intro ? `<p class="bk-intro">${md(C.intro[0])}</p>${b.es ? `<p class="bk-intro es" lang="es">${md(C.intro[1])}</p>` : ""}` : ""}</div><div class="bk-badge">${k}</div></div>`;
    if (C.can) h += `<section class="card bk-sec">${head(0, "By the end of this course you will be able to…", "Al terminar este curso podrás…", "🎯")}<ul class="bk-can">${C.can.map(x => `<li><span class="en">${md(x[0])}</span>${b.es ? `<span class="es" lang="es">${md(x[1])}</span>` : ""}</li>`).join("")}</ul></section>`;
    h += `<section class="card bk-sec">${head(0, "Syllabus", "Temario del curso", "🗂️")}<div class="bk-tw"><table class="bk-syl"><thead><tr><th>Unit</th><th>Topic · Tema</th><th>Grammar · Gramática</th><th>Vocabulary · Vocabulario</th><th>You will learn to… · Aprenderás a…</th></tr></thead><tbody>${Ls.map((l, i) => { const U = BOOK.units[l.id] || {}; return `<tr><td><button class="bk-link" type="button" data-bk="unit" data-v="${l.id}">${i + 1}</button></td><td><b>${escB(l.title)}</b><br><span class="sub">${escB(l.topic)}</span></td><td>${escB((l.gr && l.gr.t) || "")}${U.gt && b.es ? `<br><span class="sub" lang="es">${escB(U.gt[1])}</span>` : ""}</td><td>${Object.keys(l.g || {}).map(escB).join(", ")}</td><td>${U.can ? escB(U.can[0][0]) : escB(l.blurb || "")}</td></tr>`; }).join("")}</tbody></table></div></section>`;
    h += `<div class="bk-units">${Ls.map((l, i) => { const U = BOOK.units[l.id]; const done = b.chk[l.id]; return `<button class="bk-ucard ${U ? "" : "soon"}" type="button" data-bk="unit" data-v="${l.id}"><span class="bk-un">Unit ${i + 1}</span><b>${escB(l.title)}</b><span class="sub">${escB((l.gr && l.gr.t) || "")}</span>${done ? `<span class="bk-done">✓ studied</span>` : ""}</button>`; }).join("")}</div>`;
    return h;
  }

  /* ---------- unit page ---------- */
  function renderUnit(id) {
    const l = (window.ALL_LESSONS || LESSONS).find(x => x.id === id); if (!l) return `<p class="sub">Unit not found.</p>`;
    const U = BOOK.units[id] || {}; const b = B(); const Ls = lessonsOf(l.level); const i = Ls.findIndex(x => x.id === id);
    let n = 0;
    let h = `<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-bk="course" data-v="${l.level}">← ${escB(cName(l.level)[0])}</button><span class="sub">Unit ${i + 1} of ${Ls.length}</span></div>
      <div class="bk-uhead lv-${l.level}"><span class="bk-kicker">Unit ${i + 1} · ${escB(l.topic)}</span><h1>${escB(l.title)}</h1><p>${escB(l.blurb || "")}</p></div>`;
    if (U.can) h += `<section class="card bk-sec">${head(++n, "In this unit you will learn to…", "En esta unidad aprenderás a…", "🎯")}<ul class="bk-can">${U.can.map(x => `<li><span class="en">${md(x[0])}</span>${b.es ? `<span class="es" lang="es">${md(x[1])}</span>` : ""}</li>`).join("")}</ul></section>`;
    // grammar
    const gr = l.gr || {};
    h += `<section class="card bk-sec">${head(++n, "Grammar: " + (gr.t || ""), U.gt ? "Gramática: " + U.gt[1] : "", "📐")}`;
    if (U.concept) h += `<div class="bk-concept"><span class="bk-lab">💡 The idea · La idea</span>${bi(U.concept[0], U.concept[1])}</div>`;
    else if (gr.r) h += `<div class="bk-concept"><span class="bk-lab">💡 The idea · La idea</span>${bi(gr.r, "")}</div>`;
    if (U.use) h += `<h3 class="bk-h3">When do we use it? <span lang="es">· ¿Cuándo se usa?</span></h3><ol class="bk-use">${U.use.map(u => `<li>${md(u[0])}${b.es ? `<br><span class="es" lang="es">${md(u[1])}</span>` : ""}${u[2] ? `<div class="bk-eg"><span lang="en">${md(u[2])}</span>${sp(u[2].replace(/\*\*|__/g, ""))}${b.es && u[3] ? `<br><span class="es" lang="es">${md(u[3])}</span>` : ""}</div>` : ""}</li>`).join("")}</ol>`;
    if (U.tables) h += `<h3 class="bk-h3">Structure <span lang="es">· Estructura</span></h3>${U.formula ? `<div class="bk-formula">${U.formula.map(f => `<div class="${f[2] || ""}"><b>${escB(f[0])}</b> ${md(f[1])}</div>`).join("")}</div>` : ""}<div class="bk-tables">${U.tables.map(table).join("")}</div>`;
    else if (gr.f) h += `<h3 class="bk-h3">Structure <span lang="es">· Estructura</span></h3><div class="bk-formula"><div>${escB(gr.f)}</div></div>`;
    if (U.spell) h += `<div class="bk-box spell"><span class="bk-lab">✏️ Spelling rules · Reglas de ortografía</span>${U.spell.map(r => `<div class="bk-rule"><div>${md(r[0])}${b.es ? `<br><span class="es" lang="es">${md(r[1])}</span>` : ""}</div><div class="bk-rex">${md(r[2])}</div></div>`).join("")}</div>`;
    if (U.pron) h += `<div class="bk-box pron"><span class="bk-lab">🗣️ Pronunciation · Pronunciación</span>${U.pron.map(r => `<div class="bk-rule"><div>${md(r[0])}${b.es ? `<br><span class="es" lang="es">${md(r[1])}</span>` : ""}</div>${r[2] ? `<div class="bk-rex">${md(r[2])} ${sp(r[2].replace(/\*\*|__|\/[^/]*\//g, "").replace(/→.*$/, ""))}</div>` : ""}</div>`).join("")}</div>`;
    if (U.mist) h += `<div class="bk-box mist"><span class="bk-lab">⚠️ Common mistakes · Errores comunes</span>${U.mist.map(m => `<div class="bk-mi"><span class="no">✗ ${escB(m[0])}</span><span class="ok">✓ ${escB(m[1])}</span>${b.es ? `<span class="why" lang="es">${md(m[2])}</span>` : ""}</div>`).join("")}</div>`;
    else if (gr.tip) h += `<div class="bk-box mist"><span class="bk-lab">⚠️ Watch out · Cuidado</span><p>${escB(gr.tip)}</p></div>`;
    const ex = U.ex || (gr.ex || []).map(x => [x, ""]);
    if (ex.length) h += `<h3 class="bk-h3">Examples <span lang="es">· Ejemplos</span></h3><ul class="bk-exs">${ex.map(e => `<li><span lang="en">${md(e[0])}</span>${sp(e[0].replace(/\*\*|__/g, ""))}${b.es && e[1] ? `<br><span class="es" lang="es">${md(e[1])}</span>` : ""}</li>`).join("")}</ul>`;
    if (U.more) h += U.more.map(m => `<div class="bk-box more"><span class="bk-lab">${escB(m[0])}</span>${bi(m[1], m[2])}</div>`).join("");
    h += `</section>`;
    // vocabulary
    const g = l.g || {};
    h += `<section class="card bk-sec">${head(++n, "Vocabulary", "Vocabulario", "📚")}<p class="sub">Tap 🔊 to hear each word and 🐢 to hear it slowly. <span lang="es">“Se pronuncia” muestra cómo suena la palabra con letras del español; la sílaba en MAYÚSCULAS es la más fuerte.</span></p><div class="bk-vocs">${Object.keys(g).map(w => { const s = (l.s || []).find(x => x.toLowerCase().includes(w.toLowerCase().split(" ")[0])); return vocabCard(w, g[w], s); }).join("")}</div>${U.vextra ? `<h3 class="bk-h3">More useful words <span lang="es">· Más palabras útiles</span></h3><div class="bk-vocs">${U.vextra.map(w => vocabCard(w)).join("")}</div>` : ""}</section>`;
    // reading
    if (l.s && l.s.length) h += `<section class="card bk-sec">${head(++n, "Read and listen", "Lee y escucha", "📖")}<div class="bk-read">${l.s.map(x => `<p><span lang="en">${escB(x)}</span>${sp(x)}</p>`).join("")}</div>${U.readEs && b.es ? `<details class="bk-tr"><summary>Spanish translation · Traducción</summary>${U.readEs.map(x => `<p lang="es">${escB(x)}</p>`).join("")}</details>` : ""}<button class="btn" type="button" data-act="open" data-id="${l.id}">Practise this lesson · Practicar la lección →</button></section>`;
    // quick check
    const qs = (l.gq || []).slice(0, 5); const qa = b.qa[id] || {};
    if (qs.length) h += `<section class="card bk-sec">${head(++n, "Check your understanding", "Comprueba lo que aprendiste", "✅")}${qs.map((q, j) => `<div class="fq"><div class="stem"><span class="qn">${j + 1}</span> ${escB(q.q)}</div><div class="opts">${q.o.map((o, k) => { const picked = qa[j] === k; const cls = qa[j] == null ? "" : k === q.a ? (picked ? "ok" : "") : picked ? "no" : ""; return `<label class="${cls}"><input type="radio" name="bkq-${id}-${j}" data-bk-q="${j}" data-u="${id}" value="${k}" ${picked ? "checked" : ""}> ${escB(o)}</label>`; }).join("")}</div></div>`).join("")}${Object.keys(qa).length === qs.length ? `<p class="bk-score">${qs.filter((q, j) => qa[j] === q.a).length} / ${qs.length} ✓</p>` : ""}</section>`;
    // checklist
    if (U.can) h += `<section class="card bk-sec bk-now">${head(++n, "Now I can…", "Ahora puedo…", "🏁")}${U.can.map((x, j) => `<label class="bk-cb"><input type="checkbox" data-bk-c="${id}" data-j="${j}" ${(b.chk[id + "_" + j]) ? "checked" : ""}> <span>${md(x[0])}${b.es ? ` <span class="es" lang="es">· ${md(x[1])}</span>` : ""}</span></label>`).join("")}</section>`;
    h += `<div class="row" style="justify-content:space-between">${i > 0 ? `<button class="btn" type="button" data-bk="unit" data-v="${Ls[i - 1].id}">← ${escB(Ls[i - 1].title)}</button>` : "<span></span>"}${i < Ls.length - 1 ? `<button class="btn primary" type="button" data-bk="unit" data-v="${Ls[i + 1].id}">${escB(Ls[i + 1].title)} →</button>` : ""}</div>`;
    return h;
  }

  /* ---------- main ---------- */
  function html() {
    const b = B(); const al = allowed(); if (!al.includes(b.c)) { b.c = al[0] || "A1"; b.u = ""; }
    let h = `<div class="head"><div><h1>Student Book</h1><p class="sub">Libro del estudiante · Grammar and vocabulary reference · Created by Teacher Dario</p></div><label class="bk-tog"><input type="checkbox" data-bk="es" ${b.es ? "checked" : ""}> Español</label></div>
      <div class="seg bk-courses" role="group" aria-label="Courses">${al.map(k => `<button class="chip" type="button" data-bk="course" data-v="${k}" aria-pressed="${b.c === k}">${LV.includes(k) ? `<span class="lvl ${k}">${k}</span>` : escB(cName(k)[0].replace(" course", "").replace(/ \(.*\)/, ""))}</button>`).join("")}</div>`;
    if (b.u && BOOK.special[b.c] && BOOK.special[b.c].unit) h += BOOK.special[b.c].unit(b.u);
    else if (b.u) h += renderUnit(b.u);
    else h += renderCourse(b.c);
    return h;
  }
  function draw() { const s = document.getElementById("v-book"); if (s) s.innerHTML = html(); }
  BOOK.draw = draw;

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-bk]"); if (!el || !el.closest("#v-book")) return; const b = B(); const a = el.dataset.bk;
    if (a === "say") { say(el.dataset.t, el.dataset.l, el.dataset.slow); return; }
    if (a === "course") { b.c = el.dataset.v; b.u = ""; store(); draw(); window.scrollTo(0, 0); }
    if (a === "unit") { b.u = el.dataset.v; store(); draw(); window.scrollTo(0, 0); }
    if (a === "back") { b.u = ""; store(); draw(); }
  });
  document.addEventListener("change", e => {
    const el = e.target; if (!el.closest || !el.closest("#v-book")) return; const b = B();
    if (el.dataset.bk === "es") { b.es = el.checked; store(); draw(); }
    if (el.dataset.bkQ != null) { const u = el.dataset.u; (b.qa[u] = b.qa[u] || {})[el.dataset.bkQ] = +el.value; store(); draw(); }
    if (el.dataset.bkC) { b.chk[el.dataset.bkC + "_" + el.dataset.j] = el.checked; const U = BOOK.units[el.dataset.bkC]; if (U && U.can) b.chk[el.dataset.bkC] = U.can.every((_, j) => b.chk[el.dataset.bkC + "_" + j]); store(); }
  });

  const css = document.createElement("style");
  css.textContent = `#v-book{--bk:#1f4e9c}
.bk-tog{display:flex;gap:6px;align-items:center;font-weight:600;font-size:.9rem;border:1px solid var(--line);border-radius:999px;padding:6px 12px;background:var(--surface);cursor:pointer}
.bk-courses .chip{min-height:38px}
.bk-uhead{flex-direction:column;align-items:flex-start!important}
.bk-cover,.bk-uhead{display:flex;justify-content:space-between;gap:16px;align-items:center;border-radius:18px;padding:22px 22px;color:#fff;background:linear-gradient(135deg,var(--bkc,#1f4e9c),color-mix(in srgb,var(--bkc,#1f4e9c) 55%,#000));margin:6px 0 4px}
.bk-cover h1,.bk-uhead h1{font-family:var(--display);font-size:clamp(1.5rem,5vw,2.2rem);margin:4px 0;color:#fff}
.bk-cover p,.bk-uhead p{margin:4px 0;color:#ffffffe6;max-width:70ch}
.bk-cover .es{font-style:italic}
.bk-kicker{text-transform:uppercase;letter-spacing:.08em;font-size:.75rem;font-weight:700;opacity:.9}
.bk-badge{font-family:var(--display);font-weight:900;font-size:clamp(2.4rem,9vw,4rem);opacity:.9;background:#ffffff26;border-radius:16px;padding:6px 16px}
.lv-A1{--bkc:#d49a00}.lv-A2{--bkc:#d0661c}.lv-B1{--bkc:#c23a5a}.lv-B2{--bkc:#7a3fb5}.lv-C1{--bkc:#2f62c9}.lv-C2{--bkc:#0f8a74}.lv-VOC{--bkc:#1c8f5a}.lv-VERB{--bkc:#b8452a}.lv-PET{--bkc:#0e7c86}.lv-FCE{--bkc:#7b2cbf}
.bk-sec{display:flex;flex-direction:column;gap:12px}
.bk-h{display:flex;gap:12px;align-items:center;font-family:var(--display);font-size:1.3rem;margin:0}
.bk-h small{display:block;font-family:var(--body);font-size:.85rem;font-weight:500;color:var(--muted);font-style:italic}
.bk-n{flex:0 0 auto;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);font-size:1.2rem}
.bk-h3{font-family:var(--display);font-size:1.08rem;margin:10px 0 0}.bk-h3 span{font-weight:500;color:var(--muted);font-style:italic;font-size:.9rem}
.bk-bi{display:grid;grid-template-columns:1fr;gap:6px}
@media(min-width:760px){.bk-bi{grid-template-columns:1fr 1fr}}
.bk-bi .en{font-size:1.05rem;line-height:1.6}.bk-bi .es,.es{color:#5b4a8a;font-style:italic}
.bk-lab{display:block;font-weight:800;font-size:.85rem;letter-spacing:.02em;margin-bottom:6px}
.bk-concept{border-radius:14px;padding:14px 16px;background:linear-gradient(135deg,#fff8e1,#fff3c4);border:1px solid #f1d27a;color:#2b2200}
.bk-concept .es{color:#6a4b00}
.bk-can{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.bk-can li{display:flex;flex-direction:column;gap:2px;padding:8px 12px 8px 34px;border-radius:10px;background:var(--sunken);position:relative}
.bk-can li::before{content:"✔";position:absolute;left:12px;top:8px;color:var(--good);font-weight:900}
.bk-use{margin:0;padding-left:22px;display:flex;flex-direction:column;gap:10px}
.bk-eg{margin-top:4px;border-left:3px solid var(--accent);padding:4px 10px;background:var(--surface);font-family:var(--read)}
.bk-formula{display:flex;flex-direction:column;gap:6px;font-family:var(--read);font-size:1.05rem}
.bk-formula>div{border-radius:10px;padding:8px 12px;background:var(--sunken);border-left:6px solid var(--line)}
.bk-formula .aff{border-left-color:#2e9e5b}.bk-formula .neg{border-left-color:#d64545}.bk-formula .q{border-left-color:#2f62c9}
.bk-tables{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
.bk-tbl{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface)}
.bk-tt{font-weight:800;padding:8px 12px;color:#fff;background:#59606b}
.bk-tbl.aff .bk-tt{background:#2e9e5b}.bk-tbl.neg .bk-tt{background:#d64545}.bk-tbl.q .bk-tt{background:#2f62c9}.bk-tbl.sa .bk-tt{background:#7a3fb5}.bk-tbl.x .bk-tt{background:#b8740a}
.bk-tt span{font-weight:500;font-style:italic;opacity:.95}
.bk-tw{overflow-x:auto}
.bk-tbl table,.bk-syl{border-collapse:collapse;width:100%;font-family:var(--read);font-size:1rem}
.bk-tbl th,.bk-tbl td,.bk-syl th,.bk-syl td{padding:6px 10px;border-top:1px solid var(--line);text-align:left;vertical-align:top}
.bk-tbl th,.bk-syl th{font-family:var(--body);font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);background:var(--sunken)}
.bk-tbl td.pr{font-weight:700;white-space:nowrap}.bk-tbl td.sy{width:36px;text-align:right}
.bk-tbl b{color:#c0392b}
.bk-tn{font-size:.88rem;color:var(--muted);padding:6px 12px;margin:0;border-top:1px solid var(--line)}
.bk-syl{font-family:var(--body);font-size:.92rem}.bk-syl td{min-width:110px}
.bk-box{border-radius:14px;padding:12px 14px;border:1px solid var(--line)}
.bk-box.spell{background:#eef6ff;border-color:#b9d4f5;color:#10233f}.bk-box.pron{background:#f1fbf3;border-color:#b7e2c3;color:#0f2e19}.bk-box.mist{background:#fff1f1;border-color:#f3c0c0;color:#3a0f0f}.bk-box.more{background:var(--sunken)}
.bk-box .es{color:inherit;opacity:.85}
.bk-rule{display:grid;grid-template-columns:1fr;gap:4px;padding:8px 0;border-top:1px dashed #0000001f}.bk-rule:first-of-type{border-top:0}
@media(min-width:700px){.bk-rule{grid-template-columns:1.2fr 1fr}}
.bk-rex{font-family:var(--read);font-size:1.02rem}
.bk-mi{display:flex;flex-direction:column;gap:2px;padding:8px 0;border-top:1px dashed #0000001f}.bk-mi:first-of-type{border-top:0}
.bk-mi .no{color:#b42318;text-decoration:line-through;text-decoration-thickness:1px}.bk-mi .ok{color:#147a3d;font-weight:700}.bk-mi .why{font-size:.92rem;font-style:italic}
.bk-exs{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;font-family:var(--read);font-size:1.05rem}
.bk-say{border:0;background:var(--accent-soft);border-radius:8px;min-width:32px;min-height:32px;margin-left:6px;cursor:pointer;font-size:1rem;vertical-align:middle}
.bk-say.slow{background:var(--sunken)}
.bk-vocs{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.bk-voc{border:1px solid var(--line);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:6px;background:var(--surface);border-top:5px solid var(--accent)}
.bk-vw{display:flex;align-items:center;flex-wrap:wrap;gap:4px}.bk-vw b{font-family:var(--read);font-size:1.3rem;margin-right:4px}
.bk-tag{font-size:.72rem;border-radius:999px;padding:2px 8px;background:var(--sunken);color:var(--muted);margin-left:4px}
.bk-fig{font-size:.95rem}.bk-fig b{letter-spacing:.04em;color:#b8452a}.bk-fig .ipa{color:var(--muted);font-size:.85rem}
.lab{font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:700}
.bk-es{font-weight:600;color:#5b4a8a}.bk-mean{font-size:.95rem}.bk-ex{font-family:var(--read);font-size:.98rem;border-top:1px solid var(--line);padding-top:6px}
.bk-read{font-family:var(--read);font-size:1.12rem;line-height:1.7}.bk-read p{margin:0 0 6px}
.bk-units{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.bk-ucard{display:flex;flex-direction:column;gap:4px;text-align:left;border:1px solid var(--line);border-radius:14px;padding:14px;background:var(--surface);cursor:pointer;font:inherit;color:inherit;border-left:6px solid var(--accent)}
.bk-ucard b{font-family:var(--display);font-size:1.05rem}.bk-ucard.soon{opacity:.7}
.bk-un{font-size:.75rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.bk-done{font-size:.8rem;color:var(--good);font-weight:700}
.bk-link{border:0;background:var(--accent);color:#fff;border-radius:8px;min-width:32px;min-height:32px;font-weight:800;cursor:pointer}
.bk-cb{display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border-radius:10px;background:var(--sunken);cursor:pointer}.bk-cb input{width:20px;height:20px;margin-top:2px}
.bk-score{font-weight:800;font-size:1.2rem;color:var(--good)}
.bk-intro{font-size:1.02rem}
.bk-tr summary{cursor:pointer;color:var(--accent);font-weight:600}`;
  document.head.appendChild(css);

  if (!VIEWS.some(x => x[0] === "book")) {
    const i = VIEWS.findIndex(x => x[0] === "library");
    VIEWS.splice(i < 0 ? 0 : i + 1, 0, ["book", "Book", '<path d="M4 4.5A1.5 1.5 0 015.5 3H20v16H5.5A1.5 1.5 0 004 20.5zM4 20.5A1.5 1.5 0 015.5 22H20M8 7h8M8 11h6"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-book")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-book"; sec.setAttribute("aria-label", "Student Book"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "book") draw(); }; try { render(); } catch (e) { } }
  }
})();

/* Teacher Dario · Teacher tools: worksheet, lesson plan, exam and placement test generator, and Student Book PDF. Teachers only. */
window.TOOLS = window.TOOLS || {};
(function () {
  if (typeof VIEWS === "undefined") return;
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const e = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = () => { if (!S.tools) S.tools = {}; const t = S.tools; t.lv = t.lv || "A1"; t.type = t.type || "ws"; t.units = t.units || {}; t.key = t.key !== false; t.school = t.school == null ? "Teacher Dario · English" : t.school; return t; };
  const store = () => { try { save(); } catch (x) { } };
  const isEx = lv => !!(window.TOOLS && TOOLS.EX && TOOLS.EX.isEx(lv));
  const lessons = lv => { if (isEx(lv)) return TOOLS.EX.units(lv); try { return (window.ALL_LESSONS || LESSONS).filter(l => l.level === lv); } catch (x) { return []; } };
  const allLessons = () => { try { return window.ALL_LESSONS || LESSONS; } catch (x) { return []; } };
  const BU = id => (window.BOOK && BOOK.units[id]) || {};
  let seed = 1; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const L = i => "abcdefgh"[i];
  const TYPES = [["ws", "Worksheet", "Hoja de trabajo"], ["lp", "Lesson plan", "Plan de clase"], ["ue", "Unit exam", "Examen de unidad"], ["le", "Level exam", "Examen de nivel"], ["pt", "Placement test", "Examen de ubicación"], ["bk", "Student Book PDF", "Libro en PDF"]];

  /* ---------- document pieces ---------- */
  const docHead = (title, sub) => { const t = T(); return `<header class="pd-head"><div><div class="pd-school">${e(t.school)}</div><h1>${e(title)}</h1><div class="pd-sub">${e(sub || "")}</div></div><div class="pd-lines"><span>Name · Nombre: ____________________________</span><span>Date · Fecha: ______________</span><span>Score · Calificación: _______</span></div></header>`; };
  const sec = (n, title, inst, body, pts) => `<section class="pd-sec"><h2><span>${n}</span> ${e(title)}${pts ? `<em>${pts} pts</em>` : ""}</h2>${inst ? `<p class="pd-inst">${e(inst)}</p>` : ""}${body}</section>`;
  const mcq = (qs, start) => `<ol class="pd-q" start="${start || 1}">${qs.map(q => `<li>${e(q.q).replace(/___/g, "_______")}<div class="pd-opts">${q.o.map((o, i) => `<span>${L(i)}) ${e(o)}</span>`).join("")}</div></li>`).join("")}</ol>`;
  const gaps = (vs, bank, start) => `${bank ? `<div class="pd-bank">${shuffle(vs.map(v => v[1])).map(w => `<span>${e(w)}</span>`).join("")}</div>` : ""}<ol class="pd-q" start="${start || 1}">${vs.map(v => `<li>${e(v[0]).replace(/___/g, "_______________")}</li>`).join("")}</ol>`;
  const match = g => { const ws = Object.keys(g); const ms = shuffle(ws.map(w => g[w])); return { html: `<div class="pd-match"><ol>${ws.map(w => `<li><b>${e(w)}</b> ____</li>`).join("")}</ol><ol type="a">${ms.map(m => `<li>${e(m)}</li>`).join("")}</ol></div>`, key: ws.map((w, i) => `${i + 1}-${L(ms.indexOf(g[w]))}`).join(" · ") }; };
  const writeLines = n => `<div class="pd-write">${Array.from({ length: n }, () => "<div></div>").join("")}</div>`;
  const keyBlock = items => T().key ? `<section class="pd-key"><h2>Answer key · Respuestas</h2>${items.map(x => `<p><b>${e(x[0])}</b> ${e(x[1])}</p>`).join("")}</section>` : "";
  const mcKey = (qs, start) => qs.map((q, i) => `${(start || 1) + i}-${L(q.a)}`).join(" · ");

  /* ---------- generators ---------- */
  function worksheet(l) {
    const U = BU(l.id); const m = match(l.g || {}); const gq = shuffle(l.gq || []).slice(0, 8); const vq = l.vq || [];
    let h = docHead(`${l.level} · ${l.title}`, `Worksheet · ${(l.gr && l.gr.t) || ""}`);
    h += sec("A", "Vocabulary: match the words and meanings", "Une cada palabra con su significado.", m.html);
    h += sec("B", "Vocabulary: complete the sentences", "Completa las oraciones con las palabras del recuadro.", gaps(vq, true));
    h += `<section class="pd-sec pd-gbox"><h2><span>✎</span> Grammar box · ${e((l.gr && l.gr.t) || "")}</h2><p>${e((l.gr && l.gr.r) || "")}</p><p><b>${e((l.gr && l.gr.f) || "")}</b></p>${U.concept ? `<p class="pd-es">${e(U.concept[1].replace(/\*\*/g, ""))}</p>` : ""}${l.gr && l.gr.tip ? `<p>⚠ ${e(l.gr.tip)}</p>` : ""}</section>`;
    h += sec("C", "Grammar: choose the correct answer", "Elige la respuesta correcta.", mcq(gq));
    h += sec("D", "Reading", "Lee el texto y responde.", `<div class="pd-read">${(l.s || []).map(x => e(x)).join(" ")}</div><ol class="pd-q"><li>${e(l.w || "What is the text about?")}</li><li>Find three words from Part A in the text.</li><li>Underline one example of the grammar in the text.</li></ol>`);
    h += sec("E", "Writing", `${l.min || 40}–${l.max || 80} words`, `<p><b>${e(l.prompt || "")}</b></p>${writeLines(8)}`);
    h += keyBlock([["A:", m.key], ["B:", vq.map((v, i) => `${i + 1}-${v[1]}`).join(" · ")], ["C:", mcKey(gq)]]);
    return h;
  }
  function lessonPlan(l) {
    const U = BU(l.id); const words = Object.keys(l.g || {});
    const can = (U.can || [[l.blurb || "", ""]]);
    const row = (t, stage, aim, proc) => `<tr><td><b>${t}</b></td><td><b>${e(stage)}</b><br><span class="pd-small">${e(aim)}</span></td><td>${proc}</td></tr>`;
    let h = `<header class="pd-head"><div><div class="pd-school">${e(T().school)}</div><h1>Lesson plan · ${e(l.level)} · ${e(l.title)}</h1><div class="pd-sub">Topic: ${e(l.topic)} · Grammar: ${e((l.gr && l.gr.t) || "")} · 60 minutes</div></div></header>`;
    h += sec("1", "Objectives · Objetivos", "", `<ul>${can.map(c => `<li>${e(c[0])}${c[1] ? ` <span class="pd-es">(${e(c[1])})</span>` : ""}</li>`).join("")}</ul>`);
    h += sec("2", "Materials · Materiales", "", `<ul><li>Student Book · ${e(l.level)} · ${e(l.title)} (Book tab)</li><li>Worksheet generated for this unit</li><li>Lesson ${e(l.title)} in the Library (reader with audio)</li><li>Board, markers, projector or phones</li></ul>`);
    h += sec("3", "Target language · Lenguaje meta", "", `<p><b>Vocabulary:</b> ${e(words.join(", "))}</p><p><b>Grammar:</b> ${e((l.gr && l.gr.t) || "")} — ${e((l.gr && l.gr.f) || "")}</p>${U.mist ? `<p><b>Anticipated problems:</b> ${U.mist.slice(0, 3).map(x => e(x[0]) + " → " + e(x[1])).join("; ")}</p>` : l.gr && l.gr.tip ? `<p><b>Anticipated problems:</b> ${e(l.gr.tip)}</p>` : ""}`);
    h += `<section class="pd-sec"><h2><span>4</span> Procedure · Procedimiento</h2><table class="pd-tbl"><thead><tr><th>Time</th><th>Stage</th><th>Procedure</th></tr></thead><tbody>
      ${row("5'", "Warm-up", "Activate the topic", `Ask: <i>${e(l.w || "What do you know about " + l.topic.toLowerCase() + "?")}</i> Students discuss in pairs, then share.`)}
      ${row("10'", "Vocabulary", "Present and practise new words", `Pre-teach: ${e(words.join(", "))}. Show images, model pronunciation (Book 🔊), drill chorally. Students match words and meanings (Worksheet A).`)}
      ${row("10'", "Reading / listening", "Understand the text", `Students listen to the lesson in the Reader and read along. Gist question, then detail: ${e(l.w || "")}`)}
      ${row("10'", "Grammar presentation", "Clarify meaning, form and pronunciation", `Elicit from the text: <i>${e(((l.gr && l.gr.ex) || [])[0] || "")}</i>. Board the form: ${e((l.gr && l.gr.f) || "")}. Concept-check questions. ${U.concept ? "Spanish support: " + e(U.concept[1].replace(/\*\*/g, "")) : ""}`)}
      ${row("10'", "Controlled practice", "Accuracy", `Worksheet C (grammar) and B (vocabulary gap fill). Check in pairs, then whole class.`)}
      ${row("10'", "Freer practice", "Fluency", `Speaking: students ask and answer about the topic using the target language. Writing: ${e(l.prompt || "")}`)}
      ${row("5'", "Wrap-up and homework", "Review", `“Now I can…” checklist from the Student Book. Homework: finish the writing task (${l.min || 40}–${l.max || 80} words) and complete the lesson in the dashboard.`)}
      </tbody></table></section>`;
    h += sec("5", "Assessment · Evaluación", "", `<ul><li>Monitor speaking and note errors for delayed correction.</li><li>Check worksheet answers (key provided).</li><li>Collect writing; use the dashboard writing feedback.</li></ul>`);
    return h;
  }
  function exam(ls, title, sub, nG, nV) {
    const G = shuffle(ls.flatMap(l => l.gq || [])).slice(0, nG); const V = shuffle(ls.flatMap(l => l.vq || [])).slice(0, nV); const R = ls[Math.floor(rnd() * ls.length)];
    const tf = shuffle((R.s || []).slice(0, 4)).map((x, i) => i % 2 ? [x.replace(/\b(is|are|was|were|has|have|can|will)\b/, m => ({ is: "isn't", are: "aren't", was: "wasn't", were: "weren't", has: "hasn't", have: "haven't", can: "can't", will: "won't" })[m]), "F"] : [x, "T"]);
    let h = docHead(title, sub);
    h += sec("1", "Grammar", "Choose the correct answer. · Elige la respuesta correcta.", mcq(G), G.length);
    h += sec("2", "Vocabulary", "Complete the sentences with the words in the box. · Completa con las palabras del recuadro.", gaps(V, true, G.length + 1), V.length);
    h += sec("3", "Reading", "Read and write T (true) or F (false). · Escribe T (verdadero) o F (falso).", `<div class="pd-read">${(R.s || []).map(e).join(" ")}</div><ol class="pd-q" start="${G.length + V.length + 1}">${tf.map(x => `<li>${e(x[0])} ____</li>`).join("")}</ol>`, tf.length);
    h += sec("4", "Writing", `${R.min || 40}–${R.max || 80} words · palabras`, `<p><b>${e(R.prompt || "")}</b></p>${writeLines(10)}`, 10);
    const total = G.length + V.length + tf.length + 10;
    h += `<p class="pd-total">Total: ____ / ${total}</p>`;
    h += keyBlock([["Grammar:", mcKey(G)], ["Vocabulary:", V.map((v, i) => `${G.length + 1 + i}-${v[1]}`).join(" · ")], ["Reading:", tf.map((x, i) => `${G.length + V.length + 1 + i}-${x[1]}`).join(" · ")], ["Writing (10):", "content 4 · organisation 2 · grammar 2 · vocabulary 2"]]);
    return h;
  }
  function placement() {
    const per = 5; let qs = []; LV.forEach(lv => { qs = qs.concat(shuffle(lessons(lv).flatMap(l => (l.gq || []).map(q => Object.assign({ lv }, q)))).slice(0, per)); });
    let h = docHead("Placement test · Examen de ubicación", "Levels A1 to C2 · 30 questions · 30 minutes");
    h += `<p class="pd-inst">Choose the correct answer. The questions get harder. If you don't know, leave it blank. · Elige la respuesta correcta. Las preguntas son cada vez más difíciles. Si no sabes, déjala en blanco.</p>`;
    h += sec("1", "Grammar and vocabulary", "", mcq(qs), 30);
    h += sec("2", "Writing (optional)", "Write about yourself, your studies or work and your plans for the future (60–120 words).", writeLines(10));
    h += sec("3", "Speaking (teacher)", "", `<ol><li>Tell me about yourself and your family. (A1–A2)</li><li>What did you do last weekend? What are your plans for next year? (A2–B1)</li><li>What would you do if you could live anywhere in the world? (B1–B2)</li><li>Do you think technology has made our lives better? Why? (B2–C1)</li><li>To what extent should governments control what people eat? (C1–C2)</li></ol>`);
    h += `<section class="pd-sec"><h2><span>★</span> Scoring · Resultado</h2><table class="pd-tbl"><thead><tr><th>Correct answers</th><th>Level</th></tr></thead><tbody>${[["0–5", "A1"], ["6–10", "A2"], ["11–15", "B1"], ["16–20", "B2"], ["21–25", "C1"], ["26–30", "C2"]].map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td></tr>`).join("")}</tbody></table><p class="pd-small">Adjust one level up or down using the writing and speaking.</p></section>`;
    h += keyBlock([["Answers:", mcKey(qs)], ["Levels:", "1–5 A1 · 6–10 A2 · 11–15 B1 · 16–20 B2 · 21–25 C1 · 26–30 C2"]]);
    return h;
  }
  function bookDoc(k) {
    if (!window.BOOK) return "";
    const st = BOOK.state(); const save_ = [st.c, st.u]; st.c = k; let h = "";
    if (BOOK.special[k]) { const sp = BOOK.special[k]; st.u = ""; h += sp.course(); const ids = { VERB: ["forms", "spell", "irr", "which", ...["A1", "A2", "B1", "B2", "C1", "C2", "PET", "FCE"].map(l => "lv:" + l)], VOC: ["pos", "wf", "col", "fig", ...["A1", "A2", "B1", "B2", "C1", "C2", "PET", "FCE"].map(l => "w:" + l)], PET: ["ref", "g", "v", "pv2", "col", "lk", "w", "s", "x"], FCE: ["ref", "g", "pv", "pv2", "ex", "col", "wf", "kwt", "up", "lk", "w", "s"] }[k] || []; ids.forEach(id => { h += `<div class="pd-break"></div>` + sp.unit(id); }); }
    else { h += BOOK.renderCourse(k); BOOK.lessonsOf(k).forEach(l => { h += `<div class="pd-break"></div>` + BOOK.renderUnit(l.id); }); if (BOOK.corePrint && window.CORE && CORE.lv[k]) h += `<div class="pd-break"></div>` + BOOK.corePrint(k); }
    st.c = save_[0]; st.u = save_[1];
    return `<div class="pd-book">${h}</div>`;
  }
  TOOLS.bookDoc = bookDoc;

  /* ---------- print ---------- */
  function printHTML(html, title) {
    let root = document.getElementById("pd-root"); if (!root) { root = document.createElement("div"); root.id = "pd-root"; document.body.appendChild(root); }
    root.innerHTML = `<div class="pd-bar"><b>${e(title)}</b><span>Use “Save as PDF” in the print window · Usa “Guardar como PDF”</span><button class="btn primary" type="button" data-tools="print">🖨 Print / Save PDF</button><button class="btn" type="button" data-tools="close">✕ Close</button></div><div class="pd-page">${html}</div>`;
    document.body.classList.add("pd-open"); window.scrollTo(0, 0);
    const old = document.title; document.title = title;
    setTimeout(() => { try { window.print(); } catch (x) { } document.title = old; }, 400);
  }
  TOOLS.print = printHTML;

  /* ---------- view ---------- */
  function html() {
    const t = T(); const ls = lessons(t.lv); const sel = ls.filter(l => t.units[l.id]);
    const needUnits = ["ws", "lp", "ue"].includes(t.type) || (t.type === "le" && isEx(t.lv)), needLv = t.type !== "pt";
    let h = `<div class="head"><div><h1>Teacher tools</h1><p class="sub">Herramientas del maestro · Worksheets, lesson plans, exams and placement tests · Teachers only</p></div></div>
    <div class="card"><h2>1 · What do you want to create? <span class="sub">¿Qué quieres crear?</span></h2><div class="seg" role="group">${TYPES.map(x => `<button class="chip" type="button" data-tools="type" data-v="${x[0]}" aria-pressed="${t.type === x[0]}">${isEx(t.lv) && x[0] === "ue" ? "Exam paper (Reading)" : isEx(t.lv) && x[0] === "le" ? "Full mock exam" : x[1]}</button>`).join("")}</div></div>`;
    if (needLv) h += `<div class="card"><h2>2 · Level or course <span class="sub">Nivel o curso</span></h2><div class="seg" role="group">${(t.type === "bk" ? [...LV, "VOC", "VERB", "PET", "FCE"] : [...LV, "PET", "FCE"]).map(l => `<button class="chip" type="button" data-tools="lv" data-v="${l}" aria-pressed="${t.lv === l}">${l === "VOC" ? "Vocabulary" : l === "VERB" ? "Verbs" : l}</button>`).join("")}</div></div>`;
    if (needUnits && (LV.includes(t.lv) || isEx(t.lv))) h += `<div class="card"><div class="row" style="justify-content:space-between"><h2>3 · ${isEx(t.lv) ? "Practice tests" : "Units"} <span class="sub">${isEx(t.lv) ? "Exámenes de práctica" : "Unidades"}</span></h2><span class="row"><button class="btn" type="button" data-tools="all">Select all</button><button class="btn ghost" type="button" data-tools="none">Clear</button></span></div><div class="tl-units">${ls.map((l, i) => `<label class="tl-u"><input type="checkbox" data-tools-u="${l.id}" ${t.units[l.id] ? "checked" : ""}> <span><b>${isEx(t.lv) ? e(l.title) : `Unit ${i + 1} · ${e(l.title)}`}</b><br><span class="sub">${e((l.gr && l.gr.t) || "")}</span></span></label>`).join("")}</div>${isEx(t.lv) ? `<p class="sub">${{ ws: "Worksheet per test: Use of English / vocabulary, phrasal verbs, expressions and speaking.", lp: "60-minute exam-skills lesson plan per test.", ue: (t.lv === "PET" ? "Reading paper" : "Reading and Use of English paper") + " per test, with answer key.", le: "Full mock exam per test: Reading, Writing, Listening (with transcripts) and Speaking examiner's card." }[t.type] || ""}</p>` : t.type !== "ue" ? `<p class="sub">One document per selected unit. · Un documento por cada unidad seleccionada.</p>` : ""}</div>`;
    h += `<div class="card"><h2>${needLv ? (needUnits ? 4 : 3) : 2} · Options <span class="sub">Opciones</span></h2><div class="row"><label class="row" style="gap:6px"><input type="checkbox" data-tools="key" ${t.key ? "checked" : ""}> Include answer key · Incluir respuestas</label><label class="sub" for="tl-school">Header</label><input id="tl-school" class="search" value="${e(t.school)}" style="max-width:280px"></div>
      <div class="row" style="margin-top:12px"><button class="btn primary" type="button" data-tools="go" ${needUnits && !sel.length ? "disabled" : ""}>✨ Create and open PDF · Crear PDF</button>${needUnits && !sel.length ? `<span class="sub">Select at least one unit.</span>` : ""}</div></div>
      <p class="tip">Every document is built from the dashboard's lessons and Student Book, so it matches what your students study. Each time you create an exam, the questions are mixed in a new order.</p>`;
    return h;
  }
  function draw() { const v = document.getElementById("v-tools"); if (v) v.innerHTML = html(); }
  TOOLS.draw = draw;
  function generate() {
    const t = T(); seed = (Date.now() % 233280) || 7; const ls = lessons(t.lv).filter(l => t.units[l.id]); let out = "", title = "";
    if (isEx(t.lv) && ["ws", "lp", "ue", "le"].includes(t.type)) { const r = TOOLS.EX.generate(t.type, t.lv, ls.map(l => l.id)); printHTML(r[0], r[1] + " · Teacher Dario"); return; }
    if (t.type === "ws") { out = ls.map(worksheet).join('<div class="pd-break"></div>'); title = `Worksheet ${t.lv}`; }
    if (t.type === "lp") { out = ls.map(lessonPlan).join('<div class="pd-break"></div>'); title = `Lesson plan ${t.lv}`; }
    if (t.type === "ue") { out = exam(ls, `Unit exam · ${t.lv}`, ls.map(l => l.title).join(" · "), Math.min(20, ls.length * 8), Math.min(10, ls.length * 5)); title = `Exam ${t.lv}`; }
    if (t.type === "le") { const all = lessons(t.lv); out = exam(all, `Level exam · ${t.lv}`, "All units · Todas las unidades", 25, 15); title = `Level exam ${t.lv}`; }
    if (t.type === "pt") { out = placement(); title = "Placement test"; }
    if (t.type === "bk") { out = bookDoc(t.lv); title = `Student Book ${t.lv}`; }
    printHTML(out, title + " · Teacher Dario");
  }
  document.addEventListener("click", ev => {
    const b = ev.target.closest("[data-tools]"); if (!b) return; const a = b.dataset.tools; const t = T();
    if (a === "print") { window.print(); return; }
    if (a === "close") { document.body.classList.remove("pd-open"); const r = document.getElementById("pd-root"); if (r) r.innerHTML = ""; return; }
    if (a === "bookpdf") { printHTML(bookDoc(b.dataset.v), "Student Book " + b.dataset.v + " · Teacher Dario"); return; }
    if (!b.closest("#v-tools")) return;
    if (a === "type") { t.type = b.dataset.v; if (t.type === "pt" || (t.type !== "bk" && !LV.includes(t.lv) && !isEx(t.lv))) t.lv = "A1"; }
    if (a === "lv") { t.lv = b.dataset.v; }
    if (a === "all") lessons(t.lv).forEach(l => t.units[l.id] = true);
    if (a === "none") lessons(t.lv).forEach(l => delete t.units[l.id]);
    if (a === "go") { generate(); return; }
    store(); draw();
  });
  document.addEventListener("change", ev => {
    const el = ev.target; if (!el.closest || !el.closest("#v-tools")) return; const t = T();
    if (el.dataset.toolsU) { if (el.checked) t.units[el.dataset.toolsU] = true; else delete t.units[el.dataset.toolsU]; store(); draw(); }
    if (el.dataset.tools === "key") { t.key = el.checked; store(); }
    if (el.id === "tl-school") { t.school = el.value; store(); }
  });

  const css = document.createElement("style");
  css.textContent = `.tl-units{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}.tl-u{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--line);border-radius:10px;padding:10px;cursor:pointer;background:var(--surface)}.tl-u input{width:20px;height:20px;margin-top:2px}
#pd-root{display:none}body.pd-open #pd-root{display:block;position:fixed;inset:0;z-index:100;overflow:auto;background:#e9ecf1}
.pd-bar{position:sticky;top:0;display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:10px 16px;background:#1f2937;color:#fff;z-index:2}.pd-bar span{opacity:.8;font-size:.85rem;flex:1}.pd-bar .btn:not(.primary){color:#111;background:#fff}
.pd-page{max-width:820px;margin:16px auto;background:#fff;color:#111;padding:28px 34px;box-shadow:0 2px 12px #0002;font-family:Georgia,serif;font-size:14px;line-height:1.5}
.pd-head{display:flex;justify-content:space-between;gap:16px;border-bottom:3px solid #1f4e9c;padding-bottom:10px;margin-bottom:14px;flex-wrap:wrap}.pd-head h1{font-family:Arial,sans-serif;font-size:22px;margin:2px 0;color:#1f4e9c}.pd-school{font:700 11px Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#555}.pd-sub{font:13px Arial,sans-serif;color:#444}
.pd-lines{display:flex;flex-direction:column;gap:6px;font:12px Arial,sans-serif}
.pd-sec{margin:14px 0;break-inside:avoid-page}.pd-sec h2{font:700 15px Arial,sans-serif;display:flex;gap:8px;align-items:center;border-bottom:1px solid #ccc;padding-bottom:4px;margin:0 0 6px}.pd-sec h2 span{background:#1f4e9c;color:#fff;border-radius:6px;padding:1px 8px}.pd-sec h2 em{margin-left:auto;font-style:normal;color:#777;font-weight:400}
.pd-inst{font:italic 12.5px Arial,sans-serif;color:#444;margin:0 0 6px}.pd-q li{margin:6px 0}.pd-opts{display:flex;flex-wrap:wrap;gap:6px 22px;margin-top:2px}
.pd-bank{display:flex;flex-wrap:wrap;gap:6px;border:1.5px dashed #1f4e9c;border-radius:8px;padding:8px;margin-bottom:6px}.pd-bank span{font:700 13px Arial,sans-serif;padding:2px 8px;background:#eef3ff;border-radius:6px}
.pd-match{display:grid;grid-template-columns:1fr 2fr;gap:12px}.pd-match ol{margin:0;padding-left:22px}.pd-match li{margin:5px 0}
.pd-gbox{border:2px solid #f1d27a;background:#fff8e1;border-radius:10px;padding:10px 12px}.pd-gbox h2 span{background:#b8740a}
.pd-read{border-left:4px solid #1f4e9c;padding:6px 12px;background:#f6f8fc;margin-bottom:6px}
.pd-write div{border-bottom:1px solid #999;height:26px}.pd-es{color:#5b4a8a;font-style:italic}.pd-small{font-size:12px;color:#555}
.pd-tbl{width:100%;border-collapse:collapse;font:13px Arial,sans-serif}.pd-tbl th,.pd-tbl td{border:1px solid #bbb;padding:6px 8px;vertical-align:top;text-align:left}.pd-tbl th{background:#eef3ff}
.pd-key{margin-top:18px;border-top:2px dashed #999;padding-top:8px;break-before:page}.pd-key h2{font:700 15px Arial,sans-serif;color:#b42318}.pd-total{text-align:right;font:700 15px Arial,sans-serif}
.pd-break{break-after:page;height:0;border-top:1px dashed #ccc;margin:26px 0}
.pd-book .bk-say,.pd-book button,.pd-book input[type=checkbox],.pd-book .bk-courses,.pd-book .bk-tog,.pd-book .row:has(>.btn){display:none!important}.pd-book .bk-units{display:none}
@media print{body.pd-open>*:not(#pd-root){display:none!important}body.pd-open #pd-root{position:static;overflow:visible;background:#fff}.pd-bar{display:none!important}.pd-page{box-shadow:none;margin:0;max-width:none;padding:0}@page{margin:14mm}.pd-break{border:0;margin:0}.card{box-shadow:none!important}}`;
  document.head.appendChild(css);

  if (!VIEWS.some(x => x[0] === "tools")) {
    VIEWS.push(["tools", "Tools", '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-tools")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-tools"; sec.setAttribute("aria-label", "Teacher tools"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "tools") draw(); }; try { render(); } catch (x) { } }
  }
})();

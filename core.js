/* Teacher Dario · Core Curriculum in the Student Book.
   Content mapped to the British Council–EAQUALS "Core Inventory for General English" (A1–C1) + a C2 extension.
   Each level: functions, discourse, grammar, vocabulary and topics, each point with explanation (EN/ES), examples with audio, practice and a level project. */
window.CORE = window.CORE || { lv: {}, add(k, d) { this.lv[k] = d; } };
(function () {
  const CATS = [["f", "Functions", "Funciones", "💬"], ["d", "Discourse", "Discurso", "🔗"], ["g", "Grammar", "Gramática", "📐"], ["v", "Vocabulary", "Vocabulario", "📚"], ["t", "Topics", "Temas", "🗂️"]];
  const e = t => (window.BOOK && BOOK.esc) ? BOOK.esc(t) : String(t == null ? "" : t);
  const md = t => ((window.BOOK && BOOK.md) ? BOOK.md(t) : e(t)).replace(/(^|[^*\w])\*([^*<>\n]+?)\*(?!\*)/g, "$1<i>$2</i>");
  const sp = t => (window.BOOK && BOOK.sp) ? BOOK.sp(t) : "";
  const ES = () => { try { return BOOK.state().es; } catch (x) { return true; } };
  const store = () => { try { save(); } catch (x) { } };
  const st = () => { if (!S.core) S.core = {}; return S.core; };
  const lvSt = k => { const s = st(); return s[k] || (s[k] = {}); };
  const pts = k => ((CORE.lv[k] || {}).p || []);
  const two = s => String(s).split("|");
  /* deterministic option order so the answer is not always in the same place */
  const hash = s => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
  function order(q) { const n = q[1].length, idx = [...Array(n).keys()], h = hash(q[0]); for (let i = n - 1; i > 0; i--) { const j = (h >>> (i * 3)) % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; } return idx; }
  const isDone = (k, i) => { const p = pts(k)[i]; const r = lvSt(k)[i] || {}; return p && p[5].every((q, j) => r["q" + j] === q[2]); };
  const prog = k => { const P = pts(k); return [P.filter((p, i) => isDone(k, i)).length, P.length]; };

  /* ---------- course card (inside the level page) ---------- */
  BOOK.coreCard = function (k) {
    const C = CORE.lv[k]; if (!C) return "";
    const r = prog(k), byCat = CATS.map(c => [c, C.p.filter(p => p[0] === c[0]).length]).filter(x => x[1]);
    return `<section class="card bk-sec cc-card"><div class="cc-top"><div><span class="cc-kick">${C.ext ? "C2 extension · Extensión C2" : "Core Curriculum · Plan de estudios oficial"}</span><h2>📘 ${C.ext ? "Mastery syllabus" : "Core Inventory"} ${k}</h2><p class="sub">${C.ext ? "Beyond the British Council–EAQUALS Core Inventory (which ends at C1)." : "Mapped to the British Council–EAQUALS Core Inventory for General English."} ${e(C.p.length)} points · ${byCat.map(x => x[0][3] + " " + x[1]).join(" · ")}</p></div><div class="cc-ring"><b>${r[0]}/${r[1]}</b><span>✅</span></div></div>
      <div class="cc-bar"><i style="width:${Math.round(100 * r[0] / Math.max(1, r[1]))}%"></i></div>
      <div class="row" style="gap:8px;margin-top:10px"><button class="btn primary" type="button" data-bk="unit" data-v="core:${k}">Study the curriculum · Estudiar ➜</button>${C.project ? `<button class="btn" type="button" data-bk="unit" data-v="core:${k}:project">🛠 Level project · Proyecto</button>` : ""}</div></section>`;
  };

  /* ---------- curriculum page ---------- */
  function pointHTML(k, p, i, print) {
    const [cat, title, ren, res, ex, qs] = p; const T = two(title); const r = lvSt(k)[i] || {}; const done = isDone(k, i); const C = CATS.find(c => c[0] === cat);
    let h = `<div class="cc-pt ${done ? "done" : ""}" id="cc-${k}-${i}"><div class="cc-ph"><span class="cc-cat c-${cat}">${C[3]} ${C[1]}</span><b>${i + 1}. ${e(T[0])}</b>${ES() && T[1] ? `<span class="es">${e(T[1])}</span>` : ""}${done ? `<span class="cc-ok">✅</span>` : ""}</div>`;
    h += `<div class="cc-rule"><p>${md(ren)}</p>${ES() ? `<p class="es">${md(res)}</p>` : ""}</div>`;
    h += `<ul class="cc-ex">${ex.map(x => { const [a, b] = two(x); return `<li><span lang="en">${md(a)}</span> ${print ? "" : sp(a.replace(/\*\*/g, ""))}${ES() && b ? `<br><span class="es">${e(b)}</span>` : ""}</li>`; }).join("")}</ul>`;
    h += `<div class="cc-prac"><span class="cc-lab">✍️ Practice · Práctica</span>${qs.map((q, j) => { const o = order(q); const a = r["q" + j]; return `<div class="cc-q"><div class="cc-stem">${j + 1}. ${e(q[0])}</div><div class="cc-opts">${o.map((oi, n) => { const cls = a == null ? "" : oi === q[2] && a === oi ? "ok" : a === oi ? "no" : ""; return print ? `<span>${"abc"[n]}) ${e(q[1][oi])}</span>` : `<button type="button" class="cc-o ${cls}" data-cc="${k}|${i}|${j}|${oi}">${e(q[1][oi])}</button>`; }).join("")}</div>${!print && a != null ? `<div class="cc-fb ${a === q[2] ? "ok" : "no"}">${a === q[2] ? "✅ Correct · Correcto" : "↺ Try again · Inténtalo otra vez"}</div>` : ""}</div>`; }).join("")}</div></div>`;
    return h;
  }
  function pageCurriculum(k) {
    const C = CORE.lv[k]; if (!C) return `<p class="sub">No curriculum for this level.</p>`;
    const f = lvSt(k)._f || ""; const r = prog(k);
    let h = `<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-bk="course" data-v="${k}">← ${e(BOOK.cName ? BOOK.cName(k)[0] : k)}</button>${C.project ? `<button class="btn" type="button" data-bk="unit" data-v="core:${k}:project">🛠 Level project</button>` : ""}</div>
      <div class="bk-uhead lv-${k}"><span class="bk-kicker">${C.ext ? "C2 extension · beyond the Core Inventory" : "Core Inventory · British Council–EAQUALS"}</span><h1>${k} Core Curriculum</h1><p>${md(C.intro[0])}</p>${ES() ? `<p class="es">${md(C.intro[1])}</p>` : ""}</div>
      <div class="card cc-sum"><div class="cc-bar"><i style="width:${Math.round(100 * r[0] / Math.max(1, r[1]))}%"></i></div><span><b>${r[0]} / ${r[1]}</b> points mastered · puntos dominados</span>
      <div class="sp-chips cc-f">${[["", "All · Todo", "🔎"]].concat(CATS.filter(c => C.p.some(p => p[0] === c[0])).map(c => [c[0], c[1] + " · " + c[2], c[3]])).map(c => `<button type="button" class="chip ${f === c[0] ? "on" : ""}" data-ccf="${k}|${c[0]}">${c[2]} ${e(c[1])}</button>`).join("")}</div></div>
      <details class="card cc-map"><summary>🗺️ Curriculum map · Mapa del plan (${C.p.length})</summary><ol>${C.p.map((p, i) => `<li class="${isDone(k, i) ? "done" : ""}"><a href="#cc-${k}-${i}" data-ccgo="${k}-${i}">${e(two(p[1])[0])}</a></li>`).join("")}</ol></details>`;
    h += C.p.map((p, i) => (!f || p[0] === f) ? pointHTML(k, p, i) : "").join("");
    h += `<p class="sub cc-src">Syllabus points based on <i>A Core Inventory for General English</i> (British Council / EAQUALS, 2011). Explanations, examples and exercises © Teacher Dario.</p>`;
    return h;
  }
  function pageProject(k, print) {
    const C = CORE.lv[k]; const P = C && C.project; if (!P) return "";
    const s = lvSt(k), chk = s._proj || {};
    let h = print ? "" : `<div class="row"><button class="btn ghost" type="button" data-bk="unit" data-v="core:${k}">← ${k} Core Curriculum</button></div>`;
    h += `<div class="bk-uhead lv-${k}"><span class="bk-kicker">Level project · Proyecto del nivel ${k}</span><h1>${e(P.t[0])}</h1>${ES() ? `<p class="es">${e(P.t[1])}</p>` : ""}</div>
      <section class="card bk-sec"><h2 class="bk-h3">🧭 Steps · Pasos</h2><ol class="cc-steps">${P.steps.map((x, i) => `<li>${print ? "" : `<label><input type="checkbox" data-ccp="${k}|${i}" ${chk[i] ? "checked" : ""}> `}<span>${e(x[0])}</span>${ES() ? `<br><span class="es">${e(x[1])}</span>` : ""}${print ? "" : "</label>"}</li>`).join("")}</ol></section>
      <section class="card bk-sec"><h2 class="bk-h3">🗣️ Language to use · Lenguaje útil</h2><ul class="cc-lang">${P.lang.map(x => `<li><b>${e(x)}</b> ${print ? "" : sp(x.replace(/…/g, ""))}</li>`).join("")}</ul></section>
      <section class="card bk-sec"><h2 class="bk-h3">⭐ How it is assessed · Cómo se evalúa</h2><table class="bk-syl"><thead><tr><th>Criterion · Criterio</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>${P.rubric.map(x => `<tr><td><b>${e(x[0])}</b>${ES() ? `<br><span class="es">${e(x[1])}</span>` : ""}</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>`).join("")}</tbody></table></section>`;
    return h;
  }
  BOOK.coreUnit = id => { const [, k, sub] = id.split(":"); return sub === "project" ? pageProject(k) : pageCurriculum(k); };

  /* ---------- printable (Student Book PDF) ---------- */
  BOOK.corePrint = function (k) {
    const C = CORE.lv[k]; if (!C) return "";
    let h = `<div class="bk-uhead lv-${k}"><span class="bk-kicker">${C.ext ? "C2 extension" : "Core Inventory · British Council–EAQUALS"}</span><h1>${k} Core Curriculum</h1><p>${md(C.intro[0])}</p>${ES() ? `<p class="es">${md(C.intro[1])}</p>` : ""}</div>`;
    h += C.p.map((p, i) => pointHTML(k, p, i, true)).join("");
    h += `<section class="pd-key"><h2>Answer key · Respuestas</h2><p>${C.p.map((p, i) => `<b>${i + 1}.</b> ${p[5].map((q, j) => `${j + 1}-${"abc"[order(q).indexOf(q[2])]}`).join(" ")}`).join(" · ")}</p></section>`;
    if (C.project) h += `<div class="pd-break"></div>` + pageProject(k, true);
    return h;
  };
  BOOK.coreProgress = prog;

  /* ---------- events ---------- */
  document.addEventListener("click", ev => {
    const o = ev.target.closest("[data-cc]");
    if (o) { const [k, i, j, oi] = o.dataset.cc.split("|"); const s = lvSt(k); const r = s[i] || (s[i] = {}); r["q" + j] = +oi; store(); const y = window.scrollY; BOOK.draw(); window.scrollTo(0, y); return; }
    const f = ev.target.closest("[data-ccf]");
    if (f) { const [k, c] = f.dataset.ccf.split("|"); lvSt(k)._f = c; store(); BOOK.draw(); return; }
    const g = ev.target.closest("[data-ccgo]");
    if (g) { ev.preventDefault(); const k = g.dataset.ccgo.split("-")[0]; lvSt(k)._f = ""; BOOK.draw(); setTimeout(() => { const el = document.getElementById("cc-" + g.dataset.ccgo); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); }
  });
  document.addEventListener("change", ev => {
    const c = ev.target.closest && ev.target.closest("[data-ccp]"); if (!c) return;
    const [k, i] = c.dataset.ccp.split("|"); const s = lvSt(k); s._proj = s._proj || {}; s._proj[i] = c.checked; store();
  });

  const css = document.createElement("style");
  css.textContent = `
.cc-card{border:2px solid #2453c9;background:linear-gradient(135deg,#f4f7ff,#fff)}.cc-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.cc-top h2{margin:2px 0 4px}
.cc-kick{font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#2453c9}
.cc-ring{min-width:70px;height:70px;border-radius:50%;border:4px solid #2453c9;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:.85rem}.cc-ring b{font-size:1rem}
.cc-bar{height:8px;background:var(--line);border-radius:6px;overflow:hidden;margin-top:8px}.cc-bar i{display:block;height:100%;background:linear-gradient(90deg,#2453c9,#34a36b)}
.cc-sum{display:flex;flex-direction:column;gap:8px}.cc-f{margin-top:4px}
.cc-map summary{cursor:pointer;font-weight:700}.cc-map ol{columns:2;column-gap:24px;margin:8px 0 0;padding-left:22px}.cc-map li{break-inside:avoid;margin:2px 0}.cc-map li.done a{color:#15803d}.cc-map li.done::marker{color:#15803d}
.cc-pt{background:var(--surface);border:1px solid var(--line);border-left:5px solid #2453c9;border-radius:14px;padding:12px 14px;margin:12px 0;scroll-margin-top:80px;break-inside:avoid}.cc-pt.done{border-left-color:#34a36b}
.cc-ph{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.cc-ph b{font-size:1.08rem}.cc-ph .es{color:#5b4a8a;font-style:italic;font-size:.92rem}.cc-ok{margin-left:auto}
.cc-cat{font-size:.7rem;font-weight:800;border-radius:999px;padding:2px 8px;background:#eef3ff;color:#1f3f8f;text-transform:uppercase;letter-spacing:.04em}.cc-cat.c-f{background:#fff1e6;color:#9a4b00}.cc-cat.c-d{background:#efe9ff;color:#5b3fb0}.cc-cat.c-v{background:#e7f8ee;color:#15803d}.cc-cat.c-t{background:#fdecf3;color:#a3215b}
.cc-rule{background:#f6f8fc;border-radius:10px;padding:8px 12px;margin:8px 0}.cc-rule p{margin:3px 0}.cc-rule .es,.cc-ex .es,.cc-steps .es{color:#5b4a8a;font-size:.92rem}
.cc-ex{margin:6px 0;padding-left:20px}.cc-ex li{margin:5px 0}
.cc-prac{border-top:1px dashed var(--line);padding-top:8px;margin-top:6px}.cc-lab{font-weight:800;font-size:.85rem}
.cc-q{margin:8px 0}.cc-stem{font-weight:600;margin-bottom:4px}.cc-opts{display:flex;flex-wrap:wrap;gap:6px}.cc-opts span{margin-right:12px}
.cc-o{border:1.5px solid var(--line);background:var(--surface);border-radius:10px;padding:6px 10px;font-family:inherit;font-size:.92rem;cursor:pointer;color:inherit}.cc-o:hover{border-color:#2453c9}.cc-o.ok{background:#e7f8ee;border-color:#34a36b;color:#15803d;font-weight:700}.cc-o.no{background:#fdecec;border-color:#e35d5d;color:#b42318}
.cc-fb{font-size:.85rem;font-weight:700;margin-top:3px}.cc-fb.ok{color:#15803d}.cc-fb.no{color:#b42318}
.cc-steps li{margin:6px 0}.cc-lang{columns:2}.cc-src{margin-top:14px;font-size:.78rem}
@media (max-width:760px){.cc-map ol,.cc-lang{columns:1}.cc-ring{min-width:56px;height:56px}}
.pd-book .cc-pt{border-left-width:4px;padding:8px 10px}.pd-book .cc-opts span{font-size:13px}`;
  document.head.appendChild(css);
})();

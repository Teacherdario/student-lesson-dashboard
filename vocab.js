/* Teacher Dario · Vocabulary course (A1–C2): word lists, "build the sentence" and word-building practice. Uses DICT_DATA. */
(function () {
  const D = window.DICT_DATA; if (!D || typeof VIEWS === "undefined") return;
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const escH = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const E = D.entries.map((r, i) => ({ i, w: r[0], t: r[1], c: r[2], p: r[3], es: r[4], e: r[7], xs: r[11] || "" }));
  const WB = D.wb || [];
  const COMMON = new Set(); const CE = window.CEFR_EST || {}; ["A1", "A2", "B1", "B2"].forEach(l => String(CE[l] || "").split(" ").forEach(w => COMMON.add(w)));
  ["mexico", "messi", "shakira", "london", "paris", "spain", "canada"].forEach(w => COMMON.delete(w));
  const GROUPS = [["noun", "Nouns · Sustantivos"], ["verb", "Verbs · Verbos"], ["adjective", "Adjectives · Adjetivos"], ["adverb", "Adverbs · Adverbios"], ["phrase", "Phrasal verbs & expressions · Verbos frasales y expresiones"], ["other", "Other words · Otras palabras"]];
  const grp = t => ["noun", "verb", "adjective", "adverb"].includes(t) ? t : (t === "phrasal verb" || t === "expression") ? "phrase" : "other";
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nrm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' -]/g, "").replace(/\s+/g, " ").trim();
  function V() { if (!S.voc) S.voc = {}; const v = S.voc; v.lv = v.lv || (LV.includes(window.TD_LEVEL) ? window.TD_LEVEL : "A1"); v.mode = v.mode || "list"; v.best = v.best || {}; return v; }
  const store = () => { try { save(); } catch (e) { } };

  /* ---------- build the sentence ---------- */
  function sbItems(lv) {
    const pool = E.filter(e => e.c === lv && e.e && e.xs && e.e.split(" ").length >= 4 && e.e.split(" ").length <= 14);
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
  function wbItems(lv) { return shuffle(WB.filter(x => x[0] === lv)).slice(0, 10).map(x => ({ s: x[1], root: x[2], a: x[3].split("/"), v: "" })); }
  const wbOK = q => q.a.some(a => nrm(a) === nrm(q.v));

  function fb(score, n, lv, kind) {
    const p = score / n; const next = LV[LV.indexOf(lv) + 1];
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
    const L = E.filter(e => e.c === lv).sort((a, b) => a.w.localeCompare(b.w));
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
  function html() {
    const v = V();
    const counts = Object.fromEntries(LV.map(l => [l, E.filter(e => e.c === l).length]));
    return `<div class="head"><h1>Vocabulary</h1><span class="sub">Vocabulario · A1 to C2 · ${bestLine(v.lv)}</span></div>
      <div class="seg" role="group" aria-label="Level">${LV.map(l => `<button class="chip" type="button" data-voc="lv" data-v="${l}" aria-pressed="${v.lv === l}"><span class="lvl ${l}">${l}</span> <span class="sub">${counts[l]}</span></button>`).join("")}</div>
      <div class="seg sm" role="group" aria-label="Activity" style="margin:10px 0 14px">${[["list", "Word list · Lista"], ["sb", "Build the sentence · Ordena"], ["wb", "Word building · Forma palabras"]].map(([k, l]) => `<button class="chip" type="button" data-voc="mode" data-v="${k}" aria-pressed="${v.mode === k}">${l}</button>`).join("")}</div>
      ${v.mode === "list" ? `<div class="card">${listHTML(v.lv)}</div>` : v.mode === "sb" ? sbHTML(v) : wbHTML(v)}`;
  }
  function draw() { const s = document.getElementById("v-vocab"); if (s) s.innerHTML = html(); }

  /* ---------- events ---------- */
  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-voc]"); if (!b) return; const a = b.dataset.voc; const v = V();
    if (a === "lv") { v.lv = b.dataset.v; }
    else if (a === "mode") { v.mode = b.dataset.v; }
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
  document.addEventListener("input", ev => { const i = ev.target; if (!i.dataset || i.dataset.vocWb === undefined) return; const v = V(); if (v.wb && v.wb.items[+i.dataset.vocWb]) { v.wb.items[+i.dataset.vocWb].v = i.value; store(); } });

  /* ---------- styles ---------- */
  const st = document.createElement("style");
  st.textContent = `.vh{margin:16px 0 6px}.vlist{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
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
  window.VOCAB = { html, draw };
})();

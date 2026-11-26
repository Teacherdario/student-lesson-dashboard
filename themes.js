/* Teacher Dario · Vocabulary themes (places): 20 themes × 50 words tagged A1–C2, a scene photo, numbered word cards,
   and a workbook for every level (reading + true/false, fill the text, word bank, multiple choice, spelling, writing).
   Data: th-1..4.js · photos: thimg-scenes.js + thimg-<id>.js (lazy). Exercises are seeded so the PDF matches the app. */
(function () {
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const POS = { n: ["noun", "sustantivo"], v: ["verb", "verbo"], adj: ["adjective", "adjetivo"], adv: ["adverb", "adverbio"], ph: ["phrasal verb", "verbo frasal"], exp: ["expression", "expresión"] };
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = [];
  const pend = (window.THEMES && window.THEMES._q) || [];
  function add(arr) {
    arr.forEach(t => {
      const ti = T.length;
      T.push({ id: t.id, en: t.en, es: t.es, em: t.em, ti, r: t.r, w: t.w.map((s, i) => { const p = s.split("|"); return { key: `th${ti}-${i}`, n: i + 1, w: p[0], pos: p[1], l: +p[2], lv: LV[+p[2] - 1], es: p[3], m: p[4], e: p[5], xe: p[6], syn: p[7] ? p[7].split(/\s*,\s*/).filter(Boolean) : [] }; }) });
    });
    later();
  }
  let rt = 0; const later = () => { clearTimeout(rt); rt = setTimeout(() => { try { if (typeof curView === "function" && curView() === "vocab" && window.VOCAB) VOCAB.draw(); } catch (e) { } }, 40); };
  const API = window.THEMES = { add, list: T, refresh: () => later() };
  pend.forEach(add);

  /* ---------- helpers ---------- */
  const img = k => (window.TH_IMG || {})[k];
  const credit = k => (window.TH_CREDIT || {})[k];
  const BASE = (() => { try { const c = document.currentScript && document.currentScript.src; return c ? c.replace(/[^/]*$/, "") : ""; } catch (e) { return ""; } })();
  const loaded = {};
  function need(file) { if (loaded[file]) return; loaded[file] = 1; const s = document.createElement("script"); s.src = BASE + file; s.async = true; s.onerror = () => { loaded[file] = 0; }; document.head.appendChild(s); }
  const lvNum = lv => lv === "PET" ? 3 : lv === "FCE" ? 4 : Math.max(1, LV.indexOf(lv) + 1);
  const band = n => n <= 2 ? "A" : n <= 4 ? "B" : "C";
  const ipa = w => { const L = window.LEX_IPA || {}; const p = String(w).toLowerCase().replace(/[^a-z' -]/g, "").split(/[\s-]+/).filter(Boolean); const r = p.map(x => L[x]); return r.length && r.every(Boolean) ? r.join(" ") : ""; };
  const fig = w => { const i = ipa(w); if (!i || !window.FIGURADA) return ""; try { return i.split(" ").map(x => FIGURADA(x)).join(" · "); } catch (e) { return ""; } };
  const synLv = s => { try { const r = DICT.levelOf(s); return r && r.c ? r.c : ""; } catch (e) { return ""; } };
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const shuf = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nrm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' -]/g, "").replace(/\s+/g, " ").trim();
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function findIn(text, w) {
    // find the word (or a simple inflection) in text; returns [index, matchedText]
    const forms = [w, w + "s", w + "es", w + "ed", w + "d", w.replace(/e$/, "") + "ing", w + "ing", w.replace(/y$/, "ies")];
    for (const f of forms) { const m = new RegExp("\\b" + reEsc(f) + "\\b", "i").exec(text); if (m) return [m.index, m[0]]; }
    return null;
  }

  /* ---------- workbook generator (deterministic) ---------- */
  function work(ti, n) {
    const t = T[ti]; const r = rng(ti * 97 + n * 13 + 5);
    const pool = t.w.filter(x => x.l <= n), focus = t.w.filter(x => x.l === n), target = t.w.filter(x => x.l <= n && x.l >= Math.max(1, n - 1));
    const rd = t.r[band(n)];
    // 1. reading + T/F
    const ex1 = { text: rd[0], tf: rd[1].map(x => ({ s: x[0], a: x[1] })) };
    // 2. fill the text: gap theme words that appear in the reading
    let gaps = []; const used = new Set();
    pool.slice().sort((a, b) => b.w.length - a.w.length).forEach(x => { const f = findIn(rd[0], x.w); if (f && !gaps.some(g => f[0] < g.i + g.t.length && g.i < f[0] + f[1].length) && !used.has(nrm(x.w))) { gaps.push({ i: f[0], t: f[1], k: x.key }); used.add(nrm(x.w)); } });
    gaps = gaps.sort((a, b) => a.i - b.i).slice(0, 8);
    const parts = []; let last = 0; gaps.forEach(g => { parts.push(rd[0].slice(last, g.i)); parts.push({ a: g.t }); last = g.i + g.t.length; }); parts.push(rd[0].slice(last));
    const ex2 = { parts, bank: shuf(gaps.map(g => g.t.toLowerCase()), r) };
    // 3. word bank sentences
    const wbPool = shuf(target.filter(x => findIn(x.e, x.w)), r).slice(0, 6);
    const ex3 = { items: wbPool.map(x => { const f = findIn(x.e, x.w); return { pre: x.e.slice(0, f[0]), a: f[1], post: x.e.slice(f[0] + f[1].length), es: x.xe, k: x.key }; }) };
    ex3.bank = shuf(ex3.items.map(x => x.a.toLowerCase()), r);
    // 4. multiple choice (picture or meaning → word)
    const mcPool = shuf(target, r).slice(0, 6);
    const ex4 = { items: mcPool.map((x, i) => { const others = shuf(target.filter(y => y !== x && y.pos === x.pos), r).slice(0, 3); if (others.length < 3) others.push(...shuf(pool.filter(y => y !== x && y.pos === x.pos && !others.includes(y)), r).slice(0, 3 - others.length)); if (others.length < 3) others.push(...shuf(pool.filter(z => z !== x && !others.includes(z)), r).slice(0, 3 - others.length)); while (others.length < 3) { const y = shuf(t.w.filter(z => z !== x && !others.includes(z)).sort((u, v) => u.l - v.l).slice(0, 15), r)[0]; others.push(y); } return { k: x.key, ask: i % 2 ? "m" : "p", m: x.m, opts: shuf([x, ...others].map(o => o.w), r), a: x.w }; }) };
    // 5. spelling
    const spPool = shuf(target.filter(x => /^[a-z]+$/i.test(x.w) && x.w.length >= 3), r).slice(0, 6);
    const ex5 = { items: spPool.map(x => { let s = shuf(x.w.toLowerCase().split(""), r).join(""); if (s === x.w.toLowerCase()) s = s.split("").reverse().join(""); return { k: x.key, es: x.es, sc: s, a: x.w }; }) };
    // 6. writing
    const ex6 = { task: rd[2], need: n <= 2 ? 4 : n <= 4 ? 6 : 8, words: (focus.length ? focus : pool).slice(0, 12).map(x => x.w) };
    return { t, n, lv: LV[n - 1], pool, focus, ex: [ex1, ex2, ex3, ex4, ex5, ex6] };
  }
  API.work = work; API.lvNum = lvNum;

  /* ---------- state ---------- */
  const st = () => { if (!S.th) S.th = {}; const p = S.th; p.learned = p.learned || {}; p.best = p.best || {}; p.ans = p.ans || {}; return p; };
  const store = () => { try { save(); } catch (e) { } };
  const curLv = () => (typeof S !== "undefined" && S.voc && S.voc.lv) || "A1";

  /* ---------- view ---------- */
  const thumb = (k, em, big) => { const s = img(k); return s ? `<img src="${s}" alt="" loading="lazy" decoding="async">` : `<span class="pz-ph${big ? " big" : ""}" aria-hidden="true">${em}</span>`; };
  const badge = l => `<span class="lvl ${l}">${l}</span>`;
  function homeHTML(n, p) {
    need("thimg-scenes.js");
    return `<p class="sub gintro">20 places · 50 words each, from A1 to C2 · ${n <= 6 ? `${T.reduce((a, t) => a + t.w.filter(x => x.l <= n).length, 0)} words up to ${LV[n - 1]}` : ""}. Each theme has a big picture, the word set and a workbook for your level. · 20 lugares con 50 palabras, imagen principal y cuaderno de ejercicios.</p>
    <div class="th-grid">${T.map(t => { const got = t.w.filter(x => p.learned[x.key]).length, b = p.best[`${t.id}:${n}`]; return `<button type="button" class="th-card" data-th="open" data-v="${t.ti}"><span class="th-scene">${(window.TH_SCENE || {})[t.ti] ? `<img src="${TH_SCENE[t.ti]}" alt="" loading="lazy">` : `<span class="pz-ph">${t.em}</span>`}<i>${t.ti + 1}</i></span><b>${t.em} ${esc(t.en)}</b><small>${esc(t.es)}</small><span class="pz-bar"><span style="width:${got * 2}%"></span></span><small>${got}/50 learned${b != null ? ` · workbook ${b}%` : ""}</small></button>`; }).join("")}</div>`;
  }
  function themeHTML(t, n, p) {
    need(`thimg-${t.id}.js`);
    const mode = p.mode || "words", filt = p.filt || "mine";
    const words = filt === "all" ? t.w : t.w.filter(x => x.l <= n);
    let h = `<div class="pz-top"><button type="button" class="btn ghost" data-th="back">← Places · Lugares</button></div>
      <div class="th-hero">${img(`th${t.ti}-s`) ? `<img src="${img(`th${t.ti}-s`)}" alt="${esc(t.en)}">` : `<span class="pz-ph big">${t.em}</span>`}<div class="th-cap"><b>${t.ti + 1}. ${esc(t.en)}</b><span>${esc(t.es)}</span></div></div>
      ${credit(`th${t.ti}-s`) ? `<p class="pz-cr">Photo · Foto: <a href="${esc(credit(`th${t.ti}-s`)[1])}" target="_blank" rel="noopener">${esc(credit(`th${t.ti}-s`)[0])}</a> / Unsplash</p>` : ""}
      <div class="seg sm" role="group" aria-label="Mode">${[["words", "🖼️ Word set · Palabras"], ["book", `📝 Workbook ${LV[n - 1]} · Cuaderno`]].map(([k, l]) => `<button class="chip" type="button" data-th="mode" data-v="${k}" aria-pressed="${mode === k}">${l}</button>`).join("")}</div>`;
    if (mode === "book") return h + bookHTML(t, n, p);
    h += `<div class="row th-filt"><span class="sub">Show · Mostrar:</span>${[["mine", `Up to ${LV[n - 1]} (${t.w.filter(x => x.l <= n).length})`], ["all", "All 50 · Todas"]].map(([k, l]) => `<button class="chip sm" type="button" data-th="filt" data-v="${k}" aria-pressed="${filt === k}">${l}</button>`).join("")}</div>`;
    h += `<div class="pz-grid">${words.map(x => `<button type="button" class="pz-card${p.learned[x.key] ? " got" : ""}${x.l === n ? " th-new" : ""}" data-th="word" data-v="${x.key}"><span class="pz-img">${thumb(x.key, t.em)}<i>${x.n}</i>${p.learned[x.key] ? '<span class="pz-ok">✓</span>' : ""}</span><b>${esc(x.w)}</b><small>${esc(x.es)}</small><span class="row" style="gap:4px;margin:4px 2px 0">${badge(x.lv)}<span class="pz-pos" style="margin:0">${POS[x.pos][0]}</span></span></button>`).join("")}</div>`;
    return h;
  }
  /* workbook view */
  function bookHTML(t, n, p) {
    const W = work(t.ti, n), A = p.ans[`${t.id}:${n}`] = p.ans[`${t.id}:${n}`] || {}, chk = A._chk || {};
    const v = (e, i) => A[`${e}.${i}`] || "";
    const mark = (e, i, ok) => chk[e] ? (ok ? " th-ok" : " th-no") : "";
    const [e1, e2, e3, e4, e5, e6] = W.ex;
    const sec = (k, title, es, body) => `<section class="card th-ex" data-ex="${k}"><h3>${k}. ${title} <span class="sub">· ${es}</span></h3>${body}<div class="row"><button class="btn" type="button" data-th="check" data-v="${k}">✔ Check · Revisar</button><button class="btn ghost" type="button" data-th="clear" data-v="${k}">↺ Clear</button>${chk[k] ? `<b class="th-sc">${score(W, A, k)}</b>` : ""}</div></section>`;
    let h = `<p class="sub">Workbook for <b>${LV[n - 1]}</b> · ${W.pool.length} words · Your answers are saved. · Tus respuestas se guardan.</p>`;
    h += sec(1, "Read and answer True or False", "Lee y contesta verdadero o falso", `<div class="th-read">${esc(e1.text)}</div><ol class="th-tf">${e1.tf.map((q, i) => `<li class="${mark(1, i, (v(1, i) === "T") === q.a)}">${esc(q.s)} <span class="th-tfb"><button type="button" class="chip sm" data-th="tf" data-v="${i}:T" aria-pressed="${v(1, i) === "T"}">True</button><button type="button" class="chip sm" data-th="tf" data-v="${i}:F" aria-pressed="${v(1, i) === "F"}">False</button></span></li>`).join("")}</ol>`);
    let gi = 0;
    h += sec(2, "Fill in the blanks in the text", "Completa el texto con el banco de palabras", `<div class="th-bank">${e2.bank.map(b => `<span>${esc(b)}</span>`).join("")}</div><div class="th-read th-fill">${e2.parts.map(x => typeof x === "string" ? esc(x) : (i => `<input class="th-in${mark(2, i, nrm(v(2, i)) === nrm(x.a))}" data-th-in="2.${i}" value="${esc(v(2, i))}" aria-label="Blank ${i + 1}" autocomplete="off" spellcheck="false" size="${Math.max(6, x.a.length + 1)}">`)(gi++)).join("")}</div>`);
    h += sec(3, "Write the correct word from the word bank", "Escribe la palabra correcta del banco", `<div class="th-bank">${e3.bank.map(b => `<span>${esc(b)}</span>`).join("")}</div><ol class="th-wb">${e3.items.map((x, i) => `<li>${esc(x.pre)}<input class="th-in${mark(3, i, nrm(v(3, i)) === nrm(x.a))}" data-th-in="3.${i}" value="${esc(v(3, i))}" aria-label="Answer ${i + 1}" autocomplete="off" spellcheck="false" size="${Math.max(6, x.a.length + 1)}">${esc(x.post)}<small>${esc(x.es)}</small></li>`).join("")}</ol>`);
    h += sec(4, "Multiple choice", "Opción múltiple", `<ol class="th-mc">${e4.items.map((x, i) => `<li class="${mark(4, i, v(4, i) === x.a)}"><div class="th-mcq">${x.ask === "p" ? `<span class="th-mci">${thumb(x.k, t.em)}</span><span>What is this? · ¿Qué es?</span>` : `<span>Which word means: <i>“${esc(x.m)}”</i>?</span>`}</div><div class="th-opts">${x.opts.map(o => `<button type="button" class="chip" data-th="mc" data-v="${i}:${esc(o)}" aria-pressed="${v(4, i) === o}">${esc(o)}</button>`).join("")}</div></li>`).join("")}</ol>`);
    h += sec(5, "Spelling: unscramble the letters", "Ortografía: ordena las letras", `<ol class="th-sp">${e5.items.map((x, i) => `<li><span class="th-mci">${thumb(x.k, t.em)}</span><div><b class="th-scr">${esc(x.sc.split("").join(" "))}</b><small>${esc(x.es)}</small><input class="th-in${mark(5, i, nrm(v(5, i)) === nrm(x.a))}" data-th-in="5.${i}" value="${esc(v(5, i))}" aria-label="Spelling ${i + 1}" autocomplete="off" spellcheck="false" autocapitalize="off"></div></li>`).join("")}</ol>`);
    const wtext = v(6, 0), used = e6.words.filter(w => findIn(wtext, w)), wc = (wtext.match(/[A-Za-z']+/g) || []).length;
    h += sec(6, "Writing", "Escritura", `<p>${esc(e6.task)}</p><p class="sub">Use at least ${e6.need} of these words · Usa al menos ${e6.need}: ${e6.words.map(w => `<span class="th-wd${used.includes(w) ? " on" : ""}">${esc(w)}</span>`).join(" ")}</p><textarea class="th-ta" data-th-in="6.0" rows="6" aria-label="Your writing">${esc(wtext)}</textarea><p class="sub th-wc">${wc} words · ${used.length} theme words (aim: ${e6.need}) · ${used.length >= e6.need ? "✅" : ""}</p>`);
    return h;
  }
  function score(W, A, k) {
    const [e1, e2, e3, e4, e5, e6] = W.ex; const v = i => A[`${k}.${i}`] || ""; let ok = 0, tot = 0;
    if (k == 1) e1.tf.forEach((q, i) => { tot++; if ((v(i) === "T") === q.a && v(i)) ok++; });
    if (k == 2) e2.parts.filter(x => typeof x !== "string").forEach((x, i) => { tot++; if (nrm(v(i)) === nrm(x.a)) ok++; });
    if (k == 3) e3.items.forEach((x, i) => { tot++; if (nrm(v(i)) === nrm(x.a)) ok++; });
    if (k == 4) e4.items.forEach((x, i) => { tot++; if (v(i) === x.a) ok++; });
    if (k == 5) e5.items.forEach((x, i) => { tot++; if (nrm(v(i)) === nrm(x.a)) ok++; });
    if (k == 6) { const u = e6.words.filter(w => findIn(v(0), w)).length; tot = e6.need; ok = Math.min(u, e6.need); }
    return `${ok}/${tot}${ok === tot ? " 🎉" : ""}`;
  }
  function totalPct(W, A) { let ok = 0, tot = 0; [1, 2, 3, 4, 5, 6].forEach(k => { const [a, b] = score(W, A, k).split(" ")[0].split("/").map(Number); ok += a; tot += b; }); return tot ? Math.round(ok / tot * 100) : 0; }

  function detailHTML(x, t) {
    const i = ipa(x.w), f = fig(x.w), c = credit(x.key), p = st();
    const groups = {}; x.syn.forEach(s => { const l = synLv(s) || "–"; (groups[l] = groups[l] || []).push(s); });
    const order = [...LV, "–"].filter(l => groups[l]);
    return `<div class="pz-modal" role="dialog" aria-modal="true" aria-label="${esc(x.w)}"><div class="pz-sheet">
      <button type="button" class="pz-x" data-th="close" aria-label="Close · Cerrar">✕</button>
      <div class="pz-hero">${thumb(x.key, t.em, true)}<i>${x.n}</i></div>
      ${c ? `<p class="pz-cr">Photo · Foto: <a href="${esc(c[1])}" target="_blank" rel="noopener">${esc(c[0])}</a> / Unsplash</p>` : ""}
      <div class="pz-wrow"><h2>${esc(x.w)}</h2>${badge(x.lv)}</div>
      <p class="pz-posl">${POS[x.pos][0]} · ${POS[x.pos][1]} · ${t.em} ${esc(t.en)}</p>
      <p class="pz-es">🇲🇽 ${esc(x.es)}</p>${i ? `<p class="pz-ipa">/${esc(i)}/</p>` : ""}${f ? `<p class="pz-fig">🗣️ Pronunciación figurada: <b>${esc(f)}</b></p>` : ""}
      <div class="row pz-snd"><button class="btn" type="button" data-th="say" data-l="en-GB" data-w="${esc(x.w)}">🔊 UK</button><button class="btn" type="button" data-th="say" data-l="en-US" data-w="${esc(x.w)}">🔊 US</button><button class="btn ghost" type="button" data-th="say" data-l="en-GB" data-r=".55" data-w="${esc(x.w)}">🐢 Slow · Lento</button></div>
      <h4>Meaning · Significado</h4><p>${esc(x.m)}</p>
      <h4>Example · Ejemplo</h4><p class="pz-ex">${esc(x.e)} <button class="btn ghost sm" type="button" data-th="say" data-l="en-GB" data-w="${esc(x.e)}" aria-label="Listen">🔊</button></p><p class="sub">${esc(x.xe)}</p>
      <h4>Synonyms by level · Sinónimos por nivel</h4>${order.length ? `<div class="pz-syn">${order.map(l => `<div><span class="lvl ${l === "–" ? "" : l}">${l === "–" ? "Other" : l}</span> ${groups[l].map(s => `<span class="chip">${esc(s)}</span>`).join(" ")}</div>`).join("")}</div>` : `<p class="sub">No common synonym. · Sin sinónimo común.</p>`}
      <div class="row pz-nav"><button class="btn ghost" type="button" data-th="step" data-v="-1" ${x.n === 1 ? "disabled" : ""}>← Prev</button><button class="btn${p.learned[x.key] ? " ghost" : ""}" type="button" data-th="learn" data-v="${x.key}">${p.learned[x.key] ? "✓ Learned · Aprendida" : "☆ Mark as learned · Marcar"}</button><button class="btn ghost" type="button" data-th="step" data-v="1" ${x.n === 50 ? "disabled" : ""}>Next →</button></div>
    </div></div>`;
  }
  function html(lvIn) {
    const p = st(), n = lvNum(lvIn);
    const t = p.ti != null ? T[p.ti] : null;
    return `<div class="th">${lvIn === "PET" || lvIn === "FCE" ? `<p class="sub">${lvIn} uses the ${LV[n - 1]} workbook. · ${lvIn} usa el cuaderno ${LV[n - 1]}.</p>` : ""}${t ? themeHTML(t, n, p) : homeHTML(n, p)}</div>`;
  }
  API.html = html;

  let open = null;
  const find = key => { const m = /^th(\d+)-(\d+)$/.exec(key); if (!m) return [null, null]; const t = T[+m[1]]; return t ? [t.w[+m[2]], t] : [null, null]; };
  function showDetail(key) { const [x, t] = find(key); closeDetail(); if (!x) return; open = key; const d = document.createElement("div"); d.id = "th-root"; d.innerHTML = detailHTML(x, t); document.body.appendChild(d); const b = d.querySelector(".pz-x"); if (b) b.focus(); }
  function closeDetail() { open = null; const r = document.getElementById("th-root"); if (r) r.remove(); }
  function redraw(keepFocus) {
    const a = document.activeElement, sel = a && a.dataset && a.dataset.thIn, pos = a && a.selectionStart;
    if (window.VOCAB && VOCAB.draw) VOCAB.draw(); if (open) showDetail(open);
    if (keepFocus && sel) { const e = document.querySelector(`[data-th-in="${sel}"]`); if (e) { e.focus(); try { e.setSelectionRange(pos, pos); } catch (x) { } } }
  }
  API.refresh = () => { clearTimeout(rt); rt = setTimeout(() => redraw(true), 40); };
  function say(t, lang, rate) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = lang || "en-GB"; u.rate = rate || .9; const vs = speechSynthesis.getVoices().filter(v => v.lang && v.lang.replace("_", "-").startsWith(u.lang)); if (vs.length) u.voice = vs[0]; speechSynthesis.speak(u); } catch (e) { } }

  document.addEventListener("click", ev => {
    if (ev.target.classList && ev.target.classList.contains("pz-modal") && document.getElementById("th-root")) { closeDetail(); return; }
    const b = ev.target.closest && ev.target.closest("[data-th]"); if (!b) return;
    const a = b.dataset.th, p = st(), n = lvNum(curLv()), t = p.ti != null ? T[p.ti] : null;
    const A = t ? (p.ans[`${t.id}:${n}`] = p.ans[`${t.id}:${n}`] || {}) : null;
    if (a === "open") { p.ti = +b.dataset.v; p.mode = "words"; store(); redraw(); window.scrollTo(0, 0); }
    else if (a === "back") { p.ti = null; store(); redraw(); }
    else if (a === "mode") { p.mode = b.dataset.v; store(); redraw(); }
    else if (a === "filt") { p.filt = b.dataset.v; store(); redraw(); }
    else if (a === "word") showDetail(b.dataset.v);
    else if (a === "close") closeDetail();
    else if (a === "say") say(b.dataset.w, b.dataset.l, +b.dataset.r || .9);
    else if (a === "learn") { const k = b.dataset.v; if (p.learned[k]) delete p.learned[k]; else p.learned[k] = 1; store(); redraw(); }
    else if (a === "step") { if (!open) return; const [x] = find(open); const m = /^th(\d+)-/.exec(open); const ni = x.n - 1 + +b.dataset.v; if (ni >= 0 && ni < 50) showDetail(`th${m[1]}-${ni}`); }
    else if (a === "tf" && A) { const [i, v] = b.dataset.v.split(":"); A[`1.${i}`] = v; store(); redraw(); }
    else if (a === "mc" && A) { const k = b.dataset.v.indexOf(":"); A[`4.${b.dataset.v.slice(0, k)}`] = b.dataset.v.slice(k + 1); store(); redraw(); }
    else if (a === "check" && A) { A._chk = A._chk || {}; A._chk[b.dataset.v] = 1; const W = work(t.ti, n); const pc = totalPct(W, A); if (pc > (p.best[`${t.id}:${n}`] || 0)) p.best[`${t.id}:${n}`] = pc; store(); redraw(); }
    else if (a === "clear" && A) { const k = b.dataset.v; Object.keys(A).forEach(x => { if (x.startsWith(k + ".")) delete A[x]; }); if (A._chk) delete A._chk[k]; store(); redraw(); }
  });
  document.addEventListener("input", ev => {
    const e = ev.target; if (!e.dataset || !e.dataset.thIn) return; const p = st(), n = lvNum(curLv()), t = T[p.ti]; if (!t) return;
    const A = p.ans[`${t.id}:${n}`] = p.ans[`${t.id}:${n}`] || {}; A[e.dataset.thIn] = e.value; store();
    if (e.dataset.thIn === "6.0") { const W = work(t.ti, n), e6 = W.ex[5]; const used = e6.words.filter(w => findIn(e.value, w)); const wc = (e.value.match(/[A-Za-z']+/g) || []).length; const box = e.closest(".th-ex"); if (box) { box.querySelectorAll(".th-wd").forEach(s => s.classList.toggle("on", used.includes(s.textContent))); const c = box.querySelector(".th-wc"); if (c) c.textContent = `${wc} words · ${used.length} theme words (aim: ${e6.need}) · ${used.length >= e6.need ? "✅" : ""}`; } }
  });
  document.addEventListener("keydown", ev => { if (!open) return; if (ev.key === "Escape") closeDetail(); });

  const css = document.createElement("style");
  css.textContent = `
.th-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,210px),1fr));gap:12px}
.th-card{display:flex;flex-direction:column;gap:3px;text-align:left;border:1px solid var(--line);background:var(--surface,var(--bg));border-radius:16px;padding:8px 8px 12px;font:inherit;color:inherit;cursor:pointer}
.th-card:hover{border-color:var(--accent,#1cb0f6)}.th-card b{margin-top:6px}.th-card small{color:var(--muted);font-size:.8rem}
.th-scene{position:relative;display:block;aspect-ratio:2/1;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#e6f4fb,#fdf0e0)}
.th-scene img{width:100%;height:100%;object-fit:cover;display:block}
.th-scene i{position:absolute;left:8px;top:8px;min-width:30px;height:30px;padding:0 6px;border-radius:15px;background:#fff;color:#111;font-style:normal;font-weight:900;display:grid;place-items:center;box-shadow:0 1px 4px #0004}
.th-hero{position:relative;aspect-ratio:2/1;max-height:360px;width:100%;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#e6f4fb,#fdf0e0);margin:6px 0}
.th-hero img{width:100%;height:100%;object-fit:cover;display:block}.th-hero .pz-ph.big{font-size:6rem}
.th-cap{position:absolute;left:0;right:0;bottom:0;padding:28px 16px 12px;background:linear-gradient(transparent,#000b);color:#fff;display:flex;flex-direction:column}
.th-cap b{font-size:clamp(1.3rem,3vw,2rem)}.th-cap span{opacity:.9}
.th-filt{gap:6px;align-items:center;margin:10px 0 0;flex-wrap:wrap}
.pz-card.th-new{box-shadow:inset 0 0 0 2px #1cb0f6}
.th-ex{margin:12px 0}.th-ex h3{margin:0 0 8px}.th-ex .row{gap:8px;margin-top:10px;align-items:center}
.th-read{background:var(--line);border-radius:12px;padding:12px 14px;line-height:1.9}
.th-tf li,.th-mc li{margin:8px 0}.th-tfb{display:inline-flex;gap:6px;margin-left:6px}
.th-bank{display:flex;flex-wrap:wrap;gap:6px;border:2px dashed #1cb0f6;border-radius:12px;padding:8px;margin-bottom:8px}.th-bank span{font-weight:800;padding:2px 10px;border-radius:8px;background:#1cb0f61a}
.th-in{font:inherit;font-size:16px;border:0;border-bottom:2px solid var(--muted,#888);background:transparent;color:inherit;padding:0 4px;margin:0 2px;min-width:5ch;max-width:100%}
.th-in:focus{outline:none;border-color:#1cb0f6}.th-in.th-ok{border-color:#2fa62f;background:#2fa62f1a}.th-in.th-no{border-color:#e5484d;background:#e5484d1a}
.th-wb li{margin:10px 0;line-height:1.9}.th-wb small{display:block;color:var(--muted)}
.th-mcq{display:flex;gap:10px;align-items:center}.th-mci{display:inline-block;width:96px;aspect-ratio:4/3;border-radius:10px;overflow:hidden;flex:none;background:linear-gradient(135deg,#e6f4fb,#fdf0e0)}.th-mci img{width:100%;height:100%;object-fit:cover}.th-mci .pz-ph{font-size:2rem}
.th-opts{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
li.th-ok{border-left:4px solid #2fa62f;padding-left:6px}li.th-no{border-left:4px solid #e5484d;padding-left:6px}
.th-sp{padding-left:20px}.th-sp li{margin:10px 0}.th-sp li{display:list-item}.th-sp li>div{display:inline-flex;flex-direction:column;gap:2px;vertical-align:top;margin-left:10px}.th-scr{letter-spacing:.15em;font-size:1.05rem}.th-sp small{color:var(--muted)}
.th-ta{width:100%;font:inherit;font-size:16px;border:1px solid var(--line);border-radius:12px;padding:10px;background:var(--surface,var(--bg));color:inherit}
.th-wd{display:inline-block;padding:0 6px;border-radius:6px;background:var(--line);margin:2px 0}.th-wd.on{background:#2fa62f;color:#fff}
.th-sc{font-size:1.05rem}`;
  document.head.appendChild(css);
})();

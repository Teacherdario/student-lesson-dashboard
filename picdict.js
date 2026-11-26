/* Teacher Dario · Picture dictionary (A1–C2): themed, numbered picture cards with Spanish, part of speech,
   meaning, example, synonyms by level, IPA, pronunciación figurada and audio. Data: pic-*.js, photos: picimg-*.js */
(function () {
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const POS = { n: ["noun", "sustantivo"], v: ["verb", "verbo"], adj: ["adjective", "adjetivo"], adv: ["adverb", "adverbio"], ph: ["phrasal verb", "verbo frasal"], exp: ["expression", "expresión"] };
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const D = {};
  function parse(lv, themes) {
    D[lv] = themes.map(([id, en, es, em, items], ti) => ({
      id, en, es, em, ti, items: items.map((s, i) => {
        const p = s.split("|");
        return { key: `${lv}-${ti}-${i}`, n: i + 1, w: p[0], pos: p[1], es: p[2], m: p[3], e: p[4], xe: p[5], syn: p[6] ? p[6].split(/\s*,\s*/).filter(Boolean) : [], lv };
      })
    }));
  }
  const pend = window.PICDICT && window.PICDICT._q || [];
  let rt = 0; const later = () => { clearTimeout(rt); rt = setTimeout(() => { try { if (typeof curView === "function" && curView() === "vocab" && window.VOCAB) VOCAB.draw(); } catch (e) { } }, 30); };
  const API = window.PICDICT = { add: (lv, t) => { parse(lv, t); later(); }, data: D };
  pend.forEach(a => parse(a[0], a[1]));

  const img = k => (window.PIC_IMG || {})[k];
  const credit = k => (window.PIC_CREDIT || {})[k];
  const st = () => { if (!S.pic) S.pic = {}; const p = S.pic; p.learned = p.learned || {}; p.best = p.best || {}; return p; };
  const store = () => { try { save(); } catch (e) { } };
  const pLv = lv => lv === "PET" ? "B1" : lv === "FCE" ? "B2" : (LV.includes(lv) ? lv : "A1");
  const ipa = w => { const L = window.LEX_IPA || {}; const parts = String(w).toLowerCase().replace(/[^a-z' -]/g, "").split(/[\s-]+/).filter(Boolean); if (!parts.length) return ""; const r = parts.map(x => L[x]); return r.every(Boolean) ? r.join(" ") : (r.some(Boolean) ? r.map((x, i) => x || parts[i]).join(" ") : ""); };
  const fig = w => { const i = ipa(w); if (!i || !window.FIGURADA) return ""; try { return i.split(" ").map(x => FIGURADA(x)).join(" · "); } catch (e) { return ""; } };
  const synLv = s => { try { const r = window.DICT && DICT.levelOf ? DICT.levelOf(s) : null; return r && r.c ? r.c : "–"; } catch (e) { return "–"; } };
  function say(t, lang, rate) {
    try {
      speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = lang || "en-GB"; u.rate = rate || .9;
      const vs = speechSynthesis.getVoices().filter(v => v.lang && v.lang.replace("_", "-").startsWith(u.lang)); if (vs.length) u.voice = vs[0];
      speechSynthesis.speak(u);
    } catch (e) { }
  }
  const thumb = (it, th, big) => {
    const s = img(it.key);
    return s ? `<img src="${s}" alt="${esc(it.w)}" loading="lazy" decoding="async">` : `<span class="pz-ph${big ? " big" : ""}" aria-hidden="true">${th.em}</span>`;
  };

  /* ---------- markup ---------- */
  function homeHTML(lv, p) {
    const T = D[lv] || [];
    const all = T.reduce((a, t) => a + t.items.length, 0), got = T.reduce((a, t) => a + t.items.filter(i => p.learned[i.key]).length, 0);
    return `<p class="sub gintro">${T.length} themes · ${all} words with pictures at ${lv}. ${got} learned. Tap a theme to open its picture dictionary. · Toca un tema para ver su diccionario ilustrado.</p>
      <div class="pz-themes">${T.map(t => {
      const g = t.items.filter(i => p.learned[i.key]).length, b = p.best[`${lv}-${t.ti}`];
      const cover = t.items.map(i => img(i.key)).find(Boolean);
      return `<button type="button" class="pz-theme" data-pic="theme" data-v="${t.ti}">
          <span class="pz-cov">${cover ? `<img src="${cover}" alt="" loading="lazy">` : `<span class="pz-ph">${t.em}</span>`}<i>${t.ti + 1}</i></span>
          <b>${esc(t.en)}</b><small>${esc(t.es)}</small>
          <span class="pz-bar"><span style="width:${Math.round(g / t.items.length * 100)}%"></span></span>
          <small>${g}/${t.items.length} learned${b ? ` · quiz ${b}/12` : ""}</small></button>`;
    }).join("")}</div>`;
  }
  function themeHTML(lv, t, p) {
    const mode = p.mode || "cards";
    const seg = `<div class="seg sm" role="group" aria-label="Mode">${[["cards", "🖼️ Picture cards · Tarjetas"], ["list", "🔢 Numbered list · Lista"], ["quiz", "🎯 Picture quiz · Juego"]].map(([k, l]) => `<button class="chip" type="button" data-pic="mode" data-v="${k}" aria-pressed="${mode === k}">${l}</button>`).join("")}</div>`;
    const head = `<div class="pz-top"><button type="button" class="btn ghost" data-pic="back">← Themes · Temas</button><div><h2>${t.em} ${t.ti + 1}. ${esc(t.en)}</h2><span class="sub">${esc(t.es)} · ${lv} · 12 words</span></div></div>${seg}`;
    if (mode === "quiz") return head + quizHTML(lv, t, p);
    if (mode === "list") return head + `<ol class="pz-list">${t.items.map(it => `<li><button type="button" data-pic="open" data-v="${it.key}"><span class="pz-n">${it.n}</span><span class="pz-mini">${thumb(it, t)}</span><span class="pz-lw"><b>${esc(it.w)}</b> <em>${POS[it.pos][0]}</em><small>${esc(it.es)}</small><small class="pz-ip">${esc(ipa(it.w) ? "/" + ipa(it.w) + "/" : "")} ${esc(fig(it.w) ? "🗣️ " + fig(it.w) : "")}</small></span>${p.learned[it.key] ? '<span class="pz-ok">✓</span>' : ""}</button></li>`).join("")}</ol>`;
    return head + `<p class="sub">Tap a picture to see everything about the word. · Toca una imagen para ver toda la información.</p>
      <div class="pz-grid">${t.items.map(it => `<button type="button" class="pz-card${p.learned[it.key] ? " got" : ""}" data-pic="open" data-v="${it.key}">
        <span class="pz-img">${thumb(it, t)}<i>${it.n}</i>${p.learned[it.key] ? '<span class="pz-ok">✓</span>' : ""}</span>
        <b>${esc(it.w)}</b><small>${esc(it.es)}</small><span class="pz-pos">${POS[it.pos][0]}</span></button>`).join("")}</div>`;
  }
  function detailHTML(it, t) {
    const i = ipa(it.w), f = fig(it.w), c = credit(it.key);
    const groups = {}; it.syn.forEach(s => { const l = synLv(s); (groups[l] = groups[l] || []).push(s); });
    const order = [...LV, "–"].filter(l => groups[l]);
    const learned = st().learned[it.key];
    return `<div class="pz-modal" role="dialog" aria-modal="true" aria-label="${esc(it.w)}"><div class="pz-sheet">
      <button type="button" class="pz-x" data-pic="close" aria-label="Close · Cerrar">✕</button>
      <div class="pz-hero">${thumb(it, t, true)}<i>${it.n}</i></div>
      ${c ? `<p class="pz-cr">Photo · Foto: <a href="${esc(c[1])}" target="_blank" rel="noopener">${esc(c[0])}</a> / Unsplash</p>` : ""}
      <div class="pz-wrow"><h2>${esc(it.w)}</h2><span class="lvl ${it.lv}">${it.lv}</span></div>
      <p class="pz-posl">${POS[it.pos][0]} · ${POS[it.pos][1]}</p>
      <p class="pz-es">🇲🇽 ${esc(it.es)}</p>
      ${i ? `<p class="pz-ipa">/${esc(i)}/</p>` : ""}${f ? `<p class="pz-fig">🗣️ Pronunciación figurada: <b>${esc(f)}</b></p>` : ""}
      <div class="row pz-snd"><button class="btn" type="button" data-pic="say" data-l="en-GB" data-w="${esc(it.w)}">🔊 UK</button><button class="btn" type="button" data-pic="say" data-l="en-US" data-w="${esc(it.w)}">🔊 US</button><button class="btn ghost" type="button" data-pic="say" data-l="en-GB" data-r=".55" data-w="${esc(it.w)}">🐢 Slow · Lento</button></div>
      <h4>Meaning · Significado</h4><p>${esc(it.m)}</p>
      <h4>Example · Ejemplo</h4><p class="pz-ex">${esc(it.e)} <button class="btn ghost sm" type="button" data-pic="say" data-l="en-GB" data-w="${esc(it.e)}" aria-label="Listen to the example">🔊</button></p><p class="sub">${esc(it.xe)}</p>
      <h4>Synonyms by level · Sinónimos por nivel</h4>
      ${order.length ? `<div class="pz-syn">${order.map(l => `<div><span class="lvl ${l === "–" ? "" : l}">${l === "–" ? "Other" : l}</span> ${groups[l].map(s => `<button class="chip" type="button" data-pic="tap" data-w="${esc(s)}">${esc(s)}</button>`).join(" ")}</div>`).join("")}</div>` : `<p class="sub">No common synonym. · Sin sinónimo común.</p>`}
      <div class="row pz-nav"><button class="btn ghost" type="button" data-pic="step" data-v="-1" ${it.n === 1 ? "disabled" : ""}>← Prev</button>
        <button class="btn${learned ? " ghost" : ""}" type="button" data-pic="learn" data-v="${it.key}">${learned ? "✓ Learned · Aprendida" : "☆ Mark as learned · Marcar"}</button>
        <button class="btn ghost" type="button" data-pic="step" data-v="1" ${it.n === 12 ? "disabled" : ""}>Next →</button></div>
    </div></div>`;
  }
  /* ---------- picture quiz ---------- */
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function newQuiz(lv, t) {
    const pool = t.items;
    return { lv, ti: t.ti, k: 0, sc: 0, qs: shuffle(pool).map(it => ({ key: it.key, ask: Math.random() < .5 ? "pic" : "es", opts: shuffle([it, ...shuffle(pool.filter(x => x !== it)).slice(0, 3)]).map(x => x.key), sel: null })) };
  }
  let Q = null;
  function quizHTML(lv, t, p) {
    if (!Q || Q.lv !== lv || Q.ti !== t.ti) Q = newQuiz(lv, t);
    const byKey = k => t.items.find(x => x.key === k);
    if (Q.k >= Q.qs.length) {
      const best = p.best[`${lv}-${t.ti}`] || 0; if (Q.sc > best) { p.best[`${lv}-${t.ti}`] = Q.sc; store(); }
      return `<div class="card pz-quiz"><h3>Score · Puntuación: ${Q.sc}/12</h3><p>${Q.sc >= 11 ? "Excellent! You know this theme. · ¡Excelente!" : Q.sc >= 8 ? "Good work! Review the words you missed. · ¡Buen trabajo!" : "Keep practising: look at the picture cards again. · Sigue practicando."}</p><div class="row"><button class="btn" type="button" data-pic="again">🔁 Play again · Otra vez</button><button class="btn ghost" type="button" data-pic="mode" data-v="cards">🖼️ Cards</button></div></div>`;
    }
    const q = Q.qs[Q.k], it = byKey(q.key);
    const prompt = q.ask === "pic" || img(it.key) ? `<div class="pz-qimg">${thumb(it, t, true)}</div>` : "";
    return `<div class="card pz-quiz"><div class="row" style="justify-content:space-between"><b>${Q.k + 1} / 12</b><span class="sub">✓ ${Q.sc}</span></div>
      ${prompt}<p class="pz-qq">${q.ask === "es" ? `Which word means <b>“${esc(it.es)}”</b>? · ¿Qué palabra significa…?` : "What is this? Choose the word. · ¿Qué es? Elige la palabra."} <button class="btn ghost sm" type="button" data-pic="say" data-l="en-GB" data-w="${esc(it.w)}" aria-label="Listen">🔊 Hint</button></p>
      <div class="pz-opts">${q.opts.map(k => { const o = byKey(k); const cls = q.sel == null ? "" : k === q.key ? " ok" : k === q.sel ? " no" : ""; return `<button type="button" class="pz-opt${cls}" data-pic="ans" data-v="${k}" ${q.sel != null ? "disabled" : ""}>${esc(o.w)}</button>`; }).join("")}</div>
      ${q.sel != null ? `<p class="${q.sel === q.key ? "pz-good" : "pz-bad"}">${q.sel === q.key ? "✓ Correct! · ¡Correcto!" : `✗ It's <b>${esc(it.w)}</b> (${esc(it.es)}).`}</p><button class="btn" type="button" data-pic="nextq">Next · Siguiente →</button>` : ""}</div>`;
  }

  /* ---------- public ---------- */
  function html(lvIn) {
    const p = st(), lv = pLv(lvIn);
    const note = lvIn === "PET" || lvIn === "FCE" ? `<p class="sub">${lvIn} uses the ${lv} picture dictionary. · ${lvIn} usa el diccionario ilustrado de ${lv}.</p>` : "";
    const T = D[lv] || []; const t = p.lv === lv && p.ti != null ? T[p.ti] : null;
    return `<div class="pd">${note}${t ? themeHTML(lv, t, p) : homeHTML(lv, p)}</div>`;
  }
  API.html = html;
  let open = null;
  function redraw() { if (window.VOCAB && VOCAB.draw) VOCAB.draw(); if (open) showDetail(open); }
  function find(key) { const [lv, ti, i] = key.split("-"); const t = (D[lv] || [])[+ti]; return t ? [t.items[+i], t] : [null, null]; }
  function showDetail(key) {
    const [it, t] = find(key); closeDetail(); if (!it) return; open = key;
    const w = document.createElement("div"); w.id = "pz-root"; w.innerHTML = detailHTML(it, t); document.body.appendChild(w);
    const x = w.querySelector(".pz-x"); if (x) x.focus();
  }
  function closeDetail() { open = null; const r = document.getElementById("pz-root"); if (r) r.remove(); }
  API.open = showDetail; API.close = closeDetail;

  document.addEventListener("click", ev => {
    const m = ev.target.classList && ev.target.classList.contains("pz-modal"); if (m) { closeDetail(); return; }
    const b = ev.target.closest && ev.target.closest("[data-pic]"); if (!b) return;
    const a = b.dataset.pic, p = st(), lv = pLv(window.S && S.voc ? S.voc.lv : "A1");
    if (a === "theme") { p.lv = lv; p.ti = +b.dataset.v; p.mode = "cards"; Q = null; store(); redraw(); }
    else if (a === "back") { p.ti = null; store(); redraw(); }
    else if (a === "mode") { p.mode = b.dataset.v; if (p.mode === "quiz") Q = null; store(); redraw(); }
    else if (a === "open") showDetail(b.dataset.v);
    else if (a === "close") { closeDetail(); }
    else if (a === "say") say(b.dataset.w, b.dataset.l, +b.dataset.r || .9);
    else if (a === "learn") { const k = b.dataset.v; if (p.learned[k]) delete p.learned[k]; else p.learned[k] = 1; store(); redraw(); }
    else if (a === "step") { if (!open) return; const [L, ti, i] = open.split("-"); const n = +i + +b.dataset.v; if (n >= 0 && n < 12) showDetail(`${L}-${ti}-${n}`); }
    else if (a === "tap") { if (window.TAPWORD && TAPWORD.show) { const r = b.getBoundingClientRect(); TAPWORD.show(b.dataset.w, r); } }
    else if (a === "ans") { if (!Q) return; const q = Q.qs[Q.k]; if (q.sel != null) return; q.sel = b.dataset.v; if (q.sel === q.key) { Q.sc++; } const [it] = find(q.key); if (it) say(it.w); redraw(); }
    else if (a === "nextq") { if (Q) Q.k++; redraw(); }
    else if (a === "again") { Q = null; redraw(); }
  });
  document.addEventListener("keydown", ev => {
    if (!open) return;
    if (ev.key === "Escape") closeDetail();
    else if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") { const [L, ti, i] = open.split("-"); const n = +i + (ev.key === "ArrowRight" ? 1 : -1); if (n >= 0 && n < 12) showDetail(`${L}-${ti}-${n}`); }
  });

  const css = document.createElement("style");
  css.textContent = `
.pz-themes{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,170px),1fr));gap:12px}
.pz-theme{display:flex;flex-direction:column;gap:3px;text-align:left;border:1px solid var(--line);background:var(--surface,var(--bg));border-radius:16px;padding:8px 8px 12px;font:inherit;color:inherit;cursor:pointer}
.pz-theme:hover,.pz-card:hover{border-color:var(--accent,#1cb0f6)}
.pz-theme b{font-size:1rem;margin-top:6px}.pz-theme small{color:var(--muted);font-size:.8rem}
.pz-cov,.pz-img,.pz-hero,.pz-qimg{position:relative;display:block;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#e6f4fb,#fdf0e0)}
.pz-cov img,.pz-img img,.pz-hero img,.pz-qimg img,.pz-mini img{width:100%;height:100%;object-fit:cover;display:block}
.pz-ph{display:grid;place-items:center;width:100%;height:100%;font-size:2.6rem}.pz-ph.big{font-size:4.5rem}
.pz-cov i,.pz-img i,.pz-hero i{position:absolute;left:8px;top:8px;min-width:30px;height:30px;padding:0 6px;border-radius:15px;background:#fff;color:#111;font-style:normal;font-weight:900;display:grid;place-items:center;box-shadow:0 1px 4px #0004}
.pz-bar{height:6px;border-radius:3px;background:var(--line);overflow:hidden;margin-top:4px}.pz-bar span{display:block;height:100%;background:#2fa62f}
.pz-top{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:8px}.pz-top h2{margin:0}
.pz-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(46%,180px),1fr));gap:12px;margin-top:10px}
.pz-card{display:flex;flex-direction:column;gap:2px;text-align:left;border:1px solid var(--line);background:var(--surface,var(--bg));border-radius:16px;padding:6px 6px 10px;font:inherit;color:inherit;cursor:pointer}
.pz-card.got{border-color:#2fa62f}.pz-card b{font-size:1.02rem;margin:6px 2px 0}.pz-card small{color:var(--muted);margin:0 2px}
.pz-pos{align-self:flex-start;margin:4px 2px 0;font-size:.72rem;font-weight:800;padding:2px 8px;border-radius:10px;background:var(--line)}
.pz-ok{position:absolute;right:8px;top:8px;width:26px;height:26px;border-radius:13px;background:#2fa62f;color:#fff;display:grid;place-items:center;font-weight:900}
.pz-list{list-style:none;padding:0;margin:10px 0;display:grid;gap:8px}.pz-list button{position:relative;width:100%;display:flex;gap:10px;align-items:center;text-align:left;border:1px solid var(--line);background:var(--surface,var(--bg));border-radius:14px;padding:8px;font:inherit;color:inherit;cursor:pointer}
.pz-list .pz-ok{position:static}.pz-n{min-width:32px;height:32px;border-radius:16px;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-weight:900}
.pz-mini{width:64px;height:48px;border-radius:8px;overflow:hidden;flex:none;background:linear-gradient(135deg,#e6f4fb,#fdf0e0)}.pz-mini .pz-ph{font-size:1.5rem}
.pz-lw{display:flex;flex-direction:column;flex:1}.pz-lw em{font-size:.75rem;color:var(--muted);font-style:normal}.pz-lw small{color:var(--muted)}.pz-ip{font-size:.78rem}
.pz-modal{position:fixed;inset:0;background:#0008;z-index:80;display:grid;place-items:center;padding:16px}
.pz-sheet{position:relative;background:var(--bg);color:var(--ink);width:min(560px,100%);max-height:92vh;overflow:auto;border-radius:20px;padding:16px 18px 18px;box-shadow:0 10px 40px #0006}
.pz-sheet h4{margin:14px 0 4px;font-size:.85rem;color:var(--muted)}.pz-sheet p{margin:4px 0}
.pz-x{position:absolute;right:12px;top:12px;z-index:2;width:40px;height:40px;border-radius:20px;border:0;background:#fff;color:#111;font-size:1.1rem;box-shadow:0 1px 6px #0005;cursor:pointer}
.pz-cr{font-size:.72rem;color:var(--muted)}.pz-cr a{color:inherit}
.pz-wrow{display:flex;gap:10px;align-items:center;margin-top:10px}.pz-wrow h2{margin:0;font-size:1.9rem}
.pz-posl{font-weight:700;color:var(--muted)}.pz-es{font-size:1.15rem;font-weight:700}.pz-ipa{font-family:"Charis SIL","Doulos SIL",serif;font-size:1.05rem}
.pz-snd,.pz-nav{gap:8px;flex-wrap:wrap;margin-top:8px}.pz-nav{justify-content:space-between;margin-top:16px}
.pz-syn{display:grid;gap:6px}.pz-syn>div{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.pz-quiz{max-width:560px}.pz-qimg{max-width:360px;margin:10px auto}.pz-qq{font-size:1.05rem}
.pz-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:10px 0}
.pz-opt{min-height:48px;border:2px solid var(--line);border-radius:14px;background:var(--surface,var(--bg));font:inherit;font-weight:800;color:inherit;cursor:pointer;padding:8px}
.pz-opt.ok{border-color:#2fa62f;background:#2fa62f22}.pz-opt.no{border-color:#e5484d;background:#e5484d22}
.pz-good{color:#2fa62f;font-weight:800}.pz-bad{color:#e5484d;font-weight:700}
@media(max-width:760px){.pz-modal{place-items:end center;padding:0}.pz-sheet{border-radius:20px 20px 0 0;max-height:90vh}}`;
  document.head.appendChild(css);
})();

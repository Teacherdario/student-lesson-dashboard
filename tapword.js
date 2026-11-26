/* Teacher Dario · Tap any word. Tap or click any English word anywhere in the dashboard (readings, exercises, practice, book, tests)
   to see: Spanish translation, part of speech, meaning, CEFR level (A1–C2), synonyms by level, IPA, pronunciación figurada and audio. */
(function () {
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const e = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = () => { try { save(); } catch (x) { } };
  const fig = ipa => { try { return ipa && window.FIGURADA ? FIGURADA(ipa) : ""; } catch (x) { return ""; } };
  const POS_ES = { noun: "sustantivo", verb: "verbo", adjective: "adjetivo", adverb: "adverbio", pronoun: "pronombre", preposition: "preposición", conjunction: "conjunción", determiner: "determinante", interjection: "interjección", "phrasal verb": "verbo frasal", expression: "expresión", idiom: "modismo", article: "artículo", number: "número", "modal verb": "verbo modal", "auxiliary verb": "verbo auxiliar" };
  const SKIP = 'button,a,input,textarea,select,label,summary,option,[contenteditable],[role=button],[data-st],[data-sp],[data-spv],[data-cc],[data-bk],[data-tools],[data-dict],nav,.tabs,.rail,#gate,#klass,#pop,#pd-root,#td-wp,.td-wp-hl,[data-nowp],code,pre';
  const ES_CLS = /(^|\s)(es|des|st-esw|sp-es|xx-es|st-es|st-ses|cc-es)(\s|$)/;
  const isSpanishEl = el => { for (let n = el; n && n !== document.body; n = n.parentElement) { const l = n.getAttribute && n.getAttribute("lang"); if (l) return /^es/i.test(l); if (n.className && typeof n.className === "string" && ES_CLS.test(n.className)) return true; } return false; };
  const on = () => !(window.S && S.wpOff);

  function caret(x, y) {
    if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); return r ? { node: r.startContainer, off: r.startOffset } : null; }
    if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); return p ? { node: p.offsetNode, off: p.offset } : null; }
    return null;
  }
  const WCH = /[A-Za-z'’\-]/;
  function wordAt(x, y) {
    const c = caret(x, y); if (!c || !c.node || c.node.nodeType !== 3) return null;
    const t = c.node.nodeValue; let a = c.off, b = c.off;
    if (a > 0 && !WCH.test(t[a] || "") && WCH.test(t[a - 1])) { a--; b--; }
    while (a > 0 && WCH.test(t[a - 1])) a--;
    while (b < t.length && WCH.test(t[b])) b++;
    let w = t.slice(a, b);
    const lead = w.match(/^['’\-]*/)[0].length, trail = w.match(/['’\-]*$/)[0].length;
    a += lead; b -= trail; w = t.slice(a, b);
    if (!/[A-Za-z]/.test(w) || /[áéíóúñü]/i.test(w)) return null;
    { const near = t.slice(Math.max(0, a - 14), b + 14); const known = window.LEX_IPA && LEX_IPA[w.toLowerCase()];
      if (/[áéíóúñü¿¡]/i.test(near) && !known) return null;
      if (!known && window.LEX_IPA && !(window.DICT && DICT.exact && DICT.exact(w).length)) return null; }
    const rg = document.createRange(); rg.setStart(c.node, a); rg.setEnd(c.node, b);
    const rects = [...rg.getClientRects()]; if (!rects.some(r => x >= r.left - 2 && x <= r.right + 2 && y >= r.top - 3 && y <= r.bottom + 3)) return null;
    // following words for phrasal verbs / expressions
    const after = t.slice(b).match(/^\s+([A-Za-z'’]+)(?:\s+([A-Za-z'’]+))?/) || [];
    const before = t.slice(0, a).match(/([A-Za-z'’]+)\s+$/) || [];
    return { w: w.replace(/’/g, "'"), rect: rects[0], next: [after[1], after[2]].filter(Boolean), prev: before[1] || "", el: c.node.parentElement };
  }

  /* ---------- popup ---------- */
  let box = null, hl = null, cur = 0;
  function ensure() {
    if (box) return;
    box = document.createElement("div"); box.id = "td-wp"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Word translation"); box.hidden = true;
    document.body.appendChild(box);
    hl = document.createElement("div"); hl.className = "td-wp-hl"; hl.hidden = true; document.body.appendChild(hl);
  }
  function close() { if (box) box.hidden = true; if (hl) hl.hidden = true; try { speechSynthesis.cancel(); } catch (x) { } }
  function place(rect) {
    const mob = innerWidth < 760;
    box.classList.toggle("sheet", mob);
    if (rect) { hl.hidden = false; Object.assign(hl.style, { left: (rect.left + scrollX - 2) + "px", top: (rect.top + scrollY - 1) + "px", width: (rect.width + 4) + "px", height: (rect.height + 2) + "px" }); }
    if (mob) { box.style.left = box.style.top = ""; return; }
    const w = 360, h = Math.min(box.offsetHeight || 300, innerHeight - 20);
    let left = rect ? rect.left + rect.width / 2 - w / 2 : innerWidth / 2 - w / 2; left = Math.max(10, Math.min(left, innerWidth - w - 10));
    let top = rect ? rect.bottom + 8 : 80; if (top + h > innerHeight - 10) top = Math.max(10, (rect ? rect.top - h - 8 : 10));
    box.style.left = left + "px"; box.style.top = top + "px";
  }
  const badge = (c, est) => c ? `<span class="lvl ${c}" title="${est ? "Estimated level · nivel estimado" : "CEFR level · nivel MCER"}">${est ? "≈" : ""}${c}</span>` : `<span class="lvl dq">?</span>`;
  function synHTML(list) {
    if (!list || !list.length) return `<p class="sub">No synonyms listed · Sin sinónimos registrados</p>`;
    const g = {}; list.forEach(x => (g[x.c || "?"] = g[x.c || "?"] || []).push(x));
    return `<div class="wp-syn">${[...LV, "?"].filter(l => g[l]).map(l => `<div class="wp-sg">${l === "?" ? badge(null) : badge(l, g[l].every(x => x.est))}<span>${g[l].map(x => `<button type="button" class="wp-chip" data-wp="go" data-w="${e(x.w)}">${e(x.w)}</button>`).join("")}</span></div>`).join("")}</div>`;
  }
  function render(q, r, extra, loading) {
    const phr = (extra || []).map(p => `<button type="button" class="wp-chip ph" data-wp="go" data-w="${e(p)}">${e(p)}</button>`).join("");
    if (loading) return `<div class="wp-h"><b>${e(q)}</b><button class="wp-x" type="button" data-wp="close" aria-label="Close">✕</button></div><div class="wp-load">🔎 Looking up… · Buscando…</div>${phr ? `<div class="wp-ph">Also · También: ${phr}</div>` : ""}`;
    if (!r) return `<div class="wp-h"><b>${e(q)}</b><button class="wp-x" type="button" data-wp="close" aria-label="Close">✕</button></div><p class="sub">No result found. You may be offline. · No se encontró; quizá no hay conexión.</p><div class="wp-btns"><button class="wp-b" type="button" data-wp="say" data-w="${e(q)}" data-l="en-GB">🔊 UK</button><button class="wp-b" type="button" data-wp="say" data-w="${e(q)}" data-l="en-US">🔊 US</button></div>`;
    const f = fig(r.ipa), pos = String(r.type || "").toLowerCase();
    return `<div class="wp-h"><b lang="en">${e(r.word)}</b>${badge(r.c, r.est)}${pos ? `<span class="wp-pos">${e(pos)}${POS_ES[pos] ? ` · ${POS_ES[pos]}` : ""}</span>` : ""}<button class="wp-x" type="button" data-wp="close" aria-label="Close">✕</button></div>
      ${norm(r.word) !== norm(q) ? `<div class="sub">from · de: <i>${e(q)}</i></div>` : ""}
      <div class="wp-es" lang="es">${r.es ? e(r.es) : `<span class="sub">Spanish not available · Traducción no disponible</span>`}</div>
      <div class="wp-pr">${r.ipa ? `<span class="wp-ipa" lang="en">/${e(r.ipa)}/</span>` : ""}${f ? `<span class="wp-fig" title="Pronunciación figurada">🗣️ ${e(f)}</span>` : ""}</div>
      <div class="wp-btns"><button class="wp-b" type="button" data-wp="say" data-w="${e(r.word)}" data-l="en-GB">🔊 UK</button><button class="wp-b" type="button" data-wp="say" data-w="${e(r.word)}" data-l="en-US">🔊 US</button><button class="wp-b" type="button" data-wp="slow" data-w="${e(r.word)}">🐢</button></div>
      ${r.m ? `<div class="wp-row"><span class="wp-lab">Meaning · Significado</span><span lang="en">${e(r.m)}</span></div>` : ""}
      ${r.e ? `<div class="wp-row"><span class="wp-lab">Example · Ejemplo</span><span lang="en"><i>${e(r.e)}</i></span> <button class="wp-b sm" type="button" data-wp="say" data-w="${e(r.e)}" data-l="en-GB" aria-label="Listen to the example">🔊</button>${r.xs ? `<div class="sub" lang="es">${e(r.xs)}</div>` : ""}</div>` : ""}
      <div class="wp-row"><span class="wp-lab">Synonyms by level · Sinónimos por nivel</span>${synHTML(r.s)}</div>
      ${phr ? `<div class="wp-ph">Also · También: ${phr}</div>` : ""}
      <div class="wp-f"><button class="wp-b" type="button" data-wp="dict" data-w="${e(r.word)}">📖 Dictionary</button><button class="wp-b" type="button" data-wp="savew" data-w="${e(r.word)}" data-es="${e(r.es || "")}" data-c="${e(r.c || "")}">${saved(r.word) ? "⭐ Saved" : "☆ Save word"}</button><span class="sub">${r.est ? "≈ estimated level" : ""}</span></div>`;
  }
  const norm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").trim();
  const saved = w => !!(window.S && S.myWords && S.myWords.some(x => norm(x.w) === norm(w)));
  async function show(q, rect, extra) {
    if (!window.DICT || !DICT.lookup) return;
    ensure(); const id = ++cur;
    box.innerHTML = render(q, null, extra, true); box.hidden = false; place(rect);
    let r = null; try { r = await DICT.lookup(q); } catch (x) { r = null; }
    if (id !== cur) return;
    box.innerHTML = render(q, r, extra); place(rect);
    if (window.S) { S.wpLog = S.wpLog || {}; const k = norm((r && r.word) || q); S.wpLog[k] = (S.wpLog[k] || 0) + 1; }
  }
  function say(t, lang, slow) {
    try { const ss = speechSynthesis; ss.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = lang || "en-GB"; u.rate = slow ? .6 : .9; const v = (ss.getVoices() || []).find(v => v.lang && v.lang.replace("_", "-").toLowerCase().startsWith((lang || "en-GB").toLowerCase())); if (v) u.voice = v; ss.speak(u); } catch (x) { }
  }

  /* ---------- events ---------- */
  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-wp]");
    if (b) {
      ev.preventDefault(); const a = b.dataset.wp, w = b.dataset.w;
      if (a === "close") close();
      else if (a === "say") say(w, b.dataset.l);
      else if (a === "slow") say(w, "en-GB", true);
      else if (a === "go") show(w, null, []);
      else if (a === "dict") { close(); if (window.DICT && DICT.search) { if (typeof VIEWS !== "undefined" && VIEWS.some(v => v[0] === "dict")) location.hash = "dict"; DICT.search(w); } }
      else if (a === "savew" && window.S) { S.myWords = S.myWords || []; if (!saved(w)) S.myWords.unshift({ w, es: b.dataset.es, c: b.dataset.c, at: Date.now() }); else S.myWords = S.myWords.filter(x => norm(x.w) !== norm(w)); S.myWords = S.myWords.slice(0, 300); store(); b.textContent = saved(w) ? "⭐ Saved" : "☆ Save word"; }
      return;
    }
    if (box && !box.hidden && !ev.target.closest("#td-wp")) close();
    if (!on() || ev.defaultPrevented || ev.button !== 0) return;
    const sel = window.getSelection && getSelection(); if (sel && !sel.isCollapsed && String(sel).trim()) return;
    const t = ev.target; if (!t || !t.closest || t.closest(SKIP)) return;
    const hit = wordAt(ev.clientX, ev.clientY); if (!hit || hit.el.closest(SKIP) || isSpanishEl(hit.el)) return;
    const extra = [];
    if (window.DICT && DICT.hasPhrase) {
      const n = hit.next;
      if (n[1] && DICT.hasPhrase(`${hit.w} ${n[0]} ${n[1]}`)) extra.push(`${hit.w} ${n[0]} ${n[1]}`.toLowerCase());
      if (n[0] && DICT.hasPhrase(`${hit.w} ${n[0]}`)) extra.push(`${hit.w} ${n[0]}`.toLowerCase());
      if (hit.prev && DICT.hasPhrase(`${hit.prev} ${hit.w}`)) extra.push(`${hit.prev} ${hit.w}`.toLowerCase());
    }
    show(hit.w, hit.rect, extra);
  });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape") close(); });
  addEventListener("hashchange", close);
  addEventListener("resize", () => { if (box && !box.hidden) close(); });

  /* one-time hint */
  function hint() {
    if (!window.S || S.wpHint) return; S.wpHint = 1; store();
    const d = document.createElement("div"); d.className = "wp-toast"; d.innerHTML = `💡 Tap any English word to see its translation · Toca cualquier palabra en inglés para ver su traducción`;
    document.body.appendChild(d); setTimeout(() => d.classList.add("in"), 50); setTimeout(() => { d.classList.remove("in"); setTimeout(() => d.remove(), 400); }, 6000);
  }
  setTimeout(hint, 2500);
  window.TAPWORD = { show, close, toggle(v) { if (window.S) { S.wpOff = v === undefined ? !S.wpOff : !v; store(); } return on(); } };

  const css = document.createElement("style");
  css.textContent = `
#td-wp{position:fixed;z-index:90;width:360px;max-height:calc(100vh - 20px);overflow:auto;background:var(--surface,#fff);color:var(--ink,#111);border:1px solid var(--line,#ddd);border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,.22);padding:12px 14px}
#td-wp.sheet{left:0!important;right:0;bottom:0;top:auto!important;width:auto;max-height:70vh;border-radius:18px 18px 0 0;padding-bottom:calc(14px + env(safe-area-inset-bottom))}
.wp-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.wp-h>b{font-size:1.35rem}.wp-pos{font-size:.8rem;color:var(--muted,#666);font-style:italic}
.wp-x{margin-left:auto;border:0;background:var(--sunken,#f2f2f2);border-radius:999px;width:30px;height:30px;cursor:pointer;color:inherit}
.wp-es{font-size:1.2rem;font-weight:800;color:#5b3fb0;margin:6px 0}
.wp-pr{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.wp-ipa{font-family:"Segoe UI","Noto Sans",sans-serif;color:var(--muted,#555)}.wp-fig{background:#fff6dc;color:#7a4b00;border-radius:8px;padding:1px 8px;font-weight:700}
.wp-btns{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.wp-b{border:1px solid var(--line,#ddd);background:var(--surface,#fff);border-radius:999px;padding:4px 10px;font-family:inherit;font-size:.85rem;font-weight:700;cursor:pointer;color:inherit}.wp-b.sm{padding:1px 7px}
.wp-row{border-top:1px solid var(--line,#eee);padding:7px 0;font-size:.93rem}.wp-lab{display:block;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--muted,#777);margin-bottom:3px}
.wp-syn{display:flex;flex-direction:column;gap:4px}.wp-sg{display:flex;gap:6px;align-items:flex-start}.wp-sg>span{display:flex;flex-wrap:wrap;gap:4px}
.wp-chip{border:1px solid #bcd3ff;background:#eef3ff;color:#1f3f8f;border-radius:999px;padding:2px 9px;font-family:inherit;font-size:.85rem;cursor:pointer}.wp-chip.ph{background:#fff1e6;border-color:#f3c89a;color:#9a4b00}
.wp-ph{font-size:.85rem;margin:6px 0}.wp-load{padding:16px 0;color:var(--muted,#666)}
.wp-f{display:flex;gap:6px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line,#eee);padding-top:8px}
.td-wp-hl{position:absolute;z-index:59;background:rgba(255,214,0,.38);border-radius:4px;pointer-events:none}
.wp-toast{position:fixed;left:50%;bottom:84px;transform:translate(-50%,20px);opacity:0;transition:.35s;background:#1f2937;color:#fff;padding:10px 16px;border-radius:12px;z-index:61;max-width:92vw;font-size:.9rem;box-shadow:0 8px 24px rgba(0,0,0,.25)}.wp-toast.in{opacity:1;transform:translate(-50%,0)}
@media (min-width:761px){.wp-toast{bottom:24px}}
main p,main li,main td,main .sp-t,main .st-sen,main .cc-ex li,main .bk-read p{cursor:text}`;
  document.head.appendChild(css);
})();

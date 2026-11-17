/* Teacher Dario · Dictionary. Look up any word or expression: Spanish, pronunciation, CEFR level and levelled synonyms.
   Built-in entries come from the platform's lessons and the B2 First Learn section; other words come from Claude (on Claude)
   or from free online dictionaries (on the public site), with an estimated level. */
(function () {
  const D = window.DICT_DATA || { entries: [], ladder: [] };
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const E = D.entries.map((r, i) => ({ i, w: r[0], t: r[1], c: r[2], p: r[3], es: r[4], s: r[5] || [], m: r[6], e: r[7], src: r[8], fam: r[9], up: r[10], xs: r[11] || "" }));
  const escH = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/\(.*?\)/g, " ").replace(/[^a-z' -]/g, " ").replace(/\s+/g, " ").trim();

  /* ---------- index ---------- */
  const IDX = new Map();
  const addK = (k, e) => { k = norm(k); if (!k) return; const a = IDX.get(k) || []; if (!a.includes(e)) a.push(e); IDX.set(k, a); };
  E.forEach(e => { addK(e.w, e); if (e.fam) e.fam.forEach(c => String(c || "").split(",").forEach(x => addK(x, e))); });
  const HEADS = [...new Set(E.map(e => e.w))].sort((a, b) => a.localeCompare(b));
  const LADDER = new Map(); (D.ladder || []).forEach(r => { const k = norm(r[0]); const a = LADDER.get(k) || []; a.push(r); LADDER.set(k, a); });
  const EST = new Map(); const C = window.CEFR_EST || {};
  LV.forEach(l => String(C[l] || "").split(" ").forEach(w => { if (w && !EST.has(w)) EST.set(w, l); }));
  function stems(q) {
    const o = [q];
    if (q.endsWith("ies")) o.push(q.slice(0, -3) + "y");
    if (q.endsWith("es")) o.push(q.slice(0, -2));
    if (q.endsWith("s")) o.push(q.slice(0, -1));
    if (q.endsWith("ied")) o.push(q.slice(0, -3) + "y");
    if (q.endsWith("ed")) o.push(q.slice(0, -2), q.slice(0, -1));
    if (q.endsWith("ing")) o.push(q.slice(0, -3), q.slice(0, -3) + "e");
    if (q.endsWith("ly")) o.push(q.slice(0, -2));
    return o;
  }
  const IRR = { gave: "give", given: "give", took: "take", taken: "take", got: "get", gotten: "get", came: "come", went: "go", gone: "go", ran: "run", brought: "bring", made: "make", kept: "keep", broke: "break", broken: "break", fell: "fall", fallen: "fall", held: "hold", stood: "stand", thought: "think", wore: "wear", worn: "wear", found: "find", told: "tell", did: "do", done: "do", had: "have", has: "have", lost: "lose", caught: "catch", paid: "pay", set: "set", put: "put", cut: "cut", let: "let", shown: "show", grew: "grow", grown: "grow", knew: "know", chose: "choose", chosen: "choose", lent: "lend", rose: "rise", risen: "rise", sold: "sell", sent: "send", spent: "spend", understood: "understand", won: "win", wrote: "write", written: "write", began: "begin", begun: "begin", ate: "eat", eaten: "eat", drank: "drink", drove: "drive", flew: "fly", forgot: "forget", gave_: "give", left: "leave", met: "meet", read: "read", said: "say", saw: "see", seen: "see", spoke: "speak", taught: "teach", threw: "throw" };
  function exact(q) {
    q = norm(q); const cands = [...stems(q)];
    const ws = q.split(" ");
    if (ws.length > 1) { const f = ws[0], rest = ws.slice(1).join(" "); [IRR[f], ...stems(f).slice(1)].filter(Boolean).forEach(b => cands.push(b + " " + rest)); }
    else if (IRR[q]) cands.push(IRR[q]);
    for (const k of cands) { const r = IDX.get(k); if (r) return r; }
    return [];
  }
  const SMALL = new Set("a an the to of in on at for with up out off down over away into your you someone something somebody be is are am it my his her their our".split(" "));
  function levelOf(w) {
    const n = norm(w); const r = IDX.get(n);
    if (r && norm(r[0].w) === n) return { c: r[0].c, est: false };
    const parts = n.split(" ").filter(Boolean); let worst = null;
    for (const p of parts) {
      if (SMALL.has(p) && parts.length > 1) continue;
      let l = EST.get(p);
      if (!l) for (const s of stems(p)) if (EST.has(s)) { l = EST.get(s); break; }
      if (!l && p.length > 2) l = "C2";
      if (l && (!worst || LV.indexOf(l) > LV.indexOf(worst))) worst = l;
    }
    return worst ? { c: worst, est: true } : null;
  }

  /* ---------- state ---------- */
  const S = { q: "", res: null, list: [], lvl: "", cat: "", n: 40, busy: false, err: "", hist: [] };
  let VER = 1;
  let cache = {}; try { cache = JSON.parse(localStorage.getItem("td-dict-cache") || "{}"); } catch (e) { cache = {}; }
  const saveCache = () => { try { const k = Object.keys(cache); if (k.length > 300) k.slice(0, k.length - 300).forEach(x => delete cache[x]); localStorage.setItem("td-dict-cache", JSON.stringify(cache)); } catch (e) { } };

  /* ---------- online look-up (any word) ---------- */
  let samplerP = null;
  function sampler() { if (!samplerP) samplerP = (window.claude && typeof window.claude.use === "function") ? Promise.resolve(window.claude.use("sample")).catch(() => null) : Promise.resolve(null); return samplerP; }
  async function viaClaude(q) {
    const sample = await sampler(); if (!sample) return null;
    const prompt = `You are an English learner's dictionary for Spanish speakers in Mexico. Look up: "${q}".
Reply with JSON only (no prose, no code fences) in exactly this shape:
{"word":"headword in its base form","type":"noun | verb | adjective | adverb | phrasal verb | expression | idiom | other","cefr":"A1|A2|B1|B2|C1|C2","ipa":"British IPA without slashes","ipa_us":"American IPA without slashes","spanish":"natural Mexican Spanish translation(s), comma separated","meaning":"short, simple English definition","example":"one natural example sentence","synonyms":[{"word":"…","cefr":"A1|A2|B1|B2|C1|C2"}],"notes":"one short usage tip, or empty"}
Rules: cefr is the level at which learners typically meet this meaning (English Vocabulary Profile style). Give up to 6 synonyms or close alternatives, easiest first, each with its own level. If the input is misspelled or not English, use the closest English word and say so in notes.`;
    let v;
    if (typeof sample.json === "function") v = await sample.json(prompt, { modelTier: "quick" });
    else { const r = await sample(prompt, { modelTier: "quick" }); v = JSON.parse(String(r.text || "").replace(/^```(json)?|```$/g, "").trim()); }
    if (!v || !v.word) return null;
    return { word: v.word, type: v.type || "", c: LV.includes(v.cefr) ? v.cefr : null, est: false, ipa: v.ipa || "", ipaUS: v.ipa_us || "", es: v.spanish || "", m: v.meaning || "", e: v.example || "", s: (v.synonyms || []).map(x => typeof x === "string" ? { word: x } : x).filter(x => x && x.word).slice(0, 8), notes: v.notes || "", via: "Claude" };
  }
  async function viaWeb(q) {
    const out = { word: q, type: "", c: null, est: true, ipa: "", es: "", m: "", e: "", s: [], notes: "", via: "web" };
    let got = false;
    try {
      const r = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(q));
      if (r.ok) {
        const j = await r.json(); const e = j[0] || {}; got = true;
        out.word = e.word || q;
        out.ipa = String(e.phonetic || ((e.phonetics || []).find(p => p.text) || {}).text || "").replace(/\//g, "");
        const ms = e.meanings || []; out.type = (ms[0] || {}).partOfSpeech || "";
        const defs = ms.flatMap(m => m.definitions || []);
        out.m = (defs.find(d => d.definition) || {}).definition || "";
        out.e = (defs.find(d => d.example) || {}).example || "";
        const syn = new Set(); ms.forEach(m => { (m.synonyms || []).forEach(s => syn.add(s)); (m.definitions || []).forEach(d => (d.synonyms || []).forEach(s => syn.add(s))); });
        out.s = [...syn].filter(s => norm(s) !== norm(out.word)).slice(0, 8).map(w => ({ word: w }));
      }
    } catch (e) { }
    try {
      const r = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(q) + "&langpair=en|es");
      if (r.ok) { const j = await r.json(); const t = j && j.responseData && j.responseData.translatedText; if (t && norm(t) !== norm(q)) { out.es = t; got = true; } }
    } catch (e) { }
    if (!got) return null;
    const L = levelOf(out.word); if (L) { out.c = L.c; out.est = L.est; }
    return out;
  }
  async function lookOnline(q) {
    const key = norm(q); if (cache[key]) return cache[key];
    let r = null;
    try { r = await viaClaude(q); } catch (e) { r = null; }
    if (!r) r = await viaWeb(q);
    if (r) { cache[key] = r; saveCache(); }
    return r;
  }

  /* ---------- actions ---------- */
  function rerender() { VER++; document.querySelectorAll("[data-dict-mount]").forEach(m => { m.innerHTML = html(m.dataset.dictMount); m.dataset.v = VER; }); }
  function open(e) { S.res = { kind: "entry", e }; S.err = ""; rerender(); scrollRes(); }
  function scrollRes() { setTimeout(() => { const r = document.querySelector(".view.on .dres"); if (!r || !r.scrollIntoView) return; const t = r.getBoundingClientRect().top; if (t < 0 || t > innerHeight - 80) r.scrollIntoView({ block: "start", behavior: "smooth" }); }, 30); }
  async function search(q) {
    q = String(q || "").trim(); S.q = q; S.err = "";
    if (!q) { S.res = null; rerender(); return; }
    if (!S.hist.includes(q.toLowerCase())) { S.hist.unshift(q.toLowerCase()); S.hist = S.hist.slice(0, 8); }
    const lad = LADDER.get(norm(q));
    const hits = exact(q);
    if (hits.length) { S.res = { kind: "entry", e: hits[0], more: hits.slice(1), lad }; rerender(); scrollRes(); return; }
    if (lad) { S.res = { kind: "ladder", lad }; rerender(); scrollRes(); return; }
    S.busy = true; S.res = null; rerender();
    const r = await lookOnline(q);
    S.busy = false;
    if (r) S.res = { kind: "online", o: r };
    else S.err = navigator.onLine === false ? "You are offline. Built-in words still work; for other words, connect to the internet. · Sin conexión." : "No result found. Check the spelling and try again. · No se encontró. Revisa la ortografía.";
    rerender(); scrollRes();
  }
  function say(text, lang) {
    try {
      const ss = window.speechSynthesis; if (!ss) return; ss.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = .9;
      const v = (ss.getVoices() || []).find(v => v.lang && v.lang.replace("_", "-").toLowerCase().startsWith(lang.toLowerCase())); if (v) u.voice = v;
      ss.speak(u);
    } catch (e) { }
  }

  /* ---------- markup ---------- */
  const badge = (c, est) => c ? `<span class="lvl ${c}" title="${est ? "Estimated level · nivel estimado" : "CEFR level · nivel MCER"}">${est ? "≈" : ""}${c}</span>` : `<span class="lvl dq" title="Level unknown">?</span>`;
  const sayBtns = (w, sm) => `<button class="dsay${sm ? " sm" : ""}" type="button" data-dict="say" data-w="${escH(w)}" data-lang="en-GB" aria-label="Listen, British: ${escH(w)}">🔊 UK</button><button class="dsay${sm ? " sm" : ""}" type="button" data-dict="say" data-w="${escH(w)}" data-lang="en-US" aria-label="Listen, American: ${escH(w)}">🔊 US</button>`;
  function synChips(list) {
    const items = list.map(x => { const w = typeof x === "string" ? x : x.word; let c = typeof x === "object" && LV.includes(x.cefr) ? { c: x.cefr, est: false } : levelOf(w); return { w, c: c ? c.c : null, est: c ? c.est : true }; })
      .filter(x => x.w).sort((a, b) => (a.c ? LV.indexOf(a.c) : 9) - (b.c ? LV.indexOf(b.c) : 9));
    if (!items.length) return `<p class="sub">No synonyms listed. · Sin sinónimos registrados.</p>`;
    const g = {}; items.forEach(x => (g[x.c || "?"] = g[x.c || "?"] || []).push(x));
    return `<div class="dsyn">${[...LV, "?"].filter(l => g[l]).map(l => `<div class="dsyng">${l === "?" ? badge(null) : badge(l, g[l].every(x => x.est))}<span>${g[l].map(x => `<button type="button" class="dchip" data-dict="go" data-w="${escH(x.w)}" lang="en">${escH(x.w)}</button>`).join("")}</span></div>`).join("")}</div>`;
  }
  const row = (lab, body) => `<div class="drow"><span class="dlab">${lab}</span><div>${body}</div></div>`;
  function ladderHTML(lad) {
    return lad.map(r => `<div class="dladder"><span class="lvl A2">A2</span> <b lang="en">${escH(r[0])}</b> → ${r.slice(1).filter(Boolean).map(w => { const L = levelOf(w.replace(/^am /, "")); return `<button type="button" class="dchip" data-dict="go" data-w="${escH(w.replace(/^am /, ""))}" lang="en">${escH(w)} ${L ? badge(L.c, L.est) : ""}</button>`; }).join(" ")}</div>`).join("");
  }
  function entryHTML(e, more, lad) {
    const fam = e.fam ? `<div class="tblwrap"><table class="ftab dfam"><thead><tr><th>Noun(s)<br><span class="sub">sustantivo</span></th><th>Adjective(s)<br><span class="sub">adjetivo</span></th><th>Adverb<br><span class="sub">adverbio</span></th><th>Opposite<br><span class="sub">contrario</span></th></tr></thead><tbody><tr>${e.fam.map(c => `<td lang="en">${escH(c || "–")}</td>`).join("")}</tr></tbody></table></div>` : "";
    return `<article class="card dres" aria-live="polite">
      <div class="dhead"><h2 lang="en">${escH(e.w)}</h2>${badge(e.c, false)}<span class="sub">${escH(e.t)}</span></div>
      ${row("Pronunciation<br><span>Pronunciación</span>", `${e.p ? `<span class="ipa" lang="en">/${escH(e.p)}/</span>` : ""}${sayBtns(e.w)}`)}
      ${row("Spanish<br><span>Español</span>", `<b class="des" lang="es">${escH(e.es)}</b>`)}
      ${e.m ? row("Meaning<br><span>Significado</span>", `<span lang="en">${escH(e.m)}</span>`) : ""}
      ${e.e ? row("Example<br><span>Ejemplo</span>", `<span class="dex" lang="en">${escH(e.e)}</span> <button class="dsay sm" type="button" data-dict="say" data-w="${escH(e.e)}" data-lang="en-GB" aria-label="Listen to the example">🔊</button>${e.xs ? `<div class="sub" lang="es">${escH(e.xs)}</div>` : ""}`) : ""}
      ${row("Synonyms by level<br><span>Sinónimos por nivel</span>", synChips(e.s))}
      ${e.up ? row("Level up<br><span>Sube de nivel</span>", `<span class="sub">Use <b lang="en">${escH(e.w)}</b> instead of: </span>${e.up.map(u => `<button type="button" class="dchip" data-dict="go" data-w="${escH(u)}" lang="en">${escH(u)} <span class="lvl A2">A2</span></button>`).join(" ")}`) : ""}
      ${fam ? row("Word family<br><span>Familia de palabras</span>", fam) : ""}
      ${lad ? row("Level up<br><span>Sube de nivel</span>", ladderHTML(lad)) : ""}
      ${e.src ? `<p class="sub dsrc">Seen in · Visto en: ${escH(e.src)}</p>` : ""}
      ${more && more.length ? `<p class="sub">Also · También: ${more.map(m => `<button type="button" class="dchip" data-dict="open" data-i="${m.i}">${escH(m.w)} (${escH(m.t)})</button>`).join(" ")}</p>` : ""}
    </article>`;
  }
  function onlineHTML(o) {
    return `<article class="card dres" aria-live="polite">
      <div class="dhead"><h2 lang="en">${escH(o.word)}</h2>${badge(o.c, o.est)}<span class="sub">${escH(o.type)}</span></div>
      ${row("Pronunciation<br><span>Pronunciación</span>", `${o.ipa ? `<span class="ipa" lang="en" title="British">/${escH(o.ipa)}/</span>` : ""}${o.ipaUS && o.ipaUS !== o.ipa ? `<span class="ipa" lang="en" title="American"> US /${escH(o.ipaUS)}/</span>` : ""}${sayBtns(o.word)}`)}
      ${row("Spanish<br><span>Español</span>", o.es ? `<b class="des" lang="es">${escH(o.es)}</b>` : `<span class="sub">Not available · No disponible</span>`)}
      ${o.m ? row("Meaning<br><span>Significado</span>", `<span lang="en">${escH(o.m)}</span>`) : ""}
      ${o.e ? row("Example<br><span>Ejemplo</span>", `<span class="dex" lang="en">${escH(o.e)}</span> <button class="dsay sm" type="button" data-dict="say" data-w="${escH(o.e)}" data-lang="en-GB" aria-label="Listen to the example">🔊</button>`) : ""}
      ${row("Synonyms by level<br><span>Sinónimos por nivel</span>", synChips(o.s || []))}
      ${o.notes ? row("Tip<br><span>Consejo</span>", `<span lang="en">${escH(o.notes)}</span>`) : ""}
      <p class="sub dsrc">${o.via === "Claude" ? "Looked up with Claude. · Consultado con Claude." : "From free online dictionaries; ≈ means the level is estimated from how common the word is. · De diccionarios en línea; ≈ = nivel estimado."}</p>
    </article>`;
  }
  function browse() {
    let L = E;
    if (S.lvl) L = L.filter(e => e.c === S.lvl);
    if (S.cat === "w") L = L.filter(e => !["phrasal verb", "expression"].includes(e.t) && !e.fam && !e.up);
    if (S.cat === "pv") L = L.filter(e => e.t === "phrasal verb");
    if (S.cat === "ex") L = L.filter(e => e.t === "expression");
    if (S.cat === "wf") L = L.filter(e => e.fam);
    if (S.cat === "up") L = L.filter(e => e.up);
    L = [...L].sort((a, b) => a.w.localeCompare(b.w));
    const cats = [["", "All · Todo"], ["w", "Lesson words"], ["pv", "Phrasal verbs"], ["ex", "Expressions"], ["wf", "Word families"], ["up", "Level-up words"]];
    return `<div class="card"><h2>Browse · Explorar <span class="sub">${L.length} entries</span></h2>
      <div class="seg sm" role="group" aria-label="Level">${["", ...LV].map(l => `<button class="chip" type="button" data-dict="lvl" data-v="${l}" aria-pressed="${S.lvl === l}">${l || "All levels"}</button>`).join("")}</div>
      <div class="seg sm" role="group" aria-label="Type" style="margin-top:6px">${cats.map(([k, l]) => `<button class="chip" type="button" data-dict="cat" data-v="${k}" aria-pressed="${S.cat === k}">${l}</button>`).join("")}</div>
      <ul class="dlist">${L.slice(0, S.n).map(e => `<li><button type="button" data-dict="open" data-i="${e.i}"><span class="lvl ${e.c}">${e.c}</span><b lang="en">${escH(e.w)}</b><span class="sub">${escH(e.t)}</span><span class="des" lang="es">${escH(e.es)}</span></button></li>`).join("")}</ul>
      ${L.length > S.n ? `<button class="btn" type="button" data-dict="more">Show more · Ver más (${L.length - S.n})</button>` : ""}</div>`;
  }
  function sugHTML(q) {
    q = norm(q); if (q.length < 2) return "";
    const out = HEADS.filter(w => norm(w).startsWith(q)).concat(HEADS.filter(w => !norm(w).startsWith(q) && norm(w).includes(" " + q))).slice(0, 8);
    return out.map(w => `<button type="button" class="dchip" data-dict="go" data-w="${escH(w)}" lang="en">${escH(w)}</button>`).join("");
  }
  function html(ctx) {
    const r = S.res;
    return `<div class="dict">
      <form class="card dform" data-dict-form="${ctx}" role="search">
        <label for="dict-q-${ctx}"><b>Look up any word or expression</b> <span class="sub">· Busca cualquier palabra o expresión</span></label>
        <div class="row"><input class="search" id="dict-q-${ctx}" data-dict-q="${ctx}" type="search" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="e.g. enormous, give up, break the ice" value="${escH(S.q)}" lang="en"><button class="btn primary" type="submit">Search · Buscar</button></div>
        <div class="dsug" id="dict-sug-${ctx}">${r ? "" : sugHTML(S.q)}</div>
        ${S.hist.length ? `<p class="sub dhist">Recent · Recientes: ${S.hist.map(h => `<button type="button" class="dchip sm" data-dict="go" data-w="${escH(h)}">${escH(h)}</button>`).join("")}</p>` : ""}
        <p class="sub">Every result shows the Spanish translation, British and American pronunciation, the CEFR level (A1–C2) and synonyms sorted by level.</p>
      </form>
      ${S.busy ? `<div class="card dres"><p>Looking it up… · Buscando…</p></div>` : ""}
      ${S.err ? `<div class="card dres"><p>${escH(S.err)}</p></div>` : ""}
      ${r && r.kind === "entry" ? entryHTML(r.e, r.more, r.lad) : ""}
      ${r && r.kind === "ladder" ? `<article class="card dres"><div class="dhead"><h2 lang="en">${escH(S.q)}</h2><span class="sub">Level up · Sube de nivel</span></div>${ladderHTML(r.lad)}</article>` : ""}
      ${r && r.kind === "online" ? onlineHTML(r.o) : ""}
      ${browse()}
    </div>`;
  }

  /* ---------- events ---------- */
  document.addEventListener("submit", ev => { const f = ev.target.closest && ev.target.closest("[data-dict-form]"); if (!f) return; ev.preventDefault(); const i = f.querySelector("[data-dict-q]"); search(i ? i.value : ""); });
  document.addEventListener("input", ev => { const i = ev.target; if (!i.dataset || i.dataset.dictQ === undefined) return; S.q = i.value; const s = document.getElementById("dict-sug-" + i.dataset.dictQ); if (s) s.innerHTML = sugHTML(i.value); });
  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-dict]"); if (!b) return; const a = b.dataset.dict;
    if (a === "say") say(b.dataset.w, b.dataset.lang || "en-GB");
    else if (a === "go") search(b.dataset.w);
    else if (a === "open") { const e = E[+b.dataset.i]; if (e) { S.q = e.w; open(e); } }
    else if (a === "lvl") { S.lvl = b.dataset.v; S.n = 40; rerender(); }
    else if (a === "cat") { S.cat = b.dataset.v; S.n = 40; rerender(); }
    else if (a === "more") { S.n += 60; rerender(); }
  });

  /* ---------- styles ---------- */
  const st = document.createElement("style");
  st.textContent = `.dict{display:flex;flex-direction:column;gap:14px}
.dform .row{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}
.dsug{display:flex;flex-wrap:wrap;gap:6px}
.dchip{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:4px 10px;min-height:32px;display:inline-flex;align-items:center;gap:6px;margin:2px 0;font:inherit;cursor:pointer}
.dchip:hover{border-color:var(--accent)}
.dchip.sm{min-height:28px;padding:2px 8px;font-size:.9rem}
.dchip .lvl{min-width:26px;height:20px;font-size:.72rem}
.dhead{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px}
.dhead h2{font-family:var(--read);font-size:1.7rem;margin:0}
.drow{display:grid;grid-template-columns:150px 1fr;gap:10px;padding:10px 0;border-top:1px solid var(--line);align-items:start}
.dlab{font-weight:700;font-size:.85rem;line-height:1.25}.dlab span{font-weight:400;color:var(--muted)}
.ipa{font-family:"Segoe UI","Lucida Sans Unicode","Arial Unicode MS",sans-serif;font-size:1.1rem;margin-right:8px}
.des{font-size:1.1rem}
.dex{font-family:var(--read);font-style:italic}
.dsay{border:1px solid var(--line);background:var(--sunken);border-radius:8px;padding:4px 10px;min-height:34px;margin:2px 6px 2px 0;font:inherit;font-size:.9rem;cursor:pointer}
.dsay.sm{min-height:28px;padding:2px 8px}
.dsyn{display:flex;flex-direction:column;gap:6px}
.dsyng{display:flex;gap:8px;align-items:flex-start}.dsyng>span:last-child{display:flex;flex-wrap:wrap;gap:4px}
.lvl.dq{background:var(--idle,#5a6479);color:#fff}
.dladder{padding:6px 0;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.dsrc{margin-top:8px}
.dfam td,.dfam th{padding:6px 8px;text-align:left;vertical-align:top}
.dlist{list-style:none;margin:10px 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:6px}
.dlist button{width:100%;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:8px;text-align:left;border:1px solid var(--line);background:var(--surface);border-radius:8px;padding:8px 10px;font:inherit;cursor:pointer}
.dlist button:hover{border-color:var(--accent)}
.dlist .lvl{grid-row:span 2;align-self:center}
.dlist .sub{display:none}
.dlist .des{font-size:.92rem;color:var(--muted)}
@media(max-width:600px){.drow{grid-template-columns:1fr;gap:4px}.dhead h2{font-size:1.45rem}}`;
  document.head.appendChild(st);

  /* ---------- main "Dictionary" view for every level ---------- */
  window.DICT = { html, search, levelOf, entries: E, state: S };
  if (typeof VIEWS !== "undefined" && Array.isArray(VIEWS) && !VIEWS.some(v => v[0] === "dict")) {
    const i = VIEWS.findIndex(v => v[0] === "progress");
    VIEWS.splice(i < 0 ? VIEWS.length : i, 0, ["dict", "Dictionary", '<path d="M5 4.5A1.5 1.5 0 016.5 3H19v15H6.5A1.5 1.5 0 005 19.5zM5 19.5A1.5 1.5 0 006.5 21H19M9 7h6M9 10.5h4"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-dict")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-dict"; sec.setAttribute("aria-label", "Dictionary"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    const renderDictView = () => {
      const s = document.getElementById("v-dict"); if (!s) return;
      if (!s.dataset.ready) { s.innerHTML = `<div class="head"><h1>Dictionary</h1><span class="sub">Diccionario · Spanish, pronunciation, CEFR level and synonyms</span></div><div data-dict-mount="main"></div>`; s.dataset.ready = "1"; }
      const m = s.querySelector("[data-dict-mount]"); if (m && m.dataset.v != VER) { m.innerHTML = html("main"); m.dataset.v = VER; }
    };
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); renderDictView(); }; try { render(); } catch (e) { } }
  }
})();

/* Teacher Dario · Verbs course (A1–C2, 1,000 verbs). Game-style path, verb table and practice.
   Data: window.VERBS_DATA (verbsdata.js). Photos: verbimg-<level>.js, loaded when a level is opened. */
(function () {
  const VD = window.VERBS_DATA; if (!VD || typeof VIEWS === "undefined") return;
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const LVA = [...LV, "PET", "FCE"];
  const ALW = () => { const a = (window.TD_ALLOW || {})["VERB"]; return a && a.length ? LVA.filter(l => a.includes(l)) : LVA; };
  const GRAM = { A1: "Present simple · Presente simple", A2: "Past simple, going to, present continuous · Pasado simple y futuro", B1: "Present perfect, past continuous, will, first conditional · Presente perfecto y condicional 1", B2: "Passive, 2nd and 3rd conditional, reported speech · Voz pasiva y condicionales", C1: "Perfect modals, inversion, participle clauses · Modales perfectos e inversión", C2: "Advanced structures and formal style · Estructuras avanzadas", PET: "B1 Preliminary key verbs and phrasal verbs · Verbos clave del examen B1 Preliminary", FCE: "B2 First phrasal verbs · Verbos frasales del examen B2 First" };
  const escH = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nrm = s => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' /-]/g, "").replace(/\s+/g, " ").trim();
  // entry: [base, past, pp, es, esPast, esPP, figBase, figPast, figPP, irregular, sentence, spanish, by, page]
  const V = {}; LVA.forEach(l => { V[l] = (VD[l] || []).map((r, i) => ({ id: "v_" + r[0].replace(/[^a-z]/gi, "_"), lv: l, n: i + 1, b: r[0], pa: r[1], pp: r[2], es: r[3], esp: r[4], espp: r[5], fb: r[6], fpa: r[7], fpp: r[8], irr: !!r[9], s: r[10], xs: r[11], by: r[12] || "", page: r[13] || "" })); });
  const ALLV = LVA.flatMap(l => V[l]);
  const IMG = window.VERB_IMG = window.VERB_IMG || {};
  const imgLoading = {};
  function loadImgs(lv) {
    if (IMG[lv] || imgLoading[lv]) return; imgLoading[lv] = true;
    const s = document.createElement("script"); s.src = (window.VERB_IMG_BASE || "") + "verbimg-" + lv.toLowerCase() + ".js"; s.onload = () => { if (curView() === "verbs") draw(); }; s.onerror = () => { imgLoading[lv] = false; };
    document.head.appendChild(s);
  }
  const imgOf = v => (IMG[v.lv] || {})[v.id] || "";
  const pic = (v, cls) => { const src = imgOf(v); return src ? `<img class="${cls || "vpic"}" src="${src}" alt="Photo for ${escH(v.b)}" loading="lazy">` : `<div class="${cls || "vpic"} vpic-empty" aria-hidden="true">🖼️</div>`; };
  const credit = v => v.by ? `<span class="vcred">Photo: <a href="${escH(v.page)}" target="_blank" rel="noopener">${escH(v.by)}</a> / Unsplash</span>` : "";
  const first = s => String(s || "").split(/\s*[,/]\s*/)[0];

  /* ---------- state ---------- */
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const yday = () => { const d = new Date(Date.now() - 864e5); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  function St() {
    if (!S.verb) S.verb = {}; const v = S.verb;
    v.lv = v.lv || (LVA.includes(window.TD_LEVEL) ? window.TD_LEVEL : "A1"); v.tab = v.tab || "path";
    v.xp = v.xp || 0; v.units = v.units || {}; v.seen = v.seen || []; v.best = v.best || {};
    v.streak = v.streak || { n: 0, last: "" }; if (!v.day || v.day.d !== today()) v.day = { d: today(), xp: 0 };
    if (v.streak.last && v.streak.last !== today() && v.streak.last !== yday()) v.streak.n = 0;
    if (S.voc && S.voc.snd === false) v.snd = false; return v;
  }
  const store = () => { try { save(); } catch (e) { } };
  const UNIT = 10, GOAL = 20, HEARTS = 5;
  const uc = {};
  function units(lv) { if (uc[lv]) return uc[lv]; const vs = V[lv].slice().sort((a, b) => a.s.split(" ").length - b.s.split(" ").length || a.b.localeCompare(b.b)); const out = []; for (let i = 0; i < vs.length; i += UNIT) out.push(vs.slice(i, i + UNIT)); if (out.length > 1 && out[out.length - 1].length < 5) { out[out.length - 2] = out[out.length - 2].concat(out.pop()); } return (uc[lv] = out); }
  const done = (v, lv, i) => ((v.units[lv] || {})[i] || {}).c || 0;
  const canSpeak = () => !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  function speak(t, rate) { try { const ss = speechSynthesis; ss.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "en-GB"; u.rate = rate || .9; const vv = (ss.getVoices() || []).find(x => /^en[-_]GB/i.test(x.lang || "")); if (vv) u.voice = vv; ss.speak(u); } catch (e) { } }
  let actx = null;
  function beep(ok) { if (St().snd === false) return; try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const t0 = actx.currentTime; (ok ? [[660, 0], [880, .09]] : [[220, 0], [180, .12]]).forEach(([f, d]) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = ok ? "sine" : "square"; o.frequency.value = f; g.gain.setValueAtTime(.0001, t0 + d); g.gain.exponentialRampToValueAtTime(ok ? .18 : .06, t0 + d + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + d + .16); o.connect(g); g.connect(actx.destination); o.start(t0 + d); o.stop(t0 + d + .18); }); } catch (e) { } }

  /* ---------- exercises ---------- */
  const typeForms = lv => lv === "FCE" || lv === "PET" || LV.indexOf(lv) >= 2;          // B1+ type the forms
  const COMMON = new Set(); { const CE = window.CEFR_EST || {}; ["A1", "A2", "B1", "B2"].forEach(l => String(CE[l] || "").split(" ").forEach(w => COMMON.add(w))); }
  function mkBuild(v) {
    let s = v.s.trim(); const end = /[.!?]$/.test(s) ? s.slice(-1) : "."; if (/[.!?]$/.test(s)) s = s.slice(0, -1);
    const toks = s.split(/\s+/); const t0 = toks[0]; if (t0 !== "I" && /^[A-Z][a-z']*$/.test(t0) && COMMON.has(t0.toLowerCase())) toks[0] = t0.toLowerCase();
    return { toks, end, order: shuffle(toks.map((_, k) => k)), picked: [] };
  }
  const full = it => { const t = it.toks.join(" ") + it.end; return t.charAt(0).toUpperCase() + t.slice(1); };
  const buildOK = it => it.picked.length === it.toks.length && it.picked.every((k, j) => nrm(it.toks[k]) === nrm(it.toks[j]));
  function wrongPasts(v) {
    const out = new Set(); const b = first(v.b);
    const reg = b.endsWith("e") ? b + "d" : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + "ied" : b + "ed";
    if (nrm(reg) !== nrm(first(v.pa))) out.add(reg);
    if (nrm(first(v.pp)) !== nrm(first(v.pa))) out.add(first(v.pp));
    out.add(b + "s"); out.add(b.endsWith("e") && !b.endsWith("ee") ? b.slice(0, -1) + "ing" : b + "ing");
    return [...out].filter(x => x && nrm(x) !== nrm(first(v.pa)));
  }
  function distract(v, field, n, pool) {
    const seen = new Set([nrm(first(v[field]))]), out = [];
    for (const x of shuffle(pool)) { const val = first(x[field]); if (!val || seen.has(nrm(val))) continue; seen.add(nrm(val)); out.push(val); if (out.length === n) break; }
    return out;
  }
  function build(lv, ui) {
    const v = St(), W = shuffle(units(lv)[ui]), pool = V[lv], steps = [];
    const kinds = ["pic", "mean", "past", canSpeak() ? "listen" : "pic", lv === "A1" ? "mean" : "espast"];
    W.forEach((x, j) => {
      if (!v.seen.includes(x.id)) steps.push({ k: "intro", x });
      const k = kinds[j % kinds.length];
      if (k === "pic" && imgOf(x)) steps.push({ k, x, opts: shuffle([first(x.b), ...distract(x, "b", 3, pool)]), ans: first(x.b) });
      else if (k === "pic" || k === "mean") steps.push({ k: "mean", x, opts: shuffle([first(x.es), ...distract(x, "es", 3, pool)]), ans: first(x.es) });
      else if (k === "listen") { const f = x.pa && j % 2 ? first(x.pa) : first(x.b); steps.push({ k, x, say: f, opts: shuffle([f, ...shuffle([...distract(x, j % 2 ? "pa" : "b", 3, pool)])]).slice(0, 4), ans: f }); }
      else if (k === "past") { if (typeForms(lv)) steps.push({ k: "typepast", x, val: "" }); else steps.push({ k, x, opts: shuffle([first(x.pa), ...shuffle(wrongPasts(x)).slice(0, 3)]), ans: first(x.pa) }); }
      else if (k === "espast") steps.push({ k, x, opts: shuffle([first(x.pa), ...distract(x, "pa", 3, pool)]), ans: first(x.pa) });
    });
    const m = shuffle(W).slice(0, 5); steps.push({ k: "match", pairs: lv === "A1" ? m.map(x => ({ a: first(x.b), b: first(x.es) })) : m.map(x => ({ a: first(x.b), b: first(x.pa) })), mode: lv === "A1" ? "es" : "past" });
    if (typeForms(lv)) shuffle(W).slice(0, 2).forEach(x => steps.push({ k: "typepp", x, val: "" }));
    shuffle(W).slice(0, 3).forEach(x => steps.push({ k: "build", x, it: mkBuild(x) }));
    return { lv, ui, steps, i: 0, hearts: HEARTS, right: 0, asked: 0, xp: 0, state: "ask", t0: Date.now() };
  }
  let L = null; const cur = () => L && L.steps[L.i];
  function okTyped(val, forms) { const opts = String(forms).split(/\s*\/\s*/).map(nrm); return opts.includes(nrm(val)); }
  function isRight(st) {
    if (st.opts) return st.sel === st.ans;
    if (st.k === "typepast") return okTyped(st.val, st.x.pa);
    if (st.k === "typepp") return okTyped(st.val, st.x.pp);
    if (st.k === "build") return buildOK(st.it);
    return true;
  }
  function canCheck(st) { if (!st) return false; if (st.opts) return st.sel != null; if (st.k === "typepast" || st.k === "typepp") return String(st.val || "").trim().length > 0; if (st.k === "build") return st.it.picked.length === st.it.toks.length; return false; }
  function requeue(st) { if (st.retry) return; const c = Object.assign({}, st, { retry: true, sel: null, val: "" }); if (c.k === "build") c.it = Object.assign({}, st.it, { picked: [], order: shuffle(st.it.order) }); L.steps.push(c); }
  function check(skip) {
    const st = cur(); if (!st || L.state !== "ask" || (!skip && !canCheck(st))) return;
    const ok = !skip && isRight(st); L.state = ok ? "right" : "wrong"; L.asked++;
    if (ok) { if (!st.retry) { L.right++; L.xp++; } } else { L.hearts--; requeue(st); }
    beep(ok); if (ok && canSpeak()) speak(st.k === "build" ? full(st.it) : st.k === "typepp" ? first(st.x.pp) : (st.k === "typepast" || st.k === "past" || st.k === "espast") ? first(st.x.pa) : st.say || first(st.x.b));
    draw();
  }
  function next() {
    const st = cur(), v = St();
    if (st && st.k === "intro" && !v.seen.includes(st.x.id)) v.seen.push(st.x.id);
    if (L.hearts <= 0) { L.state = "fail"; draw(); return; }
    L.i++; L.state = "ask";
    if (L.i >= L.steps.length) finish(); else { const n = cur(); if (n && n.k === "listen") setTimeout(() => speak(n.say), 250); if (n && n.k === "intro") setTimeout(() => speak(first(n.x.b)), 250); }
    store(); draw();
  }
  function finish() {
    const v = St(); L.state = "done"; L.bonus = 5 + (L.hearts === HEARTS ? 5 : 0); L.xp += L.bonus;
    v.xp += L.xp; v.day.xp += L.xp;
    if (v.streak.last !== today()) { v.streak.n = v.streak.last === yday() ? v.streak.n + 1 : 1; v.streak.last = today(); }
    const u = (v.units[L.lv] = v.units[L.lv] || {}); const r = u[L.ui] = u[L.ui] || { c: 0 }; r.c = Math.min(3, (r.c || 0) + 1); r.best = Math.max(r.best || 0, Math.round(100 * L.right / Math.max(1, L.asked))); r.at = Date.now();
    L.steps.forEach(s => { if (s.x && !v.seen.includes(s.x.id)) v.seen.push(s.x.id); });
    store();
  }
  function start(lv, ui) { L = build(lv, ui); const n = cur(); if (n && n.k === "intro") setTimeout(() => speak(first(n.x.b)), 300); draw(); window.scrollTo(0, 0); }

  /* ---------- markup ---------- */
  const forms3 = x => `<div class="vforms">${[["Present", "Presente", x.b, x.fb, x.es], ["Past", "Pasado", x.pa, x.fpa, x.esp], ["Participle", "Participio", x.pp, x.fpp, x.espp]].map(([l, le, en, fig, es]) => `<div class="vform"><span class="vfl">${l} · ${le}</span><span class="vfe" lang="en">${escH(en)} <button class="vsay" type="button" data-vb="say" data-w="${escH(en.replace(/\//g, ", "))}" aria-label="Listen: ${escH(en)}">🔊</button></span><span class="vfig" title="Pronunciación figurada">${escH(fig)}</span><span class="vfs" lang="es">${escH(es)}</span></div>`).join("")}</div>`;
  const badge = x => `<span class="virr ${x.irr ? "i" : "r"}">${x.irr ? "Irregular" : "Regular"}</span>`;
  function statsBar(v) { const pct = Math.min(100, Math.round(100 * v.day.xp / GOAL)); return `<div class="gbar"><span class="gstat" title="Day streak · Racha">🔥 ${v.streak.n}</span><span class="gstat" title="Verb XP">⚡ ${v.xp} XP</span><span class="ggoal"><span class="sub">Today · Hoy ${v.day.xp}/${GOAL} XP</span><span class="gmeter"><i style="width:${pct}%"></i></span></span><button class="gsnd" type="button" data-vb="snd" aria-pressed="${v.snd !== false}" title="Sound effects">${v.snd !== false ? "🔔" : "🔕"}</button></div>`; }
  function pathHTML(v) {
    const U = units(v.lv); const fo = U.findIndex((_, i) => !done(v, v.lv, i)); const now = fo < 0 ? U.length : fo; const offs = [0, 46, 70, 46, 0, -46, -70, -46];
    return `<div class="gsec"><b>${v.lv} · ${GRAM[v.lv].split(" · ")[0]}</b> <span class="sub">· ${GRAM[v.lv].split(" · ")[1] || ""}</span></div><div class="gpath">${U.map((u, i) => { const c = done(v, v.lv, i), st = c ? "done" : i === now ? "now" : "lock"; return `<div class="gnode-wrap ${st}" style="--x:${offs[i % offs.length]}px">${st === "now" ? `<span class="gstart">START · EMPEZAR</span>` : ""}<button type="button" class="gnode ${st}" data-vb="unit" data-u="${i}" aria-label="Unit ${i + 1}: ${escH(u.map(x => x.b).join(", "))}${st === "lock" ? " (locked)" : ""}">${st === "done" ? "★" : st === "now" ? "▶" : "🔒"}</button><div class="glab"><b>Unit ${i + 1}</b>${c ? ` <span class="gcrowns">${"★".repeat(c)}${"☆".repeat(3 - c)}</span>` : ""}<span class="sub">${escH(u.slice(0, 4).map(x => first(x.b)).join(", "))}…</span></div></div>`; }).join("")}<div class="gend">${now >= U.length ? `🏆 You finished every ${v.lv} verb unit! · ¡Terminaste ${v.lv}!` : `${U.length - now} units left · Te faltan ${U.length - now} unidades`}</div></div>`;
  }
  function tableHTML(v) {
    const q = nrm(v.q || ""); const list = V[v.lv].filter(x => !q || nrm([x.b, x.pa, x.pp, x.es].join(" ")).includes(q));
    return `<div class="card"><div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:8px"><p class="sub" style="margin:0">${V[v.lv].length} verbs at ${v.lv}. <span class="virr r">Regular</span> <span class="virr i">Irregular</span> · Pronunciación figurada en cursiva.</p><input class="search" id="vb-q" type="search" placeholder="Search · Buscar" value="${escH(v.q || "")}" aria-label="Search verbs" style="max-width:240px"></div>
      <div class="vtable">${list.map(x => `<div class="vrow ${x.irr ? "i" : "r"}">${pic(x, "vthumb")}<div class="vrc"><div class="vrh"><span class="vnum">${x.n}</span><b lang="en">${escH(x.b)}</b> ${badge(x)}</div>${forms3(x)}<div class="vex" lang="en">${escH(x.s)} <button class="vsay" type="button" data-vb="say" data-w="${escH(x.s)}" aria-label="Listen to the example">🔊</button></div><div class="sub" lang="es">${escH(x.xs)}</div>${credit(x)}</div></div>`).join("") || `<p class="sub">No verbs match. · No hay resultados.</p>`}</div></div>`;
  }
  function practiceHTML(v) {
    const p = v.pr;
    if (!p || p.lv !== v.lv) return `<div class="card"><h2>Verb forms drill · Práctica de formas</h2><p>Write the past and the past participle of 10 ${v.lv} verbs. · Escribe el pasado y el participio de 10 verbos.</p><button class="gbtn go" type="button" data-vb="pr-new">Start · Empezar</button></div>`;
    const sc = p.done ? p.items.filter(it => okTyped(it.a, it.x.pa) && okTyped(it.b2, it.x.pp)).length : 0;
    return `<div class="card"><h2>Verb forms drill · ${v.lv}</h2><div class="vdrill">${p.items.map((it, i) => { const okA = p.done ? okTyped(it.a, it.x.pa) : null, okB = p.done ? okTyped(it.b2, it.x.pp) : null; return `<div class="vdr">${pic(it.x, "vthumb sm")}<div><b lang="en">${escH(it.x.b)}</b> <span class="sub" lang="es">${escH(it.x.es)}</span><div class="vdin"><input class="gap ${p.done ? (okA ? "ok" : "no") : ""}" data-vb-pr="${i}" data-f="a" value="${escH(it.a)}" placeholder="past" aria-label="Past of ${escH(it.x.b)}" autocomplete="off" autocapitalize="none" spellcheck="false" ${p.done ? "disabled" : ""}><input class="gap ${p.done ? (okB ? "ok" : "no") : ""}" data-vb-pr="${i}" data-f="b2" value="${escH(it.b2)}" placeholder="participle" aria-label="Participle of ${escH(it.x.b)}" autocomplete="off" autocapitalize="none" spellcheck="false" ${p.done ? "disabled" : ""}></div>${p.done && !(okA && okB) ? `<span class="fix">${escH(it.x.pa)} · ${escH(it.x.pp)}</span>` : ""}</div></div>`; }).join("")}</div>
      ${p.done ? `<div class="vfb ${sc >= 7 ? "ok" : "no"}"><b>Score · Puntuación: ${sc}/10</b><p>${sc >= 9 ? "Excellent! · ¡Excelente!" : sc >= 7 ? "Good work. Review the red ones. · Buen trabajo." : "Study the verb table and try again. · Repasa la tabla e inténtalo otra vez."}</p></div><button class="gbtn go" type="button" data-vb="pr-new">New set · Nueva serie</button>` : `<button class="gbtn go" type="button" data-vb="pr-check">Check · Revisar</button>`}</div>`;
  }
  function optBtns(st) { return `<div class="gopts">${st.opts.map((o, j) => `<button type="button" class="gopt${st.sel === o ? " sel" : ""}${L.state !== "ask" && o === st.ans ? " good" : ""}${L.state === "wrong" && st.sel === o ? " badc" : ""}" data-vb="opt" data-v="${escH(o)}" ${L.state !== "ask" ? "disabled" : ""}><span class="gk">${j + 1}</span>${escH(o)}</button>`).join("")}</div>`; }
  function stepHTML(st) {
    const x = st.x;
    if (st.k === "intro") return `<div class="gq"><span class="gtag">NEW VERB · VERBO NUEVO</span><div class="gcard vcard">${pic(x, "vpic big")}<div class="vrh"><span class="gword" lang="en">${escH(x.b)}</span> ${badge(x)}</div>${forms3(x)}<div class="gex" lang="en">${escH(x.s)}</div><div class="sub" lang="es">${escH(x.xs)}</div>${credit(x)}</div></div>`;
    if (st.k === "pic") return `<div class="gq"><h2>Which verb is this? <span class="sub">· ¿Qué verbo es?</span></h2>${pic(x, "vpic big")}${optBtns(st)}</div>`;
    if (st.k === "mean") return `<div class="gq"><h2>What does it mean? <span class="sub">· ¿Qué significa?</span></h2><div class="gprompt" lang="en"><button class="gspk" type="button" data-vb="say" data-w="${escH(first(x.b))}" aria-label="Listen">🔊</button> to ${escH(x.b)}</div>${optBtns(st)}</div>`;
    if (st.k === "past") return `<div class="gq"><h2>Choose the past simple <span class="sub">· Elige el pasado</span></h2><div class="gprompt" lang="en">${escH(x.b)} → ?</div>${optBtns(st)}</div>`;
    if (st.k === "espast") return `<div class="gq"><h2>How do you say this in English? <span class="sub">· ¿Cómo se dice en inglés?</span></h2><div class="gprompt" lang="es">yo ${escH(first(x.esp))}</div>${optBtns(st)}</div>`;
    if (st.k === "listen") return `<div class="gq"><h2>Tap what you hear <span class="sub">· Toca lo que escuchas</span></h2><div class="glisten"><button class="gbig" type="button" data-vb="say" data-w="${escH(st.say)}" aria-label="Play again">🔊</button><button class="gslow" type="button" data-vb="say-slow" data-w="${escH(st.say)}" aria-label="Play slowly">🐢</button></div>${optBtns(st)}</div>`;
    if (st.k === "typepast" || st.k === "typepp") { const pp = st.k === "typepp"; return `<div class="gq"><h2>Write the ${pp ? "past participle" : "past simple"} <span class="sub">· Escribe el ${pp ? "participio" : "pasado"}</span></h2>${pic(x, "vpic mid")}<div class="gprompt sm" lang="en"><b>${escH(x.b)}</b> <span class="sub" lang="es">(${escH(x.es)})</span> → <input class="gap" id="vb-type" data-vb-t="1" value="${escH(st.val)}" aria-label="Your answer" autocomplete="off" autocapitalize="none" spellcheck="false" style="width:10em" ${L.state !== "ask" ? "disabled" : ""}></div>${badge(x)}</div>`; }
    if (st.k === "match") { const A = st.ao || (st.ao = shuffle(st.pairs.map(p => p.a))), B = st.bo || (st.bo = shuffle(st.pairs.map(p => p.b))); st.done = st.done || []; const col = (arr, side) => arr.map(val => { const p = st.pairs.find(p => p[side] === val); const d = st.done.includes(p.a); return `<button type="button" class="gmt${d ? " ok" : ""}${st.pick && st.pick.side === side && st.pick.v === val ? " sel" : ""}${st.bad && st.bad.includes(val) ? " badc" : ""}" data-vb="mt" data-side="${side}" data-v="${escH(val)}" ${d ? "disabled" : ""}>${escH(val)}</button>`; }).join(""); return `<div class="gq"><h2>${st.mode === "es" ? "Match English and Spanish <span class=\"sub\">· Une inglés y español</span>" : "Match each verb with its past <span class=\"sub\">· Une cada verbo con su pasado</span>"}</h2><div class="gmatch"><div>${col(A, "a")}</div><div>${col(B, "b")}</div></div></div>`; }
    if (st.k === "build") { const it = st.it; return `<div class="gq"><h2>Write this in English <span class="sub">· Escríbelo en inglés</span></h2><div class="vxs"><span class="vxl">Spanish · Español</span><span lang="es">${escH(x.xs)}</span></div><p class="sub">Verb · Verbo: <b lang="en">${escH(x.b)}</b> (${escH(x.pa)}, ${escH(x.pp)})</p><div class="vans">${it.picked.map((k, j) => `<button type="button" class="vtile on" data-vb="un" data-j="${j}" ${L.state !== "ask" ? "disabled" : ""}>${escH(it.toks[k])}</button>`).join("")}${it.picked.length ? `<span class="vend">${escH(it.end)}</span>` : `<span class="sub">Tap the words · Toca las palabras</span>`}</div><div class="vbank">${it.order.map(k => it.picked.includes(k) ? "" : `<button type="button" class="vtile" data-vb="pick" data-k="${k}" ${L.state !== "ask" ? "disabled" : ""}>${escH(it.toks[k])}</button>`).join("")}</div></div>`; }
    return "";
  }
  function answer(st) { if (st.k === "build") return full(st.it); if (st.k === "typepast") return st.x.pa; if (st.k === "typepp") return st.x.pp; return st.ans || ""; }
  const PRAISE = ["Excellent! · ¡Excelente!", "Great job! · ¡Muy bien!", "Correct! · ¡Correcto!", "Amazing! · ¡Increíble!", "Well done! · ¡Bien hecho!"];
  function lessonHTML(v) {
    const st = cur(); const prog = Math.round(100 * Math.min(L.i, L.steps.length) / L.steps.length);
    const top = `<div class="gtop"><button class="gx" type="button" data-vb="quit" aria-label="Quit lesson">✕</button><div class="gprog" role="progressbar" aria-valuenow="${prog}" aria-valuemin="0" aria-valuemax="100"><i style="width:${prog}%"></i></div><span class="ghearts">❤️ ${L.hearts}</span></div>`;
    if (L.state === "fail") return `<div class="glesson">${top}<div class="gend-card"><div class="gbigemoji">💔</div><h2>Out of hearts · Sin vidas</h2><p>Look at the verb table for this unit, then try again. · Repasa la tabla y vuelve a intentarlo.</p><div class="gfoot-btns"><button class="gbtn" type="button" data-vb="quit">Back · Volver</button><button class="gbtn go" type="button" data-vb="retry">Try again · Reintentar</button></div></div></div>`;
    if (L.state === "done") { const acc = Math.round(100 * L.right / Math.max(1, L.asked)); const mins = Math.max(1, Math.round((Date.now() - L.t0) / 60000)); return `<div class="glesson"><div class="gend-card"><div class="gbigemoji">🎉</div><h2>Lesson complete! · ¡Lección completada!</h2><p>${acc >= 90 ? "Outstanding! You know these verbs. · ¡Sobresaliente!" : acc >= 70 ? "Great work! Practise the forms once more. · ¡Buen trabajo!" : "Good effort! Repeat this unit to fix the forms. · ¡Buen esfuerzo! Repite esta unidad."}</p><div class="gtiles"><div class="gtile xp"><span>Total XP</span><b>⚡ ${L.xp}</b>${L.bonus > 5 ? `<em>+5 no-mistake bonus</em>` : ""}</div><div class="gtile acc"><span>Accuracy · Precisión</span><b>🎯 ${acc}%</b></div><div class="gtile st"><span>Streak · Racha</span><b>🔥 ${v.streak.n}</b></div><div class="gtile tm"><span>Time · Tiempo</span><b>⏱ ${mins} min</b></div></div><div class="gfoot-btns"><button class="gbtn go" type="button" data-vb="quit">Continue · Continuar</button></div></div></div>`; }
    let foot;
    if (L.state === "ask") foot = `<div class="gfoot"><div class="gfoot-in">${st.k === "intro" ? `<span></span><button class="gbtn go" type="button" data-vb="next">Got it · Entendido</button>` : st.k === "match" ? `<span class="sub">Tap a word, then its pair · Toca una palabra y su pareja</span><span></span>` : `<button class="gbtn ghost" type="button" data-vb="skip">Skip · Saltar</button><button class="gbtn go" type="button" data-vb="check" ${canCheck(st) ? "" : "disabled"}>Check · Revisar</button>`}</div></div>`;
    else { const ok = L.state === "right"; foot = `<div class="gfoot ${ok ? "ok" : "no"}" role="status"><div class="gfoot-in"><div class="gfb"><b>${ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : "Correct answer · Respuesta correcta:"}</b>${ok ? (st.x ? `<span lang="en">${escH(st.x.b)} · ${escH(st.x.pa)} · ${escH(st.x.pp)} = <span lang="es">${escH(first(st.x.es))}</span></span>` : "") : `<span>${escH(answer(st))}</span>`}</div><button class="gbtn ${ok ? "go" : "red"}" type="button" data-vb="next">Continue · Continuar</button></div></div>`; }
    return `<div class="glesson">${top}${stepHTML(st)}${foot}</div>`;
  }
  function html() {
    const v = St(); if (!ALW().includes(v.lv)) v.lv = ALW()[0]; loadImgs(v.lv);
    if (L) return lessonHTML(v);
    return `<div class="head"><h1>Verbs</h1><span class="sub">Verbos · 1,000 verbs from A1 to C2 + 60 B1 Preliminary + 60 B2 First · ${ALLV.length} ready</span></div>${statsBar(v)}
      <div class="seg" role="group" aria-label="Level">${ALW().map(l => { const u = units(l), d = u.filter((_, i) => done(v, l, i)).length; return `<button class="chip" type="button" data-vb="lv" data-v="${l}" aria-pressed="${v.lv === l}" ${V[l].length ? "" : "disabled"}><span class="lvl ${l}">${l}</span> <span class="sub">${V[l].length ? `${d}/${u.length}` : "soon"}</span></button>`; }).join("")}</div>
      <p class="sub gintro">${escH(GRAM[v.lv])}</p>
      <div class="gtabs" role="tablist">${[["path", "🗺️", "Learn", "Aprender"], ["table", "📋", "Verb table", "Tabla"], ["practice", "🏋️", "Practice", "Practicar"]].map(([k, ic, l, es]) => `<button role="tab" type="button" class="gtab" data-vb="tab" data-v="${k}" aria-selected="${v.tab === k}"><span>${ic} ${l}</span><small>${es}</small></button>`).join("")}</div>
      ${v.tab === "path" ? pathHTML(v) : v.tab === "table" ? tableHTML(v) : practiceHTML(v)}`;
  }
  function draw() { const s = document.getElementById("v-verbs"); if (!s) return; s.innerHTML = html(); const t = document.getElementById("vb-type"); if (t && !t.disabled) { t.focus(); t.setSelectionRange(t.value.length, t.value.length); } }
  function toast(t) { let el = document.getElementById("g-toast"); if (!el) { el = document.createElement("div"); el.id = "g-toast"; el.setAttribute("role", "status"); document.body.appendChild(el); } el.textContent = t; el.className = "on"; clearTimeout(toast.t); toast.t = setTimeout(() => { el.className = ""; }, 2600); }

  /* ---------- events ---------- */
  document.addEventListener("click", ev => {
    const b = ev.target.closest && ev.target.closest("[data-vb]"); if (!b) return; const a = b.dataset.vb, v = St();
    if (a === "say") { speak(b.dataset.w); return; }
    if (a === "say-slow") { speak(b.dataset.w, .55); return; }
    if (a === "lv" && ALW().includes(b.dataset.v)) { v.lv = b.dataset.v; v.q = ""; }
    else if (a === "tab") { v.tab = b.dataset.v; }
    else if (a === "snd") { v.snd = v.snd === false; }
    else if (a === "unit") { const ui = +b.dataset.u, U = units(v.lv), fo = U.findIndex((_, i) => !done(v, v.lv, i)); if (ui > (fo < 0 ? U.length : fo)) { toast("Finish the unit before this one first. · Primero termina la unidad anterior."); return; } start(v.lv, ui); return; }
    else if (a === "opt") { const st = cur(); if (st && L.state === "ask") { st.sel = b.dataset.v; if (st.k === "listen") { } draw(); } return; }
    else if (a === "check") { check(false); return; }
    else if (a === "skip") { check(true); return; }
    else if (a === "next") { next(); return; }
    else if (a === "quit") { L = null; try { speechSynthesis.cancel(); } catch (e) { } }
    else if (a === "retry") { start(L.lv, L.ui); return; }
    else if (a === "pick") { const st = cur(); if (st && L.state === "ask") { st.it.picked.push(+b.dataset.k); draw(); } return; }
    else if (a === "un") { const st = cur(); if (st && L.state === "ask") { st.it.picked.splice(+b.dataset.j, 1); draw(); } return; }
    else if (a === "mt") { const st = cur(); if (!st || L.state !== "ask") return; const side = b.dataset.side, val = b.dataset.v; st.bad = null;
      if (!st.pick || st.pick.side === side) { st.pick = { side, v: val }; if (side === "a" || st.mode === "past") speak(val); draw(); return; }
      const A = side === "a" ? val : st.pick.v, B = side === "b" ? val : st.pick.v; const p = st.pairs.find(p => p.a === A);
      if (p && p.b === B) { st.done.push(A); st.pick = null; beep(true); if (st.done.length === st.pairs.length) { L.state = "right"; L.asked++; L.right++; L.xp++; } } else { st.bad = [A, B]; st.pick = null; beep(false); }
      draw(); return; }
    else if (a === "pr-new") { v.pr = { lv: v.lv, done: false, items: shuffle(V[v.lv]).slice(0, 10).map(x => ({ id: x.id, a: "", b2: "" })) }; }
    else if (a === "pr-check") { if (!v.pr) return; v.pr.done = true; const sc = prItems(v).filter(it => okTyped(it.a, it.x.pa) && okTyped(it.b2, it.x.pp)).length; const bb = v.best[v.lv] = v.best[v.lv] || {}; if (!bb.forms || sc >= bb.forms[0]) bb.forms = [sc, 10, Date.now()]; }
    else return;
    store(); draw();
  });
  const byId = {}; ALLV.forEach(x => byId[x.id] = x);
  function prItems(v) { return (v.pr ? v.pr.items : []).map(it => Object.assign(it, { x: byId[it.id] })).filter(it => it.x); }
  const _practiceHTML = practiceHTML;
  practiceHTML = function (v) { if (v.pr) prItems(v); return _practiceHTML(v); };
  document.addEventListener("input", ev => {
    const i = ev.target; if (!i.dataset) return;
    if (i.dataset.vbT) { const st = cur(); if (st) { st.val = i.value; const c = document.querySelector('[data-vb="check"]'); if (c) c.disabled = !canCheck(st); } return; }
    if (i.dataset.vbPr !== undefined) { const v = St(); const it = v.pr && v.pr.items[+i.dataset.vbPr]; if (it) { it[i.dataset.f] = i.value; store(); } return; }
    if (i.id === "vb-q") { const v = St(); v.q = i.value; const pos = i.selectionStart; draw(); const n = document.getElementById("vb-q"); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }
  });
  document.addEventListener("keydown", ev => {
    if (!L || !document.getElementById("v-verbs") || !document.getElementById("v-verbs").classList.contains("on")) return;
    const st = cur(); if (!st) return;
    if (ev.key === "Enter") { ev.preventDefault(); if (L.state === "ask") { if (st.k === "intro") next(); else check(false); } else if (L.state === "right" || L.state === "wrong") next(); return; }
    if (L.state === "ask" && st.opts && /^[1-4]$/.test(ev.key) && !(ev.target && ev.target.tagName === "INPUT")) { st.sel = st.opts[+ev.key - 1]; draw(); }
  });

  /* ---------- styles ---------- */
  const css = document.createElement("style");
  css.textContent = `.lvl.FCE{background:#7b2cbf;color:#fff}.lvl.PET{background:#0e7c86;color:#fff}.vpic{display:block;width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:14px;background:var(--sunken)}.vpic.big{max-width:420px;margin:0 auto 14px}.vpic.mid{max-width:280px;margin:0 0 12px}
.vpic-empty{display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--muted)}
.vcard{align-items:stretch}.vrh{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.vforms{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}
@media(max-width:520px){.vforms{gap:5px}.vform{padding:6px 6px}.vfe{font-size:1rem;gap:3px}.vfe .vsay{min-width:26px;min-height:26px;font-size:.8rem}.vfl{font-size:.6rem}.vfig,.vfs{font-size:.8rem}}
#tabs a{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.vform{border:2px solid var(--line);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:2px;background:var(--surface)}
.vfl{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}.vfe{font-family:var(--read);font-size:1.25rem;font-weight:800;display:flex;align-items:center;gap:6px}.vfig{font-style:italic;color:var(--muted);font-size:.9rem}.vfs{color:var(--accent);font-weight:700}
.vsay{border:0;background:var(--accent-soft);border-radius:8px;min-width:32px;min-height:32px;cursor:pointer;font-size:.95rem}
.virr{display:inline-block;font-size:.72rem;font-weight:900;border-radius:6px;padding:2px 7px;color:#fff;letter-spacing:.03em}.virr.r{background:#2E7D4F}.virr.i{background:#C0392B}
.vcred{font-size:.72rem;color:var(--muted)}.vcred a{color:inherit}
.vtable{display:flex;flex-direction:column;gap:10px;margin-top:10px}
.vrow{display:grid;grid-template-columns:150px 1fr;gap:12px;border:2px solid var(--line);border-left:6px solid #2E7D4F;border-radius:14px;padding:10px;background:var(--surface)}.vrow.i{border-left-color:#C0392B}
@media(max-width:600px){.vrow{grid-template-columns:1fr}}
.vthumb{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:10px;background:var(--sunken)}.vthumb.sm{width:84px}
.vnum{font-weight:900;font-size:.85rem;color:#fff;border-radius:6px;padding:1px 6px;background:#2E7D4F}.vrow.i .vnum{background:#C0392B}
.vex{font-family:var(--read);font-style:italic;margin-top:4px}
.vdrill{display:flex;flex-direction:column;gap:10px;margin:10px 0}.vdr{display:grid;grid-template-columns:84px 1fr;gap:10px;align-items:start;border-bottom:1px solid var(--line);padding-bottom:10px}.vdin{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.vdin .gap{width:9em}`;
  document.head.appendChild(css);

  /* ---------- register the view ---------- */
  if (!VIEWS.some(x => x[0] === "verbs")) {
    const i = VIEWS.findIndex(x => x[0] === "dict");
    VIEWS.splice(i < 0 ? VIEWS.length : i, 0, ["verbs", "Verbs", '<path d="M4 17l4-10 4 10M5.5 13.5h5M14 7h6M14 12h6M14 17h4"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-verbs")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-verbs"; sec.setAttribute("aria-label", "Verbs"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "verbs") draw(); }; try { render(); } catch (e) { } }
  }
  window.VERBS = { html, draw, L: () => L, data: V, units, done };
})();

/* Teacher Dario · charms (rewards), activity tracking for the live class view, and the sound fixer.
   Works offline in the dashboard; when signed in (GitHub site / app), login-block sends TRACK.snap() to Firestore. */
(function () {
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const hasS = () => typeof S !== "undefined" && S;
  const doSave = () => { try { save(); } catch (e) { } };
  const UA = navigator.userAgent || "";
  const iOS = /iP(hone|ad|od)/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const ANDROID = /Android/i.test(UA);
  const FIREFOX = /Firefox|FxiOS/i.test(UA);

  /* ---------- shared UI: toast + modal ---------- */
  const css = `
#td-toast{position:fixed;left:50%;transform:translateX(-50%) translateY(20px);bottom:calc(90px + env(safe-area-inset-bottom));z-index:2147482000;background:#1d2433;color:#fff;border-radius:14px;padding:12px 16px;font-weight:600;width:min(92vw,460px);box-shadow:0 10px 30px #0005;opacity:0;pointer-events:none;transition:.25s;display:flex;gap:10px;align-items:center}
#td-toast.on{opacity:1;transform:translateX(-50%);pointer-events:auto}#td-toast>span:nth-child(2){flex:1}#td-toast button{flex:none}#td-toast .tbig{font-size:1.8rem;line-height:1}#td-toast button{margin-left:6px;border:0;border-radius:8px;padding:6px 10px;font-weight:700;background:#fff;color:#1d2433;cursor:pointer}
#td-modal{position:fixed;inset:0;z-index:2147481000;background:#0009;display:flex;align-items:flex-end;justify-content:center}#td-modal[hidden]{display:none}
#td-modal .m-in{position:relative;background:var(--bg,#fff);color:var(--ink,#1d2433);width:min(680px,100%);max-height:92vh;overflow:auto;border-radius:18px 18px 0 0;padding:18px 16px 26px}
@media(min-width:700px){#td-modal{align-items:center}#td-modal .m-in{border-radius:18px}}
#td-modal .m-x{position:absolute;right:12px;top:12px}#td-modal .m-body>h2:first-child{padding-right:52px}
#acct .td-inbar{background:linear-gradient(135deg,#7b4dff,#c04dff);color:#fff;border:0;font-weight:800;white-space:nowrap}
@media(max-width:520px){#acct:has(.td-inbar) #acct-name{display:none}body.has-fab #acct-inbox{display:none}}
.td-float[hidden],#td-charm[hidden]{display:none!important}
.td-float{position:fixed;z-index:30;border:0;border-radius:999px;box-shadow:0 6px 18px #0003;cursor:pointer;font-weight:800;display:flex;align-items:center;gap:6px}
#td-charm{left:14px;bottom:20px;background:linear-gradient(135deg,#7b4dff,#c04dff);color:#fff;padding:9px 14px;font-size:.95rem}
#td-fab{right:16px;bottom:20px;background:#1f4e9c;color:#fff;width:58px;height:58px;justify-content:center;font-size:1.6rem}
#td-fab .nb,#td-charm .nb{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:999px;background:#d64545;color:#fff;font-size:.75rem;line-height:20px;text-align:center;padding:0 5px}
#td-fab .nb:empty{display:none}#td-fab.pulse{animation:tdp 1.2s ease-in-out 4}
@keyframes tdp{50%{transform:scale(1.15);box-shadow:0 0 0 10px #1f4e9c33}}
@media(max-width:820px){#td-charm{bottom:calc(74px + env(safe-area-inset-bottom));left:10px;padding:7px 12px;font-size:.88rem}#td-fab{bottom:calc(74px + env(safe-area-inset-bottom));right:10px;width:52px;height:52px;font-size:1.4rem}}
.ch-top{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:6px 0 12px}.ch-big{font-size:2.6rem;line-height:1}.ch-n{font-size:1.6rem;font-weight:800}
.ch-bar{height:12px;border-radius:999px;background:var(--sunken,#eef1f6);overflow:hidden}.ch-bar i{display:block;height:100%;background:linear-gradient(90deg,#7b4dff,#c04dff);border-radius:999px}
.ch-g{display:grid;grid-template-columns:2.2rem 1fr auto;gap:4px 10px;align-items:center;padding:9px 0;border-top:1px solid var(--line,#e3e7ee)}.ch-g .ic{font-size:1.5rem;text-align:center}.ch-g b{font-size:.95rem}.ch-g .ch-bar{grid-column:2/4;height:8px}
.ch-rank{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.ch-rank span{border:1px solid var(--line,#e3e7ee);border-radius:999px;padding:3px 10px;font-size:.8rem;color:var(--muted,#667)}.ch-rank span.on{background:#f1e9ff;border-color:#c9b2ff;color:#4b2a9c;font-weight:700}
.ch-shelf{display:flex;flex-wrap:wrap;gap:4px;font-size:1.3rem;margin:6px 0}.ch-shelf .off{filter:grayscale(1);opacity:.25}
.snd-rows{display:flex;flex-direction:column;gap:6px;margin:10px 0}.snd-rows div{display:flex;gap:8px;align-items:center}.snd-tips{margin:8px 0 0 18px;display:flex;flex-direction:column;gap:6px}
.snd-btns{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  let toastEl = null, toastT = 0;
  function toast(html, ms, onTap) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.id = "td-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html; toastEl.classList.add("on"); clearTimeout(toastT);
    toastEl.onclick = onTap ? () => { toastEl.classList.remove("on"); onTap(); } : () => toastEl.classList.remove("on");
    toastT = setTimeout(() => toastEl.classList.remove("on"), ms || 4500);
  }
  let modal = null;
  function openModal(html) {
    if (!modal) {
      modal = document.createElement("div"); modal.id = "td-modal"; modal.hidden = true;
      modal.innerHTML = `<div class="m-in" role="dialog" aria-modal="true"><button class="btn m-x" type="button" data-tdm="x" aria-label="Close">✕</button><div class="m-body"></div></div>`;
      document.body.appendChild(modal);
      modal.addEventListener("click", e => { if (e.target === modal || e.target.closest('[data-tdm="x"]')) modal.hidden = true; });
    }
    modal.querySelector(".m-body").innerHTML = html; modal.hidden = false;
  }
  const modalBody = () => modal && !modal.hidden ? modal.querySelector(".m-body") : null;

  /* ====================== 1. SOUND ====================== */
  const SY = window.speechSynthesis;
  const SND = { api: !!(SY && window.SpeechSynthesisUtterance), ok: null, voices: 0, en: 0, fails: 0, user: null, at: 0 };
  try { const u = JSON.parse(localStorage.getItem("td-snd") || "null"); if (u) { SND.user = u.user; SND.at = u.at; } } catch (e) { }
  let VO = [];
  const nl = v => (v.lang || "").replace("_", "-").toLowerCase();
  function loadV() { try { VO = SY.getVoices() || []; SND.voices = VO.length; SND.en = VO.filter(v => nl(v).startsWith("en")).length; } catch (e) { } }
  function bestVoice(lang) {
    const L = String(lang || "en-GB").replace("_", "-").toLowerCase(), base = L.split("-")[0];
    return VO.find(v => nl(v) === L && v.localService) || VO.find(v => nl(v) === L) ||
      (base === "en" ? (VO.find(v => nl(v) === "en-us" && v.localService) || VO.find(v => nl(v) === "en-us") || VO.find(v => nl(v).startsWith("en"))) : VO.find(v => nl(v).startsWith(base))) || null;
  }
  let helped = false;
  function noSound() {
    if (helped) return; helped = true;
    toast(`<span class="tbig">🔇</span><span>No sound? · ¿No se escucha?</span><button type="button">Fix it · Arreglar</button>`, 9000, () => SOUND.open());
  }
  async function wordAudio(t) {
    const w = String(t || "").trim().toLowerCase();
    if (!/^[a-z' -]{1,30}$/.test(w) || w.split(/\s+/).length > 2) return false;
    try {
      const r = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(w)); if (!r.ok) return false;
      const j = await r.json(); const ph = (j[0] && j[0].phonetics || []).map(p => p.audio).filter(Boolean);
      const src = ph.find(a => /-us\./.test(a)) || ph[0]; if (!src) return false;
      const a = new Audio(src); await a.play(); return true;
    } catch (e) { return false; }
  }
  if (SND.api) {
    loadV(); try { SY.addEventListener("voiceschanged", loadV); } catch (e) { SY.onvoiceschanged = loadV; }
    const oSpeak = SY.speak.bind(SY), oCancel = SY.cancel.bind(SY); let cAt = 0;
    SY.cancel = function () { cAt = Date.now(); try { oCancel(); } catch (e) { } };
    SY.speak = function (u) {
      try {
        if (!VO.length) loadV();
        // The lessons ask for British English. A phone without a British voice can stay silent, so use the best voice it has.
        if (!u.voice) { const v = bestVoice(u.lang || "en-GB"); if (v) { u.voice = v; u.lang = v.lang; } }
        if (SY.paused) SY.resume();
      } catch (e) { }
      let started = false;
      const mark = () => { if (started) return; started = true; if (SND.ok !== true) { SND.ok = true; TRACK.bump(); } };
      try { u.addEventListener("start", mark); u.addEventListener("boundary", mark); u.addEventListener("end", mark); } catch (e) { }
      const go = () => { try { oSpeak(u); } catch (e) { } };
      // Chrome can drop a sentence that is spoken straight after cancel(); wait a moment (not on iPhone, which needs the tap).
      if (!iOS && Date.now() - cAt < 150) setTimeout(go, 70); else go();
      const txt = u.text, lang = u.lang || "";
      setTimeout(() => {
        if (started || SY.speaking || SY.pending) return;
        SND.fails++; if (SND.ok !== true) SND.ok = false; TRACK.bump();
        if (SND.voices === 0 && /^en/i.test(lang)) wordAudio(txt).then(ok => { if (!ok) noSound(); }); else if (SND.ok === false) noSound();
      }, 2200);
    };
    // iPhone: unlock speech with the first tap.
    if (iOS) { const un = () => { try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; oSpeak(u); } catch (e) { } window.removeEventListener("touchend", un, true); }; window.addEventListener("touchend", un, true); }
  }
  const dev = () => { const os = iOS ? (/iPad/.test(UA) ? "iPad" : "iPhone") : ANDROID ? "Android" : /Windows/.test(UA) ? "Windows" : /Mac/.test(UA) ? "Mac" : /CrOS/.test(UA) ? "Chromebook" : "Computer"; const br = /SamsungBrowser/.test(UA) ? "Samsung Internet" : /EdgA?\//.test(UA) ? "Edge" : FIREFOX ? "Firefox" : /CriOS|Chrome/.test(UA) ? "Chrome" : /Safari/.test(UA) ? "Safari" : "Browser"; const app = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone || /source=app/.test(location.search) || document.referrer.startsWith("android-app://") ? "App" : "Browser"; return { os, br, app }; };
  const SOUND = {
    status: () => ({ api: SND.api, ok: SND.ok, voices: SND.voices, en: SND.en, user: SND.user, at: SND.at, fails: SND.fails }),
    test(lang) { if (!SND.api) return; try { SY.cancel(); const u = new SpeechSynthesisUtterance(lang === "es" ? "Hola, ¿me escuchas bien?" : "Hello! Can you hear me? This is your English lesson."); u.lang = lang === "es" ? "es-MX" : lang; u.rate = .95; SY.speak(u); } catch (e) { } },
    html() {
      loadV(); const d = dev(); const yes = '<b style="color:#1f8a4c">✓</b>', no = '<b style="color:#c0392b">✗</b>';
      const enV = VO.filter(v => nl(v).startsWith("en")).slice(0, 4).map(v => esc(v.name)).join(", ");
      let tips = [];
      if (FIREFOX) tips.push("Firefox has no voices on many phones. Open the app in <b>Chrome</b> (Android) or <b>Safari</b> (iPhone). · Firefox no tiene voces: abre la app en Chrome o Safari.");
      if (iOS) tips.push("Turn the volume up with the side buttons. · Sube el volumen con los botones laterales.", "Turn off <b>Silent mode</b>: flip the switch on the side so no orange shows (or Control Center › bell). · Quita el modo silencio.", "Settings › Accessibility › Spoken Content › Voices › <b>English</b> › download a voice. · Configuración › Accesibilidad › Contenido leído › Voces › Inglés › descarga una voz.", "Close the app completely and open it again. · Cierra la app y ábrela de nuevo.");
      else if (ANDROID) tips.push("Press the volume button and raise the <b>media</b> volume (not only the ringtone). · Sube el volumen de <b>multimedia</b>.", "Settings › search <b>Text-to-speech</b> › Preferred engine: <b>Speech Services by Google</b>. · Configuración › busca «Texto a voz» › motor: Servicios de voz de Google.", "Tap ⚙ next to it › <b>Install voice data</b> › English (United States) and English (United Kingdom). · Instala los datos de voz en inglés.", "Play Store: update <b>Chrome</b> and <b>Speech Services by Google</b>. · Actualiza Chrome y Servicios de voz de Google.", "Bluetooth headphones connected? Turn them off or use them. · ¿Audífonos Bluetooth conectados?");
      else tips.push("Check the computer volume and that the right speakers or headphones are selected. · Revisa el volumen y la salida de audio.", "Use <b>Chrome</b> or <b>Edge</b>. · Usa Chrome o Edge.");
      return `<h2>🔊 Sound check · Prueba de sonido</h2><p class="sub">All the audio in the lessons is read by your phone's own voice. · Todo el audio lo lee la voz de tu teléfono.</p>
      <div class="snd-rows"><div>${SND.api ? yes : no} Speech in this browser · Voz en este navegador</div><div>${SND.en ? yes : no} English voices · Voces en inglés: <b>${SND.en}</b>${enV ? ` <span class="sub">(${enV})</span>` : ""}</div><div>📱 ${esc(d.os)} · ${esc(d.br)} · ${esc(d.app)}</div></div>
      <div class="snd-btns"><button class="btn primary" type="button" data-snd="t" data-l="en-US">▶ English (US)</button><button class="btn" type="button" data-snd="t" data-l="en-GB">▶ English (UK)</button><button class="btn" type="button" data-snd="t" data-l="es">▶ Español</button></div>
      <p><b>Did you hear it? · ¿Lo escuchaste?</b></p><div class="snd-btns"><button class="btn" type="button" data-snd="y">👍 Yes · Sí</button><button class="btn" type="button" data-snd="n">👎 No</button></div>
      <div id="snd-tips" ${SND.user === false || !SND.api || !SND.en ? "" : "hidden"}><h3>Try this · Prueba esto</h3><ol class="snd-tips">${tips.map(t => `<li>${t}</li>`).join("")}</ol><p class="sub" style="margin-top:8px">Your teacher can see this sound check. · Tu maestro puede ver esta prueba.</p></div>`;
    },
    open() { openModal(SOUND.html()); }
  };
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-snd]"); if (!b) return; const a = b.dataset.snd;
    if (a === "t") SOUND.test(b.dataset.l);
    if (a === "open") SOUND.open();
    if (a === "y" || a === "n") { SND.user = a === "y"; SND.at = Date.now(); try { localStorage.setItem("td-snd", JSON.stringify({ user: SND.user, at: SND.at })); } catch (x) { } TRACK.bump(); const t = document.getElementById("snd-tips"); if (t) t.hidden = SND.user; b.textContent = a === "y" ? "👍 Great! · ¡Genial!" : "👎 See the tips below · Mira los consejos"; }
  });
  window.SOUND = SOUND;

  /* ====================== 2. CHARMS ====================== */
  const RANKS = [[0, "🌱", "Seed · Semilla"], [10, "🧭", "Explorer · Explorador"], [25, "🗺️", "Adventurer · Aventurero"], [50, "🏆", "Champion · Campeón"], [75, "👑", "Master · Maestro"], [100, "🌟", "Legend · Leyenda"]];
  const rankOf = pc => RANKS.filter(r => pc >= r[0]).pop();
  function calc(st, codes, tasks) {
    st = st || {}; codes = codes || [];
    const all = !codes.length, out = [];
    const cefr = all ? LV : codes.filter(c => LV.includes(c));
    const has = k => all || codes.some(c => c === k || c.startsWith(k + ":"));
    const subLv = k => { const s = codes.filter(c => c.startsWith(k + ":")).map(c => c.split(":")[1]); return all || !s.length || codes.includes(k) ? [...LV, "PET", "FCE"] : s; };
    const ALLL = window.ALL_LESSONS || (typeof LESSONS !== "undefined" ? LESSONS : []);
    const g = (k, ic, name, items) => { const tot = items.length, got = items.filter(Boolean).length; if (tot) out.push({ k, ic, name, got, tot }); };
    const lessons = ALLL.filter(l => cefr.includes(l.level));
    const p = st.p || {};
    g("les", "📖", "Lessons · Lecciones", lessons.map(l => { const x = p[l.id] || {}; return !!(x.read && x.listen && x.practice && x.write); }));
    if (window.BOOK && BOOK.units && (all || codes.some(c => c !== "A0"))) { const chk = (st.book || {}).chk || {}; g("book", "📘", "Student Book units · Libro", lessons.filter(l => BOOK.units[l.id]).map(l => !!chk[l.id])); }
    if (window.CORE && CORE.lv) { const C = st.core || {}; const it = []; cefr.forEach(l => { const P = (CORE.lv[l] || {}).p; if (P) P.forEach((pt, i) => it.push((pt[5] || []).every((q, j) => (((C[l] || {})[i] || {})["q" + j]) === q[2]))); }); g("core", "🎯", "Core Curriculum points · Puntos", it); }
    if ((all || codes.includes("A0")) && window.STARTER && STARTER.units) { const x = (st.st || {}).stars || {}; g("st", "🌱", "Level 0 units · Unidades nivel 0", STARTER.units.map(u => ["l", "r", "k", "b"].every(k => (x[u.id] || {})[k]))); }
    if (window.SPEAK && SPEAK.uprog && lessons.length) { const keep = S0(); try { setS(st); g("spk", "🎤", "Speaking course units · Unidades orales", lessons.map(l => { const [d, n] = SPEAK.uprog(l.level, l); return n > 0 && d >= n; })); } finally { setS(keep); } }
    if (has("VOC") && window.VOCAB && VOCAB.units) { const v = st.voc || {}; const it = []; subLv("VOC").forEach(l => { try { VOCAB.units(l).forEach((_, i) => it.push(!!(((v.units || {})[l] || {})[i] || {}).c)); } catch (e) { } }); g("voc", "🧠", "Vocabulary units · Vocabulario", it); }
    if (has("VERB") && window.VERBS && VERBS.units) { const v = st.verb || {}; const it = []; subLv("VERB").forEach(l => { try { VERBS.units(l).forEach((_, i) => it.push(!!(((v.units || {})[l] || {})[i] || {}).c)); } catch (e) { } }); g("verb", "⚡", "Verb units · Verbos", it); }
    if (has("VOC") && window.THEMES && THEMES.list) { const b = ((st.th || {}).best) || {}; const ns = [...new Set(subLv("VOC").map(l => l === "PET" ? 3 : l === "FCE" ? 4 : LV.indexOf(l) + 1).filter(n => n > 0))]; const it = []; THEMES.list.forEach(t => ns.forEach(n => it.push((b[t.id + ":" + n] || 0) >= 70))); g("th", "🏙️", "Places workbooks (70%+) · Cuadernos de lugares", it); }
    if (has("VOC") && window.PICDICT && PICDICT.data) { const b = ((st.pic || {}).best) || {}; const it = []; [...new Set(subLv("VOC").map(l => l === "PET" ? "B1" : l === "FCE" ? "B2" : l))].forEach(l => (PICDICT.data[l] || []).forEach(t => it.push((b[l + "-" + t.ti] || 0) >= 9))); g("pic", "🖼️", "Picture quizzes (9/12+) · Quizzes con imágenes", it); }
    if ((all || codes.includes("PET")) && window.PET && PET.tests && PET.tests.length) { const R = ((st.pet || {}).res) || {}; const n = Object.keys(R).filter(k => R[k] && R[k].m).length, tot = PET.tests.length * 10; g("pet", "🏅", "B1 Preliminary parts · Partes PET", Array.from({ length: tot }, (_, i) => i < n)); }
    if ((all || codes.includes("FCE")) && window.FCE && FCE.tests && FCE.tests.length) { const R = ((st.fce || {}).res) || {}; const n = Object.keys(R).filter(k => R[k] && R[k].m).length, tot = FCE.tests.length * 11; g("fce", "🎓", "B2 First parts · Partes FCE", Array.from({ length: tot }, (_, i) => i < n)); }
    if (tasks && tasks.length) { const D = st.taskDone || {}; g("task", "📋", "Teacher's tasks · Tareas", tasks.map(t => !!D[t.id])); }
    const got = out.reduce((a, x) => a + Math.min(x.got, x.tot), 0), tot = out.reduce((a, x) => a + x.tot, 0);
    const pc = tot ? Math.floor(100 * got / tot) : 0;
    return { got, tot, pc, groups: out, rank: rankOf(pc) };
  }
  // SPEAK reads the global S, so swap it in briefly when a teacher checks a student's work.
  function S0() { return hasS() ? S : null; }
  function setS(x) { try { if (x) S = x; } catch (e) { } }
  const myCodes = () => window.TD_CODES || [];
  const myTasks = () => window.TD_TASKS || [];
  function shelf(r, who) {
    const pcs = RANKS.map(x => `<span class="${r.rank === x ? "on" : ""}">${x[1]} ${x[2].split(" · ")[0]}</span>`).join("");
    return `<h2>🔮 ${who ? esc(who) + " · " : ""}Charms · Amuletos</h2>
    <div class="ch-top"><span class="ch-big">${r.rank[1]}</span><div><div class="ch-n">${r.got} / ${r.tot}</div><div class="sub">${r.rank[2]} · ${r.pc}% ${r.got >= r.tot && r.tot ? "· Everything completed! · ¡Todo completo!" : "of everything · de todo"}</div></div></div>
    <div class="ch-bar" aria-hidden="true"><i style="width:${r.pc}%"></i></div><div class="ch-rank">${pcs}</div>
    <p class="sub">${who ? "One charm for every unit, lesson, quiz or test part finished." : "You earn one charm for every lesson, unit, quiz or test part you finish. Collect them all to complete your course! · Ganas un amuleto por cada lección, unidad, quiz o parte de examen que terminas. ¡Junta todos para completar tu curso!"}</p>
    ${r.groups.map(x => `<div class="ch-g"><span class="ic">${x.ic}</span><b>${esc(x.name)}</b><span><b>${x.got}</b>/${x.tot}</span><div class="ch-bar"><i style="width:${Math.round(100 * x.got / x.tot)}%"></i></div></div>`).join("")}`;
  }
  let pill = null;
  function drawPill(r) {
    const show = hasS() && !window.TD_TEACHER && (window.TD_SIGNED !== false);
    if (!pill) { pill = document.createElement("button"); pill.id = "td-charm"; pill.type = "button"; pill.className = "td-float"; pill.title = "Charms · Amuletos"; pill.addEventListener("click", () => openModal(shelf(calc(S, myCodes(), myTasks())))); document.body.appendChild(pill); }
    const acct = document.getElementById("acct");
    if (acct && pill.parentNode !== acct) { pill.className = "btn td-inbar"; acct.insertBefore(pill, acct.firstChild.nextSibling); }
    pill.hidden = !show; if (r) pill.innerHTML = `🔮 ${r.got}<span style="opacity:.75;font-weight:600">/${r.tot}</span>`;
  }
  let lastR = null;
  function checkCharms() {
    if (!hasS() || window.TD_TEACHER) { drawPill(null); return; }
    let r; try { r = calc(S, myCodes(), myTasks()); } catch (e) { return; }
    lastR = r; drawPill(r);
    const key = (window.TD_ME || "me") + "|" + myCodes().join(",");
    if (S.chK !== key || typeof S.chN !== "number") { S.chK = key; S.chN = r.got; S.chG = Object.fromEntries(r.groups.map(x => [x.k, x.got])); doSave(); return; }
    if (r.got > S.chN) {
      const G = S.chG || {}; const won = r.groups.find(x => x.got > (G[x.k] || 0)) || r.groups[0];
      const n = r.got - S.chN; S.chN = r.got; S.chG = Object.fromEntries(r.groups.map(x => [x.k, x.got])); doSave();
      const before = rankOf(r.tot ? Math.floor(100 * (r.got - n) / r.tot) : 0);
      toast(`<span class="tbig">${won ? won.ic : "🔮"}</span><span>✨ New charm${n > 1 ? "s" : ""}! · ¡Nuevo amuleto! <br><small>${won ? esc(won.name.split(" · ")[0]) : ""} · ${r.got}/${r.tot}${before !== r.rank ? " · " + r.rank[1] + " " + esc(r.rank[2]) : ""}</small></span>`, 5000, () => openModal(shelf(r)));
      try { if (navigator.vibrate) navigator.vibrate([60, 40, 60]); } catch (e) { }
      TRACK.bump();
    } else if (r.got < S.chN) { S.chN = r.got; S.chG = Object.fromEntries(r.groups.map(x => [x.k, x.got])); }
  }
  window.CHARMS = { calc, shelf, open: () => openModal(shelf(calc(S, myCodes(), myTasks()))), openFor: (st, codes, tasks, who) => openModal(shelf(calc(st, codes, tasks), who)), last: () => lastR, check: checkCharms };

  /* ====================== 3. ACTIVITY TRACKING ====================== */
  const vname = id => { try { const v = (typeof VIEWS !== "undefined" ? VIEWS : []).find(x => x[0] === id); if (v) return v[1]; } catch (e) { } return ({ live: "Live game", book: "Student Book", starter: "Level 0", speak: "Speaking", vocab: "Vocabulary", verbs: "Verbs", dict: "Dictionary", pet: "B1 Preliminary", fce: "B2 First", library: "Library", reader: "Reader", writing: "Writing", progress: "Progress", tools: "Tools" })[id] || (id ? id[0].toUpperCase() + id.slice(1) : "Home"); };
  const vis = el => !!(el && el.offsetParent !== null && getComputedStyle(el).visibility !== "hidden");
  const clip = t => String(t || "").replace(/\s+/g, " ").trim().slice(0, 70);
  function detail(id) {
    try {
      const dl = [...document.querySelectorAll('[role="dialog"],[aria-modal="true"]')].filter(x => !x.closest("#td-modal,#pop,#td-toast")).find(vis);
      if (dl) { const h = dl.querySelector("h1,h2,h3"); if (h && clip(h.textContent)) return clip(h.textContent); }
      const AL = window.ALL_LESSONS || [];
      const lt = k => { const l = AL.find(x => x.id === k); return l ? l.level + " · " + l.title : ""; };
      const TB = { path: "Lessons path", pics: "Pictures", places: "Places", words: "Words", practice: "Practice", table: "Verb table", read: "Reading", listen: "Listening", write: "Writing", learn: "Learn" };
      const tb = x => x ? " · " + (TB[x] || x) : "";
      if (id === "reader" && hasS()) return lt(S.cur) + tb(S.tab);
      if (id === "writing" && hasS()) return lt(S.wcur);
      if (id === "vocab" && hasS() && S.voc) return (S.voc.lv || "") + tb(S.voc.tab) + (window.VOCAB && VOCAB.L && VOCAB.L() ? " · in a lesson" : "");
      if (id === "verbs" && hasS() && S.verb) return (S.verb.lv || "") + tb(S.verb.tab) + (window.VERBS && VERBS.L && VERBS.L() ? " · in a lesson" : "");
      if (id === "book" && hasS() && S.book) return [S.book.c, S.book.u ? lt(S.book.u) || S.book.u : ""].filter(Boolean).join(" · ");
      if ((id === "pet" || id === "fce") && hasS() && S[id] && S[id].view === "test") return "Test " + S[id].test + " · " + (S[id].paper || "") + " part " + (S[id].part || "");
      const v = document.getElementById("v-" + id);
      if (v) { const h = [...v.querySelectorAll("h2,h3")].find(vis); if (h) return clip(h.textContent); }
    } catch (e) { }
    return "";
  }
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const SK = () => "td-track-" + (window.TD_ME || "me");
  let D = null;
  function loadD() { const k = SK(); let x = null; try { x = JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { } if (!x || x.d !== today()) x = { d: today(), sec: 0, by: {}, log: [] }; D = x; D._k = k; }
  function storeD() { try { const c = Object.assign({}, D); delete c._k; localStorage.setItem(D._k, JSON.stringify(c)); } catch (e) { } }
  let cur = null, since = Date.now(), lastIn = Date.now(), lastTick = Date.now(), hiddenAt = 0, listeners = [];
  const IDLE = 5 * 60000;
  ["pointerdown", "keydown", "scroll", "touchstart", "input"].forEach(ev => window.addEventListener(ev, () => { lastIn = Date.now(); }, { passive: true, capture: true }));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") { tick(); hiddenAt = Date.now(); closeCur(); emit(true); }
    else { if (!hiddenAt || Date.now() - hiddenAt > 120000) since = Date.now(); hiddenAt = 0; lastIn = Date.now(); lastTick = Date.now(); tick(); emit(true); }
  });
  window.addEventListener("pagehide", () => { tick(); closeCur(); emit(true); });
  function closeCur() { if (!cur) return; const e = D.log[D.log.length - 1]; if (e && e.k === cur.k && !e.t1) e.t1 = Date.now(); cur = null; storeD(); }
  function tick() {
    if (!D || D._k !== SK() || D.d !== today()) { loadD(); cur = null; }
    const now = Date.now(), visible = document.visibilityState === "visible", idle = now - lastIn > IDLE;
    const dt = Math.min(30000, now - lastTick); lastTick = now;
    if (!visible) return;
    const id = location.hash.slice(1) || "library";
    const lab = vname(id) + (detail(id) ? " · " + detail(id) : "");
    const k = idle ? "idle" : id + "|" + lab;
    if (cur && !idle) { const s = Math.round(dt / 1000); D.sec += s; D.by[cur.v] = (D.by[cur.v] || 0) + s; }
    if (!cur || cur.k !== k) {
      const prev = D.log[D.log.length - 1]; if (prev && !prev.t1) prev.t1 = now;
      cur = { k, v: idle ? "idle" : id, l: idle ? "Idle · Inactivo" : lab, at: now };
      if (!idle) { D.log.push({ k, v: id, l: lab, t0: now }); if (D.log.length > 60) D.log = D.log.slice(-60); }
      storeD(); emit(false);
    } else if (Math.random() < .2) storeD();
  }
  function emit(now) { listeners.forEach(f => { try { f(now); } catch (e) { } }); }
  const TRACK = {
    bump() { emit(false); },
    on(f) { listeners.push(f); },
    reset() { D = null; cur = null; since = Date.now(); tick(); },
    snap() {
      if (!D) loadD();
      const r = lastR || (hasS() && !window.TD_TEACHER ? (() => { try { return calc(S, myCodes(), myTasks()); } catch (e) { return null; } })() : null);
      const d = dev();
      return {
        on: document.visibilityState === "visible", since, idle: Date.now() - lastIn > IDLE,
        act: cur ? { v: cur.v, l: cur.l, at: cur.at } : null,
        d: D.d, sec: D.sec, by: D.by, log: D.log.slice(-40).map(e => ({ v: e.v, l: e.l, t0: e.t0, t1: e.t1 || 0 })),
        ch: r ? { got: r.got, tot: r.tot, pc: r.pc, rk: r.rank[1] + " " + r.rank[2].split(" · ")[0], g: r.groups.map(x => [x.ic, x.name.split(" · ")[0], x.got, x.tot]) } : null,
        snd: SOUND.status(), dev: d.os + " · " + d.br + " · " + d.app
      };
    }
  };
  window.TRACK = TRACK;
  setInterval(() => { tick(); }, 5000);
  setInterval(() => { if (document.visibilityState === "visible") checkCharms(); }, 4000);
  window.addEventListener("hashchange", () => setTimeout(tick, 300));
  document.addEventListener("click", () => setTimeout(tick, 400), true);
  setTimeout(() => { tick(); checkCharms(); }, 1500);

  /* ====================== 4. MESSAGE BUTTON (students, signed-in copy only) ====================== */
  let fab = null;
  window.TD_FAB = {
    show(on, n) {
      if (!fab) { fab = document.createElement("button"); fab.id = "td-fab"; fab.type = "button"; fab.className = "td-float"; fab.title = "Message your teacher · Escribe a tu maestro"; fab.setAttribute("aria-label", fab.title); fab.innerHTML = '💬<span class="nb"></span>'; fab.addEventListener("click", () => { if (window.TD_OPENCHAT) window.TD_OPENCHAT(); }); document.body.appendChild(fab); }
      fab.hidden = !on; document.body.classList.toggle("has-fab", !!on); const nb = fab.querySelector(".nb"); nb.textContent = n ? n : "";
    },
    pulse() { if (!fab) return; fab.classList.remove("pulse"); void fab.offsetWidth; fab.classList.add("pulse"); }
  };
  window.TD_UI = { toast, openModal, modalBody, esc };
})();

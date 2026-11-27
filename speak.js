/* Teacher Dario · Speaking practice: the student hears a word or sentence, taps the mic, says it, and gets instant feedback.
   Uses the browser's built-in speech recognition (Chrome, Edge, Safari). window.SPEAK is shared with the Starter course. */
(function () {
  if (typeof VIEWS === "undefined") return;
  const e = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = () => { try { save(); } catch (x) { } };
  const REC = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ---------- voice out ---------- */
  function voice(lang) {
    if (!("speechSynthesis" in window)) return null;
    const vs = speechSynthesis.getVoices();
    if (lang === "es") return vs.find(v => /es[-_]MX/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null;
    return vs.find(v => /en[-_]GB/i.test(v.lang) && /female|libby|sonia|kate|serena|hazel|google uk english female/i.test(v.name)) || vs.find(v => /en[-_]GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  }
  function say(text, lang, slow) {
    if (!("speechSynthesis" in window)) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); const v = voice(lang); if (v) u.voice = v; u.lang = v ? v.lang : (lang === "es" ? "es-MX" : "en-GB"); u.rate = slow ? .62 : .9; speechSynthesis.speak(u); } catch (x) { }
  }

  /* ---------- text normalising ---------- */
  const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function num(n) {
    n = +n; if (!isFinite(n) || n < 0 || n > 99999) return String(n);
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
    if (n < 1000) return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + num(n % 100) : "");
    return num(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + num(n % 1000) : "");
  }
  const CONTR = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is", "we're": "we are", "they're": "they are", "that's": "that is", "what's": "what is", "where's": "where is", "who's": "who is", "there's": "there is", "here's": "here is", "how's": "how is", "let's": "let us", "don't": "do not", "doesn't": "does not", "didn't": "did not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "can't": "can not", "cannot": "can not", "couldn't": "could not", "won't": "will not", "wouldn't": "would not", "shouldn't": "should not", "haven't": "have not", "hasn't": "has not", "hadn't": "had not", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have", "i'll": "i will", "you'll": "you will", "he'll": "he will", "she'll": "she will", "we'll": "we will", "they'll": "they will", "it'll": "it will", "i'd": "i would", "you'd": "you would", "he'd": "he would", "she'd": "she would", "we'd": "we would", "they'd": "they would", "mustn't": "must not", "needn't": "need not", "o'clock": "oclock" };
  const HOMO = [["two", "to", "too"], ["four", "for", "fore"], ["eight", "ate"], ["one", "won"], ["i", "eye", "aye"], ["see", "sea"], ["be", "bee"], ["blue", "blew"], ["no", "know"], ["right", "write", "rite"], ["hi", "high", "hey"], ["red", "read"], ["son", "sun"], ["tea", "tee"], ["pair", "pear", "pare"], ["hour", "our"], ["their", "there"], ["week", "weak"], ["meat", "meet"], ["new", "knew"], ["by", "buy", "bye"], ["hear", "here"], ["wear", "where"], ["hole", "whole"], ["flower", "flour"], ["nose", "knows"], ["mail", "male"], ["plane", "plain"], ["sale", "sail"], ["tail", "tale"], ["wait", "weight"], ["way", "weigh"], ["whether", "weather"], ["piece", "peace"], ["road", "rode"], ["sent", "cent", "scent"], ["some", "sum"], ["steal", "steel"], ["wood", "would"], ["night", "knight"], ["not", "knot"], ["mustard", "mustered"], ["ok", "okay"], ["mum", "mom", "mam"], ["colour", "color"], ["favourite", "favorite"], ["grey", "gray"], ["tshirt", "t-shirt", "tee-shirt"], ["yoyo", "yo-yo"], ["goodbye", "good-bye"], ["bye", "bye-bye"], ["oclock", "o'clock"]];
  const HMAP = {}; HOMO.forEach(g => g.forEach(w => HMAP[w.replace(/[^a-z]/g, "")] = g[0].replace(/[^a-z]/g, "")));
  const LETTERS = { a: ["a", "eh", "ay", "hey", "8"], b: ["b", "be", "bee", "bea"], c: ["c", "see", "sea", "si"], d: ["d", "de", "dee"], e: ["e", "ee"], f: ["f", "ef", "eff"], g: ["g", "gee", "ji", "jee"], h: ["h", "age", "aitch", "each", "eight"], i: ["i", "eye", "aye", "hi"], j: ["j", "jay", "jey"], k: ["k", "kay", "ok", "okay", "cake"], l: ["l", "el", "elle", "hell"], m: ["m", "em", "am"], n: ["n", "en", "and", "in"], o: ["o", "oh", "owe", "0"], p: ["p", "pee", "pea", "pe"], q: ["q", "queue", "cue", "kew"], r: ["r", "are", "our", "ar"], s: ["s", "es", "ess", "yes"], t: ["t", "tea", "tee"], u: ["u", "you", "yu", "ew"], v: ["v", "vee", "we", "be"], w: ["w", "double u", "double you", "doubleu", "doubleyou"], x: ["x", "ex", "eggs", "ax"], y: ["y", "why", "wye", "wy"], z: ["z", "zed", "zee", "said", "set"] };
  function toks(s) {
    s = String(s).toLowerCase().replace(/[’`´]/g, "'").replace(/(\d+)%/g, "$1 percent");
    s = s.replace(/\b(\d{1,2}):(\d{2})\b/g, (m, h, mi) => num(h) + " " + (mi === "00" ? "oclock" : num(mi)));
    s = s.replace(/\$(\d+)/g, "$1 dollars").replace(/\d+/g, n => " " + num(n) + " ");
    s = s.replace(/[a-z]+'[a-z]+/g, w => CONTR[w] || w.replace(/'s$/, "s").replace(/'/g, ""));
    s = s.replace(/-/g, " ").replace(/[^a-z' ]+/g, " ").replace(/'/g, "");
    return s.split(/\s+/).filter(Boolean).map(w => HMAP[w] || w);
  }
  /* longest common subsequence: which target words were heard */
  function align(T, H) {
    const n = T.length, m = H.length, D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) D[i][j] = T[i] === H[j] ? D[i + 1][j + 1] + 1 : Math.max(D[i + 1][j], D[i][j + 1]);
    const ok = new Array(n).fill(false); let i = 0, j = 0;
    while (i < n && j < m) { if (T[i] === H[j]) { ok[i] = true; i++; j++; } else if (D[i + 1][j] >= D[i][j + 1]) i++; else j++; }
    return ok;
  }
  function score(target, alts) {
    const raw = String(target).trim();
    const words = raw.split(/\s+/);
    // single letter (alphabet practice)
    if (/^[A-Za-z]$/.test(raw)) {
      const L = raw.toLowerCase(), ok = (alts || []).some(a => { const s = String(a).toLowerCase().replace(/[^a-z0-9 ]/g, "").trim(); return s === L || (LETTERS[L] || []).includes(s) || s.split(" ").some(w => w === L || (LETTERS[L] || []).includes(w)); });
      return { pct: ok ? 100 : 0, ok, marks: [ok], words: [raw], heard: (alts || [])[0] || "" };
    }
    const T = toks(raw);
    let best = { pct: -1 };
    (alts || [""]).forEach(a => {
      const H = toks(a), m = align(T, H), hit = m.filter(Boolean).length, pct = T.length ? Math.round(100 * hit / T.length) : 0;
      if (pct > best.pct) best = { pct, m, heard: a };
    });
    // map normalised-token marks back to the visible words
    const marks = []; let k = 0;
    words.forEach(w => { const n = toks(w).length || 1; const seg = best.m.slice(k, k + n); marks.push(seg.length ? seg.every(Boolean) : false); k += n; });
    const pass = T.length <= 2 ? best.pct === 100 : T.length <= 5 ? best.pct >= 75 : best.pct >= 80;
    return { pct: best.pct, ok: pass, marks, words, heard: best.heard };
  }

  /* ---------- listening ---------- */
  let cur = null;
  function stop() { if (cur) { try { cur.stop(); } catch (x) { } } }
  function listen(opts) {
    return new Promise((resolve, reject) => {
      if (!REC) return reject("unsupported");
      try { speechSynthesis.cancel(); } catch (x) { }
      stop();
      const r = new REC(); cur = r;
      r.lang = "en-US"; r.interimResults = !!opts.interim; r.maxAlternatives = 5; r.continuous = !!opts.long;
      const alts = new Set(); let finalText = [], err = null, t0 = Date.now();
      const cap = setTimeout(() => { try { r.stop(); } catch (x) { } }, opts.long ? (opts.max || 45000) : 8000);
      r.onresult = ev => {
        let interim = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const res = ev.results[i];
          if (res.isFinal) { finalText[i] = res[0].transcript; for (let j = 0; j < res.length; j++) alts.add(res[j].transcript); }
          else interim += res[0].transcript;
        }
        if (opts.onInterim) opts.onInterim((finalText.filter(Boolean).join(" ") + " " + interim).trim());
      };
      r.onerror = ev => { err = ev.error || "error"; };
      r.onend = () => {
        clearTimeout(cap); if (cur === r) cur = null;
        const full = finalText.filter(Boolean).join(" ").trim();
        if (opts.long) { if (full) return resolve({ alts: [full], text: full, secs: Math.round((Date.now() - t0) / 1000) }); }
        else if (alts.size) return resolve({ alts: [...alts], text: [...alts][0], secs: Math.round((Date.now() - t0) / 1000) });
        reject(err || "no-speech");
      };
      try { r.start(); } catch (x) { reject("start"); }
    });
  }
  const ERR = {
    "unsupported": ["Your browser can't listen to speech. Use Chrome, Edge or Safari.", "Tu navegador no puede escuchar. Usa Chrome, Edge o Safari."],
    "not-allowed": ["The microphone is blocked. Allow the microphone for this page and try again.", "El micrófono está bloqueado. Permite el micrófono para esta página e inténtalo de nuevo."],
    "service-not-allowed": ["The microphone is blocked. Allow the microphone for this page and try again.", "El micrófono está bloqueado. Permite el micrófono para esta página e inténtalo de nuevo."],
    "audio-capture": ["No microphone was found. Connect a microphone and try again.", "No se encontró un micrófono. Conecta uno e inténtalo de nuevo."],
    "network": ["Speech recognition needs the internet. Check your connection.", "El reconocimiento de voz necesita internet. Revisa tu conexión."],
    "no-speech": ["I didn't hear you. Tap the microphone and speak clearly.", "No te escuché. Toca el micrófono y habla claro."],
    "start": ["The microphone is busy. Wait a second and try again.", "El micrófono está ocupado. Espera un segundo e inténtalo de nuevo."],
    "aborted": ["Stopped.", "Detenido."]
  };
  const errMsg = c => { const m = ERR[c] || ERR["no-speech"]; return `<div class="sp-fb bad"><b>${e(m[0])}</b><span>${e(m[1])}</span></div>`; };
  const GOOD = [["Excellent!", "¡Excelente!"], ["Great job!", "¡Muy bien!"], ["Perfect!", "¡Perfecto!"], ["Well done!", "¡Bien hecho!"], ["Fantastic!", "¡Fantástico!"]];
  function resultHTML(r) {
    const words = r.words.map((w, i) => `<span class="${r.marks[i] ? "y" : "n"}">${e(w)}</span>`).join(" ");
    const g = GOOD[Math.floor(Math.random() * GOOD.length)];
    const head = r.ok ? `<b>✅ ${g[0]}</b><span>${g[1]}</span>` : r.pct >= 40 ? `<b>🟡 Almost! Say the red words again.</b><span>¡Casi! Repite las palabras en rojo.</span>` : `<b>🔁 Try again. Listen first, then speak.</b><span>Inténtalo otra vez. Primero escucha y luego habla.</span>`;
    return `<div class="sp-fb ${r.ok ? "ok" : r.pct >= 40 ? "mid" : "bad"}">${head}<div class="sp-words">${words}</div><div class="sp-heard">I heard · Escuché: “${e(r.heard || "…")}” <em>${r.pct}%</em></div></div>`;
  }

  /* mic button wired anywhere: <button data-sp="mic" data-t="target"> + a sibling .sp-res */
  async function micClick(btn) {
    if (btn.classList.contains("rec")) { stop(); return; }
    const target = btn.dataset.t, box = btn.closest("[data-spbox]"), out = box ? box.querySelector(".sp-res") : null;
    btn.classList.add("rec"); const lab = btn.querySelector(".sp-lab"); const old = lab ? lab.innerHTML : "";
    if (lab) lab.innerHTML = "Listening… · Te escucho…";
    if (out) out.innerHTML = `<div class="sp-live">🎙️ Speak now · Habla ahora</div>`;
    let r;
    try { const got = await listen({}); r = score(target, got.alts); if (out) out.innerHTML = resultHTML(r); }
    catch (c) { if (out) out.innerHTML = errMsg(c); r = null; }
    btn.classList.remove("rec"); if (lab) lab.innerHTML = old;
    btn.dispatchEvent(new CustomEvent("speak:result", { bubbles: true, detail: { target, r, key: btn.dataset.k || "" } }));
  }
  const micBtn = (t, k, big) => `<button class="sp-mic${big ? " big" : ""}" type="button" data-sp="mic" data-t="${e(t)}" data-k="${e(k || "")}" aria-label="Speak: ${e(t)}" ${REC ? "" : "disabled"}><span class="sp-ic">🎤</span><span class="sp-lab">${big ? "Tap and speak · Toca y habla" : ""}</span></button>`;

  window.SPEAK = { ok: !!REC, say, listen, score, stop, micBtn, resultHTML, errMsg, toks, uprog: (lv, l) => { try { return unitProg(lv, l); } catch (x) { return [0, 0]; } } };

  /* ======================================================================
     Speaking view
     ====================================================================== */
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const ALLV = ["A0", ...LV, "PET", "FCE"];
  const LNAME = { A0: "Level 0 · Starter", PET: "B1 Preliminary (PET)", FCE: "B2 First (FCE)" };
  const MODES = [["w", "Words", "Palabras"], ["s", "Sentences", "Oraciones"], ["v", "Verbs", "Verbos"], ["q", "Exam questions", "Preguntas de examen"]];
  function allowed() {
    if (window.TD_TEACHER || !document.getElementById("gate")) return ALLV;
    const c = window.TD_CODES || []; if (!c.length) return ALLV;
    const spk = c.filter(x => /^SPK:/.test(x)).map(x => x.slice(4));
    if (spk.length) return ALLV.filter(l => spk.includes(l) || (l === "A0" && c.includes("A0")));
    const s = new Set();
    c.forEach(x => {
      if (x === "A0" || LV.includes(x) || x === "PET" || x === "FCE") s.add(x);
      const m = /^(VOC|VERB):(.+)$/.exec(x); if (m) s.add(m[2]);
      if (x === "VOC" || x === "VERB") ALLV.forEach(l => l !== "A0" && s.add(l));
    });
    const out = ALLV.filter(l => s.has(l)); return out.length ? out : ["A0"];
  }
  const modesFor = lv => lv === "A0" ? ["w", "s"] : (lv === "PET" || lv === "FCE") ? ["w", "s", "v", "q"] : ["w", "s", "v"];

  /* ---------- item pools ---------- */
  let FIG = null; const fig = ipa => { try { return ipa && window.FIGURADA ? FIGURADA(ipa) : ""; } catch (x) { return ""; } };
  const POOL = {};
  function pool(lv, mode) {
    const key = lv + mode; if (POOL[key]) return POOL[key];
    let out = [];
    if (lv === "A0") {
      const U = (window.STARTER && STARTER.units) || [];
      if (mode === "w") U.forEach(u => u.groups.forEach(g => g.w.forEach(w => out.push({ t: w[0], es: w[2], f: w[1], u: u.id }))));
      else U.forEach(u => u.sent.forEach(s => out.push({ t: s[0], es: s[1], f: s[2], u: u.id })));
    } else if (mode === "q") {
      out = (QS[lv] || []).map(q => ({ t: q[0], es: q[1], model: q[2], q: 1 }));
    } else if (mode === "v") {
      const vd = (window.VERBS_DATA || {})[lv] || [];
      out = vd.map(r => ({ t: r[0] + ", " + r[1].split("/")[0] + ", " + r[2].split("/")[0], es: r[3] + " · " + r[4] + " · " + r[5], f: r[6] + " · " + r[7].split("/")[0].trim() + " · " + r[8].split("/")[0].trim() }));
    } else {
      const D = (window.DICT_DATA && DICT_DATA.entries) || [];
      const base = lv === "PET" ? "B1" : lv === "FCE" ? "B2" : lv;
      const inLv = r => lv === "FCE" ? /^B2 First/.test(r[8] || "") : lv === "PET" ? (r[12] || []).includes("PET") : r[2] === lv;
      if (mode === "w") {
        D.filter(inLv).forEach(r => out.push({ t: r[0], es: r[4], f: fig(r[3]) }));
        ((window.VERBS_DATA || {})[lv] || []).forEach(r => out.push({ t: r[0], es: r[3], f: r[6] }));
      } else {
        D.filter(inLv).forEach(r => { if (r[7] && r[7].split(" ").length <= 16) out.push({ t: r[7], es: "" }); });
        ((window.VERBS_DATA || {})[lv] || []).forEach(r => { if (r[10]) out.push({ t: r[10], es: r[11] }); });
        const L = (window.ALL_LESSONS || (typeof LESSONS !== "undefined" ? LESSONS : [])).filter(l => l.level === base);
        L.forEach(l => (l.s || []).forEach(s => { const n = s.split(" ").length; if (n >= 4 && n <= 16) out.push({ t: s, es: "" }); }));
      }
    }
    const seen = new Set(); out = out.filter(x => { const k = x.t.toLowerCase(); if (!x.t || seen.has(k)) return false; seen.add(k); return true; });
    return POOL[key] = out;
  }

  /* exam-style questions: [question, español, model answer] */
  const QS = {
    PET: [
      ["What's your name? How do you spell your surname?", "¿Cómo te llamas? ¿Cómo se escribe tu apellido?", "My name is Carlos Ramírez. My surname is spelt R-A-M-I-R-E-Z."],
      ["Where do you live?", "¿Dónde vives?", "I live in Guadalajara, in the west of Mexico. It's a big city with lots of parks and good food."],
      ["Do you work or are you a student?", "¿Trabajas o eres estudiante?", "I'm a student. I'm studying to be a nurse, and I also work at a café on Saturdays."],
      ["What do you enjoy doing in your free time?", "¿Qué te gusta hacer en tu tiempo libre?", "I really enjoy playing football with my friends, because it keeps me fit. I also like watching films at the weekend."],
      ["Tell us about your best friend.", "Háblanos de tu mejor amigo o amiga.", "My best friend is called Laura. We met at primary school, so we have known each other for ten years. She is funny and very kind."],
      ["What did you do last weekend?", "¿Qué hiciste el fin de semana pasado?", "Last weekend I visited my grandparents. We had lunch together and in the evening I went to the cinema with my cousin."],
      ["What's your favourite food? Why?", "¿Cuál es tu comida favorita? ¿Por qué?", "My favourite food is enchiladas, because my mother makes them with a delicious green sauce. I eat them every Sunday."],
      ["How do you usually travel to school or work?", "¿Cómo sueles ir a la escuela o al trabajo?", "I usually go by bus because it's cheap, but when the weather is nice I ride my bike. It takes about twenty minutes."],
      ["Tell us about a place you would like to visit.", "Háblanos de un lugar que te gustaría visitar.", "I would like to visit Japan, because I love the food and the culture. I'd like to see Tokyo and the mountains."],
      ["Do you prefer spending time indoors or outdoors? Why?", "¿Prefieres estar en casa o al aire libre? ¿Por qué?", "I prefer being outdoors, because I like nature and fresh air. For example, I often go walking in the park near my house."],
      ["What kind of music do you like?", "¿Qué tipo de música te gusta?", "I like pop and rock music. My favourite band is Coldplay, and I listen to their songs when I'm studying."],
      ["Tell us about your family.", "Háblanos de tu familia.", "There are five people in my family: my parents, my two brothers and me. My older brother lives in Monterrey, so we don't see him very often."],
      ["What do you like about the town where you live?", "¿Qué te gusta de la ciudad donde vives?", "I like my town because it's quiet and the people are friendly. There is also a beautiful market in the centre."],
      ["How often do you use the internet? What for?", "¿Con qué frecuencia usas internet? ¿Para qué?", "I use the internet every day. I use it to chat with my friends, to watch videos and to do my homework."],
      ["What are you going to do next summer?", "¿Qué vas a hacer el próximo verano?", "Next summer I'm going to travel to the beach with my family. I'm also going to take an English course."],
      ["Is it better to study alone or with friends? Why?", "¿Es mejor estudiar solo o con amigos? ¿Por qué?", "I think it's better to study alone, because I can concentrate more. But sometimes studying with friends is useful when you don't understand something."],
      ["What sports are popular in your country?", "¿Qué deportes son populares en tu país?", "Football is the most popular sport in Mexico. Baseball and boxing are popular too, especially in the north."],
      ["Describe your ideal weekend.", "Describe tu fin de semana ideal.", "My ideal weekend is relaxing. On Saturday I'd sleep late and go out with friends, and on Sunday I'd have a big lunch with my family."],
      ["Do you think learning English is important? Why?", "¿Crees que aprender inglés es importante? ¿Por qué?", "Yes, I think it's very important, because it helps you find a better job. You can also travel and meet people from other countries."],
      ["What do you usually do in the evenings?", "¿Qué haces normalmente por las tardes-noches?", "In the evenings I usually have dinner with my family and then I do my homework. Before bed I read or watch a series."]
    ],
    FCE: [
      ["What do you enjoy most about the area where you live?", "¿Qué es lo que más disfrutas de la zona donde vives?", "What I enjoy most is that everything is within walking distance. There's a lively market, a couple of nice cafés and a park where I go running, so I rarely need the car."],
      ["Who has had the biggest influence on your life? Why?", "¿Quién ha tenido mayor influencia en tu vida? ¿Por qué?", "I'd say my grandmother, because she taught me to be patient and hard-working. She raised five children on her own, and I really admire how she never gave up."],
      ["How important is it to have a hobby?", "¿Qué tan importante es tener un pasatiempo?", "I think it's really important, because a hobby helps you switch off from work or studies. Personally, playing the guitar helps me relax, and it has also helped me make new friends."],
      ["If you could live anywhere in the world, where would you choose? Why?", "Si pudieras vivir en cualquier parte del mundo, ¿dónde sería? ¿Por qué?", "I'd probably choose Canada, because I love nature and the cities seem very well organised. On the other hand, I'm not sure I could cope with such cold winters."],
      ["Do you think people spend too much time on their phones?", "¿Crees que la gente pasa demasiado tiempo en el celular?", "Yes, I think most of us do. Phones are useful, but people often check them out of habit, even during meals. I've started turning off notifications to avoid that."],
      ["What was the last film you really enjoyed? What did you like about it?", "¿Cuál fue la última película que realmente disfrutaste? ¿Qué te gustó?", "The last film I really enjoyed was a Mexican drama about a family in Oaxaca. What I liked most was the acting, which felt very natural, and the beautiful photography."],
      ["How do you think your town will change in the next ten years?", "¿Cómo crees que cambiará tu ciudad en los próximos diez años?", "I imagine it will grow a lot, because more people are moving here for work. Hopefully public transport will improve, otherwise the traffic is going to get much worse."],
      ["Is it better to work for a big company or a small one?", "¿Es mejor trabajar en una empresa grande o en una pequeña?", "It depends on what you want. A big company usually offers more security and training, whereas in a small company you often have more responsibility and a closer team."],
      ["What are the advantages and disadvantages of online learning?", "¿Cuáles son las ventajas y desventajas de aprender en línea?", "The main advantage is flexibility, since you can study whenever you want. However, it's easy to get distracted at home, and you miss the contact with classmates and teachers."],
      ["Tell us about a skill you would like to learn and why.", "Háblanos de una habilidad que te gustaría aprender y por qué.", "I'd love to learn how to cook properly, because at the moment I only know a few basic dishes. It would save me money and I could invite friends for dinner."],
      ["Should young people be paid for doing housework? Why or why not?", "¿Deberían pagarles a los jóvenes por hacer quehaceres? ¿Por qué?", "I don't think so. Helping at home is part of being in a family, so it shouldn't be treated as a job. That said, a small reward can motivate younger children."],
      ["What makes a good teacher?", "¿Qué hace a un buen maestro?", "In my opinion, a good teacher is patient and explains things clearly. They also make lessons interesting and notice when a student is struggling, rather than just following the book."],
      ["Do you think tourism is good for a place? Why?", "¿Crees que el turismo es bueno para un lugar? ¿Por qué?", "On the whole, yes, because it creates jobs and brings money to local businesses. But too many tourists can push up prices and damage the environment, so it needs to be controlled."],
      ["How do you usually celebrate special occasions?", "¿Cómo sueles celebrar las ocasiones especiales?", "We usually get the whole family together for a big meal at my parents' house. For birthdays there's always a cake, and sometimes we hire a mariachi band, which is great fun."],
      ["Would you rather live in the city or the countryside? Why?", "¿Preferirías vivir en la ciudad o en el campo? ¿Por qué?", "At this stage of my life I'd rather live in the city, because there are more job opportunities and things to do. Maybe when I'm older I'll move to the countryside for a quieter life."],
      ["What's the best piece of advice you've ever been given?", "¿Cuál es el mejor consejo que te han dado?", "The best advice I've ever been given was from my father: don't be afraid of making mistakes. It has helped me a lot, especially when speaking English."],
      ["How important is it to keep up with the news?", "¿Qué tan importante es mantenerse al día con las noticias?", "I think it's quite important to know what's going on, especially locally. However, I try not to read too much news because it can be quite negative and stressful."],
      ["Do you think it's important to do some exercise every day?", "¿Crees que es importante hacer ejercicio todos los días?", "Definitely. Even a short walk makes a big difference to your health and your mood. I try to cycle to work, so I get some exercise without having to go to the gym."],
      ["What would you do if you won a lot of money?", "¿Qué harías si ganaras mucho dinero?", "First of all, I'd pay off my family's debts and buy my parents a new house. Then I'd probably travel around South America and save the rest for the future."],
      ["Is it better to have a few close friends or lots of friends?", "¿Es mejor tener pocos amigos cercanos o muchos amigos?", "I'd say a few close friends, because you can really trust them and count on them when things go wrong. Having lots of friends is fun, but those relationships are often more superficial."]
    ]
  };

  /* ---------- state ---------- */
  const SS = () => { if (!S.speak) S.speak = {}; const s = S.speak; s.lv = s.lv || allowed()[0]; s.mode = s.mode || "w"; s.stats = s.stats || {}; s.hard = s.hard || []; s.xp = s.xp || 0; return s; };
  let sess = null; // {lv,mode,items,i,res:[]}
  function newSession(lv, mode) {
    const P = pool(lv, mode).slice(); for (let i = P.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [P[i], P[j]] = [P[j], P[i]]; }
    sess = { lv, mode, items: P.slice(0, mode === "q" ? 5 : 10), i: 0, res: [] };
  }
  function record(r, item) {
    const s = SS(), k = sess.lv + "|" + sess.mode, st = s.stats[k] || (s.stats[k] = { t: 0, o: 0, best: 0 });
    st.t++; if (r.ok) { st.o++; s.xp += sess.mode === "q" ? 5 : 2; }
    s.last = Date.now();
    if (!r.ok && sess.mode !== "q") { s.hard = [{ t: item.t, es: item.es || "", f: item.f || "", lv: sess.lv }, ...s.hard.filter(h => h.t !== item.t)].slice(0, 30); }
    if (r.ok) s.hard = s.hard.filter(h => h.t !== item.t);
    store();
  }

  /* ---------- exam-question checker ---------- */
  const LINK = ["because", "so", "but", "also", "for example", "however", "although", "and then", "first", "then", "whereas", "on the other hand", "in my opinion", "i think", "personally", "that's why", "since", "if"];
  function judgeLong(text, secs, lv) {
    const w = toks(text).length, need = lv === "FCE" ? 25 : 15;
    const lw = String(text).toLowerCase(); const used = LINK.filter(x => new RegExp("\\b" + x + "\\b").test(lw));
    const checks = [
      [w >= need, `Length: ${w} words (aim for ${need}+)`, `Extensión: ${w} palabras (meta: ${need} o más)`],
      [used.length >= 1, used.length ? `Linking words: ${used.slice(0, 5).join(", ")}` : "Add a reason with because, so, but…", used.length ? `Conectores: ${used.slice(0, 5).join(", ")}` : "Agrega una razón con because, so, but…"],
      [used.length >= 2 || w >= need * 1.6, "Develop your answer: give an example or extra detail.", "Desarrolla tu respuesta: da un ejemplo o un detalle extra."],
      [secs >= (lv === "FCE" ? 15 : 8), `You spoke for about ${secs} seconds.`, `Hablaste unos ${secs} segundos.`]
    ];
    const stars = checks.filter(c => c[0]).length;
    return { ok: stars >= 3, pct: Math.round(stars * 25), checks, w };
  }

  /* ======================================================================
     Speaking COURSE: A1–C2 units (one per lesson) and PET / FCE tests, Parts 1–4
     ====================================================================== */
  const CLV = ["A1", "A2", "B1", "B2", "C1", "C2", "PET", "FCE"];
  const courseLevels = () => allowed().filter(l => l !== "A0");
  const SC = () => window.SPEAK_COURSE || { q: {}, phrases: {}, min: {} };
  const lessonsOf = lv => { try { return (window.ALL_LESSONS || LESSONS).filter(l => l.level === lv); } catch (x) { return []; } };
  const testsOf = lv => ((lv === "PET" ? window.PET : window.FCE) || {}).tests || [];
  const CTX = {}; // long-answer contexts by key
  const done = k => !!(SS().cd || {})[k];
  function markDone(k, ok) { const s = SS(); s.cd = s.cd || {}; if (ok) s.cd[k] = 1; s.last = Date.now(); if (ok) s.xp = (s.xp || 0) + 3; const st = s.stats["C|" + k.split(":")[1]] || (s.stats["C|" + k.split(":")[1]] = { t: 0, o: 0 }); st.t++; if (ok) st.o++; store(); }
  const UTABS = [["w", "Words", "Palabras", "🔤"], ["s", "Sentences", "Oraciones", "💬"], ["g", "Grammar", "Gramática", "🧩"], ["t", "Talk", "Habla", "🎙️"]];
  function unitItems(l) {
    const w = Object.keys(l.g || {}).map(x => ({ t: x, es: (l.g || {})[x] }));
    const s = (l.s || []).filter(x => x.split(" ").length <= 18).map(x => ({ t: x }));
    const g = ((l.gr && l.gr.ex) || []).map(x => ({ t: x }));
    const t = ((SC().q || {})[l.id] || []).map(q => ({ t: q[0], es: q[1] }));
    if (l.prompt && !t.length) t.push({ t: l.prompt });
    return { w, s, g, t };
  }
  function unitProg(lv, l) { const I = unitItems(l); let n = 0, d = 0; ["w", "s", "g", "t"].forEach(k => I[k].forEach((x, i) => { n++; if (done(`c:${lv}:${l.id}:${k}:${k === "t" ? i : x.t}`)) d++; })); return [d, n]; }
  const EXP = {
    PET: { 1: { need: 12, max: 40000, sec: 6 }, 2: { need: 40, max: 75000, sec: 30 }, 3: { need: 45, max: 120000, sec: 40 }, 3.5: { need: 12, max: 40000 }, 4: { need: 18, max: 60000, sec: 10 }, f: { need: 10, max: 30000 } },
    FCE: { 1: { need: 20, max: 45000, sec: 10 }, 2: { need: 60, max: 80000, sec: 40 }, 3: { need: 70, max: 150000, sec: 60 }, 3.5: { need: 18, max: 60000 }, 4: { need: 28, max: 70000, sec: 15 }, f: { need: 12, max: 35000 } }
  };
  const PHR = {
    1: [["Personally, I…", "Personalmente…"], ["I'd say that… because…", "Yo diría que… porque…"], ["For example, …", "Por ejemplo, …"], ["I'm really into… / I'm not keen on…", "Me encanta… / No me gusta mucho…"]],
    2: [["In this photo / In the first one I can see…", "En esta foto / En la primera veo…"], ["In the background / foreground / on the left…", "Al fondo / al frente / a la izquierda…"], ["They look… / They seem to be…", "Se ven… / Parece que están…"], ["They might / could be…", "Puede que estén…"], ["Whereas in the second photo…", "Mientras que en la segunda foto…"], ["Both photos show…", "Las dos fotos muestran…"]],
    3: [["Shall we start with…?", "¿Empezamos con…?"], ["What do you think about…?", "¿Qué opinas de…?"], ["That's a good point, but…", "Buen punto, pero…"], ["I agree / I'm not sure I agree", "Estoy de acuerdo / No estoy seguro"], ["How about…? / Why don't we…?", "¿Qué tal…? / ¿Por qué no…?"], ["Let's move on to…", "Pasemos a…"]],
    3.5: [["I think we should choose… because…", "Creo que deberíamos elegir… porque…"], ["So we've decided on…", "Entonces decidimos…"], ["The best option would be… since…", "La mejor opción sería… ya que…"]],
    4: [["In my opinion / As far as I'm concerned…", "En mi opinión…"], ["It depends on…", "Depende de…"], ["On the one hand… on the other hand…", "Por un lado… por otro…"], ["That's why…", "Por eso…"]]
  };
  const PHRX = { 2: ["can see", "background", "foreground", "left", "right", "look", "seem", "might", "could", "probably", "whereas", "while", "both", "photo", "picture"], 3: ["what do you think", "agree", "how about", "why don't", "shall we", "let's", "good idea", "good point", "what about", "i think", "move on"], 3.5: ["choose", "decide", "best", "should", "would be", "agree", "option", "because"], 4: ["opinion", "think", "depends", "because", "for example", "on the other hand", "concerned", "believe", "however"], 1: ["because", "really", "usually", "for example", "but", "so"] };
  const LNK = ["because", "so", "but", "also", "for example", "however", "although", "and then", "whereas", "on the other hand", "since", "if", "that's why", "as well"];
  function judgeX(text, secs, c) {
    const T = toks(text), w = T.length, lw = " " + T.join(" ") + " ";
    const checks = [[w >= c.need, `Length: ${w} words (aim for ${c.need}+)`, `Extensión: ${w} palabras (meta: ${c.need} o más)`]];
    if (c.sec) checks.push([secs >= c.sec, `You spoke for about ${secs} seconds (aim for ${c.sec}+)`, `Hablaste unos ${secs} segundos (meta: ${c.sec}+)`]);
    if (c.opts) { const hit = c.opts.filter(o => toks(o).filter(x => x.length > 3).some(x => lw.includes(" " + x + " ") || lw.includes(" " + x.replace(/s$/, "")))); checks.push([hit.length >= (c.optNeed || 3), `Options discussed: ${hit.length} of ${c.opts.length} (aim for ${c.optNeed || 3}+)`, `Opciones comentadas: ${hit.length} de ${c.opts.length}`]); }
    if (c.phr) { const used = c.phr.filter(p => lw.includes(" " + toks(p).join(" ") + " ")); checks.push([used.length >= 1, used.length ? `Useful language: ${used.slice(0, 4).join(", ")}` : "Use the useful phrases below.", used.length ? `Frases útiles: ${used.slice(0, 4).join(", ")}` : "Usa las frases útiles de abajo."]); }
    if (c.need >= 12) { const u = LNK.filter(x => lw.includes(" " + toks(x).join(" ") + " ")); checks.push([u.length >= 1, u.length ? `Linking words: ${u.slice(0, 4).join(", ")}` : "Give a reason with because / so / but.", u.length ? `Conectores: ${u.slice(0, 4).join(", ")}` : "Da una razón con because / so / but."]); }
    const fails = checks.filter(x => !x[0]).length;
    return { ok: checks[0][0] && fails <= 1, checks, w };
  }
  function longBox(key, c, label) {
    CTX[key] = c;
    return `<div class="sx-long" data-spbox><button class="sp-mic big" type="button" data-spv="clong" data-k="${e(key)}" ${REC ? "" : "disabled"}><span class="sp-ic">🎤</span><span class="sp-lab">${e(label || "Answer · Responder")}</span></button>${done(key) ? `<span class="sx-ok">✅ Done · Hecho</span>` : ""}<div class="sp-res"></div></div>`;
  }
  async function courseLong(btn) {
    const box = btn.closest("[data-spbox]"), out = box.querySelector(".sp-res"), lab = btn.querySelector(".sp-lab"), key = btn.dataset.k, c = CTX[key];
    if (btn.classList.contains("rec")) { stop(); return; }
    const old = lab.textContent; btn.classList.add("rec"); lab.textContent = "Stop · Terminar ⏹";
    out.innerHTML = `<div class="sp-live">🎙️ <span class="sx-t">0s</span> · <span class="sp-int">Speak now · Habla ahora…</span></div>`;
    const t0 = Date.now(), tick = setInterval(() => { const x = out.querySelector(".sx-t"); if (x) x.textContent = Math.round((Date.now() - t0) / 1000) + "s"; }, 500);
    try {
      const got = await listen({ long: true, interim: true, max: c.max || 45000, onInterim: t => { const x = out.querySelector(".sp-int"); if (x) x.textContent = t || "…"; } });
      const j = judgeX(got.text, got.secs, c);
      out.innerHTML = `<div class="sp-fb ${j.ok ? "ok" : "mid"}"><b>${j.ok ? "✅ Good answer!" : "🟡 Good start — try to improve it."}</b><span>${j.ok ? "¡Buena respuesta!" : "Buen comienzo, intenta mejorarla."}</span><div class="sp-heard">You said · Dijiste: “${e(got.text)}”</div><ul class="sp-checks">${j.checks.map(x => `<li class="${x[0] ? "y" : "n"}">${x[0] ? "✅" : "➕"} ${e(x[1])} <em>${e(x[2])}</em></li>`).join("")}</ul></div>`;
      markDone(key, j.ok);
      if (j.ok && !box.querySelector(".sx-ok")) btn.insertAdjacentHTML("afterend", `<span class="sx-ok">✅ Done · Hecho</span>`);
    } catch (x) { out.innerHTML = errMsg(x); }
    clearInterval(tick); btn.classList.remove("rec"); lab.textContent = old;
    refreshBars();
  }
  function refreshBars() { const p = document.querySelector("#v-speak .sx-pp"); if (!p) return; const s = SS(); const r = curProg(); if (r) { p.querySelector("i").style.width = Math.round(100 * r[0] / Math.max(1, r[1])) + "%"; p.querySelector("b").textContent = r[0] + " / " + r[1]; } }
  function curProg() { const s = SS(); if (!s.cu) return null; if (s.clv === "PET" || s.clv === "FCE") { const t = testsOf(s.clv).find(x => String(x.n) === String(s.cu)); return t ? testProg(s.clv, t) : null; } const l = lessonsOf(s.clv).find(x => x.id === s.cu); return l ? unitProg(s.clv, l) : null; }
  const phrBox = rows => `<details class="sx-phr" open><summary>💡 Useful phrases · Frases útiles</summary><ul>${rows.map(r => `<li><button class="st-ib sm" type="button" data-spv="say" data-t="${e(r[0].replace(/…/g, ""))}" aria-label="Listen">🔊</button><b>${e(r[0])}</b> <em>${e(r[1])}</em></li>`).join("")}</ul></details>`;
  const pbar = r => `<div class="sx-pp"><div class="sp-prog"><i style="width:${Math.round(100 * r[0] / Math.max(1, r[1]))}%"></i></div><b>${r[0]} / ${r[1]}</b> ✅</div>`;
  function rowItem(key, it) {
    return `<div class="sx-row ${done(key) ? "done" : ""}" data-spbox><div class="sx-rt"><b>${e(it.t)}</b>${it.es ? `<span>${e(it.es)}</span>` : ""}</div><button class="st-ib" type="button" data-spv="say" data-t="${e(it.t)}" aria-label="Listen">🔊</button><button class="st-ib" type="button" data-spv="slow" data-t="${e(it.t)}" aria-label="Slowly">🐢</button>${micBtn(it.t, key)}<span class="sx-ok">${done(key) ? "✅" : ""}</span><div class="sp-res"></div></div>`;
  }
  /* exam tests */
  function testKeys(lv, t) {
    const n = t.n, K = [];
    (t.s1 || []).forEach((q, i) => K.push(`x:${lv}:${n}:1:${i}`));
    K.push(`x:${lv}:${n}:2:A`, `x:${lv}:${n}:2:B`); if (lv === "FCE") K.push(`x:${lv}:${n}:2:Af`, `x:${lv}:${n}:2:Bf`);
    K.push(`x:${lv}:${n}:3:m`, `x:${lv}:${n}:3:d`);
    (t.s4 || []).forEach((q, i) => K.push(`x:${lv}:${n}:4:${i}`));
    return K;
  }
  const testProg = (lv, t) => { const K = testKeys(lv, t); return [K.filter(done).length, K.length]; };
  const partProg = (lv, t, p) => { const K = testKeys(lv, t).filter(k => k.split(":")[3] === String(p)); return [K.filter(done).length, K.length]; };
  function photo(lv, t, slot, desc) {
    const P = lv === "PET" ? (window.PET_PHOTOS || {})[`p${t.n}${slot}`] : (window.FCE_PHOTOS || {})[`t${t.n}${slot}`];
    return `<figure class="sx-ph">${P ? `<img src="${P.src}" alt="${e(desc || "")}" loading="lazy">` : `<div class="sx-phd">${e(desc || "")}</div>`}</figure>`;
  }
  const PINFO = {
    PET: { 1: ["Part 1 · Interview", "2–3 min · Answer the examiner's questions about yourself. Give a reason or an example.", "Responde preguntas sobre ti. Da una razón o un ejemplo."], 2: ["Part 2 · Photo description", "About 1 minute per photo · Describe everything you can see.", "Describe todo lo que ves durante 1 minuto."], 3: ["Part 3 · Collaborative task", "2–3 min · Talk about each idea with your partner, then decide.", "Comenta cada idea con tu compañero y luego decidan."], 4: ["Part 4 · Discussion", "3 min · Give your opinion with reasons about the Part 3 topic.", "Da tu opinión con razones sobre el tema."] },
    FCE: { 1: ["Part 1 · Interview", "2 min · Personal questions. Extend your answers with reasons and examples.", "Preguntas personales. Amplía con razones y ejemplos."], 2: ["Part 2 · Long turn", "1 minute · Compare the two photos and answer the question at the top.", "Compara las dos fotos y responde la pregunta de arriba."], 3: ["Part 3 · Collaborative task", "2 min discussion + 1 min decision · Talk about each prompt, then decide.", "2 min de discusión + 1 min para decidir."], 4: ["Part 4 · Discussion", "4 min · Discuss deeper questions on the Part 3 topic.", "Discute preguntas más profundas sobre el tema."] }
  };
  function testPart(lv, t, p) {
    const X = EXP[lv], n = t.n; let h = `<div class="card sx-pinfo"><b>${e(PINFO[lv][p][0])}</b><span>${e(PINFO[lv][p][1])}</span><em>${e(PINFO[lv][p][2])}</em></div>`;
    if (p === 1 || p === 4) {
      (p === 1 ? t.s1 : t.s4).forEach((q, i) => {
        h += `<div class="card sx-q"><div class="sx-qt"><span class="sx-n">${i + 1}</span><b>${e(q)}</b><button class="st-ib" type="button" data-spv="say" data-t="${e(q)}" aria-label="Listen">🔊</button></div>${longBox(`x:${lv}:${n}:${p}:${i}`, Object.assign({ phr: PHRX[p] }, X[p]))}</div>`;
      });
      h += phrBox(PHR[p]);
    }
    if (p === 2) {
      const S2 = t.s2 || [];
      ["A", "B"].forEach((c, ci) => {
        const task = S2[ci] || {};
        h += `<div class="card sx-q"><div class="sx-qt"><span class="sx-n">${c}</span><b>Candidate ${c} · Candidato ${c}</b></div><p>${e(task.task || "")} <button class="st-ib" type="button" data-spv="say" data-t="${e(task.task || "")}" aria-label="Listen">🔊</button></p>`;
        if (lv === "PET") h += `<div class="sx-phs one">${photo(lv, t, "s" + (ci + 1), task.d)}</div>`;
        else h += `${task.top ? `<div class="sx-top">${e(task.top)}</div>` : ""}<div class="sx-phs">${photo(lv, t, "s" + ci + "1", task.d1)}${photo(lv, t, "s" + ci + "2", task.d2)}</div>`;
        h += longBox(`x:${lv}:${n}:2:${c}`, Object.assign({ phr: PHRX[2] }, X[2]), "Talk for 1 minute · Habla 1 minuto");
        if (lv === "FCE" && task.f) h += `<div class="sx-f"><b>${e(task.f)}</b> <button class="st-ib" type="button" data-spv="say" data-t="${e(task.f.replace(/^Your partner:\s*/, ""))}" aria-label="Listen">🔊</button>${longBox(`x:${lv}:${n}:2:${c}f`, X.f, "Short answer · Respuesta corta")}</div>`;
        h += `</div>`;
      });
      h += phrBox(PHR[2]);
    }
    if (p === 3) {
      const s3 = t.s3 || {}, center = lv === "PET" ? (s3.c || s3.q) : s3.q, opts = s3.p || [], dec = lv === "PET" ? (s3.c || "Which is the best idea?") : (s3.d || "Decide which is the best idea.");
      h += `<div class="card sx-q">${lv === "PET" && s3.q ? `<p>${e(s3.q)} <button class="st-ib" type="button" data-spv="say" data-t="${e(s3.q)}" aria-label="Listen">🔊</button></p>` : ""}
        <div class="sx-map"><div class="sx-c">${e(center)}</div>${opts.map(o => `<div class="sx-o">${e(o)}</div>`).join("")}</div>
        <p class="sp-tip">Talk about each idea: give advantages and disadvantages, ask your partner's opinion (imagine your partner). · Comenta cada idea: ventajas, desventajas y pregunta la opinión de tu compañero.</p>
        ${longBox(`x:${lv}:${n}:3:m`, Object.assign({ phr: PHRX[3], opts, optNeed: Math.min(3, opts.length) }, X[3]), "Discuss the ideas · Comenta las ideas")}
        <div class="sx-f"><b>Now decide · Ahora decidan: ${e(dec)}</b> <button class="st-ib" type="button" data-spv="say" data-t="${e(dec)}" aria-label="Listen">🔊</button>${longBox(`x:${lv}:${n}:3:d`, Object.assign({ phr: PHRX[3.5] }, X[3.5]), "Decide · Decidir")}</div></div>`;
      h += phrBox(PHR[3].concat(PHR[3.5]));
    }
    return h;
  }
  function drawCourse(root, h) {
    const s = SS(); const CL = courseLevels(); if (!CL.length) { root.innerHTML = h + `<div class="card"><p>Your teacher hasn't opened a speaking course for you yet. Use Free practice. · Tu maestro aún no abre un curso. Usa Práctica libre.</p></div>`; return; }
    if (!CL.includes(s.clv)) { s.clv = CL[0]; s.cu = ""; }
    h += `<div class="sp-chips sx-lv" role="group" aria-label="Course level">${CL.map(l => `<button type="button" class="chip ${l === s.clv ? "on" : ""}" data-spv="clv" data-v="${l}">${l === "PET" ? "B1 PET" : l === "FCE" ? "B2 FCE" : l}</button>`).join("")}</div>`;
    const ex = s.clv === "PET" || s.clv === "FCE";
    if (!s.cu) {
      if (ex) {
        const T = testsOf(s.clv);
        h += `<div class="card sx-intro"><b>${s.clv === "PET" ? "B1 Preliminary" : "B2 First"} Speaking · 10 practice tests</b><p>Answer every question of Parts 1–4 out loud. The app listens and checks length, timing, useful language and linking words. · Responde en voz alta cada pregunta de las Partes 1–4.</p></div><div class="sx-grid">${T.map(t => { const r = testProg(s.clv, t); return `<button class="sx-tile" type="button" data-spv="cu" data-v="${t.n}"><span class="sx-tn">Test ${t.n}</span><b>${e(t.theme)}</b>${[1, 2, 3, 4].map(p => { const q = partProg(s.clv, t, p); return `<span class="sx-pb ${q[0] === q[1] ? "ok" : ""}">P${p} ${q[0]}/${q[1]}</span>`; }).join("")}<div class="sp-prog"><i style="width:${Math.round(100 * r[0] / r[1])}%"></i></div></button>`; }).join("")}</div>`;
      } else {
        const L = lessonsOf(s.clv);
        h += `<div class="card sx-intro"><b>Speaking course ${s.clv} · ${L.length} units</b><p>Each unit: say the key words, repeat the sentences, practise the grammar and answer 3 questions about the topic. · En cada unidad: palabras clave, oraciones, gramática y 3 preguntas para hablar.</p></div><div class="sx-grid">${L.map((l, i) => { const r = unitProg(s.clv, l); return `<button class="sx-tile" type="button" data-spv="cu" data-v="${l.id}"><span class="sx-tn">Unit ${i + 1}</span><b>${e(l.title)}</b><span class="sub">${e((l.gr && l.gr.t) || l.topic)}</span><div class="sp-prog"><i style="width:${Math.round(100 * r[0] / Math.max(1, r[1]))}%"></i></div><span class="sub">${r[0]} / ${r[1]} ✅</span></button>`; }).join("")}</div>`;
        h += phrBox((SC().phrases || {})[s.clv] || []);
      }
      root.innerHTML = h; return;
    }
    if (ex) {
      const t = testsOf(s.clv).find(x => String(x.n) === String(s.cu)); if (!t) { s.cu = ""; return drawCourse(root, h); }
      const p = +s.ct || 1; if (!(p >= 1 && p <= 4)) s.ct = "1";
      h += `<div class="sx-uh"><button class="btn" type="button" data-spv="cback">← Tests</button><div><span class="sp-lv">${s.clv === "PET" ? "B1 Preliminary" : "B2 First"} · Test ${t.n}</span><h2>${e(t.theme)}</h2></div>${pbar(testProg(s.clv, t))}</div>
        <div class="st-tabs sx-tabs">${[1, 2, 3, 4].map(k => { const q = partProg(s.clv, t, k); return `<button type="button" role="tab" aria-selected="${(+s.ct || 1) === k}" data-spv="ct" data-v="${k}"><span>${["🙋", "🖼️", "🤝", "💭"][k - 1]}</span>Part ${k}<small>${q[0]}/${q[1]} ✅</small></button>`; }).join("")}</div>`;
      h += testPart(s.clv, t, +s.ct || 1);
      const k = +s.ct || 1; h += `<div class="row st-foot">${k > 1 ? `<button class="btn" type="button" data-spv="ct" data-v="${k - 1}">← Part ${k - 1}</button>` : "<span></span>"}${k < 4 ? `<button class="btn primary" type="button" data-spv="ct" data-v="${k + 1}">Part ${k + 1} ➜</button>` : `<button class="btn primary" type="button" data-spv="cback">Finish · Terminar ✓</button>`}</div>`;
      root.innerHTML = h; return;
    }
    const L = lessonsOf(s.clv), i = L.findIndex(x => x.id === s.cu), l = L[i]; if (!l) { s.cu = ""; return drawCourse(root, h); }
    const I = unitItems(l); if (!UTABS.some(x => x[0] === s.ct)) s.ct = "w";
    h += `<div class="sx-uh"><button class="btn" type="button" data-spv="cback">← Units</button><div><span class="sp-lv">${s.clv} · Unit ${i + 1}</span><h2>${e(l.title)}</h2><span class="sub">${e((l.gr && l.gr.t) || "")}</span></div>${pbar(unitProg(s.clv, l))}</div>
      <div class="st-tabs sx-tabs">${UTABS.map(x => { const n = I[x[0]].length, d = I[x[0]].filter((it, j) => done(`c:${s.clv}:${l.id}:${x[0]}:${x[0] === "t" ? j : it.t}`)).length; return `<button type="button" role="tab" aria-selected="${s.ct === x[0]}" data-spv="ct" data-v="${x[0]}"><span>${x[3]}</span>${x[2]}<small>${d}/${n} ✅</small></button>`; }).join("")}</div>`;
    if (s.ct === "t") {
      const need = (SC().min || {})[s.clv] || 15;
      h += `<div class="card sx-pinfo"><b>Talk about it · Habla del tema</b><span>Answer each question in ${s.clv === "A1" ? "2–3 short sentences" : s.clv === "A2" ? "3–4 sentences" : "a full answer with reasons and examples"}. Try to use the grammar of the unit: ${e((l.gr && l.gr.t) || "")}.</span><em>Responde cada pregunta. Usa la gramática de la unidad.</em></div>`;
      I.t.forEach((q, j) => { h += `<div class="card sx-q"><div class="sx-qt"><span class="sx-n">${j + 1}</span><b>${e(q.t)}</b><button class="st-ib" type="button" data-spv="say" data-t="${e(q.t)}" aria-label="Listen">🔊</button></div>${q.es ? `<div class="sp-es">${e(q.es)}</div>` : ""}${longBox(`c:${s.clv}:${l.id}:t:${j}`, { need, max: 30000 + need * 1500, sec: Math.round(need / 2) })}</div>`; });
      h += phrBox((SC().phrases || {})[s.clv] || []);
    } else {
      const lab = { w: ["Say each key word. · Di cada palabra clave.", "Tap 🔊, then 🎤 and say it."], s: ["Repeat each sentence from the lesson. · Repite cada oración.", "Listen first, then speak at the same speed."], g: ["Grammar in speech · Gramática al hablar: " + ((l.gr && l.gr.t) || ""), (l.gr && l.gr.r) || ""] }[s.ct];
      h += `<div class="card sx-pinfo"><b>${e(lab[0])}</b><span>${e(lab[1])}</span>${s.ct === "g" && l.gr && l.gr.f ? `<em>${e(l.gr.f)}</em>` : ""}</div><div class="sx-list">${I[s.ct].map(it => rowItem(`c:${s.clv}:${l.id}:${s.ct}:${it.t}`, it)).join("")}</div>`;
    }
    const tk = UTABS.findIndex(x => x[0] === s.ct);
    h += `<div class="row st-foot">${tk > 0 ? `<button class="btn" type="button" data-spv="ct" data-v="${UTABS[tk - 1][0]}">← ${UTABS[tk - 1][2]}</button>` : "<span></span>"}${tk < 3 ? `<button class="btn primary" type="button" data-spv="ct" data-v="${UTABS[tk + 1][0]}">${UTABS[tk + 1][2]} ➜</button>` : (L[i + 1] ? `<button class="btn primary" type="button" data-spv="cu" data-v="${L[i + 1].id}">Unit ${i + 2} ➜</button>` : `<button class="btn primary" type="button" data-spv="cback">Finish · Terminar ✓</button>`)}</div>`;
    root.innerHTML = h;
  }

  /* ---------- render ---------- */
  function draw() {
    const root = document.getElementById("v-speak"); if (!root) return;
    const s = SS(); const AL = allowed(); if (!AL.includes(s.lv)) s.lv = AL[0];
    const MS = modesFor(s.lv); if (!MS.includes(s.mode)) s.mode = MS[0];
    if (!sess || sess.lv !== s.lv || sess.mode !== s.mode) newSession(s.lv, s.mode);
    const st = s.stats[s.lv + "|" + s.mode] || { t: 0, o: 0 };
    let h = `<div class="head"><h1>Speaking · Práctica oral</h1><span class="sub">Listen, speak and get instant feedback · Escucha, habla y recibe corrección al instante</span></div>`;
    h += `<div class="sx-mode" role="tablist"><button type="button" role="tab" aria-selected="${s.cv !== "free"}" data-spv="cv" data-v="course">📘 Course · Curso</button><button type="button" role="tab" aria-selected="${s.cv === "free"}" data-spv="cv" data-v="free">🎯 Free practice · Práctica libre</button></div>`;
    if (s.cv !== "free") { if (!REC) h += `<div class="card sp-warn"><b>🎤 Use Chrome, Edge or Safari to speak.</b> · Usa Chrome, Edge o Safari para hablar.</div>`; drawCourse(root, h); return; }
    if (!REC) h += `<div class="card sp-warn"><b>🎤 Your browser can't listen to speech yet.</b><p>Open this page in <b>Chrome</b>, <b>Edge</b> or <b>Safari</b> (iPhone/iPad) to practise speaking. You can still listen to every word. · Abre esta página en Chrome, Edge o Safari para practicar. Aún puedes escuchar todas las palabras.</p></div>`;
    h += `<div class="sp-bar"><div class="sp-chips" role="group" aria-label="Level">${AL.map(l => `<button type="button" class="chip ${l === s.lv ? "on" : ""}" data-spv="lv" data-v="${l}">${e(l === "A0" ? "Level 0" : l)}</button>`).join("")}</div>
      <div class="sp-chips" role="group" aria-label="Practice type">${MS.map(m => { const M = MODES.find(x => x[0] === m); return `<button type="button" class="chip ${m === s.mode ? "on" : ""}" data-spv="mode" data-v="${m}">${M[1]} · ${M[2]}</button>`; }).join("")}</div></div>`;
    h += `<div class="sp-stats"><span>⚡ <b>${s.xp}</b> XP</span><span>✅ <b>${st.o}</b> / ${st.t} correct here · correctas</span>${s.hard.length ? `<button type="button" class="btn sm" data-spv="hard">🔁 Practise my difficult words (${s.hard.length}) · Mis palabras difíciles</button>` : ""}</div>`;
    const P = pool(s.lv, s.mode);
    if (!P.length) { root.innerHTML = h + `<div class="card"><p>No items for this level yet.</p></div>`; return; }
    if (sess.i >= sess.items.length) {
      const ok = sess.res.filter(r => r && r.ok).length;
      h += `<div class="card sp-done"><div class="sp-big">${ok >= sess.items.length * .8 ? "🏆" : ok >= sess.items.length / 2 ? "👏" : "💪"}</div><h2>${ok} / ${sess.items.length}</h2><p>${ok >= sess.items.length * .8 ? "Excellent speaking! · ¡Excelente pronunciación!" : "Keep practising — you're improving! · ¡Sigue practicando, vas mejorando!"}</p>
        <ol class="sp-sum">${sess.items.map((it, i) => `<li class="${sess.res[i] && sess.res[i].ok ? "y" : "n"}">${sess.res[i] && sess.res[i].ok ? "✅" : "🔁"} ${e(it.t)}</li>`).join("")}</ol>
        <button class="btn primary" type="button" data-spv="again">Practise again · Otra vez</button></div>`;
      root.innerHTML = h; return;
    }
    const it = sess.items[sess.i], n = sess.i + 1, N = sess.items.length;
    h += `<div class="card sp-card" data-spbox><div class="sp-top"><span class="sp-lv">${e(LNAME[s.lv] || s.lv)}</span><span class="sub">${n} / ${N}</span></div>
      <div class="sp-prog"><i style="width:${Math.round(100 * (n - 1) / N)}%"></i></div>`;
    if (it.q) {
      h += `<div class="sp-q">${e(it.t)}</div><div class="sp-es">${e(it.es)}</div>
        <div class="sp-row"><button class="btn" type="button" data-spv="say" data-t="${e(it.t)}">🔊 Question · Pregunta</button><button class="btn" type="button" data-spv="model">💡 Model answer · Respuesta modelo</button></div>
        <div class="sp-model" hidden><p>${e(it.model)}</p><button class="btn sm" type="button" data-spv="say" data-t="${e(it.model)}">🔊 Listen · Escuchar</button></div>
        <p class="sp-tip">Answer in 2–3 sentences. Give a reason (because…) and an example. · Responde con 2–3 oraciones, da una razón (because…) y un ejemplo.</p>
        <button class="sp-mic big" type="button" data-spv="long" ${REC ? "" : "disabled"}><span class="sp-ic">🎤</span><span class="sp-lab">Start answering · Empieza a responder</span></button>
        <div class="sp-res"></div>`;
    } else {
      h += `<div class="sp-t ${it.t.length > 40 ? "long" : ""}">${e(it.t)}</div>${it.f ? `<div class="sp-f">🗣️ ${e(it.f)}</div>` : ""}${it.es ? `<div class="sp-es">${e(it.es)}</div>` : ""}
        <div class="sp-row"><button class="btn" type="button" data-spv="say" data-t="${e(it.t)}">🔊 Listen · Escuchar</button><button class="btn" type="button" data-spv="slow" data-t="${e(it.t)}">🐢 Slowly · Despacio</button></div>
        ${micBtn(it.t, "sess", true)}<div class="sp-res"></div>`;
    }
    h += `<div class="sp-row end"><button class="btn" type="button" data-spv="skip">Skip · Saltar</button><button class="btn primary" type="button" data-spv="next" ${sess.res[sess.i] ? "" : "hidden"}>Next · Siguiente ➜</button></div></div>`;
    h += `<details class="card sp-help"><summary>How does it work? · ¿Cómo funciona?</summary><ol><li>Tap 🔊 to hear the model. · Toca 🔊 para escuchar.</li><li>Tap 🎤 and say it clearly, not too fast. · Toca 🎤 y dilo claro, sin prisa.</li><li>Green words were understood ✅, red words need practice 🔁. · Las palabras verdes se entendieron, las rojas necesitas practicarlas.</li><li>The first time, your browser asks for permission to use the microphone: choose <b>Allow</b>. · La primera vez el navegador pide permiso para el micrófono: elige <b>Permitir</b>.</li></ol><p class="sub">The app checks if your words are understood; it is a guide, not an exam score. · La app revisa si se entienden tus palabras; es una guía, no una calificación de examen.</p></details>`;
    root.innerHTML = h;
  }

  async function longAnswer(btn) {
    const box = btn.closest("[data-spbox]"), out = box.querySelector(".sp-res"), lab = btn.querySelector(".sp-lab");
    if (btn.classList.contains("rec")) { stop(); return; }
    btn.classList.add("rec"); lab.textContent = "Stop · Terminar ⏹"; out.innerHTML = `<div class="sp-live">🎙️ <span class="sp-int">Speak now · Habla ahora…</span></div>`;
    const it = sess.items[sess.i];
    try {
      const got = await listen({ long: true, interim: true, max: S.speak.lv === "FCE" ? 60000 : 45000, onInterim: t => { const x = out.querySelector(".sp-int"); if (x) x.textContent = t || "…"; } });
      const j = judgeLong(got.text, got.secs, sess.lv);
      out.innerHTML = `<div class="sp-fb ${j.ok ? "ok" : "mid"}"><b>${j.ok ? "✅ Good answer!" : "🟡 Good start — make it longer."}</b><span>${j.ok ? "¡Buena respuesta!" : "Buen comienzo, hazla más larga."}</span>
        <div class="sp-heard">You said · Dijiste: “${e(got.text)}”</div><ul class="sp-checks">${j.checks.map(c => `<li class="${c[0] ? "y" : "n"}">${c[0] ? "✅" : "➕"} ${e(c[1])} <em>${e(c[2])}</em></li>`).join("")}</ul></div>`;
      sess.res[sess.i] = { ok: j.ok }; record({ ok: j.ok }, it);
    } catch (c) { out.innerHTML = errMsg(c); }
    btn.classList.remove("rec"); lab.textContent = "Answer again · Responder otra vez";
    const nx = box.querySelector('[data-spv="next"]'); if (nx && sess.res[sess.i]) nx.hidden = false;
  }

  document.addEventListener("click", ev => {
    const m = ev.target.closest('[data-sp="mic"]'); if (m && !m.disabled) { micClick(m); return; }
    const b = ev.target.closest("[data-spv]"); if (!b || !b.closest("#v-speak")) return;
    const a = b.dataset.spv, s = SS();
    if (a === "cv") { s.cv = b.dataset.v; store(); draw(); return; }
    if (a === "clv") { s.clv = b.dataset.v; s.cu = ""; store(); draw(); return; }
    if (a === "cu") { stop(); s.cu = b.dataset.v; s.ct = (s.clv === "PET" || s.clv === "FCE") ? "1" : "w"; store(); draw(); window.scrollTo(0, 0); return; }
    if (a === "ct") { stop(); s.ct = b.dataset.v; store(); draw(); window.scrollTo(0, 0); return; }
    if (a === "cback") { stop(); s.cu = ""; store(); draw(); return; }
    if (a === "clong") { courseLong(b); return; }
    if (a === "lv") { s.lv = b.dataset.v; sess = null; store(); draw(); }
    else if (a === "mode") { s.mode = b.dataset.v; sess = null; store(); draw(); }
    else if (a === "say") say(b.dataset.t, "en");
    else if (a === "slow") say(b.dataset.t, "en", true);
    else if (a === "model") { const x = b.closest("[data-spbox]").querySelector(".sp-model"); x.hidden = !x.hidden; }
    else if (a === "long") longAnswer(b);
    else if (a === "next" || a === "skip") { stop(); if (a === "skip" && !sess.res[sess.i]) sess.res[sess.i] = { ok: false, skip: 1 }; sess.i++; draw(); window.scrollTo(0, 0); }
    else if (a === "again") { sess = null; draw(); }
    else if (a === "hard") { sess = { lv: s.lv, mode: s.mode, items: s.hard.slice(0, 10), i: 0, res: [] }; draw(); }
  });
  document.addEventListener("speak:result", ev => {
    const k = ev.detail.key || "";
    if (/^c:/.test(k) && ev.detail.r) { markDone(k, ev.detail.r.ok); if (ev.detail.r.ok) { const row = ev.target.closest(".sx-row"); if (row) { row.classList.add("done"); const o = row.querySelector(".sx-ok"); if (o) o.textContent = "✅"; } } refreshBars(); return; }
    if (!ev.target.closest || !ev.target.closest("#v-speak") || ev.detail.key !== "sess" || !sess) return;
    const r = ev.detail.r; if (!r) return;
    const prev = sess.res[sess.i]; sess.res[sess.i] = { ok: r.ok || (prev && prev.ok) };
    record(r, sess.items[sess.i]);
    const nx = document.querySelector('#v-speak [data-spv="next"]'); if (nx) nx.hidden = false;
  });

  const css = document.createElement("style");
  css.textContent = `
.sp-bar{display:flex;flex-direction:column;gap:8px;margin:10px 0}.sp-chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{border:1.5px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:6px 12px;font-family:inherit;font-weight:600;font-size:.85rem;cursor:pointer}.chip.on{background:var(--accent);border-color:var(--accent);color:#fff}
.sp-stats{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:6px 0 12px;color:var(--muted);font-size:.9rem}
.sp-lv{display:inline-block;background:#2453c9;color:#fff;font-weight:800;font-size:.75rem;border-radius:999px;padding:2px 10px}.sp-card{text-align:center;padding:22px 18px}.sp-top{display:flex;justify-content:space-between;align-items:center}
.sp-prog{height:6px;background:var(--line);border-radius:4px;margin:10px 0 18px;overflow:hidden}.sp-prog i{display:block;height:100%;background:var(--accent);transition:width .3s}
.sp-t{font-size:2.1rem;font-weight:800;line-height:1.2;margin:6px 0;word-break:break-word}.sp-t.long{font-size:1.35rem}
.sp-q{font-size:1.3rem;font-weight:700;line-height:1.35;margin:6px 0}
.sp-f{font-size:1.05rem;color:#7a4b00;background:#fff6dc;display:inline-block;border-radius:8px;padding:3px 10px;margin:4px 0}
.sp-es{color:#5b4a8a;font-style:italic;margin:6px 0 10px}
.sp-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0}.sp-row.end{justify-content:space-between;margin-top:16px}
.sp-mic{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;background:#e8eefc;color:#1f3f8f;padding:8px 12px;font-family:inherit;font-weight:700;font-size:.95rem;cursor:pointer}
.sp-mic.big{background:linear-gradient(135deg,#2453c9,#6a3fd1);color:#fff;padding:14px 26px;font-size:1.05rem;margin:8px auto;box-shadow:0 6px 18px rgba(36,83,201,.3)}
.sp-mic .sp-ic{font-size:1.3em}.sp-mic.rec{background:#d92d20;color:#fff;animation:sppulse 1s infinite}.sp-mic:disabled{opacity:.45;cursor:not-allowed}
@keyframes sppulse{0%{box-shadow:0 0 0 0 rgba(217,45,32,.5)}70%{box-shadow:0 0 0 14px rgba(217,45,32,0)}100%{box-shadow:0 0 0 0 rgba(217,45,32,0)}}
.sp-live{color:#d92d20;font-weight:700;margin:10px 0}
.sp-fb{border-radius:12px;padding:12px 14px;margin:12px auto 0;text-align:left;max-width:560px}.sp-fb b{display:block;font-size:1.05rem}.sp-fb>span{display:block;color:var(--muted);font-size:.92rem}
.sp-fb.ok{background:#e7f8ee;border:1.5px solid #34a36b}.sp-fb.mid{background:#fff6dc;border:1.5px solid #e0a800}.sp-fb.bad{background:#fdecec;border:1.5px solid #e35d5d}
.sp-words{font-size:1.2rem;font-weight:700;margin:8px 0}.sp-words .y{color:#15803d}.sp-words .n{color:#d92d20;text-decoration:underline wavy}
.sp-heard{font-size:.86rem;color:var(--muted)}.sp-heard em{font-style:normal;font-weight:700;margin-left:6px}
.sp-checks{list-style:none;padding:0;margin:8px 0 0}.sp-checks li{margin:4px 0}.sp-checks em{display:block;color:var(--muted);font-size:.85rem;margin-left:24px}
.sp-model{background:#f4f6fb;border-radius:10px;padding:10px 12px;margin:8px auto;max-width:560px;text-align:left}
.sp-tip{font-size:.88rem;color:var(--muted)}.sp-warn{background:#fff6dc;border-color:#e0a800}
.sp-done{text-align:center}.sp-big{font-size:3rem}.sp-sum{text-align:left;max-width:520px;margin:10px auto;padding-left:20px}.sp-sum li{margin:3px 0}
.sx-mode{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0 12px}.sx-mode button{border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:10px;font-family:inherit;font-weight:700;font-size:.95rem;color:inherit;cursor:pointer}.sx-mode button[aria-selected=true]{border-color:#2453c9;background:#eef3ff;color:#1f3f8f}
.sx-lv{margin-bottom:10px}.sx-intro p{margin:6px 0 0;color:var(--muted)}
.sx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;margin:10px 0}
.sx-tile{border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:12px;text-align:left;font-family:inherit;color:inherit;cursor:pointer;display:flex;flex-direction:column;gap:4px}.sx-tile:hover{border-color:#2453c9}.sx-tile .sp-prog{margin:6px 0 2px}
.sx-tn{font-size:.75rem;font-weight:800;color:#2453c9;text-transform:uppercase;letter-spacing:.05em}
.sx-pb{display:inline-block;font-size:.72rem;border:1px solid var(--line);border-radius:999px;padding:1px 7px;margin:2px 3px 0 0;color:var(--muted)}.sx-pb.ok{background:#e7f8ee;border-color:#34a36b;color:#15803d}
.sx-uh{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:6px 0}.sx-uh>div:nth-child(2){flex:1;min-width:180px}.sx-uh h2{margin:4px 0 0}
.sx-pp{min-width:150px}.sx-pp .sp-prog{margin:0 0 3px}.st-tabs.sx-tabs{grid-template-columns:repeat(4,1fr)}
.sx-pinfo{display:flex;flex-direction:column;gap:3px;background:#eef6ff;border-color:#bcd3ff}.sx-pinfo span{font-size:.92rem}.sx-pinfo em{color:var(--muted);font-size:.85rem}
.sx-q{display:flex;flex-direction:column;gap:6px}.sx-qt{display:flex;align-items:center;gap:8px}.sx-qt b{flex:1;font-size:1.08rem}
.sx-n{background:#2453c9;color:#fff;border-radius:999px;min-width:26px;height:26px;display:grid;place-items:center;font-weight:800;font-size:.85rem}
.sx-long{display:flex;flex-direction:column;align-items:flex-start;gap:4px}.sx-long .sp-mic.big{margin:4px 0;padding:10px 20px;font-size:.95rem}.sx-long .sp-res{width:100%}.sx-ok{color:#15803d;font-weight:700;font-size:.88rem}
.sx-phs{display:grid;grid-template-columns:1fr 1fr;gap:8px}.sx-phs.one{grid-template-columns:minmax(0,520px)}.sx-ph{margin:0}.sx-ph img{width:100%;border-radius:12px;aspect-ratio:3/2;object-fit:cover;display:block}.sx-phd{background:#f2f4f8;border-radius:12px;padding:20px;text-align:center;color:var(--muted)}
.sx-top{background:#fff6dc;border-radius:10px;padding:8px 12px;font-weight:700;text-align:center}
.sx-f{border-top:1px dashed var(--line);padding-top:8px;margin-top:4px}
.sx-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:8px 0}.sx-c{grid-column:1/-1;background:linear-gradient(135deg,#2453c9,#6a3fd1);color:#fff;border-radius:14px;padding:12px;text-align:center;font-weight:800;font-size:1.05rem}.sx-o{border:2px solid #bcd3ff;border-radius:12px;padding:10px;text-align:center;font-weight:600;background:#fff}
.sx-phr{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:10px 14px;margin:10px 0}.sx-phr summary{font-weight:700;cursor:pointer}.sx-phr ul{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:4px}.sx-phr li{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.sx-phr em{color:var(--muted);font-size:.86rem}.st-ib.sm{width:30px;height:30px;font-size:.9rem}
.sx-list{display:grid;gap:8px}.sx-row{display:grid;grid-template-columns:1fr auto auto auto 24px;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:8px 10px}.sx-row.done{border-color:#34a36b;background:#f3fbf6}.sx-row .sp-res{grid-column:1/-1}.sx-row .sp-res:empty{display:none}.sx-rt{display:flex;flex-direction:column}.sx-rt span{font-size:.85rem;color:var(--muted)}
.st-tabs{display:grid;gap:6px;margin:12px 0}.st-tabs button{position:relative;border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:8px 4px;font-family:inherit;font-weight:700;font-size:.92rem;color:inherit;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px}.st-tabs button span{font-size:1.3rem}.st-tabs button small{font-weight:500;color:var(--muted);font-size:.72rem}.st-tabs button[aria-selected=true]{border-color:#2453c9;background:#eef3ff}.st-foot{justify-content:space-between;margin-top:14px}
@media (max-width:760px){.sx-phs{grid-template-columns:1fr}.sx-row{grid-template-columns:1fr auto auto 22px}.sx-row [data-spv=slow]{display:none}}
.sp-help summary{cursor:pointer;font-weight:700}.sp-help li{margin:4px 0}.btn.sm{padding:4px 10px;font-size:.82rem}
@media (max-width:760px){.tabs{grid-auto-flow:column;grid-template-columns:none!important;grid-auto-columns:minmax(62px,1fr);overflow-x:auto;scrollbar-width:none}.tabs::-webkit-scrollbar{display:none}.sp-t{font-size:1.7rem}}`;
  document.head.appendChild(css);

  if (!VIEWS.some(x => x[0] === "speak")) {
    const i = VIEWS.findIndex(x => x[0] === "writing");
    VIEWS.splice(i < 0 ? VIEWS.length : i + 1, 0, ["speak", "Speaking", '<path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3M9 21h6"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-speak")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-speak"; sec.setAttribute("aria-label", "Speaking practice"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "speak") draw(); else stop(); }; try { render(); } catch (x) { } }
  }
  window.SPEAK.draw = draw;
  window.SPEAK.allowed = allowed;
  window.SPEAK.open = (lv, mode) => { const s = SS(); if (mode === "course" || /^t\d+$|^l|^[a-c]\d-/.test(mode || "")) { s.cv = "course"; s.clv = lv; s.cu = mode === "course" ? "" : mode.replace(/^t/, ""); s.ct = (lv === "PET" || lv === "FCE") ? "1" : "w"; } else { s.cv = "free"; if (lv) s.lv = lv; if (mode) s.mode = mode; } sess = null; store(); location.hash = "speak"; setTimeout(draw, 30); };
})();

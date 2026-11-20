/* Teacher Dario · Teacher tools for B1 Preliminary (PET) and B2 First (FCE):
   worksheets, lesson plans, Reading (& Use of English) papers and full mock exams built from the 10 practice tests of each course. */
window.TOOLS = window.TOOLS || {};
(function () {
  const e = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const b = t => e(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const L = i => "ABCDEFGH"[i];
  const tests = lv => ((lv === "PET" ? window.PET : window.FCE) || {}).tests || [];
  const NAME = { PET: "B1 Preliminary (PET)", FCE: "B2 First (FCE)" };
  const school = () => (window.S && S.tools && S.tools.school) || "Teacher Dario · English";
  const keyOn = () => !(window.S && S.tools && S.tools.key === false);
  let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const shuffle = a => { const c = a.slice(); for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c; };
  const head = (title, sub) => `<header class="pd-head"><div><div class="pd-school">${e(school())}</div><h1>${e(title)}</h1><div class="pd-sub">${e(sub || "")}</div></div><div class="pd-lines"><span>Name · Nombre: ____________________________</span><span>Date · Fecha: ______________</span><span>Score · Calificación: _______</span></div></header>`;
  const sec = (n, title, inst, body, pts) => `<section class="pd-sec"><h2><span>${e(n)}</span> ${e(title)}${pts ? `<em>${pts} pts</em>` : ""}</h2>${inst ? `<p class="pd-inst">${e(inst)}</p>` : ""}${body}</section>`;
  const keyBlock = items => keyOn() && items.length ? `<section class="pd-key"><h2>Answer key · Respuestas</h2>${items.map(x => `<p><b>${e(x[0])}</b> ${e(x[1])}</p>`).join("")}</section>` : "";
  const gapText = x => e(x).replace(/\[(\d+)\]/g, "<b>($1)</b> ________").replace(/\n/g, "<br>");
  const opts = (o, letters) => `<div class="pd-opts">${o.map((x, i) => `<span>${letters ? L(i) : "abcd"[i]}) ${e(x)}</span>`).join("")}</div>`;
  const writeLines = n => `<div class="pd-write">${Array.from({ length: n }, () => "<div></div>").join("")}</div>`;
  const firstNum = x => { const m = /\[(\d+)\]/.exec(x || ""); return m ? +m[1] : 1; };
  const script = s => (s || []).map(r => `<p><b>${e(r[0])}:</b> ${e(r[1])}</p>`).join("");

  /* ---------- part renderers: return [html, keyItems] ---------- */
  const R = {
    mcCloze(p, title) { const n0 = firstNum(p.x); return [`<p class="pd-read"><b>${e(p.t || "")}</b><br>${gapText(p.x)}</p><ol class="pd-q" start="${n0}">${p.o.map(o => `<li>${opts(o, true)}</li>`).join("")}</ol>`, [[title, p.a.split("").map((c, i) => `${n0 + i}-${c}`).join(" · ")]]]; },
    openCloze(p, title) { const n0 = firstNum(p.x); return [`<p class="pd-read"><b>${e(p.t || "")}</b><br>${gapText(p.x)}</p>`, [[title, p.a.map((a, i) => `${n0 + i}-${a.join(" / ")}`).join(" · ")]]]; },
    wordForm(p, title) { const n0 = firstNum(p.x); return [`<div class="pd-tbl-wrap"><p class="pd-read"><b>${e(p.t || "")}</b><br>${gapText(p.x)}</p><table class="pd-tbl"><tr>${p.w.map((w, i) => `<td><b>(${n0 + i})</b> ${e(w)}</td>`).join("")}</tr></table></div>`, [[title, p.a.map((a, i) => `${n0 + i}-${a.join(" / ")}`).join(" · ")]]]; },
    kwt(p, title, n0) { return [`<ol class="pd-q" start="${n0}">${p.map(r => `<li>${e(r[0])}<br><b>${e(r[1])}</b><br>${e(r[2]).replace("____", "_______________________")}</li>`).join("")}</ol>`, [[title, p.map((r, i) => `${n0 + i}- ${r[3][0]} | ${r[4][0]}`).join(" · ")]]]; },
    longMC(p, title, n0) { return [`<p class="pd-read"><b>${e(p.t || "")}</b>${p.k ? ` <i>(${e(p.k)})</i>` : ""}<br>${p.x.map(e).join("<br><br>")}</p><ol class="pd-q" start="${n0}">${p.q.map(q => `<li>${e(q[0])}${opts(q[1], true)}</li>`).join("")}</ol>`, [[title, p.q.map((q, i) => `${n0 + i}-${q[2]}`).join(" · ")]]]; },
    gapped(p, title) { const n0 = firstNum(p.x.join(" ")); return [`<p class="pd-read"><b>${e(p.t || "")}</b><br>${p.x.map(gapText).join("<br><br>")}</p><ol class="pd-q" type="A">${p.o.map(o => `<li>${e(o)}</li>`).join("")}</ol>`, [[title, p.a.split("").map((c, i) => `${n0 + i}-${c}`).join(" · ")]]]; },
    matchPeople(p, title, n0) { return [`<p class="pd-inst">${e(p.w || "")}</p><ol class="pd-q" start="${n0}">${p.p.map(x => `<li><b>${e(x[0])}</b>: ${e(x[1])}</li>`).join("")}</ol><ol class="pd-q" type="A">${p.x.map(x => `<li><b>${e(x[0])}</b> — ${e(x[1])}</li>`).join("")}</ol>`, [[title, p.a.split("").map((c, i) => `${n0 + i}-${c}`).join(" · ")]]]; },
    multiMatch(p, title, n0) { return [`<p class="pd-read"><b>${e(p.t || "")}</b><br>${p.s.map((s, i) => `<b>${L(i)} · ${e(s[0])}</b><br>${e(s[1])}`).join("<br><br>")}</p><p class="pd-inst">Which person…</p><ol class="pd-q" start="${n0}">${p.q.map(q => `<li>${e(q[0])} ____</li>`).join("")}</ol>`, [[title, p.q.map((q, i) => `${n0 + i}-${q[1]}`).join(" · ")]]]; },
    shortTexts(p, title, n0) { return [`<ol class="pd-q" start="${n0}">${p.map(r => `<li><div class="pd-read">${e(r[0]).replace(/\n/g, "<br>")}</div>${opts(r[2], true)}</li>`).join("")}</ol>`, [[title, p.map((r, i) => `${n0 + i}-${r[3]}`).join(" · ")]]]; }
  };
  function readingPaper(lv, t) {
    const P = [], K = [];
    const add = (n, title, inst, r, pts) => { P.push(sec(n, title, inst, r[0], pts)); K.push(...r[1]); };
    if (lv === "PET") {
      add("1", "Reading Part 1", "For each question, choose the correct answer.", R.shortTexts(t.r1, "Part 1", 1), 5);
      add("2", "Reading Part 2", `The people below all want ${t.r2.k}. Decide which text would be the most suitable for each person.`, R.matchPeople(t.r2, "Part 2", 6), 5);
      add("3", "Reading Part 3", "Read the text and choose the correct answer.", R.longMC(t.r3, "Part 3", 11), 5);
      add("4", "Reading Part 4", "Five sentences have been removed from the text. Choose the correct sentence for each gap. There are three extra sentences.", R.gapped(t.r4, "Part 4"), 5);
      add("5", "Reading Part 5", "Choose the correct word for each gap.", R.mcCloze(t.r5, "Part 5"), 6);
      add("6", "Reading Part 6", "Write ONE word for each gap.", R.openCloze(t.r6, "Part 6"), 6);
    } else {
      add("1", "Use of English Part 1", "Read the text and decide which answer best fits each gap.", R.mcCloze(t.r1, "Part 1"), 8);
      add("2", "Use of English Part 2", "Think of the word which best fits each gap. Use only ONE word in each gap.", R.openCloze(t.r2, "Part 2"), 8);
      add("3", "Use of English Part 3", "Use the word given in capitals to form a word that fits in the gap.", R.wordForm(t.r3, "Part 3"), 8);
      add("4", "Use of English Part 4", "Complete the second sentence so that it has a similar meaning to the first. Use the word given. Do not change it. Use between two and five words.", R.kwt(t.r4, "Part 4", 25), 12);
      add("5", "Reading Part 5", "Read the text and choose the answer which fits best.", R.longMC(t.r5, "Part 5", 31), 12);
      add("6", "Reading Part 6", "Six sentences have been removed from the article. Choose from the sentences the one which fits each gap. There is one extra sentence.", R.gapped(t.r6, "Part 6"), 12);
      add("7", "Reading Part 7", "Read the article and answer the questions.", R.multiMatch(t.r7, "Part 7", 43), 10);
    }
    return [P.join(""), K];
  }
  function writingPaper(lv, t) {
    if (lv === "PET") return sec("W", "Writing", "Answer Part 1 and ONE question from Part 2. Write about 100 words for each.",
      `<p><b>Part 1 · Email</b> — Read this email from ${e(t.w1.from)} and the notes you have made.</p><div class="pd-read">${t.w1.body.map(e).join("<br>")}</div><p>Notes:</p><ol class="pd-q">${t.w1.notes.map(n => `<li>${e(n[0])} → <b>${e(n[1])}</b></li>`).join("")}</ol>${writeLines(8)}
       <p><b>Part 2</b> — Choose ONE.</p><ol class="pd-q" start="2">${t.w2.map(w => `<li><b>${e(w[0][0].toUpperCase() + w[0].slice(1))}</b>: ${e(w[1])}</li>`).join("")}</ol>${writeLines(8)}`);
    return sec("W", "Writing", "Part 1 is compulsory. Choose ONE task in Part 2. Write 140–190 words for each.",
      `<p><b>Part 1 · Essay</b> — In your English class you have been talking about the topic below. Write an essay using all the notes and give reasons for your point of view.</p><div class="pd-read"><b>${e(t.w1.q)}</b><br>Notes — write about:<br>1. ${e(t.w1.notes[0])}<br>2. ${e(t.w1.notes[1])}<br>3. ……………… (your own idea)</div>${writeLines(10)}
       <p><b>Part 2</b> — Choose ONE.</p><ol class="pd-q" start="2">${t.w2.map(w => `<li><b>${e(w[0][0].toUpperCase() + w[0].slice(1))}</b>: ${e(w[1])}</li>`).join("")}</ol>${writeLines(10)}`);
  }
  function listeningPaper(lv, t) {
    const P = [], K = [], T = [];
    if (lv === "PET") {
      P.push(sec("L1", "Listening Part 1", "For each question, choose the correct answer.", `<ol class="pd-q">${t.l1.map(q => `<li>${e(q[0])}${opts(q[2], true)}</li>`).join("")}</ol>`)); K.push(["L1", t.l1.map((q, i) => `${i + 1}-${q[3]}`).join(" · ")]); T.push(["Part 1", t.l1.map((q, i) => `<p><i>${i + 1}.</i></p>` + script(q[1])).join("")]);
      P.push(sec("L2", "Listening Part 2", "For each question, choose the correct answer.", `<ol class="pd-q" start="8">${t.l2.map(q => `<li>${e(q[0])}${opts(q[2], true)}</li>`).join("")}</ol>`)); K.push(["L2", t.l2.map((q, i) => `${8 + i}-${q[3]}`).join(" · ")]); T.push(["Part 2", t.l2.map((q, i) => `<p><i>${8 + i}.</i></p>` + script(q[1])).join("")]);
      P.push(sec("L3", "Listening Part 3", `You will hear ${t.l3.k}. For each question, write the missing information.`, `<p><b>${e(t.l3.t)}</b></p><ol class="pd-q" start="14">${t.l3.q.map(q => `<li>${e(q[0]).replace("___", "_______________")}</li>`).join("")}</ol>`)); K.push(["L3", t.l3.q.map((q, i) => `${14 + i}-${q[1][0]}`).join(" · ")]); T.push(["Part 3", script(t.l3.s)]);
      P.push(sec("L4", "Listening Part 4", `You will hear ${t.l4.k}. For each question, choose the correct answer.`, `<ol class="pd-q" start="20">${t.l4.q.map(q => `<li>${e(q[0])}${opts(q[1], true)}</li>`).join("")}</ol>`)); K.push(["L4", t.l4.q.map((q, i) => `${20 + i}-${q[2]}`).join(" · ")]); T.push(["Part 4", script(t.l4.s)]);
    } else {
      P.push(sec("L1", "Listening Part 1", "You will hear people talking in eight different situations. Choose the best answer.", `<ol class="pd-q">${t.l1.map(q => `<li>${e(q[0])}${opts(q[2], true)}</li>`).join("")}</ol>`)); K.push(["L1", t.l1.map((q, i) => `${i + 1}-${q[3]}`).join(" · ")]); T.push(["Part 1", t.l1.map((q, i) => `<p><i>${i + 1}.</i></p>` + script(q[1])).join("")]);
      P.push(sec("L2", "Listening Part 2", `You will hear ${t.l2.k}. Complete the sentences with a word or short phrase.`, `<p><b>${e(t.l2.t)}</b></p><ol class="pd-q" start="9">${t.l2.q.map(q => `<li>${e(q[0]).replace("___", "_______________")}</li>`).join("")}</ol>`)); K.push(["L2", t.l2.q.map((q, i) => `${9 + i}-${q[1][0]}`).join(" · ")]); T.push(["Part 2", script(t.l2.s)]);
      P.push(sec("L3", "Listening Part 3", `You will hear five people talking about ${t.l3.k}. Choose from the list (A–H) ${t.l3.w}. There are three extra letters.`, `<ol class="pd-q" type="A">${t.l3.o.map(o => `<li>${e(o)}</li>`).join("")}</ol><p>Speaker 1 ___ &nbsp; Speaker 2 ___ &nbsp; Speaker 3 ___ &nbsp; Speaker 4 ___ &nbsp; Speaker 5 ___</p>`)); K.push(["L3", t.l3.a.split("").map((c, i) => `${19 + i}-${c}`).join(" · ")]); T.push(["Part 3", t.l3.s.map((s, i) => `<p><i>Speaker ${i + 1}</i></p>` + script(s)).join("")]);
      P.push(sec("L4", "Listening Part 4", `You will hear ${t.l4.k}. Choose the best answer.`, `<ol class="pd-q" start="24">${t.l4.q.map(q => `<li>${e(q[0])}${opts(q[1], true)}</li>`).join("")}</ol>`)); K.push(["L4", t.l4.q.map((q, i) => `${24 + i}-${q[2]}`).join(" · ")]); T.push(["Part 4", script(t.l4.s)]);
    }
    const tr = `<section class="pd-key"><h2>Listening transcripts (teacher) · Transcripciones para el maestro</h2><p class="pd-small">Read the scripts aloud twice, or use the audio in the dashboard. · Lee los textos dos veces en voz alta o usa el audio del dashboard.</p>${T.map(x => `<h3>${e(x[0])}</h3>${x[1]}`).join("")}</section>`;
    return [P.join(""), K, tr];
  }
  function photoImg(lv, t, slot) { const P = lv === "PET" ? (window.PET_PHOTOS || {})[`p${t.n}${slot}`] : (window.FCE_PHOTOS || {})[`t${t.n}${slot}`]; return P ? `<img src="${P.src}" alt="" style="width:100%;max-height:220px;object-fit:cover;border-radius:8px">` : ""; }
  function speakingCard(lv, t) {
    const s3 = t.s3 || {};
    let h = `<p><b>Part 1 · Interview</b></p><ol class="pd-q">${t.s1.map(q => `<li>${e(q)}</li>`).join("")}</ol><p><b>Part 2 · ${lv === "PET" ? "Photo description" : "Long turn"}</b></p>`;
    (t.s2 || []).forEach((x, i) => {
      h += `<p>${e(x.task)}${x.top ? ` <b>${e(x.top)}</b>` : ""}</p><div class="pd-match" style="grid-template-columns:${lv === "PET" ? "1fr" : "1fr 1fr"}">${lv === "PET" ? photoImg(lv, t, "s" + (i + 1)) : photoImg(lv, t, "s" + i + "1") + photoImg(lv, t, "s" + i + "2")}</div>${x.f ? `<p><i>${e(x.f)}</i></p>` : ""}`;
    });
    h += `<p><b>Part 3 · Collaborative task</b></p><p>${e(s3.q || "")}</p><div class="pd-bank"><span><b>${e(lv === "PET" ? (s3.c || "") : (s3.q || ""))}</b></span>${(s3.p || []).map(o => `<span>${e(o)}</span>`).join("")}</div>${lv === "FCE" && s3.d ? `<p><i>${e(s3.d)}</i></p>` : ""}<p><b>Part 4 · Discussion</b></p><ol class="pd-q">${t.s4.map(q => `<li>${e(q)}</li>`).join("")}</ol>`;
    return sec("S", "Speaking · Examiner's card", lv === "PET" ? "12–17 minutes, in pairs." : "14 minutes, in pairs.", h);
  }
  /* ---------- worksheet ---------- */
  function worksheet(lv, t) {
    seed = (t.n * 977 + Date.now()) % 233280 || 5;
    const X = (window.BOOK && BOOK.examExtra) || {};
    let h = head(`${NAME[lv]} · Worksheet · Test ${t.n}`, `${t.theme} · Hoja de trabajo`), K = [];
    const warm = sec("A", "Warm-up · Speaking", "Ask and answer with a partner. Give a reason or an example.", `<ol class="pd-q">${t.s1.slice(0, 4).map(q => `<li>${e(q)}</li>`).join("")}</ol>`);
    h += warm;
    let r;
    if (lv === "PET") {
      r = R.mcCloze(t.r5, "B"); h += sec("B", "Vocabulary in context", "Choose the correct word for each gap.", r[0], 6); K.push(...r[1]);
      r = R.openCloze(t.r6, "C"); h += sec("C", "Grammar words", "Write ONE word in each gap.", r[0], 6); K.push(...r[1]);
    } else {
      r = R.mcCloze(t.r1, "B"); h += sec("B", "Collocations and vocabulary", "Choose the answer which best fits each gap.", r[0], 8); K.push(...r[1]);
      r = R.wordForm(t.r3, "C"); h += sec("C", "Word formation", "Use the word in capitals to form a word that fits the gap.", r[0], 8); K.push(...r[1]);
      r = R.kwt(t.r4, "D", 1); h += sec("D", "Key word transformations", "Use the word given. Do not change it. Use 2–5 words.", r[0], 12); K.push(...r[1]);
    }
    const pvs = shuffle((lv === "PET" ? X.PET_PV : X.FCE_PV2) || []).slice(0, 8);
    if (pvs.length) {
      h += sec(lv === "PET" ? "D" : "E", "Phrasal verbs", "Complete each sentence with a phrasal verb from the box in the correct form.", `<div class="pd-bank">${shuffle(pvs).map(p => `<span>${e(p[0])}</span>`).join("")}</div><ol class="pd-q">${pvs.map(p => `<li>${e(p[3].split(" · ")[0]).replace(/\*\*(.+?)\*\*/g, "_______________")}</li>`).join("")}</ol>`, 8);
      K.push(["Phrasal verbs", pvs.map((p, i) => `${i + 1}-${(/\*\*(.+?)\*\*/.exec(p[3]) || [, p[0]])[1]}`).join(" · ")]);
    }
    const cols = shuffle((lv === "PET" ? X.PET_EX : X.FCE_COL) || []).slice(0, 8);
    if (cols.length) {
      h += sec(lv === "PET" ? "E" : "F", "Expressions and collocations", "Match the expressions (1–8) with the meanings (a–h).", (() => { const m = shuffle(cols.map(c => c[1])); K.push(["Expressions", cols.map((c, i) => `${i + 1}-${"abcdefgh"[m.indexOf(c[1])]}`).join(" · ")]); return `<div class="pd-match"><ol>${cols.map(c => `<li><b>${e(c[0])}</b> ____</li>`).join("")}</ol><ol type="a">${m.map(x => `<li>${e(x)}</li>`).join("")}</ol></div>`; })(), 8);
    }
    const s3 = t.s3 || {};
    h += sec(lv === "PET" ? "F" : "G", "Speaking Part 3 practice", s3.q || "", `<div class="pd-bank"><span><b>${e(lv === "PET" ? (s3.c || "") : (s3.q || ""))}</b></span>${(s3.p || []).map(o => `<span>${e(o)}</span>`).join("")}</div><p class="pd-small">Useful language: What do you think about…? · That's a good idea, but… · I agree / I'm not sure… · Let's decide…</p>`);
    return h + keyBlock(K);
  }
  /* ---------- lesson plan ---------- */
  function lessonPlan(lv, t) {
    const s3 = t.s3 || {}, rd = lv === "PET" ? t.r3 : t.r5, w = t.w2[0];
    const rows = [
      ["0–5", "Warm-up", `Ask Speaking Part 1 questions: ${t.s1.slice(0, 3).join(" · ")}`, "Pairs, then whole class"],
      ["5–15", "Vocabulary", `Pre-teach topic words from the Part 3 task: ${(s3.p || []).join(", ")}. Students say one advantage of each.`, "Board + pairs"],
      ["15–35", "Reading", `“${rd.t}” (${lv === "PET" ? "Reading Part 3" : "Reading Part 5"}). Students skim for gist (2 min), then answer the ${rd.q.length} questions and underline evidence.`, "Individual, then check in pairs"],
      ["35–50", "Speaking", `${lv === "PET" ? "Part 3" : "Part 3"} task: ${s3.q || ""} Pairs discuss every option, then decide. Teacher monitors and notes language.`, "Pairs · 3 min per pair"],
      ["50–55", "Feedback", "Board the best phrases you heard and two common mistakes to correct.", "Whole class"],
      ["55–60", "Homework", `Writing: ${w[0]} — ${w[1].slice(0, 160)}${w[1].length > 160 ? "…" : ""}`, lv === "PET" ? "About 100 words" : "140–190 words"]
    ];
    return head(`${NAME[lv]} · Lesson plan · Test ${t.n}`, `${t.theme} · 60 minutes · Plan de clase`) +
      sec("1", "Aims · Objetivos", "", `<ul><li>Practise ${lv === "PET" ? "B1 Preliminary" : "B2 First"} reading and speaking skills on the topic “${e(t.theme)}”.</li><li>Learn and use topic vocabulary and functional language for discussion.</li><li>Prepare for the writing task at home.</li></ul>`) +
      sec("2", "Procedure · Procedimiento", "", `<table class="pd-tbl"><tr><th>Min</th><th>Stage</th><th>Activity</th><th>Interaction</th></tr>${rows.map(r => `<tr><td>${e(r[0])}</td><td><b>${e(r[1])}</b></td><td>${e(r[2])}</td><td>${e(r[3])}</td></tr>`).join("")}</table>`) +
      sec("3", "Reading answers · Respuestas", "", `<p>${rd.q.map((q, i) => `${i + 1}-${q[2]}`).join(" · ")}</p>`) +
      sec("4", "Extension · Extensión", "", `<ol class="pd-q">${t.s4.map(q => `<li>${e(q)}</li>`).join("")}</ol><p class="pd-small">Speaking Part 4 questions for early finishers or the next class.</p>`);
  }
  function paper(lv, list) { return list.map(t => { const r = readingPaper(lv, t); return head(`${NAME[lv]} · ${lv === "PET" ? "Reading paper" : "Reading and Use of English paper"} · Test ${t.n}`, `${t.theme} · ${lv === "PET" ? "45 minutes" : "1 hour 15 minutes"}`) + r[0] + keyBlock(r[1]); }).join('<div class="pd-break"></div>'); }
  function mock(lv, list) {
    return list.map(t => {
      const r = readingPaper(lv, t), l = listeningPaper(lv, t);
      return head(`${NAME[lv]} · Full mock exam · Test ${t.n}`, `${t.theme} · Reading${lv === "FCE" ? " & Use of English" : ""} · Writing · Listening · Speaking`) +
        r[0] + '<div class="pd-break"></div>' + writingPaper(lv, t) + '<div class="pd-break"></div>' + l[0] + '<div class="pd-break"></div>' + speakingCard(lv, t) + keyBlock(r[1].concat(l[1])) + l[2];
    }).join('<div class="pd-break"></div>');
  }
  TOOLS.EX = {
    isEx: lv => lv === "PET" || lv === "FCE",
    units: lv => tests(lv).map(t => ({ id: lv + "-t" + t.n, n: t.n, title: "Test " + t.n + " · " + t.theme, gr: { t: "Practice test" } })),
    generate(type, lv, ids) {
      const T = tests(lv), list = ids.map(id => T.find(t => lv + "-t" + t.n === id)).filter(Boolean);
      if (type === "ws") return [list.map(t => worksheet(lv, t)).join('<div class="pd-break"></div>'), `Worksheet ${lv}`];
      if (type === "lp") return [list.map(t => lessonPlan(lv, t)).join('<div class="pd-break"></div>'), `Lesson plan ${lv}`];
      if (type === "ue") return [paper(lv, list), `${lv} Reading paper`];
      if (type === "le") return [mock(lv, list), `${lv} Mock exam`];
      return ["", ""];
    }
  };
})();

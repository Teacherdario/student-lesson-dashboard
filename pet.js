/* B1 Preliminary (PET) preparation module. Created by Teacher Dario.
   Uses the shared helpers from the B2 First module (app.js): timers, browser voices, dictation and text analysis. */
"use strict";
window.PET = window.PET || { tests: [] };
function PET_T(t) {
  /* spread the correct answers evenly over A, B, C (and D) */
  const L = "ABCD"; let seed = t.n * 7919 + 13;
  const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return Math.floor(seed / 2147483648 * n); };
  const fix = (opts, ans, set) => { const n = opts.length, a = L.indexOf(ans), want = rnd(n); if (a < 0 || a === want) return; const o = opts.slice(); const right = o.splice(a, 1)[0]; o.splice(want, 0, right); opts.splice(0, n, ...o); set(L[want]); };
  try {
    t.r1.forEach(x => fix(x[2], x[3], v => x[3] = v));
    t.r3.q.forEach(q => fix(q[1], q[2], v => q[2] = v));
    t.l1.forEach(x => fix(x[2], x[3], v => x[3] = v));
    t.l2.forEach(x => fix(x[2], x[3], v => x[3] = v));
    t.l4.q.forEach(q => fix(q[1], q[2], v => q[2] = v));
  } catch (e) { }
  PET.tests.push(t); PET.tests.sort((a, b) => a.n - b.n);
}

(function () {
  if (typeof VIEWS === "undefined" || typeof fTimer !== "function") return;
  const css = `.pnote{font-family:var(--read);font-size:1.08rem;line-height:1.6;border:2px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--surface);white-space:pre-line;max-width:60ch}
.pnote.sign{text-align:center;font-family:var(--display);font-weight:700;border-style:dashed}
.pnote.msg{border-left:6px solid var(--accent)}
.pitem{display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--line);padding:14px 0}.pitem:first-child{border-top:0}
.ppl{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.ppl .card{gap:6px}.ppl .pname{font-family:var(--display);font-weight:700}
.p2texts{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
.pmail{font-family:var(--read);font-size:1.05rem;line-height:1.7;border:1px solid var(--line);border-radius:12px;background:var(--surface);overflow:hidden}
.pmail .ph{background:var(--sunken);padding:8px 14px;font-family:var(--body);font-size:.88rem;color:var(--muted)}
.pmail .pb{padding:12px 14px;position:relative}
.pmail .pb p{margin:0 0 10px}
.pnoteTag{display:inline-block;background:#fff3a8;color:#3a3000;border-radius:6px;padding:2px 8px;font-family:var(--body);font-size:.85rem;font-weight:700;margin-left:6px;transform:rotate(-1.5deg)}
.pcard1{display:flex;flex-direction:column;gap:10px}
.pspk-photo{max-width:560px;margin:0}.pspk-photo img{width:100%;height:auto;display:block;border-radius:10px}.pspk-photo figcaption{font-size:.8rem;color:var(--muted);margin-top:4px}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- exam meta ---------- */
  const PP = [
    { k: "rd", n: "Reading", s: "Reading", time: "45 minutes", parts: 6, sec: 2700 },
    { k: "wri", n: "Writing", s: "Writing", time: "45 minutes", parts: 2, sec: 2700 },
    { k: "lis", n: "Listening", s: "Listening", time: "about 30 minutes", parts: 4, sec: 1800 },
    { k: "spk", n: "Speaking", s: "Speaking", time: "12–17 minutes (in pairs)", parts: 4, sec: 0 }
  ];
  const PM = {
    rd1: { name: "Short texts", r: [1, 5], min: 6, sk: "read",
      what: "Understanding the main message of short real-world texts: notices, signs, labels, messages, emails and texts.",
      tips: ["Read the text first and ask: who wrote it, who is it for, and why?", "Then read the three options. Two of them usually use words from the text but change the meaning.", "Look for small but important words: only, must, before, after, not, until.", "Choose the option that says the same as the text in different words."] },
    rd2: { name: "Matching", r: [6, 10], min: 9, sk: "read",
      what: "Matching five people's needs with eight short texts. Reading for specific information and detailed comprehension.",
      tips: ["Underline the three or four things each person wants or needs.", "A text is only correct if it matches every one of those things, not just one or two.", "Three texts are extra. Each text can only be used once.", "Watch out for texts that match most but not all of the person's needs."] },
    rd3: { name: "Multiple choice (long text)", r: [11, 15], min: 9, sk: "read",
      what: "Detailed understanding of a longer text, including the writer's attitude, opinion and the general meaning.",
      tips: ["Read the whole text quickly for the general idea first.", "Questions follow the order of the text. The last question is often about the whole text.", "Find the part of the text for each question and read it carefully before choosing.", "Wrong options often contain words from the text but say something different."] },
    rd4: { name: "Gapped text", r: [16, 20], min: 9, sk: "read",
      what: "Understanding how a text is organised. Five sentences have been removed; you choose the right one for each gap.",
      tips: ["Read the main text first to understand the story or the argument.", "Look at the sentences before AND after each gap.", "Use clues: pronouns (he, it, this, they), linking words (but, so, also) and repeated ideas.", "Three sentences are extra. Read the full text again with your answers to check."] },
    rd5: { name: "Multiple-choice cloze", r: [21, 26], min: 6, sk: "read",
      what: "Vocabulary: choosing the right word for each gap. Collocations, phrasal verbs, linking words and words with similar meanings.",
      tips: ["Read the whole text before you choose any answer.", "Look at the words after the gap: many answers depend on a preposition (interested in, good at).", "All four options may have a similar meaning. Only one fits the phrase exactly.", "Never leave a gap empty."] },
    rd6: { name: "Open cloze", r: [27, 32], min: 6, sk: "read",
      what: "Grammar words: prepositions, articles, pronouns, auxiliary verbs, linkers and parts of fixed phrases.",
      tips: ["Write only ONE word in each gap.", "Decide what kind of word is missing: a preposition, a pronoun, a verb such as is or have?", "Read the whole sentence, not just the words next to the gap.", "Check your spelling. A misspelt word is wrong."] },
    lis1: { name: "Short extracts", r: [1, 7], min: 6, sk: "lis",
      what: "Listening for key information in seven short recordings: times, prices, places, plans and choices.",
      tips: ["Read the question and the three options before you listen.", "You will often hear all three options mentioned. Listen for the one that is really the answer.", "Listen for changes: actually, no wait, in the end, instead.", "Use the second listening to check."] },
    lis2: { name: "Short conversations", r: [8, 13], min: 6, sk: "lis",
      what: "Understanding attitudes, opinions and feelings in six short conversations between two people.",
      tips: ["Read the context sentence: it tells you who is talking and where.", "The question often asks about feelings or opinions: how does she feel, what does he think?", "Listen to both speakers. Sometimes they agree, sometimes they don't.", "Do not choose an option just because you hear the same word."] },
    lis3: { name: "Gap fill", r: [14, 19], min: 6, sk: "lis",
      what: "Listening for specific information in a talk by one speaker, and writing one or two words or a number.",
      tips: ["Read the notes before you listen and predict the type of answer: a day, a price, a name, an object?", "Write the words you hear. Usually one or two words, or a number.", "Spelling must be correct. If a name is spelled out, write it exactly.", "The answers come in the same order as the notes."] },
    lis4: { name: "Interview", r: [20, 25], min: 7, sk: "lis",
      what: "Understanding detailed meaning, opinions and attitudes in a longer interview.",
      tips: ["Read all six questions before the interview starts.", "The interviewer's questions help you follow which question you are on.", "Listen to the whole answer before you decide. The speaker may change direction with but or actually.", "Be careful with options that are true but do not answer the question."] },
    wri1: { name: "Email (compulsory)", r: [1, 1], min: 20, sk: "wri",
      what: "Reply to an email. You must answer all four notes. About 100 words.",
      tips: ["Read the email and the four notes. Each note is something you must include.", "Start with a greeting (Hi Sam, / Dear Mrs Lopez,) and finish with a closing (Best wishes, / See you soon,).", "Write one or two sentences for each note, with a reason or a detail.", "Use a friendly, informal style for a friend. Contractions are fine.", "Write about 100 words. Too short means you probably missed a note."] },
    wri2: { name: "Article or story", r: [2, 3], min: 25, sk: "wri",
      what: "Choose ONE: an article for a magazine or website, or a story that begins with a given sentence. About 100 words.",
      tips: ["Choose the task you have the best vocabulary for.", "Article: give it a title, talk to the reader, answer all the questions in the task and give reasons and examples.", "Story: start with the sentence you are given, use past tenses, and give your story a clear ending.", "Use linkers: first, then, after that, because, so, but, however, in the end.", "Check spelling, verb tenses and the word count."] },
    spk1: { name: "Interview", r: [1, 1], min: 2, sk: "spk",
      what: "The examiner asks each candidate questions about personal information and everyday topics. 2–3 minutes.",
      tips: ["Give full answers: answer + reason or example.", "Spell your surname clearly if you are asked.", "Use different tenses: I usually…, Last weekend I…, Next year I'm going to…", "If you don't understand, say: Sorry, could you say that again, please?"] },
    spk2: { name: "Photo description", r: [1, 1], min: 3, sk: "spk",
      what: "Each candidate describes a colour photograph for about 1 minute.",
      tips: ["Say where the people are and what they are doing.", "Describe what they look like and what they are wearing.", "Talk about the background, the weather and the feelings: they look happy / tired…", "If you don't know a word, explain it: It's a thing you use for…", "Keep talking for the whole minute: In the background…, On the left…, I think…"] },
    spk3: { name: "Collaborative task", r: [1, 1], min: 3, sk: "spk",
      what: "You and your partner talk together about a situation and some ideas for 2–3 minutes and try to decide.",
      tips: ["Talk to your partner, not to the examiner.", "Talk about each idea: why it is good or not so good.", "Ask your partner: What do you think? Do you agree?", "Make suggestions: Why don't we…? How about…? I think … is the best because…", "Try to agree at the end, but it's fine if you don't."] },
    spk4: { name: "Discussion", r: [1, 1], min: 3, sk: "spk",
      what: "A discussion on the same topic as Part 3. The examiner asks each of you questions about your likes, preferences and experiences.",
      tips: ["Give your opinion and a reason: I prefer… because…", "Add an example from your life.", "Listen to your partner and add to what they say: Me too, and… / I don't agree because…", "Use: I think, In my opinion, For me, I'd rather."] }
  };
  const PADV = {
    rd1: ["Read real notices and messages every day: signs in shops, school notices, text messages.", "After each answer, underline the words in the text that prove it.", "Learn modal verbs and their meaning: must, mustn't, don't have to, should, can't."],
    rd2: ["Practise listing each person's needs as three or four short notes before you read the texts.", "Check every need: one missing detail means the text is wrong.", "Read adverts, reviews and short descriptions of courses, holidays and places."],
    rd3: ["Read longer articles for 10–15 minutes a day: magazines for teenagers, simple news websites.", "After answering, find the exact words in the text that give the answer.", "Pay attention to the writer's feelings: words like surprised, disappointed, glad, worried."],
    rd4: ["Practise noticing reference words: it, they, this, that, there, he, she.", "Summarise each paragraph in a few words before you start.", "Always read the whole text again with your answers in place."],
    rd5: ["Learn words in groups with their prepositions: arrive at, interested in, good at, depend on.", "Study words that are easily confused: say/tell, make/do, borrow/lend, look/see/watch.", "Use the Vocabulary course PET level to learn B1 collocations."],
    rd6: ["Revise prepositions of time and place, articles (a, an, the), pronouns and auxiliaries.", "Learn fixed phrases: as well as, in front of, at the end of, such as.", "Read your answer in the whole sentence to check it sounds right."],
    lis1: ["Listen to short announcements and conversations and note times, prices and places.", "Practise listening for changes of plan: Actually…, Oh, I forgot…, Let's do … instead.", "Check the transcript after answering and find the exact words that give the answer."],
    lis2: ["Listen for how people feel: pleased, surprised, annoyed, worried, disappointed.", "Notice agreement and disagreement: Me too, Exactly, I'm not so sure, Really?", "Practise with short videos and say what each speaker thinks."],
    lis3: ["Practise spelling numbers, days, months, prices and common objects.", "Predict the type of word for each gap before you listen.", "Listen to short talks and write down key facts."],
    lis4: ["Read the questions first: they tell you the structure of the interview.", "Listen for signal words: but, actually, the main reason, what I really…", "Practise with short interviews and podcasts, then check the transcript."],
    wri1: ["Make a plan: one paragraph for the greeting and first note, one for the middle notes, one for the last note and closing.", "Always answer all four notes, with a reason or detail for each.", "Learn email phrases: Thanks for your email, It was great to hear from you, Write back soon."],
    wri2: ["Practise both: an article with a title and questions to the reader, and a story with a beginning, middle and end.", "In stories, use past simple and past continuous, and time linkers: suddenly, then, after that, in the end.", "Use some B1 words from the Vocabulary course PET level."],
    spk: ["Answer one Part 1 question out loud every day for 30 seconds.", "Describe a photo from your phone for one minute without stopping.", "Practise making suggestions and agreeing: How about…? That's a good idea. I'm not sure about…"]
  };
  const PSCALE = {
    read: [[13, 120], [23, 140], [29, 160], [32, 170]],
    lis: [[11, 120], [18, 140], [23, 160], [25, 170]],
    wri: [[16, 120], [24, 140], [34, 160], [40, 170]],
    spk: [[12, 120], [18, 140], [27, 160], [30, 170]]
  };
  const PSKMAX = { read: 32, lis: 25, wri: 40, spk: 30 };
  const PSKNAME = { read: "Reading", lis: "Listening", wri: "Writing", spk: "Speaking" };
  function pScale(sk, raw) {
    const p = PSCALE[sk]; if (raw < p[0][0]) return null;
    for (let i = 1; i < p.length; i++) if (raw <= p[i][0]) { const [x0, y0] = p[i - 1], [x1, y1] = p[i]; return Math.round(y0 + (raw - x0) * (y1 - y0) / (x1 - x0)); }
    return 170;
  }
  function pGrade(s) {
    if (s == null) return { g: "Below 120", c: "A1–A2", cls: "low" };
    if (s >= 160) return { g: "Pass with Distinction", c: "B2", cls: "" };
    if (s >= 153) return { g: "Pass with Merit", c: "B1", cls: "" };
    if (s >= 140) return { g: "Pass", c: "B1", cls: "" };
    return { g: "Level A2", c: "A2", cls: "mid" };
  }
  const lvlCls = c => c === "B2" ? "B2" : c === "B1" ? "B1" : c === "A2" ? "A2" : "A1";

  /* ---------- state ---------- */
  const PS = () => {
    if (!S.pet) S.pet = {};
    const p = S.pet;
    p.tab = p.tab || "guide"; p.view = p.view || "list"; p.test = p.test || 1; p.paper = p.paper || "rd"; p.part = p.part || 1;
    p.ans = p.ans || {}; p.res = p.res || {}; p.w = p.w || {}; p.fb = p.fb || {}; p.lq = p.lq || null;
    return p;
  };
  const pT = n => PET.tests.find(t => t.n === n);
  const pKey = (n, p, k) => `p${n}.${p}${k}`;
  const pA = key => PS().ans[key] || (PS().ans[key] = {});
  const LET = i => "ABCDEFGH"[i];
  const mk = (r, q) => r ? (r.items[q] > 0 ? "ok" : "no") : "";
  const fixA = (r, q, txt) => r && !r.items[q] ? `<span class="fix">${esc(txt)}</span>` : "";

  /* ---------- marking ---------- */
  function pMark(t, pk) {
    const pap = pk.replace(/\d+$/, ""), k = pk.slice(pap.length);
    const key = pKey(t.n, pap, k); const A = pA(key); const items = {}; let s = 0, m = 0;
    const one = (q, ok) => { items[q] = ok ? 1 : 0; s += ok ? 1 : 0; m += 1; };
    if (pk === "rd1") t.r1.forEach((x, i) => one(1 + i, A[1 + i] === x[3]));
    if (pk === "rd2") [...t.r2.a].forEach((a, i) => one(6 + i, A[6 + i] === a));
    if (pk === "rd3") t.r3.q.forEach((q, i) => one(11 + i, A[11 + i] === q[2]));
    if (pk === "rd4") [...t.r4.a].forEach((a, i) => one(16 + i, A[16 + i] === a));
    if (pk === "rd5") [...t.r5.a].forEach((a, i) => one(21 + i, A[21 + i] === a));
    if (pk === "rd6") t.r6.a.forEach((a, i) => one(27 + i, fMatch(A[27 + i], a)));
    if (pk === "lis1") t.l1.forEach((x, i) => one(1 + i, A[1 + i] === x[3]));
    if (pk === "lis2") t.l2.forEach((x, i) => one(8 + i, A[8 + i] === x[3]));
    if (pk === "lis3") t.l3.q.forEach((q, i) => one(14 + i, fMatch(A[14 + i], q[1])));
    if (pk === "lis4") t.l4.q.forEach((q, i) => one(20 + i, A[20 + i] === q[2]));
    PS().res[key] = { s, m, items, at: Date.now(), sk: PM[pk].sk }; save();
  }

  /* ---------- small renderers ---------- */
  const radios = (name, q, val, opts, r, correct) => fRadios(name, q, val, opts, r, correct);
  const playBtn = pid => `<div class="play"><button class="btn primary" type="button" data-pet="play" data-pid="${pid}">Play recording</button><span class="sub" id="ppc-${pid}"></span></div>`;
  function pPlayUi() {
    document.querySelectorAll("[data-pet='play']").forEach(b => {
      const on = FAU.on === b.dataset.pid, n = FAU.plays[b.dataset.pid] || 0;
      b.textContent = on ? "Stop" : n === 0 ? "Play recording" : n === 1 ? "Play again (2nd listening)" : "Play again";
      b.classList.toggle("primary", !on);
      const c = document.getElementById("ppc-" + b.dataset.pid); if (c) c.textContent = n ? `Played ${n} ${n === 1 ? "time" : "times"}${n >= 2 ? " (the exam plays each recording twice)" : ""}` : "In the exam you hear each recording twice.";
    });
  }
  setInterval(() => { if (curView() === "pet") pPlayUi(); }, 600);
  const NM = { M: "Man", F: "Woman", M2: "Second man", F2: "Second woman", N: "" };
  const script = (lines, nm) => `<div class="trans">${lines.map(([s, x]) => { const n = (nm && nm[s]) || NM[s] || s; return `<p>${n ? `<b>${esc(n)}:</b> ` : ""}${esc(x)}</p>`; }).join("")}</div>`;
  const gapText = (x, fn) => String(x).replace(/\[(\d+)\]/g, (m, n) => fn(+n));
  const paras = arr => (Array.isArray(arr) ? arr : String(arr).split(/\n\n/)).map(p => `<p>${p}</p>`).join("");
  function photo(t, slot, desc) {
    const P = (window.PET_PHOTOS || {})[`p${t.n}${slot}`];
    return `<figure class="pspk-photo">${P ? `<img src="${P.src}" alt="${esc(desc)}" loading="lazy" width="600" height="400"><figcaption>Photo by ${P.page ? `<a href="${esc(P.page)}">${esc(P.by)}</a>` : esc(P.by)} on Unsplash</figcaption>` : `<div class="ph" style="aspect-ratio:3/2;background:var(--sunken);border-radius:10px;display:flex;align-items:center;justify-content:center;padding:16px;text-align:center">${esc(desc)}</div>`}</figure>`;
  }
  function dictBox(id, prompt, hint) {
    let h = fDictBox(id, prompt, hint).replace(/data-fce="dict-check"/g, 'data-pet="dict-check"').replace(/data-fce="dict-clear"/g, 'data-pet="dict-clear"');
    h = h.replace(`<div id="dfb-${id}">`, `<div id="dfb-${id}">${PS().fb[id] ? pSpeakFb(id) : ""}`);
    return h;
  }

  function rubric(t, pk) {
    const m = PM[pk]; const [a, b] = m.r;
    const R = {
      rd1: `For each question, choose the correct answer.`,
      rd2: `For each question, choose the correct answer. The people below all want ${t.r2.k}. On the right there are eight ${t.r2.w || "texts"}. Decide which would be the most suitable for the people (${a}–${b}). There are three extra texts which you do not need to use.`,
      rd3: `Read ${t.r3.k}. For each question (${a}–${b}), choose the correct answer.`,
      rd4: `Read ${t.r4.k}. Five sentences have been removed. For each question (${a}–${b}), choose the correct answer. There are three extra sentences which you do not need to use.`,
      rd5: `For each question (${a}–${b}), choose the correct answer (A, B, C or D).`,
      rd6: `For each question (${a}–${b}), write the correct answer. Write ONE word for each gap.`,
      lis1: `For each question (${a}–${b}), choose the correct answer (A, B or C).`,
      lis2: `For each question (${a}–${b}), choose the correct answer (A, B or C).`,
      lis3: `You will hear ${t.l3.k}. For each question (${a}–${b}), write the correct answer in the gap. Write one or two words or a number or a date or a time.`,
      lis4: `You will hear ${t.l4.k}. For each question (${a}–${b}), choose the correct answer (A, B or C).`,
      wri1: `You must answer this question. Write your answer in about 100 words.`,
      wri2: `Choose ONE of these questions. Write your answer in about 100 words.`,
      spk1: `Part 1 (2–3 minutes). The examiner asks each candidate some questions about themselves. Give answers of one or two sentences.`,
      spk2: `Part 2 (about 3 minutes). Each candidate talks about a photograph on their own for about 1 minute.`,
      spk3: `Part 3 (about 3 minutes). Talk together about the situation and the ideas. Try to decide which is best.`,
      spk4: `Part 4 (about 3 minutes). The examiner asks you both questions related to the topic of Part 3.`
    };
    return `<div class="rubric" role="note"><b>Instructions</b><p style="margin:0;max-width:72ch">${esc(R[pk])}</p>
      <p class="sub" style="margin:0">${esc(m.name)} · ${esc(m.what)}</p></div>
      <details class="tips card"><summary>Tips for Part ${pk.replace(/\D/g, "")}</summary><ul>${m.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>
      ${pk.startsWith("spk") ? "" : fTimer(`p${t.n}-${pk}`, m.min * 60, `Suggested time: ${m.min} min`)}`;
  }
  function partFb(t, pk, r) {
    const meta = PM[pk]; const pct = r.m ? r.s / r.m : 0; const sc = pScale(meta.sk, pct * PSKMAX[meta.sk]); const g = pGrade(sc);
    const msg = pct >= .9 ? "Excellent. This is above the B1 standard for this part, close to B2." : pct >= .7 ? "Good. This is around the B1 pass standard (about 70%)." : pct >= .5 ? "Nearly there. You are between A2 and B1 for this part. Follow the advice below and try again." : "This part needs more work. Read the tips and the advice below, then try again.";
    return `<div class="card res ${pct >= .7 ? "" : pct >= .5 ? "mid" : "low"}" role="status">
      <div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="sub">Your score</div><div class="big">${r.s} / ${r.m}</div></div>
      <div class="lvlbig">Indicative level <span class="lvl ${lvlCls(g.c)}">${esc(g.c)}</span></div></div>
      <p>${msg}</p>${pct < 1 ? `<b>What to improve</b><ul class="adv">${(PADV[pk] || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      <p class="tip">Correct answers are shown in green above. The level is an estimate: it treats this part as if it were the whole ${PSKNAME[meta.sk]} paper.</p></div>`;
  }
  const actions = (t, pk, r) => `<div class="row"><button class="btn primary" type="button" data-pet="check" data-pk="${pk}">${r ? "Check again" : "Check answers"}</button>${r ? `<button class="btn" type="button" data-pet="redo" data-pk="${pk}">Clear and try again</button>` : ""}</div>${r ? partFb(t, pk, r) : ""}`;

  function renderPart(t, pap, k) {
    const pk = pap + k; const key = pKey(t.n, pap, k); const A = pA(key); const r = PS().res[key]; const id = q => `pq-${t.n}-${pk}-${q}`;
    let h = rubric(t, pk);
    if (pk === "rd1") h += `<div class="card">${t.r1.map((x, i) => { const q = 1 + i; return `<div class="pitem"><div class="row" style="align-items:flex-start;gap:10px"><span class="qn" style="font-size:1rem">${q}</span><div class="pnote ${x[4] || ""}">${esc(x[0])}</div></div>${x[1] ? `<p class="sub" style="margin:0">${esc(x[1])}</p>` : ""}${radios(id(q), q, A[q], x[2], r, x[3])}</div>`; }).join("")}</div>`;
    if (pk === "rd2") h += `<div class="ppl">${t.r2.p.map((p, i) => { const q = 6 + i; return `<div class="card"><span class="pname"><span class="qn">${q}</span> ${esc(p[0])}</span><p style="margin:0">${esc(p[1])}</p><div class="row"><label class="sub" for="${id(q)}">Answer</label>${fSel(id(q), q, A[q], t.r2.x.map((x, j) => [LET(j), LET(j) + " · " + x[0]]), mk(r, q))}${fixA(r, q, t.r2.a[i])}</div></div>`; }).join("")}</div>
      <div class="p2texts">${t.r2.x.map((x, j) => `<div class="card ftext"><h3>${LET(j)} · ${esc(x[0])}</h3>${paras([esc(x[1])])}</div>`).join("")}</div>`;
    if (pk === "rd3") h += `<div class="card ftext"><h3>${esc(t.r3.t)}</h3>${paras(t.r3.x.map(esc))}</div><div class="card">${t.r3.q.map((q, i) => { const n = 11 + i; return `<div class="fq"><div class="stem"><span class="qn">${n}</span> ${esc(q[0])}</div>${radios(id(n), n, A[n], q[1], r, q[2])}</div>`; }).join("")}</div>`;
    if (pk === "rd4") h += `<div class="card ftext"><h3>${esc(t.r4.t)}</h3>${paras(t.r4.x.map(p => gapText(esc(p), n => fSel(id(n), n, A[n], t.r4.o.map((o, j) => [LET(j), LET(j)]), mk(r, n)) + fixA(r, n, t.r4.a[n - 16]))))}</div>
      <div class="card"><h3 style="margin-bottom:8px">Sentences A–H</h3><div class="sents">${t.r4.o.map((o, j) => `<div><b>${LET(j)}</b>${esc(o)}</div>`).join("")}</div></div>`;
    if (pk === "rd5") h += `<div class="card ftext"><h3>${esc(t.r5.t)}</h3>${paras(gapText(esc(t.r5.x), n => { const i = n - 21; return fSel(id(n), n, A[n], t.r5.o[i].map((o, j) => [LET(j), LET(j) + " " + o]), mk(r, n)) + fixA(r, n, t.r5.a[i] + " " + t.r5.o[i]["ABCD".indexOf(t.r5.a[i])]); }))}</div>`;
    if (pk === "rd6") h += `<div class="card ftext"><h3>${esc(t.r6.t)}</h3>${paras(gapText(esc(t.r6.x), n => fInp(id(n), n, A[n], mk(r, n)) + fixA(r, n, t.r6.a[n - 27].join(" / "))))}</div>`;
    if (pk === "lis1") h += t.l1.map((x, i) => { const n = 1 + i; return `<div class="extr card"><div class="stem"><span class="qn">${n}</span> ${esc(x[0])}</div>${playBtn(`${t.n}-l1-${n}`)}${radios(id(n), n, A[n], x[2], r, x[3])}${r ? `<details><summary class="sub">Transcript</summary>${script(x[1])}</details>` : ""}</div>`; }).join("");
    if (pk === "lis2") h += t.l2.map((x, i) => { const n = 8 + i; return `<div class="extr card"><div class="stem"><span class="qn">${n}</span> ${esc(x[0])}</div>${playBtn(`${t.n}-l2-${n}`)}${radios(id(n), n, A[n], x[2], r, x[3])}${r ? `<details><summary class="sub">Transcript</summary>${script(x[1])}</details>` : ""}</div>`; }).join("");
    if (pk === "lis3") h += `<div class="card">${playBtn(`${t.n}-l3`)}<h3 style="margin:12px 0 4px">${esc(t.l3.t)}</h3>${t.l3.q.map((q, i) => { const n = 14 + i; const p = q[0].split("___"); return `<div class="kwt"><span><span class="qn">${n}</span> ${esc(p[0])}${fInp(id(n), n, A[n], mk(r, n), "10em")}${esc(p[1] || "")}</span>${fixA(r, n, q[1].join(" / "))}</div>`; }).join("")}
      ${r ? `<details><summary class="sub">Transcript</summary>${script(t.l3.s, t.l3.nm)}</details>` : ""}</div>`;
    if (pk === "lis4") h += `<div class="card">${playBtn(`${t.n}-l4`)}${t.l4.q.map((q, i) => { const n = 20 + i; return `<div class="fq"><div class="stem"><span class="qn">${n}</span> ${esc(q[0])}</div>${radios(id(n), n, A[n], q[1], r, q[2])}</div>`; }).join("")}
      ${r ? `<details><summary class="sub">Transcript</summary>${script(t.l4.s, t.l4.nm)}</details>` : ""}</div>`;
    if (pap === "rd" || pap === "lis") h += actions(t, pk, r);
    if (pk === "wri1") h += writeTask(t, 1);
    if (pk === "wri2") {
      const ch = PS().w[`p${t.n}c`] || 0;
      h += `<div class="card"><b>Choose one question</b><div class="opts" style="margin-top:8px">${t.w2.map((w, i) => `<label class="${ch === i ? "ok" : ""}" style="display:flex;gap:10px;border:1px solid var(--line);border-radius:10px;padding:10px 12px;cursor:pointer"><input type="radio" name="pw2-${t.n}" data-pet-w2="${i}" ${ch === i ? "checked" : ""}><span><b>Question ${i + 2} · ${w[0] === "article" ? "Article" : "Story"}</b><br>${esc(w[1])}</span></label>`).join("")}</div></div>`;
      h += writeTask(t, 2);
    }
    if (pk === "spk1") h += `<div class="card"><b>Questions</b><ol class="notes">${t.s1.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>${fTimer(`p${t.n}-spk1-say`, 120, "Speaking timer", [30, 120])}${dictBox(`pt${t.n}s1`, "Choose a question, press Record and answer it out loud in two or three sentences.")}`;
    if (pk === "spk2") h += t.s2.map((s, i) => `<div class="card"><b>Candidate ${i ? "B" : "A"}</b><p style="font-weight:600;margin:8px 0">${esc(s.task)}</p>${photo(t, `s${i + 1}`, s.d)}</div>`).join("") + fTimer(`p${t.n}-spk2-say`, 60, "Speaking timer", [60]) + dictBox(`pt${t.n}s2`, "Describe one of the photos for about one minute: the place, the people, what they are doing and how they feel.");
    if (pk === "spk3") h += `<div class="card"><p style="max-width:70ch">${esc(t.s3.q)}</p><div class="mind"><div class="ctr">${esc(t.s3.c)}</div>${t.s3.p.map(p => `<span class="pt">${esc(p)}</span>`).join("")}</div><p class="sub" style="margin-top:10px">Talk together about the different ideas and say which you think is best.</p></div>${fTimer(`p${t.n}-spk3-say`, 150, "Speaking timer", [150])}${dictBox(`pt${t.n}s3`, "Say what you think about two or three of the ideas and which one you would choose, and why.")}`;
    if (pk === "spk4") h += `<div class="card"><b>Questions</b><ol class="notes">${t.s4.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>${fTimer(`p${t.n}-spk4-say`, 180, "Speaking timer", [60, 180])}${dictBox(`pt${t.n}s4`, "Answer one question out loud with your opinion, a reason and an example.")}`;
    return h;
  }

  /* ---------- writing ---------- */
  const B1LINK = ["and", "but", "because", "so", "also", "then", "after that", "first", "finally", "however", "although", "when", "while", "in the end", "suddenly", "as well", "too", "for example", "if", "which", "who", "before", "later"];
  let PETWORDS = null;
  const petWords = () => { if (PETWORDS) return PETWORDS; PETWORDS = []; try { (DICT_DATA.entries || []).forEach(r => { if ((r[12] || []).includes("PET") || /^(B1|B2)$/.test(r[2])) PETWORDS.push(fNorm(r[0])); }); } catch (e) { } return PETWORDS; };
  function wTask(t, part) {
    if (part === 1) return { kind: "email", notes: t.w1.notes.map(n => n[1]) };
    const w = t.w2[PS().w[`p${t.n}c`] || 0]; return { kind: w[0], first: w[2] || "" };
  }
  function pWriteScore(text, task) {
    const a = fAnalyse(text); const t = String(text || "").toLowerCase(); const advice = []; const n = a.n;
    let content = n >= 85 && n <= 125 ? 4 : n >= 70 && n <= 140 ? 3 : n >= 50 ? 2 : n >= 25 ? 1 : 0;
    if (task.kind === "email") {
      const miss = task.notes.filter(nt => { const kw = fWords(nt).filter(x => x.length > 3 && !["tell", "about", "what", "your", "which", "explain", "say", "give", "suggest", "where", "when", "with", "would", "yes", "ask", "describe"].includes(x)); return kw.length && !kw.some(k => fNorm(text).includes(k.slice(0, Math.max(4, k.length - 2)))); });
      if (!miss.length && n >= 70) content++; else if (miss.length) advice.push("Answer every note. Check these: " + miss.join(" · "));
    } else if (task.kind === "story") {
      const f = fNorm(task.first).split(" ").slice(0, 5).join(" ");
      if (fNorm(text).startsWith(f)) content++; else advice.push("Your story must begin with the sentence you were given.");
    } else if (n >= 80) content++;
    let ca = 2;
    if (task.kind === "email") { if (/^(dear|hi|hello|hey)\b/m.test(t)) ca++; else advice.push("Start the email with a greeting: Hi Alex, / Dear Mrs Brown,"); if (/(best wishes|love|see you|take care|bye|write soon|write back|all the best|regards)/.test(t)) ca++; else advice.push("Finish the email with a closing: Best wishes, / See you soon, / Write back soon,"); }
    if (task.kind === "article") { if (/\?/.test(t)) ca++; else advice.push("Talk to the reader: ask a question in the title or the first sentence."); if (/\b(you|your)\b/.test(t)) ca++; }
    if (task.kind === "story") { const past = (t.match(/\b\w+ed\b|\b(was|were|went|saw|had|got|came|took|made|said|told|found|felt|knew|ran|left|thought|heard|began|became)\b/g) || []).length; if (past >= 8) ca += 2; else if (past >= 4) { ca++; advice.push("Use more past tenses to tell your story: went, saw, was walking, had…"); } else advice.push("A story needs past tenses: I was walking…, Suddenly I saw…, We decided…"); }
    const link = fHits(text, B1LINK);
    let org = (a.paras >= 3 ? 2 : a.paras === 2 ? 1 : 0) + (link.length >= 6 ? 3 : link.length >= 4 ? 2 : link.length >= 2 ? 1 : 0);
    if (a.paras < 2) advice.push("Use paragraphs: a short beginning, the main part and an ending.");
    if (link.length < 4) advice.push("Join your ideas with linking words: because, so, but, also, then, after that, however.");
    const pw = petWords(); const hits = [...new Set(fWords(text).filter(w => w.length > 4 && pw.includes(w)))];
    let lang = (hits.length >= 6 ? 2 : hits.length >= 3 ? 1 : 0) + (a.cx.length >= 4 ? 2 : a.cx.length >= 2 ? 1 : 0) + (a.ttr > .65 ? 1 : 0);
    if (hits.length < 3) advice.push("Use more B1 vocabulary. Try the Vocabulary course, PET level (e.g. journey, especially, improve, exhausted, keep in touch).");
    if (a.cx.length < 2) advice.push("Try some longer sentences with when, if, because, which or who.");
    if (a.rep.length) advice.push("You repeat some words a lot: " + a.rep.join(", ") + ". Use other words.");
    if (n < 80) advice.push(`Write about 100 words. You have ${n}.`);
    if (n > 130) advice.push(`Stay close to 100 words. You have ${n}.`);
    const sc = { content: c5(content), ca: c5(ca), org: c5(org), lang: c5(lang) };
    return { a, link, hits, sc, total: sc.content + sc.ca + sc.org + sc.lang, advice };
  }
  function writeFb(sc) {
    const s = sc.total; const lvl = s >= 17 ? "B2" : s >= 12 ? "B1" : s >= 8 ? "A2" : "A1"; const cls = s >= 12 ? "" : s >= 8 ? "mid" : "low";
    return `<div class="card res ${cls}" role="status"><div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="sub">Estimated mark</div><div class="big">${s} / 20</div></div><span class="lvlbig">Estimated level <span class="lvl ${lvl}">${lvl}</span></span></div>
    ${fMeter("Content", sc.sc.content, 5)}${fMeter("Communicative achievement", sc.sc.ca, 5)}${fMeter("Organisation", sc.sc.org, 5)}${fMeter("Language", sc.sc.lang, 5)}
    <p class="sub">${sc.a.n} words · ${sc.a.paras} paragraphs · linking words: ${sc.link.length ? esc([...new Set(sc.link)].join(", ")) : "none"} · B1 vocabulary: ${sc.hits.length ? esc(sc.hits.slice(0, 10).join(", ")) : "none found"}</p>
    ${sc.advice.length ? `<b>What to improve</b><ul class="adv">${sc.advice.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>Well done: the right length, all the points and good linking. Ask your teacher to check grammar and spelling.</p>`}
    <p class="tip">Cambridge examiners mark four areas from 0 to 5. This automatic estimate checks length, task points, style, organisation and vocabulary range, but it cannot spot grammar or spelling mistakes. Your teacher's mark is the real one.</p></div>`;
  }
  const USEFUL = {
    email: ["Opening: Hi Sam, / Dear Mrs Lopez, / Thanks for your email. It was great to hear from you.", "Answering: About the party, … / You asked me about… / I think the best day is…", "Suggesting: Why don't we…? / How about…? / We could…", "Reasons: because… / so… / That's why…", "Closing: I can't wait to see you! / Write back soon, / Best wishes, / Love,"],
    article: ["Title: a question or a short, interesting phrase", "Opening: Do you like…? / Have you ever…? / Everyone has a favourite…", "Opinion: I think… / In my opinion… / For me, the best thing is…", "Examples: For example, … / such as…", "Ending: So why not try it? / That's why I love…"],
    story: ["Beginning: Use the sentence you are given, then say where and when.", "Time linkers: First, … / Then… / After that, … / Suddenly, … / In the end, …", "Past tenses: I was walking home when I saw… / We had never seen…", "Feelings: I felt nervous / I was so surprised / We couldn't stop laughing.", "Ending: In the end… / It was the best day of my life. / I'll never forget…"]
  };
  function writeTask(t, part) {
    const task = wTask(t, part);
    const k = `p${t.n}w${part}${part === 2 ? "_" + (PS().w[`p${t.n}c`] || 0) : ""}`; const txt = PS().w[k] || ""; const n = fWords(txt).length; const fb = PS().w[k + "_fb"];
    let h = `<div class="card wtask">`;
    if (part === 1) h += `<p>Read this email from ${esc(t.w1.from)} and the notes you have made.</p>
      <div class="pmail"><div class="ph"><b>From:</b> ${esc(t.w1.from)}<br><b>Subject:</b> ${esc(t.w1.subj)}</div><div class="pb">${t.w1.body.map(p => `<p>${t.w1.notes.reduce((x, nt) => x.replace(esc(nt[0]), `${esc(nt[0])}<span class="pnoteTag">${esc(nt[1])}</span>`), esc(p))}</p>`).join("")}</div></div>
      <p style="margin-top:8px"><b>Write your email to ${esc(t.w1.from.split(" ")[0])} using all the notes.</b></p>`;
    h += `<label for="pwt-${k}"><b>Your answer</b></label><textarea id="pwt-${k}" data-pwk="${k}" lang="en" spellcheck="true" placeholder="Write about 100 words">${esc(txt)}</textarea>
      <div class="wc"><span id="pwc-${k}">${wcLine(n)}</span></div>
      <div class="row"><button class="btn primary" type="button" data-pet="wfb" data-wk="${k}" data-part="${part}">Get feedback</button></div></div>`;
    if (fb) h += writeFb(pWriteScore(txt, task));
    h += `<details class="tips card"><summary>Useful language for this task</summary><ul>${(USEFUL[task.kind] || USEFUL.email).map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>`;
    return h;
  }
  const wcLine = n => `${n} words${n && n < 80 ? ` · <span class="warn">aim for about 100</span>` : n > 130 ? ` · <span class="warn">${n - 100} over 100</span>` : n ? " · good length" : ""}`;

  /* ---------- speaking feedback ---------- */
  function pSpeakFb(id) {
    const tx = FS().lab["tx_" + id] || ""; const r = fSpeakScore(tx, FS().lab["sec_" + id] || 0);
    const lvl = r.avg >= 3.6 ? "B2" : r.avg >= 2.3 ? "B1" : r.avg >= 1.4 ? "A2" : "A1"; const cls = lvl === "B2" || lvl === "B1" ? "" : lvl === "A2" ? "mid" : "low";
    const adv = r.advice.map(x => x.replace("for B2", "for B1").replace("B2 vocabulary and phrasal verbs from the Learn section", "B1 words and phrasal verbs from the Vocabulary and Verbs courses (PET level)"));
    return `<div class="card res ${cls}"><div class="row" style="justify-content:space-between"><b>Feedback</b><span class="lvlbig">Estimated level <span class="lvl ${lvl}">${lvl}</span></span></div>
    ${fMeter("Grammar and vocabulary", r.sc.gv, 5)}${fMeter("Discourse management", r.sc.dm, 5)}${r.sc.fl != null ? fMeter("Fluency (speed)", r.sc.fl, 5) : ""}
    <p class="sub">${r.a.n} words${r.wpm ? ` · ${Math.round(r.wpm)} words per minute` : ""} · linking words: ${r.a.link.length ? esc([...new Set(r.a.link)].join(", ")) : "none"}</p>
    ${adv.length ? `<b>What to improve</b><ul class="adv">${adv.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>Good length and linking. Keep practising with the timer.</p>`}
    <p class="tip">This is an automatic estimate from your words and speed. It cannot judge pronunciation or grammar accuracy the way an examiner does. For B1, about 80–110 words a minute is natural.</p></div>`;
  }

  /* ---------- results ---------- */
  function paperRaw(t, pap) {
    const R = PS().res; const out = { done: [] };
    if (pap === "rd" || pap === "lis") { const N = pap === "rd" ? 6 : 4; let s = 0, n = 0; for (let k = 1; k <= N; k++) { const r = R[pKey(t.n, pap, k)]; if (r) { s += r.s; n++; out.done.push(k); } } if (n === N) out[pap === "rd" ? "read" : "lis"] = s; }
    if (pap === "wri") { const W = PS().w; const c = W[`p${t.n}c`] || 0; const p1 = W[`p${t.n}w1_fb`] ? pWriteScore(W[`p${t.n}w1`] || "", wTask(t, 1)).total : null; const p2 = W[`p${t.n}w2_${c}_fb`] ? pWriteScore(W[`p${t.n}w2_${c}`] || "", wTask(t, 2)).total : null; if (p1 != null) out.done.push(1); if (p2 != null) out.done.push(2); if (p1 != null && p2 != null) out.wri = p1 + p2; }
    if (pap === "spk") { const vals = [1, 2, 3, 4].map(k => PS().fb[`pt${t.n}s${k}`] ? fSpeakScore(FS().lab[`tx_pt${t.n}s${k}`] || "", FS().lab[`sec_pt${t.n}s${k}`] || 0).avg : null); vals.forEach((v, i) => { if (v != null) out.done.push(i + 1); }); const got = vals.filter(v => v != null); if (got.length) out.spk = Math.round(Math.min(5, got.reduce((x, y) => x + y, 0) / got.length * 1.15) / 5 * 30); }
    return out;
  }
  function summary(t) {
    const rows = []; const scs = [];
    const add = (sk, raw) => { const sc = pScale(sk, raw); const g = pGrade(sc); scs.push(sc || 110); rows.push(`<tr><td>${PSKNAME[sk]}</td><td>${Math.round(raw)} / ${PSKMAX[sk]}</td><td>${sc || "below 120"}</td><td>${esc(g.c)}</td></tr>`); };
    const rd = paperRaw(t, "rd"), wri = paperRaw(t, "wri"), lis = paperRaw(t, "lis"), spk = paperRaw(t, "spk");
    if (rd.read != null) add("read", rd.read); if (wri.wri != null) add("wri", wri.wri); if (lis.lis != null) add("lis", lis.lis); if (spk.spk != null) add("spk", spk.spk);
    const missing = []; if (rd.read == null) missing.push("Reading (all 6 parts)"); if (wri.wri == null) missing.push("Writing (both parts with feedback)"); if (lis.lis == null) missing.push("Listening (all 4 parts)"); if (spk.spk == null) missing.push("Speaking (feedback on at least one part)");
    const overall = scs.length === 4 ? Math.round(scs.reduce((x, y) => x + y, 0) / 4) : null; const g = overall ? pGrade(overall) : null;
    const weak = []; ["rd1", "rd2", "rd3", "rd4", "rd5", "rd6", "lis1", "lis2", "lis3", "lis4"].forEach(pk => { const pap = pk.replace(/\d+$/, ""); const r = PS().res[pKey(t.n, pap, pk.slice(pap.length))]; if (r && r.m && r.s / r.m < .7) weak.push(pk); });
    return `<div class="card res ${g ? g.cls : "mid"}"><h2>Test ${t.n} results</h2>
      ${rows.length ? `<div class="tblwrap"><table class="ftab"><thead><tr><th>Skill</th><th>Marks</th><th>Cambridge scale (approx.)</th><th>Level</th></tr></thead><tbody>${rows.join("")}</tbody></table></div>` : `<p class="sub">Check your answers in each part to see your results here.</p>`}
      ${overall ? `<div class="row" style="gap:16px;align-items:flex-end"><div><div class="sub">Overall (approx.)</div><div class="big">${overall}</div></div><span class="lvlbig">${esc(g.g)} · <span class="lvl ${lvlCls(g.c)}">${esc(g.c)}</span></span></div>` : missing.length ? `<p class="sub">To see your overall result, complete: ${esc(missing.join(", "))}.</p>` : ""}
      ${weak.length ? `<b>Parts to work on</b><ul class="adv">${weak.map(pk => `<li>${esc(PP.find(p => pk.startsWith(p.k)).s)} Part ${pk.replace(/\D/g, "")} (${esc(PM[pk].name)}): ${esc((PADV[pk] || [""])[0])}</li>`).join("")}</ul>` : ""}
      <p class="tip">Scores use approximate Cambridge English Scale points for B1 Preliminary (140 = Pass at B1, 153 = Merit, 160 = Distinction at B2), with straight-line estimates between them. Writing and Speaking marks are automatic estimates.</p></div>`;
  }

  /* ---------- learn ---------- */
  function petEntries() { try { return (DICT_DATA.entries || []).filter(r => (r[12] || []).includes("PET")); } catch (e) { return []; } }
  function learnQuiz() {
    const E = petEntries(); const sh = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
    const qs = sh(E).slice(0, 10).map(r => { const others = sh(E.filter(x => x[0] !== r[0] && x[1] === r[1])).slice(0, 3).map(x => x[0]); while (others.length < 3) others.push(sh(E.filter(x => x[0] !== r[0] && !others.includes(x[0])))[0][0]); const o = sh([r[0], ...others]); const ex = (r[7] || "").replace(new RegExp(r[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____"); return { q: ex.includes("_____") ? ex : r[6], es: r[4], o, a: o.indexOf(r[0]) }; });
    PS().lq = { qs, ans: {}, done: false }; save();
  }
  function renderLearn() {
    const p = PS(); const E = petEntries(); const q = p.lq; p.lt = p.lt || "words";
    let h = `<div class="seg sm" role="group" aria-label="Learning topics"><button class="chip" type="button" data-pet="lt" data-v="words" aria-pressed="${p.lt === "words"}">PET words</button><button class="chip" type="button" data-pet="lt" data-v="dict" aria-pressed="${p.lt === "dict"}">Dictionary</button></div>`;
    if (p.lt === "dict") return h + `<div data-dict-mount="pet" style="margin-top:12px">${window.DICT ? DICT.html("pet") : `<p class="sub">Loading the dictionary…</p>`}</div>`;
    h += `<div class="card"><div class="row" style="justify-content:space-between"><h2>Practice</h2><button class="btn primary" type="button" data-pet="lq-new">${q ? "New set of 10" : "Start 10 questions"}</button></div>`;
    if (q) {
      h += q.qs.map((x, i) => { const v = q.ans[i]; return `<div class="fq"><div class="stem"><span class="qn">${i + 1}</span> ${esc(x.q)}</div><span class="sub">Spanish: ${esc(x.es)}</span><div class="opts">${x.o.map((o, j) => `<label class="${q.done ? (j === x.a ? "ok" : +v === j ? "no" : "") : ""}"><input type="radio" name="plq-${i}" value="${j}" data-plq="${i}" ${+v === j && v !== undefined ? "checked" : ""}> ${esc(o)}</label>`).join("")}</div></div>`; }).join("");
      const score = q.qs.reduce((n, x, i) => n + (q.ans[i] !== undefined && +q.ans[i] === x.a ? 1 : 0), 0);
      h += `<div class="row"><button class="btn primary" type="button" data-pet="lq-check">Check answers</button></div>${q.done ? `<div class="card res ${score >= 7 ? "" : score >= 5 ? "mid" : "low"}"><div class="big">${score} / 10</div><p>${score >= 9 ? "Excellent. You know your PET vocabulary." : score >= 7 ? "Good, B1 standard. Review the ones you missed." : "Study the list below, then try a new set."}</p></div>` : ""}`;
    } else h += `<p class="sub">Ten questions from the B1 Preliminary word list. Choose the word that fits each sentence.</p>`;
    h += `</div><div class="card"><h2>B1 Preliminary word list <span class="sub" style="font-size:.9rem">(${E.length})</span></h2><p class="sub">The same words as the Vocabulary course, PET level.</p>${E.slice().sort((a, b) => a[0].localeCompare(b[0])).map(r => `<div class="lcard"><b lang="en">${esc(r[0])} <span class="sub" style="font-size:.8rem">${esc(r[1])}</span></b><span>${esc(r[4])}</span><span class="ex" lang="en">${esc(r[7] || "")}</span></div>`).join("")}</div>`;
    return h;
  }

  /* ---------- guide ---------- */
  function renderGuide() {
    const rows = [["Reading", "45 min", "6 parts · 32 questions", "32 marks"], ["Writing", "45 min", "2 parts", "40 marks (20 per part)"], ["Listening", "about 30 min", "4 parts · 25 questions", "25 marks"], ["Speaking", "12–17 min (in pairs)", "4 parts", "30 marks (examiners' assessment)"]];
    let h = `<div class="card"><h2>The exam at a glance</h2><div class="tblwrap"><table class="ftab"><thead><tr><th>Paper</th><th>Time</th><th>Parts</th><th>Marks</th></tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="sub" style="margin-top:8px">Each of the four skills gets its own score on the Cambridge English Scale, and the overall score is their average. Each skill is worth 25%.</p></div>
      <div class="card"><h2>Scores and grades</h2><div class="tblwrap"><table class="ftab"><thead><tr><th>Cambridge English Scale</th><th>Result</th><th>CEFR</th></tr></thead><tbody><tr><td>160–170</td><td>Pass with Distinction</td><td>B2</td></tr><tr><td>153–159</td><td>Pass with Merit</td><td>B1</td></tr><tr><td>140–152</td><td>Pass</td><td>B1</td></tr><tr><td>120–139</td><td>Level A2 certificate</td><td>A2</td></tr></tbody></table></div>
      <p class="sub" style="margin-top:8px">To pass you need about 70% overall. In the practice tests, about 23/32 in Reading and 18/25 in Listening is a B1 pass.</p></div>`;
    PP.forEach(p => {
      h += `<div class="card"><h2>${esc(p.n)} <span class="sub" style="font-family:var(--body);font-size:.9rem;font-weight:500">${esc(p.time)}</span></h2>${Array.from({ length: p.parts }, (_, i) => { const pk = p.k + (i + 1); const m = PM[pk]; return `<details class="tips" style="border-top:1px solid var(--line);padding:10px 0"><summary>Part ${i + 1}: ${esc(m.name)}</summary><p style="margin:8px 0 4px;max-width:70ch">${esc(m.what)}</p><ul>${m.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>`; }).join("")}</div>`;
    });
    return h;
  }

  /* ---------- main render ---------- */
  function renderPET() {
    const el = document.getElementById("v-pet"); if (!el) return; const p = PS();
    const tabs = [["guide", "Exam guide"], ["tests", "Practice tests"], ["learn", "Learn"]];
    let h = `<div class="head fce-hero"><div><h1>B1 Preliminary (PET) preparation</h1><p class="credit">Cambridge B1 Preliminary practice · Created by Teacher Dario</p></div></div>
      <div class="seg" role="group" aria-label="B1 Preliminary sections">${tabs.map(([k, l]) => `<button class="chip" type="button" data-pet="tab" data-v="${k}" aria-pressed="${p.tab === k}">${l}</button>`).join("")}</div>`;
    if (p.tab === "guide") h += renderGuide();
    if (p.tab === "learn") h += renderLearn();
    if (p.tab === "tests") h += p.view === "test" && pT(p.test) ? renderTest(pT(p.test)) : renderList();
    el.innerHTML = h; pPlayUi(); fDictUi(); fLiveRate();
  }
  function renderList() {
    if (!PET.tests.length) return `<p class="sub">Tests are loading…</p>`;
    return `<p class="sub">${PET.tests.length} complete practice tests. Each has all four papers with exam-style instructions, tips, timers and automatic feedback.</p><div class="fgrid">${PET.tests.map(t => {
      const P = (window.PET_PHOTOS || {})[`p${t.n}c`]; const st = PP.map(pp => { const r = paperRaw(t, pp.k); return `<span class="pbadge ${r.done.length === pp.parts ? "ok" : ""}">${pp.k === "rd" ? "R" : pp.k === "lis" ? "L" : pp.k === "wri" ? "W" : "S"} ${r.done.length}/${pp.parts}</span>`; }).join("");
      return `<button class="tcard" type="button" data-pet="open" data-n="${t.n}"><div class="ph ${P ? "has" : ""}">${P ? `<img src="${P.src}" alt="" loading="lazy" width="600" height="400">` : esc(t.theme)}</div><span class="tt">Test ${t.n}</span><span class="tm">${esc(t.theme)}</span><span class="pp">${st}</span></button>`;
    }).join("")}</div>`;
  }
  function renderTest(t) {
    const p = PS(); const pap = PP.find(x => x.k === p.paper) || PP[0]; const k = Math.min(p.part, pap.parts);
    return `<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-pet="list">← All tests</button><span class="row">${PET.tests.map(x => `<button class="chip" type="button" data-pet="open" data-n="${x.n}" aria-pressed="${x.n === t.n}" style="min-height:32px;padding:4px 10px">${x.n}</button>`).join("")}</span></div>
      <div class="head"><div><h1 style="font-size:1.5rem">Test ${t.n} · ${esc(t.theme)}</h1><p class="sub">${esc(pap.n)} · ${esc(pap.time)}</p></div></div>
      <div class="seg" role="group" aria-label="Papers">${PP.map(x => `<button class="chip" type="button" data-pet="paper" data-v="${x.k}" aria-pressed="${x.k === pap.k}">${esc(x.s)}</button>`).join("")}</div>
      ${pap.sec ? fTimer(`p${t.n}-${pap.k}-paper`, pap.sec, `Whole paper (${pap.time})`) : ""}
      <div class="partbar" role="group" aria-label="Parts">${Array.from({ length: pap.parts }, (_, i) => { const r = p.res[pKey(t.n, pap.k, i + 1)]; const wd = pap.k === "wri" && p.w[`p${t.n}w${i + 1}${i ? "_" + (p.w[`p${t.n}c`] || 0) : ""}_fb`]; const sd = pap.k === "spk" && p.fb[`pt${t.n}s${i + 1}`]; return `<button class="chip" type="button" data-pet="part" data-v="${i + 1}" aria-pressed="${k === i + 1}">Part ${i + 1}${r ? ` <span class="n">${r.s}/${r.m}</span>` : wd || sd ? ` <span class="n">✓</span>` : ""}</button>`; }).join("")}</div>
      ${renderPart(t, pap.k, k)}
      <div class="row" style="justify-content:space-between">${k > 1 ? `<button class="btn" type="button" data-pet="part" data-v="${k - 1}">← Part ${k - 1}</button>` : "<span></span>"}${k < pap.parts ? `<button class="btn primary" type="button" data-pet="part" data-v="${k + 1}">Part ${k + 1} →</button>` : ""}</div>
      ${summary(t)}`;
  }

  /* ---------- events ---------- */
  const inPet = el => el && el.closest && el.closest("#v-pet");
  document.addEventListener("click", e => {
    const fb = e.target.closest("[data-fce]");
    if (fb && inPet(fb) && /^tm-(reset|set)$/.test(fb.dataset.fce)) { setTimeout(renderPET, 0); return; }
    const b = e.target.closest("[data-pet]"); if (!b) return; const p = PS(); const a = b.dataset.pet; const t = pT(p.test);
    if (a === "tab") { p.tab = b.dataset.v; save(); fStop(); renderPET(); }
    else if (a === "open") { p.tab = "tests"; p.view = "test"; p.test = +b.dataset.n; save(); fStop(); renderPET(); window.scrollTo(0, 0); }
    else if (a === "list") { p.view = "list"; save(); fStop(); renderPET(); }
    else if (a === "paper") { p.paper = b.dataset.v; p.part = 1; save(); fStop(); renderPET(); }
    else if (a === "part") { p.part = +b.dataset.v; save(); fStop(); renderPET(); const pb = document.querySelector("#v-pet .partbar"); if (pb) pb.scrollIntoView({ block: "start" }); }
    else if (a === "check") { pMark(t, b.dataset.pk); renderPET(); const r = document.querySelector("#v-pet .res"); if (r) r.scrollIntoView({ block: "nearest" }); }
    else if (a === "redo") { const pk = b.dataset.pk; const pap = pk.replace(/\d+$/, ""); const key = pKey(t.n, pap, pk.slice(pap.length)); delete p.res[key]; p.ans[key] = {}; save(); renderPET(); }
    else if (a === "play") {
      const pid = b.dataset.pid; if (FAU.on === pid) { fStop(); pPlayUi(); return; }
      const [n, part, q] = pid.split("-"); const T = pT(+n);
      const lines = part === "l1" ? T.l1[+q - 1][1] : part === "l2" ? T.l2[+q - 8][1] : part === "l3" ? T.l3.s : T.l4.s;
      fPlay(pid, lines); pPlayUi();
    }
    else if (a === "dict-check") { const id = b.dataset.did; if (FD.on) fDictEnd(); p.fb[id] = 1; save(); renderPET(); }
    else if (a === "dict-clear") { const id = b.dataset.did; FS().lab["tx_" + id] = ""; FS().lab["sec_" + id] = 0; delete p.fb[id]; save(); renderPET(); }
    else if (a === "wfb") { p.w[b.dataset.wk + "_fb"] = 1; save(); renderPET(); const r = document.querySelector("#v-pet .wtask + .res"); if (r) r.scrollIntoView({ block: "nearest" }); }
    else if (a === "lt") { p.lt = b.dataset.v; save(); renderPET(); }
    else if (a === "lq-new") { learnQuiz(); renderPET(); }
    else if (a === "lq-check") { if (p.lq) { p.lq.done = true; save(); renderPET(); } }
  });
  document.addEventListener("change", e => {
    const el = e.target; if (!inPet(el)) return; const p = PS();
    if (el.dataset.fq) { const key = pKey(p.test, p.paper, p.part); pA(key)[el.dataset.fq] = el.value; save(); }
    if (el.dataset.plq !== undefined && p.lq) { p.lq.ans[el.dataset.plq] = el.value; save(); }
    if (el.dataset.petW2 !== undefined) { p.w[`p${p.test}c`] = +el.dataset.petW2; save(); renderPET(); }
  });
  document.addEventListener("input", e => {
    const el = e.target; if (!inPet(el)) return; const p = PS();
    if (el.dataset.fq && el.tagName === "INPUT") { const key = pKey(p.test, p.paper, p.part); pA(key)[el.dataset.fq] = el.value; save(); }
    if (el.dataset.pwk) { p.w[el.dataset.pwk] = el.value; save(); const c = document.getElementById("pwc-" + el.dataset.pwk); if (c) c.innerHTML = wcLine(fWords(el.value).length); }
  });
  window.addEventListener("hashchange", () => { if (location.hash !== "#pet") { if (FAU.on && String(FAU.on).includes("-l")) fStop(); } });

  /* ---------- register the view ---------- */
  if (!VIEWS.some(x => x[0] === "pet")) {
    const i = VIEWS.findIndex(x => x[0] === "fce");
    VIEWS.splice(i < 0 ? VIEWS.length : i + 1, 0, ["pet", "PET", '<path d="M12 3l9 4.5-9 4.5-9-4.5zM6 9.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3V9.5"/><path d="M9 21h6"/>']);
    const lib = document.getElementById("v-library");
    if (lib && !document.getElementById("v-pet")) { const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-pet"; sec.setAttribute("aria-label", "B1 Preliminary"); lib.parentNode.appendChild(sec); }
    const tabs = document.getElementById("tabs"); if (tabs) tabs.style.gridTemplateColumns = "repeat(" + VIEWS.length + ",1fr)";
    if (typeof render === "function") { const base = render; render = function () { base.apply(this, arguments); if (curView() === "pet") renderPET(); }; try { render(); } catch (e) { } }
  }
  window.PETAPP = { render: renderPET, mark: pMark, state: PS };
})();

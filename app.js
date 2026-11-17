/* B2 First (FCE) preparation module. Created by Teacher Dario. */
"use strict";
window.FCE = window.FCE || { tests: [], learn: null };
function FCE_T(t) { FCE.tests.push(t); FCE.tests.sort((a, b) => a.n - b.n); }
function FCE_L(l) { FCE.learn = l; }

(function () {
  const css = `
.fce-hero{display:flex;flex-direction:column;gap:6px}
.fce-hero .credit{margin:0}
.fgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.tcard{display:flex;flex-direction:column;gap:8px;text-align:left;border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:0 0 14px;overflow:hidden;cursor:pointer;color:inherit;font:inherit}
.tcard:hover{border-color:var(--accent)}
.tcard .ph{aspect-ratio:16/9;background:var(--sunken);display:flex;align-items:flex-end;padding:10px;color:var(--muted);font-size:.8rem;overflow:hidden}
.tcard .ph img{width:100%;height:100%;object-fit:cover;display:block;margin:-10px}
.tcard .ph.has{padding:0}
.tcard .ph.has img{margin:0}
.tcard .tt{font-family:var(--display);font-weight:700;font-size:1.15rem;padding:0 14px}
.tcard .tm{padding:0 14px;color:var(--muted);font-size:.88rem}
.tcard .pp{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px}
.pbadge{font-size:.75rem;font-weight:700;border-radius:999px;padding:2px 8px;background:var(--sunken);color:var(--muted)}
.pbadge.ok{background:var(--good-soft);color:var(--good)}
.partbar{display:flex;flex-wrap:wrap;gap:6px}
.partbar .chip .n{font-size:.75rem;font-weight:700;opacity:.75}
.rubric{border-left:4px solid var(--accent);background:var(--accent-soft);border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:6px}
.rubric b{font-family:var(--display)}
.tips summary{cursor:pointer;font-weight:700;color:var(--accent)}
.tips ul{margin:8px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:4px;max-width:70ch}
.tmr{display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:var(--sunken);border-radius:10px;padding:8px 12px}
.tmr .tmr-t{font-family:var(--display);font-weight:700;font-size:1.4rem;font-variant-numeric:tabular-nums;min-width:4.2ch}
.tmr.over .tmr-t{color:var(--bad)}
.tmr.done{animation:fceflash 1s 3}
@keyframes fceflash{50%{background:var(--warn-soft)}}
.tmr .lab{font-size:.85rem;color:var(--muted)}
.tmr .btn{min-height:36px;padding:4px 12px}
.ftext{font-family:var(--read);font-size:1.15rem;line-height:1.85;max-width:72ch}
.ftext p{margin:0 0 12px}
.ftext h3{font-family:var(--display);font-size:1.25rem;font-weight:700;margin-bottom:8px}
.gap{font:inherit;font-size:1rem;border:1px solid var(--accent);background:var(--surface);border-radius:6px;padding:2px 6px;min-height:34px;max-width:100%;vertical-align:baseline}
input.gap{width:9.5em}
.gap.ok{border-color:var(--good);background:var(--good-soft)}
.gap.no{border-color:var(--bad);background:var(--sunken)}
.qn{font-family:var(--body);font-weight:700;font-size:.8rem;color:var(--accent);margin-right:2px}
.key{font-family:var(--body);font-size:.85rem;font-weight:700;letter-spacing:.04em;color:var(--muted)}
.fix{font-family:var(--body);font-size:.85rem;font-weight:700;color:var(--good);margin-left:4px}
.fq{display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--line);padding:14px 0}
.fq:first-child{border-top:0}
.fq .stem{font-weight:600;max-width:70ch}
.fq .opts{display:flex;flex-direction:column;gap:6px}
.fq .opts label{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--line);border-radius:8px;padding:8px 12px;cursor:pointer;background:var(--surface)}
.fq .opts label:has(input:checked){border-color:var(--accent);background:var(--accent-soft)}
.fq .opts label.ok{border-color:var(--good);background:var(--good-soft)}
.fq .opts label.no{border-color:var(--bad)}
.fq .opts input{margin-top:4px;accent-color:var(--accent)}
.kwt{display:flex;flex-direction:column;gap:6px;border-top:1px solid var(--line);padding:14px 0}
.kwt .kw{font-weight:800;letter-spacing:.06em;font-family:var(--display)}
.kwt input{width:min(22em,100%)}
.sents{display:flex;flex-direction:column;gap:8px}
.sents div{border:1px solid var(--line);border-radius:8px;padding:8px 12px;background:var(--surface);font-family:var(--read);font-size:1.05rem}
.sents b{font-family:var(--body);margin-right:6px}
.secs{display:flex;flex-direction:column;gap:12px}
.secs .card h3{margin-bottom:6px}
.mq{display:grid;grid-template-columns:2.6em minmax(0,1fr) auto;gap:8px 10px;align-items:center;border-top:1px solid var(--line);padding:10px 0}
.mq select{min-height:38px}
.res{border-left:4px solid var(--good);display:flex;flex-direction:column;gap:10px}
.res.mid{border-left-color:var(--warn)}
.res.low{border-left-color:var(--bad)}
.big{font-family:var(--display);font-weight:700;font-size:2rem;line-height:1}
.lvlbig{display:inline-flex;align-items:center;gap:8px;font-weight:700}
.adv{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px;max-width:72ch}
.play{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.extr{border:1px solid var(--line);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;background:var(--surface)}
.trans{background:var(--sunken);border-radius:8px;padding:10px 14px;font-family:var(--read);font-size:1rem;max-width:72ch}
.trans p{margin:4px 0}
.notes{margin:6px 0;padding-left:22px}
.wtask{display:flex;flex-direction:column;gap:8px}
.wtask textarea{min-height:260px}
.wc .warn{color:var(--warn);font-weight:600}
.meter{display:grid;grid-template-columns:minmax(120px,190px) 1fr 3em;gap:8px;align-items:center;font-size:.9rem}
.meter .bar{height:8px}
.photos{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.photos figure{margin:0;display:flex;flex-direction:column;gap:6px}
.photos img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:8px;display:block;background:var(--sunken)}
.photos .ph-d{aspect-ratio:3/2;border:2px dashed var(--line);border-radius:8px;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;color:var(--muted);font-size:.95rem;background:var(--sunken)}
.photos figcaption{font-size:.75rem;color:var(--muted)}
.mind{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center}
.mind .ctr{flex-basis:100%;text-align:center;font-family:var(--display);font-weight:700;font-size:1.1rem;padding:14px;border:2px solid var(--accent);border-radius:999px;background:var(--accent-soft);max-width:520px;margin:0 auto}
.mind .pt{border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:8px 12px}
.dict{display:flex;flex-direction:column;gap:8px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface)}
.dict textarea{min-height:120px}
.dict .live{font-style:italic;color:var(--muted);min-height:1.4em}
.mic.on{background:var(--bad);border-color:var(--bad);color:#fff}
.ftab{width:100%;border-collapse:collapse;font-size:.92rem}
.ftab th,.ftab td{text-align:left;padding:8px;border-bottom:1px solid var(--line);vertical-align:top}
.ftab th{font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
.tblwrap{overflow-x:auto}
.lcard{display:flex;flex-direction:column;gap:4px;border-top:1px solid var(--line);padding:10px 0}
.lcard:first-child{border-top:0}
.lcard b{font-family:var(--read);font-size:1.1rem}
.lcard .ex{font-family:var(--read);color:var(--muted)}
.ladder{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ladder span{border-radius:6px;padding:2px 8px;font-family:var(--read)}
.ladder .a2{background:var(--sunken)}
.ladder .b1{background:var(--accent-soft)}
.ladder .b2{background:var(--good-soft);font-weight:600}
.wfam{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:4px 10px;font-family:var(--read)}
.wfam .h{font-family:var(--body);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();

/* ---------- exam meta ---------- */
const FPAPERS = [
  { k: "rue", n: "Reading and Use of English", s: "Reading & Use of English", time: "1 hour 15 minutes", parts: 7 },
  { k: "lis", n: "Listening", s: "Listening", time: "about 40 minutes", parts: 4 },
  { k: "wri", n: "Writing", s: "Writing", time: "1 hour 20 minutes", parts: 2 },
  { k: "spk", n: "Speaking", s: "Speaking", time: "14 minutes (in pairs)", parts: 4 }
];
const FPM = {
  rue1: { name: "Multiple-choice cloze", r: [1, 8], min: 8, mark: 1, sk: "read",
    what: "Vocabulary in context: collocations, fixed phrases, phrasal verbs, linking words and words with similar meanings.",
    tips: ["Read the whole text first for the general meaning before you choose any answer.",
      "Look at the words on both sides of the gap: many answers depend on a preposition after the gap (interested in, depend on).",
      "All four options often have a similar meaning. Ask which one forms the fixed phrase or collocation (make a decision, not do a decision).",
      "Check the grammar too: some options need a different structure after them (suggest + -ing, encourage someone to do).",
      "Never leave a gap empty. There is no penalty for a wrong answer."] },
  rue2: { name: "Open cloze", r: [9, 16], min: 8, mark: 1, sk: "uoe",
    what: "Grammar words: articles, prepositions, pronouns, auxiliaries, linkers, relative pronouns and parts of fixed phrases.",
    tips: ["Write only ONE word in each gap. Contractions such as don't count as two words, so they are wrong here.",
      "Decide what kind of word is missing first: a preposition, a pronoun, an auxiliary, a linker?",
      "Read the whole sentence, not just the words next to the gap. The clue is often in the next clause.",
      "Watch for fixed phrases: as well as, in spite of, as long as, no matter how.",
      "Check your spelling. A misspelt word scores no mark."] },
  rue3: { name: "Word formation", r: [17, 24], min: 8, mark: 1, sk: "uoe",
    what: "Building the correct form of a word: nouns, adjectives, adverbs, negatives and plurals.",
    tips: ["Decide which part of speech fits the gap: after an article you usually need a noun; before a noun, an adjective.",
      "Check whether the meaning needs a negative prefix (un-, in-, im-, dis-, ir-) or suffix (-less).",
      "Check whether a noun should be plural: 'many ___' needs a plural form.",
      "You may need two changes to one word, for example COMFORT → uncomfortably.",
      "Spelling must be perfect. Learn common changes: argue → argument, high → height, broad → breadth."] },
  rue4: { name: "Key word transformation", r: [25, 30], min: 10, mark: 2, sk: "uoe",
    what: "Expressing the same idea with different grammar or vocabulary: passives, reported speech, comparatives, phrasal verbs, fixed expressions.",
    tips: ["Use between two and five words, including the word given. Contractions count as two words.",
      "Do not change the key word in any way: no -s, -ed or -ing added.",
      "Each answer is marked in two halves, so a partly correct answer can still earn one mark.",
      "Make sure the second sentence means exactly the same as the first, including the tense.",
      "Typical areas: wish / if only, it's time, passive voice, reported speech, too / enough, so / such, phrasal verbs."] },
  rue5: { name: "Multiple choice (long text)", r: [31, 36], min: 14, mark: 2, sk: "read",
    what: "Detailed understanding of a long text: opinion, attitude, purpose, implication, the meaning of words and phrases, and reference.",
    tips: ["Read the text quickly first, then read each question stem (not the options) and find the part of the text it refers to.",
      "Questions follow the order of the text. The last question may be about the whole text.",
      "Answer in your own words before you look at the options, then choose the closest one.",
      "Wrong options often use words from the text but change the meaning. Check that the option says exactly what the text says.",
      "Each answer is worth two marks, so give this part enough time."] },
  rue6: { name: "Gapped text", r: [37, 42], min: 13, mark: 2, sk: "read",
    what: "Understanding how a text is organised: reference words, links between paragraphs, and the development of ideas.",
    tips: ["Read the main text first so you understand the story or argument.",
      "Underline reference words in the sentences A–G (this, they, such, however, it) and find what they refer to before and after each gap.",
      "Check the sentence after the gap as well as the one before it.",
      "When you have finished, read the whole text again with your answers in place.",
      "One sentence is extra. Do not force it in."] },
  rue7: { name: "Multiple matching", r: [43, 52], min: 14, mark: 1, sk: "read",
    what: "Finding specific information, detail, opinion and attitude across several short texts.",
    tips: ["Read the questions first and underline the key idea in each.",
      "Then read one section at a time and match the questions it answers.",
      "The texts paraphrase the questions. Look for the same idea in different words, not the same word.",
      "Sections can be used more than once and some are used several times.",
      "Scan quickly. You do not need to understand every word."] },
  lis1: { name: "Multiple choice (short extracts)", r: [1, 8], min: 10, mark: 1, sk: "lis",
    what: "Gist, detail, function, purpose, attitude, opinion and agreement in eight unrelated short recordings.",
    tips: ["Read the question and the options before each extract plays. Each extract is a new situation.",
      "Listen for the speaker's main point or feeling, not individual words: the words you hear may appear in wrong options.",
      "Use the first listening to choose, the second to check.",
      "If you miss an answer, guess and move on quickly. The next extract will not wait."] },
  lis2: { name: "Sentence completion", r: [9, 18], min: 8, mark: 1, sk: "lis",
    what: "Specific information and stated opinion in a talk by one speaker.",
    tips: ["Read the sentences before you listen and predict the type of answer: a number, a place, a noun?",
      "Write the words you actually hear. You don't need to change them.",
      "Answers are usually one to three words. Spelling must be correct for common words.",
      "The speaker may mention more than one possible answer. Listen for the one that matches the sentence exactly.",
      "The questions follow the order of the recording."] },
  lis3: { name: "Multiple matching", r: [19, 23], min: 8, mark: 1, sk: "lis",
    what: "Gist, attitude, main points and the speaker's purpose across five short monologues on one theme.",
    tips: ["Read the eight options and think of different ways to say each idea.",
      "Each speaker may mention several options, but only one matches what they really mean.",
      "Note your best guess for each speaker on the first listening and confirm on the second.",
      "Three options are extra. Use each letter only once."] },
  lis4: { name: "Multiple choice (interview)", r: [24, 30], min: 9, mark: 1, sk: "lis",
    what: "Opinion, attitude, gist, main idea and detail in an interview or conversation.",
    tips: ["Read all the questions before the recording starts: they give you the structure of the interview.",
      "The interviewer's questions often signal which question you are on.",
      "Be careful with options that are true but do not answer the question.",
      "Listen for the speaker's opinion: words like actually, in fact, but and to be honest often come just before the answer."] },
  wri1: { name: "Essay (compulsory)", r: [1, 1], min: 40, mark: 20, sk: "wri",
    what: "An essay giving your opinion on a topic, using the two notes given plus one idea of your own. 140–190 words.",
    tips: ["Plan for five minutes: introduction, one paragraph for each of the three points, conclusion.",
      "You must write about both notes and add your own third idea.",
      "Use a neutral or formal style: no contractions, no slang.",
      "Give reasons and examples for each point, and state your opinion clearly in the conclusion.",
      "Use linkers: firstly, moreover, on the other hand, however, in conclusion.",
      "Leave five minutes to check grammar, spelling and the word count."] },
  wri2: { name: "Article, email/letter, report or review", r: [2, 4], min: 40, mark: 20, sk: "wri",
    what: "Choose one of three tasks. Each has a clear reader and purpose. 140–190 words.",
    tips: ["Choose the task whose vocabulary you know best, not the one that looks shortest.",
      "Article: an interesting title, speak directly to the reader, use questions and a lively style.",
      "Email or letter: correct opening and closing, answer every question in the task, friendly or formal as needed.",
      "Report: a title, clear headings, formal language, and recommendations at the end.",
      "Review: describe briefly, give your opinion with reasons, and finish with a recommendation.",
      "Cover every part of the task. Missing a point lowers your Content mark."] },
  spk1: { name: "Interview", r: [1, 1], min: 2, mark: 0, sk: "spk",
    what: "The examiner asks each candidate questions about themselves: home, studies, work, free time, plans. About 2 minutes.",
    tips: ["Give answers of two or three sentences: answer, reason, example.",
      "Avoid one-word answers, but do not prepare long speeches either.",
      "Use a range of tenses: what you do, did, have done and are going to do.",
      "If you do not understand, ask: 'Sorry, could you repeat the question, please?'"] },
  spk2: { name: "Long turn", r: [1, 1], min: 4, mark: 0, sk: "spk",
    what: "You compare two photos and answer a question about them for 1 minute, then comment briefly (about 30 seconds) on your partner's photos.",
    tips: ["Compare the photos; do not describe each one separately in detail.",
      "Spend most of your minute on the question printed above the photos.",
      "Use comparing language: whereas, while, both, in contrast, unlike.",
      "Speculate: they might be…, it looks as if…, I imagine that…",
      "Keep talking until the examiner says 'Thank you'. One minute goes quickly."] },
  spk3: { name: "Collaborative task", r: [1, 1], min: 4, mark: 0, sk: "spk",
    what: "You and your partner discuss five written prompts for about 2 minutes, then have 1 minute to reach a decision.",
    tips: ["Talk to your partner, not to the examiner.",
      "Ask your partner's opinion: What do you think? Would you agree that…?",
      "Discuss the prompts in depth; you do not need to cover all five.",
      "Agree and disagree politely: That's a good point, but…, I see what you mean, however…",
      "In the decision minute you do not have to agree, but you must try to reach a decision."] },
  spk4: { name: "Discussion", r: [1, 1], min: 4, mark: 0, sk: "spk",
    what: "A wider discussion of the Part 3 topic, with questions to each of you and to both of you. About 4 minutes.",
    tips: ["Give extended answers with reasons and examples from your life or the world.",
      "Respond to what your partner says: add to it, agree or disagree.",
      "Use opinion phrases beyond 'I think': In my view, It seems to me that, I'd argue that.",
      "It is fine to say 'That's an interesting question. Let me think…' to give yourself time."] }
};
const FADV = {
  rue1: ["Learn vocabulary in chunks, not single words: note the verb and preposition that go with each new noun (take part in, have an effect on).", "Study groups of easily confused words: raise/rise, remind/remember, look/watch/see, make/do, say/tell.", "Use the Learn section's Expressions and Phrasal verbs lists for daily practice."],
  rue2: ["Revise grammar words: relative pronouns, prepositions after adjectives, auxiliaries in passives and perfect tenses, and linkers (although, despite, unless).", "When you check, read each sentence aloud in your head. A missing article or auxiliary often 'sounds' wrong.", "Keep a list of fixed phrases with grammar words: as soon as, in order to, so that, such a, by the time."],
  rue3: ["Learn word families, not single words: compete, competition, competitor, competitive, competitively.", "Practise the most common suffixes: -tion, -ment, -ness, -ity, -ful, -less, -ous, -able, -ive, -ly.", "Check for negatives and plurals every time. They are the most common lost marks.", "Use the Word formation section in Learn."],
  rue4: ["Revise the structures that come up most: passive, reported speech, wish / if only, it's time, so/such…that, too/enough, unless, in case.", "Learn phrasal verbs and fixed expressions with their single-word meanings (put off = postpone, take after = resemble).", "Count your words every time: two to five, contractions count as two."],
  rue5: ["Practise reading longer articles and novel extracts (newspapers, magazines, short stories) for 15 minutes a day.", "After each answer, underline the exact words in the text that prove it. If you cannot find them, check again.", "Pay attention to the writer's attitude: words like surprisingly, unfortunately and admittedly show opinion."],
  rue6: ["Focus on reference: pronouns (it, they, this, these), linkers (however, as a result) and repeated ideas link the sentences to the gaps.", "Summarise each paragraph in a few words before you start. It helps you see where each sentence belongs.", "Always reread the full text with your sentences in place."],
  rue7: ["Train your scanning speed: give yourself 14 minutes for 10 questions.", "Practise paraphrasing: for each question write two other ways of saying the same idea.", "Do not choose a section only because it contains the same word as the question."],
  lis1: ["Listen to short podcasts or radio clips and ask: why is the speaker saying this, and how do they feel?", "Distractors repeat words from the recording. Listen for meaning, not matching words.", "Practise with the transcript after checking: find exactly where the answer was given."],
  lis2: ["Before listening, predict the type of word for each gap.", "Practise spelling common words: numbers, dates, jobs, places and everyday objects.", "Write exactly what you hear; you rarely need to change the words."],
  lis3: ["Paraphrase the eight options before you listen.", "Speakers often mention several options. Wait until they finish before deciding.", "Listen to people giving opinions (interviews, vlogs) and summarise each in one sentence."],
  lis4: ["Read the questions carefully: they follow the order of the interview.", "Notice signal words: but, actually, what really…, in fact. The answer often follows them.", "Practise with longer interviews and podcasts, checking your answers against a transcript."],
  wri1: ["Plan before you write: introduction, three points (two notes and your own idea), conclusion.", "Use a formal style: no contractions, no very informal words.", "Use the A2 → B2 upgrades in Learn to replace simple words with B2 vocabulary."],
  wri2: ["Practise all four task types: article, email/letter, report and review.", "Check that you answer every part of the question.", "Match the style to the reader: friendly for an article or a friend, formal for a report or a letter to a manager."],
  spk: ["Record yourself with the dictation tool every day for one minute on a Part 1 or Part 4 question.", "Use linking words and longer sentences: because, although, which, for example.", "Practise comparing photos with: whereas, while, both, in contrast, it looks as if.", "Ask your partner questions in Part 3 and react to their ideas."]
};
const FSCALE = {
  read: [[10, 122], [16, 140], [24, 160], [37, 180], [42, 190]],
  uoe: [[7, 122], [11, 140], [18, 160], [24, 180], [28, 190]],
  wri: [[10, 122], [16, 140], [24, 160], [34, 180], [40, 190]],
  lis: [[8, 122], [12, 140], [18, 160], [27, 180], [30, 190]],
  spk: [[14, 122], [24, 140], [36, 160], [54, 180], [60, 190]]
};
const FSKMAX = { read: 42, uoe: 28, wri: 40, lis: 30, spk: 60 };
const FSKNAME = { read: "Reading", uoe: "Use of English", wri: "Writing", lis: "Listening", spk: "Speaking" };
function fScale(sk, raw) {
  const p = FSCALE[sk]; if (raw < p[0][0]) return null;
  for (let i = 1; i < p.length; i++) if (raw <= p[i][0]) { const [x0, y0] = p[i - 1], [x1, y1] = p[i]; return Math.round(y0 + (raw - x0) * (y1 - y0) / (x1 - x0)); }
  return 190;
}
function fGrade(s) {
  if (s == null) return { g: "Below 122", c: "Below B1", cls: "low" };
  if (s >= 180) return { g: "Grade A", c: "C1", cls: "" };
  if (s >= 173) return { g: "Grade B", c: "B2", cls: "" };
  if (s >= 160) return { g: "Grade C", c: "B2", cls: "" };
  if (s >= 140) return { g: "Level B1", c: "B1", cls: "mid" };
  return { g: "Below B1", c: "A2–B1", cls: "low" };
}
const LINKERS = ["however", "moreover", "furthermore", "in addition", "what is more", "on the other hand", "although", "even though", "whereas", "while", "despite", "in spite of", "nevertheless", "therefore", "as a result", "consequently", "because", "since", "so that", "in order to", "for example", "for instance", "such as", "firstly", "secondly", "finally", "to begin with", "in conclusion", "to sum up", "overall", "in my opinion", "in my view", "personally", "on the whole", "as well as", "not only", "besides", "instead", "otherwise", "unless", "as long as", "which means", "that is why", "it seems to me", "i would argue"];
const FILLERS = ["um", "uh", "er", "erm", "like", "you know", "i mean", "basically", "kind of", "sort of"];
const COMPLEX = ["which", "who", "whose", "where", "when", "if", "unless", "although", "because", "while", "whereas", "that", "so that", "would", "could", "might", "have been", "had"];

/* ---------- state ---------- */
const FS = () => {
  if (!S.fce) S.fce = {};
  const f = S.fce;
  f.tab = f.tab || "guide"; f.view = f.view || "list"; f.test = f.test || 1; f.paper = f.paper || "rue"; f.part = f.part || 1;
  f.ans = f.ans || {}; f.res = f.res || {}; f.w = f.w || {}; f.lt = f.lt || "pv"; f.lq = f.lq || {}; f.lab = f.lab || {};
  return f;
};
const fT = n => FCE.tests.find(t => t.n === n);
const fKey = (n, p, k) => `t${n}.${p}${k}`;
const fA = key => FS().ans[key] || (FS().ans[key] = {});
const fNorm = s => String(s || "").toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9' -]/g, " ").replace(/\s+/g, " ").trim();
const fWords = s => fNorm(s).split(" ").filter(Boolean);
const fLet = i => "ABCDEFGH"[i];

/* ---------- timers ---------- */
const FTM = {};
let fAudioCtx = null;
function fBeep() { try { fAudioCtx = fAudioCtx || new (window.AudioContext || window.webkitAudioContext)(); const o = fAudioCtx.createOscillator(), g = fAudioCtx.createGain(); o.frequency.value = 880; g.gain.value = .08; o.connect(g); g.connect(fAudioCtx.destination); o.start(); o.stop(fAudioCtx.currentTime + .35); } catch (e) { } }
const fmt = s => { const n = Math.abs(Math.round(s)); return (s < 0 ? "+" : "") + Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0"); };
function fTimer(id, sec, label, presets) {
  const t = FTM[id] || (FTM[id] = { total: sec, left: sec, run: false });
  return `<div class="tmr ${t.left < 0 ? "over" : ""}" id="tmr-${id}" role="timer" aria-live="off">
    <span class="lab">${esc(label)}</span><span class="tmr-t" id="tmt-${id}">${fmt(t.left)}</span>
    <button class="btn ${t.run ? "" : "primary"}" type="button" data-fce="tm-go" data-tid="${id}" id="tmb-${id}">${t.run ? "Pause" : t.left === t.total ? "Start" : "Resume"}</button>
    <button class="btn" type="button" data-fce="tm-reset" data-tid="${id}">Reset</button>
    ${(presets || []).map(p => `<button class="btn ghost" type="button" data-fce="tm-set" data-tid="${id}" data-sec="${p}">${fmt(p)}</button>`).join("")}
    <span class="lab" id="tml-${id}">${t.left < 0 ? "Over time" : ""}</span></div>`;
}
setInterval(() => {
  for (const id in FTM) {
    const t = FTM[id]; if (!t.run) continue;
    t.left--; if (t.left === 0) { fBeep(); const b = document.getElementById("tmr-" + id); if (b) { b.classList.remove("done"); void b.offsetWidth; b.classList.add("done"); } }
    const e = document.getElementById("tmt-" + id); if (e) e.textContent = fmt(t.left);
    const box = document.getElementById("tmr-" + id); if (box) box.classList.toggle("over", t.left < 0);
    const l = document.getElementById("tml-" + id); if (l) l.textContent = t.left < 0 ? "Over time" : "";
    if (FS().tab === "lab" || FS().paper === "spk") fLiveRate();
  }
}, 1000);

/* ---------- listening audio (browser voice) ---------- */
const FAU = { on: false, tok: 0, plays: {} };
function fVoices() {
  if (!("speechSynthesis" in window)) return {};
  const vs = speechSynthesis.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang));
  const male = vs.filter(v => /male|daniel|george|arthur|oliver|fred|alex|tom|rishi|guy|ryan|thomas/i.test(v.name) && !/female/i.test(v.name));
  const female = vs.filter(v => /female|samantha|karen|kate|serena|moira|tessa|fiona|victoria|susan|libby|sonia|hazel|zira|aria|jenny|martha/i.test(v.name));
  const gb = vs.filter(v => /GB|UK|IE|AU/i.test(v.lang + v.name));
  return { M: male[0] || gb[0] || vs[0], M2: male[1] || male[0] || vs[1] || vs[0], F: female[0] || gb[1] || vs[0], F2: female[1] || female[0] || vs[2] || vs[0], N: gb[0] || vs[0] };
}
function fStop() { FAU.on = false; FAU.tok++; try { speechSynthesis.cancel(); } catch (e) { } fPlayUi(); }
function fPlay(pid, lines) {
  if (!("speechSynthesis" in window)) return;
  fStop(); FAU.on = pid; const tok = FAU.tok; const vs = fVoices(); let i = 0;
  FAU.plays[pid] = (FAU.plays[pid] || 0) + 1;
  const next = () => {
    if (tok !== FAU.tok) return;
    if (i >= lines.length) { FAU.on = false; fPlayUi(); return; }
    const [sp, tx] = lines[i++]; const u = new SpeechSynthesisUtterance(tx);
    const v = vs[sp] || vs.N; if (v) u.voice = v; u.lang = (v && v.lang) || "en-GB";
    u.rate = .95; u.pitch = /^M/.test(sp) ? .82 : /^F/.test(sp) ? 1.12 : 1;
    u.onend = () => setTimeout(next, 350); u.onerror = () => { if (tok === FAU.tok) { FAU.on = false; fPlayUi(); } };
    try { speechSynthesis.speak(u); } catch (e) { FAU.on = false; }
  };
  next(); fPlayUi();
}
function fPlayUi() {
  document.querySelectorAll("[data-fce='play']").forEach(b => {
    const on = FAU.on === b.dataset.pid, n = FAU.plays[b.dataset.pid] || 0;
    b.textContent = on ? "Stop" : n === 0 ? "Play recording" : n === 1 ? "Play again (2nd listening)" : "Play again";
    b.classList.toggle("primary", !on);
    const c = document.getElementById("pc-" + b.dataset.pid); if (c) c.textContent = n ? `Played ${n} ${n === 1 ? "time" : "times"}${n >= 2 ? " (the exam plays each recording twice)" : ""}` : "In the exam you hear each recording twice.";
  });
}
const fPlayBtn = (pid) => `<div class="play"><button class="btn primary" type="button" data-fce="play" data-pid="${pid}">Play recording</button><span class="sub" id="pc-${pid}"></span></div>`;
const FNM = { M: "Man", F: "Woman", M2: "Second man", F2: "Second woman", N: "" };
const fScript = (lines, nm) => `<div class="trans">${lines.map(([s, t]) => { const n = (nm && nm[s]) || FNM[s] || s; return `<p>${n ? `<b>${esc(n)}:</b> ` : ""}${esc(t)}</p>`; }).join("")}</div>`;

/* ---------- dictation ---------- */
const FD = { api: null, rec: null, on: false, target: null, t0: 0, secs: 0 };
(function () { try { if (window.claude && claude.use) claude.use("dictation").then(d => { FD.api = d || null; if (d) { d.onFinal(({ text }) => fDictAdd(text)); d.onPartial(({ text }) => { const l = document.getElementById("live-" + FD.target); if (l) l.textContent = text; }); d.onState(({ state }) => { if (state !== "listening" && FD.on) { fDictEnd(); } }); } }).catch(() => { }); } catch (e) { } })();
const fSR = () => window.SpeechRecognition || window.webkitSpeechRecognition;
const fCanDict = () => !!(FD.api || fSR());
function fDictAdd(text) {
  const ta = document.getElementById("dt-" + FD.target); if (!ta || !text) return;
  ta.value = (ta.value ? ta.value.replace(/\s+$/, "") + " " : "") + text.trim();
  FS().lab["tx_" + FD.target] = ta.value; save();
  const l = document.getElementById("live-" + FD.target); if (l) l.textContent = "";
  fLiveRate();
}
function fDictStart(id) {
  FD.target = id; FD.t0 = Date.now();
  if (FD.api) {
    FD.api.start().then(() => { FD.on = true; fDictUi(); }).catch(err => { FD.on = false; fDictUi(); const l = document.getElementById("live-" + id); if (l) l.textContent = String(err && err.message || err).includes("not_granted") ? "Microphone not allowed. You can type your answer instead." : "Could not start the microphone. You can type your answer instead."; });
    FD.on = true; fDictUi(); return;
  }
  const SR = fSR(); if (!SR) return;
  const r = new SR(); FD.rec = r; r.lang = "en-GB"; r.continuous = true; r.interimResults = true;
  r.onresult = e => { let interim = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const x = e.results[i]; if (x.isFinal) fDictAdd(x[0].transcript); else interim += x[0].transcript; } const l = document.getElementById("live-" + id); if (l) l.textContent = interim; };
  r.onerror = ev => { const l = document.getElementById("live-" + id); if (l) l.textContent = ev.error === "not-allowed" ? "Microphone not allowed. You can type your answer instead." : ""; };
  r.onend = () => { if (FD.on) fDictEnd(); };
  try { r.start(); FD.on = true; } catch (e) { FD.on = false; }
  fDictUi();
}
function fDictEnd() {
  if (!FD.on) return; FD.on = false; FD.secs += (Date.now() - FD.t0) / 1000;
  FS().lab["sec_" + FD.target] = Math.round((FS().lab["sec_" + FD.target] || 0) + (Date.now() - FD.t0) / 1000); save();
  try { if (FD.api) FD.api.stop(); else if (FD.rec) FD.rec.stop(); } catch (e) { }
  fDictUi(); fLiveRate();
}
function fDictUi() {
  document.querySelectorAll("[data-fce='mic']").forEach(b => { const on = FD.on && FD.target === b.dataset.did; b.classList.toggle("on", on); b.textContent = on ? "Stop recording" : "Record (speak)"; });
}
function fLiveRate() {
  document.querySelectorAll("[data-rate]").forEach(el => { const id = el.dataset.rate; const ta = document.getElementById("dt-" + id); if (!ta) return; const n = fWords(ta.value).length; let sec = FS().lab["sec_" + id] || 0; if (FD.on && FD.target === id) sec += (Date.now() - FD.t0) / 1000; el.textContent = `${n} words${sec > 5 ? ` · ${Math.round(n / (sec / 60))} words per minute` : ""}`; });
}
function fDictBox(id, prompt, hint) {
  const tx = FS().lab["tx_" + id] || "";
  return `<div class="dict"><div class="row" style="justify-content:space-between"><b>Speaking dictation</b><span class="sub" data-rate="${id}"></span></div>
  ${prompt ? `<p style="max-width:70ch">${esc(prompt)}</p>` : ""}
  <div class="row">${fCanDict() ? `<button class="btn mic" type="button" data-fce="mic" data-did="${id}">Record (speak)</button>` : `<span class="sub">Voice dictation isn't available in this browser. Type what you would say instead.</span>`}
  <button class="btn" type="button" data-fce="dict-check" data-did="${id}">Get feedback</button><button class="btn ghost" type="button" data-fce="dict-clear" data-did="${id}">Clear</button></div>
  <p class="live" id="live-${id}" aria-live="polite"></p>
  <label class="sub" for="dt-${id}">${esc(hint || "Your words appear here. You can also type or correct them.")}</label>
  <textarea id="dt-${id}" data-dict="${id}" lang="en">${esc(tx)}</textarea>
  <div id="dfb-${id}">${FS().lab["fb_" + id] ? fSpeakFb(id) : ""}</div></div>`;
}

/* ---------- text analysis ---------- */
let fB2 = null;
function fB2Set() {
  if (fB2) return fB2; fB2 = new Set();
  const L = FCE.learn; if (!L) return fB2;
  (L.up || []).forEach(r => r.slice(2).forEach(w => fB2.add(w.toLowerCase())));
  (L.pv || []).forEach(r => fB2.add(r[0].toLowerCase()));
  (L.ex || []).forEach(r => fB2.add(r[0].toLowerCase()));
  return fB2;
}
function fHits(text, list) { const t = " " + fNorm(text) + " "; return list.filter(w => t.includes(" " + w + " ")); }
function fAnalyse(text) {
  const raw = String(text || ""); const w = fWords(raw); const n = w.length;
  const sents = raw.split(/[.!?]+/).map(s => s.trim()).filter(s => s.split(/\s+/).length > 1);
  const paras = raw.split(/\n\s*\n|\n/).map(p => p.trim()).filter(p => p.split(/\s+/).length > 4);
  const uniq = new Set(w.filter(x => x.length > 3));
  const link = fHits(raw, LINKERS); const fill = fHits(raw, FILLERS); const cx = fHits(raw, COMPLEX);
  const b2 = [...fB2Set()].filter(p => (" " + fNorm(raw) + " ").includes(" " + fNorm(p) + " "));
  const freq = {}; w.filter(x => x.length > 3 && !["that", "this", "with", "have", "they", "there", "their", "would", "about", "which", "what", "because", "think", "people"].includes(x)).forEach(x => freq[x] = (freq[x] || 0) + 1);
  const rep = Object.entries(freq).filter(([, c]) => c >= 4).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([x]) => x);
  const contr = (raw.match(/\b\w+'(t|s|re|ve|ll|d|m)\b/gi) || []).length;
  return { n, sents: sents.length, avg: sents.length ? n / sents.length : n, paras: paras.length, ttr: n ? uniq.size / Math.max(1, w.filter(x => x.length > 3).length) : 0, link, fill, cx, b2, rep, contr };
}
const c5 = x => Math.max(0, Math.min(5, Math.round(x)));
function fWriteScore(text, task) {
  const a = fAnalyse(text); const kind = task.kind; const advice = [];
  let content = a.n >= 140 && a.n <= 190 ? 4 : a.n >= 120 && a.n <= 210 ? 3 : a.n >= 90 ? 2 : a.n >= 40 ? 1 : 0;
  if (task.notes) { const covered = task.notes.filter(nt => fWords(nt).filter(x => x.length > 4).some(k => fNorm(text).includes(k.slice(0, Math.max(5, k.length - 2))))); if (covered.length === task.notes.length) content += 1; else advice.push("Make sure you write about both notes: " + task.notes.map(x => "“" + x + "”").join(" and ") + ", plus your own idea."); }
  else if (a.n >= 140) content += 1;
  const t = String(text || "").toLowerCase(); let ca = 2;
  const formal = kind === "essay" || kind === "report" || /formal/.test(task.reg || "");
  if (formal && a.contr === 0) ca++; if (formal && a.contr > 2) { ca--; advice.push("This task needs a formal style. Avoid contractions such as don't and it's."); }
  if (kind === "email" || kind === "letter") { if (/^(dear|hi|hello)\b/m.test(t)) ca++; else advice.push("Start your email or letter with a greeting (Dear… / Hi…)."); if (/(best wishes|regards|yours|love|take care|all the best|see you)/.test(t)) ca++; else advice.push("Finish with a suitable closing (Best wishes, / Kind regards, / Yours sincerely,)."); }
  if (kind === "article") { if (/\?/.test(t)) ca++; else advice.push("Articles engage the reader: try a question in the title or first paragraph."); if (/\b(you|your)\b/.test(t)) ca++; }
  if (kind === "report") { if (/(introduction|purpose|aim)/.test(t)) ca++; else advice.push("Reports start with a heading such as Introduction that states the purpose."); if (/(recommend|suggest|should)/.test(t)) ca++; else advice.push("Finish a report with clear recommendations (I would recommend that…)."); }
  if (kind === "review") { if (/(recommend|worth|should|must see|must-see|don't miss|avoid)/.test(t)) ca += 2; else advice.push("End your review with a clear recommendation for the reader."); }
  if (kind === "essay") { if (/(in conclusion|to sum up|overall|to conclude|all things considered)/.test(t)) ca++; else advice.push("Finish the essay with a conclusion that states your opinion clearly (In conclusion, I believe…)."); if (/(i believe|in my opinion|in my view|i think|it seems to me|i would argue)/.test(t)) ca++; }
  let org = (a.paras >= 4 ? 3 : a.paras === 3 ? 2 : a.paras === 2 ? 1 : 0) + (a.link.length >= 5 ? 2 : a.link.length >= 3 ? 1 : 0);
  if (a.paras < 3) advice.push("Organise your text into paragraphs: an introduction, a paragraph for each main point and a conclusion.");
  if (a.link.length < 3) advice.push("Use more linking words: moreover, however, on the other hand, as a result, in conclusion.");
  let lang = (a.b2.length >= 5 ? 2 : a.b2.length >= 2 ? 1 : 0) + (a.ttr > .7 ? 1 : 0) + (a.cx.length >= 5 ? 2 : a.cx.length >= 3 ? 1 : 0);
  if (a.b2.length < 3) advice.push("Show a wider range of B2 vocabulary. Try upgrades from Learn → A2 → B2 words (e.g. important → crucial, big → considerable).");
  if (a.cx.length < 3) advice.push("Use more complex sentences: relative clauses (which, who), conditionals (if, unless) and contrast (although, whereas).");
  if (a.rep.length) advice.push("You repeat some words a lot: " + a.rep.join(", ") + ". Use synonyms.");
  if (a.n < 140) advice.push(`Write at least 140 words. You have ${a.n}.`);
  if (a.n > 190) advice.push(`Stay close to 190 words. You have ${a.n}; long answers often lose focus.`);
  const sc = { content: c5(content), ca: c5(ca), org: c5(org), lang: c5(lang) };
  return { a, sc, total: sc.content + sc.ca + sc.org + sc.lang, advice };
}
function fSpeakScore(text, secs) {
  const a = fAnalyse(text); const wpm = secs > 5 ? a.n / (secs / 60) : null; const advice = [];
  let gv = (a.b2.length >= 4 ? 2 : a.b2.length >= 1 ? 1 : 0) + (a.cx.length >= 5 ? 2 : a.cx.length >= 2 ? 1 : 0) + (a.ttr > .65 ? 1 : 0);
  let dm = (a.n >= 120 ? 2 : a.n >= 60 ? 1 : 0) + (a.link.length >= 4 ? 2 : a.link.length >= 2 ? 1 : 0) + (a.fill.length <= 2 ? 1 : 0);
  let fl = wpm == null ? null : wpm >= 110 ? 5 : wpm >= 95 ? 4 : wpm >= 80 ? 3 : wpm >= 60 ? 2 : 1;
  if (a.n < 60) advice.push("Speak for longer. Extend each answer with a reason and an example (because…, for example…).");
  if (a.link.length < 2) advice.push("Link your ideas: also, however, on the other hand, what's more, so.");
  if (a.b2.length < 2) advice.push("Use more B2 vocabulary and phrasal verbs from the Learn section.");
  if (a.cx.length < 2) advice.push("Try longer sentences with which, who, if, although or because.");
  if (a.fill.length > 2) advice.push("Reduce fillers (" + [...new Set(a.fill)].join(", ") + "). Use 'Let me think…' or 'That's an interesting question…' instead.");
  if (wpm != null && wpm < 80) advice.push("Your speed is slow for B2. Practise answering without long pauses: about 100–130 words a minute is natural.");
  if (a.rep.length) advice.push("You repeat: " + a.rep.join(", ") + ". Try synonyms.");
  const sc = { gv: c5(gv), dm: c5(dm), fl: fl == null ? null : c5(fl) };
  const vals = [sc.gv, sc.dm].concat(fl == null ? [] : [sc.fl]); const avg = vals.reduce((x, y) => x + y, 0) / vals.length;
  return { a, wpm, sc, avg, advice };
}
function fMeter(label, v, max) { return `<div class="meter"><span>${label}</span><div class="bar"><i style="width:${100 * v / max}%"></i></div><b>${v}/${max}</b></div>`; }
function fSpeakFb(id) {
  const tx = FS().lab["tx_" + id] || ""; const r = fSpeakScore(tx, FS().lab["sec_" + id] || 0);
  const lvl = r.avg >= 4.2 ? "C1" : r.avg >= 3 ? "B2" : r.avg >= 2 ? "B1" : "A2"; const cls = lvl === "C1" || lvl === "B2" ? "" : lvl === "B1" ? "mid" : "low";
  return `<div class="card res ${cls}"><div class="row" style="justify-content:space-between"><b>Feedback</b><span class="lvlbig">Estimated level <span class="lvl ${lvl === "A2" ? "A2" : lvl}">${lvl}</span></span></div>
  ${fMeter("Grammar and vocabulary", r.sc.gv, 5)}${fMeter("Discourse management", r.sc.dm, 5)}${r.sc.fl != null ? fMeter("Fluency (speed)", r.sc.fl, 5) : ""}
  <p class="sub">${r.a.n} words${r.wpm ? ` · ${Math.round(r.wpm)} words per minute` : ""} · linking words: ${r.a.link.length ? esc([...new Set(r.a.link)].join(", ")) : "none"} · B2 words: ${r.a.b2.length ? esc(r.a.b2.slice(0, 8).join(", ")) : "none found"}</p>
  ${r.advice.length ? `<b>What to improve</b><ul class="adv">${r.advice.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>Good range and length. Keep practising with a timer to stay fluent under pressure.</p>`}
  <p class="tip">This is an automatic estimate from your words and speed. It cannot judge pronunciation or grammar accuracy the way an examiner does.</p></div>`;
}

/* ---------- marking ---------- */
function fMatch(v, alts) { const x = fNorm(v).replace(/^(the|a|an) /, ""); return alts.some(a => { const y = fNorm(a).replace(/^(the|a|an) /, ""); return x === y; }); }
function fKwt(v, item) {
  const s = " " + fNorm(v) + " "; const kw = fNorm(item[1]);
  const wc = fWords(v).reduce((n, w) => n + (/'/.test(w) && !/'s$/.test(w) ? 2 : 1), 0);
  if (!s.includes(" " + kw + " ") || wc < 2 || wc > 5) return 0;
  let m = 0, pos = 0;
  for (const chunk of [item[3], item[4]]) { let hit = -1; for (const alt of chunk) { const i = s.indexOf(" " + fNorm(alt) + " ", pos); if (i >= 0) { hit = i + fNorm(alt).length; break; } } if (hit >= 0) { m++; pos = hit; } }
  return m;
}
function fMark(t, pk) {
  const key = fKey(t.n, pk.slice(0, 3), pk.slice(3)); const A = fA(key); const meta = FPM[pk]; const items = {}; let s = 0, m = 0;
  const one = (q, ok, pts) => { items[q] = ok; s += ok; m += pts; };
  if (pk === "rue1") t.r1.o.forEach((o, i) => one(1 + i, A[1 + i] === t.r1.a[i] ? 1 : 0, 1));
  if (pk === "rue2") t.r2.a.forEach((a, i) => one(9 + i, fMatch(A[9 + i], a) ? 1 : 0, 1));
  if (pk === "rue3") t.r3.a.forEach((a, i) => one(17 + i, fMatch(A[17 + i], a) ? 1 : 0, 1));
  if (pk === "rue4") t.r4.forEach((it, i) => one(25 + i, fKwt(A[25 + i], it), 2));
  if (pk === "rue5") t.r5.q.forEach((q, i) => one(31 + i, A[31 + i] === q[2] ? 2 : 0, 2));
  if (pk === "rue6") [...t.r6.a].forEach((a, i) => one(37 + i, A[37 + i] === a ? 2 : 0, 2));
  if (pk === "rue7") t.r7.q.forEach((q, i) => one(43 + i, A[43 + i] === q[1] ? 1 : 0, 1));
  if (pk === "lis1") t.l1.forEach((x, i) => one(1 + i, A[1 + i] === x[3] ? 1 : 0, 1));
  if (pk === "lis2") t.l2.q.forEach((q, i) => one(9 + i, fMatch(A[9 + i], q[1]) ? 1 : 0, 1));
  if (pk === "lis3") [...t.l3.a].forEach((a, i) => one(19 + i, A[19 + i] === a ? 1 : 0, 1));
  if (pk === "lis4") t.l4.q.forEach((q, i) => one(24 + i, A[24 + i] === q[2] ? 1 : 0, 1));
  FS().res[key] = { s, m, items, at: Date.now(), sk: meta.sk }; save();
}

/* ---------- part renderers ---------- */
const fRes = (t, p, k) => FS().res[fKey(t.n, p, k)];
const fMk = (r, q) => r ? (r.items[q] > 0 ? "ok" : "no") : "";
function fGapText(x, fn) { return x.replace(/\[(\d+)\]/g, (m, n) => fn(+n)); }
function fParas(arr) { return (Array.isArray(arr) ? arr : String(arr).split(/\n\n/)).map(p => `<p>${p}</p>`).join(""); }
function fSel(id, q, val, opts, cls) { return `<select class="gap ${cls}" id="${id}" data-fq="${q}" aria-label="Question ${q}"><option value="">(${q}) …</option>${opts.map(([v, l]) => `<option value="${v}" ${val === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select>`; }
function fInp(id, q, val, cls, w) { return `<input class="gap ${cls}" id="${id}" data-fq="${q}" value="${esc(val || "")}" aria-label="Question ${q}" autocomplete="off" autocapitalize="none" spellcheck="false" ${w ? `style="width:${w}"` : ""}>`; }
function fRadios(name, q, val, opts, r, correct) {
  return `<div class="opts" role="radiogroup" aria-label="Question ${q}">${opts.map((o, i) => { const L = fLet(i); const cls = r ? (L === correct ? "ok" : val === L ? "no" : "") : ""; return `<label class="${cls}"><input type="radio" name="${name}" value="${L}" data-fq="${q}" ${val === L ? "checked" : ""}><span><b>${L}</b> ${esc(o)}</span></label>`; }).join("")}</div>`;
}
function fRubric(t, pk) {
  const m = FPM[pk]; const [a, b] = m.r; const T = t;
  const R = {
    rue1: `For questions ${a}–${b}, read the text below and decide which answer (A, B, C or D) best fits each gap.`,
    rue2: `For questions ${a}–${b}, read the text below and think of the word which best fits each gap. Use only one word in each gap.`,
    rue3: `For questions ${a}–${b}, read the text below. Use the word given in capitals at the end of some of the lines to form a word that fits in the gap in the same line.`,
    rue4: `For questions ${a}–${b}, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. You must use between two and five words, including the word given.`,
    rue5: `You are going to read ${T.r5 && T.r5.k}. For questions ${a}–${b}, choose the answer (A, B, C or D) which you think fits best according to the text.`,
    rue6: `You are going to read ${T.r6 && T.r6.k}. Six sentences have been removed from the text. Choose from the sentences A–G the one which fits each gap (${a}–${b}). There is one extra sentence which you do not need to use.`,
    rue7: `You are going to read ${T.r7 && T.r7.k}. For questions ${a}–${b}, choose from the sections (A–D). The sections may be chosen more than once.`,
    lis1: `You will hear people talking in eight different situations. For questions ${a}–${b}, choose the best answer (A, B or C).`,
    lis2: `You will hear ${T.l2 && T.l2.k}. For questions ${a}–${b}, complete the sentences with a word or short phrase.`,
    lis3: `You will hear five short extracts in which people are talking about ${T.l3 && T.l3.k}. For questions ${a}–${b}, choose from the list (A–H) ${T.l3 && T.l3.w}. Use the letters only once. There are three extra letters which you do not need to use.`,
    lis4: `You will hear ${T.l4 && T.l4.k}. For questions ${a}–${b}, choose the best answer (A, B or C).`,
    wri1: `You must answer this question. Write your answer in 140–190 words in an appropriate style.`,
    wri2: `Write an answer to one of the questions 2–4 in this part. Write your answer in 140–190 words in an appropriate style.`,
    spk1: `Part 1 (about 2 minutes). The examiner asks each candidate some questions about themselves. Answer each question in two or three sentences.`,
    spk2: `Part 2 (about 4 minutes). Each candidate talks on their own for about 1 minute about two photographs, then comments for about 30 seconds on the other candidate's photographs.`,
    spk3: `Part 3 (about 4 minutes). Talk together for about 2 minutes about the question and the ideas given. Then you have about a minute to decide.`,
    spk4: `Part 4 (about 4 minutes). The examiner asks you both questions related to the topic of Part 3. Discuss them together and give full answers.`
  };
  return `<div class="rubric" role="note"><b>Instructions</b><p style="margin:0;max-width:72ch">${esc(R[pk])}</p>
    <p class="sub" style="margin:0">${esc(m.name)} · ${m.what ? esc(m.what) : ""}</p></div>
    <details class="tips card"><summary>Tips for Part ${pk.slice(3)}</summary><ul>${m.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>
    ${pk.startsWith("spk") ? "" : fTimer(`${t.n}-${pk}`, m.min * 60, `Suggested time: ${m.min} min`)}`;
}
function fPartActions(t, pk, r) {
  return `<div class="row"><button class="btn primary" type="button" data-fce="check" data-pk="${pk}">${r ? "Check again" : "Check answers"}</button>
  ${r ? `<button class="btn" type="button" data-fce="redo" data-pk="${pk}">Clear and try again</button>` : ""}</div>${r ? fPartFb(t, pk, r) : ""}`;
}
function fPartFb(t, pk, r) {
  const meta = FPM[pk]; const pct = r.m ? r.s / r.m : 0; const skRaw = pct * FSKMAX[meta.sk]; const sc = fScale(meta.sk, skRaw); const g = fGrade(sc);
  const adv = FADV[pk] || [];
  const msg = pct >= .8 ? "Excellent. This is above the B2 pass standard for this part." : pct >= .6 ? "Good. This is around the B2 pass standard (about 60%). A little more practice will make it secure." : pct >= .4 ? "Not yet at B2 for this part. Focus on the advice below and try again." : "This part needs a lot more practice. Start with the advice below.";
  return `<div class="card res ${pct >= .6 ? "" : pct >= .4 ? "mid" : "low"}" role="status">
    <div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="sub">Your score</div><div class="big">${r.s} / ${r.m}</div></div>
    <div class="lvlbig">Indicative level <span class="lvl ${g.c.includes("C1") ? "C1" : g.c === "B2" ? "B2" : g.c === "B1" ? "B1" : "A2"}">${esc(g.c)}</span></div></div>
    <p>${msg}</p>${pct < 1 ? `<b>What to improve</b><ul class="adv">${adv.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    <p class="tip">Correct answers are shown in green above. Level is an estimate: it treats this part as if it were the whole ${FSKNAME[meta.sk]} paper.</p></div>`;
}

function fRenderPart(t, pap, k) {
  const pk = pap + k; const key = fKey(t.n, pap, k); const A = fA(key); const r = FS().res[key]; const id = q => `fq-${t.n}-${pk}-${q}`;
  let h = fRubric(t, pk);
  if (pk === "rue1") {
    h += `<div class="card ftext"><h3>${esc(t.r1.t)}</h3>${fParas(fGapText(esc(t.r1.x), n => { const i = n - 1; return fSel(id(n), n, A[n], t.r1.o[i].map((o, j) => [fLet(j), fLet(j) + " " + o]), fMk(r, n)) + (r && r.items[n] === 0 ? `<span class="fix">${t.r1.a[i]} ${esc(t.r1.o[i]["ABCD".indexOf(t.r1.a[i])])}</span>` : ""); }))}</div>`;
  }
  if (pk === "rue2" || pk === "rue3") {
    const d = pk === "rue2" ? t.r2 : t.r3; const b = pk === "rue2" ? 9 : 17;
    h += `<div class="card ftext"><h3>${esc(d.t)}</h3>${fParas(fGapText(esc(d.x), n => fInp(id(n), n, A[n], fMk(r, n)) + (pk === "rue3" ? ` <span class="key">${esc(d.w[n - b])}</span>` : "") + (r && !r.items[n] ? `<span class="fix">${esc(d.a[n - b][0])}</span>` : "")))}</div>`;
  }
  if (pk === "rue4") {
    h += `<div class="card">${t.r4.map((it, i) => { const q = 25 + i; const parts = it[2].split("____"); return `<div class="kwt"><span><span class="qn">${q}</span> ${esc(it[0])}</span><span class="kw">${esc(it[1])}</span><span>${esc(parts[0])}${fInp(id(q), q, A[q], r ? (r.items[q] === 2 ? "ok" : "no") : "", "min(18em,100%)")}${esc(parts[1] || "")}</span>${r ? `<span class="sub">${r.items[q]}/2 · Model answer: <b>${esc(it[3][0] + " " + it[4][0])}</b></span>` : ""}</div>`; }).join("")}</div>`;
  }
  if (pk === "rue5") {
    h += `<div class="card ftext"><h3>${esc(t.r5.t)}</h3>${fParas(t.r5.x.map(esc))}</div><div class="card">${t.r5.q.map((q, i) => { const n = 31 + i; return `<div class="fq"><div class="stem"><span class="qn">${n}</span> ${esc(q[0])}</div>${fRadios(id(n), n, A[n], q[1], r, q[2])}</div>`; }).join("")}</div>`;
  }
  if (pk === "rue6") {
    h += `<div class="card ftext"><h3>${esc(t.r6.t)}</h3>${fParas(t.r6.x.map(p => fGapText(esc(p), n => fSel(id(n), n, A[n], t.r6.o.map((o, j) => [fLet(j), fLet(j)]), fMk(r, n)) + (r && !r.items[n] ? `<span class="fix">${t.r6.a[n - 37]}</span>` : ""))))}</div>
    <div class="card"><h3 style="margin-bottom:8px">Sentences A–G</h3><div class="sents">${t.r6.o.map((o, j) => `<div><b>${fLet(j)}</b>${esc(o)}</div>`).join("")}</div></div>`;
  }
  if (pk === "rue7") {
    h += `<div class="card"><h3>${esc(t.r7.t)}</h3>${t.r7.i ? `<p class="sub">${esc(t.r7.i)}</p>` : ""}${t.r7.q.map((q, i) => { const n = 43 + i; return `<div class="mq"><span class="qn">${n}</span><label for="${id(n)}">${esc(q[0])}</label>${fSel(id(n), n, A[n], t.r7.s.map((s, j) => [fLet(j), fLet(j)]), fMk(r, n))}${r && !r.items[n] ? `<span></span><span></span><span class="fix">${q[1]}</span>` : ""}</div>`; }).join("")}</div>
    <div class="secs">${t.r7.s.map((s, j) => `<div class="card ftext"><h3>${fLet(j)} · ${esc(s[0])}</h3>${fParas([esc(s[1])])}</div>`).join("")}</div>`;
  }
  if (pk === "lis1") {
    h += t.l1.map((x, i) => { const n = 1 + i; return `<div class="extr"><div class="stem"><span class="qn">${n}</span> ${esc(x[0])}</div>${fPlayBtn(`${t.n}-l1-${n}`)}${fRadios(id(n), n, A[n], x[2], r, x[3])}${r ? `<details><summary class="sub">Transcript</summary>${fScript(x[1])}</details>` : ""}</div>`; }).join("");
  }
  if (pk === "lis2") {
    h += `<div class="card">${fPlayBtn(`${t.n}-l2`)}<h3 style="margin:12px 0 4px">${esc(t.l2.t)}</h3>${t.l2.q.map((q, i) => { const n = 9 + i; const p = q[0].split("___"); return `<div class="kwt"><span><span class="qn">${n}</span> ${esc(p[0])}${fInp(id(n), n, A[n], fMk(r, n), "min(14em,100%)")}${esc(p[1] || "")}</span>${r && !r.items[n] ? `<span class="fix">${esc(q[1][0])}</span>` : ""}</div>`; }).join("")}
    ${r ? `<details><summary class="sub">Transcript</summary>${fScript(t.l2.s, t.l2.nm)}</details>` : ""}</div>`;
  }
  if (pk === "lis3") {
    h += `<div class="card">${fPlayBtn(`${t.n}-l3`)}<div class="sents" style="margin:12px 0">${t.l3.o.map((o, j) => `<div><b>${fLet(j)}</b>${esc(o)}</div>`).join("")}</div>
    ${[0, 1, 2, 3, 4].map(i => { const n = 19 + i; return `<div class="mq"><span class="qn">${n}</span><label for="${id(n)}">Speaker ${i + 1}</label>${fSel(id(n), n, A[n], t.l3.o.map((o, j) => [fLet(j), fLet(j)]), fMk(r, n))}${r && !r.items[n] ? `<span></span><span></span><span class="fix">${t.l3.a[i]}</span>` : ""}</div>`; }).join("")}
    ${r ? `<details><summary class="sub">Transcript</summary>${t.l3.s.map((s, i) => `<p class="sub" style="margin:8px 0 2px">Speaker ${i + 1}</p>${fScript(s)}`).join("")}</details>` : ""}</div>`;
  }
  if (pk === "lis4") {
    h += `<div class="card">${fPlayBtn(`${t.n}-l4`)}${t.l4.q.map((q, i) => { const n = 24 + i; return `<div class="fq"><div class="stem"><span class="qn">${n}</span> ${esc(q[0])}</div>${fRadios(id(n), n, A[n], q[1], r, q[2])}</div>`; }).join("")}
    ${r ? `<details><summary class="sub">Transcript</summary>${fScript(t.l4.s, t.l4.nm)}</details>` : ""}</div>`;
  }
  if (pap === "rue" || pap === "lis") h += fPartActions(t, pk, r);
  if (pk === "wri1") h += fWriteTask(t, 1, fWTask(t, 1));
  if (pk === "wri2") {
    const ch = FS().w[`t${t.n}c`] || 0;
    h += `<div class="card"><b>Choose one question</b><div class="opts" style="margin-top:8px">${t.w2.map((w, i) => `<label class="${ch === i ? "ok" : ""}" style="display:flex;gap:10px;border:1px solid var(--line);border-radius:8px;padding:10px 12px;cursor:pointer"><input type="radio" name="w2c-${t.n}" value="${i}" data-fce-w2="${i}" ${ch === i ? "checked" : ""}><span><b>Question ${i + 2} · ${esc(w[0][0].toUpperCase() + w[0].slice(1))}</b><br>${esc(w[1])}</span></label>`).join("")}</div></div>`;
    h += fWriteTask(t, 2, fWTask(t, 2));
  }
  if (pk === "spk1") h += `<div class="card"><b>Questions</b><ol class="notes">${t.s1.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>${fTimerSpeak(t, pk, [120, 40])}${fDictBox(`t${t.n}s1`, "Choose a question, press Record and answer it in two or three sentences.")}`;
  if (pk === "spk2") h += t.s2.map((s, i) => `<div class="card"><b>Candidate ${i ? "B" : "A"}</b><p style="font-weight:600;margin:8px 0">${esc(s.task)}</p><p class="sub" style="margin-bottom:10px">${esc(s.top)}</p>
    <div class="photos">${[1, 2].map(j => fPhoto(t, `s${i}${j}`, s["d" + j])).join("")}</div>
    <p class="sub" style="margin-top:10px">Partner's question (about 30 seconds): ${esc(s.f)}</p></div>`).join("") + fTimerSpeak(t, pk, [60, 30]) + fDictBox(`t${t.n}s2`, "Compare the photos and answer the question for one minute. Start the 1:00 timer, then press Record.");
  if (pk === "spk3") h += `<div class="card"><div class="mind"><div class="ctr">${esc(t.s3.q)}</div>${t.s3.p.map(p => `<span class="pt">${esc(p)}</span>`).join("")}</div><p style="margin-top:12px"><b>Decision (1 minute):</b> ${esc(t.s3.d)}</p></div>` + fTimerSpeak(t, pk, [120, 60]) + fDictBox(`t${t.n}s3`, "Practise your side of the discussion: give your opinion on two or three ideas, and ask your partner's opinion.");
  if (pk === "spk4") h += `<div class="card"><b>Questions</b><ol class="notes">${t.s4.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>${fTimerSpeak(t, pk, [60, 240])}${fDictBox(`t${t.n}s4`, "Answer one question for about one minute with reasons and examples.")}`;
  return h;
}
function fWTask(t, part) { if (part === 1) return { kind: "essay", notes: t.w1.notes, title: t.w1.q }; const w = t.w2[FS().w[`t${t.n}c`] || 0]; return { kind: w[0], title: w[1], reg: /report|formal/.test(w[0] + (w[2] || "")) ? "formal" : "" }; }
function fTimerSpeak(t, pk, presets) { return fTimer(`${t.n}-${pk}-say`, presets[0], "Speaking timer", presets); }
function fPhoto(t, slot, desc) {
  const P = (window.FCE_PHOTOS || {})[`t${t.n}${slot}`];
  return `<figure>${P ? `<img src="${P.src}" alt="${esc(desc)}" loading="lazy" width="600" height="400"><figcaption>Photo by ${P.page ? `<a href="${esc(P.page)}">${esc(P.by)}</a>` : esc(P.by)} on Unsplash</figcaption>` : `<div class="ph-d">${esc(desc)}</div>`}</figure>`;
}
function fWriteTask(t, part, task) {
  const k = `t${t.n}w${part}${part === 2 ? "_" + (FS().w[`t${t.n}c`] || 0) : ""}`; const txt = FS().w[k] || ""; const n = fWords(txt).length; const fb = FS().w[k + "_fb"];
  let h = `<div class="card wtask">${part === 1 ? `<p>In your English class you have been talking about the topic below. Now your English teacher has asked you to write an essay. Write an essay using all the notes and give reasons for your point of view.</p>
    <p style="font-family:var(--display);font-weight:700;font-size:1.1rem">${esc(task.title)}</p><b>Notes</b><span class="sub">Write about:</span><ol class="notes">${task.notes.map(x => `<li>${esc(x)}</li>`).join("")}<li>…………… (your own idea)</li></ol>` : ""}
    <label for="wt-${k}"><b>Your answer</b></label><textarea id="wt-${k}" data-wk="${k}" lang="en" spellcheck="true" placeholder="Write 140–190 words">${esc(txt)}</textarea>
    <div class="wc"><span id="wc-${k}">${n} words${n && n < 140 ? ` · <span class="warn">${140 - n} more to reach 140</span>` : n > 190 ? ` · <span class="warn">${n - 190} over 190</span>` : n ? " · within 140–190" : ""}</span></div>
    <div class="row"><button class="btn primary" type="button" data-fce="wfb" data-wk="${k}" data-part="${part}">Get feedback</button></div></div>`;
  if (fb) h += fWriteFb(fWriteScore(txt, task));
  h += `<details class="tips card"><summary>Useful language for this task</summary>${fUseful(task.kind)}</details>`;
  return h;
}
function fWriteFb(sc) {
  const s = sc.total; const lvl = s >= 17 ? "C1" : s >= 12 ? "B2" : s >= 8 ? "B1" : "A2"; const cls = s >= 12 ? "" : s >= 8 ? "mid" : "low";
  return `<div class="card res ${cls}" role="status"><div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="sub">Estimated mark</div><div class="big">${s} / 20</div></div><span class="lvlbig">Estimated level <span class="lvl ${lvl}">${lvl}</span></span></div>
  ${fMeter("Content", sc.sc.content, 5)}${fMeter("Communicative achievement", sc.sc.ca, 5)}${fMeter("Organisation", sc.sc.org, 5)}${fMeter("Language", sc.sc.lang, 5)}
  <p class="sub">${sc.a.n} words · ${sc.a.paras} paragraphs · linking words: ${sc.a.link.length ? esc([...new Set(sc.a.link)].join(", ")) : "none"} · B2 vocabulary: ${sc.a.b2.length ? esc(sc.a.b2.slice(0, 10).join(", ")) : "none found"}</p>
  ${sc.advice.length ? `<b>What to improve</b><ul class="adv">${sc.advice.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>Well organised, the right length and a good range. Ask your teacher to check grammar accuracy.</p>`}
  <p class="tip">Cambridge examiners mark four areas from 0 to 5. This automatic estimate checks length, task points, style, organisation and range, but it cannot spot grammar or spelling mistakes. Your teacher's mark is the real one.</p></div>`;
}
function fUseful(kind) {
  const U = {
    essay: ["Introduction: It is often said that… / Many people believe that…", "Adding: Moreover, … / What is more, … / In addition, …", "Contrast: However, … / On the other hand, … / Although…", "Example: For instance, … / A good example of this is…", "Conclusion: In conclusion, … / All things considered, I believe that…"],
    article: ["Title: a question or a surprising phrase", "Opening: Have you ever wondered…? / Imagine…", "Talk to the reader: you, your, Why not…?", "Lively words: amazing, unforgettable, it's well worth…", "Ending: So next time…, why not give it a try?"],
    email: ["Opening: Hi Sam, / Dear Mr Brown,", "Reason: I'm writing to… / Thanks for your email about…", "Answering: As for your question about…, / You asked me about…", "Suggesting: Why don't you…? / How about…? / I'd recommend…", "Closing: Write back soon, / Best wishes, / Kind regards, / Yours sincerely,"],
    letter: ["Opening: Dear Sir or Madam, / Dear Ms Lee,", "Reason: I am writing to apply for… / I am writing with regard to…", "Experience: I have experience of… / I believe I would be suitable because…", "Closing: I look forward to hearing from you. / Yours faithfully, / Yours sincerely,"],
    report: ["Headings: Introduction · Current situation · Problems · Recommendations", "Purpose: The aim of this report is to… / This report outlines…", "Facts: According to…, most students… / It was found that…", "Recommendations: I would recommend that… / It would be advisable to…"],
    review: ["Introduction: what you are reviewing and where/when", "Description: It is set in… / The story follows… / The menu includes…", "Opinion: What impressed me most was… / The only drawback is…", "Recommendation: I would highly recommend it to… / It is not suitable for…"]
  };
  return `<ul>${(U[kind] || U.essay).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
}

/* ---------- results summary ---------- */
function fPaperRaw(t, pap) {
  const R = FS().res; const out = {}; const done = [];
  if (pap === "rue") { let rd = 0, ue = 0, nr = 0, nu = 0; [1, 5, 6, 7].forEach(k => { const r = R[fKey(t.n, "rue", k)]; if (r) { rd += r.s; nr++; done.push(k); } }); [2, 3, 4].forEach(k => { const r = R[fKey(t.n, "rue", k)]; if (r) { ue += r.s; nu++; done.push(k); } }); if (nr === 4) out.read = rd; if (nu === 3) out.uoe = ue; out.partial = { read: [rd, nr, 4], uoe: [ue, nu, 3] }; }
  if (pap === "lis") { let s = 0, n = 0; [1, 2, 3, 4].forEach(k => { const r = R[fKey(t.n, "lis", k)]; if (r) { s += r.s; n++; done.push(k); } }); if (n === 4) out.lis = s; out.partial = { lis: [s, n, 4] }; }
  if (pap === "wri") { const a = FS().w; const c = a[`t${t.n}c`] || 0; const p1 = a[`t${t.n}w1_fb`] ? fWriteScore(a[`t${t.n}w1`] || "", fWTask(t, 1)).total : null; const p2 = a[`t${t.n}w2_${c}_fb`] ? fWriteScore(a[`t${t.n}w2_${c}`] || "", fWTask(t, 2)).total : null; if (p1 != null) done.push(1); if (p2 != null) done.push(2); if (done.length === 2) out.wri = p1 + p2; out.partial = { wri: [(p1 || 0) + (p2 || 0), done.length, 2] }; }
  if (pap === "spk") { const L = FS().lab; const vals = [1, 2, 3, 4].map(k => L[`fb_t${t.n}s${k}`] ? fSpeakScore(L[`tx_t${t.n}s${k}`] || "", L[`sec_t${t.n}s${k}`] || 0).avg : null).filter(v => v != null); if (vals.length) { const avg = vals.reduce((x, y) => x + y, 0) / vals.length; out.spk = Math.round(avg / 5 * 60); } vals.forEach((v, i) => done.push(i + 1)); out.partial = { spk: [out.spk || 0, vals.length, 4] }; }
  out.done = done; return out;
}
function fSummary(t) {
  const rows = []; const scs = [];
  const add = (sk, raw) => { const sc = fScale(sk, raw); const g = fGrade(sc); scs.push(sc || 120); rows.push(`<tr><td>${FSKNAME[sk]}</td><td>${Math.round(raw)} / ${FSKMAX[sk]}</td><td>${sc || "below 122"}</td><td>${esc(g.c)}</td></tr>`); };
  const rue = fPaperRaw(t, "rue"), lis = fPaperRaw(t, "lis"), wri = fPaperRaw(t, "wri"), spk = fPaperRaw(t, "spk");
  if (rue.read != null) add("read", rue.read); if (rue.uoe != null) add("uoe", rue.uoe); if (wri.wri != null) add("wri", wri.wri); if (lis.lis != null) add("lis", lis.lis); if (spk.spk != null) add("spk", spk.spk);
  const missing = []; if (rue.read == null) missing.push("Reading (Parts 1, 5, 6, 7)"); if (rue.uoe == null) missing.push("Use of English (Parts 2, 3, 4)"); if (wri.wri == null) missing.push("Writing (both parts with feedback)"); if (lis.lis == null) missing.push("Listening (all 4 parts)"); if (spk.spk == null) missing.push("Speaking (at least one part with feedback)");
  const overall = scs.length === 5 ? Math.round(scs.reduce((x, y) => x + y, 0) / 5) : null; const g = overall ? fGrade(overall) : null;
  const weak = []; ["rue1", "rue2", "rue3", "rue4", "rue5", "rue6", "rue7", "lis1", "lis2", "lis3", "lis4"].forEach(pk => { const r = FS().res[fKey(t.n, pk.slice(0, 3), pk.slice(3))]; if (r && r.m && r.s / r.m < .6) weak.push(pk); });
  return `<div class="card res ${g ? g.cls : "mid"}"><h2>Test ${t.n} results</h2>
    ${rows.length ? `<div class="tblwrap"><table class="ftab"><thead><tr><th>Skill</th><th>Marks</th><th>Cambridge scale (approx.)</th><th>Level</th></tr></thead><tbody>${rows.join("")}</tbody></table></div>` : `<p class="sub">Check your answers in each part to see your results here.</p>`}
    ${overall ? `<div class="row" style="gap:16px;align-items:flex-end"><div><div class="sub">Overall (approx.)</div><div class="big">${overall}</div></div><span class="lvlbig">${esc(g.g)} · <span class="lvl ${g.c.includes("C1") ? "C1" : g.c === "B2" ? "B2" : g.c === "B1" ? "B1" : "A2"}">${esc(g.c)}</span></span></div><p>${overall >= 160 ? "This is a B2 First pass. " + (overall >= 180 ? "Grade A: you are working at C1 level." : "Keep going to secure a higher grade.") : overall >= 140 ? "Not yet a pass: you would receive a B1 certificate. Focus on the weakest skill first." : "Below B1. Build vocabulary and grammar with the Learn section before full tests."}</p>` : missing.length < 5 ? `<p class="sub">Still to do for an overall score: ${esc(missing.join(" · "))}</p>` : ""}
    ${weak.length ? `<b>Parts to work on</b><ul class="adv">${weak.map(pk => `<li>${esc(FPAPERS.find(p => p.k === pk.slice(0, 3)).s)} Part ${pk.slice(3)} (${esc(FPM[pk].name)}): ${esc((FADV[pk] || [""])[0])}</li>`).join("")}</ul>` : ""}
    <p class="tip">Scores use Cambridge's published practice-test conversion points (160 = B2 pass, 180 = Grade A), with straight-line estimates between them. Writing and Speaking marks are automatic estimates.</p></div>`;
}

/* ---------- learn ---------- */
function fShuffle(a, seed) { const b = a.slice(); let s = seed || Date.now(); for (let i = b.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function fLearnQuiz(kind) {
  const L = FCE.learn; const f = FS(); const seed = Date.now(); let qs = [];
  if (kind === "pv") qs = fShuffle(L.pv, seed).slice(0, 10).map((r, i) => { const others = fShuffle(L.pv.filter(x => x[0] !== r[0]), seed + i).slice(0, 3).map(x => x[0]); const o = fShuffle([r[0], ...others], seed + 7 * i); return { q: r[2].replace(r[3], "_____") + " (use the right form)", h: r[1], o, a: o.indexOf(r[0]) }; });
  if (kind === "ex") qs = fShuffle(L.ex, seed).slice(0, 10).map((r, i) => { const others = fShuffle(L.ex.filter(x => x[0] !== r[0]), seed + i).slice(0, 3).map(x => x[0]); const o = fShuffle([r[0], ...others], seed + 5 * i); return { q: "Which expression means: " + r[1] + "?", h: r[2], o, a: o.indexOf(r[0]) }; });
  if (kind === "wf") qs = fShuffle(L.wfq, seed).slice(0, 10).map(r => ({ q: r[0], h: r[1], t: true, a: r[2] }));
  if (kind === "up") qs = fShuffle(L.up.filter(r => r.length > 2), seed).slice(0, 10).map((r, i) => { const right = r[2]; const wrongs = fShuffle(L.up.filter(x => x[0] !== r[0]), seed + i).slice(0, 3).map(x => x[2]); const o = fShuffle([right, ...wrongs], seed + 3 * i); return { q: `Choose the B2 word that can replace “${r[0]}”${r[1] ? ` (B1: ${r[1]})` : ""}.`, h: r[0], o, a: o.indexOf(right) }; });
  f.lq[kind] = { qs, ans: {}, done: false }; save();
}
function fLearnFb(score, n) {
  const p = score / n; const lvl = p >= .9 ? "C1" : p >= .7 ? "B2" : p >= .5 ? "B1" : "A2"; const cls = p >= .7 ? "" : p >= .5 ? "mid" : "low";
  return `<div class="card res ${cls}" role="status"><div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="sub">Score</div><div class="big">${score} / ${n}</div></div><span class="lvlbig">Indicative level <span class="lvl ${lvl}">${lvl}</span></span></div>
  <p>${p >= .9 ? "Excellent. You know these well; move on to a full practice test." : p >= .7 ? "Good, B2 standard. Review the ones you missed and try a new set." : p >= .5 ? "Getting there. Study the list above for ten minutes, then try again." : "These need more study. Read the list above with the examples, then try again tomorrow."}</p></div>`;
}
function fRenderLearn() {
  const L = FCE.learn; const f = FS(); if (!L) return `<p class="sub">Loading…</p>`;
  const tabs = [["dict", "Dictionary"], ["pv", "Phrasal verbs"], ["ex", "Expressions"], ["wf", "Word formation"], ["up", "A2 → B2 words"]];
  let h = `<div class="seg sm" role="group" aria-label="Learning topics">${tabs.map(([k, l]) => `<button class="chip" type="button" data-fce="lt" data-v="${k}" aria-pressed="${f.lt === k}">${l}</button>`).join("")}</div>`;
  if (f.lt === "dict") return h + `<div data-dict-mount="fce" style="margin-top:12px">${window.DICT ? DICT.html("fce") : `<p class="sub">Loading the dictionary…</p>`}</div>`;
  const q = f.lq[f.lt];
  h += `<div class="card"><div class="row" style="justify-content:space-between"><h2>Practice</h2><button class="btn primary" type="button" data-fce="lq-new">${q ? "New set of 10" : "Start 10 questions"}</button></div>`;
  if (q) {
    h += q.qs.map((x, i) => { const v = q.ans[i]; const ok = q.done ? (x.t ? fMatch(v, String(x.a).split("/")) : +v === x.a) : null; return `<div class="fq"><div class="stem"><span class="qn">${i + 1}</span> ${esc(x.q)}</div>${x.h && f.lt !== "pv" && f.lt !== "up" ? `<span class="sub">${esc(x.h)}</span>` : f.lt === "pv" ? `<span class="sub">Meaning: ${esc(x.h)}</span>` : ""}
      ${x.t ? `<span>${fInp(`lq-${i}`, i, v, q.done ? (ok ? "ok" : "no") : "", "min(16em,100%)").replace('data-fq', 'data-lq')}${q.done && !ok ? `<span class="fix">${esc(String(x.a).replace("/", " / "))}</span>` : ""}</span>` : `<div class="opts">${x.o.map((o, j) => `<label class="${q.done ? (j === x.a ? "ok" : +v === j ? "no" : "") : ""}"><input type="radio" name="lq-${i}" value="${j}" data-lq="${i}" ${+v === j && v !== undefined ? "checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div>`}</div>`; }).join("");
    const score = q.qs.reduce((n, x, i) => n + ((x.t ? fMatch(q.ans[i], String(x.a).split("/")) : +q.ans[i] === x.a && q.ans[i] !== undefined) ? 1 : 0), 0);
    h += `<div class="row"><button class="btn primary" type="button" data-fce="lq-check">Check answers</button></div>${q.done ? fLearnFb(score, q.qs.length) : ""}`;
  } else h += `<p class="sub">Ten questions from the list below, with your score and an indicative level.</p>`;
  h += `</div>`;
  const s = (f.lsearch || "").toLowerCase();
  h += `<div class="card"><div class="row" style="justify-content:space-between"><h2>Study list</h2><input class="search" id="fl-search" type="search" placeholder="Search" aria-label="Search the list" value="${esc(f.lsearch || "")}" style="max-width:260px"></div><div id="fl-list">${fLearnList(s)}</div></div>`;
  return h;
}
function fLearnList(s) {
  const L = FCE.learn; const f = FS(); const m = x => !s || x.join(" ").toLowerCase().includes(s);
  if (f.lt === "pv") { const g = {}; L.pv.filter(m).forEach(r => (g[r[0].split(" ")[0]] = g[r[0].split(" ")[0]] || []).push(r)); return Object.keys(g).sort().map(k => `<h3 style="margin:14px 0 4px;text-transform:capitalize">${esc(k)}</h3>${g[k].map(r => `<div class="lcard"><b lang="en">${esc(r[0])}</b><span>${esc(r[1])}</span><span class="ex" lang="en">${esc(r[2])}</span></div>`).join("")}`).join("") || `<p class="sub">No matches.</p>`; }
  if (f.lt === "ex") return L.ex.filter(m).map(r => `<div class="lcard"><b lang="en">${esc(r[0])}</b><span>${esc(r[1])}</span><span class="ex" lang="en">${esc(r[2])}</span></div>`).join("") || `<p class="sub">No matches.</p>`;
  if (f.lt === "wf") return `<h3 style="margin-bottom:6px">Rules</h3>${L.wfr.map(r => `<div class="lcard"><b>${esc(r[0])}</b><span>${esc(r[1])}</span><span class="ex">${esc(r[2])}</span></div>`).join("")}<h3 style="margin:16px 0 6px">Word families</h3><div class="tblwrap"><table class="ftab"><thead><tr><th>Word</th><th>Noun(s)</th><th>Adjective(s)</th><th>Adverb</th><th>Opposite</th></tr></thead><tbody>${L.wf.filter(m).map(r => `<tr>${r.map(c => `<td lang="en">${esc(c || "–")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  if (f.lt === "up") return `<p class="sub" style="margin-bottom:8px">Each row goes from a simple A2 word to stronger B1 and B2 choices. Examiners reward the B2 ones when they fit.</p>${L.up.filter(m).map(r => `<div class="lcard"><div class="ladder"><span class="a2">${esc(r[0])}</span>→${r[1] ? `<span class="b1">${esc(r[1])}</span>→` : ""}${r.slice(2).map(w => `<span class="b2">${esc(w)}</span>`).join(" ")}</div></div>`).join("")}`;
  return "";
}

/* ---------- guide ---------- */
function fRenderGuide() {
  const rows = [["Reading and Use of English", "1 h 15 min", "7 parts · 52 questions", "Reading 42 marks + Use of English 28 marks"], ["Writing", "1 h 20 min", "2 parts", "40 marks (20 per part)"], ["Listening", "about 40 min", "4 parts · 30 questions", "30 marks"], ["Speaking", "14 min (in pairs)", "4 parts", "60 marks (examiner's scales)"]];
  let h = `<div class="card"><h2>The exam at a glance</h2><div class="tblwrap"><table class="ftab"><thead><tr><th>Paper</th><th>Time</th><th>Parts</th><th>Marks</th></tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <p class="sub" style="margin-top:8px">Each of the five skills (Reading, Use of English, Writing, Listening, Speaking) gets its own score on the Cambridge English Scale, and the overall score is their average.</p></div>
  <div class="card"><h2>Scores and grades</h2><div class="tblwrap"><table class="ftab"><thead><tr><th>Cambridge English Scale</th><th>Result</th><th>CEFR</th></tr></thead><tbody><tr><td>180–190</td><td>Grade A</td><td>C1</td></tr><tr><td>173–179</td><td>Grade B</td><td>B2</td></tr><tr><td>160–172</td><td>Grade C</td><td>B2</td></tr><tr><td>140–159</td><td>Level B1 certificate</td><td>B1</td></tr></tbody></table></div><p class="sub" style="margin-top:8px">A B2 First pass is about 60% of the marks.</p></div>`;
  FPAPERS.forEach(p => {
    h += `<div class="card"><h2>${esc(p.n)} <span class="sub" style="font-family:var(--body);font-size:.9rem;font-weight:500">${esc(p.time)}</span></h2>${Array.from({ length: p.parts }, (_, i) => { const pk = p.k + (i + 1); const m = FPM[pk]; return `<details class="tips" style="border-top:1px solid var(--line);padding:10px 0"><summary>Part ${i + 1} · ${esc(m.name)} <span class="sub">(${m.r[0] === m.r[1] && p.k !== "wri" ? "" : p.k === "wri" ? (i ? "Questions 2–4" : "Question 1") + " · " : `Questions ${m.r[0]}–${m.r[1]} · `}about ${m.min} min)</span></summary><p style="margin:8px 0;max-width:70ch">${esc(m.what)}</p><ul>${m.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>`; }).join("")}</div>`;
  });
  return h;
}

/* ---------- main render ---------- */
function renderFCE() {
  const el = document.getElementById("v-fce"); if (!el) return; const f = FS();
  const tabs = [["guide", "Exam guide"], ["tests", "Practice tests"], ["learn", "Learn"], ["lab", "Speaking lab"]];
  let h = `<div class="head fce-hero"><div><h1>B2 First (FCE) preparation</h1><p class="credit">Cambridge B2 First practice · Created by Teacher Dario</p></div></div>
  <div class="seg" role="group" aria-label="B2 First sections">${tabs.map(([k, l]) => `<button class="chip" type="button" data-fce="tab" data-v="${k}" aria-pressed="${f.tab === k}">${l}</button>`).join("")}</div>`;
  if (f.tab === "guide") h += fRenderGuide();
  if (f.tab === "learn") h += fRenderLearn();
  if (f.tab === "lab") h += fRenderLab();
  if (f.tab === "tests") h += f.view === "test" && fT(f.test) ? fRenderTest(fT(f.test)) : fRenderTestList();
  el.innerHTML = h; fPlayUi(); fDictUi(); fLiveRate();
}
function fRenderTestList() {
  if (!FCE.tests.length) return `<p class="sub">Tests are loading…</p>`;
  return `<p class="sub">Ten complete practice tests. Each has all four papers with original-style instructions, tips, timers and automatic feedback.</p><div class="fgrid">${FCE.tests.map(t => {
    const P = (window.FCE_PHOTOS || {})[`t${t.n}c`]; const st = ["rue", "lis", "wri", "spk"].map(p => { const r = fPaperRaw(t, p); const tot = p === "rue" ? 7 : p === "lis" ? 4 : p === "wri" ? 2 : 4; return `<span class="pbadge ${r.done.length === tot ? "ok" : ""}">${p === "rue" ? "R&UoE" : p === "lis" ? "L" : p === "wri" ? "W" : "S"} ${r.done.length}/${tot}</span>`; }).join("");
    return `<button class="tcard" type="button" data-fce="open" data-n="${t.n}"><div class="ph ${P ? "has" : ""}">${P ? `<img src="${P.src}" alt="" loading="lazy" width="600" height="400">` : esc(t.theme)}</div><span class="tt">Test ${t.n}</span><span class="tm">${esc(t.theme)}</span><span class="pp">${st}</span></button>`;
  }).join("")}</div>`;
}
function fRenderTest(t) {
  const f = FS(); const pap = FPAPERS.find(p => p.k === f.paper) || FPAPERS[0]; const k = Math.min(f.part, pap.parts);
  let h = `<div class="row" style="justify-content:space-between"><button class="btn ghost" type="button" data-fce="list">← All tests</button><span class="row">${FCE.tests.map(x => `<button class="chip" type="button" data-fce="open" data-n="${x.n}" aria-pressed="${x.n === t.n}" style="min-height:32px;padding:4px 10px">${x.n}</button>`).join("")}</span></div>
  <div class="head"><div><h1 style="font-size:1.5rem">Test ${t.n} · ${esc(t.theme)}</h1><p class="sub">${esc(pap.n)} · ${esc(pap.time)}</p></div></div>
  <div class="seg" role="group" aria-label="Papers">${FPAPERS.map(p => `<button class="chip" type="button" data-fce="paper" data-v="${p.k}" aria-pressed="${p.k === pap.k}">${esc(p.s)}</button>`).join("")}</div>
  ${pap.k !== "spk" ? fTimer(`${t.n}-${pap.k}-paper`, pap.k === "rue" ? 4500 : pap.k === "lis" ? 2400 : 4800, `Whole paper (${pap.time})`) : ""}
  <div class="partbar" role="group" aria-label="Parts">${Array.from({ length: pap.parts }, (_, i) => { const r = FS().res[fKey(t.n, pap.k, i + 1)]; const wdone = pap.k === "wri" && FS().w[`t${t.n}w${i + 1}${i ? "_" + (FS().w[`t${t.n}c`] || 0) : ""}_fb`]; const sdone = pap.k === "spk" && FS().lab[`fb_t${t.n}s${i + 1}`]; return `<button class="chip" type="button" data-fce="part" data-v="${i + 1}" aria-pressed="${i + 1 === k}">Part ${i + 1}${r ? ` <span class="n">${r.s}/${r.m}</span>` : wdone || sdone ? ` <span class="n">✓</span>` : ""}</button>`; }).join("")}</div>
  ${fRenderPart(t, pap.k, k)}
  <div class="row" style="justify-content:space-between">${k > 1 ? `<button class="btn" type="button" data-fce="part" data-v="${k - 1}">← Part ${k - 1}</button>` : "<span></span>"}${k < pap.parts ? `<button class="btn primary" type="button" data-fce="part" data-v="${k + 1}">Part ${k + 1} →</button>` : ""}</div>
  ${fSummary(t)}`;
  return h;
}
function fRenderLab() {
  const f = FS(); const all = []; FCE.tests.forEach(t => { (t.s1 || []).forEach(q => all.push(["Part 1", q])); (t.s4 || []).forEach(q => all.push(["Part 4", q])); });
  if (f.lab.qi == null || f.lab.qi >= all.length) f.lab.qi = 0; const cur = all[f.lab.qi] || ["", "Talk about your favourite place in your town."];
  return `<div class="card"><h2>Speaking lab</h2><p class="sub" style="max-width:70ch">Answer exam-style questions out loud. The dictation tool writes down what you say and gives feedback on length, speed, linking words and B2 vocabulary.</p></div>
  <div class="card"><div class="row" style="justify-content:space-between"><b>${esc(cur[0])} question</b><button class="btn" type="button" data-fce="lab-next">Another question</button></div><p style="font-family:var(--read);font-size:1.3rem;margin:10px 0">${esc(cur[1])}</p></div>
  ${fTimer("lab", 60, "Speaking timer", [30, 60, 120, 240])}
  ${fDictBox("lab", "", "Your words appear here. You can also type or correct them.")}`;
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-fce]"); if (!b) return; const f = FS(); const a = b.dataset.fce; const t = fT(f.test);
  if (a === "tab") { f.tab = b.dataset.v; save(); fStop(); renderFCE(); }
  else if (a === "open") { f.tab = "tests"; f.view = "test"; f.test = +b.dataset.n; save(); fStop(); renderFCE(); window.scrollTo(0, 0); }
  else if (a === "list") { f.view = "list"; save(); fStop(); renderFCE(); }
  else if (a === "paper") { f.paper = b.dataset.v; f.part = 1; save(); fStop(); renderFCE(); }
  else if (a === "part") { f.part = +b.dataset.v; save(); fStop(); renderFCE(); const p = document.querySelector(".partbar"); if (p) p.scrollIntoView({ block: "start" }); }
  else if (a === "check") { fMark(t, b.dataset.pk); renderFCE(); const r = document.querySelector(".res"); if (r) r.scrollIntoView({ block: "nearest" }); }
  else if (a === "redo") { const pk = b.dataset.pk; const key = fKey(t.n, pk.slice(0, 3), pk.slice(3)); delete f.res[key]; f.ans[key] = {}; save(); renderFCE(); }
  else if (a === "play") { const pid = b.dataset.pid; if (FAU.on === pid) { fStop(); return; } const [n, part, q] = pid.split("-"); const T = fT(+n); const lines = part === "l1" ? T.l1[+q - 1][1] : part === "l2" ? T.l2.s : part === "l3" ? T.l3.s.flatMap((s, i) => [["N", `Speaker ${i + 1}.`]].concat(s)) : T.l4.s; fPlay(pid, lines); }
  else if (a === "tm-go") { const tm = FTM[b.dataset.tid]; tm.run = !tm.run; try { fAudioCtx = fAudioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch (er) { } b.textContent = tm.run ? "Pause" : "Resume"; b.classList.toggle("primary", !tm.run); }
  else if (a === "tm-reset") { const tm = FTM[b.dataset.tid]; tm.run = false; tm.left = tm.total; renderFCE(); }
  else if (a === "tm-set") { const tm = FTM[b.dataset.tid]; tm.total = +b.dataset.sec; tm.left = tm.total; tm.run = false; renderFCE(); }
  else if (a === "mic") { const id = b.dataset.did; if (FD.on) { const was = FD.target; fDictEnd(); if (was === id) return; } fDictStart(id); }
  else if (a === "dict-check") { const id = b.dataset.did; if (FD.on) fDictEnd(); f.lab["fb_" + id] = 1; save(); const d = document.getElementById("dfb-" + id); if (d) d.innerHTML = fSpeakFb(id); if (t && f.paper === "spk") renderFCE(); }
  else if (a === "dict-clear") { const id = b.dataset.did; f.lab["tx_" + id] = ""; f.lab["sec_" + id] = 0; delete f.lab["fb_" + id]; save(); renderFCE(); }
  else if (a === "lab-next") { f.lab.qi = (f.lab.qi || 0) + 1 + Math.floor(Math.random() * 7); save(); renderFCE(); }
  else if (a === "wfb") { f.w[b.dataset.wk + "_fb"] = 1; save(); renderFCE(); const r = document.querySelector(".wtask + .res"); if (r) r.scrollIntoView({ block: "nearest" }); }
  else if (a === "lt") { f.lt = b.dataset.v; save(); renderFCE(); }
  else if (a === "lq-new") { fLearnQuiz(f.lt); renderFCE(); }
  else if (a === "lq-check") { const q = f.lq[f.lt]; if (q) { q.done = true; save(); renderFCE(); } }
});
document.addEventListener("change", e => {
  const el = e.target; const f = FS();
  if (el.dataset.fq && el.closest("#v-fce") && !el.dataset.lq) { const t = fT(f.test); const key = fKey(t.n, f.paper, f.part); fA(key)[el.dataset.fq] = el.value; save(); }
  if (el.dataset.lq !== undefined && el.type === "radio") { const q = f.lq[f.lt]; if (q) { q.ans[el.dataset.lq] = el.value; save(); } }
  if (el.dataset.fceW2 !== undefined) { f.w[`t${f.test}c`] = +el.dataset.fceW2; save(); renderFCE(); }
});
document.addEventListener("input", e => {
  const el = e.target; const f = FS();
  if (el.dataset.fq && el.tagName === "INPUT" && !el.dataset.lq && el.closest("#v-fce")) { const key = fKey(f.test, f.paper, f.part); fA(key)[el.dataset.fq] = el.value; save(); }
  if (el.dataset.lq !== undefined && el.tagName === "INPUT" && el.type !== "radio") { const q = f.lq[f.lt]; if (q) { q.ans[el.dataset.lq] = el.value; save(); } }
  if (el.dataset.wk) { f.w[el.dataset.wk] = el.value; save(); const n = fWords(el.value).length; const c = document.getElementById("wc-" + el.dataset.wk); if (c) c.innerHTML = `${n} words${n && n < 140 ? ` · <span class="warn">${140 - n} more to reach 140</span>` : n > 190 ? ` · <span class="warn">${n - 190} over 190</span>` : n ? " · within 140–190" : ""}`; }
  if (el.dataset.dict) { f.lab["tx_" + el.dataset.dict] = el.value; save(); fLiveRate(); }
  if (el.id === "fl-search") { f.lsearch = el.value; const l = document.getElementById("fl-list"); if (l) l.innerHTML = fLearnList(el.value.toLowerCase()); }
});
window.addEventListener("hashchange", () => { if (location.hash !== "#fce") { fStop(); if (FD.on) fDictEnd(); } });

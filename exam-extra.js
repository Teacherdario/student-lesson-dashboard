/* Teacher Dario · Extra Student Book chapters for B1 Preliminary (PET) and B2 First (FCE):
   exam reference guide, phrasal verbs, expressions and collocations, linkers and functional language, key word transformation patterns. */
(function () {
  if (!window.BOOK || !BOOK.special || !BOOK.special.PET || !BOOK.special.FCE) return;
  const e = t => BOOK.esc(t), md = t => BOOK.md(t), sp = t => BOOK.sp(t), ES = () => BOOK.state().es;
  const back = n => `<div class="row"><button class="btn ghost" type="button" data-bk="back">← ${e(n)}</button></div>`;
  const uhead = (k, kick, t, s) => `<div class="bk-uhead lv-${k}"><span class="bk-kicker">${e(kick)}</span><h1>${e(t)}</h1><p>${e(s || "")}</p></div>`;
  const card = (id, k, t, s) => `<button class="bk-ucard" type="button" data-bk="unit" data-v="${id}"><span class="bk-un">${e(k)}</span><b>${e(t)}</b><span class="sub">${e(s || "")}</span></button>`;
  const bi = (a, b) => `<p>${md(a)}</p>${ES() && b ? `<p class="es" lang="es">${md(b)}</p>` : ""}`;

  /* rows: [item, meaning, español, example, ejemplo] */
  function cards(rows) {
    return `<div class="xx-cards">${rows.map(r => `<div class="xx-card"><div class="xx-w"><b>${e(r[0])}</b> ${sp(r[0])}</div><div class="xx-m">${e(r[1])}</div>${ES() && r[2] ? `<div class="xx-es">${e(r[2])}</div>` : ""}${r[3] ? `<div class="xx-ex">“${md(r[3])}” ${sp(r[3].replace(/\*\*/g, ""))}</div>` : ""}${ES() && r[4] ? `<div class="xx-es">${e(r[4])}</div>` : ""}</div>`).join("")}</div>`;
  }
  /* groups: [[title, título, [[phrase, español], …]], …] */
  function phraseGroups(G) {
    return G.map(g => `<section class="card bk-sec"><h2 class="bk-h3">${e(g[0])}${ES() ? ` <span class="sub">· ${e(g[1])}</span>` : ""}</h2><div class="bk-tw"><table class="bk-syl"><tbody>${g[2].map(r => `<tr><td><b>${e(r[0])}</b> ${sp(r[0].replace(/…/g, ""))}</td>${ES() ? `<td class="es">${e(r[1] || "")}</td>` : ""}</tr>`).join("")}</tbody></table></div></section>`).join("");
  }
  /* guide: [[paper, time, %, [[part, task, what it tests, tip, consejo], …]], …] */
  function guide(P) {
    return P.map(p => `<section class="card bk-sec"><h2 class="bk-h3">${e(p[0])} <span class="sub">· ${e(p[1])} · ${e(p[2])}</span></h2><div class="bk-tw"><table class="bk-syl xx-g"><thead><tr><th>Part</th><th>Task · Tarea</th><th>What it tests · Qué evalúa</th><th>Tip · Consejo</th></tr></thead><tbody>${p[3].map(r => `<tr><td><b>${e(r[0])}</b></td><td>${e(r[1])}</td><td>${e(r[2])}</td><td>${e(r[3])}${ES() && r[4] ? `<br><span class="es">${e(r[4])}</span>` : ""}</td></tr>`).join("")}</tbody></table></div></section>`).join("");
  }

  /* ================= PET DATA ================= */
  const PET_GUIDE = [
    ["Reading", "45 minutes", "25% · 32 questions", [
      ["1", "5 short texts (signs, notes, messages) · 3-option multiple choice", "Understanding the main message", "Think: who wrote it, to whom, and why?", "Piensa: ¿quién lo escribió, para quién y por qué?"],
      ["2", "Match 5 people to 8 short texts", "Reading for specific information and detail", "Underline every need of each person; the right text matches all of them.", "Subraya todas las necesidades de cada persona."],
      ["3", "Long text · 5 multiple-choice questions", "Detail, opinion, attitude and overall meaning", "Question 5 usually tests the whole text.", "La pregunta 5 suele evaluar el texto completo."],
      ["4", "Gapped text · 5 missing sentences (3 extra)", "Text structure and cohesion", "Check pronouns (he, it, this) and linkers before and after each gap.", "Revisa pronombres y conectores antes y después del hueco."],
      ["5", "Multiple-choice cloze · 6 gaps", "Vocabulary: collocations, phrasal verbs, linkers", "All four options are possible words; only one fits the grammar AND meaning.", "Solo una opción encaja en gramática y significado."],
      ["6", "Open cloze · 6 gaps", "Grammar words: prepositions, pronouns, auxiliaries", "Write ONE word only. Spelling must be correct.", "Escribe UNA sola palabra, bien escrita."]]],
    ["Writing", "45 minutes", "25% · 2 tasks", [
      ["1", "Email (about 100 words) · compulsory", "Answering all 4 notes in a friendly or neutral email", "Tick each note as you answer it. Open and close the email properly.", "Marca cada nota al responderla. Saluda y despídete bien."],
      ["2", "Article OR story (about 100 words)", "Organising ideas, range of language, engaging the reader", "Article: title + question to the reader. Story: start with the given sentence.", "Artículo: título y pregunta al lector. Historia: empieza con la oración dada."]]],
    ["Listening", "about 30 minutes", "25% · 25 questions", [
      ["1", "7 short recordings · choose the right picture", "Understanding key information", "You hear all three options; listen for the final answer.", "Escuchas las tres opciones; atiende la respuesta final."],
      ["2", "6 short dialogues · 3-option multiple choice", "Attitude, opinion, agreement", "Focus on how the speakers feel, not just facts.", "Fíjate en cómo se sienten los hablantes."],
      ["3", "Monologue · complete 6 notes", "Specific information (numbers, names, dates)", "Write the exact words you hear; check spelling.", "Escribe las palabras exactas; revisa la ortografía."],
      ["4", "Interview · 6 multiple-choice questions", "Detail, opinion and main ideas", "Read the questions in the pause; they follow the order of the interview.", "Lee las preguntas en la pausa; siguen el orden de la entrevista."]]],
    ["Speaking", "12–17 minutes, in pairs", "25% · 4 parts", [
      ["1", "Interview with the examiner", "Giving personal information", "Answer with a reason or example, not just yes / no.", "Responde con razón o ejemplo, no solo sí / no."],
      ["2", "Describe one photo (1 minute each)", "Describing people, places and actions", "Use: in the background, on the left, they look…, maybe they're…", "Usa: al fondo, a la izquierda, se ven…, quizá están…"],
      ["3", "Collaborative task with picture prompts (2–3 min)", "Suggesting, agreeing, disagreeing, deciding", "Talk about every idea and ask your partner's opinion.", "Comenta cada idea y pregunta la opinión de tu compañero."],
      ["4", "Discussion on the Part 3 topic", "Giving opinions with reasons", "Develop answers: opinion + reason + example.", "Desarrolla: opinión + razón + ejemplo."]]]
  ];
  const PET_PV = [
    ["look after", "take care of someone or something", "cuidar", "My grandmother **looks after** my little brother on Fridays.", "Mi abuela cuida a mi hermanito los viernes."],
    ["look forward to", "be excited about something in the future", "esperar con ilusión", "I'm **looking forward to** the school trip.", "Tengo muchas ganas del viaje escolar."],
    ["look up", "search for information in a dictionary or online", "buscar (información)", "If you don't know a word, **look** it **up**.", "Si no conoces una palabra, búscala."],
    ["find out", "discover information", "averiguar, descubrir", "I **found out** that the museum is free on Sundays.", "Averigüé que el museo es gratis los domingos."],
    ["give up", "stop doing something", "dejar de, rendirse", "He **gave up** football when he started university.", "Dejó el fútbol cuando empezó la universidad."],
    ["carry on", "continue", "seguir, continuar", "**Carry on** reading until the bell rings.", "Sigue leyendo hasta que suene el timbre."],
    ["set off", "start a journey", "salir (de viaje)", "We **set off** at six to avoid the traffic.", "Salimos a las seis para evitar el tráfico."],
    ["get on (with)", "have a good relationship", "llevarse bien", "I **get on** really well **with** my cousin.", "Me llevo muy bien con mi primo."],
    ["get back", "return", "regresar", "What time did you **get back** from the party?", "¿A qué hora regresaste de la fiesta?"],
    ["pick up", "collect someone or something", "recoger", "Can you **pick** me **up** from the station?", "¿Puedes recogerme en la estación?"],
    ["turn up", "arrive, often unexpectedly", "aparecer, llegar", "Only six people **turned up** for the meeting.", "Solo seis personas llegaron a la reunión."],
    ["turn down", "reduce the volume / refuse an offer", "bajar el volumen / rechazar", "Please **turn down** the music. · She **turned down** the job.", "Baja la música. · Rechazó el trabajo."],
    ["fill in", "complete a form", "llenar (un formulario)", "**Fill in** this form with your name and address.", "Llena este formulario con tu nombre y dirección."],
    ["come back", "return to a place", "volver", "**Come back** soon!", "¡Vuelve pronto!"],
    ["work out", "do exercise / find the answer", "hacer ejercicio / resolver", "I **work out** at the gym three times a week.", "Hago ejercicio en el gym tres veces por semana."],
    ["run out of", "have no more of something", "quedarse sin", "We've **run out of** milk.", "Nos quedamos sin leche."],
    ["take off", "leave the ground (plane) / remove clothes", "despegar / quitarse", "The plane **took off** late. · **Take off** your shoes.", "El avión despegó tarde. · Quítate los zapatos."],
    ["get up", "get out of bed", "levantarse", "I **get up** at seven on school days.", "Me levanto a las siete en días de escuela."],
    ["wake up", "stop sleeping", "despertarse", "I **woke up** because of the storm.", "Me desperté por la tormenta."],
    ["go on", "continue / happen", "continuar / pasar", "What's **going on** here?", "¿Qué está pasando aquí?"],
    ["join in", "take part in an activity with others", "unirse, participar", "Everyone **joined in** the song.", "Todos se unieron a la canción."],
    ["show off", "try to impress people", "presumir", "He's always **showing off** his new phone.", "Siempre presume su celular nuevo."],
    ["hurry up", "do something more quickly", "darse prisa", "**Hurry up**, the bus is coming!", "¡Apúrate, ya viene el camión!"],
    ["sort out", "solve a problem / organise", "resolver, ordenar", "Let's **sort out** the problem together.", "Resolvamos el problema juntos."],
    ["clear up", "tidy / (weather) get better", "recoger / despejarse", "The weather **cleared up** in the afternoon.", "El clima se despejó en la tarde."],
    ["get over", "recover from an illness or problem", "recuperarse de", "It took me a week to **get over** the flu.", "Me tardé una semana en recuperarme de la gripa."],
    ["break down", "stop working (machine, car)", "descomponerse", "Our car **broke down** on the motorway.", "Nuestro coche se descompuso en la autopista."],
    ["set up", "start (a business, an organisation)", "fundar, montar", "My aunt **set up** her own bakery.", "Mi tía puso su propia panadería."],
    ["take up", "start a new hobby", "empezar (un pasatiempo)", "I've **taken up** the guitar.", "Empecé a tocar la guitarra."],
    ["drop off", "take someone somewhere and leave them", "dejar (a alguien)", "Dad **drops** me **off** at school.", "Papá me deja en la escuela."],
    ["look around", "explore a place", "echar un vistazo, recorrer", "We **looked around** the old town.", "Recorrimos el centro histórico."],
    ["come across", "find by chance", "encontrarse con", "I **came across** an old photo of you.", "Me encontré una foto vieja tuya."],
    ["put off", "postpone", "posponer", "Don't **put off** your homework until Sunday.", "No dejes la tarea para el domingo."],
    ["get along (with)", "have a good relationship (US)", "llevarse bien", "Do you **get along with** your neighbours?", "¿Te llevas bien con tus vecinos?"],
    ["call back", "phone again later", "devolver la llamada", "I'll **call** you **back** in five minutes.", "Te devuelvo la llamada en cinco minutos."]
  ];
  const PET_EX = [
    ["make a decision", "decide", "tomar una decisión", "It was hard to **make a decision**.", ""],
    ["make a mistake", "do something wrong", "cometer un error", "Don't worry if you **make a mistake**.", ""],
    ["make friends", "start a friendship", "hacer amigos", "I **made friends** quickly at my new school.", ""],
    ["make a noise", "be loud", "hacer ruido", "Please don't **make a noise** — the baby is asleep.", ""],
    ["do homework", "complete school work at home", "hacer la tarea", "I **do my homework** after dinner.", ""],
    ["do exercise", "be physically active", "hacer ejercicio", "You should **do exercise** every day.", ""],
    ["do the shopping", "buy food and things for home", "hacer las compras", "My dad **does the shopping** on Saturdays.", ""],
    ["take a photo", "photograph", "tomar una foto", "Can you **take a photo** of us?", ""],
    ["take an exam", "do an exam", "presentar un examen", "I'm **taking** my B1 **exam** in June.", ""],
    ["take a break", "rest for a short time", "tomar un descanso", "Let's **take a break** for ten minutes.", ""],
    ["take part in", "participate", "participar en", "Thirty students **took part in** the race.", ""],
    ["have fun", "enjoy yourself", "divertirse", "We **had** a lot of **fun** at the party.", ""],
    ["have a look", "look at something", "echar un vistazo", "Can I **have a look** at your photos?", ""],
    ["have a good time", "enjoy an experience", "pasarla bien", "**Have a good time** on holiday!", ""],
    ["catch a bus / train", "take public transport", "tomar el camión / tren", "I **catch the bus** at 7.30.", ""],
    ["miss the bus", "arrive too late for it", "perder el camión", "I **missed the bus** and arrived late.", ""],
    ["spend time / money", "use time / money", "pasar tiempo / gastar dinero", "I **spend** a lot of **time** online.", ""],
    ["save money", "keep money for later", "ahorrar", "I'm **saving money** for a new bike.", ""],
    ["keep in touch", "stay in contact", "mantenerse en contacto", "Let's **keep in touch** after the course.", ""],
    ["change your mind", "decide something different", "cambiar de opinión", "I wanted pizza, but I **changed my mind**.", ""],
    ["on time", "at the right time", "a tiempo, puntual", "The train arrived **on time**.", ""],
    ["in time", "early enough", "a tiempo (para algo)", "We got there **in time** for the film.", ""],
    ["by mistake", "accidentally", "por error", "I took your bag **by mistake**.", ""],
    ["on purpose", "deliberately", "a propósito", "He didn't break it **on purpose**.", ""],
    ["in a hurry", "quickly, without time", "con prisa", "Sorry, I'm **in a hurry**.", ""],
    ["at the moment", "now", "en este momento", "She's busy **at the moment**.", ""],
    ["in the end", "finally, after a long time", "al final", "**In the end**, we decided to stay at home.", ""],
    ["at first", "at the beginning", "al principio", "**At first** I didn't like the city.", ""],
    ["for ages", "for a long time", "desde hace mucho", "I haven't seen him **for ages**.", ""],
    ["it's up to you", "you decide", "tú decides", "Pizza or tacos? **It's up to you**.", ""],
    ["interested in", "liking to learn about", "interesado en", "I'm **interested in** photography.", ""],
    ["good at / bad at", "skilled / not skilled", "bueno para / malo para", "She's **good at** maths but **bad at** art.", ""],
    ["afraid of", "scared of", "tener miedo de", "My brother is **afraid of** dogs.", ""],
    ["proud of", "pleased about an achievement", "orgulloso de", "I'm **proud of** my exam results.", ""],
    ["bored with", "not interested any more", "aburrido de", "I'm **bored with** this game.", ""],
    ["depend on", "be decided by", "depender de", "It **depends on** the weather.", ""],
    ["pay for", "give money for", "pagar (algo)", "Who's going to **pay for** the tickets?", ""],
    ["wait for", "stay until someone arrives", "esperar a", "I'll **wait for** you outside.", ""]
  ];
  const PET_LK = [
    ["Adding ideas", "Agregar ideas", [["and / also / too / as well", "y / también"], ["What's more, …", "Además, …"], ["Another thing is that…", "Otra cosa es que…"]]],
    ["Contrast", "Contraste", [["but / however", "pero / sin embargo"], ["although…", "aunque…"], ["On the other hand, …", "Por otro lado, …"]]],
    ["Reason and result", "Causa y resultado", [["because / because of…", "porque / debido a…"], ["so / that's why…", "así que / por eso…"], ["since… / as…", "ya que…"]]],
    ["Sequencing a story", "Ordenar una historia", [["First, … / At first, …", "Primero / Al principio"], ["Then, … / After that, …", "Luego / Después"], ["Suddenly, …", "De repente"], ["In the end, … / Finally, …", "Al final / Finalmente"]]],
    ["Giving opinions", "Dar opiniones", [["I think / I believe…", "Creo que…"], ["In my opinion, …", "En mi opinión, …"], ["For me, the best thing is…", "Para mí, lo mejor es…"]]],
    ["Suggesting (speaking Part 3)", "Sugerir", [["Why don't they…?", "¿Por qué no…?"], ["How about…? / What about…?", "¿Qué tal…?"], ["I think … would be a good idea because…", "Creo que… sería buena idea porque…"]]],
    ["Agreeing and disagreeing", "Estar de acuerdo o no", [["I agree with you.", "Estoy de acuerdo contigo."], ["That's true, but…", "Es cierto, pero…"], ["I'm not sure about that.", "No estoy seguro de eso."]]],
    ["Email: opening and closing", "Correo: saludo y despedida", [["Hi Alex, / Dear Mrs Smith,", "Hola Alex, / Estimada Sra. Smith,"], ["Thanks for your email.", "Gracias por tu correo."], ["Write back soon! / Best wishes, / Love,", "¡Escríbeme pronto! / Saludos, / Con cariño,"]]]
  ];

  /* ================= FCE DATA ================= */
  const FCE_GUIDE = [
    ["Reading and Use of English", "1 hour 15 minutes", "40% · 52 questions", [
      ["1", "Multiple-choice cloze · 8 gaps", "Collocations, fixed phrases, phrasal verbs, shades of meaning", "Read the words around the gap: prepositions and objects decide the answer.", "Las palabras alrededor del hueco deciden la respuesta."],
      ["2", "Open cloze · 8 gaps", "Grammar and structure words", "Think about articles, prepositions, auxiliaries, relative pronouns, linkers.", "Piensa en artículos, preposiciones, auxiliares, pronombres relativos."],
      ["3", "Word formation · 8 gaps", "Prefixes, suffixes, negatives, plurals", "Decide the word class first (noun, adjective, adverb). Check if it needs to be negative or plural.", "Decide primero la clase de palabra y si debe ser negativa o plural."],
      ["4", "Key word transformation · 6 items", "Grammar and vocabulary: same meaning, 2–5 words", "Never change the key word. Contractions count as two words.", "Nunca cambies la palabra clave. Las contracciones cuentan como dos palabras."],
      ["5", "Long text · 6 multiple-choice questions", "Detail, opinion, attitude, purpose, implication", "Find the part of the text for each question; the wrong options often use the same words.", "Ubica la parte del texto; las opciones falsas repiten palabras."],
      ["6", "Gapped text · 6 sentences removed (1 extra)", "Cohesion and text structure", "Look for references (this, such, these) and contrast linkers.", "Busca referencias (this, such) y conectores de contraste."],
      ["7", "Multiple matching · 10 questions", "Specific information, opinion and attitude", "Scan for paraphrases of each question, not the same words.", "Busca paráfrasis de cada pregunta, no las mismas palabras."]]],
    ["Writing", "1 hour 20 minutes", "20% · 2 tasks · 140–190 words each", [
      ["1", "Essay (compulsory)", "Giving and supporting an opinion using the two notes + your own idea", "Plan: intro · note 1 · note 2 · your idea · conclusion with your opinion.", "Plan: intro · nota 1 · nota 2 · tu idea · conclusión."],
      ["2", "Choose one: article, email/letter, report or review", "Writing for a reader and purpose with the right register", "Report: headings, formal. Review: describe + recommend. Article: engage the reader.", "Reporte: subtítulos y formal. Reseña: describe y recomienda."]]],
    ["Listening", "about 40 minutes", "20% · 30 questions", [
      ["1", "8 short extracts · 3-option multiple choice", "Gist, detail, function, attitude", "Each extract is separate: reset your attention for each one.", "Cada fragmento es independiente."],
      ["2", "Monologue · sentence completion (10 gaps)", "Specific information", "The words you need are in the recording; spell them correctly.", "Las palabras están en la grabación; escríbelas bien."],
      ["3", "5 speakers · choose from 8 options", "Gist, attitude, opinion", "Listen to the whole extract before choosing; two options are distractors.", "Escucha todo el fragmento antes de elegir."],
      ["4", "Interview · 7 multiple-choice questions", "Opinion, attitude, detail", "The answer is often paraphrased; don't choose an option just because you hear a word from it.", "La respuesta suele estar parafraseada."]]],
    ["Speaking", "14 minutes, in pairs", "20% · 4 parts", [
      ["1", "Interview (2 min)", "General social language", "Extend every answer: reason + example + detail.", "Amplía cada respuesta: razón + ejemplo + detalle."],
      ["2", "Long turn: compare two photos (1 min) + short comment on partner's photos (30 s)", "Comparing, speculating, giving opinions", "Don't describe in detail: compare and answer the question above the photos.", "No describas en detalle: compara y responde la pregunta."],
      ["3", "Collaborative task: discuss 5 prompts (2 min) + decide (1 min)", "Interaction: suggesting, agreeing, negotiating", "Talk to your partner, not the examiner. You don't have to agree.", "Habla con tu compañero, no con el examinador. No tienen que coincidir."],
      ["4", "Discussion (4 min)", "Expressing and justifying opinions on wider topics", "Respond to your partner's ideas: 'I see your point, but…'", "Responde a las ideas de tu compañero."]]]
  ];
  const FCE_PV2 = [
    ["account for", "explain; be the reason for", "explicar, representar", "Tourism **accounts for** 20% of the region's income.", "El turismo representa el 20% de los ingresos."],
    ["bring about", "cause something to happen", "provocar, causar", "The internet has **brought about** huge changes in education.", "Internet ha provocado grandes cambios."],
    ["bring up", "raise a child / mention a topic", "criar / mencionar", "She **brought up** an interesting point in the meeting.", "Mencionó un punto interesante."],
    ["call off", "cancel", "cancelar", "The match was **called off** because of the rain.", "El partido se canceló por la lluvia."],
    ["come up with", "think of an idea or plan", "ocurrírsele, idear", "We need to **come up with** a better solution.", "Necesitamos idear una mejor solución."],
    ["cut down on", "reduce", "reducir", "I'm trying to **cut down on** sugar.", "Intento reducir el azúcar."],
    ["fall out (with)", "argue and stop being friends", "pelearse", "I **fell out with** my best friend over a silly joke.", "Me peleé con mi mejor amigo por una broma."],
    ["get across", "communicate an idea successfully", "transmitir", "The speaker **got** her message **across** very clearly.", "La ponente transmitió su mensaje con claridad."],
    ["go through", "experience something difficult / examine", "pasar por / revisar", "He **went through** a hard time after losing his job.", "Pasó por un momento difícil."],
    ["hold up", "delay", "retrasar", "Sorry I'm late — I was **held up** in traffic.", "Me retrasó el tráfico."],
    ["keep up with", "stay at the same level as", "mantener el ritmo de", "It's hard to **keep up with** all the new technology.", "Es difícil mantenerse al día."],
    ["let down", "disappoint", "decepcionar", "I promised to help, and I won't **let** you **down**.", "No te voy a decepcionar."],
    ["live up to", "be as good as expected", "estar a la altura de", "The film didn't **live up to** my expectations.", "La película no estuvo a la altura."],
    ["look into", "investigate", "investigar", "The police are **looking into** the complaint.", "La policía investiga la queja."],
    ["make up for", "compensate", "compensar", "I bought her lunch to **make up for** being late.", "Le invité la comida para compensar."],
    ["point out", "draw attention to a fact", "señalar", "She **pointed out** that the deadline was Friday.", "Señaló que la fecha límite era el viernes."],
    ["put across", "explain clearly", "expresar, transmitir", "He **puts** his ideas **across** really well.", "Expresa muy bien sus ideas."],
    ["put up with", "tolerate", "aguantar, soportar", "I can't **put up with** this noise any longer.", "Ya no aguanto este ruido."],
    ["run into", "meet by chance / have (problems)", "encontrarse con / toparse con", "We **ran into** problems with the booking.", "Tuvimos problemas con la reservación."],
    ["see off", "go to say goodbye to someone leaving", "despedir", "The whole family came to **see** me **off** at the airport.", "Toda la familia fue a despedirme."],
    ["stand out", "be easy to notice; be better than others", "destacar", "Her application **stood out** from the rest.", "Su solicitud destacó entre las demás."],
    ["take after", "look or behave like a parent", "parecerse a", "I **take after** my father — we're both impatient.", "Me parezco a mi papá."],
    ["take on", "accept work or responsibility / employ", "asumir / contratar", "The company is **taking on** new staff.", "La empresa está contratando personal."],
    ["take over", "take control of", "tomar el control", "A bigger company **took over** the business.", "Una empresa más grande la compró."],
    ["turn out", "end in a particular way", "resultar", "The trip **turned out** to be the best of my life.", "El viaje resultó ser el mejor de mi vida."],
    ["wear off", "gradually disappear", "pasarse (el efecto)", "The excitement **wore off** after a few days.", "La emoción se pasó a los pocos días."],
    ["come down with", "become ill", "enfermarse de", "I think I'm **coming down with** a cold.", "Creo que me voy a resfriar."],
    ["get round to", "finally do something", "encontrar tiempo para", "I never **got round to** replying to her email.", "Nunca encontré tiempo para responder."],
    ["back up", "support / make a copy of data", "respaldar", "Always **back up** your files.", "Siempre respalda tus archivos."],
    ["rule out", "decide something is impossible", "descartar", "The doctor **ruled out** anything serious.", "El doctor descartó algo grave."]
  ];
  const FCE_COL = [
    ["make an effort", "try hard", "esforzarse", "You need to **make more of an effort** in class.", ""],
    ["make progress", "improve", "progresar", "She has **made** great **progress** this year.", ""],
    ["make a difference", "have a positive effect", "marcar la diferencia", "Small changes can **make a big difference**.", ""],
    ["make sense", "be logical", "tener sentido", "His explanation didn't **make sense**.", ""],
    ["do research", "investigate a subject", "investigar", "Scientists are **doing research** into sleep.", ""],
    ["do someone a favour", "help someone", "hacer un favor", "Could you **do me a favour**?", ""],
    ["do damage / harm", "hurt or break", "hacer daño", "The storm **did** a lot of **damage**.", ""],
    ["take responsibility for", "accept that something is your duty", "asumir la responsabilidad", "You must **take responsibility for** your actions.", ""],
    ["take advantage of", "use an opportunity", "aprovechar", "**Take advantage of** the free classes.", ""],
    ["take into account", "consider", "tener en cuenta", "**Take** the cost **into account** before you decide.", ""],
    ["pay attention to", "concentrate on", "prestar atención a", "**Pay attention to** the instructions.", ""],
    ["raise awareness of", "make people know about a problem", "concientizar sobre", "The campaign **raised awareness of** plastic waste.", ""],
    ["meet a deadline", "finish on time", "cumplir un plazo", "We worked all night to **meet the deadline**.", ""],
    ["reach an agreement / a decision", "agree / decide after discussion", "llegar a un acuerdo", "They finally **reached an agreement**.", ""],
    ["come to terms with", "accept something sad", "aceptar, asimilar", "He's still **coming to terms with** the news.", ""],
    ["in favour of", "supporting", "a favor de", "Most people are **in favour of** the plan.", ""],
    ["on the whole", "generally", "en general", "**On the whole**, the course was useful.", ""],
    ["by far", "very much (with superlatives)", "con mucho", "It's **by far** the best film this year.", ""],
    ["out of the question", "impossible", "imposible, ni hablar", "Going out tonight is **out of the question**.", ""],
    ["at short notice", "with little warning", "con poca antelación", "The meeting was cancelled **at short notice**.", ""],
    ["capable of", "able to", "capaz de", "She's **capable of** running a marathon.", ""],
    ["aware of", "knowing about", "consciente de", "Are you **aware of** the risks?", ""],
    ["keen on", "enthusiastic about", "entusiasmado con", "I'm not very **keen on** horror films.", ""],
    ["responsible for", "in charge of", "responsable de", "Who's **responsible for** this mess?", ""],
    ["similar to / different from", "alike / not alike", "parecido a / diferente de", "My style is **similar to** my sister's.", ""],
    ["insist on", "demand firmly", "insistir en", "He **insisted on** paying for dinner.", ""],
    ["succeed in", "manage to do", "lograr", "She **succeeded in** passing all her exams.", ""],
    ["apologise for", "say sorry for", "disculparse por", "I **apologise for** the delay.", ""],
    ["congratulate someone on", "praise for success", "felicitar por", "We **congratulated** him **on** his new job.", ""],
    ["prevent someone from", "stop something happening", "impedir que", "The rain **prevented** us **from** playing.", ""],
    ["accuse someone of", "say someone did something wrong", "acusar de", "They **accused** him **of** cheating.", ""],
    ["object to", "be against", "oponerse a", "Many residents **object to** the new road.", ""],
    ["a solution to", "an answer to a problem", "una solución a", "There's no easy **solution to** traffic.", ""],
    ["an increase in / a rise in", "growth", "un aumento de", "There's been **an increase in** prices.", ""],
    ["a reason for", "a cause", "una razón para", "What's the **reason for** the delay?", ""],
    ["the key to", "the most important factor", "la clave de", "Practice is **the key to** success.", ""]
  ];
  const FCE_KWT = [
    ["Present perfect ↔ past simple", "I haven't seen him for a month. **LAST** → I **last saw him** a month ago.", "No lo veo desde hace un mes."],
    ["It's + time + since", "We started living here five years ago. **SINCE** → It's five years **since we started** living here.", "Hace cinco años que vivimos aquí."],
    ["Passive", "They are building a new hospital. **BEING** → A new hospital **is being built**.", "Se está construyendo un hospital."],
    ["have something done", "A mechanic repaired my car. **HAD** → I **had my car repaired**.", "Mandé reparar mi coche."],
    ["Reported speech", "'I'll help you,' she said. **WOULD** → She said **she would help** me.", "Dijo que me ayudaría."],
    ["Reporting verbs", "'Let's go to the beach,' Tom said. **SUGGESTED** → Tom **suggested going** to the beach.", "Tom sugirió ir a la playa."],
    ["Third conditional", "I didn't study, so I failed. **HAD** → If I **had studied, I would** have passed.", "Si hubiera estudiado, habría pasado."],
    ["wish / if only", "I'm sorry I didn't call her. **WISH** → I **wish I had called** her.", "Ojalá la hubiera llamado."],
    ["Modals of deduction", "I'm sure he forgot. **MUST** → He **must have forgotten**.", "Seguro que se le olvidó."],
    ["Obligation", "It isn't necessary to bring food. **HAVE** → You **don't have to** bring food.", "No es necesario traer comida."],
    ["had better", "It's a good idea to leave now. **BETTER** → We **had better leave** now.", "Más vale que nos vayamos."],
    ["too / enough", "The box is so heavy I can't lift it. **TOO** → The box is **too heavy for me** to lift.", "La caja es demasiado pesada."],
    ["so / such", "The film was so boring that we left. **SUCH** → It was **such a boring film** that we left.", "Era una película tan aburrida…"],
    ["Comparatives", "Nobody in the class is taller than Ana. **TALLEST** → Ana is **the tallest in** the class.", "Ana es la más alta."],
    ["not as … as", "Paris is more expensive than Rome. **AS** → Rome is **not as expensive as** Paris.", "Roma no es tan cara como París."],
    ["used to / be used to", "I don't find early mornings difficult any more. **USED** → I **am used to getting** up early.", "Ya estoy acostumbrado a madrugar."],
    ["prefer / would rather", "I'd prefer to stay at home. **RATHER** → I **would rather stay** at home.", "Preferiría quedarme en casa."],
    ["despite / although", "Although it was raining, we went out. **DESPITE** → We went out **despite the rain**.", "A pesar de la lluvia, salimos."],
    ["unless", "If you don't hurry, you'll miss the bus. **UNLESS** → You'll miss the bus **unless you hurry**.", "A menos que te apures…"],
    ["Phrasal verbs", "I can't tolerate his behaviour. **PUT** → I can't **put up with** his behaviour.", "No soporto su comportamiento."],
    ["Gerund / infinitive", "He refused to help us. **REFUSED** → He **refused to help** us.", "Se negó a ayudarnos."],
    ["It's not worth", "There's no point in waiting. **WORTH** → It's **not worth waiting**.", "No vale la pena esperar."],
    ["succeed in / manage to", "She managed to finish on time. **SUCCEEDED** → She **succeeded in finishing** on time.", "Logró terminar a tiempo."],
    ["Noun phrases", "I decided quickly. **DECISION** → I **made a quick decision**.", "Tomé una decisión rápida."]
  ];
  const FCE_LK = [
    ["Adding", "Agregar", [["Moreover, / Furthermore, / In addition, …", "Además, …"], ["Not only… but also…", "No solo… sino también…"], ["As well as + -ing, …", "Además de…"]]],
    ["Contrast and concession", "Contraste y concesión", [["However, / Nevertheless, …", "Sin embargo, …"], ["Despite / In spite of + noun / -ing", "A pesar de…"], ["Although / Even though…", "Aunque…"], ["Whereas / While…", "Mientras que…"]]],
    ["Cause and effect", "Causa y efecto", [["As a result, / Consequently, …", "Como resultado, …"], ["Due to / Owing to + noun", "Debido a…"], ["This means that…", "Esto significa que…"]]],
    ["Essay structure", "Estructura del ensayo", [["It is often said that…", "A menudo se dice que…"], ["Firstly, … Secondly, … Finally, …", "En primer lugar… En segundo… Por último…"], ["On the one hand… On the other hand…", "Por un lado… Por otro…"], ["To sum up, / In conclusion, …", "En resumen / En conclusión…"]]],
    ["Giving opinions", "Dar opiniones", [["In my view, / From my point of view, …", "Desde mi punto de vista…"], ["I strongly believe that…", "Creo firmemente que…"], ["It seems to me that…", "Me parece que…"]]],
    ["Speculating (Speaking Part 2)", "Especular", [["They might / could / may be…", "Puede que estén…"], ["They must be… / They can't be…", "Deben estar… / No pueden estar…"], ["It looks as if / as though…", "Parece como si…"], ["I'd imagine that…", "Me imagino que…"]]],
    ["Interaction (Speaking Part 3)", "Interacción", [["Shall we start with this one?", "¿Empezamos con esta?"], ["What's your view on…?", "¿Qué opinas de…?"], ["I see what you mean, but…", "Entiendo lo que dices, pero…"], ["So, have we decided?", "Entonces, ¿ya decidimos?"]]],
    ["Formal email / letter", "Correo o carta formal", [["Dear Sir or Madam, / Dear Mr Brown,", "Estimado/a…"], ["I am writing to enquire about / complain about…", "Le escribo para preguntar / quejarme de…"], ["I look forward to hearing from you.", "Quedo en espera de su respuesta."], ["Yours faithfully, / Yours sincerely,", "Atentamente,"]]],
    ["Reviews and reports", "Reseñas y reportes", [["I would highly recommend… to anyone who…", "Recomiendo mucho… a quien…"], ["The aim of this report is to…", "El objetivo de este reporte es…"], ["It is suggested that…", "Se sugiere que…"]]]
  ];

  /* ================= chapters ================= */
  const PET_X = [["ref", "Guide", "Exam reference guide", "every paper and part"], ["pv2", "Chapter 6", "Phrasal verbs for B1", PET_PV.length + " verbs · examples"], ["col", "Chapter 7", "Expressions and collocations", PET_EX.length + " phrases"], ["lk", "Chapter 8", "Linkers and functional language", "writing · speaking"]];
  const FCE_X = [["ref", "Guide", "Exam reference guide", "every paper and part"], ["pv2", "Chapter 8", "More phrasal verbs", FCE_PV2.length + " verbs · examples"], ["col", "Chapter 9", "Collocations and dependent prepositions", FCE_COL.length + " phrases"], ["kwt", "Chapter 10", "Key word transformations", FCE_KWT.length + " patterns"], ["lk", "Chapter 11", "Linkers and functional language", "writing · speaking"]];
  const P0 = BOOK.special.PET, F0 = BOOK.special.FCE;
  const more = X => `<h2 class="bk-h3">More chapters · Más capítulos</h2><div class="bk-units">${X.map(x => card(x[0], x[1], x[2], x[3])).join("")}</div>`;
  BOOK.special.PET = {
    course: () => P0.course() + more(PET_X),
    unit: id => {
      if (id === "ref") return back("B1 Preliminary") + uhead("PET", "Guide", "Exam reference guide", "B1 Preliminary: papers, parts, tasks and tips") + `<section class="card bk-sec">${bi("Pass mark: **Grade C (140 on the Cambridge Scale)** gives a B1 certificate. A score of 160+ (Grade A) shows B2 level.", "Para aprobar: **Grado C (140 en la Escala Cambridge)** da el certificado B1. 160+ (Grado A) indica nivel B2.")}</section>` + guide(PET_GUIDE);
      if (id === "pv2") return back("B1 Preliminary") + uhead("PET", "Chapter 6", "Phrasal verbs for B1", "Meaning, Spanish, example and audio") + `<section class="card bk-sec">${cards(PET_PV)}</section>`;
      if (id === "col") return back("B1 Preliminary") + uhead("PET", "Chapter 7", "Expressions and collocations", "make / do / take / have · prepositions · fixed phrases") + `<section class="card bk-sec">${cards(PET_EX)}</section>`;
      if (id === "lk") return back("B1 Preliminary") + uhead("PET", "Chapter 8", "Linkers and functional language", "For writing and speaking") + phraseGroups(PET_LK);
      return P0.unit(id);
    }
  };
  BOOK.special.FCE = {
    course: () => F0.course() + more(FCE_X),
    unit: id => {
      if (id === "ref") return back("B2 First") + uhead("FCE", "Guide", "Exam reference guide", "B2 First: papers, parts, tasks and tips") + `<section class="card bk-sec">${bi("Pass mark: **Grade C (160 on the Cambridge Scale)** gives a B2 certificate. A score of 180+ (Grade A) shows C1 level.", "Para aprobar: **Grado C (160 en la Escala Cambridge)** da el certificado B2. 180+ (Grado A) indica nivel C1.")}</section>` + guide(FCE_GUIDE);
      if (id === "pv2") return back("B2 First") + uhead("FCE", "Chapter 8", "More phrasal verbs", "Meaning, Spanish, example and audio") + `<section class="card bk-sec">${cards(FCE_PV2)}</section>`;
      if (id === "col") return back("B2 First") + uhead("FCE", "Chapter 9", "Collocations and dependent prepositions", "Use of English Parts 1 and 2") + `<section class="card bk-sec">${cards(FCE_COL)}</section>`;
      if (id === "kwt") return back("B2 First") + uhead("FCE", "Chapter 10", "Key word transformations", "Use of English Part 4 · the most common patterns") + `<section class="card bk-sec">${bi("Write **2–5 words** including the word in capitals. **Do not change the key word.** Contractions (don't) count as two words.", "Escribe **de 2 a 5 palabras** incluyendo la palabra en mayúsculas. **No cambies la palabra clave.** Las contracciones cuentan como dos palabras.")}<div class="bk-tw"><table class="bk-syl"><thead><tr><th>Pattern · Patrón</th><th>Example · Ejemplo</th>${ES() ? "<th>Español</th>" : ""}</tr></thead><tbody>${FCE_KWT.map(r => `<tr><td><b>${e(r[0])}</b></td><td>${md(r[1])}</td>${ES() ? `<td class="es">${e(r[2])}</td>` : ""}</tr>`).join("")}</tbody></table></div></section>`;
      if (id === "lk") return back("B2 First") + uhead("FCE", "Chapter 11", "Linkers and functional language", "For writing and speaking") + phraseGroups(FCE_LK);
      return F0.unit(id);
    }
  };
  BOOK.examExtra = { PET: PET_X.map(x => x[0]), FCE: FCE_X.map(x => x[0]), PET_PV, PET_EX, FCE_PV2, FCE_COL, FCE_KWT, PET_LK, FCE_LK };

  const css = document.createElement("style");
  css.textContent = `.xx-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}.xx-card{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--surface);display:flex;flex-direction:column;gap:3px;break-inside:avoid}.xx-w b{font-size:1.08rem}.xx-m{font-size:.92rem}.xx-es{color:#5b4a8a;font-size:.86rem;font-style:italic}.xx-ex{font-size:.92rem;background:#f6f8fc;border-radius:8px;padding:4px 8px}.xx-g td{vertical-align:top;font-size:.9rem}`;
  document.head.appendChild(css);
})();

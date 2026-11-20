BOOK.course("C1", {
  intro: ["Level C1 gives you advanced control of English. You will use complex structures for emphasis, formality and precision, and understand demanding academic and professional texts.", "El nivel C1 te da un dominio avanzado del inglés. Usarás estructuras complejas para dar énfasis, formalidad y precisión, y entenderás textos académicos y profesionales exigentes."],
  can: [
    ["Report research and opinions cautiously (hedging).", "Reportar investigaciones y opiniones con cautela (hedging)."],
    ["Add emphasis with inversion and cleft sentences.", "Dar énfasis con inversión y oraciones hendidas (cleft)."],
    ["Write in an academic style using nominalisation.", "Escribir en estilo académico usando nominalización."],
    ["Combine past and present in mixed conditionals.", "Combinar pasado y presente en condicionales mixtos."],
    ["Write concise sentences with participle clauses.", "Escribir oraciones concisas con cláusulas de participio."],
    ["Use the subjunctive in formal recommendations.", "Usar el subjuntivo en recomendaciones formales."],
    ["Criticise and speculate about the past with modal perfects.", "Criticar y especular sobre el pasado con modales perfectos."],
    ["Concede points and talk about the future seen from the past.", "Hacer concesiones y hablar del futuro visto desde el pasado."]
  ]
});
BOOK.words([["rehearse", "rɪˈhɜːs", "ensayar, repasar"], ["consolidate", "kənˈsɒlɪdeɪt", "consolidar"], ["correlational", "ˌkɒrəˈleɪʃənl", "correlacional"], ["deprivation", "ˌdeprɪˈveɪʃn", "privación, falta"], ["integral", "ˈɪntɪɡrəl", "fundamental, esencial"]]);

BOOK.unit("l8", {
  gt: ["Hedging and passive reporting", "Lenguaje prudente (hedging) y pasiva de reporte"],
  can: [["Report scientific findings cautiously.", "Reportar hallazgos científicos con cautela."], ["Use It is thought that… / X is believed to…", "Usar Se cree que… / Se piensa que…"], ["Soften claims with may, appear, tend to, suggest.", "Suavizar afirmaciones con may, appear, tend to, suggest."]],
  concept: ["In academic English we avoid being too certain. **Hedging** language and **passive reporting** structures make claims sound careful and objective.", "En el inglés académico evitamos sonar demasiado seguros. El lenguaje de **hedging** y las estructuras de **pasiva de reporte** hacen que las afirmaciones suenen cuidadosas y objetivas (“se cree que…”, “parece que…”)."],
  tables: [
    { t: ["Passive reporting", "Pasiva de reporte"], k: "aff", h: ["Structure", "Example"], r: [["It is + thought / believed / said + that…", "**It is thought that** sleep consolidates memory."], ["Subject + is + thought + to + verb", "Sleep **is thought to consolidate** memory."], ["Subject + is + believed + to have + pp (past)", "Our ancestors **are believed to have slept** in two phases."]], say: [1] },
    { t: ["Hedging language", "Lenguaje prudente"], k: "x", h: ["Type", "Examples"], r: [["modals", "may · might · could"], ["verbs", "appear to · seem to · tend to · suggest · indicate"], ["adverbs", "possibly · probably · apparently · arguably"], ["phrases", "to some extent · in some cases · it is likely that"]] }
  ],
  mist: [["Sleep proves memory is better.", "Research suggests that sleep may improve memory.", "En textos académicos evita afirmaciones absolutas."], ["It is believed sleep to help.", "Sleep is believed to help. / It is believed that sleep helps.", "No mezcles las dos estructuras."]],
  ex: [["**It is widely believed that** sleep helps us rehearse new information.", "Se cree ampliamente que el sueño nos ayuda a repasar información nueva."], ["Sleep deprivation **appears to** affect memory.", "La falta de sueño parece afectar la memoria."], ["The results **suggest** a link, although the study was only correlational.", "Los resultados sugieren una relación, aunque el estudio fue solo correlacional."]]
});

BOOK.unit("c1-2", {
  gt: ["Inversion after negative adverbials", "Inversión después de adverbios negativos"],
  can: [["Describe dramatic changes with emphasis.", "Describir cambios dramáticos con énfasis."], ["Invert subject and auxiliary after never, rarely, not only, no sooner…", "Invertir sujeto y auxiliar después de never, rarely, not only, no sooner…"]],
  concept: ["When a **negative or limiting adverbial** begins a sentence, we use **question word order** (auxiliary + subject). It sounds formal and emphatic.", "Cuando un **adverbio negativo o restrictivo** inicia la oración, usamos el **orden de pregunta** (auxiliar + sujeto). Suena formal y enfático: “Rara vez ha cambiado tanto una ciudad”."],
  tables: [
    { t: ["Common patterns", "Estructuras comunes"], k: "aff", h: ["Adverbial", "Example"], r: [["Rarely / Seldom", "**Rarely has** a city changed so fast."], ["Never (before)", "**Never had** residents seen such growth."], ["Not only… but also", "**Not only did** prices soar, **but** rents **also** doubled."], ["No sooner… than", "**No sooner had** the factory closed **than** developers arrived."], ["Hardly / Scarcely… when", "**Hardly had** they finished **when** the next project began."], ["Only then / Only when", "**Only then did** people notice the change."], ["Under no circumstances", "**Under no circumstances should** we lose the waterfront."]], say: [1] }
  ],
  mist: [["Rarely a city has changed so fast.", "Rarely has a city changed so fast.", "Después de rarely: auxiliar + sujeto."], ["Not only prices soared…", "Not only did prices soar…", "Sin auxiliar, agrega do/does/did."], ["No sooner had they arrived when…", "No sooner had they arrived than…", "No sooner va con than."]],
  ex: [["**Rarely has** a city changed so swiftly.", "Rara vez una ciudad ha cambiado tan rápido."], ["**Not only were** the derelict buildings cleaned, **but** the waterfront **was also** rebuilt.", "No solo se limpiaron los edificios abandonados, sino que también se reconstruyó el malecón."], ["**Only then did** residents realise how much the grime had hidden.", "Solo entonces los residentes se dieron cuenta de cuánto había escondido la suciedad."]]
});

BOOK.unit("c1-3", {
  gt: ["Nominalisation", "Nominalización (verbos → sustantivos)"],
  can: [["Write in a formal academic style.", "Escribir en un estilo académico formal."], ["Turn verbs and adjectives into nouns.", "Convertir verbos y adjetivos en sustantivos."], ["Build noun phrases with of.", "Construir frases nominales con of."]],
  concept: ["**Nominalisation** means using **nouns** instead of verbs or adjectives. It makes writing more formal, concise and objective.", "La **nominalización** consiste en usar **sustantivos** en lugar de verbos o adjetivos. Hace la escritura más formal, concisa y objetiva."],
  tables: [
    { t: ["Verb / adjective → noun", "Verbo / adjetivo → sustantivo"], k: "aff", h: ["Verb / adjective", "Noun"], r: [["reassess", "reassessment"], ["erode", "erosion"], ["imply", "implication"], ["sustain", "sustainability"], ["decide", "decision"], ["grow", "growth"], ["able", "ability"], ["important", "importance"]], say: [0, 1] },
    { t: ["Everyday → academic", "Cotidiano → académico"], k: "x", h: ["Verbal style", "Nominal style"], r: [["Companies **reassessed** how they work because of the pandemic.", "The pandemic **prompted a reassessment** of working practices."], ["Boundaries between work and home **eroded**.", "**The erosion of** boundaries between work and home…"], ["It is hard to **sustain** productivity.", "**The sustainability of** productivity is uncertain."]] }
  ],
  spell: [["Common noun suffixes.", "Sufijos comunes de sustantivo.", "-tion / -sion · -ment · -ity · -ness · -ance / -ence · -th"]],
  mist: [["The erode of trust…", "The erosion of trust…", "Usa el sustantivo correcto."], ["Too many nouns in a row: the work home boundary erosion problem", "the problem of the erosion of boundaries between work and home", "Usa of para que sea claro."]],
  ex: [["The rise of remote work has **prompted a reassessment** of office life.", "El auge del trabajo remoto ha provocado una reevaluación de la vida en la oficina."], ["**The erosion of** clear working hours has serious **implications**.", "La erosión de horarios claros tiene implicaciones serias."]]
});

BOOK.unit("c1-4", {
  gt: ["Mixed conditionals", "Condicionales mixtos"],
  can: [["Talk about how past decisions affect the present.", "Hablar de cómo decisiones pasadas afectan el presente."], ["Mix past and present in conditionals.", "Mezclar pasado y presente en condicionales."]],
  concept: ["**Mixed conditionals** combine two times: an unreal **past** condition with a **present** result, or a **present** fact with a **past** result.", "Los **condicionales mixtos** combinan dos tiempos: una condición **pasada** irreal con un resultado **presente**, o un hecho **presente** con un resultado **pasado**."],
  tables: [
    { t: ["Two types", "Dos tipos"], k: "aff", h: ["Type", "Structure", "Example"], r: [["Past → present", "If + past perfect, would + verb", "**If** I **had studied** medicine, I **would be** a doctor now."], ["Present → past", "If + past simple, would have + pp", "**If** I **were** more ambitious, I **would have taken** the internship."]], say: [2] }
  ],
  mist: [["If I studied medicine, I would be a doctor now. (past decision)", "If I had studied medicine, I would be a doctor now.", "La condición del pasado: past perfect."], ["If I had been braver, I would have be happier now.", "If I had been braver, I would be happier now.", "Resultado presente: would + verbo."]],
  ex: [["**Had I studied** medicine, I **would be** working in a hospital now.", "Si hubiera estudiado medicina, ahora estaría trabajando en un hospital."], ["If my parents **hadn't urged** me, I **wouldn't be** so ambitious.", "Si mis padres no me hubieran presionado, no sería tan ambicioso."], ["If I **were** less shy, I **would have applied** for the internship.", "Si fuera menos tímido, habría solicitado la pasantía."]]
});

BOOK.unit("c1-5", {
  gt: ["Cleft sentences", "Oraciones hendidas (cleft sentences)"],
  can: [["Emphasise the most important part of a sentence.", "Enfatizar la parte más importante de una oración."], ["Use It is/was… that… and What… is/was…", "Usar It is/was… that… y What… is/was…"]],
  concept: ["**Cleft sentences** split one sentence into two parts to **focus** on one element. Spanish does the same: “Lo que impulsa la innovación es…”.", "Las **oraciones hendidas** dividen una oración en dos partes para **enfocar** un elemento. El español hace lo mismo: “Lo que realmente impulsa la innovación es la colaboración”."],
  tables: [
    { t: ["Patterns", "Estructuras"], k: "aff", h: ["Pattern", "Example"], r: [["It is / was + focus + that / who", "**It was** funding **that** made the breakthrough possible."], ["What + clause + is / was", "**What** really drives innovation **is** collaboration."], ["All + clause + is", "**All** you need **is** a promising idea."], ["The thing / reason / place + that", "**The reason why** it failed **was** a lack of funding."], ["What happened was (that)…", "**What happened was that** a small idea gave rise to a big change."]], say: [1] }
  ],
  mist: [["What drives innovation it is collaboration.", "What drives innovation is collaboration.", "No repitas el sujeto con it."], ["It was the funding what made it possible.", "It was the funding that made it possible.", "Usa that, no what."]],
  ex: [["**It isn't** genius **that** drives innovation; **it's** teamwork.", "No es el genio lo que impulsa la innovación; es el trabajo en equipo."], ["**What** gave rise to the breakthrough **was** years of failure.", "Lo que dio lugar al avance fueron años de fracasos."]]
});

BOOK.unit("c1-6", {
  gt: ["Participle clauses", "Cláusulas de participio"],
  can: [["Write concise narrative sentences.", "Escribir oraciones narrativas concisas."], ["Use -ing, having + pp and past participle clauses.", "Usar cláusulas con -ing, having + participio y participio pasado."]],
  concept: ["**Participle clauses** replace a full clause (when / because / after + subject + verb). They make writing shorter and more elegant. Both clauses must have the **same subject**.", "Las **cláusulas de participio** reemplazan una oración completa (cuando / porque / después de + sujeto + verbo). Hacen el texto más corto y elegante. Ambas partes deben tener el **mismo sujeto**."],
  tables: [
    { t: ["Types", "Tipos"], k: "aff", h: ["Form", "Meaning", "Example"], r: [["-ing (present participle)", "at the same time / because", "**Walking** at dusk, they saw the ridge."], ["Having + pp (perfect)", "after / because (completed first)", "**Having crossed** the desert, they rested."], ["past participle (passive)", "passive meaning", "**Rationed** carefully, the water lasted a week."], ["Not + participle", "negative", "**Not knowing** the route, they followed the stars."]], say: [2] }
  ],
  mist: [["Walking in the desert, the sun was very hot.", "Walking in the desert, we felt the sun was very hot.", "El sujeto debe ser el mismo (no el sol caminando)."], ["Having cross the desert…", "Having crossed the desert…", "Usa el participio."]],
  ex: [["**Having crossed** the desert, the expedition reached the ridge at dusk.", "Tras cruzar el desierto, la expedición llegó a la cresta al anochecer."], ["**Rationed** carefully, the food lasted ten days.", "Racionada con cuidado, la comida duró diez días."], ["**Seeing** the rocks, they thought they resembled a castle.", "Al ver las rocas, pensaron que parecían un castillo."]]
});

BOOK.unit("c1-7", {
  gt: ["The subjunctive", "El subjuntivo"],
  can: [["Write formal recommendations and requirements.", "Escribir recomendaciones y requisitos formales."], ["Use the base form after recommend, insist, suggest + that.", "Usar la forma base después de recommend, insist, suggest + that."]],
  concept: ["The **subjunctive** in English is simply the **base form** of the verb, for all persons, after verbs and adjectives of demand or recommendation. It's formal.", "El **subjuntivo** en inglés es simplemente la **forma base** del verbo, para todas las personas, después de verbos y adjetivos de exigencia o recomendación. Es formal. Recuerda al subjuntivo del español: “recomienda que presente”."],
  tables: [
    { t: ["Patterns", "Estructuras"], k: "aff", h: ["Trigger", "Example"], r: [["recommend / suggest / insist / demand + that", "The committee recommends **that** the company **submit** its accounts."], ["It is essential / vital / important + that", "It is essential **that** every report **be** checked."], ["negative: not + base", "They insisted that he **not be** penalised."], ["formal fixed phrases", "**Be that as it may** · **So be it** · **God save**…"]], say: [1] }
  ],
  mist: [["The committee recommends that he submits…", "…that he submit…", "Formal: forma base, sin -s."], ["It is essential that it is checked.", "It is essential that it be checked.", "Formal: be (aunque is es común en inglés británico informal)."]],
  ex: [["The committee recommends that the company **submit** its report by Friday.", "El comité recomienda que la empresa presente su informe el viernes."], ["The auditors insisted that the payment **be** made pending review.", "Los auditores insistieron en que el pago se hiciera pendiente de revisión."]]
});

BOOK.unit("c1-8", {
  gt: ["Modal perfects", "Modales perfectos (should have, could have…)"],
  can: [["Criticise past decisions and express regret.", "Criticar decisiones pasadas y expresar arrepentimiento."], ["Use should have, could have, needn't have and would have.", "Usar should have, could have, needn't have y would have."]],
  concept: ["Modal perfects (**modal + have + past participle**) talk about the past: what was a mistake, what was possible, and what was unnecessary.", "Los modales perfectos (**modal + have + participio**) hablan del pasado: lo que fue un error, lo que era posible y lo que no era necesario."],
  tables: [
    { t: ["Meanings", "Significados"], k: "aff", h: ["Modal perfect", "Meaning", "Example"], r: [["should have + pp", "criticism / regret · debió", "They **should have packed** warmer clothes."], ["shouldn't have + pp", "it was wrong · no debió", "They **shouldn't have ignored** the warnings."], ["could have + pp", "possible, but didn't happen · pudo", "They **could have died** in the swamp."], ["needn't have + pp", "did it, but unnecessary", "They **needn't have carried** so much water."], ["would have + pp", "imagined past", "A guide **would have helped**."]], say: [2] }
  ],
  mist: [["They should packed food.", "They should have packed food.", "Modal + have + participio."], ["They must have heeded the advice (= criticism).", "They should have heeded the advice.", "Crítica = should have."], ["They didn't need to bring it (they brought it).", "They needn't have brought it.", "Lo hicieron sin necesidad: needn't have."]],
  ex: [["The explorers **should have heeded** the local guides.", "Los exploradores debieron haber hecho caso a los guías locales."], ["They **could have avoided** the bitter cold.", "Pudieron haber evitado el frío intenso."], ["They **needn't have packed** so much food; it was plentiful.", "No necesitaban empacar tanta comida; había de sobra."]]
});

BOOK.unit("c1-9", {
  gt: ["Concession", "Concesión (aunque, por mucho que…)"],
  can: [["Admit a point before arguing against it.", "Reconocer un punto antes de argumentar en contra."], ["Use although, despite, while, however, much as, adjective + as/though.", "Usar although, despite, while, however, much as, adjetivo + as/though."]],
  concept: ["**Concession** means accepting part of an argument while still keeping your position. Advanced writers vary the structures.", "La **concesión** consiste en aceptar parte de un argumento sin abandonar tu postura. Los escritores avanzados varían las estructuras."],
  tables: [
    { t: ["Structures", "Estructuras"], k: "aff", h: ["Structure", "Example"], r: [["Although / Even though + clause", "**Although** organic produce is expensive, many buy it."], ["Despite / In spite of + noun / -ing", "**Despite** lower yields, demand is growing."], ["While / Whilst + clause", "**While** organic food is no panacea, it reduces residues."], ["Much as + clause", "**Much as** I like organic food, I can't afford it."], ["Adjective + as / though + subject + verb", "**Expensive as** it is, organic food is popular."], ["However + adjective / adverb", "**However** healthy it is, it is still a premium product."], ["Admittedly, … / Granted, …", "**Admittedly**, yields are lower."]], say: [1] }
  ],
  mist: [["Despite it is expensive…", "Despite its high price… / Although it is expensive…", "Despite + sustantivo."], ["Although…, but…", "Although…, … (sin but)", "No uses although y but juntos."]],
  ex: [["**Admittedly**, organic farms produce lower yields.", "Hay que reconocer que las granjas orgánicas producen menos."], ["**Expensive though it may be**, organic food contains fewer residues.", "Por cara que sea, la comida orgánica contiene menos residuos."], ["**While** it is not a panacea, it is a step forward.", "Aunque no es una panacea, es un paso adelante."]]
});

BOOK.unit("c1-10", {
  gt: ["The future in the past", "El futuro en el pasado"],
  can: [["Tell stories about events that were planned or expected in the past.", "Contar historias sobre eventos planeados o esperados en el pasado."], ["Use was going to, would, was to, was about to.", "Usar was going to, would, was to, was about to."]],
  concept: ["The **future in the past** describes what was in the future **from a point in the past**. Often the plan or prediction did not happen.", "El **futuro en el pasado** describe lo que era futuro **desde un punto del pasado**. Muchas veces el plan o la predicción no se cumplió (iba a…, iba a ser…)."],
  tables: [
    { t: ["Forms", "Formas"], k: "aff", h: ["Form", "Meaning", "Example"], r: [["was / were going to", "plan or intention · iba a", "The bridge **was going to** open in May."], ["would", "prediction · sería", "Nobody suspected it **would** change everything."], ["was / were to + verb", "destiny / formal plan · estaba destinado", "The bridge **was to** change the city forever."], ["was to have + pp", "planned but didn't happen", "It **was to have been** unveiled in May."], ["was about to", "very near future · estaba a punto de", "They **were about to** open it when a flaw was detected."]], say: [2] }
  ],
  mist: [["The bridge will change everything (story in the past).", "The bridge would change everything.", "En una narración pasada, will → would."], ["They were about opening it.", "They were about to open it.", "About to + verbo base."]],
  ex: [["When it was unveiled, nobody knew the bridge **was to** change everything.", "Cuando se inauguró, nadie sabía que el puente iba a cambiarlo todo."], ["Engineers **were about to** open it when a flaw **was detected**.", "Los ingenieros estaban a punto de abrirlo cuando se detectó una falla."], ["The architect **would** later **be credited** with the idea.", "Más tarde se le atribuiría la idea al arquitecto."]]
});

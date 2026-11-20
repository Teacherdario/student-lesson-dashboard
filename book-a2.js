BOOK.course("A2", {
  intro: ["Level A2 helps you talk about the past and the future, compare things and give simple advice. You will understand short stories, messages and everyday conversations.", "El nivel A2 te ayuda a hablar del pasado y del futuro, comparar cosas y dar consejos sencillos. Entenderás historias cortas, mensajes y conversaciones cotidianas."],
  can: [
    ["Talk about past events: trips, weekends and your first day at work or school.", "Hablar de eventos pasados: viajes, fines de semana y tu primer día de trabajo o escuela."],
    ["Compare people, places and things, and say which is the best or the worst.", "Comparar personas, lugares y cosas, y decir cuál es el mejor o el peor."],
    ["Talk about plans and predictions for the future.", "Hablar de planes y predicciones para el futuro."],
    ["Say how often you do things.", "Decir con qué frecuencia haces las cosas."],
    ["Talk about quantities of food and follow a simple recipe.", "Hablar de cantidades de comida y seguir una receta sencilla."],
    ["Describe what is happening now and what usually happens.", "Describir lo que pasa ahora y lo que pasa normalmente."],
    ["Give simple advice with should.", "Dar consejos sencillos con should."],
    ["Use about 700 everyday words and the most common irregular verbs.", "Usar unas 700 palabras cotidianas y los verbos irregulares más comunes."]
  ]
});
BOOK.words([["coast", "kəʊst", "costa"], ["journey", "ˈdʒɜːni", "viaje, trayecto"], ["instead", "ɪnˈsted", "en lugar de eso"], ["shared", "ʃeəd", "compartió"], ["museum", "mjuˈziːəm", "museo"], ["manager", "ˈmænɪdʒə", "gerente, jefe"], ["introduced", "ˌɪntrəˈdjuːst", "presentó"], ["friendly", "ˈfrendli", "amable, amigable"], ["meeting", "ˈmiːtɪŋ", "reunión, junta"]]);

BOOK.unit("l3", {
  gt: ["Past simple, regular and irregular", "Pasado simple, verbos regulares e irregulares"],
  can: [["Talk about a trip or a weekend in the past.", "Hablar de un viaje o un fin de semana en el pasado."], ["Form the past of regular verbs with -ed.", "Formar el pasado de verbos regulares con -ed."], ["Learn the most common irregular verbs.", "Aprender los verbos irregulares más comunes."], ["Make negatives and questions with did.", "Hacer negaciones y preguntas con did."]],
  concept: ["We use the **past simple** for finished actions at a specific time in the past: yesterday, last week, in 2020. It is like the Spanish **pretérito**: fui, viajé, comí.", "Usamos el **pasado simple** para acciones terminadas en un momento concreto del pasado: ayer, la semana pasada, en 2020. Es como el **pretérito** del español: fui, viajé, comí. ¡Y es igual para todas las personas!"],
  use: [["Finished actions in the past.", "Acciones terminadas en el pasado.", "We **took** the train to the coast last weekend.", "Tomamos el tren a la costa el fin de semana pasado."], ["A series of actions in a story.", "Una serie de acciones en una historia.", "We **arrived**, **left** our bags and **visited** the museum.", "Llegamos, dejamos las maletas y visitamos el museo."]],
  formula: [["✔", "Subject + verb**-ed** / irregular past", "aff"], ["✘", "Subject + **didn't** + base verb", "neg"], ["?", "**Did** + subject + base verb?", "q"]],
  tables: [
    { t: ["Affirmative (same for all)", "Afirmativo (igual para todos)"], k: "aff", h: ["Subject", "Regular", "Irregular"], r: [["I", "visit**ed**", "**went**"], ["You", "visit**ed**", "**went**"], ["He / She / It", "visit**ed**", "**went**"], ["We", "visit**ed**", "**went**"], ["They", "visit**ed**", "**went**"]], say: [0, 1] },
    { t: ["Negative", "Negativo"], k: "neg", h: ["Subject", "didn't + base verb"], r: [["I / You / He / She / It / We / They", "**didn't** visit"], ["", "**didn't** go (not didn't went)"]], n: ["didn't = did not. The verb goes back to the base form.", "didn't = did not. El verbo regresa a su forma base."] },
    { t: ["Questions", "Preguntas"], k: "q", h: ["Question", "Short answer"], r: [["**Did** you **go** by train?", "Yes, I did. / No, I didn't."], ["**Did** she **visit** the museum?", "Yes, she did. / No, she didn't."], ["Where **did** you **stay**?", "We stayed in a hotel."], ["What **did** they **eat**?", "They ate fish."]] },
    { t: ["Common irregular verbs", "Verbos irregulares comunes"], k: "x", h: ["Base", "Past", "Español"], r: [["go", "went", "ir"], ["take", "took", "tomar"], ["have", "had", "tener"], ["see", "saw", "ver"], ["eat", "ate", "comer"], ["buy", "bought", "comprar"], ["get", "got", "obtener / llegar"], ["make", "made", "hacer"], ["leave", "left", "salir / dejar"], ["come", "came", "venir"]], say: [0, 1] }
  ],
  spell: [["Most verbs: add **-ed**.", "La mayoría: agrega **-ed**.", "visit → visited · walk → walked"], ["Verbs ending in **-e**: add **-d**.", "Verbos terminados en **-e**: agrega **-d**.", "arrive → arrived · share → shared"], ["Consonant + **y**: change to **-ied**.", "Consonante + **y**: cambia a **-ied**.", "study → studied · carry → carried"], ["One syllable consonant–vowel–consonant: double the last letter.", "Una sílaba consonante–vocal–consonante: duplica la última letra.", "stop → stopped · plan → planned"], ["Vowel + y: just add -ed.", "Vocal + y: solo agrega -ed.", "play → played · stay → stayed"]],
  pron: [["-ed sounds **/t/** after p, k, f, s, sh, ch.", "-ed suena **/t/** después de p, k, f, s, sh, ch.", "walked · stopped · watched"], ["-ed sounds **/d/** after vowels and other sounds.", "-ed suena **/d/** después de vocales y otros sonidos.", "arrived · played · shared"], ["-ed sounds **/ɪd/** (extra syllable) only after t and d.", "-ed suena **/ɪd/** (sílaba extra) solo después de t y d.", "visited · decided · wanted"]],
  mist: [["I goed to the beach.", "I went to the beach.", "Go es irregular: went."], ["Did you went?", "Did you go?", "Después de did el verbo va en forma base."], ["I didn't saw it.", "I didn't see it.", "El pasado ya está en didn't."], ["Yesterday I visit my aunt.", "Yesterday I visited my aunt.", "No olvides la -ed en pasado."]],
  ex: [["We **took** the train to the coast.", "Tomamos el tren a la costa."], ["The journey **was** long, so we **shared** some sandwiches.", "El viaje fue largo, así que compartimos unos sándwiches."], ["It **rained**, so we **visited** a museum instead.", "Llovió, así que visitamos un museo en su lugar."], ["**Did** you **like** it? Yes, we **did**.", "¿Te gustó? Sí."]]
});

BOOK.unit("l4", {
  gt: ["Past simple with time expressions", "Pasado simple con expresiones de tiempo"],
  can: [["Describe your first day at work or school.", "Describir tu primer día de trabajo o escuela."], ["Use time expressions: yesterday, last…, … ago, in…", "Usar expresiones de tiempo: ayer, el pasado…, hace…, en…"], ["Use the past of be: was and were.", "Usar el pasado de be: was y were."], ["Order events: first, then, after that, finally.", "Ordenar eventos: primero, luego, después, finalmente."]],
  concept: ["Time expressions tell us **when** something happened. In English, **ago** comes **after** the time: two days ago = hace dos días.", "Las expresiones de tiempo nos dicen **cuándo** pasó algo. En inglés **ago** va **después** del tiempo: two days ago = hace dos días."],
  formula: [["✔", "I / he / she / it **was** · you / we / they **were**", "aff"], ["✘", "**wasn't** · **weren't**", "neg"], ["?", "**Was** he…? · **Were** you…?", "q"]],
  tables: [
    { t: ["Past of be", "Pasado de be (fui / estuve / era / estaba)"], k: "aff", h: ["Subject", "✔", "✘"], r: [["I", "was", "wasn't"], ["You", "were", "weren't"], ["He / She / It", "was", "wasn't"], ["We", "were", "weren't"], ["They", "were", "weren't"]], say: [0, 1] },
    { t: ["Time expressions", "Expresiones de tiempo"], k: "x", h: ["English", "Español"], r: [["yesterday / yesterday morning", "ayer / ayer en la mañana"], ["last night / last week / last year", "anoche / la semana pasada / el año pasado"], ["two days **ago** / a month **ago**", "hace dos días / hace un mes"], ["**in** 2019 / **in** May", "en 2019 / en mayo"], ["**on** Monday / **on** my first day", "el lunes / en mi primer día"], ["**at** nine o'clock", "a las nueve"]], say: [0] },
    { t: ["Sequencing", "Ordenar eventos"], k: "q", h: ["Word", "Example"], r: [["First,", "First, the manager introduced me."], ["Then,", "Then, I met my colleagues."], ["After that,", "After that, we had a meeting."], ["Finally,", "Finally, I went home at six."]] }
  ],
  mist: [["Ago two days I started.", "I started two days ago.", "Ago va al final."], ["The last week I was busy.", "Last week I was busy.", "Sin the antes de last week."], ["They was friendly.", "They were friendly.", "Con they usa were."], ["In Monday I met him.", "On Monday I met him.", "Días con on."]],
  ex: [["I **started** my new job **two weeks ago**.", "Empecé mi nuevo trabajo hace dos semanas."], ["**On my first day**, the manager **introduced** me to everyone.", "En mi primer día, el gerente me presentó con todos."], ["My colleagues **were** very friendly.", "Mis compañeros fueron muy amables."], ["**After that**, we **had** a meeting.", "Después de eso, tuvimos una reunión."]]
});

BOOK.unit("a2-3", {
  gt: ["Comparative adjectives", "Adjetivos comparativos (más… que)"],
  can: [["Compare places: the city and the village.", "Comparar lugares: la ciudad y el pueblo."], ["Form comparatives with -er and more.", "Formar comparativos con -er y more."], ["Use than, not as… as, and irregular forms.", "Usar than, not as… as y las formas irregulares."]],
  concept: ["We use **comparatives** to compare two things. Short adjectives add **-er**; long adjectives use **more**. We use **than** for “que”.", "Usamos los **comparativos** para comparar dos cosas. Los adjetivos cortos agregan **-er**; los largos usan **more**. **Than** significa “que”."],
  formula: [["1 syllable", "adjective + **-er** + than: bigger than"], ["2+ syllables", "**more** + adjective + than: more expensive than"], ["equal / not equal", "**as** + adjective + **as** · **not as** + adjective + **as**"]],
  tables: [
    { t: ["How to form", "Cómo se forman"], k: "aff", h: ["Adjective", "Comparative", "Rule"], r: [["cheap", "cheap**er**", "+ er"], ["nice", "nice**r**", "ends in e: + r"], ["big", "big**ger**", "double consonant"], ["busy", "bus**ier**", "y → ier"], ["expensive", "**more** expensive", "long: more"], ["relaxed", "**more** relaxed", "long: more"]], say: [0, 1] },
    { t: ["Irregular", "Irregulares"], k: "x", h: ["Adjective", "Comparative", "Español"], r: [["good", "better", "mejor"], ["bad", "worse", "peor"], ["far", "further / farther", "más lejos"], ["much / many", "more", "más"], ["little", "less", "menos"]], say: [0, 1] }
  ],
  spell: [["Consonant–vowel–consonant: double the final consonant.", "Consonante–vocal–consonante: duplica la última.", "big → bigger · hot → hotter · thin → thinner"], ["Consonant + y → ier.", "Consonante + y → ier.", "easy → easier · noisy → noisier · happy → happier"]],
  mist: [["more cheap", "cheaper", "Los adjetivos cortos usan -er, no more."], ["more bigger", "bigger", "Nunca uses more y -er juntos."], ["bigger that", "bigger than", "“Que” en comparativos es than."], ["more good", "better", "Good es irregular: better."]],
  ex: [["The city is **noisier than** the village.", "La ciudad es más ruidosa que el pueblo."], ["Life in the village is **more relaxed**.", "La vida en el pueblo es más relajada."], ["Houses in the city are **more expensive than** in the village.", "Las casas en la ciudad son más caras que en el pueblo."], ["The traffic is **worse** in the city.", "El tráfico es peor en la ciudad."], ["My village is **not as big as** my cousin's town.", "Mi pueblo no es tan grande como el de mi primo."]]
});

BOOK.unit("a2-4", {
  gt: ["Superlative adjectives", "Adjetivos superlativos (el más…)"],
  can: [["Talk about records in the natural world.", "Hablar de récords del mundo natural."], ["Form superlatives with the -est and the most.", "Formar superlativos con the -est y the most."], ["Use in after superlatives with places.", "Usar in después del superlativo con lugares."]],
  concept: ["We use **superlatives** to say that something is number one in a group: **the biggest**, **the most dangerous**. Always use **the**.", "Usamos los **superlativos** para decir que algo es el número uno de un grupo: **el más grande**, **el más peligroso**. Siempre lleva **the**."],
  tables: [
    { t: ["Comparative → superlative", "Comparativo → superlativo"], k: "aff", h: ["Adjective", "Comparative", "Superlative"], r: [["tall", "taller", "**the tallest**"], ["large", "larger", "**the largest**"], ["big", "bigger", "**the biggest**"], ["heavy", "heavier", "**the heaviest**"], ["dangerous", "more dangerous", "**the most** dangerous"], ["good", "better", "**the best**"], ["bad", "worse", "**the worst**"], ["far", "further", "**the furthest**"]], say: [0, 2] },
    { t: ["Useful patterns", "Estructuras útiles"], k: "x", h: ["Pattern", "Example"], r: [["the …est **in** + place", "the biggest desert **in** the world"], ["the …est **of** + group", "the fastest **of** all the animals"], ["one of the …est + plural", "**one of the** largest whales"]] }
  ],
  spell: [["The same spelling rules as comparatives: double, y → i, + st after e.", "Las mismas reglas que los comparativos: duplicar, y → i, + st después de e.", "hot → hottest · dry → driest · large → largest"]],
  mist: [["the more big", "the biggest", "Corto: -est."], ["the biggest of the world", "the biggest in the world", "Con lugares usa in."], ["It is biggest animal.", "It is the biggest animal.", "El superlativo siempre lleva the."], ["the most good", "the best", "Irregular."]],
  ex: [["The blue whale is **the largest** animal **in** the world.", "La ballena azul es el animal más grande del mundo."], ["The giraffe has **the longest** neck.", "La jirafa tiene el cuello más largo."], ["The Sahara is one of **the hottest** deserts.", "El Sahara es uno de los desiertos más calientes."], ["Some snakes are **the most dangerous** animals on land.", "Algunas serpientes son los animales más peligrosos en tierra."]]
});

BOOK.unit("a2-5", {
  gt: ["going to for plans", "going to para planes (voy a…)"],
  can: [["Talk about your holiday plans.", "Hablar de tus planes de vacaciones."], ["Use be + going to + verb with all pronouns.", "Usar be + going to + verbo con todos los pronombres."], ["Make predictions from what you can see.", "Hacer predicciones basadas en lo que ves."]],
  concept: ["**going to** is like **ir a** in Spanish: voy a viajar = I'm **going to** travel. We use it for plans we have **already decided**.", "**going to** es como **ir a** en español: voy a viajar = I'm going to travel. Lo usamos para planes que **ya decidimos**."],
  use: [["Plans and intentions.", "Planes e intenciones.", "We're **going to** rent a car.", "Vamos a rentar un coche."], ["Predictions with evidence.", "Predicciones con evidencia.", "Look at the clouds! It's **going to** rain.", "¡Mira las nubes! Va a llover."]],
  formula: [["✔", "Subject + **am / is / are going to** + verb", "aff"], ["✘", "Subject + **'m not / isn't / aren't going to** + verb", "neg"], ["?", "**Am / Is / Are** + subject + **going to** + verb?", "q"]],
  tables: [
    { t: ["All persons", "Todas las personas"], k: "aff", h: ["Subject", "be going to", "verb"], r: [["I", "'m going to", "stay"], ["You", "'re going to", "stay"], ["He / She / It", "'s going to", "stay"], ["We", "'re going to", "stay"], ["They", "'re going to", "stay"]], say: [0, 1, 2] },
    { t: ["Negative and questions", "Negativo y preguntas"], k: "q", h: ["Form", "Example"], r: [["✘", "I'm **not going to** book a hotel."], ["✘", "She **isn't going to** take her camera."], ["?", "**Are** you **going to** buy the tickets?"], ["?", "What **are** they **going to** do?"], ["Short answers", "Yes, I am. / No, she isn't."]] }
  ],
  pron: [["In fast speech, **going to** sounds like **gonna** /ˈɡʌnə/. Say it, but don't write it in exams!", "Al hablar rápido, **going to** suena como **gonna**. Puedes decirlo, ¡pero no lo escribas en exámenes!", "I'm going to stay at home."]],
  mist: [["I going to travel.", "I'm going to travel.", "No olvides am / is / are."], ["She is going to travels.", "She is going to travel.", "Después de to, el verbo en forma base."], ["I'm go to swim.", "I'm going to swim.", "Ir a + verbo = going to + verbo."]],
  ex: [["We'**re going to** stay with my aunt.", "Nos vamos a quedar con mi tía."], ["I'**m going to** book the tickets online.", "Voy a reservar los boletos en línea."], ["**Are** you **going to** take a camera?", "¿Vas a llevar una cámara?"], ["They **aren't going to** rent a car.", "No van a rentar un coche."]]
});

BOOK.unit("a2-6", {
  gt: ["will for predictions", "will para predicciones"],
  can: [["Understand and give a weather forecast.", "Entender y dar un pronóstico del tiempo."], ["Make predictions with will and won't.", "Hacer predicciones con will y won't."], ["Use probably, definitely and I think.", "Usar probably, definitely e I think."]],
  concept: ["**will** expresses the future for **predictions** (what we think will happen) and **instant decisions**. It is the same for all persons.", "**will** expresa el futuro para **predicciones** (lo que creemos que pasará) y **decisiones del momento**. Es igual para todas las personas: lloverá = it will rain."],
  use: [["Predictions.", "Predicciones.", "It **will** be cloudy tomorrow.", "Mañana estará nublado."], ["Decisions at the moment of speaking.", "Decisiones en el momento de hablar.", "It's cold. I**'ll** close the window.", "Hace frío. Voy a cerrar la ventana."], ["Promises and offers.", "Promesas y ofrecimientos.", "I**'ll** help you.", "Te ayudo."]],
  formula: [["✔", "Subject + **will ('ll)** + verb", "aff"], ["✘", "Subject + **won't (will not)** + verb", "neg"], ["?", "**Will** + subject + verb?", "q"]],
  tables: [
    { t: ["All persons", "Todas las personas"], k: "aff", h: ["✔", "✘", "?"], r: [["It'll rain", "It won't rain", "Will it rain?"], ["I'll be", "I won't be", "Will I be…?"], ["She'll be", "She won't be", "Will she be…?"], ["We'll be", "We won't be", "Will we be…?"], ["They'll be", "They won't be", "Will they be…?"]], say: [0, 1, 2] },
    { t: ["How sure are you?", "¿Qué tan seguro estás?"], k: "x", h: ["Expression", "Español"], r: [["It **will definitely** rain.", "Definitivamente lloverá. (100%)"], ["It **will probably** rain.", "Probablemente lloverá. (80%)"], ["I **think** it will rain.", "Creo que lloverá. (60%)"], ["It **probably won't** rain.", "Probablemente no lloverá. (20%)"]], n: ["probably goes after will but before won't.", "probably va después de will pero antes de won't."] }
  ],
  mist: [["It will rains.", "It will rain.", "Después de will, forma base."], ["It will to be sunny.", "It will be sunny.", "No uses to después de will."], ["It won't probably rain.", "It probably won't rain.", "Probably va antes de won't."]],
  more: [["🌦️ Weather words · El tiempo", "sunny · cloudy · rainy · windy · foggy · snowy · hot · warm · cool · cold · the temperature will be 25 degrees", "soleado · nublado · lluvioso · ventoso · con niebla · nevado · caluroso · templado · fresco · frío · la temperatura será de 25 grados"]],
  ex: [["Tomorrow **will** be cloudy with some wind.", "Mañana estará nublado con algo de viento."], ["It **will probably** rain in the afternoon.", "Probablemente lloverá en la tarde."], ["The temperature **won't** be very high.", "La temperatura no será muy alta."], ["**Will** it be sunny at the weekend?", "¿Hará sol el fin de semana?"]]
});

BOOK.unit("a2-7", {
  gt: ["Adverbs of frequency", "Adverbios de frecuencia"],
  can: [["Say how often you exercise and do other activities.", "Decir con qué frecuencia haces ejercicio y otras actividades."], ["Put always, usually, often, sometimes, rarely and never in the right place.", "Colocar always, usually, often, sometimes, rarely y never en el lugar correcto."], ["Ask How often…? and answer with once, twice…", "Preguntar How often…? y responder con once, twice…"]],
  concept: ["Adverbs of frequency say **how often** we do something. They usually go **before** the main verb but **after** the verb be.", "Los adverbios de frecuencia dicen **con qué frecuencia** hacemos algo. Normalmente van **antes** del verbo principal pero **después** del verbo be."],
  tables: [
    { t: ["From 100% to 0%", "Del 100% al 0%"], k: "aff", h: ["Adverb", "%", "Español"], r: [["always", "100%", "siempre"], ["usually", "90%", "normalmente"], ["often", "70%", "a menudo"], ["sometimes", "50%", "a veces"], ["rarely / hardly ever", "10%", "casi nunca"], ["never", "0%", "nunca"]], say: [0] },
    { t: ["Word order", "Orden de las palabras"], k: "x", h: ["Rule", "Example"], r: [["before the main verb", "I **often** go to the gym."], ["after be", "She is **always** tired."], ["between don't / doesn't and the verb", "He doesn't **usually** run."], ["sometimes can go first", "**Sometimes** I swim."]] },
    { t: ["How often?", "¿Con qué frecuencia?"], k: "q", h: ["Expression", "Español"], r: [["once a week", "una vez a la semana"], ["twice a month", "dos veces al mes"], ["three times a day", "tres veces al día"], ["every day", "todos los días"]], say: [0] }
  ],
  mist: [["I go always to the gym.", "I always go to the gym.", "El adverbio va antes del verbo principal."], ["She always is tired.", "She is always tired.", "Con be, el adverbio va después."], ["I don't never exercise.", "I never exercise.", "Never ya es negativo: no uses don't."], ["two times a week (✓) / one time a week", "once a week", "1 vez = once, 2 = twice."]],
  ex: [["I **usually** go to the gym **twice** a week.", "Normalmente voy al gimnasio dos veces por semana."], ["My neighbour **always** runs in the morning.", "Mi vecino siempre corre en la mañana."], ["I'm **often** tired after work.", "A menudo estoy cansado después del trabajo."], ["**How often** do you exercise? **Once** a week.", "¿Con qué frecuencia haces ejercicio? Una vez a la semana."]]
});

BOOK.unit("a2-8", {
  gt: ["much, many and a lot of", "much, many y a lot of (mucho / muchos)"],
  can: [["Talk about quantities when you cook.", "Hablar de cantidades al cocinar."], ["Choose much (uncountable) or many (countable).", "Elegir much (incontable) o many (contable)."], ["Ask How much…? and How many…?", "Preguntar How much…? y How many…?"], ["Use a few and a little.", "Usar a few y a little."]],
  concept: ["**many** goes with things we can count (lemons, eggs). **much** goes with things we can't count (oil, salt). **a lot of** works with both, especially in positive sentences.", "**many** va con cosas que podemos contar (limones, huevos). **much** va con cosas que no podemos contar (aceite, sal). **a lot of** sirve para ambas, sobre todo en oraciones afirmativas."],
  tables: [
    { t: ["Countable and uncountable", "Contables e incontables"], k: "aff", h: ["", "Countable (lemons)", "Uncountable (oil)"], r: [["✔", "a lot of lemons", "a lot of oil"], ["✘", "not many lemons", "not much oil"], ["?", "How **many** lemons?", "How **much** oil?"], ["small amount", "**a few** lemons", "**a little** oil"]], say: [1, 2] },
    { t: ["Uncountable food", "Comida incontable"], k: "x", h: ["English", "Español"], r: [["oil · salt · sugar", "aceite · sal · azúcar"], ["rice · pasta · flour", "arroz · pasta · harina"], ["milk · water · juice", "leche · agua · jugo"], ["cheese · butter · meat", "queso · mantequilla · carne"]] }
  ],
  mist: [["How much eggs?", "How many eggs?", "Eggs se cuenta: many."], ["How many milk?", "How much milk?", "Milk no se cuenta: much."], ["There is much food. (formal) → natural:", "There is a lot of food.", "En afirmativo es más natural a lot of."], ["a few oil", "a little oil", "A few con contables, a little con incontables."]],
  ex: [["We need **a lot of** lemons for this recipe.", "Necesitamos muchos limones para esta receta."], ["Don't use **much** oil.", "No uses mucho aceite."], ["**How many** eggs are there in the fridge?", "¿Cuántos huevos hay en el refri?"], ["Add **a little** salt and **a few** tomatoes.", "Agrega un poco de sal y unos cuantos jitomates."]]
});

BOOK.unit("a2-9", {
  gt: ["Present simple or present continuous", "Presente simple o presente continuo"],
  can: [["Talk about your job and what you're doing now.", "Hablar de tu trabajo y de lo que estás haciendo ahora."], ["Choose between the two present tenses.", "Elegir entre los dos presentes."], ["Know the verbs that don't use -ing (state verbs).", "Conocer los verbos que no usan -ing (verbos de estado)."]],
  concept: ["**Present simple** = routines and facts (normalmente). **Present continuous** = now or around now (en este momento).", "**Presente simple** = rutinas y hechos (normalmente). **Presente continuo** = ahora o en estos días (en este momento)."],
  tables: [
    { t: ["Compare", "Compara"], k: "aff", h: ["Present simple", "Present continuous"], r: [["I **work** in an office.", "Today I**'m working** from home."], ["She usually **writes** reports.", "She**'s writing** a report now."], ["Signal words: always, usually, every day", "Signal words: now, at the moment, today, this week"]], say: [0, 1] },
    { t: ["State verbs (no -ing)", "Verbos de estado (sin -ing)"], k: "neg", h: ["Verb", "Example"], r: [["know", "I **know** the answer. (not I'm knowing)"], ["want / need", "She **needs** a new laptop."], ["like / love / hate", "I **like** this software."], ["understand / believe", "Do you **understand**?"], ["have (possess)", "He **has** two computers."]] }
  ],
  mist: [["I'm working here every day.", "I work here every day.", "Rutinas: presente simple."], ["Look! The printer works again. (now)", "Look! The printer is working again.", "Algo que pasa ahora: continuo."], ["I'm needing help.", "I need help.", "Need es verbo de estado."]],
  ex: [["I **work** for a software company.", "Trabajo para una empresa de software."], ["At the moment I**'m talking** to a customer.", "En este momento estoy hablando con un cliente."], ["Every Friday we **send** reports.", "Cada viernes enviamos reportes."], ["**Are** you **using** your laptop now?", "¿Estás usando tu laptop ahora?"]]
});

BOOK.unit("a2-10", {
  gt: ["should and shouldn't", "should y shouldn't (deberías)"],
  can: [["Describe health problems at the doctor's.", "Describir problemas de salud en el médico."], ["Give and ask for advice with should.", "Dar y pedir consejos con should."], ["Use should with all persons without changes.", "Usar should con todas las personas sin cambios."]],
  concept: ["**should** means **deberías / debería**. We use it to give **advice**. It's the same for all persons and the verb after it has no **to**.", "**should** significa **deberías / debería**. Lo usamos para dar **consejos**. Es igual para todas las personas y el verbo que sigue no lleva **to**."],
  formula: [["✔", "Subject + **should** + verb", "aff"], ["✘", "Subject + **shouldn't** + verb", "neg"], ["?", "**Should** + subject + verb?", "q"]],
  tables: [
    { t: ["All persons", "Todas las personas"], k: "aff", h: ["✔", "✘"], r: [["I should rest.", "I shouldn't go out."], ["You should take medicine.", "You shouldn't eat sweets."], ["He / She should see a doctor.", "He shouldn't work today."], ["We / They should drink water.", "They shouldn't stay up late."]], say: [0, 1] },
    { t: ["Asking for advice", "Pedir consejo"], k: "q", h: ["Question", "Answer"], r: [["**Should** I go to the doctor?", "Yes, you should."], ["What **should** I do?", "You should rest."], ["**Should** I take an aspirin?", "No, you shouldn't."]] }
  ],
  mist: [["You should to rest.", "You should rest.", "Sin to después de should."], ["She shoulds see a doctor.", "She should see a doctor.", "Should no lleva -s."], ["You don't should go.", "You shouldn't go.", "La negación es shouldn't."]],
  more: [["🤒 At the doctor's · En el médico", "I have a cough / a sore throat / a fever / a headache / a stomach ache. · I feel sick. · It hurts here.", "Tengo tos / dolor de garganta / fiebre / dolor de cabeza / dolor de estómago. · Me siento mal. · Me duele aquí."]],
  ex: [["You have a fever. You **should** rest.", "Tienes fiebre. Deberías descansar."], ["You **shouldn't** go to work today.", "No deberías ir a trabajar hoy."], ["**Should** I take this medicine twice a day?", "¿Debo tomar esta medicina dos veces al día?"], ["He has a sore throat, so he **should** drink something hot.", "Le duele la garganta, así que debería tomar algo caliente."]]
});

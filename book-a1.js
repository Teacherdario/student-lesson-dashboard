BOOK.course("A1", {
  intro: ["Level A1 is your first step in English. You will learn to talk about yourself, your family, your home, your town and your day, using short, simple sentences.", "El nivel A1 es tu primer paso en inglés. Aprenderás a hablar de ti, tu familia, tu casa, tu ciudad y tu día, con oraciones cortas y sencillas."],
  can: [
    ["Introduce yourself and other people: name, age, family and job.", "Presentarte y presentar a otras personas: nombre, edad, familia y trabajo."],
    ["Describe your daily routine and the routine of other people.", "Describir tu rutina diaria y la de otras personas."],
    ["Describe your home and your town and say where things are.", "Describir tu casa y tu ciudad y decir dónde están las cosas."],
    ["Talk about abilities: what you can and can't do.", "Hablar de habilidades: lo que puedes y no puedes hacer."],
    ["Ask for things in shops and cafés and understand prices.", "Pedir cosas en tiendas y cafés y entender precios."],
    ["Describe what people are doing and wearing now.", "Describir lo que las personas están haciendo y lo que llevan puesto ahora."],
    ["Use about 300 everyday words and the most important verbs.", "Usar unas 300 palabras cotidianas y los verbos más importantes."],
    ["Read and understand short texts and messages about everyday topics.", "Leer y entender textos y mensajes cortos sobre temas cotidianos."]
  ]
});
BOOK.words([
  ["wakes up", "ˌweɪks ˈʌp", "se despierta"], ["jam", "dʒæm", "mermelada"], ["half past seven", "ˌhɑːf pɑːst ˈsevn", "siete y media"], ["bus stop", "ˈbʌs stɒp", "parada de autobús"], ["arrives", "əˈraɪvz", "llega"],
  ["seller", "ˈselə", "vendedor, vendedora"], ["fresh", "freʃ", "fresco"], ["a kilo", "ə ˈkiːləʊ", "un kilo"], ["market", "ˈmɑːkɪt", "mercado"], ["piece", "piːs", "pedazo, pieza"], ["bathroom", "ˈbɑːθruːm", "baño"], ["garden", "ˈɡɑːdn", "jardín"], ["pencil", "ˈpensl", "lápiz"], ["dictionary", "ˈdɪkʃənri", "diccionario"], ["coffee", "ˈkɒfi", "café"]
]);

BOOK.unit("l1", {
  gt: ["Present simple with he, she, it", "Presente simple con he, she, it (él, ella, eso)"],
  can: [["Talk about daily routines and habits.", "Hablar de rutinas y hábitos diarios."], ["Add -s or -es to verbs after he, she and it.", "Agregar -s o -es a los verbos después de he, she e it."], ["Make negatives with don't / doesn't and questions with do / does.", "Hacer negaciones con don't / doesn't y preguntas con do / does."], ["Say the time: at seven, at half past seven.", "Decir la hora: a las siete, a las siete y media."]],
  concept: ["We use the **present simple** for things that are always true or that happen **again and again**: habits, routines and timetables.", "Usamos el **presente simple** para cosas que siempre son verdad o que pasan **una y otra vez**: hábitos, rutinas y horarios. En español es como “yo trabajo”, “ella come”."],
  use: [
    ["Routines and habits (every day, every week).", "Rutinas y hábitos (todos los días, cada semana).", "Ana **wakes up** at six o'clock every day.", "Ana se despierta a las seis todos los días."],
    ["Facts that are always true.", "Hechos que siempre son verdad.", "Water **boils** at 100 degrees.", "El agua hierve a 100 grados."],
    ["Timetables (buses, trains, classes).", "Horarios (autobuses, trenes, clases).", "The bus **leaves** at half past seven.", "El autobús sale a las siete y media."]
  ],
  formula: [["✔", "Subject + verb (+ **s/es** with he, she, it)", "aff"], ["✘", "Subject + **don't / doesn't** + verb", "neg"], ["?", "**Do / Does** + subject + verb?", "q"]],
  tables: [
    { t: ["Affirmative", "Afirmativo"], k: "aff", h: ["Subject", "Verb", "Español"], r: [["I", "work", "yo trabajo"], ["You", "work", "tú trabajas"], ["He", "work**s**", "él trabaja"], ["She", "work**s**", "ella trabaja"], ["It", "work**s**", "(eso) funciona"], ["We", "work", "nosotros trabajamos"], ["You", "work", "ustedes trabajan"], ["They", "work", "ellos trabajan"]], say: [0, 1] },
    { t: ["Negative", "Negativo"], k: "neg", h: ["Subject", "Negative", "Español"], r: [["I", "**don't** work", "no trabajo"], ["You", "**don't** work", "no trabajas"], ["He / She / It", "**doesn't** work", "no trabaja"], ["We", "**don't** work", "no trabajamos"], ["You", "**don't** work", "no trabajan"], ["They", "**don't** work", "no trabajan"]], n: ["don't = do not · doesn't = does not. After doesn't the verb has NO -s.", "don't = do not · doesn't = does not. Después de doesn't el verbo NO lleva -s."], say: [0, 1] },
    { t: ["Questions", "Preguntas"], k: "q", h: ["Question", "Short answers"], r: [["**Do** I work?", "Yes, you do. / No, you don't."], ["**Do** you work?", "Yes, I do. / No, I don't."], ["**Does** he / she / it work?", "Yes, he does. / No, she doesn't."], ["**Do** we work?", "Yes, we do. / No, we don't."], ["**Do** they work?", "Yes, they do. / No, they don't."]] },
    { t: ["Wh- questions", "Preguntas con Wh-"], k: "x", h: ["Wh-", "do/does", "Subject + verb"], r: [["What time", "does", "Ana wake up?"], ["Where", "do", "you live?"], ["What", "does", "she eat for breakfast?"], ["How", "do", "they go to school?"]] }
  ],
  spell: [
    ["Most verbs: add **-s**.", "La mayoría de los verbos: agrega **-s**.", "work → works · eat → eats · open → opens"],
    ["Verbs ending in **-s, -sh, -ch, -x, -o**: add **-es**.", "Verbos que terminan en **-s, -sh, -ch, -x, -o**: agrega **-es**.", "watch → watches · wash → washes · go → goes · do → does"],
    ["Consonant + **y**: change y to **-ies**.", "Consonante + **y**: cambia la y por **-ies**.", "study → studies · fly → flies · carry → carries"],
    ["Vowel + **y**: just add **-s**.", "Vocal + **y**: solo agrega **-s**.", "play → plays · buy → buys · stay → stays"],
    ["Irregular: **have → has**.", "Irregular: **have → has**.", "She has a brother."]
  ],
  pron: [
    ["The -s sounds like **/s/** after p, t, k, f.", "La -s suena **/s/** después de p, t, k, f.", "works · eats · drinks"],
    ["It sounds like **/z/** after vowels and most other sounds.", "Suena **/z/** (como zumbido) después de vocales y la mayoría de los sonidos.", "plays · opens · arrives"],
    ["It sounds like **/ɪz/** (an extra syllable) after s, sh, ch, x, ge.", "Suena **/ɪz/** (una sílaba extra) después de s, sh, ch, x, ge.", "watches · washes · closes"]
  ],
  mist: [
    ["She work in a hospital.", "She works in a hospital.", "Con he, she, it el verbo siempre lleva -s. En español cambia la terminación; en inglés solo cambia aquí."],
    ["She doesn't works.", "She doesn't work.", "Después de doesn't el verbo vuelve a su forma base: la -s ya está en does."],
    ["Does she likes coffee?", "Does she like coffee?", "En preguntas con does el verbo no lleva -s."],
    ["She no eat meat.", "She doesn't eat meat.", "No traduzcas “no” directamente: usa don't o doesn't."]
  ],
  more: [["⏰ Telling the time · Decir la hora", "at seven o'clock (7:00) · at half past seven (7:30) · at quarter past seven (7:15) · at quarter to eight (7:45)", "a las siete en punto · a las siete y media · a las siete y cuarto · a las ocho menos cuarto (un cuarto para las ocho)"], ["📅 Frequency words · Palabras de frecuencia", "every day · every morning · on Mondays · at the weekend", "todos los días · todas las mañanas · los lunes · el fin de semana"]],
  ex: [["Ana **wakes up** at six o'clock every day.", "Ana se despierta a las seis todos los días."], ["She **drinks** a glass of water.", "Ella toma un vaso de agua."], ["Her brother **doesn't** like the bus.", "A su hermano no le gusta el autobús."], ["**Does** she **walk** to school? Yes, she **does**.", "¿Camina a la escuela? Sí."]],
  readEs: ["Ana se despierta a las seis todos los días.", "Toma un vaso de agua y abre la ventana.", "Luego prepara café y come pan con mermelada.", "A las siete camina a la parada del autobús con su hermano.", "El autobús siempre está lleno, pero a Ana le gusta mirar la calle.", "Llega a la escuela a las siete y media."]
});

BOOK.unit("l2", {
  gt: ["Do you have…? and prices with cost", "¿Tienes…? y precios con cost (costar)"],
  can: [["Ask for things in a shop or market.", "Pedir cosas en una tienda o mercado."], ["Ask and say prices: How much is it? It costs…", "Preguntar y decir precios: ¿Cuánto cuesta? Cuesta…"], ["Use have / has for things you own.", "Usar have / has para las cosas que tienes."], ["Use quantities: a kilo of, a piece of.", "Usar cantidades: un kilo de, un pedazo de."]],
  concept: ["We use **have** to talk about things we own or things a shop sells. We use **cost** and **How much…?** to talk about prices.", "Usamos **have** (tener) para hablar de cosas que poseemos o que vende una tienda. Usamos **cost** (costar) y **How much…?** (¿Cuánto…?) para hablar de precios."],
  use: [
    ["Asking for something in a shop.", "Pedir algo en una tienda.", "**Do you have** any fresh tomatoes?", "¿Tiene tomates frescos?"],
    ["Asking the price of one thing.", "Preguntar el precio de una cosa.", "**How much is** this cheese? / **How much does** it **cost**?", "¿Cuánto cuesta este queso?"],
    ["Asking the price of more than one thing.", "Preguntar el precio de varias cosas.", "**How much are** the apples? They **cost** two dollars a kilo.", "¿Cuánto cuestan las manzanas? Cuestan dos dólares el kilo."]
  ],
  formula: [["✔", "I / you / we / they **have** · he / she / it **has**", "aff"], ["✘", "I **don't have** · she **doesn't have**", "neg"], ["?", "**Do** you **have**…? · **Does** she **have**…?", "q"]],
  tables: [
    { t: ["have / has", "tener"], k: "aff", h: ["Subject", "Verb", "Español"], r: [["I", "have", "tengo"], ["You", "have", "tienes"], ["He / She / It", "**has**", "tiene"], ["We", "have", "tenemos"], ["You", "have", "tienen (ustedes)"], ["They", "have", "tienen"]], say: [0, 1] },
    { t: ["Negative and questions", "Negativo y preguntas"], k: "q", h: ["Form", "Example"], r: [["don't have", "I **don't have** any change."], ["doesn't have", "The shop **doesn't have** bread today."], ["Do … have?", "**Do** you **have** any eggs?"], ["Does … have?", "**Does** the market **have** fish?"]] },
    { t: ["Prices", "Precios"], k: "x", h: ["Question", "Answer"], r: [["How much **is** it?", "It's two dollars."], ["How much **are** they?", "They're five dollars."], ["How much **does** it **cost**?", "It **costs** three euros."], ["How much **do** they **cost**?", "They **cost** one euro each."]] },
    { t: ["Quantities", "Cantidades"], k: "sa", h: ["Quantity", "Example"], r: [["a kilo of", "a kilo of tomatoes"], ["half a kilo of", "half a kilo of cheese"], ["a piece of", "a piece of cake"], ["a bottle of", "a bottle of water"], ["a loaf of", "a loaf of bread"], ["a dozen", "a dozen eggs (12)"]] }
  ],
  spell: [["**has** (not haves) with he, she, it.", "Con he, she, it se usa **has** (nunca haves).", "She has a big shop."], ["Prices: write the symbol before the number, say it after.", "Precios: el símbolo se escribe antes del número, pero se dice después.", "$5 = five dollars · €2.50 = two euros fifty"]],
  pron: [["Numbers 13–19 have the stress at the end; 30, 40… at the start.", "Los números 13–19 se acentúan al final; 30, 40… al principio.", "thirTEEN – THIRty · fifTEEN – FIFty"]],
  mist: [["How much cost the apples?", "How much do the apples cost?", "En preguntas con cost necesitas do / does."], ["She have a stall.", "She has a stall.", "Con he, she, it usa has."], ["Do you have bread fresh?", "Do you have fresh bread?", "En inglés el adjetivo va ANTES del sustantivo."], ["It cost two dollars.", "It costs two dollars.", "Con it, el verbo cost lleva -s en presente."]],
  more: [["🛒 Useful phrases at the market · Frases útiles en el mercado", "Can I have…, please? · Here you are. · Anything else? · That's all, thanks. · Keep the change.", "¿Me da…, por favor? · Aquí tiene. · ¿Algo más? · Es todo, gracias. · Quédese con el cambio."]],
  ex: [["**Do you have** fresh bread?", "¿Tiene pan fresco?"], ["**How much is** a kilo of tomatoes?", "¿Cuánto cuesta un kilo de jitomates?"], ["The cheese **costs** four dollars.", "El queso cuesta cuatro dólares."], ["Sorry, we **don't have** any eggs today.", "Lo siento, hoy no tenemos huevos."]]
});

BOOK.unit("a1-3", {
  gt: ["The verb be: am, is, are", "El verbo be (ser / estar): am, is, are"],
  can: [["Say who people are, their age and how they feel.", "Decir quiénes son las personas, su edad y cómo se sienten."], ["Use am, is and are with all the pronouns.", "Usar am, is y are con todos los pronombres."], ["Make negatives and questions with be.", "Hacer negaciones y preguntas con be."], ["Talk about your family.", "Hablar de tu familia."]],
  concept: ["**Be** is the most important verb in English. It means both **ser** and **estar** in Spanish. It has three forms in the present: **am, is, are**.", "**Be** es el verbo más importante del inglés. Significa **ser** y **estar** al mismo tiempo. Tiene tres formas en presente: **am, is, are**."],
  use: [
    ["Name, job and nationality (ser).", "Nombre, trabajo y nacionalidad (ser).", "My father **is** a doctor. We **are** Mexican.", "Mi papá es doctor. Somos mexicanos."],
    ["Feelings and places (estar).", "Sentimientos y lugares (estar).", "I **am** happy. They **are** at school.", "Estoy feliz. Están en la escuela."],
    ["Age: use **be**, not have.", "Edad: usa **be**, no have.", "I **am** ten years old.", "Tengo diez años. (¡En inglés “soy diez años”!)"]
  ],
  formula: [["✔", "Subject + **am / is / are**", "aff"], ["✘", "Subject + **am not / isn't / aren't**", "neg"], ["?", "**Am / Is / Are** + subject…?", "q"]],
  tables: [
    { t: ["Affirmative", "Afirmativo"], k: "aff", h: ["Full form", "Short form", "Español"], r: [["I **am**", "I'm", "yo soy / estoy"], ["You **are**", "You're", "tú eres / estás"], ["He **is**", "He's", "él es / está"], ["She **is**", "She's", "ella es / está"], ["It **is**", "It's", "es / está"], ["We **are**", "We're", "somos / estamos"], ["You **are**", "You're", "ustedes son / están"], ["They **are**", "They're", "ellos son / están"]], say: [0] },
    { t: ["Negative", "Negativo"], k: "neg", h: ["Full form", "Short forms"], r: [["I am not", "I'm not"], ["You are not", "You aren't / You're not"], ["He / She / It is not", "He isn't / He's not"], ["We are not", "We aren't / We're not"], ["They are not", "They aren't / They're not"]], say: [0] },
    { t: ["Questions and short answers", "Preguntas y respuestas cortas"], k: "q", h: ["Question", "Yes", "No"], r: [["**Am** I late?", "Yes, you are.", "No, you aren't."], ["**Are** you a student?", "Yes, I am.", "No, I'm not."], ["**Is** he your brother?", "Yes, he is.", "No, he isn't."], ["**Is** she kind?", "Yes, she is.", "No, she isn't."], ["**Are** they twins?", "Yes, they are.", "No, they aren't."]], n: ["In short answers with Yes, don't use the short form: Yes, I am (not Yes, I'm).", "En respuestas cortas con Yes, no uses la contracción: Yes, I am (no Yes, I'm)."] },
    { t: ["Subject pronouns", "Pronombres personales"], k: "sa", h: ["English", "Español"], r: [["I", "yo (always capital I · siempre mayúscula)"], ["you", "tú / usted"], ["he", "él"], ["she", "ella"], ["it", "eso (cosas, animales)"], ["we", "nosotros"], ["you", "ustedes"], ["they", "ellos / ellas"]] }
  ],
  spell: [["**I** is always a capital letter.", "**I** (yo) siempre se escribe con mayúscula.", "My sister and I are twins."], ["The apostrophe (') replaces the missing letter.", "El apóstrofo (') reemplaza la letra que falta.", "I am → I'm · she is → she's · they are → they're"], ["Don't confuse **they're** (they are), **their** (su) and **there** (allí).", "No confundas **they're** (ellos son), **their** (su de ellos) y **there** (allí).", "They're my cousins. Their house is there."]],
  mist: [["I have ten years.", "I am ten years old.", "La edad se dice con be, no con have."], ["Is very kind.", "She is very kind.", "En inglés siempre necesitas el sujeto: no se puede decir solo “Is very kind”."], ["My brothers is tall.", "My brothers are tall.", "Con plural (brothers) usa are."], ["Are you student?", "Are you a student?", "Con profesiones en singular usa a / an."]],
  ex: [["My name **is** Sofia and I **am** ten years old.", "Me llamo Sofía y tengo diez años."], ["My mother **is** a teacher.", "Mi mamá es maestra."], ["We **are** a happy family.", "Somos una familia feliz."], ["**Is** your grandmother kind? Yes, she **is**.", "¿Tu abuela es amable? Sí."]],
  vextra: ["mother", "brother"]
});

BOOK.unit("a1-4", {
  gt: ["There is and there are", "There is y there are (hay)"],
  can: [["Describe your home: the rooms and the furniture.", "Describir tu casa: los cuartos y los muebles."], ["Use there is with singular and there are with plural.", "Usar there is con singular y there are con plural."], ["Ask and answer: Is there…? Are there…?", "Preguntar y responder: ¿Hay…?"], ["Use some and any with there are.", "Usar some y any con there are."]],
  concept: ["**There is** and **there are** both mean **hay** in Spanish. We use them to say that something exists or is in a place.", "**There is** y **there are** significan **hay**. Los usamos para decir que algo existe o está en un lugar. En inglés cambia según si es singular o plural."],
  use: [["One thing (singular): there is.", "Una cosa (singular): there is.", "**There is** a sofa in the living room.", "Hay un sillón en la sala."], ["Two or more things (plural): there are.", "Dos o más cosas (plural): there are.", "**There are** two bedrooms.", "Hay dos recámaras."], ["Uncountable things: there is.", "Cosas incontables: there is.", "**There is** some milk in the fridge.", "Hay leche en el refrigerador."]],
  formula: [["✔", "There **is** + a/an + singular · There **are** + plural", "aff"], ["✘", "There **isn't** a… · There **aren't** any…", "neg"], ["?", "**Is there** a…? · **Are there** any…?", "q"]],
  tables: [
    { t: ["Singular", "Singular"], k: "aff", h: ["Form", "Example"], r: [["There is (There's)", "There's a kitchen."], ["There isn't", "There isn't a garden."], ["Is there…?", "Is there a balcony?"], ["Short answers", "Yes, there is. / No, there isn't."]] },
    { t: ["Plural", "Plural"], k: "q", h: ["Form", "Example"], r: [["There are", "There are three bedrooms."], ["There aren't any", "There aren't any chairs."], ["Are there any…?", "Are there any windows?"], ["Short answers", "Yes, there are. / No, there aren't."]] },
    { t: ["some / any", "algunos / ningún"], k: "x", h: ["Use", "Example"], r: [["some ✔", "There are **some** books on the shelf."], ["any ✘", "There aren't **any** posters."], ["any ?", "Are there **any** shops near here?"]], n: ["some = algunos/unos · any = ningún (negativo) / algún (pregunta).", "some en afirmativo; any en negativo y preguntas."] }
  ],
  spell: [["**There's** = there is. There is no short form for there are in writing.", "**There's** = there is. There are no se contrae al escribir.", "There's a lamp. There are two lamps."], ["Don't confuse **there** (allí / hay) with **their** (su).", "No confundas **there** (allí / hay) con **their** (su).", "There is a cat in their kitchen."]],
  mist: [["There are a sofa.", "There is a sofa.", "Con un solo objeto usa there is."], ["Have two bedrooms in my flat.", "There are two bedrooms in my flat.", "“Hay” no se traduce con have."], ["There is two chairs.", "There are two chairs.", "Plural = there are."], ["In my house there is a kitchen big.", "In my house there is a big kitchen.", "El adjetivo va antes del sustantivo."]],
  ex: [["**There is** a small kitchen in my flat.", "Hay una cocina pequeña en mi departamento."], ["**There are** two bedrooms and a bathroom.", "Hay dos recámaras y un baño."], ["**Is there** a balcony? Yes, **there is**.", "¿Hay balcón? Sí, hay."], ["**There aren't any** pictures on the wall.", "No hay cuadros en la pared."]],
  vextra: ["bathroom", "garden"]
});

BOOK.unit("a1-5", {
  gt: ["can and cannot", "can (poder / saber) y cannot"],
  can: [["Talk about abilities: what you can and can't do.", "Hablar de habilidades: lo que puedes y no puedes hacer."], ["Ask for permission: Can I…?", "Pedir permiso: ¿Puedo…?"], ["Use can with all the pronouns without changes.", "Usar can con todos los pronombres sin cambios."], ["Say well, very well and not very well.", "Decir bien, muy bien y no muy bien."]],
  concept: ["**Can** expresses ability (saber hacer algo) and possibility or permission (poder). It is the same for all the pronouns, and the verb after it has no **to** and no **-s**.", "**Can** expresa habilidad (saber hacer algo) y posibilidad o permiso (poder). Es igual con todos los pronombres, y el verbo después de can no lleva **to** ni **-s**."],
  use: [["Ability.", "Habilidad (saber).", "She **can** swim very well.", "Ella sabe nadar muy bien."], ["Permission.", "Permiso.", "**Can** I open the window?", "¿Puedo abrir la ventana?"], ["Possibility.", "Posibilidad.", "You **can** see the sea from my room.", "Se puede ver el mar desde mi cuarto."]],
  formula: [["✔", "Subject + **can** + verb", "aff"], ["✘", "Subject + **can't (cannot)** + verb", "neg"], ["?", "**Can** + subject + verb?", "q"]],
  tables: [
    { t: ["All persons", "Todas las personas"], k: "aff", h: ["Affirmative", "Negative", "Español"], r: [["I can swim", "I can't swim", "sé / no sé nadar"], ["You can swim", "You can't swim", "sabes / no sabes"], ["He / She / It can swim", "He / She can't swim", "sabe / no sabe"], ["We can swim", "We can't swim", "sabemos / no sabemos"], ["They can swim", "They can't swim", "saben / no saben"]], say: [0, 1] },
    { t: ["Questions", "Preguntas"], k: "q", h: ["Question", "Short answers"], r: [["**Can** you play the guitar?", "Yes, I can. / No, I can't."], ["**Can** he ride a bike?", "Yes, he can. / No, he can't."], ["**Can** they speak English?", "Yes, they can. / No, they can't."], ["What **can** you do?", "I can cook and dance."]] },
    { t: ["How well?", "¿Qué tan bien?"], k: "x", h: ["English", "Español"], r: [["I can swim **very well**.", "muy bien"], ["I can swim **well**.", "bien"], ["I can swim **a little**.", "un poco"], ["I can't swim **very well**.", "no muy bien"], ["I can't swim **at all**.", "para nada"]] }
  ],
  spell: [["**cannot** is written as ONE word.", "**cannot** se escribe en UNA sola palabra.", "I cannot swim. = I can't swim."], ["No -s with he, she, it and no **to** after can.", "Sin -s con he, she, it y sin **to** después de can.", "She can sing. (not She cans / can to sing)"]],
  pron: [["In sentences, **can** is weak: /kən/. **Can't** is strong and long: /kɑːnt/.", "En oraciones **can** suena débil: /kən/. **Can't** suena fuerte y largo: /kɑːnt/.", "I can swim. I can't dance."]],
  mist: [["She cans swim.", "She can swim.", "Can nunca lleva -s."], ["I can to play the guitar.", "I can play the guitar.", "Después de can no se usa to."], ["Do you can ride a bike?", "Can you ride a bike?", "Con can no se usa do en preguntas."], ["I know swim.", "I can swim.", "“Saber nadar” es can swim, no know."]],
  ex: [["My brother **can** play the guitar.", "Mi hermano sabe tocar la guitarra."], ["I **can't** swim, but I **can** ride a bike.", "No sé nadar, pero sé andar en bici."], ["**Can** your dog catch a ball? Yes, it **can**.", "¿Tu perro puede atrapar una pelota? Sí."], ["**Can** I use your pen, please?", "¿Puedo usar tu pluma, por favor?"]]
});

BOOK.unit("a1-6", {
  gt: ["this, that, these, those", "this, that, these, those (este, ese, estos, esos)"],
  can: [["Point to and talk about things in the classroom.", "Señalar y hablar de cosas del salón de clases."], ["Choose this / that for one thing and these / those for many.", "Elegir this / that para una cosa y these / those para varias."], ["Ask: What's this? What are those?", "Preguntar: ¿Qué es esto? ¿Qué son esos?"]],
  concept: ["We use these words to point to things. The choice depends on **distance** (near or far) and **number** (one or more than one).", "Usamos estas palabras para señalar cosas. Depende de la **distancia** (cerca o lejos) y del **número** (uno o varios)."],
  use: [["Near + one: **this**.", "Cerca + uno: **this** (este, esta, esto).", "**This** pencil case is mine.", "Este estuche es mío."], ["Far + one: **that**.", "Lejos + uno: **that** (ese, esa, aquel).", "Look at **that** poster!", "¡Mira ese póster!"], ["Near + many: **these**.", "Cerca + varios: **these** (estos, estas).", "**These** desks are new.", "Estos pupitres son nuevos."], ["Far + many: **those**.", "Lejos + varios: **those** (esos, aquellos).", "**Those** posters are on the wall.", "Esos pósters están en la pared."]],
  tables: [
    { t: ["The four words", "Las cuatro palabras"], k: "aff", h: ["", "Near · Cerca 👇", "Far · Lejos 👉"], r: [["One · Uno", "**this** book", "**that** book"], ["Many · Varios", "**these** books", "**those** books"]], say: [1, 2] },
    { t: ["With be", "Con be"], k: "q", h: ["Question", "Answer"], r: [["What's **this**?", "It's a pencil case."], ["What's **that**?", "It's a board."], ["What are **these**?", "They're posters."], ["What are **those**?", "They're desks."], ["Is **this** your bag?", "Yes, it is. / No, it isn't."]], n: ["Answer with it (one) or they (many), not with this / these.", "Responde con it (uno) o they (varios), no con this / these."] }
  ],
  spell: [["Plural nouns: most add **-s**; -s, -sh, -ch, -x add **-es**; consonant + y → **-ies**.", "Plurales: la mayoría agrega **-s**; -s, -sh, -ch, -x agregan **-es**; consonante + y → **-ies**.", "desk → desks · box → boxes · dictionary → dictionaries"], ["Some plurals are irregular.", "Algunos plurales son irregulares.", "person → people · child → children · man → men · woman → women"]],
  pron: [["**this** /ɪ/ is short; **these** /iː/ is long. Make the difference clear!", "**this** /ɪ/ es corta; **these** /iː/ es larga. ¡Marca la diferencia!", "this · these"]],
  mist: [["This books are new.", "These books are new.", "Con plural usa these, no this."], ["What is these?", "What are these?", "Con these / those usa are."], ["Those is my desk.", "That is my desk.", "Un solo objeto lejano = that."]],
  ex: [["**This** is my desk and **that** is the teacher's desk.", "Este es mi pupitre y ese es el escritorio del maestro."], ["**These** pencils are red.", "Estos lápices son rojos."], ["Are **those** your books? Yes, they are.", "¿Esos son tus libros? Sí."]],
  vextra: ["pencil", "dictionary"]
});

BOOK.unit("a1-7", {
  gt: ["Prepositions of place", "Preposiciones de lugar"],
  can: [["Say where places are in your town.", "Decir dónde están los lugares de tu ciudad."], ["Use in, on, next to, opposite, between, behind, in front of and near.", "Usar in, on, next to, opposite, between, behind, in front of y near."], ["Ask: Where is the…? Is there a… near here?", "Preguntar: ¿Dónde está…? ¿Hay un… cerca de aquí?"]],
  concept: ["Prepositions of place tell us **where** something is. In English we use different words where Spanish often uses only **en**.", "Las preposiciones de lugar nos dicen **dónde** está algo. En inglés hay palabras diferentes donde en español muchas veces solo decimos **en**."],
  tables: [
    { t: ["Prepositions", "Preposiciones"], k: "aff", h: ["Preposition", "Español", "Example"], r: [["**in**", "en, dentro de", "The bakery is **in** Main Street."], ["**on**", "en, sobre (superficie)", "The book is **on** the table."], ["**next to**", "junto a, al lado de", "The bank is **next to** the café."], ["**opposite**", "enfrente de (del otro lado)", "The cinema is **opposite** the park."], ["**between**", "entre", "The shop is **between** the bank and the school."], ["**behind**", "detrás de", "The car park is **behind** the supermarket."], ["**in front of**", "delante de, frente a", "The bus stop is **in front of** the school."], ["**near**", "cerca de", "Is there a post office **near** here?"], ["**at**", "en (un punto)", "I'm **at** the station."], ["**on the corner of**", "en la esquina de", "The pharmacy is **on the corner of** the square."]], say: [2] },
    { t: ["Asking for places", "Preguntar por lugares"], k: "q", h: ["Question", "Answer"], r: [["Where **is** the post office?", "It's next to the bank."], ["**Is there** a supermarket near here?", "Yes, there is. It's opposite the cinema."], ["How do I get to the square?", "Go straight on and turn left."]] }
  ],
  spell: [["**in front of** and **next to** are two or three words.", "**in front of** y **next to** son dos o tres palabras.", "in front of the school · next to the park"]],
  mist: [["The bank is in front the park.", "The bank is in front of the park.", "No olvides of en in front of."], ["The café is next the cinema.", "The café is next to the cinema.", "Es next to, con to."], ["The book is in the table.", "The book is on the table.", "Sobre una superficie usa on."], ["The cinema is in front of the park. (= opposite?)", "The cinema is opposite the park.", "Si hay una calle en medio, usa opposite."]],
  more: [["🧭 Directions · Indicaciones", "Go straight on. · Turn left / right. · Take the first street on the left. · It's on your right.", "Siga derecho. · Dé vuelta a la izquierda / derecha. · Tome la primera calle a la izquierda. · Está a su derecha."]],
  ex: [["The bakery is **next to** the post office.", "La panadería está junto a la oficina de correos."], ["The cinema is **opposite** the square.", "El cine está enfrente de la plaza."], ["The supermarket is **between** the bank and the café.", "El supermercado está entre el banco y el café."]]
});

BOOK.unit("a1-8", {
  gt: ["Possessive adjectives", "Adjetivos posesivos (my, your, his, her…)"],
  can: [["Talk about your friends and their things.", "Hablar de tus amigos y sus cosas."], ["Use my, your, his, her, its, our and their correctly.", "Usar my, your, his, her, its, our y their correctamente."], ["Use 's to show possession: Maria's bag.", "Usar 's para mostrar posesión: la bolsa de María."], ["Describe people: hair, eyes, favourite things.", "Describir personas: pelo, ojos, cosas favoritas."]],
  concept: ["Possessive adjectives show **who something belongs to**. In English they depend on the **owner**, not on the thing: **his** car (de él), **her** car (de ella).", "Los adjetivos posesivos indican **de quién es algo**. En inglés dependen del **dueño**, no de la cosa: **his** car (su coche de él), **her** car (su coche de ella). En español “su” sirve para todo; en inglés no."],
  tables: [
    { t: ["Pronoun → possessive", "Pronombre → posesivo"], k: "aff", h: ["Pronoun", "Possessive", "Español", "Example"], r: [["I", "**my**", "mi, mis", "**my** best friend"], ["you", "**your**", "tu, tus", "**your** hair"], ["he", "**his**", "su (de él)", "**his** jokes"], ["she", "**her**", "su (de ella)", "**her** favourite food"], ["it", "**its**", "su (de una cosa/animal)", "the dog and **its** ball"], ["we", "**our**", "nuestro/a", "**our** school"], ["you", "**your**", "su (de ustedes)", "**your** teacher"], ["they", "**their**", "su (de ellos)", "**their** house"]], say: [3] },
    { t: ["Possessive 's", "Posesivo con 's"], k: "x", h: ["Form", "Example", "Español"], r: [["name + **'s**", "Maria**'s** bag", "la bolsa de María"], ["plural + **'**", "my parents**'** car", "el coche de mis papás"], ["irregular plural + **'s**", "the children**'s** books", "los libros de los niños"]], n: ["In Spanish: the thing + de + owner. In English: owner + 's + thing.", "En español: cosa + de + dueño. En inglés: dueño + 's + cosa."] }
  ],
  spell: [["**its** (possessive) has NO apostrophe. **it's** = it is.", "**its** (posesivo) NO lleva apóstrofo. **it's** = it is.", "The cat loves its bed. It's very soft."], ["**your** (tu) ≠ **you're** (you are).", "**your** (tu) ≠ **you're** (tú eres).", "You're my friend. Your hair is long."]],
  mist: [["Maria loves his dog.", "Maria loves her dog.", "El dueño es María (ella): usa her, aunque el perro sea macho."], ["My friend's favourites colours", "My friend's favourite colours", "Los adjetivos no tienen plural en inglés."], ["The bag of Maria", "Maria's bag", "Para personas usa 's."], ["Their is a big house.", "Their house is big. / There is a big house.", "Their = su (de ellos); there is = hay."]],
  ex: [["**My** best friend is Lucas.", "Mi mejor amigo es Lucas."], ["**His** hair is short and **his** eyes are brown.", "Su pelo es corto y sus ojos son cafés."], ["**Her** favourite restaurant is Italian.", "Su restaurante favorito es italiano."], ["**Our** teacher tells funny jokes.", "Nuestro maestro cuenta chistes graciosos."]]
});

BOOK.unit("a1-9", {
  gt: ["Present continuous", "Presente continuo (estoy haciendo)"],
  can: [["Describe what people are doing now.", "Describir lo que las personas están haciendo ahora."], ["Describe what people are wearing.", "Describir la ropa que llevan puesta."], ["Form the -ing form with the right spelling.", "Formar el -ing con la ortografía correcta."], ["Ask: What are you doing? Is she wearing…?", "Preguntar: ¿Qué estás haciendo? ¿Lleva puesto…?"]],
  concept: ["We use the **present continuous** for actions happening **now**, at this moment. It is like **estar + -ando / -iendo** in Spanish.", "Usamos el **presente continuo** para acciones que pasan **ahora**, en este momento. Es como **estar + -ando / -iendo** en español: estoy esperando = I'm waiting."],
  use: [["Actions happening now.", "Acciones que pasan ahora.", "She **is waiting** for the bus.", "Está esperando el autobús."], ["Describing a picture.", "Describir una imagen.", "In the picture, two men **are wearing** coats.", "En la imagen, dos hombres llevan abrigos."], ["Temporary situations (these days).", "Situaciones temporales (estos días).", "I'**m reading** a great book this week.", "Estoy leyendo un gran libro esta semana."]],
  formula: [["✔", "Subject + **am / is / are** + verb**-ing**", "aff"], ["✘", "Subject + **'m not / isn't / aren't** + verb-ing", "neg"], ["?", "**Am / Is / Are** + subject + verb-ing?", "q"]],
  tables: [
    { t: ["Affirmative", "Afirmativo"], k: "aff", h: ["Subject", "be", "verb-ing", "Español"], r: [["I", "am ('m)", "wearing", "llevo puesto"], ["You", "are ('re)", "wearing", "llevas puesto"], ["He / She / It", "is ('s)", "wearing", "lleva puesto"], ["We", "are ('re)", "wearing", "llevamos puesto"], ["They", "are ('re)", "wearing", "llevan puesto"]], say: [0, 1, 2] },
    { t: ["Negative", "Negativo"], k: "neg", h: ["Subject", "Negative"], r: [["I", "'m not waiting"], ["You / We / They", "aren't waiting"], ["He / She / It", "isn't waiting"]] },
    { t: ["Questions", "Preguntas"], k: "q", h: ["Question", "Short answer"], r: [["**Are** you **waiting** for the bus?", "Yes, I am. / No, I'm not."], ["**Is** she **wearing** a scarf?", "Yes, she is. / No, she isn't."], ["**Are** they **talking**?", "Yes, they are. / No, they aren't."], ["What **are** you **doing**?", "I'm reading."]] }
  ],
  spell: [["Most verbs: add **-ing**.", "La mayoría: agrega **-ing**.", "wait → waiting · wear → wearing · read → reading"], ["Verbs ending in **-e**: remove the e, add -ing.", "Verbos que terminan en **-e**: quita la e y agrega -ing.", "make → making · write → writing · dance → dancing"], ["One syllable, consonant + vowel + consonant: **double** the last letter.", "Una sílaba con consonante + vocal + consonante: **duplica** la última letra.", "sit → sitting · run → running · swim → swimming"], ["Verbs ending in **-ie**: change to **-ying**.", "Verbos que terminan en **-ie**: cambia a **-ying**.", "lie → lying · die → dying"], ["Don't double w, x, y.", "No dupliques w, x, y.", "play → playing · fix → fixing"]],
  mist: [["She wearing a coat.", "She is wearing a coat.", "No olvides am / is / are."], ["I am wait for you.", "I am waiting for you.", "El verbo necesita -ing."], ["Look! It rains.", "Look! It's raining.", "Para algo que pasa ahora usa el continuo."], ["She is siting.", "She is sitting.", "Sit duplica la t: sitting."]],
  more: [["👕 Clothes · Ropa", "a coat · a scarf · boots · a hat · a jacket · jeans · a T-shirt · a dress · trainers", "abrigo · bufanda · botas · sombrero/gorro · chamarra · jeans · playera · vestido · tenis"]],
  ex: [["A woman **is waiting** at the bus stop.", "Una mujer está esperando en la parada."], ["She **is wearing** a red coat and boots.", "Lleva puesto un abrigo rojo y botas."], ["It **is raining**, so people **are carrying** umbrellas.", "Está lloviendo, así que la gente lleva paraguas."], ["**Are** you **wearing** a scarf? No, I'**m not**.", "¿Llevas bufanda? No."]]
});

BOOK.unit("a1-10", {
  gt: ["a, an and some", "a, an y some (un, una, algunos)"],
  can: [["Order food and drinks in a café.", "Pedir comida y bebidas en un café."], ["Choose a or an correctly.", "Elegir a o an correctamente."], ["Use some with plurals and uncountable nouns.", "Usar some con plurales y sustantivos incontables."], ["Know countable and uncountable nouns.", "Distinguir sustantivos contables e incontables."]],
  concept: ["**a / an** mean **un / una** and go with ONE countable thing. **some** means **algunos / un poco de** and goes with plurals and with things we can't count (water, bread, juice).", "**a / an** significan **un / una** y van con UNA cosa contable. **some** significa **algunos / un poco de** y va con plurales y con cosas que no se pueden contar (agua, pan, jugo)."],
  use: [["**a** before a consonant SOUND.", "**a** antes de un SONIDO de consonante.", "**a** sandwich · **a** yoghurt · **a** university", "un sándwich · un yogur · una universidad"], ["**an** before a vowel SOUND.", "**an** antes de un SONIDO de vocal.", "**an** apple · **an** egg · **an** hour", "una manzana · un huevo · una hora"], ["**some** with plurals and uncountables.", "**some** con plurales e incontables.", "**some** eggs · **some** juice · **some** bread", "unos huevos · un poco de jugo · pan"]],
  tables: [
    { t: ["Countable and uncountable", "Contables e incontables"], k: "aff", h: ["", "Countable · Contable", "Uncountable · Incontable"], r: [["One", "**a** sandwich / **an** egg", "— (no a / an)"], ["More", "**some** sandwiches", "**some** juice / bread / milk"], ["✘", "There aren't **any** eggs.", "There isn't **any** milk."], ["?", "Are there **any** eggs?", "Is there **any** milk?"]] },
    { t: ["Ordering in a café", "Pedir en un café"], k: "q", h: ["You say", "Español"], r: [["Can I have **a** coffee, please?", "¿Me da un café, por favor?"], ["I'd like **an** orange juice.", "Quisiera un jugo de naranja."], ["Could I have **some** water?", "¿Me podría dar agua?"], ["Can I have the bill, please?", "¿Me trae la cuenta, por favor?"]] },
    { t: ["Uncountable nouns", "Sustantivos incontables comunes"], k: "x", h: ["English", "Español"], r: [["bread", "pan"], ["water / juice / milk / coffee", "agua / jugo / leche / café"], ["cheese / butter / jam", "queso / mantequilla / mermelada"], ["money", "dinero"], ["information / advice", "información / consejo"]] }
  ],
  spell: [["The rule is about SOUND, not letters.", "La regla depende del SONIDO, no de la letra.", "an hour (h muda) · a university (suena /juː/)"]],
  pron: [["**a** and **an** are weak: /ə/, /ən/. Join them to the next word.", "**a** y **an** suenan débiles: /ə/, /ən/. Únelas a la siguiente palabra.", "an apple → a-NA-pel"]],
  mist: [["a apple", "an apple", "Antes de sonido de vocal usa an."], ["a bread", "some bread / a piece of bread", "Bread es incontable: no lleva a."], ["some breads", "some bread", "Los incontables no tienen plural."], ["I'd like a orange juice.", "I'd like an orange juice.", "Orange empieza con vocal: an."]],
  ex: [["I'd like **a** sandwich and **an** orange juice, please.", "Quisiera un sándwich y un jugo de naranja, por favor."], ["Can I have **some** yoghurt?", "¿Me da un poco de yogur?"], ["We'd like **some** eggs and **some** bread.", "Queremos unos huevos y pan."], ["Can I have the bill, please?", "¿Me trae la cuenta, por favor?"]],
  vextra: ["coffee", "bread"]
});

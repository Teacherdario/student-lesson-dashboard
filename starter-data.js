/* Teacher Dario · Level 0 Starter course data: 15 units for absolute beginners.
   Word rows: [english, figurada, español, photo key ("" = none), emoji or display]
   Sentence rows: [english, español, figurada] */
window.STARTER = {
  units: [
    {
      id: "s1", t: "Hello!", es: "¡Hola! Saludos y cortesía", ic: "👋", cover: "hello",
      goal: ["Saludar, despedirte, dar las gracias y decir tu nombre.", "Say hello and goodbye, say thank you and say your name."],
      groups: [
        { h: ["Hello and goodbye", "Saludos y despedidas"], w: [
          ["hello", "je-LOU", "hola", "hello", "👋"], ["hi", "JAI", "hola (informal)", "hi", "🙋"], ["goodbye", "gud-BAI", "adiós", "goodbye", "👋"], ["bye", "BAI", "adiós (informal)", "", "✋"],
          ["good morning", "gud MOR-ning", "buenos días", "goodmorning", "🌅"], ["good afternoon", "gud af-ter-NUUN", "buenas tardes", "goodafternoon", "☀️"], ["good evening", "gud IIV-ning", "buenas noches (al llegar)", "goodevening", "🌆"], ["good night", "gud NAIT", "buenas noches (al despedirte)", "goodnight", "🌙"]] },
        { h: ["Magic words", "Palabras mágicas"], w: [
          ["please", "PLIIS", "por favor", "please", "🙏"], ["thank you", "ZANGK yuu", "gracias", "thankyou", "🎁"], ["sorry", "SO-ri", "perdón / lo siento", "sorry", "😔"], ["excuse me", "eks-KIUS mi", "disculpe", "excuseme", "🙋"],
          ["yes", "YES", "sí", "yes", "👍"], ["no", "NOU", "no", "no", "👎"], ["name", "NEIM", "nombre", "name", "📛"], ["friend", "FREND", "amigo / amiga", "friends", "🤝"]] }
      ],
      tips: [
        ["En inglés **hello** se pronuncia con **j** suave: *je-LOU*. La **h** casi siempre suena como una j suave.", "In English the letter h sounds like a soft Spanish j: hello = je-LOU."],
        ["**Good night** solo es para despedirte o ir a dormir. Para llegar en la noche di **good evening**.", "Good night is only for goodbye or bedtime. When you arrive in the evening, say good evening."],
        ["**My name is…** = Mi nombre es… / Me llamo… · **I'm…** es la forma corta de **I am…** (yo soy).", "My name is… = Me llamo… · I'm… is short for I am…"]
      ],
      sent: [
        ["Hello! My name is Ana.", "¡Hola! Me llamo Ana.", "je-LOU! mai NEIM is A-na."],
        ["Hi, I'm Luis.", "Hola, soy Luis.", "JAI, aim lu-IS."],
        ["Nice to meet you.", "Mucho gusto.", "NAIS tu MIIT yuu."],
        ["How are you?", "¿Cómo estás?", "JAU ar yuu?"],
        ["I'm fine, thank you.", "Estoy bien, gracias.", "aim FAIN, ZANGK yuu."],
        ["Goodbye! See you tomorrow.", "¡Adiós! Nos vemos mañana.", "gud-BAI! SII yuu tu-MO-rou."]
      ]
    },
    {
      id: "s2", t: "The alphabet", es: "El abecedario", ic: "🔤", cover: "apple", kind: "letters",
      goal: ["Decir las letras en inglés y deletrear tu nombre.", "Say the letters of the alphabet and spell your name."],
      groups: [
        { h: ["A to M", "De la A a la M"], w: [
          ["A", "EI", "a · apple (manzana)", "apple", "🍎"], ["B", "BII", "b · ball (pelota)", "ball", "⚽"], ["C", "SII", "c · cat (gato)", "cat", "🐱"], ["D", "DII", "d · dog (perro)", "dog", "🐶"],
          ["E", "II", "e · egg (huevo)", "egg", "🥚"], ["F", "EF", "f · fish (pez)", "fish", "🐟"], ["G", "YII", "g · girl (niña)", "girl", "👧"], ["H", "EICH", "h · house (casa)", "house", "🏠"],
          ["I", "AI", "i · ice cream (helado)", "icecream", "🍦"], ["J", "YEI", "j · juice (jugo)", "juice", "🧃"], ["K", "KEI", "k · key (llave)", "key", "🔑"], ["L", "EL", "l · lion (león)", "lion", "🦁"], ["M", "EM", "m · moon (luna)", "moon", "🌙"]] },
        { h: ["N to Z", "De la N a la Z"], w: [
          ["N", "EN", "n · nose (nariz)", "nose", "👃"], ["O", "OU", "o · orange (naranja)", "orange", "🍊"], ["P", "PII", "p · pen (pluma)", "pen", "🖊️"], ["Q", "KIUU", "q · queen (reina)", "queen", "👑"],
          ["R", "AR", "r · rabbit (conejo)", "rabbit", "🐰"], ["S", "ES", "s · sun (sol)", "sun", "☀️"], ["T", "TII", "t · tree (árbol)", "tree", "🌳"], ["U", "YUU", "u · umbrella (paraguas)", "umbrella", "☂️"],
          ["V", "VII", "v · van (camioneta)", "van", "🚐"], ["W", "DA-bel-yuu", "w · window (ventana)", "window", "🪟"], ["X", "EKS", "x · fox (zorro)", "fox", "🦊"], ["Y", "UAI", "y · yo-yo (yoyo)", "yoyo", "🪀"], ["Z", "SED", "z · zebra (cebra)", "zebra", "🦓"]] }
      ],
      tips: [
        ["¡Cuidado con las vocales! En inglés **A** suena *ei*, **E** suena *ii* e **I** suena *ai*. Son las letras que más confunden a los hispanohablantes.", "Careful with vowels: A = ei, E = ii, I = ai."],
        ["**G** suena *yii* y **J** suena *yei*. Son muy parecidas: escucha bien la diferencia.", "G = yii and J = yei. Listen carefully to the difference."],
        ["Para deletrear decimos: **How do you spell it?** (¿Cómo se escribe?) — **A-N-A.**", "To spell, ask: How do you spell it? — A-N-A."],
        ["Dos letras iguales: **double** (*DA-bel*). Ejemplo: Anna = A, double N, A.", "Two letters the same: double. Anna = A, double N, A."]
      ],
      sent: [
        ["How do you spell your name?", "¿Cómo se escribe tu nombre?", "JAU du yuu SPEL yor NEIM?"],
        ["My name is Ana. A-N-A.", "Me llamo Ana. A-N-A.", "mai NEIM is A-na. EI-EN-EI."],
        ["What's this? It's an apple.", "¿Qué es esto? Es una manzana.", "uats DIS? its an A-pel."],
        ["A is for apple.", "A de apple (manzana).", "EI is for A-pel."],
        ["Can you spell it, please?", "¿Puedes deletrearlo, por favor?", "kan yuu SPEL it, PLIIS?"]
      ]
    },
    {
      id: "s3", t: "Numbers 0–20", es: "Números del 0 al 20", ic: "🔢", cover: "numbers", kind: "numbers",
      goal: ["Contar del 0 al 20 y decir tu edad.", "Count from 0 to 20 and say your age."],
      groups: [
        { h: ["0 to 10", "Del 0 al 10"], w: [
          ["zero", "SI-rou", "cero", "", "0"], ["one", "UAN", "uno", "", "1"], ["two", "TUU", "dos", "", "2"], ["three", "ZRII", "tres", "", "3"], ["four", "FOR", "cuatro", "", "4"], ["five", "FAIV", "cinco", "", "5"],
          ["six", "SIKS", "seis", "", "6"], ["seven", "SE-ven", "siete", "", "7"], ["eight", "EIT", "ocho", "", "8"], ["nine", "NAIN", "nueve", "", "9"], ["ten", "TEN", "diez", "", "10"]] },
        { h: ["11 to 20", "Del 11 al 20"], w: [
          ["eleven", "i-LE-ven", "once", "", "11"], ["twelve", "TUELV", "doce", "", "12"], ["thirteen", "zer-TIIN", "trece", "", "13"], ["fourteen", "for-TIIN", "catorce", "", "14"], ["fifteen", "fif-TIIN", "quince", "", "15"],
          ["sixteen", "siks-TIIN", "dieciséis", "", "16"], ["seventeen", "se-ven-TIIN", "diecisiete", "", "17"], ["eighteen", "ei-TIIN", "dieciocho", "", "18"], ["nineteen", "nain-TIIN", "diecinueve", "", "19"], ["twenty", "TUEN-ti", "veinte", "", "20"]] }
      ],
      tips: [
        ["Del 13 al 19 terminan en **-teen** y la fuerza va al final: *zer-TIIN, for-TIIN*.", "13–19 end in -teen with the stress at the end: thir-TEEN."],
        ["**Three** empieza con el sonido *z* de España (lengua entre los dientes). No digas *tri*.", "Three starts with th: put your tongue between your teeth."],
        ["Para la edad usamos **be**, no *have*: **I'm ten** (tengo diez años). ✘ *I have ten years.*", "For age use be: I'm ten. Not: I have ten years."]
      ],
      sent: [
        ["How old are you?", "¿Cuántos años tienes?", "JAU OULD ar yuu?"],
        ["I'm ten years old.", "Tengo diez años.", "aim TEN yirs OULD."],
        ["One, two, three, go!", "¡Uno, dos, tres, ya!", "UAN, TUU, ZRII, GOU!"],
        ["It's number seven.", "Es el número siete.", "its NAM-ber SE-ven."],
        ["Two apples, please.", "Dos manzanas, por favor.", "TUU A-pels, PLIIS."]
      ]
    },
    {
      id: "s4", t: "Numbers 20–100", es: "Números del 20 al 100", ic: "💯", cover: "money", kind: "numbers",
      goal: ["Decir números grandes, precios y tu número de teléfono.", "Say bigger numbers, prices and your phone number."],
      groups: [
        { h: ["Tens", "Las decenas"], w: [
          ["twenty", "TUEN-ti", "veinte", "", "20"], ["thirty", "ZER-ti", "treinta", "", "30"], ["forty", "FOR-ti", "cuarenta", "", "40"], ["fifty", "FIF-ti", "cincuenta", "", "50"], ["sixty", "SIKS-ti", "sesenta", "", "60"],
          ["seventy", "SE-ven-ti", "setenta", "", "70"], ["eighty", "EI-ti", "ochenta", "", "80"], ["ninety", "NAIN-ti", "noventa", "", "90"], ["one hundred", "uan JAN-dred", "cien", "", "100"]] },
        { h: ["Put them together", "Júntalos"], w: [
          ["twenty-one", "tuen-ti-UAN", "veintiuno", "", "21"], ["thirty-five", "zer-ti-FAIV", "treinta y cinco", "", "35"], ["forty-two", "for-ti-TUU", "cuarenta y dos", "", "42"], ["fifty-eight", "fif-ti-EIT", "cincuenta y ocho", "", "58"],
          ["seventy-three", "se-ven-ti-ZRII", "setenta y tres", "", "73"], ["ninety-nine", "nain-ti-NAIN", "noventa y nueve", "", "99"], ["money", "MA-ni", "dinero", "money", "💵"], ["phone number", "FOUN nam-ber", "número de teléfono", "phone", "📱"]] }
      ],
      tips: [
        ["Las decenas terminan en **-ty** y la fuerza va al principio: *ZER-ti* (30). Compara con *zer-TIIN* (13).", "Tens end in -ty with stress at the start: THIR-ty (30) vs thir-TEEN (13)."],
        ["**Forty** (40) se escribe sin *u*, aunque four (4) sí la tiene.", "Forty has no u, but four does."],
        ["En inglés no se dice *y* entre decenas y unidades: 35 = **thirty-five** (con guion).", "No 'and' between tens and units: 35 = thirty-five."],
        ["El teléfono se dice número por número; el **0** se dice *ou* o *SI-rou*.", "Say phone numbers digit by digit; 0 = 'oh' or zero."]
      ],
      sent: [
        ["How much is it?", "¿Cuánto cuesta?", "JAU MACH is it?"],
        ["It's fifty pesos.", "Cuesta cincuenta pesos.", "its FIF-ti PEI-sous."],
        ["I'm thirty-two years old.", "Tengo treinta y dos años.", "aim zer-ti-TUU yirs OULD."],
        ["What's your phone number?", "¿Cuál es tu número de teléfono?", "uats yor FOUN nam-ber?"],
        ["My phone number is five, five, one, two.", "Mi número es cinco, cinco, uno, dos.", "mai FOUN nam-ber is FAIV, FAIV, UAN, TUU."]
      ]
    },
    {
      id: "s5", t: "Colours", es: "Los colores", ic: "🎨", cover: "colours", kind: "colors",
      goal: ["Nombrar 11 colores y decir de qué color es algo.", "Name 11 colours and say what colour something is."],
      groups: [
        { h: ["Colours", "Colores"], w: [
          ["red", "RED", "rojo", "red", "#e02424"], ["blue", "BLUU", "azul", "blue", "#1d4ed8"], ["green", "GRIIN", "verde", "green", "#15803d"], ["yellow", "YE-lou", "amarillo", "yellow", "#facc15"],
          ["orange", "O-rinch", "naranja / anaranjado", "orangecol", "#f97316"], ["purple", "PER-pel", "morado", "purple", "#7e22ce"], ["pink", "PINK", "rosa", "pink", "#ec4899"], ["brown", "BRAUN", "café / marrón", "brown", "#7c4a1e"],
          ["black", "BLAK", "negro", "black", "#111111"], ["white", "UAIT", "blanco", "white", "#ffffff"], ["grey", "GREI", "gris", "grey", "#8a8f98"], ["colour", "KA-ler", "color", "colours", "🎨"]] }
      ],
      tips: [
        ["En inglés el color va **antes** de la cosa: **a red car** (un coche rojo). ✘ *a car red*.", "In English the colour goes before the thing: a red car."],
        ["Los colores no cambian: **a red car, two red cars**. Nunca *reds*.", "Colours never change: two red cars (not reds)."],
        ["**Colour** (Reino Unido) y **color** (Estados Unidos) son la misma palabra.", "Colour (UK) and color (US) are the same word."]
      ],
      sent: [
        ["What colour is it?", "¿De qué color es?", "uat KA-ler is it?"],
        ["It's red.", "Es rojo.", "its RED."],
        ["The sky is blue.", "El cielo es azul.", "de SKAI is BLUU."],
        ["I have a green bag.", "Tengo una bolsa verde.", "ai jav a GRIIN BAG."],
        ["My favourite colour is purple.", "Mi color favorito es el morado.", "mai FEI-vo-rit KA-ler is PER-pel."]
      ]
    },
    {
      id: "s6", t: "Me and you", es: "Yo y tú: personas y pronombres", ic: "🧑", cover: "we",
      goal: ["Usar I, you, he, she, it, we, they y decir quién es quién.", "Use I, you, he, she, it, we, they and say who people are."],
      groups: [
        { h: ["Pronouns", "Pronombres"], w: [
          ["I", "AI", "yo", "i", "🙋"], ["you", "YUU", "tú / usted / ustedes", "you", "👉"], ["he", "JII", "él", "he", "👨"], ["she", "SHII", "ella", "she", "👩"],
          ["it", "IT", "eso (cosa o animal)", "it", "🐕"], ["we", "UII", "nosotros / nosotras", "we", "👫"], ["they", "DEI", "ellos / ellas", "they", "👥"]] },
        { h: ["People", "Personas"], w: [
          ["man", "MAN", "hombre", "man", "👨"], ["woman", "UU-man", "mujer", "woman", "👩"], ["boy", "BOI", "niño", "boy", "👦"], ["girl", "GERL", "niña", "girl", "👧"],
          ["teacher", "TII-cher", "maestro / maestra", "teacher", "🧑‍🏫"], ["student", "STIU-dent", "estudiante", "student", "🧑‍🎓"], ["friends", "FRENDS", "amigos", "friends", "🤝"]] }
      ],
      tips: [
        ["**I** (yo) siempre se escribe con mayúscula, aunque esté a la mitad de la oración.", "I is always a capital letter."],
        ["**You** sirve para tú, usted y ustedes. ¡Una sola palabra!", "You = tú, usted and ustedes."],
        ["Para cosas y animales usamos **it**. En español no se dice, pero en inglés es obligatorio: **It is a dog.**", "Use it for things and animals: It is a dog."],
        ["El verbo **be** (ser / estar): **I am · you are · he/she/it is · we are · they are**. Corto: I'm, you're, he's, she's, it's, we're, they're.", "be: I am, you are, he/she/it is, we are, they are."]
      ],
      sent: [
        ["I am a student.", "Yo soy estudiante.", "ai am a STIU-dent."],
        ["You are my friend.", "Tú eres mi amigo.", "yuu ar mai FREND."],
        ["He is a teacher.", "Él es maestro.", "jii is a TII-cher."],
        ["She is Maria.", "Ella es María.", "shii is ma-RI-a."],
        ["It is a dog.", "Es un perro.", "it is a DOG."],
        ["We are friends.", "Somos amigos.", "uii ar FRENDS."],
        ["They are students.", "Ellos son estudiantes.", "dei ar STIU-dents."]
      ]
    },
    {
      id: "s7", t: "My family", es: "Mi familia", ic: "👨‍👩‍👧", cover: "family",
      goal: ["Presentar a tu familia: This is my mother.", "Introduce your family: This is my mother."],
      groups: [
        { h: ["Family", "La familia"], w: [
          ["family", "FA-mi-li", "familia", "family", "👨‍👩‍👧"], ["mother", "MA-der", "mamá / madre", "mother", "👩"], ["father", "FA-der", "papá / padre", "father", "👨"], ["parents", "PE-rents", "papás / padres", "parents", "👫"],
          ["brother", "BRA-der", "hermano", "brother", "👦"], ["sister", "SIS-ter", "hermana", "sister", "👧"], ["baby", "BEI-bi", "bebé", "baby", "👶"], ["grandmother", "GRAN-ma-der", "abuela", "grandmother", "👵"],
          ["grandfather", "GRAN-fa-der", "abuelo", "grandfather", "👴"], ["son", "SAN", "hijo", "son", "👦"], ["daughter", "DO-ter", "hija", "daughter", "👧"], ["husband", "JAS-band", "esposo", "husband", "🤵"], ["wife", "UAIF", "esposa", "wife", "👰"]] }
      ],
      tips: [
        ["**Parents** significa papás (padre y madre), no *parientes*. Parientes = **relatives**.", "Parents = mother and father, not relatives."],
        ["**This is my…** = Este/Esta es mi… Sirve para presentar a alguien: **This is my sister.**", "This is my… is how we introduce people."],
        ["En **mother, father, brother** la **th** suena como una *d* suave con la lengua entre los dientes.", "The th in mother sounds like a soft d with your tongue between your teeth."]
      ],
      sent: [
        ["This is my family.", "Esta es mi familia.", "dis is mai FA-mi-li."],
        ["This is my mother.", "Esta es mi mamá.", "dis is mai MA-der."],
        ["He is my brother.", "Él es mi hermano.", "jii is mai BRA-der."],
        ["I have two sisters.", "Tengo dos hermanas.", "ai jav TUU SIS-ters."],
        ["My grandmother is seventy.", "Mi abuela tiene setenta años.", "mai GRAN-ma-der is SE-ven-ti."]
      ]
    },
    {
      id: "s8", t: "My body", es: "Mi cuerpo y mi cara", ic: "🙂", cover: "face",
      goal: ["Nombrar las partes del cuerpo y de la cara.", "Name parts of the body and face."],
      groups: [
        { h: ["Face", "La cara"], w: [
          ["face", "FEIS", "cara", "face", "🙂"], ["eyes", "AIS", "ojos", "eyes", "👀"], ["ears", "IRS", "orejas", "ears", "👂"], ["nose", "NOUS", "nariz", "nose", "👃"],
          ["mouth", "MAUZ", "boca", "mouth", "👄"], ["teeth", "TIIZ", "dientes", "teeth", "🦷"], ["hair", "JER", "cabello / pelo", "hair", "💇"]] },
        { h: ["Body", "El cuerpo"], w: [
          ["head", "JED", "cabeza", "head", "🧑"], ["hand", "JAND", "mano", "hand", "✋"], ["fingers", "FIN-guers", "dedos", "fingers", "🖐️"], ["arm", "ARM", "brazo", "", "💪"],
          ["leg", "LEG", "pierna", "leg", "🦵"], ["foot", "FUT", "pie", "foot", "🦶"], ["feet", "FIIT", "pies", "feet", "👣"]] }
      ],
      tips: [
        ["Plural irregular: **one foot → two feet** · **one tooth → two teeth**.", "Irregular plurals: foot → feet, tooth → teeth."],
        ["**Hair** (cabello) no lleva *s*: **My hair is black.** ✘ *My hairs are black.*", "Hair has no s: My hair is black."],
        ["Para órdenes usamos solo el verbo: **Touch your nose!** (¡Toca tu nariz!)", "For instructions use the verb alone: Touch your nose!"]
      ],
      sent: [
        ["I have two eyes.", "Tengo dos ojos.", "ai jav TUU AIS."],
        ["This is my hand.", "Esta es mi mano.", "dis is mai JAND."],
        ["Touch your nose!", "¡Toca tu nariz!", "TACH yor NOUS!"],
        ["My hair is black.", "Mi cabello es negro.", "mai JER is BLAK."],
        ["Open your mouth, please.", "Abre la boca, por favor.", "OU-pen yor MAUZ, PLIIS."]
      ]
    },
    {
      id: "s9", t: "Animals", es: "Los animales", ic: "🐶", cover: "dog",
      goal: ["Nombrar animales y decir cuál te gusta.", "Name animals and say which ones you like."],
      groups: [
        { h: ["Pets and farm animals", "Mascotas y animales de granja"], w: [
          ["dog", "DOG", "perro", "dog", "🐶"], ["cat", "KAT", "gato", "cat", "🐱"], ["bird", "BERD", "pájaro", "bird", "🐦"], ["fish", "FISH", "pez", "fish", "🐟"],
          ["rabbit", "RA-bit", "conejo", "rabbit", "🐰"], ["mouse", "MAUS", "ratón", "mouse", "🐭"], ["horse", "JORS", "caballo", "horse", "🐴"], ["cow", "KAU", "vaca", "cow", "🐮"],
          ["pig", "PIG", "cerdo / puerco", "pig", "🐷"], ["chicken", "CHI-ken", "pollo / gallina", "chicken", "🐔"], ["duck", "DAK", "pato", "duck", "🦆"]] },
        { h: ["Wild animals", "Animales salvajes"], w: [
          ["lion", "LAI-on", "león", "lion", "🦁"], ["tiger", "TAI-guer", "tigre", "tiger", "🐯"], ["elephant", "E-le-fant", "elefante", "elephant", "🐘"], ["monkey", "MAN-ki", "mono / chango", "monkey", "🐵"], ["snake", "SNEIK", "serpiente / víbora", "snake", "🐍"]] }
      ],
      tips: [
        ["Plural: agrega **-s**: one dog → two dogs. Irregular: **mouse → mice**, **fish → fish**.", "Plural: add -s. Irregular: mouse → mice, fish → fish."],
        ["**A** antes de consonante, **an** antes de vocal: **a dog, an elephant**.", "a before a consonant sound, an before a vowel sound: an elephant."],
        ["Para gustos generales usamos plural: **I like dogs.** (Me gustan los perros.)", "For likes in general use the plural: I like dogs."]
      ],
      sent: [
        ["It's a dog.", "Es un perro.", "its a DOG."],
        ["The cat is black.", "El gato es negro.", "de KAT is BLAK."],
        ["I like dogs.", "Me gustan los perros.", "ai LAIK DOGS."],
        ["I don't like snakes.", "No me gustan las serpientes.", "ai DOUNT laik SNEIKS."],
        ["An elephant is big.", "Un elefante es grande.", "an E-le-fant is BIG."]
      ]
    },
    {
      id: "s10", t: "Food and drinks", es: "Comida y bebidas", ic: "🍎", cover: "food",
      goal: ["Nombrar comida y bebida, decir qué te gusta y pedir algo.", "Name food and drinks, say what you like and ask for things."],
      groups: [
        { h: ["Drinks", "Bebidas"], w: [
          ["water", "UOO-ter", "agua", "water", "💧"], ["milk", "MILK", "leche", "milk", "🥛"], ["juice", "YUUS", "jugo", "juice", "🧃"], ["coffee", "KO-fi", "café", "coffee", "☕"], ["tea", "TII", "té", "tea", "🍵"]] },
        { h: ["Food", "Comida"], w: [
          ["bread", "BRED", "pan", "bread", "🍞"], ["egg", "EG", "huevo", "egg", "🥚"], ["rice", "RAIS", "arroz", "rice", "🍚"], ["meat", "MIIT", "carne", "meat", "🥩"], ["cheese", "CHIIS", "queso", "cheese", "🧀"],
          ["apple", "A-pel", "manzana", "apple", "🍎"], ["banana", "ba-NA-na", "plátano", "banana", "🍌"], ["orange", "O-rinch", "naranja", "orange", "🍊"], ["tomato", "to-MA-tou", "jitomate / tomate", "tomato", "🍅"],
          ["soup", "SUUP", "sopa", "soup", "🍲"], ["cake", "KEIK", "pastel", "cake", "🎂"], ["sandwich", "SAND-uich", "sándwich", "sandwich", "🥪"], ["pizza", "PIIT-sa", "pizza", "pizza", "🍕"], ["tacos", "TA-kous", "tacos", "tacos", "🌮"]] }
      ],
      tips: [
        ["**I like…** = Me gusta… · **I don't like…** = No me gusta…", "I like… / I don't like…"],
        ["Para pedir algo con educación: **Can I have…, please?** (¿Me da…, por favor?)", "Ask politely: Can I have…, please?"],
        ["**Hungry** = tener hambre · **thirsty** = tener sed. En inglés se usa **be**: **I'm hungry.**", "I'm hungry. I'm thirsty. (with be, not have)"]
      ],
      sent: [
        ["I like pizza.", "Me gusta la pizza.", "ai LAIK PIIT-sa."],
        ["I don't like milk.", "No me gusta la leche.", "ai DOUNT laik MILK."],
        ["I'm hungry.", "Tengo hambre.", "aim JAN-gri."],
        ["Water, please.", "Agua, por favor.", "UOO-ter, PLIIS."],
        ["Can I have a coffee, please?", "¿Me da un café, por favor?", "kan ai jav a KO-fi, PLIIS?"],
        ["Do you like tacos? Yes, I do.", "¿Te gustan los tacos? Sí.", "du yuu LAIK TA-kous? YES, ai DUU."]
      ]
    },
    {
      id: "s11", t: "Clothes", es: "La ropa", ic: "👕", cover: "clothes",
      goal: ["Nombrar la ropa y decir de qué color es.", "Name clothes and say their colour."],
      groups: [
        { h: ["Clothes", "Ropa"], w: [
          ["T-shirt", "TII-shert", "playera / camiseta", "tshirt", "👕"], ["shirt", "SHERT", "camisa", "shirt", "👔"], ["trousers", "TRAU-sers", "pantalón (UK)", "trousers", "👖"], ["jeans", "YIINS", "pantalón de mezclilla", "jeans", "👖"],
          ["dress", "DRES", "vestido", "dress", "👗"], ["skirt", "SKERT", "falda", "skirt", "👗"], ["sweater", "SUE-ter", "suéter", "sweater", "🧶"], ["jacket", "YA-ket", "chamarra / chaqueta", "jacket", "🧥"],
          ["coat", "KOUT", "abrigo", "coat", "🧥"], ["shoes", "SHUUS", "zapatos", "shoes", "👞"], ["socks", "SOKS", "calcetines", "socks", "🧦"], ["hat", "JAT", "sombrero", "hat", "👒"], ["cap", "KAP", "gorra", "cap", "🧢"], ["glasses", "GLA-sis", "lentes / anteojos", "glasses", "👓"]] }
      ],
      tips: [
        ["**Trousers, jeans, shoes, socks, glasses** siempre van en plural: **My jeans are blue.**", "Trousers, jeans, shoes, socks, glasses are always plural."],
        ["En Estados Unidos dicen **pants** en lugar de **trousers**.", "In the US, trousers = pants."],
        ["Recuerda: color **antes** de la ropa: **a red dress, black shoes**.", "Colour first: a red dress."]
      ],
      sent: [
        ["I have a red T-shirt.", "Tengo una playera roja.", "ai jav a RED TII-shert."],
        ["My shoes are black.", "Mis zapatos son negros.", "mai SHUUS ar BLAK."],
        ["She has a blue dress.", "Ella tiene un vestido azul.", "shii jas a BLUU DRES."],
        ["Put on your jacket.", "Ponte la chamarra.", "PUT on yor YA-ket."],
        ["These are my new jeans.", "Estos son mis jeans nuevos.", "DIIS ar mai NIUU YIINS."]
      ]
    },
    {
      id: "s12", t: "In the classroom", es: "En el salón de clases", ic: "📚", cover: "classroom",
      goal: ["Nombrar objetos, usar a / an y entender instrucciones de clase.", "Name things, use a / an and understand classroom instructions."],
      groups: [
        { h: ["Things", "Objetos"], w: [
          ["book", "BUK", "libro", "book", "📕"], ["notebook", "NOUT-buk", "cuaderno", "notebook", "📓"], ["pen", "PEN", "pluma", "pen", "🖊️"], ["pencil", "PEN-sel", "lápiz", "pencil", "✏️"],
          ["bag", "BAG", "mochila / bolsa", "bag", "🎒"], ["desk", "DESK", "escritorio / pupitre", "desk", "🪑"], ["chair", "CHER", "silla", "chair", "🪑"], ["table", "TEI-bel", "mesa", "table", "🪵"],
          ["board", "BORD", "pizarrón", "board", "🧑‍🏫"], ["computer", "kom-PIU-ter", "computadora", "computer", "💻"], ["phone", "FOUN", "teléfono / celular", "phone", "📱"], ["door", "DOR", "puerta", "door", "🚪"],
          ["window", "UIN-dou", "ventana", "window", "🪟"], ["key", "KII", "llave", "key", "🔑"], ["clock", "KLOK", "reloj (de pared)", "clock", "🕒"]] }
      ],
      tips: [
        ["**What's this?** = ¿Qué es esto? · **It's a pen.** = Es una pluma.", "What's this? It's a pen."],
        ["**This** = esto (cerca) · **That** = eso (lejos).", "This = near, that = far."],
        ["Instrucciones de clase: **Listen** (escucha) · **Repeat** (repite) · **Open your book** (abre tu libro) · **Close the door** (cierra la puerta) · **Sit down** (siéntate).", "Classroom instructions: listen, repeat, open your book, close the door, sit down."]
      ],
      sent: [
        ["What's this? It's a pencil.", "¿Qué es esto? Es un lápiz.", "uats DIS? its a PEN-sel."],
        ["Open your book, please.", "Abre tu libro, por favor.", "OU-pen yor BUK, PLIIS."],
        ["Close the door, please.", "Cierra la puerta, por favor.", "KLOUS de DOR, PLIIS."],
        ["Is this your bag? Yes, it is.", "¿Esta es tu mochila? Sí.", "is DIS yor BAG? YES, it IS."],
        ["Listen and repeat.", "Escucha y repite.", "LI-sen and ri-PIIT."],
        ["I have a notebook and a pen.", "Tengo un cuaderno y una pluma.", "ai jav a NOUT-buk and a PEN."]
      ]
    },
    {
      id: "s13", t: "My house", es: "Mi casa", ic: "🏠", cover: "house",
      goal: ["Nombrar los cuartos y muebles y decir dónde están las cosas.", "Name rooms and furniture and say where things are."],
      groups: [
        { h: ["Rooms and things", "Cuartos y muebles"], w: [
          ["house", "JAUS", "casa", "house", "🏠"], ["kitchen", "KI-chen", "cocina", "kitchen", "🍳"], ["bedroom", "BED-ruum", "recámara", "bedroom", "🛏️"], ["bathroom", "BAAZ-ruum", "baño", "bathroom", "🛁"],
          ["living room", "LI-ving ruum", "sala", "livingroom", "🛋️"], ["garden", "GAR-den", "jardín", "garden", "🌷"], ["bed", "BED", "cama", "bed", "🛏️"], ["sofa", "SOU-fa", "sofá / sillón", "sofa", "🛋️"],
          ["fridge", "FRICH", "refrigerador", "fridge", "🧊"], ["TV", "tii-VII", "televisión", "tv", "📺"], ["lamp", "LAMP", "lámpara", "lamp", "💡"]] },
        { h: ["Where is it?", "¿Dónde está?"], w: [
          ["in", "IN", "dentro de / en", "in", "📦"], ["on", "ON", "sobre / encima de", "on", "⬆️"], ["under", "AN-der", "debajo de", "under", "⬇️"], ["next to", "NEKST tu", "junto a / al lado de", "nextto", "↔️"]] }
      ],
      tips: [
        ["**There is** = hay (una cosa) · **There are** = hay (varias): **There is a sofa. There are two beds.**", "There is (one) / There are (two or more)."],
        ["**Where is…?** = ¿Dónde está…? · **It's in / on / under…**", "Where is…? It's in / on / under…"],
        ["**In** = adentro, **on** = encima, **under** = abajo. En español *en* sirve para in y on.", "In = inside, on = on top, under = below."]
      ],
      sent: [
        ["This is my house.", "Esta es mi casa.", "dis is mai JAUS."],
        ["There is a sofa in the living room.", "Hay un sillón en la sala.", "der is a SOU-fa in de LI-ving ruum."],
        ["Where is the cat?", "¿Dónde está el gato?", "UER is de KAT?"],
        ["The cat is on the bed.", "El gato está sobre la cama.", "de KAT is on de BED."],
        ["The ball is under the table.", "La pelota está debajo de la mesa.", "de BOOL is AN-der de TEI-bel."],
        ["There are two bedrooms.", "Hay dos recámaras.", "der ar TUU BED-ruums."]
      ]
    },
    {
      id: "s14", t: "Days and weather", es: "Días, meses y el clima", ic: "📅", cover: "sunny",
      goal: ["Decir los días, los meses y cómo está el clima.", "Say the days, the months and what the weather is like."],
      groups: [
        { h: ["Days of the week", "Días de la semana"], w: [
          ["Monday", "MAN-dei", "lunes", "", "1️⃣"], ["Tuesday", "TIUS-dei", "martes", "", "2️⃣"], ["Wednesday", "UENS-dei", "miércoles", "", "3️⃣"], ["Thursday", "ZERS-dei", "jueves", "", "4️⃣"],
          ["Friday", "FRAI-dei", "viernes", "", "5️⃣"], ["Saturday", "SA-ter-dei", "sábado", "", "6️⃣"], ["Sunday", "SAN-dei", "domingo", "", "7️⃣"], ["today", "tu-DEI", "hoy", "", "📍"], ["tomorrow", "tu-MO-rou", "mañana", "", "➡️"]] },
        { h: ["Months", "Meses"], w: [
          ["January", "YA-niu-e-ri", "enero", "", "❄️"], ["February", "FE-bru-e-ri", "febrero", "", "💘"], ["March", "MARCH", "marzo", "", "🌱"], ["April", "EI-pril", "abril", "", "🌧️"], ["May", "MEI", "mayo", "", "🌸"], ["June", "YUUN", "junio", "", "☀️"],
          ["July", "yu-LAI", "julio", "", "🏖️"], ["August", "OO-gast", "agosto", "", "🌻"], ["September", "sep-TEM-ber", "septiembre", "", "🇲🇽"], ["October", "ok-TOU-ber", "octubre", "", "🎃"], ["November", "nou-VEM-ber", "noviembre", "", "🍂"], ["December", "di-SEM-ber", "diciembre", "", "🎄"]] },
        { h: ["Weather", "El clima"], w: [
          ["sunny", "SA-ni", "soleado", "sunny", "☀️"], ["rainy", "REI-ni", "lluvioso", "rainy", "🌧️"], ["cloudy", "KLAU-di", "nublado", "cloudy", "☁️"], ["windy", "UIN-di", "con viento", "windy", "🌬️"],
          ["snowy", "SNOU-i", "con nieve", "snowy", "❄️"], ["hot", "JOT", "caliente / hace calor", "hot", "🥵"], ["cold", "KOULD", "frío / hace frío", "cold", "🥶"]] }
      ],
      tips: [
        ["En inglés los días y los meses se escriben con **mayúscula**: Monday, May.", "Days and months start with a capital letter."],
        ["Con días usamos **on**: **on Monday**. Con meses usamos **in**: **in May**.", "on + day, in + month."],
        ["Para el clima usamos **It's**: **It's sunny. It's cold.** ✘ *Is sunny* / *Makes cold*.", "Weather: It's sunny. It's cold."]
      ],
      sent: [
        ["Today is Monday.", "Hoy es lunes.", "tu-DEI is MAN-dei."],
        ["What's the weather like?", "¿Cómo está el clima?", "uats de UE-der LAIK?"],
        ["It's sunny and hot.", "Está soleado y hace calor.", "its SA-ni and JOT."],
        ["It's cold today.", "Hoy hace frío.", "its KOULD tu-DEI."],
        ["My birthday is in May.", "Mi cumpleaños es en mayo.", "mai BERZ-dei is in MEI."],
        ["See you on Friday!", "¡Nos vemos el viernes!", "SII yuu on FRAI-dei!"]
      ]
    },
    {
      id: "s15", t: "Actions and first sentences", es: "Acciones y mis primeras oraciones", ic: "🏃", cover: "run",
      goal: ["Usar verbos con I like, I can y I don't para hablar de ti.", "Use verbs with I like, I can and I don't to talk about yourself."],
      groups: [
        { h: ["Actions", "Acciones (verbos)"], w: [
          ["eat", "IIT", "comer", "eat", "🍽️"], ["drink", "DRINK", "beber / tomar", "drink", "🥤"], ["sleep", "SLIIP", "dormir", "sleep", "😴"], ["run", "RAN", "correr", "run", "🏃"],
          ["walk", "UOOK", "caminar", "walk", "🚶"], ["read", "RIID", "leer", "read", "📖"], ["write", "RAIT", "escribir", "write", "✍️"], ["play", "PLEI", "jugar / tocar", "play", "⚽"],
          ["swim", "SUIM", "nadar", "swim", "🏊"], ["sing", "SING", "cantar", "sing", "🎤"], ["dance", "DANS", "bailar", "dance", "💃"], ["cook", "KUK", "cocinar", "cook", "👩‍🍳"],
          ["study", "STA-di", "estudiar", "study", "📚"], ["work", "UERK", "trabajar", "work", "💼"], ["listen", "LI-sen", "escuchar", "listen", "🎧"], ["speak", "SPIIK", "hablar", "speak", "🗣️"]] }
      ],
      tips: [
        ["**I like + verbo-ing**: I like swimming. (Me gusta nadar.) También: I like to swim.", "I like + -ing: I like swimming."],
        ["**I can** = yo puedo / sé: **I can swim.** · **I can't** = no puedo / no sé.", "I can swim. I can't sing."],
        ["Negativo: **I don't** + verbo: **I don't cook.** (No cocino.)", "Negative: I don't + verb."],
        ["¡Ya puedes hablar de ti! Junta todo: nombre + edad + gustos + habilidades.", "Now put it all together: name, age, likes and abilities."]
      ],
      sent: [
        ["I like swimming.", "Me gusta nadar.", "ai LAIK SUI-ming."],
        ["I can sing.", "Sé cantar.", "ai kan SING."],
        ["I can't dance.", "No sé bailar.", "ai KANT DANS."],
        ["I don't cook.", "No cocino.", "ai DOUNT KUK."],
        ["I study English every day.", "Estudio inglés todos los días.", "ai STA-di ING-lish E-vri DEI."],
        ["My name is Ana. I'm ten. I like dogs and I can swim.", "Me llamo Ana. Tengo diez años. Me gustan los perros y sé nadar.", "mai NEIM is A-na. aim TEN. ai LAIK DOGS and ai kan SUIM."]
      ]
    }
  ]
};

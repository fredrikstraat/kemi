export const gradingRubric = {
  A: "Mycket goda kunskaper. Eleven använder begrepp säkert, kopplar ihop orsaker och följder tydligt och kan resonera väl om miljö och hälsa.",
  C: "Goda kunskaper. Eleven använder begrepp ganska säkert och förklarar samband på ett relativt tydligt sätt.",
  E: "Grundläggande kunskaper. Eleven visar att hen förstår det viktigaste och använder några relevanta begrepp.",
  BELOW_E: "På väg mot E. Svaret är för kort, otydligt eller saknar de viktigaste delarna."
};

export const studySections = [
  {
    id: "clean",
    title: "Hur blir kroppen ren?",
    summary: [
      "Vattenmolekyler är polära. De har en positiv sida och en negativ sida.",
      "Många fetter är opolära. Därför löser vatten inte fett särskilt bra.",
      "Regeln LIKA LÖSER LIKA betyder att polära ämnen löser polära ämnen och opolära ämnen löser opolära ämnen.",
      "Tensider i tvål och schampo fungerar som en bro mellan vatten och fett.",
      "Bakterier i plack kan bilda syror som skadar emaljen på tänderna.",
      "Fluor i tandkräm hjälper till att höja pH-värdet och skydda tänderna mot syror."
    ]
  },
  {
    id: "smell",
    title: "Molekyler kan lukta",
    summary: [
      "Vi känner lukt när doftmolekyler når näsan och fastnar i luktsinnescellerna.",
      "För att något ska lukta måste ämnet kunna avdunsta så att molekylerna kommer upp i luften.",
      "Svett i sig luktar inte starkt. Lukten uppstår när bakterier bryter ner ämnen på huden.",
      "Deodoranter kan innehålla bakteriedödande ämnen och parfym.",
      "Antiperspiranter kan minska svettningen.",
      "Parfym består ofta av flera doftämnen. De minsta molekylerna avdunstar först."
    ]
  },
  {
    id: "choices",
    title: "Att göra aktiva val",
    summary: [
      "Naturliga ämnen finns i naturen. Konstgjorda ämnen framställs av människor.",
      "Ämnen från hygienprodukter kan komma in i kroppen genom huden, inandning eller om vi får dem i munnen.",
      "Vissa ämnen kan vara skadliga för hälsan eller miljön.",
      "Miljömärkningar som Svanen och Bra Miljöval hjälper oss att välja bättre produkter.",
      "Avloppsrening tar inte bort allt. Därför är det smart att använda lagom mycket produkt.",
      "Miljöfarliga rester ska lämnas på miljöstation, inte hällas i avloppet."
    ]
  }
];

export const questionBank = [
  {
    id: "water-fat",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    level: "C",
    isFocus: true,
    focusLabel: "3.1 Testa dig själv",
    prompt: "Varför använder vi schampo och tvål i stället för bara vatten när vi tvättar oss?",
    hint: "Tänk på vattenmolekyler, fettmolekyler och tensider.",
    starter: "Vi använder schampo och tvål eftersom ...",
    bookSupport: "I boken står att många fetter består av opolära molekyler och att vatten därför inte är bra på att lösa fett.",
    shortAnswer: "Vatten är polärt men fett är opolärt, så vatten löser inte fett så bra. Tvål och schampo innehåller tensider som hjälper vatten att få med sig fettet bort.",
    mustMention: ["vatten är polärt", "fett är opolärt", "vatten löser inte fett bra"],
    goodToMention: ["tensider", "tvål eller schampo hjälper till att få bort fett"],
    stretchPoints: ["koppla till regeln lika löser lika"]
  },
  {
    id: "like-dissolves-like",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    level: "A",
    isFocus: true,
    focusLabel: "3.1 Testa dig själv",
    prompt: "Ge exempel på situationer där regeln LIKA LÖSER LIKA kan ha betydelse.",
    hint: "Ett exempel kan handla om vatten, fett, tvål eller schampo.",
    starter: "Regeln LIKA LÖSER LIKA märks till exempel när ...",
    bookSupport: "I boken finns minnesregeln LIKA LÖSER LIKA: ämnen med liknande egenskaper har lättare att lösa sig i varandra.",
    shortAnswer: "Regeln märks när vi tvättar bort fett. Vatten är polärt och fett är opolärt, så vatten löser inte fett bra. Tvål eller schampo innehåller tensider som hjälper till att få bort fettet.",
    mustMention: ["lika löser lika", "ett riktigt exempel eller en situation", "koppling mellan vatten och fett eller polärt och opolärt"],
    goodToMention: ["tvål", "schampo", "tensider"],
    stretchPoints: ["förklara varför regeln fungerar i just exemplet"]
  },
  {
    id: "tensider",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    level: "A",
    prompt: "Hur hjälper tensider i schampo eller tvål dig att bli ren?",
    hint: "Tensiden har två olika ändar.",
    starter: "Tensider hjälper till genom att ...",
    bookSupport: "I texten står att tensider fungerar som en bro mellan vatten och fett.",
    shortAnswer: "Tensider har en opolär ände som fastnar i fett och en polär ände som fastnar i vatten. Då kan fettet lösas upp och sköljas bort.",
    mustMention: ["en ände fastnar i fett", "en ände fastnar i vatten", "fettet kan sköljas bort"],
    goodToMention: ["opolär ände", "polär ände", "tensiden fungerar som en bro"],
    stretchPoints: ["koppla till lika löser lika"]
  },
  {
    id: "brush-teeth",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    level: "E",
    prompt: "Varför borstar vi tänderna?",
    hint: "Tänk på plack, bakterier och hål i tänderna.",
    starter: "Vi borstar tänderna för att ...",
    bookSupport: "I boken står att bakterier i plack kan bilda syror som fräter på emaljen.",
    shortAnswer: "Vi borstar bort plack och matrester. Då minskar mängden bakterier och syror som kan skada emaljen och ge karies.",
    mustMention: ["plack eller matrester", "bakterier eller syror", "skydda tänderna mot hål/karies"],
    goodToMention: ["emalj"],
    stretchPoints: ["nämna att emaljen inte växer tillbaka"]
  },
  {
    id: "fluoride-ph",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    level: "A",
    isFocus: true,
    focusLabel: "3.1 Testa dig själv",
    prompt: "Vad händer med pH-värdet i munnen när vi äter socker eller sura saker? Varför är det dåligt och vad kan vi göra åt det?",
    hint: "Använd gärna orden surt, neutralt och basiskt.",
    starter: "När vi äter socker eller sura saker ...",
    bookSupport: "I boken står att fluor höjer pH-värdet i munnen och neutraliserar syrorna.",
    shortAnswer: "När vi äter socker eller sura saker sjunker pH-värdet i munnen och det blir surare. Det är dåligt eftersom syror kan skada emaljen. Vi kan borsta tänderna med fluor så att pH-värdet höjs och syrorna neutraliseras.",
    mustMention: ["pH-värdet sjunker eller blir surare", "det skadar emaljen eller ökar risken för karies", "vad man kan göra åt det"],
    goodToMention: ["surt", "neutralt", "basiskt", "fluor neutraliserar eller höjer pH"],
    stretchPoints: ["koppla till bakterier och socker"]
  },
  {
    id: "why-smell",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    level: "C",
    isFocus: true,
    focusLabel: "3.2 Testa dig själv",
    prompt: "Vad är det som gör att vissa ämnen luktar och andra inte?",
    hint: "Fundera på molekylernas form och luktsinnescellerna i näsan.",
    starter: "Vissa ämnen luktar eftersom ...",
    bookSupport: "I boken står att om ett ämne luktar eller inte beror på molekylernas form och hur de sitter ihop.",
    shortAnswer: "Ämnen luktar när deras molekyler kan nå näsan och fastna i luktsinnescellerna. Om molekylerna inte kan fastna där känner vi ingen lukt.",
    mustMention: ["molekyler når näsan", "fastnar i luktsinnescellerna"],
    goodToMention: ["molekylernas form spelar roll"],
    stretchPoints: ["koppla till avdunstning"]
  },
  {
    id: "deodorant-bacteria",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    level: "C",
    isFocus: true,
    focusLabel: "3.2 Testa dig själv",
    prompt: "Varför innehåller deodoranter ofta ämnen som dödar bakterier?",
    hint: "Tänk på varför svett ibland börjar lukta.",
    starter: "Deodoranter innehåller sådana ämnen eftersom ...",
    bookSupport: "I texten står att svett i sig inte luktar så mycket, utan att lukten uppstår när bakterier bildar illaluktande ämnen.",
    shortAnswer: "Svett luktar inte starkt från början. Lukten uppstår när bakterier bryter ner ämnen på huden. Därför kan deodorant innehålla ämnen som dödar bakterier och minskar lukten.",
    mustMention: ["bakterier orsakar lukt", "deodorant minskar lukt"],
    goodToMention: ["svett luktar inte starkt direkt", "bakteriedödande ämnen"],
    stretchPoints: ["jämför med antiperspirant"]
  },
  {
    id: "evaporation-smell",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    level: "A",
    isFocus: true,
    focusLabel: "3.2 Testa dig själv",
    prompt: "Hur kommer det sig att en parfym kan ändra doft om du har den på dig under en dag?",
    hint: "Använd orden molekyl och avdunstning.",
    starter: "En parfym kan ändra doft eftersom ...",
    bookSupport: "I boken står att de minsta molekylerna avdunstar först och att de största stannar kvar längre.",
    shortAnswer: "Parfym består av olika doftmolekyler. De mindre molekylerna avdunstar först. Sen finns andra molekyler kvar, och därför kan doften ändras under dagen.",
    mustMention: ["molekyl", "avdunstning", "olika molekyler avdunstar olika snabbt"],
    goodToMention: ["små molekyler först", "doften förändras med tiden"],
    stretchPoints: ["koppla till vätska och gasform"]
  },
  {
    id: "deo-antiperspirant",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    level: "C",
    prompt: "Vad är skillnaden mellan deodorant och antiperspirant?",
    hint: "Den ena jobbar mest mot lukt, den andra kan minska svett.",
    starter: "Skillnaden är att ...",
    bookSupport: "I texten står att deodoranter hjälper mot lukt medan antiperspiranter kan minska själva svettningen.",
    shortAnswer: "Deodorant hjälper främst mot lukt och kan innehålla parfym eller bakteriedödande ämnen. Antiperspirant minskar själva svettningen.",
    mustMention: ["deodorant mot lukt", "antiperspirant minskar svettning"],
    goodToMention: ["bakterier", "parfym"],
    stretchPoints: ["koppla till varför svettlukt uppstår"]
  },
  {
    id: "natural-signals",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    level: "A",
    isFocus: true,
    focusLabel: "3.2 Testa dig själv",
    prompt: "Ge exempel på hur dofter kan ha betydelse i naturen.",
    hint: "Du kan tänka på växter, djur eller feromoner.",
    starter: "Dofter kan vara viktiga i naturen eftersom ...",
    bookSupport: "I boken finns exempel på att blommor kan locka insekter och att djur kan använda dofter för att varna eller hitta en partner.",
    shortAnswer: "Blommor kan dofta för att locka insekter som hjälper till med pollinering. Djur kan använda doftsignaler för att varna andra, hitta mat eller hitta en partner.",
    mustMention: ["minst ett exempel från naturen", "vad doften hjälper till med"],
    goodToMention: ["feromoner", "pollinering", "kommunikation"],
    stretchPoints: ["ge två olika exempel"]
  },
  {
    id: "natural-artificial",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    level: "E",
    prompt: "Vad är skillnaden mellan ett naturligt ämne och ett konstgjort ämne?",
    hint: "Tänk på var ämnet kommer ifrån.",
    starter: "Skillnaden är att ...",
    bookSupport: "I boken står att naturliga ämnen finns i naturen medan konstgjorda ämnen framställs av människor.",
    shortAnswer: "Naturliga ämnen finns i naturen. Konstgjorda ämnen framställs av människor, ofta genom att förändra ämnen som redan finns i naturen.",
    mustMention: ["naturliga ämnen finns i naturen", "konstgjorda ämnen framställs av människor"],
    goodToMention: ["människan kan förändra naturliga ämnen"],
    stretchPoints: ["ge ett exempel från hygienprodukter"]
  },
  {
    id: "body-risks",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    level: "C",
    isFocus: true,
    focusLabel: "3.3 Testa dig själv",
    prompt: "Nämn tre sätt som ämnen kan ta sig in i kroppen på.",
    hint: "Tänk på huden, luften och munnen.",
    starter: "Ämnen kan ta sig in i kroppen genom ...",
    bookSupport: "I boken står att ämnen kan komma in i kroppen genom huden, luften vi andas och om vi får dem i munnen.",
    shortAnswer: "Ämnen kan ta sig in genom huden, genom att vi andas in dem och genom att vi får dem i munnen.",
    mustMention: ["genom huden", "genom inandning", "genom munnen"],
    goodToMention: ["till exempel från hygienprodukter"],
    stretchPoints: ["förklara varför det kan vara ett problem om ämnena är farliga"]
  },
  {
    id: "manufactured-risks",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    level: "A",
    isFocus: true,
    focusLabel: "3.3 Testa dig själv",
    prompt: "Vi framställer ofta ämnen som redan finns i naturen. Vad kan det finnas för risker med det?",
    hint: "Tänk på hälsa, miljö och att ämnen kan ta sig in i kroppen.",
    starter: "Riskerna kan vara att ...",
    bookSupport: "I texten står att vissa ämnen kan vara skadliga för hälsan och miljön och att vetenskapen hela tiden lär sig mer om riskerna.",
    shortAnswer: "Riskerna kan vara att ämnena är skadliga för hälsan eller miljön. De kan till exempel tas upp genom huden, andas in eller komma ut i naturen där de påverkar människor, djur och vatten.",
    mustMention: ["risk för hälsan eller miljön", "ämnen kan tas upp av kroppen eller spridas i naturen"],
    goodToMention: ["allergi", "farliga ämnen", "miljöproblem"],
    stretchPoints: ["koppla till att vi bör välja mindre farliga produkter"]
  },
  {
    id: "dangerous-substances",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    level: "A",
    isFocus: true,
    focusLabel: "3.3 Testa dig själv",
    prompt: "Ge ett par exempel på ämnen i hygienprodukter som kan vara farliga för hälsan.",
    hint: "Tänk på exempel som nämns i texten.",
    starter: "Exempel på sådana ämnen är ...",
    bookSupport: "I boken nämns bland annat ftalater, alkohol i vissa produkter och aluminium i vissa antiperspiranter.",
    shortAnswer: "Exempel är ftalater, vissa starka doftämnen, alkohol i vissa produkter och aluminium i vissa antiperspiranter. De kan ge allergi, torka ut huden eller påverka kroppen negativt.",
    mustMention: ["minst två exempel på ämnen eller ämnesgrupper", "att de kan vara skadliga"],
    goodToMention: ["ftalater", "alkohol", "aluminium", "starka doftämnen", "allergi"],
    stretchPoints: ["förklara hur något av ämnena kan påverka kroppen"]
  },
  {
    id: "active-choices",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    level: "A",
    prompt: "Hur kan du göra aktiva val som är bättre både för hälsan och miljön när du väljer hygienprodukter?",
    hint: "Tänk på märkningar, mängd och hur man gör sig av med rester.",
    starter: "Jag kan göra bättre val genom att ...",
    bookSupport: "I texten står att märkningar som Svanen och Bra Miljöval kan hjälpa oss att välja bättre produkter.",
    shortAnswer: "Jag kan välja miljömärkta produkter, till exempel med Svanen eller Bra Miljöval. Jag kan använda lagom mycket, undvika onödigt starka ämnen och lämna farliga rester på miljöstation i stället för att hälla dem i avloppet.",
    mustMention: ["välja miljömärkt", "använda lagom mycket", "inte hälla farliga rester i avloppet"],
    goodToMention: ["Svanen", "Bra Miljöval", "mindre farliga ämnen"],
    stretchPoints: ["förklara varför reningsverk inte klarar att ta bort allt"]
  }
];

export const courseBank = [
  {
    id: "chapter-18",
    title: "Mästerskapsbanan",
    subtitle: "18 hål - hela kapitlet",
    holeCount: 18,
    theme: "chapter",
    description: "Spela igenom hela kemi-kapitlet från början till slut med tre extra repetitionshål.",
    holeIds: [
      "water-fat",
      "like-dissolves-like",
      "tensider",
      "brush-teeth",
      "fluoride-ph",
      "why-smell",
      "deodorant-bacteria",
      "evaporation-smell",
      "deo-antiperspirant",
      "natural-signals",
      "natural-artificial",
      "body-risks",
      "manufactured-risks",
      "dangerous-substances",
      "active-choices",
      "like-dissolves-like",
      "evaporation-smell",
      "dangerous-substances"
    ]
  },
  {
    id: "clean-9",
    title: "Renlighetsbanan",
    subtitle: "9 hål - kroppen blir ren",
    holeCount: 9,
    theme: "clean",
    description: "Fokusera på vatten, fett, tensider, tänder och pH.",
    holeIds: [
      "water-fat",
      "like-dissolves-like",
      "tensider",
      "brush-teeth",
      "fluoride-ph",
      "water-fat",
      "tensider",
      "fluoride-ph",
      "like-dissolves-like"
    ]
  },
  {
    id: "smell-9",
    title: "Doftbanan",
    subtitle: "9 hål - lukt och molekyler",
    holeCount: 9,
    theme: "smell",
    description: "Träna på lukt, bakterier, parfym och naturens doftsignaler.",
    holeIds: [
      "why-smell",
      "deodorant-bacteria",
      "evaporation-smell",
      "deo-antiperspirant",
      "natural-signals",
      "why-smell",
      "deodorant-bacteria",
      "evaporation-smell",
      "natural-signals"
    ]
  },
  {
    id: "choices-9",
    title: "Miljöbanan",
    subtitle: "9 hål - aktiva val",
    holeCount: 9,
    theme: "choices",
    description: "Spela dig igenom risker, kroppen och smarta val i vardagen.",
    holeIds: [
      "natural-artificial",
      "body-risks",
      "manufactured-risks",
      "dangerous-substances",
      "active-choices",
      "body-risks",
      "manufactured-risks",
      "dangerous-substances",
      "active-choices"
    ]
  }
];

export function getQuestionById(questionId) {
  return questionBank.find((question) => question.id === questionId) || null;
}

export function getCourseById(courseId) {
  return courseBank.find((course) => course.id === courseId) || null;
}

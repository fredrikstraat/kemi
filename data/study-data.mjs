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

const baseQuestionBank = [
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

function makeVariant(baseId, overrides) {
  const baseQuestion = baseQuestionBank.find((question) => question.id === baseId);

  if (!baseQuestion) {
    throw new Error(`Base question missing for variant: ${baseId}`);
  }

  return {
    ...baseQuestion,
    isFocus: false,
    focusLabel: "",
    ...overrides
  };
}

function makeConceptQuestion({
  id,
  section,
  sectionLabel,
  prompt,
  hint,
  bookSupport,
  shortAnswer,
  options,
  correctOptionIndex,
  mustMention
}) {
  return {
    id,
    type: "multiple-choice",
    section,
    sectionLabel,
    level: "E",
    isFocus: true,
    focusLabel: "Begreppsbana",
    prompt,
    hint,
    starter: "Läs alternativen och välj det svar som passar bäst.",
    bookSupport,
    shortAnswer,
    options,
    correctOptionIndex,
    mustMention,
    goodToMention: [shortAnswer],
    stretchPoints: ["Kunna använda begreppet i en egen mening"]
  };
}

const variantQuestionBank = [
  makeVariant("water-fat", {
    id: "water-fat-alt",
    prompt: "Varför räcker det ofta inte med bara vatten när vi ska tvätta bort fett från huden eller håret?",
    hint: "Jämför hur vatten och fett fungerar tillsammans.",
    starter: "Bara vatten räcker inte alltid eftersom ..."
  }),
  makeVariant("like-dissolves-like", {
    id: "like-dissolves-like-alt",
    prompt: "Hur kan regeln LIKA LÖSER LIKA hjälpa oss att förstå varför tvål fungerar bättre än bara vatten?",
    hint: "Koppla regeln till vatten, fett och tvål.",
    starter: "Regeln hjälper oss att förstå att ..."
  }),
  makeVariant("tensider", {
    id: "tensider-alt",
    prompt: "Varför kan tensider kallas en bro mellan vatten och fett?",
    hint: "Tänk på att tensiden har två ändar.",
    starter: "Tensider kan kallas en bro eftersom ..."
  }),
  makeVariant("fluoride-ph", {
    id: "fluoride-ph-alt",
    prompt: "Varför är fluor i tandkräm bra när munnen blivit sur efter socker eller sur mat?",
    hint: "Tänk på pH-värdet och emaljen.",
    starter: "Fluor är bra då eftersom ..."
  }),
  makeVariant("why-smell", {
    id: "why-smell-alt",
    prompt: "Vad måste hända med molekylerna för att vi ska kunna känna en lukt?",
    hint: "Tänk på näsan och luktsinnescellerna.",
    starter: "Vi kan känna lukt när ..."
  }),
  makeVariant("deodorant-bacteria", {
    id: "deodorant-bacteria-alt",
    prompt: "Varför hjälper det att deodorant dödar bakterier om man vill lukta mindre svett?",
    hint: "Tänk på vad som egentligen orsakar lukten.",
    starter: "Det hjälper eftersom ..."
  }),
  makeVariant("evaporation-smell", {
    id: "evaporation-smell-alt",
    prompt: "Varför luktar en parfym inte exakt likadant efter flera timmar som när man nyss tagit på den?",
    hint: "Tänk på att olika molekyler avdunstar olika snabbt.",
    starter: "Parfymen ändrar doft eftersom ..."
  }),
  makeVariant("natural-signals", {
    id: "natural-signals-alt",
    prompt: "Hur kan dofter hjälpa växter och djur ute i naturen?",
    hint: "Tänk på att locka, varna eller hitta en partner.",
    starter: "Dofter hjälper växter och djur genom att ..."
  }),
  makeVariant("body-risks", {
    id: "body-risks-alt",
    prompt: "På vilka tre sätt kan ämnen från hygienprodukter komma in i kroppen?",
    hint: "Tänk på hud, luft och mun.",
    starter: "Ämnen från hygienprodukter kan komma in i kroppen genom ..."
  }),
  makeVariant("manufactured-risks", {
    id: "manufactured-risks-alt",
    prompt: "Varför behöver vi tänka oss för även när vi använder ämnen som redan finns i naturen?",
    hint: "Tänk på kroppen, miljön och att ämnen kan spridas.",
    starter: "Vi behöver tänka oss för eftersom ..."
  }),
  makeVariant("dangerous-substances", {
    id: "dangerous-substances-alt",
    prompt: "Vilka ämnen från texten kan vara mindre bra för kroppen i vissa hygienprodukter?",
    hint: "Fundera på ämnen som nämns som risker i boken.",
    starter: "Exempel på sådana ämnen är ..."
  }),
  makeVariant("active-choices", {
    id: "active-choices-alt",
    prompt: "Hur kan man välja hygienprodukter på ett sätt som både kroppen och miljön mår bättre av?",
    hint: "Tänk på märkningar, mängd och rester.",
    starter: "Jag kan välja bättre genom att ..."
  })
];

const conceptQuestionBank = [
  makeConceptQuestion({
    id: "concept-water-molecule",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vilket påstående stämmer bäst om en vattenmolekyl?",
    hint: "Tänk på laddningarna i molekylen.",
    bookSupport: "I boken står att vattenmolekylen är polär och har en positiv och en negativ sida.",
    shortAnswer: "En vattenmolekyl är polär och har en positiv och en negativ sida.",
    options: [
      "Den är alltid opolär och helt oladdad.",
      "Den är polär och har en positiv och en negativ sida.",
      "Den består bara av fett."
    ],
    correctOptionIndex: 1,
    mustMention: ["vattenmolekyl", "polär"]
  }),
  makeConceptQuestion({
    id: "concept-fat-molecule",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vilket påstående passar bäst för en fettmolekyl i det här kapitlet?",
    hint: "Jämför med vattenmolekylen.",
    bookSupport: "I boken står att de flesta fetter är opolära och därför inte löser sig lätt i vatten.",
    shortAnswer: "En fettmolekyl är ofta opolär.",
    options: [
      "Den är ofta opolär.",
      "Den fungerar som fluor i tandkräm.",
      "Den höjer pH-värdet i munnen."
    ],
    correctOptionIndex: 0,
    mustMention: ["fettmolekyl", "opolär"]
  }),
  makeConceptQuestion({
    id: "concept-molecule",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad är en molekyl?",
    hint: "Tänk på atomer.",
    bookSupport: "I boken förklaras att molekyler är atomer som sitter ihop.",
    shortAnswer: "En molekyl är två eller flera atomer som sitter ihop.",
    options: [
      "En molekyl är bara en sorts vätska.",
      "En molekyl är två eller flera atomer som sitter ihop.",
      "En molekyl är samma sak som ett pH-värde."
    ],
    correctOptionIndex: 1,
    mustMention: ["molekyl", "atomer"]
  }),
  makeConceptQuestion({
    id: "concept-atom",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad är en atom?",
    hint: "Tänk på byggstenar.",
    bookSupport: "Atomer beskrivs som små byggstenar i ämnen och molekyler.",
    shortAnswer: "En atom är en liten byggsten i ämnen.",
    options: [
      "En atom är en liten byggsten i ämnen.",
      "En atom är en lukt som finns i näsan.",
      "En atom är något som bara finns i tandkräm."
    ],
    correctOptionIndex: 0,
    mustMention: ["atom", "byggsten"]
  }),
  makeConceptQuestion({
    id: "concept-proton",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad stämmer om en proton?",
    hint: "Tänk på laddning.",
    bookSupport: "I boken står att protoner är positivt laddade.",
    shortAnswer: "En proton är positivt laddad.",
    options: [
      "En proton är negativt laddad.",
      "En proton är positivt laddad.",
      "En proton betyder att något luktar."
    ],
    correctOptionIndex: 1,
    mustMention: ["proton", "positivt laddad"]
  }),
  makeConceptQuestion({
    id: "concept-electron",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad stämmer om en elektron?",
    hint: "Jämför med proton.",
    bookSupport: "I boken står att elektroner är negativt laddade.",
    shortAnswer: "En elektron är negativt laddad.",
    options: [
      "En elektron är negativt laddad.",
      "En elektron är alltid neutral.",
      "En elektron är samma sak som fluor."
    ],
    correctOptionIndex: 0,
    mustMention: ["elektron", "negativt laddad"]
  }),
  makeConceptQuestion({
    id: "concept-polar",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad betyder att en molekyl är polär?",
    hint: "Tänk på hur laddningarna sitter i molekylen.",
    bookSupport: "I boken står att en polär molekyl har mer positiv laddning åt ena hållet och mer negativ åt det andra.",
    shortAnswer: "Polär betyder att laddningen är ojämnt fördelad i molekylen.",
    options: [
      "Polär betyder att molekylen bara finns i kyla.",
      "Polär betyder att laddningen är ojämnt fördelad i molekylen.",
      "Polär betyder att molekylen alltid luktar."
    ],
    correctOptionIndex: 1,
    mustMention: ["polär", "ojämnt fördelad laddning"]
  }),
  makeConceptQuestion({
    id: "concept-nonpolar",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad betyder att en molekyl är opolär?",
    hint: "Jämför med polär.",
    bookSupport: "I boken står att opolära ämnen inte är olika laddade åt olika håll.",
    shortAnswer: "Opolär betyder att laddningen är jämnt fördelad i molekylen.",
    options: [
      "Opolär betyder att laddningen är jämnt fördelad i molekylen.",
      "Opolär betyder att molekylen är sur.",
      "Opolär betyder att molekylen är gjord av vatten."
    ],
    correctOptionIndex: 0,
    mustMention: ["opolär", "jämnt fördelad laddning"]
  }),
  makeConceptQuestion({
    id: "concept-tensides",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad gör tensider?",
    hint: "Tänk på vatten och fett samtidigt.",
    bookSupport: "I boken står att tensider fungerar som en bro mellan vatten och fett.",
    shortAnswer: "Tensider hjälper vatten att få med sig fett bort.",
    options: [
      "Tensider höjer alltid pH-värdet i munnen.",
      "Tensider hjälper vatten att få med sig fett bort.",
      "Tensider är samma sak som bakterier."
    ],
    correctOptionIndex: 1,
    mustMention: ["tensider", "vatten", "fett"]
  }),
  makeConceptQuestion({
    id: "concept-fluor",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad gör fluor i tandkräm enligt texten?",
    hint: "Tänk på pH-värdet och emaljen.",
    bookSupport: "I boken står att fluor höjer pH-värdet och skyddar tänderna mot syror.",
    shortAnswer: "Fluor hjälper till att höja pH-värdet och skydda emaljen.",
    options: [
      "Fluor gör att fett löser sig i vatten.",
      "Fluor hjälper till att höja pH-värdet och skydda emaljen.",
      "Fluor gör att svett luktar mindre."
    ],
    correctOptionIndex: 1,
    mustMention: ["fluor", "höjer pH", "skyddar emaljen"]
  }),
  makeConceptQuestion({
    id: "concept-ph",
    section: "clean",
    sectionLabel: "Hur blir kroppen ren?",
    prompt: "Vad visar ett pH-värde?",
    hint: "Tänk på surt, neutralt och basiskt.",
    bookSupport: "I boken visas pH-skalan och att pH-värdet berättar om något är surt, neutralt eller basiskt.",
    shortAnswer: "pH-värde visar om något är surt, neutralt eller basiskt.",
    options: [
      "pH-värde visar hur stark en lukt är.",
      "pH-värde visar om något är surt, neutralt eller basiskt.",
      "pH-värde visar hur många atomer ett ämne har."
    ],
    correctOptionIndex: 1,
    mustMention: ["pH-värde", "surt", "neutralt", "basiskt"]
  }),
  makeConceptQuestion({
    id: "concept-scent-substance",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    prompt: "Vad är ett doftämne?",
    hint: "Tänk på molekyler som kan ge lukt.",
    bookSupport: "I boken används doftämnen som namn på ämnen vars molekyler kan kännas som lukt.",
    shortAnswer: "Ett doftämne är ett ämne vars molekyler kan ge lukt.",
    options: [
      "Ett doftämne är ett ämne vars molekyler kan ge lukt.",
      "Ett doftämne är ett ämne som alltid stoppar svett.",
      "Ett doftämne är samma sak som vatten."
    ],
    correctOptionIndex: 0,
    mustMention: ["doftämne", "lukt"]
  }),
  makeConceptQuestion({
    id: "concept-evaporate",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    prompt: "Vad betyder avdunsta?",
    hint: "Tänk på vätska och gas.",
    bookSupport: "I boken förklaras att avdunstning innebär att ett ämne går från flytande form till gasform.",
    shortAnswer: "Avdunsta betyder att gå från vätska till gas.",
    options: [
      "Avdunsta betyder att bli kallare.",
      "Avdunsta betyder att gå från vätska till gas.",
      "Avdunsta betyder att två ämnen löser sig i varandra."
    ],
    correctOptionIndex: 1,
    mustMention: ["avdunsta", "vätska", "gas"]
  }),
  makeConceptQuestion({
    id: "concept-antiperspirant",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    prompt: "Vad gör en antiperspirant?",
    hint: "Jämför med deodorant.",
    bookSupport: "I boken står att antiperspirant minskar själva svettningen.",
    shortAnswer: "Antiperspirant minskar svettningen.",
    options: [
      "Antiperspirant minskar svettningen.",
      "Antiperspirant gör vatten mer polärt.",
      "Antiperspirant är ett naturligt ämne i blommor."
    ],
    correctOptionIndex: 0,
    mustMention: ["antiperspirant", "minskar svettning"]
  }),
  makeConceptQuestion({
    id: "concept-pheromones",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    prompt: "Vad är feromoner?",
    hint: "Tänk på doftsignaler mellan djur.",
    bookSupport: "I boken står att feromoner är doftsignaler som växter och djur kan använda för kommunikation.",
    shortAnswer: "Feromoner är doftsignaler som används för kommunikation.",
    options: [
      "Feromoner är en sorts tandkräm.",
      "Feromoner är doftsignaler som används för kommunikation.",
      "Feromoner är alltid konstgjorda ämnen."
    ],
    correctOptionIndex: 1,
    mustMention: ["feromoner", "doftsignaler", "kommunikation"]
  }),
  makeConceptQuestion({
    id: "concept-perfume",
    section: "smell",
    sectionLabel: "Molekyler kan lukta",
    prompt: "Vad är parfym i det här kapitlet?",
    hint: "Tänk på flera doftämnen tillsammans.",
    bookSupport: "I boken står att parfym ofta är en blandning av många olika doftmolekyler.",
    shortAnswer: "Parfym är en blandning av flera doftämnen.",
    options: [
      "Parfym är en blandning av flera doftämnen.",
      "Parfym är samma sak som svett.",
      "Parfym är bara en enda sorts molekyl."
    ],
    correctOptionIndex: 0,
    mustMention: ["parfym", "blandning", "doftämnen"]
  }),
  makeConceptQuestion({
    id: "concept-natural-substance",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    prompt: "Vad är ett naturligt ämne?",
    hint: "Tänk på var ämnet finns från början.",
    bookSupport: "I boken står att naturliga ämnen finns i naturen.",
    shortAnswer: "Ett naturligt ämne är ett ämne som finns i naturen.",
    options: [
      "Ett naturligt ämne är ett ämne som finns i naturen.",
      "Ett naturligt ämne är alltid gjort i en fabrik.",
      "Ett naturligt ämne är något som minskar svettning."
    ],
    correctOptionIndex: 0,
    mustMention: ["naturligt ämne", "finns i naturen"]
  }),
  makeConceptQuestion({
    id: "concept-artificial-substance",
    section: "choices",
    sectionLabel: "Att göra aktiva val",
    prompt: "Vad är ett konstgjort ämne?",
    hint: "Tänk på vem som har framställt det.",
    bookSupport: "I boken står att konstgjorda ämnen framställs av människor.",
    shortAnswer: "Ett konstgjort ämne är ett ämne som framställs av människor.",
    options: [
      "Ett konstgjort ämne är alltid en gas.",
      "Ett konstgjort ämne är ett ämne som framställs av människor.",
      "Ett konstgjort ämne är samma sak som ett naturligt ämne."
    ],
    correctOptionIndex: 1,
    mustMention: ["konstgjort ämne", "framställs av människor"]
  })
];

export const questionBank = [
  ...baseQuestionBank,
  ...variantQuestionBank,
  ...conceptQuestionBank
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
      "like-dissolves-like-alt",
      "evaporation-smell-alt",
      "dangerous-substances-alt"
    ]
  },
  {
    id: "concept-18",
    title: "Begreppsbanan",
    subtitle: "18 korta hål - Testa dig själv",
    holeCount: 18,
    theme: "concept",
    description: "Snabba flervalsfrågor på alla begrepp från Testa dig själv i alla tre avsnitten.",
    holeIds: [
      "concept-water-molecule",
      "concept-fat-molecule",
      "concept-molecule",
      "concept-atom",
      "concept-proton",
      "concept-electron",
      "concept-polar",
      "concept-nonpolar",
      "concept-tensides",
      "concept-fluor",
      "concept-ph",
      "concept-scent-substance",
      "concept-evaporate",
      "concept-antiperspirant",
      "concept-pheromones",
      "concept-perfume",
      "concept-natural-substance",
      "concept-artificial-substance"
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
      "water-fat-alt",
      "tensider-alt",
      "fluoride-ph-alt",
      "like-dissolves-like-alt"
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
      "why-smell-alt",
      "deodorant-bacteria-alt",
      "evaporation-smell-alt",
      "natural-signals-alt"
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
      "body-risks-alt",
      "manufactured-risks-alt",
      "dangerous-substances-alt",
      "active-choices-alt"
    ]
  }
];

export function getQuestionById(questionId) {
  return questionBank.find((question) => question.id === questionId) || null;
}

export function getCourseById(courseId) {
  return courseBank.find((course) => course.id === courseId) || null;
}

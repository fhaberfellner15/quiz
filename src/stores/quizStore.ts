import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Career = 'dev' | 'designer' | 'pm' | 'analyst' | 'marketing' | 'devops' | 'consultant' | 'hr'

const ALL_CAREERS: Career[] = ['dev', 'designer', 'pm', 'analyst', 'marketing', 'devops', 'consultant', 'hr']

export interface Answer {
  text: string
  categoryPoints: Record<Career, number>
}

export interface Question {
  text: string
  answers: Answer[]
}

export const CAREER_INFO: Record<Career, { label: string; emoji: string; description: string; badgeClass: string }> = {
  dev: {
    label: 'Softwareentwickler:in',
    emoji: '💻',
    description: 'Du denkst in Systemen und liebst es, komplexe Probleme mit elegantem Code zu lösen. Logik, Präzision und Automatisierung sind deine Stärken.',
    badgeClass: 'bg-primary',
  },
  designer: {
    label: 'UX/UI Designer:in',
    emoji: '🎨',
    description: 'Du hast ein feines Gespür für Ästhetik und Benutzerfreundlichkeit. Du schaffst Produkte, die nicht nur funktionieren, sondern begeistern.',
    badgeClass: 'bg-warning text-dark',
  },
  pm: {
    label: 'Projektmanager:in',
    emoji: '📋',
    description: 'Du bist die Person, die alle zusammenbringt. Du koordinierst Teams, setzt Prioritäten und sorgst für pünktliche Lieferung.',
    badgeClass: 'bg-success',
  },
  analyst: {
    label: 'Data Analyst:in',
    emoji: '📊',
    description: 'Du liebst Zahlen und vertraust auf Fakten. Deine Fähigkeit, aus Rohdaten Erkenntnisse zu gewinnen, ist unschätzbar wertvoll.',
    badgeClass: 'bg-info text-dark',
  },
  marketing: {
    label: 'Marketing Manager:in',
    emoji: '📣',
    description: 'Du weißt, wie man Menschen bewegt und begeistert. Storytelling, Zielgruppen und Kampagnen sind dein Spielfeld.',
    badgeClass: 'bg-danger',
  },
  devops: {
    label: 'DevOps / Cloud Engineer:in',
    emoji: '⚙️',
    description: 'Du liebst stabile Systeme, schnelle Deployments und skalierbare Infrastruktur. Automatisierung und Zuverlässigkeit sind für dich selbstverständlich.',
    badgeClass: 'bg-secondary',
  },
  consultant: {
    label: 'Unternehmensberater:in',
    emoji: '🤝',
    description: 'Du analysierst, berätst und überzeugst. Du liebst es, in verschiedene Branchen einzutauchen und Unternehmen weiterzubringen.',
    badgeClass: 'bg-dark',
  },
  hr: {
    label: 'HR & Personalentwicklung',
    emoji: '🌱',
    description: 'Menschen sind deine Leidenschaft. Du erkennst Potenziale, förderst Talente und sorgst für ein Umfeld, in dem andere aufblühen.',
    badgeClass: 'bg-success',
  },
}

/** Helper: zero points for all categories */
function zeroPoints(): Record<Career, number> {
  return { dev: 0, designer: 0, pm: 0, analyst: 0, marketing: 0, devops: 0, consultant: 0, hr: 0 }
}

/** Helper: 1 point for a single category, 0 for all others */
function pt(career: Career): Record<Career, number> {
  return { ...zeroPoints(), [career]: 1 }
}

const QUESTION_POOL: Question[] = [
  // --- Gruppe 1: dev / designer / pm / analyst ---
  {
    text: 'Was macht dir bei der Arbeit am meisten Spaß?',
    answers: [
      { text: 'Code schreiben & Probleme lösen', categoryPoints: pt('dev') },
      { text: 'Dinge visuell gestalten', categoryPoints: pt('designer') },
      { text: 'Teams koordinieren & Ziele setzen', categoryPoints: pt('pm') },
      { text: 'Daten auswerten & Muster finden', categoryPoints: pt('analyst') },
    ],
  },
  {
    text: 'Wie gehst du Probleme am liebsten an?',
    answers: [
      { text: 'Logisch & strukturiert mit klaren Regeln', categoryPoints: pt('dev') },
      { text: 'Kreativ & visuell mit Skizzen', categoryPoints: pt('designer') },
      { text: 'Im Team diskutieren & Konsens finden', categoryPoints: pt('pm') },
      { text: 'Mit Daten & Fakten belegen', categoryPoints: pt('analyst') },
    ],
  },
  {
    text: 'Was ist dein wichtigstes Werkzeug?',
    answers: [
      { text: 'Terminal & IDE', categoryPoints: pt('dev') },
      { text: 'Figma oder Adobe XD', categoryPoints: pt('designer') },
      { text: 'Jira, Notion oder Confluence', categoryPoints: pt('pm') },
      { text: 'Excel, SQL oder Python', categoryPoints: pt('analyst') },
    ],
  },
  {
    text: 'Worauf bist du in einem Projekt am stolzesten?',
    answers: [
      { text: 'Einen sauberen, effizienten Algorithmus', categoryPoints: pt('dev') },
      { text: 'Ein intuitives, schönes Interface', categoryPoints: pt('designer') },
      { text: 'Eine pünktliche Lieferung im Budget', categoryPoints: pt('pm') },
      { text: 'Eine Analyse, die die Richtung verändert hat', categoryPoints: pt('analyst') },
    ],
  },
  {
    text: 'Was ist dir bei einem Produkt am wichtigsten?',
    answers: [
      { text: 'Stabilität & Performance', categoryPoints: pt('dev') },
      { text: 'Optik & Benutzererlebnis', categoryPoints: pt('designer') },
      { text: 'Termintreue & Scope', categoryPoints: pt('pm') },
      { text: 'Messbare Ergebnisse & KPIs', categoryPoints: pt('analyst') },
    ],
  },
  // --- Gruppe 2: marketing / devops / consultant / hr ---
  {
    text: 'Welche Aufgabe würdest du freiwillig übernehmen?',
    answers: [
      { text: 'Eine Kampagne für die Zielgruppe entwickeln', categoryPoints: pt('marketing') },
      { text: 'Die CI/CD-Pipeline optimieren', categoryPoints: pt('devops') },
      { text: 'Den Kunden in einem Workshop beraten', categoryPoints: pt('consultant') },
      { text: 'Ein Onboarding-Programm für neue Mitarbeiter gestalten', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Was treibt dich bei der Arbeit an?',
    answers: [
      { text: 'Menschen mit einer Geschichte bewegen', categoryPoints: pt('marketing') },
      { text: 'Systeme stabil & skalierbar halten', categoryPoints: pt('devops') },
      { text: 'Unternehmen auf das nächste Level bringen', categoryPoints: pt('consultant') },
      { text: 'Das Beste in Menschen herausholen', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Wie verbringst du deine Freizeit am liebsten?',
    answers: [
      { text: 'Social Media, Content & Trends beobachten', categoryPoints: pt('marketing') },
      { text: 'Homelab basteln & neue Tools testen', categoryPoints: pt('devops') },
      { text: 'Bücher über Strategie & Business lesen', categoryPoints: pt('consultant') },
      { text: 'Anderen zuhören & helfen', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Was nervt dich am meisten?',
    answers: [
      { text: 'Wenn Botschaften nicht ankommen', categoryPoints: pt('marketing') },
      { text: 'Manuelle Prozesse, die man einfach automatisieren könnte', categoryPoints: pt('devops') },
      { text: 'Unklare Ziele und fehlende Strategie', categoryPoints: pt('consultant') },
      { text: 'Wenn Talente nicht gefördert werden', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Wofür bekommst du am häufigsten Lob?',
    answers: [
      { text: 'Meine Kreativität & mein Gespür für Trends', categoryPoints: pt('marketing') },
      { text: 'Dass die Systeme einfach laufen', categoryPoints: pt('devops') },
      { text: 'Meinen klaren Blick auf Probleme', categoryPoints: pt('consultant') },
      { text: 'Mein offenes Ohr und meine Empathie', categoryPoints: pt('hr') },
    ],
  },
  // --- Gruppe 3: dev / devops / analyst / consultant ---
  {
    text: 'Welches Schulfach mochtest du am liebsten?',
    answers: [
      { text: 'Informatik oder Mathematik', categoryPoints: pt('dev') },
      { text: 'Physik oder Elektrotechnik', categoryPoints: pt('devops') },
      { text: 'Statistik oder Geographie', categoryPoints: pt('analyst') },
      { text: 'Wirtschaft oder Sozialkunde', categoryPoints: pt('consultant') },
    ],
  },
  {
    text: 'Wie lernst du am effektivsten?',
    answers: [
      { text: 'Durch eigenes Programmieren & Bauen', categoryPoints: pt('dev') },
      { text: 'Durch Experimentieren mit echten Systemen', categoryPoints: pt('devops') },
      { text: 'Durch tiefes Lesen & Datenrecherche', categoryPoints: pt('analyst') },
      { text: 'Durch Fallstudien & Austausch mit Experten', categoryPoints: pt('consultant') },
    ],
  },
  {
    text: 'Wie triffst du am liebsten Entscheidungen?',
    answers: [
      { text: 'Nach Abwägen der technischen Machbarkeit', categoryPoints: pt('dev') },
      { text: 'Nach Risikoabwägung & Systemeigenschaften', categoryPoints: pt('devops') },
      { text: 'Nach Auswertung aller verfügbaren Daten', categoryPoints: pt('analyst') },
      { text: 'Nach einer strukturierten Analyse der Optionen', categoryPoints: pt('consultant') },
    ],
  },
  // --- Gruppe 4: designer / marketing / hr / pm ---
  {
    text: 'Welche Aussage beschreibt dich am besten?',
    answers: [
      { text: 'Ich habe ein ausgeprägtes ästhetisches Gespür', categoryPoints: pt('designer') },
      { text: 'Ich erkenne schnell, was Menschen ansprechen wird', categoryPoints: pt('marketing') },
      { text: 'Ich bin ein guter Zuhörer und Vertrauensperson', categoryPoints: pt('hr') },
      { text: 'Ich bin organisiert und behalte stets den Überblick', categoryPoints: pt('pm') },
    ],
  },
  {
    text: 'Was beschreibt deinen Arbeitsplatz am besten?',
    answers: [
      { text: 'Aufgeräumt, mit Farbproben & Moodboard', categoryPoints: pt('designer') },
      { text: 'Post-its, Kampagnen-Briefings & Stimmungsbilder', categoryPoints: pt('marketing') },
      { text: 'Gesprächsnotizen, Feedbackbögen & Entwicklungspläne', categoryPoints: pt('hr') },
      { text: 'Sticky Notes, Gantt-Chart & Kalender', categoryPoints: pt('pm') },
    ],
  },
  {
    text: 'In welchem Format nimmst du Informationen am liebsten auf?',
    answers: [
      { text: 'Als Diagramme & visuelle Darstellungen', categoryPoints: pt('designer') },
      { text: 'Als inspirierende Storys & Beispiele', categoryPoints: pt('marketing') },
      { text: 'Als persönliche Gespräche', categoryPoints: pt('hr') },
      { text: 'Als strukturierte Listen & Roadmaps', categoryPoints: pt('pm') },
    ],
  },
  // --- Gruppe 5: dev / analyst / marketing / pm ---
  {
    text: 'Womit verbringst du deine Zeit am liebsten?',
    answers: [
      { text: 'Mit Algorithmen, Rätseln & Coding-Challenges', categoryPoints: pt('dev') },
      { text: 'Mit Tabellen, Berichten & Visualisierungen', categoryPoints: pt('analyst') },
      { text: 'Mit Kampagnenplanung & Content-Strategie', categoryPoints: pt('marketing') },
      { text: 'Mit Projektplänen & Stakeholder-Management', categoryPoints: pt('pm') },
    ],
  },
  {
    text: 'Wo siehst du dich in 5 Jahren?',
    answers: [
      { text: 'Als Tech Lead oder Principal Engineer', categoryPoints: pt('dev') },
      { text: 'Als Head of Analytics oder Data Scientist', categoryPoints: pt('analyst') },
      { text: 'Als CMO oder Marketing Director', categoryPoints: pt('marketing') },
      { text: 'Als Product Owner oder Bereichsleiter', categoryPoints: pt('pm') },
    ],
  },
  {
    text: 'Was sagst du, wenn im Projekt etwas schiefläuft?',
    answers: [
      { text: '„Ich debugge das sofort."', categoryPoints: pt('dev') },
      { text: '„Zeig mir die Zahlen dahinter."', categoryPoints: pt('analyst') },
      { text: '„Wie kommunizieren wir das nach außen?"', categoryPoints: pt('marketing') },
      { text: '„Wir brauchen sofort ein Statusmeeting."', categoryPoints: pt('pm') },
    ],
  },
  // --- Gruppe 6: devops / designer / hr / consultant ---
  {
    text: 'Was motiviert dich am stärksten?',
    answers: [
      { text: 'Hochverfügbare Systeme & Zero-Downtime-Deployments', categoryPoints: pt('devops') },
      { text: 'Etwas Schönes und Nützliches schaffen', categoryPoints: pt('designer') },
      { text: 'Menschen in ihrer Entwicklung begleiten', categoryPoints: pt('hr') },
      { text: 'Echten Mehrwert für ein Unternehmen schaffen', categoryPoints: pt('consultant') },
    ],
  },
  {
    text: 'Welche Rolle übernimmst du in einem Projekt gerne?',
    answers: [
      { text: 'Ich sorge dafür, dass die Infrastruktur trägt', categoryPoints: pt('devops') },
      { text: 'Ich gestalte das Nutzererlebnis', categoryPoints: pt('designer') },
      { text: 'Ich kümmere mich um Teamdynamik & Kultur', categoryPoints: pt('hr') },
      { text: 'Ich bringe die externe Perspektive & Best Practices', categoryPoints: pt('consultant') },
    ],
  },
  {
    text: 'Wie reagierst du auf Veränderungen?',
    answers: [
      { text: 'Ich schaue, wie ich das System anpassen kann', categoryPoints: pt('devops') },
      { text: 'Ich überdenke das Design von Grund auf', categoryPoints: pt('designer') },
      { text: 'Ich begleite die Menschen durch den Wandel', categoryPoints: pt('hr') },
      { text: 'Ich entwickle eine neue Strategie', categoryPoints: pt('consultant') },
    ],
  },
  // --- Gruppe 7: gemischt ---
  {
    text: 'Was wärst du am liebsten in einem Startup?',
    answers: [
      { text: 'CTO – ich baue die Technik', categoryPoints: pt('dev') },
      { text: 'CDO – ich präge das Look & Feel', categoryPoints: pt('designer') },
      { text: 'COO – ich halte den Laden am Laufen', categoryPoints: pt('pm') },
      { text: 'CMO – ich bringe die Botschaft raus', categoryPoints: pt('marketing') },
    ],
  },
  {
    text: 'Welches Buch würdest du am ehesten lesen?',
    answers: [
      { text: '„Clean Code" oder „The Pragmatic Programmer"', categoryPoints: pt('dev') },
      { text: '„Don\'t Make Me Think" oder „The Design of Everyday Things"', categoryPoints: pt('designer') },
      { text: '„Accelerate" oder „The Phoenix Project"', categoryPoints: pt('devops') },
      { text: '„Thinking, Fast and Slow"', categoryPoints: pt('analyst') },
    ],
  },
  {
    text: 'Was ist dein liebster Teil eines Arbeitstages?',
    answers: [
      { text: 'Einen Fehler endlich fixen oder ein Feature fertigstellen', categoryPoints: pt('dev') },
      { text: 'Im Austausch mit Kollegen Lösungen entwickeln', categoryPoints: pt('consultant') },
      { text: 'Das tägliche Standup & Planen', categoryPoints: pt('pm') },
      { text: 'Mitarbeitergespräche & Feedbackrunden', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Wenn du eine Superpower hättest, wäre es …',
    answers: [
      { text: 'Jeden Bug auf Anhieb zu sehen', categoryPoints: pt('dev') },
      { text: 'Interfaces zu entwerfen, die jeder sofort versteht', categoryPoints: pt('designer') },
      { text: 'Systeme niemals abstürzen zu lassen', categoryPoints: pt('devops') },
      { text: 'Menschen auf Anhieb zu motivieren', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Was beschreibt deine Art zu arbeiten am besten?',
    answers: [
      { text: 'Tief in Details versinken & perfekt lösen', categoryPoints: pt('dev') },
      { text: 'Den großen Überblick behalten & delegieren', categoryPoints: pt('pm') },
      { text: 'Zahlen sprechen lassen', categoryPoints: pt('analyst') },
      { text: 'Kreative Ideen in packende Geschichten verwandeln', categoryPoints: pt('marketing') },
    ],
  },
  {
    text: 'Welche Fähigkeit willst du noch weiterentwickeln?',
    answers: [
      { text: 'Neue Programmiersprachen & Frameworks', categoryPoints: pt('dev') },
      { text: 'Kubernetes & Cloud-Architekturen', categoryPoints: pt('devops') },
      { text: 'Präsentations- & Überzeugungskraft', categoryPoints: pt('consultant') },
      { text: 'Advanced Analytics & Machine Learning', categoryPoints: pt('analyst') },
    ],
  },
  {
    text: 'Was wäre dein Traumprojekt?',
    answers: [
      { text: 'Eine Open-Source-Bibliothek, die Tausende nutzen', categoryPoints: pt('dev') },
      { text: 'Eine virale Marketingkampagne gestalten', categoryPoints: pt('marketing') },
      { text: 'Ein Unternehmen durch einen Kulturwandel führen', categoryPoints: pt('hr') },
      { text: 'Eine Unternehmensstrategie von Grund auf neu entwickeln', categoryPoints: pt('consultant') },
    ],
  },
  {
    text: 'Welches Problem würdest du als erstes lösen?',
    answers: [
      { text: 'Die App ist zu langsam – ich optimiere den Code', categoryPoints: pt('dev') },
      { text: 'Das Deployment dauert zu lang – ich automatisiere', categoryPoints: pt('devops') },
      { text: 'Die Marke ist unbekannt – ich entwickle eine Strategie', categoryPoints: pt('marketing') },
      { text: 'Die Fluktuation ist hoch – ich analysiere die Ursachen', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Was ist dein Lieblingsteil in einem Workshop?',
    answers: [
      { text: 'Live-Coding & technische Deep-Dives', categoryPoints: pt('dev') },
      { text: 'Prototyping & Sketching-Sessions', categoryPoints: pt('designer') },
      { text: 'Retrospektiven & Prozessverbesserungen', categoryPoints: pt('pm') },
      { text: 'Strategiespiele & Fallstudien diskutieren', categoryPoints: pt('consultant') },
    ],
  },
  {
    text: 'Wie gehst du mit Fehlern um?',
    answers: [
      { text: 'Root-Cause-Analyse & Postmortem schreiben', categoryPoints: pt('devops') },
      { text: 'Usability-Test, um zu verstehen, was schiefging', categoryPoints: pt('designer') },
      { text: 'Daten auswerten, um Muster zu erkennen', categoryPoints: pt('analyst') },
      { text: 'Offen kommunizieren & gemeinsam reflektieren', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Welche Aussage passt am besten zu dir?',
    answers: [
      { text: '„If it ain\'t broken, don\'t fix it" – stimmt nicht, man kann immer refactoren', categoryPoints: pt('dev') },
      { text: '„Eine Zahl ohne Kontext ist wertlos"', categoryPoints: pt('analyst') },
      { text: '„Menschen kaufen keine Produkte, sie kaufen Gefühle"', categoryPoints: pt('marketing') },
      { text: '„Gute Prozesse machen gute Menschen noch besser"', categoryPoints: pt('pm') },
    ],
  },
  {
    text: 'Was ist dir im Team am wichtigsten?',
    answers: [
      { text: 'Code-Qualität & technische Standards', categoryPoints: pt('dev') },
      { text: 'Kreative Freiheit & offene Feedbackkultur', categoryPoints: pt('designer') },
      { text: 'Klare Verantwortlichkeiten & Ziele', categoryPoints: pt('pm') },
      { text: 'Vertrauen & psychologische Sicherheit', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Was macht einen guten Arbeitgeber für dich aus?',
    answers: [
      { text: 'Moderne Technik & interessante Probleme', categoryPoints: pt('dev') },
      { text: 'Kreativität wird geschätzt & gefördert', categoryPoints: pt('designer') },
      { text: 'Klare Kommunikation & gute Prozesse', categoryPoints: pt('pm') },
      { text: 'Persönliche Weiterentwicklung steht im Vordergrund', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Welche Aufgabe macht dir mehr Spaß?',
    answers: [
      { text: 'Monitoring dashboards bauen & Alerts konfigurieren', categoryPoints: pt('devops') },
      { text: 'Eine Präsentation für die Geschäftsführung erstellen', categoryPoints: pt('consultant') },
      { text: 'A/B-Tests für eine Landingpage auswerten', categoryPoints: pt('marketing') },
      { text: 'Bewerbergespräche führen & Potenziale einschätzen', categoryPoints: pt('hr') },
    ],
  },
  {
    text: 'Was ist dein Ansatz bei einem neuen Projekt?',
    answers: [
      { text: 'Ich schaue mir zuerst die Architektur & Datenmodelle an', categoryPoints: pt('dev') },
      { text: 'Ich starte mit einer Stakeholder-Analyse & Roadmap', categoryPoints: pt('consultant') },
      { text: 'Ich beginne mit User Research & Personas', categoryPoints: pt('designer') },
      { text: 'Ich definiere zuerst die KPIs & Erfolgskriterien', categoryPoints: pt('analyst') },
    ],
  },
]

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function shuffleAndPick<T>(pool: T[], n: number): T[] {
  return shuffleArray(pool).slice(0, n)
}

export const useQuizStore = defineStore('quiz', () => {
  // --- State (Jira: Pinia State fields) ---
  const questionMax = ref(8)
  const questionCount = ref(0)
  const scores = ref<Record<Career, number>>(zeroPoints())
  const quizResult = ref<{ career: Career; score: number }[]>([])
  const activeQuestions = ref<Question[]>([])
  const selectedAnswerIndex = ref<number | null>(null)
  const phase = ref<'quiz' | 'result'>('quiz')

  // --- Getters ---
  const currentQuestion = computed((): Question | null => {
    if (activeQuestions.value.length === 0) return null
    // Shuffle answers for display
    const q = activeQuestions.value[0]
    return q
  })

  const progress = computed(() => {
    if (questionMax.value === 0) return 0
    return Math.round((questionCount.value / questionMax.value) * 100)
  })

  const topResults = computed(() => {
    return quizResult.value
  })

  // --- Actions ---
  function startQuiz() {
    scores.value = zeroPoints()
    questionCount.value = 0
    quizResult.value = []
    phase.value = 'quiz'
    selectedAnswerIndex.value = null

    // Pick random questions and shuffle their answers
    const picked = shuffleAndPick(QUESTION_POOL, questionMax.value)
    activeQuestions.value = picked.map(q => ({
      ...q,
      answers: shuffleArray(q.answers),
    }))
  }

  function selectAnswer(index: number) {
    selectedAnswerIndex.value = index
  }

  function confirmAnswer() {
    if (selectedAnswerIndex.value === null || !currentQuestion.value) return

    const answer = currentQuestion.value.answers[selectedAnswerIndex.value]

    // Add category points to scores matrix
    for (const career of ALL_CAREERS) {
      scores.value[career] += answer.categoryPoints[career]
    }

    // Remove answered question from list
    activeQuestions.value.splice(0, 1)
    questionCount.value++
    selectedAnswerIndex.value = null

    // Check if quiz is done
    if (questionCount.value >= questionMax.value || activeQuestions.value.length === 0) {
      computeResults()
      phase.value = 'result'
    }
  }

  function computeResults() {
    const entries = (Object.entries(scores.value) as [Career, number][])
      .sort((a, b) => b[1] - a[1])

    if (entries.length === 0) {
      quizResult.value = []
      return
    }

    const highestScore = entries[0][1]
    const withHighest = entries.filter(([, s]) => s === highestScore)

    if (withHighest.length >= 2) {
      // If more than 2 share highest score, randomly pick 2
      const selected = shuffleAndPick(withHighest, 2)
      quizResult.value = selected.map(([career, score]) => ({ career, score }))
    } else {
      // 1 with highest score, add the next best
      const result: { career: Career; score: number }[] = [
        { career: withHighest[0][0], score: withHighest[0][1] },
      ]

      if (entries.length > 1) {
        const secondScore = entries[1][1]
        const withSecond = entries.filter(([, s]) => s === secondScore && s !== highestScore)

        // If the second-place candidates are tied, include only those with second score
        if (withSecond.length === 0) {
          // All remaining also have the highest score — already handled above
          // This means entries[1] has the same score but wasn't in withHighest (impossible)
          // Just take entries[1] as fallback
          result.push({ career: entries[1][0], score: entries[1][1] })
        } else if (withSecond.length === 1) {
          result.push({ career: withSecond[0][0], score: withSecond[0][1] })
        } else {
          // Multiple tied for second — pick 1 randomly
          const picked = shuffleAndPick(withSecond, 1)
          result.push({ career: picked[0][0], score: picked[0][1] })
        }
      }

      quizResult.value = result
    }
  }

  function restart() {
    startQuiz()
  }

  // Initialize on store creation
  startQuiz()

  return {
    // State
    questionMax,
    questionCount,
    scores,
    quizResult,
    activeQuestions,
    selectedAnswerIndex,
    phase,
    // Getters
    currentQuestion,
    progress,
    topResults,
    // Actions
    startQuiz,
    selectAnswer,
    confirmAnswer,
    restart,
  }
})

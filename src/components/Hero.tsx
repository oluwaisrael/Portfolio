import { lazy, Suspense, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  GitBranch,
  Mail,
  MessageCircle,
  Network,
  Send,
} from 'lucide-react'
import { profile } from '../data/profile'

const HeroScene = lazy(() => import('./HeroScene'))

const assistantPrompts = [
  'What does Israel build?',
  'Tell me about UniRAG',
  'Why Statistics + software?',
  'What’s Lael?',
]

const projectAliases = new Map([
  ['price universe', 'Price Universe'],
  ['price', 'Price Universe'],
  ['unirag', 'UniRAG'],
  ['rag', 'UniRAG'],
  ['lael', 'Lael'],
])

const includesAny = (value: string, terms: string[]) =>
  terms.some((term) => value.includes(term))

const formatStack = (stack: string[]) =>
  stack.length > 4
    ? `${stack.slice(0, 4).join(', ')} and ${stack.length - 4} more`
    : stack.join(', ')

const findProject = (value: string) => {
  for (const [alias, projectName] of projectAliases) {
    if (value.includes(alias)) {
      return profile.projects.find(
        (project) => project.name === projectName,
      )
    }
  }

  return undefined
}

function getAssistantAnswer(question: string) {
  const value = question.toLowerCase()
  const project = findProject(value)

  if (/\b(hello|hi|hey|yo|sup)\b/.test(value)) {
    return `Hey. I’m here for the useful stuff: ${profile.displayName} is ${profile.positioning.toLowerCase()} Ask me about his projects, availability, stack, or how to reach him.`
  }

  if (project) {
    const linkText = project.link
      ? ` Source: ${project.link}.`
      : ''

    return `${project.name}: ${project.summary} ${project.detail} Stack-wise, it leans on ${formatStack(project.stack)}.${linkText}`
  }

  if (
    includesAny(value, [
      'best',
      'strongest',
      'favorite',
      'flagship',
      'impressive',
    ])
  ) {
    return `The strongest part is the range: Price Universe shows backend/product work, UniRAG shows retrieval and applied machine learning, and Lael shows curiosity about native desktop tools. It feels like ${profile.displayName} is learning how real systems fit together, not just collecting frameworks.`
  }

  if (
    includesAny(value, [
      'stat',
      'school',
      'course',
      'university',
      'ai',
      'software',
      'journey',
      'background',
    ])
  ) {
    return `${profile.displayName} studies ${profile.course} at the ${profile.school}, ${profile.level}. ${profile.journey} That is why the work leans toward data, backend systems, and practical products.`
  }

  if (
    includesAny(value, [
      'available',
      'availability',
      'hire',
      'work with',
      'job',
      'intern',
      'freelance',
      'remote',
    ])
  ) {
    return `Yes. ${profile.displayName} is based in ${profile.location} and availability is listed as “${profile.availability}.” Best fit: ${profile.lookingFor}`
  }

  if (
    includesAny(value, [
      'contact',
      'email',
      'phone',
      'call',
      'reach',
      'linkedin',
      'github',
    ])
  ) {
    return `You can reach ${profile.displayName} by email at ${profile.contact.email} or phone at ${profile.contact.phone}. GitHub is ${profile.contact.github}, LinkedIn is ${profile.contact.linkedin}. Resume is marked: ${profile.contact.resume}.`
  }

  if (
    includesAny(value, [
      'build',
      'skill',
      'stack',
      'work',
      'project',
      'focus',
    ])
  ) {
    return `${profile.displayName} builds across ${profile.focusAreas.join(', ')}. His edge is ${profile.strengths.join('; ')}. The main projects to look at are ${profile.projects.map((item) => item.name).join(', ')}.`
  }

  if (
    includesAny(value, [
      'who',
      'about',
      'name',
      'bio',
      'derin',
      'israel',
    ])
  ) {
    return `${profile.name}, also known as ${profile.displayName}, is a ${profile.level} ${profile.course} student in ${profile.location}. ${profile.positioning} In his words: “${profile.intro}” and yes, the confidence is part of the brand: ${profile.bio}`
  }

  return `Good question. Based on what I know, ${profile.displayName} is strongest around full-stack work, backend/API design, data, and retrieval-based products. Ask about Price Universe, UniRAG, Lael, availability, or contact.`
}

function Hero() {
  const [assistantQuestion, setAssistantQuestion] = useState('')
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [assistantAnswer, setAssistantAnswer] = useState(
    `Hi, I’m ${profile.displayName}’s assistant. Ask me about his work, projects, journey or contact details.`,
  )

  const askAssistant = (question: string) => {
    const cleanQuestion = question.trim()

    if (!cleanQuestion) {
      return
    }

    setAssistantAnswer(getAssistantAnswer(cleanQuestion))
    setAssistantQuestion('')
  }

  return (
    <section className="hero">
      <div className="hero-stage">
        <div className="hero-image" aria-label="Portrait of Adeoti Israel">
          <div className="hero-portrait-grid" aria-hidden="true" />
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
          <div className="hero-portrait-mark hero-portrait-mark-top" aria-hidden="true">01</div>
          <div className="hero-portrait-mark hero-portrait-mark-bottom" aria-hidden="true">LAGOS / NG</div>
          <img
            className="hero-main-portrait"
            src="/images/derin-cutout.png"
            alt="Adeoti Israel"
            draggable={false}
          />
        </div>

        <div className="hero-content">
          <div className="hero-title">
            <span className="hero-kicker">ADEOTI ISRAEL / SOFTWARE ENGINEER</span>

            <h1>DERIN<span>.</span></h1>

            <span className="hero-title-small">
              BACKEND SYSTEMS / DATA / APPLIED AI
            </span>
          </div>

          <div className="hero-summary">
            <p className="hero-lede">
              I build useful things.
            </p>

            <p className="hero-copy">
              A Statistics student at the University of Lagos
              building dependable software, from product APIs
              to retrieval systems and data tools.
            </p>

            <div className="hero-actions">
              <a className="hero-primary-link" href="#work">
                See my work
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://github.com/oluwaisrael"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitBranch size={17} />
              </a>

              <a
                href="https://linkedin.com/in/adeoti-israel-a10503262"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Network size={17} />
              </a>

              <a
                href="mailto:adeotiisrael93@gmail.com"
                aria-label="Email"
                title="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>

        <aside className={`hero-assistant ${assistantOpen ? 'is-open' : ''}`}>
          <button
            className="assistant-toggle"
            type="button"
            aria-expanded={assistantOpen}
            aria-controls="assistant-body"
            onClick={() => setAssistantOpen((open) => !open)}
          >
            <MessageCircle size={17} />
            <span>Ask about Derin</span>
            <ChevronDown size={17} />
          </button>
          <div className="assistant-body" id="assistant-body">
          <div className="assistant-header">
            <div>
              <span>Ask about Derin</span>
              <strong>Online</strong>
            </div>

            <i />
          </div>

          <div className="assistant-answer">
            {assistantAnswer}
          </div>

          <div className="assistant-prompts">
            {assistantPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => askAssistant(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="assistant-input"
            onSubmit={(event) => {
              event.preventDefault()
              askAssistant(assistantQuestion)
            }}
          >
            <input
              value={assistantQuestion}
              placeholder="Ask something..."
              onChange={(event) =>
                setAssistantQuestion(event.target.value)
              }
            />

            <button
              type="submit"
              aria-label="Ask assistant"
            >
              <Send size={14} />
            </button>
          </form>
          </div>
        </aside>
      </div>

      <div className="hero-bottom">
        <span className="hero-location">LAGOS, NIGERIA</span>

        <a
          className="hero-scroll"
          href="#work"
        >
          <span>EXPLORE WORK</span>
          <ArrowDown size={16} />
        </a>

        <a
          className="hero-cv"
          href="mailto:adeotiisrael93@gmail.com?subject=Let's%20work%20together"
        >
          <span>GET IN TOUCH</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  )
}

export default Hero

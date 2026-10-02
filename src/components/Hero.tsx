import { useState, type CSSProperties, type PointerEvent } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  GitBranch,
  Network,
  Send,
} from 'lucide-react'
import { profile } from '../data/profile'

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

  if (
    includesAny(value, [
      'hello',
      'hi',
      'hey',
      'yo',
      'sup',
    ])
  ) {
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

  if (
    includesAny(value, [
      'build',
      'skill',
      'stack',
      'work',
      'project',
      'do',
      'focus',
    ])
  ) {
    return `${profile.displayName} builds across ${profile.focusAreas.join(', ')}. His edge is ${profile.strengths.join('; ')}. The main projects to look at are ${profile.projects.map((item) => item.name).join(', ')}.`
  }

  return `Good question. Based on what I know, ${profile.displayName} is strongest around full-stack work, backend/API design, data, and retrieval-based products. Ask about Price Universe, UniRAG, Lael, availability, or contact.`
}

function Hero() {
  const [armorState, setArmorState] = useState({
    active: false,
    x: 50,
    y: 50,
  })
  const [assistantQuestion, setAssistantQuestion] = useState('')
  const [assistantAnswer, setAssistantAnswer] = useState(
    `Hi, I’m ${profile.displayName}’s assistant. Ask me about his work, projects, journey or contact details.`,
  )

  const handleArmorMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === 'touch' && event.buttons === 0) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top

    setArmorState({
      active: true,
      x: Math.max(0, Math.min(100, (localX / rect.width) * 100)),
      y: Math.max(0, Math.min(100, (localY / rect.height) * 100)),
    })
  }

  const armorStyle = {
    '--reveal-x': `${armorState.x}%`,
    '--reveal-y': `${armorState.y}%`,
  } as CSSProperties

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
        <div
          className={`hero-image ${
            armorState.active ? 'is-armor-active' : ''
          }`}
          style={armorStyle}
          onPointerDown={handleArmorMove}
          onPointerMove={handleArmorMove}
          onPointerUp={() => setArmorState((state) => ({ ...state, active: false }))}
          onPointerCancel={() => setArmorState((state) => ({ ...state, active: false }))}
          onPointerLeave={() => {
            setArmorState({
              active: false,
              x: 50,
              y: 50,
            })
          }}
        >
          <div className="hero-armor-reveal">
            <img
              className="hero-main-portrait"
              src="/images/green.jpeg"
              alt="Israel Adeoti"
              draggable={false}
            />

            <img
              className="hero-ironman-cover"
              src="/images/ironman.jpg"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>
        </div>

        <div className="hero-title">
          <span className="hero-kicker">DERIN / LAGOS, NIGERIA</span>

          <h1>
            ISRAEL
            <br />
            ADEOTI
          </h1>

          <span className="hero-title-small">
            SOFTWARE / DATA / BACKEND
          </span>

          <p className="hero-lede">
            Building useful things.
          </p>

          <p className="hero-copy">
            I build real systems, from data pipelines
            and backend services to practical products.
            Currently a Statistics student at UNILAG,
            focused on backend engineering and applied ML.
          </p>

          <div className="hero-actions">
            <a
              href="https://github.com/oluwaisrael"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={14} />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/adeoti-israel-a10503262"
              target="_blank"
              rel="noreferrer"
            >
              <Network size={14} />
              LinkedIn
            </a>

            <a href="mailto:adeotiisrael93@gmail.com">
              <FileText size={14} />
              Email
            </a>
          </div>
        </div>

        <aside className="hero-assistant">
          <div className="assistant-header">
            <div>
              <span>Ask Israel</span>
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
        </aside>
      </div>

      <div className="hero-bottom">
        <div className="hero-statement">
          <span
            className="hero-line"
            aria-hidden="true"
          />

          <p>
            6.5244° N
            <br />
            3.3792° E
          </p>
        </div>

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

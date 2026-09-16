import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Hero from './components/Hero'
import { CustomCursor } from './components/CustomCursor'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Systems', href: '#systems' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const supportingProjects = [
  {
    number: '04',
    title: 'Payment Service',
    category: 'BACKEND SYSTEM',
    description:
      'Payments are easy to start. Reliable payments are harder. A backend service handling initialization, verification and webhook-driven fulfillment, with asynchronous processing for work that should not block the request cycle.',
    stack: ['FastAPI', 'PostgreSQL', 'Paystack', 'Redis', 'Celery'],
  },
  {
    number: '05',
    title: 'Authentication Service',
    category: 'BACKEND SYSTEM',
    description:
      'Identity is infrastructure. An authentication layer built around JWT access and refresh flows, OAuth2 and PostgreSQL-backed user management.',
    stack: ['FastAPI', 'JWT', 'OAuth2', 'PostgreSQL'],
  },
  {
    number: '06',
    title: 'Notification Service',
    category: 'ASYNC SYSTEM',
    description:
      'An API should not have to wait for an email. An asynchronous notification pipeline that moves delivery into background workers while Redis and Celery handle the queue.',
    stack: ['FastAPI', 'Celery', 'Redis', 'SMTP'],
  },
  {
    number: '07',
    title: 'Neural Network From Scratch',
    category: 'MACHINE LEARNING',
    description:
      'No framework. No abstraction hiding the mathematics. A neural network implemented from first principles with NumPy — forward propagation, backpropagation, gradient updates and softmax classification on MNIST.',
    stack: ['Python', 'NumPy', 'MNIST', 'Backpropagation'],
  },
  {
    number: '08',
    title: 'Customer Churn Prediction',
    category: 'MACHINE LEARNING',
    description:
      'A model is only useful when it survives the journey from dataset to decision. An end-to-end churn pipeline covering preprocessing, feature engineering, evaluation and an interactive prediction interface.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
  },
  {
    number: '09',
    title: 'URL Shortener',
    category: 'BACKEND',
    description:
      'A small system with a very clear job. A REST service for generating short links, resolving redirects and recording usage data, backed by PostgreSQL.',
    stack: ['FastAPI', 'PostgreSQL', 'REST API'],
  },
]

function ProjectVideo({
  src,
  label,
  index,
}: {
  src: string
  label: string
  index: string
}) {
  return (
    <div className="project-video-shell">
      <div className="project-video-ambient" />

      <div className="project-video-frame">
        <div className="project-video-header">
          <div className="project-video-header-left">
            <span className="project-video-live-dot" />
            <span>LIVE PRODUCT CAPTURE</span>
          </div>

          <div className="project-video-header-right">
            <span>{index}</span>
            <span>{label}</span>
          </div>
        </div>

        <div className="project-video-screen">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="project-video-overlay" />

          <div className="project-video-grain" />

          <div className="project-video-corner project-video-corner-tl" />
          <div className="project-video-corner project-video-corner-tr" />
          <div className="project-video-corner project-video-corner-bl" />
          <div className="project-video-corner project-video-corner-br" />

          <div className="project-video-center-mark">
            <span />
            <span />
          </div>

          <div className="project-video-bottom">
            <span>PRODUCT INTERFACE</span>
            <span>00 / 01</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <CustomCursor />

      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <a
          href="#"
          className="nav-brand"
          onClick={closeMenu}
        >
          <span className="nav-index">01</span>
          <span>ISRAEL ADEOTI</span>
        </a>

        <nav
          className={`nav-links ${
            menuOpen ? 'nav-links-open' : ''
          }`}
        >
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="nav-link"
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <span className="availability">
            <i />
            Available
          </span>

          <button
            className="menu-button"
            type="button"
            aria-label={
              menuOpen ? 'Close menu' : 'Open menu'
            }
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </header>

      <main>
        <Hero />

        {/* -------------------------------------------------
            SELECTED WORK
        -------------------------------------------------- */}

        <section className="work-section" id="work">
          <div className="section-meta">
            <span>02</span>
            <span>Selected work</span>
          </div>

          <div className="work-intro">
            <p className="eyebrow">
              Built, not imagined.
            </p>

            <h2>
              The work is
              <br />
              <em>the proof.</em>
            </h2>

            <p>
              Systems built across backend engineering,
              machine learning and AI. The captures below
              show the products as they actually exist —
              not concepts, mockups or case-study renders.
            </p>
          </div>

          <div className="flagship-projects">

            {/* -------------------------------------------------
                PRICE UNIVERSE
            -------------------------------------------------- */}

            <article className="flagship-project flagship-project-featured">
              <div className="project-heading">
                <div className="project-index">
                  01
                </div>

                <div>
                  <p className="project-category">
                    FULL-STACK / DATA SYSTEM
                  </p>

                  <h3>Price Universe</h3>
                </div>

                <span className="project-state">
                  SELECTED
                </span>
              </div>

              <ProjectVideo
                src="/videos/price-universe.mp4"
                label="PRICE INTELLIGENCE"
                index="01"
              />

              <div className="project-detail-grid">
                <div>
                  <p className="detail-label">
                    THE PROBLEM
                  </p>

                  <p className="detail-copy">
                    E-commerce moves fast. Price data
                    does not always move with it.
                  </p>

                  <p className="detail-copy detail-copy-secondary">
                    Price Universe turns scattered
                    product listings into a single
                    intelligence layer — collecting,
                    processing and structuring price
                    data so products can be compared
                    through one interface.
                  </p>
                </div>

                <div>
                  <p className="detail-label">
                    THE SYSTEM
                  </p>

                  <div className="architecture-line">
                    <span>SCRAPERS</span>
                    <b>→</b>
                    <span>CELERY</span>
                    <b>→</b>
                    <span>FASTAPI</span>
                    <b>→</b>
                    <span>POSTGRES</span>
                    <b>→</b>
                    <span>REACT</span>
                  </div>

                  <p className="engineering-note">
                    Built around asynchronous workers so
                    data collection can run independently
                    from the product experience.
                  </p>
                </div>
              </div>

              <div className="project-footer">
                <div className="project-stack">
                  {[
                    'Python',
                    'FastAPI',
                    'PostgreSQL',
                    'Redis',
                    'Celery',
                    'React',
                    'React Three Fiber',
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <a
                  className="project-link"
                  href="https://github.com/oluwaisrael/ecommerce-price"
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW SOURCE
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            {/* -------------------------------------------------
                UNIRAG
            -------------------------------------------------- */}

            <article className="flagship-project">
              <div className="project-heading">
                <div className="project-index">
                  02
                </div>

                <div>
                  <p className="project-category">
                    AI / INFORMATION RETRIEVAL
                  </p>

                  <h3>UniRAG</h3>
                </div>

                <span className="project-state">
                  SELECTED
                </span>
              </div>

              <ProjectVideo
                src="/videos/unirag.mp4"
                label="RAG COURSE ASSISTANT"
                index="02"
              />

              <div className="project-detail-grid">
                <div>
                  <p className="detail-label">
                    THE PROBLEM
                  </p>

                  <p className="detail-copy">
                    Most course material is searchable.
                    Very little of it is actually
                    understood.
                  </p>

                  <p className="detail-copy detail-copy-secondary">
                    UniRAG lets students ask questions
                    against their own course material,
                    retrieving relevant context before
                    Gemini handles the final reasoning.
                  </p>
                </div>

                <div>
                  <p className="detail-label">
                    THE SYSTEM
                  </p>

                  <div className="architecture-line">
                    <span>PDF</span>
                    <b>→</b>
                    <span>FAISS</span>
                    <b>+</b>
                    <span>BM25</span>
                    <b>→</b>
                    <span>GEMINI</span>
                  </div>

                  <p className="engineering-note">
                    FAISS handles semantic similarity.
                    BM25 catches the exact terms embeddings
                    can miss.
                  </p>
                </div>
              </div>

              <div className="project-footer">
                <div className="project-stack">
                  {[
                    'Python',
                    'Gemini',
                    'FAISS',
                    'BM25',
                    'Sentence Transformers',
                    'Streamlit',
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <a
                  className="project-link"
                  href="https://github.com/oluwaisrael/rag-course-app"
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW SOURCE
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            {/* -------------------------------------------------
                LAEL
            -------------------------------------------------- */}

            <article className="flagship-project flagship-project-lael">
              <div className="project-heading">
                <div className="project-index">
                  03
                </div>

                <div>
                  <p className="project-category">
                    NATIVE AI / SYSTEMS
                  </p>

                  <h3>Lael</h3>
                </div>

                <span className="project-state project-state-building">
                  BUILDING
                </span>
              </div>

              <ProjectVideo
                src="/videos/lael.mp4"
                label="PERSONAL INTELLIGENCE"
                index="03"
              />

              <div className="project-detail-grid">
                <div>
                  <p className="detail-label">
                    THE IDEA
                  </p>

                  <p className="detail-copy">
                    Lael is an experiment in what a
                    personal AI can become when it is not
                    confined to a chat window.
                  </p>

                  <p className="detail-copy detail-copy-secondary">
                    A native macOS system presence combining
                    local speech recognition, cognition,
                    persistent memory and local language
                    models — designed to interact naturally
                    over time.
                  </p>
                </div>

                <div>
                  <p className="detail-label">
                    THE SYSTEM
                  </p>

                  <div className="architecture-line architecture-lael">
                    <span>WHISPER</span>
                    <b>→</b>
                    <span>COGNITION</span>
                    <b>→</b>
                    <span>MEMORY</span>
                    <b>→</b>
                    <span>QWEN</span>
                    <b>→</b>
                    <span>TAURI</span>
                  </div>

                  <p className="engineering-note">
                    Tauri and Rust handle the system layer,
                    while local inference through Whisper
                    and Qwen keeps the core intelligence
                    on-device.
                  </p>
                </div>
              </div>

              <div className="project-footer">
                <div className="project-stack">
                  {[
                    'Tauri 2',
                    'React',
                    'TypeScript',
                    'Rust',
                    'Whisper',
                    'Ollama',
                    'Qwen 2.5',
                    'Three.js',
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* -------------------------------------------------
            ENGINEERING SYSTEMS
        -------------------------------------------------- */}

        <section
          className="systems-section"
          id="systems"
        >
          <div className="section-meta">
            <span>03</span>
            <span>Engineering work</span>
          </div>

          <div className="systems-intro">
            <p className="eyebrow">
              Beyond the flagship projects
            </p>

            <h2>
              Smaller systems.
              <br />
              <em>Same obsession.</em>
            </h2>
          </div>

          <div className="supporting-projects">
            {supportingProjects.map((project) => (
              <article
                className="supporting-project"
                key={project.number}
              >
                <div className="supporting-number">
                  {project.number}
                </div>

                <div className="supporting-main">
                  <p>{project.category}</p>

                  <h3>{project.title}</h3>

                  <span>
                    {project.description}
                  </span>
                </div>

                <div className="supporting-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <ArrowUpRight
                  className="supporting-arrow"
                  size={20}
                />
              </article>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------
            ABOUT
        -------------------------------------------------- */}

        <section
          className="about-section"
          id="about"
        >
          <div className="section-meta">
            <span>04</span>
            <span>About</span>
          </div>

          <div className="about-layout">
            <p className="eyebrow">
              A little context
            </p>

            <div>
              <h2>
                Statistics taught me to
                <br />
                <em>look for the signal.</em>
              </h2>

              <p className="about-copy">
                I study Statistics at the University of
                Lagos and build software around the things
                I keep wanting to understand: data,
                intelligent systems and what happens
                underneath the interface.
              </p>

              <p className="about-copy">
                That has taken me from machine learning
                and retrieval systems to APIs, distributed
                jobs, payments and native desktop software.
              </p>
            </div>
          </div>

          <div className="about-signal">
            <span>STATISTICS</span>
            <b>→</b>
            <span>DATA</span>
            <b>→</b>
            <span>ML</span>
            <b>→</b>
            <span>AI</span>
            <b>→</b>
            <span>SOFTWARE</span>
            <b>→</b>
            <span>SYSTEMS</span>
          </div>
        </section>

        {/* -------------------------------------------------
            CONTACT
        -------------------------------------------------- */}

        <section
          className="contact-section"
          id="contact"
        >
          <div className="section-meta">
            <span>05</span>
            <span>Contact</span>
          </div>

          <div className="contact-layout">
            <div>
              <p className="eyebrow">
                Have something worth building?
              </p>

              <h2>
                Let’s make
                <br />
                <em>something real.</em>
              </h2>
            </div>

            <div className="contact-actions">
              <a
                href="mailto:adeotiisrael93@gmail.com"
                className="contact-link"
              >
                <span>
                  adeotiisrael93@gmail.com
                </span>
                <ArrowUpRight size={20} />
              </a>

              <a
                href="https://github.com/oluwaisrael"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>GitHub</span>
                <ArrowUpRight size={20} />
              </a>

              <a
                href="https://linkedin.com/in/adeoti-israel-a10503262"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 ADEOTI ISRAEL</span>
        <span>SOFTWARE / AI / SYSTEMS</span>
        <span>LAGOS, NG</span>
      </footer>
    </div>
  )
}

export default App
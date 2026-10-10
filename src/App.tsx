import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import Hero from './components/Hero'
import ExperienceCanvas from './components/ExperienceCanvas'
import type { SceneMode } from './components/HeroScene'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Engineering', href: '#systems' },
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
  {
    number: '10',
    title: 'Roam',
    category: 'DECISION SYSTEM',
    description:
      'A natural-language real-place decision engine that weighs budget, distance, opening hours, Wi-Fi, quietness and other practical preferences.',
    stack: ['Python', 'Natural Language', 'Data', 'Decision Systems'],
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
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${label} product demo`}
      />
      <div className="project-video-caption">
        <span>{index} / {label}</span>
        <span>PRODUCT CAPTURE</span>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = window.localStorage.getItem('derin-theme')
    return saved === 'light' ? 'light' : 'dark'
  })
  const [sceneMode, setSceneMode] = useState<SceneMode>('hero')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('derin-theme', theme)
  }, [theme])

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

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scene-mode]'),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setSceneMode(visible.target.getAttribute('data-scene-mode') as SceneMode)
        }
      },
      { threshold: [0.18, 0.45, 0.72], rootMargin: '-18% 0px -30% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <a
          href="#"
          className="nav-brand"
          onClick={closeMenu}
        >
          <span className="nav-monogram">IA</span>
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
            className="theme-button"
            type="button"
            aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
        <ExperienceCanvas sceneMode={sceneMode} />
        <Hero />

        <section className="editorial-overview" data-scene-mode="identity" aria-label="Portfolio overview">
          <article className="overview-panel overview-about">
            <div className="overview-panel-heading"><span>02</span><span>About / System</span></div>
            <h2>Four<br /><em>perspectives.</em></h2>
            <p>Statistics, engineering, AI/ML and creative technology — all part of the same system.</p>
            <a className="overview-link" href="#about">Explore <ArrowUpRight size={14} /></a>
          </article>

          <article className="overview-panel overview-projects">
            <div className="overview-panel-heading"><span>03</span><span>Projects</span></div>
            <h2>Real systems.<br /><em>Real learning.</em></h2>
            <div className="overview-index">
              {['PriceUniverse', 'UniRAG', 'Neural Network', 'Roam', 'Lael'].map((project, index) => (
                <a href="#work" key={project}><span>0{index + 1}</span>{project}<ArrowUpRight size={13} /></a>
              ))}
            </div>
          </article>

          <article className="overview-panel overview-ask">
            <div className="overview-panel-heading"><span>04</span><span>Ask Derin</span></div>
            <h2>A more<br /><em>interactive way</em><br />to know my work.</h2>
            <p>Ask about my work, stack or current focus.</p>
            <a className="overview-link" href="#ask">Open Ask Derin <ArrowUpRight size={14} /></a>
          </article>
        </section>

        {/* -------------------------------------------------
            SELECTED WORK
        -------------------------------------------------- */}

        <section className="work-section" id="work" data-scene-mode="priceuniverse">
          <div className="section-meta">
            <span>01</span>
            <span>Selected work</span>
          </div>

          <div className="work-intro">
            <p className="eyebrow">
              Selected work
            </p>

            <h2>
              Selected
              <br />
              <em>systems.</em>
            </h2>

            <p>
              Products and engineering work across backend
              systems, retrieval, and local software.
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
                    INFORMATION RETRIEVAL
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
                    DESKTOP / LOCAL MODELS
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
                    Lael is an experiment in what a desktop
                    assistant can become when it is treated
                    like a native tool.
                  </p>

                  <p className="detail-copy detail-copy-secondary">
                    A native macOS tool combining
                    local speech recognition, cognition,
                    persistent memory and local language
                    models.
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
                    and Qwen keeps the heavier work
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
            ENGINEERING WORK
        -------------------------------------------------- */}

        <section
          className="systems-section"
          id="systems"
          data-scene-mode="neural-network"
        >
          <div className="section-meta">
            <span>02</span>
            <span>Engineering work</span>
          </div>

          <div className="systems-intro">
            <p className="eyebrow">
              Beyond the flagship projects
            </p>

            <h2>
              Smaller work.
              <br />
              <em>Same care.</em>
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
          data-scene-mode="identity"
        >
          <div className="section-meta">
            <span>03</span>
            <span>About</span>
          </div>

          <div className="about-layout">
            <div className="about-copy-block">
              <p className="eyebrow">
                A little context
              </p>
              <h2>
                Statistics taught me to
                <br />
                <em>respect the data.</em>
              </h2>

              <p className="about-copy">
                I study Statistics at the University of
                Lagos and build software around the things
                I keep wanting to understand: data,
                backend systems and what happens underneath
                the interface.
              </p>

              <p className="about-copy">
                That has taken me from machine learning
                and retrieval systems to APIs, distributed
                jobs, payments and native desktop software.
              </p>
            </div>
            <div className="about-visual">
              <img
                src="/images/israel-cutout.png"
                alt="Israel adjusting his cap"
                loading="lazy"
              />
            </div>
          </div>

          <div className="about-signal">
            <span>STATISTICS</span>
            <b>→</b>
            <span>DATA</span>
            <b>→</b>
            <span>ML</span>
            <b>→</b>
            <span>SOFTWARE</span>
            <b>→</b>
            <span>BACKEND</span>
          </div>
        </section>

        {/* -------------------------------------------------
            CONTACT
        -------------------------------------------------- */}

        <section
          className="contact-section"
          id="contact"
          data-scene-mode="contact"
        >
          <div className="section-meta">
            <span>04</span>
            <span>Contact</span>
          </div>

          <div className="contact-layout">
            <div>
              <p className="eyebrow">
                Have something useful to build?
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

      <nav className="mobile-dock" aria-label="Mobile navigation">
        <a href="#top">Home</a>
        <a href="#work">Work</a>
        <a href="#ask">Ask</a>
        <a href="#contact">Contact</a>
      </nav>

      <footer className="site-footer">
        <span>© 2026 ADEOTI ISRAEL</span>
        <span>SOFTWARE / DATA / BACKEND</span>
        <span>LAGOS, NG</span>
      </footer>
    </div>
  )
}

export default App

import { ArrowUpRight, Mail } from 'lucide-react'

import { CustomCursor } from './components/CustomCursor'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { ProjectCard } from './components/ProjectCard'
import { SectionHeading } from './components/SectionHeading'
import { projects } from './data/projects'

function App() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  )

  return (
    <>
      <CustomCursor />

      <Navigation />

      <main>
        <Hero />

        <section id="work" className="section work-section">
          <div className="container">
            <SectionHeading
              eyebrow="Selected work"
              title="Things I’ve built."
              description="A selection of systems, products and experiments across backend engineering, artificial intelligence and full-stack development."
            />

            <div className="projects">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <SectionHeading
              eyebrow="About"
              title="I like building things that actually do something."
            />

            <div className="about-grid">
              <div className="about-statement">
                <p>
                  I’m a developer focused on the intersection
                  of backend engineering and AI.
                </p>

                <p>
                  My work usually starts with a problem,
                  then moves through data, APIs, models and
                  interfaces until the whole thing becomes a
                  usable product.
                </p>

                <p>
                  I’m especially interested in systems that
                  feel thoughtful under the surface — reliable
                  backends, useful AI, and interfaces that stay
                  out of the way.
                </p>
              </div>

              <div className="about-details">
                <div className="detail">
                  <span>Currently</span>
                  <strong>
                    Building software & AI systems
                  </strong>
                </div>

                <div className="detail">
                  <span>Based in</span>
                  <strong>Lagos, Nigeria</strong>
                </div>

                <div className="detail">
                  <span>Education</span>
                  <strong>
                    B.Sc. Statistics · UNILAG
                  </strong>
                </div>

                <div className="detail">
                  <span>Focus</span>
                  <strong>
                    Backend · AI · Full-stack
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section capabilities-section">
          <div className="container">
            <SectionHeading
              eyebrow="Capabilities"
              title="What I work with."
            />

            <div className="capabilities">
              <div className="capability">
                <span>01</span>

                <h3>Backend</h3>

                <p>
                  APIs, databases, authentication,
                  services and the infrastructure that
                  makes products work.
                </p>

                <div className="capability-stack">
                  Python · FastAPI · PostgreSQL · REST ·
                  JWT · Docker
                </div>
              </div>

              <div className="capability">
                <span>02</span>

                <h3>AI / ML</h3>

                <p>
                  Retrieval systems, machine learning,
                  local models and intelligent product
                  experiences.
                </p>

                <div className="capability-stack">
                  Python · NumPy · RAG · FAISS · BM25 ·
                  Ollama
                </div>
              </div>

              <div className="capability">
                <span>03</span>

                <h3>Full-stack</h3>

                <p>
                  Interfaces connected to real systems,
                  with an emphasis on clean architecture
                  and useful interactions.
                </p>

                <div className="capability-stack">
                  React · TypeScript · Vite · Three.js ·
                  Tauri
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container">
            <p className="eyebrow">Have something in mind?</p>

            <h2>
              Let’s build
              <br />
              something <em>good.</em>
            </h2>

            <a
              href="mailto:adeotiisrael93@gmail.com"
              className="contact-email"
            >
              adeotiisrael93@gmail.com
              <ArrowUpRight size={24} />
            </a>

            <div className="contact-bottom">
              <div className="socials">
                <a
                  href="https://github.com/oluwaisrael"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <span className="social-symbol">GH</span>
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/adeoti-israel-a10503262/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <span className="social-symbol">LI</span>
                  LinkedIn
                </a>

                <a
                  href="mailto:adeotiisrael93@gmail.com"
                  aria-label="Email"
                >
                  <Mail size={19} />
                  Email
                </a>
              </div>

              <span>
                Designed & built by Israel Adeoti
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ImageReveal } from './ImageReveal'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-noise" />

      <div className="hero-topline">
        <span>SOFTWARE / AI / SYSTEMS</span>
        <span>06—26 / 09—26</span>s
      </div>

      <div className="hero-stage">
        <div className="hero-background-word">ADEOTI</div>

        <div className="hero-image">
          <ImageReveal
            baseImage="/images/israel.jpeg"
            revealImage="/images/ironman.jpg"
          />
        </div>

        <div className="hero-title">
          <span className="hero-title-small">ISRAEL</span>
          <h1>ADEOTI</h1>
          <span className="hero-title-small hero-title-right">
            ENGINEER / BUILDER
          </span>
        </div>

        <div className="hero-side-note">
          <span>BASED IN</span>
          <strong>LAGOS, NG</strong>
        </div>

        <div className="hero-side-note hero-side-note-right">
          <span>FOCUS</span>
          <strong>BACKEND + AI</strong>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="hero-statement">
          <span className="hero-line" />
          <p>
            I build software at the intersection
            <br />
            of <strong>data, intelligence and systems.</strong>
          </p>
        </div>

        <a className="hero-scroll" href="#work">
          <span>SCROLL TO EXPLORE</span>
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
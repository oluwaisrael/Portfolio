import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { ImageReveal } from './ImageReveal'

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-background-word">
        SOFTWARE
      </div>

      <div className="hero-copy hero-copy-left">
        <p className="eyebrow">
          BACKEND · AI · FULL-STACK
        </p>

        <h1>
          Israel
          <br />
          Adeoti<span>.</span>
        </h1>

        <p className="hero-description">
          I build intelligent systems and the software
          around them.
        </p>
      </div>

      <div className="hero-visual">
        <ImageReveal
          baseImage="/images/israel.jpg"
          revealImage="/images/ironman.jpg"
        />
      </div>

      <div className="hero-copy hero-copy-right">
        <div className="hero-location">
          <span>LAGOS, NIGERIA</span>
          <span>06°27′N / 03°24′E</span>
        </div>

        <a
          href="#work"
          className="hero-work-link"
        >
          <span>Explore selected work</span>
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </a>
      </div>

      <div className="hero-bottom">
        <div className="hero-scroll">
          <ArrowDownRight size={16} />
          <span>Scroll to explore</span>
        </div>

        <span className="hero-year">
          © {new Date().getFullYear()}
        </span>
      </div>
    </section>
  )
}
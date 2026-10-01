import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ImageReveal } from './ImageReveal'
import {
  useMousePosition,
  type MousePosition,
} from '../hooks/useMousePosition'

function Hero() {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    inside: false,
  })

  const [isTouch, setIsTouch] = useState(false)

  const { subscribe } = useMousePosition()

  useEffect(() => {
    return subscribe(setMouse)
  }, [subscribe])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none)')

    const update = () => {
      setIsTouch(mediaQuery.matches)
    }

    update()

    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const normalizedX = mouse.inside
    ? (mouse.x - centerX) / centerX
    : 0

  const normalizedY = mouse.inside
    ? (mouse.y - centerY) / centerY
    : 0

  const depthX = isTouch ? 0 : normalizedX
  const depthY = isTouch ? 0 : normalizedY

  const backgroundTransform = `
    translate(
      calc(-50% + ${depthX * -18}px),
      calc(-50% + ${depthY * -10}px)
    )
    scale(1.02)
  `

  const imageTransform = `
    translate(
      calc(-50% + ${depthX * 12}px),
      calc(-50% + ${depthY * 8}px)
    )
  `

  const titleTransform = `
    translate(
      ${depthX * -4}px,
      ${depthY * -2}px
    )
  `

  const signal = Math.round(
    Math.abs(depthX) * 40 + 60,
  )

  return (
    <section className="hero">
      <div className="hero-noise" />

      <div className="hero-topline">
        <span>SOFTWARE / AI / SYSTEMS</span>

        <span>
          06—26 / 09—26
        </span>
      </div>

      <div className="hero-stage">

        {/* BACKGROUND TYPE */}

        <div
          className="hero-background-word"
          style={{
            transform: backgroundTransform,
          }}
        >
          ADEOTI
        </div>

        {/* IMAGE */}

        <div
          className="hero-image"
          style={{
            transform: imageTransform,
          }}
        >
          <div className="hero-image-glow" />

          <ImageReveal
            baseImage="/images/israel.jpeg"
            revealImage="/images/ironman.jpg"
          />

          <div className="hero-image-label">
            <span>SUBJECT</span>
            <strong>01 / ISRAEL</strong>
          </div>
        </div>

        {/* MAIN TYPE */}

        <div
          className="hero-title"
          style={{
            transform: titleTransform,
          }}
        >
          <span className="hero-title-small">
            ISRAEL
          </span>

          <h1>ADEOTI</h1>

          <span className="hero-title-small hero-title-right">
            ENGINEER / BUILDER
          </span>
        </div>

        {/* LEFT DATA */}

        <div className="hero-side-note">
          <span>BASED IN</span>

          <strong>
            LAGOS, NG
          </strong>

          <span className="hero-data-gap">
            STATUS
          </span>

          <strong className="hero-status">
            ONLINE
          </strong>
        </div>

        {/* RIGHT DATA */}

        <div className="hero-side-note hero-side-note-right">
          <span>FOCUS</span>

          <strong>
            BACKEND + AI
          </strong>

          <span className="hero-data-gap">
            SIGNAL
          </span>

          <strong className="hero-signal">
            {signal}%
          </strong>
        </div>

        {/* CROSSHAIR */}

        <div className="hero-crosshair">
          <span />
          <span />
        </div>

        {/* COORDINATES */}

        <div className="hero-coordinates">
          <span>
            X {Math.round(depthX * 100)}
          </span>

          <span>
            Y {Math.round(depthY * 100)}
          </span>
        </div>
      </div>

      <div className="hero-bottom">

        <div className="hero-statement">
          <span className="hero-line" />

          <p>
            I build software at the intersection
            <br />
            of{' '}
            <strong>
              data, intelligence and systems.
            </strong>
          </p>
        </div>

        <a
          className="hero-scroll"
          href="#work"
        >
          <span>
            SCROLL TO EXPLORE
          </span>

          <ArrowDown size={16} />
        </a>

        <a
          className="hero-cv"
          href="mailto:adeotiisrael93@gmail.com?subject=Let's%20work%20together"
        >
          <span>
            GET IN TOUCH
          </span>

          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  )
}

export default Hero
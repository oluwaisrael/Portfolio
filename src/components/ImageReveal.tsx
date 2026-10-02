import {
  useEffect,
  useRef,
  useState,
} from 'react'

interface ImageRevealProps {
  baseImage: string
  revealImage: string
}

interface Position {
  x: number
  y: number
}

export function ImageReveal({
  baseImage,
  revealImage,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const targetPosition = useRef<Position>({
    x: 50,
    y: 50,
  })

  const currentPosition = useRef<Position>({
    x: 50,
    y: 50,
  })

  const animationFrame = useRef<number | null>(null)

  const [position, setPosition] = useState<Position>({
    x: 50,
    y: 50,
  })

  const [active, setActive] = useState(false)

  useEffect(() => {
    const animate = () => {
      const current = currentPosition.current
      const target = targetPosition.current

      current.x += (target.x - current.x) * 0.14
      current.y += (target.y - current.y) * 0.14

      setPosition({
        x: current.x,
        y: current.y,
      })

      animationFrame.current =
        requestAnimationFrame(animate)
    }

    animationFrame.current =
      requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  const updateTargetPosition = (
    clientX: number,
    clientY: number,
  ) => {
    const container = containerRef.current

    if (!container) return

    const rect = container.getBoundingClientRect()

    const x =
      ((clientX - rect.left) / rect.width) * 100

    const y =
      ((clientY - rect.top) / rect.height) * 100

    targetPosition.current = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    }
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    updateTargetPosition(
      event.clientX,
      event.clientY,
    )

    setActive(true)
  }

  const handlePointerEnter = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    updateTargetPosition(
      event.clientX,
      event.clientY,
    )

    setActive(true)
  }

  const handlePointerLeave = () => {
    setActive(false)
  }

  return (
    <div
      ref={containerRef}
      className={`image-reveal ${
        active ? 'is-active' : ''
      }`}
      data-cursor="large"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <img
        className="reveal-image reveal-base"
        src={baseImage}
        alt="Israel Adeoti"
        draggable={false}
      />

      <div
        className="reveal-layer"
        style={
          {
            '--mouse-x': `${position.x}%`,
            '--mouse-y': `${position.y}%`,
          } as React.CSSProperties
        }
      >
        <img
          className="reveal-image"
          src={revealImage}
          alt="Iron Man"
          draggable={false}
        />
      </div>

      <div className="image-vignette" />

      <div className="reveal-instruction">
        <span className="instruction-dot" />
        <span>Move to reveal</span>
      </div>
    </div>
  )
}
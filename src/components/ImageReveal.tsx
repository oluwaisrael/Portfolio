import {
  useCallback,
  useRef,
  useState,
} from 'react'

interface ImageRevealProps {
  baseImage: string
  revealImage: string
}

export function ImageReveal({
  baseImage,
  revealImage,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  })

  const [active, setActive] = useState(false)

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current

      if (!container) return

      const rect = container.getBoundingClientRect()

      const x = ((clientX - rect.left) / rect.width) * 100
      const y = ((clientY - rect.top) / rect.height) * 100

      setPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      })
    },
    [],
  )

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    updatePosition(event.clientX, event.clientY)
    setActive(true)
  }

  const handlePointerEnter = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    updatePosition(event.clientX, event.clientY)
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
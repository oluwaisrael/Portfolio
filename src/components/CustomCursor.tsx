import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    let ringX = mouseX
    let ringY = mouseY

    let frame = 0

    const move = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`

      frame = requestAnimationFrame(animate)
    }

    const handlePointerOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="large"]')
      ) {
        ring.classList.add('cursor-large')
      } else {
        ring.classList.remove('cursor-large')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handlePointerOver)

    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handlePointerOver)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
import { useEffect, useRef } from 'react'

export interface MousePosition {
  x: number
  y: number
  inside: boolean
}

export function useMousePosition() {
  const position = useRef<MousePosition>({
    x: 0,
    y: 0,
    inside: false,
  })

  const listeners = useRef(
    new Set<(position: MousePosition) => void>(),
  )

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      position.current = {
        x: event.clientX,
        y: event.clientY,
        inside: true,
      }

      listeners.current.forEach((listener) => {
        listener(position.current)
      })
    }

    const handleLeave = () => {
      position.current = {
        ...position.current,
        inside: false,
      }

      listeners.current.forEach((listener) => {
        listener(position.current)
      })
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener(
        'mouseleave',
        handleLeave,
      )
    }
  }, [])

  const subscribe = (
    listener: (position: MousePosition) => void,
  ) => {
    listeners.current.add(listener)

    return () => {
      listeners.current.delete(listener)
    }
  }

  return {
    position,
    subscribe,
  }
}
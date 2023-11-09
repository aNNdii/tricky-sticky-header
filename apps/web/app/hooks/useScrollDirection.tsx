import { useEffect, useRef, useState } from 'react';

export type ScrollDirection = "up" | "down"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection | null>(null)

  useEffect(() => {
    let previousScrollPosition = window.scrollY

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY
      const direction = currentScrollPosition > previousScrollPosition ? 'down' : 'up'

      if (direction !== scrollDirection) setScrollDirection(direction)
      previousScrollPosition = currentScrollPosition
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
    
  }, [scrollDirection])

  return scrollDirection
}

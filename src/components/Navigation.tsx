import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`navigation ${
        scrolled ? 'navigation-scrolled' : ''
      }`}
    >
      <a
        href="#top"
        className="nav-logo"
        aria-label="Israel Adeoti home"
      >
        ISRAEL<span>.</span>
      </a>

      <nav className="nav-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a
        className="nav-availability"
        href="#contact"
      >
        <span />
        Available for work
      </a>
    </header>
  )
}
import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, initCursor, initMagnetic, initNav, splitReveal, fadeUp, staggerCards } from './shared.js'

gsap.registerPlugin(ScrollTrigger)

initLenis()
initCursor()
initNav()
initMagnetic()

document.addEventListener('DOMContentLoaded', () => {
  splitReveal('.docs-title', { delay: 0.2 })
  fadeUp('.docs-sub',        { delay: 0.45 })
  fadeUp('.docs-search-wrap',{ delay: 0.55 })
  fadeUp('.docs-quick',      { delay: 0.65 })
  staggerCards('[data-reveal]', '.docs-grid', { stagger: 0.09, y: 35 })

  // Search keyboard shortcut hint
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      document.querySelector('.docs-search')?.focus()
    }
  })
})

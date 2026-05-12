import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, initCursor, initMagnetic, initNav, initHoloCards, splitReveal, fadeUp, staggerCards } from './shared.js'

gsap.registerPlugin(ScrollTrigger)

initLenis()
initCursor()
initNav()
initMagnetic()

document.addEventListener('DOMContentLoaded', () => {
  initHoloCards()

  // Hero
  splitReveal('.dispatch-heading', { delay: 0.2 })
  fadeUp('.blog-sub',  { delay: 0.5 })
  fadeUp('.filter-bar', { delay: 0.65 })

  // Featured card
  gsap.from('.featured-card', {
    y: 50, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.blog-featured', start: 'top 82%' },
  })

  // Post grid stagger
  staggerCards('[data-reveal]', '.blog-grid', { stagger: 0.1, y: 40 })

  // Newsletter
  fadeUp('.blog-newsletter', { start: 'top 85%' })

  // Filter tabs
  const btns  = document.querySelectorAll('.filter-btn')
  const cards = document.querySelectorAll('.blog-grid .blog-card')

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      const filter = btn.dataset.filter
      cards.forEach(card => {
        const tag  = card.closest('a').querySelector('[data-filter-tag]')?.dataset.filterTag
        const show = filter === 'all' || tag === filter
        gsap.to(card.closest('a'), {
          opacity: show ? 1 : 0.25,
          scale:   show ? 1 : 0.97,
          duration: 0.35,
          ease: 'power2.out',
        })
      })
    })
  })
})

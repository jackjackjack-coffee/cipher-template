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
  splitReveal('.feat-heading', { delay: 0.2 })
  fadeUp('.feat-hero .page-hero-sub', { delay: 0.5 })
  fadeUp('.page-hero-cta', { delay: 0.65 })

  // Feature rows — alternating slide-in
  document.querySelectorAll('[data-feat]').forEach((row, i) => {
    const isReverse = row.classList.contains('feat-row--reverse')
    gsap.from(row.querySelector('.feat-copy'), {
      x: isReverse ? 40 : -40,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: row, start: 'top 80%' },
    })
    gsap.from(row.querySelector('.feat-visual'), {
      x: isReverse ? -40 : 40,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      delay: 0.12,
      scrollTrigger: { trigger: row, start: 'top 80%' },
    })
  })

  // Confidence bars animate on scroll
  document.querySelectorAll('.conf-bar').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => setTimeout(() => bar.classList.add('animated'), 200),
    })
  })

  // Mini grid stagger
  staggerCards('[data-reveal]', '.mini-grid', { stagger: 0.1 })

  // CTA
  gsap.from('.cta-inner', {
    y: 40, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.cta-section', start: 'top 82%' },
  })
})

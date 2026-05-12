import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, initCursor, initMagnetic, initNav, initParticles, initHoloCards, splitReveal, fadeUp, staggerCards, countUp, initGlitch } from './shared.js'

gsap.registerPlugin(ScrollTrigger)

initLenis()
initCursor()
initNav()
initMagnetic()

document.addEventListener('DOMContentLoaded', () => {
  // Canvas particle network
  initParticles('hero-canvas')

  // Hero entrance sequence
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.from('.hero-eyebrow',        { y: 20, opacity: 0, duration: 0.7 }, 0.2)
  splitReveal('.hero-title .hero-line', { delay: 0.35, stagger: 0.03, y: 80, trigger: false })
  tl.from('.hero-sub',            { y: 25, opacity: 0, duration: 0.8 }, 0.7)
  tl.from('.hero-cta',            { y: 20, opacity: 0, duration: 0.7 }, 0.85)
  tl.from('.hero-stats',          { y: 20, opacity: 0, duration: 0.7 }, 0.95)
  tl.from('.hero-terminal-wrap',  { y: 40, opacity: 0, duration: 1, scale: 0.97 }, 0.8)

  // Glitch on hero title lines
  initGlitch('.hero-title .glitch')
  initGlitch('.cta-title.glitch')

  // Holo cards
  initHoloCards()

  // Features section
  splitReveal('.features-header .section-title')
  fadeUp('.features-header .section-sub')
  staggerCards('[data-reveal]', '.bento-grid', { stagger: 0.08, y: 35 })

  // Process steps
  document.querySelectorAll('[data-step]').forEach((step, i) => {
    gsap.from(step, {
      x: i % 2 === 0 ? -30 : 30,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: step, start: 'top 84%' },
    })
  })
  gsap.from('.process-connector', {
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    scrollTrigger: { trigger: '.process-steps', start: 'top 80%' },
  })

  // Live network stats count-up
  splitReveal('.network-header .section-title')
  staggerCards('[data-reveal]', '.metrics-grid', { stagger: 0.1 })
  countUp('.metric-num[data-target]')
  countUp('.hstat-val[data-target]')

  // Testimonial section
  splitReveal('.testi-header .section-title')

  // CTA
  gsap.from('.cta-inner', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
  })

  // Glitch trigger on CTA heading when it enters viewport
  ScrollTrigger.create({
    trigger: '.cta-title',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const el = document.querySelector('.cta-title')
      if (el) {
        el.classList.add('active')
        setTimeout(() => el.classList.remove('active'), 800)
      }
    },
  })
})

import './style.css'
import { gsap } from 'gsap'
import { initCursor } from './shared.js'

initCursor()

document.addEventListener('DOMContentLoaded', () => {
  // Card entrance
  gsap.from('.auth-card', {
    y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.1,
  })
  gsap.from('.auth-back', {
    x: -20, opacity: 0, duration: 0.7, ease: 'expo.out', delay: 0.3,
  })
  gsap.from('.auth-terms', {
    y: 15, opacity: 0, duration: 0.7, ease: 'expo.out', delay: 0.4,
  })
})

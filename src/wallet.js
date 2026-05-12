import './style.css'
import { gsap } from 'gsap'
import { initCursor } from './shared.js'

initCursor()

document.addEventListener('DOMContentLoaded', () => {
  gsap.from('.wallet-card', {
    y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.1,
  })
  gsap.from('.auth-back', {
    x: -20, opacity: 0, duration: 0.7, ease: 'expo.out', delay: 0.3,
  })

  // Stagger wallet options
  gsap.from('.wallet-option', {
    y: 20, opacity: 0, duration: 0.6, ease: 'expo.out', stagger: 0.07, delay: 0.4,
  })
})

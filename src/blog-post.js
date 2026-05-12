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
  // Hero entrance
  splitReveal('.post-title', { delay: 0.2 })
  fadeUp('.article-meta', { delay: 0.5 })

  // Article body fade in
  gsap.from('.article-body', {
    y: 30, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.article-layout', start: 'top 85%' },
  })

  // Related posts stagger
  staggerCards('[data-reveal]', '.related-grid', { stagger: 0.1 })

  // Reading progress bar
  const bar = document.getElementById('reading-progress')
  if (bar) {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })
  }

  // TOC active state on scroll
  const sections = document.querySelectorAll('h2[id], h3[id]')
  const tocLinks = document.querySelectorAll('.toc-list a')

  if (sections.length && tocLinks.length) {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: () => {
        let current = ''
        sections.forEach(s => {
          if (s.getBoundingClientRect().top < 140) current = s.id
        })
        tocLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + current)
        })
      },
    })
  }

  // Code copy buttons
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre')
      navigator.clipboard?.writeText(pre.textContent).then(() => {
        btn.textContent = 'Copied!'
        setTimeout(() => { btn.textContent = 'Copy' }, 2000)
      })
    })
  })

  // Copy link button
  const copyLinkBtn = document.getElementById('copy-link-btn')
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        const span = copyLinkBtn.querySelector('svg + *') || copyLinkBtn
        const original = copyLinkBtn.lastChild.textContent
        copyLinkBtn.lastChild.textContent = ' Copied!'
        setTimeout(() => { copyLinkBtn.lastChild.textContent = original }, 2000)
      })
    })
  }

  // Smooth scroll for TOC links
  document.querySelectorAll('.toc-list a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      const target = document.querySelector(a.getAttribute('href'))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
})

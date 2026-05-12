import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

/* ─── Lenis smooth scroll ─────────────────────────────────────────────────── */
export function initLenis() {
  const lenis = new Lenis({
    duration: 0.85,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

/* ─── Cursor ──────────────────────────────────────────────────────────────── */
export function initCursor() {
  const dot  = document.querySelector('.cursor-dot')
  const ring = document.querySelector('.cursor-ring')
  if (!dot || !ring) return

  const moveDot  = gsap.quickTo(dot,  'css', { duration: 0.08, ease: 'none' })
  const moveRing = gsap.quickTo(ring, 'css', { duration: 0.55, ease: 'power3.out' })

  window.addEventListener('mousemove', e => {
    moveDot( { x: e.clientX, y: e.clientY })
    moveRing({ x: e.clientX, y: e.clientY })
  })

  const bindHovers = () => {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(ring, { scale: 2.2, opacity: 0.3, duration: 0.3 })
        gsap.to(dot,  { scale: 0.5, duration: 0.3 })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.4 })
        gsap.to(dot,  { scale: 1, duration: 0.3 })
      })
    })
  }
  bindHovers()
}

/* ─── Magnetic hover ─────────────────────────────────────────────────────── */
export function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) * 0.28
      const dy = (e.clientY - r.top  - r.height / 2) * 0.28
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'expo.out' })
    })
  })
}

/* ─── Holographic card hover ─────────────────────────────────────────────── */
export function initHoloCards() {
  document.querySelectorAll('.holo-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect()
      const mx = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%'
      const my = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%'
      card.style.setProperty('--mx', mx)
      card.style.setProperty('--my', my)
      const dx = (e.clientX - r.left - r.width  / 2) / r.width  * 8
      const dy = (e.clientY - r.top  - r.height / 2) / r.height * 8
      gsap.to(card, { rotateX: -dy, rotateY: dx, transformPerspective: 800, duration: 0.4, ease: 'power2.out' })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'expo.out' })
    })
  })
}

/* ─── Nav scroll + mobile menu ────────────────────────────────────────────── */
export function initNav() {
  const nav = document.querySelector('.nav')
  if (!nav) return

  ScrollTrigger.create({
    start: 'top -60',
    onToggle: self => nav.classList.toggle('scrolled', self.isActive),
  })

  const path = window.location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop()
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active')
  })

  const hamburger = nav.querySelector('.nav-hamburger')
  if (!hamburger) return

  const mobileMenu = document.createElement('div')
  mobileMenu.className = 'nav-mobile'
  mobileMenu.innerHTML = `
    <a href="features.html">Protocol</a>
    <a href="pricing.html">Access</a>
    <a href="blog.html">Dispatch</a>
    <a href="docs.html">Docs</a>
    <a href="signin.html" style="color:var(--text-2)">Sign in</a>
    <a href="connect-wallet.html" class="btn-primary" style="margin-top:2rem;letter-spacing:.08em">Connect_Wallet</a>
  `
  document.body.appendChild(mobileMenu)

  const openMenu  = () => { hamburger.classList.add('open'); mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden' }
  const closeMenu = () => { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); document.body.style.overflow = '' }

  hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? closeMenu() : openMenu())
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu))
}

/* ─── Canvas particle network ─────────────────────────────────────────────── */
export function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const CYAN  = [0, 245, 212]
  const PINK  = [245, 0, 213]
  const DIST  = 130
  const COUNT = 38

  let W, H, particles = [], mouse = { x: -9999, y: -9999 }, frame = 0

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect()
    mouse.x = e.clientX - r.left
    mouse.y = e.clientY - r.top
  })
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999 })

  for (let i = 0; i < COUNT; i++) {
    const isPink = Math.random() < 0.2
    particles.push({
      x:  Math.random() * (W || 1200),
      y:  Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.8 + 0.8,
      col: isPink ? PINK : CYAN,
    })
  }

  const rgb = ([r,g,b], a) => `rgba(${r},${g},${b},${a})`

  let raf
  const draw = () => {
    raf = requestAnimationFrame(draw)
    // Throttle to ~30fps — skip odd frames
    if (++frame % 2 !== 0) return
    ctx.clearRect(0, 0, W, H)

    for (const p of particles) {
      // Mouse attraction (subtle)
      const mdx = mouse.x - p.x
      const mdy = mouse.y - p.y
      const md  = Math.sqrt(mdx * mdx + mdy * mdy)
      if (md < 180) {
        p.vx += (mdx / md) * 0.012
        p.vy += (mdy / md) * 0.012
      }
      // Speed cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (speed > 0.9) { p.vx *= 0.9 / speed; p.vy *= 0.9 / speed }

      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

      // Draw node — no shadowBlur (CPU path, very expensive)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = rgb(p.col, 0.9)
      ctx.fill()
    }

    // Connections (bounding-box fast reject before sqrt)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        if (Math.abs(dx) > DIST || Math.abs(dy) > DIST) continue
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < DIST) {
          const a   = (1 - d / DIST) * 0.35
          const col = particles[i].col
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = rgb(col, a)
          ctx.lineWidth   = 0.6
          ctx.stroke()
        }
      }
    }
  }
  draw()
  return () => cancelAnimationFrame(raf)
}

/* ─── Split text reveal ──────────────────────────────────────────────────── */
export function splitReveal(selector, opts = {}) {
  const { delay = 0, stagger = 0.04, y = 70, duration = 0.9 } = opts
  document.querySelectorAll(selector).forEach(el => {
    const split = new SplitType(el, { types: 'chars,words' })
    gsap.from(split.chars, {
      y, opacity: 0, duration, ease: 'expo.out', stagger,
      delay, scrollTrigger: opts.trigger !== false ? { trigger: el, start: 'top 88%' } : null,
    })
  })
}

/* ─── Fade up ─────────────────────────────────────────────────────────────── */
export function fadeUp(selector, opts = {}) {
  const { delay = 0, y = 30, duration = 0.8, start = 'top 88%' } = opts
  document.querySelectorAll(selector).forEach(el => {
    gsap.from(el, {
      y, opacity: 0, duration, ease: 'expo.out', delay,
      scrollTrigger: { trigger: el, start },
    })
  })
}

/* ─── Stagger cards ──────────────────────────────────────────────────────── */
export function staggerCards(selector, triggerSel, opts = {}) {
  const { stagger = 0.1, y = 40, duration = 0.85, start = 'top 82%' } = opts
  gsap.from(selector, {
    y, opacity: 0, duration, ease: 'expo.out', stagger,
    scrollTrigger: { trigger: triggerSel, start },
  })
}

/* ─── Count up ────────────────────────────────────────────────────────────── */
export function countUp(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const target = parseFloat(el.dataset.target || el.textContent)
    const suffix = el.dataset.suffix || ''
    const prefix = el.dataset.prefix || ''
    const dec    = el.dataset.dec ? parseInt(el.dataset.dec) : 0
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = prefix + this.targets()[0].val.toFixed(dec) + suffix },
        })
      },
    })
  })
}

/* ─── Glitch trigger on scroll ────────────────────────────────────────────── */
export function initGlitch(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.dataset.text = el.textContent
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        el.classList.add('active')
        setTimeout(() => el.classList.remove('active'), 600)
      },
    })
  })
}

/* ─── Accordion ───────────────────────────────────────────────────────────── */
export function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const body    = btn.nextElementSibling
      const isOpen  = btn.getAttribute('aria-expanded') === 'true'
      document.querySelectorAll('.accordion-trigger').forEach(b => {
        b.setAttribute('aria-expanded', 'false')
        b.nextElementSibling.style.maxHeight = '0'
      })
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true')
        body.style.maxHeight = body.scrollHeight + 'px'
      }
    })
  })
}

import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)
  gsap.config({ nullTargetWarn: false })

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lenis = new Lenis({
    duration: reducedMotion ? 0 : 0.9,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -7 * t)),
    smoothWheel: !reducedMotion,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const tickerFn = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  ScrollTrigger.defaults({ markers: false })

  document.documentElement.classList.add('lenis', 'lenis-smooth')

  const refresh = () => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      lenis?.resize()
    })
  }

  nuxtApp.hook('page:finish', refresh)
  nuxtApp.hook('app:mounted', refresh)

  requestAnimationFrame(refresh)

  return {
    provide: {
      lenis,
      gsap,
      ScrollTrigger,
    },
  }
})

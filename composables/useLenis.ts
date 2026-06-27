import Lenis from '@studio-freight/lenis'
import type { Ref } from 'vue'

interface UseLenisOptions {
  duration?: number
  smoothWheel?: boolean
  smoothTouch?: boolean
}

export function useLenis() {
  if (import.meta.server) return { lenis: ref<Lenis | null>(null), scrollTo: () => {}, stop: () => {}, start: () => {} }

  const { $lenis } = useNuxtApp()
  const lenis = ($lenis as Lenis | undefined) ?? null

  const scrollTo = (target: string | number | HTMLElement, opts: Record<string, unknown> = {}) => {
    lenis?.scrollTo(target, { offset: -80, duration: 1.2, ...opts })
  }

  const stop = () => lenis?.stop()
  const start = () => lenis?.start()

  return { lenis: ref(lenis), scrollTo, stop, start }
}

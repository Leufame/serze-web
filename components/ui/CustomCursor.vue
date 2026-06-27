<script setup lang="ts">
import { gsap } from 'gsap'

const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)

const enabled = ref(false)
let observer: MutationObserver | null = null
let onMove: ((e: MouseEvent) => void) | null = null
let onOver: ((e: Event) => void) | null = null
let onOut: ((e: Event) => void) | null = null

const attachHover = (el: Element) => {
  if (!el.hasAttribute('data-cursor-hover')) return
  el.addEventListener('mouseenter', onOver!)
  el.addEventListener('mouseleave', onOut!)
}

const scan = () => {
  if (!onOver || !onOut) return
  document.querySelectorAll<HTMLElement>('[data-cursor-hover]').forEach(attachHover)
}

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  enabled.value = true

  let dotX = -100
  let dotY = -100

  onMove = (e: MouseEvent) => {
    dotX = e.clientX
    dotY = e.clientY
    if (cursorDot.value) {
      cursorDot.value.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
    }
  }

  onOver = () => {
    cursorRing.value?.classList.add('is-hover')
    cursorDot.value?.classList.add('is-hover')
  }
  onOut = () => {
    cursorRing.value?.classList.remove('is-hover')
    cursorDot.value?.classList.remove('is-hover')
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  scan()

  observer = new MutationObserver(scan)
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  if (onMove) window.removeEventListener('mousemove', onMove)
  if (observer) observer.disconnect()
  document.querySelectorAll<HTMLElement>('[data-cursor-hover]').forEach((el) => {
    if (onOver) el.removeEventListener('mouseenter', onOver)
    if (onOut) el.removeEventListener('mouseleave', onOut)
  })
})
</script>

<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div ref="cursorDot" class="cursor__dot" />
    <div ref="cursorRing" class="cursor__ring" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.cursor {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: z('cursor');
}

.cursor__dot,
.cursor__ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  will-change: transform;
}

.cursor__dot {
  width: 6px;
  height: 6px;
  background: var(--cursor-color);
  border-radius: 50%;
  transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
  transition: width 0.25s $ease-ink, height 0.25s $ease-ink, opacity 0.25s $ease-ink, background $dur-slow $ease-ink;
  transition-delay: 0.05s;

  &.is-hover {
    width: 0;
    height: 0;
  }
}

.cursor__ring {
  width: 32px;
  height: 32px;
  border: 1px solid var(--cursor-color);
  border-radius: 50%;
  transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
  transition: width 0.35s $ease-ink, height 0.35s $ease-ink, border-color 0.35s $ease-ink, background 0.35s $ease-ink;
  background: transparent;

  &.is-hover {
    width: 60px;
    height: 60px;
    background: var(--cursor-hover-bg);
    border-color: var(--cursor-hover-border);
  }
}

@include reduce-motion {
  .cursor__dot,
  .cursor__ring {
    transition: none;
  }
}
</style>

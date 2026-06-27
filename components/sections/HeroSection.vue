<script setup lang="ts">
import { gsap } from 'gsap'

const heroRef = ref<HTMLElement | null>(null)
const kanjiRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const scrollHintRef = ref<HTMLElement | null>(null)
const titleLine1Ref = ref<HTMLElement | null>(null)
const titleLine2Ref = ref<HTMLElement | null>(null)

const { scrollTo } = useLenis()

const wrapChars = (el: HTMLElement | null) => {
  if (!el) return
  const text = el.textContent ?? ''
  el.innerHTML = text
    .split('')
    .map((char) => {
      if (char === ' ') return '<span class="ch ch--space">&nbsp;</span>'
      return `<span class="ch"><span class="ch__inner">${char}</span></span>`
    })
    .join('')
}

let introTl: gsap.core.Timeline | null = null
let parallaxTriggers: gsap.core.Tween[] = []

const playIntro = () => {
  introTl?.kill()
  parallaxTriggers.forEach((t) => t.kill())
  parallaxTriggers = []

  if (!heroRef.value) return

  wrapChars(titleLine1Ref.value)
  wrapChars(titleLine2Ref.value)

  introTl = gsap.timeline({ delay: 0.2 })

  introTl.from(eyebrowRef.value, {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
    .from(
      '.hero__title .ch__inner',
      {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        stagger: 0.04,
        ease: 'power4.out',
      },
      '-=0.6',
    )
    .from(
      kanjiRef.value,
      {
        opacity: 0,
        scale: 0.6,
        rotate: -8,
        duration: 1.6,
        ease: 'power3.out',
      },
      '-=1.0',
    )
    .from(
      subtitleRef.value,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.8',
    )
    .from(
      scrollHintRef.value,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5',
    )

  const kanjiTween = gsap.to('.hero__kanji', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  })
  const sceneTween = gsap.to('.hero__scene-wrap', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  })
  parallaxTriggers.push(kanjiTween, sceneTween)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  playIntro()
})

onBeforeUnmount(() => {
  introTl?.kill()
  parallaxTriggers.forEach((t) => t.kill())
})

const onScrollClick = () => scrollTo('#about')
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="hero"
    aria-label="序"
  >
    <div class="hero__scene-wrap">
      <ClientOnly>
        <HeroScene />
      </ClientOnly>
    </div>

    <div class="hero__content container--wide">
      <div ref="eyebrowRef" class="hero__eyebrow">
        <span class="numeral hero__year">二〇二六</span>
        <span class="hero__eyebrow-line" aria-hidden="true" />
        <span class="hero__eyebrow-text">Portfolio · 2026</span>
      </div>

      <h1 class="hero__title">
        <span ref="titleLine1Ref" class="hero__title-line">静寂を、</span>
        <span ref="titleLine2Ref" class="hero__title-line">かたちにする。</span>
      </h1>

      <p ref="subtitleRef" class="hero__subtitle">墨と余白と、静かな動き。</p>
    </div>

    <div ref="kanjiRef" class="hero__kanji" aria-hidden="true">
      <span>静</span>
    </div>

    <button
      ref="scrollHintRef"
      class="hero__scroll"
      data-cursor-hover
      aria-label="下へ"
      @click="onScrollClick"
    >
      <span class="hero__scroll-label">下へ</span>
      <span class="hero__scroll-line" aria-hidden="true" />
    </button>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  @include flex(row, center, flex-start, nowrap, 0);
  padding: $space-11 0 $space-9;
  overflow: hidden;
  isolation: isolate;
}

.hero__scene-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: $space-6;
  max-width: 1280px;
}

.hero__eyebrow {
  @include flex(row, center, flex-start, nowrap, $space-4);
  @include label;
  color: var(--color-grey-500);
}

.hero__year {
  font-size: $fs-sm;
}

.hero__eyebrow-line {
  width: 48px;
  height: 1px;
  background: var(--color-ink);
  display: inline-block;
}

.hero__eyebrow-text {
  letter-spacing: $ls-extra;
  text-transform: uppercase;
}

.hero__title {
  font-family: $font-display;
  font-weight: $fw-medium;
  font-size: clamp(2.75rem, 11vw, 9rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--color-ink);
  max-width: 14ch;
  user-select: none;
}

.hero__title-line {
  display: block;
  overflow: hidden;

  :deep(.ch) {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
  }

  :deep(.ch--space) {
    width: 0.4em;
  }

  :deep(.ch__inner) {
    display: inline-block;
    will-change: transform;
  }
}

.hero__subtitle {
  font-family: $font-display;
  font-weight: $fw-regular;
  font-size: clamp($fs-md, 1.6vw, $fs-lg);
  color: var(--color-grey-700);
  letter-spacing: $ls-wide;
  max-width: 32ch;
}

.hero__kanji {
  position: absolute;
  right: -$space-4;
  top: -8%;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  will-change: transform;

  span {
    font-family: $font-display;
    font-weight: $fw-medium;
    font-size: clamp(18rem, 45vw, 45rem);
    line-height: 1;
    color: var(--kanji-tint);
    display: block;
    transition: color $dur-slow $ease-ink;
  }
}

.hero__scroll {
  position: absolute;
  bottom: $space-7;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  @include flex(column, center, center, nowrap, $space-3);
  padding: $space-3 $space-4;
  color: var(--color-ink);
  background: transparent;
  transition: opacity $dur-quick $ease-ink, color $dur-slow $ease-ink;

  @include hover { opacity: 0.5; }
}

.hero__scroll-label {
  @include label;
  font-size: $fs-xs;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: $ls-extra;
}

.hero__scroll-line {
  width: 1px;
  height: 36px;
  background: var(--color-ink);
  position: relative;
  overflow: hidden;
  transition: background $dur-slow $ease-ink;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-paper);
    transform: translateY(-100%);
    animation: scroll-line 2.4s $ease-ink infinite;
  }
}

@keyframes scroll-line {
  0%   { transform: translateY(-100%); }
  50%  { transform: translateY(100%); }
  100% { transform: translateY(100%); }
}

@include reduce-motion {
  .hero__scroll-line::after { animation: none; }
}
</style>

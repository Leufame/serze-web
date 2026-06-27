<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)
const sealRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)

const bodyParagraphs = [
  '東京を拠点に、ブランディングとデジタルプロダクトの境界を渡り歩く。',
  '水墨画の「余白」と、茶道の「一期一会」を信条に、',
  '見る人の呼吸を止めることのないものづくりを志している。',
  '和の所作と現代の技術を、静かに結びつける。',
  'それが、Serze の仕事です。',
]

onMounted(() => {
  if (!sectionRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
      once: true,
    },
  })

  tl.from(sectionRef.value.querySelectorAll('.section-head__index, .section-head__sub, .section-head__title'), {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
  })
    .from(
      bodyRef.value?.querySelectorAll('p') ?? [],
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.4',
    )
    .from(
      sealRef.value,
      {
        scale: 0.4,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.8',
    )
    .from(
      imageRef.value,
      {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.4,
        ease: 'power4.out',
      },
      '-=1.2',
    )

  gsap.to(sealRef.value, {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  })
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="about section"
    aria-labelledby="about-title"
  >
    <div class="about__inner container--wide">
      <div class="about__head">
        <div class="section-head">
          <div class="section-head__index">
            <span class="numeral">壱</span>
            <span class="section-head__sub">自</span>
          </div>
          <h2 id="about-title" class="section-head__title">自己紹介</h2>
        </div>
      </div>

      <div class="about__body">
        <div class="about__text">
          <p class="about__lead">Serze と申します。デザインを嗜み、コードで形にします。</p>
          <div ref="bodyRef" class="about__paragraphs">
            <p v-for="(para, i) in bodyParagraphs" :key="i">{{ para }}</p>
          </div>

          <dl class="about__meta">
            <div class="about__meta-row">
              <dt class="about__meta-label">メール</dt>
              <dd class="about__meta-value">hello@serze.studio</dd>
            </div>
            <div class="about__meta-row">
              <dt class="about__meta-label">拠点</dt>
              <dd class="about__meta-value">東京 / Tokyo</dd>
            </div>
            <div class="about__meta-row">
              <dt class="about__meta-label">経験</dt>
              <dd class="about__meta-value">拾有余年</dd>
            </div>
          </dl>
        </div>

        <div class="about__visual">
          <div ref="imageRef" class="about__portrait">
            <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" class="about__portrait-svg">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.0"/>
                  <stop offset="40%" stop-color="#0a0a0a" stop-opacity="0.5"/>
                  <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.9"/>
                </linearGradient>
                <filter id="grain">
                  <feTurbulence baseFrequency="0.9" numOctaves="2" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                </filter>
              </defs>
              <rect width="200" height="240" fill="#ebe7df"/>
              <g filter="url(#grain)">
                <circle cx="100" cy="90" r="40" fill="#0a0a0a" opacity="0.9"/>
                <ellipse cx="100" cy="200" rx="68" ry="60" fill="#0a0a0a" opacity="0.85"/>
              </g>
              <rect width="200" height="240" fill="url(#g1)"/>
              <line x1="20" y1="220" x2="180" y2="220" stroke="#0a0a0a" stroke-width="0.5"/>
              <text x="20" y="232" font-family="serif" font-size="8" fill="#0a0a0a" letter-spacing="2">SERZE — 自</text>
            </svg>
          </div>

          <div ref="sealRef" class="about__seal-wrap" aria-hidden="true">
            <div class="about__seal">
              <span>印</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.about {
  position: relative;
  background: var(--color-paper);
  border-top: 1px solid var(--border-softer);
  transition: background-color $dur-slow $ease-ink, border-color $dur-slow $ease-ink;
}

.about__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;

  @include media-up(lg) {
    grid-template-columns: 1fr 1.4fr;
    gap: $space-9;
  }
}

.about__head {
  position: sticky;
  top: $space-9;
  align-self: start;

  @include media-down(lg) {
    position: static;
  }
}

.about__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-7;

  @include media-up(md) {
    grid-template-columns: 1.4fr 1fr;
    gap: $space-7;
  }
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.about__lead {
  font-family: $font-display;
  font-size: clamp($fs-lg, 2.4vw, $fs-xl);
  font-weight: $fw-medium;
  line-height: $lh-snug;
  color: var(--color-ink);
  letter-spacing: $ls-tight;
}

.about__paragraphs {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  max-width: 50ch;

  p {
    font-size: $fs-md;
    line-height: $lh-base;
    color: var(--color-grey-700);
    font-weight: $fw-regular;
  }
}

.about__meta {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  margin-top: $space-5;
  padding-top: $space-5;
  border-top: 1px solid var(--border-soft);
  transition: border-color $dur-slow $ease-ink;
}

.about__meta-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: $space-3;
  align-items: baseline;
}

.about__meta-label {
  @include label;
  color: var(--color-grey-500);
}

.about__meta-value {
  font-family: $font-display;
  font-size: $fs-sm;
  color: var(--color-ink);
}

.about__visual {
  position: relative;
  aspect-ratio: 5 / 6;
  display: flex;
  align-items: stretch;
}

.about__portrait {
  position: relative;
  width: 100%;
  background: var(--color-paper-warm);
  border: 1px solid var(--border-soft);
  overflow: hidden;
  transition: background-color $dur-slow $ease-ink, border-color $dur-slow $ease-ink;
}

.about__portrait-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.about__seal-wrap {
  position: absolute;
  bottom: $space-3;
  right: $space-3;
  z-index: 2;
  will-change: transform;
}

.about__seal {
  width: 72px;
  height: 72px;
  background: var(--color-seal-red);
  color: var(--color-paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-display;
  font-size: $fs-2xl;
  font-weight: $fw-bold;
  border-radius: 2px;
  transform: rotate(-6deg);
  box-shadow: var(--shadow-ink-2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: background-color $dur-slow $ease-ink, color $dur-slow $ease-ink, box-shadow $dur-slow $ease-ink;
}
</style>

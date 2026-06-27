<script setup lang="ts">
import { gsap } from 'gsap'

interface ServiceItem {
  num: string
  kanji: string
  title: string
  desc: string
}

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const services: ServiceItem[] = [
  { num: '壱', kanji: '意', title: 'ブランディング',   desc: '名前、姿、語調。一貫した物語を編む。' },
  { num: '弐', kanji: '形', title: 'UI / UX デザイン', desc: '和紙のような画面設計。触れる前から心地よい余白を。' },
  { num: '参', kanji: '匠', title: 'フロントエンド開発', desc: 'Vue / Nuxt / GSAP / Laravel。滑らかで静かな実装を。' },
  { num: '肆', kanji: '動', title: 'モーション設計',   desc: '動きは呼吸。余韻を残すアニメーションを。' },
  { num: '伍', kanji: '創', title: 'クリエイティブディレクション', desc: '視点を揃え、全体の呼吸を調律する。' },
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

  tl.from(sectionRef.value.querySelectorAll('.section-head__index, .section-head__sub, .section-head__title, .services__lead'), {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
  })

  const items = listRef.value?.querySelectorAll('.service-item') ?? []
  items.forEach((item) => {
    gsap.from(item, {
      y: 40,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        once: true,
      },
    })
  })
})
</script>

<template>
  <section
    id="services"
    ref="sectionRef"
    class="services section"
    aria-labelledby="services-title"
  >
    <div class="services__inner container--wide">
      <div class="services__head">
        <div class="section-head">
          <div class="section-head__index">
            <span class="numeral">弐</span>
            <span class="section-head__sub">業</span>
          </div>
          <h2 id="services-title" class="section-head__title">仕事</h2>
          <p class="services__lead">五つの技。</p>
        </div>
      </div>

      <ol ref="listRef" class="services__list">
        <li
          v-for="(item, i) in services"
          :key="i"
          class="service-item"
          data-cursor-hover
        >
          <div class="service-item__index">
            <span class="numeral service-item__num">{{ item.num }}</span>
            <span class="service-item__kanji" aria-hidden="true">{{ item.kanji }}</span>
          </div>

          <div class="service-item__body">
            <h3 class="service-item__title">{{ item.title }}</h3>
            <p class="service-item__desc">{{ item.desc }}</p>
          </div>

          <div class="service-item__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.services {
  position: relative;
  background: var(--color-paper);
  border-top: 1px solid var(--border-softer);
  transition: background-color $dur-slow $ease-ink, border-color $dur-slow $ease-ink;
}

.services__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;

  @include media-up(lg) {
    grid-template-columns: 0.8fr 1.4fr;
    gap: $space-9;
    align-items: start;
  }
}

.services__head {
  @include media-up(lg) {
    position: sticky;
    top: $space-9;
  }
}

.services__lead {
  font-family: $font-display;
  font-size: $fs-lg;
  color: var(--color-grey-700);
  margin-top: $space-3;
  max-width: 24ch;
}

.services__list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.service-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: $space-5;
  align-items: center;
  padding: $space-6 0;
  border-top: 1px solid var(--border-soft);
  cursor: pointer;
  transition: opacity $dur-quick $ease-ink, padding $dur-base $ease-ink, border-color $dur-slow $ease-ink;

  @include media-up(md) {
    padding: $space-7 0;
  }

  &:last-child {
    border-bottom: 1px solid var(--border-soft);
  }

  @include hover {
    padding-left: $space-4;
    padding-right: $space-4;

    .service-item__arrow {
      transform: translateX(8px);
      color: var(--color-ink);
    }

    .service-item__kanji {
      color: var(--color-ink);
    }
  }
}

.service-item__index {
  @include flex(row, center, flex-start, nowrap, $space-3);
  min-width: 120px;

  @include media-up(md) {
    min-width: 160px;
  }
}

.service-item__num {
  font-size: $fs-sm;
  color: var(--color-grey-500);
  letter-spacing: $ls-extra;
}

.service-item__kanji {
  font-family: $font-display;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: $fw-medium;
  color: var(--color-grey-300);
  line-height: 1;
  transition: color $dur-base $ease-ink;
}

.service-item__body {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.service-item__title {
  font-family: $font-display;
  font-size: clamp($fs-lg, 2.4vw, $fs-xl);
  font-weight: $fw-medium;
  color: var(--color-ink);
  letter-spacing: $ls-tight;
  line-height: $lh-snug;
}

.service-item__desc {
  font-size: $fs-base;
  color: var(--color-grey-700);
  max-width: 48ch;
  line-height: $lh-base;
}

.service-item__arrow {
  width: 32px;
  height: 32px;
  color: var(--color-grey-300);
  transition: transform $dur-base $ease-ink, color $dur-base $ease-ink;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>

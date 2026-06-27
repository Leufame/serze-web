<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner container--wide">
      <div class="site-footer__col site-footer__col--mark">
        <div class="site-footer__seal" aria-hidden="true">
          <span>Serze</span>
        </div>
        <p class="site-footer__signature">Serze</p>
      </div>

      <div class="site-footer__col site-footer__col--links">
        <h3 class="site-footer__heading">自 / 業</h3>
        <ul class="site-footer__list">
          <li><a href="#about" data-cursor-hover>自</a></li>
          <li><a href="#services" data-cursor-hover>業</a></li>
          <li><a href="#contact" data-cursor-hover>縁</a></li>
        </ul>
      </div>

      <div class="site-footer__col site-footer__col--contact">
        <h3 class="site-footer__heading">ご縁</h3>
        <a class="site-footer__email" href="mailto:hello@serze.studio" data-cursor-hover>
          hello@serze.studio
        </a>
      </div>

      <div class="site-footer__col site-footer__col--meta">
        <p class="site-footer__meta-line">
          <span class="numeral">©</span> {{ year }} All rights reserved.
        </p>
        <p class="site-footer__meta-line site-footer__made">
          東京で、静かに
        </p>
      </div>
    </div>

    <div class="site-footer__kanji" aria-hidden="true">静</div>
  </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.site-footer {
  position: relative;
  padding: $space-9 0 $space-7;
  border-top: 1px solid var(--border-soft);
  background: var(--color-paper);
  overflow: hidden;
  transition: background-color $dur-slow $ease-ink, border-color $dur-slow $ease-ink;
}

.site-footer__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-7;
  position: relative;
  z-index: 2;

  @include media-up(md) {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: $space-6;
  }
}

.site-footer__col {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.site-footer__seal {
  width: 56px;
  height: 56px;
  background: var(--color-seal-red);
  color: var(--color-paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-display;
  font-size: $fs-xs;
  font-weight: $fw-bold;
  letter-spacing: $ls-wide;
  border-radius: 2px;
  transform: rotate(-3deg);
  box-shadow: var(--shadow-ink-2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: background-color $dur-slow $ease-ink, color $dur-slow $ease-ink, box-shadow $dur-slow $ease-ink;
}

.site-footer__signature {
  font-family: $font-display;
  font-size: $fs-md;
  font-weight: $fw-medium;
  color: var(--color-ink);
}

.site-footer__heading {
  @include label;
  color: var(--color-grey-500);
  margin-bottom: $space-2;
}

.site-footer__list {
  display: flex;
  flex-direction: column;
  gap: $space-2;

  a {
    font-size: $fs-sm;
    color: var(--color-ink);
    transition: opacity $dur-quick $ease-ink;

    @include hover { opacity: 0.5; }
  }
}

.site-footer__email {
  font-family: $font-display;
  font-size: $fs-md;
  color: var(--color-ink);
  position: relative;
  display: inline-block;
  transition: opacity $dur-quick $ease-ink, color $dur-slow $ease-ink;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0.4);
    transform-origin: left;
    transition: transform $dur-base $ease-ink;
  }

  @include hover {
    opacity: 0.7;
    &::after { transform: scaleX(1); }
  }
}

.site-footer__meta-line {
  font-size: $fs-xs;
  color: var(--color-grey-500);
  letter-spacing: $ls-wide;

  .numeral {
    margin-right: $space-1;
  }
}

.site-footer__made {
  margin-top: $space-1;
  font-style: italic;
  font-family: $font-display;
}

.site-footer__kanji {
  position: absolute;
  right: -$space-4;
  bottom: -$space-9;
  font-family: $font-display;
  font-size: clamp(8rem, 22vw, 18rem);
  font-weight: $fw-medium;
  color: var(--kanji-tint);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  transition: color $dur-slow $ease-ink;
}
</style>

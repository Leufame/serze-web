<script setup lang="ts">
const links = [
  { id: 'hero',     label: '序' },
  { id: 'about',    label: '自' },
  { id: 'services', label: '業' },
  { id: 'contact',  label: '縁' },
]

const scrolled = ref(false)
const mobileOpen = ref(false)

const { scrollTo } = useLenis()

const onScroll = () => {
  scrolled.value = window.scrollY > 60
}

const onNav = (id: string) => {
  mobileOpen.value = false
  const target = document.getElementById(id)
  if (target) scrollTo(target)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'is-open': mobileOpen }">
    <a href="#hero" class="site-header__brand" data-cursor-hover @click.prevent="onNav('hero')">
      <span class="site-header__mark" aria-hidden="true">墨</span>
      <span class="site-header__name">Serze</span>
    </a>

    <nav class="site-header__nav" aria-label="本文">
      <ul class="site-header__list">
        <li v-for="link in links" :key="link.id" class="site-header__item">
          <a
            :href="`#${link.id}`"
            class="site-header__link"
            data-cursor-hover
            @click.prevent="onNav(link.id)"
          >
            <span class="numeral site-header__index">{{ link.label }}</span>
            <span class="site-header__dot" />
          </a>
        </li>
      </ul>
    </nav>

    <div class="site-header__right">
      <ThemeToggle />
      <button
        class="site-header__burger"
        :aria-expanded="mobileOpen"
        aria-label="メニュー"
        data-cursor-hover
        @click="mobileOpen = !mobileOpen"
      >
        <span /><span />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: z('header');
  @include flex(row, center, space-between, nowrap, $space-5);
  padding: $space-4 $gutter-mobile;
  background: transparent;
  transition: background $dur-base $ease-ink, padding $dur-base $ease-ink, border-color $dur-base $ease-ink;
  border-bottom: 1px solid transparent;

  @include media-up(md) {
    padding: $space-5 $gutter-tablet;
  }

  @include media-up(lg) {
    padding: $space-5 $gutter-desktop;
  }

  &.is-scrolled {
    background: var(--header-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: var(--border-soft);
  }
}

.site-header__brand {
  display: inline-flex;
  align-items: baseline;
  gap: $space-3;
  font-family: $font-display;
  font-size: $fs-md;
  font-weight: $fw-semibold;
  letter-spacing: $ls-wide;
  color: var(--color-ink);
  transition: opacity $dur-quick $ease-ink;

  @include hover { opacity: 0.6; }
}

.site-header__mark {
  font-family: $font-display;
  font-size: $fs-xl;
  line-height: 1;
  color: var(--color-ink);
  position: relative;
  top: 2px;
}

.site-header__name {
  font-size: $fs-sm;
  letter-spacing: $ls-extra;
  text-transform: uppercase;
}

.site-header__nav {
  display: none;

  @include media-up(lg) {
    display: block;
    flex: 1;
    max-width: 480px;
  }
}

.site-header__list {
  @include flex(row, center, center, nowrap, $space-6);
}

.site-header__link {
  @include flex(row, center, center, nowrap, $space-2);
  padding: $space-2 $space-3;
  color: var(--color-ink);
  transition: opacity $dur-quick $ease-ink;

  @include hover { opacity: 0.5; }
}

.site-header__index {
  font-size: $fs-xs;
  letter-spacing: $ls-extra;
  color: var(--color-grey-500);
}

.site-header__dot {
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 50%;
}

.site-header__right {
  @include flex(row, center, center, nowrap, $space-3);
}

.site-header__burger {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 0;
  position: relative;

  @include media-up(lg) { display: none; }

  span {
    display: block;
    width: 22px;
    height: 1px;
    background: var(--color-ink);
    transition: transform $dur-quick $ease-ink, opacity $dur-quick $ease-ink;
  }
}

.is-open .site-header__burger {
  span:first-child { transform: translateY(3px) rotate(45deg); }
  span:last-child  { transform: translateY(-3px) rotate(-45deg); }
}
</style>

<template>
  <div class="app">
    <a class="skip-link" href="#main">本文へスキップ</a>

    <CustomCursor />
    <NoiseOverlay />

    <SiteHeader />

    <main id="main" class="app__main">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;
.app {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  background: var(--color-paper);
  color: var(--color-ink);
  isolation: isolate;
  transition: background-color $dur-slow $ease-ink, color $dur-slow $ease-ink;
}

.app__main {
  position: relative;
  z-index: z('base');
}

.skip-link {
  position: fixed;
  top: $space-3;
  left: $space-3;
  z-index: z('modal');
  padding: $space-2 $space-4;
  background: var(--color-ink);
  color: var(--color-paper);
  font-size: $fs-sm;
  border-radius: 2px;
  transform: translateY(-200%);
  transition: transform $dur-quick $ease-ink;

  &:focus {
    transform: translateY(0);
  }
}
</style>

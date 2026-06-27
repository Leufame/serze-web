<template>
  <div class="noise" aria-hidden="true" />
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;

.noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: z('overlay');
  opacity: var(--noise-opacity);
  mix-blend-mode: var(--noise-blend);
  background-image: url('/textures/paper-grain.svg');
  background-size: 240px 240px;
  transition: opacity $dur-slow $ease-ink, mix-blend-mode $dur-slow $ease-ink;
}
</style>

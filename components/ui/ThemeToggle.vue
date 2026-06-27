<script setup lang="ts">
const { theme, setTheme } = useTheme()
const current = computed(() => theme.value)
</script>

<template>
  <div class="theme-toggle" role="group" aria-label="テーマ">
    <button
      class="theme-toggle__btn"
      :class="{ 'is-active': current === 'light' }"
      :aria-pressed="current === 'light'"
      :tabindex="current === 'light' ? -1 : 0"
      type="button"
      data-cursor-hover
      @click="setTheme('light')"
    >
      <span class="theme-toggle__kanji" aria-hidden="true">白</span>
    </button>
    <span class="theme-toggle__divider" aria-hidden="true">／</span>
    <button
      class="theme-toggle__btn"
      :class="{ 'is-active': current === 'dark' }"
      :aria-pressed="current === 'dark'"
      :tabindex="current === 'dark' ? -1 : 0"
      type="button"
      data-cursor-hover
      @click="setTheme('dark')"
    >
      <span class="theme-toggle__kanji" aria-hidden="true">黒</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: $space-2 $space-3;
  border: 1px solid var(--color-ink);
  background: transparent;
  position: relative;
  z-index: 2;
  transition: border-color $dur-quick $ease-ink;
}

.theme-toggle__btn {
  @include label;
  font-family: $font-display;
  font-size: $fs-sm;
  letter-spacing: $ls-wide;
  color: var(--color-grey-500);
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color $dur-quick $ease-ink, transform $dur-quick $ease-ink;
  line-height: 1;
  position: relative;
}

.theme-toggle__kanji {
  display: inline-block;
  font-weight: $fw-medium;
}

.theme-toggle__btn.is-active {
  color: var(--color-ink);
  pointer-events: none;
}

.theme-toggle__btn:not(.is-active):hover {
  color: var(--color-grey-300);
}

.theme-toggle__btn:active {
  transform: scale(0.94);
}

.theme-toggle__divider {
  font-size: $fs-xs;
  color: var(--color-grey-300);
  line-height: 1;
  user-select: none;
  pointer-events: none;
}
</style>

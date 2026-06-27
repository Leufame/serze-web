<script setup lang="ts">
useHead({
  title: 'Serze — 墨と静けさのポートフォリオ',
  htmlAttrs: { lang: 'ja' },
  meta: [
    {
      name: 'description',
      content: 'Serzeのポートフォリオ。静寂をデザインする、デザイナー兼開発者。',
    },
    { property: 'og:title', content: 'Serze — 墨と静寂' },
    {
      property: 'og:description',
      content: 'Serzeのポートフォリオ。静寂をデザインする、デザイナー兼開発者。',
    },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<template>
  <div class="page">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ContactSection />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;
.page {
  position: relative;
}
</style>

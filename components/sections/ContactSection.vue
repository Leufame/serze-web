<script setup lang="ts">
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref<'idle' | 'submitting' | 'success'>('idle')

const submit = async (e: Event) => {
  e.preventDefault()
  if (status.value === 'submitting') return
  status.value = 'submitting'
  await new Promise((r) => setTimeout(r, 900))
  status.value = 'success'
  form.name = ''
  form.email = ''
  form.message = ''
  setTimeout(() => (status.value = 'idle'), 4000)
}

onMounted(() => {
  if (!sectionRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
      once: true,
    },
  })

  tl.from(sectionRef.value.querySelectorAll('.section-head__index, .section-head__sub, .section-head__title, .contact__lead, .contact__body'), {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
  })
    .from(
      sectionRef.value.querySelectorAll('.contact__email-block, .contact__socials, .contact__form'),
      {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
      },
      '-=0.4',
    )
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="contact section"
    aria-labelledby="contact-title"
  >
    <div class="contact__inner container--wide">
      <div class="contact__head">
        <div class="section-head">
          <div class="section-head__index">
            <span class="numeral">参</span>
            <span class="section-head__sub">縁</span>
          </div>
          <h2 id="contact-title" class="section-head__title">ご縁</h2>
          <p class="contact__lead">ご一緒しましょう。</p>
          <p class="contact__body">新しい仕事、対話、茶。一期一会を、心より。</p>
        </div>
      </div>

      <div class="contact__right">
        <div class="contact__email-block">
          <span class="contact__label">メール</span>
          <a class="contact__email" href="mailto:hello@serze.studio" data-cursor-hover>
            hello@serze.studio
          </a>
        </div>

        <div class="contact__socials">
          <span class="contact__label">他で</span>
          <ul class="contact__social-list">
            <li><a href="#" target="_blank" rel="noopener" data-cursor-hover>X</a></li>
            <li><a href="#" target="_blank" rel="noopener" data-cursor-hover>GitHub</a></li>
            <li><a href="#" target="_blank" rel="noopener" data-cursor-hover>Instagram</a></li>
            <li><a href="#" target="_blank" rel="noopener" data-cursor-hover>note</a></li>
          </ul>
        </div>

        <form class="contact__form" @submit="submit">
          <div class="field">
            <label for="contact-name" class="field__label">お名前</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="field__input"
              placeholder="山田 太郎"
              required
            >
          </div>

          <div class="field">
            <label for="contact-email" class="field__label">ご連絡先</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="field__input"
              placeholder="taro@example.com"
              required
            >
          </div>

          <div class="field">
            <label for="contact-message" class="field__label">内容</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="field__input field__input--area"
              placeholder="ご用件をお書きください"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            class="contact__submit"
            data-cursor-hover
            :disabled="status === 'submitting'"
          >
            <span class="contact__submit-text">
              <span v-if="status === 'submitting'">送信中…</span>
              <span v-else>送る</span>
            </span>
            <span class="contact__submit-arrow" aria-hidden="true">→</span>
          </button>

          <Transition name="status">
            <p
              v-if="status === 'success'"
              class="contact__status contact__status--success"
            >
              ありがとうございました。
            </p>
          </Transition>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;
@use '~/assets/styles/abstracts/mixins' as *;

.contact {
  position: relative;
  background: var(--color-paper);
  border-top: 1px solid var(--border-softer);
  padding-bottom: $space-10;
  transition: background-color $dur-slow $ease-ink, border-color $dur-slow $ease-ink;
}

.contact__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;

  @include media-up(lg) {
    grid-template-columns: 0.9fr 1.4fr;
    gap: $space-9;
    align-items: start;
  }
}

.contact__head {
  @include media-up(lg) {
    position: sticky;
    top: $space-9;
  }
}

.contact__lead {
  font-family: $font-display;
  font-size: clamp($fs-lg, 2.4vw, $fs-xl);
  font-weight: $fw-medium;
  color: var(--color-ink);
  margin-top: $space-3;
  max-width: 18ch;
  line-height: $lh-snug;
}

.contact__body {
  font-size: $fs-md;
  color: var(--color-grey-700);
  max-width: 36ch;
  margin-top: $space-3;
}

.contact__right {
  display: flex;
  flex-direction: column;
  gap: $space-7;
}

.contact__label {
  @include label;
  color: var(--color-grey-500);
  display: block;
  margin-bottom: $space-3;
}

.contact__email-block {
  padding-bottom: $space-6;
  border-bottom: 1px solid var(--border-soft);
  transition: border-color $dur-slow $ease-ink;
}

.contact__email {
  display: inline-block;
  font-family: $font-display;
  font-size: clamp($fs-xl, 3vw, $fs-2xl);
  font-weight: $fw-medium;
  color: var(--color-ink);
  position: relative;
  letter-spacing: $ls-tight;
  transition: opacity $dur-quick $ease-ink, color $dur-slow $ease-ink;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
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

.contact__social-list {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;

  a {
    padding: $space-2 $space-4;
    border: 1px solid var(--color-ink);
    font-family: $font-display;
    font-size: $fs-sm;
    color: var(--color-ink);
    transition: background $dur-quick $ease-ink, color $dur-quick $ease-ink;

    @include hover {
      background: var(--color-ink);
      color: var(--color-paper);
    }
  }
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  padding-top: $space-6;
  border-top: 1px solid var(--border-soft);
  transition: border-color $dur-slow $ease-ink;
}

.field {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.field__label {
  @include label;
  color: var(--color-grey-500);
}

.field__input {
  width: 100%;
  padding: $space-3 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-ink);
  font-family: $font-display;
  font-size: $fs-md;
  color: var(--color-ink);
  transition: border-color $dur-quick $ease-ink, padding $dur-base $ease-ink, color $dur-slow $ease-ink;

  &::placeholder {
    color: var(--color-grey-300);
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-bottom-color: var(--color-seal-red);
    padding-left: $space-2;
  }

  &--area {
    resize: vertical;
    min-height: 96px;
    line-height: $lh-base;
  }
}

.contact__submit {
  @include flex(row, center, space-between, nowrap, $space-3);
  align-self: flex-start;
  margin-top: $space-3;
  padding: $space-3 $space-5;
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: $font-display;
  font-size: $fs-md;
  font-weight: $fw-medium;
  letter-spacing: $ls-wide;
  border: 1px solid var(--color-ink);
  transition: background $dur-quick $ease-ink, color $dur-quick $ease-ink, padding $dur-base $ease-ink;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @include hover {
    background: transparent;
    color: var(--color-ink);
    padding-right: $space-7;

    .contact__submit-arrow {
      transform: translateX(4px);
    }
  }
}

.contact__submit-arrow {
  display: inline-block;
  transition: transform $dur-base $ease-ink;
}

.contact__status {
  @include label;
  margin-top: $space-2;

  &--success { color: var(--color-ink); }
}

.status-enter-active,
.status-leave-active {
  transition: opacity $dur-base $ease-ink, transform $dur-base $ease-ink;
}

.status-enter-from,
.status-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>

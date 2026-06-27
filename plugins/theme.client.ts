export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const { init, theme, setTheme } = useTheme()
  init()

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  mql.addEventListener?.('change', (e) => {
    let stored: string | null = null
    try { stored = localStorage.getItem('serze_theme') } catch { /* noop */ }
    if (stored === 'dark' || stored === 'light') return
    setTheme(e.matches ? 'dark' : 'light')
  })

  watch(theme, (next) => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = next === 'dark' ? '#0a0a0a' : '#f5f3ee'
  })
})

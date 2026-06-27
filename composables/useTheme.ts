export type ThemeName = 'light' | 'dark'

const COOKIE_KEY = 'serze_theme'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const isTheme = (v: unknown): v is ThemeName => v === 'light' || v === 'dark'

export function useTheme() {
  const themeCookie = useCookie<ThemeName | null>(COOKIE_KEY, {
    default: () => null,
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
  })

  const theme = useState<ThemeName>('serze-theme', () => themeCookie.value ?? 'light')

  const apply = (next: ThemeName) => {
    if (import.meta.server) return
    document.documentElement.dataset.theme = next
    themeCookie.value = next
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) {
      meta.content = next === 'dark' ? '#0a0a0a' : '#f5f3ee'
    }
  }

  const setTheme = (next: ThemeName) => {
    theme.value = next
    apply(next)
  }

  const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')

  const init = () => {
    if (import.meta.server) return
    let initial: ThemeName = themeCookie.value ?? 'light'
    if (!isTheme(initial)) {
      try {
        const stored = localStorage.getItem(COOKIE_KEY)
        if (isTheme(stored)) {
          initial = stored
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          initial = 'dark'
        }
      } catch { /* noop */ }
    }
    theme.value = initial
    apply(initial)
  }

  return { theme, setTheme, toggle, init }
}

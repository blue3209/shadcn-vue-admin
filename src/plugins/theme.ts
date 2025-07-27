import { useColorMode } from '@vueuse/core'
import { useThemeStore } from '@/stores/theme'
import { THEMES } from '@/stores/theme'

// 字体映射函数
function getFontFamily(font: string) {
  switch (font) {
    case 'inter':
      return 'Inter, system-ui, sans-serif'
    case 'manrope':
      return 'Manrope, system-ui, sans-serif'
    case 'system':
      return 'system-ui, sans-serif'
    default:
      return 'Inter, system-ui, sans-serif'
  }
}

// 加载字体
function loadFonts() {
  // 加载 Inter 字体
  const interLink = document.createElement('link')
  interLink.rel = 'stylesheet'
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  document.head.appendChild(interLink)

  // 加载 Manrope 字体
  const manropeLink = document.createElement('link')
  manropeLink.rel = 'stylesheet'
  manropeLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap'
  document.head.appendChild(manropeLink)
}

export function setupTheme() {
  // 加载字体
  loadFonts()

  // 初始化亮暗模式
  useColorMode({
    storage: localStorage,
    storageKey: 'vue-color-mode',
  })

  // 初始化颜色主题
  const themeStore = useThemeStore()
  
  // 确保在客户端环境下执行
  if (typeof window !== 'undefined') {
    // 应用保存的颜色主题
    const savedTheme = themeStore.theme
    document.documentElement.classList.remove(...THEMES.map(theme => `theme-${theme}`))
    document.documentElement.classList.add(`theme-${savedTheme}`)

    // 应用保存的字体
    const savedFont = localStorage.getItem('app-font') || 'inter'
    document.documentElement.style.fontFamily = getFontFamily(savedFont)
  }
} 
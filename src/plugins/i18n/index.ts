import type { App } from 'vue'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

import en from './en.json'
import zh from './zh.json'

export function setupI18n(app: App) {
  // 从 localStorage 获取保存的语言设置，默认为英文
  const savedLocale = localStorage.getItem('app-locale') || 'en'
  
  const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages: {
      zh,
      en,
    },
  })
  
  app.use(i18n)
  
  // 监听语言变化并保存到 localStorage
  watch(() => i18n.global.locale.value, (newLocale) => {
    localStorage.setItem('app-locale', newLocale)
  })
}

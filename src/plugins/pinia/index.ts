import type { App } from 'vue'

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

export function setupPinia(app: App) {
  const persistedState = createPersistedState({
    storage: localStorage, // 改为 localStorage 确保数据持久化
  })

  pinia.use(persistedState)
  app.use(pinia)
}

export default pinia

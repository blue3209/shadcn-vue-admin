<script setup lang="ts">
import Loading from '@/components/loading.vue'
import { Toaster } from '@/components/ui/sonner'
import { useThemeStore } from '@/stores/theme'
import { THEMES } from '@/stores/theme'

// 初始化主题
const themeStore = useThemeStore()

onMounted(() => {
  // 确保页面加载时应用保存的主题
  const savedTheme = themeStore.theme
  document.documentElement.classList.remove(...THEMES.map(theme => `theme-${theme}`))
  document.documentElement.classList.add(`theme-${savedTheme}`)
})
</script>

<template>
  <div class="h-screen min-h-0">
    <Toaster />
    <Suspense>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>

      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

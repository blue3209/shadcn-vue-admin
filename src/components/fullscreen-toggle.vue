<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Maximize, Minimize } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const isFullscreen = ref(false)

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen()
  } else {
    await document.exitFullscreen()
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  // 初始化状态
  isFullscreen.value = !!document.fullscreenElement
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <UiButton variant="ghost" size="icon" class="relative rounded-full" @click="toggleFullscreen" >
          <Maximize v-if="!isFullscreen" class="h-4 w-4" />
          <Minimize v-else class="h-4 w-4" />
          <span class="sr-only">{{ isFullscreen ? $t('common.exitFullscreen') : $t('common.enterFullscreen') }}</span>
        </UiButton>
      </TooltipTrigger>
      <TooltipContent side="bottom" :key="isFullscreen ? 'fullscreen' : 'normal'">
        <p>{{ isFullscreen ? $t('common.exitFullscreen') : $t('common.enterFullscreen') }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
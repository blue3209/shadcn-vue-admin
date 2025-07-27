<script lang="ts" setup>
import { ref } from 'vue'
import { Paintbrush } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import CustomColor from './custom-color.vue'
import CustomRadius from './custom-radius.vue'
import CustomThemeTitle from './custom-theme-title.vue'
import ToggleColorMode from './toggle-color-mode.vue'

const open = ref(false)
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const handleMouseEnter = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
  open.value = true
}

const handleMouseLeave = () => {
  hoverTimeout = setTimeout(() => {
    open.value = false
  }, 150) // 150ms 延迟，避免鼠标快速移动时闪烁
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <Button variant="ghost" size="icon" class="relative rounded-full" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <Paintbrush />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <CustomThemeTitle />
      <CustomColor />
      <CustomRadius />
      <ToggleColorMode />
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>

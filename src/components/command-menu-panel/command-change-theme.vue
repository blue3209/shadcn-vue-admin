<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Moon, Sun, SunMoon } from 'lucide-vue-next'

import CommandItemHasIcon from './command-item-has-icon.vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const mode = useColorMode()

function changeTheme(newMode: 'light' | 'dark' | 'auto') {
  mode.value = newMode
  emit('click')
}
</script>

<template>
  <UiCommandGroup :heading="$t('common.theme')">
    <UiCommandItem value="light" @click="changeTheme('light')">
      <CommandItemHasIcon :name="$t('common.light')" :icon="Sun" />
    </UiCommandItem>
    <UiCommandItem value="dark" @click="changeTheme('dark')">
      <CommandItemHasIcon :name="$t('common.dark')" :icon="Moon" />
    </UiCommandItem>
    <UiCommandItem value="system" @click="changeTheme('auto')">
      <CommandItemHasIcon :name="$t('common.system')" :icon="SunMoon" />
    </UiCommandItem>
  </UiCommandGroup>
</template>

<style scoped>
</style>

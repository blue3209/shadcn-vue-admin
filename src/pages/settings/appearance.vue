<script setup lang="ts">
import AppearanceForm from './components/appearance-form.vue'
import SettingsLayout from './components/settings-layout.vue'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'SettingsAppearancePage'
})
</script>

<template>
  <div class="space-y-6">
    <SettingsLayout>
      <AppearanceForm />
    </SettingsLayout>
  </div>
</template>

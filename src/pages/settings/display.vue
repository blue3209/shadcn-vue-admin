<script setup lang="ts">
import DisplayForm from './components/display-form.vue'
import SettingsLayout from './components/settings-layout.vue'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'SettingsDisplayPage'
})
</script>

<template>
  <SettingsLayout>
    <DisplayForm />
  </SettingsLayout>
</template>

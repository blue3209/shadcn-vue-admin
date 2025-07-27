<script setup lang="ts">
import ProfileForm from './components/profile-form.vue'
import SettingsLayout from './components/settings-layout.vue'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'SettingsPage'
})
</script>

<template>
  <SettingsLayout>
    <ProfileForm />
  </SettingsLayout>
</template>

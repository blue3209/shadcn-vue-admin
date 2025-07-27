<script setup lang="ts">
import AccountForm from './components/account-form.vue'
import SettingsLayout from './components/settings-layout.vue'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'SettingsAccountPage'
})
</script>

<template>
  <SettingsLayout>
    <AccountForm />
  </SettingsLayout>
</template>

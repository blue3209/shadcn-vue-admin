<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <UiButton variant="link" class="text-muted-foreground" @click="$router.push('/auth/forgot-password')">
    {{ t('auth.forgotPassword') }}
  </UiButton>
</template>

<style scoped>

</style>

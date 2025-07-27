<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <UiButton variant="link" class="px-0 font-normal underline text-muted-foreground">
    {{ t('auth.privacyPolicy') }}
  </UiButton>
</template>

<style scoped>

</style>

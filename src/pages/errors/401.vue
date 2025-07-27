<script setup lang="ts">
import Error from '@/components/custom-error.vue'
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      :code="401"
      :subtitle="$t('common.unauthorized')"
      :error="$t('common.unauthorizedMessage')"
    />
  </div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: blank
</route>

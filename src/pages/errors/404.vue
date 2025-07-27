<script setup lang="ts">
import Error from '@/components/custom-error.vue'
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      :code="404"
      :subtitle="$t('common.notFound')"
      :error="$t('common.notFoundMessage')"
    />
  </div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: blank
  </route>

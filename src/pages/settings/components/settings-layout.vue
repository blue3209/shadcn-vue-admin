<script setup lang="ts">
import Page from '@/components/global-layout/basic-page.vue'

import SettingsAside from './settings-aside.vue'
</script>

<template>
  <Page
    title="Settings"
    description="Manage your store settings."
  >
    <main class="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 w-full max-w-none">
      <SettingsAside />

      <section class="w-full">
        <slot />
      </section>
    </main>
  </Page>
</template>

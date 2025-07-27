<script lang="ts" setup>
import Page from '@/components/global-layout/basic-page.vue'

import BillingHistory from './components/billing-history/index.vue'
import BillingPlan from './components/billing-plan/index.vue'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'BillingPage'
})
</script>

<template>
  <Page
    title="Plans & Billing"
    description="Manage your plan and billing history here."
  >
    <BillingPlan />
    <BillingHistory class="mt-2" />
  </Page>
</template>

<style>

</style>

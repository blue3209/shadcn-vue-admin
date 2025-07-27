<script lang="ts" setup>
import { toast } from 'vue-sonner'

import Page from '@/components/global-layout/basic-page.vue'
import { Button } from '@/components/ui/button'
import OverviewContent from './components/overview-content.vue'
import DateRangePicker from './components/date-range-picker.vue'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'DashboardPage'
})

const tabs = ref([
  { name: 'common.overview', value: 'overview' },
  { name: 'common.analytics', value: 'analytics', disabled: true },
  { name: 'common.reports', value: 'reports', disabled: true },
  { name: 'common.notifications', value: 'notifications', disabled: true },
])

const activeTab = ref(tabs.value[0].value)
</script>

<template>
  <Page
    :title="$t('common.dashboard')"
    :description="$t('common.overviewDescription')"
      >
    <template #actions>
      <DateRangePicker />
      <Button
        @click="() => toast('hello', {
          position: 'top-center',
        })"
      >
        {{ $t('common.download') }}
      </Button>
    </template>

    <UiTabs :default-value="activeTab" class="w-full">
      <UiTabsList>
        <UiTabsTrigger
          v-for="tab in tabs" :key="tab.value"
          :value="tab.value"
          :disabled="tab.disabled"
        >
          {{ $t(tab.name) }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="overview" class="space-y-4">
        <OverviewContent />
      </UiTabsContent>
    </UiTabs>
  </Page>
</template>

<style>

</style>

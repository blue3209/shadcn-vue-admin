<script setup lang="ts">
import Page from '@/components/global-layout/basic-page.vue'

import { columns } from './components/columns'
import DataTable from './components/data-table.vue'
import TaskCreate from './components/task-create.vue'
import TaskImport from './components/task-import.vue'
import tasks from './data/tasks.json'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'TasksPage'
})
</script>

<template>
  <Page
    :title="$t('common.tasks')"
    :description="$t('common.tasksDescription')"
      >
    <template #actions>
      <TaskImport />
      <TaskCreate />
    </template>
    <div class="overflow-x-auto">
      <DataTable :data="tasks" :columns="columns" />
    </div>
  </Page>
</template>

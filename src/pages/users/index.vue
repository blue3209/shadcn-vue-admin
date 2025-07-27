<script setup lang="ts">
import Page from '@/components/global-layout/basic-page.vue'

import { columns } from './components/columns'
import DataTable from './components/data-table.vue'
import UserCreate from './components/user-create.vue'
import UserInvite from './components/user-invite.vue'
import { users } from './data/users'

// 组件名称，用于keep-alive缓存识别
defineOptions({
  name: 'UsersPage'
})
</script>

<template>
  <Page
    :title="$t('common.users')"
    :description="$t('common.usersDescription')"
      >
    <template #actions>
      <UserInvite />
      <UserCreate />
    </template>
    <div class="overflow-x-auto">
      <DataTable :data="users" :columns="columns" />
    </div>
  </Page>
</template>

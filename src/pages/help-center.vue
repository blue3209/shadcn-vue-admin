<script setup lang="ts">
import Page from '@/components/global-layout/basic-page.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ISocialMediaAccount {
  title: string
  desc: string
  url: string
}

const socialMediaAccounts = ref<ISocialMediaAccount[]>([
  { title: 'common.github', desc: 'common.githubDescription', url: 'https://github.com/Whbbit1999/shadcn-vue-admin' },
  { title: 'common.discord', desc: 'common.discordDescription', url: '' },
  { title: 'common.bilibili', desc: 'common.bilibiliDescription', url: 'https://space.bilibili.com/104376935' },
])
</script>

<template>
  <Page
    :title="$t('common.helpCenter')"
    :description="$t('common.helpCenterDescription')"
  >
    <Alert>
      <AlertTitle>{{ $t('common.headsUp') }}</AlertTitle>
      <AlertDescription>
        {{ $t('common.helpCenterMessage') }}
      </AlertDescription>
    </Alert>

    <ul class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="account in socialMediaAccounts" :key="account.title">
        <a :href="account.url || '#'" target="_blank" rel="noopener noreferrer" class="block p-4 border rounded-lg shadow-sm bg-background border-border">
          <h2 class="mb-2 text-lg font-bold">
            {{ $t(account.title) }}
          </h2>
          <p class="text-sm text-stone-500">
            {{ $t(account.desc) }}
          </p>
        </a>
      </li>
    </ul>
  </Page>
</template>

<style scoped>
</style>

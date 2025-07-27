<script setup lang="ts">
import { X, MoreHorizontal } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  title: string
  path: string
  icon?: string
  closable?: boolean
}

const props = defineProps<{
  tabs: TabItem[]
  activeTab: string
}>()

const emit = defineEmits<{
  'update:activeTab': [value: string]
  'close-tab': [tabId: string]
  'close-all': []
  'close-right': [tabId: string]
  'close-other': [tabId: string]
  'refresh-tab': [tabId: string]
}>()

const { t } = useI18n()

function handleTabClick(tabId: string) {
  emit('update:activeTab', tabId)
}

function handleCloseTab(tabId: string, event: Event) {
  event.stopPropagation()
  emit('close-tab', tabId)
}

function handleCloseAll() {
  emit('close-all')
}

function handleCloseRight(tabId: string) {
  emit('close-right', tabId)
}

function handleCloseOther(tabId: string) {
  emit('close-other', tabId)
}

function handleRefreshTab(tabId: string) {
  emit('refresh-tab', tabId)
}

function isTabClosable(tab: TabItem): boolean {
  // 仪表盘标签不允许关闭
  if (tab.path === '/dashboard') {
    return false
  }
  return tab.closable !== false
}

// 计算可关闭的标签数量
const closableTabsCount = computed(() => {
  return props.tabs.filter(tab => tab.closable).length
})

// 获取当前活动标签的索引
const activeTabIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.id === props.activeTab)
})
</script>

<template>
  <div class="border-b bg-background shrink-0">
    <div class="flex items-center">
      <!-- 标签滚动区域 -->
      <ScrollArea class="flex-1 whitespace-nowrap">
        <div class="flex space-x-1 p-1">
          <div v-for="tab in tabs" :key="tab.id" :class="cn(
            'group relative flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer',
            activeTab === tab.id
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground'
          )" @click="handleTabClick(tab.id)">
            <!-- 文字始终居中显示 -->
            <span class="truncate text-center">{{ tab.title }}</span>

            <!-- 删除按钮：绝对定位在右上角 -->
            <Button v-if="isTabClosable(tab)" variant="ghost" size="sm"
              class="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-muted/80 hover:bg-muted text-muted-foreground"
              @click="handleCloseTab(tab.id, $event)">
              <X class="h-3 w-3" />
              <span class="sr-only">{{ t('common.closeTab') }}</span>
            </Button>
          </div>
        </div>
        <ScrollBar orientation="horizontal" class="invisible" />
      </ScrollArea>

      <!-- 全局操作按钮 - 固定在最右侧 -->
      <div class="flex items-center px-2 border-l border-border">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
              <MoreHorizontal class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="handleCloseAll">
              {{ t('common.closeAllTabs') }}
            </DropdownMenuItem>

            <DropdownMenuItem v-if="closableTabsCount > 1" @click="handleCloseOther(activeTab)">
              {{ t('common.closeOtherTabs') }}
            </DropdownMenuItem>

            <DropdownMenuItem v-if="activeTabIndex < tabs.length - 1" @click="handleCloseRight(activeTab)">
              {{ t('common.closeRightTabs') }}
            </DropdownMenuItem>

            <DropdownMenuItem v-if="activeTab !== 'dashboard'" @click="handleRefreshTab(activeTab)">
              {{ t('common.refreshCurrentTab') }}
            </DropdownMenuItem>

            <DropdownMenuItem v-if="activeTab !== 'dashboard'" @click="handleCloseTab(activeTab, $event)">
              {{ t('common.closeCurrentTab') }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
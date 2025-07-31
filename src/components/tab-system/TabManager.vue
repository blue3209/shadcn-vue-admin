<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TabBar from './TabBar.vue'
import type { TabItem } from './TabBar.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 防止循环触发的标志
let isNavigating = false

// 路由路径到组件名的映射
const routeComponentMap: Record<string, string> = {
  '/dashboard': 'DashboardPage',
  '/tasks': 'TasksPage',
  '/users': 'UsersPage',
  '/settings': 'SettingsPage',
  '/settings/account': 'SettingsAccountPage',
  '/settings/appearance': 'SettingsAppearancePage',
  '/settings/notifications': 'SettingsNotificationsPage',
  '/settings/display': 'SettingsDisplayPage',
  '/settings/profile': 'SettingsProfilePage',
  '/apps': 'AppsPage',
  '/ai-talk': 'AiTalkPage',
  '/billing': 'BillingPage',
  '/help-center': 'HelpCenterPage',
  '/marketing': 'MarketingPage',
  '/marketing/hello': 'MarketingHelloPage',
}

// 缓存管理
const cachedComponents = ref<string[]>([])

// 获取路由对应的组件名
function getComponentName(path: string): string {
  return routeComponentMap[path] || `Page_${generateTabId(path)}`
}

// 缓存管理函数
function addToCache(path: string) {
  const componentName = getComponentName(path)
  if (!cachedComponents.value.includes(componentName)) {
    cachedComponents.value.push(componentName)
    console.log('添加到缓存:', componentName, 'for', path)
  }
}

function removeFromCache(path: string) {
  const componentName = getComponentName(path)
  const index = cachedComponents.value.indexOf(componentName)
  if (index > -1) {
    cachedComponents.value.splice(index, 1)
    console.log('从缓存移除:', componentName, 'for', path)
  }
}

function refreshPage(path: string) {
  removeFromCache(path)
  // 在下一个tick重新添加，强制重新加载
  nextTick(() => {
    addToCache(path)
  })
}



// 生成标签ID
function generateTabId(path: string): string {
  return path.replace(/\//g, '-').replace(/^-/, '') || 'home'
}

// 获取页面标题
function getPageTitle(path: string): string {
  const titleMap: Record<string, string> = {
    '/tasks': t('common.tasks'),
    '/users': t('common.users'),
    '/settings': t('common.settings'),
    '/settings/account': t('common.account'),
    '/settings/appearance': t('common.appearance'),
    '/settings/notifications': t('common.notifications'),
    '/settings/display': t('common.display'),
    '/settings/profile': t('common.profile'),
    '/apps': t('common.apps'),
    '/ai-talk': t('common.aiTalk'),
    '/billing': t('common.billing'),
    '/help-center': t('common.helpCenter'),
    '/marketing': t('common.marketing'),
    '/marketing/hello': t('common.welcome'),
    '/example/vditor': t('common.vditor')
  }

  return titleMap[path] || t('common.newPage')
}

// 创建仪表盘标签
function createDashboardTab(): TabItem {
  return {
    id: 'dashboard',
    title: t('common.dashboard'),
    path: '/dashboard',
    closable: false
  }
}

// 创建新标签
function createNewTab(path: string): TabItem {
  return {
    id: generateTabId(path),
    title: getPageTitle(path),
    path: path,
    closable: true
  }
}

// 更新所有标签的标题
function updateAllTabTitles() {
  tabs.value.forEach(tab => {
    if (tab.path === '/dashboard') {
      tab.title = t('common.dashboard')
    } else {
      tab.title = getPageTitle(tab.path)
    }
  })
}

// 初始化标签数据
function initializeTabs(): TabItem[] {
  const currentPath = route.path
  const tabs: TabItem[] = [createDashboardTab()]
  
  // 如果当前路由不是仪表盘，添加当前路由标签
  if (currentPath !== '/dashboard') {
    const newTab = createNewTab(currentPath)
    tabs.push(newTab)
  }
  
  return tabs
}

// 初始化活动标签
function initializeActiveTab(tabsList: TabItem[]): string {
  const currentPath = route.path
  
  // 使用当前路由对应的标签
  const currentTab = tabsList.find(tab => tab.path === currentPath)
  return currentTab ? currentTab.id : 'dashboard'
}

// 初始化标签和活动标签
const tabs = ref<TabItem[]>(initializeTabs())
const activeTab = ref(initializeActiveTab(tabs.value))

// 监听活动标签变化，更新路由
watch(activeTab, (newActiveTab, oldActiveTab) => {
  console.log('活动标签变化:', oldActiveTab, '->', newActiveTab)
  
  const tab = tabs.value.find(t => t.id === newActiveTab)
  if (tab && route.path !== tab.path) {
    console.log('路由跳转到:', tab.path)
    isNavigating = true
    router.push(tab.path).finally(() => {
      isNavigating = false
    })
  }
})

// 监听路由变化，处理标签逻辑
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (isNavigating) {
      return
    }

    console.log('路由从', oldPath, '变化到', newPath)
    console.log('当前标签列表:', tabs.value.map(t => ({ id: t.id, path: t.path, title: t.title })))

    // 检查是否已存在相同路径的标签
    const existingTab = tabs.value.find(tab => tab.path === newPath)
    if (existingTab) {
      // 如果存在，激活该标签
      console.log('找到已存在的标签:', existingTab.id)
      activeTab.value = existingTab.id
    } else {
      // 如果不存在，创建新标签并添加到缓存
      const newTab = createNewTab(newPath)
      console.log('创建新标签:', newTab)
      tabs.value.push(newTab)
      activeTab.value = newTab.id
      
      // 添加到缓存
      if (newPath !== '/dashboard') {
        addToCache(newPath)
      }
    }
    
    console.log('更新后的标签列表:', tabs.value.map(t => ({ id: t.id, path: t.path, title: t.title })))
  },
  { immediate: false }
)

// 计算属性：当前语言
const currentLocale = computed(() => t('common.dashboard'))

// 监听语言变化，更新标签标题
watch(currentLocale, () => {
  updateAllTabTitles()
}, { immediate: false })

// 处理标签关闭
function handleCloseTab(tabId: string) {
  const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)
  if (tabIndex === -1) return

  const closedTab = tabs.value[tabIndex]
  
  // 从缓存中移除
  if (closedTab.path !== '/dashboard') {
    removeFromCache(closedTab.path)
  }
  
  // 移除标签
  tabs.value.splice(tabIndex, 1)

  // 如果关闭的是当前活动标签，切换到其他标签
  if (activeTab.value === tabId) {
    const nextTab = tabs.value[tabIndex] || tabs.value[tabIndex - 1] || tabs.value[0]
    if (nextTab) {
      activeTab.value = nextTab.id
    }
  }
  
  console.log('关闭标签:', closedTab.title)
}

// 关闭所有标签（除了仪表盘）
function closeAllTabs() {
  // 清空所有缓存
  cachedComponents.value = []
  
  const dashboardTab = tabs.value.find(tab => tab.path === '/dashboard')
  tabs.value = dashboardTab ? [dashboardTab] : [createDashboardTab()]
  activeTab.value = 'dashboard'
  console.log('关闭所有标签')
}

// 关闭右侧标签
function closeRightTabs(tabId: string) {
  const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)
  if (tabIndex === -1) return

  // 保留当前标签及左侧标签，移除右侧标签
  const removedTabs = tabs.value.splice(tabIndex + 1)
  
  // 从缓存中移除被关闭的标签
  removedTabs.forEach(tab => {
    if (tab.path !== '/dashboard') {
      removeFromCache(tab.path)
    }
  })
  
  // 如果当前活动标签被关闭，切换到最后一个标签
  if (!tabs.value.find(tab => tab.id === activeTab.value)) {
    activeTab.value = tabs.value[tabs.value.length - 1]?.id || 'dashboard'
  }
  
  console.log('关闭右侧标签:', removedTabs.map(t => t.title))
}

// 关闭其他标签
function closeOtherTabs(tabId: string) {
  const targetTab = tabs.value.find(tab => tab.id === tabId)
  if (!targetTab) return

  // 保留目标标签和仪表盘标签
  const dashboardTab = tabs.value.find(tab => tab.path === '/dashboard')
  const tabsToKeep: TabItem[] = []
  
  if (dashboardTab && targetTab.id !== 'dashboard') {
    tabsToKeep.push(dashboardTab, targetTab)
  } else {
    tabsToKeep.push(targetTab)
  }
  
  // 从缓存中移除不保留的标签
  const tabsToRemove = tabs.value.filter(tab => !tabsToKeep.includes(tab))
  tabsToRemove.forEach(tab => {
    if (tab.path !== '/dashboard') {
      removeFromCache(tab.path)
    }
  })
  
  tabs.value = tabsToKeep
  activeTab.value = tabId
  
  console.log('关闭其他标签，保留:', tabsToKeep.map(t => t.title))
}

// 刷新标签页面
function handleRefreshTab(tabId: string) {
  const tab = tabs.value.find(t => t.id === tabId)
  if (tab && tab.path !== '/dashboard') {
    refreshPage(tab.path)
    console.log('刷新标签:', tab.title)
  }
}



// 组件挂载时确保仪表盘标签存在
onMounted(async () => {
  await nextTick()
  
  const dashboardTab = tabs.value.find(tab => tab.path === '/dashboard')
  if (!dashboardTab) {
    tabs.value.unshift(createDashboardTab())
  }
  
  // 确保当前活动标签是正确的
  const currentPath = route.path
  const currentTabForPath = tabs.value.find(tab => tab.path === currentPath)
  if (currentTabForPath && activeTab.value !== currentTabForPath.id) {
    activeTab.value = currentTabForPath.id
  }
  
  // 初始化缓存
  if (currentPath !== '/dashboard') {
    addToCache(currentPath)
  }
  
  console.log('TabManager 已挂载，当前标签:', tabs.value.map(t => ({ id: t.id, path: t.path, title: t.title })))
  console.log('当前活动标签:', activeTab.value)
  console.log('初始缓存列表:', cachedComponents.value)
})

// 组件卸载时清理
onUnmounted(() => {
  console.log('TabManager 组件卸载')
})
</script>

<template>
  <div class="flex flex-col h-full min-h-0">
    <TabBar class="pl-2 pr-2 pb-1" :tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event" @close-tab="handleCloseTab"
      @close-all="closeAllTabs" @close-right="closeRightTabs" @close-other="closeOtherTabs" @refresh-tab="handleRefreshTab" />
    <div class="flex-1 overflow-hidden min-h-0 p-1">
      <!-- 使用 keep-alive 缓存页面组件 -->
      <keep-alive :include="cachedComponents">
        <div class="h-full overflow-y-auto px-4">
          <router-view />
        </div>
      </keep-alive>
    </div>
  </div>
</template>
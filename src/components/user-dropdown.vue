<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
  UserRoundCog,
  User,
} from 'lucide-vue-next'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// 使用认证 store 获取用户信息
const { user, logout } = useAuth()
console.log(user)

// 如果没有用户信息，显示默认信息
const currentUser = computed(() => {
  return {
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  }
})

// Tooltip 悬浮时间控制
const tooltipOpen = ref(false)
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const handleMouseEnter = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
  tooltipOpen.value = true
}

const handleMouseLeave = () => {
  hoverTimeout = setTimeout(() => {
    tooltipOpen.value = false
  }, 200) // 200ms 延迟，避免鼠标快速移动时闪烁
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
})
</script>

<template>
  <!-- 只有在用户已登录时才显示用户头像 -->
  <UiDropdownMenu v-if="user">
    <UiDropdownMenuTrigger>
      <TooltipProvider>
        <Tooltip v-model:open="tooltipOpen">
          <TooltipTrigger as-child>
            <UiButton variant="ghost" size="icon" class="relative rounded-full" @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave">
              <UiAvatar class="size-7">
                <UiAvatarImage :src="currentUser.avatar" :alt="currentUser.name || 'User'" />
                <UiAvatarFallback>
                  <User />
                </UiAvatarFallback>
              </UiAvatar>
            </UiButton>
          </TooltipTrigger>
          <TooltipContent side="bottom" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <p>{{ $t('common.profile') }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56" align="end" :side-offset="4">
      <UiDropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UiAvatar class="size-8 rounded-lg">
            <UiAvatarImage :src="currentUser.avatar" :alt="currentUser.name || 'User'" />
            <UiAvatarFallback class="rounded-lg">
              {{ (currentUser.name || 'User').charAt(0).toUpperCase() }}
            </UiAvatarFallback>
          </UiAvatar>
          <div class="grid flex-1 text-sm leading-tight text-left">
            <span class="font-semibold truncate">{{ currentUser.name }}</span>
            <span class="text-xs truncate">{{ currentUser.email }}</span>
          </div>
        </div>
      </UiDropdownMenuLabel>

      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem @click="$router.push('/billing/')">
          <Sparkles />
          {{ $t('common.upgradeToPro') }}
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>

      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem @click="$router.push('/billing?type=billing')">
          <CreditCard />
          {{ $t('common.billing') }}
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>

      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem @click="$router.push('/settings/')">
          <UserRoundCog />
          {{ $t('common.profile') }}
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="$router.push('/settings/account')">
          <BadgeCheck />
          {{ $t('common.account') }}
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="$router.push('/settings/notifications')">
          <Bell />
          {{ $t('common.notifications') }}
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>

      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem @click="logout">
        <LogOut />
        {{ $t('common.logout') }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
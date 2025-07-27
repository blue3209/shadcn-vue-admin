<script setup lang="ts">
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
  UserRoundCog,
  User,
} from 'lucide-vue-next'

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
</script>

<template>
  <!-- 只有在用户已登录时才显示用户头像 -->
  <UiDropdownMenu v-if="user">
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="icon" class="relative rounded-full border" >
        <UiAvatar class="size-7">
          <UiAvatarImage :src="currentUser.avatar" :alt="currentUser.name || 'User'" />
          <UiAvatarFallback>
            <User />
          </UiAvatarFallback>
        </UiAvatar>
      </UiButton>
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
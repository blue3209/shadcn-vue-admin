<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import GitHubButton from './github-button.vue'
import GoogleButton from './google-button.vue'
import PrivacyPolicyButton from './privacy-policy-button.vue'
import TermsOfServiceButton from './terms-of-service-button.vue'
import ToForgotPasswordLink from './to-forgot-password-link.vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 表单数据
const email = ref('demo@example.com') // 预填示例邮箱
const password = ref('password123')   // 预填示例密码
const isLoading = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  
  if (!email.value || !password.value) {
    toast.error('请输入邮箱和密码')
    return
  }

  isLoading.value = true
  
  try {
    const result = await authStore.login(email.value, password.value)
    
    if (result.success) {
      toast.success(result.message)
      
      // 如果有重定向路径，跳转到原来想访问的页面
      const redirectPath = route.query.redirect as string
      if (redirectPath && redirectPath !== '/auth/login') {
        router.push(redirectPath)
      } else {
        router.push('/dashboard')
      }
    } else {
      toast.error(result.message)
    }
  } catch (error) {
    toast.error('登录失败，请重试')
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UiCard class="w-full">
    <UiCardHeader>
      <UiCardTitle class="text-2xl">
        {{ t('auth.loginTitle') }}
      </UiCardTitle>
      <UiCardDescription>
        {{ t('auth.loginDescription') }}
        {{ t('auth.notHaveAccount') }}
        <UiButton variant="link" class="px-0 text-muted-foreground" @click="$router.push('/auth/sign-up')">
          {{ t('auth.signUp') }}
        </UiButton>
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="grid gap-4">
      <form @submit="handleSubmit" class="grid gap-4">
        <div class="grid gap-2">
          <UiLabel for="email">
            {{ t('auth.email') }}
          </UiLabel>
          <UiInput 
            id="email" 
            v-model="email"
            type="email" 
            :placeholder="t('auth.emailPlaceholder')" 
            autocomplete="email" 
            required 
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <UiLabel for="password">
              {{ t('auth.password') }}
            </UiLabel>
            <ToForgotPasswordLink />
          </div>
          <UiInput 
            id="password" 
            v-model="password"
            type="password" 
            required 
            :placeholder="t('auth.passwordPlaceholder')"
            autocomplete="current-password"
            :disabled="isLoading"
          />
        </div>

        <UiButton type="submit" class="w-full" :disabled="isLoading">
          <div v-if="isLoading" class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            正在登录...
          </div>
          <span v-else>{{ t('auth.login') }}</span>
        </UiButton>
      </form>

      <!-- 添加示例提示 -->
      <div class="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
        <p class="font-medium mb-1">演示账号：</p>
        <p>邮箱：demo@example.com</p>
        <p>密码：password123</p>
        <p class="text-xs mt-1 opacity-75">（任意邮箱和密码都可以登录）</p>
      </div>

      <UiSeparator :label="t('auth.orContinueWith')" />

      <div class="flex flex-row items-center justify-between gap-4 w-full">
        <GitHubButton class="flex-1" />
        <GoogleButton class="flex-1" />
      </div>

      <UiCardDescription>
        {{ t('auth.byClickingLogin') }}
        <TermsOfServiceButton />
        {{ t('auth.and') }}
        <PrivacyPolicyButton />
      </UiCardDescription>
    </UiCardContent>
  </UiCard>
</template>

<style scoped></style>

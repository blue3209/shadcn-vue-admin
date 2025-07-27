import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  function toHome() {
    router.push({ path: '/dashboard' })
  }

  return {
    // 使用 store 的 logout 方法（会清除状态并跳转）
    logout: authStore.logout,
    // 使用 store 的 login 方法
    login: authStore.login,
    // 暴露其他 store 的状态和方法
    isLogin: authStore.isLogin,
    user: authStore.user,
    loading: authStore.loading,
    checkAuth: authStore.checkAuth,
    toHome
  }
}

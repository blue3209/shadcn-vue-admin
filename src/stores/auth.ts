import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export const useAuthStore = defineStore('user', () => {
  // 状态
  const isLogin = ref(false)
  const user = ref<User | null>(null)
  const loading = ref(false)

  // 从 localStorage 恢复登录状态
  const token = ref(localStorage.getItem('auth_token') || '')
  
  // 初始化时检查登录状态
  if (token.value) {
    isLogin.value = true
    // 从 localStorage 恢复用户信息
    const savedUser = localStorage.getItem('user_info')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  // 模拟登录
  const login = async (email: string, password: string) => {
    loading.value = true
    
    try {
      // 模拟 API 调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录验证（简单示例）
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          avatar: 'placeholder.png'
        }
        
        const mockToken = 'mock_jwt_token_' + Date.now()
        
        // 保存状态
        isLogin.value = true
        user.value = mockUser
        token.value = mockToken
        
        // 持久化到 localStorage
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('user_info', JSON.stringify(mockUser))
        
        return { success: true, message: '登录成功' }
      } else {
        throw new Error('请输入邮箱和密码')
      }
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '登录失败'
      }
    } finally {
      loading.value = false
    }
  }

  // 登出
  const logout = () => {
    isLogin.value = false
    user.value = null
    token.value = ''
    
    // 清除 localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    
    // 强制跳转到登录页（使用 window.location 确保跳转成功）
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }

  // 检查是否已登录
  const checkAuth = () => {
    return isLogin.value && token.value
  }

  return {
    // 状态
    isLogin: readonly(isLogin),
    user: readonly(user),
    loading: readonly(loading),
    token: readonly(token),
    
    // 方法
    login,
    logout,
    checkAuth
  }
})

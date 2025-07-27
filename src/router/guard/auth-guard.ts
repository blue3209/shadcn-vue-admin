import type { Router } from 'vue-router'

import { storeToRefs } from 'pinia'
import { unref } from 'vue'

import pinia from '@/plugins/pinia'
import { useAuthStore } from '@/stores/auth'

export function authGuard(router: Router) {
  const authStore = useAuthStore(pinia)
  const { isLogin } = storeToRefs(authStore)

  // 定义不需要认证的公开路由
  const publicRoutes = [
    '/auth/login',
    '/auth/sign-up', 
    '/auth/forgot-password',
    '/auth/otp',
    '/marketing',
    '/marketing/hello'
  ]

  router.beforeEach((to, _from, next) => {
    const isPublicRoute = publicRoutes.includes(to.path as string)
    const isAuthenticated = unref(isLogin)

    // 如果是公开路由，直接放行
    if (isPublicRoute) {
      // 如果已经登录且访问登录页，重定向到首页
      if (isAuthenticated && to.path === '/auth/login') {
        next('/dashboard')
        return
      }
      next()
      return
    }

    // 对于需要认证的路由
    if (!isAuthenticated) {
      // 保存用户原本想访问的路由
      const redirectPath = to.fullPath !== '/auth/login' ? to.fullPath : '/dashboard'
      next({
        path: '/auth/login',
        query: { redirect: redirectPath }
      })
      return
    }

    // 已登录，允许访问
    next()
  })

  // 处理根路径重定向
  router.beforeEach((to, _from, next) => {
    if (to.path === '/') {
      const isAuthenticated = unref(isLogin)
      if (isAuthenticated) {
        next('/dashboard')
      } else {
        next('/auth/login')
      }
      return
    }
    next()
  })
}

import {
  BadgeHelp,
  BellDot,
  Boxes,
  Bug,
  CreditCard,
  LayoutDashboard,
  ListTodo,
  Palette,
  Podcast,
  SquareUserRound,
  User,
  Users,
  FileText,
} from 'lucide-vue-next'

import type { NavGroup } from '@/components/app-sidebar/types'

export function useSidebar() {
  const navData = ref<NavGroup[]>()

  navData.value = [
    {
      title: 'common.general',
      items: [
        {
          title: 'common.dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'common.tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'common.apps',
          url: '/apps',
          icon: Boxes,
        },
        {
          title: 'common.users',
          url: '/users',
          icon: Users,
        },
        {
          title: 'common.aiTalk',
          url: '/ai-talk',
          icon: Podcast,
        },
      ],
    },
    {
      title: 'common.pages',
      items: [
        {
          title: 'common.auth',
          icon: SquareUserRound,
          items: [
            { title: 'common.signIn', url: '/auth/sign-in' },
            { title: 'common.login', url: '/auth/login' },
            { title: 'common.signUp', url: '/auth/sign-up' },
            { title: 'common.forgotPassword', url: '/auth/forgot-password' },
            { title: 'common.otp', url: '/auth/otp' },
          ],
        },
        {
          title: 'common.errors',
          icon: Bug,
          items: [
            { title: 'common.unauthorized', url: '/errors/401' },
            { title: 'common.forbidden', url: '/errors/403' },
            { title: 'common.notFound', url: '/errors/404' },
            { title: 'common.internalError', url: '/errors/500' },
            { title: 'common.maintenanceError', url: '/errors/503' },
          ],
        },
        {
          title: 'common.example',
          icon: FileText,
          items: [
            { title: 'common.vditor', url: '/example/vditor' },
          ],
        },
      ],
    },
    {
      title: 'common.settings',
      items: [
        {
          title: 'common.account',
          url: '/settings/account',
          icon: User,
        },
        {
          title: 'common.appearance',
          url: '/settings/appearance',
          icon: Palette,
        },
        {
          title: 'common.notifications',
          url: '/settings/notifications',
          icon: BellDot,
        },
        {
          title: 'common.billing',
          url: '/billing',
          icon: CreditCard,
        },
      ],
    },
    {
      title: 'common.help',
      items: [
        {
          title: 'common.helpCenter',
          url: '/help-center',
          icon: BadgeHelp,
        },
      ],
    },
  ]

  return {
    navData,
  }
}

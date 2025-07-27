<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'

import AppSidebar from '@/components/app-sidebar/index.vue'
import CommandMenuPanel from '@/components/command-menu-panel/index.vue'
import ThemePopover from '@/components/custom-theme/theme-popover.vue'
import ToggleTheme from '@/components/toggle-theme.vue'
import LanguageChange from '@/components/language-change.vue'
import UserDropdown from '@/components/user-dropdown.vue'
import TabManager from '@/components/tab-system/TabManager.vue'
import FullscreenToggle from '@/components/fullscreen-toggle.vue'
import MainNav from '@/components/main-nav.vue'

const defaultOpen = useCookies(['sidebar:state'])
</script>

<template>
  <UiSidebarProvider :default-open="defaultOpen.get('sidebar:state')" class="h-screen min-h-0">
    <AppSidebar />
    <UiSidebarInset
      class="w-full max-w-full h-full flex flex-col min-h-0 peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)] peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))] ml-3">
      <header class="flex items-center gap-3 sm:gap-4 h-16 p-4 shrink-0 min-h-0 transition-[width,height] ease-linear">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="h-2" />
        <MainNav />
        <div class="ml-auto flex items-center space-x-2">
          <CommandMenuPanel />
          <ThemePopover />
          <ToggleTheme />
          <LanguageChange />
          <FullscreenToggle />
          <UserDropdown />
        </div>
      </header>
      <TabManager class="flex-1 min-h-0" />
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

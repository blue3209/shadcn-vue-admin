<script lang="ts" setup>
import { sidebarData } from './data/sidebar-data'
import NavTeam from './nav-team.vue'
import TeamSwitcher from './team-switcher.vue'
</script>

<template>
  <UiSidebar collapsible="icon" style="height: calc(100vh - 1rem);" class="z-50 m-2 rounded-xl border py-3 shadow-sm">
    <UiSidebarHeader>
      <TeamSwitcher :teams="sidebarData.teams" />
    </UiSidebarHeader>

    <UiSidebarContent>
      <NavTeam :nav-main="sidebarData.navMain" />
    </UiSidebarContent>

    <!-- <UiSidebarFooter>
      <NavFooter :user="sidebarData.user" />
    </UiSidebarFooter> -->

    <!-- <UiSidebarRail /> -->
  </UiSidebar>
</template>
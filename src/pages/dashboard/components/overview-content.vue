<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import OverviewChart from './overview-chart.vue'
import LineChart from './line-chart.vue'
import PieChart from './pie-chart.vue'
import RecentSales from './recent-sales.vue'
import TeamMembers from './team-members.vue'
import CookieSettings from './cookie-settings.vue'
import Notifications from './notifications.vue'
import ShareDocument from './share-document.vue'

const { t } = useI18n()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Total Revenue Card -->
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          Total Revenue
        </UiCardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="size-4 text-muted-foreground">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-2xl font-bold">
              $45,231.89
            </div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
          <!-- 收入趋势折线图 -->
          <div class="h-16 w-20">
            <svg viewBox="0 0 80 60" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <polyline
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                opacity="0.8"
                points="0,50 10,45 20,40 30,30 40,25 50,20 60,15 70,10 80,5"
                class="text-primary"
              />
              <circle cx="80" cy="5" r="2" fill="currentColor" class="text-primary" />
            </svg>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Subscriptions Card -->
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          Subscriptions
        </UiCardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="size-4 text-muted-foreground">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-2xl font-bold">
              +2350
            </div>
            <p class="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </div>
          <!-- 订阅量柱状图 -->
          <div class="h-16 w-20 flex items-end justify-between gap-1">
            <div class="w-2 bg-muted rounded-t" style="height: 20%"></div>
            <div class="w-2 bg-muted rounded-t" style="height: 35%"></div>
            <div class="w-2 bg-muted rounded-t" style="height: 45%"></div>
            <div class="w-2 bg-muted rounded-t" style="height: 30%"></div>
            <div class="w-2 bg-muted rounded-t" style="height: 60%"></div>
            <div class="w-2 bg-muted rounded-t" style="height: 80%"></div>
            <div class="w-2 bg-primary rounded-t" style="height: 100%"></div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Sales Card -->
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          Sales
        </UiCardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="size-4 text-muted-foreground">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-2xl font-bold">
              +12,234
            </div>
            <p class="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </div>
          <!-- 销售趋势区域图 -->
          <div class="h-16 w-20">
            <svg viewBox="0 0 80 60" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" class="text-primary" style="stop-opacity:0.3" />
                  <stop offset="100%" class="text-primary" style="stop-opacity:0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#salesGradient)"
                stroke="currentColor"
                stroke-width="2"
                points="0,60 0,40 15,35 30,25 45,30 60,20 75,15 80,10 80,60"
                class="text-primary"
              />
              <polyline
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                points="0,40 15,35 30,25 45,30 60,20 75,15 80,10"
                class="text-primary"
              />
            </svg>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Active Now Card -->
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          Active Now
        </UiCardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="size-4 text-muted-foreground">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-2xl font-bold">
              +573
            </div>
            <p class="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </div>
          <!-- 活跃用户脉冲图 -->
          <div class="h-16 w-20">
            <svg viewBox="0 0 80 60" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <polyline
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                points="0,30 10,30 15,25 20,35 25,20 30,40 35,15 40,45 45,30 50,30 55,25 60,35 65,20 70,40 75,25 80,30"
                class="text-primary"
              />
              <!-- 脉冲点 -->
              <circle cx="35" cy="15" r="2" fill="currentColor" class="text-primary">
                <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="65" cy="20" r="2" fill="currentColor" class="text-primary">
                <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
    <UiCard class="col-span-1 lg:col-span-4">
      <UiCardHeader>
        <UiCardTitle>{{ t('common.overview') }}</UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <OverviewChart />
      </UiCardContent>
    </UiCard>
    <UiCard class="col-span-1 lg:col-span-3">
      <UiCardHeader>
        <UiCardTitle>Recent Sales</UiCardTitle>
        <UiCardDescription>
          You made 265 sales this month.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <RecentSales />
      </UiCardContent>
    </UiCard>
  </div>

  <!-- 新增的图表区域 -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>{{ t('dashboard.trafficTrends') }}</UiCardTitle>
        <UiCardDescription>
          {{ t('dashboard.trafficTrendsDescription') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <LineChart />
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>{{ t('dashboard.deviceUsage') }}</UiCardTitle>
        <UiCardDescription>
          {{ t('dashboard.deviceUsageDescription') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <PieChart />
      </UiCardContent>
    </UiCard>

  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
    <TeamMembers />
    <CookieSettings />
    <Notifications />
    <ShareDocument />
  </div>
</template>

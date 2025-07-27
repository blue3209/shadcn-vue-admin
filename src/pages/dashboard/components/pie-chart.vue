<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useChartTheme } from '@/composables/use-chart-theme'

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent
])

const { t } = useI18n()
const { colors, chartColors, getCommonChartConfig, getResponsiveHeight, getResponsiveConfig } = useChartTheme()



const rawData = computed(() => [
  { name: t('dashboard.desktop'), value: 1260 },
  { name: t('dashboard.mobile'), value: 570 },
  { name: t('dashboard.tablet'), value: 190 },
  { name: t('dashboard.other'), value: 90 },
])

const total = computed(() => rawData.value.reduce((sum, item) => sum + item.value, 0))

const processedData = computed(() =>
  rawData.value.map((item, index) => ({
    ...item,
    percentage: ((item.value / total.value) * 100).toFixed(1),
    itemStyle: {
      color: chartColors.value[index],
      borderColor: colors.value.background,
      borderWidth: 0,
      shadowColor: chartColors.value[index] + '50',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 8
    }
  }))
)

const option = computed(() => {
  const commonConfig = getCommonChartConfig()
  const responsive = getResponsiveConfig()

  return {
    ...commonConfig,
    tooltip: {
      ...commonConfig.tooltip,
      trigger: 'item',
      formatter: (params: any) => {
        const percentage = ((params.value / total.value) * 100).toFixed(1)
        return `
          <div class="space-y-3">
            <div class="font-semibold text-base text-center border-b pb-2">${params.name}</div>
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm">Users</span>
                <span class="font-medium">${params.value.toLocaleString()}</span>
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm">Percentage</span>
                <span class="font-medium">${percentage}%</span>
              </div>
              <div class="border-t pt-2 mt-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs">Total Users</span>
                  <span class="font-medium">${total.value.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    legend: {
      ...commonConfig.legend,
      orient: responsive.isMobile ? 'horizontal' : 'vertical',
      right: responsive.isMobile ? 'center' : '5%',
      top: responsive.isMobile ? 'bottom' : 'center',
      bottom: responsive.isMobile ? '5%' : 'auto',
      itemGap: 20,
      formatter: (name: string) => {
        const item = rawData.value.find(d => d.name === name)
        const percentage = item ? ((item.value / total.value) * 100).toFixed(1) : '0'
        return `{name|${name}} {value|${item?.value.toLocaleString() || 0}} {percent|(${percentage}%)}`
      },
      textStyle: {
        fontSize: 13,
        rich: {
          name: {
            fontSize: 13,
            fontWeight: 'normal',
            color: colors.value.foreground,
            width: 80,
            align: 'left'
          },
          value: {
            fontSize: 13,
            fontWeight: 'bold',
            color: colors.value.foreground,
            width: 60,
            align: 'right'
          },
          percent: {
            fontSize: 12,
            color: colors.value.muted,
            width: 50,
            align: 'right'
          }
        }
      }
    },
    series: [
      {
        name: t('dashboard.deviceUsage'),
        type: 'pie',
        radius: responsive.isMobile ? ['25%', '65%'] : ['30%', '70%'],
        center: responsive.isMobile ? ['50%', '45%'] : ['35%', '50%'],
        avoidLabelOverlap: false,
        padAngle: 3,
        itemStyle: {
          borderRadius: 8
        },
        label: {
          show: true,
          position: 'inside',
          fontSize: 12,
          fontWeight: 'bold',
          color: colors.value.background,
          formatter: (params: any) => {
            const percentage = ((params.value / total.value) * 100)
            return percentage > 8 ? `${percentage.toFixed(1)}%` : ''
          }
        },
        labelLine: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 12,
            borderWidth: 1
          },
          scale: true,
          scaleSize: 1.1,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        animationType: 'scale' as const,
        animationEasing: 'elasticOut' as const,
        animationDelay: (idx: number) => idx * 200,
        data: processedData.value
      },
      // 添加中心文本
      {
        type: 'pie',
        radius: responsive.isMobile ? ['0%', '25%'] : ['0%', '30%'],
        center: responsive.isMobile ? ['50%', '45%'] : ['35%', '50%'],
        silent: true,
        label: {
          show: true,
          position: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.value.foreground,
          formatter: () => total.value.toLocaleString()
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 1,
            name: 'center',
            itemStyle: {
              color: 'transparent'
            },
            label: {
              show: true,
              position: 'center',
              formatter: () => {
                return `{total|${total.value.toLocaleString()}}\n{label|${t('dashboard.totalUsers')}}`
              },
              rich: {
                total: {
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: colors.value.foreground,
                  lineHeight: 40
                },
                label: {
                  fontSize: 14,
                  color: colors.value.muted,
                  lineHeight: 20
                }
              }
            }
          }
        ]
      }
    ]
  }
})
</script>

<template>
  <VChart :option="option" :style="{ height: `${getResponsiveHeight(320)}px`, width: '100%' }" autoresize
    class="transition-all duration-300 hover:scale-[1.01]" />
</template>
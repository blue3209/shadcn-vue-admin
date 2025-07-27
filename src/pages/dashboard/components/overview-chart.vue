<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  DataZoomComponent 
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useChartTheme } from '@/composables/use-chart-theme'

use([
  CanvasRenderer, 
  BarChart, 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  DataZoomComponent
])

const { t } = useI18n()
const { colors, chartColors, getCommonChartConfig, getAxisConfig, createGradient, getResponsiveHeight } = useChartTheme()

interface RevenueDataItem {
  month: string
  desktop: number
  mobile: number
}

const revenueData: RevenueDataItem[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const option = computed(() => {
  const commonConfig = getCommonChartConfig()
  const xAxisConfig = getAxisConfig(true)
  const yAxisConfig = getAxisConfig(false)

  return {
    ...commonConfig,
    tooltip: {
      ...commonConfig.tooltip,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: colors.value.border,
          opacity: 0.05
        }
      },
      formatter: (params: any) => {
        const [desktop, mobile] = params
        return `
          <div class="space-y-2">
            <div class="font-semibold text-base text-center border-b pb-2">${desktop.axisValue}</div>
            <div class="space-y-1">
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-sm" style="background-color: ${chartColors.value[0]}"></div>
                  <span class="text-xs">${t('dashboard.desktop')}</span>
                </div>
                <span class="font-medium">${desktop.value}</span>
              </div>
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-sm" style="background-color: ${chartColors.value[1]}"></div>
                  <span class="text-xs">${t('dashboard.mobile')}</span>
                </div>
                <span class="font-medium">${mobile.value}</span>
              </div>
              <div class="border-t pt-1 mt-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs">Total</span>
                  <span class="font-semibold">${desktop.value + mobile.value}</span>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    legend: {
      ...commonConfig.legend,
      data: [t('dashboard.desktop'), t('dashboard.mobile')],
      top: 8,
      left: 'center'
    },
    grid: {
      ...commonConfig.grid,
      top: '20%'
    },
    xAxis: {
      ...xAxisConfig,
      type: 'category',
      data: revenueData.map(item => item.month),
      boundaryGap: true,
      axisLabel: {
        ...xAxisConfig.axisLabel,
        interval: 0,
        rotate: 0
      }
    },
    yAxis: {
      ...yAxisConfig,
      type: 'value',
      name: 'Revenue',
      nameTextStyle: {
        color: colors.value.muted,
        fontSize: 12,
        padding: [0, 0, 0, 0]
      }
    },
    series: [
      {
        name: t('dashboard.desktop'),
        type: 'bar',
        data: revenueData.map(item => item.desktop),
        barWidth: '35%',
        barGap: '20%',
        itemStyle: {
          color: createGradient(chartColors.value[0], 0.2),
          borderRadius: [8, 8, 0, 0],
          borderWidth: 0,
          shadowColor: chartColors.value[0] + '40',
          shadowBlur: 8,
          shadowOffsetY: 4
        },
        emphasis: {
          itemStyle: {
            color: createGradient(chartColors.value[0], 0.1),
            shadowBlur: 12,
            shadowOffsetY: 6
          },
          scale: true,
          scaleSize: 1.05
        },
        animationDelay: (idx: number) => idx * 100
      },
      {
        name: t('dashboard.mobile'),
        type: 'bar',
        data: revenueData.map(item => item.mobile),
        barWidth: '35%',
        itemStyle: {
          color: createGradient(chartColors.value[1], 0.2),
          borderRadius: [8, 8, 0, 0],
          borderWidth: 0,
          shadowColor: chartColors.value[1] + '40',
          shadowBlur: 8,
          shadowOffsetY: 4
        },
        emphasis: {
          itemStyle: {
            color: createGradient(chartColors.value[1], 0.1),
            shadowBlur: 12,
            shadowOffsetY: 6
          },
          scale: true,
          scaleSize: 1.05
        },
        animationDelay: (idx: number) => idx * 100 + 50
      }
    ],
    // 添加数据缩放组件
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      }
    ]
  }
})
</script>

<template>
  <VChart 
    :option="option" 
    :style="{ height: `${getResponsiveHeight(300)}px`, width: '100%' }"
    autoresize 
    class="transition-all duration-300 hover:scale-[1.01]"
  />
</template>

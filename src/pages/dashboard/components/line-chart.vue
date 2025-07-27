<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useChartTheme } from '@/composables/use-chart-theme'

use([
  CanvasRenderer, 
  LineChart, 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  DataZoomComponent,
])

const { t } = useI18n()
const { colors, chartColors, getCommonChartConfig, getAxisConfig, createGradient, getResponsiveHeight } = useChartTheme()

interface TrendDataItem {
  month: string
  visitors: number
  pageViews: number
}

const trendData: TrendDataItem[] = [
  { month: 'January', visitors: 4000, pageViews: 2400 },
  { month: 'February', visitors: 3000, pageViews: 1398 },
  { month: 'March', visitors: 2000, pageViews: 9800 },
  { month: 'April', visitors: 2780, pageViews: 3908 },
  { month: 'May', visitors: 1890, pageViews: 4800 },
  { month: 'June', visitors: 2390, pageViews: 3800 },
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
        type: 'cross',
        crossStyle: {
          color: colors.value.border,
          width: 1,
          type: 'dashed'
        }
      },
      formatter: (params: any) => {
        const [visitors, pageViews] = params
        const growth = visitors.dataIndex > 0 
          ? trendData[visitors.dataIndex].visitors - trendData[visitors.dataIndex - 1].visitors
          : 0
        const growthPercent = visitors.dataIndex > 0 
          ? ((growth / trendData[visitors.dataIndex - 1].visitors) * 100).toFixed(1)
          : '0'
        
        return `
          <div class="space-y-3">
            <div class="font-semibold text-base text-center border-b pb-2">${visitors.axisValue}</div>
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-6">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" style="background-color: ${visitors.color}"></div>
                  <span class="text-sm">${t('dashboard.visitors')}</span>
                </div>
                <span class="font-medium">${visitors.value.toLocaleString()}</span>
              </div>
              <div class="flex items-center justify-between gap-6">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" style="background-color: ${pageViews.color}"></div>
                  <span class="text-sm">${t('dashboard.pageViews')}</span>
                </div>
                <span class="font-medium">${pageViews.value.toLocaleString()}</span>
              </div>
              ${visitors.dataIndex > 0 ? `
                <div class="border-t pt-2 mt-3">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-xs">Month-over-month</span>
                    <span class="font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}">
                      ${growth >= 0 ? '+' : ''}${growthPercent}%
                    </span>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `
      }
    },
    legend: {
      ...commonConfig.legend,
      data: [t('dashboard.visitors'), t('dashboard.pageViews')],
      top: 8,
      left: 'center'
    },
    grid: {
      ...commonConfig.grid,
      top: '20%',
      bottom: '10%'
    },
    xAxis: {
      ...xAxisConfig,
      type: 'category',
      data: trendData.map(item => item.month),
      boundaryGap: false,
      axisLabel: {
        ...xAxisConfig.axisLabel,
        interval: 0
      }
    },
    yAxis: [
      {
        ...yAxisConfig,
        type: 'value',
        name: 'Visitors',
        position: 'left',
        nameTextStyle: {
          color: colors.value.muted,
          fontSize: 12
        },
        axisLabel: {
          ...yAxisConfig.axisLabel,
          formatter: (value: number) => (value >= 1000 ? `${(value / 1000)}k` : value.toString())
        }
      },
      {
        ...yAxisConfig,
        type: 'value',
        name: 'Page Views',
        position: 'right',
        nameTextStyle: {
          color: colors.value.muted,
          fontSize: 12
        },
        axisLabel: {
          ...yAxisConfig.axisLabel,
          formatter: (value: number) => (value >= 1000 ? `${(value / 1000)}k` : value.toString())
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: t('dashboard.visitors'),
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        symbol: 'none',
        symbolSize: 8,
        data: trendData.map(item => item.visitors),
        itemStyle: {
          color: chartColors.value[0],
          borderWidth: 3,
          borderColor: colors.value.background,
          shadowColor: chartColors.value[0] + '60',
          shadowBlur: 10,
          shadowOffsetY: 4
        },
        lineStyle: {
          color: chartColors.value[0],
          width: 2,
          shadowColor: chartColors.value[0] + '40',
          shadowBlur: 8,
          shadowOffsetY: 2
        },
        areaStyle: {
          color: createGradient(chartColors.value[0], 0.5)
        },
        animationDelay: (idx: number) => idx * 80
      },
      {
        name: t('dashboard.pageViews'),
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'none',
        symbolSize: 8,
        data: trendData.map(item => item.pageViews),
        itemStyle: {
          color: chartColors.value[1],
          borderWidth: 3,
          borderColor: colors.value.background,
          shadowColor: chartColors.value[1] + '60',
          shadowBlur: 10,
          shadowOffsetY: 4
        },
        lineStyle: {
          color: chartColors.value[1],
          width: 2,
          shadowColor: chartColors.value[1] + '40',
          shadowBlur: 8,
          shadowOffsetY: 2
        },
        areaStyle: {
          color: createGradient(chartColors.value[1], 0.8)
        },
        animationDelay: (idx: number) => idx * 80 + 40
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
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface ChartColors {
  primary: string
  secondary: string
  success: string
  warning: string
  destructive: string
  muted: string
  foreground: string
  background: string
  popover: string
  border: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
}

/**
 * 图表主题 composable
 * 统一管理图表的主题色彩和配置
 */
export function useChartTheme() {
  const colors = ref<ChartColors>({
    primary: 'hsl(220.9 39.3% 11%)',
    secondary: 'hsl(220.9 39.3% 11%)',
    success: 'hsl(142.1 76.2% 36.3%)',
    warning: 'hsl(47.9 95.8% 53.1%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    muted: 'hsl(220.9 39.3% 11%)',
    foreground: 'hsl(220.9 39.3% 11%)',
    background: 'hsl(0 0% 100%)',
    popover: 'hsl(0 0% 100%)',
    border: 'hsl(220 13% 91%)',
    chart1: 'hsl(12 76% 61%)',
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)'
  })

  /**
   * 验证颜色格式是否有效
   */
  const isValidColor = (color: string): boolean => {
    if (!color || typeof color !== 'string') return false
    
    // 检查常见的有效颜色格式
    const validFormats = [
      /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, // 十六进制
      /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, // RGB
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[01]?\.?\d*\s*\)$/, // RGBA
      /^hsl\(\s*\d+(\.\d+)?\s*\d+(\.\d+)?%\s*\d+(\.\d+)?%\s*\)$/, // HSL
      /^hsla\(\s*\d+(\.\d+)?\s*\d+(\.\d+)?%\s*\d+(\.\d+)?%\s*,\s*[01]?\.?\d*\s*\)$/, // HSLA
      /^oklch\([\d\s%.\/]+\)$/ // OKLCH
    ]
    
    return validFormats.some(format => format.test(color.trim()))
  }

  /**
   * 获取 CSS 变量颜色值
   */
  const getComputedColor = (cssVar: string): string => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement)
      const color = style.getPropertyValue(cssVar).trim()
      
      if (color) {
        // 如果颜色值已经是完整有效的格式，直接返回
        if (isValidColor(color)) {
          return color
        }
        
        // 如果是 HSL 空格分隔格式（如 "220.9 39.3% 11%"），包装为 hsl()
        if (color.includes('%') && !color.includes('(')) {
          const wrappedColor = `hsl(${color})`
          if (isValidColor(wrappedColor)) {
            return wrappedColor
          }
        }
        
        // 如果是命名颜色，尝试保持原样
        const namedColors = ['red', 'blue', 'green', 'white', 'black', 'gray', 'transparent']
        if (namedColors.some(name => color.toLowerCase().includes(name))) {
          return color
        }
      }
    }
    
    // 回退到默认颜色
    return 'hsl(220.9 39.3% 11%)'
  }

  /**
   * 将 OKLCH 颜色转换为 HSL 格式（ECharts 兼容）
   */
  const convertOklchToHsl = (oklchColor: string): string => {
    // 简单的回退方案：为 OKLCH 颜色提供近似的 HSL 值
    const oklchToHslMap: Record<string, string> = {
      // 基础颜色
      'oklch(0.985 0 0)': 'hsl(0 0% 98%)',             // 白色文字
      'oklch(0.145 0 0)': 'hsl(0 0% 15%)',             // 暗色背景
      'oklch(0.141 0.005 285.823)': 'hsl(286 5% 14%)', // 暗色背景变体
      'oklch(0.708 0 0)': 'hsl(0 0% 71%)',             // 中性灰色文字
      'oklch(0.269 0 0)': 'hsl(0 0% 27%)',             // 深灰色
      'oklch(0.205 0 0)': 'hsl(0 0% 21%)',             // 更深的灰色
      'oklch(0.554 0.046 257.417)': 'hsl(257 5% 55%)', // 蓝灰色
      'oklch(0.439 0 0)': 'hsl(0 0% 44%)',             // 中灰色
      'oklch(0.21 0.006 285.885)': 'hsl(286 1% 21%)',  // 卡片背景
      
      // 图表颜色
      'oklch(0.488 0.243 264.376)': 'hsl(264 61% 58%)', // 图表色1 (紫蓝)
      'oklch(0.696 0.17 162.48)': 'hsl(162 43% 65%)',   // 图表色2 (青绿)
      'oklch(0.769 0.188 70.08)': 'hsl(70 47% 72%)',    // 图表色3 (黄绿)
      'oklch(0.627 0.265 303.9)': 'hsl(304 67% 60%)',   // 图表色4 (紫红)
      'oklch(0.645 0.246 16.439)': 'hsl(16 62% 62%)',   // 图表色5 (橙红)
      
      // 亮色模式图表颜色
      'oklch(0.646 0.222 41.116)': 'hsl(41 57% 62%)',   // 橙色
      'oklch(0.6 0.118 184.704)': 'hsl(185 30% 58%)',   // 青色
      'oklch(0.398 0.07 227.392)': 'hsl(227 18% 40%)',  // 深蓝
      'oklch(0.828 0.189 84.429)': 'hsl(84 47% 78%)',   // 浅绿
    }
    
    return oklchToHslMap[oklchColor] || oklchColor
  }

  /**
   * 初始化主题色彩
   */
  const initializeColors = () => {
    const convertColor = (color: string) => 
      color.startsWith('oklch(') ? convertOklchToHsl(color) : color
    
    const colorMap: ChartColors = {
      primary: convertColor(getComputedColor('--primary')),
      secondary: convertColor(getComputedColor('--secondary')),
      success: convertColor(getComputedColor('--success') || 'hsl(142.1 76.2% 36.3%)'),
      warning: convertColor(getComputedColor('--warning') || 'hsl(47.9 95.8% 53.1%)'),
      destructive: convertColor(getComputedColor('--destructive')),
      muted: convertColor(getComputedColor('--muted-foreground')),
      foreground: convertColor(getComputedColor('--foreground')),
      background: convertColor(getComputedColor('--background')),
      popover: convertColor(getComputedColor('--popover')),
      border: convertColor(getComputedColor('--border')),
      chart1: convertColor(getComputedColor('--chart-1')),
      chart2: convertColor(getComputedColor('--chart-2')),
      chart3: convertColor(getComputedColor('--chart-3')),
      chart4: convertColor(getComputedColor('--chart-4')),
      chart5: convertColor(getComputedColor('--chart-5'))
    }
    
    // 在开发环境中验证颜色
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      Object.entries(colorMap).forEach(([key, value]) => {
        if (!isValidColor(value)) {
          console.warn(`[Chart Theme] Invalid color detected for ${key}: ${value}`)
        }
      })
    }
    
    colors.value = colorMap
  }

  /**
   * 图表颜色数组
   */
  const chartColors = computed(() => [
    colors.value.chart1,
    colors.value.chart2,
    colors.value.chart3,
    colors.value.chart4,
    colors.value.chart5
  ])

  /**
   * 获取响应式配置
   */
  const getResponsiveConfig = () => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false, isDesktop: true }
    
    const width = window.innerWidth
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024
    }
  }

  /**
   * 通用图表配置
   */
  const getCommonChartConfig = () => {
    const responsive = getResponsiveConfig()
    
    return {
      tooltip: {
        backgroundColor: colors.value.popover,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 8,
        padding: responsive.isMobile ? [8, 12] : [10, 14],
        textStyle: {
          color: colors.value.foreground,
          fontSize: responsive.isMobile ? 12 : 14,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif'
        },
        axisPointer: {
          lineStyle: {
            color: colors.value.border,
            width: 1,
            type: 'dashed'
          }
        }
      },
      legend: {
        textStyle: {
          color: colors.value.foreground,
          fontSize: responsive.isMobile ? 10 : 12,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif'
        },
        icon: 'roundRect',
        itemWidth: responsive.isMobile ? 10 : 12,
        itemHeight: responsive.isMobile ? 10 : 12,
        itemGap: responsive.isMobile ? 12 : 16
      },
      grid: {
        left: responsive.isMobile ? '5%' : '3%',
        right: responsive.isMobile ? '5%' : '4%',
        bottom: responsive.isMobile ? '5%' : '3%',
        top: responsive.isMobile ? '20%' : '15%',
        containLabel: true
      },
      animation: true,
      animationDuration: responsive.isMobile ? 800 : 1000,
      animationEasing: 'cubicOut' as const
    }
  }

  /**
   * 轴配置
   */
  const getAxisConfig = (isCategory = false) => {
    const responsive = getResponsiveConfig()
    
    return {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: colors.value.muted,
        fontSize: responsive.isMobile ? 10 : 12,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        margin: isCategory ? (responsive.isMobile ? 6 : 8) : (responsive.isMobile ? 8 : 12),
        rotate: responsive.isMobile && isCategory ? 45 : 0,
        interval: responsive.isMobile && isCategory ? 'auto' : 0
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: colors.value.border,
          width: 1,
          type: 'solid',
          opacity: 0.1
        }
      }
    }
  }

  /**
   * 创建渐变色
   */
  const createGradient = (color: string, opacity = 0.8) => {
    // 处理不同颜色格式
    const createColorWithOpacity = (baseColor: string, alpha: number) => {
      // 如果已经是带透明度的颜色，直接返回
      if (baseColor.startsWith('hsla(') || baseColor.startsWith('rgba(')) {
        return baseColor
      }
      
      if (baseColor.startsWith('hsl(')) {
        // 将 hsl() 转换为 hsla()
        const hslValues = baseColor.match(/hsl\(([^)]+)\)/)
        if (hslValues) {
          return `hsla(${hslValues[1]}, ${alpha})`
        }
      } else if (baseColor.startsWith('#')) {
        // 十六进制颜色，转换为 rgba
        const hex = baseColor.replace('#', '')
        let r, g, b
        
        if (hex.length === 3) {
          // 3位十六进制，如 #f0f
          r = parseInt(hex[0] + hex[0], 16)
          g = parseInt(hex[1] + hex[1], 16)
          b = parseInt(hex[2] + hex[2], 16)
        } else if (hex.length === 6) {
          // 6位十六进制，如 #ff00ff
          r = parseInt(hex.substr(0, 2), 16)
          g = parseInt(hex.substr(2, 2), 16)
          b = parseInt(hex.substr(4, 2), 16)
        } else {
          // 无效格式，使用默认灰色
          return `rgba(128, 128, 128, ${alpha})`
        }
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
      } else if (baseColor.startsWith('rgb(')) {
        // 将 rgb() 转换为 rgba()
        const rgbValues = baseColor.match(/rgb\(([^)]+)\)/)
        if (rgbValues) {
          return `rgba(${rgbValues[1]}, ${alpha})`
        }
      }
      
      // 对于其他格式（命名颜色等），使用默认的灰色透明
      return `rgba(128, 128, 128, ${alpha})`
    }

    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: color },
        { offset: 1, color: createColorWithOpacity(color, 1 - opacity) }
      ]
    }
  }

  /**
   * 获取响应式高度
   */
  const getResponsiveHeight = (baseHeight = 300) => {
    const responsive = getResponsiveConfig()
    if (responsive.isMobile) return Math.max(baseHeight * 0.8, 250)
    if (responsive.isTablet) return Math.max(baseHeight * 0.9, 280)
    return baseHeight
  }

  /**
   * 获取响应式字体大小配置
   */
  const getResponsiveFontSizes = () => {
    const responsive = getResponsiveConfig()
    
    return {
      title: responsive.isMobile ? 14 : 16,
      subtitle: responsive.isMobile ? 12 : 14,
      axis: responsive.isMobile ? 10 : 12,
      legend: responsive.isMobile ? 10 : 12,
      tooltip: responsive.isMobile ? 12 : 14,
      label: responsive.isMobile ? 10 : 12
    }
  }

  // 立即初始化颜色（避免延迟）
  if (typeof window !== 'undefined') {
    initializeColors()
  }

  onMounted(() => {
    // 再次初始化确保获取最新颜色
    initializeColors()
    
    // 监听主题变化
    const observer = new MutationObserver(() => {
      initializeColors()
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })
    
    // 在组件卸载时清理监听器
    onUnmounted(() => {
      observer.disconnect()
    })
  })

  return {
    colors: computed(() => colors.value),
    chartColors,
    getCommonChartConfig,
    getAxisConfig,
    createGradient,
    getResponsiveConfig,
    getResponsiveHeight,
    getResponsiveFontSizes,
    initializeColors
  }
} 
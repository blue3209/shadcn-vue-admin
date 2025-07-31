<template>
  <div ref="vditorRef" class="vditor-editor" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

// Props 定义
interface Props {
  /** 编辑器内容 */
  modelValue?: string
  /** 编辑模式 */
  mode?: 'wysiwyg' | 'ir' | 'sv'
  /** 主题 */
  theme?: 'classic' | 'dark'
  /** 编辑器高度 */
  height?: number | string
  /** 占位符 */
  placeholder?: string
  /** 是否启用缓存 */
  cache?: boolean
  /** 缓存ID */
  cacheId?: string
  /** 是否启用上传 */
  upload?: boolean
  /** 是否启用工具栏 */
  toolbar?: boolean
  /** 是否启用计数器 */
  counter?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** CDN地址 */
  cdn?: string
  /** 是否启用打字机模式 */
  typewriterMode?: boolean
  /** 是否启用大纲 */
  outline?: boolean
  /** 是否自动跟随系统主题 */
  autoTheme?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  mode: 'ir',
  theme: 'classic',
  height: 'auto',
  placeholder: '请输入内容...',
  cache: true,
  cacheId: 'vditor-cache',
  upload: true,
  toolbar: true,
  counter: true,
  readonly: false,
  cdn: 'https://unpkg.com/vditor@3.11.1',
  typewriterMode: false,
  outline: false,
  autoTheme: true
})

// Emits 定义
interface Emits {
  /** 内容更新 */
  'update:modelValue': [value: string]
  /** 输入事件 */
  'input': [value: string]
  /** 获得焦点 */
  'focus': [value: string]
  /** 失去焦点 */
  'blur': [value: string]
  /** 初始化完成 */
  'ready': []
  /** 选中文本 */
  'select': [value: string]
  /** ESC按键 */
  'esc': [value: string]
  /** Ctrl+Enter按键 */
  'ctrlEnter': [value: string]
}

const emit = defineEmits<Emits>()

// 组件状态
const vditorRef = ref<HTMLElement>()
const vditorInstance = ref<Vditor>()
const isReady = ref(false)

// 系统主题监听
const colorMode = useColorMode()

// 国际化
const { locale } = useI18n()

// 计算最终的主题
const finalTheme = computed(() => {
  if (props.autoTheme) {
    // 自动跟随系统主题：light/auto -> classic, dark -> dark
    return colorMode.value === 'dark' ? 'dark' : 'classic'
  }
  // 使用用户指定的主题
  return props.theme
})

// 计算 Vditor 语言
const vditorLang = computed(() => {
  // 将项目语言格式转换为 Vditor 支持的格式
  switch (locale.value) {
    case 'zh':
      return 'zh_CN'
    case 'en':
      return 'en_US'
    default:
      return 'en_US'
  }
})

// 工具栏配置
const getToolbarConfig = () => {
  if (!props.toolbar) return undefined
  
  const toolbar = [
    'emoji',
    'headings',
    'bold',
    'italic',
    'strike',
    '|',
    'line',
    'quote',
    'list',
    'ordered-list',
    'check',
    '|',
    'code',
    'inline-code',
    '|',
    'table',
    'link'
  ]
  
  if (props.upload) {
    toolbar.push('|', 'upload')
  }
  
  toolbar.push(
    '|',
    'edit-mode',
    'both',
    'preview',
    'fullscreen'
  )
  
  if (props.outline) {
    toolbar.push('|', 'outline')
  }
  
  toolbar.push(
    'export',
    '|',
    'code-theme',
    'content-theme',
    '|',
    'help'
  )
  
  return toolbar
}

// 初始化编辑器
const initEditor = async () => {
  if (!vditorRef.value) return
  
  await nextTick()
  
  try {
    vditorInstance.value = new Vditor(vditorRef.value, {
      height: props.height,
      mode: props.mode,
      theme: finalTheme.value,
      value: props.modelValue,
      placeholder: props.placeholder,
      cdn: props.cdn,
      lang: vditorLang.value,
      typewriterMode: props.typewriterMode,
      preview: {
        theme: {
          current: finalTheme.value === 'dark' ? 'dark' : 'light'
        },
        hljs: {
          enable: true,
          lineNumber: true,
          style: finalTheme.value === 'dark' ? 'github-dark' : 'github'
        },
        markdown: {
          toc: true,
          footnotes: true,
          codeBlockPreview: true,
          mathBlockPreview: true
        },
        render: {
          media: {
            enable: true
          }
        },
        actions: ['desktop', 'tablet', 'mobile', 'mp-wechat', 'zhihu']
      },
      toolbar: getToolbarConfig(),
      counter: props.counter ? {
        enable: true,
        type: 'markdown'
      } : undefined,
      toolbarConfig: {
        pin: true
      },
      cache: props.cache ? {
        enable: true,
        id: props.cacheId
      } : { enable: false },
      input: (value: string) => {
        emit('update:modelValue', value)
        emit('input', value)
      },
      focus: (value: string) => {
        emit('focus', value)
      },
      blur: (value: string) => {
        emit('blur', value)
      },
      select: (value: string) => {
        emit('select', value)
      },
      esc: (value: string) => {
        emit('esc', value)
      },
      ctrlEnter: (value: string) => {
        emit('ctrlEnter', value)
      },
      after: () => {
        isReady.value = true
        emit('ready')
        
        console.log('✅ Vditor 编辑器初始化完成')
        
        // 延迟渲染，确保编辑器完全初始化
        setTimeout(() => {
          renderContent()
        }, 500)
      }
    })
    
    // 设置只读模式
    if (props.readonly) {
      vditorInstance.value.disabled()
    }
    
  } catch (error) {
    console.error('Vditor 初始化失败:', error)
  }
}

// 渲染内容
const renderContent = () => {
  if (!vditorRef.value || !isReady.value) return
  
  try {
    console.log('🎨 开始渲染内容...')
    
    // 基础渲染功能（无需CDN）
    Vditor.mediaRender(vditorRef.value)
    Vditor.mathRender(vditorRef.value)
    
    console.log('✅ 基础渲染完成')
    // 需要CDN的高级渲染功能
    if (props.cdn) {
      console.log('🔄 开始高级渲染功能...')
      
      // 使用 requestAnimationFrame 确保DOM更新完成
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            // 确保元素存在
            if (!vditorRef.value) return
            
            // 图表渲染
            if (typeof Vditor.chartRender === 'function') {
              console.log('📊 渲染图表...')
              Vditor.chartRender(vditorRef.value, props.cdn, finalTheme.value)
            }
            
                        // 脑图渲染
            if (typeof Vditor.mindmapRender === 'function' && vditorRef.value) {
              console.log('🧠 渲染脑图...')
              Vditor.mindmapRender(vditorRef.value, props.cdn, finalTheme.value)
            }
            
            // 流程图渲染
            if (typeof Vditor.mermaidRender === 'function' && vditorRef.value) {
              console.log('🌊 渲染流程图...')
              Vditor.mermaidRender(vditorRef.value, props.cdn, finalTheme.value)
            }
            
            // Graphviz 渲染
            if (typeof Vditor.graphvizRender === 'function' && vditorRef.value) {
              console.log('🔀 渲染 Graphviz...')
              Vditor.graphvizRender(vditorRef.value, props.cdn)
            }
            
            // PlantUML 渲染
            if (typeof Vditor.plantumlRender === 'function' && vditorRef.value) {
              console.log('🌱 渲染 PlantUML...')
              Vditor.plantumlRender(vditorRef.value, props.cdn)
            }
            
            // 五线谱渲染
            if (typeof Vditor.abcRender === 'function' && vditorRef.value) {
              console.log('🎵 渲染五线谱...')
              Vditor.abcRender(vditorRef.value, props.cdn)
            }
            
            console.log('✅ 高级渲染完成')
          } catch (renderError) {
            console.error('❌ 高级渲染功能失败:', renderError)
            // 尝试重新渲染一次
            setTimeout(() => {
              try {
                console.log('🔄 尝试重新渲染...')
                if (typeof Vditor.mermaidRender === 'function' && vditorRef.value) {
                  Vditor.mermaidRender(vditorRef.value, props.cdn, finalTheme.value)
                }
              } catch (retryError) {
                console.error('❌ 重试渲染失败:', retryError)
              }
            }, 1000)
          }
        }, 200)
      })
    }
  } catch (error) {
    console.error('❌ 基础渲染失败:', error)
  }
}

// 编辑器方法
const getValue = (): string => {
  return vditorInstance.value?.getValue() || ''
}

const setValue = (content: string) => {
  vditorInstance.value?.setValue(content)
}

const insertValue = (content: string) => {
  vditorInstance.value?.insertValue(content)
}

const focus = () => {
  vditorInstance.value?.focus()
}

const blur = () => {
  vditorInstance.value?.blur()
}

const disabled = () => {
  vditorInstance.value?.disabled()
}

const enable = () => {
  vditorInstance.value?.enable()
}

const getHTML = (): string => {
  return vditorInstance.value?.getHTML() || ''
}

const clearCache = () => {
  vditorInstance.value?.clearCache()
}

const getCursorPosition = () => {
  return vditorInstance.value?.getCursorPosition()
}

const isUploading = (): boolean => {
  return vditorInstance.value?.isUploading() || false
}

const deleteValue = () => {
  vditorInstance.value?.deleteValue()
}

const updateValue = (value: string) => {
  vditorInstance.value?.updateValue(value)
}

const getSelection = (): string => {
  return vditorInstance.value?.getSelection() || ''
}

const renderPreview = (value?: string) => {
  vditorInstance.value?.renderPreview(value)
}

const clearStack = () => {
  vditorInstance.value?.clearStack()
}

const destroy = () => {
  if (vditorInstance.value) {
    vditorInstance.value.destroy()
    isReady.value = false
  }
}

const refresh = () => {
  if (vditorInstance.value) {
    destroy()
    initEditor()
  }
}

// 手动触发重新渲染
const forceRenderContent = () => {
  console.log('🔄 手动触发内容重新渲染')
  renderContent()
}

// 监听器
watch(() => props.modelValue, (newValue) => {
  if (vditorInstance.value && newValue !== getValue()) {
    setValue(newValue || '')
  }
})

watch(() => props.readonly, (newValue) => {
  if (vditorInstance.value) {
    if (newValue) {
      disabled()
    } else {
      enable()
    }
  }
})

// 监听主题、模式、语言变化时重新初始化
watch([finalTheme, () => props.mode, vditorLang], () => {
  if (isReady.value) {
    console.log('🔄 检测到配置变化，重新初始化编辑器...')
    console.log('当前主题:', finalTheme.value)
    console.log('当前语言:', vditorLang.value)
    refresh()
  }
}, { deep: true })

// 监听系统主题变化
watch(colorMode, () => {
  if (props.autoTheme && isReady.value) {
    console.log('🎨 系统主题变化:', colorMode.value)
    refresh()
  }
})

// 监听语言变化
watch(locale, (newLocale) => {
  if (isReady.value) {
    console.log('🌍 语言变化:', newLocale, '-> Vditor 语言:', vditorLang.value)
    refresh()
  }
})

// 生命周期
onMounted(() => {
  initEditor()
})

onUnmounted(() => {
  destroy()
})

// 暴露方法
defineExpose({
  // 基础方法
  getValue,
  setValue,
  insertValue,
  focus,
  blur,
  disabled,
  enable,
  getHTML,
  clearCache,
  getCursorPosition,
  isUploading,
  deleteValue,
  updateValue,
  getSelection,
  renderPreview,
  clearStack,
  
  // 组件方法
  destroy,
  refresh,
  renderContent,
  forceRenderContent,
  
  // 状态
  isReady,
  finalTheme,
  vditorLang,
  
  // 原始实例
  vditor: vditorInstance
})
</script>

<style scoped>
.vditor-editor {
  width: 100%;
  height: 100%;
}

/* 确保编辑器样式正确应用 */
:deep(.vditor) {
  border: none;
}

:deep(.vditor-content) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
</style>
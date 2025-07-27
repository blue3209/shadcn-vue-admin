<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

import { appearanceValidator } from '../validators/appearance.validator'

const appearanceFormSchema = toTypedSchema(appearanceValidator)

// Get current color mode
const mode = useColorMode()

// Font settings
const currentFont = ref<'inter' | 'manrope' | 'system'>('inter')

// Get i18n instance
const { t } = useI18n()

// Get current theme (only supports light/dark, excludes auto)
function getCurrentTheme() {
  const currentMode = mode.value
  return currentMode === 'auto' ? 'light' : currentMode
}

// Font mapping function
function getFontFamily(font: string) {
  switch (font) {
    case 'inter':
      return 'Inter, system-ui, sans-serif'
    case 'manrope':
      return 'Manrope, system-ui, sans-serif'
    case 'system':
      return 'system-ui, sans-serif'
    default:
      return 'Inter, system-ui, sans-serif'
  }
}

// Initialize form values
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: appearanceFormSchema,
  initialValues: {
    theme: getCurrentTheme(),
    font: currentFont.value,
  },
})

// Initialize on component mount
onMounted(() => {
  // Set initial theme
  setFieldValue('theme', getCurrentTheme())

  // Set initial font
  const savedFont = localStorage.getItem('app-font') as 'inter' | 'manrope' | 'system' | null
  const fontToUse = savedFont && ['inter', 'manrope', 'system'].includes(savedFont) ? savedFont : 'inter'
  currentFont.value = fontToUse
  setFieldValue('font', fontToUse)
  // Removed: document.documentElement.style.fontFamily = getFontFamily(fontToUse) to make it button-triggered
})

const onSubmit = handleSubmit((values) => {
  // Save font settings to localStorage
  localStorage.setItem('app-font', values.font)

  // Apply theme
  if (values.theme === 'light' || values.theme === 'dark') {
    mode.value = values.theme
  }

  // Apply font
  document.documentElement.style.fontFamily = getFontFamily(values.font)
  
  toast(t('common.preferencesUpdated'), {
    description: t('common.preferencesUpdatedDescription'),
  })
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      {{ $t('common.appearance') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ $t('common.appearanceDescription') }}
    </p>
  </div>
  <Separator class="my-4" />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="font">
      <FormItem>
        <FormLabel>{{ $t('common.font') }}</FormLabel>
        <UiSelect v-bind="componentField">
          <UiFormControl>
            <UiSelectTrigger>
              <UiSelectValue :placeholder="$t('common.selectFont')" />
            </UiSelectTrigger>
          </UiFormControl>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem value="inter">
                {{ $t('common.inter') }}
              </UiSelectItem>
              <UiSelectItem value="manrope">
                {{ $t('common.manrope') }}
              </UiSelectItem>
              <UiSelectItem value="system">
                {{ $t('common.system') }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
        <FormDescription>
          {{ $t('common.fontDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" type="radio" name="theme">
      <FormItem class="space-y-1">
        <FormLabel>{{ $t('common.theme') }}</FormLabel>
        <FormDescription>
          {{ $t('common.themeDescription') }}
        </FormDescription>
        <FormMessage />

        <RadioGroup
          class="grid max-w-md grid-cols-2 gap-8 pt-2"
          v-bind="componentField"
        >
          <FormItem>
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary flex flex-col">
              <FormControl>
                <RadioGroupItem value="light" class="sr-only" />
              </FormControl>
              <div class="items-center p-1 border-2 rounded-md border-muted hover:border-accent">
                <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div class="p-2 space-y-2 bg-white rounded-md shadow-xs">
                    <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 bg-white rounded-md shadow-xs">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 bg-white rounded-md shadow-xs">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 font-normal text-center">
                {{ $t('common.light') }}
              </span>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary flex flex-col">
              <FormControl>
                <RadioGroupItem value="dark" class="sr-only" />
              </FormControl>
              <div class="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
                <div class="p-2 space-y-2 rounded-sm bg-slate-950">
                  <div class="p-2 space-y-2 rounded-md shadow-xs bg-slate-800">
                    <div class="w-20 h-2 rounded-lg bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 rounded-md shadow-xs bg-slate-800">
                    <div class="size-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 rounded-md shadow-xs bg-slate-800">
                    <div class="size-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 font-normal text-center">
                {{ $t('common.dark') }}
              </span>
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit">
        {{ $t('common.updatePreferences') }}
      </Button>
    </div>
  </form>
</template>

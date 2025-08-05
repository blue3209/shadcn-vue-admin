<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icon } from '@iconify/vue'
import { Languages } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { locale } = useI18n()
const open = ref(false)

const selectLanguage = (newLocale: string) => {
  locale.value = newLocale
  open.value = false
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button variant="ghost" size="icon" class="relative rounded-full">
              <Languages />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" class="w-40 p-2">
            <div class="space-y-2">
              <div class="text-sm font-medium text-muted-foreground px-2 py-1">
                {{ $t('changeLanguage') }}
              </div>
              <div class="border-t"></div>
              <button @click="selectLanguage('en')"
                class="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                :class="{ 'bg-accent text-accent-foreground': locale === 'en' }">
                <Icon icon="flag:us-4x3" class="w-4 h-4" />
                <span>English</span>
              </button>
              <button @click="selectLanguage('zh')"
                class="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                :class="{ 'bg-accent text-accent-foreground': locale === 'zh' }">
                <Icon icon="flag:cn-4x3" class="w-4 h-4" />
                <span>中文</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{{ $t('changeLanguage') }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { Moon, Sun, SunMoon } from 'lucide-vue-next'
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
import { Button } from '@/components/ui/button'

const mode = useColorMode()
const open = ref(false)

const selectTheme = (newMode: 'light' | 'dark' | 'auto') => {
  mode.value = newMode
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
              <Moon class=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Sun class="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">{{ $t('common.toggleTheme') }}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" class="w-40 p-2">
            <div class="space-y-2">
              <div class="text-sm font-medium text-muted-foreground px-2 py-1">
                {{ $t('common.toggleTheme') }}
              </div>
              <div class="border-t"></div>
              <button @click="selectTheme('light')"
                class="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                :class="{ 'bg-accent text-accent-foreground': mode === 'light' }">
                <Sun class="w-4 h-4" />
                <span>{{ $t('common.light') }}</span>
              </button>
              <button @click="selectTheme('dark')"
                class="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                :class="{ 'bg-accent text-accent-foreground': mode === 'dark' }">
                <Moon class="w-4 h-4" />
                <span>{{ $t('common.dark') }}</span>
              </button>
              <button @click="selectTheme('auto')"
                class="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                :class="{ 'bg-accent text-accent-foreground': mode === 'auto' }">
                <SunMoon class="w-4 h-4" />
                <span>{{ $t('common.system') }}</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{{ $t('common.toggleTheme') }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

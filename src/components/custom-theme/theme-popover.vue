<script lang="ts" setup>
import { ref } from 'vue'
import { Paintbrush } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
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

import CustomColor from './custom-color.vue'
import CustomRadius from './custom-radius.vue'
import CustomThemeTitle from './custom-theme-title.vue'
import ToggleColorMode from './toggle-color-mode.vue'

const open = ref(false)
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button variant="ghost" size="icon" class="relative rounded-full">
              <Paintbrush />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <CustomThemeTitle />
            <CustomColor />
            <CustomRadius />
            <ToggleColorMode />
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{{ $t('common.customize') }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped></style>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'

import CommandChangeTheme from './command-change-theme.vue'
import CommandToPage from './command-to-page.vue'

const open = ref(false)

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

function handleOpenChange() {
  open.value = !open.value
}

const firstKey = computed(() => navigator?.userAgent.includes('Mac OS') ? '⌘' : 'Ctrl')
</script>

<template>
  <div>
    <div
      class="text-sm flex items-center justify-between text-muted-foreground border border-border bg-muted/5 px-4 py-2 rounded-md min-w-[220px] cursor-pointer"
      @click="handleOpenChange"
    >
      <div class="flex items-center gap-2">
        <Search class="size-4" />
        <span class="text-xs font-semibold text-muted-foreground">{{ $t('common.searchMenu') }}</span>
      </div>
      <kbd
        class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span class="text-xs">{{ firstKey }}</span>K
      </kbd>
    </div>

    <UiCommandDialog v-model:open="open">
      <UiCommandInput :placeholder="$t('common.typeCommand')" />
      <UiCommandList>
        <UiCommandEmpty>
          {{ $t('common.noResultsFound') }}
        </UiCommandEmpty>

        <CommandToPage @click="handleOpenChange" />
        <UiCommandSeparator />
        <CommandChangeTheme @click="handleOpenChange" />
      </UiCommandList>
    </UiCommandDialog>
  </div>
</template>

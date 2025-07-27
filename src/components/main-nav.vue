<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { cn } from '@/lib/utils'

const { t } = useI18n()

// 通用的导航链接样式
const navLinkClass = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
const activeLinkClass = "text-foreground"
</script>

<template>
    <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
        <router-link 
            to="/dashboard" 
            :class="navLinkClass"
            :active-class="activeLinkClass"
            :exact-active-class="activeLinkClass"
        >
            {{ t('common.overview') }}
        </router-link>
        <router-link 
            to="/users"
            :class="navLinkClass"
            :active-class="activeLinkClass"
            :exact-active-class="activeLinkClass"
        >
            {{ t('common.customers') }}
        </router-link>
        <router-link 
            to="/apps"
            :class="navLinkClass"
            :active-class="activeLinkClass"
            :exact-active-class="activeLinkClass"
        >
            {{ t('common.products') }}
        </router-link>
        <router-link 
            to="/settings"
            :class="navLinkClass"
            :active-class="activeLinkClass"
            :exact-active-class="activeLinkClass"
        >
            {{ t('common.settings') }}
        </router-link>
    </nav>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AuthTitle from './components/auth-title.vue'

const { t } = useI18n()

const handleSubmit = (event: Event) => {
  event.preventDefault()
  // TODO: Implement forgot password logic
  console.log('Forgot password submitted')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4 min-w-screen">
    <main class="flex flex-col gap-4">
      <AuthTitle />
      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-2xl">
            {{ t('auth.forgotPasswordTitle') }}
          </UiCardTitle>
          <UiCardDescription>
            {{ t('auth.forgotPasswordDescription') }}
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form @submit="handleSubmit" class="grid gap-4">
            <div class="grid gap-2">
              <UiLabel for="email">
                {{ t('auth.email') }}
              </UiLabel>
              <UiInput id="email" type="email" :placeholder="t('auth.emailPlaceholder')" autocomplete="email" required />
            </div>
            <UiButton type="submit" class="w-full">
              {{ t('auth.continue') }}
            </UiButton>
          </form>
        </UiCardContent>
        <UiCardFooter class="flex flex-col gap-2">

          <div>
            {{ t('auth.dontHaveAccount') }}
            <UiButton
              variant="link" class="px-0 text-muted-foreground"
              @click="$router.push('/auth/sign-up')"
            >
              {{ t('auth.signUpLink') }}
            </UiButton>
          </div>
        </UiCardFooter>
      </UiCard>
    </main>
  </div>
</template>

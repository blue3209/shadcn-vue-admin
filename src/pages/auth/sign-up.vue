<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AuthTitle from './components/auth-title.vue'
import GitHubButton from './components/github-button.vue'
import GoogleButton from './components/google-button.vue'
import PrivacyPolicyButton from './components/privacy-policy-button.vue'
import TermsOfServiceButton from './components/terms-of-service-button.vue'

const { t } = useI18n()

const handleSubmit = (event: Event) => {
  event.preventDefault()
  // TODO: Implement sign up logic
  console.log('Sign up submitted')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4 min-w-screen">
    <main class="flex flex-col gap-4">
      <AuthTitle />
      <UiCard class="max-w-sm mx-auto">
        <UiCardHeader>
          <UiCardTitle class="text-xl">
            {{ t('auth.signUpTitle') }}
          </UiCardTitle>
          <UiCardDescription>
            {{ t('auth.signUpDescription') }}
            {{ t('auth.alreadyHaveAccount') }}
            <UiButton
              variant="link" class="px-0 text-muted-foreground"
              @click="$router.push('/auth/login')"
            >
              {{ t('common.signIn') }}
            </UiButton>
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form @submit="handleSubmit" class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <UiLabel for="first-name">
                  {{ t('auth.firstName') }}
                </UiLabel>
                <UiInput id="first-name" :placeholder="t('auth.firstNamePlaceholder')" autocomplete="given-name" required />
              </div>
              <div class="grid gap-2">
                <UiLabel for="last-name">
                  {{ t('auth.lastName') }}
                </UiLabel>
                <UiInput id="last-name" :placeholder="t('auth.lastNamePlaceholder')" autocomplete="family-name" required />
              </div>
            </div>
            <div class="grid gap-2">
              <UiLabel for="email">
                {{ t('auth.email') }}
              </UiLabel>
              <UiInput
                id="email"
                type="email"
                :placeholder="t('auth.emailPlaceholder')"
                autocomplete="email"
                required
              />
            </div>
            <div class="grid gap-2">
              <UiLabel for="password">
                {{ t('auth.password') }}
              </UiLabel>
              <UiInput id="password" type="password" :placeholder="t('auth.passwordPlaceholder')" autocomplete="new-password" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="confirm-password">
                {{ t('auth.confirmPassword') }}
              </UiLabel>
              <UiInput id="confirm-password" type="password" :placeholder="t('auth.passwordPlaceholder')" autocomplete="new-password" />
            </div>
            <UiButton type="submit" class="w-full">
              {{ t('auth.createAccount') }}
            </UiButton>
          </form>

          <UiSeparator :label="t('auth.orContinueWith')" />

          <div class="flex flex-col items-center justify-between gap-4">
            <GitHubButton />
            <GoogleButton />
          </div>

          <UiCardDescription>
            {{ t('auth.byCreatingAccount') }}
            <TermsOfServiceButton />
            {{ t('auth.and') }}
            <PrivacyPolicyButton />
          </UiCardDescription>
        </UiCardContent>
      </UiCard>
    </main>
  </div>
</template>

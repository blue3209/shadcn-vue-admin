<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AuthTitle from './components/auth-title.vue'

const { t } = useI18n()

const value = ref<string[]>([])

function handleComplete(e: string[]) {
  // eslint-disable-next-line no-alert
  alert(e.join(''))
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
  // TODO: Implement OTP verification logic
  console.log('OTP verification submitted')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4 min-w-screen">
    <main class="flex flex-col gap-4">
      <AuthTitle />
      <UiCard class="w-full max-w-sm">
        <UiCardHeader>
          <UiCardTitle class="text-2xl">
            {{ t('auth.otpTitle') }}
          </UiCardTitle>
          <UiCardDescription>
            {{ t('auth.otpDescription') }}
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form @submit="handleSubmit" class="grid gap-4">
            <div class="grid items-center justify-center gap-2">
              <UiPinInput
                id="pin-input"
                v-model="value"
                placeholder="○"
                @complete="handleComplete"
              >
                <span class="text-xl">SA</span>
                <span>-</span>
                <UiPinInputGroup>
                  <UiPinInputInput
                    v-for="(id, index) in 6"
                    :key="id"
                    :index="index"
                  />
                </UiPinInputGroup>
              </UiPinInput>
            </div>
            <UiButton type="submit" class="w-full" :disabled="value.length < 6">
              {{ t('auth.verify') }}
            </UiButton>
          </form>
        </UiCardContent>
        <UiCardFooter class="flex flex-col gap-2">

          <UiCardDescription>
            {{ t('auth.haventReceived') }}
            <UiButton variant="link" class="px-0 text-muted-foreground">
              {{ t('auth.resendCode') }}
            </UiButton>
          </UiCardDescription>
        </UiCardFooter>
      </UiCard>
    </main>
  </div>
</template>

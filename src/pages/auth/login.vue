<script setup lang="ts">
import AuthTitle from './components/auth-title.vue'
import LoginForm from './components/login-form.vue'
</script>

<template>
  <div class="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="relative hidden bg-muted lg:flex lg:items-center lg:justify-center">
      <img
        src="/placeholder.png"
        alt="Image"
        width="640"
        height="640"
        class="object-cover dark:brightness-[0.8]"
      >
      <AuthTitle class="absolute z-10 left-8 top-8" />
    </div>

    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[380px] gap-6 items-center justify-center">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<template>
  <header class="bg-white shadow-md px-6 py-3 flex items-center justify-between">
    <AppLogo />

    <div class="flex items-center space-x-4">
      <AppUserButton />
      <AppCartButton />
    </div>
  </header>
</template>

<script setup lang="ts">
import AppCartButton from '@/components/AppCartButton.vue'
import AppUserButton from '@/components/AppUserButton.vue'
import AppLogo from '@/components/AppLogo.vue'
</script>

<style scoped></style>

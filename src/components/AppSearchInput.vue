<template>
  <label class="relative">
    <MagnifyingGlassIcon
      class="h-6 w-6 text-gray-700 absolute inset-y-1/2 left-2 -translate-y-1/2"
    />
    <input
      type="text"
      placeholder="Search..."
      class="w-full px-4 pl-9"
    />
  </label>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped></style>

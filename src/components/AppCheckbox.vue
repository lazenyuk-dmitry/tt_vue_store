<template>
  <label class="inline-flex items-center gap-2 cursor-pointer select-none">
    <input v-model="modelValue" type="checkbox" class="sr-only peer" />
    <span
      class="w-6 h-6 rounded-md border border-gray-300 bg-white flex items-center justify-center transition-all duration-150 ease-in-out peer-checked:bg-indigo-600 peer-checked:[&>svg]:opacity-100"
      aria-hidden="true"
    >
      <CheckIcon class="w-4 h-4 text-white opacity-0" />
    </span>
    <span class="text-sm text-gray-700">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'

defineProps<{
  name: string
}>()

const modelValue = defineModel({ default: false })
</script>

<style scoped></style>

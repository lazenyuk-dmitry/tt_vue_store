<template>
  <div class="inline-flex items-center rounded-lg overflow-hidden border border-gray-300">
    <button
      @click="$emit('update:modelValue', Math.max(1, modelValue - 1))"
      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold"
    >
      -
    </button>
    <span class="w-10 text-center font-medium bg-white">{{ modelValue }}</span>
    <button
      @click="$emit('update:modelValue', modelValue + 1)"
      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel({ default: 1 })

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

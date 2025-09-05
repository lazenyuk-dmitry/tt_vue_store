<template>
  <label class="block">
    <select v-model="modelValue" class="w-full pl-3 py-2">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
}

interface Props {
  options?: Option[]
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Select...',
})

const modelValue = defineModel()
</script>

<style scoped></style>

<template>
  <div
    class="w-10 h-10 rounded-full border hover:bg-gray-100 transition relative group"
    :aria-label="user?.name"
    aria-haspopup="true"
  >
    <img
      :src="user?.avatar"
      :alt="user?.name"
      class="w-full h-full rounded-full overflow-hidden object-cover"
    />

    <span
      class="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition whitespace-nowrap"
      role="tooltip"
    >
      {{ user?.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { toRefs } from 'vue'

const auth = useAuth()
const { user } = toRefs(auth)
</script>

<style scoped></style>

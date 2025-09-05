<template>
  <div class="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />

    <div class="flex-1 min-w-0">
      <h3 class="font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
        {{ item.name }}
      </h3>
      <p class="text-gray-600 font-semibold">{{ item.qty }} шт.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartProduct } from '@/api/types/cart'

defineProps<{
  item: CartProduct
}>()
</script>

<style scoped></style>

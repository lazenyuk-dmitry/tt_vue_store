<template>
  <div class="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
    <RouterLink :to="productRout">
      <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
    </RouterLink>

    <div class="flex-1 min-w-0">
      <h3 class="font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
        <RouterLink :to="productRout">{{ item.name }}</RouterLink>
      </h3>
      <p class="text-gray-600 font-semibold">{{ item.qty }} шт.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartProduct } from '@/api/types/cart'
import AppProductCounter from './AppProductCounter.vue'
import { useCart } from '@/store/useCart'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import AppProductTag from './AppProductTag.vue'

const props = defineProps<{
  item: CartProduct
}>()

const cartStore = useCart()

const productRout = computed(() => ({
  name: 'product',
  params: { id: props.item.id },
}))
</script>

<style scoped></style>

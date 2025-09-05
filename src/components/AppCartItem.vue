<template>
  <div class="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
    <RouterLink :to="productRout">
      <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
    </RouterLink>

    <div class="flex-1">
      <h3 class="font-semibold">
        <RouterLink :to="productRout">{{ item.name }}</RouterLink>
      </h3>
      <p class="text-gray-600 font-semibold">{{ item.price }}$ за шт.</p>
      <p class="text-sm text-gray-500 font-semibold">
        <span class="capitalize">{{ item.rarity }}</span>
        |
        <span :class="item.inStock ? 'text-green-600' : 'text-red-600'">
          {{ item.inStock ? 'В наличии' : 'Нет в наличии' }}
        </span>
      </p>
      <div class="flex flex-wrap gap-1 mt-1">
        <AppProductTag
          v-for="tag in item.tags"
          :key="tag"
          class="px-2 py-0.5 text-xs rounded-full bg-gray-200"
        >
          {{ tag }}
        </AppProductTag>
      </div>
    </div>

    <!-- управление количеством -->
    <div class="flex items-center gap-2">
      <AppProductCounter :item="item" />
    </div>

    <!-- сумма по товару -->
    <div class="w-20 text-right font-semibold">{{ item.price * item.qty }} $</div>

    <button class="text-red-500 hover:text-red-700 ml-4" @click="cartStore.remove(item.id)">
      Удалить
    </button>
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

<template>
  <RouterLink
    class="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
    :to="{ name: 'product', params: { id: product.id } }"
    :aria-label="`Открыть страницу товара ${product.name}`"
  >
    <img :src="product.image" alt="" class="h-48 w-full object-cover" />
    <div class="p-4 flex flex-col justify-between flex-auto">
      <h2 class="text-lg font-semibold line-clamp-2">{{ product.name }}</h2>

      <!-- rarity -->
      <p class="text-sm text-gray-500">
        Rarity:
        <span class="font-medium text-gray-800">{{ product.rarity }}</span>
      </p>

      <!-- inStock -->
      <p class="text-sm" :class="product.inStock ? 'text-green-600' : 'text-red-600'">
        {{ product.inStock ? 'В наличии' : 'Нет в наличии' }}
      </p>

      <!-- tags -->
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-auto pt-4">
        <span class="text-xl font-bold text-indigo-600">{{ product.price }}$</span>

        <!-- <AppProductCounter /> -->

        <AppButton :aria-label="`Add ${product.name} to cart`" @click.stop.prevent="add()">
          В корзину
        </AppButton>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ProductItem } from '@/api/types/products'
import { toRefs } from 'vue'
import AppProductCounter from './AppProductCounter.vue'
import AppButton from './AppButton.vue'
import { useCart } from '@/store/useCart'

const props = defineProps<{
  product: ProductItem
}>()

const { product } = toRefs(props)
const cart = useCart();

const add = async () => {
  await cart.add({
    id: product.value.id,
    qty: 1,
  })
}
</script>

<style scoped></style>

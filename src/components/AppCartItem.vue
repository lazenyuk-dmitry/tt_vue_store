<template>
  <div
    class="flex items-center gap-4 p-4 border rounded-xl shadow-sm"
  >
    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />

    <div class="flex-1">
      <h3 class="font-semibold">{{ item.name }}</h3>
      <p class="text-gray-600">{{ item.price }}$ за шт.</p>
      <p class="text-sm text-gray-500">
        {{ item.rarity }} |
        {{ item.inStock ? 'В наличии' : 'Нет в наличии' }}
      </p>
      <div class="flex flex-wrap gap-1 mt-1">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="px-2 py-0.5 text-xs rounded-full bg-gray-200"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- управление количеством -->
    <div class="flex items-center gap-2">
      <button
        class="px-3 py-1 border rounded-lg hover:bg-gray-100"
        @click="decreaseQuantity(item.id)"
      >
        -
      </button>
      <span class="w-8 text-center">{{ item.quantity }}</span>
      <button
        class="px-3 py-1 border rounded-lg hover:bg-gray-100"
        @click="increaseQuantity(item.id)"
      >
        +
      </button>
    </div>

    <!-- сумма по товару -->
    <div class="w-20 text-right font-semibold">{{ item.price * item.qty }} $</div>

    <button class="text-red-500 hover:text-red-700 ml-4" @click="removeFromCart(item.id)">
      Удалить
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CartProduct } from '@/api/types/cart';

const props = defineProps<{
  item: CartProduct
}>()

const decreaseQuantity = () => {}
const increaseQuantity = () => {}
const removeFromCart = () => {}
</script>

<style scoped>

</style>
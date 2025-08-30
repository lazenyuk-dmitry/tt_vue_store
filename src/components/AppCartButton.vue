<template>
  <RouterLink
    to="/cart"
    class="w-10 h-10 relative rounded-full hover:bg-gray-100 hover:cursor-pointer transition flex items-center justify-center"
    aria-label="Корзина"
  >
    <ShoppingCartIcon class="h-6 w-6 text-gray-700" />

    <span
      class="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5"
    >
      {{ cart.totalItems }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { useCart } from '@/store/useCart'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

const cart = useCart()
</script>

<style scoped></style>

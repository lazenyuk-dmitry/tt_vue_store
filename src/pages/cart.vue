<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Корзина</h1>

      <!-- список товаров -->
      <div v-if="cartLength > 0" class="space-y-4">
        <AppCartItem v-for="item in cart?.items" :key="item.id" :item="item" />
      </div>

      <!-- пустая корзина -->
      <div v-else>
        <h3 class="text-gray-500">Корзина пуста</h3>
        <RouterLink to="/" class="mt-3 inline-block"> На главную </RouterLink>
      </div>

      <!-- итог -->
      <div v-if="cartLength > 0" class="mt-8 border-t pt-4">
        <p class="text-lg font-semibold">Итого: {{ totalSum }} $</p>

        <!-- оформить заказ -->
        <button
          @click="checkout"
          class="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </InnerPageLayout>
</template>

<script setup lang="ts">
import AppCartItem from '@/components/AppCartItem.vue'
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'
import { useCart } from '@/store/useCart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cartStore = useCart()

const { cart, cartLength, totalSum } = storeToRefs(cartStore)
const router = useRouter()

function checkout() {
  router.push({ name: 'checkout' })
}
</script>

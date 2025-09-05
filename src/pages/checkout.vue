<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Оформление заказа</h1>

      <div v-if="success">
        <p class="text-green-600 font-semibold text-lg">✅ Заказ успешно оформлен!</p>
        <p class="mt-2">
          Номер заказа: <span class="font-bold">#{{ orderId }}</span>
        </p>
        <RouterLink to="/" class="mt-6 inline-block text-blue-600 underline hover:text-blue-800">
          На главную
        </RouterLink>
      </div>

      <div v-else>
        <!-- Товары -->
        <div v-if="cart?.items.length" class="mb-6 space-y-4">
          <h2 class="text-xl font-semibold">Ваш заказ</h2>
          <div class="flex gap-4 flex-wrap">
            <AppCheckoutItem
              v-for="item in cart.items"
              class="w-full sm:w-[calc(50%-(--spacing(2)))] md:w-[calc(33.333%-(--spacing(3)))]"
              :item="item"
              :key="item.id"
            />
          </div>

          <div class="flex justify-between font-bold text-lg border-t pt-3">
            <span>Итого:</span>
            <span>{{ total }}₸</span>
          </div>
        </div>
        <div v-else class="text-gray-500 mb-6">Корзина пуста</div>

        <!-- Форма -->
        <form @submit.prevent="submitOrder" class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Имя</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">Комментарий</label>
            <textarea
              v-model="comment"
              rows="3"
              class="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            :disabled="!cart?.items.length"
          >
            Отправить заказ
          </button>
        </form>
      </div>
    </div>
  </InnerPageLayout>
</template>

<script setup lang="ts">
import AppCheckoutItem from '@/components/AppCheckoutItem.vue'
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'
import { useCart } from '@/store/useCart'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const name = ref('')
const comment = ref('')
const success = ref(false)
const orderId = ref<number | null>(null)

const cartStore = useCart()
const { cart } = storeToRefs(cartStore)

const total = computed(() =>
  cart.value?.items.reduce((sum, item) => sum + item.price * item.qty, 0),
)

function submitOrder() {}
</script>

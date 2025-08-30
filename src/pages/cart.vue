<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Корзина</h1>

      <!-- список товаров -->
      <div v-if="cart.length > 0" class="space-y-4">
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex items-center gap-4 p-4 border rounded-xl shadow-sm"
        >
          <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />

          <div class="flex-1">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">{{ item.price }} $ за шт.</p>
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
          <div class="w-20 text-right font-semibold">{{ item.price * item.quantity }} $</div>

          <button class="text-red-500 hover:text-red-700 ml-4" @click="removeFromCart(item.id)">
            Удалить
          </button>
        </div>
      </div>

      <!-- пустая корзина -->
      <p v-else class="text-gray-600">Корзина пуста</p>

      <!-- итог -->
      <div v-if="cart.length > 0" class="mt-8 border-t pt-4">
        <p class="text-lg font-semibold">Итого: {{ total }} $</p>

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
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  rarity: string
  inStock: boolean
  tags: string[]
  image: string
  quantity: number
}

const cart = ref<CartItem[]>([
  {
    id: 1,
    name: 'Shadow Dagger',
    price: 120,
    rarity: 'covert',
    inStock: true,
    tags: ['knife', 'limited'],
    image: 'https://picsum.photos/200?random=1',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Karambit Fade',
    price: 250,
    rarity: 'classified',
    inStock: true,
    tags: ['knife', 'rare'],
    image: 'https://picsum.photos/200?random=2',
    quantity: 2,
  },
])

const comment = ref('')

const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

function increaseQuantity(id: number) {
  const product = cart.value.find((i) => i.id === id)
  if (product) product.quantity++
}

function decreaseQuantity(id: number) {
  const product = cart.value.find((i) => i.id === id)
  if (product && product.quantity > 1) product.quantity--
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter((item) => item.id !== id)
}

function checkout() {
  alert(`Заказ оформлен!\nКомментарий: ${comment.value || 'без комментария'}`)
}
</script>

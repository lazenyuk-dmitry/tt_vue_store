<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="max-w-4xl mx-auto px-4 py-6">
      <div v-if="loading" class="text-center text-gray-500">Загрузка...</div>

      <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Изображение -->
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-80 object-cover rounded-xl shadow"
        />

        <!-- Инфо -->
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
          <p class="text-gray-500 mb-4">
            Редкость:
            <span class="font-medium capitalize">{{ product.rarity }}</span>
          </p>
          <p class="text-3xl font-semibold mb-4">{{ product.price }}$</p>

          <p class="mb-4" :class="product.inStock ? 'text-green-600' : 'text-red-500'">
            {{ product.inStock ? 'В наличии' : 'Нет в наличии' }}
          </p>

          <!-- Теги -->
          <div class="flex flex-wrap gap-2 mb-6">
            <AppProductTag
              v-for="tag in product.tags"
              :key="tag"
              class="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {{ tag }}
            </AppProductTag>
          </div>

          <!-- Кнопки -->
          <div class="flex gap-4">
            <AppProductCounter v-if="inCart" :item="product" />
            <AppButton
              v-else
              :disabled="!product.inStock"
              :aria-label="`Add ${product.name} to cart`"
              @click.stop.prevent="add()"
            >
              В корзину
            </AppButton>
            <router-link to="/" class="px-6 py-2 border rounded-lg hover:bg-gray-100 transition">
              Назад
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-red-500">Товар не найден</div>
    </div>
  </InnerPageLayout>
</template>

<script setup lang="ts">
import { getProduct } from '@/api/endpoints/products'
import AppButton from '@/components/AppButton.vue'
import AppProductCounter from '@/components/AppProductCounter.vue'
import AppProductTag from '@/components/AppProductTag.vue'
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'
import { useCart } from '@/store/useCart'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface Product {
  id: number
  name: string
  price: number
  rarity: string
  inStock: boolean
  tags: string[]
  image: string
}

const props = defineProps<{
  id: number
}>()

const product = ref<Product | null>(null)
const loading = ref(true)
const cartStore = useCart()
const { cart } = storeToRefs(cartStore)

const inCart = computed(() => cart?.value?.items.some((item) => item.id === product.value?.id))

const add = async () => {
  if (product.value) {
    await cartStore.add({
      id: product.value.id,
      qty: 1,
    })
  }
}

onMounted(async () => {
  try {
    const res = await getProduct(props.id)
    product.value = res
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>

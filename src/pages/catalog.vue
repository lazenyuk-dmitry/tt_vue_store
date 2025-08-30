<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="min-h-screen bg-gray-50 px-4 py-8">
      <h1 class="text-2xl font-bold mb-6 text-center">Каталог</h1>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RouterLink
          v-for="p in products"
          :key="p.id"
          class="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          :to="{ name: 'product', params: { id: p.id } }"
          :aria-label="`Открыть страницу товара ${p.name}`"
        >
          <img :src="p.image" alt="" class="h-48 w-full object-cover" />
          <div class="p-4 flex flex-col justify-between flex-auto">
            <h2 class="text-lg font-semibold line-clamp-2">{{ p.name }}</h2>

            <!-- rarity -->
            <p class="text-sm text-gray-500">
              Rarity:
              <span class="font-medium text-gray-800">{{ p.rarity }}</span>
            </p>

            <!-- inStock -->
            <p class="text-sm" :class="p.inStock ? 'text-green-600' : 'text-red-600'">
              {{ p.inStock ? 'В наличии' : 'Нет в наличии' }}
            </p>

            <!-- tags -->
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tag in p.tags"
                :key="tag"
                class="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center justify-between mt-auto pt-4">
              <span class="text-xl font-bold text-indigo-600">{{ p.price }}$</span>

              <button
                class="px-3 py-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                В корзину
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </InnerPageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllProducts } from '@/api/endpoints/products'
import type { ProductItem } from '@/api/types/products'
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'

const products = ref<ProductItem[]>([])

onMounted(async () => {
  const data = await getAllProducts()
  products.value = data.items
})
</script>

<style scoped></style>

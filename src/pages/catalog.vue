<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen bg-gray-50 px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Каталог</h1>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="p in products"
        :key="p.id"
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <img :src="p.image" alt="" class="h-48 w-full object-cover" />
        <div class="p-4 flex flex-col justify-between h-40">
          <h2 class="text-lg font-semibold line-clamp-2">{{ p.name }}</h2>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xl font-bold text-indigo-600">
              {{ p.price }} ₸
            </span>
            <button
              class="px-3 py-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getItems } from "@/api/endpoints/products"
import type { ProductItem } from "@/api/types/products"

const products = ref<ProductItem[]>([])

onMounted(async () => {
  const data = await getItems();
  products.value = data.items;
})
</script>

<style scoped>

</style>
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="min-h-screen bg-gray-50 px-4 py-8">
      <h1 class="text-2xl font-bold mb-6 text-center">Каталог</h1>

      <div class="flex items-center my-6 gap-4">
        <AppSearchInput class="flex-auto" />
        <AppSelect class="w-[100px]" v-model="sorting" :options="sortOptions" />
      </div>

      <!-- <TheCatalogFilters class="mb-6" /> -->

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AppProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </div>
  </InnerPageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllProducts } from '@/api/endpoints/products'
import type { ProductItem } from '@/api/types/products'
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'
import AppProductCard from '@/components/AppProductCard.vue'
import TheCatalogFilters from '@/components/TheCatalogFilters.vue'
import AppSearchInput from '@/components/AppSearchInput.vue'
import AppSelect from '@/components/AppSelect.vue'

const products = ref<ProductItem[]>([])

const sorting = ref('')
const sortOptions = [
  { value: '', label: 'Цена ↑↓' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
]

onMounted(async () => {
  const data = await getAllProducts()
  products.value = data.items
})
</script>

<style scoped></style>

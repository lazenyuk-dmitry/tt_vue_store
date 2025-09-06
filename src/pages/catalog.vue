<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <InnerPageLayout>
    <div class="min-h-screen bg-gray-50 px-4 py-8">
      <h1 class="text-2xl font-bold mb-6 text-center">Каталог</h1>

      <div class="flex items-center my-6 gap-4">
        <AppSearchInput class="flex-auto" />
        <AppSelect class="w-[100px]" v-model="sorting" :options="sortOptions" />
        <AppCheckbox v-model="inStock" name="inStock" class="whitespace-nowrap">
          В наличии
        </AppCheckbox>
      </div>

      <!-- <TheCatalogFilters class="mb-6" /> -->

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AppProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>

      <div id="sentinel" class="h-4 mt-10 flex items-center justify-center text-gray-500">
        <span v-if="isLoading">Загрузка...</span>
      </div>
    </div>
  </InnerPageLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import InnerPageLayout from '@/layouts/InnerPageLayout.vue'
import AppProductCard from '@/components/AppProductCard.vue'
import TheCatalogFilters from '@/components/TheCatalogFilters.vue'
import AppSearchInput from '@/components/AppSearchInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import { useCatalog } from '@/composables/useCatalog'
import AppCheckbox from '@/components/AppCheckbox.vue'

const sorting = ref('')
const sortOptions = [
  { value: '', label: 'Цена ↑↓' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
]
const inStock = ref(false)
let observer: IntersectionObserver | null = null

const catalog = useCatalog()
const { products, isLoading } = toRefs(catalog)

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      catalog.loadMore()
    }
  })
  const sentinel = document.querySelector('#sentinel')
  if (sentinel) observer.observe(sentinel)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped></style>

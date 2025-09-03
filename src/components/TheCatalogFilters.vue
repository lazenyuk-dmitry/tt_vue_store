<script setup lang="ts">
import { reactive } from "vue"

const filters = reactive({
  q: "",
  min: "",
  max: "",
  inStock: false,
  rarity: "",
  sort: "",
  page: 1,
  limit: 20
})

const rarityOptions = [
  "consumer",
  "industrial",
  "mil-spec",
  "restricted",
  "classified",
  "covert"
]

const sortOptions = [
  { value: "price_asc", label: "Цена ↑" },
  { value: "price_desc", label: "Цена ↓" },
]

function applyFilters() {
  // Собираем query-параметры
  const query = Object.entries(filters)
    .filter(([_, v]) => v !== "" && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&")

  console.log("API запрос:", `/api/products?${query}`)
  // тут можно реально дергать API fetch(`/api/products?${query}`)
}

function resetFilters() {
  filters.q = ""
  filters.min = ""
  filters.max = ""
  filters.inStock = false
  filters.rarity = ""
  filters.sort = ""
  filters.page = 1
  filters.limit = 20
}
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-2xl mb-6">
    <form
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end"
      @submit.prevent="applyFilters"
    >
      <!-- Поиск -->
      <div>
        <label class="block text-sm font-medium mb-1">Поиск</label>
        <input
          v-model="filters.q"
          type="text"
          placeholder="Введите название"
          class="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <!-- Цена -->
      <div class="flex gap-2">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">Мин. цена</label>
          <input
            v-model="filters.min"
            type="number"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">Макс. цена</label>
          <input
            v-model="filters.max"
            type="number"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <!-- Наличие -->
      <div class="flex items-center gap-2">
        <input v-model="filters.inStock" type="checkbox" />
        <span class="text-sm">В наличии</span>
      </div>

      <!-- Rarity -->
      <div>
        <label class="block text-sm font-medium mb-1">Rarity</label>
        <select
          v-model="filters.rarity"
          class="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Все</option>
          <option v-for="opt in rarityOptions" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>

      <!-- Сортировка -->
      <div>
        <label class="block text-sm font-medium mb-1">Сортировка</label>
        <select
          v-model="filters.sort"
          class="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Без сортировки</option>
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Кнопки -->
      <div class="sm:col-span-2 lg:col-span-4 flex justify-end gap-3">
        <button
          type="button"
          class="px-4 py-2 bg-gray-200 rounded-lg"
          @click="resetFilters"
        >
          Сбросить
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Применить
        </button>
      </div>
    </form>
  </div>
</template>

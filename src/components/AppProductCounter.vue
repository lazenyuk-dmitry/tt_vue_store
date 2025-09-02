<template>
  <div class="inline-flex items-center rounded-lg overflow-hidden border border-gray-300">
    <button
      @click.stop.prevent="decrease()"
      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold"
    >
      -
    </button>
    <span class="w-10 text-center font-medium bg-white">{{ getQtyById(item.id) }}</span>
    <button
      @click.stop.prevent="increase()"
      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CartProduct } from '@/api/types/cart'
import type { ProductItem } from '@/api/types/products'
import { useCart } from '@/store/useCart'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'

const props = defineProps<{
  item: ProductItem | CartProduct
}>()

const { item } = toRefs(props)
const cartStore = useCart()
const { getQtyById } = storeToRefs(cartStore)

const increase = () => {
  cartStore.update({
    id: item.value.id,
    qty: getQtyById.value(item.value.id) + 1,
  })
}

const decrease = () => {
  cartStore.update({
    id: item.value.id,
    qty: getQtyById.value(item.value.id) - 1,
  })
}
</script>

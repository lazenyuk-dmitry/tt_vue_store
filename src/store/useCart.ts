import type { AddToCartRequest, Cart } from '@/api/types/cart'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { addToCart, getCart } from '@/api/endpoints/cart'

export const useCart = defineStore('cart', () => {
  const cart = ref<Cart | null>(null)

  const totalItems = computed(() => {
    return cart.value?.items.reduce((sum, item) => sum + item.qty, 0) || 0
  })

  const fetch = async () => {
    if (!cart.value) {
      const data = await getCart()
      cart.value = data
    }
  }

  const add = async (data: AddToCartRequest) => {
    await addToCart(data)
  }

  fetch()

  return { cart, add, totalItems }
})

import type { AddToCartRequest, Cart } from '@/api/types/cart'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { addToCart, getCart, removeFromCart, updateCartItem } from '@/api/endpoints/cart'

export const useCart = defineStore('cart', () => {
  const cart = ref<Cart | null>(null)

  const totalItems = computed(() => {
    return cart.value?.items.reduce((sum, item) => sum + item.qty, 0) || 0
  })

  const totalSum = computed(() => {
    return cart.value?.items.reduce((sum, item) => sum + item.price * item.qty, 0) || 0
  })

  const cartLength = computed(() => {
    return cart.value?.items.length || 0
  })

  const fetch = async () => {
    if (!cart.value) {
      const data = await getCart()
      cart.value = data
    }
  }

  const add = async (data: AddToCartRequest) => {
    const updatedCart = await addToCart(data)
    cart.value = updatedCart
    return updatedCart
  }

  const remove = async (id: number) => {
    const updatedCart = await removeFromCart(id)
    cart.value = updatedCart
    return updatedCart
  }

  const update = async (data: { id: number; qty: number }) => {
    const updatedCart = await updateCartItem(data)
    cart.value = updatedCart
    return updatedCart
  }

  const has = (id: number) => {
    return cart.value?.items.some((item) => item.id === id) || false
  }

  const getItem = (id: number) => {
    return cart.value?.items.find((item) => item.id === id)
  }

  const getQtyById = computed(() => {
    return (id: number) => {
      const item = cart.value?.items.find((i) => i.id === id)
      return item ? item.qty : 0
    }
  })

  fetch()

  return {
    cart,
    totalItems,
    cartLength,
    totalSum,
    getQtyById,
    add,
    has,
    getItem,
    update,
    remove,
  }
})

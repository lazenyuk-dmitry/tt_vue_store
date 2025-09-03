import { AddToCartRequest, Cart, CartProduct } from '../types/cart'
import { DataErrorType } from '../types/errors'
import { DataError } from '../utils/errors'
import { products } from './products'

const cart = new Map<number, CartProduct>()

export const getCartItems = () => {
  return Array.from(cart.values())
}

export const getFullCartData = (): Cart => {
  const cartItems = getCartItems()

  return {
    items: cartItems,
    subtotal: cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    currency: 'USD',
    updatedAt: new Date().toISOString(),
  }
}

export const addToCart = (params: AddToCartRequest): CartProduct => {
  const { id, qty = 1 } = params

  if (cart.has(id)) {
    const existingItem = cart.get(id)!
    existingItem.qty += qty
    cart.set(id, existingItem)
    return existingItem
  }

  const newItem = products.find((p) => p.id === id)

  if (!newItem) {
    throw new DataError(DataErrorType.PRODUCT_NOT_FOUND)
  }

  const cartItem: CartProduct = { ...newItem, qty } as CartProduct
  cart.set(id, cartItem)
  return cartItem
}

export const removeFromCart = (id: number): boolean => {
  return cart.delete(id)
}

export const updateCartItem = (params: AddToCartRequest): CartProduct | null => {
  const { id, qty = 1 } = params

  if (!cart.has(id)) {
    throw new DataError(DataErrorType.PRODUCT_NOT_FOUND)
  }

  if (qty <= 0) {
    cart.delete(id)
    return null
  }

  const existingItem = cart.get(id)!
  existingItem.qty = qty
  cart.set(id, existingItem)
  return existingItem
}

export const clearCart = () => {
  cart.clear()
}

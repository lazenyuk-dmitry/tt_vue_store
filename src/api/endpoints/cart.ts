import http from '../http'
import type { AddToCartRequest, Cart, UpdateCartRequest } from '../types/cart'

export async function getCart(): Promise<Cart> {
  const { data: respData } = await http.get('/cart')
  return respData.data
}

export async function addToCart(data: AddToCartRequest): Promise<Cart> {
  const { data: respData } = await http.post('/cart/add', data)
  return respData.data
}

export async function removeFromCart(id: number): Promise<Cart> {
  const { data: respData } = await http.post('/cart/remove', { id })
  return respData.data
}

export async function updateCartItem(data: UpdateCartRequest): Promise<Cart> {
  const { data: respData } = await http.post('/cart/update', data)
  return respData.data
}

export async function clearCart(): Promise<unknown> {
  const res = await http.post('/cart/clear')
  return res.data
}

import http from '../http'
import type { AddToCartRequest, Cart, UpdateCartRequest } from '../types/cart'

export async function getCart(): Promise<Cart> {
  const res = await http.get('/cart')
  return res.data
}

export async function addToCart(data: AddToCartRequest): Promise<Cart> {
  const res = await http.post('/cart/add', data)
  return res.data
}

export async function removeFromCart(id: number): Promise<Cart> {
  const res = await http.post('/cart/remove', { id })
  return res.data
}

export async function updateCartItem(data: UpdateCartRequest): Promise<Cart> {
  const res = await http.post('/cart/remove', data)
  return res.data
}

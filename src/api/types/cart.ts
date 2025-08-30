import type { ProductItem } from './products'

export interface AddToCartRequest {
  id: number
  qty?: number
}

export interface UpdateCartRequest {
  id: number
  qty: number
}

export interface CartProduct extends ProductItem {
  qty: number
}

export interface Cart {
  items: CartProduct[]
  subtotal: number
  currency: string
  updatedAt: string
}

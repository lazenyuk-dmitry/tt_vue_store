import type { Currency } from '.'
import type { Product } from './products'

export interface CartProduct extends Product {
  qty: number
}

export interface Cart {
  items: CartProduct[]
  subtotal: number
  currency: Currency
  updatedAt: string
}

export interface AddToCartRequest {
  id: number
  qty: number
}

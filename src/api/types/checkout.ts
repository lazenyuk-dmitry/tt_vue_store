import type { Cart } from './cart'

export interface CheckoutCustomer {
  name: string
  comment: string
}

export interface CheckoutRequest {
  customer: CheckoutCustomer
  cart: Cart | null
}

export interface CheckoutResponse {
  orderId: string
}

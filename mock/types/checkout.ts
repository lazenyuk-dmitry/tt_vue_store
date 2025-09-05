import { Cart } from './cart'

export interface CheckoutCustomer {
  name: string
  comment: string
}

export interface CheckoutRequest {
  customer: CheckoutCustomer
  cart: Cart
}

export interface CheckoutResponse {
  orderId: string
}

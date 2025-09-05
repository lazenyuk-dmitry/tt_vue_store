import http from '../http'
import type { CheckoutRequest, CheckoutResponse } from '../types/checkout'

export async function checkout(data: CheckoutRequest): Promise<CheckoutResponse> {
  const res = await http.post('/checkout', data)
  return res.data
}
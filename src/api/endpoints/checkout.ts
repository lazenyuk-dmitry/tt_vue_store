import http from '../http'
import type { CheckoutRequest, CheckoutResponse } from '../types/checkout'

export async function checkout(data: CheckoutRequest): Promise<CheckoutResponse> {
  const { data: respData } = await http.post('/checkout', data)
  return respData.data
}

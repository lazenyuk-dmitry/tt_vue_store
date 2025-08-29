import http from '../http'
import type { ProductsListResponse } from '../types/products'

export async function getItems(): Promise<ProductsListResponse> {
  const res = await http.get('/products')
  return res.data
}

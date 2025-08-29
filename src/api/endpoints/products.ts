import http from '../http'
import type { ProductsListParams, ProductsListResponse } from '../types/products'

export async function getItems(params: ProductsListParams): Promise<ProductsListResponse> {
  const res = await http.get('/products', { params } )
  return res.data
}

import http from '../http'
import type { ProductItem, ProductsListParams, ProductsListResponse } from '../types/products'

export async function getAllProducts(params?: ProductsListParams): Promise<ProductsListResponse> {
  const { data: respData } = await http.get('/products', { params })
  return respData.data
}

export async function getProduct(id: number): Promise<ProductItem> {
  const { data: respData } = await http.get(`/products/${id}`)
  return respData.data
}

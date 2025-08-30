import http from '../http'
import type { ProductItem, ProductsListParams, ProductsListResponse } from '../types/products'

export async function getAllProducts(params: ProductsListParams): Promise<ProductsListResponse> {
  const res = await http.get('/products', { params })
  return res.data
}

export async function getProduct(id: number): Promise<ProductItem> {
  const res = await http.get(`/products/${id}`)
  return res.data
}

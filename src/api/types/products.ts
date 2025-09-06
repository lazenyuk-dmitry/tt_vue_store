import type { Rarity } from '../../../mock/types/products'

export interface ProductItem {
  id: number
  name: string
  price: number
  rarity: Rarity
  inStock: boolean
  tags: string[]
  image: string
}

export interface ProductsListResponse {
  items: ProductItem[]
  total: number
  page: number
  limit: number
}

export interface ProductsListParams {
  q?: string
  min?: number
  max?: number
  inStock?: boolean
  rarity?: Rarity
  sort?: 'price_asc' | 'price_desc'
  page?: number
  limit?: number
}

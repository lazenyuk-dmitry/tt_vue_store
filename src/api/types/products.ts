import type { Rarity } from '../../../mock/types/products'

export interface ProductItem {
  id: 'knife_001'
  name: 'Crimson Edge'
  price: 129.99
  qty: 2
  image: '/images/knife_001.png'
  inStock: true
}

export interface ProductsListResponse {
  items: ProductItem[]
  total: 87
  page: 1
  limit: 20
}

export interface ProductsListParams {
  q: string
  min: number
  max: number
  inStock: boolean
  rarity: Rarity
  sort: 'price_asc' | 'price_desc'
  page: number
  limit: number
}

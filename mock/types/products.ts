export type Rarity = 'consumer' | 'industrial' | 'mil-spec' | 'restricted' | 'classified' | 'covert'

export interface Product {
  id: number
  name: string
  price: number
  rarity: Rarity
  inStock: boolean
  tags: string[]
  image: string
}

export interface ProductsListRequest {
  q?: string
  min?: number
  max?: number
  inStock?: boolean
  rarity?: Rarity
  sort?: 'price_asc' | 'price_desc'
  page: number
  limit: number
}

export interface ProductsListResponse {
  items: Product[]
  total: number
  page: number
  limit: number
}

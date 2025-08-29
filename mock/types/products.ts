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
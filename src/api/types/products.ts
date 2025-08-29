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

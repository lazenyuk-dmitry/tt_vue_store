import type { MockMethod } from 'vite-plugin-mock'
import { products } from './data/products'

export default [
  {
    url: '/api/products',
    method: 'get',
    response: () => ({
      items: products,
      total: 87,
      page: 1,
      limit: 20,
    }),
  },
] as MockMethod[]

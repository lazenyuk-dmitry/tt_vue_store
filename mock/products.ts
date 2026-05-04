import type { MockMethod } from 'vite-plugin-mock'
import { getProducts, products } from './data/products'
import type { Product, ProductsListRequest, ProductsListResponse } from './types/products'
import { DataErrorType } from './types/errors'
import type { Response } from './types'
import { ApiErrorResponse } from './utils/errors'

export default [
  {
    url: '/api/products',
    method: 'get',
    response: ({ query }: { query: any }): Response<ProductsListResponse> => {
      const params = {
        q: query.q || null,
        min: Number(query.min) || 0,
        max: Number(query.max) || Infinity,
        inStock: query.inStock !== undefined ? String(query.inStock) === 'true' : null,
        rarity: query.rarity || null,
        sort: query.sort || null,
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 20,
      } as ProductsListRequest

      const { page, limit } = params
      const start = (page - 1) * limit

      const filteredProducts = getProducts(params)
      const items = filteredProducts.slice(start, start + limit)

      return {
        data: {
          items,
          total: filteredProducts.length,
          page,
          limit,
        }
      }
    },
  },
  {
    url: '/api/products/:id',
    method: 'get',
    response: ({ query }: { query: any }): Response<Product> => {
      const id = Number(query.id)
      const product = products.find((p) => p.id === id)

      if (!product) {
        return ApiErrorResponse(DataErrorType.PRODUCT_NOT_FOUND)
      }

      return {
        data: product
      }
    },
  },
] as MockMethod[]

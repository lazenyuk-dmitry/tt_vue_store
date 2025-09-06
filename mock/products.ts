import type { MockMethod } from 'vite-plugin-mock'
import { getProducts, products } from './data/products'
import { IncomingMessage, ServerResponse } from 'http'
import { ProductsListRequest } from './types/products'
import { checkAuth } from './guqrds/auth'
import { ApiErrorResponse } from './utils/errors'
import { DataErrorType } from './types/errors'
import { randomDelayPromise } from './utils/delay'

export default [
  {
    url: '/api/products',
    method: 'get',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      if (!checkAuth(req, res)) return

      await randomDelayPromise()

      const { searchParams } = new URL(req.url!, 'http://localhost')
      const params = {
        q: searchParams.get('q'),
        min: Number(searchParams.get('min')),
        max: Number(searchParams.get('max')),
        inStock: searchParams.get('inStock')
          ? JSON.parse(JSON.stringify(searchParams.get('inStock')))
          : null,
        rarity: searchParams.get('rarity'),
        sort: searchParams.get('sort'),
        page: Number(searchParams.get('page')) || 1,
        limit: Number(searchParams.get('limit')) || 20,
      } as ProductsListRequest

      console.log('Params:', params.inStock)

      const { page = 1, limit } = params
      const start = (page - 1) * limit
      const items = getProducts(params).slice(start, start + limit)

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(
        JSON.stringify({
          items,
          total: products.length,
          page,
          limit,
        }),
      )
    },
  },
  {
    url: '/api/products/:id',
    method: 'get',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      if (!checkAuth(req, res)) return
      await randomDelayPromise()

      const id = Number(req.url?.split('/').pop())
      const product = products.find((p) => p.id === id)

      res.setHeader('Content-Type', 'application/json')

      if (!product) {
        ApiErrorResponse(res, DataErrorType.PRODUCT_NOT_FOUND)
        return
      }

      res.statusCode = 200

      res.statusCode = 200
      res.end(JSON.stringify(product))
    },
  },
] as MockMethod[]

import type { MockMethod } from 'vite-plugin-mock'
import { products } from './data/products'
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

      const url = new URL(req.url!, 'http://localhost')
      const params = Object.fromEntries(
        url.searchParams.entries(),
      ) as unknown as ProductsListRequest

      const page = Number(params.page) || 1
      const limit = Number(params.limit) || 20
      const start = (page - 1) * limit
      const items = products.slice(start, start + limit)

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

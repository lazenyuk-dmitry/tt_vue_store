import type { MockMethod } from 'vite-plugin-mock'
import { products } from './data/products'
import { IncomingMessage, ServerResponse } from 'http'
import { ProductsListRequest } from './types/products'
import { checkAuth } from './guqrds/auth'

export default [
  {
    url: '/api/products',
    method: 'get',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      if (!checkAuth(req, res)) return

      const url = new URL(req.url!, 'http://localhost')
      const params = Object.fromEntries(
        url.searchParams.entries(),
      ) as unknown as ProductsListRequest

      const { page = 1, limit = 20 } = params

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(
        JSON.stringify({
          items: products.slice((page - 1) * limit, limit),
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
    rawResponse: async (req, res) => {
      if (!checkAuth(req, res)) return

      const id = Number(req.url?.split('/').pop())
      const product = products.find((p) => p.id === id)

      res.setHeader('Content-Type', 'application/json')

      if (!product) {
        res.statusCode = 404
        res.end(JSON.stringify({ message: 'Product not found' }))
        return
      }

      res.statusCode = 200

      res.statusCode = 200
      res.end(JSON.stringify(product))
    },
  },
] as MockMethod[]

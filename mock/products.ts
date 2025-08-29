import type { MockMethod } from 'vite-plugin-mock'
import { products } from './data/products'
import { IncomingMessage, ServerResponse } from 'http'
import { ProductsListRequest } from './types/products'
import { checkAuth } from './guqrds/auth'

async function sendAllProducts(params: ProductsListRequest, res: ServerResponse) {
  const { page, limit = 20 } = params

  res.statusCode = 200
  res.end(
    JSON.stringify({
      items: products.splice((page - 1) * limit, limit),
      total: products.length,
      page,
      limit,
    }),
  )
}

async function sendProduct(id: number, res: ServerResponse) {
  const product = products.find((p) => p.id === id)

  if (!product) {
    res.statusCode = 404
    res.end(JSON.stringify({ message: 'Product not found' }))
    return
  }

  res.statusCode = 200
  res.end(JSON.stringify(product))
}

export default [
  {
    url: '/api/products',
    method: 'get',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      if (!checkAuth(req, res)) return

      const url = new URL(req.url!, 'http://localhost')
      const pathname = url.pathname
      const params = Object.fromEntries(
        url.searchParams.entries(),
      ) as unknown as ProductsListRequest

      const parts = pathname.split('/')
      const id = Number(parts[1])

      res.setHeader('Content-Type', 'application/json')

      if (id) {
        sendProduct(id, res)
        return
      }

      sendAllProducts(params, res)
    },
  },
] as MockMethod[]

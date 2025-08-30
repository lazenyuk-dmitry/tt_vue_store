import type { IncomingMessage, ServerResponse } from 'http'
import { parseRawRequest } from './utils'
import { addToCart, clearCart, getFullCartData, removeFromCart, updateCartItem } from './data/cart'
import { MockMethod } from 'vite-plugin-mock'
import { AddToCartRequest } from './types/cart'

export default [
  {
    url: '/api/cart',
    method: 'get',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(JSON.stringify(getFullCartData()))
    },
  },
  {
    url: '/api/cart/add',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = (await parseRawRequest(req)) as AddToCartRequest

      addToCart(redData)

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(JSON.stringify(getFullCartData()))
    },
  },
  {
    url: '/api/cart/remove',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = (await parseRawRequest(req)) as { id: number }

      removeFromCart(redData.id)

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(JSON.stringify(getFullCartData()))
    },
  },
  {
    url: '/api/cart/update',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = (await parseRawRequest(req)) as AddToCartRequest

      updateCartItem(redData)

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(JSON.stringify(getFullCartData()))
    },
  },
  {
    url: '/api/cart/clear',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      clearCart()

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(
        JSON.stringify({
          message: 'Cart cleared',
        }),
      )
    },
  },
] as MockMethod[]

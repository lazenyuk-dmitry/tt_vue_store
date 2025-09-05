import type { IncomingMessage, ServerResponse } from 'http'
import { parseRawRequest } from './utils'
import { addToCart, clearCart, getFullCartData, removeFromCart, updateCartItem } from './data/cart'
import { MockMethod } from 'vite-plugin-mock'
import { AddToCartRequest } from './types/cart'
import { DataErrorType } from './types/errors'
import { ApiErrorResponse as apiErrorResponse, DataError } from './utils/errors'

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

      try {
        addToCart(redData)
      } catch (err: unknown) {
        if (err instanceof DataError) {
          apiErrorResponse(res, DataErrorType[err.details.error as DataErrorType])
          return
        }
      }

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

      try {
        removeFromCart(redData.id)
      } catch (err: unknown) {
        if (err instanceof DataError) {
          apiErrorResponse(res, DataErrorType[err.details.error as DataErrorType])
          return
        }
      }

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

      try {
        updateCartItem(redData)
      } catch (err: unknown) {
        if (err instanceof DataError) {
          apiErrorResponse(res, DataErrorType[err.details.error as DataErrorType])
          return
        }
      }

      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(JSON.stringify(getFullCartData()))
    },
  },
  {
    url: '/api/cart/clear',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      try {
        clearCart()
      } catch (err: unknown) {
        if (err instanceof DataError) {
          apiErrorResponse(res, DataErrorType[err.details.error as DataErrorType])
          return
        }
      }

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

import type { IncomingMessage, ServerResponse } from 'http'
import { parseRawRequest } from './utils'
import { MockMethod } from 'vite-plugin-mock'
import { CheckoutRequest, CheckoutResponse } from './types/checkout'
import { ApiErrorResponse } from './utils/errors'
import { DataErrorType } from './types/errors'

export default [
  {
    url: '/api/checkout',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = await parseRawRequest(req)
      const { customer, cart } = redData as CheckoutRequest

      res.setHeader('Content-Type', 'application/json')

      if (customer.name.length === 0) {
        ApiErrorResponse(res, DataErrorType.INVALID_CUSTOMER)
        return
      }

      if (cart.items.length === 0) {
        ApiErrorResponse(res, DataErrorType.CART_OUTDATED)
        return
      }

      res.statusCode = 200
      const date = new Date()
      const orderDate =
        date.getFullYear().toString().padStart(2, '0') +
        date.getMonth().toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0')
      res.end(
        JSON.stringify({
          orderId: `ORDER-${orderDate}-0001`,
        } as CheckoutResponse),
      )
    },
  },
] as MockMethod[]

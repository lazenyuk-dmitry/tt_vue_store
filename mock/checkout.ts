import type { MockMethod } from 'vite-plugin-mock'
import type { CheckoutRequest, CheckoutResponse } from './types/checkout'
import { DataErrorType } from './types/errors'
import type { Response } from './types'
import { ApiErrorResponse } from './utils/errors'

export default [
  {
    url: '/api/checkout',
    method: 'post',
    response: ({ body }: { body: CheckoutRequest }): Response<CheckoutResponse> => {
      const { customer, cart } = body

      if (customer.name.length === 0) {
        return ApiErrorResponse(DataErrorType.INVALID_CUSTOMER)
      }

      if (cart.items.length === 0) {
        return ApiErrorResponse(DataErrorType.CART_OUTDATED)
      }

      const date = new Date()
      const orderDate =
        date.getFullYear().toString().padStart(2, '0') +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0')

      return {
        data: {
          orderId: `ORDER-${orderDate}-0001`,
        }
      }
    },
  },
] as MockMethod[]

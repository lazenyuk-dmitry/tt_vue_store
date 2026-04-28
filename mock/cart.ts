import { addToCart, clearCart, getFullCartData, removeFromCart, updateCartItem } from './data/cart'
import type { MockMethod } from 'vite-plugin-mock'
import type { AddToCartRequest, Cart } from './types/cart'
import { DataErrorType } from './types/errors'
import { ApiErrorResponse, DataError } from './utils/errors'
import { Response } from './types'

export default [
  {
    url: '/api/cart',
    method: 'get',
    response: (): Response<Cart> => {
      return {
        code: 200,
        data: getFullCartData(),
      };
    },
  },
  {
    url: '/api/cart/add',
    method: 'post',
    response: ({ body }: { body: AddToCartRequest }): Response<Cart> => {
      try {
        addToCart(body);
        return {
          code: 200,
          data: getFullCartData(),
        };
      } catch (err: unknown) {
        if (err instanceof DataError) {
          return ApiErrorResponse(DataErrorType[err.details.error as DataErrorType])
        }
        return ApiErrorResponse(DataErrorType.INTERNAL_SERVER_ERROR)
      }
    },
  },
  {
    url: '/api/cart/remove',
    method: 'post',
    response: ({ body }: { body: { id: number } }): Response<Cart> => {
      try {
        removeFromCart(body.id);
        return {
          code: 200,
          data: getFullCartData(),
        };
      } catch (err: unknown) {
        if (err instanceof DataError) {
          return ApiErrorResponse(DataErrorType[err.details.error as DataErrorType])
        }
        return ApiErrorResponse(DataErrorType.INTERNAL_SERVER_ERROR)
      }
    },
  },
  {
    url: '/api/cart/update',
    method: 'post',
    response: ({ body }: { body: AddToCartRequest }): Response<Cart> => {
      try {
        updateCartItem(body);
        return {
          code: 200,
          data: getFullCartData(),
        };
      } catch (err: unknown) {
        if (err instanceof DataError) {
          return {
            code: 400,
            message: DataErrorType[err.details.error as DataErrorType],
          };
        }
        return ApiErrorResponse(DataErrorType.INTERNAL_SERVER_ERROR)
      }
    },
  },
  {
    url: '/api/cart/clear',
    method: 'post',
    response: (): Response<never> => {
      try {
        clearCart();
        return {
          code: 200,
          message: 'Cart cleared',
        };
      } catch (err: unknown) {
        if (err instanceof DataError) {
          return {
            code: 400,
            message: DataErrorType[err.details.error as DataErrorType],
          };
        }
        return ApiErrorResponse(DataErrorType.INTERNAL_SERVER_ERROR)
      }
    },
  },
] as MockMethod[];

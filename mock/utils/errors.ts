import { DataErrorType, type ErrorDetails } from '../types/errors'
import type { Response } from '../types'

export const DATA_ERRORS_COLLECTION: { [key: string]: ErrorDetails } = {
  [DataErrorType.PRODUCT_NOT_FOUND]: {
    error: DataErrorType.PRODUCT_NOT_FOUND,
    code: 404,
    message: 'Product not found',
  },
  [DataErrorType.OUT_OF_STOCK]: {
    error: DataErrorType.OUT_OF_STOCK,
    code: 409,
    message: 'Out of stock',
  },
  [DataErrorType.CART_OUTDATED]: {
    error: DataErrorType.CART_OUTDATED,
    code: 409,
    message: 'Cart is outdated',
  },
  [DataErrorType.INVALID_CUSTOMER]: {
    error: DataErrorType.INVALID_CUSTOMER,
    code: 422,
    message: 'Invalid customer data',
  },
  [DataErrorType.INTERNAL_SERVER_ERROR]: {
    error: DataErrorType.INTERNAL_SERVER_ERROR,
    code: 500,
    message: 'Internal server error',
  },
  [DataErrorType.INVALID_EMAIL_OR_PASSWORD]: {
    error: DataErrorType.INVALID_EMAIL_OR_PASSWORD,
    code: 400,
    message: 'Wrong password or email',
  },
}

export class DataError extends Error {
  public details: ErrorDetails

  constructor(err: DataErrorType) {
    const errDetails = DATA_ERRORS_COLLECTION[err]
    super(errDetails.message)
    this.name = 'DataError'
    this.details = errDetails
  }
}

export function ApiErrorResponse(err: DataErrorType): Response<never> {
  const errDetails = DATA_ERRORS_COLLECTION[err]
  return {
    code: errDetails.code,
    message: errDetails.message,
    error: errDetails.error,
  }
}

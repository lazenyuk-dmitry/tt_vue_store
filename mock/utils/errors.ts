import { ServerResponse } from 'http'
import { DataErrorType, ErrorDetails } from '../types/errors'

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

export function ApiErrorResponse(res: ServerResponse, err: DataErrorType) {
  const errDetails = DATA_ERRORS_COLLECTION[err]

  res.statusCode = errDetails.code
  res.end(
    JSON.stringify({
      message: errDetails.message,
      error: errDetails.error,
    }),
  )
  return
}

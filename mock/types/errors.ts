export enum DataErrorType {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  CART_OUTDATED = 'CART_OUTDATED',
  INVALID_CUSTOMER = 'INVALID_CUSTOMER',
}

export interface ErrorDetails {
  error: string
  code: number
  message: string
}

export enum DataErrorType {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface ErrorDetails {
  error: string
  code: number
  message: string
}

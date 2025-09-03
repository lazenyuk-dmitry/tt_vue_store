export enum DataErrorType {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
}

export interface ErrorDetails {
  error: string
  code: number
  message: string
}

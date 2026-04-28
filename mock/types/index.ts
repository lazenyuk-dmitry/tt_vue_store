export type Currency = 'USD'

export interface Response<T> {
  code?: number
  message?: string
  data?: T
  error?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UserInfo {
  id: number
  name: string
  email: string
  avatar: string
}

export interface LoginResponse {
  token: string
  user: UserInfo
}

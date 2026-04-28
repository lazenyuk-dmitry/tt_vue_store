import http from '../http'
import type { LoginRequest, LoginResponse, UserInfo } from '../types/auth'

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const { data: respData } = await http.post('/login', data)
  return respData.data
}

export async function logout(): Promise<void> {
  const { data: respData } = await http.post('/logout')
  return respData.data
}

export async function getUserInfo(): Promise<UserInfo> {
  const { data: respData } = await http.get('/userinfo')
  return respData.data
}

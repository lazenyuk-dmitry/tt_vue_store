import http from '../http'
import type { LoginRequest, LoginResponse, UserInfo } from '../types/auth'

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await http.post('/login', data)
  return res.data
}

export async function logout(): Promise<void> {
  const res = await http.post('/logout')
  return res.data
}

export async function getUserInfo(): Promise<UserInfo> {
  const res = await http.get('/userinfo')
  return res.data
}

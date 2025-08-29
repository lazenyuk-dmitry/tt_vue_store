import http from '../http'
import type { LoginRequest, LoginResponse } from '../types/auth'

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await http.post('/login', data)
  return res.data
}

export async function logout(): Promise<void> {
  await http.post('/logout')
}

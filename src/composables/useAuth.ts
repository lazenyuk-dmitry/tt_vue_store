import { ref } from 'vue'
import { login, logout } from '@/api/endpoints/auth'
import type { LoginRequest } from '@/api/types/auth'

const user = ref(null)
const token = ref<string | null>(localStorage.getItem('token'))

export function useAuth() {
  async function signIn(payload: LoginRequest) {
    const data = await login(payload)
    user.value = data.user
    token.value = data.token
    localStorage.setItem('token', data.token)
  }

  async function signOut() {
    await logout()
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, signIn, signOut }
}

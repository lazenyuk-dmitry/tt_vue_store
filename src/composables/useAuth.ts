import { computed, ref } from 'vue'
import { getUserInfo, login, logout } from '@/api/endpoints/auth'
import type { LoginRequest, UserInfo } from '@/api/types/auth'
import { useRouter } from 'vue-router'

const user = ref<UserInfo | null>(null)
const token = ref<string | null>(localStorage.getItem('token'))

export function useAuth() {
  const isAuth = computed(() => !!token.value)
  const router = useRouter();

  async function fetchUser() {
    if (isAuth.value && !user.value) {
      user.value = await getUserInfo()
    }
  }

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
    router.push('/login')
  }

  fetchUser()

  return { user, token, isAuth, signIn, signOut }
}

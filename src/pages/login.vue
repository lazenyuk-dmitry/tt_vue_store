<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center items-center min-h-[70vh]">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Войти в аккаунт</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <AppButton type="submit">Войти</AppButton>
      </form>

      <p class="text-sm text-gray-500 text-center mt-4">
        Нет аккаунта?
        <RouterLink to="/register" class="text-blue-600 hover:underline">
          Зарегистрироваться
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await auth.signIn({ email: email.value, password: password.value })
  router.push({ name: 'catalog' })
}
</script>

<style scoped></style>

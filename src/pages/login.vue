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

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Войти
        </button>
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
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'

const auth = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  auth.signIn({ email: email.value, password: password.value })
}
</script>

<style scoped></style>

import Catalog from '@/pages/catalog.vue'
import Login from '@/pages/login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/catalog', name: 'catalog', component: Catalog },
  ],
})

export default router

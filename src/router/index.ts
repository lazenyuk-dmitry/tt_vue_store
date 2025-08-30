import Catalog from '@/pages/catalog.vue'
import Login from '@/pages/login.vue'
import Product from '@/pages/product.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/catalog', name: 'catalog', component: Catalog },
    { path: '/product/:id', name: 'product', component: Product, props: true },
  ],
})

export default router

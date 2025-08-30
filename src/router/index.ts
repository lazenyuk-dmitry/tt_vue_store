import { useAuth } from '@/composables/useAuth'
import Catalog from '@/pages/catalog.vue'
import Login from '@/pages/login.vue'
import Product from '@/pages/product.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'catalog' } },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: () => {
        const auth = useAuth()
        if (auth.isAuth.value) {
          return '/'
        }
      },
    },
    { path: '/catalog', name: 'catalog', component: Catalog },
    { path: '/product/:id', name: 'product', component: Product, props: true },
  ],
})

router.beforeEach((to, from) => {
  const auth = useAuth()

  if (!auth.isAuth.value && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/main.css'
import { setupInterceptors } from '@/api/interceptors'
import { setupProdMockServer } from './mockProdServer'

if (process.env.NODE_ENV === 'production' && import.meta.env.VITE_USE_MOCK === 'true') {
  setupProdMockServer();
}

const app = createApp(App)

setupInterceptors()

app.use(createPinia())
app.use(router)

app.mount('#app')

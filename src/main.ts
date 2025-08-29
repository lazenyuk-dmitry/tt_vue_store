import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/main.css'
import { setupInterceptors } from '@/api/interceptors'

const app = createApp(App)

setupInterceptors()

app.use(createPinia())
app.use(router)

app.mount('#app')

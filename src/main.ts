import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/main.css'
import { setupInterceptors } from '@/api/interceptors'
import { setupProdMockServer } from './mockProdServer'
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

if (process.env.NODE_ENV === 'production' && import.meta.env.VITE_USE_MOCK === 'true') {
  setupProdMockServer();
}

const app = createApp(App)
const toast = useToast();

app.config.errorHandler = (err: any) => {
  toast.error(err?.message);
  console.error(err);
}

setupInterceptors()

app.use(Toast, {
  position: "bottom-right",
});
app.use(createPinia())
app.use(router)

app.mount('#app')

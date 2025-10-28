import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/base.css'
import { useAuthStore } from './presentation/stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const auth = useAuthStore()
auth.initializeAuth().then(() => {
  app.use(router)
  app.mount('#app')
})

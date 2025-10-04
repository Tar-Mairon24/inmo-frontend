import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/base.css'
import { useAuthStore } from './presentation/stores/authStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = useAuthStore()
auth.initializeAuth().then(() => {
  app.use(router)
  app.mount('#app')
})

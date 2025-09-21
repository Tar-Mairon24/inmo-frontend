import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './presentation/stores/authStore'

import App from './App.vue'
import router from './router'
import './assets/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = useAuthStore()
auth.initializeAuth()

app.mount('#app')

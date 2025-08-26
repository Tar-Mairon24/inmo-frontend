import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated && to.name !== 'login') {
    next({ name: 'login' })
  } else if (auth.isAuthenticated && to.name === 'login') {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router

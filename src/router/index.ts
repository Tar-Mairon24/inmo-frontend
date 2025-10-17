import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/authStore'
import LoginView from '@/presentation/views/LoginView.vue'
import DashboardView from '@/presentation/views/DashboardView.vue'
import PropertyDetailView from '@/presentation/views/PropertyDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/property/:id',
      name: 'property',
      component: PropertyDetailView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  const requiresAuth = to.meta.requiresAuth !== false
  const isAuthenticated = auth.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router

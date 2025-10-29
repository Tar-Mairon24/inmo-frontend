import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/authStore'
import LoginView from '@/presentation/views/LoginView.vue'
import DashboardView from '@/presentation/views/DashboardView.vue'
import PropertyDetailView from '@/presentation/views/PropertyDetailView.vue'
import PropertyFormView from '@/presentation/views/PropertyFormView.vue'

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
      path: '/property/new',
      name: 'new-property',
      component: PropertyFormView,
      props: { id: 'new' },
      meta: { requiresAuth: true },
    },
    {
      path: '/property/edit/:id',
      name: 'edit-property',
      component: PropertyFormView,
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

  if (!auth.isInitialized) {
    await auth.initializeAuth()
  }

  const requiresAuth = to.meta.requiresAuth !== false
  const isAuthenticated = auth.isAuthenticated

  console.log('Router guard:', {
    path: to.path,
    requiresAuth,
    isAuthenticated,
    isInitialized: auth.isInitialized,
  })

  if (requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login - not authenticated from ', from.path)
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    console.log('Redirecting to dashboard - already authenticated from ', from.path)
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router

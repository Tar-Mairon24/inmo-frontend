import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginCredentials } from '@/domain/entities/auth'
import type { User } from '@/domain/entities/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      } catch (error) {
        user.value = null
        isAuthenticated.value = false
        console.error('Error parsing stored user:', error)
      }
    }
  }

  const login = async (credentials: LoginCredentials) => {
    const response = await fetch('http://localhost:8081/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    const Authdata = await response.json()
    console.log('Authdata:', Authdata)

    // Adapt to your backend response structure
    if (response.ok && Authdata.data) {
      user.value = Authdata.data
      console.log('User logged in:', Authdata.data)
      isAuthenticated.value = true

      console.log('rememberMe:', credentials.rememberMe)
      const storage = credentials.rememberMe ? localStorage : sessionStorage
      storage.setItem('auth_user', JSON.stringify(Authdata.data))
    } else {
      throw new Error(Authdata.message || 'Login failed')
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_user')
  }

  return { user, isAuthenticated, login, logout, initializeAuth }
})

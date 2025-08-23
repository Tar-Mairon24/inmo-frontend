import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginCredentials } from '@/models/auth'
import { User } from '@/models/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  const login = async (credentials: LoginCredentials) => {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const Authdata = await response.json()
    console.log('Authdata:', Authdata)

    // Adapt to your backend response structure
    if (response.ok && Authdata.data.user && Authdata.data.token) {
      user.value = Authdata.data.user
      console.log('User logged in:', Authdata.data.user)
      token.value = Authdata.data.token
      console.log('Token:', Authdata.data.token)
      isAuthenticated.value = true

      console.log('rememberMe:', credentials.rememberMe)
      const storage = credentials.rememberMe ? localStorage : sessionStorage
      storage.setItem('auth_token', Authdata.data.token)
      storage.setItem('auth_user', JSON.stringify(Authdata.data.user))
    } else {
      throw new Error(Authdata.message || 'Login failed')
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_user')
  }

  return { user, token, isAuthenticated, login, logout, initializeAuth }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginCredentials } from '@/domain/entities/auth'
import { container } from '@/shared/di/Container'
import type { AuthResponse } from '@/domain/entities/auth'

export const useAuthStore = defineStore('auth', () => {
  const AuthResponse = ref<AuthResponse | null>(null)
  const isAuthenticated = ref(false)

  const authService = container.getAuthService()

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)
      AuthResponse.value = response
      isAuthenticated.value = response.success
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      AuthResponse.value = null
      isAuthenticated.value = false
    } catch (error) {
      console.error('Logout failed:', error)
      AuthResponse.value = null
      isAuthenticated.value = false
      throw error
    }
  }

  const initializeAuth = async () => {
    const storedUser = authService.getCurrentUser()
    console.log('Stored user on init:', storedUser)
    if (storedUser) {
      AuthResponse.value = { data: storedUser, message: 'User loaded from storage', success: true }
      isAuthenticated.value = true
    } else {
      isAuthenticated.value = await authService.isAuthenticated()
    }
  }

  return { AuthResponse, isAuthenticated, login, logout, initializeAuth }
})

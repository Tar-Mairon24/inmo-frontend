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
    try {
      const storedUser = authService.getCurrentUser()
      if (storedUser) {
        AuthResponse.value = {
          data: storedUser,
          message: 'Session restored',
          success: true,
        }
        isAuthenticated.value = true
        return
      }

      const authenticated = await authService.isAuthenticated()
      isAuthenticated.value = authenticated
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      isAuthenticated.value = false
    }
  }

  return { AuthResponse, isAuthenticated, login, logout, initializeAuth }
})

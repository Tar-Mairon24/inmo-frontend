import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginCredentials } from '@/domain/entities/auth'
import { container } from '@/shared/di/Container'
import type { AuthResponse } from '@/domain/entities/auth'

export const useAuthStore = defineStore('auth', () => {
  const AuthResponse = ref<AuthResponse | null>(null)
  const _isAuthenticated = ref(false)
  const isInitialized = ref(false)

  const authService = container.getAuthService()

  const isAuthenticated = computed<boolean>(() => {
    return isInitialized.value && _isAuthenticated.value
  })

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)
      AuthResponse.value = response
      _isAuthenticated.value = response.success
      isInitialized.value = true
    } catch (error) {
      console.error('Login failed:', error)
      _isAuthenticated.value = false
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      AuthResponse.value = null
      _isAuthenticated.value = false
      isInitialized.value = true
    }
  }

  const initializeAuth = async () => {
    if (isInitialized.value) return

    try {
    const storedUser = authService.getCurrentUser()
    if (storedUser) {
      console.log('Found stored user, attempting to verify authentication')
      const authenticated = await authService.isAuthenticated()
      if (authenticated) {
        AuthResponse.value = {
          data: storedUser,
          message: 'Session restored',
          success: true,
        }
        _isAuthenticated.value = true
        console.log('User authentication verified, session restored')
      } else {
        console.log('User authentication failed, but keeping user data for remember me')
        _isAuthenticated.value = false
      }
    } else {
      console.log('No stored user found')
      _isAuthenticated.value = false
    }
  } catch (error) {
    console.error('Failed to initialize auth:', error)
    _isAuthenticated.value = false
    // Don't clear stored user data on network errors
  } finally {
    isInitialized.value = true
  }
  }

  return { AuthResponse, isAuthenticated, isInitialized, login, logout, initializeAuth }
})

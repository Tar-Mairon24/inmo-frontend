// tests/fixtures/auth.ts
import type { LoginCredentials, AuthResponse } from '../../src/domain/entities/auth'
import type { User } from '../../src/domain/entities/user'

export const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const mockLoginCredentials: LoginCredentials = {
  email: 'test@example.com',
  password: 'password123',
  rememberMe: false
}

export const mockAuthResponse: AuthResponse = {
  data: mockUser,
  message: 'Login successful',
  success: true
}

export const mockFailedAuthResponse = {
  data: null,
  message: 'Invalid credentials',
  success: false
}

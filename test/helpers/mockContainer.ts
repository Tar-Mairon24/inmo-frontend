import { vi } from 'vitest'
import type { AuthService } from '../../src/application/services/AuthService'

export const createMockAuthService = (): AuthService => ({
  login: vi.fn(),
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
  isAuthenticated: vi.fn(),
  authRepository: {} as unknown,
  storage: {} as unknown,
} as unknown as AuthService)

export const mockContainer = {
  getAuthService: vi.fn(() => createMockAuthService())
}

// Mock the container module
vi.mock('@/shared/di/Container', () => ({
  container: mockContainer
}))

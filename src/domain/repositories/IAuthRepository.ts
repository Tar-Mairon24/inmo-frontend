import type { AuthResponse, LoginCredentials } from '@/domain/entities/auth'

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  logout(user_id: number): Promise<void>
  isAuthenticated(): Promise<boolean>
}

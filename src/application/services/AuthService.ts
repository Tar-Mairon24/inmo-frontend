import type { User } from "@/domain/entities/user"
import type { AuthResponse, LoginCredentials } from "@/domain/entities/auth"
import type { IAuthRepository } from "@/domain/repositories/IAuthRepository"
import { AuthStorage } from "@/infrastructure/storage/AuthStorage"

export class AuthService {
  constructor(
    private authRepository: IAuthRepository,
    private storage: AuthStorage
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log("Remember Me:", credentials.rememberMe)
    const response = await this.authRepository.login(credentials)
    this.storage.saveUser(response.data, credentials.rememberMe || false)
    return response
  }

  async logout(): Promise<void> {
    await this.authRepository.logout(this.storage.getUser()?.id || 0)
    this.storage.clearUser()
  }

  async isAuthenticated(): Promise<boolean> {
    const storedUser = this.storage.getUser()
    if (storedUser) {
      return true
    }

    if (!this.storage.wasRemembered()) {
      return false
    }

    return this.authRepository.isAuthenticated()
  }

  getCurrentUser(): User | null {
    return this.storage.getUser()
  }
}

import type { User } from "../../domain/entities/user"
import type { LoginCredentials } from "../../domain/entities/auth"
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository"
import { AuthStorage } from "../../infrastructure/storage/AuthStorage"

export class AuthService {
  constructor(
    private authRepository: IAuthRepository,
    private storage: AuthStorage
  ) {}

  async login(credentials: LoginCredentials): Promise<User> {
    const user = await this.authRepository.login(credentials)
    this.storage.saveUser(user, credentials.rememberMe || false)
    return user
  }

  async logout(): Promise<void> {
    await this.authRepository.logout()
    this.storage.clearUser()
  }

  async isAuthenticated(): Promise<boolean> {
    const storedUser = this.storage.getUser()
    if (storedUser) {
      return true
    }
    return this.authRepository.isAuthenticated()
  }

  getCurrentUser(): User | null {
    return this.storage.getUser()
  }
}

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
    const currentUser = this.getCurrentUser()

    if (!currentUser) {
      throw new Error("No user is currently logged in.")
    }

    await this.authRepository.logout(currentUser.id)
    this.storage.clearUser()

  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const isAuthenticated = await this.authRepository.isAuthenticated()

      if (!isAuthenticated) {
        console.error("User is not authenticated according to the server.")
        this.storage.clearUser()
        return false
      }

      const storedUser = this.storage.getUser()
      if (!storedUser) {
        console.error("No user found in storage despite server authentication.")
        return false
      }

      return true
    } catch (error) {
      console.error("Authentication check failed:", error)
      this.storage.clearUser()
      return false
    }
  }

  getCurrentUser(): User | null {
    return this.storage.getUser()
  }
}

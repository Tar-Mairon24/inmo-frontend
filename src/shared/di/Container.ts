import { AuthService } from "@/application/services/AuthService"
import { AuthApi } from "@/infrastructure/api/AuthApi"
import { AuthRepository } from "@/infrastructure/repositories/AuthRepositoty"
import { AuthStorage } from "@/infrastructure/storage/AuthStorage"

export class DIContainer {
  private static instance: DIContainer
  private services = new Map()

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer()
    }
    return DIContainer.instance
  }

  getAuthService(): AuthService {
    if (!this.services.has('AuthService')) {
      const authApi = new AuthApi()
      const authRepository = new AuthRepository(authApi)
      const authStorage = new AuthStorage()
      const authService = new AuthService(authRepository, authStorage)
      this.services.set('AuthService', authService)
    }
    return this.services.get('AuthService') 
  }
}

export const container = DIContainer.getInstance()

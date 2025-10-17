import { AuthService } from '@/application/services/AuthService'
import { PropertyService } from '@/application/services/PropertyService'
import { AuthApi } from '@/infrastructure/api/AuthApi'
import { PropertyApi } from '@/infrastructure/api/PropertyApi'
import { AuthRepository } from '@/infrastructure/repositories/AuthRepositoty'
import { PropertyRepository } from '@/infrastructure/repositories/PropertyRepository'
import { AuthStorage } from '@/infrastructure/storage/AuthStorage'

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

  getPropertyService(): PropertyService {
    if (!this.services.has('PropertyService')) {
      const propertyApi = new PropertyApi()
      const propertyRepository = new PropertyRepository(propertyApi)
      const propertyService = new PropertyService(propertyRepository)
      this.services.set('PropertyService', propertyService)
    }
    return this.services.get('PropertyService')
  }
}

export const container = DIContainer.getInstance()

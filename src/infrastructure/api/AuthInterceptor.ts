import { TokenRefreshService } from '@/application/services/TokenRefreshService'
import { container } from '@/shared/di/Container'

export class AuthInterceptor {
  static async handleResponse<T>(
    response: Response,
    originalRequest: () => Promise<Response>,
  ): Promise<T> {
    if (response.status === 401) {
      const url = response.url

      const shouldSkipRefresh = url.includes('api/v1/auth/')

      if (shouldSkipRefresh) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`API request failed with status ${response.status}`)
      }

      const refreshSuccess = await TokenRefreshService.refreshToken()
      if (refreshSuccess) {
        const retryResponse = await originalRequest()

        if (!retryResponse.ok) {
          throw new Error(`Retry failed with status ${retryResponse.status}`)
        }

        if (retryResponse.status === 204) {
          return undefined as T
        }

        return retryResponse.json()
      } else {
        await this.logoutUser()
        throw new Error('Session expired. Please log in again.')
      }
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  private static async logoutUser(): Promise<void> {
    try {
      const authService = container.getAuthService()
      await authService.logout()
      window.location.href = '/login'
    } catch (error) {
      console.error('Error during logout:', error)
      window.location.href = '/login'
    }
  }
}

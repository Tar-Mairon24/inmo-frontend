import { TokenRefreshService } from '@/application/services/TokenRefreshService'

export class AuthInterceptor {
  private static isLoggingOut = false

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

        if (window.location.pathname !== '/login') {
          this.redirectToLogin()
        }
        throw new Error(`API request failed with status ${response.status}`)
      }

      if (!this.isLoggingOut) {
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
          this.redirectToLogin()
          throw new Error('Session expired. Please log in again.')
        }
      } else {
        throw new Error('User being logged out')
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

  private static redirectToLogin(): void {
    if (this.isLoggingOut) return

    this.isLoggingOut = true
    console.log('Redirecting to login due to authentication failure.')

    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    setTimeout(() => {
      this.isLoggingOut = false
    }, 3000)
  }
}

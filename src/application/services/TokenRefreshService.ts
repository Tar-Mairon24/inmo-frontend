export class TokenRefreshService {
  private static isRefresh = false
  private static refreshPromise: Promise<boolean> | null = null

  static async refreshToken(): Promise<boolean> {
    if (this.isRefresh && this.refreshPromise) {
      return this.refreshPromise
    }

    this.isRefresh = true

    this.refreshPromise = this.performRefresh()

    try {
      const result = await this.refreshPromise
      return result
    } finally {
      this.isRefresh = false
      this.refreshPromise = null
    }
  }

  private static async performRefresh(): Promise<boolean> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        return true
      } else {
        console.error('Token refresh failed with status:', response.status)
        return false
      }
    } catch (error) {
      console.error('Network error during token refresh:', error)
      return false
    }
  }
}

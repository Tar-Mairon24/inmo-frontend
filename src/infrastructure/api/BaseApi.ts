import { AuthInterceptor } from "./AuthInterceptor"

export class BaseApi {
  protected baseUrl = import.meta.env.VITE_API_URL
  protected apiVersion = 'v1'

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const makeRequest = () => fetch(`${this.baseUrl}api/${this.apiVersion}/${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      credentials: 'include',
    })

    try {
      const response = await makeRequest()
      return AuthInterceptor.handleResponse<T>(response, makeRequest)
    } catch (error) {
      console.error('Network or parsing error:', error)
      throw error
    }
  }
}

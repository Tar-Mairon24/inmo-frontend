export class BaseApi {
  protected baseUrl = import.meta.env.Api_URL || 'http://localhost:3000/api/v1'

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      credentials: 'include',
      })
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Network or parsing error:', error)
      throw error
    }
  }
}

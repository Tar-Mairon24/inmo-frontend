export class BaseApi {
  protected baseUrl = import.meta.env.Api_URL || 'http://localhost:3000/api/v1'

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      credentials: 'include',
      ...options
    })
      .then(res => res.json())
      .catch(err => {
        console.error('API request error:', err)
        throw err
      })

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}`,
        { cause: response.message || 'Unknown error' }
      )
    }

    return response.json() as Promise<T>
  }
}

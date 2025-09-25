import { BaseApi } from "./BaseApi";
import type { LoginCredentials } from "@/domain/entities/auth";
import type { AuthResponse } from "@/domain/entities/auth";

export class AuthApi extends BaseApi {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
  }

  async logout(user_id: number): Promise<void> {
    return this.request<void>(`/auth/logout/${user_id}`, {
      method: 'POST'
    });
  }

  async isAuthenticated(): Promise<boolean> {
    const response = await this.request<{ authenticated: boolean }>('/auth/status');
    return response.authenticated;
  }
}

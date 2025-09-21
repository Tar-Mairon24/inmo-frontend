import { BaseApi } from "./BaseApi";
import type { LoginCredentials } from "@/domain/entities/auth";

export class AuthApi extends BaseApi {
  async login(credentials: LoginCredentials): Promise<void> {
    return this.request<void>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/auth/logout', {
      method: 'POST'
    });
  }

  async isAuthenticated(): Promise<boolean> {
    const response = await this.request<{ authenticated: boolean }>('/auth/status');
    return response.authenticated;
  }
}

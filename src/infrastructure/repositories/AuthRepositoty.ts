import { AuthApi } from "../api/AuthApi";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { AuthResponse, LoginCredentials } from "@/domain/entities/auth";

export class AuthRepository implements IAuthRepository {
  constructor(private api: AuthApi) {}

  async login(credentiasls: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.login(credentiasls);

      if (!response || !response.data) {
        throw new Error("Invalid login response");
      }

      console.log("Login response:", response.message);

      return {
        data: response.data,
        message: response.message,
        success: response.success
      };
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed: " + (error as Error).message);
    }
  }

  async logout(): Promise<void> {
    return this.api.logout();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.api.isAuthenticated();
  }
}

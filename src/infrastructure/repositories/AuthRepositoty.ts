import { AuthApi } from "../api/AuthApi";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { LoginCredentials } from "@/domain/entities/auth";

export class AuthRepository implements IAuthRepository {
  constructor(private api: AuthApi) {}

  async login(credentiasls: LoginCredentials): Promise<void> {
    return this.api.login(credentiasls);
  }

  async logout(): Promise<void> {
    return this.api.logout();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.api.isAuthenticated();
  }
}

import type { LoginCredentials } from "../entities/auth";

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}

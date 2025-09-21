import type { AuthResponse, LoginCredentials } from "@/domain/entities/auth";

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}

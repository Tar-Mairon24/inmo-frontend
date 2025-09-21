import type { User } from "./user"

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  data: User
  message: string
  success: boolean
}

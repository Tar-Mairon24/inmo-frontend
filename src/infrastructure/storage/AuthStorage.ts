import type { User } from '@/domain/entities/user';

export class AuthStorage {
  private static USER_KEY = 'auth_user';

  saveUser(user: User, rememberMe: boolean): void {
    if (rememberMe) {
      // Save to localStorage for persistence
      localStorage.setItem(AuthStorage.USER_KEY, JSON.stringify(user))
      // Clear from sessionStorage to avoid conflicts
      sessionStorage.removeItem(AuthStorage.USER_KEY)
    } else {
      // Save to sessionStorage only (cleared on browser close)
      sessionStorage.setItem(AuthStorage.USER_KEY, JSON.stringify(user))
      // Clear from localStorage
      localStorage.removeItem(AuthStorage.USER_KEY)
    }
  }

  getUser(): User | null {
    // Check localStorage first, then sessionStorage
    const stored = localStorage.getItem(AuthStorage.USER_KEY) ||
                   sessionStorage.getItem(AuthStorage.USER_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored) as User
    } catch {
      this.clearUser()
      return null
    }
  }

  clearUser(): void {
    localStorage.removeItem(AuthStorage.USER_KEY)
    sessionStorage.removeItem(AuthStorage.USER_KEY)
  }

  // Check if user is in localStorage (means they checked "Remember Me")
  wasRemembered(): boolean {
    return localStorage.getItem(AuthStorage.USER_KEY) !== null
  }
}

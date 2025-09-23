import type { User } from "@/domain/entities/user";

export class AuthStorage {
  private static USER_KEY = 'auth_user';
  private static REMEMBER_ME_KEY = 'remember_me';

  saveUser(user: User, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem(AuthStorage.USER_KEY, JSON.stringify(user))
  }

  getUser(): User | null {
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

  saveRememberMePreference(remember: boolean): void {
    if (remember) {
      localStorage.setItem(AuthStorage.REMEMBER_ME_KEY, 'true')
    } else {
      localStorage.setItem(AuthStorage.REMEMBER_ME_KEY, 'false')
    }
  }

  getRememberMePreference(): boolean {
    const remember = localStorage.getItem(AuthStorage.REMEMBER_ME_KEY) ||
                    sessionStorage.getItem(AuthStorage.REMEMBER_ME_KEY)
    return remember === 'true'
  }

  clearRememberMePreference(): void {
    localStorage.removeItem(AuthStorage.REMEMBER_ME_KEY)
    sessionStorage.removeItem(AuthStorage.REMEMBER_ME_KEY)
  }
}

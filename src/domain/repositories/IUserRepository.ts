import type { User } from "../entities/user"

export interface IUserRepository {
  getUserById(id: number): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  createUser(user: Omit<User, 'id'>): Promise<User>
  updateUser(id: number, user: Partial<Omit<User, 'id'>>): Promise<User | null>
  deleteUser(id: number): Promise<boolean>
}

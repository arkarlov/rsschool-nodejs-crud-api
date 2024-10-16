import { userDB } from '../db/user.db'
import { type User } from '../models/user.model'

const findAll = async (): Promise<User[]> => {
  return Array.from(userDB.values())
}

const findById = async (id: string): Promise<User | undefined> => {
  return userDB.get(id)
}

export default { findAll, findById }
